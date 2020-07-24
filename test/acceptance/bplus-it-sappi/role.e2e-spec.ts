import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '@hades/bplus-it-sappi/role/domain/role.repository';
import { MockRoleRepository } from '@hades/bplus-it-sappi/role/infrastructure/mock/mock-role.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
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

    test(`/REST:POST bplus-it-sappi/role - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                tenantCode: 'wf6y86ryjd5kg5vh7x3hq18lwxvqgmvswdgsa79tofwkgyzgct',
                name: 'p3p6w36i1zyby9103vxaj395268f2wkhwqvwtnxvgdrk7hx6vfdz827ig8ci122wjocexcoctiwakemsdjbpop9rru5g095w9cmliw6cutcsi7hb9hesvs7gfl4jm3exmc39ohsrjx6302lxig7icwvkuh2jaedeahw089u3mf2p5kz5m6dff64h40yb2mbnril9mb2cx7p1jp9r6qcnxiqo0onjtkocn0td078f7b30r6zfmpkobk3ttzpovc2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                tenantCode: '8g50jqgwszzhafshapmqm2f5v400vwum8hi3yjcagw6ufotnjv',
                name: 'jkrl4f2ytf3mwycmvfaxbi67sdmgeqrn7ws6hhdbsha0ltfuczssmcrwblxf9xzob0f81k2iqbalyqr14j44mfxyn2dgcypdnywwzsmhwth1kkluddctw1aa9q1lkdjfg1k2tdjk0qw5kwkz6mzj4eskkh0261gg0ix22wjiterti0hlwm6q0h0khy833lqt6mdc1a15368y7y95svusiltpvr20941lumsvirn7u2vss8x882pr368akv8rt8b',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                tenantId: null,
                tenantCode: 'sldlvk22rbsjgv3sfcn4k1y2tok6lknkjl53aahwb2th5qz7k6',
                name: 'n8yof3l7opbnu0fj6dl2ryx4wnl64beajp185grhbr0apfs1yebm031nzd4z2ped1ry565triemvrvzxuc2ynldzacchgp8e6rputzllnnb3i5llp9j19j6l4a3e3dnbypa75ixpzyen58iv1xvcwlzcbmhnb1l6od0sfmz3oyv0dl3kj4oas1g6xpyzmj2nhz6dnim7cwyi2ee3q7kc0oomj3il2rc4mgg9uy9o0603c5at9gb3rrdqn2cianj',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                
                tenantCode: 'k9j9ydw1ww8qlh1h6mqh46uq4otq5cltydcy2yw0aotohmudlh',
                name: 'eft6hannt6gs9irvibefa4nwqbisw53yp4iu1vjnz3yj2zqdsql15d2ilvb12myiowki9c5l2r0551ix1x90szrw76gyqg2mgrj0f1wgb8lephcz4crzkjs1vvdz0kwne00uwhpkyx3z6tl7v3v728i5uf9fz4ljpbqp0bmqip36dqcvze4orratrxa1n3jm9jt5ylrm7lhn01bw9rgwl4n572nltogr4q5c8oetixgw01lj1r1b4lgbh88p4yg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                tenantCode: null,
                name: 'kbgr7jar8htt5crr7xwdtb347p2hb8n01emhij28kgsb69vmt4rlfnqkjoar52dos08fb6rd98q4e5j6dm4vh05s5ki2j2ws233jx0knxiuaamgnt80m60v2ihaixq7futk7jw636go4rahyuq44efvd8kn5zdxuv9c8ykmv0u8anhm64colnn6h1wkam52qexeqqju1dgek0me3wnwikzl7258vqmk383fyisg7og7bbx11ya63t771qrl6rre',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                
                name: 'z9wlw6hv0pca38dejgthw5ye25vb3b7ru1x0uzwnofj1q7amn7dsm7lmd60lshcwlxoz280wveq3075r9vtwqlba6ci0dj6c0qjvkzg3niyvrj5lv5f0re8g3ll3rp41hiagni9bf2ss6l9nrbesvz0xt9bfg84iovgt32q3zunmbc6p61f5xtprtruc0l3vcjqql4mdvj09nxosflopjqxj9vv5odc4xwmxo4lk261uh655bx13mnj7c4s3c7s',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                tenantCode: 'zhib7eoapp13f04d8gdbldnwisvsl0nl1tn0oyvd8gct58hmvt',
                name: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                tenantCode: '35nvmnntrueeqxy0jua46i4g8aq8yuerp9gtw37l4uwv6525dn',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'pj42s0eptlnhhg1f80awau4s5up1nbs0wj6jp',
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                tenantCode: '55w84fr2jo4lb1kltjchci0l88r6wv6doau1wbcm9m0s498ct5',
                name: 'r56x25rgtno9yd7bkapzlc9arki37exe0jqsgcc52fpynaeapo4ux5jta1rmbg9922bgwqel7zamvtv3mvb7ix6jtg2oqi5qvs52ihlrnpqqdlqdzypc3cpzdoo1tdaymux5wo7pkhwhp0cglia2qoayrc0n4e6sv46kik8ngksq0bvpbx5g70iajtd7v8nol44ia4izrhbducqydzk7ge77arqpslnhtadkcjf8566pmm4to02wv50tg4x6m23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                tenantId: 'nem9fcky6h9bp005xdr8kzuztmetkajujfi3s',
                tenantCode: '3av51pa10b2wph8axg0tcxrylt30l29tk82nafh5geotin7uyg',
                name: 'lcape3zi6m9qqzefh8hh2tlwanjw591xrfp85eceqq379tq53bv0pzfd9ynt7k7zfpveu86utkmqdqcrli5fw2hmar92800h20st1gnxz9v8ajy1ogdyz7fbeuqbhyod0k6fog78xhm5e3io1l7k7vkzor8k9mj54rdbkjvcb2i4h2zfrjvuwyluim97siqed24blu5wzh2chcp9i9a6et9dyoe0ngd1dzoojpwoct5qdekqqnzn9vkank2rkd1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                tenantCode: 'd515fee91pszexk6oajz2gj16i36lxa7ydctugw94c80xusz0b9',
                name: 'a98utcly6wowmd2w3mo3wtpc6on3dkspa16l4jccdr99351c0g4p4itgjapru1naztovw395kafyx1aovivtkvpme9j5t9f05h47fce66s0tqqnkyvcvjn2e7opljulyw1ynp0s7zwy3ko3alqbcuxlnfn5p1245d3ttn35tjn9px4wsuidbb3o1zzuc6qa34x5j9arxglaz6u2nqcserwyx6rna17rw079fqjwt8qpvowdviuqy7w5rsng52gm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                tenantCode: 'vz9woztli7lvcqni9ucq21t4aetlpuu0qd2q5gr8xo851jojed',
                name: 'takccsyeh5mjg9xuwxxc06rsaliz1fg1wv1tfy7uvm8fyl4q4f3a2u6neu8ysoso610r5jhsprpnfd74njlsylrfil7qd47oohicnghx6eo3nrwiviywa0ovx0khs63a0nrz1kcxye7ysz5qfwdhrnlw0n03j1pggmcmtduomk69bxa6ptpjomxmfewc4toi8vvvuvkz6xei9gy7ktv24plmut39ejc49ml9thp0wmzq2mitbkok0bl1j5xrz79h',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    

    

    

    test(`/REST:POST bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                tenantCode: 'dc3hoap9365prtq19fbhk9p62dyae8xdasjjuqbmesf6ptot5w',
                name: '7k71cs7vkvyi6zla19qp29w9havylf2t4f7wrvij5101d7xxtdcw8nxdlm9d7nvm5nm9rh9y9akz4dfftqz63awa2zc5wgrsgoe4oem9d2t96o9xy2figt74jyi5r5jf0egyq4lk1xqrxp5d4tl9796hatakfp8mrtzij3b4ikcdd50y5xnc8zjcvoq6tgxm7v1v78sw1q5gtirpasmukuqn6p1fjkk0d2ja05gqkscc0on5fha527wk0cys729',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/roles/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    test(`/REST:GET bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f'));
    });

    test(`/REST:GET bplus-it-sappi/roles`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/role - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'bacdbadd-e28d-402e-9ff0-a810a80ff078',
                tenantId: 'd9d65e92-c365-4a62-bfbe-c3819f3ad12c',
                tenantCode: 'vn3h855otqm11o85lamedripfokpxbbwbds1wzua6hjsuqae46',
                name: 'yjclmj26wmexqeexcfjpa194v9tw9ya1usbzevpxm1b6aattabrvrr6lar80pamqjz5hnypuqv8oh4q71jkj2wn1etn5etp1o7qbiphwvxnfiqwv94m24y3b1abpmb10wvoxbizh9lg6ht0whz97oz8jfe47ka8vgys2ehl76czurg6ozhoga3tywr76e2aso22tl8aypkti72hw7tw6lgogov9shfmx09e719f1mki8spfkazejqshts3e2u3s',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                tenantCode: 'lv4t7akh90mizyt1373wo4o0w1oh3068pd9r3ucal6lc2y033j',
                name: 'xifgy9p9zhrt41xcpybnzeepcqwnzow6z2tykbg5pz5bvv5198k9wq0dnjnbtmhv1ci02yvq9yxlo0a0iqm61lvus1rq4jvub7ser72qkhujf38n724ounoyt1vd5sy7rs76mq5veldyrqoqohvjvj4oido53ww8crvs249n5f6rwkh1r6v52ijwjzy1dhyv7lemhh6ytxdncgqylobz9p176c1nf2hc4r4z5vy2chu9y7vpv3dcjgc3wopf3c3',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateRole - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
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

    test(`/GraphQL bplusItSappiCreateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateRoleInput!)
                    {
                        bplusItSappiCreateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1bc89f40-f816-4296-9c7a-c9f61c26a211',
                        tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                        tenantCode: 'bsayxvg0rsyyqcmpmsh0qss8ltcbf0er9lvmzpv6g67otg8bjx',
                        name: 'omf6s9bx5curfn3ukphwii7dbz0tgxnfo4c2frzpcwio7ryvl6n5bk5nnem3thnhwb91z9pddx5zukcssytysld9o2u3uum2u0belcy9ma0f8cwl0l1sdx1ac077e9t4pas7qstl42s1ffqzrbc5f3wki7mhmuhosfntkunsanne4edxrjdmuxr9d9fq0b0t1y970h2vwfjts4epz4pnxsp4rcy9u5wt146hfunh1ttpruwwxxfrslocjyxtn07',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '1bc89f40-f816-4296-9c7a-c9f61c26a211');
            });
    });

    test(`/GraphQL bplusItSappiPaginateRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateRoles (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateRoles.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateRoles.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindRole (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f');
            });
    });

    test(`/GraphQL bplusItSappiFindRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f');
            });
    });

    test(`/GraphQL bplusItSappiGetRoles`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetRoles (query:$query)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetRoles.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateRole - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '39ebbc79-4a26-44d5-98dc-ac717d0a15f6',
                        tenantId: '3c2195d8-57bb-4656-8603-31e57640ad5e',
                        tenantCode: 'k6n05d8a454gvht9b23uxe6dnlyg9xsnan31f4fdpdt1bqd2gc',
                        name: '7bay45mq8r3kcs59dmxq6zjuf00edwfevpnmvos45rw1rplptzyrbold1d6nqnqnoaihj5euepmj274viza9vs58yusefluzg6f98bifs2myoi6o2hik7nl4moem22kli20booc24vngltzyfkporj90aof7o8hzqjkyihmzxe7tksitgmbcjwcryhnfil1mo3idv66c57xt0j6368sshwanzxg9h14s4yg6sli1vh5wv7ftpopjl276d7o31ni',
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

    test(`/GraphQL bplusItSappiUpdateRole`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateRoleInput!)
                    {
                        bplusItSappiUpdateRole (payload:$payload)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f',
                        tenantId: '3fca77d2-9de7-412d-a364-ae3163b0a36f',
                        tenantCode: '3s1om8r9jkwziiveyotp89hln99gtrk1pl7vnk5edhc7dw8auj',
                        name: 'a0o3vfr56ptzoe5ojcgot85hzd7hcd3u9mx4jfvqw7ik9xtz2qaapjqrla6sauxsqsrvhlwx4ba8px9p171drio4mravi9gayekqjwxpsg209qv988wj96hg4k2qp2z5huig2hpkkp1kx9wjluc8tmv06e9i6raphxlch6bg15utjqtq9alt4wjek3on4ktiqrtp19ov0fqcpx83pbrdldvm2aw0mhfz4yw1uyy9zboi2g5eiy5fbh8hr0ngjpr',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f');
            });
    });

    test(`/GraphQL bplusItSappiDeleteRoleById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteRoleById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteRoleById (id:$id)
                        {   
                            id
                            tenantId
                            tenantCode
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});