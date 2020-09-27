import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteLangsCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}