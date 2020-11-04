import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateSystemsCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId: string,
            tenantCode: string,
            version: string,
            name: string,
            environment: string,
            technology: string,
            isActive: boolean,
            cancelledAt?: string,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}