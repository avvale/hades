import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';
import { AdminCountryModel } from '@hades/admin/country/infrastructure/sequelize/sequelize-country.model';
import { AdminAdministrativeAreaLevel1Model } from '@hades/admin/administrative-area-level-1/infrastructure/sequelize/sequelize-administrative-area-level-1.model';
import { AdminAdministrativeAreaLevel2Model } from '@hades/admin/administrative-area-level-2/infrastructure/sequelize/sequelize-administrative-area-level-2.model';
import { AdminAdministrativeAreaLevel3Model } from '@hades/admin/administrative-area-level-3/infrastructure/sequelize/sequelize-administrative-area-level-3.model';

@Table({ modelName: 'origen_partner', freezeTableName: true, timestamps: false })
export class OrigenPartnerModel extends Model<OrigenPartnerModel>
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

    @Column({
        field: 'social_networks',
        allowNull: true,
        type: DataTypes.JSON,
    })
    socialNetworks: any;

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
        field: 'email',
        allowNull: true,
        type: DataTypes.STRING(120),
    })
    email: string;

    @Column({
        field: 'phone',
        allowNull: true,
        type: DataTypes.STRING(120),
    })
    phone: string;

    @Column({
        field: 'fax',
        allowNull: true,
        type: DataTypes.STRING(120),
    })
    fax: string;

    @ForeignKey(() => AdminCountryModel)
    @Column({
        field: 'country_common_id',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'common_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    countryCommonId: string;

    @BelongsTo(() => AdminCountryModel)
    country: AdminCountryModel;

    @ForeignKey(() => AdminAdministrativeAreaLevel1Model)
    @Column({
        field: 'administrative_area_level_1_id',
        allowNull: true,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    administrativeAreaLevel1Id: string;

    @BelongsTo(() => AdminAdministrativeAreaLevel1Model)
    administrativeAreaLevel1: AdminAdministrativeAreaLevel1Model;

    @ForeignKey(() => AdminAdministrativeAreaLevel2Model)
    @Column({
        field: 'administrative_area_level_2_id',
        allowNull: true,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    administrativeAreaLevel2Id: string;

    @BelongsTo(() => AdminAdministrativeAreaLevel2Model)
    administrativeAreaLevel2: AdminAdministrativeAreaLevel2Model;

    @ForeignKey(() => AdminAdministrativeAreaLevel3Model)
    @Column({
        field: 'administrative_area_level_3_id',
        allowNull: true,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    administrativeAreaLevel3Id: string;

    @BelongsTo(() => AdminAdministrativeAreaLevel3Model)
    administrativeAreaLevel3: AdminAdministrativeAreaLevel3Model;

    @Column({
        field: 'zip',
        allowNull: true,
        type: DataTypes.STRING(10),
    })
    zip: string;

    @Column({
        field: 'locality',
        allowNull: true,
        type: DataTypes.STRING(125),
    })
    locality: string;

    @Column({
        field: 'address',
        allowNull: true,
        type: DataTypes.STRING(255),
    })
    address: string;

    @Column({
        field: 'latitude',
        allowNull: true,
        type: DataTypes.DECIMAL(17,14),
    })
    latitude: number;

    @Column({
        field: 'longitude',
        allowNull: true,
        type: DataTypes.DECIMAL(17,14),
    })
    longitude: number;

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