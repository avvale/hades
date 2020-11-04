import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelOverviewResponse } from './../../domain/channel-overview.response';
import { ChannelOverviewMapper } from './../../domain/channel-overview.mapper';
import { FindChannelOverviewQuery } from './find-channel-overview.query';
import { FindChannelOverviewService } from './find-channel-overview.service';

@QueryHandler(FindChannelOverviewQuery)
export class FindChannelOverviewQueryHandler implements IQueryHandler<FindChannelOverviewQuery>
{
    private readonly mapper: ChannelOverviewMapper = new ChannelOverviewMapper();

    constructor(
        private readonly findChannelOverviewService: FindChannelOverviewService,
    ) {}

    async execute(query: FindChannelOverviewQuery): Promise<ChannelOverviewResponse>
    {
        const channelOverview = await this.findChannelOverviewService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(channelOverview);
    }
}