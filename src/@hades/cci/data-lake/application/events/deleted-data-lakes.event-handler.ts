import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedDataLakesEvent } from './deleted-data-lakes.event';

@EventsHandler(DeletedDataLakesEvent)
export class DeletedDataLakesEventHandler implements IEventHandler<DeletedDataLakesEvent>
{
    handle(event: DeletedDataLakesEvent)
    {
        // console.log('DeletedDataLakesEvent: ', event);
    }
}