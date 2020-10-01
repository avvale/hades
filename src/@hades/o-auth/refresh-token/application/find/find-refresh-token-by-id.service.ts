import { Injectable } from '@nestjs/common';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';
import { RefreshTokenId } from './../../domain/value-objects';

@Injectable()
export class FindRefreshTokenByIdService
{
    constructor(
        private readonly repository: IRefreshTokenRepository
    ) {}

    public async main(id: RefreshTokenId): Promise<OAuthRefreshToken>
    {        
        return await this.repository.findById(id);
    }
}