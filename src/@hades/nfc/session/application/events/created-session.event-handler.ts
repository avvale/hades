import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedSessionEvent } from './created-session.event';

@EventsHandler(CreatedSessionEvent)
export class CreatedSessionEventHandler implements IEventHandler<CreatedSessionEvent>
{
    handle(event: CreatedSessionEvent) 
    {
        // console.log('CreatedSessionEvent: ', event);
    }
}