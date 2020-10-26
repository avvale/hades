import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountData extends JsonValueObject
{
    public readonly type: 'AccountData';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccountData',
            nullable:  true ,
            undefinable:  true ,
        }, validationRules));
    }
}