import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleFlowId extends UuidValueObject
{
    public readonly type: 'ModuleFlowId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleFlowId',
            nullable: true,
            undefinable: true,
            length: 36
        }, validationRules));
    }
}