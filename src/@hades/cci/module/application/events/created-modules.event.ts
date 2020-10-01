import { CreatedModuleEvent } from './created-module.event';

export class CreatedModulesEvent
{
    constructor(
        public readonly modules: CreatedModuleEvent[],
    ) {}
}