import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IJobOverviewRepository } from '@hades/cci/job-overview/domain/job-overview.repository';
import { MockJobOverviewRepository } from '@hades/cci/job-overview/infrastructure/mock/mock-job-overview.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST cci/job-overview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'kvun8a5wa454lxgpapn3hih78hbpp4sg9c5yjivp1bmklv65rk',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'dij6ykymys1ewzzqgyzh',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 06:41:26',
                executionMonitoringStartAt: '2020-11-04 08:20:46',
                executionMonitoringEndAt: '2020-11-04 13:13:42',
                cancelled: 3425458653,
                completed: 1607066829,
                error: 8320037567,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: '5g83jknnxzw8p76njtrph50s27nncvpweprn4qcpnvvjm94xro',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: '0zjuw5uemg4rsh7be76f',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:34:41',
                executionMonitoringStartAt: '2020-11-04 11:21:35',
                executionMonitoringEndAt: '2020-11-03 20:00:49',
                cancelled: 3382939390,
                completed: 4381794377,
                error: 3416634277,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: null,
                tenantCode: 'gil8c8l4teu1uqm8qdmoicqamiec36iem9dce87d5sk1zk72on',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'ltz16wk27u6ldy6936wf',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 08:40:28',
                executionMonitoringStartAt: '2020-11-04 09:32:49',
                executionMonitoringEndAt: '2020-11-04 00:25:00',
                cancelled: 9359222922,
                completed: 1758744166,
                error: 5636094730,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                
                tenantCode: 'm9hqnyay1alujk4yx6uda7grbnf9nokocaiw9xczyw6mwp03sr',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: '8n8db8kq362gjgl7cbsa',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 13:11:11',
                executionMonitoringStartAt: '2020-11-04 05:01:38',
                executionMonitoringEndAt: '2020-11-03 21:36:57',
                cancelled: 2539782832,
                completed: 6395658298,
                error: 8986097439,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: null,
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'pzd5c78n8ysqe06lr9m3',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 01:10:02',
                executionMonitoringStartAt: '2020-11-04 01:02:36',
                executionMonitoringEndAt: '2020-11-03 22:18:14',
                cancelled: 7472643375,
                completed: 9789608149,
                error: 9978992660,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: '518yyc2gd5ygbksl3kei',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:09:23',
                executionMonitoringStartAt: '2020-11-03 22:35:46',
                executionMonitoringEndAt: '2020-11-03 16:29:30',
                cancelled: 9557133309,
                completed: 8197250185,
                error: 4905167918,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'idygni2vhs3nfar9v2th11d37poxi5gvxs4vtupkgze1ipv5vo',
                systemId: null,
                systemName: '781h891sv3p6yglh4bup',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 23:44:19',
                executionMonitoringStartAt: '2020-11-03 16:41:50',
                executionMonitoringEndAt: '2020-11-04 08:14:56',
                cancelled: 6530547600,
                completed: 8994683649,
                error: 3337403788,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'hep6fo6n9f7czrp19ju2eg780cpcmwknu3o20qb9zdrk1gipmt',
                
                systemName: 'ygx6ru22ap54kf4hk3e3',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 16:29:24',
                executionMonitoringStartAt: '2020-11-03 21:10:35',
                executionMonitoringEndAt: '2020-11-03 16:25:14',
                cancelled: 9521595238,
                completed: 2641552826,
                error: 6145249696,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: '9v2c9xc9qrn8cts3vi5wr0eqbaidnq3j6gekdqdtams7ye7bjm',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: null,
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:10:07',
                executionMonitoringStartAt: '2020-11-04 12:26:34',
                executionMonitoringEndAt: '2020-11-04 05:58:28',
                cancelled: 2978347067,
                completed: 9527534899,
                error: 9252009289,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'tinn260k0v6kltub7bakzfz3haoye2fcdlnhka7znjcps76mh5',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:25:12',
                executionMonitoringStartAt: '2020-11-04 13:25:43',
                executionMonitoringEndAt: '2020-11-04 13:12:59',
                cancelled: 3833663398,
                completed: 6202991862,
                error: 1307511826,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'sl1quxhlhw7w6sze8kq0w9fgxwdcz0r2h863gcuh1qxdgc7z02',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'lhc3n47hx7t5qup3xy1j',
                executionId: null,
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 10:28:06',
                executionMonitoringStartAt: '2020-11-04 13:38:27',
                executionMonitoringEndAt: '2020-11-04 13:21:19',
                cancelled: 8138487145,
                completed: 6704543045,
                error: 6678126819,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: '5znlktkk1sqg3xqam9fr29ldplcrhqwodl226vnqh8oo38lsbd',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'n3bml4yeo2e7orgo29qn',
                
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 01:20:31',
                executionMonitoringStartAt: '2020-11-04 07:38:10',
                executionMonitoringEndAt: '2020-11-03 17:47:35',
                cancelled: 2054966359,
                completed: 2179984781,
                error: 6101818697,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'o0opswm42xgwt7de8wk68swzvfxocbrtjdx81f8tgh6i179y3w',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'ezxj37l7qavx47a244lu',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: null,
                executionExecutedAt: '2020-11-04 07:34:43',
                executionMonitoringStartAt: '2020-11-04 06:20:54',
                executionMonitoringEndAt: '2020-11-04 11:03:19',
                cancelled: 9359018955,
                completed: 7526401155,
                error: 2325326413,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'fsxjcquf6fyzitmfv9jbpupewug3eoetco7pdfh84lqvkuttvh',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: '71b5trbax3o3kf5p9g15',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                
                executionExecutedAt: '2020-11-03 19:45:41',
                executionMonitoringStartAt: '2020-11-04 02:57:42',
                executionMonitoringEndAt: '2020-11-03 22:02:30',
                cancelled: 5565166015,
                completed: 2251168463,
                error: 2816883936,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'yktziyiz5y6fdkr1jw5rk2n7fwitqcv5nw61ceip0d3zjacar2',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'p6k69d7dzqbumgiqmxj5',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: null,
                executionMonitoringStartAt: '2020-11-04 15:38:26',
                executionMonitoringEndAt: '2020-11-04 15:14:25',
                cancelled: 1781549809,
                completed: 6838854258,
                error: 5933751002,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'gq0mblldsy2dzzf8x3nexmm8j21vhw5prd4h8k4ly1czmonyjr',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'alvo2j936k7x83jrw2x7',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                
                executionMonitoringStartAt: '2020-11-04 11:02:38',
                executionMonitoringEndAt: '2020-11-03 22:16:15',
                cancelled: 9419444593,
                completed: 1081037563,
                error: 1072421718,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'xdag9qr42vsztkaqofc3hvmy3mttmuq6kqiy2yqcr8w2a522k6',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'zy8j8qfboc5b215359tb',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:35:14',
                executionMonitoringStartAt: null,
                executionMonitoringEndAt: '2020-11-04 15:22:51',
                cancelled: 2909404783,
                completed: 2518540731,
                error: 7899028734,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'otkw3aqm42jpu044bwbbsnntormcyx7l741duiwylfgkq46bol',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: '30enzfuyulyncvxbk56r',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 00:10:01',
                
                executionMonitoringEndAt: '2020-11-04 15:02:31',
                cancelled: 6663804312,
                completed: 3547848524,
                error: 1999947859,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'rn9o6sdjvcns5n5vcajhcv0t4w3r4jf0t8gp0cvi9wlstkj12j',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'n5imkdha6a46ks1hnhf5',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 23:31:49',
                executionMonitoringStartAt: '2020-11-03 17:07:59',
                executionMonitoringEndAt: null,
                cancelled: 9818987046,
                completed: 7834579390,
                error: 8058106357,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'zaqmcv0cg8imuekmm3nho4wk1gxcehf9a0nixkeoy4zni0ip6y',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'yjbmeod67vfdbz5q2j4b',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 17:37:32',
                executionMonitoringStartAt: '2020-11-04 04:06:02',
                
                cancelled: 4669763142,
                completed: 9894342286,
                error: 4987908254,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'taqrqfi95ip3vngjs5zs9bfk72jlif650ovgn',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'bfmgzbu48eukuopks4ancy7j2po1dthab5ynqwdk0w5q8bgif7',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'r0szr1ocbt2p30hxlo53',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 04:36:55',
                executionMonitoringStartAt: '2020-11-04 12:29:43',
                executionMonitoringEndAt: '2020-11-03 17:14:51',
                cancelled: 8114988540,
                completed: 6713586883,
                error: 9157189313,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '6gtsovsxrttxxre07my7tzam1xhku10neq9zp',
                tenantCode: '54wf93ji54jlltjmers8f16grufe36s6ij2d3emp09nooyuv9o',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'qpi1zmihkglywdas5qvv',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:57:39',
                executionMonitoringStartAt: '2020-11-03 20:31:53',
                executionMonitoringEndAt: '2020-11-04 06:26:31',
                cancelled: 8451947327,
                completed: 4270368004,
                error: 9293500131,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'bm4lms7f0e8rjntcu6hw2ipj13d3gvejmojzw6t6mwovw12xo8',
                systemId: 'cux9xpugodddqwk73g8bc0hfryx466vd4fz8m',
                systemName: 'b3ayuhx0ohpm4danepv8',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 12:06:58',
                executionMonitoringStartAt: '2020-11-04 08:14:01',
                executionMonitoringEndAt: '2020-11-03 18:18:59',
                cancelled: 5299881730,
                completed: 6143129816,
                error: 4676009836,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'gbv8rvkvl9emkm9ecvsti67ijmva875y5nhvn9o79eioqstqbs',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'gzg762ll7ix40hmutrzm',
                executionId: 'r1txx2cq2yzn7y3m99vvzdn08mkki9dc04u4y',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 21:50:30',
                executionMonitoringStartAt: '2020-11-03 23:52:15',
                executionMonitoringEndAt: '2020-11-04 07:32:59',
                cancelled: 3551224250,
                completed: 8409693466,
                error: 2581164052,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: '5i63cnwd56in2mrc2qn3pfm3my4rgx6rhyz9cwlqpwvtc94eh2k',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'ebwl9r8ki37tjnc0pd57',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:36:18',
                executionMonitoringStartAt: '2020-11-04 00:44:18',
                executionMonitoringEndAt: '2020-11-04 13:21:35',
                cancelled: 5207686561,
                completed: 2615595655,
                error: 6568663704,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: '0awutzkblt762zwek63kryf7cawvjz7nbv67kg5v5dgi6li8ab',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'p6icee0hq4osh5hopkfbq',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 08:24:56',
                executionMonitoringStartAt: '2020-11-04 13:48:46',
                executionMonitoringEndAt: '2020-11-04 12:37:54',
                cancelled: 2669952624,
                completed: 9276329737,
                error: 3598402375,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCancelled is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'zjwy23fi3g61lenxe5h3swqc1m2ok1xmwribak70dsbx5o49uq',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'jf1mzjbtrkc63ya2px17',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:32:31',
                executionMonitoringStartAt: '2020-11-04 04:48:40',
                executionMonitoringEndAt: '2020-11-04 11:38:58',
                cancelled: 42731470203,
                completed: 7455366297,
                error: 3676426870,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCancelled is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCompleted is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'i7rmdzg4cokt8ujj14neltn1dbfu3iy28qvmvxxrnfi1iv8cwa',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: '0bjickvysy7l4j9ss14i',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 16:56:48',
                executionMonitoringStartAt: '2020-11-03 17:26:25',
                executionMonitoringEndAt: '2020-11-04 02:30:46',
                cancelled: 1711786167,
                completed: 19622433905,
                error: 6102688737,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewCompleted is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewError is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'uz2uq7aul79t7c9mzkz7t1618qjhymln61gc35xx5emhm8rgp2',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: '019vje7u166oabva3c0n',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 16:38:45',
                executionMonitoringStartAt: '2020-11-04 12:58:45',
                executionMonitoringEndAt: '2020-11-03 16:05:19',
                cancelled: 7993512828,
                completed: 2148781419,
                error: 14415719813,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewError is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCancelled must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'xak88b5x6l1mksklfj7qop6j17ymh6ei4x0sf11h7lr22a8n9n',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'fwt03zkb8ghq2a0t165v',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-03 22:43:51',
                executionMonitoringStartAt: '2020-11-03 23:17:36',
                executionMonitoringEndAt: '2020-11-04 10:39:46',
                cancelled: -9,
                completed: 4549091895,
                error: 9233244365,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCancelled must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewCompleted must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'hbxl1aqcihhx0uc4b28796l7xayfoovxuj5bwqucthdoj24tye',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'ryix20x8j8x3m3va5glo',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-03 21:39:28',
                executionMonitoringStartAt: '2020-11-04 13:29:28',
                executionMonitoringEndAt: '2020-11-04 14:21:50',
                cancelled: 9578215460,
                completed: -9,
                error: 7888979381,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewCompleted must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewError must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'fl1demp9gfwnesgnrt5cd464bbs0p7hpr287q97ux199m9scow',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'yn4yphj1wlwmhx8253mu',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'SUMMARY',
                executionExecutedAt: '2020-11-04 12:41:28',
                executionMonitoringStartAt: '2020-11-04 04:23:00',
                executionMonitoringEndAt: '2020-11-04 06:04:39',
                cancelled: 7109576507,
                completed: 8331631228,
                error: -9,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for JobOverviewError must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: '56bj7rsdvx5p2f67si8rz4nrsmrnye7bk3946ywtod2xs3w3or',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'fb4kakyxpnqnmcg7rfnl',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'XXXX',
                executionExecutedAt: '2020-11-03 15:57:15',
                executionMonitoringStartAt: '2020-11-04 09:06:05',
                executionMonitoringEndAt: '2020-11-03 20:01:27',
                cancelled: 4123166480,
                completed: 2185301062,
                error: 8110307253,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: '8vtz1f0vyh1lo1adcbgrrx2c7is4x8dqev3nkir8mljylno31f',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'xl1c5gv9mo8ogwztm49e',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: 'XXXXXXXX',
                executionMonitoringStartAt: '2020-11-04 01:58:20',
                executionMonitoringEndAt: '2020-11-04 14:52:22',
                cancelled: 1738753107,
                completed: 6863639006,
                error: 7048722638,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'if0msifx4hihtjpqg2ia6myivc3brrntswusswkpwrdjmie4a2',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'tj6ug47ghpc1swvzm6qq',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 15:29:53',
                executionMonitoringStartAt: 'XXXXXXXX',
                executionMonitoringEndAt: '2020-11-03 18:18:22',
                cancelled: 3331660213,
                completed: 9973627392,
                error: 8431358798,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/job-overview - Got 400 Conflict, JobOverviewExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: '2de1w51cednyab4mc1bsya38n8tfqswrv2cpd79srr9itwk24x',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'ftqclv2jzkeu6lmsrsgg',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 03:23:45',
                executionMonitoringStartAt: '2020-11-03 21:56:39',
                executionMonitoringEndAt: 'XXXXXXXX',
                cancelled: 8191632413,
                completed: 4291500669,
                error: 4986066089,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for JobOverviewExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'sm51zmp3wcxc8zt63w0mcorvm8o17murtvcbm1ykhr68m24asq',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'jrbjhg9lm849x0deb1sn',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 14:15:35',
                executionMonitoringStartAt: '2020-11-04 03:40:15',
                executionMonitoringEndAt: '2020-11-03 19:43:26',
                cancelled: 3073512542,
                completed: 8869799476,
                error: 2215660574,
            })
            .expect(201);
    });

    test(`/REST:GET cci/jobs-overview/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/jobs-overview/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '6b1c66d4-ec38-4596-9d19-a8a4a2dfa2c7'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd29b4d3c-3f7e-44f0-90f0-2720e641a698'));
    });

    test(`/REST:GET cci/job-overview/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/4f351635-8fc1-4631-b063-b803e2fd2e6e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/job-overview/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/job-overview/d29b4d3c-3f7e-44f0-90f0-2720e641a698')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd29b4d3c-3f7e-44f0-90f0-2720e641a698'));
    });

    test(`/REST:GET cci/jobs-overview`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/jobs-overview')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/job-overview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b8976f18-79b5-4393-b41f-8e6940a2e450',
                tenantId: '1c1b4f9b-866f-4adb-8c1c-90bbec078bb0',
                tenantCode: 'sddxque13bfckiuwr9039ewmbd4rn639z76c45ni9ohw4xs2yf',
                systemId: '51b6233f-c081-4e28-8f44-2d39d8bb6105',
                systemName: 'wt7bqpdfcq5xtloijuru',
                executionId: 'f22f172f-7f71-46d0-b478-6fd472b2b7fb',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 05:57:10',
                executionMonitoringStartAt: '2020-11-03 17:38:39',
                executionMonitoringEndAt: '2020-11-03 16:45:16',
                cancelled: 2953389079,
                completed: 9677449885,
                error: 9326516819,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/job-overview`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/job-overview')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                tenantCode: 'mc87dj2gaicvcmdgwwx0o59pbjtz1pcz1erun4pq5pwr3u1drx',
                systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                systemName: 'hkki8a6njhncajruzxum',
                executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                executionType: 'DETAIL',
                executionExecutedAt: '2020-11-04 09:41:50',
                executionMonitoringStartAt: '2020-11-04 06:07:05',
                executionMonitoringEndAt: '2020-11-03 17:24:20',
                cancelled: 6974845580,
                completed: 3232731121,
                error: 4575486489,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd29b4d3c-3f7e-44f0-90f0-2720e641a698'));
    });

    test(`/REST:DELETE cci/job-overview/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/cd5e183b-bf76-4d92-ba4e-726ddf20baa5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/job-overview/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/job-overview/d29b4d3c-3f7e-44f0-90f0-2720e641a698')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateJobOverview - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateJobOverviewInput!)
                    {
                        cciCreateJobOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
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

    test(`/GraphQL cciCreateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateJobOverviewInput!)
                    {
                        cciCreateJobOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        id: 'aaa0884e-ce5f-420c-875f-01b2841113e7',
                        tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                        tenantCode: 'g0ywi9nh7cp6zqnfoatyk0wn21i4yw12tdmtflm9ei2q9j0b3r',
                        systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                        systemName: '72rxsjkzgxvalv8yru89',
                        executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-04 14:08:05',
                        executionMonitoringStartAt: '2020-11-03 16:32:10',
                        executionMonitoringEndAt: '2020-11-03 15:50:05',
                        cancelled: 4412261984,
                        completed: 5660159844,
                        error: 1076664270,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateJobOverview).toHaveProperty('id', 'aaa0884e-ce5f-420c-875f-01b2841113e7');
            });
    });

    test(`/GraphQL cciPaginateJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateJobsOverview (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciPaginateJobsOverview.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateJobsOverview.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateJobsOverview.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindJobOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '2cddc556-3b0d-4935-b9c5-14bf746e135d'
                        }
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

    test(`/GraphQL cciFindJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindJobOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverview.id).toStrictEqual('d29b4d3c-3f7e-44f0-90f0-2720e641a698');
            });
    });

    test(`/GraphQL cciFindJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindJobOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '016dd14c-54c1-41ac-8526-e090afb7b5b9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindJobOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindJobOverviewById.id).toStrictEqual('d29b4d3c-3f7e-44f0-90f0-2720e641a698');
            });
    });

    test(`/GraphQL cciGetJobsOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetJobsOverview (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetJobsOverview.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateJobOverview - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateJobOverviewInput!)
                    {
                        cciUpdateJobOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: '3548b3ec-de28-4cc2-9fca-895525b77f03',
                        tenantId: 'd6244185-3eae-4f3e-b871-875b59b75965',
                        tenantCode: '2k9f65sulfajpfjlfuep9yet16iugqrquvmz6m4nscjrje4kr3',
                        systemId: '9b455d77-9729-470e-afe3-e94b4841eb1d',
                        systemName: '5wx1ba0huu1al9g0xmii',
                        executionId: '13cd4e96-acdc-4ae8-8eee-a8e1f3cbc818',
                        executionType: 'DETAIL',
                        executionExecutedAt: '2020-11-03 22:40:14',
                        executionMonitoringStartAt: '2020-11-04 02:27:09',
                        executionMonitoringEndAt: '2020-11-03 21:19:09',
                        cancelled: 6269613189,
                        completed: 8231610069,
                        error: 1374500026,
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

    test(`/GraphQL cciUpdateJobOverview`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateJobOverviewInput!)
                    {
                        cciUpdateJobOverview (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
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
                        
                        id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698',
                        tenantId: '858d880a-c78d-4d15-b520-7af7485337d8',
                        tenantCode: '2ja0kvk4uko2a80kr20m0aktzbprwvhaqc4zcwmq9khfuvx4c9',
                        systemId: 'daed1c0f-e331-4186-af7b-cb1a8f36cb5d',
                        systemName: 'ivt9psiyqk9xsqp9sfh2',
                        executionId: '17f79559-fedf-467d-8d90-d590dfe23e2e',
                        executionType: 'SUMMARY',
                        executionExecutedAt: '2020-11-03 17:32:06',
                        executionMonitoringStartAt: '2020-11-03 20:30:29',
                        executionMonitoringEndAt: '2020-11-03 19:01:30',
                        cancelled: 8605653720,
                        completed: 1389663042,
                        error: 3077555318,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateJobOverview.id).toStrictEqual('d29b4d3c-3f7e-44f0-90f0-2720e641a698');
            });
    });

    test(`/GraphQL cciDeleteJobOverviewById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteJobOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: '3fb32369-6186-4cdc-894e-fb51cb5a77b9'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteJobOverviewById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteJobOverviewById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
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
                    id: 'd29b4d3c-3f7e-44f0-90f0-2720e641a698'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteJobOverviewById.id).toStrictEqual('d29b4d3c-3f7e-44f0-90f0-2720e641a698');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});