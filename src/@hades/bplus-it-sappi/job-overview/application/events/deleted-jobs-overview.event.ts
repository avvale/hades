import { DeletedJobOverviewEvent } from './deleted-job-overview.event';

export class DeletedJobsOverviewEvent
{
    constructor(
        public readonly jobsOverview: DeletedJobOverviewEvent[],
    ) {}
}