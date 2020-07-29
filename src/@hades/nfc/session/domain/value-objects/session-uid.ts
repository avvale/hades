import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SessionUid extends StringValueObject 
{
    public readonly type: 'SessionUid';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SessionUid',
            nullable: false,
            undefinable: false,
            maxLength: 64,            
        }, validationRules));
    }
}