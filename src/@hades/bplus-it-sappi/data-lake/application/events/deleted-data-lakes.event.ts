import { DeletedDataLakeEvent } from './deleted-data-lake.event';

export class DeletedDataLakesEvent
{
    constructor(
        public readonly dataLakes: DeletedDataLakeEvent[],
    ) {}
}