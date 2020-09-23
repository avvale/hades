import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IamPermissionModel } from '@hades/iam/permission/infrastructure/sequelize/sequelize-permission.model';
import { IamRoleModel } from '@hades/iam/role/infrastructure/sequelize/sequelize-role.model';

@Table({ modelName: 'iam_permissions_roles', freezeTableName: true, timestamps: false })
export class IamPermissionsRolesModel extends Model<IamPermissionsRolesModel> 
{   
    @ForeignKey(() => IamPermissionModel)
    @Column({
        field: 'permission_id',
        type: DataTypes.UUID,
    })
    permissionId: string;

    @ForeignKey(() => IamRoleModel)
    @Column({
        field: 'role_id',
        type: DataTypes.UUID,
    })
    roleId: string;
}