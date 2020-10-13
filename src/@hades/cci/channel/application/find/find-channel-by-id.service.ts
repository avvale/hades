import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IChannelRepository } from './../../domain/channel.repository';
import { CciChannel } from './../../domain/channel.aggregate';
import { ChannelId } from './../../domain/value-objects';

@Injectable()
export class FindChannelByIdService
{
    constructor(
        private readonly repository: IChannelRepository
    ) {}

    public async main(id: ChannelId, constraint?: QueryStatement): Promise<CciChannel>
    {        
        return await this.repository.findById(id, constraint);
    }
}