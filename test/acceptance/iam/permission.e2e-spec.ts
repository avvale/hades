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
                name: 'vpgie62ogv6a06tuff5r6tl7oasm9l190gzyskkfwh0azprjng5n7f0eygt7lh5wthfbvy7zgle0ikyi7tb2g7s8geikf8mk642lmarp5919tv06zmi76hubd7brml8dxfnvzf55ebpwyx2hivbk30utd7aiwsfai36d9stem14f31wp4n6sl74numiod5kpdaas4ptsq2fosrppyp4hsr1fsugtzhgi7whpy9luicoboh7eyzy8mb0pbm8vz37',
                boundedContextId: '0fb78952-d14f-4323-8f8e-fe7658f45b01',
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
                
                name: 'n3th1dljqklktop3hqd46xwsgvxbaydtoye0lje41i45f7j4kow5mcs36qua4oyuv67qxxdah223sr7pq43dt71gwhklekmrq56t8pg4ust6zvjmpzqy5ngjauoh8ianmfg7vhpbbec6y15hfv6e8fw3rsixdashnskj7zcfblg6vnzon3g4acionzduff73wq2r2lbmwxw9qi9n3967zw3czpt0qk64iwkza45upgxw47j18u7m2nxbo2c5u1m',
                boundedContextId: '0fb78952-d14f-4323-8f8e-fe7658f45b01',
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
                id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2',
                name: null,
                boundedContextId: '0fb78952-d14f-4323-8f8e-fe7658f45b01',
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
                id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2',
                
                boundedContextId: '0fb78952-d14f-4323-8f8e-fe7658f45b01',
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
                id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2',
                name: '9s4u6sx4711qd6ech4rdsuui5sk9mrkwfik9w0gjommmqv0v5wyiq7egqc4wnmb5ky19q4pkux2vao2bre2ua2rgybr3c30h9tz6xclilpr2xlgsif1ewhlczceme2miiiaa5x83a2dccc2e27xjxg2tjwsm15vk1qm8i6nse7nshdw8ctdwrfm7eb6m6bf6ugow0wcioo5tbjc3lyby5w750gq5yuatgcs2tigf5et9q3lp8hlx8w98p60rom0',
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
                id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2',
                name: 'ggu623v4ql6h5za26vvmnezuc89y3fqae6emqwsr20mcvlcfot7ccl55p2dt2r4phz32sy6ihmyqn7oppkk5aunko6v2njre0ukkzchf3crn7y4qepfh9oq77zjoe7861lhf1ubfc833wi9gpds5kec2gghzyd84q4apty77xqk93tpyk6fgrd2c8ceurlu46yen7zi7azzry07oxs3x3qgxijypm23e2i86yl9rrotqj0945bsu5tt6unqenku',
                
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
                id: 'sivjybde4m78yqp3sq34iy8w0jrg24cdu970x',
                name: 'cn6beruxt8xwmoydl1gndwyfxir7d4v4h411hjgojg3o8e5fjpzjstbpw18kmyu4tg7rd7mhdt486b1ydzm0fmzn36t0m9nfyzd66vutht8p5ci7sbk1hh7to66muvxgbk8px13w03wxp42t0pozjlain1ye3st83rgobu92bl1spixinw8hmcbz4un6dx2or6ivhyz75ymo22l7dvjmvo9kr1friz8qd1elzcfo12az3kmrea5la1npgv42e22',
                boundedContextId: '0fb78952-d14f-4323-8f8e-fe7658f45b01',
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
                id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2',
                name: 'xtrq1417i172p16dgx2i1l133ez22cxm7rjvsam4vbhxga1966p8j87ax10dsqjrvdncspsb9hke5ipin3i3l3eekt9kpgp0m2pc2miv01lw23h5yi893to5v2kxnen14hprva4pyizv311mdimpxmqmh2j52uqrtpcvj3hyskx1uv755xyobhbix2fssghd0zdqvilxaw1zqnvl8p9s949q6iyac8yx7kjd3flvuzphrsdoznkf1hge0yz3lnl',
                boundedContextId: '8bbt3cd63iik0tu13rfcd0c3hfrj4n2091gjy',
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
                id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2',
                name: 'a0d8liwcdfjzwjwjorqwk4qsdohzgpgg77nz9ll73k3dxl7l7fqc73f8767hez7gehelzslsboh5gssq62itps1bdd0ulk706fieyuje4nuz5u7v5ba6sd9n5ha0p1ger5jx6oymuof2hnbauntqy6dfc98kpa8uer64gtllutqv6rqbau79n7h4oyuygfzbedu6bhi9hod1ipoi8zullsdbjdqizwalocpxpleshi7792ghmidu2m9w65xgrsnp',
                boundedContextId: '0fb78952-d14f-4323-8f8e-fe7658f45b01',
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
                id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2',
                name: '7eaftsxbhlbxhxod4wh97apzj8sfucs1rq3lm1n7yiup38d3umtsqlfgjqifsr1l19haaa0nylpvknk7cxf3ipnaqv5fvlu5ic03db9qvwlu0e3j6hokcdl8odru8px6gxdvafzeeqxv7uwlnc88jvgthqjt58xceshnmuk4ejakucdefp9w805o3617ybk57of2pb9ykkpuyv55cp6yf1ctytd61tu5yfdxg89uj54evuiv3gzpys2bbmsdrji',
                boundedContextId: '0fb78952-d14f-4323-8f8e-fe7658f45b01',
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
                        id: '03fad154-2c08-4aa1-9b26-0d191ad8015b'
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
                        id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ca1e03a4-efca-4a15-8236-73b8281c9ab2'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/07defa24-07e2-4f9d-b72e-83813e660858')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/ca1e03a4-efca-4a15-8236-73b8281c9ab2')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ca1e03a4-efca-4a15-8236-73b8281c9ab2'));
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
                
                id: 'aac716d1-23ed-41ce-b392-58c12377d91c',
                name: 'ghnplpko5594i7o4kb6xyx7gmc3vgttqdqnhsfsi8lvaw89fbve8d4z498r2d11uo2hbqe88yvhpl7k6bxho4st1bft8ptgd4fi4aanfzp0eudjejk1ioq6cpncfqblvr8wimfm6lrx5imzkduerpx2sm9wm3q35w3k3osn9fs7iksi24n1n2bfak1erqvww7vgxp0quwwje8u3s9vca19gxo9htj71q27xviz87coxbbs6bekocdcq13pud7hb',
                boundedContextId: '5fc59e21-8316-4ca4-845b-baa4dc1245e8',
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
                
                id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2',
                name: 'irqg65b5zjpov8arpa4hxoig5540nrd3lmjj1lt7z0u9oz3wpbkk139qydxpry367136zrlrq0luddajkkg0clevyheznbjf2lizbpa326y4z4mn51wzd6tkd6ss4ruxq9o2tdupvraol066ih3knzsztxwff9qs4geseoybukfzr953i8k0ymdbzafcj6e8twxt10csgx2ol3h3v8k6ly9riz60fwr3mbv43kkc2489nlohlk6rgkr9mluhb4a',
                boundedContextId: '0fb78952-d14f-4323-8f8e-fe7658f45b01',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ca1e03a4-efca-4a15-8236-73b8281c9ab2'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/4c875d12-fe10-4eb2-882e-9316c763bdb9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/ca1e03a4-efca-4a15-8236-73b8281c9ab2')
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
                        id: 'a60eb87a-6e71-49aa-b080-dd52edb4724c',
                        name: 'd2tm9q2s6ow7710rrdbpbohhmiorve7uawhb9y3yjizj5egocc0tf2r3iuqowcjg1kvdu3iiko8tw523yw2s3431nhnj3h568olf018wavj4znk4whh4mlcrza5twvm1rovg16q2ak02gdey7ovr3revyijduo1rtqhvzht5ey3wenm7rs89lujsxqnr4j7tf49zlt4epqujscanbzh1uga3jqwas7bk0igw9zjfyju8g55c053ivqv8m55vslp',
                        boundedContextId: '0fb78952-d14f-4323-8f8e-fe7658f45b01',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', 'a60eb87a-6e71-49aa-b080-dd52edb4724c');
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
                            id: '27fa8146-9649-4b65-82d8-89ca7a08dfc8'
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
                            id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('ca1e03a4-efca-4a15-8236-73b8281c9ab2');
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
                    id: 'bfe5765d-0f46-466a-8b7a-015810aca1fd'
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
                    id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('ca1e03a4-efca-4a15-8236-73b8281c9ab2');
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
                        
                        id: 'd7ced7ec-0a10-40d1-aa97-da0bf83dcd14',
                        name: 'd80dlzb4oulhuc3xmzu6100zl11pltcxoijcq5uyskuyomeulnt3jg6fxiwzvjokvifbtbgtg4faas2wv6nwvr0w93a57pt8k2iywqvjfhi9oum0qr9c8zudkzxobywu0rvz9mg43x2k43iuv9mz19xof5v2qp3dimqbk15blh63idiilgrpdsrnbwdjo9pz1g5jn0wyte8i8orzd9wdqchumu5urneh5fnlqxcdq6x0fcohlojgaskk4yi22na',
                        boundedContextId: '154b15a2-2940-470d-ad9b-04835291389c',
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
                        
                        id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2',
                        name: 'neej83deyvi86jfvbh3b9mvf7aaj4mcjdc7chxyklolpttcgtvsc0y02g7ip47wr4dkn7pl2lb2krcahpq3wv8bpuddccvzipyav4zgln0hxh5h5ctxju3cxc3pq0kb107fwosnqo9h9rjf1xsxhra66550ovpky40mak9tloouyqyy074sbmnjca2mi1w69r9gpp5p6g2sgftbwlvoxi4dafxegcvziflbrif6ljrg0t02lkg4ky19nxjlzz08',
                        boundedContextId: '0fb78952-d14f-4323-8f8e-fe7658f45b01',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('ca1e03a4-efca-4a15-8236-73b8281c9ab2');
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
                    id: 'f251b7cc-414a-420d-bea6-1224463dbd1d'
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
                    id: 'ca1e03a4-efca-4a15-8236-73b8281c9ab2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('ca1e03a4-efca-4a15-8236-73b8281c9ab2');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});