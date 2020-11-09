import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRefreshTokenCommand } from './create-refresh-token.command';
import { CreateRefreshTokenService } from './create-refresh-token.service';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
} from './../../domain/value-objects';
import { RefreshTokenExpiredRefreshToken } from '../../domain/value-objects/refresh-token-expired-refresh-token';

@CommandHandler(CreateRefreshTokenCommand)
export class CreateRefreshTokenCommandHandler implements ICommandHandler<CreateRefreshTokenCommand>
{
    constructor(
        private readonly createRefreshTokenService: CreateRefreshTokenService,
    ) {}

    async execute(command: CreateRefreshTokenCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRefreshTokenService.main(
            {
                id: new RefreshTokenId(command.payload.id),
                accessTokenId: new RefreshTokenAccessTokenId(command.payload.accessTokenId),
                expiredRefreshToken: new RefreshTokenExpiredRefreshToken(command.payload.expiredRefreshToken),
            }
        );
    }
}