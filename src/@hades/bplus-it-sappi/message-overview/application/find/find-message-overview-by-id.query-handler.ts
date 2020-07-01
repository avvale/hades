import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessageOverviewResponse } from './../../domain/message-overview.response';
import { MessageOverviewId } from './../../domain/value-objects';
import { FindMessageOverviewByIdQuery } from './find-message-overview-by-id.query';
import { FindMessageOverviewByIdService } from './find-message-overview-by-id.service';

@QueryHandler(FindMessageOverviewByIdQuery)
export class FindMessageOverviewByIdQueryHandler implements IQueryHandler<FindMessageOverviewByIdQuery>
{
    constructor(
        private readonly findMessageOverviewByIdService: FindMessageOverviewByIdService
    ) { }

    async execute(query: FindMessageOverviewByIdQuery): Promise<MessageOverviewResponse>
    {
        const messageOverview = await this.findMessageOverviewByIdService.main(new MessageOverviewId(query.id));

        return new MessageOverviewResponse(
                messageOverview.id.value,
                messageOverview.tenantId.value,
                messageOverview.systemId.value,
                messageOverview.systemName.value,
                messageOverview.executionId.value,
                messageOverview.executionType.value,
                messageOverview.executionExecutedAt.value,
                messageOverview.executionMonitoringStartAt.value,
                messageOverview.executionMonitoringEndAt.value,
                messageOverview.numberMax.value,
                messageOverview.numberDays.value,
                messageOverview.success.value,
                messageOverview.cancelled.value,
                messageOverview.delivering.value,
                messageOverview.error.value,
                messageOverview.holding.value,
                messageOverview.toBeDelivered.value,
                messageOverview.waiting.value,
                messageOverview.createdAt.value,
                messageOverview.updatedAt.value,
                messageOverview.deletedAt.value,
                
            );
    }
}