import { QueryStatement } from './sql-statement/sql-statement';
import { QueryMetadata } from '@hades/shared/domain/lib/hades.types';

export abstract class ICriteria
{
    abstract implements(queryStatement?: QueryStatement, queryMetadata?: QueryMetadata): QueryStatement
}