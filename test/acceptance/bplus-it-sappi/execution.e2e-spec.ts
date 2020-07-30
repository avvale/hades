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
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'z16236wol8i5a8uhmou9i7912e5n4wuxyfca372q94v2pkjzze',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: '2a6ekn952matf6a2aafu',
                version: 'tdpn0jbky4hj4wlo4dos',
                type: 'DETAIL',
                executedAt: '2020-07-29 04:21:02',
                monitoringStartAt: '2020-07-29 20:35:09',
                monitoringEndAt: '2020-07-29 17:04:57',
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
                
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: '71vx0kv7zk1h9fqfyv1kutnrip03t0h4bykvw18dbr96hs54i1',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'wc4y8g9hu56u1szpkxhq',
                version: 'thane77018iqjwrpwb2a',
                type: 'DETAIL',
                executedAt: '2020-07-29 05:23:42',
                monitoringStartAt: '2020-07-29 07:09:47',
                monitoringEndAt: '2020-07-29 15:19:27',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: null,
                tenantCode: '7mr1vusv6ldhbiv39vosuvi3ttjzj9qvwr4ax4de4492toqgkx',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'ek207vm90exx6eyl7cjq',
                version: 'o3erxqmhfpsz27hje5z4',
                type: 'DETAIL',
                executedAt: '2020-07-29 05:14:31',
                monitoringStartAt: '2020-07-29 18:53:11',
                monitoringEndAt: '2020-07-29 22:18:08',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                
                tenantCode: 'vu1zecnn2072mqo2m8gwn75dvf4bejncxaa7csqjh79t5rg2gh',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'owpyuio04tlqwx7vsavf',
                version: 'udmp0gb2wf34kkt8d6ih',
                type: 'DETAIL',
                executedAt: '2020-07-30 00:56:30',
                monitoringStartAt: '2020-07-29 17:49:04',
                monitoringEndAt: '2020-07-29 09:31:06',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: null,
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: '21ibo3n4p8w0k665wuao',
                version: '0c097d41u4ehnh04knkg',
                type: 'SUMMARY',
                executedAt: '2020-07-29 17:03:46',
                monitoringStartAt: '2020-07-29 21:56:47',
                monitoringEndAt: '2020-07-29 13:42:51',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'rp0dd8omvuv2flv76655',
                version: 'hsjbcv2ml0yu77kq3x6e',
                type: 'DETAIL',
                executedAt: '2020-07-29 08:24:33',
                monitoringStartAt: '2020-07-29 17:17:49',
                monitoringEndAt: '2020-07-29 16:43:10',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: '9nt82tbtws8ln0k19r97bmcrccnkynbjnnesk0xjqtxxzzyu8p',
                systemId: null,
                systemName: 'qcmnwf8ld9h40cjfshv0',
                version: 'ygxa71izr6f4mmr3u4ad',
                type: 'DETAIL',
                executedAt: '2020-07-29 23:22:28',
                monitoringStartAt: '2020-07-29 12:45:07',
                monitoringEndAt: '2020-07-29 11:30:13',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'p71g9haonunx2o0h5pz4sg66tp1twfounor1e04kd544671y0x',
                
                systemName: 'w50705jbrn34wkuubezv',
                version: 'rh0b09bntz8hzry81ncr',
                type: 'SUMMARY',
                executedAt: '2020-07-30 00:07:01',
                monitoringStartAt: '2020-07-30 01:18:35',
                monitoringEndAt: '2020-07-29 19:21:47',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'v7jajmtr43y7q1yajypehmp4t81ean0xy3t87bwl5xhk81k319',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: null,
                version: 'inqkiheadkmkkmu72zml',
                type: 'DETAIL',
                executedAt: '2020-07-29 20:49:56',
                monitoringStartAt: '2020-07-30 02:00:55',
                monitoringEndAt: '2020-07-29 18:50:29',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: '9pmw9o5xv8wfpkzmepicgjfcihr7rgxktvxhx5o6eazmkfx81y',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                
                version: 'lifim5q8jaiih7ozyz1n',
                type: 'SUMMARY',
                executedAt: '2020-07-29 05:22:00',
                monitoringStartAt: '2020-07-29 04:44:20',
                monitoringEndAt: '2020-07-29 23:44:00',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'rds8rr8so6z4fcibtp50mbk2jex5qyltw1obfca3syjptrnvyq',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'vwki68gy2ee78x7q9142',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-07-29 16:22:02',
                monitoringStartAt: '2020-07-29 21:11:09',
                monitoringEndAt: '2020-07-29 17:01:02',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: '4a3oupoinw5xxvjqj9wec2dfjueb5hci9g5xjis8xo1ie7yzbh',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'cksdmcje5e12j0sgd839',
                
                type: 'SUMMARY',
                executedAt: '2020-07-30 01:25:54',
                monitoringStartAt: '2020-07-30 00:15:00',
                monitoringEndAt: '2020-07-29 21:39:14',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'dqy9wv02i7o0idhtjgcefsiq2p02vo6aa46j11vg2csubocbev',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'bahgmmcmyhnrcp1hshh5',
                version: 'ubdo57eie547qak7h4hk',
                type: null,
                executedAt: '2020-07-29 16:57:53',
                monitoringStartAt: '2020-07-29 10:09:15',
                monitoringEndAt: '2020-07-29 08:44:01',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'xh0p1sq5wp7gffcdx2owxi2lqg46tqk9kwh0n6cib3di5ga8xw',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'vzfshbesfpd8tcrt23qy',
                version: 'h6cmy0qxa5gwidkkix1i',
                
                executedAt: '2020-07-29 16:48:28',
                monitoringStartAt: '2020-07-29 05:24:09',
                monitoringEndAt: '2020-07-29 12:23:28',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'tzzqkmmrp1uzh5gl6cg4bfac4lkl050n0bn25y5b8ytn3xfg3z',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: '5adj9w3wzzterqxxpjwh',
                version: 'c577wk9g63vpp5ne4q1k',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2020-07-29 13:41:54',
                monitoringEndAt: '2020-07-29 12:55:50',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: '14fzum65idluxceuczz9qkh4opncw57fc6o6uezxyaevvj14dn',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'ou00as5luprrzh4of0us',
                version: 's2krtea0xq3os9eleooc',
                type: 'DETAIL',
                
                monitoringStartAt: '2020-07-29 15:14:10',
                monitoringEndAt: '2020-07-29 18:30:54',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'fb2uiefkrm5snoesu1ed7wg85yjasaijz4350776ttxnhi4bw2',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 't8ititrhw9ie7yhi9841',
                version: '4dckj15dlyjyfzj4olg6',
                type: 'DETAIL',
                executedAt: '2020-07-29 08:01:27',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-29 20:01:52',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'jd4l9to85l4lkyqio9638t0t4u19dc4o2nce8pwwel65y4j9dg',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: '80vfxn7isd40m7gpe9jg',
                version: 'fk2cbzp8qc90qvto4a3g',
                type: 'SUMMARY',
                executedAt: '2020-07-29 21:52:25',
                
                monitoringEndAt: '2020-07-29 09:32:05',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: '9l59k3vd8wya5wcsmqigb6dfqgcn24eojn4xyw8evacbrkrsoo',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'blxwwohwg3omv566d4qx',
                version: 'pxb4xznbam6u3z2zrr6l',
                type: 'DETAIL',
                executedAt: '2020-07-29 03:35:48',
                monitoringStartAt: '2020-07-29 03:16:39',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: '21pkbxvtpq55y3nmxhgaz7wmyuz3cd3atmhufr8ywxtrj8082v',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'de3qg8wzmmavc7cbbu5e',
                version: 'eo2bfrjvfd9ygmjxz3gm',
                type: 'SUMMARY',
                executedAt: '2020-07-30 01:56:14',
                monitoringStartAt: '2020-07-29 02:28:05',
                
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
                id: 'r665xn2a8en2smdkc5sd0k4pg37q3yorkcqy4',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'gryhtie2gsszg0ebmape9ioabxtdlvfmi2lx8b5zxn963urxnm',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'w830yqrl8s3puovoz5c6',
                version: 'midakp2uejk0ctnllmz3',
                type: 'DETAIL',
                executedAt: '2020-07-29 05:44:07',
                monitoringStartAt: '2020-07-29 13:03:31',
                monitoringEndAt: '2020-07-29 05:21:26',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '4w3mj2yzxbvc2pw0vxfe13x9v9on2l68fhm2k',
                tenantCode: 'enaqhe8hz3b17kfet2hrsmf81tk9mwippn1xngkczxzur12mrh',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: '9tcyvyfmndrjccs3jw17',
                version: 'sn11o9usv1epz2j840wb',
                type: 'SUMMARY',
                executedAt: '2020-07-29 04:39:54',
                monitoringStartAt: '2020-07-29 11:04:50',
                monitoringEndAt: '2020-07-29 14:47:26',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'jssb5vccx4ejm8965z7ebdhos36u6tb2ykdbiw83icslyptr2b',
                systemId: '8q4l8x33xazn6yftrviit3xtzt1l5aeepf7im',
                systemName: 'cuab70co66c0hy8nnn48',
                version: 'es48fg63q95ehnuc4loa',
                type: 'DETAIL',
                executedAt: '2020-07-29 11:17:49',
                monitoringStartAt: '2020-07-29 07:30:41',
                monitoringEndAt: '2020-07-29 19:38:30',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'b2t5d3t50t5nox3u9bkpro3mxfnn4dw1thf4e1pxxk4ouy50g0e',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: '0gnp65136kmknxlz4bbw',
                version: '1ldunqt844awu1ybtl3l',
                type: 'DETAIL',
                executedAt: '2020-07-29 19:58:21',
                monitoringStartAt: '2020-07-29 12:50:59',
                monitoringEndAt: '2020-07-29 21:50:57',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'wnuu8h6csx8smtxvyw98f7rjr32e37tm5n9l2a342j3wjo0eae',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'tde1apad3k19ln7m85j9k',
                version: '078t6vlj6hmqiqou1s1q',
                type: 'DETAIL',
                executedAt: '2020-07-29 21:02:30',
                monitoringStartAt: '2020-07-29 20:23:58',
                monitoringEndAt: '2020-07-29 06:55:02',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'ujiqpvmue0ne80sjei9msddwevlp6cbos5ybk5gmc8qyrs00hu',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'bsnff5gx2d9f9tvc9djm',
                version: 'vob3xli5nuwd4rua6qlbk',
                type: 'DETAIL',
                executedAt: '2020-07-29 15:30:46',
                monitoringStartAt: '2020-07-29 08:19:04',
                monitoringEndAt: '2020-07-29 10:49:13',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'rmr5mbsfjl56p126s7xuxaiqc7bj6c76khb08gbrlzfzun87x6',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'fm2reyg4myke7e5329hk',
                version: 'ilx110vvk7eqh5r9m6si',
                type: 'XXXX',
                executedAt: '2020-07-29 07:13:36',
                monitoringStartAt: '2020-07-29 13:25:35',
                monitoringEndAt: '2020-07-29 14:56:18',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'h43yqibcqyg1pnpsozivr5vzd3oa3bbgom1mbl5cif6znq6fa9',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'swtkurt3p55zsgxl4259',
                version: 'kpm1o11v55130dhd8tqd',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-29 20:08:20',
                monitoringEndAt: '2020-07-29 21:20:28',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'x5a04p7a4159u57h7o1mjsmygzje4so3qrmvq8jo3snlrc29a2',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'b24zq0jyw79eqv3xq5pm',
                version: '1m1s4bhwpk3dm408p143',
                type: 'SUMMARY',
                executedAt: '2020-07-29 23:28:57',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-29 18:44:08',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'ykct2fklje44a43zdndn8p1vyysr2rx5lbwu5jveizynqitjxb',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'zy2qbs0bsysx0x7t392n',
                version: 'd4tr1t4in1pxqi9ht5a7',
                type: 'SUMMARY',
                executedAt: '2020-07-29 22:33:31',
                monitoringStartAt: '2020-07-29 03:36:03',
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
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'bs09uml8pkxt38i4q0v5aoe4mfo0w4clniyxbbbxl1o20c5lxp',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 'cogbfh2zruw3ip48ywlx',
                version: '0dexs81ko1b63gzc4zer',
                type: 'DETAIL',
                executedAt: '2020-07-29 20:40:01',
                monitoringStartAt: '2020-07-29 20:47:42',
                monitoringEndAt: '2020-07-29 20:49:52',
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
                        value   : '31536a8a-9701-4afb-ab34-5dc17dc32ea6'
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
                        value   : '9d5ddcce-5b80-48ee-9ea4-46f68db452e7'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9d5ddcce-5b80-48ee-9ea4-46f68db452e7'));
    });

    test(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/f5be31e6-bed2-41ad-8b88-dc26839b9d93')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/9d5ddcce-5b80-48ee-9ea4-46f68db452e7')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9d5ddcce-5b80-48ee-9ea4-46f68db452e7'));
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
                
                id: 'd3ccd1a6-2948-4f36-adc4-84270417c742',
                tenantId: 'f9745439-a874-4ab5-a866-73020ab141bc',
                tenantCode: '4rz4pvd1u9r189ub2in5oywkl3tbjv924ca0equy4tncfhd6lv',
                systemId: '8d30ca2b-6368-4231-b492-7b08fd3883e6',
                systemName: 'fh98nyoep12twnoaffbj',
                version: '0apzorizxk2ydnp301zl',
                type: 'DETAIL',
                executedAt: '2020-07-29 13:57:22',
                monitoringStartAt: '2020-07-29 12:03:42',
                monitoringEndAt: '2020-07-29 23:43:56',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                tenantCode: 'sre9drx04g8m03ytgklbhso4y8qg19hdm059u8gzfa54ft8y4h',
                systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                systemName: 't451qthag5oscuiuo72j',
                version: 'w7pnyg4drx8270jb9v5x',
                type: 'DETAIL',
                executedAt: '2020-07-29 03:40:30',
                monitoringStartAt: '2020-07-29 22:48:01',
                monitoringEndAt: '2020-07-29 18:23:48',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9d5ddcce-5b80-48ee-9ea4-46f68db452e7'));
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/4a1cf617-38e4-4184-88b0-b6c074a6d173')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/9d5ddcce-5b80-48ee-9ea4-46f68db452e7')
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
                        id: 'f01d2a93-b40e-47e7-89d7-b29d9bfe5aa5',
                        tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                        tenantCode: 'ml68jn1ad0b1fmtvziwg0me1l3ottovab896bhtl2ojiy0ln69',
                        systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                        systemName: 'fzyr817irz3s1su6og8v',
                        version: 'x2raan5xvzzaxt54titv',
                        type: 'SUMMARY',
                        executedAt: '2020-07-29 05:39:02',
                        monitoringStartAt: '2020-07-29 09:24:14',
                        monitoringEndAt: '2020-07-29 06:22:48',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', 'f01d2a93-b40e-47e7-89d7-b29d9bfe5aa5');
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
                            value   : '4c021a0c-595f-4c7d-837f-96e94fb20c05'
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
                            value   : '9d5ddcce-5b80-48ee-9ea4-46f68db452e7'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('9d5ddcce-5b80-48ee-9ea4-46f68db452e7');
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
                    id: 'ea794960-5636-4a6b-8a7a-587b61f3a5f2'
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
                    id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('9d5ddcce-5b80-48ee-9ea4-46f68db452e7');
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
                        
                        id: '12bfdf0f-852a-43a5-94cc-6071742c0784',
                        tenantId: '3ee8ddf3-ac78-4c1e-a403-662104a1416a',
                        tenantCode: '3nj5klw8hbuc5ou64c2a30v49enq7ibnnlz2367irjr70r957n',
                        systemId: 'b5df5814-8fd9-4461-b34b-54674536130b',
                        systemName: '475o1a5pcxm2dh9ev240',
                        version: 'khtq9ptjaeg4mjxub1we',
                        type: 'DETAIL',
                        executedAt: '2020-07-29 16:02:15',
                        monitoringStartAt: '2020-07-30 00:10:52',
                        monitoringEndAt: '2020-07-29 17:16:50',
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
                        
                        id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7',
                        tenantId: '0408e4ed-69de-4c3d-bd2c-3e0eb970db7a',
                        tenantCode: 'klb6t155p92rg1dodo5afco95gxhqu06nloy2kbxzy0w8opbwf',
                        systemId: 'db504b9f-8aeb-4cf9-a085-9c5433733323',
                        systemName: '2qn7vgyrdcs35nvou3z4',
                        version: 'axbr3i2reu6k8si3i0y1',
                        type: 'DETAIL',
                        executedAt: '2020-07-29 23:46:25',
                        monitoringStartAt: '2020-07-30 00:26:12',
                        monitoringEndAt: '2020-07-29 08:28:25',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('9d5ddcce-5b80-48ee-9ea4-46f68db452e7');
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
                    id: '4c5324d1-98fb-43a5-9b40-f2be10516c00'
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
                    id: '9d5ddcce-5b80-48ee-9ea4-46f68db452e7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('9d5ddcce-5b80-48ee-9ea4-46f68db452e7');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});