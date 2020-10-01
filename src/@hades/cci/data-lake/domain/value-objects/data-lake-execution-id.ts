import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class DataLakeExecutionId extends UuidValueObject
{
    public readonly type: 'DataLakeExecutionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'DataLakeExecutionId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}