import { CreatedSystemEvent } from './created-system.event';

export class CreatedSystemsEvent
{
    constructor(
        public readonly systems: CreatedSystemEvent[],
    ) {}
}