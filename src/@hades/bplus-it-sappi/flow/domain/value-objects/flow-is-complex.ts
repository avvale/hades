import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowIsComplex extends BooleanValueObject 
{
    public readonly type: 'FlowIsComplex';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowIsComplex',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}