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
                boundedContextId: '6efb92e9-069c-4c46-96bf-e96c5beb0709',
                name: '0semecvxw23bl2qck4plkywsoltv8cb082dn6jjtxkm94lzqr4fg5u7b91084kn7dl8293ejm9xoaxxjq2vcv2t94hgx57seaik9e3r3zvd5g5eav2a92kb908v018v44zmv6zhacmchwkik2yxam6ks6u8pg61vhlizsk9gar3pu5fgr74qdbtfvxv1ralxel2v15e85rj2zriu4rthmhelx5wwn8a207euenqyemjoq4135dsswo3p2t0z704',
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
                
                boundedContextId: '6efb92e9-069c-4c46-96bf-e96c5beb0709',
                name: 'ii1aqr7vzdwj81dv2bse2w24s7pm19gftg39dxkntf2oe3k8xjqxiu2rpj7bja6ywny2wq6zjsmu8htitof4dwxu8eq9eokuj7782d8gc779qf3bq5j7jpl1eotr65cqbmhplardst1hu7atj5q2o7un932sdk2tfwswt2w60zjeijiyaskmqukhylue8xtepsktz04mnbmv0u4462yqhc8xzux2r7k2to59isv501dkw6rctau3n8ccgesyne4',
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
                id: '26cd0504-1f0f-4132-a209-c0939984de3d',
                boundedContextId: null,
                name: 'dbrrplg53bdqbhvngnrepx2ua4fnhgkxpdhakwi46ighr7qmsvhzslzsasow09eski9ju44rpdg71if53delxx3j5s9jsd5mykcvhyij2u9sk0dxsbnwbpik5b546z3fge0kw4gond3li1h2xpswbt6q7cpgb4w3xgiwwvz86xktw2z4tfz8vebnk6dsdiviaracm7lwgqex41ncmsb6t7bmggjgwd2lmi0gl1jy6315lnnkcp71da3rhiwebco',
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
                id: '26cd0504-1f0f-4132-a209-c0939984de3d',
                
                name: '87gq68l8t8h5kl0loplcuasthdredvg30tqmumrf2v2v6lyd6oq6wtjvo58r78dr2xcnzqipw0rr5076smxtmtc7o7qgicxkkz9vdrhwc6xa2g10jyey9gt884ifjgyzre1aknx7c5za28jjgal0zzjpnqa10aowhd3fbk6x3pkmwyufs08u0uca8uh175329pz94h6yd4mz12m74sx5lyxjqc4iby0giv4aiurxaicq2g3hn7lamkdtlh3xvp6',
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
                id: '26cd0504-1f0f-4132-a209-c0939984de3d',
                boundedContextId: '6efb92e9-069c-4c46-96bf-e96c5beb0709',
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
                id: '26cd0504-1f0f-4132-a209-c0939984de3d',
                boundedContextId: '6efb92e9-069c-4c46-96bf-e96c5beb0709',
                
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
                id: 'lyzpdr6n335ru7vwebcrvbpfk89nwrgto38bg',
                boundedContextId: '6efb92e9-069c-4c46-96bf-e96c5beb0709',
                name: 'dnlefpdyffsulxi0s93aktmm5c7x7n07wr6c06utijdq0pl82gzdnverrcxi8e1pp7hld9x8s87oz7cxfkra86k9rlnzq1rjtz0342q85f1qk9gcbjyyfhr5z11niqxidvxt4y3ym3tb3foxvucv32kn0tp244tmqsrgc6i3fwhf39xqvygkbvc1obth539xndwmhlqin7qb24w6gbcci81d95kov05jvqj22wdbiphosi3r1bhyu6jerqythx7',
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
                id: '26cd0504-1f0f-4132-a209-c0939984de3d',
                boundedContextId: 'r9yhyuearc4h0tvs4fl912zoru9e1mhdy8hak',
                name: 'gzt2didvmmk5jr251tlrd12r4bvyxhsb0bt9voydk44v9jncy9m22wtedh2pjk34av1sen8gch1fwl9huonoc8th1d6exa1tf009s8wqie2uzbjcfw7b5d7t37txeu0jqy5x6iiv509lcmvj5ijiq2rraitc216hmrze8tznbxmeq97tjzc5loixk09f3a0dpq0yhcumr6sgyyte12qwzk3qxasfpltmn53c3gh8j3u5hlpvg2lzrql1ip2vtlv',
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
                id: '26cd0504-1f0f-4132-a209-c0939984de3d',
                boundedContextId: '6efb92e9-069c-4c46-96bf-e96c5beb0709',
                name: 'cz59uds3we7l7s987o7xpfmbtp3tih4d5uzjwh99nfjn5m7rjmbajp0m13iiwbx1wgmuntt785embzovdfemb62f2kcr4qz1swggwjwynng5oxd0yacdv1md21hiozrm6zkoup6f3pp6pv8lpob1bej7ep55m9dwmnwnpg0pi77k4u76mzlijrn4ngbewjb30l21dk9qtbudmimzrgej0kczzgidifkt47c282onrpksyu3a2f75omytgzzh3lix',
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
                id: '26cd0504-1f0f-4132-a209-c0939984de3d',
                boundedContextId: '6efb92e9-069c-4c46-96bf-e96c5beb0709',
                name: '0o9ppcyr3ht4j2xq2ykuz35tho39x9m6ogqbxro33q4nx5h2rewegsvcp4josndlhfebg6y3grz4mzydwxqbsp107t5agn2uzv6la7bcdep2eo1nzarb5wf2xls59g8b6reknsgiadz795zq4o0qwa4gcthnmyyn4ebjgvzjfn6ypt84sb5c1z2c5bhyiin4q2sjtgnfxj239jwk8a31l8d280yol88jw3dwikfv1hzs2ql2oahftbaofteubda',
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
                        value   : '26cd0504-1f0f-4132-a209-c0939984de3d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '26cd0504-1f0f-4132-a209-c0939984de3d'));
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
            .get('/admin/permission/26cd0504-1f0f-4132-a209-c0939984de3d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '26cd0504-1f0f-4132-a209-c0939984de3d'));
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
                
                id: '7dced2ef-12fe-48c7-b645-5a97a57b70a1',
                boundedContextId: 'd4d7ff19-c99e-4c0f-a29a-1491890e0924',
                name: 'lg1a2dmyoe6bm7avlzjzwh43grnmssez3itpkw5k6iukautp0y1rf9kln75m7rb2ghouvwnzqcesprsoairzzhzsqosj6pt43tiiq0sf24cqpnx55lzy5re6k2btc4g6wb55bt2qx1cff68834ms8apqtj3v42bvxhnzlq3enq3ow7qruq7xh8o0l9carxxj4iitfnraonm92j3hvuirskdme0huvjkenfg5ggmu89a3oyx557dx2t91hvpgxnk',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '26cd0504-1f0f-4132-a209-c0939984de3d',
                boundedContextId: '6efb92e9-069c-4c46-96bf-e96c5beb0709',
                name: 'ww4yrqtb82iz37an6nkqqpwr4kstwl6wddzv86ya9pd2vcajeunqz4sknm5twg01pxosjbu0do8ffij2sthp6belexogh16jgirbdbgnvtpddq11u1gyex0v1auo48zd07tpvl0cmdloamrrnvrtrsn9jfn9zma64zy4y0k8pyhnaq39t7ox4s34f7kpib2710h85ri1xzfqd715f9tlmg47u32igcmw1e19h64pamabhltopytyesz50i94l0q',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '26cd0504-1f0f-4132-a209-c0939984de3d'));
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
            .delete('/admin/permission/26cd0504-1f0f-4132-a209-c0939984de3d')
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
                        id: '1a4b6a86-a1fe-4910-8b70-ab7aaf1ffdcf',
                        boundedContextId: '6efb92e9-069c-4c46-96bf-e96c5beb0709',
                        name: 'rx1yh6zy1y7elz8n555zawfyiaallw14zcv2j6brdofoshd0qs8ok99f454emtb0jid6psi72j3neasftfiilg35p1r6zofk8z142wp3gmad2os72iwd17zpsja44iqwjf88awjhaap6vx5bwqbvkv42mikhcsgl86n0qs0nf2ljwmtrcjiku951kaf70dto2aahqeuvi17z8drqj8q61he2ja1v7pp4zkxd29esjtu4v398u0gn3kidkx7a4mj',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', '1a4b6a86-a1fe-4910-8b70-ab7aaf1ffdcf');
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
                            value   : '26cd0504-1f0f-4132-a209-c0939984de3d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('26cd0504-1f0f-4132-a209-c0939984de3d');
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
                    id: '26cd0504-1f0f-4132-a209-c0939984de3d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('26cd0504-1f0f-4132-a209-c0939984de3d');
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
                        
                        id: '3486fe2f-8b94-4c4a-b286-c51e8f63f504',
                        boundedContextId: '258abd2c-fd69-4034-a115-3efc7d8b7f0a',
                        name: 'mymrwngwfnn7lsfs5c6cmvx1chjh019mr0ku36civz0t2fqxqepc1xd0vteudnmvw4teo7y4xtwc4bv9eo79bezffaouclh0jus7fl5wm8ipnnoyz082tt7nqci840m0madt1su1n124xhcm9kru1dvhy5a6jwa9x4i2jeljqt0dos307i2l3ofnoq89awsn2j2n5yjc00o9fm6emsjof45gjo56z6ngwz9fp4jgiq2figmcgfj589z6j6rqx8k',
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
                        
                        id: '26cd0504-1f0f-4132-a209-c0939984de3d',
                        boundedContextId: '6efb92e9-069c-4c46-96bf-e96c5beb0709',
                        name: '7hw7jnzku5agabetcxvqhas8at6vd4hk23frd30wojzvygv3rnoqwsln0s86yl5nr0pazbcmdnww7a1c5t541k6x3uhfeki397d4b3ikwqfv6w9rtq9lrkqbgnpf8qi9adr62lak8gj5pcmzifbvoho3hr7ygd7qu6skmr7rj3b73cylwckl13p2ozkphglq4znao34ih769vocne4j38sai6oi6kdz5qd52zisox63x53vdelwjx05pwdiiuui',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('26cd0504-1f0f-4132-a209-c0939984de3d');
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
                    id: '26cd0504-1f0f-4132-a209-c0939984de3d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('26cd0504-1f0f-4132-a209-c0939984de3d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});