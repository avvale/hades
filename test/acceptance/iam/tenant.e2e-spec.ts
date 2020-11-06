import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: MockTenantRepository;

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
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);

        await app.init();
    });

    test(`/REST:POST iam/tenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '6gvk5eoc0xjiofn887m45qs8h0bf8jbu8wo3i6jcdycqg3b98ikcxk6qze7jz1k9nv4av3fvp5hguunl06dqyss7mn489eo3rl1oyswlxq6x5dymm8hz33tmdypgr0x96nzme6hov5m9r10kk07k03d3pk8h3jc68to124lt4af0p56vwtespn63egejupety153mmj1rw6oq3xcfeer22saj91f6lbwpwz88g6vxftuwvuq4uegfsaq9v4e2hv',
                code: 'uzn7yg0liewttxnoirn7oh63iawbm8mffw7o2vdxe82xjxuz8f',
                logo: 'mh3lb6vu4bv20ob430z3czxr4twrcldhdrvc5xx5yh2q96sirvmw2ts4of4sqdosquuwu4dq9a2oueffar0rolnzi06esg4rjjwyxpabwlb02ntkfthkntffse79unz80eykw1c97yslmot8f1sn08uuc6k67fuccnjybq6ap9f6qboodlnuqrgqw8cqeizeeggv2en0b1gd038m5ur3nzrithlqgnvsmqk85onptwrydu5w1xb7pznomjq0w01',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                name: '80p4qe5lhd1lmlc8ntxl9bp7otkbmcvjkh5eht9eb7spuk1hcozn1h3mhqku2g4onqbaga2fa50qewl31sp814hlgqmx3ew5eb97uhvbj34exflsaksaacgv7vi61r7q50am2tb66hws1ntv24u0saxt327idh2g5l24h25oiivs32xyqib6wfv8lwa8yww9ersrqe5zes67m0s42t5uhhihhmab2pxautfvjrabj0lvkyrb0x8mcd36oyd9moa',
                code: '8v0xfo4duq3cukgz4ns75e16mcrfhkepbuipg5xnnq0ex6jzi1',
                logo: 'evqbk9tmpw4ye9z91hx619pq04rit3m49l94lerjdxl6iv25lng81q0eh4l0j8bt238bnn8ng12qj2ttrqbt49sohskb4h2p9y20w9hhhkchsmpmvxp3wxbqf3wluvcjptfkmtzfgpypzfm98zcj2zv61l9xx2etx4dy2s1m5fg6d4i75z9a4ybjpdzsorj54tyydncndx3ehlyvm58z1i3yx9pkuu9poi95pofgs3kw9kkx5xyz9cmycwxcr5z',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: null,
                code: 'zevg2cjoq5e8eeqavrozj92ga55nicd56lzr9nh2vvszkfvd57',
                logo: 'akr7aut8g5wyfjv66im34jyz60vqrpqm6eriv7o387buyjltt9bytt61ezbl11r6j1h88ynpbhh0tyo7194td2odpyk8x46m0eekm8xoll3uuo4pckt8lhyzamv10ooiabvudhi6awdcqexaf6lplcujudpfdf8t0imabb7dk2kxarwzjp9uokbbb3d5vzzc0uiavowumjr2t5din7z4gv5r28cqyw8tgjqootemuugq2xreuvq2lbp71z9s85t',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                
                code: 'liibge59chnap3naaixhoo8k9apqhb2tge4qhi2toxp8yunqkr',
                logo: '3ujox7nrz0npvnjmrh11drdftbzx3osi08z8qkxq820rqk2hbc1hdldrr5t2uqmpbdhryaug9au2htntm8pfskpw67m6wrh00gfuy5q00n7aoa1k3mpycbisjydvhdjm3dhlcbve6y5eid9j5jqh1uu9hg23jj3gonc4zu3sxayv7rnwdbsyh8afmghs7afjvrg2ucusbem4towgh4tax79yd70gyhkjn03t6qrj9wiayawosky08owpe9u8zc7',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: '28ps47e59311u42xarbcfr14evv3bbvt94tiqphzhndojgj4vlgkpc5kmjtew9lwuj7lriolmt25va6byritoodp051thrnayubkgwrle811odsmph7axws2cfyccps0y8dvbuwmbde1mplxrxwvqlba8obrlgg0r82m1m2c7711mbtl2r0f8ol1dblroxysx1ik6o94wl4z3xc0yxpqbatolgyn418tocfesgpz4cjvh0qbwkgcih548lpkjlo',
                code: null,
                logo: 'ltcz3y31lpf71atcca8xpudfmnyhj2b3vnvzpbkg65o5e0sl03077093v5owmy6hi9503o08s9a7w2y6few86m2k5prmasxr6q2zs6bade52jaen20olr6mwkyspvi3670scwg833i3odn01l4ctyx6osyt6i6w6e0762mr71xhp45esbuggzb8j32qe2kf2khatyxjhku65mgd3ydwtu8zwcddjxpyeznuummpeyiovdu13ektt7wx8susu7wj',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: 'utk3aequtmoq1rmzkw8aqnqd4sgtujz1xpoo2tcpa60jza0d59t9388164zus76n29bxnlv85517sixow4vkgi2mcrl7n0m2qx3a8kndbedl0py881j8pj3e3wqcdsm4c1qsph1ghc475ifmuqfjpv9ueq4ygovfjcbku0ua6zq5k7mrz5hkgggje8zvnd1ymqauovez5zrz9yp144x5bfwr8fbqqw4f1yimq1d0ldh41efnhrqlgmm9d4chabh',
                
                logo: 'uo1hu8ehfvzjk9b9ao79r00og002qso3n7akpivy5r9tadytwlg70q6plxkwe0jsxux2yd3ck76z9s3jlbcbzw6k6g8xai4e42hj30i9lyl8q02ac1l3kzyhlz2vi288opmbbhigutubx6tcu7t3zfj00btc6du0vm56813qch7ga8euctnklnz5ghxuuc9ujwp7l2u59oo4n2vs2d70sptvkdeqa33041i89i5xziz55y4otjkh3pg50obxlss',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: 'gwl1c646ski7qyc8ttqfnh6yr5tpu65dsxu5ncf2hgxhyxp8mqrt02ad7n6fd58eqmis32ri2zf6t4zpfd0v6oj0l3ni892saygz201rwty82qrecbfkyox42oo6kif07vnf7f65m7i9x1dldl856mnkibm2f4u8kba2d8xkoze43iyj4jys848g10ap7gui6have4h8wkzy7llr4e06zk7f44eddyct170ej5zm3fgibye34eetid1719fe15b',
                code: 'by7de53dlo2bcxd9be78xaf13nkw4es6ynm5ti7vg2qb9p8e3d',
                logo: 'v9a6gohndx7h5fz6yijwt1l8387toclgtbvdptquu0p7f2iasis9p6qprex0ejgv0rhz78z35nvj8o0pm3o0hpsed0oj4or6fqiy42fawglyzpis7uko7hz3yjbxbh3813rttbm8t7kwmhiz44c3ndvnxmchnlcvl3euzdqmpojugtj95vwsur8ouurmcwli1c9ijshn43ejb3eeg8tenmxi6n7gzsce8h5jpch7tnfelyledw97ymlly1gtpgo',
                isActive: null,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: '25xdovnk73quom39woe8m0vilmtd3d5zx6mhjjhypm7aux9jzfrv25k62yhenlupejef6o01qearz5di79glsuh6zf87u885h8mi3ykjz92ymv0y7hxpb03h27gbbrk3rm64u441k2nddlx8uwmjpiuqmcy6xuq148gqew4a2gtrw41y1760lukb55qsfam2gy5u5d1xojzxsmr3x0unpvo1f458m4dswm22i751jhpzc142z2tb9wu7ewgbf86',
                code: 'kubewkq3q7kdo51e4fxpy21w7y89xfkd3h7zfud01sy1i4qgeu',
                logo: '00qqrfwqkwq4c6az297ijyfnj5wzyizh8a3qqk9g6vhgtabf3uhsecs07dtf0ah1102nmxkvfqc9b3ofqvff6jf6fonu0mgmvsx8dixh3q8f03thdov6mawdxrvudyrs4kbu6nxwg7ui579r2hfvu4060b4h3f3lrdfer4bd3447k475xugl8saifei9kiq3yzj095z8mbgcdg8vr3tcosqgbvkx7rq9kd48hjhoa8tdj58z5po1mvu0ei5jjfx',
                
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'sg3vs3yyj57gb7xbpploim8q7mcbeuvajl4hq',
                name: '1gpkrg569g3pej7zvnkbhwngw6s41yx1dsmyo8cov9ut3o83hcci6npq4e435cix2mc2fpra08kg5r5qktssmhmkp1ji1378fbtda70vnt0sb7ohx11a23w9lflx76gheex3yva99tyrfrh2nufdzz1g4a9do034jg2k9hhzjd9ws0d4fx5lmz8xi8wt9beaqrqihrpj54l6qopmosnnn8bhc7wmsc17yjccoam5xhfm0l6m5knjnhge5u8l7kx',
                code: 'ooowhhws8f4vg3y4ynpip3u4en9c0m4e3whf1mvdfinz1l377s',
                logo: 'fp2xp3mycam6gnnhm4cqqh3ya3ilbkpdso2g4tpzms6stkvicmbkrfg3r476mt4udp2ym8lh8pq7p8uf1ostgj2yxvbe3be1pju1vebknkgwhuaako4uqn4ma85fiug4zjiak3160yz4tcmv201bsrg9yj3xs4oyh8pj2vk6r4hwbqrk1432sq7bgr3o8xfysig1epy6r7wbb30abj8exqd0abnsb0hkzac5tcb4k7bkk2b45qmegv19yv2ipnk',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: 't2qnl8az04cn8bop4pgdwy3vs72qlvu5v0usm43wtqq8yieoh1y19gtcd6m4z5ao8ohhrvdtgi1c4zuos2xz4rb6gb64z2s58ud8fxhh6qeyikie3cy3ldpj6aaruasxk7nvp1jha7a0mpg66npfny5pmbefo88mqw73itgssrgxqnk6nzj0mxqg8umqe2eq5hidki9dbazsr3yv2mbfws7eowor1ensupxkun6cghovvxqp3wrie2kbzdti9od1',
                code: 'vstwhlzfr0gqintr2fruc2ng792kfjf5ssvooavublce4c0f83',
                logo: 'esvebapynm7kjpohxr56iris3vqrzpoyfrs9yzdfrg0x5w3mj83hg5gixwexjl62j544yybuoznqgl8c6shbwambsvuauup3x9na6lfwjhjolxoe50jwkpsf7lowi77bl6zu5vtuqt3t0bhjly3siu578ksrm66aocnva79ffep4l8iebjzralh6zi6wtxnvc9hgrc97d5p88uib1jyj9a06hikz6747ip63nywbgfjr2qvgddf9qw9po8m053d',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: 'tdxxf8o4eg18kwu3qn1umz7uueyzby6hs3uqe8py95y4kyzfwjvu5qfwhk67e3ll1wgtv5bspjjawtsmkmv2xv8e1jkg7399iblhr46qg8fjupt6urol6unk8iby7fmik61y6javo6eem3zrvh9rkd93wnei0jv8zs3d0yp6ecr8uxc7v13erynu4heols74jtcgpsmy12t0x0agrot8j07044ugatsf7kai987kxa093o3fwgqxjycy1817274',
                code: 'x0mzussv744kiqla4w0rcynse43i4nfu5u5tyu5midzbbm8wq66',
                logo: '92q4oevpl5ahqw4bul60z17817unzd4kwivt2i06c2ozelarfuy3c2n39k4tzzp14s9akhl24rj09xo5dlkzwptkdfarkho0cf98v7914kmvohexnf3j1nr89k9m0lux38k2wut7c8pnt149qk3ss5zodgogq9fhh3ed2gmgf9fq39q1x1g4scvflthqkypfy6hi5j0z7eymdz60zmgen87vmexf23uuyw3hyoy2tbzka6uox6p4b9xjh6lw5rq',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: 'gl3vxairvfamjn4w7j350i246ijhjkycyk0bas4xj0cjdz114nivb2h0amsmay062ys15ob3um41mgcnusn8j6770ltypjzi84hl7jvtqqqaww9wgifx1whhwohn659ofgj0m1nyqsaj0utroxkc9iy3rru11dnk44m1pgslj2llw48nc5gpssko6esvgudflybeps7ef0315yscp8zhk27hnhvz66vdhq0zwzv7ql9h6vz15rr5c3b9uzdsxnc',
                code: '632ayx1qutii42k09pyc93uduipmxsil9znts7gy5peio3m7tf',
                logo: 'd8qosmryf1njy35agtorcpl89c5buscddu8teolg3t16djnrgx0ge7bazilzr7bwwpc9dlunepjr5qsyj4njfxjyaem7kgy6lybkhk1bpj7qcn61hyjv7beqp0fghs7o426gfxmhn9e9v4ee7olj75hyz9nzy7p8d2h32p5jcljdusc6cac3717bejcr86y3n0wg9a9fw44gc5vxdr9xjft5a2j1xhp64jgouzo45ba9jm6e951in3le755wr0uz',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: 's3oa4yyqy4edwnxpx48s9ywe7ee7eubucduni1hd3isv0y9j83wac6f5ozf1kspokh7c1mv5xxiwsx3pua74jzjj7k1mc2pzgs2ued6v10zkwnyyjbfqks980jmf7teunqfyc6iml3o0e05i147yo4whnpvmhdlydhvw3m72ole4pvv2ww3gb2hj4b5s4b6dbqag74b9l1hicz4eomfzkkr7je0phz5g56phx8lraxzyaaamxrgwy7q5fdcqb5l',
                code: '49y8f7bekwdp8tiny9w8fm78kol812m6kp2oj8hpnzlo67fann',
                logo: 'ywogtmjiy88sm0mr7bv6dhwexzvdmfrll9n1f37p7gpnt6pb5u6q86onti5vhwam9mj3mchq28v4c4ei3n3d611seho6tonafige776vk3cwd37a9j06dqeco2vg3ltvvvyvyacpllytbr8ib2hhq4siccw4aq2q7sbvcrxptg092x95ai70qzzb14lic1n4ailbw6n74idtr6kis6hwqhuvjbkyzkro5wga2pf6vqqok2f8mg2biew3c0yigmz',
                isActive: 'true',
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: 'n1l4ceuw6r2uiec1dmwl0ame63qh3bpexfaetjtr47dnjcfsrggwlaxiii4qadlw0fnlh8p6jvbk66uwvdy36u45d8t02uxzwudtpm1yurtx2h3d8swzzkxorsisk1y6xr4miml06m1i8qfmttqdy5fxnolzcp0ht0d6qk0dl6v6a829pnc00yid7ww35gv21ddsvbljp6s5h9d7bpr1st7sfh6fee1peqj3i4c4d59hkl4coz78meeoxnoyw1n',
                code: 'nxd12zbtt74612fdw4qkzzzyjj8fn6by83enk8sc9sxep9vdbl',
                logo: 'x3oxdj33gk3mwiewb8n5797fsnbg8gpmajo7f5ain33v6khxv0hxnqjnb7nq1gnv4fwam7ng7x33vbb9nq98m4xmwt38m5i6vw30bez61f8782tcmxpp8u81q3zqtrls5ewlp95dd4sv5514xl8zay2zhor0x7qx929yh5yw4uh9ci3wolrf7dn2i64wt02lje2e8o3k5yrf6mqgjig1h100xiutiu8xkfr4avyodh74p0ad6c0l7teih1xvwl4',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/tenants/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants/paginate')
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

    test(`/REST:GET iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '3ac05ac7-1f16-4dbd-a636-c5395f8efb6b'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '9be4665b-126c-4a21-928a-0da80c8fd57a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '9be4665b-126c-4a21-928a-0da80c8fd57a'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/6577a599-07a8-4015-8876-1d80a640f43c')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/9be4665b-126c-4a21-928a-0da80c8fd57a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9be4665b-126c-4a21-928a-0da80c8fd57a'));
    });

    test(`/REST:GET iam/tenants`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/tenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '571910f7-672e-4a12-9ef4-c02e6872e7d6',
                name: 'jfzoj0arfmny4wd37lvp5t6j0uc53f5e7jtijq3a7je9gjqa2izmk50korq8ei52svnwc44h5n3kemma0siy0bodquyqx9tjjp2jhok6k2hk2js30wy5ayljccxm9iat59kccdw0qcnb0y9jc996xg7xrf3pj7w7fga8z6b2yawrjom2v2rvp7rlbl51xw12r0epqweo6kt4qtbppnuq57ttyxmxm07ncbj9xn9ag6lul89q2307dxk2upcwgid',
                code: '19iaq4cdgs9s2o3sqex9v7ehg8lsztdww77e25c0akms1t6v8b',
                logo: 'lynppcgpim0m2jmen8t2q0u7ib636ijsz6sm884ovu49gt5s9r7nv1fod77rbl0euy4vph0dt425byqdww1tly8tjasx3tac2jdcv226n8wbhvx64oefxwc0bl175u5v48ah427icd0vmpykk5x6c22zgx6mczt1njb2l2f5gsl4d2xwxh7y4xy2uw37jbpq9y5lk14a8k6e0osw4d6862x57f4nmz4j8z0on54xdoi8cu2tjxfl1uqla1dyc5o',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/tenant`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                
                id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                name: 'mt7l2x5qrrhmm3pn6xayk62s3fm90e2ldi1oxkygntaox3dm6q9otscowex1ui9igrbxm2h59j88pxrj289xzd6036fd9phffjmcpzoyufwel1jck05gp6jfwgwpzla8wr0qc608fzkkcskngmojk0021eqglbnv3toeyw1i3l1uvavbwi091nmi9ipscxyp214klbu5vhcp2rp7jaio2pcehj6mypuewg0cl2ko7ecyu9flr34jpq4s9hza002',
                code: '58nxheffnooxe0y3p980nstowinwtu1ihogwct47ixqjoh7j33',
                logo: 'gp32g7m1p7krqgefho5vayuqbuvql1cqbxfwcr1yosz2fu3098xmng5o8yrv5sopjbo4v9wjj4e9z8732qlwd6nbakst358nzxh7r8ovq2rlbt3rm6h72tmgdv6u6dicrzrlhbnu5dq9z5atwqapfumlmu38ellgum6frw3l7tzln76gp8b35swu8pinabkqmdo9yg471ix1g90y5psc2mevxz4wvemj7wjbmiapj1fifnjcb0cqtkyejh3xmn1',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '9be4665b-126c-4a21-928a-0da80c8fd57a'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/baa51c54-6faa-4f1b-9bf2-dccc5ca47d59')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/9be4665b-126c-4a21-928a-0da80c8fd57a')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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

    test(`/GraphQL iamCreateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '68df1029-33e2-4684-8278-7f0f609ab64d',
                        name: 'ooryzqm5rsq7nyuq9bufijtqnm60zs0od9v1gwbz6afin2qhxg4p7koxx08nlnjb3i2c2rt86g1dtxa506xxboj6td1x0u91xjgfq86mi3ahofvebzi69f8wpadzb9leuxrn3c76ed19bnta4ew7wm9qvmbk93hmb3jzc4d69wsyplg492havgtbaeo57kewqv6zoxgske58j7zzeuvpg66zrvtnhh8r2m42v12and7h3ffwbu5a844ogh10g65',
                        code: '9asj5tqm1ev4b5f3rusxdxr6bqacj67ztvuwv1awfbkfwz675c',
                        logo: '4i5orvsxih4c3goror6oo92gzz4u2irc7714sq4zv7rl6ysjcklxqbqadraj56cwjmymr1hgap8uujrywrplwaxrobmim6a0w8qvzggcyfpp1zo07jmqbym7hq5qadh6tkx7689bbnek7gvqigvdc7lxvaje4ji6m2jicx0wcm80b28aowcfnhrpghjl007uxrjjf2e7m9qnf40ejz555e7z1qd2etolpn1bvzg4tueiz11qtji2nucsf3vzohi',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '68df1029-33e2-4684-8278-7f0f609ab64d');
            });
    });

    test(`/GraphQL iamPaginateTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateTenants.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateTenants.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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
                            id: 'cc92b9bf-afad-4416-b142-2bb52045f875'
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

    test(`/GraphQL iamFindTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
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
                            id: '9be4665b-126c-4a21-928a-0da80c8fd57a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('9be4665b-126c-4a21-928a-0da80c8fd57a');
            });
    });

    test(`/GraphQL iamFindTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cc6181bd-6884-4f59-ad2e-8bd95e0d82a1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9be4665b-126c-4a21-928a-0da80c8fd57a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('9be4665b-126c-4a21-928a-0da80c8fd57a');
            });
    });

    test(`/GraphQL iamGetTenants`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTenants (query:$query)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetTenants.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateTenant - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '897a3256-75e4-4ace-a636-77a5bcfbc1ca',
                        name: '1vfyqmfbr2zydqga7t9oiqh9i2fmhbr49zrii3775p74y9r25pf4698hs4a0c23xru285j90ehl2usznv60bupqclatrutkix7j66gfhm9075hyghxclo0541ci4dbscrg8jnb0iexalggctsizex35qw0hjc34ickrq0wtnqtoz2ip2bx6m2imjbyd7x8phalizxnk1i12drfrj3scdvrpg8p7e13hgcfwtp5lwhp4xm48hg6yowg7s2k96t8b',
                        code: 'z4rir28i0n6jva4nb3amiqihs9cw522hk2czuwi4xts5btxw31',
                        logo: '1mua9kvm1kh1057acll3ymoaezgi5cl5qqkxg8kurk0rt2ny0u6w63tfoepkjarjurygic9o14jztmig8mgycq1kd1i3ihwm1ib5db6ygxy6us6dy3v0bznqepzgehqicmmepg521ublg9gtjni2wcjsahp0g3w799866yfonuwk9icv4rnzz7m7cpklvsgo4plmcdgz4hv2o16v4fvjgfko7vpsk5cbi1rbzj3ren4pe539nw0mpruzhvnjuof',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
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

    test(`/GraphQL iamUpdateTenant`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '9be4665b-126c-4a21-928a-0da80c8fd57a',
                        name: '6cpkvri5jjpxp8mcj1ficlya5du26qcm1nvdq5unus0m8i7mee3ql4hymmx2x0qqc54f6suy10jo66l4kphf20lw79u9ao0k3hobl99x4plyhxglxqukhqsi3n4dmb91pl2h5edbmpqzsf05f70qz1w1pyhvs8cmo5tizltebo5yjiaealti7w3a49l1ancht34cvh0k9x66ufy5q0uxaa55vgw24i6a85uobn0obqjer6pxj1cuzyxhrtg98en',
                        code: '51xfvnrtskdhmrh5h1qij5485zenbz9j1fn7412k76benb8v27',
                        logo: 'pzkhbivua9butkka9jch41hjwktty8p9ggwhvak0eghy5evahu6s1wno57bymj95lf4x1pgr1fjiiwre8ksof75k7r6df33jkv3pw0asqo0ayj573o456u86t0btnkuvrsyq12bv00913fs06rvwzwpsg1a78fa5x74abnmebsfre6ws1nhikfapxc7hfz3ok9yztzx2wtin5qapu5yg86770rre2dcfhc3t1xcj60enb80ya83slgbawj3jsab',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('9be4665b-126c-4a21-928a-0da80c8fd57a');
            });
    });

    test(`/GraphQL iamDeleteTenantById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e8e7c69a-b1af-48b4-9654-085b5d724138'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteTenantById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {   
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9be4665b-126c-4a21-928a-0da80c8fd57a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('9be4665b-126c-4a21-928a-0da80c8fd57a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});