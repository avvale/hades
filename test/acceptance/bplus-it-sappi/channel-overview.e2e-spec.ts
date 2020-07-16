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

describe('channel-overview', () => 
{
    let app: INestApplication;
    let repository: MockChannelOverviewRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'gw253ergqzlbi22co5az',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 11:53:19',
                executionMonitoringStartAt: '2020-07-16 18:23:47',
                executionMonitoringEndAt: '2020-07-16 07:25:05',
                error: 6345626496,
                inactive: 2305348093,
                successful: 3378286832,
                stopped: 1952511956,
                unknown: 7922814309,
                unregistered: 5548582711,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'yympks22mxkeoh530vtc',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 09:25:24',
                executionMonitoringStartAt: '2020-07-16 14:57:14',
                executionMonitoringEndAt: '2020-07-15 19:38:46',
                error: 7604429158,
                inactive: 9153318981,
                successful: 3288024190,
                stopped: 4616800874,
                unknown: 7088065729,
                unregistered: 8021478228,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: null,
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'vucsf6kdlb76mmoj445e',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 03:55:35',
                executionMonitoringStartAt: '2020-07-16 09:32:45',
                executionMonitoringEndAt: '2020-07-16 14:53:43',
                error: 2354942640,
                inactive: 6241250955,
                successful: 1343320316,
                stopped: 1745967966,
                unknown: 8766200751,
                unregistered: 7273694914,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'pw074r3w5dzpysg3zdwq',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 07:41:23',
                executionMonitoringStartAt: '2020-07-16 05:11:00',
                executionMonitoringEndAt: '2020-07-16 04:38:02',
                error: 8648953804,
                inactive: 9020516197,
                successful: 6507562835,
                stopped: 5505350439,
                unknown: 7264973657,
                unregistered: 8688355705,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: null,
                systemName: 'rx1t6obd8gj64eu2s3dc',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 23:42:10',
                executionMonitoringStartAt: '2020-07-15 22:54:41',
                executionMonitoringEndAt: '2020-07-16 06:41:47',
                error: 1257967287,
                inactive: 7320616954,
                successful: 8600922682,
                stopped: 1433020549,
                unknown: 9913503226,
                unregistered: 3922575322,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                
                systemName: 'iuzaz95cviyyu7qmaqdo',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 16:00:27',
                executionMonitoringStartAt: '2020-07-16 17:13:28',
                executionMonitoringEndAt: '2020-07-16 07:33:01',
                error: 6304278078,
                inactive: 8449471018,
                successful: 5643603061,
                stopped: 8950004982,
                unknown: 9360793700,
                unregistered: 8851045529,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: null,
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 14:19:07',
                executionMonitoringStartAt: '2020-07-16 19:00:49',
                executionMonitoringEndAt: '2020-07-16 02:13:54',
                error: 7330789463,
                inactive: 8226435646,
                successful: 9960415453,
                stopped: 8006352613,
                unknown: 5773121558,
                unregistered: 7547027565,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:12:07',
                executionMonitoringStartAt: '2020-07-16 09:45:06',
                executionMonitoringEndAt: '2020-07-16 13:51:59',
                error: 4480895172,
                inactive: 6584148772,
                successful: 8464231665,
                stopped: 2349226692,
                unknown: 8637029232,
                unregistered: 4613644289,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: '2hqpu6r892dc2qmh2kjy',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 04:53:57',
                executionMonitoringStartAt: '2020-07-16 08:11:39',
                executionMonitoringEndAt: '2020-07-16 14:38:40',
                error: 1238989912,
                inactive: 8356513774,
                successful: 8649977743,
                stopped: 3435521212,
                unknown: 3092272863,
                unregistered: 1937429252,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: '8tm6v7qdd9mstbya4kwy',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:04:51',
                executionMonitoringStartAt: '2020-07-15 19:44:32',
                executionMonitoringEndAt: '2020-07-16 09:57:38',
                error: 8075536752,
                inactive: 4288131606,
                successful: 6420710149,
                stopped: 7987325078,
                unknown: 3131692455,
                unregistered: 8647965104,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'x4ou1dstq2e2rlt6dusr',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: null,
                executionExecutedAt: '2020-07-16 15:51:02',
                executionMonitoringStartAt: '2020-07-15 22:04:56',
                executionMonitoringEndAt: '2020-07-16 18:53:36',
                error: 3400424322,
                inactive: 8897655535,
                successful: 8873088637,
                stopped: 7239353060,
                unknown: 7903314710,
                unregistered: 6343823949,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'bp0oox0o78vxvbltwzue',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                
                executionExecutedAt: '2020-07-16 10:31:45',
                executionMonitoringStartAt: '2020-07-16 07:49:56',
                executionMonitoringEndAt: '2020-07-15 20:51:44',
                error: 1056768810,
                inactive: 2554189608,
                successful: 1852689492,
                stopped: 4757928648,
                unknown: 5283761430,
                unregistered: 5723868519,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'vo0whwq8pa86qvnql955',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-16 09:22:13',
                executionMonitoringEndAt: '2020-07-16 01:27:04',
                error: 4993826293,
                inactive: 7909765433,
                successful: 6301473171,
                stopped: 7798832914,
                unknown: 1561578763,
                unregistered: 1160339010,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'nqp9v942w719p515iy09',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-16 01:49:16',
                executionMonitoringEndAt: '2020-07-16 08:49:54',
                error: 2491138640,
                inactive: 9423956880,
                successful: 8113207644,
                stopped: 1748462045,
                unknown: 3264458847,
                unregistered: 2943555886,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'sssoonjhsf9tt6mizu3n',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 03:04:19',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-15 22:51:28',
                error: 7164131413,
                inactive: 7519433815,
                successful: 8958262156,
                stopped: 8802574484,
                unknown: 9396810694,
                unregistered: 3708653978,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'puguooqu5zwmhb7gwjjb',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 09:31:55',
                
                executionMonitoringEndAt: '2020-07-16 16:13:27',
                error: 7880102111,
                inactive: 7218106586,
                successful: 7366899845,
                stopped: 4724018085,
                unknown: 2456017144,
                unregistered: 4237944603,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'buw3ewlpkz0q0ygbm4sb',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 19:07:50',
                executionMonitoringStartAt: '2020-07-16 00:00:02',
                executionMonitoringEndAt: null,
                error: 1931044614,
                inactive: 5262616204,
                successful: 4739703216,
                stopped: 2800460831,
                unknown: 7838975963,
                unregistered: 9688522604,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'glz9985se3q3mxg9kxst',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 07:47:57',
                executionMonitoringStartAt: '2020-07-15 20:12:20',
                
                error: 8596210772,
                inactive: 2882005956,
                successful: 9322898869,
                stopped: 8978493821,
                unknown: 6702024109,
                unregistered: 2600097994,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'hmwgisyawdk5l5ouhog5y20uprbezzyjwy4l2',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: '9fwqmg6ktonw89lmn0xg',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 04:39:52',
                executionMonitoringStartAt: '2020-07-16 04:39:49',
                executionMonitoringEndAt: '2020-07-16 12:12:18',
                error: 9522452909,
                inactive: 8958143803,
                successful: 3975082923,
                stopped: 8772752498,
                unknown: 2739743769,
                unregistered: 8834809992,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: '2yylq3k928kflcwh28cu1rcuuwuk7gkim0aef',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: '4rfnxzuiwp5pgigqp1fe',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 10:21:05',
                executionMonitoringStartAt: '2020-07-16 02:45:04',
                executionMonitoringEndAt: '2020-07-16 07:41:47',
                error: 9090112925,
                inactive: 5138581604,
                successful: 7994038462,
                stopped: 8246316481,
                unknown: 1981180032,
                unregistered: 5230699432,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'tvrv3k03rh9oq7o26174vobkx5mn4z5ihdmfq',
                systemName: '95ib0uysxa7l7wes9ev7',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 23:18:37',
                executionMonitoringStartAt: '2020-07-15 23:44:19',
                executionMonitoringEndAt: '2020-07-16 11:39:48',
                error: 9371903373,
                inactive: 9102400205,
                successful: 7734796936,
                stopped: 2218078533,
                unknown: 6087047633,
                unregistered: 4502538844,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'k2kwo9k7vp1v1f4u48fx',
                executionId: 'f709zfnd77rapga38xw9bvf4bsgwn3kaiztue',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 06:21:16',
                executionMonitoringStartAt: '2020-07-16 10:15:58',
                executionMonitoringEndAt: '2020-07-15 22:12:02',
                error: 3679039931,
                inactive: 2962319336,
                successful: 6712246733,
                stopped: 9164503147,
                unknown: 1783586291,
                unregistered: 3025917294,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'rwsij00dqivrdbxcfmsnb',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 08:35:04',
                executionMonitoringStartAt: '2020-07-15 20:04:28',
                executionMonitoringEndAt: '2020-07-15 23:26:19',
                error: 5391660059,
                inactive: 3256101518,
                successful: 7857027649,
                stopped: 9630554099,
                unknown: 7230994195,
                unregistered: 8096342441,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: '1iz2abbua9zn14c7qtxr',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:30:55',
                executionMonitoringStartAt: '2020-07-16 09:09:21',
                executionMonitoringEndAt: '2020-07-15 23:48:35',
                error: 78483553206,
                inactive: 4108284672,
                successful: 1561723858,
                stopped: 5780544300,
                unknown: 3750900128,
                unregistered: 8257575901,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewError is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'fqyawvkv308bvcfvvfu0',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 11:01:37',
                executionMonitoringStartAt: '2020-07-15 20:29:40',
                executionMonitoringEndAt: '2020-07-16 00:58:19',
                error: 4345769855,
                inactive: 17830312150,
                successful: 8781233812,
                stopped: 6696804248,
                unknown: 3304817105,
                unregistered: 5609806823,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewInactive is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'ljqa6f7rpga6v5bmjfqj',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 17:26:07',
                executionMonitoringStartAt: '2020-07-16 18:14:18',
                executionMonitoringEndAt: '2020-07-16 13:01:01',
                error: 4933656485,
                inactive: 1229752183,
                successful: 78967336524,
                stopped: 9063428569,
                unknown: 7339434891,
                unregistered: 2007304993,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewSuccessful is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'gktuv90ioegfaflz5184',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 02:45:16',
                executionMonitoringStartAt: '2020-07-16 05:57:16',
                executionMonitoringEndAt: '2020-07-16 14:11:57',
                error: 9165256557,
                inactive: 8097582954,
                successful: 7076356288,
                stopped: 20505928097,
                unknown: 7983714247,
                unregistered: 5649820010,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewStopped is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'aedsdrlln79xjx2wzz7x',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 13:42:57',
                executionMonitoringStartAt: '2020-07-15 19:41:56',
                executionMonitoringEndAt: '2020-07-16 18:09:45',
                error: 2808846314,
                inactive: 3737337065,
                successful: 2087528870,
                stopped: 6008542392,
                unknown: 61563301178,
                unregistered: 5501066030,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnknown is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'xawxe6n72idwu2u4fq96',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 16:08:44',
                executionMonitoringStartAt: '2020-07-16 16:10:26',
                executionMonitoringEndAt: '2020-07-16 11:48:07',
                error: 9301737205,
                inactive: 2124412465,
                successful: 4796692174,
                stopped: 2791882216,
                unknown: 7489648572,
                unregistered: 71683663491,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewUnregistered is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'ojgkun0tyvcw2sagh0oe',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 15:00:24',
                executionMonitoringStartAt: '2020-07-15 23:08:43',
                executionMonitoringEndAt: '2020-07-16 14:41:53',
                error: -9,
                inactive: 8372056400,
                successful: 9706913396,
                stopped: 4392541942,
                unknown: 6751809697,
                unregistered: 2280256884,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewInactive must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'o3054zuvfefrg5ckgmry',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-15 22:07:29',
                executionMonitoringStartAt: '2020-07-16 14:26:31',
                executionMonitoringEndAt: '2020-07-16 07:12:58',
                error: 4941091063,
                inactive: -9,
                successful: 2843051489,
                stopped: 3281615753,
                unknown: 4901375046,
                unregistered: 5979899377,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewInactive must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewSuccessful must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: '3moj1p1mqfjdk95hfghy',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 15:39:51',
                executionMonitoringStartAt: '2020-07-15 23:58:18',
                executionMonitoringEndAt: '2020-07-16 05:50:03',
                error: 9892844296,
                inactive: 3411375285,
                successful: -9,
                stopped: 4331491244,
                unknown: 1608930157,
                unregistered: 1834846508,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewSuccessful must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewStopped must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'g5tzqht3th0qxez093mo',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 23:36:47',
                executionMonitoringStartAt: '2020-07-16 13:54:58',
                executionMonitoringEndAt: '2020-07-16 17:53:36',
                error: 7006497385,
                inactive: 8949758945,
                successful: 8628618247,
                stopped: -9,
                unknown: 8803661719,
                unregistered: 1880743144,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewStopped must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnknown must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'vzrnpys3wq0btes8y6qb',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:32:31',
                executionMonitoringStartAt: '2020-07-16 03:54:05',
                executionMonitoringEndAt: '2020-07-16 12:18:39',
                error: 2111292212,
                inactive: 2846653223,
                successful: 9862606353,
                stopped: 7541337493,
                unknown: -9,
                unregistered: 4118117461,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnknown must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewUnregistered must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'tpnv82epw20kwvgyfaxd',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-15 21:43:31',
                executionMonitoringStartAt: '2020-07-16 04:19:31',
                executionMonitoringEndAt: '2020-07-16 10:25:13',
                error: 2354044151,
                inactive: 8579276306,
                successful: 1049902970,
                stopped: 4933964551,
                unknown: 7171419356,
                unregistered: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelOverviewUnregistered must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: '8vufr09dxcgw51bj54jr',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-16 16:45:23',
                executionMonitoringStartAt: '2020-07-15 20:23:32',
                executionMonitoringEndAt: '2020-07-15 21:40:39',
                error: 2234349250,
                inactive: 8140649022,
                successful: 1005166907,
                stopped: 3067273915,
                unknown: 6946614646,
                unregistered: 2132995882,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'tk22rce9xv6tmwikzqbe',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-16 11:51:27',
                executionMonitoringEndAt: '2020-07-15 22:21:26',
                error: 2768036368,
                inactive: 8873084918,
                successful: 2394489896,
                stopped: 7762077685,
                unknown: 5660590707,
                unregistered: 1587185259,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: '8r5eolzoj1koune9zpw8',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 03:55:27',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-16 16:30:02',
                error: 8008730580,
                inactive: 3133702416,
                successful: 9187850793,
                stopped: 4210053328,
                unknown: 8380506212,
                unregistered: 1856830140,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/channel-overview - Got 400 Conflict, ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'bfktiucdcwfz0kc29zqi',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 01:12:28',
                executionMonitoringStartAt: '2020-07-16 15:37:23',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 3579849648,
                inactive: 1721332570,
                successful: 6572293265,
                stopped: 8083731457,
                unknown: 6467879198,
                unregistered: 9866322653,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: '0qoh1n2an2v1wyad7jqf',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:53:47',
                executionMonitoringStartAt: '2020-07-15 20:25:31',
                executionMonitoringEndAt: '2020-07-15 19:47:55',
                error: 3464017934,
                inactive: 2189179565,
                successful: 7163162475,
                stopped: 4905536523,
                unknown: 2321039328,
                unregistered: 4334596361,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/channels-overview/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/channel-overview`, () => 
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
                        value   : '22fe1091-7078-4c95-b84b-94402647016b'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '22fe1091-7078-4c95-b84b-94402647016b'));
    });

    it(`/REST:GET bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel-overview/22fe1091-7078-4c95-b84b-94402647016b')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '22fe1091-7078-4c95-b84b-94402647016b'));
    });

    it(`/REST:GET bplus-it-sappi/channels-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/channel-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '457835cb-4b28-42e6-9375-6692783e039e',
                tenantId: '154cc3ce-3156-4945-955b-f8854f78e518',
                systemId: 'df9d5555-b824-449b-bd7e-d66b94a55543',
                systemName: 'epyq6yptg5xejgd6nfu5',
                executionId: 'fb3800fa-5d3d-4bb4-b807-4fa96add65b7',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 11:25:37',
                executionMonitoringStartAt: '2020-07-16 09:53:09',
                executionMonitoringEndAt: '2020-07-16 07:49:45',
                error: 9589634900,
                inactive: 7242706396,
                successful: 1421558827,
                stopped: 4623545592,
                unknown: 8414556572,
                unregistered: 4802449543,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '22fe1091-7078-4c95-b84b-94402647016b',
                tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                systemName: 'ejiqfv4w13gpgv86m5za',
                executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 12:10:51',
                executionMonitoringStartAt: '2020-07-16 19:09:00',
                executionMonitoringEndAt: '2020-07-16 03:03:37',
                error: 3971380805,
                inactive: 3561837419,
                successful: 2252095132,
                stopped: 9933636337,
                unknown: 7020294806,
                unregistered: 1934573149,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '22fe1091-7078-4c95-b84b-94402647016b'));
    });

    it(`/REST:DELETE bplus-it-sappi/channel-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/channel-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel-overview/22fe1091-7078-4c95-b84b-94402647016b')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateChannelOverview - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateChannelOverview`, () => 
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
                        id: '3b8c0a9e-ad2a-42fd-b4d3-52c93baf9a34',
                        tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                        systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                        systemName: 'zlqrk2di92jhk2hyvxs3',
                        executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-15 22:17:59',
                        executionMonitoringStartAt: '2020-07-16 01:44:06',
                        executionMonitoringEndAt: '2020-07-16 03:39:31',
                        error: 5611791243,
                        inactive: 7148781140,
                        successful: 3690163781,
                        stopped: 5477670732,
                        unknown: 7220521761,
                        unregistered: 2493982801,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '3b8c0a9e-ad2a-42fd-b4d3-52c93baf9a34');
            });
    });

    it(`/GraphQL bplusItSappiPaginateChannelsOverview`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelOverview - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelOverview`, () => 
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
                            value   : '22fe1091-7078-4c95-b84b-94402647016b'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('22fe1091-7078-4c95-b84b-94402647016b');
            });
    });

    it(`/GraphQL bplusItSappiFindChannelOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindChannelOverviewById`, () => 
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
                    id: '22fe1091-7078-4c95-b84b-94402647016b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('22fe1091-7078-4c95-b84b-94402647016b');
            });
    });

    it(`/GraphQL bplusItSappiGetChannelsOverview`, () => 
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

    it(`/GraphQL bplusItSappiUpdateChannelOverview - Got 404 Not Found`, () => 
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
                        
                        id: 'fea39bbb-16b5-4d39-8cb5-355fc3369710',
                        tenantId: 'bbdd702d-b89e-4b37-baba-d09c8e759075',
                        systemId: 'dca22920-613c-48ae-b916-ae33926133bd',
                        systemName: 'vq1b1qlaect1eo7z1tk6',
                        executionId: 'ac07ba0e-47ed-49a3-b10e-8d59533c0f21',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-15 23:32:28',
                        executionMonitoringStartAt: '2020-07-16 15:55:46',
                        executionMonitoringEndAt: '2020-07-16 13:19:37',
                        error: 8735747410,
                        inactive: 7734061070,
                        successful: 7172210118,
                        stopped: 3973955322,
                        unknown: 2468738843,
                        unregistered: 8095834058,
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

    it(`/GraphQL bplusItSappiUpdateChannelOverview`, () => 
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
                        
                        id: '22fe1091-7078-4c95-b84b-94402647016b',
                        tenantId: 'efdf0ebb-9511-4ee0-b885-90cfc495e3ff',
                        systemId: 'f2885c4d-07d4-4da9-b984-dbe901ad0713',
                        systemName: 'brwsxz6c49y0gdam7o3t',
                        executionId: 'bf7a7360-bde2-4a08-bf05-cc98ecf321cb',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-16 15:02:43',
                        executionMonitoringStartAt: '2020-07-15 23:53:52',
                        executionMonitoringEndAt: '2020-07-16 17:31:27',
                        error: 2529119597,
                        inactive: 1043139448,
                        successful: 4792660988,
                        stopped: 3304916801,
                        unknown: 1504555853,
                        unregistered: 6982569466,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('22fe1091-7078-4c95-b84b-94402647016b');
            });
    });

    it(`/GraphQL bplusItSappiDeleteChannelOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteChannelOverviewById`, () => 
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
                    id: '22fe1091-7078-4c95-b84b-94402647016b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('22fe1091-7078-4c95-b84b-94402647016b');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});