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
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 09:15:09',
                monitoringEndAt: '2020-07-21 02:20:29',
                executedAt: '2020-07-21 02:32:11',
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
                
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 19:13:19',
                monitoringEndAt: '2020-07-21 13:44:43',
                executedAt: '2020-07-21 17:54:17',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: null,
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 06:12:09',
                monitoringEndAt: '2020-07-21 14:27:28',
                executedAt: '2020-07-21 09:35:06',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 10:16:47',
                monitoringEndAt: '2020-07-21 18:16:46',
                executedAt: '2020-07-21 13:50:04',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: null,
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 11:51:55',
                monitoringEndAt: '2020-07-21 07:29:26',
                executedAt: '2020-07-21 21:36:28',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 19:34:16',
                monitoringEndAt: '2020-07-21 17:29:14',
                executedAt: '2020-07-21 07:39:48',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: null,
                monitoringStartAt: '2020-07-21 02:58:21',
                monitoringEndAt: '2020-07-21 19:31:27',
                executedAt: '2020-07-21 03:34:05',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                
                monitoringStartAt: '2020-07-21 09:47:42',
                monitoringEndAt: '2020-07-21 14:29:19',
                executedAt: '2020-07-21 08:24:39',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'DETAIL',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-21 12:14:40',
                executedAt: '2020-07-21 15:34:21',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'SUMMARY',
                
                monitoringEndAt: '2020-07-21 14:11:58',
                executedAt: '2020-07-21 15:56:39',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 12:16:26',
                monitoringEndAt: null,
                executedAt: '2020-07-21 18:59:56',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 08:45:37',
                
                executedAt: '2020-07-21 06:23:48',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 17:26:12',
                monitoringEndAt: '2020-07-21 03:59:10',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 10:31:11',
                monitoringEndAt: '2020-07-21 22:59:30',
                
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
                id: 'fvxoaume4npgr7t83qr6ziwu03y1pk80z64hl',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 10:13:20',
                monitoringEndAt: '2020-07-21 06:11:05',
                executedAt: '2020-07-21 04:53:25',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: 'fk9k3m73rsrpa0w43ylkfh1iygpz6afuvcm1u',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 21:33:54',
                monitoringEndAt: '2020-07-21 22:54:12',
                executedAt: '2020-07-21 20:48:00',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '5t2dwbq5trkpft6xqyoishkg4okbb62cusbs4',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 18:30:23',
                monitoringEndAt: '2020-07-21 05:47:10',
                executedAt: '2020-07-21 22:27:55',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'XXXX',
                monitoringStartAt: '2020-07-21 16:27:24',
                monitoringEndAt: '2020-07-21 09:36:01',
                executedAt: '2020-07-21 23:40:29',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'DETAIL',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-21 15:49:23',
                executedAt: '2020-07-21 14:46:21',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-21 07:08:12',
                monitoringEndAt: 'XXXXXXXX',
                executedAt: '2020-07-21 21:42:27',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 01:03:01',
                monitoringEndAt: '2020-07-21 21:55:53',
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
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 13:21:02',
                monitoringEndAt: '2020-07-21 12:46:38',
                executedAt: '2020-07-21 01:13:42',
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
                        value   : 'ee59f251-931b-4ed9-bc5d-bfdc6041a958'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ee59f251-931b-4ed9-bc5d-bfdc6041a958'));
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
            .get('/bplus-it-sappi/execution/ee59f251-931b-4ed9-bc5d-bfdc6041a958')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ee59f251-931b-4ed9-bc5d-bfdc6041a958'));
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
                
                id: '97539f8a-5d73-456b-8220-ece2a792ed17',
                tenantId: '06881b07-64ae-4f79-8164-d16f0df892ce',
                systemId: '76b78f45-2896-4f4c-88ac-255dbc21c983',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-21 15:34:57',
                monitoringEndAt: '2020-07-21 17:49:52',
                executedAt: '2020-07-22 00:10:07',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-22 00:10:00',
                monitoringEndAt: '2020-07-21 01:24:23',
                executedAt: '2020-07-21 14:43:32',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ee59f251-931b-4ed9-bc5d-bfdc6041a958'));
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
            .delete('/bplus-it-sappi/execution/ee59f251-931b-4ed9-bc5d-bfdc6041a958')
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
                        id: 'e7b54fef-e292-45f4-b933-8cdd29dd48d4',
                        tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                        systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-07-21 18:31:04',
                        monitoringEndAt: '2020-07-21 18:02:53',
                        executedAt: '2020-07-21 01:45:13',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', 'e7b54fef-e292-45f4-b933-8cdd29dd48d4');
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
                            value   : 'ee59f251-931b-4ed9-bc5d-bfdc6041a958'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('ee59f251-931b-4ed9-bc5d-bfdc6041a958');
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
                    id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('ee59f251-931b-4ed9-bc5d-bfdc6041a958');
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
                        
                        id: '2068657a-d075-42b7-8182-7722c1b68cd3',
                        tenantId: 'dab11fb2-aa6b-4615-b36e-dff834f6822f',
                        systemId: '9a3cb6d0-8b6c-4bc2-a469-6c76cea083eb',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-21 12:00:29',
                        monitoringEndAt: '2020-07-21 02:32:30',
                        executedAt: '2020-07-21 14:41:34',
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
                        
                        id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958',
                        tenantId: '99499fd1-c68b-4675-9ae7-4371fef2399a',
                        systemId: '31bf8ec9-6b8d-49f4-bfe2-f2820eefdbd4',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-21 07:09:22',
                        monitoringEndAt: '2020-07-21 23:38:49',
                        executedAt: '2020-07-21 09:16:48',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('ee59f251-931b-4ed9-bc5d-bfdc6041a958');
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
                    id: 'ee59f251-931b-4ed9-bc5d-bfdc6041a958'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('ee59f251-931b-4ed9-bc5d-bfdc6041a958');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});