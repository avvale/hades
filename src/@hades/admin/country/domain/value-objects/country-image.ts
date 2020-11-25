import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryImage extends StringValueObject
{
    public readonly type: 'CountryImage';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryImage',
            nullable: true,
            undefinable: true,
            maxLength: 1024,
        }, validationRules));
    }
}