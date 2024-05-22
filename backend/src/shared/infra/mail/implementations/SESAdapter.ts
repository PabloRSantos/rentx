import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailAdapter } from "../models";

export class SESAdapter implements IMailAdapter {
    private client: Transporter;
    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                region: process.env.AWS_REGION,
            }),
        });
    }

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);
        const templateHTML = templateParse(variables);

        await this.client.sendMail({
            to,
            from: `Rentx <${process.env.AWS_SES_EMAIL}>`,
            subject,
            html: templateHTML,
        });
    }
}
