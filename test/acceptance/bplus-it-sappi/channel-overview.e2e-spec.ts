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
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'buxpca8exuem768ah3igznwbiqokdgruzpgdqslow4k22l7hxd',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '1d3qd7tht9psush6p0xt',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 05:19:05',
                executionMonitoringStartAt: '2020-08-03 16:16:30',
                executionMonitoringEndAt: '2020-08-04 09:44:03',
                error: 3991244142,
                inactive: 9268083652,
                successful: 2227167071,
                stopped: 5902677100,
                unknown: 5855627804,
                unregistered: 7085118659,
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
                
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'fjhldj3j5w5yknqhusn9o9lyhiutip4dxxl3fd89bu03idnarf',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '4tb4oywl1yppoizfqu0n',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 18:17:36',
                executionMonitoringStartAt: '2020-08-04 02:10:52',
                executionMonitoringEndAt: '2020-08-04 06:30:36',
                error: 1342810624,
                inactive: 2464102496,
                successful: 2044787189,
                stopped: 1578850898,
                unknown: 1753622516,
                unregistered: 1528202099,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: null,
                tenantCode: 'qwlq6qb0qi4jhbam2v0b3hzqt06niv054oonzzpzlqds8ru6pa',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'yneyfhgcstcjdjk3xe1a',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 18:38:34',
                executionMonitoringStartAt: '2020-08-04 02:17:31',
                executionMonitoringEndAt: '2020-08-04 09:02:35',
                error: 6289236719,
                inactive: 2831168308,
                successful: 5829508477,
                stopped: 8724150850,
                unknown: 6924088812,
                unregistered: 7940160800,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                
                tenantCode: '9foowa7ox4aedg85mc2xftynfcofnzduqbfk9k7buhstm6xhgy',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'e7wmwj7q8rnrkt4ln89w',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:34:05',
                executionMonitoringStartAt: '2020-08-04 07:15:47',
                executionMonitoringEndAt: '2020-08-03 18:58:30',
                error: 5829635468,
                inactive: 2627555762,
                successful: 2496470449,
                stopped: 6953354609,
                unknown: 7531363730,
                unregistered: 6325052354,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: null,
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'b6ewhgbamduxsm56xji0',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:53:35',
                executionMonitoringStartAt: '2020-08-04 05:04:43',
                executionMonitoringEndAt: '2020-08-04 13:34:16',
                error: 6890846903,
                inactive: 4667717579,
                successful: 5772147958,
                stopped: 3777413089,
                unknown: 4765382260,
                unregistered: 2714631168,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '9ppih95vryre0zrtvmzw',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:15:13',
                executionMonitoringStartAt: '2020-08-04 09:36:45',
                executionMonitoringEndAt: '2020-08-03 18:06:25',
                error: 5501008401,
                inactive: 3317153263,
                successful: 6935594880,
                stopped: 7041801613,
                unknown: 8624676791,
                unregistered: 1786447711,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'zsprisdaoayys6bnap3yodhjmhyin7swuffvji9elch05ix8ok',
                systemId: null,
                systemName: 'f9ph0f96jifov1jph5r5',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:26:53',
                executionMonitoringStartAt: '2020-08-03 19:46:57',
                executionMonitoringEndAt: '2020-08-03 19:39:46',
                error: 3238598363,
                inactive: 8067738630,
                successful: 1708658810,
                stopped: 8520331538,
                unknown: 4374405212,
                unregistered: 2535392604,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 's23o95gjqzg7sjjhfax3g5fugb2d59y15nu0oqvx36lm7k6obk',
                
                systemName: '13ue7iq10cmr8sk4qk1z',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 13:40:52',
                executionMonitoringStartAt: '2020-08-04 10:26:24',
                executionMonitoringEndAt: '2020-08-03 18:10:46',
                error: 5449777968,
                inactive: 7801062183,
                successful: 4183377512,
                stopped: 4471968264,
                unknown: 1467315061,
                unregistered: 2953321229,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: '93hsf9jfduhnrner3jzzkxv1t1ruuo7gi0ifno7ckqpxzsqty1',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: null,
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 21:04:04',
                executionMonitoringStartAt: '2020-08-03 18:59:05',
                executionMonitoringEndAt: '2020-08-03 17:48:38',
                error: 7598631785,
                inactive: 8792235779,
                successful: 3311047243,
                stopped: 7542572061,
                unknown: 2204618532,
                unregistered: 1404388689,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'yvcnaexrml4nu2d2spb1e1kpwzjv6ae4dkzbg8rezf7l1a21h8',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:00:58',
                executionMonitoringStartAt: '2020-08-03 17:44:29',
                executionMonitoringEndAt: '2020-08-03 23:26:13',
                error: 1134390053,
                inactive: 8065414163,
                successful: 8924961147,
                stopped: 2684685853,
                unknown: 2213297164,
                unregistered: 5748937471,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'okcex8lqx7zsm4nc5972c38vqegruovzblmh3oxktp5mlkf87w',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'hxaxh4z0esd2cpn59848',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 02:24:51',
                executionMonitoringStartAt: '2020-08-04 05:49:04',
                executionMonitoringEndAt: '2020-08-04 00:13:00',
                error: 2339277080,
                inactive: 5552208718,
                successful: 2181035681,
                stopped: 4900588303,
                unknown: 2151264659,
                unregistered: 3737411037,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: '0s2lysydnk7c94nb8xsidukinirfma77kr3stwgd148a3shuyy',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'eoib3aja83y5ysjlb31f',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 03:25:51',
                executionMonitoringStartAt: '2020-08-04 08:50:37',
                executionMonitoringEndAt: '2020-08-04 10:27:28',
                error: 8519271040,
                inactive: 4385091772,
                successful: 7910186288,
                stopped: 8311954351,
                unknown: 8546987152,
                unregistered: 2354057698,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'mnqem5txje6xgrwxanix5im4aenwf1ndka8lkxt70exizetpw4',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'hlmqulpk1zfd1al9fgyk',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: null,
                executionExecutedAt: '2020-08-04 03:55:04',
                executionMonitoringStartAt: '2020-08-04 07:55:32',
                executionMonitoringEndAt: '2020-08-04 04:08:22',
                error: 8023998613,
                inactive: 2157233453,
                successful: 5120590345,
                stopped: 5229615283,
                unknown: 2438316502,
                unregistered: 6087570876,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'pd4ry1s08fb2lpfzm0jzfe6iwrgcwx1ft4crugx442lf38l0ix',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'gp6bwgtl5p9ukzjh62yt',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                
                executionExecutedAt: '2020-08-04 04:11:27',
                executionMonitoringStartAt: '2020-08-04 01:40:36',
                executionMonitoringEndAt: '2020-08-04 00:37:06',
                error: 6599651142,
                inactive: 6850603456,
                successful: 5049198222,
                stopped: 6428757045,
                unknown: 2883498521,
                unregistered: 1133836514,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'cdh19ab99h0ecautz4npn435mr6z52tt6sjvb61xkd060c321s',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '4f1sroihmwadu2ju8naa',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-03 14:46:00',
                executionMonitoringEndAt: '2020-08-04 12:52:38',
                error: 5509490647,
                inactive: 7613270864,
                successful: 1804148971,
                stopped: 4236456355,
                unknown: 1229821644,
                unregistered: 9053953496,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'f3ul7h0jl6bu4o5wem68kh64oa3j2gvhuto1yqeg673zgqshlu',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '3d3gfbbr8miheo8uq704',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-08-03 17:27:08',
                executionMonitoringEndAt: '2020-08-03 21:52:22',
                error: 1165644015,
                inactive: 8931395369,
                successful: 9435121462,
                stopped: 1647070167,
                unknown: 7674714954,
                unregistered: 5036617134,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'et21xq20ib70cxeaun651s59v4kguyxu4fmny7gf6w2xyron3x',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'bnnxf84fm44td760kxsx',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 08:40:24',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-04 12:06:25',
                error: 9252218204,
                inactive: 7105237882,
                successful: 5993880280,
                stopped: 4367298289,
                unknown: 2211141773,
                unregistered: 4275098579,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'gm7ilww5lzwjqudttk4fob31fnu9zo3icct12ewljnfubph3fe',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '85bvoock636ot9wcvle2',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 02:50:51',
                
                executionMonitoringEndAt: '2020-08-04 13:19:00',
                error: 1364093294,
                inactive: 2457172369,
                successful: 4032114400,
                stopped: 3200886883,
                unknown: 8353946271,
                unregistered: 6060999439,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'lk90brh40dkfvar1sn7yagkwt63fhfmuw7a3wj1bybe2j0pq67',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'pl5f6wku4gtsia7lvk35',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 04:38:39',
                executionMonitoringStartAt: '2020-08-04 10:08:51',
                executionMonitoringEndAt: null,
                error: 8421106651,
                inactive: 4168385838,
                successful: 8027164789,
                stopped: 2748461968,
                unknown: 6203698332,
                unregistered: 7848027083,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'r1moatebnev6mtzde4lcol1zod1nftfni3ajvny243vq23s6yu',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'hhsoky8f54f1g74xfjrc',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 12:17:25',
                executionMonitoringStartAt: '2020-08-04 00:49:08',
                
                error: 3660946032,
                inactive: 2716058453,
                successful: 7147401870,
                stopped: 4520401453,
                unknown: 7854872260,
                unregistered: 2702718412,
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
                id: 'ym3c79enbw8krwreuwn8s7ktzco2pzrf4qm9r',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'z22w5pju7gfslrpxup7bvetol8m1x9bm7q0cpqhcrddhfjz7y0',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'i5olla3y87tq3g0l6agp',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 14:04:04',
                executionMonitoringStartAt: '2020-08-04 08:52:47',
                executionMonitoringEndAt: '2020-08-04 07:43:10',
                error: 9949189732,
                inactive: 2291912513,
                successful: 2291346305,
                stopped: 8377012297,
                unknown: 2672162973,
                unregistered: 7216154904,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'khmd0at7v9oh81262pmgig3jar6andqrea1lg',
                tenantCode: 'l7g2rf56shevoai1clovr4k4jsrqwzk7t7advlkb6ezymfclr2',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'tvvxpfjpp4yjl5bgfxzo',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 14:44:22',
                executionMonitoringStartAt: '2020-08-04 07:01:03',
                executionMonitoringEndAt: '2020-08-04 13:40:50',
                error: 7841452712,
                inactive: 5352278772,
                successful: 2491460105,
                stopped: 2037262043,
                unknown: 3396232374,
                unregistered: 3135315603,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: '7p7c02bztz8rd4q6jdg09q4d29g8knvkpm1q6t6kor6fco7t05',
                systemId: '4tua0ut9tmnk3ti5cjwjv4wezgzkucuh13klh',
                systemName: '7dgzxlmvaeccox6hcn2i',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 09:48:18',
                executionMonitoringStartAt: '2020-08-03 14:51:32',
                executionMonitoringEndAt: '2020-08-04 10:07:34',
                error: 1839891299,
                inactive: 8020179806,
                successful: 4660291252,
                stopped: 6464004380,
                unknown: 2888597844,
                unregistered: 4138877595,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: '1gc6k3jatdzn96vkx5bp9m2dlnuut40cmvl13gztgdaxpxau6e',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'urt8zt57iuef6mg21mxh',
                executionId: '8aasoioad2rofzhxdunds979dvxoojpuv8w4c',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 02:43:35',
                executionMonitoringStartAt: '2020-08-04 14:28:33',
                executionMonitoringEndAt: '2020-08-03 21:24:57',
                error: 3569810791,
                inactive: 6701489721,
                successful: 3485384953,
                stopped: 7637128723,
                unknown: 9598660054,
                unregistered: 4147148564,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'x3yqmaap8l5gvkvvc261gxll355d6zklc8yj5794o80j45gfa5i',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 's0j9zx77y6dkrgad6vzy',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 02:37:05',
                executionMonitoringStartAt: '2020-08-03 20:20:03',
                executionMonitoringEndAt: '2020-08-03 19:19:09',
                error: 3411117829,
                inactive: 4112565536,
                successful: 6325922477,
                stopped: 1839825224,
                unknown: 5187633121,
                unregistered: 3065925737,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'rfp6a8myu7w9xzj261d2r3er92mypxg5yynyt4mat2ur57pxdz',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '3881q6h5essp6e74q9jn5',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 16:43:06',
                executionMonitoringStartAt: '2020-08-03 23:37:13',
                executionMonitoringEndAt: '2020-08-04 11:28:31',
                error: 5715912146,
                inactive: 5325026655,
                successful: 2559979005,
                stopped: 2774780578,
                unknown: 3495941772,
                unregistered: 2918884792,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'hxhqqn8xnrdt6k2uowuznnks3vi6phypjliesppolecgycnuyh',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '0aftywsmcllcn54hi70b',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 13:17:12',
                executionMonitoringStartAt: '2020-08-03 18:42:44',
                executionMonitoringEndAt: '2020-08-04 14:21:23',
                error: 61914907107,
                inactive: 3314422240,
                successful: 3798353618,
                stopped: 2357157163,
                unknown: 6997131571,
                unregistered: 5049638002,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'rxa1t3paz8d6h0wrznwfiic144ghj2ic4s9fz73ik3htoyb9ww',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'j4g0ddv8mgf7s3x8l5mv',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 22:03:04',
                executionMonitoringStartAt: '2020-08-04 02:18:40',
                executionMonitoringEndAt: '2020-08-03 21:58:53',
                error: 5380294501,
                inactive: 60494919504,
                successful: 5734024302,
                stopped: 6452041046,
                unknown: 8665937664,
                unregistered: 4857274242,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'yx17y07x9wrtcr9zhm1m2aehyubuaw688zbgjyqkjh2o4ug7ow',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'y9biqbin3ejxh02914vo',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 03:49:10',
                executionMonitoringStartAt: '2020-08-03 14:47:23',
                executionMonitoringEndAt: '2020-08-04 05:16:08',
                error: 1828864645,
                inactive: 2274228683,
                successful: 11931235703,
                stopped: 1622525897,
                unknown: 3328780061,
                unregistered: 3739886292,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'e9w6wyoctb3jpzga2go74fzspseqgpsql5o3m4yx1jcso6akx0',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '319acd7jtsnyqbserj06',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 22:37:34',
                executionMonitoringStartAt: '2020-08-04 14:23:27',
                executionMonitoringEndAt: '2020-08-03 16:55:24',
                error: 6378136300,
                inactive: 1097535380,
                successful: 4954647807,
                stopped: 56016084491,
                unknown: 5523431183,
                unregistered: 1592511850,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'ct22ljjeyzea9a4o617pz2yuhbf1fmsyq4zbe99mb4pka3fujx',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '39xx1y45kwy7utu3i9ua',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 20:40:00',
                executionMonitoringStartAt: '2020-08-04 06:27:58',
                executionMonitoringEndAt: '2020-08-03 18:04:25',
                error: 9020137460,
                inactive: 2385571135,
                successful: 6221664796,
                stopped: 1437936870,
                unknown: 31765779023,
                unregistered: 9885058547,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'z7fnjeexvef28v13d63d8vmiz8wrc4pwwe8y9i9pfw6z6drn4d',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '4lnuhc6hgtzkeyhagusv',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 02:35:51',
                executionMonitoringStartAt: '2020-08-04 08:27:51',
                executionMonitoringEndAt: '2020-08-03 18:42:29',
                error: 7376489392,
                inactive: 4625331854,
                successful: 4038252430,
                stopped: 3639959371,
                unknown: 4625877177,
                unregistered: 35963261822,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'ndkm93ef40a4iugwvvxsn3c59gr86nahrm46h7t7w593zw27w1',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'r28mijax3tt1dlpnzgk1',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-04 07:50:31',
                executionMonitoringStartAt: '2020-08-04 11:16:21',
                executionMonitoringEndAt: '2020-08-03 20:05:35',
                error: -9,
                inactive: 9720068472,
                successful: 2790633195,
                stopped: 8147196538,
                unknown: 1127828692,
                unregistered: 8748975958,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'q1939i3blvpw5aczdz76sd2alh4b6tiudqhbvyuejfwhanlnjp',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '1guybqeaxng29pvwqbzs',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 18:58:15',
                executionMonitoringStartAt: '2020-08-04 04:00:53',
                executionMonitoringEndAt: '2020-08-04 05:29:39',
                error: 3734294429,
                inactive: -9,
                successful: 5967118367,
                stopped: 9961839937,
                unknown: 8734673997,
                unregistered: 6528450934,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: '55kauuaq4nvn6eyzlh5syzrjn9vbpfb65m3tib6upnnfiwurg5',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'bdpf722o53uy3fpc3o5t',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:17:00',
                executionMonitoringStartAt: '2020-08-04 09:26:50',
                executionMonitoringEndAt: '2020-08-04 13:37:14',
                error: 5689756320,
                inactive: 4834159902,
                successful: -9,
                stopped: 1109499487,
                unknown: 5284023265,
                unregistered: 4656960327,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: '9yiyiyi76pngemob51vf4kyv86poqb5unqfrq6u30u81kpnrcb',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '703krgw8eqz62xi3h04t',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 16:00:11',
                executionMonitoringStartAt: '2020-08-03 17:10:58',
                executionMonitoringEndAt: '2020-08-03 18:17:08',
                error: 6143412244,
                inactive: 9972058656,
                successful: 7067344286,
                stopped: -9,
                unknown: 2626617601,
                unregistered: 2197878438,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'g3fwr0h3a8rg5j7snwz1h2vps7onyc2o33m4aqcw9xqia9l3tx',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'mj9a84v0dxifa8h4mnsm',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 07:48:36',
                executionMonitoringStartAt: '2020-08-04 05:38:40',
                executionMonitoringEndAt: '2020-08-04 10:08:19',
                error: 4791512138,
                inactive: 1414825477,
                successful: 5566688173,
                stopped: 8544981391,
                unknown: -9,
                unregistered: 9047978557,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'sxt3hohr3rd5posra0enkcyhx7782o9bz9mdusisz9t2xiozka',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'ftj96zd8ze4byumll8d8',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:20:53',
                executionMonitoringStartAt: '2020-08-03 18:58:32',
                executionMonitoringEndAt: '2020-08-04 02:04:17',
                error: 3231357137,
                inactive: 4881698218,
                successful: 2039936743,
                stopped: 6456663392,
                unknown: 9231842615,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'yrlfpcetb1ys3122ln9uwkniyswg99ca5hh9w4rw055bee4lq7',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'etut2j6rzodsscftohoy',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-04 06:21:28',
                executionMonitoringStartAt: '2020-08-04 08:54:59',
                executionMonitoringEndAt: '2020-08-03 17:30:54',
                error: 1813708614,
                inactive: 7437697840,
                successful: 3214223215,
                stopped: 6251876950,
                unknown: 5308442872,
                unregistered: 4780324179,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'e5dbqk4ilkkkzt44w3udzhoc7j903cerq91zel69z2djxmi5vz',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: '5sz0l99dr26cvwmyz7rr',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-04 00:49:29',
                executionMonitoringEndAt: '2020-08-04 12:03:34',
                error: 8940399654,
                inactive: 6654395139,
                successful: 8532844104,
                stopped: 2638245355,
                unknown: 3658308065,
                unregistered: 2319780143,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'wkk9b7teuwzhgeddn9mxmlvygw8vz19dk1ktf30g0eubmtir55',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'cuxtpmxyex2n7un5x53r',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:52:32',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-03 17:56:15',
                error: 1731772696,
                inactive: 6539946719,
                successful: 8094034346,
                stopped: 2120949108,
                unknown: 3367537171,
                unregistered: 7805278840,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'wvne70gjs0t7e28auduzenc88lk8gnpume5vctxmtc4zxaw9bi',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'sar5lmly3hog29c7e5q8',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 07:02:27',
                executionMonitoringStartAt: '2020-08-04 05:37:50',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 5986781346,
                inactive: 1823462205,
                successful: 8631750747,
                stopped: 8785303791,
                unknown: 5071541215,
                unregistered: 5949244404,
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
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: '538y3dwamzffjg4kc6jikmkdr9z9dkekzzwu221vtjnrzqm3t2',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'yqvfvzqe09rk4b9dgbc4',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-04 14:26:08',
                executionMonitoringStartAt: '2020-08-03 16:16:51',
                executionMonitoringEndAt: '2020-08-04 08:57:58',
                error: 7407509148,
                inactive: 5074331344,
                successful: 7470094849,
                stopped: 2155299218,
                unknown: 8393631770,
                unregistered: 2280803985,
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
                        value   : 'f93aeffc-5e7a-456c-87b7-1941de16f68b'
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
                        value   : '7d62f63f-4445-474f-a39f-cee2a04844dc'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7d62f63f-4445-474f-a39f-cee2a04844dc'));
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/7b95b5d5-e5f1-4786-a62c-31b3bd61b34f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/7d62f63f-4445-474f-a39f-cee2a04844dc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7d62f63f-4445-474f-a39f-cee2a04844dc'));
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
                
                id: '9aabccbb-347a-43be-b90c-426c287f67cc',
                tenantId: '0064df06-c4a5-45c0-bb66-23e96d6a3b48',
                tenantCode: 'zz74vayissa8jmvr8rsdi02xqqlfymsmlycyf3s5vy59aqjsfa',
                systemId: '794c3fee-b3ba-40a2-a5c8-b943e37ccbb6',
                systemName: '80lj4fygtq9d2gcdftq5',
                executionId: '90776a26-0b80-45f7-b783-68024b46ea46',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 20:51:32',
                executionMonitoringStartAt: '2020-08-03 22:47:12',
                executionMonitoringEndAt: '2020-08-04 12:21:13',
                error: 9909320469,
                inactive: 8136875152,
                successful: 2011635005,
                stopped: 8815993587,
                unknown: 6511826195,
                unregistered: 9314815832,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                tenantCode: 'uvelfgsg110k4b9czqqndpbs05z0qt0jc5lnpmox7e4te8oe6l',
                systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                systemName: 'uk7qifu9nhqh59ho81x4',
                executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 21:54:25',
                executionMonitoringStartAt: '2020-08-03 22:15:12',
                executionMonitoringEndAt: '2020-08-04 12:04:22',
                error: 3673197435,
                inactive: 7823298067,
                successful: 2485791060,
                stopped: 1427984956,
                unknown: 3811753715,
                unregistered: 5098404877,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7d62f63f-4445-474f-a39f-cee2a04844dc'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/920970b6-1f55-4b0a-8d6e-a154d4d81a96')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/7d62f63f-4445-474f-a39f-cee2a04844dc')
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
                        id: '16a66c36-543a-4ce5-b865-940fcb0edda5',
                        tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                        tenantCode: 'kn4qqdog9pm7qcm79sff57phyae1te09trxlemmgvirqiit1j7',
                        systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                        systemName: 'w9s9wqrhj623foa6hy9w',
                        executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-04 13:30:02',
                        executionMonitoringStartAt: '2020-08-03 17:58:57',
                        executionMonitoringEndAt: '2020-08-04 10:04:21',
                        error: 6100039398,
                        inactive: 5090308888,
                        successful: 2283803679,
                        stopped: 8101349637,
                        unknown: 6894461468,
                        unregistered: 3030315646,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '16a66c36-543a-4ce5-b865-940fcb0edda5');
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
                            value   : '41b49ba1-a79e-49af-93b5-76de49ae1d45'
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
                            value   : '7d62f63f-4445-474f-a39f-cee2a04844dc'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('7d62f63f-4445-474f-a39f-cee2a04844dc');
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
                    id: '754a9ee0-c76a-483f-bf52-1e7bb9d5f809'
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
                    id: '7d62f63f-4445-474f-a39f-cee2a04844dc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('7d62f63f-4445-474f-a39f-cee2a04844dc');
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
                        
                        id: '565fa624-9821-468a-b3d2-e1298c62babb',
                        tenantId: '0c16a411-4f8b-45de-bc6e-155f1ca4f10d',
                        tenantCode: 'imfwyeoe8hh1hzzsgu46vfwv2v23p9c76joxgx6548mwl0wy6u',
                        systemId: '61d711e9-579f-4e8a-b921-494756edb85d',
                        systemName: 'b1uope67c3lnxv1ub47j',
                        executionId: '9463a131-89d1-483e-956a-ae2ce9d43ca8',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-04 07:56:55',
                        executionMonitoringStartAt: '2020-08-04 01:42:49',
                        executionMonitoringEndAt: '2020-08-04 09:17:22',
                        error: 9139228423,
                        inactive: 4470716535,
                        successful: 2195039605,
                        stopped: 2276973321,
                        unknown: 8468633339,
                        unregistered: 6103635837,
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
                        
                        id: '7d62f63f-4445-474f-a39f-cee2a04844dc',
                        tenantId: 'b932df4e-98cf-41ae-9849-5d51c58b5188',
                        tenantCode: 'bbnrhwjwytuvan7wx0609xahnyz117kw0gsz492by0z1cr74tq',
                        systemId: 'e5f96693-ce9a-495c-9ba9-be801de256fc',
                        systemName: '14iojlr4ulukmf95j313',
                        executionId: '9f1cb69d-0ea1-4a78-bc48-7b6ef1be812d',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 14:47:30',
                        executionMonitoringStartAt: '2020-08-04 10:23:20',
                        executionMonitoringEndAt: '2020-08-04 14:01:37',
                        error: 2109385672,
                        inactive: 5818869859,
                        successful: 7089252006,
                        stopped: 9440004999,
                        unknown: 2483217023,
                        unregistered: 5421828258,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('7d62f63f-4445-474f-a39f-cee2a04844dc');
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
                    id: 'f5d87166-8dba-4a06-a6a2-2cc8b18d7a7f'
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
                    id: '7d62f63f-4445-474f-a39f-cee2a04844dc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('7d62f63f-4445-474f-a39f-cee2a04844dc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});