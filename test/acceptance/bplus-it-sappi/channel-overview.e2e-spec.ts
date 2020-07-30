import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/domain/channel-overview.repository';
import { MockChannelOverviewRepository } from '@hades/bplus-it-sappi/channel-overview/infrastructure/mock/mock-channel-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel-overview', () => 
{
    let app: INestApplication;
    let repository: MockChannelOverviewRepository;
    
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
            .overrideProvider(IChannelOverviewRepository)
            .useClass(MockChannelOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelOverviewRepository>module.get<IChannelOverviewRepository>(IChannelOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '5qg6ao79s4sye8f914yrxwads2okluuq2b0rpbuubkdpvd1ljm',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'wiarez623kk80gl118b5',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:55:04',
                executionMonitoringStartAt: '2020-07-29 21:57:22',
                executionMonitoringEndAt: '2020-07-29 18:12:36',
                error: 8113049046,
                inactive: 7279696558,
                successful: 3338252431,
                stopped: 8576117322,
                unknown: 4362301124,
                unregistered: 6506063426,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '5389jxdvrafhegq6my0jvedhdpe5ut0e3ksp21e8ls5071102n',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'aicnwvh4u41hem7f6x3a',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:53:49',
                executionMonitoringStartAt: '2020-07-29 14:17:52',
                executionMonitoringEndAt: '2020-07-29 12:19:43',
                error: 4176514843,
                inactive: 5358545394,
                successful: 9522244744,
                stopped: 1940853021,
                unknown: 4619967818,
                unregistered: 6305586368,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: null,
                tenantCode: 'g0e8xrrirx7ii7br3ta7mo0xbgxjije5tqsahipj34sd9rg6w5',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'a0b7773tbi5supc3ydmc',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:11:11',
                executionMonitoringStartAt: '2020-07-29 12:49:49',
                executionMonitoringEndAt: '2020-07-29 09:28:41',
                error: 8374795984,
                inactive: 8424694136,
                successful: 9369762340,
                stopped: 4239148665,
                unknown: 5971178558,
                unregistered: 3331193228,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                
                tenantCode: 'c1wm6vpmdyb8ngvnsoujvmy4u3zk6golucy3qw8ewnsjkuqcsr',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: '2ybbx0faqcq0idex6tjr',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 19:22:44',
                executionMonitoringStartAt: '2020-07-29 06:59:00',
                executionMonitoringEndAt: '2020-07-30 00:17:58',
                error: 1381198252,
                inactive: 1450249157,
                successful: 4061838489,
                stopped: 2030193863,
                unknown: 6245295626,
                unregistered: 1350651091,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: null,
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'kh435h73x47j38wb2bdn',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:24:05',
                executionMonitoringStartAt: '2020-07-29 17:44:40',
                executionMonitoringEndAt: '2020-07-29 08:58:54',
                error: 4367461377,
                inactive: 9704785030,
                successful: 1973710217,
                stopped: 3657255518,
                unknown: 2078786940,
                unregistered: 8815200198,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'rnwcuujmsl6015ovhwy9',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:42:53',
                executionMonitoringStartAt: '2020-07-29 18:52:27',
                executionMonitoringEndAt: '2020-07-29 09:31:14',
                error: 2064910583,
                inactive: 9627292410,
                successful: 5940509276,
                stopped: 1244416292,
                unknown: 5611711898,
                unregistered: 2874827290,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'da8b3aqzqjpdp1uuoeupfc115o8y48muim7it01h7bo4xrfetv',
                systemId: null,
                systemName: 'ay7xs25cvcntr8i8gmaj',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 23:46:07',
                executionMonitoringStartAt: '2020-07-29 04:34:11',
                executionMonitoringEndAt: '2020-07-29 10:30:07',
                error: 9595771112,
                inactive: 3770002511,
                successful: 9822613071,
                stopped: 3569973576,
                unknown: 6995682465,
                unregistered: 7538159510,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'zgg5lvuzdwat5p8ukk4u7xmgppjr5b1di4zw2dt45gcif2jr15',
                
                systemName: '6356tmqxb04hdfdhoyz6',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:23:28',
                executionMonitoringStartAt: '2020-07-30 01:02:10',
                executionMonitoringEndAt: '2020-07-29 22:39:26',
                error: 7939524326,
                inactive: 7108321803,
                successful: 6516588280,
                stopped: 2080665431,
                unknown: 2332459914,
                unregistered: 8324743659,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'iol5cd60y0d4hcwf5hg1t2uouywck550sk9x46pfusvsfepzz7',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: null,
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 18:19:34',
                executionMonitoringStartAt: '2020-07-29 10:56:49',
                executionMonitoringEndAt: '2020-07-29 08:43:59',
                error: 9959207331,
                inactive: 9482099975,
                successful: 8402546974,
                stopped: 3459638666,
                unknown: 2439722625,
                unregistered: 9298571769,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '0d8govn17xgxqconju7q2jzj84yy5ib5hq88zo4n5tnijgkglh',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:46:46',
                executionMonitoringStartAt: '2020-07-29 02:55:26',
                executionMonitoringEndAt: '2020-07-29 19:53:43',
                error: 3916545285,
                inactive: 1219394657,
                successful: 7836464321,
                stopped: 7461893685,
                unknown: 9790676719,
                unregistered: 1739762201,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '9iwppf0xgqlziapetdeuub55itu4t1ai9y97id7bfm2z6ju7t4',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'bdlb71qyth6ndlrnsjju',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:43:40',
                executionMonitoringStartAt: '2020-07-29 03:36:06',
                executionMonitoringEndAt: '2020-07-29 09:46:10',
                error: 6299684884,
                inactive: 7983714126,
                successful: 1961776095,
                stopped: 4648420875,
                unknown: 3504416358,
                unregistered: 9954912998,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'r8dk3ctop2wksqev2v453wcolmhdx6mlxf8hypisu3ax2ik14q',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'ohx9q0661jvx3f7v6fl3',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:17:00',
                executionMonitoringStartAt: '2020-07-29 04:38:09',
                executionMonitoringEndAt: '2020-07-30 00:36:23',
                error: 2471717046,
                inactive: 5563183583,
                successful: 7160736948,
                stopped: 6417322678,
                unknown: 3144420784,
                unregistered: 1224646406,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '8civj76fsyf3f26dlwsd82avjvl138z6tufp4dog4rmqtkvkqg',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'jjodmiluk36xh4ib1y8r',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: null,
                executionExecutedAt: '2020-07-29 23:45:54',
                executionMonitoringStartAt: '2020-07-29 21:59:49',
                executionMonitoringEndAt: '2020-07-29 20:44:38',
                error: 9182139562,
                inactive: 1468075394,
                successful: 3155487372,
                stopped: 1075325222,
                unknown: 6108333244,
                unregistered: 7742339798,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'fqapztycpnl8zey5tjkh5nj3ewg8yonpdjet8jgb6agjsjoj2i',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: '1wnrzmygdx5x5rdrlaij',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                
                executionExecutedAt: '2020-07-29 12:49:52',
                executionMonitoringStartAt: '2020-07-29 10:25:58',
                executionMonitoringEndAt: '2020-07-29 07:25:13',
                error: 5473995789,
                inactive: 8166344332,
                successful: 8930370806,
                stopped: 4691150110,
                unknown: 3215423871,
                unregistered: 7933387537,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '0lxxccdgpmxqdck7zcjx5udg5rerh93rzo4nyb8myavoxffia6',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: '1vgmfsblkvol53wz66tn',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 20:14:40',
                executionMonitoringEndAt: '2020-07-29 17:34:10',
                error: 7062691427,
                inactive: 5409185387,
                successful: 7996327731,
                stopped: 3288346986,
                unknown: 7148497633,
                unregistered: 4645134100,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '716azpaokbw2gqw8hlar1cxqfwcds664e6unag08zpt6zapon7',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'fzlaoq3qypdhus0yvyck',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-29 12:46:48',
                executionMonitoringEndAt: '2020-07-29 22:14:05',
                error: 8796533664,
                inactive: 7624773683,
                successful: 3017872348,
                stopped: 1255270669,
                unknown: 1912180829,
                unregistered: 1232006889,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'mn5qdezkyj1zhz0p9upt84zp3rj1cwrtxxwhr44n4jiq8dejam',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'ye0di30dgck9clatc5aw',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:05:45',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 22:53:18',
                error: 7555240312,
                inactive: 9663042666,
                successful: 3707162146,
                stopped: 3834189331,
                unknown: 5265366142,
                unregistered: 7763924862,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '67kqn5p6daqi7jcbzc4yhxozcdqptqi7vayiavv96gpfetkpph',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: '6yj476jf9nmqxgdhpxiq',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 18:45:27',
                
                executionMonitoringEndAt: '2020-07-29 04:48:37',
                error: 1219234429,
                inactive: 6787730774,
                successful: 7940465170,
                stopped: 7233023325,
                unknown: 1552873533,
                unregistered: 3694864692,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'pv84zxvj3ot3dnwx5hqthda79jyxv2g0vdpgsdhk8zg5d3mkrf',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'lfy358mdkk5fn43wlj9c',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:20:41',
                executionMonitoringStartAt: '2020-07-29 09:40:38',
                executionMonitoringEndAt: null,
                error: 1620081898,
                inactive: 9185999321,
                successful: 8238853198,
                stopped: 3221688856,
                unknown: 9098240342,
                unregistered: 5046733140,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '5himak34lvkj03vqqudt47guk8hloqcw5aeziwesc23a5wxupr',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: '5jnm4tbr0irdrrlyt521',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 21:38:01',
                executionMonitoringStartAt: '2020-07-29 11:56:45',
                
                error: 1135115514,
                inactive: 3087160362,
                successful: 4536683945,
                stopped: 3352579596,
                unknown: 9985982616,
                unregistered: 8743073275,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'wv5i2vuncc3kstq0u5nq1x53ha7xc4fsyvuth',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '4jdyq98340rv2l64b5qv0eh78v4i0629irggf7hb91a7yv97fs',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'kgi8vykur924qxoyrdop',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:43:09',
                executionMonitoringStartAt: '2020-07-29 16:16:48',
                executionMonitoringEndAt: '2020-07-29 09:22:48',
                error: 3776840204,
                inactive: 4126011327,
                successful: 8799731631,
                stopped: 5248483887,
                unknown: 1666738923,
                unregistered: 9127246255,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '8erwd8blt4ivtz42m2adat6u6g3pzmao3jkl9',
                tenantCode: 'uyfh5sbqp185mb8yhgzzz3gbwqcmhwznfk35jo084rapinxnt5',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'h8su3t6cy93egya200jh',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 01:50:38',
                executionMonitoringStartAt: '2020-07-29 22:19:44',
                executionMonitoringEndAt: '2020-07-29 17:54:42',
                error: 6782330084,
                inactive: 6911962196,
                successful: 7339983280,
                stopped: 8947627776,
                unknown: 4945379418,
                unregistered: 4010450007,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '5njhkw4my6a3dwju4ebm3o4zr3km59t5fp81j7jw282pb2gits',
                systemId: 'uf4h5x7nqgadbocqffr26t0jkbwfbyt92b8n6',
                systemName: 'e2co5yekzuqeozimsl76',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:23:31',
                executionMonitoringStartAt: '2020-07-29 12:23:27',
                executionMonitoringEndAt: '2020-07-29 22:40:47',
                error: 2468635187,
                inactive: 8882303666,
                successful: 4357928906,
                stopped: 9048473860,
                unknown: 8384762371,
                unregistered: 4900290844,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'ov3gdswiyo4ajq9j302qujij9935j33lmaf9igtlq5mve6pzsm',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'al5hbc3deyp99ha62d7k',
                executionId: 'r53g8fyvq8czit8eycw9jle3ek6uopmtyo3ma',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:46:11',
                executionMonitoringStartAt: '2020-07-29 14:01:41',
                executionMonitoringEndAt: '2020-07-29 19:33:27',
                error: 6976752184,
                inactive: 8700250529,
                successful: 7057898733,
                stopped: 6162705072,
                unknown: 5724400818,
                unregistered: 3563483029,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'gkp0511n52lxokv423jwss2y4p1r4u5khd1bc5iefggz5uq45pn',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'mv8dcc54egxn4m6e0kzs',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:57:32',
                executionMonitoringStartAt: '2020-07-29 15:01:10',
                executionMonitoringEndAt: '2020-07-29 13:14:39',
                error: 9540448837,
                inactive: 7027785111,
                successful: 8865875687,
                stopped: 9336481143,
                unknown: 2375930400,
                unregistered: 2907913192,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '53b24tlxg3thkbgq700uqr9xdrxzj95l2s9gywwcndzepjdrcv',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 't448l6i0aivwbxhxisi5v',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-30 00:44:54',
                executionMonitoringStartAt: '2020-07-29 04:14:12',
                executionMonitoringEndAt: '2020-07-29 23:15:53',
                error: 6392055966,
                inactive: 3809013728,
                successful: 2520477761,
                stopped: 5761575341,
                unknown: 3968961802,
                unregistered: 2276839815,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '7sojyzquaoe9tvkmeakauw75sgpkmpnwr3y388hhx62os0t9lr',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'x6p735a9q1cwd3yb5a6b',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 20:51:58',
                executionMonitoringStartAt: '2020-07-29 08:19:21',
                executionMonitoringEndAt: '2020-07-29 07:05:21',
                error: 96002370933,
                inactive: 2701629061,
                successful: 4448042615,
                stopped: 1414776105,
                unknown: 5435223679,
                unregistered: 6724716849,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewError is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'hs5b0pqpv0z526vs8y95vlnt0xdwnx5yoiuacn7cutce079m16',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'wmdds2q8xd1kthsdt5y1',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:34:37',
                executionMonitoringStartAt: '2020-07-29 08:41:57',
                executionMonitoringEndAt: '2020-07-30 00:52:57',
                error: 4112130654,
                inactive: 43151964197,
                successful: 5715702716,
                stopped: 8370386403,
                unknown: 4705846454,
                unregistered: 3823826334,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewInactive is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '2wbjiymdp1j1l9t1x06vitnker5udsh40d3ig7i7a18bbfvosq',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'i8ga7kocb5qk927ycd64',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:57:20',
                executionMonitoringStartAt: '2020-07-29 21:53:11',
                executionMonitoringEndAt: '2020-07-29 07:30:10',
                error: 9500439556,
                inactive: 7221067755,
                successful: 23094452042,
                stopped: 3811705907,
                unknown: 7021882987,
                unregistered: 2506159932,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSuccessful is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'i0qxnxa0abeguuz1o0z425nr35gb4b96a3htptkcjrzw8xsctb',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'zau1ys775rjsebo0ze39',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:12:30',
                executionMonitoringStartAt: '2020-07-29 21:11:50',
                executionMonitoringEndAt: '2020-07-29 03:59:18',
                error: 7546773218,
                inactive: 3692443567,
                successful: 7111467268,
                stopped: 11296181652,
                unknown: 1985650333,
                unregistered: 7740011051,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewStopped is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '7epap6kv5zzg9ewym7gkfr2bhhgfk9tov39gkm3hffgrvnups4',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 's4n0duwgawdbyxzdjcx5',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:38:36',
                executionMonitoringStartAt: '2020-07-29 06:02:34',
                executionMonitoringEndAt: '2020-07-29 20:58:48',
                error: 7658094137,
                inactive: 1668704641,
                successful: 7634798129,
                stopped: 9291345644,
                unknown: 74494851683,
                unregistered: 1611412602,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnknown is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'ccvm63czouue9k8hmfks1nuxus69i18kewe0uf91ix4xf7mt73',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'e12w2reqp30jo6qha0mx',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:28:50',
                executionMonitoringStartAt: '2020-07-29 13:22:51',
                executionMonitoringEndAt: '2020-07-29 21:35:56',
                error: 5463398030,
                inactive: 1841040569,
                successful: 9324147189,
                stopped: 9058241135,
                unknown: 9594375957,
                unregistered: 36966600779,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnregistered is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'hmjfehmray9ya1qwyh1szn8nmzct6qoapv9re94ynxyym3jcne',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'n4demwr0w7a4mn51u0mx',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:00:10',
                executionMonitoringStartAt: '2020-07-29 19:36:06',
                executionMonitoringEndAt: '2020-07-29 05:49:37',
                error: -9,
                inactive: 3014071466,
                successful: 4605842641,
                stopped: 9685443036,
                unknown: 6781253921,
                unregistered: 4167245785,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 't1nm6qldyoc1ifpo190xttg7oan5nxnhtqbizq932beyuk06r4',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 't3lq4jkzsic86ovi960n',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:49:00',
                executionMonitoringStartAt: '2020-07-29 18:19:37',
                executionMonitoringEndAt: '2020-07-30 00:50:11',
                error: 6535284043,
                inactive: -9,
                successful: 6789747123,
                stopped: 5653449971,
                unknown: 1630138007,
                unregistered: 5173698423,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewInactive must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'p0vc2jxljbyd17pi13is14boe10d6go9y9i7scpldse3i2nyvp',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'qttw4b2m9z0d0ma415t7',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:52:30',
                executionMonitoringStartAt: '2020-07-29 18:56:45',
                executionMonitoringEndAt: '2020-07-30 00:37:50',
                error: 7257422879,
                inactive: 3526774710,
                successful: -9,
                stopped: 9495241554,
                unknown: 3634402379,
                unregistered: 5638508438,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewSuccessful must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'y27unuqyfgt9tkgp76q6pckrd29xpfncwzwvtfkirtjlm0o3dq',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'kn0l206soyp6nfbviq0i',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:33:29',
                executionMonitoringStartAt: '2020-07-29 15:10:12',
                executionMonitoringEndAt: '2020-07-29 14:08:56',
                error: 7225895890,
                inactive: 7833839815,
                successful: 4614959092,
                stopped: -9,
                unknown: 2956800838,
                unregistered: 1622779164,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewStopped must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'hr9kj9or6csd6gh16a659e5sjx3ngmw5t27rod52so87xr70gu',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'zqe148sgxfq8mswmvbok',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:11:16',
                executionMonitoringStartAt: '2020-07-29 23:33:35',
                executionMonitoringEndAt: '2020-07-29 23:55:29',
                error: 9134908274,
                inactive: 6008510459,
                successful: 3680153525,
                stopped: 5016340518,
                unknown: -9,
                unregistered: 3242148645,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnknown must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'rr1xld4ki2m5cgw53xfm9xji1zmcmyu376crlv22695pt4bfyj',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'we4rd8xxt41m8x5jaba6',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:15:18',
                executionMonitoringStartAt: '2020-07-29 10:47:39',
                executionMonitoringEndAt: '2020-07-29 03:53:05',
                error: 6922561671,
                inactive: 1892868057,
                successful: 9049469473,
                stopped: 6430607873,
                unknown: 2664996609,
                unregistered: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnregistered must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'f8yq9wk6vw56q2dno5z5nwkv2alyujsqsuif31dp89iuwu5v4m',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'e006az720wva9smfqrri',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 17:47:38',
                executionMonitoringStartAt: '2020-07-30 00:52:04',
                executionMonitoringEndAt: '2020-07-29 12:47:31',
                error: 6098369869,
                inactive: 5734895229,
                successful: 6266328046,
                stopped: 3822793526,
                unknown: 8149165334,
                unregistered: 6475033405,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '5802pzgox5gg3xlopm9pmynq8434q4kmga2yejhbtv1zfxhk77',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'jdmw7t7kmch2pk275lii',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 05:01:55',
                executionMonitoringEndAt: '2020-07-29 17:21:17',
                error: 9022992096,
                inactive: 4030600343,
                successful: 8636196943,
                stopped: 7120368738,
                unknown: 3723403698,
                unregistered: 8878649763,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'giu0zmxxc59prtxvgop8budxl821ho51ml4hcllpbfsskxi7ou',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: '2zxobw77azk6tvdgp9q2',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:11:50',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 19:50:28',
                error: 6082781496,
                inactive: 1694767377,
                successful: 7292035549,
                stopped: 3055052335,
                unknown: 8976351468,
                unregistered: 3996636388,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: 'otdhg9ga21qcf1di8owat6anh300cxqnkf0tv0met3blu11jm3',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: '9fk700erwzo1ui1yhauh',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:43:05',
                executionMonitoringStartAt: '2020-07-30 02:06:52',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 4524299734,
                inactive: 4168838873,
                successful: 4191957896,
                stopped: 9386542246,
                unknown: 3738042924,
                unregistered: 1701268578,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '7zi03u8wn330e2njl4ym45y2ancrlmenvqh23sx9r7wra39smj',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'i4la3rkki1kfz4d1w5oj',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 16:08:26',
                executionMonitoringStartAt: '2020-07-29 04:43:34',
                executionMonitoringEndAt: '2020-07-29 14:44:02',
                error: 5998996190,
                inactive: 5099671289,
                successful: 5387754407,
                stopped: 5771783478,
                unknown: 2845870293,
                unregistered: 8028498543,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '7d169d42-fce1-406d-add2-1230cebaa87b'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'f5f06c18-eccd-4e4f-b374-29cc80bcb107'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f5f06c18-eccd-4e4f-b374-29cc80bcb107'));
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/b21c16b3-e0ae-4e0b-9d30-b91e10c4b901')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/f5f06c18-eccd-4e4f-b374-29cc80bcb107')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f5f06c18-eccd-4e4f-b374-29cc80bcb107'));
    });

    test(`/REST:GET bplus-it-sappi/channels-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '63b2aa14-2c55-4f24-8b24-82f9116706f9',
                tenantId: '81225909-3bf9-4cec-b045-50d4efd87151',
                tenantCode: 'dz25weg4smfzdt104tlfy7klesys20l5xhubbatxcpbra8djft',
                systemId: 'bae91cd4-4392-4090-86a9-88e95bdbe815',
                systemName: 'g52ih0ap7f85wykqxof5',
                executionId: '1d539067-0d4b-464f-b1d4-be7d552a6d66',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:03:54',
                executionMonitoringStartAt: '2020-07-30 00:39:51',
                executionMonitoringEndAt: '2020-07-29 16:52:00',
                error: 4358083278,
                inactive: 9350463234,
                successful: 3867856383,
                stopped: 3132297697,
                unknown: 9374293757,
                unregistered: 3629504246,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                tenantCode: '7tbbj4aocvygl00tnxjunq6k9syvgii3n907ywnqy5ocvfk2n4',
                systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                systemName: 'c1xqsttlz1mufbk618v6',
                executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:10:29',
                executionMonitoringStartAt: '2020-07-29 08:21:33',
                executionMonitoringEndAt: '2020-07-29 22:07:54',
                error: 4108111608,
                inactive: 1693435341,
                successful: 9168383926,
                stopped: 5178307171,
                unknown: 4929011283,
                unregistered: 2315964952,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f5f06c18-eccd-4e4f-b374-29cc80bcb107'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/36cdb42e-b4f3-44c5-91b9-6b1311b99f9a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/f5f06c18-eccd-4e4f-b374-29cc80bcb107')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannelOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelOverviewInput!)
                    {
                        bplusItSappiCreateChannelOverview (payload:$payload)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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

    test(`/GraphQL bplusItSappiCreateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelOverviewInput!)
                    {
                        bplusItSappiCreateChannelOverview (payload:$payload)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '8d30c0eb-e58e-4ae8-9d8e-b797ff750b1a',
                        tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                        tenantCode: '0472clvn2y5exk9yl4th5oglzw8ssy3suc9dolyhffmjib8omx',
                        systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                        systemName: 'pq5oras7lh527ypi49hh',
                        executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-30 01:10:30',
                        executionMonitoringStartAt: '2020-07-30 01:40:15',
                        executionMonitoringEndAt: '2020-07-29 16:54:37',
                        error: 4207308855,
                        inactive: 8876008095,
                        successful: 2806956504,
                        stopped: 6727619646,
                        unknown: 4584891390,
                        unregistered: 2742431601,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '8d30c0eb-e58e-4ae8-9d8e-b797ff750b1a');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannelsOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannelsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelOverview (query:$query)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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
                            value   : '2c55aa03-c593-483c-b75f-99c188ccf357'
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

    test(`/GraphQL bplusItSappiFindChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannelOverview (query:$query)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
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
                            value   : 'f5f06c18-eccd-4e4f-b374-29cc80bcb107'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('f5f06c18-eccd-4e4f-b374-29cc80bcb107');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelOverviewById (id:$id)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f484e951-eaea-4a7b-94bd-e517b9080c1b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelOverviewById (id:$id)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('f5f06c18-eccd-4e4f-b374-29cc80bcb107');
            });
    });

    test(`/GraphQL bplusItSappiGetChannelsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannelsOverview (query:$query)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannelsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannelOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelOverviewInput!)
                    {
                        bplusItSappiUpdateChannelOverview (payload:$payload)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a2a47de5-1ba6-4f23-a1bc-115e8fe82fac',
                        tenantId: '42a9d1e7-7655-433b-b3e5-a71289d3629f',
                        tenantCode: 'fl1kjmx8d7wisaa1249quws7583ddvsznefg1yyyfe6qhc6102',
                        systemId: 'fc79f982-6c64-42c8-8377-346ad7aa13d6',
                        systemName: '2x67a7ppiddp7bxzasje',
                        executionId: '80a15d7d-df31-444a-8f1d-530d7e7476d2',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 20:21:07',
                        executionMonitoringStartAt: '2020-07-29 11:16:41',
                        executionMonitoringEndAt: '2020-07-29 07:08:35',
                        error: 3387184819,
                        inactive: 3628806169,
                        successful: 7484040407,
                        stopped: 7853595697,
                        unknown: 3607493604,
                        unregistered: 5918546928,
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

    test(`/GraphQL bplusItSappiUpdateChannelOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelOverviewInput!)
                    {
                        bplusItSappiUpdateChannelOverview (payload:$payload)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107',
                        tenantId: '6cc2a7bc-aca9-4586-b94c-4f989082a67c',
                        tenantCode: '8y9lifo1w7lgp0bqe9bpubtrz3d0gmdp3xwg2yih1atct9f6n3',
                        systemId: '970331ec-6c9d-4504-af90-5f2b729fff75',
                        systemName: 'fgtums49pvbjk7alsyn0',
                        executionId: '945d6dc8-bc86-43df-ad8a-05cfcf4c7e38',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 18:42:19',
                        executionMonitoringStartAt: '2020-07-29 08:08:34',
                        executionMonitoringEndAt: '2020-07-29 04:02:40',
                        error: 5913330067,
                        inactive: 8853377920,
                        successful: 5707796973,
                        stopped: 5667024232,
                        unknown: 3672705735,
                        unregistered: 5083863615,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('f5f06c18-eccd-4e4f-b374-29cc80bcb107');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelOverviewById (id:$id)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '80df8073-46b5-4424-9205-cca9909df4f2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelOverviewById (id:$id)
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
                            error
                            inactive
                            successful
                            stopped
                            unknown
                            unregistered
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f5f06c18-eccd-4e4f-b374-29cc80bcb107'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('f5f06c18-eccd-4e4f-b374-29cc80bcb107');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});