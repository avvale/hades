import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateResourcesCommand } from './create-resources.command';
import { CreateResourcesService } from './create-resources.service';
import {
    ResourceId,
    ResourceBoundedContextId,
    ResourceName,
    ResourceHasCustomFields,
    ResourceHasAttachments,
    ResourceCreatedAt,
    ResourceUpdatedAt,
    ResourceDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateResourcesCommand)
export class CreateResourcesCommandHandler implements ICommandHandler<CreateResourcesCommand>
{
    constructor(
        private readonly createResourcesService: CreateResourcesService,
    ) {}

    async execute(command: CreateResourcesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createResourcesService.main(
            command.payload
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