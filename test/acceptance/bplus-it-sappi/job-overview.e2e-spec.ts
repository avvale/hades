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
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'syc8w27x0gesek8w3z4u2mh87gxc96a8y2v4ssenf6n633of67',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'a2680hlascoi0fxsgnp9',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 08:32:56',
                executionMonitoringStartAt: '2020-07-24 16:44:22',
                executionMonitoringEndAt: '2020-07-24 11:50:13',
                cancelled: 6693827682,
                completed: 6606489470,
                error: 5653246940,
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
                
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 's0o803tkl1nwgruiuqxpzkpeu4j0gc062bt55o4jzqml4nq0zz',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'ue1n6m32oguj61sn62ub',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 16:20:15',
                executionMonitoringStartAt: '2020-07-24 03:50:04',
                executionMonitoringEndAt: '2020-07-24 11:22:56',
                cancelled: 8223155326,
                completed: 2366214786,
                error: 5279295579,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: null,
                tenantCode: 'zj3o4g9u4494pa7g0o1cc2eytlh0ivpd5gvrcqhkr4b1rnw11d',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'xvl81fc3jlda599d93ya',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 03:07:34',
                executionMonitoringStartAt: '2020-07-23 21:42:54',
                executionMonitoringEndAt: '2020-07-24 06:41:51',
                cancelled: 7225083285,
                completed: 1191884683,
                error: 8398354719,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                
                tenantCode: 'r8d2ezugl96c0bf5t8cuijy0m4ti9ynjht06lm4fbgwuvooahk',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '9dqaba94tzd0d02zzsb0',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 03:41:53',
                executionMonitoringStartAt: '2020-07-24 16:53:57',
                executionMonitoringEndAt: '2020-07-24 16:43:39',
                cancelled: 8705193936,
                completed: 7737220484,
                error: 7960303029,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: null,
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'ya31l5u60h9sk43z0k4k',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 20:54:10',
                executionMonitoringStartAt: '2020-07-23 20:48:51',
                executionMonitoringEndAt: '2020-07-24 09:45:55',
                cancelled: 3288304536,
                completed: 1669768350,
                error: 9140299127,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '0drhu86stet3eznasq5u',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 15:32:49',
                executionMonitoringStartAt: '2020-07-24 04:56:36',
                executionMonitoringEndAt: '2020-07-24 12:17:13',
                cancelled: 3776028618,
                completed: 8409558898,
                error: 2731913816,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'zvmoocnbs489srd4f62gl6v8lhej671etrfxcdwln1m169xwwh',
                systemId: null,
                systemName: 'ovx3b7w9mh7n42s6s9ou',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 04:03:00',
                executionMonitoringStartAt: '2020-07-23 22:54:13',
                executionMonitoringEndAt: '2020-07-24 04:23:00',
                cancelled: 6097120885,
                completed: 8853097908,
                error: 6867938304,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'tpa4cohpaag9b92nwtr8pjyat7ic3cy4zjck7yvq103tblxszv',
                
                systemName: '7eweu5o77vpyexm58r1t',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 03:54:38',
                executionMonitoringStartAt: '2020-07-23 20:16:27',
                executionMonitoringEndAt: '2020-07-23 23:50:38',
                cancelled: 3393537654,
                completed: 5864099885,
                error: 6567102171,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'sbpbpkk94bdx5h8k1vm43qccdn231mkqnwfkn6k4tedyc7gnvq',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: null,
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 05:54:13',
                executionMonitoringStartAt: '2020-07-24 06:43:39',
                executionMonitoringEndAt: '2020-07-24 06:33:11',
                cancelled: 2110758086,
                completed: 8346048329,
                error: 6803026168,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '912oes3bz27p6845598u3s9id3sfvchwtom51cnuzip28cz6dc',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 09:57:55',
                executionMonitoringStartAt: '2020-07-24 07:40:55',
                executionMonitoringEndAt: '2020-07-24 01:09:02',
                cancelled: 3979705570,
                completed: 8131472263,
                error: 7641834167,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '5u77mjlv0qh9znjug4p1nwmx91461wx72e2t2jrpiskc91vu09',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '3k55nskqmk4hj3ggzugd',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 03:09:29',
                executionMonitoringStartAt: '2020-07-24 10:44:57',
                executionMonitoringEndAt: '2020-07-23 21:24:50',
                cancelled: 3844839251,
                completed: 9021604495,
                error: 9101469982,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'qki5eweizspvwc5bldxiv9aucdjghf3jbk67m2koyo959eru0g',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '3nfvd2orcbul0lef75te',
                
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 14:45:39',
                executionMonitoringStartAt: '2020-07-24 10:22:57',
                executionMonitoringEndAt: '2020-07-23 21:38:49',
                cancelled: 1390964189,
                completed: 1238659528,
                error: 3304465256,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'ifp4nf79cjw15vdj3da3eopfrvqa2q3h2cox7skt4zlzy4gyj1',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'sytbc62l6y53hfcedly5',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: null,
                executionExecutedAt: '2020-07-24 10:29:34',
                executionMonitoringStartAt: '2020-07-24 07:18:39',
                executionMonitoringEndAt: '2020-07-24 11:34:06',
                cancelled: 6233141951,
                completed: 4963593224,
                error: 2741645040,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'h69jlbi0laa9whe3ejh2jvaayzcylk1l935j4gyyqff9vhxqje',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'qqleuuw94xtunj27065l',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                
                executionExecutedAt: '2020-07-24 07:36:34',
                executionMonitoringStartAt: '2020-07-23 20:18:25',
                executionMonitoringEndAt: '2020-07-23 19:29:48',
                cancelled: 2216593564,
                completed: 4730258018,
                error: 4295690387,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'jrnu1upyvmrwlvphav400r91f5jkyqu4zisslmxpohfboy9sx2',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '3b4tw8dkcihcznm2luxh',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-07-24 07:22:37',
                executionMonitoringEndAt: '2020-07-23 20:33:50',
                cancelled: 4833947697,
                completed: 4904192537,
                error: 9687768294,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '93q82l16bsoekkjfb0pl5t0tg6ud8o4za4ayo8p1kikps1vpwb',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '92pczxy2iw6zxoycidkx',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                
                executionMonitoringStartAt: '2020-07-24 08:34:18',
                executionMonitoringEndAt: '2020-07-24 10:24:28',
                cancelled: 6069153544,
                completed: 2286643260,
                error: 1512259786,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '188oxo9e2rn8z18epj9g9gxhxsyiahcxir3f4kwj5ajqtsh1j0',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'grnfpt3x4i65gq4zys60',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 21:08:53',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-07-24 02:28:01',
                cancelled: 4910194345,
                completed: 9313444959,
                error: 9176700686,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'd1mw9q6xjgtthv9tmhmp9dh94iyynpmc96ezssav93lo9ooain',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'yaapzs96zjt8pxzanb4q',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 13:22:15',
                
                executionMonitoringEndAt: '2020-07-24 12:56:05',
                cancelled: 3222544337,
                completed: 9190889931,
                error: 3035407110,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '4oly6i7c1ym41cwazy9ra7pzif4541zy2clffi6p20l916dt65',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'e0o5zsa2nr1rouq0ofdk',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 06:31:39',
                executionMonitoringStartAt: '2020-07-24 09:04:01',
                executionMonitoringEndAt: null,
                cancelled: 4743071188,
                completed: 8993411186,
                error: 2016863616,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '05ar9vtrjsgfdr3hx5o2sxdh4vwodob8hlqx5y5obg9qgzxkwz',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'sm7smx7kg9ywl4ds8xv9',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 19:20:39',
                executionMonitoringStartAt: '2020-07-24 13:32:26',
                
                cancelled: 6709439536,
                completed: 4378738410,
                error: 5182346743,
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
                id: '1hv1rle33da0qf9d5ljvpdglb2es38ryw3brh',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '8zithw84stz2ri4mh98849uktt2rw7aygmlzf6rmxynbp62w8q',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '3dr1avaevgls0u08fmfh',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 10:41:18',
                executionMonitoringStartAt: '2020-07-24 04:16:10',
                executionMonitoringEndAt: '2020-07-23 22:38:45',
                cancelled: 5210034465,
                completed: 2023195006,
                error: 2920197039,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: 'yjauqrzu1410481bxj6rljsnd4vy430xiflmq',
                tenantCode: 'wr96l106xg89kyljtm1eqturkchgddvrl5xbz2ioavw7jdbady',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '5gcpmyhgc4n0lnj3m7ih',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 21:33:08',
                executionMonitoringStartAt: '2020-07-24 10:16:59',
                executionMonitoringEndAt: '2020-07-24 05:10:51',
                cancelled: 9295905365,
                completed: 9507797922,
                error: 1834745345,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'qd4dk4006vx9dfchlyny6uly5p562vu4c7z3i83q40d0zmv5ww',
                systemId: '9uaw8xu93m4toeziv1dkik8aklngnjyhx6yn0',
                systemName: '8ejb1alyl7jg3ffpi3um',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 09:11:49',
                executionMonitoringStartAt: '2020-07-23 18:59:05',
                executionMonitoringEndAt: '2020-07-24 14:22:07',
                cancelled: 1743816102,
                completed: 5894196199,
                error: 1600663069,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'pzar8vml88hmzglwtr8jycrvzq58srffil9wsvocdjqkzw5629',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '43e4jgy9ohumotjq3iyu',
                executionId: 'tekcetyvxlvj25ajhen25w19oue1l8zyxylh8',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 07:19:38',
                executionMonitoringStartAt: '2020-07-24 00:29:33',
                executionMonitoringEndAt: '2020-07-24 13:34:43',
                cancelled: 6555132011,
                completed: 3860031743,
                error: 1608910656,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '8vejtn516obtwueb1g3m404kzf0x3a0o9mm5bja6dmusg8fftlb',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'y3my6m1u65rxjftukcez',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 02:40:09',
                executionMonitoringStartAt: '2020-07-23 20:26:52',
                executionMonitoringEndAt: '2020-07-24 09:20:35',
                cancelled: 4580194578,
                completed: 9197400042,
                error: 4898970478,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'o52006reak65b2hgdndora3h0u10f9l0tw71uhin8hh6fyk3r9',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'vfy87djem6t7zvbvspmqz',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 22:03:16',
                executionMonitoringStartAt: '2020-07-24 07:20:39',
                executionMonitoringEndAt: '2020-07-24 08:57:46',
                cancelled: 1365689062,
                completed: 8755409093,
                error: 1103783065,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '3xevz37drkjrzfkkj9htfo6s2n4n16k0vfqk8glpe1jqihzsc1',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '3xcakmsyfzvfkhidp245',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 20:39:40',
                executionMonitoringStartAt: '2020-07-24 07:02:46',
                executionMonitoringEndAt: '2020-07-24 08:46:17',
                cancelled: 75777836560,
                completed: 5275101718,
                error: 4878069409,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'b0j6l1fk6t5fyp96p5wyjlcmjul8v0nriztrahuufxqu0uqnqb',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'ssg2wsfn854ad8qcnvog',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 05:24:52',
                executionMonitoringStartAt: '2020-07-24 05:14:09',
                executionMonitoringEndAt: '2020-07-24 05:51:32',
                cancelled: 6097643515,
                completed: 46747061376,
                error: 6949986440,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'nkzbny2ah7ixd332b8o8ufn4q3u0lpzetgu018xz7pnkdcbauy',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'vtjib9uczjsgmcpdvblv',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 04:48:13',
                executionMonitoringStartAt: '2020-07-24 02:50:54',
                executionMonitoringEndAt: '2020-07-24 07:59:13',
                cancelled: 8061088212,
                completed: 1941434558,
                error: 67602696418,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'x6x22vunk3bp53xtooik9qy1c7z68ha76p5y3fp3335hfvyneq',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'zb8jsx3l4p6gnzwo7yxz',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-23 23:58:05',
                executionMonitoringStartAt: '2020-07-24 02:56:11',
                executionMonitoringEndAt: '2020-07-24 03:16:40',
                cancelled: -9,
                completed: 1630783431,
                error: 5139864320,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'nat33bd7b277wh7onz33p2hyv4f8udb13q22ojolduxat6nngt',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '24p1e7gxfkix4wj8f79o',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 10:31:14',
                executionMonitoringStartAt: '2020-07-24 13:30:17',
                executionMonitoringEndAt: '2020-07-24 01:16:44',
                cancelled: 5161358297,
                completed: -9,
                error: 4271162350,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'mdnlo29ol5ijjkis4qks3raq9dfqrkffj556fs44b5fwnt32c7',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'ufomwls23fb1yxc4kp8f',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 10:42:24',
                executionMonitoringStartAt: '2020-07-24 03:46:17',
                executionMonitoringEndAt: '2020-07-24 09:34:14',
                cancelled: 7703006517,
                completed: 4347631102,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'weljyr1ddczyduodgn6zwugq5jbfx74afkmymclwx76j9uz1mf',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'ttlzpb8mq4kivvgyi6fx',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'XXXX',
                executionExecutedAt: '2020-07-24 15:00:20',
                executionMonitoringStartAt: '2020-07-24 03:52:48',
                executionMonitoringEndAt: '2020-07-24 15:54:22',
                cancelled: 4729345071,
                completed: 8596983592,
                error: 5727409701,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '0ak9f9b81lso7erraei5on8k8npe14of4ni1ddw7o0mn5yvbbo',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'lvpzwcr6w84y0orfczmp',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-07-24 14:27:25',
                executionMonitoringEndAt: '2020-07-23 22:56:51',
                cancelled: 2690201907,
                completed: 4141173560,
                error: 8814257316,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'rhlt6j6w0rlzc77v9kcwh22xtt7rxkqo3cvjhe3jdt68mgzdua',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'hqo15vy0fv9zaojf02uc',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 11:12:12',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-07-24 14:13:51',
                cancelled: 3269521059,
                completed: 1007550623,
                error: 4131764519,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: '56jqjvxpyb31m7ae2t33dlv9xk3g2o77el7tv7t49v7499tzxg',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'rheqa9p8k0qfcuhbhkta',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-23 20:42:56',
                executionMonitoringStartAt: '2020-07-24 08:24:34',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 4481611940,
                completed: 3683769684,
                error: 8429182512,
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
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'ahm6wjo3ox1q4hf88s6a5dfi7o65qxl26lo6bqyb6i9goxx32s',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: 'p2cf5kfvw82fesd529nj',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 02:56:26',
                executionMonitoringStartAt: '2020-07-24 04:39:49',
                executionMonitoringEndAt: '2020-07-23 22:00:43',
                cancelled: 8504568307,
                completed: 5164863198,
                error: 6086949088,
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
                        value   : 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2'));
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
            .get('/bplus-it-sappi/job-overview/cd7d3c61-a95e-4df5-8086-d49a4f26d8c2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2'));
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
                
                id: 'dc5e0514-79f4-4811-b13a-559c4b890177',
                tenantId: '65cbf70b-5c43-41d5-bc49-fc1a22882348',
                tenantCode: 'ok2e9zmlw88t6m8bze11nxgza4pm72xjxd22bhlrsgphg14x7v',
                systemId: 'f5f8e6ee-f055-4bea-b75c-025908087336',
                systemName: 'mboqcyk5yf8ai7ctnqaf',
                executionId: 'f5fcf16c-fdaf-48f3-b130-983371be6875',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-07-24 06:16:45',
                executionMonitoringStartAt: '2020-07-24 04:36:30',
                executionMonitoringEndAt: '2020-07-24 08:48:26',
                cancelled: 7127962068,
                completed: 2082478918,
                error: 4489809089,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                tenantCode: 'jj5d9h1g2qcwiq61w6jm4pnzsadymxrnhgldar3vuemhkywlon',
                systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                systemName: '31e6n4x7tiyf0pzrwz4p',
                executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-07-24 17:35:35',
                executionMonitoringStartAt: '2020-07-24 14:17:06',
                executionMonitoringEndAt: '2020-07-24 14:05:12',
                cancelled: 5548470199,
                completed: 2677811770,
                error: 8526416331,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2'));
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
            .delete('/bplus-it-sappi/job-overview/cd7d3c61-a95e-4df5-8086-d49a4f26d8c2')
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
                        id: '981cd347-a76a-4457-9b74-fa2ce5891c91',
                        tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                        tenantCode: '33q3ofpwlw6mebqry4fb35ojzn06dzg9wdy7bwxlcjq1hm6sys',
                        systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                        systemName: 'w0ozppxacxm6fx43kgge',
                        executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-07-23 20:21:54',
                        executionMonitoringStartAt: '2020-07-24 06:55:58',
                        executionMonitoringEndAt: '2020-07-24 09:19:10',
                        cancelled: 1090595916,
                        completed: 4690581075,
                        error: 3057379108,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateJobOverview).toHaveProperty('id', '981cd347-a76a-4457-9b74-fa2ce5891c91');
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
                            value   : 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverview.id).toStrictEqual('cd7d3c61-a95e-4df5-8086-d49a4f26d8c2');
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
                    id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindJobOverviewById.id).toStrictEqual('cd7d3c61-a95e-4df5-8086-d49a4f26d8c2');
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
                        
                        id: 'af202858-5763-44a9-9dd8-ae9ac06da432',
                        tenantId: '03f394a4-6a0a-40ab-8824-dee8d12f65a6',
                        tenantCode: 'ipyspscpp452sigxtxf290tj348bugzaamgkeytzp9ou07vjio',
                        systemId: '495a6c60-4520-4eea-9849-41128d4a03d5',
                        systemName: '5b8js3rng4yaybzew0z2',
                        executionId: '843365d4-6ec9-4036-ae09-c6e2cf3e82f9',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-24 08:57:53',
                        executionMonitoringStartAt: '2020-07-23 21:39:46',
                        executionMonitoringEndAt: '2020-07-24 00:25:58',
                        cancelled: 6164095910,
                        completed: 2015236125,
                        error: 2819831332,
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
                        
                        id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2',
                        tenantId: '1d424438-267d-4d71-8d65-9e63ffbd1c5b',
                        tenantCode: '613e4quamb5ylcm91nrncezj8ednn7lowes5ro3a7msojwtx78',
                        systemId: '978c5246-a920-41a7-b8c9-9327486ab5c9',
                        systemName: '19jvz1id7f1rhmq0vrs8',
                        executionId: 'a4c6205c-7644-4e90-bb97-6cc66579b122',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-07-24 15:34:26',
                        executionMonitoringStartAt: '2020-07-24 07:17:44',
                        executionMonitoringEndAt: '2020-07-24 09:39:36',
                        cancelled: 6814448808,
                        completed: 3199824160,
                        error: 3086384850,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateJobOverview.id).toStrictEqual('cd7d3c61-a95e-4df5-8086-d49a4f26d8c2');
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
                    id: 'cd7d3c61-a95e-4df5-8086-d49a4f26d8c2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteJobOverviewById.id).toStrictEqual('cd7d3c61-a95e-4df5-8086-d49a4f26d8c2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});