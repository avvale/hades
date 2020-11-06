import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessageOverviewResponse } from './../../domain/message-overview.response';
import { MessageOverviewMapper } from './../../domain/message-overview.mapper';
import { GetDashboardMessagesOverviewQuery } from './get-dashboard-messages-overview.query';
import { GetDashboardMessagesOverviewService } from './get-dashboard-messages-overview.service';

@QueryHandler(GetDashboardMessagesOverviewQuery)
export class GetDashboardMessagesOverviewQueryHandler implements IQueryHandler<GetDashboardMessagesOverviewQuery>
{
    private readonly mapper: MessageOverviewMapper = new MessageOverviewMapper();

    constructor(
        private readonly getDashboardMessagesOverviewService: GetDashboardMessagesOverviewService
    ) { }

    async execute(query: GetDashboardMessagesOverviewQuery): Promise<MessageOverviewResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getDashboardMessagesOverviewService.main(query.tenantIds, query.systemIds, query.cQMetadata));
    }
}