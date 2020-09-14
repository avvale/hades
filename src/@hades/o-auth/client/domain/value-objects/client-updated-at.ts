import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ClientUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'ClientUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}