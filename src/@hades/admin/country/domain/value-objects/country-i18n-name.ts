import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryI18nName extends StringValueObject
{
    public readonly type: 'CountryI18nName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryI18nName',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}