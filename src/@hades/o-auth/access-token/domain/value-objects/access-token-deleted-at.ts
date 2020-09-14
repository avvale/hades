import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class AccessTokenDeletedAt extends TimestampValueObject 
{
    public readonly type: 'AccessTokenDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccessTokenDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}