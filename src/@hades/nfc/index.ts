import { NfcTagHandlers, NfcTagServices, NfcTagModel, ITagRepository, SequelizeTagRepository, TagSagas } from './tag';
import { NfcSessionHandlers, NfcSessionServices, NfcSessionModel, ISessionRepository, SequelizeSessionRepository, SessionSagas } from './session';
import { NfcSummaryHandlers, NfcSummaryServices, NfcSummaryModel, ISummaryRepository, SequelizeSummaryRepository, SummarySagas } from './summary';
import { NfcActionHandlers, NfcActionServices, NfcActionModel, IActionRepository, SequelizeActionRepository, ActionSagas } from './action';

export const NfcHandlers = [
    ...NfcTagHandlers,
    ...NfcSessionHandlers,
    ...NfcSummaryHandlers,
    ...NfcActionHandlers
];
export const NfcServices = [
    ...NfcTagServices,
    ...NfcSessionServices,
    ...NfcSummaryServices,
    ...NfcActionServices
];
export const NfcModels = [
    NfcTagModel,
    NfcSessionModel,
    NfcSummaryModel,
    NfcActionModel
];
export const NfcRepositories = [
    {
        provide: ITagRepository,
        useClass: SequelizeTagRepository
    },
    {
        provide: ISessionRepository,
        useClass: SequelizeSessionRepository
    },
    {
        provide: ISummaryRepository,
        useClass: SequelizeSummaryRepository
    },
    {
        provide: IActionRepository,
        useClass: SequelizeActionRepository
    }
];
export const NfcSagas = [
    TagSagas,
    SessionSagas,
    SummarySagas,
    ActionSagas
];
