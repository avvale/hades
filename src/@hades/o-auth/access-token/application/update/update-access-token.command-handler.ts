import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAccessTokenCommand } from './update-access-token.command';
import { UpdateAccessTokenService } from './update-access-token.service';
import { 
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt
    
} from './../../domain/value-objects';

@CommandHandler(UpdateAccessTokenCommand)
export class UpdateAccessTokenCommandHandler implements ICommandHandler<UpdateAccessTokenCommand>
{
    constructor(
        private readonly updateAccessTokenService: UpdateAccessTokenService
    ) { }

    async execute(command: UpdateAccessTokenCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateAccessTokenService.main(
            new AccessTokenId(command.id),
            new AccessTokenClientId(command.clientId, { undefinable: true }),
            new AccessTokenToken(command.token, { undefinable: true }),
            new AccessTokenName(command.name),
            new AccessTokenIsRevoked(command.isRevoked, { undefinable: true }),
            new AccessTokenExpiresAt(command.expiresAt),
            
        )
    }
}