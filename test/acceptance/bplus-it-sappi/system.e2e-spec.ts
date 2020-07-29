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
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'e0nlitnmrpce52tmzqayndqaf4vhdzsd4uonlu8f195fulup78',
                version: 'z',
                name: '1',
                environment: 'i',
                isActive: true,
                cancelledAt: '2020-07-28 18:11:55',
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
                
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'k9zezkbmz6zfqbh3x3tqg54hecd0nnovlcvnyarw77yyg7c3fx',
                version: 'o',
                name: 'h',
                environment: '3',
                isActive: false,
                cancelledAt: '2020-07-29 05:14:06',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: null,
                tenantCode: '9wdxxavmqav2wog92162c8pc56v89h5dylsj0hhfeiwjso1c78',
                version: 'i',
                name: '0',
                environment: 'z',
                isActive: true,
                cancelledAt: '2020-07-29 09:15:13',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                
                tenantCode: '5s5wxrrungjsasn16kb0fqcindtnnonfezqv4zv3ykqrja3cfk',
                version: 'c',
                name: 'h',
                environment: 'p',
                isActive: true,
                cancelledAt: '2020-07-29 10:06:37',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: null,
                version: 'q',
                name: 's',
                environment: '9',
                isActive: false,
                cancelledAt: '2020-07-29 11:05:38',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                
                version: 'e',
                name: 'o',
                environment: 'i',
                isActive: true,
                cancelledAt: '2020-07-28 18:38:49',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'zps1d4veiu0u7z7b0045q1wpliyk9p596sh9amtifq3lopa275',
                version: null,
                name: 'f',
                environment: 'q',
                isActive: true,
                cancelledAt: '2020-07-29 01:20:35',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'rodgzstsjze0rr3f93efx0mwiyyrpa5x8070nmhwd7hjczhtw9',
                
                name: 'f',
                environment: 'g',
                isActive: true,
                cancelledAt: '2020-07-29 01:52:25',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: '77biul9gwpvmr9rg40f85v1o23kghfuo807854t9dfhp6xvzvp',
                version: 'r',
                name: null,
                environment: '5',
                isActive: false,
                cancelledAt: '2020-07-28 20:55:20',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: '0d5njwxj6gjtycz1y7x9aus6ac86wbcvunqoquifslkw32ko31',
                version: '4',
                
                environment: 'h',
                isActive: false,
                cancelledAt: '2020-07-29 10:44:34',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'bznmuk7xk6m90y1j5zsqsgnzm2zetw9gkmh7kq8feahnje9sd3',
                version: 'p',
                name: 'q',
                environment: null,
                isActive: true,
                cancelledAt: '2020-07-29 05:39:49',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 't6fdpxyy9rsoi6e319cmtrve8jr1m64mknw9flxf46uwan2lv7',
                version: '8',
                name: 'k',
                
                isActive: true,
                cancelledAt: '2020-07-28 19:00:10',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'xtd95xd5f3hiqvsoikn2m8z37kqel6ylegnyj5tkinz33eer11',
                version: 'g',
                name: '6',
                environment: 'q',
                isActive: null,
                cancelledAt: '2020-07-29 05:56:47',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'pwx7myojx1iw5yr4lypb655ptzfmaww3z7m6e1dpty9vv71nfh',
                version: '0',
                name: 'q',
                environment: 'u',
                
                cancelledAt: '2020-07-29 12:23:02',
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
                id: 'm3ybclkmdw81rcf0ub0g7av2yu8a3pl7qp4j8',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'oyfpb04phk7aaczlat0uxd00aqlv928c5ttv77gdrf6515wun6',
                version: '6',
                name: '5',
                environment: 'u',
                isActive: false,
                cancelledAt: '2020-07-29 13:05:41',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: 'mkzmo1rm51hcsznyad0din6f3fj7f80zgn23q',
                tenantCode: 'qt53vj9p8t6a2rzavj2e8k0hqw204aiocexq47lxhzt8gy6aqq',
                version: 'd',
                name: 'i',
                environment: 'r',
                isActive: true,
                cancelledAt: '2020-07-28 22:18:00',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'hsaf4miz3k6j2pwobtp5z80hxd0hkalj4mgnm0ec4qury2bjorf',
                version: 'l',
                name: 'o',
                environment: 'a',
                isActive: false,
                cancelledAt: '2020-07-28 21:50:50',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'j2isu3o0dt9c5d05u7qyo308kuk00jx0e3qewh7516mwc3z9fo',
                version: '0',
                name: 'i',
                environment: 'x',
                isActive: 'true',
                cancelledAt: '2020-07-29 11:46:56',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: '46hk9n6mzouek1n3fzv0i3dgkbdvofmimw56cph2jmytm82uua',
                version: '0',
                name: '6',
                environment: 'v',
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
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'j7xwmd2ktpsudhqhnd7m2l5wlrntvbasp91jzioomyqiknzutz',
                version: 'u',
                name: 'f',
                environment: 'm',
                isActive: false,
                cancelledAt: '2020-07-29 00:53:29',
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
                        value   : '4898536d-878a-44cc-9c4f-357f36f76554'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4898536d-878a-44cc-9c4f-357f36f76554'));
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
            .get('/bplus-it-sappi/system/4898536d-878a-44cc-9c4f-357f36f76554')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4898536d-878a-44cc-9c4f-357f36f76554'));
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
                
                id: '7f13fe0c-64f8-4fae-a4b6-ef995588cd55',
                tenantId: 'da5455e3-e36e-4045-8516-7a278e209408',
                tenantCode: 'ipk7z459hthmi1pwsxfdgr5bkrqs4rhg9qcde0rq706h4niywj',
                version: 's',
                name: 'r',
                environment: 'm',
                isActive: true,
                cancelledAt: '2020-07-28 16:56:42',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/system`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/system')
            .set('Accept', 'application/json')
            .send({
                
                id: '4898536d-878a-44cc-9c4f-357f36f76554',
                tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                tenantCode: 'tajz0sevk8hpewladr7h1cy4lua0l0a3c6atpmi8scyzjofgxt',
                version: 'q',
                name: 'a',
                environment: 't',
                isActive: true,
                cancelledAt: '2020-07-29 03:00:33',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4898536d-878a-44cc-9c4f-357f36f76554'));
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
            .delete('/bplus-it-sappi/system/4898536d-878a-44cc-9c4f-357f36f76554')
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
                        id: '3a3d32a2-86d1-4c9d-b174-69dbed77af67',
                        tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                        tenantCode: '1egesbrho809ski9a2zihdq3l1ngp7urn3f8v527bmd0jlaxhh',
                        version: 'n',
                        name: 'v',
                        environment: '1',
                        isActive: true,
                        cancelledAt: '2020-07-28 15:28:30',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateSystem).toHaveProperty('id', '3a3d32a2-86d1-4c9d-b174-69dbed77af67');
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
                            value   : '4898536d-878a-44cc-9c4f-357f36f76554'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystem.id).toStrictEqual('4898536d-878a-44cc-9c4f-357f36f76554');
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
                    id: '4898536d-878a-44cc-9c4f-357f36f76554'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindSystemById.id).toStrictEqual('4898536d-878a-44cc-9c4f-357f36f76554');
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
                        
                        id: 'c9a54599-1680-44c0-9ebf-4936f9e34976',
                        tenantId: 'd16ff45f-64f2-428a-99eb-bc5c87a9240f',
                        tenantCode: 'vbju1rney5ioqgi1p0m5aio1iih8w1r81w7mh8brh6eyr5odrp',
                        version: 'l',
                        name: '8',
                        environment: 'j',
                        isActive: true,
                        cancelledAt: '2020-07-29 12:53:25',
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
                        
                        id: '4898536d-878a-44cc-9c4f-357f36f76554',
                        tenantId: '92297239-974f-4dd5-b1c1-1bf5dc19014a',
                        tenantCode: '8zzm1neryo4600omhao6h85li63y46lwd5yrxsg6u4lh0323da',
                        version: 'h',
                        name: 'w',
                        environment: 'l',
                        isActive: false,
                        cancelledAt: '2020-07-28 17:20:14',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateSystem.id).toStrictEqual('4898536d-878a-44cc-9c4f-357f36f76554');
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
                    id: '4898536d-878a-44cc-9c4f-357f36f76554'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteSystemById.id).toStrictEqual('4898536d-878a-44cc-9c4f-357f36f76554');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});