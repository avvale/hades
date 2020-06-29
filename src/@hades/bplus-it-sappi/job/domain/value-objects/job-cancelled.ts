import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobCancelled extends IntValueObject 
{
    public readonly type: 'JobCancelled';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobCancelled',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}