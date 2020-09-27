import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangSort,
    LangIsActive,
    LangCreatedAt,
    LangUpdatedAt,
    LangDeletedAt
    
} from './../../domain/value-objects';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.aggregate';
import { AddLangsContextEvent } from './../events/add-langs-context.event';

@Injectable()
export class CreateLangsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository
    ) {}

    public async main(
        langs: {
            id: LangId,
            name: LangName,
            image: LangImage,
            iso6392: LangIso6392,
            iso6393: LangIso6393,
            ietf: LangIetf,
            sort: LangSort,
            isActive: LangIsActive,
            
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateLangs = langs.map(lang => AdminLang.register(
            lang.id,
            lang.name,
            lang.image,
            lang.iso6392,
            lang.iso6393,
            lang.ietf,
            lang.sort,
            lang.isActive,
            new LangCreatedAt(Utils.nowTimestamp()),
            new LangUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateLangs);

        // create AddLangsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const langsRegistered = this.publisher.mergeObjectContext(new AddLangsContextEvent(aggregateLangs));
 
        langsRegistered.created(); // apply event to model events
        langsRegistered.commit(); // commit all events of model
    }
}