import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateContactsCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId: string,
            tenantCode: string,
            systemId: string,
            systemName: string,
            roleId?: string,
            roleName?: string,
            name: string,
            surname?: string,
            email: string,
            mobile?: string,
            area?: string,
            hasConsentEmail: boolean,
            hasConsentMobile: boolean,
            isActive: boolean,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}