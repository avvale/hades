import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';

@Injectable()
export class FindMessageOverviewService
{
    constructor(
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciMessageOverview>
    {        
        return await this.repository.find(queryStatement);
    }
}