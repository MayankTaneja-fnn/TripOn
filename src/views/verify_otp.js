const nodemailer=require("nodemailer");

async function sendMail(email){
    let otp=Math.floor(Math.random()*2) +100000;
    console.log(otp);
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'tanejamayank21@gmail.com',
            pass:'vfwofxlbnlgmbtpn',
        },
    });
    const mailoptions={
        from:'tanejamayank21@gmail.com',
        to:`${email}`,
        subject:'Welcome to app',
        text:`This is an email.Your OTP is ${otp}`,
    };
    try{
        const result=await transporter.sendMail(mailoptions);
        console.log('Email sent successfully');
    }
    catch(err){
        console.log('Email send with error'+err);
    }
}
    let otp_form=document.getElementById("signup-form");
    // let sub_but=document.getElementById("email-form-button");
    const email=document.getElementById("email").value;
    otp_form.addEventListener("submit",()=>{
        console.log("hello");
        sendMail(email);
        event.preventDefault();
        this.action="/signUp/verify_email";
        
        this.submit();

    })