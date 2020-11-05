import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class CreateRefreshTokenCommand
{
    constructor(
        public readonly payload: {
            id: string,
            accessTokenId: string,
            expiredRefreshToken: number,
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}