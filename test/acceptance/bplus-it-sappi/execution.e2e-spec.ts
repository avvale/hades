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

    it(`/REST:POST bplus-it-sappi/execution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-17 08:33:03',
                monitoringEndAt: '2020-07-17 15:11:43',
                executedAt: '2020-07-17 03:00:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-17 09:09:40',
                monitoringEndAt: '2020-07-16 17:42:22',
                executedAt: '2020-07-17 02:31:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: null,
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 22:13:15',
                monitoringEndAt: '2020-07-17 12:47:24',
                executedAt: '2020-07-16 17:12:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-17 03:50:19',
                monitoringEndAt: '2020-07-16 22:02:17',
                executedAt: '2020-07-17 08:00:09',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: null,
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 18:20:35',
                monitoringEndAt: '2020-07-17 15:16:12',
                executedAt: '2020-07-17 14:58:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-17 05:20:38',
                monitoringEndAt: '2020-07-17 00:08:59',
                executedAt: '2020-07-16 22:52:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: null,
                monitoringStartAt: '2020-07-16 22:18:02',
                monitoringEndAt: '2020-07-17 07:27:49',
                executedAt: '2020-07-17 12:17:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                
                monitoringStartAt: '2020-07-17 06:48:34',
                monitoringEndAt: '2020-07-17 15:30:23',
                executedAt: '2020-07-17 12:44:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'SUMMARY',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-16 18:27:30',
                executedAt: '2020-07-17 07:34:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'DETAIL',
                
                monitoringEndAt: '2020-07-16 21:28:08',
                executedAt: '2020-07-16 18:15:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-17 16:03:25',
                monitoringEndAt: null,
                executedAt: '2020-07-16 19:41:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 22:15:02',
                
                executedAt: '2020-07-17 15:42:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-17 13:15:51',
                monitoringEndAt: '2020-07-17 02:20:56',
                executedAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-17 03:48:03',
                monitoringEndAt: '2020-07-17 14:59:10',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'djpzznokuef7xyiruh71c4ac5ti1nzmq0wt87',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-16 17:50:22',
                monitoringEndAt: '2020-07-17 07:17:02',
                executedAt: '2020-07-16 23:45:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: 'zo503wi2c64tsom98a7r5nuvrmcd21ve5z1ue',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 23:55:19',
                monitoringEndAt: '2020-07-17 13:44:09',
                executedAt: '2020-07-17 11:52:50',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: '4gyh6fymfkum38y7be3gbctp6ms2vwcypis7g',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-16 17:23:18',
                monitoringEndAt: '2020-07-16 21:50:31',
                executedAt: '2020-07-17 10:11:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });
    

    

    

    
    
    

    

    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'XXXX',
                monitoringStartAt: '2020-07-16 23:41:35',
                monitoringEndAt: '2020-07-17 12:56:46',
                executedAt: '2020-07-16 21:26:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'SUMMARY',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-17 11:46:17',
                executedAt: '2020-07-16 19:12:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 19:15:59',
                monitoringEndAt: 'XXXXXXXX',
                executedAt: '2020-07-16 17:32:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 19:26:47',
                monitoringEndAt: '2020-07-16 20:06:57',
                executedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-17 14:27:11',
                monitoringEndAt: '2020-07-17 01:35:30',
                executedAt: '2020-07-16 18:04:36',
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/executions/paginate`, () => 
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

    it(`/REST:GET bplus-it-sappi/execution - Got 404 Not Found`, () => 
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

    it(`/REST:GET bplus-it-sappi/execution`, () => 
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
                        value   : '7fbe1406-aad1-497b-9a01-8772d5cae7f0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7fbe1406-aad1-497b-9a01-8772d5cae7f0'));
    });

    it(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/7fbe1406-aad1-497b-9a01-8772d5cae7f0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7fbe1406-aad1-497b-9a01-8772d5cae7f0'));
    });

    it(`/REST:GET bplus-it-sappi/executions`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/executions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '4dac1f98-2125-41d1-a092-3604786815fe',
                tenantId: '09df43a9-3321-4957-b7c2-b2cfa4ed8f77',
                systemId: '87e4560d-e3e9-431f-bfa6-4fac63953418',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-16 16:30:38',
                monitoringEndAt: '2020-07-17 14:31:53',
                executedAt: '2020-07-17 08:10:32',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 19:27:08',
                monitoringEndAt: '2020-07-17 16:11:09',
                executedAt: '2020-07-17 11:14:06',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7fbe1406-aad1-497b-9a01-8772d5cae7f0'));
    });

    it(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/7fbe1406-aad1-497b-9a01-8772d5cae7f0')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateExecution - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL bplusItSappiCreateExecution`, () => 
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
                        id: '4077aa80-52c3-4e20-bf99-c6e1cac20aa4',
                        tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                        systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-17 10:49:05',
                        monitoringEndAt: '2020-07-16 18:29:55',
                        executedAt: '2020-07-17 06:03:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '4077aa80-52c3-4e20-bf99-c6e1cac20aa4');
            });
    });

    it(`/GraphQL bplusItSappiPaginateExecutions`, () => 
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

    it(`/GraphQL bplusItSappiFindExecution - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindExecution`, () => 
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
                            value   : '7fbe1406-aad1-497b-9a01-8772d5cae7f0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('7fbe1406-aad1-497b-9a01-8772d5cae7f0');
            });
    });

    it(`/GraphQL bplusItSappiFindExecutionById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiFindExecutionById`, () => 
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
                    id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('7fbe1406-aad1-497b-9a01-8772d5cae7f0');
            });
    });

    it(`/GraphQL bplusItSappiGetExecutions`, () => 
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

    it(`/GraphQL bplusItSappiUpdateExecution - Got 404 Not Found`, () => 
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
                        
                        id: '97355d86-9eb7-44f0-8416-dc28ed4c73ce',
                        tenantId: '68cfcddf-fba2-4e0e-8ff2-bfcf97775c6b',
                        systemId: 'a6cac782-a4bd-462b-a8c0-199406d343e7',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-07-17 00:21:04',
                        monitoringEndAt: '2020-07-16 19:00:44',
                        executedAt: '2020-07-16 22:38:47',
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

    it(`/GraphQL bplusItSappiUpdateExecution`, () => 
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
                        
                        id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0',
                        tenantId: '319c94c0-674a-40a6-a4f7-c29429b3a81a',
                        systemId: 'b6abd9f6-242b-4091-88cd-5afa01120cb0',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-17 11:05:53',
                        monitoringEndAt: '2020-07-16 22:04:54',
                        executedAt: '2020-07-17 10:03:03',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('7fbe1406-aad1-497b-9a01-8772d5cae7f0');
            });
    });

    it(`/GraphQL bplusItSappiDeleteExecutionById - Got 404 Not Found`, () => 
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

    it(`/GraphQL bplusItSappiDeleteExecutionById`, () => 
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
                    id: '7fbe1406-aad1-497b-9a01-8772d5cae7f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('7fbe1406-aad1-497b-9a01-8772d5cae7f0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});