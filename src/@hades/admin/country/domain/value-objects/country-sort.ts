import { SmallintValueObject } from '@hades/shared/domain/value-objects/smallint.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CountrySort extends SmallintValueObject
{
    public readonly type: 'CountrySort';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CountrySort',
            nullable: true,
            undefinable: true,
            maxLength: 6,
            unsigned: true,
        }, validationRules));
    }
}