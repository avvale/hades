import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAttachmentLibraryEvent } from './updated-attachment-library.event';

@EventsHandler(UpdatedAttachmentLibraryEvent)
export class UpdatedAttachmentLibraryEventHandler implements IEventHandler<UpdatedAttachmentLibraryEvent>
{
    handle(event: UpdatedAttachmentLibraryEvent)
    {
        // console.log('UpdatedAttachmentLibraryEvent: ', event);
    }
}