import nodemailer from "nodemailer";
import { customError } from "./customError.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shakeel7521951@gmail.com',
        pass: 'irfm pzgh kebw uvfg'
    },
    secure: true,
    timeout: 10000
});

const sendMail = async (email, subject, text) => {
    try {
        const mailOptions = {
            from: 'shakeel7521951',
            to: email,
            subject: subject,
            html: text
        }
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error in sending mail");
        throw new customError('Error in send mail', 500)
    }
}
export default sendMail;