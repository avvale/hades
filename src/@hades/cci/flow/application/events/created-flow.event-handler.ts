import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedFlowEvent } from './created-flow.event';

@EventsHandler(CreatedFlowEvent)
export class CreatedFlowEventHandler implements IEventHandler<CreatedFlowEvent>
{
    handle(event: CreatedFlowEvent)
    {
        // console.log('CreatedFlowEvent: ', event);
    }
}