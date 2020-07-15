import { Injectable } from '@nestjs/common';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { BplusItSappiChannelDetail } from './../../domain/channel-detail.aggregate';
import { ChannelDetailId } from './../../domain/value-objects';

@Injectable()
export class FindChannelDetailByIdService
{
    constructor(
        private readonly repository: IChannelDetailRepository
    ) {}

    public async main(id: ChannelDetailId): Promise<BplusItSappiChannelDetail>
    {        
        return await this.repository.findById(id);
    }
}