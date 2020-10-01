import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedSystemEvent } from './updated-system.event';

@EventsHandler(UpdatedSystemEvent)
export class UpdatedSystemEventHandler implements IEventHandler<UpdatedSystemEvent>
{
    handle(event: UpdatedSystemEvent) 
    {
        // console.log('UpdatedSystemEvent: ', event);
    }
}