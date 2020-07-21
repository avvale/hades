import { CreatedTagEvent } from './created-tag.event';

export class CreatedTagsEvent
{
    constructor(
        public readonly tags: CreatedTagEvent[],
    ) {}
}