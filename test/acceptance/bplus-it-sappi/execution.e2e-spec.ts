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
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 07:16:02',
                monitoringEndAt: '2020-07-16 19:04:32',
                executedAt: '2020-07-16 04:08:13',
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
                
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 12:47:28',
                monitoringEndAt: '2020-07-16 00:56:16',
                executedAt: '2020-07-16 18:51:11',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: null,
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 01:07:11',
                monitoringEndAt: '2020-07-16 09:55:04',
                executedAt: '2020-07-16 18:32:41',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-15 20:48:23',
                monitoringEndAt: '2020-07-16 04:20:08',
                executedAt: '2020-07-16 14:46:46',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: null,
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-16 18:42:31',
                monitoringEndAt: '2020-07-16 08:56:14',
                executedAt: '2020-07-16 14:30:28',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-16 02:51:47',
                monitoringEndAt: '2020-07-16 17:34:18',
                executedAt: '2020-07-16 15:31:39',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: null,
                monitoringStartAt: '2020-07-16 14:58:58',
                monitoringEndAt: '2020-07-16 01:53:30',
                executedAt: '2020-07-16 04:55:59',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                
                monitoringStartAt: '2020-07-16 09:56:49',
                monitoringEndAt: '2020-07-16 07:51:49',
                executedAt: '2020-07-15 22:58:53',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'SUMMARY',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-15 19:29:40',
                executedAt: '2020-07-16 02:15:50',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                
                monitoringEndAt: '2020-07-15 20:51:12',
                executedAt: '2020-07-16 15:05:38',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 16:29:51',
                monitoringEndAt: null,
                executedAt: '2020-07-15 21:23:33',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 00:55:06',
                
                executedAt: '2020-07-15 19:26:23',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-16 08:11:02',
                monitoringEndAt: '2020-07-16 03:57:10',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 12:33:15',
                monitoringEndAt: '2020-07-15 19:57:58',
                
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
                id: 'vg6faqwv6je06dpe6j9aetk18jz2pvbhxk9gt',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-16 00:29:52',
                monitoringEndAt: '2020-07-16 09:07:19',
                executedAt: '2020-07-16 16:08:02',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '6xolwsckkqpcnsejcsq0f154dx56j9uq1t8fq',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-15 20:30:25',
                monitoringEndAt: '2020-07-16 09:50:19',
                executedAt: '2020-07-16 13:31:20',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '7fzjfr5b3ftmsevi7ghr77r35zb0upkm18nit',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-16 08:09:20',
                monitoringEndAt: '2020-07-15 21:11:01',
                executedAt: '2020-07-16 14:36:45',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'XXXX',
                monitoringStartAt: '2020-07-15 22:25:05',
                monitoringEndAt: '2020-07-16 06:42:07',
                executedAt: '2020-07-16 14:26:10',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-15 21:54:45',
                executedAt: '2020-07-16 05:00:51',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-16 02:06:12',
                monitoringEndAt: 'XXXXXXXX',
                executedAt: '2020-07-16 17:02:20',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-15 23:04:40',
                monitoringEndAt: '2020-07-16 05:51:10',
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
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-16 02:58:28',
                monitoringEndAt: '2020-07-15 21:44:46',
                executedAt: '2020-07-15 21:47:56',
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
                        value   : '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92'));
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
            .get('/bplus-it-sappi/execution/6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92'));
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
                
                id: 'e4ddb4b9-4d1e-46ec-906f-e622bd9b3a2a',
                tenantId: 'caa28bc6-fb85-448a-b9ac-3f8b99109665',
                systemId: '7486e5fa-f069-4ad2-bbbf-40aff26cd6ef',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-15 19:47:43',
                monitoringEndAt: '2020-07-16 06:17:23',
                executedAt: '2020-07-16 15:14:22',
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-15 20:46:22',
                monitoringEndAt: '2020-07-16 12:13:24',
                executedAt: '2020-07-16 10:07:45',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92'));
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
            .delete('/bplus-it-sappi/execution/6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92')
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
                        id: 'a1764173-a69a-439d-9080-955f0eaf0e28',
                        tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                        systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-07-15 20:34:35',
                        monitoringEndAt: '2020-07-16 03:11:37',
                        executedAt: '2020-07-16 02:25:46',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', 'a1764173-a69a-439d-9080-955f0eaf0e28');
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
                            value   : '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92');
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
                    id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92');
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
                        
                        id: '27cf1420-a074-477b-9cb6-6efc3147173c',
                        tenantId: 'e9db84b1-efd1-4798-9eb0-12c5c92ff247',
                        systemId: 'c09a9168-b781-4e5f-9b86-7db63d8e7e2d',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-16 04:53:36',
                        monitoringEndAt: '2020-07-16 10:34:25',
                        executedAt: '2020-07-16 02:06:47',
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
                        
                        id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92',
                        tenantId: '4ff1b6ae-238b-4b34-a9a8-556c96f538c2',
                        systemId: '8b8e19bb-7c44-42b2-bf69-2394ef167e2f',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-16 04:44:40',
                        monitoringEndAt: '2020-07-16 00:06:55',
                        executedAt: '2020-07-16 13:45:13',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92');
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
                    id: '6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('6e7a2cea-fa3d-4a5f-bf30-7bf63a64be92');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});