import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowFieldGroupId extends UuidValueObject
{
    public readonly type: 'FlowFieldGroupId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowFieldGroupId',
            nullable: true,
            undefinable: true,
            length: 36
        }, validationRules));
    }
}