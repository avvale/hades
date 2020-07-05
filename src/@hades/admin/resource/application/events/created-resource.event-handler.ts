import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedResourceEvent } from './created-resource.event';

@EventsHandler(CreatedResourceEvent)
export class CreatedResourceEventHandler implements IEventHandler<CreatedResourceEvent>
{
    handle(event: CreatedResourceEvent) 
    {
        // console.log('CreatedResourceEvent: ', event);
    }
}