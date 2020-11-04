import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IChannelRepository } from './../../domain/channel.repository';
import { CciChannel } from './../../domain/channel.aggregate';

@Injectable()
export class GetChannelsService
{
    constructor(
        private readonly repository: IChannelRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannel[]>
    {
        return await this.repository.get(queryStatement, constraint, cQMetadata);
    }
}