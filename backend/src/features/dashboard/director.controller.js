import { asyncHandler } from "../../middleware/asyncHandler.js";
import { customError } from "../../utils/customError.js";
import User from "../auth/User.model.js";
import { Case, Reminder } from "../secretary/secretary.model.js";

export const getAllArchivedCases = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const query = { archived: true };

  if (search) {
    query.$or = [
      { caseNumber: { $regex: search, $options: "i" } },
      { caseType: { $regex: search, $options: "i" } },
      { "clientId.name": { $regex: search, $options: "i" } },
    ];
  }

  const cases = await Case.find(query)
    .populate("clientId", "name contactNumber")
    .populate("assignedLawyer", "name email")
    .populate("approvingLawyer", "name email")
    .populate("archivedBy", "name email")
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit))
    .sort({ archivedAt: -1 });
  const count = await Case.countDocuments(query);

  res.status(200).json({
    success: true,
    data: cases,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
  });
});

export const getAllReminders = asyncHandler(async (req, res) => {
  const { upcoming } = req.query;

  const query = {};
  if (upcoming === "true") {
    query.reminderDate = { $gte: new Date() };
    query.sent = false;
  }

  const reminders = await Reminder.find(query)
    .populate("caseId", "caseNumber caseType")
    .populate("recipients", "name email")
    .sort({ reminderDate: 1 });

  res.status(200).json({ success: true, data: reminders });
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;

    const query = {};
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)
        .limit(Number(limit))
        .skip((page - 1) * Number(limit))
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        page: Number(page),
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        users,
    });
});

export const updateUserRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role, status } = req.body;
    console.log(id)
    const user = await User.findById(id);
    if (!user) throw new customError('User not found!', 404);

    if (role) user.role = role;
    if (status) user.status = status;

    await user.save();

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: {
            id: user._id,
            role: user.role,
            status: user.status,
        },
    });
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const user = await User.findById(id);
    if (!user) {
        throw new customError('User not found', 404);
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
})

export const addUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
        throw new customError("All fields are required", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new customError("User with this email already exists. Please try another email.", 400);
    }

    const isVerified = true;

    const newUser = await User.create({ name, email, phone, password, role, isVerified });

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            isVerified: newUser.isVerified
        }
    });
});

export const userStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const lawyers = await User.countDocuments({ role: "lawyer" });
    const approvingLawyers = await User.countDocuments({ role: "approvingLawyer" });
    const activeUsers = await User.countDocuments({ status: "active" });
    res.status(200).json({
        success: true,
        data: {
            totalUsers, lawyers, approvingLawyers, activeUsers
        }
    })
})

export const getAllCases = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, search } = req.query;

  const query = {};
  if (status) query.status = status;
  if (search) {
    query.$or = [
      { caseNumber: { $regex: search, $options: "i" } },
      { caseType: { $regex: search, $options: "i" } },
    ];
  }

  const cases = await Case.find(query)
    .populate("clientId", "name contactNumber email")
    .populate("assignedLawyer", "name email")
    .populate("secretary", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await Case.countDocuments(query);

  res.status(200).json({
    success: true,
    data: cases,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});