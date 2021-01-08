import { SmallintValueObject } from '@hades/shared/domain/value-objects/smallint.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CropScaleY extends SmallintValueObject
{
    public readonly type: 'CropScaleY';

    constructor(value: number, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'CropScaleY',
            nullable: false,
            undefinable: false,
            maxLength: 6,
            unsigned: true,
        }, validationRules));
    }
}