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

@Injectable()
export class UpdateLangService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository
    ) {}

    public async main(
        id: LangId,
        name?: LangName,
        image?: LangImage,
        iso6392?: LangIso6392,
        iso6393?: LangIso6393,
        ietf?: LangIetf,
        sort?: LangSort,
        isActive?: LangIsActive,
        
    ): Promise<void>
    {        
        // create aggregate with factory pattern
        const lang = AdminLang.register(
            id,
            name,
            image,
            iso6392,
            iso6393,
            ietf,
            sort,
            isActive,
            null,
            new LangUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(lang);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const langRegister = this.publisher.mergeObjectContext(
            lang
        );
        
        langRegister.updated(lang); // apply event to model events
        langRegister.commit(); // commit all events of model
    }
}