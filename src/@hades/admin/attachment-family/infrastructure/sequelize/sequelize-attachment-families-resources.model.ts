import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminAttachmentFamilyModel } from '@hades/admin/attachment-family/infrastructure/sequelize/sequelize-attachment-family.model';
import { AdminResourceModel } from '@hades/admin/resource/infrastructure/sequelize/sequelize-resource.model';

@Table({ modelName: 'AdminAttachmentFamiliesResources', freezeTableName: true, timestamps: false })
export class AdminAttachmentFamiliesResourcesModel extends Model<AdminAttachmentFamiliesResourcesModel>
{
    @ForeignKey(() => AdminAttachmentFamilyModel)
    @Column({
        field: 'attachmentFamilyId',
        type: DataTypes.UUID,
    })
    attachmentFamilyId: string;

    @ForeignKey(() => AdminResourceModel)
    @Column({
        field: 'resourceId',
        type: DataTypes.UUID,
    })
    resourceId: string;
}