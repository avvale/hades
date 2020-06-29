import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobCompleted extends IntValueObject 
{
    public readonly type: 'JobCompleted';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobCompleted',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}