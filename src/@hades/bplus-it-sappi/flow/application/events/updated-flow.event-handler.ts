import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedFlowEvent } from './updated-flow.event';

@EventsHandler(UpdatedFlowEvent)
export class UpdatedFlowEventHandler implements IEventHandler<UpdatedFlowEvent>
{
    handle(event: UpdatedFlowEvent) 
    {
        // console.log('UpdatedFlowEvent: ', event);
    }
}