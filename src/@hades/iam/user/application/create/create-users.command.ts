export class CreateUsersCommand
{
    constructor(
        public readonly users: {
            id: string,
            accountId: string,
            name: string,
            surname?: string,
            avatar?: string,
            mobile?: string,
            langId?: string,
            username: string,
            password: string,
            rememberToken?: string,
            data?: any,
            
        } []
    ) {}
}