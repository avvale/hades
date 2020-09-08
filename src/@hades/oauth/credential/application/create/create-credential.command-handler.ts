import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCredentialCommand } from './create-credential.command';
import { CreateCredentialService } from './create-credential.service';
import { 
    CredentialUsername, 
    LangImage, 
    LangIso6392, 
    LangIso6393, 
    LangIetf, 
    LangSort, 
    LangIsActive
    
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
            new LangName(command.name),
            new LangImage(command.image),
            new LangIso6392(command.iso6392),
            new LangIso6393(command.iso6393),
            new LangIetf(command.ietf),
            new LangSort(command.sort),
            new LangIsActive(command.isActive),
            
        );
    }
}