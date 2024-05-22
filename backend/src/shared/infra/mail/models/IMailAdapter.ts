export interface IMailAdapter {
    sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void>;
}
