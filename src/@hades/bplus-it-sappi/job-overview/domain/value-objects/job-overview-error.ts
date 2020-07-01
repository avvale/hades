import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobOverviewError extends IntValueObject 
{
    public readonly type: 'JobOverviewError';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobOverviewError',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}