import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { LangResponse } from './../../domain/lang.response';
import { FindLangQuery } from './find-lang.query';
import { FindLangService } from './find-lang.service';

@QueryHandler(FindLangQuery)
export class FindLangQueryHandler implements IQueryHandler<FindLangQuery>
{
    constructor(
        private readonly findLangService: FindLangService
    ) { }

    async execute(query: FindLangQuery): Promise<LangResponse>
    {
        const lang = await this.findLangService.main(query.queryStatements);

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