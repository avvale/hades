import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedTagsEvent } from './created-tags.event';

@EventsHandler(CreatedTagsEvent)
export class CreatedTagsEventHandler implements IEventHandler<CreatedTagsEvent>
{
    handle(event: CreatedTagsEvent) 
    {
        // console.log('CreatedTagsEvent: ', event);
    }
}