import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TagId extends UuidValueObject
{
    public readonly type: 'TagId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TagId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}