import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageOverviewSuccess extends IntValueObject 
{
    public readonly type: 'MessageOverviewSuccess';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewSuccess',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}