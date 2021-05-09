import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryI18nAdministrativeAreaLevel3 extends StringValueObject
{
    public readonly type: 'CountryI18nAdministrativeAreaLevel3';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryI18nAdministrativeAreaLevel3',
            nullable: true,
            undefinable: true,
            maxLength: 50,
        }, validationRules));
    }
}