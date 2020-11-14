import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAttachmentFamilyEvent } from './deleted-attachment-family.event';

@EventsHandler(DeletedAttachmentFamilyEvent)
export class DeletedAttachmentFamilyEventHandler implements IEventHandler<DeletedAttachmentFamilyEvent>
{
    handle(event: DeletedAttachmentFamilyEvent)
    {
        // console.log('DeletedAttachmentFamilyEvent: ', event);
    }
}