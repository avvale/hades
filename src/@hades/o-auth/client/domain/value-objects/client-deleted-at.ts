import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ClientDeletedAt extends TimestampValueObject 
{
    public readonly type: 'ClientDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}