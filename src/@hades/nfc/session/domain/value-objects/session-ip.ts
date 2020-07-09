import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SessionIp extends StringValueObject 
{
    public readonly type: 'SessionIp';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SessionIp',
            nullable: false,
            undefinable: false,
            length: 15,            
        }, validationRules));
    }
}