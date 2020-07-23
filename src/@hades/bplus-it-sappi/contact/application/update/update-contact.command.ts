export class UpdateContactCommand 
{
    constructor(
        public readonly id: string,
        public readonly tenantId?: string,
        public readonly tenantCode?: string,
        public readonly systemId?: string,
        public readonly systemName?: string,
        public readonly roleId?: string,
        public readonly roleName?: string,
        public readonly name?: string,
        public readonly surname?: string,
        public readonly email?: string,
        public readonly mobile?: string,
        public readonly area?: string,
        public readonly hasConsentEmail?: boolean,
        public readonly hasConsentMobile?: boolean,
        public readonly isActive?: boolean,
        
    ) {}
}