import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SummaryCounter extends IntValueObject 
{
    public readonly type: 'SummaryCounter';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SummaryCounter',
            nullable: false,
            undefinable: false,
            maxLength: 10,
            unsigned: true,
        }, validationRules));
    }
}