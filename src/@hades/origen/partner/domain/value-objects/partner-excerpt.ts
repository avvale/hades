import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerExcerpt extends StringValueObject
{
    public readonly type: 'PartnerExcerpt';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PartnerExcerpt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}