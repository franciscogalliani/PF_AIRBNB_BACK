import nodemailer from "nodemailer";

/// configuracion nodemailer ///
const config = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    user: "bennyreyea@gmail.com",
    pass: "owrvlwzucxgcsnlt"
}

// Creacion de tranporter para enviar los Mails
const getTransporter = () => {
    const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        tls: {
            rejectUnauthorized: false
        },
        secure: config.secure,
        auth: {
            user: config.user,
            pass: config.pass,
        },
    });
    return transporter;
}

const sendEmail = async (from: string, to: string, subject: string) => {
    const transporter = await getTransporter();
    await transporter.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        html: "", // Aqui deberia haber una plantilla HTML que se mostrara en el email
    });
}



export default sendEmail;


