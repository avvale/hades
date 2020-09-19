import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccessTokenUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'AccessTokenUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccessTokenUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}