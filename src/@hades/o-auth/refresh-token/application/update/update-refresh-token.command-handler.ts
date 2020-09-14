import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRefreshTokenCommand } from './update-refresh-token.command';
import { UpdateRefreshTokenService } from './update-refresh-token.service';
import { 
    RefreshTokenId, 
    RefreshTokenAccessTokenId, 
    RefreshTokenToken, 
    RefreshTokenIsRevoked, 
    RefreshTokenExpiresAt
    
} from './../../domain/value-objects';

@CommandHandler(UpdateRefreshTokenCommand)
export class UpdateRefreshTokenCommandHandler implements ICommandHandler<UpdateRefreshTokenCommand>
{
    constructor(
        private readonly updateRefreshTokenService: UpdateRefreshTokenService
    ) { }

    async execute(command: UpdateRefreshTokenCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateRefreshTokenService.main(
            new RefreshTokenId(command.id),
            new RefreshTokenAccessTokenId(command.accessTokenId, { undefinable: true }),
            new RefreshTokenToken(command.token, { undefinable: true }),
            new RefreshTokenIsRevoked(command.isRevoked, { undefinable: true }),
            new RefreshTokenExpiresAt(command.expiresAt),
            
        )
    }
}