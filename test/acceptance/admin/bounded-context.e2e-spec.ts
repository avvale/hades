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
                name: 'f7q88qu37no7vz51e0ky7ywvp1hmzg9ldzohqdjdq58p3izqimhvrkhxc4fo5elobwajo0q2oz2wbn47im7lzunwsze0ksie8wdxv6r9xj7ow7s21vxedzjlxnno0mrikqrrdw2gb2631adrnedicyldqj0aghelnlt40gkdkqvb2hiq6x2j4xvhrzz8jw0n7eu3it9x9f0nb2qzko1zrf31p11c2yca33rc9xacyn1o5gq67dckp1ayr5oltsn',
                root: 'ng9691e5gh6g20ciu0zp',
                sort: 286154,
                isActive: false,
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
                
                name: 'ddz2kqj4dk65mao9mopfbteg90w92f2zu4vkssk89uut8lzqc1ungaxo2dpav02x051xel3ftsgf3j0i5k9gstvn0aqvskc1l60dyzckvlfsisf4qwg61mr2w4ccr7dkljqpjx2yf5j5qyr569x8qy0444a6wdc1sd5pv4mn38l49lypbkliys6c1vlni6pkeigzvex7zowf0x3kw4jej756gur2nq491yl73w6dtrsa4adwfsjz02exsgjwv1o',
                root: '6eqmlplv29gzn6afqmuc',
                sort: 745796,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: null,
                root: 'ju23evfiouz0zsj8e5z5',
                sort: 519031,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                
                root: 'hrln4dtds6gex7mjjrdg',
                sort: 659688,
                isActive: true,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'pwvehneww24jr44p4h0cqjiv0vem7soxyy06og91dxniq5iluft2016adtq659286ivg431chpjsxka59s1v260wb8d63b2c261pmiqf096sut5hr1by1nv3qqv066bl8pkycex86xi8txb3w9bjveze5k7gyk0bspyx337lwrx6k8j41p60o0s6w4cizb8pyo8qzry031zzovg0r0gfbzmy1lcumooyoh2gbm3u4p7bm8nqhutuxpeic7e3bte',
                root: null,
                sort: 423453,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'j056k0pddz5hsdkqqppq4so76rzdrtbkr9t0w52u6odp3zxtikd8cav4pojy6adrngwyr0ey8sgvyxnazja5j8uu48zftkpmdtap4oyt4tu031k8l771vqjercady2csxz2e797esiou80r2pwnwi9eqg2dlymbh62m4ob29c7gfotk4icyq9gtmqhw4xdy9kk94zntry8uzedfemaabbloo45cz5k87pel5igd2pha8rhso39guydk8xnqbfvk',
                
                sort: 365576,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'zq1y3fi3ds1jxtajzkmhstrec90y33n6jpki5ylo1rpc9iwdjehq9m813j1wqka9reje517ao9zmd1x5s3h00gw923fl3y215d5g50693yhmj1jidhnpsu86l3xhovf7skky6f968ow3d5d5oe06w5m1ngqmh2n00ijnzb85s2gbhrkqfu7uzlkxthm11qw1oup5qian0d2uklubpq6qux0aofdet3o0chaod7v6dmvngozzz2wterfe3uclnu4',
                root: 'hmqb5khw974ol7v1e4bp',
                sort: null,
                isActive: false,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'q1l1wq3ppxmeitv983d0eqnykkygtzcngsfrd8tz6m8zlfvvf6qzo3su0bvtdje0ryuz5prr11zjqqvfews1epxunlqq73996jiwymcwc0awd9txsatuadk2fzcp7gta5lju7l7txu5z2fmpf5ygkas6wfrmwn7u7lkbt5thas8xud58tfrnjogh0mrnluw8ln7331n15kh5yvhb7ek1caz8j7b1trkjxwa8jfu2vdu5enoth8c15ia39mv9geb',
                root: 'hkliauckyd9norsyzlmz',
                
                isActive: true,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: '3sesy25vwojz9bin76ypy33yyep9aco0a7942c9bnlcckyyx1ikf1105jpq7vwcqy014193agqvihshwx9xtl6qxxcgxt3mrxqsktsic6flyvufdal4f1q4b39f3akfaxzj4s6y6sp1ua6tdyukxbghkipfqqaj8it1tq9rdl1ars1gheemfqerpbpzwlep2ji0of8jgabody6ojftdd7zcy4sfflr6oz4f20zosartn28x8cyvyy66kxve2u0n',
                root: 'nsk4ryj3djnmzw1064li',
                sort: 295531,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'keed76x255kdlcgaee9dueyp7a3k2n9u38nitou0bl2yh37jz8j15oxtzjrq1fve350j6w5ktt7zt1qr0h2od5y1z21hqst1v70e17mqafvbb4sp7y056vvpoadtpkezs0vfdax5nlyydn2y0distao5mw0nycz5qfrolqf0d8nwy2axmkfe9x1rqvcvx7p7q0pk2zfgggui5dt9tn7xr0wga9b4ihtd5fbro491nqqdgj721qwidf8va1yoh68',
                root: '5d1vkms7nz5uckdp50bc',
                sort: 963491,
                
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
                id: '3v6wo3bqb5tn93tm5403qfy5aegsbf0wjzx2u',
                name: 'btxwllvk92d719vv1ypw3w7zzqjbveuv1ia7aa9njef2908m7da9xvamgidoigde1aub2sq6kbokj5jo0vf31la87bf57oilwbtjgs22f5gz0o5xd1e9zgcg6yyjcx6cscz2r5cx3kk9s39y0kiggxf3jogr6lm0hfbgwajazuwzhrm6nzzyfykn15w99w4u6b3qibzzeb4hjsif1xyqmnhib7t9iyhg6tilam8xd514mu257zotrm63qih2244',
                root: 'as5nao6ms4m449zcw2ij',
                sort: 886832,
                isActive: false,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'outigpdg612qburtzeh7papzvwh2pc2fumh6m40uzterznjprtpj5tnzodas7aevprmchfo1a6b0e57hb5mu14ezf194ayough1wyprmer1x79u0x4vez3zpkw6m7aaadeqs8xjzzrsy0w5ewlymc1arf1qciphca7e9c2cfvabsm3awezn1rvs3658zu8z0rk9413csyofqamurtvc2sb13pxmdqec5z3s0z4u9kdaskhonmc8gtsq2sjctafmc',
                root: '97u1jktpykrspeep38jm',
                sort: 646998,
                isActive: false,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'ye9lfc1hugmdr4acu6kv8odv3c0y5ocs6nrsi76l10kvpgz9gocwq2q24o7fnwfcferkie6yc4p8j0o6y44jsf0obka8qvtmcrqze6ozhjdm7r99i1q7uej8hhvcy3rdfdvrmgb5zgfeyip5s2v02wm73drw10sdoz710m0ns6zf2xi240nc21a1nmvvhhn9312bpz7xxy3fs3kfgz2enjy0smsmdlwq2orx8ufydqr62yv8a2iiojqsa7mqz61',
                root: 'ocvvp5z1wk88gds2jefut',
                sort: 974366,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'ktwp2an7ys7iao53rn1e7wpb28cuy5nmhsaozkq03dommfuhs6bwjyxms4t7bz7i2ahla79z1l22mwv5fiqbriu8r5jp8lbvglwajed1ugmbdlqnsn3xcsutlir06kc7a97mi4udnxafb61c5w1lqp4n4xd2ksunam5pq1b63i0g6tauwbt73gtn6bxncqg9gvfg41yb6rzkbt3d55vwlv4vgwt05zq34xjj8ij7jufhlwtl3q4ys1ekd385wwj',
                root: 'e36cqa4njw74v84top6d',
                sort: 7977406,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'b1mccd2hkxu9tvqns56ltub4fbz39svftoo88oazyqcwovx8nycum5w1fqgb1hf8j5euvi4s13b2btays97xlur3jw3sms1p9c1x4bsqyym2cis7d1inglgo7xacd02v4ywn51azfzobh6e5vy4yswt5vri2jyn9ygqspyl6oxrums1cu0e8t8au5y0pmd6uniimx4myc3h5kdp7x05rvfgg76eqdkqymruqq02z14bcb7ku885b5skz6ad928v',
                root: 'gzihdoctt72u0tgy1yak',
                sort: 340129,
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
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'jsw9riqqdgjvl82d19lse43y5pa1pdvh1hh5fwsorpql5bso0rcyclnk2486ubz308c0h5lak2r7cu7vyf1vyvbv3zzbqb59z0t0u0mvak9rmenl7dgio0aw6dr2j6g75c8fqt3w1jih9vov7i6cghebgmvmm9h4urk9eq5cy20x2zk116boeiel4bmgvhixmr6p5pmw5op72bj78g5yy0lv7sknfxcyoobujgwfawbp8642jlm32187mybprcv',
                root: 'mvou5j9vbhiwz7mczqku',
                sort: 738923,
                isActive: true,
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : 'e50c37f3-be72-4502-89a4-a5771b08744e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e50c37f3-be72-4502-89a4-a5771b08744e'));
    });

    test(`/REST:GET admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/bounded-context/e50c37f3-be72-4502-89a4-a5771b08744e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e50c37f3-be72-4502-89a4-a5771b08744e'));
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
                
                id: '4eac58c4-e391-4701-9345-5cf99d6ac236',
                name: 'r2fjj0nfsrvjpa603jpq2mcuikbojmag6lajrn8b3bqwb9eca80bhkkwnefeiaz04nrlh7ymfj8e67ya1wbrp95opts4ehr3t9b90cvolkddksr1evn7s0mq6u2qcfeqbimpy6l4gc1g7u8m8l2xo2s3jbss9y80henddcjgf3eylg2uoman3d5jt31gjwvg2nrz50fiylp4rk3tslickhzojpq2seobemo65eki3k3p2w1r6mmemw01m128omx',
                root: 'sdjjix7yn3hj4arvjieg',
                sort: 919777,
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
                
                id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                name: 'm1llcrlpvikvbrivybu3cm782pp4nrwv8oc9owudxiophmruoak6c0iqidhfjk92ysus5wf2hqaxeub5yhrjvevqm6ylemq6fbsoxcg9udc91xb3goawr5tdxrg0kftmqb8p0kiu4no9fi1g2ohu5nrvijch8rx35q0hkui86r730nn53aiouuld3vh9e4qddpsdtpbq2lmnqtfqz678vrefu73cfzoaxlzehs5cxzkykyc2ddlg9jzbbnr9cm4',
                root: 'itk3jzrkwctoojd8zxrs',
                sort: 594323,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e50c37f3-be72-4502-89a4-a5771b08744e'));
    });

    test(`/REST:DELETE admin/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/bounded-context/e50c37f3-be72-4502-89a4-a5771b08744e')
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
                        id: '03876000-6792-4818-8a36-8b208cd5af1d',
                        name: '7wv5op8qxh7f4cwdcg4f62g9oo8agqsk8dsptx2xulmgvdhotnztgo5xfsqzorm4k6gbvuyg6mltcvj8dbd1442ksdffxbnke33dz80u1gmkrry2znpwfy49aukbgbpy3u3vkgoyn0nqik3ot1tigvjbgjwvmpgr061zi7725s01tytfyf9jr1h07qtr08fchkdbpvtvv5hu5jglhgp8prr5fn9qtojrol4nk70q04w568np6hupj3bt3d6as90',
                        root: '9a02kdrpuy1xpvoywuao',
                        sort: 657279,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateBoundedContext).toHaveProperty('id', '03876000-6792-4818-8a36-8b208cd5af1d');
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
                            value   : 'e50c37f3-be72-4502-89a4-a5771b08744e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContext.id).toStrictEqual('e50c37f3-be72-4502-89a4-a5771b08744e');
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
                    id: 'e50c37f3-be72-4502-89a4-a5771b08744e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindBoundedContextById.id).toStrictEqual('e50c37f3-be72-4502-89a4-a5771b08744e');
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
                        
                        id: '779e1594-40ba-4424-9d64-a97806e31175',
                        name: 'hg4lgp3igr85uoaofeq5818n6xepg5a2ndgw8ah6mesqfeuyeq0n3zya7tvgk99f1dc5yr6bvn3mmr4ugos091mk18o2xtulajmmjs3xgy0jgkoq63000sm7ysslfdd2gjuuv1rl2vmlh8f19dibrf78n3abnv8505fsgkrp9f9iiqkgu88w04mo0vlcqit24rn9fqji74cchfuc4wiyshx1snrhx7glmg8hine2fs6sfzaxb38gpy0bvn6x73b',
                        root: 'ixwiaynv81st94hs14pt',
                        sort: 904591,
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
                        
                        id: 'e50c37f3-be72-4502-89a4-a5771b08744e',
                        name: 'yb2q65359e5z9ky0smhuviam6emsusqpvsvb29mjd2mjrc5cyx2n3lbov6o7sqdguoixi3facfvnn5zeujyjw9azmivdf4tbdjl6m1t3bkivipmquj4y5iws0zfakqp2kttgcm6lnkwyz9yrxc5bb4zc8cgapc7oaebzd7zs3e760ex51ho6xvn11dlxis0vz9mza46shoqh2alltjs4z9unva95px2nf578dbetpylntt1lwlylk022z0kjccu',
                        root: 'xq1rvp200mbd0ydvuzwf',
                        sort: 582270,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateBoundedContext.id).toStrictEqual('e50c37f3-be72-4502-89a4-a5771b08744e');
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
                    id: 'e50c37f3-be72-4502-89a4-a5771b08744e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteBoundedContextById.id).toStrictEqual('e50c37f3-be72-4502-89a4-a5771b08744e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});