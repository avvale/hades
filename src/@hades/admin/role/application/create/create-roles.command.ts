export class CreateRolesCommand
{
    constructor(
        public readonly roles: {
            id: string,
            name: string,
            isMaster: boolean,
            
        } []
    ) {}
}