import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerZip extends StringValueObject
{
    public readonly type: 'PartnerZip';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PartnerZip',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}