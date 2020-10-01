import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedFlowEvent } from './deleted-flow.event';

@EventsHandler(DeletedFlowEvent)
export class DeletedFlowEventHandler implements IEventHandler<DeletedFlowEvent>
{
    handle(event: DeletedFlowEvent) 
    {
        // console.log('DeletedFlowEvent: ', event);
    }
}