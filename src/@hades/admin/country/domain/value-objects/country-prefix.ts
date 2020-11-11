import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryPrefix extends StringValueObject
{
    public readonly type: 'CountryPrefix';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryPrefix',
            nullable: true,
            undefinable: true,
            maxLength: 5,
        }, validationRules));
    }
}