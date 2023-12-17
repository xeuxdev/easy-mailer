"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  sendMail: () => sendMail
});
module.exports = __toCommonJS(src_exports);

// src/mail/index.ts
var import_nodemailer = __toESM(require("nodemailer"));
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
      transporter = import_nodemailer.default.createTransport({
        service: "gmail",
        auth: {
          user: GOOGLE_EMAIL,
          pass: GOOGLE_PASSWORD
        }
      });
    } else if (transport.service === "smtp") {
      transporter = import_nodemailer.default.createTransport({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendMail
});
