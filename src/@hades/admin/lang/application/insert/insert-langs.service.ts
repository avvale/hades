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
    LangUpdatedAt
} from './../../domain/value-objects';
import { ILangRepository } from '../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.entity';

@Injectable()
export class InsertLangsService
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
            isActive: LangIsActive
        } []
    ): Promise<void>
    {        
        // create object with factory pattern
        const entityLangs = langs.map(lang => AdminLang.register(
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
        await this.repository.insert(entityLangs);

        // TODO a falta de definir eventos
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        // const langRegistered = this.publisher.mergeObjectContext(
        //     await this.repository.findById(id)
        // );
        // 
        // langRegistered.created(lang); // apply event to model events
        // langRegistered.commit(); // commit all events of model
    }
}