import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';
import { AdminAttachmentFamilyModel } from '@hades/admin/attachment-family/infrastructure/sequelize/sequelize-attachment-family.model';
import { AdminAttachmentLibraryModel } from '@hades/admin/attachment-library/infrastructure/sequelize/sequelize-attachment-library.model';

@Table({ modelName: 'admin_attachment', freezeTableName: true, timestamps: false })
export class AdminAttachmentModel extends Model<AdminAttachmentModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @Column({
        field: 'common_id',
        allowNull: false,
        type: DataTypes.UUID,
    })
    commonId: string;

    @Column({
        field: 'lang_id',
        allowNull: false,
        type: DataTypes.UUID,
    })
    langId: string;

    @Column({
        field: 'attachable_model',
        allowNull: false,
        type: DataTypes.STRING(75),
    })
    attachableModel: string;

    @Column({
        field: 'attachable_id',
        allowNull: false,
        type: DataTypes.UUID,
    })
    attachableId: string;

    @ForeignKey(() => AdminAttachmentFamilyModel)
    @Column({
        field: 'family_id',
        allowNull: true,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    familyId: string;

    @BelongsTo(() => AdminAttachmentFamilyModel)
    family: AdminAttachmentFamilyModel;

    @Column({
        field: 'sort',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    sort: number;

    @Column({
        field: 'alt',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    alt: string;

    @Column({
        field: 'title',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    title: string;

    @Column({
        field: 'description',
        allowNull: true,
        type: DataTypes.TEXT,
    })
    description: string;

    @Column({
        field: 'excerpt',
        allowNull: true,
        type: DataTypes.TEXT,
    })
    excerpt: string;

    @Column({
        field: 'name',
        allowNull: false,
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

    @ForeignKey(() => AdminAttachmentLibraryModel)
    @Column({
        field: 'library_id',
        allowNull: true,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    libraryId: string;

    @BelongsTo(() => AdminAttachmentLibraryModel)
    attachmentLibrary: AdminAttachmentLibraryModel;

    @Column({
        field: 'library_filename',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    libraryFilename: string;

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