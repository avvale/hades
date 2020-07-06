import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateResourceCommand } from './update-resource.command';
import { UpdateResourceService } from './update-resource.service';
import { 
    ResourceId, 
    ResourceBoundedContextId, 
    ResourceName, 
    ResourceHasCustomFields, 
    ResourceHasAttachments
    
} from './../../domain/value-objects';

@CommandHandler(UpdateResourceCommand)
export class UpdateResourceCommandHandler implements ICommandHandler<UpdateResourceCommand>
{
    constructor(
        private readonly updateResourceService: UpdateResourceService
    ) { }

    async execute(command: UpdateResourceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateResourceService.main(
            new ResourceId(command.id),
            new ResourceBoundedContextId(command.boundedContextId, { undefinable: true }),
            new ResourceName(command.name, { undefinable: true }),
            new ResourceHasCustomFields(command.hasCustomFields, { undefinable: true }),
            new ResourceHasAttachments(command.hasAttachments, { undefinable: true }),
            
        )
    }
}