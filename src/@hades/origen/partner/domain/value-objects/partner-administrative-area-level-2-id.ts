import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerAdministrativeAreaLevel2Id extends UuidValueObject
{
    public readonly type: 'PartnerAdministrativeAreaLevel2Id';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'PartnerAdministrativeAreaLevel2Id',
            nullable: true,
            undefinable: true,
            length: 36,
        }, validationRules), data);
    }
}