import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessageOverviewResponse } from './../../domain/message-overview.response';
import { FindMessageOverviewQuery } from './find-message-overview.query';
import { FindMessageOverviewService } from './find-message-overview.service';

@QueryHandler(FindMessageOverviewQuery)
export class FindMessageOverviewQueryHandler implements IQueryHandler<FindMessageOverviewQuery>
{
    constructor(
        private readonly findMessageOverviewService: FindMessageOverviewService
    ) { }

    async execute(query: FindMessageOverviewQuery): Promise<MessageOverviewResponse>
    {
        const messageOverview = await this.findMessageOverviewService.main(query.queryStatements);

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