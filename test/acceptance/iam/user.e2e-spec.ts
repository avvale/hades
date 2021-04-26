import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '@hades/iam/user/domain/user.repository';
import { MockUserRepository } from '@hades/iam/user/infrastructure/mock/mock-user.repository';
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

describe('user', () =>
{
    let app: INestApplication;
    let repository: MockUserRepository;
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
            .overrideProvider(IUserRepository)
            .useClass(MockUserRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockUserRepository>module.get<IUserRepository>(IUserRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/user - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: 'sxjtlxt8tjpd6j4rsanuu5hd3g76sxm268rzvb59l6tihbdfmlrd33825m7wpzyxtipqk94fdtl10flskf0cgg33wgsne8pdzt7fv3thyri3i7tkhh2qymlfkta9vq51om9wl34qz4n14a6moavooxamwjfww4g6zpih9m0r996d6r82fp875l6su82p8voehpg3acrxfh6g85p6plthtibmcud6vh0o47t3wsn24i07t6gwhrb1augwb2lem5k',
                surname: 'jm5k7iqs0rfeb5pogyejvb81ayc1dzhbqujvoo0o9jvhgta4b3wccofg227qt0x84tykfpb0zb0hy8ndb13tf6y5vumi5nur0oyi2k86xa9o8rrnymnnim2wecs14hdqs477bhjandls13u0zfsz5ftq4mfdai1qc67d5uxtjnme4wwlgftve05bp03i0fkbk9s0bnb4v7y09y5e1faycs152liil8koaqt33thjdg6vyvur1iteul3v6evkv27',
                avatar: 'yem5944yshb5fol3q2c03wy88flr2iiqzuq6ek40u1ref2q6bvt12sqo055dsxaklghf3qq4vus5alk91sfthq843cguknjaadpqyemkirdvu2enyk665cechtdoomp53gitf59tl1bcgwb2kqr268bt5vlae0bmypgdqvigfkaygp0vt2imo7no116xx1pikh92p2s3r6rd3q9uskjwbtyey15k5b72c1z1yw5sq3fscj6ql7jad9mbexohlk9',
                mobile: 'kwaag25obqew7svu1uj89dheppj8kf3u0s950h5m04ukxqg63sknew1qm1ww',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: '563vsyg5oip7dgefpgice7wlcbyakcmlyqjopsjfbl4i61irjpmbn250pyy6b3318f0dvrawgny5b81v71sy3hukd5os65sts4rxkptg955lrv4i3d4q657n',
                password: 'r8d5zr4plln0kbrarb8tq2iib14092ihqxs03zg3f2r4uita1d356bk8ssg6kh0rkt5nb65wzcgsvvwbf3yts4eodx1cx53uvcm842ov7xicr6ztx9ppbj2lt7f31m838njvrvv6ie3s1oei7ql7kj41qx7h663agnzrbtum5iyfpx0g37llf8gcwfa6iwj6bv5ye24kgwpd3qsqzhnm45dh8885c8wpbyceb4rqswgb8bexrlmh32abz4597qe',
                rememberToken: 'z6pz8igkmmtos0nayptmvwarw2mlnfih8e061q7b7zxpr3attbcu4u1lfauc31ufclaxafq3g66rh043aujpyedvifnymyty0uqjplrilrm5yta030gydjyhcuiwrbhdei8vjfs01son3rsx74h8rc1yt9dfez7izka8wy8fi4v2xpat9bcko494ki0qmjri6zic6j3df14fvnbon08nhqnzg87mhpqhmmdtg76giubieputibj85cbbauew5ak',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: null,
                name: 'g1msk5exl0zawcf7ilp3zkq2t7lqj481nubush7awxps7cquqtiqz0fia4crb0a752lno9jber4fputgs5oht4n3ao2jltjg5q24m8zd7w7n1tdpxltiu1t35s30zzs6wwokd6rr54z6x7vt8yybuduusvl9o11p9zznxdk19nwvbwubx6v6qkjz642ts6ii6ary6hzo8yg9ccxcek6mxlzv7bzl9jqdasr99lfq58m0fnxtmtmkj96vx8bh93a',
                surname: 'dceb6qf5vwphft675wd6yvjm520cwv356e0mp45icqg4t77jzjms5kyogw99vckrdfd4hqh3h0sivztsfzsjbkvqjtyjabixiaos9or109rwjx2pj8cxfa35ab5w2sq62x5wcdma3lxjqx1ea21zo16f5czqoolmali20xqg6a6zujlcbdcifoy0tvlpbl5pb8ofp47knjmwd0ip4xad75titv1sk0uygfwc4qkice43bwnxij7gawsh5fcj204',
                avatar: 'u1kmgm2h3cf35wl2de6yuh96wbmd9aujf2ijuibb7zo33zwf73yn6tould76asgwjhjl6c5obgxwa4fllrsn3x6vjrs4j63z3a45omwx4ay60d38fs5cfeguxuwkrzl9npqkjhede4z5skp64wtxclikad47cvvamrxcfghljpe274bpsemyinbtuixtktdfvsewyhmpadcrs4uh42nwvmawts9mz205ch3s3w9z9p2a4aemtrv8kddjzp2j5q2',
                mobile: '9kra1mu3l9zhws78kntc8uvva49qbwh5uz4f6g80h8h3d00ho6nz7su1s5wi',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 'frupdzx34suxvmv3wjsmfgdr1yf7mcf0v6zzsfogssy9icpcjl8x6km874lp99t4i7nsn08v9qiv0zfcylgrm1w1rjqkpauv90g26sfxzn8vwqfpamvvi6a9',
                password: 'krntrpjfj7octkoapcswy6h43ushkefp9il14urnq1kacpua4b4cwfutwfjovikxef4e59och7dl7fbu01ra30u7lodt408uv9h73xd7esy1bvk55ffhsukj48y8jlppbefohalii1396zvjv0wmm70velk5pyw7xav24svyreowapsyzl6ijo3gh9sf5o0gj2sh2nefolkmlud5ltrtqs5yacz13fh6efb4639ksnu7zt6xcokufebp2r7mixp',
                rememberToken: 'ihkdgs52gwua2u7slnwyghuytgtkw3pd0vh76x5pycwq3fqn7j0v00une3gw4e8daffixfww0ge2u8ep6vi3zkvayzzve9ue74df0ylr4tqid31pb3jgzjnbjq4cczth4u8s3aun7txepgmldx09auly09etkmx7uy19ds8krsh62yra6m6s33mkhca0fgu7m3jye66lnjr7f0vubss02x49ojnl9wud66c4u16rd0mkm6c8r99v20jhuyotd52',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: null,
                surname: 'ue5y90wz3u1c9if8q3bl5vt6yoq1f4ng9flgy9elzfweuvzq22cdntzf0xzkh162a7zfic6qkyc3ygj267eg1xgoabinx4r98q4ogsbabnzab2tm8ddtwxnslxr2mybz7flap2lxc3ekwk33f9d9d9i4zhsqwdbo9qd6he66qd1ar6mhri4jdvoxxhdpgtabze7qrcn9nkuj8hm59kg69d64nvzq2a3o3exqsxq3p0gbt2qsa6i2qi21yz54ytv',
                avatar: 'n9ybljrnvol7igil7ksp7xjlsy2te52ycpei5augisj68uxexjuwb61sje724umra3hkabbdaa41gx9s7svqyptfjwvb9omapq7yzlgyka77h7odek0cgxmd04ctn1zausu10u7688njhtoljk0rjx5p6yyr1wo6lfecz7s1qoldqrbm36u2x23gh2xj5xbbfdf5snkesk0q7ddedpe3hnbe6bq0zg1ev0i3jmibqft4ugp2f5mpeyofzdivlkz',
                mobile: 'oa89mtm9o1dz0o18psxfj62xmm48l03rcit2p3d1fgqqdsokc3m59kgwoqbw',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: '95s4sxnnxkkzpcmpr8xpl3mgso5ho4k6qwqkdfytsjt5rpo54r98u2h4v3j3jnjkznjrb182dw1rxf18z1h992kqqc29lv8jo5q900a83q0aw8aofghyysjl',
                password: '4e2q8gdo1lmu4ftohdx969jivvf0alaivziqirukv2wth50xh1kmlun372hz4stcaoer662rysvimyjgiw2xxx8amr47hbbctyvftd8883gfxj7cchu6zk598yfw8t0yncymsv57y27u0lxa7q43o9gflwill73k0ml6jr3csyw2h5t1xgp2txqirn2062uwiiw1os9xh7q6z62b3vmkkj4l12b2sjdiwyzcm98lll5imqnvlvqdn2w0792kywp',
                rememberToken: '7soy971n02w1inmf4sh2h7wfjlmjae55nm19uyuktaqz27wn3fqjhn58avtef73wwel9bckdt6qoup49tiq02q948ypxgal10c284w6ye50xn23rwtwjpprgar5h9jmknvwsf9d3oioj9hvjpcp0g06ey94ij7y230m3mtsmqpq1rg5owq1nk28764ffjsot5iwno5orv2nqt65rp4kcze9cqdegatn4x3w5kv172ps0cd06uwr5l2reock1end',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: '0f5ki66056y7uw49cc2fvduuwmjd7zw1al6vzng7y1iamp1x62ykbsffuzf6uagkys6lgyv10yuppr1b3316tqmjpf9ur34gcc1o0jvlmgbl2k1205tfdm8li1y4srhm07i7d3vuxsvsfcen2w7kwl74imvj2ayrcz2jv6mmd7rumzphrsl4gf30okyco3vtkgqo6sfzxa1h8qzlg90az21kjgojmbj7xsue9pnkaric38a02adj7md1woja0p3',
                surname: 'lkmd9pdwqbzsvkv5z9sc87v7q4874upohbyxn7pg22fpkego7hb5vdcwjlwr2rxnbvffg3qwo9v1io8vycbnf4zipcp29o6d2bxn12z7o9waae6k0t080ikag4fcp7khsqev0qya529dmjhy42x1vc9grimaqodxyoxuixzonat5jne4hc2ot8qe8dzno0t34c557h799wx9uezfw2cn5l5ttbt3p5n52gtb41neq65zt5b9wx2wtii3ug4zl9p',
                avatar: 'w198nnu3g7aa29uekcarqlo5r32udc5qtom92zafwk0tjde32f178hxxi6ov2mga626fnc91xld3niz6ggurmus52uu7u3f35ur4pqii50pofuj3c5bb84gu6wgfi3i4i9j6gqlrb8mr6l7mb26vvm1q7yb9y7mi562nhol9tad9q4xpbfajtmtep1r5ud9ja9fp7idji9e40uxdcbaccznrc6syr5wn4dfld1r1hq6de2af5inwcgzsohu685s',
                mobile: '6a845wi7qgjgo4vi9w0blvs3yetlkquw5hylp8p0ux6vkp9iz224h840v0yc',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: null,
                password: 'bxxrpm9q9yja2d6mwpbqt5civnc0d07ap6crksfj8k9kpcvrqrrvf5tsrkt1jcn6n6hgca1gjshmazutj50ncn3giz76e5066dhtf0n0wqq76hkcj5rlukbqwfppfpozgmsf7rnya4nbqpg4ofuyxtq17hpkhaatz4hm0i6kbluz50hd0f5sci7r2yaigyuizor78udymmhmsvyv6yb2x25vwb9e48yxisgnf7d23buy2nau0b3aobxs7wnltzr',
                rememberToken: 'c1egtgihaa0xvvc16j05yxops537bueatu7oi405gnoaposxgli4c2h32oz9jr54c0jkdxoqgrhj6vnqdepb2824tu352fj1y04s6zk7k3yyuk2smxxbj37pgwbjh56o608q4ma5keh44ljg8roj1ykkpck49k103a0k6fwagt0ssyzccbu59kveiruqdzt4hw49sdocl80d8btdoe6gism8xjgsofx3uquyzu4ilstd0oosfwx346htfmplhxg',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: '5lsafnazsx2ggr3dpi65izjy62obrvhihyc97mwar416ztxfj3zw3x8azp9lp1jow8vjc8n2l7n71hzn6fu39bxnmlw8bn5ogvm07rxtazhasfu1wu635nt0ulzqatqvnhcfutdwj2iujrcvo8kt8ye29k4f5i009ondrs9l5c8vgc4n94dep169upt20v0qib2d2rxhvcr7a85vk4kp18au5ecqdwnkn8kjuqptfnyj0sfbotcub0ihyopsrtb',
                surname: 'tdal42k6gc3lbpmrhil55p2f2k1dpd05kztkxks8qmh6scvmp1vdl0fvckf9jbonv9on7xzot5937833alofzci7wn9yuqzj1luech4v33qc76u5b7kjioaew07aqd9rknz0weblmb8cwlrma1tqxbq0yg2jtf0ss58yme9kl66odr915qrb3ov809cwdymkwtgmzn2y057ea5mpi6363hwvb0qgt1qcikyz7lxvu5ovbmc8cnucyu2qemtdk3x',
                avatar: '7ca8dy9o2hkfwqww5bh95leheqtpaqup44sygr0q5r13dq0r1v0onhta01kjcefcetjp08o1ifwqy2pstt3vajp9ety6s16mtaqvtoreh8weidsl4mrf674lfnqqbliw6hpajjom4aiw9csbjc4gjn3r86nsasllbcrxsxf0vo6vt6z7rzsl0ke98uqminsdc9ib3x39nrcuxm0xl5usn985vnokiaag5lo6w21t9v9nzz6yc9ai6g7pdm0xlei',
                mobile: 'a4h8qzu6ohszfl0nhl1wrhgdn3n0xhmct2zwvrt4ahoxbxtrjcaoa89y7hcd',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 'ia2a7wxvovkd8kwslfgdyulmkr2yj38r1hbkjwrupcsor9oyhl6s8bxp3n308dm9plq0338mgh50n2j607gr8fbdcu0807yzbmzfs65b2w5h3keqdk26ehsh',
                password: null,
                rememberToken: 'u3z7c25ns0wfmr07bz1sk5eyxec1b08mjkqrp1egsqmtbwfacujdp8ypdfnhxlc0zrpbu3ogkrgdcdt49cjhhf2vf9x1u2lecpt2gkvl0wfjn10tw1k9i3iqd4z94mhs78te3xwu5f6uqthtvij4jtugdufnxwk11ym6i6ik2u712m2dtuhhuhffqcv0wrd7z3ox967ivrok5czirjtxmmir0o9myz7n5vgq4dz71vq9zu3h9gumjdcl8tc10lq',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: '0flccg5k7qxpihk2pmy4ez36ptcfs262dwb3y4cey0fzi3jjk6jao65mumz2apu20y87zcp6ncvve9iftmt5na72jvetn4h8c8yfvw1dyx3o8skx47hadn1o9igc80mwg3wwya57bdxuientob8gn9thqrlohh4sqbxgv4aepwyat3r51p5qsiui1p7fo4pfvw6ingjmuboks7ng9gbat50wm4qk6sarauk035fjdxrc38qe5bvijucwrlj9mwd',
                surname: 'oqmw1x60eqv32iith0iv0e4citxe4i7vpdhdws2a3327tt19x996twxwrz6onse6zcypl943v4ih3sh47crbb6qrw6wp89ewfwpkz2paqrx0gtp4j5hjh2usmfpg6ms5awl1b7u04l8r428cqokx02scjiw0iypaifjcehn4ejdh0dambua0xc1hwu4bsqftnnjo60xxa0cskwguv66c1aakh28ky85cc3ws155ysy1w5fgixsjceqp7y41ywvs',
                avatar: 'oudvj6kozbb3v0u3e263xmrbzwg3emclmr5g8hfsc6974z2q3s2d7lj1yb7ziws8cpe6819xbsu0hz1efkd61zre2cbxr1fitqxe9vieodf4y401j3aoa5dy373vngo1pwu4xy1p78cspe9g917jdre2kiquhlbkfyu7zyp2guecvwuycmcav0capwinpmcq5d1z75bjmqelv7re1qq1cbkv1dsy6ndj0gwfa17kc561i2t1w6ymz2jyqn7yy47',
                mobile: '4zgpwukmhrcgoz6s9wubszydf92oq6eyjp9bhql20evkj5zxqfz49k5l8103',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 'x9tvnq9ueexes7d57enw7m3rqpthsnd5jsq9o5apdhr6gtatssitg9t12uhgqga633yio8jllh7h7a8su5cr6yt4bkw3fx9p8y61z35osds9xswrnpbdfi9r',
                password: '4gyfck5g5ndn8j6iblywd5eirlpsp4fh24inntmxord8ekdqmra288fxks48o271tcmputgktsj8f0zmtyngtflp0xseyergp7ocs8nh8x4uu77v0gkmb6ehtcsxpwtxoqpubbbhatlkmtwp6ckl43d2701ehtq0iw4zr4fje19o2dc8ophgo7hq62lur170br6aqj6uxof7av8fkvy1oytns3klbosizaq9n8ecpmwwininnejaq0uorhoj5u1',
                rememberToken: 'gftm072njitcm5k0s35krrtj5j19n8xuoo87a7h76aqavcl36mt4kw0ml2qts4luvlw9s07rn0gb675iydxd7mn697nu6fapiuhvicojao9i8paru28xzdirp1te3fu129g9nkzgz4yvb9du3jmely1nyqw6o4gqdht4i4hcgh7pu63200squew3wmos7yquaf76j7b1vwib34dudbm1i1jaynf2lqos8vmtfre58u1bozrcjcwbjczdvjolbv2',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                name: 'k5tunjwujfga6apx0h7lnslxlcinfla3lhpouuoxwdko62md4y3vou7xob5jpvfkwohp9oyl37kyzlz68u6cmribuj1yly49iuouhhlo442w3sffwpfqkpe1qthx0rygqw1vbz8se2vx99rons4ne8jj8qjogin0338xwrc2j3n9ajo6enj78iueqrvxfr7qtx70r59xmj9lryff9469x8evfj62ddeapzlc4fguh0hp7oqev47tmhckdbff6dr',
                surname: 'kvn2ts75p6qiss3cmksxg5s111ge9r8cxyvzh8tanblhdnxff5uzp95x0w3ckr9afges6ybiwab6fa32z4t18nk2aoh1iut31xq06r4miqwrnu2hhqqrefswhfnox70l77ui7yild3clp80uv9tyee27g3rzomoujtquy62vfzr4srca5rdz6j7w9uwuehq2zks6ac1hr3h5y1ypmze80mqifx7gxxjhmovayggx167ofd9my0wro1bi5hmhjc2',
                avatar: 'ad59e8ovzz98je7rg812y44qzodwodk4mzdijntu9qwrlugty9urwmftimd36su8b88e1ls420l12nibgoh7hb65r167pkwnuzkgm3z16i87t3dgmbp63er5tsazby669cmn474c84ywj8g6b9imfcn8y2wz7bjj5l6pmgahlcvtgs6879p940d56ynf3myz9d91gt08pgfx99zy1ahp76yxyox46t1ajmfsfh1r47q7iylg4n4lisnygrbzrv6',
                mobile: 'rrkh82cccvmpz8hwl835a9ik3f2pv4xee183xx6c28nu2z9kmbcqq5274bo0',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: '8jgdfxf8awrcr6qsci23jexzhmxslube9plure9tf9ahc0af7ebb3vl6ghnlacifqq14mwwd0kl0vl0lnywxwdm7k6jixoc34laqr9n3jhr94h74q9gw4b9i',
                password: 'w6m8q7u1wuzql37uxj7h06eh7w5d9s9jj6pmof67sp01ayw4c6ishpfi6bj5jr4ciyz718q388x5pllda6tt40lsu74c569m7q55uunbpy9j25vl8whdohhqg6k9b42ngv0afeursbbo79a9d8ufu14cn2wl36l07naz6clqk7k8vslztx6se59ycmod23g2hhp9bhczu1d2pry48x2wsuzv714qa763yc23wcl9xj4er82uka4gbno01mwdvrk',
                rememberToken: 'lcj07hi93gvyd5s4xqjnm1yty1er28bk0mmg3udxpgcd85mt2jljfem73qihoc6tb3zr6ck71mcxhmobkm1lkkxv4qpnc76ip0r9107pi0ufl8o89a7485qy7m96ul0m09263y3584em6nfeza9luk5oeljiqkr7orf3o42pgo17xd435eicj3mg33qb83tcv17j72ik6reu7qhklb0f35wf5aah5zyuj7ogtul6mxv60eqo5p39d5lrux3hzpp',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                surname: 'jjqs05em9dahpmjcg02kcitnsnpikjxvppjtscmok7bpzxvlsnj7man3aig5fjmggga2hi8xgwj9g1koy4f6lok3dqcklmg7lkk1woc5yqgpdm8rqd43phaztplj44mtdozgjkgjb2cozt2mfldzf4g8xgcx9m7liimj98jbidc41t3lu6yl58sbg832lt092z7jyo0wikzie7cvsruqtlp2vm142u1g403p11ghpad1qqdu8m71y2a374rf3y6',
                avatar: 'q3utd2luq1l0wmc8ru5wimeg07977v5g5nqbpmdsvetjhd13cp10hjd60ujpdafc56jg4cor225108lnmvf89uwb3jlt2h3r7tb53idoz0e17iuxgx0trhar054nvmg678gzfrfnvanmpl7jufmc7nx7fjmi4zicanhmv07q54jvircucfrovsk1gdzjwgwtzjmm5mgd3yrvt9vos2xeiwl9up7ubupcbc0tk2ftlva85zgt5q4woo9erse9gkv',
                mobile: 'm60asznwjxkt8vaws1fxwagyh9fj2k02wkco3vzk682dyka9zkhoo7kgyh1y',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: '5gh3j1c9k75kn9aa4w0n19z17gmjch4x8tsmbwh6zot45po4zfs4vfnd8dbudk9o7ik14xiqqjc8suuwal7f2eewrsw7kpxkq8bkrxflcaukpnkv9xmdz2p2',
                password: '6ctwijb2f8hpwur4d25d5dg70tdfu5093sossc23bug70k2j1mcg87f6x53ec3d82vz0uriiledr66g9vrr11l0g5w12av0a9ob4mwsb3nzekoh5qe3cljlio2nndn0zaom5up1ykm0z9qta3wfjr5k62k65ymligxp2iem8jkxko736nb1jya3p07dvz76lr0fyzudxf7xqa050xlkqmjttxzsu84ctkiohp4ehffcxjmig17y8o8b8d8p8v2i',
                rememberToken: 'pl5mve85dm2nj7epokw8qy7ucwe4k71vb44tv0en6n3peodj63vil09y8yyyd5b7flith61p1m04oqvyyfwnr5a88wugn4olhrygjg9dzlwkg4kat8n4up6t6khg0ogpsjhtfvpuqavy64es7fse8ou82c841tfux4pj5gsp5hkgh8f2skhw0fu2arwf2pijl3y8zfkgmzo4iuc7upacgywt31qcmxanwz1bokf1w8xswqf82vmlz6wfxz13yd1',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: 'x69ezo5xulgqdekxkxwqsjx4pvh6ksh8xmkjdkmsy8u90d9omi9mvsti3qpvtehugj4227zj009t0bj979s3u6wnayetvngfhn91xv8fps31fgj7wj1glhtd7mqdqisdkp4t1qf1prktz0360xyfxbucf6khupk7krv38zn04zo9ennz3a1uznfkjyitavt2epadfgl79r4gjpzo1jbsnsssoqohd6rpt6t70ac71k87xqcp04wogv2u4tzxjks',
                surname: 'rg7luiv4csyy8xrp8d7hi23dx1alqm8h6xjxdroni67v2xwywkuxia2s3aoy6aendi13q8y6rh9dwfmbk6b8lkuz0l4ot7q3a0jxlrwl12qjerjnfvupusxsckq1hsv58i32b4yk85kvbbcaq5xz8b3uf6znmowxei92oz17rf036lg0t8qm0o0zgx3exdopoaqtahduu5pw2nnuoi53vk0t4lgt0t9aqmrhsbqehmkxybr6vre00qupt9aqr0j',
                avatar: 'sai1863ocbqvxfzzx310g6xn7z2n56txzuijredfuxtj59h6i4bkd0hhgd1c63ca0nhe62u06w50m2fheybh5n3xkj6wi45bnmkngbd1rmow925na3crz2owmt7pnz5p15g9pawajxc912a2lx98bm37p9vh31z3ua7moflf35etczzki2krlkzjy5a9tyspgmzxhqmpy0g6ukafqy6os66il1njug44mootmr881ycszpzgkbnmqtu1nty1v8q',
                mobile: '8ju6gxe82ovm5mwzxtp1wph7s7xoohpsdkd2u94h3levlkwevvgxl276mix4',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                password: '2pzttmzzsp3a1n4obgmm5gc0hxp72o4os1dq42hf3g82n1jpolvkvnk1k4s3lp5emzazzj38mr14lvy7o1mq7ckip36f3w68aldq37qhic6l0ki26aypwvfn3aydhc2pj7jh236t2n5255lozp7ohqsjju62a4s6bj8qkuhixu9upny3i0sk4etng29tn1un5wlh9ohzrjgqdj98vtw6flxsxlppx3jpo9qzn15ipahp7iecpngachc0emkqqfa',
                rememberToken: 'l24n422u2krtc662q4jdymz8vhdbdok9hz527s5u5tzfw6h4ffeto9ldybkk16wo8p2dyuttjujhakbk0i40dyxm7rv6mjospi3qw6dpp467ayvzmymxj9s25js099770mz962yoa2hg2udszfirrtcip7x8abey8s6piewtyfwrkd4wch7dqnxynsyyocw1cbi2npo1ea3mjsxf293frvunx2nokm81p1nv9mgivppkv6l5nmamxat6cxs8cx8',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: 'nvzagtji2gzocn0knos22sdjhf1gtwmbwtn2rl4asn091v5j66w2ncy6wo75zojseah8y1q1n4cu09y99rnpnpf2bdepnxnpzv1nxavh8nh14rfarjho9cx4ot1wbif2fthp5ywh8j9r88d6u5wops81f2wkpvl8hvvalpmxxqk1aw64onig9fdjmy00u9ck4ktnp2yzu0oayv3m8tbqtppxtwx3u7va8zmuqb6emcycehk59zfk4rr1prq9g0l',
                surname: '62gvoch9tp4a961j1msek2sqd0w8y4356gk0c1b0261mcoqu6r29u8dgrui5co4c6cqrlqbghycdmz8aj41rocsgve7qn2wfdyg9o306494u38lpnkcu8494hkcsmsji31oygvk0y49wj7ebazttv49zxxx63xhlcip6b4xbejighxqe7huomj51bu5aaucj09zyx3jea29c7m6at8q18lswywintju1orfyzu5v54cphsz9ru5ohzm0c5u34fr',
                avatar: '2yshhz05b29ol5e2c0oldlpv1fcctlbcu6byecdipe64ygo5rtr0ve2547ou9cue7fm30jba7g66jp47fkq5c6qkctw7syr88nq8zw6k5pncjepxfjawwbbx6po6a6gm0acbzfk1sjdj3c84wwyunoteeowolg0nzpy1k7dftr9dinwz1jvln9kff69x3688832y9e5mj3669s4lng46law0wywexop5vzdb7awn3ayu4epuqk8gy6wmynjwv1y',
                mobile: '8i6zm21nlaf4096otd3i8tgwbik92waeox9t73d7gw921kj34k694xbf741q',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 'vdq0gthn3y79u2nnlbatwbgk8gsl5jtw21ndy7lkeb3vxtyz5jt6c3pu16ipupb9k42y6vcwrnujiblnzdk1j8pnm39cwmowrwkd3de03153z5v8vgxiim5g',
                rememberToken: '40ksxm1pyvph4n9yig1q1kqdeay0iudtr7vpl29zjqyrg1hvt1ozn6g1q5oa3wi0kdv7w9isxbvovzj7btuxfe2475kbc6gzf1inuvottr6fswm5lmee02tge2o3fse7msg4neb5dq7sp3k1x5weyoc9ivcfszuu2ebdwfpu0klzhq004zbbtftrcr9pte3g82vsexd39nwngz6ilyzl8r7qa1q5xjz23grmdoiyt3u7ki0q18ns7rw802lm5a4',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2mud3lrz2piaf3t8pmd1venmgj9muo4cy0fhw',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: '619t1q0lllmzbdi4w6gdqdswibwexbjzti8prqamxugnv960v1pez3brgmryiwq4eiqq7iuaigtbxwvnkp2zaxzqswm2fpnaaq2ip3fhcq0utiphq5rqlplqushnkmdh8jq5kcz5vbb29zosraou6mnoqfidhbsk1zb525o76ccz6i0c1a27uov66sup70n1zwd5wix9djnbvdpk2tqeavdxq61smu9wxce4epeblsxaxpkbg62edj7cq1109ns',
                surname: 'syhfxqkoid55hn3bc8zpfphnyyp218grn9utc1am17qdiueipn5ojie4azsod8656qmtm2aevksnvelmc0me0dspqorgzw22y6jj4w6zpmugl3g9vvfnjbblosubnvnwloefwamt9bniz93f62rze31nxy07axhbvxdpysvwaf1n22as4bdtelyy1l0jpd7t35963c7j9rw4vch4znzn7vy0xlsj1bjwhl9yr1jtrk4n0kryursi1fnlgxqh7d4',
                avatar: 'w8lzz1mwl110pscrqxvt1x9b1yaena6p27fonfa6ppk0xcbsx9m1qv7nprc3ep77fg4c2it4wr29nvt8vjjg0za6xd9lfxijdz1myrd011a5cwqk1541xkdj95qzbauzi6jpkeb4g6rf5eys3tl1xh60s2qdy0b4bulxzvzl2ucfgasbp4guj8ym2ofewtljzu37adbnxovz17rcf8yt5sioqdag22rltvqv297khsyoifptpda0vmx0febin2e',
                mobile: 'nfzxv8ox2blcbwrtjkgwyqjvticbts1i25gp2l2hem6jnabqs3zdk1rd39z8',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: '2sirswcn4hrv6b98p3wmyle947m9vggh7eurq954bgi3eb714gnfvax4sqfodm68z6h1q83bq4ur3jx67yefrh8zxl2fctulpidso811r7aldtsk3mk9ezwo',
                password: '49mzqw6simaggop6wzywmjzn9qvnc25tkduxeg3y0otdg1q0zkrpxp1la4fs6gfinpygmrkc2pctzryyue49fdz9fsf02ztuu5a8nvqluivm01vgap3jdjwx36q0b9m3phxu6la5saltqms6djdqg3kfxgg5k2d0jc2rmrtgwps9dszu9m86l6obaerhyhlhho1jsmggimcz01pkp4u4f6xa7kydj8efe5fq74dc2ulps8n5hcm1lc3lgut6t41',
                rememberToken: '4ku1d7yocmfsmlnscfca0dvtdlt0ib326giw5wanjybc1u2ljts9wdj4pzne8wr46gb8cwbzv6uf67kv5bv16q3oz47l3t6has6zjbu4ygvbyygmosukp0gs5v6cxoyx8asg8ypxxxdxe3c0tbl9rdf4zfgp1z9xg26mn493191wpxjivx6t58xp014m3xjb20awr52yjj1yoabyx2a3f7ic043sn7y0l4oyuiwt7hslj98meaccafhlawb9z1e',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6tgsmvzfuqhw26rpb8qlirqpjgtby6bsrlvz1',
                name: 'c1umlirlcq5t1gfensswjfs8dps7wcfafcru09hbm22jci6n9ame4fnao7jvkzomcvmwtpazq0kdekk7e1h7qkc1ng6y17c5jjzwdhfhkfcb6ww82wmxpq7e82kgjri39uwgksq0avz6fvs0uhfxl5q5tlnxqwzyivkwybmmd7vlo0m7rsh4vafkehz572enlygxcvcs6bsugxzf9hxq3k3key9zezucep3r4q7ph59f7fonf0bqphjydl85yqv',
                surname: 'b95d7i8y4ec4zmpdbzi3dscmatyd5flzn6rqulntdqw3ducndn0p58fuczxosr7deydypfj2awufqttv0z1xk7zpbt95t1nvac9w9ee66z4cauk0xj4krozbbbw47bsg5fhqs7nx1nct4255ty5xapidrodntr4rlwtt08rgzxwy646r7hohdz23bd1p2ggahts5q09ipbzpnv0h7496giy5gdxdqcuqxfq2nev4b49xuqo2jmifsglp7jnv81q',
                avatar: 'p6jqltcxmjp5b2tls8jqsae4yfbpduv4jphhymt51cw7hfvucls3z7fv6em06aji7v5ad679keixac0o2b3ngy80x734bg7fsqwf46qyatb4i2opux64okcnbu3b02vrft2qa99lcvosv2l9qf9n755hneci0h2ekjdxwmgfn4cpl6bore88zuh47gcs40tp50bmwdthedr1k57sgsw1jlxpnlzb43zrp6tsqovoumefq0i39um5tltxw4zea3h',
                mobile: 'otmqxa0l01vccxqkjjoetoffkch8pjwquu7gmkjjq0bf99k649398enphtog',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 'pyz4s1mvxmd1cvjnn5pz05h1aibd7fembcwd93m21n8305gemyv4cit96u1mzm25tvxjh2nvngabge1kjlu7jpjuskq4lyh96zg129pzrn3rbas6ykgt7nkk',
                password: 'ks2nnhbs54jvbpm53ca0roxb448om2qa7rz7c2ybd1g95iza7ie47mfvo9dwcsewjolgk2oh2i1cx61h95m33trrndkkrehvvyczdgeg4vlrqec63h01fk904fuvzhqstu731zu2d279ns8ohajprqsp8q3q9150o7oqgx3vtf9pfv6w8ha87pgdgrmb6ospvdr0suede94asplxcegsmqtogln18755qe8n4ot1s17qlv16oo7ss7yw06xaj36',
                rememberToken: 'ghb217ydxn9osetyo3jwn7qzacli0m6gppnb45qycaqef489arhqu5behty4pazrwvbgbv9focd4s7mmg7bcc31emhowgpol9isoh9td6hc0zq5xlzweo0qgi11gh69h5jzjwd8memtibtqnzeeraqu3z24mng2pk3z6c8wvtfj7s1eiamtb6ujewqjwi9421wfozrx2fc8du1p4br9yxt2v38puu1cty7iofz3dphxldkt52bbpv41bhik48a8',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserLangId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: 'cq42fnqmk825e93w9w0ltb5hspfak1jy0xeni9vj7es2wmpk25yrfl1tnd1yp1ih7kjkntdmyohd4qe5p8b45z5ezz8lezqigupfrknelt610sd1w1k9fmb1tbmqf8p2xceww1cym593we2leukzyxgnlboeqeg94m18e966cykg7gpy14m4nhbfc627kvugdau7nqypc0rhqoqelzbk9x3rqingk7bn7v6ieanw96ml7ssvbv1ns0duk1e7srf',
                surname: 'k1vyp4ejlwnunlph5um2vfidrnnypp8ee6w84t89vbv9asuzje9vkh2l9d9zozl4tl51c3gay93dreo7otnb0pnw27nrzj14lsfdtleadq4ijhy77rmhp3biag4b72pcrl82srq3xj9oi4qmyj8gpht1u8t9zsoe1tny8ltfeljk9lcwno6vj1fgptctxjvuifgcmsdpdzk3fia18c73epjdvc6nzhqp5wyw54xbx89d7ezvv8ohr98p9tee4vw',
                avatar: 'jpnnu3ggyrvn8w1l9ontdeydh80jwwcg37aqglq0x60cq72v8asc57845ian0hhz3gbjq0sh1kwvo9suxc3xea7mm33uym9dtzvd858c6ygjrby7muhbr1afl40onq58pfejcqt9auqjrdvyw8d9b57ai86b4r8jhvrxk79kyhxnkmeqkaev6ep0kjfpnwakhgkb9zrvmgdmog6bb5z3ss29up8hlgs0ekp9m0nyi1urhxs1rp2p90mpuhwunza',
                mobile: '6ncg1rm8xo15ewwoqyntpcy0ghtosmp9zbzlij5xe2dwxnlmybx3dawb0cjz',
                langId: 'ziygmvh6o2orxeadkk2m7m6cq9qjryvk9v33l',
                username: 'peidn2xrlzzhm0ch74idmjdoh1ifi12fwi3zdjgt9q0h25yys5qmk2a3bk8peraoly2fyqdsk0p0rutmt4efncvv1wl7me170lw5pgjquiygztkw6ce3qibw',
                password: 'p9fyvg7qbuheiv5529u80jkylrnnmvktx2xkzopkq2c8phrd43a4jgoqmvqb2qz62pa48mldetpategt30dhpgnwdr19jnvspi61h5bamjth4l5ds2rxawv194m0gfem0fgy8w9rvath6hneust7h9b0m70bblq0fr38kkaiiumuli6mesr2qisoz6h2ty2gsi68hs2qz3e3xuj0opmbmain6mjlyp7ujphbhzlvfevyxjj58gebqedjc3pwnr3',
                rememberToken: 'u7mab6jdkump5y5xbs4ytcydigh1znawndfww3qyzboni3lnxjo1hmc8vffcwskagtr3vfy3nhpxmb64530g3ivl1tmnopzikddw651vf9hsf15m3yn7262vcse33p3aal1a9mlrhmgx1ost2nbv84jj2rkqdmu6fm1v6tt4d6optx0tt3fajlr2fwrjczdpivafuxahi2ocoiuuq7q9gw3p2uymesqf6hjtb733cdhpi96g1cu43pyu845rqmg',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserLangId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: 'frmfptfvoltj9z99w2scpacfyc60otp4pyqkx0eahyxlibne0kiuoczlou67wj9eveg07tv311ncvdc8f8wse74k1dygov70c9bi3i5c62kj9wgcwm05wu26xhmyatzdefs1zc96pz9vxwqwf24ry96e6r0jcp0srq45fm88ulmw7jtcwqlkrc6bjwyw64rkv4000tg3sww2otqaaavnf4sag21j4plvdzyesk3wgcezuy98ln4h2hl0g33841yu',
                surname: 'br32zwgmik44hcbm2z0iwd49qiqqk574ms24mg8xpkgu0d74h0rd2waw4vmb07w6la6vtilqg1dzwmi5xvei8v4lkizbkx2bic9aio6ykc0rbr5sqw9gm9ftwzzx62yncil06adzt3rjcv0e8wnipro3mwkcy316wynbln1acva403pc8l5c3lkimbvx6xpdxskwgooo0hcdi4hoyleoent3zgklgfqoolopmxjbs3te47a7davg3w6kzn14g55',
                avatar: '4teqopr61sw5jd4hajo81s4h6wabtbp5blm77d43ukyetb0l54r745zt9rzoqakbhkgtrklntrtd42gpm5lec8bs8ay2b3fj1ekkh3ueri2bczk8rnwk45cclb48nnq9182j2xuykfgfqaauw04tuz8ty9uaz0xo4l6etf0j0jwwerxcuvkn9ycmxef6zcq4m7tj554rsppp591f269dh65ty5ftagwepcgffaxndf2iuzuflkaphdu7yajkxsx',
                mobile: 'ctgkei1hdo4l4xf5k38bxftrvfbw7m49vnlb10solthx02vcz6r22uegf47w',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 'h5v2hdnnu8g9uiv2yzctxixzwwsqeok1pa24t02fmfcuxxtfm0dyru3unfrs5nmziotie8tr9zhkx11dwe7r3tqv9h87wsge5v4vktpuhka5d5mvbvxl02xb',
                password: 'pzesftma3g3qsfsu1qzl2rkmxlua3icv3wcognx5vq2hx84nisi0wdhuzqy4agfxndgx5x10rnse0zxgnzt2ceetqxbu3un7pg2nwi1ds45y628juzu1nfhoysfyvm2f6ti2raf4yrj6jtmcqsun0amc3pfz8fm45jfu7n6ccq33f2aw0htwbaz8f27cdwxjcmrg8zthwi5d5q2traw7hcpef6dg6ad2bopff67nk6naxzh49ga8z18il4nctkt',
                rememberToken: 'pw6sdz273n9aws6hz3e4i284u6ca5g7shs9k4wg1saogwjiqhu7qm63cxhlqlbfgtno9t6g92t8acuh6xl6eefbu0l0gke75u4szgeqqixbkkn23zlctcwqtrgw86tnmsf7f1c2o49465ra49huwrk6tws81kdfmmmht1gohzal74y0y4710a3ramohekz0vgzjvla9eqdttqxkr1mm73ettjg5t72sttho9gtpp0frnhb6lpfs82dcp97esscn',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserSurname is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: 'gxibc2h86kunoyf2kzd0tqv988jr145kyimq6m7zpc14cqoi9u282tfql12e02t5qoht4r32qvcqy8rx6z5vkkawtj50l0hscwsmatmgegx91hjsb0h2l84r7hxu91lshenqtvbe7vkcksr8opz2zdpr0kc5n8dqzwuv244ipla1eujdciczqtm15zz9mhmfj5xmm55mud6w4j3dhn905238277k7kyg5a1gtsa34k0eaw31baug98q6fvj88mr',
                surname: 'mltprt733em6j16328kiy4w75gpagrnbe1zcx4sn00y5yw92gvhml4r3id8doim4ir9olpl0t021ye35z0bys6d28fv2odqhgowz20bcokhhlisuibqbg8rqgzq0aw5w2quhuvvwdiy0dgm3epd0m78fqdvetgltcmeuf9b0wbhrmjjgpltas0kvr7hdjiezho0i9krbhtg3qbppew69uzw71g1yg5szx51liyu9qjr3dc7q1dkvvj98jwi6mxs0',
                avatar: 'akugc22ym6b06dvzgmtugc3oorde2rft2e9z56ipegczuvayj2rbvgyifp4em4mevh3rnxp471cbt315z47ik23m78ouhozw82zcb8y8w3g5gf2qlpg695cinr6iymazcwxw4ugpo81yk6isw07txtxm0y4lemch5e9731hp3tvdgnicnnbwdilnpxbq4h0ghufu0mo3bqfu9jz4yss687em3saxpkszafvmpe5v6r46ma34nzp1nzt5smlzffy',
                mobile: 'y4uhw699ugcoq51z5v3k9g9qbtutvs71jfqzx16ko3mjlx39v4hvqek1ygat',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 'tm7fmjfqxn62n7z5mdp0x8p3dt22a3pjh0bixrvibb860lxjp3xfxo9gfll8aluey3v90rgtzq63xwozd7qrnl5ibwmu02xybc9k6nu5aggpplnlnt81csbn',
                password: 'h7klbppxzwus7wkz76z5dkw2qborvjxsn7vxu2zofl7adze2985y8dl6yiizkwiypywtd8ij7j1198233qa4a68t0m0kyoniyg5al1bv47hp1r3kxjb6rfzxwj4c6hy5qur2eevln004k2uwq7oqiqvpogtrrod6saeua4hwfijmurg4rsm7abubj8t6ye2gwnvck18ylp4i1cwma4dtf0pvnmxc2vny7sp27l5b1djvoc31dzlyxoqravxd2wy',
                rememberToken: 'edenp54980wjfqgjnoz6acuziqtpefwffzurn14ov0yrlzuibjsomymsp7efu6ow8szxki7mqfh160espxj3jk7c5hh2v02qh4j4dpc4dpl3veu0b8kdm5j3cifbqbn4bxem0rysz71l8aqllrikozlgm2reyg9zxttdwkx2vgujejjcpenka1frpb06ajo2100qdlfgvi2z7b605f5n9x109zc4tmnn8eurhgu6nc1us88idvno6u1og51wexl',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserSurname is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAvatar is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: 'ypm3daefbvz0tfxfjwa7jz9nu5s77d75mcj4gxwkbc19hj1su4ywyqt5dfqrut3c3l5abrt9ownop00bgkblefkb0rdh7o5u7owfycnsjxtl0x127h638jk6gjad8vjj5cuw8l6k58k43z0fuxzbudhbqk5na52xxgj2522rycab28bui1n17kykm6dnkt9pweu0tz7jdu4p7ounjpwc06w5mno564i23vzz7coft7menbqfcs889ipww68y8na',
                surname: 'olyc7pfhjqrq7ixexn395bhrac4jsw18rjwytezp3118bmylh5optc30f9fp6frgxextozomo8efb2xpb928sbzxdco33u6s3yi3ce3wwvrc2q32copo0c3bccjshmzgc4volt0xr0upsctvkx3ji986d67gyg4lwqf001chq4dh77pznzuumm45fm659jmsu3agn7xuojoyh88dufs6ime3v4jot8sobed8de2szu6oiwapbfbw7ajjrnzztsc',
                avatar: 's8895vg8psr4icw8if865v2n725h4u2pk4qs83gnhqvopyg8ot1g8r77snxgb6pjazie4k87hny00tlbqdg2anki2li6rh3f1pzojc0nagb52e6u0raefnvh98v6eqq6g8djy3xz72ywoj46crsnm04lfteorimu9mke1auw3939au9hl3m21oh5pjtc7bon0x80unxhdz5xubb90w59xsofzg72mx9h7zg6e65by0puf3mrmtom9zmy827scevh',
                mobile: '3boppeiq5d1t18zpmghj3umrm5ppliuqpamsu0a6ywer61cii7bpsznuoknh',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 'n9ufnjik3r9pn5d3wl4bhc7i21ir2jrnc9dw3sojkxisbp5nfz9gyphqmalk5a1mbpc4hmzt2dm4ssh3yp2nc44qd68m02ns2hkcnjqytc1h2oozn3wsnqqk',
                password: 'fbez033d7q422ulmyjm0iwjhs45svfzqu952ibuyu75qf1e7vmsoab4au74yd2g54dg4mpnp04vyzwv7s7zpbxq2nmmcqts925a0b7w2tao4xkk0f0siyhk3pk9l4qich086qnisolryxkd3bkkn380rjlk7j83cbqtfdhslwi3rf6uazeyvuh51589mj37jcqhikph170ys52ry3vv0qdmbubyuplq9f6qghd74e9yfq0jwp7w0tddjivc6tjm',
                rememberToken: 'chxhfysccru7h6tunkn4ucl6oz31l0s9mn8ugdtsq2dxflal9f3pu09rey6p8e90zumbnr53mkpx1i8p0643xone290ttk4p8n877vx14w4472c4sgmoo7q2pgcqohybscuv3khmwh42gtfz9bsf7s20olhn0ufjsp9rnm6r5mliu7w87avc0i5mlyfl9q2asd8whnz50qgxkyneznpk482nkm9ldq3cmmeazorqbgsu4mior880fsfo7ifgcsy',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: 'gy3t3rsa2e29busca8ohnbjd682s92k8fbpmforrlv4gfja066gsv2erzokojjc10lfldlvv91d435jkxepo5i07zlx2ptfu6qxy9wvtum87cgsoy4p8ujfh09nocfcgqai5u1x4fx51k72qq2l99gqzzus86uezfj0odboi06xwonvi18vjosdsy59cfhov3xyb8ghjo3vels60uzei78rpe6ls1tudtstw349jtx2j0uqc0ytjhux0umzxkgk',
                surname: '4uq4mreth4poalvpwcni6cbhv7jyrzd9deke4p7dtb9p0w4u06hjfgies1suck8jibjpc2hijp96x61kk4y5morehfxrzt6po6o98qrutt47x52n0a188fl9brtnmszuo7dtl4x1oy8bhbw31f398q79gdfuhiyjx3vaxzs4l8wbg2z26lnrogzozapp0xww5s3c9ke21dk2x8f5058v3m4jnzmvlzkrsk61e4bvaw8es2s3c3s7zbw6csbec73',
                avatar: '9n3ro13ajtyiihfpwziv9beid5c7b1qwa993geyfb7rzyu73x4viy5w6z1a60vnnss5sm91arqgrm5nhtd3l6wwo5dh4bjttajr83msygz8av5tr79q1eixxcjaxap7qkxyah26gquukvtkq26rsssdl339od710z859lhsfvfjxu3icf4xi6yz7fl0j5a7658iawr45bcvbmrflk9xwswegxqnz9by28e5b4cx5c3r3dazlp12q0f88kn885aj',
                mobile: 'stelb8o6rdur3x9ptn61ninajcq4wrt6jyb61omymmkvg5fz9k39ijul9volp',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: '1wqejd0p9b4vrh51v3t26gwxytep7es4j3te12j5la6f4378qb07iw6oxzpsc08o5agnex0i1t44cu12vqfnrmfw18loopbiru0s79wczlh3o2wf9hmhoawi',
                password: 'i6liurpjrmsvfggym8htjhm39qgbp3a5z34gejhy8srvvfwrwernicthjrkacjx6dd07rvp8tcegta437noqgew5cbqc3i8urwgs0ypgwq1d4hv01j0kn8b7nbojj39868qt9nkwxxix3uw1jro76imf0ucbatmmu5tp8cpl3b2zrd4hjk9snu7vy04dbaynyq08hxu6hm4g5oju6nnp20h0n1znmc3e1g2cweltvsxxugp6kudzcrrehlc7kuf',
                rememberToken: 'swudjkh04p5of25japa1m0dmjzscywi2w9q4gg7hbxgcjxdc0lpn3xaglspvpdhkmgrsf86dlijfj0qx6txgaxfony8bnqozbi4ow7cdrd9twfy3fkm56mapdx6zhrywnmfj9yyyg6emds9h8luqq9w901vba0o53zlnkqjnpfprnmjawzjdp63mh8w009nvho3ck7e0hf2jghtmhhdpmc1hx35362jkkqvt66u78i7ko5zuw916vmrbcx8onz9',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserMobile is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername is too large, has a maximum length of 120`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: '0df39pc044sqkoy7yijyx3n6rx0tlks9eibtrwe01xt4emf813zoewtiq6goltvoha8gkjl04ompqyxvk8kk0o5fmpdhke0ccqho2j2uhaerjtx36cpucmjbexitq0szguvob9vut11pu67rh74sb7a1o185oc3yd400ps3idjejji6gss80edo6hyt5eec2vv84rwr40sszr2bpuuhwulv25yrlgy7znv59ocgo5p7emhudr6vhjvgh45msri1',
                surname: 'yfbszzwp7webgjuso852yflzavx0xbnvx9xlmnh3duzjs2kdd91b7mgjdfov50s7bobypnngb0ztf76g24cq4wbg64gfeo2xduz45fepnwdtnc5tme6ul9lxts8hd29go729gzu10d8zw2nigth764mlyc6b2ct97ao4y55xrbj7tnkcdyifunsln9qrt6ifmkr4ra6kb0uumrsyf1fghc8b6mmcww953irru3u5k3ds07sin5qf0mpvh3g1w5a',
                avatar: 'ye5paa2glujg7h8ifkbik47b8erqcvm7rsd59g2gbg7pdx5gtq30gp71f2gmbbgkfg9j9tj98wl9wg99s1nreuk50ihq04ipe864243wdupv5n814gtpin1meob9zyjuohn5cb73zvfn8z5ooanycgtrw5yrlqjx4tka4qp8icz8x2wvd2c4pv5c28vhoh9abs3i741l7pv77wga83ejhlp6z55oi34syrv7kbx0im1zty6tlivpta9lliork3w',
                mobile: 'eryx41f6m7qyuezi1s9frqtry7wlb816235xcdr6rpu9oenn66c4yyefaaf1',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: '9ahwe5gudsajaws05hl53ooqiq4il7sqfp7qnbs9t3lq5fcbbymxd6y4yrc2w7dp69qjau1jg5atdbb3xgj4dlnncno7zkp9bslqbe6ce9i79y9yjzoizxcfa',
                password: 'zernfhvtv9lpva2g77lz2r9ot1rk8xbrtlqfkp6ueg2ttmnmzvcamw8ascifv8ubhyq6ucwhndidmu87y3hlh94jygo1svkx1rhhs10a1azbpzwt9l2tgk0r61ndcwodpwziojpenwc4a5zzfp51m9q6g73swj6vwtyzqyi3m67sswdxqw7g8gfqz666iz1b1qvzumt330r91epub1j96weuwo6raypi185ds6fbtutiitsmo7smw2c69z3ivqh',
                rememberToken: '0nyrguqajw90lurf43bpsby2v4ikhksvi92tq0y2yxu2s2uvqvp819nbp76tyhx57ddcubkr2453wr1gsvu8qqkx1xd8sssr84lgoj0khcc71mq5jz5l4qu88n7e7ly27gml1xhzy3mv012dj0765e5jl4waf75my3kf2iswhery9fwq6jmmjpds60jqkutktyiphbjn8anom9vnpt2xubl1aqhfl1w25658yhi22h63wnex9ubnqkpj9lih5b1',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername is too large, has a maximum length of 120');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: 'n2hkqlttq6r3g826y5uic8qkidaah9lh08yoq5gz5r0q16tk9595hq1bnqupazzwjpgn88tppe2anh1y7chr65aqwtrxymbjvz4pqgfwuro3qh3bs0l7814qdxg5l9b796rpixqn6mt07msp8bkes3pevnrtbh1kts45dmr9qacg9lwkkdd28cq7f3lmqird70j10cxeqv86hf5hc8ghnb3fo4s9o40xqgqeyp1m2i5r9baw02y5wl4sucewilu',
                surname: '24ybcrih5y5fmxqdn8xlalr6lc3j62vk145rdhdgfvi5m1iiu5o4h9nbwgpm9htpxedt4lz24h2ja6szgcy8xmpdzgdyxanwafw3r4gjj8o8lbljzr18r24mn1lzl2ymqvapu662x5hr2pr3sc7rqfn0rg8qqa81mp1lwkrzn9ptns08sz7yapg3zmg725tge3ro9dl9lvccocy9ss24a1i6kh7pjkbl0t27abghdwfw9ra18nj2qwk6fetkqfl',
                avatar: 'qjwmskfku3a1bzj0lxabamw3wnfvaeidmuj07y3j4w9vhf6v6lcqw9netuvszot9jfi8942idnir0epxx4xk669phqy3ibtlo795p0ntx0hmudc1x62djtvjbgncrp6xglfcw9abxns2mso3jyb0f8evydfzsrnlbe4x687bji3nhz0n40y7puqgqhqre8x6907h6k3n68dlswa1ohs55ztrmtzkm1v39i9i5pczgtnko7s2fputh0avartt45v',
                mobile: '8aw2s1i5gvajipkwsfkgye3e520zm5ikyhs0yrdcuarpoujhhgyygom1rx8s',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 'pf7b004w84hijjyugdo4w65jxb0jv1qpweczyb3f951viodc0tyaolz4tbt6yj101l1q1pw2mlmmul2npm7jb7aj9vh5viivu1adrlobn11moy24pulzl7p4',
                password: 'kgyo0dmipql8ben52bsbah1gkh5i4a5bhnfzcr103btzfan85gyrn4m6b6a84xxgv0bfiqobsrjsl18cltbteqefplesbopnvhm8cog8wkj7lbth7g0a7hbfvrbj1e0lt36860f1vbe43w8sqpfm8qfzqmvwdhmcg5e41buacl1kp3py593em9x6uaeqakxifxjkt578myj82edgn40mbsrke14fyqkzbhaq0i73hu54bss2m8zw8kuq3neizddz',
                rememberToken: 'ycjr8y3kw489yqizyplxowkg8fwvvve42cb5ysktz4jwo93xau1zsldif95u0xie21o6id651ri5ib5fb1ogt6vrkxbn826hifv560g4ad3q6tmttknl74wljslxef0jlohyvptghvus9s0usaac0pgc9bykncb9othkzzwsoespdfzusnpjafoxogwfa5hnjyb2xuvquhbqpy1mjzr0iyj0oq8sxohmb3ihdazqhaz37w2qqa16dggh8tdaicb',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserRememberToken is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: '0dpfc73wah9bcgn6uab8dy2f5lpu4ue1f5bscvihpqn2sfr14lvpxbnpvx2j72ddjy1iugpvc3lq0qpw5d3kwn55wz3z5rguv9c1q1o9bc1kd5ooybx89pjd5mzj2564y9ew0m4rnhx1m24mhiqlhyxc3h8q3gebzi7z8t5fxuxxfsbpc7jvcr240fzxlpkvxkcp02ueh6u7jv0a0vzz2gjonpf9003gsnub1a2unelsz8jmhp46o8xbe0g6gvy',
                surname: 'apgjo3c71bywri6fftsgpdopvugkog0tt7x1wl29k3jtuazugajv4dwmn5rewpcv2dsqe7h1c5ctzuu7hx5r7yuum3qclcdqcg0ha43of20d394ncwf2d2vj8f8d5cwmlovbzb9gm86zoxbeq4s5mdgqmjnrli0nv7vyd4letii5d1irsafo1tmdj9ifm16s0bv61wle2di630z17wtd9ptrszjcpv1r48oy043yiy0j1e128vk0jx71rto9fp5',
                avatar: 'bhchaonzpbb2d27qisgbhbxvlfdvsuavgj1uoxb8nomvrfdwvn85e6wa8ays1re42ezhaz3yyj5a6dtkjrns4kzpz0mwmu5953o6yff05011iu51cxvwx4bw6tab186uuo4r7zb999jycjjk5r7jktuph3y9pux4pjtb4x6y7xumnndlz9v5tavjmioh4k8rl77ww0t0qnseapbxbjltvjxrwk1v7mk1dzcb2ziisal3i873j6gl0b2l2ilistq',
                mobile: 'j7m8c453ujtwiizl72avd1rwpgivjqzow4qb3ic4rgy25qc0wek7p97skfpi',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 't7knxx4pd17qdbqpwuj9mwhvy76fgz2jegmfs6pmyy865251oghtmdt78w3rzz1nku6ngw8zdmupsk2k7tc85vp57uwzhs96grcxqcj6e5s8qvpa43nnbsj5',
                password: '6puk53p2ivge5j3pvnqz7stk7f252ro2v3usq0jzsy9cly5ssrwi795d9affqrn3vl1xdq9bo1mru4dvoynoth9q70nlc0a20vtr2cfkgy3j4miiv9khfguh6rs9ovkw9driqo2dfmgrqk21uinx4lunwqi3m30ze19o3sgyt2o1lnrk0yibwvv81i57hh13qwjlt9end3roqlpxg2vyhq70s7dh9m7j9iag7ugse1w59g10q8i1wq52mlhuh57',
                rememberToken: '975wgacshfoivd5rci5v58r9j2fvlbmda2qlwp22l8gpj05gv4doxy7ofgr65oe0g8vzr9ze5arkfhu1vhq8gwjhmqvje826azi6ud4t89szppnw3c0bvszpu6ykxtntaw7e8b80ti7cmoaew3msa8pmp4qe1iqarrpp5gug8wkrzneb7mxzw1zocwsitwbz6vb30u5zk1vgnqtr1wl4hu2iqj4vnghfzizenzouicvhleq0tljbn5vpab1rcajp',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserRememberToken is too large, has a maximum length of 255');
            });
    });


    test(`/REST:POST iam/user`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: '2prh8niahn608ru6qpbs7r09tiat8a3q44726kv95kmsfppzev7oocvxmlwrrcddlrljgnzehn1ea2xpusrembpi9e7bl04554d8gx30zgnaverawwfaku8nbddvraibsy0gab22un2oijhpnbq68ifr35bzphbifyjl9rzzmj6nccfxaq45ofquixyw21aay1hghgohyqxtp9ugtlhl6y3mz3mrototghsy996jqjfof2fnrz4ytatlu4s1j89',
                surname: '8ugohlok00sziuunfdrdvt42prsd5auwhf6vqrugo0ylow6n1jip7d74hevt6o71kozy5v5b5t2ihdwjwi3ehullqku9rxqs83io3n8lz8sttpxiq7oclj3yz710hnwbwstthg7shktucht2bfhv7ky8i4988ximphvakefr6km1avg53h12vu66d4augsin8yt4kqtz5h3jakn1el2127h9r344jdh6938qluowz02nlaeczw0ighfsoaakpgf',
                avatar: 'xh9ipfeb6u0foebgcku3tyixhlgl2yn5m4ccg6kr7x8xzl1c3pzx5ie78lsfzb8xf3gqhjdzetrfnnzstsssavjeqww3tmgv5fj4qv7qscgf0nkqk6wvefvhtd77dpk329tlokczwvk93u37imgs0l0agif9k3xda0j9n2wq4rr7y7kx2xscrqqchjkdjbaeqn8ynzc0k7cghlgvlxbu6d9jxebckhxxtanoawvwww90iwqijla2wn15jm0qwxj',
                mobile: 'flet9e1zof2f65wq88vgec1relw6xw5qba7svlfabe7yjfakuqaj5vbj5icv',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: '4rovjoldktdofpe1hl2tfjnpxzsi5mtik1yrwiarfli378ei4xc5gi8ur1eh95y4p0cm5qfldv7pf2sib50h710yh0ndk87z17pwovxhuzmezf2adezcgj9y',
                password: 'i4qaz1bit0zybg1cxdebubjmcrmysr57rj77m0m9tusyacoei8kzfywy0cb86pm10n0f1978dmyektsyiojjjddggl0gjij1ekkcap7v4ktmqp3qtqvgonkpo7rne0oh6vq5urmcuvladec0h0rmkibkvtwg8lnprixzpx6ke72cm3eq1bc1o0lidxuflt6n5b2yh0aio8d6ah4wubhzcb5m3vbgs683z4ut9cu9m1ga2fpdq6xzoaacyy0hoi5',
                rememberToken: 'tt04pu3cmnx6n3hqj269jxfub2hxhr1lu6r324avtzhq8ppzp8temacqgbeweqkkfd4f99hd1qlvh85ulxk8bnh9raw50dz90j3h3eyr2lhatirvn1nurt15ss27m9np20sgfu3a2rkvasgx6dgk3i5peddslvs8cnyiomepno1564xwgfpsj8u957zx0kbk10wt82yx7xflndkfhdwirkrgb1yjp32mehvk4xkxr12catxuzh7e9glquv5x9n9',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(201);
    });

    test(`/REST:GET iam/users/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/users/paginate')
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

    test(`/REST:GET iam/user - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'a3746e8a-84d1-42d9-84cd-4a8dad367bfa'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/user`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'dddce156-1924-459a-bcfa-7f37fc7a7f30'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user/0ec9a998-fac2-4876-ba06-4d2d64e3c542')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user/dddce156-1924-459a-bcfa-7f37fc7a7f30')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dddce156-1924-459a-bcfa-7f37fc7a7f30'));
    });

    test(`/REST:GET iam/users`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/users')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/user - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ed938ee3-16f2-4b6d-9957-6d35aa1ab155',
                accountId: 'ff3eddf4-3879-473b-9479-b011c8841e38',
                name: 'lkgfrgh60bkmt48ffwaci0h48uyz6v2edwke7eeiqyzvc3hiken8z081dz53akj5vosr8ymg80uob0zesm8ykuc6x2gm9bcjxppvge4p6zozdu7br9gkdm6c3fb47h0h33jd1kga8k9mdjw23xes1o8p0iiiefq84gj2yoyozwdpe7p7rhd5on3sslmn6o7xwvpwkpdc8r80i2bhj41p51tvxugg39l2fp5u4phxpdufvtk6wfypy22ung6wz67',
                surname: '6q7sc0arsxz52ctw2ndfx8xtmjb8pxs60evh9fplcn2h811jtp5akboz3mrumsembolthz6fdp2x3vluwmdryihe57hsp19e77shm2wfgg97gkh49de5uur5s600sbov9y1776c8swqfv06uxdbu562xgbadz04e3pkpkqci8xhi4pvsjsvnqxw7ac1lg3nkvvzr3zyyw0buytgz7y47hgdwtjw0aaut0u2mv3728hziuutdcd6ka8eo94i8wpn',
                avatar: 'ufxx6reqdwooto5sduncqud94l5xf7nwkzmtv1wkc7i1lyv0z8lst64ltco37cgxv87fwhrjqjjwgiysyj0j9lnvcw4oib096bln8ih2pi9ydho1aqr09teu4f431qxuz715bl43a18lbqvjs2zblpxnbktkodh97jobnazdj45ij3lfojpiklbvwj9q5t33yjic6i3zxdqoc4sfl7dspo2vad662e3lonv96gvh2h7rzlb72can7qa5bs029lg',
                mobile: '90sx125dqi478cr0jtw15q3fvq8fxramg5igllnitxsqjtjxbel2p0h1ukaa',
                langId: '61903f7a-32c6-4cdf-9395-37c24a8edaef',
                username: 'xkphnq7u2zn5u7hzgwbwb2hh7zrwbaiershb863qniwax6ehgwm2hu283j823064p2s0vz5z0rm8t9m3g3e0pvg7vmtugiipw8q2mysjr8k8aa9yctv633p6',
                password: 'fbo4mx1eyls58o3q5qkr94bemztp64l434a70b5xipy19owek0mu8yrxxq68uzkqcjmcmul6j8haffq5knu9xk3d0xnm3xpi07ikchldd74q6tbe86mo6d84s8b9bpom5rm7y3qrocbp3arye4p926ml3qhcwbxkcoc7xf5f8xrgsvkaezxv7veax6vga7d4q6pa4heh0e0z82thgt09f9o9wvrg287logc2i0s18bkruof18kqc858dv0ip1zi',
                rememberToken: 'pi0grmf4adudabklcqctle2g684eckoic7o7bcyvf9588vvgj85o84vnxhaxvreen4cvinltyg6z5z5eb2ftaw85owg3rkhobl5ncixerrk5dtmblhis2f888a8wma5di842s2tx8owah3m0t1jtrbvi3saflo9uszqvuw8k6oulkys65xbqxpjl5swlued26zmp0om3sgce2dn9brsrxj0yiejmshcf71kvddfwxcwtb811hq48j4yqdq8031a',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(404);
    });

    test(`/REST:PUT iam/user`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                name: '6nm1v0xzjx9omqqbh9qwb77irajz4l0j1a4cdgllq3nand5npm0sejt8i4hg9dwz4smnczfbcfc822b3w6g4k6o9dg5ovmlwfzx8o3sqj6f17dmwxoyqe49fyparp614k1571y6vudjyxc9xa2zokirmg1raqsohq3qk1votq3g2fyjwk5opb4k9wrlsg6az29hzvs3xc9g6tq6x9mh2dncn8apk9sgjda703gr4fb86b9n8w9mh96ih7kg0vv7',
                surname: 'x2foqv4akopvqkkrnoz5targ0c9h6jl5l78v4dst4vhmtbm0xkcyiu5gyevbmopsjvt40043ui5x9ywynvgelenchf8l3j5echyde1caob63yujki5ir7500b5krhmim8mq2r4mk9667z0zlv62s6kz7vn2wea7g1a85jtdhmzznrrtgyxyqskxjhwvmav22kk85mmihyopdrkwkwzhkyh2okfv5lqd4dnzqyolb6s1lw98e8l3851jy79feaql',
                avatar: 'mzfg14roclk12t0pv39ohbwtg5d4y6414uwxen9j71gcl5zjy4s3gqjpybotepkiypwxd44luzwznxdz2meh3pn8dltdws8dfsx2n5dfdunbfrb9kvm935piwd6j6w10rgvu3a32p4f3g5g8cmo5ymus5jjmaa3lnv7q5hbweuobj0p0rn5gz8jbjrak7dg7u2ipndsps1mmxqyt84jmxgg28gdqfiobboqmh30rlky7jy6zw96ld9ml0y4vjpc',
                mobile: 'ptcxo3nzr6z6u86tx5bs92nhyzxkr9qra5jy4hok5heo9931wqzpvfbldhee',
                langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                username: 'h5jg70j17w2ymsysq8yqumeztaooh4yza6buupp30853wfhjkoosrcjvjrf3nayl7h4146y4im8thswecyi9ojbm8n8q10wqblity8qppuyjl8f4wf1acryo',
                password: 'eb3z5u9vpiuc0aeweldhdoe4xukw0qwaq4touxlo48swgcx7z2tnemcah30w7241h81l97eqkqo8h901vjxj8vg5yflfm6f3z4jcd1123f1xmi5y6woit3i9jlt7b9q2trmekeb8gmkc6lodthkszk0ue0oj85um8wcmkpk8i64xbk2krx2dsh8dmupo1pqjqpyqo6hcuddlssrruh0vyn8baq0t5at2hel5leyomtwre5yuaoztpzvi3qhiwxv',
                rememberToken: 'r3jaeqsjsl1b1ycwu9xa5x3ltwgd8dl46rx7tk1s5dnbtv43ok91r6aow6yj0domjkk3asp8a4t8e3ivxor6ztlp9wxpo285nelsfd0dvrk6knc9cpu1g435tbpot59n4tsbscppmgtuubuxx7fk87pos4x9w1j253vfsxjv1wpvla1c3b09h76v3ql7r90x4ce5yf46aedndonlibfzl340i8vf4vpihymhp0g04q5bxtn01waxfc2ojb9257g',
                data: { &quot;foo&quot; : &quot;bar&quot; },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'dddce156-1924-459a-bcfa-7f37fc7a7f30'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/11e814f4-2b53-4d60-8ed6-9a0d154c3a8c')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/dddce156-1924-459a-bcfa-7f37fc7a7f30')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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

    test(`/GraphQL iamCreateUser`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ce8b2008-ee0d-4ba0-8182-0c61b4925ddc',
                        accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                        name: 'e8r6lmj41juj2f8zpv8eljiqesrvqxqhdev67urn0uc13ud4p3m0kfq8vsm94ly5efrjyoxexut8s323ybo2eqjbtfxjcsb7fnp6ds40pary5is7drm0nqmwvayxwb36duye5dmaoezbwuzmzhi4gcim9nooulz7oasztugrut4ysqmvg27aypo3ph661otv6rkjfw9lkamez2rw7buxzo7rw9m98jg9ohvnplpac1f101piuiim0dr641b4qjj',
                        surname: 'kceko31w1r8byqxd0wza29xmru15pc1zvgrycijyop6zzcw02o1cgq9dp6lr60i599f7ivtv9tkaktmhser0d8icvfiwcw9yn5coyutx3cc8qs3zqdiawru7dk8tldrsue74oqmtl27r77rig7u9mhyfbkxcr3fgx0oqy48mqfmmpcu2fygcrcpunm741vfpcfu280v4uvf8zbh2cae4qfg9vim2gjimkxm1symxb5dalbbijpt03xluifn6yb1',
                        avatar: 'bwlx1nwop7gsg5acnjspxmvqgdqviw16s36rd75pwjkrb9iutcn5cyjgjbv8yzs7moutpesmxr7klp2kz6co3ei6dd4u8sgwzzi98u3opu66ywa68zz09iqjhmjhxqbtauv1ufmd67t9h09vqr4ahoqowgprmghxym6wczyrwf364qmd5umx4sw49pm300vvdurqq2pg2wccshxvh4w2ldssp2bonxj3cbc6ni2co74hp01flyiee4yp7p3eh9w',
                        mobile: '9cuaqmp27sut3mcbxivn4g5x32vvqcmi4htop3q2spjz5wiuhm79xkytvgo1',
                        langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                        username: 'tlb8m7jqh1irviaw8js1srtv7ffla5952069nwl39i3fwhdyi5vr5osq04ns6kbpj2uu37ej98v1qfcl8atbj62xhjnkvx1z4xewl6yzslz5uwh4f4y3tgrv',
                        password: '3ka658sfys2xgml60dg8saq0jrb7qvvw5tuzwoebfj1a8jba0u4uigbzoxn8jp6csqms8su51mkbovhnybwo0ckbspu33rh0pku236173t888ey9t0rd3dnarl63d04ppw190m29byb057ofynfgyozg099wx5p4zjd4n3n6rluhh0z08txkvtc6sp92c8yefu13ob2rytxf3xaopwvw8s8uour0t8y4g5m8tdjlhdmk7ogi2jrvpyzdklzspzp',
                        rememberToken: 'co3vt2vpl717kj8mqcnj3x6tcixdijtpcd6uk6bz2a2nbfdejg3naxgnid7fitjil7lfwawq5o9f0fi96lmsr870rgujs49c2jl3a8qtnx645xcwgvc5wz9swkb42xcmaru96eki08j6f3ojfr36q4yh10qv52rpmtfumfng03eedruz6ji8yupjkirhvp0szmfihw53dbgpe132cyw83euygvana3ka1ly3mi814y26nlvoacnqvlorybiy1uc',
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', 'ce8b2008-ee0d-4ba0-8182-0c61b4925ddc');
            });
    });

    test(`/GraphQL iamPaginateUsers`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateUsers (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateUsers.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindUser - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                            id: 'b63dbbb1-8312-4239-8805-db3bc715c7ae'
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

    test(`/GraphQL iamFindUser`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                            id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('dddce156-1924-459a-bcfa-7f37fc7a7f30');
            });
    });

    test(`/GraphQL iamFindUserById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7593361b-eb58-45af-b21a-e932d8b7e3f1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindUserById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('dddce156-1924-459a-bcfa-7f37fc7a7f30');
            });
    });

    test(`/GraphQL iamGetUsers`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetUsers (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                for (const [index, value] of res.body.data.iamGetUsers.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateUser - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '69d44f10-4aa3-4785-998a-e545b5687790',
                        accountId: '944619d2-23a2-4947-868a-88624ca267c9',
                        name: 'mm30o0pys1opi118jvp0x447dcxrk02za20r595gn59s7i1zkkzk69fivj9b4lrwdrn6msixq0onixg80jh9c6q5lecbuvfe4d28dw93xug3vlhq91jl8oz7f5pwzz349wbqnrrzxdzotk9e3u5aokac76sfhvlyxoe1ogly3ljplmt3gija90eyce06jduiprfek45cauz6v0ajrtv8ocbxofjwl75gwzj1qzts2nu2n8fjyceukq0ctikhl8v',
                        surname: 'p6xr84xn72dk3pkwt6nwk8bpx8jp0kxls3txeif9f9kqo5b3jj6ixfmji29x6e6mprjta8c3cugubiv2jcqdlub6001ue7vfvxiu5vvb9o31f5na07w1scrso3xplk1qqawpjc2li4vbe37btbo9o1m0j0r4mzo7e1vghgip24v05xbf9tm4b9qmrl1ld2svf7qlc8mb9c7rfq68qyoiux61dcpyukjqos2v5wvdfemslg022fbjmhg0kcxbhgc',
                        avatar: 'uflt0r80zbj2e73erwqmheu99aj0q1lt7euybd7549d9l94f55xu91vllp3fnk0edjavbcci28alhnr5hdpbk4el3ftdbwy6cy7ahizo7nsiys503emvd1xg9zrn4a3jigvopxgw970zm4hi7h4n9jaewc197axhmusijuogqihln828dp1j0fhcxqddmgjua8rwwqgtmsxeq28i5ye50uahd1dm7wshh6w7gdodrvxmf9ko61f0ybfak3qvfgz',
                        mobile: 'v1kwnfhg4gothwsow7lzs0kl5xm82fauldaor6zl3qgl4our0euyqapwbtfi',
                        langId: 'ea827d2f-8acc-4206-b1b4-9f2eb8a8106a',
                        username: '5qifkb7xrbkyu1jckagh58grw23j2f05p93wwo4n18grj9imzl0tszhbr7fpqxim2zqsrypfyv5ce0bl8rgfawet22t314k4m6hmei9map3z42yji33rqtrb',
                        password: 'xcdegit3afmeimmljon8q5mloq4l5rgezuvawvnp8307fc7onvn8cav9w27nfuanfwm7xweqgct6hrwqwbih4429izkd72l3rykxrjevhsrtklv54570slk6rycf5x2jr64hx23wcyywmk16x4m19z9153fw55nmbgetglmi4kd194tkiokdqduulyadch5scvg85vabgezzaffxvusu5tavfiqnl0j252nwm9mkisxmxfxtstr1nspgwtoeuph',
                        rememberToken: '4v5cfgx978kx2gwi1npwt159pp0c38l8sw8b32vqnrylwcg34ave8vg1ifaey7ug7eyxo54gd0svrwcjjeokl3khlm22pum2xgv2zklhbci0euy7xmor3oa4yjig14gqnu0w2rcfjsj4lxvvihz727l3gy7qr9f1x9zjch26lcwxxxajq45iex8dvcb082r42oh53g1xfwhsbc0amfz1c150t71eshuiw8scrseuwbk0k608356d28i23idm2ef',
                        data: { &quot;foo&quot; : &quot;bar&quot; },
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

    test(`/GraphQL iamUpdateUser`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30',
                        accountId: '6a581b9e-3cfd-4b0a-8578-4b3f31100b42',
                        name: 'qegodzvq671qhcdqoves3wysjv95vumrkg9fqvxqhscwzahrpwenmgra3omq02eoikt5jke864uje2bw1rvdnga5vapt22a6p4eg2x6pzh6x8v8zrhcafdtnovconf295vqynzaa9czfzt4m0crtqxk698l5tcu3vrtml23fky5y8zbryuwqjhfp0f131eg8zd2o01k1dkja5e6xqxxum1ebcyxu7t2i3agu755dhp1r6zrcuxhw5ty4xcpdt0r',
                        surname: '2en0fbdyjckuyk19b6wkz8prg7h310fmyhthcx9lf5dz4xdqix6hj1au77jb59p1bebu42x8o9lfm3h61gi0wn6nznzzxkun51na9xft0uqc4d1s4jj188vgmjadi4yd2378ba9xmn1sbvj2y0rt3497w6gvfftthfb81hws9tiyuonti7hvx3hkww9grx7pvp2g7aqaa5jm3v3emlgm7a8d87r8pq9tjxwqebg1bulxkpaafyd0a2vo1oucxce',
                        avatar: 'jakbj6nanqvut7l6iwra5qw58el1eidvu1gxgbztzsnk0euzb5z1ygf6fuowgmu5vybuqxfpygay1n51azdzlmoc3cucqhv9znqti4ep4tqz9p6psxycff42ppb5s2pq9yo749co1ga56z1113n3msuwauqzr8rbab5rl6jvfx3jq5uhzp96ogc9fgk6ngsj7cedwe8xumq4a3eot3lzs036xod1ecty1a54iubycpdbfdscrrg29zufb0wqxml',
                        mobile: 'i8k8kgr66k0tvfsopwa0juu3hc03dv7mfecm60wtrikq9rbpmshaiugce0y3',
                        langId: '1784cd62-aed7-404c-886b-277fa888eec9',
                        username: 'm2zap1yyvz9qs4j69thorw9o5zta2kr2vsuj4q92l4ug19hoxqc7q6qrb67xo6b4p7e7p0lbot0dd2nodrvzbjbih7601t4teebhgdnafehtpvp5yyn1fwo6',
                        password: 'o1xicxoeb3icnw8xcuggi2ulhw6z1m05isqjljwqdyllg22tytrd6u3g4dm1l7vchmg8drsppirt2iv41yttd32v731abtw15o39iuycvj49w1rd6o5uwuny0nrswqbkpyhvo0o1xfccsr0p25rqu6t1zivq5wxtrtkhnw9ek1nj18hzj5ti447o8jcn04erjrjbhxs9szjrxz7pf7llcckyhbmb7q06u7h2hz5d9d2z0exvhstm11qi9v0k781',
                        rememberToken: 'brxvan43nqb8cw2h24mpyjdf381qiv702f8kgq59slztfhofwty5h5076gex0u01jwuibc09kyj1r94e7kffqrkyet4qalljktvrm4y1pnt8kauzzkrty7knv5m2hw6yro6hw4zdqi24sjk59v9clx5yv2jafauu1ck9maeuxku3nvquo6wd27ngjuankgkm2lffobavu3kfeidyiz0mr8nfmwbj9q9aq8kqsi53dt0nknnada4yus7tgxa6l84',
                        data: { &quot;foo&quot; : &quot;bar&quot; },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('dddce156-1924-459a-bcfa-7f37fc7a7f30');
            });
    });

    test(`/GraphQL iamDeleteUserById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1646294a-b0fa-4c33-bcac-71896c7be229'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteUserById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'dddce156-1924-459a-bcfa-7f37fc7a7f30'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('dddce156-1924-459a-bcfa-7f37fc7a7f30');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});