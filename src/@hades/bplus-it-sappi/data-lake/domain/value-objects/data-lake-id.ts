import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class DataLakeId extends UuidValueObject
{
    public readonly type: 'DataLakeId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'DataLakeId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}