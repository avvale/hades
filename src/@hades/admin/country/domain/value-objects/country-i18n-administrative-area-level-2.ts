import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryI18nAdministrativeAreaLevel2 extends StringValueObject
{
    public readonly type: 'CountryI18nAdministrativeAreaLevel2';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryI18nAdministrativeAreaLevel2',
            nullable: true,
            undefinable: true,
            maxLength: 50,
        }, validationRules));
    }
}