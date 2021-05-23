import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { AdminLangModel } from '@hades/admin/lang/infrastructure/sequelize/sequelize-lang.model';
import { AdminCountryModel } from '@hades/admin/country';

@Table({ modelName: 'AdminCountryI18n', freezeTableName: true, timestamps: false })
export class AdminCountryI18nModel extends Model<AdminCountryI18nModel>
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
        field: 'countryId',
        allowNull: false,
        type: DataTypes.UUID,
        references: {
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
    })
    countryId: string;

    @BelongsTo(() => AdminCountryModel)
    country: AdminCountryModel;

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