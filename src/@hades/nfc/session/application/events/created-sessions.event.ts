import { CreatedSessionEvent } from './created-session.event';

export class CreatedSessionsEvent
{
    constructor(
        public readonly sessions: CreatedSessionEvent[],
    ) {}
}