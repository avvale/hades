import { CreatedExecutionEvent } from './created-execution.event';

export class CreatedExecutionsEvent
{
    constructor(
        public readonly executions: CreatedExecutionEvent[],
    ) {}
}