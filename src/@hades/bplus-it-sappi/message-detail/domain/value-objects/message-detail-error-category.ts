import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailErrorCategory extends StringValueObject 
{
    public readonly type: 'MessageDetailErrorCategory';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailErrorCategory',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}