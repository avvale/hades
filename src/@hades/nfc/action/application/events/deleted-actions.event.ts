import { DeletedActionEvent } from './deleted-action.event';

export class DeletedActionsEvent
{
    constructor(
        public readonly actions: DeletedActionEvent[],
    ) {}
}