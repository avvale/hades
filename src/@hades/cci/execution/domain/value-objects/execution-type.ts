import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ExecutionType extends EnumValueObject 
{
    public readonly type: 'ExecutionType';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ExecutionType',
            nullable: false,
            undefinable: false,
            enumOptions:  ['SUMMARY','DETAIL'],
        }, validationRules));
    }
}