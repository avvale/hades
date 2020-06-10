import { BaseEntity } from "@hades/shared/domain/lib/base-entity";
import { ObjectLiteral } from "@hades/shared/domain/lib/object-literal";

export interface TypeOrmMapper
{
    mapToValueObject(object: ObjectLiteral | ObjectLiteral[]): BaseEntity | BaseEntity[];
}