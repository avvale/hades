import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelDetailResponse } from './../../domain/channel-detail.response';
import { ChannelDetailMapper } from './../../domain/channel-detail.mapper';
import { ChannelDetailId } from './../../domain/value-objects';
import { FindChannelDetailByIdQuery } from './find-channel-detail-by-id.query';
import { FindChannelDetailByIdService } from './find-channel-detail-by-id.service';

@QueryHandler(FindChannelDetailByIdQuery)
export class FindChannelDetailByIdQueryHandler implements IQueryHandler<FindChannelDetailByIdQuery>
{
    private readonly mapper: ChannelDetailMapper = new ChannelDetailMapper();

    constructor(
        private readonly findChannelDetailByIdService: FindChannelDetailByIdService
    ) { }

    async execute(query: FindChannelDetailByIdQuery): Promise<ChannelDetailResponse>
    {
        const channelDetail = await this.findChannelDetailByIdService.main(new ChannelDetailId(query.id));

        return this.mapper.mapAggregateToResponse(channelDetail);
    }
}