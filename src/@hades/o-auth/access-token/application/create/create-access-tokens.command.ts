import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateAccessTokensCommand
{
    constructor(
        public readonly payload: {
            id: string,
            clientId: string,
            accountId?: string,
            token: string,
            name?: string,
            isRevoked: boolean,
            expiresAt?: string,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}