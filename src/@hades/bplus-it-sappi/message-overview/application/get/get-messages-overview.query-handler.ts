import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessageOverviewResponse } from './../../domain/message-overview.response';
import { GetMessagesOverviewQuery } from './get-messages-overview.query';
import { GetMessagesOverviewService } from './get-messages-overview.service';

@QueryHandler(GetMessagesOverviewQuery)
export class GetMessagesOverviewQueryHandler implements IQueryHandler<GetMessagesOverviewQuery>
{
    constructor(
        private readonly getMessagesOverviewService: GetMessagesOverviewService
    ) { }

    async execute(query: GetMessagesOverviewQuery): Promise<MessageOverviewResponse[]>
    {
        return (await this.getMessagesOverviewService.main(query.queryStatements)).map(messageOverview => new MessageOverviewResponse(
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
                
            ));
    }
}