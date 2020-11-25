import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAttachmentFamiliesEvent } from './deleted-attachment-families.event';

@EventsHandler(DeletedAttachmentFamiliesEvent)
export class DeletedAttachmentFamiliesEventHandler implements IEventHandler<DeletedAttachmentFamiliesEvent>
{
    handle(event: DeletedAttachmentFamiliesEvent)
    {
        // console.log('DeletedAttachmentFamiliesEvent: ', event);
    }
}