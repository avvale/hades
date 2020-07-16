import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemId extends UuidValueObject
{
    public readonly type: 'SystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}