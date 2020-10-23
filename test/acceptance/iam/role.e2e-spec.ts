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
                name: 'wgf197olsavkwuo9t3azjd59ueaortc99opdfc6dti9pg93htju8x86nq4fy0zly483kiigllurpy392ta6c4357q0ig84i7ebejgjgc9z2xtkp2wvxnwbx4af92eps2k6uq2teeovhm6m2dpcvf1x0wcyx1jopqi675gd4ntgfwjk577hl4q1zvu7cg86qjrxsn932yr6ptg7ljtk63bdb56vdqxaxgrm6l8ldwaxqkdmxq4twgc0xsi8be0cw',
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
                
                name: 'ncuqrokbpnphudlj5r8njtl7f66voxmz25r0gk1wq954utt74iqfmrc9p4d2j9f08qrdf534c1wwxhtcoavxvngef4b6o560b43evz8g5006vw255nuapn29ig568rqc18s4ag5kzcbrb5vsrb1gnr24ua00u5rvzwi05iy4b4rju85rhvcadoayq1ta1tpi0w15d49jadxx06i9ed559eb1pcwdajcvkoafpgbr601v6beowvw1gpw40ccaadj',
                isMaster: true,
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
                id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e',
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
                id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e',
                
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
                id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e',
                name: 'ubpwdz9vs6re68jgo89mi6qqqstyu2w5ybkmvurcu8zu9t5skyfj73rsygzxsmec5jjr4xw0lz4tc4prxlnvgypwyzi8c0oncfa5wuj136in8e3somd884k7siey4ex6wrwlrc653eimrb8rnatpw4nhjva13zo9om4dl2se8gb2nok20k1ge77dlq2gyq0r60vdj0iijcobztwm8jfw0l8kyz3vptxvt167wbpv5wmeux84nxtov4bkmq5xyve',
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
                id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e',
                name: 'v3rheb3e51mqr8h8g9p9tedza5vmmkuzp0idw1zgepvzbixavwecqiiq8qtewhlerg8a27ilspca94odtnhtv2yh2on2nri42b7j1znls1qgdvqciscvhyudx3yemsoro34rgwswzzfbj5zn24iv0rutw5vnfnook3ublgnnsbbtj1xmga2epwfwswfyd0o8u8i2liz39f53c7v9j3gltg3ro6bpsb27bu2qq562ll9d1okojcp7xltmdmivnjh',
                
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
                id: 'g6a1n1dhxhkihn4ocfyz22j5yydz1z1t8qjl8',
                name: 'qgtqvosibo2q9mgzhebvp68i6abuhgk2qcj77791i8mskbqc20g0dxj59kr1f585ev39xb0ejpw50ffoilj9c94p7e36rej4a07n55v4wynmf7aii21rfh71e5dm6694l6gyf4i7y26vxe1zet798kol9x4rclu53vjxwjvltw0q1w6xhu2urutimdyp707c9l2yylmcu4jeba5c2f77t5ko555aw09fyjc03vzbvc7nbojdqdy7jal90y6prda',
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
                id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e',
                name: '9p9a822dq9znkfej92z7crblx7jidd7ittnglg722r32pbl2yu3i9w0nbcz00kegqae6tx229awegdps3i8867uqik9vyzh8a5nrbijcgpeodegsx9byi4ti73tn5u3h9nj08mr43n62cbnoxmn8hex3mn769xbxfh0i6b3jv11j3cg8fwcwniht3yrd7tpb93lhahhecpteueqo8kd9uy7ntu648gp5jo6ykdp6ihzvgfh6jeeuy29kguchlxkk',
                isMaster: true,
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
                id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e',
                name: '8ly28dv3ym2cu9jeivqr3zdc7bw3a77tehsnpzli6iqesymz97u2eqk1by7tlnjpmxkx6ymid26rtuoxy7nxjwduft908iyt0t9p045jnq6m4med5d7so92nbc1o6bpt5q78sarirmm8n6fqmpytjllsmq1nlva5k8tylbii0spherypi5jo9t9bxd3bh6fr4p5lspx8ih6koiveb0prl6k3y94btoqovt9flii5rwr6c600fzby9zupq1j5ogs',
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
                id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e',
                name: 'xabr00zse396tguv591tngr8lheo3ief6ujgh1mibfm79ws7uiwfke5k865yqvafv3tgn8se5ozpp8tkrcv59cpts2yco37gq7xkube3f8ijxjru3okjrzxw5dvm1xfqqyod5b68gyobf1azdoj22f8drr7io1ekez827le8r7djpk8n6qbdetoqp1nnnh0trl674093st2zqpiu5ww6eavzzlue8e5yvw9ce6slum5brax5nbb2opw2jfy3k07',
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
                        id: 'b68d9089-ff3d-4162-bf4c-2c32ab7d3ce4'
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
                        id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '6dff0dda-5a79-49fe-87b0-fd9378dbc58e'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/ecd8c6f5-8049-40f7-a018-70707437002d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/6dff0dda-5a79-49fe-87b0-fd9378dbc58e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6dff0dda-5a79-49fe-87b0-fd9378dbc58e'));
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
                
                id: '5b17b81f-bf67-4e9c-aa25-8ce611827b2c',
                name: 'qu1l7b14dno8gcbr5h8k0v75f9gs9r6iip8fnhkm4yvs7kcvcmnpq12t8ygzlsbdj0jh4jwwvxdkc72kvjqeh8nsu5wa3wrqj5s5rrmn1bo3gm9qapsezbez9yyvbre5ihfcexq8mensvouhbnj2ciy06efo77ws25r2hm47d9lrmslfvw7qs9mv8zq4bd1x3gm5uyyvn796oyufw1o86kal0h8ev798r4womiun1jj6wgvdfs1kynphdfaliok',
                isMaster: false,
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
                
                id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e',
                name: 'k9uqfl1e5qra33q0rqjyfoew630bwn82u3qp5hjj8xufggm0hx60tj7h9tuzwvvt0v9uemfitqa77bxk49q6ys1rlfr4t0v46nzal3vh70qx9jzwu1cnxalwxb50urql4mv9tt5gk9bv3k3dxxzgw01f1djvfuabvxtt7jshyu4qllqr9ex8stqrc0be5mhzmdiky0akeldwi2vyjwiygfhwul271htn7f7s1moei7b3sdiyj02ftdw3nr1d3jp',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '6dff0dda-5a79-49fe-87b0-fd9378dbc58e'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/role/b65b875a-0556-4014-a024-936ff015bf7f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/role/6dff0dda-5a79-49fe-87b0-fd9378dbc58e')
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
                        id: '6d68fcd2-cf17-488d-b87d-43b928628578',
                        name: 'zuifkduqxvl28vx5nq5vgoifepp0i6ktd0pbf4biex0zbnirkpsjtuff69iy9c7535jf3v13sx679n1c5rn09za2tnalca66l99e3dj8hqifglbxjhf1jm9sct4bpw8dbuodr2riirbvo508vpkx7lg4jsgkgiwy2gjs531czz25f2b9ofdff54dac3br35klypyd7xz97ur0gx0cclwx08spbp181rzqd8u8vmixw71hlfc37604pual3vc9vh',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', '6d68fcd2-cf17-488d-b87d-43b928628578');
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
                            id: '319a94f7-adae-4d12-9995-dab90e940ec8'
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
                            id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('6dff0dda-5a79-49fe-87b0-fd9378dbc58e');
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
                    id: 'a82d3c21-1f01-47be-8026-c12c57944def'
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
                    id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('6dff0dda-5a79-49fe-87b0-fd9378dbc58e');
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
                        
                        id: '8a31d1fa-1bf0-4d92-8f5c-803b7ea9401b',
                        name: 'm906fzfirrf6sjqdj2eyg346lnzirybuzbk7zjhrmv7k8p585106f9vemmgdit9dwd7x25ildzvh6doeccfl5s774bbr4o5mugtb110gty5kphiz3sbl2jqkua1pmbe9tpet59pbrni624w5zhaz5qbwcsilcv2p697ab22gg7jvrxm9qy0bigjn6avaap56ygnsffhzrawlo23ya2z0igw0chyb5ps6dpie8nzi09wy0hpvoqiv8ojypavqm0s',
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
                        
                        id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e',
                        name: '77usaehgui43mx4n1ibk48645crtimhly8f0noxdqdb03j322ugk93two9t4cuam4o20ry38mscpcvgg1gh9f1176h6ff25blih0dpyi9k670h8hpjz04flrbwkh4lpi26rtp22xc1uzm7eprnkheswd6xg1vgxlppcf2y665iu6aal05juejfnenlt9gknyqebpolujbm4lhj2oy0ww083qh6490a1524mrt9k0b9didijboagmw78sx8i7ezv',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('6dff0dda-5a79-49fe-87b0-fd9378dbc58e');
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
                    id: 'f78400bb-515a-4ed2-aba6-1fb718f6339a'
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
                    id: '6dff0dda-5a79-49fe-87b0-fd9378dbc58e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('6dff0dda-5a79-49fe-87b0-fd9378dbc58e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});