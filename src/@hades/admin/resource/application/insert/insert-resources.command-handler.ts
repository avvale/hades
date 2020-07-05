import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InsertResourcesCommand } from './insert-resources.command';
import { InsertResourcesService } from './insert-resources.service';
import { 
    ResourceId, 
    ResourceBoundedContextId, 
    ResourceName, 
    ResourceHasCustomFields, 
    ResourceHasAttachments
    
} from './../../domain/value-objects';

@CommandHandler(InsertResourcesCommand)
export class InsertResourcesCommandHandler implements ICommandHandler<InsertResourcesCommand>
{
    constructor(
        private readonly insertResourcesService: InsertResourcesService
    ) { }

    async execute(command: InsertResourcesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.insertResourcesService.main(
            command.resources
                .map(resource => { 
                    return {
                        id: new ResourceId(resource.id),
                        boundedContextId: new ResourceBoundedContextId(resource.boundedContextId),
                        name: new ResourceName(resource.name),
                        hasCustomFields: new ResourceHasCustomFields(resource.hasCustomFields),
                        hasAttachments: new ResourceHasAttachments(resource.hasAttachments),
                        
                    }
                })
        );
    }
}