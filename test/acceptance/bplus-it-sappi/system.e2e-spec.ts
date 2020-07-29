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
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: '3xw0jkkj6wlsv29m6dwoow37y3xmj0aaw2ajo1jmk37cjgmmug',
                version: '0',
                name: 'd',
                environment: '1',
                isActive: false,
                cancelledAt: '2020-07-29 14:10:34',
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
                
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'vbja2ehjkmhedl4m5fwh8uumg8dks37fzy7ebwo6aoa306z6nd',
                version: 'x',
                name: 'w',
                environment: 's',
                isActive: true,
                cancelledAt: '2020-07-29 08:20:04',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: null,
                tenantCode: '8jfvwjcln31y2f3yyuh1w1yuk4gdotcvd0sf019cl89j67j6h1',
                version: '7',
                name: '0',
                environment: 'o',
                isActive: true,
                cancelledAt: '2020-07-28 19:24:52',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                
                tenantCode: 'e6w9mi37odw2jz2oh1kwcc8qu992ayewqeeahnko50go3cj1oe',
                version: '6',
                name: 'b',
                environment: 'r',
                isActive: true,
                cancelledAt: '2020-07-28 20:15:07',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: null,
                version: 'k',
                name: 'k',
                environment: '5',
                isActive: false,
                cancelledAt: '2020-07-29 15:27:01',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                
                version: '6',
                name: 'g',
                environment: 'a',
                isActive: false,
                cancelledAt: '2020-07-29 16:41:34',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'tb2nl4ggafpsfti8n2gvbyizk1ar08kg0i09xbvlhrpvy5qz06',
                version: null,
                name: 'k',
                environment: 'r',
                isActive: false,
                cancelledAt: '2020-07-29 09:03:21',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: '41upop0w13m4wkgso9y4yg0zvffe49r5fhsv3qro0zk0m7ponl',
                
                name: 'z',
                environment: '6',
                isActive: true,
                cancelledAt: '2020-07-29 14:53:36',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'f4he5ev6onvt7076jgutd7dxkx26pzc1emzpvma9ke2tiq4cj8',
                version: 'r',
                name: null,
                environment: '8',
                isActive: true,
                cancelledAt: '2020-07-29 15:32:14',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 's25psmnsj9vmbmd3ze1bi2lmjzm5psd3x828q825b6zfphqrkg',
                version: '6',
                
                environment: 'c',
                isActive: false,
                cancelledAt: '2020-07-28 21:08:42',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'mdhimk9r5bgovcwh26bw02itnu1nhlphrmrx7ybpk0wfk902k5',
                version: 'w',
                name: 'o',
                environment: null,
                isActive: false,
                cancelledAt: '2020-07-29 03:29:43',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'm9bs780hm3b6zns2kjrdryhcoels0uo4rnph7muij5fjtwujm9',
                version: 'x',
                name: 'q',
                
                isActive: false,
                cancelledAt: '2020-07-28 19:21:04',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'syojqq38er4q9wujjd33tllhhuufrkklwqbxneaele08dl59w2',
                version: 't',
                name: 'j',
                environment: 'p',
                isActive: null,
                cancelledAt: '2020-07-28 19:20:27',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'c1l2f11z8er5wf523pf6le3penrba2ot5j13mp3qv6hy6zvtug',
                version: 'r',
                name: 'k',
                environment: 'x',
                
                cancelledAt: '2020-07-29 10:29:07',
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
                id: 'bi4zrp24xnyez8rk27x1apkgkrt784dv35gxi',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'vpm59j5z3e9de4ch4wheqkifbddleoi8mke30ci0eccxqq2dnv',
                version: '6',
                name: 'r',
                environment: '0',
                isActive: true,
                cancelledAt: '2020-07-29 10:58:01',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: 'jzoz7p4ukc4fipjuinp0d5u6gbotiwmiq63ym',
                tenantCode: '9utjgxtjuaavvp7lnh4v3i8s0b06j27iq339kesxlm2tsw7umu',
                version: 'x',
                name: 'x',
                environment: 'i',
                isActive: false,
                cancelledAt: '2020-07-28 20:22:59',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'r3qst39vuw26fjhgiug8ek2ys6s8yfbcatshf5ruo7vpbiw98a6',
                version: '4',
                name: '7',
                environment: '7',
                isActive: false,
                cancelledAt: '2020-07-28 23:21:42',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'p6mvse3oa0d84zumujdnfv1m7n2xfbkd3bz9yafrwphaed1h65',
                version: 'h',
                name: 'a',
                environment: 'e',
                isActive: 'true',
                cancelledAt: '2020-07-28 21:58:53',
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: '020vumlsghac99i5mya17u44aalw1rgy0cytv3di2n09tmwjt9',
                version: 'h',
                name: '5',
                environment: 'd',
                isActive: true,
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
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'pashk6lyljnrrokilec80b6xro43d58bbyf9fbe7i9lu8eakwv',
                version: 'h',
                name: '2',
                environment: 'k',
                isActive: false,
                cancelledAt: '2020-07-29 06:49:43',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : '135bc1be-5eee-42a4-bc5a-f7494b6309ad'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '135bc1be-5eee-42a4-bc5a-f7494b6309ad'));
    });

    test(`/REST:GET bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/system/135bc1be-5eee-42a4-bc5a-f7494b6309ad')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '135bc1be-5eee-42a4-bc5a-f7494b6309ad'));
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
                
                id: '3878bcb8-78ce-402f-8b6c-40f72e7864a6',
                tenantId: '0f190c03-9c8c-4fa5-9817-30f23837ac57',
                tenantCode: 't4i2mj35nrk4ov4o6v8iiblkchb4725mvjuvpj9ho3ox0mahmd',
                version: 'c',
                name: 'n',
                environment: 'd',
                isActive: false,
                cancelledAt: '2020-07-29 04:30:25',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                tenantCode: 'f180dnqug52dkghpselj9alkph3k1v6xtdwl2x6nkp041yfi2c',
                version: 'x',
                name: 'g',
                environment: 'v',
                isActive: false,
                cancelledAt: '2020-07-29 09:51:56',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '135bc1be-5eee-42a4-bc5a-f7494b6309ad'));
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/system/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/system/135bc1be-5eee-42a4-bc5a-f7494b6309ad')
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
                        id: 'a42b2869-5205-43ae-bf70-cea77b73c2e0',
                        tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                        tenantCode: 'sduouzp47ngb6mbqvyibdhxmfobs21pt2if28e1ndq92wwemrg',
                        version: 'm',
                        name: 'z',
                        environment: 's',
                        isActive: false,
                        cancelledAt: '2020-07-28 23:55:59',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', 'a42b2869-5205-43ae-bf70-cea77b73c2e0');
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
                            value   : '135bc1be-5eee-42a4-bc5a-f7494b6309ad'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('135bc1be-5eee-42a4-bc5a-f7494b6309ad');
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
                    id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('135bc1be-5eee-42a4-bc5a-f7494b6309ad');
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
                        
                        id: 'c0750709-2016-4565-a855-c88ff4306362',
                        tenantId: '9b626aa3-3c0c-4757-9497-4694144008d8',
                        tenantCode: '4c4zhv4s6zcpju51ygbt7txfz49042vz00ipt2b488i49bleep',
                        version: 'm',
                        name: 's',
                        environment: '4',
                        isActive: false,
                        cancelledAt: '2020-07-29 08:29:03',
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
                        
                        id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad',
                        tenantId: '943f657d-3c00-432c-9a27-1e5146298e3b',
                        tenantCode: 'ljil9b21t1ctttk9ogzf78a6i0n4r88ru5i6x1am2mnsowkhy3',
                        version: '6',
                        name: 'j',
                        environment: 't',
                        isActive: false,
                        cancelledAt: '2020-07-29 13:55:43',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('135bc1be-5eee-42a4-bc5a-f7494b6309ad');
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
                    id: '135bc1be-5eee-42a4-bc5a-f7494b6309ad'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('135bc1be-5eee-42a4-bc5a-f7494b6309ad');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});