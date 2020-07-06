import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateResourceCommand } from './create-resource.command';
import { CreateResourceService } from './create-resource.service';
import { 
    ResourceId, 
    ResourceBoundedContextId, 
    ResourceName, 
    ResourceHasCustomFields, 
    ResourceHasAttachments
    
} from './../../domain/value-objects';

@CommandHandler(CreateResourceCommand)
export class CreateResourceCommandHandler implements ICommandHandler<CreateResourceCommand>
{
    constructor(
        private readonly createResourceService: CreateResourceService
    ) { }

    async execute(command: CreateResourceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createResourceService.main(
            new ResourceId(command.id),
            new ResourceBoundedContextId(command.boundedContextId),
            new ResourceName(command.name),
            new ResourceHasCustomFields(command.hasCustomFields),
            new ResourceHasAttachments(command.hasAttachments),
            
        );
    }
}