import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class DeleteTagsCommand 
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}