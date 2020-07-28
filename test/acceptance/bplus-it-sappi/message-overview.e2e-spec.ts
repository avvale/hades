import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/domain/message-overview.repository';
import { MockMessageOverviewRepository } from '@hades/bplus-it-sappi/message-overview/infrastructure/mock/mock-message-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('message-overview', () => 
{
    let app: INestApplication;
    let repository: MockMessageOverviewRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IMessageOverviewRepository)
            .useClass(MockMessageOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockMessageOverviewRepository>module.get<IMessageOverviewRepository>(IMessageOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '9ddvtxpgsddzg5b26ml2u6412sgq2vp2mms7qcwg2ugbloplwo',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: '44k4fokl2rgi2t5ewz2p',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:55:40',
                executionMonitoringStartAt: '2020-07-28 07:17:01',
                executionMonitoringEndAt: '2020-07-27 14:20:17',
                numberMax: 8273059247,
                numberDays: 4009432836,
                success: 3087347224,
                cancelled: 6376169282,
                delivering: 5097682424,
                error: 7041357460,
                holding: 3660671500,
                toBeDelivered: 2690009275,
                waiting: 3034529844,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'o25bvm082auqla49nu0lmnmt7vuvbcrw94hamd92ol2zmceutb',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'omzkruvnumamgnmzq3zd',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 11:06:01',
                executionMonitoringStartAt: '2020-07-27 14:50:49',
                executionMonitoringEndAt: '2020-07-28 07:00:52',
                numberMax: 7618605860,
                numberDays: 8779731620,
                success: 7909628608,
                cancelled: 2016704223,
                delivering: 9077692647,
                error: 3928230522,
                holding: 6824446996,
                toBeDelivered: 4293881061,
                waiting: 1473689869,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: null,
                tenantCode: '1us8iurk4k3dzge6rny9dk2b81k7ogqdsv5tbkgylakvn4gz6l',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'lfm2cqqta57vimxcp7yd',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 04:17:46',
                executionMonitoringStartAt: '2020-07-27 22:00:31',
                executionMonitoringEndAt: '2020-07-27 18:48:47',
                numberMax: 7820609817,
                numberDays: 8232562307,
                success: 4683532790,
                cancelled: 8035643916,
                delivering: 9214602301,
                error: 4180020016,
                holding: 6848877639,
                toBeDelivered: 8841185001,
                waiting: 8937972469,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                
                tenantCode: '2wd1ebkqhx9p2gvbysbeyuihlj5cwwv9iksywocrv8zw2ah42l',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'hu1lefg7zkp8wci1ynal',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:20:44',
                executionMonitoringStartAt: '2020-07-27 13:46:37',
                executionMonitoringEndAt: '2020-07-28 04:22:56',
                numberMax: 6885130969,
                numberDays: 6403033959,
                success: 4761186952,
                cancelled: 8601497474,
                delivering: 4553604911,
                error: 2791342861,
                holding: 8153587282,
                toBeDelivered: 7151402124,
                waiting: 2308920416,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: null,
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: '5k5o5ex014wns4szrh1w',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:28:13',
                executionMonitoringStartAt: '2020-07-28 10:37:31',
                executionMonitoringEndAt: '2020-07-27 20:51:43',
                numberMax: 1015638928,
                numberDays: 2695648975,
                success: 9882167125,
                cancelled: 7383871466,
                delivering: 3362132471,
                error: 7824805956,
                holding: 8348484851,
                toBeDelivered: 3146315648,
                waiting: 1787902093,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'bcfysj550yboxo22k7cb',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:13:41',
                executionMonitoringStartAt: '2020-07-27 19:20:39',
                executionMonitoringEndAt: '2020-07-27 20:28:31',
                numberMax: 4934566524,
                numberDays: 2309245302,
                success: 2636284175,
                cancelled: 3839729096,
                delivering: 9114009065,
                error: 9364049700,
                holding: 7049472079,
                toBeDelivered: 2090638081,
                waiting: 5609602771,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '83mgpvuwolxqnoxaskkb3jy2q0hv4q64i6gxi74f6702bx4fe2',
                systemId: null,
                systemName: 'rj62z79tigtqwvjucwt1',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 03:59:35',
                executionMonitoringStartAt: '2020-07-28 02:58:55',
                executionMonitoringEndAt: '2020-07-27 16:29:21',
                numberMax: 7176074132,
                numberDays: 9152746155,
                success: 3664202824,
                cancelled: 4427898315,
                delivering: 9030185967,
                error: 6142149905,
                holding: 4012634784,
                toBeDelivered: 9890050063,
                waiting: 6904271663,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '3sp899tau0fkc0emhay887woxrb1hwu3u0738wt49imeuvbfes',
                
                systemName: 'm4qliemjghl58ulwuh2h',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 05:27:37',
                executionMonitoringStartAt: '2020-07-28 03:34:48',
                executionMonitoringEndAt: '2020-07-28 09:04:52',
                numberMax: 3649843584,
                numberDays: 9997265094,
                success: 4966402161,
                cancelled: 6557432008,
                delivering: 3205167213,
                error: 5642005954,
                holding: 3927326348,
                toBeDelivered: 7630641077,
                waiting: 5305302293,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'w2jiqvbgmle7afylds6pb6nm6weon0n4a9yyu0bfnjgz5ef804',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: null,
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 02:42:43',
                executionMonitoringStartAt: '2020-07-28 01:32:04',
                executionMonitoringEndAt: '2020-07-28 03:03:26',
                numberMax: 4537969344,
                numberDays: 1316821376,
                success: 4333409882,
                cancelled: 4506005745,
                delivering: 7164260881,
                error: 9843752973,
                holding: 3420932956,
                toBeDelivered: 6329117111,
                waiting: 4071397023,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'h3pprokwxytnw134rgnl5xnmouwgjjgv61t8rk70m7ft8ltoes',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 23:01:21',
                executionMonitoringStartAt: '2020-07-27 21:13:38',
                executionMonitoringEndAt: '2020-07-27 16:57:53',
                numberMax: 5636248776,
                numberDays: 9267653659,
                success: 5106090901,
                cancelled: 1456933161,
                delivering: 8815764647,
                error: 5186985829,
                holding: 1530633908,
                toBeDelivered: 5560325000,
                waiting: 8182333749,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'urmxjvby16yvy7139ll6hwk8zgftty40i1ta7pcn6xnlrzhi1z',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'r2gbyg5r81o1wctkd5q8',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:50:22',
                executionMonitoringStartAt: '2020-07-27 14:16:02',
                executionMonitoringEndAt: '2020-07-27 17:48:21',
                numberMax: 5038466681,
                numberDays: 7498771327,
                success: 1516935457,
                cancelled: 4391566220,
                delivering: 6878034007,
                error: 9286957452,
                holding: 8102435318,
                toBeDelivered: 2804963667,
                waiting: 7589780130,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'bz0i05nn9kp53bghywpykw6tjuinwxnbddz9kj65pikcuq8gdf',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'ju7cgxp0gfmp1i7ymjzt',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:06:16',
                executionMonitoringStartAt: '2020-07-27 11:56:00',
                executionMonitoringEndAt: '2020-07-28 04:03:06',
                numberMax: 7808132399,
                numberDays: 2440533405,
                success: 8487409254,
                cancelled: 4633313472,
                delivering: 4034358272,
                error: 4272419905,
                holding: 1674652917,
                toBeDelivered: 7496784410,
                waiting: 5418268625,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'w6t8zlza4pif37s27r5akbjdalyialua1fj37r02bj31gp4wbh',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'hwmmuy2c2m0qw5g19l7l',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: null,
                executionExecutedAt: '2020-07-27 18:34:11',
                executionMonitoringStartAt: '2020-07-27 20:54:46',
                executionMonitoringEndAt: '2020-07-28 09:48:32',
                numberMax: 3091228238,
                numberDays: 5540696386,
                success: 9117171675,
                cancelled: 9445958178,
                delivering: 7586173546,
                error: 6982677807,
                holding: 4691960362,
                toBeDelivered: 9553364122,
                waiting: 1371332059,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'zxn1fv8jj9n8q86iv574lbg78hzsjl8tukn1qq4d80k3g5xrxt',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'u1rcja66dh2gr8xw818d',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                
                executionExecutedAt: '2020-07-28 02:26:03',
                executionMonitoringStartAt: '2020-07-27 22:22:11',
                executionMonitoringEndAt: '2020-07-28 06:31:41',
                numberMax: 5473076551,
                numberDays: 1248867634,
                success: 2468049511,
                cancelled: 7778787537,
                delivering: 9087643448,
                error: 6205968890,
                holding: 3329712235,
                toBeDelivered: 7271671357,
                waiting: 9519320259,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'jvpor7krovced4zqde718cm0xcn4apsv994g2873bm532dacyg',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'q5uyaev1ns1kw9z4ceve',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 06:40:42',
                executionMonitoringEndAt: '2020-07-27 21:40:05',
                numberMax: 6871539226,
                numberDays: 9390000678,
                success: 3749247105,
                cancelled: 1446972614,
                delivering: 3769017151,
                error: 3807177481,
                holding: 2759317969,
                toBeDelivered: 1682950960,
                waiting: 5315107134,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '6fjhtwmlgyfie3zmar9ffi34eoiwbi9utbfu2yaw9bz7t03jm9',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: '7o5ffbforcpffw6f7war',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-28 03:02:30',
                executionMonitoringEndAt: '2020-07-27 18:11:55',
                numberMax: 4669573373,
                numberDays: 6471327010,
                success: 4382590198,
                cancelled: 9737182153,
                delivering: 1733388416,
                error: 4801443876,
                holding: 6203732172,
                toBeDelivered: 2630026524,
                waiting: 9877615391,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '9oskg60usvn13za2jul4orzgf0qwejd9qhtko4240fj5zylnpc',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'ud6weake6hov74hdbiml',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:27:10',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 13:45:16',
                numberMax: 4278274852,
                numberDays: 1162131189,
                success: 8338117816,
                cancelled: 4995407440,
                delivering: 3917274543,
                error: 8774167173,
                holding: 7021153841,
                toBeDelivered: 4492790907,
                waiting: 5045813748,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 't17o237fn2uv7owsgc5dbwy6ot0l7v4iyg91d0u5l2dfqrhw9q',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: '7phrs5uipp5m6d18wttf',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 23:44:28',
                
                executionMonitoringEndAt: '2020-07-28 05:51:51',
                numberMax: 9401548851,
                numberDays: 2250311638,
                success: 4700841876,
                cancelled: 4503394300,
                delivering: 5998714407,
                error: 7055254496,
                holding: 1359129716,
                toBeDelivered: 6475186010,
                waiting: 2294742748,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'gktjutffoaf2fynf6kt8nz9qpict4hgrpl7c0w80hpkc5x6kdl',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'n54t1lpsivwizrwesybu',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 04:09:32',
                executionMonitoringStartAt: '2020-07-27 18:36:50',
                executionMonitoringEndAt: null,
                numberMax: 4552303299,
                numberDays: 5548460238,
                success: 4314979379,
                cancelled: 4200193482,
                delivering: 6587635334,
                error: 6938788870,
                holding: 4407589203,
                toBeDelivered: 8734000647,
                waiting: 8205127384,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '4ui8rgeu3rot1ale86s6q20ug5futg5cwzx2vb7uqtls1vgmz2',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'exv01ahy2n2ko90suzzp',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 07:13:02',
                executionMonitoringStartAt: '2020-07-28 01:13:28',
                
                numberMax: 8198658595,
                numberDays: 2900785976,
                success: 3171849846,
                cancelled: 7338375060,
                delivering: 1656061465,
                error: 9148189698,
                holding: 7208775575,
                toBeDelivered: 1760400099,
                waiting: 4800876625,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'o3nd3vre8ke6s4o8x6sv7qqduut1wfrogpz9y',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'w6kjqvgdg707lif9vizw3d0t5l8s98w3d7pz8n2zja6t9rl95s',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'cnkyekq3pholp8kh7s5k',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:55:55',
                executionMonitoringStartAt: '2020-07-28 00:57:37',
                executionMonitoringEndAt: '2020-07-28 05:43:09',
                numberMax: 6916802989,
                numberDays: 8231468515,
                success: 4494698432,
                cancelled: 7954685182,
                delivering: 3694373277,
                error: 6312830694,
                holding: 9775488519,
                toBeDelivered: 4774400258,
                waiting: 6188421135,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'wart57761ly07ymsl3zvym2orqk44jpgqjee1',
                tenantCode: '41lybfke4x7dl91zyfyriwzix5kt5lpstwpubfzd1m0ubbmty5',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'z4kcceo6m43r7474h8ux',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 06:42:00',
                executionMonitoringStartAt: '2020-07-28 09:24:29',
                executionMonitoringEndAt: '2020-07-27 15:51:44',
                numberMax: 5808172140,
                numberDays: 1913222748,
                success: 1503121925,
                cancelled: 9556521301,
                delivering: 5947681545,
                error: 5601865995,
                holding: 2879219183,
                toBeDelivered: 9882976608,
                waiting: 4279407766,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'vnwgtxok5ib6avn1u69p39r330ycfujs28c6aub5je7yziji3y',
                systemId: 'v7p982n9jsrefv45g28kbg6sdeccy52qnevpb',
                systemName: 'b0hwbg5qcib1w9soaz9b',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:47:01',
                executionMonitoringStartAt: '2020-07-28 10:36:18',
                executionMonitoringEndAt: '2020-07-27 20:07:37',
                numberMax: 2128170784,
                numberDays: 4301850126,
                success: 4677527517,
                cancelled: 5188321153,
                delivering: 6354373190,
                error: 4205358545,
                holding: 8328303655,
                toBeDelivered: 3269138952,
                waiting: 3260230819,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'gpner0ip561f8tdkbqsudc9idf5p761evt5ll6gdjigrfp6gom',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: '2mqu0aunx0wrhwftsuqp',
                executionId: '8odl0mo46rx6x0cb98jdxakyxj1dppz2he4nt',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:03:15',
                executionMonitoringStartAt: '2020-07-27 19:27:09',
                executionMonitoringEndAt: '2020-07-27 22:58:45',
                numberMax: 1987919777,
                numberDays: 4632702420,
                success: 4426572551,
                cancelled: 2464586099,
                delivering: 7231139515,
                error: 3056350556,
                holding: 6531594845,
                toBeDelivered: 9101145898,
                waiting: 8383689755,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '864i572fjzro9trlewchpjoguv08pg70tnpa8qglc8j7j6r5uev',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'xdwt84ewzm9d7iwc5ilc',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 09:36:02',
                executionMonitoringStartAt: '2020-07-28 01:32:44',
                executionMonitoringEndAt: '2020-07-27 14:26:03',
                numberMax: 1350337930,
                numberDays: 6638422669,
                success: 3423933666,
                cancelled: 8005704791,
                delivering: 5283103680,
                error: 2890750872,
                holding: 4339406092,
                toBeDelivered: 5305989457,
                waiting: 3526780783,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'iopiwsyyy4abuh3jzh48vrh1jwxka7ftjief5eixtmqg0wyjyn',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'cpk6w44r6fmsipi7zcg43',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:41:59',
                executionMonitoringStartAt: '2020-07-28 09:19:50',
                executionMonitoringEndAt: '2020-07-28 10:18:39',
                numberMax: 9581949294,
                numberDays: 1616100235,
                success: 4994281912,
                cancelled: 9050824723,
                delivering: 5454402355,
                error: 7741768989,
                holding: 3006332007,
                toBeDelivered: 2706338454,
                waiting: 8580229378,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '4cqn57e40gtcp27uvq0jse60orqprqgpsj7dvzqf0urhupa77q',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: '1rnlnvaycocks4j5ki76',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 02:31:27',
                executionMonitoringStartAt: '2020-07-27 21:44:39',
                executionMonitoringEndAt: '2020-07-28 04:16:18',
                numberMax: 36894059025,
                numberDays: 4846908615,
                success: 1406688510,
                cancelled: 6367003672,
                delivering: 2394479077,
                error: 5429677588,
                holding: 7299090529,
                toBeDelivered: 5309900800,
                waiting: 2839539399,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberMax is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'qu2tu69q5btkmo63merzfu77rkp1pnjqnrrgd09wv36nm6lxqb',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'durfo5vuxzlu9leaxyqh',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 19:03:35',
                executionMonitoringStartAt: '2020-07-27 20:13:15',
                executionMonitoringEndAt: '2020-07-27 21:01:14',
                numberMax: 6245891980,
                numberDays: 47105044335,
                success: 6480830625,
                cancelled: 2221066873,
                delivering: 2215192613,
                error: 6512222351,
                holding: 4418521386,
                toBeDelivered: 4700717877,
                waiting: 2306048551,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewNumberDays is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 's413buxwj932lvqt4jvkr9hl6wr7yews3yxm38se0w554bdwmh',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'xnghxnt99x1r08v2g6ar',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 18:45:50',
                executionMonitoringStartAt: '2020-07-27 17:54:56',
                executionMonitoringEndAt: '2020-07-27 13:08:00',
                numberMax: 7158432567,
                numberDays: 9709695176,
                success: 27860158371,
                cancelled: 4987823287,
                delivering: 6699392549,
                error: 3517750529,
                holding: 5142314085,
                toBeDelivered: 8315196032,
                waiting: 4270577281,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewSuccess is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'ukuopwdt428crsst7uldjg71vq1exo1uzxafcygcyw2xa9llqs',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: '8600sufz2jbtbwn0ump2',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 10:47:00',
                executionMonitoringStartAt: '2020-07-28 07:28:59',
                executionMonitoringEndAt: '2020-07-27 22:42:54',
                numberMax: 4185366606,
                numberDays: 7605601610,
                success: 3526762826,
                cancelled: 49392064725,
                delivering: 3203412214,
                error: 9344274612,
                holding: 2623885503,
                toBeDelivered: 3427118626,
                waiting: 8983328555,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'otttfi2ln5rc2g5x1sy7rrr46biiu1yp8ebapr9vct8y5j83ot',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'r3ue43ohe4gf0fiidrjs',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 15:11:13',
                executionMonitoringStartAt: '2020-07-28 10:31:35',
                executionMonitoringEndAt: '2020-07-27 16:24:36',
                numberMax: 1361486766,
                numberDays: 3322976724,
                success: 3826667529,
                cancelled: 7423010443,
                delivering: 90925475396,
                error: 9696032393,
                holding: 3003078158,
                toBeDelivered: 7597284087,
                waiting: 8447187999,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewDelivering is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'gq9nyex5uqd6ga2puwgx8t7pfikxipyd6jj7tyfkm9o9dq6p1y',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'fdcpk4xbde6be43kqafr',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 09:50:42',
                executionMonitoringStartAt: '2020-07-27 12:12:32',
                executionMonitoringEndAt: '2020-07-28 01:58:33',
                numberMax: 3106005862,
                numberDays: 1480740789,
                success: 2336979338,
                cancelled: 5260268795,
                delivering: 9025655101,
                error: 97502599440,
                holding: 6342331159,
                toBeDelivered: 3577457111,
                waiting: 5491930445,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '2gzpgi0im401u46hvgrnkrdhj8gxjwby0snr3e1vf90ngwrhzw',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'povfqloqj3aiftfct6rc',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:06:22',
                executionMonitoringStartAt: '2020-07-27 14:20:54',
                executionMonitoringEndAt: '2020-07-27 14:42:24',
                numberMax: 8234549036,
                numberDays: 1826174450,
                success: 8919228801,
                cancelled: 4414865772,
                delivering: 5371110184,
                error: 4297997269,
                holding: 24899156595,
                toBeDelivered: 8559359389,
                waiting: 8858055022,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewHolding is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'zf8v33xyor4u3e05mwu3m0q3dd2qhj72pman5tyulzlywqngh4',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: '8jaz9qi8htp7dt7ndng0',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:44:24',
                executionMonitoringStartAt: '2020-07-28 02:49:46',
                executionMonitoringEndAt: '2020-07-27 11:35:24',
                numberMax: 9258190237,
                numberDays: 8261213190,
                success: 7816816934,
                cancelled: 4368741135,
                delivering: 3232805572,
                error: 4715484568,
                holding: 5056355811,
                toBeDelivered: 22455397875,
                waiting: 8746075383,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewToBeDelivered is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'qcft3xyw1ybh394w671isdq8abin4i24x8cwcxpoowed7f10m2',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'n4z01tshcabkui8werh2',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 16:18:25',
                executionMonitoringStartAt: '2020-07-28 04:11:23',
                executionMonitoringEndAt: '2020-07-27 19:30:03',
                numberMax: 2989793733,
                numberDays: 2953359536,
                success: 9820961433,
                cancelled: 7754325923,
                delivering: 6490259393,
                error: 4763638370,
                holding: 2476461509,
                toBeDelivered: 3207436009,
                waiting: 25842276867,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewWaiting is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberMax must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '1uk7wtu7sy03qv98dn5q9xf031l53kvznxu027spn7uv215jod',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: '7pz0qq3bwv0trh0i89w7',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:54:21',
                executionMonitoringStartAt: '2020-07-27 14:54:21',
                executionMonitoringEndAt: '2020-07-28 03:42:46',
                numberMax: -9,
                numberDays: 9385927859,
                success: 9457833526,
                cancelled: 5752553151,
                delivering: 7780208879,
                error: 3911232202,
                holding: 9979255181,
                toBeDelivered: 7740780787,
                waiting: 8024110525,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberMax must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewNumberDays must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '8wws93ybkpmf1485z50t6cy1lt084mnk519stuzgz394n2mtg9',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: '8n0bnbg7lpmn7nbxrp82',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 05:02:52',
                executionMonitoringStartAt: '2020-07-27 16:36:33',
                executionMonitoringEndAt: '2020-07-27 22:55:28',
                numberMax: 6307132690,
                numberDays: -9,
                success: 5423365144,
                cancelled: 1515147098,
                delivering: 8155288994,
                error: 8117696587,
                holding: 2607412643,
                toBeDelivered: 6523369469,
                waiting: 8711857771,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewNumberDays must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewSuccess must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'smgk8l91ugev2rr665uml2lgfe8hd4u0l1vi4iun36mfrehf1q',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'fmp3nc6a3yjznvfbdorh',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:40:37',
                executionMonitoringStartAt: '2020-07-27 14:03:00',
                executionMonitoringEndAt: '2020-07-27 20:58:03',
                numberMax: 3027759231,
                numberDays: 5346562598,
                success: -9,
                cancelled: 5822437780,
                delivering: 1147775730,
                error: 1376931401,
                holding: 3208237135,
                toBeDelivered: 7568812014,
                waiting: 9025706218,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewSuccess must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'r4qchpmtrhzrr6w107nvd5kiy86it7jtoa0gjhk5ubx8w6uxt8',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'y40vvqb6ft0mk2ylchry',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:29:06',
                executionMonitoringStartAt: '2020-07-27 18:55:30',
                executionMonitoringEndAt: '2020-07-27 23:30:40',
                numberMax: 3504033820,
                numberDays: 3088350229,
                success: 2561800219,
                cancelled: -9,
                delivering: 3389217732,
                error: 1954429162,
                holding: 7000391188,
                toBeDelivered: 4472103289,
                waiting: 8586562885,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewDelivering must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'kkaq03pwthgr90qve1bwbn2bcbuyh56jag04aatniqcrz44atd',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'cv2d523ghdeo8t31base',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:40:02',
                executionMonitoringStartAt: '2020-07-27 13:17:43',
                executionMonitoringEndAt: '2020-07-28 06:10:51',
                numberMax: 2829286945,
                numberDays: 3023633065,
                success: 8088386165,
                cancelled: 8614408544,
                delivering: -9,
                error: 6272560437,
                holding: 3769702688,
                toBeDelivered: 2943546809,
                waiting: 3677493543,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewDelivering must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '46me4qbxb04zu6l7astotycwnaonsh6dozcjj55sztonjyz5bj',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'qtlxgm9yr0dxtl7unvst',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:49:01',
                executionMonitoringStartAt: '2020-07-27 19:44:35',
                executionMonitoringEndAt: '2020-07-27 11:20:57',
                numberMax: 3072790581,
                numberDays: 9344372956,
                success: 6264577904,
                cancelled: 6555265679,
                delivering: 6221165132,
                error: -9,
                holding: 7302904430,
                toBeDelivered: 3878156680,
                waiting: 8325027201,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewHolding must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '3i3b3l1rf4rmmsaqhp4mv1icjtqdnh455y0zlb858lsujnz7bv',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'sxxk1jollivr00blvtse',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 08:31:36',
                executionMonitoringStartAt: '2020-07-28 04:02:58',
                executionMonitoringEndAt: '2020-07-28 05:27:36',
                numberMax: 4438955567,
                numberDays: 9109006854,
                success: 3520052049,
                cancelled: 2501072038,
                delivering: 3928430699,
                error: 4265854633,
                holding: -9,
                toBeDelivered: 2378516129,
                waiting: 2000233726,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewHolding must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewToBeDelivered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '27l9k7uv81451ri4vp3enyhb87f0u68wcd4xwsc8qx0lse51mi',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'vhgf6p0crpl4876c4c5x',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:44:24',
                executionMonitoringStartAt: '2020-07-28 04:08:28',
                executionMonitoringEndAt: '2020-07-27 11:30:34',
                numberMax: 1871393532,
                numberDays: 2506851821,
                success: 5258540349,
                cancelled: 7669863030,
                delivering: 1949272258,
                error: 5680811077,
                holding: 4777549102,
                toBeDelivered: -9,
                waiting: 3289577265,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewToBeDelivered must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewWaiting must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'q0sd532cfrptofbc9qvwhpkk7ur3ggpl1thw28re961c5hyoci',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'vfcbl9sebtzly9u1ufm4',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:24:20',
                executionMonitoringStartAt: '2020-07-27 22:15:57',
                executionMonitoringEndAt: '2020-07-27 15:09:32',
                numberMax: 6321584562,
                numberDays: 3959906945,
                success: 9931087870,
                cancelled: 5214840269,
                delivering: 6765676690,
                error: 2613084784,
                holding: 2893244459,
                toBeDelivered: 9682783650,
                waiting: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for MessageOverviewWaiting must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '1ob62njqf7998rzv3tiibon7hpxylda54gh774qzcr0ot4f491',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'kg8002xdht63iqpx2hpw',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-28 08:53:43',
                executionMonitoringStartAt: '2020-07-28 07:53:29',
                executionMonitoringEndAt: '2020-07-27 22:24:51',
                numberMax: 4385149090,
                numberDays: 8855281781,
                success: 4616038162,
                cancelled: 5288292975,
                delivering: 9934240688,
                error: 2662419906,
                holding: 9537550837,
                toBeDelivered: 9730194607,
                waiting: 8570627069,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'we5kwetvoyw58is55evw7ivrov3hf1j3mhu7we4an6wdw4obeq',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'ikx6o7fra39lvgoq47y6',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-28 09:47:52',
                executionMonitoringEndAt: '2020-07-27 23:45:56',
                numberMax: 3123601665,
                numberDays: 5299010250,
                success: 2322754323,
                cancelled: 8404528257,
                delivering: 8434717688,
                error: 9574624122,
                holding: 1495892362,
                toBeDelivered: 6135971538,
                waiting: 8775867973,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'bqwupjik3fhgp4r7rjtcswx4drdz4v0gmxsw1u1y1xj7t0glsp',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'z7qpseid2uu7lz80p3i7',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 07:46:50',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 00:02:46',
                numberMax: 7734376789,
                numberDays: 5634489209,
                success: 7957588878,
                cancelled: 9616250669,
                delivering: 9297918768,
                error: 4866613997,
                holding: 1340614294,
                toBeDelivered: 2843546965,
                waiting: 1410054196,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/message-overview - Got 400 Conflict, MessageOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: '0yrmph9yqjz9ndm73dyjzv3865xrxf0jxfzfnjnyshu3ac3fcm',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'z8d1ui9dcs9pxwyapza2',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 07:34:53',
                executionMonitoringStartAt: '2020-07-28 04:01:36',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 6065628293,
                numberDays: 4894857925,
                success: 3859868546,
                cancelled: 5690147945,
                delivering: 4046915959,
                error: 2435365894,
                holding: 8644368275,
                toBeDelivered: 3991125081,
                waiting: 1247054564,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for MessageOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'o0d26u8w76c25cotufwtg2pt3ee529hselyj7ej9y65bl12iya',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'n0zpyyerjm98r2gvt9gq',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:14:34',
                executionMonitoringStartAt: '2020-07-28 10:29:43',
                executionMonitoringEndAt: '2020-07-27 17:14:20',
                numberMax: 4479551243,
                numberDays: 4240362214,
                success: 1063252117,
                cancelled: 5918559613,
                delivering: 2410293305,
                error: 9144551563,
                holding: 1692450730,
                toBeDelivered: 2870835160,
                waiting: 6782794905,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/messages-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8'));
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/message-overview/a4320a8b-5749-4926-9a8a-e44e41ccb5c8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8'));
    });

    test(`/REST:GET bplus-it-sappi/messages-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/messages-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '63ed754e-d577-4ac1-a456-97721f39b497',
                tenantId: 'e1b1b602-c3c0-47b9-9716-9f32a6ddc9f3',
                tenantCode: 'tf5zm1b0jgle0ejiu7pnlxi2ni2fhx967ahsera1f79z87hdn4',
                systemId: '438fb85e-a592-47d8-a183-94e955c7982b',
                systemName: 'ki4kuv0w7z6syi4ohkwm',
                executionId: 'a21073fb-1efe-46e2-9052-7758f133bc63',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:54:00',
                executionMonitoringStartAt: '2020-07-28 02:04:12',
                executionMonitoringEndAt: '2020-07-28 11:04:30',
                numberMax: 4546558400,
                numberDays: 1341790669,
                success: 7612243695,
                cancelled: 5851073517,
                delivering: 2376393873,
                error: 5437539737,
                holding: 3911373783,
                toBeDelivered: 6418831160,
                waiting: 3902193716,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                tenantCode: 'ldlr0s18zsp67p7veuxvl1r9w0lf6hb27zt06vv6781vlo7h5k',
                systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                systemName: 'syubhy3atkt5ks3i2ae1',
                executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 08:08:38',
                executionMonitoringStartAt: '2020-07-28 04:12:33',
                executionMonitoringEndAt: '2020-07-28 03:24:27',
                numberMax: 5675362968,
                numberDays: 4366624772,
                success: 8422890101,
                cancelled: 2697215751,
                delivering: 9821898209,
                error: 2325537968,
                holding: 1577905331,
                toBeDelivered: 4474189527,
                waiting: 9708955130,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8'));
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/message-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/message-overview/a4320a8b-5749-4926-9a8a-e44e41ccb5c8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateMessageOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageOverviewInput!)
                    {
                        bplusItSappiCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL bplusItSappiCreateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateMessageOverviewInput!)
                    {
                        bplusItSappiCreateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '4e3abad8-3b2c-4b6d-9c6f-12f848a16eb9',
                        tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                        tenantCode: 'lqlxicynz5hj8x1wvaxeidsg8z1nhcjod6gq8bp791yibsj4gl',
                        systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                        systemName: 'fod6t62chcjfxnt6dcmz',
                        executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 20:37:17',
                        executionMonitoringStartAt: '2020-07-27 18:45:16',
                        executionMonitoringEndAt: '2020-07-27 22:40:53',
                        numberMax: 3835466892,
                        numberDays: 4330856295,
                        success: 4326642254,
                        cancelled: 1099202049,
                        delivering: 6106840993,
                        error: 1066359537,
                        holding: 5352481636,
                        toBeDelivered: 1867998655,
                        waiting: 5165474979,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '4e3abad8-3b2c-4b6d-9c6f-12f848a16eb9');
            });
    });

    test(`/GraphQL bplusItSappiPaginateMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateMessagesOverview (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateMessagesOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageOverview (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindMessageOverview (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('a4320a8b-5749-4926-9a8a-e44e41ccb5c8');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('a4320a8b-5749-4926-9a8a-e44e41ccb5c8');
            });
    });

    test(`/GraphQL bplusItSappiGetMessagesOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetMessagesOverview (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetMessagesOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageOverviewInput!)
                    {
                        bplusItSappiUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'cbfadcf1-8c16-4b53-908d-6536f5fc21cc',
                        tenantId: 'c33ab03a-9248-43a8-87a2-d75b91b7dfc1',
                        tenantCode: 'wx97dg74czy1wtb34wpz1j9jthh46lpxytgusa3u4wmjddvcf9',
                        systemId: 'af6f64f3-2a10-4849-bf81-5a8b0c3333f2',
                        systemName: '2l67a1vhsa9gl6j5i1fx',
                        executionId: '37d9f7e1-a062-4125-bf6d-35f079b80316',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 12:23:23',
                        executionMonitoringStartAt: '2020-07-27 15:22:52',
                        executionMonitoringEndAt: '2020-07-28 09:08:39',
                        numberMax: 5769356688,
                        numberDays: 2809836366,
                        success: 3867830641,
                        cancelled: 6066340868,
                        delivering: 9520517804,
                        error: 9591919693,
                        holding: 8762101375,
                        toBeDelivered: 2761228673,
                        waiting: 5500157105,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiUpdateMessageOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateMessageOverviewInput!)
                    {
                        bplusItSappiUpdateMessageOverview (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8',
                        tenantId: 'ee2ec066-2095-43b3-a52e-ee27e875b631',
                        tenantCode: 'v4j8x9pfhrgm1yr0ui5px961c0r7kttjghiklfha0tvo5ql34g',
                        systemId: 'bcde46e4-8c32-4d97-bbe4-c7da74eaa876',
                        systemName: 'ch7pvut7pqxq6wvzm1ls',
                        executionId: '0873e815-76bb-49bb-baba-2af0e6b0530a',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-28 08:00:32',
                        executionMonitoringStartAt: '2020-07-27 20:32:11',
                        executionMonitoringEndAt: '2020-07-28 01:10:16',
                        numberMax: 3180087882,
                        numberDays: 8766743987,
                        success: 7081199019,
                        cancelled: 7389440053,
                        delivering: 1427534550,
                        error: 1883727389,
                        holding: 5678049929,
                        toBeDelivered: 7072417343,
                        waiting: 7747315202,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('a4320a8b-5749-4926-9a8a-e44e41ccb5c8');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteMessageOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteMessageOverviewById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            executionId
                            executionType
                            executionExecutedAt
                            executionMonitoringStartAt
                            executionMonitoringEndAt
                            numberMax
                            numberDays
                            success
                            cancelled
                            delivering
                            error
                            holding
                            toBeDelivered
                            waiting
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a4320a8b-5749-4926-9a8a-e44e41ccb5c8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('a4320a8b-5749-4926-9a8a-e44e41ccb5c8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});