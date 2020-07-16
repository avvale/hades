import { BplusItSappiChannelDetailHandlers, BplusItSappiChannelDetailServices, BplusItSappiChannelDetailModel, IChannelDetailRepository, SequelizeChannelDetailRepository, ChannelDetailSagas } from './channel-detail';

export const BplusItSappiHandlers = [
    ...BplusItSappiChannelDetailHandlers
];
export const BplusItSappiServices = [
    ...BplusItSappiChannelDetailServices
];
export const BplusItSappiModels = [
    BplusItSappiChannelDetailModel
];
export const BplusItSappiRepositories = [
    {
        provide: IChannelDetailRepository,
        useClass: SequelizeChannelDetailRepository
    }
];
export const BplusItSappiSagas = [
    ChannelDetailSagas
];
