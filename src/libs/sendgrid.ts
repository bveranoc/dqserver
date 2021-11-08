import sgMail from "@sendgrid/mail";
import config from "../config";

sgMail.setApiKey(config.SENDGRID_KEY);

export const sendMessage = async (to: string, messageid: string) => {
  const msg = {
    to,
    from: config.SENDGRID_SENDER,
    templateId: config.SENDGRID_TEMPLATEID,
    dynamicTemplateData: {
      buttonUrl: `${config.WEB_URL}/message/${messageid}`,
    },
  };

  await sgMail.send(msg);
};
