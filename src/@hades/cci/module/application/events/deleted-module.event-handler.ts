import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedModuleEvent } from './deleted-module.event';

@EventsHandler(DeletedModuleEvent)
export class DeletedModuleEventHandler implements IEventHandler<DeletedModuleEvent>
{
    handle(event: DeletedModuleEvent)
    {
        // console.log('DeletedModuleEvent: ', event);
    }
}