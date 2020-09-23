import { IamBoundedContextHandlers, IamBoundedContextServices, IamBoundedContextModel, IBoundedContextRepository, SequelizeBoundedContextRepository, BoundedContextSagas } from './bounded-context';

export const IamHandlers = [
    ...IamBoundedContextHandlers
];
export const IamServices = [
    ...IamBoundedContextServices
];
export const IamModels = [
    IamBoundedContextModel
];
export const IamRepositories = [
    {
        provide: IBoundedContextRepository,
        useClass: SequelizeBoundedContextRepository
    }
];
export const IamSagas = [
    BoundedContextSagas
];
