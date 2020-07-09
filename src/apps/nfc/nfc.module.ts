import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from './../shared/shared.module';
import { NfcModels, NfcHandlers, NfcServices, NfcRepositories, NfcSagas } from '@hades/nfc';
import { NfcTagControllers, NfcTagResolvers } from './tag';
import { NfcSessionControllers, NfcSessionResolvers } from './session';
import { NfcSummaryControllers, NfcSummaryResolvers } from './summary';
import { NfcActionControllers, NfcActionResolvers } from './action';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([...NfcModels])
    ],
    controllers: [
        ...NfcTagControllers,
        ...NfcSessionControllers,
        ...NfcSummaryControllers,
        ...NfcActionControllers
    ],
    providers: [
        ...NfcHandlers,
        ...NfcServices,
        ...NfcRepositories,
        ...NfcSagas,
        ...NfcTagResolvers,
        ...NfcSessionResolvers,
        ...NfcSummaryResolvers,
        ...NfcActionResolvers
    ]
})
export class NfcModule {}
