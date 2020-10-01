import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IChannelRepository } from './../../domain/channel.repository';
import { CciChannel } from './../../domain/channel.aggregate';

@Injectable()
export class FindChannelService
{
    constructor(
        private readonly repository: IChannelRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciChannel>
    {        
        return await this.repository.find(queryStatement);
    }
}