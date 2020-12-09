import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import {
    LangId,
    LangName,
    LangImage,
    LangIso6392,
    LangIso6393,
    LangIetf,
    LangDir,
    LangSort,
    LangIsActive,
    LangCreatedAt,
    LangUpdatedAt,
    LangDeletedAt,
} from './../../domain/value-objects';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.aggregate';

@Injectable()
export class UpdateLangService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ILangRepository,
    ) {}

    public async main(
        payload: {
            id: LangId,
            name?: LangName,
            image?: LangImage,
            iso6392?: LangIso6392,
            iso6393?: LangIso6393,
            ietf?: LangIetf,
            dir?: LangDir,
            sort?: LangSort,
            isActive?: LangIsActive,
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const lang = AdminLang.register(
            payload.id,
            payload.name,
            payload.image,
            payload.iso6392,
            payload.iso6393,
            payload.ietf,
            payload.dir,
            payload.sort,
            payload.isActive,
            null,
            new LangUpdatedAt({currentTimestamp: true}),
            null
        );

        // update
        await this.repository.update(lang, constraint, cQMetadata);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const langRegister = this.publisher.mergeObjectContext(
            lang
        );

        langRegister.updated(lang); // apply event to model events
        langRegister.commit(); // commit all events of model
    }
}