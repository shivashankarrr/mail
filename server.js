const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors()); // Apply CORS middleware
app.use(bodyParser.json());

// POST endpoint for sending emails
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object using nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shankuu786@gmail.com', // Your Gmail address
            pass: 'ungndqvcluzjiyhu' // Your Gmail password or app-specific password
        }
    });

    // Construct the email message for your inbox
    let mailOptions = {
        from: 'shankuu786@gmail.com', // Sender's email address
        to: 'shankuu786@gmail.com', // Your email address (where you receive messages)
        subject: `Message from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}`
    };

    // Construct the auto-reply email message for the client
    let autoReplyOptions = {
        from: 'shankuu786@gmail.com',
        to: email, // Client's email address
        subject: 'Message Received - Thank You!',
        text: `Dear ${name},

Thank you for your message! We have received your inquiry and will get back to you as soon as possible.

Best Regards,
Your Name`
    };

    try {
        // Send email to your inbox
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent to inbox:', info.response);

        // Send auto-reply email to the client
        let replyInfo = await transporter.sendMail(autoReplyOptions);
        console.log('Auto-reply sent:', replyInfo.response);

        res.status(200).send('Emails sent successfully');
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).send('Error: Failed to send emails');
    }
});

// Start the server
const port = 3001; // Choose any port you like
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
