import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowId extends UuidValueObject
{
    public readonly type: 'FlowId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}