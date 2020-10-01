import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedSystemEvent } from './created-system.event';

@EventsHandler(CreatedSystemEvent)
export class CreatedSystemEventHandler implements IEventHandler<CreatedSystemEvent>
{
    handle(event: CreatedSystemEvent) 
    {
        // console.log('CreatedSystemEvent: ', event);
    }
}