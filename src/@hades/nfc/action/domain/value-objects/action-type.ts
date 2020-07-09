import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ActionType extends EnumValueObject 
{
    public readonly type: 'ActionType';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ActionType',
            nullable: false,
            undefinable: false,
            enumOptions:  ['CMS','ZAP','TCI','MULESOFT'],
        }, validationRules));
    }
}