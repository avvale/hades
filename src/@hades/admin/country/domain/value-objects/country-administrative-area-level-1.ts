import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountryAdministrativeAreaLevel1 extends StringValueObject
{
    public readonly type: 'CountryAdministrativeAreaLevel1';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountryAdministrativeAreaLevel1',
            nullable: true,
            undefinable: true,
            maxLength: 50,
        }, validationRules));
    }
}