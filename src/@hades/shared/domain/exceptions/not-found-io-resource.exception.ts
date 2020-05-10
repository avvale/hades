export class NotFoundIOResourceException extends Error
{
    name: string;
    message: string;
    stack?: string;
}