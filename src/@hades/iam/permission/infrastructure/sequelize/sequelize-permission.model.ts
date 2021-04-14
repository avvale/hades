import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';
import { IamBoundedContextModel } from '@hades/iam/bounded-context/infrastructure/sequelize/sequelize-bounded-context.model';
import { IamRoleModel } from '@hades/iam/role/infrastructure/sequelize/sequelize-role.model';
import { IamPermissionsRolesModel } from '@hades/iam/permission/infrastructure/sequelize/sequelize-permissions-roles.model';

@Table({ modelName: 'iam_permission', freezeTableName: true, timestamps: false })
export class IamPermissionModel extends Model<IamPermissionModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @ForeignKey(() => IamBoundedContextModel)
    @Column({
        field: 'bounded_context_id',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    boundedContextId: string;

    @BelongsTo(() => IamBoundedContextModel)
    boundedContext: IamBoundedContextModel;


    @BelongsToMany(() => IamRoleModel, { through: () => IamPermissionsRolesModel, uniqueKey: 'uq01_iam_permissions_roles' })
    roles: IamRoleModel[];

    @Column({
        field: 'created_at',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updated_at',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deleted_at',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}