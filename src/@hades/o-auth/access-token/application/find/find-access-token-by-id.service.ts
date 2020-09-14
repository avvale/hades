import { Injectable } from '@nestjs/common';
import { IAccessTokenRepository } from './../../domain/access-token.repository';
import { OAuthAccessToken } from './../../domain/access-token.aggregate';
import { AccessTokenId } from './../../domain/value-objects';

@Injectable()
export class FindAccessTokenByIdService
{
    constructor(
        private readonly repository: IAccessTokenRepository
    ) {}

    public async main(id: AccessTokenId): Promise<OAuthAccessToken>
    {        
        return await this.repository.findById(id);
    }
}