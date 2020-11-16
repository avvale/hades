import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPermissionRepository } from '@hades/iam/permission/domain/permission.repository';
import { MockPermissionRepository } from '@hades/iam/permission/infrastructure/mock/mock-permission.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
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
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST iam/permission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'hs6j6cqncqex784wkwowf3vrtc4q4zaa411jvme7f0ssp1hbuv5hkkx7xug3jig5l9fb5muwh89o0ww998q5w47qranb0rs3yonmg9vkhpdoknk01r1b4n269xemnx5q26398n29ferxd2y360p145slv09aksxiq382u07ur3w8j8cc3ua6v4x2r7vfk9ke1f2ubnw29f6vn2dcidttt6vjwa1tx8uy53qzbm72jt7tnlu5wn1bv7n04jdtzlt',
                boundedContextId: 'cd09d6e0-8ce4-4ff1-81a0-af944dfc574c',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                
                name: '06wjgl8sgk211n0t87tzf4juz7klq0qjmiw42cf745jewreeutv9kck92dymmhbbddya4v9zmcc7xjxb3pv6xhy4911r571y7ts8lz9dsci8j7gcvzqncrc54lo758lr8u4jc8mzpko5k9i30js8l2cox114h4nkaya1yj8595ycfs6gq3i3teeu8sgnchcvdkojtiyoi7anlm3io7dkttimccyhg2wgxq6t3cbx59om25p0xw97t6h7q9gy092',
                boundedContextId: 'cd09d6e0-8ce4-4ff1-81a0-af944dfc574c',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '325a065d-ed9a-47dd-8359-3a23daad9ca7',
                name: null,
                boundedContextId: 'cd09d6e0-8ce4-4ff1-81a0-af944dfc574c',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '325a065d-ed9a-47dd-8359-3a23daad9ca7',
                
                boundedContextId: 'cd09d6e0-8ce4-4ff1-81a0-af944dfc574c',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '325a065d-ed9a-47dd-8359-3a23daad9ca7',
                name: 'jmh2wy56o3bj613m558sam6r3mef098u5qdbiypduvy8rdym7o6ft68zt7e3q75txayij9g34zuzzne9valcllvzsw6e1uwpjb1xyo8np7e217cfcuzh0oo0lrmeqimvo5v1ddhweqola4xjjpzwxzgfktbnx86j10t7agr34l8olr52yi9u7xqg2kq7kz9l7q7ntwwdta9ew56o0h6ax8h7k9ywwajbh7o821dydga3ucwnxrcpgs1p2kq9sjt',
                boundedContextId: null,
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '325a065d-ed9a-47dd-8359-3a23daad9ca7',
                name: 'lgtga8ixzsjmtbzuq8wcuwmscg87lmyu6o4yduk1bqda6yavo2k2ujwasx5i2yds6hq9rqok0jehgs7ifxmbpnqlqltukew6vweramc23z4mg3c36omslx82qubvl9x4igvt46wwmrje99vqnxbxqagsk37dr2ph59hxsgec6e2w1aqq6xlhvgg5vjwpbpkud87f9xr3r7e7pshqkq6mdn1e48gypcv9mfzhxunkxlyw1iw4uweqozljfllly29',
                
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'zy91hkvuqn8kdy7moptmdcziiop1md52wzna3',
                name: 'dq5y9d7vuqko6uk04clvl0o5emk55a2tpmqyusl2cg6b6fk34c8edg9sirvo3sqestuz5u75dxt4a3b764f62n0aqcd5s6tw0odq7l58vpvmi8jgp3pwywskn1drkh7epdm6uochqptfur0h2l903uldcxxz89qqzfqlo0zbj6ct5veg8jc41yw6zv4w87mb56zohopwsni10v5zkxq1ld2cqqieoowwmntnvqe4yhu67k0uu140dnl5harw5zj',
                boundedContextId: 'cd09d6e0-8ce4-4ff1-81a0-af944dfc574c',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '325a065d-ed9a-47dd-8359-3a23daad9ca7',
                name: 'z8t2s8osnbvmybosp8y0zcgem8ul5f7yvivi13iuuyggw4d0ueqn3606k9mswteqxnyl29rmq3fkgpsv1znxs3ds2lllwg4auf8yhldq7hy8rsv0f78x3835txpu9crvroedlhlsfm9btu93xldm9sd4imj0ah63vu9bs5lfkf1sgvnh8dwu9t4rvbar51pj2pq9rgsgj6cs4v8i8j66ds4hfw9g8u70nia0ic6kx8rdhov971g8fo4znsbwrro',
                boundedContextId: 'ww9tmskh7t09q5jmybkieeaqtv0pxeghzf4fu',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '325a065d-ed9a-47dd-8359-3a23daad9ca7',
                name: 'wyjpncz1szavtshompd288evm9dl2n4al09by66bbya5x57wmbfya08jv7o0au1lr3rzygggg77d2i7ast8bpxdk8wmu7p3ny7g4vniju1et66m6s7p3m55ha6l7rwcnnzyde7b3df9jrbuumvhpqhyj75itvucjalvxureqpad7qw6r00nf3oqjo0f7h2wb1wqc33rz2h698wezwqmmyx2604cq7gbywoasjzscq7822lonvm38nka4kfrktbwo',
                boundedContextId: 'cd09d6e0-8ce4-4ff1-81a0-af944dfc574c',
                roleIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST iam/permission`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '325a065d-ed9a-47dd-8359-3a23daad9ca7',
                name: 'uk1k4wzphsnh49w0sya8fsb2djc5hlzk6gp0ji2mgkzx65y89vwl6bccm55xx6gvfc96jcfs9upmc4uajakuicpmfo35xceee746x6w2aiy2x7wty4rj5xpwm9bkbqdzrgdaskaswtexqp9wwk434ucprcs4qfr5ppuclcowe51vgtib7l2w422xul2hlbmuz5ivbt1oyokatc80l02fmfb8ynvr3oqgi5k50nsh0k6rwdzjhz663uhxq83gpm5',
                boundedContextId: 'cd09d6e0-8ce4-4ff1-81a0-af944dfc574c',
                roleIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/permissions/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permissions/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET iam/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '15e59483-55f8-4057-af91-7ab98db6231e'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/permission`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '325a065d-ed9a-47dd-8359-3a23daad9ca7'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '325a065d-ed9a-47dd-8359-3a23daad9ca7'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/04192b50-6042-46a8-b9ee-08010b422463')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/325a065d-ed9a-47dd-8359-3a23daad9ca7')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '325a065d-ed9a-47dd-8359-3a23daad9ca7'));
    });

    test(`/REST:GET iam/permissions`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/permission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '181d17b0-3bb0-48ba-b6da-22307f4a06ce',
                name: '7bythqol38ourbhsg5rqi8glv4l5hb9xxteqsjsxkxgs9kbllqof427xx6uemy8czvritnsl610iy806i8q7kixrpspg0vkxoy7rh59ulfxyd8xmye7vy9nkrlbh92wgrbnwuo5wh9xkz7m0mokomlslkj1yzdb3cbw4zgbogg94ku6w184du5pl8nlo4rdfkaigt79d9r6ij24l5o7bp25ase1g6e097wjhmabfv2r67i6r8j5k8oqc83f23iv',
                boundedContextId: 'f4cdb74b-d400-47b2-9af7-e99d014af38c',
                roleIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/permission`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                
                id: '325a065d-ed9a-47dd-8359-3a23daad9ca7',
                name: 'ln5bps47dhydeusrsqflfqakbq36451ta56w57q6apx8wy0qs2ta03ucxjkpry8976onhjof7fhh34enzxa6ymnjz7u157sqtb42rnh6mg6iqftl5be7y3rlq2qxgkc4da9tim2953w707j68s16tntslqe7buz5uibaa0ph6lv9su6d7hafkj30lyiipze90t8amrdsc6xqlikuxj7zug2b83k48whr2n2ddd3xyt4hi5ppgoelfp77vi25b8v',
                boundedContextId: 'cd09d6e0-8ce4-4ff1-81a0-af944dfc574c',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '325a065d-ed9a-47dd-8359-3a23daad9ca7'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/392b20ec-268f-4998-a0a6-fc8b25eceabd')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/325a065d-ed9a-47dd-8359-3a23daad9ca7')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreatePermission - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
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

    test(`/GraphQL iamCreatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '2858fe8e-297d-480a-aaa9-9fe4e5d8c24d',
                        name: 'ykangxdk0017dyxptcg07a0c2faoz43c2940xnl6se3wffnib43diy9khdyvi966fmm2ro1sdcc52i1enk0jdpwx0z6v8fgfegw1mjtob0o38ijtz0mr1p4izwz6cqtwwgeyikqonm3btsgn1vc1xupmuamaqnj5qv1e347mxhhwpebms7va5bkj94x6rk6hsi3m9itxtknhb5z2g194vpwpsyioytg7nuwl6n4ym0tkcyth3vfd9f0cei2y0pu',
                        boundedContextId: 'cd09d6e0-8ce4-4ff1-81a0-af944dfc574c',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', '2858fe8e-297d-480a-aaa9-9fe4e5d8c24d');
            });
    });

    test(`/GraphQL iamPaginatePermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginatePermissions (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamPaginatePermissions.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginatePermissions.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginatePermissions.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindPermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: 'dece1d6e-ed8f-4a4f-8143-b79895e42576'
                        }
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

    test(`/GraphQL iamFindPermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '325a065d-ed9a-47dd-8359-3a23daad9ca7'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('325a065d-ed9a-47dd-8359-3a23daad9ca7');
            });
    });

    test(`/GraphQL iamFindPermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'aedfbb71-a4f3-45c2-9d2e-ed0819da7193'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindPermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '325a065d-ed9a-47dd-8359-3a23daad9ca7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('325a065d-ed9a-47dd-8359-3a23daad9ca7');
            });
    });

    test(`/GraphQL iamGetPermissions`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetPermissions (query:$query)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetPermissions.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdatePermission - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7aadec27-0866-4e84-b82b-8bb57ffe8dbd',
                        name: 'ti316whar2fhr0yy4q4qhlmsatpvecdsxsdv75he7hupvgvg1vb3uxbogeh4vwvyc2clr0259l9wzf2nf3armoidebh6q4p92enl5zn9hcwy5em5kde8zkwsmsck354is6t1qmjjuu36s5db6dpxj4n4kojx0w7zo512nf48b2s81fo25uourhfnypkd720a79rb5vgnooxv2jccxvfxacgrg0h6xw6rxq05eaz0ynqnezn5y12oor74w2xu7gk',
                        boundedContextId: '26ed6cdd-a1e7-495b-9f8a-834cf9d396fa',
                        roleIds: [],
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

    test(`/GraphQL iamUpdatePermission`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '325a065d-ed9a-47dd-8359-3a23daad9ca7',
                        name: 'na9doadua31s5bnlafnvyfgwp32tiejbkc6nv4h0n6qaog35he73kji7nd2brpl7q4b25xp3sg15qlgyu9ivtt7ion6lp80iycf2c96unne1efiky7hh2hftsmmun6541u1aj5fcj72kr1n2sntohnd0x84wucyuuu66sczlband3s7u4qwru5ilwey1eynjvt234b86qh74xv4a2cjhkc3vmthd0khwhxazymb3c49c851pc3tjqmiuu0bxl2v',
                        boundedContextId: 'cd09d6e0-8ce4-4ff1-81a0-af944dfc574c',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('325a065d-ed9a-47dd-8359-3a23daad9ca7');
            });
    });

    test(`/GraphQL iamDeletePermissionById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1bbf2a73-4402-4984-a571-7885a4213d57'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeletePermissionById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {   
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '325a065d-ed9a-47dd-8359-3a23daad9ca7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('325a065d-ed9a-47dd-8359-3a23daad9ca7');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});