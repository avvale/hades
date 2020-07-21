import { CreatedFlowEvent } from './created-flow.event';

export class CreatedFlowsEvent
{
    constructor(
        public readonly flows: CreatedFlowEvent[],
    ) {}
}