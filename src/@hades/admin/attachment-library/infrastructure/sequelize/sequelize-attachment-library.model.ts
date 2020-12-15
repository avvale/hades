import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';

@Table({ modelName: 'admin_attachment_library', freezeTableName: true, timestamps: false })
export class AdminAttachmentLibraryModel extends Model<AdminAttachmentLibraryModel>
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
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'pathname',
        allowNull: false,
        type: DataTypes.STRING(1024),
    })
    pathname: string;

    @Column({
        field: 'filename',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    filename: string;

    @Column({
        field: 'url',
        allowNull: false,
        type: DataTypes.STRING(1024),
    })
    url: string;

    @Column({
        field: 'mime',
        allowNull: false,
        type: DataTypes.STRING(50),
    })
    mime: string;

    @Column({
        field: 'extension',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    extension: string;

    @Column({
        field: 'size',
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    size: number;

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
        field: 'data',
        allowNull: true,
        type: DataTypes.JSON,
    })
    data: any;

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