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
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: '5stqsfsktlxs88y1ckg9mok8sdhn6uz73ujrdq5m89nj9pe1r5',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'syg2sthakslkxrjffifo',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 19:20:23',
                executionMonitoringStartAt: '2020-07-23 15:58:49',
                executionMonitoringEndAt: '2020-07-23 11:53:25',
                error: 4119473230,
                inactive: 7968724408,
                successful: 7065536947,
                stopped: 2589382948,
                unknown: 7225221718,
                unregistered: 2441836162,
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
                
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: '4fyx35tc7r823bzn3zlsk9ynr6wmi2o05wlity69h2pz8e3jh1',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'p5n00k5u2m35yuxjd3q8',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:01:04',
                executionMonitoringStartAt: '2020-07-23 14:55:23',
                executionMonitoringEndAt: '2020-07-22 23:12:07',
                error: 4475023743,
                inactive: 2559718489,
                successful: 6893318438,
                stopped: 6573729128,
                unknown: 9459329735,
                unregistered: 9761251844,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: null,
                tenantCode: 'jo29en3k79ljad60z1vw7gyow3vcxiyc6qfbbv6ks2rewl3ijq',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'x0nu88ikbcrdk22reywc',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 07:17:50',
                executionMonitoringStartAt: '2020-07-22 19:56:49',
                executionMonitoringEndAt: '2020-07-23 12:36:38',
                error: 1787432060,
                inactive: 6444039817,
                successful: 3994120794,
                stopped: 7815319359,
                unknown: 9621317558,
                unregistered: 2197706199,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                
                tenantCode: '5ka51buknzdv41s542r6h1mh8jku5xed3dzudme3fsisfcctfl',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'do9p3kmgrif4i70kjz6k',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 05:45:47',
                executionMonitoringStartAt: '2020-07-23 12:30:02',
                executionMonitoringEndAt: '2020-07-23 07:08:39',
                error: 4380476982,
                inactive: 4735050781,
                successful: 1091164028,
                stopped: 7229474264,
                unknown: 9827444142,
                unregistered: 3320766363,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: null,
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: '5jbjokpeqfk40ueclscf',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 04:46:49',
                executionMonitoringStartAt: '2020-07-23 03:21:45',
                executionMonitoringEndAt: '2020-07-22 23:25:06',
                error: 2855914762,
                inactive: 1241989595,
                successful: 4148952458,
                stopped: 1588297820,
                unknown: 3555280453,
                unregistered: 4538781301,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'qr4epeqef0bzcmffad57',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 15:21:38',
                executionMonitoringStartAt: '2020-07-22 18:56:52',
                executionMonitoringEndAt: '2020-07-23 08:00:10',
                error: 2405355588,
                inactive: 4060243753,
                successful: 2617045196,
                stopped: 6973586132,
                unknown: 6660366690,
                unregistered: 1144224578,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'iy563mv25t1h0nrm1p8ls3sj62fpi2og63wqa45m8gjiocvxj6',
                systemId: null,
                systemName: 'isb01zipvt3mq40cdcgi',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 13:11:07',
                executionMonitoringStartAt: '2020-07-23 09:35:56',
                executionMonitoringEndAt: '2020-07-23 18:26:01',
                error: 6842478579,
                inactive: 6540900965,
                successful: 4697752702,
                stopped: 6500814161,
                unknown: 2184396801,
                unregistered: 5878754965,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'byv7l2ovz8cx4momq527619yl6va9u8y7xftuu0p9ik1me0fp7',
                
                systemName: 'z4qlvmadc0i9fl80mpk2',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 01:09:57',
                executionMonitoringStartAt: '2020-07-23 17:00:10',
                executionMonitoringEndAt: '2020-07-23 10:14:08',
                error: 2748383814,
                inactive: 2296563925,
                successful: 9825410649,
                stopped: 5885827540,
                unknown: 2508421087,
                unregistered: 7046320369,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'htvkcjk0o3shfzv1o4iq5l7p0rq0k8a4dn647vrib8jskafsyx',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: null,
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 20:25:44',
                executionMonitoringStartAt: '2020-07-23 17:53:16',
                executionMonitoringEndAt: '2020-07-23 18:07:00',
                error: 7187974870,
                inactive: 3369749973,
                successful: 6267861081,
                stopped: 6647052544,
                unknown: 9613199449,
                unregistered: 1313626797,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'iy9xwe8hegfabzrszixrqnqjuihf7rx6hm6na35jql8q0yzlh7',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 21:52:09',
                executionMonitoringStartAt: '2020-07-22 19:41:07',
                executionMonitoringEndAt: '2020-07-23 17:09:50',
                error: 7206767867,
                inactive: 3953936978,
                successful: 2134800543,
                stopped: 1111176991,
                unknown: 9136585938,
                unregistered: 1420007041,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'rmaedqmq9eqvaode7u3w3v46lyyayh09hm7k8e8gny6snbkbxq',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: '3ke9m0btrvl5cqypma5z',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 05:30:44',
                executionMonitoringStartAt: '2020-07-23 16:22:54',
                executionMonitoringEndAt: '2020-07-23 03:45:22',
                error: 8430727115,
                inactive: 2880457328,
                successful: 9425661842,
                stopped: 2105711454,
                unknown: 6963482278,
                unregistered: 3691110706,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'g04qrhalk1t5gt6ftwr4txm9hs76yweuq72nzszthmx6bxyq8o',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'bf7pa41wkz93wlr1kozv',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 09:47:51',
                executionMonitoringStartAt: '2020-07-23 05:10:26',
                executionMonitoringEndAt: '2020-07-23 06:32:17',
                error: 8771907367,
                inactive: 8543317491,
                successful: 8130680298,
                stopped: 3065769953,
                unknown: 6232275669,
                unregistered: 5164605689,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: '7d0gn6aqf5zid1c2qekmcpeqp8elxkkj5ke3xnl6earhqa7r3w',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'mvv75dyf8uxyswf7zoay',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: null,
                executionExecutedAt: '2020-07-23 11:26:12',
                executionMonitoringStartAt: '2020-07-22 20:31:19',
                executionMonitoringEndAt: '2020-07-22 22:37:31',
                error: 3685697691,
                inactive: 8586241884,
                successful: 1717055923,
                stopped: 6100601662,
                unknown: 1310483453,
                unregistered: 6554757269,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: '4yzvv86ik3wy47hvbzpodbk2mp14nwi0r7x9kq0ropxjc0zgwe',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: '8728larfzlhans3nemi4',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                
                executionExecutedAt: '2020-07-22 23:25:03',
                executionMonitoringStartAt: '2020-07-23 01:37:25',
                executionMonitoringEndAt: '2020-07-23 08:14:37',
                error: 1203683277,
                inactive: 6583996555,
                successful: 3947351581,
                stopped: 2075830631,
                unknown: 4382629465,
                unregistered: 7110799364,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'bfz3h7rjn38qhdkiwga6fc0oc5emu3xje47gsawl0nclyh03ud',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'u34fbi69uri46h510v42',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-23 07:20:56',
                executionMonitoringEndAt: '2020-07-23 18:07:25',
                error: 5411778891,
                inactive: 8896011989,
                successful: 4439634784,
                stopped: 7127987343,
                unknown: 4971848097,
                unregistered: 4482627114,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'gfb66bp11ecmydzsza69yeafuo3g8fyj0tfrt516ujqw59tdal',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'yhn3xuedxtjaq74twrit',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-23 01:42:15',
                executionMonitoringEndAt: '2020-07-23 10:59:52',
                error: 9551074842,
                inactive: 4546116868,
                successful: 4702706927,
                stopped: 5482970762,
                unknown: 7695512199,
                unregistered: 8714069716,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'radr59gcg6jioxnh6jfs97nyb272ne5vt0wq8pwfa3w1jf59oj',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'iklhi0k0wvl6wulz1xex',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 22:52:03',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-23 07:23:37',
                error: 7401224503,
                inactive: 1560237804,
                successful: 1501190836,
                stopped: 8090504054,
                unknown: 9743071464,
                unregistered: 1002291884,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'ad1510jtbuba6p4wolfu8uhd2dyqd6fi8r1krmhofpjrxvl28k',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'jh4xxx8broqoih76lqg5',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 10:18:12',
                
                executionMonitoringEndAt: '2020-07-23 05:24:34',
                error: 3830280955,
                inactive: 3076243666,
                successful: 2850342672,
                stopped: 8720166618,
                unknown: 5042733376,
                unregistered: 4097366629,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: '79kesbmv7dvf8bn3pprc1fp4ehq07ofe4zx3n2np800xje4xc3',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'cj3aliwmal0owp9uh5gf',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 16:36:43',
                executionMonitoringStartAt: '2020-07-23 02:46:04',
                executionMonitoringEndAt: null,
                error: 4907056674,
                inactive: 3204286397,
                successful: 6177247863,
                stopped: 1975159693,
                unknown: 9133317580,
                unregistered: 8755253451,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'wd5pp8gnh33z083i4eyednqt5e16n97ek6d9tori2gulazh5ug',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'nnsnpxeghpnhxzkoyx9z',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 22:28:48',
                executionMonitoringStartAt: '2020-07-23 17:53:44',
                
                error: 7861304259,
                inactive: 2688856953,
                successful: 5618825548,
                stopped: 8150855567,
                unknown: 1445863892,
                unregistered: 5387251445,
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
                id: '8dykw523o2th4f3gw14x1pa2sivrglhu8v6gv',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'hrbcvjgxzyqwvugh7imov028ini2lbguqxj7y433j69eai4d1g',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'jlljmjnegt5zfj94f1jf',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 22:08:27',
                executionMonitoringStartAt: '2020-07-23 05:51:43',
                executionMonitoringEndAt: '2020-07-23 15:08:44',
                error: 2468169515,
                inactive: 9503441564,
                successful: 6717502392,
                stopped: 6613502765,
                unknown: 2616341065,
                unregistered: 8441605859,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'znpc3xs8oj2liua4245524sr9fh03aifd3vaj',
                tenantCode: 'zcnz3s8jup13qkez5adq3x2tk261ad1v159zuvjjcn87gupazz',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: '4fyhwelu6v5jmv9br00h',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 18:34:26',
                executionMonitoringStartAt: '2020-07-23 08:16:47',
                executionMonitoringEndAt: '2020-07-23 07:40:08',
                error: 6494858101,
                inactive: 1544938273,
                successful: 5179461962,
                stopped: 6646545489,
                unknown: 2858186002,
                unregistered: 5762630185,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'tjjxt81klp6o0x65ylbpldmjnr8xol8g7sy3uh5qad017pq5k0',
                systemId: 'cjn79c59brx4wbh4a5h1fmpcla2ssr3jipvs0',
                systemName: 'ben8l71sc7j970fe26jh',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 11:47:55',
                executionMonitoringStartAt: '2020-07-23 15:02:48',
                executionMonitoringEndAt: '2020-07-23 06:47:12',
                error: 4397609616,
                inactive: 1237458868,
                successful: 9195483808,
                stopped: 5824096038,
                unknown: 3871568887,
                unregistered: 2014546382,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'qkuh8h7u7enqd6lyl2h92gcwuvyolcwdlurfzgob2h0w2kte6q',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'hhddzim9ugxf6ok4ad2i',
                executionId: 'dziy47f670lpz9drrn3447vfqeox03n7ozag9',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 19:55:41',
                executionMonitoringStartAt: '2020-07-22 22:49:05',
                executionMonitoringEndAt: '2020-07-23 13:15:09',
                error: 8708430148,
                inactive: 2008952449,
                successful: 8739075419,
                stopped: 1552292637,
                unknown: 3446988520,
                unregistered: 3539070257,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'os3m9oxy5ngr1chhi44f6und8js440uzg0hvpzdv2jbo427ymqq',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'fqxzz4szc1xhfxe0p1pv',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 18:32:37',
                executionMonitoringStartAt: '2020-07-23 11:03:48',
                executionMonitoringEndAt: '2020-07-23 04:38:09',
                error: 4971289543,
                inactive: 9346014179,
                successful: 1266347219,
                stopped: 1303801889,
                unknown: 9140710256,
                unregistered: 9458384885,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: '0eixus25zbxq7o58j5v4ga0rben8mlcfztcg2dhkkc4t8z64by',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: '3fahpnawwdz0lr4q8cwow',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 22:55:34',
                executionMonitoringStartAt: '2020-07-22 20:28:01',
                executionMonitoringEndAt: '2020-07-22 19:29:35',
                error: 4949134580,
                inactive: 3422201841,
                successful: 1396995097,
                stopped: 7116677755,
                unknown: 2570800883,
                unregistered: 1934254822,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'k8pdxixv8iyqibzeuih5qqss53vqq5t68ol6mq6jl5t2lrorae',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'upynhtt9im01a2uqgpf4',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 02:43:23',
                executionMonitoringStartAt: '2020-07-22 21:46:54',
                executionMonitoringEndAt: '2020-07-22 20:32:30',
                error: 18096966717,
                inactive: 6203515993,
                successful: 7977004223,
                stopped: 5403938491,
                unknown: 9194500790,
                unregistered: 3013732443,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'dy7f55929ejtfqazkez3y2n6pmdgtob80oaux2rp7euwwwsab6',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: '28kwevdabd42xzk0swlq',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 11:05:59',
                executionMonitoringStartAt: '2020-07-23 09:11:15',
                executionMonitoringEndAt: '2020-07-23 16:02:30',
                error: 5791088709,
                inactive: 40274037931,
                successful: 5506278910,
                stopped: 5237911360,
                unknown: 2727393875,
                unregistered: 8090180814,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'pobn56jqdkymvv6xdwh9yha4fqt8ibstkda5b78mi88r8dfu0a',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'ko7lvx9azmmd8w5ria20',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 02:10:45',
                executionMonitoringStartAt: '2020-07-23 01:05:16',
                executionMonitoringEndAt: '2020-07-22 22:00:54',
                error: 8915578124,
                inactive: 5120371716,
                successful: 27723282400,
                stopped: 3019998960,
                unknown: 7854720723,
                unregistered: 4542766404,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'akz736n91pnddfd9l6ultlr8nwi6q9scjoiunafh6m85e7w2rk',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'w4y5yy6h94vd1shfp14b',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 12:57:29',
                executionMonitoringStartAt: '2020-07-23 05:46:10',
                executionMonitoringEndAt: '2020-07-23 17:41:40',
                error: 7637549406,
                inactive: 7970806475,
                successful: 8081927338,
                stopped: 37875278314,
                unknown: 1363258592,
                unregistered: 5813309698,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: '6d9oikzbkfa03ooa8brulkqpgutsqjb1ybg9mlpb9fp2nu5kn6',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'pm0c1rl4oqdjeavq2ydt',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 16:34:48',
                executionMonitoringStartAt: '2020-07-23 08:31:19',
                executionMonitoringEndAt: '2020-07-23 15:24:20',
                error: 3479023328,
                inactive: 1658173589,
                successful: 2025263973,
                stopped: 8336756687,
                unknown: 66346682146,
                unregistered: 6537155431,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'm6te9mx7zgz2kmvagqo8tavnpj2ytu6ykek7mnchwqyo80gjft',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'zgnz93wz8c5f0im5bnnp',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-22 23:42:51',
                executionMonitoringStartAt: '2020-07-23 03:37:56',
                executionMonitoringEndAt: '2020-07-23 02:08:49',
                error: 5602530769,
                inactive: 6333867513,
                successful: 4993372981,
                stopped: 6779108690,
                unknown: 3088798428,
                unregistered: 88695113991,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'm9bs756egt1t91e4vz2jnhsw0k5z28cuhh8o2smmjnnwfclvp1',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'w7w8lsvzbizwcy61gthv',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 09:17:09',
                executionMonitoringStartAt: '2020-07-23 13:54:03',
                executionMonitoringEndAt: '2020-07-23 09:26:59',
                error: -9,
                inactive: 6083613942,
                successful: 7806488667,
                stopped: 5141290103,
                unknown: 7928778288,
                unregistered: 9073117972,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'l9n31odg7hwssry98zo30l2p3l1wc2hbbmje9bltty4kika12d',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'dnppn7cggn6sgzytgk5o',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 23:33:43',
                executionMonitoringStartAt: '2020-07-23 06:22:36',
                executionMonitoringEndAt: '2020-07-23 13:59:24',
                error: 9706721429,
                inactive: -9,
                successful: 4401933420,
                stopped: 2917325221,
                unknown: 8896153739,
                unregistered: 3346635249,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'r7sq1txvebp6io8t1zgy7yu1syqai2nwd33ytxdsi9m0sujlg6',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'mvidexuv5d7ndcrskyda',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-22 18:44:04',
                executionMonitoringStartAt: '2020-07-23 02:24:39',
                executionMonitoringEndAt: '2020-07-23 08:46:00',
                error: 2106077423,
                inactive: 1181577765,
                successful: -9,
                stopped: 6998652842,
                unknown: 9573370366,
                unregistered: 3794665548,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: '6x7i5v4d1rwcldiroerlmtxogtqse1p4pqw1sdpjcp5wp8e4oz',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: '97gjpsms4yutj366xgvt',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 14:21:49',
                executionMonitoringStartAt: '2020-07-22 20:35:20',
                executionMonitoringEndAt: '2020-07-23 05:35:52',
                error: 5071363295,
                inactive: 9275968242,
                successful: 4297942035,
                stopped: -9,
                unknown: 2555007032,
                unregistered: 3573337316,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'gt7joai8ujt03ldizier30y9o2pwqq8j3mjm2kjsqlwyb8nrrr',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'o12g9lrzt84enq201h72',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 03:31:52',
                executionMonitoringStartAt: '2020-07-22 18:31:30',
                executionMonitoringEndAt: '2020-07-23 08:31:06',
                error: 5898423614,
                inactive: 7824027526,
                successful: 5233770576,
                stopped: 7995652243,
                unknown: -9,
                unregistered: 6568813223,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'lqi0n2irjlwvjwo6vie87f999yovi0u0vci4zjdadlt6t579gx',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'b373fyvgjtr171sbt8uf',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 02:04:18',
                executionMonitoringStartAt: '2020-07-23 11:12:18',
                executionMonitoringEndAt: '2020-07-23 04:21:23',
                error: 9478766725,
                inactive: 4289059000,
                successful: 4749555225,
                stopped: 1843642849,
                unknown: 4449860585,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'e30ivivp0op38jvkh21h8q8m59sw06jr3ua4rclciyeu1b5lnl',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'l5w9yzmsaiwlqh0pbk6t',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-23 00:19:35',
                executionMonitoringStartAt: '2020-07-23 08:29:17',
                executionMonitoringEndAt: '2020-07-23 10:09:28',
                error: 4765849480,
                inactive: 2981221406,
                successful: 8921330006,
                stopped: 5627035163,
                unknown: 7348549310,
                unregistered: 8974241556,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'gxqwf2f2o46a9uwsv94n38bi2924n813aidf99tpgw5to180so',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'k87kjjldjor95emtslud',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-23 04:58:42',
                executionMonitoringEndAt: '2020-07-23 13:04:20',
                error: 7713114221,
                inactive: 4075463264,
                successful: 2472442360,
                stopped: 3688608978,
                unknown: 1602336657,
                unregistered: 6571770770,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: '9su2l1xm1ky4l7acyx2k6yu61965vdjoose9cl72vij6qjgyvu',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: '3ja1q3c87bzq4wtgk35v',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 04:13:15',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-23 12:29:09',
                error: 1963967303,
                inactive: 8383577587,
                successful: 8375732644,
                stopped: 6604294108,
                unknown: 7455853017,
                unregistered: 5594805001,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: '8xm14yhg5z21l0t9dqbym4t9khz5blzmhiou21ev30dx1ziauh',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: '6o8tna4rezmqqcc1cdi5',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 11:57:45',
                executionMonitoringStartAt: '2020-07-23 05:04:42',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 7436797823,
                inactive: 7606007011,
                successful: 1598732477,
                stopped: 8858032837,
                unknown: 4189340258,
                unregistered: 2444622403,
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
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'yxctrmpqsnqgm7d4avp6vrzzx0hwqb0qsnq27qtwisrax41zl5',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'fmv9cqt8kpcxlnmkuzan',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 16:40:02',
                executionMonitoringStartAt: '2020-07-23 11:44:10',
                executionMonitoringEndAt: '2020-07-23 00:33:01',
                error: 2909428691,
                inactive: 3508488949,
                successful: 8374878126,
                stopped: 9060720929,
                unknown: 8394470347,
                unregistered: 1781170983,
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
                        value   : '6f9a6c83-932f-4449-899b-e50362717160'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6f9a6c83-932f-4449-899b-e50362717160'));
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
            .get('/bplus-it-sappi/channel-overview/6f9a6c83-932f-4449-899b-e50362717160')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6f9a6c83-932f-4449-899b-e50362717160'));
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
                
                id: 'bd042002-567c-4926-bfd8-314bb8e53642',
                tenantId: '27103902-7169-4ab6-a9a7-000ea430cfa7',
                tenantCode: 'rjpvod4wjhpvx8ncaaqjurtvyljisk4wqoihdcq1o9rxaurxwp',
                systemId: 'ddaa9f2c-81dd-4891-b6c5-a1ee3ff25abd',
                systemName: 'x17s32prmjj1hxypzq5t',
                executionId: '8da92253-e5bb-42eb-b5f2-202b2b5057db',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 00:41:11',
                executionMonitoringStartAt: '2020-07-23 04:59:57',
                executionMonitoringEndAt: '2020-07-23 06:54:57',
                error: 7110857366,
                inactive: 2867752126,
                successful: 1920855474,
                stopped: 9437581401,
                unknown: 5040743157,
                unregistered: 7312123148,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '6f9a6c83-932f-4449-899b-e50362717160',
                tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                tenantCode: 'uh1xj40zhyweioszb8s20zrjqp1yb8ukz7lrcc73rqgjbw0vzb',
                systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                systemName: 'mmthylmu4awgk5cq379d',
                executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 12:59:36',
                executionMonitoringStartAt: '2020-07-22 22:48:00',
                executionMonitoringEndAt: '2020-07-23 16:39:01',
                error: 5545123496,
                inactive: 3959716644,
                successful: 7008486686,
                stopped: 5295937022,
                unknown: 1930816426,
                unregistered: 7214214602,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6f9a6c83-932f-4449-899b-e50362717160'));
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
            .delete('/bplus-it-sappi/channel-overview/6f9a6c83-932f-4449-899b-e50362717160')
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
                        id: '521de388-2e90-4ecf-a553-027ae1eaf10c',
                        tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                        tenantCode: '53qocg32nc3oklfrpcjum5mdxos5qko8r5s9g0je3s4gwq2ufw',
                        systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                        systemName: 'shpxp0bzncxi7o85amzl',
                        executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 16:48:39',
                        executionMonitoringStartAt: '2020-07-23 06:26:04',
                        executionMonitoringEndAt: '2020-07-22 21:01:15',
                        error: 4628207632,
                        inactive: 3427559622,
                        successful: 6876838526,
                        stopped: 1834091858,
                        unknown: 7338423630,
                        unregistered: 7340889195,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '521de388-2e90-4ecf-a553-027ae1eaf10c');
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
                            value   : '6f9a6c83-932f-4449-899b-e50362717160'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('6f9a6c83-932f-4449-899b-e50362717160');
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
                    id: '6f9a6c83-932f-4449-899b-e50362717160'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('6f9a6c83-932f-4449-899b-e50362717160');
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
                        
                        id: '933c6c6b-4aaa-4d91-81a6-ad1543e3b853',
                        tenantId: '4152ee81-475f-4023-8c14-7865219b5145',
                        tenantCode: 'jfrfjzajwuv0q611tvzhbto7q3ivfkohamu7riezrp16l7cqux',
                        systemId: 'd5c5a7cd-78c6-4cf7-8b6b-8dece4235f22',
                        systemName: 'mhzma8eax9nmvhf9a8ca',
                        executionId: 'ea3305a4-807f-4f95-8ad2-3e80317e65c7',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 03:50:58',
                        executionMonitoringStartAt: '2020-07-22 22:40:20',
                        executionMonitoringEndAt: '2020-07-22 20:44:31',
                        error: 3936108832,
                        inactive: 4177160204,
                        successful: 2276267123,
                        stopped: 3387284300,
                        unknown: 9555867581,
                        unregistered: 5773811930,
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
                        
                        id: '6f9a6c83-932f-4449-899b-e50362717160',
                        tenantId: 'dbfebfc6-57b4-4c9e-a5dc-c05992d8f6d3',
                        tenantCode: 'fuhbul103qw0mumr5g8igztsy0yrsps3ec26jx33ys03msy799',
                        systemId: 'f813bcf4-1d29-40f1-abfc-2f238761bf6e',
                        systemName: '0zch2b4p06wdz0mkl10d',
                        executionId: '260e91a3-6cb4-438e-81dd-390ecb04cfdb',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-23 09:28:34',
                        executionMonitoringStartAt: '2020-07-23 01:26:14',
                        executionMonitoringEndAt: '2020-07-22 23:02:31',
                        error: 2963037864,
                        inactive: 1911729167,
                        successful: 1773601886,
                        stopped: 1239036359,
                        unknown: 9004346794,
                        unregistered: 2658939613,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('6f9a6c83-932f-4449-899b-e50362717160');
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
                    id: '6f9a6c83-932f-4449-899b-e50362717160'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('6f9a6c83-932f-4449-899b-e50362717160');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});