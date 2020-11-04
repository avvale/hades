import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelResponse } from './../../domain/channel.response';
import { ChannelMapper } from './../../domain/channel.mapper';
import { ChannelId } from './../../domain/value-objects';
import { FindChannelByIdQuery } from './find-channel-by-id.query';
import { FindChannelByIdService } from './find-channel-by-id.service';

@QueryHandler(FindChannelByIdQuery)
export class FindChannelByIdQueryHandler implements IQueryHandler<FindChannelByIdQuery>
{
    private readonly mapper: ChannelMapper = new ChannelMapper();

    constructor(
        private readonly findChannelByIdService: FindChannelByIdService,
    ) {}

    async execute(query: FindChannelByIdQuery): Promise<ChannelResponse>
    {
        const channel = await this.findChannelByIdService.main(
            new ChannelId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(channel);
    }
}