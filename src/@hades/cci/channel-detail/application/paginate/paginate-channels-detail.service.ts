import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { CciChannelDetail } from './../../domain/channel-detail.aggregate';

@Injectable()
export class PaginateChannelsDetailService
{
    constructor(
        private readonly repository: IChannelDetailRepository
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement): Promise<Pagination<CciChannelDetail>>
    {        
        return await this.repository.paginate(queryStatement, constraint);
    }
}