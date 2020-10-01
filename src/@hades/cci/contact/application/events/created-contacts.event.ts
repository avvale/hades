import { CreatedContactEvent } from './created-contact.event';

export class CreatedContactsEvent
{
    constructor(
        public readonly contacts: CreatedContactEvent[],
    ) {}
}