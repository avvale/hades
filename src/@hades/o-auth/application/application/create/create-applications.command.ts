export class CreateApplicationsCommand
{
    constructor(
        public readonly applications: {
            id: string,
            code: string,
            secret: string,
            name: string,
            
        } []
    ) {}
}