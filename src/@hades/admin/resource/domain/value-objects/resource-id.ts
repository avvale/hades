import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ResourceId extends UuidValueObject
{
    public readonly type: 'ResourceId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ResourceId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}