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
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 01:42:51',
                monitoringEndAt: '2020-07-21 04:49:50',
                executedAt: '2020-07-21 19:36:34',
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
                
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 11:57:24',
                monitoringEndAt: '2020-07-21 08:22:10',
                executedAt: '2020-07-21 11:59:36',
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: null,
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 09:19:58',
                monitoringEndAt: '2020-07-21 03:03:12',
                executedAt: '2020-07-21 17:40:29',
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 01:47:57',
                monitoringEndAt: '2020-07-21 10:04:07',
                executedAt: '2020-07-21 03:25:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: null,
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 20:20:49',
                monitoringEndAt: '2020-07-21 05:56:07',
                executedAt: '2020-07-21 21:56:37',
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 05:44:59',
                monitoringEndAt: '2020-07-21 08:50:47',
                executedAt: '2020-07-21 05:32:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: null,
                monitoringStartAt: '2020-07-21 17:30:31',
                monitoringEndAt: '2020-07-21 08:10:13',
                executedAt: '2020-07-21 16:55:03',
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                
                monitoringStartAt: '2020-07-21 13:24:32',
                monitoringEndAt: '2020-07-21 08:33:17',
                executedAt: '2020-07-21 19:11:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'SUMMARY',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-21 12:07:31',
                executedAt: '2020-07-21 17:27:04',
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'DETAIL',
                
                monitoringEndAt: '2020-07-21 13:13:47',
                executedAt: '2020-07-21 14:47:09',
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 17:57:42',
                monitoringEndAt: null,
                executedAt: '2020-07-21 06:51:06',
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 05:54:40',
                
                executedAt: '2020-07-21 19:46:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 10:47:26',
                monitoringEndAt: '2020-07-21 07:23:54',
                executedAt: null,
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 01:33:01',
                monitoringEndAt: '2020-07-21 03:00:38',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'e1b562e47o088x77r6o7tioash3lzs30nyqs7',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 15:59:18',
                monitoringEndAt: '2020-07-21 01:48:17',
                executedAt: '2020-07-21 04:24:38',
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'hd7zyb2vv44fd44yjghy4yl6d08u30s8rfywz',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 01:58:25',
                monitoringEndAt: '2020-07-21 20:25:56',
                executedAt: '2020-07-21 02:09:44',
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: '8fbh60beoh00unbx9z6ajztmhljmnftgbzrep',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 19:52:54',
                monitoringEndAt: '2020-07-21 08:40:39',
                executedAt: '2020-07-21 07:07:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });
    

    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'XXXX',
                monitoringStartAt: '2020-07-21 05:07:11',
                monitoringEndAt: '2020-07-21 13:50:33',
                executedAt: '2020-07-21 01:28:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'SUMMARY',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-21 07:56:08',
                executedAt: '2020-07-21 13:47:26',
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
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 15:42:20',
                monitoringEndAt: 'XXXXXXXX',
                executedAt: '2020-07-21 15:53:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 01:05:46',
                monitoringEndAt: '2020-07-21 14:46:19',
                executedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 16:19:08',
                monitoringEndAt: '2020-07-21 16:29:50',
                executedAt: '2020-07-21 06:07:40',
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
                        value   : '7247849f-add6-4b3c-8661-bf74e3180938'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7247849f-add6-4b3c-8661-bf74e3180938'));
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
            .get('/bplus-it-sappi/execution/7247849f-add6-4b3c-8661-bf74e3180938')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7247849f-add6-4b3c-8661-bf74e3180938'));
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
                
                id: 'a108aea5-fc2f-4a8a-9698-aabd73aa73a5',
                tenantId: 'd9526503-c9e3-4d05-af0d-e2e3595667d1',
                systemId: 'b87def5d-98ce-4d1a-984c-261c3d01f6ef',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 15:31:29',
                monitoringEndAt: '2020-07-21 06:34:57',
                executedAt: '2020-07-21 18:11:40',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '7247849f-add6-4b3c-8661-bf74e3180938',
                tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 20:43:45',
                monitoringEndAt: '2020-07-21 21:17:29',
                executedAt: '2020-07-21 10:44:52',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7247849f-add6-4b3c-8661-bf74e3180938'));
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
            .delete('/bplus-it-sappi/execution/7247849f-add6-4b3c-8661-bf74e3180938')
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '4b516e6d-bebe-424a-b9de-4c1c6cebb2e2',
                        tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                        systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-21 04:17:23',
                        monitoringEndAt: '2020-07-21 11:23:51',
                        executedAt: '2020-07-21 18:53:47',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '4b516e6d-bebe-424a-b9de-4c1c6cebb2e2');
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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
                            value   : '7247849f-add6-4b3c-8661-bf74e3180938'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('7247849f-add6-4b3c-8661-bf74e3180938');
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7247849f-add6-4b3c-8661-bf74e3180938'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('7247849f-add6-4b3c-8661-bf74e3180938');
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4a0475c7-a8b9-4e3d-9980-87dc7df46ebc',
                        tenantId: '5a05a3ac-5312-47fb-80b3-b6c1a8c8b087',
                        systemId: '216a85b4-648c-468b-9c08-28b241819085',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-21 02:08:44',
                        monitoringEndAt: '2020-07-21 21:53:43',
                        executedAt: '2020-07-21 20:21:57',
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7247849f-add6-4b3c-8661-bf74e3180938',
                        tenantId: 'e20adb1a-14d9-4970-b94d-893932753a5e',
                        systemId: 'e81c5663-752b-42af-a7d0-2e70c479f0ca',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-07-21 01:41:47',
                        monitoringEndAt: '2020-07-21 17:44:20',
                        executedAt: '2020-07-21 12:31:44',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('7247849f-add6-4b3c-8661-bf74e3180938');
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
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
                            systemId
                            type
                            monitoringStartAt
                            monitoringEndAt
                            executedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7247849f-add6-4b3c-8661-bf74e3180938'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('7247849f-add6-4b3c-8661-bf74e3180938');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});