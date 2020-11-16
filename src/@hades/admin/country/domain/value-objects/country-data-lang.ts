import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryDataLang extends JsonValueObject
{
    public readonly type: 'CountryDataLang';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryDataLang',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}