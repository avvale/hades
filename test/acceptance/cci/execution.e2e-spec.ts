import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IExecutionRepository } from '@hades/cci/execution/domain/execution.repository';
import { MockExecutionRepository } from '@hades/cci/execution/infrastructure/mock/mock-execution.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
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
            .overrideProvider(IExecutionRepository)
            .useClass(MockExecutionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockExecutionRepository>module.get<IExecutionRepository>(IExecutionRepository);

        await app.init();
    });

    test(`/REST:POST cci/execution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: '5tl44kqfkchuc9szowpvnmm23erluspepfg1z5q3oqxhpdq7la',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '7e4t8r61yyu6boi2y6k2',
                version: '8rxcba81uobpmpd73q3n',
                type: 'DETAIL',
                executedAt: '2020-10-28 18:00:41',
                monitoringStartAt: '2020-10-28 21:24:17',
                monitoringEndAt: '2020-10-29 10:13:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'a8gwf930y8nuyg6whunvd96p81q3vi6889mr4l9wymi0t973ea',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'kz50kv1yi1xkt074ii5x',
                version: 'x6c1dzp99q1pox204ndq',
                type: 'DETAIL',
                executedAt: '2020-10-29 03:27:04',
                monitoringStartAt: '2020-10-29 17:00:50',
                monitoringEndAt: '2020-10-29 11:08:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: null,
                tenantCode: 'l5klof3nzcb3ict2886fj42vygtvfd56u9b7puhvkaokz71215',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '9hsg7il30z0tbthdd5qt',
                version: '43iultw8n0awh69uotqc',
                type: 'SUMMARY',
                executedAt: '2020-10-28 18:51:39',
                monitoringStartAt: '2020-10-28 18:21:14',
                monitoringEndAt: '2020-10-29 12:52:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                
                tenantCode: 'a749xla2btltrg1jwastkxgbrogpokgqcgkwzb3racc47rni32',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '7p61cgdpsi6f6s9petag',
                version: 'v3gs4r54d902j6vxupyd',
                type: 'SUMMARY',
                executedAt: '2020-10-29 15:14:36',
                monitoringStartAt: '2020-10-28 23:28:08',
                monitoringEndAt: '2020-10-29 12:03:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: null,
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'vx4nn9mpu8dhdwyawxxn',
                version: 'qkzkyw0st5k228lt6s5w',
                type: 'DETAIL',
                executedAt: '2020-10-29 09:24:02',
                monitoringStartAt: '2020-10-28 19:16:32',
                monitoringEndAt: '2020-10-29 02:04:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'mv2nl20qc5dxlnyd7jsr',
                version: '34l4iqlrwaxe5l5aotxz',
                type: 'SUMMARY',
                executedAt: '2020-10-29 08:59:03',
                monitoringStartAt: '2020-10-29 07:02:04',
                monitoringEndAt: '2020-10-29 14:01:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: '7k87c1kqvhnyhgtswe37c6xuw5va5reo0ukdx8x8tg7e13etpv',
                systemId: null,
                systemName: 'kqu6yudjm4ajfeeol7c1',
                version: 'yn8nyxazyr4ucxt19y7f',
                type: 'DETAIL',
                executedAt: '2020-10-28 18:47:11',
                monitoringStartAt: '2020-10-29 08:05:59',
                monitoringEndAt: '2020-10-28 23:10:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'yheglcpp4sruhl54j25d4d9iza06jtwaxz5dwnzpkjovsfgqop',
                
                systemName: 'y7gsjmkjoez18fyvgmmg',
                version: 'buypsyswf9l456430r9h',
                type: 'DETAIL',
                executedAt: '2020-10-28 19:41:44',
                monitoringStartAt: '2020-10-28 18:51:35',
                monitoringEndAt: '2020-10-28 19:20:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: '1pntzvkxyel8yru1o4af6osrztr15l5nqtqse1407d2facqfvr',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: null,
                version: '316qzcdelnm45600pu8w',
                type: 'SUMMARY',
                executedAt: '2020-10-28 23:15:01',
                monitoringStartAt: '2020-10-28 22:10:50',
                monitoringEndAt: '2020-10-29 11:15:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: '004ki9dy9tb614tv5kluju55i8vjqxf9nd9h040qma4b9rrsv5',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                
                version: 'ij4ehwbxdh8xjzlmgu61',
                type: 'DETAIL',
                executedAt: '2020-10-29 14:57:31',
                monitoringStartAt: '2020-10-29 10:02:39',
                monitoringEndAt: '2020-10-28 22:12:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: '7ajt2eontsqlnpd8mrijq5mlc3fhbhhwvac9j2i6lnyokufoqs',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 's8ejybz60zyw70bjqv2b',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-10-29 09:51:26',
                monitoringStartAt: '2020-10-29 13:05:54',
                monitoringEndAt: '2020-10-29 10:26:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: '1unw05wtrn3uw8jwmjmvffbybte4niacmd2fvknzwpn1vebq6e',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'd0b0krh2rsfrxll9zsfy',
                
                type: 'DETAIL',
                executedAt: '2020-10-29 07:35:56',
                monitoringStartAt: '2020-10-28 21:07:24',
                monitoringEndAt: '2020-10-29 14:56:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: '06ydqaa0h83iiu486xj28dvpcthmvu7xtyl6uzpw2c4ij32mjw',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '4e2s3f2ks9jjcsnuj4j7',
                version: 'pzfhk6bp6clg9xabltmd',
                type: null,
                executedAt: '2020-10-28 19:45:29',
                monitoringStartAt: '2020-10-28 18:34:22',
                monitoringEndAt: '2020-10-29 00:37:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'f7qyhtn62a1g6kebjdufni95ehggn9fr4ed8ok5lrvjwu7jg1r',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'f3x8rlimcgnhv0vn68fs',
                version: 'r2acnjclg5qqo8r3uhxy',
                
                executedAt: '2020-10-29 16:06:26',
                monitoringStartAt: '2020-10-29 15:49:09',
                monitoringEndAt: '2020-10-29 11:04:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'mzwr7g7uoer5m9p7jc5dvuzyif435eczt883sqmvx6e9h2gn63',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '0lvkb8qepip5ucr61n0w',
                version: 't6didml2ib14gszztj1a',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2020-10-28 20:50:55',
                monitoringEndAt: '2020-10-29 17:30:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'q3d0y1w2o8vo9b8mdv3vbdrzeu2z1jrrl8mbcp4tgh0dk03a7j',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'vxcrnpnfwlwqjmnustef',
                version: '9pubu1u636pjhy0z5kgy',
                type: 'SUMMARY',
                
                monitoringStartAt: '2020-10-29 01:12:58',
                monitoringEndAt: '2020-10-28 22:24:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'rs0s1f11nlpbyra1hbt9efcft6wta5aydiuvktqrpesdw9g7ws',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'cd0od9f39ec75ttumwy9',
                version: '4a3u48b9xfh0h9u9znr2',
                type: 'DETAIL',
                executedAt: '2020-10-29 04:10:07',
                monitoringStartAt: null,
                monitoringEndAt: '2020-10-29 13:06:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: '660vuf7xwgoxq9gxxlgulbv5aa1hjvaifvu76vmuu2bxslrgwt',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'yq9gpr2l6e9sjqwg8grm',
                version: '4p5wx4yayi52h15ymkjd',
                type: 'SUMMARY',
                executedAt: '2020-10-29 09:06:39',
                
                monitoringEndAt: '2020-10-28 19:09:39',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'wvfcdkpp554mb2dksgleo7h18rqigupdawxsp9s1zlgzea1z1k',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '6bizw19exf16o5fkelug',
                version: 'f7gsg013klgutajt072i',
                type: 'SUMMARY',
                executedAt: '2020-10-29 06:55:43',
                monitoringStartAt: '2020-10-29 08:45:46',
                monitoringEndAt: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'stm3ap39pq1wuidfavz6d4vewssdj8otdollarobwzp83tt32a',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'slt2a81llcuvcx2myurs',
                version: 'el4x11hukd794vmvkha8',
                type: 'SUMMARY',
                executedAt: '2020-10-29 15:26:35',
                monitoringStartAt: '2020-10-29 05:19:54',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'i8q06mz49iozkqdi3hbv1bw2071lpuyiftfb7',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'd5bq0d17ficfvvzd707cnixwrdgugkeneht9i39hm8fuhb0oms',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'qbmkd53nc78nbls5ldah',
                version: '7nk0o6brsoy7jz9ln7xk',
                type: 'SUMMARY',
                executedAt: '2020-10-29 09:59:52',
                monitoringStartAt: '2020-10-29 13:23:36',
                monitoringEndAt: '2020-10-29 10:58:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db5cmnqt47z1ziyij86azm4r5rc1ef20n853x',
                tenantCode: '9vodld8jwapf82oqd1iva1nl004p3pclovf7xl0qhwnqsvf0wt',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'w96gbe1uqgicamzamk6i',
                version: 'rnj8pd36lj3qlvgzpk7m',
                type: 'DETAIL',
                executedAt: '2020-10-29 16:54:24',
                monitoringStartAt: '2020-10-29 02:27:30',
                monitoringEndAt: '2020-10-29 15:38:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: '85zxpco0spgd3sgfrod28wb2utuq9dwsc22f8byeidbzukegox',
                systemId: 'fxc72unzxeerol3jogzqh3drwl8snxpd8xzz4',
                systemName: '3tnyjw2eog4h6pjiccho',
                version: '85jrar153wr99luri24m',
                type: 'DETAIL',
                executedAt: '2020-10-29 17:22:02',
                monitoringStartAt: '2020-10-28 20:12:27',
                monitoringEndAt: '2020-10-29 17:46:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'o2hptlcrj0yjaz6kyhwwoqnp1rswqq6xrtp0m6mquz9jfrwzl7m',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'fpw7ib3knmh88f80yvme',
                version: '0ifnmw0bulj7q6wlkjp3',
                type: 'SUMMARY',
                executedAt: '2020-10-29 16:07:42',
                monitoringStartAt: '2020-10-29 10:03:44',
                monitoringEndAt: '2020-10-29 14:13:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'drmaypbbydgia5yd2mviumokrnoqvnxo50wrc2solws64zut46',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'acqyoxktj5q5lc7tq0r0k',
                version: 'wun2crh23vb2tny3tcfx',
                type: 'DETAIL',
                executedAt: '2020-10-29 13:28:50',
                monitoringStartAt: '2020-10-29 09:30:37',
                monitoringEndAt: '2020-10-29 02:34:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'vyoe5wdc82jgrlcarchxi60aklpmzuxp4366xgy4m6fmr13j4v',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'smgwqou4c5hks0lgqqpw',
                version: 'hk184j6avikrgw59eb7us',
                type: 'SUMMARY',
                executedAt: '2020-10-28 20:48:02',
                monitoringStartAt: '2020-10-29 09:46:23',
                monitoringEndAt: '2020-10-29 13:51:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionVersion is too large, has a maximum length of 20');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'vfsmnhxwdz4s2t4qwya9cguw7h5rxw398c6805gc4wlqol3dwx',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '0cobl2ma0ft2ndhd70bw',
                version: 'sgsvqph6c8iixtbj5ny9',
                type: 'XXXX',
                executedAt: '2020-10-29 17:40:33',
                monitoringStartAt: '2020-10-29 10:02:01',
                monitoringEndAt: '2020-10-29 16:27:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionType has to be any of this options: SUMMARY, DETAIL');
            });
    });
    

    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionExecutedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: '44gtoiaq3nm4e7teyu9ddvtn87tvy8tpr8md7qm0b2qn17hxb3',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '1mtshk2usrbyz9bshfr0',
                version: 'qe16qfggacgc709ce1jq',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-10-29 16:24:02',
                monitoringEndAt: '2020-10-28 22:47:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionExecutedAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringStartAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'oawix9jyrgzwm0vsgwniwpbkny0ja8rzrsy69r02c19plomzeb',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '5knp17652obyehnmau9g',
                version: 'pw362nj1xasmg5kdw2wn',
                type: 'DETAIL',
                executedAt: '2020-10-29 04:05:34',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-10-28 18:51:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringStartAt has to be a timestamp value');
            });
    });
    
    test(`/REST:POST cci/execution - Got 400 Conflict, ExecutionMonitoringEndAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'h8e4uvwyyac3cg5tc3sxts7fxj4hja4z0shvtrpdz94r9o4blq',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '6yuongnltuxvtcev3bd0',
                version: 'd5fq2i9cmtrcbvcmxsfz',
                type: 'SUMMARY',
                executedAt: '2020-10-29 15:07:34',
                monitoringStartAt: '2020-10-29 15:07:03',
                monitoringEndAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionMonitoringEndAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'jx27juwwmtxpwbkd4rmuot51bun4wadrjg6kc513bzu67n0ovm',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: '8yyy4ego408axaurvszw',
                version: 'yqxfvi8egkuny13onc58',
                type: 'SUMMARY',
                executedAt: '2020-10-29 15:12:10',
                monitoringStartAt: '2020-10-28 18:34:50',
                monitoringEndAt: '2020-10-29 02:02:25',
            })
            .expect(201);
    });

    test(`/REST:GET cci/executions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/executions/paginate')
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

    test(`/REST:GET cci/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd9bdd0e4-44e2-4cce-a0e9-6f874db001c1'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/25416e57-3c9c-4cc2-bfa5-25bcc981fee5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/a2ffaecf-87d8-40ad-bf7b-32883ca4beb5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5'));
    });

    test(`/REST:GET cci/executions`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/executions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/execution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f7986d25-3f17-4c81-bfed-b06a208a61b3',
                tenantId: '84d0fb2e-815d-4417-ad4f-ccd5a05b80f8',
                tenantCode: 'gjtim5syeic9y2kc23duw2pntcvywrygpikhcf6mlbdv6quj71',
                systemId: '30ccd37b-46ed-430e-acb5-4979c21d0c5a',
                systemName: 'n59br5vqcrn2vxxkonkq',
                version: 'vlf6554i9egcdj40q833',
                type: 'SUMMARY',
                executedAt: '2020-10-29 17:33:20',
                monitoringStartAt: '2020-10-28 20:56:05',
                monitoringEndAt: '2020-10-29 09:54:09',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                tenantCode: 'k8mdz8aqfs9r941ijep1a4t8akw8dq31pfe7hn08t065dk3hl1',
                systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                systemName: 'ad5om6v5viv6ramt7yzt',
                version: 'nheurzb464en1k3ot11w',
                type: 'SUMMARY',
                executedAt: '2020-10-28 23:44:07',
                monitoringStartAt: '2020-10-28 20:46:47',
                monitoringEndAt: '2020-10-29 11:57:19',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/f25def6a-7437-4da9-9ee0-b22865477457')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/a2ffaecf-87d8-40ad-bf7b-32883ca4beb5')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateExecution - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateExecutionInput!)
                    {
                        cciCreateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
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

    test(`/GraphQL cciCreateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateExecutionInput!)
                    {
                        cciCreateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
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
                        id: 'd17bed04-c592-4eca-868d-9399a4b5c266',
                        tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                        tenantCode: 'kg4os1w99dih0ylkx47a1pa6x9w9g8kosmayk68wbj7elq6n8m',
                        systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                        systemName: 'xv5qqbidq1vps867adek',
                        version: 'd28cy89xeoqs9ktydpjp',
                        type: 'SUMMARY',
                        executedAt: '2020-10-28 20:36:28',
                        monitoringStartAt: '2020-10-28 22:57:33',
                        monitoringEndAt: '2020-10-29 11:15:36',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', 'd17bed04-c592-4eca-868d-9399a4b5c266');
            });
    });

    test(`/GraphQL cciPaginateExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateExecutions (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateExecutions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateExecutions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateExecutions.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindExecution (query:$query)
                        {   
                            id
                            tenantCode
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'ee9e4355-cbfa-461d-a6a2-02658b06da8b'
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

    test(`/GraphQL cciFindExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindExecution (query:$query)
                        {   
                            id
                            tenantCode
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('a2ffaecf-87d8-40ad-bf7b-32883ca4beb5');
            });
    });

    test(`/GraphQL cciFindExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindExecutionById (id:$id)
                        {   
                            id
                            tenantCode
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
                    id: '2ad7bf7c-fd67-4b5f-b52a-79c8c9a0011c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindExecutionById (id:$id)
                        {   
                            id
                            tenantCode
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
                    id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('a2ffaecf-87d8-40ad-bf7b-32883ca4beb5');
            });
    });

    test(`/GraphQL cciGetExecutions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetExecutions (query:$query)
                        {   
                            id
                            tenantCode
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetExecutions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateExecution - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateExecutionInput!)
                    {
                        cciUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
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
                        
                        id: '06a47475-747a-43d6-8a5b-3661b9e3ef7f',
                        tenantId: 'afd9def8-11a9-4ddc-808f-e42fb7c518d7',
                        tenantCode: 'g8q771bbu3w1uvtv8m5ww1dep9dplm35dozvy7svvw3pczm6c1',
                        systemId: 'b948aaea-3fae-47cd-889d-922fef9f7de2',
                        systemName: 'atpmo5kijwu69rngch94',
                        version: '7dsxco4kgtjr0th5tzlm',
                        type: 'SUMMARY',
                        executedAt: '2020-10-29 17:24:42',
                        monitoringStartAt: '2020-10-28 18:10:36',
                        monitoringEndAt: '2020-10-29 08:54:05',
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

    test(`/GraphQL cciUpdateExecution`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateExecutionInput!)
                    {
                        cciUpdateExecution (payload:$payload)
                        {   
                            id
                            tenantCode
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
                        
                        id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5',
                        tenantId: 'db3a20ac-7db5-40b2-bfbf-7741ecc03ba2',
                        tenantCode: '24r6hh55aye4dvmnk1ypjex7cts1572v9bhgwgvlom04k3qngt',
                        systemId: 'bbb0f68d-8c50-44a7-93f5-ddcf3909c7dd',
                        systemName: 'k22koxfo0x514xkn57i9',
                        version: 'cmngfhoo2k10r80p42x7',
                        type: 'DETAIL',
                        executedAt: '2020-10-29 06:17:44',
                        monitoringStartAt: '2020-10-29 14:22:18',
                        monitoringEndAt: '2020-10-28 22:05:23',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('a2ffaecf-87d8-40ad-bf7b-32883ca4beb5');
            });
    });

    test(`/GraphQL cciDeleteExecutionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantCode
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
                    id: '4438fc54-ae3e-4d6a-950b-24ad82ee3c12'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteExecutionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteExecutionById (id:$id)
                        {   
                            id
                            tenantCode
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
                    id: 'a2ffaecf-87d8-40ad-bf7b-32883ca4beb5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('a2ffaecf-87d8-40ad-bf7b-32883ca4beb5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});