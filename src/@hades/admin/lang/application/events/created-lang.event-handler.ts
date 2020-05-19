import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreatedLangEvent } from "./created-lang.event";

@EventsHandler(CreatedLangEvent)
export class CreatedLangEventHandler implements IEventHandler<CreatedLangEvent>
{
    handle(event: CreatedLangEvent) 
    {
        // console.log('CreatedLangEvent: ', event);
    }
}