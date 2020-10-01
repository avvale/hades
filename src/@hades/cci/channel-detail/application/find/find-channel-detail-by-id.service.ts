import { Injectable } from '@nestjs/common';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { CciChannelDetail } from './../../domain/channel-detail.aggregate';
import { ChannelDetailId } from './../../domain/value-objects';

@Injectable()
export class FindChannelDetailByIdService
{
    constructor(
        private readonly repository: IChannelDetailRepository
    ) {}

    public async main(id: ChannelDetailId): Promise<CciChannelDetail>
    {        
        return await this.repository.findById(id);
    }
}