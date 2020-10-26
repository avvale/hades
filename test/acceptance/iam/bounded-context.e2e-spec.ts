import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/iam/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
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
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
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

    test(`/REST:POST iam/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'snn7ckhwu8qfhfo935yz9s3i8xhl1uv7x3kilbwrxys8k7wync1e5ez20kin2dzbzew7klq6o5nvrt9vt6avr9v281wuagysx3c2thpjzjnk9bzvi1pn7e3p9bbf6vlqb6ouc9n44pzj2a8zfrtodm8hafz1q9dngswz8cvtqom76b54b8vjhh1rvsijszyknzdddvuh7ri152dc85hgm1r63bhwu6aqvtuz1c2upz60hp5y6o5cfrj4xvjd4w1',
                root: 'j8i5fzbg12rk0sxv3qnzbt535vd658',
                sort: 108880,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: '0l4bqv5ujx47dauv8i3m3m4xlupxzdi0sxs8hfo5a0e8vr4n0wtiso7tkz9qrq4r4y37v0995iu0k8fjm8nx1fdd53f27csoo1marbsnegm6cjf8hp7fx9c0jt457zj00005tye6fwd47rthsuzrevmsvgosfrjk8irbk0ceiswo09ztfy71vjin865ilxp11ru9aaqm2x27dknfj3jr45lynaqkikr6syy8s4qnbxu9txd1fcdfstrd65cc2p0',
                root: 'y875gzymozcappkf5ln3z7792df6o6',
                sort: 743964,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: null,
                root: 'czmsb7nks5yq6lnfps7om01lmvjvpm',
                sort: 356527,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                
                root: '5w6ftg8b59dhb4crntff89e3jk7dga',
                sort: 180884,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: 'cx0yz03t41fx3af5vbje40bsfydr55anrqspsrgchcdi6mfmjcv39r8ounoc52shlr402o12jxb7potj8vql7d13e2ayaqof183auh1inaomj8cesxqdj78se3a1pwxhkhip3oiqf7u87mg338nv2xc19ae2a888yzxo9qs4zy2xwwkx7ywgzwwws6uh183mvzbbwuho2vs717niludc70un3fbyobzuodjzsw89pfare90h5zwhilgxqy01oks',
                root: null,
                sort: 480084,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: 'xlv0ukyg4tfwqs6f7y2v38zeg77i6i6y1cwzhseasdb3rl60a72qj685r9tzk4g2o8zxeylkedzqalcq1x8uj8e5de0i7r4sx1gqa1e94ftl6ocdyrfjv2iqrqft1n1qez1wdmv4dxj5tr4a9kp6todgjre0tr6aebtg4jhq44esx84ge9o93yxrz1h2nr1dgtrwezw70mf0r1frf54r4wet9sj3phjfpnck8mkugr1dklb7pb8rn0wnlf0vjyc',
                
                sort: 263808,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: '2e30gzrebsv2mszhamljouhxgo4zqf3dnlbqgnm4rvkjnzf1p79rgy6ssmy1koywx6eh50wweg9pz0ecm0zd5xhfmepbq9ibq1t5gesmgpsastvj2nzms3g5bjgtffvusogfoe5jqpm41a6cg4m8k04t5xdcre064b8ezvjof40jqqitxelkavesvimrvvmskhg4cf1i003tultvzehgdqvbk9b5jom3d1y28rdjpkr29m446bgwarmki24qqnx',
                root: '6x33p3y16sinv6r8gqa4zjiumnglbm',
                sort: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: 'am5eohdy120wcfu5lm7b6vcd2zigytnjgcu4usbu0i0w708pyda2mkgsatzr5k989ufekp4c9j79yjb79ieneh66xf2grpun7h6e0neph9stl6nffknuco7a0wf3fizkfs7d231tmmr1pzff8uo6tt9poa6ccf6uxsvz8opdppla9xn8kfp8cq42cxtp3jys2r28ny3gyea1gm1gc0uil4pt7u8hfaud7whmm6hbp36qntufbdqq9no68b5r374',
                root: 'xfryoit8ijso2os3eljebcuyptaywd',
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: 'oe7b8oprthstadpbu8avh5uycddzlzgr0665xbrw7o1lprqxtrd3vwnlriw8uhkh9ga538nq9yznj60eu4ev8d0betf2ys1bkzzhs2cwfkzqhgz4izmf46v0nvxkgugklbs4xk9drv8lkn8ls031vtckzxs747qywah8u0a7b78hqwb7ng989giva4s8jrfq5awbzrzteu1vfmuacei8b3jpp5z8lf4xbgjyku2suto1z9dilhm4p5xeu5k503b',
                root: 'rqq2fc4bnjoq3rhrrtfqo9gx0g5mxg',
                sort: 180014,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: 'yom3w6n35l7oy91lc6x65dngur2il84iio975wvhtj5exciirvxhg92du4lgyav8iurd0q56q51itw9mmynqv7vhc3svubpd4jqdjonxi5al9jifu2u58ka96kkaydqjn5v0qzyhhr2h60tgp0pzm78s5csr560fbny0x40s4cfajm0hizbpqor33ogo15k2nczc2sl5tw5uqzhuibd0v7ya131u88lcp551ezv9pb178m84ie7b7007gurde9u',
                root: 'e19zfmm0qrug6mpbxwc4g894fu8clx',
                sort: 856562,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'ju6o7qfd2a1yip8zbu3oqhspcjm88vudpl3cr',
                name: 'rl43m0wqasekb9bprx7m4qm5ukjxu1aswzk3izc02w44fw4d5vb02kg0g0d1usvfiwtcf5nobgjo34ba5wf78yn661jcskhk3wzg4rgxm0t05741x4hahgajh59eqspw8j1w5qmzbp9j3ursnljm4zgvarmdtb50a633bzqzq3fgs3rgpvdg68cmwflyh1nujg8ijq18ww0umd26ur3bpaxc7oqkrbagiw4ka4qjl8w9qcw0bouzd6cuhkehmp1',
                root: 'stebhao6xp0yei57o713klio51wu51',
                sort: 486379,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: 'kpqkwpibn452to9vtpcb3sgah0i9jn9lwjyqbbm22ce3wcyb0y50qdmco22sm4ecl8ga6qhdc9z7h5vy8hkvopfkqptyh4wssx0urazvq1c7iviv7a87yg2xpjqazgd7d9yox4zyh8g9p85zmy3k82kij3vzdaqh9ww25steoiowyssyar5di6dcntgbxknud1s2vovof3z7foc6q9vxaroo55bo8ynfy7j4do8tz3b8kkb3n5pulp26hksoglcb',
                root: '3kx60su4795v9qac2gt265u8dec1q2',
                sort: 708782,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 30`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: '0salc4he9fdp79es1l8nerw7g53no7lgdrp9evgxdjf19u9p8am6ub347hbgswkgv50a54k8xfyy09f9ye1xbpw68mx7zmwx7rxe4nna8xla0neek1jdq9yysi7alaifqfqats97jzf9f2x0g9m27wp9eknm38lhx2twynmq93z1113hpc4hclfn3w164iui59o7nfrhmvpovxnpymrhsnh1wi0caombz6gzvakuyfsicg6pljb49lehghivfj1',
                root: 'wvosfeu8f9lra2jypzbdaebqd9yakbn',
                sort: 106250,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 30');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: 'cjaojnz3n10rim2kibi55852eej3n1q7krksj68hwgq9ci6s8b8lhgs50dvq66kkxgsup7445s0rmx6om4uixv0bywai5s0dx8ebokfc0njz0yxalwrth2aeeqn2zixl8swkacxr9wb030rrtakl1by9j2agp8m7o5klf557lxvgbqev7nnaxzo9xwdt6s10hd9unm95oxdggwz282brmkfak3mqdwbtga3iv2qologg0ao3jibkss7jjobqs3t',
                root: 'y5fzjxim5i35d2dlacmcfrk2psmaqr',
                sort: 2653909,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: 't0tfe5wnl8q6x7ophkp17k8r7wgmqhfo8hs84w0sc9s9ww59doll3cbr8ktbpx0nubzt2me1v1405mud149kf33p6x2wqdb30851a6cudtvgvkhnhy7l3od2j8i407khvn6n0iek0s57yqxh3lfh7cooj6idn6xa8hsvfd5wondxywm962ev4lhvhpf8zobgni2huoyc8o7x4rpblcyww92zhusblu533z85ywawmikoljdyfexckv7mgbay5hn',
                root: '0e1kwvrrvswu5oi7b6penkbajf3f5w',
                sort: 656132,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: 'uqx2sf53esi9gf8o08uz25x2qolkgw62fsa9f2e6r6msu7ckptp7v7qdtd73n7f5nm9xf1mugubhflrmojg5esepnc915t7t45tv4cjyusqfg3e7qudcsukqt7p9zgobir7tafgl8wbj0r4pfk29ywu2g2th56gi1ri68gfbyv6dmnhr6rzk0sspxo2fmjt0kjtkyzv17xoukcommmxdnjfknrz5hpzi6rnwntpjog23v2qe4qmycar3itywnum',
                root: '7e9yis44vlctbqylins7menttqh79y',
                sort: 219890,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET iam/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts/paginate')
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

    test(`/REST:GET iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'd094283c-5bf3-4495-9995-56efbde1f441'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '100be2dd-fc5a-482d-9093-45dd8d9d58fb'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/969ebfe8-0804-4010-8ab3-18bb1e0e0900')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/100be2dd-fc5a-482d-9093-45dd8d9d58fb')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '100be2dd-fc5a-482d-9093-45dd8d9d58fb'));
    });

    test(`/REST:GET iam/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '895e5d18-ecb6-4206-ab07-64c672b233bd',
                name: 'bf3q4tonbl7dvs8u76ac9vcsohf1o2pg5cmup5gro1riqoput6grkx2nm21cts6azi1si81ou6wlw3gs2cb5nouahr77rnau62pu46dhlsqinmkrd52g9bbfdozfo1d5gzgf7z96cug2odwbypmfdmgddibkr2drnf74m0ovqnbzuv0rzrprqfke1x9vd3k6r85uou1sv95g3jqavi03fuzcyl33umlknbgcsd2cn4scaov9ebsnmzbshk3ptr0',
                root: 'gg4lini2b1b9ik9jrufholhqyb1gww',
                sort: 884416,
                isActive: false,
            })
            .expect(404);
    });

    test(`/REST:PUT iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                name: 'k547nci02vng1ui890riu1tt9bsd1mcbpgofi9ngj6zrbn5ecq0iqratjm3qtsfhz4xye0vexz272pm9olh9qs97gcsyr3poi9nxaoy6jxt0tf41ub5ykx0mopeyylby1quftb5h8qb73kgzlsngkf70kfrwlgh5af0fjsby8bd9izbbvp897mll2d3ottz8lmcc1p6mjrk5f0t4g2hdklcw53t3iof3qvqahxeznh0t8ejlklxvr8qmg1ix7lt',
                root: 'lijijrqwpsdui8s4rgh27f27c44260',
                sort: 577071,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '100be2dd-fc5a-482d-9093-45dd8d9d58fb'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/10f76465-b6b6-4b29-aa27-925c7d595d0c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/100be2dd-fc5a-482d-9093-45dd8d9d58fb')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
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

    test(`/GraphQL iamCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
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
                        id: 'b02d87a7-4325-4b92-a71e-5e49017b26cf',
                        name: 'ha3jm6k4n3xpgug8arux98rqclia856olvnq8jtzav64mwxvwo08akde8y2sktkybx0wi4xhs75uufjvtnpuyv9lfowc8xyjqcb1jaf6bk1w0bgzr3667kiey6asb9ghhu8x09djtf32o3g4qsn1ybbjg3zrg2pa44vm580kc2anjr5rm8d249t4ndi71e7hzosxpnmrqyukh4iy5pseufic3331aisdefj01tf1wz301yz3p7v44y4s59lpbwi',
                        root: 'fjl7fqic9fb23gv3c5vi16sxn2e8kv',
                        sort: 631084,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', 'b02d87a7-4325-4b92-a71e-5e49017b26cf');
            });
    });

    test(`/GraphQL iamPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '9868b90d-c44e-4731-ad4d-49d121716ede'
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

    test(`/GraphQL iamFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
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
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('100be2dd-fc5a-482d-9093-45dd8d9d58fb');
            });
    });

    test(`/GraphQL iamFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
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
                    id: '3162e7d3-9005-4f1e-9d5c-88b0558ae3d7'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
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
                    id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('100be2dd-fc5a-482d-9093-45dd8d9d58fb');
            });
    });

    test(`/GraphQL iamGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetBoundedContexts (query:$query)
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
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
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
                        
                        id: 'bba6590b-74ec-4d5d-a9dc-a618c18023d6',
                        name: '0phgslze4u88unik00m66xl3juuj9i0t9qd8sefohtags65hzcgi73gd85z2f5vqbfir8salur2zy8wtty8ee45adtgncl9aqvgyl176fnlrayg2bj2o5w9h30axd2x5t8vm6ud0iu19g5blxw8b290z42ar3om6isa9d9r26b4ogo6y42vg9tlo54j92mj1nhj1m4e8d32mj3759j0sv7dno8mic7hg8etxmy43hq8v2e1o4cufqau2rtkcxls',
                        root: 'tyvlh11z0xt58gukjaj28h04xyufce',
                        sort: 718821,
                        isActive: true,
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

    test(`/GraphQL iamUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
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
                        
                        id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb',
                        name: 'a2eco1t19d65kjvnrweccipvo1kl1kx21espog1lrqnukvi7xhy4hvcxk3la4ruveo0n62bbvi7pk1ue06n25255mn682q78yyqzde16911nqwywj252h168m3z9ym3mcjtn3ou3xe8dpgj1ir222wbvl5oml606dfkf1u0pwk0b8skrq5fb8gjxpj85dwyydbanlz69a698jlqa8d7q5htudboi0dxt49995l8qjrh0zcsw6h00wppdy93wkz9',
                        root: 'ccijfd50bqd58vhqm0jqa8pdfflvym',
                        sort: 537347,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('100be2dd-fc5a-482d-9093-45dd8d9d58fb');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
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
                    id: '63d2f471-12ef-457b-bcd9-fb656884a07d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
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
                    id: '100be2dd-fc5a-482d-9093-45dd8d9d58fb'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('100be2dd-fc5a-482d-9093-45dd8d9d58fb');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});