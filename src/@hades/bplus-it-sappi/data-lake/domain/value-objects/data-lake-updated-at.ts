import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class DataLakeUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'DataLakeUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'DataLakeUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}