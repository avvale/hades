import { ValueObject } from './value-object';

export abstract class BooleanValueObject implements ValueObject<boolean>
{
    public readonly type: string;

    constructor(
        public readonly value: boolean
    ) {}

    toString(): string 
    {
        return <string><unknown>this.value;
    }
}