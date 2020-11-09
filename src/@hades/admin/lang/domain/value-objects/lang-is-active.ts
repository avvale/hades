import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class LangIsActive extends BooleanValueObject
{
    public readonly type: 'LangIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'LangIsActive',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}