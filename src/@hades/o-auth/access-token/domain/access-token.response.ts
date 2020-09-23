import { ClientResponse } from '@hades/o-auth/client/domain/client.response';

import { RefreshTokenResponse } from '@hades/o-auth/refresh-token/domain/refresh-token.response';


export class AccessTokenResponse 
{
    constructor(
        public readonly id: string,
        public readonly clientId: string,
        public readonly token: string,
        public readonly name: string,
        public readonly isRevoked: boolean,
        public readonly expiresAt: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly client: ClientResponse,
        public readonly refreshToken: RefreshTokenResponse
    ) {}
}