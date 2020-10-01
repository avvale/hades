import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeletePermissionsCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}