import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class DataLakePayload extends JsonValueObject 
{
    public readonly type: 'DataLakePayload';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'DataLakePayload',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}