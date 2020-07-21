import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedActionsEvent } from './created-actions.event';

@EventsHandler(CreatedActionsEvent)
export class CreatedActionsEventHandler implements IEventHandler<CreatedActionsEvent>
{
    handle(event: CreatedActionsEvent) 
    {
        // console.log('CreatedActionsEvent: ', event);
    }
}