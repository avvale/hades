import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerFax extends StringValueObject
{
    public readonly type: 'PartnerFax';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PartnerFax',
            nullable: true,
            undefinable: true,
            maxLength: 120,
        }, validationRules));
    }
}