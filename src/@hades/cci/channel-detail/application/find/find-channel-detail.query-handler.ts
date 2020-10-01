import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelDetailResponse } from './../../domain/channel-detail.response';
import { ChannelDetailMapper } from './../../domain/channel-detail.mapper';
import { FindChannelDetailQuery } from './find-channel-detail.query';
import { FindChannelDetailService } from './find-channel-detail.service';

@QueryHandler(FindChannelDetailQuery)
export class FindChannelDetailQueryHandler implements IQueryHandler<FindChannelDetailQuery>
{
    private readonly mapper: ChannelDetailMapper = new ChannelDetailMapper();

    constructor(
        private readonly findChannelDetailService: FindChannelDetailService
    ) { }

    async execute(query: FindChannelDetailQuery): Promise<ChannelDetailResponse>
    {
        const channelDetail = await this.findChannelDetailService.main(query.queryStatement);

        return this.mapper.mapAggregateToResponse(channelDetail);
    }
}