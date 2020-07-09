import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedSummaryEvent } from './deleted-summary.event';

@EventsHandler(DeletedSummaryEvent)
export class DeletedSummaryEventHandler implements IEventHandler<DeletedSummaryEvent>
{
    handle(event: DeletedSummaryEvent) 
    {
        // console.log('DeletedSummaryEvent: ', event);
    }
}