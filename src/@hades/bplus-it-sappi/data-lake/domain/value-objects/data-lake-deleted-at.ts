import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class DataLakeDeletedAt extends TimestampValueObject 
{
    public readonly type: 'DataLakeDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'DataLakeDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}