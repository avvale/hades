import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { DataValueObject, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AdministrativeAreaLevel2AdministrativeAreaLevel1Id extends UuidValueObject
{
    public readonly type: 'AdministrativeAreaLevel2AdministrativeAreaLevel1Id';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name: 'AdministrativeAreaLevel2AdministrativeAreaLevel1Id',
            nullable: false,
            undefinable: false,
            length: 36,
        }, validationRules), data);
    }
}