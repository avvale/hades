import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerEmail extends StringValueObject
{
    public readonly type: 'PartnerEmail';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PartnerEmail',
            nullable: true,
            undefinable: true,
            maxLength: 120,
        }, validationRules));
    }
}