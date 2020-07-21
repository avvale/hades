import { DeletedFlowEvent } from './deleted-flow.event';

export class DeletedFlowsEvent
{
    constructor(
        public readonly flows: DeletedFlowEvent[],
    ) {}
}