import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobOverviewExecutionType extends EnumValueObject 
{
    public readonly type: 'JobOverviewExecutionType';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobOverviewExecutionType',
            nullable: false,
            undefinable: false,
            enumOptions:  ['SUMMARY','DETAIL'],
        }, validationRules));
    }
}