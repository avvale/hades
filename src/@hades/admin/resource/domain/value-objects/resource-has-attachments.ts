import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ResourceHasAttachments extends BooleanValueObject
{
    public readonly type: 'ResourceHasAttachments';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ResourceHasAttachments',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}