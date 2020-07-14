import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelResponse } from './../../domain/channel.response';
import { ChannelMapper } from './../../domain/channel.mapper';
import { FindChannelQuery } from './find-channel.query';
import { FindChannelService } from './find-channel.service';

@QueryHandler(FindChannelQuery)
export class FindChannelQueryHandler implements IQueryHandler<FindChannelQuery>
{
    private readonly mapper: ChannelMapper = new ChannelMapper();

    constructor(
        private readonly findChannelService: FindChannelService
    ) { }

    async execute(query: FindChannelQuery): Promise<ChannelResponse>
    {
        const channel = await this.findChannelService.main(query.queryStatements);

        return this.mapper.mapAggregateToResponse(channel);
    }
}