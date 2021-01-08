import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAttachmentLibraryEvent } from './created-attachment-library.event';

@EventsHandler(CreatedAttachmentLibraryEvent)
export class CreatedAttachmentLibraryEventHandler implements IEventHandler<CreatedAttachmentLibraryEvent>
{
    handle(event: CreatedAttachmentLibraryEvent)
    {
        // console.log('CreatedAttachmentLibraryEvent: ', event);
    }
}