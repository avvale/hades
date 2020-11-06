import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountId extends UuidValueObject
{
    public readonly type: 'AccountId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'AccountId',
            nullable: false,
            undefinable: false,
            length: 36,
        }, validationRules), data);
    }
}