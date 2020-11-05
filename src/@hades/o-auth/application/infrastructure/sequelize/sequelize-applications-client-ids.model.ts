import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { OAuthApplicationModel } from '@hades/o-auth/application/infrastructure/sequelize/sequelize-application.model';
import { OAuthClientModel } from '@hades/o-auth/client/infrastructure/sequelize/sequelize-client.model';

@Table({ modelName: 'o_auth_applications_clients', freezeTableName: true, timestamps: false })
export class OAuthApplicationsClientsModel extends Model<OAuthApplicationsClientsModel>
{
    @ForeignKey(() => OAuthApplicationModel)
    @Column({
        field: 'application_id',
        type: DataTypes.UUID,
    })
    applicationId: string;

    @ForeignKey(() => OAuthClientModel)
    @Column({
        field: 'client_id',
        type: DataTypes.UUID,
    })
    clientId: string;
}