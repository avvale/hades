import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '@hades/iam/tenant/domain/tenant.repository';
import { MockTenantRepository } from '@hades/iam/tenant/infrastructure/mock/mock-tenant.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: MockTenantRepository;
    let testJwt: string;

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
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    TestingJwtService,
                ]
            })
            .overrideProvider(ITenantRepository)
            .useClass(MockTenantRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTenantRepository>module.get<ITenantRepository>(ITenantRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/tenant - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'c7uk0r4lwd5uiirdvzzmi3dc9d68rv76px7ymanyf2j4eqlb8vwa73nnmur9j2zg8rwyei4xvx7lk3p1mby5110sj9905xzzpl46en1t4avuqsqtjlylqbfxpsu9n28x3adxm35o35n6zmeh3a579efs2x5b327bkoylxad500exj7644tpvxir1e81wmwq2d187s1nhd8qz9g79pmlj268v01e0alp66olx8gvy249yt71jp4kj70ghk1ntm6v',
                code: 'ub9mhvq3uyd4lz3fjfpaz2aubhlgyf1dz6yo8jlvm0o6w7rayg',
                logo: 'zb34z1byo6uwm52c3smvlgyo0tvuizh7093e1g7f2qi56pvoblu6tm5qu5cpiwnjf38uivtovvwbmk7vrvwrd1s3dz13f9u0fwi6kpxp24ffzti9anckgjefn539afcya6see59k41kflcm0eytm141922ec92cij4gevp9g6hue76fu2sbz0ztxavpzlzucel2mkplie2ziyauh624ew795a2yzifo4qholn2qxx4a3ffx1im52560y3yd9n15',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: null,
                code: 'npgk8yt92xd13d9h8fokv2mtlj0gnpxegqf0c1927ghknm8iaj',
                logo: '266yay7tilzzul737c01vmyzncurp96twztvkqx7fmknylr9f4hwh0d1j8uaosibo3edqlxybia9k16adrzpbma8zz8r3mnb5f59yqke9hf8drx38ecprh86xtrz0bhq04a7fs0on8mom3pkkf37zfuajsuvd5gcnl0z917fr3lmh4umdlgh8xqj9jc9ayt9cn16ge31rdkseei9lyz0dgds8wljz6pooez0b22nbs3ofr3xs84ekadc84q78v3',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: '522dtpbutksiet621nm181gz84w5pun5wwqd8jlc8pt9t4mzlihbrslmfu6087glhg9961gzg8euclshzldan9aapagvlu2n83kq04gn41y0ck1vl51qlb9e835ulrde00fnj4ji2c6c8d217mmwxd0nw3wayne91jrvq70tk2wfptp9qclu48p06emk941zlzb82d487hos9ptc4a4zpaksi74wg59y04s9u9s3thvubc3zamg1psnbrf12276',
                code: null,
                logo: 'qpily2myzf6b8hknie8081t2vjoqmh6iue2liswze13pzvuof1218o1o94wbu0qkhe61mpwyp2v5pjebmq51m78l9l2v7r072v1oss3xuczq2xwa4w5u4c2sqzhp83isp5rdos3xjmnd6t06w7d0ljgajqrusim7n4bprhldmokundv5mjp1ri06j1kks3590ojo4mcison3mklxc6zftl3yg0oxrqushbpw99cu2olwjh3mwjpcxkqhyn2iffk',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: 'k8mxpvdxb2pvjqawv0pztd0vpzao5jci8zlz2acyay2y9o4wrj7ekaectar50pg3gyb87mzi6hp9twyvwpj4beujgnjdxtx0oibxr1v274zrf8u5ukh8rl3j5i36dawu6muexuqvnvz0l0g7gd7d7zvi72wf5vm3t52sryrh63omjf0fbyhsomxjek13di8vfk8r1fzzw47ddf8ny2vbiqol594lb1c52efnqnpvfmsecpksjq72h628ksktjum',
                code: 'brrxzvnbxj33yy8uf4b9ofuzs3jpnhyftubo2naekjnir8xps7',
                logo: 's8yb7a4qlr4fzk3y16ha921309ny66aq9wlusq8tx8rk4f31r07su64t9x3j8c264eq9jd66ily71u6nnvlls0saj3ynbcd4j6retu9ywvznb5auv4v0pfw7prm1tlc1u1hb9rkn8drzrnbn1ton94wzctiughlph3n1na8v72s9sib874i0be5rawunvvfptw7phxb9im743lin8znx6qkzvap9ti4qt5hiosso43gxjsqdz1hgzozkjzobwkp',
                isActive: null,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: 'yant61vqhauictbd5lx8wts1zhrun907zfrahv5tt8ki9x1quhtkodic5b8n5af3r01fpkvnltk5586hduabqzcl1w6wen23uccumflyen7pg5nua7mew4u8spkuhwrvkacyh6xtvtmixwghab7bm4pvn8ly2i3gi6sleonemegjz48fg5p3udpa2i5f6ipyq0jam6u6zoe0a7bx66qdo12vkhzka4d3yrcufx3wk9k0jr5ad94zdbt8mbe2orm',
                code: 'g7xu75dcapmw7q8hcqcyqda8r3jdc54nane39iijmdaddy2iy3',
                logo: 'jlt3rgdk9mxto5m8l11dv6z12468hf8zf8tk1dtkrpyl90kqiouq7vagi499x4e031sufzkk0bzmqv4uwykncev3ckj5eda6t7hgtznz6e7n5ivp34wubayeq0buvnawi5kgiklqcf05nbwa5s11a425v6rhq5ls9heq77rl1h82m50raed3sdgrwwcocrq4ht9b0j0zo9d96sm7x1r0i6lp5w7jmz810x9dapoyn19ljyq2qcbp1ksuej0eaun',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                code: '7wfjvblwf0eytu4te4pcmiwmzulpxlzuvfw8zuibdql1ereyu8',
                logo: '6kr1rbkkzc81rr5jedvox10ubhmzc38k6m1sjd2mal9ldy0wpslzjshaiqqocq7e4nfypgmjuaj3blhmv717tv6uj6yn0yu8qhm9jg6gzvas4lwlw2f0l85thezz9sz8centpx3hu13d2klu4b9rkdulkgxzlb8py57wvbhp9fmebrf8548cs2091w1meuvd3fkc49gpb5n41c5zjoiniscld0wj3fhoode5yhhmqa5p64b5jansoczkh388rq6',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: 'f9fhmnn0qh457ug58641mwyvsopbbqwctewbjsajjy0cj0iw7wwme0ur1g00pmndssd963lz5v1v6bg7lkiftvpu1m2bhixz7wbyms0kzludlulp90b7lkbtsq44o0dfa0cd4xf30ybw58uydkdj28bnej1z54kzgtu2wzm4uz2f0nb6tn8mmi6lz5pvyp9zfclltju72xiuby5218sgldg1qk3cjpspsiwfamiab903ngrd6135m0z47xqmlwh',
                logo: 'n0x8p4bn64b2rgylx71relaefv1rplzjb1td8t3v36h9q3pn3capzyr296p59hxhmv7shn2fwkattisr6qt8yl1aps5xqbo719e6qjvrbyrb0lzol0ei32u3nrkoy6qdux1x9mckjcc6akt9enoxangmvbn8zjo55vgxy6ixk9mykz04buqo7hoe9bwrlto9uz8x4ik6frners07omuyvr0emhpol2r8lgx5sy3kfppdxzupqva6etpu9qx7iay',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: 'y2hpmws8bu5tk16nyn9ejon35mq4ujaa0ei71jwttr5472qqp3z056prkfpwgj8s1niyydvzykj8nkmxeagysapnbx1mua3a7lft5wishz7wraspbktrhx6ooliclgpo8r5veb86tkapr5krexi6mul21wkozwzxq9lgcuz7esk6qgoa5tr9lihewqp63ef2yxa95kuq0hrdpwoux48k6gq8fjeil5hfrt9jcjtl74e9pqmvrvhjxvj5pdb0n37',
                code: 'ivswbpf7xvuylkso63iwbhode6jewgew5ndp6bkunb15ckhkjf',
                logo: 'nac5v6zxa5ayah4cy0pgnriihhjv7km8eyz0mbuej31lwxz2t8tgyjcnitcbyiiz0za7denul556ib8ac3xi88cyrpreub4kk7eqq6v0v2lt5sp97v9hg1arbxn11spsj6on8le2huzbr0zra0j40aim7h6p6xkppekvsynhdc3gx3malhj9ktlxu2mh8nua514uusgj0hia1417dfc9hypd26xnkt5bjk7fbu5qmjl5wf7mf7gfewcmdcrvi1o',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c5clq8f6m65wo6568cqfp1lpoar5pspizkih4',
                name: 'i26s1c84srronl1rmcxjy49xd2rfptsg6czthj0cntgaaquxza239s2kpgrvqosymmrq13y1blm709ygzdtrntxwo7jitlgzip64bbf8jo53n840dnmdnnbcardqlz4goobfw4kdi9yhrhkbnoizxiw8obevh6rfk5ad9mt0raqj4m5j8b9514ns85jdqgtoajertxakwyj9rldvc0jfw57qrjqhuqobp3uvi4zgpvqyhatxmlu9eusyasxlckg',
                code: 'csgq4x0i37nsbcmdwprwwdqmdtp0ha32afdvinxuom89jdbtvk',
                logo: 'f2n5d80xrnphnsxn44wcyq1l5cmxbtxyfjd32o47sl4awv0ta7vwni2eqr2ku7gmuw79wxpvu7kc7q1qp0r58uqpw9n6d2h1xfr0243tevb9spersosmjvffr5zy8iur1xfo66b5g09ayvthn246z2xro0pnxgazaq7w6ka2xy0nimlawjmi53hgnmt1b4w1zw4ug3beiuk1p4j9r1iahhbvz5h54viaiu8a0btv5ot0ulcyxz90yjcw21naei8',
                isActive: true,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: '5e99vxxzepj25w89jccxb9nufbvvo7jndqcnuocw5fkrcgz0k2biumcy52zwij6gg31ldviml7x6xi831pybb3g200o63147vvwkpf94sd8ro6jrcoxdkiriruqhmnr3hfzzvhonzzx8bo01qco9kyrgtxfgvcadytsmpqorox82hpxoju3e72qspnv58cexykrug3w2512lbpbjicu2f5ewdgn8rfi8evtlo6l91n209uyegrypvuz7i8wqc075',
                code: '0rtd2606nqducj224civj2dwtsalr59anpjm8eoj7ekigmml09',
                logo: 'pmx8fe8m2dmcjpuoc12bqua1c92q6ouq9hpyb3p8ppbmwerwi1p54upw392w6u642pvfkwtvh2e45xp934zxsb2k3fmb2b6ctpm7hbne4c256hrm0i0g19sxbgiqyia4t4739tmjxbp5q8jdfk4xfkofvo5tvb69vvarcysnba7204lq6j51sk9ppjxq7c6s77yhfsyob1lnkm2ghhq81ty8onbj0taxb33tg7i1jeuncikjzdvanf322ynfetg',
                isActive: true,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: 'uarnsy2j0a6x3793lsm2p0nb72nyl6kctho1mjlrl79vifxjcddrypw0an71eth5swls6f23f9zz8uqvs3ajbjpn4ktcvu6qb4n0xp7kva755ar44swqen5mcvdaugwn0fl27ffzag0levr5iqkwv7p1eoz97gdd00e0v4dauz0bgn441c9811d7xy7svm9hn9g2326zopevb37w6gh2ga90glplbkab6uzs6ogosick51r4mkz0yo4cht2tqsl',
                code: 'mo8v5q8e78yuae5c6ouf3wc49cx5uuy4yb3r1d2lrannzfaim0h',
                logo: '7c2bzscmsz83dlnln5j2k679yn6bsqc9o3us9ecur1qw95p749kx29ts9x494d1irpd8nnb0t57mma8fc56hoogjhg5of3grpqzbnsshq55dv8um95xp4fd7fkegbqmcrioozjcweivunw61dirwe60008dlfsfj5p4pmw57u52ym5lpysa1m3aej0zhon4iixvif8yx9sfjj5hd67fpmkubhdpxuih3ujo4vpljufjxhv3ntx4oavb7rwu1art',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: '4ekmfin74tpihnc49v73vid1sl7iyt2uet4pw2kh6qlxbvxn6m2xtj41lek9hbyvdqiayh79xzyreuyoit40dvdtzmiiiij26gba88e0ood3s0mfvpk8nc9fsqrc7ig3lphbonrbicsrmbillo4m2cwf117wedzq240sjrujhurt2mbe82p9i2ujsobjtlmopucvfvixlg054x42uaippndzqvffcdn9omx9f2tfuu5q6uybwhc3p5ujnfphb3w',
                code: 'cbfajp1w6m2otf6dryx4xh5er8rdce593myzqeg6fpyyvp728u',
                logo: '0orbaoylrrfonghzepnrqtt6889ke6ob7bbjvodjfyyrzdswfwov21pvjq0qfeglc9izh56codjyccf7r1uotofswkcy7bw9be11mp5coqe3uz5rqbtwpza09188fm8thdgkygy2fstc9wb7rrpiz4vcqnioh1dcmhiu2mxiknatpry25u1jd2n77dvm7dzqea2ck14rx8nin1dvbqhvhbwy2ptw083ag33l91ony64myqektj9gk37s4sbuoi7m',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: '7zclr3xbawjai56tqh0t5h158htigrnyj1kas8tfysipqaammpv6lkmnlo55eqnajlb7f418evk5ctpwe4w3kzqwp5hppk3fn30nk7dxzy1xflbqgg9n5mdela0yruki42z07q1wgb191eqhf13n8cknqfw5pi0idfakhceddeqti4q06tnjugu2dfsfmdf8jdcbh847p5urzcstnyo6tb4mdtxfozy0ttdvoe0is8tb1nayatnyhrbw2dxubxq',
                code: 'rhn3i2i1ae5ey4f6gmzcuy6k4f9n649v4qsgjlkx03opwwtj9w',
                logo: '8k95dvaivqw9kp3laiw6nkuhgamdx5a8ssr9apstf3iz9sn5hafm0fi9c8694wv6cu67l8x1n7c9b6r8omdre6af3oa43mpws1uhbli9nw8nqmxxvlj2oeb3ldes5b5hbk5q7fp9unp4xx52p5g68awvwsku6pde505jx2u0xyhkc47or76o2i35ssrhrcpeja4rx4gm3mbkdtlaoi1b70npvg7l6h1l64vi6b60w0q7iqtw34izcq0yhhxrl18',
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: 'jnh74epc6zq9gwlvnn4orjk0pg04cgmo3wbovu0hotms4rj3raixeaoa38730lwlnuud8a44q84ncwgat3h6z7bs1gd2l2con2odcjdj89l1noq05karqbppn4f9v4tvdawhbe8990f461g2mkw7oljtipldg4616nd6eljo209lkojt80yv7ueztumenuzlw8axf5145fuazssn8urwvjtddr6x6p66yuxhufhezi5d8m9cn66hfq39hptql8p',
                code: '86ei1nbqfkco71tqzy9stxvmzgfx1fiknp8txx32qkogtuks6i',
                logo: 'vbmjwdb82oetehcpgf4t22w7jt57gtlkzcbqevppa2afrrmft044fsnmnb4dj4psu0kur2g8sq1lyhrtplbcrl3x5m6rnfuybjopvkx9f19f3b4kcuwcq36exwi4e7xd3sliwt46s8ts9an6te37r40bfpt36ac5ne8nynp34stis79neeyy4clwxbmyrhfo4an22u0n01qd9vkgxen6kxwt8i1k674xx8xx6tpohs2mxtv9r5demxife1aa1nd',
                isActive: false,
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
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'ad274703-252c-416c-9335-d30909067ceb'
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '1a26111a-2f2d-4fe5-b440-0fa68de72471'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1a26111a-2f2d-4fe5-b440-0fa68de72471'));
    });

    test(`/REST:GET iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/439741ff-b793-4ce4-80e1-e67f9bac869a')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/1a26111a-2f2d-4fe5-b440-0fa68de72471')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1a26111a-2f2d-4fe5-b440-0fa68de72471'));
    });

    test(`/REST:GET iam/tenants`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/tenant - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a320edec-c015-46b6-b21c-386aa14dfb66',
                name: 'sru2huj3xshmlr84v6poonkdbnqg3rlnd8yxzqpkcohl0j93ec5cqpuiexnxqjek3chqxw7kw8bnm8jsu9osg3tgcfchj8my5rz7zne1tt54p9jr1q42tcpraa6p09029rajqgee5d52tvq3405ozzbobys2r18qy99k73tnzibw7qe959pgfnm6o0hs9nzhysyyfchvqaio6d5kjdwrg41ohsm0qr5nmvg4ewm4vsu3gcimc14td5x71t81ar0',
                code: 'm9ao8e0jyi9b2bl8zms8e2kfrql803p96ey6bm09hh6t9uzgmc',
                logo: 'h48dp1igowxs6q8d28y0uhsyy3l38ziohv4bec6se952rc0s1h4y54aci5w23k07aez6aiqbc7edofyi2yqtgmy2263pqhd21z934aa2umoc8zajv9blj0uhil8y7mqnkxi165y77wiuq4qzf7x91udx1xo3l9upib5kprqq188r1ppw7uikweowh06o2rslk815jchucig5mawh3i8blyi77uy49ye4screo5690ji550joejpl102grfbfh6k',
                isActive: true,
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
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                name: 's7cigv1513ww2uxa3o2y0yc28dqtchvavavm37niqgbsqjyerek5kfx7hws3yq3g8lqcnyd6c9aa0xm3hgrgfsrbuxyznpd4gfhwr6buhjl0vxwcfqbz27qksd2szp716k8801ac42u2m1mtulfhoxpeb7lklyg198j4hogpkb3lnssk6tm1ytcadplyt6v228caxtrc8fuvouesm08fd2hmbgg5cos9orbhuz4lxo1zn6383giqrax23rqr4yn',
                code: 'y9w59ez3bez5je85mir4fhrdzzqrilar5pgqp282s69d04sj9b',
                logo: 'd2zlvtia78zb83qwzsjhwx9ag9mywv4w2kticgfnv7pvvsokk6unu0n4eij4rqm1uovzuoxwcnwefsm5h0zr36cwmsxijsxckg8zb7xwdk7f2okqjvoghoudw3mezbekevfiwwy5fgsknw6b1eyixbnwu195z521lhj821z14gs9geq01mvjmf93faeb1yjt5i515p1g79eiwebg36mdi725ltcbq9019wh83eslnmgqv7fq9bq2h1d95b5q5f3',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1a26111a-2f2d-4fe5-b440-0fa68de72471'));
    });

    test(`/REST:DELETE iam/tenant/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/8fb25f48-be50-4987-bd33-4d9b770262ae')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/tenant/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/1a26111a-2f2d-4fe5-b440-0fa68de72471')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b8e24635-ce10-4ae3-9556-132292606dd4',
                        name: 'b5s9nqwga93uf23e3zki6ws3tof92x2v7afmnyuqs5gg6of01lscf0bjemtsura9uu77b4q2iurt6qlcg30vajdcfz3yikcougkj0qvrivd056r36ys28uh81e0jmlglf3nqf9v7et4wkldvhx2cs903k9b2upzo82s5faaqjdkp0gv9wioxa5t226qp61fhwjigmstatffk10gwajssyowkfqqv0aztzw3frhndd1oka7ohkxhl6w2lcy0a8ka',
                        code: 'esbyardppp091y36n8yjeifme83k5lu34r6qd3y03bdmabxpoc',
                        logo: '2zkmpmh27z25h5wvaolmonn8rcvdtak3viyj6rhlrtd85c9yjysk2eekmz113eqp4zgld7ywzffj4k8r5qkanftuu5e1rv4x9tlt5q1fjct93l4pjbu3s5t39zmqul0sxei9bsr05bg3nsuxvvlct3e1kit3jz8xp51g6ejck2rrhh9gxg2emwaty8lrfo0fj1mhdpftrkc7nrd098k7jsc6jfhag47zqa1j5u7a1e7f0jo3f3jw5tdft7wf6n9',
                        isActive: true,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', 'b8e24635-ce10-4ae3-9556-132292606dd4');
            });
    });

    test(`/GraphQL iamPaginateTenants`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: '157d486c-e03a-4955-aa86-e7ffb71eaa78'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                            id: '1a26111a-2f2d-4fe5-b440-0fa68de72471'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenant.id).toStrictEqual('1a26111a-2f2d-4fe5-b440-0fa68de72471');
            });
    });

    test(`/GraphQL iamFindTenantById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '3b4c8f20-ef5f-479c-9db5-a15d23c38e13'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '1a26111a-2f2d-4fe5-b440-0fa68de72471'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('1a26111a-2f2d-4fe5-b440-0fa68de72471');
            });
    });

    test(`/GraphQL iamGetTenants`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '19979260-3335-43f8-a778-b1b118bd82a7',
                        name: '3ay8fbhoun61ra9yfs3ym16ntegm3e1likzwbodin11cro356vq63k6gh3hfqgyh0lrxebx0ib7mougbsx2gw03lup10f7m965pe784xkrejugcl2kfqt76njkutppimzbgcghyg9idg8q5dilzqdkn5n38bxw3r30t84agny8xlgc1i80ln1bpzt7b2kkb3gk7rljygibrr20pqm6e8c6pmlnualdzd8bh040q0ya9rszpyzgjqum3a8i4s5rr',
                        code: 'x5t5vb6vz70v267r6wf28gqpjtefrmq0ad8dxm09l5vmyjvgqf',
                        logo: 'b4d9ua7xs2iuj9jqk0semnigeh5wjg5iqio9siz7k6khc6gwhfcrzldimnbd2oze0rwrmk9tg75x2b7x7efoc8nz1c6qg7k3aiop4x1537mzn1jnlrg7t9bbqi3o7m4dmww8glt5wltwcgad8easipecvv58ekmwb70jx36trzyizkekcr7ibeu3jc50lznlv0p0rtay56luwcqy8bvcrec3kl5hih7qwd650cje4ssw2o4ajoa3ib8wc878za3',
                        isActive: true,
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                        id: '1a26111a-2f2d-4fe5-b440-0fa68de72471',
                        name: 'nvo77xupj2qgq8w1w06iisvoz864ee3qbprekppvl0bfr3ns5e6zzg11kihdtt5niensqr7m1kgq3r3gkv9hvo9ve58wftlm3kvgtrmzux6jdlrkn3tk3lfjrfbrd7hl0lgeb9mr3os9bcokx7igheovjrxzq65zvg82fm5fyt3ej6qe82sn5tj1n4i4v610qjfyfd4pmzs6oxm4egxzcr4e4tnd8jabic8v3i835uhy0o1bj8rrz6uql0puks8',
                        code: '1urpwc1whdtjxgks7r6wbwehr17ltmdktcalk1cwtgp1qhdga3',
                        logo: '9xto4gsr4xii23q38e7dl5xfl7lbjh9srjq48ynq2gpj0eopkffva2dlc6m37bt5wabcwij0wo75elgehl7dju30wbvtftrogdablncbocru0w4e1aiqx1afss299yhelfm6dsz1kww6rt18asi2ady7w04wa4jkren9hyprs3mdspp8myucticsw3boztogcowsv3q5vq85nxkxa7qo7x69rxxi6mkhsz9rlpe67k9enfu4k2z05yftk6ngfiv',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('1a26111a-2f2d-4fe5-b440-0fa68de72471');
            });
    });

    test(`/GraphQL iamDeleteTenantById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '74d981bd-be27-4811-be01-1fd8d0552a6e'
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
            .set('Authorization', `Bearer ${testJwt}`)
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
                    id: '1a26111a-2f2d-4fe5-b440-0fa68de72471'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('1a26111a-2f2d-4fe5-b440-0fa68de72471');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});