import { CreatedDataLakeEvent } from './created-data-lake.event';

export class CreatedDataLakesEvent
{
    constructor(
        public readonly dataLakes: CreatedDataLakeEvent[],
    ) {}
}