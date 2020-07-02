import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDetailStatus extends EnumValueObject 
{
    public readonly type: 'JobDetailStatus';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailStatus',
            nullable: false,
            undefinable: false,
            enumOptions:  ['CANCELLED','COMPLETED','RUNNING','ERROR'],
        }, validationRules));
    }
}