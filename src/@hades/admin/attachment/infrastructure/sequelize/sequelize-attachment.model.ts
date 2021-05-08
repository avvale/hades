import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';
import { AdminAttachmentFamilyModel } from '@hades/admin/attachment-family/infrastructure/sequelize/sequelize-attachment-family.model';
import { AdminAttachmentLibraryModel } from '@hades/admin/attachment-library/infrastructure/sequelize/sequelize-attachment-library.model';

@Table({ modelName: 'AdminAttachment', freezeTableName: true, timestamps: false })
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
        field: 'commonId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    commonId: string;

    @Column({
        field: 'langId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    langId: string;

    @Column({
        field: 'attachableModel',
        allowNull: false,
        type: DataTypes.STRING(75),
    })
    attachableModel: string;

    @UnderscoredIndex
    @Column({
        field: 'attachableId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    attachableId: string;

    @ForeignKey(() => AdminAttachmentFamilyModel)
    @Column({
        field: 'familyId',
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
        field: 'libraryId',
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
    library: AdminAttachmentLibraryModel;

    @Column({
        field: 'libraryFilename',
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