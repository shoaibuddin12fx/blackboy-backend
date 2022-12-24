import sgMail from '@sendgrid/mail';
import jwt from "jsonwebtoken";

const apiKey = process.env.SENDGRID_API_KEY
sgMail.setApiKey(apiKey);

const sendVerificationEmail = async (email, name, id) => {
    console.log(id);
    const token = await jwt.sign({ _id: id.toString()}, 'secretKey');
    sgMail
        .send({
            to: email, // Change to your recipient
            from: '', // Change to your verified sender
            subject: 'Verify your email',
            text: `Hello ${name},\n\n Please Verify your account by clicking on this link:\n\n http://localhost:4000/confirmation/${token}`,
        })
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}
export { sendVerificationEmail as default }

