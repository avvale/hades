import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';

@Injectable()
export class GetMessagesOverviewService
{
    constructor(
        private readonly repository: IMessageOverviewRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciMessageOverview[]>
    {
        return await this.repository.get(queryStatement, constraint, cQMetadata);
    }
}