import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminResourceModel } from '@hades/admin/resource/infrastructure/sequelize/sequelize-resource.model';
import { AdminAttachmentFamiliesResourcesModel } from '@hades/admin/attachment-family/infrastructure/sequelize/sequelize-attachment-families-resources.model';

@Table({ modelName: 'AdminAttachmentFamily', freezeTableName: true, timestamps: false })
export class AdminAttachmentFamilyModel extends Model<AdminAttachmentFamilyModel>
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


    @BelongsToMany(() => AdminResourceModel, { through: () => AdminAttachmentFamiliesResourcesModel, uniqueKey: 'uq01_admin_attachment_families_resources' })
    resources: AdminResourceModel[];

    @Column({
        field: 'width',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    width: number;

    @Column({
        field: 'height',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    height: number;

    @Column({
        field: 'fit',
        allowNull: true,
        type: DataTypes.ENUM('CROP','WIDTH','HEIGHT','FREE_WIDTH','FREE_HEIGHT'),
    })
    fit: string;

    @Column({
        field: 'sizes',
        allowNull: true,
        type: DataTypes.JSON,
    })
    sizes: any;

    @Column({
        field: 'quality',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    quality: number;

    @Column({
        field: 'format',
        allowNull: true,
        type: DataTypes.ENUM('JPG','PNG','GIF','TIF','BMP','DATA_URL'),
    })
    format: string;

    @Column({
        field: 'createdAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    createdAt: string;

    @Column({
        field: 'updatedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    updatedAt: string;

    @Column({
        field: 'deletedAt',
        allowNull: true,
        type: DataTypes.DATE,
    })
    deletedAt: string;

}