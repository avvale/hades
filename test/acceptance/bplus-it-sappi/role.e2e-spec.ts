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
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                tenantCode: 'tjw1stsaogaqk3zwmo5h9pqw2tx8o6re5x2p14kg6w2tb8xgvi',
                name: '25tkrtgidvqmsqwgnb97k191hsxj9g695gt0j5twgcekhj1zl2xdrsmgkn688abndybgtpf1jrk62s29rgk1rn8zmnq33lyehl73wtxg6zgui95afbdkttym1le78ur73yphwc6kzwqw18e6hs998ghjmdc6w4gzj1m4m460d81yd4qnzwctaml7ajf93icjfe4glql25z6n44tqahoqxrrktetwc69jjne8lp8wznvizgrfnxrhlidm6eyci4d',
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
                
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                tenantCode: 'cvqntt9apk5agfoy4r1fhev9o3qc55r7f0aub3oif9sx6xpjrm',
                name: 'byew6u077aw0vgk8g1g75dhlp3b7umuiput4ssxfk386yllmtgr613kxjkebqqjfw0of4cd5vzktgzigonn8uao9fh4brrb0o9hl085fmu88a0nje79w9kt91vzncg34mxk00lw25hq5137yo602ap2y2nzyb6rbtl1s2q0rxwueejxg1mc3yjkm7svta1llvs67pbs7phqncwhhlugm5gqb0wihm8a5xs2f9ya381um6qiwi5j2fbwd1rbhy1w',
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
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                tenantId: null,
                tenantCode: 'vjugs4msdbm2sumlczbxdwub4y6lcjxnjje3kpjay0ry2bdzfu',
                name: 'd35kzk5s3pfuzehrkigoa2puwqexhsjunafyzh1kaofbrc6mvgg0y7vjvefknkpb3abmnajzaz1f5pvpx3q5cbtt3a1jewqcqxvnlr338gl1fnu4llityxq0hozxpx473nn4snsuuyt47h23rpj7ghcki35afnq6a3ud9cpa38soyu66rlnbyc96qdr0sp6rhk99wm0cplxlgitr4gvmo3qnslicohyyq0s64yap309y3gyv2kzge3dt6zu18ne',
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
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                
                tenantCode: 'j9uo30xmcbnq05jvjjsudb5kt8z1t45grm4b6nkus2vy2o47v5',
                name: 'a5ctp9oti199h75puxh0izufnxfnzwv8tt0taid4xr2kuyhb3toso9pi9szlgxdtb4l0rnmb0xb2jyk9fimgxtr1n6ov90w8sc1yvlij2m8ffevd6thg8k568mrlthnu3g1lnxtamjmmpgnotk3qh04prdaaz8w1xdj0cdot71cyw09cm299u5wcgzh52yl3ynwcfrkafmkeh3qziims3mjn9wqe4nnrrkmqr6mg0hlh8zpwcv0sux00u9ynjj4',
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
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                tenantCode: null,
                name: 'fwbvfju7der2r1tzr1lbdavbjocv9jahfnfeq9qmio56rs17ull0nhsb5x8oxek4ux9tyxgwk3yfsfv6udlidedq06prwd8jnvd4wfl9ae8sria957bo5v95wrfv1q10ttfam37nh29j3xbmvhv9bs8lkmadx5vap1g4hd0u1sfteckonbg0q40mqr788aw8pxs536tbe5647q3t9v8tiqot9gvshpm45qjtzrpszho6f32ymnss79z4t1jo2tn',
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
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                
                name: 'pe4rqjakhbk3053l6dlcc07yutzia2ypg27i48hw2f1rlu6eb1c3aq4i1pv66zalh5qi2o8poaxiapgeh1wq1h9dm7x3ystp3i1povkedqt109r6skcecfyinpkvu96556vjste4tr8x7vexuz14joz4gj6oy55mg1f7fo2knuwm73dkpgfocho05zifw11pcppexciakiuqyzyk6dbo4x696km698209ujkqwny0fcais34fwck2abv9zfahg6',
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
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                tenantCode: 'y83yykwt4h4h10prm43tyyolrs20uk1ogw2ghp84pt0vm94ykd',
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
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                tenantCode: 's413pq5u4ooj2fki4pc84gaz1kluvrqem4gkb0my1x71frwd4p',
                
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
                id: 'pkhmkzui61lnkcm636e7ksly3dc8a54hq7uen',
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                tenantCode: 'subw5gden5e0cm8gn3kztq7sl8kjbnii7us43sxjivmwfzfypt',
                name: 'rvrbtbhhsvd1ic7t2mcbhqspyfnzlpzno7nczwg7jc2cf3noaf100fyulf5m5wh0b5bjj88ac3wr30d7guovck6dl0hv11cg2tpa6ngfa8qiaaaaths015rhqmxdkjo1uir2sndvcdnxysyymci1pmznffx4ywxg05qdyvvg286cvolodb6kwuprtou0vr3hxomzqpum3acz1amkd5hlps2v8q2soliuxuwkvscdx516yqnvfk5b2n3jtdca9fy',
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
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                tenantId: '8p8t0ge2pepmcbwdjd3eh8dif2nnllcbdqv7k',
                tenantCode: 'nciomv41dy2vytql57zt2sy89yx8pxw8ukzm3odn35qgjbznsp',
                name: '099m6qom24t3sslu10hymc05zuc0fhwkfvkmeed89v27mehbenju3u82w6hbgfa27vi19a3p5scazk5rsleps34jmydhvebvt1otcx05cjwtkzr1yofnq5hyfl2exfv3sayhb9cbztt1ns8g4a65hw6513evcpsrm89ftmn0efela5d79glc69an24oh3a94h9i31qnw4ok20g8vptsrbqduhpux7pupfap6hej3br4enug0qfvehiaq4j8lkji',
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
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                tenantCode: 'hlb700o1c7cox5jx44y0mwed3rb3s3jkb86bilatsxcr6hwtaj2',
                name: 's53677ozbxf7jw11vhkd9gv9kqo8idcvskcrpfql73jw1wpyr1bv6xoxwd09mblgptyff021ut03e3g7yksyjqfbbetsbh8wdqgkdrdb6lae25cq0vpld1z9f3g9cmemy5zev6u6jys2k2sqrx6kywjflb6w0ccashl4ej9hv5s9uk6jre7dloq0bufda0ype2cfpsa80mowumhx34vrz7p8wrg0lplhkdboas6btuluqibmqhj3okxqxfjbjm0',
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
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                tenantCode: 'mo6tl5nnybm4cac1ywsnpj7tkux7eeu6n2qs9xno5hzw71kwxl',
                name: 'uilvhyorczaglik2ewrkbu6slvrafqf7sryrgwey6lhcassme8k07huv8o7p4drrlz84qkshnb9fadow03buzw6k17ymorl36q1a3oktne6d3uorn8n32xhvlw6l4v0y9safcd73mu0cu23631jbvkeq9wv2ohl1jyp4wmif9sv5rl7249iy9rzm71k1froa965h5kn8x6epkhko3rxozhz8proib5oo5x4rr3tuhmftuf1zsqz5vfmuyo035xpr',
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
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                tenantCode: 'mjl9q9gepxrbogm8hljndzp85ijl0lc562xdq5i086lqo4hrsg',
                name: 'l7q1cuttf79312w4rb4bol9mi4y2yj2lcq4as9n57muwpumu2jy5e9xsmqjodcusr3g8ukv5xfvhqjyq6vhsoxgx7strlip899iyiafsdl4bolkw3mln2u34xd9kfmgdn293gvd45tjv7m9azm6hq8adlwfj7pm7nilw8ffx7iegcowaip28imqecldckcbf6dx1zr8dd0do1zhs2hg1dqd3fnxqdnwxuqnooq2bi28zirj9pkm52j1haeym9fo',
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
                        value   : '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7'));
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
            .get('/bplus-it-sappi/role/5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7'));
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
                
                id: 'ea68d1aa-d70a-4888-b5bd-0eff51fe2919',
                tenantId: '6c13825b-eddb-4bab-bd29-c958ca2afe16',
                tenantCode: 'h9zdd2ty926713yv098x0os3mi46usqxdid89l2mi5j9k7kdy8',
                name: '4lv8uqxema2cz4kvc8ojngy1vs47wte6j8d3h4ywejj048eqp3ub71yhqncicbt8nznrqfaeujex5t5iohq8lhd0vj8gruedfs6mytrjm00zwuexxg9cs1gk82e8n37fsti0tiq5vj3b8m25k0afv6e3s2rfbcnq98iepcy555na2eaujt3h7q1ouk7kgxsdmsirht96048wew9xvqwy0gd9s0hs0of3wfskzylqqh4fnpmxjy8xcyndw39ow0a',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                tenantCode: 'hufsq6se8gabzxl5rg71vmbgfk21g7cfz1bi9g779iwvgecq0h',
                name: 'z0ry2lnz6d6x74rge03zc3fm0s8h0yneotndimtynt9injtekge5povcs9jkbcm2dklx9c89pbxrca6p0ez2y5qiiso1f9krnf10gnf939m4ahr8t17877hja3tuu0apxqtbwssv62twdij3f85oplcrss0wm2cm90kggxkazr8vwi9dzs9z4lh9iraxw9w417jjrl0mi3pqcbuximfav9c9kh4rec8prja15lunfwngo5kdvzg0t5bwh5ch6t3',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7'));
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
            .delete('/bplus-it-sappi/role/5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7')
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
                        id: '017ea23f-04ca-4784-80c4-770fdb04470d',
                        tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                        tenantCode: '14nswdwy40nzqej9446yso3jq63cbpericxhzevssftuf6a7pi',
                        name: '4t2ns3awuq4uafk6ey3ymttnjlrxauc9rwhdn2hv18hmymjzd8l4yoxt408qzl40zh7p38yj00s0k3em0nah1jb9hof4ojia7jtf4j8tqicol38jnrxdhfw92cu2iwx33aat9ybb1mct3t9qvrvs5x8bllzxysl8jllscjkxt53f1ipl30bjwh96c1gnxq1xp9ew89gu0m60ogoc3ve2ezy5858uil4ubujs8qyoujj335isb0wt27hrx7fv3jq',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', '017ea23f-04ca-4784-80c4-770fdb04470d');
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
                            value   : '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7');
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
                    id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7');
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
                        
                        id: 'ec941655-61b1-4740-89a6-18b43980ae32',
                        tenantId: '55e75ef7-db87-41d5-9b1b-3f5f166d407d',
                        tenantCode: 'nhqqu3agleibnk4ff6dh3aev3xzix4ypjiwtvdib55ff0osrdr',
                        name: 'iobnqwfr2b78pd728f4gk25zni3qkjmdw63uvy1dil6mmif9egld3mxjyu69qzb1mya3zjcwqeiyn0qx8s922bkxzlu7g661vdm09wk2ebhipurwpubr6vwx73bq56befe3yncn9vesjrvexx87x1wym824zzbktltjl0i9li1m2eot8fhfc7uz8z21h04q8i9ac1wqw0ijvkn774wwujshtrpnz7s6cw5ewxkhqlu0ek0dngfdt2fbo9rhm0ej',
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
                        
                        id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7',
                        tenantId: 'b5c8236f-8381-425a-9320-978649a142ba',
                        tenantCode: 'f3dkvkzbbxu181smalwsrvwemowdt5m4tgecayexnzl6knxgzu',
                        name: 'jj8ckh6zrict3t5zhjs78a3aa48vugeyq3mqxz10bx0h6gde06u3r14d8saax2e7cmmt5a97jrwuz9u4v5q64k3o096x9nb12ct3p58t7ii7wu22hbl3nim71ge3jobdlhuxugl4tlyfq4psbwpbkmaxx5o03wfjtqq36zw9wea7fyelxo53pd5s2chyxsxrc7nif0lbepictdd9trmcmhxa4ei6zg4w6lvrdcpbzisos4phh60rkmu6wrsl4pz',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7');
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
                    id: '5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('5c3fbf4b-b3ce-45b0-8c78-49c5fbc26bb7');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});