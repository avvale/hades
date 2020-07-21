import { CreatedActionEvent } from './created-action.event';

export class CreatedActionsEvent
{
    constructor(
        public readonly actions: CreatedActionEvent[],
    ) {}
}