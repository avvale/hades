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
                boundedContextId: 'c89c5b9b-9b31-4747-b556-b994fc310fab',
                name: '5bwuu4ekjszuendvc8ut041vm0wc695mn904ji5kp7iq3f4eehderly424hewpej5rziyflelyqmy9vx7hly048idd5m8jxm1ta6evipmbns0z2rpp8d89aksoljy0bukppt5ofcsc5ge3p5qnoq0jinht2q0h6qp6d3c3iyfek4k0gvlsard3llw12a3qsw0eb4843hlch1adgvmiyu7quo5psxrmvho6n9c2tx7347hfjawfoag2ka05v2cof',
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
                
                boundedContextId: 'c89c5b9b-9b31-4747-b556-b994fc310fab',
                name: '6m1m8k7cetb8u739ebith8e2s4y7ltc12kmzzkwqax2wimufozmwx5rubk9o8gfno1uu4a5rvepqtq5gb2o327lq54n7p343mi81404zbfnt3h5ix3dh8ux1o5yxy1zridaeznwel8x6svxjnr94296q3qklbw7iyrz5x4tsjt34smn6835g9u18v0ow36ztog74zljxze7kuw1bu0xmrpm9ynwxbj1giuw19q3kyykiyjpnj8zvel0vi0de0u5',
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
                id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd',
                boundedContextId: null,
                name: '49zpcy8fpc97nt265s45y9nmx0c7ypod0ojnmpu19k5tb64ty7emh7urkojjyd84ds6qimjig67e4w1hbi48lr2d5he0umtsx4r4a8ytr6xb5akzafft850bbwjz95xeild8plgf9ni5z8odxzhvp61vahpqpzhqp15pe5a8wsp08crw5ou82r06d4gdgsq17wcmn2wmq44kbotu4jlriuaquchjwj5y4sh6ybd17j31b4jnpaicuf12022cpax',
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
                id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd',
                
                name: 'wbxgetmfwmwa580dni0p56dalhfh41fbjvdukizyuidl3kflz5smardtosqu8bu7t2i15u718gzo0levd7n69kyv2mchik7ilqobp8b1g34ztk6gqvftz146vajylmfnb1jlrukkqyz19fxksw1vh8a46snifguhigeq3d3twxzol082lvmqva0vb7pt9lolm1k8kpk25ke8ncw7dga0ef8we2aqokioqeiu5ply85nc3zki5kiracjeklitex8',
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
                id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd',
                boundedContextId: 'c89c5b9b-9b31-4747-b556-b994fc310fab',
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
                id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd',
                boundedContextId: 'c89c5b9b-9b31-4747-b556-b994fc310fab',
                
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
                id: 'v3odooofq25a56o7xwvy6bip0pkxwlrjdv11e',
                boundedContextId: 'c89c5b9b-9b31-4747-b556-b994fc310fab',
                name: '6kicf6usflgh43zzbb8z6hrmx0zerwvnwwfkqxn13tl6b8qu60g811m48231httxnr4nyy4d3g5so43owlctaujrlhgcosj05bh8q8ch6fofsj3vii051o1xge4v3z66rk69vtjcox5693g04a1or26x4iddgjc503n4d8zni0cu6guczc5gs4yj4jztkbracd5cj68w9ku725p13un9io2451vyh93si4505fesi8g8ume1pt51xmhpalfr3x9',
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
                id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd',
                boundedContextId: 'jmric9gs89f9sfmi4wnxd7trori7v0xb1wlzi',
                name: 'hkqx256qvbzbm4ui710un0xpq9v0koeqnx0w76zq46x11k2uu63u23eqgrrs7w63s6mfotcpqjfo6znm8k475bgj4xkdfl25z3c6mp19zzvbf46bffvbumee1jyhgfgexm1kk58fkbo892kwzuctt8glrp7qj6efaw7pby7jpyl5nlikr5pfjpwmva8sm2zebu8eq0izs7ctpgi4nejuxwi3dyx5vnwhggvq6n2u4zjxzvxi72ywibpv9amnkfz',
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
                id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd',
                boundedContextId: 'c89c5b9b-9b31-4747-b556-b994fc310fab',
                name: '9jypem2yygp6ex1uyz2hy7ml0z4t32elmmybkv8crvw5b7fzcz70v50lcquehnt8bml4ur3hyyya65tio0xj4rqztio9fq4q3cunnw2nihllazd23yx3pe9mzm67xwfj9lk9mmi6a7935cpkltaly2t6v5q7ly1rrha8xfm7jbgcddmro0cmr1uu0aqjrcmepplwpdtkyfjjbgsy4x4uduqstikr4nkk0s1jtq8jnmxih2ddmalfgm6tk2x7web6',
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
                id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd',
                boundedContextId: 'c89c5b9b-9b31-4747-b556-b994fc310fab',
                name: 'v4anq0ac0eswcn8mpgxiv0u0asl5xx4ooxp2gh4ut2yc2sotiadpmo6jxh9h1tui2l5eath7kkw63bmdss8b29x3g7lgn97ne8ofs4ctgaa6t3j38j8fnt3pkn35iwynrq74b7ga08ol4wad3j1o54jwdzw7t1poztbrsljqd5elm43r569tedsfwt4ddxbgp0dlmxzteviuu50opb2003wh75mnzf956usef9pubap27878rt2a1rhuzpflyis',
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
                        value   : 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd'));
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
            .get('/admin/permission/a8bded5b-ee95-42cd-9c84-8dd81c3535bd')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd'));
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
                
                id: '549aef3f-665f-40ce-935a-e0af0c69e191',
                boundedContextId: 'c7f16d01-1e3e-4ad4-a08c-a362a11f9098',
                name: 'y008i1t21t43rp23b1sk7d87n0imidza40uvwh7z7nstskbmen5k62l35be1nukl599nukwhzetu0qecpa1sid92qs7e52t92iwvlfe8jpp4hmzw72bx12qu635hwtvqgfqhfx40bk371m7ggnso2ei8qzbht216bmlurt30z1bwm2t3iq6qtc5t9jx02ej01ikywcwqtmt9msilcix5rovrvd57rt15rjvt5ez8v15pfinoaobr1zzg8vb1edg',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd',
                boundedContextId: 'c89c5b9b-9b31-4747-b556-b994fc310fab',
                name: 'de3iz9is2e2sk9cvt5e539kxomh7rlsuvv6i7n2z2q731lvl078k7v0wk0o0lv8tqt2zsyu9mjwq7fvifpskqoal9h3agpca3se8oxa0t1cd0xaetkb2s2wrgh315e40yj7bmsy8ibkdcmr69onf2hv29g00sbh9byujetyhj2vhe2fr593hygvt6uclzue7c5lo6r286kzftfcmdyws1pwv2p2zxw5pre40pbws2vjxy5hd5rf2ik8lzq4p773',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd'));
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
            .delete('/admin/permission/a8bded5b-ee95-42cd-9c84-8dd81c3535bd')
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
                        id: '60f7f965-6f39-4d8e-9063-e4bb594b40c0',
                        boundedContextId: 'c89c5b9b-9b31-4747-b556-b994fc310fab',
                        name: 'nqpq468dv3gn1jdd0f9p9ahqlanr2ftz5ro05546vh73awy17ct9zew2ma6ano19b6375h3stosz2sa2e07j810podq8wcqcwzzx9wjt9achg4eg3xdr739axu6bjvpaxuov5dt17vxxt66fbjma6q1myznx2zq70i4koolggmmyg7hjwxzu2y6zjvxgxwxqnnvbgb6ybogwt9q7lzjcoywq5mvgb43wa8grudrk34wkbbcr4ub8coi988beihy',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', '60f7f965-6f39-4d8e-9063-e4bb594b40c0');
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
                            value   : 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('a8bded5b-ee95-42cd-9c84-8dd81c3535bd');
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
                    id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('a8bded5b-ee95-42cd-9c84-8dd81c3535bd');
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
                        
                        id: '59d77aad-23b5-4f28-9b0e-ec4e2b4e7c26',
                        boundedContextId: 'fed419f9-4a30-4036-b2c8-d23bb2700d53',
                        name: 'ozv0gxo0ej4aos5qbjkq3h6glcemtk6y7gy24ghq4j1lzvlfjpuydd3z07s9st34n23ua4ucj8ozo1amw2qqoo7ij15ag6bf95ipbhshjao1mp8013cfyaqltz8ghevuuvytnsohmsz9bgmcji4ats5l8myktdw572zmcoagt26swvry97nclsjaqvcclvyc058rkfgtq3idz0nnnxgi3h7v8hjl7witlh0qvbkhakosoe1h9amfpph60d3kef9',
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
                        
                        id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd',
                        boundedContextId: 'c89c5b9b-9b31-4747-b556-b994fc310fab',
                        name: '0n5qwgeh43l851zyygadxcea05kymvt44uodu6wq97kfpm1tar5wre496t034c0niaxxs1ko31fft45oe8j5buo6fqsei5u3jq0mfzes7v1fbzgz474y5e7nu12f3wrqggo87rpbb7dfu42oorr0e7atp9kstok18a9o52gzeyvgbadqdx9fpq388nrrzmj1rfjz40ij969x7w6jd90x387iq0bf0hxdzdf36os287b58ox9uvs634yv3efdqf2',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('a8bded5b-ee95-42cd-9c84-8dd81c3535bd');
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
                    id: 'a8bded5b-ee95-42cd-9c84-8dd81c3535bd'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('a8bded5b-ee95-42cd-9c84-8dd81c3535bd');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});