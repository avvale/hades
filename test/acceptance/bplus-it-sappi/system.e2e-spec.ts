import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ISystemRepository } from '@hades/bplus-it-sappi/system/domain/system.repository';
import { MockSystemRepository } from '@hades/bplus-it-sappi/system/infrastructure/mock/mock-system.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('system', () => 
{
    let app: INestApplication;
    let repository: MockSystemRepository;
    
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
            .overrideProvider(ISystemRepository)
            .useClass(MockSystemRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockSystemRepository>module.get<ISystemRepository>(ISystemRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/system - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: '8ivgmgef5kz335o7o0kz6comg8oqu2vgaw5k9fhw4q2a71ktl8',
                version: 'e',
                name: 'o',
                environment: 'o',
                isActive: false,
                cancelledAt: '2020-08-05 01:09:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: 'umg3thmp5u1dbmt74h6r3wojokx8rzph9n48obhj3tavfwma7t',
                version: 'r',
                name: 'q',
                environment: 'r',
                isActive: false,
                cancelledAt: '2020-08-05 01:37:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: null,
                tenantCode: 'jbe5k047qxskq4m56egj3hvntqwyu6qqhyiep10ido1ks99hjh',
                version: '4',
                name: 'q',
                environment: '8',
                isActive: true,
                cancelledAt: '2020-08-04 20:59:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                
                tenantCode: 'yf5zeln48i12sci8phc045d37ly1z5j3bp01rvrkdpx2kn029x',
                version: '7',
                name: 'l',
                environment: 'g',
                isActive: false,
                cancelledAt: '2020-08-04 16:34:40',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: null,
                version: '1',
                name: 'k',
                environment: '3',
                isActive: true,
                cancelledAt: '2020-08-04 22:23:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                
                version: 'w',
                name: 'g',
                environment: 'c',
                isActive: false,
                cancelledAt: '2020-08-04 17:19:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: 'mots04n5084b7ytmb0rcpqh4a3i7en0jxl8scbgfgi5i63tji4',
                version: null,
                name: 'e',
                environment: 'd',
                isActive: true,
                cancelledAt: '2020-08-04 14:26:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: 'elt90j43fx0lqua2ohqq7g3uouir5cizlempi0p53ya4xz88xy',
                
                name: 'h',
                environment: '1',
                isActive: true,
                cancelledAt: '2020-08-04 21:19:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: 'dxh1i030gl9cb4z4lpgnp7j1gfvlhn9fwkpwcyobyof7m0sd92',
                version: 'g',
                name: null,
                environment: '2',
                isActive: false,
                cancelledAt: '2020-08-05 07:39:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: 'qwl5jtxt9t60bhr371962mw6x93ju8n4avohou33u73elf1ufb',
                version: 'r',
                
                environment: 't',
                isActive: true,
                cancelledAt: '2020-08-05 06:47:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: 'd4uqglav2ryv3bkg9zhc0d407f7h80mczap4fa4swxui0l6cin',
                version: 'n',
                name: '8',
                environment: null,
                isActive: true,
                cancelledAt: '2020-08-04 23:44:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemEnvironment property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: '14lmgu3wbsbizkrvbnmc866qh44cspc5cpmr2edx8kne3xoue2',
                version: '7',
                name: '8',
                
                isActive: false,
                cancelledAt: '2020-08-05 00:23:22',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemEnvironment must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: '769suekgjx0vwsxg19vc95bczfa8ph4b0x8jp6d467rabnfa63',
                version: 'r',
                name: 's',
                environment: 'l',
                isActive: null,
                cancelledAt: '2020-08-05 05:32:37',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: 'cijjrkipq6ew7zkjik7rzfg1b9i18sfr8195fpl42seax31rn4',
                version: 'c',
                name: 'l',
                environment: 'z',
                
                cancelledAt: '2020-08-04 20:49:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: 'laibmsi3ohj3hyoynyp51id9yxcwlpznetnyy',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: 'u2r8giezzqrk0lh5b8wgz00euiaq63uf6edqzzlw7jorwi6ot4',
                version: 'z',
                name: 'k',
                environment: '9',
                isActive: false,
                cancelledAt: '2020-08-05 05:16:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: 'xw16tq04dq1xwcrptm212c453rkhadje1i93b',
                tenantCode: 'chegwgjlbbm4vo6lyqpt2za3shs4058n1gy19rgm2znf5d3fjr',
                version: 'i',
                name: 'v',
                environment: 'c',
                isActive: false,
                cancelledAt: '2020-08-04 09:37:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: 'giid6qdm9dmp3fi00nacogqg54tcd34udc1tnuedsbgyqol94f1',
                version: 'f',
                name: '0',
                environment: '7',
                isActive: true,
                cancelledAt: '2020-08-04 13:01:24',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemTenantCode is too large, has a maximum length of 50');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: '5lbwwjfklidpada5stalfsz90y4yn5hxu3k5mbgwnyhrttno8g',
                version: 'k',
                name: 'h',
                environment: '9',
                isActive: 'true',
                cancelledAt: '2020-08-04 18:06:56',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemIsActive has to be a boolean value');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/system - Got 400 Conflict, SystemCancelledAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: '6b1sdu1rvr6myxmge8zdftm3nl97ssthm1m5vanja0qh5qscpx',
                version: 'p',
                name: 'r',
                environment: '7',
                isActive: false,
                cancelledAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for SystemCancelledAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: 'eioslitj8lpng1jlbg7e672k43esa03l361p44xtk4iq4wyjbk',
                version: 'z',
                name: '0',
                environment: '4',
                isActive: false,
                cancelledAt: '2020-08-05 02:38:43',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/systems/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems/paginate')
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

    test(`/REST:GET bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '73750c2f-d616-47de-8ca7-c79040d5809a'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '2012959b-9f2f-40f1-8359-3acd9368fe15'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2012959b-9f2f-40f1-8359-3acd9368fe15'));
    });

    test(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/74b95b1d-8edb-4ed7-9783-87689e7a0e5b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/2012959b-9f2f-40f1-8359-3acd9368fe15')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2012959b-9f2f-40f1-8359-3acd9368fe15'));
    });

    test(`/REST:GET bplus-it-sappi/systems`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/systems')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/system - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '5dbdc211-663c-4a85-a30d-4566ca4d33a1',
                tenantId: 'dd974b3d-e3e1-4cd9-8c9a-787ac3ea5fd8',
                tenantCode: '70xane0m3clrstpc870owcezlvm8ncjpgnswtf7b8dcdzl6ak3',
                version: 'n',
                name: 'm',
                environment: '1',
                isActive: false,
                cancelledAt: '2020-08-04 23:30:35',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                tenantCode: '4uf5lu5au38ssxagjlqvwa5hkx8b5kj1jkb8b2bx4w0wnrr5vi',
                version: 'f',
                name: 'r',
                environment: '6',
                isActive: false,
                cancelledAt: '2020-08-04 22:48:52',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2012959b-9f2f-40f1-8359-3acd9368fe15'));
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/518838eb-f708-4655-bb3c-f74303a2c20d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/2012959b-9f2f-40f1-8359-3acd9368fe15')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateSystem - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateSystemInput!)
                    {
                        bplusItSappiCreateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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

    test(`/GraphQL bplusItSappiCreateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateSystemInput!)
                    {
                        bplusItSappiCreateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'd8441832-f472-4856-aebb-9d4027c3b7fe',
                        tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                        tenantCode: 'z18k773n971qmzck043yklailx4723op44l2m0wqyig5aila3u',
                        version: 'a',
                        name: 'u',
                        environment: 'w',
                        isActive: false,
                        cancelledAt: '2020-08-04 15:14:10',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'd8441832-f472-4856-aebb-9d4027c3b7fe');
            });
    });

    test(`/GraphQL bplusItSappiPaginateSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateSystems (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateSystems.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateSystems.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateSystems.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindSystem (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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
                            value   : '6ceb2ffe-13f5-4992-ad9a-42355a252a2e'
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

    test(`/GraphQL bplusItSappiFindSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindSystem (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
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
                            value   : '2012959b-9f2f-40f1-8359-3acd9368fe15'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('2012959b-9f2f-40f1-8359-3acd9368fe15');
            });
    });

    test(`/GraphQL bplusItSappiFindSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f24dc268-cecd-420c-8ed5-28a9446d6775'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2012959b-9f2f-40f1-8359-3acd9368fe15'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('2012959b-9f2f-40f1-8359-3acd9368fe15');
            });
    });

    test(`/GraphQL bplusItSappiGetSystems`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetSystems (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetSystems.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateSystem - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateSystemInput!)
                    {
                        bplusItSappiUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '90b4ce37-a764-4ced-9aba-cc12e8999de1',
                        tenantId: '23fb9eb7-3bcd-4d8c-93f6-8e2dd0a64a65',
                        tenantCode: '3itplldq9aqwmpz3xcti2ujtsysk5339dfqe63vuy2y1bprnp0',
                        version: 'h',
                        name: 's',
                        environment: 's',
                        isActive: true,
                        cancelledAt: '2020-08-04 13:14:18',
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

    test(`/GraphQL bplusItSappiUpdateSystem`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateSystemInput!)
                    {
                        bplusItSappiUpdateSystem (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '2012959b-9f2f-40f1-8359-3acd9368fe15',
                        tenantId: '44b6aba8-6206-4212-b0d9-c7e02dd42083',
                        tenantCode: 'cl3eqivq27yeflh8v1ejx8wfc6lkfjra33cekf2grnqqm81a9k',
                        version: '9',
                        name: 'u',
                        environment: 'r',
                        isActive: true,
                        cancelledAt: '2020-08-04 15:21:20',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('2012959b-9f2f-40f1-8359-3acd9368fe15');
            });
    });

    test(`/GraphQL bplusItSappiDeleteSystemById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f611cecd-a520-42ab-a147-761989887bf4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteSystemById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteSystemById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            version
                            name
                            environment
                            isActive
                            cancelledAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2012959b-9f2f-40f1-8359-3acd9368fe15'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('2012959b-9f2f-40f1-8359-3acd9368fe15');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});