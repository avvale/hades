import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountrySlug extends StringValueObject
{
    public readonly type: 'CountrySlug';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountrySlug',
            nullable: false,
            undefinable: false,
            maxLength: 1024,
        }, validationRules));
    }
}