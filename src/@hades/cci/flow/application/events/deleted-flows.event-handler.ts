import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedFlowsEvent } from './deleted-flows.event';

@EventsHandler(DeletedFlowsEvent)
export class DeletedFlowsEventHandler implements IEventHandler<DeletedFlowsEvent>
{
    handle(event: DeletedFlowsEvent) 
    {
        // console.log('DeletedFlowsEvent: ', event);
    }
}