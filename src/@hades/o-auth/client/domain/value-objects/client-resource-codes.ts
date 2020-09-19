import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ClientResourceCodes extends JsonValueObject 
{
    public readonly type: 'ClientResourceCodes';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientResourceCodes',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}