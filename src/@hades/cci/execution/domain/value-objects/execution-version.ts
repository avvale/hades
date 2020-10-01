import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ExecutionVersion extends StringValueObject 
{
    public readonly type: 'ExecutionVersion';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ExecutionVersion',
            nullable: false,
            undefinable: false,
            maxLength: 20,            
        }, validationRules));
    }
}