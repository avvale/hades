import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { CciChannelDetail } from './../../domain/channel-detail.aggregate';
import { ChannelDetailId } from './../../domain/value-objects';

@Injectable()
export class FindChannelDetailByIdService
{
    constructor(
        private readonly repository: IChannelDetailRepository,
    ) {}

    public async main(id: ChannelDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelDetail>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}