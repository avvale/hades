import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class RefreshTokenDeletedAt extends TimestampValueObject 
{
    public readonly type: 'RefreshTokenDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RefreshTokenDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}