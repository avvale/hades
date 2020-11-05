import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateRefreshTokensCommand
{
    constructor(
        public readonly payload: {
            id: string,
            accessTokenId: string,
            token: string,
            isRevoked: boolean,
            expiresAt?: string,
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}