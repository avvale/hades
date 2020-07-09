import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedActionEvent } from './created-action.event';

@EventsHandler(CreatedActionEvent)
export class CreatedActionEventHandler implements IEventHandler<CreatedActionEvent>
{
    handle(event: CreatedActionEvent) 
    {
        // console.log('CreatedActionEvent: ', event);
    }
}