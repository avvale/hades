import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryI18nSlug extends StringValueObject
{
    public readonly type: 'CountryI18nSlug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryI18nSlug',
            nullable: false,
            undefinable: false,
            maxLength: 1024,
        }, validationRules));
    }
}