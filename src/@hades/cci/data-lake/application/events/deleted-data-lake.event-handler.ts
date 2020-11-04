import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedDataLakeEvent } from './deleted-data-lake.event';

@EventsHandler(DeletedDataLakeEvent)
export class DeletedDataLakeEventHandler implements IEventHandler<DeletedDataLakeEvent>
{
    handle(event: DeletedDataLakeEvent)
    {
        // console.log('DeletedDataLakeEvent: ', event);
    }
}