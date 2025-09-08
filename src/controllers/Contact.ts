import express, {Response, Request} from 'express'
import nodemailer from 'nodemailer'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()


router.post('/contact', async(req:Request, res: Response) => {
    const{name, email, phone, message} = req.body
    if(!name || !email|| !message) {
       return res.status(400).json({err:'please provide all details'}) 
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
         return res.status(400).json({ err: "please provide a valid email address" });
     }

    const phoneRegex = /^[\d\s+()-]{7,15}$/;
    if (phone && !phoneRegex.test(phone)) {
         return res.status(400).json({ err: "please provide a valid phone number" });
    }

    try {
        //transporter
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    })  
    
    //email options
    let mailOptions = {
        from: email,
        to:process.env.EMAIL_USER,
        subject:`Job contact: ${name}`,
         text: `📩 New message from your portfolio website!\n
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}`,
    }
    await transporter.sendMail(mailOptions);
    res.status(200).json({success: true, msg:'message sent successfully'})
    } catch (error) {
        console.error('Error sending email', error)
        res.status(500).json({success: false, msg:"unable to send message, try again later"})
        
    }
})

export default router;