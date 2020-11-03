import { QueryStatement } from './sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';

export abstract class ICriteria
{
    abstract implements(queryStatement?: QueryStatement, cQMetadata?: CQMetadata): QueryStatement
}