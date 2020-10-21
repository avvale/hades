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
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'sujlhagcx2qqiibfn4h7rbofa9rmqj9yek7uy6m85ca6ha51pr',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'ljx244aa6w0927iw23dd',
                version: '4b75p0w3sxq0ddrddv6x',
                type: 'SUMMARY',
                executedAt: '2020-10-21 04:29:33',
                monitoringStartAt: '2020-10-20 22:14:10',
                monitoringEndAt: '2020-10-21 02:38:59',
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
                
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'qxdkhg00epq9p278knf3qdfwbme5vmwm77fdn59863f2p8828t',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'o9sa59f5jlx1qb1qrrnr',
                version: 'fauz6vfcnkpv8pz56fj8',
                type: 'DETAIL',
                executedAt: '2020-10-20 22:09:58',
                monitoringStartAt: '2020-10-21 08:36:56',
                monitoringEndAt: '2020-10-20 20:02:02',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: null,
                tenantCode: '7trhg7a0gmtsr1h3eg3z20nqzimoz0ozsyixsnlkj87k0b1tep',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: '88cpbwxwelbkpuipyxtz',
                version: '8zzwhvi0s769o6i4omqo',
                type: 'SUMMARY',
                executedAt: '2020-10-21 10:09:39',
                monitoringStartAt: '2020-10-20 11:33:29',
                monitoringEndAt: '2020-10-21 07:40:09',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                
                tenantCode: 'yd3jkc5t92m9akxx9rtdhdnvdh1pzm3jq9y9nn2ksslnprrgd8',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: '9dw9d8b0mbiw44w2t9ff',
                version: 'a1jbc8op2qs4snviurgq',
                type: 'SUMMARY',
                executedAt: '2020-10-21 01:55:27',
                monitoringStartAt: '2020-10-20 12:37:11',
                monitoringEndAt: '2020-10-21 05:44:59',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: null,
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'pehwrat7hipa4ogvq8b3',
                version: 'y71zuub3rrldkoehebzp',
                type: 'SUMMARY',
                executedAt: '2020-10-21 03:06:07',
                monitoringStartAt: '2020-10-21 00:18:21',
                monitoringEndAt: '2020-10-21 02:54:57',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'v2sgwkf9ac10fyj4rouw',
                version: '4qvs9kbwce9bq3xi1rzv',
                type: 'SUMMARY',
                executedAt: '2020-10-20 20:52:53',
                monitoringStartAt: '2020-10-21 05:15:26',
                monitoringEndAt: '2020-10-21 05:20:27',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: '93x4bmc61rau59owlmhaw4wu7kbf4r5z3914xtdov8qsc3om7l',
                systemId: null,
                systemName: 'h0qrb68hfsvkcj4gwn60',
                version: 'dkjjhlt9o2se0q6xq7wq',
                type: 'DETAIL',
                executedAt: '2020-10-20 15:06:32',
                monitoringStartAt: '2020-10-20 23:17:37',
                monitoringEndAt: '2020-10-21 07:13:42',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'uzl0y1y4ktuxghde2x8bncdl6yua1qrw2izrx676blokomt0ux',
                
                systemName: '108950pn4x1n4g996lru',
                version: '3f83432stq9ff2nn7a1x',
                type: 'SUMMARY',
                executedAt: '2020-10-20 12:53:21',
                monitoringStartAt: '2020-10-21 10:25:27',
                monitoringEndAt: '2020-10-21 06:40:58',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'havvjmg5zqxc3rted8dqka95jdxziywo5vgj7ylbqahcsp0r90',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: null,
                version: '9b9qzv8m2je45pfdlfix',
                type: 'DETAIL',
                executedAt: '2020-10-21 05:16:36',
                monitoringStartAt: '2020-10-20 20:00:07',
                monitoringEndAt: '2020-10-20 11:53:09',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'gukpr4mqd7r1iqovyes9nmyt3uguue2ig31gbdi16pzlv3wmk9',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                
                version: '56jy38uyixpvf8r9fd1x',
                type: 'DETAIL',
                executedAt: '2020-10-21 07:41:35',
                monitoringStartAt: '2020-10-21 09:53:48',
                monitoringEndAt: '2020-10-20 13:44:09',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'tw5c8fbyv3skspu6jtbitevkkro94uexlye5i7qnfo3c2fn9ak',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'k26d0sahah8uaxkgw6fm',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-10-20 12:42:09',
                monitoringStartAt: '2020-10-21 00:39:30',
                monitoringEndAt: '2020-10-21 10:56:15',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'uo8myui6z2jurqqwlky9kswqocw4yhhtqyzf5p0xcxr83npal2',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'a7acwas3xuqzlazaidvu',
                
                type: 'SUMMARY',
                executedAt: '2020-10-20 20:36:46',
                monitoringStartAt: '2020-10-20 16:24:46',
                monitoringEndAt: '2020-10-20 13:42:29',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'ytsshgastaf4c0iogx5l0tqr891hci0qdt4z5e37w0uxandwc0',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: '6xapkd60cy4q9j1dsn3i',
                version: 'n0591fjyfllsjj56uff6',
                type: null,
                executedAt: '2020-10-20 15:22:29',
                monitoringStartAt: '2020-10-21 05:59:47',
                monitoringEndAt: '2020-10-20 20:18:18',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: '9eskjej93brtc652xdn2xcqkum60bconpuoymrrc993jqkxmfr',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'ied4dqo73cm7rebbbvjz',
                version: 'tav0tdx4mfpy01mjte5o',
                
                executedAt: '2020-10-21 01:25:00',
                monitoringStartAt: '2020-10-20 12:13:31',
                monitoringEndAt: '2020-10-21 02:49:35',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: '04v3quls5t28yttb5yx5frn0j6ncmhf2fti1j0kxzyk0bjqg6s',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'sd3wzv3xlff0imsk05uv',
                version: '04242uwu3wxxlgb0na4y',
                type: 'DETAIL',
                executedAt: null,
                monitoringStartAt: '2020-10-20 13:38:49',
                monitoringEndAt: '2020-10-21 04:31:20',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'vmj765yx6xps14617r2jcz7xvrfb85ddptdaoqecto8fvqk226',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'jirfut46svpmqt8j0uaq',
                version: '419k2h01jw1gb9i0ea99',
                type: 'SUMMARY',
                
                monitoringStartAt: '2020-10-20 21:30:45',
                monitoringEndAt: '2020-10-21 00:40:01',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'n77yw7qulifw6k21rc90v44chqr6go96s8gf0abcw7ki4uze45',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 't0lb2t8qs5oxkabpr3f9',
                version: 'x3na69heg16rkmjzu03r',
                type: 'SUMMARY',
                executedAt: '2020-10-20 13:10:55',
                monitoringStartAt: null,
                monitoringEndAt: '2020-10-20 14:57:03',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: '5xn1nrymdzuu4g5jgef65nsi8cxtftdgry8a52tt6u3z776z7l',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'xbjlc2jumt57033ypywy',
                version: 'o3zk3ik6677phjhylltj',
                type: 'DETAIL',
                executedAt: '2020-10-21 03:45:41',
                
                monitoringEndAt: '2020-10-21 05:42:19',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'ihhh6n94fs8b4q5irynx9vln1uyuaecmk0ewttgqxia4mfnkng',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'bs26aeblccr5gahaftuy',
                version: 'pgeaz576fdhj1vl6t3xq',
                type: 'SUMMARY',
                executedAt: '2020-10-20 19:41:02',
                monitoringStartAt: '2020-10-20 16:01:43',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'u2i8by81hkm530yj3a059t8yy8efa7xhu7q6bwd81iqekg4tlw',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'wwj3jlucaqif37kj1565',
                version: 'e9sb66ihmf0v8yocz1i2',
                type: 'DETAIL',
                executedAt: '2020-10-20 22:59:52',
                monitoringStartAt: '2020-10-20 17:15:25',
                
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
                id: 'f2vqklgseyk7u2uos66z5uoyed36mlnyrwsro',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: '070kvbrzac7arz5p1xnc3qkozk537rbv89wab3aof2jcg8reei',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'tkk96zxom4cba2fh9o81',
                version: '3hfkt2e0lwzmcdtw606e',
                type: 'DETAIL',
                executedAt: '2020-10-20 15:11:24',
                monitoringStartAt: '2020-10-20 22:16:32',
                monitoringEndAt: '2020-10-21 03:45:57',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'v3lbwt2ehco5oz7h37mkamlpss8czvmih15db',
                tenantCode: '8ez4040kfom4oyvi2slquzxqwdqf7dmdy9ih6xm46k8cvzsihf',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'ls0rzhaczk5z1dvsz1np',
                version: '5gd841a4l599n2zmchpq',
                type: 'SUMMARY',
                executedAt: '2020-10-21 11:06:27',
                monitoringStartAt: '2020-10-21 03:29:45',
                monitoringEndAt: '2020-10-20 14:18:39',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'rdgnddstzjk6euku5zcubul1eu6pc7u71pytas010ipwklhy68',
                systemId: 'pmlzyrbrktu4ilf5grrhe23ow786swv7879c1',
                systemName: 'xjhfu85m27kwj965i0di',
                version: '2cih16xr8f4r6fsg83u8',
                type: 'SUMMARY',
                executedAt: '2020-10-20 13:56:48',
                monitoringStartAt: '2020-10-20 23:52:33',
                monitoringEndAt: '2020-10-20 21:27:39',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'mtyef0e5ghjx48l4t4z9n3wgslatrirho7on1qs46kvsjhuu7z6',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'v6tb722t5dx6jqsb0qja',
                version: 'p24c6oukix1mh4g5g06s',
                type: 'SUMMARY',
                executedAt: '2020-10-20 19:11:52',
                monitoringStartAt: '2020-10-20 16:41:07',
                monitoringEndAt: '2020-10-20 19:23:41',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: '911v000kh7q1dqbna3wn8zbvsq8nlvdr60kaw11nv1ga06e894',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: '4q8kbamn62seo3uy3w631',
                version: 'b6rjdtrzuc90tqhonenu',
                type: 'DETAIL',
                executedAt: '2020-10-21 07:02:12',
                monitoringStartAt: '2020-10-21 07:46:32',
                monitoringEndAt: '2020-10-20 21:28:16',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'otdyfhml25kaueeqbocrjuwrbvms92n4eirrjna9u1msgwxlwc',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'jj84p1z7w9wwqgpwtyhc',
                version: 'hk6hf6auqbuuy2zpdlqm0',
                type: 'DETAIL',
                executedAt: '2020-10-20 22:12:32',
                monitoringStartAt: '2020-10-20 15:05:07',
                monitoringEndAt: '2020-10-20 19:42:26',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'rff936f5w3a8jyzlfox5m71d0vkh8vyeky11jbwdk3fdbnwrpi',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'or10693vymn4s0yym0ht',
                version: 'zuxjteoa9s4kl7x4uzjf',
                type: 'XXXX',
                executedAt: '2020-10-21 10:06:20',
                monitoringStartAt: '2020-10-20 13:19:23',
                monitoringEndAt: '2020-10-21 06:48:22',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'uealtxkasxh3iaxjz77j0qi0ofwrit5zgows1zz8mz0jm96eef',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'kucz0zoyh6ojer44svnv',
                version: 'nzn966v8l9gvv9polg24',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-10-20 14:09:39',
                monitoringEndAt: '2020-10-20 23:05:04',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'y2j12226brcaudotegu6vg9n31m6oftv35rmsoes2rd9462cjp',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 't0gnlgaqvwj5kh42krze',
                version: 'cxiv59qax115mfn7lsht',
                type: 'SUMMARY',
                executedAt: '2020-10-20 18:34:23',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-10-21 09:50:32',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: '6om30iv83hzs7ifz3lkzrcrrarpxz7uoawnho2jxvhb20desvu',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'z55h96ae5a1gftwgzv4j',
                version: 'biwpoqn2ilk6uoua1b05',
                type: 'SUMMARY',
                executedAt: '2020-10-20 12:51:26',
                monitoringStartAt: '2020-10-20 23:39:49',
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
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: '3fmhbnou3p2cklj3k00nch1can6gznsduwv6eofp10v7yusexo',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'v4ppbh3qyml9540ktx7w',
                version: 'z08jbguyrai757qvjff1',
                type: 'SUMMARY',
                executedAt: '2020-10-21 10:00:53',
                monitoringStartAt: '2020-10-21 02:29:37',
                monitoringEndAt: '2020-10-20 18:43:14',
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
                        id: '4e108da8-8235-48fa-a0dc-b2ad2d72c2b2'
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
                        id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2'));
    });

    test(`/REST:GET cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/f140f41e-272c-4aed-ad1a-0fbef22fa92d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/execution/ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2'));
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
                
                id: '84a9198b-0304-4c1b-aa6e-98b0716106b5',
                tenantId: 'ba92c690-3310-488f-b8ab-4a933dc2a806',
                tenantCode: '612hfukgpbgb49oj4x4k6k1uqeoi3260mby0isvrm10aq8z57o',
                systemId: 'b3c83497-3723-437d-9b43-8ef31e72d39d',
                systemName: '7bmm0x9kq07etotnoeqn',
                version: '3rh3m5pphe5w91lgn05v',
                type: 'DETAIL',
                executedAt: '2020-10-20 22:19:03',
                monitoringStartAt: '2020-10-20 17:19:08',
                monitoringEndAt: '2020-10-20 15:40:56',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                tenantCode: 'j16niy573l9j3pp5bgff3nhufsm4tzno00pryfmnfj0pn5jwnz',
                systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                systemName: 'hb00eo77iyyxojfhh62v',
                version: 'u6xzbi98yvf0crtfyfsx',
                type: 'DETAIL',
                executedAt: '2020-10-20 15:07:34',
                monitoringStartAt: '2020-10-20 18:24:39',
                monitoringEndAt: '2020-10-21 09:06:49',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2'));
    });

    test(`/REST:DELETE cci/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/adae93e1-9bcb-4723-9007-5657cbb14c9a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/execution/ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2')
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
                        id: 'cee43cc6-f32d-4077-a493-638c587c9870',
                        tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                        tenantCode: '5y41pqjro2j0hhufrqm1og9yf0fj6umrp7luwchn27t6t297kt',
                        systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                        systemName: 'bf44awnysw0j3wwqx67b',
                        version: 'bipjvbelof3nprj53kg5',
                        type: 'SUMMARY',
                        executedAt: '2020-10-20 18:35:20',
                        monitoringStartAt: '2020-10-20 12:53:04',
                        monitoringEndAt: '2020-10-21 02:52:21',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateExecution).toHaveProperty('id', 'cee43cc6-f32d-4077-a493-638c587c9870');
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
                            id: 'b6417f02-082a-4108-9c4a-5f335005b8b3'
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
                            id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecution.id).toStrictEqual('ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2');
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
                    id: 'faee7775-50e4-4a06-ae7a-904219bc7e77'
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
                    id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindExecutionById.id).toStrictEqual('ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2');
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
                        
                        id: '01497c59-3aa3-4b2e-8609-432ad6057f05',
                        tenantId: 'aa244704-b805-4316-9320-f7b1ee5dc46c',
                        tenantCode: '4lblwfktda5ay4lg8pnzdufu4flm4fhriaobi4pchpswp3jjs5',
                        systemId: '232b35ec-49e4-4445-8d7b-ddef18ffb61e',
                        systemName: 'fxd7tq6wpmu9gwu1kp6j',
                        version: '6ewrezg05oh0exnffj5g',
                        type: 'DETAIL',
                        executedAt: '2020-10-21 09:26:13',
                        monitoringStartAt: '2020-10-21 04:40:40',
                        monitoringEndAt: '2020-10-20 23:29:06',
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
                        
                        id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2',
                        tenantId: 'c8169b42-1a99-4275-a9bd-109fe3ccf477',
                        tenantCode: 'tkutredl3pn3ubmhg88q1087s2rvlh9q9z1i3qxbi786lxk9u1',
                        systemId: '1346476e-937e-40a7-852a-6ebb17bf68d3',
                        systemName: 'rkw6wlim8k4q76mkqyhg',
                        version: 'xygnkyv0rlis0accjv38',
                        type: 'SUMMARY',
                        executedAt: '2020-10-20 21:30:16',
                        monitoringStartAt: '2020-10-21 09:12:44',
                        monitoringEndAt: '2020-10-20 13:10:12',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateExecution.id).toStrictEqual('ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2');
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
                    id: '3bd8db54-655e-47b3-bbb4-afc97b9ee4f4'
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
                    id: 'ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteExecutionById.id).toStrictEqual('ef60f9eb-1f8a-452a-a7b6-fd4f0171b0a2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});