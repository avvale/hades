import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class DataLakeCreatedAt extends TimestampValueObject 
{
    public readonly type: 'DataLakeCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'DataLakeCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}