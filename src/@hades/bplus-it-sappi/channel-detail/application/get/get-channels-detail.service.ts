import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { BplusItSappiChannelDetail } from './../../domain/channel-detail.aggregate';

@Injectable()
export class GetChannelsDetailService
{
    constructor(
        private readonly repository: IChannelDetailRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiChannelDetail[]>
    {        
        return await this.repository.get(queryStatements);
    }
}