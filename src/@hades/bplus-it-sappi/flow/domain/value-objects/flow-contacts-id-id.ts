import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowContactsIdId extends UuidArrayValueObject 
{
    public readonly type: 'FlowContactsIdId';

    constructor(value: string[], validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowContactsIdId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}