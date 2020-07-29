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
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: '8udp5uaznwwber6gog6ib9gwevwopydxqqa67bc0t6eaynzhc3',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'bar0tx3furvs9ks1dst0',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:00:17',
                executionMonitoringStartAt: '2020-07-29 20:19:14',
                executionMonitoringEndAt: '2020-07-29 21:09:01',
                error: 9983133195,
                inactive: 9937532697,
                successful: 2150422115,
                stopped: 2242135277,
                unknown: 3012979872,
                unregistered: 2196213957,
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
                
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 's7qkd5nsbs6zvlk6uygungwczpin2pdjvm6bc9ftqhj2g2nvlh',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'sxz0ro5nvhd40mhm7op9',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 05:46:02',
                executionMonitoringStartAt: '2020-07-29 16:02:42',
                executionMonitoringEndAt: '2020-07-29 01:06:14',
                error: 1123055696,
                inactive: 9559758923,
                successful: 6138475593,
                stopped: 6000948598,
                unknown: 9732293967,
                unregistered: 9975160100,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: null,
                tenantCode: 'o56s0dbqa0kzu4096m9yicqpnb5rtsqbbj04c5ckgy779hy6jt',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'ltwc2sb173386q3nhiro',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:50:12',
                executionMonitoringStartAt: '2020-07-29 16:25:20',
                executionMonitoringEndAt: '2020-07-29 20:12:49',
                error: 6361860367,
                inactive: 3821791464,
                successful: 8693606571,
                stopped: 1164167881,
                unknown: 8773633971,
                unregistered: 6236908282,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                
                tenantCode: 'w3scl7c0fxgwkgz25yb0jmujt3nvpcwws8x4jeft0mvok2i3iz',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'bzgc6odm1x9j092z1uo0',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:28:23',
                executionMonitoringStartAt: '2020-07-29 02:20:44',
                executionMonitoringEndAt: '2020-07-29 12:31:44',
                error: 1443301868,
                inactive: 3774846363,
                successful: 4698272886,
                stopped: 1267917410,
                unknown: 4273452856,
                unregistered: 1665152734,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: null,
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'egmsi07nsmj4diitcr8g',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:02:46',
                executionMonitoringStartAt: '2020-07-29 16:54:51',
                executionMonitoringEndAt: '2020-07-29 01:07:35',
                error: 6343913294,
                inactive: 6656821519,
                successful: 1817150197,
                stopped: 1112708253,
                unknown: 8833171263,
                unregistered: 4734990770,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'of2mkcgz13n7nc7c6lae',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 23:24:42',
                executionMonitoringStartAt: '2020-07-29 01:51:29',
                executionMonitoringEndAt: '2020-07-30 00:10:31',
                error: 3532418546,
                inactive: 5713677019,
                successful: 2962005827,
                stopped: 6409249711,
                unknown: 8566964895,
                unregistered: 9709004702,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'zdnu9psyljwzfkv4g8tg3zmnbia0w3zikv4xwusb3owixtsmx0',
                systemId: null,
                systemName: 'h5xq3k8em1lbfjot45pu',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:33:23',
                executionMonitoringStartAt: '2020-07-29 05:24:07',
                executionMonitoringEndAt: '2020-07-29 08:49:29',
                error: 2163546156,
                inactive: 3314686850,
                successful: 8400210436,
                stopped: 7271575592,
                unknown: 7093391801,
                unregistered: 3227929847,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: '75wv703b1h0or55d5097icjzaf0bqigre4n5as6iwhwev4ddph',
                
                systemName: 'farzwj577xwszjokgbh7',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:49:21',
                executionMonitoringStartAt: '2020-07-29 19:45:20',
                executionMonitoringEndAt: '2020-07-29 19:34:38',
                error: 2689402296,
                inactive: 5308631597,
                successful: 1775411993,
                stopped: 5251700486,
                unknown: 9958062656,
                unregistered: 2638692013,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'y6m8tvtefc0txc450usstbr3xux99o2xmouhpzwmhqka6h806g',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: null,
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:35:12',
                executionMonitoringStartAt: '2020-07-29 02:45:52',
                executionMonitoringEndAt: '2020-07-29 19:07:33',
                error: 7589539940,
                inactive: 1646300114,
                successful: 1884581469,
                stopped: 9916147670,
                unknown: 9942762845,
                unregistered: 2013248573,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'p2w8ms083bay8ta1rzy8snnyhg4f6hvohirrckp5m0080uvlft',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:57:23',
                executionMonitoringStartAt: '2020-07-29 10:17:37',
                executionMonitoringEndAt: '2020-07-29 19:08:31',
                error: 2320099867,
                inactive: 3708486558,
                successful: 3161846878,
                stopped: 7539335860,
                unknown: 5272292252,
                unregistered: 9445215322,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'j02krtduhykg9dxpw5xsvlvsr0i0pkqvd2w4t5z9cr817am770',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '422tjjlkt6j0tx445o19',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:16:13',
                executionMonitoringStartAt: '2020-07-29 21:41:24',
                executionMonitoringEndAt: '2020-07-29 16:06:30',
                error: 7758693266,
                inactive: 5301124224,
                successful: 1032988734,
                stopped: 7232699295,
                unknown: 6748820500,
                unregistered: 5296625696,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: '077t4t7bfi25u7b2djsheo2kqheds8dyjukcggj5zrpgpxxtmj',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '4nihto02d5160w7rj8xk',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:15:04',
                executionMonitoringStartAt: '2020-07-29 09:05:52',
                executionMonitoringEndAt: '2020-07-29 05:48:12',
                error: 4247420850,
                inactive: 5181788383,
                successful: 1838763494,
                stopped: 7458253806,
                unknown: 3061719231,
                unregistered: 1942895810,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'fkg8dqqtzgpzzd6y3wk86ytu1aiuex9pjaacgw3bg9oshghlau',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'fg654ob22vem158wrs2r',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: null,
                executionExecutedAt: '2020-07-29 19:01:47',
                executionMonitoringStartAt: '2020-07-29 22:17:50',
                executionMonitoringEndAt: '2020-07-29 03:18:26',
                error: 3273068476,
                inactive: 8741353597,
                successful: 8359331695,
                stopped: 7028939228,
                unknown: 8068619287,
                unregistered: 2060931130,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'bi4mc6bkx24pk6va8tocd0z6djvj5owy51n7a7fiadgwxqy3hv',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'tlesz75n3ut67ylodrup',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                
                executionExecutedAt: '2020-07-29 13:58:00',
                executionMonitoringStartAt: '2020-07-29 11:46:54',
                executionMonitoringEndAt: '2020-07-29 16:56:24',
                error: 4680978624,
                inactive: 5381418509,
                successful: 9589743123,
                stopped: 6401076389,
                unknown: 6722925101,
                unregistered: 7241531000,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'omwmy9ddkfwcrs88h4ijoj4l24bk3jtaz8nlxguhv2ij60z3m0',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'c4j2idhfy0sjo36uneka',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-29 17:48:23',
                executionMonitoringEndAt: '2020-07-29 21:21:28',
                error: 9170126618,
                inactive: 1849142701,
                successful: 1201075511,
                stopped: 8353487157,
                unknown: 3010114950,
                unregistered: 1045377039,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'nxv8saz4xrgg34f55bt0a11550rr9igrx0r8ynzdta8yhqe4gk',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'hqo0h4yt3rqp3gqnp2tx',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 03:15:59',
                executionMonitoringEndAt: '2020-07-29 07:37:11',
                error: 1310191356,
                inactive: 9110780333,
                successful: 3046007092,
                stopped: 1939612980,
                unknown: 2316607381,
                unregistered: 6190383083,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'pmat6bsylqxteskumq0x7icz2edutqvfy6o6asf2r9lg478zq0',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'x5mg9caqcrfwm5bdix8o',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:32:48',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 23:14:15',
                error: 6694560593,
                inactive: 2625920359,
                successful: 8275809799,
                stopped: 9137683781,
                unknown: 4363492745,
                unregistered: 8493156893,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'rd0kr19vybb2dmhaekwrmz9z9zb8n8feqrv10xrnms5k68rxc7',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'y5eejm8lzpbdenu3fllw',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 17:03:55',
                
                executionMonitoringEndAt: '2020-07-29 05:19:56',
                error: 3617961677,
                inactive: 2741388789,
                successful: 2182827732,
                stopped: 9429981231,
                unknown: 9247518217,
                unregistered: 8109003817,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'ob8fnr8aqmtf6cj7yod87ijlxncmrcudfr7g7ket34o8uk7jiw',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '8hdm360bll0daz1jl1g1',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:29:34',
                executionMonitoringStartAt: '2020-07-29 01:17:01',
                executionMonitoringEndAt: null,
                error: 9476870001,
                inactive: 4987649751,
                successful: 3888040470,
                stopped: 3783342696,
                unknown: 1473638484,
                unregistered: 4625808157,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'htn5iiniikd8mgg52p8ajcacf05zsnwsea5d13lq72fcc8v2xb',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '3xtqnb05kp2k65lemedj',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:24:04',
                executionMonitoringStartAt: '2020-07-29 19:47:41',
                
                error: 4121992706,
                inactive: 8102585695,
                successful: 3399986808,
                stopped: 7256588606,
                unknown: 9038608384,
                unregistered: 2336132175,
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
                id: 'h2li9vw4ev08wt66dpx6sfzwt4f0s324y40tr',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'i2jk2szo1ronhwlmjqojv4gg6yn1ndibaawxjtjzjdd4blydit',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '5q77moyt9kzjxp0uldav',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:42:57',
                executionMonitoringStartAt: '2020-07-29 05:16:28',
                executionMonitoringEndAt: '2020-07-29 09:39:29',
                error: 7784190220,
                inactive: 6116646263,
                successful: 3186290491,
                stopped: 3013386882,
                unknown: 9282103458,
                unregistered: 1628155929,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: 'zermndbipe4ksersm29a57be5fmu1ffaiyubi',
                tenantCode: 'lwy7ycgjlx5yo6zshgo0p0bgn67z26wnj4k6dfq6899os26n2a',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'ljez6ohd73qfmem9jwzf',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:37:15',
                executionMonitoringStartAt: '2020-07-29 15:07:46',
                executionMonitoringEndAt: '2020-07-29 07:54:42',
                error: 7370129150,
                inactive: 3241918757,
                successful: 2366779333,
                stopped: 6403471531,
                unknown: 3556857551,
                unregistered: 3527532017,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'enzr2iurjsooaopc4x0uk8yzrzsokbungh10xnkp60x2f1hxaj',
                systemId: '22jcodui3xswz8e3kkbaq7v2hlp6qblkiwh4q',
                systemName: '8p177bjizvz52k6qypuk',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:12:33',
                executionMonitoringStartAt: '2020-07-29 20:49:22',
                executionMonitoringEndAt: '2020-07-29 02:47:33',
                error: 7724769581,
                inactive: 3556912844,
                successful: 7563811030,
                stopped: 4269513744,
                unknown: 6589298158,
                unregistered: 2677401024,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'qj8yncded27uhfsi680cp5wmxsg50l0gqr9wg248otcktk9fc3',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'cazjh7g8o1k8guk7ggj3',
                executionId: 'qnpzombhtp2pq0h6lleh3rcbx1zyx8u3inyff',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:52:48',
                executionMonitoringStartAt: '2020-07-29 15:25:26',
                executionMonitoringEndAt: '2020-07-29 21:49:20',
                error: 8480082262,
                inactive: 3771714336,
                successful: 1616830337,
                stopped: 9984897691,
                unknown: 6433404934,
                unregistered: 5459927913,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'lip3ka6mwmpcu6xcf3trmdqfoho4qyl0ad7agwyb863zchsfab0',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'w8awyu5nsxs2ikvi6vg0',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 19:58:56',
                executionMonitoringStartAt: '2020-07-29 07:58:32',
                executionMonitoringEndAt: '2020-07-29 13:16:44',
                error: 8180233596,
                inactive: 7113829170,
                successful: 6564413188,
                stopped: 4898133072,
                unknown: 6660253151,
                unregistered: 1477697949,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'wjk2ctzzk3199hg6hscrd4uhdkow3q5fr0kawej638rtreib1u',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'ml1969deibd1stzxqyz2z',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 22:08:22',
                executionMonitoringStartAt: '2020-07-29 21:10:45',
                executionMonitoringEndAt: '2020-07-29 09:28:38',
                error: 5235228399,
                inactive: 4471050300,
                successful: 9681426442,
                stopped: 2196633983,
                unknown: 7172482292,
                unregistered: 9398065507,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'c0ueqpd96geltxylqde5lxe1zcuiw0o4g7td34nqcqmx0juqiy',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '7x2wl15z1g22lxykhhfm',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:16:22',
                executionMonitoringStartAt: '2020-07-29 23:54:23',
                executionMonitoringEndAt: '2020-07-29 10:26:24',
                error: 65988678403,
                inactive: 6893587478,
                successful: 8089813289,
                stopped: 4706444890,
                unknown: 3781245760,
                unregistered: 4759048663,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'q1phe7q51vho19993smq1ezfsl10ulovoef1j7uiamvjw5a7bd',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '9s64c1lclvaufyrf02bq',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:57:21',
                executionMonitoringStartAt: '2020-07-29 07:50:10',
                executionMonitoringEndAt: '2020-07-29 04:56:05',
                error: 5336157883,
                inactive: 58916605707,
                successful: 5947757767,
                stopped: 1133799332,
                unknown: 2082899585,
                unregistered: 2185972229,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'nvhv9552l155pxryi53omnqyd43ysyy0mxqtvd8fg4ruheu192',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 't06pv0i1e7urc7u4iqjl',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:52:20',
                executionMonitoringStartAt: '2020-07-29 22:41:27',
                executionMonitoringEndAt: '2020-07-29 11:47:39',
                error: 7491572935,
                inactive: 2730140427,
                successful: 25648368362,
                stopped: 3715468744,
                unknown: 8366972112,
                unregistered: 9841797307,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: '91vaiubztis0e7lykj2i8g709t0hbkzjhqm3g9ltdt7xj44ena',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'oyooj34hvbdf6ed7d3f8',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:50:16',
                executionMonitoringStartAt: '2020-07-30 00:48:05',
                executionMonitoringEndAt: '2020-07-29 09:27:12',
                error: 8712279397,
                inactive: 4521114056,
                successful: 9447481368,
                stopped: 47635050986,
                unknown: 7394760923,
                unregistered: 5503163259,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'p7qledcdi4zoa7x8qhwobk93xdgjagbwu9sxmc4c9px3kc1bfb',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'gakj9q4b5epbdgnu4fvt',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:31:31',
                executionMonitoringStartAt: '2020-07-29 17:08:34',
                executionMonitoringEndAt: '2020-07-29 15:54:00',
                error: 9379082385,
                inactive: 3794426668,
                successful: 2327622136,
                stopped: 3316415968,
                unknown: 29645414286,
                unregistered: 9845510469,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'i85adjx7jdywgjwrhwqijslgi1uzcce4aar7njijo6j46fleg4',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '74alyf4w99uno1ra0pdw',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-30 00:44:31',
                executionMonitoringStartAt: '2020-07-29 16:59:39',
                executionMonitoringEndAt: '2020-07-29 15:14:57',
                error: 8375433966,
                inactive: 5219932055,
                successful: 4700187538,
                stopped: 4958990267,
                unknown: 1595154324,
                unregistered: 88599718506,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'wv5x3lc3tiry1g7lb7kq0yheoy934vw0vfx3lj54h86pqjo5u9',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '6zq90vy4y2clzty4fljj',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:59:43',
                executionMonitoringStartAt: '2020-07-29 02:55:48',
                executionMonitoringEndAt: '2020-07-29 02:19:22',
                error: -9,
                inactive: 7958157484,
                successful: 6666588719,
                stopped: 3788845244,
                unknown: 9441679008,
                unregistered: 9905231394,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'q9v8eedn57f9w21n7r6dc1wb7nzhmr4oh6dvptfpwpopw9jc6n',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '0bs0v9c7t10wjj05nkzk',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 15:17:09',
                executionMonitoringStartAt: '2020-07-29 03:32:22',
                executionMonitoringEndAt: '2020-07-29 11:52:12',
                error: 7345619454,
                inactive: -9,
                successful: 5998978392,
                stopped: 6419132547,
                unknown: 9034178311,
                unregistered: 3448469766,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'hy66s38tzb2vyxnryawolcahc4e3quww0ql7j8n8vi3be9cip6',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'qay425ylgrrw996v1yj9',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:53:10',
                executionMonitoringStartAt: '2020-07-29 21:39:08',
                executionMonitoringEndAt: '2020-07-29 04:12:20',
                error: 2266710266,
                inactive: 4725145532,
                successful: -9,
                stopped: 3465197970,
                unknown: 5145812531,
                unregistered: 1085215061,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'tzwhcw6gyqevtkf9dtg26irhaeej7p4lcr2fcz7pcsjkfwe9ob',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '89x4qyg9f7y9g92lhw3r',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:06:38',
                executionMonitoringStartAt: '2020-07-29 17:29:55',
                executionMonitoringEndAt: '2020-07-29 03:41:57',
                error: 5294803079,
                inactive: 5971992778,
                successful: 2869546632,
                stopped: -9,
                unknown: 2348138994,
                unregistered: 7069176762,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'gudh55jf0by0gloiqrqh00ldttmmyt63n65ppbfnebp3j9tiwh',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'ivgwdubrq01e9yfa25za',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:37:03',
                executionMonitoringStartAt: '2020-07-29 18:29:59',
                executionMonitoringEndAt: '2020-07-29 23:56:21',
                error: 3582671683,
                inactive: 8234037941,
                successful: 1411376360,
                stopped: 7688766744,
                unknown: -9,
                unregistered: 4933317740,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'fo0abhwvwxc9x45qxln3jkjaux7yv2kjzedcg3t74n04mpfcsi',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'ksbfg3bjmmijdpd2jc7j',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 18:54:10',
                executionMonitoringStartAt: '2020-07-29 21:18:13',
                executionMonitoringEndAt: '2020-07-29 08:06:31',
                error: 3255566767,
                inactive: 2251677512,
                successful: 7747600882,
                stopped: 1140591336,
                unknown: 9601190156,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'or57a3hwxcywa8iawtdft1ninn378fragb2rhqbztenw9zi3ye',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'lwvmrvjojhnbaihtk10k',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 22:17:46',
                executionMonitoringStartAt: '2020-07-29 23:45:42',
                executionMonitoringEndAt: '2020-07-29 10:58:57',
                error: 9678506142,
                inactive: 7199780972,
                successful: 6692190305,
                stopped: 7963004778,
                unknown: 1795499680,
                unregistered: 6487997376,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'a62rzo17wyj775vgrev99sv95iouuknijpc9yld1cq4kr9ucmt',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: '0spf2ij4s2a8besrbfri',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 09:27:45',
                executionMonitoringEndAt: '2020-07-29 12:47:38',
                error: 1664528255,
                inactive: 9395059420,
                successful: 9256165600,
                stopped: 7205414694,
                unknown: 5980504702,
                unregistered: 9104090101,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'zv4qd46pvngfd0n7zx7q754tlleu9vzx8t3384ps8aerf6m1cf',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'jsjsqdddrjzwt0rfjog9',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 17:25:45',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 06:09:43',
                error: 6522106781,
                inactive: 9201972366,
                successful: 5179478179,
                stopped: 9875386060,
                unknown: 9701656269,
                unregistered: 6095651680,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'iez8so7rfri8dzqyvxr3q4es1iea4s3ucar02c9hus0dm3r3a2',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'sdi26l46vwo51mv8bpx7',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 12:52:37',
                executionMonitoringStartAt: '2020-07-29 22:09:41',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 2379426958,
                inactive: 6890409313,
                successful: 4995506462,
                stopped: 1697724933,
                unknown: 3204659254,
                unregistered: 7854421546,
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
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: '169kcu7az31ks6q0iyqt4f8ak8grd2uxwkx5qse1susen4qeil',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'e2ju3ufklsdr79vmggjj',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 22:55:38',
                executionMonitoringStartAt: '2020-07-29 13:35:58',
                executionMonitoringEndAt: '2020-07-29 08:46:46',
                error: 7592076970,
                inactive: 9209877558,
                successful: 7754591481,
                stopped: 4331577682,
                unknown: 2315753053,
                unregistered: 1324213031,
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
                        value   : '7c3e4ea2-4c29-447f-a31d-a835689d6302'
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
                        value   : 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24'));
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/ee7ca1e0-138c-4ccd-a249-a906413a92d7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24'));
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
                
                id: '0aab8035-d8e1-4da6-834a-962413f7b612',
                tenantId: '1d78a637-2951-49bf-a857-5411bd01a2fe',
                tenantCode: 'gjq6glujkx293t75axfb8nec4zjyd4pqckw8b85jyiqu0nl5ur',
                systemId: '9d7242f3-d202-498e-bd8f-def73a508d8a',
                systemName: 'uvyvo18xtw6kkl7x7su7',
                executionId: 'f39044bf-95d0-4ddc-8256-7611cb40f2fa',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 15:38:12',
                executionMonitoringStartAt: '2020-07-29 13:15:41',
                executionMonitoringEndAt: '2020-07-29 08:06:18',
                error: 3391187819,
                inactive: 4315881266,
                successful: 7589649637,
                stopped: 4638831209,
                unknown: 3477173022,
                unregistered: 2974701393,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                tenantCode: 'uh6wi7pz6te5yvl6l7kgzj1bzv8v1rla9mwqu9mbllf1y8x9g6',
                systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                systemName: 'qxx3ienm9h6vxs1o59wz',
                executionId: '17309851-16d4-4420-b84c-512674b75230',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:33:32',
                executionMonitoringStartAt: '2020-07-29 15:58:35',
                executionMonitoringEndAt: '2020-07-29 13:41:53',
                error: 3107702678,
                inactive: 2514612661,
                successful: 1126638970,
                stopped: 4368697309,
                unknown: 8621141274,
                unregistered: 5174260675,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/cf9a88ab-9c2c-4bec-872f-c4d0f89d30bc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24')
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
                        id: '7d12653b-c765-40cf-887e-e5b8a4beeee2',
                        tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                        tenantCode: 'dphissslz8mzb1dv64ncoknnkfpikjr1sxjryk7mftgyuz048t',
                        systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                        systemName: 'mmmqckemox9zl8mxr1rg',
                        executionId: '17309851-16d4-4420-b84c-512674b75230',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 15:24:18',
                        executionMonitoringStartAt: '2020-07-29 16:57:37',
                        executionMonitoringEndAt: '2020-07-29 11:02:33',
                        error: 5437957186,
                        inactive: 1067468657,
                        successful: 3950610346,
                        stopped: 1842151696,
                        unknown: 4817791035,
                        unregistered: 2140786791,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '7d12653b-c765-40cf-887e-e5b8a4beeee2');
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
                            value   : '2b2ee86c-f55b-4252-8688-b4df6aa4c454'
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
                            value   : 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24');
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
                    id: '2e0be7d9-e4e5-4285-9f82-8220e175b758'
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
                    id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24');
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
                        
                        id: 'cdf0d86b-3c2b-460a-86dc-2937c53a2e61',
                        tenantId: '4986b9ce-ad6d-40be-a15c-1aac58a07b49',
                        tenantCode: 'i2igb4rbr18b5vcs84b3ka5eqj8drw7c1dy3jnqzyhky6c2rc4',
                        systemId: '5db5fee8-4b28-4afd-a114-a777ba02e836',
                        systemName: '8tm0461u4aylvojmj4ho',
                        executionId: '3d534b18-1952-4a2b-b8cf-72c832eaa92c',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 21:25:47',
                        executionMonitoringStartAt: '2020-07-29 03:44:58',
                        executionMonitoringEndAt: '2020-07-29 19:50:35',
                        error: 8219582174,
                        inactive: 3456971756,
                        successful: 4582218807,
                        stopped: 8721384507,
                        unknown: 9875806489,
                        unregistered: 6423878033,
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
                        
                        id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24',
                        tenantId: '256131d0-740a-4f12-a0df-5219876c219c',
                        tenantCode: '1jfb6b197h8qvuowllr16tm7s9per1cozravzurm0y725fee1h',
                        systemId: 'a532fe88-9706-4f36-a5d6-6343ac08afcb',
                        systemName: 'exmvrsixu8zx0ye8sl2f',
                        executionId: '17309851-16d4-4420-b84c-512674b75230',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 14:43:25',
                        executionMonitoringStartAt: '2020-07-29 05:16:10',
                        executionMonitoringEndAt: '2020-07-29 08:14:22',
                        error: 5983350282,
                        inactive: 5372978041,
                        successful: 9496357323,
                        stopped: 4492442058,
                        unknown: 8135970246,
                        unregistered: 3364758670,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24');
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
                    id: 'f7bb57e7-db2e-408c-ac45-6d4462a8902a'
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
                    id: 'f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('f8a7f292-b4a9-4f0a-9b0a-d8b10950bb24');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});