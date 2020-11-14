import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateResourceCommand } from './create-resource.command';
import { CreateResourceService } from './create-resource.service';
import {
    ResourceId,
    ResourceBoundedContextId,
    ResourceAttachmentFamilyIds,
    ResourceName,
    ResourceHasCustomFields,
    ResourceHasAttachments,
    ResourceCreatedAt,
    ResourceUpdatedAt,
    ResourceDeletedAt,
} from './../../domain/value-objects';

@CommandHandler(CreateResourceCommand)
export class CreateResourceCommandHandler implements ICommandHandler<CreateResourceCommand>
{
    constructor(
        private readonly createResourceService: CreateResourceService,
    ) {}

    async execute(command: CreateResourceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createResourceService.main(
            {
                id: new ResourceId(command.payload.id),
                boundedContextId: new ResourceBoundedContextId(command.payload.boundedContextId),
                attachmentFamilyIds: new ResourceAttachmentFamilyIds(command.payload.attachmentFamilyIds),
                name: new ResourceName(command.payload.name),
                hasCustomFields: new ResourceHasCustomFields(command.payload.hasCustomFields),
                hasAttachments: new ResourceHasAttachments(command.payload.hasAttachments),
            }
        );
    }
}