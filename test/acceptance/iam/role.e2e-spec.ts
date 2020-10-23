import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/iam/role/domain/role.repository';
import { MockRoleRepository } from '@hades/iam/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('role', () => 
{
    let app: INestApplication;
    let repository: MockRoleRepository;
    
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
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockRoleRepository>module.get<IRoleRepository>(IRoleRepository);

        await app.init();
    });

    test(`/REST:POST iam/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '45r63s367j6jgvn4j4dnxitq6l2gen9ysum69npdry5dglqhrmbkkm3a0opnzrdii52m2rgqtve4nhlpivfhwcxaforg5a0tsjv10bow95swetb031qrgcs9rls8t7i4siyxuq5g8at9p31rgeowh95q5ciiir210aboyqew9szos7hgg3qde1nrx2hfndycy21ilfwqptrdv90mkd8lk7cwyy44h5cxwgexsmcvj49d5g5hcc28w7po3quqntn',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                name: '3wvbic9fiepaitkkpe8x4hjg8593t1eofog7im2bsotfl2xyuxkzmqso4f8ol5lhu3njoa4eqj31xfdvdbst1rfp9dkkzrxtzxx8dq4zfo1buolwum03y4mm0mx0ijzromh3252v4qjmpmtnd9vfnc1wefn5uuj0e3nksrl3szgw44fueb1v51v3a6fr2wgict20cdszca5dmdash2w812uv9xdzh4zqx7xq3zngmphtvmzvnoxqexc3ktueahr',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4d6b143d-885f-403b-a4d5-b14966719c9e',
                name: null,
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4d6b143d-885f-403b-a4d5-b14966719c9e',
                
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4d6b143d-885f-403b-a4d5-b14966719c9e',
                name: 'tscer0cv97jq2zy3o2homxvftk6p6ztdy8zs7xv1jxrrdie14kyizh74bfpn4stgfucdtfrj3merskhow2so66hjodhz6ok6geohldyn5101n4hb9ci7php0448eqdf85kkpt7mr1iidm9pl7mufn0u2sfhnhl3yzqcex7h64uxjxf2kgy0txqplugtgttj1sytysebfgzsgbrneoxdsw67pr2wbbq12mk16227bvh8c4vwrnm86dmzyj8imisg',
                isMaster: null,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4d6b143d-885f-403b-a4d5-b14966719c9e',
                name: 'c9v80vc3dieldv1rmb6hdew2m9zhnroxxeqjkj3ls3vff8uqtr1xlxtqa568i163ce2i98zy3j1459tfrdjoc6y3i5igbnug4j4054d5p9ka67u2a8v2c3lpk2okdt7duvfv4xf7n2fyogqvmws5zo6mrpxdxte47vc456415wwdyokqxm9tgwxav282ezzgf9dd9ymtrjd4mwprq89ltqv7sqwnanv0gkf8s5n07ctqxsk0si3ken2c7ihzf44',
                
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: 'nzf922yhek5i3dlumihukyri4rx1n6owfkn1g',
                name: 'ygnvm6qpk15czzse6wz91v17a873a7j0bluhojao9migwaozl9rsiluo6rq83t8ww1scl0jls883lpgpnwg60h6czddnr0jksmrjw714ba1plikufmw4vznvbwlmd1zse7r6e315s28s8884ahqj76u89o1rqb0fo0kepovfiuznvor8cn5737uc1c0mv273zdfy8ox3s6z2pfb03p8qn2ysfd64s91xudx5zrzypdfhy1ey3njgv3fmmqyb0rb',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4d6b143d-885f-403b-a4d5-b14966719c9e',
                name: 'bsri73fu3jax5fyjj64d95z9x38cv2gl41hd2btboejzeg3qq92g263vo4xphlpesvuj9vpljfbzm5d67r2gnv0rl1f6ih8nlfwq1wt357llkmb9myy9nvk7w77uhuh5n7ekj6jo9f162izzckm6c7ekhvgo1dg2n2tk7zwava411ahhh6fr9h7peudjtqnq5qgqrhwptm827m5j1n63bups8d4wmxv85bwd1d8kdebia6c5uuknjqkiam0acuar',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST iam/role - Got 400 Conflict, RoleIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4d6b143d-885f-403b-a4d5-b14966719c9e',
                name: 'nwzopls2mo1bwzub6hleit70p91xmfyealmsz2z4778adhl3u7zgtbx2e54zcss9norup7x32b1o9px29ywvk0zjzge5gdipmd4vnjb80lw8xrf1e0q0ga6jkubwiwysnm468hbpbd8vsdav68q0d8lvwwufrr3eviskux8r3bf036j4uigilps3dunq53znd5mnj64xrdqb8mcacu5s380a75ww8rlt8t7lipsvxnmed4ks44dwip5y7p5mbzw',
                isMaster: 'true',
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '4d6b143d-885f-403b-a4d5-b14966719c9e',
                name: 'o0vfvqggyssuwp4aprrhtuofumy9nm4l5q9986gnbwlw1gfd5cafwczgc0w7vvop58szcfl79nqwc3zm4tludmjhrdvc00li42k4oy5wrzxl2s2rmzzs2r0o4mrc9ieqk3sj1i42c97qy30kvzr5oaglf51wxh1t9epzigaim7v0iebr8phd6fdrndc3sqcz9w4xllr11yps5epzr1ov4qgd53apag4wfiplton06vdnfvtslcxcxtwjy71xb86',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/roles/paginate')
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

    test(`/REST:GET iam/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '230d4588-5958-4e2e-bb81-6b8994c92fea'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '4d6b143d-885f-403b-a4d5-b14966719c9e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '4d6b143d-885f-403b-a4d5-b14966719c9e'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/6a6c9123-75eb-409b-bb6c-fbbea5c1850f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/4d6b143d-885f-403b-a4d5-b14966719c9e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4d6b143d-885f-403b-a4d5-b14966719c9e'));
    });

    test(`/REST:GET iam/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '5db7c323-3cb4-4092-aa8a-4658425423b3',
                name: 'yw4vyl6ksbcnpzfk68roznwonmn53d5s0lvtk363ycsi5fjtr0ocepr5komu3dhuyft4j4eaigxd91au560hc2mczw93ciwwcpcjur0gapn0sscze3fhbl0v2hc041mbeb0vflrvngn6aq21kurwnibus0rn9vdufeksu4i23v5ghrqh7dgsc71yl3njezurz0hxlrqm7v0rm87xl172z04id1ml5okvkhx4jaq6yom9b851jzdza1cca0xqb95',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '4d6b143d-885f-403b-a4d5-b14966719c9e',
                name: 'bjnzm1uy9pjseu1wdl6o6hx6506d5194mdqvlcjgj514r4y8bg6my2oegpw6u00xsd87abpq8k24z0voogadla6w8r9sreuw0of93p77agj116v4v5u74fus5imwmaovdxugsd9nyddr1jgdntuuxz2zoxktmwka4dqgu3z9kdqp50k0f8opysfmkll5n84ibjr1pp9krql44p66zb6mchgl5syvff7cy1qtyejl5fv1w5t6yk3r6g2ohw73nqj',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '4d6b143d-885f-403b-a4d5-b14966719c9e'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/role/5ba0dffe-f7a5-4627-b2c4-db27d7fa1188')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/role/4d6b143d-885f-403b-a4d5-b14966719c9e')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
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

    test(`/GraphQL iamCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '9850fec4-a633-4e97-8f9f-d3053711aae4',
                        name: '2uo09kz8nu9dz1htvtr3e7irw7juuhk0bjw0dinhxxjogieb5ufw3s2uuqk9uadlwgbfa564qzvkxbpobripspxzwh3fcg769dawby98t6if5fcwew3xe0jsmsejw2ki51s1fnt6lyhuraqa0v43g7jbw8m5xh3sbl4w9a9vo58on6v8vdr3t2bado3yvpni1m2ueczf2or8st412nz4ybp62y6lggs1eeuio0k82oiwqfooalmbm1hnq8gm2gp',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', '9850fec4-a633-4e97-8f9f-d3053711aae4');
            });
    });

    test(`/GraphQL iamPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {   
                            id
                            name
                            isMaster
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
                            id: 'dfc2ec1f-85fd-45af-bccb-6a0a5298e6af'
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

    test(`/GraphQL iamFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {   
                            id
                            name
                            isMaster
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
                            id: '4d6b143d-885f-403b-a4d5-b14966719c9e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('4d6b143d-885f-403b-a4d5-b14966719c9e');
            });
    });

    test(`/GraphQL iamFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f91946b3-b791-4a14-ad3e-518f3732eb85'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4d6b143d-885f-403b-a4d5-b14966719c9e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('4d6b143d-885f-403b-a4d5-b14966719c9e');
            });
    });

    test(`/GraphQL iamGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetRoles (query:$query)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '830f1be5-2a03-4bc6-86c6-cf7955c02112',
                        name: 'ygl5ghzxx9a15k0c3i1nznpuehpboz2v5h3c827e9zkfdesoe7q8ukhdygpvyts149wx0lhlsemzlvbuwreqh7ej0ycthex6gsqqcqiix23x4ghd4knxfo8ysxxo9mbkhkg5ag77e01bo9gkbddlj5d5i1bkezcgwsb5ea8jyq3kgsfnehcl3c6b3sr7c8o0erlbdna50d7qi79bo9kgibdnslq47sfe5lcb514ts6eass2hd60a2q40fyao5oh',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
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

    test(`/GraphQL iamUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '4d6b143d-885f-403b-a4d5-b14966719c9e',
                        name: 'uuk60n8yig97ter3knmormbfyh63k2qimz1h9imt5p60hb3m4t2xvbkl4d7lt1ow0a3ccyl7r34oyxfgsg497bqqjz6ioybscpodtovg38za1y8q6lz51s4msb6b5eytw95dzuo40b9prunmhef1umj4142qnb2ey5mnukwc6luk6rs4tmd542hl8aikx92ptrczjgyw5v3nan51xbfimhxti77l52uv2uf5ooflfapsniefbeg8hicgsr235xo',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('4d6b143d-885f-403b-a4d5-b14966719c9e');
            });
    });

    test(`/GraphQL iamDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8ae17d85-a7a8-4973-8f45-8c8d36eec85d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
                        {   
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4d6b143d-885f-403b-a4d5-b14966719c9e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('4d6b143d-885f-403b-a4d5-b14966719c9e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});