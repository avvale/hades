import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ActionId extends UuidValueObject
{
    public readonly type: 'ActionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ActionId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}