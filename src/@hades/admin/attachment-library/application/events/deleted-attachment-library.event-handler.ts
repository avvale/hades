import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAttachmentLibraryEvent } from './deleted-attachment-library.event';

@EventsHandler(DeletedAttachmentLibraryEvent)
export class DeletedAttachmentLibraryEventHandler implements IEventHandler<DeletedAttachmentLibraryEvent>
{
    handle(event: DeletedAttachmentLibraryEvent)
    {
        // console.log('DeletedAttachmentLibraryEvent: ', event);
    }
}