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
    /** Define the email service you want to use either @params {gmail} or @params {smtp} */
    service: "gmail" | "smtp";
    host?: string;
    /** defines if the connection should use SSL (if true) or not (if false) defaults to true */
    secure?: boolean;
    pool?: boolean;
    /** Determine if the emails should be grouped together or not defaults to {true} */
    grouped?: boolean;
};
type Response = {
    message: string;
    status: "failed" | "successful";
};

/**
 * Sends an email using the provided message and transport options.
 *
 * @param {Object} options - The options for sending the email.
 * @param {Message} options.message - The message object containing the email details.
 * @param {Transport} options.transport - The transport options for sending the email.
 * @throws {Error} Throws an error if required environment variables are not set.
 * @return {Response} The response object containing the status and message of the email sending process.
 */
declare function sendMail({ message, transport, }: {
    message: Message;
    transport: Transport;
}): Promise<Response>;

export { sendMail };
