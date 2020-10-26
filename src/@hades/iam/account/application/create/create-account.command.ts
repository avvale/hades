export class CreateAccountCommand
{
    constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly email: string,
        public readonly isActive: boolean,
        public readonly clientId: string,
        public readonly dApplicationCodes: any,
        public readonly dPermissions: any,
        public readonly data: any,
        public readonly roleIds: string[],
        public readonly tenantIds: string[],
    ) {}
}