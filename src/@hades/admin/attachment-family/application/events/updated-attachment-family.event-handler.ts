import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAttachmentFamilyEvent } from './updated-attachment-family.event';

@EventsHandler(UpdatedAttachmentFamilyEvent)
export class UpdatedAttachmentFamilyEventHandler implements IEventHandler<UpdatedAttachmentFamilyEvent>
{
    handle(event: UpdatedAttachmentFamilyEvent)
    {
        // console.log('UpdatedAttachmentFamilyEvent: ', event);
    }
}