import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';
import { AdminResourceModel } from '@hades/admin/resource/infrastructure/sequelize/sequelize-resource.model';
import { AdminAttachmentFamiliesResourcesModel } from '@hades/admin/attachment-family/infrastructure/sequelize/sequelize-attachment-families-resources.model';

@Table({ modelName: 'admin_attachment_family', freezeTableName: true, timestamps: false })
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
        type: DataTypes.ENUM('CROP','WIDTH','HEIGHT','WIDTH_FREE','HEIGHT_FREE'),
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