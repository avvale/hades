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
                name: '4l8n3ats123aaje7cegeo9b69kmsfd8vaudxg7iukpspm5n1drhhgl10gcocjth9ck4ckikbrohdghybjgkrty8zhoupc9t8feku6enfryetycjff91zl1i8bg35q5zphc0jvs5dky7vm5zz7qtqfo1xohvvvcxl1kqyfylitzbii44yio8qgi5swetqox691re4qde5oi9bd39uso7p922avye7wywzgolyultvxemy4o2ehlyheo49ee6r47g',
                isMaster: true,
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
                
                name: 'muikems3n9uob2ycllc50bwb6pvm9bxq1diescwokcfzzh3k0i2lolu7gkbiu93ktd4rh3raen4nxqzgdwv13cp7of8oh34bi5kow4fr0gv92s4xpt4na86rj2qccjhykiv5syt0mgevwhjljl10vuylvruktcgzz33g0xbi7gszobq4csvxp87f6ba512swuf3n8hwusdn7pnvaddolgfuh02s1t6kze70ftegvmoxivrf13avqd64xzt8w6ro',
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
                id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f',
                name: null,
                isMaster: true,
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
                id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f',
                
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
                id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f',
                name: 'jguz99lriyoruetl2xq5hat6s0jjwe36yz7mim1nglnle6n8zyn9aqihat402ce6shhdnpqa3l3b6me7d2blehs4zgdkkzt4a2c83649xglw4fyxqf2n8itcxh23pvm9sc1pp0l81pxiibwgndjh3u8pi864naoo7l9y2bm2dktpz00b3peslhqshbzsve25pjwp1o0u7xlenlp2u0m7lmpauuk5cxv35814t3hxzkxswm59taiok9bb10h3l8b',
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
                id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f',
                name: 'hd2lgpp16exj90tryxdqtg9epnefjva664uhvzt2x2zc3totwhs4byibueaslto93d49pl5bd9mpj3t02y7xdi7r9qxy85kvophr1l891tjyvxbg9w1qj8bvn4oabl1vritvcrk1gm5aihablyyxj4nt1dvanl5sj2ww7re6ti0xobqu8gjwlzx651w6xf9zfq01lvysgos4kbsnkvzhcprqjibmivzpdgfuvy942ie3ylc77nbhdd3gpc2jr1a',
                
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
                id: 'hv9jn5sj9javjhuuozb09qu7v8a1pgam6eno5',
                name: '4w87sdp2i0zr8i2cn619pr3eigy7dhyozhdq82uiyxc9w6vk6lxnr8w0auk3j4x385snmi9hg9gub5ux4ayg47ms9grnoq56aoskuw8ctlkume09k8i22p6hsjfkc140a8kpxv3yptmpt6e7kwdq1ndczzzrhppnxw0v6kq7z6mzgem5wrepxsiu9ndlp2pq04y3fyf5901m4hp5eckhqaz33wwbzszgufresp8he1gvq3fc43nw994q8q61xod',
                isMaster: true,
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
                id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f',
                name: '3j9zm2apox5jizldaneq3zl93jpy6zdhv99wpt9i47mzaldi1mnw86d9av05oqvfuxngdr98qbat79l8yf2zl01g399prxwb1vroty36hw6dlnzhb75xlegg5jkrkj8x0x3muzdqw694ixtfa32obu5256j1dg6qn6lac7ynre01qdzbu1z8b5c1r26muca0fp2bcnwx1a5q98nl5lehl56kkdypf2eo9ntm0mxfyte82npgavhxmnrp77z28q56',
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
                id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f',
                name: 'zm7g0jymtv0x6yu5pawi7x0tlf4ac7toqu2w3oqrc0lke3bjxf5z1d2peyvdty6zvnnk9ctec3shfvb6pob2liv2y3snek30k68ple99n96ns68wd69z79i4s3bdlc2tauzwccflukl46des458f5751nauhoj8m1g25klea478uznexyu4gjfmgftckf8bcoh1wpvqav9bxq6f0fjb2m2kccajtmggz1crt938rs27bs7g2ulaungmh7jw7sgs',
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
                id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f',
                name: 'auwm5j1f7e4smh78z8q6kpc2nof2di5kket9yb198lowobtloz9po85skfqb3jvoeyapfgwcjwl8sqplz7cp5dynh19vow0q07p5bv530vu693mored4ray2qo0gblzvppxmf7ekwocpnsffdetdp327nuvqwj0wkne8fm2ejyovzam787r0epjs1kw6akq00n30zim0fj9vyh7f6pym0yufyyl41fhsn2ln56zui7qf89djnavszyr9iohoq14',
                isMaster: false,
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
                        id: 'c3cab440-b269-4c85-8fa3-f8ac2ca7fcfd'
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
                        id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'cf7c9d49-4b99-4d81-abd9-040cff6a568f'));
    });

    test(`/REST:GET iam/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/71c8587c-f490-4a37-85ae-1f144d7fbbb2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/role/cf7c9d49-4b99-4d81-abd9-040cff6a568f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cf7c9d49-4b99-4d81-abd9-040cff6a568f'));
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
                
                id: '6b0862bd-810b-4e73-a166-2e71051a5c60',
                name: 'c9idoryazpex25mr895iqcu6cksyno1u9xe0x2t22if6cji0egls18af3s0zo0bj292gio4a20ebrn5l794v53454xmlbdraelptgom0vhf2033drgaexb75hdn5nksec1jc2taisaxsh3lwd55db5d7n9u3kyvki6r5ylst7lrp5d2km6r2ftumpp0dvod4d383cg0tyir2wdbeov1nk4hv3zmj8ehuyh97s4hacm4ejacwcqi5qn042y7ms6e',
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
                
                id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f',
                name: '2jm9kje7shcnsucfq5z0df8t8g087svispol4e4rnodosv0j5sgga5czq979c7aisjlocc1xpbvh506cnkebjzounyhwx923kd4h8dilv6sv45b80kk6ulj5r6005fwm902y6yyzxp4wqeyybnj4afy9lbwjcuiumho0olhui1sc2i5ajcky86nge9ljgtr65nbpmhqpqz5p0m0jgixgses7jrmtpdzik429ut4dl9hglpwn7uqdmc2tfhaut6z',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'cf7c9d49-4b99-4d81-abd9-040cff6a568f'));
    });

    test(`/REST:DELETE iam/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/79e8336e-c741-4ed8-8f6e-3e9c51b0fb49')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/cf7c9d49-4b99-4d81-abd9-040cff6a568f')
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
                        id: 'c4b8fd94-7927-4e97-b1ea-8c4cb918a5f6',
                        name: 'c7lah0ayfhspdly8sp58djrj0qvf44rc4rx9dbbax614veauw88i0nz5p3bgfi49tum2pzdu6qe7rpjsjbjz4fmmrz4r7orxjwbw2dc93v83wgpsh5bkg401vvov7yem4tlo70xcq0lr0vkrcyiyffglmqmeaabo7vocdj2a4b4qf18w4r12bo5poou72nrhod21yuoepaww432tppvopxr7vijrv1ab1y9wucrzgqncwcl8xngcz2kh8x8o3st',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', 'c4b8fd94-7927-4e97-b1ea-8c4cb918a5f6');
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
                            id: '3d7e9f5e-4272-4d75-830e-f000d7a4165b'
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
                            id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRole.id).toStrictEqual('cf7c9d49-4b99-4d81-abd9-040cff6a568f');
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
                    id: 'f51c2ea0-739f-464d-bb48-e86a3c180009'
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
                    id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('cf7c9d49-4b99-4d81-abd9-040cff6a568f');
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
                        
                        id: '4218f561-edcb-40d4-81f1-d33283e6bb3f',
                        name: '2elngskcmz9mo08wj0c3tka1q3eua08vihfecf5atpagb72s3o4oncb9dbse79ik6m7zb8fupxhk4egllgrtt0a27ev21tt3domebdikk47v78kob69phe0cq40rnp6mha2ctebuiol8p6fcbrsljggynnqpk24u677azykwadznen7xmhqkdqstfznypaliv2nvafjuse11oi2fvtccma1kdjowg9vj8jc46gyzfyq456ox0qmzwge887navwi',
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
                        
                        id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f',
                        name: 'mef2pwxuhorgxfyjeupgc6wbp2e14spyfnd9memvvnxngptjjur66hnke19xgz7a8rcgw1icjllrzdjrld84zlm3q79frlofgk2nyptoy1j7hyfh94p42f7puerpyqls464tsi0xjtohuaukrroxkqp4tvad9qrne1kpuk08yhwijiran5f4th2aot5i3k2z1x6mkfqxzpaib9pfp9jrylhtx7o5laxfvsgf1j385z029jr4eyarwcwh5lznh4s',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('cf7c9d49-4b99-4d81-abd9-040cff6a568f');
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
                    id: 'd978d28b-c9e9-40ec-a739-69a5584995d0'
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
                    id: 'cf7c9d49-4b99-4d81-abd9-040cff6a568f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('cf7c9d49-4b99-4d81-abd9-040cff6a568f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});