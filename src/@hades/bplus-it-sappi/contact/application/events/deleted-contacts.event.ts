import { DeletedContactEvent } from './deleted-contact.event';

export class DeletedContactsEvent
{
    constructor(
        public readonly contacts: DeletedContactEvent[],
    ) {}
}