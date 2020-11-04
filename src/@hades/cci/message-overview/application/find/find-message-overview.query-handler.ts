import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MessageOverviewResponse } from './../../domain/message-overview.response';
import { MessageOverviewMapper } from './../../domain/message-overview.mapper';
import { FindMessageOverviewQuery } from './find-message-overview.query';
import { FindMessageOverviewService } from './find-message-overview.service';

@QueryHandler(FindMessageOverviewQuery)
export class FindMessageOverviewQueryHandler implements IQueryHandler<FindMessageOverviewQuery>
{
    private readonly mapper: MessageOverviewMapper = new MessageOverviewMapper();

    constructor(
        private readonly findMessageOverviewService: FindMessageOverviewService,
    ) {}

    async execute(query: FindMessageOverviewQuery): Promise<MessageOverviewResponse>
    {
        const messageOverview = await this.findMessageOverviewService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(messageOverview);
    }
}