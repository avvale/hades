import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountEmail extends StringValueObject
{
    public readonly type: 'AccountEmail';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccountEmail',
            nullable:  false ,
            undefinable:  false ,
            maxLength: 120,
        }, validationRules));
    }
}