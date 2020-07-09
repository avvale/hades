import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SummaryResponse } from './../../domain/summary.response';
import { GetSummariesQuery } from './get-summaries.query';
import { GetSummariesService } from './get-summaries.service';

@QueryHandler(GetSummariesQuery)
export class GetSummariesQueryHandler implements IQueryHandler<GetSummariesQuery>
{
    constructor(
        private readonly getSummariesService: GetSummariesService
    ) { }

    async execute(query: GetSummariesQuery): Promise<SummaryResponse[]>
    {
        return (await this.getSummariesService.main(query.queryStatements)).map(summary => new SummaryResponse(
                summary.id.value,
                summary.tagId.value,
                summary.tenantId.value,
                summary.accessAt.value,
                summary.counter.value,
                summary.createdAt.value,
                summary.updatedAt.value,
                summary.deletedAt.value,
                
            ));
    }
}