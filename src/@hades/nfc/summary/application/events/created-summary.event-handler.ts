import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedSummaryEvent } from './created-summary.event';

@EventsHandler(CreatedSummaryEvent)
export class CreatedSummaryEventHandler implements IEventHandler<CreatedSummaryEvent>
{
    handle(event: CreatedSummaryEvent) 
    {
        // console.log('CreatedSummaryEvent: ', event);
    }
}