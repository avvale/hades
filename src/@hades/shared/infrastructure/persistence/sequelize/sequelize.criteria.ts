import { ICriteria } from '@hades/shared/domain/persistence/criteria';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Utils } from '@hades/shared/domain/lib/utils';
import { Op } from 'sequelize';
import * as moment from 'moment-timezone';

export class SequelizeCriteria implements ICriteria
{
    implements(queryStatement?: QueryStatement, cQMetadata?: CQMetadata): QueryStatement
    {
        // add timezone to query statement
        if (cQMetadata.timezone)
        {
            queryStatement = Utils.deepMapValues(queryStatement, (key, value) =>
            {
                if (cQMetadata.timezoneColumns.indexOf(key) !== -1)
                {
                    if (Array.isArray(value))
                    {
                        value = value.map(item => moment.tz(item, cQMetadata.timezone).tz(process.env.TZ).format('YYYY-MM-DD HH:mm:ss'));
                    }
                    else
                    {
                        value = moment.tz(value, cQMetadata.timezone).tz(process.env.TZ).format('YYYY-MM-DD HH:mm:ss');
                    }
                }
                return value;
            });
        }

        // replace key string by sequelize symbols
        return Utils.deepMapKeys(queryStatement, key => key.startsWith('[') && key.endsWith(']') ? Op[key.slice(1,-1)] : key);
    }
}