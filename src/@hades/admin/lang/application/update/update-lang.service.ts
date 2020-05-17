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
    LangUpdatedAt
} from './../../domain/value-objects';
import { ILangRepository } from './../../domain/lang.repository';
import { Lang } from './../../domain/lang';

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
        isActive?: LangIsActive
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
            new LangCreatedAt(),
            new LangUpdatedAt(),
            null
        );
        // TODO, TypeOrm Error: https://github.com/typeorm/typeorm/issues/5719
        // Cuando das de alta un modelo llama 3 veces al transfor y te crea una anidación incorrecta
        // cuando se corrija podremos sustituir el await this.repository.findById(id) por lang

        await this.repository.update(lang);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const langRegister = this.publisher.mergeObjectContext(
           await this.repository.findById(id)
        );
        
        langRegister.updated(lang); // apply event to model events
        langRegister.commit(); // commit all events of model
    }
}