import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedChannelDetailEvent } from './deleted-channel-detail.event';

@EventsHandler(DeletedChannelDetailEvent)
export class DeletedChannelDetailEventHandler implements IEventHandler<DeletedChannelDetailEvent>
{
    handle(event: DeletedChannelDetailEvent) 
    {
        // console.log('DeletedChannelDetailEvent: ', event);
    }
}