import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryIso3166Alpha2 extends StringValueObject
{
    public readonly type: 'CountryIso3166Alpha2';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryIso3166Alpha2',
            nullable: false,
            undefinable: false,
            length: 2,

        }, validationRules));
    }
}