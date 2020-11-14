import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateResourceCommand } from './update-resource.command';
import { UpdateResourceService } from './update-resource.service';
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

@CommandHandler(UpdateResourceCommand)
export class UpdateResourceCommandHandler implements ICommandHandler<UpdateResourceCommand>
{
    constructor(
        private readonly updateResourceService: UpdateResourceService,
    ) {}

    async execute(command: UpdateResourceCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateResourceService.main(
            {
                id: new ResourceId(command.payload.id),
                boundedContextId: new ResourceBoundedContextId(command.payload.boundedContextId, { undefinable: true }),
                attachmentFamilyIds: new ResourceAttachmentFamilyIds(command.payload.attachmentFamilyIds),
                name: new ResourceName(command.payload.name, { undefinable: true }),
                hasCustomFields: new ResourceHasCustomFields(command.payload.hasCustomFields, { undefinable: true }),
                hasAttachments: new ResourceHasAttachments(command.payload.hasAttachments, { undefinable: true }),
            },
            command.constraint,
            command.cQMetadata,
        )
    }
}