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
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'nlwqrjelpe04rwzsaf0xcfhbmxm4vtxjxm63ygx6bdk4pbt835',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'gyo8j3crdtwnnvk63kvx',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-24 02:32:59',
                monitoringEndAt: '2020-07-24 03:15:44',
                executedAt: '2020-07-24 07:06:37',
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
                
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'l2bvhe4s5o3ah5cw96yf59z2z33n7c1g7dq00ftfflstvbsgqa',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: '060ariv2zeomvf5lq0rt',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-24 03:57:41',
                monitoringEndAt: '2020-07-24 01:46:24',
                executedAt: '2020-07-24 08:59:50',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: null,
                tenantCode: 'uo9twyy11mootlf4mrajjzhtk0u1sh3tomql1z9biwp180pn5e',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'zsdc6ty1olgvt4xbbdqo',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-24 17:25:15',
                monitoringEndAt: '2020-07-24 01:32:15',
                executedAt: '2020-07-23 18:55:13',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                
                tenantCode: 'y44mz67iiljik9zsfdwystffvszjdoxdzuof3vbkxqczrbv2yt',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'o2xsuwllcqfupxq1zb7v',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-24 02:32:21',
                monitoringEndAt: '2020-07-24 15:52:52',
                executedAt: '2020-07-24 07:58:41',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: null,
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'rzsk413y2bt2hy8fyxpg',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 23:35:19',
                monitoringEndAt: '2020-07-24 04:42:20',
                executedAt: '2020-07-24 14:43:44',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'gf4p2m8piwbu1ien87zt',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 18:16:21',
                monitoringEndAt: '2020-07-24 06:18:58',
                executedAt: '2020-07-24 10:43:30',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'g1nsu1o97x5i0mluhfhymg3b9wyranl3wfn80x8kieo1xdyziq',
                systemId: null,
                systemName: 'j05he86jz0w5k6ervan2',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 18:20:15',
                monitoringEndAt: '2020-07-24 07:36:52',
                executedAt: '2020-07-24 09:25:28',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'uccmoyeukwz2pjblifuqbi1i308takyuln4ntc8npi3cgy9j8r',
                
                systemName: '5cwhv9j6j99njcsuzvde',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-24 04:45:40',
                monitoringEndAt: '2020-07-24 09:17:50',
                executedAt: '2020-07-24 09:51:28',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'zpw0kg3yzw2b32hq7burbfwfpudxje6mhxkzhdp40vmspixcym',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: null,
                type: 'DETAIL',
                monitoringStartAt: '2020-07-24 11:18:01',
                monitoringEndAt: '2020-07-24 11:10:07',
                executedAt: '2020-07-24 03:52:28',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'iv8lg2pvsxwa0uzwg915gt0v0gidb0fm8vnd4q6d0fr1ahda2k',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                
                type: 'DETAIL',
                monitoringStartAt: '2020-07-24 06:37:19',
                monitoringEndAt: '2020-07-24 03:33:32',
                executedAt: '2020-07-23 19:27:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'oboznsa8b854hrum6e3fitrftkv5kg5j0lxcg6an14dckrtob3',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'awj0qdsqy5bel8fehpnf',
                type: null,
                monitoringStartAt: '2020-07-24 03:41:50',
                monitoringEndAt: '2020-07-24 14:50:00',
                executedAt: '2020-07-24 10:26:51',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'wh5twwa69sf5wx51ws9pr3k6bs3ylie1wuueooaiwjjdsnxty3',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'qc04b6ffab2fdai9gpjf',
                
                monitoringStartAt: '2020-07-24 15:25:36',
                monitoringEndAt: '2020-07-24 11:32:59',
                executedAt: '2020-07-24 03:12:52',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: '5f4fkwehzmrvafurfh6msr0uhs9vrf4h8j8as121fx77n7x72y',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: '98ari0hfwgbnf57jk4y1',
                type: 'SUMMARY',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-23 20:43:23',
                executedAt: '2020-07-24 04:25:03',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'mlc13hog94m5fwoy9hq7th9e4ovuguz42eyhq89aufxqgd0o92',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'bfs10xjlqvx9023phwki',
                type: 'DETAIL',
                
                monitoringEndAt: '2020-07-24 12:30:33',
                executedAt: '2020-07-24 05:38:35',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: '4o4gm2hc4k3dox8rzs239819cpa09vvw86zz7yq5qp33plr4mi',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: '8zxs2b0v2y5mg20c668f',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 22:18:27',
                monitoringEndAt: null,
                executedAt: '2020-07-24 07:49:38',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'f7rc4e9r56tt83zg3ki1l8kuomog2r82d550dmmhxnr3659flf',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'z9ogyxj6ym3x4lebpwer',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 18:01:13',
                
                executedAt: '2020-07-24 06:20:04',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'fmbcn96ueg449vuszo5h6kjzkqrq72ib16wcp4qm0snrna32l6',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: '34az871loi8gb34gx99r',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-24 02:01:49',
                monitoringEndAt: '2020-07-24 02:08:08',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'cio6825ykr9zxtwhxj9l4d1jw6kxjhvb80cmdcn52edpokvi8k',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'm3r6j0wnmstxd401v6zx',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 19:58:44',
                monitoringEndAt: '2020-07-23 23:32:22',
                
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
                id: 't8bjich3xm0ew88dsogxsznbkdibwuiplu0fb',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'jdsh0oqkujhemr7n253pg5iolfjiplzwzgxyhbrtjx2gezhi8z',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'mllw38uz9asobn1sz0qv',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-23 21:29:37',
                monitoringEndAt: '2020-07-24 11:54:07',
                executedAt: '2020-07-24 13:15:59',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'j4uadxsoqh3cwhcrkogyvnh162xefyxqbc21v',
                tenantCode: 'y0boh9f0egnujfvy9ev3jeib4kj3key8nz62osq15udqfiej89',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'c6qxiuhz3b4onb2yhnps',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-24 13:08:43',
                monitoringEndAt: '2020-07-24 08:45:17',
                executedAt: '2020-07-24 09:04:47',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'dpfcwawy3z83hr60dgdyxs7uc5oejzzl4vtmsqoiqjl7m54xq6',
                systemId: 'pr38ucsz4fn9vivv44brl96l9k1gqf8m06g9d',
                systemName: 'snamvabdg5tjyshfpguk',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-24 11:12:55',
                monitoringEndAt: '2020-07-23 21:29:10',
                executedAt: '2020-07-24 08:46:04',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'bxvxll40f3ln9yjccbpc5kgiyguv4tn8208668ausswiowekl4s',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'i0zrps432i7byb8wttev',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-24 17:03:03',
                monitoringEndAt: '2020-07-24 13:24:43',
                executedAt: '2020-07-23 20:52:33',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'ugnf9blpszsbudywfgqggzfo1h8fpsvqztairbwj07aeovbudc',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'd465ax4spwkhyk96wlavc',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-24 17:22:28',
                monitoringEndAt: '2020-07-24 04:46:03',
                executedAt: '2020-07-24 16:25:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExecutionSystemName is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    

    

    
    test(`/REST:POST bplus-it-sappi/execution - Got 400 Conflict, ExecutionType has to be a enum option of SUMMARY, DETAIL`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'o1kjjnky8eu4x45s18og7031wbotrmrbc63r6ntfthkcauhm94',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'j8zqbre2eghay1mfp6k4',
                type: 'XXXX',
                monitoringStartAt: '2020-07-24 06:57:41',
                monitoringEndAt: '2020-07-24 00:13:48',
                executedAt: '2020-07-24 06:09:33',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 't2p4huht7g28yh39cpimr9tbosgkg7vz6e4epk0nggsy0awytw',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'm4qqmg5edvul3bj137yz',
                type: 'DETAIL',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-23 22:29:11',
                executedAt: '2020-07-24 10:16:03',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'qxtkdcfg6z5wztuvuzvaldey93mys1qermq5cpus7zp8o4m7j9',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'gv1b5upwu759mvxwmon9',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-24 02:04:13',
                monitoringEndAt: 'XXXXXXXX',
                executedAt: '2020-07-23 17:55:59',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'mhfu11cbgnq9kk800edcxd44rf0hzrtk11nuhfirz44ua62bar',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: '9pgux46i9vsly8hiuyzp',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-23 23:06:05',
                monitoringEndAt: '2020-07-24 13:31:03',
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
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: '1p6iw5ecit7bf159kv62z792ahgghwddlr2sl4jyugpyiidpiw',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: 'uy08glaoc590s1s9o343',
                type: 'DETAIL',
                monitoringStartAt: '2020-07-24 08:33:07',
                monitoringEndAt: '2020-07-23 23:04:06',
                executedAt: '2020-07-24 06:28:50',
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
                        value   : 'd3046332-f5fd-4442-93de-348bbedcc904'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd3046332-f5fd-4442-93de-348bbedcc904'));
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
            .get('/bplus-it-sappi/execution/d3046332-f5fd-4442-93de-348bbedcc904')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd3046332-f5fd-4442-93de-348bbedcc904'));
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
                
                id: 'fe9f8fc7-0169-4b5f-b24a-9ba45c7f01e2',
                tenantId: 'f6e2d002-572e-4bcd-bc5b-f479554e0396',
                tenantCode: 'gnm0gl2jtxgfqbfpuzadru4p2z8bbliovgt7qiamp1ngsnm9zr',
                systemId: 'ecac3d8f-7bfb-4921-93a4-1b3af22337db',
                systemName: 'gneiowvdnes00dhmv9yf',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-24 15:37:50',
                monitoringEndAt: '2020-07-24 13:22:52',
                executedAt: '2020-07-24 17:26:59',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                tenantCode: 'rqg26znxle26sy8gwu5jccy1c4z3mxn4csag6sktd7zpyq9m2h',
                systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                systemName: '1yssjy3b78v7bp6hxiym',
                type: 'SUMMARY',
                monitoringStartAt: '2020-07-24 14:29:12',
                monitoringEndAt: '2020-07-24 06:52:19',
                executedAt: '2020-07-24 11:08:04',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd3046332-f5fd-4442-93de-348bbedcc904'));
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
            .delete('/bplus-it-sappi/execution/d3046332-f5fd-4442-93de-348bbedcc904')
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
                            tenantCode
                            systemId
                            systemName
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
                        id: '4f4043d2-3fa7-4fa9-b57b-e3abd753690f',
                        tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                        tenantCode: 'hkhzik9njjamsw8npw63nvklbkteowf6mcl4hj12wlpqtudniv',
                        systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                        systemName: '1sc6tmacizg3vhra9v0p',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-07-24 10:24:30',
                        monitoringEndAt: '2020-07-24 03:18:36',
                        executedAt: '2020-07-23 19:07:44',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', '4f4043d2-3fa7-4fa9-b57b-e3abd753690f');
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
                            tenantCode
                            systemId
                            systemName
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
                            value   : 'd3046332-f5fd-4442-93de-348bbedcc904'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('d3046332-f5fd-4442-93de-348bbedcc904');
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
                            tenantCode
                            systemId
                            systemName
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
                    id: 'd3046332-f5fd-4442-93de-348bbedcc904'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('d3046332-f5fd-4442-93de-348bbedcc904');
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
                            tenantCode
                            systemId
                            systemName
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
                        
                        id: '56ca8fec-43d3-473f-bc42-021bb3707cba',
                        tenantId: '42920d01-6946-45bb-ba64-7cf647aa5d8d',
                        tenantCode: '8ewusvux0za4i34phwnkaum12ywyrio75i5b5n05euntzhb3u6',
                        systemId: 'e10ea982-8861-4831-8c33-af8fe0fd460b',
                        systemName: 'x8djngfz0t4iw13r7hgw',
                        type: 'DETAIL',
                        monitoringStartAt: '2020-07-24 15:14:28',
                        monitoringEndAt: '2020-07-24 02:28:35',
                        executedAt: '2020-07-24 11:15:29',
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
                        
                        id: 'd3046332-f5fd-4442-93de-348bbedcc904',
                        tenantId: 'b66505b5-5a81-4dcb-a4cc-5a3496cddad2',
                        tenantCode: '0a3gjoo2uh3r45nzjw3wgsbd1mrws1h31kfizx1p5qzgnwbvxx',
                        systemId: '9ec2e907-81f8-4274-b4df-9981263b6aa0',
                        systemName: 'yefja81tnkmav3qy66kh',
                        type: 'SUMMARY',
                        monitoringStartAt: '2020-07-24 04:50:28',
                        monitoringEndAt: '2020-07-24 09:39:03',
                        executedAt: '2020-07-24 12:55:23',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('d3046332-f5fd-4442-93de-348bbedcc904');
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
                            tenantCode
                            systemId
                            systemName
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
                    id: 'd3046332-f5fd-4442-93de-348bbedcc904'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('d3046332-f5fd-4442-93de-348bbedcc904');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});