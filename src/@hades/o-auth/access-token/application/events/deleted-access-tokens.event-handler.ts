import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAccessTokensEvent } from './deleted-access-tokens.event';

@EventsHandler(DeletedAccessTokensEvent)
export class DeletedAccessTokensEventHandler implements IEventHandler<DeletedAccessTokensEvent>
{
    handle(event: DeletedAccessTokensEvent) 
    {
        // console.log('DeletedAccessTokensEvent: ', event);
    }
}