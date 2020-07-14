import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SummaryResponse } from './../../domain/summary.response';
import { SummaryMapper } from './../../domain/summary.mapper';
import { SummaryId } from './../../domain/value-objects';
import { FindSummaryByIdQuery } from './find-summary-by-id.query';
import { FindSummaryByIdService } from './find-summary-by-id.service';

@QueryHandler(FindSummaryByIdQuery)
export class FindSummaryByIdQueryHandler implements IQueryHandler<FindSummaryByIdQuery>
{
    private readonly mapper: SummaryMapper = new SummaryMapper();

    constructor(
        private readonly findSummaryByIdService: FindSummaryByIdService
    ) { }

    async execute(query: FindSummaryByIdQuery): Promise<SummaryResponse>
    {
        const summary = await this.findSummaryByIdService.main(new SummaryId(query.id));

        return this.mapper.mapAggregateToResponse(summary);
    }
}