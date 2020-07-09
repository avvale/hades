import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SummaryResponse } from './../../domain/summary.response';
import { FindSummaryQuery } from './find-summary.query';
import { FindSummaryService } from './find-summary.service';

@QueryHandler(FindSummaryQuery)
export class FindSummaryQueryHandler implements IQueryHandler<FindSummaryQuery>
{
    constructor(
        private readonly findSummaryService: FindSummaryService
    ) { }

    async execute(query: FindSummaryQuery): Promise<SummaryResponse>
    {
        const summary = await this.findSummaryService.main(query.queryStatements);

        return new SummaryResponse(
                summary.id.value,
                summary.tagId.value,
                summary.tenantId.value,
                summary.accessAt.value,
                summary.counter.value,
                summary.createdAt.value,
                summary.updatedAt.value,
                summary.deletedAt.value,
                
            );
    }
}