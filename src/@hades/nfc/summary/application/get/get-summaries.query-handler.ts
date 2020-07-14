import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SummaryResponse } from './../../domain/summary.response';
import { SummaryMapper } from './../../domain/summary.mapper';
import { GetSummariesQuery } from './get-summaries.query';
import { GetSummariesService } from './get-summaries.service';

@QueryHandler(GetSummariesQuery)
export class GetSummariesQueryHandler implements IQueryHandler<GetSummariesQuery>
{
    private readonly mapper: SummaryMapper = new SummaryMapper();

    constructor(
        private readonly getSummariesService: GetSummariesService
    ) { }

    async execute(query: GetSummariesQuery): Promise<SummaryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getSummariesService.main(query.queryStatements));
    }
}