import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ActionDeletedAt extends TimestampValueObject 
{
    public readonly type: 'ActionDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ActionDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}