export interface IError {
    readonly code: string;
    readonly message: string;
    msgArgs?: string[];
}