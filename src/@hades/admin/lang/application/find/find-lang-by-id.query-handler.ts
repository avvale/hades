import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LangResponse } from './../../domain/lang.response';
import { LangId } from './../../domain/value-objects';
import { FindLangByIdQuery } from './find-lang-by-id.query';
import { FindLangByIdService } from './find-lang-by-id.service';

@QueryHandler(FindLangByIdQuery)
export class FindLangByIdQueryHandler implements IQueryHandler<FindLangByIdQuery>
{
    constructor(
        private readonly findLangByIdService: FindLangByIdService
    ) { }

    async execute(query: FindLangByIdQuery): Promise<LangResponse>
    {
        const lang = await this.findLangByIdService.main(new LangId(query.id));

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
                lang.deletedAt.value
            );
    }
}