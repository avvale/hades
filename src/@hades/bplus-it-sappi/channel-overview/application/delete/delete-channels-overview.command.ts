import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteChannelsOverviewCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}