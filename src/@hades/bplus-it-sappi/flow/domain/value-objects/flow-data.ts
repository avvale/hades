import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowData extends JsonValueObject 
{
    public readonly type: 'FlowData';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowData',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}