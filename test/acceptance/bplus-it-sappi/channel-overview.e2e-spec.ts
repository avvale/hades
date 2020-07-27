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
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'uwuy7wl24iikozfbpcnc2conrhi3kt4wakwxddce4hu0y5fl8f',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'q1asb7jup4o6mkuja62i',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:27:51',
                executionMonitoringStartAt: '2020-07-27 14:52:56',
                executionMonitoringEndAt: '2020-07-27 13:51:47',
                error: 8177843187,
                inactive: 2719485533,
                successful: 5856183907,
                stopped: 3773887942,
                unknown: 2866417229,
                unregistered: 8070197497,
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
                
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'y4u4zqan59w3mql8qf1jc0yeoggsz69odd3w6o307dh0vd7fpq',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '9lzsr0vmkf80dksh44uk',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 02:04:22',
                executionMonitoringStartAt: '2020-07-27 12:12:24',
                executionMonitoringEndAt: '2020-07-27 17:22:15',
                error: 5907460887,
                inactive: 2299731394,
                successful: 5182033616,
                stopped: 2622358246,
                unknown: 6071017392,
                unregistered: 8132285011,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: null,
                tenantCode: 'owv4rx0vpdmcu5krhdmwpiw7eooo7gdbcjfmbytklxfpvux09r',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'rxwbxj1gaittuqcqnh11',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 09:58:05',
                executionMonitoringStartAt: '2020-07-27 17:16:05',
                executionMonitoringEndAt: '2020-07-27 15:50:07',
                error: 6588461351,
                inactive: 9974644646,
                successful: 9409277321,
                stopped: 2853842174,
                unknown: 6881501243,
                unregistered: 1849392880,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                
                tenantCode: 'nne1fw8unc67nvrckxmfrebjo6erhoiwvkxk77yh7rxsu226sy',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'tef5fro2jusqst632ak5',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 05:32:06',
                executionMonitoringStartAt: '2020-07-27 02:15:18',
                executionMonitoringEndAt: '2020-07-28 00:50:07',
                error: 7189768817,
                inactive: 3171213099,
                successful: 2142998348,
                stopped: 7624354203,
                unknown: 6879264009,
                unregistered: 3699627647,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: null,
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '5hjd60ka2cevphiww3zn',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:22:09',
                executionMonitoringStartAt: '2020-07-27 06:23:29',
                executionMonitoringEndAt: '2020-07-27 21:39:06',
                error: 4049048502,
                inactive: 5990508203,
                successful: 8027807236,
                stopped: 2992229465,
                unknown: 3791714691,
                unregistered: 8316493976,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '0tpzgywbvr1x90p20uck',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:45:36',
                executionMonitoringStartAt: '2020-07-27 07:42:51',
                executionMonitoringEndAt: '2020-07-27 11:35:05',
                error: 9667179779,
                inactive: 7559023518,
                successful: 5830595963,
                stopped: 1323592670,
                unknown: 4760299235,
                unregistered: 6277594881,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'ghq4s398muh7waoujfbhhbdmuhepi8y8hdu2eiven03iz6vay6',
                systemId: null,
                systemName: 'v4cbolu86gd07qo1qfhe',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:10:27',
                executionMonitoringStartAt: '2020-07-28 00:27:54',
                executionMonitoringEndAt: '2020-07-27 01:01:29',
                error: 4016273694,
                inactive: 9502304070,
                successful: 6184509740,
                stopped: 9913421105,
                unknown: 5617831510,
                unregistered: 3431787503,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'yusn2x4fpvfaq7e2nau7apsv8qakbk7gy9c2m3wpv9u8vute9v',
                
                systemName: 'gfo5bih8r0de8eoxyuzr',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:12:28',
                executionMonitoringStartAt: '2020-07-27 06:22:22',
                executionMonitoringEndAt: '2020-07-27 20:29:02',
                error: 8565511998,
                inactive: 6561403036,
                successful: 9985356976,
                stopped: 6784373394,
                unknown: 1589008053,
                unregistered: 4360895787,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'ehq2dp4bz0ye2nluoraz6rl6hxut4c6axwir8svf7v9tmbbexw',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: null,
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:02:57',
                executionMonitoringStartAt: '2020-07-27 21:02:21',
                executionMonitoringEndAt: '2020-07-27 22:22:41',
                error: 1812855936,
                inactive: 1449559428,
                successful: 9680967252,
                stopped: 8390927959,
                unknown: 1001666342,
                unregistered: 4891948297,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'f6fi8l8xwwg7x373w9598s4e74me62okuc6seh4ykvzecfim3a',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 09:50:04',
                executionMonitoringStartAt: '2020-07-27 18:04:11',
                executionMonitoringEndAt: '2020-07-27 04:22:53',
                error: 1471491967,
                inactive: 8801318741,
                successful: 9937666731,
                stopped: 5938431403,
                unknown: 6921394666,
                unregistered: 8397880037,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'j4q79qa9lion5dz4f7jok9xvu6qhijsvl90qmba32wmty6kyk1',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'egfj1uvuj1h8qsr5hsua',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 08:44:54',
                executionMonitoringStartAt: '2020-07-27 14:09:32',
                executionMonitoringEndAt: '2020-07-27 14:08:35',
                error: 5157602864,
                inactive: 2784948739,
                successful: 6800675975,
                stopped: 4674177879,
                unknown: 6922162356,
                unregistered: 3264486613,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: '4f2ki9in9bfsbaeauhvjej87lrc3k7zfo10fpk6r3oatuh0u9r',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '1488seg571a8hdey1hxu',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:23:04',
                executionMonitoringStartAt: '2020-07-27 19:10:07',
                executionMonitoringEndAt: '2020-07-27 09:49:43',
                error: 2658178234,
                inactive: 9565891795,
                successful: 9091595061,
                stopped: 4632719998,
                unknown: 9947704970,
                unregistered: 6124890361,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'v8g5xadj1vkr6vmjy2wsaogtzjfbmvh2yunz7oj2vn7f0s2m8j',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'i2a06gnz798r0dbjelf9',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: null,
                executionExecutedAt: '2020-07-27 03:56:37',
                executionMonitoringStartAt: '2020-07-27 19:52:06',
                executionMonitoringEndAt: '2020-07-27 06:22:52',
                error: 9489090271,
                inactive: 2599448768,
                successful: 5753029251,
                stopped: 1773620679,
                unknown: 6553506308,
                unregistered: 6157751785,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'fydm51lio7cx1cf3wyxlioo9rahi304ttg5zd2p2l89683lwt5',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'zr8ay13wprq92v7ldh2e',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                
                executionExecutedAt: '2020-07-27 18:21:27',
                executionMonitoringStartAt: '2020-07-27 12:14:50',
                executionMonitoringEndAt: '2020-07-27 09:26:02',
                error: 3343721001,
                inactive: 8600860033,
                successful: 9078241166,
                stopped: 1013365169,
                unknown: 6388123916,
                unregistered: 6856207756,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'b3spxmz24y4v93om4bzw6cqgc82r37s06kiqe9dbr1pnslu30l',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '9zzvat8mw82p8vulgozo',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-27 01:50:41',
                executionMonitoringEndAt: '2020-07-27 03:12:44',
                error: 3208297463,
                inactive: 2017119235,
                successful: 2765119977,
                stopped: 3757592367,
                unknown: 9112774185,
                unregistered: 1168511794,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'uhnos6x9duxb2q09v379utw6y0eywrj1mb5kmiiagzygp1wgvm',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'zr880j0135j04o3jfizj',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-27 03:12:38',
                executionMonitoringEndAt: '2020-07-27 06:13:35',
                error: 3861325516,
                inactive: 7403355882,
                successful: 2615093007,
                stopped: 6570510410,
                unknown: 6390566528,
                unregistered: 5170423506,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: '76mllv4qcayeim7ulxsh2gg51bxhfvrw1852ruppzna78uegsc',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'm6p71j5zphybqz345aji',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 04:48:39',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-27 01:02:13',
                error: 5299255549,
                inactive: 3309087653,
                successful: 3866902082,
                stopped: 7926682292,
                unknown: 1166726716,
                unregistered: 1621616758,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'pvbaovqm87s7d42mvqasy1jry7i6xlnxkho1s3b6zhfkypyiw5',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'j5v831vu0n3nzeml2d7o',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 22:40:23',
                
                executionMonitoringEndAt: '2020-07-27 19:41:23',
                error: 6970396805,
                inactive: 6743955363,
                successful: 6414384971,
                stopped: 6111011136,
                unknown: 9401177414,
                unregistered: 6883800819,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'xmzvfhtstyis1os28ku9vnfkof5e8tekmsa3htkxv828rzc330',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '2ebf9sghkdh5n2huwgnm',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:47:37',
                executionMonitoringStartAt: '2020-07-27 04:04:59',
                executionMonitoringEndAt: null,
                error: 3486344490,
                inactive: 6786085389,
                successful: 3406746846,
                stopped: 1455126798,
                unknown: 9743840121,
                unregistered: 7902613602,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'yjfzkulpiby0tbdt6rpo4k1j2eqvdj9xnzjcxpc1xfnqv97sg5',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'g98gt78qfdh4pkgddppg',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 20:44:44',
                executionMonitoringStartAt: '2020-07-27 13:32:25',
                
                error: 4394155597,
                inactive: 4273070442,
                successful: 1935432359,
                stopped: 4201800227,
                unknown: 6850295800,
                unregistered: 5113725995,
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
                id: '9qrdgcw4bwnq3o19t39tcmt502jgn4vedju3s',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'r17fbosvrl9h688pgezh2s4x5wmtar296020lo1eckqogh6z8v',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'tuvur8v3lztuetfiugw8',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 10:07:14',
                executionMonitoringStartAt: '2020-07-27 14:29:20',
                executionMonitoringEndAt: '2020-07-27 12:16:50',
                error: 7042852697,
                inactive: 5473205033,
                successful: 1374553182,
                stopped: 5376210730,
                unknown: 9120486029,
                unregistered: 8621330896,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '9mowa6pex9q2aofkic8m0ikxf7pmquaz3v6pk',
                tenantCode: 'oas5kmmt0mjzvj2fjsln1ab3e2hfjgtkyxh6a83ski9jcs12uv',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'w4uaqf57wi0a0a8x1r2s',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 14:54:52',
                executionMonitoringStartAt: '2020-07-27 09:17:37',
                executionMonitoringEndAt: '2020-07-27 12:11:38',
                error: 6706939721,
                inactive: 5334522472,
                successful: 1910288904,
                stopped: 9608903441,
                unknown: 5472432868,
                unregistered: 5164649834,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'u52y5yrgt56kv03dunxmyfug6al13eqram5ljb1lvs00jy4kjg',
                systemId: 'c61bhhjlmh714yaufgjr7n0dmg7fobwtag4uy',
                systemName: 'kczqfgcmzdkt5en21b1s',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 05:43:37',
                executionMonitoringStartAt: '2020-07-27 07:58:01',
                executionMonitoringEndAt: '2020-07-27 14:07:24',
                error: 6381490208,
                inactive: 6778681946,
                successful: 7602264491,
                stopped: 1141206618,
                unknown: 2710686688,
                unregistered: 7851724880,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: '0ygyb91g8kw81cjkqd00u7sdhcsno88k5k7dvz4rbrxz7w0mow',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'fmmt7ofb530izlo68gef',
                executionId: '5vos09g3dew0lc1ia1faa4g843z0f6cylkdja',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 22:46:22',
                executionMonitoringStartAt: '2020-07-27 03:04:35',
                executionMonitoringEndAt: '2020-07-27 17:34:22',
                error: 6851848413,
                inactive: 7137564509,
                successful: 3889361761,
                stopped: 1267862538,
                unknown: 1350366621,
                unregistered: 3032714481,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'r6ogrxit4vxatuekbtt8yzg7un2mbcoyb2i1yol9dknjpb5c90y',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '7cskqghhsme8ty5mmmpj',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:05:05',
                executionMonitoringStartAt: '2020-07-27 08:30:23',
                executionMonitoringEndAt: '2020-07-27 08:51:50',
                error: 3470570544,
                inactive: 6442352083,
                successful: 2932396321,
                stopped: 7794841629,
                unknown: 8110459110,
                unregistered: 2033373688,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'vrhqpqodjy3xonodsdkld1qd6arsl90i8akfapznun05bxu1mb',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'yror0ry8vpy4ky0s8kgi6',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 00:42:07',
                executionMonitoringStartAt: '2020-07-27 11:11:00',
                executionMonitoringEndAt: '2020-07-27 10:09:53',
                error: 2454323618,
                inactive: 2497815904,
                successful: 4291005410,
                stopped: 4454418152,
                unknown: 7167813192,
                unregistered: 3842088645,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: '5x658ztx0dnhj0r6ll6xbcyi3iqxhni9adcv2cluz6ehb49dij',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '7fq2fvrke9l4t8u1dbps',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 21:30:46',
                executionMonitoringStartAt: '2020-07-27 20:58:56',
                executionMonitoringEndAt: '2020-07-27 04:29:42',
                error: 59889276027,
                inactive: 4320153508,
                successful: 7463738980,
                stopped: 8300018231,
                unknown: 7926760513,
                unregistered: 5301730510,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'swl7llt1f1wzeptz7sseqolnopstxx34u26d9o62spbfefhiqw',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'x1ycax13unf796ke367a',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 16:07:59',
                executionMonitoringStartAt: '2020-07-27 21:53:04',
                executionMonitoringEndAt: '2020-07-27 06:48:40',
                error: 6063956622,
                inactive: 95878579296,
                successful: 1754288075,
                stopped: 5152723230,
                unknown: 9496736664,
                unregistered: 6641200709,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'zyu8ao5acrmn2sbvzp9vhxslt7x2ougw72lr79yjqgwtr3wcd8',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '063lo7sjw7q5m4c0zrgd',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 11:18:35',
                executionMonitoringStartAt: '2020-07-27 17:05:01',
                executionMonitoringEndAt: '2020-07-27 23:45:54',
                error: 5131994393,
                inactive: 8644055008,
                successful: 77814155575,
                stopped: 1112395398,
                unknown: 2736658398,
                unregistered: 2703468808,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: '9nppz96w96v4zzxzzy95etf5i1rd5sl8s2oks4k86btj0uavta',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'dcpn2y9ebwucxcrs8bag',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 12:14:16',
                executionMonitoringStartAt: '2020-07-27 00:59:28',
                executionMonitoringEndAt: '2020-07-27 04:09:14',
                error: 1240591936,
                inactive: 2718227685,
                successful: 3432653552,
                stopped: 67244260987,
                unknown: 5867036086,
                unregistered: 2095331782,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'vqsdbecg6kpb47e7y5pto6sdwwxc0l23ky74xfnwrn1cm3wm24',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '7f0ha149xb4y3taxetms',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 07:55:04',
                executionMonitoringStartAt: '2020-07-27 23:06:02',
                executionMonitoringEndAt: '2020-07-27 04:44:46',
                error: 5099376419,
                inactive: 3589939852,
                successful: 6452139835,
                stopped: 9326355957,
                unknown: 57902933338,
                unregistered: 4207045754,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'wghqv5ibk8tbffb8hq1qf7qyct6ewn9bbupupq6al4czx2tuo2',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'arb34r3hdvamsckvfgjl',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 06:22:31',
                executionMonitoringStartAt: '2020-07-27 01:47:06',
                executionMonitoringEndAt: '2020-07-27 14:09:37',
                error: 6676361291,
                inactive: 6396690198,
                successful: 4130771332,
                stopped: 6516861229,
                unknown: 5689059527,
                unregistered: 53115323170,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'v3hgz9p0yn2acgzhg81n54wh8ihgmv3zgmsw1pcf4dxvshts10',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '11ny17dmiodrk74f1n7x',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 17:43:28',
                executionMonitoringStartAt: '2020-07-27 07:22:51',
                executionMonitoringEndAt: '2020-07-27 18:27:31',
                error: -9,
                inactive: 8080866356,
                successful: 2865970032,
                stopped: 3965431679,
                unknown: 9733175561,
                unregistered: 6645838671,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'i7cya6mb7c2lryzlfcaeapaqivwj5v1er0kzeyhlqu02as5jxc',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '9v05z1y93m2zv51ix9pc',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 04:20:00',
                executionMonitoringStartAt: '2020-07-27 08:13:37',
                executionMonitoringEndAt: '2020-07-27 01:54:26',
                error: 2803616891,
                inactive: -9,
                successful: 4466876687,
                stopped: 3907278551,
                unknown: 8137530902,
                unregistered: 9566335526,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 't1z1qvoniffzt7eyhdq6u46ssq5wcbm14r6b56qvd8yrjngjiz',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '1fnv5x9rs9z0yl3dih75',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 15:33:20',
                executionMonitoringStartAt: '2020-07-27 08:46:22',
                executionMonitoringEndAt: '2020-07-27 13:30:50',
                error: 4549393874,
                inactive: 2185055175,
                successful: -9,
                stopped: 7875256507,
                unknown: 9952345848,
                unregistered: 3197885767,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'e738iurv08hj9p1he75342kkafdljsnwd68sfzjqy0h59syent',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'is0yxtc71jnhr9e4pceg',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 13:45:52',
                executionMonitoringStartAt: '2020-07-27 23:27:50',
                executionMonitoringEndAt: '2020-07-27 23:05:50',
                error: 8585920419,
                inactive: 8428765771,
                successful: 4593364414,
                stopped: -9,
                unknown: 4376770079,
                unregistered: 6857046085,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'qimiczt5iqb2qrifh6h6p26fot2fk75q2bwvvrp5x2yvareno6',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '4jp9f4h7ejsvxu93o6wc',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 20:29:25',
                executionMonitoringStartAt: '2020-07-27 03:42:58',
                executionMonitoringEndAt: '2020-07-27 10:14:52',
                error: 8098558062,
                inactive: 7829073477,
                successful: 2728768715,
                stopped: 5428500416,
                unknown: -9,
                unregistered: 2659885467,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'tdhhpb1r0984h5eqbz127ztlgfvkc5t209grp6tm1z0a1ob76y',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'ikjvtqw65mm59g5qcey1',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 23:06:47',
                executionMonitoringStartAt: '2020-07-27 02:21:40',
                executionMonitoringEndAt: '2020-07-27 02:34:11',
                error: 3597065618,
                inactive: 5981714920,
                successful: 6842755014,
                stopped: 4347031486,
                unknown: 7761506916,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'xis23wyhmtj3sdzcfqkmbfepwlp88qlaa2gubv9q8mtn8l2t27',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'jz8ao5vdpnql1cj9rbtk',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-27 10:17:17',
                executionMonitoringStartAt: '2020-07-27 03:42:34',
                executionMonitoringEndAt: '2020-07-27 08:38:02',
                error: 9338444354,
                inactive: 9223142971,
                successful: 4080266348,
                stopped: 4029979845,
                unknown: 6305558123,
                unregistered: 5261300270,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'i9zwa7r01i9axxdcb01fej2x5bsgcstqzo93uu6z6nxb9p3wtz',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'qljqt9prkhs8d1gh148x',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-27 18:43:36',
                executionMonitoringEndAt: '2020-07-27 16:44:21',
                error: 5290815310,
                inactive: 5715061114,
                successful: 6144276723,
                stopped: 2781329198,
                unknown: 5720895094,
                unregistered: 5012407060,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'b946hqtwr6k5agti5d6wm105cysqtjln2ywdv2yinss17vo1sl',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'bsb0m348mnp4n3p6lxvq',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 17:46:08',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-27 03:32:10',
                error: 2906640836,
                inactive: 6844434520,
                successful: 5193496362,
                stopped: 1335139707,
                unknown: 3294727710,
                unregistered: 6969334353,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: '428njhkwqd04w3oxd6hyqx4di2315ti1okzcfrc81ic0dp2m84',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '2gpbu944ea0dw8xp2cjc',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 14:11:19',
                executionMonitoringStartAt: '2020-07-27 21:04:56',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 5852088667,
                inactive: 9057489852,
                successful: 2346476743,
                stopped: 3256548359,
                unknown: 6069035966,
                unregistered: 4722072188,
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
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: '2vcdl5fl5jnn7wom5vdu3v6suxejq4cygnqybbx7zedwfy3uhi',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: 'np0z7tsba6cbtpcdq06p',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 19:53:37',
                executionMonitoringStartAt: '2020-07-27 11:09:00',
                executionMonitoringEndAt: '2020-07-27 20:16:30',
                error: 3795436242,
                inactive: 9050105645,
                successful: 1711230364,
                stopped: 1825120347,
                unknown: 3186292429,
                unregistered: 4963478107,
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
                        value   : 'b9947487-7baa-4d29-a5e2-9b918cee34fc'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b9947487-7baa-4d29-a5e2-9b918cee34fc'));
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
            .get('/bplus-it-sappi/channel-overview/b9947487-7baa-4d29-a5e2-9b918cee34fc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b9947487-7baa-4d29-a5e2-9b918cee34fc'));
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
                
                id: '59a89a2b-b364-4e29-8a9e-0301618d7676',
                tenantId: '5650410e-4fa6-4d3d-a1db-0b84ec8f7b0b',
                tenantCode: '9h74tzq0eqeziomld9v14bsqsyjd8l3blrmclj6nbpljha63mq',
                systemId: 'f3100051-3eae-4777-a557-671d6b52005b',
                systemName: 'rpcvzc59dcdhlh1m1h7v',
                executionId: '6f73afa0-1015-4c53-8117-644204b35651',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-27 18:32:10',
                executionMonitoringStartAt: '2020-07-27 00:57:24',
                executionMonitoringEndAt: '2020-07-27 00:57:35',
                error: 4305093196,
                inactive: 2055789371,
                successful: 2448699080,
                stopped: 1222496955,
                unknown: 5647255065,
                unregistered: 7360417952,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                tenantCode: 'b00n0qeanrc7he24ddj8o726p61i4l20lqq5vxdqurtg97is3t',
                systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                systemName: '32hm6jsqrfxu3ol75pd8',
                executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-27 07:10:35',
                executionMonitoringStartAt: '2020-07-27 19:05:42',
                executionMonitoringEndAt: '2020-07-27 14:02:01',
                error: 8097293011,
                inactive: 7460277144,
                successful: 1823154294,
                stopped: 7289657907,
                unknown: 3695106052,
                unregistered: 4217140892,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b9947487-7baa-4d29-a5e2-9b918cee34fc'));
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
            .delete('/bplus-it-sappi/channel-overview/b9947487-7baa-4d29-a5e2-9b918cee34fc')
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
                        id: '8aa4ef74-e5e5-4bee-b3f3-75858c67c90a',
                        tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                        tenantCode: '16hr44jipu23dyl183y5tphs5l90sj2mofic8x1y6fmgc3htgp',
                        systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                        systemName: 'wsit1ha9ed9cfol7dea2',
                        executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 12:25:32',
                        executionMonitoringStartAt: '2020-07-27 15:24:11',
                        executionMonitoringEndAt: '2020-07-27 15:19:25',
                        error: 2994754146,
                        inactive: 4741296427,
                        successful: 7586605097,
                        stopped: 8979411103,
                        unknown: 8800546723,
                        unregistered: 9979720087,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '8aa4ef74-e5e5-4bee-b3f3-75858c67c90a');
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
                            value   : 'b9947487-7baa-4d29-a5e2-9b918cee34fc'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('b9947487-7baa-4d29-a5e2-9b918cee34fc');
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
                    id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('b9947487-7baa-4d29-a5e2-9b918cee34fc');
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
                        
                        id: '9d8230e6-c749-441b-bc31-ed5c6a5be236',
                        tenantId: 'c389f6b3-2f1f-4529-860f-aa46045b4ff2',
                        tenantCode: '3b5y3n6vo17c711ov47iypipmutbnzxybxqbsb208jty6l57vs',
                        systemId: 'f5de1227-041c-4b17-844a-d5d4cd6b0964',
                        systemName: 'lqln86ewn7frkuzogg5u',
                        executionId: 'e81c9f2e-f4ad-48c4-ba57-7c9eed2c4500',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-27 04:19:47',
                        executionMonitoringStartAt: '2020-07-27 08:06:56',
                        executionMonitoringEndAt: '2020-07-27 17:01:36',
                        error: 6683461959,
                        inactive: 2092519707,
                        successful: 3199008525,
                        stopped: 2280302072,
                        unknown: 6715160546,
                        unregistered: 5271807310,
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
                        
                        id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc',
                        tenantId: '53e27c96-7643-453d-b7ca-e2e3886cabf9',
                        tenantCode: '3an10x20wm2pt19bils9qqw6b9edfu7587mpwlwe40vfhi965v',
                        systemId: 'd6ec6619-aa3a-44d2-a1b4-a0534504cb39',
                        systemName: '8ye3wc7ymf02plsihmpr',
                        executionId: '91d6bca1-bc4c-4bb7-898b-c840efc814c2',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-27 17:38:32',
                        executionMonitoringStartAt: '2020-07-27 15:25:03',
                        executionMonitoringEndAt: '2020-07-27 19:15:28',
                        error: 6023572737,
                        inactive: 1243948702,
                        successful: 5616607474,
                        stopped: 3012520150,
                        unknown: 2619667556,
                        unregistered: 9032799452,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('b9947487-7baa-4d29-a5e2-9b918cee34fc');
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
                    id: 'b9947487-7baa-4d29-a5e2-9b918cee34fc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('b9947487-7baa-4d29-a5e2-9b918cee34fc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});