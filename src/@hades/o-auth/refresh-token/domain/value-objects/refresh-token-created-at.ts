import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class RefreshTokenCreatedAt extends TimestampValueObject 
{
    public readonly type: 'RefreshTokenCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RefreshTokenCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}