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
                boundedContextId: 'bb46f885-9e91-4ad4-bac3-64496af6c532',
                name: '4p8p9tn8w823y26omdhqt2yr4l4b9hqhj2p16d07tbvuu25d6u1ncrmn7el0wxmbgu3ia8g32va7it02fcpybljljthdm3t57zuvb0hc1b1q8gnizl2pp41n7mrq9zl3y8v5qh7af7miekg1p48owrsh4zc8qc0s9ps224qrd9on760ub36t9n9dsovq5k6wgzqgpmntgekx51sacfw5f4c4y1o8ujhp9ykd1jgxntu7uia8fhevimdb9lt11jc',
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
                
                boundedContextId: 'bb46f885-9e91-4ad4-bac3-64496af6c532',
                name: 'bpewgwe34br6jcujdw0myel5t360im6ojwr25s0d3vcw4w4pn8lltfpy706bvb0gqq0m5c8wfcy978tq250y884bpc6t6rdxpasdv6px4w91ivpp6fvgoxxkxjybfzzimm75kmpb2n69es46lghg26hmvhox45t3yj9elv7zwdc3o92ymole0unrnwvli5sql208yjnlmzfry66fi1wwpicacis0224m4wddfonnssxcut0pxp7f4y7cz7xts34',
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
                id: '33776019-8027-40ae-8ce4-0f736ddc7ad6',
                boundedContextId: null,
                name: 'q4df9iiyqvc8vutglqwa8ar5immx589m7wdfyq1jzdkpqkmrjb9s0i9z087rnl5tq2gjmumkji6ty86c73vdy9o2zh6q882ybr7gm1cmc567nstfu0sfhthrcvos52lir8e22j4bsfjuy4y1dqq358llqk118bqk16hqjf1j7kk3vdb2lv099o08ncnfxxayra2peey8ehnep91amngn6gx5lmvnctuk0ca4x3ibszn3om09xkswcrkimj9koxk',
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
                id: '33776019-8027-40ae-8ce4-0f736ddc7ad6',
                
                name: '0zxifcf90otjofj2alxml8rgsddjftn8z8nnglrl8l4rxjvnyjv7db0qz0enz4isguhn8a6oudncv08dt2gp908zvyq5u7644xq8uu4a33tbarhvd9j065e8ytee79u1d9slp07lb7w8a8l1t6vfdv9arblpq4b2gzyjy7ngzdr4q8rz07faivarh7sjbb5oeis5lxwoaiddlzj5407dj3bz348kr0rkrmda67zi2pjxd6mtgh738vp86d2ezrv',
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
                id: '33776019-8027-40ae-8ce4-0f736ddc7ad6',
                boundedContextId: 'bb46f885-9e91-4ad4-bac3-64496af6c532',
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
                id: '33776019-8027-40ae-8ce4-0f736ddc7ad6',
                boundedContextId: 'bb46f885-9e91-4ad4-bac3-64496af6c532',
                
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
                id: 'hl18yguokog136rgobqqh4csrunhw36x6xswi',
                boundedContextId: 'bb46f885-9e91-4ad4-bac3-64496af6c532',
                name: 'avxfgbsq1vxu8iebw4o3wzw7ep6ir5ygktd4a1zt2dewwaz8hxewhawejkhjfy3l9ruyfgmv8o1k0wbtx3asb15xxebl2dn53edhzcnd19nge7g5ocvpvk1gtajifdyw3n0nitmle6tmqextivw4hq2d6raxj1xslorx817s8gp5yuvcpitsk4oto73v3nqd1gvjvnpi95zky1mcfjsaqn991b3f1y7rb3e3h8v46y615p8o9ug1emivyfo3hi8',
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
                id: '33776019-8027-40ae-8ce4-0f736ddc7ad6',
                boundedContextId: 'njm98y3c1dckg7joe69ufdtkf9ts7g7xm2rm4',
                name: 'pssq46dwcm1wsgs49zcf7wpzrbcwax2ok7vt6rnagd7bj1oqlup824syjiu3crewqeackzdu1bsj4ftzggzzpwhhk77s88khd1stzs01zocydsj2y3xbvw53mfost4duiquc5kqeca73pl2cysvhcx0adzb15dpa2208imk33vm41iqxw125c6jd8b2zbrc5na5tumsucabcn4z4lp9wnz122pjivw32qp2m24fvqta3hpemiq3964a5n4ew835',
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
                id: '33776019-8027-40ae-8ce4-0f736ddc7ad6',
                boundedContextId: 'bb46f885-9e91-4ad4-bac3-64496af6c532',
                name: '1pearw7oppr0uusj4gt5jph1pmmrpqm48anzwuplsq8tp52dm5qlvt42vgpnlorkzptogr539ddmeq4izeaykzw2zsj13i2qm6hirccojhudpb7xk6v2weuzpewbpp591jcdmm4piq4b50df296z0q9fsmqe6ex0o63xu21vfg8nno54p09oawvslo2r8a7zb48ir0b7712elk6m1luncg3ijgvus0ro55uffcemodwaoemthm77n6fovzmkxwzs',
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
                id: '33776019-8027-40ae-8ce4-0f736ddc7ad6',
                boundedContextId: 'bb46f885-9e91-4ad4-bac3-64496af6c532',
                name: 'eez6nxj2w1iv0r61xchsxr1pobxsvrfc031vdd9gpwg7gczpah6v433b8fi325jlxsg11ssvbhs551z8h6cz0z9qcdvlkmx30444fzpg9jl6e7bjuffzi6qf8j5do0fqr99sv6r67m4ph2e7d2yd270c6w8lap2b9nydqwxjizr7iwz1k06p5qoqo7npxklk06st9cd0dkanqrzymxs5n2x7ntdgu8ifwsupustqqgwapp2tmotkvwb28o1o9xf',
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
                        value   : 'd4186061-3e53-43b7-bc68-8ab843596996'
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
                        value   : '33776019-8027-40ae-8ce4-0f736ddc7ad6'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '33776019-8027-40ae-8ce4-0f736ddc7ad6'));
    });

    test(`/REST:GET admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/85dffd40-d226-4431-81dd-e1793d46b6d9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/33776019-8027-40ae-8ce4-0f736ddc7ad6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '33776019-8027-40ae-8ce4-0f736ddc7ad6'));
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
                
                id: '97e51bc7-a26b-4737-b9de-8bd6231462a6',
                boundedContextId: 'd5cde8bd-895c-462c-bbea-783d0129b081',
                name: 'oo32vt2esx6x35kngezqrgxh3adtsrylq4eq5uo26njf4g2uwoygh3iyrr3sw45kf49u5ens802tff9t4m41pd3n96bhdzzrjsm824em3d2ds81w9em6hlo4m402pqhkih6yxbnxishqm4vliht1zxqo32rx9bbs7psu7q8fp7rxl6nmqt89lbao55ehsl8tx83frciacvzbs2ay1xuc4vhilpji1d8bpsr2wnerk9ifp1vvczg2ocpfybquvdx',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '33776019-8027-40ae-8ce4-0f736ddc7ad6',
                boundedContextId: 'bb46f885-9e91-4ad4-bac3-64496af6c532',
                name: '7jklvynr6vn04s66drflpe285tv4q3x7r0i2fh0t19g96ajqhkp2jpibijfftvob0p7rasm5t9d93jsc94dlae96ynungv6ay1jb639cenro6qp58en55put1p81vzad42qga8ig2e686tmjc5tidbasfiiyognac9me1n4tg62gblyyn4nfy8o68fb6k0ll831rshs1xop03ktmdstcbfsok077xbg9bppwnk97j5jkmp4a5kqst8vmcc402k3',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '33776019-8027-40ae-8ce4-0f736ddc7ad6'));
    });

    test(`/REST:DELETE admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/c67022f2-7dac-43e4-b9cd-71f053e6aeb6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/33776019-8027-40ae-8ce4-0f736ddc7ad6')
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
                        id: 'ca7836de-1c45-44df-bbfe-7ae8a935ba89',
                        boundedContextId: 'bb46f885-9e91-4ad4-bac3-64496af6c532',
                        name: 'xrhci0o9jn16ck7za5zaniruorxp8bgj8ap6axqjdham79qlyuyn8ivh0x1l3y2q3cwy6vlf2wtzf8dhzwby6y6uto14bzczdjcojrjolkkf7vxuag33j7h6fglo3ajmai0mcwyyi88332zrv7bedc73ng7zq3m8ais4pbetpsxh265lq6ykcjxj6ymz1u5c5yukjf35sxax6egbrfqevlh3ztihwzub7z2c8gofmnt8wib6z8hs60u5pna1yl1',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', 'ca7836de-1c45-44df-bbfe-7ae8a935ba89');
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
                            value   : '551399d6-a3b5-4e65-95a7-b2ca7dd1bd66'
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
                            value   : '33776019-8027-40ae-8ce4-0f736ddc7ad6'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('33776019-8027-40ae-8ce4-0f736ddc7ad6');
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
                    id: 'db3029c6-cde3-44c2-bc0b-554442026034'
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
                    id: '33776019-8027-40ae-8ce4-0f736ddc7ad6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('33776019-8027-40ae-8ce4-0f736ddc7ad6');
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
                        
                        id: '715d0525-89f7-4313-9d33-60988e4c80c8',
                        boundedContextId: 'e48825ef-425a-426d-86ae-6e19836bff74',
                        name: 'hgmxlt2nsp5my1zr3j2w727fb2ou1jsev9uqmn1usggsv5huttbytmqc7rvay8a8383sx53v8m05ty6u2ejdmau09i1ioswifmtd964ryon4ail53rz4rl0pscj6rna9xzw99s0kwt7432gxh8hhshmznugglefj4fz0fhzwf6b7ypdegoq0w1d82fmtzeehihe21vbyhznz6crerinux6z08untw8gjbgunh0n80jq51ee8lprep8pdk31qguy',
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
                        
                        id: '33776019-8027-40ae-8ce4-0f736ddc7ad6',
                        boundedContextId: 'bb46f885-9e91-4ad4-bac3-64496af6c532',
                        name: 'ufmctigo3i5xcj8ffh83atb3za1rwbm0rpap1ky95wuls10enphu4i448hrl1hasemn0bhvz22tfhebrby1bv3rqpc65u75tzm1pscnsb4f3bc2iagbjcflyttayd73odxg0bj1xw9geqt45xqddjebk643dxci44gphbbke2wj49tzecjelqamjhjhyldbdboo86k7ojbc1emdzor5frxfqzwbvf1d3ir7x57itje3ys1fi92wqq6ml1plxoyl',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('33776019-8027-40ae-8ce4-0f736ddc7ad6');
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
                    id: '66601838-2aa1-495f-a2ed-670895cb245d'
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
                    id: '33776019-8027-40ae-8ce4-0f736ddc7ad6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('33776019-8027-40ae-8ce4-0f736ddc7ad6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});