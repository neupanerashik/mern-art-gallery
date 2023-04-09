import nodemailer from "nodemailer"

const sendEmail = ({sender, receiver, name, subject, message}) => {
	const transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: process.env.EMAIL_ADDRESS,
	    pass: process.env.APP_PASSWORD
	  }
	});

	// send mail with defined transport object
	const info = transporter.sendMail({
		from: `${name} <${sender}>`,
        to: receiver,
        subject: subject,
		text: `Sender: ${sender} \nMessage: ${message}`,
      }, (err, info) => {
		if(err) console.log("Failed" + err)
        else console.log(`Email sent:` + info.response);
	});
}

export default sendEmail;