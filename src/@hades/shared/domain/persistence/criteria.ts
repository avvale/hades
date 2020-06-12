import { QueryStatementInput } from './sql-statement-input';

export abstract class ICriteria
{
    abstract implements(queryStatements: QueryStatementInput[], builder)
}