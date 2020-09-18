import { QueryStatement } from './sql-statement/sql-statement';

export abstract class ICriteria
{
    abstract implements(queryStatement: QueryStatement): QueryStatement
}