import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccessTokenCommand } from './create-access-token.command';
import { CreateAccessTokenService } from './create-access-token.service';
import { 
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt
    
} from './../../domain/value-objects';

@CommandHandler(CreateAccessTokenCommand)
export class CreateAccessTokenCommandHandler implements ICommandHandler<CreateAccessTokenCommand>
{
    constructor(
        private readonly createAccessTokenService: CreateAccessTokenService
    ) { }

    async execute(command: CreateAccessTokenCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createAccessTokenService.main(
            new AccessTokenId(command.id),
            new AccessTokenClientId(command.clientId),
            new AccessTokenToken(command.token),
            new AccessTokenName(command.name),
            new AccessTokenIsRevoked(command.isRevoked),
            new AccessTokenExpiresAt(command.expiresAt),
            
        );
    }
}