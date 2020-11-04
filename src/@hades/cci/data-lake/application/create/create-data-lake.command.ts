import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateDataLakeCommand
{
    constructor(
        public readonly payload: {
            id: string,
            tenantId: string,
            executionId: string,
            tenantCode: string,
            payload: any,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}