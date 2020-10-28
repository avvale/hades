import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';

@Injectable()
export class GetDashboardMessagesOverviewService
{
    constructor(
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(tenantIds: string[], systemIds: string[]): Promise<CciMessageOverview[]>
    {
        return await this.repository.getDashboardData(tenantIds, systemIds);
    }
}