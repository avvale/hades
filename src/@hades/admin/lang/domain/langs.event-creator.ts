import { AggregateRoot } from "@nestjs/cqrs";
import { CreatedLangsEvent } from "../application/events/created-langs.event";
import { CreatedLangEvent } from "../application/events/created-lang.event";
import { AdminLang } from "./lang.aggregate";
import { DeletedLangsEvent } from "../application/events/deleted-langs.event";
import { DeletedLangEvent } from "../application/events/deleted-lang.event";

export class LangsEventCreator extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AdminLang[] = []
    ) {
        super();
    }

    *[Symbol.iterator]()
    { 
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot; 
    }

    created()
    {
        this.apply(
            new CreatedLangsEvent(
                this.aggregateRoots.map(lang => 
                    new CreatedLangEvent(
                        lang.id.value,
                        lang.name.value,
                        lang.image?.value,
                        lang.iso6392.value,
                        lang.iso6393.value,
                        lang.ietf.value,
                        lang.sort?.value,
                        lang.isActive.value,
                        lang.createdAt?.value,
                        lang.updatedAt?.value,
                        lang.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedLangsEvent(
                this.aggregateRoots.map(lang => 
                    new DeletedLangEvent(
                        lang.id.value,
                        lang.name.value,
                        lang.image?.value,
                        lang.iso6392.value,
                        lang.iso6393.value,
                        lang.ietf.value,
                        lang.sort?.value,
                        lang.isActive.value,
                        lang.createdAt?.value,
                        lang.updatedAt?.value,
                        lang.deletedAt?.value,
                        
                    )
                )
            )
        );
    }   
}