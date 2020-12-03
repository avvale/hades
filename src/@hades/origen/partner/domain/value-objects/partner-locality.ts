import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerLocality extends StringValueObject
{
    public readonly type: 'PartnerLocality';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PartnerLocality',
            nullable: true,
            undefinable: true,
            maxLength: 125,
        }, validationRules));
    }
}