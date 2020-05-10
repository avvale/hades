import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { LangCreatedEvent } from "./lang-created.event";

@EventsHandler(LangCreatedEvent)
export class LangCreatedEventHandler implements IEventHandler<LangCreatedEvent>
{
    handle(event: LangCreatedEvent) 
    {
        // console.log('event: ', event);
    }
}