const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON

// Route to handle form submission
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anshsingh1473@gmail.com', // Your Gmail address
      pass: 'mnjv fozp qafl rlax', // Your Gmail password or app-specific password
    },
  });
  

  // Mail options
  let mailOptions = {
    from: email, // Sender email
    to: 'redcar1473@gmail.com', // Your email to receive the message
    subject: `Contact Form Submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
