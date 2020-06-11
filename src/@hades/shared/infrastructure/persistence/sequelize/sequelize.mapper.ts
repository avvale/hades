import { BaseEntity } from "@hades/shared/domain/lib/base-entity";
import { ObjectLiteral } from "@hades/shared/domain/lib/object-literal";

export interface SequelizeOrmMapper
{
    mapToEntity(object: ObjectLiteral | ObjectLiteral[]): BaseEntity | BaseEntity[];
}