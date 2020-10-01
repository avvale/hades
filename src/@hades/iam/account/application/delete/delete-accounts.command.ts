import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteAccountsCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}