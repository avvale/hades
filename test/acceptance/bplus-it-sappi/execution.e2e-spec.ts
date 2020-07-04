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

describe('execution', () => 
{
    let app: INestApplication;
    let repository: MockExecutionRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
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
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 12:22:08',
                monitoringEndAt: '2020-06-27 05:36:09',
                executedAt: '2020-06-27 18:02:57',
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
                
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 04:48:11',
                monitoringEndAt: '2020-06-27 20:52:12',
                executedAt: '2020-06-27 10:37:03',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: null,
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 04:13:50',
                monitoringEndAt: '2020-06-27 10:24:58',
                executedAt: '2020-06-27 02:02:21',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 20:30:48',
                monitoringEndAt: '2020-06-27 02:16:01',
                executedAt: '2020-06-27 01:19:10',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: null,
                type: 'DETAIL',
                monitoringStartAt: '2020-06-27 04:59:47',
                monitoringEndAt: '2020-06-27 22:06:47',
                executedAt: '2020-06-28 00:31:52',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 21:12:13',
                monitoringEndAt: '2020-06-27 10:24:35',
                executedAt: '2020-06-27 17:01:46',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: null,
                monitoringStartAt: '2020-06-27 08:30:56',
                monitoringEndAt: '2020-06-27 01:40:52',
                executedAt: '2020-06-27 02:11:07',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                
                monitoringStartAt: '2020-06-27 17:20:34',
                monitoringEndAt: '2020-06-27 07:59:28',
                executedAt: '2020-06-27 13:54:37',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'DETAIL',
                monitoringStartAt: null,
                monitoringEndAt: '2020-06-27 19:37:15',
                executedAt: '2020-06-27 04:49:13',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'DETAIL',
                
                monitoringEndAt: '2020-06-27 22:40:52',
                executedAt: '2020-06-27 07:54:01',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 01:50:23',
                monitoringEndAt: null,
                executedAt: '2020-06-27 18:16:42',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-28 00:25:27',
                
                executedAt: '2020-06-27 21:31:30',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 20:08:40',
                monitoringEndAt: '2020-06-27 00:40:49',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'DETAIL',
                monitoringStartAt: '2020-06-27 01:07:03',
                monitoringEndAt: '2020-06-27 11:42:59',
                
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
                id: 'xx7mq0f1vjc7gc7247oukgut5fvdczf9dirsr',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 05:56:11',
                monitoringEndAt: '2020-06-27 21:45:16',
                executedAt: '2020-06-27 19:48:33',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: 'vuilzlzqh8oxtq13ctn17t6z1w3uf1m11lqlr',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'DETAIL',
                monitoringStartAt: '2020-06-27 10:47:20',
                monitoringEndAt: '2020-06-27 13:09:29',
                executedAt: '2020-06-27 14:33:58',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'kf8123k7devjpgykmpsl6qjyvtiqbm1q5hm79',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 20:29:18',
                monitoringEndAt: '2020-06-27 04:42:34',
                executedAt: '2020-06-27 22:26:38',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'XXXX',
                monitoringStartAt: '2020-06-27 21:31:10',
                monitoringEndAt: '2020-06-27 03:37:40',
                executedAt: '2020-06-27 14:25:53',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-06-27 20:42:14',
                executedAt: '2020-06-27 22:59:57',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 01:22:47',
                monitoringEndAt: 'XXXXXXXX',
                executedAt: '2020-06-27 02:35:12',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'DETAIL',
                monitoringStartAt: '2020-06-27 20:58:16',
                monitoringEndAt: '2020-06-27 20:02:41',
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
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'DETAIL',
                monitoringStartAt: '2020-06-27 15:57:45',
                monitoringEndAt: '2020-06-27 11:39:54',
                executedAt: '2020-06-27 23:20:01',
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
                        value   : '8a664f6f-0057-49e3-9845-980e6a5efc20'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '8a664f6f-0057-49e3-9845-980e6a5efc20'));
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
            .get('/bplus-it-sappi/execution/8a664f6f-0057-49e3-9845-980e6a5efc20')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8a664f6f-0057-49e3-9845-980e6a5efc20'));
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
                
                id: 'b08f2463-8ff0-4b77-9734-5bbfae04ed5a',
                tenantId: 'ef80260c-c617-4ddd-b787-55c54eb2313e',
                systemId: '25d137f4-2faa-4ae3-b2de-6f6726a92138',
                type: 'DETAIL',
                monitoringStartAt: '2020-06-27 11:39:40',
                monitoringEndAt: '2020-06-27 09:08:53',
                executedAt: '2020-06-27 02:25:04',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-06-27 01:32:00',
                monitoringEndAt: '2020-06-27 04:01:12',
                executedAt: '2020-06-27 04:08:01',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '8a664f6f-0057-49e3-9845-980e6a5efc20'));
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
            .delete('/bplus-it-sappi/execution/8a664f6f-0057-49e3-9845-980e6a5efc20')
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
                        id: 'ade68034-bbc7-418c-807e-fad1faeada17',
                        tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                        systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-06-27 14:37:10',
                        monitoringEndAt: '2020-06-27 21:14:42',
                        executedAt: '2020-06-27 19:41:02',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', 'ade68034-bbc7-418c-807e-fad1faeada17');
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
                            value   : '8a664f6f-0057-49e3-9845-980e6a5efc20'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('8a664f6f-0057-49e3-9845-980e6a5efc20');
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
                    id: '8a664f6f-0057-49e3-9845-980e6a5efc20'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('8a664f6f-0057-49e3-9845-980e6a5efc20');
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
                        
                        id: '60a2f05f-fb40-47a0-a6c6-eed757c99595',
                        tenantId: 'bf956549-ad4d-4554-a84f-0cd84d7a7995',
                        systemId: '15074c1b-cd39-4792-b5f5-e19945d7a2dd',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-06-27 07:41:35',
                        monitoringEndAt: '2020-06-27 05:38:29',
                        executedAt: '2020-06-27 10:12:51',
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
                        
                        id: '8a664f6f-0057-49e3-9845-980e6a5efc20',
                        tenantId: '0ad17690-1a22-42b8-8520-7130398cbb46',
                        systemId: 'b97eff3b-48f3-4f47-85d4-3edb9a994e1f',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-06-27 05:13:03',
                        monitoringEndAt: '2020-06-27 06:53:47',
                        executedAt: '2020-06-27 11:17:10',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('8a664f6f-0057-49e3-9845-980e6a5efc20');
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
                    id: '8a664f6f-0057-49e3-9845-980e6a5efc20'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('8a664f6f-0057-49e3-9845-980e6a5efc20');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});