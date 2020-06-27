import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'SystemUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}