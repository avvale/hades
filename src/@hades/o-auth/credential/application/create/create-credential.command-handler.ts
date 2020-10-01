import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCredentialCommand } from './create-credential.command';
import { CreateCredentialService } from './create-credential.service';
import { 
    CredentialGrantType,
    CredentialUsername,
    CredentialPassword,
    CredentialAccessTokenId,
    CredentialRefreshToken,
    CredentialClientSecret,
    CredentialRedirect
    
} from './../../domain/value-objects';

@CommandHandler(CreateCredentialCommand)
export class CreateCredentialCommandHandler implements ICommandHandler<CreateCredentialCommand>
{
    constructor(
        private readonly createCredentialsService: CreateCredentialService
    ) { }

    async execute(command: CreateCredentialCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createCredentialsService.main(
            new CredentialGrantType(command.grantType),
            new CredentialUsername(command.username),
            new CredentialPassword(command.password),
            new CredentialAccessTokenId(command.accessTokenId),
            new CredentialRefreshToken(command.refreshToken),
            new CredentialClientSecret(command.clientSecret),
            new CredentialRedirect(command.redirect),
        );
    }
}