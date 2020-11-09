import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { AdminLang } from './lang.aggregate';
import { LangResponse } from './lang.response';
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
    LangDeletedAt,
} from './value-objects';

export class LangMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param lang
     */
    mapModelToAggregate(lang: ObjectLiteral, cQMetadata?: CQMetadata): AdminLang
    {
        if (!lang) return;

        return this.makeAggregate(lang, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param langs
     */
    mapModelsToAggregates(langs: ObjectLiteral[], cQMetadata?: CQMetadata): AdminLang[]
    {
        if (!Array.isArray(langs)) return;

        return langs.map(lang  => this.makeAggregate(lang, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param lang
     */
    mapAggregateToResponse(lang: AdminLang): LangResponse
    {
        return this.makeResponse(lang);
    }

    /**
     * Map array of aggregates to array responses
     * @param langs
     */
    mapAggregatesToResponses(langs: AdminLang[]): LangResponse[]
    {
        if (!Array.isArray(langs)) return;

        return langs.map(lang => this.makeResponse(lang));
    }

    private makeAggregate(lang: ObjectLiteral, cQMetadata?: CQMetadata): AdminLang
    {
        return AdminLang.register(
            new LangId(lang.id),
            new LangName(lang.name),
            new LangImage(lang.image),
            new LangIso6392(lang.iso6392),
            new LangIso6393(lang.iso6393),
            new LangIetf(lang.ietf),
            new LangSort(lang.sort),
            new LangIsActive(lang.isActive),
            new LangCreatedAt(lang.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new LangUpdatedAt(lang.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new LangDeletedAt(lang.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
        );
    }

    private makeResponse(lang: AdminLang): LangResponse
    {
        if (!lang) return;

        return new LangResponse(
            lang.id.value,
            lang.name.value,
            lang.image.value,
            lang.iso6392.value,
            lang.iso6393.value,
            lang.ietf.value,
            lang.sort.value,
            lang.isActive.value,
            lang.createdAt.value,
            lang.updatedAt.value,
            lang.deletedAt.value,
        );
    }
}