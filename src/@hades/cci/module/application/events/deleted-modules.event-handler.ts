import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedModulesEvent } from './deleted-modules.event';

@EventsHandler(DeletedModulesEvent)
export class DeletedModulesEventHandler implements IEventHandler<DeletedModulesEvent>
{
    handle(event: DeletedModulesEvent)
    {
        // console.log('DeletedModulesEvent: ', event);
    }
}