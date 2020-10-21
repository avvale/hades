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
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                tenantCode: 'h3heckrp3so7lz5w3zg9souwh2qlpa0b1etz5myuzkxv8i4fl2',
                name: 'ygznnk662188wlx87lgvlos1za6gdfdd0c9ao208n8todzcmnmin6o1dzq7eei0ly42z5za6hjmii1nua9uv268lyaw2znp6v9y0zdipu7dy9qapfqcj4gxc64zbo5eumma6o6sydm1k941czxtv4rr8ijbirqi7cbeqe84vsipcw9ydv9wg2iuc46bxgdbvsk3a1kekiov2g30xtzp8vo9heip8pntvx6jrencsf403mt1xevtn176a2zozlhw',
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
                
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                tenantCode: 'fsnqpkn98otfoykoiop7s8nw7agm3pjal7bgv0t53vc88c1cp8',
                name: '97ug7fo1hxgzn3edxeo4vf68s0jukdha6a2jz6f7apwmq0pka0gx358vnihcrpbru60fm2yma4p59h9ye8pmj8ajkc17262b44uqme4ojreoykl73jsyok1c3g221ivi1a4of2cyektm9c0wxvlzig2fms31976tlrhyfnfylamor7r70qfinv5r624he85zh3qblp0keg6ujhreuew77wh5hittor1ytfzxrehbbb46ck8ngat9ox5l4sb4ix1',
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
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                tenantId: null,
                tenantCode: '10yfjif0epnno5sbkedyv27tnk8iv10o0dv9hwpw58acywv3ai',
                name: 'a5upkszxhyd5jko7kv3pddjlr3l7hh1iqlcepfa24uurem620km2ra4q4pw4ur8bji5qgsw80lxl20wqqr4j223tpxk9kv4yxz88qbndvwa4hcwwv2euhe8fx0kn8ct4al4rucaa60e3hfkfbixs0c28q4v9ggkroivubaxyfj7ixvn29q7ri4lo31qnp4sy3z1zzby98g7lys6r1bul6s18ucfz65qoctl7bncmivvnjpun6jvlzbrg3aovwer',
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
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                
                tenantCode: 'yquh8h451y9u02so44bmite7meagyvymxw19yv92ussbyidsyb',
                name: 'ddkyr59sat7zqx5roep6j6cg8oddq8txii63wu7sn7vujttyl39kqnyk8qp3clk0ibp853hduric6yvtxd2vs64hxuae0d8oa30t1y7qvq62yj9qrib1tcbb7l0ngbsr9vrcukw8k5acrak4eq7v1tjum89ep6r7wd9n4wubvnb2w2l19r8kykhcr88izekhn0yp0k6be0x79o0vqu12ty8zp4p3tz2kfdku4u13k39bic3liep4jnx51ib1gti',
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
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                tenantCode: null,
                name: 'lc47kjb9x4fwlzzjcvol9bqap59bcjrlr6l1yyz86h93xfm00oidsgoj9w1avjebovrcwmf8eev8eu7gxq25g5ty2sr22763sgeq97hwerojrhur7jk4n9is7ufa3m3kyvonpxgzsw40w3qmk95dklw3khjmv53cndk31pxmiax1q274jukrro11khxc92vkyoe4zyoqf0lxdhccxo3atm29rw6r2tymnd4eearu9jizip0aerblaoczuygqb0q',
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
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                
                name: 'z3ov3lh2q83kv8mbd21suzz197suknjbwipb3hs574ioq1fpr4um0j689bva2qjd31kxlma6by4lvy46z004w8hg9mv28yjhr2nlab7moebr5z5mo9g6r72fdf7rmo2kx3uy7px66cg9ovbmo850djdzyqyrkpvni4ot5ri4jrrclud6c383opj8gn8at6ki2od18oawnqw6lagd30q9096l3blattzh9yj37ljklz1kgqwkixcyu81bu74pivz',
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
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                tenantCode: 'k1nke90a8kynt3bxpwwutq4krg41hfs76le3nudcqxz50sk7cn',
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
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                tenantCode: 'ft96uom3xxnqlpf42eosn0ax1539qbyleeehpm4fggcly2oagu',
                
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
                id: 'ijxh5wmo3yxryycu85xt8milftga0otvd9pc8',
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                tenantCode: '90n8asaspiiyjdp6raqkf5kjp4nkrl3vzfz18jvw6i0ok9k07o',
                name: '0v2soasmbpmsim59iz9faqdef9tfsetcslc5uog8vv3sezgrh7zqyroqh9hcekkezw0kbbpmaxdcjb6vd92wcrqe6fq1mwwrvn2e5uh2tceqpvl3e8e06z4pgt78tvcjksrygs2nl0s4x571w8yvf7vwutnnb5ttms4kzgtpbbaaaxy2zz8hcydlcx1qvw9su9jcf7ncjnjoood3lah3ris0u1ivy8q480y80txpwj5qgw9z8tixxrugn93nqq6',
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
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                tenantId: '77pps0i76bb458lc0tm6ql6wbionboyrg03bt',
                tenantCode: 's9q939xaf8zl07bwtqfjikjedvwwkyjy6qjck9mxdmiysjdjis',
                name: 'y72hcakepps2bf2px4xeoxagxmdpn3vro2o2srnm9t1j3hbw8g7ocryarc1houy0l2lghoib21v9gayelmrso8vz5puiti1f6yqxs98850tztdhtiscp2sbm68j7ehshkqns92wed4b0qmvlhle8x1slit002liuqb8my0xrzmvwr1btm40vqimq2cjfmfjui638a5m094gtyf6l90nt8umbcyb69hkz2sd5d1mfw415d1cjcbfkv2nex2kp2fa',
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
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                tenantCode: 'frcd1z0shjy0yfct01vq8ogmk0a35cglmkita253t0fnkv5en2s',
                name: 'hgnqsb7p6ql4e9tvkmxmwpduegs93i28kzgzwxkxiym58ht7jzrg19i7c87g2diwbwviejoool01xns2kyz9kvwtydp14nx5yia1mzk2u420tx10chbo9xdpd4ko36exvshp1tkq20qgud3j1pqsk1u4o6js0b365mdnnh2fbsq2g49xzb5bbn6jw1yixusc3so1vw5my1jh6n0aovfl6mdkmk8714jt67lcj3kfq6qmmbbhsvanhtqgj5l5o2x',
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
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                tenantCode: 't64uriv1qj79aqmsrtaj3u2nuo8fqlcb6yfi1hinv77dodxlgf',
                name: '1q2cvwst01wu0vadwar8mj64rb07y8q17l3dtap9ti1ovn7j5bvcrgpq0xl29cwrwbyphlta9w7092bwz3x8tlyiwysxgoweqauuikelwspntmp3lc38sd8jchsn3km2ndpyfr34l2iiaxdlgex318xp0hzwu2mgmhutdtgwxxotwgsuw0vnqhgd3m1m0sz8gac2f1by5bv1931fv4w2903d83sp7jt9cm5c6handsgrj6isilpwksof0vuerecs',
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
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                tenantCode: '9yaw7qkrzqdoxgq82zxeoo7vpcuigzdcx4947moqko6f9ftpuq',
                name: 'bh8ecytb91xkvxz11xisgvl83waevwfvj7tqtofaktwgodi1wjd0utsbaxxev69k6zyc452d13w71szr86ybvx1hjuzguij0gjweck2o5a5w25nmp1adz5w4372nutrnztgexdh83gujevbw3pnq0io5k5mkphuin5idnlebb9htxtopjwekkjovujoru0o1emhvfzxpn4woh8f55aymfxzw5frhsx8crnyy1xs6ivtekg97kp5w3r4b2vmpuxo',
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
                        id: '554f1bb5-e841-49a1-bd0a-d26b0b1810c1'
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
                        id: '08244bd8-bd19-48d2-afc8-22c18d1d571a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '08244bd8-bd19-48d2-afc8-22c18d1d571a'));
    });

    test(`/REST:GET cci/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role/65189ff0-d5d4-440e-82ee-59b0190ea43a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role/08244bd8-bd19-48d2-afc8-22c18d1d571a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '08244bd8-bd19-48d2-afc8-22c18d1d571a'));
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
                
                id: '6f8f845e-eb25-47d2-b8e7-79c5da37dd87',
                tenantId: 'feee4840-5206-43a4-a18e-e43fec54d350',
                tenantCode: 'zsu96vxunwhy829jbnx3wdyjq75454g3lyr7gakg2yw5vmoh9l',
                name: 'idcimcjsils0n8pbhe4i91reafn0ggunptnp3dhe0gvr2jkfipfnoqteil8qpwp0in9gkxsuadrvisik9kldjsn6qo1umw6qckenvt2aznf1p1dy85fsz0frb2anh7f908tke2ay7um1i7dpfihvu75m0ykga1qc6jembsvrrvae702chpczbsw192me2kht9sgm3exnpwf0tx6u8sf5upd9iyyfo5vnmshx0v5ey09fic1o5peqjp0utgc5wir',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                tenantCode: 'hhlhtpp8tz26n4ogyw39scqbitxlzc4ogmd3mcdfbly96cg82l',
                name: 'wglsiq6sthaenb04014sbjtb9v92bwzhzzr25vkb6s8wk07kmocnbb9culj1pjsahvjr89vqewe6fcy1hjrwsb5o5phngae81pve7j0d5xu8gsstxxg5ee0nif5rbxub852pqiojp72xn3eucc6ertjtnnuw0ku987nzdp68h1ckavgugwgqpq9n3ibg8k0pk2hnp31j3yv3semgo2yf0tp2acx9ks413s8tj7ku4zeb8uktiuq7j7vdu7gjplh',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '08244bd8-bd19-48d2-afc8-22c18d1d571a'));
    });

    test(`/REST:DELETE cci/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/role/5f0c03b3-89bf-474a-b6d9-ebe7a70096cc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/cci/role/08244bd8-bd19-48d2-afc8-22c18d1d571a')
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
                        id: '45ce4094-c099-464e-ab52-291ce3738db5',
                        tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                        tenantCode: 'ribl8rgsk47mhhvoe2j39bymo30gn603gq86r64rj1jh0q2f93',
                        name: 'ge5pnbesemtxz6vg11d6718opc4qjf9e68dsb33fq9ilrahl0eqjf4zemmn0pej9r3jiiu13rdaok5seln4tv2mn9b2ceqbwqihylcbr18s5mhcwmux7mr3dg76qdxo3v9pvbaax5dkxjqawjhkctxs0rdiefiv99ph2gwts0uz542djds3mekvj97c0fhwcu8odhuwe2gp8xxsktl07q6381sqjq00uhz5uergpe1qpjikk4sj0p2mzfbx10qi',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateRole).toHaveProperty('id', '45ce4094-c099-464e-ab52-291ce3738db5');
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
                            id: 'eac31b97-408e-44f9-b3da-d1e959565124'
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
                            id: '08244bd8-bd19-48d2-afc8-22c18d1d571a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindRole.id).toStrictEqual('08244bd8-bd19-48d2-afc8-22c18d1d571a');
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
                    id: 'e4c26801-4bee-4bcd-8aec-cce46417c77b'
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
                    id: '08244bd8-bd19-48d2-afc8-22c18d1d571a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindRoleById.id).toStrictEqual('08244bd8-bd19-48d2-afc8-22c18d1d571a');
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
                        
                        id: '74f4ddf3-fda5-43bb-af05-8c2d70ec3a69',
                        tenantId: '43616a09-8cb2-4c92-a58c-629b9ac23698',
                        tenantCode: 'blwyjtco09jnhu4zzrj9gb2j9doz1q8m3f81nrdutheh7o8qye',
                        name: 'wnx997l7xb3nimedqilpzy1552sectw5q3xfqf3aj85kbwptx542j8xvoyfp5ryc1fgh38rsn3aqm1vejn7iywnfp21tk6et3g2bldqpjkcs4aw4zfee2sgsmg8v8cu3ciljt3rtwp0hhn7fiuzna2b9hhplyiz22nsbcmigfzamdqrkllym8hl0vtsk072ggpcsa36prohkzosnxajeeuk4awgy3nx7sdgebs9jfxjp6s64ehiy8va5fnpcscr',
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
                        
                        id: '08244bd8-bd19-48d2-afc8-22c18d1d571a',
                        tenantId: '9a709050-aa31-4825-8316-e106c9d1f084',
                        tenantCode: 'w9et0ulqjf9v7m76swua48ovj96s4zcikqpewhib980by1sz5p',
                        name: 'vgpwbpazwcb55cuom3uywx8cg5r9drq570qc1qlxrqsf0osspaml7benybdkbhqfd98gnu0p9vw608yxhatfc391wlzjzdeqt1z7mynndywba96khabqhq61rhe9e18jloc5gnoedpou8y3akbq28afcpsz5q4wv27h1ohy6mxlwy2gh827ird36zp6yntkp4r5td3u5dfbroc8mrta2gqugv32n5kil0x0pezva03rf9zvvkmynn4d1gq9zl99',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateRole.id).toStrictEqual('08244bd8-bd19-48d2-afc8-22c18d1d571a');
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
                    id: 'f1df52fa-01dc-41c9-ba97-ccbe79caf2ad'
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
                    id: '08244bd8-bd19-48d2-afc8-22c18d1d571a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteRoleById.id).toStrictEqual('08244bd8-bd19-48d2-afc8-22c18d1d571a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});