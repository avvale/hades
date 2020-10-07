import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class SystemTechnology extends EnumValueObject 
{
    public readonly type: 'SystemTechnology';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemTechnology',
            nullable: false,
            undefinable: false,
            enumOptions:  ['WSO2','SAPPI','B2B','MULESOFT','SAPSCI'],
        }, validationRules));
    }
}