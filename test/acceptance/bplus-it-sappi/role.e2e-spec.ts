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
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                tenantCode: 's0pjou4hb0m8r1sgel9m3xjltv67w1mskm9yiz7q8pww60qipd',
                name: 'j7gpir8jj8lpiw7j3oho221c0bxd7vkvsom45trb2ndvz1xwrlnn11taqibxy09z6v2wscuxucbekewpmtfsoktbm3w8smny8ayaln4an408adj1h8hxw7ko46rq5l1b4ydpj7gzc3af03wbb0ygc8dtz370x7jad0ppdlc98ewx3o5ek8lchv7irg857x6zrr958alqel8jk4cnmta3gwk87ebwxk4omsv6g31vid2mxkxydser2oiwp28k3hl',
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
                
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                tenantCode: 'rihsyoqef11505r0o9pijyehqs6e3oj4c2wosvo5hag9zzdvkt',
                name: 'eweqmpmt3fpv1kcue0aa9cha2nggdu29kjtnfsuvfy6ofhzghkrfwqe3t0w8bl5evccq058vkbho4r03pctvarmowypzu9hugrfg47kxsoz2wodicce8p3s2xrmyhkf6cu74d2o7abrmlksczi2fs6cby47ymk1d15k20ds1b0554gczqeu0zasmj5zdjh3yhtnsos2qr6782qioliev3ohda95ebwia4s1jfgwzenrfvtezwwhq9bk36mn9gb1',
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
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                tenantId: null,
                tenantCode: 'eibrlvtjquqpqvfdbkaetzc9tsylkwjkxumt9t1ne5yz85xg7j',
                name: 'wbvc7pvuuuy4vmgl6nmaii5itb4m35fkk2y8k06fojo0obffbpp5ls36t5c14lwf8nbpjo4dexkytlbo3vy6jtxzolg51aqoqf14ksznbhtflfubq2c6tiisgf4nw1ei7fyy7om1kwqjmbid5qya5vijpmbx3feoz4p1ekgv9k9cj7w6hct65cr7pyrlakm1wlicdrwn36fnv9dk83j0u6w7bbkyj64v1o4uz6k137rtxe5vsnahj665uubsfy6',
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
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                
                tenantCode: '3iuuxk9d2epdafls5chxucc08ueeogdp8qt4sn13k064u39xug',
                name: 'zywoebz8ytyz0u1wz8806hrxiuhlvp78efxqxzwzwqeiir0m4uuhk04jto0ranzn1uz5iae9wu3z4fcnxzqr74g43m9wn79lhnpxjhf794njzi6f797aq7doqhw0n7kfqt3esrs0kdwkh9nv8v7x2h5zupchi8rux2u6m6xdur3flyo35psxupomml5r7ymssfz8lu0v5qxkwbvcid4uxfz67prcqyvr0id1zjdtewa9pwoc5iuiuy41l6lkio6',
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
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                tenantCode: null,
                name: '1sqb3h4ftu22ds1kco8i1vmmw6fcung1w9rm4vg3ff7vdlkf2n9x0h6c57jf3tfsshts7l7jc7rigq9p0wihu7dod0ek4sas5cx5imx91jn4uutmfxbazyt9xndsvr02yygj2bwsuuosp0iyszk62234jdtzmdd0duyd7p4158qgjx8p7e5erk97sf9doiuljob77hn29i9me670nzpsajfivddcqoudi9p4kcsmd2zvh5gvc69ylvbi7n4dtoh',
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
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                
                name: 'zc8t6pgol6teguq2kklahywo3dx6pwrimbpiv24cz4tikkkoeoglt3r5a8wguhzqr4b6g3e66pgu8c7zhmeg4fryalxw2ggcqiussm9mw225ggj9hn1os803q60cy3jvw4bon66zi1scscvqxjezq27co4lw897dffqs2uh5jk1n1sjzce3s364f904oi6wfpqzlsdw9zy8616c6n27ufprd89i5ewvdzowooc9odi1jddze2u7c1zjl6rj4ew2',
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
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                tenantCode: '2qwvd0ab975v8kugkfqmxllj1jazyxzw6l7nxx5cgce6q325cg',
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
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                tenantCode: 'urw7fr3gpfm9epu2794ds247b6p453x2buu2kbyrnlx6au2yak',
                
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
                id: 'im6i6quwzft7nx0bxbstcqsrgf8pfs6tfinci',
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                tenantCode: 'gscla3hud0jcnwq22ia8dtbpxzo4kvwox7w4bsxmmjb16ipdfa',
                name: 'rck8v3avmmn6ce9niy2f2qaia37idpjz0oci6nzkxhdjh2wlel5kt0w2gcejmy8sapt9b2w3zsp1hc5kjpwv2tqou7k1j0r0zhg8lc0l6oai7ldpnuyq41pccff50tkeu6xkjv2qote8zty5jpxgjzlsszs0yfkbyrn2axp4zf2turcd8yrn30t6842h5hsa1evjv3nmdwa5w8oif897c8in5blm9ewfu7xduywtls59xs2szeova87j7kyjr27',
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
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                tenantId: 'a6dqjf7ns3lp7vpna6xy8zzlxjdxkk74ynk7u',
                tenantCode: '2agdsap5t2duv2i1gx48kk22d76lgwtleut46a6smkhdvfi330',
                name: '3hkicd74ue0kof3gwayxu3d8ucskc8bcttdyhx98s0tbude6vxe38dtxf0894ybd01o63lu8rb5ci2def5a3ikzx0xx9ur80hwphcijp81y43ng9ebe9t5r7z8w3cqcmlt6q0ofa9o47gjmg1xt6mnbzk3if1od7mnyngdq9lrgwmzvdn8iqxow76gf04efogcwwxo5a8sdyr54ul0ka6yzn5k2nhjnx79brmiekl6meq3pqdfoprnhehf2beop',
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
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                tenantCode: 'onlbj53ga8czsvr0exqd1ozh8nfvgq3f4j93y5suw0233dv7k8b',
                name: '0n8xxcu3jlx3k53cn1nj8xudzbmeo5btyfi6yublhlmnpn710cswjf7hpfm5op91pq6kqhbzpi8tbpvd3uw9f5j0wpuza1vsv4u9751k1bmz1j2xvlacci5thfewovfnmohkizweeqfweldsrlp5qcw5trz8kc3kfrzleata7bz2bob0nznmym6vdrwwiy39t2ofmyz52ofvb9w29si3jvh4jrk2p1ml3n535whnfn2ig5godfj664hv2pxk4ea',
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
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                tenantCode: 'nxds8nmwqt2zewap5582wz7v43fto31xk0ly9agasvzexv1jf7',
                name: 'y5oi0fpq84oduillo8kl2zxy6ii9xbey4koqs7f974axqbxc2coi43pfvtt00pq5f556dpoxax0iwl47c98s9zxqr0woc78a030z93mealzxb03bfwnndsde6xc4mhpcei3ahtn07poqj3envmbmagl2vzpwfdx8yo7c1i1t9ng599galjs241h1nydq9lhksk8syczv91k9yne564reoj0a0o1popqcnljid2b1nfsr5okhjwfrvx6lxepca9vm',
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
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                tenantCode: 'jpbyiwnyx0jwgduay2a8kwuw93atfhxlusg0l1h7yy5c0cbf4f',
                name: 'qpgnp9caszwjz55741fu0o7gyajxm35iirt840ypl94hllyi0xr4d379ug2qw01fk49xmurn5jgo1f6dgpie05jruidpecnvi4ixoujjiwo85v7zlya8gps78bm1wenzyf2zkuqbiuwbbkq2mujv9zabyw9ywqgfqk4psm3ed4pnjnpzv8upq57ez004vncn5kt9ua7ejen1eq9riu4rnjdd9pd09n7i9kx547zcqz7zq1zyosldkjig6pgrfct',
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
                        value   : '2bd02d95-4282-4d95-ade0-c1d066a09c20'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '2bd02d95-4282-4d95-ade0-c1d066a09c20'));
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
            .get('/bplus-it-sappi/role/2bd02d95-4282-4d95-ade0-c1d066a09c20')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2bd02d95-4282-4d95-ade0-c1d066a09c20'));
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
                
                id: 'd3a78a79-b28b-481c-9613-204458ec41c7',
                tenantId: '506cf7c9-708e-4d28-8141-e505741a7735',
                tenantCode: 'z8fq8fndz5qlhutdn06scdrpkkoxoj7hgdcdfd1bvnky1ceaex',
                name: '015lcm7nw5x4r69gkil62s8tdz1bgry3qfh0kdfxewhdjlpi76u3l31rxmi3bbtv8lg4vz3q28925bghhynfi5ld8obecwm3buirdwrz2sr57w8t4vcwsmpkmit9n3nj9lwsbu4o0xrdmjpnp1lu8xnag9vtluxz9qlc78jhm961lz1h896nckbr74feshlsb2qm7a8rpwn7samv96ch7askq62e1ihvr89no00z0gjs6a6r6ysem01kh8mnl4j',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                tenantCode: 'l46314qkqiqy13aubixc5k7vlu95azzf6jdk18a78kwcyisl8t',
                name: 'm4kxlkajfjw7ulgxjtni2v6ay8fzw7qqg4err9kd5uq22pt9f8fa5i5akh4et7m1v0dadcvaovhbqa4qoiugpf81xcpjgf2g7a0nvvgdpl4s61j4w6am97klw34yenb0clsmi8nluwoaobm0kvmn5vp9n0r666a5ohz99gw4e9ozv3erlmilltocp4xeopw1rh8zecy1uayern5lqmrx26qor0kfek1ssrk5ynv43iq8i4837xit3m3rwcoirk6',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '2bd02d95-4282-4d95-ade0-c1d066a09c20'));
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
            .delete('/bplus-it-sappi/role/2bd02d95-4282-4d95-ade0-c1d066a09c20')
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
                        id: 'ea00b63d-2ad1-4a62-9543-b601bb9d5a1d',
                        tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                        tenantCode: 'enyrsin21ew57l7w2newmp9nmdikm53o9mifjyifd1h87jr7dk',
                        name: '9vbj32rmthfkqngdjcwmyzo134sjpi9s5vyxej5iga00au1f6oeulkwzquvpuk5pr0t9ae89tb15fl36jo1in59r8rtwfjrd8r30yvgxu2xkwbcj91gs8ae4945lg1hakiho6l7ypxadnmd0vr7wimuc4bh0u5rqs5i7bo0uq8w45jyl8s0u1faf7aj2zkjm8iv69e4186eu94dt97iw3l4a8p5qvyzjo396focnqzxsfecc2tk5ogpc5aluyhs',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', 'ea00b63d-2ad1-4a62-9543-b601bb9d5a1d');
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
                            value   : '2bd02d95-4282-4d95-ade0-c1d066a09c20'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('2bd02d95-4282-4d95-ade0-c1d066a09c20');
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
                    id: '2bd02d95-4282-4d95-ade0-c1d066a09c20'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('2bd02d95-4282-4d95-ade0-c1d066a09c20');
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
                        
                        id: '3b9338c4-506b-4342-879a-2fbfb4e6d159',
                        tenantId: 'b8cda74a-3a81-4f08-9868-0202bc6f43f9',
                        tenantCode: '4nbj9w9ax90ppp6wb56js4431ijhkvap0uye74wg7qw31c8uf2',
                        name: 'ffskbhtznsr02addxjzih66bhk6rm2h8n7hs3ih4h11hyeinontb6v4x3umfz9mox83fj4uxm4ibxhd5w22ij90g5kx6xh1v4enjt7tutl4btyiu185g8aw4bxjyb617vd4h478l8mpt1kpwwjx2l5ql215sfvwmdhg06iboueq1bo6yw2q9yxgbxigr2s8yk8la91qm08bwdksxj8ba0eqoeb0vrbdblq6vp86znw7n93txvg7g52ufn9nlmyl',
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
                        
                        id: '2bd02d95-4282-4d95-ade0-c1d066a09c20',
                        tenantId: 'fd0274e6-6175-4522-9c3e-e055cab9f5f0',
                        tenantCode: 'yne55yni34hn1v0ca6qtiarvwgle2y0l7y5dxv947a0jskpncz',
                        name: 'akh2pxdec0lmpx1fnxsmox1vp0hg7d61gdjyad8z9jxfw4xms99somuyoupiwn63l15ifgp17m7fg3x374umm93nddrumsqxdfzldbf6mj4wx5mlnj0fu69tdycud0yj7dxdfo7kjdknnk128y4uxdmf36vnf9pscnzlq2cv4sg910xkwj8k5sha838qedj1hvvlj3l614ux53apzrkk2r2l19jbosk3t4w0rqyl9lnx48ll55rqrm7i5ugg343',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('2bd02d95-4282-4d95-ade0-c1d066a09c20');
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
                    id: '2bd02d95-4282-4d95-ade0-c1d066a09c20'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('2bd02d95-4282-4d95-ade0-c1d066a09c20');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});