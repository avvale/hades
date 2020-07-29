import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleId extends UuidValueObject
{
    public readonly type: 'ModuleId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}