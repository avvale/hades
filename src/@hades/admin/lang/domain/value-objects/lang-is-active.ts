import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';

export class LangIsActive extends BooleanValueObject 
{
    public readonly type: 'LangIsActive';

    constructor(value: boolean) 
    {
        super(value, { 
            name: 'LangIsActive'
        });
    }
}