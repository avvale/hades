import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenExpiredRefreshToken, 
    RefreshTokenToken, 
    RefreshTokenIsRevoked, 
    RefreshTokenExpiresAt
} from './../../domain/value-objects';
import { IRefreshTokenRepository } from './../../domain/refresh-token.repository';
import { OAuthRefreshToken } from './../../domain/refresh-token.aggregate';
import { Jwt } from '@hades/shared/domain/lib/hades.types';

@Injectable()
export class CreateRefreshTokenService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository,
        private readonly jwtService: JwtService
    ) {}

    public async main(
        id: RefreshTokenId,
        accessTokenId: RefreshTokenAccessTokenId,
        expiredRefreshToken: RefreshTokenExpiredRefreshToken,
    ): Promise<void>
    {
        // compose refresh token
        const momentExpiredRefreshToken = expiredRefreshToken.value ? Utils.now().add(expiredRefreshToken.value, 'seconds') : null
        const refreshTokenDate: Jwt = {
            jit: id.value,
            aci: accessTokenId.value,
            iss: 'Hades OAuth',
            iat: parseInt(Utils.now().format('X')),
            nbf: parseInt(Utils.now().format('X')),
            exp: momentExpiredRefreshToken ? parseInt(momentExpiredRefreshToken.format('X')) : null
        };
        const refreshTokenValue = new RefreshTokenToken(this.jwtService.sign(refreshTokenDate));

        // create aggregate with factory pattern
        const refreshToken = OAuthRefreshToken.register(
            id,
            accessTokenId,
            refreshTokenValue,
            new RefreshTokenIsRevoked(false),
            new RefreshTokenExpiresAt(momentExpiredRefreshToken ? momentExpiredRefreshToken.format('YYYY-MM-DD H:mm:ss') : null),
            new RefreshTokenCreatedAt(Utils.nowTimestamp()),
            new RefreshTokenUpdatedAt(Utils.nowTimestamp()),
            null
        );

        // create
        await this.repository.create(refreshToken);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const refreshTokenRegister = this.publisher.mergeObjectContext(
            refreshToken
        );
        
        refreshTokenRegister.created(refreshToken); // apply event to model events
        refreshTokenRegister.commit(); // commit all events of model
    }
}