import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteModulesCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}