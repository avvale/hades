import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobId extends UuidValueObject
{
    public readonly type: 'JobId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}