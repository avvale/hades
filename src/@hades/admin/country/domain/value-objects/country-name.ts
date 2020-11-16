import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryName extends StringValueObject
{
    public readonly type: 'CountryName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryName',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}