import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateSummariesQuery } from './paginate-summaries.query';
import { PaginateSummariesService } from './paginate-summaries.service';

@QueryHandler(PaginateSummariesQuery)
export class PaginateSummariesQueryHandler implements IQueryHandler<PaginateSummariesQuery>
{
    constructor(
        private readonly paginateSummariesService: PaginateSummariesService
    ) { }

    async execute(query: PaginateSummariesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateSummariesService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}