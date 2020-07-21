import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedTagsEvent } from './deleted-tags.event';

@EventsHandler(DeletedTagsEvent)
export class DeletedTagsEventHandler implements IEventHandler<DeletedTagsEvent>
{
    handle(event: DeletedTagsEvent) 
    {
        // console.log('DeletedTagsEvent: ', event);
    }
}