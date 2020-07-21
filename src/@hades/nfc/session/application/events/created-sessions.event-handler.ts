import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedSessionsEvent } from './created-sessions.event';

@EventsHandler(CreatedSessionsEvent)
export class CreatedSessionsEventHandler implements IEventHandler<CreatedSessionsEvent>
{
    handle(event: CreatedSessionsEvent) 
    {
        // console.log('CreatedSessionsEvent: ', event);
    }
}