import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class DataLakeData extends JsonValueObject 
{
    public readonly type: 'DataLakeData';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'DataLakeData',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}