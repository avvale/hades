import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerPhone extends StringValueObject
{
    public readonly type: 'PartnerPhone';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PartnerPhone',
            nullable: true,
            undefinable: true,
            maxLength: 120,
        }, validationRules));
    }
}