import { DeletedSystemEvent } from './deleted-system.event';

export class DeletedSystemsEvent
{
    constructor(
        public readonly systems: DeletedSystemEvent[],
    ) {}
}