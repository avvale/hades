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
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'jzjsa6tzerhm5kiydv13kz2ofg8pmwge2r3nx7v9ux08sg5npu',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'cc430g9o6jjfe3180bmp',
                version: '00ij8rswlwdkvbijwmgm',
                type: 'DETAIL',
                executedAt: '2020-07-29 10:15:37',
                monitoringStartAt: '2020-07-29 20:57:08',
                monitoringEndAt: '2020-07-29 09:34:24',
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
                
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'xnha67jwodynpj16e6lq8ojj6ri25zktsmij18g1njshnecfg4',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'ay6aky5qesxegkx7ztsr',
                version: '7cgu4r09irllbpv1rqok',
                type: 'DETAIL',
                executedAt: '2020-07-29 03:47:03',
                monitoringStartAt: '2020-07-29 22:00:15',
                monitoringEndAt: '2020-07-30 00:22:36',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: null,
                tenantCode: 'ha1e20704phaxla99e3dyfwxb4w0la7la287gtp73kbzyscboc',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: '6pb86beib5awgoyef3qw',
                version: 'cj8k0sxlx8nsi23ppeu6',
                type: 'DETAIL',
                executedAt: '2020-07-29 13:39:17',
                monitoringStartAt: '2020-07-29 14:33:51',
                monitoringEndAt: '2020-07-29 13:22:49',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                
                tenantCode: '82xl6q9ll0b48utmrh18fmzih88jz0z6sbu7a37l269pp0xxub',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'd8j7rpuqseall9u7hfeh',
                version: 'iuazdzj0kpus1ipf3jzt',
                type: 'DETAIL',
                executedAt: '2020-07-29 09:05:36',
                monitoringStartAt: '2020-07-29 20:02:03',
                monitoringEndAt: '2020-07-29 15:23:07',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: null,
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'al4wpn3k7pjfh9tww05r',
                version: '4m76rylk9t6fuw110elg',
                type: 'SUMMARY',
                executedAt: '2020-07-29 10:24:57',
                monitoringStartAt: '2020-07-30 00:54:50',
                monitoringEndAt: '2020-07-29 07:08:24',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'q1vdyur85uy943p0k6ae',
                version: 'jdeoehvv3euwryj77teg',
                type: 'SUMMARY',
                executedAt: '2020-07-29 03:36:40',
                monitoringStartAt: '2020-07-29 11:20:33',
                monitoringEndAt: '2020-07-29 17:33:44',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'ebv3lw39mq4e2vqiybojlfhvcra5qqohf12fks3vbg13dg6ool',
                systemId: null,
                systemName: '2kadkdrutlfne0rbfpqx',
                version: 'fjmlfntcp4bxdojjijih',
                type: 'SUMMARY',
                executedAt: '2020-07-29 21:14:24',
                monitoringStartAt: '2020-07-29 22:23:48',
                monitoringEndAt: '2020-07-29 02:11:51',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: '9zss1ugdpi214qko8qk7v6jj8bquqtbonvmjmbueog0neerig9',
                
                systemName: 'iupjl9pyw43y7qooi1wm',
                version: 'q9z3qfthiu99nsbetdip',
                type: 'SUMMARY',
                executedAt: '2020-07-29 18:25:33',
                monitoringStartAt: '2020-07-29 04:52:46',
                monitoringEndAt: '2020-07-29 14:57:56',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'gcn130dzeuvoxsns4p653lhbsmn5ik8ibfdhxlkr72ng9icyf6',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: null,
                version: 'pakblh1jhsztugc57ngj',
                type: 'DETAIL',
                executedAt: '2020-07-29 12:55:08',
                monitoringStartAt: '2020-07-29 08:13:21',
                monitoringEndAt: '2020-07-29 19:03:05',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'p7nfquena3n4rsk6mib4jip2901379xc9f75hhu2thshehl0t2',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                
                version: '7ugtcbf6oz4ozioapey9',
                type: 'SUMMARY',
                executedAt: '2020-07-29 04:05:35',
                monitoringStartAt: '2020-07-29 17:15:59',
                monitoringEndAt: '2020-07-29 16:26:10',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'm20uwyb9ngso4f3492fvggznehsjiso3mettnvq7qt03bu9kn9',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'k720bzui6vdcb79lea1i',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-07-29 13:37:49',
                monitoringStartAt: '2020-07-29 01:10:52',
                monitoringEndAt: '2020-07-29 03:20:59',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: '60vbh2o0lf5ombqapr76d7jzzf56xvalj2vmqyjx94zm92shn4',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'bwz24kgkbsruxqyul7bf',
                
                type: 'DETAIL',
                executedAt: '2020-07-29 12:32:07',
                monitoringStartAt: '2020-07-29 18:23:48',
                monitoringEndAt: '2020-07-29 16:25:34',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: '8ftwmo7v18e0fhrnt54xekj5fsv5qawvtjrthcezal8h6huzyf',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'brw59497z0nrb9at7nwj',
                version: '1mnftvw8xa2tche2m1st',
                type: null,
                executedAt: '2020-07-29 02:58:59',
                monitoringStartAt: '2020-07-29 09:09:29',
                monitoringEndAt: '2020-07-29 12:13:11',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: '4rcufd2reqh7r5nm82g1z1hudramb9x9cqjltk0i7i3rjc3cli',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'abx8igc0rcj5pknkd1ck',
                version: '3148thuf9w8m8mkqtz6a',
                
                executedAt: '2020-07-29 09:25:34',
                monitoringStartAt: '2020-07-29 11:09:03',
                monitoringEndAt: '2020-07-29 04:32:12',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'h5hmmj7npco96w0yo3gndyv5mouloircwe6mmw6vxe7hqa1v9e',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'kktlvw87nfgs111980pn',
                version: 'wjcqkh3w31qlw7h7ozjf',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-07-29 07:12:39',
                monitoringEndAt: '2020-07-29 21:36:50',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'a046z8gm6z8p1kmbb8fa2zlfibgtt5jis8ca7b97zrs6zj1krw',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'r6qlpazriss7etc9s0np',
                version: 'd0bbcn8hrn8powf820av',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-07-29 09:35:03',
                monitoringEndAt: '2020-07-29 20:22:31',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'bl01rlo58zuz9eyg8kozaryxzedla72naar3ze44tbq710ya0r',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'txzd8i0w1pgh5derg4qi',
                version: 'lhiemlzv6sp43w0tap4s',
                type: 'DETAIL',
                executedAt: '2020-07-29 14:25:41',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-29 20:59:04',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'ra4yrhnw93miqdw6u56btfwf1qt2n62eod4v1zcvb10oa52w84',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'wqizq9opebwwxdju2spy',
                version: 'bciusotmvqof8eusqfr8',
                type: 'DETAIL',
                executedAt: '2020-07-29 04:12:38',
                
                monitoringEndAt: '2020-07-29 14:30:59',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'ar7xskzr1fr9cjnsxx8unz8ypyaenfrrcmsg97p4op3kssvz7s',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: '0177ahhp6es6mqaoxksq',
                version: 'aj1rvzi3h01m6fzl56ix',
                type: 'DETAIL',
                executedAt: '2020-07-29 20:07:31',
                monitoringStartAt: '2020-07-29 19:36:08',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'bzal9gxkjvoc6m45katjumrrvntc2wstk3h1zsqe8gsykj9z5v',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'd5rw9rrohlcwoq94jogg',
                version: 'i3eqmhrh52w5xc334hve',
                type: 'DETAIL',
                executedAt: '2020-07-29 21:52:35',
                monitoringStartAt: '2020-07-29 07:00:41',
                
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
                id: '9w4jyd7z0j0a8l47l1zrnn031sjz2tm1350vb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'nzmlms8zip2xg4mxltap2yma8jkvpzddtdzoivxedd9gzra19e',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'bp0y7859ll7t5y3mguo7',
                version: 'z77y3ao4x4qd0wvo6per',
                type: 'SUMMARY',
                executedAt: '2020-07-29 14:09:47',
                monitoringStartAt: '2020-07-29 11:29:44',
                monitoringEndAt: '2020-07-29 23:11:25',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: 'nxmrjbdxio8pjb0lauvdo33i4p0nf6ne3jgs8',
                tenantCode: 'oufvwxtdjp4ehbt51tkdec5qgz6dfijmaucusdqy2zv7ty7qkc',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'r01156lf9q6wxnjk4bxb',
                version: '8tgjdn8fnyh5w7zt49um',
                type: 'SUMMARY',
                executedAt: '2020-07-29 01:36:49',
                monitoringStartAt: '2020-07-29 03:28:49',
                monitoringEndAt: '2020-07-29 18:38:45',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: '1hbkfe7h9oc280770oa2l9976mihb23doak68q95jsns283d85',
                systemId: '0rvxr274vbm1l0ls8mwlb35le8765gp6krvcr',
                systemName: '2wa7zif1usla0lt4tcuy',
                version: 'r89agj9brjlk1gfadnfx',
                type: 'SUMMARY',
                executedAt: '2020-07-29 02:19:41',
                monitoringStartAt: '2020-07-29 07:54:50',
                monitoringEndAt: '2020-07-29 06:15:13',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'ukocmyngvkka15zypdo2eohb3u0gj90zi8fwl2sqglkrg32ujcp',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'su6bcq7fdwg9hidnmf3b',
                version: 'mxx63gvehbfuyb1eimsr',
                type: 'SUMMARY',
                executedAt: '2020-07-29 18:26:04',
                monitoringStartAt: '2020-07-30 00:45:15',
                monitoringEndAt: '2020-07-29 22:22:06',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: '0iageuqpmtkb9gccoicrj4nlsqefdcvsyzhaddmpotgf8x3jdr',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: '2sewp1bdf78dgtvtuo233',
                version: 't7wx92da8eoxjeatoyzn',
                type: 'SUMMARY',
                executedAt: '2020-07-29 10:43:38',
                monitoringStartAt: '2020-07-29 17:15:10',
                monitoringEndAt: '2020-07-29 10:06:41',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'de28y4b1az4t11q6wbkgve0ygt13203gqfzbio1xvmuwy3dm3m',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: '8ar3b8em9tsp0r5yeqi9',
                version: 'ex5rjmcawkrk4j2647a87',
                type: 'DETAIL',
                executedAt: '2020-07-29 16:21:09',
                monitoringStartAt: '2020-07-29 04:47:51',
                monitoringEndAt: '2020-07-29 02:40:29',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'ahb4xtq81wd0prucz2krpyc6zg6n873pwl1oy9x0i5rlppm06p',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: '8l9yk2imxpltj7vxfizi',
                version: '6sold1d5jj91nbaf0485',
                type: 'XXXX',
                executedAt: '2020-07-29 02:15:16',
                monitoringStartAt: '2020-07-29 16:45:56',
                monitoringEndAt: '2020-07-29 13:10:05',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'kbtf4ikq6yyoqbmusv65wi93gdi2sl8iuo3us9nmppxakkbi05',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'n34tyrur2xnzpe4w01gj',
                version: 'ochza55op468xn1j71pa',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-29 23:35:14',
                monitoringEndAt: '2020-07-29 14:54:26',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'ft6b50ytak3j8a3sylhe8s9sohxx46zrlf4gwczzbwgk5fetde',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: '4akuhhryozuv0zb3em9x',
                version: 'niw0ktrf1cqrtkiiy3ep',
                type: 'SUMMARY',
                executedAt: '2020-07-29 02:43:19',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-29 15:06:42',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: '21vqwg6kob3o5k9j5fw3txq37fkrzhn72f3kbemxt4o1fc39fy',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: '5eajtosqkepexzyp7y9u',
                version: 'bbtcosf2kd13xowhj8bm',
                type: 'DETAIL',
                executedAt: '2020-07-29 06:49:10',
                monitoringStartAt: '2020-07-29 01:42:48',
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
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: '1ub914gznovu3vo4kb0qgtsbvl75hwpsvk83kbaq2yrxd4ckue',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: '1p5mm55v9hxbjmt9dtxr',
                version: 'gdbed704suz3ni0tg2b0',
                type: 'SUMMARY',
                executedAt: '2020-07-29 22:15:49',
                monitoringStartAt: '2020-07-29 05:42:35',
                monitoringEndAt: '2020-07-29 16:06:44',
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
                        value   : 'ab4bf6f5-cf1c-473d-a0eb-a432e1d0824a'
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
                        value   : 'f4525a8e-71eb-4031-8632-5c088ff46dbb'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f4525a8e-71eb-4031-8632-5c088ff46dbb'));
    });

    test(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/fff21f50-7ac6-4091-8794-31879479df59')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/f4525a8e-71eb-4031-8632-5c088ff46dbb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f4525a8e-71eb-4031-8632-5c088ff46dbb'));
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
                
                id: 'e26720a0-d219-4f84-be97-90873f36951f',
                tenantId: '7b964c5b-b716-4e03-983a-a087b01c6779',
                tenantCode: 'wizsx7vjqn2nujuibx9utwkys5bzalr6t32qw42cttfji5mltk',
                systemId: '182a2146-6725-41e2-baca-f523c99ba595',
                systemName: 'q4dadjteweqxv4kyyvzn',
                version: 'x71cisa0h90jwc2auwep',
                type: 'SUMMARY',
                executedAt: '2020-07-29 12:24:43',
                monitoringStartAt: '2020-07-29 02:20:01',
                monitoringEndAt: '2020-07-29 22:02:54',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                tenantCode: 'jzmt0aorlft00razndk5rndj00zuwrmyvpya0vjjy47z9099ba',
                systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                systemName: 'jsls3olgj4r9nti4f56k',
                version: 'wisg3yomlp5yh5l542bg',
                type: 'DETAIL',
                executedAt: '2020-07-29 16:12:33',
                monitoringStartAt: '2020-07-29 20:55:50',
                monitoringEndAt: '2020-07-29 19:31:34',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f4525a8e-71eb-4031-8632-5c088ff46dbb'));
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/0a29c1f4-7f0d-4aec-b76e-30c1f8d51763')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/f4525a8e-71eb-4031-8632-5c088ff46dbb')
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
                        id: 'cb89b8c1-ef0a-488e-a488-7af2cd9de74f',
                        tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                        tenantCode: 'ev6lbrphv9hok6xow7p5vobw0hkc92lrsvozeife7lg36mfkz8',
                        systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                        systemName: 'pohsdb4xagnqtiwslt19',
                        version: 'e2yibnjh7n4r1g7lg0wz',
                        type: 'SUMMARY',
                        executedAt: '2020-07-29 23:58:53',
                        monitoringStartAt: '2020-07-29 08:51:33',
                        monitoringEndAt: '2020-07-29 05:47:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', 'cb89b8c1-ef0a-488e-a488-7af2cd9de74f');
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
                            value   : 'f0c40cca-0c50-4420-a614-f3b3a6576c52'
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
                            value   : 'f4525a8e-71eb-4031-8632-5c088ff46dbb'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('f4525a8e-71eb-4031-8632-5c088ff46dbb');
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
                    id: 'e0aa6305-59f2-4aae-900f-01de7c304385'
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
                    id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('f4525a8e-71eb-4031-8632-5c088ff46dbb');
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
                        
                        id: '8d11acf0-22bb-46a0-a8eb-a79d5f59da4e',
                        tenantId: '2061a361-2156-4b37-9d01-009bcd7f8493',
                        tenantCode: 'fbgkssb34go7ubffn8zjf364dhseaaq57cbk6jxkx6390f41u3',
                        systemId: 'ede5b3aa-f193-449e-a7a6-4612343c0c62',
                        systemName: 'aef4nzpluy6sw50u7nir',
                        version: 'n73ph9nxkjrufwmgslb2',
                        type: 'DETAIL',
                        executedAt: '2020-07-29 20:45:01',
                        monitoringStartAt: '2020-07-29 17:15:08',
                        monitoringEndAt: '2020-07-29 06:42:54',
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
                        
                        id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb',
                        tenantId: '8d2ab7b4-c926-4ced-a77f-f1a2c2d3edbd',
                        tenantCode: 'lk5tzo60kk4o8h1duh3d0186vsl41h526f6qd98h1upbjsz5l3',
                        systemId: '54e0d28d-0087-4919-b004-0f4f052411d6',
                        systemName: 'zq99dwm6zfh242ssd66t',
                        version: 'g4u2no9nxfdnm44tc7lk',
                        type: 'SUMMARY',
                        executedAt: '2020-07-29 02:56:56',
                        monitoringStartAt: '2020-07-29 15:28:48',
                        monitoringEndAt: '2020-07-29 09:54:57',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('f4525a8e-71eb-4031-8632-5c088ff46dbb');
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
                    id: 'deb70b09-49a3-4b9d-84a6-017761d2b37a'
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
                    id: 'f4525a8e-71eb-4031-8632-5c088ff46dbb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('f4525a8e-71eb-4031-8632-5c088ff46dbb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});