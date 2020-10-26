import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountCreatedAt extends TimestampValueObject
{
    public readonly type: 'AccountCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccountCreatedAt',
            nullable:  true ,
            undefinable:  true ,
        }, validationRules));
    }
}