import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PartnerUpdatedAt extends TimestampValueObject
{
    public readonly type: 'PartnerUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'PartnerUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}