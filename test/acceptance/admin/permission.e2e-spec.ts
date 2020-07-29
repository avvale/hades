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
                boundedContextId: '17b0817f-fbe8-41e3-a7d2-061e71833fb3',
                name: 'h2llkygoxa06fmgd9oxfn92n90ygj0gdm64c77vwtoxf86wkhhabu8wpum65828mvy565alshg8y09es1kx7l6ecgso62ep7tmq8zifazb61zs3752jhg7avk07ixnnia93ckxlyt98hsnpdbbus5mkz2lpjii354xspmbkciwhk8lfhn7y650lpikkxbieafzs7mji9oi318d5zop6yohi0787msoxdl5493zjucdn6s723c5zki2r950k5qql',
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
                
                boundedContextId: '17b0817f-fbe8-41e3-a7d2-061e71833fb3',
                name: '2tjohfdi59tdrs6c95khn6pp5ed26yhm5kqdc34gjr5bn3p6i24tm7m9dccnlvd1nhu8mbr7935c5g1tn9rb9un2zyy1tyxs0kql659xlv7ltdl5slxtvonly1mixnmdre45cu8qm84zyfckdfvzejj6viuyw0uzf69nhugbdy8ldc17oo4qg7y3r8dnunpm35wwswep7i9z2rb09kcyai33v1cud560aucc8p9e6ms91l1gxtkr7xal9azny1a',
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
                id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf',
                boundedContextId: null,
                name: 'yyd3ltibwb46tsxt0u3uljziv5fgt5nn63kqqnrqegnh4jyke19pqjmxukf2ztjbozw8jfmuql3kqqlfvwpyawnv8rkydg2ylfwe8yzfbdy1wthleg3wpfi3xy1ozbplfnvgmtcaegpwlgpekf8jvvvuuloq1kt5yglf917bo2mk5ieuiwv67mm8kmae5buw97t0kyygpy5v1tt8c0qnlkol2sjsb5d1plcbx1o60shzq7gc06459v703b2xhuj',
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
                id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf',
                
                name: 'rxv1756sqactv13uknt2e66ijcbw6omh2dcne2iueuly28zqj72sria3f2suuzh0z7st9tg85ar4n8m18683r0gsfsc8qrovz2u3mwidlbm95gwayr5bfoby74e8nq5kycfxofawtofb3r208k8m6328ed7hjuqiz56svppbu0cypttblsshi5avjvrdzbybu4d4piplfl393chclv9inxu6dslbmzqkvobu21vriie6vj1enim7v2p96w4n8kx',
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
                id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf',
                boundedContextId: '17b0817f-fbe8-41e3-a7d2-061e71833fb3',
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
                id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf',
                boundedContextId: '17b0817f-fbe8-41e3-a7d2-061e71833fb3',
                
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
                id: 'nr5zompia9q8t738xw90twrv9vnu3q1wbngsd',
                boundedContextId: '17b0817f-fbe8-41e3-a7d2-061e71833fb3',
                name: '3xqgm971cmrh23xzyklqarxlws2eqdewugq0lgy338p8raqtnayozzeei8n8bdx52fve1w2h8by2pr57whwpxa2q1ae0y5j5s1xds3zblpmia1ips2euab263od8esjvkfr13e1rp7uoycj3xbcuklhy59nsnt1gbpdslv8sizkfxy4ek6iusmew2r8cg79rvwrwwe60d54khen4xzbcp63awn1beomvghf2fvxobye25x1ttx4d17b0m8dwjvs',
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
                id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf',
                boundedContextId: 'dmktd8a0yw0ni9xy9bmf4syrialyfnhai4fyp',
                name: 'mseaqw05t2q4rh8w4k5sg3ibnowquurp43yhoet54sje6v8l036yw4afnjxdlg2w334c5z5lfhjrrrbra2ly3qpmpdq1mr41gts0jxagee9zqh5lkwy6c33pvl8qlid74l3qwvkfsvq48mpa18cmgkqgzi0ciyfbeoxhj944cyy02669e3q1tv0r5xdmhf8op98c5vhfmhyxbiq9lij6ojnj8w9ptbd0b72eps2gwitejyj94na3667jzdfh7h8',
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
                id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf',
                boundedContextId: '17b0817f-fbe8-41e3-a7d2-061e71833fb3',
                name: 'kxcxh2nkedh39szr7wozz69tmm5rv5myhqjp1z852c9yg3j1pxp8ql5csvo15lg4thwtnhfhnlkon56jr4zh72u7uwx7k185l2q4uovaakhoyghsbw5671u6sfbxviann1phi5vvqvwfjaf0xygxiyuag3qlwvcizda3gd1hfaocx3qk6p8iliajwf35el9zsqppoctwihwpl3xft2rwft5dlqvsesy8uro21a56hlos2edf01pw7wne1uyu1kg3',
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
                id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf',
                boundedContextId: '17b0817f-fbe8-41e3-a7d2-061e71833fb3',
                name: 'sj419afaoe989z4z5hhmuf0npetm13zf3mdlhag3qwxzb0b00ips0er1s4bdidsb5h1q4m1f9d9flf8twafsx2x1c9n4ywxuu50y1m6i20ewjsdesjpti0lfordg6yqrkfvo8pdjufipj8d8wx8sz3xsd034ueqk0w6p68gmniqc7m5itrn0ocw2uee590s4y5z3a6u4b30kzaftwgmedie2virtv7fegcqmeorrvmpxmgef55mmtvzq4ug6n1n',
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
                        value   : '3c59bfe9-8e13-4024-aaf1-c8b7fe3c1c4f'
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
                        value   : '627c5997-66bf-4e3d-80f6-7a26763a2ebf'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '627c5997-66bf-4e3d-80f6-7a26763a2ebf'));
    });

    test(`/REST:GET admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/d3c0cc91-f8ad-4d36-9d98-68a4815affb0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/627c5997-66bf-4e3d-80f6-7a26763a2ebf')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '627c5997-66bf-4e3d-80f6-7a26763a2ebf'));
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
                
                id: '772ec32c-edcf-4bd4-b423-847f744bf5c2',
                boundedContextId: '3144caac-1c47-4593-8c23-2da8a9109eae',
                name: 'm32icoyldj4r4fcvdfrqb7x7bn0vtx8wvv139vrkkmfomjhynru94dfdf8uhsufwuiamhnf3q64cg1ob9kd6hamv6m9oom5kh50u6fprkuiyjtitbjpt78w8z8qwrwxlfb6dp3cgoejar3zofq7axo0lvvfsmrkph3pj0lcsz54ulmjv197xpb6wzejbiz1bwqflyadfpf7v123z0qsvj65f9klliokdyatlzrrlli8vkdj3axn42eegyvzw0m0',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf',
                boundedContextId: '17b0817f-fbe8-41e3-a7d2-061e71833fb3',
                name: '1vhf2spnqfdqp221w4kxcpse1j1gg0awcd5j1gtlk2m8r3gza591oko2bbedljy0qve0c7qjeq6zmwhykm39fvaikxi8mxrz4foqvl84wxmsel5euepcbrvo92iaugcueacuw7tr90xy9nmah1slmf6x956s9k32phd7d4o8fkgc5kvtdoom7zkwnjuxm2o5utk9586e34evlsyel8pbildzvo6w525z5sjrjpm4fs47jz5anuea5yd2yl16oqp',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '627c5997-66bf-4e3d-80f6-7a26763a2ebf'));
    });

    test(`/REST:DELETE admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/bce1d52d-7737-4f23-9e06-9f23760b23c4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/627c5997-66bf-4e3d-80f6-7a26763a2ebf')
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
                        id: '7f6fdbe0-0848-4b36-89a5-b27150f1534c',
                        boundedContextId: '17b0817f-fbe8-41e3-a7d2-061e71833fb3',
                        name: 'zt5rpzoahybxa97aw2pu3wlwlek3g6w7v23p1dws9xolukf1ncs3t61o0dybfpq4k9pjk83vsrmhit78mqyttmggv8zyq1pe39vze3o01vogeeofxovpyn1mch2xsjqszylqg8wzamuv3l7th7g0zoiiq24pa8bcs2hv05qyzofbfrflln22kdl8wxj43b2c3u8nljfqevb3ko1hbnlalymyicqxi8t3x3hltxnp0g28kkexkdtbwjsnei5opja',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', '7f6fdbe0-0848-4b36-89a5-b27150f1534c');
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
                            value   : 'bf4f861f-fca5-4d2c-b48b-d9839f2a6fca'
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
                            value   : '627c5997-66bf-4e3d-80f6-7a26763a2ebf'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('627c5997-66bf-4e3d-80f6-7a26763a2ebf');
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
                    id: '2f13273b-2e48-4d02-94f0-18d2de870d88'
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
                    id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('627c5997-66bf-4e3d-80f6-7a26763a2ebf');
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
                        
                        id: '5fa8762e-ef58-460b-b6af-ad577da6ed02',
                        boundedContextId: 'de3c4fc2-d3c4-47a4-a93c-6c5bdcabeef0',
                        name: 'y0kc1u7uqoyk8x1hiovtvmkrct8orlshw0a3xrmwb895c09geo3soisww7sc34o58a9js4f9e5gd2jepx7yqpoz6xbn5asqlm6jt3mxp7d59fjqslily8mrf2a9sjm9cd3bz4lg4ttw1mh96zqfcvb32vqfcot7ewlq6x2kea8b7bbqm0mmka8n3ren9lykb1jgtfpv11fp8q29yzql8lrwa85w1wvyqsjs1a80xqzvh0ko2xktdiea79utuqv6',
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
                        
                        id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf',
                        boundedContextId: '17b0817f-fbe8-41e3-a7d2-061e71833fb3',
                        name: '5hcz4yg27l6xg58181q510nwsnpqew8hkmv13qwy284xurkulixpp6zz7xh0j5b94aionvksaxyqoirxzyoih0u35uftskf8m89diuc07tdnopit70zp2a5glmx16lzela9mp2aqbh666vrh9v0w61qcku2u0y637v2x70q7m4f6d7rtjd0hqr6ya783f3r0ls97ukg7gs4796cr38v7bwp6b04edb68ujkkx97m9gc202sxvzbk5hpdhdmwgas',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('627c5997-66bf-4e3d-80f6-7a26763a2ebf');
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
                    id: '9f9485be-7471-4e61-8825-c2f2c6e3d96f'
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
                    id: '627c5997-66bf-4e3d-80f6-7a26763a2ebf'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('627c5997-66bf-4e3d-80f6-7a26763a2ebf');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});