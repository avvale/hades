import { CreatedSummaryEvent } from './created-summary.event';

export class CreatedSummariesEvent
{
    constructor(
        public readonly summaries: CreatedSummaryEvent[],
    ) {}
}