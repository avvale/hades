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
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                tenantCode: 'u0bzbcsc5994o6v9vy94d0auiab65u0zjkoalyumloafuw1fzr',
                name: 'uxjbt8j3gobktx27uguhz7sf85t56y3f7m2ftmiximja9zurdio8eca30litc0lu81g3p9rfy8s061voh855s7j3lze1nozyc435jnsiozn3kabv77vj70sb9tvsiibrpqb95ltjhmk0k445a7htwt8ke3dsu5qbd26pr1s6673c38oqzjbpe9an0tz81itrmdmqwqsx648a8ikiz49oyqvpst76wld91yqv73rmeijd00zwsgl0mykvmgodsdg',
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
                
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                tenantCode: '9y5ks2xuobla13y0617nujmur2tsjy2u6y79jblzs8vqg5871a',
                name: 'qg66x3ffyk5f93l56fnc2j8r2q3eq23cajct6tgado67c1zzi2laap90xrrav6rkosrsgsif0szmzcclh7mr7ef08pkq9l50c8ehjqr99g6h7sf2pej25aclogqj0q8hvi7q2bill9a56t1ak9aew6mrdez5ct9dkutizf64gy21q13x82bskgj5egbzywhnp3n4p2bjgqynk31csbby8kx8tl0zetedzok31h3ejys561542zi004371rdd9vw',
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
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                tenantId: null,
                tenantCode: 'kfa8h9ot4vibzh11goehzywril3vi689o41pvk49tqrmmbqpc8',
                name: 'ebym3kaz2srdvkkz6k1xtt6o0n6djgxt0397k7g8r6qrgrj06bpfsry5e16gowob8opzccu17610hwmccj9dbjywy7kfl4wvnjkbv2suc2iqj14e3zff7uiflo94hmazaybwmfe21f8enl45uy5fc1kywenvdfd46rcs6eygczaqefo4n9c4e5x1awvih48ponj7q2mrwpdi239t1i5x91i00zn5z3ghlfwz0cc6s75cvsywu9bfydohd5y1i7w',
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
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                
                tenantCode: 'jwez04d9p2iov24ttnyhn7oau6fpcpc4r4sjmn38x6d0xhwib3',
                name: 'l730x9s8yiq9hq723o9ars9o7d8unzuy3jc1wjjnqxa9xoie9chnqf5advd3umumbkk4bn0dd9c7m5dg9zxcb8xg15wgud4nljbwjllimmu32jfym78qt40ubiafxf3v8hz51ezjqa79wbiyp8sj8zoa2vun40b92yzjry482yv1hdyx7ac85tcevukcpczaeklo5xg9fj71kugld0rt344tly9ej3qfabxaive7q7femh8w4s1wnm9q61w6a8y',
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
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                tenantCode: null,
                name: 'tt26kog7zvh5wtmpgiye5eonfzjo619j02090ojqkesbflwtyq6dqykc7t8kj84iscdlvr086luiwmf7d0m4vmguqvvy6nyp2q3kz0ffp4t12x2pw250aacr7sfox9v1oqjngbq4l69ou89mdq71g1sarz9te92vjjwbw600rwrn90q9w7jem9ulsbjg8igftdunt8fup9ubwsk5x26uifk98kilm7e46sfmcm0gbmb4ycpaqgyux99r88nyjil',
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
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                
                name: '9cf7q0mxn4zt5s3s5wyh0mis972km95ljwaendfhendyccrllazs6bl9ka3m060yng0kr1mbvziur54lehi4l6bswwfgf54gipbud4hbh3tw4l4tugu48xmby3t5z2sfv3invfeeumw5n58z0uwvocvoyv0m822pmv53qg66xk7tvprmzpmspdqvkpsrlk0kbc67n9oiful09nhgb1x6bcsfq9dcj3zms5z0wt3e6ha7h9ngzxke7rlpb0c8t2l',
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
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                tenantCode: '4xp343947giyj0stdvmg9bvrx2qo4ekm39cgncq3q03mtaqzqx',
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
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                tenantCode: 's93ksxgpyed75e3n4sgc3pz77hxfxexu6dzi3w2pxx6z3vm8zi',
                
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
                id: '2w755jq3iv4zezul43t59ojhr9jnvknp2h3zf',
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                tenantCode: 'emz68ojhgoaif36o6paxf4sgqi6cdvp4qxfrk2piebvq4qttiy',
                name: 'zzl23j3h2c058b4g1wwd97hjfeee1p5cifhlnjv7wa3fxg55ti50qwntswjsffaogk5k9p4acniw7hlox644tkz9vjxz45o9udtxc5qchuvli8w2aj91i25zzbmdali9677zompbx3vpazzzve2z6xlvn0zyutly2fqbf9hwmxppb6r53hi5xlzysrnlh3ii2439hgm9iqs29i887j3okjo75nlbxism5zuqkmil0qq45dv434wddodk784czl2',
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
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                tenantId: 'pbp3lyqgq5o1drlnr8brpi3wm5xpoyd19r6cq',
                tenantCode: '49u24g6u5eg51zhuonrinqvt0xp1bvc75aajukzghi0n287emc',
                name: '1cvqhzidc0p4eo9m6r0fsnahrrhiwc85sox4zgx4ynjwntzkum2n8a5i33akvedys3j0m5trfib2p2hrpppqwkpa930tgeopht5mdrjv2led1yl2osefit1p4pf5o4q0u5jnkyvaqdqzrm441zu0r39uok38bz4imgbz3gh9f0v7zs3gp7xm5l04z28imu303gsrmm9dun21s0oha6x78tgbe00901gdxhpej8pf9eeqqye32bp9ae4jtlkhlds',
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
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                tenantCode: '3c0k6o6bi8v29f0svbwwdhcpf1u6bmx71ww22v9cczt11os6v9h',
                name: 'cbqe4rd35l9nwhqex2qlslblbvbawzing3cnqo2n8pge9601tlld0bqxubyhc5d8z5cxkavtpozdy9rp4898plh01svdj5mc3v6bkrm7fq3e4657rabtbbc249qlcmgwbk7amekj8o93c8imwhk7uawf74r9sqtf6n3z1kp0y4h1myewoy631gu8v1f65grv0bcdbb5et45yje3fy19gown4l0rb0kwwl0u26jamegxmy3qjazj21hanpen2a88',
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
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                tenantCode: 'ohw2v5txypbhcpj2q518sx01hv6bhm03ev86mwg4tc62g505o0',
                name: '3ru7o84dxc2hvl9xzy5zlq6056gcmrv0na4q09279lzx190jobjzbw4i8cjnyvq4hxu83vema3jzpr5p9hi64eqkeo7f5kr6f02cu7o42wjf87qrfh9fk3v81wvbp3grcpn88i58plzzltssgdlo3f1d621qpjbzvnvpxxmvcj16kyntrr6h1umayi3v261aqflmefx32wh56eftl1wrzvv62l53wnjj60z046jqnuk5x6d1vso53nqw19j6og9t',
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
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                tenantCode: 'vv3ctki9q0bvwavb6bzvfq5cl0ie34zaypfnkbrukgcdy8l84r',
                name: 'd7x45i20phualuofdc7uuq728n1tm46v08pgk5bcnzhcd82hvgllvl9qb4y3ybhspobe5r9b73l2lrb7podvkoag7xoeumfldg15q4e0as1ccd5wxsoi1463seyvc96dnbxu5c9ov3xjd7vi8xcsnz4pqnejd8860lpgkdbuwy5pbd7cjwe28f95cbedpole27cjdw7ipsjju62bbs5y6vag0svvu02ep5o2rdu1olul49z56fqx8vusjjej6ld',
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
                        value   : '17a20da0-c6cb-4e2a-a625-c2790c8502bc'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '17a20da0-c6cb-4e2a-a625-c2790c8502bc'));
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
            .get('/bplus-it-sappi/role/17a20da0-c6cb-4e2a-a625-c2790c8502bc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '17a20da0-c6cb-4e2a-a625-c2790c8502bc'));
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
                
                id: '2d6a3818-6513-4a4f-9590-29f6a7dc4bbb',
                tenantId: '5601603e-b66b-4021-a120-25cf03117715',
                tenantCode: 'lxbpv4cmn73j67czplpl2esl3ave6f3j81pyeyytknnk23aw4f',
                name: 'ronueil60yj8qt4w0plpdvx2z3lmoxij8z02hqoqg5bg5jf2sve40ebkh0vlx5g9ijoqd54rhhslnrezfmov52l2m5ge04jntrkt587l4r4idvnbdsjxla9yxv7ncr4hhckiieeq515fqwobtqlzoovyyxjm6wkmg3z91ioy9laz3fj42bjipctw8xy3fjg373v51ty117706kif19des21g0qmus6phr536eg6c0dkgvzayp4angylzr0m9z3b',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/role`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/role')
            .set('Accept', 'application/json')
            .send({
                
                id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                tenantCode: 'aavsovjcygce5ikkv8s60x8n9u8jnkk2r4ib3cfkbm67bqxf3e',
                name: 'pyulmiy8g0hpydvha6cms4joayska87jqs70mr7np7i3ubfdhq0t4oawc9sp4nbtcdtaejt1ivwiigiaxxw70g3drz3rdrz4rn004y7fgsvurfifwnt5p8o13p3ini7at8pg21nx96u6jybzjai4phigwwdtso29h61ki2mchwczp2exjdxyuukf4gil8oaoi2h45z85s4q5zxrgfcjxzkms9c7ckkg0fplee2j4rc5f25f97xe8et7wtd1iu63',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '17a20da0-c6cb-4e2a-a625-c2790c8502bc'));
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
            .delete('/bplus-it-sappi/role/17a20da0-c6cb-4e2a-a625-c2790c8502bc')
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
                        id: 'c1f1561c-0871-43fc-a276-f75edb9b73b9',
                        tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                        tenantCode: 'ny15mhlm0o4pg8g5tfuk1swn73c2ttyklt2tdfisbkpmrafux0',
                        name: 'rc1rvjr5c3g8ngh67wqkje353merme6156o5teg67z5smdgh99smb2fkx46sizni598ecgsz6pezuzll67g7j42j6ue8nc6qehoteerb3sr3jfh7lrb8ybp3x2f40t7qdr95hjxldpm2gim8a5poawpzrpg51utew683jtim2e1xx74t17r8pv1yuwvo7mn2bjvpsvpevyawif9gks3d4lxzk1qu48ug99uqvcj388hascitum1d2kd938ta203',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateRole).toHaveProperty('id', 'c1f1561c-0871-43fc-a276-f75edb9b73b9');
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
                            value   : '17a20da0-c6cb-4e2a-a625-c2790c8502bc'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRole.id).toStrictEqual('17a20da0-c6cb-4e2a-a625-c2790c8502bc');
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
                    id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindRoleById.id).toStrictEqual('17a20da0-c6cb-4e2a-a625-c2790c8502bc');
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
                        
                        id: 'ec982d31-d805-4450-a3a1-5a8f69114996',
                        tenantId: 'de3c2fe2-2ac3-4158-9a07-9f4ae4e50a76',
                        tenantCode: 'yjfo9a2kvr6um49kdab3qfenluwzl873rcy7qfmmalrkyf8hqm',
                        name: 'two24ru1nvl7w0mdrngwa0ud079btmbq7ekm2bfn6uxjhod72ggkrdtlamkgiqitykt7uu6lmbsa05etuxyyd60d698jbzl5ugvj92zup27af5qsg1cyszkbrmjzdv4tgeaw4x9105qtzqivkfa7zq03uwoo8jhmyg4cuqedcty7ocos2psfg1tljxg94ypxk2xhtv05gzjvqklouu18l7wklugcbh45nqj1h9s9vlcazwxo6a0bc0gh2j68zuq',
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
                        
                        id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc',
                        tenantId: '6ea2c877-2cd6-4fda-b26b-d7e12d4be435',
                        tenantCode: 'ar91xsl6b4r8dxzvwozmrdf0zskq91qcp9ev7mnkyajv3vz87d',
                        name: '1srucwjhi0v3ru7u5visushukqz6qicuoxy9hdg1newcan05xehht05u23di8ik2kedrd8ssbt9gdcuzl1jp3ecj73wj2kw4lr1dxcmbuanrggmviwwhnda20sosfwx8c07zi5h68m0g2m031nh6754usijlflss0c5nczyknqbks1e9plcqtxj0jsfd02bhgx62tj55cw4svg19yoskqp25luryves34j2a3umhc6k2nim57i6tic9dgu6yfgi',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateRole.id).toStrictEqual('17a20da0-c6cb-4e2a-a625-c2790c8502bc');
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
                    id: '17a20da0-c6cb-4e2a-a625-c2790c8502bc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteRoleById.id).toStrictEqual('17a20da0-c6cb-4e2a-a625-c2790c8502bc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});