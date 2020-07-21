import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedResourcesEvent } from './created-resources.event';

@EventsHandler(CreatedResourcesEvent)
export class CreatedResourcesEventHandler implements IEventHandler<CreatedResourcesEvent>
{
    handle(event: CreatedResourcesEvent) 
    {
        // console.log('CreatedResourcesEvent: ', event);
    }
}