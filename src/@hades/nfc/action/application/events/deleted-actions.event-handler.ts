import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedActionsEvent } from './deleted-actions.event';

@EventsHandler(DeletedActionsEvent)
export class DeletedActionsEventHandler implements IEventHandler<DeletedActionsEvent>
{
    handle(event: DeletedActionsEvent) 
    {
        // console.log('DeletedActionsEvent: ', event);
    }
}