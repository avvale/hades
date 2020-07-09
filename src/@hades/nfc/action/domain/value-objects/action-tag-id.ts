import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ActionTagId extends UuidValueObject
{
    public readonly type: 'ActionTagId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ActionTagId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}