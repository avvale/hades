import { Injectable } from '@nestjs/common';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';
import { ChannelOverviewId } from './../../domain/value-objects';

@Injectable()
export class FindChannelOverviewByIdService
{
    constructor(
        private readonly repository: IChannelOverviewRepository
    ) {}

    public async main(id: ChannelOverviewId): Promise<CciChannelOverview>
    {        
        return await this.repository.findById(id);
    }
}