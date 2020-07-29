import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleSystemId extends UuidValueObject
{
    public readonly type: 'ModuleSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleSystemId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}