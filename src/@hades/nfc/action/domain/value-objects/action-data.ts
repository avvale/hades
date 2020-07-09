import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ActionData extends JsonValueObject 
{
    public readonly type: 'ActionData';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ActionData',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}