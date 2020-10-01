import { CreatedJobOverviewEvent } from './created-job-overview.event';

export class CreatedJobsOverviewEvent
{
    constructor(
        public readonly jobsOverview: CreatedJobOverviewEvent[],
    ) {}
}