import nodemailer from "nodemailer"

const sendEmail = (options) => {
	const transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: process.env.EMAIL_ADDRESS,
	    pass: 'dgim isqq jvda doku'
	  }
	});

	// send mail with defined transport object
	const info = transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: options.email,
        subject: options.subject,
        text: options.message
      }, (err, info) => {
		if(err) console.log("Error " + err)
        else console.log(`Email sent:` + info.response);
	});
}

export default sendEmail;