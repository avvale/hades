import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelOverviewResponse } from './../../domain/channel-overview.response';
import { ChannelOverviewMapper } from './../../domain/channel-overview.mapper';
import { ChannelOverviewId } from './../../domain/value-objects';
import { FindChannelOverviewByIdQuery } from './find-channel-overview-by-id.query';
import { FindChannelOverviewByIdService } from './find-channel-overview-by-id.service';

@QueryHandler(FindChannelOverviewByIdQuery)
export class FindChannelOverviewByIdQueryHandler implements IQueryHandler<FindChannelOverviewByIdQuery>
{
    private readonly mapper: ChannelOverviewMapper = new ChannelOverviewMapper();

    constructor(
        private readonly findChannelOverviewByIdService: FindChannelOverviewByIdService
    ) { }

    async execute(query: FindChannelOverviewByIdQuery): Promise<ChannelOverviewResponse>
    {
        const channelOverview = await this.findChannelOverviewByIdService.main(new ChannelOverviewId(query.id));

        return this.mapper.mapAggregateToResponse(channelOverview);
    }
}