const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(
	cors({
		origin: [
			'http://localhost:5173',
			'https://www.firdausmedia.com',
		],
	})
);

app.use(express.json());

const ID = process.env.ID;
const PASS = process.env.PASS;
const REC = process.env.REC;

app.post('/', (req, res) => {
	res.setHeader(
		'Access-Control-Allow-Origin',
		'*'
	);
	var transporter = nodemailer.createTransport({
		host: 'smtp.hostinger.com',
		port: 465,
		secure: true,
		auth: {
			user: ID,
			pass: PASS,
		},
	});

	var mailOptions = {
		from: `alerts@firdausmedia<${ID}>`,
		to: REC,
		subject: `Firdaus Media - New Contact Form Submission from ${req.body.name}`,
		text: req.body.message,
		html: `
        Hello there,<br>
        <p>
        A new contact form submission has been received through Firdaus Media's website. Please find the details below:
       </p>
       </p>
       <ul>
        <li>Name: <b>${req.body.name}</b></li>
        <li>Email: <b>${req.body.email}</b></li>
        <li>Phone Number: <b>${req.body.number}</b></li>
        <li>Service:<b>${req.body.service}</b></li>
        <li>Message: <b>${req.body.message}</b></li>
       </ul>
       </b>
       <p>
       The submitter has expressed interest in <b>${req.body.service}</b> and has provided their contact information for further communication. Kindly assign a team member to follow up with them at your earliest convenience.
       </p>
       <br>
       Thank you.
        `,
	};

	transporter.sendMail(
		mailOptions,
		function (error, info) {
			if (error) {
				res.json(error);
			} else {
				res.json({
					status: 'success',
					respMesg: 'Email Sent Successfully',
				});
			}
		}
	);
});

app.listen(4000, () => {
	console.log(`Server is listening on port 4000`);
});
