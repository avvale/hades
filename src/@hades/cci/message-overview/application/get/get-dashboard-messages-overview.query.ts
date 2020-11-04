import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class GetDashboardMessagesOverviewQuery
{
    constructor(
        public readonly tenantIds: string[],
        public readonly systemIds: string[],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}