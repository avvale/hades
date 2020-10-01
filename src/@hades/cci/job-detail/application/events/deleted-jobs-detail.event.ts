import { DeletedJobDetailEvent } from './deleted-job-detail.event';

export class DeletedJobsDetailEvent
{
    constructor(
        public readonly jobsDetail: DeletedJobDetailEvent[],
    ) {}
}