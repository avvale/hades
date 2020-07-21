import { DeletedTagEvent } from './deleted-tag.event';

export class DeletedTagsEvent
{
    constructor(
        public readonly tags: DeletedTagEvent[],
    ) {}
}