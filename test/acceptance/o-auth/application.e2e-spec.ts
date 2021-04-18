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
                name: 'nqgahbli2vyoxmlwi72f5vmwxk0l1h5q319sw4dd850r02zt9szt9jim5z6cqhomx648mf2w2xe4j0572szq1zlbyq9gshrkw1gtpckpw9wa8y4maxb19nuph9nsd5qcjomkacx0153p9dlvqo3gc15n8qmy31qtjdkw8ibfnvocz3fk8sm6l47jqnmjf4nwmowtru5uqeinmvnoe0u7sul8nd9vf99pmxz7cs1kkusrburzw8uw2wre8153edk',
                code: 'vp4jb0udl5hc0p41n7hfytt9dzctt7gdvyk6pr89ip7mkfc8kd',
                secret: 'otaishmofobzvxs2ozeuu1k2eni925cnvuay6cgog7c80dm0lb0bg65gd7cb7z9y307cq96x8egr5i0twr8mwat62r',
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
                
                name: 'f90z6c4g5vtas4t44lqd2f01aiy5rio5yngvcc5e39eha0yepriuod0mtfgzjsay00dp4lg1wt3snh3bfgtzrdlgext846l4zxjncfjarzon50bji6f7rvz7mo0u4wei9p8xwzdkoe4zo0svd5ok0a3lunx3h566ck35u9z535vlw9peaokmfdtutp0awfwqi85aufgb3g1bwzrr1flfuctgphpfh7wudh8srpxdj6g10kwxo4e80n71hm1bqoe',
                code: 'gopjbhssq96y06zg4opda5hk5lvp60rrcp4gmxqxzg1yd5oxo2',
                secret: 'm82o1jvpjmuqvmdy6bb8x19fbui69sn9ubw3vm9nmnuts12sv9ypoa6l1bc1cx94mmnwp7eyi7qcq6gs2vh75kkq1r',
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: null,
                code: 'vrot9qkoq6b281im8cwu82hpu88emio1od6q80zzfeqe8gooid',
                secret: '0zr39uhuyfldl62euvrzvwoa07yhkkzs1peb85phc20s0req7h8dr6zt1ivqke3zz6tm2emkygaf8mq4cgq1wfnl7b',
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                
                code: 'a03a7f4i1el97x57weddfrxpwmeg8gy1g1w6dcieyxa121pouk',
                secret: '59fc3lj0d90ohnxe5zc0tccddbzd10sea10suckvjn9ngy4qkae05m6n6gj8pw8brfcr7s2294nf58v4ms7b5xyamt',
                isMaster: false,
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: 'ftq5edjtkw9lod8l0pvs92iekwioud9cdnz9dy9yyphuam3btknh4cnflvo2e01f6x26wtpuze8a7u1ai5nu7ysb9c9ai9de6k40kvj5jod74jtb4kshfwvjx3g20uvl1fywj18fgdgq2286oi9h7caa9nqz47v3da5kgqfrand9wgqb47rkoxifdopfwb9sijuer1ajtz27xhz45zj4r8z7h6atsy1uql7a9mpij5sxo3mlxluqinhqcu3gdip',
                code: null,
                secret: 'ixlowz1aoyp83q76gnfxuaeyzpj1bwdsjezqy917bfg2r18s2dev66eez89ofbyprlvvy310g95a2i2xluoy09ohh7',
                isMaster: false,
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: 'colxado7an8jd45lv05xvqd04zyqyqkdkqcpkbyslza4d86rs7qt7gkvszo6dlje09pdg081714e353jpbwbp55rxuodavr19m641vnbqgliy0kyfa8xcng7ea0memg9d1p2uwekux5zb9y7tkjiksuevdtcpbh4mfa39nq67w6etlogn7tmlgj0k4nqhgwetz3l65yw5sc0j5xdkw0eg2o6pw0c6adek6g0x2ips7cev54q75xlv7n7g78qlbg',
                
                secret: '1sximklpxnllphj67gh1gboqpnt17pixeilt6mym1672aj2qucasm4rsh244sazapv4bthd996pvmbsaaxz9jt66hg',
                isMaster: false,
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: '2d0dbscf7hkrqlnfytzt1qanzwwfvoeqch1cvtwqo2bicp65jk6now4wibsdlrutio3xz75612f8ipjab5vpwejz7bsvnr21efomdysj883y5euah8tzyzb0s094m8pkqu5zcl4pin21tw8f0gid7nijzu6sraypzrjkzpioqilxpd4n96rnr3ten9v9twk16rw048x8vxihqqaaa8ib4mvlinx8aynuy70o1vn5vaw5lviovuyb7q7mza34b09',
                code: 'k0l7zp32cdeoc73n4upqvwwe66av9k6z65x5zqzpk9hrdfzwav',
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: 'u8pxfdbm0xu3ha67deaw489yb43heazxnoy9uncoktgr7bnvhspzq2znc7q9gdbjk2f6sa846nbpj45m0vm3cbfhgsg18kasmhco4r4b74ce3508ob22gni4c5984qp054ft3xyq4ueno94kjof6su669a5qi8x42yeiscaghz2r1zcbg4b6d1vi3za7jnojqktxiog62yo6lbv4rr1xsb68in08hxht2wgvpiz72xix0snb1sh80m2rzm9ogku',
                code: 'meq56s9u422eaam3oyfb7fgil4kdmliakiijjvhm28jguxb8cq',
                
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: 'jne98fg1ri8ovg9mv36vg776xowrtafq7bprv80zejtj3uiq8da5rhtlmroie8kdyc9taz6kz3mi9q0fmdrhndksk2v1lu786s46up0y1h2q4ht5zna76ut3dzuc0222q9z8bpqv1eoyvv3pz17e5ohgz6nkzoaz6ci9f70314gso6gh0qo42tu0u1gf8vwfxu4cdc5r8r71th3709y83n6g5p48vjjrwut0rcu2oyivinr39i8fog15d2nxek3',
                code: '71rtz6o4myzautxa44ew5cdhkl4059au3tcdmrmulzorfilen9',
                secret: 'gptoruy359d4rfd7mopcmj3vw9u4y0z1oz73pd3cfletbqyjbefrjlj7ultdn3m6crn82ckye18emlfuaqeib8uozk',
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: 'fud6nbsadqhxlfx04gj9fmt5zot8mtlso9gwjrfnfbdoersrcwz5ae7xiscrc5hyiztlbk1ucr5n3iekokyrlyzjzoh1nb6vmu395t9laj19edtfdgvsa5ql1pxvp7wnwj6njfnvz9yzcwrd1kg1jkpu7pm7sypc5lgugper31aqk3r1yddwt2b385ssum8y07g5ui7wjwbsimh8jeg0xshwy3gn299hwa43w1z5u1915s98tihw8nl7txk8xtc',
                code: '7q7i9a6rj9cbgq1wk7tmz2k3y8b40epck38mxgexyzh06sv5ee',
                secret: '3agk2ytdvsey7xlpaaq639wy5j1zhk3y5myi55ghwfflkwfwobag4lz8n5x4j1kw9bob6v8dfadypt3pzdfoib9d4b',
                
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
                id: 'bius31atj6izsm96v92tnnzte0jl5en5nfjbw',
                name: 'eh37hyeugzerfxofxw7fzou8cty4nn6ww1vutfh5cdwcrwmlcz2557hmhsges41tu3q37uqbhd851cgo09j2rwrnfu2nuwxpt1b4joo3t1yhcjyjonmsoi4tt3iatnoa9oj96tft3n41ansep5zevbnw6g7laudv0blmjwt22htlbydmdeugitaiky2dk734mgd7d5xjmnvwe8yyci0uyq3ql76dwoedlffrd63hnpdd1ia1dnxqabcpz81648m',
                code: 'qz8zstgngzel3e5fq62w2f7tvu5gfr6cg4avqkrrhgeab0qlz0',
                secret: 'vc07tgc831qz6ywzdh9zlnb61ptq6uiqtuaejr39oxufrq4x14fx8jw4cgi7puuf2eid69vq3lv4wsom9ejdm1qrac',
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: 'qhcm46j2o4w4q2ewdp3pgkdr00strc8xixgbv5fvo0nh3evgrtx8og61orfsfhukj5lfvj9nmvtrbwtidrpl2nmdw9utxm8a67cvxuilxwsunlwlns7ft1q7v0984c75vj3ttxsyhalimjipa22voo7nj6ntnmp9lhbqfewd0314qvuwm7olnrbmsz694j3plttr5vg5q54ee853n2e5qhe4vuknqbyq6fe2m5lgfw2yymaxfth2ekwk4mhsdm7k',
                code: '83p65quak3pxvvt665eb9o6by9azvq53zm1gm9w0hb9elhp2ga',
                secret: 'wbymmzqye33kt9wf2v6mw04jhdh98sww4pmc57gug9vx5iaraec54c9d1fec04bz436yik0k1fcah2c67o9kh33dk3',
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: '6erkmuf7d6tblpdgphke8u3x87ot9mgygmrnbhcdnv73it9o99x9x32fboh903y37fl8go7juz4f9jryb9me4lvxsydin11codr0p12e2iamwfsom8sda80mgp2ym6lw9xzfth9zjbtd5483hrmbza1oo3ka6bf9kkgp32k6ryr1wwusvhcpzmo68k07n4yf03hgs8jr0kbg8dccsrkt8dqh62vb9lit6eiie5mfwsdehquuuigq6t51q6vs9lr',
                code: 'mkp7zxpaa59l3tei024vnqo3padkk861e2kcqs434rhm765nhmu',
                secret: 'r0dn7ftuagpk44byicmmi64fftk00p20777leazqflycdadx71w7r21ebwrid5sy9l0c338kgepapywsomc53yk9vl',
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: '2tlhync1au8phya8ztzf3y1bk4i8xzaznm097t82z76cb5mmzo66yc5z63xcznw42kbz4twuuda7i9a15fj6jsz7vz03kddbwpe5w8i6gqiqsiphc30w1q9qabjfbbyk0b15o0i2k5u8gjq4bpmb9lvcvquwzyc4569vrrncra8y7uzxh0ythf3ystwzkeo2i949ia5ttegd3oifdh8jyoukpjkxev8elvkx0gxhfj63q2kubi7hvflx7vvqykm',
                code: '4oqol20xdf4d8h2lipdl7b6c2lmv1oxcg9r4pq78xti5zz7rjh',
                secret: 'trlq1e5rfhpy4eejiiigjqex81a90nmfqyi2x12iw0m04onc033mu11bfoih0wu5njldkkmmx3jjihnnahv3aujntb3',
                isMaster: true,
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: '0hwbkdf2jn31k5x9ujpkb9q0x3shvn0thy23d83b1jkskjfmoh4clysx3zib408u4p24tqlp4x6pjncsiu3oqbtqfa368zt19n92ul3qtbyqy0v03yfl9v96zj2p8w9788nwxyk6r3oogvmo3bix2xoq2qeedaqv4yjb0cm5vsbfotkvdq9zo8dmzsfaf5yths3qtdi9kuhha88cot8axnt73ka2aa35xzgcgm48q26avbsnqi3supw05aqpckg',
                code: 'papwp7tdfdknc8ddos53yfnkjljoeootw9o87cjr9qgryy4buv',
                secret: 'l3vsjs4kqtzqndbxuc6aw3l37czxanzwfr93kwghka9xrbyup4b9whxrb8trn4k39jun3lo8h7ylpw8w7yjmr9a8x8',
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
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: 'c46x3dpybqpqxqh66dsv8un5to96z122ue8kxe0tpfdqxrt2h7u42h3t75my1nc9jx9k6vmzyzvzjk9nb04eicq304yqnd4gea47op8inobj6pysb3hhp25byvvqpda0xqjkzyujy6qv0jl63chxed7ss3x0xv2fsj4c3rxo8nk6s5kq5hjn6vyitomkjc9gsugse7lesc6o3wgpzs8p73sei4apolxboudyk6ufag30ucn618any2yapmxbadm',
                code: 'e53l8ws8ektxsuzd3l1hvsgz9fqyun8wtqi8qxgiwabmtltey7',
                secret: 'bjszb7qe48v0qiy734l7y6qtqrd4m0rp1khu990icpscahyrslxht7pc6tnmkpuu2u9tjoa0ttctr91kki7l4c0ra6',
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
                        id: '2d114a34-54a3-4148-8288-3a8a1d82f82c'
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
                        id: 'e8388624-924e-41a9-b693-f6f41db097f0'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e8388624-924e-41a9-b693-f6f41db097f0'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/fe1a03c9-cfcd-4668-8979-4709389c51ed')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/e8388624-924e-41a9-b693-f6f41db097f0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e8388624-924e-41a9-b693-f6f41db097f0'));
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
                
                id: '158da4cf-f1be-487a-b7fe-1f85fd8bf03f',
                name: 'c9yrzyr8cai4ag784jyyx8k1brr0rb9q1xp5c8rre9n6d0s2z2vc9oxvz9w9ick2u60upo36rnm6136i0m8gc9vajkc1jkks4tkm1p6igd1pxntt5szmrfx34soli1fro03ptdgwdu61si8ak1gsed1sy6cmh45ta516pp1a0ij19mezb84p5it0m0e6l241mm5espempz3hi05zgz23v30tjomxjq2qh3305g9amux1vy6aaisbuikfzjpo4or',
                code: 'qrb2atqchym24gstwu2lmcq0oua4iwyf478af8bi1hd593bf8j',
                secret: '40j57a52wl83b69h96bn1fp4ldgidt3l7znzaz6sodnod5f17lirepkgdwzb3g35lz2hkdx9kl4ckc01mxy3shdrba',
                isMaster: false,
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
                
                id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                name: '3j57ex8qlgnip9hwcnt9qbr9p1fwtxg4p4ogelt3tnsm1jpqdy6xrhe1j1cwa9sz7gfno2gojqm6dmgvugy5hr4kfo0qm25gjlasqle7n7xn4h3nq3v7v7ngfnv525bmgwpq1q2pore44tk4rl7f46zhbjnwzljf5k51atmko383ua5w5pve2eh6g94r87rsetdwr25yanhl7oj48nx0q8qfwgimxecjnkie2m5n0agmzcvtq74bycc6xq5u4t8',
                code: 'soyin42or1wysispcap98lfiblb6m19dza4sgp7q5vwlxdr6id',
                secret: 'f4nu1wcq1no8y6kb6pe87rxzdzwtmfpvtgtesxmvtos8ztpbloaukxgzt8056aj8yeq5c18ziswbi1kwlilsg64ihe',
                isMaster: true,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e8388624-924e-41a9-b693-f6f41db097f0'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/2a748b14-f57f-4536-8bc4-eb126e431816')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/e8388624-924e-41a9-b693-f6f41db097f0')
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
                        id: 'c0d77901-7077-43f7-88ec-26249b78d9cd',
                        name: 'utw747bvcali78e9ym4oyqdzsppwphed90hfl4qihlgnrlfevwmrgin9fe2sv8432k9j648fes3opl40ohrzuv01wrfyb6mmoftp4xtjtkp9n1n1ajw8mnr8dgujydd4dyakvt16e3fvsmjihjadj0n875fthpkwoyqgrkytxbwa4va3ylg4tk6zi688hutiyj9cy4txxmxfurnky4ki3hxjucmpw5rzgeert5w23g1lr80a35frmu28b5db0oh',
                        code: 'pdi7nh7vvdnzggoyrbeif1hnscn4ppzn6qn0jlkjbqgdrhekff',
                        secret: 'u893yghlxqybxukz4b5gaqf1yoaytqwr2xdrz0ormbearoj5qz67mdzflaq05bzkdkh27ev3omsb7g6w1h0hrpbxm6',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', 'c0d77901-7077-43f7-88ec-26249b78d9cd');
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
                            id: '9ff571c5-d4b3-4caf-a0d9-8a320f432f6b'
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
                            id: 'e8388624-924e-41a9-b693-f6f41db097f0'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('e8388624-924e-41a9-b693-f6f41db097f0');
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
                    id: '894fda5e-100e-459f-a375-b547b479b902'
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
                    id: 'e8388624-924e-41a9-b693-f6f41db097f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('e8388624-924e-41a9-b693-f6f41db097f0');
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
                        
                        id: '43b50b79-0b40-4312-960d-9560b5bc984d',
                        name: 'uzdluxfen17inw6sk5myn4u05hev6k97i9neuur1ncb5k78y1k057mgg2dtwsdisujup9x8zg7bptvyxkradhue2gw7c63s11ys8vjbboauv6l9i1zzgee5ajqkm2c81rm6gpeklz0akg5ls9987jjh8vl5weflltcekaqbgfa6ujtf8j2jsyjikzk8wajk4509m4lnnfc9p2d5eg9nqggzyyfeb6mi0oxc7tgsjquh26wje56hvbnemcaokmak',
                        code: 'uje5p8awxf3l7ey37emdi4mu2a5msb23dcvfuyvv1cymm9t03o',
                        secret: 'oevnmqn09dvjya0amzr914vo33toilrncr4xg2zknrlvw994r1wiebqkn4hrz05r6vn1s6xy99j1653xflxwr5bvds',
                        isMaster: false,
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
                        
                        id: 'e8388624-924e-41a9-b693-f6f41db097f0',
                        name: 'syplobdyls54t19560qwbtgk53sfhs8wupwigh8k4rdor0ocf5mkndcy6r68k7p829msedmewcujp842i18y1cvoa005hxuui8u711mn2fequdrwxv0qbttcb2kabv87o0aauanepsbrq1ezjs79ymi0r48o2f4ijxrkfkc7fzkczkfnbegevy8hnvusla8ai6wbc7b11fxnxl1yr6bw50r0x0qp49hvenb0uevhy5m0hhda61x0dg0aby9qzje',
                        code: 'h1ufl99qwrraio9ritee2ty9jzhcj4ti9hl3rqle748frb3awo',
                        secret: 'eikctt4qjz26146c50b5bz6hxu0tumainmocspg7t7mae160iz0hrendrq9e0ctz5wp9dl1ncv83dybzqlwg8m55mj',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('e8388624-924e-41a9-b693-f6f41db097f0');
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
                    id: '07b79388-a894-439f-9bf9-588356ecb524'
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
                    id: 'e8388624-924e-41a9-b693-f6f41db097f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('e8388624-924e-41a9-b693-f6f41db097f0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});