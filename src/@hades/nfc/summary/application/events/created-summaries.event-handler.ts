import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedSummariesEvent } from './created-summaries.event';

@EventsHandler(CreatedSummariesEvent)
export class CreatedSummariesEventHandler implements IEventHandler<CreatedSummariesEvent>
{
    handle(event: CreatedSummariesEvent) 
    {
        // console.log('CreatedSummariesEvent: ', event);
    }
}