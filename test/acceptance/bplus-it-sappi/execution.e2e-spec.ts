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
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'y6nexyhzfwi3jplv4e5rmh4adxh675vf6k0kvdcgfmim4t2pjb',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'un8bvhjltfp0rih1gyjl',
                version: 'uwpql8hv7woh020x6tyv',
                type: 'DETAIL',
                executedAt: '2020-07-31 04:05:57',
                monitoringStartAt: '2020-07-30 20:45:57',
                monitoringEndAt: '2020-07-30 19:49:52',
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
                
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'khsmgwee3brkaxbxhuljde2vu6hjoc76ej1ok77fuhitqq1te5',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'h17oc9lr5sfiibsdpe3d',
                version: '16069vev7p7ejjvxa3h4',
                type: 'SUMMARY',
                executedAt: '2020-07-31 13:23:38',
                monitoringStartAt: '2020-07-31 09:40:16',
                monitoringEndAt: '2020-07-31 08:34:08',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: null,
                tenantCode: '1c4s4qppmqq7m2yin672liww5muojv5ql3z8ul3ugy0z5ibz0a',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'gilovmkvaops5ukfslqq',
                version: 'xe8vs1h8ywf5bhmk2bxi',
                type: 'SUMMARY',
                executedAt: '2020-07-31 13:13:16',
                monitoringStartAt: '2020-07-30 17:14:44',
                monitoringEndAt: '2020-07-30 17:03:09',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                
                tenantCode: 'kuld6axhz9m9oddc2iqm7fi8fxsh260qm17yvpadu6c3edfjvt',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'itoqi0ycgyf5puta9cml',
                version: 'lmpwwzwzos1q8x14ravs',
                type: 'DETAIL',
                executedAt: '2020-07-31 08:37:36',
                monitoringStartAt: '2020-07-31 03:48:27',
                monitoringEndAt: '2020-07-31 13:30:35',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: null,
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'jn96aa9jvt7vzgpqqlqs',
                version: 'invgx458sap5r4l4evzf',
                type: 'DETAIL',
                executedAt: '2020-07-30 19:18:13',
                monitoringStartAt: '2020-07-30 19:27:43',
                monitoringEndAt: '2020-07-31 11:35:01',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'lsr1ln5tqod1r4zw6s98',
                version: '6i2n1lv7t35n9ovtkp14',
                type: 'SUMMARY',
                executedAt: '2020-07-30 21:27:53',
                monitoringStartAt: '2020-07-31 01:51:18',
                monitoringEndAt: '2020-07-31 11:37:53',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: '4h246hmc33rzm2xb6dinlm5a39owne4phm4ay41848w09zoccz',
                systemId: null,
                systemName: 'ouosrj9r6z3xa3ypm70h',
                version: '1ekyod183bvrnvy8pgol',
                type: 'DETAIL',
                executedAt: '2020-07-31 11:29:30',
                monitoringStartAt: '2020-07-30 14:42:50',
                monitoringEndAt: '2020-07-30 23:12:37',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: '0y39pvrw7zddtpi9topyihozcc1aafbzh2h3pf7bf2qydac6vb',
                
                systemName: '8lgb86624n1uzmvoclxh',
                version: 'r5kdai83wj1ke7azffuh',
                type: 'SUMMARY',
                executedAt: '2020-07-30 19:02:22',
                monitoringStartAt: '2020-07-31 11:40:39',
                monitoringEndAt: '2020-07-30 17:19:36',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'lbb1v7y6o1wo5rxmj6k83pxupygizrntl2k54vxeixafh21eah',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: null,
                version: 'j5ugdjsz9jt8hp2wfwub',
                type: 'DETAIL',
                executedAt: '2020-07-30 15:58:19',
                monitoringStartAt: '2020-07-30 15:19:26',
                monitoringEndAt: '2020-07-31 13:35:53',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: '988s74x2ew1jz10dtaw7g0u8trool2jt58v4dflmz242u4nwyu',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                
                version: 'le5f9shb1a806s3na0cr',
                type: 'SUMMARY',
                executedAt: '2020-07-30 21:18:58',
                monitoringStartAt: '2020-07-30 22:16:39',
                monitoringEndAt: '2020-07-31 01:30:00',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'ramo2w70vtdgzizok1n3pndyd3gpmxj155mfwhj6beehx54090',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: '8j7x4kwlayvlv0yhvidn',
                version: null,
                type: 'SUMMARY',
                executedAt: '2020-07-31 09:38:32',
                monitoringStartAt: '2020-07-30 16:15:59',
                monitoringEndAt: '2020-07-31 07:02:23',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'q8ahirrg6wegacgte2rlcl6wmca1bnkosiwuzundmseorg0xdg',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'jkmw57ntnbymmz503hza',
                
                type: 'DETAIL',
                executedAt: '2020-07-31 13:12:25',
                monitoringStartAt: '2020-07-31 05:55:15',
                monitoringEndAt: '2020-07-30 20:30:14',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'cfy1yt79geo6htlwpeyvchz3jf0cmm6rh4zdago594dm4sah95',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: '1y7tsmam6hbiaka0p726',
                version: 'c5u20vsbpwql2kaz628y',
                type: null,
                executedAt: '2020-07-30 14:11:16',
                monitoringStartAt: '2020-07-31 03:38:49',
                monitoringEndAt: '2020-07-31 08:59:50',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'dmqkda4e5cxo8c044mb13fbvaqnwsyyzg0c3qlz5kpxvv4e7up',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'bqsxekdgf0xsjlxrtpwd',
                version: '4q08tvlwyb6gijsz3fat',
                
                executedAt: '2020-07-30 15:00:11',
                monitoringStartAt: '2020-07-30 17:45:29',
                monitoringEndAt: '2020-07-31 12:56:12',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'k12lxjse2kwlu3jkbx4ujj788pua8znbhg9nfz8cyhdgo5oeoz',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: '99ygxj4d20c9z2u2c879',
                version: 'hr75kob2360uw469nxha',
                type: 'SUMMARY',
                executedAt: null,
                monitoringStartAt: '2020-07-31 09:42:31',
                monitoringEndAt: '2020-07-30 19:41:26',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'nyfsclz5y61m4456db2w7ecb5gkn91v5189tplwotm4d4v8bfm',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'ph8qgbubfu6efukuwtpy',
                version: 'y1n4ugee4jodovtgvcdf',
                type: 'SUMMARY',
                
                monitoringStartAt: '2020-07-30 15:59:29',
                monitoringEndAt: '2020-07-31 00:13:35',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'pipg7uw4afheoc5fkuh8x0ij11nkjkwzt1jzalyqqwgegybzfg',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'dt9u914zcuuhviowdc7s',
                version: '7fmtezvg0r4zmvehc220',
                type: 'DETAIL',
                executedAt: '2020-07-31 02:44:03',
                monitoringStartAt: null,
                monitoringEndAt: '2020-07-31 02:55:34',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'aty4g6ufmkrucz50esdk7w9vugpj3e5kqwvuryu338384vtmmd',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: '2r7oag88mf8oklane3ka',
                version: 'd446705ns6r9izeh3efg',
                type: 'SUMMARY',
                executedAt: '2020-07-30 22:17:53',
                
                monitoringEndAt: '2020-07-31 07:57:11',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: '0jyofrdxkqrumj8p3oodlpjsinmqn0ehujxg5pku6j0bv6nwrq',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'xfdmb68brwuki079amga',
                version: 'w08wvkmqh229d0ntovoc',
                type: 'SUMMARY',
                executedAt: '2020-07-30 16:36:01',
                monitoringStartAt: '2020-07-30 23:22:40',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: '7kgcmenb0q55eix5uxgz42vb9rgdurzq4gi6ifqlbsw6kwv8cx',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'lpmkxteahz5xfrz4ggwa',
                version: 'n6hczfxzi2q6yp1fwimb',
                type: 'DETAIL',
                executedAt: '2020-07-31 03:12:42',
                monitoringStartAt: '2020-07-30 21:13:26',
                
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
                id: 'p0mjtqwf5nhynxlxgyo0mpvemplqnwvq9rq34',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'rgopnhsvvy6phpqb3qvfu8fergifie8yl0xfl3drvdm459g9l1',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: '9cdh2scne43smhwqsla3',
                version: '73wz562vdo8xyvs3f8od',
                type: 'SUMMARY',
                executedAt: '2020-07-30 21:10:24',
                monitoringStartAt: '2020-07-31 03:28:03',
                monitoringEndAt: '2020-07-30 17:43:53',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: '3tew9hszhn14l46c0dxm43tkudqyelyk54rtz',
                tenantCode: 'l5e8arxshjddqfk4khheeqm7k9ibuhwcnl4kea1zifnbufzm4y',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'vu1pnjt49oq40r3sfhuu',
                version: 'u97og0r7e84hcvmbubti',
                type: 'SUMMARY',
                executedAt: '2020-07-31 07:17:24',
                monitoringStartAt: '2020-07-31 04:45:51',
                monitoringEndAt: '2020-07-31 00:06:43',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: '1k0di1vt6u2a3nfem7gb8usaxa70ijres0ddlzo8uk8kwrz6zn',
                systemId: '2zrwk58fc0z6245qvuxoltafqm1sajk858hch',
                systemName: '6ouvqgoq30ikfeel6xr6',
                version: 'yt84a7rwawq8l2pnarv3',
                type: 'DETAIL',
                executedAt: '2020-07-31 07:21:32',
                monitoringStartAt: '2020-07-30 20:46:30',
                monitoringEndAt: '2020-07-31 03:02:05',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'xwwiel1wstlptevcefxvb3fg43ekxkwhwg9mmdd29x2bfhuo0y9',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'b7qbyz8pyf9ac6v42b1e',
                version: '89g8zx9kc8gp0cipi1vx',
                type: 'SUMMARY',
                executedAt: '2020-07-31 06:25:59',
                monitoringStartAt: '2020-07-30 23:42:12',
                monitoringEndAt: '2020-07-30 16:56:58',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'sruzj5tsyxyh5d91h3cerdn17r0jjrssdmvpvnll21n1q81cg1',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'z8ub44gc67wptl748zd51',
                version: 'veuo056umjza87dmef5m',
                type: 'SUMMARY',
                executedAt: '2020-07-30 14:46:25',
                monitoringStartAt: '2020-07-31 10:18:35',
                monitoringEndAt: '2020-07-31 07:12:39',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'yn9m8mno4j3k8iznky67xteqr2fbrsd45b6jrostey4hzw0iw8',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'bdmc1qrk3wtkrasbuhaa',
                version: 'pz9g1aj60pnbr2v8agjyk',
                type: 'DETAIL',
                executedAt: '2020-07-30 17:11:41',
                monitoringStartAt: '2020-07-31 08:20:05',
                monitoringEndAt: '2020-07-30 16:16:27',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'zs61zw8h9rqdg1pqcw9bmqpbgs30nr4vqvbe40b8ttiu4vjeul',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: '0wb1rjuassg0wt01y7z3',
                version: '39l7b71sv9e8ensmfyy2',
                type: 'XXXX',
                executedAt: '2020-07-31 12:06:24',
                monitoringStartAt: '2020-07-31 04:21:33',
                monitoringEndAt: '2020-07-31 11:27:59',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'sw2uh6vp6j51wm3s6o2x5ka98dzcrhir789ng1g0h0v2tg94nc',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: '3qubcfusizyhrydz8bra',
                version: 'ucz3ahu990dya7xstyzk',
                type: 'DETAIL',
                executedAt: 'XXXXXXXX',
                monitoringStartAt: '2020-07-31 01:30:28',
                monitoringEndAt: '2020-07-31 05:26:50',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'jd84c2aphtnt9jpfg50f7ds3g93meb9kirycvu23jw620ox2b6',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: '1ylw8oly0bs7yp89nlfr',
                version: 'w1d7tpjp1ey7vlqfnl8q',
                type: 'SUMMARY',
                executedAt: '2020-07-31 02:43:32',
                monitoringStartAt: 'XXXXXXXX',
                monitoringEndAt: '2020-07-31 04:19:56',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'k5xp6yqastgq0zoycur2ucjkfh39m24q1pz7rwxn862mveaqay',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: '4h0i2ezuer69577jbysb',
                version: '5y9gl75f5aizssy8u8en',
                type: 'SUMMARY',
                executedAt: '2020-07-31 08:32:57',
                monitoringStartAt: '2020-07-31 10:46:03',
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
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: '81cativzm9zu1w0s37t0k2ajaavvd3spfm92x9y2m43yu8va41',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: 'ocetxz3xfrhyh8qzwzsd',
                version: 'lciipvyoc8x1s5ub9iy0',
                type: 'SUMMARY',
                executedAt: '2020-07-31 12:12:59',
                monitoringStartAt: '2020-07-30 17:32:49',
                monitoringEndAt: '2020-07-31 10:17:53',
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
                        value   : '257ef0d2-5752-4919-890c-42028fec8e4e'
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
                        value   : 'b214df65-f8e0-4f33-a30e-7bd4671361a0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'b214df65-f8e0-4f33-a30e-7bd4671361a0'));
    });

    test(`/REST:GET bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/4b17047f-f5c1-4c84-9274-80a7827f0c37')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/execution/b214df65-f8e0-4f33-a30e-7bd4671361a0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b214df65-f8e0-4f33-a30e-7bd4671361a0'));
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
                
                id: '8363e118-3c2c-490c-a82b-61e9d2772d2c',
                tenantId: '0312d408-6881-44f8-ab74-1f302203ae93',
                tenantCode: 'rmum1kpax8bayvya64026oxa0ix7vrk9q0sze3uvp6genrqqeh',
                systemId: '63f678b0-3e65-4bb7-b939-d5d656b74b10',
                systemName: 'jqg500kgpwp3cnjnj3a0',
                version: '9qzghhwym068fpd84m29',
                type: 'DETAIL',
                executedAt: '2020-07-30 22:59:56',
                monitoringStartAt: '2020-07-31 04:01:51',
                monitoringEndAt: '2020-07-30 22:27:55',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/execution`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/execution')
            .set('Accept', 'application/json')
            .send({
                
                id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                tenantCode: 'gq3pp5fgh7kx2dxxt3hf5znt8g3f8hpnmvb37tq8up2gzxmcn5',
                systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                systemName: '32l3s27vinh3frn814b0',
                version: '2fri1fnae4ful1lmf1nr',
                type: 'SUMMARY',
                executedAt: '2020-07-30 18:15:39',
                monitoringStartAt: '2020-07-31 07:50:29',
                monitoringEndAt: '2020-07-30 17:36:17',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'b214df65-f8e0-4f33-a30e-7bd4671361a0'));
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/9eeed345-74ef-402f-9543-770ed6f2d1b5')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/execution/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/execution/b214df65-f8e0-4f33-a30e-7bd4671361a0')
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
                        id: 'e658c728-84cd-472d-8dac-1f7efd691571',
                        tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                        tenantCode: 'autdujp3j23f6zi4uz48zhfiuscfy71pv7kltjntpuo84hvimf',
                        systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                        systemName: '22zp9pxnutwt6ypul4ha',
                        version: 'sg929ciap547vhv8cykd',
                        type: 'SUMMARY',
                        executedAt: '2020-07-30 16:35:18',
                        monitoringStartAt: '2020-07-31 04:04:05',
                        monitoringEndAt: '2020-07-30 15:45:26',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateExecution).toHaveProperty('id', 'e658c728-84cd-472d-8dac-1f7efd691571');
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
                            value   : '5430d824-e4a5-4eea-b109-538df1f65e2e'
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
                            value   : 'b214df65-f8e0-4f33-a30e-7bd4671361a0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecution.id).toStrictEqual('b214df65-f8e0-4f33-a30e-7bd4671361a0');
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
                    id: '5958b3f2-7664-4a8a-9417-57536067e0a7'
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
                    id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindExecutionById.id).toStrictEqual('b214df65-f8e0-4f33-a30e-7bd4671361a0');
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
                        
                        id: '7116f42c-8af9-49d0-8b7b-ae2a812a7f69',
                        tenantId: 'e1cdffff-6ebb-495b-bd73-278063edcaa6',
                        tenantCode: 'm2dx1rka27m41bnb8b2g91ns1za5v1v3e83ea4ju5qr1888bi5',
                        systemId: '5103f611-be55-4f4a-a627-6d2749564506',
                        systemName: '0cmwsi5tealbzjgi3b0r',
                        version: 'r8uumbp606ov6k0pk2fo',
                        type: 'DETAIL',
                        executedAt: '2020-07-31 09:30:33',
                        monitoringStartAt: '2020-07-31 05:58:27',
                        monitoringEndAt: '2020-07-31 03:49:57',
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
                        
                        id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0',
                        tenantId: 'e36fefff-df01-46a6-bf9a-18273e19b308',
                        tenantCode: 'mdqo6o44o1s834yx6ltw0a6md1pyovnr86vza8yy7a9iexq1cy',
                        systemId: 'ec6920c8-ff4d-4663-9728-46eb5ec62fe5',
                        systemName: 'xguxp5utctmh3qer0dcj',
                        version: 'vipyhks80d1rh1pfxqm4',
                        type: 'DETAIL',
                        executedAt: '2020-07-31 10:03:59',
                        monitoringStartAt: '2020-07-31 13:37:56',
                        monitoringEndAt: '2020-07-31 02:04:07',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateExecution.id).toStrictEqual('b214df65-f8e0-4f33-a30e-7bd4671361a0');
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
                    id: 'e21b11f5-a75d-47be-a5e3-e7b28637031a'
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
                    id: 'b214df65-f8e0-4f33-a30e-7bd4671361a0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteExecutionById.id).toStrictEqual('b214df65-f8e0-4f33-a30e-7bd4671361a0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});