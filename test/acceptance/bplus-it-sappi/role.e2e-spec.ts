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
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                tenantCode: '6hgklmyozq6l8mfa9kwl52sltifbpgww0vdavxylxhyq24lozu',
                name: '1ly3k0m20hp2s7kxuq7o4kbea5lemtr6wjaxsnfuc2wilyxqmvt400q379ole9cwom4olw3o3ys3imziyelsbcddljwxk2t7i77572t5z1dzm11mi2wfoat9rncanvhdsc1jn0dzn7xeqewnqia0bcr6669q7qt91ofu7nr2qfmwqon01byvgt441g7h9vsl0c7swb9pcxacm14leqjcvradjktdr97zvq5gqf63wtyg8rg8cvfnhi01svs2xwj',
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
                
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                tenantCode: 'qz65h7dmrxuqhk0bysy7ghjckdznmialoxkc6ybc58wiakw1pd',
                name: '1cdgd9tq1b52kvwuvd40lveuewt9sio8soqnjaez4ef29hf951gklrprxzajqfnb9phc1at5j4zklvjhqvro455abmuhdsrubblccv5t4b8h1atj3c4n2tp2kmlyb9l9pdiw3spvbmqd8uhrg513eu5u7r5gv977uf2td2hlm5rgqhzobiq9txc2fvxwvsf32xhwmw6ozgkrxwdf2nh8p5oexwnjr3q7gpzn54zmxul3hyjgta60bxbpj80pebz',
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
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                tenantId: null,
                tenantCode: 'i228zufd8df2n5ckvbfanfu4njy3hf8nwv3p1nb6wp9rpn7xix',
                name: 'r3sxr7gq7v3lgs4x9hqkjhtccptjzhqv9rzmaf8a2u2ja4g9ippzzn4h5mmquuybmzcal4dkz0jer73mezmj5a6qqciv0c75l6mxg67tlqv1osgowj1l6byaxn9upg0tmdjn988br8l9ipa7vbicq7hdzctvp5tg4kcepvu7xit1gr9phndkrzhl5kixwcmsm4zjtsazqbz6fjmerir550s9yu1rffosiq5jocm5wfzcn8xklrv4p52hsatp0tt',
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
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                
                tenantCode: 'x7mcexjtihw9swm88mfb3zbnaz3twhoi3m28deitsnd1obcq0o',
                name: 'ak8ycdn7kx6uqzql48ss8jm2titwcqfu19xmn2zj36co8hd932ckjeiy7pr4dmawurh2z54r5bnoh2f2hue6f5rxze1gr7jjqjsya2w1sf6cwrtzyyi74l23rsskmwqkki4e30sn27u2njqrg2w4qxfj38515wcv4cn5zh5e0kip6ezmgpgauljlet0ut4153ismp6zzek2qoeg7f8o84574rr7cziwv2gif6cfwx6mvz8s54axn0feaa5v210y',
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
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                tenantCode: null,
                name: 'p6t0ly3g95bjufaqgxy14dntwq98ltg51smw7n68sgwxyghsd9j2q7pho8a3lqa0cqftcepgpg9wpki2xxmijydafekhaxt7o93w4bizqv94rarkn5y9qtcyxosiizxagqux596l5m930y5k0txe2p3srk98iuvxa2r6nfxfdiobetl752lcovtuobwdvz7ez43gwrxvqxrybka7xkbad76k7m8xbq42i3j35nvofydwh7u13zquaw7tfy4cpps',
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
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                
                name: 'qoz7qsdi5t7h6h9a2kju5p5ipf6vtvvu79qfe1qpbj53ntnsf0w2unfhmjwqmr4pmu28muwu792y5oegy9iah28w8793bvy42jtv6ibrbl04f1bti5h699tmp99ix6ag7sw8f70abeklw3c4f7y404gu2t3sehbx9ngar6ojs87z8mfjtzzgdmq2wbs7gicrgdgg321xbrjt3cusltduj1p3o9ikaf9tmblw3389q3x7oqi4p6y7fd3btps0mvc',
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
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                tenantCode: 'jqt6q40898uk0y7j2aeda96qcf1giivn9874b3ywfox7lwhgf9',
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
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                tenantCode: '82xaayur7a36iigkv0af75wppb5ek69hfdztahse3ss8r6asek',
                
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
                id: 'f4vtwjoazlb07r1wo0pygd4tjt4jzheq9rngs',
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                tenantCode: 'vgsnwvzg7llbst476isw1p3xk50e72jwfu5q4xj1axcnf99unt',
                name: '0aiqndtnaouen7sm5msjoaund3aol6r0sg1cuoyg5vd35ws4v47bq0af9oygjy9y64ac66r0ml9mt6t8lyw37glq3ytyhtisakuodirb7ln8bdb8pvtxj90a8n0hxqyo949x22id0y7oh3k6xfajkv69adim8t0q0u6vujx61dvxv4mpa79k2dan1isjqsp07vq5ii19did79953hzemlzxn9s3kivwqwfffbrau7qieoyan1y72fvzb0b6zzng',
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
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                tenantId: 'aspzh8ljg5tw8docro64fvj24fu8gzcvjcxub',
                tenantCode: 'jew7xd6b6gaaszduo1zdrl68qhizl7ba68dqit1tlev8sjud22',
                name: '7xb40jffva25hlfts3htvjh9vtaekqdscfcxrw1b5pqfqhjj6c7zk73ygsc36ig9tq90htc52mxocoluuxkcfnjbh0tqh1ct723ofi2rbvw4pd5ipk63b6hwk1y8tzd21njy63suminqd4lozv9x16rhabx52ph35kvhzknndv5gtflcbricykpx9lysx9vvxo2y0j654xbosinuc3m3388kzft0vvu3wi4z1vpzn8i429kw9sap0s4iw2410dr',
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
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                tenantCode: 'fg99y23n4bghffungxvotlnftbdl9neq19boeukhqec9rsfnmst',
                name: 'tip9v13oct4zwvn7g9p3jbx2qboiao4gl6vmuy8e90gojk3a7bvsfnpfsimj6z4f7n4txyvhxtdf4rp25qon6qtyzcw4bc49tdvwyas5rj4xukjbww43unt2sx9r4hxl67ffpbhaz7509u8be2wng7s0ysdjeq2krxs1oi7z41q2xdtkkcm2i1dj2yie7yp8xyh1pp7c0otqbsixnm5twkwlc41q92t02phchkllfo3fhl5yri3utx87hn8ij4d',
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
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                tenantCode: '20sg5jfuldwt2n5l1s27gv62lu0fx7hdkzgdywut48t0vto5lq',
                name: 'mzmukfwhh68dhyqltv0bbanthzau4uq4tmal7m4cl5u3vlo6pzbbgdvbm6rk9mf72fn5tqqx0wyjohncyuwyz065jjpsb9au8gt1jdsdfl3osyfjc2l8r3ktm2m5rywscehwymck7uuswd879ocl83kv17mae39adrwrkf17oqi0m3cdaprvu26i6k5fozho643eg64wrkw0gutpzfw8pru2xvee8j3qqfurs0u8rkvs1n9bvgg236tjyemn884p',
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
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                tenantCode: 'c0dq97xf9xe3j6o19q9adgroj0rkxb8eirikrbxspaycgxhjcg',
                name: 'anw2e1t6r955h8h1hzth5o07gwpjs6cu5l0ufkhlo9jxvx8pgmc2qiuitapwt7v33y3niusj31dw5ru40xf3qrk2g7pn93nf1a27ztza4rp59at0hoosamq1jvra98jichj8ckovqkhheakjfru4o2l9otjgrc3d90cj4jr9nauzbjywbq7re0tteohqq1zparhv94oz3ui3shph1wuahper4lgmutq70kdtrau5o4e66at7csukjum9pavukdu',
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
                        value   : '3ed2f404-9a41-4f1a-8b67-f51430c2236f'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3ed2f404-9a41-4f1a-8b67-f51430c2236f'));
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
            .get('/bplus-it-sappi/role/3ed2f404-9a41-4f1a-8b67-f51430c2236f')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3ed2f404-9a41-4f1a-8b67-f51430c2236f'));
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
                
                id: '7f490c40-8389-4ba2-9eb9-9a85ced7b346',
                tenantId: '28cdb160-ada7-47c3-83e0-c3d63b37b119',
                tenantCode: '03r0h2tcx4w8ge7v3ojtty641eb6mbqc70uaulaqbi8t3v62y7',
                name: 'nof0gouvros8if5l6c018a4ei1lqdji3507d6lg084a397pcezhg16hsoobxfl2wj8114gwopd0qtfufrw4vfg8rjdq8evzrfqpin4kx4lmq1ououe58i21y0hmnq914x5hq8xsfog569x9f8tvsac3m4wfp6b8b8ir3hhv7q6rcq3i4o77j6kqjqyx5nss5t70atf5wk7uj9vxvmj1bwlu2qizgrc3n5grsih0apyrqsjioo6psxq51rsd2sf8',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                tenantCode: '1tjh2z9i1rcafgkqhvb07qd6802wwibtdbsv1szricadjjp4p4',
                name: 'ls0418lke2670epai758z3zqrf2x7yuemquw9466zaji25it0kqcjbnh10fa289709l53amb2l6sku5zogct0po4y0izdzx2fd2raw076z0ay246wr1z2lpwzc5jx0qex3ail9vek5tgtdpv8elxoh4itffymfkvws4vfhyndwmthnxub88yb7wnai9xnryzjzjox0x7g17re9vo5gfh5zknss7lf8epvw28p0pwmm4iv84ig9jr660d6xi2k4r',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3ed2f404-9a41-4f1a-8b67-f51430c2236f'));
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
            .delete('/bplus-it-sappi/role/3ed2f404-9a41-4f1a-8b67-f51430c2236f')
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
                        id: '639a625a-39df-4f79-bb18-456f38d8c773',
                        tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                        tenantCode: 'oqm4vbrfesxkokzuuz8z9rxc0kor25i66c32pe6outx47ajyk6',
                        name: 'nw2v35sobq8gun2lomon5b91iue9emrhq0db2hbx5irkp3fmh6wjwp15wiofb67ewyq3clqc8y8o1abl54blb8bijmwjsj5xb93j4tdmr3eonilt8vt5727i3nn9ptlezlz0svb9zh526pu83ihby1zbcarie14mwaa7z8alpn0h6qaxx2xouazad2l9wus8e1hrbqprfr75mx8emuhunpyp49z261ti7h3m3ko5oct85m8lice2dn17uhosa43',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '639a625a-39df-4f79-bb18-456f38d8c773');
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
                            value   : '3ed2f404-9a41-4f1a-8b67-f51430c2236f'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('3ed2f404-9a41-4f1a-8b67-f51430c2236f');
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
                    id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('3ed2f404-9a41-4f1a-8b67-f51430c2236f');
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
                        
                        id: '0e0b31ea-71f1-4c75-9c35-f693d3a380ce',
                        tenantId: 'f09aec51-e584-4f2d-83ed-485b4ed3537a',
                        tenantCode: '3ibgbin07ktk16toz6tjvp5vzo8rqprl0byxfbsdr9j80lndg7',
                        name: 'j8orggp2mpms62t6qhwvnthjiel5mya6ftpcdrqq5cfdy1cun10p2r7hpajcvmccn93rcndvfhhyqlcuw0kh0mzsl4rhqhn5sba1v5z6w4u0ytbtdiefjy805yxdmn9m3dykip5opabqtq0rdnrnydzknrrnx2puye3ni118xkykw918we7y1bqekguz76wcytlhc8o9nseeghf9ybtmt50bri780bcp54wtns0mt0c6q5qrtpg25vgoe7bvxri',
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
                        
                        id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f',
                        tenantId: 'c4410ba4-c699-4d90-9b4e-17390b35b42a',
                        tenantCode: 's47z03l1gcn4kgmhouroywqbejwjwmnqn2jiar85xub71kzenb',
                        name: '6shl3o95nohy3x5cfm9ouoyl8zybstfpfnq7csw94w3uyau9girsqajxkdhuqye5j9lcrythhtjj763btvxmpvvz2wpne2ydmibgyt7o6arqoim99pkjlwqna2l464ibt6o5n5lzlozkcu0qb7zl9lqojrbmuqunrnh7b7lqy8kdpeh9h6akd35y7exobc22d4du8f270qjs9p7z3e77rczaaz95pxc4qig79bikeclg71no0n91hyyiaty7hxb',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('3ed2f404-9a41-4f1a-8b67-f51430c2236f');
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
                    id: '3ed2f404-9a41-4f1a-8b67-f51430c2236f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('3ed2f404-9a41-4f1a-8b67-f51430c2236f');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});