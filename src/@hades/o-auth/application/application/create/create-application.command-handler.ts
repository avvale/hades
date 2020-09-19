import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateApplicationCommand } from './create-application.command';
import { CreateApplicationService } from './create-application.service';
import { 
    ApplicationId,
    ApplicationName,
    ApplicationCode,
    ApplicationSecret,
    ApplicationIsMaster
    
} from './../../domain/value-objects';

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationCommandHandler implements ICommandHandler<CreateApplicationCommand>
{
    constructor(
        private readonly createApplicationService: CreateApplicationService
    ) { }

    async execute(command: CreateApplicationCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationService.main(
            new ApplicationId(command.id),
            new ApplicationName(command.name),
            new ApplicationCode(command.code),
            new ApplicationSecret(command.secret),
            new ApplicationIsMaster(command.isMaster),
            
        );
    }
}