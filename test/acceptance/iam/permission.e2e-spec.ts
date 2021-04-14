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
                name: 'ttwtkqnnk262xhi0r2bmngyi0njhq4d6lk34vigcbuf7idz0998xifsc7usqlii04mr00g38b2kru25dka1czb6vil5gx9mnuw215so16y2iah62fgj2l7zpoepa83au59jhqgglsq3kdtc57cu3bdhdtz0gs5mbpletb4y8c03jtpv6ylc5p0e922rch3vxpxw0r2xce5p1butm41nekne4c2wtwxs2wr4hv8o00z4ntm7ltdusp3ct1ulq0r5',
                boundedContextId: '486dc1b1-d5ff-4baa-a9fa-9313a66e50d0',
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
                
                name: 'bb5luk7jjpn9ljo0qjf0xsmf9yz8drlt93g4bgmkxo8ckdjk7c905ee92wjrv5rz68enzeg6k7codpgkx6nouy0ak3u3mh4ixucttr1f4ka1qakohbu8s316wn9icernt1tcx8nvi2kcw3kujxbh1j0vfnber62rzgfoe4d0lx166fhydw0mpvn6ja2ila5fecybpjb0a7ktfhszisx1me6lbzbvir7zh73511ela95zbpyra58zq0orc259in2',
                boundedContextId: '486dc1b1-d5ff-4baa-a9fa-9313a66e50d0',
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
                id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722',
                name: null,
                boundedContextId: '486dc1b1-d5ff-4baa-a9fa-9313a66e50d0',
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
                id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722',
                
                boundedContextId: '486dc1b1-d5ff-4baa-a9fa-9313a66e50d0',
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
                id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722',
                name: 'ygbh4io9bx3py8oq3wbxpg8h8fmodbpxxsa0ccoq0d5u8g3t18r2vyxn3qdgsypzuysb80d45wyra0scxuvra1uz40m3we0tif1zich36zlpx7gz0l0yn04usts8e3trizw94o7c27ag3uz8eod375f603h6ns8rdr1ocei6oqnit72jcqmmf8m2wb72e687l9llepa1oj3g8wnbsk9v6m0bwn1dkqwubjtdf4htutvcv1l88q569u0lu4w4s68',
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
                id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722',
                name: 'pd64xi9thrc3hiuhra7uuf6tx08ejlmzt0rkktav9u3k8mk7rq507jaakmfecslrk11bb4iwy11oogze0xbixfmqp4jjogyf5acfabjkyowryw6k0osyb3gad686e3hc7ggfe2iutf11lu1vyhzoayajlu50jhwpyn8arze4v8s56l42kut6k4tg0azlytkzi8b8aqso61by784j7rzfofwtk4obtbyt4i0he7irnb39tlt2lgby42y1nfzq7jg',
                
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
                id: '5mgzt6x0lorypkv4s8olsbiz30dmgka21deoq',
                name: 'q1ujx42e6flj4q721wzcxlu4fspdwr3dhsz0e33styyco1ckh7nwct78ci8a9y09ueqo6uduvibmvhrlc4sdh934kh4z6atah3kose9z6zucuggppnh790413jppr23dxu31bb7lrhsw71pmwdpkmjvgsevq5fp9o50dqpi8jl2am5nxw23z1f6jdljreclo20fhtzk1d7ft8pep3s8bgytpzqntc9c593ga2c68uor7qzz3yfo8d4599q7wo4a',
                boundedContextId: '486dc1b1-d5ff-4baa-a9fa-9313a66e50d0',
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
                id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722',
                name: 'jzdzncb7jsquy30hwtphm0kylmsd9f5htan5uclt2l93pp58tct5x0pf8wapvsrukt6hlxrjhnxg5tj8zmw8dux7wufjncbpfigyid75i1kdq1zttnkde84ah8yrp8j7qubr4j1vlf7eps6bjubzv02p7ogevnvv82aw3iwk7knlncqjil7agn4vtdxabqz5vsb30srqmbklexrdfjiqc8p1acn2coi31si81jwxoiz799jh0zun4tx7r25a920',
                boundedContextId: 'g0qrdfiymekukwhlb15jnhq0q6a8skcs56fzy',
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
                id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722',
                name: 'oeur452dfz7pchy6fn6vn6oskm379ie55cqpabfoky2272s5fqto5wpbvcy17khpjef389rgmt8empt9bl3y9m6pf1l06xc3gu2bl3u417d8ec52mm7zzkdx5llxcrerko3oitwlpcfsi9za2x5jrmnpoh6ghs7m9qq4pwnqip02pzsjfi31pjwljgoktf82fgt775uco7ajbmcxq2sbbi02ebwtzok6wapt1a69p1yctmkz76qlv1qcymqj91jc',
                boundedContextId: '486dc1b1-d5ff-4baa-a9fa-9313a66e50d0',
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
                id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722',
                name: '5b904doaoiucz6e3bpawa2008pr1pmw5v2t1w206embvo1xpikfmkct08d9or6uq71776o4y318272pd80tneeql4hy958uw5yfj95v8m8hen958i772lyze3i6z9xeywhjbgpzxz1p5wt2ip43yg3ayjmsp5ovg93r7mv5meqv1zbrqfpcsvoopnrqgvazf64j2d60wpknsxdxugwfssa484iknk6voer642tmgr3ytod272prvy5daq299o90',
                boundedContextId: '486dc1b1-d5ff-4baa-a9fa-9313a66e50d0',
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
                        id: 'b20d7f0a-2c52-46f4-a74d-2d49a8e5ec25'
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
                        id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/d991d3b4-2f56-49c6-91ea-e69ea7ca21bf')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/d4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722'));
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
                
                id: '5ab72083-8549-4547-987d-76aed70293da',
                name: 'iukqvgdu613q5xchocqdzf7w0zfvj3zcnl70fa3xd1dpxswa8y06eqg2nacn0n24phf0a11pdr4yttano30yk7p5ox6cfqm6rtjepq7xzzw3fktcis5q7ki7y5y8h0oi6bhjqes4lpffhabvjfoh51sfoxc9j7mrs02hihsgz7mc2qgecvcgriyndb11hhw09e97dnkv8ejckg3cg7gyjypirh7z5q326p9ntjfsdoeguxseylg2nb9dk968vcn',
                boundedContextId: '9d6690d7-67fe-4473-a23c-1a1082a4f231',
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
                
                id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722',
                name: 'iquci2kf8nbxlfp8a3d1w2a5bcvzlhdfasqtk3vasuamvthmg1u4ynfss1j7wywowwc84519na5hdhw30jlxz1oo71b6ghuirfml4o9i7v5ap6tjgi21xpblxnrs2druyc7qp0ckzo2td2mwt5tj6qdkuvah9q15s0bm0f1u50k1x65fh8hl3st1flykcuah6y7cvu7d9mhzkhe9uk7ymzir16ivgeih4a5ejf85bbhdqznuyzbkz79l4k17ov4',
                boundedContextId: '486dc1b1-d5ff-4baa-a9fa-9313a66e50d0',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/a010f2f4-8d2a-4738-9661-c352d256419c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/d4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722')
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
                        id: '4b41c16c-1b7d-40c7-81aa-34b793155fcf',
                        name: 'btej3elhgmipsdrdhyr7g6lcr74iar1kn4eh1edamypdcju7j2dhk2b0ruohar6lvtv3mdmpw4isbhu9gxb9wh6htja1z7v5zenea31yu9ra5ut0a6ogrxn5zpf35bimjv7z2bw8j03s74wxvsf3kzuwlcnh2q4wg9wrza07z5dyl94ji58kw6rulbcdi2oez304ejpwz9jm0pjgomm4cgdsqm61wkf7o5tqnkpbvu2qfazpxb10ux7mzvw1c0b',
                        boundedContextId: '486dc1b1-d5ff-4baa-a9fa-9313a66e50d0',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', '4b41c16c-1b7d-40c7-81aa-34b793155fcf');
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
                            id: 'dcc6da90-b79d-45a9-b5a1-b890cba710d4'
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
                            id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('d4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722');
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
                    id: 'beb276b7-2194-4c59-8dc0-a45f982daf11'
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
                    id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('d4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722');
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
                        
                        id: 'd84aa29c-1d2f-46d8-a486-55c39084e668',
                        name: '0iqc9o8r73xahba6wgla6jzqzrwblwh19d1k18tfshnjf34ufzn1rav38021u33xtrgyh3ma59ltswd7g9dusijjkab0u8bcguefst626eu57a6x09858urng7jb0m6t78qnxonv4qmq258r5hwwq0uvshewv1q1xz0pwz03ysnlcaywraqlkoqokbutp81r2kqpxgvaaeb7b1rslcosxggo6fy99d1amhp5pz40ekp5qca320s7g4fkgn4yhi9',
                        boundedContextId: '8fdaf081-7962-4f7f-a7e5-3ee27b4a8998',
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
                        
                        id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722',
                        name: '5ee8bq7mmuajs1yqcptgs7mz4eldn0icyz4qx05ctzqdvijj7o7xzz7h4n9dq90tsbd5z4dlqvvg709w4hgvwgo3labc6g1mjeazqpmn6eu3aq4zy6l9z7m00f77xnqbabxqzhocus98kmrnolg4kbvgvj3g0pd8ra0hzyydyuael6at2g86zunhuntc3mh0374fq7eytbjvevcg63bv3jpcsgvo0kp24vjbktiiil4kp6hjrijufnjdcfiqcjg',
                        boundedContextId: '486dc1b1-d5ff-4baa-a9fa-9313a66e50d0',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('d4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722');
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
                    id: '97a29074-582e-4631-995c-1374056a0579'
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
                    id: 'd4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('d4f0a87a-c1c0-4d3f-9ca7-c63cf02f5722');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});