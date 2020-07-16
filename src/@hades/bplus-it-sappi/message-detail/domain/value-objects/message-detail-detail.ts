import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailDetail extends StringValueObject 
{
    public readonly type: 'MessageDetailDetail';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailDetail',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}