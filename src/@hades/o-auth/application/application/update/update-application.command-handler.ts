import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateApplicationCommand } from './update-application.command';
import { UpdateApplicationService } from './update-application.service';
import { 
    ApplicationId, 
    ApplicationCode, 
    ApplicationSecret, 
    ApplicationName
    
} from './../../domain/value-objects';

@CommandHandler(UpdateApplicationCommand)
export class UpdateApplicationCommandHandler implements ICommandHandler<UpdateApplicationCommand>
{
    constructor(
        private readonly updateApplicationService: UpdateApplicationService
    ) { }

    async execute(command: UpdateApplicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateApplicationService.main(
            new ApplicationId(command.id),
            new ApplicationCode(command.code, { undefinable: true }),
            new ApplicationSecret(command.secret, { undefinable: true }),
            new ApplicationName(command.name, { undefinable: true }),
            
        )
    }
}