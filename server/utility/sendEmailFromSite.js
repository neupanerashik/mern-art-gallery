import nodemailer from "nodemailer"

const sendEmailFromSite = ({sender, receiver, subject, message}) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_ADDRESS,
			pass: process.env.APP_PASSWORD
		}
	});

	// send mail with defined transport object
	const info = transporter.sendMail({
		from: `Vis Art <${sender}>`,
        to: receiver,
        subject: subject,
		html: message,
		replyTo: 'noreply@example.com',
      }, (err, info) => {
		if(err) console.log("Failed" + err)
        else console.log(`Email sent:` + info.response);
	});
}

export default sendEmailFromSite;