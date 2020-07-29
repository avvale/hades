import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPermissionRepository } from '@hades/admin/permission/domain/permission.repository';
import { MockPermissionRepository } from '@hades/admin/permission/infrastructure/mock/mock-permission.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('permission', () => 
{
    let app: INestApplication;
    let repository: MockPermissionRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IPermissionRepository)
            .useClass(MockPermissionRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockPermissionRepository>module.get<IPermissionRepository>(IPermissionRepository);

        await app.init();
    });

    test(`/REST:POST admin/permission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d',
                name: 'zwx8o64n6hermihv0bi49oqa6b6sjwq9pyyef1f9ncfijvkq6t4480a0pb72qcjib8oksjuym8iyb2o9ux64y2go0xiz9r7stoul53jjw8fsaghoqacef2g22o5z7m23mnpdjvc5mzjuf8gvg7da8zfc7nq740utpdtjkyzrxrx6w3l4ezu5iijhtxkfl2n8qjibqxwwwsmrof68bds6al5i071efja1tqpj31jxmwp457w1b3s44b6zsb05bh9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d',
                name: 'yj9c0qn3p42frrufjjhdg9ik66dldvormiofedlsy514kz4yweg210cpwmzci7gsp5m76guopzmldy5o4efmm3ss83s1gsxsyx4ef6w0y4vq8vxdvofca768j1r6l7b7c8a1c56ridj1fmcq9abn8tnuececkz2xr9p58wxbpqrr5m1bky1lo1madw0f3fp04ugc1zylk11wn5eklkigerbccchuoaafff29skum2c8lnb9uv1tjpvlq1b47qy1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'be6c6cac-18f1-4b99-981e-c928c6342868',
                boundedContextId: null,
                name: '4vp8jguk1k3bha98niag05rtz6w0bkrofk52hhd3nhjt7rcgprw6b6wi7t217wxgtbxlw0rnyb3a02vg6swdhrv7q624ev11sv2k3fxjq76gbz333q81xbseqjp4z3cmqck7xxo7ttxx1k4kovujzf32vvvgpwrnzhepqr4htywyu7kikl1zzdiq9qeibpoo9q4x8b4d53fxdp1iojtuc7xv6ppn6eu9m2tzwpwsyar0qjgnys9vzqowrzu8gmx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'be6c6cac-18f1-4b99-981e-c928c6342868',
                
                name: 'ilxzrxgtwr4dp3gkmm5x7ki7ult7xfk0d9r5yxj7qunibuwlp60rufqzj6nukk7ddbybx4k5in4mdc9elj5t0xqno9jppwezhrh1w199c2bcp3c8zt9tyla4ahwcgt7bi3e4oljul7u75e5176a10k793anql1tg6oavmaxbvg8es9jcqoklhcvrvbcq8y3m6bjn0ha903bcgm2yhp9yjsmqrgcbn17cbcluztzkw59d8bqg617geh4zll7f5wd',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'be6c6cac-18f1-4b99-981e-c928c6342868',
                boundedContextId: '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'be6c6cac-18f1-4b99-981e-c928c6342868',
                boundedContextId: '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'rupahhahftt7sgl5asd5412ipxgbs46puxyba',
                boundedContextId: '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d',
                name: 'ucv8a5u3szz3w59k7wqs7aq1x706qngq3cgylpk1o6w3if2rquye55g31s3ttocj2t8j427nmpfnfepz9n3ppfu5z9eppyigqnt60vw4sv8ym407cygms73i82kse7djnfb1ltwtdpc8ybhsyynkk79q1drw8bkchescwq9bl4y54vjei39gqs44nf6su2ketzs7ds34n764hgt5dhwnhftk7ih2hr1hyocrwowhpo52pwutrys98y7j4pwl7e8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'be6c6cac-18f1-4b99-981e-c928c6342868',
                boundedContextId: 'iyfsmjfhcr3hyzmpk26tnd4hml3rvi9nldgje',
                name: 'k27v6gtei8fpt2l4suffdmfssdotmukjn77vvhd3qbqqy3qq8foxkyiz8isoq0f5qztvc3xr7ev0oy4cqv7kmharhk8vkybpk08q92eqqsw9qbmzsw9y4hc3uizo59dhmn7z1muankmayb8ixmgvxugwm8ssqolzkvfvzibl00crg7hhm0wlto7wywu30c540c2d5bbjczpdlwla2nj99piwsxm3zdwkp8gzz8y3rs5jcqcvm20xr56t4wxvxy1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'be6c6cac-18f1-4b99-981e-c928c6342868',
                boundedContextId: '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d',
                name: 'haz02je1wcnv5fbit63h5wi0xfkwt540t9o0fjmx4eqp1vaitjamaab1k6nzjiqzw3g4ovwpuenq33tnwtdr76vnv237ns2mwbbjhvc92y8oiv2ckq3cgkerhb2sleup3lwvkrcxgpk5ycnr80ttjv5pu6b2ab3tzrq9tq32qr8prrfkwyxask9bvim2z0ns614l738796ugpilok940ptxbd2q1wsb5fiks9rv0bx7tkz9ga48yonsrkdkdrhdx',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'be6c6cac-18f1-4b99-981e-c928c6342868',
                boundedContextId: '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d',
                name: '16urwfyleyoxssub1izjviavc1ni7rb38egcthtgg2k2sy72z2im0lytzlta7r6g81idmoj8rqx18ojejltwakiypjok8m4xqongstby42sls9eozpq4ebbauqde9vm52mksz8qawaiqnk3w55t2khaslconptapp7ns6uf0hjhwn7angn768u057flf8da5lnmrci89avttspt7t1a56rypr9wz2xns4hdn5nqaebs790o6fizqukfiq0k9agv',
            })
            .expect(201);
    });

    test(`/REST:GET admin/permissions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions/paginate')
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

    test(`/REST:GET admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission')
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

    test(`/REST:GET admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'be6c6cac-18f1-4b99-981e-c928c6342868'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'be6c6cac-18f1-4b99-981e-c928c6342868'));
    });

    test(`/REST:GET admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/be6c6cac-18f1-4b99-981e-c928c6342868')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'be6c6cac-18f1-4b99-981e-c928c6342868'));
    });

    test(`/REST:GET admin/permissions`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '10e54147-8e60-453c-8fc6-f5bf5795cc9c',
                boundedContextId: 'e6c9cac7-95be-4504-aff4-7d31c766f0f8',
                name: '8pdgfaewdspyrl60l73u937jtt0lfe0vsjxj2anq2js1fk4k0tclizrxcxxxpzy3nhzdgo95gpmaaiouo90quvdqslz46yxl8xd7s40jdeez1xh15r3rf15jttmtlq99chi9mkpb14e66mrgme1b1ohq5kdjt998ccia5h9osaeot9rc28qccnne40e64fo0oadz0kcxoxk4871wi2bl3i1qp37638itxb7dx1atdklbm8yhsf1fkgl6kr8kjj9',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: 'be6c6cac-18f1-4b99-981e-c928c6342868',
                boundedContextId: '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d',
                name: 'kk8jg737n80ccrkc5butylnps5eyipgedk2rfeq47n3sxzbqx2mzolgt860oi8tcvk5rbnm0fotuwgst1r5qyaei8ibih4rgufmo6lai5dode6evl6yz4gy55lg7upagvaxdkc2iiwr4njq4vx0hnksq3xaeek8844hk0ekbn2eo2f5h32fb2ffnrp9tnx1ohf5n3krt6ykfh21h18la9qkjn47j7vblazair8jq5bz4os97zlsqq5m8nas0mgl',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'be6c6cac-18f1-4b99-981e-c928c6342868'));
    });

    test(`/REST:DELETE admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/be6c6cac-18f1-4b99-981e-c928c6342868')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreatePermission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreatePermissionInput!)
                    {
                        adminCreatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
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

    test(`/GraphQL adminCreatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreatePermissionInput!)
                    {
                        adminCreatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'aa748aac-b239-492e-a8c0-ee1285b11ca6',
                        boundedContextId: '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d',
                        name: 'njumiyjumb6suztawzgghjsmr11i5ichml1vp87llxpnate9oa73epqodjozcnb40c8zgxkmjyuyc1g4hlhl8exf9n5mzp8eacips31s1g2eyc7yjggse8p3tk50wuwwrnqf6zwa5zi7nhovdeaisiukvr58bd4gfm9okhq1990r9so3ba6oagi4gbw1jv4wtea1dwbr9rr6axt634tih2ad07jyjkd5s3uyd7hkceumooo32n6gmud8pe9lum3',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', 'aa748aac-b239-492e-a8c0-ee1285b11ca6');
            });
    });

    test(`/GraphQL adminPaginatePermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginatePermissions (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginatePermissions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginatePermissions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginatePermissions.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindPermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindPermission (query:$query)
                        {   
                            id
                            boundedContextId
                            name
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

    test(`/GraphQL adminFindPermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindPermission (query:$query)
                        {   
                            id
                            boundedContextId
                            name
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
                            value   : 'be6c6cac-18f1-4b99-981e-c928c6342868'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('be6c6cac-18f1-4b99-981e-c928c6342868');
            });
    });

    test(`/GraphQL adminFindPermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindPermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
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

    test(`/GraphQL adminFindPermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindPermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'be6c6cac-18f1-4b99-981e-c928c6342868'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('be6c6cac-18f1-4b99-981e-c928c6342868');
            });
    });

    test(`/GraphQL adminGetPermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetPermissions (query:$query)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetPermissions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdatePermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdatePermissionInput!)
                    {
                        adminUpdatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'a1d6d437-14fd-4b94-9ed4-749e4095b519',
                        boundedContextId: 'ebb85e69-ae1b-45f8-89ac-d5da6a0e0a5b',
                        name: 'fye7cmeoriljo4cm1fsvlh7mvsyl5v46h6kk2hnpuu80d5amjvs161vmp94773hw37rrf55t8pl0wt5fyl6qvm7ffghypa78942icdi5la67vrru3mzcuyx4ajuhqmhgog9erx4c1yg8jh3t4gqodl0igebi5839dptk5pxn2e18b452934pa2dwokuf5q5hjdmacfgexit55ier8mlvr612h9nob0zigbwmw55wivrn9dicb0clbhcpf9w5dnu',
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

    test(`/GraphQL adminUpdatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdatePermissionInput!)
                    {
                        adminUpdatePermission (payload:$payload)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'be6c6cac-18f1-4b99-981e-c928c6342868',
                        boundedContextId: '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d',
                        name: 'b89bp33rofp6czt258yae4u93ewbtv9bu9kgjroqre3vt7vmejoajqc9it7ip6bqfb2bo0ezngq58ybrra78vqvjd2wgqc54zuvi8suybk7ss5tckrvffhg941fqxsbbq58r8wo7zjgl6zg6kmxxgmit2s7hnrh8xzwp010lqjtkkl8otvm7r3pzz41pd9dhw9s1huslme1dgwrjgjsaymp5dq57ghdlcblikzzyvbdr91aviz9jc3g79ezvjkc',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('be6c6cac-18f1-4b99-981e-c928c6342868');
            });
    });

    test(`/GraphQL adminDeletePermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeletePermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
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

    test(`/GraphQL adminDeletePermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeletePermissionById (id:$id)
                        {   
                            id
                            boundedContextId
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'be6c6cac-18f1-4b99-981e-c928c6342868'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('be6c6cac-18f1-4b99-981e-c928c6342868');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});