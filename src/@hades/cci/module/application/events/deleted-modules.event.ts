import { DeletedModuleEvent } from './deleted-module.event';

export class DeletedModulesEvent
{
    constructor(
        public readonly modules: DeletedModuleEvent[],
    ) {}
}