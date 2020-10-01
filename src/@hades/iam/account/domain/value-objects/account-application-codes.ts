import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountApplicationCodes extends JsonValueObject 
{
    public readonly type: 'AccountApplicationCodes';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccountApplicationCodes',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}