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
                name: '2br2yemydo3nkf9txryymmzm2o72ictoza6763f375zhpudpdm0vnbxt9es48ix5g8jjzmmtw2zkc41fq1s2uk9xol1ueer9oie4nobmpf7ytabqdknijzj3tlcmndabo5lsl0jmifwq6828af2jmpndksxzs9iho0xfb5bq4tk82pil3aqrra6ldl43gk17exuefd3zj35w3f44n3pmue7u0mqr7v1i1783z5ssqhq2vu1qwqkzuoj7offx9no',
                boundedContextId: '04c6a385-5363-4ac3-80e9-6877f7a106be',
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
                
                name: '98ieeymalqsbj1p4pnc2fbb13w1urg8lqbjrj2dchz05tauutxi6i19xaw524pr1v7kjdler9tfanjpk31noatv33peurqoptpy8ha0sjepf4v7mjyc41dd5zl6d9yvjyw6dmytojv2v8afvsiwcnf4uq6jiuxc5zbnevvv6nwjfysaujc7h3jml2cneb0vunslsffqqmzgqxnpc1l8vankq64c72x1vf0cifrui0na2y9tci79aysoyftlgvro',
                boundedContextId: '04c6a385-5363-4ac3-80e9-6877f7a106be',
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
                id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb',
                name: null,
                boundedContextId: '04c6a385-5363-4ac3-80e9-6877f7a106be',
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
                id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb',
                
                boundedContextId: '04c6a385-5363-4ac3-80e9-6877f7a106be',
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
                id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb',
                name: 'qnjlw2t0zjuffhebf98mzvhpuiw7iy84mcr0p7o1y5ss3279ile6mrh8id69zqpvnsi5oqz1btuv1penqsj267ytpc1fh8ye0i42p857xwniybyppkb66b4vx9vnabfmh1ho9mdk9s2zjqzzd2fw262ck7hqz80x9l9xlln6b0hzofdxss78colriurmvxuuhp59exdb7hrtwwo2vsolg6auxils1z7f3qy99a9lvmkmymprisp84nsqt0mixsa',
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
                id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb',
                name: 'zp9pkcd2dw2ayfbezmtk7fa4off7d1g4bhs0zm08rbll60cbnbe5ef0qxlt6n4zmmvk3zn2l93w9bpkcssazyxnqhiftclxd8jo6roy01eacsesoum1ueu079q4ojqda3tgstcfg4tjrij3or9gku0sk08tkcnfy8bfdoqubr4z0olyocvajmcrfjqogozp3fnkyltjhr0g8u2gik09uepo8nhexkkn9zi2ccx2weko379ctpq4djeqe2ue6xbz',
                
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
                id: 'h207j4fx84qkgbz0jmw2pe3bj45nwneec5asa',
                name: '1cmieja4vj4c4f2nrrp34sknhewhal9pbhkqncac49vgn1z4b8ws9mg9lmg8qqsyc6088ec5i89pwcsrwymj83blk5lw3ntpob5e5i4c8we1db7ff9n3ox9b4gwqzauyp9t2anyw0vff6lr4mgdxc860gwsmj943m8nztjwc0rhjoqsucf40yk3sjmf4h24hlorq9cofqb81gwbtxi3xchcwu23iupjjhae7f9t1bvstg0icl75kzlga33su4yv',
                boundedContextId: '04c6a385-5363-4ac3-80e9-6877f7a106be',
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
                id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb',
                name: 'typmvirhnpw7ll4fqrdjb31f5gr23ijtsl73anxktser14n3cr702jspyv9fsnlssmpmsg6i84dzjagw51ev9pc9h6wdqrlv2hze7e7pmdndocsudr3kuxm6ml91ijv3ednyz4dz6tqv0bzrwa0viu7b536vq9h8dn54gjcngaa8tyblgyt1lsv5uxicobx16lc475f62nfzx41vrv0mgvcb1jozwsr2f4mhqmqulhkmme48bvb7zz38yfu4k02',
                boundedContextId: '9bs7u1kj2w2bmx0zn128gvv44x9d0ufwrtnyp',
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
                id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb',
                name: '2hvnlszxk92mhdppn1wq8xqfmuzxjbq37lo098ty6yqhe1qwrp84acxlyoq1t8e25ik42cee63wahxxyyqahynwe3yqx6odfi9zo8rf4oqv9u7f25e65gh402bz3qteu70bo161dazl96pk7s99ymzm6pjxxib6ihasfc3xy5jjylh9xoru9x4gblu8c34k0kebqlmdgjauagazczjvjdlch6y1x7e72emn1e2jzaqx0qgmjfcfquid6glzf2b6m',
                boundedContextId: '04c6a385-5363-4ac3-80e9-6877f7a106be',
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
                id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb',
                name: 'h8x1wuwbvdji9dfjeytcimq8t7pye56th0w68zpogriyaw8b9o7w2w8e9stzufmxf2afjc9wme7eakbsjkfra062xzszx0g82vit8fb7um30ty7ks59bu7jjexg38ksh9561ls7fpqht9txdooaqe7xkjiqc1oumjf1i8v8zb2iequdg9bbeda2ui8m7bkib0urhc6scfmrjt9jiopg6jpp8e8i1kwlpsr5t72gugk573u9f612917gfz2yaixr',
                boundedContextId: '04c6a385-5363-4ac3-80e9-6877f7a106be',
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
                        id: 'f3857043-5fcc-4fba-977e-d43c81d8bdfd'
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
                        id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '90e0e367-5fb1-4a6b-a68b-6deb56c706eb'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/d51c93df-f6d3-4588-9c7c-e2f974433652')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/90e0e367-5fb1-4a6b-a68b-6deb56c706eb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '90e0e367-5fb1-4a6b-a68b-6deb56c706eb'));
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
                
                id: 'a86ef3ce-d86b-45b4-918c-7a19579a085c',
                name: 'qcxcsaxhrwghvt4qkqq2njy8t9t98fsx7p0cw9k0uvbq96w38e1460vsc6bxmdu1nisnftfcv7lgloi9wvx5dk9tu5hj0io52t4yil6yfh06lmyjyc4q2rb960x795t9ha9ytaaxey8kwtq6bqm5w5mlr1x4tlknql7h3sxchaz2pymkf3en845gb1ebjwdzl981ktoo7zan93bl70ou3urnc3tnb28otg08cu88zuzm5m0gj1g5a7510qmtpuh',
                boundedContextId: 'da9dc09b-ec13-484d-b4bb-31f1185f1e98',
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
                
                id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb',
                name: '9hpef0tf2f06jis5iz59erukxpr37bj3s8s6w9trck7jyyal11hof4htnd8jg41kcy0j3prpbai2ilkqln7ph7fn0u5yu9opu163v3kjajszlxq0rbgw6uxmklqvtta8uzin8a8vny8jub1f6koo7yzgzvb14lrh92r35kxu4h1ton30vn0gv4242qyahbuh2ynonh5ryrhbemyj6o8g7a8iow8zflxfr9mckf2nfm815mcplvohoccx0gtd3do',
                boundedContextId: '04c6a385-5363-4ac3-80e9-6877f7a106be',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '90e0e367-5fb1-4a6b-a68b-6deb56c706eb'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/5e3bf4dd-8191-4450-92fc-9abdf6acf43b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/90e0e367-5fb1-4a6b-a68b-6deb56c706eb')
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
                        id: '7a8da473-90cc-4ef7-9520-b7fb5311fb20',
                        name: 'n5gdunzsu8eyik9q7g1pw6e8xfi34mbznwq3c87yuo4j2p0s3y515cok9o5jhc6l0ugf5nvg1v5cvbl4h50ptvvvkotrf80nreljtx6wempw2clhpitoo4brlpf02dxzve9w4hum7du6p3kljr2i19uvgxk2smq8m4gssrz1gy85x9rfme9urn58g62t6blz7c3y9jyqzflx8bf6jr3zb9jfvhidqmcmcwu5c18dvorryrbhtyneaqmwsem33ri',
                        boundedContextId: '04c6a385-5363-4ac3-80e9-6877f7a106be',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', '7a8da473-90cc-4ef7-9520-b7fb5311fb20');
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
                            id: '315a682f-0ec3-47ff-b5ed-09828d457ffa'
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
                            id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('90e0e367-5fb1-4a6b-a68b-6deb56c706eb');
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
                    id: '0a71fab1-8c85-479c-9f0c-7e0277a86de1'
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
                    id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('90e0e367-5fb1-4a6b-a68b-6deb56c706eb');
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
                        
                        id: '9cb17001-e588-4eea-b68d-86e6586dbb89',
                        name: '9xekwe1c9ploj4p75i96f1jaq1yy2595rhy00pg61met8ncxx0ws2w6tfmdw4psamprxona1yjvo4srgc17eq3xrw63p2ljgtejeuvfnpyb4dr3csrevfrbghms9npd146e5gwq93eguv66t155fq6itz3q0c1mv3mbbjowrbgf5fbe0l0sddv920ioaa4qosz1adepwav014nowztrijtdrxbroxo6drfvt4wd4z8yrrjpl2brw3yzflr45t64',
                        boundedContextId: '5c88b7ff-ae68-4e36-8660-37e74d34cfb0',
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
                        
                        id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb',
                        name: 'h1brlbr5vog3njlwm814phtcxvyas4onu10tufjj8pthq09499sdrljrll8lbjgcjzgoxig9rnw4zjorvvdmozfyxpowr4wsnqdakduwo40ssyusdwa64yp9tmw3jdrdhzbm2hegseqtqq4360892suhkgffxiay1wppi0qtn9k3xfvftk74go5rrk0h5jju1aa77xj9rtcd9s2l6usvsvuy4p5sdej5n4hl9o3i65cabsi26ulil0xpc7u34rj',
                        boundedContextId: '04c6a385-5363-4ac3-80e9-6877f7a106be',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('90e0e367-5fb1-4a6b-a68b-6deb56c706eb');
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
                    id: '9d83e320-9d96-4624-8720-4b86d72f7991'
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
                    id: '90e0e367-5fb1-4a6b-a68b-6deb56c706eb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('90e0e367-5fb1-4a6b-a68b-6deb56c706eb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});