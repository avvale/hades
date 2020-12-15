import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAttachmentLibrariesEvent } from './deleted-attachment-libraries.event';

@EventsHandler(DeletedAttachmentLibrariesEvent)
export class DeletedAttachmentLibrariesEventHandler implements IEventHandler<DeletedAttachmentLibrariesEvent>
{
    handle(event: DeletedAttachmentLibrariesEvent)
    {
        // console.log('DeletedAttachmentLibrariesEvent: ', event);
    }
}