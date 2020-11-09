import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateTenantsCommand
{
    constructor(
        public readonly payload: {
            id: string,
            name: string,
            code: string,
            logo?: string,
            isActive: boolean,
            data?: any,
            accountIds?: string[],
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}