import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SummaryResponse } from './../../domain/summary.response';
import { SummaryId } from './../../domain/value-objects';
import { FindSummaryByIdQuery } from './find-summary-by-id.query';
import { FindSummaryByIdService } from './find-summary-by-id.service';

@QueryHandler(FindSummaryByIdQuery)
export class FindSummaryByIdQueryHandler implements IQueryHandler<FindSummaryByIdQuery>
{
    constructor(
        private readonly findSummaryByIdService: FindSummaryByIdService
    ) { }

    async execute(query: FindSummaryByIdQuery): Promise<SummaryResponse>
    {
        const summary = await this.findSummaryByIdService.main(new SummaryId(query.id));

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