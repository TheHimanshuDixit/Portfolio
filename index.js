const express = require('express');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config()

const app = express();
const server = http.Server(app);
const port = 3000;

app.set("port", port);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views/index.html")));
app.use(express.static("asset"));

// Routing
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
})

app.post("/send_email", function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;

    // Email Template
    const output = `
                    <h4>You have a message</h4>
                    <h3>Contact Details : </h3>
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                    <h3>Message : </h3>
                    <p>${message}</p>
`;
    // Instantiate the SMTP server
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        }
    });

    // Specify what the email will look like
    var mailOption = {
        from: 'harshhimanshudixit@gmail.com',               //Sender mail
        to: 'himanshuharshdixit@gmail.com',					// Recever mail
        subject: subject,
        html: output
    }

    // Send mail with defined transport object
    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            res.send('<h1 style="color:red" > Something Wrong. </h1>');
        }
        else {
            res.send('<h1 style="color: green" >Thank You, Message has been Sent.');
        }
    })
})


// initialize web server 
app.listen(port, function () {
    console.log('Server is running on port ' + port);
})