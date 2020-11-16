import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ClientUpdatedAt extends TimestampValueObject
{
    public readonly type: 'ClientUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'ClientUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules), data);
    }
}