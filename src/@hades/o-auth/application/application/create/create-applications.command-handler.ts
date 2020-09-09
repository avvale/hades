import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateApplicationsCommand } from './create-applications.command';
import { CreateApplicationsService } from './create-applications.service';
import { 
    ApplicationId, 
    ApplicationCode, 
    ApplicationSecret, 
    ApplicationName
    
} from './../../domain/value-objects';

@CommandHandler(CreateApplicationsCommand)
export class CreateApplicationsCommandHandler implements ICommandHandler<CreateApplicationsCommand>
{
    constructor(
        private readonly createApplicationsService: CreateApplicationsService
    ) { }

    async execute(command: CreateApplicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationsService.main(
            command.applications
                .map(application => { 
                    return {
                        id: new ApplicationId(application.id),
                        code: new ApplicationCode(application.code),
                        secret: new ApplicationSecret(application.secret),
                        name: new ApplicationName(application.name),
                        
                    }
                })
        );
    }
}