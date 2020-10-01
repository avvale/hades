import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { CciChannelDetail } from './../../domain/channel-detail.aggregate';

@Injectable()
export class FindChannelDetailService
{
    constructor(
        private readonly repository: IChannelDetailRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciChannelDetail>
    {        
        return await this.repository.find(queryStatement);
    }
}