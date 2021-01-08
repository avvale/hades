import { SmallintValueObject } from '@hades/shared/domain/value-objects/smallint.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CropHeight extends SmallintValueObject
{
    public readonly type: 'CropHeight';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CropHeight',
            nullable: false,
            undefinable: false,
            maxLength: 6,
            unsigned: true,
        }, validationRules));
    }
}