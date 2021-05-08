import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';
import { AdminLangModel } from '@hades/admin/lang/infrastructure/sequelize/sequelize-lang.model';

@Table({ modelName: 'AdminCountry', freezeTableName: true, timestamps: false })
export class AdminCountryModel extends Model<AdminCountryModel>
{
    @Column({
        field: 'id',
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
    })
    id: string;

    @UnderscoredIndex
    @Column({
        field: 'commonId',
        allowNull: false,
        type: DataTypes.UUID,
    })
    commonId: string;

    @ForeignKey(() => AdminLangModel)
    @Column({
        field: 'langId',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    langId: string;

    @BelongsTo(() => AdminLangModel)
    lang: AdminLangModel;

    @Column({
        field: 'iso3166Alpha2',
        allowNull: false,
        type: DataTypes.CHAR(2),
    })
    iso3166Alpha2: string;

    @Column({
        field: 'iso3166Alpha3',
        allowNull: false,
        type: DataTypes.CHAR(3),
    })
    iso3166Alpha3: string;

    @Column({
        field: 'iso3166Numeric',
        allowNull: false,
        type: DataTypes.CHAR(3),
    })
    iso3166Numeric: string;

    @Column({
        field: 'customCode',
        allowNull: true,
        type: DataTypes.STRING(10),
    })
    customCode: string;

    @Column({
        field: 'prefix',
        allowNull: true,
        type: DataTypes.STRING(5),
    })
    prefix: string;

    @Column({
        field: 'name',
        allowNull: false,
        type: DataTypes.STRING(255),
    })
    name: string;

    @Column({
        field: 'slug',
        allowNull: false,
        type: DataTypes.STRING(1024),
    })
    slug: string;

    @Column({
        field: 'image',
        allowNull: true,
        type: DataTypes.STRING(1024),
    })
    image: string;

    @Column({
        field: 'sort',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    sort: number;

    @Column({
        field: 'administrativeAreaLevel1',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    administrativeAreaLevel1: string;

    @Column({
        field: 'administrativeAreaLevel2',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    administrativeAreaLevel2: string;

    @Column({
        field: 'administrativeAreaLevel3',
        allowNull: true,
        type: DataTypes.STRING(50),
    })
    administrativeAreaLevel3: string;

    @Column({
        field: 'administrativeAreas',
        allowNull: true,
        type: DataTypes.JSON,
    })
    administrativeAreas: any;

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
        field: 'dataLang',
        allowNull: true,
        type: DataTypes.JSON,
    })
    dataLang: any;

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