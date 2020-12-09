import { Column, Model, Table, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne, Unique } from 'sequelize-typescript';
import { UnderscoredIndex} from '@hades/shared/infrastructure/persistence/sequelize/decorators/undescored-index.decorator';
import { DataTypes } from 'sequelize';

@Table({ modelName: 'admin_lang', freezeTableName: true, timestamps: false })
export class AdminLangModel extends Model<AdminLangModel>
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
        type: DataTypes.STRING(undefined),
    })
    name: string;

    @Column({
        field: 'image',
        allowNull: true,
        type: DataTypes.STRING(undefined),
    })
    image: string;

    @Column({
        field: 'iso_639_2',
        allowNull: false,
        type: DataTypes.CHAR(2),
    })
    iso6392: string;

    @Column({
        field: 'iso_639_3',
        allowNull: false,
        type: DataTypes.CHAR(3),
    })
    iso6393: string;

    @Column({
        field: 'ietf',
        allowNull: false,
        type: DataTypes.CHAR(5),
    })
    ietf: string;

    @Column({
        field: 'dir',
        allowNull: false,
        type: DataTypes.ENUM('LTR','RTL'),
    })
    dir: string;

    @Column({
        field: 'sort',
        allowNull: true,
        type: DataTypes.SMALLINT.UNSIGNED,
    })
    sort: number;

    @Column({
        field: 'is_active',
        allowNull: false,
        type: DataTypes.BOOLEAN,
    })
    isActive: boolean;

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