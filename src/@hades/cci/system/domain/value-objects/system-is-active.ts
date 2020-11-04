import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class SystemIsActive extends BooleanValueObject
{
    public readonly type: 'SystemIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'SystemIsActive',
            nullable:  false ,
            undefinable:  false ,
        }, validationRules));
    }
}