import { IntValueObject } from '@hades/shared/domain/value-objects/int.value-object';

export class LangSort extends IntValueObject 
{
    public readonly type: 'LangSort';

    constructor(value: number) 
    {
        super(value, { 
            name: 'LangSort'
        });
    }
}