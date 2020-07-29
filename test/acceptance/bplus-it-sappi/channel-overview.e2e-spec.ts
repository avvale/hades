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
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '8lffhzqub6pat7grlu9dbff3oev90iv4umuekgggtjku106tkg',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '1lrqzht04ysj4de6cyu4',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:02:18',
                executionMonitoringStartAt: '2020-07-28 23:05:45',
                executionMonitoringEndAt: '2020-07-29 09:05:44',
                error: 1387081465,
                inactive: 4671125789,
                successful: 9193859442,
                stopped: 4344562151,
                unknown: 3664795032,
                unregistered: 3651498122,
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
                
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '0s3nzcnyq8ybqyt131o7soltz775ep2tyxavqk03wrgnkl9dwv',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '0m5k0g1amdw5c6864naq',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:55:19',
                executionMonitoringStartAt: '2020-07-29 10:37:43',
                executionMonitoringEndAt: '2020-07-28 19:44:06',
                error: 2655276557,
                inactive: 7394014622,
                successful: 1875953146,
                stopped: 7449270835,
                unknown: 1176447152,
                unregistered: 9961268149,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: null,
                tenantCode: '8zes6ypp64ryiedp290ukbnvxy5wdue7r1q18wuwkcvbm6c36a',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'q35xe8qvrhifpxrf3vx6',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:34:23',
                executionMonitoringStartAt: '2020-07-29 01:12:57',
                executionMonitoringEndAt: '2020-07-28 23:36:46',
                error: 2558303535,
                inactive: 5099547331,
                successful: 1656425907,
                stopped: 2405505694,
                unknown: 3164778746,
                unregistered: 2364404574,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                
                tenantCode: '18i455zvrij963mlfn6dyg3tr7it6n83fsomk4594qudnxmld0',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'lp0qb9ggs4ak3y6jehhd',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:20:29',
                executionMonitoringStartAt: '2020-07-29 06:16:11',
                executionMonitoringEndAt: '2020-07-28 21:44:12',
                error: 5490113486,
                inactive: 9594409103,
                successful: 9174053846,
                stopped: 8121985737,
                unknown: 3243750577,
                unregistered: 7331592833,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: null,
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '5wu0wby6nlxkc7rrh9sl',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 00:52:55',
                executionMonitoringStartAt: '2020-07-28 14:47:16',
                executionMonitoringEndAt: '2020-07-29 00:44:27',
                error: 5285124132,
                inactive: 3782952249,
                successful: 8402427914,
                stopped: 3741661587,
                unknown: 7287874889,
                unregistered: 8398750375,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'w23c1lwl1t519ixqtq79',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:50:59',
                executionMonitoringStartAt: '2020-07-28 18:10:10',
                executionMonitoringEndAt: '2020-07-28 18:57:40',
                error: 6972171888,
                inactive: 1156959203,
                successful: 1714703265,
                stopped: 2742062709,
                unknown: 2402624735,
                unregistered: 7198055725,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'zb0nxy242s5gcuv5r1a18sl4l97pn5o99fpnjyron8stmmfts6',
                systemId: null,
                systemName: '3uxurw5um0vbgfgwbpr1',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:23:24',
                executionMonitoringStartAt: '2020-07-28 22:59:40',
                executionMonitoringEndAt: '2020-07-29 09:57:25',
                error: 9712833583,
                inactive: 4093682076,
                successful: 3991600888,
                stopped: 7508068753,
                unknown: 3026773513,
                unregistered: 9370180236,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '80azn4n0sm9z49uhdn110lhqhebdvkt0ihxwto6vel8u9uwvlv',
                
                systemName: '494jzd2orv245utbu1fa',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 03:15:53',
                executionMonitoringStartAt: '2020-07-29 07:42:53',
                executionMonitoringEndAt: '2020-07-28 23:20:45',
                error: 9079501882,
                inactive: 4152211463,
                successful: 3104903789,
                stopped: 3307399423,
                unknown: 1362535350,
                unregistered: 7241992807,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'pmraimr1adlf6nkgm0uqdz5xzd5of686b702g5al0xpzcescv9',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: null,
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:44:02',
                executionMonitoringStartAt: '2020-07-29 03:53:05',
                executionMonitoringEndAt: '2020-07-28 13:47:57',
                error: 3263955035,
                inactive: 6181906233,
                successful: 1181328955,
                stopped: 5496284510,
                unknown: 6075853020,
                unregistered: 8451967611,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'x1j4nfrotcks7izwjyf5eyta7z6t5ccze09irpt4h4zc3cajiu',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:36:21',
                executionMonitoringStartAt: '2020-07-29 08:03:36',
                executionMonitoringEndAt: '2020-07-29 12:54:15',
                error: 8122212250,
                inactive: 1552996740,
                successful: 6977722752,
                stopped: 3454920636,
                unknown: 5307922273,
                unregistered: 8201661415,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '6x8jti3wwd755z44jeg1cak2ze4j9cnflm5xwfu21r253udl28',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'y5carh3at5sdulsgzldl',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 01:27:15',
                executionMonitoringStartAt: '2020-07-28 17:21:29',
                executionMonitoringEndAt: '2020-07-29 07:15:50',
                error: 7780740520,
                inactive: 6571155022,
                successful: 3926519689,
                stopped: 4873507469,
                unknown: 3033668061,
                unregistered: 1170703640,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '5nqeqwbszsvww11gojb3fpw240okw7pmxhljtbbv0tws1rpw4d',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'd0rvzlz3egl6tpkl4pru',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 18:43:07',
                executionMonitoringStartAt: '2020-07-29 05:13:17',
                executionMonitoringEndAt: '2020-07-28 17:05:45',
                error: 3221941924,
                inactive: 7842138642,
                successful: 4000224225,
                stopped: 4717679017,
                unknown: 4161373204,
                unregistered: 8976162005,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'b8evfcmvloh0a01elr4np3crvnt1lkie309egz4a7xpcaxc2k5',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '49sx1zkcvce0oaea0y1t',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: null,
                executionExecutedAt: '2020-07-28 14:48:27',
                executionMonitoringStartAt: '2020-07-28 18:31:20',
                executionMonitoringEndAt: '2020-07-29 06:19:35',
                error: 5805131532,
                inactive: 7359960535,
                successful: 4912603010,
                stopped: 3160954846,
                unknown: 4710857879,
                unregistered: 7800594598,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'm8wbp9fdh3qwwqbzzsszqsba7nrogft60zqxrfbd0hclrzpur2',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'bg899clh3kfz73kv1hdz',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                
                executionExecutedAt: '2020-07-29 02:35:18',
                executionMonitoringStartAt: '2020-07-29 07:30:25',
                executionMonitoringEndAt: '2020-07-29 12:52:26',
                error: 7272480003,
                inactive: 8693938728,
                successful: 4661365511,
                stopped: 1238793532,
                unknown: 8618508626,
                unregistered: 4696187787,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'ogb4r6q6tp96946onc3t4q6tyatfrq6hmd7qlhjqx762wnbyqt',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'rqvdszoarf4y19ra3w34',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 19:02:04',
                executionMonitoringEndAt: '2020-07-28 14:08:32',
                error: 8446524142,
                inactive: 5147831160,
                successful: 1795716668,
                stopped: 1103790096,
                unknown: 3325723414,
                unregistered: 9802844289,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'xoi1vuuy63vcm98j2g3xfla5yiuqawy3lt201bbqfzrackfc6h',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'tvnnl3qsk41nkevx1gsa',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 06:09:51',
                executionMonitoringEndAt: '2020-07-29 11:06:24',
                error: 6126938630,
                inactive: 1191818504,
                successful: 1614343369,
                stopped: 9063701925,
                unknown: 3739742104,
                unregistered: 9876407382,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '4mo8snss4aewyzjqo2ca12wxexou32ckcbr6yml4hs8odlm85o',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '5ntajazscdccs2telkn8',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 14:17:18',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-28 16:10:30',
                error: 8875310800,
                inactive: 7830788425,
                successful: 4636200240,
                stopped: 3578944958,
                unknown: 1969050155,
                unregistered: 1835244468,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'xfe3tscm2gcetvl4t8cim1wk0qjqzelwvoruk21ufxhn5362ni',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'xkislydi4p2xux8tlk9m',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:35:49',
                
                executionMonitoringEndAt: '2020-07-28 22:54:36',
                error: 1785381968,
                inactive: 9520697942,
                successful: 4636225178,
                stopped: 4503666599,
                unknown: 4221684259,
                unregistered: 8867074507,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '1z9ks0l1tckqs5zzqpo5x1k6v73qajp2b99pbqfxsnemhmioty',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '5yf2izvdryx07dy3382s',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 03:01:52',
                executionMonitoringStartAt: '2020-07-28 18:34:45',
                executionMonitoringEndAt: null,
                error: 4365738932,
                inactive: 5424349960,
                successful: 3332165048,
                stopped: 7476675959,
                unknown: 8206266512,
                unregistered: 3528407072,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'dv9xmo44z3h38hvix6kfvzcvpq4l7ybgtaw3pd76sohtjqucpd',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '3whyasqx4hw31o88mzb7',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 10:45:08',
                executionMonitoringStartAt: '2020-07-28 20:53:52',
                
                error: 9430010975,
                inactive: 8499080196,
                successful: 8131441170,
                stopped: 5059906819,
                unknown: 2221335941,
                unregistered: 9442324363,
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
                id: 'o8laj8jqxljnvlw2srwuap37htg4bsbzx7qza',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'x6zmw3vhgsfosxq89gxdamp6g563mb7t5zk4icewilrpkvl1nd',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '1bbef23pje8xyr6lpba2',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:16:42',
                executionMonitoringStartAt: '2020-07-28 20:18:35',
                executionMonitoringEndAt: '2020-07-29 04:32:23',
                error: 5395979673,
                inactive: 6646143838,
                successful: 5724102166,
                stopped: 3309363083,
                unknown: 2456118629,
                unregistered: 5981243975,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: 'ma5zj37mner9bsosrjp65ov4xgrcsay2cu2lq',
                tenantCode: '1n4qqk58f5qk2bm14n4j7en1zxs7lzqmer8mdrh1rth11hlyx7',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '6qx14pf3rdsbrqxfyexb',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:16:31',
                executionMonitoringStartAt: '2020-07-29 11:53:57',
                executionMonitoringEndAt: '2020-07-28 15:14:40',
                error: 3915505697,
                inactive: 2420859738,
                successful: 6167682191,
                stopped: 1315350207,
                unknown: 8307685258,
                unregistered: 1178267935,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'bac9u0pnlomgr5saeiifgl9bj3ljyrs45wcez2t4ynvvk8tryp',
                systemId: '40zsz0yad5lu9sio4mat8hokui5g2vls182b4',
                systemName: 'o4n040e5s344qdajeonk',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 20:36:51',
                executionMonitoringStartAt: '2020-07-28 20:02:32',
                executionMonitoringEndAt: '2020-07-29 02:18:57',
                error: 4758124148,
                inactive: 5772136952,
                successful: 4228920151,
                stopped: 7930357204,
                unknown: 2209447459,
                unregistered: 5748285521,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '9j7nzv6kvflkvwy7cs5g9pjmytoo0bqlbj4nct7zloio00x4fw',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'cvcxkqnpn4zerw54crur',
                executionId: 'acck9vc7d35fbuibztt5abj5f1hs9y3ab85n7',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:37:16',
                executionMonitoringStartAt: '2020-07-28 20:15:30',
                executionMonitoringEndAt: '2020-07-28 21:58:30',
                error: 2558626081,
                inactive: 1695153348,
                successful: 4598708409,
                stopped: 7324131486,
                unknown: 6408130846,
                unregistered: 3251346914,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'w2jp08iz5pmkzjwiqkiyzfrnlgohef3fbjmfzmpud2yfpfw7iol',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'dfj6o99g4vium4wzs5ew',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:01:55',
                executionMonitoringStartAt: '2020-07-29 10:53:01',
                executionMonitoringEndAt: '2020-07-29 09:41:27',
                error: 3628806082,
                inactive: 1779234521,
                successful: 7292461200,
                stopped: 5209892086,
                unknown: 6355378302,
                unregistered: 7304114253,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'qkec0hsn8sn0os20bys6432cup0qzmemw7vui1vbyfru7mttsc',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'zb0f44d8eygmmoos5y9tt',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:28:51',
                executionMonitoringStartAt: '2020-07-28 14:17:30',
                executionMonitoringEndAt: '2020-07-28 21:04:13',
                error: 2958958246,
                inactive: 9929316595,
                successful: 2131653933,
                stopped: 5915239575,
                unknown: 4789564103,
                unregistered: 8429777122,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '4rzik2uooqmz9odrujwghcfybuf74jto76jofuoj13t0kb6f0a',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '0dlgh0z88316dloject7',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 15:55:36',
                executionMonitoringStartAt: '2020-07-29 05:02:38',
                executionMonitoringEndAt: '2020-07-28 14:15:24',
                error: 33871195653,
                inactive: 6899040402,
                successful: 2921624469,
                stopped: 5390909117,
                unknown: 9843626886,
                unregistered: 2872975500,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '5dtnvn9zjvk59hf758b2sxoeplkfxdpm2l4vgg8x23ra8v8dhb',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'hat08am0nl9oovdg3yu3',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 23:00:23',
                executionMonitoringStartAt: '2020-07-29 02:44:31',
                executionMonitoringEndAt: '2020-07-29 06:11:09',
                error: 3095190704,
                inactive: 58306370609,
                successful: 4138498817,
                stopped: 8915295567,
                unknown: 8428612204,
                unregistered: 1197271343,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'w3qqt1zzya3b7d9we1pd9xichkbvsax9ob2jr51mk2iedkdere',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'n5grxck5fu7o7eb6sjg3',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 05:53:20',
                executionMonitoringStartAt: '2020-07-28 21:44:34',
                executionMonitoringEndAt: '2020-07-28 17:27:23',
                error: 5126711934,
                inactive: 6834961477,
                successful: 15758925419,
                stopped: 6202197116,
                unknown: 9900481993,
                unregistered: 5928624388,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '1dhtdf0jai8io0c9eucehlmf5ovyvl1vmh3q5n4hkrbhwels6c',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '0dkc9c6pqyd4wn5d409r',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 22:19:08',
                executionMonitoringStartAt: '2020-07-29 05:47:22',
                executionMonitoringEndAt: '2020-07-29 04:17:54',
                error: 9174920269,
                inactive: 7519542459,
                successful: 9526885837,
                stopped: 86472113311,
                unknown: 9309967161,
                unregistered: 2335838862,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '2cbqj3lq6q5qkbij28326a6dfjvvzoa95jgmfqs9vget7qmd0e',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'udyiky5g2wm3v5f7bnf5',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:54:25',
                executionMonitoringStartAt: '2020-07-29 03:31:59',
                executionMonitoringEndAt: '2020-07-29 10:20:09',
                error: 9360740100,
                inactive: 4789324014,
                successful: 2350975709,
                stopped: 6153795820,
                unknown: 91545348070,
                unregistered: 6235118498,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'suev3qw4t6oixo81jny0ijp3y1m0vuofx7m6t1qs616j75gpky',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'mndwpa4dcx3jglvfdb24',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:48:19',
                executionMonitoringStartAt: '2020-07-29 10:03:47',
                executionMonitoringEndAt: '2020-07-29 07:44:37',
                error: 9902432258,
                inactive: 9645244942,
                successful: 5749633795,
                stopped: 3395751467,
                unknown: 6793403465,
                unregistered: 28394952391,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'wqqgzhps8pkn9roixsikl4y4dikzjzoieg1avgmea4rmbq0hh1',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '2ln2a1eo01s9cuuzc2vm',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:39:12',
                executionMonitoringStartAt: '2020-07-28 23:58:01',
                executionMonitoringEndAt: '2020-07-28 20:55:17',
                error: -9,
                inactive: 7442638648,
                successful: 8410261491,
                stopped: 5551372772,
                unknown: 6709329664,
                unregistered: 6670612047,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'ly8oczywjxczvdhlrgv726l7bsjo0n0lwpzp3zr70e0kbhf54i',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'dzesjbe92tmn4hnmghdt',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 12:21:35',
                executionMonitoringStartAt: '2020-07-29 02:06:17',
                executionMonitoringEndAt: '2020-07-28 15:42:26',
                error: 6647185868,
                inactive: -9,
                successful: 7749829605,
                stopped: 6843550386,
                unknown: 8018470742,
                unregistered: 1189824646,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'dk07ro638c9utb5or8vp2uxul3j6zcamhauq2s11z576qcu8c0',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 't7qhuufosd4tit92q9b7',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 07:30:46',
                executionMonitoringStartAt: '2020-07-29 12:12:24',
                executionMonitoringEndAt: '2020-07-28 22:28:36',
                error: 4407969908,
                inactive: 7432285824,
                successful: -9,
                stopped: 1888958965,
                unknown: 1694043828,
                unregistered: 8607313204,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '3r09hpura5cqmantve1lxnzyg54wewbwk74yzju194sip90btv',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'dyud5c5o4l9jx14w1g7u',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:14:42',
                executionMonitoringStartAt: '2020-07-29 04:24:25',
                executionMonitoringEndAt: '2020-07-28 20:25:48',
                error: 5870086199,
                inactive: 3773451964,
                successful: 5043908291,
                stopped: -9,
                unknown: 1005194088,
                unregistered: 5516434377,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '6tozoany4stky0mcf1i839ok35yrf482qgwfi6q34x5wgoyz2c',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'fl86cqgdr0s96evv8q77',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 21:57:46',
                executionMonitoringStartAt: '2020-07-28 22:54:18',
                executionMonitoringEndAt: '2020-07-28 15:28:26',
                error: 4488680782,
                inactive: 3835198804,
                successful: 8809236449,
                stopped: 7996477077,
                unknown: -9,
                unregistered: 5304805337,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'xp7uyz2tu73jhsmvdhgw65r2pbr5ngklz6mc38rp9mqvtine0s',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '1nrh68x2yr39ekfxxvq4',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:05:04',
                executionMonitoringStartAt: '2020-07-29 00:04:50',
                executionMonitoringEndAt: '2020-07-29 08:40:35',
                error: 7774467669,
                inactive: 6603730953,
                successful: 8624892086,
                stopped: 3780581748,
                unknown: 9883497092,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'gmfmcnypo0ch82u9s8exmei7oo9or5b9lyosda5ugwilwv9qge',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'bg58jxke7fntdgd6ggec',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 10:07:58',
                executionMonitoringStartAt: '2020-07-29 11:54:45',
                executionMonitoringEndAt: '2020-07-29 00:08:59',
                error: 5193382492,
                inactive: 2965446306,
                successful: 3059212839,
                stopped: 9803266368,
                unknown: 2913544734,
                unregistered: 6796025596,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'adly9b6qmnfxqkp7qzlpo15g3v2tjrov0l1n9a5ezgi2qz52u7',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '4fc2lt0sfhui07kew0h9',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 02:09:38',
                executionMonitoringEndAt: '2020-07-29 12:00:15',
                error: 7286780083,
                inactive: 4286199612,
                successful: 5447196498,
                stopped: 9539007470,
                unknown: 6240774738,
                unregistered: 8240553645,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'o3zw7xmrqxlxk5westah82p282hns7bnpm0mdj8912k3sg01y0',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'jnux83mfp13osmzr14c1',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:45:24',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-29 11:33:32',
                error: 1047032155,
                inactive: 9208606698,
                successful: 3910551615,
                stopped: 7441100769,
                unknown: 6116216551,
                unregistered: 2303277865,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '2f3jh3a1uz6ktlp65u6g44ldnr9q8om0ucpuor55ojx3yit3ft',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'z630n33q3uasq2fxzsn5',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:46:59',
                executionMonitoringStartAt: '2020-07-29 12:55:00',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 7875469683,
                inactive: 4039260963,
                successful: 8895353094,
                stopped: 8326937151,
                unknown: 2641377933,
                unregistered: 6174975140,
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
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: 'o11jp5zo7frsaa3g6uysxx7o7qk02zsl6ekb4j7pzu4qo7n88e',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: 'gzgek7jpl9zc0k3emda2',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:20:50',
                executionMonitoringStartAt: '2020-07-28 23:28:16',
                executionMonitoringEndAt: '2020-07-28 14:49:43',
                error: 3620167311,
                inactive: 7844561859,
                successful: 8403297446,
                stopped: 4237296781,
                unknown: 6868955662,
                unregistered: 3198575366,
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e'));
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e'));
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
                
                id: 'fe6cae05-9176-4761-9bc9-845c217e5ebc',
                tenantId: '4ff30993-ce95-47b9-bb09-1aa968605cc3',
                tenantCode: '7oalx5qswxxr74o6sxz3mf8n8hji4ikre83oaik4r0lghbqs71',
                systemId: 'c77d0884-298a-43a3-a6b7-6040904b8758',
                systemName: 'lry55s68rgat09v28kaj',
                executionId: '973b0945-dedd-4ce8-bdde-e9e85555dff9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 13:16:47',
                executionMonitoringStartAt: '2020-07-28 19:31:49',
                executionMonitoringEndAt: '2020-07-28 14:57:12',
                error: 2133144286,
                inactive: 5631376213,
                successful: 3238238631,
                stopped: 1640080943,
                unknown: 1438660406,
                unregistered: 2113226183,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                tenantCode: '9272fbqp7yb2otuzl4y3u20crc8ze2hax15t9rxdhuv43dib8o',
                systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                systemName: '4rxynb0uhmkmu4lq06c7',
                executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 21:14:39',
                executionMonitoringStartAt: '2020-07-29 06:51:20',
                executionMonitoringEndAt: '2020-07-29 00:02:40',
                error: 1983404808,
                inactive: 3783670461,
                successful: 9444967960,
                stopped: 8980688004,
                unknown: 9153137518,
                unregistered: 3509646698,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e')
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
                        id: 'aa082660-9c33-43e1-b715-962149407696',
                        tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                        tenantCode: '0i2bhbzbxa2f66kuj1lkhccv73a5cakmsmkc8e6pq9hxswo0bo',
                        systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                        systemName: 'ue734i9ljaots1ou1r7k',
                        executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 15:07:27',
                        executionMonitoringStartAt: '2020-07-29 09:34:43',
                        executionMonitoringEndAt: '2020-07-28 22:49:58',
                        error: 8985780651,
                        inactive: 2319764149,
                        successful: 4123109051,
                        stopped: 2899092274,
                        unknown: 2056390639,
                        unregistered: 2128906403,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', 'aa082660-9c33-43e1-b715-962149407696');
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
                            value   : 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e');
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
                    id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e');
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
                        
                        id: 'd00b1453-1574-4d82-aee2-ab5f9cdfd14f',
                        tenantId: '98165001-d4df-471d-a9b8-70ec12764eba',
                        tenantCode: 'qla09hvi5pfrz5nvz8pyvj6lo95j7a1phgqxgf3ww12vjfd5zv',
                        systemId: '3b55347b-7139-4a7a-831b-aaf2cdb1743b',
                        systemName: 'qc8xmzhu3g14eyia73vs',
                        executionId: '4c9b6981-629d-431b-b061-e98bb87ff541',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 00:05:51',
                        executionMonitoringStartAt: '2020-07-28 22:27:28',
                        executionMonitoringEndAt: '2020-07-28 20:18:16',
                        error: 7265140721,
                        inactive: 4311379927,
                        successful: 3805796236,
                        stopped: 3625959182,
                        unknown: 2061989660,
                        unregistered: 7715381178,
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
                        
                        id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e',
                        tenantId: '43777a04-a36e-469f-aaf4-6cb50c337ad2',
                        tenantCode: 'd11bz9qushgzgzm7tjupyqv5fbz1ro0ha3wgtfs9o53k2sq2uo',
                        systemId: '6f4936cb-a575-443d-a56e-fcaf30374132',
                        systemName: 'kpc4zr0b6ekocz2qboa7',
                        executionId: '0d6c9946-06a1-4f1b-8e33-6c2cb7fca1db',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-28 21:57:17',
                        executionMonitoringStartAt: '2020-07-29 06:17:50',
                        executionMonitoringEndAt: '2020-07-28 17:10:45',
                        error: 1706234076,
                        inactive: 3401982085,
                        successful: 4590251792,
                        stopped: 5837804560,
                        unknown: 1254889152,
                        unregistered: 1053311515,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e');
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
                    id: 'ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('ae008f8e-ddb6-4374-a6cf-ed3eecb7b94e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});