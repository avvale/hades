import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedActionEvent } from './updated-action.event';

@EventsHandler(UpdatedActionEvent)
export class UpdatedActionEventHandler implements IEventHandler<UpdatedActionEvent>
{
    handle(event: UpdatedActionEvent) 
    {
        // console.log('UpdatedActionEvent: ', event);
    }
}