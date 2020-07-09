import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TagParams extends JsonValueObject 
{
    public readonly type: 'TagParams';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TagParams',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}