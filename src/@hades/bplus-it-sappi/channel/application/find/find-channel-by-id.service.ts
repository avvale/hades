import { Injectable } from '@nestjs/common';
import { IChannelRepository } from './../../domain/channel.repository';
import { BplusItSappiChannel } from './../../domain/channel.aggregate';
import { ChannelId } from './../../domain/value-objects';

@Injectable()
export class FindChannelByIdService
{
    constructor(
        private readonly repository: IChannelRepository
    ) {}

    public async main(id: ChannelId): Promise<BplusItSappiChannel>
    {        
        return await this.repository.findById(id);
    }
}