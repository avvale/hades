import { SmallintValueObject } from '@hades/shared/domain/value-objects/smallint.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilyHeight extends SmallintValueObject
{
    public readonly type: 'AttachmentFamilyHeight';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilyHeight',
            nullable: true,
            undefinable: true,
            maxLength: 6,
            unsigned: true,
        }, validationRules));
    }
}