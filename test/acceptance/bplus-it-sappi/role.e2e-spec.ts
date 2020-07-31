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
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                tenantCode: '87akvhqk9d62omefj83ofs16buv5rk7bjxb65muudktept5ljm',
                name: 'kgxm12xo00m7md5wkfpli8pcb31bui2bop28j9l7ivy1mtd3jdwfpe57qirhavmivizcaazecy22kmmkhzebmbbwb1gpjs2fh9aeicgcwzvanrxjs17s8i2a1udi750olk0c74cdtdkzudw8knrbjsbxlp6gj292uxkbgcoh5xzgelmwx9l2fv2e24k97dabrj0ny137o6izqpns139dlpucj1qp808emhpzyvhw4dewze8szci1e9lk1nb4dlx',
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
                
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                tenantCode: 'unj4zb52upqloob1iig5ltqjv1aqqthrfkwpdiu7a0hbtpuqmj',
                name: '7oqx4b8mowrovi8ziqlca5izwj06wy6s8dhaazzo6elqsroe3cp3ei1n1nehy4fs6gdv7o3jdseagpiwpujguca5f2k7dv9pms5cc2x384jrtz2sfgx27gbaiqzfn8uzi7us79a85id4mpombnq1whqt4vdoukmful4brxi6mqoqipcrpq85qp8f79f1s35f6iw1po1tx3mh7fi8ej45fosjht7bwd69yf7dc4k6f3cou7xmgmyrorubezn32hc',
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
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                tenantId: null,
                tenantCode: 'cze63u3ny30z33gct3qs88o4hp9s0g18o2teqhtk92gh5z3qkf',
                name: 'd2o4nlxfzl4xs50zhq2c4tovywg7yfxvt8vy2csvkg5tqs8bvfwoxotr4wy7zxr05by9c4sq8o2vr4kb64bvd3z3vw6hvxujmkc0553159ffseat5vdqk7f9kd8j6vy1jkynx3jlsctesof32klpe33vbm95s85q9jmiwmyfc9wn86ccx15o1m5ikr6psoekshk1o1l3v0g3g3a91qep187njwmuaa7jppwimuzgq3kunalbl2d4g41opkbhufs',
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
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                
                tenantCode: 'oi6nfgr5sssqe72eq84bcl80ru0emxnmifdp7vxtm7i70ohqau',
                name: 'd46fa637dnzcqayr8364pqytzh7v92do3f8orv051awizj21v4oy71e0w8ebyf223qy4xnbjapdk2vlmiskoo1zp2xh9yz8hlphssoxabmh2i8wut1txclogy9txfilh66q4qita66jrqgo2uhczs2686ebpubf71wk57qccvuu9oksj32qf7y8ycnmwzgy2yrdbe725marqdrcfbtttcjty20uh2wqdlz5vwy2vemrm7hd68npbihh050pvyhz',
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
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                tenantCode: null,
                name: 'kxbwkop7lvlpu55sel2kztad58txbvu6g276v0bt20easje2vusrya4fdqu2ifwpdtjuzjjo1tkv72ceo1vlmpa8j025eqm783ojel7epmj9kol92g73ziilcdgxneiufh7fobnqw5ljtf2exzms15lo9psh12tue7tm19bfw1bn0lkryw48nbcmmqfqtamtp8xxthxfmdj6w4kojt7w5ll5i3m7843ho8p0i9c70rq4ueby4va96njh7c2h6rz',
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
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                
                name: '3ad35edtysv5yj0axpgiyb9xjyqjx1cxp690ob6cwj6fe14gtbr2gozmwudt9919v279802ke1blsy4vrh4uk38o3hetdc5rjjrdeblzdfh7ekavnwylcburhfgejk20gmqddjjn4sol0x57assvabpu16tti6qd4036vj5nzy78ea8l5twznwc85tpsj6s90zu7phnie5kf7cl4m9uks94bumzgjulfmgwh60hj0fqt97zpyuj0d7xywfy8etp',
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
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                tenantCode: '2j5mi9ex3obmfkw6uqi63nv3dfd5d4kfa9h91u0491lr7dj9i4',
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
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                tenantCode: 'vkhxckaqyxw9a79ntyquaa1mqaqv428i85df2bllqx3vbo10e8',
                
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
                id: 'x90jlftyt0gy0zl51qzw551h1vztutf419i8d',
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                tenantCode: '0q74tfj49gmjv3t98wlkc97dokftsr4ege4vlhw0z5fzyzkofz',
                name: '9ngy0gsulokwf2nmf9jhyalkcmxi953kqvmi2uhf509vvz3mty3n6rj278vvbvwpk9mnmqpbl1sjfiifh36bz5slv68o0g2h0o1uogmd85qqaxm5hu0s0kmm03ak542r3vrvr7tnqsi8ulwf1i41tistk7v1ocjag3ap3bunxunmzp90083b7smgzawgegyha0ah7ofmgztbni9y44wrcu8ba0302hs850rudh5tax0qd3npvwt8y0zficxv8do',
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
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                tenantId: '0dctfhpvmylp36r0zgwxp3ma0gv0w9cvflrst',
                tenantCode: '3np6ptueay0fstvl7gmaz97yo4lmi5z11gwve0rta7txsc64ul',
                name: 'vy9k95xvkrotxrw7nse2tni3ild2p7k2hm6i8ix21snukyu9trvfxqb43y54rm2pdx3vduzmi9w9hmfuj7byolze5q2rmlyb3lggvgt9p8u3c8rjlasb4iniy1x87va5esrtohbwhrmxisqtsmttlkoqymm4web0b34dz1r9i3064e98tl4ndiy3hbsp8zrprxm2go7s6vj6mhchz3dpc34q5p8i2s21ftjxy8aa9q4jxxpuf3lrcg09swd2aym',
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
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                tenantCode: 'cjxevxu748mhat1r9mnuds7eg4h03bwyj7ec6kpqxcj7ekpu0x4',
                name: 'r4tuk5ecd68lsj8vz0w7tp87ixiruf0cbb83bixhlr2m91dztqprtnicltvqjjos1dmdq0hxab4rihaiams940bvcbaz9osvb7c6q6l6s0i2cqpxjbaxtkickynx8huf5c1yvibv9get8kyxv0yc3v527ah64ddz8jw4qu4atcxlth6g98ok4j3rxykjiray7bdq1lzqrmd3u3q27a3hietieesepdjuy1r1flkjejmz7u9gjajd2h0u8whoqjg',
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
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                tenantCode: 'ptgcu1aipixaveg4u3irjbc7knjxfl98h6ou7lzfniqquewlkc',
                name: '22k8exfh0cbjhg4xapmtzha3xgisuoqopwzcrwmy5ypkjpwrsrd3qj60b56nmcrl9x37cmmfmxejiadbgxv958z4sfcqr9rqjh2bsob47328syef4ic0pl8yci3s17pobyd32e4c9k1orwihwhqlnw4c0lipolbkakhosxpsr9tozsxoqlqrsvrwuk5rn19rzxc29x6cn1uhql36shy3cqyblhgrwd7j6m2uvhaxmlb9uk1rbbsd8npk7qj0i1vo',
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
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                tenantCode: 'pzshj42wsw5j2oox55yvfscs44cug4yompp4fgpuy4xn7c5zg9',
                name: 'lv9javs9om3evxnlc8agp1w14534l1rvh4hkq83o9ujcf9zmjcp8b4mazp2svm1cgfofiz98dgc2sf9aei2ztkw5hln28klp319z5omvirikml4y2so7qek9x6s50b5go6jdistk86l9olgko4y9kpuznm2mcxa8xr2rfd5ypqsdwv29fj9trlx6iloube608b7e8vmtfsigwpqmk8j49ugzofa3k15d66px6o1z2118zkeye77p33m1u04cc4k',
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
                        value   : '4ef5c575-764e-4e1c-9ccf-b730e069de41'
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
                        value   : 'e3ffad00-ece6-433a-970c-be9c3fdd80f0'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e3ffad00-ece6-433a-970c-be9c3fdd80f0'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/cb7854b2-824e-4e70-b18c-488d0d2fe2f9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/e3ffad00-ece6-433a-970c-be9c3fdd80f0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e3ffad00-ece6-433a-970c-be9c3fdd80f0'));
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
                
                id: '58939e2c-44f8-43fd-b437-c57da00a8969',
                tenantId: '402daa31-df08-4812-b3b6-8f7f9e387ed7',
                tenantCode: 'swjhh35l818fva79v1ldp9n2jjuvy9gb0p1wg4qa66ize6iq9o',
                name: '6vmnhqwch0wq53jmxkzpjqbvrryb57m7ddgvtfi0w62ilj2yrejrxgqw58cxmr0x9xksv3xtycyirooarj4tmbynfixnllkzdy5auylgxwu88n4csbw72if37ywfl9d6wrf8ftvxxa2hz8kiy2h760i1vt9xuv1u1xcx5fu4k6vq4fycsith72uc8gt6vvptizyjce5j2j2915azzvurudsbo3zvrn2x594gcds4hw05nu1agsihkz0n9rn28jw',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                tenantCode: '1ce42o5almsr203wgigklagkcs7ok60k2z3emllipst04dij8b',
                name: 'cls7zvwpvlcnkgcxfgrbgrzningobbwg8sm6c8pgrmc8voac5trmzr044c0mwdvq0more1eqmcos8vilwucm0clmoizlqt980g00alghujjf2iudk4l8tdsmr3we91ybshidhpq27z1h357cakcnwn0w3tfna5kvcbr2iiii86yaf51h81k9upbc1zxzknqgmce2ueji1gb3u8nmbz1izcxzib4tt5zhxgyzth5357zp9z780r52499jsn8aa7z',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e3ffad00-ece6-433a-970c-be9c3fdd80f0'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/7b4172db-b3cd-4b25-bc62-226fb6f2ea30')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/e3ffad00-ece6-433a-970c-be9c3fdd80f0')
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
                        id: '80e74f8c-76a2-43b4-8e19-68e81fc598fe',
                        tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                        tenantCode: 'nzu7phzwk16y3ln0rcjp00z9cb0ls10wf17vznp69oi8za42fs',
                        name: '2c2rfwuvgfe8bu1dcgnfs0y8skypwayffjila0xqe2tttv8i6c8bqd8r0z96xhzrhqz70rsjrbgq5u1p54bh3aetr83dzvcfpwc8t13ncl6vno0ihrj23pj8zfwuotgaruiude8ry159tkckz9ghacsg2zz7lze96lifu0mv7qukj87b1vcf68bgtqr4vi1fl1igobbxaqlic4ul1sy1lo3oovzst4kxpptc0okkf9q4hd0gtd2564ngv37zqd3',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '80e74f8c-76a2-43b4-8e19-68e81fc598fe');
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
                            value   : 'f9a0a17b-9e40-4b6e-bdad-954a4c40ef9f'
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
                            value   : 'e3ffad00-ece6-433a-970c-be9c3fdd80f0'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('e3ffad00-ece6-433a-970c-be9c3fdd80f0');
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
                    id: 'c15f4500-f97e-47b3-bd0b-28f25e448ad1'
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
                    id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('e3ffad00-ece6-433a-970c-be9c3fdd80f0');
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
                        
                        id: '03ea808f-96cb-4daa-9f6b-7d2263714945',
                        tenantId: '8d20ef0a-ec0e-4998-88a0-6feb13bb9134',
                        tenantCode: '2rn6g0ypdh4hdj41k9h57yd2388iirx8ldpcb7bm6x3x684x2g',
                        name: '4ez4gnkbpeuexsvrt5zfcxvhrjhkjcg39whpcsknz67uh04u25vnjwafuenak4xdw74ugcjzqa6a7w6fn7likmtv8utkiiiuka0wt24e6oar8wg2mge488gysm5va1r618fpv47idun641o8ixn8alpsy15jdvei4jliqi6nu3ou3twidm39qs3b82dpn8wt9f4uiq2n0ra31cocdd46t4p753vj1kksnhnyzq09kttys63b9nuyuvpfifab8fp',
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
                        
                        id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0',
                        tenantId: '36b92846-24ba-40e2-9cf1-19c0a571f5bd',
                        tenantCode: '3mwfm2rv1mtfdjnei13u1dtzvad2uhvdy1cd8e9nvgis3fgd1x',
                        name: 'yo8f6uz30spssflzbg8k86inu5dlr8y9buc07rjvx1l62c38126xdnm6ndgdrx5qkrdrowvmcr0e23x073ler31o5i78tjy8r9o4mugazeem607hspflb4a501myjnp2oyx5nbii2lkq8slbjnkq0hk2348n9cf3d200ds2xazpcizqf28yaivxubilpgr2x6l2uo392xrxbvwq2y35wjqgxixd4mfcfshfhga39djhgz5x3s7i31q2cg21prr7',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('e3ffad00-ece6-433a-970c-be9c3fdd80f0');
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
                    id: '5f444113-af58-4620-be33-6375a07aff48'
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
                    id: 'e3ffad00-ece6-433a-970c-be9c3fdd80f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('e3ffad00-ece6-433a-970c-be9c3fdd80f0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});