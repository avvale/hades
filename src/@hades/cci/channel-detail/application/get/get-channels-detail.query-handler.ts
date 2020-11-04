import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelDetailResponse } from './../../domain/channel-detail.response';
import { ChannelDetailMapper } from './../../domain/channel-detail.mapper';
import { GetChannelsDetailQuery } from './get-channels-detail.query';
import { GetChannelsDetailService } from './get-channels-detail.service';

@QueryHandler(GetChannelsDetailQuery)
export class GetChannelsDetailQueryHandler implements IQueryHandler<GetChannelsDetailQuery>
{
    private readonly mapper: ChannelDetailMapper = new ChannelDetailMapper();

    constructor(
        private readonly getChannelsDetailService: GetChannelsDetailService,
    ) {}

    async execute(query: GetChannelsDetailQuery): Promise<ChannelDetailResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getChannelsDetailService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}