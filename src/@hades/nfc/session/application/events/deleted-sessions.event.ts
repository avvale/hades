import { DeletedSessionEvent } from './deleted-session.event';

export class DeletedSessionsEvent
{
    constructor(
        public readonly sessions: DeletedSessionEvent[],
    ) {}
}