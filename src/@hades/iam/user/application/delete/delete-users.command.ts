import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteUsersCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}