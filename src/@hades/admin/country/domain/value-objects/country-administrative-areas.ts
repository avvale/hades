import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryAdministrativeAreas extends JsonValueObject
{
    public readonly type: 'CountryAdministrativeAreas';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryAdministrativeAreas',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}