import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerSocialNetworks extends JsonValueObject
{
    public readonly type: 'PartnerSocialNetworks';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'PartnerSocialNetworks',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}