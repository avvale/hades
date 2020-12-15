import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAttachmentLibrariesEvent } from './created-attachment-libraries.event';

@EventsHandler(CreatedAttachmentLibrariesEvent)
export class CreatedAttachmentLibrariesEventHandler implements IEventHandler<CreatedAttachmentLibrariesEvent>
{
    handle(event: CreatedAttachmentLibrariesEvent)
    {
        // console.log('CreatedAttachmentLibrariesEvent: ', event);
    }
}