import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowIsCritical extends BooleanValueObject 
{
    public readonly type: 'FlowIsCritical';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowIsCritical',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}