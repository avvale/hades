import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserCreatedAt extends TimestampValueObject 
{
    public readonly type: 'UserCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'UserCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}