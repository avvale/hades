import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class GetDashboardChannelsOverviewQuery
{
    constructor(
        public readonly tenantIds: string[],
        public readonly systemIds: string[],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}