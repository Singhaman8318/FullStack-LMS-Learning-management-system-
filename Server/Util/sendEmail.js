import nodemailer from 'nodemailer'

// this one is come from  nodemailer npm package as it is 
const sendEmail=async function (email,subject,message) {
      
    let transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.SMTP_USERNAME,
            pass:process.env.SMTP_PASSWORD
        },
    });


    // send email with deined transport object 

  const info=  await transporter.sendMail({
        from:process.env.SMTP_FROM_EMAIL , // sender adress ,
        to:email,  // actual email 
        subject:subject,  // subject 
        html:message   // html body 
    });
};


export default sendEmail;