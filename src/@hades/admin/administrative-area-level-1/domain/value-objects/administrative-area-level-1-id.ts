import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel1Id extends UuidValueObject
{
    public readonly type: 'AdministrativeAreaLevel1Id';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel1Id',
            nullable: false,
            undefinable: false,
            length: 36,
        }, validationRules), data);
    }
}