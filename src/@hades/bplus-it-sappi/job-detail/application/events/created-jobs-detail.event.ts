import { CreatedJobDetailEvent } from './created-job-detail.event';

export class CreatedJobsDetailEvent
{
    constructor(
        public readonly jobsDetail: CreatedJobDetailEvent[],
    ) {}
}