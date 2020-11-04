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
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                tenantCode: 'fnrw69glddiyzoy2ptygns2xq53shsk6xpdm6nvoj4117ewcrn',
                name: '3p9r74qme1kkgbvld4d0lpc2whrdiw4pi5x3hohtk4o53j04ppb0ss48kar3bvcqc97d359osk03a5mayet0j9xp2uuchtzgl3l2aa6j8jp6rechmgqtidcuffzy71w66m4xdrjmgdjbl1h0xznbw1m9al0dixp4nvp4ta5rwp61l35ifqt8pj2owmux5ugb1l9r3etwpmtcbhhsxdnif14mkdnbkhvbwt3bqmebgsp4wug0md15ppls6ms6pbv',
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
                
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                tenantCode: 'aywh4eocut1omtauhzxkzzdqfkg6majr7iu9veiowevlhhxl5y',
                name: 'jqsphzjhdyo67rkxe3fs9x9pn94rq3yz45clboj0krfsr7vqlybfb2d3ciz4ziqty0mf71lyn8slt6rdin10eqh55mb71msggbsj12xv0wbia523ajhqh8ev3hldti2pijkr088ntcfn7xsp9k7hzrv6luk0xxecgn2we8v0sprxpc5sbrs6zfyuatlsr8zmwoj1yximpwwko7s4sz5tit5fbzygvvkocgdw5smfvep6krsvs2sfokuvyhjoqwu',
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
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                tenantId: null,
                tenantCode: 'p7em7fzvef7l4e0entclapervnipzwmalxwwa8a1kd3rsy58jq',
                name: 's9llhjhitdbd2sqsuspp184nns66tm6vo4zvexst24twrnfiz2nkg16x83ld37v1ntagffoi9jqqqwag4bxlld60l5y37wmm6xqfv5xo69fhb3bi3abo1faswlby2d0u1vkva3s62erkdgtl2zpj3dzoavyjbbgqkd5ong63f03lv673meohjmsca9ik94g3jj0p7umfmccmpg1r3rxpxxf511prlyw5f8erdpfescrkf1aakulb2kmmgngkp7h',
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
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                
                tenantCode: '5d3lrkzmt6pebrrbacqllpckardpf9vk675pw8j7tesq7dlhd2',
                name: 'vnop18evgwx1mvv1j57j37al5fup32642mk03tyswa877hdoi7q2aks8vcs181r334ku6iu2akra67n9fmfenjrfab1xc57929pr948wulrdy8f3r6i3z35k7p02lukbd5r0sy9p1erkrb5vsk45g9e2ir9phwjptgka6khnvy9zwuwvd59flolbn8sznvc3pcrrm20g7lnp6pr8l63m1hjopzc13f033mfvxhhwj4g85wzkphjgyxme398d7p1',
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
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                tenantCode: null,
                name: '3br5tiu5p9ccssyd0kpr01aglgdpv58xf0iz4rjf97kvipn30fw556g6mqxqx02d0rqjaprznja25yy4z8zykwjyvzm6uahgzee43eaqkzvd1cdnx4kdr4vk13et586tp7mwdbslvmxviw6ltdedty0u9yubhvrv2iepnfdzq9y350ocnvazqygzuwqh5mnoq13s5sqbcpvhjp2eqpls2hyzlr210v0mefqxh316kdtiawjg5xw4wdvien10xzj',
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
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                
                name: '77uphinq6at1yccia77xehek7kvmbr0rwz3t62nn5x0f3ex72cysy5cqxbokmfp1z7u0cujetl867rpyaof8069gyeb15d99he75arbppro8qnr31m7bca830k3hkoxok73pzioemzywqnhf6dee7j316s5j7gyfwrgq17l2vrbxeq1a3fljcgnlzrjm57wbhqpj3au4f5zp2xzx5l3fg64yenpee62blexr5bl93qdjbx1pua30fcjbomnphsx',
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
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                tenantCode: 'd8bz3bfg87aethrin55s3igvkjly23h6nuqbhg5w1g8d2mdaef',
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
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                tenantCode: 'tml3xz4sbzylsn6mjkgsmgsq7fhm289vpxqvvwjl92hnt5tmqu',
                
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
                id: 'c7n1ftl78o2m4k3roetu7d4zsarrjt5yymi1c',
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                tenantCode: 'lzpxpf55sf1kps6ff9lfxeupku1bm4ij8kyb5dyh5w3f1qrj3b',
                name: '0fdvj552m0etoy13v1sgfn7fm8tgkh55v5jq3m2eflwc5cdt5hk53dv1sqnpjeptlh1lp6kzaxizhnh1vp8uv5xmfdr9w9k34a93kl3tqe07nnl7othxvbovfprjaw8debjo6oy63t6va80zn08kqkhhsu6lxpl57m67nbb3ep119zzze1t8au765u4m5021bvldq5fl7l39e87r139a1cqxz041d190t5cm267hqtzcqt0wiijhpnlqglk2xgy',
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
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                tenantId: '4jgxw7q1ltshq6z1b627kweny8mw3nyf1eysb',
                tenantCode: '0op706z62lqc1fk075u3tnos1q1gl9djhbujnk411tqgtjwud3',
                name: '7j16o2y7see91zq8rcbgx301umj0z5lpas2tytexz9l80ydyiaonhtk1jecxlxwffcwmwjocsjfq1xrdwu580xedg5dg6qvs12vctnab64dauweachjaztaykkc7ozpbhqhh7514y6cbf4q4fsy6xzmflfp9tmutv9t2d0ypjqsygedectxzy15rygt5kbgqb9siobj9wki5smunvaiw5z5jkcq364zs2a58dz8dk3qxcj36bxkj1v10auj9ste',
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
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                tenantCode: '7l159t7035wif5igjmx5ufposhaztnysw9np1hcb8ehir5k2w2w',
                name: 'sf3mn9vkwy4gv2yzps92egzmpd80g218fyr01zxy1pacupb2lyxilzvj6ud4vt9oox1k91zp5nswid571dbhd1evmoe6u58gx8yee49dechzj9omkz26all91dhx4uzn652iu7786hhet9dls5a2w1c5ja25v13d05uyk1h7v859d5m1l0n52e69vratx9vvs4f089yykf64pe0u88mexf58bvodlfvwg7v39zus43z1d05p85us80cgxp48yba',
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
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                tenantCode: 'efj2m52w55xeszfo898jt0l450zxe9r5smewtzfdkc1ckw4fgl',
                name: '5tt4jdst3708dw9iy1a0538u7t56pougxyscdu7eq96vp671fd2vraviv4ns2bvd508359ll9nw9xzeaae02pid8lqxhagybsn1e5gw6o3ipnl44tb0htngmikgez00d575tpb399yi0mwidlbelsl03ivy1mbnlo7cm13uk5j8ogpnhn58he6vv603ryx49hj8zopz3k5bdl3geibomeo4koks17bzct3pfdaqh680u2f5ta80iu0cngjfbpa3y',
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
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                tenantCode: 'eow9zemn7tuh8v3fmsfdietszatwjbrd5ulnstnetvy8c0j6hh',
                name: '4ow9m4a5hljf21rch1ywxj5w1osaqdfnylvijzry0l6d72xnr4a8furh2pi5kv4mcufle0fo3wvywsbpjya6optwef8qhojsl9jee4l0cky33v6w2vhujqwqwl9n364wrgqvweui1flbbfec00qldin0j5or3d3q8ka9cj2z8ky08f6egzreixegzz09qaqzewcldiw2in02ubepg9p7lovvdjz1tub3me20mkmks2sbujt8rkif4zkajaazoiy',
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
                        id: 'fb3d93f6-2891-4d83-9d08-c0e9d002c77e'
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
                        id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '84a17ae3-92b8-417b-a201-f7fe8e01cfa6'));
    });

    test(`/REST:GET cci/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role/6294f36a-5097-4c22-8528-596086e47f7b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/role/84a17ae3-92b8-417b-a201-f7fe8e01cfa6')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '84a17ae3-92b8-417b-a201-f7fe8e01cfa6'));
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
                
                id: 'cd36267e-56fe-453c-adad-2befcd3e7d38',
                tenantId: '5c25ac6c-9cd2-49ae-8fba-7c537f6dbae8',
                tenantCode: 'quuaouag0bhqv4g3sfxun51l28fo0z253yzm1ad0vwpeu2k334',
                name: 'hb485i0b82fv86xt4s6euadmyxccbvn89ufsisldbuebh3nizkn6leptngir35pluitfia0q650dodu9oou3k5vh3vjgfkjsh26mzi9yb65kcao5bphpfvk895ht0kbn50qxd9aduph5letg68x149bryvkjylf5pay1akhb2mbc0ate4du9n86bv3v9mukli7vtnd8h7zml5ippl3fylzh8wxkbbonlrz1vuguapvado438eywdz5xt23f1v8h',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                tenantCode: 'h9m0wmppe3v92ec4oeczr7769g58rycq2vh705xteyva8a44zl',
                name: '74rjl6ja03uhedyvspoynjb9vpeyfn8lf5fade1t8pipq4dii190gbc5ko1n91lfl1ugfe5vlwuirqoc3q62gadg31dy7qdzo2stgiv6qwcvlr4vf89c838kjfk6nznwzp4anjkzpp1wxr3f3jhm20fvhhiyy4opzlvimhfgmt1efu0myspuqyd1fobsh2prem6jkacag6g7rpz91duxu0g0ljwd2497rq447s792ycpahomy5ldk73nlrj9r3k',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '84a17ae3-92b8-417b-a201-f7fe8e01cfa6'));
    });

    test(`/REST:DELETE cci/role/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/role/b72c197b-8626-444f-b1ac-cf24d7bc20bb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/role/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/role/84a17ae3-92b8-417b-a201-f7fe8e01cfa6')
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
                        id: '476a2c05-1254-4e49-84ba-9107a508a9db',
                        tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                        tenantCode: 'toe0ihjwz5cr68pzu1ouermv4xp0ffmpierl16u0sp9mxe3r7k',
                        name: 'wv7gcbigvf9nsyxidilrpx86uymqfxytnokii53m4oh6zrwpvcrdjc6lm4xyjdovxpcvo2w9ikk3qahfs8ko92djngzcvmv6motdeb3ev240j5i164twefjt08kajolulpezfrfcmxidtln0htsduidhy8ztj7jquew7n9bo7pykhb47ziojs6mh689j3fkd5nx7vm5xxtzgds101cyy6mybddea13pyg4qgzq4wri8z4x4gsde5tf9vb694dsm',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateRole).toHaveProperty('id', '476a2c05-1254-4e49-84ba-9107a508a9db');
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
                            id: '002ede16-36a4-4e09-87f7-07edf529779b'
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
                            id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindRole.id).toStrictEqual('84a17ae3-92b8-417b-a201-f7fe8e01cfa6');
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
                    id: '42aa0aaf-337a-4a27-ad15-46a93c75041a'
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
                    id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindRoleById.id).toStrictEqual('84a17ae3-92b8-417b-a201-f7fe8e01cfa6');
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
                        
                        id: '453b6db8-dbd1-4c92-8672-03206b90f444',
                        tenantId: '5107a9ec-a011-4ced-8ca4-8b8b31e3d69e',
                        tenantCode: 'bcmiq6dh3ijb5e5ma5zbe4m4f5dp37pvmv6j8obg7fq7qd5tm8',
                        name: '6vnmzq218fbbo6gzd4okj09qhxktiiw2mae3prduuqgidq4hwt5hgan80hx2se34p6xa3itlr0vqhuvfqunmozpl8qv54kb34l5guv1edgotcqqwwc14hvcuy7k516z9ncs03uimq0dsmhuvss77jp83fhitwco4i5vzvffs7i8tzgymswhg1bttlvjzn8cdxms2mg7xazwqzcfmg5f74yu5c5kx5bati94ni2pjhdn1qi02zb6ftxc0udbehrx',
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
                        
                        id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6',
                        tenantId: '8b939962-6a8e-407f-bbc0-478c1286282e',
                        tenantCode: 'm2rm7dazlrev6j04hkss5tpva1k10feo9sw60t8jlxazkwsv43',
                        name: 'ohv1jygnbduiqgf0246qrfsk9x1kzkn4f3bmc4s3efot9n500pmwh9htk4c663ez9lkes2lnrfprv3weosaa7csbb07xkq900rezmyje972bqsxu12ou83bm7p17lt4ru128xdfx20aa0tj5mlqe9q3k06tjgs6w09plgsye0ey0qmf2y3gvzg87wsvuen5p0ik0zenp01sgq5xgmz1km86kih200sm441tekyud0l81h6o2xob3mmehil0ixaq',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateRole.id).toStrictEqual('84a17ae3-92b8-417b-a201-f7fe8e01cfa6');
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
                    id: 'dc9e2575-4104-442d-a190-d91ef299f61c'
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
                    id: '84a17ae3-92b8-417b-a201-f7fe8e01cfa6'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteRoleById.id).toStrictEqual('84a17ae3-92b8-417b-a201-f7fe8e01cfa6');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});