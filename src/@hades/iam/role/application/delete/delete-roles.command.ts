import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteRolesCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}