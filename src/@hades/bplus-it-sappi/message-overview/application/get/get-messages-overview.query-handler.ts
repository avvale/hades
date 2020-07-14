import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessageOverviewResponse } from './../../domain/message-overview.response';
import { MessageOverviewMapper } from './../../domain/message-overview.mapper';
import { GetMessagesOverviewQuery } from './get-messages-overview.query';
import { GetMessagesOverviewService } from './get-messages-overview.service';

@QueryHandler(GetMessagesOverviewQuery)
export class GetMessagesOverviewQueryHandler implements IQueryHandler<GetMessagesOverviewQuery>
{
    private readonly mapper: MessageOverviewMapper = new MessageOverviewMapper();

    constructor(
        private readonly getMessagesOverviewService: GetMessagesOverviewService
    ) { }

    async execute(query: GetMessagesOverviewQuery): Promise<MessageOverviewResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getMessagesOverviewService.main(query.queryStatements));
    }
}