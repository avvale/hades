import { DeletedSummaryEvent } from './deleted-summary.event';

export class DeletedSummariesEvent
{
    constructor(
        public readonly summaries: DeletedSummaryEvent[],
    ) {}
}