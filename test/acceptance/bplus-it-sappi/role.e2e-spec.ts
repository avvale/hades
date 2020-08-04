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
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                tenantCode: 't9ehjezh6bbzl6o3svor5s76qfout6tqihkt3iu5c91q6cc61k',
                name: 'zo6yvitq0klf71nxxeutxeo1bg0o270cs5as4diyvfbw3kq812lumc513cj88kmgypf3r7pu2t2j0zh76u530kldu841pj2hg675bzqay3ivy282zf9w9xu8ysdpbl5nozmutyzpbu8wgjbwp41z6h0ngdbxq6kux8vfvtn8tuhq0aqdzh6uhjx9fe6etgknv6qoov6lpjspr8gw3p5x8ugyqjteyfehr4jdu0xqvwco5cnhnq98k6fitzygyce',
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
                
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                tenantCode: '5p8mndgt3wh8lqdernt188bgv7qplc4qwbq731v7qs23gityjg',
                name: 'rn7z7gl3w1q2xodnkgmo0wq98auxs07nmkwcmgrbq5v5sdg6ejixw5zbekcv9to674rxtw4idnd6in6l0zu4533ydvs1pexzicybwlchfa4ekhn6fb0jof1mfh1yjhngcu4kq63u3zsm3hpt522od86c3s2lb10ut7dphuqqwq3rgolgl0cyqln53wdm7ivnezgoyviju2gynityhmwnvhi52sjev3x0yy6jtj9tay53gwwvuexbgml3n9ksna2',
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
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                tenantId: null,
                tenantCode: 'd1nl252vuvjgma9cyu0g2zx23vrot23u92fz0uqgp56mtgo7m8',
                name: 'nrruar44sbsx5tb02we29zce3sec7u93ynsgi6d7uwk2340nj8x461ge9omudbubyah1xcfwms5yq6qwv5c4htedccfcd8hd7d12evhtklbjb34zkgxpzqrkgnraspenz6po583hml5vj16337mdc0kpxw2mznzkfg1len71znqyii3t4sd48bzb4zzm37byp5y7pe7ej7aavqp6mmg4zvro8enij2tdn7uhj7srfdkblg0nu50rd2juy2zxngv',
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
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                
                tenantCode: 'to7bk03mcav3f3i371x18b1hwtk2mu0ubqyhj611byutxjbmvu',
                name: 'x21k402j66swxlgo2df4lsm6j7iql4fn4l2ltd4qz3d3j18dw9u3fc7r7gi7glizyn98hfcibqah19zrv3zdtj8ghv7gh9cj1me6mg3rznb84167amft7h0wu7oxvw322jv23gcj0o7zh1y84rpke83ivij8rr0ordkfg0le9up2anp1i814c0rwfb5ns0zciwl1orfys5k4nepbcys8g02ax69kxsvmdgmkk6rq186epguthd0ly5jzpwbu2es',
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
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                tenantCode: null,
                name: '6gdfou3uprdabt9qpwx4b9dac2ly7gr88e9g5mxnllmx4nh0a5h1bia62ww7lcvfgxdjbg6wkfjv4xe3s5nmd6ozp3eq9psgq9jcxc77c6sax28vlmu96oo44soiicp6k53oda081mposhnlk5d306s2hmstmxrgongauffkn19b4xlgfwqzbpjutwie3i330rdi0wh9bj0aehziz3yy5a6pvv2nv9zye7otax7bmabvo44m5ajqsj0ulsnosdi',
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
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                
                name: 'd6745yvrsn7npll2pl11teso9s2ltockfpa0nclm2vf8lvzykbj42s3qe0mt50k3zrcvkdyh3t18ocucg90gax2hqz5tx8vnwwa4fzlsl3h4pxmjtjrbpt1rm2jwb1x14nnt2nl1c2q2jl9pfzitfebgezb9r9j2eqj9uc75usecjxwye3z5yxsbhp6dimxxw6u29l2ljamo1r7yv4lyt3abjn3q51zajlgtwehsll8mi3n3m20k2mxpqkdw354',
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
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                tenantCode: 'wjvr041w989tx1bnkc11lyp8g0c91yr1hpv8obmazg84lxmdp9',
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
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                tenantCode: 'mdpz87rg50u78h9n66y9ap883pa377wll86ekznw66vhwisl1s',
                
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
                id: '5g2by4ys4d4jsfp0yr7uz0xesvqrzkbbcsvac',
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                tenantCode: '64dx1glpt63lka0zwuzcr0ocn9q0lg76npipt2jili4zq01gog',
                name: '1cposnysuslr06n7b8ri8dbdj6yfpv4tm348lcmph6ugfba9kyb1a8duthmuy31oow3qyiogb37vgxz3src81afr1m0ov927qhn3ft62o52l42bv59nyv18xber3i27cujvrjm5v7zo6tals6xhgwxqqpgexvlyjy2ds8tkqr3hoh9lp3jotadqdvt2001m58yfj8iu3f9dm6ruc9x800cwna7wxectwm7eec8idwhou2ztuly59jfwkq5ciz7h',
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
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                tenantId: '2rk24m6jaqg2wzirruhn3dntdwjr6syvr6qbs',
                tenantCode: '7ug1c0dym4jdscest2q64eyxrvfajrld50u6b2qa4wdkp52uqv',
                name: '977fzwynb7vmx9s73jjmm2loe9xph14926lxyzf91oalr0amwvj67b5fkirxt05uc7e7zprjecfvzu34elbspvsyjzgctw8gh3837kf385wprszdpxmcc8t3ul1gzzec3p8wggvyva5ss27sb8c0rqx0rw6p8mb5tsub5qv1hpa6fu2sl8wiq1j0ghe4kd21pshhgbi6zjmvg6vqh7p8xtifmoet980cq566vciv6z67mkp6iivnraofva4jveh',
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
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                tenantCode: 'ou1s5yhx5duqy3sw8vn6n5lh06eqdnqp1jh4lcg11d86069medx',
                name: 'puukqpu7whax5zyz16yytaedyqvp013cazvm61h5ltk2ihweuuigd2igokdtuh2fqfev3xpy3389607faajs3l9dqlknxmxpdupmmbztraejn3c6ud37si9qusx3s5syfrhcywljzofens7jdb1dbha4cm8xtp19n1xhtpbrnpl9vzhurzmju2fk4rjz8ox0iwsc03sipsmdwg2pdkyfc9cpr2x2eqrbt2emgxjkp8ompl85bbdwu74adm6dwuw',
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
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                tenantCode: 'jsk6q4d09it4yx0t5fb149wdtzzxiqi2qgieuia4c7prw8hufq',
                name: 'rofnaq29u2tqvka8iirw6klew2ovmeg8175r04ko6oe0g741e9btbwwyz7t8pewqacft7u1dtqvui7qvj88h0ht07i5kl07924wb32g25vh3yc4tfalolwghz60bh0dqd1c2vucahu4tpgolpmpvw5uum3cfp6v71xtnk63ajiqd3emkbwe30afo2d1whk4ku9gqyn054ue8uirso4jj3td0gf470dibng3ovlx8gjuhxg581lqfdhiilu51lroz',
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
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                tenantCode: '6p92ievl0gja7aiz793n8gep6g5jo6wkuc6k5klecltc3czvto',
                name: '2s46at8yoxsx06i8cfxb8psd0j31u4n4p6z7tn9ool6i48qo8m08ceuy7g9gbe8eljx2wbqypx88vlj96opk1yfqqyy0a5t1q8pxdefq8rywaa2m4t5m7374id01xiqm98eutbh2wwcaep5jzxj9vjwag83t3vaoyy9dbx8tff1p4a4q4cwhnglhyfv3rydjgtide97ha80fvkng885pxe8h5sp5t3hyt3ucb4eovl56yyuy3rwqm4h7l4vq3n1',
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
                        value   : '484ca713-d67a-402d-9199-81fefec0d6d2'
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
                        value   : 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb'));
    });

    test(`/REST:GET bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/ac90c3fd-181c-4786-81e6-35031c978dc7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/role/ec2837a8-9eee-4322-ad8a-d3d7d980ffbb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb'));
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
                
                id: 'f2e1be42-0289-465c-86e3-61eed48a5885',
                tenantId: '41ebece0-aa5a-431e-9711-97cc339120f1',
                tenantCode: 'bvvwl6d3e006v9zjiut8cl3jgr8n2k3c2b3jjg05coala22lbv',
                name: 'eqvfwxynd5vzdaerx0p092z7f5xkarlmw8zfiqhxkgni24wh72fvrg94mtuj79u323envx218t7e2slbmol69xbydjv1a1sswgtr5lz9d6zxnxjxzxya5mg4wjlahp3q0qej9044ij9blli9wl2odoa0u1m4znq9au56qnmctaezsj44tym792z9b74psfjcm3tu0ait78ng0s6rd1joik9jchvac48wq5rjvhq7rgp8s011h9oeveobin4wfy3',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                tenantCode: 'is0yxmkvwier46sw93bvgwh4lqmyvv983vctrpywc25vaz5j0r',
                name: 'd01zwlr6tpiegk8euulegqo03r80cgqvm0sboqlt6nr7suitahxkgg71ljty5dj4g4ro7lipmiviunlv32svaayk2zu48vlc1isl9kkhzzyamrzracz2w2ku5owmkh2ep0bi1azplm1kc771qx01guk37lcd7lgrzeem4pm5ep3zp1xeqjez3p08rbqqbshmxoy3fk3ntl4ziyr4148au9xzpxreqqb3dmu5m9yzrwty9c3e9u8ow7m3mz5537r',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb'));
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/80ad7806-229f-4227-9942-85933ebc9de2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/role/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/role/ec2837a8-9eee-4322-ad8a-d3d7d980ffbb')
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
                        id: 'a1780eff-c55e-4b46-b7a7-38106a79131b',
                        tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                        tenantCode: '12dku9nlpncdc36ujf1ds2dmelgyfi5ii9jkkb3c8c3akcsrry',
                        name: 'jgsyi4gcq8olpnba3nnukokcqu9d3gjyc5pzqz43vy37i042643lec478bg7tl9c20q8ckq3iwcxoa1xsms53vog2cpfc5do7kll73q44kb7886zjc6k10uo7hc1p827nwksz6ixsg60a3su5mnq6ti8ffxsbohx5x6g78l3szpy9yn70ijgtpzr4y6opnvlz2dvxvpxqe5slid97cf69vxfudmqjo0yd3floib5fhb47u1rdjzc13kjj6locnz',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', 'a1780eff-c55e-4b46-b7a7-38106a79131b');
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
                            value   : '9748712c-fd44-49b0-b487-6a408ca378b2'
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
                            value   : 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('ec2837a8-9eee-4322-ad8a-d3d7d980ffbb');
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
                    id: '8c3107ea-eb9a-4ffa-b2d0-d35a9c51237d'
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
                    id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('ec2837a8-9eee-4322-ad8a-d3d7d980ffbb');
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
                        
                        id: '62d6af4a-93a4-40db-9f0b-54977db395bb',
                        tenantId: '6d652ea2-1edc-44ed-a2ca-c4b670d8acd1',
                        tenantCode: '1mn9i2z006m9tzmkghu6ud6idfjhxjuvmrkfpsik94ujlvc7bp',
                        name: '5u78xwi2gyorlo6cm6l21unl6cferi92iq1qm0wqmdmtj492zhdp9g57gwnpf7g3zhv78xh5wwcb1t2ztj9eoia5r7xcwy3s097kpixkz0h70hxstknvo1z8swjg61ghemo280t0jo9jrnn05sujryl6n5ym7ixps1hlj76z2hhtnt6grngvmufyj2ky9pthv5fal5e8aie750so6gi2hhlue5ag8w3a7n3obzpl27rg6tvz0q111jdutn0bbp3',
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
                        
                        id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb',
                        tenantId: '5accecd0-2bc3-4c36-810f-22977ac0d21a',
                        tenantCode: 'rcmowcsoqsxk54fs5d13gwb7gsndkgj7yum56wgpg4sjetcwv5',
                        name: 'zvpha6pjj4tjwkee3kmn7a79vqi9otabfw867dbn677wz8d9lo09dk51j2055xoctr3irq4vdxyu5tx915tl15487y1qjgukcyazxwv483i5hmqfufkmzo85jcrfjwt3x57emhch5bsa7rxl50bn7d4cvlz5xq9ix9jkiztb80el66vajfnz5w74lvjj0ak0hezepx0bzcm5sfwjazcv4v21kjmws80jx12a6g87gdeeqkm8nz4x6ljrcj9kcvx',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('ec2837a8-9eee-4322-ad8a-d3d7d980ffbb');
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
                    id: 'd91eb271-8686-4198-aa06-fcacfaff0f39'
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
                    id: 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('ec2837a8-9eee-4322-ad8a-d3d7d980ffbb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});