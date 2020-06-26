export class InsertModulesCommand 
{
    constructor(
        public readonly modules: {
            id: string,
            name: string,
            root: string,
            sort: number,
            isActive: boolean,
            
        } []
    ) {}
}