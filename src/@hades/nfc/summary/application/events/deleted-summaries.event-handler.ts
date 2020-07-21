import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedSummariesEvent } from './deleted-summaries.event';

@EventsHandler(DeletedSummariesEvent)
export class DeletedSummariesEventHandler implements IEventHandler<DeletedSummariesEvent>
{
    handle(event: DeletedSummariesEvent) 
    {
        // console.log('DeletedSummariesEvent: ', event);
    }
}