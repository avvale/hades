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

    it(`/REST:POST admin/permission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                boundedContextId: '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd',
                name: 'qr1awqudxoj7dyrs77i4pbfbgdao2fmmmuamxsnbej0kn5qyq23av2l6iie8irf6jakxo0uaoqnkrzqzo3fcfuah5gt8tcstw5eja13i8jgt9k4kyfpz89ci5nyi4kh16l6784j5kbec0126bh45831grt35io70f8g6meclbvf15fwhft0n5r33s2uspwurr9w9yjojo0zvw20yeini6xh9f3u06aldqh8koucvxkr60c5wj1ydz8fgee65s9z',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                boundedContextId: '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd',
                name: 'un8252lyz9ylxiutn86gbmbwz40noa9mnsggs8hz6hegs8tddnbk4sshepaoyqm9lyes8eagzrlvzakv3i3nl3ospwkwlzp7kn2si8zim266n4ca1y5nipnv20loikgjgzxl96qclhzjzdd4a3fxxk7qisea4xm2t22ac2bbqasn05vjxsqpp9yfmstriw9m2sks183r6yyoq09jywi610zw7nlh8m5cmvxcunyzhbm7jsptmdqgtqpdtp43j5b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94',
                boundedContextId: null,
                name: 'cr4pdiivfx7hmgznl9r88p0qkgzh7it8aqnnajckv8ikf5zol500evyki7w2nwu5be1vykwcolg5541k741qgzzepe72m9nnu6icpcz01knx3xfigj7hsz1r8cztugudc1yng5bletfgol9k5p3k46ylhr6qbrlta8fgvcv0vn7sckuiakygb30y638azjdj7eceqzltais0grf1pcthskca2ceyl69jyvvez3wts7wsy3diobcqad2uwhx2fr4',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94',
                
                name: '5invkkgmuka5w7gjp8dwa4tizci76r2m9brx3huy1soejhhsupfmsmvidxusefwciwsqml0w6jhs4edgwyfv9pej6dvacsy83m8i9iwrz0aob1lnn1wcvk01d1lqnfbjy9gsw1519rdii2qz6686hr21c4bx472ym23n4c7sisinbi6w3jddl7985r0wsa8t85trwf3mciuaxmx15vrod9vc8q7rbfqfepgrsflxw3wiwxwofhvrbnfk3sxuco0',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94',
                boundedContextId: '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94',
                boundedContextId: '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '4hfqbeooe6yxfusjvtbpauoh1yyqpx0agpj40',
                boundedContextId: '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd',
                name: 'kwkmpwl36kuqercyta2f9g5hoyhh52vhx9nbp3u67mc1xbmv05eyt6e5t0xej969rxqulnd83p93nj1donqomhy49sakb0pi2z3jap9ozhb9dnmwkho1d3u5rem0mhtkkyyne1w461v6ebru0eu7kl4nc48pqscd7fqp6oc07wcz39m37hmtcuo0n795ooj132xde3cznotoc4blc9mkrwix92go09rypirt5bud9oixyvfhaud9xcss27pfki7',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94',
                boundedContextId: 'ee8nny6qzntsiaiop4kid6o2mkorqlpdkv8au',
                name: 'gkow6wzay31vrmjf3k8hx5zrs0o03ms17g4w4r5y59sacxd7knp039s46v3st32ttxc6z5fftvxcoh5t4lx6x4jz6sg5yjhcq5wudi4r8g5x0dq2c4sb56ht2cimzy9e5f8gymg3vawjd3nl1wwpxkbt8wgpg6d7x5pu2fplvqctrohu1c50nvm2hnumeppev6brwd3zmp2kb177yw8wmfvrj1bzxl8b3xoh3hu0szufj3v8y7zu5wgpd0ohp1n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST admin/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94',
                boundedContextId: '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd',
                name: 'ws7ha32gk3kg1finp9e4mzpmawpv7yt9hvxp2ds9ya10qkkgt4wny7ettazrsjdjd0du0dkdqu0ecr3c990eqlv570s0bsr93vkurok1skym6h4ehipslzqvagpq5156lg25xkzyl3e0mxs266yo22cdwn9jw0bqy9obi8itj0ec5xn3eedfj669q0oz74orhl91p2kml79s3z57b86431w7fncpk0zx2ojee21w4jcuh36qvc4yt3hbes3bzkm5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    it(`/REST:POST admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94',
                boundedContextId: '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd',
                name: 'kiup9e3a4jzrtg979eojqxokdvrdo1lt8ji06mrq8gr7tfi1lwlctrxbgkwnw1z1ml3n02yldox6vvlvx9wau36au8fx2now3c5v68gxagxt1olqc7osf36nimg1yajm2rs937bf9dxfnni2q5dsaagpdj1d6bhro13nxzgwcasfyr7w1s6ylhvdem0239oqyyr4nvxjiufb7ponpbhqjvsnfu6jn4h5kz8m6w32spblu3t5ngi4rvwhqkyavan',
            })
            .expect(201);
    });

    it(`/REST:GET admin/permissions/paginate`, () => 
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

    it(`/REST:GET admin/permission - Got 404 Not Found`, () => 
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

    it(`/REST:GET admin/permission`, () => 
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
                        value   : '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94'));
    });

    it(`/REST:GET admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permission/0ef77df4-f553-4a3b-80e2-c4c0ef91ac94')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94'));
    });

    it(`/REST:GET admin/permissions`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '6bc46008-4e24-4c8e-b00c-00c5aa18ce28',
                boundedContextId: '059f3bcb-dfbe-4168-aafa-742c0a809abb',
                name: '6d7pv7bku43h3dh9rn80deowgceh4yc70dfoeivpecjbxb1pml56w5x7z5gu2m7bu41pgpyxjs25ovycy81fey5w75cmerqakhstib3ic0cwfmdaxjf5g2cwhvtfhs3sghzk8db4tv18447gye801qf6zxynp6vhze80xb1888tmtsx1qu5kuds8lvr5ng8ov64om3r2bn2ndx96pgm0o7tknf1mimp10ym8s0hjuncvuxbgvefju73h8s4tsav',
            })
            .expect(404);
    });

    it(`/REST:PUT admin/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94',
                boundedContextId: '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd',
                name: 's9bxqeroiium3te9wobiu03aw4q86sxuacuk0xfl7g1tgboh2492wfpte38vqa1i1h14l81w8vum9z5dfqmsrznddretkgqd0bhaujr7mw94ckrbnhsgxmllyll24effnc66j9rgpyprbl30xzvcxat1ymieva9ln4m3tjy251h5369201g9dy4q4l6r036ou4kwzqhoiq2apvs6ssci2sma195nmxfvslwhbm0b91osuor06fuvpx2og248qda',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94'));
    });

    it(`/REST:DELETE admin/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/permission/0ef77df4-f553-4a3b-80e2-c4c0ef91ac94')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreatePermission - Got 409 Conflict, item already exist in database`, () => 
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

    it(`/GraphQL adminCreatePermission`, () => 
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
                        id: '72f9382d-bcdc-4f76-ab9d-f1028ac3bdfb',
                        boundedContextId: '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd',
                        name: 'yj2s4wld20nvba5h73aeda7cqs8f4ig6z7wrjfoz2kba5q3gtepr85bb3qdfih7f897el0swsjdmh3u4y6pwz2kumkhwod8y1jxoiafa36m6rymdjtj0ge1yfd6o777r6iqfhabd1h5qfvdx6gs6kn6etr5md7vhx9gncdoht4u78i9q1r8xl8grdjqgl3b23ql33n665f79rxmfryczh76rpj1rus5ppvy2zo26vxbt2mq6y29z9kzh5d87dno',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreatePermission).toHaveProperty('id', '72f9382d-bcdc-4f76-ab9d-f1028ac3bdfb');
            });
    });

    it(`/GraphQL adminPaginatePermissions`, () => 
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

    it(`/GraphQL adminFindPermission - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindPermission`, () => 
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
                            value   : '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermission.id).toStrictEqual('0ef77df4-f553-4a3b-80e2-c4c0ef91ac94');
            });
    });

    it(`/GraphQL adminFindPermissionById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminFindPermissionById`, () => 
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
                    id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindPermissionById.id).toStrictEqual('0ef77df4-f553-4a3b-80e2-c4c0ef91ac94');
            });
    });

    it(`/GraphQL adminGetPermissions`, () => 
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

    it(`/GraphQL adminUpdatePermission - Got 404 Not Found`, () => 
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
                        
                        id: '05dcc23b-3abe-4257-87a5-619230e54659',
                        boundedContextId: '405f76ae-f273-443d-a03b-f338bfc110de',
                        name: 'p2y2bri7e5sujgyhyd5uw0ky8c1io7ancmg8c0cwheepae9f20xmnonct4r19iemmlh115ajiqa7f1si5evkpzqqp7xttecoerubl9acqs5r7b0nidxz8ajs6e7zcrktyng4an087elcx5hq163zzobpdyddauxb062n2gy0x8az2s6moldri6daw5kbpcvkrz3dpx46o04ppgcjzun6o2nrsi796l26nti8o2380whgn4hsgywy9ah96mdhqt2',
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

    it(`/GraphQL adminUpdatePermission`, () => 
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
                        
                        id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94',
                        boundedContextId: '2a301d1c-e2a3-4c10-bd9a-e4af53717ecd',
                        name: 'fqh2flvo1ya2xddus22d1yx0tt9142dsaqhayhxvsrd3h6x6g8kwqhn8je84os3huh64weiy1vcbthqfp5539cqcbg156waq9qiyc01rw1g153fw06ziar49krjl48mqyyujksrtflufbqse6qbe735dyhpczi6klfkpmgh8jbnhrodpz7jzwwvzv5wcfn67q9o2fa42j5xy9712e7vfvyfeqhet09k62tjnlx4n1cs19q3lkpzu8krxzsyfwfy',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdatePermission.id).toStrictEqual('0ef77df4-f553-4a3b-80e2-c4c0ef91ac94');
            });
    });

    it(`/GraphQL adminDeletePermissionById - Got 404 Not Found`, () => 
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

    it(`/GraphQL adminDeletePermissionById`, () => 
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
                    id: '0ef77df4-f553-4a3b-80e2-c4c0ef91ac94'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeletePermissionById.id).toStrictEqual('0ef77df4-f553-4a3b-80e2-c4c0ef91ac94');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});