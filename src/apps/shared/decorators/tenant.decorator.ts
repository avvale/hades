import { AccountResponse } from '@hades/iam/account/domain/account.response';
import { Operator } from '@hades/shared/domain/persistence/sql-statement/operator';
import * as _ from 'lodash';

export const Tenant = (customProperties?: {
    targetProperty: string;
    queryIndex: number; 
    constraintIndex: number;
}) => 
{
    return (target, propertyKey: string, descriptor: PropertyDescriptor) =>
    { 
        return {
            value: function( ... args: any[])
            {
                const properties = Object.assign({}, {
                    targetProperty: 'tenantId', 
                    queryIndex: 1, 
                    constraintIndex: 2
                }, customProperties);

                let account: AccountResponse;
                for (const arg of args)
                {
                    if (typeof arg === 'object' && arg.constructor.name === 'AccountResponse') account = <AccountResponse>arg;
                }

                const orStatements = [];
                for (const tenantId of account.dTenants)
                {
                    orStatements.push({tenantId});
                }

                args[properties.constraintIndex] = _.merge(args[properties.constraintIndex], {
                    where: {
                        [Operator.or]: orStatements
                    }
                });

                // default behavior, apply 'this' to use current class definition, with inject apply
                const result = descriptor.value.apply(this, args);
                return result;
            }
        }
    }
};