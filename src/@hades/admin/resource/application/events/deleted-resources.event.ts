import { DeletedResourceEvent } from './deleted-resource.event';

export class DeletedResourcesEvent
{
    constructor(
        public readonly resources: DeletedResourceEvent[],
    ) {}
}