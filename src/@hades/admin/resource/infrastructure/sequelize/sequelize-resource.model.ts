import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';
import { IamBoundedContextModel } from '@hades/iam/bounded-context/infrastructure/sequelize/sequelize-bounded-context.model';
import { AdminAttachmentFamilyModel } from '@hades/admin/attachment-family/infrastructure/sequelize/sequelize-attachment-family.model';
import { AdminAttachmentFamiliesResourcesModel } from '@hades/admin/attachment-family/infrastructure/sequelize/sequelize-attachment-families-resources.model';

@Table({ modelName: 'AdminResource', freezeTableName: true, timestamps: false })
export class AdminResourceModel extends Model<AdminResourceModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @ForeignKey(() => IamBoundedContextModel)
    @Column({
        field: 'boundedContextId',
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


    @BelongsToMany(() => AdminAttachmentFamilyModel, () => AdminAttachmentFamiliesResourcesModel)
    attachmentFamilies: AdminAttachmentFamilyModel[];

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'hasCustomFields',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    hasCustomFields: boolean;

    @Column({
        field: 'hasAttachments',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    hasAttachments: boolean;

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