import nodemailer from 'nodemailer'

// this one is come from  nodemailer npm package as it is 
const sendEmail=async function (email,subject,message) {
      
    try {
          let transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.SMTP_USERNAME,
            pass:process.env.SMTP_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    });


    // send email with deined transport object 

  const info=  await transporter.sendMail({
        from:process.env.SMTP_FROM_EMAIL , // sender adress ,
        to:email,  // actual email 
        subject:subject,  // subject 
        html:message   // html body 

    });
    console.log("info in send email ", info.messageId);
    
            return  await info;

    } catch (error) {
        console.log("error in send email" , error);
        
    }
};


export default sendEmail;