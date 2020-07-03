import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class BoundedContextId extends UuidValueObject
{
    public readonly type: 'BoundedContextId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'BoundedContextId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}