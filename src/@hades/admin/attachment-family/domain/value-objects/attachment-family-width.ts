import { SmallintValueObject } from '@hades/shared/domain/value-objects/smallint.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilyWidth extends SmallintValueObject
{
    public readonly type: 'AttachmentFamilyWidth';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilyWidth',
            nullable: true,
            undefinable: true,
            maxLength: 6,
            unsigned: true,
        }, validationRules));
    }
}