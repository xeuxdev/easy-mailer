var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/mail/index.ts
import nodemailer from "nodemailer";
function sendEmailResponseToAPI(props) {
  return __async(this, null, function* () {
    var _a;
    if (!process.env.MAILER_API_KEY) {
      return props;
    }
    const payload = {
      accepted: props.accepted,
      rejected: props.rejected,
      response: props.response,
      envelope: props.envelope,
      messageId: props.messageId,
      apiKey: (_a = process.env.MAILER_API_KEY) == null ? void 0 : _a.replace(/['"]+/g, "")
    };
    const url = "https://easymailer.vercel.app";
    yield fetch(`${url}/api/users/profile/events`, {
      method: "POST",
      body: JSON.stringify({ payload })
    });
  });
}
function sendMail(_0) {
  return __async(this, arguments, function* ({
    message,
    transport
  }) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let response = {
      message: "",
      status: "failed"
    };
    const GOOGLE_EMAIL = (_a = process.env.MAILER_GOOGLE_USER_EMAIL) == null ? void 0 : _a.replace(
      /['"]+/g,
      ""
    );
    const GOOGLE_PASSWORD = (_b = process.env.MAILER_GOOGLE_USER_PASSWORD) == null ? void 0 : _b.replace(
      /['"]+/g,
      ""
    );
    const SMTP_USER = (_c = process.env.MAILER_SMTP_USERNAME) == null ? void 0 : _c.replace(/['"]+/g, "");
    const SMTP_PASSWORD = (_d = process.env.MAILER_SMTP_PASSWORD) == null ? void 0 : _d.replace(/['"]+/g, "");
    const SMTP_HOST = (_e = process.env.MAILER_SMTP_HOST) == null ? void 0 : _e.replace(/['"]+/g, "");
    const SMTP_PORT = (_f = process.env.MAILER_SMTP_PORT) == null ? void 0 : _f.replace(/['"]+/g, "");
    if (transport.service === "gmail" && (!GOOGLE_EMAIL || !GOOGLE_PASSWORD)) {
      throw new Error("No env variables, please add needed environment variables");
    }
    if (transport.service === "smtp" && (!SMTP_USER || !SMTP_PASSWORD || !SMTP_HOST || !SMTP_PORT)) {
      throw new Error("No env variables, please add needed environment variables");
    }
    let transporter;
    if (transport.service === "gmail") {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GOOGLE_EMAIL,
          pass: GOOGLE_PASSWORD
        }
      });
    } else if (transport.service === "smtp") {
      transporter = nodemailer.createTransport({
        // @ts-ignore
        pool: (_g = transport.pool) != null ? _g : true,
        host: SMTP_HOST,
        secure: (_h = transport.secure) != null ? _h : true,
        port: (SMTP_PORT != null ? SMTP_PORT : transport.secure === true) ? 465 : 587,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD
        }
      });
    }
    const user = transport.service === "gmail" ? GOOGLE_EMAIL : SMTP_USER;
    const messageToBeSent = {
      from: {
        name: message.from,
        address: user
      },
      to: message.to,
      bcc: message.bcc,
      cc: message.cc,
      subject: message.subject,
      html: message.html,
      text: message.plainText,
      attachments: message.attachments,
      headers: transport.grouped == false ? {
        "X-Entity-Ref-ID": crypto.randomUUID()
      } : void 0
    };
    yield transporter == null ? void 0 : transporter.sendMail(messageToBeSent).then((res) => {
      var _a2;
      response = {
        message: ((_a2 = res.response.match(/^(\d+)/)) == null ? void 0 : _a2[1]) ? "email sent successfully" : "",
        status: "successful"
      };
      sendEmailResponseToAPI(res);
    }).catch((err) => {
      response = {
        message: err.message.split("Learn more at")[0].replace(/535-5.7.8/g, "").trim(),
        status: "failed"
      };
      console.log(err);
    });
    return response;
  });
}
export {
  sendMail
};
