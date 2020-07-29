import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ResourceBoundedContextId extends UuidValueObject
{
    public readonly type: 'ResourceBoundedContextId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ResourceBoundedContextId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}