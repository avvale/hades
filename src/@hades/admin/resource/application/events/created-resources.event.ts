import { CreatedResourceEvent } from './created-resource.event';

export class CreatedResourcesEvent
{
    constructor(
        public readonly resources: CreatedResourceEvent[],
    ) {}
}