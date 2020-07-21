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
                boundedContextId: 'c2fef42e-87b4-43e4-a824-f4540d012912',
                name: '7ah9cc37pzy9kng7k8ypb1z2pz1rhpln76qwoozt6oe0tz193ts5284iw1i8pzcrrmqo1pj2hdl6o09kp0s671q49rqh3gjguyyho7etyetsg86n4ny2l55mm8elun2fcfn0q3bojtyk9ed6ijvbw34l4h7aj7ggd33ehvibhegsyn9lsynal6rxge0slrnqjskj8tavql3sl6hdazvat4qgyrc7lrbfkvo0wqck041eqf8uhrzvq1st3qymly4',
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
                
                boundedContextId: 'c2fef42e-87b4-43e4-a824-f4540d012912',
                name: 'wdrtol2qp0kiz6m4r8dt8l03pi6coytz03dp3umnq4td2fsbffkckdmeh0hpb1mn3vgsest72rero7itabzupwfl870qi8bpuqtigbiz5ugxfzzgv5ybckd9qoa01fbbdnuc7ygzeqn4v4wri2rudzlfetch82qatvl17pt0fejx2dh53o9r7dkzxmds6slzf55l132uos6izwoo4h8z4koulf85p5k0a8vbjutk3de0swwkxco37uacxa2m4it',
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
                id: '5524b000-a998-4723-b0d4-88bb5a6c5afe',
                boundedContextId: null,
                name: 'qfxasa5o7v2c7fzgg91kaqtqdqdyi89f7x4xw12zftkxzzsnapelaab3g8n886d9oey5a7617vhfbt77p5zokivh0segwum37kb3x8i9yncf4fk8lz4wo2tyhl37q77lzc1zcwpmrt34pnggls8scwbi6gkwr8po7zttca15eb6miax2egh85bfdzkwn88yydg0smii7g9wee2idrxvq4v5npqgkk7khqeym4uo9s241ko8agmrw3igoxj7zyru',
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
                id: '5524b000-a998-4723-b0d4-88bb5a6c5afe',
                
                name: '050pxsq60bwf3q3qyvo3v8865lf8ogw9796tax9nrbt5b8f2lnnz4ld6oq8827jvjx1l7eddhf8wqpr2v2p325lodnbl3bqockkx11pkp7yechwi8pculs4tlbz0s255i1m7kgi2wrcaajwceca1a083eitwuh8mng8lohrx37yzd3bxpfsrcmkga6jax85q0wzgj1gi8f18u5icc00srl57wfgeapybw00rgly84nn0t0pw0swvxouxvd3zp7p',
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
                id: '5524b000-a998-4723-b0d4-88bb5a6c5afe',
                boundedContextId: 'c2fef42e-87b4-43e4-a824-f4540d012912',
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
                id: '5524b000-a998-4723-b0d4-88bb5a6c5afe',
                boundedContextId: 'c2fef42e-87b4-43e4-a824-f4540d012912',
                
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
                id: 'jbznws5uuw53buyvbab3u4xliftcm34b5fon5',
                boundedContextId: 'c2fef42e-87b4-43e4-a824-f4540d012912',
                name: 'zrp5c304p4os56yk80rlq3itzbhosm6nf3q6uscvfaldf6sctnql16zjeslutq4ga6sis25lrdz70t0dc7zfthhmojzxfr8ktobxtp1i1vvryekbc4og9ocf6a0wzp1ekirdoerpu5ncyeh3hz7479sw7j4l86tl5ysa47860vyvvg0xstkq4x5hqllgd26n9d6smy8ph0c6ihzcy46onrblyjcbcdwnqwwahkyk4bqt7v0w695vziknihi6sbe',
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
                id: '5524b000-a998-4723-b0d4-88bb5a6c5afe',
                boundedContextId: 's5hbnptorexza4ngopoftbvk0efkukcrf7o6g',
                name: 'nttwf6laemt5tu4e48iihnbj4qy77kqpt4riy2exg7vbjoszn4fsby6fb4l9vii3lyj9af3uuf29a3c1u16kpecuisbxs7ees5lfzzacait1bufhpx9oupq8g11emtfv4xtxt51o1uf84rkczoepb1yiy394rfgdi2355fzqysscwfddsk1iundvebpxbog40yfa0evysfnwq14p5tkf7q4lusy2wp9qq0wwh80y88pvjjiy56ynirdwd4yt4rm',
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
                id: '5524b000-a998-4723-b0d4-88bb5a6c5afe',
                boundedContextId: 'c2fef42e-87b4-43e4-a824-f4540d012912',
                name: 'i7jge23kuc8m76fmlrs8fqwm48bhc92569trgzng08l9jz6rpicf8a2obf7atjrjmr2cbo7gd9b8s5o38y021n6axh0anogy89bvsbb8gtciut4r2rzl55q7wl37cquozqxbah8zmnfklkhwls2i429ib1o4w9myscajg841ste811jbv48lbk36gb4nff425tchxy9556p6fh3mmx7w27abx4ckrk8zujmzci9kdmhy37kbuxwrmy0qqvd04kwr',
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
                id: '5524b000-a998-4723-b0d4-88bb5a6c5afe',
                boundedContextId: 'c2fef42e-87b4-43e4-a824-f4540d012912',
                name: 'c4vk99tiv5i8fisuvytkqltezabnlujlp0sicr28xxtl69b25v5mnndjgpea7re9vi3gkm9pm72a5j2nb017437z3y15wb2v0ajbn6p2htj1pzxh1exdes070bwxhlxucxhatvrjn4qxvcuowcwbqewomy6gal935ytku4x627l28ww09b66ch8q1vbxidofehhl5lofwnrvxzstqux6bapwv27yqnwrzljx1qaslmyojkjbd2rxkvryxfjok7q',
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
                        value   : '5524b000-a998-4723-b0d4-88bb5a6c5afe'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5524b000-a998-4723-b0d4-88bb5a6c5afe'));
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
            .get('/admin/permission/5524b000-a998-4723-b0d4-88bb5a6c5afe')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5524b000-a998-4723-b0d4-88bb5a6c5afe'));
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
                
                id: '6623f485-c555-40a8-b2a8-04c69c53151f',
                boundedContextId: '7bd8cdc0-83c5-4458-8390-551ab47d6110',
                name: '7c05j4eb6zm2eqz167jpauela3eox0q4oc2buiv5jj1uu7357u4cjok9cqkfuqjfrdlgwbsjuz7kmda6y0991gao7xo4czaju2tukep995h0o7ofccn7a9kx22naagfc2ge5sdbzjuxeq3m4g1f4p0rvm2q0w9j0pa0oqlypu6hiuvnoljltojkbm0rweygj4ramqal3a08jcvvsmgamb8t02cfea55b9t9m0slqnj4z72jc3zblrymqhq3oe8u',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '5524b000-a998-4723-b0d4-88bb5a6c5afe',
                boundedContextId: 'c2fef42e-87b4-43e4-a824-f4540d012912',
                name: 'vqeomqq3naojbvrjn75849rjfb39klyjfcow70hl4zpgs6of88lhxm9ic7slmpl376mukty08vyg762dvb5fmjbs27g7klvwo65i9px6d7spzszyb8kyudn2tue05rayafy8h9ls0wxclm04ahuhaxxy1dsm412n0tesikltuh10cafk8dnxwtzu3h4ulqhrapfq0yki66qxvsxd3zrpiwnymflg2yevani9uneuul3nj5ewyynp33jxutwtgnk',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5524b000-a998-4723-b0d4-88bb5a6c5afe'));
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
            .delete('/admin/permission/5524b000-a998-4723-b0d4-88bb5a6c5afe')
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
                        id: '039cb981-0a38-4eff-a5af-fc14c0b4a2e1',
                        boundedContextId: 'c2fef42e-87b4-43e4-a824-f4540d012912',
                        name: '28kphnxnvdcjvgtu4hg3g32qdn8x7crrqtxmbrskzw6ehthj73ld4bf3ojd5nph8t3rzkib0pgkr2pd7c68wm1dkr4wbcgzu0cclhv7x8qcdj9xwqfedeh5bj10qt5gz5i95tz4xnmeffzm395g3ykygnduoro5qwmpik9ywoh7fbqke85rmc936al9tzscfj0mvcnnmo1nfb8xp3u8tlv00bwtv4dxqtnbalbqravwm3u0z9s6j3g0b54q381a',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', '039cb981-0a38-4eff-a5af-fc14c0b4a2e1');
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
                            value   : '5524b000-a998-4723-b0d4-88bb5a6c5afe'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('5524b000-a998-4723-b0d4-88bb5a6c5afe');
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
                    id: '5524b000-a998-4723-b0d4-88bb5a6c5afe'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('5524b000-a998-4723-b0d4-88bb5a6c5afe');
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
                        
                        id: 'f816a9fb-567d-4867-a0ec-94300176d3b6',
                        boundedContextId: 'f51635d9-2761-4097-98f4-e0af980c26cd',
                        name: 't0b23fud0gwlb4qgwb1qq6tpfohmb5ermofwq4vf4ghvb2yn084a9rmrdhtgqliqvluthkpyphhdfsjvql96ltvptoeclaq0m2du3jtz59got8o82zgdmb84g3bmv7ftgbalep19c31xias37az3hrfvj0h8j4u328wlr2b8j2in9srclz3w6vx7qyg9swvyzqb6x467a70kwbnycg0du6j8a016xuebcsoog7756alsjr3fucuckwujngvgrja',
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
                        
                        id: '5524b000-a998-4723-b0d4-88bb5a6c5afe',
                        boundedContextId: 'c2fef42e-87b4-43e4-a824-f4540d012912',
                        name: '7z8rxjgteu7mdikn1xslrnksvh2iprxpi9hze6qiixu9f13ygym2wxfro4b0ibuyewhrpk6c8jm29e9aicshfnehr43fz1snfbi5vwr83l4aobqdxmrgufj48fmnfuwtc2zu71pxti6yt3dluo5fzz1p0aryabxlm7lc0kng1ghvokeuauvnkd9bsf058o7h4ne5ir4cpdysw8uuh1rhve9yilvkagr4m7yllhqgwk2gypqdccudt0ddgv319cs',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('5524b000-a998-4723-b0d4-88bb5a6c5afe');
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
                    id: '5524b000-a998-4723-b0d4-88bb5a6c5afe'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('5524b000-a998-4723-b0d4-88bb5a6c5afe');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});