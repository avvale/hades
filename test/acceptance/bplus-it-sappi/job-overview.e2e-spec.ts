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

    it(`/REST:POST bplus-it-sappi/job-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: '0qwb7q2amfb2rhj7d4yk',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 22:47:02',
                executionMonitoringStartAt: '2020-07-16 22:50:30',
                executionMonitoringEndAt: '2020-07-17 02:48:29',
                cancelled: 2854413196,
                completed: 9149409809,
                error: 2629507410,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: '2jipwq17t419l35agwc7',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 19:33:00',
                executionMonitoringStartAt: '2020-07-16 21:23:23',
                executionMonitoringEndAt: '2020-07-17 09:17:41',
                cancelled: 7622824605,
                completed: 8115494624,
                error: 1361589901,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: null,
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'm6ovhr5ba1jfh465xmgm',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 04:44:15',
                executionMonitoringStartAt: '2020-07-17 10:00:33',
                executionMonitoringEndAt: '2020-07-17 14:52:29',
                cancelled: 5465442902,
                completed: 2936724176,
                error: 3934087868,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'vglivfcgza4xyp0ick1u',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 12:07:00',
                executionMonitoringStartAt: '2020-07-17 01:56:48',
                executionMonitoringEndAt: '2020-07-17 06:22:09',
                cancelled: 5171143909,
                completed: 2812056285,
                error: 4702664204,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: null,
                systemName: 'swalh1gg03by5af88yod',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 01:56:04',
                executionMonitoringStartAt: '2020-07-17 05:52:00',
                executionMonitoringEndAt: '2020-07-17 00:59:43',
                cancelled: 4375119522,
                completed: 1196916465,
                error: 6212313115,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                
                systemName: 'mhk5c1x1m95b1krs0g4q',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:58:57',
                executionMonitoringStartAt: '2020-07-17 15:13:47',
                executionMonitoringEndAt: '2020-07-16 21:03:20',
                cancelled: 7925228195,
                completed: 1827414710,
                error: 4674250555,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: null,
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 07:59:07',
                executionMonitoringStartAt: '2020-07-16 21:45:11',
                executionMonitoringEndAt: '2020-07-16 20:05:46',
                cancelled: 8166149005,
                completed: 9155048500,
                error: 5646706808,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 00:00:00',
                executionMonitoringStartAt: '2020-07-17 14:26:06',
                executionMonitoringEndAt: '2020-07-17 09:04:04',
                cancelled: 2977423868,
                completed: 9963032116,
                error: 9837116141,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'vgyapfg88pcd59pcpz1r',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 04:48:58',
                executionMonitoringStartAt: '2020-07-17 04:30:21',
                executionMonitoringEndAt: '2020-07-16 17:01:17',
                cancelled: 6269534095,
                completed: 5105346506,
                error: 6754079978,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'c3ouw1lna04ildtvni8u',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 06:04:33',
                executionMonitoringStartAt: '2020-07-17 16:03:38',
                executionMonitoringEndAt: '2020-07-17 06:35:27',
                cancelled: 6486824905,
                completed: 1437757308,
                error: 1320622252,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'wy0g081mzajaqyc9t2yz',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: null,
                executionExecutedAt: '2020-07-16 19:29:38',
                executionMonitoringStartAt: '2020-07-17 00:09:41',
                executionMonitoringEndAt: '2020-07-17 00:07:40',
                cancelled: 6465168900,
                completed: 3499821842,
                error: 7124079110,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'thq71aooypj7wskmzseq',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                
                executionExecutedAt: '2020-07-17 11:42:52',
                executionMonitoringStartAt: '2020-07-17 06:38:19',
                executionMonitoringEndAt: '2020-07-17 14:26:41',
                cancelled: 6742483212,
                completed: 4896543086,
                error: 2465863588,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'pr4i6hhv7kdpvbnl745y',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-17 05:02:54',
                executionMonitoringEndAt: '2020-07-16 21:48:29',
                cancelled: 2463151713,
                completed: 9156055666,
                error: 7944771339,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'p5c6x9eczwaryuttmm3f',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-07-16 23:38:10',
                executionMonitoringEndAt: '2020-07-17 03:54:29',
                cancelled: 7026950494,
                completed: 1787394864,
                error: 6614195134,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'cry5auniavvy1qc1jh1h',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 06:00:04',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-17 10:17:49',
                cancelled: 6240048806,
                completed: 6525546508,
                error: 9033100045,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'ietemf45won32ec5d85u',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 20:34:41',
                
                executionMonitoringEndAt: '2020-07-17 07:00:01',
                cancelled: 4958236964,
                completed: 8305153249,
                error: 2814920538,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'hcyhbnivs2z8t24u29m0',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 08:29:42',
                executionMonitoringStartAt: '2020-07-17 01:01:37',
                executionMonitoringEndAt: null,
                cancelled: 9752224360,
                completed: 2239074701,
                error: 3208483583,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: '4u3e57ghxaf0qdegs0nw',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 05:28:50',
                executionMonitoringStartAt: '2020-07-17 09:15:07',
                
                cancelled: 4166971887,
                completed: 8245927900,
                error: 4254628664,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'oonnequ42p3gkfqjud7fd898qel5p1x0hpq6w',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'v2z0xdslh685yohy2old',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 22:28:43',
                executionMonitoringStartAt: '2020-07-16 20:32:29',
                executionMonitoringEndAt: '2020-07-17 08:17:02',
                cancelled: 7390124182,
                completed: 7075249565,
                error: 5372180290,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: 'km8wo7jbenrnzgmvd8fc7c4i8x5w6bdpdke0u',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'rq0dpptbe6whfupfo9tb',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 22:40:22',
                executionMonitoringStartAt: '2020-07-16 22:44:36',
                executionMonitoringEndAt: '2020-07-17 05:11:23',
                cancelled: 6553592967,
                completed: 6369251518,
                error: 6081005724,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: 'neaflnkmfm9nqyv4pu33tghkw9monxd3bjwfp',
                systemName: 'xbgupr3wiqwup982sw97',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 23:31:03',
                executionMonitoringStartAt: '2020-07-17 05:39:30',
                executionMonitoringEndAt: '2020-07-16 21:54:17',
                cancelled: 9847994255,
                completed: 1265391758,
                error: 7690283576,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: '17fp8tavmsz05ucne2b7',
                executionId: '2bgv4m6jx0yot5zv8kci3qrcxz8img3xd5oyk',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 10:38:35',
                executionMonitoringStartAt: '2020-07-17 07:21:38',
                executionMonitoringEndAt: '2020-07-17 03:52:14',
                cancelled: 8646385583,
                completed: 3669496901,
                error: 7420485409,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'xehs7pn9fxg4jvhxzhlto',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 23:11:25',
                executionMonitoringStartAt: '2020-07-17 01:52:39',
                executionMonitoringEndAt: '2020-07-16 18:21:07',
                cancelled: 6636001717,
                completed: 7310277003,
                error: 8349973419,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'rb6250bhi9ks0qy5f2yp',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 01:18:30',
                executionMonitoringStartAt: '2020-07-16 17:18:19',
                executionMonitoringEndAt: '2020-07-17 08:26:09',
                cancelled: 96624594895,
                completed: 6857871550,
                error: 7623012342,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'r4tyejgr9skfchntt2ue',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 20:23:44',
                executionMonitoringStartAt: '2020-07-17 00:40:41',
                executionMonitoringEndAt: '2020-07-17 02:22:43',
                cancelled: 7902884904,
                completed: 85166241474,
                error: 4263118948,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted is too large, has a maximum length of 10');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: '4h2sjdsk7ia68ifr5oli',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 01:44:07',
                executionMonitoringStartAt: '2020-07-17 10:06:56',
                executionMonitoringEndAt: '2020-07-16 19:13:48',
                cancelled: 4458987675,
                completed: 4775803785,
                error: 84540389502,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'vnf8xxgt8h7y8h073zad',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-16 18:17:13',
                executionMonitoringStartAt: '2020-07-17 12:51:37',
                executionMonitoringEndAt: '2020-07-17 07:01:03',
                cancelled: -9,
                completed: 6876419758,
                error: 7521909062,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewCompleted must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'ealhzb4vaz9hdi5bn6qp',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 07:32:15',
                executionMonitoringStartAt: '2020-07-17 15:49:16',
                executionMonitoringEndAt: '2020-07-17 03:38:30',
                cancelled: 1463601198,
                completed: -9,
                error: 3862503671,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCompleted must have a positive sign, this field does not accept negative values');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'axpq5y9r72wck7vw8hm3',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-16 17:47:40',
                executionMonitoringStartAt: '2020-07-17 00:53:25',
                executionMonitoringEndAt: '2020-07-17 12:03:03',
                cancelled: 8362474478,
                completed: 4388310476,
                error: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: '4h53kn06o55vghfxp12j',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-17 01:08:45',
                executionMonitoringStartAt: '2020-07-16 22:32:14',
                executionMonitoringEndAt: '2020-07-17 06:26:37',
                cancelled: 2705084961,
                completed: 5827692825,
                error: 3457093342,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'l9gsrd75qyyapu3y4iqu',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-17 10:25:39',
                executionMonitoringEndAt: '2020-07-16 21:39:02',
                cancelled: 9370056296,
                completed: 1352707261,
                error: 1003293635,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: '96lmxc6z60kw47tgpeas',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 13:31:12',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-17 00:30:31',
                cancelled: 5785740920,
                completed: 2954542929,
                error: 5080243725,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'j8re314ymkslkabxq56b',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 00:12:52',
                executionMonitoringStartAt: '2020-07-16 16:35:26',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 9967261110,
                completed: 3995952894,
                error: 8084732592,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'xk9gkdp2x6tl1p9ftdy7',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 03:28:26',
                executionMonitoringStartAt: '2020-07-17 01:22:56',
                executionMonitoringEndAt: '2020-07-17 02:22:26',
                cancelled: 6611645051,
                completed: 8532817267,
                error: 3542861825,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/jobs-overview/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/job-overview`, () => 
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
                        value   : 'ea9a6163-9bf7-4646-b216-88706ab96519'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ea9a6163-9bf7-4646-b216-88706ab96519'));
    });

    it(`/REST:GET bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/job-overview/ea9a6163-9bf7-4646-b216-88706ab96519')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ea9a6163-9bf7-4646-b216-88706ab96519'));
    });

    it(`/REST:GET bplus-it-sappi/jobs-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/jobs-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a9ccdae1-9b46-4935-9c22-217f1b7154a6',
                tenantId: 'd0d17282-3bc1-4240-9d09-f7b99fae0c95',
                systemId: 'c37fccab-9a7d-43a9-958f-6d9fcf1637cf',
                systemName: 'ka7ljeikye7fpefgirzo',
                executionId: '5dc7b03d-0dd8-42df-86e9-bc8953369175',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-17 07:18:36',
                executionMonitoringStartAt: '2020-07-16 16:40:03',
                executionMonitoringEndAt: '2020-07-17 00:38:44',
                cancelled: 2200324150,
                completed: 5342990932,
                error: 4351361184,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                systemName: 'wss02fttroupc0xs091t',
                executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-17 14:48:29',
                executionMonitoringStartAt: '2020-07-16 18:28:44',
                executionMonitoringEndAt: '2020-07-17 09:11:52',
                cancelled: 2541344157,
                completed: 7153013691,
                error: 2431519277,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ea9a6163-9bf7-4646-b216-88706ab96519'));
    });

    it(`/REST:DELETE bplus-it-sappi/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/job-overview/ea9a6163-9bf7-4646-b216-88706ab96519')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateJobOverview - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateJobOverview`, () => 
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
                        id: '6a89db42-2eb0-4f61-9a03-8ee5749bd00d',
                        tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                        systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                        systemName: '6oudyzmjjofex1cad2hk',
                        executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-17 15:37:30',
                        executionMonitoringStartAt: '2020-07-17 09:38:07',
                        executionMonitoringEndAt: '2020-07-16 22:28:36',
                        cancelled: 2843397024,
                        completed: 1454953549,
                        error: 7552660775,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '6a89db42-2eb0-4f61-9a03-8ee5749bd00d');
            });
    });

    it(`/GraphQL bplusItSappiPaginateJobsOverview`, () => 
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

    it(`/GraphQL bplusItSappiFindJobOverview - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindJobOverview`, () => 
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
                            value   : 'ea9a6163-9bf7-4646-b216-88706ab96519'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('ea9a6163-9bf7-4646-b216-88706ab96519');
            });
    });

    it(`/GraphQL bplusItSappiFindJobOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindJobOverviewById`, () => 
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
                    id: 'ea9a6163-9bf7-4646-b216-88706ab96519'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('ea9a6163-9bf7-4646-b216-88706ab96519');
            });
    });

    it(`/GraphQL bplusItSappiGetJobsOverview`, () => 
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

    it(`/GraphQL bplusItSappiUpdateJobOverview - Got 404 Not Found`, () => 
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
                        
                        id: 'c94bed71-fc6d-4f06-bb77-2f01ef37c002',
                        tenantId: '8fbe8c7f-dc82-4a65-a7af-28d1cbdbce5e',
                        systemId: '01af5848-1e90-461e-9d94-29ea5540756c',
                        systemName: 'eojybrjyu1z5t7fwuo81',
                        executionId: 'b7501b33-2cda-4230-a0e1-a663d1951789',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-16 22:04:39',
                        executionMonitoringStartAt: '2020-07-16 21:58:26',
                        executionMonitoringEndAt: '2020-07-17 04:59:58',
                        cancelled: 7588962345,
                        completed: 7590400263,
                        error: 3169355889,
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

    it(`/GraphQL bplusItSappiUpdateJobOverview`, () => 
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
                        
                        id: 'ea9a6163-9bf7-4646-b216-88706ab96519',
                        tenantId: '3d9852bd-bac6-4ae4-bace-919f70515bc7',
                        systemId: '9bab2c5e-7d08-4a78-87ef-1139f4c8c45f',
                        systemName: 'awiz5d4k7zfjaeytvoz2',
                        executionId: '2260ba58-71bd-4e05-b3b5-1c2ebca6e661',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-17 06:24:02',
                        executionMonitoringStartAt: '2020-07-17 13:07:09',
                        executionMonitoringEndAt: '2020-07-16 19:38:37',
                        cancelled: 5526205202,
                        completed: 3290829923,
                        error: 3747600799,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('ea9a6163-9bf7-4646-b216-88706ab96519');
            });
    });

    it(`/GraphQL bplusItSappiDeleteJobOverviewById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteJobOverviewById`, () => 
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
                    id: 'ea9a6163-9bf7-4646-b216-88706ab96519'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('ea9a6163-9bf7-4646-b216-88706ab96519');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});