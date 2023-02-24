import nodemailer from "nodemailer"

const sendEmail = (options) => {
	const transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: process.env.EMAIL_ADDRESS,
	    pass: 'gegw hqap hdod qnrs'
	  }
	});

	const name = options.name || 'VisArt';

	// send mail with defined transport object
	const info = transporter.sendMail({
		from: `${name} <${options.sender}>`,
        to: options.receiver,
        subject: options.subject,
        text: options.message
      }, (err, info) => {
		if(err) console.log("Failed" + err)
        else console.log(`Email sent:` + info.response);
	});
}

export default sendEmail;