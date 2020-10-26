import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountIsActive extends BooleanValueObject
{
    public readonly type: 'AccountIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccountIsActive',
            nullable:  false ,
            undefinable:  false ,
        }, validationRules));
    }
}