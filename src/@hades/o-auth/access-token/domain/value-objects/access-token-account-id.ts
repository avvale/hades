import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccessTokenAccountId extends UuidValueObject
{
    public readonly type: 'AccessTokenAccountId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'AccessTokenAccountId',
            nullable: true,
            undefinable: true,
            length: 36,
        }, validationRules), data);
    }
}