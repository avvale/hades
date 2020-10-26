import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountDeletedAt extends TimestampValueObject
{
    public readonly type: 'AccountDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccountDeletedAt',
            nullable:  true ,
            undefinable:  true ,
        }, validationRules));
    }
}