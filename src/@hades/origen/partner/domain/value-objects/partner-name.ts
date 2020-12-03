import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerName extends StringValueObject
{
    public readonly type: 'PartnerName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PartnerName',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}