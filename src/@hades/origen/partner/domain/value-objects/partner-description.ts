import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerDescription extends StringValueObject
{
    public readonly type: 'PartnerDescription';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PartnerDescription',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}