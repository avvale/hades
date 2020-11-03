import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateExecutionsCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId: string,
            tenantCode: string,
            systemId: string,
            systemName: string,
            version: string,
            type: string,
            executedAt: string,
            monitoringStartAt: string,
            monitoringEndAt: string,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}