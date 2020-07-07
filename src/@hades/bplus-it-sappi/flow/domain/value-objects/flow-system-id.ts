import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowSystemId extends UuidValueObject
{
    public readonly type: 'FlowSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowSystemId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}