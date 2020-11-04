import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export class GetDashboardJobsOverviewQuery
{
    constructor(
        public readonly tenantIds: string[],
        public readonly systemIds: string[],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}