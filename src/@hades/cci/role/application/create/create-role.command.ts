import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateRoleCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId: string,
            tenantCode: string,
            name: string,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}