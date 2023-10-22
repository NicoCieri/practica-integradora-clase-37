import { createTransport } from "nodemailer";
import config from "../config/config.js";

const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

const createMsgRegister = (first_name) => {
  return `<h1>Hola ${first_name}, ¡Bienvenido/a a Coderhouse!</h1>`;
};

const createMsgReset = (first_name) => {
  return `<h1>Hola ${first_name}, ¡Hacé click 
    <a href='http://localhost:${config.PORT}/api/new-pass'>AQUI</a> 
    para restablecer tu contraseña!</h1>`;
};

const createMsgUpdatePass = (first_name) => {
  return `<h1>Hola ${first_name}, ¡Tu contraseña se ha actualizado correctamente!</h1>`;
};

export const sendMail = async (user, service, token = null) => {
  try {
    const { first_name, email } = user;

    let msg = "";
    let subj = "";

    switch (service) {
      case "register":
        msg = createMsgRegister(first_name);
        subj = "Bienvenido/a";
        break;
      case "resetPass":
        msg = createMsgReset(first_name);
        subj = "Restablecimiento de contraseña";
        break;
      case "updatePass":
        msg = createMsgUpdatePass(first_name);
        subj = "Actualización de contraseña";
        break;
      default:
        break;
    }

    const gmailOptions = {
      from: config.EMAIL,
      to: email,
      subject: subj,
      html: msg,
    };

    await transporter.sendMail(gmailOptions);

    if (token) return token;

    console.log("email enviado");
  } catch (error) {
    throw new Error(error.message);
  }
};
