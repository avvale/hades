import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedSessionEvent } from './updated-session.event';

@EventsHandler(UpdatedSessionEvent)
export class UpdatedSessionEventHandler implements IEventHandler<UpdatedSessionEvent>
{
    handle(event: UpdatedSessionEvent) 
    {
        // console.log('UpdatedSessionEvent: ', event);
    }
}