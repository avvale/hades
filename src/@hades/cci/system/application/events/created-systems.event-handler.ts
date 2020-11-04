import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedSystemsEvent } from './created-systems.event';

@EventsHandler(CreatedSystemsEvent)
export class CreatedSystemsEventHandler implements IEventHandler<CreatedSystemsEvent>
{
    handle(event: CreatedSystemsEvent)
    {
        // console.log('CreatedSystemsEvent: ', event);
    }
}