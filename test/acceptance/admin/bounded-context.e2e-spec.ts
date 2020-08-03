import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/admin/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/admin/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('bounded-context', () => 
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    test(`/REST:POST admin/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '36mtbm6qckstl1hzp57ke1zm9pzp41gas705shf3457ukh06b1h2rj8zcfewv3yd93egpb4a2dtnkpvw31kdmwv8jyiofm562vnwtrq298sea7pvcjdyblgo7n8w8remqr05kupf1ly2pycebssbbwpxg8s0ggnwk7c8twv37h35rkcqfb33o7424qgl5v86ozdjns2wk891va0eox6ne8ebkuks4cvzdsjm0bs4eod4rhnej20xng2f3azpi2s',
                root: '6jk6sf4ve6jb10nzh0a5',
                sort: 752451,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: '0waeyswziz8xygoj99ky2pnbt1v23rrqowtriee5nh904rvv14ddgh9b6tc025l7cg4t8mzpn6usomwry6e05gqg8ernc17ohvj5u0k8j3wbrfankvrbovb1kdq2du1o8kqtx6bxbc1dp9e02x35k0mwt2c542elhgl42woobqn03x6q6u9voyyytyj4egbnv1kk6jubyh0npnas80yz7x757w2kn96u98o8xyhzvklxdmdw36rx39mffvmgu02',
                root: '0i8g4qi2uf9gom85stlh',
                sort: 723546,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: null,
                root: '2acoz7nofifyfp8my463',
                sort: 348629,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                
                root: 'agq5rimrt5k6ds64xfjy',
                sort: 926215,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: 'peeh2xrtcqo6oul6ivmjbcz01frmqkdqjj50bf44zrcfwdf4fm0nu4sa3aaebugwvxp7rchi9oynb3bf9gy5kb7f07njzzk910ihuywwnz654mwaclcdl6c78cve9zpy3j4iye5odcq8gy8n3nowntj202065z0sw7k1ylc2pgg9yfme9qyre16dylfwvvkz1ws8pjklfzrwsylt50r5eu9r84gaiifmfpiz9wuds6z14h37kywborbrya85c8g',
                root: null,
                sort: 410873,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: 'oqshzpiwku3pv8gujrs2d96bds3mqfwo1ng4nwz4644c7jkqwydzgfj6zbqgie77j8nh3zpnhj4tqi1kcfb1xaplle4rvdk46rakuikpdhqsnujm0cmm03eu8m4z3nqkc158z5skn0rwjfd2du0hu7q6w2lgoo8znug6gaft1ih9qpfbsp1kjtzp4sxl0qlqs9dka16ijekxr3p4le58g87vy4mr0tw0x82mp60benxyk3sopprcwl9kvq95pye',
                
                sort: 130996,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: 'v9b8i9lkynxlwwe8bjl4hsw27ja9za9if1ky82t9nbdy4thzh4ukhmakyis4c4b7ve07j8s181x6x724se3jmcxwncziqpqd7dkh77kyquftl9cocfyguv20top5kxnilvwzbdxwxhd84hozq1csrekvs6ijscem7dk9ixg09gvzokqakuw2d26zu0herkxwp2yx0dx5kxfh1o2yyuacq0z8kmq8qozev8osjjsewsim4qryz0rbfuuj33higr3',
                root: 'bsoegm2ak2dh4o2r4gr0',
                sort: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: 'jqzno671ita4b7vl2r95qrwssyuwyn8nu8fsdei9zdxtmcp7kpj89t6otyim9b41xn0pkp47h58olgpm2xsf8u9b4eu47l1mct1th5mrzkzadsdik3zntq5z2f3x5iko4tzxt8di6z9uodwplpm5x2k2i115egkjjzc8q2xpaa225e5mfn7cfaujdoi6wagmzd4yw4s03dn3r82v1ab3jmqh4j7ijtfx2dkx7qgfijudiqcbzgl27xt0zylfm1n',
                root: 'etgukw3j0ru659aqgwos',
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: 'zlero62glmxouovrx51hsvr5vk0g6d7qadruz7th25l8tn7v100bvirdbwuy72gpq9wqv0xtvt9j99knls1ru3bd71xi96x5jfztljivawcke4y3u7royx4jgp614arcwgoq94q5iiq5g58sryghrp8q6jqqhhgpmlqpt3ed9pydvqb7urv661hbi1vqq3rxmuikilqn4yobuatk9nl74uqh0iznltmuv1lsw7vd1d1sf8fkqvv8ajkfnt4q61u',
                root: '3dwxmfvzor44ozbgmfxz',
                sort: 143395,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: 'tn43ijsvxuhykwzykgjf7ckoibqax2326oojqeqsv6flufarwcoul5qzuyuh6o1y8658zjsphuc5inuw96hqvn4gzvr6gz1g3xu2dwlh5stdi8bh18q0a7fu1becx3w3h1a22cowknoaq4vy09axrmlon40w5fxum7upcndr7begid1ey7n7xe5zg6wz8fnjl46p7emrcw6nojrz4k86j6mdpj298b0acgs0nlcp7q273boraajyq0uv7vzxgmb',
                root: 'r5axls74dq9jo9o477qi',
                sort: 493652,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'dhzit4hccpjp2gev1350q100jygc3bb8lojbu',
                name: 'hp0m8hbl6ecv94f8pan9eiy5e3nat7dommfihuutagi6dxpl4imqqm15ulwsr3g98b48bvmzotyhyjpvv8m0ipa0pcgvffz27qxluwty8oo48z96j5zq1uf9xk6yeod4nhyp08ocdggvrk39ftltr2j8r1wqznd10k0ngdveaz5qwcbhewu8mlfdkw66pniw66sxkg9forj75isnkoch47wfinuryxq3hs3i5jp6x6tiuk1s3del2qom23t8hf0',
                root: 'pqaenzkqqfyag71rqvqu',
                sort: 677918,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: '3qx1xecy9402jqe70skkpqoqw42eh63iwx3imsydtv6e0cph8d8a39y4o6eiik6tm5ddkkk266m2z6cazcx52g4go5wzscjs6dp0ox4ybp9wtwr99nunvc8ul8hxa50ty0djvdil8zokjh77vyhmvzerk9j3wrzooe1zh492m9onqiltb8aeoy6atqf1ssul4x0mudx1axbc83y9p70f8x2po77onlmr8yzkojudkel885qy5wfh1fgr1jqk06lr',
                root: 'sqh7o3tbndycllsazuer',
                sort: 974022,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: 'ulyzoh3xud8o7v2vukqm64avrpucy0bpbxk43ta1uzqlt1jj8r1mnesbwqhkyvmionmxk6aenzcnx7jnoi0pkelgaa23u96ptyp665ap8pd9s2u4z38mdem56attcjuyb1axn4hh1vl21q3u5epxg3i9xxbl9c2m2vwmgduxbsiwzirqib2ul623ybk80g7urjdbfyi3ueb06uw0ms68oh6diyj5miza1emxkxz9morx5o3vocd52xk39wuen2m',
                root: 'sxnauu72orsxz5zaxd209',
                sort: 594969,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: '19awojxhx491ozqsafd5ygjcufwy1uw3j6hb86ppoxb0b4i86uy3u1kckwexsbxjmm6ljjbgx2gk7ij0xxmebl5t1n4plh0c0ii4043oi5zq6w2541ugorgcycgy6kjtaolv44ub5a0dx3hqnxnez1zv8khdbgph3318z599dze6ltf7871hulz0t8wir8iseb5c15fqxf5vj4qvxog9vp6mojuw9ig5bh9oc9y15cm438bd0arknjitsm2440m',
                root: 'xrlrjwqdcp4bc0evhk3e',
                sort: 3488459,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST admin/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: 'zx2gmqezfzqxlzc0ouepmc7n70iil5gvqm7vu38fjy3c1vjkis3axojh319cegzqxc9cklsvece6snhu4i59oaucr2vyz7g75i70ge7g99984kae5zr4r9cd77np3lazwnv8bmq8tmpkzv45li09abclbx8t965dblr6h2j17va7zlz6oykp70r8tjejqc5m2qqeuw160ms3x6wa959ftaotgr4setam66etjwj0t94nzursbj44h178d9ldmus',
                root: 'czv5y8s3kae14vwrmlwv',
                sort: 332198,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: '6djk7kd5jwpp798u6bq76kgjsk775az2bo4hdjj2dxhzjgjsen8fiz0ydqxmyuultc8uw00ptffh0kqgowkzmyvgrd2heyoake8s1vvn7ua0n5o67wu9z3us1cnwun4gsp1cbn0ho4tfj83y50c3jgge4xc0mif2vnc2tcbzesxns5w41al7w3gfb8ivpb9j45yaqoaq64emdy8ov1rxip131qf17109vxbcye60yhxcl40325kykqrhaylerka',
                root: 'e7ovh8uqcarier29x00g',
                sort: 834945,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET admin/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts/paginate')
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

    test(`/REST:GET admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '5e6f6034-2ff3-4d35-a431-5711545bf72e'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '405df539-d9f7-4e79-beb3-fe1d3f7aaf63'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '405df539-d9f7-4e79-beb3-fe1d3f7aaf63'));
    });

    test(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/ced81ef5-8ccb-4eb2-9c95-7193249c7934')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/405df539-d9f7-4e79-beb3-fe1d3f7aaf63')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '405df539-d9f7-4e79-beb3-fe1d3f7aaf63'));
    });

    test(`/REST:GET admin/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '0c5cee79-58fb-4494-a643-4912b0ee9eab',
                name: 'yhxe8cdrf5wlhw30rqrgvl5hvpr3p8brgfnuih17iwmm9n2zmwxmna01dunl7vuc9mn6yllthtiop5caaqxondrgwl5yry5hds53bu98k36pih7ghfw3qznm2w6wd161v7i4rwv65tm5qfosqqkq1dyav7xuqyfu6vqkkxae432urxu2do6bewc7srr7v97jvclrkeofr8w414z4otnjua0k37uysdhbaxy0oyxvypyhxgqx31j3j6skulptfka',
                root: 'oq3gxlyfj4s8b9f0b3z3',
                sort: 283494,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT admin/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                name: 'db3z10hr90n1veman5pvohstkxwmoyce3mqt09k751meh6nhi89dwu7hv3bix6kqupr68yk3u5ympz8syyonpatzjymv4v952uive92tw0ra5i6h88tg0ipoozpeaogq4mrozwe72h4lncxth29bd0zk5wr7v6nzipyrs158pg87ndgtl7xj0dmkvds2zix2mjicne04pgkxixyq5uzdiqz8syuxfz3lydljmjystv6db78266yiywg97g2fxak',
                root: 'aao30fgq90tttwcp4jbg',
                sort: 489320,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '405df539-d9f7-4e79-beb3-fe1d3f7aaf63'));
    });

    test(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/22c6edf1-5c94-49e4-9b1f-c504e1ad634c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/405df539-d9f7-4e79-beb3-fe1d3f7aaf63')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL adminCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateBoundedContextInput!)
                    {
                        adminCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '3999c841-d48d-42a3-970b-864abccfda6b',
                        name: 'rsv2opx4iz0lqg6cragu08zpbsve5xua9yd23f28bix0ssr68qsfxjzr8d0gkd43xr3zeymzojhmmfq5eoum57c5ncbkqc93h0nbhw2hh5nismdnzq98120ghlhdnvo8hubp0i9nyx0ez0ydiuakledsew2epiunj5vl33rdu29i2bo1pdjcivexgwnyfnwwd24ar02ok4138sc9q2axyjndsapydlmo5dlslz9txatuzi8fgeuyejwvgg24twf',
                        root: 'vkuh3pjuqbzry35eyyr5',
                        sort: 153652,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', '3999c841-d48d-42a3-970b-864abccfda6b');
            });
    });

    test(`/GraphQL adminPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL adminFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            value   : '951f58cc-20a0-4f4d-af2e-3c0f4a3b54b0'
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

    test(`/GraphQL adminFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            value   : '405df539-d9f7-4e79-beb3-fe1d3f7aaf63'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('405df539-d9f7-4e79-beb3-fe1d3f7aaf63');
            });
    });

    test(`/GraphQL adminFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '967cb8cd-166d-4de6-8a3e-40889081375c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('405df539-d9f7-4e79-beb3-fe1d3f7aaf63');
            });
    });

    test(`/GraphQL adminGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetBoundedContexts (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1cf6c776-656f-442a-be3d-651a99441813',
                        name: 'ix02xcowvat2gpakkn95xfvtg4ey44wcuoahsu8tv81859jb8fyn9rhzphx8psust6var9pn4p012uowssa63kg3hku84egnhjvdlquvxypmiqr6wrrggb3z48tvc04dhax5jpkc480ce1ou711ju65z2jrwiwyfl2qi8yl5qpl55ffk8b3gx7mj0ni3yjj8ssj620rbrov4206jxwekbpy1rjntevasnpdi5ndxcepf12jyy1mo8ysntvoir6r',
                        root: 'fc1e06ac55m94p44agti',
                        sort: 656682,
                        isActive: false,
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

    test(`/GraphQL adminUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateBoundedContextInput!)
                    {
                        adminUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63',
                        name: 'w476hc07gpicgbpmtqq8ekl1iwwuzsbw263eu6civ626qyb2nr5ul471vck323mlmk46df9nako0vnzafsjscodq948a6wb4nz90d903ppqstzglif9a58ig9g3wk9u5n13gj34lriafrs16u5xgsez9xd8m93msbr4zwn0491z11mh5lygd4s1w1l863oryjzofs9vodghbauhy80cti7yohzt3jvgdj563li9nructo349uo6pac2cr4k974f',
                        root: 'jbcm4xjmvq85s2i1y3fr',
                        sort: 768122,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('405df539-d9f7-4e79-beb3-fe1d3f7aaf63');
            });
    });

    test(`/GraphQL adminDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0c5eadf4-da3a-40a6-bdd9-c68a1fc1eaa2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '405df539-d9f7-4e79-beb3-fe1d3f7aaf63'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('405df539-d9f7-4e79-beb3-fe1d3f7aaf63');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});