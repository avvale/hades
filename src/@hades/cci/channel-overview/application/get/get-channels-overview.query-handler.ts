import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelOverviewResponse } from './../../domain/channel-overview.response';
import { ChannelOverviewMapper } from './../../domain/channel-overview.mapper';
import { GetChannelsOverviewQuery } from './get-channels-overview.query';
import { GetChannelsOverviewService } from './get-channels-overview.service';

@QueryHandler(GetChannelsOverviewQuery)
export class GetChannelsOverviewQueryHandler implements IQueryHandler<GetChannelsOverviewQuery>
{
    private readonly mapper: ChannelOverviewMapper = new ChannelOverviewMapper();

    constructor(
        private readonly getChannelsOverviewService: GetChannelsOverviewService,
    ) {}

    async execute(query: GetChannelsOverviewQuery): Promise<ChannelOverviewResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getChannelsOverviewService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}