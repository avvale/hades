import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Op } from 'sequelize';

export class SequelizeCriteria implements ICriteria
{
    implements(queryStatement: QueryStatement): QueryStatement
    {
        return Utils.deepMapKeys(queryStatement, key => key.startsWith('[') && key.endsWith(']') ? Op[key.slice(1,-1)] : key);
    }
}