import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteChannelsDetailCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}