import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelResponse } from './../../domain/channel.response';
import { ChannelMapper } from './../../domain/channel.mapper';
import { GetChannelsQuery } from './get-channels.query';
import { GetChannelsService } from './get-channels.service';

@QueryHandler(GetChannelsQuery)
export class GetChannelsQueryHandler implements IQueryHandler<GetChannelsQuery>
{
    private readonly mapper: ChannelMapper = new ChannelMapper();

    constructor(
        private readonly getChannelsService: GetChannelsService
    ) { }

    async execute(query: GetChannelsQuery): Promise<ChannelResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getChannelsService.main(query.queryStatement));
    }
}