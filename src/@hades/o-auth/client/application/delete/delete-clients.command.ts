import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class DeleteClientsCommand 
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}