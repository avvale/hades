import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountType extends EnumValueObject
{
    public readonly type: 'AccountType';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccountType',
            nullable:  false ,
            undefinable:  false ,
            enumOptions:  ['USER','SERVICE'],
        }, validationRules));
    }
}