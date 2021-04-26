import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentLibraryRepository } from '@hades/admin/attachment-library/domain/attachment-library.repository';
import { MockAttachmentLibraryRepository } from '@hades/admin/attachment-library/infrastructure/mock/mock-attachment-library.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('attachment-library', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentLibraryRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
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
            .overrideProvider(IAttachmentLibraryRepository)
            .useClass(MockAttachmentLibraryRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentLibraryRepository>module.get<IAttachmentLibraryRepository>(IAttachmentLibraryRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/attachment-library - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                name: 'dkcjb0ibj3jf1yreds0atv225fzdy2nai7de5ctyw3o4iqd4026521dn5qtwdhtwdduil44s5gs8v8wibof9os7a2xr838zhsvfcqxdoz9bcy8bmt0mlc2uypm9s9eod0jiwajb1omy58loe5zs8bl1pcv5fk46donpset4ix3010t5nmlclq25tkcf7zt8vy2dm5u9yetnds8vl7lip1qc4ozsxyygp6l8wm47fdsgvxua7ney22eszzrjt1wu',
                pathname: 'vp0zeqwd2e3czbr9rxxgyht5fvsg1ve1ahkam0ply3jng9s84osi0feaz4d0tfcswf1cqugxsax6znukh2jzk2rffaq7kl0f64ue60csnjtnw7195egdhezihe20q1w00itz39m0xci0d5i3xpd62op0851bcqymkd720vbuyxcz6qoxah8zsz0vzsl5vug07ksxd5ij75uc9qvjnaqbz4jd64cp764lkqkme9276l7ybgcfl8infaj9atjxlz28cl9fw34soz1c63zh3ibxoahkw27yyo6r1bs9l4qi94don069an3x6bsg0ef8vlzbq3scvd4ml1s36rw7ih3k7ba88zylqntixi7bzz071o6bo8pmvnpq87sxp6ok333bmzcufaoj0wqb2uu77m0g34377umfnrknisks1bapw8hqbutnawl562oejkoo8rgo1khljdkuj95r3top73hv4frf2yxjz1udwd59wudxf6227fjld996eeb21gdgvtkmq90oa9lgypntclnlwragc4t387ux1vnjl1ib9zqtspf44rkl62mngwik16or57h7jz6b7qp7zbpl8v0uzgpg9qbg0wecf867jsql65nhnxtxnqft16rw6idhv7sqif8ab35hepg105r3r6n49e2i4jwkiarz2194aqy4fugeoska9ot7g3bpo27cyxg3oss9wfhuody4dr940gpll9cwrppuphialwqv50k5kuifnz22d13xwa0svo70es97afj0m7m2do71k77aoikfwshwj2zgm7n3hw6fdzs7h1gw1w0fwy8vhle9d11nxahd5z2itfbxilxnf2ofu4t1ol5g48u4wcs7f3od6fr20nbmpbmrfi6cpqelkl7ftzi5axgoklofmgoa8d8jvu3t6iflele56po5crfaqvb6rhp3n59k64n67yktnaibdqo9ejf4urr7pwgv78ppubsf8qz8rxrhctxzdoefg4c2zrdta07maa0thtc5uoaidls4s0vu',
                filename: 'iyxn8zaowmeylrhsnzv55u5j1la6lybrt0c4r97ghq3y5jcka8tsdz2usx2eijbewjztlaykv2skmthpbnkrc9rp2wnga0qlpu85a6qz4ztm2hixjelev7929n4j7uqlp12tsjy2qvzkiske5mmkh3vm3emy61ezprc3cbgbc35nxa9c2spnxiphvuema6m1l1y4uzmylr8aqnbq070z3m12m3bk1hwxpnlgg520c2px6ta137689echotx48go',
                url: '7u8o9dy4thaq8duz97ik6nond1s8ifg7r8m27g7oxcx580axb9n3ywyxqwbz722ekvb33b9x1f2w5sh76f9y8o8irxfyppn3933cqw2de7vv1gxi14bvyehukd0i6yvsv055klme5c7kn2nkxy7x00nu7whe4dgdnxieeqntyv0jwag7nllzqnw9r0ua4dhrw1dwlje49ccb9z0vlpr5zorhpkx2442s38ddiutf91uxkze4oerycnx3cg9910mp8ys7p4ddicu05j4hwjfpcwj7ovyuq30w0vr2sqkxjqxjlwvt44pp7p5vw0c5eabkqyhtcfdaihidbsqpj8wzuxfo1ssw9ts1c9nffzvdjoq0paywhxngovechu87n0e7jwqgbk7q3ir8bq2tvsbtb30vj8mht3hs6m7lo5qmv01m9xl1lgfwhjfk3oimz4hcg7o8qczmen0tu1mdj89k5rzopxawg2bc3v8te4ek1zijtj9vunk7oggyn1roeppaebe3p8uzfh785dh23d03dwwowbl9eoniifwwk1u9z86hrxranidhmuak5jgysng4a3pwm150sh2rmxuzz27ozvbt9mrz55zyfiq81dam2nh9tr5v0ycjxf9n9om6m3eh6oxohp1h05om5ayz4rokf8y2gjlcslrxorhkerly6xj6vy3l4tfczah21z5o3tex55n8cpgysvf529k50hva20uyfceta6d7t0zd8cu2yqvo6dw7qcwnj4qvnhr92c2ugd5v4wpdktt5a6ow6nk4dcx96mx3jzr019i5qpoponai9iv4nz4t1oygvmu30ucj8y1wi7xzjj3dhut8tcw25u7ofp9hdyj2ekb3ilnt0x7o4eqa6so9p3dau84gdznv8uaua41s3m6nmuqhskvxhbnkhmcpn1igku8917h2r76nehtoeb07fau7h6f44c4muy2qiaxf5jdhef1mb6pd9dwq9qqyaluvz3ftqdd43olhu58ycdolg3rwkaaq0066',
                mime: '2cd3noavbmm8it8tkcmmyr9amctea8jrw64tbtracvv6vkg6f6',
                extension: 'flpxq4qqnd0dtvp73j0sh389ss0el4b9ykvc6bahvvq1y104sd',
                size: 6989941605,
                width: 910461,
                height: 332887,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'q2jpt5s5tb2kc8ybuevjneqqx46ggm9kvkzz3j7jykic0pn1p8ufddz3kzpfiwer6a9xqw20oaouct8s34v2ye949k7d04cfgpaxtqqhc5ampqci5bqbmrfu0ynj9w6aql42jrqd2ygp7lymcz3u80faidqookg8xqk3e50kb1k4h8qog8g4pdqson8ydz0whns214niuf3yc8tz7tivlr101hcms0q5rqhxolowq3owhxostska8z1x4420vmt',
                pathname: null,
                filename: 'plsal4k98pfj7q8z2zcw6x8jns1kss758lxtrrqucijavfrveh8pyri6cghxl9kyebwx79ve5swznjx0e5q7kacpy8a27r9ggcxqfsf2nl5g5wtbaa4k3jpgdcz4yk6hm1qmfaf7yrmn0rbm29vuzr3tavpf0gx231p6qw9i0l44izkwerfjl24mttv9hmmmurpiz00hik6bl3m9kwopbvjgd9gjz1ks8mcixk2o52h04y8a0572dxn827bviec',
                url: 'o71os5cs3u6fr5zs2otl9cixd65e3gb9iphwait3vwal46uwkfegivp9r4ps920oi94ph5kw8es4cov1o0if2hy2w8jbu0chtqu9gzws9nb59lzdvaqg86t58uugvuh6cdueo8s3s2olwwp5jyc9rhw6r15cuux61qn4jy5rr8wpu0dzkepfp62z8vcm0ibo4fnpajjamti6uh31cyzq3gjnr3ic0698u1rayacwax2jmmcc1fo6gz6e7r6fzlj2qch1e0udmm6xrx586iuof1jvi3m7x6kfk8txpyph4wrpv3ngvh4hzd7eipx6920ysjgnv3hjb2v2to7ybgbl7q435e46a7903xgoakk3cdu9evuoq0wf17088w5dro38dt48xyk3p9othjttd1hr1jzfr5wq8jssg3t83if8wkwr58cf5pgebqjud7xzgv2egpk8ecmjia1m6kikdxhr7kp01arergy6aj71w1h0vat849ris52ucwspc3v9s2x36b3sxlcb8f76ghs369a62pztlx2lflu2bz0qo4m1vuqbuqcgcyunqubz07f3jbqqgcz3bfvwyd6jqb9a72t9h2p947gee0wrmi717w56bb2pfftcn5shccjkk2c3fa7zp6bxch5kbgdpby065rwbtrt231ecotv02gg450mxuw0y8ivn98g61g6gpk1ipmjyb3t6iup8vipi121d2kq70ny33kk85o5dcwh4xkxxscaog81o1plrwtttlohci2e7ms1kzfc3sjozzhj1xc511b9ixz93w8c2jf5dmavepabb0ejluz89so9jhxd083sfnlvl2kmqoj3h43bwe26ppsvlv7ec39mgzsgb0foya1vnyzwwm2xbp851ajzf1iwnd6zrx56jz7g23stshfm0hbxof5muw99xfzxdu9q60tug9lbgamsfn90rp1vo33t2c4ren78yw21p9b7ge50wsmr2byd1c6iv4yxvai2mxx0jy0z21mr7bu8hmvvt3nkm',
                mime: 'q2nryeaerbq2ou3fh9vmgq3o036us522ocd5ciimzqcgy5yen4',
                extension: 'i2lqz35t5ehv4uug2vtpnjyhgdrmdf8gtps9l51ko2v9i9k9kr',
                size: 7299977997,
                width: 267688,
                height: 956038,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'bag9t5vdoxvx5d88ifnt4f84663zv9e88ncpswfcbqt1i305t4i38e2t528fwcoby31xj0lqkxrk79cyq4z0hjrvkip0l4vm59zh5peksbix6bg5yucztsz3hrxznikl8hoqb6s3m0aptkxwvgvf1z2jx8iobx3yamz7oy3gyfvu6ig58oyhjwdedewjhkllji1otx8z0xutt00m9pvd5c6rlx06eas43o7mx1voirb1tj96dcmynz5goa58d2x',
                pathname: '5lst2e1hd0k5tfdtqr77r9v4uh5w6y2agr0fw0zswqhwq04zfjzfxgb7nzyc5547msqbllqnzjqerlsf115roqmqsvjt5g00yrgfasoj6s3an99fca8505ouebok7xkgzgfdm5fjtobmzrbea9ky8ts9im89hi71lrcnb75yxjz1p0zugsbwo9ra0ssxov32shmlp2qa66tbmg844y5hk3f14d64vws3vvv05ycuj5obb2vf3m2i4ygqwp614317r5rpoozfq8o769m5y38qogh12gdt8ibw2mkpk7ivgbez63uejab9u2tumfgo9wxd05g74jpz0gbqd49lm9au382ajpbeczocic4yuzwtap4yztjasmhobt5rjwc58powsdjihduod1iyc10aer8anetdoyy01d403tzys50glg10qhpe6s8hadmq8arxmqgan2twzn6ezro0uondm7rilvfq0pe7ypruwddo5ll0jg2izj0hpbv3du7q8wvzry4zrez2a3mxh2i3g3gsv0m7esuctq63fhp980o6pbimhb8h2ka71bum30lwl4iqcj87e4zxzvbs3oy1gf4uvcuyvr1xn84y5bzfrey3ghg8eb4gp07jwejw4s0lzuw03wb97rolb875pz1epy0wpb6wqfv9zz6xef5nmzpud8pwz8sl3dhv3zni9mhiphijkahk9dd7tgvn1gxnv4w1sb1rfqyn2zbdjyolnhw7a51odotdyqt9p0ij1p2yxqy4e48li9yjsincwnpbzqevcbf35m68khjkyt7y6esio6vl5v8z4miix0na7jxv1f322mkk7xtl3f544m2misy583dofjzkdvsfjgblh6qyvsoq94kpur5r5dw49xgpjdp5ouo6d83w52h6xbt5f65abxzqguv254bm5wo3dgm9kp6jmdpv76m12u2ywutmxr5b2e9ermqw30ws357cg393ar4u7qt97gzy9bdr43tzbl00vyqy8p98xb7vx21p707qqw19',
                filename: null,
                url: 'hkgpji43nve98gu2afzj8cikdynyc6cz03ygqcfwe1n48mo0vn14ts5xeqrx5gpi0img8j3l4ncvub171s1epobt158hc6u0rpdml6t94ad62jzuf0ihacftehupdhwj4bpkkifix0d2sdu1i7au70g883zucbsudanqumesl8kwjq101dwa358n0dk4yj3653cvl58fnufgqv5wv0bwt2njcp8anf3ptu4h1eahgizmuymhqpuum2n0pr0vmt0t05vx8ppio2alfed6fcnumumln4ztvk5k9pu4j3ejf22qtlie8uvtaxb71565eva41982z2upfk792jeo2jwdllhuc5zldfmrqegmtxp0fnp2hx25gkrbgqhpyjpdxywj5k2nq55d95r2dxm1hsuxgdnpojjprmxqrvisowfz3quvfm6zokgggp68bovps8zk7is8wq55ddyd5xjv7dqm0zc5ckwvov8g9bd7f9noqcf3u86m3qnnv2ktg6etonhb76jap0ro47svbrd368vag8x2oqxqghp0d6cnfpj1jasj4aowomu2j52x44x5d86ktx3ddevu15yf3e77l9e1tztbjb9dfjdfm1fk47k4paa3cgufa8uc9rnxakon02x01ouln25hzzy6piaovlip6gek2lopq3gx49g1pfjfmfqu0f0cxuzq8npmqxv0dh5bjqu12djtvg1b6ycpyzi6jxoodhp35mpxw3cx333dlmogsudmxni8epbs2oiau9maj5x46fbsjlr1m6ukg33wn1xpvpguhg9p38oiiud5qomxs0ft0j00o9nfxtet3wm2i5zowdtxbrxcjm849ijfg97p6ohzexw9pi9h0e9jgmdqba2spzl74okf84xluu2854apges33xehnr1xvff9iwet5sxphziktokape0uz5ux6659g4b7o5wa69jaiuk2mk6mavoyy8a6qys58z2dhvoap2oi4i08on4rtpfz6nvglu159l6eu6rd9a9m73nb',
                mime: '27631jefln1ifyk8xx33zrxblx3eqxkq66ajqxjog0k5fjpix1',
                extension: '6c130ff00aychpad7pcw1y5rca4kl4egtqwahdfpfltl05z4t4',
                size: 6303500009,
                width: 474168,
                height: 158004,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'q0xo1eunhgxh477rnisipkkzdelx4us7oa22e94yi9t530l7tt3tamrs33f0ocifjhoml627pju2xgyv6wtmitrlq9q1wwrpki6tbo4wrdbucm1eq141b5n295fwoi80z2jlap5wok0d6gve9bz7jr5d6n2v5rc8dlqvvkklshyv7wg5mu1ovowhrvv8lejjcp1szbvk9lm2iwjaxv13t0ot48apqjb2lxrcpbezlt3oe7nqq9j6rnquqiirvz1',
                pathname: 'l2gpubf5f6r5plitv71zkrxv1yah0zfx57w0lzynhxzkf8ao332r3ta0p7nf5y5hi0n9erty9qpmw2n9d6s0idkppaq0gby75fy24yefyiaxrtzx0qfr9gw2vo6r1afa1d0omp1muhpix6fa3onhxs339vm3ipd3el8q4q8uqhg2g2l3suxqwn4lbnxfhigwpkq636wlpv6lyyq8pn7bjar1sk8kdgri0vdreecxk0hef9zpqqwdsbulw8loq06337hh5lwkuzns0uskaank68ww8ewos9yhufafssu3fgl0g5a3cohnhjegxg9w954iej2dsb90rjr5l5lmclqqyw13ju1axw94b7saziptz1kcxk4ncjon37ott1tt5xqblco3ctskw5dzd58icyt2eb0xlzr6tcn29jelfy02cgtn8v5vr3tcw662b8oc1yzw13o4tjehc8137ctv3ch8kkqeia4zkvlovyd08lh9iaq507de5rdm3udzzcgn91krm3t3bgb0rko40jnt575016j1s0nvcjobsqvwd6cyivvxj8dsncnihh2e3d5o6s76lhhkrq3komtzrfzszl7lq04j08ac1u1ybcvmhf7zp13mbxxiayrealfw7iod7w1f8z69axyxi2r4rnux5ad2xl4by8ixm4ihhri5izby5zf1iyfyt7dlc43oitwxyi7am857elhsqp5q63xv0i7998qx7pqke0a4dvc2ny01gavq5z7o90o88485cm7djnhundw9qnxy2pycarmhylw3czdkk4c6t3senl9imokru3esdusbarntl3mpgvvybnmzu8qzetswdgzald4xdg1npw2bc9jh4f620bqlc0rd0tqlh9fxqnyk6lvrfcigrbmaondqgz8ap237tx5vmpk888do3r9jbclht9z24x4ffopjln76kcq6gar3x40w3qs4igo3q7xwm6wnrho7cd5nuzl0tu4uohh1knqhfjuexxz4tjmgssafos1fj0o8lo0m',
                filename: '0kmwn4szpxnvfog07jl5o8g17h09tmg0aymcb3sc0houta6artdtn4rznebnq0kn5ia5jxq31zjvdw1i7gdvyjuch52aa5rno44to7qyphbrc3nyp0b0sorpf5t78un4qba7064rod7w90gvgdbusie8d94hhnviepth868q0v49fn12f8s9jdyyvpagmjva60mdhdbf5pbqavf2rdu9agzr9ffr7wngwvgvkkvd2eeu7vt7k444zq6p20tz356',
                url: null,
                mime: 'eieooqzvrwov9beg4g8tdggzumc056m53uuco1e9qu76850iag',
                extension: 'qhshddap8n8ggl7qkktwdlw6oj6xwb6uwrooknc0qd5w2d31z4',
                size: 9019067472,
                width: 186624,
                height: 896101,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: '66g7yqmmzwb3h4pw4gu6pee4707tp2ryiafol0w5yipwjrmytyvhc59yy04owvh1s3sa1wmr0v24q13qkfp25yulyjq6yhc0b9upmzmkakz0kdi19jbiq8yslvkqee2239ilzvgbnekmu1md0r9fw19h01itxe5j44xb8lcq7ueqic6zn840xviybfi0jyg2llxfbrx3p8c2ixs22mfup4xy7j768g754e14fj3v31ttbbp0r39smwsbr3d1edd',
                pathname: 'g1lchsd5ybe8zf7zoae5yz6dindxfi8s25aqo3gau4fdrr8d81ipky1vl0zxudugkj4rq4ve4hw6eu6sk96glkvpxu12phgekrmycdsma91uf8u9cvu1vt2l5zvcl68wdh7kwpp65sj8bmbcxdy0jvlwe5ispcnkn0fes4090aghbeglt75s9i4rp5vrqwj6m10882nmmx0sjiw1tk249jrmnrneq1pavjnp9lyuknf27jeufqhqcz46nd3lrmp4izvtaxx36uciw9o63gw3f2ifyp9793x7zdhlwhq0v2qlbs7eii2zkxfi4htn9y8t5msts5txl55mhwm81ghvcnozevqtgvoxbzxayoqdf0nablsc0oxab0ewhzh3oe3dxs06q8o4dn2t1ul6ep5nablf9qqjlf0owskbwr159jq0u3sq0p55pjany1opyzzj8prpaaw39d28kvzehmw2421mcxzit64y4jgwsolasmcixv7gkp4pijcgbp9nspb61lwilchqfbkq438tj9pdd19zpby379xs7m74vtpqv0p1im0xi7amx9q8sndl8kc4rxaye9opw6x1x6afj7a9n6687ab8ox9vqqgclp0d9djdkw57r4k1wfmt5xmyld25nkz3heagx937etvnyfelwexsgaim8tf5res4fjldim94tlkyf1jyyrcumuyypufsy4mnnrqyd3sq4v1ki9b93s13j3wi0dw1l3wyy2phehb3qjmgunfm7xzx3ugpyvjh7x95zhjh5s97bpxwbmlx8kvyir50aouvl1ni15kc40o30n4vxya1pr9capc5rk2rbnyesxcij8b72vfapjbkl48y3xnke2uk6pfn9sef46r4f8c09kibbcnsjxo8485qooban903x4hrwnuqmc8am330iqmd3oeby3tbj4mkcnrpxp396ushv56rz1bw13x8rt1pvclejb71fn3kvjnuc3nmpg3zgmx29kqktyhgaa2blcu5krs8oqpwbhidk4ae',
                filename: '3cgfb6ghn5682ftydx181gf1eb9obhnss7kkm7uz7nxt83nlbpo7nrv899wbb74g323jvzabsok7frsuyd5o8ekq3jgh3f8t0fpf7e600edlh8ch9ezqg76s89z4z9dksjlxr5c7ub8gh00524kqfkuz30y8v1uvuadxadgtdhuk8ziu4h2wtod2wxrplimlkgtieyg158qblx3t44i2hv7p8b0ox0wjekrlwr9jahs49j73fmqexzr9loqq9c1',
                url: 'kzfxj2w9uwchc8jtoobsizvnv144uxotk4d3kfc9yzm67pksfwhtz82u8a4y77so67w8od88v9b52cw2173a220yetlhgbhavn16d260hsru02s918bgjaflci2kzm1qsveuh9vqul3i9ommhb586hq7c8f8mb733l8fpbft4rk3mji2ifj43ditzt1liswg8va41cx6vqhr9fzw97nwrivt8asfnqd4i477duqfgocv3zo6cfr0xp6093y24jjdig5e9st7z9azeawknvn7kbd97srdw0rrwon74ye5bwo0xhv3htg1wy7ic8vyt6agejy4ss8of0yyr64nxavnb3c7iw9vvenpeocgxnrx9iotds7z7vgh5f20c5mfjptdvhsuccrlm1mc1s99lkedisg6s74en81a0hfv0s44nza47cks0yp843mqcsvqpkmkmj6p7q2cyen5xjmz602v2dktf67cxwb4gtwsyln7h65qs1uc6v8kbzpkp0adovhawrnsrraszzdurd99j97xq01poj7fh6te8le3e5s6j9970fflkoe8ds4tyczas2bznngeqcmcyta10hh8ijcw3gmmmg97x6308ll4rr4x6aub19rk1y27xe6wd58yv77j52hiy92ky7lkcm06pvlc4x4glyle567rto8vz9augiv8ol6dd54qmu0zp91ff34ytkngq570xaizjy4qsjd84ja0e25q0yrewlaglpzsz3ecehvy0ak9h0f4uj9ptk1v090h4ar3sjaroy77g240k5yw9sk0t9ucg7ek6aa7qk4q5ogxz6woouritqpu1hr02w7nfybmgh4c5kii5kh6pyu9nouc75nvwdwessre2xj95x2ngow1l1pso2h0n4b7brnoha3hhtt3k5g94bqkfwd8947im24j8xwd2lc97yfi7rcqmrrq1hq3dcetrn3joe88zvl7ptr9okcb9k2rviorxbhtre1oznrttc098deg49bcikw0qgqiofizjzws',
                mime: null,
                extension: 'p8r0kdfdhsovu618ij40hieeee8us0j8t2bviw2vdz6rokbmkw',
                size: 5217801089,
                width: 531747,
                height: 122537,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'zd2vep3f3vfvk0v3zzlhu3ld3vgytx0wua1m4fukrjtzhvkwyq79zdteixrikwryuai48pdu5qoxfs56l5fxt90s5860rv7qpnfcv9i3wpnlzsip4bunlt3ymprs0vuzmddhmwv5c1neqg6ku7exmun4b0xfi4iyarzx8oklvynjjgsmlkd795fqvsl7sta4s9nr8etlw3ocbzz0n3jl4i59q2tonbazd5pvy6621ugifcf2lx6nyh78ldyipfv',
                pathname: 'npsw0l37pxcvyuu0c9h9si2nuvujosfbe4o7nl44nsxwguqo3bwh20816xax60e2h8viqkp0ncdax519153bceudlszxs27evgpm47bvfkjnzauf6pm8mf5xks7a18qf8sdedzbndgo1ru2pteh3yzkn5ut48ia3wecvbmlsp0qs7zhnmo7lkqucnut5f22hvf8o1g49388pe3i51itcfle2qr42ftv5nfxibjobxpim9w5ujxrhx34tdbpiuprjs7n7icd423iqm0gdb88ticikry8wpapskiy0zrqn62btwauxqwmg5251r6jb8oyb5qfe22z2jjoep49cjcyhla2821qi8a63pwldgnmc3oie5wt9iz99slh9ftwspcs42jk3wat2wcvoxkypx8t8xqwvzptyhthob0btktnu8d8l3ljfz4ypuof5m69zplnn5b0zxsspiurfp8rucxnqzhvu1lzihzg6wylfz7yy8qo531wzvyv4sdddbm6f9zf326bg3q3slkx9raoaaak2zjo24trhf5rtlu6ntkpy89u6t6nmg1s96qhu3w4tnibyswr9tlvvypl6p6euaot6n552i1579etmfxj9tz2mqfjknl3lstpwc1gtcj5r039mkvy44s59qkwb8i67vrefvxmsu1g5wnwak6hqkwiq8yfuoh7ydunu2fggaz4ghj1m1kk4ltrqveqz1rlg3e9h3l8y77a7x8yf17t0wvcihzwdbzl752djcif54yyxvbtphyn2exlhka9bb79gpvnhmlrtjh3j4k7wvtgnesauh6vsd23i442ak9c0i2x6pid4fap069k9scfzq3gsqlh4xzqx5g53rac39ynvnmg6ovi5qsnilsa4an8xs3cf86i6q7qvm81fuja7x7n0uvdolqqpr2g5prnrudbk471irdojqp9txizbcxo1v3pcicd1avoe16to1lhlb0uwlgwdaj7zllk58r7vddyabsw0ggk9d18mwq5drkgkqmgo6ojm',
                filename: '5v4v1yfwifa99p6xvsno5wt8nv34wds1ov7fpxib9lrabcydb5mjouzuq59sh6eu0muvtbk1oe34yxa03hs1x0omciyuysjark8l5f8a0bch7axk78zvjg2798swcnxttupfcyy4jziavz7yl8l7p1ubktub34qw8x5815nr93z0h399ga73fy4mb3u7qzvrjzlz3l643gc8x1ek04p4ss83in5agajp195hhrkuff9cafw8cg5aqtigx4avfox',
                url: 'wa1jgkfcuoxq90m9xl3s6xhmomad0db4o1seusal7uffgaypgjg6a359lhfgbz77tsfcpo1ia03co6jk6eftlqd2yrezeq5q56binc86zjdc2uz2ataq131n0hixs5hjv2dxe6f7smbxu87ael2gruhhoew4227jtga0iiimqfwoukoye6794p9d7wpguxgoy6vln162lpi8uifqwea99i3li3liaogt1cp5yq1fbr3pkigfprqhp21azflb5yixrnfsf129lgfaqe1yj9ikwk9ziha76o82wvs4oxox96p7c4x4g09ffmf8cxy429cu5pt82x47m7n7hbl1wbiwqad5jwgym89v59ilwj42ejweo4r4izxe1ldufvcnv6i16awxmvn73p37ry8l7jf8vbmec39t6at9crzfiii1chfu33c9gpzc126gej8ojxghdd3byqgkm9l9qjk1ggbb39k8or36v9wwxpbe1q88bdgiota0h3a2bvf5srnurv76jt2zv0rjmunnyw0ukzak0dfkjth6ffkbzqsmgm76i7nej2t5ym42ieps10v9gcrmc1n2vh15t3yeh0wezn9hitc89owtglupyz28wf09ptxdbwlwol8r3a82e0aob3qeve0yfxn970m8uq5ugkt98hye0qr5vi5p6bnfcoceoce0d7z7u7lzxtxv809wnao5u2v68n86afo0se8yba37wls35qcmjyvkiesh8dt7x8a3fc834wwnfsgtdodq1d58qi1121xhl7yc075gla3x9eflwdgnxwznvqbar9i9j3xr9nf1hf98f6yb7cjs8rg80u2f98mdi79inr5hkfpsu9w2s4mwzfxqh07ne4wcvftnyzan5i1je1ym9m0ka2v5u8cm39j64xr3y7p02dpye5yigj36gcy7zsqi1sn7fgxarl6iey1dp5l4ud73sabku6umq4bds48n9ng2wtwaprsjcz51247qy58fyt2v84gam7rtmimpz36s60mxl6bl',
                mime: 'j77t9kgkr9i2zmpvl01tu8xdh9tnpwx6ohmzcwf243ejyqzvna',
                extension: 'qq64ilcv1cge2c7uaaekqwdgd5xuq3j7otlqgs33k3co6tl3wv',
                size: null,
                width: 896151,
                height: 984293,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                name: 'nqu9fp81vvv4wewndimzmflq7ngjalf8odnyj4nzspk0ykylwe3jcvfw2p9tsdup61renqw7z2lc3fhh7zap63jzt8kwefo7ejahbyvag1mapfoy3zb6rsmz1sasmcky7dndzcfedcsjsedon9j8nx3siecore0s66s1g31u83bt25vf6bpo29s3oy215eop0u26dqrd7u7gvdxfx3hruo6ym83hdlcgqk90fho6y4sdev48o8ualmnpfo5x6we',
                pathname: '0ipgmxiyulzb772oi0v3uq7goofdx9kgda64uftib5wjrxk5wp8is8x9tacy4og6kg984vzp29jcf5ayb6pcoobvzjiq9tao83qbpvu6ak68pz2klimksb7zanuvb4qybzzwxerwx3opv6drs9e84ovyka8wrij79vw2h22c11g2dpudhr6d40so0e7g31c15w0xtrvlyqo6yi4f0ypok579jpx6ofa6e7cofn2q3s0katuneln5tn0tstbetmtil6kffcv959q91gvee8b0vwtp812ns5trzt6u4pn2qyz0fjb99edg0vbaxbiaq9vqsgaxmbkrmi4im6vkfl0ha07fap9df3a12azhwns9o094bifpgha82a7dk2fuyx5b4gboldnvvdxcbm5y91o98eo4gv56jrr09q397ng6c8apkrrdtm594erkwpiajtllwbswkriefrwkup4dxol0o7eg3sbcwrepe6853swcpqcpspi6thpmtlbmoeex4jhv3tsusehikpk8w826c0td8xtjlxkkok3ojh54s333ui39in89tybznaxx7i1c5aixw04l0mnw79lppfj1w40q32cak17h1mh9b0ynmxmm5gx885mq9xston59ewdrfz5prteh7wb6csl1bnhr4n6wwg5wq6erbrtfbtw6inc6307s4eymytajjrm9hj07w9wy0890hhcnwtnqgs9sq4u2f2ljrpp29t9jrh2eka350z89pzqiveh0b4txqncxgfpjmnqzbzhnej1vu1h4a4l31zt1293dvgtlujmmxjb2pq9qp6il9t6cdr2v1ib86l3yw4s3m1ga29euv494v2cixo1kvhy963d4bputpngthj99ji2o0fkx5lgy2rc3izxyxgmiuix2nfg4aes8i13154j6t2n3lem0c0p9iryycpqayt4ydrh9xhdkmk1ah0upvcuahqwr08hiucakmuklg21r85uqt98z5mrfoswknxii0tm3cs6udllmgnw0n2a4',
                filename: '9oh3kzvwpnku6s9k6ttevjg6k4vor2lwtcgjiwxcfdca3mcfb3wshfb4ekbk7n28f9witlgkfpni9vl9toir3uryin3adig2i6f4ujpnkzzqxtuj492ln1y4hamxjtqb0xjoyx91tsx29r83u4g2fn6sjhbcafxq91naqmk2q9papmu9pg7c1jposk07le7xrd210escihpm0w3j98bnc0l1pnu6qw2cr7ak8t7im2lrhcvylo5kaiahozgdirg',
                url: 'xdd5ckp62dgrx63xfuuf5221hfzrs0ekz1vzi5ybwrfqfpci5go3wp3ormr3amjze0uz77p6cvyvw6hshq927kxznjbna3b2zwjlnkr1hgb0hli3wlpd1ha2kmj5cq9f8knc6kay32p40x46cxrchhvwftm95uh2d8lmt7241qu2j1pybvpsf9povl861wht6p1gk7s9c47mvukhq9uysjoukgbhzy47l3qtor95xj5ck0oyucq9mfozo8dxzex0qa6qf15f1cnlfmfp5aplhz0zr2j9gdh323xla9yd0s0wqpdcejji50ur3jyxgd2qm5segvlt48tba4jylpu0mi9iz96as8usw7n2cokhuoho8z5yijxdiz6u6zbng325fhle92eylu6hw9e22pjcs36os1mvlcgmd2232a65cd0y34je8rm5qgts6b0zla4i34xomv0yi9503ab2edruahftc3rnev4cugxfnbw6ixvmamk2mm6ms74vv19uwozpvmw1kb14y3g4ktj6cgy798pngpj4gqua9nbclu14rze6g48s36vel6sepwherughr5kjq3j5ejt2un321g9m1w8ezmsve9cwkc55dwuvx0pefzjrjr79jnzuzh284a3gfbfbl44efstuzwbaw6s9eqizv9yq8qzyzz6wibcxypkh0enn3kvi3f3obxnibd5eg55kji2ioow25gyxd6dfx5repe0al8xs2l78ia53fgtzf6n5ns1kb7lruws0tltmzqmcrqo5u1ai0dj9ubhzg5zxxnmluftexxvy8hoeks3g4rvh6ebt924szgpeygvhj55vuwpv6ukkcck4uku0gwj9nns74pd3tsh6o7vbvzjjvwxxu1cg51dxpkzilxvea455fzs4n2galfjbxlpni4pu0v9ui5qehbbijqyzega0jzlqym8kg3045rxmlohdqu1ei95j40lib0725gibxleygjek1vf24sc4bjmc819051g47aiztuda3thxac0q',
                mime: 'lcjvmxtgc0rn4hx07ggam7f0mn9o9lxeejjme4mum1xds9spaq',
                extension: 'jyjvk001t1rvx9vmuzr4h56aosm2gkg25kptm5hej7f0wt80xd',
                size: 1556912515,
                width: 468955,
                height: 740449,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'zd8h75etha766uvgiy69ylmz6v0kljf58no3jjfb1tn0jf21qqwxrms7gd6r2p3lp3fx6wf5yrxirbbxgo83nnslasqjsbbzxxvveq5oavtvwrnyws9rfqws1bpp0dj2i05ixjih4vsg0m5mn6hy6bsh8vil8ed2fwpwq5mdzqal1hw2ouc9lxy74e27r2oi3og0e7bjwaduu4lh5jm6621os0yc2g3eb5p812bh4156vfyvwvqy9deh6a513ca',
                filename: 'k7gm741vvjibw3f8ibs9dzvpt8d4dnes9v8gv7dliputth6egtk167f3g9kqdpckxk7ipwtgicr1ghl6h8ffppdjjm7g7veb4c8cs41h5dm6xzrfn3iuopjhcednksn3f6jclh7qntz77cx5dtrujegy85nqwxlz29fnkwixe91mj8kqvoqgtw811mtcsk2gp5l4xyrlcz5z9xuvgrvj3mal0jjgf59gsbh1796r19wctrw2074d363hczupr0g',
                url: 'qzhxj89pgni9khlpy8qdkjhmr36bmwx47yojck28dbwrmox20zqnhe8nqvi7sobq10swus4ipf22d42t3ewcwjzmiitr1tvvj1f2f8sk1wb9rc6zuosp15i90c67f4myxpmqy7h9begk8jazw9bqut55l9yetbv2fngmnhhn4yr5zp35ki4oe7sj640ehkcnahjbkarxvludfq2w5xilrprwonpia8eyymdqcbuco5f6j92rbvxgmpz98cxt6xicdgxoo9x8bq6ctcrzx0sp058l0oex7hyqawp2k3b7y4kf0b7g6zxi8ygtkwmkdxtguxl2kqzmv62m6n403vffcs2r4kmsa3nugwhwoh2himd9eekb6pnbg0l9qx3p984q9z27rytnykhi5a7jj7l2cj5mswseaz9fck16i02l8jt885jmmspntzumyk1gm4rcezyb8dquoco9wqzefyxwjrzrq0m5siq8b5tdpi1yb0c7kia4lqgldextycumw4q5ygb7459u6arfu9s17fx83jstsyj49xo3tm0ibxt1aspeo2lnwrxbo8c64zztuhbx6vjbjl8dsqshfpiupjvvj8nwwmbmae70o6mtlz6jbbbkftbo1ay43okqn451acqqakq39izyxbxokb56yc9jzqlwacduoz35zfnjgazw51buvh37dltrj6m02vaz98t3ikgxqzb8k4j6bt4ckkl5e6bxt7emrtjix6hrbylihsx5sf1f70jjc7t3ok4d0lsl6hb0kdfhai7dxdtsfbp9gjv9ez5w9goy4adc2nkqz8rqkw2tbd6s6sy5l8m4i8uuhfjlbgv80hgmnsfpsqngwl5rxai8wmw7a7t0q8waknonyfz539lukthd9nno90jaxxw9wz8opglwucvkgry3jdzm49pkzq27dkqiteo5jrxpch7alxis2q1ubfkpnm5utwaqacx4r78wti7b51zqs8a1b6mi9zkt9zj3cxxncqdduiacwjpcqs0ai69vdvyp',
                mime: '1zewtgxpih9j3fygnt258msl49ch13wnbuv50rvzmx9jj4iqmq',
                extension: 'wz1jhtohddzopkawl5u6y9kzs0ofinm9z0uo9f0nz3u9jdq207',
                size: 4489404519,
                width: 882598,
                height: 255521,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: '788n7qdk6ih8wn7h91o64tdqmwvzgh06qfg6ln3zn5mg4k2eek0hf08rkjkt2zs6nveuj43pvkfv2il7931niuhiz2w4i2z9di2wxqda707yjancjcgazlviyr9mks8rqlzoe4frkr9qj6cj9xdjz88etvjpuw9brcyio8xhgtnhu9a24vxszyikkdz8ixtn0q85aejmr2byhd9xe5bqzl3kpwuv6nsr4evq436uv5b5bt1y79yh9mbe6jv1lcg',
                pathname: 'maqj2pwqxpdd8z9l6e0skr1zo9imshiih9peqrjhhvytwg1ff6bne18shu59z2f04cziij6pcra4fytrt4glwmsdeyulqcm0lqo24bg33nyfse6wkw9n0w3l058quwmuzdkazs48dvqptcb075azjnvx0pnhy3rnqfs4rlrs09f6tqnwmggwts5a3kobc1a4a0mcz5lg9dtjmwo0uyaexo4typ4wp309jm0714ecmugktxkh7mgt7gq53cttndt76fyi7zwxw29mbwtf9d9d7iv4m6z6fnazs7nuvaylymka8cxumvok5ge4ywql994pb5vjtve8xw5bwofkntf9iewp3lm116bk3q2d5n58gkjvtkkjmsh7w5sr0vvm8ho8pct6kqk5oo27lc1ibpa3dezqo2uv2xflnlc1ke80ckihblpqatacjfxgiqzxh3gbze1cf37uo5i6du9y1ik7xh8mkx7ztie7lp9eoa3kltj1i9ir383j5edoe7pct1etje71e73b1wn5hodw0uvncmzz2cwmwhgpv8qffnrcplj172r2sp1xwadla4q6li1s0v40n5gdw472fd00s4475eax9vrigdj3uoku3iebvxrwcq9q6wuqi9tfo9l9oa3dw74bieu1jvuf3po9qstlq81tt76agd4p12x9g0kya6m9g1hto8mt84g64pch6gfxzkj314m3po5avn4fl0nx8medppx7lhd2ad0w991aorv6452z0dh15a8v6e1eg6ehez9gcyrf5vxicyjh4qvqctx0codit9pcaqg7iq0u5azcjnjcuzdiyxgrp2hw5iyc2n1fiajv8tv4vawpcc2ojsn8hpiuf00e9sflnyym66zrocuv837b8bmttpto5xbb80ebv68f3nee0mxhh9mwswlfzfdg36u349ddk0t8e69br96oomvlm17hj33ffbfdww1zvtymv68tk5gwvhb2myfzcl7bivbr6spiq99fdgdfz563jf8t2w07mr4ovsib',
                url: 'jcrrgu1qpr2xiqjgw90v6dmtt3gu5pnmr5rbrvehj5lovv7lzoiq6enl6pvtowkxnoq4jqkirbv6focxatvllh1ikp29u3wsgmo14qx0cpbag9bgxow997s0eq3rnwap4d0ixbt2th4rbsh00wze01aub4fcoea5o7i2zhun009fduf0txvzatfltcwtryz0npeqy9dpig33j125502veisexk06sej127rz9cxkccjxrfqfraoo2gb6a3yjpojxrc9cri0r7vi4ettj5u8mklyzjfncia57wqsgpk7lvgxophof54j97etgcochf8sc4rvmwx1votdwplphimdr4099z9lntxcd4ny4fapgk7i5b2c841jovhv2g12ksmh3503pwv9cpiqav0r4xh42qrfombnoy2b7rlu0xfmeejp4cj0chbh1xx7cs20e3n6keifnzclbumwuzq12j59xvresno769ri0y8s2cy5jx19ceywf228bes0dwu8btxtd02fg7nlvh8rt496zwhn3uvq5zoia0dhkp24yftbskslmkl6g42dizh6dcgvsnnrm2qqhvfpegaj70re5x3legsfrxrka0qxc2b78cldqel2knqer48fclcvowazhnst3k2utesq7gf5i40cbfywa19e0q6bamp5l8fqdimzmn3rigldmbli0ma12mtyb3u04uvk8e7gpu58uawpbn91y7z1mc8r5ek7kefdemjmrkupxlrw4ogqxozb63ydatr13yyn756c2cw338n44nozci9pu4sga3yu1e79pzu0x9k00gezndjfsl8qwzg35odh1cj83m3pwn5uncexyji7idtripddr1htv85be3bwx1clrhio1v8hvmymd9g2vdxrbmx2ag4up16wrbwfv24m03cw63n9fh98l143npnq3ecpssv08uw7ooa6p30r5y231wzfh0sybk1vtoiakvqgwgbckx8c8f85wg8brpq5w81v9f1cuwj7zdlujakdhb1k5',
                mime: 'osiuz27owjg4ij0e83ghr6ce3cy3geiihm9uunrlbdmhcah33u',
                extension: '7eood89ahhhfy895nrbwy2y2c1x76e6s9ta7onxkkg829297dm',
                size: 1664479599,
                width: 329076,
                height: 970024,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'dvlr78bjfx9qu1e25q7blv4ka9ik7gd12xsgwop4lyimv7qxxpugpzh0t4x6eqgskfm7v71tsjxsmndwd9g15412z98rdftuny05cacf0q8gd3bvfj29san4qh97bn7ywj55q1a41cl8e2zfkeg2odrceme2eahk63061imloa6j14ecqi0forc1mbovo4eibbzkz890s1yxk8suhtl0b792gfetz3gw4y9la5c92mccqtb7egdxjiipyczbzxj',
                pathname: 'lcivd6kwp0gfeeitlq14h67ny6si4i2y29pbzzu2qe5qpdvfpr8huj7gcge5cihngihz3nstxiz0sgmllnr0cug41zzwvjy9wk5hfri9pujhnggxj70qm1t3cp6uhd4jjojowhg58xta76qkdqs64xdwgr72a2wkpk55f6cgcrlf4n964no8wlbimfh1jjno7wryu4n58sf8hmi7rzmrf6t4soa1jqgvpj4xci7iva83u7he9d7mav78g6gc4mm7mx4ycbedarcen246acqw9xmhfrgq0wdlf7xi3l2ven6k4ukeelti8ws8raklnv7tpqwpwdjvvbvcqb83pjmggntkzcpbdw6regx3ahtltmim5uwv6d2egrpdr5pod850oyla3zwddk28iqgplwh63pszikn0m036bqzdsunjuxfloec630szfahpb2gdpvxx0g8e0u8l76k352l0e787mbxwwy8be00cyts77pf84hnb1xfjn01muho2ynikyhupbpbxkaj3vgbn9k358yd7w4sm0lf05ch6ytro9pdplaeq92ks23fydflozkcshw386ncm15zl2f4yi1mfv4x5kacg236c1fu6pw32lehog620jyek2qzvbo3axvk3il5menkcqx9f9a7vlcvx8hc2pu41n1dk4nrayweacu4vams05p4m4zu35dwt9emdlphw3sw82mhr2kpkw0bgf81keesor6epmlggkslhn25n28f39n8fk266s5vla7uhfgtu14knuvgybm6njlfmjsxozv2s0txr5f5qeor9ee4gbfgs97mdwehorq78wjdr5bydd0hp6a5r0tac02x8gu0276zkmjtaz8v88qyoq7hwq9awlae066vvuoj2kz0n8b5xkcy8p3a2u0w8lyd4r7fllsz1rp0t96ift4ew6flt77g3wyas79hsyjd7thh7xw0msr7f86ebagkewz3e6ug92muna87rpkb8j0jeb4gcbd2ivduqqft5n3we8qvd8yvg',
                filename: 'el2x14asboxny3e851suv5zu585cubaq5rla3h4866jtnr849sastsmggbc5q5q1d21w1y2jcc0la5r7yzb8y5xwjqwdw10z8y8tfmk4w0wn29dkb6eznw2tenroqxqhpj9tobq08rkvz4ww3nkpddvrih23bmvflmamvcpqtum1ws1bwprdowq6laf9cxkem691604qk63n27m4n891okoy81mpev18cd43wx3xa2iyg2lyj6c6ewf2xj3lbe3',
                mime: 'a4535bvpmf9jtjeo20lpwfnzduob879e0zet8u9wa2p5904vjd',
                extension: 'cz848gclp4mlcl46m1pfbiwpy5dajw2hlgtbrovcdpqwiqh9xf',
                size: 1859231367,
                width: 407162,
                height: 213270,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: '6eyt7dv9mfecvkt3vc1f2iposvqbbh08ij978xc6rmk11g4l428x862x5t8qwaxn01boxwon0vkf59jbihtsj4c6tidu6hltf1f9vsfsqlq5nhpch3m9caaotr3hfcdf2mzay0aj3ynhatm5q1i8tuqcsqgqp28tb922e6818bzkx6ekwakouevo57vsafs2k6834k7ghkepqotnrz60ysxfrfbb7hf5ms1k4edsn4qyhbw9dnci6ivwvsubxuh',
                pathname: 'xhhl2b8kdhcevxmfh9y45uy4hk03f206o736g784c0kivxhjq9gc43o7w8raf3xj1p2lq69m1a0up4ugt2rips391m7un2f3uzysq17yvfi0r4wur6azi0mzfq5qo1hdfkt5hvsmbvedfece4tf2ru5ex7nxq34i6qp1c2r8jn0vhnptw65pvmwloq0zvmzorq9113q5wlr8s1m2fq18o5in1wkm4pdp788lpwobhqjbsni0mm2k5zqqxno2ubrbp0bxygiifi2su78voepm17cqzvn02kwwdeiqojbmbfmgdiq3ty5azi7zb6vnudayn094ldujef7nkcar0bxpxc39log445kps8mgihni41avw1ywaznueh9gjdws3wahzchx76c76eau40f90lx2cccjcr2zzrivynzwep4xax5fzd52f91oa9ys63hhby54nfdznqtcqhxdzouv6v5gitraykabug0xno96jya74rx0d7diddtxsx1ezhqpbxp8yh1qxxfwgd5tyoc7vhbm6xytqpdia4tb22jmwu2hsoe5zds4j5dgw3kt0ewq61anyddw3wjhckumy90eguba5ct6tfaxqla0a2bbzrurj88phwp0z95ccrk6siak4eq6uw0zcqjh2opvtdgb6g9ke7i4h7fwg7dozeje1tmsdbpiga8kaue2601sw5emra10dkj4die2pd1j59h05z62uhziijags6wxs1w13dlbhc3pj4efnyxgq3ejrhhswm816noe05z6kuoua9s0tk5l46r2uiym27ez5bd8i2wrbmfwah38f6mf40v6i4c62opf2yuf0fjye3mdqvbso6xeyo1uytyjk7ywm8yum419dev2jby1n056m7q9lsjao8pyvdf7b07l7wz2lh9tj1ybdnxgptsyi5mqhwoysqthyerp3eygpgoj23zc6kjwfdkn3qjl2dmfyo0fryhbxv7h5jk3bq2fb9gt4syab14owg285qgou86k4sujucos0rhh',
                filename: 'zo69464sbiktasp1bz7hv8u1nzqhtvwujo0be1e6qj9d2ejzqlek1bh8gxrc9sdao5cm8rs0bly28wdwmvyrnxq8676jaajgqcghzcon0uccr23i39img4dpjdz2eyw11ugtel904he3j06jwnwa8zm7r5cdf6og2g8kg0lhxehiprg3x276pqbagta18nffqyjvc5rw1imzimoqqez89mszokk3ha5j1miq1yg5zyw5jlenvv63utfnurc9po1',
                url: 'bfm6g2p5nz6pxx46h2uxw7f79src7797ne1pssafmh73ail06v8espe8fhiz3i6jt9xyly7klmyusd0tk4miwtrskk4ga0jeghwh5zkg9qlixxbrjf2969jwclkpv98mbdre6ygmycdctbez9ba8gb7vh0rhu1q2baky36g9rbfg9aejy3tmfjxxwm9g0ilkdv6gx0iomv7467ojin0fk1fqrafc3b4q3aqwyaopl0mavmva87pck9yyzn24j1ib0rk85qqrov92a189zjtmy9kpy3qb1nc2kjk5oelmhpmns95437c6cwc415tvjmgonpevohzdu5c24l5png1u1b75s3ve2b3a4fca60bz7alf2kuj822rwcyrrjwo0npplcp0fk3hqay4kvz4pjp92xs6v2ksjtp4nm9zv5mkg2826798yc5nktovt0y6u6sr3ys25oy0aofpbzvslyrvg2rwl93g6kmy8pbev2yg5bjpz2oz83cualmbjn68ghxvbcen18cuvbuzfzh3mw8bkb3bbe4k0mdnli6qobvf4bstz6km72rhsiqjf5w7q22zky65ljuzf7oxnkjv4fn6h7yg0eh9bdqpyd776k4gd3kppd881jm7l6gaber28922i9gajhzjtmyvi0zxr1pt8et5beivi97racuf5r2kv2xjym66v6cssmyp9k0crf22wmozkk09o4lxtgqoj8locel4fp24sy7s72vj6bwxuqxqrpzllvhuuo28pfr4ji400r491c2tqbkmoxl4ww2674adg9c3kuq1mj9cn6qda4mnua3vfqd327rk9y4jnffsaj4xaa51lun69g08f73k4173jehs8xyf1s6cie3wn81k71kpgnez17aoqwjgna9qhnkcjbrz01sc1uzfd2hqot0s0ccr4at3llppwsgxvw31hga6ee6lony2xgm40oddks4koxx3n4uqvneoaff18zx7uc77go043wx7t9tbxmtms9kwhc8ygms6mqpvtqy5',
                extension: 'bvs0nrjq63ykdwjn24b1bl5bv4pj1ay7iecamrv83vohiqpdrb',
                size: 6824100185,
                width: 720969,
                height: 539144,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: '6cijqdchs614son3xwm3vooqkdr56rv5veshwp1vbdhtiui44ajoe92v74qoqgobuipy1mo2o3mh7ujxm2qub1odqq1vv758e3xnk2ag57bjq8uxwyq8e2q97j7pivw6zcsahfrxw0t595ypchs9dksqw68ltt5hmrwsh3qm890i1d4lhu14bjnrmy6jn7y81dbpr5spng9rhw6j21ey4a2c6ia1akvxb1jbirb9o6zh9j6pfpqy47444pssdr4',
                pathname: 'dpjr7trdzuubsq14vxzu2tb58zz87tkfiqmf6i8dkgbbj2zzzf9l9wrbp5d3xlyeixalndq6dzesgqpdigbpqwa2r23r4zuzhnud0s28ssavxoreh00le4m172rboorm4vc4bqftg8i180g1fcfk3nmvmzpayidudts2kelih3l47ep8ixqou8616ewx30se5jtz3bj4z37vx2wxmblik7gkercwyt5afs70jpob7a4o0eeqkqzbupfvuahrafzkq6fx9e9itt8xp42dhm46ld4stl4qgzhsn9xkin0iqgfyp8lq9kdi7z84tk3e68fht9nk8u8avuxg2i6xzbze9g0y9z5v8wci51z8eq1us40royex5y789qphqk3d4rz21t1pjp19s8x3fcwpganwgffovmfiux3wp6rgmhwqho9o41lumv5a058objk66vrryj8bxyht3tvgu6uu8snylapn0j8tzns59ett540x7e21w98nbq4vjhggkqzb66g7bgp1dtvfy2t9jlw5jk64evuw0l6zazoadkdi18gme9lekdl64g1bcvuayo8qk5p0ux6l5wupsuz9yldede583q750jlsmflnnqqlfuzg9y6ej7kkvqjvtatmnzpeghg5szuh5vfzuuqric507ocnmrr1pct78f0cd3ohavg13a127ed1hn4qhyfg2xlsr7fusxh84ct0s5cmr1dmfpr16qazutxbt7h9gcycf5q3nr4nupd3gbzlye1g27atc4q25fxrhr4akfj1gf3kv9sh1tvcr6d0x8k7dy8l4rdi299sb2g85s6qnbij1ztw62sziwfz2h1b1pkt2vnluw009obuu825rybjyyyo4kurr0lp6qt4ytvbdllt2mlc9x27291bkrd13c1d0sr5z20cneqfbrml71qwba0imlkydiwxb4tcw7078qxit7x898updv4keg9hunwwyy6zwfgy32erq5eg7c8hrc35zzprc5g9x178as4e2kpz9ghwg0x2',
                filename: 'kq6z4pwq41wi8p8g08n9ea50vk3b5efhb1suzuovvewe2611tp6u75uh6tgoxw4na9ky68xibvr7m9j1ylkl1yl32rtwspu71rftq0q3hz5ybhx2ko3hshvjdt4q8pe34ucf29ziooy32jckxzvcm9ijb53xmv0qno6fdbldfcj99n6x6lp9oxr089wzc6igdefe3pts08b2s5jzbp7mtwcijg00ya4x2ifbxq0v5ne237dw6n3nfbnok59651x',
                url: '6cnv1ucqw07ecepo8aefia6l7siivtpyo1n5w4y16f2s3v4ddu2azppkmb0puihyma8csh2p34dhuwaumj1ty40ozmes5bw4sfmp0aezp9h5ekq7eg7cm9kr0ohrii16ni3n78y3b0zpn6x5mevmn2uufu4ii80nxo29aqqonf6xqh1mnfvfgor86dyam3mgw9nn38yh6sg3iplurz59pmq3lywr12ltb3p84oebf395tmmc2gemuiqzjwwfz0i6qgzhycm26znfe70gu41gk2o6hcyuqi3zu54rwbz2rqdqlvrsuit2crnihyx4zd1uu79mwvdpdadlr2jb2zn9kjkjttbmrvic5e2ysz9ow7i7e6fy9mpyokl6l2yk2vagev5vf8l3zy75slr3dzssmrvx05mc8du73sj68eekrhrzx5c2hvrpsr5pr67f8fb0c2fj3x17p48zk1rj8yflmzs1o7tv7ubnax8ftuulghcz1gb8s2zx67ddmpwzpr8refm5n58qpehuggsfthg622m7zpwvrs5d4c571s1dk3yku5m9nw3ijorpoxx2iij139yxn176ti9futraxysbnk3nxuco7qyzql7wdoxsmwbjehrb4piznejfx654gjcfsxx8qn2frxxxdod107koqat2g3i0pb5ic8lwrazeiozu2dhr7kpzc5gfr491uvp9lnjw94iuz2put9wgaufd3b44boh6vnbjc9huhdm30xr9jhsu1o3hg90buzweqqyokbb69floyvhrlyl7it3b3c5udcb3ge79gdoyjq9whkikskqv692lpp3krf7i9ojnljslbbrygumxd8ro4jnv05rqgs068vaew3ijmhhxq4thl8ra23t5b5l8s8vhlrp560bjndqw526wsvyl2sbjv3icxxrlxtfuj4xqsv87nuzavqh32v5rh3nbsvipxrtjxryp1v9bqnc8ifctmalkfvrzhcpoemyf9gwget3v0lh0jor1v27w285mzi2kf4wq',
                mime: 'btdbna7jcbg9exhkv0cxictsex76zlf3z8dfqs36lmtcymupnq',
                extension: 'nlfyna8zpajddnalxaugbym9incw6ronhij8unmb4vj4jofcbe',
                width: 288357,
                height: 747240,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'la126ort9wpxl80bd81yzz9hunofcbkr76r7k',
                name: 'zbxu64ewr81ldhxyt47iwvmu1qzos4mnstshtahphwluigmzckq6jfergria9ojfv0vvs3sdj7paj4ws4gac3jgk6jrrzfk70ivsnfa7gqm4q3a6xz5ivw24n317p80gwklz9rqlekqsu7ll5nn3pgpfx3gsu4yhwfw8qcf4ktwazryin5nmrde0uhk3fctkmgt1sujx9mn1tr6b7unaove52kct36wvs622r6vzayo4vltwyzstqbkf61cf25y',
                pathname: 'd7g5m36kl2mo6vzliauxfognrwu0zudhyjst6d03dyqil3ecb36jspqfesvhyr4mmgt8pq8oyobj55owzxvi4ywiwxs31x9xrylwo56i13r10giz2lpi2dt2lt409xw4a4zitbxe2a77l57dd4pu0he8nm30yhkpfcgiw3o4pjyap223i9nyi21pem9oe4rsj99yjr16gmgojjvj1rgvdce909k8acic0nacdp42qvs1zqti1tj21vcyuklw8n7rl08chwc9w3e26uy4i08oywcknnjyvkn8vkw7td96ioq506t7pcfvffixmgociv1wt7z62vo0d8th6jynytbksnv7getiv3nj5vggmons41sqzbn9rpu531mggpy9iirbo47u7z1t1imjd82u6r2zodtuaiu84oqfyrezwhopggq6dsnfqanqrj9z0ib7ws9k86xa8y700omzrr2md8p5wkebj1bgexpeih0xsizhfotodpdpiro2xwr0wkz180dzu1nss30r772z9hdr9e1vjkfnsiv4jji8wcjbjw4dm7trkai94xr6bz4xlsjvt69j8p7dkl2ojdixc88kym62b43wmthhwuk0shtpe64ienl6vf5jaxrsd7mp1x219b846xo1b3sfuyqzts4zuisdq8ku2sc0xt9z6dbon61iljz7d6kqtaftt05x8lugl0n7zpwxd7zfldoyuuxv7h28o56v8bbo7p55ydo4bz1jdl9kuikljqwlq4py5olaoedgetclkft4z053yw895mjaalhjn4iurnj1kwntq5t7y786z5maoqg55ixhtlvs99rpb0yl069kmo27s5cg57qgs6wso2nxzb957egg5ux4csuyq8qyb8pykwyqfw1s1u8ggb3mmq7o9zqci63mcr6b50snfn6xngaypq58waizrv2j70pzqs9zic77ntj99cdyv7nqml56nvdu949sr8yc177qrp2y3rqgx1ohlkf2qbd7goduu8hyw09pyugf035q',
                filename: 'jxgo8n96yn08p9ixxfinlp8xqsgx5r87yw1bov8wcz09sefcd0ebqzxafmq1oj3pm2o7ivbf2suzx8wi1m7c58kzgwnan6e4se72o9axnzbvktyg0d5cbgz1j582asvqmowha97ky1evcsmb8bgcu7vutj8xs36wbypwma8fb7pkjk369jx3b5movw6pmc3xrvcnahgciu89526hrpv98px2wmmryxjpbrpi9mrhxnomgprql9is544kvlqcpgu',
                url: 'zbqlf6goo87qucup79oftg6g68e43yj9mdwaj0id2ngnho7jr8u19cq1uzmtxy1yeh1gfg1dnsceyxscgpb6sqm1nu9n0q6odnc1keonyk54vce6y42vqneal5s4hfdyluuxpx3bqg6jmhcnpu8o7ikam3v7jj639zf1snjjnje6knjbxb1cngp1nlm5iejhttkr6t8b5kszxrlej65zm1jzkopeg3zm31rd1v3ja98g17913dsveq08ikptueu6esktop8fqooweweqqzxhj27xo1ajucetr8eg55wg31zhvaik5t35e70nqtjbjxjn47g8h16u10uvy2po9nmp7thlj9k9w69nt6k21u2q2gw29c1fei39kug5isjvpmcl5jbhsqhjzayimld6timo876891r2wj0a2mm58egjq1c3nvpc26aha11ihxysu7uh7n7j04rpazwhkku54yf39uqsnlapj4ub17yarmc9spy0b5xpbujtfuytbkwl7j7zqrre3wfrg4qcm52rq12ma7d3pladjen9mjwh2u3tpshtmj95ezasb2g1s059b3s7ypmn89bu7r4chrmzf0dx24msytqjf060vpz5u7wve8dw8vawiry5kxeh4yuhpl3wr3ztabj77hhpa5zn0mvn9avwmv54quo1fmmc1bjyj5u9hfqs6to9bdebp6bjnn3uxx8lqz34wzi3afxqhbblxmj0x4dpzn3fmnnpmx9ly8fbkwx7d8vsne0x827u9l6t4tqwohtbdpof94kfbalywklfk6o5gyjrr8g6yzf9xlcfh06r6g2bciorfvbaulxppj341iv87k6vnwva6n9chc7epehc65joyr5ayex8jqy7e0c0ln6b73qereimxcy1gmbx2gqs4j0tskd1onbn4r3857ou8619xv3glikw5gk4ga2scx1spd38hsdwn6ibozmf578brwu5pquy1zsmhtbs6bok1eqszp806o41ud0slpuahfw7cobyqkrj0vnv',
                mime: 'eiychbbe19on0e9v9yf6nwl2t6l2t7xs4nsgce6p3w4kywk2v0',
                extension: '79zpcse3rp5xkq5w9vpbwcol6ys0xzq6cygy90yyisihdbybk0',
                size: 3839973184,
                width: 187187,
                height: 139992,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: '0g0vaey7z9zmx8s1dzyvsh52rr3rvmx7stvzrfdcl0zxpdov7l4xvqe83u9uwg5d4buula09ua4bh1peglqp4pnv97qekdpa30rs0yqosh4dkhfwl6u66xv7kf1ni82q7pgm8mkpxjx1cmqavnhjdts9ewegjl2qsusnds39vjmlvkrk2gkcvyre462kfzm69lf3rm1a2a33td4juvgmvfq5n99a6hkctxg0kpt1oh7v63o4okrfjw7pew6ld7ke',
                pathname: 'yaaz35vsvj5xcy0656vmhv0qvywbq4e3yf1tn5un9ga7d5dzn86w7djgm6hs14ubiahz98lrtl4lq4sb6m5r2lngyduhatq453hupi6bg6260l6d7deygk6ex42qfawu61u2avqms3huy34lxqjwyw9pe376q899i8keivs1x28n72sojlpkjkngrs986476hv0mhu1mpddsbsfzaty9pgmys3zyz3ntv14vzd35lghvvqgson8zfipjfb9ocl1hgtvmmyvupeb1eegh2s2o3h14780josy4zmx6wsp6o653rns0naiyrbkyglzkc5b1jx8z1gaoh0g1vjtb033ycodef4szyqcuyi237q4r11906s2i3lk0e2myq8gg7nej2ozmn9ecs56o8k1eozfg7ey3w66cvig7vgue2izfswjjhyxelire842n2zlqf66zmaearamuy6m9hbhvkal6xdmmmfvyyx740wcvw5e7gr00mybvt75jj9dm5hljc9484aykjulmtg1kp7qhaj4p79bjihgk4mejxvisw1sd0r89ohkj9wfshxpqr56kwibzb9xp0f0j9p4traw3v6empexwbhi5ydddm5up2uictm4ydcx3kur5nikphka88fsrg0ikdnyzwtj6x4ewjna23skdz45pqorj2ar64259r8j4tmbd6c8in8jlhp7pr9sqhi84j6y3a6c50r7rd652g3s9lmq50p4gwcrkhaxqau0ra5y2rnobomcryf0gy7kn2rrzvk4d40twbn6zwr563z3wcshpn6i1nk0pzt1lkv64jxanl4ya97k6b72w28g7gwqtnhqrmv4oesjlyqp67mjxyryttwvb0cr5li95c1sslavvozvccitg50skuxz8dt4x1a3wnwur9a16mn4d71he64y19qj6kjqq4w5vu847vlril4rpqvrodtx14n9ifjggv8cy519s31b0aorbpwx107buq1pwvruqx0y1j6vrcxwttwx726iafagfstp9',
                filename: '13wgbh2ks0msmi075tqfihs9feg8s32043afcjgg68d0pz8i156do1p9oddnv827yc1tsxjzurr76kfn4egcbykahue7dsahybnucecup0i7xdm9vl0q59kxcvd13vme9qtzzyu384uus7tpk0bxth4psr7ph0r37ye550gga5wd3sxwef77uricanfj5xk6xvxgs1r26aevvpbs4ldx2c3vrosp1kqqtk8wak9jvip0pwoo6404ub9scd0hwjw',
                url: '7mcgdueosgd17wn5xtv3f58yr4in2n9aujw8kmw407jb3idp9z8jwq0ki0t642gvc8e8bj28wbx3ta7wsn1fnqu8yp8nnyfrkl55r5sqq1p7pkn8a91kewa3xc871ynrgz31h355zclpb4y8diila6tfr0p8na0819yfnosyfy5kgjiwgyp5boadskxtfole1fz5547mcm2z07idrk21c6ovb49c9ersh8w8i5jiddtgmrmr776mtg4xtu0aes5jpzbiv1mr47zew2t86wnbaz1pwlqcyvzhrz12lq60qwl2297cxw3xyv5gq4ghnczz38wkcuco2kze8s7918501m9lwrxsiphyyxoqjcv6s3m6dr5182gpwur17qcb3qrsszcz1oqyo4mc635h32qvs014ps67n4f1r7l8g9xbyuobod8xngvg6064nbwj91bpz4yclt5irtc996ugy6bhv56jd8e3p35nbb8da5fvksuumee4m6mty26ekezbowsio6r8pkslk7h8aveo8mo94nzovfsixkoioc9xkghsxk4egq8nfsowg1ayw5462xk3fpb65hqs6frxrup5fb1aalygqxjruorjnfyke9gv2twh95dn8u8ub7m2synl4ry1kguj4udb5z08r2cjawvamnbg0pbrgmlmdm2h3fno5dy00zizra5xhxgl0qozm6f4l8yt0oxr1k5d8n25tffbtdn50or7mf7cn3szkew7j1f5b47sbci9y8jwdk5acpkck1b1ekc3ykunzavoysfnqiyarkzcwmupbp5d6huvbzwsisi44i92dtkwgro1ug6brvevuisv8vzyizccn5msucnptpnox2enl893ctp9inoaafim8o1lyadd3gpa5br3xh82bg3tnmzef0qvcea0t725i2jm7tw58raog7o7m5j8dlflog75asdp4eyh134xr3jfvx3jbi4387i56rkgftfwdkl2ubr1cfd5f0h07j7wn9eykw2ovfwdv7sqex03',
                mime: 'gb1dukkq84d2vossb56ui67rashz5yq5c2md4qnxb4xepd7pfu',
                extension: 'p8hws4wddnjqm1k1bdk4zgzx1fivf57517ezx9rs6ib6c8zcp7',
                size: 3636731173,
                width: 751931,
                height: 650808,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryPathname is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'hf6madamjkniges2wn05t4crk6s7rv83h8tbw760mrr0347e7papf81eo2ia6dospe7c7rs5wmxau7h56xzh8ntwedynsncjc58t847d1flp5uifpt1el21btlrzlhkcbtjanx8dl7zyb2gjkraidbcm6hfq93eqp29nv5co7l9u8q0enb3xj6a8looy327ygo27glcjg7a7s94ivtwrv86i8oxd0d3kg0rw8xu8gdn7hnqfmqf9ushsv8321q3',
                pathname: 'i8j22b3sfri86792zgl7dsl2ys4xjiyktalewd1wwggpu052dbcl4m1wc11awy3nn6cml8jxecyxc6b7lnavovxhidqsmh8vi74z2qwz9t42o7giegliy1lol3mjwz48arm1zkc6zxdsfstv3xodaic807vcw4ntdji9m5infpf0tgoxb1gosl5xgyoc5rxlyf6wc9iq171xj9ubl9vengf3m9ii7n37sd8r20xhvf0jsc2eutqst5wvi3yu0fch4d3rph9r313x55xjqx61fa0f4t9kgt778kgjt3v0t0mrym358mdt1sou38ikvazwphptxwi4kmp0sx5m1usdvtrjvf2h821u3azxdf96ttxz035dayl05rvwqfbrpbg6c333s2trs11ihneo9qx6a19hwv960xzjvzi4qj4y0vyj4fih4r4uo5rgz7623xxecmtbshglh61o58htm22fh44anmxu1cj1emwnp9esuijwuguvqfjxs5tps09b0akub57c9ujnewt43fp32eaxxsxll58gjz1i8l9j47pxogt0qwhxrg4gu8a7nu75teecke8svi9u6qirylu3ge79l7xdpvc23o29yxb8m1w3s8hnlwvmdl78wp4x1q0eop5vcd8dcaldwi4eaxxnrvx2ex42bwvtrf52tyw0r02ntuptr0y3gh74im5vbi1bd7lvt1txfx1aa2vpx9d344ic73rn6sqasq5drmqih1rttq4o9tb64xnl83x39wduuvkyi9y029kwrifulypd5kl7dygkm4pl92x25ca56ifj4fkyh2g7dgd1yyxx7kq47scuaa4af184xnb1tbnvm3tbws5bl4iqkc41vffbsw34hzdr7u72nlcmaadphck8dvbzp7bwpv63aphq7guetqqdrfem7hz5z2addu7pjg47f9v3ae82nnknrcu88ao9466byrgwjxpu79qg1zukvd0jrhr6rdut128i7uvmytf7mpgri13k2z4920p70gf0x4w1x',
                filename: 'octqckae4wudf443q0ev391nmt3w0nry0ls5j2hjesbluri864zscvcmrhu5fph0d9ih1gflu9rzp1af54smnyjwhc23drx8n49sey4auyvj4ak3vl31fn0kr76jbg0qb6sp42ooaor0ctu28a19oqij85jy7np4wzl6cdmjcz0ukx6uv9vruz120832l5hysyu8uakwnooyln61vddiu11rvr8be01to0tfc8yussgxdmdtf57h87j3gab5nrs',
                url: '134kyhaw7lfloa7qy9fsvg0ukbc2t4ou8zwjg3mkh88q0guhhkyg273m60iohhe81fkjcmir8r2wez96xlf4of0jlb1nmlg8d44hxz9ugjkuwza0ug17hdos2j3vk7g9csmp4ttrxyp0upgrjcsltvkkw35uu6ep6f18xt56v95ws0qbr1c0chhk8zhig156ipzuvcrd6bh0y16pmxrijd6zhtoqlmytd5nauknvrhsgprweiy3s6jl158s8cvm2wqypump8bamdeox8v1mmg3eieq7qti2zsq7pob2x7802629dcfhmsdqpl48no8qb6bfechvuz1dtarfsai9hjenwivqf7gddnttnnfzbj6wjjjwjpe2e9jxn7kd16p6o1n7hrywyu1daidiksi0gt7xip11i5bf95y2sh9w5x7jhf3rzugrhr9sfah4rl8lfazbbrvu173m0u22og1s83vpotgew9xrxxm6v6nizz9kuxwgug4nidc87stx0bxbnde7zaa1wcpf82h1n7igdwgxw2yhze4drm3l3q75vggzib1sf060i4lhb00wct5cp2paz0k1ei2zj7y4a2v2zbr403bma3a8xh2ocessmuwtytazj8v5pmeptb7l5a3o8nwxgarwczrnbszej42oavbq93qxtr6f0zzwkwkc17gqjq77jbhfl76b3u6d6qhy9gqggg7vs59ipzfbz9wyg27eo7c7at82kt6zo9v2b6wj2qdk23qef95cayb7gbcmjx0dildlzykbh7rx55522f4u15tfg2y2viclpa69brm4yz704dlicuj38thekj121kxrju66qrzy5axl8kkrqfzaj3nbdlkzrgn052m8o8j4qxb6t5g337hi2p9uccsxsvj9lb8zy6daochmd92iapv0y343nsxxr7rezxaqevytg5e0rv0jcux37v12py2mh176vx4w7wkm8ou2m4y947xwxa8asom6f7ec4zd3cqo49i6ppeatlm0kb5t7zudc2',
                mime: 'aqgv4181lm1ot73v8hq4cyb1ro3c6wqcu4y1qcvhg5gqay2v6p',
                extension: '3zd28ofvz8cews560395yykfceh5l74xko3epz5ni89x79ytin',
                size: 6392188267,
                width: 626795,
                height: 708530,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryPathname is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: '5s5nwwsvy7p8grclkckawn1susayjutee7r1g1tfygl7ovxca9yqt66n5dlbe6nfzrqxezqt6ffryj86p4v4pfdrh08pqn4vhqacbzbp0fruex6ah2z2nlujb78lm49wg1jxb16b6ijsw2e4keypjoswhh3fsrqq8oqh25ya2s37oa1fwgrwz3ci09fpmnb8925ygrf3hdwunfh2ttkxd5epctkic9dmcio5gt42own8opdveut0e6fafv7w5pn',
                pathname: 'e8phdmshrvkli27682trots8pi8pc9fb2710potmntof2f154e3b5pwoow98ivy8fvs5rb2i54fntiqdjipcnqamwe9zix7ioaj7uz2f4jl7msrmp3uoasje3yqoyqzdk0h3hk6uwfmnhae9h8sxz78w7pb2zw0yb7ebln46r5f2fsymkdf4wownfebrq7jk8ks8f6vdv1fd8r3pj8y680gln3e5owjptulix56pxhehfb4tgepiizn9zkbogrwjjexhyrc8f4id2f33zemkengzm79enyfwumd3zt829f3pd5fzsvgnrz9bdomv5trpkvmv7ft8xmq9e89nt04j0s33y4sitbn2309vil9shyau9wauip04wcakoxv1m1rx8vaoyx94h5d3e5qjtj9mwml0002hpynpfe74gjqhy5nfuz63f1uwjfkzj304cw1h58rde0c5rhtl3x3s95418thex9kgcp4i0r7n995d5jkixqfqinr6n5n14ya73fkxi9jjnl1104rcsyedtn19s265pnj5je3tfgoo142yhzwfht181dutm7d30ppc2rqxeg4esti8jiqeylzphahcbuyd4chacl2vni34hcyw5e7w8iwxr45jthq223mi4of8swrqzynhdnfvaomhqkvz5xgob05c03vthf8fykmxmsowni91oux0wtf1yusf9uf51j9nvw6g9bezres9we48hu54kz94r2w3rplifa3eww53or8nu6nw69ktm2ur1bm9cxnxrqg4u0xnmlx7suguz989a6q08nqkb6xd2pm1qycik06icgj85m6hpn0m2dg285emazc0cq7qu6rbya1lbpobgaz21srxe143ph6yumx8qb41wilupr1bq36c2xbgkhcbg2y9zi6x8bjwm3crjyu2ed34e3vsp7mgh3hxp53gjv7diqh0wltbpdj92oq4iiqmh1nugk3e9sgbgb7ed2ivg44yfg7avhmjdc98fj3m7hgox9jpq0tmbm4r1e1g',
                filename: 'b6znd13rjudsk9z0pdqxbrkybhytv8fu4tpqrwiwg9qs71wvcn7bzwguga70n1fqf63owq7gmdfzqyk0jhg6onbqgdbi51fud084stjllpz4t3i6byais9clwvtqevxez1r9qsytfy0nuvt99rj459i5hulcy7m9s63kqdgohd35jk0yq3jd0w11kvmr4lcaii4er6llbj49izxlilsrck8e3j8cvwdk1zd5k08036w8mzmhl2cbh6t90a0rxyb0',
                url: '2mvjhdsvle1sjedlod7ea2vtbxcfp0la26v2ciod5ce6lhbpyr8cdrz9a8cz6hjqfet7gdwwv2gi7re9hb7n81k9pak6hvmofxytqhkbn3owtr0vmrf54uguq9pwpi7jo9dkihtzqyys7urrnjc4k0s66lx1zh2t2sgvp81izozvf8lffu5z6vwg7wt5pybwjb3zk3v49xklhlr30ox3hxe9pl84la4gjy4h0f5djmne9g7l4aifaht06ntp29cbtvsr5j1o73sjcs8wjm4upevlfceib6y6n3bd9tf7f5ykml18kd54qkwzolprkivj3m7iajp4e91vlexqwitsjzmgp9dd6ktljp90ny9qka8wyj61mnzj7i367cn8uptq7txy5uwm6fd8g7y0msn33befa3lzyu15qjkd0p7niqag4tef1v9lkq6dirziwcvns4mxrstigcsvmcdtospt17m4m7a7yrxx0zda8zmp68s4kh4j6vyiti5t9m34t9gwqqnbfe812760iisa2pgikzo1qy9535h0bz5xzzmrdzvkrlh1kh94266c5kdwx1z9zpbf02c2qf35rl7ee2gjakjo95d1mw76m471xjfbp0lrv19tq8uvu8g1vntmm52eqtwdwb9jl05rjb13fbayqf6fy6ctnvhnibk2t1jgpeizie8zetj1t1x1mzz6sfiywwwqw0xa543sm29yctzj1mkt6ga69iqj716e2g8ozhcdd9s03m7blg3tdqepe7gjh2yu19e93borahvhgrmchq1r0d8lzqi7h9igxg6qf0h8k062hbnk9jgvsr3lrwt5or0bywqzpn98ir1brpa7zn7b8od2msjl22bykx7xdmfbetgtw8w12fivpnqps045498qw0ierjjerjtd9xwlo1xpq7izmluepmyrglbmhdl9zugpmyrpmaal1qbchur5vtfkrxiwchrt1z70979itmgm73pds35f0x7971417l6xxekpuibzzmvt0q5o6jmx',
                mime: '3gs0t73qxir1zzgclibs7fkbwddd77u4mzyz9ydpr0xq8jrkbm',
                extension: 'yhxlnvx5e85mabu7e4m1f61zy46xxj928h5h18vkbg6pgg3a6f',
                size: 5064439612,
                width: 441585,
                height: 163964,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryUrl is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'l87a6xc7qedrpcyv0kr3g4mknooi6xh0g04jysshzvwqlka1loiu11kgxe2s3zgzdgch6dox2sbc2w2s1k2ip9goa0jlptmi52inznufpf5hv7ckmkzthxwsahx71g5lzh6dwj2qp91gygi0huoj4mecs3nvo9vr1zzzuzb1u8ck9w5415jlv9ue7spggyes05ko556lkt97nc1rlmdxlq8hwxiedy2n6jlqxq72plfj72vctqt6wyn3m402pc8',
                pathname: 'lkhm5lr3lzs108tg1qbszmogqs20i9qwkchl3j3z0aqhy6oju8ehjo1ldg4wdndezash7nja5sc4bocmp1jsgc0lfyensl1vyzni0dailq6twihmxrgefe9d7rnkdk5ue92u48scbtra4z37e10t94wnxm0ljhlxzfk5grrvr7nzrqqaycfeig0tp1g19m6t0ctx3qkyy8i24okzvhx0undj4ueam7n8iunwywqcr28f7ii6df9lymw53pn6tjv6s4gn6ldgy4x9p6etmqm7zoh7e3knavkyiu2xaupaqov4h6aw3isqw19w1t8cq1471butp9zqnk3wwvkkon177t15axltbir4lpi46300kaba4ejslz670hctfdfoaaldsrjxd00pbi7qz7nq7v08qxcqzhm1w5eqv2ep2byfcsdt1mmeg3c23p6t20jv6vyv296or5s97aft3b13464a9q9m8cvr6y7vxg5wnr1u8x9et2imnco9fytu2zcvsxdlivtmo5qablqdq4exe17t7el988fo4ezq4li7e8m24y299wbtk3ut3p5fi4yutjrntms33jrvwh2r6qspvsgafsmk7rrapihecnts6iqumy8npx1ex5vhdz9kq7byx2cbpb082lou86lzs2iakgfbezr7q1bjkrqrdap1bdd6i7s0uhpkyz3jazppahm2ol2dfr3qmfo84bfl1t4t1k56iteo2k9hr5vj61uhql0pik57cdnj3lq9jvyo5ovtcxsuec112je1we8k3u83xhrll9sbtn63bzbb1iwvsospe0x3c28o0x8uaa9oebbg0wth189863tsj8uzf71jd21sovnhl8dxdudv1mb08wnsuf2c0vcdztz39w17qzybv8iif9asdomvx9zmbjd07kw6qftz2bjnly9xzx9clqzs4v1kpq8kszc1io5vybaz3l8krlmdg7rdn4fvzhlw9x5q1w9gxa2qx9x0rj1qx526dfwnsvkd3o5i7kpf1r455epq',
                filename: 'adxmnnjpex3d2nshnc7bkxd0d751hx8igrvfl70cd6uynsn0ctgdmlxukoccul8wux79pijpp3uiim8qp02exw2frz8h1cwwo1qkt91yhaues7o91rf4bslhsliwjvr6tf16joqiyjp76w6xs7hixq5rd3pz1xvki1j5fc9ny2ddyaxrrsht4dfyoswetfbucsem9ejxb17n21v1n1jzhs23fspusl48vz8medzl0hqfs1m8357obkt68ebivhl',
                url: '7s3sdwyz2bidaruxaujhz1cexe20z9iocxgfwh9x15dwqoquiglorwnadzz6xicdicd6molm0cahoh8r87yvpng57hg6ixgymotkcoinsp14yt3csp0oatpcne44m3quv60tn97yi93r3tiklqqu34a4ywjkfj3wygtlifih0xhusb5b0tdsu4b2moflmdrux9we76f2k7mvmsugiiy00or4yc69ufsas3o6cy1eian8cndru7wyv1y2s8r4pc4bsp2vwcl194wb6ztyn757s80r9ym37x61zsgj6fsrepuyux6sd0u30pivlczvz9iqq3itbjwq81ngb834zq8ealo409ac8hfzdn072n1u7zt6loa2esogzhl8j59d8xvlqoqk5a74iwsp29koxnbfx11913s36ad1e6c6swjj7rzle23uym1fgxzb7fe3dpgu62ql8ekj4yry289g5ww7z3737qsnlk0uxt6a945os2aal5f9z38rs8sw2zs9gc0on01ovk8srdxl07mq5o1f1o2c4cl4cbwtuelv7f30axd7z3z1hicz1kjayye9pkjiul78q2mx94f0kzvoaov79yuffvxqnv7c63l5ytiz15c5g9lok9x5k9kypt13ecj7ez0ho6ag2qflplu1u7mkx74qbugld9ov7zvnk52lemofnqg3rf5x4nwrdsxovh87ec4rqeug0gaafwqp4i1ijdzuq89sbh1908lsgm6a6vs7em2lrkc2zktl16e88ll6efd7q6pf5twimkdxk99zzfeelxedwywh9dn38d047xzku1wkjheui4eeayz1rgtvzo3oey6705sryc6nzovqr5q2tp3761fkaftod41ciksdqs7xpzbv0e147hgomdvhyvzxhxifimfrmul5wu32aaejgxj5uu8u685q86bcdub3g4q68717mwtzm763sga6idtz14rj71komvwongad6ig3wfm41n2hqvz6jvklh1duu5qoxf2pad0q6ahgvjgj0',
                mime: 'b4prbm2r4lau54qaqdkdc3pa1pmqerf8ozjaojttsd4oy8qmpb',
                extension: 'zghnuebmyt83gq8v9b6611is3wpct3so2s4jk50kg8tmdi2tkg',
                size: 8425933436,
                width: 498473,
                height: 840790,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryUrl is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryMime is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'm03l9hv1p9s9ycob8np0kl4vgtrhjwdil6gfrmfoqxpobn8pipx3g0yzxv4469fre8cxf7yp1u6nh7w3v0usqc8x6iv18lgf0p6xuk989flm66720h8frhp7zjk5va5aikx3d4jy4cky258ibtmtqovy42ctvolijdn7z4pi1hoy0wpudy1csq3hwrvea3jzs2ucoqf0e5gahwz5ayhoivfo5b2s17qmevcq2qqtygg0sj49jdwwynncd5zpryc',
                pathname: '1ataml09uprle1mywppmu3blb7fesunm5d9tsd8arx23o5s1rivcttb7iyu2sobup2gmfqgrqwpbddxgb0uriwj1c39rujbq1avs5lc2md2cplb5d0lwfv0s6o3d96rkd5n7d70j1h663vs6xv2w1kkbblch1aplkglbut0mlfx6z42wvo3pajnzvb4ecaddxp1g85q4rag8flzt2ie9z6u4hkvvj6dop3h93vs2seb0t2fcy0pcvy25m6qkwa257fl6s1s1w1ru00lmpqp17f8ue9ypf8m5r7c6v0bc286y7fkhi60gtrlllh95qpfr28q4ppvxgfqskwv7mrhr97u3ejy5mi3g5bynaajkoe4c20lnula8rsloqalwlv421ff1ryvgkutjg5wizc6ht8puduxp87z82yq52p75mi2a9y4vgdyg0c5uptho6a64p4i78v46mygsezl8c3yankm9r9b3uh5m2owxkm0f6uuldfh1gxyic5b0fxmwzgrc5j1jbh7z9o2je7lyry144o0o8kk0148mkq2du0ih2p6qaknto3l1m1v7awqd8t67a8az466ss4jb2a7k3xnnwqd3y6ghbdlshmr6p0bonzwv1fc8sfow6nqf1bh5cjw6fewbhtrdmmjotzdi0th0p8r87vtgvvmol6nzcd8s0t0f913xscdkgavqxgqml435xvdqj2o9ipdn1rzkqr47utxbrotyqv4aq09xtylby45e03xi80tvd9hkql43g8inb8zhtdnj59wdquujez002l2mb90r9t7h2xh1i2valih6xh4dck67wrvkwixx1oyb6s05a9lxs6wbgqrylj66g3purdvsglvu4t3bkat6t0u1km5o4hvuqwhjwm8kubyhde50zq0vj15xr2605o7xyk79i9qwqp3ipsp7vp94cju2cysd1qyeo2cme0mx6yc71kl3d7mwfqwespmp3zd1l14uqdf7q4k1rbex74r78dujvlljl8v7yvmbtd235wmt',
                filename: 'nvpezfmr3ivrelc7twlvwlytg03rwnz4fc34akqyz8vi6rhgox2iryfr62l6c18l8dpgjd5z5eco1krzao2v2wfibx6f840g3k8lvkvg855ce86lejsq5y75gp62qe1jjajmmmk5x5tq2rkn3rncqx22qxf6j26c5su6ol8fyerm2m67cgpdaujrku99qgqu15hx5zyaii3q7hdwax0c97187d4jvi6361lyfs8sxvgkn5lra419qdu7ck7toee',
                url: 'zimy95hvfgrsf3ncxmt56mbxt2qa2eylqetil3n6cknmvcopaq7yef1i4597n04jf9s1nqsydhzkat4oqfancc5jbgmf9t9ses8nhzpbvj1bogaky6if7z29wxjei8a3hwcfuxxof4al6ub0n9zs2d9znmc54rok36vah52lz8buhku2l8d230ncisfjtnlbm4v9usd48regdacpgbcosxei5cim4n70tiayzwigciwaayfxajwzs879hgmoclcq0nk3e7u52exo7du1yksi225kwx6vj87aob7vyia7v8mwnw0135tkcue26sic44f65d8280o3h38fhsdne8g8wqodxy4wa2hkavyt5iyas2r10gb3zc9qxxg85oe47lm3rd77ebj158tlah6mrgbvrijqnahld4o09yoxg2tkdhhj0z203uvkwr3hrtmju8pivcxges00n5yp5sn1g7twovi2f8icybpme8r75s6haco2m8ntss0e7okd832uk7um8edv382ekngwrymns51xcila9zc290kqazfrdavh5ajwfb8jz7s45dc0uflj5ly51u97xbi3dbe5qycd97xtaneytqd22ayp68sz2hv5odrss2ddzpaqil7aunvs6cfu3yoki8t2ypynn1urvi8p55b5d0jv5twb05t31lq6a0guhfvfxwa5zagi1tn9tmzdyzv4qwxz6b8w3tdgqw1roiloip7u575qqsllfcw11dy91pntskplnpxj2jijf4118324dqq7l9jn3c2czr7oy950rl95ti3i0ygr5c16dwiaa6w2nrysk0ai2bv8rzi0ooarwfqp6q9bohrxq22mzjmpab3kp8zdzl3ar518p2xyrgsvo4v77sgclsi4k8gt6fvhfmx4p3cedkfb5oro4z98xsrqlkpxqgpw5duxs9gbdpz0r5u86htqt84ubilq565klp3zcnowyh3wxnywuxwt0hh8zvsw9tq9njjmxnfz5go0y7j0e6mpcwg7crok',
                mime: 'hscrbxo85c3pgcw8pnk509jhcuo4zk8ctzqvyd5aiut8mi7jvy2',
                extension: 'wbwn4v7epx6x6yydbaw7z5txi5d3f9m2raxchuw0ck7b9r599b',
                size: 7459950294,
                width: 433178,
                height: 744723,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryMime is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryExtension is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'pr76ath3vyg8jtriwkovm9odvbkhrk5ubdwson2xa9d6cihirht57fxbqe7ejob3s8ubyuu0h6aqdvmbkk7wjvg4i61veyrkdoajacpu57erqs5ah0k0o29dw8bpf2807c6nzuwtn3gn8ny03ieb8v653n2qxqcdyouklp44h865fou35hin4mkemwy8zv1dmo4clzm1sooys1v7tdthmq7gpjt9kzfl3slxbvp767ni6ynvnzhqo0zbncg2sa8',
                pathname: 'v6dv4inbgxm7ue7nngot7p60xwhlikd9nijw7y6rigv0vkqs61mnt4l4i34rtjyakea3sulvoryymt96xxoahrin4vf6ts4zdjnep2dwkrtl4gx7ll5pds5pbfbcwuvx9f6qlanwrhcd5pbltrn4cx7j4lny67i9c1b0q6zkbcq1339esevbpr2lgf2kf7rtvzf8fbhqjleifi5kkmvgej3u1vuzhjzlxxi7h8entoxa4t6m005lhd0e802z9nfp2zavittlruike2drrkys9uxksprb4ds5u48htcxeebv01o6kdqby6p06f6fpjqzzh56el3az9f5l3sabj2jx05blm3f3ninqbefe6cifryhybnxnyd9nn41wdpx33ni9h79sazylc4b8xohomdrzp0g6aqyl5qnrxmjejg86ysa4fr8zb1es9n9wbr4bun1xu4g31qczv5iyeh9gweujl2hcqzf50eqb1esb43anjy4ap4u9n65t32civ60p7ixc5fod0sl70nrkrksp3nps8c2kcgrl915p41yurqn638q7dpnsgen3sougxv65eokhyqvxg343a84njigjkpcb9rk5skomhzgks69r1da73u5evwt4nmqjrsdsevpyeyq8wici2h5bp8s2c8c194jhfbzkey2n1nn7wmf9pbt182j4e0gy3xiok49342mqw6mdzfbk3v6tfg90emppgqu0eartumsjjoulselvnpl5ow62uztg7fferhv0p74vzsnu7ew4p0abkdwxrnoojc5wevvml33uimwf5f2kx0ey1x788bm8ga302yh58xf2get2qa4a7fktw3i6deo7c6nzbkrzjigudg4lwzonca538vblupw81gtrcylpx7ib2doxpri3jwsg2cxldbqjfnm0klep1flodj91765ldyl7rqdpouxzq4gy748qhfemfcnalq032tw9nydlr3ia9t68ogal3wg2c68pwui318krp49hmtukgffja03rrbsaz163',
                filename: '68qe3zem1x3rxw9dgib6wg0bib7ya8es5gdcjutk1ufdkcsutajxee75q0k8dsmf0oxdxkp7y8u8hwx68og1yb6l0w6zuj1juvouovse62zeklti1vtg6rhr5m50lb6oo9469qaukc06ul1jwv9udv2e6im7r6wdhn7ofud8nzz9xwcloq1w03uwd5u5t6bkxti53p4z65ijwq6mcth8twhep7g55hvk9gqyb2vniynzyz8qvdjcjpm1x838yz5',
                url: 'p51yvxoayt4a5elk54277qoj0qyxdbm19p13piajxzyn32f48qzdfad6wcla0niccnduvt6voq55bbrjr5y4rvca22jwflzy4kp1mdbd2zvyrfhbgq5rlx8jdc11k1gghgvr0xlzfojxpxpr40mh29mbie527ip17topbncn7l79acir3ay4qdrv2wkc64rtpk5nvewa5j59d3pooay1yyaix6b6xo0ejgq76nifaqzfovjykxi470nt3qgq5utdfn1m2hdt8umr9nqqog204j6x2fjjc39afnpax5schwa8iij7dry09d7iwie4372w55tz6n55c8vz1c72oyrvon6g5yq4rr3vn0zjk139z4afp0oqtkn4nh574tf8q4zu7vqmod131yyw8y72i74dn6yhfjvihqo9lpz6ufelg79amoawjeyt444vy0xglz7o1r1n950mwqizicxmn63iv50ropau4q3s817pbs09y2kkp4xppuqp82o5z9umtwqowvlit7finawojetog3ih5v6q8j2at37cx5g66ugstpcq58f2axd5u2hs9yflh271k07huqj1nh7bilqcp9al9azruxsxiqtyhpkd29eo79hr6ygxr7lst4uvcxxzkh1ndx54mtqflpco35t9j0bje4q3iiknzdgsd5r5gpplyujh619kelwf18gc7l22wu17vf437ddkpo6mlvzkw97z28h7y88cwmri2mwipthnkvygs3fk3sybca6z91aff3r0tqb6flhjl5k7bcpe5v4y16722nwh8l7c4gnbng4wobeo0iaiszllbrtyyhfo1vtllgydbxwxydhefkiuw8lqg8al2sjsqlr87tzpbewfqqgpzqdxzwy1qstzkdg6nzjow113ttrgmxgt6m6agtl2lmli0u1tk4gz6l3j09bphuggctwn1epp5bfse8u1ofzst158s6athiosid6towqp2kze810anpdurheagfqqx88bna778msj9u9ahwv9ikdx',
                mime: 'j3myhig4a3qw53p1j71i9zg1a78jbxp9lhm269prvyoz12hxbu',
                extension: 'ekqfhydbf0s6zv4xc21bo1ommv8ormmop6hohxjhz4unox0jau6',
                size: 7700319417,
                width: 217093,
                height: 403480,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryExtension is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 't4wlgnk3x0k2cbq8yapmrypnrw81agtc0gdbb0d7fj7itz3mvx2yy3h5th4x7ru4v89b0hfa27p09xsja8c5w8xgmt7y2879tyl4n9mw89s0mcyil53is9zjv25xwezeh46yaovvt0mvdz680fq308cncmhzz17qrcfdjooc30xu3n3os71ga7x2wqq5ipa7oisxk121phdeh1yuoj7qyesyp3vbvgrewh6v1f4srid1xydbrt7lozdflrznftl',
                pathname: '2dc17sk1oj968r5bb73xl7eqsmj4fzdovrrk8wtva1mw4y7sjgmdkg76iqfbm8r7xwfbgti5tqoqpbtm849g6bfd5cpsmwmwdeu94uw3yq348e753g8mrrgegubjm6twjdm7r3v3qot90kku2gt9c3s1acbkdlvgik4v4loir38bbv3db4q5m9q37w8ifewuvdfz6xx3qayojx589wn86rkknpsnco7trznuhlngeizxne2bq77b9vp316hdh8hx4wrj923klae22wz0blndtin9jetjfujm4hyv8rcpnu77b5uu5pr5kkbmb3g2r6rw9s3yvu922dyjp8u5h23s2tfdcx7i6061e69lhao92afa5cavsfqwx3r23osz50nqlhl8axavnumfgxbxoxq8xbhb1mh9lmhsyssavgf9yzle80objnebxlc8waq0rbxqikl5oimnfr7t1ls1csigosc930rl05jzfizr8q9xyiaxyouocjbmjfyt1n6vqiwvji8k032q9fta3vwpy2p1osw4pgr3x7qt8wwf2uu1i07fazjp15l4xf8n8dbv9fipszyv3bicpdnj2p1i5ykj0o6diuzliomf843jyeo86iu230up1cyzi04y0sc2fqzwd8xu8mqs2bpuc2dojrc043i2wfm98de7e7ragfft8vouokoveivdest9mrbxdwsfh7rmk0kylikf9seny64syh1cm0qxe3utx2uiziw2iotrf25o2wfc4lkneuvgz7nvknq9v5i5kg4062jo05szk49kfferjik9mbv9hczp92ihz9k1yj6wy086ymnj3lu8zj88p09tb4uht84i9nbf6n6y7l7pfhn2hurcysg53ui3x1oun2wyblwx04isarbpyt4250ec44bkg89y93458t9vreb1jbclvque3srvb0xex2oo27dc7wk0pd397xj2ts43wmo1p0a3ghazeij20s4vtxerl0swcdv9qvp2rxca0mujffme7qjd8nt3q79a',
                filename: 'czwe9gk566g0437ichfvp0walblp5ph9k5sv4t1pq61ch8ehzud14zw2fao5ck563iv5o3r2q98j2xz30yhtdnxm3ckeylzineh9469rxcudsmdxhwwimfsxul0mjt71k0fnlv8mam3jk2nl2wrgj1njvpmy15ptfpejwz65vsumzmf50ulbm4zve7oojikpfyrt4dvs6oshqbtk7l5tei3v115457t3i7lrihnnsuuxqb7kewgl3u68h29ufd2',
                url: '1vid1kkbnkbhhvymil3xtl7ggd0a5h8kohc1qc62i0wyzow7ebxz9x3p373f235q6jb25omjqyqs6zqzvnr5904rhiggeibightbzqxyjfgp4lgjuckqjwd55gx8imlq5de0f635r4orkwq2vvc07wf5hqeqqgx48rxugfonaqcome01zyfv6xf4gdm714qxk12z8dgo7hizioz0ct8jjih0rgbou2jm8gq61t17tpr5f7yzyxryjdnob23h633jyqg381ccl9fqhexz5ofxkv3k1qn26c79oirihsvkhka0ajjh1lwez7dl8l5yn4a56y59ffp3j073umkrrkgox4vobxd4glpjtwuxo9fr6qvvjt30egjebrmfj325onddz2adnoqu9d4v5aedki5wqtari6xyp9l7xpu1q3glxloqkicmp38mmyqp8dwvqn4l71syurqsfhq9omx318faddchat2h7proi2nm9zu1di7j2lnu29wvrgfgeui29mk65n8nukvu8224ai04svd5qbw406sgzujltzc0f2y54xf62syqhswpusiw9480euuw19jkinnrpogypie07c5kex6cu11dbrcyshwfsjd9q6jeuxfl7y0s7houf81gepsjexighgc5ash3cvz6gciyp9kze3e3xsta0xhpponk0ibkj5e8x4c5vh272lr8g8xm6no9kq7poa9hfe0xeokbmbho94kocndxezrhci7i0so0exhottwfltcp7z20cwvae1he7l87ukc4y3pyrfdqwkoghgqmdfeq86j6t1nx5ediiux4dfc2b8ry5r3jgjxoh51ge20922uorqjbg9f91e1p7xn78awqjxif1unhd3rt1a5mgp2lqi1chu1mqlompvi6cq58dt71rktj4k093emj6a6e3zgrd767slgmbour0xwdrmvhsbn4ew6cfffs0ky91wnicodfnwwyvq5234flals99uuano250oo1fbqpjifl21z8kwanpv7vbd5y',
                mime: 'h9ot5cz9kgkp35812h35o8xigp0rlt38golrlv5yabkbug4u90',
                extension: 'foqtrzagad1napoat0rfywz45u1d1piodviuiecz6se87bc0qk',
                size: 62123441688,
                width: 909872,
                height: 702374,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibrarySize is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryWidth is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'zge9g0tncv4tupv1ox114n8cp4xmfz9nu7rg9r0rymjhz2ifrj8cj50dgn0i21hbr6i2qtnumyujx93se414h5ep274r83wxgdp8wdk0t4ii4lwd0bzvd0f928mmmjkakr24q09e71wmxpelldbcylxo334jughmq1289r7m2fwvdzz0bg3tuvey2qzjydex7ug3skzu9ljkckpx7g73jadpp2evmhi99mgqhfgtxp0kbo1501l4p2dymb39ozv',
                pathname: 'zrp1o8z5d7u70pmbx5rhq14f53udgl32cp5ud6fgfpg69uyh6j5nnnrhnzczlfpyqretqb0ttlscoajzmxe51q36mpie3aw7uusfe0lvzfwav2y7dfc8rdhvlhw6x0gm9pi493oqdf2wf21vqvgvnv1hlol3ho57l429sojyupxvt751uddllryti0sfv11cou1pvnacumj7xn1f2dbsshytde04kwgy0xbr7gv8u4qx8ot8jaoty5lxxu6hkr2cuh8mlhc6vt3f6i5qy8efzovmzck0gam3gki5ddblhpysprcbf4lf0h1y0asvq5ua2b1c4diropnyfffxe6salqluuajy137nsd35im5hnv89e1r44du1w7hyyjsnuj7fsp211um25xagazsgdpgr4tz6b5vau078iyb282rc8fr3sa3dpc2yl77c8p2mrme1ea6zv9hy69cyai5z7g5fxn7hvh8q5tknx03pauubiw1vyegbpxw8uinf2ed3a3lid5i6gvxq5zlk1po8sbpgz6f8kendxs21nozaa8fvdinh7e41hqr8rpspyn2hjfp6a9sj893ml527nkyqp6yfkaies4g3izefix4hxayu7djk59sh1gvuwkiumederfmcp9mdyo7d8nxd5gzldaivvkwlbgrk7gpm0fav8539r1fiq2gaav7l0oe2tmqq0jg3pn8oo0j5jyxyjszymlw316wmrbptgkxzl40fgxhrgc9duv0hxdsukkx7eofi8bv07klj8zxyb7daq6voryuwpxpmjpd8hriyficmckkdx5cfpyagfwmynqi73qose4g2zv55kvicprsg2tzg007hrpxvvmbec8i721j8ceov3g4fdifztvwid0ut3ak73dwij665u5a8wnaf4dmi51x6675m18f72cbydts6y6v9twgizecl8rql2ujzg07akxfkqcg4h5a8esod77pbzux0byod3muvobbohm8tz5eghge1zqfa2yo695s9b5p9b823',
                filename: 'c4qj3cxefxc9z75ubcqed3342e3vudb6hqedgnzoliz4yxw7byjs03qa0j5asw8uyeog8ij1b16j6s0lk0c2tqahjde5r328wedxoh5cz887prd7ryjgid1f1cc13cyk1yxxomdjjph504zmsoseodz5aaj6tga5he2hjirg0vlz6c8x2gjkt060f8qan4ucjih13lmb8p1xu4um5kwn5d6l183rl1df0cw1diu44pf94ncgmb9rpvu3equtdw5',
                url: '3qz7ckocd1o0kzsdm10xy56cei6m9jmfkhpjgpaf5c2b9vozkteja6bxt4hv7jgn5sraokqyj6n6lxbx1zzgh63cxz5fmgsg91vz58poq0b1ri1mcjfsulklrrld1min7fi38p7ts92ymzt7u6ukbtjyd30zy7unjyqp3kq8tpyns5s4sqjd2nhzy56g2v8q2l1gg3a8y150q3ojgb6lu5f0szhm5ndej2x6qjn589jq0wc8grw5hes0g1umtuzn0h5nviuhpcxefzgztzl0on691dcq15tp8o7qkuvtsz4gceuhn0a3fgvndb6ouxdd0ougw6eqkqsqvko5tky1sdl3ebnn40f8nb2r20noo7gkqcydwdr9jm51x905i99f6npsg3cs8vruk04u4ljpmnp5ka5zi6c6um5ia5pj2uk8t99v72vgdez3mwtvy6okcrgmpd6p0x2h529gburo10n7my7n3t8pvpi7puwhslmhruwxmvwxo9pvj9m56bvk92fokd3n50eml4mpa9w0j94x5p9l67y8xwcshr0k61pw5ryzmw71ozewbpqkaqwifujbewlut8eea3qglnjyli2n3m2h7n7r1mi3btf2erd5xoqicgqibfcj48b6fh1ane8g54cgipeiow8rnb5nej2cippo6idkoyi4hykoup987xwlviw59w7cqziauxcteramvzyn9n8o6ii2znu3loskji72yhghnk64by7trjkomfpq8bx4sa56dqx7hi8bfqt00ff85gylsz8uty50f8yee7hoqiiayts7erfiq41v44dh7pn6ye9led0i0utkktjeycdh7tdr7e0alf8cwi67t13r4oqk0wkvybby3emar8c13vpcrhpmv6l0vadgn37dux649c6mtrpll0qs4r23sg7qxpj7kxi8ba4kevuzfog6b5dpkm0cdpgjnjyt8up18hlf2uhgkokcsoxm3yc7xcoqpumz5878ph19engba1pg84e5iomb5zkm8159',
                mime: 'n6xhra2d2aoqydxcc9818cn4ucya5ch9cah11e80lrcl7y52p3',
                extension: 'h561r0ecrqwcwcd8qtaczg2qxi1t4mba7qhh4u1flw1zbqqvq3',
                size: 6099378077,
                width: 7530135,
                height: 870451,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryWidth is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibraryHeight is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'bcb9mz8hm30m5c3rnatzxd3828f34re14g0vgepw8334nm661xzld8jw4d24tr4f6v7pxvfjj6pld1rw50crkigzno825yjm2epocc50zq9e3ghjjwg1xhfugsmlhm7i34epwfs65ovz8h8u1ztn5q2ms8owfmb8s1y1m9u60tjwgnejvplkv99fv381c6hcwsfjdm9kcsvb5eqmeh3v7xazrfzeld3p92ghsqz4ve86rumczh93q0gymyapngr',
                pathname: 'nf7ru0h22ir3dd2dp50ld6xlkie8tnb4cvwmvpb9hlutk2kqc9w33ey2y0nmjdtpf8ou91p3ip2yas7ad666ndfk35q3b6p7dqw2ktx4wp1yftwv8p3j8zxs8wi2l63eb8b9ulphl1uciz3x0e5s2ctuzv6iai8svwhdhabzrsez2pj5q6s0ow9aewpllw0vgmyzs0r66cunahed2g8f9lhjbqcfkxsn19bob9kude3okm03f7xkugvm9rzsv73srxvlzhlk50wkcktspvxp22pj40ny8vvlcrm5fjsuxh4slxrggs49owkq37rb5do3i7x6q5r9hsa2n3gdwltesssggxskf509uve4gk5qjq3g9ia2jqx7owjs0h4hshe9dvul3j03vh4gs1lt6ppex41ho4cibovq4c4qeyff3w45i1q8ota83z51mcr66xe09bllp3oqrlpg7ppi8ked4j5uxqk45q5hhajqdpdcfesvjrw92zsqtox7kgovwzlu600h2pa2b936e27v8sicpg2pouricnvwydlrtkd1th4vupirvedv22itqandd3qlmukgi4sz72xr62n0b3b72thnyaxlo67bh5jedhd65cn33idlzhgv4htpe3cgcibwj7pjl4rqskbibkhjexh7kd4ge2scrtrnkj767vxkxmfww55ssxs1tqv942tnngrv5jmu682ezgn0f4sl9cnhj5eb1y7erefmc3n9k0a3vszga6x22xlz9bb72t0qejod1z2svzqkkw2wdczcn057bfzmhw3j0adlbjeckuryqynq3bt2iybxdw4gqipidvc17vcdprw49d66xkfv3wph2n0le66jrlxhossqkmt7ainnc25uciiyxz5ns2qqhqdfa0emj8k8kojerht74ev9vkmhmkcanpi67c93mdfkmuax5fzm82bjbfljlb3y89tzm93tocsz7v0lk880dssj1mw1rps3aq24qagoueua20kmkusk78s4e0ic0t7xrumu',
                filename: 'csro1a4zncjf7885dzq70l4td8h6s0n8fksi0s4rw00o6i1guu0803ohdqv2wyo257kmi9ev6dbv2rw6dbbk17lv3o04uqvzuld4fl3rftog56tuxmrsbuqx2ppoep8uvyilzzlri1csbj6w5o75jrzjr7gr4yjk1ex5xxxi3kyckhrxm357nrrgsniyctg3jc21sfm776q1qx0flkboq94a66lhyyeluy6pxd60ec8ipi5dcr1006j9zf7we8o',
                url: 'azfiily1qh8d6a0eu05pinbdtsb3edmqjbh72hy6bvc0kuusmcp53cv5lfb1x3nlnec7t3eibjlih9v4ws13il13gib7m1swivf47nevq20mrkpr7hnj09bn86tbioyszrvv1x8i4cxgnf7ye8kpcoytlqrfzxl7drrxkjzvbw95v3rwtvm757pdr3o619ox7kdgkrb8xj0tn1hpqfpaaqo8gt452tfak8cv9fzce6ht7hberfcoftj0gxmwwmwh00eplzfbc2xnblp75mcu9v2mid9ae90laud55uppnl1s2pnjs62s9v44hc0nxzn6i9i0ahx1jrharixbe6yqyjom2mm6kxt2p6qjqalik8ntjz5dg1uyd19ye184sdiy247nlhfgqr8rdykltdst4ozbfjk8nt7ujcaba7442m74jkvitjs5zjziiarjtz0eravwscelbctqpf8quceblh1qw84wgm4sa1zvwwalz1jwhsv51ovizntqovi48eawr2ts4t7yunin9jpko7shrcuuhtxs7nix43wzp261bsl7ff6q4odjp15rye5abgjejj7osmujv07uxw4qmt709lpvm9xrdnmcvm0ruopoh2x36dwxhr477b4lxk3cd3gnq1ffgvo3j5bk80szz717uescanyl9nnxx3rgva80i9ae272gqqgb4nynk7c1k94tfi76zjk7av0tr7lgq5vr3g45zhdmgzpryabnhauku22a1c3haxd5t06ncdf6jzgm54782o0hl5lsxmua980plrxuldu97rhxeqvtcfk743kfri44u4ihpshmky0lg2l4z6uv94ugtkzcyfm3ap5x7ngvpbmlstdpxlyboxlh9ysksuk109xh420g6609bnnyar8p1dbsue6eq60n5qd75qjhhn5vuqpfn9w4z4itz8rtt0wbuh1eiq59my9j6bhbf36aosf13p8ux20asj77lzvpuymvq0hvvebou1w1frtxigdmfk4f0bduydbxzrm5',
                mime: '4uawckvn780wnq32m26c0y6ijj21712ktkevqmr2ik6ddh7c4t',
                extension: '1fva6gp7u59oochl5p0lmv58nywnpm1up70kvmgzciccjd82g4',
                size: 1161155055,
                width: 145679,
                height: 4151568,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryHeight is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment-library - Got 400 Conflict, AttachmentLibrarySize must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'f3m9vgxhwwq1vy58gl6f19obeyofdpf68tnejhkepwidmu25wdfb1bln37fhovrwasoy0gk85475k67q8lmnqq499xsbwz414p3poziuk7xj3mkahr6atosiw9w8hxp6fh2gcbvpd5xlsxjo66u42zhjsabhnge19yhei55rs1nmaow9fa35vupmc60araepvlv1ebq3tr5m8kxkkm9th7rk9wl3lfmi025bau82bx3o28rugu34fwzdpt7ocxl',
                pathname: '3c03eqokoaw7xg8w04mimldlf3bgbqx24f1cuv7w9t1mqvcd90bpneyfoqxga5c4iiysvd8zczd2fxbtt3nn32xromrnj0xhdt1fe2zm4tbm8xt6k7si1ah0low6ipvaaluzm6hdy4e5tt5p846ummg5a4klx3tr1riy9bpf3n7uql1em58twdjd5hly53dc0dbhn3m5wo093qw0y5rssal5wzoh9elj3w3frgsjm6106t4mbwspca6qsgaa7fgpqeoknmvx04zzuoufjhjlt14j3w8ofatnli18w5z0vsp73jpmtomtbiw8scjje5ldyrmb2tdy9cf5kpl2g02hakkf2w1frn6njf56potashywdpmtzx09jqhwoeyh9y0gl9p1kptg8likx92m1meyov41htzp682h0f24592lej88si3cnfw91zkhkm3q0r2sghnwedbcx5sfcj3l9vxgey2yzq26mcakhukcjh2vn6686ciox0czzysqb5ggljr6z1k0gtxabyzv32qfrysifcdmrv5esfonkuhvpx3kizzee8cq2030dt68dezeapdy8yt2ki5b63rqn082gm4zq5t0zzlio90fzj7ymmht4eiomf1iltlmt7vllwr9z78g6pnu8czod0gssfd2492w9yn2yz0m1bid4qetb784ci4ik5fcgzvt9aj9haygj69ftpb3wfn7rnymznggfqbp5ujf2nasuad12tvg72smf08txe6ucr7qurhxibmj9lqdm4fgv63cgxpg7pe3w8orrx3i17j677f5th751wpx2szmaz21ou3av009ye8pgwy7y821v5b9ijpfdgple87u2eoe3nqx86486tkswaoghjtl8qwwn7w51m22mfwuhsi0p2yqoiw9xvymlvl1pefppkxdn98ixqomy2vs3gipvxetmqhwcnxbzz2d3s084i4fgeestyfx4lulo0uojzqby4pho8p4pbl2yxuj52n9xrj0a25ka7kv4gtlviizt28r',
                filename: 'tufr7hhihp4fh3vz5fknrquc3473gwjekk49y3bpzbikg6buu67y06z3xjiucnsnaumh13gqltsm0erizqag5sxvlsr36xy3lxfaqf5ctp7reo6ls2y2bs4pd877uhz1z6rutstynf5co0pxioi36ycs7wtryztlkmz50eh0im624c3hmxalqsmteiicn7amnfi04xx71usxlxrbr8xyb5p64r76h2vfhraigk2s207a0aioelqhzlcljixtxqq',
                url: 'qennljoprtx6tttpbugewjhbdarwhsmmxc8n4j525er94vv3bmrwplm5pbl8d2b2we8vkdmnph92vjx5jp6vf5l6yplw88pw6rzehreu436ou4j5ptfbw5z1chbh5ecml8o690lj7p6664mujzbzjoz02jgt7m9kc2tb5mc9t1jziwsnejqj472qwfrb4otrx8slt62anmhbhk03373bacahgkbya9f5j21i9fp1jzrqixvfii1hge0apupq30dq2dmpxbxgurfa6he3j7yzpd5dyemb4tvyte71bcmdll1a1ku29cg1yrpwnfj9il74f461fgvgjhjhjt6xyh14cvbi959q76ooau83k1gfdmgvgd4xptru6nyduxd1ejg6q64hdgf7bq5lvzmpkkg3y0dfckmrdtnv9008d8to7397f3klyhb4zmg39yqtt6654t0jum7phetxti88r9z8q57rymkaks5on0z9xopbvh4gl620naf6ncqz2zx26bcn3aflesqxg58f13jjevuf8yu5o9tpgx0m027pzk1o2euafxc6cyyqspr5wl01rqkga1r7bca1c0f9wre1jllpbez27wk58l5cy1foh3fdb50jjeaaew15nfp1ddymeg6vjvpzu4x5721qz3gag0g7iona1jrwab7ozvl2dlklrddz1kz69xdscwqqbknxoxq1sv0yh1xx5eodb48gymoz53l97062umbas7xwfhdqcvnlhwu8yvwb5unwna0cfik2bgn0997s5k990dtbw6fp5z2or5ow6ozuf1evtfsj6le2v0ox1nn18ujq2ybiiqp0x7bkyfkefj99b60accfltl66eymkp2zuve1davwgqtqxairskr52d4uvgnd3tcu44blfv8ix8u750snbq8nqb215a3pjkwev6hrzlknrytsfdyakwu0yxup94nevqacpvit26j87xcdl6aep9h2ux0rz03t7z34arme2t40o9olb0z5re5zh98ic5znpig7e',
                mime: 'cqblmj15go4czs2y5nbcf5xcglvjay48ww0gwcqweh86bqmuem',
                extension: '4kr3d1c1nmzcdn3jkfk03fmj91iy6ruqkdx635i3sb3dxuggl3',
                size: -9,
                width: 375030,
                height: 383278,
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentLibrarySize must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: 'x2gwnfo7age6sjih46n5bc3kc8u488eq5b5pkfpopi3jgkp3qp58h1y2jj440lbfh4mzm74g0qbw1rwqxb4a2e33kbhigf11wi0yrte1mbfcr6564v79wrd5im4u3q0775dljzt3894eqg9tqiqm601sn3vf6ygfbaozaxg9wtt64uos5wp9zsu90teuanxvu9k5ppc6z7c29lrclnvdwigxvugwcjgucyywk0mva7o2ngj5z48qmi6vqupgigl',
                pathname: 'mumf8dxym2zs8f1jpsaxeqdfxogaoyqsvgvz4n97cvb17l9l95bvfdjyw2oc4jlsbvpog6qre5aqx91n8xc87l1k1pzqg1k46kju5jd08eu944tyjvooychhs7pj5orx6deqp2zxewtgx6p85oz0ohr73h9h999us8589avqjhu11kfdnzwc9xs7kulhtshstp6yiybms8392vjw02kk25vgy20q7phzq95528mkrfoigrqmgno3n3f6dkxnia3dar7ruzmny5u4un5yafff4wecvm1hwejipqy41vubr065a04owltbwnvnqzdkyevuj9of4o3kfih0rbqdr2asnuy2sgxai1yrybznlvizqjtudyvet2m7fd19x4n0o4pgzw8bcfntovf1oi4pk1ggppwl267wojshk1hk1j03p76ud1srwugwtclbrou807eqb3dfexcl8ck698kknnvx5os0sbjj76dgbfjib36zgjoe0unn45oytx6bfyplci6dgib17qb8225308zaqmc11ozz1b1tftb6400pdkqe9ycg46ssj56qhw5l1v27yhver2kztcu0zc0idawhpdl77ja1atjve4qlqxzxuknsvlv53c865mgv8b9oj9e8bndpn92cj2zkb3xfsys3ijsvlk77a2j7vob5ug4pd35o29tivrxm7uhguwpabseaaouwgnkhab9ymohfkyj96w74fpn7ococcwcbode529usmyi9zwqwmhrzmwq1g48yv5fqw0w0qwg917gds3mvaqcmzqez4fadi4yeukdc9i6gyzo0kmlxjdpasf4zoxcb6a7lwdmxjgjjt1t3v70pqc03xejbusaits0esgleaz2id2fbi9eym3u9oomie5bqmkksuitgnp4ckybeygblyss4xz4yq0pvhe4jhg8his518eaubqpcy2e45m4kmcruahhbifhrqrserp9qfj3xazfncpdkirh9utse74enf9rxhjzgdtoy76k9zfxg5pviajxz',
                filename: 'ul3um02oqwgzxrqj9b33d2cujd6tzcnp55f5d8qzoqjre9s47w0gmsckef86l6nn4hdx1qe5hz5j9o35el3dkxh2mdve4c5orlh1fmufox9eevjb99yvqcdy5yb49z3wa2gtktukdwbaofsv0xx05tg4j81rwhjzxx84cyr2f790a0apw7n2y0iovtyjnfdz4reu6sfi2w20znpwr9cmsafl1hctaz13mzx3a3xls7v32fjqzzz06z372jwmdjy',
                url: '7eic5ofidxjfm5s5o9nsjrt1q9a66d5u9ek4dx6h8m29klbcsc6mzusw1e9fp4y7nitsiwsdjnqgj8zl8f5rtxbdvzn3zgli6cy0c4aclp3u30byemnslqmi3eb1zxk6y5gyo6no8c1xzrz8uoo9da7isbd0h4a27oqkldv24g3aewadarok1flvciqyxckcy83qyd3tktujckj9bj6s759f3d3vo7ufmtzh4sf57e8qfwd4sg40g1iwj8sjdwluadm5kpqtbmih83mibxt5ot4mihmafv72ckgfdyx0s7zff5grizkr1op9c6qir3882awntegxk8xvscz1bfhxnycx68ipwc5rqoprp4eppyvh63aka6tsqas9wtegeei8ed0fi6z4w9bs1lze7si4btz5llk4jrovwd60janxp8f1vlswnytt28cjxrzgn25n3n2fndj128w1hiqcrd8a73p8ql34gzxhdaxjwdv0al2srauw3td50ziab3xjzfc250qoon5wjhesrpo1nyl98e22b586rpe0vnhwd1vvb2e7rdz54jogm9dkc2g6dx541tp14nh8gbb9h5txrgqkc2jb6rvg8ph4zz0sgou617genpi17r8z7s7p0uuy3ccgqgdyr0ckxfp99057rtiojr8jdne6trwbm1xwvxu7au8bepw4wim1sqail7dure3c9kkq1ztah81v5t2h66ikh7vhlfmi2ppd5h5iyg3mum2lvkqoh5ul890lbreggblltm9g0imj1y3mq6im5qz0aoob6177hbbqrrotmqra8egq4kwmk2cov61szed4jvkgtt9v8umy8qcsg3w1yjrjwnuqgsygqhsckc6bsob27mhlyfmrgvkg50qro0a2rp4gfq2ydzqx604iond7wzks97buy3luumyjlup5owsfqn2xi5oypftfjvmw75t36jyrddsqmxqexcvttvplphm77qf76tndvz14js8jt99trswgk7elsl7c3f5xdx2gy88u',
                mime: 'zwmspgpuzhx71v2hltl0r91qffhpwjyin154fhjnpn8uqzxq5a',
                extension: 'tvpbbiua925kusnpcnwxfepla4il4yeezp3b5zplmrjzizxr4q',
                size: 3035249636,
                width: 138665,
                height: 896693,
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-libraries/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries/paginate')
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

    test(`/REST:GET admin/attachment-library - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'f8731d46-6c62-4cdc-baa5-c24da7c6351f'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '5c342dcb-3593-4a34-b47d-c12ffbf1a358'));
    });

    test(`/REST:GET admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/1194471c-e780-4751-8724-1881af0cdf97')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-library/5c342dcb-3593-4a34-b47d-c12ffbf1a358')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5c342dcb-3593-4a34-b47d-c12ffbf1a358'));
    });

    test(`/REST:GET admin/attachment-libraries`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-libraries')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-library - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '02dd38c9-f913-4778-ad5a-cce1c48af079',
                name: 'rpdhx803r40rqivvtes1znwy71ho67j6nbc7divbanj178sf2rzhj8ymtucmsyf6ynptrggv9h1zfpoge3irn0p7ckxvie6td3j4vteye42wksk27xebt4mpcg88qw3qnoy5ocv5weans9t3ko0585cmjhnqgw4d4gmwm3s4gtrlb80go0moyq39xhayxx5yuq3hwc6i40m53lgt1s4o3s2a01uwd600ssouwfngyv79xpzei9q6jnlswuihanh',
                pathname: 'ameshqzilfz8lcpz7dh3n7hh5cvodumb8fle6he729scbjf3jx2kvs4c670m273v5qb21u1pfxo7smmq68fg47oll1xbu2lsy8kygyt7f9w6wd573adtn6ban03sf7e9ykrizsibj3ovdg8bkjcj91i8kttzcujdsn6qlg05nsbuik2r4kszirn0x932bfwx3i0g75ha02ovzcrjx7qn1g2xyjiz5eu37imjty8882fq64nftem5cy506722xedw94wf2z5oojzgca7rjvzjn6r0b1qvlam4qs9tl4jfzwh0vphopzesippimxgo1wq1ivha3vrme5z1ad886acf99en9lzewfwz1t5s8xxi8s08s483i9k2aao18cephse7mp6sjifkmwqyqxaer9he187ykvjpt1mgwowgfjadz1u9zxnbdge26qi2pxs19b539bezidfzmfysbzed56jue0ruxfjrwxhj1bxmohatbedv9p3v4oi0ew5hf4xt7emzsvycex54bjv067bavd5zdtg0yf7y21ze4zqjn7crng6d9a98ziou29ilp2urgqvm59in1nxac91exxj4t7y2a5tqqvziz17tpcfdn6gs4ewva9gx1b4lcmfavwublyvhctm5zmbl7n9cwl4hoq9k19ses4efg5d9tot298y8pf21f013g1ixdctxt7atmx1hzn61ir9ickdnfm50c5qi46vq7id83qjqrvuoml8hbr5tu2ii44zrb7xlq54jzebeim8ofn2az9ut50pq8bqn0wox71v7j8674n1uj31emi2nczmc4sp5hy7027g30pk2chlyq3ptyigt8vpseakgorde3k4cxd7b1kuymbmmtvswq42gwxjpcze46m8h109o58gnf2yrk8007pmow0n5dqa3cokkvcyofxjadi646cpo48mz4lu4hgloj0j6x4o32lbrarqof8n4xirse17gj7hlxawf65tp39u751if1mgx4l062viq37ii3dhlmowe',
                filename: 'wdqw9y3fq0oq5nho30kpkof6ncnet1vby6hjy9opb3pvdkmq6fhcu3uicirmq7dq9w3b4qrrir9uqhuw33potl6vl2400vvaihchw2rb444netye7wpkya3402qnhzgany41rueqz2az2wx4bj5x4m7zm1em89d0997afchxinz4b4qtuv6xr3b055x4zj149swa8x7ml2hartnivlsp7yjp0g9fcowzczyflwff9390sn8qewmrh51drfb5edu',
                url: 'ehtrysxhwej5j7hh51qbubuupjco0xetqea7yfg26e2c6mqa3x2vcv7se8vp5ixl6fw00nlmyldmv0yy4vjc6giqx5sygmmn53gtwi71t130etutzpzfre903dwlrpd4i41ddw56y666m1s8013ca1dxdmbj84ssdip2schfxensdppgqf0wmkjwgo4vpmrys5mkm0cgmyb12fdhamafj3a87okfv7u06otx9qrbf30s5opyku9suq1237q0sjz21tjkl3bklrlxuqxhcp52dg7hyzacvv25c0re7dj5i7tfoujle1xy86uxk43pjz47r51wmj03uricthvroa65usxftfsdkz3pbgoti6kny6w4phe8fvl5szlrw0fw6sff9lpjltx1zex2f1ss1oowszxb4d8500rnxvofluasspyykmtw1e5uyfkh79gr1qovecuaa12hh281z1735w1dye7fpqw2xnf4rgir5ka38kklpvun7qjwbar1eatbind7l2d4meof8mnpafs778m206c02lqmliollokcwp2ym91u5z7i52kiufxahqub2lk05blxa8pn08yl38y4tpo7undw07oo7lz0oq5m3l8rxw5o9vcmtixwo2zr91soq60oz6tubng82recbvnhfvobypmaw1brsamrf6xfept3gw8eryuoz9qloqj1jqh7mknp7edtoq81lxo6dkiggei3r8z22asb58ewy8ppw7u8fbwwipqt496o67q1xhtjwaaykunv5wahbcwxv9vbkursddie6qn0qkxyyuwrzhvpcvk3p4v8j0hien6h36u9dxme6sinvl012jdzziqz7of6s71hlgjvl4ke9z8fkxzgp11kbveyxmdq1jvd3mc46ik4eymnvrdgk2sg4gm5ucwi6mg21izvpc8pu3bqr4sxkt9rdljhpdhx2tevat0vqpltk4rjse05v5an7i95s7entdkkc2uyad7dacn58geoqssy4hhxyy4ac3rsx8z0etbm',
                mime: 'eg8r8jgsoh2d6bxxfgdeti4jgmfm5aehhzto7e3gfyhhl9vbde',
                extension: 'pexlx3908f8u91mt0f1w41n8nqugmp0bixipe6vy76gytnpelm',
                size: 9447285872,
                width: 906893,
                height: 514376,
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-library`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-library')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                name: '15ahyjgkmxuq8im84dp8l0ngg9fhiccy5mpkfw2oao9znqyxm469w6h4ag4x96s60xj64x1x7ssh07ywq7r2wnz8u5wuzfwaux41gmjb99mid0750xusysouw4v1p98t4rt6fyngo0nzjzupl33vqhyyamykk7xgayg7ueaenl8oxew6wn50ph561l28kmier9oi7dpy5d0w2z57oeiubrg3v7ra1tfn2ftdw8xa57xxvlytv1zrsrwl7a335ke',
                pathname: '9d335q4cmxwqaar5csigb1bnjjbttpb0n49dstkzjy7alp6uol5sq5k84oz21s9gnin8bepdh5pdlewodphct19bik7va1vztmfnytkxeknio8hpwhpec1wpfyale46k23d2r6kdjdq7sl0i77j1f32iqt1eujpph8281ayll3amm793t08yg6zg3jkd2yf9e8efn7a03k52jvtnxa2qbakna5m1y1lxhxy46ba5x7sh2b0go2kkxfqfu4toyd3ra7sqr7wpf2lirn8swxuleuviob9mfrcnmvo09eawvp4qcdkdhbkk0mjtzu0cun74infnq9ofo9i0j0kwbe7s0p2x0lcdr9xnot25k4iofgoeeqz0yvwni7tnpxzvman5fbl877rjyry3t53li81nqt4x00zu88cy8ydrfrltv9duwrn2m7y7z9gwgjlp1jn9pk4vist8stfbdnto8nupz05lztsd2konzxd7i8l9lc8tsah5vkvz61heo2mq78o11n032egde9vdwro0z6j9h82y23u4by8qbfcobp2tqt0fo79k9hkw6bcftuqlk69xzzzsc7dfxoarqb1dq62v5z02pmot6a09grsen8ztv3kc7uycw7ven532ab6ktn71ujl9n7i89gv2q6lcgdgwe3pkzsaff86fxgntofym9a8nw7ebs2w27br67xqx7pj0o9ap8sm6vzwby3k0yfwadoq2zqowyblsbdyzykdpibqi0583fhmflrwxa1cg62lr265ldalc0uwxuzbnjx6up0ig5o90qjlcdki06xd9e2yq7pb6raze2262hdp9kjvh5mb8lr2i7fcqcuvzyauoh37zfr0bapjsyaech8mg4ghq2ft9wxbsccnbjx7ral4r68o0093s8ny1tslzdrlwhib39sjdea4eliksnsm0lr44mrszgxdp75vqqbipw8w8gk6uzdh28spnokvwqtsvr6qdwguppw37my4vnpyqgj514d7aa7vif0tocjutgqns',
                filename: '5w2jf52n8k40chkeldxd09jhe3ef9cq4fgwq35hm1rx1vmwglzt3q6evtamwjk9c8naipb1nc2vy8xzck8xgekkjwz6fjlhhg2uwrfc1nptl1eq4qwv3wg5awdlp372biz7tnozon6v7qpcofhwl2tls52fo3l7ltx0dikijnny4lv4d3d9mbf3t6ggtj1nz71y25ikd2f5m6ei5of1ocs81zc1dnsr0t38jlqftionvo4dv6hfzubcg5pfk4x0',
                url: '93qbei5pp4imjwg9e4wd6yoadbqdzp6rdccoe8x1y0s17qc2y0m7ooy4je8a1h6s9g83de4cppsgrfmpngxjt6izgjacntv4z8ul9rzdu72kwl2pcuzf2izdb10662jzh7dt9mcgkzwlv99v3z6th3mj0y9bhbvlm0sgr6kqkfacda63kbvomtem3ddaxfehn1q9h28k9xutjpbgoy0qk08gg0ibcl35lkwdlzocwi2tba90n3zztn2qj77ogs9e4nqdxukog768rmpcqfhjkiq4gabnge2bw975ff5oq6lsm1m6q06ao8yo2ajo7gjxy2b849hzupy0u72i7mvj3lgjskzoh6g4cn8dm64idhoam7lbjcekpqx6h8jsoi00aal99w104h8u7qusknjrmcya61gcfasku28gcqvlvohj5c62cu58qmxnls1ztyteh57q6f4yr8b38jiranpydwlwf07gm2qxaez69m5zw5chpo98gbj1igw2oww1ntxmop3d5kgd9gb1okq09rk36qomyp6nv7t2f5biided0zecudec2dat5wv4pfh3y1qa2ucs3mlo6vsw8xi8tkb0yfoxzokfccdkshz238z6e9oqptkd8sl4m56yekcog3klfskg9wk2nk391ms1srzwvcnr1suhe5quvqwv8abkojp28mca5cjg2z2514k6jkfuu3tl7yr1jdj8bqoa8qgkrdgzkw5tecr6z9cycshcbjctew8ix2wikakhuaedgscbbjtx411zpx1tu5f3v6rvdrhgovvpmrt2cpfavg7qsf9i2kryon9n3321hcwqd3spmrm592136v3d2ce77yeocwermu2ntku2kk6ozdhfo70boymv9bqq0yhaai0qn6ou9higdo77kgg2tdljv7oqn7bhnht1rawttripmzbe3ibmhy787x3o9xsywz4kz8dw9egn3hbl68s09rxj3nilafle9s3644brx3ev7lkwjhc3uiqle45jne2vg7ddx5l8',
                mime: 'lgjhlvm0e57ultsvnwppwi113npvxtqkemx03qctg1a1kqkqct',
                extension: 'j0byljqkdl3xyyydozzwj4by0wka0cefow26j5er9a2c0ytdhi',
                size: 6653179491,
                width: 556935,
                height: 398769,
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '5c342dcb-3593-4a34-b47d-c12ffbf1a358'));
    });

    test(`/REST:DELETE admin/attachment-library/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/9e702ab3-c77f-4847-9a06-6362242f682e')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-library/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-library/5c342dcb-3593-4a34-b47d-c12ffbf1a358')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentLibrary - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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

    test(`/GraphQL adminCreateAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentLibraryInput!)
                    {
                        adminCreateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'be4d6bd6-b476-42bf-b56e-7299eabe91a1',
                        name: 'azd6w8s4z0wd4lsk97ed35qdacmbl211afna1khr0fry625el2gu0zk38nbquh08ctnylpw90loro10v1sgtxwsiibmppxllwpcwrok2vp1k5z6jyl66i3gfjx7zkvoj4090pg4votz55v0dfd91k64sh0fitj88s9fkirvgu8ermuq7bs08vj9o4jfs7d3drpizh4l2c3ia4zjxhxydp31xacgxmublq48ljqw8x92nap52p8dkp8qjb4znk90',
                        pathname: 'jajgxuyx409g9r6rsmtlgjcewwy2y8udbiay52cr9fct81srx2mcjdxy4y4qhlo2ngs5q6x9tntm985rhr7lla5max8l8s2o1f82k1xl55r6vnkz7x02pt3l11t3m5akatg9yrntvnjjcqlt77g9svsj9md500suodyl1xteu2lx3w2ob9caovvdau3pd5iqkik4dk1ose1g2zxvj0g21ewclkbydcdjav1wxu5cqkc9a8wae2le19d70ldqdp1hc6otrcoi67358y2pdp8lm87kjui7bo1cg31uzevbw4bhsnvvrdrfom1qkp5c6kgi1k9ckzdwxpmp8xjpmeqrqf39bs0f9lt26j6s4oyipy6wcnnpyomrsgmc11rhlyhkaqfr9546youu7okik94o1me9xvwjtp6rbn2eeiynxo9b5a7zojdu8vvcs8qgzysktksuetc302woe7v51ayvl405af94bm30uvsxbk8kmqodigw14vhdvb6jnxel2i8rs8aq6jm0e7phy63nuzyw4gp1ctnzbmjaxooc5w89a9eoon80wpfl3mgl28l8qtdz49llnzd3zzwq1r34lnxpnhx0fswuo746evux06d62bnhy72n4d9o7lcbjnj75ieh8i81myc1ijatrjdcwy6ggaddxn8k151ged0wa9wp0f2p4yv208e6stwefgw53cptjubfh2crjuyos2idf6d5yx5uepofirvwcyfnr10yog4pn0h51d8bd2jd19ovrfa4o209qzifvlsft8hwvs0wtyo7t1cbtmv50xapxp9v4jvtjrzgtyzdcl6h1g7ltla4o4unfkwgdiuvi479y8y5sujnizioljw94np733ah6cf0dctvpexxk1q3w4zgrfaj897q9hftzaa01qua7js0hdgtl8nqitdz1xb6isj2phyt9mhg0uvdwwvmif33kk7o0ma08gp7pmorjo4406df3ud26aajg60j7u1kfiseiwqh4i0whh9klf75qzfbkrgp',
                        filename: 'zmfhsopepd1i2sycnvasl73smp4bqj09ojo07wfeshmym4fwuduhscijgjp6xv39lsps0p4c7i1s25lu7krhyf8bdga9j17d09kyufbhq96atqwbquz61evem8urhoj3oxj9d9uinuk6ui9sjrzzro2mxuhgxm9xr1gstaeye08cm9wdsxj31lo1fji2guczz9e2jql2z61k8431m7z76sad06ac1a5r78p7lwtgv00jc2vk0oygjj64li1vq0o',
                        url: 'egcculgj9l8ldfn4amy74bia7blvzxfhlwpsoz8pmaq3ur4z8byu1apxjnrmr75kohl66zw92804osoc2nnlzff6dz8rti2ixyufibvrmfiyetp3yw123antlqw1vghbxff5bjfuhj0nbkaoi0teca5i8mzd92q29iv1srahc96ojtjndsupvyhuvxwf78culyec9hpwgkf2kc2iynasjaffjpsra5rfpiniskqellxvabdpjk5q4khqzmiboylak2f43h45t46wcxl9uu733mq5k4vao92vk8w7jo16a8bltfszc0g8ku6m5abcej145m4o49r0bpmrbuc7nvqmftx2q3mavpx1m84nl89dhc389sbbgavhcsadlktl2uoja8l2963q1je6ar1idvfs7ctgwgscrb6s6xjhorqkg22ioi55znkynvyui4g3oa26pg7tfqc228ax7yjq8c2uclbeco5rlcz0v761rn2grwd4c9o2sfdi5aays0x0tvfol0sfl4x7jlnow9uvsv1wzs1bgplzy8xoc15xq2m0k6jou944f8h81zc1r3ckm6c5djaeryoflb8k3qiefs3lhkb3o6kzmxkjdmvdzqor7h24v28htf1wruhpo1d2e01ck6tnq066qzbn7jpwbxcyygh6y5fp8asgcpuydni1luv24kh4g0gahkgkrz9fcx1drzhmenrs31l7e4mkxwd7nw05vjxs913cz5ukzvqpnjw4m49uel5bdrtcryo4rl17j5vsalaefp5oijkymk0yhi68yfoebfg6mgbmoiqkg3w0m52mqzjm1imjgjijirhhjgw68hdjn3g2oz5vrla8k3a9ow5j2h4v530h44x2fsa3tj94eu59ijrnzoiw2jp44382v4g83nigctq67sz3597pkylycyulm2yhky5bwbeju253zvcypldbwtocyo8txcycvjglo2wnvcb49tbzhs3ebiyqndfwp2i6biynrjxijdmvlmshu6u9k07mls2m',
                        mime: '0myyzomy1vhsqbttm4sx90gi51atiqqqvidhf4kuz88hac8fpg',
                        extension: '8jlepf32v94c0pqxrl9n7zd0bv9a16ojg2o3t429pgshzbelbk',
                        size: 3966256564,
                        width: 345556,
                        height: 766692,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentLibrary).toHaveProperty('id', 'be4d6bd6-b476-42bf-b56e-7299eabe91a1');
            });
    });

    test(`/GraphQL adminPaginateAttachmentLibraries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentLibraries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentLibraries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentLibraries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentLibrary - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: '58352f3c-8c94-4abe-afad-c08c979c4efa'
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

    test(`/GraphQL adminFindAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentLibrary (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                            id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibrary.id).toStrictEqual('5c342dcb-3593-4a34-b47d-c12ffbf1a358');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '141ff6e6-945e-4796-82a2-5d3bafc8a264'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentLibraryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentLibraryById.id).toStrictEqual('5c342dcb-3593-4a34-b47d-c12ffbf1a358');
            });
    });

    test(`/GraphQL adminGetAttachmentLibraries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentLibraries (query:$query)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
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
                for (const [index, value] of res.body.data.adminGetAttachmentLibraries.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentLibrary - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'b491dd09-585f-482b-b0c8-1bb293fb4297',
                        name: '6ksxsr67uqena8os3ldyo333ctfyvodrr6aao7kl4iwwztggazfspwkrqj0l5trkeg5rckxju0pxeuql74gcmjysrkd4cqp05rr3fszu74oiu5wxs61myh0zhnp87726yqlcelm5f66mf4of0l8iyjwagfvaocsi2sjk4kdgt2ipbjxdscdl428luy0ewwq66yh3veg7gx7gfyzxq36hw2prtr1qhsaiuweiilhy3b7ds2mrq2yzrfpjeramlz3',
                        pathname: '8ym4rr8w9s684f3oeqd4eljuhj9wphdd43b1r3le5639lymf6kv59oyliv7dqeeh8b40v6c66fkzol8f1l9colgovk7jxs5dkwgn9k1the05zu4obov63uaiczq83d68uf8p6ekoaiq4fstszfg0wzbzjfdkuqtnvdqvu0erytprvcpa7xmg7gwz7gvn1yhbnu5dm1ywfj3sh9cj00qbt21v7ibvaz3bl4qojp9ir6c2j700voq08pvtfq7n0oicsb3wl1c3cmjmy2gqg4lmf4pgc8szd1emtgesrnsmxi2spvkv8f9bnuhk2h5jdtdpw8fm4ads66h0z352bjfdwx152nmwro6vbphshzk6odd4o5fs0sikj1hkmrb6mp3rwwhgzd2weolbj83qtakfyenxhcgh75ljf082xlh65iodz2c03gfrt9oy2myev1996i4ww5g9mxp5k6twl25hktvek16quzvlxmb8kzs4qqqgumekkxf4zx77yv81u9jcta6rouufttokmivhyikdnb9rksdv6igfe0849qqz960r9qy81mm9exw07miqtx2j86bpkq1k2qwhfkjtcth7thdm27oilhw7p1we6jom4dhzrvhdqdmwcdjmqi6scyv7hfq8bvozys1apk82dp4aw9sywpbnd7xyzgxxp6nud24nu3eewi76ujl5gt6d1qj3020gisnxyxbbcn83o4po78xy1blun3tfc6jy30ccramivf8mh19ts0fldwiyk25zgw2bidbre6lx286jnn59js5jqj3q6cj2ao2es2x8xpr8b9967p5ezo5u2jpzt83rtb6ld94k8a6c9wtbevvtiyby8ly9qoowxcmnr7402806uyy3kevjvqcnekjgomtorrodby852qli6q2nzbe373yhhpwn5eexvldwn9umn3fx1a7s3i1ca5xihh84relihzaakytgznhqk058q5aboeciivq9w7ynzlo922x83lan19m3pxz92q0vhvyvk2w5',
                        filename: 'c3esrbrku6h8dwrcf1j2empv45jnmv32258v1vaezewgdnzbk7zgrjwzirfslrafsxqiizb7ewo1b54pvr461wbsoac7z6fmcm2b022mvst40st6oxub5wrqxynqafkih9tmvi39nqpaow3c47al44yhuq1lbgzmphj9th67uwhlbnwztvqctei40e9lm5omqfj47gcdzhwntobgtx4x6hu0mi046d5bseqizxv96kj0scsfq9g3geurtknretj',
                        url: 'racev8xb7rklup2p59dydri8xe5ddquwkgkwbxms7k138cbuez5zczd5422yr8fsb6jpsmzl5wosz7kx83gsz2isdm5sc0ycu450zdmxwk98v1b20fzir4zhe3ve3gc9kd8yudv7mbg81qls1hkk2hyr6j35u5jywmy5a3im4r0xo8350cjf18lo224xvu0m8tj93zme9xeqnliz86zk2b5dx8ieefh2myamcltx4yn1i4fcb6tn7002amvz1iquaorkr6d9vt6xcm7swz5s1v58wc0jw6b8hi38q8djbhdcxqetuj9ntrjczs9w8a5kozt5hxnd7jeb3rtmxv14ceupye2p0www2hv0nb8tqp2bjsfcrskdok76cnndtipozawggqajbsug8h4n4drdxf6jft5rxwhykq1qad1i8tvo0cvu1yls6kybfmew8liwytib0wj7367zqgzk0d3f37r1h0ntku06fjdnox50jr84nd558t4zvgwav98vvrfuqgay72d4ysl61znqiu7lfh7e2kzynggzrj9yzsp197tyjjm4cf64am3gj8zc2rqm2gtaabh37xtxmv63vyp0r8d8be78j8h0x58h45xlm0cph1460833saiuppgj4zazj4bpzjsiyylalpppidt2v0a213hv0yil367v831vwtq44dx9j38b08damsf7ql2e1eh993sg96fhedvnmz2htxaxsdmjouxr6i1v5cugllvun8us8snkhz0u0vctk94m8rqqjtml6tm4jv5duwv39w2tcczwz3eq0ydamkj8unulcqwe3owfx22yur3vr8ql4004c2t3gssm9hqdckzv9k5a4vmgwqq0fcpvefdtayfxxr65v63af2pa9o5b1ko5xme537qllcaq5tmelmu87wh7252kxza26q601z0qql0udbqidxjbqccp8e8tqz9pb7rpi5jtrdvrac0ptmrsjypq4g0erosre5tyt2xohh2eihkbhq7lbqedkqfxpu0b',
                        mime: '595s54im3574313ccar1bbuwqw57iqs6lj45cpc0ljx4hxz7c4',
                        extension: 'gq2orv8n8uc9r0lcktw11bdp8wecjsbs62inxhar1h4kdijj8x',
                        size: 2008882766,
                        width: 308077,
                        height: 221317,
                        data: { "foo" : "bar" },
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

    test(`/GraphQL adminUpdateAttachmentLibrary`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentLibraryInput!)
                    {
                        adminUpdateAttachmentLibrary (payload:$payload)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358',
                        name: 'bn1tzv85kvjmjz5gymn32w45fdnsgifeekd71l6pp8emqz0fejt2ifjpucdmk8dakumd4sx3orfd892u1mz752s9ey9ktvog9c93bmm0h9xkgp9bkgjlk42q9gxihsfysvhvmiywzn8yqq7ci5zdgpgmxfxtayqkqsl6fnt1m42858ilxbwbjmjo1wptdwqp73o9yl8oivfa1dq417xo213t821gjx86gb4y3cnpni3jti3jukqxaosb6jguaxd',
                        pathname: 'm6b1mr5ptsjnyxo5pb1bknkdoeo37c8aqj00au5lez3lwmf0xqnc79dbp3f2odsjxmq96mawo3d77swacwshu6u2shxrpbodp26zrcu42orv2rxzuuqk2qfm6rqadceqdk0oc1kzdl3vb2czfls10domrcswd0ebo53a6brw1f8osyla69bs6ef6talnrfh7rzjnilovyt0kuph6x2wiunbvx5db35tfn1nrezrrzmmq0r9ocm8931keo393gw3fr83696bd6yzarjijs1koc4ucys4vq5cwyf7cjiwwhz17uclbucwrk2fh9ie7i1v2zp9x022ij98t6tbjj04zi1x71xpt7qppk8f8bcufhvqcolynhctpepu591nu6nzti1g5gspi0c47b7xhoqdsiurc3hp8tmn18m8hcxqyc866dmn9l6xwxiwdhqc50sdl43xnnsfp2dix0mvwa5cm34nbmcx7rbbdudr6a9kxoda6az3rgvy364bq3y6rcgrop1dc1plwonf2dboakol2hnuehrb0ijg9xcvfzzechzj1p02tdjmg4nfy8f0vkig190g5h6gtxhjgtujxaps6vuf5g7v7y1wbsg5k2lhd4mif5syvr18kq74rlsgs7l730suzr0wt8qi42thg7p1sc6vnj76grf667rx6z3wgyc4mfuf9fnveq6yoqvzz4cuotdqdnqpgx3496ao53q63bd9u9shc686de8tzbr6xnck2onuld75ini61k7jdxn4s9xsmcnqoufyr5au96m7esysj167pm4otzbp65xsxftvilrs18vnzr0timvij2b6lr03t2i0hx7qrpk9k7s5yud2jq9qsu2qb3hsr25rvjj725qo7trcgawah1pywpqk2g50h3e4qbmjdetdswobke58lagds31cn1hno6ap7pibdq8dhv238m6wdq0kpzsqg0h55y02iea1exz20ol02as18onxgv6r02hrchbcxk9ku3rvn0dvky8k29grhjxe6',
                        filename: 'a3gjkcxtrwny9ac8owjur2c06rlms4mhgtty4iwpv8xskpruo7sa91z37z5cmaw1nsby2subooyxfj9ntjs3ejeh5o77fuk046twv9wsh9ol66x1f550olqr34khv00bn39ffv5mfir15pjlz9rhstb8xalnx1wzyftnqfqade1vg64nmcbbnrnvqpfclwsno12ah05v7nt20ejy08jqtvpd7jvpbey75pyh0uo4drrjbeo6lw6y2kabwu5m7pc',
                        url: 'juqmnt4kajgxe0eezwosaka8qee1riygro8jdm0os1ztd124i2egfyjie1v0kmgm0a8m4g13ztip69aunxwetzkulmd9g9sz2xgvorn039fsdsj6f6vrogu0azb2bkub68tyi0zac7l5uk8u6qqtrkyvk7b1fo27wes8yjuxllk6zb8h78wbxer0al6i21xpkej5dslqk14w4eyvmri5la3xlj4geghlq53o3re74y7g0h6nc6lovldq295f88oaqsdf3desv240o66qokixjbe8p6ct6bih2yer1d5qna3glbmiuc0uawap1j41f69n76zksnn6wlgyailuzbx7pfgm5et2k40eqgdgmqo0faz4icww54j9b9r85uxswfpkjczsvrltz9v5v4tive1g9lkbgdjgdlv0loidc48bzqrk81o0ws2lparo7szmklzaoa91apeosssrt7vtbbp6ol9dpwdjmgl7ffg33pvq36q7esv4aikandotg459ix7le6gokydsgj27kc7pkgzbf0128s3rc4eqc5j5tbnu6b5d008w17ns51yh0lp0ytalqpvqy282at32019twvolx136eceqcpqrd9dlbtp14anu0rlaf3b9yx6wrt0o1tcjb1x878nt041b7xhw9cm51grat2vgzdds67zu9rt5ixsfjjm8b8ab9ax1dxz6v3chgfvmwda5wns0ey6823fvf2x94j5x1toiily8r7l6y5kzi2f246iv6uyserrzmk2bc1pbxs7eq7t2ki2x7sak4b5ui6q2vyx9s98qo0od5ew269vj74myoy82p88a6b89wt6xnyglzu4fnrt1jqlavr7sgcxzwt9ke2c4d7kqfgdfheiftmrrval3kikv1cepmy02iwih3m0g0u0ockz849dekbpmnzfebgzl888prdffis6ap04h28w0kvzppqtjeqqv9d21wii6l1qr7ydz9qnet1e20mtt5mbvbzh73houzd5twwew1dwz4ekjmano',
                        mime: 'a2s2h0vzzofjsbk9lrrdrckn0zj5qxj6msb7wqbg5wvd7qydhj',
                        extension: '8eoxyo051cydep2htnth5cc8ml3wft9j24zb6jlak6ywoqufp1',
                        size: 8940201250,
                        width: 800132,
                        height: 273287,
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentLibrary.id).toStrictEqual('5c342dcb-3593-4a34-b47d-c12ffbf1a358');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '4abd378c-86ff-448d-a4e3-97dbf531724a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentLibraryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentLibraryById (id:$id)
                        {
                            id
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5c342dcb-3593-4a34-b47d-c12ffbf1a358'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentLibraryById.id).toStrictEqual('5c342dcb-3593-4a34-b47d-c12ffbf1a358');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});