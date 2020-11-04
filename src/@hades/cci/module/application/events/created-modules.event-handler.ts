import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedModulesEvent } from './created-modules.event';

@EventsHandler(CreatedModulesEvent)
export class CreatedModulesEventHandler implements IEventHandler<CreatedModulesEvent>
{
    handle(event: CreatedModulesEvent)
    {
        // console.log('CreatedModulesEvent: ', event);
    }
}