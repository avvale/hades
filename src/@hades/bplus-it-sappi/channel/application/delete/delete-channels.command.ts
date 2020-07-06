import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteChannelsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}