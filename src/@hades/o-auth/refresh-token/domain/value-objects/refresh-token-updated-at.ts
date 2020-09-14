import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class RefreshTokenUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'RefreshTokenUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RefreshTokenUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}