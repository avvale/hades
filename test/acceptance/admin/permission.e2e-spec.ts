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
                boundedContextId: 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6',
                name: '939qt8tblw6esexcl5jptg7erbfvj6yfktd2jyhzon7s01uxbj41wihxmcwtdcqox9ts8smtage3bgs9xwuj9gii0yg0vtsi0lvio83tk4ctvv5xt7cmeh5tbk8amfnajiean11b93x7o5ksscrhp4w1lrbig17z2367gbkrn9srf7f55oee13h43kwzbvyascq1wdtay3p8ir3zv6heaa3dnicubsuddihnre8k7sf8zti81skmkeot7aqn035',
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
                
                boundedContextId: 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6',
                name: '2cq251zz0pjaiczgz8o3811lvbj3j9ny97lr4fftc0r84wa1nwbdsxfgwrx21q13w1b5g7cwkulmajggkt2shjdb5ri3yx3idq5q4h0pxqj418rg800if2s83oqvo5h4lwrwea1vfi2rvc4dmq516jp4hkikfgrxdhxxi2e2yp2pnf8o0sryw36jn8mtx5jcwe03v0ief872w2fmyqwmf0v5mw1lrc6iuye6xp7zklgbsjietueikw6ry5mal3r',
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
                id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8',
                boundedContextId: null,
                name: '13yu621fmp3jsz683qgai7hfjdyz9tnms6hcu2uk8zl0u1aefw44sobqahrvydp549tnl9helqoobex4j0s2olqm74dyisrbobs9rox4199te6if12xj3ua7befcgcvctczikmoa1jsx55svts0t3782xfub3ddjzl2rbwd3xep2zneqsjp3nbqb8prk55c65znb3q93pz25l29wdzd9eh6mx6nj8ssqd0860d12kw4mmrv1dnyh6k6vjpzvm3m',
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
                id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8',
                
                name: 'vzinvgad15cfpo4wdqbayg44yoq7gark1m30wve3mhqx6bcea5fp1y0tz64pvmtcpyo2p5jla3wmoxrgesza4pcbcgqezqj0cl4x8a1dpuojvmes586rcm7s6p389khtu6k8s17rju98mpydx1giioxnjfs0e00flo8a8zwdmrfcrrruuxh3pcwob5d2mtwduzh0rjtz5i0qxwls55nx556tv5x6v5qvf4yeb748tem2nm4bn8lpgeij4bynupm',
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
                id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8',
                boundedContextId: 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6',
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
                id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8',
                boundedContextId: 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6',
                
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
                id: 'dmk734qgk6r5oq9cua9sv5wiwgq1lr3mx2dfw',
                boundedContextId: 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6',
                name: 'adqzzrq5uzv1i1fxfeqdylxibtc0asl7eo3cyktm140uih8z1lt1lg4u2x7t8o8ap53fpwf99lrfbaibxzznfy970btqxepqxusiefod2zsyt3p6pvjy9z1vy7k6c3eqj28r5zujlocg9d3af9z8mhh1aw8prrw94visgal1wxyx671wdnqwd9z2a3mea5ipgxinbmtm4akkvo7j6o3cgv47scmmfkrfuth1atg8xfrh2ok9h7w899j2p7gi6rs',
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
                id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8',
                boundedContextId: 'snxxbaza0z5xnalxsfbdohtfyvls5o89n5bui',
                name: '486f6dyuz06z5whdlheq8cfsie9o8godeae3u32qeabst5ptqwnk6rduomb0oeoaglicsiwqckc24hruxrg0ywz2loa6aiwf82a3jp4knkyhgqexdvwa9e5hjbach2fsdeeir9lhy016ec705wb1qaez4hxph4kqi2y4eoqy8uiqjbktehwflwjdpu6oybso1dwtj11qvdnsrholp93c50eg51w6g1m9mo6ct39wolzn1tw9zktzfgn2jp5mfld',
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
                id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8',
                boundedContextId: 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6',
                name: '7a4lqvbfnlq0shmxs2xqlgrs1nhvaguditloqleolk1ok5xikz165thy4225wlkwjgnabo5hnfm28n2gfyxtc560sh4vlg5qlb5o7dbk0dezomwnn1uhozojbrzltd7r4pz0bv18yx0k6824ttcby8l3u055e5vhgys61lu9nht08l87s01vpf8nox1ejgptrzz1oazzudnuipeu186fmq2z2m8n5t5093banb1nia3fd9spk43hs0z4q7lrx0px',
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
                id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8',
                boundedContextId: 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6',
                name: 'ey2t6ejmmm2m9h1rhtmgbk0x2s6441yk4n9vwdwbjpx0dwwrwuy4lvz5btjgqoqaxegqg3ydq5zosp9cgfu50tzwwgfpaa7bo18by8qu43w3ulgz9sm66wduggvsq4utfol3o968qyrmxfxy19rmetc3omiluyjp6fatjojendqfzs3uwzk0bx0nglo9fzs38i3nn199jhubcqx14pwl6kvn5srh5oy4sandbym1a4yva4wtfbkatt3c1o91t4w',
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
                        value   : 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8'));
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
            .get('/admin/permission/e7244e3c-b7c9-4637-91e4-8b13af8d8da8')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8'));
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
                
                id: 'c9953350-7e74-4852-a758-8afeee7470e9',
                boundedContextId: '0c6ec7e8-6666-4f95-a0e0-b11f610f7d55',
                name: 'icpvv76am3xo8dew35xrcg973getzxgi8i4g2di6fao3gkej92kjnwsesoudt904uq9jkqua5dgb7iqvvm8oh6q40oyh8zcc7n7d6f05bm1dl13kys820ccl4a16sc633z7obpc3x067sr4qxwql0x78fkoqw1oxp5frldint449f11lrmg7pj4bd0r6xuu04yhfr2fi0n69b1ukev4nq71dbm706c9i6pzoaukifucev0t3mc8al4h9jjb213v',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8',
                boundedContextId: 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6',
                name: 'v2r9xqlem6hqalb4bymrlxneua9thrju4r46l23q4wxasrz0vlzbwha7yems0ig67w0rws0kxwvlukeht5l66yfmi4ysg9vmfdvaioi1kvrhgd8bf2awnsiucxttxo0z6efkkag9wsj63l12f0ihj90ayfpozukcrklj23iwp6dzh6cmnfu93ylvumz2j95ox89shjqrbip875mxqllw8fz0mqxio0vr7r96gs4nqf1z6ex0tmdgspd4tfk9sov',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8'));
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
            .delete('/admin/permission/e7244e3c-b7c9-4637-91e4-8b13af8d8da8')
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
                        id: '77fefdfc-56bb-4bf4-a3b9-424ca3cb9725',
                        boundedContextId: 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6',
                        name: '3pil2fp82kbw71vr3bivtvebxr39jwl4fnqrec0ynsu6c88wd8oa53hww66rzlbgiawgcspav4s87gi76re2c2j8ety4f0ncns3v1w8npansije57nhcyotd6zfhb4v7qt04sd64q8u4rskehtr2iomo9egg8irynidca68yf5n5xtu5w0mcfiidzwjqzn94ews6v9zoj21mglxlpn0asoezqvp4s8ik9an928ul0v54tuefrywmh5p2tljgjsz',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', '77fefdfc-56bb-4bf4-a3b9-424ca3cb9725');
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
                            value   : 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('e7244e3c-b7c9-4637-91e4-8b13af8d8da8');
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
                    id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('e7244e3c-b7c9-4637-91e4-8b13af8d8da8');
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
                        
                        id: '418b8f3b-937c-4a0b-bbce-9f404adf822e',
                        boundedContextId: '78c60607-9f82-4565-88ae-ff9aeb4c39fe',
                        name: '26uy1i2oachpa6u6221wicen2gwcvpayzwxrzrmn2d9lchjh05ejnuz8no3gnxzaaa6luy21u61jbwxderkwoot2tjcz8liq3u1zlvkynh8qy0vc26t5rd1e7mzo9bjem8i4jvpym3znrjpb2kmhjo5nja1bmxxhtkt3ajlabh5z60gcdiubyuv1i18hg6n6ug37qainn7mxlciv5pf4o7r4xuz4kl6bgaws1fegcthi82q4xlzzf7hg93x2nhd',
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
                        
                        id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8',
                        boundedContextId: 'db8d5efc-fbd4-4fac-be3e-334dcc2881c6',
                        name: '906my6sgajh0n0wt90tb5jiolj5gccg3knb9q7uotb0ltggzz606jahslxmipbs1ujvpfidc7yl460gvvrbfy85qfq2meoris94heg68p9ji503b00wisduy64fh0315h7jzzt5p3w0w3nkapybftjjfjhs2eafbplgj23ozxsrzi0leypxjs7cs9r6bns9sjd3vwv73tn5qv84xl3gi4qydw1ikeiusvk82i4pk62q8lsdhd0j1u58mpu8iuad',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('e7244e3c-b7c9-4637-91e4-8b13af8d8da8');
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
                    id: 'e7244e3c-b7c9-4637-91e4-8b13af8d8da8'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('e7244e3c-b7c9-4637-91e4-8b13af8d8da8');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});