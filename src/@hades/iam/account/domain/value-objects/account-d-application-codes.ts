import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountDApplicationCodes extends JsonValueObject 
{
    public readonly type: 'AccountDApplicationCodes';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccountDApplicationCodes',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}