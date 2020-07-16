import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailSize extends IntValueObject 
{
    public readonly type: 'MessageDetailSize';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailSize',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}