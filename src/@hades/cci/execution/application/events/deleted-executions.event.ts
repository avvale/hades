import { DeletedExecutionEvent } from './deleted-execution.event';

export class DeletedExecutionsEvent
{
    constructor(
        public readonly executions: DeletedExecutionEvent[],
    ) {}
}