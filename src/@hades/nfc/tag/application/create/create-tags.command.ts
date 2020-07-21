export class CreateTagsCommand 
{
    constructor(
        public readonly tags: {
            id: string,
            code: number,
            tenantId: string,
            tenantCode: string,
            urlBase: string,
            params?: any,
            offset?: number,
            isSessionRequired?: boolean,
            
        } []
    ) {}
}