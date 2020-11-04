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
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'rrfoackw1gbgcaemfl5fcqaebsr9pleonpu4fnxoxg7k3i7xqh',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: '9ee3aupa5ar22ynilvxg',
                version: 'c3dvaw5n1enrmq3q54d8',
                type: 'SUMMARY',
                executedAt: '2020-11-04 05:26:24',
                monitoringStartAt: '2020-11-03 20:01:28',
                monitoringEndAt: '2020-11-04 00:42:59',
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
                
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'ymfiqtpjxojbnjga4754s6hg0l7dao4eq5kffq1u7xuoaboesj',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'nv9pqg57xiyn8dgmnoyx',
                version: 'sfyl5y0q8twdpemvs38j',
                type: 'SUMMARY',
                executedAt: '2020-11-04 14:22:09',
                monitoringStartAt: '2020-11-03 23:23:44',
                monitoringEndAt: '2020-11-04 15:18:54',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: null,
                tenantCode: 'qpxjn5gm9qjytse7hbck9askefnwirfbn4flhtxncc10mq4c1j',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'm872uwc2hjj4zs76oed3',
                version: 'hf9duy058aff36e0mjwh',
                type: 'SUMMARY',
                executedAt: '2020-11-04 08:35:54',
                monitoringStartAt: '2020-11-03 20:01:31',
                monitoringEndAt: '2020-11-04 01:04:13',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                
                tenantCode: 'b7jzmee3f2lryvbbw7jv6wjo1zge8odzuq0sby9cucsfx19qje',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'fiajwpim6nyk8e3httn2',
                version: 'dphmk7jtqnpbfk32ob7n',
                type: 'DETAIL',
                executedAt: '2020-11-03 17:04:29',
                monitoringStartAt: '2020-11-03 19:04:36',
                monitoringEndAt: '2020-11-03 19:06:46',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: null,
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'zjeawth8vzn5jdeqpfip',
                version: '470sniw34ih1caczc00s',
                type: 'SUMMARY',
                executedAt: '2020-11-04 04:21:05',
                monitoringStartAt: '2020-11-04 14:11:25',
                monitoringEndAt: '2020-11-03 17:55:12',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: '1gcill4rxhe821nmanw0',
                version: '5478fys5iib4sj1nk396',
                type: 'SUMMARY',
                executedAt: '2020-11-04 13:54:35',
                monitoringStartAt: '2020-11-04 15:57:03',
                monitoringEndAt: '2020-11-04 08:14:23',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: '53fd9qo1nuug7158e4g7n2fqzewjblk7oa2wf38whn6f5kjak3',
                systemId: null,
                systemName: 'hwoexgr5s3j3e0uuatjs',
                version: 'zmv2zlg1xtll4jfe3249',
                type: 'DETAIL',
                executedAt: '2020-11-04 14:11:37',
                monitoringStartAt: '2020-11-04 11:23:03',
                monitoringEndAt: '2020-11-04 03:51:53',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'mjfcayatrr0r1wiwhg4l2tg17ybrd2eevknvutwwd4o67tosxd',
                
                systemName: 'qf26xgh5ukbrjnhxn0kx',
                version: '3sysmkwgj4asat7lux3d',
                type: 'DETAIL',
                executedAt: '2020-11-04 14:36:08',
                monitoringStartAt: '2020-11-03 21:09:24',
                monitoringEndAt: '2020-11-04 06:18:44',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: '72lloyhvmhgedprwfbeycx3vxs1st5gxnfhdoihmmimea9x3jc',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: null,
                version: 'co42ektotsaa6hd7lf5p',
                type: 'DETAIL',
                executedAt: '2020-11-04 07:08:12',
                monitoringStartAt: '2020-11-04 06:57:33',
                monitoringEndAt: '2020-11-04 02:51:08',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'xm0sts6e3ci10djnjj9cad7f802ko08hbbxs11pqqc1gcyqba1',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                
                version: 'par3txgjhsfisfftg4e4',
                type: 'SUMMARY',
                executedAt: '2020-11-04 11:44:40',
                monitoringStartAt: '2020-11-04 15:51:59',
                monitoringEndAt: '2020-11-03 20:13:19',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'zyd17bc7flknx4gz2y1duyt5w3kmypsy7sjdt4kcuukepn6xr7',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'w6z60v4y0jjlg77twpa7',
                version: null,
                type: 'DETAIL',
                executedAt: '2020-11-04 16:12:11',
                monitoringStartAt: '2020-11-04 09:04:13',
                monitoringEndAt: '2020-11-04 12:14:18',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: '8m80u7v0h0b2u78bk01nlxvt9ipdc421258bugc2us2ey2qf5j',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'zgw1gkiv6aktxa4vyg5e',
                
                type: 'DETAIL',
                executedAt: '2020-11-04 13:10:55',
                monitoringStartAt: '2020-11-03 20:11:21',
                monitoringEndAt: '2020-11-03 19:43:47',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: '99snlyusd483plccgd61a6d427nfjbxzfu1zj78qffqbgod0i0',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'h8r4cu8fu789ramyd1zn',
                version: 'fvn9tfldwei6mm952q8y',
                type: null,
                executedAt: '2020-11-04 14:26:12',
                monitoringStartAt: '2020-11-03 22:52:06',
                monitoringEndAt: '2020-11-03 23:12:07',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'fmheuee9y6gwfo4hniyoyvo8at8xs5ow4g17heej9eb3ehusu0',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'o46192re802iyxd7hcl5',
                version: 'tgozbrebahwijlteim6q',
                
                executedAt: '2020-11-04 04:12:50',
                monitoringStartAt: '2020-11-04 03:12:18',
                monitoringEndAt: '2020-11-04 09:26:47',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'naef8gwlqf79cu2psy8hvrib5ivcdhqga1o2mef0x8rflqvbfb',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'x91a115n7uus458lxab6',
                version: 'fe570xrsvyj3n6o8eieg',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-11-04 06:36:54',
                monitoringEndAt: '2020-11-04 14:28:58',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'atgj7yedj85cun7y7wxnuvtx03d196cinds4fjyym4k6y940rb',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'joha4ae47yiyk4wc27er',
                version: 'h8h47zy4yfuksvyuq8u5',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-11-04 04:21:23',
                monitoringEndAt: '2020-11-03 23:38:05',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: '5ycyw8yzn4j3trji0gy70g0b1ajyqd9zj2yocc29dacv9v2u8r',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'o2ksvbajt935h7gksxk8',
                version: '0ko5a55bkynkecdpkld7',
                type: 'SUMMARY',
                executedAt: '2020-11-04 11:32:00',
                monitoringStartAt: null,
                monitoringEndAt: '2020-11-04 07:45:42',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: '45k0g1fjc5mpdy4lyjtn5ml0uyykmz5n78adr1p6mhm7nzh5he',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'yrjhoahysaop7pdzaw3n',
                version: '8admpa0m7o9xjvadmtuy',
                type: 'DETAIL',
                executedAt: '2020-11-04 10:34:59',
                
                monitoringEndAt: '2020-11-04 12:10:52',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: '0k6sqq7t2uchzhxpwlvpte4f2ecg735r7c5lzkr6pcj9h6mmee',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'g1w8uig1bfr2lxkirdut',
                version: '71fpfev83i24vo2boa9f',
                type: 'SUMMARY',
                executedAt: '2020-11-04 15:08:47',
                monitoringStartAt: '2020-11-04 04:43:00',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: '17wmu0hzpodvf1ftd348z4149b8pt9xiyjk4t1stwyaggpw3yw',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'v3u2cjwfuk0ts6pfq60v',
                version: '56wyq6xr7eq2zolnyw0i',
                type: 'SUMMARY',
                executedAt: '2020-11-04 12:35:55',
                monitoringStartAt: '2020-11-04 10:48:42',
                
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
                id: '9nqmhju6ev9gmhwuxsci0jivxufmk5jr9wbtl',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'ebd850r8c2xe4hr584dfw4yxgyhpl9it4rpf6bavld0az44jnj',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 't3qapd3xzq563fciuiy7',
                version: 'daw0oujvnpd8flid5vu4',
                type: 'DETAIL',
                executedAt: '2020-11-04 06:48:19',
                monitoringStartAt: '2020-11-03 18:34:12',
                monitoringEndAt: '2020-11-04 08:28:25',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: 'vwylakyo49ltu48wp7020ly0mjlryo40o19pw',
                tenantCode: 'ihr5u8ugxtmfug2tqzn7rkdiorsbzjptw1rxek2kn3fo62ivgp',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: '30qi6qa9p54e80p9u803',
                version: 'metqjfpqif2eaeaz2s99',
                type: 'DETAIL',
                executedAt: '2020-11-04 04:20:52',
                monitoringStartAt: '2020-11-04 11:07:00',
                monitoringEndAt: '2020-11-04 15:33:54',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'bsxw8h9mtopodmq9qmef15duztjnvr7ufoqcgr0b1itlruot2y',
                systemId: 'css1vx90t8262m97ty97y7c6pi7kwqdc8xh64',
                systemName: 'gyr8d8jf1y7jfbo7379o',
                version: '5ggcfrqrmjmgbvjnz2su',
                type: 'SUMMARY',
                executedAt: '2020-11-04 14:43:42',
                monitoringStartAt: '2020-11-03 18:41:00',
                monitoringEndAt: '2020-11-04 14:00:11',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'eah5xcmio9hvcbbuy97qbtw8t1ycbnb2d1hl7ak5lmc035zkyju',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: '5cuc6owd8ezv8pkwpcc1',
                version: '5uzbjwd37wdvlk8g3yaz',
                type: 'SUMMARY',
                executedAt: '2020-11-03 20:18:44',
                monitoringStartAt: '2020-11-04 01:06:55',
                monitoringEndAt: '2020-11-04 00:36:52',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: '26ih9236t1nakbny0q75on0sp4958byb5mhanm161mdcaiy9v8',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: '3nn9uuak4k8ue60w1ji92',
                version: 'dgi1gpsw1gzikn48lxu9',
                type: 'SUMMARY',
                executedAt: '2020-11-04 07:50:35',
                monitoringStartAt: '2020-11-04 11:32:35',
                monitoringEndAt: '2020-11-04 15:53:31',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'k81gzc01j5iyko6uxd20nqcexkxboyd7alt3qmuumy8q3zcvco',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'y4a6sn21wsg5n0sftgi6',
                version: 'b1kb7mjuuznzahrrecv0z',
                type: 'DETAIL',
                executedAt: '2020-11-03 17:39:44',
                monitoringStartAt: '2020-11-04 00:53:47',
                monitoringEndAt: '2020-11-04 12:04:05',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'zaqrixs4g0n0qvk622shyt7r8tp09e9qp1bvb368yy7skb69cl',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'mr0qcdtiacp6ufij0mlb',
                version: 'r1sr60qx2cpd1f4jwzh9',
                type: 'XXXX',
                executedAt: '2020-11-03 18:34:27',
                monitoringStartAt: '2020-11-04 13:45:12',
                monitoringEndAt: '2020-11-04 15:38:49',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'trqbdrf1kysxs6kg1iwwqeki491herd6gwwy96z9ixczfa2a7q',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'y0nv6bazwsocs1jdk7ff',
                version: 'n4tfei2lkaequea68ka9',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-11-03 18:35:21',
                monitoringEndAt: '2020-11-04 02:25:40',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'p3ss0f4461nrb7205ojbn8ggovubgbskhl8lu4n413mxfsq0jr',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'uyteij7ng0gcmhxtzm5j',
                version: 'aowobt477h1aeaeogu62',
                type: 'SUMMARY',
                executedAt: '2020-11-04 07:39:58',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-11-04 12:35:51',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'k7a77xpyt79sknzjwyq3izqefitcwz38ou536ddh1wxzjcfpkv',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'archz18db5k3at11n4jm',
                version: 'sulfguazucvryi7ps50y',
                type: 'SUMMARY',
                executedAt: '2020-11-03 21:39:15',
                monitoringStartAt: '2020-11-03 20:15:26',
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
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: 'z5qy059n8kh30p5z2tz4ou832v0hxy4vwadhnoe47cevp1dfzo',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: '0wzrp90nsyqtuhq6jvgd',
                version: 'qz8awdekjo76auze99an',
                type: 'DETAIL',
                executedAt: '2020-11-04 12:05:21',
                monitoringStartAt: '2020-11-04 15:04:54',
                monitoringEndAt: '2020-11-04 03:44:43',
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
                        id: '0b2c2dfc-d86f-49e8-8a28-ae6c2bcf92d1'
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
                        id: '6edb28e6-40f5-480a-b186-2b63a7216a0d'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6edb28e6-40f5-480a-b186-2b63a7216a0d'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/35fae602-b034-43e0-afad-3c8a4ff30fe1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/6edb28e6-40f5-480a-b186-2b63a7216a0d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6edb28e6-40f5-480a-b186-2b63a7216a0d'));
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
                
                id: '55046385-cf00-4be0-953a-60293a453ded',
                tenantId: '024c6b1c-8a8b-40b2-9693-306e97e74fd1',
                tenantCode: '0e6s3fawhdu3legfzxx2b4l74u6k82xtmv93v4vomdm5iz0qf7',
                systemId: 'fbf2ba74-737c-49f0-b581-bbf57f7d9263',
                systemName: '46ikj2m3mnjohtiyih1x',
                version: '2a3klku0gp9tcfxxa68c',
                type: 'DETAIL',
                executedAt: '2020-11-03 19:57:25',
                monitoringStartAt: '2020-11-04 15:23:47',
                monitoringEndAt: '2020-11-04 13:41:00',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                tenantCode: '601l09qba7h8w9uel1zc53zy544u9ptsx7w1kcq1w0si0cg5tr',
                systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                systemName: 'chxm1ncidb6gfcc42p3p',
                version: 'e5wmry1a5mch8vod1bjo',
                type: 'SUMMARY',
                executedAt: '2020-11-04 04:36:40',
                monitoringStartAt: '2020-11-04 04:52:38',
                monitoringEndAt: '2020-11-04 09:11:40',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6edb28e6-40f5-480a-b186-2b63a7216a0d'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/03e7525e-8e77-478e-8a7a-2c464803dcd1')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/6edb28e6-40f5-480a-b186-2b63a7216a0d')
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
                        id: '612bc9f8-a918-4b67-a7df-a836532bc9f9',
                        tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                        tenantCode: 'pspizfhcxfyw86hcyholtny5dt5qkefxtnrzq8xlaanjuisqnj',
                        systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                        systemName: '49qsc3p4u6xf7i639adr',
                        version: '3s72mngx3yjgk7n6ygpf',
                        type: 'SUMMARY',
                        executedAt: '2020-11-03 22:59:44',
                        monitoringStartAt: '2020-11-04 14:38:49',
                        monitoringEndAt: '2020-11-03 19:41:19',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', '612bc9f8-a918-4b67-a7df-a836532bc9f9');
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
                            id: '6f2a8a9a-adf1-477d-b365-6c14c68a0043'
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
                            id: '6edb28e6-40f5-480a-b186-2b63a7216a0d'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('6edb28e6-40f5-480a-b186-2b63a7216a0d');
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
                    id: '0785d47a-3be0-493b-8433-69249828d5e9'
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
                    id: '6edb28e6-40f5-480a-b186-2b63a7216a0d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('6edb28e6-40f5-480a-b186-2b63a7216a0d');
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
                        
                        id: 'ea70790c-0135-45c6-8534-114f27cee69d',
                        tenantId: 'df38afe9-7f3c-4712-a083-bdcc57c6849a',
                        tenantCode: 'oh1cerjf2d4u9jqsl4zlmuce9mh4t7zjwrjf12kbaqzv225qd8',
                        systemId: '9a636c36-9f13-4d12-87e6-5f1c7e7e6d76',
                        systemName: 'qqonh354zippeubpwpgo',
                        version: 'orgshnkktj9syjfapfqj',
                        type: 'DETAIL',
                        executedAt: '2020-11-03 17:05:18',
                        monitoringStartAt: '2020-11-04 00:15:58',
                        monitoringEndAt: '2020-11-04 15:13:31',
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
                        
                        id: '6edb28e6-40f5-480a-b186-2b63a7216a0d',
                        tenantId: '0dce0b70-cd81-401c-be69-22366a7f9300',
                        tenantCode: 'vd4z91zxxgwaun4bbn26ze7g6xpm84som9vgt5yte0yup9rzuk',
                        systemId: '4287d5ed-68fb-4a7a-90ad-fc1c1e823b5e',
                        systemName: 'by9chny6u7mjumwsy01w',
                        version: 'mf179cyoox6sdzuc4l1d',
                        type: 'SUMMARY',
                        executedAt: '2020-11-04 15:21:00',
                        monitoringStartAt: '2020-11-04 10:15:20',
                        monitoringEndAt: '2020-11-03 18:04:51',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('6edb28e6-40f5-480a-b186-2b63a7216a0d');
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
                    id: '530c6297-ca39-4ea8-92f0-a9ad602b0d42'
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
                    id: '6edb28e6-40f5-480a-b186-2b63a7216a0d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('6edb28e6-40f5-480a-b186-2b63a7216a0d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});