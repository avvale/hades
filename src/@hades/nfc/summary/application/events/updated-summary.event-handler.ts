import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedSummaryEvent } from './updated-summary.event';

@EventsHandler(UpdatedSummaryEvent)
export class UpdatedSummaryEventHandler implements IEventHandler<UpdatedSummaryEvent>
{
    handle(event: UpdatedSummaryEvent) 
    {
        // console.log('UpdatedSummaryEvent: ', event);
    }
}