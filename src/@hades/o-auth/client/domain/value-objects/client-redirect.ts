import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ClientRedirect extends StringValueObject 
{
    public readonly type: 'ClientRedirect';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientRedirect',
            nullable: true,
            undefinable: true,
            maxLength: 2048,            
        }, validationRules));
    }
}