import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationLangsResponse } from './../../domain/pagination-langs.response';
import { PaginateLangsQuery } from './paginate-langs.query';
import { PaginateLangsService } from './paginate-langs.service';

@QueryHandler(PaginateLangsQuery)
export class PaginateLangsQueryHandler implements IQueryHandler<PaginateLangsQuery>
{
    constructor(
        private readonly paginateLangsService: PaginateLangsService
    ) { }

    async execute(query: PaginateLangsQuery): Promise<PaginationLangsResponse>
    {
        const { total, count, rows } = await this.paginateLangsService.main(query.queryStatements, query.constraints)

        return new PaginationLangsResponse(
            total, 
            count, 
            rows
        );

        return (await this.paginateLangsService.main(query.queryStatements, query.constraints)).map(lang => new LangResponse(
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
            ));
    }
}