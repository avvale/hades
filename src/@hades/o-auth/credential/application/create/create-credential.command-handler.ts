import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCredentialCommand } from './create-credential.command';
import { CreateCredentialService } from './create-credential.service';
import { 
    CredentialUsername, 
    CredentialPassword, 
    CredentialGrantType,
} from './../../domain/value-objects';

@CommandHandler(CreateCredentialCommand)
export class CreateCredentialCommandHandler implements ICommandHandler<CreateCredentialCommand>
{
    constructor(
        private readonly createCredentialService: CreateCredentialService
    ) { }

    async execute(command: CreateCredentialCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createCredentialService.main(
            new CredentialUsername(command.username),
            new CredentialPassword(command.password),
            new CredentialGrantType(command.grantType),
        );
    }
}