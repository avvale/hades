import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/cci/role/domain/role.repository';
import { MockRoleRepository } from '@hades/cci/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('role', () =>
{
    let app: INestApplication;
    let repository: MockRoleRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
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

    test(`/REST:POST cci/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                tenantCode: 'util9772c0hoyewjyqbbspbnotonet5arn6hsjcebyp9eq3hdz',
                name: '8nsj9pqe0dmdhy6vv0clj0j7kp8ixhs3t3gw6ioy5pcbzl3k1qxk5wozbo7h0lpcstfh05fc6vy0a9vifnnj98xzl67ndy0tlxpbz5lf0rac6ax7xk298tkdxg2vy6f6vtbz9l91xvqx9g016irwn72x51epe7ki0eno7i3iv4d1o7radwwswkrqmvdsmgxbm5m7kgqm1b1bhvtu3bbgmv7pb40ffybej52e3pjn5mfh3mlse6enaqku0yi0rja',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                tenantCode: 'v5sc7fdhbnwf6j5uctgp6u05sza3avojtun3z7qy9oq40z9sh6',
                name: 'pr7dl32yq698zinrepxl7hijix73p2uqll6da6ehy72q6r2ltcf3matvae6nr1k26na0cl4iqk2t2til56nnqok01sukyabns13eqkxc5eecdq4k2nxu4mpu52hj33v1e24p3ssjajow2g0jz5aqcixcctnliuqxztdzvhyhafuqsabp467pz5o1ccw04uflt8zj0e1m5qqpykc66gpemomld04nd2djf0o4ubd8orrl14hainfbuoqjf7a49kr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                tenantId: null,
                tenantCode: '2050vbeqmtp8jv5i4wi0mlejk5rcnovasw4x27jok5bdyygfxk',
                name: 'qxmbda3765f4x4er1gss76xiu096fg0ke21u9g5xv524zzexcssd7ejw3jp6wvjntet1c4nnsftzx21wqkxie75d0h41pknyuv554fanfg13mief7bhrryfvn9if0l3n0jwowdt3k96bkoycfj1wezx4ppkjm3wkjqj2698xiszksi5n1qowhan8ct0c14fj8d86g3d1f6258co140biupuh0kgyanpslrpykypfbe1fmvf85d17ennoh8myct9',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                
                tenantCode: 'uyv3qol0oz9uzrgdea38de1teetwroyvirvxawo1jyh8cq83ue',
                name: '063ccuavrx9chmi6onmbumm7ywdbbgb34ag09rbpnfal38l2pj7596qea754z87p4p6w0sw2wz0x5fw9fhcxlj4b2zemutz3ru7eqdqz6vqpr5rhv416byosh4wet8thjz1l4o13l80dml8knp10qh51r8c8pvrokk7ulftogcwoiua7zu4mxr3cfam7ctkuajcjddpom1i2su9pb66lfkwuw0v3chcgrnwk2raix9py3ljf73r6ik5bgcpf9bt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                tenantCode: null,
                name: '82dyzy9hn3lxaikiic578mf3535r152p8zac472q7oy14pj43vbuuofb50bynum0wkuf4k4m5rc7f6nr07uxgc28i3znxxvchcot24c3nxetjtafivut0iml681fh9wr83oy8iv4quhshq69i1a6hr15nqsib8hzk69l5pih5uubjios2kkfix6tsjbhdr99f5py8g40n4rr7pkxy2c4xzvlxsk6jzchln5xubvn25u03e53468cdcrpjkyb6tp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                
                name: 'ovdl8yyflnpt9b1lbmtv7dm93l6viaaqy3839ib7scay4qxf07p7zqpqm1mc3xbzg5dmjgeqm3qapk6z6v6yve0rprfvlt8prquaxmx5x8d84nsvt889ynf9fvs38esowlg3lpk97dec4ejdsn2u3bbngof9n6i1dx4jtvdj5c9ovvbbek7cbq8rulx0gxukyo8fakfz5zwdrpjrfcunk9v6hk046iko2z1z79axkssjw4sceszrcdwp18agjjl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                tenantCode: 'go7c4kn52rl7kpf3jlsm19ylhmk8udd3jxy88l5kw7qs6ma7so',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                tenantCode: '3giwhz4rlvfybi5kzpngo649ffwom0mq96y9of8xq6ngtst23v',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: 'gonl1i5rkg1op13v0yrl1g5aelrqwq2hec4pv',
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                tenantCode: 'rj4670gwrayb7mhjs9ux5toldyyy3o0hvni34jivapfdtwbzg4',
                name: 'do6g1gkvv84a2kftd23w519e3owz1c5ulzlttmbuo4kkkugdjv4a21ij7ykvi7cas5pagnuzi6vq4tnlkg13x5ulltp7wnqqcbfco0lbfdrk62gv7m2eexgvegt3i9grv6b2mxac1tisiivv6winymil470u4qbzn3vxtkyalc4nwabfrlpkvmh3atxcvbblvscw6tmz8p5f2nzez6uk2tgnzi2t8k5ti8ftu0bd40uvp53pojwhy9sh141mje8',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                tenantId: 'virwcqzqaf326gt3nd40lyidde7qssm7y2z5u',
                tenantCode: '740b5libqvf4jty6d6p9uffntkhl3v0m7r0v6x2ommc8flguum',
                name: 'ntwqrjrtnej0n9sqevizdri9ls8ebd9p6nbcuzmhzdbnahwwdh2v1qvudb0v5f7lx9fnmkowairszeab1y840zcl5t30cnirwesxfs372kkfab4e8uu4285k52nt6g69jimna8docoad0wajsihd2w5uvrfsguj01lmgkdmavxrlrzpnvmin8nofj7s66j8bjiex0cxa7c2nl5kccg05hybp3918ivvqyiwkumys9cit6wdl1etkl2q5u69n0yl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                tenantCode: 'yq903hf1oc1ol53mi7ohpv5l9hrly04dmo8vb9zkzcscrew9u5h',
                name: 'yurkz59km4umg36mvu57izelqmewu5gp4hcb78c3womu603y0ykru7mb24bqr6kl1mk1f52ml7cdtg1mof4d2dl5pp6t4qfgza4ij2f2vvgv9r3kt0rm9hgkppfbrb8sjdyb4e6egl4aguy5sre7v643htzq67azojqx1fdya0pmgans4nhooih8ouy7shdt7kzajmr8qtoo7hckybsnpxtoalc7ipffrh7cdmosxc5s82igs6tffn681g5mbuj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                tenantCode: '85lvy65861tx0sjvutsjibzrv0fwc5x8x7b7ujk5tk1xs44k3j',
                name: 'h2pnwqirh3bl3ybejtu5i1o9vhkopgf7tbljom4zkcxoixc2a1xirvy4bnmzrb5wuz7zs0l6gsoopujr7fkadyvp5lf9a9k8db9o3o30kntdpgwvnnslxbv4933e86nwy0e5lxa3egrk2u8fqsvzp8d7xw9mauo5iuwt9cixsoku7j2qjf2puvpn88xf19qprdljsni2dbp1k4dqnegb3hxbxwdg0fuqp25h05c333st1r7sevzk4qy26vdz5a1a',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST cci/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/role')
            .set('Accept', 'application/json')
            .send({
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                tenantCode: 'ri62brn6gnsw6kfoqp00swnyyr7hakxbovprcrr8gtd0jtnf2a',
                name: 'wozb6yg24cseu2atalvbxy8vgsx04rih0pnptkxev06u551fwxtfpqstacpkzzc3gl224382gc8gevg568reqjtzpoongptr9vmsr180aby4q1xglqk8cq0ilqmpwbl0xqybyqj0slocvag2lamfq12guchyik487lok6b7vwtyztkdrxta5lp2o2lmehjqfwk6e3srioe105jjkiwlpw0nlvlvjkreqqy93s89bkm97rurfnvx61lctqprq2bn',
            })
            .expect(201);
    });

    test(`/REST:GET cci/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/roles/paginate')
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

    test(`/REST:GET cci/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '6e912b41-79fb-4fb2-863f-e89bd2a7c340'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '594beda6-5adb-42be-9022-e07ef2b6b390'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '594beda6-5adb-42be-9022-e07ef2b6b390'));
    });

    test(`/REST:GET cci/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role/d60c580f-435c-4e94-b8ff-71e32c3b3823')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role/594beda6-5adb-42be-9022-e07ef2b6b390')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '594beda6-5adb-42be-9022-e07ef2b6b390'));
    });

    test(`/REST:GET cci/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ab68865f-de5a-4eca-9f8e-9d3f4f11b5c9',
                tenantId: '8802a340-c65c-41db-b5ea-a28ea8638612',
                tenantCode: 'a332en1eo8vby8k2h133ppdu6tpf0isvsgdzteemxmxui8i0c5',
                name: '3zrb557kh013dc233y4veahqfo3mfjlgrabd1s1c6lzlj6jzdr3m896617x68tlpp7yvjx5ahf3jhw5wwb2gt9x5zfnzgbx2qbm7cio850ub1aagv5i1aoquepakzzf6l1yl38kkzj815s64h5y4yxpt578hoy0xunffcb4pckuk8k4b2ojh7qk43y8z0f9nrp1ze2624jqoe0cpu62n9i41ihrik577hf1kipdqoval5lpoi72ieo9htqxt67j',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                tenantCode: '5rqc5ey4n0xwqiun16xnh3335g1ivas3kdd1jhil10indogjv7',
                name: '30tjz0ss6ban60ccvpe6ha8vpzdyi5ih1lpid8v4zxzrlh4nhiapvk59gomi55ngaymm3sihnt3e3gehmz1ex5ntem5g6pspnciysjbh8mgsyh9p4g81fqv8s4pa91pmtqq3a38b0mkdyvzw36pc40jugiczr93dh0t2e7xgt40k5w9h7mq0irn9yc6z2zapmjxri571unf2a0pp9ak8j7y33uqhzpfvvjo6q2fr3gns0ucbwlttmy9j5rblxe7',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '594beda6-5adb-42be-9022-e07ef2b6b390'));
    });

    test(`/REST:DELETE cci/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/role/2a91d42e-f750-4b6c-bf7b-f1ca7038936a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/role/594beda6-5adb-42be-9022-e07ef2b6b390')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateRoleInput!)
                    {
                        cciCreateRole (payload:$payload)
                        {   
                            id
                            tenantCode
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

    test(`/GraphQL cciCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateRoleInput!)
                    {
                        cciCreateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e9c7d014-861f-4ccc-b60c-1c9917689808',
                        tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                        tenantCode: 'm2xh8bmec4rlb8minb9qifoalfjo9sts1vy0m78z6kb89q7zzo',
                        name: 'z8zo3qqslzlk2mzf3s6s4hzvpma74y2yhzkg8co39nlxyowr8xvzw7dao3izspfa83tmnp1q037ajbaur34jczmomyijydhvxgx17i4h7l0veu16btiilpt4mop07jpdq3732yyoirjmzi5a5al3ee9mm7oukmi2nz859dakf84gkrlvdqrnqyjfbc7s2zdve1ow58xiai16l4jceup55aeo66xpdnh84074vcmdz302b078pr4o6svxmof3eqo',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateRole).toHaveProperty('id', 'e9c7d014-861f-4ccc-b60c-1c9917689808');
            });
    });

    test(`/GraphQL cciPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindRole (query:$query)
                        {   
                            id
                            tenantCode
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
                            id: '77fb0ff9-37e6-418c-b30b-80acf7cf2383'
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

    test(`/GraphQL cciFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindRole (query:$query)
                        {   
                            id
                            tenantCode
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
                            id: '594beda6-5adb-42be-9022-e07ef2b6b390'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindRole.id).toStrictEqual('594beda6-5adb-42be-9022-e07ef2b6b390');
            });
    });

    test(`/GraphQL cciFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1484a7af-3fe4-494c-b832-1bf8497b14b4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '594beda6-5adb-42be-9022-e07ef2b6b390'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindRoleById.id).toStrictEqual('594beda6-5adb-42be-9022-e07ef2b6b390');
            });
    });

    test(`/GraphQL cciGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetRoles (query:$query)
                        {   
                            id
                            tenantCode
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
                for (const [index, value] of res.body.data.cciGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateRoleInput!)
                    {
                        cciUpdateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '90ca2d93-6cf5-47bd-8ee6-cabc5652ae0d',
                        tenantId: '5190c05a-c723-4e0b-9d50-906b286ff628',
                        tenantCode: 'emm48ybraw84trxxaxub87cwj0d5r2t4b9sy6mr0f0d94jnluh',
                        name: 'c2anjmi9xyo0nxxlxqac5ipds1oqfl18mm0g99r7drixpfgo38bxp0pjzwtaw9yu7o7uuh4xve4irooilybzvl29bbi3ngugtlzzqfa5ahzye4fmvbn42nrokdid1fqddetszqdiuvxh0u9fmcxbsm7zwyoztmdh5e7sjlj8g6lk96lmaf0hhbecqqodfpuqpiujwvrntr1ja4kwibul2h26yhqkwh8w8ge737uptdp72k3mu6lzuivk57q8aob',
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

    test(`/GraphQL cciUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateRoleInput!)
                    {
                        cciUpdateRole (payload:$payload)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '594beda6-5adb-42be-9022-e07ef2b6b390',
                        tenantId: '3dc427dc-a601-4c84-90a0-01467c94905d',
                        tenantCode: 'stkfj851gkas4k5mgsux4g5wr53ez54qton03byecsbaiowa7o',
                        name: 'h9plpvgxs841bnmtp4xk079bwpp8ybutdegzn0aovkx02j73b1jfmrf8p254tyyyblyw9wi7z3f1iv7ha8an2cbqfr43kg0r9mdbv1quj3dx2rfcpe32r51mkujlt8hnp9rc93pxd4tc55e2fko46gbf19mn1dj8qe4aglxolljdy0yyqylowsgsrzki38j8f7ckbv3huflkklnuneiafho6cnmmegth42gyso7cwjcbvxq1vwlgmajhs4bzev7',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateRole.id).toStrictEqual('594beda6-5adb-42be-9022-e07ef2b6b390');
            });
    });

    test(`/GraphQL cciDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2dc86ce3-8b2e-450a-b24c-967139425f01'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteRoleById (id:$id)
                        {   
                            id
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '594beda6-5adb-42be-9022-e07ef2b6b390'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteRoleById.id).toStrictEqual('594beda6-5adb-42be-9022-e07ef2b6b390');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});