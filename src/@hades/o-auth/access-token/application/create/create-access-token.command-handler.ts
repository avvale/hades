import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAccessTokenCommand } from './create-access-token.command';
import { CreateAccessTokenService } from './create-access-token.service';
import { 
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenName,
    AccessTokenExpiredAccessToken
    
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
            new AccessTokenAccountId(command.accountId),
            new AccessTokenName(command.name),
            new AccessTokenExpiredAccessToken(command.expiredAccessToken)
            
        );
    }
}