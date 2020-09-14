import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class AccessTokenExpiresAt extends TimestampValueObject 
{
    public readonly type: 'AccessTokenExpiresAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccessTokenExpiresAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}