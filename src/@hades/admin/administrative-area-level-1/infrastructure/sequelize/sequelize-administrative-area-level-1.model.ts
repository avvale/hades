import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';
import { AdminCountryModel } from '@hades/admin/country/infrastructure/sequelize/sequelize-country.model';

@Table({ modelName: 'admin_administrative_area_level_1', freezeTableName: true, timestamps: false })
export class AdminAdministrativeAreaLevel1Model extends Model<AdminAdministrativeAreaLevel1Model>
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
        field: 'country_id',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'common_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    countryId: string;

    @BelongsTo(() => AdminCountryModel)
    country: AdminCountryModel;

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