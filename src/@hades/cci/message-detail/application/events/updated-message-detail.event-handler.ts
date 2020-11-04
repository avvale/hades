import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedMessageDetailEvent } from './updated-message-detail.event';

@EventsHandler(UpdatedMessageDetailEvent)
export class UpdatedMessageDetailEventHandler implements IEventHandler<UpdatedMessageDetailEvent>
{
    handle(event: UpdatedMessageDetailEvent)
    {
        // console.log('UpdatedMessageDetailEvent: ', event);
    }
}