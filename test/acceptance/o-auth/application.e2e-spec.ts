import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IApplicationRepository } from '@hades/o-auth/application/domain/application.repository';
import { MockApplicationRepository } from '@hades/o-auth/application/infrastructure/mock/mock-application.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('application', () => 
{
    let app: INestApplication;
    let repository: MockApplicationRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IApplicationRepository)
            .useClass(MockApplicationRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockApplicationRepository>module.get<IApplicationRepository>(IApplicationRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/application - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'kob1ivemrzluljqcy9r9ytwjhqsl3p6hirl8uvherfuusg44ofut02ghd2oj12x8okhbpc8a6pe57brag0ad7jqjsjs6xyj7a50x7fnnwxb1jfg4xdnr3hzigfo6ai23mjz68ghiv61ba8esbcy7eopd23asf81xor6u5y7rvv1kdxgz0ov7b6seqt8evlrq4qqkcoy316ecb5mrfzhn9ymorfqy8s2l7vrcnr8tve06bwzrqyusp79dml3ph3h',
                code: 'gctu5niq2e61uuliexdfyuvqo4qtvbgi57bcvaknrxt5hp5mhk',
                secret: 'j5xdnlue8llc7mas3mdkj0qeikuldk0v71c7xbjewz2dnezkdmts8q4wilum4wedq5x79eqxci1jrvx5th3atxzhpr',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                name: 'w76dj7alsrwj6k5xrp6pdvcuohkk35nigo05yp5hk307c77ytca5v35iwt8mxf3yfswrkege0tigypqk4b9wfr2nkqu2hiijvi2b846z6bt3ffaljykpxi1hc8rtfnta93og2ed0x5agt4z1cq8m5msvab1m7slzpdsxljfo89wpqtqkuu73jwy4nzxhsiia3wi9rcqrgrgs1vp0u88rompnwogwdaifvj8ib44jcwappjs6849e653ykn6neqq',
                code: '3kswn4uuok9duijztk3jc7chm4zpmwwcl4qidicyo1bg4j100h',
                secret: 'i1p6njgazgy0r7cj0vzne9q6pste4x79pyt440neloqv944kqoacbs8awcl8njbz3b8yrf0g9rzwslmzneja0zleph',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: null,
                code: 'xq4gz74jn67c8po9xfk2we9mo8iplp83a3dtwvq2chjhug38mm',
                secret: 'o629p07mt9ds025ky4ykpuw2oqyjus9xc64spqbs7s4h6pt93htme317p89tk5kiyougcgncmz8mo88m67ouzsn6fv',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                
                code: '7s1anitfea8521ex12hyj87dm1jp383b69s28mfjwltzpqn13x',
                secret: 'bmwdwnwb194q5o80mljjs34g403kky4jsqbfnxigf3js38o3h41cv4v3df9cjkt1nnfk0sss8fbvw1icx05i5y13uj',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: 'lpkqipwac5fxju1v6aan4qw0mt08qk29ajph9hgjxuctd9dbzz7gdzkkpod8dinorch0fla2yavvayc76k34rvw6p8bwe854z1j8qk1nukuczb7qclh42a4958h5b7qj5w0dpagrwmo91s2w5zpq9j5l40oohbyzvn2te0u12m7l71uzs6iohcwnjmligutwpijwlpixluojqjc4lxlpklb75n5db3ccgu5r7dv60r72fyae33wbwq7un0ihc0t',
                code: null,
                secret: 'z1pzuljyqvqlogqeuycdqqrbrf1xc9gdgqfejkdsvkzhz27c2j68uv5z8zltac87h32m4a8de0oto6pq3ljo07adcc',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: 'uvygwe7t1ms3ritt0cp1ifuyqpn9db831zbbzx4a0dyo848s9ywmhe12iyk93bks45jjvqh44uij88q178q4aochrblnrv855syl58546kewux7zotma65icttenco53khx93znta5yow37x1c3p9nbiw6o5zuimezvrgwrqghw0qubnyo4b7kei9dk6ugp7u9wh38o97nhho3d8bpg4hpiir1b2ashldc1ylbhxouaapsr2ju79n4e09vhn5vu',
                
                secret: 'moi2bzbcw34zrian8sz56mtk8mfu26gebbk88h6z7hd0mj258ujo8pqos97p42a5dacsnstm9vjmm3h8bnvvraujvf',
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: '5kgr6t75zy9brsfwj3pxxr4ah48wazssbxijeeostk2vhdz5mzooqb46a97gp5o8roxyqwbb5wy5phbrapyjlcr7xnq1vqq1399bbh4rjd2ulflcvphudm08r1zs2esspj1mu5ay7hkdt0egfli2quli8vfj2x820yah2jw4g4x71dawbc300497d6jibzsty0l9n9h8loo6g68b5d83ryfxcn8uxyu3h0gbuu0tzvx7lhxiim0wktqrf75xvuy',
                code: '763txj73pfjrn2yp3yzg72apvkx0dxey8x0pu1kawfrucs0b2z',
                secret: null,
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: 'utkjtzueysl13cijrapclhp8hmej61ug883vnkn82yt1212ryg6ydvyrika6j5cbrmyyfkmt7nfr8j9oln63icwx2fn6jz8vovhifh319ssk42ux66rbol5fzqmlsqaw884963730zp18cdc5jgbyserz1bzx0hngyhe50iiekwzlc88dq0w0ym2rily9p3bhcisiti2fjqswxwqssnd5t2ggh0t10j22rug7cujyuoi6ndsy2r7lqdxkcqswu4',
                code: 'm0ejic26nntlt6ex2a8jyg7hcgdt8j29c9xe4ja6zfjzhxt8e9',
                
                isMaster: true,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: 'usdp88mei1nl2hy9tbmksu9snyt1lb6r508nrpu0273imalbymisdegk2q4zvoworvz5c6toyczmjlzhqshevdqtjfnewljg863cabz9ulyo7p1pecp1hb79z6ok6ybjek24nyuiw8by80wulq2hcp6uhwpjmp80hv3md8yx8tltv6cj79y31ugo6k5gbpwkfknxn4edi2ieodscgm8poesxxxwpcfljxyuy04tjqpqaaxgj33tpt2mu1w1i9cg',
                code: 'poo0r9c7au1pi5kghjuvlxy5skph8cbmbcnzecz7pmul59nere',
                secret: 'ibkeei38zs3s4unr9685g2210z93sc6v1tnq9eorwtsw0mque2umpyu6jc0v45kp4rqfbpc199cs12g57ctmd15npm',
                isMaster: null,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: '2jc1vp7dffwoewuqivap34hscjddub5cq9ymu6f2mk35h2otptvfyre1qdcu27e0el1xmixnj23p823tfalzmuro28gkan1c1sfgpbdumz0l64upg5rhde1649eqdqgd54zf3cw5ii7tzlj8xnxdwgcb7pyijq4ui8m7qs77b2r2ildznla03dxc6x6tg3xmtjqel72dv4krp6rx7xfjsn82tzzsj1xvkfmz12rrinjq4s6bhed3yadlxag61v3',
                code: 'qt0i9gkg23he4gyabjkq6eswj7mj7bbtwlpuzcaar718ke8ot9',
                secret: 'nf8isa6tkaqbs2spn9wc08vd054jrjs6h2pqb3m4i0ev56c0fdtx8wv8jao6wmrbg76gesqijakg4justoao5molh1',
                
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '19x08bs7ya7km4f5tcq932k9tziuc5kcrxpmi',
                name: 's40elx3bqhgiz35le4kqdqumx7be4lg2kyt8xe6gtltrhzkt2rmxf8rhi5lxvm8k1yhfr460h88dx38oo7o90lrejipxd6zyx8lxpxhyh518imzommxi6buqjufz2b22ofcviu6aklkbudz222gs9pte207ogzeo2mdr9hay1css2rtn2bmvwr80aweo7iscy00ccnwd1q46h28hxl6bimjyg83uj58rzjtyaqcyypcba1n1ag82px7r3gi1w3j',
                code: '7jz7njefxp54p1u9491f7lk7f593sg7ttcaqblo238rzhki2ae',
                secret: 'rvdeyqm4ma54u9bqk8ebxxw3hl6ckznvuxuz3fu919t1mnlu9vllttur7m2c3seu0uitqvop8sb3yiq0zqsm48h2h1',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: 'mlgf26p8eecqqk999xa02hdyfwm484u5w2aqkkth5w8imebyn6h9w2qybbd5060tcqtoedxt3hngqlj4wut032v1qsc6gper8u0kc0gxp7kpq6iezqdvkedr3qpmmhbzsmvzbht7vkyc4w7rhxhhjoy8wqray4kd7azr5bklu1587vjajivvmxx2x2t3pa7y2dvsno5j0bwaaxlm5f90l4ucov1ya5jhb1a16e2rqg0m4daghzr0rxmiit8yuhh1',
                code: 'qyhvnn8qxr7kn5lj037op50o5yubqd85org0qlpr4g2h3tkfyu',
                secret: 'u8gev0manncgene790rhr45igwy7kf7jvbq1ab9cux414lezgd2ilx0wdaedpx0hone9g0im9dyzbaywsa94fqi6z1',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: 'fyty327muqaewjvdr3jzue46w184yi6zft4np3s8lljicmxyrz56jehsy5yzvuz6kh2i0jk5unj106ql2zwkw0kcfr8g7avj6ep9s9x20xcu703irtmpxsonh1x3y685k72wpeg8z5nly33pc1gw5fb0j62daguu8wcnfx9c9c9tqllrwv5b3vdsk2lm2daonm31eejgvv5iy0s1kg2b15xa30tgfmpx14npcqc5bbwqysz28c30eyfy3dsus5t',
                code: '5yti59qrlua8rgosjuihlnhgww9ef80hbc2upqx7jhvxx76lgem',
                secret: 'wi6klb5w0sp1s4sqvpdkg8jnuftmi57ielmb888hlbdqnhvd3irxo55tptxswxwueobkyvmmrnm88v6yqwsas0jafx',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: 'uwvh9hrceu5knjevvdq58ealxvb43srzidf5a883ygbwzaw021zhon52m2l42c7awnqr0f7a6r1hm3pfphll7grlzzuy5edrxamt3z5g76yb45obs2ntg39pw6c94q7zyrt1bz0xf828d3tcfvvmyudoxy7dn75969odlo4mx8avp3gqizapllk4efxdgvgusvq32zswig1njnntzc23uxzmlsvm3nmre09y46e12tfafu0zw0gxnvp6hpi2ffm',
                code: 'euxbmfkgsnszw8g9vqep7r106gvxuznxc35jnd2rgb0tdakhvq',
                secret: 's4toqotdcz1hyl3wwr6ryj0qdr9z2q2m416elefj6c254y61chuo9j9re2fpabxg7o0z6mofdyhmighde9feyx7x1oc',
                isMaster: false,
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationSecret is too large, has a maximum length of 90');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST o-auth/application - Got 400 Conflict, ApplicationIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: 'wtzqf4ktvk6zt12y6jtdwawvdxv0pp3urn9cq0o01jt1zim4ob564vgi2ippdkvc05ovb3yksykt4wizaxjqxg2jqdoh8ldcs60dnrdvj83e611fev72hgco4d67zkjhb5tndotcluo4z9r4okbdrwjb31ndz4i8pa7j9xl03wudwp834k0s3lyky25fxiwdhfpbv4kzln6rtroaldiidlng8ns7aujnjs7vp0yh78vsnr960bmpdg3tc12ifzb',
                code: 'p5ij1vj4f193yls4tjiixady66e2cgm7jcucvb8naxjy4hhssq',
                secret: 'okhplj3zw9tegdjuwtwt1ouoay6xq77x2dz5ajsunt0yvetldmzhaqmiax1wf369v4x0ro3rxafky9klh6rx7d48qp',
                isMaster: 'true',
                clientIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ApplicationIsMaster has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: 'cxfsahgevqehqioy8urkbsdpfzhbrxuwfyvuuvcqu6k8efxj3q02m9zqtowhyzj00ykdqj7zlwhtvcgm7w3m2o1c81g8uvldxelqkno2nq9u6gjj9gu29zl724qcyyk0axzh91h1tyga9wuhrzkx22qbnxfviejlvom5hh3koar2n6lw2j1hhea0ps9jhmyr7j7o58e1s7as1f4gp0nw9dyswcf29ycsqkk16l4i894ybmand2x36ehuwh8xku5',
                code: '1qw2qyv7shi96lnchwg45guvtt9ok5r9et774mfe8r37cimyfu',
                secret: 'lxz4dqlvq15wmi54b7r9lifradmmbahoyhq5zvqvwirnemt12lro9ct3mex8a4vztao42pzdecuye3w83qcrw9u2qe',
                isMaster: true,
                clientIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/applications/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications/paginate')
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

    test(`/REST:GET o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'c0e53e42-4d8c-478a-bb0c-baf68b7d4acc'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '09ec177d-3de6-47fb-998b-2b9e097d2cc5'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/9d2ff213-a4e0-4e90-8bd4-ae361b215628')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/09ec177d-3de6-47fb-998b-2b9e097d2cc5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '09ec177d-3de6-47fb-998b-2b9e097d2cc5'));
    });

    test(`/REST:GET o-auth/applications`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/applications')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/application - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd8d94e34-a06e-4f91-80b3-6312125ffa5a',
                name: '0h8h53jsryz8gnjaaxjls6zy9lmx100znkxegme1cx6boxmbfgu2st3u6kafhc2acc0v542d6y04bsyigzk8zvni3sk8j66wzvpd8vnfo17p9buyrlw0u18yo060rabe5ov5k5x9tmmb5lz6q91c4cjfyz2qc8sxwla1hnyollv39oa0lbhnn6wlicjb4h2lb7aebwfd6duwma6n86izqkz6uy5r69lnxjq8dywd6ck0d8sfwv7raujpf6mqw5n',
                code: 'gg1gu7bhqrvl342bamwqsiex2hzi3abgk7d7ffkkvd7q3epd6d',
                secret: 'go43w8k3d2pgqph9o3rqjaszsh4uy36951mzz9un2q8rin9lbctwuayjmu692g6xfv0whs4wzz3v5sc72sp83ua8yv',
                isMaster: true,
                clientIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/application`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/application')
            .set('Accept', 'application/json')
            .send({
                
                id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                name: '66bu9pkjv7g2sd6sy6zy4b2yo50mpgmamwacl6fn0wm1mhezbs9qigm0fzl79bav9413er5zmyo6l7kwuqjcbeqge6636ctna5d2mtu5dqdkr78kpowloy6wvwpd32txkrlu27zj4rehgjbsk4gyozefe03otk12asj4sam6t41xgmxrts5sol4oz7cu7sfiuh8s2aiavn4nucqxujb9bnplvebyawjh54zgmcdfe75hlon01j0ceghkcrczy8h',
                code: 'w8f4dyo54wmh7xb1scwcda6gktg6d65c9y6y4c8c3ba2d2td1o',
                secret: 'xx4jd3ezl6zecqz90jfcc73qnbzxnsjruaykwc9gkb6ruxi5g297sbuj09phjuk7jukimkdozxgv6tt4lzg1avnfe4',
                isMaster: true,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '09ec177d-3de6-47fb-998b-2b9e097d2cc5'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/4bf94663-e35f-4bb9-a7e1-4c0c23bba934')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/09ec177d-3de6-47fb-998b-2b9e097d2cc5')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateApplication - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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

    test(`/GraphQL oAuthCreateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateApplicationInput!)
                    {
                        oAuthCreateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '8114d969-71b1-453a-9cfc-be4a46bdf5f2',
                        name: 'q8ontcemmuvd5a8l5aw5myoiphnz3ph1k0n3txlkjzxm6w1lipfveh02p5ygjp54a73xpv0zsruiyiaoqng0pjqxiuwdbbw61523954he09psk4kl3ef06i25elre9sfv8tr90l7go7oqfp5secrs9kd9aez4r522hpp7bcf6hnckoxonb7fn90yo5tovnubmjqvzrh7qisjk6tcvarl8cx2k2dvg936196d3a5ohecfo53m08cji1ul0fjjoa4',
                        code: 'axr0c5u03uf4jfq8v9dxdm2lm097r9jjcs9x36rt6hefe6ueal',
                        secret: 'qvsrqialquv6oqgbsi8pw5dvatpej4evy0reysi3az60qr4ljmzujm2nx56flr2eqq774nbjhkmt6oi7kzuj75l7bg',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', '8114d969-71b1-453a-9cfc-be4a46bdf5f2');
            });
    });

    test(`/GraphQL oAuthPaginateApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateApplications (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateApplications.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateApplications.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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
                            id: '35da45fd-79b9-48c8-b585-3c004ebe51a6'
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

    test(`/GraphQL oAuthFindApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindApplication (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
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
                            id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('09ec177d-3de6-47fb-998b-2b9e097d2cc5');
            });
    });

    test(`/GraphQL oAuthFindApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5893739d-5eb0-427f-b618-e95acc0b8d97'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('09ec177d-3de6-47fb-998b-2b9e097d2cc5');
            });
    });

    test(`/GraphQL oAuthGetApplications`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetApplications (query:$query)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetApplications.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateApplication - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e144c8d3-5e19-4253-8128-8e2b2cb252fa',
                        name: 'xu2oeld27422wl0eoy5z88yqh1nynrkqy5crafwql1qx8ewq31phq97bam4nietc3e1jxucq6cfc4u58xvjkzrqisklqcnnwq8f9k13yizjepe0atrqqq8so9kdz8thsg52wy8x4zp5k08e1dtewuhq37bulf47v57ax0uja5l1lux8cgenkhvpgnex17sanfz3wvv0l9j4plfnrnli3mywdqxan9g0dlvjmzccbz220nomp5ycchklf0gge0fg',
                        code: 'g9zqydvrbndf5h3g651cqjgmhadgb187n06gtqytcdu61gmhsk',
                        secret: '1h23ofogyjhoh6jj6kgkh280hmfxnypulibammaziab02vtx4a3q3937beh5gr66d9xhqo1upcf0lq4fl3dsn8dt5y',
                        isMaster: true,
                        clientIds: [],
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

    test(`/GraphQL oAuthUpdateApplication`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateApplicationInput!)
                    {
                        oAuthUpdateApplication (payload:$payload)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5',
                        name: 'bautdf16963nbjq1plb52x1uix6tm17ofb4f8e96koqia6zl53j1qj1ecfjs123ynexmdi9ihtirw7nmcu8gpgt9izqyj5gqhw5t3lap3hvdm4h4xie55abo1bdxp441p4ntk0ygyne4xikwemeosdpovx2y83fxppuqu57qfvltm4mxpnumfjeakcfgc6opr5uux4gdmsrtwb3ibv40k5uuc65qbpkc5xyyqchvtuhecq37mx8eggh129sv8sq',
                        code: 'qrc9j2mmwt6kfi8w7en2xt3jkwjbtvew0acd7ndeqq15nbdn85',
                        secret: 't5palhc5mrwvrvk9x7pgoya88scwtlhncykw5pvyd69sxja91izhpwqc6g9s6spewkydvebpjglys8mxwg857vb5kc',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('09ec177d-3de6-47fb-998b-2b9e097d2cc5');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'f20348cf-9e2b-4054-8203-89470370ed63'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteApplicationById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteApplicationById (id:$id)
                        {   
                            id
                            name
                            code
                            secret
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '09ec177d-3de6-47fb-998b-2b9e097d2cc5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('09ec177d-3de6-47fb-998b-2b9e097d2cc5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});