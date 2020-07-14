import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SummaryResponse } from './../../domain/summary.response';
import { SummaryMapper } from './../../domain/summary.mapper';
import { FindSummaryQuery } from './find-summary.query';
import { FindSummaryService } from './find-summary.service';

@QueryHandler(FindSummaryQuery)
export class FindSummaryQueryHandler implements IQueryHandler<FindSummaryQuery>
{
    private readonly mapper: SummaryMapper = new SummaryMapper();

    constructor(
        private readonly findSummaryService: FindSummaryService
    ) { }

    async execute(query: FindSummaryQuery): Promise<SummaryResponse>
    {
        const summary = await this.findSummaryService.main(query.queryStatements);

        return this.mapper.mapAggregateToResponse(summary);
    }
}