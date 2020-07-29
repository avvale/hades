import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IExecutionRepository } from '@hades/bplus-it-sappi/execution/domain/execution.repository';
import { MockExecutionRepository } from '@hades/bplus-it-sappi/execution/infrastructure/mock/mock-execution.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('execution', () => 
{
    let app: INestApplication;
    let repository: MockExecutionRepository;
    
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
            .overrideProvider(IExecutionRepository)
            .useClass(MockExecutionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'o06z7au5di05yvo6fu9vi1whhm1o39m5ln765swla5cc7qa0fj',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'b9dpz50dx0l0rwiqxd1x',
                version: 'oufsavh5jcuey51ept1u',
                type: 'DETAIL',
                executedAt: '2020-07-29 03:42:35',
                monitoringStartAt: '2020-07-29 00:05:58',
                monitoringEndAt: '2020-07-29 02:17:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'tqratc30yckm4f9dnvz182tyv98de9saml4peqmfbnv98cf72y',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'qhqjul6ap2b3yxdtxfh1',
                version: 'q5kv93unm4u9wokm6aka',
                type: 'DETAIL',
                executedAt: '2020-07-29 00:20:40',
                monitoringStartAt: '2020-07-29 03:08:27',
                monitoringEndAt: '2020-07-28 23:24:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: null,
                tenantCode: '9ydpvd5fa8yqrihdxzy8i1fdb220g3r1hwmjsbs5hkc1tum2b6',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'vkknd78h51bhyov7d1m5',
                version: '4wjv1fjaa78t7pbotkaw',
                type: 'DETAIL',
                executedAt: '2020-07-29 13:00:33',
                monitoringStartAt: '2020-07-29 00:19:24',
                monitoringEndAt: '2020-07-29 05:35:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                
                tenantCode: 'r8ncaiqeej8fbb7cg2balvy1fbugv3a38c0yr7qf6flswde8h0',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '6ikuvcrc1dlcr1jafrjg',
                version: 'n796iwdy3xjwoh9osdzo',
                type: 'DETAIL',
                executedAt: '2020-07-29 03:11:59',
                monitoringStartAt: '2020-07-28 18:25:08',
                monitoringEndAt: '2020-07-28 23:48:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: null,
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'pei7ptllhr84v7995p4n',
                version: 'rvja15ggsiu1gq1xab8d',
                type: 'SUMMARY',
                executedAt: '2020-07-29 16:38:34',
                monitoringStartAt: '2020-07-28 18:40:48',
                monitoringEndAt: '2020-07-29 16:29:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '0zvtkt7vy3jnalfpmx8h',
                version: 'rx0lsbl2ejvbh02ljswg',
                type: 'DETAIL',
                executedAt: '2020-07-29 05:08:42',
                monitoringStartAt: '2020-07-29 10:17:05',
                monitoringEndAt: '2020-07-29 15:50:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: '6enw842bjx0ny9o1he2wpmcrmzbxt0azhc8nakvelhd1uds4qn',
                systemId: null,
                systemName: '197mpebg9r0e3wwa6h5y',
                version: '0ym8hqavipew6rhr10t6',
                type: 'DETAIL',
                executedAt: '2020-07-28 19:52:56',
                monitoringStartAt: '2020-07-29 12:44:06',
                monitoringEndAt: '2020-07-28 18:35:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'rm4ugmw5a84j3yl9lrqv9alt7is1hujsicurvzmvlm22ar1e6f',
                
                systemName: '6z5safwvteq7j7h88k4d',
                version: '7sa1uckh9fo6ctao0dbz',
                type: 'DETAIL',
                executedAt: '2020-07-29 01:08:49',
                monitoringStartAt: '2020-07-29 11:47:49',
                monitoringEndAt: '2020-07-29 12:31:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'c1fidtusuen6851ldwvz0f2u29p0paxb7a7x6e93u2tnm9fmrq',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: null,
                version: 'khpe9i74pystonsezlcp',
                type: 'SUMMARY',
                executedAt: '2020-07-28 23:51:05',
                monitoringStartAt: '2020-07-29 09:47:02',
                monitoringEndAt: '2020-07-29 09:48:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: '8jualotcpbgldx8ezegf18ze9dwivrfwxtjh9eyt48zhatih5p',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                
                version: 'xn8qs49t3rkezahtzssn',
                type: 'SUMMARY',
                executedAt: '2020-07-29 05:27:47',
                monitoringStartAt: '2020-07-28 19:08:16',
                monitoringEndAt: '2020-07-29 14:53:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 're6nkzegqznrs5n3uz4ajgdv5vv680ounfdq4vfgwq53sbt47d',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '3uu88jg6nu1s8nqh5i3l',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-07-29 00:02:51',
                monitoringStartAt: '2020-07-28 21:13:15',
                monitoringEndAt: '2020-07-29 13:40:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'tr9m52i0m4lq46tyx1oyx9wq74s6gffpxt3xojdp019dlatjwf',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '804u2suqglglcpnxyu6q',
                
                type: 'SUMMARY',
                executedAt: '2020-07-29 08:11:25',
                monitoringStartAt: '2020-07-29 10:56:02',
                monitoringEndAt: '2020-07-29 14:28:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'v4zv2pdof8xa3u9143uqijuucbikkh231g1550tymj5ujmtzkb',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 's01ctzvaiblhusel6tlc',
                version: 'v778undnd8yp30l2mjjk',
                type: null,
                executedAt: '2020-07-29 14:04:25',
                monitoringStartAt: '2020-07-29 12:36:12',
                monitoringEndAt: '2020-07-29 11:39:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'emzvul62mntsuymjpxzfnp5djkra8tl7fimihrtguuchmf9vjr',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'veap1gmjecrenyz3t6kh',
                version: 'ka16e45g590zh9656605',
                
                executedAt: '2020-07-29 05:21:04',
                monitoringStartAt: '2020-07-29 16:39:44',
                monitoringEndAt: '2020-07-29 05:00:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'u97tk55zvc8ym8by1s3fh6lmbggjifivxj1hkxcyquo7ee7jvj',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'jfulnjsfmac79xbyvprw',
                version: 'kw46r46e8gzzmcsiifnz',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2020-07-29 02:26:42',
                monitoringEndAt: '2020-07-29 03:30:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: '62py3k2t4hsaa5nertqmx0qjzzptffvn1umqucbw5t7xwt5cx9',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'k06pcijyir610z9zff96',
                version: 'p7rd66bk1sggmntimgcv',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-07-29 00:20:34',
                monitoringEndAt: '2020-07-29 02:43:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'ojjr31nf7soixtertkimlx0ta1nht8scf2e4easbqzyrhw9rdl',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'csapsjq38qllqnt4gku8',
                version: '3h1jvs8c91rzyg84c8pf',
                type: 'SUMMARY',
                executedAt: '2020-07-29 17:34:47',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-28 21:26:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'cqclm3p7x8h0s5egfyly4xehrigvuwdx972w5t9p0qckftz1sf',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'qh3pwsc519ik0u4nctf7',
                version: 'tg3cfxjjk0dqcexi9osq',
                type: 'DETAIL',
                executedAt: '2020-07-29 16:10:47',
                
                monitoringEndAt: '2020-07-29 07:28:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 's8whtk1st702tpxk7r86vpkd7x2j5salzvkalibpwgiufmyjbn',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'picrqw4uyt97f5hjzhnr',
                version: 's2b1v83xzp4g7jnoh7i4',
                type: 'DETAIL',
                executedAt: '2020-07-29 14:03:32',
                monitoringStartAt: '2020-07-29 09:01:20',
                monitoringEndAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'smgcqz76j5ddunoc4qoufr8qe8m9nft5sy1gjws30tsld67ozc',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '58nu309x3jub4xz1o9ls',
                version: '3ujtymyogprbkf612qi5',
                type: 'SUMMARY',
                executedAt: '2020-07-29 17:51:17',
                monitoringStartAt: '2020-07-29 03:19:47',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '5jui7o1r8l9s5y881u0uhx6he6r798ue55up9',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'v3cg77rzutogugz00f0y7rdey7zp1sr4a38pf7wqd1zbygkmsw',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'yt9fksldyeagvmzh4pi6',
                version: 'bcqpnoh5jmdb3dnrzro3',
                type: 'SUMMARY',
                executedAt: '2020-07-29 06:15:44',
                monitoringStartAt: '2020-07-29 16:15:50',
                monitoringEndAt: '2020-07-29 06:35:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '255rozfebzubf4h8yuskq2v02fi1dbwxscxdc',
                tenantCode: 'jd067fsuy9e7yekiq9hcop8x96vtrb1jm7gkb9hfke9lq2pdm7',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '1ryhobs1fs5j4wgyexo9',
                version: 'xoe5o98bnci0ssu6swxz',
                type: 'DETAIL',
                executedAt: '2020-07-29 03:01:47',
                monitoringStartAt: '2020-07-29 04:29:34',
                monitoringEndAt: '2020-07-29 15:20:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'uq2mc01socrhix5tw0lozibsmx8f3savx3y5sltro8z83ubz09',
                systemId: '3ck89sqjqyfvf01miqufx6kumwpjw0sb0d6ns',
                systemName: '5d61ujz7wmf6z6oibm14',
                version: 'g3jr0y2i1w32feor5rob',
                type: 'SUMMARY',
                executedAt: '2020-07-29 05:14:06',
                monitoringStartAt: '2020-07-29 16:56:12',
                monitoringEndAt: '2020-07-29 10:06:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'ze25imj8izrhtjs223gd1xtis8s690kdcb8zpsjhaozyfuh6gi8',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '1ci5eit8cquly2inf8ep',
                version: 'skj4a91ar4zfwaiuq1nm',
                type: 'DETAIL',
                executedAt: '2020-07-29 11:49:15',
                monitoringStartAt: '2020-07-29 09:52:51',
                monitoringEndAt: '2020-07-29 16:46:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'e6a61a3qa3cbltx2mkj3qd3uoz451llmzc3xk6o2d7y66j4mdl',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '1q6xl171dapp18uc8i3ep',
                version: '73v2oijaho51tthqrm1f',
                type: 'DETAIL',
                executedAt: '2020-07-29 03:13:43',
                monitoringStartAt: '2020-07-29 05:05:45',
                monitoringEndAt: '2020-07-29 01:48:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: '0y23j4krmd76c8b4ltdapsgr4e561z88cgqgl45isnos455bc3',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '3pgiq9mvheb9odu9x8kx',
                version: '7dpdsg20msu2h6cdi0tez',
                type: 'DETAIL',
                executedAt: '2020-07-29 05:08:36',
                monitoringStartAt: '2020-07-28 19:07:31',
                monitoringEndAt: '2020-07-29 01:23:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: '4b2v8d3wpor4nj9z6yichcr6fvh2x56zn9kwtxm9a67sd8ecxl',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'h7zf5l5ouvsu0d0y0z4x',
                version: 'i27omybv1ruixb6qvdu7',
                type: 'XXXX',
                executedAt: '2020-07-29 14:32:53',
                monitoringStartAt: '2020-07-29 03:57:36',
                monitoringEndAt: '2020-07-29 00:39:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'cjnk111ceh9xh9chkfu0p5irjofp0x2kgyqb5a5qwy9sg4knye',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'ria5nam58lw23i887l5x',
                version: '2lp230dvxaf425sm4abm',
                type: 'SUMMARY',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-29 05:28:19',
                monitoringEndAt: '2020-07-29 13:28:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: '9l0pdak47j8jsxfh1fo19omqxs8zxiinba4zygdabwdzmt74mk',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: 'chvj2elyzsc5pztnxvx0',
                version: '9t73etj5u7k570hzb9op',
                type: 'DETAIL',
                executedAt: '2020-07-28 20:14:29',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-28 21:48:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'nguv8jruob7kf38wukfq34dhndo9kztvw7ttk8kr2l4ho3ukb3',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '6wm3o7zjto05xu1f2o7n',
                version: '660jxc4mw14vebec8eov',
                type: 'DETAIL',
                executedAt: '2020-07-28 22:13:49',
                monitoringStartAt: '2020-07-29 06:26:46',
                monitoringEndAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'vuu7aopt1zmzblnewetxsjbvqxzejrt4dr40tdm8dk0dcvzchp',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '0ikkjgetbtefkigab8q8',
                version: '8fhozw6tt2upldujcolt',
                type: 'DETAIL',
                executedAt: '2020-07-29 14:47:16',
                monitoringStartAt: '2020-07-29 07:24:33',
                monitoringEndAt: '2020-07-28 21:08:34',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/executions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions/paginate')
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

    test(`/REST:GET bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution')
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

    test(`/REST:GET bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '88dd7458-ecd9-4e6f-a008-da1906e28d08'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '88dd7458-ecd9-4e6f-a008-da1906e28d08'));
    });

    test(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/88dd7458-ecd9-4e6f-a008-da1906e28d08')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '88dd7458-ecd9-4e6f-a008-da1906e28d08'));
    });

    test(`/REST:GET bplus-it-sappi/executions`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '8abf67b5-0639-49f9-8891-3f88303df188',
                tenantId: 'dfb1041c-c2e8-4831-a78d-e58d2e503ee9',
                tenantCode: 'ffcbmlqt746i7x4cgc9pb8qadxmsn20cr63se333tj1988zw13',
                systemId: '4690f581-a254-4437-b90c-57ba877f66a3',
                systemName: 'x1o1hbg6n54v1a1vnbn0',
                version: 'oilna7pjlcsjju0bb2w5',
                type: 'SUMMARY',
                executedAt: '2020-07-28 22:18:48',
                monitoringStartAt: '2020-07-29 01:46:22',
                monitoringEndAt: '2020-07-29 03:03:27',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                tenantCode: 'o3h2jyi62uqci3v9m49lptbrv9s8ixtr26am74dh6rq0ja0ain',
                systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                systemName: '6np6n54z4xj22b4mix77',
                version: 'xwo989qj9ciw1qaab8du',
                type: 'SUMMARY',
                executedAt: '2020-07-29 13:30:28',
                monitoringStartAt: '2020-07-29 11:56:31',
                monitoringEndAt: '2020-07-29 05:48:58',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '88dd7458-ecd9-4e6f-a008-da1906e28d08'));
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/88dd7458-ecd9-4e6f-a008-da1906e28d08')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateExecution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateExecutionInput!)
                    {
                        bplusItSappiCreateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL bplusItSappiCreateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateExecutionInput!)
                    {
                        bplusItSappiCreateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '7242e09e-db5c-4478-a6e4-a8ada031bbcc',
                        tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                        tenantCode: 'urb1t4nt5va4fd7x9lsbkhf4sy4uqvjplvhp03wrubmgvf2zz4',
                        systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                        systemName: 'k7ho42p9mlxk71z0xidv',
                        version: '4129op2k28gdo0ofimlz',
                        type: 'DETAIL',
                        executedAt: '2020-07-29 14:14:58',
                        monitoringStartAt: '2020-07-28 23:12:02',
                        monitoringEndAt: '2020-07-29 09:02:35',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '7242e09e-db5c-4478-a6e4-a8ada031bbcc');
            });
    });

    test(`/GraphQL bplusItSappiPaginateExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateExecutions (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateExecutions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateExecutions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateExecutions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindExecution (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL bplusItSappiFindExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindExecution (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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
                            value   : '88dd7458-ecd9-4e6f-a008-da1906e28d08'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('88dd7458-ecd9-4e6f-a008-da1906e28d08');
            });
    });

    test(`/GraphQL bplusItSappiFindExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL bplusItSappiFindExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '88dd7458-ecd9-4e6f-a008-da1906e28d08'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('88dd7458-ecd9-4e6f-a008-da1906e28d08');
            });
    });

    test(`/GraphQL bplusItSappiGetExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetExecutions (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetExecutions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateExecutionInput!)
                    {
                        bplusItSappiUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '87763d65-ee12-422b-b3ef-a601ff8c2fda',
                        tenantId: '835272b0-3ac7-4086-a347-a77d9fd0f330',
                        tenantCode: 'h5f2sc3l4upbsk4qbqt1wqc4z1adu7v5wa1f3bbwfte2p0ete3',
                        systemId: '80426a70-02c7-4d56-bee2-3ca41f676f05',
                        systemName: 's7ojmglf5nbrwz2tr3zj',
                        version: 'rnvg4a183ltzmo3lj1w9',
                        type: 'DETAIL',
                        executedAt: '2020-07-29 17:17:41',
                        monitoringStartAt: '2020-07-29 12:21:41',
                        monitoringEndAt: '2020-07-28 20:03:09',
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

    test(`/GraphQL bplusItSappiUpdateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateExecutionInput!)
                    {
                        bplusItSappiUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '88dd7458-ecd9-4e6f-a008-da1906e28d08',
                        tenantId: '83360b83-3540-4829-8b8b-a3a1b6904f04',
                        tenantCode: 'c8boooflrogev6p8d50126muacshzr5lpxp93twmvu3lgn9fsz',
                        systemId: '86f5b0d2-c630-42f8-bfd7-aa3d50acf553',
                        systemName: 'du74qpan1ejyc1xaexz4',
                        version: '67dpxq4we74upgzn3m7e',
                        type: 'DETAIL',
                        executedAt: '2020-07-28 23:17:09',
                        monitoringStartAt: '2020-07-29 10:59:23',
                        monitoringEndAt: '2020-07-29 12:26:33',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('88dd7458-ecd9-4e6f-a008-da1906e28d08');
            });
    });

    test(`/GraphQL bplusItSappiDeleteExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
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

    test(`/GraphQL bplusItSappiDeleteExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            version
                            type
                            executedAt
                            monitoringStartAt
                            monitoringEndAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '88dd7458-ecd9-4e6f-a008-da1906e28d08'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('88dd7458-ecd9-4e6f-a008-da1906e28d08');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});