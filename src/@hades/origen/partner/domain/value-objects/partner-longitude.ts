import { DecimalValueObject } from '@hades/shared/domain/value-objects/decimal.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerLongitude extends DecimalValueObject
{
    public readonly type: 'PartnerLongitude';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PartnerLongitude',
            nullable: true,
            undefinable: true,
            maxLength: 17,
            decimals: [17, 14],
            unsigned: false,
        }, validationRules));
    }
}