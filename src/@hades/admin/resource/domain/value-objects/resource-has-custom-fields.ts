import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ResourceHasCustomFields extends BooleanValueObject
{
    public readonly type: 'ResourceHasCustomFields';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ResourceHasCustomFields',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}