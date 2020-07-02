import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDetailSystemId extends UuidValueObject
{
    public readonly type: 'JobDetailSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailSystemId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}