// infrastructure
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
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
import { Lang } from './../../domain/lang';

@Injectable()
export class LangCreatorService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository
    ) {}

    public async main(
        id: LangId,
        name: LangName,
        image: LangImage,
        iso6392: LangIso6392,
        iso6393: LangIso6393,
        ietf: LangIetf,
        sort: LangSort,
        isActive: LangIsActive,
        createdAt: LangCreatedAt,
        updatedAt: LangUpdatedAt,
        deletedAt: LangDeletedAt
    ): Promise<void>
    {        
        // create object with factory pattern
        const lang = Lang.register(
            id,
            name,
            image,
            iso6392,
            iso6393,
            ietf,
            sort,
            isActive,
            createdAt,
            updatedAt,
            deletedAt
        );

        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const langRegister = this.publisher.mergeObjectContext(
            await this.repository.save(lang)
        );
        
        langRegister.langCreated(lang); // apply event to model events
        langRegister.commit(); // commit all events of model
    }
}