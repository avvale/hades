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
                name: '0vi1iwrosat0cpzhd210lxueknhf2nenemdlkwssflcgrbjie0ex1a1pfw1o35bcf6vj60uyj311jg0ejxrpeokxus3ukhs3s69qen57kp3ay3y9dgdtoj3k71n89rtl496iu3k1p5n7qkvuav4tizki9v1f2cuoas1fimh4rivr8fom61t41j7dzbnzudpytnw3se2fchrsnv1cfjx8kmya6jvgw2lz2ucgr31adf1golui3h1ghc1mdg48fej',
                code: 'yp2fy9ynocj69pp1l238t5smh870owq7be8xheavqq8hcoksmk',
                secret: '0p9f4bzqolwe6179grw3lt2dxb8i74ru9fodyik9g4x4q0s1r4eg0md6in0xvu4eit9aympnq8nuka4x479r8vzuac',
                isMaster: false,
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
                
                name: 'caop1k0sar8t113962z1mxw2aqeix65fn2nlce5bhtrd2x2c5rix7is2pzr05pfg8e1n9nl3l65jv2r4h0vqi33hm7v9oer10qocg5sojvxawgxdu88p0v6ak3p05j7ih74h85ukhlv4s6nqegntvpj2cjj6v6ulnsqt3meuxws3dhi3qfbnaon9cp30i2ay2b8p3pl16o6o9cn376ei9xgcs7irp70qc1oadew63rgfd2otulida3i6s68qbbg',
                code: 'jqtcy9i40u52e32ooi4e5s25m9no0ce0hrmhp1becg15dyr86p',
                secret: '3vk9ukjlvnufputp6cbqf2l2r2xinz2b4552z4vphmefz4hhzuzt2vowdcvyc0dchft15nwex9kmpgmyjk790tvap1',
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: null,
                code: '62nnrej4vb68pkgduod4wdd9i3qc8okxi2asg3b50boyolyj9h',
                secret: 'hgv91jpfjulaoa5mu3owlqb7fmaa39wlpl3czn76s0sn7w3o0sp53gldxknl0vxduh9fe219y4wlw1b6fb7j1kuq4w',
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                
                code: 'eaxrd50unwo8gwalixiy3j3beg21j4e87dg6dgxsyqbhr17j11',
                secret: 'fskl3kqwqogs4qobobif61hyqdo3byvm679yixwkja0i1ecyrl1z6zqj3a4wmqliy8nw43z7sbvgfo8laeosx4pffc',
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: 'ner4voeakgu74gszqufd59h5zqask1qxytg4w39vht9je60hq3qe4yz5uh9g7vrvgzet0n9vgb61bvrxqoanpa8on0uzwok2bp8ky27xfpq4z08d73frj4wt25sir9rnjlcjbgff2viy8uv3jabkhf3q03c6t0hkuikdft288a0byzmeqqj3qlzksdigxlfhiwu8tgua26pga3hg79jxz4thwk83kyvk7ldurknu4xvxj1ae7n3w3ouu9yrll0c',
                code: null,
                secret: 'p6sm1e3q23f89rnnu3hgg4d1knybqlig8k6ak7ehakusf8swthm7ipm0e0pmw3kwmh5oppzyv5qe09otpzndy37sz9',
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: '6sa1s5d8iuba1erx8xger4xamx4abp8ke0g2phwkge80w82r2ysa2xqt62q12i16tbu9rdkoejvf1nv2c75qxy00pfh3lj6g6uzdr6kmkr72twk5rk8vsa1xnmgucqw7fsfk4vlsn4v6lnan7lav2akbu44pbp05provb93jjs3y2hkac1118fh3a1f4dflemfru5jkwhhjuuqg895xrhgmqhgaup4s5rzlacbvbkbazbzziv83k1zccpdlllrf',
                
                secret: '75nir9ei4arlq4t2qt4yyk3t8rz6i5ohk5w28sedp1jyuxk7o3kko2k4otq6vppvhpgk841s6qcz0ztdkzy3nv50eb',
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: 'e811xvbqmfcknmfhmjsvxqnrae447olchpoa5dkfruij8zh6w541lf6r7xdopn2jey91pz1hoo9cnf2luuqe0as2gxnndipdvshhzpo3auigxmr8rh5wkapl4sdynkd4yf89fa9dadjp2uec76lnjmhkrzphkdygrbq9bzmjk523hc7357rdethf2oyx0jy8qkxuy3sub19jnwkt994x5e6dkncuokh3k6k2ycge819v9y3syup1dw5za5kx3mn',
                code: 'tv9l59vpdfkpnit849avk5peyiskd0ae1xz94g5ywtoawlwuu1',
                secret: null,
                isMaster: true,
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: 'ctaqcq779c5wxm9xnv70421d9w0df2nqwyseqhtxvyxfygsg1sqe7xujt0513b0qtyyyvwlio9xrsv171by6mhykfecwe5cxcvuw36owxop88ttmjpn50agjq92ajmrv5k1fzxozevg38ytu0nxvq2dfp0ymxrhcoi5ckcy6xnl0eepi496imn3umo1yjnffhlhz2s8euqm9kifdx6okd5qacnnf6civ40l4m3tfvg5ozzl60rj3w4tnhi6ibay',
                code: 'mesdm5g6ss1jxtj3q3cnmkjhqlu2kuvoi5tijiynnp1dbgxlei',
                
                isMaster: false,
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: 'uvyjakvy7wmd4peckp94nqohgzmzngni6lxt3ebeqqisfsduwte2dxd2kixzha6whoelwplr1ymbc3fmltyh9iiiysii1yrs9u7xdmeo3zfcl54l7hf750q9spj8vu83953cu4pmfjpro8eemo22sqof73beqkevsz260st6ifn090aaimz4jfli76wd2auowaq9wto4wif740rar5y5hlf6a6hchgdegkp6jyibh74qlexfyvj8t1n5tadjqpi',
                code: 'qvey440u4k2ftwkyp2zb6iuhe7vt2jj400qs2qwxknecjbjm7d',
                secret: 'm9axrn0zo2ivp03tqbz1v8wpfncspt49kcxni7zx7fd6y9w43tskb6z86dge1c5878r6it39gso8ks0jiidpfa1lhv',
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: 'chftxarcshxavjmuwwkwhqu3sg78hdfsoer175wbp1yeq7i4i812xxyrrkd1fjm6i1l3pj5bceaow8ok83ed0p8yaewhwppzlxxmtiqhu306zyv8ir72f9taoi9zgcvbwoql4vwlp03hot4jqj7hkkqakcclxg8p3vldalx2y6qile3rpi28nr8hgv4affrmljp07x3i4z0pldy9myh5ian4b1553osarz4xj05kebyfk4trqmnq2sd3e50r9g6',
                code: 'ub33cnpl3lxtvov7u31uw4ywyalaqpntnedzmqm5do7qc7dsk0',
                secret: 'h1xmedqkava58c4sbr1g0rkdt49gzeyjgyb33gbmz584yl49gskfll5tog56rq4s7jdh0012zaxo5x5c9fp3zvrpw4',
                
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
                id: '1gyls63hruuzbg2fhyc2psikjpu9i8feq2d58',
                name: '1c0q9mdp0aq8a9xf1r4gxo1e6rzq3u9zh9sp2qju2n1osegpb6346ilxp2tga946osevpz2bzsgbaadzqi45hb4f7nwht5wm7kcecs4rodgy01rd9p2ougow1l9ww1apnn1kiwyakbvijbr1jtkay1ebga9z19r59oin4t0c6gaowvhos5ugsgk50fn9rlw1m023b3cxmuv59ycw8ej3rowsnq3gd1jub5iaycrxa1eb3k1espobhvibm5ggh8u',
                code: 'ej55xx494kmz7c0vy2d5cz2uinnttzfvmcwul55ekubpahtn8a',
                secret: '8sz29op7oakl2aqznyn03033ry0tr3xklrgv6zl56tx823d9tw40u1p5k3teo6m5s5g4wfec25d9gqfygme2q3p24e',
                isMaster: true,
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: 'p7i6nujuvhujhe7mjsk3nflee168w59isdgiyc8vvwhgqwvvvp1ncyon00yl1kecnb06pis9wf2oftc9uqo9b2r5oq8v1a6z6i04lvsjvly4y1efnc2jba47133js37cnqkkos1h874yzwfbzcggmm7hcyt4vaaw6z49ddsi7ok37jggpmzwmw2knrvuo039aq7m094fj4f669rtlk3qg7vuez80u65y9mg7c8bvxs5phww32nh0pbed0ralmmwh',
                code: 'z8ymyg2loeswozztf951pr5mbm05qsxkgq7c56yk43ga4icl84',
                secret: '5jxalugtk8gj8kzf8h1s2h0qjbqfp26k3hbjt7p7yta8vek8zltts9lhhrn5sii9v0zfacvsydrc42tlfvn6yhpeg8',
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: 'mdfnajy3ws9h1sqsjnktcu5wuoj6dw4bt2d8azcm4kqbsg4ls1h423ly5gf43ieschh94kfxnup8ozgp8yesuqn413f0s2t98e11y90j98qhwqa8uen7xkmp9ipe4ggxh6jooheki4dy4pqsf7k5o5rhji6888aehjkwyqntrk9j8tspylemefd01ekztiyy523dc90zfpggdeqtuikx8ikd9c4x4omlu6rkh8c76ovsjf7ehuqkz5sdtxj2kqm',
                code: 'djv3tzskgugvbta6n4vn5pso0vhvrgjd9ok2f2zlorr12052i44',
                secret: 'txhu1lwyar46ic5v74715axt3dza2ptt2ny7ns1gylbfvfbsb7ajewxochucmu4w7lnoxfnh460of6gg7v6rp3uf2z',
                isMaster: true,
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: 'famcc33hngwf1refzk1gmr421kw300o2bi1inthecwpi5qn0n3d2masac3hh3botc3sw6qgsyq8xl25dsktz69jcf6rw3eeyrdxafrvb2a1gcw3cvjyhrv4ax09jiytfbayez8u2ybvhwyckxza7cj06u38jtmet65i4t4rvip91633iayj43yrwd4gp3qpc5xy0ssqfpdavyk5z3wztc7yybu3qkmc1oeczjrr577i0046izl9hzr7jfym0hht',
                code: 'cuax5ncotkxmreanw82xhp6mt3z1zvvlxkjv3unycbm3u5jvbu',
                secret: '982kqhs2glq8ynyvgct2srtauo2etfboohvzxnz83htnoezicr95ihalr2pygvb8lhth3b24h8porw74ql6k4kqhek7',
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: 'jzkul2xjkekt0g71ic9d5em793j3elgk4yteyo0l6pt9ua9nl7aa6p2p454h7egfx4x10we5boy6co0dxsedqy4gd8st79w1in2lhz8wmu142e85x0nxzzgu6x2p29n9c07zpszy744983j9dp5bcan9syjtr8mmvl9nzlqg3qsfc9fkbtjjc4t77eguvt79afqk18i0vmnwihohmjpp8m1d5xclbqcu8svfvo8a153bi9oxg3pgz968egxfza8',
                code: 'lx4g4fypla04mifvrg8q4hx9n491muoxwh86hgzmu913ylrnbf',
                secret: 'w3u5lobhudjlsfhff0m9v1ibhagphjelpmw2r0qjkmf56v7oghvraj79irgill0feu7uxa473vehwoz5slx219w5ow',
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
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: 'd6yfjif569zi0le6ei9ox8tbx3bflpc7m48z1uhj9lk2q1urnca66rxm4bdtaxvgms0a45sk5u7am3rdafzstoj9bngm5nfxb5ohsev3s4omklgab9dwpq0f0xqti1h1qcvl7drp1i9b745ijju3nmm5rq91k06pi39y5zxmgaj4w5vd26hg8vw3jjs6799y36my1m44l5c9wf9hmubusy1f87q87ajixg0dobbapdczr0b0h449tyi9nd51f3d',
                code: 'oauxr0kvpffyk8hdgeoluo7g3bl9gk5da7zcj50czgi2kk719o',
                secret: '1d8k5gqmf2np0hma6ccf0pqc012d3lp7fst1fwdkchrb0jb50vkk9w4dr25vru64qwgo0bu82lhcpzjazxkz00i63x',
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
                        id: 'fe79a1c1-0aca-44f7-aa5a-f3f4ea192806'
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
                        id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1900ed4a-e2b0-494d-8063-a6e14333bfe0'));
    });

    test(`/REST:GET o-auth/application/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/284ae7b5-a5f9-4234-9647-a26eb4e17b50')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/application/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/application/1900ed4a-e2b0-494d-8063-a6e14333bfe0')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1900ed4a-e2b0-494d-8063-a6e14333bfe0'));
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
                
                id: '6ddf4975-036f-4b46-af7a-c27c6a01c22e',
                name: 'mn60gmgew00hzbj0tqj65i1ylzxwhrd0pgrw9sawwoh92m8wesbtzfnsfq1zx3pkwl0gzpwa7hweflhf7mof4kysvtzbwxzamhevygblgtlgr6hwecq6f4mvaelf0r2okwi2piaipv04c37bqzyeqn962g1p15uahocun9k01ty3te60dae7w5cokhxhz4fufazf35rmpmczoj8wq30kzn0z3bzfapjwgnds2za1dne820isrqizpm3c7wl0csn',
                code: 'zwcuywk8htv11b36fqrz6ea8yhelrz9y3b97ueiu4v4pqdfq69',
                secret: 'uouhwb5p96drs9lz003f9x3klq32zzvlpmgbwp2t6y2m4xm0rfn1wo3zhyy5o9t4iahiz3lqokhnbohxhjrqwhwwgj',
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
                
                id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                name: '8n013zq7wwu4206i2skfvfruyvv20kzj8iiyejxd9k8c83x7em29a225qjbjk1ajkaw54m3ejxosglpf40xua2ysflj62omoqjm61ye4gf41jkocjaap5sjvdjjbsd37aizyt1ecvgm6xc5719nxvkqq87m7u8sbevfc94yeavr8l84u36kd7veeesabsgsklnyww61oaq41h5mwxwcsgdxb1vfanyo1w34vfdgaqfkwj719pmu9s8y6779jlrc',
                code: 'gayhwc076guhmijqxr9jjsbxf981drxfxvxso1mvly21576q2w',
                secret: 'o266zn4igk7ssky2tolk9ye2k6tvre1ll20m0v4jbu73ydqfiwrifj84wga79xllw0mqmuvv0i3kxk4zmp1rxdfs0b',
                isMaster: true,
                clientIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1900ed4a-e2b0-494d-8063-a6e14333bfe0'));
    });

    test(`/REST:DELETE o-auth/application/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/e0271b1f-fbd9-4ca6-bcbe-199d59d2641d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/application/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/application/1900ed4a-e2b0-494d-8063-a6e14333bfe0')
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
                        id: 'f464de76-ccce-425d-8032-c5588809fcb0',
                        name: '68zv1airjzjebvu4g45mq7ccm1nkt6yh2wr7d00n2cqe80rko0bdwamb6spk842lrwn7lw2ok1rpkcpdethmulu09xtebyjayzcd4z34s89paz15i5xwfm6hto5ueju4nk2apoia2utm2mfee386r7piw4btdkcsr3yb1on7ygc53mcyizprkbgx4maf5on9t6zy0rnyf94paxghtsd22nlsoatyv7emmdg5tw0f9an6h8zbr3qt7dbba87qvta',
                        code: 'ajhrhnjifmq2dl0kqrt0imaffl8cppffc5sodkqme5n1dmbej0',
                        secret: '1s44bai225ddtrt0wh46ybr4caoycghwaus3uoupotirtwlme6qyq8h4hgyg6sw4mpr88g5iilkk890lttodmmjed4',
                        isMaster: true,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateApplication).toHaveProperty('id', 'f464de76-ccce-425d-8032-c5588809fcb0');
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
                            id: 'f151eee2-f030-4c14-b5db-c300a17aa955'
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
                            id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplication.id).toStrictEqual('1900ed4a-e2b0-494d-8063-a6e14333bfe0');
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
                    id: '3728b7c2-27ef-4ba6-b901-47a6bec5042b'
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
                    id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindApplicationById.id).toStrictEqual('1900ed4a-e2b0-494d-8063-a6e14333bfe0');
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
                        
                        id: 'a6067dd6-e3d1-4667-8b64-0a5f5e727294',
                        name: 'm9nqzebda2rugxw2p01rcdkpqfpxqm0arfnebhdihf652jwi39rrhurfslavr09e7c5l2ouhcepwfx01dlgd7pm1hqcmlg0ezrckyesgwupgshq4n6g3iknaolsxfwo82pxrhlqtgoo1sd2sewb7lf7rygmn8tngptjkdaw023rg73iewwt1lsbab23498tyo20r3bsly65df021l851i4lqx36osqqczmxi52qrnzn6p7wlpw9n8xhlgmphify',
                        code: '2on3a9wmq56igvdox1ofgi52szp2wqznu3d0k7zk0pwvy7xx7o',
                        secret: 'bk88j87ubovlpx9eag20v7ywxppniv3a174ack6iv4fqzhh0ncwing6lgsi90l2yvtpfpgfjzo6jlxqvsd6zdsscew',
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
                        
                        id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0',
                        name: 'dinmt5sm77ot891ij4kxzw1i3ekbq9cbkhwq5ks074npja52sg8n5zh7x6hgamxpi1cwpc8vnxfa50fc5duz08vexs9gomcw2dkqbxb7n63a5kyiasva8fc7y2fu67kk43om4kja88vgpqt5hzaxs2blmq4r5j1vop9vx2n90sehxotkatyu7vxu8xke1w1jl7yqmkargjbcmbmmi6n17hzz6msd13xjl8byg981etv3x0c59r4q0g872llppmw',
                        code: '00belq9u5zoigx5rk8jcup2w3rhaw0v3fzi2h7r3bdx638pz73',
                        secret: '4nufksxjh2xzw26zsghrf96xmkvbxd4heyvrvp7525i20ctf5xf7oajuoooesm1vmfrlpf7uj6sdy3um7fhxgfzhry',
                        isMaster: false,
                        clientIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateApplication.id).toStrictEqual('1900ed4a-e2b0-494d-8063-a6e14333bfe0');
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
                    id: 'bc9dc3a9-eea4-45c2-a674-ae1acbde9125'
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
                    id: '1900ed4a-e2b0-494d-8063-a6e14333bfe0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteApplicationById.id).toStrictEqual('1900ed4a-e2b0-494d-8063-a6e14333bfe0');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});