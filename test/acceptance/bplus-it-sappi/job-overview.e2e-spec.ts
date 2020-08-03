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
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: '2jk219daaeoh0wpcoft23opmsw2c3pkt3655ssr35d0lozbemd',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'js54kzpflf2s0db8it1b',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:39:15',
                executionMonitoringStartAt: '2020-08-03 15:16:13',
                executionMonitoringEndAt: '2020-08-02 20:11:13',
                cancelled: 6634212436,
                completed: 9206309636,
                error: 7203867351,
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
                
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'tf357mxv4i8hnth4u1e2wtcqlorsoqlju72hv6023hca00frcj',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: '8ce7y2u33k5oabykmv5d',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:19:46',
                executionMonitoringStartAt: '2020-08-03 08:06:23',
                executionMonitoringEndAt: '2020-08-03 05:07:14',
                cancelled: 9979974186,
                completed: 2245933128,
                error: 2409534046,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: null,
                tenantCode: 'df8q1hnn1gzm2j2gmzd52funfpcbpfs3nlc1zccru2dluzlxlx',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: '78a64eay0snlx5bcwvxh',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 12:20:35',
                executionMonitoringStartAt: '2020-08-03 16:15:46',
                executionMonitoringEndAt: '2020-08-03 14:35:24',
                cancelled: 8579016837,
                completed: 5650072323,
                error: 8338632776,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                
                tenantCode: 'cw215erbnu3avumwu1jdibq4z6wevg31mlgvtq518nj7ce6p9l',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'b697z9s0vlrtdhd7p24u',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 21:28:54',
                executionMonitoringStartAt: '2020-08-03 11:23:52',
                executionMonitoringEndAt: '2020-08-03 13:13:45',
                cancelled: 1546103505,
                completed: 9757025925,
                error: 6946121974,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: null,
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'uo4bxtowyg8s9t470yqr',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 15:11:14',
                executionMonitoringStartAt: '2020-08-02 23:12:56',
                executionMonitoringEndAt: '2020-08-03 11:40:03',
                cancelled: 2576314787,
                completed: 4623081497,
                error: 9565956054,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'b3qsnpj214atijtqqhk1',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 11:21:28',
                executionMonitoringStartAt: '2020-08-03 02:06:18',
                executionMonitoringEndAt: '2020-08-02 22:09:33',
                cancelled: 3967894856,
                completed: 4977141579,
                error: 8733533853,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'y5ot9l83h7lzojjrsqtpiut7v9ganb67m3h5yqgrxvm4mx5msh',
                systemId: null,
                systemName: 'n0bq2nu7j993qp8353pi',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 01:20:06',
                executionMonitoringStartAt: '2020-08-03 13:42:06',
                executionMonitoringEndAt: '2020-08-03 04:14:05',
                cancelled: 9965886258,
                completed: 8199642291,
                error: 1761258286,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'cj5ivqss9ht35hxa3x6zo3a97pd37vwyqtgeyp6f3jpbtjicqe',
                
                systemName: 'fck4f45e8maak191pyqt',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 21:36:17',
                executionMonitoringStartAt: '2020-08-03 03:39:40',
                executionMonitoringEndAt: '2020-08-03 06:09:20',
                cancelled: 6291139934,
                completed: 5527190694,
                error: 4680333550,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'ezxl9w4qibotr5pyqm2f8xhewqx14d6kknl5e7zotabmg2vhl8',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: null,
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 21:52:55',
                executionMonitoringStartAt: '2020-08-03 15:08:54',
                executionMonitoringEndAt: '2020-08-03 09:17:22',
                cancelled: 1570203882,
                completed: 9923113248,
                error: 8040807405,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'r3lx1cboik01onar3exbltneddybk08dz1hgvc6k4oyh7f2euf',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 08:36:33',
                executionMonitoringStartAt: '2020-08-03 04:11:30',
                executionMonitoringEndAt: '2020-08-03 08:56:32',
                cancelled: 1511384068,
                completed: 4113612435,
                error: 3610350607,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'jb14jpp8rrgt7og522r9d7rkbshhuxxj0l5fooxnssfzlx9ewq',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'ittvgv93c8tfv9qt3z8m',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 20:30:37',
                executionMonitoringStartAt: '2020-08-02 23:44:26',
                executionMonitoringEndAt: '2020-08-03 06:16:23',
                cancelled: 9232184580,
                completed: 4269676874,
                error: 8368235661,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: '7dxrl1lh8e0224jdwjifyi1ialbbbchylrs1szcl1ie1bmqxif',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: '77v93hsakjzzb8l9r5q2',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 09:33:01',
                executionMonitoringStartAt: '2020-08-03 13:19:07',
                executionMonitoringEndAt: '2020-08-03 05:35:58',
                cancelled: 9851157867,
                completed: 4364841496,
                error: 4222755669,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'c0hvcm6m2zou8phql45pdtijoh7puqwcp95r1722mcb2816gnz',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'fhaarc7k3p1nfxh98ltl',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: null,
                executionExecutedAt: '2020-08-03 05:52:56',
                executionMonitoringStartAt: '2020-08-03 17:06:45',
                executionMonitoringEndAt: '2020-08-03 06:20:24',
                cancelled: 5500013428,
                completed: 1239394519,
                error: 2856055052,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'ivvlg5tw9qy0z354vgxeydc0ywergir73ic5532rxzme5zgzct',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: '8limko0p2uwoksl9u9xl',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                
                executionExecutedAt: '2020-08-03 05:43:16',
                executionMonitoringStartAt: '2020-08-03 00:14:05',
                executionMonitoringEndAt: '2020-08-03 02:18:34',
                cancelled: 9511277646,
                completed: 8998224057,
                error: 2950429602,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'nza88w4eeu6tctrki6r1l9irq2zzc773qkd0ea0egu604nvx0t',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'a7172qxkvo3qqshdgsmo',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-08-03 03:43:41',
                executionMonitoringEndAt: '2020-08-03 00:00:28',
                cancelled: 5747469447,
                completed: 9562193726,
                error: 4301111752,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'zz8w1zcfsidgsccc6dhjovhls2pyxdhi1oqqfbd3y4sr2ounv7',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: '67ccojoye0anyvd2s04f',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-08-03 13:11:11',
                executionMonitoringEndAt: '2020-08-03 06:42:18',
                cancelled: 6114811334,
                completed: 8110015436,
                error: 1544553156,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'mciwyzm80ij2txdljjtcla6e6ludv59hsqrjbw8qfbqqxv88tg',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'wgilowp6g4f2miqmrp15',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 02:42:14',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-08-02 22:13:06',
                cancelled: 7752940455,
                completed: 5768727628,
                error: 4797087614,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'imxiz4l2z1idk835fq04kst7g2724ddasf4t7ols735vhc9hvw',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'z33azkmb8xan1x55kvon',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 03:55:06',
                
                executionMonitoringEndAt: '2020-08-03 00:14:33',
                cancelled: 4713962601,
                completed: 4026412013,
                error: 8852510083,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: '6sb9pwdcgrthse9rnsjimhhtti700skfpa0apsf0mzipl3oyih',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'zhpnoacm6elnqi4t44wx',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 12:04:52',
                executionMonitoringStartAt: '2020-08-03 07:47:32',
                executionMonitoringEndAt: null,
                cancelled: 6183845028,
                completed: 7387524416,
                error: 3368537971,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: '9ulrele7s5d3y5vfwsptfica021h0x8j986z7dd60v9xkrtn18',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: '4mdjth30ol8dvbhk7r3y',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 22:18:47',
                executionMonitoringStartAt: '2020-08-03 10:32:20',
                
                cancelled: 2543873940,
                completed: 9858463376,
                error: 7678359730,
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
                id: 'y2hkd98qt28u4qb72sxlp2olrthhvapssdsrp',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: '2r7fl86wr3fvb94dqpjvf7o6bziyk1hs4tqg86qdj9x1n30v8e',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'y4fq1d7biio8z3vntjei',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 06:13:36',
                executionMonitoringStartAt: '2020-08-03 03:41:24',
                executionMonitoringEndAt: '2020-08-03 04:39:19',
                cancelled: 5503584036,
                completed: 5718931438,
                error: 3855556257,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: 'hrcq2tsb98zh6d19l2kkq7k7y4ov11hadte1o',
                tenantCode: '20irguak7ae8eeopa8nabkj5vv4s1m3qd357ps7jyvh7beph8i',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'jq0ip6zuq6o6gpqo0z2g',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 18:35:44',
                executionMonitoringStartAt: '2020-08-02 22:57:11',
                executionMonitoringEndAt: '2020-08-02 23:29:10',
                cancelled: 7583349376,
                completed: 4183155857,
                error: 9043183109,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'ff3ymkso0dq8cn9n7zexg67bk25h35gn4naa53cdloyzj5punu',
                systemId: 'siaoirz05x4c5g0ea7k789q4owzzzf227z7xe',
                systemName: 'u4ndgkg37e3t40sd775n',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 05:11:31',
                executionMonitoringStartAt: '2020-08-03 00:59:48',
                executionMonitoringEndAt: '2020-08-03 09:51:27',
                cancelled: 7653202880,
                completed: 2458455710,
                error: 2255082543,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'rugnk708osrtcpe1sgb78w75vu3f78ln1s0ns2nl095n61h92a',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'md67l5xvdxrf3t7ux0fz',
                executionId: 'hr8rhycszpxd86qsv56rrn2drqiosqfuiqf7l',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 07:45:06',
                executionMonitoringStartAt: '2020-08-03 11:51:57',
                executionMonitoringEndAt: '2020-08-03 08:35:44',
                cancelled: 4403104216,
                completed: 8743577593,
                error: 2405253942,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'ezefpps1gxrpbe4wykdizk9551zc5480qk0cflig7qvr9f06tty',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: '45pprw2a6qyy12562qrd',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 17:11:41',
                executionMonitoringStartAt: '2020-08-03 07:54:54',
                executionMonitoringEndAt: '2020-08-03 10:02:57',
                cancelled: 5530299167,
                completed: 7200305684,
                error: 7849232020,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'f4wjt45fl1gb307ujacw29y2du21v2era11tmkhte9wzm0tfil',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: '4aybctlu1l9okhsmukvld',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 08:45:22',
                executionMonitoringStartAt: '2020-08-03 02:57:39',
                executionMonitoringEndAt: '2020-08-02 23:56:35',
                cancelled: 8952689968,
                completed: 6576241416,
                error: 4651474710,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'c8a49izcvfyb3e4gytvjv5j8y7n2lipf7rjh25yrgtsxhljbod',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'o1e5olvvulpegy11x8o0',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 05:05:01',
                executionMonitoringStartAt: '2020-08-03 17:38:57',
                executionMonitoringEndAt: '2020-08-02 23:52:05',
                cancelled: 96992980920,
                completed: 3138092982,
                error: 2236702105,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 's2z0k8ecqezvlfpynta4kddp3a5lf6ctt6dnp1qhhn0w4orors',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'j8huua4clph9qx1os8vo',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 07:39:34',
                executionMonitoringStartAt: '2020-08-03 04:44:09',
                executionMonitoringEndAt: '2020-08-03 02:16:40',
                cancelled: 9717682843,
                completed: 93386314724,
                error: 7498922312,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'iawmzsl46frihb2k1lui9qu9ic51v1xxfmbhi4g6gj3xrxb236',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: '36aj87g6wfx34nxj3icb',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 17:30:58',
                executionMonitoringStartAt: '2020-08-03 15:22:56',
                executionMonitoringEndAt: '2020-08-02 20:56:37',
                cancelled: 3580158003,
                completed: 5721404816,
                error: 18366280347,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'odfcae039la1qqc8gsjj1nb7mdc8aeht88tjrcz1p5sp97seq7',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'rdi8qffflsesxcb9s4m5',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 01:14:47',
                executionMonitoringStartAt: '2020-08-03 07:53:24',
                executionMonitoringEndAt: '2020-08-03 04:00:42',
                cancelled: -9,
                completed: 6121146005,
                error: 3030739498,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'qlzuzc8zfi0mlpyhju33j3nlr3fx8mygxg1mys7kbfi8uptzjt',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'dsmsm3xqmcvh1w007ae7',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-02 22:39:06',
                executionMonitoringStartAt: '2020-08-03 11:35:50',
                executionMonitoringEndAt: '2020-08-03 10:53:50',
                cancelled: 1403706583,
                completed: -9,
                error: 6430651690,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'd48hwq2zfvivgcro267oz6el52cpqcs3zfsyesmsvxberx3fqb',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'nmrvfk5le1atikvok1vl',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 02:20:12',
                executionMonitoringStartAt: '2020-08-03 03:20:39',
                executionMonitoringEndAt: '2020-08-03 15:40:42',
                cancelled: 6817343707,
                completed: 1229174308,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'axjlliey3w8ae1c9a84pczufhcvxk2si69i70x2zcn2kdr3lcm',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 's367fr7pfmq2tm9ne84s',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'XXXX',
                executionExecutedAt: '2020-08-02 21:55:49',
                executionMonitoringStartAt: '2020-08-03 07:56:03',
                executionMonitoringEndAt: '2020-08-03 08:55:49',
                cancelled: 6052409715,
                completed: 2714797084,
                error: 1031779615,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'ys6xk2aqlw9cutx65myicidanw592ejwx3hpw2mb9x4mvgmvjh',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'sczmmfwwfa9353psjkm5',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-08-02 20:32:01',
                executionMonitoringEndAt: '2020-08-03 10:02:28',
                cancelled: 4382929493,
                completed: 4285870688,
                error: 6477050048,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'bs9wg91bje9l105787umx1lvr87ncx6vsujqgwvp4pd6x3jcqv',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'p0j0e8kg59gnmme1mhac',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 23:20:50',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-08-03 16:44:52',
                cancelled: 1960127017,
                completed: 3593512569,
                error: 8680038311,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'kh2qrexcgc6li3vgwxfkh6vyi9dakbqhh1vhi2d85x3u7rlqv1',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'e3c1zj45k6wub3a41665',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-08-03 06:05:00',
                executionMonitoringStartAt: '2020-08-03 06:25:44',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 9364937711,
                completed: 7781281568,
                error: 7340037869,
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
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: 'ftojl0q6dzotv2y5d5vnryi0kytzsx3uu15hfd0wo9ngf3cn1q',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: 'edso411mp8c91y63f6wp',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 15:39:02',
                executionMonitoringStartAt: '2020-08-02 23:06:38',
                executionMonitoringEndAt: '2020-08-03 16:22:49',
                cancelled: 7946241675,
                completed: 5923233423,
                error: 4592274150,
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
                        value   : '90a2d324-a9e7-4e83-b481-af0fb108a23d'
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
                        value   : 'cef152b6-5cb4-4bde-8e87-db647bdef79d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cef152b6-5cb4-4bde-8e87-db647bdef79d'));
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/dfcebfba-412f-400e-9d78-a68efb84003c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/cef152b6-5cb4-4bde-8e87-db647bdef79d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cef152b6-5cb4-4bde-8e87-db647bdef79d'));
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
                
                id: '55ec1cc7-cea6-4ee0-a38a-8ee80f5970aa',
                tenantId: 'fbfb5522-4e64-42cb-ba66-5cbca3926ee4',
                tenantCode: '4ivyn2xgnqs22vsicdx2q41q04tcg4opfnd58xddh67wl8qqvb',
                systemId: '7a2192fb-f267-485a-8788-e11447dcf749',
                systemName: 'qoiz6a4353v7xro63mtj',
                executionId: '4b9efc3a-b720-4535-9af3-4acd9c0934de',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-02 22:07:42',
                executionMonitoringStartAt: '2020-08-03 07:26:38',
                executionMonitoringEndAt: '2020-08-03 08:04:31',
                cancelled: 3694342095,
                completed: 1185410474,
                error: 2157905780,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                tenantCode: '34h3621mojkuunfh9qni8gcvcgsi8zjq7226iv2xjb1gl0yfyv',
                systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                systemName: '4hbay26flfe6gnl8rf86',
                executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-08-03 11:47:42',
                executionMonitoringStartAt: '2020-08-03 13:32:39',
                executionMonitoringEndAt: '2020-08-03 17:41:51',
                cancelled: 6134704103,
                completed: 9842808064,
                error: 5434511283,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cef152b6-5cb4-4bde-8e87-db647bdef79d'));
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/a3f973ea-ec3f-4e64-b0fc-216ca43e13bd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/cef152b6-5cb4-4bde-8e87-db647bdef79d')
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
                        id: '87c8d1e4-4f42-4086-a79e-dc1418d3e1c9',
                        tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                        tenantCode: 'hd04demhxhx3r4aglwbw7cibxrtaxgq1nseqxm696h9deawg3s',
                        systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                        systemName: '64cfe822svmcngunw209',
                        executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-03 04:38:14',
                        executionMonitoringStartAt: '2020-08-03 12:12:44',
                        executionMonitoringEndAt: '2020-08-03 01:05:14',
                        cancelled: 2264592647,
                        completed: 3263914656,
                        error: 2780200702,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '87c8d1e4-4f42-4086-a79e-dc1418d3e1c9');
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
                            value   : '5fed4284-cf75-4716-bbe3-1cc1eec273b8'
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
                            value   : 'cef152b6-5cb4-4bde-8e87-db647bdef79d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('cef152b6-5cb4-4bde-8e87-db647bdef79d');
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
                    id: '5d521478-cca7-424b-afbd-65d714b5a034'
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
                    id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('cef152b6-5cb4-4bde-8e87-db647bdef79d');
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
                        
                        id: '4c4039e6-1fd1-491f-b435-5ce876f99f38',
                        tenantId: '91853ed1-ddd5-464c-9fbd-9a0512c2a1df',
                        tenantCode: 'a8jmwl0n1mw9xv6hdeqxyjycz56ja0y8zgaqakbxaa145wf1x9',
                        systemId: '6a49b5c4-f12b-4f87-a4da-3d7154fcfc6c',
                        systemName: 'ls4r495jyp9pftd5d77p',
                        executionId: 'a65a0bea-ec68-4205-8c42-d6491bc5f6c3',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-08-02 23:23:45',
                        executionMonitoringStartAt: '2020-08-03 11:19:04',
                        executionMonitoringEndAt: '2020-08-03 05:26:54',
                        cancelled: 3596188958,
                        completed: 2838949688,
                        error: 7949500496,
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
                        
                        id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d',
                        tenantId: '3c094bcc-81c4-45d5-bf3c-9fa973bf0cc3',
                        tenantCode: 'dj96ql4u74beyrd6vcr3u6ldjxp5nousa8f9t5suumujwcoe2m',
                        systemId: '47242f1e-225b-4775-a350-6e0d7e43db0c',
                        systemName: 'ljp3n7m0ekq307aeskh9',
                        executionId: '3892e556-c03a-40c9-ae1e-fe5fc55c2ea4',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-08-02 20:22:15',
                        executionMonitoringStartAt: '2020-08-03 12:30:11',
                        executionMonitoringEndAt: '2020-08-03 02:48:42',
                        cancelled: 3038133282,
                        completed: 9845060255,
                        error: 3466332513,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('cef152b6-5cb4-4bde-8e87-db647bdef79d');
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
                    id: '398ffef4-792a-4662-a32c-9623a8be636a'
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
                    id: 'cef152b6-5cb4-4bde-8e87-db647bdef79d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('cef152b6-5cb4-4bde-8e87-db647bdef79d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});