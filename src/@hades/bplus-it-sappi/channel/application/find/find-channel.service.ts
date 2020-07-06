import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelRepository } from './../../domain/channel.repository';
import { BplusItSappiChannel } from './../../domain/channel.aggregate';

@Injectable()
export class FindChannelService
{
    constructor(
        private readonly repository: IChannelRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiChannel>
    {        
        return await this.repository.find(queryStatements);
    }
}