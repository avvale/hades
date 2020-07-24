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
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: '8h8i4yy56m9r219d3n7g77fnzy0aemz2yvu0gqu9mkxhhdf1on',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'qai1oyhc7fqjypai4ruc',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 09:59:23',
                executionMonitoringStartAt: '2020-07-24 09:20:47',
                executionMonitoringEndAt: '2020-07-24 01:19:17',
                error: 4202690065,
                inactive: 5525787706,
                successful: 4940328840,
                stopped: 9872885876,
                unknown: 1528589918,
                unregistered: 9616634038,
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
                
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'qi8uraud6itr9cfdgz2omv7w3g9hubtn341dniuhz4b8xlivz0',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'k9duvc2h7tan9deqqfn9',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 17:47:27',
                executionMonitoringStartAt: '2020-07-24 07:20:38',
                executionMonitoringEndAt: '2020-07-24 10:38:11',
                error: 3383234682,
                inactive: 3010717228,
                successful: 1076326518,
                stopped: 4765158750,
                unknown: 2112694522,
                unregistered: 2352768172,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: null,
                tenantCode: 'zxjricgv2ympp952jqnyelvbzehsd9ar2egrn2k8dylfzt40vu',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'wedlgz6lybaxuy5qnyxu',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 11:46:26',
                executionMonitoringStartAt: '2020-07-24 03:34:03',
                executionMonitoringEndAt: '2020-07-24 13:30:36',
                error: 4446211372,
                inactive: 8017283351,
                successful: 3729070325,
                stopped: 3558558923,
                unknown: 7120244863,
                unregistered: 4158199991,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                
                tenantCode: '4im68cm32f11iddx92j6147wpexo9abid0hsvre6ikhbgm3j2b',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: '3i3gymt14hymou1z41qt',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 10:01:21',
                executionMonitoringStartAt: '2020-07-24 02:53:58',
                executionMonitoringEndAt: '2020-07-24 16:50:53',
                error: 8142514956,
                inactive: 8063205909,
                successful: 4471779872,
                stopped: 4892447222,
                unknown: 9764650061,
                unregistered: 7253783981,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: null,
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'l1tx0thl0ol1x3wu800e',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 00:07:42',
                executionMonitoringStartAt: '2020-07-24 13:56:28',
                executionMonitoringEndAt: '2020-07-24 13:21:43',
                error: 2459993246,
                inactive: 2792273907,
                successful: 4956194376,
                stopped: 5338237286,
                unknown: 3750873858,
                unregistered: 7379779518,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: '6ndrejspn54fazyq1ha8',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 02:34:49',
                executionMonitoringStartAt: '2020-07-24 14:48:51',
                executionMonitoringEndAt: '2020-07-23 19:57:46',
                error: 9889937904,
                inactive: 3550202317,
                successful: 8649061901,
                stopped: 7580981312,
                unknown: 7562469434,
                unregistered: 6526608646,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'hprol71vj44px4w7in27b3lz8bse4ongei0lmbhveeeb1z5hky',
                systemId: null,
                systemName: 'mkc6t1paevy4uh0su1wg',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 19:49:18',
                executionMonitoringStartAt: '2020-07-23 20:00:46',
                executionMonitoringEndAt: '2020-07-23 19:16:36',
                error: 2140691394,
                inactive: 9225584013,
                successful: 9843217582,
                stopped: 4059994154,
                unknown: 5137319044,
                unregistered: 9020963427,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: '7hj7na76nmds0qg6oadmpd32obx8qgvjla6ehacdr5ul471929',
                
                systemName: '3ej3ebft51tr9hytvhgv',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 05:27:05',
                executionMonitoringStartAt: '2020-07-23 23:35:03',
                executionMonitoringEndAt: '2020-07-24 07:37:24',
                error: 6213455424,
                inactive: 9152870651,
                successful: 5451371605,
                stopped: 4734219617,
                unknown: 3736138957,
                unregistered: 5512824880,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'cxz011w09z6bx8u5wzqu6n7xtg9pr6bdnfgi86q76th91vp82d',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: null,
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 14:49:53',
                executionMonitoringStartAt: '2020-07-24 01:26:03',
                executionMonitoringEndAt: '2020-07-24 08:36:51',
                error: 3051621303,
                inactive: 9804541031,
                successful: 9698378317,
                stopped: 6188872405,
                unknown: 2777559285,
                unregistered: 5231260733,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'vfcbcprely2sx8q62h0u4e0i24hym7xmp5pgiv0ir91sovelqd',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 00:54:47',
                executionMonitoringStartAt: '2020-07-24 03:36:40',
                executionMonitoringEndAt: '2020-07-24 01:22:23',
                error: 1491659147,
                inactive: 9004268861,
                successful: 9032871646,
                stopped: 9784200183,
                unknown: 2252866528,
                unregistered: 1301089574,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: '6usuizwc94ycbk4vngv6gdeu4sc979cgl5cpw4yh8n2ok91x0r',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: '3339apkt0srh8hsq80v6',
                executionId: null,
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 08:55:41',
                executionMonitoringStartAt: '2020-07-23 18:16:53',
                executionMonitoringEndAt: '2020-07-24 15:05:43',
                error: 2833961372,
                inactive: 9385657216,
                successful: 3666629208,
                stopped: 1971084917,
                unknown: 1724666645,
                unregistered: 9336664909,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'bzn5dm6deu1mekay26f6leymwirzuvny1ue5e26hj9rfnk6d8n',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'x7ig0s92g16qlzln6dpn',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 19:08:01',
                executionMonitoringStartAt: '2020-07-24 03:40:48',
                executionMonitoringEndAt: '2020-07-24 12:01:05',
                error: 2729039328,
                inactive: 4074416060,
                successful: 7278625187,
                stopped: 2212318541,
                unknown: 6735456802,
                unregistered: 9644974720,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'jqd49fqb866259zhj1toesso70yndp3fjhy8fyxv9kj8vrlw0t',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'qfue1nqtwqk45i0hrtio',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: null,
                executionExecutedAt: '2020-07-23 18:31:50',
                executionMonitoringStartAt: '2020-07-23 19:25:31',
                executionMonitoringEndAt: '2020-07-24 02:07:35',
                error: 7394258497,
                inactive: 2536698077,
                successful: 1584570887,
                stopped: 6272386807,
                unknown: 3727055318,
                unregistered: 1494048778,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'hazvh1cxhn8ixjsjresf4izqzab2fqy50t24grwa8uqia253lw',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'ouj340dy6hcxwdu5zqd3',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                
                executionExecutedAt: '2020-07-24 05:21:26',
                executionMonitoringStartAt: '2020-07-23 18:13:59',
                executionMonitoringEndAt: '2020-07-24 07:39:45',
                error: 5077401006,
                inactive: 3609078283,
                successful: 9476896054,
                stopped: 7254657194,
                unknown: 2428060015,
                unregistered: 6386293054,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'olo7dui6fre784ta4y9asj4cigw9bihgykjp5cqyhixf0tzvio',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: '5m27q8ivx4d9fp6p2l9j',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-23 20:36:55',
                executionMonitoringEndAt: '2020-07-24 10:07:53',
                error: 6958405068,
                inactive: 6172603957,
                successful: 5046432325,
                stopped: 2108972190,
                unknown: 4999578241,
                unregistered: 1949943437,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: '5h73g8l5alv7jakjynhz38b4561yjo6k08y58wzyfc3h4v51j1',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'q87wopl4o7ayrorxu5zb',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-24 03:12:13',
                executionMonitoringEndAt: '2020-07-24 06:10:08',
                error: 6684456305,
                inactive: 2627774666,
                successful: 9687017828,
                stopped: 4614643913,
                unknown: 8389734206,
                unregistered: 3882091409,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'pulg5fods0hqgfd0mer023zuka0mgzqlkuqtbtcej7f9qe9tw1',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'b5zhw2ucshx22hc9jwrz',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 05:53:08',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-24 09:42:03',
                error: 5837587545,
                inactive: 2813878590,
                successful: 9679848635,
                stopped: 8025927435,
                unknown: 2013082339,
                unregistered: 5251741858,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'o9injij6qw4mymy2ljdoq8uvq1qngv05d5d0x3rgvjogwh4wd4',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: '70zui4c4xb2p2z96lp6e',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 01:45:37',
                
                executionMonitoringEndAt: '2020-07-24 12:23:42',
                error: 6820638029,
                inactive: 3434312332,
                successful: 4809466952,
                stopped: 6440283456,
                unknown: 7817316166,
                unregistered: 7840750504,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'inivfsl0a7yp5v7lg73g78sw1yu7iogb8qo545oeam6jc6kwtb',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'uveugsdf9h8v56ntek4f',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 18:44:55',
                executionMonitoringStartAt: '2020-07-24 03:15:16',
                executionMonitoringEndAt: null,
                error: 9587483620,
                inactive: 7995631843,
                successful: 1627531915,
                stopped: 4318256834,
                unknown: 1720361259,
                unregistered: 8271489580,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'tg8gck2ybynx768jxah3y4zf5n5cu0gv37nbhn91ox9b0dpizc',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'ci3t9r30p1wgxn2g1q3t',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 04:37:18',
                executionMonitoringStartAt: '2020-07-24 13:16:02',
                
                error: 7094030590,
                inactive: 9778566966,
                successful: 6758345447,
                stopped: 2881726734,
                unknown: 2724422917,
                unregistered: 9991389016,
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
                id: 'tib3yf8vtf06ezs2idalo98q0hdbvwsrhqoux',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'hv0aaylm21aqlv1f0lxap1130ayh5r8asfaoe6a76495tvmvea',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'u82mtquk9643tourczin',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 21:46:25',
                executionMonitoringStartAt: '2020-07-23 21:50:58',
                executionMonitoringEndAt: '2020-07-24 13:51:21',
                error: 1905704307,
                inactive: 9266553620,
                successful: 6833744890,
                stopped: 7834453695,
                unknown: 4024438708,
                unregistered: 5305875584,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: 'l4d3mw7jl0tqhy7vogjnpzya6d1i1et0xc8fd',
                tenantCode: '5mmd03etahfxcpmh0wxjqafj05v9tahnde1fwl2puntzr4q3ig',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'ri1blskjljnj6iyan6zl',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 08:00:35',
                executionMonitoringStartAt: '2020-07-23 19:52:55',
                executionMonitoringEndAt: '2020-07-24 15:37:47',
                error: 7989208463,
                inactive: 1922666903,
                successful: 5806252832,
                stopped: 5093549742,
                unknown: 1927122605,
                unregistered: 8292459210,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'z9w1s2uoo83gc25i0709q5cs1gm7x8qios6ou5nrm06gmxcfnx',
                systemId: 'ki2kc01goohviwq7kvrddle68mfammmwnc5ks',
                systemName: 'ebn6c9crhr8yn4qn0fk2',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 22:07:46',
                executionMonitoringStartAt: '2020-07-24 10:36:45',
                executionMonitoringEndAt: '2020-07-24 14:19:21',
                error: 9801656622,
                inactive: 6426689277,
                successful: 8617355286,
                stopped: 1050468728,
                unknown: 7482739738,
                unregistered: 5354999524,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: '118h211ogtrcsbz9lyeyh0hvyknpf4yoioikvvyj5gbip34avm',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: '40aflazpcxb9q8fgf7c2',
                executionId: '7du5pdxot46oo3un6q6ij956fqwqghvss8vlo',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 00:54:18',
                executionMonitoringStartAt: '2020-07-23 18:30:04',
                executionMonitoringEndAt: '2020-07-24 08:20:26',
                error: 7032570942,
                inactive: 7758415545,
                successful: 5246838174,
                stopped: 7292447234,
                unknown: 7914419970,
                unregistered: 2521422299,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'xtdfaqikumpqm83dr5urkhtotv72y4ttakc5rjoff7x8sairtxs',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'hrpfu38io1u0xfp5ke09',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 00:20:25',
                executionMonitoringStartAt: '2020-07-23 23:38:19',
                executionMonitoringEndAt: '2020-07-24 09:38:49',
                error: 9977009983,
                inactive: 6781317271,
                successful: 6525398607,
                stopped: 5909817611,
                unknown: 3446406712,
                unregistered: 9710159664,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: '9xbm8bek746ezeptpaf7nl17m5okd4d5droxkzoe68sax5x3yq',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'q91mmon8ac8extgxgqe06',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 06:55:42',
                executionMonitoringStartAt: '2020-07-24 03:18:21',
                executionMonitoringEndAt: '2020-07-23 22:43:20',
                error: 4137933988,
                inactive: 8080618168,
                successful: 5476376106,
                stopped: 2629744095,
                unknown: 8352194011,
                unregistered: 6355706647,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'ejr880ryv1u2gicafqvdjv4pf5h1xo1xhi9iv5zgzseorsjtww',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'zqcc2njao4d4geqkgm58',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 15:18:25',
                executionMonitoringStartAt: '2020-07-23 18:33:14',
                executionMonitoringEndAt: '2020-07-23 19:22:24',
                error: 88460626769,
                inactive: 4118434546,
                successful: 9527003659,
                stopped: 7877286280,
                unknown: 6440225486,
                unregistered: 4671783415,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'pzbwlfao067e2w8u0in4mck9qd712lzatzs2fsjvbfm9p3ymy9',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'n91uqbeq0pmx73v0yu2c',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 02:50:17',
                executionMonitoringStartAt: '2020-07-23 21:28:30',
                executionMonitoringEndAt: '2020-07-24 14:39:46',
                error: 2588428526,
                inactive: 57521795775,
                successful: 6927513491,
                stopped: 9491186953,
                unknown: 3505321749,
                unregistered: 3726981501,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'cba8mr89vt2vwnlw8fmq9j2r9a01pl5zxfclqh2y81kt0eprot',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'qxxt337iydbsjryltu3b',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 17:58:04',
                executionMonitoringStartAt: '2020-07-23 19:11:04',
                executionMonitoringEndAt: '2020-07-24 14:39:57',
                error: 9197192376,
                inactive: 3458609710,
                successful: 14482836277,
                stopped: 9070919999,
                unknown: 1125913531,
                unregistered: 5544075564,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'qpnonls45v4uf9o5x83wqsq237fju35cvkphi3vyufmb3m6xyj',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: '2r9w4nxz2miydqqmoy7c',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 04:22:30',
                executionMonitoringStartAt: '2020-07-24 17:38:51',
                executionMonitoringEndAt: '2020-07-24 04:40:25',
                error: 8605930477,
                inactive: 8703305870,
                successful: 5975150706,
                stopped: 99213712244,
                unknown: 1992225743,
                unregistered: 8354613031,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'tjced1ywtykaxxrgqbzk50dg1vow6rhs7w82bdedhylrj05jw0',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'a5666lt6vkyi2w2qx51t',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 16:39:10',
                executionMonitoringStartAt: '2020-07-24 09:14:38',
                executionMonitoringEndAt: '2020-07-24 00:47:19',
                error: 6117550303,
                inactive: 8859290695,
                successful: 1388814381,
                stopped: 5517894977,
                unknown: 45199078825,
                unregistered: 5381367606,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: '23x5joehxfj6ufwo26xqcvcn4xurh0no2iuo2l84dr6hgcgrew',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'fb55uetyzukioxjz476q',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 20:24:24',
                executionMonitoringStartAt: '2020-07-24 08:24:04',
                executionMonitoringEndAt: '2020-07-23 18:45:01',
                error: 1916460852,
                inactive: 9885559222,
                successful: 8151241494,
                stopped: 2955083272,
                unknown: 5644882194,
                unregistered: 38045391880,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'ja41wq9ihopiumcfcif7n7g24vkoc1qkb0ly8nneta5ha4jgb6',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'mob2q2ypochsocmwoxrx',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 20:34:11',
                executionMonitoringStartAt: '2020-07-23 20:07:06',
                executionMonitoringEndAt: '2020-07-24 09:44:13',
                error: -9,
                inactive: 8190280290,
                successful: 2868853548,
                stopped: 6713085199,
                unknown: 1021660007,
                unregistered: 3691116021,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: '5hivza7q1ejgsrtpl7gjqfndbi5ymww4uju89t843wtd08jqcd',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'r6hzav7rr1x5ps27ebwf',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 04:17:40',
                executionMonitoringStartAt: '2020-07-24 03:21:29',
                executionMonitoringEndAt: '2020-07-23 21:28:51',
                error: 9172637036,
                inactive: -9,
                successful: 2414065144,
                stopped: 6840629649,
                unknown: 9953368659,
                unregistered: 9995455966,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'aog6iqfsornniphk3g40n4mdvdhm5yux8n2wrnsilswlfx1ohz',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'xfk61r1wj1gqx13vcih7',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 05:48:03',
                executionMonitoringStartAt: '2020-07-24 11:55:13',
                executionMonitoringEndAt: '2020-07-24 07:28:38',
                error: 8421983288,
                inactive: 6443327883,
                successful: -9,
                stopped: 5109477061,
                unknown: 2880945053,
                unregistered: 7093710577,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'qe60n265qmsadqaof5tgodnu5ku5xvaov9861d8rdbkfmfpk3u',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'swbq04zif6ij1zglj1qg',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 09:40:12',
                executionMonitoringStartAt: '2020-07-24 14:59:00',
                executionMonitoringEndAt: '2020-07-23 18:40:11',
                error: 2746840932,
                inactive: 3077181506,
                successful: 5082765751,
                stopped: -9,
                unknown: 2478839582,
                unregistered: 9059230992,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'kkmbjshqzq8zcxgt74nfxsely1dr06pztdbxts5sg2jvrllixt',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'en42qmp2amf02a1nio05',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 21:52:37',
                executionMonitoringStartAt: '2020-07-24 12:36:55',
                executionMonitoringEndAt: '2020-07-24 12:09:28',
                error: 4659712684,
                inactive: 9913488838,
                successful: 2015011766,
                stopped: 1291415476,
                unknown: -9,
                unregistered: 7567585841,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'tioxrxngaglxmk2deaq9niiayj72p2r1buw5rgubgfru026rjw',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: '323g1osg9fczhmrynxrs',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 20:43:19',
                executionMonitoringStartAt: '2020-07-24 04:12:46',
                executionMonitoringEndAt: '2020-07-24 15:50:31',
                error: 9112419271,
                inactive: 6752563030,
                successful: 2856799363,
                stopped: 3102096208,
                unknown: 2652501598,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'de6n9fq0l99b2xwt7v282rmjyifrlh187w6geiyhmvqxd8etpr',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: '80yd5itx47zlgqm8fixj',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-23 19:03:50',
                executionMonitoringStartAt: '2020-07-24 00:56:46',
                executionMonitoringEndAt: '2020-07-24 03:45:16',
                error: 3304400920,
                inactive: 7765653032,
                successful: 1072038249,
                stopped: 5932895988,
                unknown: 9545299578,
                unregistered: 6041422062,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'iuwz6ve5e7wfzpiabxlay96v06ix5eda9rhz0vb5xgkavxe731',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'km7yc5jhdp21jc6waw6o',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-24 15:50:43',
                executionMonitoringEndAt: '2020-07-24 01:56:12',
                error: 4067047037,
                inactive: 8351006218,
                successful: 8760530136,
                stopped: 5425029510,
                unknown: 4342292063,
                unregistered: 1663895212,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'nue8704nnc67c1qm69lw30g62np1glzw83jqi3i1jnw2no7mu6',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'hh2tiknzekl7f7py6evd',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 14:11:22',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-24 15:05:29',
                error: 5215229102,
                inactive: 6907205693,
                successful: 9557443209,
                stopped: 2325885985,
                unknown: 6920655794,
                unregistered: 6083863381,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'phn1luxuwywy4mun6ehw5y1ry86pugloeslwubs7irxyp64lcg',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'mtqmdnk464exmstsj7g7',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 05:22:16',
                executionMonitoringStartAt: '2020-07-23 17:57:33',
                executionMonitoringEndAt: 'XXXXXXXX',
                error: 6216238628,
                inactive: 9731062948,
                successful: 9984189532,
                stopped: 9939014050,
                unknown: 8685370887,
                unregistered: 5338390870,
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
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'pqii03re7ckrs10q9wi74fd0906g8bm4h7lhzvefzmpyug5r3v',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: 'tict4bl96idx2yzoz3jx',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 08:43:13',
                executionMonitoringStartAt: '2020-07-24 06:52:44',
                executionMonitoringEndAt: '2020-07-24 11:29:25',
                error: 4077742440,
                inactive: 8702136801,
                successful: 9916297313,
                stopped: 7682974382,
                unknown: 4609879053,
                unregistered: 4169561575,
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
                        value   : '6420f28f-cfda-4bf9-bc1f-293a689142a0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6420f28f-cfda-4bf9-bc1f-293a689142a0'));
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
            .get('/bplus-it-sappi/channel-overview/6420f28f-cfda-4bf9-bc1f-293a689142a0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6420f28f-cfda-4bf9-bc1f-293a689142a0'));
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
                
                id: '4bec8f59-6de9-4e2a-8aad-5c54452b47cf',
                tenantId: '86988e4a-4102-4f47-abe9-5323bc0a24ae',
                tenantCode: 'pvrl9of5lbj5hj8g55c8brdc96c7djivffn39x2cgowujc79gr',
                systemId: '6e4f24ba-3682-4e8d-8225-8cd5351d2f80',
                systemName: 'etd82m697qe24lkj40ol',
                executionId: 'aaeb3160-6553-4768-8a7a-ed10275c36e6',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 16:49:06',
                executionMonitoringStartAt: '2020-07-23 18:25:24',
                executionMonitoringEndAt: '2020-07-24 03:53:25',
                error: 7645498093,
                inactive: 9750307450,
                successful: 4531690499,
                stopped: 1375309262,
                unknown: 1631980475,
                unregistered: 9971018079,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                tenantCode: 'cqyfne8a1lfctcgmvac5nk80vsy1sohwt8d21olj6r1o2xhr8y',
                systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                systemName: '3lf3u18ofkngrh3xpiyl',
                executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 00:03:16',
                executionMonitoringStartAt: '2020-07-24 10:54:05',
                executionMonitoringEndAt: '2020-07-23 18:56:11',
                error: 3615540500,
                inactive: 9710780458,
                successful: 6823343020,
                stopped: 8688554860,
                unknown: 2144040866,
                unregistered: 3522186000,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6420f28f-cfda-4bf9-bc1f-293a689142a0'));
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
            .delete('/bplus-it-sappi/channel-overview/6420f28f-cfda-4bf9-bc1f-293a689142a0')
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
                        id: '0d9d2911-b3b9-4de0-ac05-eada94e6533d',
                        tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                        tenantCode: 'qi2dyaws3m8wkw9839klvpytiydgsdsrn8t823tnq24p9kjfl7',
                        systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                        systemName: 'mnw6kukoa598lfzrkaol',
                        executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-24 13:50:55',
                        executionMonitoringStartAt: '2020-07-23 21:03:52',
                        executionMonitoringEndAt: '2020-07-24 07:19:30',
                        error: 6360235859,
                        inactive: 1697735333,
                        successful: 2055695564,
                        stopped: 2230907755,
                        unknown: 2978066943,
                        unregistered: 1511843891,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannelOverview).toHaveProperty('id', '0d9d2911-b3b9-4de0-ac05-eada94e6533d');
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
                            value   : '6420f28f-cfda-4bf9-bc1f-293a689142a0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverview.id).toStrictEqual('6420f28f-cfda-4bf9-bc1f-293a689142a0');
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
                    id: '6420f28f-cfda-4bf9-bc1f-293a689142a0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelOverviewById.id).toStrictEqual('6420f28f-cfda-4bf9-bc1f-293a689142a0');
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
                        
                        id: '02b44cdb-9df5-439c-9c24-9df5d688618d',
                        tenantId: 'f6131013-0245-4241-9077-6aea049b97fc',
                        tenantCode: 'pq5f1b6l528r017jvmt46yt2ci3bzw446m4yk22pk222yv6wly',
                        systemId: '7f353fe1-c876-4d7e-987b-8b73d4104218',
                        systemName: '2dm9ehmdws5m6vlub43d',
                        executionId: '23d5e632-db0e-4914-a516-80dca2d90f55',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 19:43:59',
                        executionMonitoringStartAt: '2020-07-24 09:43:56',
                        executionMonitoringEndAt: '2020-07-24 15:07:29',
                        error: 5963342999,
                        inactive: 3425465296,
                        successful: 3129811241,
                        stopped: 1697258923,
                        unknown: 2396427788,
                        unregistered: 6140809398,
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
                        
                        id: '6420f28f-cfda-4bf9-bc1f-293a689142a0',
                        tenantId: '03d6b77a-6cae-4010-8b01-16fddfd15399',
                        tenantCode: 'o65nopk66jrxoszhphpqtgem5he0a6z11rvgim56hc72fjoui0',
                        systemId: 'c4010f4c-0897-4a6b-920c-75800baf1df7',
                        systemName: 'kn3bihgnlkebksscxnho',
                        executionId: '3e985908-7d8a-4054-87e3-ee06d4292dcf',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-24 15:12:57',
                        executionMonitoringStartAt: '2020-07-24 15:44:00',
                        executionMonitoringEndAt: '2020-07-24 02:59:54',
                        error: 5300001481,
                        inactive: 7689073323,
                        successful: 3141809314,
                        stopped: 2437910436,
                        unknown: 5493833517,
                        unregistered: 8898698622,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannelOverview.id).toStrictEqual('6420f28f-cfda-4bf9-bc1f-293a689142a0');
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
                    id: '6420f28f-cfda-4bf9-bc1f-293a689142a0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelOverviewById.id).toStrictEqual('6420f28f-cfda-4bf9-bc1f-293a689142a0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});