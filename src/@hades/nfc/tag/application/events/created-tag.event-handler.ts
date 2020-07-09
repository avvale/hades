import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedTagEvent } from './created-tag.event';

@EventsHandler(CreatedTagEvent)
export class CreatedTagEventHandler implements IEventHandler<CreatedTagEvent>
{
    handle(event: CreatedTagEvent) 
    {
        // console.log('CreatedTagEvent: ', event);
    }
}