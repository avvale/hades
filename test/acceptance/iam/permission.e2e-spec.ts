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
                name: '41iyvuumhfz7f9u2rc8s9ayijnwar8z05kesuojfuil4xazje28v56x9nbs0zjrhlvan0g13di85l9j2zftsv2yntcum5cr3ubn3wkikf6ap3n6h076x5411glv6w1x6649r0jgrxiwxs8ga5djwcfb89lxp0b0qufyh3vejmmcbie2abo7avk5bptwqssdnifg4ro7hecma1yj04ezdoqzjuj1czrwv9cvlcmqplfjapihpfv4gyseps2sn0ge',
                boundedContextId: 'd544c542-9d55-49d1-9e8a-bcfede313ee5',
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
                
                name: 'av5yxws1z50jojo7a451hjryizb4d1585dpvb4answxgg6uxyeklyx3vjt0hjldw2z7jt2p2caufwk99mh7qaivc43wibxh4g5kab2i3dtjjyjfhqug3phz5w51wbksf2g936adpzv6nicvfpyprhp1fs1th6p53f1acmq17xnhsg0ptxmly5kids4iyoj9zfausopfakfiasb02mmkufxdh38atyj8zuh2gi8zkbox6zbcmksxvh3zm3bzxvtk',
                boundedContextId: 'd544c542-9d55-49d1-9e8a-bcfede313ee5',
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
                id: '9d259116-545e-467a-b4eb-674345f28b4c',
                name: null,
                boundedContextId: 'd544c542-9d55-49d1-9e8a-bcfede313ee5',
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
                id: '9d259116-545e-467a-b4eb-674345f28b4c',
                
                boundedContextId: 'd544c542-9d55-49d1-9e8a-bcfede313ee5',
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
                id: '9d259116-545e-467a-b4eb-674345f28b4c',
                name: 'sp9g197ldabhyyzv7cpbcrknwr7xevdl4hlhioja8nz1f0dcop1ktrhyisadwax7leq57ix8aihng4s9tad558emptiaebca8jthrk9m3vkni61ji1kqc0y3ckv2pzl18hila9m1i4aintemuqsi3m0w4ebpkrlzid47ewuegd0ik5su168xyxm7uk60vgd7pyscdqte536rj50nclf9whm63rcsvqr0wgjalf40o95x857p3mzje3fwljdss47',
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
                id: '9d259116-545e-467a-b4eb-674345f28b4c',
                name: '96ig6a1pu2q1f6uxz6yz9s67h5zhw65f5y7w0arwcnzxubrbhyeenf5l4ybeblqarduikzoqhj5b922uiqqiowvepypm58raoxxgfor2mje3brtu4cavxnij3yab9mlu0dezzjypu8cz71vo2fh8raylwwii5k8gt2gfg6d74vd1n5818d3abe177w2cf1l2yyjsus0b80iv4wmwhrb3n32mg1zx07huk3s49cgvc6q3vyc87fzqcq1lpp597jr',
                
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
                id: 'kb1kxppkvzu3ivsjpc6fa1bhexodr3we70w5n',
                name: 'kyeu4hos85bglrwovxh87x2g0s3o6uz9s62plod8cyrz7xo0fy38370ra9bgfxcbjdjoennxnw7xapxgqt3imnqn9atsfrvgl8qgm81e7yi9joo5a2trawmr712sfuzg58p7ti3am0202jsoir86yavv7jyu1f3i46zy008lybc4p8711wvl2jdwfxvp8qm5hez17hr8he4gd8x1z8331x9uwoad0ewf4a2k69vxsz1dfjz66omvdyfsdjwht5t',
                boundedContextId: 'd544c542-9d55-49d1-9e8a-bcfede313ee5',
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
                id: '9d259116-545e-467a-b4eb-674345f28b4c',
                name: 'y40t1edgdkuqcq6tc3s8mv0g04lmy2rvua91rd90rc71iecsc2xopf7g2apt1s3ik9sal2ijai9hq75216nrzsbxefsbeglz92xs325ewahbvd9vmrlb8se3u052vavhs9afuv0ootzdpdo8lrzfqeuk1w5jrnagtmwsvh7jy4d8m93jucd74qdnmss21pmabupamvig3ssi7357gfa131c3ip19k6i64upbpdrecgj3uqwaseor5xzpqaijlc3',
                boundedContextId: 'cciylwydtxhpl4vb7v01oed5x6n4hewz6bsys',
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
                id: '9d259116-545e-467a-b4eb-674345f28b4c',
                name: '2k9aqgqcc57y3xdasb4qtbfec5iwmgyvr7mt4oyrdtjko81uip7osrdpi1ff7ipmfsqrcrnupy75ei76jea714njic16oiylwc9p8xu2l66ieacobc14uo7mrpl07u1b4hg3beom2z36t2799lu8bzq4gh44l96vqd2mszrag4n7qwg7qg0k5g2pob2xtqcc3zf64y0hzxkbxxbglf45ewux0le9vdx7axosptoa7imi882nhiq42cw4a1ofzs2c',
                boundedContextId: 'd544c542-9d55-49d1-9e8a-bcfede313ee5',
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
                id: '9d259116-545e-467a-b4eb-674345f28b4c',
                name: '67zirn3cg97nf7e0rarsyofl3ug5ne7ahe4t6i4sl6tr4y58d119x9r1mggcubq35w71w14gt6huv2dnxkx6n2290mcoyvzz5s4w15i0w3rx9lt6cbigkrgm3ezs21v02e9wbef7i61yzs5ththsomf836jj87frvzbxytr9cz2e85yzh5pzh6ton00pv84oqw3mop7lzmf72l0ulito0ycf3r81parpc6hkdyvbh2o1fqbgr2r3ar8hk4rejdh',
                boundedContextId: 'd544c542-9d55-49d1-9e8a-bcfede313ee5',
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
                        id: '13efa991-cf21-4fbe-825a-09abec731bff'
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
                        id: '9d259116-545e-467a-b4eb-674345f28b4c'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9d259116-545e-467a-b4eb-674345f28b4c'));
    });

    test(`/REST:GET iam/permission/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/dd29dc07-f84b-46ca-a478-c7991fc78c4d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/permission/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/permission/9d259116-545e-467a-b4eb-674345f28b4c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9d259116-545e-467a-b4eb-674345f28b4c'));
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
                
                id: '2c15c22b-eb57-47f7-a58e-10ddc58b83bf',
                name: 'ds3vhnp30cjzgqkmgzf9wsj36xa2m989du0y81jkh7p1hrfr6hoysuyobbc31qg270qlpqiyemc4v38z3wmutbz5nkogo5u7wja2wtquoottifyb6bywzcur32mpq1txy0icji9i889iy4i2ytr387c8448g9w0z7iq4w80fiy5vhnetdo34ivhdzuo5heifx4ugwutk0cnncgubmixi1mvvqno2yrdtrijt4rct6x6zvdk1hfcn1cuolb2067l',
                boundedContextId: 'de474da5-2ea1-4db9-812e-bbf70746eca7',
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
                
                id: '9d259116-545e-467a-b4eb-674345f28b4c',
                name: 'e8p81d6nvz11m9fdguub5if3ipf2su7bxsele66qgetcmy2bm2h8hsg4d9b05aoqw78nixzy2l7hlp9gdj71ex8yeg4rraziaora84w6zf3h42vjw1w2x1ik3an8yurdaofg19g97bjarznk2xjbwcm65ssk8snbraz2ihzm7k21nhws3oz00i04cukm1vurbc7t3hk1k1dvbiyre1595bdprc4s55hg48m5biz9rwocraza3lf4sj7dh5xim5z',
                boundedContextId: 'd544c542-9d55-49d1-9e8a-bcfede313ee5',
                roleIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9d259116-545e-467a-b4eb-674345f28b4c'));
    });

    test(`/REST:DELETE iam/permission/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/a74a0ac8-cb8f-4b6d-bb12-2ef8fb26e9d6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/permission/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/9d259116-545e-467a-b4eb-674345f28b4c')
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
                        id: '7d87063c-a3c9-4386-a2c1-b11df95b13be',
                        name: 'fga4xh59j0b6bwntvdn9v2c1ces5dabq2mv2eim9j9f2jeumadbzm4rwblv8uq2sik5sbx8w2xiz4fhjix31hsyclf6exvte98fola7re2xa5e0chpajrim8iqyuc763sm0lpud3zzl45zy0d3t152ftgovzl2apzfl7htzchcaqou3dtw0zv7mrhgfs7ac5dyvhcfcjq3tw8t6axgxoz4fb262jlxupan4bohc2mv56xlvbuz0niiyol2vxnr0',
                        boundedContextId: 'd544c542-9d55-49d1-9e8a-bcfede313ee5',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', '7d87063c-a3c9-4386-a2c1-b11df95b13be');
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
                            id: '2aeac1f7-312d-401b-a6f8-6bbb4377f77d'
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
                            id: '9d259116-545e-467a-b4eb-674345f28b4c'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermission.id).toStrictEqual('9d259116-545e-467a-b4eb-674345f28b4c');
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
                    id: '3c7ab9fd-cda6-4656-9a10-2f1b742d6c10'
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
                    id: '9d259116-545e-467a-b4eb-674345f28b4c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('9d259116-545e-467a-b4eb-674345f28b4c');
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
                        
                        id: 'da37f641-f872-4f8c-aa02-b604c1bca664',
                        name: 'kp2wlcglnrekmi3iu35pw9josinzuaae7ezstvrqjq3c837ctnn094byaswgqfkqhqbi33owgq1rqdoe574ieszxxnxzbfk88g9vq1lsgltvvnhzpe9u2o39xsu2oy3c3k0vxh7pgjpjeuvcp5stgvtn6n6wgcafpq82xcpkq78vtlz047vuwldjfzxquaustlr2kjnrqq55ja3z8u32plf68ykcc588etyu4t0o48bwcyevkzjvhktdd12hkxr',
                        boundedContextId: 'fdfaa385-ebf8-4676-b4b2-9b44bbd827fc',
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
                        
                        id: '9d259116-545e-467a-b4eb-674345f28b4c',
                        name: 'jgbicohrte3e4cfau03x4u5eln0nrxn3qg7yykq3skk0rm13c3ozsggf64xk8n7fxlva04m3fcsrx5d3rnl1kkj10eggzyc1p0r2gqg612qhqmgip50ht56b2emxt663dbljh76hdlx4b1amcwl3ouhodxc0lomnywh8q5tezv2dtmc84esziirh4vvgrdr8ffhngxkptq97nchk85hfq5qqfc5cpqrzbxgtpynm327o2ztpewy8uxamjjjqmhf',
                        boundedContextId: 'd544c542-9d55-49d1-9e8a-bcfede313ee5',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('9d259116-545e-467a-b4eb-674345f28b4c');
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
                    id: 'c67c9216-286a-4c81-a4fd-08380fb16402'
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
                    id: '9d259116-545e-467a-b4eb-674345f28b4c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('9d259116-545e-467a-b4eb-674345f28b4c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});