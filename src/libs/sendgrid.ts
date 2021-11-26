import sgMail from "@sendgrid/mail";
import config from "../config";

sgMail.setApiKey(config.SENDGRID_KEY);

export const sendMessage = async (
  to: string,
  messageid: string,
  sender: string | null
) => {
  const msg = {
    to,
    from: {
      email: config.SENDGRID_SENDER,
      name: "Decirte Que",
    },
    templateId: config.SENDGRID_TEMPLATEID,
    dynamicTemplateData: {
      buttonUrl: `${config.WEB_URL}/message/${messageid}`,
      subject: sender
        ? `${sender} tiene algo que decirte...`
        : "Tienes un mensaje anónimo.",
    },
  };

  await sgMail.send(msg);
};
