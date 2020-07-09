import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ActionCreatedAt extends TimestampValueObject 
{
    public readonly type: 'ActionCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ActionCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}