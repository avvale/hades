import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ContactFlowsId extends UuidArrayValueObject 
{
    public readonly type: 'ContactFlowsId';

    constructor(value: string[], validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactFlowsId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}