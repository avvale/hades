import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedResourceEvent } from './updated-resource.event';

@EventsHandler(UpdatedResourceEvent)
export class UpdatedResourceEventHandler implements IEventHandler<UpdatedResourceEvent>
{
    handle(event: UpdatedResourceEvent) 
    {
        // console.log('UpdatedResourceEvent: ', event);
    }
}