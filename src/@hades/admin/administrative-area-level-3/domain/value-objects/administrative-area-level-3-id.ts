import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel3Id extends UuidValueObject
{
    public readonly type: 'AdministrativeAreaLevel3Id';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel3Id',
            nullable: false,
            undefinable: false,
            length: 36,
        }, validationRules), data);
    }
}