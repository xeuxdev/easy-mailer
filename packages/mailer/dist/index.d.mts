type Attachment = {
    filename?: string;
    content?: string | Buffer;
    path?: string;
    href?: string | URL;
    contentType?: string | "text/plain" | "image/png" | "image/jpeg" | "image/webp";
    encoding?: string;
    cid?: string;
    raw?: string;
};
type Message = {
    from: string;
    to?: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    plainText?: string;
    html: string | Buffer | Object;
    attachments?: Attachment[];
};
type Transport = {
    service: "gmail" | "smtp";
    host?: string;
    secure?: boolean;
    pool?: boolean;
    grouped?: boolean;
};
type Response = {
    message: string;
    status: "failed" | "successful";
};

declare function sendMail({ message, transport, }: {
    message: Message;
    transport: Transport;
}): Promise<Response>;

export { sendMail };
