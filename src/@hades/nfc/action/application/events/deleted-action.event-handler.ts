import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedActionEvent } from './deleted-action.event';

@EventsHandler(DeletedActionEvent)
export class DeletedActionEventHandler implements IEventHandler<DeletedActionEvent>
{
    handle(event: DeletedActionEvent) 
    {
        // console.log('DeletedActionEvent: ', event);
    }
}