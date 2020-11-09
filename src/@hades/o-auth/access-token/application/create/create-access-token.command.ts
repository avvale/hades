import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateAccessTokenCommand
{
    constructor(
        public readonly payload: {
            id: string,
            clientId: string,
            accountId: string,
            name: string,
            expiredAccessToken: number,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}