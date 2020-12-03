import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerAdministrativeAreaLevel1Id extends UuidValueObject
{
    public readonly type: 'PartnerAdministrativeAreaLevel1Id';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'PartnerAdministrativeAreaLevel1Id',
            nullable: true,
            undefinable: true,
            length: 36,
        }, validationRules), data);
    }
}