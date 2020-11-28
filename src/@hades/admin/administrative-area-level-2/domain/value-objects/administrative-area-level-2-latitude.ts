import { DecimalValueObject } from '@hades/shared/domain/value-objects/decimal.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel2Latitude extends DecimalValueObject
{
    public readonly type: 'AdministrativeAreaLevel2Latitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel2Latitude',
            nullable: true,
            undefinable: true,
            maxLength: 17,
            decimals: [17, 4],
            unsigned: false,
        }, validationRules));
    }
}