import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';
import { AdminCountryModel } from '@hades/admin/country/infrastructure/sequelize/sequelize-country.model';
import { AdminAdministrativeAreaLevel1Model } from '@hades/admin/administrative-area-level-1/infrastructure/sequelize/sequelize-administrative-area-level-1.model';
import { AdminAdministrativeAreaLevel2Model } from '@hades/admin/administrative-area-level-2/infrastructure/sequelize/sequelize-administrative-area-level-2.model';

@Table({ modelName: 'admin_administrative_area_level_3', freezeTableName: true, timestamps: false })
export class AdminAdministrativeAreaLevel3Model extends Model<AdminAdministrativeAreaLevel3Model>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

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
        allowNull: false,
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
        allowNull: false,
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

    @Unique
    @Column({
        field: 'code',
        allowNull: false,
        type: DataTypes.STRING(8),
    })
    code: string;

    @Unique
    @Column({
        field: 'custom_code',
        allowNull: true,
        type: DataTypes.STRING(10),
    })
    customCode: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'slug',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    slug: string;

    @Column({
        field: 'latitude',
        allowNull: true,
        type: DataTypes.DECIMAL(17,4),
    })
    latitude: number;

    @Column({
        field: 'longitude',
        allowNull: true,
        type: DataTypes.DECIMAL(17,4),
    })
    longitude: number;

    @Column({
        field: 'zoom',
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
    })
    zoom: number;

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