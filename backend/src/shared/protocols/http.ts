import { Readable } from "stream";

export interface IFile {
    fieldname: string;
    originalname: string;
    mimetype: string;
    size: number;
    stream: Readable;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}

export type HttpResponse = {
    statusCode: number;
    body?: any;
};

export type HttpRequest<T = any, P = any, Q = any> = {
    body?: T;
    file?: IFile;
    files?: IFile[];
    query?: Q;
    userId?: string;
    headers?: any;
    params?: P;
};
