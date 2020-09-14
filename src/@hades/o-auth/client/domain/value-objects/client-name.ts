import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ClientName extends StringValueObject 
{
    public readonly type: 'ClientName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientName',
            nullable: false,
            undefinable: false,
            maxLength: 255,            
        }, validationRules));
    }
}