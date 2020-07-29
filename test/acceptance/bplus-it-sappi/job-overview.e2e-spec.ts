import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobOverviewRepository } from '@hades/bplus-it-sappi/job-overview/domain/job-overview.repository';
import { MockJobOverviewRepository } from '@hades/bplus-it-sappi/job-overview/infrastructure/mock/mock-job-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('job-overview', () => 
{
    let app: INestApplication;
    let repository: MockJobOverviewRepository;
    
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
            .overrideProvider(IJobOverviewRepository)
            .useClass(MockJobOverviewRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockJobOverviewRepository>module.get<IJobOverviewRepository>(IJobOverviewRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'r1h33balehyje46a70u4fa8nyh1f1rj6vuh1ngmgrfb70uu7ka',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'sn4efo9dkobwyiqtqcos',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:07:51',
                executionMonitoringStartAt: '2020-07-29 07:42:42',
                executionMonitoringEndAt: '2020-07-29 00:31:50',
                cancelled: 4601737306,
                completed: 6881502467,
                error: 7752110367,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'uhjl7td4ut4yrxwp8h7mi41fn1ux8siv5f7or3t1dfzechsb6c',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'fa3rvgnwuw7ajwdsddkr',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:24:04',
                executionMonitoringStartAt: '2020-07-29 01:58:22',
                executionMonitoringEndAt: '2020-07-29 13:58:07',
                cancelled: 4342873370,
                completed: 5206827224,
                error: 7632606769,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: null,
                tenantCode: 'sn71ih36h0ksu7n5v30pyui2afir3fhxnecsontcfvx0lswe18',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'b01em1fpcoss0nh6jc4e',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:18:47',
                executionMonitoringStartAt: '2020-07-29 14:56:45',
                executionMonitoringEndAt: '2020-07-28 21:24:18',
                cancelled: 5048117298,
                completed: 7422185308,
                error: 8792108041,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                
                tenantCode: 'sqq2gh0aezy56s0mupgnip8xsxtgxnjp92xrb70xfs2mr46bi7',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'd8oborbar1ubk6lgtokf',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 09:57:52',
                executionMonitoringStartAt: '2020-07-29 10:29:06',
                executionMonitoringEndAt: '2020-07-29 09:56:12',
                cancelled: 8861846468,
                completed: 3322255097,
                error: 6627266188,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: null,
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '0xnc5a57524umw83xlhd',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:42:08',
                executionMonitoringStartAt: '2020-07-28 20:02:38',
                executionMonitoringEndAt: '2020-07-29 07:40:37',
                cancelled: 1300140533,
                completed: 9756743839,
                error: 9758731044,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'p1pa3aazxulclkyvp04m',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:28:39',
                executionMonitoringStartAt: '2020-07-29 07:28:52',
                executionMonitoringEndAt: '2020-07-29 05:04:04',
                cancelled: 9293158773,
                completed: 4414707925,
                error: 5637025513,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'a7kfz9t0256lh887kl2p1f8yy3spxyyxhceh41gv8m7p9vug1i',
                systemId: null,
                systemName: '7e5wrct4yfycn4io4k2f',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:00:25',
                executionMonitoringStartAt: '2020-07-29 02:45:34',
                executionMonitoringEndAt: '2020-07-29 10:13:20',
                cancelled: 1972247900,
                completed: 7042406798,
                error: 1976600532,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: '0k51vgd4lhe8et7llvm8sdfjwcn5oj7w4vqbrteiyi48hsvfum',
                
                systemName: 'eocc70nm6ep6uao82a9a',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:53:45',
                executionMonitoringStartAt: '2020-07-29 11:40:22',
                executionMonitoringEndAt: '2020-07-29 07:24:29',
                cancelled: 8082394503,
                completed: 6767956626,
                error: 5790423042,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'jiyyenf8p6ek0ki0l4bv24v7n2kvndzlgz5984se4tesaahegd',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: null,
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:45:17',
                executionMonitoringStartAt: '2020-07-28 18:19:57',
                executionMonitoringEndAt: '2020-07-29 03:31:50',
                cancelled: 9115663151,
                completed: 1872223714,
                error: 5141169299,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: '1xdr4eh8w9jfnh2asi5wi9441w0rt1isxqrrj97trrzfy05v15',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:38:26',
                executionMonitoringStartAt: '2020-07-29 11:43:21',
                executionMonitoringEndAt: '2020-07-28 18:38:35',
                cancelled: 7461865920,
                completed: 3746781765,
                error: 1456963612,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'axb4cbdqirr4bpugk7ur7zlpx51rlzxbxoxgm89732apuq2v4u',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '8u35173z1dt7j9h3ts8d',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:57:59',
                executionMonitoringStartAt: '2020-07-28 23:35:58',
                executionMonitoringEndAt: '2020-07-28 19:15:02',
                cancelled: 2029889352,
                completed: 6925826276,
                error: 9219323067,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'eyuks1bgsqtxae24k3u3vc15ismed5mm8v0dtjq7huzbnco3ox',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 's938pbwfsyz6d8i27vxz',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:14:49',
                executionMonitoringStartAt: '2020-07-28 19:06:39',
                executionMonitoringEndAt: '2020-07-29 13:07:19',
                cancelled: 5917974060,
                completed: 9161480564,
                error: 5958463477,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: '6jswlzthkmmg8n2pthgr8la14oahmcj2omgiguh3ko4buyebbd',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '7ie6o5wcxzdwa6rg27j8',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: null,
                executionExecutedAt: '2020-07-29 06:25:25',
                executionMonitoringStartAt: '2020-07-29 13:45:16',
                executionMonitoringEndAt: '2020-07-28 20:38:30',
                cancelled: 4130860223,
                completed: 2083899751,
                error: 5319652813,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: '040qaxn38fnsfl1ts6qkbv91uqxyt9cwt04vfjm3dtouel9nmc',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '34daxvc99c77rf509o2o',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                
                executionExecutedAt: '2020-07-28 23:21:31',
                executionMonitoringStartAt: '2020-07-29 04:21:09',
                executionMonitoringEndAt: '2020-07-29 16:30:04',
                cancelled: 2782087927,
                completed: 5457417478,
                error: 5174224503,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: '78j6le74soy4munbvu37lqntl0f7fd1ail9966rlxtjt1kcq67',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'skhsu8rata2u102vuzq1',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-28 21:28:26',
                executionMonitoringEndAt: '2020-07-28 21:28:59',
                cancelled: 2769798899,
                completed: 2709278356,
                error: 5681804988,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'f8iyir6tnf4c0z0qud9w55okf1p8ohpp6pi8al0ykt9ygwo5de',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '2qszqpsqndc99fzcanjz',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-29 02:56:36',
                executionMonitoringEndAt: '2020-07-29 13:27:18',
                cancelled: 8819251839,
                completed: 6481359007,
                error: 8417802015,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'tmrevnsaf9cd2vre7n9y46joq769g42x1ptnreb41rxs9lmnp3',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'g4icf0sgqr62ftga0qr5',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 11:36:57',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-29 02:37:24',
                cancelled: 2716081890,
                completed: 9565704152,
                error: 6288462518,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'axhj1s5xifh8isevi8eg4pz6ty4jl4a060dw8mxutkkx3cbn72',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '07mpgmejrba6xh7ua8ir',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 06:20:34',
                
                executionMonitoringEndAt: '2020-07-29 04:00:26',
                cancelled: 4640479653,
                completed: 9394444648,
                error: 9018052321,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'c6zel5ewuloqypwjm1oz13gkwrlal6urqgipac21awxo7okg2h',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'vtv10v2cwl65pm60mnpo',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 18:23:58',
                executionMonitoringStartAt: '2020-07-28 20:48:07',
                executionMonitoringEndAt: null,
                cancelled: 5608896237,
                completed: 7425555224,
                error: 1274965257,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'c4s8ntf3hzf8s52r7ygvmzl74pizbbd0qe967rlupjlftugg62',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'qwka4ppzw4xyayntrpuj',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 06:54:17',
                executionMonitoringStartAt: '2020-07-28 23:41:11',
                
                cancelled: 6268012773,
                completed: 2876091271,
                error: 5169121447,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'spdo8vmpg14m1uow7jz49de2mv5go4r7ew4vr',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'gpxhfhuffoauuk43t0t4f6mb2rb9hjysklt2j4w758z1iyxrdk',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'nuaoebzoikcp963bw0zm',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:20:54',
                executionMonitoringStartAt: '2020-07-29 04:49:31',
                executionMonitoringEndAt: '2020-07-28 23:04:08',
                cancelled: 5284972806,
                completed: 3470127260,
                error: 8828881968,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: 'uvdwdumw4pjkxbz06l91d08pz45j11njiswuf',
                tenantCode: 'b746e31dkhud7kur3tvfftxlikp2a4pofyehuxrg8zxe2cuupv',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'mc2vuuicmqvkdvnjogmd',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 08:52:01',
                executionMonitoringStartAt: '2020-07-29 15:43:47',
                executionMonitoringEndAt: '2020-07-29 15:09:40',
                cancelled: 3012978597,
                completed: 2893275783,
                error: 9117011337,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: '72va7i0u5mexmjy6j98wwuh5h8gytsj6zwcrny64yr8lv267s2',
                systemId: '0r79viw769owf1ttx0zjgvmh5ap5rit6pk9y4',
                systemName: 'tx0pv1pz6577j2py5cli',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:34:51',
                executionMonitoringStartAt: '2020-07-29 00:38:25',
                executionMonitoringEndAt: '2020-07-28 18:50:33',
                cancelled: 8037092381,
                completed: 3749104460,
                error: 1596900499,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'pwytk0zl0iykzzz5nbioqmdfxyl68k85s281hl0fvg4a09gpob',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'j856q4c8ir9tob3j2v9t',
                executionId: 'vc7nh69owvzmyngl7gzcn118ngwc5se2kxpz4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 22:38:02',
                executionMonitoringStartAt: '2020-07-29 13:05:25',
                executionMonitoringEndAt: '2020-07-29 10:31:59',
                cancelled: 9334728523,
                completed: 5308697922,
                error: 6508701609,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'hper1mpj0lk0lmz19xslchgqca2yrzupp3o4ul8swyqcsfli1eo',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'bh8ryww7i6h5lwgjd8vf',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 13:28:56',
                executionMonitoringStartAt: '2020-07-29 07:40:24',
                executionMonitoringEndAt: '2020-07-29 13:50:23',
                cancelled: 1368808994,
                completed: 5737647639,
                error: 4623490486,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'mp71mpr2epdmmy7l2f7edyh73lp824y5zb2zadw3rd9m8xf2pc',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '8r5vafz10trum5j97t61g',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 08:37:07',
                executionMonitoringStartAt: '2020-07-28 21:11:57',
                executionMonitoringEndAt: '2020-07-29 06:25:06',
                cancelled: 9616337189,
                completed: 4680470502,
                error: 9483208516,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: '20s93i6faqoep5g6ksada03vxcxl7fv3l9vvhrntqsyhhz56ob',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '8e1g4tw89y4nvsizvwrc',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 16:07:49',
                executionMonitoringStartAt: '2020-07-29 15:43:46',
                executionMonitoringEndAt: '2020-07-28 19:04:30',
                cancelled: 14988565805,
                completed: 2550729316,
                error: 3459048587,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'uf7vhrenqk2t375c9bv8rxfm4qg2zg4a2u7s3oquazp4ql5lwd',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '1e2yeye5c9g6kj8iw3pv',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 07:02:28',
                executionMonitoringStartAt: '2020-07-28 22:06:42',
                executionMonitoringEndAt: '2020-07-28 19:47:32',
                cancelled: 9272920818,
                completed: 12972422275,
                error: 4871887321,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'rw142dlqlqdka1xxf35lsdb81h1ns88zz3h2qj4kyjbfcd0e6l',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '9ollfmj4njtsu94iolci',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 11:36:16',
                executionMonitoringStartAt: '2020-07-29 00:53:31',
                executionMonitoringEndAt: '2020-07-29 09:14:22',
                cancelled: 1697374270,
                completed: 8322291819,
                error: 57701663254,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: '3ohp6nyq4wfc20o1eavjs7j52fullvcttczivfphlrl0np7v0a',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'q8h2bftpjgny7p7lrp93',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 23:55:21',
                executionMonitoringStartAt: '2020-07-29 12:54:18',
                executionMonitoringEndAt: '2020-07-29 11:16:54',
                cancelled: -9,
                completed: 9782709049,
                error: 8159121180,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'jr8l22vznmrip2ol4wzkxejyb4nzwdiklm0io8wtzlvf4i6tsn',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'de22os5vla5hq64qvskw',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 00:10:07',
                executionMonitoringStartAt: '2020-07-29 03:26:37',
                executionMonitoringEndAt: '2020-07-29 03:59:43',
                cancelled: 2490479882,
                completed: -9,
                error: 4747817217,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCompleted must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'zoyynqy1skba5shqn2k2p4slar2uh3u3a0i7vk7hr1vv8oejfk',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'vnmjr69vgzbsn63belue',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 13:23:30',
                executionMonitoringStartAt: '2020-07-28 19:52:30',
                executionMonitoringEndAt: '2020-07-28 19:40:41',
                cancelled: 7964006121,
                completed: 6024757008,
                error: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'o8sjje0vlk57khx2kamved8bep5z6bakxv8z5bh5xogc9gc5su',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '10wm4k9agzw7hvt9ks22',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-29 16:38:50',
                executionMonitoringStartAt: '2020-07-28 17:50:12',
                executionMonitoringEndAt: '2020-07-29 10:35:04',
                cancelled: 8198991614,
                completed: 7191301168,
                error: 5494476807,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'o8m17hxjz1jps5qk50ilvz3kc5hvx8e3ex6h8w21cnhpix0qjf',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: '9yn7gev84ziad2gsiz32',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-29 03:11:49',
                executionMonitoringEndAt: '2020-07-29 00:05:56',
                cancelled: 9949345290,
                completed: 1555135812,
                error: 1306040023,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'vq99oqm8z3cwg5m4uzxltweavixp45yx8snudhuu4armrx7ldt',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'r6czad8tq2ud0khhqf6o',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-29 04:35:38',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-28 21:17:43',
                cancelled: 3478030659,
                completed: 5803912555,
                error: 9903036215,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'xnupjow8it4buhp3776qr1m97jfqtxb7ygvqcusgt5li1c8cj5',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'qb0ddpowwke08gc0lbwi',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-28 17:24:48',
                executionMonitoringStartAt: '2020-07-28 23:08:56',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 8047651794,
                completed: 3613693140,
                error: 8141072818,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'hhvg97dzz2k4czj642epre848pzzbwu9pbs0bpkr4v5jmumk1w',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'oevmak1y0b32at9ho4np',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 10:09:52',
                executionMonitoringStartAt: '2020-07-29 06:23:39',
                executionMonitoringEndAt: '2020-07-28 17:44:50',
                cancelled: 2295253166,
                completed: 8930489826,
                error: 8366160360,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/jobs-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-overview/paginate')
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

    test(`/REST:GET bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview')
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

    test(`/REST:GET bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '88b08ce1-9410-4dad-961f-5a8ae96c1eca'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '88b08ce1-9410-4dad-961f-5a8ae96c1eca'));
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/88b08ce1-9410-4dad-961f-5a8ae96c1eca')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '88b08ce1-9410-4dad-961f-5a8ae96c1eca'));
    });

    test(`/REST:GET bplus-it-sappi/jobs-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b2e7b72f-9075-4d00-a5d9-f5cef1bea4cc',
                tenantId: '2846cc3a-1149-4ea2-9004-73487bb50165',
                tenantCode: 'b3fg3pzhcaw7jqjia11umamtigyelydbxd52uotps2j3gcct7b',
                systemId: '4d9eee90-365a-4a60-a4d5-979e55f262e2',
                systemName: 'e2bhzm6rcwcdop0efc05',
                executionId: '38d1136b-6638-4d88-89cd-8d5cf7642197',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-28 19:09:27',
                executionMonitoringStartAt: '2020-07-29 12:59:03',
                executionMonitoringEndAt: '2020-07-29 01:31:25',
                cancelled: 4586449961,
                completed: 1206478642,
                error: 2827622153,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                tenantCode: 'e29w0zfc9vfcc1yz34vuhggrsmpcrv7ukf7qyqmep5uhcbmfkl',
                systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                systemName: 'qpnc6g1h0awq5d2m7wfz',
                executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-29 04:31:04',
                executionMonitoringStartAt: '2020-07-29 14:39:47',
                executionMonitoringEndAt: '2020-07-29 03:43:43',
                cancelled: 2734797988,
                completed: 7992278316,
                error: 3816351281,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '88b08ce1-9410-4dad-961f-5a8ae96c1eca'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/88b08ce1-9410-4dad-961f-5a8ae96c1eca')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateJobOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobOverviewInput!)
                    {
                        bplusItSappiCreateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiCreateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateJobOverviewInput!)
                    {
                        bplusItSappiCreateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0942415f-49ee-48d6-9096-1471028f132b',
                        tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                        tenantCode: 't9q485pw1rookjn74uzhgfh00kl60i5yixj85r20bjb652kzkf',
                        systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                        systemName: 'drhtfl00vyg8c6bbssqx',
                        executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 08:42:59',
                        executionMonitoringStartAt: '2020-07-28 23:49:56',
                        executionMonitoringEndAt: '2020-07-28 23:12:25',
                        cancelled: 9745767736,
                        completed: 3570770774,
                        error: 1988137258,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '0942415f-49ee-48d6-9096-1471028f132b');
            });
    });

    test(`/GraphQL bplusItSappiPaginateJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateJobsOverview (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateJobsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateJobsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobOverview (query:$query)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiFindJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindJobOverview (query:$query)
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
                            cancelled
                            completed
                            error
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
                            value   : '88b08ce1-9410-4dad-961f-5a8ae96c1eca'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('88b08ce1-9410-4dad-961f-5a8ae96c1eca');
            });
    });

    test(`/GraphQL bplusItSappiFindJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiFindJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('88b08ce1-9410-4dad-961f-5a8ae96c1eca');
            });
    });

    test(`/GraphQL bplusItSappiGetJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetJobsOverview (query:$query)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetJobsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobOverviewInput!)
                    {
                        bplusItSappiUpdateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a5424b90-7c24-4b1d-9018-9803e8a79b37',
                        tenantId: '44aa6bfa-9b57-4a26-b087-14de7fa6dc55',
                        tenantCode: 'allwlyalyrqelz1z6edr0c8jxo794sdjcd8c4cnlwso0qijtah',
                        systemId: '377e32fe-fcc7-4cab-ab4b-9b89354c4299',
                        systemName: 'imiae4oola4sfyebftc5',
                        executionId: '930a9164-c70c-4eaa-8494-abe1d1badf22',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-29 00:28:05',
                        executionMonitoringStartAt: '2020-07-29 14:32:12',
                        executionMonitoringEndAt: '2020-07-28 17:05:50',
                        cancelled: 9109264055,
                        completed: 8219543653,
                        error: 3938151267,
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

    test(`/GraphQL bplusItSappiUpdateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateJobOverviewInput!)
                    {
                        bplusItSappiUpdateJobOverview (payload:$payload)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca',
                        tenantId: '73eba46c-84ba-4f16-8605-0d7b8842422d',
                        tenantCode: 'd8ex58sg2dwxf6vfbll7qh4uj7gjkcs0hs5dh6hltpfvrqikdy',
                        systemId: '9c439957-bda1-497d-8eab-7f750e011ba1',
                        systemName: 'bbfixy1i82kueo1v0lrm',
                        executionId: 'ffd3f7df-2090-40ce-8747-818fd29b0ac2',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-29 04:54:40',
                        executionMonitoringStartAt: '2020-07-29 01:17:27',
                        executionMonitoringEndAt: '2020-07-29 08:14:24',
                        cancelled: 7975575708,
                        completed: 9559379269,
                        error: 3610500154,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('88b08ce1-9410-4dad-961f-5a8ae96c1eca');
            });
    });

    test(`/GraphQL bplusItSappiDeleteJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
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

    test(`/GraphQL bplusItSappiDeleteJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteJobOverviewById (id:$id)
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
                            cancelled
                            completed
                            error
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '88b08ce1-9410-4dad-961f-5a8ae96c1eca'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('88b08ce1-9410-4dad-961f-5a8ae96c1eca');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});