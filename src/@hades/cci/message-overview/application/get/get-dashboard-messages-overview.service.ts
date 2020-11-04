import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { CciMessageOverview } from './../../domain/message-overview.aggregate';

@Injectable()
export class GetDashboardMessagesOverviewService
{
    constructor(
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciMessageOverview[]>
    {
        return await this.repository.getDashboardData(tenantIds, systemIds, cQMetadata);
    }
}