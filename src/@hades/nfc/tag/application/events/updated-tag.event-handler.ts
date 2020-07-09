import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedTagEvent } from './updated-tag.event';

@EventsHandler(UpdatedTagEvent)
export class UpdatedTagEventHandler implements IEventHandler<UpdatedTagEvent>
{
    handle(event: UpdatedTagEvent) 
    {
        // console.log('UpdatedTagEvent: ', event);
    }
}