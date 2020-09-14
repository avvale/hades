export class CreateApplicationsCommand
{
    constructor(
        public readonly applications: {
            id: string,
            name: string,
            code: string,
            secret: string,
            isMaster: boolean,
            
        } []
    ) {}
}