import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobSystemId extends UuidValueObject
{
    public readonly type: 'JobSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobSystemId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}