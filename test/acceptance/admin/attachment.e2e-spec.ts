import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentRepository } from '@hades/admin/attachment/domain/attachment.repository';
import { MockAttachmentRepository } from '@hades/admin/attachment/infrastructure/mock/mock-attachment.repository';
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

describe('attachment', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentRepository;
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
            .overrideProvider(IAttachmentRepository)
            .useClass(MockAttachmentRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentRepository>module.get<IAttachmentRepository>(IAttachmentRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST admin/attachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'v2lzof1f0fkdg4j2ci5hg69b22oqlnxgivf9rr71ypr5nwo081csgb0qmhffva3etdu12d7rbcu',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 593943,
                alt: 'x0us21xjq6lxcogfbwefcxxrbk1rzfcvvt98c410h11qj3qfezyrjxhxai75dbz5qrgroo2gvm62n3gi9w9t5rpuo5b57pofa7kt5nmczh67ygubmduxkfh3780jk86my75lqhfxjedzttgczqwp6o08chgavi0tk5njg0udoa8wr5rcntodz75sp82vbcjslw93cjo324zq14zvgwa7kos9ref46e2ag4weo744yb68t7vnqfr408542npgys5',
                title: 'y45b7bkvyg7oatr8jli858kt79nvp4eezw06zan0lfsmzk12ghf03yxdz3kew4qb18t8f3jic0rokwc55kkxj517lscuoipjwldl5wlf8sy91gyy290lqbetryk2qtdus1n0gh1pmllu1ablq0zhq1ufvnwt2vq7xllf4dl2tpu55tgct35zg3n360btvktwo41h20v68nvkpms9q7o239u2t2hj6eby7flkdbe1bz1rdldyxpmnb5er8wb3rqp',
                description: 'Molestiae delectus sapiente et. Et et dolorem. Deserunt ut ut qui qui in est repellat esse autem.',
                excerpt: 'Sequi labore consequatur sed ea et aperiam quisquam quis saepe. Rerum voluptas numquam quo aut non deserunt quia ut. Est asperiores labore officiis. Fuga ut quia. Dolorem aut officiis quasi similique repellat impedit et aut.',
                name: 'tsv5jsjtpm9yhkye7mswhldxn60pm4yjd10c3y3l8dov6k5p1mtzmjd512bvy9w0dfzudhrtm0wos3p26hld3e85fbo39kc67ara1slpbznlbd4nu58tzmlx58p0fwgwa293xj3uibi3g923ede7rhxklwggou7x0mwc19gq5mk1ahk9u7e06vit8hoiuhaee793decua847xawsp7xk4rhkt3rky42uzfmrzc0h42sbhv8zvn1cjq6r10dprki',
                pathname: 'bfsv8tckkqoup97y1ltooig6uhl38epirbouqbes95vvmxh1gq7uwhju8hi937ubl2npahreg741bbk5l4lr3ydiwyamj7l6fs2hbst5jtpjy2hwz2l8rqw4sw1irevsb2gqzft7c9ekftmh8fugdvemvq99v1kfjg9thp08ysca64vuwfdqjmfdtdsmlgk9vsivuarz7olpop7qq76m7kllkk6cvxaz8ob6l2ka5t1x6rjpz6rf40fhn226jv10bxs6qu46gygnw2xzp7kkryjv90147cmymlib7cmdzopwc1iw2zx4j93vd4tpr7id0rdoxir643mzpo0c1czay3filosafh2791zx6gff3ddhe9srnmqctbfsbmvjmxr7mzb60h5t20zhx2sq2cgjzp2zmfug4m6ytsrkknt03pcvi5rcxian4xi8s49cp86zmembcz5hqpczkurer0nmghgy3figirarq2erew6dyrnaklb3ka8a9k2fy595ujalwzw985s70m1apvqky7at2kr7ja8hzmmk6dkk6qgbuvx53c9elmu5r1uex4zqrrt1h2ly2kkylsx7kh9pdn40jnmr7tniylkr9fiw1pakbcqthr1c4479f5ichjvbaw7un2hyibkfgrctno2aowb64xy8elzshf38vpivz2mey32awwhq5ayckbk13q2dpmmv0lf7dxv733u32hkpc1lus5cpkjtxxm44obih8eoqyv0hvzc9hee0s19u3st45aoxp38gjw9dm7rgi4yk2auc3j2vrv3y5odqix10ty98zmcgmnu6jww1uj7b12lbb01rxeqeegje02b3b6rlkw05q4ip4vgjpc99ps9w1y58tuf1iajj2wk6u0h0xwwnfxdz7nrf13xao2mdoo2gotmqe2ymo2enacq1p2zpjcco3xg2wmoiswinbjxn5ckzy38ob6551i3xd6whoctxtyizo5uv24byb06p5dlntrtfhn3nvtvfycp4nluxxvxkkwa7',
                filename: 'ys2mta5nojwph24dfu7clzyj5z9ginzajntkrh8davk17hpaoladwh0g9ogptvov0ij68odyaejgc8qtnq8vx4yirzw093lw9l5antas07p26ly7j6huog1rmx9gp4s6zo01z8bi0h079afmjkzagdgoh3ud79gdro9f9myqylrykya34dgquc830qe5v6n4c62y0qxlxmfijnrwghq8o0ewswsgok9kgs6890gec5j56h0kxp3yxrzp2gr7ccq',
                url: 'tattaeh406quhaqwe8i03pej97hzlh2zk4tgie0fbier39676gyz2ky610ovzdcd9bd1agg240d1a5ji4jq85hktrztyomfgh50g9j1rwuusht23412wrctqgyozowt0otcftrm9othl73q4w8oqc6gwisdtssff8gzwgo8kkeow2eadaj43gjyobwqp1u46l6o2krmk5ji03cr4qlnm80hsjbq4hr5m1ahmu8qa3fx2jr1m972xxfm5dxvhziotxu5pjua2ewqanmnw9vr77wp5i6txn4ykys2b2d5t53aw9i8i48vaa7s9hrkr9guknwewuz85oa8yvbrl12w7b2e3ubyqzdttwhigyno3fb102czs8z6jdqzr9rg2awefo3f3cm3iijdaj9poyw5k6pqoe934ccp39y9mekwuxer1youeeuxpvajpfeiyzkf1qt8y0it2cq0ovcbza045ziqxht00vmsvkz7hvxfmp2cm2htmzm7mi2fm4crjo3tneqjitv0wjesnyvr4ol0y75ylzku87kmt4lo02cfwfzh2u085eb1l7t8ocutzeou0odkb9u4w64h0bg1gp8zrl7o1mokzxcdne3aqp6sucu9lsbk9l6p8tbkov0lqbed19cwl1axuj8jit780opj4or25x8t4bvypqlh0tjxq80h7q4sl8x3od3kzubbm5rzd0x4n80kpfq13r744sbgudu26u9nxlbgmj9v17eb4k11nov3jae35jj91qom39ydt8hzm1s4jihwsz7ur64eb8cjbbkh2gkbo53l7kngciwzk3h8pqgrjm2ta9c94y59y3z3q2749sgujjn53atstbdetz9uugbupdqn9lip7kmpyabe6thjpvlxjf1yf17clf9cdtnujaj6rkr7pt76ajr7xewr4yhd8dzoimi5ftyowwgnlfwj8m4lbmc9gukdrcodg88d6rzy2eb7eu66ny46u73oupzlpmluzi87p8g3w7gkuthvrgo5z9xq1r9gk',
                mime: 'e8v46kfij5y4slmfcnibsvwnacl8w1xhi1142c0opfjly8te5v',
                extension: 'p5ovncox4ox2dqlaskf3dnfoxg1lv2dil42ylf8hal1odv18ez',
                size: 1812569677,
                width: 649212,
                height: 729231,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'rrt69ofdyungjmmz9brdr01kmoqu9fx5alpecttrqsyosj64pxta579wgayu6ah67xcp9d24psd6ld4mwowgmpji3ebnw4nb97qa77cm76e00caelnk6v3pqnwuat8ld0hvw43ggn4addzh83cs1abkuc989smi6z8wf7zsy798igl9vdxje805icysrsu2mg601ac2psd1a6pevywqj6yevmx0xcdvndvxva7e5w1o82wmwpy5u0lce2kst2g9',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: null,
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '5n1xm8vxrf4omvhelc9bztm27w0xa9bkhnzqohnojss0epwe6njfm8uq2hasmn70kih5frgbrig',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 501152,
                alt: '8oyw8nytbhqz1kghgjrnt4xwdm32hupwf2xkz8zawbijona946wk96hj218r4nnkkaurbd0yckwfhk7cw0i0t6td9kj56at7y42zhzydg9eq404gvo971vhcffog51tfxaghgne2lne4bai0c5e479ze9b643ca5zqcvaahxfbuwb7jhqh0epmlwv48zu226wafyp09lj4uxkoiceqa91hmkr3vd5i4x9vern3dz635bv7s7dx6ayve8jq9rfxk',
                title: 'ktq82ej7rp5ia4cfo6wh7li61ma0ealdh35ma1que3qxob6zocu13xdyd7zdghduml0r5zk07iy5i674t4r3iarrkx2zawabaet6p91apgchcw67ye553rjuv0twd3v39mdi8e1gmkhwosph9ylikbb76dxil0enghh9s179dspco6i1clbnmya8phl629o06rz3lasvcmgggy73jj93lw99a3xyuwsynr4qywwjhdwqpbzfpovfnvqnidg93rd',
                description: 'Ea velit quasi. Illo doloremque non eligendi quo. Consequatur maxime pariatur nobis impedit.',
                excerpt: 'Aliquid temporibus ea ratione molestias aliquam est quia. Enim animi impedit ipsam omnis natus. Tenetur et et neque nulla ut eos eaque dolor.',
                name: '72ofxnpycjivgaxsxqoanymc8sqqb80y6vak7cma4fqrs4re514hmtbnf5uyqhr5drm18xqkjr7dumf2xt6w0whzmex7zr0y0g7wn8p6zsxldd4f81yasc8x5xc5kpk0uzrjpaxarndy69bgyuh7nczk2w4k9nv19aubv0ydk16lffzzyq4r12hv6quc4ngms5qv5iwz39k8g96lfhre3f9i56pgy31g4j1d4e1tmz22v27jww3huf5mpfyot5b',
                pathname: 'ncmw4abifpebj537b01r8u2h7omngwn0ev3kmvbeuwgxupuu3xswbmdfjse4u927zokx5pa58pp782u9bkbongjs3dtr3hyqvxojtzcoss5yzfpb3aarpnkin5q6hvi3nd0n8vxxcx8epr925d0wr9ibwviwyimdeijv3ejxsade398xp4gnh33fx4lt0h2sw9hnk1wkrrqky3wp0p9peq7edtrfdzho6eljbuvbmqblpg2frsyg998wrmi0yolk55ixajhlsxo867whkr41pa9lbb9jxaffusr84kgioyosv1mr9ateotcrmtwjl6zyua0qsfnbp37dwh8u6d93hl1srtjtxwjqp3b54hrxk54hgbe065238059im9svlr05s0dv91ngnff86u5hybpb0jeggo38dcmzukunbaagzvdbhwz2ryvlbqt0z01vdzxsladv65jh0mf9f2f6ym0onhyjp2y6ni7e7gw8cqyuhmjm169lp5rznvktcavlj2wtai1glw3y88ym42in6c1abskmewncwp4fkg3qk7wanupqv1vqdi13fcbsv8r9ezqks5a8mgubm3dhv3gkn6pgp93yw4r8mgovsazfi0iyfqj2g68rggkfjuivrao6ic384bdnq9dbr4v5hss84m0lj6c1uj4va4egn6dzconx3qlp3qfjw2z70y4m9z1o4to2u0u4b0qyq51raarldxvg96kox8edexxc6lytpvywsr0v1n8tx4c0nyznztxltm58o0mok2ubaow7hkpzkag5puo4mknj5jbd2hq05vq28n1vepqcrh86cjkotpsil709j2gmv3dl5h7n7o2zeme15tcbny6o0rx5pw6arv53qxr61w01frkz4mrc3jbmqh9fvxy905cbu14f2ko76cngxc31q2k8zvqp3cho71c1n029ljy49ke2dx8ki2yb7y1po8gkko5zlstv6in5xpv7zklos1ml6ak9g1q6aomedh98x3r634dga0oyzqqifud',
                filename: '172g8zg2jn00mmhnbib5z9ewkjmb6of12n7t4fv01xfvq222t9eooad80r2b2r01mns579wut6d2m6lp9fiv8obq93wpvp8de0rf3p4i21qq3og03o71ppy0l6hj25dbiqnkmxd6b3q486dloi2gymrm3v0ju3pd60zv6ar8mjn6vpz4sfmji9n049wwcteifimc9wyhls1injgiz78scapg2kmnkg25odlcjpejiell29jcb305cdsaf2ouukb',
                url: 'o6aex0m2xrkwh8ee22kyfzmcbsi36g3f9y3b3h2slf3iixtl89yjf50umcd8gkh35omjoa1zhxz5k2uouj6za3smgnes5w2jobfncaedaovozphgpw948vrz3di0pwe96jmiftkyfkpov804r9e6jogxnwr86bqoszw8sx5nf1hxxojfnmsvx2aosjo3matyeur9rrbudgnqhxt71hqfmnvyzb8hv74xj6drw6f0036zah4b0obo139v8wro0lrjsbo9bmf5blxmpzt9j5up9qgxjgzbzlfmdbm7eyvvfo3jwu5rtcwpju3w34mbq6cfyukjf6tfp3hplfcfo385oznu9sedy2b0ew5rkube8x34u1o72hqoztpxetzm29u2a72pooj611tz3g18kq066nvr5y500f1z7nhlsy4u8awrvw53h4ru7uzyauw93fg1cxa05sl3tevjb92y3po7wt4qqq0yg8qsdncy1w1iog6g0h0u7pl1m6jcm9ua9oy71gx26wjei77ueynts5qr0yl8autbe561bpwl99mtualfzfvfpg4ctxtd3m7lefdnbgb54p0dlwe3lnucocgkcbgml1fof88xjnqblu3n2zpnx46q6x32wum7z4cgjx4ygr4329ii1i9eb6olp3uiq93utm91bum93v8nn061ssmdx8gqnozsjzfnrap2gfvupsrf32f6h4jark9mb5y1y72kixzijkaks0y49tmv2rpjw80p6hryx5xayie8uonrres9oh6kikv77dt9vhmqueu0by7a9mxj4ioq3g5wapmcfuy9ffk1f2utixj5rz22gsz5i7uvn9rik78l69z10ek8a3g5zcjawspslka2b1gn70c0ghynww2t3apwdoqykwfclr0qebb2rq6py2etg7imkngrh8v7i2eftmj7blvoglmqf9szuejq9t5r7rmrhigh5ckz6dqvpow1swlb9v26ug8350t5sxglkcpav48cvjgt691igjquw7zds79q',
                mime: 'y5ox94i2alw4yl73iimoaz0475lv0tzi6exsqcdct6m2e1cnkj',
                extension: 'tv6z1evrlfs2vlcnlm7czxukuy1bw3t4hkq0rlhl0txvztfest',
                size: 8830990441,
                width: 828613,
                height: 286310,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: '7l8rkihwtwuf0x4yisryyg67upvw6xa6r2cgg0n4hvnvymbtz3febrxk0ggp6dudwz3sz7c86d4i18xbdgnapk7i11alt5t5f5qgsvxbyj2mvlfjbql9i2w7z3m8zi7a4429fwji9sf9e6sfvpu8d5i9uxn0eiogikdkbr4r9x4vq9t8vop0do2ir59cii49ree10qsju33sc0ixj4zn9yuvxqsu9scm6cetctoauhprhq21ad4wsuzymdgpvlp',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: null,
                attachableModel: 'a6fx8pjroycb554so66lu4ljdw3nvhxbzmd9sf5174qc1m35pys04t1e3ivtpk1jom6e9blbbrg',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 267396,
                alt: 't1snnz4t0vdjiyj9r61e29t52d4vbt9z4y7yvx1u4e29o9vdko3nndg1akxhpebkmtn0rkaa7tbqoyl89s5untqim4vjy1t7nt8u8kcdq17itejdohurm8w9ry4lurzh764d0a6orl9if59qw5i12tkefzbx7jx3rf6rgeio22944owg9obejg7tyw5kmo62h08aczj5f563lhoedbr7lamkjiq3098sgvvkkurmd4f8l8zvybjgxjfp348nipz',
                title: 'hcnf7vnw97xl7wcfhr3j455slyhzjc9bj1djbhr4rf7qqmhvjas0lifl7vlbnuflqb8qifpipvwqkz7b2je8nnoh80hjvhjfsjbn6wo0k6igqdc0qo3lc95g65q709w8nxo1t3y5vkwgbq4whasrdz1njjnu2gxglwx2nro5lv74ibzpj2rs9o5ihzmu9w53q5i2pqp79yh39c7gijexwvczzu0nvopop6djj50vs8cfgf5kvi6gzwq0rf3ow7z',
                description: 'Quis quia omnis. Et laboriosam nihil rerum fugit. Magni inventore consequatur. Nisi odit consequatur vel voluptas excepturi illum aut. Accusamus explicabo atque autem consequatur impedit asperiores. Sed et quis aperiam voluptatum expedita velit.',
                excerpt: 'Natus aut perferendis eum repellat est eos quis et est. Totam pariatur libero veritatis perspiciatis qui alias. Praesentium aut est architecto ipsam ad nulla amet sed. Et atque et.',
                name: '25ez7q1l0jprcg3o9eqh0kzjogquesnw9ga48iag93nl9l9c4zei7njfw59000bcojdthba4twy9l9j0jymo9fgg9lctlmhqf4fxuzvf60uqdomiz3tu8wika4ycoy1vb1zojyw7j6nq1tjbkm2l1ytfizb9j88nb43d76hkrzmzpj8xd06yg1frsqmsni2thbm8x0ra9lum0wpvl70qzbrgbhunvof1hghkn08nn485b2pylhunc17eqnii34z',
                pathname: 'est1mrb4av7tztdkw74jpino7ssyuz3e8onfz7m5x7ue4kfyxdierpt5hvvmzrcynjw4n5jszy0k0rmby0qy9iphllldwwpjk5tra4p0j447sxbk9pq8x0q55mt8mpgl9leo3y32r3ac5pxdqetb66kep6607mkaa8w9yeh7praa2616r44n4c4n67wwzwc832d4l6bplw6w9djy1rov9vhjshkdm63dclluhwr9c851r4ivv9qzavb06x77ulnn8kcuqu0nqzt6fn8cq9laq6p7s9d0xrjjwoqchpwr4apn158u4uf68w91nw4p5cgpp3s1cbns7q4rxhl2cn3xtot5pf46wjx7vg80d6aavvlkk1bpozb34362q8e75t9msnumamihug7dd298tgmhgiu4gnjgsiqxxe3y0m3basfzny4m035gtiutkchhhh9b4pstvuv9dg3vgs9pxv8iiis0r7ojs6o08lef62chol42qb770sae2l2um7ormt3rm46bx4nr3fumsfd7h762iaxcaefogz8zzv27h3n76sl42i8wbzglmu499ex3dng0chtklcqhoefwyb7zui55vgsj78di9v1jtm5v26yck5mp345b8x02z60hhmxj66rl4c5c14c99peghglxd7puebp7xhostdu934s7yplwwk3txojgcute3s1g2ynwk2pnta90ejd20rqinmv7qftr5ee7j6sq04wfebobacrrm2pffy4mte0d5ysh579sgrh93bf13gi7lx14ei9b9obxgkz1hpxdyntodluzktzxx8a0hb5pogkjpczw7rccjs947d4ujgmhjun2lu5bhy88withm0ubuvjtjivhyi12np4j8eooskr7w05dhv5obw17mu6gxdi85vq31qs5me9b2l026uufvpxdaan1qznnimdwvzu4rkdyyqz9syst5np7mtt6zbos6xc29vi3ql1wzz5oadfig3xsg80aj4d1jfhtehia6ey8q7h3pe9j6chd',
                filename: 'zoeeyc91omsebtt21wf1ny56rpppail7xr4ri3o8eze2aadlo91x0a0x453rcahyver2n1vcjnqve415smhcztavx0mgmmuol93emqs5hkkq29mmh4vaajlv1y2sq5rfcgfv9wntit95ncn294qcftcqi3ev780km1wae41i25kcy3ilg8dabihn87ek4v6c9ykz4q2dahnm96y8uvponn362c22iki4iw3dcupoyu79ceq3vigbw0x60bgdbc9',
                url: 'buelz64080vzybn49clhe0frp5bb5obm2q05vr4nwt6p1q73jx393kj3wo3kprzvyxjik1gvpz5s4gwzzjelbnx2mc4ykspgym9f8in0r0x7uxxzzaewz85xaalsd6mvqnitf8u45q4pk2yehlzb5s68emplfvp0bin2a63kbz2d1k6p1hl5afc1kn3c58ja5cu6um1zkvvxbnetxotruegl829uoknt3boxluhad6jxwgjpzzq638mgjp86ezchxelopnxwkxerz15puj6rt0v94mdi8nias7r7umusxdoowgugphp5wjh96v9f3ldfekdii8rclkzzmbt79nc5xh2c6f75iye400exvm5e86oy6brqpwmb122eqivgs2xvzynw30jm5k4pnzeayjnxntj3bulu4sx1fa1xyxcvtomlll809w4uv9knvjet1d5jjfck5igv1wd0gmrzthmdodxnvl4q35q9khc77nkr0dupd543zlcthzawxy9rbxjupr4jzpvvl648un0v7felp1ucky2uznz9f0jy5r9r1at3dm4q05lpwthx7roehhmi6kkrvsxp7fyo3pif7s23mlqsxxgmklu3cq4k3i4ly1as1guphsbjph371077q4v3mqq7kbmcjvu7tyncyrfc18a0s7w8lu60h2uafbjn1dsp91farvsn8ey8lmkiitfuguxgv9dvbhonuuwgczulhocyywxrb408i3dumepfnukmmjmkbnaz2foje57jmll4cnuy1xd7hs94pv1nq34c5d441weclee05c7vtg78zmklc2xum05exkbs7qdtm1yifw1o7e090v1vxtqmz0muk4stdxwzqa8qud0bs5dtlgimj6dfect1ib0o48zqmdfav6mikf31e8nn7uovkv8nhmxehq6nosrhqsbaac6tvcnf5l09zyqcqr6n9xl6x78q5v94hq25sfsa3hfw7ilk7g4gg3bdrnvpg8zixpm1vyfwhgp87wuqg4lc2diuzysz',
                mime: 'tpd82ia15ev3fkfp88uxkteikooiycobbwn5ub0iwr1t68czph',
                extension: 'ngjxth609nhkxmis5gtwl91s58g7etn10m9km5oafs9txp3i9h',
                size: 6675666635,
                width: 940302,
                height: 250785,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: '2dagtf22av3wo28uvyhcl6qsk1tlisy497k4ez24al0kcsc9r3dtwa1qjjdsgzf9uav74cms307yg3t0r9sjh34yddtbe98narkhbnj9wtuulhrt2k3fz5pbpzed59ycfip6bkom2hygd87fpru88x6e67hzwtkboxhhdvcmz7gq5wttck51d4i1g0jfr2cr9fybwdnehnyspm8y745kywhccy1j5dvqr8s7xka0k05z7ysjcbwqqoghwcs54my',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: null,
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 278044,
                alt: '8xwx6oi2i9fpjxjjqfzz7uyurjpgl8crd67bbnlg9vc0cvkk83e0rjau6a6tmdcq4ftjk3l6exviruhgs0k20gmds6vfdtzax13r6tajrxa6pwkksc7fm2okltswtyganm5j27dr4kvawhyiman8gp31qaajtszenslctbugc7h4cwcfdjgvrf0nxoh33ozaihepeqmfze0ugs9l4cwxufrj3ijeda83swfc49miiymhmwr5luwedxrl9qo7lh6',
                title: '086s0mo1viw75krty4wvvfiy30fllmm93g1imyrzca7udzcodyuhtikvfwvqhaivq74fylk8spc61dz1nakxkkr23pxqlbzla6a1wmg21vm3t1uw2xshgo6hn6boi1ac8ya72kzhk6hkm20uqz9za7pm48zzgh5kvy3oflizq0udzzagm87o7ewhg3lmf9xc98xyi7yvl8ehibn6xpok6kl473xt0ulecjjeospcfx09mzn9svl0uay3akq0fu2',
                description: 'Aut ullam fugiat. Doloremque rerum adipisci qui quam et. Consequuntur possimus reiciendis quasi aut aut est. Libero ab distinctio aliquid. Adipisci eligendi quam.',
                excerpt: 'Illum id est. Occaecati id beatae et. Rerum quo fugiat harum officiis velit impedit minima similique aut. Voluptatem vero inventore quis voluptas in deserunt animi non ducimus.',
                name: '8vqito4ekjn991qs8favlg65eipezox9s9a5t4padquqls6gh0vglz8zyc81yajeoakqnn0my70mdoetfbbfw6hytlmnj6z0scunq7k9umeept0gb5or9psnowt5jovuo4doso5tsqc2eyu2khongmlucbztv7isjfz7nvj4yufphoa6gyribb7tiapdasgkp9wkpdmxuazvj36aijw1zm2o2qpul4y9s9shzrsfozgxgrb11hvz32thhi0ffec',
                pathname: '7ysn5ol16xbyrq8fee80an7quatmsgvz162x9085m8x73qae2xxp2r5cfu5mz87crvb1pyp5oube7u5j0n6jpjptdxryq30fxy0oeh4133y3kw5o489h2uzobtyjn4wgzh31l7h4ntl9oivd3bpb45v6pfk5bb73fezhbrjngm7duwezoixcjdwtayjkjhvhc8exy27jnpcmyxpojsvplnz9ed14mjmlnceqst9c0q96t18qysipomhql8ax7ypjuke3bri2kek05pih6t8agbcewwnqtnrjc4rj26ii2ok664f5o8p9rg13c5xodniopbt9yywyfr5u5d68g2qkbdkik1ttude6zzne2oha3bbneakbjax3690dgs6ec49tnbtrful17si1unwo7yqk8x2hk14olgkbjf2ijcasz4b1v0jq45pslefulz1a0m37t46faiysrzh0cikpnfob6z7msztpsnvqal8rte0uetklzw1sgs025dld3ipodxmt5y90dkrmfgyqygv9xx6l2m89tyhhl3rdnn81eih3ul8r9asimce8no2pmfzgnvp1cqfy67x4ypyde9zpzkfpii0g4j52x72n6sy8rx8q0oml9ctga286tofielaxhpx2f3qnfkx2ghn90grvwq8vdz9nbk5q8auclft2ffsv40y327n48ym5dvw1g9mchtnurlnhh5i3vfif7m8g5pyr4lglc1c3yv7y1tvtznpqz2t52phqiink4lgq603mom9cdasafpis7attscjj6bv59wjl4oaqlu0z7tcd5biq556hmtqz0drijc8w4rlobsuttgvhpfl5xgliothwhh81j9xzhbn4vxdi8cgpoxl836gja79zmwv4h3wvn1ogskw5v7a2r3kl949v3hpcuzw8ci8woh4ou2wfzxogipydidoq172c3jr7hz6hlpxtwqa984vzad9vgo8zlsqn4bkscjoe2bs3p2fxqdmii2tk10v0b1q5ehkay3syy1l4k0hi',
                filename: 'dhx05ljnoyyw05de45q90nufwcgfth5lgsuhp3y91lm4oaccq42q2zhxtfoal7kjl4o25t2hi4wf6zgl5a7c7yzddg1hdmx0y4cb5jfjjampkaa74we6173hgemsn6lekx9uvl7w96yrw3olllrrj88tr5gvfu3enjehe7s93u24u8v0l4s4e7ue3paxb2l96zgb8y0v9junld0y106z6qw7sg7kg85zdvp1viz8rutrj130fhkybb7748zqykt',
                url: '2mk7ysulvqdkec650f9fsh6csxwtmu7c96r2y9mt1x7o7ga2v0p7lfcfnuvocsliasxx3qatedcnfhlv9y0vpifwx7jkyx29cj1n2nkg9ubltso5998j9z83n8941mm5p6d6yvkk9gb5ibsg8tzxajann6h8zgs5nhwqcmcl4wjmrclx6a88zyi1kgbfagrnuluhftmwwbj7tsij3rdf57nr17d86271uutqtfgqyl27no2hjex8sbe799kbajzss39nor62sikpddqwdbbnlyvayq8t773lxjuigfry776raicyy7yj6o4g2812djjaa58hmjxla56qyj6672gm8fvsv4199wegn4zug20m3mgy0o6i3ps3xu7kjfrlxhn5rkgrmr2h3fbaeeoor2loiey46750lszlsq7fmeq8utdkqhb6a36xyu4pijxi7ln7k9z4l81p752xy048h8tkn9cugvhu8o898eypu2gdesq2wgmrsg5nafn7cqyue3huupd9ras8o6nvstdc1v5yg0h4670jm4l5rxnw6yv0k0tysxyp64cnd6n26gobuu62syuyizjzp4wihggwnqiqd02dj0nonuiu750p4ggd8xyl1gj49zja7k1gp4oqhh4naq10o8on6nqqt44vk9pu9tlse2zy6ujuvpltfeoajtpcqp0f01s22r0knhpoqcf6kjjc431hba2i48yzimkef81y1i5ig4t1bw4cikuzur5ywc8g0z3sx53wffmczjn1wb56rt4tx774wz9p4kbr317huk5ksrk73fge93xcshcj8g149op1c3bjbk2j10cu8s78yvi9b1f6jmhu8eonhak2k2myandlqlj1z99p4amb4mnw897370f894qhfs75z6saabrtxdpqc6xjgxszuccrv7qn4r6bman0njpt4fhb843st6z3bg1cn8m6qfsz6ysn198p5racsq4v1u40793398smg0vm9pib8jke8aslpdj9ifnmjhssj889rn1r',
                mime: 'r1ttzn69hl391xuc4b7dq9j13mec7nwdkulydhxpsa0lj816zn',
                extension: 'kuz83ezszeja3il69d1xvp776cfanov9b7bxy9n4sc8qhsjfhn',
                size: 4448396480,
                width: 772201,
                height: 523739,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'u8anfs1b2yjdhlbyj8ralntbz36o699rrgl0m388jcaq801opvrcxdehtka6ay00ipuw8f2w9k7pkdmhxwjmr4blsux1sm27e0smy5hcu0xdv1u7hr5a45m55uule0sagsgw1dogp6earou6rsdhr4ylxeag549qkfms0falni7gw83hkcwkjeyvf0nxd9jljw48ftsurtj5mu7vb9hkluj3t2rkj3uco2pq7xptatnbboumpdo10eeapblql1o',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'eb13cy1a7ly008v44cv7baph18g6xintujn5tnn9yb5i1znvl4wr8v4j3gp47wxddk7ejbf00st',
                attachableId: null,
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 559300,
                alt: 'lijjynk1rl86979luv4l3seixh7rvublo9oesmu4bjpopg95sa8jebwrnt09l8w6qy6ox3db9earvsfdpapuegeekgfcp2enn8dfcmcrjpavrk9ngvau60c1b0dgkafjbpnrwxxslk0d9dt12ya4v4p9os0h5rej8uadz36b96r7a0pcl7m6jw0r5m0z1jybdwvvgvicba2rtha52vgh1p1pl7i32vptq9mc2r3wbdx0u4l2g7fsc5y6g4buprd',
                title: 'xs3gle6bm5fjxn1govuv6k9zsytqevic1pfwbf74mlh4g5g9hjcip9vwbm8mf40x3p0pn8cno0dzs1cte25vuv2vl5g0jbdwkfbrzod35jy7sniwzr2fx99u7v3kg5igcef2t0a003wv96bqci6n0sy7j86p3b2bu9l5wbg08as8co3x801pwh297pkzbo0sexr6ygz5qnt9ku0bh77dnaajp9qcxl2r9yfqddwum8t7jg6k840z6jsxs12lf3j',
                description: 'Quidem quos qui et eum dolore eaque atque. Nostrum sit et enim quasi nulla amet quia repellat qui. Voluptas velit autem quae dolorem.',
                excerpt: 'Ex voluptatem perspiciatis facere optio. In dolores esse quibusdam. Ut nam nostrum. At velit sed autem recusandae.',
                name: 's8f33a3ahbn0vdvvg70y4mgxrr0rryrpifbtx1wkhhsve93wi617u9w3awvpkvul8nm7o8hzqifyannftm5buvtjx3g27p3knbrd3yth03uetwm2irihyg5al7p3oxjl0ttcjyu8pi3lw5fakyq7qc6gaaie4j046ewblyzt3qv4hmxu70lif43ys118nheumyrqguy9z423181k8jjmfbt0v77sgpfkowra4rpcb2ik6765jpz3cer12jsntic',
                pathname: 'fzrj7k9pr0o5kwn0i28jsfu4vylobzuu5s22y0im5cncbzv2re61t1c22kafoir8pwpbsxxa71x67ifv67ip4wzn0i1bzdk9trshonqo6lo59hv92sipk4j9zhhs8ip5uhq1l3v3gj023tyr7i05yrhpsy02j9yd6v0ze9i0h4oib4rj7nsuktrul33o227gz7wp6nh29oe6srf6pioahvqxwips3spy3j2s4lwx78619ae53q14v8mt1fmbb0rnhuhfq6gdkqs15my78uirn8ac60zubu0vd2neui9lfo0817ycjhovzle0ylt07y4k2h10c91i1rkilecr5mre37lbboidhni3bpwonl8jf5dldfijiuzmpalr0m8xp5vf8pxtwa2bp1qtsd368pexcx09a6un3b3x54g32ke3hl9zjx8i8mqk9ezaehhyqxlmjoltyj0kem8uw7p47drghpw27w5outgz7goqxni2y0huomd87wksr7z96q9gyezf4ka1etunqr6ettsiy8xe72975au7boo6codbz1lo90ba651q0f8faxyys6wuzd4ia4ugxdlkjejve6fkhhbiw4jeicopz10sjwtixv1odlt0q0rs2pord9bcx3nk18amtwc9yffxnm00ke52k75l9ynvmskitf5osjkfeopb859xeb1k5z8tanki2usnzof3mb1mtchlxpu6dbx2lcbc115colcwv1xkc2ig58nh0ndenwf6e75ladez81unhh47w0fovqy1xxmmuwfcsbvh9hzq9c277nyodeqhdkx40p0v9i9b1yn5f0mzoxspl006064m7m2r9jqcyfauiygy101p82i515myqzeuar4pmvyq0xulxcrdcrm3pszllucf4unvb3594px197grhb6liylc1yihhmmt1igf2qj21eewooyuche0mc32yi6lhkjdftip5gixqh8wnm73f395uwk5i1yqafup2eweq10smw9iijr3lgg127dxdnwmlmli',
                filename: 'yzp4vhclwhdfapdu39vw62vd62b0fd2y0s0n1gw1vnzjjzyfpu391ws6ar7ukesf66xclpllvhtlu76hr3sjqi3pewyril31rtoav6nwph4cle7zvgtihowl18x5h3lsn5warde48j8fkdmmu4pjn9qosayc191m09innv584v5d0j831378i5htxe3lyrcgh3lmoh6p3zk1qtfdgem1b37fs10clh976kobdqwzgb33x95tvslrwjex5yozbvz',
                url: 'rd39od87q9wpxx4bcje9g11av20ihhdecdwpheybacjpeq74crnm3r86808215a9a5ic94z4s64l7duwz1jxc1ts1olo5ekh6ypxy5k8v871hafxe80hfv7baz2wwdlg5in8tzw2vgli0kl1rhd85ie8ox6tbb0gu2axugtkgz92nxqsl81pvl508xspa86hiqv97tus2ooq967x4uaoh0rt3jp9ydrtfyc7dfm2e0nijntnr6a0e0wa6mhackt44b3f8dbk8w38uirmhjpycp6ft9v3pwb7w2fxgooqa55k8cxhis3nhlukkfzuggngjou6bf4ikmp09yuxh7yjy8nmn35zggte57slbm2vaqpy3j7gtoxhm0wkvr9rhgmqb0kqu6uruyuz8wwzhfvr9eygcn86guj98qa3lfo1272uanwxu8fr4i8okwgrclxt06wi5saeraw3im7kkb79fsafl98h6a0nvtotqncq1jtsdd1hxe2u1ufnhrahhjbh6cawassqyeg5q5xsi5szp3oj2avq8uycxvx8289p3bxmbgvab4fivll3gz2d6cn3o1o13qhwxtgxgommkofm4jerczibnje8rl1tjllt72embo6hw1w5tl4hv14ixflvmp9pln2eym84eeaxdlbg4jdq1betc6f7ctjhcamdkfw0szgaejzz4y4kpodlwydrhyiigerbaj3sx5eoxzdwj379opa1ivbzxh3e8ieyldcd6c35bqr5lwc8spsc6wh8uljmt2630oya9fq6ph35n0754ky7dp1pj8hiy1oolmjgcy1nzvbeyzs659sfoz457o40v0agim0phgzi9gnbdiu0ulbn66lkbuhqtpgi8kc0hw61oomyai943ntfz3swr62tvu9xi0o5sig03pyl3a44nh4qd2wi5wnzyqqo6geue5bxtmwaixnx0adqu836xsmellx3wzfq5o4y3mpt7lpjrny6aqplvh0xxbzs60qsf3oybleb02gfwj29hs95',
                mime: 'aa6m08l7b78h7zgzei13fmbcrdz9uvplduccazxliyii2chi04',
                extension: 'w8zlrp5ex28m7618p43cvpgc2ze4h9yfvb3w0nhxmuvivwdood',
                size: 7475284137,
                width: 755102,
                height: 987262,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: '6ca5n6508qrwaqtky5drnmiek4k2ra6vj0joucxogjxo4kj4kk3j4r0vvu8irc0vrve5u760v85wkz79hdtjthi4kla0gqjhk99xe813fscq8ljg4xii4pca67hk1tdc6gf9g10mna4e2r1stbi4egd09vf0v1to3t1xjm8pgj3uxwuh3ygp7tubz8j0qxnnplxosj58ruwfprq4aoqp5sr3ha0gnh77fxweeq7gxojw99prjycgz6hjw75swvg',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '58o8ezbpax922735nai2z1a9u1nont2ju8523y9yn1nhgnbgdaf2mpq1ph7mmqmqtvk6hwn0xb5',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 969826,
                alt: 'hf4e0goaeqso8yeixkeg4kvbw6hk3hfj4ausrz4czgwzqgsml0cu3gy9uhm7ri26x6etpd61l45gdj2y76jf4gbzvepohyqf8798ebqabix5rhs6lp1t3hzbhk3n1ua6jdtrh82uk8kr5k07ivxz3y2nm2my0oaa3mau6dt172a0wywz4sfqgy6ua693scxgfqvnq0447ofu568ra6gv5dwwvd6ejjiseq0guum0q78639snw2v4gv22y4ovbyo',
                title: 'heo3lc0lyjj2tdmlgw2cldmqonnx18e14f0y93wv3ud0zts9pjrf3qrjcxkoq8mgk1rjijsdhsacad9qmtf6ex97vxxhcb5x5h4gohl3z3pghau0rcg4qfl3cfzhdfwwov100svqh02e0czv31qu98ger49p1wo93su9euf35v9cigw2awspml03h1m2jkz1sea9klgylhil54prefs8boud8mzqva09wh00sfndkag3gd8dhma53qonwl2r6gu',
                description: 'Officia consequatur sed voluptatem aut voluptas consequatur rerum cumque. Voluptatibus accusantium culpa veritatis cupiditate quia odit deserunt ratione ipsa. Labore adipisci sed eos harum. Architecto voluptas ut quas ut sunt tempore odio iure alias. Incidunt dolores temporibus reprehenderit. Voluptatem velit quia omnis quia provident ut.',
                excerpt: 'At aut explicabo necessitatibus inventore velit. Quidem omnis in quod. Illo et aut. Officiis numquam rerum. Omnis ad et. Aut quo quia omnis dolorem quia repellendus qui ab.',
                name: null,
                pathname: 'el32tkpqtwrzadl1w2vgkh7qq3zig6b1hsuk1emb2o878fyqsgc409pbvihery6x5uwi7v3cq89bx7lykl64yqf868lvr5c3s67pihrsx7m09vgsgzeomc1s4fwgyvxewkt91nakaiqmivtjeeuymuknxzk6dgi81t34t67wymukbea1wojjhbd202664jxytk9s702g8g4xk9br6o2l4y3xaa45zys7xi02h4awo81w24oi842xp7zcgb6lxb1iiwmok99ncycsie6gq0gnlyxnvubkovrxcmf1hmy4e6khyml9ohdw4j2w24sdqicmco5l9j360hxhv3dp84wqmroqxakd2v3jtgujydcq096401seouvg59tt77aw5bdzyz0i6oo0yb303nlna5bbnoghj7vuo705msyorl8iri8cc33rmoor5z7bjuafgmtkdds2dxeg8sm4lzuudssur3o1ikddzi3ieye01jvcaqzdil2itjn0zivl0nn54u0w3tiszdez5oesnh7hkduj77rc6xhtp45i1b6q8lh339l07d1uvq7qlgm6okeh2aotxl8vnu51rgcehjzow5n7toqsqlbmvlavu2x73s64fk5o3z91qbk76go178yczp7b37zfp1s33yg1lj447ew2bmpbl5ji6o3scqp0wd4dcu4c60zhbezhm1c2xa695tvte7v0uu9n3dh3amht7c2f25lx81hlivtehe1sc3h6u26p2gqpqltr5lj2beg7qqvpeutt2qfv2p1niscy0edq3pz9tj2959fnkq9wfnhp6w9nkvo7qv4b2ywgg1x0fjn7l0jb3h2o9n3xzh9lsiernxwpl0v5uhvabwrzf0amfxnoofa8logcj73reqwhpbtmjlhoiyh4qscsd3wtuz0h9fyn1dnf1avrjqs1fs0iemgkn9k7b3aimslqi24jsxetjdc4ul619zkd89ohtvt8wcjjcv9k0lb900g3lxsid9zi3kylmrpyzm6cde3xlvdl',
                filename: 'j6gx5al5pnmoxh35v4z34ce7ir1q0zzmyz0g9zsj915w47etazfcasc1by1u2pma87882ly8htzhjxrokhei9zpdcseu220udlav711zmzu1zwbs1gga1dcj65z7cnpxythq032k4uujd4dqe0x2u1jgfmtu806ed7ce4kfur9m4fuvl6domvxerlithms76uhx7qqbx3yi22fszle3fi5ch9jgq8btdoyy18z09sbdu0kwzissa9lfbvx0y8so',
                url: 'vf2shlgekp3hvs07vagmd1lm2bkfdmbt9h0p3ct8jf7gom5mfgdvljtv8iaqd6gt1l095mlfd3njmrqzji51pz2a1jl90henlg404wog8p8rqhpy3jh9city88ujbuc0z0rii83vg8hz442cxjsb32ij4zirpd8hrrzs4o0sj386bc81n41ezpwwlore8qoepzqrb5u2m52tzcdkzmn3vvx1117cdqs3jxreiwjfnbmdizkl2g3qmnzvioh3t3bzr6qertapx713kghaia51540t7y8t49wiwtltri9uoqxdqmhn89bysnff7g6wm4tb3ij0d5m9xeeg3kfbx5587nmbr70yjzybm9fyhzx5jvtv3f2v9jujcoefbjkudjhq4eimaz4bcnl65nf2syq5lmj01iy5qatr4o9uokjgjizejqz41sp7ffv59i4lpf00avure3c5nsln59gs46typ4hiabyr2vuaf0ikqpzuc37m6g94adoefjiyalxcuhp73pfv8rpk02sq8rxo1zjan06pdcvpmwmy1xmzqg4hv1ka2pdbf9fxxbjj4wa5ybeapk5unxllin3ys9d5zcu5wwwp6u1jtk74gpk7ia7u3jnocl1zqpzgfdsrewnmxuojvz0zohjpxg38u27ynbgmv58gzr8i8hu0i0uv30tbkzjwimxhsw3qlmnr2s7rlphdovqz004au1xq1k8topqxhumi07xn9n99uagx059bt2ux67zsparyxqfc167bud5vt9pldn7s8sxyn16htirks4h20wfdmfdftnc8bqbgw82c95xvt5yi5mong2udiqrun44hpm7eezen9yduy7n3v4en2fwbqwm36aieuf6zs7867nwiy17zb34pejv3m3sazaxrt4kfvcx8xxrsxbmixrnldku71gbq1d1gsrbryiiil35of8z1bgx66cn4oj4iim0cjel5r9xwcpz569vmfgzfcrelisctxym4d2evcie1sp75cewc78dwphur5xhr',
                mime: 'szmsav0orcugkuy19zm5dgt9qhydx6ubt1l3e71t1e3dmjsk1k',
                extension: 'tbhi7o39szi4o0zqt93jn08nm6g6i3uqsco3vyd1igxg5ff1t6',
                size: 2352776598,
                width: 274535,
                height: 396084,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: '7ncsl1x82dsrjdd62izv550unugbdhx20su4263yhmqgjao5eljws59sbrut953kmqurb9k6lcoroqox5dv5jax7chitnfu62udpfmywz6junfbh1nqhcbfzq8i3edza6ow4jr2vdz63v9cc9s105vi1sfy56ce7jttz46jf8h1h31mavgadwop0zsg6k77y74wqn6rs5o3v74i95yqtinafmg0aqpzy2ses09d8fs5iu0sr7qozufjxg1g24d1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '2q14sziv14gxm504rj8kbt3plk9t91swlzawp5fsq09d31259oaoh3kyse4ixemrgtayeawrgj8',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 329853,
                alt: 'ykq0k7hvrwroqkyv5dh04btnn651a1n1xnkpuyemn4665ygic90b0oge6p6we83ldgyvm0fsbx7y771c0007c6d5cflzjieeze51f5zn9b8pwckad8jxkipe0kpqvvbm0ezzvkp5tyz1qjm077pgghsw3gw8jfd63fijyj99461i6l7ibnot6rv45snqy1uxwwj4l3v5u99sdmkpqzvi4qjg0xchmeo3d6sgrg8ymo0lun0gg84ki2twm7wno6g',
                title: 'nzj8vxmjw13sbcjfy0vd1bob1qqgtnpuaimdwqkarbxefsnxt3t5nr2zk609v9if9nexpb6jb7mpg4hba56dj8459ajy7uf7kjw4e9dtf6hqr686ia65wmsumoiwya8pukpo7qb9l6anvm743i4q0qjs7vctsppjiuqc3g23g55ioln8xwb0ul4cbrm2raw3gmyf4d9tnlfctpdez5aiagmrdpeyyxsamxqbxxvr8io91h9oablc8dtubruta4h',
                description: 'Ullam impedit deleniti. Ipsam ab dolores vel est et. Quia modi ex est natus nulla officiis. Impedit voluptas atque aut similique quia.',
                excerpt: 'Vel eaque ut facere sed suscipit odit id quis. Id velit sed veniam et atque. Officia et aut. Harum temporibus culpa porro enim.',
                name: 'knxe2dfo1s2j9nl844dplq1jer8o6gnoa5eq56sz9m744hrys5mhym8ontm9gvhoq1ss7osalhrlj7qi7y4xichta74ibvvaqg8yks7hfxqul5w0wem72131ndakb2r0x6dxozx3zngki1k4y0000qi63cwwjsacdec44cshqr9qrvgm8tj2cn5gnvo4dvxm55voxgrdetkatmuopkaotc3xvdympa1vtfd8o5didjgc9fq016x99rxfm3f51q8',
                pathname: null,
                filename: '4gri1nf3lh3hrq9nmbn31nz508z53wo3wnbeac34wvevjm48mklygsrj2wmq9v6p07ug784flrcr0znhksue008dqx0ly6690jejhpglj73upa9t5f9gyo6by7ow8vkjj7jxa9zuigdzms6t1tde5jseo72uf5v83jrgx0whjrdtyuf69gij8658wsb71cpdop3pg7ynj9xjh4bin8baaqf78frc92x0dypwcg9kerfhhv1su3xxp3awae2zvta',
                url: 'ygxlhvxkc4e761eparolqwe4yvy2a3s6y94hg5p96w5nbus3ozyfwvy5h7omvms3tw35afra1q6hqqf3l7qjk1nt1ecpajb7ee5kx0m3jm5wwds4059uy3uesihbqntvdau1uiqaxc1789m3uhbtjaprw2i0m8bw3z1nv25wuuq0yct24owbd22zxadrc1yq2s9j6og72i2crmcdkeuyybz4o76g22ihkyfwgnbtsd2vku7e9ckgvjeb3pdmk06tqenpsa8funk0uf0ldv2123w2u0ib00q3izcrf8i1getvyuts96tx90dyetddplv5slgq1aeprun4ci231c8uetxr00qfz2nxjydy5z5za5v8q5apxfr1rf4j220u0p4qiyn5iby2rp80wh84wsjzsf3q0poq5fexpghfm8lfkt3caa45kcppnztsrwfl2etn80khj3sonbj5syofuz9wgt6dj53sl825fumv5kc7yjbkbyascav6qxlxr9vlq55ls6upeuz8kq1ftmxn3eccbzu5v1ce5ufenh2de70m8z0e8ziz0y2ligccj3wj9ply0vuupceb90km1vc72v1jf8w5055w4l5ansl6kccnogfzyef3dgqfliuq8v7nnill6nbyacsmw9zbr9h07l325idssokeb4rlz8kbzq5o2pk6tbcb7ee3qjohqrxjrd5lkav7i3xhofs8hjl3gx3ttc68m4gjxs77of7qkv5yz4z9om6w42uug42huctg4qb2snsoh4z4fu01urolrttkv29zgvzyt3fmhjvhmsonxpr87chya91qxcq0o9zx4cq805qic8zfibx2togba9wjn1fxe7mfzaj7xrkwl3f98y4po12eiteqpxoyabg7aqh9fiz3day4qtxtyu4uv2p550za418l6yvmzo5kd2cz7jb6hg72hxkh7qyeaf669day41i39e9i44869r29owjdceztfpql44kry47ihsj36dqufqerngomyy4atrq708ev',
                mime: 's8cr6lqv1atayk4a0j1k3ewssscrgodh25vtges0g9g649d42g',
                extension: 'lbrocytfg319hhajudzpucxbh57w3cl8b2fqizp23ypey903eq',
                size: 5675805458,
                width: 981188,
                height: 643344,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'xuezl2kcc0u82zouhdqx2jd12jhr56tlca47102ujtzncm61nxwufa7y4qeag9cd8aojajn7ahupqyjc0rztwq19d98v8yb16wvxh4x9w8qhd5cul5j5glen8dwz6k9y2ynx7s0suv7c7v0sk58cs0bi8pqdm7ml78vve0w3tp8cdimc9kisgv42cprrwp4jqui6remvgaodvpjqo76ctipj7xos4me7c01wsds5yqmc2xv8vpth0fskmdqdofd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '3mv6913sb0db7p0an0utmxazbrmuijuarcpuuzzjuz2anh9fsmag7qwri8m0cn6cd29y16hh71i',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 317273,
                alt: 'cn0ehy2wtc3f66pbjcyyrqib63a7zvhhm6a2tmj08nqikzb00qksko8nb7u6kwyr2ir1df4wjhtla1y19btf5ijsvwc4spoz0sizr6zlsci43y326fielqs74lshcz1lfy6rqi3afnp3fmwptkfs0iav5w9corho960vvofliu2k9ssz4vhaxttwo164d318mnuyidn52ygxc5cljfck4idf9a5g94u7chfvfb41jalo3kbtxvwkbsyohdqjp0t',
                title: 'ndtkeyu7w0uyji4aby2j1p633r58xjyc5y7k216nuaeyd6my84st1wd9lklqhayl1nc5vcdl3z8jwt424hsk7az1h68ji06li8cz59ntd4eugyddqxg6i1a6a54xqpx2zfcvixu840qat381zjo08ks2fmihw7643opusr4y7xp63gpt2ygs3zsik84d9jsnuzx8xfleehuv312of9vl2jdyxw70djr7p6emjc6vqfwk9ahzcxbgz75z8xmy1mc',
                description: 'Aut omnis atque id molestias voluptatem. Voluptates suscipit assumenda eos cumque suscipit quod dolorum aperiam. A cupiditate modi aut reiciendis recusandae dignissimos. Porro sint non. Necessitatibus ea quo. Inventore deleniti dicta enim.',
                excerpt: 'Aut facere dolorem. Quaerat molestiae saepe. Dolores porro atque qui.',
                name: '40l98v4ruzgtxnhcnczq1cla1r05dx0fnidoduo81eolvkvixct7mlz8zhi82i4cqhm7ohgjrojiyz8hyrodx19g5gcqvonx9bt57ed9hchhwbr80wcgu0anp61drt84bmmua1k8c59mx6q2yf8m1p5x8msko4umkkh1rcm408u4ulao0w7hzm1mgopfbn7ptw7n5cs81uukhu2teozw02iaf1myjvky1qfu3ksaxtgkqpa2caq6s8i6lkakkd3',
                pathname: 'nfeooi0dtct3m54v2rqbz66f59m37qnqyw0remqkut7e3f4icjyuvwrn06ek85nvz1x7um7r55fjd0zy89q7cksq32sqmsgoqgwya3at1ose70w7l4h8sr4xolbevn2risop58fboyj8m16c2y9nz3iuxbpvtapu7u6l09y3nvz013xd9zslkjjrg4mfzo3qvx6w1p92xq66zs566ntucaxjjvoum0plr19gog8uw6yrecmjx6k919w9b5kf7f4223nxqsfd33dyqqg5xy8palfyo56qoxawf3sf88j2dwople0vvo4o4hs6klq755y6uh5t4cko7zr03resq7e6an23lpp3j60c6rigrgvw3sael7u0tmiyimhd9yomyreje2g6dxex03uhewoiwfdc232gqq02r40o96nhvajae4gu0kda4fmsxysjyd038qqw3uwe3gef6iubn76a8ayp44inzvki0pxg1qww2be6ubqcq64s2peacug24vd8sfzwe3sf361l1j743grsrh38nkkx2n10hn7xeg3j47ct4gkd6ev5mg7zvddyevkvob4gdsonzcpdvon4vo4u4l2ips6tlhctpwcug4s4i0zrb66lynrmw18vbp168tgxihws6ew2hn19szkvk9gauxsqd9b9t1znt65slepd130ouq9ack1ihk95brupev7nuc9ky00obm8ibsc4jtsqnm1jyl7vg9s6gh8nwk4e8xvotidy31x4kf5hxm645vj8a71j3xmdg3q8sjr5b58lg0sbvfijbp905thqo8ehmkhyxkd8v4xp0yud48bksoxdcew81h1dcoo349r07h0njsl8r1818ua2lwawqdvukg34e0vdp6o7lt0yt1cwar6iq16n1av51b1q6j8fcum1lhept3jah62kkcbbece5uwmj5pgf6rukpeckmlez99r593zj3nw4fvrpk1gevwa7vu5afzzif3hpmxjqzmu2srxscza8tzxlapg8tg92hndml78a',
                filename: null,
                url: 'hfbknuvl0nuxnjg9wyjiecwkahse8pxwjp6xg0cign8vtu7suj358qrpt6znr5dg1pk2bwevwdkkupeyjgwei0walcakwq3gjuxry4b39pyf2rzekmgpvjfq9hqaju8axwn1vlzjglj9ksnrh71e0mi3w62x62v4uymksrogz77nhcd8cdzacfh4sytihnllvivhn4wy5lm11iyh2pon1j0y34ev5gsl2pj5i22mpegai8ck4bepac45hmrqlciga9jmgeg22ju89r9j1k8svxgkjyim7c83z6zputvx7b5t3lty51l96xqc6fd34maqaup09ship4ihdazengewsoqocw0uq4xtvn0hm6emk72tvqeraurwyoz5d8ikzw6jem10nbs67cnuf3uybf5hhpj9ud8pilf72g8pywj84hfzu0y3dccjl8m20u848d2scxupn464cebom599kc6xy3nilqafve3klji7unpt476x6zb7v9ysf1ft86syjxeghf8nxkz7vhgs65l532owvps03sjj4bltwz7zl450bvwj1ipyphtl45o189sbzgugt2c2gqcc8ykrd4i9y2b7opujpxb4p7tk7qi8ujyub302qv8i6ignji31w9zki82ibggj6hpdxfgq329khvslvlqbzcyuii4pj1lnyb8qh0dw6tcagbpfvzbjasv46vsdzw5hz3t66vyiytau2ozl5cxrf6w70owsl5yj5hu2ed397nhkjaesoued33ggpl14uvoqg5q6glwmc09sm4gwp6wbm585vdzvjqmzs1pkn566mzqe0s27ein559iywzrwbrz99lmaxzc2j9i2k0rx4c11arsssuu793eo044oxcx2m76gopea4dweaozwalssk11vuywjn273gykefup9gn40bbyxhqgcwmp83j8xlni4n4xjgvndrirfamvjai9eq402zy8dxvzngr6a6fz3ypphj0twcw8k9y1emsgrtjjf6zzy31fqa1y0d5uyu420',
                mime: 'jbu1izxrzze8kz1dmpbhv3wotff1inmtq6mqo3b4vgshlej0e5',
                extension: '4bkjb0axx59hrscwt7j2sf7m0q934fw8y8lbizsdm6syzov97g',
                size: 4273965454,
                width: 758093,
                height: 826305,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'wx7uhr13jzk12pomufwj5ekcvvdk0pnf14ykntbx6cob00iptgzpq1vbc27bf8nrzeipqy1is4up2kx986tc3q9b0c0hi7gotuqr52e2guii37igoyjpovo702k8m38eqtez1reuitdblnrxy790zfri0n7afbw723lpvgqy8kdt6lbd0nuwxswe9e4o0aucr6ltj1nx2uvdh7p68jh70rxf8j10o61zyczpn2lr954vn53rek6cxheo73wt5i6',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '76c3k72d8y3yzvcenod79u34c46of8s7fhof0xin81itl8klntipa6kbadeqhqu0jarhpddra1a',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 518328,
                alt: '0409t6b86pxfd7rlbfvvd45rrk6kgm8fwb9sgqiu6jm24aitli4t2ikuw4gew4yur2l3op82hkikqoz6j1lnz7snfad45uahqzrwxf2w4m6siaj3xeel93ofww8onvnv2644ggtprskk7fhe3zucclmgwowu1frsza8ibhbq1m9wsprdjqe7yf9hs9pmv8hhp9ksugs3s5pst0ntiobppfuz6g7gksoknkaq8ywre1ekujkngqxfg389ai6c37w',
                title: 'b2zj03r175t10kva1yz1fz8ycc4565gzcdcsiylv3ldc397k1cz09kqn4fldewsf71tt1vv0lkr71ieqwaxagjoiymg4yksb8az9qfbe0ae4vfq6endwvkn90ceg5nt8380yv7ncb9xa31ltm6z8l2astks2ovuacyxpxa435plb25v9kh6274scddhnvaey0sonsb6ft2h71gruilcq48mg2wx36a5zbuhn9on1wxuids5cgwxu6obrn1nolpq',
                description: 'Repudiandae corrupti vitae ex et laboriosam vel qui ipsam sit. Ut vel ducimus quae reprehenderit et voluptas. Sunt fugit nobis consequatur occaecati non cupiditate est.',
                excerpt: 'Consequatur iure totam sit. Quia suscipit consectetur iste harum expedita eos. Impedit nam sequi et ullam doloremque maxime.',
                name: 'egx08lfpxoh34kucymr2d4f2eeqtossc7qynna3cvyt4002layu7m9h34gvnlrz8ps2is2dzz6r58op5zlqy50d3qkajx237u02ffrb8u1xwmojzo92mad3oumpgqious6gx70m5hutailpj6stjra6rqbc9yhkdslabd1o947hsry5o607xsim23nn3zcjx0342cmyylp4h0h17xkz4ehsxo79f7ryx5akbbvw7sy7zk5xnsm2l0ftiwa0cccs',
                pathname: 'yygvkpwcptgp7vthffbf0f4jllkuiox9nf7ktz6doaltqa01u7hcyl3z7l9cboo879zrva2xqf023vo8bgo3jtofa0m7lqbrwsy4vsqculor3uu467jrvs188cjoszgslzurwkiyyft31udyni3lmpf92tyahdft7p7y65oywvhxgb1vl7y1uvxud71hkx9lapdel3mqh1jeof8m8vdgz7vmuaab4vhkowdbn89qbuqfhn4czydq24cur0dedogacnk6tysvtwwjnbybywrz4rnasgqi9jib2ckiq9u7b6vcruezjuc2w5e417arqme8rzu1bchebza9jg6dek5sd3e6y5eh71m49nf18n244k579rgmozm161rz3zqgt1spluxp1untnhsv1l87537qup958mcbrvuxjxqbfz792jnkr10zb8fh17zya2gfthk5y8lfd8iciyyz5fxkueszfg65v9czaz3vx07g8ahtzoj2261karktmmp5enxjxb6hwcrfx192p29j9757yubu6b9hbpslcoci870o20uvsm5dx6j02ffzxg678kijnrc2byeu90mr2yuyaxspzd27blg3t5ib4y5lr1tzm07ttil9gy3wsh35f35k25oju8nivfig6758qe03b7yh9k27q8ykm3tffs0mc05lsizl9wjddu9ycafumn5zwaal00y7sr0ozcre69dicwx4851qklqmha57p1k81pdnaar1cz2xxu0cep42q1ud70am9bwv4acrh4qrteocqus2330hgx9x0w1k30r08x8p4epj9hu034syjue9fhttycfirlioau20qdypnvxphzrvs0eiucz3xbkf5hq0u0ofhr3tc49c9yzjcynyh0z7uynlnz6s0xkn4b9pdyqduy3u7pz3rg86vrc7xe4kloptt813jv8qis8z26zs9jmuklqjflm6zicx6iierla7cd4hpbeo7ijljajunnppqxzk0j4o5p20qf958warwxy7qkivbrfn',
                filename: '99adfmhkycmyw0kplzj7ilj25i60htghqjs80asskey2xy9qwm5ywyxg2jh3iv18iilatuhew5uu30mkywrsa3drfpy5fi7ga7ec2a73egtgncw06c6rx5ncs0jhx0soa7ge2m2ttiolebxkswetn1vkn0od6ck3wlmuxhfou5mpp9zb0ur2b5s2h13pnvt9nixq5bc97c6j0r7fzj7p4vchsz1gc9xa7m52ohxh5755on2jip844zb73kmxo55',
                url: null,
                mime: '7g9mhep3pbnngl3vfgdvtt0o94bjzmodhdnv5xdmau0van7gug',
                extension: 'klxsrqatcgdr1bb4mv7u72wnaxydyycj0x94s6yamca6774lzi',
                size: 6512980376,
                width: 818095,
                height: 418877,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'wbf9hza3k5kfhddmvuz6f05asazg6qlaqvu4lokkay7h4pmccf8w4sd79clzumt832tucf0vvbv4nocw3p74xdhnrhtm63cn9ao6btekdxnx5jk2rvkd08xupnhf4g35p2oakof2c09nsfmcei6x621pt9cvoy1all1zz3dzz4vd5hklvbaed1whmv23ecaccuyz42qgqtzp0i92nq2lmfyhlmz0ai7cab1xkdqetd9qzcg43bddotafsxwwsj1',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'eisz4l5b6xt8kehz1topnf1mtvtc35xxda47wj1kf2v3t7pbk43odz08xse6ayud5hkp2clmjrm',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 656711,
                alt: 'cinatu6auz5hen6qatpmbzcye7083dsxq25j0w24x44eyvt58h5d6weudjtllt6ri7t9hl8n19w2tt1paliuxirwasneds8syvrfy5odd3khcj25cwux1321dmj9xzbvr4dxaw0aywhxqseic9rjqazy1jdn29q21xdbzi9rvyr4llf4ob9ip7r7s2u8qr6m77pvehuqkffsuctjr9to99t8vb4wwtudctkwma2noy6nc32pd2ofn2lt6chp1f2',
                title: 'h5uf5v3pchghgb78i38tpl3eo5xr1sierjiwn2kif1r0d3yjf5orkhsbu0bj484kaur2bs8p2sus7oe99b5g332kobf7wf4a0nogi2u3fmcfw62e68wnqj920qzy3galwnmmtrq0pora1frisr4jnf8x8ni0hekna5sgag2uitit6xus0y3r1hdirnr5yux6bxtoy1c634kzuwlalcvtop1hahtdajukhdnyqhcc3ppt2b93clu0z93p25el1v6',
                description: 'Consequuntur provident quidem ipsa. Praesentium et dolorum qui ducimus. Tenetur mollitia et omnis totam numquam explicabo. Fuga voluptatibus enim ipsum debitis. Voluptatem praesentium et dolorem placeat.',
                excerpt: 'Quia blanditiis consequatur. Unde dolore aut. Corporis atque laborum laudantium molestiae vel et. Officiis dolorem sed voluptatem non. Numquam ad deserunt iusto rerum.',
                name: 's4uv7paakixz8opx5jij0yvqq78uh1yxkvutpv36dthnl6sd94lnu7st8p8nmvl0vg9qall8kjj5j66j7k93bvbrq8hcgo2sp5ftyctlttzqtuecicmz2f1fejs5xp95itppp0xbg6gytlx5xxez2x06il9wq6rrx7t8t59iyeby1wzf8f0jk1kcrjuyemvlfppu3m0t2iiyezt5b5guhsawhn1t5264recxie9eevvtnzeaxv146sggyjd8dxy',
                pathname: '81zngrhrnggak5bi5jryp49tklmfwbiiilfl144sho42w7594dooi63a48r4n79qn9q4s9xssag5marwy7mz1zfz6me14yed85fs1h74vc7mktrlqmzg4xc3tj1pf04a1pz7x1qng65emsnw015ue3xj615flhtujskaocgno59h4s6x7pm3smxzkgnq1yzg7o0nl6ott0oesqy1d42806dc2bj11m0hlxnzcygj5y0fm8k0mhhh1veccgr68gn39xia4c0x9vg73ya2vqwa72k1faecy4euqm7m5zkf53povwwuopttrrdpvybah7yuwaa7csp0b0r36vkps8ax5gkxw0zrthl8a92vxy97z5cmdr64a7bw9scharla786cek7wi7s6nxe8zm7cbzzh4xm6nfa8m3e9udho77jquosuxlzsdesx54vmqyt2sfsn9m79tad1w4xwyy23qdla8n65hlhtk81zo7d81qjlr0b2v1p3taumztya0rz77800luodljg67kdn5ya1rsm7xxlsk88wuol1uqvthn534oublqi7a7z91yoiecuir8uvvcik94lykspmh8nt92gt1jwx0364p5l8rg802f0dgmv9ahaqhz9zy2cjkatux63kba4eqxlcydurzzl15kplii49nk734gu479qnofix0yp8ovm7e8enbm9xsnpb5sgbrstudydtszpf0mjw2yh8ceddeo327hhf60qc5anbn27x2imv86iqludp0rkdqs40qrf8xogjkiwbp3puldx8rk7d1fr6vdwwyolipim7q3i2a3ci57oli7e4bctt4ukeuvxjt6sspssi0vqw6ap97b1yjwepcogdiao150boc03537wu5zym05ewwd4qjqi4xs94nykpv8qivcyoqrchpbm9pidqhv1018qeo5xvmwaekcmez5uu2ytvjxwzlwuaka7srxj144oos573jp2uvs4bzhwmfa5ha28wen2tigyce6l4w862dh005qt65zt3',
                filename: 'x8lbco83g7846sfwxevfuqn1fn3fdxjay13gqtbfq6ka5v1bf7wy3voax8tnt0gdw8rcfxio2m71x5cegmwfhv5yb3ixfuumvlvgpdk9hla336ogs9yp2q47vp4dbilwweaiwe9znt97cmvzxp419jct4c0e6fpyu0w7nkaid2461hiye5v90c272hhsa6cnolpnc01cj28seblbkyr8xvkncld15tumxo1pu4ky5ap0m9pyuc5xx4z5ngac83d',
                url: 's73ntn6k4tj61ng9tt3m5w5ylcxjzwxno6fi6zu9v6uhkw7zk8xd8vgs342ycl67l1yzdny68eqogaj0c60wud731rpej1bxootmclqda2qycykcvkyfnm6qzpi8xoaxd469gb9bk9yqktgf51gzaj0lnnvadmkay99sn0gn5k9l11to5543zd6d6ytgbb8zscmvzvywxcjttfy8g1v23y4qpyokupnawuu8c8zznf322n7e4rr7umvsapor62ekc3qtthweje6mu9txlwmp482njtc9wptibelp0gl0vzg3obsrhifmeamwaucmg1572kpk5c3gcoraapm0wp8d6e6ly6o6l9joyjii2wp70b2tqsgyn5nokobd5x3x2tc71l7p5ic8ksnwfc4zpvmppcr29ji5oly6yb5h20k9mph2ugt4349pdb3w0repeq0euogfktkm6pnrr9huqdoiwy45l0vug11i0vsdzuy877aul38u9qas4ly4zsbkeatctg16dlpweoywl6wfdymkq2p8pdbs8xqqw537nk60jf7ckjccx0tu80tgerjqiinjp718g67x37nn92difsf5b6pu6hw44ntgeomohf5pccf1ypgufjxg68b4g3b17025076i369ttky3wkr1s6qx1cn6x7r8yadbwa8d8mrjk66pahhtvh7qzo6ce0tejfvligxgygch2n64s608bmxtppj8j1qogr664e6e8fj68qy0du2id9flbfbpjwqsl86024n1kwdxgj5q2k2wiekodz0m4ukll0r4y1avvydf61eldeubsznb9m9vjvk5nfysjbcx9vjbm26aowl8q0ferf5sefr5n5t6fn3x18hm6zuww5rrudbtu2sh54vf2sowr5eg7ndj3c8deyle83w5fhny26i0we444mq52oq5wdvs1v461yl8d013ucojq4pnld7jtrrq87ipazk475vao7dpey4jh06tmumg8ndxpbqfa863djisn8escnmlfo6w',
                mime: null,
                extension: 'xn654wd44xih8pist8w8idh1h974ztypn7nsx1wk2li3abo4me',
                size: 3521942212,
                width: 241612,
                height: 529515,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: '1vw6zs61trtxpd3co2zyv80o1w1lhc1vwessnoamznfk2ocshgwbx49274xo6o4bi1i0ua6chpyqf4vj73qw0ikdl3whif2ljwpir0u3i8ghkl1bc05ovqghm2xzlkjkdtk9j5d65l7bob1kd1equxva2f1xw8c5blnezz6zejuby2bmu2tv67hbugpyn0duuysb7tyd7wbjkfm305t8wffvjaw1fitcjm915wjg91i4msoo9i067jmucy1tgou',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '5seuicmz2rgb4v28rsowu4uq2615fuipd7q77dt6q8dod1lbojo794oliy238g95sq3cys49ipf',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 279628,
                alt: 'pf7zh4uyjhbzzah1vq5if3ntj6ibbjtwot0p98djcwcdtnh4w8rrypiessqx26og9v8ag3oq7800sj1rmgxcqqgtvsehhlnhfwutvf4vczceis2twnuny5kwe5wpczwtmf0xtow28enl6ltmdmqaekvmlw8el0nd837eomy134n1j4suz8myaj9wh44c0l8859m6dtwuxtjlpcec5p2lwp6zgddx9eawy2w774jsbeb97iaeyv0v0d15d6kz5rw',
                title: 'v2r6ung9zsgidipno1u8fkt4ekos13o3of4eli4uhd8coc17qxojhyzac07go677fsw7fe56k4m8isqelt3vpukijpctuu2sp01tpxzew7bg5jal28gz4g9omwoxax39s9ecpe2oume3xajefmaerl98eqbjmowzr1frzg1f6wc5lpamfbjstim01975eyi483hjl4hqae6kmv1sc80a2kadbe0wyzx91oeakp8ylpa7rm2tq6vcnutpxe2eoro',
                description: 'Sed est tempore et sapiente accusamus. Nisi eius architecto provident mollitia. Enim non nesciunt vitae dolor vel ipsa. Dolores veritatis dolores porro impedit quae nobis. Atque sit aut fugiat quos et tempora voluptates.',
                excerpt: 'Et aut dolorem minima voluptatem. Pariatur beatae nostrum aut qui sequi. Dolore ducimus illo deleniti assumenda. Temporibus in nihil.',
                name: '0upupsihtc9uffk6cv71obc15lqnoamz8f9fev9u805xqmb9g7g94dzequcx0q1nm67uld7ml8y37b98f69hahksuay63w7u7jbzl5errk6xl2u6lwdtl9lwh1j5kq6vt0jl0s59n5s734avs7xzjfhb80co5hi8lamfo86m45s53ouqy8kihccxb5bco0s2qit1cmwmce3efihgtvhw3gtswr6yldldeu1n1xgtvektoo5gm1wnahaze4y1vcy',
                pathname: '7pb17n6lvj36zzhm349i3zjyazvsmfxxgmynziblrq41i92lpxuj9ykf85r8s9pb7n6ncmvenihbehp6c2q3eru0ulkj590u839924t22c03vpuxujy1zyv6uwdd5j8j4mus1vq2t47r11amnkkm6q9jmkb01cm7f2plw962zi2u0i325iuwwbi37sf12exbkx33us00x51z829d7ddqsq804q4s059wus2q08pfzh7cobngak38i60qyahqwlqq2shwt2u4w96u4tp0dhqb6s0darfu8uw2mgjtbmc057xah062lzvpaewcvsc0p6m1ha71rqvthf5ns08x9bk2911ky65mya81u097vdeq9cqx0be5gs69cichgwhsxbwq3ddn0eg6oqueog5j1eaq40418fp0m1pomn1xwl3mr7vqouivdglf6h1ib6uquylo71a70t9dgz9fi1egvu5jc3iftdgcqr6ga96gp5hzawxepu09cviyykwgn7hb65rdax5mys9fe8lledbfcqo4vokdwzfj8eqr92hbo8utugcl6wjhmh96fgdvskr2h5y5v2eabb7hk57qv87rlkvzyqt9n598h9k5zxls1dqzfeovj6s0perukgzhqu5xqn8qw2jjhcld0eq5olz771thck8r5dwt797hnyv3vgkc8t8802paaiwr3yzrmt8hqss0u9qemsre7wyp4p959lzfi6j2yeewjyhjt0qt0u6yjjx35oktd4700w0sw4qn75hn42p4c76og2kxuhwdcf9dfxrnbl1htumecpmwhpgpyn31i1lj3nk08pow12b2sp15c5j668ajtsmk05j22jzyzual5vbgz6zisnvod3443kgnabvh99xq2zejkc7ovxc7sx4m7hdtmrplr8z8mlgrw8i91acip5ctnrufp5npbzlvusjf1y4kgmh9lq4l589tn81tcftqm8z3nxz0aay2bj4zv4cowpt16d9natkj13ki3eutnh6kjob3t5qlfxs8',
                filename: 'mrhcnb4s6z1cxpeeeydoihbvo0in4lu2cojp5ip7iczbbg1wkx5t3r24jq3v29mxga755pchjz9p50ibrbzh2sul3o6d1wfim24qhtq4rp54xk2dgk661p0lcdcld9x2czjae4lujn1wpa2rvxwlblkyqmvdp788bl7xtxe5r1cwtuk2cdoelq8lbmgrcpkv2ejehjz11td89t3a0j462aqdworrtvgt60tp0kcey7uaqseykjz7ubx1g5y4c6j',
                url: 'hdbte13l5ln1ivbjhdpqa62yo40u0hkpwlteheeeh7xbmxykmg30szc1spee6p6caze0xvme1a1zrj0zz3942wvoabco1gqtipcl6c6mzat4x9s0ie3nbliamvu2fmdwp1y330b5bvc4othxxt70bgjmakqejj018exkwzxl47m4jwjqwtaw348ci7sqbzqop87tmhk499jfih9p3c6392akhd6ax767uh4vkyxrk8cq0huf3u8troylp23b1g8xo16n5gzr2htuuzzh7hmxk2r21mni8drjzbx5j1p32uzdepxsp1opreps8oxhfw8d7tye8gxax9qhfpjakqg0is4j2pvcnnagnz4e0vnbqnb1yx8qm42cl4bjdph0x9claih0aetj61m7ov5ltrdo6ycmb413jqo4jwqp2jmzpscd3tonwdpzmt9hj8hfa662nnlx99wre9rnz0i78txg9q8y3jih5erdaxrhiwxun8k5wc6k3drujy7ov0xrbyj723yn8zsneta0pk0pxgwnesxk70hwlkcb2rcxztfoizmy2d3uuqh0xmhh4blidtsfznwv6vz4gip1kfegciqjqu2n4knbuco1kadq8o8qo4xcaj7fnkyebxr0w1ysus0553kwwifoxl8eqzvgkbw3tfz7y2zocf4qqrasa62l428abopj1297hdig7vnfc0zh8w10w6kghpc849cawdlutoqnf53fbsnnn2zga3hrqcuv0lxyk53gcp6mnaf4p4awvdwhqlsdgt1l7kg5vfcg4nip01pc5bbaqn7xwirksseoltiu262q2o175rtmhacyonikqs90u074w3tvuojfzfl36ti4asg2oaponnvnpnnwpdlnpfs6cm28s61fblnezf3r4mdt7cxichaf72cozk4zi9ugy8tqf8lvsxyqu3v7yg1xcj837lou2fk2bhwff5ws4ixaaslpfzika78mpop65n2tw1n8csk8ns6ofk1xhqqwe3bgkhphiidblgb4',
                mime: '7t123l1u6fobsvx47hervaw75yvdnq6ue5x1f4a0o4tqvj3fn6',
                extension: 'u96c8qqx2bclvibqlqs3ssrsqx10qv27oir3vanq4xkn6pbnau',
                size: null,
                width: 620235,
                height: 225148,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'lxnqw3iklspau7vwhod605v0huacvq78ccjxflh4a614ezw74f53aaaq4o8hbzfk1nedhri2xbk2rpqbo6yhbu1avc1jvp1hr31b7jreblff3anquz8vk8b3rbyv0elfz87xam5f3305pdr4xdusjoq4i96zpl0xu027krxb1vplyinwvx5y4ki3x5ix5ivelu1ru0pci1j9i37he9h0lvhb3upfdva1ko2ej980qjb15bvm3aswi0t0sry125m',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'szf1j5v8v7q52qhmar70z6dyiwgvja0ao4f65c4zyvrqg4w01ks8k1ncexontznaei1ksbhmxcv',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 867047,
                alt: 'sa8p6ajd9qbn0dk04vt6p1u7qq4p2f3900hwckcwcdy4jshai4j22pv8r4yr8d1qgafzkolcoxs049av0529xdil74f4er3mb7l1huuxvzxv0thkv4qyrt864itgkbwstvbyq51ggt59xc3tutvh64cmz4269mn6kfsok7e9o38froidvtq9dgnv48g3hc2wgbhi763c91rylwoo46nvig19h82c9q3850l9kdglv8mo432r87huxlm82x5f42u',
                title: 'lb0tub8p84zr4tj7zq98a9n5jsgqedvfdr2090v786d3res5rzh03xbxl94o4ows5cyail26ewxd8zkdsj1xiiahf1vmlv4r7rjs3o5c88454p8n9afvzxyy0qw93o3k1uzam466xfhpx1nuc56xo8ndgzqhewpxdpaxbhwvc8dqzsrt9gex6jdvdlc8mlhzqk8ov8wuv01tffa0p6858umjxk9h6cm37mvkyjqajaoqf1muk5n7biyr0rpv6r9',
                description: 'Quia ducimus unde hic unde omnis dolores velit sit. Qui possimus inventore vel perferendis maiores. Ut ipsam enim quis. Temporibus nulla non quidem adipisci.',
                excerpt: 'Repellat consequatur et. Tempore sit est architecto fuga quia. Consequuntur corporis vel expedita ab expedita laudantium qui reprehenderit aperiam. Qui est temporibus sequi voluptas labore. Deleniti aut officia ipsum id voluptas et aut occaecati non. Sunt vitae repudiandae voluptatem temporibus illo neque vero.',
                name: 'qgbhggn4h6icrnttqfxxrq8qqnvoxe8x39cnvjawaolrxi8q7uffdouavnc572w2fvyaot0lrqc8ow3z0k49i4tiy40jyxtvl0eux7vp634lcnlrxu20l69d2m17zm3z9ej12dpq7x0voh8uprjet61s405pwae9k425lk0kllm42qeskdr5s5lprrtslya7fa4qwyu8cyr666hf9gn9z3py28k2fcwhxf2r6vf9xa2lhx16efysusa3yodj6t9',
                pathname: 'gjsiae7zwuli7qadznm7vrxcu581bqbi3aj9tomohqdq4qv6cso4y0ei25vji6beb1yvpvzh1gcenkn0jlhb7q5x1pekzie32ev9rnd2aqmaz20tylur7lp9zeebufpumezv0q2zy6mfcm2l8w7oa3pyp7y724qqncycqx4qaqizr9yv7yn0pcwr3o9hyxbzc3i57ee2qqki8gvukp6l49btjxpzzz7cstlblenp9v1zk9gf6cz9469cgonzvn20g3a123vmvbcn2dle3f7qrh04128ajm5xxbzp4j96bgycr6px0w2fpqlneg7fbjaa5g7ygf05vsk3u9awgwzcj172ggjga7sbp0uw4npyyt2mkvupmqvem8ah0khtpt48r0lbrlbau1jw36mrjqpz81z4g00wkag4xyxgrrvftmsowkt1ioeddrurcc1s559fnjk89ajezwbh2fh8v48601sdi7rz2qdeywhbylr9mbsk1mqu0bhr6xjtcmk96ab36eeugmr3nixmrspk9i3yfmax43r35898ach06bfdeue1pma0rvpuwjnmr5tzx2f5x78qm7qqmkc850gom7ewvjgf5ukdfengy0npmsn04q8g11z5nh1a8e8nx1cv6f8kcp3l10wil8ha1z40ecuky0wmsaxl5ke8g0yxh1zzbgo23kexmvc752ea1ooendshvq8g61695olga4ztv61rn8qu3gbwme23brqnrdkqgwfif3cdzdjpp3rh027zr1gxm9rgxfda28qs0d1wzmt5coh303b45e744seb59mkflxkvdv58t8v0e4lzii63abv4ehheeu6wipw9sdhgn6jykxuzazfhte7pb49qdc2jc26ffbqr1zo1h0m02vr4n2mru4yn9z18jaunk3a9re0hn63me67fbhwzwg3cq3cschme7u3m2c0jh8r4s4gtttnpqbdigzachg1er00rggca23dgn17h8f007pk7lwixe7of7ua9nw9vnu8iud8nudt',
                filename: 'oqri2mznj92b7gq8czj4he0oto7di35cuyvy3l8nsvs9i7of2jvzuiup19wjvptuu3cmkp9fabje1an5ai7ux5tzf6t5wx6r7ecdot7l6hogj4xb8wt25xrb60pnb4045xrsb88awahhyqhysn98axyd6qcgq042tk2fswzbt4vau2gmadav6ko55db78fgmyelrrqh52egdbpglb7n4dlewxlgugw7fun4j5hab8fftz7yak4te0247k51mvdb',
                url: 'x5yovl7otmjo9sktgsd8tnck4zbk355umlzft1o537bcxgardbmjlvzcsoovz11xd6t602hg7xd9dvl1c93ml813regsynuzxx5m2vrmz6iq4ko48zh1qavsf1ro6o6ji3mhyd4vvcz24x2hzy7xjoqnqq8anw8hb65mppgg47kcq0392x2wol1qbgzwxzpvoruhi1llyl2xk3f94419p98ngm0vfdwe1l2kiwlne4n5yjrm9ob7uokoz4j15birbgouxwt814utbetq8attrr2csmwk60u15xj4mfwvu1fu6j3uujf0u9fq54qaoe8ki0l8ixcbh2ngugvnto2s5bzn00qhg1e852acrm373iph6yn0n40hgib3ugvz8s0cxa91lqcdth596ptcc3b4fj0e1oohq924zjq71ud23s1sd5okuc3rysss3l2igm7zi8r09274snpa68m08wvgzdh8cmhfe86pdyab8wplviqlxm5aupfdy0y2e1vt8z1gmsrzpe1pzoknarnm97b0y3xf3eqgwncd36qv0b501peoqrvmcc7j7jl0oymj57h2dh1ob2gxayxai8yxbgdcptd4x123tk0nre9abtzl2x1t8trcn01torfnn31tna3bh1n6iea05a8q2lkako9ziv90vzop7hukcbmbptwcic1ltr8likxbkfqbgsahu5alhmxcrlsukdqvog4yfizlh1kt4054f050l8w38deuukkuvd0vuum7cjr4jze6irj1lugi6vtvwk0yuj0i3l5q0nmfbxhvp43nldus2wwfpr4kbn6qan06svnigxq1qjl5hen25mivabn3jogvz8gz4i3daf7ey9tweopofhn4vrwbeooxr0eso1i5uoz0fyi4e8ou4015g7ushwz4m4k9ktksb67tvpmbfoaj4lxxpb5r4mk2fyezpci8gqf012eom5hjy03oxki34liuqtf6h4ygl9g17p2404igt4qykswejqg5bqh3du3zwsajiq5k',
                mime: 'pf38dkr7r8c7bunz5bn2qikfyu5ufwdy911ith6bvpy9pk0vnd',
                extension: '52pxdve3zejpoe0vpv1uso6maru8wbhl22kfsw431k8yn4g5sc',
                size: 1846842996,
                width: 601162,
                height: 958209,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'n6e32p9olzqxlkhxcyhky8xs9avqf516usg6prv1isbsm5ah8ylpmeepmaqdovwfzdjd8pzi1o680h42s14bzudovk8zain58gewenuu78r4m6ekdunp7ajjn5i0n11ysk05f2582bv8n1yavsest45zs5r4sggr631bkks94bbo6q1uvqes73eersx8bam08g44q0ml8ngxtb506bkmwrt3mfsn5ixz0t4n2zzg2918a55uchp6sqppi5hb539',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '2w5uhuhpckfaqzdkg45jrnxnbltt21a525wdcjpo2059v0kjyr69cnqdawn2zpuzqjbxbr8n163',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 133230,
                alt: '2ktw2533n38hipgxx9rwmlodt1gb7wepkxa17y2nyb7kgx2es7h3yc6ihp4l3y62klxo0ntg6nedixj9ptmvopqkgbgodezsch7ulp8xb27fteuyv7ddfz0ydlt1v9jjl9zt1dii9i23p735fxvytj4h74t37naxazepcpe28e8z7w825d2s3br5hqos67jpatqba9ln07d0ihhzdzvlj2ouc0dkgvchh57kpsiv6hwzxfr763s9cvpmvd08akf',
                title: 'bjle7ojce8dqrd1pcuen9emko52e09ewoemys4lyzqkro7c4ndbqs56satv99tgc2s88ic4gwh67kjsr968l5tmjk6c1v5q5p7ewivrcqlv1ix1jb7pxzqv1op2ba1gm437ox0i0i1c16wr9rfskhfp2xjwyag0ea922j7puu97n5ybz14e50z5npk3q3z3epyti79xg5fug17wrnfw6scyoz7t538nsipxpmvvifjfxi5q96k7dtvz7k695mud',
                description: 'Nemo sunt excepturi quae minus beatae ipsum. Eius magni ut ipsum id voluptatem veniam aut nulla sed. Distinctio pariatur deserunt delectus dolorem facilis. Velit atque praesentium libero eos quo.',
                excerpt: 'Impedit asperiores est nostrum quis dolorem tenetur suscipit. Velit consequatur repudiandae ad consequatur. Corrupti et dicta consequatur sunt. Modi voluptatum doloremque nihil ipsam quam deserunt voluptas ut sunt. Distinctio ut qui dignissimos ratione optio doloribus ut et.',
                name: 'q2oywkgugkibmr4l25ljmwg30iabm0h4s1qhvbkc6yhq9o1nul3bbadqeojjo50lzily9p15l7koon5kfxlvuasbzgro36i7l2m5b6xzrmv04l0b2tvkttl77m20975q1s3192fccuqakcsqojt7loye388ydtr0mphh47qxgkz5qz4ku5vr3a0t4imvhd2zdlkxcxig7o9vrssewf1xrgsbx9u0iaycno1guepyo00i54tvnreju1pl4z61j8t',
                pathname: 'w8dxx1mzvpr7adfig2u4979nxap1wtj349j0h7opcb2mo41ccz30eprtyl06i7hkml403gc58m5faxcs0zyzuvm1lx9mdej6glt7a1g959qt2i0uojb5klj9y2yivz05accworbarpph1dk1p7mfq197tptc9ze0n9ihaadtac8mjdvsnyvmhxmzptyhabkfuh0jmm1ik950o8k6lhdrrmr8un9i5y0cftkw4mcomaqrca2wx8obfayib9by7en46vvy9tgulbc7h98do2jrdpk551owtput4oc8kj0cqh3kzku2904tefotxliz71omp9ve28rimsqd2ax2bxu2brybp6karyoa1b18c1vudootfqnerltlkkgzrtzp0y2xphgtqvva8j4ctjjt4cnjigm48e9ap601y5h9bku6o884trmg9n9kocodm2uow3jdguwx7w841cbhibs3axjvwxsa6laqs3piau142odm5wip3ihpd55omxapxrle6unjwkg98bophfpvu5oyetxqce16pzrt8yu7qddbdtjdvg8urhvff2reaftwrl0a02znel889zdb49aia9v58crif4sduflec8jz3p7aqd8grhrhy2bg0q5sad5rcevoaqwaptb7zu3drm8beuc8lhk0lsr0ylxfotwgn1mkfcunsptpp3qfque3u7zzn4kqc2ujh1hlyxxd1naqe02zhkwloz465bp1rx5rr3menc1lynxtzz9b2mmzrvxoji5piq2eaevbyfudhvkakmuoj8yjies4gdw74zef1bayjvy005t4tnvpfvly5feoc7ontxqke6mq68rhwibubjrf3ayve13feiwjsycdah235wsczn5qhe0p92y9wbs7309qx13o7wq2k1m3khcwi1jp0pj2tx27hf9x9x2usuydvx7j7xaptbx9zf77m2s9r7aft9ysk8fqh1yq797mj4h7dk8m88bzy7n6ufoleoc6wdnc9h8gtridalsbl1u3r5tk7yea',
                filename: 'uddlkuzt4yjpyjztqlrrbyso79tl0bwi4l7nf3htdi9kn20zivj8zc73bgz8wau4ewd41t932jjp11zwhhp4dpbghj1arlje76ogk54usibc1s9v2ibloov5xs6z9a1bgb3licz0lj8nwaooslgrzphqmze6eb6u87zcml2fls2vw7a9jhd636dcvyzph9uuimo21z7arqwx8cr0xs276zbup02tvjpc7xcijkye7l5k46i8arhnsewh5s41gx7',
                url: 'qa2t3ghkw4ijgqn13qzf7hmzhc9pfrdtd05yj9weoa9pzngssnw9sli9onv2rv5wz7u6rurjeasp7fbbrhomw0ri1062ybto58oeqgikkrq3jzstj44fmybns6xl8lj5yr7vu11ko2t3sb9w78hmspwy17o5darj19zalwy06nz9vp331e47yw1d21zbroizxyv2mvuiag51f7s0wundbhgdalemq6fooophjtjtr13qzv5tw4ir2av2ixhlxbolwcbokuky15npexdnb4u134xvs88frzoyhyu5353zu6t2gimmtpj73ggkkjod1xm3a3qq70ga296zq697snz31ymfct1qez4vkx3vwa22lh5wjpb57w6zjzhwa6m3pdqzvvw3322yytxf32ahenghi1hx3ydaay3i0zgt65h0l15vo9m8soj0s3qwurmfupc4asr0bu9ybleqkf710j9hxc2k6cis2lkmtorsxep9xsvbric0anlmoa2pn9hnrs739y4pxq21vqymevbu0ct3nghccbd76le8gm23pweoipkm8s4n1uit8s854ddk8xxba0mik3kaxfxgbycrhrkepelx2nyq1gvn7kx3fi3tqwft87j1olb1ua7g7md7w9cdbd6kf84l3o546oasnmfdkcdiyqwlm1i0fcr81bnfrz34ejxvl1uaxijo3kjvwhebx8icxqg94nqn9k718aorfgfo7rkiqh2fovog1k3u2vyeeyamhcrvz5t8vszkopruygz6cx7lqnkt220f85jgzr8mdlat09ntqk9pk6gr9hszrmj9tsn3x6crqp8bm78v8ai4ho1l3jwynoh9n6m8jidfx8j50ngt1kmnkf6r70ykx4drl7y3krnedu40ircz0tlxpjj6jzjd4ze1nm8wgsnzt7zcvf00238hehtm9cphargnag95uih6s63wlspg9f6zlx9n4okn4rsu3xe7aait06mys1wtx81a30kzxvw8k8msr0usg47f1ch3agp9',
                mime: '7gs3dplwfrho2yqx3k5gfatstvudgbn3szvgrxnozucb6brggv',
                extension: 'wwoinihtd0xkb6iuxlxn2remp533g8a24menfg7neej693uif2',
                size: 2375892600,
                width: 316473,
                height: 168303,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'sp503jyms1f10f3pm1ozc7vpcbm84kafw978xrgfjo2u33t4fb02phapoezw3yucgtpck2nj0g617b2t6izi4imudbir4fgnsttuq8q7fll09gbe69ye3llwb0f8qnk1x5xxi5npdmgcpup09nu4w0hp7f937jxs3f4un69qgj2ouabreezpnzkzyzzlitd94ng08t2n5nqra7lorzdjms0zszh2xyzxiiv5x5qsrs7yw773fyj56g17g7xgzko',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                attachableModel: 'a0k12g6y45m5qppw7wwxdjrbjmlvsr323j3vjqcpnl84dpzx93d7nwtgw56l5x8lta2dyao51t2',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 874789,
                alt: 'g4htol3m9v9u3bgfrybre9e5xqidjs5yiqniolgvkzgka2tlo0hkd6o60b29pwskj7k9e6wb2xagyl4h9d3lxz0kstrwdu9sp6hz70l6fbqzmsrhaptew7e8nvcnurq3u3szh7m2mr3axdl7jlp3bylkkk2da9gxitax4as9ervv3tfgptlkriqybr17w58e4tf5fy3u7qrew9utskt08x2h7cj6zc4y5840niqby7czlbil2v7kgqmfdo60m1k',
                title: 'pep0jgyr1pqztbm2yj8nu88af5ym8wtc2zbv8z4k1d2fadhbgtonnyi6ic57hw1ll61s8fwakt3oduna0547ucc8id4z69714kxbzkxmb08krjkaqb1mw9wovm2hczwqi8c6orsvjlczkqvf2zp70if3s9pjyzyonzt2dod0yjhqgokl2zt9epdsnaawoko5mfkjkq8x9cacxhjx87b8iahpnviksyvw4eahe2utfbvdhualz9vh9xc8ph80gd0',
                description: 'Rerum et voluptates voluptas tempora tempora quod reiciendis dolor et. Laudantium perferendis voluptate ipsam exercitationem non. Et et aliquid molestias et temporibus. Repudiandae vel non aut error illum et aut provident quam. Delectus magni iste deleniti quia et.',
                excerpt: 'Architecto sit impedit accusantium aut. Molestias rerum et id. Adipisci tempore reiciendis ullam dicta.',
                name: 'xk6rznhgsmznk1h4vzmbselkp9ofwchi5omrdx7lj7h9r8ef1xqkdtalzqggcpd6a1nljauou61nr70i2fu9ex8a0acu4kbvx2hxngapt798rt0u0srkrh0dqyskzwbfweugd6luissi1od7379tt88ts1k671fw8ke8wfzqcn5l2cqn2zf2hw4yptz0zpby7xlryj6n297lxbnv3rukzy760sp31r71ead8auzrfxr9vmeyjpxq98csaxx43bv',
                pathname: 'go8lbjr53sakph2yc81zdclrtxkkvb4qtkhj1ng2e1k5ftepi5jcqy9m8sjb8726mee6xa4e37mysc5cgtcjmldcvhksq0ezmgdbad0qocrqrichtdz3r8wsagf4f5vobjoveghpmdegqfcq46qmal1ptbl20048jwel2xbrjt739ide9wc3ea03himid9u4pixrrfu2u91hwowx8aws7471jj5ik9j4czds90jn3dkgf7cue6fuqcerko53nzggowzxdydvw3r6jgz4xlyvao6x3oto0gq4dc12i41w4acwhjqndkya6mpir6okt3xauxa0xdmne1vl0mzwsg9g4ht311ahgepje6c69izkd80wpdifov95unrjqmxsgts73nofepr3zk5p76lsocq9xzyfbhc47p2a18mkk462g8wcg6nr8dchsvdjws6a1aptkj2k736o1t4fvgbuwx353848izi7gadsp68rpt3dg7nzqt633imj4b9ar8yd8hl5t0ovdyycm66bwt43jc21yfq99jse8os6izxw5cj795czbrn7czq72t9lyai349yauirzk9t4aeyz17yvf3v9wi6jcf62una08kjf4ybpcyd6rwf4gjhpdl4ozcqo2puzz60gmlz2etkhzsc93224v7ds0jm8sc8v8qwmidogh2x69xa784vi95pnvi6l0cjda2cjpbtkib8t74ir4ifuzuig6t5uop66yap3i1f73dbcneaorvxqs38ndx5ciecdw7lbmv1dunqmx5o5aizrqobcjlv3d6x1tfuy5bx7vu4prt05kxaqij2dhdine56lmngqdtopiz76b5oghceo2m9t37wxcwez6aqb0cd2nswvlso0pryzuvaihbf9bkp5cehpu38wsrvf5hspt93a9sn879cumycxj260qkwawn2pfl4oklps2mx433wrrj4xz5ehx1kyn1z9mxoy7fdtv1cj9314cxo1xraiq5rx3xhmgkgbvng7isv8f0lpd55q',
                filename: 'lq3nhhuv7rpxujllejz4xa2lqo7x2engifwci2b7xdstt20gxm3e1w1inyfeuutjqffumi0l901978wrk4korhb7jpp1lwmwwy0engo3lj7kmtpc7fkk9zxpxajfm65vhxiam8y60itbkg92dbs6l58u9u75h6uq6xwx7bkz0uttxubqj9d6yum2ykowgn0zdn8rbhmt18p0071p50u5l68kl0i1rc2csx1r1u4iqebemfc6ju9qm0j3plicoi8',
                url: 'e7tbcfik3zxsx3h2cs964waewp16iwx5qw3ysaeqxz3fv4tb10uv1ex1q29jv2uosp28wuuywwqrgnauf74woes9ix3en7sl16x83deuqjloo6o02gwnf3pfr8e2byqeupyy8n9vfrjveb63uwk32ngxcwolv519foczx6twt50zo9w6vexkzsmx6jkni7r89l5y631gz2yh9tvx71dam8ch700v9iu8ojcjlqmnkf2d77x181nlcu5bl4nr6omm8d5d0erut417rbzoa7hfe8k4f0hzg2t5zyukejisizeg3gp0bvzny25mjp15tkcjxzb75s7vpi47am5qnvbym7c4faohn32jm8zw1mtr6fb0m8hu0sjhsnft1dv7ki6xjxexerseq3l2w1wxhkc0tsnayzpwf39np2gfdr0i10lawe7f774nim132io5qt4y29dhn3iglyhnp8yye4iyf3415ujqxjgsozc7donyqf11z4kosk9pfq7hihref0nd0mn5w6hzlqzedirs5puh9kubt1jwck9sh6itchbks700pka9vgpl7tcnw0tgmnl7tzy9zsiwutree43665ewg6carwvicvsd8odx71t0fcg2wa5x4ck2el1di2wnfwm8dov3p1jb01xc42570vtzx183373qtfov0ekjrgan8hf3azxdp4ov1b5p7kov3hnkew71kdcwjtr88vf8z3c4aiknf8bcjewzdtuts1bpkin0buy8exrzt5663whpfpv2dvqqa7wdmjn3lwa4th5fd1od6imoqm4e0al4arnxwbsoi8ufvmm9t7vkpjl130a9osqrtrhdun9vx8zmmx1lpgjetz93p8blnfvupuivbegmbws55dbdur4ul7f99u5l9tw6yxnth9fusklkom80p3vi6f1qheitxwib0e2ow6hq1gyw8sbcdt0jo0o8w20w5h7ytnyumjzbfgihhhw4o2jyt6lfvvslnltn7e8n465zsln8y89q06gnyqap4dqm',
                mime: 'zgqws2qjfdx1s0ifz6asmv3auyuxp7253fovb3pknf27c6mf7l',
                extension: 'c24hwtg4ftqhneisr3vp2e0spar7nj8lae3k69rc80vfn5k573',
                size: 1142855303,
                width: 984878,
                height: 131801,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'ygqix0m2ko5gjokdedyl3mz25sns03ogmoue7fbdp8nike17siptwawo1t2g0se3w3rolzl5ky6x549xqpoo1k8r1yu9juwyuwvg7piw4nyh2139ey816sypmhr0h4szz84cg1jnscnxj8q8q9oy8zgkeml6k2rqzc1mrweagqi9d2lmewnbsfxu8ku7qn2k108z35t6n6ms93cbfj06h7qn4zqt2h9vq6s1a1dlgkonwb6ay0151le89pk6t50',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 869174,
                alt: 'mr4vkz0v9sg5rft2vz7z48ro425h59luch40o3pi2vigfl6deoznmpa66km0zoki3pqpmhty0ldndm8fz6baynyw4vl6gs0krl8jsfsp0rbiteq6gtpkmg6xe0z20cbhebf72jqb800z2d7attse5rx372weci56nfyrwn20r2n3ee3hxpqhhzxmfffc7o5wgkrymt4acng4n55bsr9tx0hkoc9zcxstp0mmpq4dvfadzti9c9m4ef06v8efmnt',
                title: '167ld8yttlfsavygbqiax6lm6mavg33vypg6dkspv8ifbsbk1xie4dct43unllq94phth46zwz4dy6p9lii63h171cspvhoajq9eg4tc3d5jda56fg1pgkxvckkz557nvf3f6ed7c4x6iwenha80zuica4hrgvomz0fanhlc3zaw5ys1l5wmj8yrp7jshxkgv5kjm63l8bgcor287bhbawhtw1xpivupdwgvtao74fjjdzxbqk2ze4zb77hpxlj',
                description: 'Eius perferendis ab sunt dolorum molestiae qui placeat. Sunt qui optio eum doloremque distinctio animi. Autem assumenda dignissimos explicabo dolores voluptates aspernatur et deleniti ut. Vel perferendis iure iste cupiditate ut ducimus perspiciatis illo. Voluptas excepturi quo.',
                excerpt: 'Tempora nihil deleniti rerum qui illum repellat eos. Eaque qui sed voluptatem voluptatem aspernatur esse in sunt. Laborum velit quis a fugit qui. Voluptatum est eum exercitationem autem aut. Deserunt cumque ab. Enim est recusandae facere maxime.',
                name: 'sd5cwnqv4q08cda4wtjdry8vfesd7bfiyiiilwodn8ta8ztsvzasxxcnpatacghigjymumi6ac67f90q5qweq3hr3fduyfn6sr000gwasv1ejazpd7xvx9m5se7fcjtpz1pkiiw78bu5mqnqnhc5zjl9s8i0tazw7i3lb0bk1da1v6qxod0dkchq6rti7eklmmd5c3qcvp63f1sl8pr1taepyrjqvrumgqy6m367drksffq8rk5v6m52rfanxva',
                pathname: '6jh236sazz4wdyprw93v9mis9uyreyo2i4ksq7pavmbfoflyr7qfapty5dxktd52dt9mhxsy861dedvev4b8w0sj2snansjeqxsptpjjpcv7vg95967sy8tb4biese3gaoowwkm32jpsw6qgv6y0har4es2z938jz7gbftvlhvjgazwm3mwq022kw9nl13zqom77qwwumd57kw8p8pil8eznq1hx9bll1aw9p42ouzseaqooz5i0296t3xa9164b93w423o3j83xpjru9089gyoh12qk3k6fyp5hwwmfnj5fg9sihdpawsq7jkssx6owhvq6j2w0xly6lada9czfijpktk0wfn6eyp2xy9yiwknxkyabr1j0wqdzugttbsyw3gksxgoz53cvq5x2ulasii59eodt6vy484szqcdmvl0z1s9ctg9q0955vbe5f7h097tyuzbqyi7ksvwinzmv8l46x6cwdz7jnx44hu7nauh6jn2lfkhmfrrf5wamove19sw9v1a6i9h0znd68rcragfcstoaydzn3tpe4ai6h2b83fapfld0p58usw1kqer5ots1z8thu3qryby0d4ml2l4bbobsn2kl3l2kfyhfwvdbd7gq3vcdigflon86dxt7hdq67i8yjoe537jvcmab83clcbtzcq17o1ijofhixjxde0pq4o2hbkry52othmq8wsu4s8oqbe6sxtg8vxqhhz2jz1f6wbj02mi1xexa8uwjp3lw3n4l3nrcv5xgkr4suj3rica1oal7qrr4z2rdo7b1xlvkap6x4lp0qylh264ehctppwqqmztrr60uq3d8cuy956zddmp2fni8wa322vvttatxy40vyausnu5czt6jf99eb10cztudhnm31s2dcamtlh74ns8ez30ybd5fuoo0c9u7ksicfq5aqw6pzili9mg6t3gcv2qo3c1ilzhst1ss7qwho5iqzyxe67qu6f9gft39343s7v0bl14e3j8flgp3ai1kr08b99p421ss',
                filename: 'frio47grn02d4irmu0c0tmc1ob8p5fezvf8sf8yot22nsvaabm4nhhb26tt7h2lgq27gt9fqk0i3isgx6u0d4r2k6a2ibjsmk2zx5ekxb5bmtkv1xlkszixzz8st24u0cd11m5pefsnjtrxg4tnqk2mbnri6zo1qs8000ayyy3fleqpdhrv5p6ky5dfgrg5dvq6d1cnrfxk3weyd6fyhucftul8mhcszijyxjc7e6x0ox85e6nsuu5p5dcwmmog',
                url: 'lalnel9c02zdw7isau1384zyx44p76p5a3alz3ozk5sb910u09khkcsdr2ki3ezsndcnxzxxeeawxcmt7ymxh53cmher5lgdfr8vddfc5vr29u10fxelg78toqwpr9wf3yuazz68qkaltjs8pfa0df0bta36pbvdl8pblwl12zwkyjeu3norhglkt7c75hmlrk4jzxuw13g2sr4y6o6oz8ndrod1gjo9mtutltealsozll5dtymcg2ozksbpw14pamdgccoqz5lv4hqpsqc3fbu0645jsqdrfephgx2h554kp00db5yfbpuyph3nk8zmuweyt9ozwtx3uhwvrbcfru1tbdnu3yw5k4qxphxgiel0ow44zxu3gqe4c9awkd696wgnuhgxwqcfcyd8n9mfircq2c99unbn2ihhokvkq1tdthp26dyz9302j69zyjhdhuj2781ms0kd9zwonvkctt43ij75wncsyj24lrzh6yratvclrstvmpqayqtel7l20glcl3lkshaqmyu4l4hot6qhhn78se6p2azojwqswmdwhn1zkwh7gvwq6ywoxvsw45qqwo7g37mpxewr73b8qk2gzjhr42kqh3tox13mi7pqcs48alw08vz4hwvxz5jvd3h77gv1eelo7dhgja2uo779rfhk7tdw7efx8sl6ht93980ecda5t5p2zx87qkhwyzz2nwgi5i0fnn86h6n7yfjluttd14yaljyn24tsq4vlzthauyttsxhgewidd7co7pw7ylmrt6xfg4j6biqdnony2lzcad30huxej32jb0eg4elobyjylbqtb7bgka1ox06zj6h8ba0l4700jt5o7rgxc01ekpcyawycu75xwhy8v0mvpq44ou2rm2zp6owhap4p1knkgem6316ii9mesntebyuepq5nlczojgomfhkcfthd65v25vbb0tw68alyf0rgnxnovps7bgifom78dtq5bddxgfz1lv6pqr29cg1zr1fohm4r0f1lzvzpyfdf',
                mime: 'ip56xzjph1d4a43n428menrifl2dim85z5wug6r0aqruhldokb',
                extension: 'nl9w35s4615g8rc6c1n26lrhi7otutfqz6pvry41fbx1pwrnvf',
                size: 8778909386,
                width: 642352,
                height: 232828,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'j7hs99grdfr65j27x550353dd1motkrcyss8ye1iu1mkpn0q9yur14qbc239zt3hvntqssq0dzyo8maiche8aylc95xng7ws2fh8rqocod1qfpai30ouarrru2mtc5y0z4ly58di6wcwxq14qw5bqxkf2pl7471vyijje844tr0jbsxbragrprmvcu80ufs4chrnfz3n5n8vfbwcm9srmmc6fofxysfsz4ydczjz6wglnn4ggcfi0oos9sgcm0y',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'h5c7ucfwonozn4vs2dxarqa2z89z7vvb8cfnx54ffqtwgokk4nkxl7rq2fi3mtfms1emhurejx4',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 251224,
                alt: 'tx0twsp95td7cjrhx46rybwf5oqdm0r6ac43vd0ohwa4d3lj9e88csu5qg1yrxmbgjwyki9mbsgikcvl6z972ifrv6khzyu51f3p32gvsdltqoctu9jk2y85daut0jnoksvwcxctlgzc6hmbqmq1un3gkrh1o72cr9i0vauob3by8g10pfl4w4yqdt3x7pewd6kwvn9anrn3crsqsaekqk2eca5sd88og6b35jqpocvyd587zzwcq1oral358pg',
                title: 'qojczra15vcnxjezoen7z3puoa853nns7zlmpr66ogk7ossn99srehiv794v0n6pckbhmih84vv70od88c5d305kklyqyyky0cj8t4rgsitdwv0ic35gj6ek0phy2d99n4ecl7p5uohjb796600f72epk5kuibnegba75rflvns9gyd8p2xzjpfplnjdpguichqnyflxksmfwd0lreq2kvikjjrj0lsbp2iegmw6cyzib1n0jsi0gmkpsfa0iyk',
                description: 'Dolorem quos ut. Esse dolorem aperiam quos totam perferendis maiores. Et cum molestias ut necessitatibus laborum aperiam occaecati sed. Ab dolorum excepturi delectus nihil ut quos accusamus eligendi. Quia amet rerum. Laboriosam corrupti iste soluta accusamus aut placeat ut sunt.',
                excerpt: 'Impedit harum nesciunt at impedit labore sequi. Nemo adipisci quod ad impedit. Ab voluptates labore iusto debitis. Qui dicta vel non occaecati quasi ut. Qui et illo id cum odio.',
                name: '7wljbecqlurok4wqq0j6gwlynrlixd944a9knlno2p6wp40i96w9xnecpmyzo0h69kroze2l7g43z3l8axjxesrromyfe74kj4whwtcvgtzsiex348neuahsbm9ib8oz9mmc075zqqeholisygpvh49c4d5r9h2v9ctapp8qn5qtyksjmfay9cgbqxjs2pg4tg2upq865l67ez1lcavm04cj73g183g9cuekvygq2gg1fg1a5v2dr2i67jua7k0',
                pathname: 'd9zbyfqt339v9vdwpezob36n1afsbyyrj6nrk9hejdz6zclir9vg6jx67hiatb8bbng9xn5p1ya3cp3nrb79rexvjz15jdzxj4i0qikx3jbc434yfhgso52e0i14izixy7iabcja8iafwejzbqd8k63cuw0wj0zpinfbobktynqgntjzl03pgtpp8k3p0sw5tmrfh88u7x7mky1w7t5nv8gdcjf4g2nekaqq8hs8iitf3aoct1lnzaask5vhmb3nicpvdstknvawc5hyzvt26z4j0cxpe7anqdarz57mpinoz307a69lx5rcnxyk7g3jr9byyaej08e3epoo0xdqge34zach3lwy3ablukimoh8o3hhhaorw7kyg5kjngw787pt6jfr6qolrxsev20lyy35zovejl6fjxsiau4uir13a0h7v6iwtp9f6imxq2e463rkhydf31y4nna9qrzq211mmxyez39rw5krhkj87edm23j78xqen6bddxmhzem28xqe9e4er5a500cpslnmaay1gzkiaqcb42s5c0b3wdh4wqmspkjruj8uibs48ej92tfp1iux8cljkek2owzfebtnx6ilu4579fmf28jawdwlhkkc3ojyg9bchba8t1k2wdtovidau94recjejdquihd4y42hu2ed2r15bybpsi2czm1tanv46up2wjcn2ac4qjtmam3jvbt794h354z8bak6plpyes73dsmpjgempk3au0xwc2tnavl5epl4c611q9nnueneztkjyxhmwhdpva92ryojed3hzpmx48mtw7l5y5i5egy5fjfm4xpoc7vd0ko2e6wjx0cpu3aqplq0kmofkz8wwxxf3t21966ckiebqvjojm061c2h117v94qnnyxps81xilroibe2tasx3d2n3axhssquplyz0aue44jg43i7bzqkhpvbg1b7zqp44phsi1zx15k7xucaiywin9w19z69rfsu1nztcqezfbu1eozugjhpyo08289vssfbg',
                filename: 's1luna42vm1sm8hofws07zue6u56p6i0lm7jfe2hygl3d0vy6ak4ww9acwlrqcput6whb51z8lv7sh8q45grp81mj0pzw5cz54ifls9cdzsdz37wl4v2onlzlocmjqi34z02l4480c9jrt7h2rqrva1fmqnbxpdc89113wgl8jul6txbtachm54eu3f2udiw6w9sfibqew4tgng1ha4kbnd3hplj2qpx5lhqldh3cjjwnz2fjw2uly23qune1gl',
                url: 'wcouvdb7jqe5nfpb1prx02fmwkd01er316kz1rl91iyckm41kk6og37wgzi9i1n6gq7o04ispvvtgr5kyf8ulvpp4hx59eh935xjk9aehz8702np33y3i9xd994c2zy1m4p1o6b4guhhhv5yzxgfjifjzkajw1efew8uhnz09jqhunamv01lw3lv3e4xbhhaan1ljoj83up0migwhl4jv3zjx6v3aowhcyvw5hfy9tp3dhdns3n4f5vgkz82ugaq8j7u1g5p9idbi6feb7qmmlhg89k8kegor1yu567d4nov0xx5cs2sp3s6buq0woeh9jrjhr1t9d2m2nmuxorsawpoptj9lt4qsv9conabg39ys511zwu2c0fa51u29yznnqy0bmla4mg7vfocx4sptgorr84edb4pqn8jzx7qxxqairf2nr04g7k9jhe0lekbodjmxwkqts04xi08gp157zpljv7hebapvyvct0yjyd7uaswudijzdbyjdrnc42r9o37kw6xkkol4g6k48o8zm2qhjruo52hemvqtjmhi92nze7vc3j8tgroh4f1o2a2384qa9b14a1fg3cimpimxpaif7x4qsp8l7r75s0fgqm36fknazxgbjadx9s2x6jxkkoxv5tszsprmoyrfh2sfbljs4ivee572h0fcdfc38peli2gqx124qijrcaaq0rwd8nro7qcgdnbxmw5p09tr0nnovb4eg9a0jviw8it4whou7n19ogipojsmr2tpugraqpzv1gpkzv542mwy6opsnfyn6ib8qz36lcaja7g0focf0u0thkcml9k30h10o8uv1cn5qxvajvo9cplcqx9svtwx5ajeum2sr1l5zj8h0msa1bamqga032j136nnqngmfevqoga6rrdw9ya9hegex2gu7vmejqieiilr4ijfxpew2c8klj0pxr41ipnpblmaer3nbs0j7jcmgg0b9ploz16uv7a6t7dj4e6ym4kbsk1btvkl8dqupvsnon5191yc',
                mime: 'kf9z5l1tn4dhnnc696fjiym6hl7c3hn04h0vw7zhj37xd4mqye',
                extension: 'klgq18zyd3obdghpb3pjz855nbmmh6w1w7w49hwnymhask939r',
                size: 6732961787,
                width: 897425,
                height: 281402,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'q4cwqjl7jp01wnoa48acbok8qp8rf15ia30wysdwm798ti4xypeysdytbr3oxxbo9tqqeuii3nxendydgqu42n4ogm9bwet220e4g6rd0csije9abwmvhdexio0h47bvq3n5ur8ncl6ljcbex6qng1gp25un0325gnl5gtj2v4y37uch9apqp9jock6rrlqfpju7b32rthjdxdrly9975l0x7kbtq22ta4ip2zl3orymb5vzex5da1jxtdalzgd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '4jzkbb18mnxex8eluoy0o00n2ix01byn4cyjs3sxx3g4cwg06ayy7qwqionerztpes9tl0e7os2',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 698952,
                alt: '1rz2a3mzcmtt1ie81zwysp40oke88ptzuun6xhhczk1chddta64a7ddqn1tbcpg324dlay0bmyccak9sqlnse5e6gbmqlpnry90ivbr0nkl32962kxg3p2zj244ts2kyoalaneohanksrpidzdb5gf9z47j3jgb9ukaehy5bakbhko70qu9ykm9tdxy8qiqg6w87dft09pma838s0prxrqwfmq01m62mo12ugbvi3b5hde5tqhciu2s403xanls',
                title: 'bundxo9v6xi4i90081lqdqh6d1ifzbjcgbjy5usyzhg81hoybhsk7xx0fios7h106bepa1we1446xm1ywe94jph06u9ijzy6prtk27sj5gd6oddfqnofi4sn8f4guu675xv1gn5gckyjoww4fur1b50aq76wjv74qnhorz9w7fb58jdynowpy5l06wzsqahi5gtle0mnk9ta8dwxnfpsvliqz75av7gfgi91tct2j7xcbjwq343wfibmrqiu8af',
                description: 'Quasi quasi repellendus repellat velit totam. Est impedit similique labore libero sed. Ea unde voluptas voluptas eos consequatur velit perferendis eligendi. Repellat quam eius et amet amet ratione.',
                excerpt: 'Perferendis quibusdam quis laudantium optio. Eum qui aspernatur eum culpa eum voluptas iste. Occaecati laudantium quam maxime vitae tempora quasi hic. Est temporibus assumenda consequatur ab.',
                pathname: 'mnk9grfonbor0b8nq38gfhqk47stz5tvruja0gbjge2lschybhx03cmq2ytdahwbw8jtv1630ceieupnhregrg594q8vk5vklbsgbtohvum6bsjzewkplscuszhqm33ah3gfi6m44h0mic29ouabzz9nptys1e5aqinqepanmu07yts65c4z6bz1127cuuqkglxmvwlbyb59p900j08jwtu6h7qyum03qzsul842rm23vnczu8p7haumo4fj28ipxxdhgirlxzo0154tjbaluhouawxj9ax8bbj044byzdya30ntk7evnzfceqxwjttdslgho6mzg7qhfiakb7xu1w5bghe1cnolp11s3en712udhw0akeppqk1xwao4se52wpv6p6676i4zvs84twe02nu0ubd9wxecy9gge470i633walddr9g0vquh2eqvnv7hlcwqljwvsbsrsdwz4dfxe2yesxelqrvndpau2k3kp458iqe3pyx7ba9thk8tdnvlgc2nuh54v5ypjmrdi8js84y72tgosjd95it1fzka7eicdl1q1t8bxyutd6zm5gk6ih6g27sdutyaors8yr3f5fch7vdd832d1qa84onxnqjdxyg100tjb8781a9rtknff557u63hglgzyzy0t67zkasbafky3rtf5gct5lmb0dtbmhmmtu2myze0kebregr3ifcej7fj2il6ur7ceotfau4gxdw4twbr5x6j6xs4z3jerjy2h8pxw5h8sz6vf72yhq4cw7x2c7ll0sznnzhgjcud1rpwl6q0qovcp4o0ug3egvdx65fmwy562svgfff0htjtugt75i4uqu3ayynertjilf2xx486lkq0p6n9kzaydu8q3nkw5bw20md59j59qn4rw59rvul4zcirbnz7avold4d16e145zdxa6ib8ioadtttvb0avye4azl5nq3276txxuiawtnbaau0idgf6gasdmql4lq13uz019tpzcqxfo5bsw703bi1zoyew9r',
                filename: 'n9nl05k5nyp464yvnznd1uxphcovu9fjxk11ewsyzr9fm25uc84qwwfvui2p6skkydegwv0zym4wlj75uufiw3jbxkychso78h1tpk2eo0j1f34wrw0rxw1rnkmss2zjo7wg807ybmgk0n798oek1at7vv75a0mvju62b79kaivy8quxzv2rqtggzd6ahq94h957bog7aack14sw1cgplq2z6oinuuzei5f3qkh2b87inqey5a4zi0r4dmpd4e5',
                url: 'ek6d5i6w5qf7voe4ycyslyeuvvbix0enged50wku00k3hvdjng2o1yt5dlvrwsxj0zy5s8tv42whjd4kct3x4chllx5d4ghctp8adhc1ov030l0s41uktb0kldjigktlgwt7kez6p6og34irbhemuppv9ypyj39oq8f4fun0ow6txncxiohtidha5esth4kn62whm8nc7ywpnl0bggt7wbyxydxbep8mptiuo6turhtu1xdz6s7bl7iwbx9jvh8cmvygnu0d5i5vsosmr0ikr2dx5xxovwl5u0xm8cfyq13fr07se04nln2jniwaud7et7d1u23uienp05sy7wxxwv2kf2ehry9sjvnqbpnlwzsw0khiiij8rte86qt8bc52wwb3xztzbylrnx5kplnpbljxi094wq8vr73157w1es0wktpl6y28ziaiyxwajzkk93kk2z7pp9acwvrog7wh1zxg96gqszxmh42pw8gl24rulp7hds30ze89alc2vtfx5383orq6iv1b3jy4cufi09kje2j5z7iwtz0obgawa3q0adhlw9gbv57fy4ag1ivsk2kxpz2ripncmht6x9b2tfyiozffj08v8xjkajfzorilallj7zxqjysjwyc09yiwh7wyxo6d2rh7ocb4cqhs0crwh6v6mmqqra86xc6ndnruvq7q9pezhkihm705sir1teja576kdx0purrl81kayaw3bcabkdt833o9zexwa06ue5jrh6fdjmmcl8nx47f3lguooct7xg1ji629wx947ylnme45z92sbo97cgnxptmnzq65z3gc97nqh3jplhfi9ksitvxi29yzf4eawbi7wsy1kgj51dmccnx9iitu33m41prwwuf6uubi9s740x1048zzqmgalmix8ag3ysssvz4mqssu1jfxtd1gnf9chyt90jba04jxpyk9ht0m9mldamagjt0x2z3kadiankgscwz3g4uipf0n4lqkuxn2x6e4c4tyqbp9h458782uyrd1',
                mime: '2h2dfadv3bk9woqpxtjc7eq7u2gzfxc96uh8s7pf0ukf4uvjsp',
                extension: '3o4ywwb5rxzgomc4e04z4uc1gbshs34gjdj354nay15dt2zc5f',
                size: 7834982421,
                width: 108778,
                height: 680588,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'nfrylikpzefmtdh4ovno5kmvedd24b6uadbfsfczz48psp70bz76cmruzs865711m4zsfwea51howi8n7othy29h5cr7fc9t31xc46i0x1kgh7i13lvboo4abxnd6vsyqrag3aivlmzxgf5y4swz776s2e5wye132upalrinqgvrcdc1zqf6ythxno98tccy7dgozcr553vf5ccvatyo9td3z05amo8agjathq0y4oc3j8bxlzf2yxad25d9cyj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '6rkzzrti9gpea3rpl30x4jvtuqvflyat705fnfjrnj8qs9cq8glhia1sjismggxl9bgiiu4m51g',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 202405,
                alt: '7mr2k0rcrcfpwbc4ymxpuoopra1llax7e877ba2glomkjvwqojlsg611k9qm9p3otymlbpfj1i9ygv4m207xrdv0tn9i4gau7bvkbr0npa10be805hznxpyrpikpnmuouymn0vjg3tnggf6kokee3u7kht9xoduakfgadxx581v8bhh06dhntwymi44xfbyckmgra9ny0p7fpo8iarzyxn980jrecztm31qwnxkbxp28gf7agiqiw059wp9ywwc',
                title: '8o74frpp9xy49ygcsl0xj4qs44xl01l3rda0tlir09bsvd358zhliu1lb1kdcyeyc49avt9xgpe70dawd241audv631mg8ltl8u90013ceh8fzsmuzia17t0qb62y1cj6xghat5yz99a769q4ji9bgzuzdme013vo0be89u8rv0oscqyuiqfugzi1p75xdv5vhpg18o54zh2azsmu0ruccbei1lec85238xq5hzotexz4z12ha9yp329gd0d2v2',
                description: 'Non est quos quia id minus itaque officiis quod voluptate. Ut vel qui labore sed et. Asperiores iusto et amet pariatur delectus eius.',
                excerpt: 'Consectetur aut occaecati minus. Inventore debitis voluptatem sunt. Eius maiores quia non sit.',
                name: 'gevo1mxmpa7xf62v43bf40fy2dco0dib60ukmgllvf19l2wkadounjstxardzjzyj6m57dn5b3uwijlc462ca4hnlquklgoqqqiqrfdigsxiyg14eyih7i8farlz4pbwn1thgdb15ncebqerzs3qxtkzev21mp7l8cc09iquzi3wtaor6ih6jwbpouw7n1euqla94wa433hrbm62i95nm6e3aianwjrtu2juyqrt6avmnycwh7neitsuoqend63',
                filename: 'a4hq4n2pfbe0m8y1zs8qnywqj4q6qpiy7xuyqqea6z6x0qrgaxq3wvl3szkn3xukzh1eibsu6ktzsh3u7z5xcdtw8ayyqfsg0wbld4c7rh3j3un9m38sfmdfiwojiv6p9mg55ojz2oqdk47ic15lg5nw18x4omctcfjf1gd4uoecghqo4grwe75lnlg0kfuvjqntzlx6ofwchfkv4eipbqrjbtc9mnvdtm7gw849shsnofr558wrqle3e8vsrkq',
                url: '4qvk6ku738jy942q54tgdmgjcrtl4jne6z43wk1n8t1ue927f7gtgy6jr33lsppy5snyu699t02ufwbygjsd8lzv23w95r7rettpxnjy96lftisyqhqlr794pvjtzc3jetb6q0is3hsqz7bsulbabya7u8i70t6jz4lvcdtgc8qqc5byeesou7b6ryrlcmztr3iu93i96jme9s5f20esuv1v97ejhpfk1guwxnt954sv768ihas7k9vrz97834i42zug45hti3otkdkohtfki1q4eruoiis00xif3tuxpywewpo1dh5higrkmw7g57wfoi5pw9t07vgii0uy7ma1w5znbe58t43dd9yn9b2x3zs0zullb2gt5ztypjtan6wfzkpd3ug38spktgq8ngxrhg00c1hwsbh55bqvssl1x7fw2ettvfe5ood7qb8k5p83rdugjmo0pnt2zn6w5vzfuvpll281kj91bt7a556lvhl7z2nnui9kexxox2nai0imszgbueowpmf8m0c1eb04lcbifupusqicw6trdy3nn0mge4cqhdp8xhowyo7op225n6p0eg5bcfj6fomwbvc240z4mr1jl3lpvg84j8cwuiv1v3qxm61jj60fr181jqhitf8a1kywp91jwapki5uqcsmq7pmp15w3fz8ua5jorqclrk35hrovz2j74ya8nnpm69z0rigon2g5x38dsq9rfwe5lltvwz4s0sn9sajk2e68jblcsmjc6yfpwxpttd3873rdcowws1ttygz6xk35j3ji6wgefg2tw73oa312zf245agfvo84gja6k568t655ir0qm30qauxoedhtykzhqgzqhn7qc2kr8115y19b18ylsz476wezzzvilcfqpco9h6fw0w2pkrz9alr52mk2x9w1ief5rf5rwvb9ol0o3sdmoxchzg72mwp0s2he5h8wd2mjjzpkxm6hxqsh3t9pa53x0llwlt3y8n3gxjbg0gazdxyfsz079djacp2vwl4v',
                mime: 'vodgupitdc9h7v4reampsbi3xt98lvpyqulj0seql7a4x95wvk',
                extension: '1z3ewv4en00gw8n603gpa9xuji626cxkavce79y9bzx1p3ct4f',
                size: 9708208179,
                width: 540989,
                height: 893997,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'ogpgt6du5sqlw1za00c0a0nkkfx42rpl5jiuzialo93t2w7ponov18oph87elf3wythe502oxv1nadgjtr3003exvrlk7ksf66q4jcrbucz8i2wkk96nfe5645poic900owzymz3fwfgaplpi6pk966ubjd5n4hx21ekjqkfaz579tukewuciwn3hjz02t7obaolq4s3cd73e1tpcximhbda5n6oh54evf8h7ckm0be49ccsvc18rwj2vu0cv74',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'nl0mso0dx4kvikwev2436uczmm609vmh1ap2u3q99gf2reil4zzvq6746esjrbwpj8gcl23497g',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 398653,
                alt: 'w2r3w9yucfp2lvnfzjd30w20t6apdxacllieigexxd3k8zwvf5njlz4i136suc8c9r0d2100fubaucsuy9wkdsmzpmc7u4ax7cfis21zvvm6apo1lo5bml88hjh85gukzoafiqaxazt69hvio3exa5x1nnsh0h5y3ybe1mj8crtibq61keeeoq2woyk4gdopa98qpsg7e4zhpezyyxfpwzmyxuhc1vr83cgq59w89pvvx1ipg0kowbumjtxg4y8',
                title: 'o9jvlycmucn6yoo7h8u9bu0tvz9pmxqgdmm6jjd6ppiuf98tm88inqef1r35ch6wejablxwil0hgjoha4mk0io7d4i4kfkp9xglg8jcuab94r1unbxjmo96x2l6a5dy8nheu7cwz59wppuz9sdc32n3hjabic86e4rsnbxl08p94ps00hgeesdiexqs9slx5udt7b8ns2dc1bw6al0sk3bumnn75l4h48x5e9xry2hv1k8iwum3szzutje5oyii',
                description: 'Sed magni voluptas itaque quis qui. Beatae autem quia iure officia consequatur. Id consequatur a labore a rerum officia architecto.',
                excerpt: 'Sapiente dolorem quasi aliquam ipsam non molestias iste architecto. Sed facilis consequuntur rem et omnis tempora et. Quis laborum quidem qui maiores accusantium modi et possimus dicta.',
                name: 'rwzvw5vx8jd3oz9un486pw33blmhqm84gvukj1is9edlcgy2m05tjvniyqdklm55m0rtvjoeqhrqjclhzgdeswlfzqugtcq2rra3yz74pdqfod9rrig58ch93gr99q4izrjhl2g3rtkny6i48x9aqpx5gh940gasmlewsd8k4so81tg7nkwnr6mla1lyxztq26ymgjpi7ofbzvyln1c3n25ff0lofsvmnf0v7sz7g66r9nzw7o92kxljl7v1j6q',
                pathname: '9r6ozgnvhhxaqd0rigsv0wsr3eebgx8q1un5sfv72k76sxjqw0uffigo5j5poqv1k3nan0i4vi9580inq254vyn7hgp8sthrtzz5wi5g3ypi342ys5akzwdc8rdus0g8sr3a8o09exuz21tvj4n6umj1hknecqs7fte1yj0cnmhlpzjvxauvgv7o3ad5mmxjzqyqnnnyqs43tekqoryzffdbwzet731pzsfidj3pdnrp28i6tyil9rbns7gpun8jbids2sgjh3n75g9c95yzlhv9p6gnfesv5r92ni05lwfccq6a3cugixyuuqh69ch07yatprf5tn9txq9kxyixqq1hcjnt3gadsu4txs9pr43c30vjgkbnngggqqiqvsc3cotev17251nrvlu6cmbkzc9jspbifqnwkadx7aoupimmvzlps032hgeb9bk14ugpose9cwcdy774b8mdil213cij8ztxdhvftbd85h5kq8rcp1aq9bjhuwc8b0t50q8mz02ccltr91w3u648bdo8c3hl2g4neagu6o53ugbihq3az7djvx4j6sfwst8te6mdcbn05ww18fx3wzm9c2ulo2ob3pd17m2ipb93bbmstpd05entbi5bqx681eapmpnayabx30bfh6oo5rlsbl96jjr7qhpcpvgwedfpkj6h3az4uim3rzi1u3jkmwaixuav4zrqzvvy6ssgj69zwu9i4dxrdatcgi6hz89eo1ybtxkion6db95h9darda2l24bes933cftincqyt1bhd587xqdoh5vxjoubfu6ye47v7e0e03sj4hy2jr4nyt3xeg4ccsuvpg49sjerqqtjqo88updm4l9g10vi3hm7yy4b2929uu06dgy3mzw0r5dbkcyrc002434ecytyk82zudwlkl6jome834l8woaxnnk9bj47e8a2qj6l1u8sdr95x8tll2igha25ae02h7dmbfzo3u9kyc91fxyjo8s04crqp939gh3fhpcj380cx4f4u546',
                url: 'yv9fr0e12zht2ctiipokfhysqr2mlmi47w6xbopi1dgqko1360eob4x49qu44clph7dwqwyugauke4tv4oqmfwhsw5h7a9a5gryu2v1yuek3gncj2dxzj5jnpacls2xa3rvbi5dzoru6bqu4l36t7ufk75rnvl7gs09mxgu10y3o4tnu258woa0w9956rynxoh1dyw1emc1x7fr53y7t36brovuci4zecxpnnkuxx7fv75nbaxb91xmxk8u8w4zpk72w8su2m8dd1b8t8aa3ew79x4tr76ez1p6z7roybpuru68twjq0y55r121o47pa6v4byzot99dfgpvopuu6g7x3ntpk8350ns1ugrzkqs17p7rho8mpg2y5s33f6gfgh98rnsopa9nsaeq6obvgz67yi1zxjdldsj7k5jp4e8bsz93xqintx6fio5i15tlc910btc1fr4l06zkb8r30vxqybkzwjpep9b5z4dwdwkx2rlncd2p4uiejilwcrownjkd6vmtzeba0ou8flc9g75o1v7jnepik5qljs71cc26t8955rew8ll9obqyxi6kksxomjpseo0b3p7gl7pwgm1wh8t5wxsipcttw0u8l8j1lnxev4efdhc0xmc92scpculsd7w261defrexi23khccnfbokdpfx2utonlu2337ya1yn6r2p9uzse6mh3baspmt83t3fiqn1nb04hx45tjzo0cooxp89rv6mus88gp40wv42mmgwrimsey2te7ec2xzb0qdkcnpde1msgijlgkajx9ufhr66odw6jsochfvbhtn69fapo0ooa8rsf7718g7o0m6hekydwgm0alz7ga9ex74b1kbkjtphnsmq5datu549m9qyh94kr32emk8buoqxbstbfjlut2rmvev0035ri64yj0u09y6qfdcmmamd3z6q2fxa5ovyqknjh7p7buag3xv3qo0ho8v0276r7diyunvfj9ipvhilxjbm6xy7pdgzcxmz01y0yiy9p83qm',
                mime: 'aspnyo5v617eusldth7oi7om283uaabaymp6kemi0cva02sjoc',
                extension: '9ouf694glbi744bpf0t7xu5f3pvo2g5bbktwrfwwdgr8wii9sq',
                size: 9623424561,
                width: 300041,
                height: 955873,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'cmiabedd98qo9ux2g38gqrdv3nwc7aw6yg1v53k8gz3wbdcp3l46r9jywlyqbrlm3wy5khu1m0jkajcu2dvnjdjizgopg7dvc653e8o77xnmeuduv1cwzhwf2cb598ddia6x3io11yxxof0nbn8nv33x9j4zosv1bhsi3bu6t8o0f0iiqhxk7lzmveehu61silyey8b6e5ubwsf08no7b5asmxkk195t1jhpkb4gqbeuy6xmaianzxf1009xrro',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '0w5i828yvt5ehsqsg1zisjwzhagzzt92m72p353p4e5lo8q01hfoxdzh1gsdkoobiof3tvnowq7',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 337001,
                alt: 'a9abcrepao543v583fuphmiu2l3g9y8e9h2dl3j7jd2z3wk5d7m9doeo512os2u50mnkcv85yoipm6dqy061vhreestnrl04p1dh4k5tek3aheqm3qf2s29qgn5ysfzx9qy3v0nvrilcma4oau9qc0efylsd4obj8cc8w82jkjgjgmdng3d74qdo1tt74ygsg0wu0hnppkef4t3bg3qzqnzhos9dwd3bf00ajzpo8ymtv8eazhg929x72l68afc',
                title: 'imzl0ic95u1ekejdmrlhajych6e1cka4lo06vhegeshz69l6pvw7hyovfwfm3nqyxt96971aw172fkspff9eioh8oduatovbow6jb3jf0pnyemcwn1ctklhjfdmb2ukhnbq2gf5ulz2lfifwzaexlr3q7dlacvrnmu7l400kg3m8u4gj2922xc7epofs8ht85o1gxsmxswlvtn7swm6f7cfhpet01w9lfvobgoy10s30npfw1lgshgsd976ilvw',
                description: 'Quo id qui nostrum facilis vitae quasi dicta fugiat consectetur. Perferendis expedita harum dignissimos eum non officiis culpa dicta omnis. Nihil ut dolorum dolor quisquam nisi ab. Repellendus occaecati est ad voluptas nulla aut harum. Qui incidunt saepe aperiam deserunt dicta commodi sed molestiae accusamus. Sunt dignissimos velit iusto itaque totam eum dolores.',
                excerpt: 'Veniam aperiam cumque laboriosam et mollitia qui quis exercitationem et. Nostrum vitae iste. Eligendi aut facere accusamus ipsa veniam molestias harum. Velit consequatur dolores nobis sit quae consequatur molestiae aliquid deleniti.',
                name: 'p0m13hb9avqdgvnimq8ayhl7h0r21hkk68uuo8spqcrv7l34gn96b1g3rs6hbh0rnas16new007ezxnm42c2b41h1alajxb0n0ykx5vkiutnm55awkplb7vbee5bg629lyl1lzmho78r20eriyxeejlstudez1y2yvs515tcjq3tjtab8nkg1sc3ui3801mx33btz4yu0nxzvyfgrw5a414jjoxt7ghprvtd8wd0a5ue14y2o77kdq63oxc38te',
                pathname: 'vw5ewnkugkj3bdn1koywlroycpmok8v0mv3fcuu0kl5dpui7kihl48j2a39d1kpkpwbszczer3wyes8o53vbwz32n48nnm0mdpib5bban767eqfeds2z2v5xpqsmzetcj9h373azk5kil1q6m1j180f3667qn3dovc4mc1ua24r1s7hscac2m5s18zby4uyaqzrbhv0j0sfc4f4dv03wnc5ehtr0j063ec5yud82ulpb538a3z1o7eq81lr0c0pb4g1h82sqfeudhdpt61i8qp77aj3l6x0r5vfkq6zhdtj4ulrb5i27rx8obmy4ur294vnqhmw8zehp374xouqsy1crxat4ynk8we6y9oihj0bo5ubcwxu6e1y4i1zkncz7igdirst93ivnbw0cp7v1i2nnb8flvpgd8eiugw69xck7fs571eyvs082nyboxhtx5zekjndn7ngjsspjb4kzmz7n6z3nhma8om3tek6kfktbi1d1ysp01bhwpyfa55jj5yrka4ynbc1cqp32mso6gvug6w4ixukfsrl0fqskv050j0ukaeusg3f4kvj6zrf251wahhsdb6jcqaubrolinaqvmagi1jfnpwxen9czevot5dar5vs12mocy2i2xc7ys1y4qpbljbc7wnkib2g2l10djz7qc4hcunbh2an0syna1q46c0dno4w7pt1vymbrqgcbr7hylst8nb22b7g8ho0zyxl2wdfntnhrdslthnqugaib5h40hkz0tk8x5yp2w22ji5306y65p5jyus0lnfnfta2i5hr9pgtrn0vc7dpxky3t3k72my0ctagwwsnpbfvcj1vp6efiiarvkenh4ukmaym5o6ooy0xzbu1j7pi644r3xhd022g2pok926eebdxsdn9f7fwf8yh771qw7kev1y64zaq4bvchaqlhi3t5vfczvnlecdxtu29cgvtzwkbrrjnjlf5tp3x6ulfcboxzxaptdc8mqd7gn3dsvhae6iqks5ad0eu7kez5kshq',
                filename: 'ymkqn3x5zx6rsz071gxct7lv8hpgzcoi60z8cki9k328m6xfd729mbhokgtvm5cgwgzmg8qpxr6kj839rf0mia1ky7rxcetjznzkkrkjl29su2f6ua5qqks42tzfn5hpnjcb7w50wczgv5nyrcgao8evhqe5gdgih9p4as8ga6bd1mblgyfq1evus926dvfw6p8auaa62v2pj19ccw4iobblw93j99dw78p67s5qnyf847tbzr34dr7yo3brbvl',
                mime: 'sxmvnnn4tseeqzmlbpojcq01kxm473ur44akot77v6g5tpxawj',
                extension: 'l13l3xah6psbw60xqkytk3cz7z057pryctxyenqcfpor7vx1wz',
                size: 3330744089,
                width: 447106,
                height: 156553,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'ifjjfbnm19wxnchrudedc94zno5vgsfx95z4cy9emmtrlte5t3mc7li5s99gwi4xnwis2s8skhp8i6otmv9p3fjpixwuu0njsn72ewdhz8nnzfyn8mqcgdmze9v0fdhqzyxowk26wbj054uy9o2thu4e5aiz5qm8ywavk26gbqkoxy85wg0kjk8u8kkzzef6r7ruuyaunva3p5tpmhrv9mlg0pw4jz6ui2303vw5x3wwz8ptqpk1jn9xglfqr6f',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'cobs3vblbb6p1rn7pq3d7ku0w2ls9ckpquu6xxxpeqtpgrc9gbeozql0f15np5jdhixbjgaznh5',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 930241,
                alt: 'iu8v7gpis2eym8zkxjda1c64xrxo9h2w55g7q6ok0u5zflzex7v6rkf86g8afhnutknvth7yqkx5fyn5x9uo7h6lwd3narfjmcapt4jphehy2hwptwjybuhp2wudha5rk8ic77ae0o2xcwpdlybc6nu07aonenshc8kztung47dbq2hklo1w2zt1q5o4j74iomu8y8fhg5acef3n2n5rgkiw5g14v97qp8c0zqzo43y23p0c9y72p4qm66ox9ov',
                title: '2mfnkyih42xptky6emdc3an2zdownyce2eju7hmjrzr8nhjz85y5feacntizd5otu3bxft0ibypj8ztqu3t9kio83pc58kppmx59vnfbyti9dcyp8xlaag9z3vzblx8qafkssv8et9lyosx1vo7dijs5iztkhph0syyn4awmih2tscae23hyu9d7686xdnzsypc2kbxx3e747vmtc7mzbhc33pu7nr5kmwilepmlcku5mh8661eqsql2dj51c99',
                description: 'Omnis dolores suscipit qui commodi sed aut sed nesciunt. Ut minima tempora aut quo deserunt non et. Voluptatibus et necessitatibus nesciunt autem quia velit. Deleniti ut ut autem et vitae.',
                excerpt: 'Aut doloribus quis omnis non. Temporibus quasi qui vero sunt harum incidunt temporibus sint quos. Laborum consectetur ut. Dolore culpa dolorem. Debitis ab accusamus est non. Dolores est ea.',
                name: 'meo4j3j1y96k4f7i48kbmluf6xtuc4t3kc9rlafa6an4rdwc7iy0vwist7ztpl3xpjbqunaqz7m389c18bn46l78273uz8vyvs95wdrcgrt0jhi2f8raf4sersdzyq0texeomophm7ql9nuj77yi5jfdkaz1702bdahk2xf6677vhad5lrqkqao26dxunpcfbvol0v6jkbuny019wsrh994941sl1dlmu85somc6totu26gohfwtlzq2d58webg',
                pathname: 'afsjmno9tkvmnobt04vdddcfsyqppx4u4jx5dlct1ac58oz2npud8fheshh5ixptpa0sn26s0dpn5xwda30y15mimguz3k56ucwvok2zi59m12duva7k4pchkrlpqk82dnpemib02e3hckvotjf7nv9eej2yw13lm7jdbzr0qio7tsy3ax2n0gyx56od99s2r1ij0pduxsqudfr3zcpp0cba3lor8edmzlc0hvmijldetf4xnbbfgu67osboihuv3lhc24aamwww0gn574j2lrv9l294c733kpm67d18nydms6g82zsew04cllcqorb4o4kru6fmk7ay9negs2z4kp2pdp1tndwmc4mciqword8lurhaketvnm3oep2tpl22cu1antbxpsj24pg4jft14xe9qih4linvcbg042hfiqnrp3n4vy4k2go2z9g57ymvta7sgutozj8oz4mzmo104m1cjhlisp91vtsyzv336v3ksdhsznhnnyxcb2d5jszd46i9uzoflxw1hrqxeo3ouu4zyu2li1n64wiswnr2lnzesh97hshp8kesjgf4ctz9qqg6tccv7a7kw5srmadqqlkjovilhihsnryqi4acnu7hs4b0mjlmgjusmrpnc37hlex5x929u40gvuroay4z7izrg3b0673hv88x632wy3bmtm1afuyx78bpf5tx03q35bb53j3s62ucgdv25nc6juqop3jpnogmgm1og2zwes4z7o3pc9jhybhxjy8zfmv2kw0kllneejfq26m9lm0pb7ln64kjtd2fl7krg6jbfbkipoqh2kn028al8e51tq2sqatm53y4dk4k6k2yw4lvf4ym97s7escpwkiyk5bcblvpxv9d0bdsvgy98pt6cblfwbyxbvnwdg2oxzjo4ykncc0novtc6pgy8ce4pl6o9id5geegs8a10e9pvwkcjiowelmxeim771ozpqto0ic98kl4t77vybtb8e9cdrz111ylabge8if7i1vqysj9vsta',
                filename: 'uc222hrl2ybebylys55ip39w5s2aj6mhmaw7874aj4s9ncgoxn4nz591b3gtphf79dd1uytac4w5q5m3xhfb85cpwsstuwtb5attazotndur9gf43k2pii3qwdy1uh9w09l03wlhoulgqti5y0pe40qnt1mzpa5s8v76xlw7wdc4p6xph0bnixzq8b4xupj4pp5i3izr06o4b7ud5t2nbgba4ztnhi5vosufynqesljc6lwyhzpfkicdfr8tuk2',
                url: '60szxchrlt2vm9qnnqb2vh4wvytt2eulnzl1qtvmptws75km6zleu83a5moo0ftphiusiw157kxhpx3c8dp6p1dtyt3zenig6ylfg0jopf9t6rynysspcs4mmnbxpj6shlywlm7j60nn0klodr5cnp9a68tc27v8sobuzjjb996zyszisjh3c89fx0c83wt8773nn1dudo5k6g327hpmnyunfhnil1l15fd14a8qdmv5f9n7ce6iitk3uni56qzqn45vqnyo1vqy8ci7mxsx0u32ifhczwsc64aj6qmerhdl5sv3lbl2won5omaftz4fyly4xzckm4hvcsks8s2wrsomdk2dz5ix40meaa1a8t1isi7a173o0r5uscki4ue86r03sg3w3txz6qtyz7yeb1axnvyp9pxa1aq7f3kedepcu1suied3se8y5feyhnsajfqtlt3xrfqmwkhqpatjtwrvu9nmqv8m5pp1gt8wgldjv16y5l2ep8esl8mir4wa8dikjnrpxx7kp87aas0abquo780onoyj374y9crci5mq03jbujkl48cp1yc17go86ldf21o0wvn658eboekc88l14uzrnpm048eitxyv9bc2pmh6ds39m45eimjt79dgcgrcn2r76wn43gogbfq88oc8gdeusdauaa2h12jisycnmpz9o40yph58uovalc2fpzumwmjt9e4lvctpapsetgxkauo9qh7uqdpm4fggsf9au8tv1alnxx2tezhch00gycsqogdak3s80wt0waydyn3x4rf9een9401pr2zb616knia9oq2oum0mjlnqjpe98m24gqbumzdq40nzywbnt7mtbqui7iyxcx9a3x8i8xu1iyjtewfhqd8fsjhmlwnfkken56fgplugdz9h4mytlx71ehx20u4mx967elp03rrqmhtr86v3f06rqpf2h5lory18z8x4b7ckh7htuxnmj5xua0fs7vcz3u196q4dvyywbl55sd97h2flijgp0iw2',
                extension: 'z49ygx3pwytlqf6weatcl9d761tm1cqx2io83ek5zspeyf4pkz',
                size: 2006745564,
                width: 117419,
                height: 126541,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'rjb6omz16atd3txpzq8dosiha5szdwfzrdorrmgucpsnxgkbvdji61nptphghmkmtty5rp1j0xg1tptox1356k1w2lb8xexdgmg3m2g3uhhrh4lw7yqcbwtclwwxgw3jrv8z0gcx1uzfix9pnuanvmrcd0ro9340cnlfe58z09ppimoyluc1u98et4ckp2gx8juo8c24mjr15bajham0rodueur77erm9rhzybagpx7jj8k5cqhow5f75hep33u',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'nvp6sz908y2mrcv7gk8znit4vc51d0qen4ltn5jvlall6ntmka6wtwhi47hf02zmnrig52ki8hi',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 860693,
                alt: 'iw4vuhxf0dwvf4bb3q8nimxx6olikv21ne8a1tq2aw7e321lhxl2fl5pbqhe05iusxzco1bvzh88dq46mc8dsj0n44lugt90wrn59ape1n5sf8nj2pshs60kzbgg21svthhos3lmn6aya6uhsgpmydxld7l7d0fgyxjbb62c05hmy7l7orzoz2mjwtfv6a00qqadsa2i74dugqiu5vusmbfwnw82i8amchx55hqmkwzq1eemzvwlbl1u8fhllng',
                title: '3276ezcgtqck1ms6p18geoj030nl54ceeuopp2lqu16zm9afl1nhbc4rxy360bnotg92s3ons7whg019dxbw4a8s079fcybofaoszla2jzc2dn9dq0y6vt2yn8bgn9vp7zwmwo64b24unx4bswpq2q0u13tn2bwgfen6k8vjuumo3bzs03jvnfzf61xsksd10xqx7v1zdkeghuuyii4ease505yktf5nbs8jpyheaphpbsmzl52j3e1mvwqk1lt',
                description: 'Similique accusamus dolores qui sit. Dolores laudantium animi voluptatibus temporibus aut odit non. Quod fugiat enim sequi magnam et. Pariatur ut harum repudiandae eius reiciendis nihil. Nam accusamus voluptatem ut molestias rem delectus ipsum nobis ipsam. Pariatur est enim ab fugit.',
                excerpt: 'Atque et adipisci quia optio voluptas. Voluptatem culpa sed et similique iure adipisci. Quod tenetur excepturi animi. Non aut inventore qui blanditiis placeat eum error fugit ut. Praesentium eum quis ea voluptatem eius culpa. Similique facere ut ut quo rerum et praesentium.',
                name: 'xast637bkni5wgra3z64xqgclox0lzxqvj1ubxvxgss8y1o82ggn9ptmykhoyxq85avvmyxzzxj58anvhhafpkwe6dozosuh9tvsfyeytfylx4em3k62aa4afddg195opnfk2ai1nhxcqzkskt87jewnim7hb69wkzqg9ipj7x80uf5j0rfdl6llt0tiiqfioy0tntir6zx1agq29s0t4ee46h000wg31mvh30rchtxo3oz6d2zevu1lpnxwa3p',
                pathname: '75qukxyavw4ykfeumvpwn6uj1he16duxtxnwem4015x8pgbtnmivqav1gv82tjtliovz3e48wnd6xix3r6badxfiwo4umxl5lb3lfbdzxrm9qvgjidwpxpqysvw6vp3aed5i2h3p7ndra946nc3fmmwhpz6xui8w7oxngt7wpnnle02r3n2v9ccwl1a1zjzsdoa8pgi2385fn53lju0m3nfthl6co8thkx43vt3sx2qz6jvi9kvinhjwu2affevf6wjn2gk8y0djdi83tethxcmakde5nwups4f0rssmbpgezqt0645scjlt33tjh3n5aupoc65ip9s8vjvf8iawqdbgfl5hvop9wnygd7a5afgbtels4stq7o5dokxj98a3ohjka6c2dhvqp00xvumijdl5hqqoojar55o1xzw5j136e3andna9dqcz00t1qgdynlo7ymg0fcrmy4nlhkpqax1sxte489xn0khedmwthpyc2b0s6o0fe9q2u5orpb3li68baqlumnveqod1p07pkj2jdrh7m965gcxf7qofm41iasqyovtbu92dmmo5w2qgxu64adf63cnnfsc5ash0y3rnkip4mbv6hwkiygsykvcnchruuuzvcmcbmbu8e64f2lfjsgrzl6dvfd6ahyvsjhq6aj5mbteswu9tuj7j1q72jd6n6pig1emkz6bti5dtb9jqwikrxs0l3xn154rbsmn6de0ei3zy5b6okxs2rrdlbz1qorpjf44k8z1je4gl8s7fsjun5yaq27oi313sw47sr7jznga25jed65k1dj1hjwl4k2a2yf2vib7vw0elnffrk0lbh6q4euwagq6vprw7kyao21wzk3c3hzimkqd4r7islry8169y8ve2vlamnz7twqbsrz2akln21rlztugtfgklwler7p5vekdhshmdz68ie98rl1l38f9ihpxdj2sqdhtpyz099sczyzfi5o0y437tyca06x5bsxjvm3urp5wqwnxu6w9h2joqnwj7',
                filename: 'iq3gov05aql0ex6yu3324c4ieir63q1heygffdulroaokgaozm4y4x8fhjd1c7nhkhqkjg66i61cbpuvlixl3y5r2eyabi7q4qh7qx1pnqedrr1mlhh5lryt8qzpjk3tgpuc4w5kjcye03jl940av89ow93hhtk2mnlvo5b7muk6malx95e6xks1wsotn665bv94qlt1gl0y54uze0to9rkcndf2e2rbwyzshfzja1damf8epcpfxkyypc7i0ok',
                url: 'xbbntrbwoc3a5tw4m0spnjmlp8cxnb82gvggpcibzeqlc2dzobx4ea1knjfuymo2br05ew9y0su2ydu2pdirw34xzxtk0jrmfccsfvpgtdki0g91kh90quylf25d9tpr2ck74ypvvydtqilhhjsgu9kc6mlahsbn4ywd00o6y5z6cnum26pwxebnr4qac25im3iq3oihfgfnxt9p85t2w8waqh7tvc4yel9hr79o8k9ui0emmzw9me878v4nleuxql2p5haumz23trz7dciooyub3vo949ahcveiuq6gplzrg7r2hqeaiiw0xiutep5zzcr16k5ztyvjol6e5ka5ngpk0ssbjp9p5uboazdli47c8kfgms45p0a44bybzq1aywx7jle33aojer1uy0rlk5g06wgf0q9nyicxsvru0ees57m70mrsdnshnn956bazs6lip9udhk95v2wqy6zxqvfdd06882dcijdzl93ekfkrk3bp9n6rfgve41nft66i39bucxn7wew37vjhp27mpkfsrolyega0l7zl66ay8ajod86029prjaif7mlhx8uqvlxhks0d5rn1ku0vagc50ica4wx2bnlc7c57r7hw86e3pq5z2ctx724o1ohi8ddqrc4bo71d2p8p80jzvc84qocs60jq83qzhc22hprgul1hmdojy68haa61y2pwwxzeh5sa9wlnujfkshjla756g6q0wrqg5s4hoeclr3nwk7o8tbp6gjt9hmf6mzc7xgcv9j56klsc3boysszwqx3i1lqja97kf0bj19j3ron3fz6tbxs7e95lpz5876tx5e9hpp0va0p5or5fvbb8y2q6qo3dueusun54iy0dnkxm6mpjqmfa3wqicragt771g9nqew16pkuxjp1ep7y3n2j3a7mcm6a6t9hvw99rtjum967prp2xr5r7usydozaa2llirefl4ervlbfyxa8swq6fl9uotbqw8vpal7tp0p46rpoatcbylpcs75qlytdauuaz',
                mime: 'm6f6gjchx1egbqv5muuyzupotof2x6y3qpewgaqmyztstdlcyk',
                extension: 'sbyx06089wlx7rtu1f4eyh4vx0b1dyzhtdmnracs0zhsw518t9',
                width: 602585,
                height: 205789,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'jdmsmh6iqsxxrei17vp0bcbpttyely71j6i395zwvyv9tt4q3x0f5i7cgyxhu5qca0gts2g46kiuchq559038wlu85p2inp1z0sotav56tulq146ln5gxp7nbunwzoupq26r6qhu10uzcimaswhhl5sj3ir3rtsyxzqdaiqv81cj9hpazgsrjmefbkxoqh7rtjvrrawaw9ecc4e21se2z8dnc9e9ig6mpd4b2zc2568yv0kt3ti59s8ny8mwtpa',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8lxemgbwa5zf5aok1l8g64mqod4d3ejvlzozo',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'xgb0yqmn4a2ydhiqf126j0g3ezh17w2yw21cq1rk2hhlrapwinlvv3b05sekpu98d0qi1a3qm70',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 822644,
                alt: 'iv0fwf1wu92599j3hdq8xsahj2o01mkmpp1u5loaxopwcn7q2i9it4dvwovdmxfi8l013h3n02dogg4vfqz2vysepwu6u9q02fw0rlnpqhqyg997fwhk1p3hmmy3z0pgeipcbkq41h0o8ilnce7y9wgit7ympehwayg24ppdhn0251m6dvf6r1m9c96qqo0tv5tjpmt1r15ojrs7ql5wxeiqloelx13kibdzlelfphj468j2zf3stq0mtbb5nb1',
                title: 'a8wrutdic4djzsc5i66egs3w77dqhzo6fmunopdw7gpjzmoldzz8v3juxsjfbspnjoeebo37zl573zpozmdnyjyhvsmt7gkbh7qf8as9ddh35ssqprarkbxuikt8prv2c5k4xctoncwylft90qlmqlsb3vcanzh1mbj3blkmcnviwlszvqmuuk26iogw4fcnr407klq9vdkmntnvi4h6nwvrdkea4td3btjnuyz48f3p41qqxj32tbxfujp98qn',
                description: 'Et ad excepturi dolores nihil ad. Eligendi eligendi doloribus. Ut voluptatibus ad enim accusamus sed necessitatibus aut ipsum quia.',
                excerpt: 'Ut eos cum non rerum adipisci ea sunt. Nostrum accusamus temporibus corrupti assumenda expedita iure dolore iusto. Voluptas ipsum corporis qui eius commodi. Qui eos et odio minima omnis corporis. Qui et quasi.',
                name: '0lw0yshol46tv2l6lw0y46dty5pw30mknzpokdjwu5092nz72kw2ivgihwgvpl0upkrpuw926lnzrib7ooximhc3k5xmwvmms09050iyq9obmovdji9md9wc1oloibvzw676w200sp16odglbhcd5nri50hc0zm4xogf7026tcykqdqbn2adjngnpchd9cgm2teic2bg2ywb39tt55qjm0neiv133w3blptu97bkemybat32eamhlq7oiblcf0s',
                pathname: 'sjgirf6j49w8hym2m7fspxec1zq4uod02n4iy0hnik2l4b9ccz8ax7gurvvr1hws0z8htpb3l6y5qy5e6mhk17j0mbssinqmjs3r79suq4hgf0xgwcsmxn6lvn3zs9wxdro6g11pk0nmu7hpuwxb1w22ft379yn4zlzdtmy14ta6ei7fl3mlr6eftw4tcgx765zsho7su55ljoli2514lheitdzpryqh3lenzxsv3wzwnvc1ae6d9jz0ztpkunm68qk1c4xijemxlijubibtf3iqrytjq71coir88lf9ffisik47ahqg99in9vi44posgog4phgy6gg6q6h6i7lkaya5phcvff3qf245zh7nd8hcggta0xaxd5sobw16ddeg2ecu65tll2hwb0qw6etdahpt9cu01gmjmokna2ndtwzm9dstqp5mnhq0xb08qn0a8yvotkxxiarbe4b44437eyfq307o3a7vs1t50o4ed5fz83rauqh32y85ltkujdkq7rv9lo68wde581w2erul7bqnscm15vdu86s9qibphrqq181jzsgq06aqb0vzc65pbw49lgy09k5cdhm8bge75wvqukmqeos0ftv6pkfp5gd3gk1p90ttcroo9gbf59ulkc4ulfomfk714nawew3m5sfrghkrn0kmiiyuzcahqm2krmez92d9bkxklfxqm3lt4mvdpnoxato9svpyg2nusybl200dbqsuejgxga4zxfzrdg98h8m5bkcvqrdzlr1ol9tg2gs1txu1wxmhdwmv5sz0q1rho39t1kkcjd6e19xrfghlwkvru7wqokr204h2v75c5y6cdkkc9nleqnxv822rzoopsl0aubhyrk5umgs25523pq0weazmgtqgkgmzz6jym2o11xph2rtvd0rt8h6l7kw8yeotjtbwzdx1snt5sosucz52tgydcp1k1no97jhne0mmnigaveupiil3e6ecb34qp4nyd0p0m5m4rwp99xs6krnvltxqc0tpzxmv',
                filename: 'xy0jv6398jdv5hllfioatlc2qakf4pn76jsfdggkbcl28auitqp4ls7nroue2rdf508yxmw14oj2iefx85mef7liajvwmnbe3xbgl0k8m4tn7pyf9c4y584ul2uysug7vtngg4lfgq0r4h7wpm1tfud0doj6ym8le9i4i9qnm76qw7uhx2kxipryfns3adai4mgrsjq1qji3nutffye9smf7z7lkjjw6xu2qiiom7284aq87wwbulvn0wv3dbpx',
                url: 'gwiznr6vtapxqz5273lnbf24polvr453r64yqlwycy99pkdkhmuoeiezequfxrakml8ymtcrvgwhof26bhe6n6q3bzg9q79jrqpqeze63i4ijrls8ya1oa0641o6c1krx25dnpkdcjr4k80yya3027416udwmsyyrfte13bhrpjfqtmhrbzxglfiqgh9juz7vs2t53b0foxvsoeg2irj5hyx41gckv3pwoocq01tc10cjp48wg4o2oumn7m0vmunojdmcumpyhm36fapima2s72vg2vzzuyg0u8lgj46ceyeq4xhpz9yo4inf0zrqbuyu4dp3hsmy3j4sz3ve8edu38r1fzuviknzm0xprert6rn0f7hik29cqdbp95ccvuyvbr39nm3vhm3j1y4ij0mcjdfamyqrtnnz3o5dsustdp23x23ky2qymesb9xgvh3qzrke792gk97jf1c983u4skh7mp9wwm3y681qarn3kfh0u0o89cvzd63qvpoqox0ajlv5d98jkr0064youb6usz9hmzgyo4yrzh5jd2952xfberhc0p3rc37ut1bpugkg31us5sva1q2252seyqv99e9llmwvwvnsmlvwu5gc4qwlaqpo2fuxy11jlrhig3kpqw6htpokcqk2f9otpjhy7dq9vmzti1zlj0e3wqy7b7baejgquxnpogu7ulb4eeldl9ak766t58m8gbxzwe3upcqgt84wnladcon1h2q9sm287t7h3vfl1k5ee3y6ma6viqqcdobz5ymdrf0m91zfs0f6gsuelnlynmnizfs78rmj4dbyxermxfo1pe74v3ludl4rq96aejpfecl2fmpmfsdfk7733m1lcojr7mqpykk0dran9hlarqmdot6z7e6fzunscy25po7sllntkic2g8txzdefq7jgrwxty5095qiedqybgsvt0demapre2ir3khas0akwjdqosnara6nn9ttamkbbbnh6i6ac69temjvt4gm4pt38dnlcqea6uzve',
                mime: 'ne01xlwixp82awj8plin77w56ogeyj3fw3y98jdn93q6z8d3r7',
                extension: '5oeui2yuoaac4rv1ponov7xdym1cmb8kstm5qd45owju4jvugs',
                size: 6943159855,
                width: 528463,
                height: 418716,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'se4yci1bkjv8e64pp5iyyprbney5f242dq5mdtzvwdaycuza0uwthqohkw3d2byzgt62j2rzskiq1lmlwfgleehatizlgjzsw6h82gvonsec6vsnb634u8yyaeezjakvwdejjj6mf58qcmycih3ari98g8w92kyp32t16qf17rjw4wcbulr3afdjzryak100tzgymk8o8q4kjqdulciu0ig52jyrxch06nwcj2d5e4goc44mtk21gnzs5tytiih',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentCommonId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'aekqatiabyaj4j2zrfua6girz71qzenjxazcj',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'vefgcho62il735ane9isc2jbb03ztb6p2js8zqqra4tpwfr23uuvj6tp7i02csgn5t957415jdb',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 130037,
                alt: 'x9uz4icyvyr3n38qi87lvc1dz1rcclk2esso9p10xywextfhgnrr8q7782zoogqr49l8sqohkjznxa07qaauoqf2lp4bf2t00owuzg7dy6g1tshpp67licvs691axxb7wpi4hbbufiu9x69nn564dznxbssh352wo2udwl3pop1xdcrdbyol5kpahqu1vs4h59qwh772ven5fywn6c7luqu0rizdh5tkye7kdor4bk3jpkro1z2a1m11ul6rwul',
                title: 'aeuv8eixx0y6lbz0vanoel7r5qbded9om8k3awm7h4elv572kof12olnhfaqsd7dxtycaeq6qtq4u87psd5kcq1yy2cbun3wo7yx5o1k9dhuusf5wmpp5ws6bsecsmg04dxp8fozaxbcx188f75hr9b3cqp78o330qymqnbyjtr13en5l3wb01vzs0txbwbjnitrjezc3kethv0c05s98w9n5pof7urjck6dkw1455j37y1m48visbuw255zufl',
                description: 'Est ut veritatis et reiciendis soluta ex impedit. Voluptate et quasi quis. Itaque voluptas tenetur ut mollitia expedita voluptatibus. Qui odio est eum sequi et.',
                excerpt: 'Repudiandae quos officiis eum voluptatum dolores consequatur dicta. Pariatur sint placeat incidunt. Dolorem amet aut. Dolores magnam temporibus sequi eum. Natus officia ut quia officiis.',
                name: 'mc7cmabrwt9csffa5dk66fj4l0e97j57n9usx9trb76zkczkphebnmfdz5v5cr6ws5i0btonty4gqrx8koxlp9eu8wzea3dacyukcs77i4ph9fn42idjtfzjsbbqdpr12prastlku7tuwhukwv6hdu5ooi23bbvgxe5l8a2zjhv4hrmegp65tz0cnkk3u3ky5iwufayvx78tmeqmufkfkkzs7qq87hkkihqslns8lskjcda9zmsudhsmk8sp6lo',
                pathname: '7rchrfkfdz52cr89pdgjctdqhql1at5ugehd2aiuu59dji58oasy6jy00njaxr0xjqlebv1j9ehu3agfx667y1n0ug586znsc8mpiz8nv6tfhp3tcpyrh9qlsiek76tjcvumg67v239qhc70xy9kfzpysxc2j5kavbbeuvu77227np06nbt09fgsp3v49rl3uns2u421g0llwuyf30t1cr2ydxsrwmyztrox4gvugfsji7ziw721yyv29iuqov4qcs4y6754569g7abb0rl37ut7kuppskqoi0sn97g5311kh3fsz5sydrntxffombowf0yqcbpn9qbv8a8ew3aeqn0hv51te1cxfbhjoj0g8v6m1jxud7jndhw8bn35s3dq9n6ncpvnbf83ctsqsz6gyy9x1m7dqwz7v9riqv17m66z2dh21s01a17paedheg571h97lc0ke5bviz5axd9az75h3i9q5eeujrjv705kybfyqd5we29bl5dvgkzarx3qm2psnj72kcjncg72xn2yhobe6u7t4w4lwi3fcm1pgfyq2nu62b980rypbfn66on89zksy6oysrw7ptlaabq7clzgok22qnh17jq74pnhr9y07ub8u36gcowtc48l3gg55xct1w0ouwumom73a05zkvzqk940jfd2k4yjfpbpvklbcaks12ra7s7vjxd3f82b6rcyeiku55bkf9j3p0f9r2mhys6f9b2g3xea2gw8egjtcx5ip4uwgdp2c7z4ay804sjfdqvuyie25xhd5agm3jh3pdnn1klzd7c3kozs45436sxg2w0wwnu70eg4mulgkf9edazsl9v5q9wo54ieerb0lpwme1nccilno5maj7n50wweklexa9t1zht9uvan93etg9hzffjpy5vxgomctagob36uk8v6enf5lx4dmactyt89uuvoo9ugoafp8pwljw3zhss44qg43n0z6iz6q79hki9ji22bggxsu545iivabz00h2zayxlc9v7mihbt',
                filename: '1ycfaf1ggp6q3xm5k459m0xaso02hxiumveeldloigtqqqi25264qgnpkpx5ojtlcu1iz77kjn7a9bfbjp66mj1qp9qdrfvjp5xrgii0229yneldhf58l4v29f1lcmt19n9rmvhmxh5bh814saf2rxj4p77pele729vaygf9t6nvtpszu5bm0qacuubplaiy1zc1qppqnhlxo55eyaomdlmuw4l7m6fghh1su3ns9ylpgg6plsd0742hdqzn334',
                url: '8rpg0tpjndnmuzh7s5uf1i33m6z8wn10upmfj64t1l7r03bvc8rm902zq87t9i4blety0fp7lhhqyf7aonzo9olvwnd1mbp7s75kq7y5xda2phev14j2dzbqaahi260sknki8xlqrw2m9qi0htv0h67jmpwglsjwqi2vesuxjmeoxllinoymifrm98q28y8mtsdjpigwkkbzu2yu8xxzub9mhb8c92d00xxa4me8g2drpof0w9hx5hsevsv9lfp6b147d51t5tp1t14c0w0r0kdrqoploultge4c1m7jzrjwkurxq0syz7t8a7z4it9gtmwhf9za50qe5cvh8qq6ev1g0vrva8qgb99rha1m7d2zlpme9cbau8kpss138sdpeiabj9716cxc7o74xdnu249ocgarpottg641f2usjbowzqizq7maedzi7sztg0xcpa10zer2q7jjwbyrrv7dg5tcqp0zdbr16fz5jpt701btuma2wtume6tvsjozb5r0165ys2okv0u1qy2xg210tp6vujp9imjmc56kqj8ch4wb9kyvmjf03vlqj18xa208rqi7ro0nhhz6dzzkwfj212r76hwo138edefngoj2gick411mtita1yzs48axayg3qxc41le86y2v9hjwg6eaiznzbczkd8g7yaoeomf3ztvx4zaaobimaulettruzjh5ywpeqkm310w4ycyznuhrx3qpsnnqknjls67712xmm16bs18p1yz3juoda0z097jw3tkgydpmev7gol35rsdyou377ict1385ny0s7bpfefilnnp2bxv229fnvram9fmyuyrtoo14asawmaliboklpxqio0x9w9qreypo6w1ebajl8touqtnai4rdzj1oerudftjnhowq1jed7zo4u6qccwy0h5h28mcue8o327dr8q2nu2ah82yi91wgxx97pgnnvs9nsmcjm0m6ex3u9vuw8ibdp8a763ywc00bidjko8zrimkea65km46dzu8bca5l',
                mime: '9gqhxt68mqkew463cq2k63m7c8c0b7hckzs3xhjb50mxoqfms0',
                extension: 'oswd6x87s142b4yxjbt90vit5norkxxi00pz1yyoop5pdjpwy1',
                size: 5059939762,
                width: 636994,
                height: 631872,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: '490be1nylz7p3wb2hfbu1pmmzbop3ppu7o0ffh1losb3us1urlxf1oyca9nb8o4dqe02xsoq37arha9extlwjy0dbijy8igkkyyobst38ucgp1vpdhhhtxlpy0nd0cr3r3l8rhff9pcb865rsmpnhtokwic43qaidd04sbed8ag8zx4n4z6lajy7wpp434da74vb405q3r9wpvfu9raffmtqc240uvd4qyg833ejbcwq0dizw1r871h06xo9dkw',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentCommonId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLangId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: 'kxkoziyn9ympoqg77pn10p3er5dmp2tj7br4x',
                attachableModel: '85eykpoon93u8r688z5bskrbanubvc6r0qxrto4x1u4iydoqbnq22dzz4vkm502hq26tss88bxx',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 146200,
                alt: 'nm3br0zlywazm1xdwjas7n0g3vzjk411zfho39w052k3a5ds2qp2zb4odu29p29tvenslpthew10d6skn2jazf7o5s41ybnsjzvn6qhz9z50sjf1q2a7ifdob54vpt0yi7tj2cuwxvxwl2w4t3pxl3rpytyjzf9f69w2y2tv1ge0qhyaakbzula7ex1tvs3kc8mje7qbhmam8uhn0f0awvfq4g210pmg46gl1jnd4syxkjt5hq851bsb1vqa7m8',
                title: '5hde3ltgo9jk9nw23eqc4pszymkzut6z4dxnvvsj3uucwes06zg3nlflryyplyekji50o6utbp468ibik5w72u75d1ylidwhi4sqgyzm1bkgtwl8prauir3zr2ksg55muhrinclb7rff99d5zf14eskig2txgj4jsopiut5ynl32kekuu6ksx0mkf4hnyic27g6md4p0jb9rf7f4vtzmmck7i24qf33ndk9oj86bedk5m8nom2euzlyo9hmr51t',
                description: 'Officiis dolorem dolorem repudiandae facilis. Repellendus impedit consequuntur occaecati. Accusamus vel recusandae ut et reprehenderit qui minus non.',
                excerpt: 'Aut iste consequatur fugiat voluptatibus laudantium repellendus est cumque. Et doloribus ut nulla non impedit. Doloremque a ut et explicabo eveniet. Illo incidunt quos quia maiores doloremque illo ut saepe aut. Corporis recusandae aliquid facilis ratione ut nisi tenetur ut.',
                name: 'fpnffr79gb78im4469xcxl1752jclt0swuzxp7odw60np9druyel4vcs6k3it3nv7scy7xdo8moif0a6dk58wp5tbw6r2glun251o9v8rlq71aqju6hjyiovw133fizs3igg0eoba9ds3hm41ft0xejktzo4pqba2rzwqnzlncgx3hl5ns58h5oadfjtd67cl3bq8bx1wnbgud9y91ikw0vch1kstmkzes130z09t80ramere83fgptob2u68lj',
                pathname: 'zwdggb041chi0gw2wb1il5q7cen3cv5gsw4yge3b4p5f477tspvwohig2gqy56fr1u592ociigu1f30hzxoy60uf02h2aiahxs7p8i803v033z09inddjrnj1vsqqwqnkxosc8kvd0606mysttrnixutq2f28uwwf37y0vq4okwwfez93q29vhnbken2utv5fzv4qtq3382csqjbb2qdvqewcxe6u5cpjosxhss6oh2ygyr7xtg2hdijslnps1ce4gjy6n0x682takz34p5w1yzklzzp1wps5eiuqvtgy57d9yaq6amcleus4lcz50tnjutwb5cntsu8ccg1mdvnllyxcp5q9elzlz862pl6ekffcot8qz5mlnrzcynjc0nc6uo2u1nd9mr074y8mvzqvoj6cm36xmn2civ1qush47qdrjvaw67hbb36kj4dpcurvs1j16nh6a2ne5lzcgool7x13n6d286z965bd5ngmstzigztg7mcqzt5050hsal4iwiisxeb1x4ptqx66o8tpkbcld61o1ili4ycb0t4viqv034oapa0gm6cb0wi31m60ci32r6y736z0jfipmctysk9q5g1e5ptmbsbjr8tx765shi06mzgd7wotil0a2a0voqdsa1u83mnjuljjf8ge980hg12omh149hvxx84i4fzp3jvj2c98zwpf6uv8y19s4j13qjdwx6xetikvlu9ke200m8jzyqovz8v6pzqc9uqxmxscv3nlesv8z22x6kcsvu05a1q5hkfmyreac7uill6f21yj2szh9qb7wkik3t3424a6ws51cylxqiiggqho1f5dm33hec1fgcg4pnvu7st757lglkaxp7xkl9w5mjbmdc447ajfhzlc4li81uylpegm8shetrsokgq435k3ao2x0dfrsnnukfmtc4i9czqta32en6oyhugecqlay9a49uk1lue9nfhmrg6h48unf7ojh9y8ex2ydv4c6ofjdcrbnz6p5ju8vc2sn31qljz',
                filename: 'zik7sq5wkegycfqrjbmwqwghvq3284rhupefpb5vfli13fve39em32x8dm7ozvzc7blyod76mkevnwtthm1xbfy4sab16ivl6edw1sfhigf1t0towu5xunz8ttwy1z2e1pq03bcreh3b3oueyfo74sflm7y24aj90a9ujtxbagox255osp94rco817uo4ohzvv5oj97dafawdqax7zddzi6t4da95ooh4p5eo7bbqvvoyk1jjqjqevmshfpjgog',
                url: 'gfofeqfjof1en5znkid72hxztdmrm6lpoot7kz4wua8ahp6i8867aupfj8eak8oitxjmolbgguogz4xncqp0u39anrcocyx6iafhwbm3coc3av0ct1y679c5zblvsiwhd2uctjlityg0txkabrrotvqet6r2yfj0449j874gtknelobpyo5f010jw8l1no4yb1zidiuvzi8a7l04ntlo27rp0df5p1ayzquq2otmwyaxr66x5ztz560kc15bq4fp8azukmv5bphnjein1jt0ru4cjjo24wbh17idid1y1diclsgitdjua8idcsweyfu403vncnc8el1cqoflmzs3kmwub0a8zgdlhf9ip90txytht349mjysrua97uxvewkrx41grtk1n3wdx16x9dkjagyoxeu5y75cpccykp2odzmi2ufbtzy593hoxek24oy9ld3vech6jcyli1ue3ka8zct66dzcyrcpknqxedzp9kkjta0uzrt77wa51dbg6ua4f5em2lwkvyih9iq284nd4y7pxo5w6uaujqk59o713k1jkrdumqf2iciyi14lqe05bqhayagu4gj3mvw21x6l13kxqgy2wdl8w77rdkex2rr82zx6y1f343op4x43ecmi9yzb62ju5em1c6vrzomd4ba8okjwuh6n2y97rztsxm3ungb19nhhuc2s1gfaly5spyakoq1l7l50yyosvlkaiqbgcf0maszj10p56u66nshbjuxjhy95m61v4msdlo6qy831wvkd8mlbquggpcakaac349rmyvzgbj0zc385b3fugiwvfzs0t727ieinlp543m3caay6docq35jngizgluou3re7xvk2cd1i9f11885n4r533dor2k5o7f8m71yvl8kukqngj37iv00mch9jolp0vmyn6qzraxu7af2mz08mhi5fielmjdkn2d9daboacaq2olntwbub45oh8wblx8vzwsl75eunkuqzm6xwx0hdkig471lfoull54s5md7t',
                mime: '8ri0rzabm7596m8jq4v4led9n76erkikiwqjgzkgx2coy7moua',
                extension: 'vqeyzyc45gjgtesosak8ah8urfeesli1944vo0bg56m2fzoop2',
                size: 5019357700,
                width: 137428,
                height: 371858,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'ejhtebovw34zo83gmd8rum3gwt3udnbsumzuwcerh3nnioe9dc9likr6djub9egqtsrsgshrdjqmqtw8c1xfn03lra3elpcxixfqppv8u9z1dymsgrmnzx3zpbpt83iek3lpgbsicecc0877kfz3gkpfrcvb8furipk2dq44r41of2rg6rmao3qiiz1v4oa8ibh3w8s3lbwhnl2irh77p4cb8o0tzquo8dcc5gkuup2lywqk3ynoguxhied2gky',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLangId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'xsm8r0vh23tvi33udhrx6k4w08mbcx1t4a0uuj59f26c8l5jzmfgq1w32vkualovggne2wxnovg',
                attachableId: 'ewe4j45p1vfkbs3hcqri15ee4c7v02er8z4bs',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 481998,
                alt: 'zg7156a3beqwzp8r12mwul6dqqsp8u332ce4i3s5uau7s2elojn34a39qpb1wlc7u2wmsftyu1dss2mshrof1x7ai5b00ouq7snj8a3vkoc7x24o5t8eyjcnrlq4qhw6umz6vpbr18a0hpd4ynycyurqjt6gnf05szlpxl9dcoffaf7fratbxvsg76pt2u4kjuytcjy8k8cy5olcypd43f7em2zn2xlkluit573szr482ii6bd86x6jwlo7hsz5',
                title: 'z6dvl3kd2r1he01qof4o307hmzsbso9nkw9079v49gkabs17y8lzrf5v5j4dthydtli3oxh3dg99ojj1hhvrirzmg1ue5hw8nf0j274xjispff6y17yp744dn3odvdmq0bs5v0sua36pthyq8nw602tzahw81hf5ykyh60d6vihi8nqvne9ywe6vto798a52n2g2z1l7oaopbn381n3a149lx72fjuo9jspppbvg8uf09tmrtj719c6qlkjroas',
                description: 'Enim quod nihil aut magnam sequi neque et. Quidem ducimus aut. Quidem dolorum porro iure consequatur et quam qui cumque explicabo. Possimus eveniet eum suscipit culpa quas laudantium aliquam animi sequi. Dolores atque quo aperiam aspernatur. Laborum hic neque tempora laboriosam eveniet esse facilis.',
                excerpt: 'Ab tempora ut vel deleniti molestiae enim quibusdam. Alias repudiandae dicta. Voluptas a ut blanditiis. Id quis sed porro voluptatum ipsa necessitatibus autem. Quod aspernatur mollitia vitae aut quaerat qui nisi ipsum sapiente. Excepturi suscipit quia in et amet blanditiis iure dolores incidunt.',
                name: 'scqjeahtwnua5ys606a65uhyd1t7dap13ky4wfnqxblit33mc7244geamgcrs6qb15q5damxk2vw5nr88dnwmhpt40v9mxb5badsfzzwivf8ldm3mzonwt4s2y1glixkhzhtc75dubdnj4k63pz2r50fiax2y9iz79v7ce4t16oh3w878e1kjzupwgoriho434maf0oj54hpziudrqotqp9l5vqg8k38idrmgsw39tk9klf3plk6gftnn2eq2xw',
                pathname: '81gw69nx2pbnetwxv8n6nwikl2pqo3nuokzojyyz0ou8ta639bcecsyantk49hzx6sl9z12jwm4g23lerbwor7f4agtqvmvgzvhr6xs9cf5jg33ionc7ellcx46gxs35donrd9e7lad4cojmo2iio6jko5531b3e3mfuwr057bceyl4udjjy6kbmqemibnha5dlnw1ba9s9q6twapnco4w136msnnw0l70236c4gvpljzxha8tclr8ojvucpm933zc7d2mnxcehno6vxz9996gr3xodef0qnpb8i4xlnzgithjp2d8aingd1v7lz4tvsqv1miiej8br8q0oat9mz2yl330f034fce9np20d4y5pj9yimfue65nsp29xmoso82uldjj1oexzx2gfizwb0i6oy6vktun9yo7cjrx21m1rcyou0gguku71b5ys88oii94a5ofjp6h4yg03qkxnxrgykpdqlfpydjeiygw6i15tremwxt5wq8psxetmezg5msk8icj2y2m9la89khf50u2p93gl2x47ayc9f2qdsxaqpmb3qii4em5mntzi8yxy9yi0o7v01dvdndm68k5qcas73l7f5n36b2u3f51cn4kocquyycno2j4f54dzr6ldi0201w8y94xmrejpb779zifhqnfgw71vabhlibvsnm4itygi20inaoqy1orbhxjgvnw7w0o9ga2gopeje17u6y7uswqtsls7elwua35v9uol48tl6lfmf5o88lva8erbjmzs3x91h8uur8ai06mghp9p235kdtl0580dx3uxoh808do5zquj90tl5qq2tfi80cz8hnmztjnemlfn43t5p8mznpql1xtonllvnulvxt7ynexchu5rrlo56v97q678pz3q6l46rkfap49qwz4mnkbyflm91lxe8fcf5tc4p8f4f3z17ntqsnmpdknkvey99j90ymi7y732l9ut83k2ha1b7n8n8otqyalcy3974yr9nfyc0vp4qams9dleeq093',
                filename: '15xsjq5lrrvaetkqje1uk23zfyqbh9sst4o4xqa4sxlcolgrcddy0nvq68mzi6irra3c3voqrq8r3t2tul2yuncwmy6qsvnylmcap8sx99mbtnafszyvrm6r9fo894hndy82e2u4epl5s91flo8cf3l294o17eqwsplcshlrs1zaynq7te63pdb8f58e62c5h5kmes7tzg1my6ibwzwx1qgo1okmngtza4q3f0l96f4hi5k1aglq218q71fha9c',
                url: 'uvjx9uchztyqb9t7v0pzl6pxzouq4x2u6yenhwro26fuaislvyqaewllqna6iyy5yxwgaut7dyw484r5l1p55xga0gzfa6kvvyziivk06ckcdganfwgaigb040g2la5oh6u1ec1mayshhkm1mrskkxznsxmps5jd0t5u8fp4jy7nc2gbfzm2jiy4r7i52merh3thee4i8h7tte7maevzv32fku414jbxito5i2rrdj7htzn3hfe0eu5n0s16mclwoahklhkoy41ulc2ry3zrzxmsau3ufw9iprmfsza1r1xzzj9wsbggtrxra8qm04ht3dh61de66lty7jamze7uo5kgkw5jdewttolmloijj6gx6ki2qtl50hkkje3x81wwi08xs6xcloy93akkpwxw7e9usjnsfsu3cx6n1msaqda3qmcuwu1x1httkz2qulbdbh3939v8yhno1ygcqz1fsg5xjxkykw4in84zkvikwta35pl8e9v17ncrxak5f8e9hwf7ahstndftzmmstvz1412km0cxvyzh63p8i7879p9sli4ojhn9j1m7oqfkes5qdv758s1fwmwfmwh3xv0tm7e15uvas4fcl6hgbg4fhv81g5pa7tny5suqbbx0cz9remt7fghgykf0xxw7x8qcrnu1pjq843soe96j9ig78aef8uz6szatzd1t7evt3oub1s9se6uu94u5btld2691o56qf92ysvkxsbrcmj8k9vapv4avai6s05v6qgkhqv3tc7rf4cft9ccjmpy9607xq9zjiobmwzfkfebg2l9xjb1ot1wzjmihe85yzwb54kvzvg9b23qs828plhyz4pgnfs559rv9qnszpaq01o80sd1suuhus3u50sln6tzhri24bfnn9z6wiaiwr280i69z0yr1jwqoxbsgcncjska4ux8dz774tcluaikhqa4blvmjsxge5h3xhvcbz0ej4bh7y4anr5plv8qvre23o25yse395j066pjvrrnj5uzj2vha',
                mime: 'fgvz6boofsu1mw16ktcrsri88nl5cml1u1pfi53bfe6lge5dmz',
                extension: 'qzz3p24j4thmpxjzphtjb04tk3z7hgrcxik04x2xrbctxy1nw7',
                size: 4341457899,
                width: 711295,
                height: 206434,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'i9bf5iob08go3sszu0hhshvr5ut03p8o6n7y63b42g4x1k90c1skwwboy6k9awrcy93re141uutsdqrjab5p4nbfe6mv24t1tlnh24xf2zas4uiqxfzhopfu6lr1otbeqpr9blyxtwc5zmzoksw2j1t1q5tkdr9b40wmvxrd4cjemwtosmmz7648fqxl0ue3d0jri8ictgaxqu4ys9lbg8dihsfpai0fj9luth2zpj4autih1tuaa4qtd4uikwn',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'j9a68cbjqnc085ldaxohyihuyi4lwi4x41537h3x89olldt9tjfweqdqqc7yo57ukxlxmotvth1',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '5728cwlgoxh1wj6r0jy4saoya9i4boey8ru2e',
                sort: 688144,
                alt: 'o0of5spk3bn52j7w5fwhxtd8kn710juwj2tt2p7w0o32pbew2rhzwp07s0kei9ye165tubxmtut1u0rsir0fubkaulxfwxumr1nodw6u7sgh8dcpto6659h3tfmoeswi5cqrfc9gkpuw47ooaaby5meumptvaqatlpuqt02ullvpmbk2wde79c6rmdagpkijvltyy43cdjc8oewnhuvth9u3frmeid8wdgf9r1vd5cbl4rwxwqfm86d58p0c86j',
                title: '2ppex8ffcytqvao3bkrp5gpjahw2ylle757dzy4lcsnjsm11ucz7zi39sedx6chpagq8vl8oxmew9ibfy0lkq4q28hbkjs0khtjvcmm6vlinvnegqu6ibyxdivf2up2y01rp0y4nm2x7denclny31rehwbvznbjfucyef41kjz1bfufvvf7oxoyw3qts39prxoome47kqx3291q2pwqv292ha9ub57f4mhtzpdblprc70b9yb6nfz6wr0rfhp1t',
                description: 'Beatae ab placeat praesentium molestiae fugit minima et. Non ea accusamus explicabo. Molestiae iure nobis et vel soluta voluptate. Temporibus aut sit maiores. Quae et maxime ullam fugit voluptate.',
                excerpt: 'Qui odit quam ullam est veritatis animi est optio. Sunt voluptatem nihil sed vitae est dolorem. Ex odit dolorum qui neque. Dolorum quos temporibus alias et. Explicabo modi sit neque debitis dicta.',
                name: 'vmgbtorkfhs2jf9ptgvg6cz7wya65tz4j8qoyu8fnzzww0a2bk0wo1l7iyvotavxfncbi9thzk2jyebmghjd9u0p3ohgecdcl9yet7ippaa6jn3oe2eaeieinrtedwek3wxu2aabd7d1ju5o358p29nwjom00lh4brfnncwgqh2z7sfz00ts555v3yf7jjjgeovd6pt2rd9fecdo9xdzs2lgqr4e6a4mfw8o1nnmec9ndjugbm3dwnhjtb9oy31',
                pathname: '82lhvol7k3tryanne3ymn6xvmt40zfuocqimnjqmblb0qix23lbo0ppgzp2w40ibqqh9owi88t9jnqppxn4be4y7th4oxbfsf191q5vgo98p4ehe0o3r4j1djhtbod9lsy7fvq19ux7kagzlcwo7jg1ixtye0f5tl2ympfo2grbv2sc1qg5v6ptxima1bsh25vydcs6ym30ieiu1xydeilc0x25yj64sp8yxbnhxqmr53nmkxtyqio2puh78l0j4l7q57sbqze1fenngtovnfq6m5q214zaryxl0vixc0jzskkqderufnj81vrq25cetdif55tqgw3cav2zae52fm5xyqzrqnpnjnjynzio7mcpz3knhk11u9zk5ailkxn991i3im63pp6xy9y0uh917m7bfmi2z70erqw6sm1c4f4h00pzjn0m6jhr6x0gl6bor2dugwe2xojku14kb4mnzy8apj8kigai0xtc1n0pzzvyx2gz8aq984ue2euc6tbwd9mxq90pgiesi54on70duxgovzdr69q9bwc30jlsgdg9qztlepxjdojqq8loebww6e39uc4351edtv713k07i5kw2kme3xppy4ob53dcxnv591hmr0wv6kxb4n4y9jy2san3x69w3q19lzfd9nfrhzov3bleorx6x7ry12j21687880hx62oitm0kqit1jsaeardvk7lqe30ovpknc65x46fag8qgoz8rewr01pt8ktrtu5ssrphhc5kj69b9c5qqan0kww6d6sp4fuwz1qoiyrjhhtvtvukik0v1f059bk412td2xfzyt2b4uz6r3oold83qj77exfbn1j0ttpzude9evb6c1r26nfijbvtsdrkfruxk20b0uv2nthfwarp82iswzl6vp0qop7ch9kc186r278gymylu4ohz6oe15p3pr4xmpjy0zrsq6fbvyvd1cfe9qsh7e63x00m0jyu2xrmzethptw2swuihdazbgoivw8qhk4bv9d6m6f3g1dmi',
                filename: 'btth5q4irh8bebsa3frkk38rwbvhv2x5rm3d9zwie0ugp296cq94byrhr2v2h54isklm5gzzbps2cr31v1i5oz0ladbj4m09ov3tn2psbjz8ct5minoorun2tdfcj2dritgzbgpffcinbku6wez2t4vw2xzo0u8rb9y86ji558a89w0fabgv2wcb6l1bg0ueve13nedfjkq5i3gmhf4lqylig8gm7gg4ss59axmprclahfs1iskb39bmtufg9dw',
                url: '6qh47gpzkbxqb3u0d0m9nuuha4mrnk3c1z1bf1ecuv7i0rcyrt3xpdaee3ti0a60m6z567ljaapjxeo8rm4srnq561ol85382g53jk2ctlqthuwykxltljg5dcbybjbj8phvswfeycc7zm9cgjvcvxahah3asc9ig2ezwjs0sk3tw10vq00a8bse72ira33tl9pubk5u8lgszhtghdey2ttvo29ccekncq4s7v02q4bu781ragk79zeerrl4oif7sdh56dp45vv70vx3rlorjk13eg53z7mop6u66jrp03lh5mfa8357o74zeeff36akf524hheulqfpcj0y666a4u6i8934nzvj03a5ky7o8a8sgbesenzyanfr2112cdhgtrnfun4tl383pwzxnwksba6hm8x3ocpjxo8lyfib1249d8f5wr46hzddy4syk7b4age5qdk3j7zfzlbist7frtccuy4zp2saml9m4ce71ytws3ak25n88uzlh1yugcx617g9h8vpwxm3rdyb67417rl09fmxx5rq3pitwml30r6w0v0e9i7nir3e9j9yh338veth1qor9f8ck4gz2db20suj4ktgpsakz47dx3gk8fvjb1vq2nnz75qsvizmnti7yia3nuuj56snph7f7s9s592bm04g5fycoepdxc1ccffswrmf1ro0dpbe7qhngfdajk265rw5pjdny4z4khqolej7nzahqeonba0x51bquewrhn4acxjwcpzyji72ggz57kpn2uuqkghrlgkehjajxv6ykqsb2o2hq4v5jnmbh5w4yneo2hpybi19vfk4lxjeritkg8qdsog217sdae4b8iui57kr1722db10gy2228l74y2of8nz62cjb7r0s2jw8q52d1m6vaosts8ls10ilyj7ipizpzq8g4qknfed32a6nucvcv1uh686htcsyplydyf1ccvhu3xaukxbpj92juh1twhrbogfg8k5k3i4i9t9o0rrc2y20frb6t7olrc2',
                mime: 'p1agi7b4xby83uc935fm15z33edmdbnkr69juiitchohsze0l9',
                extension: 'ktd7j2os2jldf2cuw6r8qls22kz0jet2f3i2iclwikqt8ddad4',
                size: 3405741919,
                width: 690239,
                height: 454503,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: '5hn7i4rmhgocok8w018w34dg7wzx832f2jchlr33fw47year4ozr7dcrtoj920l2vu6gwvki9nyc4qkw5q96178wwdpwlvobo24icfw91dv7rxo2j9bpte4zokoyhqv73kpnhlefnij307y5h4gf4jvtu0ydqkg4m081sx721ggg2mk2yohbxdzd48fhhccp29m95zocjapw63n53dwsqns8yjz3wha597nuw1khng99qj83xy0vz8xlzn4s15n',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'ul7368ms7hi7u4ipiwat4gn38bh66hdujxkxvaj914qwv0ve23wq67m8p0qql2r2anxopmcgqez',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 280326,
                alt: '0d4n5254l6hr5y43gl9ezz9xoho8ssz3zwb8a923xuodw5smu8mqi05t7mwc2c9nqbrg7858mburg5jgn34kyuonm8exy7ligaaq5ac73csih3btim7wf4opq7vx8wmif4bvqpc7a4i0bgvy48qoxucmgdh2tgmm2zlgj5h3010v7st8kijeqbd1n910srwk0u96lvxyghvhma0kkhcrpacrfc5794usw196sj567ti62zvbyjad95urfelx0n9',
                title: 'm9ild47tflt3zmfoditf6qfpfarcczavor8edy9uklm79st3c1xlkcxnfk5muvnvlj31ve40ywa3692qc6yut787grcl9rzn7ek9zqsa9i3l3qj3o5tsjy0hhsy8xyh4fn3ztw2yibmcn6970atln22v02fsj9t3vbwcq3rzfs5nslt43g040k9qx9o1yjvvw4kq5m66mzu2llzlt6xd8z94j0m30nvvhnnffsnm1hhr5rmdk6mt5phnsctypbj',
                description: 'Est et temporibus rem vel nam qui delectus facere. Nulla blanditiis eveniet fugit ullam. Dolorum rerum natus qui id quos architecto suscipit. Provident non esse quia enim repellendus nihil et aut.',
                excerpt: 'Aut quis sit cupiditate. Est incidunt nesciunt totam labore magni omnis. Quo illum officia.',
                name: 'a9vpb0fjga3xmlhc8bgel11hno7ygamprceqibt6x62ywn3rvhq0xqjs23c4f1v2ecexei1ksimyg8cdx3b40w1u6r77qyf33rxh09m18ziiiivkwursim147zjlafdti44p4w3s2k5t6w9mi9eqoyl0usgboiss1twy9f53l9tj7t5lsojnx2ldw36ays5o23n34e94cx8a26u7hcamwvugmglye2g0pl5v2sdnvju1jlzfr18spkdrqo4l7pz',
                pathname: 'jxkjscxht1wob1wj8hvt84fmwphudnlf46vqstczysfj1e2xh7qxchipvcyuok0x4qoq6d7znbd50w50iwf56zsz40a1qzv79rz3pz6g7dir813fwmpmex607z05ddctnex9201yhe84u3zhjn7am8x1ah2hyyaxco6pxykg5pm4944e1cgt8qqm87l0x9q9c5ytsfc42pb49l58xwwmg5p04has186dkey0pa32n9nhgroqq2wwk6izqhz1la9inhjiu8ugx6az0udzi1pfxrfdfbn1q2we2p92kxt1rg44t926u2kr5qgvw24pn8x6d54z9kkbuvyxj0tqx4jdon6701pw9negdf3ihwvsd6m8y2mbixgcyruxdj3lvnb8buu9b25mlvlyysmb83mbx3q3y0xodgijghlj4hlipluen092iyg97pv002p9udfhnp554nnwtpcicn5817d2surhm4qkqreixncb1c3k7qfc3svhy688kg4kvlhq17dxik46wph2wzs6taetm6esyxrdupo9pvqvbehlxkm4wy3ysy3d8f9hi8x613qoteaxwpn9dl264w5162jw02fp7e729r6zu2tg4qrr0s9uepg0z49jck1cjqqkfo5j1kvcj742lvkht7hqzfu0v4cedxln5aejqvgst7k8embs3ume5mfur9ja83cm410bqan8qaorgn8dia3a09bl8e7jus7a2xb46evlntp1vpm0o6b42lon8hgfghnhz49nwqp4neamu8paqa53f638cf5vr3l9o2bcistdjchswfw3wgp56rkum2xvly87cs9gzm0p961smh5dx6byx7sa4ary1h0vkvvyo92f8zbyt3cxkc0gsfupqcm5a6uhj6vf2c3na7otvaw52449ksx0w69na5gul8s5ig8nv4axt0yek73o8rc9thop61177l6153vx1bqrer3j4pp0xackh1o9g6yrzoh46w5yaxahe5ufmltg87do8tlf0w1glydlgw1y',
                filename: 'bm1b9hrpu50125u6pchxg8nibrw4grc05l8jao3o4tn3gx7nrfyvr54gu8fnifhvh9jg8y56qhbigtb76n53imdpyowlu5ew0p2uxe0it6m4mm4t2bpaxd3jwtku6e61bvhskuut367iosegouxg1otyk0784bcgnn4y2508hedlymq138u3khd1ogtqh4i8inmofr0gglmkx96yurn9yqkk6h753qlezc0j69dd1bzpjqan3qdxl9j6m2jhtw4',
                url: 'm2inae1zuxptlvvgsejyfgnn82oenf6qzdchhrj7hpac6tvdnmlogfe11ew43ttd6myi8iw581je927f0gmlu82xlft3hlql4ctp8miw0kvw1mi229mw14b51nmrledlpp8zxyq4espnlv8y71sehs17gz4utw06d5byym3mxiykhg5q94bkt2w5uo8nnp15o0a1eprz2d3xeoffy4w8srh23aan5wf4krz1nun3cgz3x6of722qtz6424nuugitysk3ma1wqqqjwjra9d6izxkvfg6e6ogd5crmen8dpoeczik6ov5r6k8qh676qau1gyg5t9l25p5h1u5gnv1kyfti1yhow4otnvd2cnvalnsnl0143uhiopf2xcufbkc99yf9ps55u9qmq24q31m9gfgfxjmohe8njnrgyr9q1hl8j4xv8yf73otml2rhpsden4wnnvoog1allgv5qxluwzc2ciarryxcpld76oe6sqa0lzanvk9at1hhmyutl05oivcodylc28nmkrvpqdxquvaz2kbj0g7e8y7usasej1pxbbma8seversz5pp8dmm4r6ojw71kkmqxamvkk1wyxk4mql4egzm83pp7qt2spwibjvqp4tju2sq7riw6lqp5z9z6yvskqripa9v1acte32ftmb8a24brzyylrx9sf5xx2ot0g0j3ql35moreawuwaix4tgj8ucst357iwfxmlq2m1qa0q11ayycbtcwbuwtmiosq2i3pfeq0yi8r9f31cygtw6047qw380rg000bl3igw47ndn099ffuchhpjqiat37rm4a849qh4uxtddnj7aubg72g19au7s18v8b53vxynio1tnjkmsscnuspse89akgduagytwby9lwxidhha1xol35ynmlij48m119u11yk04uskbbwuanpv6atqveylf29xwgj9iqt9kxq0pqfze5ipnfdqdvrc70d65xuo3hry95n1dsvs0c7ty8x7mhb8szzw1lc1rqd9c0s7xdb',
                mime: 'p9ag8fwqkf7k90nr1cw54wzldfusr13t8tcwut815g25ywyjfo',
                extension: 'fmu7j9lb9nbpto9ntmg07cta51k5menuthkga4g1q7rqd33em2',
                size: 2295112616,
                width: 789024,
                height: 828900,
                libraryId: 'hb546pu520ikgc2ryldqqxt8rlubq0whjbo3g',
                libraryFilename: '7uj3vv66kdzhixugal1f769kviy65hv3frf2vn8regejmn38h78g8lnf4kvm64g1n1uk0zp9ojl54zb1mvmh2dvxxwk82sofawla288pwwjq0rn0a0ja7o3cr7v385so891zi7uc6dn2y5ra8jnyxkz3wswnv0472lst9cipa32n4e9so0u1w9pw1tnf33zx0d3gevp8kks9o5uch0y2020y9475ek15ps6zywh1w0i3l1xtgzi3vr2fvm64ysd',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAttachableModel is too large, has a maximum length of 75`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'b0ir9sai2v996jxpqdbpidj83yl63bzr62auc6rbki91hm0vbq90v72u7pbhlkkj61u5h6ycovkf',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 379613,
                alt: '5yxhkj3ryuniyopf60ananly3amxdrbigaiewg1gyo5wvk72ayuos3gx9uz45x2hrhvvy764z0j1v7oehglk8ck0g5ntfrw3cls0b5y6hr1zedocp60297t63p2twmdx84mucsffp2hx7100u3kfsc4gh0pul80b81vpitiki134ywshct208mgbeo2sytpndy6tgy527t1htvywqmoml7fbkvl9zx09eia9kr8le35a4ikbt36jijn6u1mlzmn',
                title: '1ad32gef6w59uke5i3m786kgkansidzx4fsh9hfue5fbhdwavz7jhaqi0hf3435kidy18e1dizmrxk6rpo7ogzrzwu753f9o8me1ucfkin23l1a8rla6xt0tiify9cj89uehqimmr5z6ypz5zu70zmd4vq14si3wwibrjfro4bd2rqy74115gbkmyqi6vz9zgq96t6p50ynww62mbhchscwdj7vja0c72mqkozftauaq0fobx8lw50yuzngo8nw',
                description: 'Voluptas quae perferendis voluptatum. Et rerum expedita at cupiditate. Iusto non possimus aut soluta iure.',
                excerpt: 'Sunt numquam aut atque ipsa velit ut quia quam. Inventore eaque fugit dicta sunt nesciunt dolorem eius temporibus qui. Magnam et dicta est quis sunt. Eum nihil rerum autem laudantium neque exercitationem asperiores natus ut. Accusamus sunt architecto velit.',
                name: 'uitv2xhm42f0ign18hb3b2swp5w9cbeg7nmmk4iaoml9rj2z8ca11rzqsdz00yufx82sp5gv1vif2wg7jawo505jjufdgnn0nf8vp9z46wz2pzufbw3vl0yfgyzvymepxn0c7lypamy98lqhcrfbmqgyn2q2ymempnlv7sj7m12jp579hq9qg992liyv12ssifa09peookzkuedi1ptf0y6qz0cvnqc0rti5sc55rzpchvsnjuk69wvv7mbkrdt',
                pathname: 'tx0kx9zjgf6l6e5su7fa6kswevacbb9b9kxxefrj72vd2lq4qlsuxvy8ve0qjgh35giwj9likjjqxwx1dvdbxx25c79wv1fuetabg3qc2z9ybic9yhjibl63su33k51xt5dyf99m12fb5anxztyyaqutnlinuwssr3mkk74shd7rhm4oitg0l53lqnubbkbyzihou1f37u9bxp5xyzec4b01qms98gumw8qtqh4c6ytiunhcjahm00hz0vo6yr7hotl5druts1mew2yadpjbmr3bv4z45okkf2bfat582nrx73b0e1g55h5s48jfuywcze4j1b2kw6y4ppzixn4n9mr3skws2eb8c9amz3uk7p1lsdir2rasw5uacpmrethb74uknuy6s6xmenh9kmm0u8fdz61go767iabtabbk58gi5dulloechraxtih9kgexlgm3b33658cjnf3w3vpslta8a8btc0qx2r7p59disvqfzigtpe6yv4rmjq0928vwf4cl9eei27nbn9ll8po3vue5se0yym8dzjvkvr9fabjvwgt1yndo0g7805l54os033e083p86gjm1x4fizfardtceefcqolijilcdq9n9jsplacjqf0pes53dxglja8p4qb9wmsf2rcyi5nf9qjpxp5m69v9q8wuopg8enfmy3n580dl5rfaqtoieu0szsmfyqerwa373f1nu3m1jwxcbecaizkqauxoj8ke86rlxzjpxxuq0flgfwevpdr2tjeobgfk1hxu8nfjmwgayda13o332e84840uwpgcg64t8iodpvgzzur7xgkw25z0wewz5txwobxigii2v2hqth64ohaz9yron950c218ihxkzn8v9pbcz8fppqu37wsexv6k10wl2jjar2du6fmgdri75ycdjiifjbtfbsj8ge4n40auecm1jrdvzkiuek6dfkhv4tol17y5f16j6cx39rssejkskqmruh4iixkkdp7g3itd2sw7clvidet49ujsised',
                filename: 'onec68v7u2qqu8qbdbeq6o112qiwb5lk0njssocqt8w4bie8etth324njzviodpmbv2g315oa673dz6vzfmcm0dgvsycgeeqphqfz8cia8oxrnu3j3kbeatbd9ra5vo6svlmgowgjeerjeintumlt06047km1qp5zudplnhqmbyqb8playeb2rv3t78lqj5dhr7bnynh0dk7ymrckcjk8fhnl1ny4q93eou1bg6n5ykweewexr2j72m9h6swl5a',
                url: 'vxqkygsc3bzd4v4y03lrw8o3rzpxbxom37tlfzk3dhwn9jpxyd3s9c4erd5zm0utb5za94qlftjeoos7one2tt8jozya1tsyx1ac02i4gyp4rv0c7ag14fgrwnm7ttu03tvaix6b6rquggygl71sqhx7mt9a9ew5togaiddkusyrdds2cjd1dh9nj5wpmnl4w12lrl6y1g7q84ym4d1fcce5ontw3eskis74pj8o1f2avpb113vfonfso0nx8jlrit59wb4jllw0n5ba0ehcb9vaz31xkiogtoc8cb07omjksfgrahio1fygv6nsnj0d9bemdye262eqgl2j68rp0rw8918ynmxivheso24v19ic0d4yd8kvuc16qz2xykwssev0rih4clqhckes01dvhmxcd739gw6p7dp05vfu58l08lga4girchz6859o3xa7uqr1j3rua6jhixfwck9u2qozpf7lns3itaz4xlq1sbvwobvzis7e5jm3oj4bogswck98q4odky9rop0dtsr4f4l1rt1hrh7ezi4dl4yl9b5x9oldcmdqoe23tdpb341vuu36imi460nz6z1dk74e93l0icelh9snio8vas006h1uj9zfihou5fx9numoip44q70oq62hanl6yv3d1kbs0qkm7ty6eeh4rsa646y2hak3sl3riyncoefwhfc1rqry5gib2v21cf88aiwd5xqsat01me47jqz55hx41xmy7jpez6e47qap4roaqm8853yb3z36frukhwmtrjay0xe5t49ybfi2xczjysxnvd4qd12ybekzr785ozsf0vk8uzoa8mc5lxlbvp84lrf4k8tfozsn75vbzewzdk39mp8skesvmffsfubvgq4uptk4jgssxs1cpp6x45rgrblgmtr10kimmt5lxbwkw4qcipqnwcbs6siwotdxfo6elt4r7huytb6oo6y20mz19uhnbll1r3gm4hdqdotkkq16v035kaiw73bmds2u9cu2o1ij66tc',
                mime: 'dcuui5wrarjx55lxr54sgd9mcewi12z286le3c2kf8czmd82ix',
                extension: '8rnuzjzycweiy0a9duodu7anmo1syjtryspiw31hsyk2fgfgt8',
                size: 6693916817,
                width: 776143,
                height: 326015,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'r522jy48pvp5c1ongyigpazhflp9l3957w33clmlm8bswl10l4eoikxw8xqwao7fboib1gb7c6brdlk4jluehr6oymcqw49h5ylts7bxwspdizbqibhi8e0wdwxoyjphcykkdt6sxl7y01dhcbb7o4c8ayonj818193c7pq6b530wp860aatyteh4m7qzmzhg3bc2y70xfev399kws5x1ljnhn19qri1qjqfrz1emlvv7v8pi780nq57jivaloj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAttachableModel is too large, has a maximum length of 75');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSort is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'xqqgvxstxxnvqc3kgvibtvwsqlcvtp48cu80vetyh6xyteiwauuicogf5duu6ftpeopbe8pifgq',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 6692386,
                alt: 's8lq1wfikjhz5rew5z22puud4lm7j88m47f2t747nevlvtx4m5tb3qyblemajzrb1n5juvsqcrojdlpcvqy6efgs83ei6max0vwhj6ktgu6hd9kqgrs2feq15psi0th75ghi6eyode443fvpp6rzv7puxsbnj256mbwbsjlze11cvbz0nrufw31jxbdaqgcrixebq5fnoo1sa1f3i1ne8ihw3lg18tudqgwv9frxem5s5ivh9ymw8ztnc4d2t47',
                title: 'ff0ka1qjj6o2f55hvd3j9i6kud5b28phj0w74kikrb0gtddnxsogxics860gxm6btscco94dewjrbrvl6zpkaerv1svj3pbm4j7uoj4kta4gzzhnyczq5z0uxghqizm865rjpc0iyfa8i71v6gj4qgbtvkyixuahs4uhcdc1u6fv8e8k1sa4zemz7yl0t5gbxewfixg19v3t1tujm0r7g0bj5mfbtyq4hpifanj2vt1t3zxnw2kxnk2g4sucf9x',
                description: 'Ea dolore repellendus doloribus ut molestias rerum aut. Enim eius aperiam maxime. Aliquam quos sint sit omnis ad et eos.',
                excerpt: 'Illum aut in voluptatem aut fuga qui voluptas aut. Nemo ut in nihil nulla sint aut reiciendis et molestiae. Consectetur repudiandae laboriosam non ipsa repellendus nisi velit fuga soluta. Autem fuga alias temporibus ratione quia alias. Voluptas est possimus ipsum accusantium dolore laboriosam. Sed dolore numquam.',
                name: 's5sml0tq2wiyoa7l89xo0cwzdvqm5h1q8ruy7jgeiwlbmbjmf5k33et38o50f97vpxr0dtdc27hj712grv0edj5wmusl1whgbvmt8vg0km6stbe5hs89ugh5kgrjf1umxd5fytomimgg8utt8hl00mcidy2r3vnyuqgl161jwzofkjdx75nms2ssgwg56lw4zahq9r7wuu87fmfiyvarjtitt53ybmehm3h2axhkb1mfddnuzwz27ig5hi6zfkx',
                pathname: '15wqmcynt7y8hz3zbzsmyibwq5mpv68zi24fz69b2nxgc7vmeo4ptblrbx84jo8jt0r94zny0xr3saze2x0jn5cay2ufsxo2co71ghu9dpq8rpek7z6z44j5vc5kcqkemd9zdc5yb0wvleor4rg9ln5lzjz1b5k2jnv2vl8ja12s1ncbkp0ukb4qw88k40zyceen8w3xr9m95ev7tgyr7vxenffdenpsai8rtzc3m4tsidjzfbm69ztndbd8dtviw0j9e9825il091xogvrc5s2mekl30980ektu9328eu4al6cfls176h7ajblgajped1o6t7u79ipr1t1k1zvq47bmshwt9srxnq774lmw9mh5cevb912f02vpmcidkxzmurts0m7ly3hi1dgj7ym2x3qii4mntux8ud9y9n2um4l42yqho0g20516p9t2wafcli8grgxmhsp4iktnclu97cfsykhhtif84mvzfwzbf4ivuiaf2pv07m5xt3p7bghk467w41yisgziab612rjofn7wr07ox6mqfpx3uvor9nuusbdegf6wlg074y0vsu1n1k4wiiygho4aom2rz5sz7g4difrjqjh86rjefogulo3tigwd97aieb9ofyb4p64cuc4baofafixabc2e5hpsgasocgopxtvu7kqbyanszgwuvm480c4oc82pe36f4jsc1sd6mfm63ek0zakav8lyf84chavyxssfe85afh3i0wfyf8wupx9ggayczu7n0xci43r4dzwxb6ivez8a8k0rb56z4y6106op7codia55fg07ob7giadzvgklrp92lklztoduncpzly3woxrt4ckde0zupqu7stu0tn8gigl7ibfy8pm8mkasz1q0d5aiik7maru7rvlm5xl7foofsvvc6u2egfpd5rnly7o0cxe2w5683k7z8br94n9mhvolg9y46mv8q8y70c4fznflxs2y9e0o4p2o3xao4a243zgsve382aw337j88esg6rdeal55',
                filename: 'pc9l31rg7g66h24c1hp81nyjarekv86ldlrcbkwxtfoo7svwoythawlnm4ovrvlyr487z9xxm4il9n2vtru8c3rle0y2rfiael1its1xdhzhxe0jn56heix9a4o5mq9uvu4q4mx6ym3nopnjiay91xvsbtz7z1d5f2ijdxykztcyasqmxjk3kcjcxfbzchxvjz0ip7w7s9gvz462xuhjue2xie4o0wra4t8999836dnj4igkh84h9ixf7a1mhtw',
                url: 'volilydal0memhmukpkhysqtukkiko101k2lo8zwroaxilvx11w1mx0qmpeqd0vrjq89b4qzna1n7e1y5gswl9277zbs9is3gqvmwllj6rig8b79jahimpu05lnrfu0a6tu7byeqaw3912677zpihp696qoxljepshp5ffkbrltooqyi9vdzpxyj8ax3zyxgeregtdonu0f8c9fj6qm01pcbz5c6lhrzlgasirhti27murbeuapy0a3z7ga7pjsda08xr18hlr4o4vktwxpg1t32gbfs7225h0dpd581yf3n8owhbjzsemc20upuuelf9hw2q8n19g58vx8yw51jg944gdxrk30wdjefs0sdpc1qzlvwsmbiz130vcfhi3ibqgt4869yqlgoo3cwtfwe7uo6a1s8xbp4qwx88jprz21aibsyokao2qnhn9ilw934dl0xhahuqzuipu396kk585hvu0r0l9ibglcjpa40f6afqjngp8g24p6lspcehzws330rhn9jadommjy8axf6pbkysfzzvknm49cg16tp5g8dvzduxo08wqop25f9u01f9cxf5m75qgrx4sc3i4s3er99xpr7yu5ztisz4jl4hecifetnyxybwxdv9jvqn5z3jh9kr38kl84bdex83dbth9zkswwi4894a1mot1yy46kosnbimdciguh96djy3nrqwnkinusk9f8xkj9qqgu4gs0jbhlkr0wbs7de785xvcf9gaht06vxeixozxv6ifc7o7d6tdgkpr2ldgv3xwgpnv10o9vh45u0hyv9u5wang9vxbtpkt74s4qx25symewi5ve4qahnpkwppzkvij5bfrzcq4vkxznpc4arquxietwncisbjjlefr5t89e0bp52p9gw0d2g0ukguatg1ftybxdumhyfpf4ns10ys22miff3k34xy5s1qc6dl2fnbgv17gpjle8x523se83oc964slfs26m21r7ue1dsu3xvwh5j96njqzyvf6fmyj1yqpcx',
                mime: '9rnudp88pizbb0ftunsfwa3yg3ekh2dh8nf1bylr9fm4ek2imf',
                extension: '4jqzel0xcd0p4l23a7bwminxqpcpmmtie7fdogorvptgzk6ox9',
                size: 9890660408,
                width: 216209,
                height: 159480,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'g5mprii03p9x48wxed5xgyxw754w2v7z4khfph4iu0pc4u1jej24zu9p6gphu9menoz3n3saepniw5suehno9l59nr2nub28vw556dnuvumflmjatn6m4wddg0z4wed1cw48mx6olg7xlizl0mtcrlld65jyjbudx4kgwh69gsoo9tzgb2617k5jalq4khfdnjl4mxa16oejac2gjteyp0megi2ce4amwputwplxv0khvgm2tckgjfzv1zxvfsr',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSort is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentAlt is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '5flfvf2yl8nl7weq8xok6sih6br5r2faw5ts2gkadaev998j3pnbzjqs27lcxnqdf8jheqboxkn',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 988450,
                alt: 'api2k5u5go786r76co5yqoiyeiegt5z5h1kbhzdlr585pvt4hy5v8kyfwi36znzvcg5vttjgc9ijbu8pkhmuuk54cixuf0gvslhpr5bcy57oe8vejkdbbhp31y708uq0qcix485dgd2jghq57bbejoielxkr8vzqffe9soae5mn7ud3pmnyhe0f2ulxikdjwf9yxmjww1mkhhhqcw1cph4noxjh1y1zj44kl7um9wcnp8hyxl97mlr4s2ib288g4',
                title: 'tltzwtpzl24o5dr2kmo8801bezq5awpkfgnmopzpsregy8fohihc1l84n2jzyoar45cym0xab8shs39izel6n3w7j1oxqe05jg7hqh0nwjfyttikzxaz3s71etkhk7kx59gue3hc25vq1hkzo4g2lo8p1h2bqvfp5xbx55944ntbbd7c4bw63wscwl6xj5ztpzz4mzmpa721ikeic7vbjyad2mevfl7vpjb16lyzidc36atpgfb32w9d8k375pe',
                description: 'Veniam voluptatem alias. Enim tempore eum. Porro est et quisquam quaerat odio dolorem facilis debitis.',
                excerpt: 'Incidunt laudantium vitae recusandae et. Odio unde non ad ab. Et rerum commodi voluptas est ut rerum eaque est. Dolor iste maiores quis suscipit et. Dolorum autem sint consequatur velit.',
                name: 'kjkie956qqh5joxmqhhsozdbwk0hmcgxukbcb1mvj02mynoz63lxqqv8myo00px1e52yie0r7j5tommnh1hk7d8c3djvr2w8nwp4f66x9ktsiyu5lxljisormy0ut1uwdnxrcze38ro6dvfha4kjch0f92tuwexf7ydqmo887pmzol9eyuqfmrgd2lg1liy5umfcv6fksuu8wsohrm5p9d40ceibmrtkx32tmuadhm45creecjpu665hikqsfkm',
                pathname: 'fivqj96ij8qk9072nfmn4nycjcf9qfmnb3v86lr0vmvisptrojvtqwso1c12j6yu3pn5mooqwgneb62fu6w5g34iy4bp6ib2h400j5dh9di4s0pshdd2nqnpk3eeptn46e772tboi5rm65vq05xxip11c1rmfaw94xtitncx5z4pdbdqn6eyamks8q2175l8hiq1xotulw6vjeqoappiesbiselq6gb4opo6aqrgua3ed1kpfqwvr3mrgws4q94cidxtfuekwfdi6cavb1lp8lvxzxvcpeuatks40sx7vbwimx61m4mruzcf5avwkwnrvxtagz1hg3pmh8uvjsqdqqrvn2dwzqvc6ymsg4wkk2r93ejxxcm1o4q2tz442he8y9f9otp4y954knxag8fr758tfhc7m43tu3dbd0xc1uvmfr9is65o7v2yzev755y1nrf2rhkcveemx9jr8kkjjjnnlc84vifli2ymg6lj0i860qtwvvq7b5n747qgioqglue6e9gn73vmmbcw0qu1owqsqmnvklnkd3ey1pq800hfwimt6lt5zpdit3h1c2u83u6rmo55xf1zyp7q5ce7f0i45jwy4bf4qrq4lr3lkd0mp1dz9a3f5mcfnfbbakrx27o8gg6vrwgpkfge0lhtdinj70oedkslomo0zib5k6qxmr7rthz1gpusa5x6lweaxfiz0q7do38kq76sbpfuexjxhhvd02u0qdgxn66zu6aetg6974927kstcipvo4mic289sxbaadjjzs0x3nyae4zsnz3fwakz3wfu5qgoiwbwpmeouqe9r1xss0wyukjyey8ibty000r8vtysmdwu822rvh3zoprkwfu3heg7b1yqxog4ofob2pskagsqxwofi5d4ogba0nc2ki6b742zwku0anlzc73aoco27aiqg6bk0hk6rc5fngyr9nkxc332rpl888sto720m9t5y2i95w3ibgmbc198714zrj2pwa2jxjee2doerannd2pxfh8f',
                filename: 'srihqoqm0zarglf226t2mbufp9nhuv4ist3d29piw3v96nph98ahl95s82lx5f0pl08hh2iplqawxfmaqn1t5dlwlaxxrffs52rwrz9rxhljdv1e83xb4i9glnygve2fepitg9w0d8o18z1c6jou78qwmsdr34clp2ilj458qlqmb9pljudic0hrr1tfgwpoo0aosbcnxm8592tvfbx0bzfop7mfxa4fhbgxxt8f9rqjzwckz8vwy0iw5ea4s20',
                url: '45kxw5vxjwtdf3r8pwjxwlyosm9idmrysn6ykdbnz2yx9pxuwz1u7v0f1qwmo6iao19eraj4ip8247td16a0trni0ok7j8fjbf2kvab68v4bk15ve6wnhf1zfy0ylplw81flgqcc0nm4jqzesx1sr6j10q6gy309r9dmnx6vvi454jbrdmsia111tcutdpvvveppjwte9lkz0fydssp2a56p5aj0fsw8p9orkirpaz9itbfftq700ulvoxhvb6hvbkw8wtdociuvdia8gqplvjrkw8dma7sk9yjdv58sxl0f3gdm927lq9rdcsqs9l3fpbnfvfdqtabpf3ykhthsknoyo4jz3kn3ii5eyjzwhbmw1gec56k4gdvwi8n3qzxml618vyhy545txwqr3py9nmvcbwjtiksq4gcdwglrrjj5d2gdt3u5eynp62h61cprzlhkwp9vjcdaaayeiq78ctsddb81hiwpzbtyawiqa2ltxvtej2djf687odlgm5hzy14wp9wcex5rp10r2r5iqnrvffdevgx3qox3iltavaliiww2vv8zvzj1med3ug4wmbpmmw1fwfkit6fyjuy3pc1pktsib9m0zl1klizqwyanqjb1me6yb7ahki2iq33c0k1ex7yf4yccwsfmhnvctiydw573k3lsg95r8xcym9i4lppayc73b2ysuaqc69xba3yceqgzmmsykws7jw0niwq7iaone2xnnf58jj9mvnst4qq7mvt04t7qzozhb3gpka5d6wqtyt84zzsjkms7p3nfe095c285x3pjzae9d9o7sxqikj00aty098idmxeztjkrg3f9f0zdy0fb0nwuyl89cpszn0n9ac0bulsu5asgnuq4xnu9btefliltkcxdn6m103j4dlpsous4vkf16d21deobd8op9u5jgx5pz2vqp7lncn6gtqami9wstgflfzrmkipumkqg86vf48j17orozg1msw0wcert7v9uywp6exij50yy0v9k3rfa9ify',
                mime: '5mcc842u787df433tk01sd1072d9n5qxz228kh0j1xgjrqttp0',
                extension: 'b5ur1gy96xn7ywdvr06cool60u47t6vazl3czaadpmu20b3tra',
                size: 4194644739,
                width: 436195,
                height: 913400,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'q9lhbnpou9cbq1ldovni6cmq91xew4nd5saqtadxzu4zd2svsrqhrtj401u88impvpjhkoq8elte7kyw0wgg8us88xe3opyxz55c29zdq03fc4odh5pg1ydfq86jkyowwjo0jikfwultbqxh8ldpnfjimng3vxwzfg8j3uxlp6pd74vtxja71lyi75sliebeolac8wvkq0eb8qtl70ez0j6nu9ccqskspxncv4k8nkddovenmo6hcialaqaz1ov',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentAlt is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentTitle is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'fms8jgu7laj5n2qkran7zsgfmqnhq0gxzz2nhr13nzek52mpbxvr38j0ptv7g3tn2fr0qqo64js',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 426155,
                alt: '3kj0oakn6vfnzd3nkgaeudjosag8ojn3mlsoqv2opkedcrvyqmirxivtww5zq4x1obhj0h3i0ar3g82h2ecoyuycn0trbej7o895kjwrdadoh79mnt83so2aur1qwviocayoi6y9ej5rvq03llawp79tcx13f8nys3e198t2fqopgkfsdc6cighj1c85ie6ij3y2gwyj9s4hz773y2knzonkqd5hmqexjgr3bkszircdtax66piwg02zctamm09',
                title: 'xk20lpggsxetmi4nr1b3y0m8tz0ki92wrxkpjh3mybqh4e9mra8rndcirfxlcjkf89hnwj5mp0il23cnfokykthwrapq9a6aqr8b38k3eywle0wgsmcox3g1mw3k18o35vzuvglfgg311cawwpelzor7xzwv5etmub5lp0hc33xlao36sy6iuh7axbxltabewbt4ebjeius6h39phcgb24kur4kf7vf5z3nip6snjc38ofivgrqtuyc5x9pv33gs',
                description: 'Quae quia tempore quia provident aperiam nihil placeat explicabo omnis. Et qui molestiae et ea cupiditate quasi illum consequatur. Molestiae et labore enim quis aut. Ullam animi ut et ut facilis pariatur eos et aut. Itaque animi consequuntur molestiae placeat unde velit labore dolor non.',
                excerpt: 'Aut praesentium voluptatibus cum quasi laudantium nihil labore quisquam. Quasi corrupti est tenetur aliquam id animi ad. Distinctio error maiores facere vitae quis sed. Vel suscipit provident ut. Dolores eveniet asperiores consequatur expedita architecto nobis velit porro.',
                name: '0ric4h9v6g2f9jhylnoy7kzkevn3isuaect0ektvy5qxj3nyml7aok0bv1bwjls1aj0sxhtwphizmzak6cimbngkrz08setg3oawb2wps12lgw08d56j9z0xh19gnfn4x2pq2ap2l0j8p76zouhqlpis57fqhekubqh1cy3uz27ca3ky9a3pqlvr1arfhd0jr8xj9u0mpuki2ysfgn19xhvxnkdm8zk7lwdz7nlretjy62thwdm9wdihgrxysgg',
                pathname: 'stff3wiiehzspstaoxdh9ugida9xzgyri9p9zvkaep2v9pegxl44wy3g2uw5gyf780pbslkmohqsr472k7alhofe0m97rz3a98ebccv3vf9iac4wj5k0jpi85y8vixi38ucqap0myvmnbedqt9s9qz8qk3l57o35w0lg8555hnphozidhvl1zfj2vfrmeqadp7wgo5fdi03r1wcqphofhd1lhf9866o2knxbi7ho5kb27aaz0eao1m6f7gy5x0c1ya72cipya5qmkoptbqkx598v9cznrssspooeik2qqz1d4li30vui4pp9wynrxqa2vcl10yw66hyig1l38mz33o6o51un9yziz1gbcszrzxiwezughy66x6tggkvnitlwaihwt853jc3d9cjnb276h1lpjlvyaqxldc2eygb2cfdulc3sj5666fz9ug1g2tw9r36hxszbtm1vq71v7zh3ep6tivjasr4jadx5so4oasxq5tha4cjp9fmrj8yft7tcrhwma7m0gp0vx8zd4us8ca1njj6obub954sdc9xl3l5nfbelqmj9edsk0817yg1s1swp3n6txji2h1b0mxsmahpes5ke8ssf17e8jvxaczfl041qvvp7xyrtyqge28lpkz5hq2qxxu3jcv6asp7dqmpbbcb9pxrbb5u8fbqjj1r4d4eh99u29b5v5n77dicsl6nem7d0yzghyq561a2v0lh6w2tfnhvfewwg6uemj5ig2drq45o6n9806tm3onywo3c4yie91txfr8hekp0z3sr9fxkqs840hoxlv0i04gumhp1btux5vh5qpqz5cd1l61k0bf4j76dcjhlwz8t4z34fn0wkaw0l3t4xjbmzqac5ms9gznaled5nud6g1t2qz07rwzkvlglwyywtcghod08njw5xizpv97r70ebkrtsvu58mcs0g93tyyaq9yy5eyfbc69ku3lhp1fr4o3sx6nl1yjjp8tvpik7ku4h2na0robx72zgbx7mk0o0ws9ky',
                filename: '8rvwcexz1ycldlm27os9qe3pteqip3qo1bad3tja53tlozwhip2mwci5emcgyuthedi14etsckpbwcrw3xq1ktl0947e1qd96rma7okaj7ur3y8l1isrd0uqka2e8x1u3ih4q9x7p75rcyz2k6d0j47h4zgcd4rlxpiku3d8vsjzgobwesuv1mvd9xp751rj7u3ja5rxckd8z0ni7k1k6mha2g338ib2ww5pdwrh4f0ecx7ho0q02aqjgl5f02w',
                url: '1nfolfq4jetx31emocggy86ol0uhh562v3zzdhwx1epnw6kmzelyk5qg1r5q0hyzfs2ubrrxzbx9iwh30qvhoa2ubx24uqxvv8dydw52enbulv27frrxlr4t5nizl19a28xj3m0nqk0zk6pijju8592bmyyzxbpv0b3dtd3n1vkwmatn32q9wq86hzpchj546bbrpe5l6rarcb9qfxyxv9utugyrc9iskpmeh106i9wm9htg45qcnnrn1av4o0gq1fu4z78a45snghpf0jrdot82wpas4zpmx3q8mcg54ah389td2jxdkkcje04v0vrow54c2kl5ecmkjs3m0jgi9922tf2chqe4adfmccf1efvwqkaspmk1sy7behermes9ti2p2z405sc3pcfa4my4hhr5k7tk39joby6okuymyvhydalntxfdlvob2z6sayxf0m13wqijzhmrt731dy47p83sysf8nqsezn98dqdz7uewj89xssz7v3xlem9lh16uj4jjw1jo6i4t3armxs0vj3fe5xvhf4jvdnfre3d3li8qqtdej4vk73htek722mgvzc9o1fauwoaa41tyz0bxuonh98cwenqw5bxhj86kw519o6m2nv72aunr8sskbrgjp9kb1zznoy75bn7dx5ltcb89kfhkcku5b66mwebdlmmc9vcjmuphh3m3prq6ywcb5du5frpgygdx4p2ppoqjhbnqklibl5q1t32jq7yy19yyrs9w1x8880flrvb3704206kgh8bf7dwcpzs4gq15ouosmkjcs3ny81vw7dpr1vr12wc87w4hbpo1wjscsysmmk5ah1amgvhpdhmixgenvkra85uwz5r8e420kin4gp20lki62ylp33lw7yw1borho9kpp0jcv9ehi724vobl0kpez0jlrenifkgpj9ar7kkpruvnij8ll0tam3hfuhangdmf3oj00xyroqsdryi892dr74r4wgocg3tvyuc749skdd1ylf3abol4e7idzsij',
                mime: 'kjjef428m8w5pwk2zyjxxxlkghasbf85r0ic1wqfi4qev93ofg',
                extension: 'acka37ukm31su3h9wfx1d892kk6spjdurd4ce78sxkmndzhyjl',
                size: 5011689673,
                width: 662020,
                height: 819606,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'etiu9cguyam4tpi07h8rzs2uvs26v574emlita46fbio9j8g2bi9ds9kpoc31nxt2om53tz3qh6gs81qgn63sjwof80cxkpx6ejrs2bj7mw4rbilz1mcv4yjr0xwn1neugg9hrqnyk06vfggvjjawdeb383el99ncz1vrnygkt4axt2w2pcnb3rrzz17iih7f1s5ffyabmmdyhzdq8cr51fjkngpj7fowxil1i2mwh98c0t03b3qqjm8bn6hiw7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentTitle is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'fj0xiv4qpfzsk23lutj0x5gxrgafe77rs43cu6xax33n2qkt0dc83ym5qgddczdkzdnd2nftt68',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 167068,
                alt: 'dxxxqq7wyc1qmx2sdjnk1h2b7a0k4b566cxyx7sbpavjkx9y3107ojfmcjomj7n3w5ltqrnui7jil5as4v1yg5qko8cc4kw33scpqkivv9v6bwvbnzyuw7v5faom2eufliwafl2o5ihb8xbg6kohnm21iynvd2cr0gzuw0qa0ul1lnoitv0au34cg18jvvj35mqg9j13lbyxkg7bwhd0sca8m5w1mc8xxa06a0ee45tug5xqr4ecw7lzk48ioym',
                title: 'q9ustlowiyot0xemy1or89havhhcwqm2s1zgc1b16euhzpn3ija2xz0dwqzhm49x22y8e2z8zuripxrbvjfh3zr3uvqts5gs8iws9e2dhei5ktuycfjsa1q5jeqq7rwp8p0dne8m5954wdlcxvsqlgtyjdmvs5h7xcbvvt3popowu0qobtqpn7l76dpw4md9scyo31b94wx6jqupyg38w4nhznvxlsa6n0a45udnl88n8iaetxfl1pkmrhzc00v',
                description: 'Ipsum optio qui sed. Ut quis excepturi ut aut doloribus nihil consequatur quaerat. Omnis recusandae vero ut atque vel. Ea aliquam itaque dolor hic architecto. Minus nihil cum sint illum ipsum quaerat ipsum in sunt. Dolor ut enim itaque et dignissimos sed veniam corporis.',
                excerpt: 'Voluptas ad temporibus aperiam error. Iste voluptatibus necessitatibus qui distinctio impedit est sit neque ea. Quia sed architecto perferendis autem illo iste qui quo quae. Tempore totam commodi maxime quis dolor odit et voluptas. Ex culpa adipisci at id. Distinctio incidunt voluptatem.',
                name: 't9a5en49ys2fha3hv0vgl6ya6xjso1xss2aeptan8kufihclxorx3s6rnl8ll0ebpwcc7y5odqypb5x92eb6izvn60tazh4hzadezptn6cbtfoed06qluvm0k73qmj3bdx47s1ax0eei59tsav1eq9vbm78wu42uji3szm2a3bqx1tdzi4irooj56j62kgnoivypgbo3stk1h7zd8vuyjex78i8zeibuymvgdiv22qo59y8bn3e6wtgvxtg0c4v2',
                pathname: 'uypy4hv613aqznmnsziuvm5aof2aj7u3p0gzl3snrjn7gq1v5k31b0308eklp5j5peacncitn3zzivt6v2titovddvuc9j3jl8i7mbsqpoz8igg0x77l4jahu9ucfxxwynyj02cp0kf1jx062i1ms6zyvhzqapgbwakqte9he1rft97m9h2sisggl33dqoz439t3vla176ddzrgq7x2uxgm7igcvc3crwmz75qotqylzo173ixkqav6b28kopo8dqyyb90sxwpxfv9m4swhyesf09obx3pku6tgvo30aneplsjlxpwdfos6gm8rl7fhgjh742ncpgidtvp0my9mbptvcz02w907cj6v6ijsnyjh726qh8aja63l5jrf6kir5i3pmenzz9gpji6ku5udi6mle0nus38cxnv0boduey0i2s7g8ylr0kgxse7l1obn7b241kqh9wr0punzr9ksxn180bqzwvt9s0yurdlpfpem1tt2lzme9xrgbd94cyxoqa6utsrko9d64pyw8ydi4arcaqldw2j1ptmnylse9okldbiv98jslovwsaemmrewjsmvjax9c1fuq8dqy9s5guugthvkcery3ezm6rbjayj8ip23jrx8lboufnhmpmrs9g0akznhsep2yt5vf94h0b2x93m6ps4pdvjri52ddcaj3onzfh19uscgj2ip28c35ixmay89krm0rd0ep1lhb8qgo9a9tgo5fima7q0vf6pd7gk437grgr21cgvxhfqce5676la8ftskywx2cv9ftxj2marx8afu93auaiz8ffc9fwqk2mpposgqqxuwl3q6vxyizdzc6f6sir6cdhfqa7eo9sxf9tc0dfa7fpwn788jahhr7h3wayzel4dsolnauo4dxuarcmp4foruya8qhpm46rx1whial6q1jlx4yn35yciieekeyrzi1l6lwcn36ktd90blmk7l9k7onpvb63iwj5es29psjmlbqtktsg2i9vn3lj32ug6cqusaea11n',
                filename: 'jtiaqk4c7zs0appvufygnjp4h6gdug0158gt3k54fsbkmncqsqbni9h0zuz70fjamf19ibvvjw1zo684xpnz4gkm6cbqub8czlydtclpx3ocxe0f7u7lct6xd5ksx5h798ha77i0ujmwsw7odm4zdpumem0byli6hdp908b5wu83fddw3kebi8px49ztry0qhu547vd5vayfqmc32ao7rhmz5ay7e2j2sw4p90r611sv48k39vb4m7i0gnbkgos',
                url: 'jwfount8zyzcaqr88p8w3ihnxqd10loo2txdhlewkmctkpsr373vuugi0e2jpg3wo0dwlbcqnfdczlwwbzwjnk20b6zer1535wvg25ymmqwsltqncnicdl7yo0fiuco507le5cb7lugzghfp36eikdfyii86ud1ypb575y6j97o83qsiiz25kain9d5qejdq2v52djzml3sm3jzp4imnzs47ii57pnejsgfwvumrved0hcil96te14qk8ry5g12v8rag16ec28isgik077gpod7tlm7141t0ya70kjcd31lcsh78stv2exfhimq9pf96hp1kes7ydts8eqndk8wqta50l6ay6tpo7oohsdzspr15lhnps8ls6240gzra9eoekes4n2r9pq05uw0eguvg994bovux96h3ugwoz8fr3g5z4361fchmk8ez0d7ajcw3dax5i60z5x1hiyg0b59gmgjp9od7tnbeegow4i0miaumfu8vjkssksnk0qvinb1vtd8yjhrpcpgzh28z0vbvxxbk46klh5s1tvr6jscpn6osun3r4uu0c50d2yazqtzaoawas9ngmsp2lwgqelz7vjqoy9vk4lgyjk2a607ypsi3vj5f0iidcrqzaqtyc50sa72xw5xvs97uhx5kasophkz9nhv2frke2ph5mzjxxe7vxctm4sogjto4zsgkadmhgokme6m85msc4xuefeqyvt7b5aha6yb8r4v6mjd8l0dtnihqt9gxsijwobl7w1kwjle6jc3ur64mwgqtmr757w1sjr52i608k35kvg28uy5b7y89e3wyawdjkt6bth6r6nyxsr2hr624rffxpvkel72aazw2evlbab9bqnmjn9jkzzqslh9qxso48y9jhjvyvdfpx2y8pijdbc7lnu9z54lwlu4komu07nf2wsqssxoe0wnqyl42k3ld7v2us7zkmrzmb9kq29ysof2lzdx9831end0pcejf6nrjur10catgubdpevxp1eqj6fuy72xe',
                mime: 'x4q17vrxhh6gjmmdzn2isebsbnqkfuhuhnxi5g3g0mpm0aipod',
                extension: 'evejmdivlrz4u5xlccbnoxoh44mp8vr3ay54zt4zo8mdoks3zr',
                size: 9714610983,
                width: 367453,
                height: 874798,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'r6qm0zcnhl68y5a74i99e9eyojyzbvewuaqoaybi3ufvpkxwcxgtsafh8zk0qfbidg5oej6bo2xjds7wn9igq19224c797ud64ljm1c6u5kezo18r1hsrpkwtzq96xjcic6amjqyxtpkqvcm74p5mt2xz1ejinhzdpqa5fx7irybhoee5ts7umgwke0b5fzezlzsbmtcms0ys2qchgt9la78ypt87drwssub8a0upwae8dx4v3zsn2sln8jssia',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentPathname is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '3jvazkhshzvras468ivh11m8oiah8glamm1vznk5wwc92932xe3o0jv2ju985cusnjj521rown0',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 646209,
                alt: 'pnvdhibd2bbsd4l6ta560jr8t6kmfyxzpvqg9isicucqkuhsfr3xa90gw8rj17rer9ft4j53bms14pr3w80xrvwemx6z7kikqwhnt0r32i7zsfluipzdfufqv5q80qowo7ta4xbr86yj2oxj2x3g890t23yq15c69p57b6ejbfdyt2o78eo5oq8rx4pna1fs9a4mk19xdkbg2k9f7z4bfyrslizii4v38cue6gkn5b5490driftjv4w88glrey4',
                title: 'jsdvixxyne7weto4lcglf0kkxbjtzz7pv3h0tsdcsnvxg0ug8j53gtzsv9bkzx57gvy1cecjio5rase7w0rthob663lk4e1d6ve4hy0tta8pym3ryats12sg7hhcwvmhwl48a6draec4z3yq787nudmriphr2c7yu83p6r9flch0m2wp165jlw73mrwvo3ukqab8kljg6u0g1oqb3hn219v3il7mdukmyfkr8seiyrrzdnk4lz76vnm6u0n4ib6',
                description: 'Recusandae est aut porro. Et doloremque facilis quo omnis inventore consequuntur. Voluptatem facere et dolorem consequatur natus minima minima eveniet fuga.',
                excerpt: 'Dolore quas dicta quis eum mollitia quidem sint expedita. Ullam sit eligendi fugiat sapiente ut. Sit molestiae nihil eos perspiciatis et voluptas. Beatae qui dolore vel facilis.',
                name: 'sn4g7l41gmycnpxoox73r68jxpyypx045iag6yg04krzy7u3iur9trydhyh646h2t5i3mifmviyh5b3okil0usy1lvq969a06aefyh1d87k4dn2b60usx06mzfkvfrj0qauun3re9ow3fluso40t2pudd3vbfsmox3q4f9gcpv9w51i5kzemj3j5f9eynpenpm47ueb2ux88wofutnj62hima0dadx2d7ha6hk837cjhq8pgdyudgbywtdkwwa7',
                pathname: '5e8nrl2ut3yf8mzn4trily43n0t9811l4qq3j44gqly7qag7rl7ga61i8hjh2y62ti3j28t32eg0g2xtw80caq47eianyru2o8yh98jm4o3i58gs8f00pzh6bhup5quj34oc0o87ypup14b1ovcziy7fwohbnf75twr72jmqiguqjivm8twvnchrb2n1csn6gjcdv72g52q07jurqadcei7wk7d3uy2qbjdyfgf7qcqdlfank64kavrqox2qao94xr8n1tk396tiph7jkdp2e06rhb7o95a2wqzndpo9yfrte3hvcy4mv3ha4jkj6oznor860z3zz1ogf4h9n3ch8b9snlgte0tipuzbae9vdnns1sslp75caw3pmvw67zpqa0rfw4jpheteu58ki1q113lxna90g3nsfjbe0p9w05mgeafoafyzeh6um64nulao3zhbkms3r2xzcf5g4s11wimberewgt4jdxc5cm80dotddxbss18mfybm7lr5dujax9wy4nllylccajrynvea33ww0jg17cb1q7mc3o9inunjx0n68m1qzm12zl2xjkinigfx7zaq1b88bu98wzgx11zc16pr038spuj0yuw5a4pwg2cq1vftux6rqgkprhxcwvr6r2etw93xqi0vdp8sihatoj1qpapzj6hf18sroqx4aih36kb7zllf3xakqgbxpo7zsma4kvw9tau0oc9nqbav6ew347999ltg0dyt0g80c6krfo90gk73bi0otaxkwo954os9i1eai92f68x2fci7o56kpbmso0m01ayv32cz9dit8uacnm3dl0aiy4m5gj1ohoem5deeiskjbewj8b8bjys74k7kx1dkmtb6l67e4ob7c5ydkc3g2em4fapbdfb1y95ktj4gzxk04uyuiz2nn7asuus3jee67hvaj01tt0rwad16qj1mrnizan5gae44xh2ca8jlj0kuzszxammal1jfgctmgz551y5yvur0uribikflr250l6ced9b7i',
                filename: 'iekv6f56o81bk1tdwiyssw8coe9isy0hrx5k3f7uhzulj8ragwgixvs1odwlm2pieyh9n6e0yshrxng0w3r3e54lfwa44nudr71faedptsjb43dyxbn5ygvaen90enzod3hzmx2ruiociwp6j603r0xb1ubxbxv7qg3hxb5d7osn2r4k21q9ngylvwkhyjc9t6v81t0wopwxkx5n259k6gnz0lcxuwyhzhfkla2pqz13p6962amai03k94qavvc',
                url: '6yib06js77he3b72ueo9dlc9l5v6qxu33wnb261t0xq0v75owfwd0huo1xovc4e8dqqxr7ku3afgvisybuz6zq4zt2dfx9e9n9iki87h2elx0ma4kragcrulyd6pucmcu4mb73w2p63dz0dx69i8b6h9oerm9jzp9o57h7evercoqg1xg9zaavjfvmfsbagxl238kkcxxrdn1vy93qxvhqsy64mv9ddywxledug6yllm57mxn44k4ejs0l7d3inswbskasozfms8ssmtk3qvfatqsfvb1bsoo6vtn41nqpplagcquvr64nsil9ax7noot9j0p4yopo57ykpsecuyxlh63zi34eipoaa1co6hvqwu3y7pnvlxioaayg6bsicqmtt1wj5in1pj9ghoekfc4j3elf2t7vtq368rmm45gzn3j1ppp7xx3ie8nsabpmkj5ht6an1pakq311vim8ew4fmgx6ursul3odr3f3sjpw2oe8im1hxicwtsvfxmujtb8kdao47fdcwkw0meuiwpvjigmwirfmxhouwyg4jzm35utdkqvakj2ictf2245eluq3bkgw5dfhyaxmbclgeebyayuwl4gt9uun806v1l87v4112g0x1sqix6flbtdgxecqi4ksl278aztm7luj8k7j4o16tr3r6kyb117kakpm17yggpe6zzcvelqzudqd40ajnv0ds3y8bad4apdqe3q604bp4mtdyvjauvnl2jls404hsyk8h82p0wt2bqtpxvv3c3oq7uvdkxn9vdc7ie630ybbm15j36r49nvnenwqr7y7ep9fy1dh9alt03zbx0py0g7ddhn04rgm5kjk8kt6xlbvcd1n9oacytyvpk4gzvpgklnub5zb9ku8vpfgd0z361pix02s7avzhzdck56i5asaq8x4av5cpu0mp9e2ma8ehd0c8zy0evy1pob5r6ic19tld6wmbxnjygrywy9g05szwrosrs4horolkt6n7z4zfqewkrq0i5si2kk6yu',
                mime: 'jgv000qsxaqufprrgek9twcxebmhl1tpcrbzmtkuqna567t95n',
                extension: 'g1ak63elt4hrlkphljm3nf1121obteqtv8u1mi8voirdfy69ax',
                size: 2058761612,
                width: 510685,
                height: 974844,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'd7y5b0eobfy1dkqk33n3civvz5uicnwasmj36gtp5khoqzjhlwizpnkriii62w97upyxx5mbhcdnneatok3s59il3cjp2a8xpnkmq0dt2dvnppqvbl2l28ekbz5l9bxx8a9k5arlp9ttny837g5rmndqc4xjkpavaa0k7iuauscak56a37mbwokuklslugcz3h6nz8d6u16otxmqnk50sb1eih89abmco3y5ixbfj92634i2qj10mgrggwqabkf',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentPathname is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'itq2vczdhz6s6okkhv68rerq2z1w0ibgvs7jzh6kml4agu413dguwszzmp6qkxmsuarg0b7efht',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 117282,
                alt: 'cg643leu3sc4op6j8zi3ir36ub8z36fco9gewih2d37ruwo4uod191snzqp36og6xpjhvnszqpnob21besz1km4oc771glabfz27nc52cj4ecinf5kw79ndyrnzepnis2c32s9wrtt7jyvot30drxde7qbulbsj8njxpakr0t5ngr4hzr7izrbssf97bsvgk73i44d0dft6865b5ggwn8v2kgo2w4v53cl8cwcllam9wpynywr6hgkhej6mzkkg',
                title: '9t0kyjrciksuc2c5jwgi9t75nfq7dqpmni6f21do99fdqbvbvlbqk33pos9b6s3zq2bwx9hwiq66u54wsmbgb0n6ogzoa00pmmrts1dxonn5hvsh6rl0ahwym8l142jt72oo6qfvtqzp1n6f41oketyt7fsgy5n8s503jvqtzposd0j7ova1epli0ea8gujuoj8h9wuki1dknif14p41eccney7997ictfnw5oh7zuchp4xk5ho0ytexzte4g50',
                description: 'In ea aut sed laudantium autem. Dolore expedita illo odit repellendus maiores vel excepturi. Est mollitia magnam ipsa ea. Rerum hic dicta expedita.',
                excerpt: 'Laborum ducimus aut. Sed delectus praesentium soluta mollitia quia non velit delectus. Et debitis et quod autem sapiente inventore. Totam neque consectetur ut.',
                name: 'nm26igr8u3cxldx8jblpbedxgd9flbevmk5k9tat16b9sgqxq6e3zbrzfxc993oq7bpv5081nvhfaarfse81ftxr70i69218zh7x60vt76o1je5bkecmdr283vg8195fwulhjoasvpsc2wv8zawmsp7pq3a23u827whydhre5ars9836wbpz2hkgpvkxspobezqizb2z14y8fy0ywp0k9xv1tmmvejqpcs09vcxw11w9dirzoty0be4ofyjbia8',
                pathname: 'xbw96rd6qpagz8iqpadge5pg977e2alu9c8ik6f76ofjwgivbuxrxu61qvhv2s75qveeqblq8z611swz3hd905lr0oi99ihmimcq4s2j2x27ni3ifr3e7tlclp490wwn9erngz76thtu3imi8ctp0nv722fd9ea1us2n44djgry1ntsxe2uqjt52x2cqpowp4xf1uo2netsw6jscxo2ovvezbmrjln607o2in55onsxkdt4ijmxzp7saxtls9ecxtm6s3wqponf8xjwuj4h2p6bup7a66x2ddceec8tgxl6z674aglf8ftbwreolyjddxigw32uu6i0ty83tlf2g4r2lolnmh3qrcz2guufn9wdgvw12erdg9t7yxvog7js1kqvmt3ajaxjvd9x9xk33hznbgzthocl8ey6hg8qj2vq046vduag80q05t3swwcn9gwrdste4hpv4lg4ohznsuvqp2c1yr2uc9s2aofinjg47yh19fno0x3m400xry5bcs93rop868bfiu77yb6volwb6a2axxy7rxfts3ci9jw3hmo0zklhdrr6hrp24izqwahetknc9pq9ymsuhjcz3yqptw7pfuik8ezsr6lbjd7vtu9bts8logvdyf4x3hdub90odbo3xbqjhzu7bkmynodoj94byrw0lozwe1blbfk0rt8k70akwwa0ndcxep25nljqdyvig3x4vsasg50dkvs9jkx5gfafoihhv0j0g1b9xi2y70gnfdscfx090cfgv10uidsah715m553ps524zbt9khkaz0dlpv32lxz9e8dd9cwkvf1ht61c5ycasd65391v3xk5i1mih31onzhgktkmg3t3etgphrx0s7y8g3hx9ycji12z815foxnc166ll20nf1wfncpmeym8t6ti62226hmfapyegmi1qwgxo88w381vja6fdk4yhy6aoho89ioamtf08br72cbs4mqciqr0nkh0c1rwsojaablqn90z65dawk8owmrtgd3ytt65',
                filename: 'ghcfyoc74ljvp4ftup5ave26m1fm3bgfwn3endrdmaq48ixbwrpm0ttiub9jkwsk7n2dpug8jzrek0ch4pwk67srqvsyp1zfmai927rv5zwdhl5wk1eka1ttfssu7om3mmp5yj2jb1os54r8egyb8ewg7fdbmc4tft132se83gj0cew2s7xj424o3xt4qcfd7m3b66kc3epbs026vselyflwzg7exbxnror4xo4k9tlc00mwijgeb1kof4ai1913',
                url: '3fbwzel1kin8qpqkfxz3ijiy23tjdqrw9hu0a5jm0stk7gszjbm4d4hixq936lqlfxr9irmdbr08luzozp7n073esq297a1dp294t67qd60h7efnsoetaofw1etzayezw7eomhwwcwgq086gfidbt6q2vs26mwxzx43oeuw2jzzs5z0e2uilolcvp91qlh6x33krbd1gimtvsoxk84g3z54ewbalvge4stqwpsebk3axqycqyg6hbsa67rc6kirh5zmwlept3fbb9wt7wgsztkc2oob9ler3ny5evutfhstsasaxhz3xjc80mbe32w5x87jt5i7g2b7z3yn9th0suejlmtwhtz7nvgeif73spxpt6mlqt4qrth4luxeqzkddwb9eqv9xhnk6ucv6oze3hzpc5dd9ahy5iv05s8rx8z8zlmzlr6r8tm3pp2s7kmqwwwmyznpjvwlzhm5l7pmnzg35cn5d9ycu8siscrfsq6y12et7wsn2s1v1k13zaalmowr3xm43id1wl8mgmmzxoggdcub2k42yji35cz09o42yqzrk0d5i41n5h12oh0cuwe1sxhfx9upngoh3ni4bt7abs9pijul41hgs2jd2mf4rr5y7tkax7o9l2ba7dekzmlehyhchxu846f1wwxq3txk2sr10nfngd005ef0z81okum1w1bsmjphnyqhzdc23zk7unphrdt79esa7zpkfbqrjpqpyh4kxk97qztlovo830mp61hu6008fzg9ffgqzo7v65artyrs3ke5j6nq6aaczzx7hjckcoisugr1vbdw29mhjcgkeva7j14l9gjjk58h5l54s8ax2v3k629hm8yi5sr6eqwo55j4gffs9jua7dhqy9wmvmkjubop4lntkjtz6jn4bewbqdd0kkl6iihcyxhn31gg0ikquv7xrfwkh0c45vf4lfbbgsa1w1asz2bdmklmu816uxbn0qek0t3d4itma2wfwo4yuz15va2gy9lez0nlnzl7rficwwtxd',
                mime: 'o5il9a487856m85kzezeposlsmzmvf9sxbaeauzdmghlto4u5b',
                extension: 'yjsz61xxyykkzk5c0loo4ab2cbzjdb0mr1pt0nwdhlrybvnldy',
                size: 3950250408,
                width: 683546,
                height: 417635,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'jeaucfkvgwyaju7a5y6co0riheg4qp5z7mdqx5gffjcgxb6yjjn2o15q0rulagh28elj2yzkk11422doyhiczl5bg71lyc33tgbwanadailla79mh11893dhp20a07nop7loxxo8bkewh86t8pkt4ndvgh8limnx2u3mn1oj936k8f78sglmhatedyt8hubzt4zajhtfwdlr8pndh79kt9kqzpwfvjxo2hz7fwvajrn2qc46y503sobswjvld30',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentUrl is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'k3u2l9q5qedij6dayeebejw69z2umem4lm4t3w95slz7kihdy5nivog96qvvrthzw8ix4jhvcfa',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 718652,
                alt: 'n4lnjiklh50fofoy6huvp5lzr0ixmh9xm5rhce7i3uaf9ho7xf33150imknouq062fq77q2kp44ta4e09safs83zbdotja2kgg1mojp2qr7pgpsmlpx5wyfb9x8stutg6kxzrta7dvxt10m5o3vp4bc6irlerjep3k53wsz2xrjzdbkrkplnvyiyxvhx6s74b5xposdqwlj1y5gi0hljqr5idchks50j4gjrzo5zr0i0d8x26epix67bgq84tfk',
                title: 'o52ckc73mm86x12jbue6mg6j2pum5kx5asrsfrq88jm720ofhnwg5knczprqh5t0ynoa8gr7uxn2rv69bni3q6albqtdtv2e4102ph4gq09ge08zoakktc3sk5a6m0c12zhdn8r1de4yf0hnjas1wg7hd839qorociyjoy1jztaqp8swo2z97ncb0huazypi2ngtwgvs5f1m27j2etqd83i2lh9huagwmvwiq296hnjrnujsprw0mi5gvh4yu4r',
                description: 'Consectetur nihil id tenetur enim ducimus rem maxime rerum omnis. Et officiis quia blanditiis vel ea vitae. Voluptatem fugit et qui quos quia consequuntur ut reiciendis. Tenetur et et odit et tenetur fugit dignissimos aperiam excepturi. Et earum repellat eum consequatur ipsa saepe omnis doloremque. Non voluptate autem.',
                excerpt: 'Numquam velit ut qui accusantium fugiat quisquam. Alias incidunt doloremque odit labore. Placeat alias dolores libero sunt perspiciatis ut porro sint odit.',
                name: 'ahiq464kpz63wq8bak8cbapf3u0r2m40n3hjgasikkyas8xa31ibkkrdkx13dddtmk3fqs4ycwisz8vx1fdob9b9epceyvreflz9ifeu0xrddc8oz0prh9o2zazffb6buhcfqb9ysug7dvkrjjrf4q7fo3sbelz42c14zvd0p4zvwqmdxz8aj6w6lruroar2hdvkw50yw5u8nayy7lk0o9aetc5gwvmgg3vyhj5alzcv1gnamdyh57k3p5ee8le',
                pathname: 'fgxmlg56c7nw9dyas9d421geh1ep5yqgqhsfbxruxfe2ast5h4ouxu9ygg7r4xhyhjbk05f137rx1cekoadqdd1l9nkhvq6pg0yh1frob1zrlzb79fw0f912cups10s2e1rps6nrig35qmqmv5nzwemfcb08p3wfot2xgi1chooy8dtpqk86e7qpb9bm69hbftpj5ewf2kxk773lbqyjct2yz6u027e6qs62et18441fymamkchsoi9wb600fc9gfe3ua8kkg6x0xoqec7j9smvvsqy2u9x4tceioh2fyvrk2olgrtfgbzj5xv3qe2e58p3x4mckjw0xgju7xlgke7djjy9asgcl0x0qflt81bl18q2k2qq3b9y0mqgrdxvlzdc1503h5ghxh5v6mxnlkue9qyhoi84mwvsmjqd18ud2g1c2jajwfr62m7bf5q91f6c7krceoqdwv6ldkhg257njw6ad9idc0pegi8d200918jnj807hgl8zg4mk1ntlvq7c02rkkdc27f2r0b1k6kgj46abdx080hs1umb7eafkyeuhygdkgtnrcyyb73dihrflr8ekqwn4eedtuze6ax9e9izvk79jqzf4rhf9e6es8c24gzc6b0iq4vgcraq7w2kwwggdyam25tnw02oqsl06ddwueusavdga6mxu6ykgbifon7l0u7szx60fieoix4msogtyn2m9uhde7qxrnhueyokmb01kln270cfiqj2b789gv8e3c9j5ft2pb07m19i215zzvvssx8ltmlrcw1wdrcyxjirdf9f4kn7snefikg8hgutqegbu65hh5ojaqm0kskbz73237qf4uxtofv111u5w3vfux8l9vxt374iddoodrvq9vr2dgkyzk8mf52nredcgfib89n0i4jnvhvnkkvkl2hdlewc8j0pdnwpnkyc4n7edjwzjjpdl04vaodajn2kli0gmo3kp3hi0v2y4pbuczvy6s36psyu1smb9ofezg5d8zyxw022dk30d',
                filename: 'b1823yj46b43nlfw628rey260r0ra48ecx36j10cc5vr460u527iog5c2w870jqzi7a4sn2qfnteqkftgk6y2cv613km50gsc3tor1whwoaunwze88gfljpjodjzvqqwceagkzetswpd4264g30qnazch39cv5624w387fimz0i0g77o0x21eszc64sxrjkuu1wlafrpxbwfwqhabfk5n1cgxit9xd9v5dqgug3d4ibmryudnf3q6pdyq4gonmw',
                url: 'nmipojpyi5ecgcmmesjnw202ze9u7hi4adv0tjac8cdy7yqf3mwxbqaq004gbiri7q8hd7ct1vrtglstxjuxaxjcdycrm0i6zso9bqg6awdterx840g3udlm8is1rmc4c73vaxwf1rn12yf05qu5lrn6s1kbxy2umyejn73fvwvruz7bxn5utbahyxged2ute416irgww1x9qmnprrup0e1043ph10gii1t75do6m4vfbupwb6sav8zcsgew77oallpl7057it7xyaf89seyrli2fzwtri3vy0jmewveypabbwwmdf2w8iv1j8qgwp3vatmek98637vdy8yjzzt2cbdzd80jmxzon9ulxpzlq24i9thp4zy5hdad8ul8eu6k02k2i4oc5pbsiuyz9b5tfc7fomesq2zs3o8xl9ub1y02qbv1aj9w7ztvq5meynsaoeir4r61yy1kslfmi0ykxm3tusdmmy1hhpzhrgpejye1mhvom7sir2nci9y1p7pvl9nyykqb7xvyecahbdx9wz390c8ugvwdmce6a5bzz7njp5mv9jzh53dmgpz2mf3mnt03uf0tuoh70mwvbhbxks7hhmcbxmidelj333l8p8zru7i4z2esrl6nv6avk7ceh2ijueq8ts0h0zwp2j2pl7ij5ubxyts321693aone1fox8727kyowqpab2cqast7nrkbvippiu08ybg2yvrww9ikxpxi2w7xgh3ljc74ai77ubwejzouqth4hrtodcxnlz6a80a2xoazsvbjrpxeihiit17sfyp6j6bvsnm2w2gk259mkp5b9iggbegipu26nma969pe9eq3v6grgi2fj6h5z8z1hf3xfs53iyt9ypre78p4hda9ghgms0iqiw2fmai45ea5sh7rooxxauf5zmw6c5r1p2bp44yaf2lb9bxtvgy9okhvvounlw61ryxbmzgsfwcihte6j1glgqdocali0mceuh240dc0ke96e6qsj77rjvu3dg5dnljti84mp',
                mime: 'yxpz9c0muy33dxl05cioxx0zzg2e84bmbqfi9kws3s9fh63p5d',
                extension: 'w808lk6addrbpcsaxsrk7syymhrp28i409rd6stj1q1xsltepd',
                size: 8584931039,
                width: 627698,
                height: 426609,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'x480p5sg1kgup5jx7g58yqsahnthnqznjfdin4hn8ui8o843lwl4g0cncetarx5sqrvo6xpww90sfr8c3uzi2nj55e5ie2lz92w7yh6n6yoyjsjh6yzhfwhqakdhf0nkl2ymbgv7rrijbydhnfuyre0mghy7k9ptv6cb0dfy22z30ty7ff12yv9sk1uieixplqtnjx1ioltvgrqr1jequvedvvv2wkp6n8ug1pe3gvs8zp9l3xeeuuej7u5vnf7',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentUrl is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentMime is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '45cnxpcniv3alw7i00avah5qu3ka1ul5nf7tab0npe8mxuozxq10hbqe7lxn65x7mv75q29tgga',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 239237,
                alt: 'j2ub52wnhzylur2l9sg163agezghs1b48le7syuhg0fjlb6qmmzfs89jieec3h44suey6uxw5ms4kje3vnu6gyiqltniudx9mpt3ltaebzepjafw0up7zbzuh35moist3d6rm56wvdbdz7wdedctecifpw67yycwne04ulhm2f022pjcd2yfivq6ihgjeis8jb9p5fr0k121vyun2ky2f2gkaj5lu6ld43qlia9oikbe8nm9ui1nmwgd6mkq3ft',
                title: 'ml9ck2l9bsxi673idy638lt8w1t9imno6y7xclz7vd2je4712uvesjyq8cyjp2j8qtohux4c1ejrj8ohir6w0ue084y3jeatb1wefiy9m0g1w2o0r8yvfwthd1p41152x0h88ueh5dq3x2rdjm471ferqa9slq7ppm25250mhtmvri31qr5ew3zeuz255u1bhjvle6q2p92dcwzzdzz3o7ane7w9vw770p31xyyughthuhoet1q6hi6q5yc97ii',
                description: 'Exercitationem minima autem expedita qui iste. Sit enim quo libero reprehenderit. Sequi omnis tenetur pariatur omnis ut. Voluptatem sint beatae voluptate dolor. Alias et vero sunt numquam quia aperiam non eaque. Tempore consequatur sunt ut et vero quo.',
                excerpt: 'Voluptatem aliquid corporis fuga repellendus architecto placeat. Dolorem laboriosam exercitationem. Hic harum qui non rem fugiat veritatis rerum velit. Excepturi odio dicta voluptas cum magni nostrum non ipsum ullam. Voluptate nostrum incidunt id ut qui maxime facere.',
                name: '5lz6oejkfyz74n8344pybfv6un2ffge1waqztk4ux2w1jp4vd3i99th10i7vfko9nemuyx1dyur9xkgjs2r8d6ov6tbqtdd4bcf9vty0qrhpdsytpkr0hlpfylaokse7mmejo2lebv78ybg1o0shwwao6pxe2g3fltc0to5b478gr2x4q93fnug36e07n101jljlheeng2naoazps54j4z994ul2t00rp9ixgrzecmdh49oxp94uw1fimvcefsc',
                pathname: 'n961d9jae74p853cvacpskfi50ja3sjphskqf2a0qlsefjhj2kzb3i0n77w0gw4u700o85fjhwzo0gji9pkqkyu9qn8tc5vlgvfm2dwxflsge2bo277icw39mdw67x57bnzr4p59vpqi4lsja5jgxqbjmgvkecvhfjak790n3r0kgiigdllqecnhip7rn3d14gxjzhe6eyj9uxpjt7690o1ys604e206ytgr83voc7ebkwvg8t3qtkqcch12dj6e09b8ybp8ppyw40ln8krb5u41tmq7k5h292cw62xiqiv47xwffm7n7aefpf6hx1891bizjc8lt8e2b0hww4iaeuqmy0na1947loeq4ikb6otbzlsbvcqmkk6wueds6zjr4bbg83arzec7563c7ruj8xkzsa0a0uenydfk4k62tcv9j96p4fd2rpr7haohvqrx7o3mz3sizro7tkm0da4dbn1vvxuy1m9fvwdbl8vrlb1zs7ke66wacry1fl2v0zjy1nb5vkkk8cmi7go9lojd5z70epw4adhgl4b2rwb7dvar43j6ln1yi0cnx7jkp45j95hj0bofye7sar1uaox34zgzlxtuv33736iqdcrfqbjido0un7v538bp7ohakyvkw1l4hx96ipvb4tyrgxkhnbw67zi40rtegak64zxfjwd8ai5dwzbf081ko1xdrhkxkibs7lubn74m7exx5hv75gkapz2rvb2wlk0nohqnausdx4yd63kg92sfdn45mgglauabsacat5tru3qixxw2x7gqfmchfjcy3l87rkckyoqfesmvkdb77dui8lsdg0emg84j4wafzj9tz39392d14euxs8uhsz4bjjct3z7e9v7zw7cce45fm7u615zgyifx3jxmc06dwwt9jpchdg26hh7r5jhpotycxx2wynaxjbd1qqc2co18h0zkmqy2i8s7iniev2joyxxd517064iid7gw7pc30wd12klz5s1hk2q21knxhvstedm17sr6fmqt',
                filename: 'dx439su3qty78tx50w1sltmkf6b0cmakc0i30pnn1wzx8oskfmlgs3crmgr6cunkci5zs1gbrybnfbsxanrp23zywnse7zh30lkzvzo8op7w6eqy24z4e7iyirbehzk5yoyr4bshbi3xysr9jfjlunfs8sijbdz8217s7z9ml23q8nv2ayfipndtb4tjob9irfbx654yt40ddx3fv4evveobhd4668c5xnaamfthc3ajt00hlkiyf161steloda',
                url: 'iepg7lj01pjf6do6qsqjn5xw2ht1egwelrlqos7ajs39cy1k18hpsj050pa392taei5uhcw9jis00vm151ers4k4u9hbcd6bio2engnsaff9wlfcm3xuylxkztzusqoh706ddxlrf3t1lbsi7oc7x95ygp0td9axo90g0lmi26qbffxedog7oova6s3kq4p1ttapledxydbdr6pvnvr7lpsid4kkot54u3z5yub5nxn1ttttnqf6knu2cc9mzn535v6589v9izep34w64yoq5pr8x0ejbyljrxmywlq8747yze5lblx8rpk2seqef0wghb098a7vysuw8rmw4ssz6e0qtgvl6qavy7a92lcw41910slk8243x87156xsh9wlilr6utvk210dfoes59pzv5gjqum8i7byz8em26tl39cdn6vgck5x2crv8nepbyv3ob7ldjteh8tarpbnczw254umrygjgmf1p7e2azn0iidv6inaglwd71a7ktj1480izgsm8vpohar90rqmxzo20f4m4s719y809oqoxz627ao16gm3o5o7dx7hxtl6m69x8gwfhr4ir9o4e3olvkwbb62exekynpzn46y41jnbkumvuyv10qr1eyt5bynw9pnw1mu2jxe6v3j1kz5m1ia9slgolzgot74uqoffe1hf68pkebnrunifsteocwhf9kwqxykhzauizt8vdnqjwy5c5dw4t1zwwkwmfc4rwh3bg9snk6blzafam4ii6lrj25xd3slkihm8u3b0hb5w9d7megvyv3d4onssj1u2kr2s10onpu8kl63abgokz1fw270lr8wwxj0lszn8b5jd8bds572ubjm7ub9txivugdcjuho7ctcdebmfn3n2xl5y2odvgyske805z9o9aj1yuo50x9sgzwaifvbg8dabgqx1ur7f05nosx42r394wz16kirqm6nnbd5cqcr40kwfrlyawme7t0mpjrkc3ssqq0a9ffkjd0go8s91uj836ljf1byc',
                mime: '468wp4a2r4hrp582hqdht7uctohj6rofegm5o8ft9h25trsrt4y',
                extension: 'oongoj9dwmke1xvrdioob95t61nb2jb5fzz3nu64q8s09o5qdb',
                size: 9832912863,
                width: 758136,
                height: 618529,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: '9pxgv67sw2eiu0a1jbit9o71b53oqmx4nx47i6e3wbv9mknzm2ldftb6ec3y1bj9hl69lsxva795ci693yanci6102g7itmmhce5jxlmjhr43yne3uhstixzedkz20qg7mhpp6yqwuww2303eubpv53bysup2j6fr5cs6geuixyrme4pucijs6ajzrv47npatdiclxo85v5s0jrs2z8dm9p7xot6l03rnja1nuvl6un5gpe03v8iqkcgvzp6crj',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentMime is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentExtension is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'yp82n30khvlvivkx977gz0ulpc7jgpbmnt6kz26gi7itooyhaum6od5mxo5gqe84ytqkchlj2yd',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 754295,
                alt: 'faweqr74jnf5b573pempo6v1rb8qqq6gqtkax0av8xa12firb2wzotssdiwu8t3l45dvsr1hdte10d2t7wlbc6j2m5k1oqz6vk34x6fb1en8yp58k1ui0sg2mddndq32mrmp8l4w1xtx7o4iyxyausmttl712exka3vylgs9bs00xwrayzfngo6f6uoxxkvpt1xqqilifaf3l72ile2tqreiih8vsmonqz5hm1l25pkgjahivmksuxua2243atp',
                title: 'r6pyf8a1qntj3vgfvixv4br65qxp9nv2yavhqn9ddsq1ydby2od6iregxbzyxx1szypaxghfkr9ikdqv8htgevyfig0a8gwdkch2m3iavsb5ifq5xrgevveb4kce3ukp10u11fsj5g4e65jsa94r0pku9y7gea7ngljusvjikmd3d2rfgski6hc3b4sdrziibc6dp26gm0oo17fds7hf0sgsoeoe8bnf5whj7346v91ouwwcgiwlaf8hd4vgu5q',
                description: 'Et at beatae delectus et est voluptatem cupiditate sit. Iusto fugiat error. Neque illum quia quo sunt totam rerum rem corporis.',
                excerpt: 'Est accusamus quibusdam modi. Quis reprehenderit sed dolorem sed cupiditate id. Dolor tenetur alias neque dolor.',
                name: '3pawi2rv0zqnsx1qt2clqbnwkvh98ven66t1maiyuuqi2ew6xl9gb8d8k0hxg5kkxpiv8w8ocnxga9urnz9nwj0o9dzxe3374bjaw31qqr5qfqkyc16kim3bb1bkl781re9gwegnz6qf5brj1j0vpqmop4cx9778pgv0ewzg393gm5esciun8nh8jkrwugyh00qpoj738i0qdppkfsk6f5f2n6fhbrylteauwl9nw1pz6t6kaxlr150ulxw8bne',
                pathname: 'f7mn10bm23h5jv1ne6ogwbftelezzyj77chgi8f7ch820gz5yy28z1gsg4bpuoq9fmrowewj6r8gdw7zktoypxthcmzvvbcf913dufrk37eqi3wykbaljkq5gj5tfftfa2vo82zh17m7il2y5ypk2rsvlkyx6nfa95ljcl4pkdxa9pgelmj78n11ihzyo3hpza7cfgqt970rixunjocimmuu34fvd47vvin5cle0fd73b4qm9hq988cdymozqcit3drevrlsbdnpqy2cfwpb8gki3f39x3lytpa3vygpik8osfmvos7iu3xj0q3caglfl40o6sezk91eht6uhwrlqywz651u0t1h3f5onl5u5wjja7rzn6ewz5s0f39jjlkkrxrtyfp2tgikl2pexc50qwwbc8v3zwksxertwqgfcx032smlw2h73eh5a6iselwgur6h7du988mv59qttx3zrjauhdvml8zb2vc6fca32qykcu2f0dojz24etqk7t02a4apu8l7lil550k4b76ogvagjwtfmt8gpidrmg9yplj99njrfxmmsyweak8maej0uy0ynmr23tmaaxgrijks3i5lz3yxdzttb5d3rut5a0qzku5v3r0asx9x31b0rri9pf84892mploz91lyb2du3lsemr4wpmhcqkmp6oe180chyzss9ixmtnvm245pun559czpqh2wfaqh6am1ugdd2fyp4sgs4dqocg2nvmn8zv3y8jrtw831t89h1kqis2mqler7zngzbpqum3a589oqea2sqdlooupp6levcum5o7gmp6b6a8y03b981olahuy4r99quxwyhmlru5yputfw2ctkavms4tsismj8zo6nxiwr87faj96oh4o2rx16vxxpp9dyc0smff65vl00jc63g8p7lg4rzayfpjpmwb9h0anyzhvx5ckdkf9p29ho49voq3vfhknjaixa66f5afoj1hh4mp82d154qgolh9ls4kuwg0ddtmy9ogxzw4sc8yt63',
                filename: '98ut2phz5dxvx3kr217z88bh8pbsbnlqx84u26de862gmdrvig318odjddf4xn0cdehm42vdqw0cceeajyql763fsazhohyhcvqzzyb3lvyu6djflwcctaf9jgwgiw2v6kmwwsx1vortks5gw2o9ztip94xjwlh0by0f1llkaetj2imsom6zjcoamlc8km07jhi0xg88mpk5ytjptu12rhpzcuhn8zlht3l089ye37w53qdzjku46jzfz3gvy4a',
                url: 'uthj6zrqkfybbx9xvc0gondasup3xaydjg17ukvbc9fhmamlnr8gf8l8fuba2sn1o5g38hhlzm563plq9294kudi76aancc23cfo0zaztaqyj46wl8qnahmlcfyxfimr9kyig50eb11d2nhnf0mnlcajm47wvmm65136mt6qkf0zaucob2nzzyb9gz1cyv820v03pr0kjzesokffutmn9p3f7d5pgn3brv0zl1kwadnnnffcpcm4ypncqx37ewj1re7b3nzcown65qporb3h8q895we58zyjrtr3l401ynt75x176oj98zfj66th4fawa7ydlsuiq1skveha2x2jug1m2xyl43kouwkx0ekuojzsgcxv41j5t188fji2i19s7cwzidlcibhf7nmair6cpjcf56il4kdpmis5q4v07zi03ne98cn1abnyia2uac6irl2fa1yrfscmsrm8uqkzemy3du771gd42k20rvnv0bxmjnvqtfhu4qm69srw7f81bh5ewilfvgqi24fd38jy85xmkkd7ahtk96r1vqrtwacjl2sb1bnreldhbcux154t1ltme58jfepsh1hvno7j26danvw9nhvg9px74l63trou3dhk9ashmibxi5mles47q6gept35umpx306umyzqbpcrh8mje5jfvbigwgngbujd05thy2z2o3o1vdmuqv9cnul0pr3czwl4wu5ukfw9c2fp0q7tgmdr2w6ztxhfkx9hwlv6izh4cxj64ot74e5bssv980crvtvg4ydjg0oi1xgtt8k07oeec8cmqjiidknd28dkwepsymah5tdi8tf2ww4o1m3nkdodou5uq08myw7j7hxtbxcty4wcesh9y3z8el2kr6ifz2rbpgbeetl0xnoo3cs0nipk6yqobsdaqtyyoju1egcxcg2sw2psm70x8d0qd0qfoo4e82sojgix73tyswkxewzrr5ejoemmj424iyo6r7zi3xg6veboi9gejwlti69kw0wf3y87tdco',
                mime: '3pg3dtxl89e3fcgly4qhdqlcfmmbeubd90v5jt2k39s2iq9hle',
                extension: '3zsc7owa3wnpee131zq1dk68dlzo6kxsbcae9xai4j4583c5oam',
                size: 6021245109,
                width: 245246,
                height: 706833,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: '8s0wl290144f3mzxcms78hlrl2x8hvw1zesakaoygq6utogbjth2xj1io4z0pulxskt7y659n1ew72odau0fdjejmu22khto809bpqy5s6dorjh97312datfxdqchbg8jhv8iqq4s7nk3c6evj0jn9pxel6r7bjlwbk8guherxgpy33hnxohcnd5pn8p3lhmdnk65dhk9hu5vetrye1fqcnk7ml1q2mzxz7n2ku1lpo7zhj29ak0pxdbfz76u0l',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentExtension is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'paa38qks4h0jz0o23h3u5aaoz6e38u262x1kc12b6ul6b0gk5kvy73ckj2mtowbonkoirfdxcgr',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 914211,
                alt: 'phsbbmzfmzmasl1n9f5jt89t4l0avbfkmf32jcdpgxqyr6mf6dfndnbppkb65bdskr1e0krdiuq1j5wsky197n5d6rat4kuqvhtosowzzbnqpsb1u0uq5tfv02wz6i552xjub39fgkpwoas4pi4igui9qxeotmgti3r3tew59wxcks1d3fkp5gwcbezjtj7xxm4yz0250jvc58etcj5yi01w7a6dzafn7q1or716bkgfamow3mw7lsdavjf7y7c',
                title: 'jhflv7wvlm8b9ku9p5cw249neagbywfusu5qgaj32h2eo1fwb9al50jnhctc53hsimxe1b6g2nvf7pg37k77bmtkupfb8jrjcea43e1b2j23njffdc7txcclgpfp52hlscvxph4bzidzqxxsm3d009vj6by96ifa18jfurbzwu1v9xscg8lv3ojninflmp059josjnfzpadlddfgb3wrokby36hebfuwoxjhl3nnia3sh0h1c830pendcoxfnvw',
                description: 'Sint ipsa impedit sit. Vel voluptates tenetur tempora aspernatur animi qui inventore perferendis. Rerum magni id.',
                excerpt: 'Quod aut aut nihil voluptas rerum nobis ipsum ipsam ipsum. Molestias odio nam est nesciunt neque ea aperiam itaque. In quos distinctio veritatis praesentium non. Porro beatae sequi vel. Voluptatem est sint voluptatem excepturi. Minima sit et necessitatibus vero voluptatem.',
                name: '4fnydba8o60v2yy4tcj7an25zhwcfszxq03o1a56ov0pexnpzpo0o99aymm2ydbwrdypyw4cpw05j43g6ngcitxoib158sbw7ehn9509i5nu53pxh2m7feyxpj6315kcey447kywfvwbezeml65kaofmam8ohq0ajbfw783ihmyxg3v9bi4j1x7hug7karoutv3wezh8hd65x5htr580iat61913cvbmpoz8hoy39obgt4pdh20mj7v0r97tjxq',
                pathname: 'e09sqj2yp6srw5cja0phkuvwlb8ebhpb4jn7k56asa9t97pkuasmr32ajaoexup03ins2t9mj9fxm8vk1l279eawvv7llyiby9uyrha6q9gvwrd3fxsbyeax68k0oob5376rv88qeyttsykhsjckjneohw44v5244dnlbtt0sdqyse79ptmq0pcllmb02vewvsdisloq7qeuzl5zdjr58woqtkhlq48y4ju49ht9rf8g1c27t8tq47l02tbd2nmg7hmn4c0hxm3rwam5d9n5yj12o3vlgwgbaki57d8w4ukunlejd814wqtnspjc8vx93myqtjmmgwydfdm2wsoykkzewicmz0vdj0qb51ex9c3hlm23sgs6tzna4jjr9wwgv25dxiq6aewomoisy9b56jjg8a6nmmka5hq5dbe3qpjtlvk8g70x0eishxnnkvbkzmaky0yd2s4wkckixcsy4eh04vn08yyge8sp76prpjukll6uliihof3uwe83hc4u0nuyvpijax5bq665yffi15jfi15vs4qgbgtexlilujx254yugq577iyul59nbm7npu7ncbvrd2y3unt4kkrr6avgt70frwf1blyjkqhgmqt2vkuujm32qt10hrlq1ztjs7p0q6lsy12xvbc25q90tvyu1ujf99azh9arli1jgqxe0j10vcu6iqsjq7r0nucxnfns9tlp8bdfe5wx3dto9pujtdkabikw51czhgvgfhpi8zzbvsv5crbdd7fy4dhm1zwy9mzbt6ya52abtjb8gdw9bf6q32iiefe6rtjqx17wfupucmvx1nhrc7ckuc74jer5bax6be0g41qw5oalr3hdah4kcd7hg4jbws9a1l2pzl2je1lfmyn9kfni96b9i4r6k8giekxocokp4sw3210yqzvbxka8srmbjypw45ln8cww97q5swti6e06bxrafgvc4bytt64qk78hwqd6yan5vc09v2budjl9zvuhdzh06kp3nh5fl48if82jb6cx',
                filename: 'ustmseftzddt48b2eiqs5zwafd93sh96nr8ln5uev18ee0lcdf3oufmp6sxt41stbatacfwue5amean5rd7gm504iiuaf4u3kh8f8oaer0hcjxkd9du84dmuv37joy5n4tn3dqdnqsk8rc9ivyotduk1ee518c8y3bxnvaee99fbrxgwfk8y7h4tc1t56fblscd77ftbik1nsyky3q001r4uoxcslsfpvyhljpmbxhe53ybfbmy9a7wmyr4g8dx',
                url: 'ip7sifkpa0f3kmkqs1nr63fml48vbjbz04b7tgiq53sw1qvsho6qd8cwbqfip6ztggdxds8pjgeivmkzsjk6jd0uzwh2h0prh7f98obgadunisincyejhdlebfyjv2syvnzd1nmewnlo30ze5mah6mftrt148j0qbgaod8jg8iwgbjk7uantljozdpnyvc9xr7ta5ec7izs7kvhi2hx5s1698wyof9r55nrug6jtayycs5fo2ys0utkwkeumzbuxp9zzi8t3piuhbidntsestaas89suce965v6j6i17rra1wq14515kd1oczngbtand5fioi6row8tzy3h6comgg7zuhxmplao58etptkba0so2a3qs6q8kj8ibjzslm26ijf5nlv7cf21do5a96ejr5ss72i45qjqf32g0fsws3o6pcdy4vm6rkmatlvk83nq81848f8bvrs9zn6pz51dybmz6l04p2tfibo4a7wc8nyacswhgk03p38mm92gwqgyxw48x7irli47fw29ry0uuijjwyi3d3jcrdmapec6xofcxws1tq3g7iilv63t12bx1toe3xm66kb09ft0qcpzpikn0rwef9lqxm6eae2b8n498lxf3aypur6ffel603c8i36aaiuzm7mcu1qnj3kxkhdsqj1cft480qjqbuwmtypz692eov45s1jam4uzh4ev3mp5dttq3z28yvbez1phrzk17vclxffmq5mubrwi03wlijr72tsdpvxfs4c4q0sj7i9u2tmk5xx3gra5dxpj9b114gta3sztz8mobviavane8vol0l19zibjzkzom53tfiy2zjs3hcbpeip5wxj8wdat42z68wqjuvfvg301j3wzvtcb3ysiwf5znvqyf7g386cwjl8uhn9sgl9erdnj15txncmqppt8e1a7ok07yi0dq0m9qvx777i04mm4hoghjqw8vuskp5li8gz825qy207vjvillh85u7asd76s41jhkx9inivuc7fktt8bfl1yo',
                mime: 'lcyx7kuydoeeqdumud0tms082xlhlkrbrg1o8lkh5ssethaip6',
                extension: 'hyjsto4kw90s23bx4czp92ytrfyhn4uhoqoui32pxczeytomb4',
                size: 26122591037,
                width: 368122,
                height: 822504,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'qt3z77y6ti0cn6ten9tm0yq09744ivifi8i2ei5wa5xy65rkugjcr1h2r5546xl3uv5i834b4esu8yb6rkhnfy1elp4qaqg2wub9s5rsjs1rv3yv8atdms124i9gvfa4e9qhifl12tbr2qm9dsfwgq0vezlveb9vvgu8epmc0hylj3n60vpzl37ma7x7zg6v8csz8b5r95c15e3r9thkjsnqzfely1trjc8htjlbuwdaqh7bjk87664nklhjqjw',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentSize is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentWidth is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: '5vn326fyh1345g0shj7809cli0m21fy0gt04sq9v2fo9aji6w2o4ef1e4pxaiihq0zd78t7q79r',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 769541,
                alt: '7g248rn9km61w2o39q0j0oxmh4ntot1qr4ie63wnaw5huk4zscsm9i7izuq3qpru0u0yo9vu4r2ffu3fn3bt4s42t8c567ssl4g0x96i2wbc6x0bpzp1sow79abeul3rx8wsabkjdg3j8spkxanwphrbnsxnkmiih0wuwetr4x76iojiimm7nz5xx3jcopmmzofzqwbjlugwhf7dfsh31a57w7uf91ay7fpx8xahhz589hwr5osly1h3v73s855',
                title: 'c8qqrrxpke74ejjkbysyk1pfr3n44eu6lfunas7oyjhltpjk4fgcbl03h96u6wc303nl81so148wktn3m3s5df3vk2ddh8on0iqtyk4pplsdypx30ts5onlgahl6k58dq2jd9rv6qolo12rkoo2ni0owaeqlstdlshy5uu85sh5al789trtxzclukuurhenfddluaeql13axfbqvnpwejhmzfeejgfz2814yyjt4o87on8mylc2635j6f4hrow6',
                description: 'Quaerat est aut unde ipsa. Ratione dolorem ad quia ipsum ad laboriosam perferendis. Quo fuga sapiente esse inventore. Eum architecto sint natus exercitationem fugit. Sapiente quod quo ut quidem eaque voluptatem. Deleniti enim et expedita.',
                excerpt: 'Aut ut officiis dolores laborum. Temporibus non id ad autem non consequatur. Nulla nam velit eveniet animi. Sed similique aut. Dolor rem aut non.',
                name: 'q11cc35kv2ezij6g40p0t275mawkhu9qcw6mteijux3mwcbl8jjohneep3pj5pg8z900lggog5fp50mx6nre7bbd1dyrapuh0hls6hibn7mzuw2isonzlsqbxf9e4a5twx1irt1mkhf8d4io38jg449mr1zkpk4qmh1gk7b23avrrnf4tyr5kiw0pc5mkuem6stlna62k53jn2u4xff4p5ho8sytl3u800jaetpd4an9v5g196ndrv6a4nuwrs2',
                pathname: 'r16h51ldkafk9yy7a812s2dn3a7xvv2szs5v3weztpft88je5fsj2yy32cb8ig8icabrbf9na874kil684x87qbh0olei4v5ywamrig49pr1lhdvr8qanjfqvnzu5qp5b47xl0xthhhaamotj3inny0ykh4g3zq04ee4eqv458q14h2rthej7tldp2zy4eagup5ekrq7gvv045b7rcaq1kicd0zpfrqzw2ij8hm0l9qrznpe9kkcvdmhbqg58w91g94mf3ej9t5qw0xmtbeh7xjqjsss0b9brha2o7f2j58u7ujoz8ye4ehan6n5gsf63sbyrbi33kkoea5savtbrxqnbr284dzehb5nzfzuyb3zmtwiwi4plxiqc0mocx2jhc06jfwcb8tnqae1bqq5nyvo1u4y1qcqlx79zqhlf24jwqhukr9zrsnisfj42g8aqfk7v84vfa3m1oc8uk86gwo6jn5emb3ww6zl8pnvsmhcxmcfz3n1qngyyx47adu567i253i64spsgvg9qhwq5mxkpr17g7f6zwrjr9qlkey5njs0yi5xdu8ibdfi7qum0zea6rr0d81fw5hgg7gxq3vl6gwf2m9442ga46k9e5rq62zcod3nnjf2jelqi2d8hsmx75b00m93xsccnfyohs4uyzpa0aojcmvx44nzidhybx44rhlflagpzdfrnq90xb9pnm96lpj6fnfmqyik0w93bhklqrl9vbeh1v0oc5aed4z1i79yflypqqnwsdax38xch4328yrai2vc5pgpr1522p47hbv4lq5tx20svir2vz1ematw4h9u7kuq5lvf6cpbwkpqzy61bsaioc93njzh8mgx77rzsgf2b5dvdxmefhhbl3gj84susablzybiv9ewl83c8arxvlho9bmj8v8oa2zgvb46u457up4le91ozmzn8gqfl8dx09xuvo88kqtjnvcgw8mw6zwyn5l8dgmt4qw74hbobiq7by7i7zm0pdd9dqsabysjfm396gvd',
                filename: 'zwzqufe3q6wof4lo438uovg79bn54eld87mdr4a5458h0eb71m1b95ld41aqpft726b2fzaec7pixaudwbi87ezcbffsw0fyi0jpyfpftyxge5m1j16yd417yt50t9wzbt2phuzodwjf3n0jg92ghapexoaglppgbxv1k7lgi1lm4lf4c1ww23d1ajeotnlg9d7kosxy86rfs24btn01wsush7jk22q97fne07o1wzd7onu4zw1cpvm1j544zot',
                url: 'imlp0rydiynfuh3x9nnp3qcorprxf4hpf80uzte5rs4lc7bkt9nsmfqn9wj6cyeh5bfyufimhmtzhkurbv74jw8sih1zkun3pxp1uxh86ovwntsf19prionzcdl5bi52uql6ihicwm99yxrpngblz2uzmhxx3ojoau3bulavz4dv4hzj692dyuzvb57i2wjqonn71xwg593q37ti3rm3igurovufuyywz7lorqjtpks7dhyf492mxjhv6erw8v2cfgns47wje0gzu63vkght7nojui7ispb96n17vtyckdu23mkx1vdvg68unif336ysmtddfwb3rkncji6fj21bzqcyyix5fmw84h8utkgfiq37ug5ai8subk7n4gb5txot5n0do6t385u3bqjwsp4rwk4467uz9jkt4lba0ns0fqjsl4dyxjnafx4w6kb4z43ht4xc7wz9wn72ibeyrs424edqutwq4v15sqr2oncddw37xrexam5s61muguutn3lgodoobdjui8nmssitpcpjv8p3fvcs7u9caf2nkzs94rfh77xva8x8xofnszpm0bsp8vk87caas4p4ka87ud9fzwty3ghti0q8wyyn663j5h0foossjg86615xthh1592jv3pahn1ryopb0hkwf9wcnnuzorgo7i4160foatfvaxaj5gfkcjibica18meqvyn93x62v61d9z7vqarujkc4m7cz28ycxzks80w2vos9gkczaym7oqq4zhgxh7rml9cr3p0zww99dey4r6mn7budxsp22rednngc95q8662d2aszvh9ygceikbizafobu4aiucq5dd2gyhnyqws2zzjhq4ebaddkk8rqgrc6emq5l3uj5rd8ilhmjvblbbt24x1uj9wfxq72jlef0g539kweaz9jebcuf4r94q7sgbdomwqguac1sg1z7qf82d6l96iama7oazv4tm35dyg2dy6hx9diin5ql2vge1mqggwu86crje70y8v6t97amry2xer8',
                mime: 'yfi38xisbipdz4hymxnq45k0cuou5208z602s2nbxjhq2lp7jc',
                extension: 'atn6j3kwyn59apv8k9bjkqg2hkmsx6vr0vtvuj1u2ce0oszucp',
                size: 8432090717,
                width: 3571340,
                height: 467912,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'evq0hmwhy8t9ezs0e3p2w83q4zsgndu7rg1kgj4hlkevbo7vy9n6r2hazbtczmxfqomwm32rp7bvtlg2r14q6yg0ukn9ub2l6uvacsfc93ifblrqzbr8se7gaxu2axmynibkz96oq1x71mahchdlnns4d8xzrn9ic9jp6uc8sera0d12ld687mg2qxn2pbtemx1i2948xanyifp8yuvdvay4e7ep7a4w4dvgyd556rgat4y5u9udg77rsa38nix',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentWidth is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentHeight is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'gglpgabiksfxbrtghar4k89ewzxhvsz4coayprndjx5n509ar5gqd1aikqyavjtdf2v2p36f9u4',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 691503,
                alt: 'mmtm1r715r79h0jiip2kga1zd5lz64dagobslvbew24a5xonxm63bxwthynautt5ad8wk1ljhendmv7c390nqhalx3wyg53vbupapx71nid1vhsxq4uyfumpwdf4txg1bdn8gscvo3i6la8z4ocrwtm68py9z0r9c51vxsbd1tefr9viismy3eoitvzwfg0ytjqc1nja6jc1wr2n5jgpjwld2b6ix9ewxuav9jf910hp427mdpsyeul9653d5lh',
                title: '7a9r0yim4d6011mnkx7sa3blfhf1is9bgwzvkrzm3okvilpomhnbmg7gvrimadjc50yepec5l1mnsbmxrr9yjh1dfjbl8548qgsk5ftutmc1txuxccqxf9whjdxn2e6cqnhjyjsveerfooaglw2poyxtoytqnhofbvv6ncwarrt94s545jab0rj1xjw94lbk88nmdgy8b6c3losqtbgauwvnno0llm9f8kt0511zsgddavlldqeaok71z4inf46',
                description: 'Laborum eligendi deleniti. Aut quia totam quod qui cupiditate quas libero ullam veniam. Perferendis et libero est aut assumenda vitae eum ut. Error fugit quae. Ratione cupiditate dolores quis perspiciatis officia distinctio ut ullam.',
                excerpt: 'Distinctio id sed debitis quis impedit. Accusantium voluptas velit aut. Officia est qui consequatur. Similique voluptate qui unde dolores rem amet deleniti.',
                name: 'sh95mwg9oeucp04nibvct48tgvuzlor1b2fhw2tam0nsr89d33vt37wdefzm180jd3u6sf1vpx17ap0qfdqz1p0fj6eqr4nsl9tk8gogy1gmvlirdgacz0kkbyblxkx5y5p02wuapejg10dz76lueo190o54smlqlb48amo35ocutk40bx8rijmnu6d6l33xety0ep3mdy983oickgq6axv3odlezffmly86aslhyho76lqysc6evl2ifoqv82d',
                pathname: 'p9bqki88a6zj6lbyh3mqo2eyd59jx26g69jkg5er7dsnwvvb1dfxnmjgzeyrby3nd47pktci4jmku2ywegg7ki103dy4z4g7ksm5we6kr4kyzcd9b5beoah93c9edpe91q3qos364vxk01ct7anjx1wi6udk86ne83y6lwo319h9qql24f50ro6q1kveut1jhou3gsl3jjb468a7b5t3ec57ni0k4jltfxy5alekdj5d58stbaqck14kpgaq895kz64q3e7d5uhzqv5eogk1mmzeyl3nfzrzqnutoa2ml30euirb9apazg2l09ry6nsmhv8f3hnnjku5pifnzjpf2we0nip8qlltz24cgee42x9ws7prhbkrf1x0psp19nd8xkjmgdyg9lmcx15gvqz1v083ltqe6cz7u7ftwp5izllu2yfc05lnox8433ebg5y1vse9s6a2ui9287t52v7sax9kxwrn7gsa8pf23vd464lv6kh0mebeaup7risehx5s8kjvahsn1m91k5q28y9g11ngxqfhzenjy74n1un75zs0ellz72jdv1505xazaf2bq9xv4p62difdept0w5yovk3cffkl6kccq20edyogo1xf82ijhdt3wzj65ozwulk1pnhhh3iufkipm10m8ur7px116o9bmqapj5cbl172pxbmljuw7i63vd1tixzdeujhq2136pi00y71i2ri6howgnqujpo2okfy93i71wf223b4xr8zwojfno7a5rlco4z4qclkxunczfmh8q8e7a2325vudo5456ucig49w9gg1gwxn6dqpr1gqbh60r3lazwyf0o2ufm2vqjb2rbltg24zyhrgb1qvvm8j5bzpf8f526p3gctidpwrq61t6rwaxvhl7tbw4rn4f2zag3puv1l9yuj03bfnr84khuzcb4gp8fh2gkxh4haj7stvmreeb3x7zbb85r9ewbur53o0ssfidpu8fek6l0wxj3oxszimycslbhxwo04f92rhupqpk7z',
                filename: 'o3ruchvjrr0mwksij17ziovbws9cesmm9hj4vfbjmi3pnx8j3m8ona23obb6den0siv454cjmf3s3ajw4phrhe3in129vy4s5i2i6lppx9i2eoqkwwodwjx6qspl3twf47rhjwroaazxigcuxm7tr27xzj5vtsugne7mqxyk3n0j1m72r2q4gqvrmp7s7c615mh0a3yykytegug8ee76f2k8r5c7h94hac9g0qp5ps5xgwyzl0gmol3qr4qpb69',
                url: 'g6k1jn2nwydayp1prhk66wxcfg0k4r9pa6tvg3q3tkmgpy4il2yj7awio4m2fbpmkrx10aya23zh9i9tfzuqrya1t4s37gkg2l6rfelzwq4hnvb2h1mbigbo1i2yroyc2ih02lnmsidb3panu6nmnufxa0ufe0vcjluxxrogangpv2yh4pjo03yyggutpjbe1kk0nsgx36rxbqd7qqpqdftdyz9lavvb7nfbo30na08g70tg0pkro2nr9buuxvhq5d2uf3no5xh568o3152pg9pz51vl0mu9h0gqx278rtig1iqi9exl74618pkzpb5e7l6npvbv9ojdjvn9a28t92duf5wo0hyrivgd40rkfs998olg6qyxisgp47pkai1tlpngyornb4gduet6ia0q3xifed4u00yr0ic3ndukaslp0lbwjfqr3eto8dzb8xq74k5olnmocl8i0lwzz7rndhgge0lb6zwsvilptlgfsda8wzthw9y4o66a02vw02y4g7w6hvq70mre1bn9ii4jkc51zqe3mc5my8lxv5bb1vi5a3umjjxpqmew99rp09hsx8o2ym4y8dj9iybbbn3jpym9tvdp4h9y5jiioobx7pun1z19w3m3olqqcnhyf81zo5hw61colx5us1gm8vq9y7zo4cgm1zpex4occv80h3ac63b8akpekaqcushb3y74scejft9l808z4r130j3qjfnb3yi20i6sdyp3bbn5lh1wawcctqyjbt6jcl6gvm3nf56wq9vtgejta2qf2xvggujfhwjx9cbjv4kycit0ewut3sq877glushmcr2elcxla1h40i9cp10xhvwfrjbj45ovin71fd6cri4n9gsqxakkxjr4ph8uw0c1cta2ktdmuxcx5g39xq2neg3hkqzcjyr18opox99hlekl8hw0l3mvcmxzckd55pa2qneaibtoos84cp1p1q6uk35u1v33w4r49y1ezl1yqdfct38ldcm3oodfaqy26ibfxcnn6o66',
                mime: 't6fyfxib1wkfbke97h0q6j5xzw5sk7lz07gphwucelhvha49wi',
                extension: 'o4cxhu3pw6d9mxtghhq8113a416v3m0g6va6sl14a0p7j5f70c',
                size: 7679762060,
                width: 900614,
                height: 6976102,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'n7r5ax1hxydt6flf76jm0rfqbg0003667fnjxe7k81u8q7ij200vyyehyrrds9qsb3onbvpp14zp6nynyccafqasdpyhcu4og8s8grr0bjfs4lhz5vzt1szablrty06r8qixfhcxl9ot3c96r4u80dcdapz0wa3nzbap5j0zuxhi01pmewxldk32jikl5pq95v3evh6bfwbf7vhuzi1idold26s5wy6caieu1zrcann31u3k371n8u97kdhbh31',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentHeight is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentLibraryFilename is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'yvd72z8n8v6iuc496r3uke2me5jxnlqci781sd0tb9bmd9j8ibfpefivoo3pnnlzgrulcjzzwdo',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 431425,
                alt: 'hyxutrlurq9vh588dvlfbpur5eu0dh59v8o5ft6yizkkz4drp73jiy99yent5h6ph1alqkaolyrmqdm18hxw8304cpzgpvkvip6zvt8ux8uot79nu7zjnieep1opldn64ppgqubtkavgeay0glxe5o6a27weorvrjd46qfuul84mcjojgjksunb37zafwp1qu3n4zfmqhhivbiudtxen6q10o565eye9wk08o33eyi7iem62by3bhzvu2gpx5zp',
                title: 'ul9ihwwazjmjyw7276nw2pie03bobv7aj62hfr0qlcfge7i3j032c1td3kmn461durmsy711j863r3w3iavu961fcf3rqkf0puehqacda2f4k15s8dvfcudc1grqjji9tp1mszi1vmcrzx0vnvz3j1g2k7pagsco78eb5bwvqdtcq0u2idzm5ip8yozg12yb5qfnuy5bdn2bb7cshtnqzvipelq0ufejkrj52syhnhp6l73s4bhtqb5ety9v4o6',
                description: 'Consequuntur sequi at molestias ipsam ut laborum commodi enim. Maxime aliquam natus. Eligendi libero temporibus iusto voluptas est. Voluptas earum ipsam ut fugit esse. In nihil placeat et ut fugit.',
                excerpt: 'Laboriosam est nam consequatur et quo voluptas. Aspernatur voluptatum sed ea sint esse magni aut labore. Magnam accusamus exercitationem eaque accusantium et velit vel. Alias libero voluptatem omnis eius expedita vitae voluptates in. Est perspiciatis mollitia omnis voluptatibus rerum ex.',
                name: 'z9g4c6zg2ta3atvlneonn7f7o6083nwtreoh72z38sttb3rc4t9w3ytjw8iy9bembttq1zxmccvor8uqwyjtek7ltailpbb34qw28ppmjrf8z2gokywf4y6ginq3tkz5e9vudvkwakw81bh8tst1dzldkbrgrl9hjbokp3m205usq76z2ds8gkfo5p4r9p3tmi3x388qgwpnxn58z5ton9loso54khc4xiq3nueo29t36b5re1hb7tg5uvw7qzw',
                pathname: 'o8dvifxy8l8rcmsvblw0rtti6em9x0uz4tzs6jgvq85cfu40qsy7qmm2xnp7wrzszfsuj9mlmr19ol8xu6hyoptaow2rmy3npafosz7oskyfmzabyaaoilxnnodph4o8cxxwoem03e4ap0vsjxum74vpl3ysn6z1v5wxq15lh19ghik4uxinqm1fjh0jgrpkjzwia7oyn9aaystqpl8u8fmxi98u5rkxjsrg08etcm9a4x0jdn6dyc99hfn5p5l6ihqi3kw0l5c2h2azucb95friwkooz7diw872fgjez08hlhu8psu3dfoaowea80qfs4tqcl9lzcllrhwxqpdw9gaissx73niwnzwou1zna1szggxpi6vhmdsf04xavo413t7b18cwleatzovqoz74atxryz5aao02719880gsv4z5eyogvu98je2vfe22xbjzy5v0ph9f8hcujjzd0hlhmesftx1vw1xzq4qgs4w3egjo6daq9i0855p4yaoyowjfr312b25oieqij8f23ipvtfb8r6bda0pkztbqinugksabd449eslghuloe94iweovpr71ur3i1u80ho9ujjeruqk39s9thq6hbxdn3eb090tgbz88aeizss1curdhmqik3qsg2o79fryx8elfe06rglz1kv4tgni25upf4y0gsasf4xu1lja97n9w67fb1szh4gfftkm1ljflj7mekijvg91gk3qzt9p9e7ap0b0zk891x3m9jm47qrdxtp720gc6k1cm8zuwvj6be2h9yvxi1mdzksveuaoj8kro59681n9nbdy0ebgal9x4myruylr89pdkd1jwxfifepbsdvy7cgdonesn0tb6olrvjh6kci2kd4rd7sjadhwwicawdjzzx4f9qncca43r54siizkyj7s0b87xd1bo8az7qhx6g7pwtmu46dam85pt7javyypfozygbo128impbb7y8mw6436l05sypktixy4puqzevbxb6k6rvv1gfrvo2odb001v',
                filename: 'zr51n0802b4vhgqm5rlsztzkglgeuzuy7i4p7l3fejhw4k1wv9u4tmo8i0o8nvzhf58huflit80olwcwegullw8h094plxxh4kh2wn6twmyzsfmsk3htf1pqisr52gwilrmrasz0oppra1yfnxjkq4ytfzasbxpil99i1zwp4o8v06j5jct49kv96ah6zrv24x6ybklsvgspvkkzuxqog18vhqshcvzqimwjdco5o4yp6pywc5q01yayca0wyid',
                url: '672ta8dihul5ba1nrwtbpwdmhke466vegr10okvbpvm72a8s4p6yyl8n7qkhrorcv50of877zdd96mr8s9hwv2fi2cx7i37kxq8vixwkzart3scacv86ncntfvwjdwdirftvtit197jaj4ccuvzz2zdxqrqbwmy6tnwefct4nqj7pwhcr6w52zzsbaf5hj97c0jai7gaihy4kinoh7lhzsczg630d6qkgeyqjh2x6xw7iey98kgd9apt21pc4qsptb55s2rf8zodddem7j7w9v3m37f7bfq7lp2xlzm7wbblyatgob82dwgph92v586q4k9k56zt2xp5o96qc6gwy8jkujz6inzn3bdzwmbdf7qc5xggh5druhk4p4ca80w37tbf4s78x596livre93qm2r8la43ieagdm983kbmew6qmtjhxrsr9vgqbi3my7z3qqn599qvdku2gj5kd5z1wvbg6ji7bw6uhah2paw2yu3zbepraa4cpyxjjre7ie7rekbxopig82zjs279tdr71o1qmmr63tcun4lgu75stlisxe8hsjum6v87sgi69f1khxxbclz0m2y8rexhbjn0bwsjbyug3nrqwk4w2lcwtmooomab35o3xtnfqp67yfb8pogsouzbj419ou72sk7ursgls1omv8x83tgxxu3lzvzaa2dt1cn30elm63gdgv21wgf5az2les2d5twkv2b84y9ap2emve5sqxg9526sr8csoagvrofpcglh4iw8uu6z88d7nhlh9idgjycu1glja3ioeu54pr4fqhensukemlsm2r4i3u8zdownqd7wxkrgmqb5x0gun6waggy4ccawobdupur08u5rxsewm6qf9w240hp5vz87vxwrfpjww3bln4ascaedsa1wwxcu73ja4dhd6i4oc21sg0u7zfpjo64a29u6lb5tozivum68qjkti3l0upa76fel5hu050vqo9rhvik8twfi47uh0utredvtaye3y5jjma90yvz7jl4p',
                mime: 'cn0ph2s28lf0q6hylso777l1uls6911tpeucohin40n1du3eos',
                extension: '0c9zxqi7272y0r4dtjdgjju07wfq0izju7w91470oqvggqsssw',
                size: 7483431673,
                width: 745196,
                height: 757143,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'uy6icq24rdvdgqs4w68bd4bgr0ppfn5x6yu45vnbabarkd5uvu2tlx173510cnrmwq3o21u3gziyj2qar0fx0zh6kugcpoxh5mqprwj9uu1ndxkj9670c3b5t132bwxdoyqjzwx99nd50htdx30h8bk5v1ba5m82rnv8x8cbhniz0226abfuhjobnrw1e4mtdjr7dlycltoki80b0himeaqzyjo65reko74ml48hpc2gruae8w703psfhjcbhif8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentLibraryFilename is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST admin/attachment - Got 400 Conflict, AttachmentSize must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'zfyyucf1eehp3xe7klj5hahtnwweqf5k54jttvr2pg8c2j0rsg6lidlxlpmj3eoccc99i6pwy73',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 435930,
                alt: '0i0mcjsbn5zp7m4d8tnsbdrgntfolljgjm20k8tx308j5s7m8kgq4xvu4ngmp92gkbbcsxfamsjgdyj7sgot8jdsqqvf04vbxijwm8utezsulfngo53w8zybx2chq7lrsdz2iul3781w0h0ax99ru6z0zgs8vdkfeu61p3zsya61u0rhgb812fhblnqrkz31s50s2dof7etxznsyv69vrsb2w014r7z2nfb0m13q6ngz7qxu9e5dvz8bpzgc57h',
                title: 'sdhnl2diig0iayo46mchw0317wl6dc0jos0poztthv17lg6ab8d8yxu3srbkj9cpkgvw7mkkqohxz1mxt0vpda2vp67acre33mr1c8wemv2u12n4m1tg0vvyd91ttjwvf3jjxcn7u1165mh4p6yd5gcb1f6wnpu1rfiye4zf71d7t4qwzwe4ewmgwht0517h9h16s9qj8alybhnouzfhaaf24smlfeav3cv304c782ah8rvzsnkr5p28uaaqj7x',
                description: 'Voluptas et voluptate. Et voluptatem natus animi perferendis quis et earum nulla. Aut et consectetur. Voluptatem et reiciendis aut sapiente consequatur molestiae. Veniam blanditiis illum.',
                excerpt: 'Eos rerum ratione. Autem molestiae tenetur. Animi tempora nostrum sed optio nam officia dignissimos. Eum quae voluptatem ut sit quos eum ut provident.',
                name: 'wq7003eapeztcg0g2z1tityu25xc2v3lgewuck0mhyfkyrzcouiymjsrkmseq5b7k3m1xbx7qf20kzx5hlfbnzg088o0yi36wffeco5dfmbblxd7gxtmhohdnhad4r8745sjv1iq8iofxkphth5r2et6hrtbxqphgqovwpmfbbdn30vp8gmuzp30i6n9gr929gs1b9dhv4xxibw92a93pkd17g24zxaxadkfjdf23dzfqtcp82qtkz6bc6fl48z',
                pathname: 'azugq1v7q7rj0w2fofloc2ghsh3c8fztdt88d8cpug6awt11ysvda8ayynj3c3k9xuuptdxxgxhtx9slf5220r900a71mth3qxsdwc6jd9467n7q5e19v2ci17wco5ksdn9t43n1jigffz0uf30yhu6uvqjx4j4z3697ydc71kg5w393fbebiofl42n8fmu3u5t9micjehgus4fg9hfepfq8qova3ol4kij201am7nu6az13jrm2naj56scv12lemw2kszstpdbjwe14h77exyublwtntmj2k0911quas8d0imsbmhjsx975fefvzfee6wujx4o5v22clcxkn2bouvepr4glovm3g1uq3jeti7ca94isss9s7k4rw205o394fs1yoovwif59ecs335r3iuqvedhksck3hz351wz9rady780gfcmql762q2i4swmvzjr39jhwjo7mzbfhw918951i8kyzmoibybt60le4y2owooa43s5nkmt7cbeptax5bx66zyjblxlskf3clm6fb8m0llc4vepkmi0wq1wqv7rqou6phhydea8ludl3e4bs0of51l1w3vbv62dh2zubf42mwlbewzy30fs0ffwvyl1lkrspkze60u3fx9cromywhr3525zaozbrzcxkg077hf1h2r0jbn5q1ugpj5jcl01rv5620xvt1i5pjh3t6xhrs5jq62upu2rftyvk50h73hl1l8mikh3ii4xtr7o48axbt6zun1gdftezpqvfdxx7xt04x2iosga04n6vwhsk9ufhmfp9mb94tq1vp33j3ydhb3ipse0gke4arannuahxcy4bs5v86hmn9hta9f8khy7lmmdumvp6xpmoubi5sileg04kx2tzxfyynlr1pwx650nhxuct8gayjhk07pbmbfufcfvu9wg1j955gloweak646p34npkxkz7plrczn09afnexg3gzz717076xwr56aamb6ft1imnv5aqy3pre9w1jg2ieos4v83uegakjmr9',
                filename: '8oczvhw72ivv8ksycqrjffq424rmsxjf134eo7ve1ob2v7lkq3643c9dw55qtgh3g2xr69cgtz7ormprqvg3zu9622v36br0hlfs05nmdo4z1mdamxyxo6j6a884ox5fvuaxph9ajyq1yfx2leqb09izhjdqmqaia05fmkypxcvhrszcnbcb1qwq3mwpeye93n5y9a4f01mdi0jksb0p8a2gtrrk2su6z8urbzaksrvekdk5yfxvajznbpn90jv',
                url: '84m6a4h98beu860ycp0ldlm2kcik3n522bna28o4ot64a7mfd83x0grf9pxsmrryrxec5qhxkh62wb8gyqiiynlk80lyaghppkojtfr1wazn82g3k5kl3qxxm6enafil8y1huo5n2mk0ael64l2x8g7ubscfpgpo49gipwnwgv2wvhr5qfypfm0aw1zagavhzu2htz813qdvneshuhgbm5bhefi0io7ti3is4n1mtrkvxzp2qf28l3kq6x0nzlixp75bt4wbwkrqtoao9bn9ep2jhca6me9eiba6vkarpbf7u7jpqjbm7a4rfwgj6ztilqzw916illytgbuvf7v83yn9j6cqx327hhm1fxvz0waib37b47di077y7kqyuwql8vj30gcxautma69bqzhcaklrdcgg7jsy96a57r7cjhlmua1i9j01rr2wrqy07cwprb2dxx7ni85gk0wrnj0228sj3rv81n33ar58va7qpr92kqzq7gq82vvesdauqgtc04156c1gu3ehuhw2880plpmm112g49pe3n5g5zb81kkn7pfz6c4etyles0lwz23kb9w3qozofgudme6ikofvavgtp8n5jmi9hh82sp0o3ujud2q79z957llww32b5feewx1pbjcrlpl7lqo30vzj7wbwhwx1lz95f2xyytdomgoyuoadhiyvo9amgcnxzea4ydnk6afxgt87pkhtspciexij2p2q98riggecp0hmrf0cwej0ysv37kxtft3ho99npjcmaw0gyn8xyrbut6t5ooj8rt617ojclq6o2ish2dwgluvb2y7ujden7uauj4scjndfjn0dp5jcheg4s2acgzocjozllwwf9y30u9zsu38mp8aw53t1usjrhn4cdezpoduutqyz2e5hdjm4z3d2703qxghbh6nauuzetyt1m31umhe2d4z6nmutm1en04m778smxfydxjbc10q2xzvdo5hd8hrljlmxr95uwwtg7cuqjno13ncnp3caw0xj4mpe',
                mime: '2wn2f1m6xnu47y44884mq4u2do7x478jrcqhjrincdr2nf4dw8',
                extension: 'gryxol35nbq6ua9mkq9a666efqvxt57ttmzrq56megrpvi4whe',
                size: -9,
                width: 563498,
                height: 974889,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'oy7k7z9wki6qvce27klm2sj6txa1kqa7rdvmbb5izoytpgbxqxsk20iwr1yu4zd0r5rauym5mu339wyo25avu4gdon4ous9h8k4i7ip14y43vnrq6k5ycxs4s6a642o0dv01e8i5hb0b2fbjzzrpachipaf8qp536xrgf42xym2vr8gfv1h4u7fb6zjytlatmwov167tzhezfn4wwm2ll0qjlil0l02w7x7v7tgx25cnewn3dptbemg5ovlme6c',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for AttachmentSize must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'gr1bxkflma22gjhn1ub7naz3ag2y94l1p3dpo4tlao2h5l8mrsq310sxkjk1jvreym0qm6l8ad1',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 153088,
                alt: 'drl339kr3mzy1cutzetetsioztwwioamol24e1yvhd09mia6633k45m01acmg1k1zvyx8djy4yg9sfryrtxmj2c11lxpnusfw9vfuvjt48fbn00ong39t5ulif4smu0z6cx04zur6duq7kokjdjgnl29muuydzc2ik5gvhyaqwsfj6hnekzdftvoj80qvzukjm5jiysth4slz1a44y4mrw6zh50t3ojjiy1mf5xv2o7uu72rih5z3b964389n1z',
                title: '8o2l8s9zneb2y9j4hffaow6j91kzq11ssbyzle0dhfz1kshgo8ngn711wjlukstzxgssckx4ohr0tqt53ojxlgg9x8jht2dlilx052740xskmva0puw31bggrb88wm9mhh1j56tq12mc27a94jkadigybc9za7q8bviin0ox92dtqnxlz8j5k4ekj3exwe7v56pgaoujl5y2llk2blilqrqvgicr96kn4e7gw5ycdrawtn30n2kfpqtfx77orqk',
                description: 'Dignissimos quia beatae officia repellat et. Aliquid saepe perferendis culpa provident. Dicta accusantium qui aperiam ullam quod tempore ex rerum. Voluptates optio blanditiis quia soluta. Aut ratione distinctio ipsa id nostrum nihil in necessitatibus.',
                excerpt: 'Temporibus odio repellat deserunt laboriosam. Voluptatum aut nulla qui error qui quidem porro. Eos consequatur velit laboriosam tempore quam quos.',
                name: 'zjds42i4nc4cj0ct4dh6ch3z1i4cvlmxh4difi18bmdyw9hxxsllzq30cpw8jljfgj69cniqixv990nbvjl4wlq7i74iv9tcm61b417zxtueaqkt496ra83neoapy77hgnwrf1ifmi37p9wuppomzoomtsy7hcc9maia3moxvcgvqact2cqk76rrs1tep90ml2kigavrprunw9pvkz6onu2bf2jn87mn72idm3ocbb0dexkvot2l3erwnt5s2m1',
                pathname: '7egxsypeka75vyy2ibeizk3q2oe9azlh8as2jq64xo6xvju7nfiyy579w70kcyu3g2a2zlri9x2lb0t1glyqdaivuyt1dk8ncmghqoeflbbzvj6407ym10uobqz48yjy6q5hcl1oykxiw277yi91x3nlqg9x33hn7u0p0d8zqzazvj6z99tzf76i7mpxjb6kv6b439mze104064pkjastw8c5cjk5i0y1vnsmtmpvxycxplgbz77u2mw0axk7n9pn1celoju56bv6uayufouxj7wtnpoy8nrmmyye0hqc5m0ulmsk5bkw1i5pecm14g77u942ckh2ys2j5wp3rcjq38xu7c2d1i0yxoxttphbozrnfbdzkmaw4e8kwkcjwltls6us64ulb8i8d4z9w2ia7r76s3ootjsxqwljqd3u4te5y2z4qdu2ok5h6mwda56cpnkjtvcrec7sb40z4jf7w54n6y0fq0u6egjm9l6iovcwpwhkpsbm9a0kuggsjvaqqo8iwtvb8n4ut6l7t60lluw1qw6bex1yj700w3ne9i6cu49kfntmr2wasrusg5yx3tx185p6q6k42x7ykhyfan1rcvwziwqalnzi56mtszsfjsvz7eenezylbfr7aw2dvh0nsnhvj9yi7vz2d5lpg0cthueh0b7ogqa1fj6fmp6sfil6nxxoqbl778kwucckvcu39eg0gncd29rye4elu2eehrccypk5yxjhi0lyn0xp9k2kt2ukphuimwtdpz0nklz8s5mm3k49m5gv209zpbudksovkqk2q6uti39wcxxskk8mu8tz4yxxxgwxspbkr3x2lag2a25uyqfrpk63re3ps8r9egcezuwrugewdwruijo89t0vng0cn51c4i094t4qqmyrgy26b2lm3fw2zkugn35u2jrbn5uzd3xbjdykm2deporje3yudovqyf7b2jvoxi9e3v83bssn406281dvdbk1nd1f0vmu2juubupqusdw3564kz7t2b6n9cx',
                filename: 'chm0088g3iw5yka35eg09vy9gdly31pwmn3nvn7pk7p9s73ieorwc435lzjhw5jzqwut5gj5rwi1uauf6js6oz531egjw3eqh5afx496km5tvee47vkpnb73h0j7cs3lo6wxj4ysp3wxyv4kqnj9h4eeonl9machp5fml2augzv4zcfsbvsggbrqt3n1tqci31macdrn0gnhbadnra0xazthbtcb1i8plyl2e70xf626zauxhh3z8vq11n9466k',
                url: '7dckg7utj3n4i7nz5jjfi2hqwfs5ywolzr6igi00yss25y2wojh5uzbxhkqg0ana00r4ze61hmn9omir5vctsc0oo3vg3sxkio01svkmqj401udgpm0522lkro7q3pxlaq5x7y39dpp3jadpp0zrtlsw2yowwqj6d4kg3lma6zcwpsvsnjkpx97f1wmjfsscaqgy2yej5u34uqgwepmsasn5xxbce7qwius364megkbpn6xiwsd0c6j11bpw1j4lt4mybkzso07iya0xknib03ra76deoadboqpw9icu4e3m2up3dd5mpayjd06oqafht8c9l3otvyukz4ilgr0n94gasysbqpqzcnpx4epeaxqdguqw7841j3v0umla4zutij0og37j6uh33w723r7mgtjixdd48ks6pi93u1xax2qteom5polrip8nl5yups24lioez5uuyws1ayyb6er8uyv00hx3hjye39ggmq65zt7fuekamhqlhbytkvgvbsj4a7nicl4jswn9cpjw8xeaiz3qg616kx7hk4b5dsoz4lrpr4woo9orn6bdr1ugu79rkbhhm66mvvp4hp8fb8ijjob8xc9zouqli4bpyjc3c0o3dzqgd2fjnpraulvbyadf1b8hij9na9qezjby415y1rsj3lpzqd1pvqxu72mywzgg8638bqrfus59vzt39uvpl9oq1lpeiz8cq8jz8qzr483iufifda7f2jjhzqww06xnvnvl1m5w8tgibmlmn5anhvp1rn0o43ria0n2hola0045ce2293c6nfzs405wf74p5vjd8a53a0nlyusppzwxdv99wu6t8rgl7u11r9viv20jxxpm5g3u685vxnwg2i03s1ao3nfrkm5h6c2uljp5zu6c1itybvept0v9fi4vb64sectape01399yjvzm7y08mri4zt8g5eqtxrf4wpru7iaowwlav0y77gtlveixhkgbd4hm2eee9vyz5llawu9oqlsbssifpxugm5t20wld',
                mime: 'r2eo9u37qn1nbknmu8szs29z99hjqmxhwe5p1qlysk2awgunv9',
                extension: 'woht5o2svle703vqmm5jezg8m8wlxxxkdjzw81tn87h484vu5z',
                size: 6467794037,
                width: 349962,
                height: 933534,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: 'o43j2exhn9glwr4ok87ylo2dsjpejt9d4lcwyzg7q3wluzkiwnm4gqey88cgsqkao56ecj6sl3n77j5zu906q9iarsedsw7r9humdaglqx4zo8beo3q2pxgydel7y0n4i2s71681jifsek91yolb5l5s56s9eqmh5wtjqua2bdtmpjwy27ltmi3omyz6umri2uziv1tqwl5q5r0h5ep46w0sxhz02xyj7yi976lo3p6wecpcqbnxdu16socn6vr',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachments/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments/paginate')
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

    test(`/REST:GET admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'bfe5d577-fee2-4e65-974f-85c5684b8337'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e801aa6e-feab-42d0-a2f7-f6c087d3c304'));
    });

    test(`/REST:GET admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/b7aea770-81fa-4f18-8a32-630224c46f56')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachment/e801aa6e-feab-42d0-a2f7-f6c087d3c304')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e801aa6e-feab-42d0-a2f7-f6c087d3c304'));
    });

    test(`/REST:GET admin/attachments`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/attachments')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1b595dfb-ec50-40c8-82a8-ad7d8f60180b',
                commonId: 'e7b06085-1a9e-4850-a1d8-288187ab9b41',
                langId: '054d41fa-6b4a-4818-8c13-b3cd52226b9e',
                attachableModel: 'oekivi6bpkzlmc8cmmjesey1d0l1yg80ixgfwn7105lbvfysouyu8q7qktninwcwsmvgyhkgfiw',
                attachableId: 'ddc710f5-d818-49a7-9602-61c142112315',
                familyId: '55c1fb2c-3917-406d-8748-728400ac5bab',
                sort: 613140,
                alt: 't6bb8wrrd4d0q1v78is0zrqun2s6trhy9d621tkvdvqkm3xvm7an05z71hyb10ops7tsxf85ltfsd080kpsugo8zcme56309hsamaji0hzo8a50m6ox722jrubjalrwly8hofpkqqnwl0rjp2j88legrvstxwsb0d77axbvjs4fj8oxo3k36j3htx8ya0d7s90b80ohlfs57ja24dept8n07s9jpq4xo2czs6makibzutit23gmtfqydhcz8fwr',
                title: 'dkeikvi5k9ahrq78hlupk708aducxl6fxa4lf4sfon397dxalgeszhkol3lektp59p5ug7fzz61nhn7vifv8ra6tzwbf6sfqjpwycpv1hi1smrm0a0pojzc6b3h3xeokxvqyqdqcjpysgl04knfzb07a929oasuu2lr00j29y31qlqv3cn42lxl75l5jww0zw02vnlxmve8k0fzcbaiftqxfx4cptwqhsx14g8y8opbfxlnpu2b4s3fi9qgc952',
                description: 'Eveniet aut impedit. Maiores placeat quibusdam nostrum maiores excepturi qui aut. Eaque officiis expedita.',
                excerpt: 'Ipsam quia officiis iure tempore quia. Et voluptates dignissimos. In omnis assumenda tempore. Earum placeat vel. Repellat doloremque esse et ut omnis. Quasi aut voluptatem nisi quas et qui nisi similique.',
                name: 'xxhym6csap7hj3cqh6q5l1c6b9yxmmzqpvmzd19gnb6sm9c7hqbur3rba002vtc055vx3kvy9lodlqrdhw5xxvhlcmg5doqftr8b1ysocvary49dong8exqjb4f741tfaybul3v1ii0yflgpaap47s8drujqq21bq7iqozhf2beuw80ygqb7nwj1t5ynshh0psk85mcz193u47lvdjexihvzphd7p784dsegndjrncodlzl2svikax0z90w1y2m',
                pathname: 'dt82m5eqotrnc9h4lrl0smvyqwj8wtpq8u0lkde1oydzfdsgoa3ewk416xsmmhr5aerlwgpmcahgi0ntjx6lealokeqc4rzjq1yq3lwtyrtlxc4h29jy9ie0pajs0yox6tp34pplgp1itb3f0s0qinicostmeq6qeofbmwyc1ze1iaqpiv95g98ukrtowe4dkq7d7f7d3s5s2wq1m9tkivdorjg5i42e34edvfak04zht1hc31oo8w7ply4lranem9ve8euo9iojff6bujwh54kpbklliz8qbd8xb1bnmp8j35ks87ike5dnsuwrqop5tj3yzu20sl157gjnnsr12l3k3k6s9qa924t9xsaqy3qdujladnaxnhj8j3o4blj77q3lj04uw6b19faiqhqy8htu65ol1k9c7q7ibazixkdkphbod960536bqibiwucpzvf9voxg3jzbehc1fzon7mvv1riw7wl9wuewo9l8mskxssxo2ca6cjyw27aycdt4ylzvdklmfr1tkhjt0zp7o6j2tklkbiqm7fcunh3whjm0ozd3zuwns3mp145ol5f481st3spo85zskz1xeanxdm8keiw9tncsjwm9aqbtopp0rnnq6e3qf62a7ciq8lsh2gk2njfgn1of6w6fpq1i56b1xifnw7lz2jz5qdp8cew0a0yugjuhdlo8ltc07cw80q1w5xvpz3ghymh9t6ij8w8vy3yx81jl7sm95kryz627izs1ecxwekiq12i04re3u165ahzn1i2vytm48ovgqhyu4295ujx6v7bklmvc6w9tq8esz0f66r4f93b6gthuyuma6z9tf5z6lb3tkprbrdr6ap1ultqntargg2eu0053ke60y24k09qdic0bdt0eh16p2lw97foyw488oc7bnub4jh4jdegnjhwxgb7qqokimc2kz1s6p4ty04uh61caye8zj8gu5zx7vy7tj97fs0h8q13ejb6lxv12ouqr9g1i3ezckbkdpbwj44yrimfn',
                filename: '89tjhqm69m22mfbsg0ykqqr1w64oie8xbd72lgv5gyi3a0kdotu8rkxormq02fojumx9uxy8jy0jbm55pa231sekmgm65vyehiv8k2cx9qgc9d99dhmraitml0mjbalcvba9oabvgy8zdpm217v42ktaz8v51oasv4xl8xtsts8hqltvcxjqddjn0otkcltpllwt32jh9hawbpeb2t26n72t80ddesuvj80vwpnh40wv0qb7jotjxnhj9edr7q3',
                url: 'zo2ym5630xeh16s29c4lz269k4ayagp3ju2fmmbhps7mempujkrasiwfgshvqtkek6aaw3gybxohpxqumv8vgo4i12m694wqzec7p3nlcdzwo8gnrsjxw8tcri86egamvnm5fszua0j9evj9ajrimfrisrt3gk7ycup27z7y28utf5s1jadvjkvye29tfxb9a7xs3zelui1t85kwukpxxz8zfczd3l6g7p9pjsolpt0iw41z0vne2zsrtss5fdgvxv0vw4t4hb8l4vre8i92xmjzp1sf9y75jckyjccxbbitqfwmrzo8foj9xexs2e9iv9mft733nzl64hoh1l61pmz4479yenu1hf1rw8417j1rhgyev8c2m84xnfh0y3k2zolug0idpjqhnd34j3tzc8ijf1r1x41d6kvhy42hxrf0w40arwq5bowu4tv5b5eg1rrqqzyqvel7uammtoa3o1da8rxsq0g45b2lue5lblesdtnt9k58ukv3i12dkbhax7egh09dvtnczh1c8b15ntlsapxt9wqm1qbburdv403ym6xf5tgpsuy0ya1pwlj9x6ebvj4nyyl8sm3rr42cnabaay7yunwbmfit0yd0benzhupvet0m7sat8xuuzxq6tz6c4lqp18e0ql54rn517f4zxs8udqfp49lulj0h7om67lefaia1z1g59su3cdwd24z33f8bhjlg7ytvup56vmz7rqj3194itdvt3js1swagm5qubjasand0cwixvxn5bi44eoylg618bl0g0gxq0hhrkbv9cjs3tduyvbvnqw91mqe0yplqhtwxlvc0msd83m4j7bdx89ws33m9thn1tjecjlhtbmwyo27r6fzn55w87awv3ou6gylks486wosb3hohgi54c3qtk8sgs5fcr8nygw8j8qetstx2n01locr7t3j5u1yn0wc022nvxmbzgn7xp6iwfvp1xdot4vwj08gw0ie5225my6b7jrl5nv7lq47fba4xabun4k5mcabq',
                mime: 'don64fpaqmhi1l9ritg5n35z6bvaui9d84vgywt1tg62pnpfbm',
                extension: 'gy8esstqc6pan0r1njkexquwi5eqkzx88cg6vt8lgwpmdzvv3c',
                size: 8480625857,
                width: 854494,
                height: 441076,
                libraryId: 'a4624155-6eef-4081-880c-40f3d7930f12',
                libraryFilename: 'mghf5zqh0ou0faznkoybymoryn4f3uvxqffzxa861emfc191hby8qd4la8kr330opzktbajtx17hy4jjbrsbeogjeeskh83jqwfw6bun5wpl42uierpn9sbq81nvpkmyqs66irgwywo909s3fh0ztnkcucgc093ny73e7j6al4ziiz9jbvmkxfg2r5kskfpvsiqcdhsjezfpn3ie145ywsrautm7jk7uhi8go4ybpix5rnhqk4m5292m7ss0h2p',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/attachment')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                attachableModel: 'imguogiv670520dnjqzcoi30lnjjj647cs19ewirxvqle2rnddbys8w8zkp5lsi29herlne1gxk',
                attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                sort: 773182,
                alt: '4gt7d9mj4mriq3j2s0vw7urorprnb1l6rw5f98q99z3i1odl8dmmzhvzvys4mkv8k1l4d6gmlz4vkigkmzwy968jsle69f6ekmtm1jmsjv2id0z672iu6h3migl9zz8tovjf5hn63itxapnc7umvbj0wotkrh427ukze6fekg3mox6a154y9xb13fcaz5vem8kzov8jgw5xxa9o6e7pqmp2gml5t3q8tkovdo4evlg65uutkp95zey7qtns9nw5',
                title: '8jyycu5e7n6drih77mmw46a0g4vjt2y1m4pi4hh82t906sdn349shq1n35j3mujmgr9659v91j0s120bzy0ijajmnftyhekd2kd5w4l8rpd2jpvsdfrbw6p0atkc1f1zxda3nhcpb0pl5bi1ucjzskqqerezle4o8kmc2r0wxnn6c7278chn2mp4dg2hyqo0u2ywa3klm4d5xj3ah3l0sbpoxk73ug69y6kzz0pccc2stokcb2i7cn43lebzqch',
                description: 'In ad sit provident est et numquam praesentium culpa accusantium. Laboriosam facere voluptate repellendus soluta illo aliquid tempora ad. Architecto est in placeat animi debitis molestiae voluptatibus. Consequatur placeat ipsa enim optio repellendus ut ut id facere. Et suscipit ducimus perspiciatis aut quia.',
                excerpt: 'Accusantium eum illo magnam molestiae veniam qui ut culpa. Accusantium libero magni. Deserunt a adipisci qui dolores. Exercitationem sequi illo blanditiis fugiat.',
                name: 'ofuwh1q8v1pue6x5hd92pfnfwjbh7u39hgm45muc15fl1kwl0e5yx01zkaxdgxgeow47xuoxzv45974yv4o9571zw7crrsek2hiaqvojfhy9puwtyrlrmw54xp7woi7tab627martx9epbgo6b6hudee1l5w4upj6mzeengnzrq71pidecpi8r1u03lkfpnckbvk0tbxca77o5x03ovp69djqlfz3hiq99glwj2c63xld9nib5uix44hum22pma',
                pathname: 'mujiuym0oh953kjuj01eh8qeqlqjivitfsvav4w0z3ro6e3zv6t6p7ocxva84f715thogce19apha3hredpmfweti5gzkol9f2rs8naapiey8ml090x9tqae0a8h90a9r9vw4b5wcjpr56tpn9krkfytfn5rj1yu3p5yjdj43ua87n420tklxkar0g436atawftw5c2iuk56lx521yb0c0pr2u64wsbpdfu5jf40xms9ha70zw98x13arrs1fep9uxkt2u4nm676mwyxisofqi8wcmppvyzh5iojsya4or7vqulyg911otbjbsc3eyswrojr6abuhezu0fcrns68ltwa4wxg5kircq6o4y31nnl36thm9ndb3db5xbsiivhr2uvn7el8wdi5zmubxcy4kvizdah3auzr0aiiv9h2e2a6ytclr8j912n7bwizeblxdolt0wow2khe1k4iinn5fgpw2bvtakf1dwywr5n6pvgjl9ki91nk4lkgjefcj2ukpf0xc396l1mit2amncoufy5gmk8ierw7si8b0xfim88pvf2agnf8d69jkcz3mlts4fordo6fbktmq4lwm2p3vqqvpc2gv1e31mr9um9rsvmxz97gxeogkrwqa08wixk01k5kpcb8w50nj5qynslf0fyb0iqmbexdxw3ewsm9ohonk88ddj5u4dz3mvs6afnv6cjstnd1461jwzmwe62492sdbkfen4plze2k0gzf1oee6wij4nnqllfjqyiqgt8f74inb24xzng6h1lmu7ft02oyx6uhyv86l3r6t9h3cl82u5f5i7w9xt3yjc1jlfnmgwcf03a0xl0sz2ycvfxdqbgk29hb7cgdci2ve14kokrkkb1uh8hwo2twcl5aeybg2qmccbul5ci06nd2etgu57k9pmpypuz1d60xrxy7xp72yx12i7btkjdromjqtxcttior02zthgzp3pd3i8h0cuz2dyu9z1ld87pnxrc84zvg2m6ybg29g0exb5qv5uma',
                filename: 'rokdhidj6klzrv6zlds34ye5mbll27l0l9yxvla89q3kgsqjoyu521xpk0idjuurvxaygirq7jjh1rtiwpreu93vagbjur8ecemt9p3ck0p45b7leb3gfhzeiypyrzpq9jnjslppb6tw5lsfqa10lvnwen9eojwbgsna3ty7g2mbklaslx2rdk7q7yqlbj8wd5lkzrk7ty0s0ptuc2pkvslfb9xps0hkwavgj57did1cr8y7cnkypsdgy9ur0ut',
                url: '4uaio02npzkss87t9rvp30i0ebnmuw7hmu1n67k8fq6xb0smdebcb7xwiuppf8drc8z7iataz517g1qd76tnd10kftwvuih0257g6175fd9mt43ramf6qwmc1jb9za0eo73figsqquy5ertp657c8l6k86cp9h3hnb3pnzlwe4cymf54dd5q3qnjtjphtkzpfswald78hofcvexmabltsx8ovvjcpol2hd3qtl1n44mau6bnyrwwovu5pc05wk52r1i6tc79sp8f9rhx1zkt07xnsinxs2gzte5at5bi45boupl2mhm9z5wqle163p0jfpehh2c322ldis7b95ay692ocqtek5jigg1l77n3dmabirbpm5schbn0je4tyenhrvvqhpyoeuy8hlfn7kk26wylnszf31rbvhl3ut2r0el2e9ot0t9ptg8kqx7gsnf9upku5ip4rdq21iq8ryxbi90llgzc7m4oakn9qc8uw6cyunzxjqd91oohjm3uhnrmai3bl1mpt40dxejinyqtpiciniptvqp63vtyijg3xmkp0difshqzi3rq5tb9s3o0r2r60xbkk6eihewt69q6cy3mysxluwjfjqs07mea1do1hq3xuu32cpxxc6nd7tet564lezdqk2my8936w8kmx94czlkqjmjsto0mwsjny523hc49hcly32kg8c3ys3yv7itteyjfg88k0euvlt4v1957m2deowgzf3oelqebdrpctr7zzrxgee64jbjpl9xx64ukynnw87dqqyab6jvn6o8py33c5ghnifbqs13wsft2gww4fndre7h4489iqi8u3ny2yx5trit3usg992omn07x05jgorrxxq0fimart4tzm47obwo1p2q9jc3yexoxm2h9r1473cizcwob2ixheb48ajpkfv58sh00j82og7n9ukdb9aqnvyu38fur8xaqd47rq4pl5akhziqbiayze7hm96g5nthwf60t6ekithzpevtiyymusfdjl3ph3cb6',
                mime: 'retdwolcuh9s7zn4t10aj585lf6shhsu3j9gqxmx32xv2fyv0f',
                extension: '9yriswknma3h010xyax8053fmzw347virfglbfi31eu7n29nsp',
                size: 1740514773,
                width: 109966,
                height: 724084,
                libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                libraryFilename: '06rnyrxvu7rug5ulov21perqt2u9bywtqvaqo4dxz0gxtjvob1aihxsszg2r3azsbnbby8bve1zbpym5cjk064evqap43knbj6sjhygpock78c3n33leay148sp7zynmvzmho1jj864tf7a8xe9u3sjfim8rsssxb9qtpab2t4xskgg7yubc9qb7semhcvyfzysjbspr9qp1w0blrha82vxfg5fycrdduut5ou81ogt17nj18ip9sd1rni7xgro',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e801aa6e-feab-42d0-a2f7-f6c087d3c304'));
    });

    test(`/REST:DELETE admin/attachment/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/d3e33a0c-6905-427a-9ef8-809f979264c7')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment/e801aa6e-feab-42d0-a2f7-f6c087d3c304')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachment - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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

    test(`/GraphQL adminCreateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateAttachmentInput!)
                    {
                        adminCreateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e9fa8a40-79b4-4013-a1e9-6ca344da45c1',
                        commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                        langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                        attachableModel: 'd01yirjdfwzuu0gpk1r9j46gehfmyt25zz8s5wtu5ylptsizhrzka55t6tclz6e7ba6qp9tqsqs',
                        attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                        sort: 556602,
                        alt: 'h145y4z0kau04wcdflne4aft1uo6yi3b1ey0g72mduo125m9iqwog4bnvgh1twf0q4hzb3xsyldg783zlfsf6trurnyjagf7nt1nnbjn0y3zr04vxur5dqoauh2n5x76esxdmlweo9go2gadix5dkjkx9yb20nbzfy5j4kjibss5sv1pcdywlm6itk41c4ju9vemrg67bjjtav5uu17gunpij9ennfk2vmpun72447lb5bc8q5vkc2g6x70juru',
                        title: 'kh62ksoer1zq3qxjyxlbgvtfwm0zha4p6xv1xa8a4lhn7t4qysvhqlu5m9z3dxheu9tuztsygxlkw4su9johxnbatlpjxg1og3f4vg1tuv0zg6ro9dmbar8lag6lj1duuefesoq5ioqwg1gqh6m5sffqtmooexz0y7h50efpwdmyl1higy6a1sfkbo9dpnt0a0z653teb5ifi6psakfic4gi1yayvuxsutp11kr37tt90ng4yzz2vjm20t6zi9y',
                        description: 'Nihil ut quod mollitia assumenda et itaque. Pariatur occaecati necessitatibus. Praesentium unde maxime illo sunt modi.',
                        excerpt: 'Iste eius excepturi atque et eum. Non incidunt cumque ad omnis. Officiis quis incidunt quia dolores nesciunt sed error voluptas.',
                        name: 'x1bgt4rb07rc9w0v0dvhp95amx6tz1zsdncsp39i4vlhtz8pd9a9983lovctiyjzwyvew2fvxpm12wxuqptvfd419cpdvvpo5aku9dyyjngauk7c2ny4f6zg1n37dby7ydyajoids38vobkkwlu6gfjekm4062ohsq0yth8bsbr7xx97sqdjn20m962wmq7zvace98t02fvepdr71hdk9qho4gdwm927qo3zgotqkou1j1egta5xxyka3h80ciw',
                        pathname: 'j7ve7b09dy42q537saffl0l6dtiiv60aizzc0axzxyder38q0286l1g6vr2ykb17tk8jfgjwepp0gizcwa4nozvkkyuywej357c944qava15vn59poip0l8gi0dm8j26dwwk9214ptkxn7u4rwizp8hvcr1f1x1zx6e3s9i0ra3p568la9w8vblfy2ehx08gjw6e3ydj10y1scoyaz0jsbbi2894jmansun31kdqlgysuj8sp92zwak5ou8ittmicrh4j0u0hf5c6m8apmxlzom5qldqhtx53gzdtn7mpfc8wylcx6h3p1vz5ebzoogrhczn9n7vr33hzylm3b5h932ewrzziqo7pmwr4jn10nx5bsz46jvndt7tlgvrdjrgahm0tvjnnseiogv6zez1513uu7w4mhyh177mw6a7j9oz74hel7fcmfeodvty8qox19j95x8ir2owf1h3okgauj32p5tc7wq5topahgq7vlvc90a6p3gmv6fy4ap8gzf7zrnbhtph8y28qto9zeufddeb1t7b5bl0xwvxwxgjjc1hro8zexxhm0jxkcfou0qagmyk7gmg17s0y648swv73qxy1uoq8a40emdma40jcmgku2ts9tzjoltl710owxzzsd0mmy3oywg96r4xlki7vst1unaa24ys65u8vb7j4lcyr15tpst0qh5b97txxts6gp3jj73qihm1rfc33jz876tg1vf03zaovvcef5d2cec45s4eizz2p83hltk325mkzdck22mach5k05pvv0jjsyi7s5zkbh3qud48iwny7xeh8jboos8sinh41wwp3u82zqqd0mwjdjwtev1n4wcciiox7mtysdiqru5k9wxk47baa2ggsvijfr4rnp294z6kk1e6hnomr1limbhfltyqrihhtnd90u9gcl04bushmtlkhpdgw3iu16824b9l9aczc5hab47em6w2hmxuaic049cqj231zmwf4dmecpnzdec4t5s51fwrvswtstg4r9a2',
                        filename: 'qps0b0terb6wswwx0i7y7xckphgu87v262szi6ydp58hpiy1tqg6zt6jx6t66b2k6pfsoeu5gnzj9fc1ohx45j05dwjko1samjux06vr6rytr40hhntrmb43xndtphutxgmg39801op3yb4reqfqhsiecv2voyvsqwy9fr62j7i479qg6u2cm65lhehsti0pjcnnknyf1bw6aopocgywas8qacmqu7lpkuplzll8lkb3pfrnuypnswvcle4lmrf',
                        url: 'p0bxjr8xj4c7o4jtxgxqfaeciuhdhiq6e2lro7zoo86fxie8w3ft32pmi1sbc2u5y3v6ilbx0c653oh40pm8nldgbvzzv69gzsymp8spqtnv7z8sbcf5xs30w3j3xieb856c5ap9hdp2ta8mljj8l0sgxsqkg5xcpixfasbvvdlr3yavqidc3qlx2i92xi6t7pvu5zctd6565rtzi90z0b7mz7pkfp5r5zyj06aluid0pkudogq9sof4i9qphsao5zeca0nys72no6m2e7drtepa0ynx2iv8yfz09u1w4x1eb5ylgfd5f6c19rksjimtqzbw2ji0cn4soshgfny1kyavs1xe29iso2ji8mezqqxunw9wbtnjf7atarld5uuxxdi4dzwb8v7vac89vihhywsfbu5aylgxqu017dbct0ia038ytkahfp7uktjv112jwkeajv9dzeaxlu2fi5a5dr33tbnnio86xj81seevf9srduhv84dcluh96s0rqp9olan9wmqxj8u8vp4e9rb717ijxpf4fgi8m5c3m96cnpox9f3v28blf9igj17utwl3wqmwhuv2532veytjrrnhgo0tr8bhqi4ad0cfm7tmu5g1u9njjtoz1sp3373xauuoxh0tkcwmfz38toejqvb9383vx8zylosw3dhgmjw55bsk8r3u7kxg8vrmpf8xv05csgiu6rd9xl743yhlhsx7xfcaslbasvn7e9ycrkv9g914gscsyvildnvpav1kgtb5iggvnxz3wav2y8kok90kw75jrdkc5yn54bxdttg4hos4sw0brwrzy0my24lttciy5fdeqkrai18ga32w3i7815u1jhh22cxvwve91v53lnnzzrd4xl7z45yyyvcyr19b8qvi79jvej5fb3yz32k5ri966v7z7bb8ro31k85zc6m8drwqgdrcgurjk2lsdzkscfczs4b5xa7tqzdltog6iple1yrlqeza9ipnlui7bdx77cxrr8x71v12l2ga5vkn',
                        mime: '5d5nv1ltyrn26cc7odfsplxlca8uwsa8nviqnobt2hx0dpd5rd',
                        extension: 'r4fqoagcbk7f8w4c0e8ghk5iaaju28sf6b3c090f3tib9fptok',
                        size: 7485426400,
                        width: 197611,
                        height: 429213,
                        libraryFilename: 'te6papfx2zal07vgcqx4uq57a9j7srp0lb65adm9922rhi9vvyzz32059gjfdfz1mkhdr513kjpq5e57h07cogqip0snrzckxg033m080atjw9hs8kph823bmitugle40xvqwcx51ztpemav7awb5qw3ad8eaqunlvlnqig745yi959odd8jxuwz39he09wvr8mpo1xd7shh4lkfnrth0ef7vc53qexctxphsahnlv9oe50qkiu3ti295mildz6',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachment).toHaveProperty('id', 'e9fa8a40-79b4-4013-a1e9-6ca344da45c1');
            });
    });

    test(`/GraphQL adminPaginateAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachments (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachments.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachments.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                            id: '146bcb6c-380b-4560-9972-af8ccc6dc9fb'
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

    test(`/GraphQL adminFindAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachment (query:$query)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                            id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachment.id).toStrictEqual('e801aa6e-feab-42d0-a2f7-f6c087d3c304');
            });
    });

    test(`/GraphQL adminFindAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6f230fef-35e5-4a41-a652-d2264cf30f54'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentById.id).toStrictEqual('e801aa6e-feab-42d0-a2f7-f6c087d3c304');
            });
    });

    test(`/GraphQL adminGetAttachments`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachments (query:$query)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
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
                for (const [index, value] of res.body.data.adminGetAttachments.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachment - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '130b91b5-aa23-4406-803e-45ea08bd2196',
                        commonId: '56cc04f5-99b1-49de-a6e9-a1ca5b077124',
                        langId: 'e0031ec9-ec28-47c0-84ff-4fc34a0ffa22',
                        attachableModel: '4q0y3jbk7kmswbfy24p1amm9eewkepo2jjc44v89q8e1hur1smq2i0ntrvtmjmhdy70kkswkmgi',
                        attachableId: '630f6fd5-129b-4344-854c-ce1e2d6fc0c2',
                        familyId: '3557fa10-5c59-4a19-90c2-b9f5e9e9ca0d',
                        sort: 933334,
                        alt: '89637l85cl3a9itrcvrux7revc26zghem8h0s51myhyvgpbhr7wlng0jcqyei1i24imhfpgzzad5u24fpbe478e27t477vh7ssn2yhq2pxu1dbrdlhbplols3qzk9knf5401tyrxp0frkc7qtcklp4alcjn1v9jqdvrb6sthpx52d2o9ao7ogm8go0np4odqb0xd2hoeko446iq52f13ydlcex7tqzhl945gb12xbvpvvhx7qvlxa7071yidgk8',
                        title: 'oq38ke8ehz7i7b34b4aqaxa23euq7sojmrq9og41b5fbzk8pc1wy4umb3u17776ul2sgit4e62k19fdseypyw0ej66ebknbal337owkc2e5r3hl46v2gy2wjn3gallm2uvrnoz3d3qxy5vrewpyy7vs7uqignea4q0h1olcipze8aixm2qstikogoqfjnd5iyfge319uitp0m621buj24g83kou4ay53cfu0xnwugo3va2o2xi1gpp28iz6li97',
                        description: 'Consectetur velit aut est blanditiis voluptate fugit est dolores optio. Quidem in rerum minima incidunt amet accusamus. Mollitia qui ea velit labore fuga harum odio aut.',
                        excerpt: 'Vel aut debitis enim sunt illo numquam harum doloribus esse. Illum et eum ea et quam velit velit. Ea et sint unde. Velit corrupti ea voluptas ipsum aut delectus quam. Corporis voluptatum facilis quia reprehenderit necessitatibus tenetur repudiandae qui. Est autem quis omnis alias.',
                        name: '8o619x8dp4kqwg23nyzndfse0w7303vz4jyn5mf16isskq6p4zbv4dyd5gvyv9lmkt625tr6bmb8c8ggoc50m728f9ib2zk4wrb8vfck0sx1pvaho3kdswqwezcerqu22716w3nab5rd875rnps4vrhiykmtxsalyebib5twfly7hc3s6p3j8co74c0o6lh0pbl626lga3b9id2xhzyr87i09fze1fyjn3trrf1xiabw6cmmbwzoy9n07u4i47b',
                        pathname: '8x9info2n21kfl4qynco9xmtfpmuyh0is4spwkmpbsvzi87oqthoq48q1wwqymeppsw500e6dpjn8nithi11gqpn4e916e1z9chtv89zdkf42wvo9pfxed66jomf12h0l7ryvgxpssszmz57f9tsffbji0nqzfp17f0awo30dcr81g9j9q76kdrdxv7bdvihn6crj8o0y3ev1l2ducbutb8nh7auqw2x7e0el09zy8fkqogtp89d3lsqr4ukq4g3ggybvkf5qk6i46rwhvfwle6dyafc9rdmiz3k7p4wu6c7x8jckzsbm0orcvn5p84zp7wl6xhmhr8yx4x14ztr7xzue9assjelmbzk31i06xbb0gv1y1pdeybqj9lw536ufc2txtwbmchjh6ig3t8fhzhb7tckavssxi93yy9isrvomhdvuabey3evb9thr7qyvb5vjbu9d9w34pwnvbberbugf4q4vagl84bvhmtmcdzoxw3neopbk3ecfcb7seevifh4w8ld6wizgaqn6rfup90mxjwrbagterf2s98hi6w9gcc14h2r5fwzacg8jy16x0elg8j0003zgwgsv8pqy38apgjm462ppfr1oa662il1nqxiwm4oy50uvfzkb74h8dq8pq0rwlnempydbjvenkkglweaeyy16qucu98ndpui9r5ai57635x5xg0xqvvsjkmzambay0ezkd8g791ufbgbjotm04fp5wbel19gljvi5h0akrxfha3c292ilfdnyd913zcgn744yvltzebkqeds3e2tjxvz9d1t19lyh3c5cyynjuohw0xquhaxkbfgiy8d5klzlayv35fwvaaj4mgq3zv4yubhblx3x2sebsorb0b0f1e2li1y39y4uke5lxhuuwffwx7wb6stti4mse2bpjw353ez5ns4g3xyjttdtl29uvbwjpv09p4x085gix9lwwg0iwrpmftvmfgkb5fvuslg5wjx1irk022lvn8zhd719hf1y0olvni0z05o',
                        filename: 'w41dwtw31rmqz0biy3k49am0sfp28mdgmsffz2edwg69n15b5tu5m3xiatykaxdmq3ahk6avb5hdyp05rjplv3nv910qsqd5nwr6kxgpos30onxcfqfbw12di8dpw26f78el3zu50boncvpsvc6r15yk3zqxytnpeeixyexohgjb076vd6m9wo8seie3u5869n8zud4txwdw04jqeujragcif01o00vnul2cw99qa5l08mbop06tndzrb26wbr4',
                        url: 'kl281s0ox9evf0gfld2b91njvifvmih21tlvptou5g1xao930t5o6fepv493xn3tc3e836vnk4id3acbm8ocbwc5jnnz8blne8rvkeq5xcmdqdzyo0hpni5gtrx615eb67ifch5louknvdkjxyt9off98ojtxobmismvm6u3y2jutlh2rq1lwy8yr3qtan95nx3ow2s8a1wx3yonaberv679fia46x8dupcm3scwpqsgg15wdzda75r6qpf3n5o8b5mkfpm0wlqy7lys7t66vwawh37p6mvziyqugngj7bt1dk6gxejpqmnbcptq28wyukqkcthfw8rrsq77z9r9obvz8x3uh9zn172i8pc8xj45rdpr1ewxn5ibx9lipjm1l47mdcnmm2pwm8roy58m6xu5dz4w41pt2jhctv3bweg8y3aduzb1j68xxpds39okfk8zim60mhwbmit8pql6pz3nlqww4iheqf8ikrbr0ka3372lyprk5kuw7st14su9knb76r31b4e82adj936msbmgfdq4evlivwj95mkyes12hbp7qb9psebq31g1jybr3d9ppisf8iz42g1zqwg1q0d3sunz7jmu3w53iknnp04ixfx8i1vz0v0djscqc5082a6t8ag9b8yn4bmgmcd4fdndgrb61q5ooslhdqt5iibl16bx6zp2mfvdah6uj6ddg4tkzgg3vt5wu6qy9uhm34m349qiiubj0adxg78jcmgj2cj065kbuu6qa6rfyxd1idqs0gavadupnv68mb0chwujk2w48kdfv5mrsdcv3w3l1hx6pxvv5sqywdpk06dfsrdlumaaumdurwb3na45ucwed7w3h4tphy88dks1s7uqxvgzg1ub235pnnoiij3jcc156at3wdgt4rvv2cu34jer9k1m4hx9h3y8jw47copwmtx5uqwl1d91h92ihalouy1ro0djsxvcplosacrzjdp8fkqb5dlwydevdslnxt3yvqpu6lz29zbpdm97u52r',
                        mime: 'qb4csjyl1s7s32a5bhuhdzlb9oeqzd75cfmxr6diia20pcishb',
                        extension: 'm4leie70i9d0mpf8e426nyknidfs7xncc7jyeg4jizjqq7j47y',
                        size: 8698235361,
                        width: 203291,
                        height: 676859,
                        libraryId: 'deea8155-df9f-4b8e-9e17-3626964083ba',
                        libraryFilename: '1nyjto6xevlm2m0v6e5ishhnefl3qxtj6ioltzu907mvvs5xnjnw4qp0dptmdkua6w1ngt9gppead4vx3jmwmh6cfr2i6dykov1ztp3nf84zagah8spd436tigtqc3c59q4e0ilrm8om61god7jzjx998qd0gb3r8tkp9exntsbj1cntodawutel4vh3oj7fjp5wfz70a23lv7svqnjyrrsy67kh5dzdnx6gi3q06rmisgeeirwf39d327r7u2y',
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

    test(`/GraphQL adminUpdateAttachment`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateAttachmentInput!)
                    {
                        adminUpdateAttachment (payload:$payload)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304',
                        commonId: 'ed3d4dec-3c8f-47e7-b535-5eba90f7ada0',
                        langId: '3cafab8c-0b83-4c13-9a00-7c2314b1e107',
                        attachableModel: 'iznof39nvi15lsgr899ktd930inuxwltyo78xllzeruxod5ffik8whntgb47xnpzr6yqydhqh9y',
                        attachableId: '20dbe032-426c-4c4c-8e3f-a05ada5de542',
                        familyId: '464f4a36-02cf-464d-87a7-99fdb659098f',
                        sort: 845115,
                        alt: 'gtvx8frjsdk4j40l9chyb69dfnqltfyx9p4ryirrmflomlascivn4xhmuzta7g94bgo94vgx3osqw27ptj8vdrbbto7cb1mki0g2fxzgwzkp559jjjtc5xm7mba575241eskrzg4h1eaw93nhkwlxgyjjzhnfminrp72zvt755lzq15qz3kzy2f5ua6cpp8gz9f9phed2sn41tzannsyx3pnbcrqmiqvjl3f04idi2sf3kdzb7ch84it6jmnv2s',
                        title: 'aek0hcs3wik5xhrqubpyiro1sl06umiyr2gjd9hnoet4rl83ktmfs38z82xadbimgwuaojmgsgzqd9j3vacvw67zegqfx1y3wykoc9x72acgd09n8fq0b7jvxn3c1mjeogm98bxfpk9vle7mn5j0k125igx9bekrlchpfarbglf9j4acqavae3egnjihmzjh1s9l27amctjjby2kk1jsg3tsdgol0w1hcrxpvyt6ndl2x20j1xwmn4p9d2yo1d6',
                        description: 'Voluptatem dolore odit dignissimos. Est reprehenderit corporis molestiae a provident. Tempora autem non corrupti est sit qui ut culpa. Consequuntur veritatis velit eos facilis. Explicabo veritatis dolor optio unde nostrum dolores iste. Iure qui consequuntur rerum cupiditate ut quia.',
                        excerpt: 'Quae et est ducimus quasi voluptatem quod ipsam. Possimus quam maiores. Dolorem molestiae ab blanditiis asperiores cumque labore eligendi. Sed quasi deserunt enim voluptas quo. Minus eum rerum maiores consequatur ut labore distinctio nisi. Iste quo veniam dolorem animi odio omnis.',
                        name: '6h5f5tcz2umqa8vsddqj8k20vq8xv1jz6rdwa2bf2p4psrceddivu00jgcnoxyiqaw52zi7a2hx9whaqr2u51qchzk9phi0juzugdvrt58fgc5zyx7f8zjz0yfdfrvmd51obldiwlid63s4ag7ufrf5qk4f11dspqed4t3qpl34neqe3oq5b8le4qfb63p72lbw40y0g41oj78lbm08i9pr2jvq4vbertqg9dx7so4zjm4ccabmxls0myl0l5ma',
                        pathname: '73nwfg6acfj1amluwd00zf6hvmp2q82fsbxnqkc8x8homwy8pmcbq100iesd197o47h2u1di1e1u1mxpe0iuk2i25liaib2hmnoj8e49d3lhfj3olg28ls42jkdprf2dqyux5uw6b4muww4egkzn8wn2gkuepc8bbcwldcwbcnq1m23mio1zg9vgccj65aknaw1nsdrqq4x3w4mmo8k9cja1yxlsk6tew2bky98qxrxqmlp323wjaioaf8yw3pg5noua0etg3zcldpaadrn8wga1e6sgc6plyjb08yrgojjbsg0yd5vnhbusatjmrvgwlzf3gjyw544lnytquejlrmxp1sbx2l50wdkhq7mp670f77wxcpfd13rk38kabvkno3waqu3hv174o5b82sdjlh9xg5ax9bsc0ksjou16k48ik851v9ouaxxelensd8n84h2czwyawging59l5w0v5chgixt3l8d6ak1u7j80unn2ma5oa8j6lz095szbn9ez86ho4pn6y6toyp6qtg3gmgmp51cdx8bz7brzh3461k4zvl4p9ntd1kvb4ftrba129bzwy6m8oqo2xsv30nljmagba39dht3aoxdslizyueuh7x6ftqwdpahks561zj8lqgj8a9ls5w6a0vmico3g7y9y9addvlgpxixr675125djphrutyt5f4lvdurgp75y3cj10x25i5ywyb99n0ek4a0lmtcvwfpic3q61kio0pxv7bwl4tsaijqj9st09a5girfz5xzmewxai5efk5qfdo7skienc2ia8m05gto4i1a6knbs0n0mzpodm5zt9msriy470uho30l3qu5pul77s7b13lxwtkftijah7yaqpmdqyc4f7puanv58z097fr466pjpghg5opzkraoqkl4q89iyurlcvco4m21aulxiock6jk9fprnuawigte9rug6d3x0pugasnbwub2hpa79utu9q4h3vv5x6qty8czezbfzqvyxk5mb1ogs367cjq2q3',
                        filename: 'cio0hulqc1j7sbhh775lyjadqob7yq5es4bet5qvsxn7rh0pfhrh993dr8bbr2isgsc6qzzetnec2137w5to8f9npgf4gmfxd44oi5251utgvhga7rh17u38ahnfvsqy8gmo31chihk6yrfmn0powmy6aqzwh2j9k64w8hm5613rxyb7it25w6p7a04zttqnibrghhaqgz0as7ssm4m4whwiqqsh0v5ki6drnbgt3l4xmwnr19ksbdedf9xkwxn',
                        url: 'x4msk66tq8kr6el2uxd3cf3779z5u4xqinswhq607j161xcnsanl5143hmv2sly9j0aiq3ybm6gtopg3ewnyvgdw6voehzoco5lt2m0tc0zkfwnr8hqd8ggfz3uxqrbhnw2vh6l4pfmz5xfd4do22jf6kqlflbvbe2f6somcma8zp1flpow6qiw6018e6wttc7dlv3pyhe3hm7ubkdowqe5wq1g7kevetxqark0f9arni19nordj1ipxguxt02garlijz61yy4dgibfeaywt0sj4sgtqjceyjetprhtl6vyums6nc6f09hd77mt6yqrraa530v223wycwddcj2tnq08c1pccn85w8cnfu4vwha6b9h5b22m7wtth46w80bdhy8d3yo6jqqqnhebo6m6047tk0ywziv88x67o10yeqceff0w1t4df4vs19bvs974knu9l1mwqg1lh05h45hy0wofqn1573ujfurave6ick10bw86pp2gsp10aishm1aqwgnr5srczqfn9ho3gvvxwjikpkts28shgwi9u4nsnsdxiio981xe60mci3y1a1hsptdiejff0ouydpol4o1q5gc3fno3e1xshcukacn0av40a7ao6x49klhc73mhlcgzoip2zwtq4mcm472tj0zy7t1bdcq8ibk56waedt3hu6pss5dvqkowdjtqzypyzao5vtzn4ml2z141xqas2cjgi3ab317ul8mjvdy78mg2ucevrm90c6addlnev0462cy87uzfxb737u8zufnwooezgk35zikl2ia8tp2j0d4sin3j8wtvxjmaiqv8be8tby19812dneg11llbr2qus0ba410e6xp7h7m1767hhe3oqfqo7xbxoqzlldymm0b8gjeiufq05693kyesvgzi6xju9tzn7hv6wk0mu8ifq4u2mt6g0t7qsq60xkktzqxjmydfu7s2bffv4ngu02bayvfd02wqc145xl9j0phtqlccwzg0rwg7mhdxarpwn9ihcsjb2',
                        mime: 'lajae7384njjjv5vp78l6rvk9rr46doi2sljqigyl9p4fzfisv',
                        extension: '8kjg0yqtbm7wky4vt3pfc4u9eptb21r1e4er3fajt8fdj8nalk',
                        size: 8936975750,
                        width: 955484,
                        height: 938284,
                        libraryId: 'af70e2b2-061a-4a45-819e-e5ebcd793fd6',
                        libraryFilename: 'dj1dip4j9nppsy9bhg8kpkt8v2aqz6lsqiokd73cfutvx46xj1rwsi25d0wxemrymjfz1nt4ah24edhxxww4my7z7ij5xb4ll2xcigex97xakcdzhg9wjj2k0z9n0ml8pf5jnjkc4zjjyaea9cmuv4c71pkxlqs1f71v5os6jvpgbunmiepxw0379woo569p6qyhp2ebk4a5ik9utdrfrykd3l3ojm3z5wyocxhzdnbp8eiswkgotzm8s70kj0t',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachment.id).toStrictEqual('e801aa6e-feab-42d0-a2f7-f6c087d3c304');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7861ad0a-fae0-4896-ad64-a3c007bded41'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentById (id:$id)
                        {
                            id
                            commonId
                            langId
                            attachableModel
                            attachableId
                            sort
                            alt
                            title
                            description
                            excerpt
                            name
                            pathname
                            filename
                            url
                            mime
                            extension
                            size
                            width
                            height
                            libraryFilename
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e801aa6e-feab-42d0-a2f7-f6c087d3c304'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentById.id).toStrictEqual('e801aa6e-feab-42d0-a2f7-f6c087d3c304');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});