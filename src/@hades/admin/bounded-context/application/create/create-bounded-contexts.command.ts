export class CreateBoundedContextsCommand 
{
    constructor(
        public readonly boundedContexts: {
            id: string,
            name: string,
            root: string,
            sort: number,
            isActive: boolean,
            
        } []
    ) {}
}