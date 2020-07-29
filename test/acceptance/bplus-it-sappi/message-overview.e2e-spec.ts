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
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'm4z0jahjfuwnfu7i50lg4my4vg7mdae79235qltovoij84bik0',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '4muoqog82igh08ldksah',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:01:29',
                executionMonitoringStartAt: '2020-07-28 18:41:39',
                executionMonitoringEndAt: '2020-07-29 02:34:00',
                numberMax: 9916282719,
                numberDays: 6229086183,
                success: 9180086798,
                cancelled: 4172277729,
                delivering: 5134686112,
                error: 9699155762,
                holding: 8422976240,
                toBeDelivered: 4967271801,
                waiting: 8776540930,
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
                
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '472u7opnj4utaackv3nmwwaw1tv8f4jubrt0azlcips1xiquwm',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'xqoi4r18h1y094o1ll34',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:33:28',
                executionMonitoringStartAt: '2020-07-28 18:11:52',
                executionMonitoringEndAt: '2020-07-29 00:43:12',
                numberMax: 8133435835,
                numberDays: 2406923651,
                success: 4818959832,
                cancelled: 6007450119,
                delivering: 8804376628,
                error: 5453829716,
                holding: 1188892583,
                toBeDelivered: 3196818524,
                waiting: 5934469276,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: null,
                tenantCode: 'qxz9a9jac8wlloombzg13wafy228cmwm6byispoh55voefeez0',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '5h1uubzlq4jjig7e8fm9',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:22:26',
                executionMonitoringStartAt: '2020-07-28 22:40:12',
                executionMonitoringEndAt: '2020-07-28 15:38:15',
                numberMax: 9510882252,
                numberDays: 1830053222,
                success: 8593051764,
                cancelled: 4079939406,
                delivering: 7957961612,
                error: 8327419796,
                holding: 1883421045,
                toBeDelivered: 9855142278,
                waiting: 3057984781,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                
                tenantCode: '02e1ci0a1bhl3y152f9u03zhmihvxov3m87zoc7cgaw39qpw9w',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'amt7kk61jvlq6qfmolu5',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:41:27',
                executionMonitoringStartAt: '2020-07-28 18:55:48',
                executionMonitoringEndAt: '2020-07-29 00:58:47',
                numberMax: 9593828852,
                numberDays: 3185863765,
                success: 1923882402,
                cancelled: 2737897722,
                delivering: 2544146660,
                error: 9422850801,
                holding: 8634644154,
                toBeDelivered: 4091216256,
                waiting: 7049727943,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: null,
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'gd06i4cb9ehikljl0bns',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:48:39',
                executionMonitoringStartAt: '2020-07-28 15:45:23',
                executionMonitoringEndAt: '2020-07-29 01:34:54',
                numberMax: 8723572111,
                numberDays: 3770933575,
                success: 3069088957,
                cancelled: 6450759339,
                delivering: 3828725158,
                error: 5235544597,
                holding: 8398167586,
                toBeDelivered: 8607454422,
                waiting: 6724614731,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '8jh2cidxk6q661mum0w0',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:25:37',
                executionMonitoringStartAt: '2020-07-29 09:28:10',
                executionMonitoringEndAt: '2020-07-29 08:27:18',
                numberMax: 8459291723,
                numberDays: 6841805420,
                success: 1766886907,
                cancelled: 5523237801,
                delivering: 8079681424,
                error: 3470505541,
                holding: 1659756487,
                toBeDelivered: 7930594816,
                waiting: 5860424911,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '9v4zyd9xgwlmbrhyxlc7q6eyr2anu225zagezsaqd6z99g9o43',
                systemId: null,
                systemName: '2v8327knu6l1s9mkfypn',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:27:59',
                executionMonitoringStartAt: '2020-07-29 02:30:34',
                executionMonitoringEndAt: '2020-07-29 09:43:10',
                numberMax: 7094629452,
                numberDays: 6129450923,
                success: 2402030463,
                cancelled: 1529052556,
                delivering: 9787162226,
                error: 2505454032,
                holding: 3740405033,
                toBeDelivered: 2999967022,
                waiting: 9831930160,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '7e2m6vv5i4bl1y1v99rl6khi0k5uq7sbom5lhy1x64mgnemc9g',
                
                systemName: 'fx5aa95o3p4doj3gctvr',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:26:57',
                executionMonitoringStartAt: '2020-07-29 01:16:26',
                executionMonitoringEndAt: '2020-07-28 19:17:27',
                numberMax: 8628681215,
                numberDays: 6627412546,
                success: 3695491532,
                cancelled: 4491942770,
                delivering: 1264176299,
                error: 7681843840,
                holding: 7254769837,
                toBeDelivered: 2805183784,
                waiting: 1520099155,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'ru3z925qy1t431olw98zium89039oell2ttahv3qbmgyyk0lsg',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: null,
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:00:18',
                executionMonitoringStartAt: '2020-07-29 05:49:15',
                executionMonitoringEndAt: '2020-07-29 09:38:29',
                numberMax: 1988233639,
                numberDays: 2207793161,
                success: 5951518449,
                cancelled: 9961536386,
                delivering: 8452513350,
                error: 2916089422,
                holding: 9597842530,
                toBeDelivered: 9418664645,
                waiting: 5620054169,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '4yqk7nk7l33vb0nyl37j6xo0bc9elmh0b2hbkelth9lzfumikm',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:34:49',
                executionMonitoringStartAt: '2020-07-29 00:08:14',
                executionMonitoringEndAt: '2020-07-29 12:25:27',
                numberMax: 8524905436,
                numberDays: 1032702735,
                success: 9804643102,
                cancelled: 8350652996,
                delivering: 8425024000,
                error: 1576620297,
                holding: 9243983083,
                toBeDelivered: 7448883738,
                waiting: 3715068288,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'oz4w0oejq3wawf9h9lpy2g7fnzfvah42rhzec71jnhrt90bd64',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'xbvil4f6mn44o8kt7u32',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:41:13',
                executionMonitoringStartAt: '2020-07-29 05:54:34',
                executionMonitoringEndAt: '2020-07-28 23:59:29',
                numberMax: 6028871924,
                numberDays: 3528398196,
                success: 1026988153,
                cancelled: 5902858994,
                delivering: 2719349334,
                error: 6584376491,
                holding: 8430314947,
                toBeDelivered: 3296583587,
                waiting: 6315038583,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '99g39tc0mzl039pla8n96co4cpf88kv0bk08l6uacog19x8uvs',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'dg7rjwkrndkzfsb5s2yh',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:35:07',
                executionMonitoringStartAt: '2020-07-29 09:39:28',
                executionMonitoringEndAt: '2020-07-29 09:24:53',
                numberMax: 8287235073,
                numberDays: 1257105942,
                success: 7677678483,
                cancelled: 5659346006,
                delivering: 7479593103,
                error: 9454966330,
                holding: 7783580757,
                toBeDelivered: 2079776004,
                waiting: 1266992289,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'p1ji6dewfpjpud6lyxmo7w4aafj2m9hcxearsbpfh85tr7g55n',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '89hy6xj1owt4x3nglp7s',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: null,
                executionExecutedAt: '2020-07-29 01:10:37',
                executionMonitoringStartAt: '2020-07-29 05:17:15',
                executionMonitoringEndAt: '2020-07-29 05:32:30',
                numberMax: 9384765588,
                numberDays: 3863470255,
                success: 3447590805,
                cancelled: 4637819416,
                delivering: 7949069158,
                error: 4517724393,
                holding: 5104015647,
                toBeDelivered: 4250924551,
                waiting: 6353342319,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'ud3gd5hgmlz7xl1ld08fwc49kuhy0weruspw76gmxfog9uijt5',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '3dvddjs3jkrhdprezrka',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                
                executionExecutedAt: '2020-07-28 20:30:57',
                executionMonitoringStartAt: '2020-07-29 01:14:17',
                executionMonitoringEndAt: '2020-07-29 05:32:59',
                numberMax: 8857901570,
                numberDays: 4024298027,
                success: 5262593324,
                cancelled: 8545936915,
                delivering: 5418355511,
                error: 8930837467,
                holding: 5808458416,
                toBeDelivered: 6226940861,
                waiting: 4782002117,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'wbabnfbrz2lnq1x2lmvqhodxwpg84phznvmkaekl09ynkefjuy',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '0t4vh7820j42w9myonfu',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 12:26:15',
                executionMonitoringEndAt: '2020-07-28 16:11:05',
                numberMax: 8845515393,
                numberDays: 5895461743,
                success: 7549683973,
                cancelled: 3689188646,
                delivering: 2777396668,
                error: 2810885157,
                holding: 3895951912,
                toBeDelivered: 5677968511,
                waiting: 4682622281,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'qd88h6gmiepz752nyu4qxs6xz9czqrpkgz7lubx9xoq013kjsx',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'r5bpezc5b3mk4vxou7mp',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-28 22:37:12',
                executionMonitoringEndAt: '2020-07-29 12:53:12',
                numberMax: 2306215248,
                numberDays: 7720981468,
                success: 3390556175,
                cancelled: 4793301858,
                delivering: 5405185341,
                error: 4693111596,
                holding: 4929522555,
                toBeDelivered: 5794873001,
                waiting: 7783151195,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '6dzpjps80ueqn3tfav91cnnlhwk8cpkvirifwg6v095cu3r08h',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'knfkd6lwehj2gb9gxogs',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 14:02:48',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 21:18:32',
                numberMax: 4108127164,
                numberDays: 3725228201,
                success: 5178780136,
                cancelled: 1255913032,
                delivering: 8912079463,
                error: 5663493928,
                holding: 4107567926,
                toBeDelivered: 5724263094,
                waiting: 6618677772,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '3vx97x3w2u7of5ti2xxzp4zw9lor7uvha3h0oqitfcdddt7mw1',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'ksixpprhjbfhdein08sh',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:23:02',
                
                executionMonitoringEndAt: '2020-07-28 22:59:15',
                numberMax: 5604070586,
                numberDays: 9635925081,
                success: 6140661605,
                cancelled: 1631262679,
                delivering: 5680223017,
                error: 6243094214,
                holding: 7165265289,
                toBeDelivered: 5761850910,
                waiting: 6693057876,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'w5gzbzx71pukl8mpdj7s68v1fck8dc4zs7g5q3vvslb3l796jq',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'vak2svdwymzn12yzrw8z',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 09:33:55',
                executionMonitoringStartAt: '2020-07-29 10:15:14',
                executionMonitoringEndAt: null,
                numberMax: 4117919382,
                numberDays: 2087379768,
                success: 1679219363,
                cancelled: 3547916466,
                delivering: 5334394113,
                error: 5442519512,
                holding: 9583927092,
                toBeDelivered: 7300784947,
                waiting: 5531012538,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'g5hi8p86b1wlgjzg7e1lbg3g8gw3naw5eg9sjts4bvn1tz306v',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '77cfagfi9aq6ntnfj955',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:57:06',
                executionMonitoringStartAt: '2020-07-29 10:20:50',
                
                numberMax: 7643849511,
                numberDays: 3299849530,
                success: 4295067623,
                cancelled: 4890789273,
                delivering: 6337212537,
                error: 9174416140,
                holding: 9955537029,
                toBeDelivered: 6901320845,
                waiting: 8960450598,
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
                id: '7h1js6cdym8ujjd7zv41my8p63ecf4zenklrd',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '1ui6p6fn2ww6n1qn2uh0ixpjoiw9aaru4pojy6m2qh66zxofcb',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'f2xlztvjdl57kfxyho2j',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:30:40',
                executionMonitoringStartAt: '2020-07-29 14:05:26',
                executionMonitoringEndAt: '2020-07-29 03:37:36',
                numberMax: 7170733080,
                numberDays: 7866127498,
                success: 1874976764,
                cancelled: 2610757668,
                delivering: 6632141399,
                error: 1724768633,
                holding: 2917660900,
                toBeDelivered: 5744535541,
                waiting: 8376208237,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'muwyzn0itdx6hlcjq2zomwtda3u4n63ocsqn7',
                tenantCode: 'rbwvp5zp2rfjq4uf1le8th8ghfky18v2jhbwc5euu1q6ozculn',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'qoggxchaih8uc3lta2hq',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 02:14:45',
                executionMonitoringStartAt: '2020-07-29 14:44:02',
                executionMonitoringEndAt: '2020-07-28 23:25:54',
                numberMax: 9568790148,
                numberDays: 2261114017,
                success: 6459006982,
                cancelled: 6593428419,
                delivering: 5921669608,
                error: 3817886163,
                holding: 5613484635,
                toBeDelivered: 6393910839,
                waiting: 4073522176,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '7mihe5urmd4yf3cknx40x8cv0a9igfocnyobk4t4jsigk388yv',
                systemId: 'zc8p3x4jsegxqvbix05f83uso2ndcy3bxo3h8',
                systemName: '1c8e7xsb2jbps23rw4rz',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:48:00',
                executionMonitoringStartAt: '2020-07-29 03:07:49',
                executionMonitoringEndAt: '2020-07-29 11:17:40',
                numberMax: 2286858182,
                numberDays: 3556450597,
                success: 8498583855,
                cancelled: 6713950900,
                delivering: 3823638843,
                error: 3606406271,
                holding: 7216336607,
                toBeDelivered: 5213749881,
                waiting: 2829938118,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'xsg1hqibd5krwbus0iw7pj1gvinrd6tw4f6837iid5vrum43nv',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'k5bne97krvptgdsz2pzi',
                executionId: 'vfyg8sqxl7x33xj3lwkw8keppf1tvgo5d6kxh',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:13:12',
                executionMonitoringStartAt: '2020-07-29 08:40:58',
                executionMonitoringEndAt: '2020-07-28 18:54:27',
                numberMax: 1595468884,
                numberDays: 9092591801,
                success: 4419155159,
                cancelled: 6997802569,
                delivering: 2343517346,
                error: 1530081228,
                holding: 5762529984,
                toBeDelivered: 7674462782,
                waiting: 2818991579,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'pd24z86flz3eeh8ntax8tz7umuvzh39eaqaj32f5pmzgzmkbv7p',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '4i6vmfa12vsbe6b3dpoj',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 14:28:50',
                executionMonitoringStartAt: '2020-07-28 18:07:26',
                executionMonitoringEndAt: '2020-07-29 09:31:15',
                numberMax: 3324363160,
                numberDays: 7726272957,
                success: 6565811572,
                cancelled: 2921929458,
                delivering: 6899074618,
                error: 5297847184,
                holding: 3449405712,
                toBeDelivered: 7220674162,
                waiting: 3089164882,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '7yoyvdvm8s0yzjzhafvl02gqoawzkfwpmssl21a36tvdim2w94',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'mbb4rs2si1sl7ln6tyb4u',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:58:58',
                executionMonitoringStartAt: '2020-07-29 12:06:35',
                executionMonitoringEndAt: '2020-07-29 08:37:32',
                numberMax: 9486813548,
                numberDays: 7701705843,
                success: 2573501167,
                cancelled: 1983544091,
                delivering: 6778764150,
                error: 2183148807,
                holding: 2709008857,
                toBeDelivered: 8801413917,
                waiting: 9162337563,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'fkzz8h83xh8lrazkmnu4i0ujhes1hngzgje5edzpodc71e6ps5',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '4dwox61h4lfuooox24xb',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:12:04',
                executionMonitoringStartAt: '2020-07-28 20:37:49',
                executionMonitoringEndAt: '2020-07-29 03:07:04',
                numberMax: 97206012803,
                numberDays: 5346861820,
                success: 2571666933,
                cancelled: 8671724540,
                delivering: 4358667128,
                error: 2235915405,
                holding: 4557332384,
                toBeDelivered: 5504542346,
                waiting: 6405332969,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '8j75n4zp8s2y1vt5yactgnb78mfuvc93w4s9xuxo8g5ed7aq1q',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'cccpxpr2jv8qalkq0xwa',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:55:33',
                executionMonitoringStartAt: '2020-07-28 18:18:24',
                executionMonitoringEndAt: '2020-07-29 11:32:53',
                numberMax: 2779065638,
                numberDays: 47705040204,
                success: 8481387492,
                cancelled: 5465735052,
                delivering: 9878634699,
                error: 6063836894,
                holding: 7104569052,
                toBeDelivered: 6344984510,
                waiting: 4802402871,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '9hpygfpshdv45j29gfv35meguxncoexv6xiheifrttr4acve65',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'lfr4c4kv76jmo151dgz4',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:26:44',
                executionMonitoringStartAt: '2020-07-29 14:39:28',
                executionMonitoringEndAt: '2020-07-29 11:33:20',
                numberMax: 6319349828,
                numberDays: 7336176988,
                success: 50700443788,
                cancelled: 3500034991,
                delivering: 5529862323,
                error: 7912535443,
                holding: 2470648151,
                toBeDelivered: 4974789797,
                waiting: 3163199849,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'k0o4z6olwhd7klvp8jjx2nhy4chbzc0r4sdy0vml9pt84lxaer',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '40zllw3zqjn8d7zvyner',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 02:36:33',
                executionMonitoringStartAt: '2020-07-29 08:38:11',
                executionMonitoringEndAt: '2020-07-29 02:05:19',
                numberMax: 6939116727,
                numberDays: 7950775671,
                success: 2224165892,
                cancelled: 99275493543,
                delivering: 7618494927,
                error: 4601815271,
                holding: 3140892996,
                toBeDelivered: 9008012594,
                waiting: 6175565084,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'szontqk865jtjur4yurqkmujxiqkkynuz7ed9au9719yl8x4tu',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'ereub9jhg19cbk73hw2c',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:10:20',
                executionMonitoringStartAt: '2020-07-29 01:35:00',
                executionMonitoringEndAt: '2020-07-28 17:59:33',
                numberMax: 5286209302,
                numberDays: 8121227259,
                success: 9795489379,
                cancelled: 6330314979,
                delivering: 62582025198,
                error: 9776524764,
                holding: 4685481807,
                toBeDelivered: 3571545196,
                waiting: 2631918257,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '7xi5mrcbgto4jsmbce77r2aukq7jqm738jla08fscnru65bxle',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '5zzo1yzvcvnx3y76id5q',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 17:39:32',
                executionMonitoringStartAt: '2020-07-29 02:57:45',
                executionMonitoringEndAt: '2020-07-29 03:40:38',
                numberMax: 5059880176,
                numberDays: 3411099130,
                success: 9714306921,
                cancelled: 4820443972,
                delivering: 1492236406,
                error: 63383383308,
                holding: 6424240961,
                toBeDelivered: 3166770183,
                waiting: 4649592489,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'i3kkn4572kvahq4h0yhhg80b46q15u903ht0x6xxogf7h144c0',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '1mmh8i3tt7l2i57z05ck',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 19:08:48',
                executionMonitoringStartAt: '2020-07-29 14:43:03',
                executionMonitoringEndAt: '2020-07-29 05:25:19',
                numberMax: 8708602630,
                numberDays: 9794321049,
                success: 9698591414,
                cancelled: 8603628932,
                delivering: 2082696408,
                error: 2708929735,
                holding: 61974652602,
                toBeDelivered: 2960663225,
                waiting: 4873040927,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'gpeeisnu7hhl7i5tsawby0hfgr7yu8v8rswjydlirkgnslswat',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'cl2bznchcj00yatn2aqk',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:49:44',
                executionMonitoringStartAt: '2020-07-29 10:15:50',
                executionMonitoringEndAt: '2020-07-29 04:20:02',
                numberMax: 9408098240,
                numberDays: 8709387643,
                success: 5887590733,
                cancelled: 3430672616,
                delivering: 4982413855,
                error: 3079398695,
                holding: 3048527949,
                toBeDelivered: 19905313289,
                waiting: 8134551443,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'pyegry3nci5q5vu7vslj7odiz5rl94d1abjr785a94nol4ork9',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'wtplir75qjry575t9ezh',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:03:57',
                executionMonitoringStartAt: '2020-07-28 16:15:01',
                executionMonitoringEndAt: '2020-07-28 19:44:05',
                numberMax: 1903422037,
                numberDays: 4390474223,
                success: 1316210386,
                cancelled: 4623224561,
                delivering: 2490243130,
                error: 2942995940,
                holding: 5984482657,
                toBeDelivered: 8801541165,
                waiting: 91433504167,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'mzzxsa2bkxq1v8jvmj5jcd4m25hljyx0q16kzf8w8g6fjrg8kg',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'avqah5gv60wzy5pvc24h',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:58:27',
                executionMonitoringStartAt: '2020-07-29 04:37:00',
                executionMonitoringEndAt: '2020-07-28 16:22:52',
                numberMax: -9,
                numberDays: 4479968546,
                success: 5247514100,
                cancelled: 1905420438,
                delivering: 8743780691,
                error: 5015843803,
                holding: 8388725682,
                toBeDelivered: 5195202179,
                waiting: 3371027599,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'hnny25qeqvzy8k58wes9i4tv4mpc9mol0x6kcfxb3b4ytdzsxj',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'z7it09wqr1oif9zjld7m',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:30:46',
                executionMonitoringStartAt: '2020-07-28 23:51:33',
                executionMonitoringEndAt: '2020-07-28 19:33:47',
                numberMax: 6462047075,
                numberDays: -9,
                success: 7427586512,
                cancelled: 3933803971,
                delivering: 2870528380,
                error: 4065728633,
                holding: 8955268324,
                toBeDelivered: 7389487508,
                waiting: 5600433527,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'vkk5bj01l02qxosr9gesdls9onzlhe7ek62o3lbvx1sxtiwowo',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'x8yn5ce3ih8b1c4evvih',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:48:21',
                executionMonitoringStartAt: '2020-07-28 15:42:59',
                executionMonitoringEndAt: '2020-07-28 23:10:47',
                numberMax: 7389796281,
                numberDays: 7346176744,
                success: -9,
                cancelled: 3860625602,
                delivering: 2759445260,
                error: 1769896408,
                holding: 6154156134,
                toBeDelivered: 3424792870,
                waiting: 4929205241,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 's4lqmwo047balguo8lst8zdsgizks21vlwse5gr8ak5j43pah4',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'ccsswd4jpy3bflrdcz0j',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:53:37',
                executionMonitoringStartAt: '2020-07-29 07:54:03',
                executionMonitoringEndAt: '2020-07-29 00:27:12',
                numberMax: 5381374718,
                numberDays: 8202855502,
                success: 3994518036,
                cancelled: -9,
                delivering: 9497884472,
                error: 8754968431,
                holding: 2669743786,
                toBeDelivered: 1873683365,
                waiting: 6019865455,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '7a9u92mwl34grpkn73tha56rev42eoaf2im62xjfoanrzt9hh3',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'zqo2f0vhsc3pd077hss6',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:48:58',
                executionMonitoringStartAt: '2020-07-29 06:17:39',
                executionMonitoringEndAt: '2020-07-29 04:38:46',
                numberMax: 7060550762,
                numberDays: 7740202241,
                success: 8020371850,
                cancelled: 1482835666,
                delivering: -9,
                error: 1949786108,
                holding: 6215666485,
                toBeDelivered: 9846483720,
                waiting: 8380650363,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'nyfr4mr6m5s4fl0zx5dftficte34aw2xmlw28wvqcnj7ji4muk',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'h2r1fn0vjkfqfyapmr2j',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:08:56',
                executionMonitoringStartAt: '2020-07-28 18:21:37',
                executionMonitoringEndAt: '2020-07-29 01:00:51',
                numberMax: 6323129572,
                numberDays: 5126146249,
                success: 7603351135,
                cancelled: 7544355523,
                delivering: 4303674010,
                error: -9,
                holding: 5173573626,
                toBeDelivered: 8988530164,
                waiting: 6292136801,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '0sjq40ukl6o344h105a5pg2uhbfuajod8iyayn120rd133l33l',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'a2nrl7n366jcqj2j6psj',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:08:29',
                executionMonitoringStartAt: '2020-07-29 13:45:47',
                executionMonitoringEndAt: '2020-07-29 04:45:37',
                numberMax: 1255773656,
                numberDays: 8376007592,
                success: 1250965520,
                cancelled: 2348857100,
                delivering: 4590251864,
                error: 4673280050,
                holding: -9,
                toBeDelivered: 8231867180,
                waiting: 1857619961,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '7bpneh0oo0836qu2pfxub43dljy63bsrbn9p096d5ty9lmftbi',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '5c25y5njvyed0wo0e85z',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:47:52',
                executionMonitoringStartAt: '2020-07-28 18:00:04',
                executionMonitoringEndAt: '2020-07-28 19:30:13',
                numberMax: 3774496057,
                numberDays: 9651846330,
                success: 5133828904,
                cancelled: 8099811866,
                delivering: 6228387288,
                error: 9771731828,
                holding: 9032273510,
                toBeDelivered: -9,
                waiting: 9964892980,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'lacvaggiznxgswgwi3hxe1rf53xhqjd5bid94jcc2xvvkx0dak',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'ls3s9lkirqjc7yaik85j',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:50:16',
                executionMonitoringStartAt: '2020-07-29 08:05:42',
                executionMonitoringEndAt: '2020-07-29 12:38:58',
                numberMax: 2040549553,
                numberDays: 3832605160,
                success: 1301780992,
                cancelled: 6844056002,
                delivering: 5952490950,
                error: 7311603235,
                holding: 3861204013,
                toBeDelivered: 2998705824,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '11275lim9968lr3a08jj25rmomnhii6phr46lc6potjnsal9op',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '2kvua3g0b8cjg4h2jn9x',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 08:47:03',
                executionMonitoringStartAt: '2020-07-29 12:40:54',
                executionMonitoringEndAt: '2020-07-28 15:54:56',
                numberMax: 4659119970,
                numberDays: 8796217675,
                success: 5314501439,
                cancelled: 4033289728,
                delivering: 5267668486,
                error: 7819700884,
                holding: 5067330496,
                toBeDelivered: 8821310457,
                waiting: 3110839081,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: 'a6zkm89jvt0htqub8dnyr9qb4oe0zdcduw91asog4r4mjvlp1k',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: '61gjf30xlfezxzf25fve',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 04:06:46',
                executionMonitoringEndAt: '2020-07-28 21:49:43',
                numberMax: 4153635812,
                numberDays: 7103909575,
                success: 5195543005,
                cancelled: 2496251994,
                delivering: 5031503041,
                error: 2756489005,
                holding: 1530967197,
                toBeDelivered: 3170049800,
                waiting: 6862723733,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '0xjt6hu5wpmu0guedufa4rnih2wm7l2i8jlnk00c8n62ukz0up',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'a1f5n10jescy3uc7vaj5',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:49:07',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 15:16:01',
                numberMax: 2111865908,
                numberDays: 5274509860,
                success: 7539967863,
                cancelled: 1651491207,
                delivering: 1537349092,
                error: 9405626718,
                holding: 5210161129,
                toBeDelivered: 2438431882,
                waiting: 9752706396,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '8cerqvhefyqmin1j6ot41rj6merbm48qxrxm9ao16q5fkkj9ke',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'f3klmf13kdlg778wnyvx',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:04:42',
                executionMonitoringStartAt: '2020-07-29 00:09:06',
                executionMonitoringEndAt: 'XXXXXXXX',
                numberMax: 4669596620,
                numberDays: 5905271970,
                success: 8698693276,
                cancelled: 3768956078,
                delivering: 1010109331,
                error: 9887711676,
                holding: 7073914149,
                toBeDelivered: 5021809483,
                waiting: 4369931167,
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
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '5fr7451qr285n2st8p88whmxbcxapg1c0ef54ttpztmywfzlhs',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'h35cbzqk9q6wb665157b',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:04:27',
                executionMonitoringStartAt: '2020-07-29 06:28:51',
                executionMonitoringEndAt: '2020-07-29 05:19:39',
                numberMax: 5596960128,
                numberDays: 5205229361,
                success: 6268320249,
                cancelled: 6624488761,
                delivering: 9765504069,
                error: 6913336189,
                holding: 5470454052,
                toBeDelivered: 6058466330,
                waiting: 9537224540,
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
                        value   : 'ed8d0617-c547-4ab5-96be-ade84203b32b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ed8d0617-c547-4ab5-96be-ade84203b32b'));
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
            .get('/bplus-it-sappi/message-overview/ed8d0617-c547-4ab5-96be-ade84203b32b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ed8d0617-c547-4ab5-96be-ade84203b32b'));
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
                
                id: '6c417772-76dc-4b4a-b2e9-0fb9338feb78',
                tenantId: 'e3102cac-a6fb-40fd-a8dd-5dfffa32df38',
                tenantCode: 'uzjb4ap632lc9jt1daowasmqo23hne0mwkmn1o0p1kxngxdtxq',
                systemId: '4bea8cf7-87da-4983-9fad-2339178d687e',
                systemName: 'sir8zv17jc22pyiflha1',
                executionId: '66e34cd2-69ae-4a8e-9a53-cae326445d22',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:07:37',
                executionMonitoringStartAt: '2020-07-29 02:38:53',
                executionMonitoringEndAt: '2020-07-29 06:30:39',
                numberMax: 6323950235,
                numberDays: 7464022912,
                success: 2998812300,
                cancelled: 6584107116,
                delivering: 4682714613,
                error: 5765901802,
                holding: 8120132128,
                toBeDelivered: 5897919412,
                waiting: 5261844754,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/message-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/message-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                tenantCode: '8mgzrf15pjsz8xc2cg2ieyd98woij9rkrjxzivxqytfalrolm8',
                systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                systemName: 'wb4jcbj1kk0j854qs9o5',
                executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 16:34:32',
                executionMonitoringStartAt: '2020-07-29 12:21:36',
                executionMonitoringEndAt: '2020-07-29 00:01:13',
                numberMax: 3473881395,
                numberDays: 7937323059,
                success: 2166429007,
                cancelled: 6820309080,
                delivering: 5589291836,
                error: 3659819012,
                holding: 8311907981,
                toBeDelivered: 6069531764,
                waiting: 4656248089,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ed8d0617-c547-4ab5-96be-ade84203b32b'));
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
            .delete('/bplus-it-sappi/message-overview/ed8d0617-c547-4ab5-96be-ade84203b32b')
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
                        id: '43b98490-864e-489a-bca5-782a4064e8a8',
                        tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                        tenantCode: 'i24lrimxwgr0j0w1td5fegtabfprfol951jvf5u2uf07l1otfq',
                        systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                        systemName: '2o7pkmx0y2bwt8754t2j',
                        executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 14:26:38',
                        executionMonitoringStartAt: '2020-07-29 10:24:06',
                        executionMonitoringEndAt: '2020-07-28 23:27:13',
                        numberMax: 8004171512,
                        numberDays: 6049003512,
                        success: 9030831703,
                        cancelled: 2216931412,
                        delivering: 5522466477,
                        error: 8614954985,
                        holding: 4787727810,
                        toBeDelivered: 9165182139,
                        waiting: 8550068974,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateMessageOverview).toHaveProperty('id', '43b98490-864e-489a-bca5-782a4064e8a8');
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
                            value   : 'ed8d0617-c547-4ab5-96be-ade84203b32b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverview.id).toStrictEqual('ed8d0617-c547-4ab5-96be-ade84203b32b');
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
                    id: 'ed8d0617-c547-4ab5-96be-ade84203b32b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindMessageOverviewById.id).toStrictEqual('ed8d0617-c547-4ab5-96be-ade84203b32b');
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
                        
                        id: '5c0f0d08-eb57-4f91-9e92-f05dcdd87bf0',
                        tenantId: 'd02f3c5a-2156-4225-8972-e5c53872eeb4',
                        tenantCode: 'wk2kg8c5dvqlosubxorfmv2udaqgx1s70pzz2dudua35xeesll',
                        systemId: '20f79e92-8c39-4b28-af90-e53b93e22b44',
                        systemName: 'x4fie1et1mim2ffkkmsj',
                        executionId: 'a4b4a692-77c1-4973-b336-54555418eb85',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 02:51:10',
                        executionMonitoringStartAt: '2020-07-29 14:43:25',
                        executionMonitoringEndAt: '2020-07-29 06:27:01',
                        numberMax: 1032167703,
                        numberDays: 5710399558,
                        success: 7083416510,
                        cancelled: 5108203678,
                        delivering: 4156641900,
                        error: 4766359265,
                        holding: 8933607152,
                        toBeDelivered: 1319605067,
                        waiting: 5941518845,
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
                        
                        id: 'ed8d0617-c547-4ab5-96be-ade84203b32b',
                        tenantId: 'df7ac283-907c-463a-bb8b-21f60c44914a',
                        tenantCode: '8nmmhv47r80az9lbjyzdo85xodbm11h4hd1c8tzd1jc11zbd9v',
                        systemId: 'ef90f79c-7271-426d-9c2a-cf938155a686',
                        systemName: '0dyh1bq2p5uga5bt4lv6',
                        executionId: 'c587752e-b81d-4bba-86a0-593aec63dd0b',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 18:27:58',
                        executionMonitoringStartAt: '2020-07-29 04:08:09',
                        executionMonitoringEndAt: '2020-07-29 01:41:35',
                        numberMax: 4719009366,
                        numberDays: 8233185142,
                        success: 9914053817,
                        cancelled: 5112740804,
                        delivering: 6928426645,
                        error: 9874453441,
                        holding: 7966187735,
                        toBeDelivered: 4977994162,
                        waiting: 4620542094,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateMessageOverview.id).toStrictEqual('ed8d0617-c547-4ab5-96be-ade84203b32b');
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
                    id: 'ed8d0617-c547-4ab5-96be-ade84203b32b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteMessageOverviewById.id).toStrictEqual('ed8d0617-c547-4ab5-96be-ade84203b32b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});