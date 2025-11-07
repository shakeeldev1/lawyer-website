import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be atlest 6 characters"],
        select: false
    },
    phone: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    role: {
        type: String,
        enum: ["director", "secretary", "lawyer"],
        default: "secretary"
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        defautl: "active"
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;