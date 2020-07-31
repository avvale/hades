import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/bplus-it-sappi/channel/domain/channel.repository';
import { MockChannelRepository } from '@hades/bplus-it-sappi/channel/infrastructure/mock/mock-channel.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('channel', () => 
{
    let app: INestApplication;
    let repository: MockChannelRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    BplusItSappiModule,
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
            .overrideProvider(IChannelRepository)
            .useClass(MockChannelRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockChannelRepository>module.get<IChannelRepository>(IChannelRepository);

        await app.init();
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: null,
                hash: '4biysf9pimand4vm6r2phwjelbmv577dyht8g4sd',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '9us6fstk4oh91hlellkzonu4xb4h344qz519c8xwntnr4uqlul',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'jdwnwvvth2jmmihfe84o',
                party: '91vbbyfs34ulxf14fkxihrkhny2wbvahs4v4d059jy1wvecdqroxbpawgwasihg4wxldl3zn0ttmods4tyk6x21f5qguiu0kmjqdckweh267fru85ixwzgc6mi5h80ftvaiyeyy95rsleemfjn5ge5ud4aq31d02',
                component: 'deeasz5e127wpzcqjnik5ss7cvn5128lu9bfolqptbyez4au2z32cyl8scs7knib80dxuy44fnqgvi07ucqixabej34q8wj10kdfgtbi519ydi9imoly35iwhk9p4ff1taqsnorp9zhrsavu8wf5sl4c0lrfc9a3',
                name: 'd8y1cpvacxzgkf2q96epmg0ugl8w3ko5cb6ldfw0k72dp00iu2btqc6culbhhj50dnmxrlaoaqkkjy3x8z9ivmyfoa8krzs57powa0k74r5iei78v1topcf0biqqengmh1m0bm3vlb0ifk495sv9fnyscaqf19wu',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '47px50577rxtezr3ng5vs1hhnhxk4gyr4s2mtgkxsv0m7nnblpufvlefxhwax3owfypf7cck2fmydee6chqr28pnfgr1vcn1hd8q0ub8nugqkxaxcgx6kbtu7wi4j47zf3g33b8njrkfpaiiivhikavuudl3w1q3',
                flowComponent: 'oc819yhf7zo5kkqhndvxvldc40e9fm4p0jcfgqn0s76j72sn4b0pmxsv9rmz3ja8nisxbd6sg5dl0af7kse298p98rx1l0ug3xiqhm71sp6jwsa8n3eahzsh0dnf5arcgzfu4zfsqrev5chpbblhi3p0w00u62ah',
                flowInterfaceName: 'tea286tvo3mxztmqlftlu4cen74y8fnh8vp0mdskknhjba6qdrl3awuxg65n1npm4brn6akipapyp1failwscp25p6bf8i7qwgazdosohszlad5mzn74knnm8az2ji6uhq8rr24xdxm09yms43u1t7utlgvy58px',
                flowInterfaceNamespace: 'hhbo13yi266g75qfq2d5gbbvhzs0wl8swihryuu2bhdmowe4k5gq4tknnsrs11f8eis1v57ifydv2g8xut8dwuizflnzt8vgx29dtyjuix6cvediukxrins8fnu7qe2xuw6de2zuc5r5pmms8q4vyjb1o21juu09',
                version: '4xd8qxgn91omrj390w47',
                adapterType: '3khkda111yhmwinh31n8ocqxejxo2q0jwtehbrgcot63477nd2jv3bp6gy0m',
                direction: 'RECEIVER',
                transportProtocol: 'bwlilcdfeyqvla9ods4c55u65i795onbhatd47ra7xvqfbco8felnbl8s3s4',
                messageProtocol: 'ajr49fnv6w9i1brr4d1fnrrd6z03zmv9i6uvifyu0xvj1c6gxwq6kt0wb4v1',
                adapterEngineName: 'ragrwst87kt5fx3upbv0jabneo88o0fcmziue3j9y5kldezn6lgeis69o7zp7amw3gp9o3jye6xnp5ei162t17xr4u5azdsr9zstejz0aiki38we7na61joq1t8cromjsl0uwktn5qso3g0wb5c8cdyy6hfpzj8e',
                url: 'em72txmrvberxjgv51z5ul4xkqw1wjlo4j3ipskbvn82f5b3kpq6i4vsyrikimnp85apup50jbl5nqtoh1bmph4klk53tgwcnob0o0fczbi09c0a66pnb2bbdqucg298u6xdgwobo7l3avd47aspa9b76m9ijquf52mfxla1w3u56opzlodzy9k56k37hzhj726s9wujuweak66vo6dwx84o96mwbxye9x4r0u9hwqwqwwvpfqix8efh1ll4pxdtu935w4paey0vf4qmhplqxjg3wuj0x8rrkpeqqjvul74h9jgjfbx4umrkkagv3ak6',
                username: '7ta6s0a3xcicjrtvacu252q508libccur04v0lptf3qaoruljb4naifsuz6r',
                remoteHost: 'nxlgnmrreeiv3hfgn5sar92wt1fw06uqs8y1052l4d6xq93gijx90sr4fp5ib3c0wjd9gd5niqh3a2x2dt19ju3up4cqubxm8rlt6bzv878s257mty9ergrt5s6ul8k17oae3ei3lvoedgasajhn1mpln33fbsqx',
                remotePort: 2266052460,
                directory: 'dzlp31k1lv4upklxs2w77or7zd0u0rebv3ohw1sae5zvxaoorjnq26k8nib5ta9dgly5b9oop7sxp3pdbl01r7jm3y2s98jstul91duue059ns3c76mm2bwlmxm8sy5zto0eml3aoybys69zroorzwqx4rbs9jrbygrv1iu5e82za9mzslnwmdhxjah3xxbyqxdyo1a7hkw13hlfxvl9gf924rcdzuv42jrqcuihaf00rcqv1slkvoldg16c75rxac3qri641xbgxaqq32ke15a9308in56643e3hgji08hid32twio9vjycmj50jd2w1ht1f6tm0zojgykncplo9x9ymzag4vso7yuibieghttns0fqvndp99ac1rvbois6dp0jzzeox6u4qu3g5jfwoyvw0hdhjs1aypa444krg3urczthxfv2o4nwwwyziaea1vahmwrru3cyat64x5hg30vr5m2kg3lzyznli4i0q809vtndk9sf228ea1s2vjew1p3ox7k83thkilz3802wjin9ez87le8ndwluia0wr1c69f9kz19junvirr66jlx9rqk5hz557iaxvtic5g8fm109ff0naoi82cqz8t3erhy0518sbweaipbu6fdna6b9qgpbgtbuwxvvtqon5toqxnj21reivrlrjhwm56pkxy8wcqt6ddoxx392rd3hf51es1w8oh10i2yncric7r26u2ukc35h02v1k2bvv7vq0esgwap5veiy7aga0ytuylq2nr7v6rsflj5d95ciflhklap4knstf43ism7vto3n0zemseqcy5nqixgxinp0j2v9vncoxtcjsuhtl4kdo3rsfpq1b7s8ko6er7cvd3mspbvm6v15s5t73ar29ksc3z5302o96gqj3xutqu3iw4liyn90iyp3jajsl1pmx7qkp062b76mukwjgjoavzzvjzxp03orytpvhy7z4sonqr0b4bb2grvexclejaqs8wukacrrxvf12vtek15pnoyr9u89',
                fileSchema: '7565qfimp3p2kz8mn02ujl5y6llrfundhrhlj115dhbz7kz73l3iwacgtmg2pex0naqyirw2c6777uvdhh2wwj22iua5h6g20onr7xuowubdllnpbi6ffhplywbhauqsxpfpybwqo9h958ltqviqv7qyy6yuu1930d6ncgib7krfrghyf4sne3e1o3vwzm7vkpie53be46qlyjbn8i1btpaznzxgtl2n3k2kywkd4cbbcgwmd3wp6b4s6bsae9mxilqiivyejaelqbqh00bx6b11lki3okid7mqlt8scly1pfa7cphufgemqt5a0vf5r4iwtd34ltpi8dfqr0j4nxk9elb7tj5o31l8q29a1axs2vrs7wrnnvnh8o1qzs43mf7zr5bk6wrfl253j73pbkznl5wa1dhyiozr1zo2h755dvpizz1qjmkmrpvzw1t4ec8eab0rcp9s8mpg9if8nynfe4u4orspgxm8azdn2v0zdth9iwfvwyx0o46ux839ls722kxtjssx3unv1irwuthf1xlc3205juttq45lgqhsmqex7ec623wlq1tu3z11t7paovp1ue7s0dircy5z73eu2r4t6ex0vyvzmpjrq8lp0ak8wbu5enpvbsj06ea3xfn69exynp9rx9kqpboo8bjc03sut8vv2g25rtkaywznq41a36g83l35mpb0eaz55ib10suho7pvzlj5qkqrvj2bv02gu943booeut0167wr24nyy60hgtdiokqqszn39e013qyuoa2tiso7pamgy3qf091r4ixsoe98nsuwu7usjjfr9j28bec20fh7hpv0jgm6bue6iarmyanfmw2qbezi5sos3xbderldy0kvxiebkfbdn3qfbcln7yje47s48lzmz58nmxponwjfzezvpqcgxffk2so20hyq0jgr66mf7vs6sm278k0noyyhcdtee17cvugtg4miv1ix3jr7j6jq2ccih10iduyag8ezvt0oerd2m8vjsojoopjjpyu31',
                proxyHost: 'dknm6kaxmetrjlhsy1664eskfe71k9ab56qbyxlhpv6tx443e7rxavht50ac',
                proxyPort: 3251181040,
                destination: 'ca8fh2go1ksitnxttumjtzfzw8fo76w5rten1zk6zwn58kcp39o0mufl5eu8qz1db2ycjrznekcdxjqt8gajpucc7pncvgj3db8l4qqvwcmpihceedu1shni31m7u0eok170rflqzrvibtny9myhjq6lcxdpy8xg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'd9r3v56lbvppz74dpcdw17vgpp8wi3sxy9ky4pgfes1ds11ndkfkrvqn9bwjp8b10ng43213we0qxfzo5i5xbz9r0lty2acbg4qvy0fhs4aihoj6tweicx4f35165i538gc5a1cg0yondgl8use4959qg0u8ci4y',
                responsibleUserAccountName: '8fhxbouwbrfognrct5j9',
                lastChangeUserAccount: '3hghz8rks073kev3i7ou',
                lastChangedAt: '2020-07-31 08:15:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                hash: 'sevcvixe5a78tf6yzw9y7tbtnb11qc7dzj0tgwrb',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'amalzlvh2z1hjedquzjhkchlyirmtqm896qo5d2ywzy7kp6nzm',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '853agw3pslxi5nbosev3',
                party: 'c9kydyzr106gftjatnuqvpe62i6uvg3d3dsduljf8bxr62sacmm4yyqhmhrcp5mg6cs4azkby5ptxgpgijarq15bxfze46kwxuova3rg34wnrnk9wix40va0ewx1qs67bv9ebvlfjg1mfbscyxl4s8pjstelsljj',
                component: 'sgchgwvrtypl01qwao25nhzowelnnx7pwv28digbf8qm8j56sm3tph5hoe46kqmacb3f9ztg1jkiobyick23959x470yyl31tacu45y9mogvxrm99i8ajvxuri5nlq9h73au0h0uhan055gdgimt5sxh631ohjws',
                name: 'uoz79xoyscqoqmxr8hjpzqpo5cj2zv72bs1ugoyvqaqdf01ia7ng5dnvox638dypyq6kjdsz4ny1ondqrlcoenjz6l1o8vmb7wb00vosiw4gzol0n2gragwkashb9lij73dgsiea80rxz0z0ng0kg7g96x6csr2u',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'ki88ck7fxya3ecqvet6alxlw3gm0jx00h5io5x3hb04aths7daqau27qc20nnjqbwbsxw875l53yb1ide91rc9qfyr78jdq0wr5kkbkp2zo43ukhi24ncrrgys6d8sme5338gkhspfb49dccvvezlk0zy0rcqmn8',
                flowComponent: '0u8c9lu842hcyakeq6euy7s545uufuclgwehpwziinsa8h5s29xx3x7uc75q31ivoomj262totwb4czzpiums8lxofr190849qftioshenhy16i3g8sjgz3wv16t812pe9b7wimwy6jroh6226glkd2hnpafgsc0',
                flowInterfaceName: 'b42qyjavl5nxks4hiwkrnq6v414fm3bxcc6mhu412b59ihr6ytkeo84nwy2vrqz6y83046rjndavqs8szjun6piz6u1nikk0tzq7y0j4r9nmeyh9ijn0xnqci54szfbwt74zvsm35zrovpy6ahg9r81freaakfql',
                flowInterfaceNamespace: '4cbyl241rv1quum46k5837oikj6w3ujc8kpsq6lnjajecxxp0m6trlvy6fs2ifr4oziorusyh7nzm7vgmprysdim56nrv634pp2yeg5cwdopug9rcfzzeaulz2qgbl14574zd7jttz73itkk8p63lct1rabl35z7',
                version: '3041a7norj7fvxlytqy8',
                adapterType: 'ryt3vts8xpbmcbxnxf0lhmys433rlwvisp02hcvj5h4vwhvq4gj7u4mazrf6',
                direction: 'SENDER',
                transportProtocol: '7rjpfcdqt8rzafsfkogxuujfj5m5edn98yeqt1dufv2hpv7mkl7h2u60bn5b',
                messageProtocol: '43z1pyb4ggatgu0r6m6ul3sogrd9dqrh8uxmkdpeaxvinauqvm07983t46jy',
                adapterEngineName: 'hlnjbyz2irfthv57ctadd3ascpo9jfkuajn01kx8o8ay9rrlwqtqjx9yewj4fnfa93ifny5vzvj2vlvyqyikyrplbm8tfh00bksg756m0gytqvooudb5lrr7u7r121089stxha9t0kqsi6n2e8lh6tn2jy3dve4f',
                url: 'n2o78glwh0wk27vbtdnwlsrrlsjl4ta6xkkvoqlhrj9g5p5wvgmnzv8b3r1pjf0incc5oqpwywdxk07en06fx7ipjtf7m46ein7vintsyqfc3o21ngz5vj5jv54k6xtq2gdx0kap11ei1lg68xksxxq6mrreag0frv857znepddp6c3kvopqiesk6yy36wrhev04cv4pbtq15yiw1yc8w81707mbe5wdrqpo5ex4tc9l3ik7awvxpizhllu8x78l5u6bfyyyg9q0psns28fp0snkgv6dw6lcol5mgwnrx7cbml1v4nyas7me0b58nl33',
                username: 'lcsj67fvz85ukncertokyf754pbm5g4guf6lyb2q9r15t2trlgvkaw6r0d61',
                remoteHost: '1jhgw45j2pra6zt1kbq5uxfrgaah5qw1w99hbu7bqhemy1g8guu2fpq27upf3y7ngc2juajcaitdfjldkudqpy8581wlbyod1u9bsf884tyxs8nxwhuq7ga0ok75emwxm30aek62hbkg33rvzopxohx4vqasfqtg',
                remotePort: 6115444483,
                directory: 'oed9u5ctmignekr1q6wiskfyp31g1u4e2abf0xk4i9cyhuwy8gm99v3rmok183k95yl4ymwhpnb5m359wy3qkp2etfhf4aj12vypeleypqi11ue91ccoyzb8va4d9dv3vlxiq50jv5gn2p4z7hhqteb80oembo07co47spq5kmoo6nv89jcw06j8ffjiwe1kq6yku9gj2cdvj7xn1h5c14c0qtwknk4z1damggwdbr6dbonxuo6vbjo3wrqup6pu3i3h328g94wagg5mo1y0s3r5d179zqybgjz1vhgnhx6k0zlq24y2llm5qi2hdy69pyquyr0yi75m9k9tqs2fjqp4scnhllcn4jdy10h2bkjq0oknrh2xqyxgtqcu1ywovhsvwf88s4sis2c4wpj33i0j9uhimy1b1txeae9bgw2s0zotgn0b307da2ctwjo565qk282i7dxzjq2bfgo2cjnu7sdsl5xggro0ez4zjcy7atlzknaeczlnxgfc4tk1usz6amw371l2rb80walx97ggjrqinymebsnsnsifa3z3sxl8munp4ftwcahi69x5k9xw9bzrld0v5w2y6bn5sbuirwggx5n9h1qu4wk3ghphcp5d4let7i2ioh522y4chfsb1bn6uven4t300pqqutpab2jd47ctom4z1choya4p26uz1u9mdzvf4uempj8bc1f3zjfzwt3r6mr9gzzjnud7yeuheib2r9mbf9osoy58rnik6scdmyi0jxpvpjxba5bnyauvxx0u4x4sxsimqpj6odel61qful957u9y0qdv23r30l0t1m7slw0vlty9958ghijypoc1f8zysj4mc195ud9e5ikroyspmr60yh3r14dazhg4y8f1om32ydk8o2lsxgjxmbio0qf2tv4ee6d5oww7txcucbsfzkmuknde7567eacgslkptryynijvg1yr9v47vld5ek6kp197io94r0t58nz2fjsgvj3cm6cfacwmn9sgq1l12qy5xhph',
                fileSchema: 'btikqgrpy3ujey1a20cd3i040p9p56jlqs1o6805ncb8m9ihw3u8l7vb10txnwpwqp0onvc87enuynrdjgetsxmj2ip5djutg9azfn1r4ocwuk5yyty11qadqev91rxtnr142gzbd0zr8mav8zzddzo533o6eeko3fhsv3ekjmc4ufqk25658qx73flhehsquuyxpzcveaj8ye65rzfar6hgpfbhs1gx1m6wkkm5mg9aodce21bc73x61dqfccl0h8lasnc95yx698aeeu0l3u5oflxk1utjzkipyjjadmupdn9vd2k2ii4cqmuhmy1jrux6l4090rqk5o7fn1ym0z6u692p6lb9dox68i2m2celj53bn5goyjzskvphfjtndjdy93g2s7xl6wxbmlicfuhvgqv28yqovpkgbnos6wp1mpyoc8l31uukhqepkr3u23ec4kmdictrq487yy7yqt4f7s46ml54gfab0xo5yzrrqsfomq4c65sbtrx3rzrgmrlbdelamxpsbwxitenearu69z2sgo7ynbmb3geuljnkxfz3wfsll2hgc5aetsjlcjbdknlzpbdietqp3p52pyevl178bon6f17csz1kcomxqfs55a4fuqtn8dob9g882retbxup7lf249lj90y4mmxb3jpqzjqtd6ufc30a4jra48pb76y17qcnv97b4u4s3iur4tvbsp42op4xbz7ib58f1vlk3zi0hsbfxtepa0a2ynyg1x8dlymjvz9s828ttisn1o06b1xeh4elzu3qu701kpyb7s0jvzd1k9b49evgyd366c4irmtedyv2dbjpwczi28hp6xcyustaluq7y7gya6bjmxe8386lhqcoi4w1f5owx8mpxgncjvj7jvek44f7558p3gr2a681qi4hqg6ze9lcfs6o1mmdwokltk0v19w816ltgn744ea2a6007ge4e6yevl3csguc7x4k78ckuosjizfimri4ljnt2qq0f4whrg98j3jk3dkl35b4',
                proxyHost: 'nb55klnjt4sqgaicmjrik12oexi5rcg9hfzleqgrsilurqmj45912fa2e6ec',
                proxyPort: 3552988620,
                destination: 'x51nkd7bhzw2oz92n3j5ocwm7qswt3yv9q3zdvy4q2xd85duy6sj4q6jlczipiy7p37ki0czv9lwan1hvbmeoz6baipzg7k1b8pak7cnc4rzcp92arjwo8v90jzxmx95c82k10ocbw28ymzt6xwjfztfdjucgjro',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5zk7o9l7ex3m9whfj1y23y6j33w03znda2shrko96yjvuuuvvujphdowv3rreebpl6f935loiknjhkk7h6fo1qjq9ersowscb3tt3yyjjktvl5l87x75i1s4s90lyqxo16dr1covfzcxx4nkbqf1ybizwp489ifi',
                responsibleUserAccountName: '9lvfo7nztu899i1ce8u3',
                lastChangeUserAccount: 'tfzwgxwv36fmyy4gogy6',
                lastChangedAt: '2020-07-30 15:07:41',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: null,
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'yrktczf0knzw0ik7dbm739e0jkjle1w8y1s6cb1a7ea8w8oysp',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'gsr96lwkaxuvkrzekbkm',
                party: 'qyjbmzt2lvh1p55ocwu2eewnvy216wuwl9tyh6yx22tpy4ykdxbeayhukc3owaj69s3cgx63zlma6pqkg51r6l8aq147q9h39fhe9urlc70e9omg8oqhwxat5bfczeypelr09e3gs7b7isztuqvwv498t3firiyc',
                component: 'kuumx70opq3nywexai84rg4l9bkp0o6qdacllps7cyed1x7o344wqs1i95zimvda49cmbqgt7d261w5tq4htz3id13m043x6jt21ui768qoynznvmh4f9m8e90uq6o6ozhne3yrvkyx6sxsanhwvkw3r1599rwa5',
                name: 'm2jhqru167qp35un0lbm4juux60yyw0bhc1xcv7808f52nyjlz7u8hlchy4j8o2yozzs433644glkcjkaylstqdzqd9q6mu0iao3f8mj8nhfitjzhyby5vfxttfdr4rfkb4apsheif34bjhmeki911b0yntcqemm',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '13hassy29oezqxwypb3kg4jua9z9lxto7qvgs8u0goa2c2p8z468189jrr65zdsk6s8slj9efribr0hrl0u05ie1ubz4b54miwwy946gbnwbwdpbijmixj6a0n2qij4ib2cdw0gicu3jxpuijk6od02ao1rgbvte',
                flowComponent: 'li7828edhl5ssyqcwzmij53hndcgv5ohorqp06noz0fo0ixra00o0s8aowez6uuq3ll953zos5cv2p7gq9xd91dq6ni3boljqopu2xgi7cmons12pyg3ie6q1sg7cak0tqhgigarujn51d36wdj3mcnrinkpvbgc',
                flowInterfaceName: 'eoc12i748abcyp8f3ji5vdgz37s4hidja3kkbv145tewad1ewxpjukk8d473vofsr20rypironnjndpinmcjqm60ioirywwtslx1dyo0uxtn0eu5zuyxx5d8d0kjjbk9d520x7h6ulcbpi3d2rmuizilqv97godb',
                flowInterfaceNamespace: '9pa8w6gzsfwkws6sj26es1n1n8b9dc1y3qtm3r6vhg0at2e82bwmv74mehnarm3ee3ef32mn20ulwtxxe3f829ibtwazehzo354dzxcwq26ue1rx14x9544r8q4h7yfn3q8l2k46soibfpy4rhintyh07549kry2',
                version: '05pkmoo0j8jm8q8rcnum',
                adapterType: 'vrdwigagucxyi3l62zhdiqusvnwedv0w2rbg0l71jeaxtfgueycl840zew1b',
                direction: 'SENDER',
                transportProtocol: '5x7gk3rofrikgw58ya2xrzftjag7yl1ja9fqrpi2oy7ndd17400a9bivl82z',
                messageProtocol: 'zi1q7lpeimlr0pnwecpjylhdgs8zf6w36oskmvvs32ocvmvlmnr7kx88lv3f',
                adapterEngineName: 'gvdy89segqwjbqz8vb5zl47v641a28lg8oscxcng0j0tkiynnv81oj0cgkwfwhf4m72yz6lpkc2mvqsfjyp4ghviv8jf1k477mdavb7fi6yxtp8jccced2mm2k7zqmxczmcdz93unhdpgzwbm6z658g0dtol58yt',
                url: 'd1nu9zqgaf0gw1n5t8a19xiy6k4h4tlwowo3eeahck0e2pd4gjrqaghz1yogowgz45qbfdkorkevtd1k0tvl3crqm7fb7bi73ncevxlxxjuakw16tmy5c5seclr9l7h5vgdmewp0g6a7svsok3k8d4ntyebrivyfnktuq3n98g7b62jsooa9alg8lw65j3q4wgpn2hws5c8leyblby0jkepo1r7h8pkhrcevl6s59citsxpw8xb6gep4mgg4q7kxlxetj3qpldvgxvtincxvxqctfa1ohx7lnr1tz8d9fn0vkhesdyzgk641yz1fttdt',
                username: 'tglor2u6deldt8fatik7iohs8domw8pquwxoi96bsv0k9k49pqdwl3poiyls',
                remoteHost: 'gjf0s23dt3riyxr28hhebmrg11q1ggoi7ehpu7lpo6prc4fcj1afwppd5webhos84k3ruyp20q0sfhjtkzw0wjn2vluanp5fxbisj5n5toj4a9nnjxa3neg2669or19ji5vc4zpsw36iew5o8klzaqcea697iauq',
                remotePort: 7504303561,
                directory: 'krgqaugesz85fluab4m0tvj08awyd5yyclbrnkkut9f5qwwxttrkaukmuvmmiz1aalu5k78tmmq9r1mp3xsl05kd32bhcbnjjj4zvj12r2nhjw8lo6imjjkcuyqs0r18vmf8lre4kspxxduomy4fde4knna7y5as7v7v33v87fnwz232s7ez2lv35tiql62p8ool92bdvaeb1a0isho4vxhf9v172sefznw9ixuoodztdezm1vkmfr4jc6w8kumttg1un2bh92rmyi5hafd5lsl4gx2th22dy4j5u8g5na0omlv0y9492ybx7bs5grlre8n31fqm133m2bmhmojnamuscehjh057b6qqhavmfl1qi8nio373xwhg9aa77xqek357dgvpw8k9bn00n2fdmb9pssl6bscgikrpng1yd1jpere1a6xwakpal91isa3caakvkmn743nwttdswx0a5nbquxl4m8lry15o9rgris4fa5kvdumnx27n7b9232whjwrl4tdvonbsz3yasu6wf3fb2p37a7we9lcb6eyl21mnu0jiry95qqugg4vwhfv8o277yl6pjes1l78hue48tnwgtlmbee95ox2buhpxlinimqz4oqzjo1nbne3domegdtet0qrj5133hzukvvrkn3otxhb74dw2z3bnmlrs0zl65v5eaziqcn9l4ntw55ey31w4ornx2ll4809kay2moj8xfpkokaiz19d7whez5xu19neo0b44zl5u9lcondg80puiy168v6c6foyn23kjebtmo53cg8idkz42abx7hmwp7u8ru5xkngdx54hz4oewhln4uk2gqybz1slwgcswm8y8toyi4rq0tk1nmsegigzfcerdmmwg64dpdrh0d4dpp5ht24yfwbp007p877qiegz5i72dvgannwynwxmplt8mislq70rhunyyj0tmtsrp0niemghah307i8dda1kxkbp2ci985q7aif33huf3mg5g1c66d6vieuh04gzo5c8y',
                fileSchema: '7ftohcrbri2pdaxx59dmlbq3kpkhlkqpkbrgewx3w21vclpki5uakmf6hgvuz87q7upiq4wjcqcioxkrc8qcgczy2ez4szvhn578338wjmr7h5xb7enzspcmzjvk1wdlmo4mp0d1tncl43t7bkkwsrgvw1ig00813k39oii3hrgwp7n4cxbt5tqpw2e4v3mjs2mcu29jbdpzabjnyblbbst5tsalwqy5t4num1brm87gyzm8tiv6huc8drxj93ffczt3rqdrxahh2b802xp5655113iqzjur8dwfsj25j97eyyru8mq3z7u5wuqlsuscsis7x6joylcoo3w1mlg7f5obkht54qn475cu89sdboj2vxm8p2jg0y7uguk1fnd15h0pt962zbrtdafggmyiy7v3x9ifcap0nobuq9gyxgsrcx2iapt0em89gsgwh8srmka34ozg00zmwq4l8mif6oa5rtstap51b0j5notf3eegw6ldsn6vkb3lu9zg5t41ee2ucrha7nukx29umjgfwldeyss6qmynhr2oi3uo2ap6lpixo1irrc34akri9v5xqoc6rhx2d6jk0htc9nzn0y2o8bkgqmvfcby6m9onic15l0jp8bzxsaww7kjp9j665xjm9vrmzcbwd0zo8e6zgknqokqws5ouvvxxepo3uksv9xqlsvnnbh9wty8gwhrna7mo1xtzajvque0fcq5rrutk3gqiyt2m1625zm8tihhytjnf61njn5bj7ryjhyvfahljpn37gvup1rlhr10uweu096jldywkak9wbm8ulfmkazb7p55et2ubepq2477xztkqpsec6p8ebw1ai0oa0w2gna077kcavxl501572fejpcnymip0zliwqkdoh4qv90s6zvar7u4af777ybn0ekxfhil6f79exjzflp2qvdqif6v5qswcu0sc0hzdmxwo60ej5j9egcovm5jb5p9irtuvh6wcur2i4m0ofsmgi7xc9o1ufwohg42ukeuuwzwb',
                proxyHost: 'qqri7fdpsf1ldw4fwada936wu1v9zza2nv27qs167g9o7om7o42abkn5a2v6',
                proxyPort: 9505244649,
                destination: 'sv57kmvktcio5rnhk5iqz2wl2d1f66z98n5wmmhenpwk8p890p5ustt5aebj5ndzbs5l3dkw171id21apds2pvwhbfd5pa18g042apgvlyv3s3q76koss39houfzmmvwko1f5p44yxw57wjs7e1juc0a3hgoeurk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '91wa0p81v2qj09cptvwugykq5m7vvzmycfy53hmvqdnufzgma343oyf8wf2seystahfj4v11sb6kikyr18j2t7wa6uj9aamz71s5gzkqed46i4ui1h8au35v53kkuq6gwf32iuxy8e6tsemjydbs5jkk0hd0c0sa',
                responsibleUserAccountName: 'uz5j4vuj9tegj21m6lbp',
                lastChangeUserAccount: 'z3z54hdqtisojrz4krwq',
                lastChangedAt: '2020-07-31 08:22:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'rseffme9l1q7al43dnfyavg7gwj89yma51fdser6muhhho3wvd',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '1y75rj5uchsoqal2c39m',
                party: 'mce0yyxzhwo5b88dbfnnck6heh9zcsk524bij9z50lv5o1h0txlek7yyuxfejhy47pgptlolsm2kxzzckm2632ocsy8aha8u73h3jf78aryil0zqqmwajete5ei2anakjfabgykzvpt7ec39f2omk7z3yzvuvxb2',
                component: 'xcl0n3wf0sfmbg6jy1kwa5q18qpgcrmuwcavp2927v88wmssqth9ys4n6at0jjnf11zbxiku4hnueuvtse77eo6b6r7q1qalp6zyayuqe482egk32ru6mjeuyag0zs7ff76scms7vtl96emvo4povia5t8ldyj7b',
                name: 'h6o936o2pn2kqexysh88wfmbtgo1echsagpiy9vwlvvtv1requf8rx5yhmbelv65wctpm0z1ufafuzn2am2ept829qih0t8flaqupsjk3qvluwdbuwkpztjf1hi2c3dzdqpzkzp5foffp8nfj2dr7wx13ftyhnb9',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'y4tw3wsd1lvwa7nefafgi4v691bp8ngw26qnxdv007ophzkhwipn95r0vz00oldsviqxf7iio657x41dtqccr72ebxxpivy29hykpdrofouii0rn4nirlff8nqgn776rh5wah3d13978s0hn7m90ezu8bxh4cphp',
                flowComponent: 'tew82jf72rwqehlwtygbvodtruzmn4t9sp8ah77zlgmfmoy49t4fmalykp0ik9inyvomycrwcbh9cuidnvfdhdr4y1gc4iqea5tnxheuhcc62z04qtfwo796uck0kfqcfybypyj9fs1jvge6etbojumjl0p9egxy',
                flowInterfaceName: 'kqj0li6bfldzorz2zxn2jtoqmql67gmeqjeorhtdwq2pedn4law6eemcbdz5jrwg5yp4emh1r0rvkh7g2a4df9jw5aracrb3nttwekdjtj530lamm1u3ewdfj9c0wfsnwypkkwnqwau2tun77t7jbhunlwnebhg1',
                flowInterfaceNamespace: 'lgmcspsnovbmnrjhy2p0k2460dmfbxu3w4izdylvk5d97skdybh22138864jywc8ym6dpl514c1kb8ztnntdgfa1d590ufe762nq22xsh5mo2m03cczehq6bj8k2565do9od60ugemdkvgo6ffl963h6dpr2syf2',
                version: 'cxmiaova0rs90lf2ob7h',
                adapterType: 'bfqvrdm0skcba0knyvk806k8q0gkezgl9bijekef1mysisbrrwsu28znr1bi',
                direction: 'RECEIVER',
                transportProtocol: 'rk5av3cr3ltd3hqv1l1rq211qnb6rtyvxcj2b4fdsmvxq4pfmzeuk6wwbytk',
                messageProtocol: '5nhxpdbmc7bpzu0la93a9q4qsm49jn4vajrpvtz5pm3m3eqwghm7ng3xpan2',
                adapterEngineName: 'ntc3q8jpzl6mtdc0pi6qq9y1fmfn5njdvl8ysppgb74iokv2qvwc4ad31j1lkde1ngvb7itg31b0hce7yb040o8jm3cl5va1cfjbvsfxgph2mki85dp2lfz8vyh3xwnlfx6cyluh5ahpqbmfluilxtnvrk8lqtsv',
                url: 'v51uwpr9hsnk451une8ynxyk0lkosjnp84xo58oqjqiwhypuy467hdkdiewh42gpmxrl9xa3ebc84mjfvmlkrn4ytncu145f99xa0fl1i3yia298hd2mbg8dbo4aa447oqm49nlor0o1rn8bake864kjl73pfo9gem2gqa8p2jodwbleypf9ms5imokie38jiytixq38xz29tjd08mh2az7ekzycbb6a4jd312a20prpzdqjssessb9zxotxqow75rxr1zub5x5cejlijcus80bi9339zqrar7gnla4nlx7816ec824nqtbd8j0ebuzd',
                username: 't2msogcj02h4v644s80ruqxdm9cikv6jwo3xv7xvp5yjztj1rnpbd4zeln70',
                remoteHost: '020416xfausrkmrar1nq3jx2mq5dmjgn2ah0237av9juizariocjbehlwh3yj6pserlxxatbuug15qm38xj00pnsg5sk3r5jv43mxs5dnojaqv33lypz8dfcdc9ypzfgt8yy7uhelfb6m130paxxx5371nd73s3u',
                remotePort: 3161912766,
                directory: '5hykm1o8uw93s4r7j3ou0166v3vyv3q14ctx99z3dujhmiog10wuh14qeuezfc2izjaevrcbg2xlz99fhceaujizzwhp7lduh97fl1uy3jn237jw6zgnolpqwoeawz67h2dyfd69pyvaio7ee8qgy3y0j7cmt14jdwovb31q6u47nnzz2a0njbn2xjqk2uc1lftlufqg9rzd0531880h866djrvrv55lsrueovz9c92l9irqpskk62lgb2lmw5udzvqyf7wbidhj85gmryakrnt7lgs34lf0bmjtrvdnyi3mezzfjueplolisvtn76bl25acyq6vylis56nsoy3uv23kcnniqe0og8hseg7vrsbw67oss3bio55143zx9j31gpuj060mecy4ay1825rt8czlysqen6m3etpmweheqa0dbywk37byj8qk62zmlk2be0l2y0ym3249a3anzbhlhydomzhrpvd3qyrq1tjrx1qgxro3id33kxxgqwqvx9sr88k2a581a43lg0vr2elszwhr0327p6020i2g85gad355u2gpmpt5k86ejuhv9b3804isfx2r1c130ucggmmnjxu7bfilwdr6gkwgvs1kkhkm346b8bfdu27ym0jd8pugemfmw67ysbq17ndfdpfxsun4s8383kggzawlrob68nr2noemy7lhi7m34m62kds2l7il7tnc23mk7gt6c4873spbobowcxyjaaq213nljmu9zesm7gtl7cae6sq6a0bnw6vuhrayelmy2e3ii0vb9ayv486ewph8byw6lvyqlrmz0r6eahinttdmlnbzrkxj4vpwu3l4gkgcs39s56hlp21g0fsjmoaizs5jxvxjjg55brd56q6relhvkusygafzpbexogamskglaywbcpzpvx7t5638d4pkk15zo79y28nz3ugjl8jkbb7t804vkhdevp7ddatulcdscfoypgqeoxfiloccf5m7mryywiz8z86jjubg7qohj09wo74a9xs4',
                fileSchema: 'sizox5jiyyc8rnzb1oq1u0uth2g5mkv9ryagudcseaozc8fqc20m2lklaeha7b5rynkx0424skovjzkyz70xgmwaowyy03wdte5vkyqinln401ib35hzr3boyjn5i7b0zlqnhazy5py3pvzla75c8s94p7h4n95y0dw1qjamjeu03zc6zcplu9a6lxnx1kf073hsbpbhqtn655a6sh7zu4yokmzb8x0vr7x6lnxckb6a419vmtpqpgh169wasijh4qkw2jjmog5mq56jiq2ywbia29abjvbfwgzg5tjpsw4ya7grxrqwgtk7colvomm57od1jnfgrzplodknibvzwqc7nff3czk6k1vryxwwaz9muwo2wql13r7mdduyp1s5u5g7fmlzfjh9vnwjlf750rnnjvnsuperwixpyylmc9m89eh4l3jmef4xp8jo0a6u51j4kew2abezfux7q10vnnkw2k8cm3vhncsnffyrmwtpx6occg1mmcdcg3u52ngmsaa0ugrgqfcy33ctmtjyf7cpgvl3zfrw09artd0pffkmrn1wy1pf3pj4xinkv2l11t1gjf76yotz46hho4623osa6ljfhdp6sy9xil0hvcnhndud71q5wco2i5v6zr3cby463env1736mj562xvvj9ghqc3yc1dqdorq4s4g3j1ow1xpwj4d6f480icsexkqznk0e0cm13untqg23986fccwa67ml9i0y7kt738764mni25j4vk1qi3m3zsqrjk39ihqbjvqsnv1gj16b638b0b06uq3qmhrz79jrhlnnrq0l8z4roimwolswv2p5g9g90v4jvzsk9ie611qpbf97c221rtewp5zmvxvrsihv7w54v2l7xna9hkeoqcxan3j4d4qinwvdlqo2oategy25mcj3wf1d3mhq9s5d9kignfqbu45t9g1myoqisaem7ltqxcgfmbuel1acnr13g4qffmr6lo20kerzh11vpwck88ot6mqm6wlh98cyqlm1es4',
                proxyHost: '9gt0b4001ciw5fv9d0udbxoqk28c5d79p3j1udb1lh1i7mf8ntm8v3280war',
                proxyPort: 6177416496,
                destination: '8b2h4zxex4ttaoq9pi99if1sc6gg1srrw24jcle18yt0mg6zmgl5l15qc977n62ppby5fg12zj30k889jqkbupf2x8wnc6t4bdmfygx5f24d3uavvtmf4qva4gh5xwrgufu0or0cb92in3gp9uj3f4wf20iuoacg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lnbyjralieetxk1wrvnyb2kq3r2et004c8hpmf36em3ya779sweigyemxcmou48m85j4213c9nty164cdl10uukdjwul30cdvf1u7rv34ygl6n87d2e3azr9zmgl8qz049zro791g1svsrmt8b01sngqq7c26yuc',
                responsibleUserAccountName: '5o8gyoye8fqqvcogitnp',
                lastChangeUserAccount: '241lc18kohnwuupzjvmq',
                lastChangedAt: '2020-07-30 15:56:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'ofd2wphqjyjv2877x2uoj8jhkfk99it8053hz95c',
                tenantId: null,
                tenantCode: '00d2q0i1kany413j89dtir8gnd39s006a49o2y36s124flw1zn',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'vk5lmm04muh9r10hivmy',
                party: 'n77w0g1vxiwaqo5if94jcqwvyx4guf2vequlfbrtezdib4qyedvzabv11d99z2thx8o1lbbs099j4zrm7ks5zim524gpcjyr5hn1pf6awwg3umxr9fgj1zsuwibzi06kc0i7m0dr1egjl3dqaoohpzp95wz0x1cb',
                component: 'ylnkw9hg9qysubstplxf2pirt25xhekpeth126hxkxxdwo3xpkjndr4ggbr812puhwi3lq5zl0ciqkkqkwq3ce228d4gbl48jcjikt2ig4pkqs0ifj153rkg199po0psybfsedt5e1gqasrcbt57ojd6137n71qt',
                name: '5wy5vg0h1iyy66kkz4whw4aztwhmq22t4r0xhl6qw5ahzoje2qykehmcw2nb42hig56eplio0tub0c6gr3eu7ms2gqv41k17xruh15bxkckp7g41aowfmybb7p4ft5gh7lysnc9mkze3ud77yinjlsu8t0f1tc4a',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'fgnerd73g582phgg5zmwfyw5qhjgrz2oqbym9wmi4g02vq9mstzqyt8ktlzsqgc5p5tjx2u92f7z2tz8jn8nnyrz7j674hnwk8cgguaj2pxg3c31zcwkzeffrqhlf7ye5xa4881af4qr7sg1e837s34n8a91id71',
                flowComponent: 'cv7ovdl66n9yg9r640ldn3tcl20sbq4jocjci7d6as0i3vb227cq147xj3hu9tss8173lonk3z5d44u47kp8xchi1b45xn3x7hv95x7uqfkz8cx8v2iozv6gyy48akw1gp0aphxoyua7op9md5chx9wmbym59ewt',
                flowInterfaceName: 'da6l2jd5u8xszxm1x5xh29wm46kota3qwsjgktz7x3ty8n6z450yx9smxl3sez4mb4qvdr6y3pgbm9jv009r78nn6d95jp4hvc425uiyh0vlxsyz0jh191nt7avpyvktco8guv7kpnmjo9wx3zkn7i34ae1gl49e',
                flowInterfaceNamespace: '9qrpew7wyh46xaw7it0lcyr283bgouvoxees9libo2xopn51oysr7t11xbxqw0w67cvkoe4rde5bbkfa93saln7bccmwtaozksd5tt9g7n294h68biloul5oi11x0x06moz786eq0witv3zssvzdi6r8gjjh136a',
                version: 'oqki09sp1qncon5hdl7n',
                adapterType: 'ydzbgt7futdf6d40vtbw4ev8c92is395pa9744pf3hes7ywtjw1eqn6dfgdi',
                direction: 'RECEIVER',
                transportProtocol: 'uii1tcj6fnvub40bqopobkfxrodfihuavier4jn7jojsrsjdyu2uoitvx94b',
                messageProtocol: 'y10p0gz9zuhbzgh66m7dfbj4o3kyob6tb9aw038ux9d00nz9s4ch8nuwhrjs',
                adapterEngineName: 'd2skxpbff5wtyy2kbousx12r9trtp44tp1fs8fcf5i2eymni2uex3muru217w6smi26rj9fzpsci4k5ww0m3upo4i0s34x9axts8mjqrfyq0b71cr8ok1ybuquo1wyme39jvj3tw0w42c5m0x08r2729mli3srhu',
                url: 'fon2qtvygbf3s5ed2khbc7hztgjof44yfihyd3y9l9qn5ct6laa4xl2xco4217tgtg78na4knad32hl7a1k04l2cgi4im6kyxtu4u2i2zw5g05t825byj39d0d4mnl57aiwu7mrhkre4ccgl33dc19hf59yaclatvma95vmtrnq1mrj794qpgdbu9o1b082hyyryd76ymi15xx11rre4ms3qikpbep1lmbkqylh23ukaqot4tv08e0dsks5cxhyfz1hvyhswjvye37kwjyx9jbhdgiba8dm3uz4crflcm6ujvt5dvgs9d4q2xhi01don',
                username: 'h6gurdylh3rs4yidecxl0ky52y4etyyexrjgha0c52koo7f2damuk7w5vlad',
                remoteHost: 'vszu1vokgocrrz7a4np5so8sle26upazckqfes86sc32tgo2451t2sqdcp2k1lifuvr5lwo2p9yo16d9ofw7veetjf7f6cqc4rmndkt0baoxhwms862z058yj13kqtfej8clp5vlnyobodvndv9yax5tskok0m8l',
                remotePort: 8804805765,
                directory: '0xz9eu9r1i1fn3lx9tow68e9g1v754ctn1y2bjbe6re9qzyrroed9kc7kj8w0hbsuydb0pwqn472u1hhv5kyxdwayyfa8p9dcfilc2xior0qg09iz73p6y42gnorcv1yx4g96c1loe8wl2dmggq6d1y7ckesa65wvksvfliq4ieum5njs5ethyw72vpv38y5jh3kbjfw70ch3mpnx9kb97vavf9tcclbqi77zm4zewxyojc3kmtd3wiz4iias044w6rwcgsbpcac45caafg7h1bbsa6dfdo3woi8p1qoq9malk683wxhpbanclzqronta9178opw4lq3ykc0n0r0jip4s0136c6t45rmxnd45g7iypszatg4txzqc5a1rtdymd2eutjp99y5l2552l1b6zm680yvqfmfw3ywzimf48ghjehbce0nz3ern5x9qxn1oryoh751ay4b9jxs66bnp2pxd1p2l8frjy5peq8h1vozw5inct4jukq1xmp1yy7l5p6lrkwev7m8gpx03p5zfgxjc007ndklf3a0xowshguglri2j4uwug4ym43s22wmn5r8oze981y2zkc3zuc9xiaa159m24x4t1cmj700hr8bxf0hynmtyp21e9su961s7quukl619jim94vkcx61sgqlenke4t7m50ehwdqmiwoaw4mpocruupu6v1loslex0msdum9jz5dmlls5f0mh69ps163cgdnwjfny8l4citzotia3libqtkpeelmqsb6kq5bfgf8lfxdg6073gdyj5t7si996a870pbpsybo7ihsx22qk9cxz9bne8l08xureyyim8cw9b3o0gjukdr3hggw2puqpssj9qh03u0b1j36n04uhprv644o11zb2w3bmgwno294br9cdgm7pmwf1bakv70iuyxpv1itrdcfybhfvyzj572jn88uw15vthkha0jh9sdaqd6qqnsfszzzyc1pk5dexatw0tzg807ttyw2urf4k9wjg6d07wgcsgcj3',
                fileSchema: 'zpvhuz316qp8eg9213edwbje63f0v4sb5b1r8udptvk623b0rwx7mcd0re01jxmi768m0nqqn0g46lbgr3lebiqz2q9r8j2md7g5gb02nv5f7ahl92bj1eqgeedvxz5mnsakvj6xuip9czz5rqo1rtsk7w14vvbwtiaz2f7jq6y1sfiz3fme7tn976fwytl4tjslpufgzle47z3oiu39vyqble88x8ml5c3pvnqbtd0z1rn1og6ajj8f9886o1h6yqdrixtvu8xpff17y99xhuglglrv67uebz69q9nvto98lhsqzesjem1x547v0b91py6c1928poe67mqp7a2aju1l56q4awkredibdwzof87jj7npdjx1neale53s7ivb4sju740gyure201my9s91o3wnp4ooxu7tv1zyj6reu7lkn24how6tn883ffdn47k1bnnfulqvczut0itb729dkalfm7q780eka4dzp17f6p38f77i4uyhyavoe0f47zhkifnqmlzecen59ujpkb2npijd1xe00cysmv31x16uowat5c3q2iwi3dl5kimyptvkxx8khlicnzvsldd2fn45wnnqbnv3n8632krh209wy16ob4mnmfpf1ldjev4iejrk45qcdus4skb9uraboxvnfgsixmtqalnqtj1y4lina5eb4lgigjhjk8ujzu8r0c66sgo6vu4aenrw1qwrhgzkwo3cuxj4wttf2ipfk9psp6i9ph9kwz796cis440obntwr9tjw22ci53osiu8u59lvryt2cu0jst9pyo4btln8i0wqcry3rm3e4kp79baj7tz4xfchqeqxzgayhsq0jkjos3ukltnlyf2j8gl7k1eqnk0edl6n6kswkvsemt23zk8agiqfit3h3ol7zdcav2i9qbul5b8wbv0jb44bxu2gmolaqqnjm0sdahp0cvzow7o2s1t0ymyye172lc03c5x72w4157holc76su1b76k7q6drug97wisr5gh2p7tel8',
                proxyHost: 'mana4bmj4ovm67pcc9tid7tb0xri0zgz5lsaqadhjk9c5958rcbd0d485fhn',
                proxyPort: 3414881522,
                destination: '3emereibpq26v2xqox7z3kzebb44nq0yx4oa7mwenjd562pm6f74807xk6mfhdr20l7nsnjlkud8mwice6fapj5wsz8wnwidtpia6cnu4ag3aoixubrkfm9p53wbyfy9kdp7r4l25zgv0i46be8zxk445qk1darf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'f6dxz5fyhnmel1dhx0q7wrb5qw9cqmzd4bet25wg3nrgddxen8lbm1qatvprcrqv9j1llyp84lt627i4iul7xkr81gyhrl5wu2o14bsgu1o92t38b3q21h5zexq13pehp0hqer8uuyo4hynm7938pku18yo72gmp',
                responsibleUserAccountName: 'kbyln89x1xnimjw43ju9',
                lastChangeUserAccount: '95obq4axuzedwgthya6n',
                lastChangedAt: '2020-07-30 20:52:45',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'or92lcbyd7hqak1ddtbn4eifdvavq7q0za6ye45d',
                
                tenantCode: 'g9p9kvggmqc8qtzkhfvy97e4e7na2bz4cdndhw85f3smt6v095',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '53tu5pbgu1c70xuicul1',
                party: 'a2l0wm6wawgmy23m2da33oeraj4h3e6lmo811jpkoljdqpvamggwc83a0ktwmg48ypre4pkvkndmjvpk7yd4auabwnw4aln3g4p50ylqbw1gby3ll2g4tworo3v0ajpu6ptz59j11bejdjwywxgadxgyf7mflo3m',
                component: '37dcp9kqnuqxo64hrtsd1tupxc21xhqcg8ozpeih4661qsca3bm2483ujmzflpz7rd2j2sijn7wr9pdca2wvremjy4fdbjev7pan1rwq1heexrfg2lku55ufsbetpdlf2o7hkleefsa8yrxheg3ynbru42gj74sj',
                name: 'qikittvcgxwp9t4h4sfo9ffbrkeuzwb2jggjrr5767koumwojm73z72y4b7fhe3hkmtx3q5odgt0a96tpgnxma34nn8xbromveit94ag403ata0h0ad5v1yv01mptfv143o60bq5eq2vaxdyq7gzetcaznomjl0d',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'myn8huo8ehhu5i7fsatcydxcsaewv6iowyg062bldyzcff9khzln7jvm59vjh8omi1wcws8injkhjt3zef795w941zu3z986ohy6m72ev6skudikoosxqj4gndx651715nc46e2e9w8jhav1wu3o9mwxto67j1wp',
                flowComponent: '39attxi075gs07fvbckcfjb5yc90ebyt8ddmto0tw9gqlqb6lk897xl2ydrnxv0ymbhmc7f6oalrr53l71our81nge6mttq1gucltxvrkns0nkpkahtynrjwx0umx0skshnhl79bpjfnofsz4x4yvi3wwlmdku2t',
                flowInterfaceName: 'v6fd3o700d7qqil9jahn7vgo5htv1u5zbbvsdhleo2ad4hinr77soy06juu3ui6f573zchlrxixlk8xfr1gu7ehmaim9hd0r6ps4o4ga2emdmrl0ttstm2bjs44t1h9s7acxp02pkc7r6uawk9dwcvjbxv0i198m',
                flowInterfaceNamespace: 'lcxov3ctzz9wfa57q026066i9xyis2wklmk60hyiydrngvbzj7nus2fk4od6chgip36s30pgzxxxvbidnzdklbtj33rqnuqexgug7m1aavgdc26407lqegsiszlrv2jjt66wb97oi9vozygigy044x9rqfx28hvk',
                version: '7wavvjmu1tin1lcv9s81',
                adapterType: '5nx83cnwwcy86jvg6aq559i6cc6p7h1q6ho8oqb70wbu9p2wodvndkgp8slp',
                direction: 'RECEIVER',
                transportProtocol: '26l8o3tckm9ub7atin4sp4gn13eo9nmsjf91yvibz1jp9rjqvk7nkdc0ozt5',
                messageProtocol: 'mkick1ogrsc1zp4byhh6x8z546frp0x82e1e6qxgf0ucq90fmjn2jc7ogfwl',
                adapterEngineName: 'nfpcfd65faira2utj1eb39yplduvmlcq96m1zjucqxj14l4yqjvo3k2rxnavqquwgqpng0yreesb36n5j8gx5jrt1ey55w4gt46vyk836y8z3n9mqlz7sodso9shpwxjnq4113d05pfk6fm7i2pva4lelwaovjbv',
                url: 'xcihob29nrfe8dbu7qxxha1ll6sc4xq1ivf0l3oer2lf3dg2wwrnmwuhnjjte0z9naqviwi9je49t191ldvpnkhiyv8u0jlxnky81yihrpcgpvekvr9eal74zga4px29i98j43li31jkq8oh80pascn836736vytkj4049zj8wgt5rwbvx2t0zf7p9hwpzvlqzg5mlqnzytffau3zseyb6psvjrv58faagsv30tfeb94forfxdn5j74jx44vb0lz44gh7xnaln2nwq7bxrxqd1fxcahbzwkse6ltsbyywoqjpydojv30rmfxlarem9t3',
                username: 'z9uio1rm3cikw4s8mkxjzlwhuh3r8uarj6t6ymdb02g7hy4kbj9zm6vpyt5m',
                remoteHost: 'bpjmt76dawrb1lhdu1m7imvbwhnr2ygfk5bak2zri3nxh617826vpjvkjcmwni5ha5rzqdm1sqjq8kyg6qb5nx6hgtgsnn0r56umjfesx3hgosbksxgv9shux88madxrcjjkbvqp9bdz6wiy5xuksd6spj5x2t5i',
                remotePort: 4456381521,
                directory: '5jztq6nezq89erkm48qhvjj3inyz8k0zsy9tvh0g0p1hebshnuvau55x8cpx33shya77fck075a46wx98dsbbl8hueez5sxttq5a8s7dl0xf9lx6c7qb8b885slxpvidg2zzwlih69v6v0ls2bpy5wliy97y0xjc6gqt4rbrpdzuja3btiry147519k2jvdh4dyzxtevavkmnkod4j522e4x2e552bqiixfw0a4frauqr6ip6emarx8dkx43vq3ukqb131hza70v9fkbxx33e7jlh44zv8hhybzrglytjtzw7nm0t1aft3d17ov5pnq670vjfv7r2txwf8izisfpdpc0q20sjm86xv45yp4n6w4a5a86n449ifo8bom7zh5fg9qaias1tpyvto0m38bxw6ns4047bjxkbhgtlj4cg3ip0g1ef4a25toqhjca0vc75og5ppzebw0ggc1pm6kxifsb1vg2s6if1udp30zv37ed7pg9m9k0q0n54eiuqx9hjg0mdb8h5dcgpf55kitqh6xhddgw0ew3an02ot5f503nyx9c68kjbq91s15ix2bre5s12eoeoodvs1rqug4d8b0dg6r2ryvazy0a60uc8ptebdz2os0xbj866sf351d3zdgvet9vq5a314hzv4xmfw5b13ht53bqn24i2c11xo25vmxqswf3r57tlsz8kfzlxgvry1fafstlbwlufsg3hslpa7ny9aphfqrsqdihg19yx94p8wq9q8mpxz2fzsgcpl3bxjg0791bfqq6bdqvmxtw41dajcwpntm3e0hehjnd20lk9xr9sv95gux55jo83pc4spb2rygs7bbtfjz6nf7vwsp8s3c734ybgh3o09ew6ejzfe8mtddh81dbxgs2eb3judee0219qyargc2r938dbz4kqhv3hd4s06q0za8eoytzv9nfoax3yekjtvv2ytusluf3a7eiiyhb3jhauhhadwuhpuiuc8o68he1kquqbozaxdx5byt771cdx6g3',
                fileSchema: 'foz421y3zi4rb4t2o5rfq63s8z2kg3eaelsc4t8j6couebybldy58j0d7it17p4xgd78s3gi4qvd1kbb6js944u4qmboykixxfemr8b8p2415p2erbhpjmud69ccfara5bqqbnuq6ai80ul8vk0f8p15xy1b56ortgl14nnptapvk6w8jf9958p59qg0ea9fsoizm6i5ryn0nbhkskbyjo77h96a3udu1fl3gsrufb1483upq558tke7cvkqxiwn6ot4haycciacmf6o9sagkrkmqy9nw47yjiss2q8xz1go64d4n983hs80fl160iuuj7jvvkc85o7zibzia50u0s195l371rheu2nxrri8e70qd2kprc0lh3jwqg2rgonn3wxv5uoo0auzbilwi6f8xgfhf5o856x7etmfdaf2x5a5btg2i5j4wt83paqpqejm3yjai1ejibngnsh0pc0g16fqycdsmcf20au0yczof7dal3696qydg9x58a809cxbmrbs1h21unobta0v5hnni8tjp91kk7d9wzfavdngmepkbptnlz3nzlxsjlipl8b3ljkac06hj067uy96vm454x5r0vjl0ove4noj1x30wxh6ghgb3l99mgam5mlj29kyvybeexupmizt7yramy2wtcwfd3hqsmkc6qu3205bqhx00ntfqz8djqxw3etd63h4qjkkogs2m72oxckhlr0ikda4qu6qezwg7wvix06aui1wwnp117fk6elzk13vfjlvgfe7xj490axnv4xk3zs30f8ziwezm6ok3n54m9uok022q6yuxlfxq2kw1risxnxmpocczx5vyuqxm5vw2a04022sbumstqkpwafmxqjmofmbb9vccswezuc6cpkpgqcgxwu6wbmf0fs7ksg8ykn3q7s6r4bp6v14czppf8ktccvejncg2nrwc95rh6zrp1jb2yxhdpkttwhiugh6leoc8eplpteulsb2hdlg4xw2xf9g64qu7q95ajue4llmqddh',
                proxyHost: 'xroyyrx7vfaiufehvv16zddii8kmz56z8yjtig01bh9labplq8thah45ob8t',
                proxyPort: 3831071098,
                destination: '7zuzacrrdfn1fd6slk43vuzysqez0rzrcxrv6gpeyavcuis3mefxy8geqkdtwzq5ydicpecx3ag9or04mhkp2b2viy1zcrq8q34rtt60dk1gn08xn8k80xbannzdtp6jdir277jrsnjybf9wf677stwnlajoorsi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qs5ct3bzwanpmy5ye1mzpcsyinjqneo0tgvnggl57pk7jocp3yj7z8eecqy334j7lluithvd8pse62vrqhq7vzusym5t9q8yeyf4tctdi7xkhihlwyqdgpavf5gnx36chus2t0havc0ito2yqxwbn5e374o2i8g3',
                responsibleUserAccountName: 'eu91ph6bt08xbuaabf0z',
                lastChangeUserAccount: 'a5i3ucevh8y3tj7k0yyq',
                lastChangedAt: '2020-07-30 21:22:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '1g9yf1n8qov6hluo0i3m51mh0rhti44q9q6x30ct',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: null,
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '0toy3hm28vu8yz9grbxg',
                party: 'kdd5xvg6nhzy8dr63sf3dz2sdvuyqly2ieqniju3jqij0opg3vyqiemxhdbicco545zk32dn977hqdwlif3wzgy12f7oirfyo5os51e00kl9hososh2xuaip1goz6r3sepkvvcej75sudc94b70rc9zm6k77ztdq',
                component: 'c6ddopji9yst73e1kt1ohldtf882uh4g2qzfdjiapiqxsnptcvv42y37d2s6xh6oyr7pft3sgk1uq9ffyjp3h4rwmo9a2omt6kehf3r2lbpqkhnbuk02z703uwix1exq77gh2743w11gtmlwxfqd6chtbli2bw29',
                name: 't958camcqhoy8temrjjyit3b54j5oe2nen0j8g5zsmjx9tm41udcjejdlt7oa1sd3oaai2mxxzuou6ovqwst41qgs8i4gx6gk9lah4yvqalgvnn9vktom3hbnbma5ulyi4g55iamadn1q9a5sy6j0v4kgtacqjal',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'j434fhsapuimiqenq9cq677dfiihdoou1waxanw86i1yatjdzs2cqsk3mqj9fnjcry7037s8yp6ztl52dlngzkl1it97bmh4ba2ruojpeqldgqqsd4kc6hiniivoyja7nevjfk53ep0cl2c1eyg1gpvt3q5ia5qf',
                flowComponent: 'sz95oivwas227vayv9v6nld5cjubp5rdtwdpuznhs4aeyuvdmj04ozkk2cnlxe8hzk6stzq80b5zoizggeei57rb2j93vg9ljb7ayrwjvnovzijtbxy3et95vyuewumwinpeyym5d5qwpyq7i4p4uek8g5uqwgjb',
                flowInterfaceName: 'hppz5163yujuelxd2i9tee31qjoavzeivesr23e5mczpfneny5ukiqx0c86tu5m3beee6ltex1s8lmjas6xr4mt5t5ut22sboh4wtnjv4seqnd3a5zn4yckai2v32gapd0od2kq44jozy0a3pc2tdnrv9c701k1g',
                flowInterfaceNamespace: 'k2vp4f68mar32nvix5zx4cgojr00ltmeko970wj0vgavzdtcjk8iux44xcfgksnvqn72cg97p24rtgwj0y3kxp1c5wb5k3r55b7pxp40xv24u6ut1xp7yuwac6h4afa7zeijax2eq1txy1bldornlsimk70gj7d6',
                version: 'sx0vi9pgy5oqaoqzmjt8',
                adapterType: 'itgtv05915hj4ix2u3r78mvct1g4rlyq8r4xjp0j13t6jpo1ai3imueqq6xo',
                direction: 'SENDER',
                transportProtocol: 'ohv8r1hr6gxons3q2aa1qucrqqj3a5l3415vzgvuz27g8frj76i7bctyd4jj',
                messageProtocol: 'ho28xpxpy31khhk0dbil0iawlwggbr1rw9s6akmhhgc8ydhtumzdmaqbhtpx',
                adapterEngineName: 'umu1lm2gaocfh802s8aykui1h5d4m9elmu1wd919gp1lqzrrujmnx18nigj8kxa186ggp9q6wlu0vf5510ulmqjelp73wvlua59zgfkz6r39kwe2yqwt3osxl2oyr4xxtyhe4n2qcqotkjq2gnxwa8o0qjgsutwn',
                url: '7s4xz3gthokci0phdv6vmabypnzii99ej7vt19f908rkccprc7p4zliman9qwvxolzasf4jftswkkqrfjyl9vr2n3ibqoxkwrfii3vk8m994ucew5no2ry9z9s7exzawt28kufun9656wczzxvta55gt9gp5rdhzhit2ukx1i1p0altdwdedkr7g4idnq8xcnurteip3cwh15pviqd8b41pw10li2tshwihbdmlxt639boy9hzu1qwx23zyphj1zghswptfaf2lnflj70yy32ne74s1owy65d63j0kr47t8650c3dzi0ow1u4odhb3nj',
                username: 'if5gxuzoj5txewy7iln0302wore2jgc174zmiu4e2s6k7bevf4qru9wtl1rt',
                remoteHost: 'ifwo9bfwehut94c5qow2g8ersv3i6npdtdo2g4x64f82ztcejj1vkdv09dgykn39cj1fjteq90os5grksjt8ce817euujujvvh4yzwdqo8adinyetsqbreopml7xmvxj34ec87szfolvd4p8o9xvgcitx53uhiis',
                remotePort: 4699388699,
                directory: 'ivqksscrysuhh81zqjvd5bunpqwm7urkqki3akdpv7yljv36eerqpz2axixi2344zp157y8jizy0u9ra5zceruiso06r0839uzrwmyrvk1lonxqee7mmddqhq8t4l1zd7dmwcv58o7t6mtcg1i5ip0605o15zhz7ebee1nn4ltolp7bemw9qukvxybymtgkgyadqi49jass3khjvpyne75lnrwilnryrvy8978u8k3n3j894summ1lmqx6nk5y5blv4g8a1h4not95thllls7ayp13x2psh51j0sactnbukdx22ubvpohxjzz8vfqmtxqvj0x0xkc02esp0dwb2fadd42cnu3qhpm18q3ec4d3daegqlza7ef6eoypxg2qfd7t45c4g83buuxyxprudb1z635jqul3bfoll4k2cix1dc35llk6k779jq2mchhm0cbu3vhr4b5wcvl95vv778b8ns34xn47fz73i67vq9qp3qi3wysqdg3brsyg10j9k6u98egytjgw3gd2l35or2ikmixiethlm1h22kga7983c96fh48nh73ti6rwsgt04lfk8t8muok6od45vk07g8rs268q8jqn2jtbcgiv3ohlhyeydon23rgrukjqzm955n6kflmock0ve0kfmktualbwb5j5je4uwyabi5660o14ffvjsk1vk0e9pdge3pqtm5ektb1rafv0hexs2iwqzjs2x1erz95nd7vu0uimliz4gxl12urujhoy3sloo5yjephvyq2sdjewirt305vy57wjf7ca21bj2c177n7e8qqqh02jgaz7wfumicnxhxz7ba0f5uj204ojyrgbvn6e7fa2xrb0l71zcg9bza0gzw8nlipsnf3y5ds5fi30srcdrvymyfq3a2rzp4ga8dygbjgi6vus3kuc1elmqiwgq7vezroy5poyoj62nqdkw8ru91rlzqfnwtf5nx1n31cqu4qa415md34wcn94s6ry5byfghjeviuxg5reiz1c1tycys',
                fileSchema: '3m2oetqasbk4gtlfaitkskhpfirbbhsp57uglqmhj0q4kktdcbnrj88n8jg2iioamn1wi467ixt6cx97o22ckjb6b5s8anviesmedgmlqfx8m3b61bxtws5abwbv9jgi4pk1o8avcbit8yac3dwn7mhafrhwbo85adci7d8p7e6rl9amxqau2bnod21kggs0cgw3nvw82hx0gg6hetq1met1tm6qjzl4a1jgm9bkjqmiq2kxmkibzclfs1jzlqgz31yr1hnz0epxv9lq5e57k7np7nbb89awij9tofcrohgiwlrqjhyicp5ah6lyqa2arscudbjj29521tnfraunuzgcxurp877x05mkgwdkfjiuyp42ogq80uttn34bit2xsvrag1dmlyb7vhfilx5b63ngxpgo5qi75xvvsh56wnq0ym85giei1jp96py1igf18fw5oysz5j0dfv3xg3v8lsas8cp9xtd48g0j3y9rv41vsbmnzhyg6ffk2vavwgn9gbxu3o5ddoyk7kl0hq1nldr79basrj1a3d4ln74gbp7xuekgb8ux5d7ct86fn3mwn5tltxnkfifetspmhkgnk8cofmo5pulg1cjttasf39wzc2c4oy9fp35fyvpk0mt4g3j71sw2r0xrbextyj16m1gdaenoidz18cys719pa0y5nmvw3in20xxmwlzxqah35zk8gs19770xbku73z5s5uchu75rsytonyuynlcyvh093199f0syncifsoe12hgxf6mqrmrrjyqhymkbci55bi1f3q0mb8qiq5nd63u36silivrog9e0brs3e51cti2muiupvfhs65z9z17g87zktumobq4kg45m4t6ap98auoqqq6pi7ogoarvksv3ys1uyumkqryc4gd7fie6ynoqstguob0frv747rg1qnaucjazz5kz6f0drtzoxdcb4jnouo24ltxr8uc4k91oa8qbax5c1u6si7lj14am7me5sed10ig6sja79fdc80tl6kpu7',
                proxyHost: '5zy7xlmar9oplwogecwjcllg25gdg93pkx59jgkncm5uyyvkxwanzerg4uyi',
                proxyPort: 9416696472,
                destination: '1bbbm6u19zh8badxfanmvdqmz9ugx82acjpkyxsnfvgxpve2zykvumnxtzoduopfdo3ko567yat1mdj1l1eyvpksqkzbbpl4o2nw4dercwph16ihtjsn2arhpw19la69d9lhrl416qkpwj139vy9ur7kejhmjkf5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'z2iodwcaq2u6beplpyb732fxib4ekycedzftgygy9p8fqj4cr5atolsxzlpf2wtv6le284u5qxeh3omh4ni7na9unc3dlq4zmufhfi179epsogcesouz5e9n7kyvstbdjk1yh20kiimzd4uu41aaydk5gmlr8gqk',
                responsibleUserAccountName: 'n0xz4bb50s4dmu3713lc',
                lastChangeUserAccount: 'a815wp9f3rtwwbcg8lnz',
                lastChangedAt: '2020-07-31 01:33:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'p202i5pn69ucrrvplzl6ci3p2bnlcyzphb33ay4a',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '3fkaq5nf8326997rndwz',
                party: '5z09nkck3t24297dhujzhtsu62o0397aonycuivbt7nl85lcvq37p6qrqf27bg4hk78odf3m06glpd6klmxjg4sq5tf4yyteuplk8z6btjpqbk9y0ttw1eg0bnni0bssxy1icywmpanw2igd4cnth4oet4qlk3rv',
                component: 'zep9n5p7hrzrecp77wgbeltktlllirr1xzwi60tyghvqcvaxe56mn8x60irw2199b7mazyv0dqnerpoj8v7s298jzqzn059iumvx511rmdocgq3gm0bpl2k6620orqbpb01uccpkswyvn5dsu4tv5kgircrjklmv',
                name: 'h22yy4j3cs3lv7yhs83v3g4rrpwbpmfuxujtlnadcfcfwx8jwp3se900a0qe43towd6d7wz9zspftnydxxydr9v1pdh58giz5vxsm9brs6bebumc1u7jakqey7gfjr95lcsj07dt4bt597usomrxzhnyqi2pfxnm',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'c8vdv5tmhr3dq89peobfe7o3kcrox3ew2qmpjrs55kxhp3uf9hr4jxuyakztjgl6scuvm19iyxt34l2uz9biwntmmzyk7m66678uu6jra9wd1ebmts079lsl33kzegmzrcybx5zd0u3nwz0cjy2r3w0l7ljy3mh3',
                flowComponent: '699yj7c0gahd4j6kfjht0jnlpo4y4vrx9cx38nnou9pl5hp4y1py1x5ll9uu3kew2mtkn5vhcf729gsrsuowsyfgzuew9ryd01ost3tuptgyl9p4yoqe4bkkiegt16ii2qppsnv7kdru09q7swbyp22w3vyf9bfl',
                flowInterfaceName: 'aq84b9b4gg6681trnzfv0q9iqdbqwc8jf2hlj8uzgkyrtu27okmtpo2m6qf7r1ilfxutogy36yshxs9qg2e68utfq7hqb1j3uurngf2mjmau5edxug4p3k1s1s2j0i9skd6eeu09ruhv6b5elpxcg62ii9y1qy7r',
                flowInterfaceNamespace: 'yzd7gxjuh6xvtsj11v3qzmuowfhaeposmhmdmb35nm2xvjsvzzdecothjuyrf0hoj90h829firkleetztd53ztb2b5xkaqa0ns469md8qb7fye6iupsimuy4pfj40vqyunpewcchwiu17qs7t1a1s2yibx6lgyez',
                version: 'zvr80axs3o1c4vgu7n7c',
                adapterType: '88u5w4cp2nnibh4hkvyxn81hlxk1p7nwvhu1c5o0k53o6w2dsnyf16jryjf2',
                direction: 'RECEIVER',
                transportProtocol: 'tt1jwlvzpqpe3sxx2owpnrp06h6upd98eyxwvlx0xwbu1qhs9js8y9qzttos',
                messageProtocol: '3pffqb9a0l7epk1919lg5tzzq040bozvjdgrwyfvoz0grxdpqhvre8p0i5j4',
                adapterEngineName: 'rfcotitfu2x621z9rp1q3cfni4g5fxi6tak7mfpc5wehsut4cdax9eb00b7bew70xqpvv1jan5stkq19gi2yr1lheh8agolfyl80eri44d8jc4pbni0wlrx9vf6kn72e6hr9ucxjjxife9kjrkah5ro3jn9doml5',
                url: 'yfvwtdrg3titlqdhkx5c67li0wj6awq5d9d0redicj97x1gvace59ss7sy48ss5mlvqk8ui83mp4f7ns7q54iffq6uiomreyg98ypivoxlju864gg4iechj1fsc6k8luzc8qbqnfldgode82m44jn2moqzn884ephoab8no34fr8i6dfgrzgsfi5nw3rm4z015faxng20o8zxl5iae65n9vkzzdsvb20aa44ulz1qikj0b4psj3q5a9njup36fotuu6538j3hpn4w9nviz5xa5gdaev39wul6ina7fd1hi5dzqzg21irfdpits6ldu34',
                username: 'o9lhg8r8syztjez56drgkix00s869eor5eat4gnerng7noubya5ag38s4920',
                remoteHost: '4s4n95yc6r98jannruia8ntyru2k7vqb7y7j8skhdpsvu7200178f7k5olc46qqt4582npdhxk6ci3l7aeiw9i5eeha6uxreon6u0o6mpgxcmnk6nu3fg97vfge5ey9bqvzz69w8sj70pomdnt2rw5b3s579xo40',
                remotePort: 3274922630,
                directory: 'yz5qnljntzo4q5xi35zvzlsqr4ccl5379jqq33wtextgcawy8rkys4slb65uxrgt04ix0ih3d2ltrt0fftakdwk1vrlz3gaiof7pkucimnqj74po5l01qnd1vij6oie09g68csb2bvkwjebqz21lk7k8tfqu7cdvsfx9149vnncthfoiin41kgvnthx2671fowd1e7i3bmg8ii7fjmwhq4w0wciri4wcub7jjgom2pw2s2r2pbxu9z62n4wa8ngsnxx503s2fmq8y0kj9eyer6oaxe6h3jpy768ss0ahvoz5iq60legvb4gauy835s22eb9t9xcf0o7ai4b7nk544fuf63usuk2qc1001l5ygnu3t6orumfsvbp7iyo22sg40gqsfgprl96rjhhvtod3ziil75va44c6hjcrv2zykdu7wqsicq6nstfer9iqek63i5r433y8g8dcr9ukcneayfdcefy5ybictpys3cn966olpi8w0ax77ed2uhfcr4w5sdr5rv9unwxsboz27jc1xexvv9g2qtnhfwzilij6kgpwa528g1mzfvr3r7zbwf6tu69l1aumk4xvxe1ayaz0kohjhffaenl2u75sc3bfxak8ao8eqincamf8aey8evwh7b0yridjd198izjp7pzwkfqm8oom1a4odb7367p51dnrx2n61c5vb9jscppjdhcuqozs30swbk6ae668neaiiggd7ogo764g02khiihjskbqpoof3qamvlxzf113w8kq0i9kjcjd6990r6lkzloyi2ftvz0l5zi5sssi2ex1et8n4a3sfuwxg9pzbum18aepo4qz7pfoc8oluo36dci55msa528uzf1ntjc8m4lb25pxt4zsc9wc4zm2c25dn4k8p2oghua3gairk2vc2si9hfcops8tqdtjpriwd4k1a7y22pbjumc2045klbptdu8s3ksqkwoags1d5ltbn34yw81klomwklv1gvxkd264j8kco3sxqyhyxo5d3hzr0tok',
                fileSchema: 'tn1wfajn0z4tn1ecmd4kyxzss9cygv9qx761ctjr0ju2rffww52tsy5ntxmf8pay3nj7tabd0gl8x6fikx2bj0v28e5yio4g8isttiqagcq4v1rrc849ox4s91hv23zvplk5gd2thrx9eanuvv59psrgt61i1hrzsi444x1fku6ypemhhxj0cz023jqikmtqlfacihi6mt9hayz44et8020dg8zf3bk3o2w6ms60s9n0sxn4flk9hdjv36rqholbqmf2vekf9og7pcz30yqr7z257p3d59y3j58b7y7gskg0dqtkfklbhdtq2km13fuzj1dt0w307e196j9yzss9ns0dxrarq2eyby8rzovt0cipsbbf2k12p8juzytirno2o9cqr644hz07qd981ukwpi5larvdtf41jx4ypz91y13xpd7jgdy10m15qt55yjmqrhqo6m9c0nuv5uwv1dpfbpvn72nz0d4l8epakqo2yf9gxf6o0njs45v2s6gt1m56yqdfdo8if29k2y8ro4qdz87jnr941cq1k6fo7ixq4rtbj39l91e8vulzhestc4mw4evjd7dhakwebbb8hhm15em78fs2wxss6zo94eey8c5043gwg80s5uh9yyphhmpnhi2cso1k27g7tdiyipq775ijntw24xm7t5djlvstwbgt93e15biu6u6bckicr81cnyqzvginewvxwizuf1o9q8yos0fwifoz1wi6wkb5ecu6ydfn4csr0aot4l618so4n4sl9r5cw06qis28ltngqxjfxb48rz4vcld365xk9t1lh2xymxctunr4gswgyzo1omurux365v0w8djf88k2oj3p6fpxx1i2rx3l7lukkbpcz5543nu3237nu7ix4qjzaojiseo6tqmigku5pwip19pcl11x1e24rvum3hso8frlb4gvxm55ec2zmz7dulmkvgwazumbwgc2pfyxf8vpqlmktsk5qbnn74tiw8cs2ecw4nkep4eqyzxgiqpxj8ja',
                proxyHost: '4s5hyas6ke64sc6ykg1nzn0ewp4beryw33u8547z3zdi98fvleq3dr180y31',
                proxyPort: 7519938979,
                destination: 'vww27lcrbo8jney0uqx7p0umxksbnlestph4cajnjuvsedv5idd1tzrsdenbg1r4kf6d2i6rqy2wtjkfuu8ycz6t8mbjzhlypbghcrfb1fydsh888k7qmh4h6ny1ckgt2f1snuhv3frcjcfcsiput0xy9qhzfxky',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'clu5jtc1kh46ldpgcq9ldpyj8maznfsaywvgnzdvmrfu0jwqa6muqtwdzyijgbg425hfxfidl53shvwgol8e1m8nfwqislb6lyizd3gf9zkgy6hcs8kmpn8n4rz5phmd07qfqufvk1baxv95uf3m4q2d4nl1xhze',
                responsibleUserAccountName: 'jrp3dgsji3n9jdmx912k',
                lastChangeUserAccount: '6nm5c6x0fuureswghe1z',
                lastChangedAt: '2020-07-31 11:08:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'rjvxlsagyalkc6x2qhq5u1rxphq16mk27iqa604s',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'qkrqgsmuri7bek4tetn1jf9cjejsfg5vs8od5ujqkglbjxtz6q',
                systemId: null,
                systemName: 'kvj0uuy6u9js6zlo1osd',
                party: 'vjux08n92r7nhw70ofqhv3l797yvkjlxdof19cmgshnvoxn0qt9y6npfhcd9aq13d09jaxaw8zzcmo4fnrt2jgvgsmejywkcomx4qlli1jvy33vln57um7cvcrg4al03oi2qk6573nvtzz67g9u1rskzjdepat5f',
                component: 'nm47o9iatc0y5xc0akh4axvi85fhsa6p1irrq1329y6r7jx0pfj7fbysmbfrmlg01wu4k6so54hxv0p9r9k3j3gd7h9foa727ttw93e1c0k7rci8ryzvt9p51xf7ou7ygoeo1cd5ply5wfn2m5pugl1bd34774nv',
                name: '9zm11xbhcjzx9rds0us160i4o47bhl91wgqryyxbjku51uaitv85xugmce3ouesolwrskimo16jw8i7rc485m1ovv352uljgih1lowtg26uiru4l24juj4xw3g9vsd0cdhf9y3b46q37jhe302ftwus0c4w6r7mq',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '90rq9xs3h4na3fpxw1nuqhbvxrj93fxn09djfc7qtnymkqt4fimbmyixb7jpidd9rxlucvfiikoylpt4gga83d15o6qx7e9t1o4otn8gdqooltz76rtklulcxh9cjn3amxmyxwyb7vhvo0pf8j1xultogglvksyl',
                flowComponent: 'pwdsbf2rtpwvvkuz71llimcrlhcfnztdho1nvwnf6s6ma7z0frrih1wf8j4jaydknr4ooip4ar9dr2fuq1a8a3j0zq193rpx4q5o151o35w8j2phuusm3m5cu5v2fneuhiesgpxzebbjvm3ccyvp6a98uzj6fonq',
                flowInterfaceName: 'zjivsqfu3fsatptlgth1l8yt4aieud11czrwb80i1hlxnnvn39x0v4a06o9g05sa4txqxi2rg24nv9i7mn41u4pc50y0c4hjdgk1h4cddttsc82otg6dcj8fiu9q17si7mv6bd9kmeswbjcuh9nbng8565i7adzq',
                flowInterfaceNamespace: 'c9plv0gjdtvvxta2kkc6iobw897ro38tdgculqzuh0sp5z5mueih4vo4dowze7hbnr5q4j1zhsi60hp60wgi8mhlzcjfttor3mfbut1oy87ockm01pppebm8decytp1hc4ec6scs5p48ij789ea1bdf93si3jybl',
                version: 'u85zzui9hot6tevi2gib',
                adapterType: 'jxighg96mw7snp2u65tc1gal3kfnjubg2zzmij9raacri1c1ickuuob06sfx',
                direction: 'RECEIVER',
                transportProtocol: 'qzcir1rhe61qepikh2gqggg65txve45s6prrefca262ijkerpwji3nrxc5r7',
                messageProtocol: 'gwvlmc7pkh7q6jnaffxjo5npst1kupqjdmdxnpfpw6ngizmsnll0c60u9fnj',
                adapterEngineName: 'aftpdcd1zbaoc7g0llbf1exe1loczqcsk4rsytq8du5hqigtnd32zudtwawbqim347khjnvtx5gjivp7qgkxnvby3yevdhchlrs3hym1gj93w2qn0n4ozo6klpgw95r6fbkjwizwo6vm7jwxmsbigvn7xuyfz3yp',
                url: '7l0dfcbj6oltcahzlig4zrcrugot9uwhycr53nrxef3wfwhtbplnmztpuzhlw3du3wl9ms0kkf17udybvhlzwbgkkdgtfcv4zdp2wiehg7baxggoqktwgi5r7h2t69wst4m269l6m1zuix92usnd8r8rn8xkog9q9uq6itscl6h7s1kseacf601b7li55mrresy1finfrdi62cx62d93u184n9t0ljhvw9lla09rwf2ye8zyj62c66ytehxut9cdw1g5t618jhakubmn8ues6bm5zbj6wkh9xvie0omzc96qfz29joabjjg0ki7xddml',
                username: '48m07tnw85n37gpi4y125x6uusl7brqv611cxwwqo6g1srsdf7v6k2jb225n',
                remoteHost: 'hyid59qza0mmb45zwi621gl7ybnlsutsptckt4pyekfr276qhfqwpx5gcewushnqz6n6lokzigdo1xeohcfee7w080rcxjyg3se772aixoapses625xlxnrzaj7exo0k3rwfhvgk8dotdqaqn4odeysow9r0hh76',
                remotePort: 4090671716,
                directory: 'iqpjlwbzrsrwmk1fpofs55wx10pwg2u61b4ytnpfvt2rgt3uslbzo2euwtrr9n5w7b3pg4tqghexnws7n8bmuuwducpmoj7c02la69co2vtscdcnb77iepif1c61c3s8hvgx2bqwy75q8fk1hj8huav2i9fa8vouud8v23ixbvznr8k4m3udyaova4n1dbs35t2s9zr69qx5tcmfvzdg35pe3edbybs0e5r3cuujhlvuhoswiaib4xdb0t6xqe3xk1as66l8wsfioav1gcbyec5t2jlesricwsmo7oc9wq975mmd8izr26vrs7azdi9f5ejdmjwatbhi16acr3dqyzbe4slxpouki8f2kudnnphoxdjn8bh79vatt7t94da4rfwb9j549ivm1qx94zhevuwqdlp6gyl464qmnfon8dzj6do95hmwbfblkpavclaafyew3mf93gwh7wwzhaitgff4nfm5oqau9w4g6ta0ng82r83beisufmluakuqi8j27d7gmoaurhf067git1sxuzqeyrtkjdpsdkqqgltf177qq4fq1cx7dik2c2ezsmp9705cflf88mz4n6dnkikeuy058rl4n5w9ms5ns235d5bwh6xh3gpqb3xhm02dhy87jxs1qgmd44usp23p48nkew07iahicsus238vie9iwia6hjn7kbp73a7o5gsiqxlgngg5dmgj8he8r6axlj4m2g8xknphn2ufkxgpbb15o7w3v9stu7ik4gn9x3kiyvfp9qmq0i99fl1vjdvwjlhxd48y12v2icvcpr1ahh0trnpv2csjrj8pn3hniyor9yecm74fh764kzprvjc2omg3aol14hi4rmyooskbgoviz72wmhwywu4vdlr66z578yo6qium3t1iz52rzxpyx0zrl3i9cy438jw5a5gd4vdgfvhxhrmkjx2dvlhu6obgun3oxlc60ljnmy77jso5vgngrw3hjvlrce7vgw95bnzsdv1z2dymd94eif3ox5k57f02',
                fileSchema: 'umb4mcy6vnczupvvzgh7x9zendcg7ft9ryut7hlsu7xba73tbbvhzqd6j3gqdu7daa1qrxttmnep75vqgrf2gx42lypleevvu9kveqdcoen1r90h82hvqr1diu8che7u1uxbxwh6tffwjjmd5qahxs6pbwjk1w54p5g2avqkf1v0dsn3e9c050uasksisxrtk3okc41zqh0d0xsa5hyexmx8a69kzkoy9u5wo232pmzpoyvzf47joe5fpnlcnpd0bn4741asmma2klxyvswb67j904o7ib94t58v2iy72z0hbb4csixgw1m2vwjwutmukh4uylbnxseag8gb85imrqkwga1ffw2yqih5wcow43wko6ybetpku9hxequi58xgyukjgyw3r3iwa87s0ywx5wi5xp1jsxstxfn06vol7kq7e7wwp9otk8icl31ol9e8kbf27l31rt2wmk5i49aza6ivo7onaapsd6sg8e01wpl9mqrah94frs30jc5li62j65bhpczx7o908lp54p5ieruxl8mgvj0ax5q21wivp43tfeov9l90xdjeltmaq5asi6dmy4iwu2gmhr43gkkn571eu8w3rtwyin12qvbvnplfo4h26hyseyrp87xci04q50z91vn9doc46kk9tyttwz3c6nysc1ujm7p07jkl41fbo99pdh1t15ict9wiquod1o8wre5j2yloctj2dyjsgt817cw8aonzagt58z7fbzp2jqvbv1f5v01i603e7r3jrq9auk3w9c9u15pvev15h2oeps8ppjyoytgzs6d8qi243olozjil0gfrdkmwu4s61o84yf022wdnpo1dd43golfuqlk0fpgrklvnjhfq2094c5oqb84ejgrbzhofh8couo8il3tko2lsvtyabm3cbvb0r13l5f41kf4xl2w3544f6di56ycyaf8w6xrnwleqm4jtvu9pdolaqpa3rc6566jxtc4xfm83zg9uq5pr0w3s3zzjevc5lk8l8og4dnql',
                proxyHost: 'sydza7gwlbhq3d1ybvotwej70ctyxt11189h86v408on7f313boru2wwtypd',
                proxyPort: 9941099488,
                destination: 'w9onoc7uefn1byr3dkmwd2s4cpmlt7hnf8wi67us146l2zfxdoi5wx291mpm8dokr1ffyqiyxmeztcjg41tt7y5tgw6etcb7wfpfti8t8u6i4o6yw6dm92ekxdh7g3vxj455lu3702xf1kt44fuwnww644rxi2jo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tir4p3v4dffujisg6tlothq8r3eyv05r4t2ocg39gkxqzyl9t7dmuj1vfokip12s4y1ine49cqw1m75dvabqvazde7bbkjknd5npenp1a8yrsl133ilq7q6vzu9g2r1vsabzl5wapgmq25ng6rexqcshxgbewltf',
                responsibleUserAccountName: 'viutgi01c4na8g3gqnfk',
                lastChangeUserAccount: 'uapmwspcra4ifv8h4zwj',
                lastChangedAt: '2020-07-30 17:31:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '5gbsuxwhs7y0cr3qd8bbrzgxlpn48v22up6f2es3',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'pjmrrzqe4xgxpxnn5bpifmgq6abw765gybi0xemgfqie4v938d',
                
                systemName: 'aclpt54rzh1fgxqq2uun',
                party: '6asb4ltjkmblvdjp56i3wpcjt8dsut2teuo458z3fy1udiqizdexxyd544xhtdloql7kyd6pxyyk9ianrrp4ql0gjko9bpgkfup8dk9r7rjdq9qp3voh2hs8vis4we2buyepls7vb4377an10tq8a3cc1jvfvt7z',
                component: 'exj7p01qb960ikzadllala9szdwm8qm2md15ccvp4sess1yeoqses6x6w9kxdfpa654qgw27pv0n801z7akvmes9doook5g7v5td5zvou5znm3je1l3q4pstq17op290j7q96xoosfls9dymt3lqcpnz32s4d6ud',
                name: '9zzn6425p7q44a2g00w9fwo8meyw3y3rjze1lvjlt3i2saibhqx5qcnoij7seon32q98j2kzughezl9ubm51eyoh2w07olvml19nadry1gcn0ok0u9hlynvgny5tedz5fdfy4pbzlqeogwagqo2kgpnyc21psgij',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'giieuqewuin3xs6b2q36z2np0s2yg410dfvqbsdforzrvnf23tdg7ugov0sy9tccty1r28rsyenrv6f82a8kyj8qz4bebv3x68djvw3un3yqiyntv58cc4jp44v87jtvsggvle84or8cpguripp5dcz3siwov9cm',
                flowComponent: '1hec140x1iqirg18rro99wnzwxamsryrelpw33bntw7na4whxakll91ygux4z3ypl59h8z5nhir8zhjcfhbwqxql7w8omelnl0uwg6i04g36r4k07swpv9a6a1gxcfm7ma0ip1r2w2njpp9rn9lbfch7befm50ij',
                flowInterfaceName: '10ieg0gddccgmbvw65eupp2an5p42neoeudai26ydzaxoxxvdl8r8ahonkhlwagugag2vh2b317yw3zeujikvz0q23obb7k9ufn1vqoyg6r314k03suaynpinj3pwasoes3mfvkbm2qsk26b7ea6nukptksdx9na',
                flowInterfaceNamespace: 'v7vvm09sqo4h23ano820wbedpi63kl1du3sknyzz10gl0nw3urrftfqi64qk5r9eaqmrmi6p6ulgec4i13d9v3nx38e4fw4kanftnd86u5xdwk79e72oyxcfvlmhjthnyx8i7rcd54qycokzh9ti2ycnkkobq7zi',
                version: 'wxjy1coafcdp8eprhwqd',
                adapterType: 'ct5btvxpb3qdha5qcd99itarhpxsx9241ghpn4fq247il9l78iwuygu4m9fg',
                direction: 'RECEIVER',
                transportProtocol: 'n71vm5s2mo6ef8do4pwemka20lfc21kkxbvzmmu3z10vkm206bkjdd8tdfq4',
                messageProtocol: 'vooiaemf7f2yhh2uejdu9gd3mvl1kzuxbbr3b0xg9el6phvibkx28dje63wt',
                adapterEngineName: 'f6se1swxrbjzmvdvrjo9q2c8lwbm83tc2oiq2sacm0a6sx5pjzhmk7a86tjz1hv6yv6sml1bex1l6xbztltfm1gqlff84eennq6lo665kcdqwaw1aqknn69e56yqti5ylf8cfjv14ld5799urjh4oh13jtupr6cr',
                url: 'k5yvl5mewyx2bx2sxndne3xbeudw230xypemgscu2ryk3fbpoc9coyzgewv5ruxn4wgu5i0nxre14ulso0m2vl00zuljik5xa50rjvn6z6yleqs2o34z8jiah2bgrcxmppsnggemq4tivrin7ldbj4p2lt7u6r50lxd675ufyo1xnsv097sthxcl2gkrpm0wafx4sk18h047lfhn9w26bbblxyy4ovkpa7f3jmd7njtf6pojq2ak1so4lgiohazukdlzk39mt5o796i5wu4gwedvfur31zdgy3kq82gly8v7bwl3fnuovs785ayb9xi8',
                username: '81zdzxffhmc6zv1v0bwe9ute5wqj42nj0298c6l8qofw812lbuq0jetrek44',
                remoteHost: 'dy7hehlqfv6ri9qw5tqbrxjj29kvm91w7aefn4wcmmi0nlfbh9np5pmvexxe17nbyl2i12ri8tmmtu9pfmfkl8kkgdmqr3ge22nwqtl67mh7jayg0k8q6ujd2twmrzlxm117pfvui6gu5elq2m53c2y17ccny8uw',
                remotePort: 2610720452,
                directory: '4m4oe3muovcvs57maxebadadamws1cu7y3rv2y8xjsq78axhapajxtb7p6m0hfq1scut7kggaag0pqtunlj0i5gg9i1221g3cj862m7r3tvlkqv0m2xe238efxhr45bdh0huifrs8n142hketfyppxwelf5d9xbowazcr4u0xtyitqavtbpvjwnk99v68f2r0ie8ciydrz9z87ngzszcu37s68p5vjis055dldilzn3ylmo52hz4xk09idk1b6lbrisf9tfhx2cod7l8ca2jhpbclualg0wpbgvsnbfcjbvsl82c3qk97qj5h9063sirv6fwpr4k1qtbs8bz3m6h00t08gspna7bin3s0j0nn7m2mpjwevp13cv7k7iypkxhmbbwx14810c07xyrur5c56gr1hjguasqkbu5voasu6i74eh2fpmntx0od7k8ciyl7piky32wd7hm1n1l82a9vwa3ls0fkmf5ntjg0yf810t13r4znoi5s9mj7bqbdg85mim8ll6s6m4k4huocewljaqa8ghnbr824ii121q7zss4a7gcqp09kdwlgyq0a5p8xaso2bar9xmvv293kdftocr6zbi2jwfm28mt49y99uwdkodqt4tsy1n2hbolkavhdx4wgbnaquc4uoygnrb2y8kf9xhcq5owy7f7odblph1336d1adl8ps541ke40b2r0fdx0fhkpjrvbnzg246ddh80tynowkf0riqy1kek326r16ffviq705qr6mf1sfib5vmi1nybimaiuhxf0z606uywbage7immtojxhxh05cl0iekmbdrq7j7z9wgt913ou0l2gi1h8s6a7vdxl7wars3bywpoc80aw62ulyijlmuw9zjvv72tauawra9xuk9d46v2al9u9vvy7bokb2a4o7xzqv838edyig4yw2l9fy7e2mdqre8pld4v33vgrqsynmvfleptk8g2l62qghvkmz3gckds30d7ux2boxja6ofg6989qr3nn7bup2ho3z5l',
                fileSchema: 'ab8kwnerz3xd0p3ro0acnve3x8535ja6lx9vygpsxtnhwpkknx0qmnhls6ilix59ym8456k92sebu89v7yochto1vbb70tpufjtc6tj2smbzwczot62iwvfdxsaurkarqveuyveeeik5p7k86wh00boo2b6hbhmp25f4oohrzh65gwzakp5o0a608qf28arwcl9s661lf9d534h6ny1kdl4imp29qothshvfkq56f1r50jri00kshhwg38n23533hk4x5xh9znqvjwzitr568j4isoukk2vvbnsi74732n05j9yhclxmbmecw3ksimyzenhbl14fv6zgm6solxq7x4vqjne7gc7qupj3l81huj8jhrlmcwzjsrf95mnt83qzwtbp1um19igwhozptibohhch25nrr86fc183ofjkz3mwa6m6aeqc1n77mfdgpdsigd5nr51c0aajoyzszwzp4knubn5axq55mwn16n78udc6eglqry2l43pgqy9kloyft92gadmu61fneml37s8vzm86z61pnh9cxru1v5gncjdze2f0h0f42l9mozbblc8u3e18kcn6dyvujyzvhtnm3cfw7z6qrk5v0o38o07yd1q4ev4kdm27vi14k42tuzn0qyufffvzebjfe9wf8u057diox3qthdhvom9csv022pc9f0u8xub03quajedn3bsq8h1b211jomwjn6tqq2ah6nmic2ep8wfdz85a2tzdx6x0w5uzdal8ked2txvuxz2uarze9kbksmqrktgxk1l9wili2gpkwfa1h2anrcy92oy7rydeerkfaqg0zc1oxjgh20vkdlwoogg8cwi4whuyd77vpj8xfgbgqfly6k0mo0wmljtyd6od93silc9zo80h84xo97cyrlv9hv1v5y4vsifs235bfq2c3scg7wxpwim4asrpm836s0aaqn9iibd3xxyon7c7ce7ih054p6nwx576f7u7rziglbetaw9eovfotzg75pj5e0h2zmk2s109',
                proxyHost: '2r0wrem14bvtscst0x62chyfxf6lkj7g8a06231qmj0ojpuhchzgx8zby9si',
                proxyPort: 2625051326,
                destination: 'nobv1h1jj9epalleosijbazzvujsaglonw4ywnqbg7zkax2x9prgj36bcqvfs5nhlxvpd1pa7nzw46vegb8iqlennekmpozbym1s4568lqllb1zm5xjoz40zqzlv1r27kbmp3ios9yafy6u10yv8dakqeuwpnmhl',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mp49ywnw5ay2a90amzrx6rgtz7veo13mto78phlw1a2stxc525cgmheo9u7kekfhdqpu2d1borg3yumq4k75tpycbg4d8yw51ge3oz71n8b0bcksdr5xoq9tmq3n1v0o9edn6skuybzhijlqy6xklul6g7iyaj9l',
                responsibleUserAccountName: '3mnzrmerxevc1nfhx4ae',
                lastChangeUserAccount: 'aq3colaiieokghntrszx',
                lastChangedAt: '2020-07-31 01:48:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'bdvpeh787p01gazlzrpnss75uoju0foi098q6wnr',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'auj1i9kcraqppc8dww29ohf6ij2efq9aet4dofel6hd23rkbeu',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: null,
                party: '58fnygv69cqpubupb6p3nm4yg0qrtpclr2xvhezwmmrxkgg51isene25s9dcqwyel4h5o2mjseurzv549elxxm55d522umdcs72yxefo475lciraqullqja4l8swiiipf9rip1wmcgqri6y0w1bd7pshvxutn7pf',
                component: 'hn79wy945cv3kv9ba49glrrty2aaumckjgmmfqzndt74wa7b3ojf8rya4e48x8qj78s6cg1rtq8gsalcma9594vsnelsowfnzyg0u43xtpf1nfk59kx0cd44beujkc96y5b0rbopvl61llomicyxwmqgtbc0u3bg',
                name: 'fjzoffqgkpsd1tr0l4vkvw1hhsj9v3434si9vwwferwm5ujnzo6a51xeltrzz0fbuos1p99r5v9gt0bcuphmqk545sxlc8bym9351fsn4phzoj04jajv7cmb350tl669vy3otkhri96wybo0nztrfeefig4y30dj',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'viljgw97qanrvuqyoxjyiwthw4hnkzin9erwz61ez6qpwtt230vndc8o8cq9axm0jeexrrchmjy6srfzitw1xb24jk9ata6wtz9foogvv59p8eiwz5feivr9mo7fgso1bbz1dt5rdlfvdpnve0vr5mlh2sbrm15k',
                flowComponent: 'qjimofnubasdbiknkgvfnk0jxtdak1pmd1jebyy3kuv5gq2v9fzr767m0gliybskmvs8oz0fxsp5dmzy2j3qailqhyogj3ak8mi7gzj1xmu7dpjk6ugqmpafs4jetc41aquv1nmdug98n3v1b9dibdzqi4ychisf',
                flowInterfaceName: '2ohol3wx5n33zqzloz0m1qvflyp78oeyp1vcq4fzr7awba1qq9c937dg9j2aupd6blm0w2b4ghs8o8izch0kbjde2wy3wmcnapkh8pnb6epemfgduk01jzhrihmhn0bqjkr4259tsgh31p11nhpr8krr2kp3xtmu',
                flowInterfaceNamespace: 'qx2gfzxjf23onykpd8rn83un2ddxspz3beldivbs4rrw2rh3k66pcicgkzukuhi9ev3fgochpr7sij6hecwktp7upmfhdmc0l0dslvj9ai5v5ys87xph7ok3pgia1pdbi5rqo2q0vi2pyebyn1hyln6g2594vkn9',
                version: 'f3nh5jpwoaj3b2on5zei',
                adapterType: 'z8f8scvvs7kz5q7y4e1bu82bia9kfp9917g4p2ju1ambo1y70mdrw6fa1t9s',
                direction: 'RECEIVER',
                transportProtocol: '3kkczuko57wncqmds669n6oqehjqzcr4dhg2p8ljtliyu6oupj0n8di3jc5c',
                messageProtocol: 'f4s8krcgtdpnchjoxg0nawgy3vq8ipvkluspmo41t9pg9pq9sf0omxjnkjgd',
                adapterEngineName: 'wspcss36csuigslrpr9yc9vrmgs9h7s92hli8okvllzymczeqt48vq8kgf4ag00hq0anj75dpjis4dnpwxnfjidcjvtj2yeal4zkiemtzzgqsin6d9csxp3kad73j0s1wtslnohwmvom0jk9rw688lplmn3kr6kg',
                url: '22ptcw6yzpo6dybkem9psiglrhlrni2dk3v0sm7xjvzlwe11x7ox3gc4b3vqyy49jqziydm0u1fl35hx8v9v7t6vpa2h6wmd14tt5ee5a1lox9j89kfa6oyu5yz15tocvmdgf7ojx71ldxvhd4uyst4bm5xpbyed4ue0tq4gyxbbwf7t3m9f73x34r310t91i4kar2rmnt4smjke540t7pjf0zncy5t61b1954dvvvq7onhf2rolpkd52xl47yeyc3c9rdzqgqad1rrg7ee7wls2kftvyqkstykaijd5dmxtdqlvo3sonewoxuxybhzs',
                username: '34e24rei5dp2cr3sd60y8zopql7zi2sb5r6ozdwx0xefwya14nu9ryqvdaft',
                remoteHost: 'vygthrcvbgm475yn4zyq67zxq6ckj5ygeuhu7etelm267kjlb0uasdhc08ua92bua9tjtcvng4z20jo2k86le6ncv2i9sdajnqsphglz36w6bwvt22yn5axonyb2fsl0si77upz4fnirur9m1prmfoz2434evtu0',
                remotePort: 3748671056,
                directory: 'qhn48hm7zk5tpw8po6jw5vrabh9bpfmy6bot8hum822f9r75hb9lvw8i59cjw9l5ibckehpy5cknrpykbbpdxkkzw9jfjm3a00ll28tf8llrzk8ymvk4bpt5l8crzpl5k2cgdzqnlhime59chlxhxu488si6qvt56edsn5jeis97tjs0bnzqbgxqck1evp94lfrmrw3n1ihl478uw31xvloq5ae58xr3asm6nnstirz2lzjj4dq6lfewhxi2kwtikh6179xdos1pzopa715n4rvhzba2cq54b93jxvgep7kjneh3nttsyk6fzuera3aspp3x8yi95kwnmk61uxv20ti2dlp7xvh8be47pv4kh9s53hcyevhl6vjvb2h2u5cv6of5wjijexjq8hesd9ggoels44m9x3ombny1idyi3tqmydref8gsxkub9olgudixtwz10yt4v5j4q2yhkdoxxafs6zmult5yh91tr961op737if5g4edrgjwgii87ww1cp75x2m5i6rjgwaxep24hhmmy51b22qmi7n06k1qd29dlm01fartw29wvzzp5874uq3x3ilh8dfrmxpz3vak8cor8x9r1bz4q2w6mx39br3zvoq9jb9w83lo8wj0n2r7juhhqoldft6ezaqdrkcvmslpla4ukj2myqa0kficxlq9id1twsccu8203hejed6mh0f9d53x1s9djmrwpino6205pra0rl8isvkz49eexdrhpqqzggxe2swaxcvjctx3qzv3bkl06jfano292c8o2bt6nqcnoyfiayghlrfxe4r13eqzxlk5noq7bhrmikvjenlt1ikonkxx7ftkd73hmykx4kor021emld6tv1jasuoqli0zskad2no5d76hm0fhsp3s1ag3cftrftw1tx3yef4lz5iq48iqpkntduxe6llo8koa01hlfydrmil154ys4k3at9lujbwyf3k3ot88cugd5h9s2qfqosqdqqyv59l3eiy7sl2rtcq7ihhj22z',
                fileSchema: 'e27m9zpvx46pljqes4km8wq19ts10kklg415yaolw7avl3eqi7q8v5yzlp8t7vk6o35zgqiqe278w6hlrlpgb72b64bbmv56nsprefspb123ehw0mvqfhsxcjwwo072e7gz30y9hp7g12gg1d3939amhow70awr62uf6wz3xj27vd6psqg6db83gi76er7nxhn8gd6lwrxfrw3ajad4hhjdr4zt0lts2t46b4eg6m0pfb3w5ymqjxficzkuwphc5i6kkwa4qxyody1ckytlf31qgjrdq18ku4uxv1g8trj6lrin5qufgd0g6kaltiy1parb8suf7kukqy0afla2f1n8ysn5vi9r9en2uou4eutx2j1cjs03jy9uapg71uk9u1ixr8h6moo3iycqq2yg39ojjhmlde3jqygcg5qkh43tezz6oedy747523nipmrbj30arzylldttxj4doq266mxfy7dk8pn868n8dewlk01tpbruanv1bmg1xhfb0aretg2f2ytbur9co5rr56amb4at2xrfs8avy7u1gj8tj6xfvfzjou530vry483p7qbqx6x5imp6l406y8y1isisqhd6m13pzl6sv1d2jx32p8p066lilnciovviupzmi323okf72380eu0p3nzk0lqonl3xu3ko4epx9pooxyd54waihpamrju4u2rwok0o96kaezjxowdlkc10tw37bz526hmcvx8yedk1fm9mkba02b1qwgm5zzsqt6lin7wnngi8j4rhtqpjrpt8jjsojmyoqgvs5taen2bac2fm98d9ubomtwzdao2o5zbzo5rx8gj8o4i225wpcn86vmx2uvt2s7puuwwf2c0sq4ijgyry1hvf9sglo8elxwwva6jk79957o2nfw070px305xdq1qoi2z684mq8o1ev650l9c57ia77lgp0w8mp2n989zfgjea0c0hnx3suo4tz26938mclmh0fbtal4b26hc9isw5cbibq488an1zmy6aux4h69m2f',
                proxyHost: '3gtwi5x9j7je5rh95kqlkg76s45veua6zpvry03vqj5vj5v2do995539m277',
                proxyPort: 1313705578,
                destination: 'fxh4fy5pnl6j0ls2csvu8z2pu5ersxewxod6wwnxy9d924bqfwwse2pof367gggqrhx5xyfu7jp6pvvwyo3g3w5evj3v72kmcmkbaag1hip0q6zcpz1fg2l6pdd0dkaaowd3p7veebgfj8dixkh1ttk4cdbuy0t7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4zev58udrkup875s2xvrzl99e96di44ewhu6l3juttxe38pyyz8vvoy46j3x0ueas0ufjxn7kg7ivqvk4wmi6433rzg82awj9nj7fqg3f1im1nl5w1absmcktzbzx4b7tm1qy8akyyxi6s6o6ddj5l1gkv6vmkyt',
                responsibleUserAccountName: '0yfhiig6k3jmfo6p28cq',
                lastChangeUserAccount: '8vcivlzulrlkk7ajo2xz',
                lastChangedAt: '2020-07-31 10:44:54',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'wy9n9lizwwyxe3xgkadhzznazy2qk2efqch2tjyl',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '52kvepgh07gflqu6mn52gdut8m8nz4rpyvb2kwuw3ybpu2lm2t',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                
                party: 'b8szsrfdwnpyzy87h9gk97mxj0wz8zlh8kpxvc3qnt6dya2v11n7d3j3pc1e7wufpz5y40p85nm1orjx3sfai20luki449jn8purmb8smt0xyd8ile6jbhvmqf7as0binvb1qe2rbbwyr6whpgjvcvewqkge6wjm',
                component: 'mzuw5ldwvkz70okijuwpnk8cp4r63y7bc5ay4cfjd45izmvdekdnvqcmt0mw6tgudha1xu2lwn3fufue94motez3vu5ejsbxrqbiyz0dsariihn5y1m442gv3865qibr4rd6jwuvtdsq2acy9h0exs4oxza2z0gc',
                name: '0yo5a8sq84oxk1r5osr5321ndwk5xaz5w4qq3pe8v3peyougv25bm84qu3pwpicza3jhn6ca2gvz67u2pytjkgvrvovt7gxt953zpqrtzflfgud750tjqjlth2l67rth6du1i9cxf5pypn8k11r9sm3ufxtrsmjf',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 's6ounw8lybel3mbt11mnf54abhologilapbxywfix95e5ctphg2bt04rv0amb54ngcd8msoptqi8q4rsede1ojlvd1gte5vfuzeqyxyjdxvffldwi1hkhqqblpigusisbzdx5660ucrv02s432z74d4w7zxdqpb9',
                flowComponent: 'bf9bfd8pmv6qjo4g65ywmf2jqa57c9rf92f714byunz52ps6cn3k4w7tixbnyjzypjcaipvf5fw9sbpjwvleluzp7ad248m9os8ipl38o1ur9hitniwuccgrkr4td2pwlz5q6r71n6q3va3pj6gzt2t9z9o4a7v7',
                flowInterfaceName: 'b7mj64rb0waz7y216eenmthntgu0iox0xuujo84sdqv1mrmw1yvyoq2veirew59lnthy125l4wy5wqcmwbaerao1wph8hbkt5fsvnrao7sir20cmpbi6xhevdbhomxxrzkzcmy8m670f22jgazqx0ydrx55hnz3n',
                flowInterfaceNamespace: 'zxso4np058kl2rre75e9smrr19pqkhr2xkajx829y2yk1prpqc4wv3mx71crojj7yagwgju79zq7d8zewoz0w0et3r21wmk233alfkshizcir35dhhxvkn9e3ymxiwwqaizh8e1jbdnik6o95q1p1wm7oqt3fesd',
                version: 'moc7ggmehrssx0gak8o3',
                adapterType: 'w0c5hw732xcfzh6yywl26iimafy9k360cromnii8br0i71xpdgdlm9xpswxv',
                direction: 'RECEIVER',
                transportProtocol: '2wcblzx74fitp2qsgl1u9egghwxzc0bidpvl1bqz1xhs2anyxevci3y0ih95',
                messageProtocol: 'oxg7rn6xw7fohq7mzua22u5oa1huix4p01fn1ilsgn6gaa34hb1aj5erkdpj',
                adapterEngineName: 'cpahao69r7jmkcr1sgvhasmu2fz3yslu63dte3ijuuh43sh7nq562n7i426ige3adusod5gqb8jk26ph6ikj167qltztkdx3pdiarolpyjdbte85g0mv7n6v24vrw49fxdmvjljw2y4dtx4nf49hpppujfqf6ikq',
                url: 'rwyrruzqgxf7flqn00eo47iv2q2zh6abjm4khldxbgkble9j5wqcehc914rqprpy2nfj6ipeofld1ftuqg7vlvkw27lbzd057yg4diaexjffepiwhpnva11z4t3kb2k3h9iin0ius85gamjwmgwt0zpipul20se9jn142ln7dileahyx67efhwb2qmvioodr44nut1rcirt2qzn9re8edcqrpqs0s61f7i5nju7q0rz1u7x3o48xa0zz6dh6glw95igx7htxfj8eam0vj4818dbw1si8zpuq1b0m543nvpu97pqpeuctrty86p6czwnk',
                username: 'p3f2p52e1v7hs2jfq7otr5m6i2zo0vt1r1kgonfht8dj3mqak5jkzab27ysb',
                remoteHost: 'kece07x4uwijr992zvg9y8vukmz6evyey2lvtm5qbwrlgblnz0j338wm26vk0r4235sdno5315de4cfcw3d34q8fy7yd3fkzj61zgre094qw8s2u2mkux3ym1cgbd4bixaiw92bal405fda3xi6hqnoexqj6ja8u',
                remotePort: 8258042586,
                directory: 'hzyuo7io5qpxwfhtp41y0kgj0v4avwr2zvtapazjcer00rb5fu4a7qxaza98uzgcrfferua6th3mlqueh311mkckgz5yu5ybc29r3l8gu0tfx0gvhhj8630vtltboonb2llr8ljzsb8c8919rnauh7s8i0bb1yzvrf9cmebhi6656pgz7ku1gguqtk39ll08eungpdd6vx0unugi4237s2mlxfj6nswctb1b381eq6t13ynn9mwhj8fzi9njhtddhfl0sqmkz9dqmnmh3wrn5ls0f24pyyoqrygwgdsvcl9722uaha1kceht1jbhn0xlgswt1tofupqjrd6hythi98zs0wle6o6wkld1usnrf42m6hr0k7sp5uhr7jpih0sao7errbx5ztpuicjh59nc7ykorufc86ua8gnivz9eq1kiyh8geenn201aha1q7z7jnmx3o7daquszy1n1viyabz1irp96xtfitvokli3o6ya32rvv6dffh2f9jrden0l3oh9janfs030mnjebccwssqledva8ck137h3qr0cwr0y6uirggpuff1gz7qe8q5s8oaucm4rwqbnbyixlvv6kcu355kkvv44ayckx7l7g4es56waloymneq3c4fvz3t3lj7ggxi9qt1pck86kyhff64ukm2e6k0na77yq05cgfnqyd7hzqz0i11xlrnyq9nf06vtvj33rzza63brt028ejs5wgeok5b3mck2lfakvqkmkjfocvnd9m2rvem6cgffi3gzhuixdt1p3qddh3gypfhl4flyfs38xhh5invh3zwzllow2oc0oc539ps0ssflwi9qhjx2e4ajecnesh82vwqfbbzbdsaav1mndci8h118vtjbscvuiqb0s90elp96tzssv21i40riu57vtl1kra593wa9e8yfizk63w3ei7l6f4m1y1gccmeqdrdhl6oo4ozoybsz5ud6gxaj2ffft57nln6wjodh2l45fij9mk7vmto3yccmuxo6l17xm5kus',
                fileSchema: '9na16rjh02dn3kjrsnb1gmx4dn9yga0ndehndnrg120tebspyopbiumcx6yi0f40fumv4zbg2y95vdrzhd9wl9y2u5g1gpwrbh8j7drw68mv1c5jgovz7rw35ky1qq5g6fg65w8o7ybwlyttmiwvail7wxhcwwu7sgxlwe5iqasxfkugbufpzx59lywtptp3x0b2ug29jwixdzxg8aco0d75dmzlczu10iazr1wkopevyzqv5yanfobo8niabfcnj58ve8jzn0hqplbxoopot5rf5cc2x4zk3ibeflj4ftzy7j1gaxpc69ichs2onblea3yfdvv6eiv30uxptxgy3tc2juy7tbof8mfkv6yd3sqhlzjq1ngy02ils6qndnprcqfrjpvft7rruz476w5ihdoyrfvbee5egr55ehdv2gcespli9hyv7toc8ys1nzuoc3wfk5tkd5jfdvux8bakgmkpvfiwxt7046u6qunllxh8dnscteoqm54b8e32cisix8h3a27vtfojzkvysi634ozle5it2nt9kgiigxy432q3110zo0ashw87j3qtlylfovqd7blyu1ggnl6juao8bs7ks9g3u322fsl5e45e1cu40f5io762nzgbcc9uawcm2lvs0z92p32ea3qyu79s9hizv115t2v79n8f8mk9lhvuau9ezcq3cnl97wyarmzqb7fyaqzrw2e8ayv4qhnlp775p9t9zgbvg9xomvps8cs5maz649x42d76v404gkcffxx4axqjot7ywm52alcbi5wf8zie3767bo44j1afr7103upw5t66k1ikeg3urpp93h27v747k257vaau67f62v07frluecth39skfm4x9gnq2tljyt21nijoaj7kwjhp14rn58zuljd4tzyitifyzfivlwh3ta5upcie46x1wkyc62l2mwweomc8ohokucuda425lu6ymcwozjcnczixm9dh0vo1wp7o8wcocsplshgppez5rfz69lqcqrt9dk5f',
                proxyHost: 'x1vensoqggc4hw3wwemix0jk32j4sh7ged72gg39hswuzchu0k002zn9jsla',
                proxyPort: 8118080020,
                destination: 'qeozj79u7ghensw08jve2duu95bxyl9tpvzrbtprnvdlan5aurqcl2wz4vgbtlxll63czimms9gkiamz7dyvs584gkak0nrcyzzhhjx7a2v0qwqk2596216ket2vxu8ozy8wqj0kj0n0itzpwt1ly3eds4vgwcel',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'di529ilu8lfta0a5bpagx2epg085ze3op0m5nk7rjp4fablbgrh53ublbt3pxur0p6da7hszxetk0s78wgxmuxfsq6g0cby8e0sss12713tlx4z0xseqscsya5ore7z2o017hk255gf8cn5e2kb8j1820ms6y5aw',
                responsibleUserAccountName: 'k0lq32t3ei46hel7mjp3',
                lastChangeUserAccount: 'rz0fxii0p6wc4xdne8r3',
                lastChangedAt: '2020-07-31 08:11:28',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'ttkl8j8n0u4fi89n433hot8qpuwzbsxgg7622bvf',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'baj0qrw0fjslx8avf4gq6wqaygbb8duypzf42qpwpm4f96sw1a',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'dsqmeoyqqi4c2fq35ed1',
                party: 't4luq8auoopstqhq279q68zqd0x0foziagdrrl2d99ps43c1tmhxcgxwg662rcdm4l21xxweaylmv8lzzogd9wp0564mqhhj7l0x4gxktkd6ir76iczwbb736xiheorhbuq6p8yx14nvw80mbqd4svskksxtsfrh',
                component: null,
                name: 'lrm96g6erws1pizw7ffgw3of7eap8o91a9ycpsskr0ujaid3ixzwozd0veb2f8d9hyxecr62irpptxv7s5t9hjcm6fprjcz2g2rajag099o67spj1ch15fbhrq5v5mtwhxjgq1cosprpxivt8amb4e0umrgvyeg9',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '82df5fke8lp8t3rmrlhg78a3xcid6p612kz1lsuercyyteucqqk9m94uy7ckzh24ney7oh4c8icop0r7n21sny67v5q04pciqbx8yxos59p1ck58loqw2tn8750zv98340t5p75w61xthe34dahgh5lyl3hozny4',
                flowComponent: 'vjuqkshwbbe5njdq8yzamvtfcihdsgm0lo49j6nr1kuyccqu3o65n4q1gx4vsicyxdwj4m3nan4bgmkqv56e1bh1l6gnq9h6yfdqpolwbzszwc56ou07w66pduvt0ijsyc6uaxrpvoauvnbxfd5v1uj15frytm6f',
                flowInterfaceName: '9asfcrvwzrn560m3wiig2yk5tpiyc8qftbf2b9i2qcbqebbnoqv24d2cvwowxrsfh90vdbuweam5uoitqu7rx7gdbvkfrhy1a0rkxnbktwun4oi2yyhp1l70z2013xjfnnnsb75gm765miqgwx16mt3ug47ddibx',
                flowInterfaceNamespace: 'jhscm2cr7szpqrnfeultidj27dgopg6sfz2agiz8jk8r6lfzn64tkoctrd2yh6bpeujeae5100p0yfdgx7tddqh6sp7iuh0ey47lwc9p2gne3ozbqkdsh8xgqnfmtraxryn3v56bleh6wgbtjw7up5o4ve6f2g0r',
                version: 'n50voanpxsis2aca8wl9',
                adapterType: 't4q9lw69b0hchj2xv2t7xgdzsvhisoj2sf4w50ix7vg2nccdi29legggsvjk',
                direction: 'SENDER',
                transportProtocol: 's4209ld31xfgofyncmc08prvb1szi4o160c49gvq4ya1m4os693rpd2vs5sj',
                messageProtocol: '4bq7v8j6zttt307ut2sxu3p2f2hno7518eq85y7xcicgoe6vd6u4dvdsneca',
                adapterEngineName: 'kgtvbg4tn34brps9a8xjm1wlwb2swqqlg2shfquzwiu1awl8h2796mzpbekjyxqnz1dm7cd80vlyzmoioomcle5q2axhax6x5kwkp83tyn72s5rxt69y92ui4m1kkied55a649o880amec1rov18c056p40z0xk2',
                url: 'kep69cmtyar4g4kuuwgy3fgkch5fodksjl3ju2dn82urugzyx2ja2b3pukn3lgd60o3heh3m7ly8lv6clzcnivfpx1j64oe3av9gpayuk2u8mdfuksv1bonab2no12srk39x1goatpltjlbuec2qunwuv4hoby097blihav8i46di7t8qvh0lfps3dkualqxpwzvpz7mk6srgn2ogzc5ivm0ttfvyt699q01jks6u8calksipg322gtkkv7czchdtddtohkpl5we9qpeuq4wp0b0f46b4hdr3g95d3dzv893eel2xfiwn3kyts5texzn',
                username: 'aoqnvmyioc21rr41ddwp12p86ut1j6opk2ynvvgdc1ey49eers5dbdle9he4',
                remoteHost: 'm9kelyokyx911yfq6kmt2irejqw2yu76nxzrmqp5ni36ddy7e9bovtc81qfadpuxdlcwuslnxdvwpzpfvi8oa6iei4b7bwnizk6uug5wsybbd6gswh23t5z09egszdengwl7ltmoej3tzky38fbno28cq6cum6td',
                remotePort: 5151634963,
                directory: 'taqngmgx36ngy7lyezt5pef3l1sgc1hp8u2h6caq69d08uf3zg2wv0jh567amf5iq2h0dgp4gjlu1w9pfio0ptxqnjb4i9ykv0tyublj6930tld3vvsxwy2t6pg5frfkc26jdgu2t74qk4p7pqc407mcx75pfqdgpe12qja3waqpuphsdgtdqq5mer9aiz058hhuqwlutrewc4i29olezftzt6voyedb4hwv32rflyx5trv2tc54auwr57lv37xt5ef8kexpdjtbxnnrb8enqu4ctoqhifz5imd1vm260xnlwj5my1lg6pdvmgfnkj34ayrdaflbb98e5l448nv3wwzkpara5m64igsxbqnstxtpdnndswistdujzt1x9lqey15o56usf7sd1qavfcej3rsp9yw14s2k2g7iiul9kladcaoudyck1b6p2izasyg46kokt5accbn0hw9jvqtz2f8h1rvq30zsourzj5v2fhgpq9dhngj9x2h5qjmc08bm2obpajeq0uwqphucslhgo18493xbze5y6r74lyjyshshtu781b6klj0udshi3duq5rx82ifnfkch1kjy2n8wdokcjwz60yif9tx4fqgz92pnnlth6pup3awjfsoy092pqv31ofwxfii784e14zavz1jr7irjhyws0jv9efcvdb9ihyki3k7f845n1x1ugfp4mcuj8p95rq5zr1eyqo1c55elephgvzigg10nytyngvjab5oakcekpjxrrk9bz4y7danz30os90x7tmekd7odvli87re9s269a3ltxqhzgjc4y1syou9nsvf7n7i3ombgsgdbzyp39i2os3820rnq40m0x55q72l42roris1x1w2km10r12xrcuacz2oduln12b0ierek6j7en6ihbu9iv2ejlqzhvjqcxambtfs8551umweo6py6wnfbuawxb4a17rkf1voyx8109dxwf2xza1vyokhrwppcsef4pem75i2yuwrqsmwxqdka43ho9tvt',
                fileSchema: '4lnoazayjbntwbepcwctscm5vkotr4gauoz2k1hefhsj1mb9maez306i0xk2awbjx0j4t0f8vyqqgns6zej0gdyv2kesc483czz3qbx0oimtdg9dtbwv8c6nrfr7lvgqbqupp8jawj170lomwc153m66ngq8tf5vz2otzvc10i7hq4lge7qa9ymybuklx5s2zf2wjilxxrp98ml1jpgol7mnpfcbnk8wak3yubw0azd6dz8sw6vsvv7qijbfuwwwsboyg8y0dd5avev3ptzg03ipof8ysv7cpbrtm5zrnagutz3xci84btjz282jgna2paamt7s2iz97dysp910qn3fa6gd47wvh2jki89op5szhma5juywgkqhte7ti6owviue43b0bq3ke72lh5avvxx1qpsw1muqylvhmbiadeg9qxftvse9rhbvsxt68nbb9k6sxm9bwqpwauowedo56v2klso9hr8g9h0fxyx6nrak5mrlpw85a0wd0zzuac5no6dxpfyspkny5nlcstyw1ugfhbxxyghnul6jevfuoxjilgk11k72zjd1y5p2yv7bfyybjnwdckaqx13t0afxftachrkkcnqyamouogg6fzfgwzyut7ia6sn9tu21hl2am6mou50p2wbbjlmu3lm1ypxgawc317qk5unwrgqrmmko0qfbnog7l3pxz9boceqt76gp1q882vfxoa2db0bsazuvh2y0pn7u4xf10w6j4w7dde2z1uzxxpqj6m70l8gnuwcrq4xcwtlybyvrfo9kto1rfhvd8ki0ai2fu9l22u79z78bx5zdrtw91n0zcces63ysgypc5199b0gkmcl3jyc2g056qfi1baahpgstmg9uwkbk21gps1m232gvrqvhlgp10vle164maj1gu8mvgzew58nezjjkrxn9n9paqb6q5oqjymgoidaylkpu8wgouzq8iqfnwbap9b1rftf0pr62g7xmt6ok42rbwhpmhsi73h9zna237rwp11tlacrju',
                proxyHost: 'zjvb46es5muk4cay7jn9qil7lxtk1fub4eeasckzj24n46cspx1nm47rb1fw',
                proxyPort: 9027702249,
                destination: 'yaeoyvi83w77279h5g249qviup56d3fhzg4m6qpq06m49pdr4vchs0pcjmlyb73ivtfer5b63cmlma44b1vkmzrf6nmnkbmqr2i6afhqpyz4zg2587394wlufdap02yve21pqeipdc21nul81rf8xelwne16whk2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hbo07nowka29ubb7ubjhlfmgidobv0bsqt2koazsk3krfvkvhchoviasxhqhvmmqefjlcgc4nzed1zguqeumd3nebzygosslwd9cvv96bv6nlcgqnlo4epfxfyiuvvectfyqwns5z41qza1hpoe33opuu7zzb3wc',
                responsibleUserAccountName: 'jlfq6fkosuaq9uzl5dux',
                lastChangeUserAccount: '9gl8ro7vgi0dk2sov27b',
                lastChangedAt: '2020-07-30 15:08:43',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'y08w6fw56ib4g2c1wpbfjjaz7se51zg2vz3c1bmf',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '1uh3ekoq4a38ilesnbmn2cqqppd8z85b6dadtvke4nn4rn1g1n',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'j94kvxaqs8j5lqnxbqk2',
                party: '9ab0lml4dcsrdnn7u1hzrgx19mhwhanirkxcoirc6ov4gsb1gzuszwfk9w0j42i7hs4fi03d8ejeroy2xhg8zxhpa057xh10bgae180uxign5tv0d20p5qwemzwbhzl4dutl8tt8no4thma7k8avo1my60lms3t7',
                
                name: 'msmv4v7zj37a6cd8vhtpupi9qiqiu8xd6bmcd6id378q0gls2bsrmfj9ur92zvdrexrinbk5x80mzehpt2s9xc05s4b49v2nsykwfnayesogdqqw7sb2pe5dklw6gqwly2pthwtjswk9zl2lrwjo06f5og1jbzlz',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'pusb3p0hjxjjctw5lywwlk6ix9bvx81i25wn1u31s2wanys3fp0gnr14201yr73kbqxolmmmwp8q2t16xllgha574bet5vnkm89bzv9lhi8hy50ehfqi8poo8vpeq7higia0rbzgf0duwam5b2k4ja7c5wt1uep1',
                flowComponent: '9ogp5y8cygu0mwazahg9emlf8ug6czfxvycuc2z68vi81dkbm848y29atr6nwdtqolpldz8ve4uv7cwzubpqzavs8cta5uxns3vpnnayna313h1gipxge6koj76reohfrjxeu5lz4cgtxb6c4vxvawayy4ny03mr',
                flowInterfaceName: 'm1s64kfp9is2w3cft8b90jj3k4ab2h9ya6tosj9zutxj0vq47ql8tsfqn8w70pzxse8prut0wma0e9r6xobvaj5vf0jkpqvefjxd6kgpw9pavujd7yzpxfnryrq4ewbl61zcc6wobsx8ajv9d7obdv2yi0w8oj8f',
                flowInterfaceNamespace: 'mrk2ssi4w3cpe9ssk0didaa4ffbkzidooy0zhsy5oxrcnefylox2o1bvmwvot2417d672qxvqhrj57sfp329sf0gihzsajqm8kje8oi1zrz9bfxa36xa0f0h77wwm4o8bmgte85z9tr1jewhsp0wsrlpea0e6xle',
                version: 'ovyc59u3ihfv8z1343dr',
                adapterType: 'ay8lwi4sgvc67k3agk8hwchqtca86cgghn9p9z1bsn8vko3lmxtnacy4avq3',
                direction: 'RECEIVER',
                transportProtocol: '1zyt2lem76174p7tfbyqwpv79yelcg3gh8eld7h725s3g2fc3azzbxqleuef',
                messageProtocol: 'rjqkespndskgye1dlex81d2mxeuizon5x80g66yq7r6y38et3ewg74g3190x',
                adapterEngineName: 'pin3sp1r74wavbjcd3mfttsopgi57e2ntpwguey7rf71558jp2ee9rjuugh9zze9vy3meztfx24pqwbywz9qozesacvrr1oqjpoh6wrgc7kzqxatz4ee2je2nnzes5ouukd6vmbsl9xvmv7zl5xbw45rpmqg9scx',
                url: 'phl1yzm3aww4n9n8ne0c7ns8jeq9x6y3ql9y9vh48nbq1bv2rgbygvlloepivbarrhdocktsqszz0pntrtbq904lnnzt8xoqn08ym7bkv27e4cpvrnp3ezei7frxpewquug2370m4kgqapxffsqmmw93hmtxlgitfrc1xvru13htwpgbmbxhkyvg1lwoid8rgzasw9vxsh579lq1t2m16t7jh6hur5qgcqwj32vejujtqn9zz8jtn3j74ywh3fgsh30z5b664z7tma87hrikynfebeehcm0cvigsoejinmokn6y0hp48kvlnh2c3mkkn',
                username: 'tbvnsbl6hapjqvh7p3x2365gl0ztddd7cvfqyd7wzwnm4kyofkaq7zyx1o3e',
                remoteHost: 'elsnfuzri0i0kl3resifvoqq1sdw8jhx8ttts6cx8x9zge63yhkenynmcb4r8yw5wba2tjd4nq8zbxinfoac4xcr57hwpw4q7ne0zd6roa5ldsvlii8p33ryvi8uhir9syvhjlm9ym6cwfdgdreslryr2ofpid7o',
                remotePort: 6845481440,
                directory: 'bg3joamrjsofhrhb1iel5u0clp4yoacfvly4hqr0n6ipcg9cm2im7nouklbm2oqpmjkb01i2qz7gkwj4j26veqt9fc44agpknxwdo0n3njqqha2lx1qptcpkefkv1i0snlm80j22u1vxseh5rr9o2m9m2inq0r93xk6womgvom3jp4w3ou131syurygbu7kg35ieo9o1jmxlwp5muu134eatx5no2twu7c15jalntcjq71r5v9162dbl0cfq5fcdst3nccii1ep9es31sbm3cy2bk6zzm5bv41nlj1ilrrkn8gyjeqsx2cukcd37q8rx84ezynggsz4lyxlo1kx4b1lvov4hsnk0zoizyfu55hv29n0oc0xn2c8ap8jpg8hbit22qktajx6vnzcdh8dfedgdg3b6z9y5798nirhft9b6ezyz2ben8xs2lj1qbmxljmftdhngrm6nglmhuve4f38b5k8g2bkc0qk72www5wy2z9yga94pu7v7meo9xhdrp6uqswck9oa4zsghm6lsej7xnhmmc329sh3yeiyau3n0ynbmjdcvc1lg61yi36f9zts6ddb44eyljife5100pofrevncflzqcvko7the5wz6y6scwrahgflj6ftpx54x1ifsin3vxi32f2segys0abgbo2yps5nmsjg1c8k4wf62885xnaj3cbhbb4czdtayb1o0t7l93pp82tr2it1vs54rpt67xaz3n6odwyo9c5xgeunphekaaesxwsecw9fgntp5aatcz59fnhgesw42u02gszo35dfy7woh2kpcbcit24wzmkl8jj922i8662uzdysh3om2cbja7p5dpcgucg5cldl4e1myr4sa08vg8vt8x42oggysp8jojp1k5bwqfvd7z8vu8wen39yof4v7gddwrf1guyizbj1099talsktjut7bgywa2fxrh77jbg6itx5qavdt7mhg3ydv3zwdfx5i09i3sd9af9rfzvztxlptqqgpumchetkzurzj76x',
                fileSchema: '3t15drar5apf3wmthmrze97ekjn3ks8nq7d66u3tue7xyquttgndd8bkkiox05rkhjpxshk5khzdwt7wo0ngijp2umul293tbl0qeplcw3f78r6nphb9gbapdj63e86bp40ko1a56m11joy79aticx71b1dr5lxu9mxev4fnv881gupp1el7vzk4p3n8trr9tolhyedw0cd169on6v8q4xjs98cntuing26xtyd2hnumihs520rtr8qato2wrq8gq382ipweqiqi2b6fd38q3gk6mm2fbna4jxr57rxu229lnviibdwu5201386fq1i48o1xgh3460ytdp4mpxzq6byg5xq27bf6un62c53gf50ehjmi0sgvz1lp77q0gawxxnug7zxk7yjnlct14x3milg3fwoyk1qt2bu6sp44ha0i0reolzz6zpzufe3triamk58z1vc2v15p6i0afa5hxwzuvkgj84m2q6j8s2lu6hqbsaxump7a8sq9kieybbjbpe1u1xdks1c9mccp3zl0m6lddl73we2xorru0trncuv8gdrjghnde0uxgiscjvy2jr8jqu1ogfhucey17qg92iehfa87i79980kg9x8wh63ap59hdu8qn580755crx1aafw1858p3maa421yy6ju1bqhybki43msy1s8pv77m2z084rb5o73t04tnylkxuj2jskglyj7dirfd87v8479sqv2jjb41fwvtc1iyzv1llfjiahjzzxv5odmf8hfcyj9y15bkb3bm0hg2eqlbh9vhoknsa2p6ux5mpb3hd3avvru7f3g4gbepjv6hn83drqx52zoeqsarakwupvcjs7m7apbubfiqdntc7xl547g70e92cqkh75gaupw9kjbef5i33wac08kzo2meqybwp9d5vu5dpt5jl4jt2wu9supauclkfio8wvpngfrd5uc9yunupl5wn3x0hjje8f5dgr36trruba1b50crbyybt0mdo0g9fl5so6v9kaqrgaz94qg',
                proxyHost: 'orftnyywc7bnwk1w20jhlxclueh23agt7vywtq31bxqohfv2x3fdw63e2dzm',
                proxyPort: 4953463563,
                destination: '1ahegimcg68iehk4eu4k7g8kcm2ptvqn5esf2kr0rjh6eieee0rxxi5fik32igj3foe305rogrt6uwg8g20lwpz8du4zpe3z6zvb9f42gnf8m4ejukx7jmc0e7b8kaszyxdp4vdvwnih6vc9ya4lcil6joh2yt47',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8hvdcd46x5449r3sld9lu6d21yub7elyjvyu0n1q8z480jfosvqliwsmjoq844ssa4kofe9g39y0qms3987mpg993ubnmd8uijaxqt0hw6waxyiw97b03q517q2ztwmrilbdfyyjc8x1cftqlprt13b98wwhhir3',
                responsibleUserAccountName: 'p3mnvt3lmj36ardvwgoc',
                lastChangeUserAccount: 'pvc5kvdadgfvqt1marts',
                lastChangedAt: '2020-07-31 03:56:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '8cusgs74ju5r6sxvm7inlt7rr0sctq9tjpd4sena',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'rlqaqg5hlpsu0kuh27cz8pg0y9kpzgjrqv3h5j3wl8uwqdh96g',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '3o7l365d1vmc0hant7a5',
                party: 'eu92t2dhwxynukvs46vmjg2odyjqt23ibvn5jrs8fbkwpuc7wquyfp5qnrmar7djq4tlf4di5zem1ypxp1hwnto45vb6wioj3t53wcm9zc1wdv2u1daha7xj2zn9vrr58dk2yxudz2khk8qhtdenqhisk6pkx68h',
                component: '9189r1yipr5agyh5bixxvhrtuswgh14jyf5ahsh6o3n82937cy878g29hbh5lh9c3th85b73d7ffkr5sa153d6ea69lrb9ipgh2ossmj9tc4qu2pfofs2jvuloqn8q2j6k79pzzcfibwgg60w6dmas72ferre8j0',
                name: null,
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'hdg67u2l272jfonxfrcupnul75lwi6meag89ck2tuc4c6o1j683bfo2rmr866933oi94stvq1ip0k62kk1q36inkmmt11b15472wtrhk3siklspz5jwt9knxrrvhe9h22p86243s12s3ercneg7s8c1eo0zigc6w',
                flowComponent: 'ecln8crsontvek0ssz2392pgd6ubbfief9bkp5gzzg7hhlf5tcoimslf3t46kd5vzdk6u5e2d6m6ggg5y13uutjol2qzndjvnzl0r9h7dhlfffdgchn7ta9vjzc693jwj2huoutbl572td68en5w6py2e2l7ndlg',
                flowInterfaceName: '92di4t8wnmn161jb8tvzzbwfxtwne7i2g99zt4ytx1w14hiqarbl49ysqboj66wjltbeit2shqrvhkevn0xjy88pae8gfk0o9c32w69eouwbld2u314ljs7phu5k4at78b82bqnxa9bec5cuubfdnt87imnamk1q',
                flowInterfaceNamespace: 'j450ohaxrmv1b110upe31mt9w1z9qhc61cfw90anpepf28t5qeam4siz0fdgcjpr85y6j5afpw7cca3q9vc14cneh1dqt6l4439xoxgdpxfmobjgsfd3kqhpd2ou3h14moubni2mjmf1ymc3s6f3erpwtfnludo7',
                version: 't4vqz82spsy4u2gz7vy8',
                adapterType: 'k5ww99uqvptpky5fw5b6j3nfi0khk4tg57oosija68smeck7u90a8eoh22ge',
                direction: 'RECEIVER',
                transportProtocol: '95eo2p6txguydzestqxk7dg34mz80snk32y8rphh3i8aczue5xuc0d2kck0a',
                messageProtocol: 'bwq9s2j0ujy4jlc2iwsrssup9rr3lypj7gq7r4gq1sz1iq74mt0crt3q2p5l',
                adapterEngineName: 'g0fum3wa6n9b3abt6tpda7l7ae4jr2xq6u9rf93894cqe45mfwpq51f97qqyqsi9bt0ah6xlmzsirdt0xo73o8tzw49ozgoul7rkg1p3hu92sswr9exziy37xfo00vwj5r95i2yfoi45cgwfhnmpqv8rdwryg99k',
                url: 'ee6ybqavayyovrxmwkwfq19ctyrcngcap9k07a9e6gdjmh38mjbhnrbxkfvv7ajn0q5aumebzvdto2tvw0kx9lyz6z146ca8dsceqwsbb807mntvbr8ewwkrny1vhtorooiam46ccn5vdpi2slwk9wwkfr1fjjjjzzvpxknrixpq13wj8p19sx7a5e5ersjfqfnef4mtadjph6zt5tahzdjbpqr4esn699zu5pjbttz2m4ufag2voy0hcunu0tywfmo5dwtc6dyjwmq2klfvj6cws6dn2vf7c7vqktqd9ln29xwnmachxhfj6o5nv3sn',
                username: 'harndxjztt42qr9qebiukekh2sxecpl84f40levbm96xf4vz2brn23owo9xm',
                remoteHost: 'a06dhj3qhng6txz9eqcqo3b5mqwo4l3c3q11cmnl73uy0vv0s1qz769fhedjt4yyhbiu3lb9wi8wp1lng5v1yxdozmmam5sh3h9496rrurzu4bcjos8d0tvmv3vgztfvj26h11d7vomy1xtuhgu9pdgdrpz6znd4',
                remotePort: 2969682901,
                directory: 'q3bww3gv32uz0xshnjs49tjhzmkn4v8bnmgajv5g08a4kx6huu7hcq20xfxyp1n9js4t9ld97hqisiqtqay02w2q3n1ko00zb0z6hqkktmgwb5zsvjoql6bflaepxait9umm8fd9azx0ivz7veyoswmbgww5gg7eb1qo3u23x2q6ilka8a055yvi7w8dafg9tvmadg0eag8n8un1hgdn4ytlfe0ay2s1ivsr92hfyseezv0m0rmarats17rtwrn3dvq0qkw3v5z0x1q9hma7mfbvkmwr83vvegj8xmpdfkp3dhm9kpwfba8oobmwvytx08q2ohx9vdlh0b8qhi5sqhh7a2u5bh4vsdbmxu9hwp0htk8fdvpzpouixkybvq56v6if6wtpubsznxx5jt5f09dmh3md4z6p0aipjvdeqtn4jhcjdbxez67v50aqlys3cvwq21y4c89ku81wnyq27h4h7b5k0zqkvdwwvlvc16m35s8vrnzxd577utijgr7t88g2lk7v9felp1clz2grwy0mg6zh2ocoekkzedznxr82q7qrigdssqyx0h622i83vlj0040eaklr59ouspa2q8fql28l71hzisahfntgupzjopx3alakrgsd76mb1145kdscrciaiequcidv3pk18gw6ooyytvc0qbebnsa0ew6xbx0zenhb66u96vkf1ytbh4fk8waljeqjxkbhywj2vuk5dg8cf1tgnrzmhhqtwaz3ggw4kqg2sk8pbkkpl0qn0wocshpe2ozvp2d1pkot0wl4pd4dc5kog840rkslvfbo4onzjcd5bvngmu08bejbo3rjdevrqnseqfjfo3ct8s5rfxzi9c2dd4fr6a7vfqegfhpnmx6xw05tka0gi2nzsl68tr3ubza57t5q4sjcmc66rlkjp6eh4rnypqfw3llyvzgk4zk5r90534o6hltl9l6kiri26dl5fegxd0gsxv3ut46oe4asr0kzs82iqes2siz7d2ll400s5a715yf6',
                fileSchema: 'c5s668pkw1y5wp21oa9y6arnuvo6smdgmf7y5p3fyyu3r4p42ledju4wd51tybovkkfe0hgzb9uui2gqgxmzsmd1nusf4f1gkpjt3e9ygrih90joicyjh321ul0j7ealpkk26bb2hlvcz8tq5kow1c4swfi5yzcogptyclngj5qs5xdmtyeqt7oldn85tbaj022bmz5rlkye5yztppghp4v53wzpxlvk4r071uf0ii1ffw62nytzaj1idrwyhlc4drvmkb61egr3gnp5xbzszkfa45jmcwnf1e2w4sk2yqhamr22d1nprlydu44munq8tj29w9dq2njfd6u2ue6afvu799lr3flkde9qtqs1i1y36qw47asnnkqak5nm6tq5ymql5jx3meulekq4ruevspxrf98uc7045ua3e9mnaz7djggo5gocw2okv10gltxkgsemva3gevfm5cfpbl1pvbv2y7or4pcbs5nglqzp72lwi6t6ccnzse5swlq0upr3z60xbzu1jxfbzdex767eixej445r4x2tay6isu0n5pehwnvaue7okggopmwohvrj3coppjxteyxv3svf3h2cb4qjqjdrdymyd7z0zr6x1omst2bvehj9wbvtqnlrx1obrg5lhfynyxuxtg628puo8gy4rny7myqjdtdlwfhlfnftzq6vz524bxzvohh34qavadle6fkbl5ws0arcl294gtott7sqqa9cd9qgcnxrnj395ogqc77ehwd9ol4mcnmwkxkd7pztjyfw0jip176sfy3dfzt4esucvsg99eeuof04qmteuykmje7ba9bmh43sn5zqwfu3q96xwnfap5yln0gfud38mhwcqwxjj5zznj5qodwb02jkzhehodck5jtlj7p5hglde5ob2wbbzi8j84p04vh8v44qayv5l3n3x6f2b9znmm01mc40hja6xe3yed0n5ahofa84ngoiufrne6y448tyj54nuh6spgzo9tipcwqkevy68zfj42sjdwqf',
                proxyHost: 'qajku5k2r0738nijdlxcz1v33mzu7vi1wxlygxjvuco5an30nvaepjclmahx',
                proxyPort: 2127942257,
                destination: 'a7k29lg6oij7uei7os6cdhzawtgt9uslazh2pq6lluuchu33gjyv52tnovmy4yggx5ndsyk7opo8679msuj4gdju1r3g1qh21g96t27b6cq606gfw5or8kk13pwsm1fpai9vl7pla3unvi0quuwc9zzqb7o6tabd',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'se3mnkladt0bedj1gzcu5z2ad9xkrdcqcwiocujumvrn7amz5w4gc8wy1nie46aqfvv4sxfj2s83xz0w5docd6h11oef9vzbkc6mg3td3esoovbi76wkhlommwvqk8dwcuekmg84leoqifoxw89jgyy5mmnnz125',
                responsibleUserAccountName: '8y2hdp1eag2eoi7c16az',
                lastChangeUserAccount: 'u2glr0uh9xc8ss9dg8sh',
                lastChangedAt: '2020-07-30 18:01:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'osonyk0f258doamrbki6d75nj04ny4g1rw4shekl',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'bb2ceg83cp7h3iz3xn011sxs4fy2jbqfit0vkcppjpcjgtyy1p',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'l57bivsdam7kqaryk0zy',
                party: 'q3i7n2rk7762esyuvifsqe7oglqegrr4m4jmujzl8bni5pi8vweizp7up88hmvgsgeexnwyq1zng5vzh837qr330mkhz5odjfq6jgbfa36rx594dshl3yyxkehkqaqnd2g6jo9doq8bcjowwlb5v8hec24bkjxeq',
                component: 'k06hj2p3tovbiw1i8lqjrhyg8cs4t7v4e8unyu9r5qnmj7w1549d137z1j89vpf958fkjteh8b02wm8bnqy0mhxwx8gxtvzaoa6knht73rz06bl5gkd8motd7loff5xxbt4jy7pgtcsst7988s7gmpc82n9qwoen',
                
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'yssuk245eyyimjs97gabswdhkv10xwczoybz76xh6wssw0tg7q6xrcldsg2frv7k9gwuh2qwpx1luulflevhb5bk0sduqx1neifkfs6fmciv9wxf07xmknpp2j7sv5elearnbdp8sfeaszwaermlp8iqi5app04y',
                flowComponent: '7tt3t28rdatv4ftckww2sfe3dcvuqenvjhcnc3fsu9biei525v17w9kdsbrv4t40ydpe5n6qawsr4i64u5k0qsobbd5kfekfhlwqejucng4idr5w5hkxrocms9hg0h3cj6yu4zoaa86hh7ameqcwyb3s0ypdmeu9',
                flowInterfaceName: '20qt3a1rozch0wcc1jlyqtobn9bbdjetnq19bplt54bt0hushp2rwoasv2km9w338a0j941mar5fn6q0tmvchn1iss967zq4u307f4c1fxyvwxgrl1a9jis1yjuwknzjdgh9qrb20twwws1imzj2z95i8qornmvm',
                flowInterfaceNamespace: 'dncq7hmueornz2e95lx5g7qc4ki423evrtous221xte31yrowkilgkkw35l9ffmk2se1nf5fssjyp6o17fgodrzl1bpjwn3uzn3wnj84f64lsovby7s2mq3tfl1shfgq0ssd6njkkhpn3m6pkobv15a2qw633chs',
                version: 'pi9ktzqn595rvly5nmtl',
                adapterType: 'n8za9n7p5z8obtud8v3b5u4nnay0x7rhfwhta525eb986bdmrv9clsjmpdjw',
                direction: 'SENDER',
                transportProtocol: '9ghckkkiiv3krxc7fluz79ifz96y2exkz8supz7x1dn6ucbi0szpelvpwn6m',
                messageProtocol: '3nj3b1jhsmzernt1qazmtpl2hm6j2w5fhlbrrw0fxcljp5c9vkhpxvsz2w0f',
                adapterEngineName: 'iqkqmuwz3umdovra7mb1b0zd29pxncwbp3tkevr3n1whfdyukdi9pil5l6dxvr659w7f8r3sehh4egi13ev69fp6nd64fgp3hmhk5u07rs697mki41mjbay2o6mq5x1zrxvao8m6ed8xwvdrlpf2snplenr3mmvh',
                url: 'kkwr9aygbb8wxx93u4510h72o4kstwjaym2480h3aev5c7wkr9lqvkrv6p8ucy6zpg1uqv2g94b8din7307heuz9i6c64ttaqbh7980s51ajoslj3b676yymnvc65gl55nqqldqc48a1kml0u6yv8n19npecavd546xtdopj56mk5696t51xf9kj6orvcd8aj3sdc1uk03d2gr5vqmz6ridv4ud5s1ypuiif9u7kiz8nqhy9omqr37t8s04j8udjj7p41fxz6lyzj2l4rlo2wndqg0eslguf7gcl2huasenwi8ku0qs9acoftod78dbu',
                username: 'dp10lrg9oa9z5181020qwo26bnptuvkbr5oypobmnsynyzc39c6rl1xegewr',
                remoteHost: 'xsift4rr0l3ogq405d37w8krmp57h918jx6mrz4hqfv8ganr498ofzh26zlgc2wvgim6dhnfm1l2901exs9z40lfnjb9jzfh28zwhvwy7ep36kl43p92uh5ahgqcltypv62wzblpdyyqse6tttld6emp6jipkfoo',
                remotePort: 5726754028,
                directory: '8ieyd1pky220wi09sdt6w9uh1fhnag8xj9sqnf987aqskrqrkis2njo5dxwvyiiwb17xzwq036jkm8ple9by8dv34ogpe6sxu78uzuq6v69efz2yszvaj2waekhr2nlgb8tzlv0paakhlpe01nhkk2448er6vggmxh5470e3qg9rlskdvjccm7cgzejsf73gr1v0jxmf8e672qz2qv2o399n9zkortm1sc285hqluipmm6pr7iq4igwwik2ter60meakbdjkz9iqepuhjb2w6w6wmjek6sbep1hyw4nllo5mrotz9wkjk7tme7cy29zjvwts1vmfzd4v488bb0ctbj7urm3ojjn2ul4uu26g65al26ttp854ay54n4jea7t4p30rr0rj0aru168xv8msdimvjg4ibqc1a6afsr4nckx3f9i0u6r1xwuwe8gu2h7wvnfxba7k7suo4fkbu36mhs2bqt5qugd8funacke0jxe765v5xmnhg97mov98gkxs9dhdo46tug6doaikpt9wjf74gc3sr4g64topax1use106ogg49igfj6qvg9j8euy8hrgpy9mt2nv03c95cti2o29qkhkg1kxghvg0gtnkelnla8dphle5vn4ga7dp5nu8ngn4nau7fzm68i91mhjynpdcuodg0est8lcz52say66j5pxmvyff3o182vu7d2jfgq7hnfz5c3pxhjp7v2li5d330i5868atpt47vjb51odlvvqkigtts6i0iqg4ecbjk2q872jnmhxhk1km2jfksqxmn7frknzarz5tnm7sn64qs1cub2tmbcaqaa7khptddj8mpqhdn4sjxomdly75z7lddlkgrxkip72mj0d7pd3zjen9r1e7tco1uhb5sx21lqxo00zfxfx57wneii5egfzrail9e8aie1d4bjs3as62z0s2r1mem7lnz4c46t77c2t0pvi3dj7n8ivwq0f7o83qmxydi06x0omh74ho611lwls5az1d8klerhgak00',
                fileSchema: 'cdoltvzymk05qmifb254y1lr5nd30drakcuz84v8h7u0a3hgcykhyrdq0ggvh3rqib0y0lr9qd2hjpwurvf8ch14ipb3z7hp0wy5vwnpine2l07ien406m9ykwsgyw294vcubmeuatgaln89vpoltqz1z14hd0x6cr06mrm334sjlkg1atrwrtcs1gyc9v2tjds3ffrnv49bpj0wd9gg8n7spuzqkp4kz1h3ovv0mf0tn4ynlglq6j5vddx1dwu6x546pyr6xzuf3dy4bqzhb1659im8t8a8pr0dbuzf53de61ew4exntahwefj508ufbxqvd799tjzlstwpkdzhlxofk4o1ocsd1y79w6tfngu2fl2cwf86ek8yyrfenkffmcg5kqozcifv0h9cgsk6frh5c9zc6hr5nwwonvxawbdsvi0hj0ysi7k96pnarxiqf738dm0omafpp87t64ktqv90myvrizjxsj9hrfpdw0kuyny8hayygnkidvze6w55vv1lhd65sdllamdyd9pgi0r8sqi9jr4qqqnuwqcg37o2b6uspgrvpqr80e980wsbcn6kzbffz3jgtqpth4nheudsq4f6webig14zq1i8yzrqkg69fd475fxgchtn0dcnnp8rj58c10bx4sw4c8oamfxgfn25ffevx49l2o3spqy80kd4to3jui0sr8r0231z0a2qbapev1uzoy32xn2gbhkjgi4jtooj6pc1z5xdu7x543tb4hbu3kqlzk2sfodbhvuna400wzcsve0b7j9hcavf3gl8654l5gp347x7m911231f859e7ie28cc5tfejd9ga5ua6rom4hyluxp4bw7ve6p5ghe4lglen6ysld6m5vmtlzoo2u63pzepm72d1fi3grmkv8t8tqwexjw2dsf2boswpvu0dngqx7de5a73sarear96d4gpo2z9fyoystrv6lobi0x2b2sfswa270fl5kkml8c1i49wohcmijwd365twi1ddpmdvse4num5i',
                proxyHost: 'pn2915031x0bzihem8ce7acplliy8swouegc6x1adyffq790tjvkz5cujnmy',
                proxyPort: 4259516095,
                destination: 'jcyxcqcnxjdf1l97awo85k4ht5n8urzcj6535a8mxis1ej8chjjmlzucw1k2vi4r5qg4025cvdubuxc257hxixg91gd8a3925d80r76gab5kfd46xna4wrl6a8nd1oygi2rtds0moj295k2oakcwsvozzwxr1pyh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ci9bra147shdco3nb2nb061prvrt2hwgrastyhwov9cz6d0dpkh00wknov9wp2owekcqbur769649gym2nerwe9x1b9mdohc67ngyt8150j7hl6hdttz9wy9dmoeb9nvr2c9rwu7oppo11oeije6n7h0r3rys8at',
                responsibleUserAccountName: 'nziqufttkcce3gb49m3h',
                lastChangeUserAccount: 'kkbrjaz3fwpek5m62f6u',
                lastChangedAt: '2020-07-31 11:58:33',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'leu06q1wigcsz6mmptk1ozqodhd1d2kfw1u5zuq2',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'k1y60nhmnb0w8bcy8qzo7sct6lr7y9n8btv8fu2gmh86353ar0',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'k496dpvilk5c2i9gy3ec',
                party: 'dzasx3asjgwetdbh09zrkxs358u66hkx01vw481t3ar7b1l7jst7aovg2jdv8vgjn5zgs35s0ojtkskscx2etvz25exjy7zujii78e2kt6r04o56l6g1blcqo9e87jk4uylgfeidqdscb8aodrxt03z10he5isg3',
                component: 'rln88fbbxeh7x2qb6r624up28duj75adv5jvp50ql44bxykqsd4l9g9gklo413u5yuujqdofbeyzznzsmsddh7c95ynbwzxqej8592bnbxbx7en7seioa0p02t1hltxvk3gdww26ft50chj6877nyyunyia6odsc',
                name: 'vtdjb37y1pi22o82zjdvt0i7g6t0dyd0h12ei7deauiaejk31l5c0d4lv5ycxz98klggur1zrjm8bu8m0q056q81z6yjdxglm3mjerawz84avymhir49sffawtzvr6d937y12f9w6e99usrj0zdm64gtj7bbu3a9',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: null,
                flowComponent: '49yiz8i07zbdwron6gwsqcld7et973f6w4cah9a8g8qin188ikpgtsoo8bn8n4dflqyurd48jkl26kg2a40cm56olauedi165cywhh28gudh5s5aus1gecsgm4ueqgcb1rubh9hir1c3dx08564lzliidurx5u3o',
                flowInterfaceName: 'yczxntz7ardsku9tniu3pit4d7zwrgoa5w2ufs3g1831kogr3e6paidhmpp79xdqhjdjj2tfb0kapib8qp18ki8tdqm05dt01i2molmduof8z9vn2bgy97wjkl2stqvzt2z49yk8e0eplv1hs2a33f9rxkm2cfnb',
                flowInterfaceNamespace: '2v50vt15sfx9cizkbyy1bjr194cghnjk9znuv3vy9iuyc4q0zvwp0a600mibaozr7jozvclfpemuab6cpncswj8pkotuw4kwxlgtn78vtdk5hs3yxu9wsbj53fb1o83w9xs9ycydrlepv8sql78984fs4pyonmo5',
                version: 'md96yd0ynck3bj8f9u4f',
                adapterType: '6y7db1149vru738aconue66ucjkzpg8vphb92bnbxtfe20ck1xrgz1fl7kja',
                direction: 'SENDER',
                transportProtocol: '58z1r3js8a2osz7y1i76p3yxw4klkjq9isd1w8hxgbpsc9u1p64wd6wd5ro0',
                messageProtocol: 'kgt4c55qwjfoc9e5w4uipuqbo7xccrp9y96z2lnjj0e3yn9j8tgrx6cqdvd7',
                adapterEngineName: 'n0vaaf0vwbwtjzrkiqukeaok3s24wwekww4neo8rfl5zu3h88ia7bon67diwteky6vcmpqoon55ab07gf7zdec67eaa3cm9vx3bj22zjc5ebcdevbbgu5dpktjkrrfymw7w26d80d01nkhz3jkpxr0rrxpjy5y0g',
                url: 'kcl449buu7xd6wl2w40okjcn25raun0066j0l2nd7ntaoky2mgfqp5ucf2lbyjcnsuo54m7adkxtlgxnbogfmhe0436ciwaomx1ukreqpc7bw3nkrsan9dy1dzpn2kb8d70l7bkui54ugf40h9qds87a84w6m3aixk8t2q3fvztaauwrtt1cg6img977k81zlv6zzo54vc2yxvr8ray6nyuw5zr9dkt4vtuot8e2gszoxw3xx5hlva7mtgyo89xjshu6sxe7kie01683aia3h7gohpdvbdpwhvkeuyt8quwjbwzuivaakpbr3kbr0bac',
                username: 'gzedqepxoqr83secw70256ks9ti6hgpx2dbh8tpvemzokcp9eu1lpi5u4rao',
                remoteHost: 'uyale0xrsjhgdc5prnt686m366xhh9956m84g3se37o0cnl3c2e86dn12ifbywl47usn8womr8mmw9kyn2evuawtjp2ljyrhn0cqnnf6smv8u63eo5zn5dy2c586n2ljl9n0179jpk90a43ltwc8bx15yln5k81f',
                remotePort: 4928926628,
                directory: '7jloxgw4gormqtbohsbqgqeyjdcw7ncwun4obqs1f548a36uyn9f19guw9dmgihonhp85impyd93yo5x30y9n04ei4k2rdxo8buxjrxoy7l0frn4zel5pflzpcb9rdmso9agzs9m6xuxind9k1yuvcksylniwan7q1962d1t1wn614y6kkq7xcrhdmk7tcil16vp4uzq0zu7fuloqc49zcpe6t5n3spt7pzjkegt1ahybzvtdh8l0fu09uwkab3m40pmgabipeqvew7g6mb0q0t0v9g5oqch2mwtujnkyyqw18genwj949nxmyypd5kf1jtzzsefsfjtqvu1o1qvpbmyc4h5zvbxb7uv64zdxfjnmfouz8859b0ya4lnyxt0dzrhpx201sft1pnylcaiudqmh05301bwsmzij6hknrm8w6cwybmaal0hjxd0l27ky9jj256seztnyfk8u34i6f8gcu569ojotqij4j1qxr6b9dd17xf3xpbsu7o1gpp18f668ao7jzxka2i67i5hmb65xa0twxyog8a96d650ml34hx279ee6gbjpjgnu9b0fqhecueua26e8thy9u0nunjui073n6ve7ndnryxr3hzhvmug8374g64cru2qm31jindw83bcliksyrq5bpbt298d2pwxqvftc6r6b8a0in5v6pwks2bqi573gt0mw1doy8ctv4kesa48cbusy4rhrsbm2bdqwzt02l6wvvio6e8ylwfezpudl5zb7rlsfrxxvcm98xcerzuebskdscmbvshsdwosauwvadxanxqm3s0x7qevcg1y1bl4n0mxa579dl9yn295hbettx4rj4q93j2crifnympuhr2om9es6yy68qw7lkz56ojdktkq0zkynrfnl6dcw5ii2f2o0s1hlxtaicxs8a5ycv7spd1p5caguupig8p09l2wlw0igywldhubeguwyle0e06gzg4kbn2ze4d0g13ch0yii69z9chvowh61vpojw9wca41cnx4',
                fileSchema: 'uhkpwvuvrgfkyv5q4btfc9mew5anzuay1l01p3l59rzhdbl5ir3oir0t6b4jrjpe8q94d5igc5rtinsvbxqyicxhcrok290m0av966qxqumx19204o284948ndk4br40jp814ojawwi5ul0tiukrv55fsrbz6d07yt5evveiaswf5gg7gvi8wkuoe2g81juer4qr0345moye81gshwbflrrejbhoh6fml5msy1lijn7sfv39b8073428ld6a5cjpy64j52231l6k1qcshhgzhfe29bheus14l6rn8eo41i27guejppvmxxpbgp1u6p5ihhp85s3b8gcfkj23zpsruholhwirp4gb7cu4613k9i4m46cogbv26q26hdmjhj6qqxznppdf2fx5eqez7omhr8uki80i6puif99gch4ivj096cjd87jf8lh8ebihhcx5mbok9t93oogal2oayp0hsqms2t1l3jqt4c130bbslqijkc1qzyhxyr2izqclgat3pjjppayeqxkkcd5oapf3qfrv40f0xd6b5vknbbd5cfqhj296a12j7kkn16x3ola97dqmeqt9m73uwe29yugdhyea7o5mswo63khgm1ua03h50jr6keuf0nc2ev2veljew2ot2j7unncf1m0vgppduy06rvq9fm2eavlm3wnpd0zvkgwdr2qbu3m3nwwxt2z2r8ejmlb1ou2til5wr8v2hdsk5cu40tvj3abpg7r3m87bo20g3ynyv488r50mlr0sf006zsh2lquf42zwuk3byxo0guo0ac5icdifuojw3k334nq8sl9z86cuklbvn79f4v3889oaoauuwy40dp7286ix6uce39rndl9tpzq8mk0jv9eets94816ufh3qz0x0jktzz7innpxu01y3lh9y0kaqtt3onaynz57dkam5fxz69n0oxpkchu97ajphzkgb8w5l429kfrr32t6purjjilwrldkgbgc1qricff91t94sc9iiyd3eb9btbp1tkjbx',
                proxyHost: 'vl2yejj0ye9eapw8dzpptkb9307gi1sroqdottiasqlxi5zh9325e0smjxcj',
                proxyPort: 2574174691,
                destination: 's29i21kzyigvdobn5kzvn76vfuop2hfha1i60wt428skg0j22ambly5kp41zt79p32b649zha0907jnzgx684vw1b0r20xnxyudc8jabc7naerb6qbwn2ec571tv10e3bfucb2gnuuo5nw3xnvbquiek2ye1g8uc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ifptosrjl2yethby42fbb5afxda3ged5ce8znxusfitd56l81ylc7akfplxwjizd5sj17bi6zofa55fpepy0ervtsupdjq1fq0g2t72msjr5san9wfwfqwx2h5n3bo44t19wvi6k13lz5rhh8zyqii671cbph27i',
                responsibleUserAccountName: '8u29yodj1jjzobtysva1',
                lastChangeUserAccount: '9z52hozkog44ymycemis',
                lastChangedAt: '2020-07-30 17:09:14',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '9zokokgncyl2sqf6iy5bjiel0ou4knscjkk7hoql',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'bty1vhasaf1jla1gi9r0osh46f54lqvxw9xgbhs67yafmrfwjt',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'wrtzbwcjwyqzeijjncm0',
                party: '1jtcqyvks1sne7e8fpbf79xuuw8t2vn7xy3rwrdcp8rzsw4dkk7k2fz5c5uwadx2ek05zjwwttz9v76k760znxoaevl1aw714k09ctf3xee8uf2zsctw8uehaj3rbs4ievpzx0ex2bd3ptbx6a3d3ac6wg655w8d',
                component: '49zosf7p2wka67b5b9tlqsmxcj3w0p2pohcau7pkc5hchw2xfbk2w8vccbca864wuaxl75rk1kbw1z3txclu1xeqoj9z4mzjoc8breaism70y6iqqjs2qv1s0hgxitqzak09rmu0ct2cdq2zmc7e5ejxc8nrc54n',
                name: 'lo5pmf7ppb5n47fywbhic3z3s8qsrnrc23zlotozjve6f9twk3z6z3a3rtqq12fdv555itpgkrqhsmkt4qbl6eab6k2iz8w1mlnphwnpm2ly2jyfwizozswymfcfsnokxlug59xfcdyz87smpu3b2azjjcjnnq2b',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                
                flowComponent: 'zxuflr801gjnr7xizcsqy74714hynkjt589rjxlngx8ic52qghaqjjmdgqx0a2mhmbokrgid5ztrj1uk60f4lqdpxfqw36n2cbb02j6m74fxh8j6to5255g02zamowt397z0jhyxk0ygijzckcjk6uzy76yxr2jo',
                flowInterfaceName: '6wo0cnsd1cp6fp5g4yep0v0l9zbhvsybmweozfe68jbqjxlbcsf1epjhyn38ehqjsp1qy4esvj3e35hr3t6jabnd0key0ypiadyozta1ibrurw2kpsotkializ9uwx7pgnd3yu1v2vqbvp1tzk7cc79b36vduldr',
                flowInterfaceNamespace: 'x5mcea9xy7iqrb1bdzglh8nbvyjm435qftajagl5ciqmj29xs0pftut10hd0dl6ajkob4e0v73gceh0i0fkp5qydkg5zlf61p50bskewft3uu8vu40xx5qlm0kt5o6gygegn0x5i2cr94yzqrsrnlppoh2soud2n',
                version: '46l0zlss16tat5dlqrrx',
                adapterType: '77ahbwf1pyeljn8kilhtmxrhyc9owwgvoxpzdrg7veht6sae59xh2w9gb374',
                direction: 'SENDER',
                transportProtocol: 'ii0a25qlsnc4s50cf0qaw1n8qfb3cxeg15nahail39s9gcwiy4zsgkt9cuzg',
                messageProtocol: 'wo2fqk7yboys9z2vpdpzj1m7ig6gdw2h7gyooudcgt4d4dckpx4jsvxancj4',
                adapterEngineName: 'h3twwh3s1dqp4kg40qu943ufltvm2lrjaylnexb404fopyr0a2nxq1pilie2ig5gifomhex5ut7yv1awuvq24tiwfhpiuvz7sfzrasuh1ugh77q945gme2b5zfap6z6l8ycost33xbl112xqchkm8wsgbbhndkhg',
                url: 'y6h4gw4qczs332cpgh1e2q5y9malmb5pull0sdstkr6sqxaisuqv61zo22yt30dusknv44m1gawh27n8v8610g437ejyg4nmueorm04trx85ixmq1e3phxj8pj88vla510fkhthjiro7u7hyt3oe12ceva5qirnre3bjgth5zzeltzd0ybhehtty8vu1idy9yvfwn9r8fnf1vszhtcu2sde2bhj3mdhbkuev0pt27i9xtrommywo9zbidour32c3xal9doplmgv43sqbfk1hzqt6n4338ezw570c1nh0sfbficrhvf92xxre9ygce4og',
                username: '2qy0xt1b5or2k6yepbiwzqo2cymp8x1lsd4rce5pwexztku83w23zd3lf4cz',
                remoteHost: 'iegx69p48etzqic43wswehvp7ov9sxcgkug74llh09t1yx8dt5n4x7082vpgm8g1nifo8lixmxopz93tqf86l2kmom7kngixdon8l2msym3m3gkptx5oba46uvn3eh06h3srao97x7rzbqt4xnjf5hkx8mfurt7y',
                remotePort: 5020558547,
                directory: 'i4i47972j4m5j1dyezigoa8n9d910gb4q6hvc9r8d6nfa57qregyfndlh6i86zekasqp9vj8qqxfkar9u050r3ijjenhzes63g8ymt6szm3eekkvizv91u3hdm00p21cd03af5l1kqib26e112i313efkr1p9ebko2ra31snefh8nd27vukajuq912u466rew02qbxdpr5rrm6hgntpmo1tw0xcyqvycxuea9560l1gommkqou0d7kibphy3z8jf6s0gf5uakk9982sfiqdjiftom54rp53ndchnnqljbiigjc9k7520qltirwrztvby4p7kj37e144bic8s2cyl4mh6357ffjjerq98isgdx8pnu1aj3r4sbroj1t1201hvje8zoa0xu58phkxtw53odxipryhsm91v0dc6lcvanjmiklms07go2k1sz6cj4ybqxinhrvzswia6wt0z0o727j1yqjqh8bchulr7etdp0jiya9pe1id9hxjswc00k1aqleinipopo0383h6hjvl99ngf6l8u6d9thv8gkt43us1y10x237ahpirr70xy2u49n4xz2kub5oxgpg2k3eizjjz7hclsvkzd1p8cqczwr2497ovnapwed492ark24b7n2le940h6i41p0olxadmketnwah042m076mtq4lajmbddey6noo9n0ks5hz9libb5y69elt9khmkag1kjl5fqra4tr8g4og2btcy999dufqs4xhe91ckfxcaj7knxhz5htpwkzo7rjnoqldw609wyh49v8q97okpaj9udc5ev7rglx2znm06copmsdbm7xl2yqh9mixchh7t4nypaeletkg09yan940ugnfl3pjrhks13mmqu25f54rht7yz4lta0s3e5f1y5lpuuvbdj4zveo71rt90ph1eur9mfv8hxd19nev22wrfmdwcumfipz6as5716ikg9fa1gcxyhy6axqb5wk9ogt3m4bosrhxdaibkmozv530gilgm2b0eo6hu3',
                fileSchema: '04zf4jo29omyckil2yjljow53sbcpkrdg2emsbf8z52s55mt283nq9mink2cc8iyxkmf3ye2dy0jmed65jsrsz5omurq21fbvn8c9gs51rh08cxomx2ya8m9dtp8oupnlhmlu33so8rhtm39e5q68wx451adhsma0a22se8cjf5vdeomkh61l7m3bfr4kncdtfn7e7zl1sinzutkc013j0x5cdzui7i0rs0o1vhng4lyzmqhkwkfjjy72bkz5ojj81zjgtucokcz64gtg011zrbwuiowv82lk0gx6xedodrwaw5eyesk9c3j0wosi231877cvs0ke9kr3788biijdzdew5kdylpea1ifxboqhun342jugy42s36keztsc6ibbu3xjji8592yzt1nac6w9n9jetijfdi98gcfy4n42cpcozq3a9b7l1dvnwjgphnhdtok7ptzmdkocrshf3vocqow9iz31hbu37v6y71r2mb1tqpdgs9jgjc9qy3ve2sqg18vitmw935pk5dynnuec6elodh86ru5xxn7ctjlc9ipbvq9kwzp7sr1agj8idka4p4l72b9e2z9u5zoq56zl5ufeo3c8ccdwowngsg3h493rr3h8as7wl1l8fat6xq9bkmkpj6lco110f52iczh99yi9q77tlsra72h56r0xtvbbvdx4rp36w3d3ao54ijk2judmwqojdj3v1i41biijjmhj8ke58ws1q13fotkcjfx552zwahj3mt3blfvlf0a27xtwle19g8hk1o5frxq4oxky8jv6462vilb5kzfnsmzt385n406xjjr9g5o11qo7lrk7f0y2b5hq59v2167qht550bc88ggufp0mf03y7tx10g0o178ufiqqfnnktoczcbi9bf9apxc6k95qtdfi2oj1gycln5sxo3bteh3mvka66p6di0qilysr6z9rlpsytdyumfqzry1hizpiav3i2ro9c2s9u8n26vrtz32bx1iju4qyn4rvl61mn2zibfu',
                proxyHost: 'ttmb9y9yqmxe59erh8wy8hgvhfbr7hocgfe2s1wvcioza0oo0x2nu6f4oany',
                proxyPort: 9868647726,
                destination: '3tw6upo6z04d8s39ynguutlzh7v01hnzs9do1ehue1ounkkd7a5mz2d253x6m6s28ud7e87cpsjtemduixqof5pc92r5bf8lyyen5ejb5vb69g6c9ule1ixxp0bkovtbk7t5pctq5rs2pstqqx01ho9mtv98qbuu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ugh934y68mq5zghq6idz6u08xjfbfn7mxwhmgqkd2wkgmwaj7w0wj31gy4e9kybdx8kpw880aqnvwhnaryqq4rew0vzy5zle43ona1hipnuadetpycbve9freb2sq4pvk06hp9cyisglwpiqzvse0g83lxj056ay',
                responsibleUserAccountName: 'ozvkbou6yfmiukl39mn6',
                lastChangeUserAccount: 'vliull919i8jek1ggfq8',
                lastChangedAt: '2020-07-31 02:16:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '1eq3g5f8oo1z4oieyr2k09zj2ie65bpughxtzahd',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'ell1l0vdjz3dzhu1xykmjcwls8tcwzd2zo7uuxi5aq39t8cry4',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'y68eacrk5hkbfbjcrqie',
                party: '12o35j9nbyago1b3bwfrrvdoayayrv6h1oupv8axpxwau15w2wwf0wuftzamcuopxv8it906etmn1i0livk1oqm51wf23tr9dyt8ncw8htmcwxyrwqi6wj0voo56cwfuhwwkcjvgem6jzv0pu127jq3gc6ugrnqb',
                component: 'd8mqvslavpbqj4m33y2dm8j18cx9ylrnd32rffmm5o2lefey1elile8ezl04y8qmwgf1kf4xeijrkg9j31hu3ibb7hzc0twc2npnogf5k3n7qn2vkbvv5yeh9cf348aqerlw79a7ql4bly0jaccaqxi5furiqdm9',
                name: 'l3hrnw2osxg2lz9plzw30jigz67hypewd76jx4k4fxzs7642c9w516pkb02zhfxfm456mqsacyft8avosy3spgzgsp9ufvd37w0kqv4i2wmy4lh3tedmjki9eifmk7qse5m7bbr1zi47njdys1uff65b8dhfd9w2',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'h49nilz0zeoypxzp9i49q9g89xjbobr95vemv5mdcdy0swabzekocxof7k77qqmsfmwf8x8orcg8s339ym6aik6i4bq3em0ac6djivb9a06yzms6wxc7hdygn2joor6y63je47y7wqrp22hjs215yon7a1rj0y8f',
                flowComponent: null,
                flowInterfaceName: 'ikfa54s405nynrebp0sh6b738p1xxgmo44f8e6rgmhp6lpj6e7z0fxb55whcmzfh6u63hnpvcmamnzw0d8ehrvle74lharsf9scdywgfaaecdvxlzal95tv0s17ljb10tgpizkh7vwtm92on91aihfe9rxztolec',
                flowInterfaceNamespace: '6jyatht76rxvz0jdsmk5rfoub43agla0vu7l0mazi9pgub2e4x5xnd9giuy0it6ed1fttxvez780zcl5r86gcn6uhxywa4o4v5f9evmnen2qqzpw040avuituahqhgsff77g92dxo15w42kl4omn6qs6uqvd2g4a',
                version: '5stilr65d5ytz3hpkax3',
                adapterType: 'nowvfpxdb2lvy13ed848rioq289ayhwzfqpo5xiwhajipunlqxsr6gno32gm',
                direction: 'SENDER',
                transportProtocol: 'mqaqxfcdcn7s76wbijmej6mm0gtagv8icvjsjsbqbsku1cbgi1qi1tnnae27',
                messageProtocol: '97j0moekjajuz8husqwe8vhwyr9umxuzy4o5lh5rvfrx6mneq4dweuc4z6ux',
                adapterEngineName: 'mwj6uf7oyr86iogaee0o018uhddqt4s8m8mg3w75t2ski24oh377di6pagsrsjw53x4dgu5cmmdiygdduqh6cgyh8hxjv91vsnp1dsij708tcgxb59wtwvnd6ahzpjdn4n091o7qfujhzew6x9kmp1fgq90ip01d',
                url: 'm0y0gpc9er46eoav9vrldhjtrfj639guh7cgzx9yzra8700sdhbb1doz9e9as4i1q0jx9ogeg3b1xx6sczugyf9qgmg2rbuodmgptk9mw1zghh23mm0xx1jgmpq7rl9lfnfxau9dq51gf8czgblsy5qwwizqojr5breqaal6pa7infm71x3vqpfo870roey10y1m2raxddpw0ax4p395u3mduccv4s9rrqi57h276j01umweto0n53jm85wf25zcu20jwwwda0vpwd5lrxp67va482n2vco4xvugd69dissukkwznx9sa79oj19l553m',
                username: 'p2crywethtarxcgocr1i0xb6peogbvvjrhkm9oegc3rsm1vyonxkulpgvnhs',
                remoteHost: '3xhd08r171bcjlp59y2qiab97y8vf2ecf9cl2j1p436pjcpctzbw1mcawhd2jjjaonzon5fgdvoxnnzmlncav7nsuui4tyxyadw1j9ub1aksurlsiyhvq7ys2icpkxb67a1e9o2tbx4gsihqxt1ldc6hcng35xex',
                remotePort: 1901376487,
                directory: 'p7hs2rzmobeglycw27r9sxlmbloieklc93n3u3b85h6gh82hxgvjtnefdk9a0q0ajmyp3qrtsf2avt9352m3thb4k3oggsccde8rrljxwjoiv8ft7u418ntjpjeubzwaqmumr5p0zrmxlm4ihwrow20m0sonlem2om3rhg5bd0rzj7y129lyij0m72leg1ty5k9jl7f5zfyztv0anawt28h9q8qukxmw8jr4tbjz6z0rfhg6wg80gu2lh46eshnqu34rh34p80x35ecetpfehbatobbeil2d14mskvs46jnbm15ai5sexk4fvr21fy3itegsfb7zfbs8bayvpxorq84t9lb1zbxj3dl5z5m8etllztn7vqryj2aw87mh3sw3wysni1mf24rzrr7l51i7vusmgxrgqbz3twfll5vqmbfen2hucht5t4ik57s9qr0cz2ow7sal22niixyt4ohcrdxv8k0rpobvz85yeavrd8obwjlzvaii67gdrdi5nozn0e8vmhgau7idxh0iw8awhuovwokxrdr0iqd0yavef9lupsao91aagypbmsoa56av8hq16tyc1u7s9s3a9tg1lnebb7asbb6ghk8h01nt8k61j2rhf5xufz1tj6dfsk68edey54h59qivzv6emp8uwn09a6z1kwb0o7wk2lrsvz5n5tlaoj9frr2gc8fb9wzofy7sgmup5g8o7ezhyxb9awoyfp52b2ygbxkhd1juzs3ydr2nvmw0l46fyps7bonqyq9j8mpdv00cvpw24ldb5s1l0fd148hc0n505qxjebvhe0anggo54ciq5b9qpjvcarxrpqubqmsu1kh0b1tjicgcpiecolw6okslf6yruqw37xddr6dxxabglsmy5i2cpdv296gzb2tfhifueacp4zgx4czthb3idibzu77m86vyjwetfgh5xb17zwoxlbrj6xzmj6oe6jd15gkrnzekm9qbxzvz286e06s4zj931fea2ydawv7z6mm0viv0qlp2',
                fileSchema: 'evbupoabzl9mwubj05s34h4dovphfo1byk1b7p0dm6hajonzmutdahhwodokh7ae649zlleap725lgpho13gxmocl834tly3rjp8bmkyl1rgvi7laf9l0tlpeh47nya6z6g0cpxux77zjxd9ug55n90v068mdid9jzqhn1596be63x75dxl6pxboszy90r4nebnxbnbuoy1iiif9gff7dkiav8jed0e7qplpc7az1iinqbxpk2ypuak9ttr4o15zstap8k6kfcw1zk0xsgc8pavars661w505iefm2jugglkrnschpjy445asoed1f1u9s4p6lwxftfa8k5ksk7w53w7rn759rev3b4zpcukl2uettzg5esuw5nl86934nea4tcxxlz6uzo04akrdku8xkxadmwn6yyhbr2pd0bzsda2dw9wknk21be91i54p2svlpizacyaigk3soxr7bcc9qr3z5wofvd0em5f8jsrzq96we1ejskt1yisz7h1qwobrmauwhz9alxohe7dp48q2eghltylx46bap0bjaqc9u08m1y5487j08n0l0lu5v79kefykdvygasg6gsc5q8sgb833t34o9xlg0tjh12qvbizad36m13xv7qebwhawpt4mpfuool1u2c60dg4aezj1mq1nnb4jnjgvak5u9z58toc70hhp84xjfxo6js2jl4dma2784wgwvh8qu6s08u0wtst8re29w1vv844on3kt2t74vvxde3ei059104kdykbc3hw6uvvcvtk04cdykuynsttchz53z5sn93zekegbr309jrpg8esb4skg73ge15vwlv06l8ggd321cqqg3v95lbr7wb9713617yhf6dmtwuzfuzuhvv4k8kqpxp9l7pzhuvnomcbu9qbet9yru4lnh5ggbw766wja93vz49xemo7z5vh8ldb25rkycjdmyf5opcprnb5hhwp0tlo4n2svdrxaydtyqvh7ptv9nktx1p62rka1fppthddr577yqta',
                proxyHost: 'mhif5s9me308fks3fnvmhylggeqj3kc4qcvpoyqpu7vfk8qd26eyig03n4f2',
                proxyPort: 9718051662,
                destination: '5vjde6ogqs9duvdx7y416051t5i0yhh9hve5n38wilwcc6tfyh36xgza7m4tdomrjjcv2zrkrbef5t2kvyu11anvr0e0buaf11k1fioxxc6odymacuxg4184ulj0gixtvg05cy9awjsgwvajrcy9fp8o4tgflbdm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0gvr5trlc953gk460jupnp2z4ay4j811hhkai7cwtcbou887msp7t761p7ehsxih58rcu4tulen8i8jzh0jp3u0gxmzqz6a5x3fvieyd9odcm9f4t9uaweftab8sl4ee94sgmo2dbmmtm5fdr9ch85pflabjgqjn',
                responsibleUserAccountName: 'zkcpk5gfawnpqgizklj5',
                lastChangeUserAccount: 'xfrh599wn41rklaw9hed',
                lastChangedAt: '2020-07-31 04:38:30',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'dqybwwjiyzlz4l6683wro1apl2352qlujtl6ynnk',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'u48azzrkan1096zi9h7bin8mc9ud10jjhibwq34edpfyw50rqf',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'zfiz0ktpnxpzdk2nn0lx',
                party: 'khj1w4z39iynwyecs32ch26ziw2e6yswjnx74y547di50ao6s8g85w9urc5ztru6jr80xmz7h6yi9xug922kjcjb8lhgrgbkwrdbho3ql5luadwn8txuqd972x2dqu8x2laci5kzkhf9qncbrpwvmxg7untpy2q2',
                component: 'f4k6dg5cki1hw16k4iej9m96i88w4tct6gpsthkgiwdg1bcpvu4lfbmrajaffl2c5ba9t7xp17to8cz3nwt23abbj48j7fty0247bh6hb6cnqtgz5tqu6pp9pm87b4suiy6p03wlhid0gc32nz4xh7omyeyjprhz',
                name: '13yotmd0v1351j4i6gawjwjc4tovzir88cfpyftva4qwmqcs7orbezac387gr8zaypjce3u4ecbuxajh0lofykgrxbxwz2tjz9fdb1j8jcgtc26e1lf7jol1mlutuzmg3q9xyyos3rikawnjipuhktihdwfxrrva',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'df9wt3tmwtxvhugncvuxz73q1uwdv2l1g5n9ee0wjyfynascwwq0mrn70wzamkcj5g46rmm3d0q2a0w3d3un5lqt546vjh43q3jsgpsxs6kw3oikf5kyjwrym4te0lru6zalzyeor1g7i4fh0z92poq0s6a9fsoi',
                
                flowInterfaceName: 'hhghs1rj34v8ux81kj9iw5iucki33d9perdecx1yia41yn906pjecj649fatlzr230khy78cj82ywb71aptgh68abmvmoil2nkj1mg8lf3w3occstpdgv63d1dxltb6ow96fanuybyfbktm37guparpunzk1bluz',
                flowInterfaceNamespace: '1kl06nin0koy0037d63egf15kjrm5ou52qk2m5syz423rtupagssyx4max624ojcz9anf4cakub2borq46ldqcztfgnbpjecv7458x5dg5w7mftkjj18re3k02h49xj2ctylaa3oy826uboh8oz96j25zamkze8s',
                version: 'sylfpym0dhn202e3hbj9',
                adapterType: 'ex64eaf2w4mbqcy8vsoo4k8pjvi440px68ri9m7pj3px9mgdyknba9y50rrv',
                direction: 'SENDER',
                transportProtocol: 'vreg0bzzwd6xc7djbtrnnh7bxh868qiijg6xsq2uxvln1xi818qctig06mv9',
                messageProtocol: 'quneqaxjrew2nfrxmx700ecy9i21s16cvx6do5knrato2tubfecheo7gal81',
                adapterEngineName: 'amltuytsai64zyesqfndah23mz5caknejji81lxp5thh9tz360b68kofrul6a5nsv4ioxzokrkmeod7i7cuyj0xaqvhe6bjeqbwoz7omorgogcxoc2h6yn4ynrnkozij2vyk1xmg14meq60vk2e1zfjvu8qcdo01',
                url: '9xeyl0bh9jji4x0vqk99fz38z0wchja5g6rmsi687llhige3xpmluy89yodk1yf2moa0ynp8fetryf9trc8xeb7vf5xgofjdg88yclb9047kanja7ejvsddxs89ay9em1jelcudbuu9vuixwcnl43f30yodqzcu9z9byt55faj6st34srb01r8rgpc30yagmn8q8zvimuj98a9kolm93bolt6jv4170k2z8j51m9n5sb0vfaxkug597ltg269299cu81te8nyd82zeyq2uw0qwsb8tgavxfa1kyhiw7tnad307vs05ltef1nviaocmok',
                username: 'modhwgtj2cvnagn4mmag3u6j8m3zx5fwphsezax9kj7jrvvgrv5a4xp2ppqx',
                remoteHost: 'nioeugovi92m1h3bmc2146y5bofyb87r20k9tsabel68qkbomjqtt4ojrzdy394kny67b13tq42hp0zzin7zr49vehag0wipx8h36ax5hjdnugak4wtu4ushq575sj9mbwhynz09urcy0qaramugfbaa1k9ii4bw',
                remotePort: 8216980699,
                directory: 'e793otitamakgpxwhixzkvgxhpcgpelb8uy0cx4esq4hworiu4wrwyas2g9e42gya79mg9bdaptx0ev3xchzj4gmoxshi2de6r6l23huxhene2r3126htsvr8bjiv31jzahax3c729f5e9nsydof6i3dl2o4gmc34k4qocvgdndv0eu08h33ysqjhcxnnfj4bayhsuvhvmqr3ny428u3gl20vev7x16j3yx8nkh0z0josh4geqf5cmtn83z555uv45h29yrt713k1szgrhk9sbi16wtfdi48y2rac9wsdadr25m3dvi15u0i80zb6ulpir9gpohapcmb315gxfrck5xugs5rfy0kqm08nc0hnca5jvuxztkg3gqy1u8p3hhsj6xo6ih3n7jx11kj5m6zawtffuma77054w2q6i466bkynfqyqu4ja251ynuw5a8egy5txitqrl6jik1kg91q3arql5pd3u97x532xztn69a5travlkbtoi4vw9puoyhxgkrp96etc64w824w7dpem1gwajruvuai0cclfpv3qg3axe0rc2chpr0irab1d7c01h8jcm2hv9mh596gzy6cvpf33695l3ntvi6jdtg8ah7xpmc2pzcdyycmpkywwv1rvd0nua20sgnor8jdlt97xvs2b1jo4u56plcaq4ja3jc2289q2a0shr07jn9vrggfye6s3eu2h39q5i4665hfeur503zsuh0j4zcjr32ljm2h3ootrf1u3qvp49q2qzn551ku0tkzex5n5lhxqmjg6uos7y88fjerhzraxi6oqhgw63wzc50s5d1ld5xke1g1ax48lnf0rjt6yb6g6n1tjfm220xpbdb6g4eaastpjcdwitnkn5gugrl70fhd6uh6uw0lvdvfs85yc1xk06cvime33i4jded1ix0w0agn8wxqwoev6jmfbhsfsixwe4zonn56wlwmgf64u616273diuo1qu3d3eag87au4mb69smwz5pux4339xt1bm3fqcia',
                fileSchema: 'savapbsobup322lvxhs97k5emrvofz3x4ui61x9q8szvasrker0es39hrltsnf1vjzhzj8kiqu57qspqpcvo7kar28qra5m7xes0xc633vabjc3exvngupyfifkxq2pcz6ajzgjxa1lkzhs0cdt8owy93znb6hxahwhg860zemc0h9bub1c2wtqhzswlmxbv2g3qgx5dzsk92qot8aava7kv7vfszljfz5hs83xcepqvqkyqkpwpl25b83f799wb4105d4mbusppvmp2masx9rj50p1fju4vogas68uwe490vxffz05ti2u35wvqef5xgmj0lnktp7xvwq2mvejp7774bfvkrz6mx45ls9djr91q43kla39acyku1ypo8rzvlk2pn1ev96egxyf7845le02s6peauoitwg3j2bglwyos6o0bijt6n6zlu1w1uwoaheyxgsdv60qa7a1amgsl0t2y29vey344ffwig1u7wrlv104ac7tq9idon4pqutyzaecxz17zp6obx9hm0mf0c538ttuf3cusl9h0y4em1wi68s75xzwe04ky69qjjrzujvbbwbmik40pacth8sk5meepk9uciyv7rav09wqzjawzfwzrpd62hd4h6cg8k61sdug6txvi14k9ok66gbslsrppv890j75m185yuemn0atty0jqr77wzhhq85o4a5yb76dw15jcr48chhbearabv4f6fl755jg0g3qp4hd6w5xkofnh03wzeq33mbq5ch501nykjy2gjv47egzf25voco0j4ru7gdp163sse7toy1l2ag8dve9vzvlfodbwizzzuxskxaadkurxout3j9qv22hr06xhrtx7ogv8uv3mh52sgdv3jh8wnbbsw4lhh0wb53fga5yp35wh9nj9t5zdgctv0jmn1l14qwvrz5jlhc70sxfyg15yfwnogxb3rodko4j03d9zy3q61hnbl063bepbzt8aby33kutj2vbgmh6eal8une8o6mljox9ftpcr',
                proxyHost: 'wbt5hdea4xqxhfzhuimb9hwsjhr751t6pgt8cvwmunfblgr287lz9ifur5nx',
                proxyPort: 7884506401,
                destination: 'x7f4j24y4esy4uwvd0n184c1tdss6hrz0h3n4tlc94c8r57wr4bb0d3d16bxm77g4xlpqu3sx61gyhaegwnyltypo5igody2qov0a56mcam5bxph97z7w2fguf0wyeznpqjoa9ef1h897lxv9adujhknjfw67l43',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '09969htdfoxgu02rtul9m7aff2swd6k80pf6q4pnbhnxxuku0yy8pd5q35e3y05dwhv5dainebllkofbuif204rsa1vkxkgvyoaaprbkvnojxli3rh1aj9gamoc99b4v7iocr60t3az7rcuqkgqi0396686t7ojo',
                responsibleUserAccountName: 'fi3y9qar3ptwgl9cnzik',
                lastChangeUserAccount: '3dr964rhl7whk1qy31v9',
                lastChangedAt: '2020-07-31 05:58:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '3l42d2mgehf4q374hc1ws88ducgsy5pxnvss3nvt',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'uh6lez6a76xc4r84djyqc5a8534faqco9mjxlx0d2f9rj3n6zb',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '9x27xot74wz4vdpi7bsc',
                party: '1wa5hlwb2dfkhkwjbbf31civx96zqng3erudwesahbjkxb1g9owk151dg3cttf48pi40zauio1ii40v5z3rqq8sin1rn79n106b749q502eys916eudnnd2hietpigl1r6lgdl1rsbaw99xnxqs5wulb9qy1i1fs',
                component: 'sjcl9d3khgdqukt20ccdmlrpqff16etilat7ghtmrt94xa6agmcq0wqjs5pcrq22t096afwn0ykzg2a3nyq2c37uvmd4b67pktrfzmw2mlmggutjo659ywv4zzybcdb7j6h2iz2cshear10iun5i0p3erq8m5cz8',
                name: 'j9dulz7htzeie1wb293jjtlpr51vg0uzpfqi9xbmvr780mccuikzv5ailrvkkt3fdbf8elfj09jorc6dldrla8vqeb2olobgry19or6oegnf63rtscbgaht507b7na9jzk89tqeifjeprnm27gug1fob0tys0wi6',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'astyajsekzsjvtng5uskuh2snrumrftvy15u5amy0ezj4ggl4s8tw8s2pb5avxlglf0zwqgfesuqa59uphgisb6ltzu66zwltwucim5oyjfo37vuzg7vempcvra1i4io2ql5ecaixolrro391cmt5u9idgdmv2or',
                flowComponent: 'zyb08fq2eczmma6rzkva57x24yh2nrvl7ghsme9klu1d8j6r06en5yj6uutsyg8fo1va9m1hkjrtwqe9jz965mm4sjunom2wgi8xo7j6dw1wcbstoke1x0jp5y0p3h8sjf2bh0xu2dv53lu3t5bm3t8pyr8pwt9y',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'mzj815j70tmzujizzx70ra05bha7v56xq5rd68oifuw4xcybe3qlhs1g8reabtou7na4up6030sny9od8tu7caoxlh904jioubw1sfjfyl54rf62k8nn9371cn1h1mjdj04ute72pmv4x9k9z6edylvsewr2z25b',
                version: 'dysbmpukduivvbza2e8a',
                adapterType: 'qdlfhd8rp2q3i1fi95ldat54ll99h4t6z0evtx2eo12n5wtgxjkfw97zb18w',
                direction: 'RECEIVER',
                transportProtocol: 'm7fp0y3sgsyrxopxp8dgwf6znb3ohaezvrtzzstr4onwfv2slfo5chzzyjvy',
                messageProtocol: 'oktqactqksbqhbf8i2pii61fbjs9b6uyg14gsdkmf15hfu7sxviizuqb0pnb',
                adapterEngineName: '3c5uqlsfuab2ahwwzvpq5iwsdd2i81dq94vpgbdzxbdhc7bo0z3taf26d7x1gnbk70eazqp3oe8fi8zc9y79o7ji744vu6kumxqlg62w8wobz3r3sje9625xpff1zr6l79rc19f7kakrugfjkhniofk2217o7g17',
                url: '08e8uttv227dd0ad1d8k0rp186v11wvn52z7ymbnpgz2f009qlfpgl6vpcvu4lu5jf6o2xeobvxrzq53r85a6tz38ni5yq42jodyi703kzbcqmo3jy1b24xi6zwb5zluaavrvly6xfouys9vxhycdzjdylv52j1owo7t8yl3gftjfrtwh5c3xybgua1so9p0mubm04m55gnav1yfw0kuwzpwag0p5o1i1z009beofy1h9ymo7tppybx11dtw5t4jg30yalxl43ho4mufv1xtopggu5yaon7q13qsne5hrzv9q9xolp1z00631lvcjh0w',
                username: '9ykxhult5gks0u9nswpu5busspsqnnkciza0l6u8ijia887kfltnvkgukg41',
                remoteHost: '5xq0iqj20pchhhdmi6mlfm5e3i4ysw8h25llwns7exitndtpsau41bxkhbp5m0xhtgz30ewsxmkwla5rdzv3eh88599jdmt98wx2zwvx5t2ss27srhdrtjvoehqfmsm7kx2i2gpcl1uv3848szru52kmhf6x1qi9',
                remotePort: 2558041153,
                directory: 'xrzie8xebrypv4pkn96xvfw1jn2xz0mcx2go2c8sd82nxtq1b9vipqrr0yfv1vxqq45n87k5iq313im25x96jfltn45ta0h1nj07y7vj0iuvdt7o3ptvsqzeokvep5nl90kspcyrhfjukhk1c0boke4jui1mw7c61fmcq3g38jastrxe6uwdf5agqon94q978gwilwbgvbo08ss23abethmnsx9opxivab5kn97vcofqa7f4fwium8ffy70994ss048v9y2bye7jb5k8gdmymsb8v7kt3io5n78w8bsbydimcahd0kbwb7n1vzs2ccervgrluogqemnhk5ol842gx9nk45np3aomjym0av5td4oomlkndke5zrv2bhbkpoptz9i70r7e83iwaixu5gpnd80bjsdi1s97uxmsvgvicpo1u45e2bt9d79x1jr0jfvq91dt4kvsc0xu04sotpzwwlom4l50i7vbgewnlgtb1j8oqbbbfpny860hs8b9xfo24g7bmrsswnktxmwb3kmj9wfaajuyfiahc12r4y525jdb8m6ipwe51ymsrdp1to3e8vrjvfextjlbtvedhrhjqfl700i603iqsgvsbna7ao2e761zm14r6lq0fmba2mew2qwm79lmzq11ic1u0wrwbnh3xxq5xebiickferd6yk8vq2qrdpbz1epvd37fkbw1ibj5f4yjjlyqbg12naxs67dv9ae0b5b59r748an8hvkbhy7xlevptdygco0at7qs0ouz0ysd8ylms9e16kjpdwy6iycansdibyqj8ka0ykl7zpr577jt18idzwfxdsywcxcas9j9otzphva6y5cnojzu52wnwxo2sqlvaw0qeb3pee6ovg4n3tn6elxi4x9rktuewwu7b7bjf13detqou63l1xs3etfakzsvh2nwlv9h54kvljbazlwbpkq1upt9s8w11bn0vsbnbov4zk0vo2ittw46rx3lvd99179js1tvq0zvffkrwrghhjmpiixo',
                fileSchema: 'vo7q7phhovinfmqlcvhcpouhpj1adxtk1tey39gtm23p1k3jhstfy5o0v3jrhdydyw3stlgb1725er8kuehwf2kmi1hux4aakhxc8pzt4sjyxa41igw4sjl5xzuun83vj6zbjaauwnv5ghyp0n2bd6okq44ipoodr5syo6l7vetum65ehs07d46w1idi3pkw18jfbd6rztng4jlem5qzrh8xjlgpuhhggz9k9fh5upprqmvydkqcku5yanst18s7tax689dj7i3lui7iwrhuhkf3j7k0jv9pwsi0d61676h7xpjg5uwzpacsrhtpd5cyf82j5mx5sztwy30ab1fwwu0d5y228292pm9oa8filk3qb08yf7mvqilao7gzfnlkgewmky3qfvc7utwr2tsjej4sq8jkf0wjknixcysr7erwzp3wf2ksq12qz4ry1oesmtgpk1pztwyx1va7qv4huc3c01l0ax0r4u0iw78kjgy3q1gq1ieh33ruuocu90cclp799jp23hkmfhqq5uv2ixqon9moc903au8a3fjj24r0rssw8m73yhx10xbobh7xyoqcidaeochy5b6jx4ehlrgmulsd65pxl5e9xzlib5l81n9pkwbcgmk8fs3lt9brrfwta5jjy7s9ykvr8q44ijjcbi2btnsdcj1bt87q22cgdiuxb3cw42a4erhxmrpip3iihiybni4nb1wdjay4wci3429bdayt7fo52fgx37mcjgmhf13kav4sb5kcg5tsn0dnnanrxug205fyod0jl2rmkciz6xjlxlw5nkigzxgqtduyyr0u2vg4yedh6o8bstsl8okmqbxypozjmy4xgxwfa3x8jzzl8sudp79ifldvrp9ogc0a8u3wy28iwgldxhrnp2r7xvm0bk7nwha06db5eu3sybw2crzszigz5x4avmouf7js7o5v2arq9btqu3kqa7qbv2pf1gxb267ujuvuxe45noia7wajjh6rf2bashur1jb7ks11jdfo5f38',
                proxyHost: '692lhknfr84zubkf4lgmt6yuvjmqdg9cw1o62rwdstllz93ub0cp6ben3p86',
                proxyPort: 7911486887,
                destination: 'r7xv8ir33pm52jb8ly303f0v9igdig2payvt3y05p2ku6mngtq0ug5x3okxel9dojfxhwpki9tkbft9gjpt5h3hshjv7q3zctskq3qganxr2qv1otr484cgxi5z8p7h4d41dgz8vecl5losu0nn0k5zh6il2uqra',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zivxen892smvtyoflwnjfvc92cabrhzio8v0efx065gwytbwskgqqch59fyegisk1zdohlk6g2ufrw95qeieikeyvmh95pbpt0pkcgw5c7mj6r67m40zm8kd0g1l0ro8xl545g2voju3iqtel1auxn7b7v2ktsfo',
                responsibleUserAccountName: 'chftp6d396ix7nwzvyfv',
                lastChangeUserAccount: 's9b6ijgg9qmr42loigmu',
                lastChangedAt: '2020-07-31 04:22:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '9mjr2a1r6hmbw6em9cap5uenjszj12to1env4h8a',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'aq9xcqdnfuz4q176udz3yo9cgz8srdn1d34h8elky7yszrfli2',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '7qhoffzkw6bgdx6bmg3t',
                party: 'mhak5xswvtz8h5j2ot9t9f36up0kpfc2gg78ur71bq5d3ymbilc1lsqh7vhql44sqvtktl8cs14jzd2ffs8abwp4mjw3hqz0ts941aiueozr6jynphni91lsos735rbc2zbaxur63q1d4w464oblndbokmf63eq9',
                component: 'wtw1uc6tko9su9gx2f7ra2au31z56wulf19j60gsukyqhrgmucihut4dy9248hz7wub3weghuywhrex77rgwwiomg6tk58chjlku83tvjykbep6b4p40wkvaj59wsspxa2cid7dflvb5vuxskn6we3fq9py7yaol',
                name: '0wlbkwf6f68e39jxlmodvilrv2v4i7zi8pyznk0jo9piaesr0dp3fa5ztgzc3s5wnuzqsmhqiuyke1hzxe3cepyno4ka20khwqaxlu8j6ixnldtz5l1fnk8hq76b46ardb7skacl7r4zp0nyihhuieo4efehrjns',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'ks43h568rizxfz1e69eur2tnau3o5r7p0mspo0u4nmnzxqtbkoa24m8cpkiwc3lljvcu8fkhbgguhcl8lix2edia1tlhcq8w0ag66f5su3zpxkapsdjkdm1sfsgaqctvlke8hh541mu8rqz56ae47sahdxb3mg9k',
                flowComponent: '6impnxewswv9vdkvq2opuyp1llmd9vaa4cjnd5tyusjoc39lyurhbwn9yj0isuwfyff5wm0pmq13yoxqm20tpii51p2001xkdlcuxa3fes4ufiu4wk1qrgbcfuqu4wuzqammatca77fh067hsi0h889rllkrs229',
                
                flowInterfaceNamespace: '6hvtfpotjhhg6x131kilij1czqplug1xsu3d0uu6nly8hc2uajuif8ybw447vgd6wi54zc5czdvs6xfjn02dusz76fxzhi3pj67mqjj1hmz4t2e3soecgls4u1p43msx5584td5asoder2mv9zd5655b0jr50oiv',
                version: 'n1q3ugz93q9qfyi3cld8',
                adapterType: 'lyh3f109dd9fo7ccrz803f5sfjydc4usfi5nnu9wvut5aaarrzjgy0r0tmkr',
                direction: 'SENDER',
                transportProtocol: 'ezrlex51kpjl0biji3dotfvaz64k6z68vuukx996dq2xac578dka8hdzoco8',
                messageProtocol: '60ps77752nqxd1gv4go90qm8ofd45ut04pexnsh6a2pao23vh1l4fn41xzi2',
                adapterEngineName: 'boolsvs7xmvxlqsf6odn6p172kyo0tlt5usroqip86t2z4f3pqjbikh58zg2q4o5gimtzd9qj72fyrt2a8geusxo7p2hjxllaibb3ckgwndb3kyi78kve5m043ud94d5z70xyp4eq2kuvngupp4mn5m2i889h0jx',
                url: 'slb42fvqjmdg3p218k6isumovjoc0snvdsfsv6e812c4a05qhzr6ey6u2x0fmpfcfpun0jj7la8asnc9tqzgmqb986v7ies7gd6yv797fp8gbhcixh7hdm3b8llnjbnc26rd6yu4qak7wr12du66fvljlel01oocpk39d4gxbl46922vo6t6eqfo3iod9pl9snsn6u16ft18io53kp0v30so8uni6dzsalb4bqxucom1n7w9olpm42tozwk8mpz3edzct864w3f3hrqantw9enuks0vzvhigd1t84q71za6jb1l6vwgro5pihrj0q4tk',
                username: 'orwywd8cm1gjzwzb9ef40nvxrise80tllcxv28q8u9pfxzngb11jhiu7jig9',
                remoteHost: 'ulyssc6xuk0vrntrnkx10d047g8kf55r2078jz5nrwidlinixm5e88x2787cccdz2zptidy94skixb6c99vi8zq8vsnoshwcnttq6lihyk0ga3htdgu7p2yr5hr1yldqa2ct0ss0erpsjiq83rsq1thdwkkl365k',
                remotePort: 3325638466,
                directory: '5qjb7qe2nvfmkgncusp2u7f7s4aonnzk0vb4a8o1i2gszhex2i5l4hw0h0mehlgnmgg02w3ljggkiuocnfxu96jn1zwozdqguuzhtvtzvu6yr9a0z8r887syt6fhq0y8ci4phkcx28i3sy99dj0l0812xrk5rsbdjhl9p4h558hismtpa68h0cr6wiakdz5htqzmzka37gour2nhpunvpgbugwoz2phjchwjdz6sppv25oy53mq780ls2529yxmplrb7nbbgqtpqhxqwj0mmnbqoosppz5jt4te1lbmcxwczbbjy80ax6jb38y9nhtrk8gqn4prus3ehbne3l5lgd2wu8tdwdeief6vlnlauwvo9h8rx5jfm7zodi9g49x0e8me4a691wq7dz4xmgl761evhx3cyzq96sj6x7tohrhly1igxy4vutt3dy2nf5h291163jk392q8ai20pqas42o3qvsv0nwbso85zca7q13609l2kh4r3s7k5uyfpddk4irfw9zjc48a46njdrfzbvq9c8hqj6uby8jcbixfzveh9teayv4ojhchpnafqxizsp4o4oz8y229sf327hkf4zxkdm81xlz37bpmhx8hgqkcqyybsaqm3wovyhku61pk79x7hdykta7kd0avbn5q43culv18xzxx00cz7wugeytbimtw76u9she06g2q0ui5yyylm0k6qva9ytwj8fw5jzp8xrxa6q2lhzgefk8fjs7qqvdd1m7qynuow63tubvr9rbjba32u7ffexae4zpysdrjzhardvgybr8qwuoxzqq4k85c15zkzpp8877kvh114vt427wrt9viisfj05y7deomx9hytxwck1hr2jt7bxpzpvf8lv30i4di62ov7o9v3ezti2bj6r5mi9hin88zcifpi6pnv5kbq9hxqt3mxvegq8o1jp3xxw0jkb8h2cmegkhjouy03g6v5dvyqlkjsw9z7s0lu2wvy0z10lq46d057w91xiqngtkplfbrzv7xj',
                fileSchema: 'ctppe1swcgc4q1n19re54gafc7upu8duntsnrxr8f766rqurxs19pm89lsjsmoobg0l8fle918oeat9dzflw2cldvxiw6g39p30ppi93fxva1w16u1zz36pmzopc6yjvnllumgeo34911wvt7avd0ofk24fqfnmigf160jty2hrzakecc32ahs07iyvfm3k13l8ra18io66099slulc374antxlmkh2hd8ewmv3d3m5xlc9e881ej84s0vs5jrpx0fixgtc267e4qpvzuywtzcjzkwh06y37brvueyjqa4g0vhvhbpy728p4odxmbzqm9ztu3wzvms0u35z34mla9izf4auxi68067r7obze9146xemtghykfn15zfjbgj5nmuwx8mna9j90hljsrqxc8se6tav26jyxdps6af8d7d4iem32cb6vksl9it1ixi2qvpm0trh2vctulkv5x2uo39123l7q66dmuvm1gpo7piwwdtt5sjxmog1nbd3c6lkem4ht8qy385fosbt2gr7l4fr21yst32xwaycjn1kxlsitzmxc8aymukjcx7kc8wykljhsclc9cvpo7swy8f9yxaitb16rc67caq9vew1lm86mkxtthus55j79uw3iswgw60lgx1jn6c0m2ekmdtqx99frjl9yyyi01svu42ckgxkry37028uv8djagwuf5choq58ycnp02nor9z9nhlu8egolno03js31sckrufzy7ysrmnurty2a6tkatzyqop87so0ywhhim6io80qz7jl6svevvd2hmiug9n8t74fw8vm2eumsox3hrq423x18hlhw30b2icdj8rtjtp8fyzfhbs57qwpcdpgg09boki9qb6m9v80usqblpv703gs0cziwsv64vhp76si9ul90jz7fq7antjcq53qzrbmx9w2xc06jluagokb3cegttag7tt5gj9auxes185w1amfjcvr8fyg69qntq0ua9verdlaagawiuoj0j4ixrn3mw54mklia',
                proxyHost: 'amt4caan4iro5lkq066x7j7ghpk78wd4mb8s3oryh2hfuispkk6y638yui4k',
                proxyPort: 2723220688,
                destination: '1ur1wjmlw8xjh560fa13gqe1gjkjuhygrfnynburl3hr0381khgd46fekfgbqeptuuwu2uixx049tz18s00p3kcjpg8qckwfcfkxa8vpexd1touwxyv6a3s9sjko0z7071u9xttmzkol68u89xj9jpai8q28mfwo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'sro9w95w3tqt5hjxh763g31ppzbk6hqm3bhkjy3nhohi7g5tbsrlshffl9w8w18hsxbdozvz9y0xixfcx5og923fy0d35bm578acgvej8fh293nf40zg9z5dvhhgb0o0bsgfru25e96osq2a35uakewaskf7sgu9',
                responsibleUserAccountName: '3vxtp6rgxanlijxsrj6c',
                lastChangeUserAccount: '9bpcymbicnb7knvmo6cn',
                lastChangedAt: '2020-07-31 00:32:29',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'vegnil1g2thy8r5hp7vtioq7croq686fyuhqq2al',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '4ol1kkma3mfvym2rmx7ovo5slq9vnig4ckqngv89h8ig5w6lz6',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '1udgn3oyakjwzelm0zhf',
                party: 'txr6t2do5t8wbqx0k5eqpxsawtj6z1erwod5rzfzkf4ie7bxjevjdr8eeawzttd3149o4de9q7lm86oenkqlnjsr3y076kgtptdykql8hb1dcgxc8ardnyy620jhreeg0okrbc6hy5twckicaoqzscwe3cpff2up',
                component: 'zo1fjyoiba4z0o8x45qb6fax74qxu9ywnbubwt0bxz0yl55tatvv6m8ma5b84oz0ahh74m6j8jv3mv1zxowqrbegc5kcswoavlog8vg5m8kw93r6as059ihiqlsohmzyvkg25w7k3j4kc98nu86zf7lnygadvo07',
                name: '163dno6z6v9le8ewl1p3dvom2xsymqq38vcmg9cv9ratgo6vo1ps4xlxqdmn9et0e97pre3fap3ebhemb4sq557tsav5j84rrlv36xmjq564o31q5duogc5oajhz4ggen53xaari2ajtpqp35keute84q15aj7fe',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'rkmmk07irpxq0nn88ht6zp1apuncj1nat0qphoia0ddw8w5rbgbp1ptq4i9n3enlitdmud3ez0d7kuazw8dcyv2v55d17fn4ezhvco9lnkgjmu8n8uul5eob8tatxd8xk3kmnaukyfk6cko9s5ao36dvmp5z3y2t',
                flowComponent: 'byat3q0wc2f0qqjrical08o0zvuwkbfzp9pg3g7w03dofztxkaos074t75kdq8q4rru756br7e9agcglp968318tow6do7xixv8zaysmy8nzy8vfmv7qg4wds9kcqagf3p1abq3hizkyh3kjbp2we17769b17ty3',
                flowInterfaceName: 'lnekb3zasvnuan02j5hyemxmi9y364bvbtgirbt04ye3coxsf01lvux9l0ep8vbw80hoo3f5acofk0ktv4sw8enmdvixsk2h69h7f4atknyz6t4uasiqqa6xp0miug1wb2dnr4d6nlm9pprns7a3zvlz9obzn5sf',
                flowInterfaceNamespace: null,
                version: 'p5rdmchhy00hg71x12ul',
                adapterType: 'kwuvwzab918e3n3ns19elyl2dz7hl7wioidjc1eoned510y5vtntgrdwannx',
                direction: 'SENDER',
                transportProtocol: '7o5zsejt68r4iv8co4pcufnj0ujqxouw6m2acuzhn5udlpfzcbsthwko3od4',
                messageProtocol: 'gk14nwmpwioy470zoggr1l769zl1yya365ogdzrazgwvp690xtqrynkk9477',
                adapterEngineName: 'jc6is9tq90peswd4tlyem4jnhder7gqt0g4no7p6iz1cy9dizo0lnnzohgaxp17gsztm2eotirxlz6zw4znkxn8t26cocgucl6d37rmditcli5divocplv6afdycq0ce3s38d3smyvwg2s117w74s9pw6s61kb4l',
                url: 'o2a9ot52byyy8czrgrvu5tamky1jnn6okv513cb4b5v5zqmj7ral7pf63dnl2cz7j4ysdd5vnvzhcwkkvlogu27td31pgb822th5yl167sd9q1xyo0ztdagq76koqbrpejx9fk0yqkcnb7wwtki1ceqipigqtpip1pvylkhb4l2zi1bpz3zrn7mqymgis1aa0xy9x4mkq4hk5gcckl3n6slqkdz51wo49cmj96szoiiij461p9jg8strnx4f84d4zkwo4yhl0lvdx1j8yzdkwkzolemld092s7ryyo1hgigmuqrgna9iou344dnefx7z',
                username: 'yjcp97m96n953uuo4jiyfxxirmulfyn1652u3oprgdxgy00qb16p7j9o685g',
                remoteHost: 'otrfif8fsugmmea7857bbmv0ew6jpz4qes3lui409kzd3spgmftmy0fbd6khmzyuyddfz9a1vn3jnsqgvxhma3qrji5ksfd1990rneugpntdosna4icwghcagmp817x8fixdsm7iaae99b8s3a28gcbpwbfxvi52',
                remotePort: 2932794275,
                directory: '6d135zlo42tv4s1mtu78ikz57p2hrwpagdaz8no9zk4ba1t9l5eobeqn559gyywbafv05gug1wys0hi3bbbcfqa8y6pkg7wdofr8y6uvwzgwb456kljpcwaegm57hf4taycggrkv6a9ujfejgevfnligs71bqhvhniww43diih2te378otkv41vcw301z3f03ldeiuktd4vra6e6b7olj773xdngvpcq3cfp11n1gdw9bq6br9zgvkrkstlenmz9vawp8qprrulw0fs67icdh7lhteaco7vgsfswoxnwkr0lhvyvtrr8azgue36w00u228zx1ntj1ru8p1cokgg61plu395ho3buwrxhj3n0pgktofunrfqn774gkcvzpnfvxwkqeypdw04ggds2ezb1xvuezotgbjdfx1k1811w42csslkwrfzdmmob2zc4aey17x9vbd49gb198pwwhc5kxosnip0xp49dos4b7h98p4re9conkg2vyhiwtweg2ckusukosxh3vbsmn8tyrjt2hp7nuwjxis789i878636ike57msqw24uf3gdaru59duzm4o87m6z6m4uajkvkzbcmggwq9tymfuhuawbld8b9sag8k323vl4oh5mishmy3uhpfko6iudp9tqq89f343xbi8c6jqkrirpl8k4czw2uuin4vvp4rhs0va1xjcoeg2aiodf6pbg5lb4op828x712zn30uqeeh2nv6m1uqskz8nah5rpdqx88q8duwhroiuxk8rh3vtm8a1bvlplgcgq9rg0jwn346narmv5i899lasx3td8b8rkcqqzte50qon8jvh1bzdt0re994c7jficz6bdu3bimwolfak40z6gr523ue5bo7d2yh6v5lneuxoo75zv1vidcot7bsblbfu0zt401e57gzqxrpbt0c9e78ut6h1dxz4gktr4y7du5s3jczdn1cu5s0yw3xxehetfjjex7kxnytqc30gv163wjexzk3yhmwf2c3t2x5iui8ru',
                fileSchema: 'nv2st5xgm6x2hnq2mv7bg8svrdf6jeosm6kxdav3i0brtzte53x0iuujydzbfigd8nrre5l2fjdlpz3h33panzsuimxcrdqgpanfs6nj2ioiwods7yb58o6ej7ecg6h6bsddtggy4jrcta9zy8klkq35azje8hg71bq6n4epudk2o8l6rv4b1ko3nfwumkdexk0fosizgnthhsmesieovsi1w01e3esl19z3r9617w6ule6pfmhoiz38rwxk9nq5d6a6pq74lun20stu2j8yond5z44k29d1clhgyi1ckdliyrt69i7r3pprobangmuz570qkatbjz8pmj36cmkv2lcalejdbayb9kxl5ljimr5kv5180ur40t27bkxoacoauueda7wjkwfwlf5mae0s5pjgoolg33ajfsl2nosbozu2x44uso82girtar9dmlyxle0e9ip915u0xtt2b4zeha7p56y6w3vjadzftw4r0w9fm7auee6gqtjn8txfu1re8urk5us789r9sqgr91mwajt09sa76ldiaqfljwo970bol6mr4f29uoiew7v4b16vh7olc6go2ppratlrdalbezelpn1gs37o77rkwvu1kav6uflxdedq06mbl4m2lorepd2cp9mci68y5qxddkfuv8rcpmx8y6yjlgo82ioxo8vncwt83y10q16tpuovb2ejl5sgxf9keuymk3gdxwkli5mp3ctaeaftbdx2z5gbntdion5f43e8zjo8wtmcjhdhzhwq45tjwumx8xwrnehjewehl81kclukgq5tb1jtdltgabzebm4539f86armeu2jebwfawh9w1we7kcbwxe135diib9133ssgmpmxh4elv5h8efgkizjpldu1dp7l1efunrljkk3d63xtn1jlmavytwzegxfs045hbcnh1z1ys8q6ygq67j0um6e0j9fiwyj6l2zybwo31xyx3mz5nd1qgmzkh746o36wy3sqzgu61ia0xspw3v6zpifpi6msbi0',
                proxyHost: 'h1nb9innoy24qgdz50u5p0xblpkynxzjahi6oj73a3mbmp3omswjd0q4qx40',
                proxyPort: 5536968628,
                destination: 'mceovv664ub56la7mg13jw8g4vn7mjcexx9p3iwr4qwgrh8v43syyu4teta17986o9ujscf4v5ajp1zs252jk11hpi2mwxyfmox8w8vhrodjt96envn84gv7zikyia0degaaiwwf3v5pfmvusonax3k2f5ohrsa3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ud33ducuocwpkf05j1j9ng1991dwzcavq4hbxn36el7m4xk8ayu31pbj6br7lj6nh9myd63tnk9rievnt4hvmwedc7r1d1xmtiaoom9k799l30xwqhupxh2dlmouht6bx45xlv2o1k2d4npv2ocohfsgo36slvcd',
                responsibleUserAccountName: 'rz5tw9339d181p6tnizr',
                lastChangeUserAccount: 'axqccy5g8qdokmgjiykz',
                lastChangedAt: '2020-07-30 15:22:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '41kmkdnf1vw098mpgb4csgx65zg7635iw734ni4v',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'fw657x8a0l1olcluwgpujr3vtaq7kt5jij4k8godg4l3o7bnfb',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'et204m5l70qt100b71gg',
                party: 'ognc7yyi89wdfw7atlzzybk51hwwcb1e6ydq4z6fhlwh7wj5pdoz4kwjhlzvrq41138xv7cm3lcq41cqzuuzt6lm1eabm345m5x2yaexjbmpq7tfum357x9k9vlu6d0778bn7hvotmwkaclwppcjix4f6n3q0a1y',
                component: 'llnzodgicm4f29jf2grayfcijnaquw6n06grh2zlcailvetkc8xfgatifezrds3zmaaisvtgkdjr4l7iup1cdi3h6k01nus2kh1fyjvfqhrkj1f2akgb8oss41bgfscj7bumkl7t5rgzsns8wkutkaeellhlhr4i',
                name: 'n3mjz34naabadfb5kkc2t7qewonwrzch4bwktsm1uypeha5lpa8w97ji9892ua09fa54kc054x826w31ep4tv4ca0nkwlj16s94edhvsiufogto1vu5tyf0lu8p766uksddutyhamlo07x1ip1zau97teysuiaei',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '9mvw3ru55h31s00r67wrb1vdk4x0ab9dce580sexv1yr2ga6fxrm5a1w8oysnw9kjd91wsjm1p1lmnklgsq6hvv229i5k2xrod0ireiysioxye467e4agieriu2mkbaa46b08sinmuyxncshcxxc554cfes3iera',
                flowComponent: 'e5k985louw6efei4hqo6milzs43zfp9pkczaxnkvks4swkv7rknn2d3gl74x1hbca95ud0zu6hhurxg5t2mdpwu1vz2qhnfz5algne7cvcncdyi18vaz4v8p0m0yje77tfqdv2sgklm4okl965awy2nx5ai52kkq',
                flowInterfaceName: 'adc4pljq6wx3ccf7v1ldrq3htav3ctr3nefuojumqrde8ifyfw06upgq3qat377x744pxvbnwkm211k2dztgq3l0ox77e48goy7lvtzkjx7yqznx41jfg5r9fhaiq59krualnt9afgqtouv5ph2plwaeu70g3mmr',
                
                version: 'v6pqbz5bx6mqhjgm8umz',
                adapterType: 'byic9vkfuknifabbpugp6sa8p4jwsvratmvntij1b09wffh3flk7212fgc97',
                direction: 'RECEIVER',
                transportProtocol: '29nelrexnscdwop3sannqm8ynnra8tw8rolry50u8bwf83c5o70te6zi87e3',
                messageProtocol: 'nlmfrmgbtt9nwvdob2ezyibppox05r48wsanotalzznd4giuf37thzc87u4p',
                adapterEngineName: 'vcjxr1z4rvxdpozrglmxqnbaucgyrw35yok4hibmj7r0q9nddl83g56xrs8z6tmbs60a9h2axlajzaibgmamw98hb1kvn38lqu5o73wgs0skfa3ispn1jc4v8eqy48cgl8luuzc2zxbdnjzfug5of05j7gorvwo9',
                url: 'jiocwax1fsp6zia4t78lf129r39wzfw6rldcmwhh989op7jr2ckppv6gw04agsqdv7deealvyyqgxvm8fekd3sq5tbmlfcduilrnhz7tket9pc0d54glw7lpxd9ftfs5rghrimnrvy0exk92vo0e7h4acxhpp15f5jduohxfppyhfn6vg5cm96hiz9oxo7pg9y0182axkaxahuwcpndxqtx8petzzof9vo3ng3k2vtmvlj7ikoj1lv8y00b10cdznb464z8kx7oq2iufo01vuo0xxefmjea7hci4vh4daljv5dgq9al0glq6zltfspud',
                username: '17pdrb0wyxjksfpxikfe3n3uxt1p823jjot0fk8x5tlu5uncpm2fs2ev7k6h',
                remoteHost: '85t6b9orohfrcdkjn5992halfdviyc0n3tj99q2ha0zcpkxjk6lltyn13wxjnbvjd572f8pc98xe8wk1loxe5m8bg2o9njxw0od4byovvm8vxvb58fhybhfke3vqizutl0ysry0w4niq5y9g13gsfn8vjjeya650',
                remotePort: 7520373729,
                directory: 'bxy3fag8567lyg6ewgsgsteku3jb9jss7phaebky6gapjyd06kozitmm2ztteq435i7xcdtd20jup45gd9v5ulpaj0iaijorlp00mltwskbalyeuoxfg9i0pdize4rkmh2dii152lsyxug60al4ys4pf242f5uzl8nyetd0wr2k2hu644mmarg6ouqbbyq742oz06z1z18vvwiwgztnus1yiy14azya7ow022fjfyr9eu11aoipc14ouuijondr4p8uujd8wr7a6760havy29yyb120vnjb023idgwf77u4790c9s4zkj3drkh7jbhzgkh8pffvzm55gzwjax2028i2f9x29wa6rqc1m9tv2r7kfsrdtq68dqida6dmker1zv6nnzmhlwngs045bky2lbm1ec9t686bsyq9wk5i5i0vfkzsrpnhuc90ppq390hdk84brzx8apx9p5mqybe2wn1n9anna61rdbrua4sg7yp8gzg700wv6qxat2viiw99xcq1rku4pcui703qtcoap6u57tr14baeeq28kwawyrvvivqcz2prj8e4eoyjsvd9l8rioovkw53ftsoykb29tojlglcv0qb1wr3cm8egolzpha34b9tems6cikakr6il7kpb775597n1elktq0wiorlv0rf1cf1cc4f9maqlu807dfy4kpdk2oeyqlxrllh0xpfpf4r8pmd2sn6jb1qcs4kyc069q5yhtfv0x60hiraow5710btp0x2nsjdwkbfiebee5vq4vl2mfh54864g1sdkncwkwqvqd79op3fofa0lk1ean8grf72xyszmnuj6f3lt39ugf47ggf14rxywzkp0ahgwq4bwacbk5wq86rar540k7ccuxzkeo9lzay0t1nvc59m4jv7jfj4svx5m2axqeh28djfku9hol5e4nyn7s44prvldu0hbk7c23exnsufuve609j8da1wyiil02q2afdapmybcsmcbplus07hzhqgubmnqc67pnr77el116',
                fileSchema: 'a5knxbyod4cu5jcdh82ixzdysnumoxgi2btz2nia1x7x7sau33m1fynpobjpset9jy4weh9xvxtmlwg9jgrafg68xurcg6boz287yaho05ts1wzoc2qiiiovr3zum74nuz68iow3393gcq55ifex7vixfd0ukfjheqr0pd0xomh07mf73juesfwoi596sgfhdmoevg37gpz7s1ni0y3fktymr3241w8v7a432z1uob7f63rw6phz247g7v7dduqk374fk6bck3j0o17m886iwddlb8a5cwp4cvgk0nfqhs6e1wa6jzaluh4sg5c2568h86m1nruyri1qeec5nspyqv8tehnuqyxs2zqohvr7fylmf3yj3wgyqosgoe5kb5eybb86fxugoh0gljd4on3e3ljbapvrjj0u117yfqn27nhnu5817zahkc9yhsa09rj9hdlp1j89k73glfk8oj1lt2qslrdphbczjhpk4ith2wmpyqdvpxa65fprlmx9o4ocni8rp4oybxgiyudqutnk09few1aqgjrew5hduqhx6xj4enpeeqit4z1jogqego7wcdn3wrjtw9uf2jkrpx45rlo2qlxo392plzmksd6pz4prk7nssigg0sxfb5tox9im2yj718squwqsoeh5imp4rdbm8bgi20pyhxu2dcyxyaheo4cer6suexy59zz6sve1cip68d4plpcy6s8mo49ck7wsdl2lkp4iymwgl0uhyabuubxpmm1ubwvrbm4hs3fx287abmv1wfjy8ryddx8gwy4r26b5ktgwsrqlqwx0bk5qz0n4qaztaecvwia3ohhas6a0iw0a9r03ssqet2demd660ptwf0ffbxndxr8ueb4pssdjx8jmy7pigol9w8s0vizh9eogmo9lkslpw4h0ks8ngm7ebsnnca6xl49xajwurer8dsoaxcz31pgm8a7t7dgyws9f9a5suox2ovccyhgz7ou1aykviqjipfgjr96juiqsozytj0bcro4h9bnn',
                proxyHost: 'v4h07mdgyntkjje2hsiv2puwp1ne35g9rbw4lgn6edolyehr09uc8x6xnukc',
                proxyPort: 5455528422,
                destination: '23qrx7k4fyz801bbqqc2gs58wna2yb2p6tf2z9poagcl1nkmdji62nhdbiw0wn71jb6iqyx5r66hgaqstynfl6letzxx8y9ytj0a4mpzuu1uyq9n80bxmzveerlcrqj24lrj7uv8eisykf7yd0pcupiqw3mnhul3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bqbu1ftqh6foc6cqbbxuhnx6p0kcrnqx00dy9c9gwk5bovquh7ozbpil97lib6td77sfgpbt9qym0amkd45lj38pxqvbso8khp6xlq1ctbhuogrmk2sg3lhcconoz3ngfvapo6psrbw5lmai0nm183prjn6jaesj',
                responsibleUserAccountName: 'm2t9h9i94q31cp1aphes',
                lastChangeUserAccount: '2b2e8c4q43loiv3akgiw',
                lastChangedAt: '2020-07-30 23:52:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'jmzfzweh80r03n9i2j2tf99bexdh46ethh4zxpqb',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'jfa1dbc32ehjcxl0rh54c01un8hynbbgc5111svazz1num1qcw',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'p0fcl7tosymii5z2vdyh',
                party: 'zcxa2q2tmz5sw6i9p6wzqyxgli62r86ifwue5y21pcnq9b8dkzxfcxl4di0kk70oazvucggdfav4mb7hylkdokk9hp6fqq0ci5elqq5ai9eebtqyryclb6q5igb9jm3fti174r9vzcts3h7uol0d2ootk6ed9ozi',
                component: '6c9gbbezyqhb3mxok32bik3p129k4v9gmbhiznffk4t8699afrvxslo3neqqffqggzz2hs8zf7r4wvo8ep47g2yk64sduxwcs9ch4sn5dgvwi8f6l5zd2gw9xqal0vk7i999opi2ct9z9h5prmve48i3c77vcs8j',
                name: 'n83x7godqjgc0w5ah2b1dnff3thjwd9qn1rxv1j8cjva8uiv1emgz86pcf51ks8949r2om6r42ir5405fu86ujvkoboyc76pc7p3ddfdx9hamoj96ed83v2h2qotiluqnu3ql8sphr8sq9d10bvtfi6qp9eeaob6',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '3ghgi66iylh60y0jnsxhlgn1bpb1dfzztf52ryig7aje48xx87ckqzoylj9lyq6srpwacrota1csk1ymie28y9shabqiuukpcatns3f3d744r3g4ub1q9g2lkuyu3hr3nzlbd7jyayyfwd44bmrolibtsyt828x3',
                flowComponent: 'md71i2cvct9gumrrsxpazfynrqsa7nkqdi2qy2njrh1n6zt0qc1sy1k4u9k4x3h1h98cq58xog7kbckpyffbehjlj3kzh0aqmd23sryyr45mraarqcyetc7t1rb4g31likcsqwzgv2mmhjh2zkv6l643rtzuiwu8',
                flowInterfaceName: 'q7512xz3nhiu7pjaxky2uyuxni5p44vktuie953mrwgehe7jf74m9cgiqpdnoqpbdg3892drhci3vyonp5gkl07rwitu0j2nelvm0kz2f99xfwjb0kbbuhwp3cve6d78ij78akhi9mejc9t0x3vntxf84wtjsbvt',
                flowInterfaceNamespace: 'a0cfmudp02fsloaa1pfcr18ixywleh3ir7nghmlxviuufke9sbu95jsytiziwcphle3eifo2xb8vpynpluobffrgww3jncy5fpvr187cxujnlx6pnk53eo8t2mzymtezees47ym3b52bzzzpzcjs0sjsfoz1w53y',
                version: null,
                adapterType: 'laf799go6o86g7nvljdjec51cuhgbdyav52cbixqjwyjvgugl4my3jg2111z',
                direction: 'SENDER',
                transportProtocol: 'p7kstt7l3n2ymzhm2sbvafwidfv0tut0v1xwcndu4kkpmhlm07sujvlnkfzt',
                messageProtocol: 'i73aqqde2twrnqshmeiatrsuycvmk1i2fswk41qfdeoso9ceeiwx4yk9ueft',
                adapterEngineName: 'lefykg8k11iw6b6d6dcbqlc60xtpk8au1vcxnspzye1cvwryj6c5xa8j9jw2b1wm4cek4sgc3kdik4l4kkmrvw8fn1pt87i56tb4vxth1j4kjof7ng9kxq2u4df2ri68yxg34c8su9c2z7e9tfvfzhe8dt75ii2c',
                url: '7f4a1dai67pi8hbvy3nkpbvdvzg3vcblppbcz3uqpr6kou06ikb13k55jm9b289ljk0oqi042btnp2jpt3etx6xfv0wiac4hs3doq6z83j1db164al3kqw3x2neltiw3xkqhb3ecp6e0frq9xe3nevyesmt1byq1hp6oemytz0cppbih6gfo050mywe254bzzbms1ehr5eqq49h8xobfuubqkqfyb306suq8p50m4y6lojtoi5pvmydvk4qforse33oeo8dbjxeaa84z9ciazdmvdbqdx04mr3j8xv32dgxrzi61msrj4vgzcv5hrhyx',
                username: '5pjjyyo5pkxxfrywioserm1acxioxxl2nf8lt13xox2vkhxnjx603c4thmnn',
                remoteHost: 'q3ydbwarba0g5qva4ukolh9zq48np4fr46uavcy4ba7wiu9ng6i7yu5q9kg4jf0tkjckbkfq5jeomc16m0r1kntricrpq9zyzd95ejax8au3427f63gguy30uwlqn8h55ag6df7yxpbz6cmfd5y640eh6wil3pqo',
                remotePort: 3054593213,
                directory: 'yycujpvundit57nb505d6hhwof1uosx6fnmsv1k4qmi20ubqscjosen9zwdqe0zxmy3483ckzrr70p4uts24jaqxpf868ftq5lqc4uix5kiiv599kcl9ju1nskjdu59mccscgfxahpi1j9da18qs3gg5jmiwz6ye3o5pjltm4aftgrglngo1h13gacqpc8turfyplgwnq5wh7kwlh6dgmphxe8zmaav6y6oy7lhcjtxitqimkqi7ewo764s0xgc9eqyjgc8bc93cgi4f247jkmaxds68vsts85ce4knnm6djxxyk4nn4wz9yjh4du7zlmzrxxsqisfzud6ak7oabnd2yb8unra3stnhbqkcc4pz8vplcm62y03kifo6lfs42t4m3yxmsqajg1381oenl2iside4wj5qglhzargsnffy25uzy8zxs3rfbwx4j2ui5i0szspjdxy6hi8nqi7sukcha6qfcj3acqzy129dcahetajurcezn88edhmhhslsspgzj5e7gjoe3a4xryhn0eyf8wg9pi2kqw8svp0kk88drqclz1geyo4oora91n83tssetk6wgko1x3fgl2y2x9mc4jny9yfwr9uqg3k5dip2f2os0vk0pkxkuiu726wlsqzo25fte3zz3x0pt9cey720ylc2g90sc7ff8wycpp0qyq3du3hrxcb3gaku8s0n1wilhmrhcu0m0bro50orzjwh0urymfm9c9rcafg0m9qmgiium5bgls9lcvulcby9eccwydnm9zemme4m2b5pg9e4y208e70ivt0t12u0lp0itowmsyrmozzkajqknfuh33dd4wog24c1dnkr2iwrwkphslngn8kqu6prbk5p068pub7rwrfg3lm2kc0pkooi0lvkjx86flag3lxnrdsq6ki71n2kpa1e5avi9nry2oyp8kwbvquf92iz8hy4ck0sah333mwxki6dlgvy47yhttejkj2p0kgy4sfjbhrj12pl3jerv6zjb9jwi6wlx3c0k',
                fileSchema: '5rb0wvcpjz4wsfntuv08vwauwlojrkx8o16ubsxjel8gjha2uekft21mwnxerlj0xg81xkefb87jxl5i053fj965j37696tl3eeetcy6p1l9di403760pwknhep4atvgyib36xqldutcdy0pt1kl8z1vl05o3jm1r2wzdxb4ktrnnl3tsunnxdrc148qb5wbvygj3u74o6h1nnntct1bp0qn60tuy2q7vr8qj6y3xzgy1djlde60vddcyk6cdx1q5hodtivwe6uqv4a5ptypuxb3v84r6njh1mlraayom75l3vmm08c8pghimvi3o5xdlfarc54g7du9knvo5wbcm408kpsbx6t1jupy4ugagmk9kd49dkpl5qce8us21tmqil47yxtikjfvjmpplo1cedg2plshgdzliiwidnyottxlp6zhjuwcumjkwz61bg1qa3y4ldutytbkq2w5t9omuwk9zbksft5643mub7u84vnlhja0svt80byoo0ptsx8yw6q6t2yyerrlwleilrn3uxjs0e90a9upy73or75o733lk5c0su5e6l1kzv025lo6s71hypdmzyf4nm7i24w6y8yvegrdk47hstt4qw7e0urxho9y75gzmt6km421ba1h0q423sn7nvupkysq0ek84uwapw0pj1hhds3wm57fc2l9iztemjg33zy7sq81njwtjrsn6dhjtk0owh1ta25xep68s30b2erm5kr1iks1jqt880ufmdtncs35n34wxp9wcm6n13f42su8h63kymdl11g16bm2al4vts3j8qml44yey32mpaupgacznaa3fux6dr70daw2n61fyeegot6mt7lw1zotgomal3ajd2vfoy3i7sqlrubipa91ysnjsawykvgcbju2g8s4cr5rmfa7radl3iyoprv4nmpghrrdrxwb4l3n72ytwo47z83jr9hydg5jq9zwb06uy782rfim2ala9pki3vcnr8ecfr7lg80crgaygqhm9n65vyelnwqy',
                proxyHost: '55bltxd65mkvyk7xht25polt4441w8qcwwv9n0ogk22sw9i58xfm1v7qjwwr',
                proxyPort: 5459352331,
                destination: 'nu1kwuev2ketrywayl4smw4rrc21ov1qw2tqty1qs5k29r5jgcgptlc4p37pxg7ufl9ut6rqwizdobwa39rha9o2s0mudahsfvh74a3j65n5odo7y4y7916qusopstxmhudy4alfp5mmo12ngelk4ptv5ta8s4jg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'l3y8pgbt9mmlvr6l2t2zr9et0g7gwhbnnp6h1oedylmrd9rhqc0ygpp6uaxg3495xbazjeyq4a2ot0wrlwhfxgt1zc0qquu9xu7xiqlm9wa0fwnewu5livzmygc2yzcc5tzz8npswx8a6zhppn5wktyecmf8orh5',
                responsibleUserAccountName: 'khf3vk3lhsjtj5nx056n',
                lastChangeUserAccount: 'vqz1gl2ek85hikwcc2ej',
                lastChangedAt: '2020-07-31 04:57:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '7xeu1s7kcjxiazg35hcsiifo3uu8co3l1tav59wm',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '3udytaglnykag4a6b3ee46n0nignpd5t7yji1d3ptd65k53cwo',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'cpv5oqkgwp577fwgqzj2',
                party: 'i3x65hciwn48ii3ahgxp07ozvtc8t2dkmajhm2niiey60jz1xfihbrep6w2lyv4pdzf74epujyuuob3xq2846mz8r43ysa5dcgc37y22uhf7spzj81ty5ywtvr7m3qu0ftbwq9qawcov2ika8qq4ep43bpwwlavt',
                component: 'h4dwibhgdawlqcrfsqxpn8gawcyt1rd00i7efarseab0u5u8k4v3czze8zr5kwtcxo3yacof4sdr0r16nav2f3gem0lb9su6z79uncwolwidg2yps1z80oskwd51l73o14rbzm9qmiqwzljju5w1fq7517alp4hm',
                name: 'gwkk6jvefkpfmw6m4hnfl0natpm5jndk93nfwho3v8n7d93r08xqkdyqghee1hqwm7kojckpjcdi0xhie11huygdpabkqf0cwacufpkndyryoyc4v3t64z6bvgiqo0qrtqnkgl87029x11cauc02vzdgwuyu6xu5',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'yvrfdn4kvz9jswzy9uwv4qs25mozcz4q68ogsnnznwey009jwc8g7pjyeis3ll749nyiafc0dd38b5otapt6qm7nre50pjrly96v8z69qjbjzemoxekwtqazg3k36ucum32ppbrrlwgdikfo97689sq167cktwhq',
                flowComponent: 'l2hpvnc38gjczj2zng84uthgzb8971a95vz5low4zgb5tjn671q71005nebasjg99bmz7ua3tbgmhmsk66za3jpu8tc9citv6kdloj1b77da6eh7gyv1b5mu368fh957otdnu2zo8p9dwh566ifgwy95xokrpyd3',
                flowInterfaceName: 'ap554d34v677kymq2mm7njhfvlyocrmr2su34v3lmuaufkogvv5yyy9pzw2adju53nxisi0spfh9rmrxw42db4v1gtfqyk2f7jltcl9mqsfkozv2rg8ambv492nkfwyu9hwb8pl69ak9yfimsi3itg917rdhnyji',
                flowInterfaceNamespace: 'y59ply74h1uuqysx1d9knx71ral256p64cd2f7vcfeiu6enzzzp7qgjw0u4j6gh7ug80q7yarmpd68funftmzvtb3rajhejitkskknxrhstp7n3xg7hzm9e89fvlm4v1qvlui18st3jurwvi2tsa39injp9h299f',
                
                adapterType: 'gvbz6nt1oehu8d00sqrlsk1lgg2gph2zkcahwvzn7u7j9c7qkfrx6ylyos8h',
                direction: 'RECEIVER',
                transportProtocol: 'pypvz1cxikjyh755p8b1ecbmq0zfcr5x35rwryyr476c90ebvy0b1ke5i12p',
                messageProtocol: 'joe7938np6c4uysf5c3q41f8en521norq5p0xvfvd1aalfam9ep05tbfbizm',
                adapterEngineName: 'c31prumdjfhjp3zdqytkjvw3jijfg5q8qjr8rrs6uqf9cdrn3y4eir8pctth3h30z1ekidzt7jmxi7hhcu0czbu62fz5w5ymfe184orwfqqnthdjgtouj38l5wj8cyvam7mana7m7gdny17ysb34l4yt94yi9acf',
                url: 'tidc4puaeaid4l6z6df3nxmrisixibk7au5xmnc6iwx2kqypb5i4o160ax2xtyizmcsuk3tyxyybvuc0qhr4tomb2f67nmunamwbkjr8kzzhvg69d1lfim1nvkoaqbwnixe23uopwiy7nutwxl49l3kqbplbcepluh6zyncau43soxyit53kecqcb37karyl4l9cevpkc4jbxp2nzc3uqr7uel9kt3bporlfzw0d7nlyrq0udrklnaislvcu8lb91zcowku3mry3ot9m1qnus2gc9shym645uk53994h6fofdbsoatrzmu3nx8rj2122',
                username: 'jw33gwz8uyivnpexm470etrkezfw6z5m7cv5017h90mp1ph0a8o9v3sdeiwp',
                remoteHost: 'xp3ekkbf94buj8oqp5yire94lebvf2pg3vhjg8yufugmcu57t2y70a02al70khocrz9p7zbm6b0moqhcwdnki3qsm2ggepkschmef7ozu9sv03jplc8gu51o4alzb40lxb19r7rxddo3and9x53f2iuip9oind5g',
                remotePort: 9682602552,
                directory: 't5is9owlxozz5f0pd0wzwyxdn83xo2namkieyoal1xvxrxyi5ahwujni15sgan5fqfq1trfqyav62gjxiwkr8duk052b3xnde9c65b1jyvzxrdgm9sylt50eoq7njov48k54ei1vzm49k6dkorst0xqw76xgcq8p2963hnagh48us3ln8g1mgnin8jqaazd17pdtavtsu1h1s16tapfpwxcdw4qpzx6c9omxsb4swa8905dg8ios303pb9s37mjb45cy3rz9pds3bn110dzoigf7jjtechz9pd4zxvxvm9saarlg8rb6taos5u9lyctguucqssnf55javvqt2oxzz13f070glhqigirdmawwd9rqokrhqwd83awtj7y3encweeqs7hak0kwbmhbk3pnqoqrwg3tqv7ddvxffgz215881t3t5pys26p0mnaaq870g6dmn1jqz4k92qcceo7wdxxw83ei701cuh9c7sums5nd0imb3nnw7rbzfem5lf1d8inbcwhnqjzk4c9aovpqbx623xllx9q4s1tdrti8gfooxxqzftxffivbrel1rkj1xayh2v4v8x4r7kqrgsakvgfxtnxnf8hrkfhybc5m9kckt5py9iguwlipv5ju022p24e75zd8hhtj4z5s7dzz8zao6tucyxvpiox86ig4cb1wmn8y3ilfd81cg3gt4x87swtm4i6nycsz92izij3lz1p4gktv8i8ingbdxqms75ggnf5puswxxqy7yzlt1ixuqc8e9oi5xp0izd1qqk13xz8oqpxmiomda985slvn1r34jhefg81mb6kofpoy6tx95hkifmbn99cc3fj2r6xjtd3qftvzyyso3ugts77vgscau8lwdlgjjz2o8xm04az1uy2hy4wr7fq73cy4ar2cysyifyf3hhgszulogky2bulx5uw6fe3b73lebhjy4x6vcpwbp4p4prg6k6v0r56r1pf7ufi0wufz3jgauzn6hvwscnl5w2altdlxk9r4y9mo9',
                fileSchema: '4dcpqtls7sn9p8qccjwprh7lm1zghy0tyvzpmrdfuy2d1pb3r7xa1md9g6qipoucw2b1x1taaj5joyaj4shy3tq3anifefbdy25f90blcu4svjflfw160btjskp5mqhhquwyibhat455tbgxq5i8dbgtf0vn2h6z3j0y8hxnarfdlnb7iod12laywdxoh49d9xvpetmld9cjrc0xazk9wv6mlj7n980d5r6acn4tvs4kevxxtwptjvrhpbcoi7w01ovdhjnuob6mnvcguf0u53b1h9m5nbqgnji8t0gnqy52cbwp0c85utbnx8wm4z715e9w1dyee3lch0lyiakc6uzsm91dv8k0lyo1srcs4fq9o73sz2u3uu2mdblrj724ty6c2pqu5eqmkbnkhdwdq8qqo61itnrxns3fuur741bf84rw1djssaydcmey2sjqf2d43yb7hxuzco9tlaedn7dlz0uun4jyxg5kukeqibuch0976yxinhf66h8rwfvpnar5bxbpbq8dslq4s376h0jszph609m9zgfv9ivolgr0g9vxrn230br5y9m0iyp1fmsvpbhvecc8l1zv2gulvdvhfom37r9p7g9rhis5srqiki8mnmr8sx4tm43of9xq3eit6ghlph6l1z9dhq5h2jl02vwjq3i4epacovqyjobjh4volrtu798ydollrkpsloe6bz7q9fnzblpktln2xcs4ifo8sbljma437oscpz1jiydan71duj0gnyfxqd3safp73vvtkcqrdom9pa6gjnkpskk5konv0d5yadua1ag7uwn4r5s2j1vxpsfngz241l1kx4anvt32szie6fr1mr6t1fu77e8r3r5sqevahispj410zy5u54ripax2660urepytiq3yl0ygh51lv6r28apqkw9hhcwv4sjxpsnxp4hpdc0tuz0rbic7wlpqcdw6mem43hrfm1zv7fmboakgpe8a0cschyyztiodm5fmb1lc93doadmagdla6wn6ee0',
                proxyHost: 's8pfp2yaxqkn0k7jvtsnv0f46lnwd1p49fhb86szzdz8opjy0xdcdd6nrfn5',
                proxyPort: 6052841914,
                destination: '5w45gy565u6q15o0r76oah34elx5eeycxy39ehy6scgr4u4zrzb6rh0eq3o1w9i8ojs2u5oqb7mv1u4dck1ix6txyrtljnqdf6wlg1ji6e8rulbbg13o3mwop3mpjvde1kc8yj7qu0en15jesj4vvnb6t0ow4kpf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'iba96pn6kej4utlroqz780dvvjhyd55mnbzkoklnlgms8cxgi3z443vg6l912wrx9890bcc0h1wcovubqvteigi0hlbzjq0w4f18oj6ptjpvtcosxd43lqobhtpmiow8o5u5tf40tdst9xw85h6pmstp75bix7e1',
                responsibleUserAccountName: 'uoc8d2lgz35pdjo3aort',
                lastChangeUserAccount: 'b93cq5wg9agel0dy7uqc',
                lastChangedAt: '2020-07-30 17:59:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '55qgt71g7fmqfofgx1wg2b6tdhivjgkieze04q96',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'kgr2xo4m8pmoqb40ck5rgz2s81zqyhduxd4pcnish06aswcdsp',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '24rphhpepnpwvm6bwikd',
                party: '1xar7eny616z96frjfu80jzkjkb7lk9gdyd1smdfb7x29yep3ovjfe075rsm9xe5f422abkeytnrn13vpoc67pmr4zzoy4sws2wbo6f44zdw7xaahkmzocv1ggns5moncb0tb1yrg4g9xpv33q2iksiuvgqxzhgt',
                component: '4zgzkap20hcoe4p3xnpizwoo9oa46tiadh2vbkq7yr1ewu3vmiu9w0theq09vsfenf5io7cw13z43f2nlbgadla3z4kd5z4a6qm54cekzpm9ouh23cixmmnkplb3g4txlhhdgj3nd233qdsalzwwan6fjbscvptt',
                name: 'k64hj2kfx1w86n6gqeoozlox8x3frwbzixfqz85omcp7jtjvu5ic2jby3ss5bo71q5rdi4akj31z8180np7hyomk8xai60xo6xb0i98ay36bf4gcmu1psurlws5xcb748lmv8om6476rgbrf507ss4ojj1njmvoh',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'pvop8g05xve4qv7wqscii2ceszcdn0r2psko7hhknj0vp5326ymn85m5bdin8ggq5x3aysci6c3ik3hr0o16r7kri5pz78q0hq82omqhphdszswroyllykgn9kcd18ya8mqa0tcizxlbnf9mveiw8pz8vdyowvmd',
                flowComponent: 'rqinfm6j9huu6qfhmazgiuy563wjb2o1s3nnkfsmwt6os2c8hut7l46kciwliuut9bsxd933z3iymu74i7ms1j9vk3h7zxsxpp5qdj7pecybah9tainids5i3hbyfh12y71keephyop9bdv60tgdefep0krjo2du',
                flowInterfaceName: 'zyom5rn1u13t5lylkw5qdkl2xr1yx686h6j0mav1clb8d1rrjzf6jsq2ok8q8jfec8f6mgtq6xhyqbhd9f85ij1unz8n94q1bm4xcy02qtt8y83rclrpdix2hs67ejqaa6ln0j6gere57two3ppsxa1736m8ch5m',
                flowInterfaceNamespace: 'rcj97p5t53tj60mupoowxmeqqtamhz08tgx97ulpgscfvrw1idrafcknhq66652ljt2m4oo75dalc2jw3vsmnxisp35h2t0loquybbknhn1b4a6ev6g3hiudl3s5onw76ohlvwpp0a1fjvw3pkufy72t1w7otmf9',
                version: 'u2b9d2ssi4ecbi52c6wl',
                adapterType: 'ermr5h6nrsf5opmrtphqti30ybq8vexiu3pd9z6u9fmcqiqj997p6ullv859',
                direction: null,
                transportProtocol: 'fzzhoa84ati9l18fovxjjisemt48v2rfxwvc3rgnjsqqbvay5z7xf3i2dive',
                messageProtocol: 'h4w2aeakwrfn76pa2g2r0tafl14vgq6kfhan3a12g5tw5ombgo3i84qbh8k7',
                adapterEngineName: 'g09wg3wqxaey425htzsf1ewh9svkieolggo0c20m2heya6wk2fyljg2cc7hmkeuc2fr3dc0ku7ckpn3j9cgd2twisl3h7y2y6okd0oeu0pxnibun6tqj1uynm1f86e6ojctj76z1mdip3uzsj3li2a8edj3a59oj',
                url: '4jyq2z23ut9v77ropbhbt0fz7nh6n7wa66dmv9m2a3h6hb92iochllmbokapgw5cuqhfn1pnahr3z620nsflq1fxxxmejlbtfndy75r3vrob1n93qx3xyt3042gwi8kv7lmc3cdctsqh7fk90lpbht164x6t0h05cx4k4cqhkweqtqb9vgf7nrn7h838gc7l035osi6fbnxolzvenfwz9vi8m2tpos89sec6cd6tb2y41wvmmlsxk1diqoipx003qukzk7dj8haxhuu9ycztpdpl9met93ldhdoa9i7lx9ceq0j6vgdl6jkuhrcfq1rv',
                username: 'joaljksyfs0lvjtc498iwdncyprx3vstv04gfh90a8m9zplc744nkni1l5tw',
                remoteHost: 'zyanc671236laecy20k1ia6a2azshps4p0qhrin09obkdewncwy0xpux2zrwhwfd7egyhbtnlh5fbb26wnwn5ete03bipbk2j2iinhuhjz48onx5jicnc49bave97wtvsuuakogb2fflmgwfwrr0kh9xgk022ji3',
                remotePort: 9094415946,
                directory: '278csadgwvu8kae1ciukqkxg59q4l6o31otw1w2irpdgctuk9ics8hcsdaf03luzl1grccv4f6hequfeyqdftitkp01y6u1jjh56uys1u0p1szs0hn49uhktbfggpsfyuue65pliiqmxttly4o58z5ibpagqvvpeyb5guhxqqrghers92cgrohjv4tbmre9sf6926588s0czisof44aqhjjuvs7nj4qc5e99qdtg203w4a0z15ygo0pith3aaybjhdlr5bj36qdgy9s4dri9ztjmmw3myxa5uqp62jptbtxbmp7ghn1zn4199d51tbeets170w03ieiza673qdco4u82fbdgw7deu6hplak3emesz48zs1cgt7f8e9e69ci3wn0hc05zfpn29j64eokb4jc7wpgv00ovdnzm9wwkwt0r1aun0h90b5nmkp1tbdeskndd7fs51dq44g5g2n927ds22hz2htiwbaql8rs42dq4iwthpnjpkfkodldegaizjdhf301me6qzl1i2qe89ua950ym12wk2dxpttuxsrzjgissqqpx9on6pgw7b6t727hwjpzman2ah412vh69m98kyp8lnho5tur4gqplfdqoqizgmirem14n6kahnoyaqsdqdik7ie9l0uo80c3ispbecug6qc8muf4258f15cyr6ns9rq22mkqkxrddwk8qckb3oxb3vrtdm8ol5m3huh0s86nb8t26nb0hexwxc84vgh7avu5y6xwixkswqq26a70k9paabubdsy58f7wk5wwa4kcixopn8p73s5tub8qtheg9qkiqjdetl30y9zyw5rt8et39s65uvadns4htbf9tpcemoav9b75x8r6yr219c81f081eiz48mg677nzjclcxocya0ls2t3l9gck7d5m5jmzatte98rwo2o9cyqrh2fedbnvz2mk43eqbro4ot4e7ma6r20uxne3a3kc4qrnn17iundtikzpjx70qdjygyykcx0s86hp1fa5upvplk',
                fileSchema: 'wq1sxjafydham90nv0z4k6i5wwact8vytf8udfhd9hm3f6tzz32oiy3ts8jgpj53d2g5203b3vfphi66xuvni2jadmak027gfaoinq11ln1ff3s1h3r9iw7wa6nest28vuzr0qanhocumgfqbyvrzmfe6etyb8i8qss2z4cgjs9xpzr2xsvgkjlh5i9cru0gfryy0s6113bilpvn19whxhg69xl9o3mufn3phcpwqhrpqj62fpeaxn68pmq1jofhicjdig3ll5ohoz97olc8xxfyf8iix5r7u8bnbcnn1jguhbyx2ixeg5rzdoxrw83ethnogcn8nd8w1exnkcxwvivjwrdb3kwp63hubcm9cef8v0dg4qab65dsn05n7i84meg7pqaqupm8aj198ywwgjoryuaxtuuyl05fxrhn9jf8kxkpno9e1wiqb52qfyqcwdl1483k2xbzql9zh8xzrfmwimbdrwiga5974lyceuyh8989p5977l1y5qxikmftydz7w1mfldy9f3dlfpidkmyphsq8dzjbhl5ocqvfcgac7ofbgv9qrlzu7sgeu73ng1908x53rswvbaw3x0vx1jwzil3b6lun8l8u3n5t85b79o1vtr2ylvp2k44but9wax0cp5onnb67su1gxzza06ztd8ntu2kh06waoz8bore0p841o1k72og3hzaxj5s17kh74ttzfsnqamwi6i922vamytn5ph56ppmjpa5jwxbccr10c38d7u40p36xdyhmpmf3nvx8g77nl9tt48rzi5ijmdq3eli05m5gslujdgivu1l6hlo6ki4fleapnzg5bl8efju80ywdd7uwme59mwmrra4duj1neblqtyg0kkuvo7zhu0ec331xodfmzl8dxx6ii30ye3bdmvdbifkeg2gpfkd2a0qvz7gwc82u5dpo6tpjirwq1sn0fex4qubgxt9amrrlttoj289yl2pmw6tbk45bhpc80uulpqy8yhr6fczdmsag2pwf8ewzv1if',
                proxyHost: 'yhsgk4i8oe888o6sopxo78a77e7uif8oi17bjp37wfqs80xivo1wy28gvs64',
                proxyPort: 6260789801,
                destination: 'herywtl841v3c8qew83vkev8f3wz2zfb09mi72p9mv0j2kzbpnpwa1n8ynij64bj6pnxskcuic4dnjv1q3u0qkfek4e79m2bki89xt4y6sswytogyf7qc120gkfeub52jbjp1jdbg5y5l9dqp7fknf9tfeia0tll',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'juso8f7c5etro3pb7qbz48srggz459hnzp71fh9e7spgvt9r03e1axyl9r1ql5teguqvxxdeztu4h125qjmjz0m4sh90q6ni2qa31bzcyquvmr3j3c68vri6c86b45b5c9nf8pkyqxdo23e6yyt51jd7iy4fh1y4',
                responsibleUserAccountName: 'idxx2zkk3jk2zgo15tef',
                lastChangeUserAccount: 'pzyeb3gmqs3si6twevnl',
                lastChangedAt: '2020-07-31 13:33:25',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'ap84cwx6we310ubhe48uo2cwlnr19k4sz5ioc4a9',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'p4wjn5jtaaum9ooufspgylahhf4a7x34dchw3wjnechc8t6inj',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'ouveccj7c23pgivqwfpn',
                party: 'mbaykclugl62h5i8466wkt7sariisewosdgu1t1fzgi9b2b7nkeub5m9c6zmyixfe19xnf4sai14bopormgccl1aaysgtrqfstgndz1w6s6ek5utq4v4zdz7vs2iw7882kiop3segyiam0zjll0cbm4as8jp0533',
                component: 'u5tb8p1sjf2grwkbdhlwrqlubqij184xjv89d6ir5w6gjdrs5gub7fj8xyvwkuoppcym4slh81nqpom4mv1ep1q81x5r1ezi2v0ev76nw1n571i5h01atobjcktp447rkp5icao8v596exhrwj30s3l8w1x4hnsp',
                name: 'reyj6e9p0gxuo9fyefo0ikdxlub1yjl138nf1vbfu9o802xxgq2euf3ynzewxh29obi9d36og793tezjp7vq253pu32vo93vz57sn66b7ergvhqxwdcxcgkcmq4qo256pmi089cnnnnu56la0yg2ie3fwsrezhdb',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'cdtc156w5exkj7hgbgxlg5qwo2hea6ng2nmhpxmfnrzw13b8d7xh7xyijfksb1nipz25lbj29ycdz7068aixif5zdry2239b20oitwvboxk3w1zm952955lj6k4p9j3gs07mkwgc8hzsjt4042ne28bu2xqhwon3',
                flowComponent: 'aj3cfjlcb0sc9bf0xhvpk408vrjitvxiosm83xkhbb2si5epq8pwj6qjfqscgixg08gjr87usc7szlnos3jqoxif6dmy8pnvyopg9ebxblxy41jso8qjnzybz2zkgqyzwhy1t3dhwmdlgdomp1ln0ij45z4h55e9',
                flowInterfaceName: '9rcz4zj9ece1vxki1ritdb7jhp7e9itfglgq2vo6bhv116y8usirapbok8y0ml78mpfj6rsdningt1uyaycy1lwxm7sziumf0hzxy6vj0gr0bstwqpdkcvuqsmhuo6l7t1napw0xfduqrs5j9qn8nbd02qedrbn3',
                flowInterfaceNamespace: 'kukozwlxck8v1sgp8e1h2oknnb7kfv3nsr9pw64pncdm8s07scscjocwkfafmgh2yleuo95chbeuzd2bhcrgw7hw7eqphteud9qhrxzz3z81zp3fhpifbk5emeas61ngknrwhtrwlm50raga5klumrhthfjf812m',
                version: 'lx2sdri6woa2hw8mkpzi',
                adapterType: '47ccuxak0np4jpecqdstf89uuh976uqop3dec7pbi198o28s2atmman3ui9y',
                
                transportProtocol: 'uidlx55rdqgnncvumzjxqm28uupoll01i8ncfx1wwc8av4nirkfiasznngq1',
                messageProtocol: 'iiqxyquittks84b2r2sz8a5m5b6161816ih0le7754arf4ahdbj7831zol27',
                adapterEngineName: '43qdpri0u6l3iv8nvravem7776n3wa3kqe9s3wffwg7t8l5769fk66p0dvgu7lqkzcs1tg9imfxr7swolx82nci6u5ohu4ksar5pkr07jzsgabw6g17a2bevfg6y6aq61jc9zvwc9bsany014bgjn5i7qzbuyg41',
                url: '17k887antldwqndn5xt4z2wq5sw1cexj7zrpq7acrnnlpjxzc84hdinse70kvyfw52t85xoogdp0soulegjkba07xlegp6t3gr9yndx9sj49vsrbeaoytltfgmarbczibcpeen1swsls5e2cnvo9818kh4qxa68dpavhzl3viyx00mz2ive9jhfbf5meqff6cbc9hkotl7y9anynksoh4qnwnc64gcz1fsxyx8szgoqj8j853s15j0j7zc1yiear2q7v70wi50gjczc7lsf1q91vsq6bbxqkfnhtjiz7qnaqyjm894errzsy5c5hzee4',
                username: 'ntaee4kh9w9sbv92kduxhnfxowov1h86z1392cxul7gwgt93buvmk3czrrhu',
                remoteHost: 'btbff29kwl3pewzn7mukc30n4jba5n0c5tm6hh05nx0360ticl39okji276bl5eudqjvbwxsufbyl0rxrp5z8vkq0yl2lltoqljk6dl90qsx41pjyecbjac13w8bcfirfbdgl504oq46rw713crctt2fnzm8foeu',
                remotePort: 1736050088,
                directory: 'uvsny9x2s1eghjo9unmwxfygexwcvo446ltki0melr2wst4qs152x2pyb0w4vi3rd3scc6lpjyzt18uaimg4gz8quaksrj6hk5nn4gxq6b8b6ndf87ybcca29wki9fjbjg1bmge12l7z0mx34jzfbcphfx0ld1l71jlxfss03k284sykevymfniyg4ztzjnk7bdjzrecjaj4vspfyvv3w738lpov0gd60f51zr3so3rk7byvsuk5r3ecfosuhr9l8rzufe7a4gvqlzco53ya3h8kgsrzek4kfrv8bpjcfutnqb5ljxyqva0z3x4lyyzcb2boj4k807crhnpdo5kldk64j3toh2hj79ssam1kj01xc19jk0gk2nwjygyycaewuj7m57mfr0fmaqm20cohhqvpnihmg7stmfg87qui4pj52roypkxbw0cbx9um3vwbic3gx4fjyu8qxrmku2t6n2c03f62tpa2jt2tdai63p7ncz4pladtr503kptx2mq7pa7e0z229dfr699tjzc489bq3pay2k6139ikfwbbv5w4ebkv941qd1bzuftrgn14iy4mhavbohdplch7e4oryb1xywfriestgsshkev5zoqwa6ggvflgzske33rl1ybhk6fgld9t1wo3dwzvsjbb91efrpstxgn0ws626w2jbo2xj488x23f8kxx1wqua7r234o9fm3yqmofbe9cffgc3dtvyfo5xfryvztqsq092w3vmczp6javoi1p5vwc40jm9hhdnzmbqnb1dtki3xmauassynnfbid8hwjzu4s2jkktsm2celhbe50nhvty7dj77y26govr5s0i87b5h0uhzy4vvtzzjkrclz3scpbp5qpatk77koqq1exvzmrycmgzeqmpewtphtp9p0n06qlw9ymh3knzkql31isqvi60bl8fo3bemi83vktr1m5536gw4kr40pipldzyjbb01fac5m4nyhfo6maj0wzn22zbiblu0fi0eh2ehywyh1k5yo0q',
                fileSchema: 'mlmhg8d27fs8t6ueikexz1dxxvtq9fckbgj5jbzwyn7h8a1wi33a49e3hpzhxxdpq2a9bhmfkmgwnxdazwpida5gwafd2gaqth1q9als67gj244rp6kh92vl2ll2fei0lirrn07z4fhfjwlmsle3srpskvqv7cc520ac73dlxhu531khoqak5qmjg3fj0phwqqezpfm4zevi1tgjg32hj6dlpx3b3bb2adc62rsl5a8xssmh1lrle0xz65z79sfbwrqzvbpa8b01jllstngkf9g5imk5npw23sfbef3hjooaxghrgti6xgoak33vb0z8ijpmhhdkdz89gs79i2p3tixccifidj610jxl9iytjuzrpi3i062p2if98bzb1uqs6vb6u4ozcvkkuvufy2adeivu3b9bgnwf9v9ddwej7ol0xmqo6ktbxt7nns96h442wu5v0puno9fjzy2pcajs1ae2zgn0lojpsayqsqhr9gumuu840jr20wz623fj4vn4h1zppvil6h02p30jktaztg2uzhe5hl6xe7a47ptzzlkliku1qp7h285nw02ps8nm9e86vzspevsh3bhzroc70k24x426zgnuhu7c1hzz1lpzx27i4kdwyq9shxdcwel4r0ztl24xfbzrnun8n55wfqtjfyo5ag62ge4d7peyhu52i45dedh8gh91zk2532uzc5nperljybm6hkjd0bjmwkmph7cq9jlgwj3knb62q24k5huyj7a4xgp6ggpqew1ioemz5vktwucj6zh2muzvjafqoaq3fndy06dpj6w423h3g8i6z4z92rcl4yh6ul2m7djn5u6n1kcj1yprgoxas24znkwqd7fv36lk0jf7zk62lsfdrh5uqfya3dby62qb7ejerm2cp11vnnggv6u7xzl45oxfpqiatyjwpwiw7qt4fz5vpndkapo6zb5mghwziw39c4771wx2iirjzd25q7zp9t6wbsbo22s2jogf5mpj6lip6gzv6uazabcuz0dv',
                proxyHost: '44j7988xubj9o4477ajmvc5fj4oh23s08m5u9g9i516qfcmjn6b18w47fgmp',
                proxyPort: 4262495270,
                destination: '7vbpe2zh2abpp3962v5b37ouumivkdsfzma070i0ozjqnyfhuu9ihjhic998a3m53dvtf16s9a7c6pe5fk4rz1zitqiff5bx26hd7ety5he7wno42cdx4ou4wfi3xyvo63t2wo32z3r3arnvbstjwyaqzcac40jd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'basgkmhell78h3c064jh636h5err950fskipvj4h6x64g5a6eb6gdqaoed4y6m51dpwjr03arfrako48aaiblf9vk5c6zjl2n808le3gpi8hoo05nieg2x51aoqmtrs8iewt4r8sngdhwj460tnuw3ihrv0wk9uu',
                responsibleUserAccountName: 'rbp9fd662tyiwl5oqyy1',
                lastChangeUserAccount: 'o60g9r7sgql9ladlooqm',
                lastChangedAt: '2020-07-31 06:14:59',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '2wtzhzj6uy5varesbsj4jzwfnz9piqtjji4c11kg',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '1wfm4yhbk45fi0az81haw1yi5zgrvrfc2vim4m2cjpk0vl0ef5',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '34luwp34p858dah3hop4',
                party: 'bencsra3yw6ec9xf46zl03smapy05t6p4f27m2bf2g8nfy6bty96xv0bjwluzkatxzmkrw8pcj5d9adoc6do0ytlcfybugbp5369fz50lbv5nkjsbr2wy5acb3k39d1s6mt2vwtksk5xmdzl8b2luzsfzx4awsz8',
                component: '349ee9l0gkajzazuxo78pgltugm44ixskv57f3odjjktbk5zr3lhad3y8h3me9o5zs5jnjyinfq00aq93mn1k23m5tbdyc3enld11en4y40blvtrxc5sqw3iz9x94qycnukge1t2ydt3rozyfk9ya5a6je8bsgam',
                name: '8lvkdpuq42ssuupciiynr0235hu9fwiltpa8060af7e4tqcl8zikcekl28q65vqveyjt4khj113vbi0ae7n6fgct4yh0pdl02s1i6a0ndjvlvbd2vth749az3raoue3sjfzj9mpdqvhn0c7ptfmtvfiuzlhqmc5g',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'olo3tcwjjbyoo6bkehd9bs1jrr2p8urnw0g0i4u0lhccf14jm3c6m996vui2jt47wkm15w433xo23xp8shcca5er5s6ap9plt4s5mq9uxgvgplxdnfpv6ccg0lacjlgbx2it7lfjzvk30zrpym4jq2ygo3yc02fi',
                flowComponent: 'ct9zntoqlxnle1gkbjl3k8gdb7ufqfss0lavwk4uxfao2a79dvqtrhplgq2i2hxrw1us15xqjnxmvzxayv9qomneq8z9oi9qnrr0yboi78m49728jvqh6u0dkb15u2v8xvd82ahr3cpnd02yvtvyf290cqxb6rqv',
                flowInterfaceName: 'k7wpzo1158agfci0g5p9q70akmmvyego0f6k9s7yk510v12m7g9jnc3t1o4r7aubq7hwsjdiuaqmfv0vx3ts5x45x8nmxygo648x96g7s2so8aq4i07m12s1ir2bqv00xh1yd67cwxo5a3myw3zani3q3xd30bgh',
                flowInterfaceNamespace: 'j036w76win2mbtyjrawq46vhum9rwcnb7j21idh7hdfloqe2m99igdpier3lnsv4uh02xiv3mnrhm06gpa2m1wijrch1gwp3iwon1in7f30jz21j234mhp1a3tliimjzh9n7tjwlh25jzi5bqld6p9hmihntv9aq',
                version: 'n7nefy2drds1kf95cb99',
                adapterType: 'm9cvttdaa3zsamaasmqbux91l6dpug28ek448zluefj7rulomsyh3zlrb3yi',
                direction: 'RECEIVER',
                transportProtocol: 'ugtuevfyp5ruofdq8x9is21xof0crcosekql5fw088hvjn649dlqr0a02vin',
                messageProtocol: 'y2t2ni83t18326nrb8pig4splilgxqgrnwvjy45wzgxnungvbohuqc01gvdl',
                adapterEngineName: '2fbxrlirngbjqqnr0oxgltd1dt7ct1ns3by4azy0dmy1r7wzby8uxhimses9841t6iqxgo29qbccvqqm53ehjrcpdov2k3udczl0bpr5jgx15jjtdp2y31ixr8mvuc2kfyriqb1clpflvsko7oqdpdruoghletzf',
                url: 'tbdzk45cu8jsdf8u4cogm7y2zuwozy3ne5amzuyqmdpkdejjb3a90fb9g7vnte4lkg65evyw6e5sm3gt6rywnnx1dwz657ans7sfdwu0l45f24him0md8ocjhoqz0ylndzlk5yhk1ul3581gj6uvjtxgul2b9ja0kvjqqtjikhjtj7j8xemvmr7rao8slxh9so1f39vv87xqzkzupzq04fvkj8yd7c0f5zvwmafyuy2y90vbi9gg08ol88l1q8he9h2nd6f18wiaig5de3cvg8sbsqn6ru3yon38u3jm3lqek2f1bwwjyl40jtcqm9d7',
                username: 'xmualasfymtf1ooscgtpcxk3szftmj3zbdulqw2cbgmn2chi56kb880nzgnm',
                remoteHost: 'wtly8jwnre114g06nn0yb3z8rnuy8uq7kol41rtv2uuxr0ux74jywop7utylvmk1cok0p2fobi3uqgginsuktr30oblvv6bf0kts57jvktwnzmanp580nz9xiavpsllg8pke8teciybk1utflp19z07xhdoqo7d5',
                remotePort: 1756422037,
                directory: 'dqoq9xw8y6a15ltakp1ki6vrehv3044sov5gxa6ixc6q4eyhkoncjyssbjrpri3et87dbeghx8a3thzcqz47axxo0zk4koe3mtueqoemwogq61v06evv7xrdkef4gzmzqaxkfabjo13frmdk5jhach29zhr947l448c1wtwkd0ke9g7qyi2rgrw08he8tulxzyslqcl8dlmu081paz8s5xqtad9jcrkcym4bxkzibchejxd5ic3qitt0dds4oslvrfz311gjb6gxtmve1kygwalfh8xco9f4h6ivx03qoodw4pwb5f14takxfommsn2xaha66jhqw0m2plfpd0cwm9fwsr44qdvnf5fy2qsb3etms26jgburl1dkaijf0r3loe69qsoy5qtlg0hnea0ad1pxyx4vhm9qcg7q1aa7sc0u282rlba74tdyeku9zokxsdbpqvwzavre8kdelsdb87fcyrsilaxbfql7a202k0s8340ywum7cgkxkzzqkh2cubpgjjgcd25can4azvz3kerubnu8l0tkts9of70g2vugbvcfoykntb96uomhcinb5eyv5xvsq5ht9i3kdd47m6mi0rsjtasb881wqgrmzw0n4068pa2ursmshdu6cbez11gij228dl3xfq6885be8g8kb4ulehmy12onfxfnvahy4a7ww2baujbp6dmeimkyxy665f9y5lw8lezzbruhwe2v3281hqhievx1185s3tagnzxuzn741ug15pcn80tlhzy4u8pkdh93xnabdthldrddv4prqd8s622c9939uy1xqzu0voh42gsjzfdl4i5l4pguixb551v05q3lmv5g4zlionv1coq794i1kqx9r2i7fry5ypf2nu0200w8mlzrzra41lctkttctlw78zdj4ezw6smkdwb2qboegovmlicqbr6zoan3f3vf67nzesjwagd9but6ihp4crup759h0gmz0a9783dom7vf45l1b9dgtgaj0xm343o0djaz2e5i',
                fileSchema: 'z38vubgoaihcs7v70yjagxa8lozre4is8lzwyqpdfwn3ppennykswspgsysxc3brelsli86h5ltcoo3b8lekircz9cv1y827ba0r09ubvmknbkb0tydajd1rrpexf3ddncip0wugvewau0d5ponc4gxwogpmmjc98os6gtdslnw9onolnfwclczfr4p9371ns9aa2u4cwjqmnu5a1yw8v3ap4n4y9ku87fqt1jwa7quqzg827d76p7y71veqdlqoee5oairby1stokh0e5xwcan7oxd2pvn5spwa7b550b416a32bdpto4vae5a2tlwnabqgy3xakban1vg4qoivc4ene3kmlyx0hue4n50wuwwgyx261u0x1hlplqyi0bxpixlwbpp5cf00ow2ywnx2z125d31jnr1v6nxncdowomtfcoamx7ayfegguy0ys7shetz47nkxkfsihw7ozb1a2h0z73imii6jo8iat1tup0oa3ab67q8ug8sfzyqyzs2x5enrgii9r9uoireimqpkwf8202henlo9c57oyto1ngkm0g3uqh2ra0brgene61zw07uxa8vge4z0krpb25bfd5y7cyby2jlfssesh2ztoudiwlx19145uhc5zo8hq84uiu8crbi8zx9pdws1nil3zez4u112cfhi6lmfkh6gqyysw87r8y61o9kdofh54zu6n4c23e112fz3cdkvs78k726zjs03buir24mhlvfbuqx0r9i0tsobszkj2441zoq50bpd3pcym1770xisb5krk5jx8u90609zy73jbx3qgdcza5iq6kbxg7mdmrjcl0zs2erm1q7zgqyj34k7rw0sbg2y0oorczfs75ge5z2kwyjq9ypkkvnow8136m9qu4h1jrkz8h64ebojqxmeztnqgdsb8ku6n9s1azpc9hdiwk2ia1rus8j63eoqy5piqq3jvof8e44xzzr602etu99nrcynq13dw3j2636c9631c0n45iypl39kbzjvzha4cuxy',
                proxyHost: 'lphokjccgwf3mhu1lvtryt1s90r0abpg9i135dfa64snfeterodx9v95sdq6',
                proxyPort: 6205111244,
                destination: 'kotsmo9dn0s48jyjyg9fjk636z28ot6xlus0z0b5ag5ptl0bfkwuvbyn7emhkleki50jcuy6gdqp8dhtuih52ijwbsvfslyuoxcmjr77e3hvwfysfnygohe0leyhq0tr0oxcqpsdaa8pb6flbnsvxizv9ycddeww',
                adapterStatus: null,
                softwareComponentName: 'yeveqs6b4m3e0hkujo3pcmirvg43wkplar1nb0eqxwwnr2jvzfj3uq3yf99jsknsh3vc558b3bwggu6x2uim0n8guzxl3sy9wo62d6c1irdjawxi78fr262stfb68rdhlwd4x8ntxlwmilw6fbo16klwppy34z9e',
                responsibleUserAccountName: 'nuhbvqtf9d4vu0yrjyyw',
                lastChangeUserAccount: 'fr14mnzyecvvxezwuw27',
                lastChangedAt: '2020-07-30 22:18:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'c9ilshuy3hybub63rryx1w2c588s6ie6ys5oxedp',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '8z5cduvnbnfdp7qx9vnn2mtn1oogsswbfnzy6tacso0sm1yz9u',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '9z2qngia3e0q8jasy5cs',
                party: 'wwfjbkk57t027qbuw5fpqs8ew3wkmotttzw6qicglo640dt4b3xrewkdkt4j8booiavkftjixhzr9yvdhvcrk5iqm8crt2alwwy0a8k1hxr41p8s4dtlfphs0ue3wg5fsf0iyjyodpno36mg33u1nx764en0a9rd',
                component: 'kvta600g7h2689hmfe8qdz8nb7bro45jef8eioo8l1quwy47ignwz5gpla5psboysozc71p70xsq17umgwplq5p32jb5o5nu6jfmwy520wv66hglq06l7wxibvhnx3izzjmec90dsjrcwgfmumiaby57c7rbj5sn',
                name: 'dl0jw1gg94enq4xzx0v6m5rpypxdnsqjhmadrrnntl49s3fa8quk3oijcltr2qj8amhzmbkgpgxvxiq2gkedvcnc6v8hz54v3vqq0ophtwp4kbp8byz22es8d39un5romrq33zd2uasep3gvkd32omucqxmeub6l',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '9emio2ykujbbkva4z7026ofgter403360cgc1z0kfnueg0g19slk44tzl74a3xx5puxgd974qy9tpftt7ny7vmtnrzjmlru3p0lts2e2l23953jywnrvh22zh024xcz4p0yv4nptq7qamsm6k6sa5fe0b8wvjdt7',
                flowComponent: '560d32ufctsgg349pfbxucf5vdhrqo6rvhj863r64z7tcxv9m7ho3nqagb3yfotia4bao9qdbwbarj8qfpk9jha41cidmk5jb9ofajg4p6626j50fkpw9mu42lz2yi8vgwuc1gp2yu7xgfhmjbi724d6ec3m0hce',
                flowInterfaceName: '977lfbxx1066knaqkpqd8qvaafgns664lozt9ugd3y8txjppof8hoz7ajcsfwo9hsnu05s8pfalr3ltpdsyvnd4bg7u93bhixi4pddqfowhlcu4pickky7llv1hsxx6u2mtxzsan6qxdf4ef5po9grbqxlwb5swk',
                flowInterfaceNamespace: 'iqy4r6qd93als9thljn9mf3f2uykdqtc4dj4l4y8xc189xy1zx01ehwov82h8hsoe74bdj50fn9fdf6cz1qcp2bktswxuk9d30ndjnc7mj995a9l840r568a1t9jm7016l4nuskxdp5g27kyygsvcquj0kjc7dsg',
                version: 'gxllo0ga24tb4d2v2t4u',
                adapterType: '5ondzn2izytwlp1mho3oc5tinggcils391nhwed96rn5m4aggut6kbxxrbvp',
                direction: 'RECEIVER',
                transportProtocol: 'f9qbu5emd716udpe5ch35fnywpsos6i0h32e8t699kozby2zme8dxc3a612u',
                messageProtocol: 'lfi2qdl0je5uej1v8gzo6s5i33dpsxzjn2k5v4vjrzj61gyr6zrducpmpigf',
                adapterEngineName: '6m2tszghchd8wprcl0wfpnkyqgmkicytbjm9uugwyyopotgmjfnw6z1o0r7y3155hwj1dqq9pzif4399iyt7gtomq9cefr5nmp3vzj3lwck30aqtg2nooj25c8gpq7r565582h60s5h52oichyg1k0sxsvh1dnvy',
                url: '85sgq70gavbylwjnwbf54kykb03ewckvxnjo0bwyamgyc628skyu8o9mvyxvolh3mx6pnsdgq2wrhyabrfgl7qfstd0go11vnaxseatf496zonznt0kdjrd3h7zriz4f35pez8e7vsm2qb9zx7gmk2dgg1wt81dnvdirgz0esjen3g1ttc83merrnonqejvzjtqsbwo8x22pxwo0xxc1ldz78dbf9woeob9kfitpo8whpf5ngdtvl4xc4mn3dp9w1swit81qqki606n1b4kjcpqc17drvgbneh63pcf3epvo4kwduk73mdbq437fich3',
                username: '01ksl3nzc3vp08zkmvndurebdt1fagdgy4juqpr43v2e7gk69zg6cviqen8y',
                remoteHost: 'ixb30fphmxkr1pfd45edlfo3dof2h1mzd9g7k11mlxhy39ekrsmrdulkib0yipknbzba5t9apo677vyedl8555emyekhwtjp9ahn9ag1skwjfq3nkgkjf4ntu2nfm1s6rd1a9licr9t3er2wwmezwl8wchxns9j9',
                remotePort: 3042142817,
                directory: 'coenvm990u8iyvms4s2psa5dul04h37mxuxhcl4tdbg2w50nygccwznbytbjmldh0lw6oymgevxxgl890q3znybxfyk8iq8x8t7rvaru0nk84x0jjccfizgyjwm194vcg986y3iqv60vtbsuo9w9bxu2c11ucu4apfy63rit9gdgt1ogqeaeisw45q4nf6t821z29ao7alol19tb7f0o3w056srq7jvbavm8f5ljt3qhq2ufet8avbog42fc7oeg74zpw0fnt5lzi8ayejir48ndmsamwsfligp87xur3161q63qtcmkgkjj7pn59he0rtz736sgf037xxw23rk4vvj09pakgg34epkn2u7cme5wdwcbeceq04buw7274gr9mohlwnyurc860c3sxsexcfymqhsffw2dasqdh0wf0nrgu6vo03khrongca9iibbdo4v8hg4q52w50lg2jrcw3bjzqdn3qvhoxtnp4fc7mf4lggbi28hepb7p14ilhllu52q03p2kpxjrb6aylgngdvwfcvy5iozwfdhm732kwp7n9iedb61wh4fm051cdyvcai2le0p0ff50qaevphfz1b5670c7y6r5lojjltgc85iznnbkqut1ox62h195xh1lmv3edmhalkb308yi9oovictnctc06wmcy4e72hvaf94ve5dyc27mn5qnr4lbgu34o0myd2nv5mbc2244hhfupp61jaezwy99p2hm2u5jldho9dt3foyyce0qz66qqs7w2kzrcu0g9stvg3icxzc4janflcbpo8osp1ij8hb2f2xxcx90kmsbu0gujz8lx2u4ovao4rmey0kcoo6bf6kkqyi33s5eajhrgn7y0rxh0kh2ew2yf60wg1nnxa7shhgn8su2cujp36g6azoztkuiajk99yars65jibxhmlj50yg9l6zsfdyvtkffukryzui7byfpr058ielpflpw53sstmmnqwkav2naisd5tgdyz78fyjb1z9g139hcb2tpwova',
                fileSchema: '9acsw5bukzb8cgfys51s5wzhh3ueyvdok436xfxotrkreumktikz7scpjmp1nq3e5wxa4cwj7m0nqug8jhamxdvlem0w8e6b7630d5m9tdkikb48legpnihp5qqvugh3mphy014e6xjm703bwic22lkrazdah1l8pv4f30wud8kwda0k2f3cdif4s7fagmn10bpsonazokeptw5b6lb2tsr2zkvszfov77hibwxpkews0k3ttb9axr060upd2611qs1j70btxopi3rcac53dwqrvnjx0skrhtr2m7t0gg0vvqsabzqg9kksbcrhdi0pjkob7o4qxsx8kv5h882j805esht4tamq6ru9b8yd84qyome48htgx80lu1mr1au9bg3lkgu6zqhns35eb8ovgtyz2sq43x12rsq1kj3i42qobucid4xynmidvdimfoek1r2ahc2om4e9on1wja2n0l4iszzq9qmc44p2l0xlvy0tln0vsh4phbym3fojaryk7bz9slownrrm30ecch3owlmry91qhy19rn3b2vmeggrqzlj317s0meqh6e1c4mzk4gzsbij5kisjgvupwsm3s7trfny8mc2vfeveh6kukc0c3y2wjj2uye5uhao0bfvvv0044xb0zsaglxo3jiy00z2q6ulxqw0aftwj1skxo565vh30rdtshdaq3tisjdtzoipaj8w46z5ty8l5mck78ibs9kh74u0ziubzfkotv4oy43ve4iwle7ktn1h11pbfnem4gopvj68juvxq5zx2r2yvycvijo0cni5kyousclo9r2hdsfy0jp15ub7kv36zv4hc06l01oxbh1a00ucul9r6wz26g0qyzu0no5yf4j44399siitudfccjeetlp435ecsvq9bf57ia9sh2bcji1je0u9melem73td5ifoy6owsfs3bfwrpdxpimsh2exka8pc9gvifw6a3slkda6o0hhfyxw8p947602y18nuo9gi9pkl1jb2p7ipedz2ju1yp',
                proxyHost: 'iz3e0rux2o7j0zhrsz8i2ykovdn9p690jqdp1qr6ssjf962pbwe2m11mqizh',
                proxyPort: 5965217799,
                destination: 'xdeli957tu0ftj23ffrr5rnfxilf01mz1v9zjk5l96rgrwzolt0oc0w0yb5m32aaj4wfc9awrsvhpo6b51c7kcxzhzfjyv85gndaojmbskqmrr3gys25v0gsnr5td10gmc5msn813h6ucn215375rgkltsgf2m4p',
                
                softwareComponentName: '0wv1yyt3k8zosh40hq1gep78k4m7hf1qqb6uueex1kwbvmpy7nax38w0217ois8xryni343mu8vbbnk3slfo3726d2od77c1xsxxvl3lb9puimng4wy7cg39wto6ituwvsen2uluqa36v0lm87hsb4wk70zi0pwn',
                responsibleUserAccountName: 'kgxez6sg1lgole1qzs2r',
                lastChangeUserAccount: '4bct3qgbc7x3a5swkmlc',
                lastChangedAt: '2020-07-30 19:45:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'er8zkh80tqfqh0jgbfycedp35bn22b8iu4zsw',
                hash: 'umiwrvmalxy0ckn8ql6jmvz4j3p22kf76tv1lmmk',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'o2er6vaq3bx5ysl86mqqfadjg5888pw5mk0q77doeopf1hi4k2',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'cfjehteqma25mveunsqi',
                party: 'gxbtcw11cswh6zlnaw1xnts86prwovnbo5dtamrx6cj4znbi2mqljkawne35mu9wwyufptuvjzngzvtu4ck17p5mzt8u1mpfksf22i1qzijrapjcecxgppatl80i4f303f5ih8rclml2hdyf4t9zw7rsat0nyypn',
                component: 'cnbs7dy8vjz6gwqtieflg0z7vi6m2hcig7xgxdn6p72sf2vn92g2p4bfxq4nisr65ywv36hgozn1vzxjrfm2r0x906owextv42inic2ye22ar2y7gpxgi4uv60sazudd2iczv4tjmwazceyd4kw6t6qwdxaqxgae',
                name: '54koy51jr091acpd9y2i27ynsnhrp6b3g9hobjvrbvyyb0sx2ymj6vmjasr4aywcewpoyg433ekajch0xckee1d5zz0y02blihyohhcxiu8rlv02rv38d82z5qiri0urj3advaek3rry5n5v4xh5b8909djebf96',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'xaurb1lb0qb1xnrr5oqosz6b31kfvfm7i55i5iclcqv3qf3n4gf8r1e085ze8sc5u95kvmrrowe46ba0k1jrz3bum23c98vj2pjwx6hxtimjiz0bxf3cmz60ce3lrihnguypb51e0k35bcj1cb8xrsljuizwijxc',
                flowComponent: 'chjnnzk5w92hcen3bs00u98ta3fdcy0opc3un24hfhevpgw3cwtpetcam8to00dqu53okz3k14vjy5m1vt3v2f809wpsjkg2jj79hhgh3fotop3i6mlkkfb05tg3na3l0s96ad8ios8j9cohqqeu51yn5r9c9rkh',
                flowInterfaceName: 'yvolgtc9rw3a2bsj33s7mbm3lsnwkrakge1yjrq23tg086klutgwzyr0th24155c451ca2rmauhkwwd5v21cgjjlcufvgewuygh4w4tp8ogq399coyaxbyf3jwjxowdukkydrft3t1xt01tn6jdhq18r2pr5bnzp',
                flowInterfaceNamespace: 'wbulclqo6geyrp1sp79v7dowohyh0ogyrwxgwwybbxqql9p4p23mgpnsbc3lwdxv33pzheh3i7w339wthjfr9hp8nuxyk5n7jk2aitkhkr5zgii3ab4otk0i47ruk20dp6yiwoxaenmbrgtbno4xwpv2yfdanwbu',
                version: 'foygxmp8yppe89hswcpq',
                adapterType: 'fvvjtz09xe3s7vk5s0watl6ldb0qwexi0fflbzmztmpd10a6g8uhbtmem57l',
                direction: 'RECEIVER',
                transportProtocol: 'ux3zoci3tln397kcsv3vyb4jtd6kl51z8cgtr9i2fkj6sv875gby6i27q62e',
                messageProtocol: '2esli1vvoavzomj6b3cao7wf72p8o9l29omuxv9uuh0w3t4bvjsl39amufvv',
                adapterEngineName: '4qf3faqayiw9v1v686qk0u0216ugd9uqyt915f9kuaucfnhq343mh49ab0m4o2ee99nl5tyt2muub0dh0214jhvbhc9g6tzsjyhoawopqdtzn80p8ad0apwvemnrjb29vnnwqoj090ozwar70jny22v2kfgduydl',
                url: 'h1on1fbegjdcmvvqgt3v3im2k71dupw3hpdhk0f7om36z68xh1pl5tlrgxv60tbnknfvxdu89p2rfxz6hhwtabxzozhchd4sjqlcvicl93xi5fwoh213ryywxlua54eih4s50up9kis4hudoiiivdbn5vd7c72oavnj3w1dglmv2rnd08eqct9q4t6v5oot20er3o6yzthv5oe8hwmdeyiwb4rp256jhwjsbhequ621rs0va6lycv9r6nuz6r5a0wmpu35yujmxxb2c9g7e0jadmypehupaecupypwdkf7lk3e9427o8749t3sywr04g',
                username: 'y649haahvwbwniw8eeutcmo2rth8ucvbay9d66hfgy20yq88rqqfc6p0pp3k',
                remoteHost: 'ct09yid29znhx0605cllr2be44omd0bxote3vod61ubzud6sbxrmo1zcipjjepp1s6soz7bqjqxiyf4w10cj5kqel4x86q04urom2mkbhi3e2tfcxnub4f17t708rx0f35exz335mtrwwvwdoqfomo3n9lclohyw',
                remotePort: 8383688828,
                directory: 'ilvdqvgjbofetp9pf6doxytg6sbb9b0ztcd7nrpxyeoqfye5hp8tbt4spci0jt7grvvp27o7kqaysppt8oc3192hyaj5xaygaynbg01yd707solwa9ag0qf4sceyhh4j89okp4jt5eoskjvb4spsemqeybagak8qu9ij7xy1t7mmkxdo6l8nvbcvggz4wx4cda1lzwcmox8fngutpfe4we9kezmhd6dhrozz621lb0tzk6od5f33ynh2cq2bxry3feqlzjojr6mcr7vtxpmb4t410k9me3pqkil1bkkz7osnt3cp5gdkjnisgxc0gquhvvjxl18e8qk9x0fwk439sdsot4saannkhrra48k9y0zilberafzawph48fbkie8izdct8j5qz2sb1wlp2sqif7iu1rrrnepnt33zpn7putzfbetdicnwjyx4vmktuyj3nfhwqn4795hb3cd295sht50r712cxhcpn3c4b43k1kufcthsrcaup0rturnq2enf454obddpl1aezd8oo0dqebo04dbvkc7um1vi49nmwfhf2vuuk9g3962n110e0cpgurnl79fhqquc3suxqjyqckbfbzqvuwudbf1rkwiubev0lsp7wulhrzftvhr188hk9jlkisu2u8qihe9ziooj15pis9zbnqmng9e8o6ubngafvep55t3yuau0wdolsy6fnpmrw7dy4j1uxpna34azl0nybqh38k5hl8wabmg7ugusvg68gq9663g9dpcbz61nlbjgwif7ffi4cuaqrnmmxuoma66gl8cltg1iwgt37xnmye4kwo4d23g8vq25sduhyc1eexyv5q3vb048y7ixcmuaisbx065o30xluw37w94j1oozswl1ssxr04oxdyeg9uhnom0o33wjag6p4kgthibf39amssx90cvzqrf4sixpixsbk1v1g72aelu6cf4n05z1alonkugvhxeqkmdz17k9ty4ajfhqua21xl2dfltyoafhhtn0pntq5roluhsu',
                fileSchema: 'jmfg5hozhfsjhkbavw6mkuw7rfsdjtlsm3pcetvd2gqzgaulovvkvpdjrtts0erj3iy1ioqwuw92krz4p6sc93cbirr6vcr2nhc0voyjucq2ipvw00yby1t6y7qeh38l7dx0ch080ibce0x0d3frcb5q0on4km94rk9bxgn1wsnupl4cnb7stiy9ljt4oeqkagswo1pdtwumn7hykef5a1v96qljyeme2qeik0b4nyefo91isxikmlckibim3msezxtsal9lyjirlwp2ieoag825lum7j8i1fsysl4k9rusajl2rms1nk5n4v1i1n4u7uhy7uarlwsttxav9ppvy3et3qaz26vkm2ghdfpbsuignnu6pchthr9486sdyk5obm1806wgq5x046g14zs1lixh685bcqw1vrxjtwdjluve2qqfgnvuw8ubmtrnndw7jwtz4bwqen6j1xusdiv8bhos0ot6vquvqfqhyavyg54ct3etle1jvtczrx5eeagaca29nm75jfu1hj5cnnmrr984inklodue6x0hgjntsrc7bip5392ohkt4b1wnmx8dm7i0e78zu5g7on5d95ecxqy998km7homc4qg9k1z9xpurclfndli5fjjuq24wao11unyvl5x6038qd9y5pc1fkams1agul9ec61e4kkswx26k5zpvrl5gqgt18jonwxj4467e0o1y2dc9ecuf25suxdfhh4g10p9rj1m7h39gf91lebmhg7ug63qpmkde0weklsjlldtz4apwzzsc8y730hgbr02rc97dzaimz2pr1u1v0dfkwonbnn94a00dca7073ir2r82dc7a50nqka72h40we3chj4ithfiobi4e2k8qc26qbfbpz17eoo3ly0v91bhc1moowx33jcr4nkacgnpfaoyr8nuegefkkt03wsju1u7uo3zh1jnn8ncsy9rz96ct5i7iukqov50f0sfql9pednfnvjclg1ekwbap6enewb7rvddverpfkw0af1lu',
                proxyHost: 'dldiun8b8qfmiam98pfjyvy69msi9exltrftnw79koivd17yxhsvoixpdm4j',
                proxyPort: 8038283731,
                destination: 'm550jrg97386yw9t6wepgmmgerr58lqb55vkrg62qafjyzhwlu1r3ctdau8bwf26fs0t36vuy46d5r1qm3bbvk8falo40hmv7kp9eowi6o0623chlnxw1e2wc4ufxoftft10h51lp4d3q66xc8vuw0fo5y1onr8q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tc6kkfqmdm3zjr6bc4fliktfe2cvm6swyj6y4y5d92yi0o868obf06tcf17epd9pgxzy8kq9z7heigacpq2lz9i0hkrwyg58rccu74ulcpco7lg3i2mmaig7bf3b54t5gn23xgwqv6atjfyu3cps6meee3wl1df1',
                responsibleUserAccountName: '1iovvrzwdin31lgd0nny',
                lastChangeUserAccount: '5udsfl6fau43ppsyuuas',
                lastChangedAt: '2020-07-30 19:12:58',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '23uqkj08702jvlr3ojxy6mup18an31hu711mszy5g',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'x0hsghrjjon547merxg2oyxjacmyqq83dduphnzduvdh6p0kne',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '8sglnc5jqr5wj0ctpljh',
                party: 'quyg2lk2b9zr8y4tm9wzj1q04czudjuqlql4qwyo0k5y0ruagjyu8ktqqv7a2ykz0zynsy8a25dot69vn8lcjbhk1vbe9cgdndfylnmh8fculkj33y0jmz1aa2868e0b0zpjp80mx1md8p7hqi4sp9uoscubw9az',
                component: 'ub6qc3i1bg79xym95c8e7e4v1xe6f5qf4w04al44ehm5i5poz9li25lk7efdzu7bf06fwejpo7n9qbwxgjctc3v5bg4dwgttvikhfoe4wp8km9l1v4ef2kegxneb6r6anbzkqh2q35pirfuhsw0iceyt7kq53okk',
                name: 'wdg2laup7yliqdjuymwh7ngb6v3j27fipklag6wfxznrcvmsedmlyw7yz96vtu989man54s12eu9x6oa0pfunckf2jbml1dcl08yxf1hbqq27192pbd62443j4cmt8vl5ovnxx50nmtbu1yq8zgjud1ng7yg19c0',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'bqvjuhk1476vwlsvgmcd3fo5jp2hlb6yrva7ydqx54jgnnobfqzjfsoo91aibssoxlixziyrfigz3d31kku523j70qa77knp2y89apykl4udxhmlvzl25g2oiwmothve08ce6w9c2ajhy2bp8ztpzklzkvcyjqtd',
                flowComponent: 'nplz27ttc3nie1gpdb4w8jqgfpq2ceb7tfv7yowd5e7uefnalfqyxiynemigto6o6t1bc2c58k1eb2pqebvchgz8mirc4k2yqvz1yw68lrobq0xafl07agcx141tsy50381oxn7a7jwg5mxxku1uc0vd35b2zxah',
                flowInterfaceName: 'fxxhlpvjd0cu3qj8mnpxamq9crh2caxwutbmaip8qm9lzyqzbjwu6qtogbh2wgte1s7d1slfkgav8fa6cer4ml43faa8hkaalo36ozq87mtwcskarzvfnjvps8ay9gwg6agtoux8c5z08bkjajyday02wl5a1ji3',
                flowInterfaceNamespace: '9paw0u211268pry9dnv0x7dudd5ssxqreu7ow5lhx09y8tu56n8r1k0ybfdkmrciaqhwcj81a5y8twpctxzzws23l31x48o876om24i9g93frzwmdjtw0sobt71uryllgeklvxtj6od0ppqi91u3mqa7n01w88h9',
                version: 'opftg69bpuv2dsi68mbh',
                adapterType: 'a7ovb4ebwrhivmfq7p11yf9qqeew4y0fm3tzy3d1dqwn4fiu8beguvdj9my7',
                direction: 'SENDER',
                transportProtocol: 'iydmayisuqu0lihe1z3i4zloik7i0mgmtxi74lumpyw3jcf3igrd5bgghbz8',
                messageProtocol: '4tp7lszm2d0dgik1vckxlf569lxmdw2m4dmdx8ik10ewmco4txymufeurdew',
                adapterEngineName: 'xm7l0nk3kj7olbyk9wuhtcxu12i44m2qs27wzphboh2wx17eppp8vy1kcn1owua492p48b7120e7hx3mu51i4tcqf5c0rklyx0cwr47m39m97q0cxj8hmkv8vdccdujlevjugg01mrfhn3ghc5kw3tsose8q34r2',
                url: 'oqohnhf2shz617hqhichpt7lbtbx7eyws9popir6jw9uu5046nidv35knbubgdgdio7a00cwgvp8y80kweobgwb1kkmp0031tjynqzyj0cwmjk2x4twg0vr3p1zm6huwyei49jniwf8pbel8ytyly5cupjdz3snkli6o3828q9uaul51mvzb8u67yd34whfac82t6ap2sn65k065syp7kq2pazhzo3m4xylgofz2o2c6mrrwrfqeats76wpojc3va4g9w7mle9b47anzxmq3yz66whfrm29opvu4kbx3zl477m6jjmcz5u6fftfdhyl6',
                username: 'coy85mweumzpuettq9s46v6xhf7b9zg41kg8sv6bv8tpc9x9t8i47bipdbey',
                remoteHost: 'v72j661xwm5ipru0wi0bilfo5wr3lhyfpd8xckh7hxf4u76q6zsxzs9qhrcud5kv2cb0dk72yhfoviutwegr3r2fguiw17ve3i7nkfz6vxunw2vu4b7wqa3t9f5npwawxnjt9r2qwblho3v4j3jrhzl7iolct3ml',
                remotePort: 6942373426,
                directory: 'cf00gw2134y0uvurxg5154rfzoilctub1yhv8jxbtgfmn8f40mmhf5rutum5n4q5t2f09nogugfbfa6ygxyvpd5yxz9x2rieqec8a2ftx360czouvpuiiohf1e9j7xfb7m8j3es7xzkak3a3ygugwcouf0pondzi3nz7ktbmpstcmc300axq61ev2quoe2twkgaa2xwxpqp82rfqsa440lprjzps1f0rndk9bkxitioedmehsu08djlsm9wjbsj8ezbzrt20n2u2ndtkml75ib0otmplb8n7zy5f6oiv7igl9w1isz0lcpf7160w1op370x3e9ts6brbhiqczob65y4ux0zmpg623ddbkwoqy7uhuq62gs0hnvtdkcokmdl1qyju5iq51l3tlszes8ibowqog1e69utaatzv3pod3lhj89adeq7jjgb3krudnriexm9ictxw4pll4v1v81hurzt4d1zix5fh9u0g16iyukn9zy3cmxzf5i4qpun6gnnc51mozj2al3axqef2gjm43f0e1ombw248zcq7vgi1rl9oxp6ekjd7zs96d285zx19gsqr9mwonk27hleldchv5zcd5xlulw9ah8q37n07g7ae4n1w4uysdv7yylfkn8yeemczawk5v10j3ew0yn5vmvb837bl3l9dvaq1par09xh2588f8bbl81p137fahaww3g3fm0a2p9t9ymo9qjalxxkg18r6gy9tb14m5gjx3sjzcltxg95t1krpyl4ooui4leonii4fhl496hpjjh2abet3akx1c4minaq1zhj8eb4588ut2v5tajztilrhcsuynkhrgjonhnp5flm4plxhcerogd3d7087n4g0sdhea0moqvyv9psfygjkp3b98z09m9o9i6lyv9rqe73hb5qx3hesnz5jtbdfp3pg92fkaldqrzs3s8kt77zk3u2xg2eg88wwqnsgafxhsls6ed8wnsfi1k2n5c2qxz7nr7j31u168kbd5nbofe9skjov52ye',
                fileSchema: 'no6rjl1nzs042io4wtlsyyq5q5ysvu2c12vfas2qo4pblccmigzzjdkaes78dv90os9wvmgbxns6ufx34g08ipxo5l0s6embbo4ibx4i2opj3idd5u6j8y4podg8l2jwvuooreemlm4z8fd9vu54p88lqezwrz6lpoq78wkpt7ezdbzvrosro3lys57wd3nzw585hvkr5g8zde4fa6wud7pe5z0535xqr0qybbvnouhv8ghq93wtc1ldk1dtz56tmdz76io50bvvl4tpvcl8h2lgie3e9p5u0tf0pmu5ugd2msru4u1nv3fgzqf2k1olizlt38n4j8cf5p9efpgh3y1h9l9zizhqf4g0hwzjxj908rhjxab2u2t33a0vfbz7nd392izhmn29fbig77t9iam983ffld10segvatid7ini3rnu3jc8zv8pyjy7zujzngtqmg9u9dl21gxe390kqcgo7u3e0vbg61nqk04qwa5flmvi4vk9k2y2z02mz96gwoa4zb6x7d6dm487okrs308ye49f0mgipznvdyvkbysyeo097xhdcai6h62j6j967aj85qxowo82om7mvz8b5ztqtmjnxdbtsvoldrfj1yim071gmoe6d8f5bt2w6mb6cwwfl3uyxes082frelzu5ac2ss2616w6fhshr7so8e40dfdei0d37xgtkb44asocvb9mfakdbrpqedp2wdf9ldxphot15r8urnq0sz299rs3evp67r3728k9xf3i26ugadcr9t8ra2gi7s50loratfpxgrhe9t96rqozt2kvfjf3iiuuzfujjnjw2n1ft3ihvr55rl5s624y765klxf0qcuu9utt11r22ehfz5tnqxyul48wkhzazchupcarsrvn0wyp774tymhf5wph4n9fe3ubtl3pshezc2p8rrpum8jzxdbvef66fn36heoex1o4ge0p4kr00r2tedjop2aohl55ksg0gxsnspsftkdqco42dfzf2ulbd18qvwbdqttq',
                proxyHost: 'g630yls5wsfofjt9255w7ifuajvfdehk3nd45s31nwsjai3st91lgivsyig6',
                proxyPort: 3174998214,
                destination: 'bsxidwa01wi89oxeba8y9sdv409bdnmkbtqd9gyq5q80x029zlwh2euwtaj08gichl7e6zu5q1o23djaiwgahh8pzntc6xvn0rwikz3ga031u52yr79z64i8rlsudv8g20trnw4sstgnrbi17gnz3cvjmets2ae2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hlvxz5eog8p22cx7dhfub5npkg4i9mrq858h4xhixpuqwtv2nwfvlnv344zk386w57hgx09iexzo3ykvfn77oz1q112j8m9011kxawlxzd8g1llh46w0s1rg9w5cqafca42er7ommcrc9h7mcvatws0xdsiewn1h',
                responsibleUserAccountName: 'fmoktqwsmu40nyubszjc',
                lastChangeUserAccount: 'oxzb0zte6uh775iiqc0q',
                lastChangedAt: '2020-07-30 15:42:26',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash is not allowed, must be a length of 40');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'rcwq721uvcc6t7tdjo0iqi0jthibdwkimalwsx4a',
                tenantId: 'oto12yug9phf07mm7jz4gvcgcfafc16pw3k6z',
                tenantCode: 'swf8tzka25k6alk1skjbaosl3seln09vmztzg847o3g7o3or9w',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'o3lna11tr7tryd0gahlk',
                party: '3lnka2wrgncez5m60t92eex6sl3vphtfxa0a5hbwb6x96msyou2s69i7zqtr2msbya71astmbwb1lupor0fat7ktqqsi1uqg838pqt4d1k2jbpj7xhe221y28t0llf39zpirytgtzn3copu8l7tj9jvjr6nnzvwl',
                component: '5mioclq6k0pub98frria3xt1fhynp9mbv0qogxq7jcf9p1b3mr090jjht7nqwp9wa5ud1zoqsrav7qjambkxqh9mset1ot33q0eesh3qjn146nvpvywyjzl8vl39yppmjbpjovt2vmijxy58rukjrxf8dgcg18km',
                name: '6q7u5ser26nhj50oumbxc8pmf3kweknh48tnsuvo2hbp9k2or8cfh1u21eu0oh8ij5dncr94z5dexpj2xqurfgymj68gcfaligwrbxezt4wq22hi60349csura424r9kbkavub14961r8hczku0kyd73xzmr00vf',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '79l5alhn2zmslp9ju74j4og334pkvkybrit8kotlvwh5oer6zziefe7p0uj24f6r6olflw6xp3rac0q3izspn59xu6rogvoehvcswi10isnxrjaioe7vt0g0m08v2qggn05z0m6u4taleqg8vww7ruvdszf93zui',
                flowComponent: 'yok6wz4gxw9xwug4xm6qspoujuqp20dg5sysiz9ylgummf15n94qhrxyucrtojzkvt9zpnklyfglibx9mvfq5t2lw7a7x2v5ws7cntbvwde3zo199mry72nc4oi79c5bs5tm137n23fueggarqf4uyu47czemttp',
                flowInterfaceName: 't2ntfz9npvslep173qlssp4qf9fv2pxunk8toxrbwu9aiyrd0r5ddo3e8tnxzbtymauvnvonewix6v1b4mr78fxcll1skvsh3bq2dyxjo81k7dv1w28e4rkxte2sdi405416lzvw6l23mvgr0uorgd7vpmj9deb5',
                flowInterfaceNamespace: 'xt31kp84qfcvjm15qkyk9vchx11xut3rg3kby1j0ekkh9t4qk1l48awxxao6yk14c7ykttgc2ue4qxxsfdixpq9btfdp57j91v0l8xn6zmb4dzg6ixb1vnxb644z90tkb8fswrl77faaxtdp8802g0872ymk8nqk',
                version: 'exk5f58ge0obasgh1pbw',
                adapterType: 'jxnqo0i9g3lc8cnu0z1txoue07w7kjle735savzcayybo1lt5mdzaebdrdwn',
                direction: 'SENDER',
                transportProtocol: 'pffsnjz9jitjmayhi81430c71eaafdpt8epclpnsl0yk39f61s3mfzcs74rd',
                messageProtocol: 'of9ukawn0jfwoh7u5t5shzzug19afeeg1j7u36yrmat8w7op0ipwt5k1v67l',
                adapterEngineName: 'eq9vl3n8l1di7n0c9sgtt4z1ljxo74azp6eeez9lb1u3dv10j220owgr16qjtov1kmmvgydsu47siwcgeszx0hngoibdt3cu98cholcghfwg3j4txjhsbizy4vtku9dtytukrel9djt3za85xdppjzd300im9kbs',
                url: 't0qzo779fko789xjrogrm4kq4cfrzwz1axiivxcd3ptfviht8i4197l93ev5wt3g3avl7y2fkjmy7wz3qkrfq0vh0ssgur95eehumekr28o288egn1of1ysyodpf21nuvtdlm0ojmn5b0wq18uth34vh0zproyekesjzs0r9k4ji9xcsejb1tq14skrcg2x26r168ujhqipi4f4703o3li7xgwcgz5gzsidorhbidjfpu8l3x1e7icycvxydg24icqfq7flmelcpr3sv53np1xrwtlejianwp4h9179b9a9gbhg2otupzt9o20qx9jr1',
                username: 'qq81c7jghbx85ndfrswk5mk832v05hivwcc4lknedcg0cw0g1rb3177qv1lt',
                remoteHost: '791ph4fna7g7sutr2leu8umj3nu5p7a3dyy2t6aztl9jbqj64hhofnrg7j6wfrb8ye541g9p1fp8korll7x39i6d16hxeh8v2eejw8dulzrjmbcbxdxgkp367o1rdh95wyrsuhcxqg29t5wxpvuoutikuuxb9ue0',
                remotePort: 1309665874,
                directory: 'zhs5xwv9cpitb7vll50hl7omitryg0ck1i4362a5tcup96cieb9d94pvrcp3xl345zrjoxhl2ncyc74yyxp42zzvxbk9t8hfk8i0auwahdx0pex88lf490lcx281ayw62wd43q5ay7w7sortu56kxbt22hdzpqwlwrubb8xasi60afbxfdj4dyntphuc2wvich1557l1nbwjo54slnxz1t71degmwggxz35noalsxnd9h1ysttyvfuqe00d2rpyy6tows89d77m6fwfl6doa7az41c1egvexc4ee4aw80u46hdtanuszmqpr27dvikmqju93l9x90cinbdasj1i55si84fdxrs1bba3r93lnvesdpd3sgr42y65ypehilb0qjrhmtmu8tw0hdxdycs4xudnhiow0hfbd6af5mnc3mvu533m79hyg053t1fx9likpdot3nbezm3klpoy1eqdd708cpdws80utbpnutz004do40v24ny6kntzrw1ibc13dng452lj1us0tkszrdp3nivjtafy9v7v0za51z318lk97tlc9b9kf4efa6o823dfdkgsp2jn1eldpwq1j8ltykys87bsf50mkr7b8vmnccl0zftc1c6ly2q2oe0cgn0hfcrqmz6p43a7wn2iv1t5awt7rmivrpp0ie6fgwmdakmz9mzwcaqlhtg7dz66khj5dbxexs3zcdfk2ir6s11y3mroezbj8nogxg1onysk6yswpni67u7gvpfhlfjixqjhp8o2eycjpg5kjnkojmu7m5kyajr2dj32xaryq8g41e9c5dgedv5em84s5d9ptdtxw5nx8lmic2v07p3nkwwnexxnkuteeuidypclocvyf92rl8nupz0ghgy306ruv2iafeor6052l1zp4y6hyce35rn6ql7zr5227nrftjf2m4hq86n47f2ux014kv3opx6d7t4pnyl6fc31df981u19ibblo40m87m4456z9bhoi0es6i3ev48z88qjbn7zk1wp4',
                fileSchema: 'qu3l6q3zll3kiwjkhpcijml1ieywughpyeb7qzwuszyyvs85yrie5q0a2xdyq3ydolss7kw7rkyr034tqu5qe44ghndkeb3s5ew3y1m5sfzbst65bl99bojdiminzgae70l8p6ab9qbos5fi8t8a11wg6hrof55nne1r4nrd5w9u2yfrkvh33vv5fc1bqx7yxj1qzmt8qp6u7tl3rphrpg6uv3aqa9o8x52x2tf9x2xtm4rww8nc51wxroufeib498kzprg9ht2t3fmjiou56f1dqnca7pfsywjadrymzaphsxjr13v24hjliptsjfg5lr1368tg9ewl8fmiv8e07ii9h596bn60cfu80l3na6ci7v8p2frh7g0ial9r77grs9ws10x84rvhuv7kgo9e9opthp66n8yumo6ev14w2g9h6tc4keeyzy7gmk325xqf98p59s8p3qbihd6z52de3y0tf3pnnzieddhh1jet5butm8mt0ulep1hpvpt66m28y1g6d4uuuawnlgd4w67ix6uhyi7xn0kgo5o3vje7uubwkiozc0hjyoceao2ybwkgyqryrfbmrvuoq89u1nrpx3zpxoq1iemiq5m8ulugdx60ehyd0j85j4wx5baglj13uu2a813mv2otq3tvo6lbikl4hbsx8j4ga218mqqb2hum74763g94z7f8klrah1takjkdp1knwc3qhw7e78unsjhlrk2ws2jeess5s806u9z87u9m662l3mh8wus2o70l0uzdyqlxnyub5uoo6zy9xmcgg28pvv644p3l6uwh8nd69drcqgdi7ie2t3kk9luom1ee5d4r0pib9dd63roz9q964qpnecms5puw9d2e47v6ua50zhurrn0mlntz6olzhtrb7toy557tzc6h973lixk8ihd3wvkj1zfgiodu4ogzi0m6cuh399em6qjue1obrdy5xgd1goxm5tr60aqsoa5avfq4168eeo8zoj4c8emg5xk295h1khpk52abs3vi',
                proxyHost: 'rvo0awhhwkedjc3zglfbhil93ajvyp0rsiopzrp58pxaahcsftp8eig8o0xz',
                proxyPort: 1102216675,
                destination: '6hfc0oxlxzlx1d23905a3ixx4y4d737o2oh80bandufdxpllw8tp6zaohrmg4yifxc424sakwhtr5e1485n3mym86f73lo5hp9jwwcbjp4kvz9gs0rrc7bi3146r9y013jri42944veueh0y1h1595yj545d2q5b',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gza2hqe0fyfl04fv6lwic0capdm1euychfyjot5i2qvucb7doejj1zqu9y2uhw8hjcaid970zbqhgi5u34f9n8qs98hc2ab5pntayjiht0onoo8pzatw5281r1p42k9lkodx7st9u6woibjzxiyc72unhiv4ixyt',
                responsibleUserAccountName: '42d0u8r8w2nigw4ajkgj',
                lastChangeUserAccount: 'jiql1ig3ngnbj13orisn',
                lastChangedAt: '2020-07-30 21:55:46',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'gjcuka9uet1xzd5nq8el1u9voey9jr50et75hjgc',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '6l0lvpf0b5ksqidwycsuq0jzfxwj5ffzoyljidy2esq6e6rj5k',
                systemId: 'nz6uuq67nvmbvsi39aowb04h2qtt9f62qqq32',
                systemName: 'h4tu54p8mgbcm5rosdix',
                party: '6u80mszg8m2t8k9nw07he4j459zc6rzzmewm7s6kphkzunyfc66wqyxx8lib3oqrt0fn5kcvhd6b5saqv6s4t7y7dlffyyghn9zpu6vcvt29nfqa0g3ptvohfbdw9jazpbf94irzttfhxsxww4765s8dkae8ej5b',
                component: 'n81qqd14exd0zh0g0rk7vifng3rjrjn3gvedbtwsx3trzd4wfmudg6bh8flrw1ahf8udad4tldsqyg187m85zabnuprwet9tc0p4oqhdecaemaex6a9dr9qjxba5ug5z3yhkcmdy272my6du21eiodx3l3axmufs',
                name: 'e8njx4gdeof3kkt0hfxqpiw6jcxgayfq4k8chxacga62bbxtmu2kmgsb936ntwanr94yu95rmy0nxovn24jrkf61lmlbfnk3mooxd6xpmqa71waa9q4ohts5rdoa9578eitcsa3spg47dqmbu4wj4iq5kuddyjnk',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '2oxvxzc03mv6fluxyh3af5luoppt8f1vslk6lbgygq828wk9dwji6euav8n0px7hv3smkrvnkt42w13br08kvyqk6aq7x0xkhq2blbjw67ciulvmqdzqzat6i7maqk7q4yuof2z90zkqrxacnb8dz8xyb732muln',
                flowComponent: 'z5ui60nnf9jd4tln12tm15uv2c9v7adrvofq39dp1xr3nl5pxvdre6zg8sh4m6zu55cqhm9hvlu7pme6favqrarsabkdj0ikkt5xzqsew5xe3ollduu5g2wi7s07lwlrbylxt0u9hqmd7y4jdodh6iiibult71me',
                flowInterfaceName: 'zata43e8epyknli5vinx1iy60mjdyqaaratw0na4747idixthx20kkgs9l8b1jt8ar47qpeqgec8y8xb7x2aldm9b2saw6hoip54kvzjpes1ab2mveaa3i0zy2yc1qo44dvhjvmbvkkxpvxivifhqzwjd6qad8ir',
                flowInterfaceNamespace: '90oebhuq6spangkfa6vfad0dkqaz5dbsakyxetab2coylh7abp4ny273yg3487gz2nbkbe2ps5ef00vkzanuyger83dqxe3bpzfi12pqc3dg8gyf9gx2zigphjiavhdo22lgzeyson636c9mspqspj7tmhv850i4',
                version: '2m81dnl1ks191o5w805q',
                adapterType: '0rtpi50wad0y9wqim5f92fbz2d6k0e0orvyxt7js0u4hnvic5ywxqfrs0441',
                direction: 'RECEIVER',
                transportProtocol: 'coguifyuvd2h7nqf5ub5od1rwljn6jd8ptrodrux9dx8e5i4kx24zq63oj1a',
                messageProtocol: 'udr1bqsbjxkumd3vi08e9nj9u6hd7esyht2hihod6xorxhiu0w4om7o1ha8f',
                adapterEngineName: 'k6xg8e9ywku1hfhuze747tiu2wh9dccdn6b0l7z1xhg7ylb9feg3reyek7tqifis8m45j4lfe1z938icebtl22ej88cpzg37rdaoinz1m354hn9xclxb0mzhoi82ccn54pq288ywb31juzx11qool66qyextnlkp',
                url: 'va9cgdypah4pw0vzkevb063102aydqyv47wzbjlcd36mf6mnwxqph64fhdhfb2oi8z7xbwgg21zh58ceon81jspcqpdp1o0pdp6cq78axfvgylg37vjj9b5jligfkhswnrqk16ao4nb41hptt4lgqgobvnw89fejm5qktnur7s84913t5q2fi8esrfe582jcouwc0ot7af5i3t70rd5u6acdyihelk8l7i9kg25qu974v0acfms2x3p8dcljt3hh80aqco08iza86xrrn0v4qacuflyb6eukihzhh6dgpoftva65c3a01yd4km2bv5no',
                username: 'twl0kgdnd4m65aiqkuz6a18c33i2c2ttsdv2sky6rxy5i3ow8m2catcnqcrh',
                remoteHost: 'vrf6fgofp442ogbraeoyrq3dxr0njmofdmv6ygms7hjh2z5uwsx7wbl2yo9u9qq2ecrbu8yiy5un646uxral2698ws5fbaskcpqnv2glgo4j77qzvzi0a64qyfilcnwoj6utnsb6hbyldnj1bc29q770hh1mqg2y',
                remotePort: 3097824322,
                directory: 'szg9iu2ce8466a2xjxq3x7n7zxe68bucrh9xrj0f766hs7ah9ebn331ihll3rfejfo63g7fhy300uatas574566fd1d77si0gykjx3lgz6n75bkgum2xnluxjxzvxj6rcqwwvp2dkjrs8bwq4doh0yrxi7zsxl3vadgqzu0p5dhjo4biltq07n1ij8mwpgo8orcbrryj9kr4pkop0qqxjc30jvl2prnarps0q27r78qneyygaccdrw4mjz45p0k92a0340gwj3bqvsvde0dnbtlw456lfdhictxsdztlobwt8odwrh4p68ea82x7in9nl7h3g8z8sxkksg75pux0vozjv2l7ztrrs6qourcac3uwe4vcz7n093060baruura9xdvnwtevo3qzkk77qvsx23evtodn47639gknzdzvaf1mwytdkt88lcezb6sk1fa2h5jxzwjvpmjunln40r2df4cbem2lp40x05bt5qet6j4xzooarbb45phexb3gbwm78zkxa4i9ywlzdksb5gv1ysp57m9qlh4g05q5nxeu4oz1srpzxga5v3extfib9virbqol7w549syx2cupy8jpejiz7t8urmjw8ketwer8aho85sgj399x83mj1q5o6g1chc676letzeo5odj6n69havlgm2oyr2zm9jnrjxsubo9zop7165g8u9oieg0tzv44r6hetfr37idt3qidnknrqq1eoa2s5gx1kssic8mple2lq6qu3j45qgx98kbit5w1hbsfxgnzf1kfsqhaj5y3db8jxyghrokjshg3bq0qzqeu4csq1azb0ru5baejggwmrrn4p34sg98ybv7oafkmvdiu7yjhflu9czinph7dy19pu9v3ana7z4n3gor4dfba5q7h1h2x3wei9vl54hsphpnfos6jf2q2s9yk4hsngx9nh50fcliivej3rcyp48y6n75n1g1muizzekk7ljp5q0ksli6lh8ch11eygy6fl85v90zpyieyfotazfvvm38',
                fileSchema: 'mlcii1op40yl9nemrb0z35z92h9jl5eyf4ii6r7lprayad6dvie4j8m3vqdv0myljcbvwtc3ukdlvf9fzzcfx7r4k8cmtnp8egd6s17p3312lxbcvz2472oj2p6o858tkpo4xz495e6s65v8elpayoacm44jcj8ve3dmp5qza4w5yd4xy6gvgqyify5z1nmsp3vks96vdw1hugrivn5ehm037c1vee0emvqyqvohs78es67007ke2g4bd7iaopkcfn4flfdqveege9lmkqrf9t3xox0e3whq8knvv0if5vcf195tdzddibqdidcnfvtrznvglgokxp1n5tiehmjoz2vk2hugob9qcge4f7tn4sv6jmg73g4icjll3d6nuq6s77u8xgwm9q2lrzvnggti896dt5vh7939pk4sc6rm4zx4an364o219ovhhgv0ksnrtqbysh3s4a7sevovsux2kx4598ioq1yors6z1biyeebcr664mqw6mufatgkatwh640omshni5q90h2we1hb79httsxt0fx2wiz3p1pjex6sjgt9g58w9q5o8yc4y98k97hsi8mdon1s8deyox9fn67vwh9x09dnmml56dotewp6sktlpg559itmcfb4t89rwot6wr4xhrd9n11r1kdmtiahjk02jjke5yexlplmhlk8441ync3o5mg7b2on0ceqyomwq75wp616hy0r9wimv34tzvjqw298f2n06c5rivlbq07eknsf6gjf3r3cek05jima849nwd1vpgrhzgvill2mkemt9ucam9m9iuwojv0jocbwuh2qjifewu5d1gvd1ou97g2vialqy0a6m741nvd22e203851zuhrbwa6yawlbckx8thlqvnja3w2xakpyo892gj4jjcpeospcmzgge406xvb92l14ssz6zyym8uz9pw870yodp8qw1khbl3uyyb50a3ma05631r3oy6ntb77jd1omjq1433bs5sshafxo2uqtev9853ggq8tuohfv',
                proxyHost: 'kqaimzf6wnpxgmgztvm04gjfq780i9l8j54l8pywpziwglas2xkrkuafli5y',
                proxyPort: 2082907961,
                destination: 'bfkxskbhtvwvmbwnid1jqel3ey99pss24s0s7pc9ky42t0wdlvcjp1wg6ajsbxl5cpxlgp84gd1e8m5crmu4r6s4shlk4dr6ivlqjlq4naj6zz4mdm5n8h6gc58dztcnezop0uu5pejx9pitcnxbsbhxg2vh67q3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wx2nryctnnuo93b2any5cu2sio9b5z228woe7o20qd1ay98zs2tew6xg8pd8v0iwu4yzpot5jj3mli9huw9ga1yebnyoxq70lknwu8p4m6k0sn38rxczxfrqz9clq8t0ibecdkcyv9x0muan2s2t71vcw7rdb47d',
                responsibleUserAccountName: 'rfv2sh3zsuqc40p2bmf7',
                lastChangeUserAccount: 'wwqitlz4lhit06oytikq',
                lastChangedAt: '2020-07-31 10:02:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '95w56813q5wysssfu5wle2qryvx0nbyx9jpjh4ja',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'vy2mz8l2jquxxo33vst5mpy2kstimopua64nxt38w5g7wio8v4',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'd2qr34kjzhqy4n5c6j2q',
                party: '1gl38umjphsmg2w8xdeyb9ee59ozg6jhg9w27iqccpr4k9lffj51ihzamwteb0xc6ic9hrzbzhkoc4x9wizt51xx50bz04f4vifebl354k1rqw3r17klza3buya9q3vrq0abbyb640abjgfadpahlhbdnyvoyy2e',
                component: '8vu8rpskmq1t8bkqw5gtn4504sp8bgmsunqjr7lhmxro64z517c66axcci1n5ximhplkgwce7k7f17nha02k7scxh4a2su2aek1tk662e3b4id9kujxujfsk9b2p45t4293zj9n6q6pthbc5xd1291bpo4s2qqsi',
                name: 'dhlixwse4offse3gk9cvx8bkvbcgc6t9l1w4tj0kahk4xxkdwd8dnbnbpen31bypsc0x41jsbxt4yt95t9gj21xwxxahhhfqftrgfytl5kwdatcd2vrbk3zw7d1z23492qbxazddwb5gvcwoxqv9mo9gdrymd91d',
                flowId: 'oupfc4m2bkbwrk31vczzwoim0mzt6iyjg1qwk',
                flowParty: 'j56efs2hj8653cqxfky01j5jd6g0dc4udtd3r7s281ecdsitv5cg66dqgzv8bk4hlwdl7nwpp9ohfega3v6ih0yabal3r9l9t1idhsi453pf8ogp0qlq9oyp7h8zlh6hhohmi5ggflx5ggnrleug7xiyy04pjlz8',
                flowComponent: '75w60t9bxg37t3qnh8y3ibn60mhnu9oc9z8fx2jfoma8xo59i7jqqn6d2wutkklgcuh9he3k1vu1ytk29rhbr25wgomj1hlu9q3ptqclnp824ips3smqmqfn3mx0c30g5v4vg584z9etiex9gia0w1xi7653xify',
                flowInterfaceName: 'dm9rjg8slocqdof3acnx6jaz8ppmk3b0hzy52mhjzv6p5t5p1jisrgrjitrnho7ca5y7cqqc098zlnbcc5h6uxyui08u9bno4oaykuxcm2tm1b1jxqkve9oelgi6fnntk43k9m5fibpxkauti2mmfwc2xm5ytupw',
                flowInterfaceNamespace: 'owgxxvbhlnozoq2ikpv346cpzg8xojoyvnsag1g9uvh451juj9iry3avzbdmhfdl4pyzr8xu1bjogrzbqylptajpa6mix7fhi9yb8b3716gj3pz9ens8n97xts6pw6i5w5ozg7h4k9qyh36203xrqubzmu9qm3nd',
                version: 'e1uvg14zv1x3cf4rp74p',
                adapterType: 'jcsg2p7vba7plc0pgpqak60gkhapgd89xnqebt5ozamovt1443trdbq6n5hs',
                direction: 'SENDER',
                transportProtocol: '90wdwgfbc5dlted859ii53wxska90zrpx5zojl3zcsqmd2l6uspgrurqm4z5',
                messageProtocol: 'sfek7d9ksa8goyfnn2ul2x9vuduprymbm9k3nt9thqhpb8hskjox6ihmdtcy',
                adapterEngineName: '7x3a2l23grqsu2f1tiutj1wtxym16e7bjc7mfohbez8h3kgt3lzk1jb6si8e4wkhfm9yrxs6grp4cp9ccf0c9lc8gf251mj4vxk5no8vqj4jm51ux7193plw2dwv20qgl08e0hy9q2e2idofegthq52krrwslrhj',
                url: '06ep51dd0tvvl5dk3tmh92ldaqf2jjw6buo6yzujqc3o5sl1b1zij3991jgkdp8n0x69d6vap349xun586ghppv1vooqoz1ugnora79go2f0yyhg9ojz8txc33iajwt8u13knrsdwz45cjryhxwq0m8dskkn5z704565quxuemluq2dec0kzsagzf9wes5xjwxcz49kqxwnzothbqu5ntvj27y3uh9khm7cd10xfd52ttzze1z2dkpc1u26lm4dfd68qi0bm4tyencpn0cklqsreo5ms6ldamgsjbtc5feev13bwovsu0azvgpkdg39q',
                username: 'jc81v2tdoe8v6jrkupojeu30fkr2i8gka0ynjexg9lhyyvykukro4au9zrg7',
                remoteHost: 'a0zw8t0mdfijv6n5k6cmdst0hb8mp60oj4h8clw8znhq5cgb5spwf60t3mif8snaa1n3eim2mmm7dmi93fjdmx41hu7b054s7rvmquzr2v8sj7j7ihsa3xr5j71132k5rp31q53xh6sehnei74l72pt7z0pgpplk',
                remotePort: 6340749717,
                directory: '2f43on0f1kspgnkgg4fz2vq70g5v0l2u33uvv0c79v1naarg3n5iduiamlaumdvetho31iv6wktzeqm677zqob40y3w8i1sutdxi17ygp5sozcqgqanpcjbs5u3uy9eoiqdny7a7ljfg4q8givh8q85vd32fauku147wxva6wcli30chdvff6uaqv9obt4qlxdhe6ek11sakfnhegvn2xrottoo1qx727oleawh99gguobzawzimk8xb3f6r4sv1uhtihy5o244xb78f07xr0icozoflb01r01gxm09li2cattdoq8ncnvx27wrr36p9qbtjjg3nd0tzl5hbxms67sj9h2q1dul3vqlx9py32fyhy3n65gec8gu2zci65a3u72ape5suc44g2lsbepd4upxkh6za3vqv7t6pv00c08ln2p5hldha9vfl1i5o70j2w4scz3lw9x3k8pl95iryc425k44kqjdkrywyxoahg4nj8xda8drj69lnteseyrynxpwx42e1wa6jr40wamcgt1uvstrzoe7qryasqsomnz80lhxt87xv2nyv7mey5fvyb254k5j08e7zrzwc2jbqp8alnrw0x4cmno23eqpfni2yhdx8tihnmjokarfxar3pgyth5wwe4ionh7mxhg5ykd5b6sva7jm00mg1ce5cmziwtehn24882ns0i654ss8ikkfff1dl9jja3ojk8k1p44jbofj4djwpnsx43lf2tw3yn7q1k5tsuaghub8l7b127ey4g7bv50xba78c3dfktafnmvu9uqno1a5vr86h97ulplusu1s9ogp4eky3uzwhpju50x3vb3f50w8b1al6hkysm1ff9r8es048i5fgdgub3gsm4rvvmd4ohsxpwshjvd3w9tb9cihmw4ucal61n1t8z5caqcxic1yv8sqzex2tgeud4zs3bvyibm9o56l4q2idx24mrxn4q2am5wxrvew1vy6kcgmy5807g2o4ditw99xdloq6s1u0ctrezcf1',
                fileSchema: 'q6qu4ejl20ee4i1g7v0hyyyupg1w4rhfkol0f5g42xcy4y8d1023jyarjgg4dbjvchioh6yd1hoixrs7hdouxm2z1w9cploqpwjv33l8708u0y42okxc8op76b553wrlqddiru09bgn8p5q4csdjczto8mdjbn85y8lp9e39eh5deppapxdhfm7rpr8yprzt31skh9qa0w6rqn1s9na1wzoz5w6vavgyexns1fwssbg91e2cjo88ecgcmv0wvb9b22tq8bcyvsswv46b5b4vr4fmlbqkerpni2blbkt8chbl7vitxesqwapujfbvdbkrpw0ygzvb31xf6o11nn71izqojut0pe74sxkigtsuz6yt1jk65nmow0j8i0u3vq7qi1ug7gpqgdedb9yyvasxr8jqutd8g1md8lv46sehet0m3gs0exmaysb8flilh9dt7fsvi9lm9q47e08q88n8vkyssxpn4m8pdzaf68ybw4j6oo7mdgrt29xu77ahmzaztgu40pg7pfel6zlcfytwhcvs2m1jlver5wtpkjy932dl2jlxkmh78jo10ifz6aicye7br9ijx3jco9khknqk4ip5alyhre9nkjwaw4w7udrj7roq83f1x0ucvkty4788utx11gudumerdcp6s5gbru7wbuirr6p5scjgv1bxfogmy01it49erx0azmeh8qj8tccvr20f24zrm2v38g73k645ptbcgfmfksw3jukgmhvr7n7rdp5s83x8mkdef362sdcr2d171085noivdm9qxvz5p7s5sjhf3p4ot1uamxiw4ll5bevr64o633tku776rj561hqnkp8ch1z6r0vh4vz4pse6ajbcsaow162vjjetgxoj3sky6tdbeuzjulgs8nlxiinmh08t4sxgal8cnn4pt134wpcr1997j18jrfuslcyuxm0k225rg1pc7sxvoscdb1yoffhkgv0g1w8skg0a3najr0thxu6e4vl1509s7qxwfaiwhfpyiu7fua84',
                proxyHost: 'z7qfak5xiysdx601ndmitjsobancvq7e3xpc7yg5cw5bfj3wr44tvohfgiji',
                proxyPort: 3102197269,
                destination: 'l4fx7z3vk9ivou575hrggvd85f74m421e48u2unk7fy7xurbq6omsoltxwpvypir0ua6e1ko0yhxx1uasrwsmrzcs7y30hof52flj0khbzgodcle48p06b4fevbgpzc52tfuyae68fa3t2w6alpm2ohgilxxwfi1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n3tk5o8im6y40addr2kk8ck9hdngbff4z49mdior82ujjze2edh26s6lfydpnrpj2k6pcxztmjsd4c0xyhxvy535uix22pilbgmmijnk2nwqdj9vis65csj54gbyb9rekohfgol0clkqlha1xs338q3rc56jfne8',
                responsibleUserAccountName: '9qb07w7xgazeefmu6psw',
                lastChangeUserAccount: 'xkrhdeay3vs8k1izu24y',
                lastChangedAt: '2020-07-31 07:02:04',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'fczonaz7rxrjjqeap4mwmn3ryx5wf4horrl8o4uq',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '6bq27sluxb03ticj25mx5rok83269qbjy2x2c6nop85p0uh8bug',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'fsr6lkca1fuyolslp7me',
                party: 'cqze2ubaagg2d18a1xslw88bctcaid9vwnwxy43ej6wtpoi37fc9k86dij1kiot3l6bq6t5hkq56f9n9ajk3trpoz8g7gkt8007i2eii5z1ohcuun9tzny2pjt8xf1rg4w11gks6eucgkhz75e3y91p990n834zf',
                component: 'qp2llyojlenia0i8bem0q5uu44dzfr2732hv3ytkf1j6f6y1bv8zagxjy10w0aenx5ltgpkvg7bvor4zgaeazsjx0d0xx860lorukzdgmyx662n92icpnlbbcoqylozx0mfawlsyxxd0nswe2klwosel9lrb1daf',
                name: 'io1r66jyo10s6yn587n0y2o32bcwzrsycv1vqn4sgfpmbjexwyh0jua0s82el59xd004ygj6h03ewrc9memun13bijmovgazauoe7gmr08u2l9nubuoca2apf50lj252xam3m0738dbau9ktm6hmui31vqgr5vvk',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'k5lqv3vh68yvalpt39ut4gd6qwb4djh8kchs0rsp5bz4jhk71aolcjic3gje0uy6tpofbeqpd55r6n4ti40bvr8o0sv9b0gnrr93bvfctac32l1jffztaei74ofeu5wrnsoo81k0udev1xt4ry93ky2zohkjlucd',
                flowComponent: 'm4ccz9d29brxnnne6g9rxl2qc7vsxu1l4yh2p7o4e9fgkxl7499dwwzdudrp3r94memmod416jok931kdq1o34rsto1ff1h52bf49j0onfb491aesq4j29j4h5gfamt11xssfr8vzlxxdg59pp0yet0xk7i5y07c',
                flowInterfaceName: 'amnf4003wyzwy6n6qfn1uwbsugxk6mgs9wkbq5jzfdo991uquyhsypmu0cfc0fm9jec9ee249u1id1t36z2lrncck4t2ax5esapb1bzmhk9p6zql7cgzd36o0wc3ofu87fbb5fvnt91djguwny372r47e9yr9slo',
                flowInterfaceNamespace: 'q5tzda5z0haxmu6ff234tvs6xrsiovky9r82q48hmujpollrfx6wop74pvbw9nigvb8m6emryg9m0gxg53i1fcvlad5m2lf1jhjcb47hspofih45ywe4u1b5d6t0cm72inp1me3zpr8y1q2sn4fn35woyhhtvvd3',
                version: 'qp78gfonskwt9bdd0w6z',
                adapterType: 'wrrc1kbjx35cevy6xx3mzfjdxqw4mgncq53z9ifpfvmjsencwjwnlq0oyjed',
                direction: 'RECEIVER',
                transportProtocol: 'mraojs9c5c3vxg11c7832v4t6em0ymg9cub9oq7qbetkwotoub1b173owxi0',
                messageProtocol: 'is4vudgz4abvph1lsltw6n8t1ryb91lr7ynrfxn39zepfj858lusukb2r6m0',
                adapterEngineName: 'nne7as5fe05h91lbekyejujzxkyc9gbtnuf6ivxeea5hrbftnftmaljwis0u0gr6qsu4xwbntxj41ecl3t743s75o477dw62klaid0v0o3peirbbh1850rkxkfmmp3b54elvswdo880e7ewz2dlmjb6gsdb5ua9t',
                url: 'xkt72qvbpsfk89jrtk9g08p28a6xjgzujm481gyve1yy5i91e4mv7op9gq5zpmyn1l511sd44vlgahphv3fxpvhd9f0xizbq493j0c7yssgs8ztr25zn2a77hwn8brl8lgov5v9v828y8a89gxasqp4z55i6xfiwd7w4qeoy1pwjnomvt2tldty499alnxt77fze5fv6qrm3u103gno7hr4erir81svhg2gq97drbnlzajnhwf0zohl6u2ttp3gg110zv0asahisyalxfn5q29f9md6xfb2qno39q1qymq0fal67pbde6lvgewz6jtcx',
                username: '7r91llylyg1xjc8jac7nimmxy5whoinvs44drpx3vd6z06t0k8zuge9wl5v6',
                remoteHost: '3guhhne4pxlj8lal5djquipucztzp8pud2mvytb7cgdf5jrx8ypthpub0e28ncwfkk50ftzjq9gjcgfhty86delvy7d23zxlbolnvsm5qhr0d7wjiad1oipnhfgvbnrr3ubdgd4oj6h5r3yrh6yitrwvjd6kx8s4',
                remotePort: 9026600808,
                directory: '7jgvaaq79dx0rzu0m92r0glzz3347erp722jomghej64oj6dk1mvnrlhombfk26d6rpxyncde061sokcvdkkbi1b0md4bl18ivwt3oveqpt7h9k7wvpvhqwpvfj3cc6pdjbvooh3o0ad2tjgh28xx1asqwerpia06xfjtmso5t2lvyukftw2e8n8yxxzbvsga9hki19r35zhujhi9p67l8qf57fdh9zrmtvx3ws1rfl4gochi34r92edhzsnoczqeyer34or1nzvlojlhy7oa3ymhm3ok8y6bdc1ntxcom41ssbdwqfxodpu32kn3xgj1vsttj2xemcbwuhnb8k7alr98lgbakl3mu32o2jg1v2d2d4gttunqn24ogriknw4ntsiw3mxlnz6n7hn03d1ewwgw4xwxwdatmn6k7k2aqhvibaxjgyvm3ui40ectona7htqhyjfx82997fe3rvfi4s0hrow1pq1983g6ljuzm1nqz0eththkfpfilh19gsxxmsw0s1eceg5sinwk444fbcjrbtlj595jmwu4bydilwzt45iliheeaa550pocu6deku9cwpfzfxkpnxjxzruozsln4ojk7r5x7kh96vzo9g5mbozfkeh0cqpseoflnlzo0yfkdfpt3am9fziozmqesurtnlogbnt8rcftxfon93kjt34rjmttkktj47znx6i5rygx9s26lymb71t6tram1rjts1k4ekp859tgyet5l2t2ge3e8lgauccow3iyfn0uqsrpvxp4elz8jpt7xkfn3h03dindentffjonaym6wsz83p3pu8opsdgotias341avq30dcuqt5sy9wfgq8qxq64868j1t4uhmd156kts7wa2606eulzcet7vggnytihdwps3jw4ezp2q4h44u4nqybl6ll2sqcr2f00eddyypq2h285douot449h4oki8ot70e65xk6km9ybpgddlbxwp3qu0clplm7g7q81tea21w1z203v1pom3jlaaulayg5',
                fileSchema: '7x13ltrrhhc3fxmjw1rt4hph0um74wql0qlz28rcvjzcanomr1u7bkyr7htt0l4fig4wcvkwvp7vzpo0rlgb49xxxb7zmske9b9d1og5hmpg3l0dzoptcdkeppcxqwbgrhj7ypigsfae2qe4qkce8pbuwhzorzvys59wi525nge40alg007r7z4y0z4ykcdo4i8dj70fns5097ixcnyjp49zkbncmzdsnxmmt01equjjoulp9p784hg0wx93m69frrpydwqzfzgvc2rr4enzijwzyyaixy0wfp9qbqcou200g43sc5vvirdf07nsfg29lawyp4p5et7s7eoz6tayj8lhrboozgjouqcoksxu7jzxw490oz7bb5r0qx3ufb51lkxctogshsq87yhhsyacfy7od31xrke9113a97pjphhl9r87d201kyomk39sipny08n5zv3k5aqrrrmqrgns9xa13fwkym2x3jmhjfpakeymft0m6ovuoanc76idf7e6ckdic0jc4v6xo5c2wkzaajhw9dkwwt5yg2few03wch09abvknj6k6695tiibkmhh8gastgkbngjz0x1ngqmfq7zzm65cjz2s5pl5jf0kolmiwo95p31muxzxhxvgl8l5n9p8r3d2o3mp8dcpajv9qmdybx3v1humm5nkew1ywvyw42e4v5ntklx771tcby2dzh7vzu2adu6422dcscr4mloprj7rsq3mhde9jn2x627pcy4qjps40nedzl046vom0ldub8mpvy6e67owhfa373j28hgeiiaxrfk81qguha75ho9jo1tqv5xxq0n1s60bwg1hhjzgh737y7lzmla7dpxt6xat0m15xl1oi7gllptz38hgow7n1vxanaooc4bmpbn8dycmpzgq5c4yczsdyw83pryqeq89cjms636n10rrqudeba137kx16knds3faebe2btymtuh8a2j3tshsrunt0omiughwy3l8033uz7uw41m8tikjlj8vn5e94fyn',
                proxyHost: '1r6zqfmb52ets5dl032ogjfpqi7ik99orgijjz97pnxps4mezh741cw0j8p8',
                proxyPort: 9747335045,
                destination: 'a163msqxwkbtkk492ers13k5ywr663a4x7wilzep913madg0bq09pcup62uhv452n8v1xvdfx9t0ssepg3fnk15s9716mhbuw2nzj0gip504p4etc2n17njge0ecwx0mcnvm9tlzt8vlqhaz1d9m1a90e9q5tbj2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'j93rrk4vm3bwpsy7qa3ys6nqbzlh07ao2s49lbydof5a6saaf2kdcexm8aha5mdx15lzpyxqo77s66xalm0k9go47q4m5dchcdcr4j4bvd715b40w46ripzwoh0m9ydfh2a61159w8lunghv2xodzm71hyas7n15',
                responsibleUserAccountName: 'fd4yqzudjlhp7xv5tilh',
                lastChangeUserAccount: 'awfee7ze4o1ruuruu7mc',
                lastChangedAt: '2020-07-30 23:09:52',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'ba4846ixg9hedr6n9z6y92l5atr4z2l8nvmmfk0n',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'qpx31yfzx2h5foosjot9qsoaudekf4l0qtyzo052atchhyhhco',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'pgssh7fhwg3fh0dqjnsyp',
                party: 'vp2to6h2k88uegynu9cgjt052mrng8ig3h5entfyy9lta2i8e4ry9hrgpzo9r8ydtwg7evil5a3puos7cobe6xt5k9fqu2q53hrwcvnz4gi8tmczsz7f8v2hi9nqv1qfmrtaoir153tg8zbt4xdwptbuuqebvafe',
                component: 'lomwrz0zj8snhjme3s5tqg2uup7pnu6p2uq6rhm8duguiirwe06c91892qchh3rvg3oxeer1jvcf3mwl9owcxti9dykhq0wq9nsztqvh0muu4ksvozvoi0zgp2rxab0i80uv74d4oxpwiksl3o2b5ndrxgtjlsm6',
                name: 'weghu0v1wj76utqoasg7ads357aovf827e6k4hwalfpufad2qnpln3mdwdoqcyn7oysiq1tox28tfamhulwyvwcrzgjfrpv8nhxf6g2xxilcv9y46tboovgrnaah7cccpi3kh5wpcmetnfoeyj3rlhiksjstufft',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '29boknprd7f55absdoaya91cgixy75g4re3xk4kot9k3js7fdac0xcr8ywy69zb352f34s7l8byiivq0whdj9ptmkvla3vmu97gbkhmbfxsz43sz7bp29v46zr1ez1us6g9gybucvj2alcf5xrw755sg98daonbe',
                flowComponent: '49x9wuz23qfy9l8raquqf4xu7z0oonau291h29r7i0qf938hiz060fwry87zcoogztu83eqvnvmy1sytpxc3c89m49yrtoc6ixk09e51o9wyv0d0tfjz8ngmo59udvrk1gx9h3zui6rak94y7mjyhdxzpshirjlq',
                flowInterfaceName: '10ffyh3jwy67g4atqiwatqgcrg0u9kl4fqn8dapaegnrtcew9c8tdctp02l38zi0io90nncd5p7b8v32eqa2j3lkfjqmjekuh3xyzwbq75jmk5t5wug13s37xk6s8b3t4t2vc3ytsl3vhkborpxbng43h6s3jd9i',
                flowInterfaceNamespace: 'dbduynhrkzt9shmfz2xgqkqu932lhkt30dcgiyz77mtpmxis9ctolwkrgqbdmm6pjjb1r9x7c0qo9jak591nhdlthhv8cblz3iufc4t9dldwyxp57wvc4zmakr6tpu3go2y9n8vchbhkhhw2orayew0rk5kiu4fk',
                version: 'tasvup2j522968ky611o',
                adapterType: 'fhccmsxpk45xii5cygn5y3jmqrh99z7geuqlts4f5lvsf5xqk2arnmy5l2m1',
                direction: 'SENDER',
                transportProtocol: 'sy7910do2mnp2gk5myipd6ut5vqnros2i8s4u0c7pl2su50l4691lb6m76xa',
                messageProtocol: 'kus4xl61d6v2ax30nq1i2txovhjr4b2m04psrdut4caw9zgx4p4v6a42bdbc',
                adapterEngineName: 'm64k822eh9jd1ih5i5if2kpzgwkltpyp8rc4yntxm8esr3ye92ocpzzmp3yf7mnsmkuothsmhzobhd8v0xsiycavmnj7inf32p2swyoa3aqu36atohla7e86cctw1llqziyl6jkfeyjcwlr5oy0pl2639dx0l71r',
                url: 'yiki41eajvml9dhn9skhyz8ifs4fwlewvti9ea56sxa6zms4vubif4ktp8b7kjncxmieen1gni484uv4fxuxw3vmnxbyzzkkzbhw3lxjrmtw8ozpeswleqrk1jix394ux7c8tng6ih1zsuintrsurjpa1xsvcmm0r268658benv2575lysnfe69g1jjykgnx9brotj2ri2xam22uzhp56q2u8sv7dx1oksff2sj5mfrtwj27v1zlcxc22os4x0971tnqtw34dh7ojca0zo891j3lfdtxey0vc3ysuxx5omc7m2eec2nivkyu82fop943',
                username: 'cdov2kxvyf8t6duicrzd9toazy84smiqf7svpgpik1q5vi2xnnaxt3nd9na9',
                remoteHost: '22q6zuso79q95mv1v8gqcn08v4tm4whbmrgmyctjzvldnkjflcajybd32xbc0lmib7sjcj62l9jzk02lo60x81yzbmrswtp28hdjf60e4v0xwo7rdir0umv2mle148wsqdudggbtbr0ic1ls9okj9o9ok3h2nb6x',
                remotePort: 8608103701,
                directory: 'b95eshre5fwp46nedqbskpj9q9rug6kfj4tjjbyl8r6eovwj03wkqoqenzi4nngefedxxzhh68y4lqsht1jr4cin7fvrfjtnu5zbd9biwbd2csl53dh9e92asfsjcitnb52d5dvatg64h8f1mfp3rri57rhmrg6slwbzgzk3chly23u9whafc9v3og7xd3y34bxyz2bg3fi7wgmpjuos2i867h9vbiywncrwi4ynprv6tr1rp6lt63z2cnd7f5g65h80y8bmsfrucladsb5px6xijngvbdsj6edb68by1xg1mbiuty0w105wiqf2v2ec89liqfwyygmwlvlwxh0d1uimns0knweeanap487xn03kv7vhcpdmobfn4a52f2jgos97bqqs036p1d5vlagn9od69i4bjecsxpp02wnij5bo9xhznbzabelpbkjvz5e2me4hc71aw86n6e1wgu28tqz8e83noet0qej8ikdro0nue6fzangf1k4jz7nfn635r595zjtq2blp9nbaymgb2l1d8syinr8bq5witoxd98fwrrt6y149428lu0j738a8a62mtsf6at5fghqfkrl9vkrgngikhvmt07k66bx719hrqyk7mpezus4kzj8jpmoapmjo7lrsj4kebgde6mdpqzlcprz98l8y1x11a32iwjocxgsq6tdwmrhaezgx6lc59ty2j520ssb3dydjs6ro82qw4g55ycifvgilzgt92eazkzxmd8g51g2fxjidzkn5w9ml5z7k7qgn3a73fauomyyt8w1ssrwp1xubfyoqssulapt2clat65lzons3yphvb4su0u9tzo8cwtvno6q134ana2dlepzoq2340vv1h2jwonxstgid5b6dk3jcgp3v0mjdzwf4l0i693x6dhxxxuwjfelut7nwgg6m5pzo1ugzckxyd905vnh0hquzmczip5s579ecn7wrh07opf2k6o4a3dr4reamvloyvllwzfk04a8186045p7i7n09jaaf',
                fileSchema: '6s2bs37vjd17n4x1wxysgksdiqyqt4sfthrncavovos6sqg3sjae4n0lpse6kpup85i3ccb4fevbxkq2b0de3u2i1o2z9lkfg9bf7o51ow46rw2f9wrh2mivq76ovrrwh96vc9yhjmcbm0xz66in8m4imw8f0wc88bhy2n7wd4ttpdciun4hdl5fqyq6hj1uufqy3acr2p09xb7fgn0l45vebgy6p8vmhr8ctd58sokfg1mqkatta5l4cmghh9upg5imiw7zeufoxhaogh93xvuvfb9tbni5ja1vfehjhrck8gg9idchu9ldzvrllwioc80euuzpqs5yvsr9e0tf06a62hqryviceyqzosi6j9y8pcsy9mh46astoddr3n2rl54j08xt0om5xp8xy2j8cecr56w8kl116skhpohcqfg8ce4dcxd9edkzfiwykje2j49natxjkua3lkce0snxxlsr6nwhgvrsriczh8lz27mosryxb5vwtdw1rocwjhk0624al7hdteean4grb4cblyh1qcxyus6b660rwuyg3t5cgmyn6rg8s5rgk0q11j8urp8xv4fsjnk4b1j5r0dxvfdztyg2yhaub8bbvooxwv6nyfszax1hbzs2hsykbmv224akzbdz0ctoa4gosjtf1baq55ahlgxvddq8z2wn4zej3lnjzw69pnaijg0xgtpuiln6yna9801myy76gtdujp73b7a551ir7wj484xg4oodaofv77cozprbf7u0x726hn6i5bntz3qw09mcyucpguj9ggg28kcau1dr4lgf8veztowxml1stc8gez6s7cziurzf094fmk51z9sqoxl4zaenmepvh0o03j17rivcbxmygg9yndwe7sxbcepye8nho2xnx3nrtow3z2gvedohzjsd0sy8entv2dcu85ft71wwotaj68hd278h188yv16eu1isl6pmcgh1pspowf036mnwdvhst1boch7bf6jnsqqh9oujke75xlw1wksuz0ws',
                proxyHost: 'wlo0pa5x7hudu8at1buvu8ym4yox0ndu0tekw4z9mfrl0ylwr1smj7a8zryn',
                proxyPort: 6560698893,
                destination: 'f847stubcgrcu9n6q7cki8bnwvhlwsawn7w54sd0s6lt3fti1xrw61zetawuo919dhyolgpnnyd9apgthth47gu0ukh1ai9ttksi0m1fu1ku7q0m6wq5dim9lfbfuvzx5u9kicsf8a3w8yhp63v6rg60sh1tqpkj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9i1a48hqxyywtoqlmgvhszhas6zp6vg3as7mflxlu5tlbq0ktogok4psvwfdwa6b61nqm3c8wdvvq3onj3st256g63cyoqytwqb408o5u2uvugfcx6jrin3xypujno1qy41vqakjmovyr4hqnsw3hwdzn14wyag3',
                responsibleUserAccountName: 'hlqpt4ufmr748gj7nl5k',
                lastChangeUserAccount: 'lecsqzrokvjinzlg3s1k',
                lastChangedAt: '2020-07-31 12:16:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'sd8k0x95rxyk58hhpcvmfdo7uo19pcc2brx0wvhc',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '73awzn5typt7nkquhcfk67ugy5jlw51icf0o324f0pjvyi86ne',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'az7ilennplvhnki4rwon',
                party: '7qd8qxyeurqdvs2ga9pk3kcvxdxaewdr498xnsthnckdmqtxo3vaq8ahdeyt0maxpd2nctijfuex3gqzieylp87mjfgyj6vehxw9pgvr1pxuhe3wsyk6gkafs1yfghvhuo3gkop7zhba7ag8pi9qia6232marhsyc',
                component: 'kf6tbpjh4iuq0muej71jlf59d17kj8otunvpdnntsst0lg91lo344yfractux05f6mi76j1u84flic65h2xfwcm59ckynsi2v9bvyhsewdy5r3x8kk6z08hip5dmvh02ywxhe0esrgq9u6kpomwxgi9tmzxblt4q',
                name: '7ulv5cglhzsw0f2d9qex82z1i8xnu40kpftr0yy59jpoh80erj1veo9o8dcdbs2tzvbklh52mp4mcywwer59jr1e532x5b9sz06e7bavjbscabsf9g3wrcxuh3v659b7ofkytf8cpue95ctgoz532a2tflfq51uz',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'ggojxnz4b4swc3nrkef9bnwofqxxmc86g5rc4qku0g0mbl91a0mme91b8im2zeotgeqin70am2i5djor6n1q4ldb6u58mbxf3cply67pgwck7g12w8ke03x551er2d5kwb8t30nj92leks1bap1ders3r65xowtg',
                flowComponent: 'qc3weiwh227shkp6x9sg89duwakf92wp8m8ltpbwqcnrff4jszgfec180uzz48atvkwlkxek8315i6oqt9v86db8ui52qvpmkno1mg7du092efg46eydkl5zbbd48avxrlj5u2tjbo1gt80cf9snh2oaq5jslaev',
                flowInterfaceName: 'buw5czg0l45tbaf782b68a693f80tvu7ko4kfjxyyt4utalf815t0yfm0pjacj82uvnwacwgwmlqs4exajxp5h82ugd0bxowenn66f0cl4cxetrve3z2sqqqb8j2n6fk58jj7hm0axzh4hq3tqaln6qrur4fe3aj',
                flowInterfaceNamespace: 'f485eth31xgbwvfzkq9fvck19hjh9nwpu4q4uvjcr1y8bax866y3qbhbvtmmfuhwkwsuhg73ea7g3w4j8k73ku33qungoxvqvy7oj2grms5hzikhuaayn34h40zkg998lp5khmvd3frwttoehep9iss1kppr2u6h',
                version: 'wnm0lcouwv2ijmjjhmxn',
                adapterType: 'x4a0ngrnwjdctgndarsmfrpzbaexpmt72mb8it86un106wbc7ueh7urk3oiv',
                direction: 'SENDER',
                transportProtocol: 'saz9bjicf7t3ix271cg0y7f2b8rwqeioz5fblkvx89y7zu5ixw6dcdlc7t1o',
                messageProtocol: '816wngb7mkg061uerjjpf4dqw5oyykgm3hfn6ro1su20dsfvl0ziu80ikvst',
                adapterEngineName: '0yxq18mcaz0vml9nh5lb0e21r6x6e8ftcodjxf2rkblhgwtexiu7hegyy92bnnfl3nfqckexiqzpf70l2cjix4t5x5ular49kjcl6z22czai3l2gyar3p4pozql1keln8ci1k50yscozroo3rtf07wslhs5vflo7',
                url: 'evcu39fs9hcv5vvzcdaexgcmdxplfj9jjhfo90qwv3wpnceyplvtturfow6s9sz7e08gg8akdlvqgoq93brvg1xf5340n7c97o46g6qilkjljq1bc82utjk8jrwzfsvrrdhaq7pwn8nay9csm9xpk2z9pnipf17l9ff4rmh5vjhacczoghn27s7fhc3s22v63nsxj7bb7wd2h1j7ccens722if0utv5s2k5v73yixbize9h62cagllz0gxjxxpnkalyajekl36vl8012o5auhnlnqpigyu215j8y4mybi9w0xp2ur84c7v1cv2stzcas',
                username: 'agl2nk0vbdlz8b1szbb2nk2duy5xq93g8vxyp28ffk5ecwk8wzitbeeha5rn',
                remoteHost: 'f4lxi0ruhnuwtjhkph07mqv1n8i6e9kq1r1it8lj8mzll3ady14seo82yctybtqd1nep8h8cgubyjgcdmjc26qcgkk9yy5i0rkgpyzjt4umgp07x11u4ilh0gnku2et0pr2uqt2railici3gfymc5e5ynfh7po3h',
                remotePort: 6543203457,
                directory: '17v6new8cun635d8ilnhfsctsdn0mi6fsrlxtc5erbqprwcg0c3muv01oqp8cfcn4cy5ficgzrky223dqbsb2fdng3xy4008y5v60ywczyu9bhzuvq83465f3cy5wr0vh5vmqp24f227a9x8lnpeceit8uwhckbcpbcwi0cos9gno25z7w32kvnaht2gums0c5aiqbbipea51v2hlvtjietkoey2zr7j5obohhbv4n9daeg5msjwnif7pdnbg1p8906848dlzk8debl1iy8kj08kat8c16o60cb42sa2pthzsjv1d5kphnbzmjusg7fg5938ua9h2dnbo8y4ng3uxy9kwyoso43ssyzzl4r3ysnz6f1de34bswug8nr3w4i6l08v3rbd0lbaani1m97d06mifoo4jddk91y0ntokc9ctvjq18v6cjkbrf4jik5uiieg2ahpqg3tvgptiyjask5y2cs941yie2s6xkmzq9o3c827apu9ftp95ysguni17zo86taqc984opsqeu93wzhoi71dmab6ynm36p3hhhqnm3vd9bosed409wghgm2ogjnhfrq3m6ljnfbbactdf82whq9i8v1txm2g0fsy48anu3uu5si93t18a95fee8zq7wyme824dsgtlpgm86s65gwunmg2mvv3hm5vx13ia0mvxnwf6e871mr43plqbzbfw1ordx5x5nc9y26w6zvwx8g4ocnw5003yfr1yb8ttyk4t9unlmffiww7nyghq23aumcyfhp5ejl87w0uki6h19wsfnirl0cblusequow534x62kx1u44hbvorew4zv47mpkhpu8n0c6kucoobnmw5olc7y690fs3tukdrsm9rv9dc56zo5rl47fim3mhzn1iaqlw190bze18rn8ldfdwm1woq4hlg9fm9bqr9jj2c2akcd1q8zewyw4hbzue2bbu5rhvgm5yerxymnmgwvcma9n6mr01d4oi6u7n4o9vm8v8xn3o3mtflnbr1h68uwvn',
                fileSchema: 'h40fbt43p1pbklqvm4cx1e3tdblaixjmyydnegpaeoqgfye7bm6ddl9u589qy7h7yp5eq7wxa82vowtvt0cy0z6vl6o3eaulm6qtgbzh50lygsfwrfg78rwl5gbloyydccqwkbe7q0u3sefie5rc3l30kmazb7i6hngtboryjg9mffp0xbeeb8ot70hs8s3bbdafh3thq16j5nbptp12ppast1zf8dhpy634xm8wogkk8jilwyfbs5qt8sxbq1wsh1vizawkg37z09t8qnsz6ny3hi6ym1eirpjlks6qkror59tgnav71ib5z4v081nfl803lu21q9xksiufxt0xnkly7nbhsrpt3vc0qiyxjw3vf4xmxxtld74gcliw55denhjhudke2qj0zendpcqr9m9hb86n7x9aicch26q43gk3d6xw90i0lko688387o4kdkjx9m42mpktq73pi1ktw3rcphlod4x27smpnx04cyf8fc204j07yy9wxp6fcw48511dgx70gfy8d8cxxmwi05f18cr0r7bkrvjp1wpzqzjaks6htlza09uxdxr5nk43m13z7w6282tl2wanoswyz14rlgfbw2y7agxy0v3avnamynk6smdfmswjp856xz844o79rpu4axfeaghdhpc5in0atjb47xctawmamrx3j3pgfr6kjw6k5y0eou0ck5lhuo3gn1ptu3qy7enpij1f7sjgylz0vecxj4uvah8r9r5kxn8vv8r3ntcvsldd69pjlcmchkxmpbmragsuo2a2rzg7swgpisbuup9w1t1lw0ytyixkrh9cwyzclgbpjnby0euew3hl9beoky2up4iddq7jqwtpbkvp2h41lkmv9qc4qr9l2deheu868j3jb45ui3iadjqpegwf60hl55m4cdmb6fzvbnjedu05y20xgw0igxugaka5ldannx7fts1axk4plvx7w3eikdi9rifohpi4k1v92a8rgzsj39tmn1logj43wj3p57ojuqfnpvwn',
                proxyHost: 'koqh7zp2usa09gh4nf0erdnmu5oxcvmc0ltc4g4kxyhyqd8kf7qgm9lcixy4',
                proxyPort: 5267994655,
                destination: '6jpxbo1pecfp0epipkgztx79piatw8b832rte3wjhgerx9xrnbfuidqx82eu09m00nh17c6nqtka889szm95drf4zlurcdek0filip0hdw2eqs7h6xe46e6lxs4317cwhx1ryib32n2zqbxskplauazbgwbvcp7g',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '560olkype79z64672krnse9t88deqzu2v9g8esjl5b1dbv837rz09hp3fq7u3a4xf4aklhr8ka5usoikbf8d9yje5ecqjpxlw66i3n2raletqcjhlipsffykus9bum2j5imu2emox6qoytsmcl7ijov9bb4634ey',
                responsibleUserAccountName: '2wvdpjtautmtb8e6s8np',
                lastChangeUserAccount: 'flzs5xz6cqv7phv3uu3k',
                lastChangedAt: '2020-07-30 13:57:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'gwo68ohbenppx2ttf6f7o8ps2glaxy1gplludbdc',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'vafdkvcdzm7rvhs41f7eo0dlqa4sk19nnie3ikauk5ucl6rqvk',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'ufkrk707v9dwpoaurybd',
                party: 'ixpeggsnn6njexqxrfyajstcndkh2ybq23xe54ndmli8wyn478gkqxm0xtaypg9c28cxuozabir9cwqeof2hzntr4gvcz1nt3fdf1zgq25f021ex1glxprbz2if3l88ji7z2ing5pafaihkuwoeryv0sxosn2989',
                component: 'j6t2lupvzw57k97tphvg6987ah98banta5q4dijaoe6ax01try6oby6beuwbzjwb0jo994dax7hst0n1bcjt086ulm4vvsg87xu72e5kqus76yuvimojjrfm35xbcuzuuzik49mw30qxs26jd7w2mrgulz1q0kgcj',
                name: 'kqogkhpjgpks4f9oyy4pfdgidc34rw6068u79ht3pgh8e60f36vyc16jlbiysd6ntlnm47nkg62nflho7sesqjj65hq693klfq0didulev1zhbpqg1kbt8cl6ad2jiukvws6o7m5wujsxzkrh8nuokkspddfhure',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '2bffgkdlh4buns4clv4f01f64mnz5th656xp2bvp9xtd03rq0o23mcsvr2crc5xvppxcb3gy7v75dov9oc6m08v1zgpqighlz1gzmb39uk87dq7tyjri2yxe67tdowxxkt8orroyj637gkao2kiqa9668w75y5yd',
                flowComponent: 'jr66myvuwhma6u6rpxm0whbfv978vpo3z2co3takdk6rbrya86t60qw9o83n5hd59niz69xo44pyeh0wj79lfwja0gudtk9pold7rh8dynkjw3nhljyj5lg3j3jvsckvuqk9nqhw10m15hx7u5dspqfz0kbgp3hh',
                flowInterfaceName: '4yxnco6j5l10j6n8kic5js7tc5k6ysae2lj6wrn8xjt4s7r7jpetcm1drn72gshyrhwigow8crngu89nf26jqrxjxflsfxb8weayfdkcvo4nekwvb687oe080oa0r7fvmiqqv1zr2b0ty2wmnwyeb1qwxgau68fd',
                flowInterfaceNamespace: 'q8mj8cujrl6hp4ip0pjy73921x64m82r0kgyop90t80g9q3yg511cb5dqbv34hp872lqboqexdfstyj1ip4b7b1q5r6ahmgtskjnemjh5b2koj9mib2r7pamdycm6vuq8y8r9pqmlpy047bu9843gci1ddaq8si6',
                version: 'u7yzzljdczq0hfrghp4u',
                adapterType: 'dglqhqcu2oeqbnurhy0y7wvjtjainny8pcklu9il03aia0mo89wc2hqr8fmv',
                direction: 'SENDER',
                transportProtocol: 'sjd7545rmcgqzy9y00t7h6lprghext3vkns0jgl7oz1kjbhbejuu3ot2ik7h',
                messageProtocol: 'stri4cc57h6aez64ntqii9q36paw5hk2uvlw33z1uhp6pvzkymgdkzydouyx',
                adapterEngineName: '1xqruxbd2x80ksipakavkst9w7xew7gocew7bzs5xy89rhtc1tk0yg5hyyqy2g9g4bpbj8a11bkh3vkoe17zrr634821iol0zyejizmyfv23y5l4903jbs3735jebsesa9e1q2fz9gnzl4igldt8gcvx61v4qq1h',
                url: 'nh94evxolwhd1q5hv3gxer11limpsazwhpgftce88n6pxnftzo3tdbgzqq5068hv2w9lol2j7tmebjhxc43lojx0jbqhvy4vqnjldr5gp4jot8yelv5z0hcwzxfeghr4jehtriks9r1vjgacgfl4bu9zsn7yq7ekz091oxjf17djmzpaxcveap5spdmezenqp3obamr9aibcl2ria0n5t8xij0rvqfp2dphpipm607pvyurj53wwbsaju8wl1aagty7p0h2dufr3d4x5cyh32op5dc38zyqrmsioygp9til5960nywc2jnmdelijmd89',
                username: 'uj94ru1f2cy06q09l42855p2ncu7x8v6p8b5qgpz5endomrhfaetdppfwnhl',
                remoteHost: 'q26q2fpebupqrxhwkybbcz73ctehxanz4py7783lpn2nw5183gg252kgjbdw7jf4qvq6zezvul7iow4ab66p2dx3j966f50rc85bqewbs8uwtlgduz8jx6ipoiz5twx849ectdreyream7x4x3r6lz7cxvupxujt',
                remotePort: 6630155870,
                directory: 'bp82pm3vv52uma4rr1oda4rqq1uqg7pv6tchu7ob6tajdli6hee1w7ejwgcd3ed3didi9lbvszhjmyvstp2kk1l6tgn56wdpqb6o9tredcfmqbvn4zdh85889f7s03w4daos9n9qlulj3mq43zjr1uac4x1jps2jeypookavpalkn57yksunzjs02hjc852cwholhlnp8982ex3ya4w2mwwmflfwpexoy1b49o0j50x5t49vle58lnq0ar3tnxmsmc1ahhfo5uyf8e5s4ejktjge1b3jr0h1eosydc7vcuaxcohokl12zw51bvnq9ok19x1hgxced0fesd25zoaqmiu9scitxish45x7qnnwwq5uqsevb10shewwnbgsvyxlkp1apcz14vu0l538yzvcy2fl0c4may3rmj0pbi03d4k776w4r96wmk7o7omfg07cpas5hbe06pchjfhtcgyyhiiljqs4t76t0pda3wvc296u0wvccbb4063sev25vji459wgo10nusmtu8rrf9gwbj9wk8vl8sag7aqa5l6oeuqhfkzi5oabw1kaogm0guaq2499oxxlb68aoqqh6ktm5c9rxfrlrj0qc29htmw8c1k1s5wczrka9kgglyeh13w10tawnm72g9pkxmcue5r0xr868zlmfqqpms7ewu4el6w0907wrjlq11koeskcc121g5bqivjqmgzvup35b1h5g72konfgwau3zwvu00mkhli4uaijfbxnuilblwzs5zyhk88z55hcivd672es2v01fq72jibu1bmc42ruigoioxs5fgn551wr6mg5aq9rzpf2gcvtdbk5mydhih96h1jzea9sp1vsfkxtghcn423yfjlmeft60sn8bx96ay8lu5801ojpxlrl3dpi0h35zn6gx23et176vktfwwouqkn3dy7y5xll4150tm6cr3l9wop1t1dr9x57nbq17szyc26rhms86by9jwxpalt917sv2t93mqwka96ji2gje3fyd8s2',
                fileSchema: '73zz43wab0jbm6fviy3p9cjbiseeec4sqdxqube1o5gwff4zs3dduh60utk7l66txeknyr3tygzcdgp1zfk4grzrah1gzam1zakona6dlal73kxfxrvh12a6fd4kfd5u79iosfzr1a8wqk2ifid4ydubeh1lepgun63b0powsorbloqqypymb3luxbsbf6u9gr8012vv6bugu69jwshnijys9bvgvokchlnmvswf6eycx3gpl76t9no3ofmi72gayjn43latzphf5mgcqjsrldajrc822imol39nnnu8ex90bdck3hlxo6fh7ae8aoi2u5dnl0kr5wikn2wxu7sb6x39gd407gf3tvt0adfrwwjnzwq23iljuqvsbhpsvi8b57n3u7e41lbyd1xocvk07dpj9azke262m13hzergqjrbndipoqvskl98inzowuukzmohpfaxduoknnl6c0l24dcj700e8ek570w5haos2gjr8sn55zraz6ndgx9ms6g0bsm2h251v9xr53u8xwgthjzaff99q8l07uphlaiuh08t3sx2kipvmvjb0q6qkcvlgafm97ymwy8ncfel40evb1mtn5axic7it6bm7eoijk8b0q35tyw1f4nobxcs3oqjetw6dsp618pxvmorueysyokqqiqnucgewwaelj5fefixle8cahzokiuyheunvcygx6mwvk0o2x3dke1847xp60mnb56kxrfyvpsh6fh1eu7g9u9g1hnbden8eyaxxwv8ybj9p07ig09mmh8khvknzqpign4kap2cwcyga4uoj83b23ramgs1poop0s8o0l68dufsq6unsr5ly8vod2yxdhwh1h92tfnanjos0xjtisj89w5vajldwsed9lkqrtderey952fjf2am1exhd4aquawvk95qosk78qwsc07e5mvu0gxyuwecb85ebp2h4469iobuhb6vzpas0z4rscumyblftmzm7csy4ba4a9oelwer0rrqb8suoz46nwuxbtua',
                proxyHost: '3couh9c7q42ix3xg2unr80vg54kskgud72wn49y0m0c2trt00lmk5ga6yfs9',
                proxyPort: 6065316750,
                destination: '6mv3w9apmxhx0td85fm9vo29cldsipistkxxh5elgh29h31cpjjvrkd6uwt3i4xizx1wkkbsk8hp940qpj5oghwzizsrxm20wk3kqlwwo11pqu8mp1wxxv4pnvp6m24wwnnyk8355wsgcr8lpwht1fvzw1x5woav',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'm6553qvfyz7ektq8gtg9f4dypqrzx2720g2pywx0tvyzxuorrhpjcl6d5rkrf7bhawyli8ay0oq6uvz3gb9fmtici53tdmch6qjv997s5m1760yqic4sp23fgv1wiz3t3cppg3a0fzoyj2rf8xuqpxsov7koo7oj',
                responsibleUserAccountName: 'gfpf86i4bhoksp1olrnc',
                lastChangeUserAccount: 'l6kvsezvjy8dla1k5n50',
                lastChangedAt: '2020-07-31 00:49:38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'sue336uq4tk9cuof769m85d4yqlkw4i6biutc5ld',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'su0w53hjz41u5nm78gmxrybxzzn5wio19ag9u1uy25tadjfa48',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '57g9nm9cg91hijtavu53',
                party: '2gvw4o29f9tqfaeoldjgii0jleyaapzm1i6tq3n58u5q1rs7rmscsgqpvrlbq6s4mpjb6d64th9svz2n4sapihz022p2nw6mewqle5q8ixcvleupu41gnnto0j0jf478ukfkzneqoj1oazphbxuh1t3jdp5y1l5w',
                component: 'jo24qvrx0bq8dhy4ped87djjpwvffyg4zduklwn9dnpp9t7ty88sqjr5qhmn9l7e16yiwumwz8ugos9o7i30a6nr5dfoi7s9ulancm3zmqp81dagbhkkesil32detx0ijbar41vwu05gz6092j64xxp0asonf0et',
                name: 'owc0meg0gl15cj7ai2umsgvvc8c1irbej759i6v9y3l9z1ovrx0f4p2wz5qsd2vk8vs3rnsv2t2av7mhmjj43qkrhnq8giagroxztceckku49d54u4cd6zi2ys3t45wi3unashael9qcgv9t8p8ksc2brfftjk36d',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'g8jwm5wy9vlo75cit66l2s3qkqwfnjae4znswb15yxhpmz5xlm2gnm5kqwie3ue1kq1r5j469r3glu0h90b68ecig7m4ow5a7uwsznvo73in8jtf80wz7fwod9uba9l2difdaiaz5be545b2cy5cbcy2gsgycexp',
                flowComponent: 'k4del9d4ue22vpp50n8csl9nfceovirdteygzgvhka407qselhl38q1ybptktwjnzy6fl6hztoxhqzyv96dtc0k8w5bib13wxyvzw1zrrau0c17xf1y34usrt4ynopzcup9wo3j4dbz3yi7rtizi4pskku1unnie',
                flowInterfaceName: '5ct3586u6pd9rwmw611k1hnn4fkz4ij7idy1yicpvbuozhpevnozgru3t2kx8ihtzl3ocu6otsbfzhqg95d9inkh0prkl7zogiky1mz24pcar5tso5nf6x31vmfxpldbe0elvdi35y0apxc19vsue0tcdz1tmdrf',
                flowInterfaceNamespace: '6nwbusg7yx8uoj8kowot97266e668oi1wmyujucstnvjvf212v1hsdjadw5s44ivk3ybzjt9dbz2zkjqpgxaf0vq5yh0eh088cnxbp7oq8astqaesxxigt3mhqi69ucfgiw41yqeaj1aepjs76mzgsyevokd531w',
                version: '7xa9oa5iw6noj7cgcgym',
                adapterType: 'f6nhyhu8glilyq0ropjd1jjy5ocrpc7vc70b6vzlafe8e7dy4xy7lfa4npo4',
                direction: 'RECEIVER',
                transportProtocol: '023ivv9wa2g9qpuzq1zdn4ekt36of8k24fyg6h1gslmfdju0t6jxet5e31e3',
                messageProtocol: 'g5u664lhztiyig6slqau6jugdt9263zjhm1imxz888wnvkcs5psdeigrl7ee',
                adapterEngineName: 'n4zkrs382n9iwcns6mhank732lk82kpo4tiuthpjar7a3dja0z4xmjtoirjtr2wxjhz5bbszflnnvhb3tyud8g9g9qkro1ohtjizto6646ajst2rprsr4epz123u0ug47813lbud28ag4zwxi34r6pqv51gjutnj',
                url: 'z519k4c9sxupx9gyvdhpq4lympjxmx33wkz0zp500j0n5jzpk8zsdjog3xi6193j9qa3ywnh1dlt6nhubjcq520infn78whuo47d2cq53rcbxrdglbbp95b3urbr2fzr9ce2yaafmrn4d350uszg0wt3ky8q0wq5w1vd0crf83jy3rcxg8d5m8almx5z8035b10nythtuilvw1vr9ue62v1045bazw6ph6tj6c2fttuvyf2amot5a9ckgnv5jucq0l4c3d5j4zwgh78zy6ur072937fptu1y1ykmg942odx5os7rc49slluk42lo4qyo',
                username: '9quwf33369c927eddj3rkhkx1y11srcssauxosj0s5g3li5vbmr6u0eevpn9',
                remoteHost: '3e45v6u9zi28mkm5llwds2xa8oud4gdi8rxvr21ghr4p7vbwyu03at5m7271j7oydu6x3yjc482yedt2tf7rvm3hkm971yukgpasru2n8j1f57z435hs8b2786mh7nslhwnapgiu5idyikrnfx3wpcqv9rg9000z',
                remotePort: 3173440008,
                directory: 'ug7fyv4jnlxryw5z8tq7is4qt8pkkif0t6som099pe84jc7ibjuhdvaz7sa3q2w0zcr5fqhjprdoy4lchu4hs2gv19n909onpw5r1l6cz8nvj2q0ogpwc2w353txehjocua7nlemhhczszlz8cw48f4mxvdmaaz0qivhevfip3h7d3as3f5bl0e5b89enxn2vyxnq2ovbji7k6ok5fjuo6gcvs862hpj9q0bhj1dublt1hecr266aeu39sw3swe0bs36ahnyxq0g6ilvxtcr0rr0g9ottewoaxqfo7fhvh7gudwqsbx40i2ykuh3dadwzhps504sje3ssnznvnxns61hcanu2fzuuxlg0kw8ub1t6p6vjs4x4ekcktz0k5lx1fcc5oz8ug6csbleee2sr94zd5ipc38n0qodtftuiemp54dpjsavbe7jpna8xmh1ojx19ee65wl360jt58ai8y4zyxq2jcmrmyjmh77qke77vdrvgl0ww2p7v7g5ae99aivhum4ttyvkc5empcm7tc0v44hnl0r8l0upxs3uw476osunmphsgpboiocnm7wwffn6h4b8xs1lpq37ipytkrl1ybofxg7ldq3tc7ty0plgkwxlo19ua5xriq2hksccdkik9kh46izktxvvhpe4n6s4al8a6b3g9twjnlsxu84k76mpxn7v1r58ij8yox2kebunrqyeoszjvjn9vkq3fjt914q7h3evh4ihx0r2o5dplsv1d6kkklk7yefqymsx080q8aotm9apzs696q2bxdg4mzozh593zqk9pxbbxae44byg0b5lnok606f6sfoac5htat5lcbx4sx47z8lii54flikf73zfzbt0f1xuujxw3fqr6xfmdklvdn0dqt48ur9kclswb4c85h2lpig2xwnz2ipu2virzen11ggtgtwf5gwnjnqlusoal1a4u69rgyc2v345nnay2m381k3g7tb5b82ix8g2p55j03w7eqpesuom9u8w3rjtd7wtyxqt',
                fileSchema: '179ufmj2v1nqs8hhot8o1q6u4cakrh7jrckskbxpeabmqgaeqwaeoscj1yxhfr97h4ys6422xpjttclkr6qrf4cup6et19rti214eo8ohx0emifkjgcprfbaelmj8l9qzik9tznn2vlbnaqx2iibtxtiuk6lihbjmwac8efjefcq8e3lyemy3opr71issne4e8te2sgxl98f5l1eez34946uw8oc65ntb9rtcinu238cxma0k4ixb80arr5o7d53qbh6acc5qasnvkrgyqeik32mbvixrbbkm39lvt76fd5986d34y23wh7zcnytwzdij4dhonzl1cor6fld34q4697o358bv31ogrp5yaaoi2o75tvs8vprwkq8goedg8lr7bzj0n2m3bshb7wxr4sstdccq0ms5zth3yr6kl32wt8lx24e6w3s5jwi363pbtk25yly1le8c2ew35plc66rtcgtvvq0ez4fgnxilvwuzp67a0hklidc1vco4bnwrris8vf7uvqxjm8oj1zw56j4uf6nlmqvr2ownzoagej7wsjeey3s1jmx0wza33lruqjwmcptmg2v8uqz22c7554lyn16xhamfjcsghqs4fbjjfef3ukxda81ocar79vgb3cxmigunezo10mgoxzxtumre2pu4dxwps6za9k4lc1f0dwcc05l5vgttpfxk1gdfwroh6g2korl0h3v3unaa61n9fr5fcnmjdyxxcu2amc76zssewh45e5pp25g56njmvf5qstrgawl3z1tt5fl821lj2lujqhthqdf2dc62ygd0gjvcreq5d60827q6d58xipxe5tw0xokv16seaplmk258ovkwcndzda0cx0trmh2kty3wcsq3t1via6ncl84yay59661nwwp15npnc6a2mu0sf9v0iihssothpkwa8i2ao8s9twfjznt6wvyzpe5t06y8wpd06utn94df97bxmy9fniy7zxqwzv7cxauikcf7ceqom0wccvo9rhfnlzgm416',
                proxyHost: 'haejsnp54zvvrvdbdpstjwd355kl6igt9882kk1ghxdwu5bfux6edje3ba28',
                proxyPort: 3668431247,
                destination: '4en60hlwkybgdq2c786by7gbwkcwocpyc7wx5ajmjhh3z1vov7ux9qvhghlbuk2b99ua39apmu0iba8lkd6igxdcezppj8yhrefymx9e9q5gmdn5wsl5n8jszp4i966g0egeri5ddmvh6nyd7c8afd9yglwrq0b7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8w89qn0qku8nh7ml9w51n0ryabj251wax9b9je29eiv55l42t6v66te38bizqfkt8m564r0seudylzryq5sgxa9rlh6xw5fourggtlp6xet0fd5fzggxj63senorip4zv5jrghpf0nx6enp2p5f33rkfxp9ejt4g',
                responsibleUserAccountName: '03y0glqsjicwbaumgscp',
                lastChangeUserAccount: 'cu7f1mzxmqpjuwb6lb6d',
                lastChangedAt: '2020-07-30 17:23:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '2z3a6ns8324mny59e29detmpt68l3ok5luceuh26',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'ovamajrgrh45832ryn3ow5zdcejb13ey53adm6j69y7tgf2j2z',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '9o21zlyrv5gbsu94l678',
                party: 'cazv45bf9j58nutuzf1j3doongxgyggkbjfcmskrnrpcz9czxwu6li2pvsvyhfsiphpgbwmm9f63puurloui5u8ks1gzw3tsr6wep562vtvh7m17xbb7cdoi8useh6k2p2x4zlvr86jkfoevccg4btflxphcswzh',
                component: '7hglw9ppdlonvokbhpqgp1qwwhhu96svw3l0dojtsv8k3zcluqehjrwld6xr9gjs61geg7o9pqacd8y9q0b61nhrqhuy24pqxck27c3p6yspgydjkdlx2na9dwtpfy7u3trzm0yhojw860v9n8rpbhs7548f002l',
                name: 'jrp6d03scrvzjd89q489hu58wksuodol3a7mls00av4sjte32sdi4h4oimnvr3wl6judipjp5ywgy0wwmblj7fcwaq0ng3flnvyuijoz0m1c6q2fgh70ennl8ty80qi0zxibrk3s89v4imef6exe0dj2hg6xvj22',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '23d1q2pkwl49ibakofiqk1led8y9qu33au1i14xqgyg3q3mvf2bem0q444cbhw9sxtvredvymrtzvov29aie5wvkkmcpxzfersfj1woghzyejc1m34mckmsusg67unaa56m8i6fq4fvsd52s3rxp3udbio1p7nmjo',
                flowComponent: '7zebk1d1o5g6g3vndvnwb5gtfja18g8pdup75n0p7w3ktnzcuwguhey7t79r577ipp0v3qwflygsjxiwb9vkvmfxky808hifhaq95bstqfiyast2a54w2ohd8jb9ro1u2kzvypylfhj4bdzqr94e2lfqrzq8zwjv',
                flowInterfaceName: 'rsxb6nkq4yo74jdsl3d7oy1a62ruaxmccerfohjulhbp0t2b22tuhzp4hq4f5fmxh24228tke413rzu1qcp94c0z7o2rqlb5dxrf4ckd711ft19obb1d7doiaccnwfvdjl1s3rlet5ol75lnedjurtfqurxazytf',
                flowInterfaceNamespace: 'fky24lsy41h3y8lo45mgqekzyj5dyff6e6ikenr8m2czkpi02novxmdzpzqtot0ibdzwe2yx5jtzdrsufrkxpcbreikd4b92ld3n9idrb5xtnu0od1o2gu0whjop6pi3kp6dnkx8a4390nolsdoetpsehe02p9jv',
                version: 'xeyflf8dexmtbo1z5aw9',
                adapterType: 'oypqfdle6sdlnf4ioo9gichblr2p1q0yj1iyhmg8fwzzz6hflbbzahxmm1jq',
                direction: 'SENDER',
                transportProtocol: 't6sr89c4gbfbupm9ly6o4ngr7kl0834tue8abbt685o9igrz6869el8hjxbx',
                messageProtocol: 'uzv7mkqv4oanau9aujn0ni1kz31nrq58rduzzyhyhoh1e141rntp7wped7qd',
                adapterEngineName: 'w8j8kzzngufv9pughs6y4kn06k3luq9b3o0bnnrqnbx7w64mokfpacj4wix6pkcie6rfblyfotjakif1s98sawldeqevoy6j4bnn8ws9nygbe3ookbftj3dnbeuqumoao0fzfll04j40nlrgcbgxwzqu90fq9gj2',
                url: 't427k8n6n2rjgylhu2m6oj5lrt8clnljxd62tj5xqtwpz8mh4r66tiaitkcasstps6o9ripycrtpxp7057yispascqz8484q90ss595a8innzpbss75wcw39vhmfo8bdi2ffxn07xk2gr7eir918pr63rlk6qlakxenrauq5cvfubj0mlqfpq841w1bjn2uwzai0g8f0yz11a6f6jy9dndvg03k2tpc4aybfniulo3xwqzsn1fu3l5u2y6kn198kf64qq7lp5ionksjwpoi509dcnrfsdf43yrq5p6na61ih1qhqpl7618fjr1v75yw5',
                username: '6jvdvixx660cpz3mrvny2ggzy4o3d7qnpdl5ry8zk7khe2iwanfzka7i27ug',
                remoteHost: 'iv8v30xu9kskidirzrdyjzi8x86dwfa0mpobz9jviji2y7jllyata8y7y1kpmm0udvgs65n2dhwrxlpxar77vfzicgt7q2luu1opvc0eqwedvrsttk0oe97st6fni8jfvbzq1ha0kcmuca3t8qbyg7u8wrr3ehfz',
                remotePort: 9937248713,
                directory: 'oldspzacslotliox5xkz8zo9770m779t81isn4tup6gk97vtsjht68153t7li41n24azqvdk2z72qtm0vnz20878ondayhnnfxyelmvbwcrfjh97s5didsxaz0qf36m0dq6011pscivkjr1qv6h3tlputrrsvfsovihx5krrrvb7lx5mr0yeg49g02ro5939yrgcoji391wkrz3qh7savobailevxlsipnilpay2d2ki6dgcemnzytmvby7tm4a7suqcgd4pnypba6o1mcejv6quemmw2sxdz7fm878w933dmm4mu6ziucvauzi6tbhh02xjersqgqz9co5cfc9nyhl2jzrv1dnmcs6wntc7e13n81ufjfu193hdm99a1rzhj9v3ivnrknk62e6vphs2faii7ldcvc9eq8lfpql8hhhneoomb5kujuxbbsdjsr9gibrsujkfg917iv543z1vf3990intevb6fk65i3ow6szk5nlaytc5mt7utec7gvnvn4spm2o2rtmk4jxlge7748jy12jsidfqq3e669hnbd2f17wkkqbor7cqjsuislmdcgcw0tf9zmskaz7fnjqq0oo51e2oxu0hrhaxklp0kvlvw9ulvhtvd4ghgq61lx8be91fhz1ajp7nqdt0qd7pnm9yg9pmcbhh5br872bg9vl4u48hg017qy13k4uxmrtfk5kqkr7tknykwtwepx4m2rvu7obap48ephmrq110wu2qwtui2t9nwiwubldh2aqzpf6nkq16oeunwjkknn9ji3ta4ciahceobd9pw026zjukxqdd78181n5l1ql05qr20u06lgr5pder80jabuc6o2j5hsezm9t7242ken8j2a0d0h53e140hxr90j1i7ied1vykpr62lj8xc8d201wsvk5zp1ihjgevsgw3lvkyeubg0c5aepud967n4zga9v4o43yrq92jtbjwq5rnpzcrbz6dd5lwaq15yr32ymxo3g6g0f3nblr4e3m5optrfpi1',
                fileSchema: 'hdot3ch5cnqnkthl6k6fsprblhu4fjgpla1173vwvyb87uumrb4yohere4i7drs4lwie735kranrsnor0sl7oxj42uukzj4v0cpo4irt94feqqh3grqw8t3gsyy37put7rubuolktde3rhu70qggqxz71gfkobofwbapz42k9nw0f7w8fro0jcpqnuy3y2hsd8nch06s308dft9eby2epk27951fqzsham76h1ao1ic8kzyfxs5dah25nqn2icwtnkodhzygi5v2hr95jl766kiag7dbryx91y5xhm4wfi56zfs34cfjx61bir1ttrvmi0aqd3z3vw0dj45tslzcr1xd35o5e2ikz0imf0capva20j4xvt4qez109azs147n30zi2h00ysqbuvn0y5bthyv6cslu5z69ngwyw76fg0dtrecg59rtz31ifp9aj63fy3gqzuv3kf04sr9psh94s72vh8nqfdra7xff7fes45unve453vxge5kntpfmo7i3ztu8y7u2v3i8f1yh8qqbadq0qt8judamjhhsrc20inm2dr68ivepxtud7yzjn5g128rrrzjtet0tj259bfez9tnb8rvqigcmux8t21yqavifmr63zf9i1bysfjmo3c5hzlzx4rrw3vsslunxv8igvo4qcy1dm2b3svswr2wh09jxwj0u3wkb1pkaqo5yqoah4d5nmecub5e6ws60swmu8secdm1w37ypb41iupfbj5a0lwlf8d8129thvnujkwbl9ec4q33tq6dxw12zjja76kknwekbcbj9assi6hfuggamlg4g601qnc6f3s0j4n4loks0fk5ve9z215dc0347qipjcagvpjzfrjwi9li1kl5xyejzr61a79pr495ruqrdmuelzu0k0912dwh0ldvlw3kiqz12num5l6kjhnd1ethw1vxywecl9jvekd0dqidq8ci6ooxpwgnfskhyq691q70lhzr8m9cgnacfvnway7urwgptpcc2aqiyi4u7twhu',
                proxyHost: '0onebvlz7za2dexzcpaufviucq2ytzablpjodugkbzgqh7f4odkask0sowsz',
                proxyPort: 6119885833,
                destination: 'vutae9fl7rjd9cpi6yfr2vwdjdncybe78cvhc770a7sxsw6c6jhlrr38zljyl33cbb1i2ux95burivnsohlwty2l6joei7xlvxiuj3ybtvvz1x7jpigee5e1mx3jmeghx5p6anb0shpgn2ij74bt2o3rfnq8pzw3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7xfx8bgv3rrsma2mob02ngc147kecjcujgqezfm5v45y1wjdyko0dvn3uxsuf7dkjgmgcafw06buegu8v6a0q9ihwheqa9ggutal2e9hv7klz8os6t8fmpul1vg0p1dj0chj62pwclt8hjwboswkxxd0i7vm6gsc',
                responsibleUserAccountName: 'l3bntsdkuavj4ujd9glb',
                lastChangeUserAccount: 'bhp6jp8jdc2d6h5ir17j',
                lastChangedAt: '2020-07-31 09:08:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'w49qqgsi9n1wo6vz7859ipy8r1c99mv4drw0kpmy',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'fgs676fdwq6ae3symomyuhh5zz53b4dhhkdhewoh33g63foecn',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'dkqzux5mhtuvcjj40oih',
                party: 'tmv3hirmliq8ajp0um29v2r2f1bct6up419d3lg5bo3vlm7boj484gzq6ty4dqs29gfcypts81xf5ox8d8up84s6leunbjxtor4pm6v2mhfd421eavys9te0rb9t42th0u34nt76l0o8xkel0yf29nhim6b761ru',
                component: 'i86dkgjea138bpcah3tmdksdu6nln0l69wioqok2ou7e805iu5fkah9rdbktqm9pagg8msb24ygga3dugj8sy6cg6k78aeko6pqocq31rh91wgcdrymv40ytomdd2surkjbicgea3zo86yz2qpa0ylel0e90gene',
                name: 'g9fb2gwk81jydffbhxt900aidzjbi83ji8359gwmuw1sz4rmm0rlcs3k9l9dh8wyikryo001qirqpb1e64n4nd8uv0hqhz410kjfbup0l97b2nw8bp2efyjrmo94qykkbcjjgnhe0mw3oon0mdcddguwdwazwfjg',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'k6s170tf9p0qleq70brohrn3ow0x0f8qk89h05vw6iobth8itmoz8ydkilr9hudf51qnzo6177hr82lfjd0gv1cpim07hcee1kkhshgke9lp30shzycwgchlwwfu02icavmcsq9yysmgvzmker24arnqejygcxsb',
                flowComponent: 'pbvmftclwx5lro2n5mj0cbtha8wocrdb2tpdjsg73kw39aefotliloxjhvgpeahobu2eluryynnay0jteoby3i0ks12x60yewhheo6cr9q7k33lsl620t5seeujp3tdolh5iqo0yfj0wpx7k4hhlqgpjv346njpk0',
                flowInterfaceName: '5dzdqk348yuo2camtfyke54fmkdlaenarqc05nskl07qy0wym6zdolz6p8e5f4a96oh4iro79pcic73b9osik2nx53fjw7x4q4miv09nikblx24q789xwpfqo8rd54wufyu9kghjuup700iq27ln0ldx208b6fho',
                flowInterfaceNamespace: '9k64f7cd9uq1zhl1ef23nx04nbpahvox47679rn7sy8h7mkrajap80qbartezt4xhfk01tid6hdoivsexzzpqeqd5wlligq0bvsb0e1y77stk2m0h400y6ypcghcffasmy43l5j1yvzxxbgeguufh3vobk0frbcl',
                version: 'k01to1usbscnwew3qjfv',
                adapterType: 'lt6n6678yu2lale6uvm0yo17vkknk99ss3635t454npr7r0b0zygwmuxm2jn',
                direction: 'RECEIVER',
                transportProtocol: 'sa7fuzdobh7c6krl8d0yj36gsq057gkwmgbs8spgoa3wq1ke3qr8of1wfna8',
                messageProtocol: 'lhojrahw3nztqs07xtcfmxzkfe09v7hgs5uvgxynv340y4l9ukwltw2xk8gn',
                adapterEngineName: 'oogdjvzpnkrc8ysuqm12a17pw2thjulmf1vknrxrbb4d13rttug92lp7lmlqreomvtjvnu244yhs59wt8rhgazz9vgunutv4fsv375ltmrah8znqn7bm0vctlv3y7pgj2krn7ejtygodznjxxhcfbs6u54h9ekrs',
                url: '40fdeiwyr3b6ed86i2kb1ya8son6gatmj1bf3n7q9sg8to662ganvybm4c4dk7rk63ijniewr668w3gi9eq4st4tqnm7jgkrp7p8fx2lqam817hg17n593iv5onkifzqo6y9qdawjmpul939qw52ydq8mr7bn7cbx6zf8h25w2kqrao7fldoh92vawq92b5oa6cfvenfbjo0g3d7ahyotllo7con0hwh1je6hsl90hqrmp5d531779j36y1n0pdcdgr89s830rizt5oozi7q4t36fleo4fpy18q72akeehirstcj1jn6830jtw2q41aj',
                username: '4wl1pbanbi1nqbfc3w4i4tfg6anvm21cg6ptg4j8kpodje01v3t5b9pix0qg',
                remoteHost: 'aiopze1cfjt4r5pbun1yfnf8h8vtyqx6imgzjxfxfnlgbv4f8l2rbenqhq18hv9qyxal2q7qrbb08xqqjk136yh403eos4u0ufpteevdw37sx8cwp4bkmdwk1dv72gb510mo6zamu5obitxwv7wrn0vqswr7jay0',
                remotePort: 2725336871,
                directory: '2wtzz1ysk2zhzuxuqi43tuanv7fouleqt1om8t7q0iv3docgo47mls9ckx8htk4v8x816qdhtuvmokbn1gafke5zkzw74hcog5swg4v1cnd2k4vnz08cwcetoi9fx50w8tc0ug667onqrk6n37g3x630ahch7s6v6s66q5a7jl94upd0sijytp13d05y7jho6m2nrijw55qfrtglnsf00efg6dg8s1s7sh2rvm3jt7wp4hb1cmb78ttmia74ow8qtm7atujx5m4rsl7g1jqcg7h41ho6o3naf20c19tf17tp78j4bph4meaw13btha4prn572w6bnrqve4igoathw1v3d6fnsqej4y58tm2y6hu4wahz6kdlk75fm6u9stl2iwtoe1lz219pk9q3kt6ttoxsddaet9p0vi5d42wgw6sjosa36eu99wc2shrhpgidcom6tiwhbprwo8c31q6hrxq173e575hynx91qb259c42hxvva32c9a4u580y2dv13i6xlu309i9bt70ukiepv4l5nu1owwze54vzi3c9kbwyg0jis0zcyjfmcifgsukcsv9tkjz7lhhmb7nwiwxrsuxa99pakwht4zl75pl4t8ozk829za7d0uyq5clk1dbq4g91ije1qws2ejktqvwwl5ipqpjemyzeu8xvolxq1ltkzgdvg83ay1pqx01lerxqh1vl9ygsnkumhyokar3ghwgccuhu90i65zbebgfin7wr49r694vsvhlnanhem2r5pelhzizx76n8xgawfc43u8qcvbmie9ja2pmtfu0zh1kg78tsm57i1c6zgcfr2l9pxbep4jpxyj6oibm7oz61wyfimia65qs4ij4txkyx9xqu88kguw75tgab94q4iojejrw9unjcob8plcepdoh6xfzidm4atq6tsakpdiea5cffa9kzib5y1eirw67tms8raoqkhscfp7ef5y6krdhxjj31a9x88qbj9wsi0u2m5pp25ps5h3lpt3kq34tycne6',
                fileSchema: '8t6a1gbabvp64wniw03ys9b3jpz4i0vp6pndgvdtgxe56ymty5f3lkrmu1ozslw12gztlenq7siz0bt7sun6d1csnzwblvzjl5xc0h46ap3kwx4sls6tep80dhqtbpszdt06rlwund8sli826hsjaiurz9p1uultpy2fa6kmaeef5oap0vrdv53tjfptrx8egk263yyorjpzpb7uhjnskozyilpqd19kajck52k0d1y5t2eyfdidwcbx39vbdd3xcdl32z94bn7sr8od8cl0pn9f62te8tr34zepr2e60kzdqcb98qthgqaf6qlw7lfr29gky7orzvc2im59pduxibx9vu6w5uwu6cnibfwvfpxeq1nlgszryrvw64rnpm5373090iu8ipxi9rkih3htxhv2bkvgfuq2j63rtdi2oylnj1dvlssxpkvj4r37o7wzpt5v5780mvrls5m81upgz7fwt1482jxdsj9mkr0xc645jz329w1voi4s70ek2625polmd70kbdcp9kjsvzu7mgy83wf1e9rgjjqs2wyhltd1ker2dl3quiwjfg5y7ausetkizpa2vo3aej60i02yoykc4kznpzf93mvlm143024dzn8dioolbkh3b7rhsnksvbwe648lpaf9odtg1kvh635ftblvb9p8y56df0e9rfd5bmyowqcmgzu7kf7mbajb9b4i886pgam0i6mk9bk837x35u1z6yb1h002xvbgdd0otqtcx1z4plo0by4jpe7gxoc4ry7i328qcp8kvwdhdh5m5qvjsi3auz5hzgt4v2ook6e6n1ttvxgkp9v6ggsp9d2v2ah328u2n0lj1i5up4by7zrhaffanrrb8shxri1pdl0cnhodb5hp3cktjcdjpmogmwif8r63lls3dudorddf0i6kpri08qk5jmv7wtdf5b6mv0y4rbeacg4yfqa8ekibgcu7p1kcqoddv8jrvbdr4r9z8eu86bymyhc1ed1oqvz3q0ygjoyu9jwpbihs',
                proxyHost: 'c6eeyde1a6mhhi0r10x843tfncge4plursa1zndz0vl6fe08d1f44s79og0a',
                proxyPort: 1634476877,
                destination: 'd4bjapee3y09dbo4dg6ir04pohsla69h6y87ztq5lwaunc2xloapzdr4zo70b36qsrjhtba8s6xbe7jww0jbw02no38zvdlh0scyr2jidi7g7s4gxk9z34crikh0yi92lo9lzqmrx22q9a83wdd9qzm7bh6zhp18',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '71ws5ixvw4cyf33o6c53xoc2at3mub298k3v5e1dn41lirmomeqz65vcxcmi2s16dh3y0c64kubdid16bpp3b1wbowok6etjbvojgc677qtuys6bk07gji8phkjltxf0m5mlj6jo1hlhc3efanzqovw5esefgsk3',
                responsibleUserAccountName: '73wxa3kilybq4k7q8x5d',
                lastChangeUserAccount: 'bx9twf5mwwf0zn58pi7h',
                lastChangedAt: '2020-07-30 23:32:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'hcusxono6txsedcqokjl2rnso7vanktbvdgp6xln',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'j0011luj369jydmt4q8issgkzequf1r83m5tnos9qlixawvrh0',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'fu7kqttz21tobkdzt9ds',
                party: 'maqcm7wfumxgej40gu0lkzf95qx6wg9r9kau53n08ay1n1isg2btj8nwxlo7f1md22daqv4nsbpywiq2cjcppe3b2j9igsc9pjqq2yvbh4hry3itgw3ujyjzkgz6sh0kq8l79anh2vnjqii1dew9hy08iljoe7vp',
                component: 'l9ss8awiqz7xa24o93uarq2vhd9rux6xryzmyijcwc0mjuvshlcv053zvvjblrf5axva3lc6dtjolg7zdw5whephz60293gr0277bru6isbvgm13urmyhhibpwalfnxe4vl7nhleeivvqkmbiu2lu1qw8cydq0wv',
                name: 'u0ht44nsaj97aac1eix1o07fx64x491v8b75yopaoagmo4to0ujtjfqjjzxap0r7xhem043jvtea2zendyyuwptglvtybvu0fcpjicwb4cg4pp6w9wggzjn7l3i49uw3w2s02z34bhllun7fc65fh12l0csis92a',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'tymywmeut45yfxkm0buoqdoee4qy9vf3kmozbbij7dbhcgk78sld0i9134bltng97wxvcli6lxq4vdakqgi6ujwp5y2insbw453wyivlekl6619nvk2e7d3j5bcyathhtputi553sp7opuhb8qqsw02h8tcxx6ca',
                flowComponent: 'be66tu34yg0v615xoysleu49br4p9deb0v9gujsuraknhuk3h08c78yv1xj63jqrcjb30b2144okwrrevqg1u3zufzqhpgqc2zzrodlksvsv4xir6wzfhf26nd6ftbyirt4t5b1zvka87c7l1d6kybwkpko06804',
                flowInterfaceName: 'ffx9prgon7eop7pk8dlokc340jrh3u09m95exdfq5kkhpvtnxmk8qfhz85xeq42tq1pdr40ireo3vyo5pwwyb83vyc39p1ifv3miokhvbywuiui6vcflmurjkj8oj9z8z9497qpjf6httstn8iejvzdsbdbmxhl4m',
                flowInterfaceNamespace: '7m7esdmd3jiz8wwfe5nb7ojtlxn2ftkadz9tea1aptxamaudv9hi8eqf1zafy0nvyx6nacme8tq8mlomku8wi39dbkjg4wmy8s301hoxixewuq96myw5ap40vh9wiuhg5351bi3plx6a5chycl9s0g8fy6pzybfj',
                version: 'tc3l9dtgkum99lrv453d',
                adapterType: '6zwjywbwhte27x4utmf0bz96769khfog65qxj8comcli7jakgiiwct7c4hbn',
                direction: 'SENDER',
                transportProtocol: 'dvyhlh680xqcohopyhjskh9glp2thu02s7fq573qkpmwk9v6mpo7f0esogbz',
                messageProtocol: 'h15r7fijppi20h49f1gxx2xszleuxp4qki33hrnlgvr4auh70i3feeep3gzq',
                adapterEngineName: 'kszaki5qwfaptdq81lqj22bg92rboakncbf4q53iv7o7kuhpojcyrm7znx9vpk2zn29rj2es8rt7g7m5nqionxcojnbm9fuopeu6y3hywpz3o1kmopc1u2nhxkiu39707anlwmqe4x9imhl08s8itifdnp0nmpu0',
                url: 'nnt4oj3ysqmi9abisb4v06o14vet8p9hfbo04696vjsg9dg1iyziu917tjhwmntew02xsxaubmds3sx5r12ilpgjy9d4qp1qduwi95snp075pje2p08wn45q7r5pgacct3iu3nejuedh6z99xiksqwvubcid06rxoa9oie5icchbu4ryzaucf4dyjprlwucqulf9telh4isecq68lij62j08n65hcn9e53qb05u8z4bco53fxskd1c7bmqlfrhn5etb8itmqcvkvyvm634n5vo9t8fga6knw8hw4vbwo5zhkecv2aqxz788wdrrme4mg',
                username: 'axryy3ojg1diafpz8lid16x5dgrnj34u9orzn9to5jmsiycduzna9cxxdf05',
                remoteHost: '0zipfjrjua28cw4nmh0iiehi29eku05xlk76muaxaxds9aw9rq7jmwgkpcmjkywf7180kaxlpkzt3rsmpajebutg5mpwi3cqthjugoju20ueoalo5lpu5ebu3qokoxr81bg2v4ek4f8gvxq7103x9t9pqpy8zf1e',
                remotePort: 1015199616,
                directory: 'lqpsrk79jlr2holmndx38n3fm539mu632ncy141asydgjh7nojghgb8zplhyojadwitmgi6yqzq9cn86elvih78qd0r8fckhrvbgxedzcr4rhjrc2n07piouh4gfatsibhqyy50ppmr8r37qdy70s3f8hgg6zmyuqhkq6wnf1z5xuhkm4fw3cakp8hgsoimw5r1qp99wh177pjpt04zzu0af3r0n9pmoer0jzjx1owqa3srpjyop9jepemxu8elp85pdmol1rxpawlvglxm7admc4g5uomxvmrp0coujqu4arcd3ybpags4gis0uh8oi6yn77okd93kksz5658kc4ov02t5p9zlbh3ufowjdn34k9qxsh40j2x5845rsibhzu6yubyqvtuuyt0rvmrb4xwisa3dmxihzqncric9w9aurb9rjjo1y2iiwn3xdq9qxtwjidcd24887si3npgssrewj5nexsz4vi4uqr3ncthgigk7mvpxq3vwuxe9y0dz4zc496nxwsdkfb0nn2wq3yxkioepaaq2f056izt7s3s221ulh4ufjtd37sz01us3qikvgt1t61yd288c5ixgcbazti9sfmz39yzvr50lzfoynirwnky6zbm17h30ijjnrvwzovwolhm7utdd3r9qbfa2ok8l5okje5fbiyhy4eplcg5kxm0pjvuezmc1or3bqfeuvu1jgim0yc5e10k3sa4l58nuo9q8y5ysb7qzu8pfcujyust04iev6j47xh0csh4amiwuoutzmpwwt8i2xaefl6li00oitchu2m4si15c61qki2hve9z7ze8bseo17f3f725m4q0m3m8fnuhtpimn5ii0w2yyafwlznq5e7cu369weo86dg3eez383qljuy6lhv2fyb31eymw6ng5rtrz2n6fiz4lrmzcvx9ifpqopp4n1f8ohma8dtazbz99hhn816k4a94lfva7yswq707073hcwr7di9fo19g6imacq9qjxta76pfzhfwurq3r9',
                fileSchema: 't7jald7y27nnus0lx8bgdouleu6w9t925ais0sylxmwrv3bdkr11wxr4mp78smfmx37pwoohm3iik04nu0rghc44jz9anaugsvwstajmk50rteg0kcs1qa78ez4gxho61g5sczi83f3xq5k3kb982oji14zg5fwebfvf0wax3olwoliofa1fecvio7ubyexzg8ulx8n08ugyedzx2b31z6kfzd5n188l8cz8udy14qkd6kp7nmc6hwunbkfpzh76latw0kfljqtqxjn2bec84et0bk5wc11q27oz5gbs6hy757x8oenolnceej9fhb9958kjtx2k3k7p3td35brua3fcf07lltzb6etgls4uvz0wmgrh6233k20cjc4ri598a4uhf75kr372lhofra1585m6vi8slnruk9igjx7dcyvvhfsxkhi9sfj91iexnx2u7on37py5c7crsdwcoyh0cklowoyt0tghx8mvfzt4jekqnm4qd3yvi7ucec6exbo70p76yl2ofylxnb3nmbc6qkrp12py4212muj3du234pezskw4znk48e4upv5bmtpqr7lasyw62g86v6uil1bhm13m2ihztj6jnohtyouctqj4tijbm9nso9i6vptjqk3f40a8gdfqjo8up1lj7dduj4qe7333nf76j50r0aihwosgsfajbxq7p0hjuaq65zcy4wka2m3r2hd62bvp1x8o25bz8eoursblexqmi9jaohwrtez6hvsnma1l3iridi33gensun6kmyxpj6bmfxx3yrkehhbtszjmdosrua28vq43709g0kvjr1404rqrxlwyegiq2s9jxxduqum0ngnqyuk9sv2gqrx0a3zid8qo7vwsrqhgj9wynndbq2j733a8pxoynksni05cptqay0g2vpffb0iahzhr4fklon06ss080yllnr9gslzgyw1um0yt56nw52ehjylhojc9je0lpnd6zkhq5dn0y7ou3m48oax37ctv8nmavh0o37wl5m85',
                proxyHost: '0ccdyya9rf1ielbdvavqtgd11bx25xxuhe8xjn66onvjbqbls0mua9x2n1zo',
                proxyPort: 3060421640,
                destination: '69d90lizax8g8d9x35f75foq1xt21nwq6k8h1xjhzh8q7t4w8wz47jwjsf6hvvibpns6drmeorymc98lpaofy21qen55v4ecxlnbar8r6sk13qxfjsa4de4sfxx1pf9jpo3ak7kmz6tipaacz10n2rom5oa9dey6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'uvdl48nlclfu5h2b5xifuslbxcnwitbbtw0pbhkns95mfi5m7sg0j2hb09ytttaf8k7rijn55d62yy9tfn701kykxedgbllljuxhjv18h5g56p9et3agsrovfw7etlguj47ogw68oz14z0f5br4qrb5yymecpez6',
                responsibleUserAccountName: 'o4btfagbdg5qst32ex8j',
                lastChangeUserAccount: '61oci2eva0xxk94az48s',
                lastChangedAt: '2020-07-31 11:37:12',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'mttljdw3wggo2gfzrex10ffw72cuvtn7osd8o0kg',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'gqbkkvl3wenejajo9a72sftucic2bx23jfswnyubb8i7fe4709',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '8sz8bfam4zfusnkwc4e1',
                party: '0pyyugs8ajgcffeh38iqheog95cs56ksfb9odkcwpr398thy79y3roaky12p54nzg1u3ncl3oglv210otdai7cksjlml1cmo76afppcuwknxwfitljwg6s9aje02ykv5jzwpstfn430ak3u8kfpzht4fs6dydc48',
                component: '9quu5pt26419mapmqjgiagj6e6hp1gbmq0atjcjjpv9x7iout1ml3syp7tcudpa0dtu4ptmpjs9xgrkq53z5920z6s02psrllg21a9cbmxj39u25nufd2b96uhe17e6cw9ff5ntg3hh0aoff53g2fylg52195sy3',
                name: 'wgwvtbof8vzqtfohoe4sam8c3jn5n1nhaywyi5k95i3wgc9phx0bgyl4s2513nfmpuuo6xfc0f6qhtnvz0y5awslq44u9v1rppkovuzkqur91871yij9o8e7d8syp3cvijb91nhw12pqo5v18x7k134tix1jney9',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '8gzsbyky1bxx9uav1bybf1zkupid4finfi2f1950uysqsr3nnwhhausr42u7vir3eo1lai8hwi805h9ygpldj3fwt0u7tizmcwiqxdcu6jeolibfdzgsct11tja5qs10gr6143ro2obrxlyog93u3rwz76w1ejmz',
                flowComponent: '8i5f1gd61m1omocgzd5akvtatmtbkyranrbpg6rwo1nrucnuvhis2vpc01t5t3q9wgyveclsrilq1wxx2ufyalmcfvsfub7l5d9fdtcb5jg4hs70v745glk56rkylu0c6cv1ejmhjk1qqn14iic7ld5jc08a4814',
                flowInterfaceName: 'tbf8hz7humh6o0pqa84zuvm7ykce5044e3iefk7bkob2z69yruwya3c3ikpmsolipxh44ovrqvwl94gs9yawv55mtyvxjr48i371adxwnbzi0w9hb4r2jnxk5coff7z1fjav0gpd5n9d61e79un9nmld7hcpdb9y',
                flowInterfaceNamespace: 'kzg031s9xx3xc46mwtdyfzxma15t4mdcgmtbx7tq0nfdds25ps4n551xrg43abf107xa97towbnbkv8lg5oxbkhucoubtn24borhxcznbtgih2rkinbzno0uzzj2esvamwi8pl90d96vdtq1emihwcrldcpxlg4zw',
                version: 'i34a0pym56nwxf5ojb66',
                adapterType: 'kdud9s8ragzow0gis2c52w7i87z2o93dbzgqet5w2co62i7u9360rexa3yjx',
                direction: 'SENDER',
                transportProtocol: 'n8lvvmsowjz95gc84pabm8t5wfevr9kl4ggwm63ep7p9pp86sz7m7ouawt1p',
                messageProtocol: '4zsknkta51w4s1juxake3pjbhsyrxqoqhu1ykv41hagqubj05iptw1kr69gg',
                adapterEngineName: 'b4l6qov8sad6rhwskkj8iofnh3i85m1be6m8k3pj7rzciydm43wrneqjrkjk4oqyncd0ssq22tu6dzk11yw8z0kkycn1pidk7f3b8o0fzq8mr2goy9m1jnwcnri4014qm0wel14ar8okwx8wcsbyb4n9tgv10hjz',
                url: 'xjnhte44iijrbnhnqkmmwbfcqe7v9xh4tq3hx0bksaxkcxiqupyeqm5v4apv7xuow6jb5t8hyg2kxcrcon29d9pdnjj6lqfjh827ydmx5j1dfw6yv9v4ytq46yc2umvtt94mvqdhm3vnj3k3jc2j2z5w6kqxmqz3qfoipiseb9f2c0gnlvmil8xyfhl7pm4uug2evjfsg58qwr2bikftcp975cnwljzbwj5qd6a2jvn9oeao2aao4cdl1jdzqz6nhz03vvt2p2gvspl58bx1zam9v3gkdfe7xlyuyysqboq9gvldztcw7c68bfzb9bwi',
                username: '84qc2rkrhbkyw9ya6xk3o7hovmme33alxo98gild6fk4h38xutkew2l44cpe',
                remoteHost: 'eg29tvgqhd2vku5qdr0pxmeh08so41a11hnh07x7ieshlu8o4qenpq26rrg6ttn6bc3wwcdlpsj5f8zvi0cvevj10hpf2zwajvome2n3d3r7j8sja9chhvx1mwfha1a7d14xq32qqggho71k6ltd8f14nsy3kmvl',
                remotePort: 3026741862,
                directory: '9gmwnup36k60zlw5efriyrg0zpgnd22hidix9siw1y6oyemsbg74bsu8cqwuec1hngxripgl5w3tpwxmgyscm8or4afvlh2u3mm1geew8b36nszfwgcuz2at4rbvyqm9condk84hthwki2t2c41k4t6xx78hu7e00d1ivpyaen8pcqwi9u7z5gquyfkwcdieaj4d11hanvu7j1lq0r5c5fbtbcguvhiu3p8hz7bbce8gcq59upwhrxz9n1xvfxb37tgw0yxwzf2znmqkv8nzuy5qpps10kiqmogkb32tqe8p1xmexx5hg75opkbzb2grzm20kj99l34p5meupe8551wh0ck4s2acdp0gsehz4g9kz23lfrs1kcjolx6nh6mckjdbun8059416ohx3b8aucoo22o1f0kjvgrm094uxxlxl0pe4aeihb2t0yx06ff7bvydtn91k12fetqyd35letcxv8p5ynbm3und6bj2euov4rvu6r9ox6gu0u9y2131kpll1l0vcpsq6ve5rx8b14ycqkgi0dx07en053lrwxbjao3ko8t5oydo24v8zq2zbl1tygnlkeftmv0yn00legp5wl6pesh2susph6zpc1z5v2e04vaxv5zmxa46qa37khuz5e6n4oaja2ifvi4limdrv46r7yo4r7z3iqfulpmtdt89329cdwjiavfkkinggz8rfjeqfy5j9uzrd2yfvds1ndyqz19q6te26srf1ykl428q7gcl8ojgafbyxjdc0lu089k8fq45sowhea6pdo4o64jhsmcm5d26r9e144a7016ndawwiu5b94ic0cyloru1j26ggp40vkj6sqbvacdyx1fygl58dlmopqrfuc946oey6r9k3hrlgnl97srcndfpm21xx0aeghasszzmkl3gr1a4ki918bnv100pqn64wg1v2i5w93z69y0aq16fn5lgkxuz5i24avz3vwptb8vgxkpnolvgzu3ny5wwk52p3iu6qh1mxh6kofeyn7h0',
                fileSchema: 'x2he5sti6vcrnw9vpp7yv27mbpz25o6ld04ui2949s019s3i6k5yyu47u3qjzzwew2lr3rh5rc3bbhex5cexypca09piqn9l6bkwibr3lchhryncf7zxlk90sj80v0t1joizw4s8trlmcolal1hxl3arqppmd7hywybr2maqgxbp1ekvbo93rfn0dml3zwzc43husjo8s25ttlupfmu6gmpqur1vq2mhhfeoag8pzsbxk32sm24cxzf76o23qnj5xa91glpbo500mtpk93lnyj63gnhqy1clvnymf5t7zolvm6fve2v4tyb90ljjh1k30d3jintbm6lpt8nk3oykvbuk94eu79fpqv8wzrvzqymm0pzq7zyhh0je75mklapd76lcfk6eg0ludwe12d0r7vjz98wy9itszcv2fgb22hbcivepagcvcfnpngcajyd0z12ffm0x85p78euectfbg8dpik9oi2ahoqejgldomb2520mq80orng2djri9ogcs8n797t4izhmgmcomxn6plrubsmz18tovoaqit2jaqfr3wxizd2iq5uj2b8mpnmtxw9deqcdc449qqxrrt6n272ruvj5wq7pexlpctgsqiot1qrb10p1skja2383kalll0rbgzthfejn3g8cui91mpgdvpgouzagljiv724lqu02b2gta1a27e0ytab08oshb7vid65v8nye38d3qoyo3k89ouiyp1qipmaipm5kjxtb9a7xcydvgfaeocwdypyuvfmrurfcneuaa7s0mavc80grlcfxbsx8oco5rtx7o9g7syoibd3d35f9ncly30lrf0muptdzlu5x3g0282m5fn7gpacvkdoene28vsade2qmr4m3h4nn0po7o8627l7g1f6evw3oleyfut0tnqb8snxfwwsjeygtr4xi03unqjiciitgj3u7vvehwlzirei4zkjrpvphq408kq4dt8k33313gh36ys4btpns7dhfdxlsnr4rcuhk52f9wfl3m46px',
                proxyHost: 'ku8bzilj7g9mhj19456a9agrihivjio3mwk5agvpj841cqyr04qvohpwrrdu',
                proxyPort: 7850728673,
                destination: 'utx4ed14wm4umwszmj0exzq5d2hd2qr088y32q4p2kbwkgglnu9a80lorj9ea22k0c8b2wetg2x778hqqb1mh4ubi8vsxaiwcrqauflr82ztfbazmsblmhx0npmxnauqns4afv1gpgnz5mweh0ccxr9waod2qk89',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'u547uz1uq434kmocepzhddcyf37kdp9a0xcgqvwj68hz8e7shmgk73olzx8e3guei8mc6c8rf9xr11enk9ainfiwz63tgzhal00dush7g8qrhzn4dk9594t2l10u0tvsllful3x96vflm1n37bhxcusfy8fvwwhu',
                responsibleUserAccountName: 'idyyhmhzzwa4k77pbybz',
                lastChangeUserAccount: 'tuec1j35z09e7caghqtb',
                lastChangedAt: '2020-07-31 13:21:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'o9awhq0mmr44ic8sn6u3uyvl41t0d9u778625n6r',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'w2zeblj290brvn4aksuaydc3xvwmrybawhdck0hzdfyaalpf1f',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'xi06tvif0to9fzqxcd4o',
                party: 'ikvfv1bb6k2xt365539skdezn1xxv6gc6gq5fz3z65v062hai3ez9pe2zgp7jxstj79itowrjhxpjez7ruixixk4a6a9r9pmzyayiyiu45lilptg0h9cqyt1r665ppa0hlddy50mh4qg4hdjmnttj1i8m1jqircm',
                component: 'v24jmivkffhpjx392no0huphercu6olggtbyox4rxpx8cmzmhnxckrpl23vcnlrdxn29gb4avg47is00wztujr0g5y3256cj5pchds3cqrnpp7nsgboyp1gtu77go0tsbwcxzw1su8h1gcbkbdnlbd27co15vixx',
                name: 'z9pt0rb0k1c9asnzsu1er1hbg1r324xhcmtbdqd0ghz2yt78kdkse2ozz2pl3cyegf0qgvmnmtkcok7fqke3jbbax84o022szkcc48t0q9ox74js0sav8jiku2h0qoa1mk5pw6fikonlzqyicpcx4ujfa4saokvw',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'nxwdyli1ajpzeteeq83256rshtyt2ajvyo0eveeh1dur4r3vx683uo54ywna5yi0rqvx06je5i62owhqwm90221yy7s9ppq4gep6sou1uwy7dgjwynvqksymc2ohlgm7p3irfprw0v96f15f5og59q698gzrdv5o',
                flowComponent: 'w1nrwsi7zn2b3w3ib7huyj711jl2ffvr0on3mrnleuqi4dd2gorvp3s6i3a28txt4grkwmn2rxxd36qgk3mls1mpi9utalakzdcqdjvlkb7vjonkky0e2w95zzc3o677lmyzi8e8586fskyeyplq63wfzyvtq2g3',
                flowInterfaceName: 'e5edmfmf56ly9rpwa3jfl5sqqy5d974ca12hude918l59wps2svlinhe1s0gh6lknjvi4xvqz7z6fsnbnoabd2jfoe7rzsicp6srmy7g6cgqqlsdbecgpm2k0ry2mduxddu1dqs4n8l8nqsxnku4ff1lfun5plag',
                flowInterfaceNamespace: 'uanm4ucxtwalolvj5ga2kbbo96o2o6klhw1ejv5ifu760hh4wqm2vnunowa65gktkjnj0w8n569xt4dmytvp6hljtj6fdjkskxfxja9p58ebdfufqj1xhvckjf6fpsknsj8sstgrdur4nsa6b6njlv29h7r6gixr',
                version: '3fzhbky917afkn7lacoxw',
                adapterType: 'dgse837bu62t0eorg91b307g6pjmb6ujugb8mm7w1dal1wjikm1w101mvhvw',
                direction: 'RECEIVER',
                transportProtocol: '88zge15nt6mb0zz61e5wc8vzgwk6z3gg00wf3g8f7hwuu4x9ebogkezbprmj',
                messageProtocol: '2wjkajthtvzii4y0f3ze97rokcgf05z1e2moybqpogpevbn61hygx199qwlj',
                adapterEngineName: '8cjuog76qj9fvumcasnywvarh24m2ztb0msst34ami6etxe3ml6wjcuzn1y0u98521ct6tsxvhjt0uey0w3vw0i94ty3ctihyi63oex1klnwbtj8n3mc9k6t50sq7lgi5vs3vaz0vvvxs45vzwikd27it3trti69',
                url: 'xhhu7rgfp9wkhwrt9krz6bbuk3dd474cz77e2euis9upuosuwksr07qg5b9k33q8gjnx5xqqm1rajaolthk3dq2i5tpnwe2scdq65qer31b2t6bkia9spuvt8nwbodpwkzehn1itkruwgja9461l46rtj9aod4kujrq8hvw4u83o3au0p5i3rzom6g0kj52zuuyu7io1g2pjrui1uzlc48hxdi5x68276fnespj11qwa6yafhxbhorjxdu85fw14zkhyfenfw6cdfjoxlaf2r9yn8e6jspbbtzlxwmspbe4gjjca57uqa8oeqpvt7ihb',
                username: 'nloh5s8tydol0s4c9qu6spuumvrl0l4azq3od0ln13xpbkggwfqfkfmi6uf6',
                remoteHost: 'k79m56okymz7s5dxt3o9buos7051m38xnimjx5hzckytufbiv7f7xo841ytzljbjy00u9zm7mxq340bboluj70tq6v49nh9fszsqkwgq2bthtex9ea4bmk8m9smk9qetazl1ejc2yjgfu0x3grtsouoc5wapx5fj',
                remotePort: 8312350300,
                directory: 'r02wvm2jz84ihj8qicssj0iv4nqcv0xz7p1t701l9zi4myta2utjqno91agtapk4nat1zlysoek5ckwjvkrpjko10lidtq0tzdpulz9bbbjinao3vqx2gn53vk2nmcu6v1brw6thzwqxbwayt3nrwuz1wn708xbglzmo05se4q4shzb55mbtvfs1roznsgswn0m5f1ryc6339zqjwjkw7wcbbcob3yhwpn372vww5260etkcta134ptl7r1yvpue7bk0jjuu59p2bzifydi8nebht715jwkkj3f7z7gkdw71ttaiqy2s5fheu0izs9vkmpjrtvw834ho37t9anp4vsh0p2jo5xd7jsyyw0d96xger5cu1q0lr1sm4waxpoa8dm6ur7fw2nft5zh72b29se1iqjwm88lpzl192l77mvzi5wn4sf7z4m3inrgc1t7mxrk101ymb089jmpgu3dxoky4zfaovlupl8b97hj4btt10vqkzt57h1bbuzcc6r3rhlwtpjmiz82cutw6gmcoj0pgz8hq9tv2eez0hjqjxtjek18d2stlcejvycmro9v05vg2z3l9mp8xfxae7zjkgivy7t8y6bdrzsvfbjhjd4ijipgqjo7xw86lqw0tgpv07ts712s81m6wjukid9og31zwn9xx4f9xfwbnw3h6xzlkkeyj6048clzeqhcu7o29lckx4o8007i2ls0mwuvvb2e1np824pv8cgzdzp7hh0bxsmy5iyo12ke15xupnpp9yfxzg1zedrgj23vq296hnrf3vv37eiv2cmimpvzcieu3c1ykoyuid7c4f6tzcrksbng28pic3y49m4252h7dwjv8vjg49ypy6n528jwuzeovka29appzoomshi9zdxlh85od1ausko3s7genou60xo1pwog6xrhui41n772w0eifxll699ehyixkoztorf01dtrup6k610vn9ai7bn1cejpjl6zpfcqe6p50v1kut7762ujqtwy7bhwhefd1kwsc',
                fileSchema: '6gw30wv05rbz3h95ymq96yh2uwtsgyc1y00kmlpnw5joqma3qclv4vttzca5igkgebtz1nutlfm5j7emg0mayb6md4ioqu1ete1optma5us21n2icq7elklca45dga2fw7qegd0vrkn91k55x3246295dbqxi4gwgs7fxotgplpxsa3ct8w2ggpvo6vasadtjrrbd1jgljicmfq7m6ku708vs3wh6b711q73f7f9bweuom7m932mx8cmznvsktqoy8i33fr5i7a9nz6x7kfgsoxfobonxigqk8ki91yp3xw4izfredma21mlht2a77765guhi0x0drqtf1cunlfehyzgovhpy4c8obsvkud4vkcs1f7toibt9ehjpc5fgwecqdddk4c97ogeahl4z4fffj4yi5rzitvb1atztkfikuqwdahsczkkrl1maxkok3ogcrvl3xraq0jeybvy4mmvadlwov2ox6omqo31d6gskr1tz912dgnsuo4wi7e2av415z76fhjtlj0bn4ijvbl8jptyfa5nkerlmbfqezh4edt1r6zbvgkq85qi78ph7gyzf8x2vqcxget9o88wlqjnvr74pjfsi42nyikjuexs299f1m4s1ad645w9iyvczae6v2b01rv7t6p0yqidofykgcsmb94z1sys1hjivmwhrao7tkav2t40hu597e3zv91ohzsdypxk19jjz24q2swn8g4gjx3mvoadpoqaia2tptthqvh9qhm6npmla2porewi8jq6apxqprks8l9unz7ow2f5oouknphrhla7bnxclan497ccmv72fvmw44jviss10cf0eanljxwp704dzue55am7kfoqy55gu46l3l7i4az5rhgv6p4yanmuc5dv88zv5ow2y59t7dpv1mkvtlmqt9it8y88qu6fu0rwin0zsmzhhgq3gro1qygu3k9lbv3edu5k3zr76m9jsn6mmc4zbsepckq34iz1jqqt59oag6yh1s5f556e3rmztxuh7c37',
                proxyHost: 'e0vebobqvgaeuyji1uhncnko2nwxdgslzctckzpn4bkehcj7xykj3vbkiqsz',
                proxyPort: 1881755396,
                destination: 'xdfv7l4qr70yapowysvyo1mfvevc3j8y5xgk97yjc2r0082r128e3g6xck8m5ziavl6l50fkvu6kcxhvt1voo29mxhfg5xqsrzkdkpmxfl4lm1a4s3lxv4sy43d1qq3k68ab8rpev809z6fuo7cb7z3k73q25rw3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'i2vdce38p21ugljqffwnraeg3gp07wdnrt0d9hoj7irgr8yxx27nyr7mugbpq027r3scp3sz4ls6zgcj4eodmcuxt96iioiam7ykbyrb488yoyzfr03yyanvxughnm4lb6urwyrwbtp1iyw3lcx3at4vz2fb7oy1',
                responsibleUserAccountName: 'zwdci3w5p4uqksz5qvbz',
                lastChangeUserAccount: 'kck4dbs7ftg1vnn2onv1',
                lastChangedAt: '2020-07-30 15:54:23',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'kngucab6ic0rtpgcrpaao9dr711ta47r1fjdqu0v',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '71r6qqykaovogm8tri7bjv5rvp7f7xbo45ekvq3fxxrxowwrhh',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'c430brmsaexsepgpwpux',
                party: 'exxkajv132y149rk1xhlzvsk2e1m6kyb73i3aze91cb41pijoae3lo3lecef844rm0h1v87852lyiqocbjn4s58bfjzlqcvx7e9pkzcbtldbmhcitz0p1of4ymjuabv1pt6t37183fvzm64zxnh5xwdlc03hxzdd',
                component: 'njqqj1e20bj98xkvt68hsvadbosaswh3olgz80dat3vdb4fmml99zakdv99gpxekm1ll4kl7oxkzdix5ekjf0qzw47njq6fgy42520opzzs3ogefok6bf1pb09jfaf1bep31w5nrqmmf6fqduxskwqq6x486lq5f',
                name: '6hkn1sqovkzchfb6vgntvon4fktuatolb91w26c35vsv86t2ol467jyefyo68j40yiemowqkf92l9c5jf50alay4fsf3j77g7c1lw7go9p0zl6sin2giv8jtyeq3law2hcqd19q3gub9i14p6vqr09pc50qgbapb',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '4bnxh91i9t6ovcy6uyz3rfy3pez5wpa2ifwlto65mlw41islwhbgxecunxzr2d0koo9lqyxfdukuu9ckav708jy87wrf5cs6jou19i8zzup5kq7hnw040qw2vyprv71t993shdqehl4y6cgewopgzlfqquvk7gmf',
                flowComponent: '7va1b9dfa69qryagfh1dvbqr9vz1pec7w4v2oa1kzsyhu6jkmql2cnuwsl83ktc89z40cugjypctd6jaka04fuqs21qs95xxabsuw278mv0yeke131zqojbbzn7xelzsobu4m7ewb58av60veuh9aqxxad0e3eio',
                flowInterfaceName: 'tfh4bk0oxx62z1vq84voqyatnxonevv87wscb6nl17u7whi2izj9znw6hj9glg1znavx7czudo5by58524twt0rqot9vlvds5zdm4z94kum8ngw6dthb2wc9ti5ph05hevrix4digoohnva7dnlldkazvc4i41go',
                flowInterfaceNamespace: '12y2tjl2rpkjahgtxupxdnpulsdpsmeiptu3rzu7nsie3xaq9tg4w6oig588ec0o5g3jj52368cqpnoanrvgow0furtnxxndkx98cj7mehmjojfiryt2mpuvx0sasqf20rqsqxpbpnmlxmsknu4telt2yyos4xsv',
                version: 'l0o84v498vq1muo7px4q',
                adapterType: 'ebo86csag9vy5705p7dumi91g9bh467z5hjutj78m54tg3z5kx0aztxulx5ww',
                direction: 'SENDER',
                transportProtocol: '256zvntu30dph1s8qkn519uxxkw26e3unuwckxyeiy5qm5kz92r25j4xtnzz',
                messageProtocol: 't0604emmn9pfzynns551gb4huodergmzhf3qzvjnxm3zok6i5q5holev73tr',
                adapterEngineName: '7r12ptfrlvlhgdj1pmuobz9511u5vjlo1ahkbwvu2h0hla1xarya0zm8xukj4eged2cpw4xoa5lz267hoqmvcy829asyv0y4ykgssor4ejryu9ng7qr5l7fqkliyfy0ufz52sshpoi0b2yb6dbed3ll7zcvapyzm',
                url: 'q3x2brnzx1k8bqd9wyh5u68jj2yhjgcnanmuk3l7a1d56zh86wna9dancrwrq80hbbzoexdcr4xx4j3yb1d2gbveyomfglqawrdaqeccs4nxmh1q554ltazig2x2pxh8nez0vonmf8ft8tftjh85bz2m6zxec8b5p35o02r7amogg5slbuxkw2y551vum9mk6pni658gailkb75in9m4pi2mj6gtgs3r18b1swprgq8xda9mfwyvtuypwc7rvut2i0km8mdskkkhwe15gpbfm36npbfjrzqmy4pj7qfhkeid4qg2gsdt3ejvkjk9mqtw',
                username: 'ch0klukzjlz59lmhnxg7nspyiov7cvzjxqfddszvkx30wwneghmwx0q7yhnf',
                remoteHost: 'rd83coho2sd4642vf6fz7tuo48zx00d4tik6h5b4343eatzd3ujxlgvz5blcix5yr4ainfu44auh342us9halllixgcm49z95uj6dft9wszpgiefx1x660oxqtowwplktq4z92s6b6m0i6j1t7hra6jplm1mhwiu',
                remotePort: 3830347466,
                directory: '88v321ro6y0aqfgb1pust4v0uy9dxm6wna0t3g1bcq35jdmt6y6e1xzl1is8qghvcnfngc4apxuxe0sfkj7gvz7hgwk6ncnln27r5r4y8cnkepcei4xbzooq0tdipxy5h5y8lo7vgt01mbwhlk2980uia9sz3bqe0t8mx131mfud1rqgv21r1gwje12iewdy8gjqo6hxs8xbjdbu47sgl12x0qyy4mdzihttst8bljt4a9ubaeeggfgatlelfr6szesdx4u0trhta4oj5ztrf8zu6v121bv7e6ta5eip5hi3i9lkgzmfpmlb71jnx1fvdntcmp78afl4xtz9929itofk829fho6w8dpfmfjs9jdl3a015xljq4zwn0h1t7s0vm8hgf4obvs99y3uatta6kj6vftzgzsrc8ykvu9gnyilg8vu2sno11n2o0ox0n4p42vvmynk1dvw51plodmde4d99b9so0c3braq66bol544uy8opmc3dgokpxb23fkxiwxsald8e4gk4e28by0fvk7uwifbn8h2ap1z0fu1br7hl2mnijte1h27zd4vgjuh1ez9j7mc5vv0wvifoi8tavkncujkba7kgt6h0gpt6ceqqghqenr355y0zrqkw1cy9fky35c8afpkbiybe89omhbh0ytfhctzez6m7houx1fh6mjgjaemm319d5q3atwayso1qq0g7sq5fpb6zexc0isjupgvz0yogjf8iiaqhmurfs5nntaahswt8t6mm3bbh9f17jhco2kz34p7yhf765ywqnlevxmkq39qhu9u3ijffjo2233wa7829t9jerq7tr9qhgobezgs2qz8d8szn7n710arouhwxf54nf4893u06j1xuvxf628jsi322vq4ewjap800ufqoh68qj2d1cgwkokqnv95h14g5fap39nsjnn5gnyegbf7cvvoyyfe1dj0jzu20tfm5zyawim01zki4coktpzv99xm0yxdulcml46lzm3jxyk0th2nqkce1',
                fileSchema: 'otom9zy4ce8nhalwomj0zdmvy896l73r8kd32c91sd12s3km4xgevmh9s4tswtus7jflb6sknrvw9rmtfihbceemdo7027gh63g0697fjlnn5tvnqicipq7jsen5d1yz04dzpi1znpyf9fil678qn2puvvst8m2ew4ria6usdrj4lmbahp5l559ni30arcgurriyvgp0u9xvcky80d4z7v3lm1twjuaypxclyts8i8v7ciqk72ok1iuh3kaf03wmu5nap5wailt7lxz6z8x683s8q8ffx9f3svctwp5evi377i30ripwoxypnzyoibwpngkc7asaquifn7xb0yi0kexqiahvimk319h4qq1c7mdqe7sv01gxiguwyrb3v4d9pjmj1pkxmx6nxy6mqnupx3vx3wdee72n7h8529hq1nxrc7fggaz4m184925by88jsgn0wdno90mgt2eumhrof5dj2mnjvjuur7msay4mb3mcsgrm4n8msebx4oc41bc48dgkjg3cptqad3nz2axmxxokl8dqgrgfaocvr3hj3iq5mv0umt9m4chs8cz8kkoift791new25kr8k7hxxc1iny9pbofjadl04htch91iew0as1uxycr7cqfkwxzjqewbpyn06i1se493a2pk23fw8igsdxij96pnp28b9xnwtfgxhixpqlq2knrjtav17o0wx51gqzzu7igeasycq58cyljbta1mx5zif64yw10p0beb1xsooqwygxwrsbm1ye2awtmwkm0o688ltonjjrw9qahfbku0hqoq3is48d4eekwb0zfhgwljzn0w4wvtbvi6464xhq14leqtnut9knejmjpasgnu67e5bfga9dsw47bkd3344mi1wg4co9c4nwx6uxq6etw9s9350lad54pke5x40epyoa84fs2qgoxu9d8jqgt86t68e633bwbarqocryxleza1y1ekuipsrqd83k46mm99d5oz50wq6g8sj44atotjksu64n2skggt2mb',
                proxyHost: '79e43r31feyjyx3xowq0mbsp1ppglb7jzsudaer23sfj53gwq947ppl6bzby',
                proxyPort: 7895511604,
                destination: 'vh29bn8l7yfzwyfih8g3zpx3m65nb7cjv8ivlzej0h8cxwi85x534zpunlpvgyismfn3rzuqb9fwk5dz8hv6e0178jk35u6zg5wnne86bh2cxxgicddpjp72429mqyl7mcl8y8eptg456rmwibwvtoe8l34plf1y',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'u12vl5u124ou2sbz49zse5rv7e6igze1effnvr17m4mjck6o4hpqmfgduwvqdgwbiz115o7kp4ib6zj7crwb49f8kpwyta63vablnlq75lg37ex2e0kwxauqberlw9e4ybtyq1wpp03ul2400bcubu5amh54no00',
                responsibleUserAccountName: 'gtjx4mrhqqzity01avbw',
                lastChangeUserAccount: 'bw75y46h90i7wyl9cfq9',
                lastChangedAt: '2020-07-31 12:23:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '1hnb1uykdwbta41sjkhqycjebge9jlxu1rdrbo6j',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'z9p27jddi7bjrbd59d2ox5iypr464sxjeczvevkbj9i3mlsw8l',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'ngdh8u6hgzdbtxnwauzu',
                party: 'bxtq52cywlvodp4z40jj8rkmhdkjdv8a5zq8s8i4d3a50b579zbi6wrmzxyznqyggl8svgaj0pi21ey0b60h0qnckj4cjv5krg6pg1qh1o0w5901j0k6zvudp0pa4rhgacs9me02e9al2wn3jdinwmzzb4l9k9r5',
                component: '2kh725f0woks0fjbuflgp0w2ocl850jm47jd671o21gqtljlynnl1enkh9nomnj077qwvsmxsnjbkh2cesd5016tb1n6y5ye6xjzvyud5c0z7s21k7vn8rbqrk8o6eed6c5bwg7nyuedoh6t5yp7likaqymane5q',
                name: 'usoykjoj5axdo9qg40lau2kxmgctae6wata07mlyx1lc4kj8wb53xounpv676fzbq3yj9n2ip37c40i8u0fbrpmxi5mxc6hh1ugry4ps5melvt4kvpycc1i07f8ck2up74ti0epk08t2rrbysfh82d8faypsdvxs',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '7wyong5u6jxijn7v658xhqhh1910gwxy6ggc6ncphfgkv3nsc6c4bo574wxzbz96ppup51ohe09sgrnr9z5lbkh02ny5d29cwphj45kgm4pl9qzzh3p98xwihapezh28v3h96wqvjq6p0lsu68uddpiinvk7a1f5',
                flowComponent: 'yxvj4eydxhy6p0q3lpdfixey6f9xrfw04u5gbvsbh974nnbs4whx2dzhvj9lhnl69y13cjgln17sv78kcy2g4djlb40zcrisksxv34pul0hzr4m0ekxq10amcwq83mbyeaveyxhjq3ijz7hfifszpm5s6gg1ociv',
                flowInterfaceName: 'ldst9e2jouev7lr1nkxl67nq6tetawdytvpmae5lq9rs5sgqhseceyqxwcvx0qtsqobbwqhk366lwq47zyoztg2i52gqd70h5o0fdthqi2bgpt9jbmdlybdla67nbeaa937wbnwlc0eynx7v32iybruji2mfg21e',
                flowInterfaceNamespace: '0c4xg030l1nygebj3eqwycu4fqonwalfilmhg1o78lp4k1hufk45rld11cvwwlo2awrtmm3e7pe6sms9k4i9apm2ttjwsskmtnk5tzxwhg9eh46b7famvigq5pqz8h0u5gizazk37eydilcqbdorddlbfxanvnz4',
                version: 'ubykeegcesvrikvi55ec',
                adapterType: 'ep24612982id4a4orwi08pxwdnj277rj00sx5zgan6peo4xbiryf6hx3t1hb',
                direction: 'SENDER',
                transportProtocol: 'mo8t7szfacartxok0z8qu22wzvez0oqdhq6i089emdo11kka4xau1m0ejlcjg',
                messageProtocol: 'ky3fb55jfl2u8q89b84onjpv5wnfckmngounyl1c8zp52m8iag9jsgqsxszc',
                adapterEngineName: '0g0hzqzzxeju3bsrgzwkosi9udqapoil2wy4qe5ra878zdulatdel5typkyf72ehp8sxujxs6fs3t2ti3yipb4jn0ksvcuuer88ey6rq481bo9e6s75u87qbfezhfbwma5u96jvu5ofyodq05o7b2nyn5joiee2f',
                url: 'ef58ejv36p3ppi4ch34la9nx8dodvmts8h699xdj9wvwemssul1rxu46fl1y2hrudbn00k7rtn7trcxoyfzffd82fkfes7urj30latgy1nxcylih6ff4205lfn7zjejfxm9hh9zcgr963vnq4n7iq47k71k0w8iaixaz42dn4nwhryp1hgwcj6sdfr3urrnpdcs99tn4y2jl2lhyqro45hayi6cbw5otqg6y3bvsemxkmx3drko3l1q2b0vqvll08p7kq2wa3tn5751v3ahbxe534wjov0c2u6h96nnkcxpsa9efuny3mr0fq7is3z9j',
                username: 'raaeroatly92jy3a70650wdet4glycucgt0iuxwnszsnbhziqfqt9nwnwv2t',
                remoteHost: 'stbb9nwthgjxorgrwbw2jg9xupimbhk2q19lcwx2rmh2zumtsok748hpm76t9z3t9hxkpatrtocr8zz9a6rt4x21hzg3ybnoxkhas9d5cccadqw7kletp8qcc5h1ozjuifkrxfzl1cn4ovd94u1lqug2evrhgj44',
                remotePort: 3326730143,
                directory: '2zmu88tj42uymwcck76b8h2eskico8b5fak6l7ow6wfaqjz31cresta8gruv2cqcbiv2drzgaownxejwq7ki0d8dcbh4ssv3vkvatu5n3zzn3cs39kezcg8zhx7s4v2h0ek7h39stxweb5rw5tntofvtsxa0trcwtpbhvup2iv9a43hlu7w15dir9h5x08t1elip2jelnzp3fgqi1u4i2chjyo4wx32m7igqs0nw7tra8zw3fg3gpm7m571tmuiv4ihw6k0owocnf82b4f821i0ogi85qyncha8knyhprl2uinam0b82zoybh800hj9ina0zc5z1eupwn8a4m7hdfbx1qd1z3i4vnjovyto8joz32nf2qpymixif0klql209x4wf7stz5pdatwmqbz6ud4p3mnjyhqte0d53x53u4pqc1udqs1h628imjwe3ydov86z1s16djbc2rcqcmvietiyxq73z0v9r684p03muu6xqwuztz109hw5tpdzc1wixvrev8feytq28btfwt8mfqpif79bjgdh5tbspc9oix5yci6gidc7gqrbq4dfmr99gi621ylig4fteiqiqzn8ul1swjkch3zx09l4cy1jkyuquqiwi12lta90wi59hs9bnf1kn0ja0gpzbnovlx1apr0e2rf1e8lkxg4igy5ha31kaylt1fgvbkpyuxg0fhnte41blze61sp1udfow74hjaer5ua2zcnbd42if0e7wez6ndq7g6l5f5yz211yx8at9bv418rxqymzybxz6legmop2cz99a4bluxnbx7h8tthqj31wbm6m20x6ua7q7eyjn6rslf3uzfqoywzo4wvvbq1mpqug3e07s2qoxohhg5ryp1cdkd9jxvmfkw91fatutayda3ugzirs1g2qmojj35csc5f3thi7mhpvf6dwhrso6ov4qy3q5f0srzyq41wia67qynsqy8qvb47pxf86eseexr4ewv6fs0g0or86es269sprzudyq8mkvpm3uiip8',
                fileSchema: '9in01ayvo2an09r5pke5kyz6ttkcc2sevu9n3ry8h18x8wm42do066l56esd9zpsishgln52d20g83vexdj1a4ra8p3wtb9lzylzp6vtsymemusblgi8wrjyinqiw90ud43cyl1inshjpxr5m9nyc8ud5beh1d36y7t04q8abuzwy71nn584dmcunlc02ep9a3k8qptovx4042hoajtt8qf8yd73wu0tevveemg9rq7l0numb2mj8c88mxk53babz84dn8zyxskvyfo1cmx3okz4lzqn3b9uh10j29wnc7za7kyn8acdhuds3mg3efkn4ex8ljslwaprpt5xdz4t7myvd244xdukvwsg8ssh5v30w0deunic24dz3to99zrdhgqk85mxtmotgt73gfhd767nivb9nx8a1gaummh7zv5olzn3cie01l9esb8n34kebz2sz28j67f0mzjkkth8bhacc957deouokzbxlji3f0zo1r78oy81ewy5glrshl0av1miavnib1hg9kn9ppk164mo1xuec73a4b12yrjas9antnnnrnsxntaz5emxgoxjjq8dj3fp8r1ml1k6o429i6ixyksw4qjdokyqw21481uadu7935aexodyh2mvurc6o9rwx60w0ivkuqlgl6tt7pca6ijkapwperj8upwh6jxt22ndg1zhjg0yvz3m78lig8g8jxksg8d0qxt631ytsivoxwcmnh6khngsezvfsn6uvje5sv55woqop1gp567dol1ds78jb9tsdm3ylk95xzrxmf4bfz069386ndl6wm7vv7l2qwzg34rcqa4dvmdyu3n1efd6ywfuaquefq9gj5jzsk26xo9aub4rmshpuh25ea74b7vis6u3r142pqjp839nyp7eu5adauljl2drapd7hskb013vvymdigzboaszxdq1dqwcl3i28ivpp84nnyfjoylk25r7vd2oqjd8e1dcwf43puc6mvk6u014nc02y8yk91ykdm9jbmghgqn',
                proxyHost: 'vzec0h1kcla1yuhgl03nqrw2xwe6wwk2b5tag5an3bz1lbsxw91psg5o8eh1',
                proxyPort: 5096609621,
                destination: 'zoqqydqips2cjewyjmkq00ye4si81ynrh4cpdsff6sbv3q98cygnr53m8u6zm66fohezpe94scetbs937crfeur3lgrja91o5le2row8xwbe3uhvvho7hvw8w0vdwenrgy37bukmt80reaznhtckn5mv20n7jdpp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'l2gmjgl1tzo86am6bkupx3lalgqvfdelxjlyp5u4vuzi2ry3yacpktnuytqnru0xuexp6h2yqmlpltbq23ys79rf4juhgwjilns8w1uuji535dux2to1pmnt4q9wc7yql5dkdeik7b8lscfp5j7dkgwnj81wjqap',
                responsibleUserAccountName: 'roafkp82usokaybcgccg',
                lastChangeUserAccount: 'q9b69l3a1giwdxf5lfu7',
                lastChangedAt: '2020-07-30 18:55:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'wlxhmxy0p0qee5zy44qtdzimw40owm44dwe9c2tb',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 's05hba87e9ftvz389ufssr5tvi4696rszdqk8tt4yejhyi8nav',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'd5pm6g68rkw037z5b9xd',
                party: '4gve1rkqntdxtuzyr8rmciiyfbf84e744sw744nqxtkur72j3fney7i2pyg1r6ogs652felwo3xtp4xrucl9sazcreykg3c0p7di5rg1n23iq0k93uo2x5s80lqoj5hw63tc15uf21qevwj5y0n59bavc56pcdns',
                component: 'bq37limhftt9b57p4kdwikdk9248bjk2p68w7ow6hl762qlw0ivprnebktis1ughzug1tc0iwlhuu18r3r00fp4mpsj203gn3x4y0borz9vk3dd6jfikyh5jh1m43jinat948u5cefbf3qbn9m8yvc3p4l834762',
                name: '6us7tjitcgfpipr8js8g6fzqgmphr8m6dytkj5idgd21045g1ca31ia7px0yenxys588mq2yrde9hxzzpjld923io0ociurtw5m5csr5ojkbllko98xjbkak2jsj7ld73i5ml8cdzahx6ocii3r4cnth6wta35u8',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'yx3v989p8qaks1dfcf86a0xxefb694zoue3vceb5de78l0d7vmmte05u6o67k9iwh3ci8cb4wj6kcqkcaz71fb554lrqk7jptsu6c7hhwgny98c0nl1pr1qz0rzaiby6vota12omad7m3p62ehy9jf3xkx05luv1',
                flowComponent: 'quncx937e6kq5ra1a3ano0934sb8qahw574h2yw1aa0y4fw6sgxib8oapd90ow1yw5m6hv8fhkpa1f7bi2uwn4t12z09l6p8i8gw88tvicqhf1iooc4eesx9aqu5gbcw79r0up6c8s2f75awo6eemp5qr3tphp63',
                flowInterfaceName: 'tb0r11u6zge2w8r9dcyjznk7vblk82hzt25wjovp6c6doho3dhmwtkaiqxhxt6lqrbdti6gmo1bsdx4id972cs3swn7kgt8yventeakeyq8yqyh84cg50kf44wrolf2y0w0l0vilb6rjf0xecez0ncobmisceczs',
                flowInterfaceNamespace: '8rqsv62zfsep9dtbjr1mxn77virx8aom05f6xg2qh8dx00fdlaxn7mzq61tyl351ghf41c9pj76k66tazxc4ycdjiup2e8brik5ewet8haxz3x87zhno2owsbryrjjlq8p9kjz4c83xy71g91bwtp6qbpchzsgb6',
                version: 'a0hpub9ddsvq00q9l5su',
                adapterType: 'p4p4qeszb90cpd6hvz0obdojm36j9wt32gngbzwam1lkyr5skai4jo5tdo4j',
                direction: 'SENDER',
                transportProtocol: 'ct4wokx3n7hkk0x8kc60jo6zgv9u1w3j54ykzlzi8zj8jlgcfpljy2fzmcdk',
                messageProtocol: 'w8wzk6hmkoqkjsf1ubqu3ntfs41q6tkuip2b0s3d7l0qwi83umn1a18zhn3zx',
                adapterEngineName: 'fkmd0bvxpe166yp2ol22s4g254pdp4g3e8fhqaa50tlwkj9jw5q15fq0594705vxb1243r0k3jht2u1gfhho4sdglonixpnhkhiq9lsxg2jieea0iz5jq9swh6not6d1e0u106vvm5pgl4zhb9o2x152tbf5bbzb',
                url: 'kewp6u6twwnhhbt13spu8kecfwlcsee5yb294lisnxa8famavb5d73wmz9l14pheeraqh7uwnfbla1dv3szyu2ch8bs6qxsyqc7jbtf2zjxoz9dbewm0d1rlluqdh7o6zwrm8bnwipa661ye62xgwmpv27719cfaq4n6uknnl5q9r51umv461utpnroinhvv0qj0yhjyzo2ep3ix2p6s2t6mfe2fp2ksqhor96idcptqsdn5o8wx1ht8l6tc5bel5cxb1rkkkyemkkha2l1y6e2ctnyycifnr4rlkgt4ka7qmkstvex0urrjbiaz506l',
                username: 'hjx52nviz2llmb89lxp5fpj3ss6dsyy0omur1c8kophof35qgeh57wj5nizl',
                remoteHost: 'ra66s9hqr7comvkti5y8cj2cvnudq9kerp5pgx5xezkhgcpktzsne4xn5qt2aw710bcewwhw9y1d3b3pjcii7xe7vqtzbwm39gxtdcutkybqsoqlurlq7ctii6tyscns0os4hkdposxq4jblprlpjg4w0uqk3oo8',
                remotePort: 4818773748,
                directory: 'w4n6yuuwjooqj3r3z3iv67b881ne93l6pjxakb02nkey8dx4oie5h8zt1ehnvnedkbipgnwre8at032iunuhrgrmd6ecvoxix06o93pj9qq3m52eztnarqf8bfjg1igp7ins68hx8u323y9ht3i2ck51z7n0bsbkfk3opm8fdrklwsubj629t1cjmw7k86e9uf008zms0n60m0ykyz80o4n8kvpfcmtdh9rz43kmaaa49k23u0t86pwn4pbyxdf41tcdt3jzu0wu0osmbn74yz66f55pogycjhy6winbtiju1or8orwym51vtvsby723zudii9nkawjkuf09kviui2mt0x9zwmen8cyv5emms3qzg9vd57q3l1vqmib973v9dfb8fc9fck99ir9zr46do2bstwo9cu0o1n9bsppayp8jtnm5rkznlykbbp207uyoldzbar2laf2l0yytlrnp6zdo26w7egp4w32box8f93e87ckhvwa8i5lor6274gq9u3grno6zsa1ptl9cmaz6crsh1v2260tjk5jqfzx6p6twnglbp8ml3qlnvcdyp00fjvxhodekcntb6ezelns8v0470pmix7q4zyihqn3q6eon6m6yl2a6oqt8num0zb5d4lfni108ia08all4g0pw50dx5hsqd13mbocz6g6wkkocid3fmx8j5bjb93srvep2l2wbkc60dwji8mgjcpxa1yk1sx2fxvu600v14fn3rrpc7qnjhmxfn03ehnpatynm1yxgp0lg97760g92mphc4y32qwy514gr92xlzdoefow9hjmdzg5wwb2xhanpm9ryr7lwzhbyc17ifelo5kf5ldycbrslt1igbuct9jr2lformohx050ecm6na04h5bzyd4sqwyr6v8874cmy731q1sfyoyswlujnrfa9q85mivm23d7ni4rhimt903fkp6wm0tzqh2cl00lf687jyoof2na1gky8mvdw6qdd20f723jrn9xl6ny5k2ht068re1ji',
                fileSchema: 'ehz0azj3sjobkecbnae0lhqsjxyigtv4155th7thj2gfwk1byhl59stijrzdj76ww9xrkj9tmkx1sewvvpus9zfrx6isg6ut26o4nf7zgqrdbrqcwafy2o2yo93183q4mv2woumkxav6gonif2l49lz98sa24g2ddfdzme1s40lj7k9k3a8s1ku56iizd1zllh8ehwslyfoxl50rrh27m1u1rsw426qpktjmy8op0uf4taaci3zhnn80pxvh0ygogp7ua8jz3mhdalzx4i5fq14wrnyt85sv7uq1mb2pwhx4niv6qmymvioeox3xmqqo8wea81y1scmv0muipqyefkwsm1mkuqrxtgadk5j9l74ffpf2m4oo41hwpsroqgwd96vf3sgv5ncisc5e9fobj82mn3yeh1ha3waqqovg0fukps00y7fhjij79z63alhn3cgussvsecwzmu0azlmaaev2tq4lh7x19f7mpsgguor53sx9id3yi6yeuwib4me5lcttkc8ksdgi5orkbzo5lty8b2vi3cl8gt0h5t1uwd1t6ahkdctp59rte7hau4ffakviaqsk8586m10lt2x9860ipaweh9ceb5lvs0r192gwranrxvz4oh4azea52saaqj8tsphku3zfsoajx56upvjpl3sqxxb54jugqr1xra7tfv56p45uzaa6dsswmu0ok4rlvel24hkqnxfcf386ig5ymhrkredx2x2bt1i1l0c1qqa6lmpy2qqk50jxlpqpu835p2ua7mkhyqz573gtugw1t8a4lwyi16gr2gmeg4xyuyo6ms18goaz7dojpocq8f84efle9l3nh4k1i2o7dawoqp6q9u07bz2lzkudl7te5brtphmaxdr7pc1yi24j9zr47cpip5eh3shuvhqtp70uqety6isw78vpmbl2nivqort4fk4fwb8da3b37nyesx40g69q46gqxwscspfppazplnzbdfdeo0aneo5vq3wjqatpwnttju8bcwwkh6im',
                proxyHost: 'nojf07q75kvhvn2r6co2ficcyixvp6iuuoqxkkik4j32k09d8s95ldd1ga9w',
                proxyPort: 9765986456,
                destination: 't4iwmu3sift37af6qn3k6huksu0pwqmzeb6af5ert332e6x29u5j2qk2i94t2ffcj6hu5n4ezhavfubu6rrqbtwvv7ccdpcp95md6010j3zda8b0xnaikvt91bb57tvj7op1kvrrjpqopx4undg392jfrvzou6yf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5hl94qh6l1za9h27im0lx3bls1rorta3tsvi1su3qi7zkjngetlr3gafox0hpgvw44orsgljh28aoeo77b56jzsxvjf41usjabebabd4nvvkrree4g0wsxoizebdln0fyz9ixmulfuhsbn360s86e23s6xx2rt9u',
                responsibleUserAccountName: '74v00g0kg7v55uvxybb0',
                lastChangeUserAccount: 'jjg6v0tvv24og2m1p92e',
                lastChangedAt: '2020-07-30 20:30:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '6dtz1ccjh464wj3ohif7p80vd1yahyi1yow7nlq7',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'z2a4ak1p9xbf687saoixeqy0ogcy9xrschtv3pdpwdpb51l4s8',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'e06wtznx2dv1dy1xgpq9',
                party: 'icnw8oyy147ve3n65u1tv7lfjt4cre5mti0w2gdmmndx2yvho4ngpekb9ihyzs5d84dmxdxqe3s1v5j8zx70ljo1qqu39a2jqkx4lout4rqrkvmn99ifasdxj6rtmdhv2op44e9pug4oop0wz5zwlh1v9aqzeozd',
                component: '63f0txgmtk99ol0htj41538t4hx41xmfpviu1d8kkbd85dgew6iktvm6af5tkh9re43nfcsscdpw5g2yfb1qelwt9duqrsf9soihgqrpaecj3rdep4tj8amrolaruy6u1pa66jjvxu5kqybswy1apfk5lla9bg1d',
                name: 's5yz3dbh4eivzyecjbsf7aptzcyzu3xifxkiugg9mp43ftn2t82aq0tf1pdzay1dlwhqabyneq2bsflxay73e3avtdq0smdazxovdagt2nlropalxvcbkdtgxqpigzj0pji58z7s7xmqa4b1h48fpiesgheau2e0',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '4lfj0jim7zo43y9r9l3uqr6vnxp0843gtsr1e8y22zbyue7fn1wlig5o0emhupv65dxespf4zx4a7uj6i1o8chr3ym2s2zgb9k2ctd0uwrlsjxoch9rr017hpnh5bxe36q07q798hb1yabujbp3q9vyqbza4ukq1',
                flowComponent: 'il8jhlgcvxr7ydtt1qge7h4jgdvt6cfr5rdb7coeu204hw5pvbg1zx4mia6fxxhqgp71x7gy9v88c72ppc0pynfdcvkij0omgez9nahccvdobqoeqm9toea1cprtx819esg4ce76k4a26dub7il7qeu9gjllwtj8',
                flowInterfaceName: 'nz8ov9am0gl176gxurlx9kyri8ybn15lo834wkpk5c41yrjmbb2umsz70ra16bmzd1km7bj4jjsz4iyq1v82xkoeje0oraohfvqry366y5duj9afytzha8a2nf3ds4aye4hympf4c8epf9svfbe1ggtsh74rwesw',
                flowInterfaceNamespace: 'dxobijcmqenis08s9lm74tf0t9ku2mstbtu667zab5cqjrpwi8qb0b9q16vvzh2u63cofbiblni547opjaect2yphopt9gucg92z6ex2tnoo8xkieklfez0nnevtwm8cp7sz7z5f4djzmf7ky4g23iyi8164agjt',
                version: 'tnp70nj4rp1zyvk682rr',
                adapterType: 'w8sa296amjwz2ppanjba9lm1qsmv8sxsd7hb4wzoc9k0xy9vy4onh41lll3q',
                direction: 'RECEIVER',
                transportProtocol: '0h241krx8szfc6zey6drm8l2uv2fzdpvqkezarcbgaihakelsskyucgcf7f2',
                messageProtocol: '1tep7oyd0uwvnp1i9f16jc1zkcwriqw93wuh6m993aizw3hvqxn2mk551a12',
                adapterEngineName: 'nadcaf4frrhci1gfr2d2sw1sb655pb3fwsf53mv3q5bst2ph34p8ekumnvmuuvr8kjpgifn1u6pms1hj8cl1mudzau0xelcpgb8lzdvaprjffp2ckfx0pt413zbkfbefo6avbsge7xjst7ulki3rjx0us1x7v88wb',
                url: 'd6joa0dydz50j4oyjq43y7n15t14xjern0tm3jqz296ux6wp19ysmu1q0p6f6wmwyb0zuavsz57ivc5gqq96pb4m5jgm3z3zat7ndy9ewd9k4j5k48igb5xwgztap8jmu7fh5b1p4rqwcpt711dz4vbrb69at8kj2vzmhywylfhz0fw3sxv7vpyw1cuu7lj277533la6ykj2uldfwm4jqiqwn8q0jv2rxm9sj10im2ykdtjqlzy695am9byb7ctee5dwi7006qofdsewf6wnkg70pb70jy0ih6gpnrvnkattanlas9z578vxyrmbny2i',
                username: 'm1l22fbpnxti2xowohn6iu9pxq53l8c4arbt1lpf8uds413gr917iw9qzwgx',
                remoteHost: 'fliv4zll4pkv8stimppmz7pzu3u6vsa78ozf6lqm4rbyo7pchqjcpud43hqv55j22mgrw57yl5cxtiiyy8k0dj47kgg2eqhecek7rsohhb8hytgc8b160rl5w9i0el9fv2gfz1bg3gay1d2me2513kvy6x5z40l3',
                remotePort: 1634797913,
                directory: '88algsh9estoy7rvpdhrlm1q8nw9jbp5adn4cgaqveyn9k7saqab74g7goa5vaa7zdfpxx0fvkmpjah44pj5nsoqhmjmdfx64cv85oqx98an2tws973nf2r53onaju07j4ch1f182mh9lkph69f9pixlp6nkam5ltcuuo8c988xoy593ipzkp52kex5qp77a4q6yk3e7bk9g024a7eh0l4k45pomr3lkmre5o2bbdrl02hlobnxqvu7z9vbxz1mdpqlymakb4mmteupz9h434u6of95u08qb49fw8ry47atj0rvwd8h73y1l0vxn92zvkedv0y9mu03frkg06y6a7jorub1asfqd50g42nu666sgpae7dbbferkx0qya5quifbok9tgmu23g5x5gkwvijsy7hv18nl0kkbb6f489dg1zcecn9buly2xsxtyiqw0e6m69v4oqsptlwh60tthx6jsv69izvmpa4w82vtnv2n2gqbykft4wz7ivhf0et94ehzoi4osfimtnekdemib6xjvp3ghsz5kwitmbw15gce43x6nro3ze6da0lv2lf6srpraoua5zzrnyw4z3shkw4i9qt2ygx02ppth73ipba4h6x5n7oygpgkdaov7ci8g4hmxywxesidvnuc3hxpj7r0rcpqu2327uhmw9ki6vhv5fqy0m6nfyym7na1a8euz34o00rmbcn6s64jdoa4nosqv9jevf5i01g9uxjl6qdn1tnd3nqiglpykwikelu2yr8yaxcp4zil056ypnix1oszx468pt0wyb983qef29x25jcj6fxoj3rxa4sz1qjqpzcow8d60abtekcwjjscmg0w77ehtsc8i09v0s37oq2euqerzd4x58fp28wdumij30htwrszchbftryv9echhi51l1cvad8n860g7i5tmwydouyald2qc9wwap0sw2fk1jhna9etwfmozzgjeht24rpdmaxenzvsvv2k6b33nmcqww7puyegpcw8f4jr6ey1e6',
                fileSchema: 'e813qf8gv8g26u5yknqivtgo5t4zg8dh0myqvnc5b5kon3bte6cfib87ps6opx7nskv2tvhaafag8d3wyzyz7x99bg2b2xm6uqqtwzu2fi5tutq435r6ck99e2ko9nyjl9rovov25xh4g61wtz7asyru4jihi9zy32a9x2prr7yv44koqvl7mq0clb1lc4vzhi3zju20641od3f2w055rlhq3yl4s689c8yb48o63bmoi2taxo6tx41tqdm3g6x1fzjcj6j9knjbwzhznmkf6qw8txt4gqriz7983a04mtduztoeygxenlze4bye2pke1i2m7e58migxzx4tlgyzmwp6cbjvsdqjo50ni1yq3uy2xmloo2xb116806xz4i9reyhd8v61ql2db2jlwu29w3nhtprutsv4bze4mxmyu62wumt6hlfensj9x357i71066qhloxruceqsf579ucec9vs40vci0wvfr9t5ahy7oazo6th5om8yunxddkepkklnt6ywr9evlvyf25v51z85zj7jl206mpkacdmy5ymqm1n6z0qqtlrhhv8z5ampfib87fe02h7z7ro0k8fj5tkp5dzcno5lbkno4lvqdwioy1ggbv11ni6ndffw0dcil5uvac3vugk5focorv32tp046fldp2ucpdaxirokvazyvmp7cww6kbmi47qftrpfjihvnqdg7xeohfrouybdyalj03gxehf0pc5ql4xhhu5bhu5ro0k9bkkkfwgl2ati7fs6eawpfn4ukzccdan987xj0va8nc2ttm2qmqjppeiiz6ni8s9mydpmsbkb6ehpacjc51fzo9a8duk5n1pidlnasq2ryhngrl2rwu08o4aypk9b5zpf75ialbvec75itkmcddhmb6o13kirhdr146a8egyvtc3mt92u3922e298dgr3teaimqxoyto3klpme08wrdt7rqwywhprbueuyzfxi2939s37ms0ytftmsm0euot3pm9a2nv9a0kdomeun96',
                proxyHost: 'y00rwb5srmsz3rh15u8n6eivagn9zsphhittvkh4pvayvozryym3vae23rto',
                proxyPort: 8802263329,
                destination: 'x5j1eav6njyaglfycpbds5bl5bpujeazsqhj2vbcmzonp49u7jrlcrsms6bm488jt6e0pwmpzrb9i2hfrutx7cgu1cdt95ackliloscswrzvc6f3h6fyym1tz2tj7lqb2473pppyqd4fqbiv7xk60sxbkq62vr1d',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'berqmm9d7lt6485x2ohgd2k0djbg4km91df9ojgrc9mlvdtg2ci3serh02p1e954m0grppwt8ire1ljyil6c3bkhsyvmhcfj7ir4j61zhyujdf53zxw5oj83xc5ef9g93mg2uaaw6gn0bbwq2oyb583s0igvqu6v',
                responsibleUserAccountName: 'cf5x9iqxtbd4l97j2r41',
                lastChangeUserAccount: 'v1s7nxxw1843zvlr12ay',
                lastChangedAt: '2020-07-30 19:34:18',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'p05z904nnplajv9ksfd925c738mjw7z2aul7kpvo',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'auje7t0fi1awyy59untxev973xyqor18pf1fxmzr016rfqkl4s',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'psk7q7611vxf6g95i4sb',
                party: '10v299nn1zrxj7ki2ij131n0eel702oqk96t05yykkv4rcxx6d2unbnlentatv1gb6iat18lb1bgrser6w6sxt3r0m6a5j60xlbwwc1e3te2746c5pkh629vz46uwblfd47gx84q8y2ip5qy6p9ylanvkum6flwk',
                component: 'stdcm800fyq66c06j3vfubas1jnkahm3khw8r2b9yons2clpauzp6ffyb70v194kud0r312i57yfvf45v2dxqp5nxvn0bmsgbbs8bflsxarp83khjgyxhae7vtntlrboum6f9wv1fi47pje785qznvzxi7a1fxgs',
                name: 'f2utzrd0xv1j3r2t8cxco31mtp38qymm8wsx5a6cnzdy2t08mgx3tw7bm64gln02y1fgk55e9cszyn1lnr9rf52p92cp0d4vi8a23kn3wyrin5tum10gtgeb1njt280hwoiegag9zybqvn7uc7nwtw2a67rk10gz',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'bkeqai8iz7gt7r8f8ccxmjl25239n96i7aj0sdhdxukuw55livwygkdrg03vm9rjxtol2fqr3f95guwh48qef2y9mpmhvyrzejz8sbnibq2n47u3n9kqzy5wk8wol2wn904yz00rsemui7zjsl90aae7a206q9ny',
                flowComponent: '51jqi4g9nzygweb14h1imi1o9l8t2181vctaotud87bx6r474e19dcnfpzg1dhz1qr4m349v1bbv8xdbrpk18pvj5qao468uxol53r825avwra3ysnfvod38bg5e4gvw2sc03sjf87hy6to40lqts0wcjzcpi3ik',
                flowInterfaceName: 'pmtobjmnqjrh10quletic9yourea3hvgovwhw8h48aqtm7psmfgbr8f9jfw3zfiwzkak51n7pic5xabfhs9xar3lvhw5cdzoxyq1ntnz2gyqmeub43z10mk7acf0uoqll3cndbrxhta2d4400gsewiq2fdv6bqil',
                flowInterfaceNamespace: '0iptji2rtajob5cvr8h9itljv8str5g3320cdyj0qv7ehdow33dlimzxet2eqbyavimyafjciturx05t73al30ox19xc2ll8ik89lzqge48mg7va9hm4i7ll6c24xspc1cgw3imxb4r2seo80dce2pcsdv0vgg03',
                version: 'd7eqxo39i6ad036sddpx',
                adapterType: 'pqwz2cfoeh28y2ms14mq4ydfz4174yclmrcfb9bcjyjp27h7pxig2lc7ic0s',
                direction: 'SENDER',
                transportProtocol: 'f2c6oyulbnaryrnqhm3q0b8dxvsssxzftcdrruuy1f202bs457aif9jlm89m',
                messageProtocol: 'kbgi391dbmd8wehu8qfs0z4nabvb33156vwe4tp8jzt9cvm7s9a9pobv2hpy',
                adapterEngineName: 'po86c3ynegamfjhznn7jcvxz8sj5byj2spjh0v4crxgwlke5rgeridgq8k03lwbqisgpkp46sncjjg4l59edjle4oavzce8215wvp8mraup2jga1a70rvrbtqsocfox82u8b0lq4epphpo6a8r0l936fjjiv8re8',
                url: 'cv4f3greb4j6d50ug6y6esl196s83rkuapkti9pagi9erji9eqh5555p1g3zsq0tjjxked4z1ddk8o3ad1e6qirpfff820m03r39riho98g6wld6p8y586nanmvhu0g8chctonkzq2jmg63yti1dxxifthaikl609da0okzrlnleaywyyuoxqp7hxg5r564q6vjhcbpwn1thnrbcf0x2227pic021wd7q58r444jlqvx4rs2h19fii05mbtgcj42li9xhji27mblqvo9too4kxqnpgz8rtq4xhhd1787sf6omfldjrdij8c6165hrwfpo',
                username: 'h8bh0ebnwv7zsfp5i2d5dj13x3jmiiq2yax7ne1005r0dfh79r9fijns5qm8',
                remoteHost: 'qztzur35otso1z52ca1ckoi01yr0pq9i8uuwts19sj78pxdvw92e60fsmir3kruwzsajkjt0i9voj3v4txtxyqqzaprtz0c4b4rvu61lag4eo6n5nfsuc8zv0jak70mo106460ldoyakjhkx8ho4fwilp0fvbwvq',
                remotePort: 8788292989,
                directory: '9c3r4y5lqg7w4rfk1u417aqhz7r40avqbcespa76ou56yqg30nxv5sjaxte1olx1r4cf7m95dmd6aoxi0imbbsa8d1zxb0xqczxfejt3sixkvn59jm93q2geis083vok71r3fhrooafr3cy50arbrkzyovp618ny2lq3f934w7jh0s6hpkq97lzyjra6j9e7fwqsscqi2hbdfpvypzfwicmam6zrb9l2fkjcd9lhwpp5tbsp54ldpz8u3di808ox41w1ul5i0tizyes5ya95hhmh1beooeqzxmval3qmzl39cc770sr3oyy12y0ivs2fcdjtg3nteao9tsnre13xpewxhmx7ozpf6vf70aj8wmuvxjxicw65md7pd1eqakdwdg2s9hafcb91e3b2dam2lpi5ffzjbahmjc97yvasy9vl7po3l7g7ij2ywuz1sorgu55wot1lpn2l9sludk2lhdjryg8eof3em9tejljqsbud553xsnci2d05z19mp8716wjzjib0qepiobbk5iqrrta24abun727lloyqeq3tjymhoxi10kpi5zhdutjn0s2kbdobueqzro8rif0tze5ub1pxefa84cgsh8368yxhqovhky88rev3w3dry6a4z2w4dkvg1cqwf9si3zboawr1rmq6sdprmrq1qeipbb7bw01nxqoehaa66qezwbjxzyvxcs0mr6tu0wb8z7hz9iv5zfikhkr4621epqa95p6l7vp6pv6t6o4kpapdg2jbzcclspn05h252u7bagmf5g1w9ohsyu2emf63f06r0vvbildvgxpadathk7uufoqnfzrn43ox9u33px2sfndype2b7v2wig8hswn1z9zvkg991d7andf1pfy4eu2sak8jt4h8n9rc2s8bw1lqkrw9538ikz33do9s4mze7fwgevmseb1vmyicm63ya6oowftuvjtoc1mycsrs5ypus317wrfih7lxfvlivdcncu2y0g653c2zy9o6am42r5xkdd2pzmj',
                fileSchema: '62ijh7pacaki888j8jr2mfzz3932jcqoaqg7b22m7fim4wh2nsxigx515zuctocic3vihxo54tqhc1rzrkj0t6421cse0qvx3fhqbkyxn8bfcuw4kgdjcq0zzintleo0otvqopqus0llrvggfbr3k4ztwrdi1s55msjwhq58dqznzc7thjt6ef34kynmd6e9wt1fg7zjx1eifbjdgp43683w6i3of76m035hrb11cd65vn463yj33eemf1xhxjsqvm3r9mxzrfkokrx79zy5ben98l9z85qbwmngx22qpkzxaqc66z0cg3l34ejzmj4dsni2ofhwosdy1wa21qce45ky5p9bu0ruy5zwbkke0p5unlwpj2145bis7h0vcow6xl5xg3tv2mdqo0tnyru9qnw306s60hdlfvxdrxq00nl8b4qkp4sfnz01gcncjjq6va4v9pvuu136rg2qqhjd2kzmg124jhep8q31yoab40rddgce5l7a7zc3kgj369tlcu2xju5eou80orkt253j2qe6e0sag12bxpi0j3g17l4vmgdlznwtgqc0lxxr73qoqen9gg9ueit1b15w65dbopm1jftj5fn0r95icv31ukkmtryk1u8qz3ko6whgj46yvwrllc1l3ylclfdqtvat17wxj279srm2c0m3vce5b9130gg1v418sj7oocayo623i79v83mty1ac1yjrp7t50prvrjvn3f98f1ru9ezqqu8mn7lo6c581ef910p4jqbz320tzft2uuhvvqqbbufu4e5h63vmodkpip4a81sfkrnck4p3ne34ig868e5bhlmg9k3rytqp9khnfcme8ecbc2nr2xj05025ge2wvnil58rrlsh21fzksddymfexyrix2d2fyc6rytqmqizkhgoadz4k8dkn0f1ei9xcbx0btsidafl2e6zkyptxdauwqy7j4x4pqzpdgsnoh0rmzldy877kvbqluag3klx2eunqdknl33juo71g3txcql43gp7r',
                proxyHost: '9o1swchddhlc28196gntz0z6j02b7s8f8okbycda1j6k5l5tohex4sei3t6y',
                proxyPort: 7194928613,
                destination: 'bonojktmxfxse8f8bw9yg1o3un4ujrvb3pswszyklog05pjccei9h77y1642gbuni2pdv6ck9bqhy7tywf3xmdil51fbbl606aflnxt5cvs30zjy9w7603o9xoni4tda1u725yx0wmws67ftkrttq1y26sei92o7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1unr73lew1bk3i6rbilxt84qa6std5eqxsr5rpc7pw7qhp6ckx8g0gbh1whofm86pdr0qs2vxanfco1dydmfb6yz9ixhb8cakaw5tobxgq9znpl6fjeb9jwidjimsa4jhv8061puimqn9lqc2x1nb3oz56y76oqo',
                responsibleUserAccountName: 'eudgbyf71x3yrg0okoz9',
                lastChangeUserAccount: '27dne0z6mepf7059dnfd',
                lastChangedAt: '2020-07-30 17:05:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'dk9w8zan1u96ed2cj0p4jwf0mw3gaij8dncvpq9n',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '4eu9jomu3mdpooi6yrzact056pl36739uurg30hqomv45fbcrm',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'uk4ygo8j5ez8ijftx0dl',
                party: 'phz1riidi5cxejklc4v52eljax9v740dka0c2ghvrvpxiq90p2e5kzt9a6k4d6goragutfkwvg1t3ieyalmqaulv9wtmmmq79qqz49euo4mtj0kbxry0lu99halh38dzgnjgndde7ttoj8hwcnt4keux3nmoz55c',
                component: 'xmivbwlkwp1gc029upx8xjih6wwdcsbp0dtckgn6azv5skzhuntwpavb5n1bfy18rt9pta4a81i5l083ydrqidgmwilga553lrbkchhabhb5tu5fsndgwc63atlhp3ie36ftil45ghbyewt0avp5kjilzgrx3w6v',
                name: 'vwngsod0vdqn67kexwansb090my13e3i9jzp4sm019yutoiy19jivczd0tbft7zfhjhghvcis9279xl1kf4etl3a1ogscaz6df7sfepxmb9ghhoxm7xa0szmib0todhia560a7at9cfvxiz4ntnkeghlmmwej0zg',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '0e17p0232l45o8w97flncbtlz3bgtijqx2fdbq7ni9xwjtm15rg6ydt747lpvrm33ts2l5jhxqn4uobx6mzsrer2y5mj9vejl18286kd2r070eqb1b3u5c40m3nkeet7vr3empfp4futq8hnlpw7bu2nk8ra6su1',
                flowComponent: 'y88aox9vwtko9zoh0qyhingfbq38ftgfxduekw116yv8vpqrgln865tdw7pucmjg9hxts3k9wgplbp8knhzkdjfn2cyi2ejemvfpfd5691hpiblvoimt1opttmh06zukraaeebk7myn61d5jy1wruqc03zc2h4ov',
                flowInterfaceName: 'nhrlg6eiyqus6uf1mdmy537nvxngo67n03szw4leytofj4l2yt55piwr3af4c1p0c9pc1aylnxwb69547noc0e1wwcry7pj5t0u9efonxthawbpv8mn95voanlzle3qhp82d8ueg7leneowugy1oldumdww3hgiw',
                flowInterfaceNamespace: 'jwskb7hazxo5tn002wm8km8ohpmu6pomsyw7j0cdtrbjah2kxn7g2k18nz0epsv480vtsd7b49tx1xc6k229iof2uedsa9tgsrbtmsklmy09nhnhsg78qe88up4xz15olfakp57s1j0pnhfg44xb6wld0maj2rhx',
                version: 'limo1k5fj1r37isslbpv',
                adapterType: 't0jlu7nho9xjouv9lmu180059dzv5epib6zko3vqp5nu7zgjj6j4uzskn3z8',
                direction: 'RECEIVER',
                transportProtocol: 'iv8holtuh9mj3qwpjpl30wwahq6hd0jfvk6fs78p8jw0uu6d39u76mffv5i8',
                messageProtocol: 'z85p1fp26gc5cku76wdr9u2igjaa2bnhup5nblrs06wpagj152uln6jrb887',
                adapterEngineName: 't0jcbtwedngonne5uaqquz7gkmgxvwlycwsn3lbytlpqbc06vnrbwtpyq42hk4qqu537h2lwygkzrd1ez4cadjycrfmar7imkrhmj5v1v5uh9zxvx7qhrbiymk5nxqow4h7dz1jtm78jwlq959l1k6un177lv5hl',
                url: 'xjnt9w8rbthpi3r1boxqs8ujsy4cbbmgi3m5eydxapy3rdg0hy74pgszo6fhjdcyhdu29gb3918o4pdzvhmv060awptdnr20e109z0hc7yspv48caq515qdgc37wdsk3qnxpadix47tjrmpy3bhi47za5buj9pgdg6epteg42vubk9wd3klus3htq5c7v63vmbuu0qhu4gvs6zx9cjx2emawnfitvaaseze6wn7iy7upg35hhqgk1eya4yl7ytxhledxgk533ersnppakqgl354lceulnfsmtzag2gfadgvsqndhchenc0wqt1kl6z3n',
                username: 'lqngsh104jf54emi01mnqw66969y3jrz4a20x2za82o0gvrsmy86xjwa93otx',
                remoteHost: '8d95fwhfmpd7cgdtp2vm0dgjxp7h68tbxfq1pr50m1zyb0t74qq4inw0g00uj0wl92ayp64laofz5ms2h7t3ipl0x1d635mfckvnse7dom84jmbbx9p6kbsx3cusndtnejqqpplbq1md0vk33mtwhx51p3mihdei',
                remotePort: 9901403179,
                directory: 'c5jvkxf23npr259ghwoosfbf0q5h62dh37vopl9czaioja4g9aipgw4ftbogldhdqnfk84jrel1f6tmjpkzfic2jp5a83a5s8rpemdh037oz5bznweayxte33qvk2xlabkpep2kxm4obfazzr51oqnc7xw4nmw1rx0cs5em784xmbdmoj3ow7i6uc5oz4j98dnp0yoafyjttndwd5v5hlzmf854901y0cwptsv7fl16qsievu2e8j3sqvggumqc8s4lm8p2q6va9kbhfgjyyuod8b6g4i7gpxndrlu2c75zshazgk5mu6jwljxedgnqbbqvjwrjzbvfo5fg3up2qktrkx18m60u5x1dqlnaasptvwuco4e0rsdt1pdn7vne51heo2kw9szy4vmu9tl3p397walwy9rtf3zqq04g6s35hm72yrtal10zinusn7yp5zwf8ywv1ucejy8l34mvo5dt9l6j0xu1jvpuc302am2ilqfip4g92zlvjd8hst5mn64g54f1iay3ug1q5117zfftoyzlcrnjsttxbpy29bfzhreyjhei0kuefh2gktb91jz7cl9wg52n8zqocz39velgz2e4a1c4fjsv3jwt9p2ge7gxuafvpubnui318e1rqxopmqkavw2ocuuie3ayi8qs7x1hwtx0wwl1mp949hf0pxifvld1g68vpq3u44ttk1pmo6fagxe43csgok30ajtln45qun505c7smg946jnvj2mkv03nyz9dc6ni9yht9s2lslnph6656ne7u34mi3hc2sgumxfz8570d5l6v48moe3nemrlyzpz2pxnjpenletb1dyad4xgpa5p53nxsnklzfqqufy2hrtlrntlwvyoqqqos3u41ldek0818vhaa2p3oh3b67e4mhi7xguzk0ylyof0a424brrpv8r59sjjtvk9je3iqloqa3emolyy20szt56jxvz1vc763c02p891xjeot6mochwmlvnyihcopikxq084o3858q4bfvnjm',
                fileSchema: 'fdglhjy43nc5pp389y4462zw32ge2n6ny3gnvn04dp6tozzu5na5ybjj67v46mbl6t1nf5vfm5zdwdp8k321wx2mn9i33cwv0p974418mi0tu3ua14g6i2yrk3qkxwukn1h46vujj035bn64qsazfrb288erz14saggrc9k9j0frx040yeg0snmkajbldkzzro3mep2og1iig8zegu55ubvxg2gm3nnd6akb44n9yns2uxvwq3f0y4ex6yecerh1rv8ejmiq9asci5e9vch4ldttndag59c1cx78vfl19b64oge250mh9gggqk18qran0czbs5mw9h9u94x42l431ginfm1wr8zhfg8awa0gmtl8awwbz2wk4ifrl5oki16nnxrpowshrupon72yz6znl7i3mwiyxa7cc4ttv56grdne6mmz61n0wzbbvdrs91vxcw92l6wkwb0qkstz5zlz8ol2xqcvmpbkq0bbdgn8ann3uwvtu7np6hauv1291wxj710kjzigmxgqq5ql517a1tag0045qun31obc3fas1gq3578enw1zvd2tbchqtl1lacwo2jivfilaty81ipm827udrnoas8gq5fi6g80pi40epmmttgsl6apvlni0ttdes8tq4151vy4kjh1t02e48tth9xfhhmh8qwofkxq4pv07gem39l3d7ozj9lvop9xryas6a9zao0mdprnw89ig9u9cn1afuw5k0nhdxaqilkgroo67kqhq0is43b9mynzqy78u444regztt703x48omjdx7aexn8wp5vaxhv67lz30yhcd7uhi0lbs4xfhnvatktnmr5xxp2vyj2fw90232nsllsmjq2a3kvdrayymrn5skrmogg91yxhmrzkqgbijzatavxrtgs9untz8u78n574nqte6vs4o9w01awbancmfmelltu47o2pu3venj3juenu0goborn2ngihv80y866698midcdubmmc02p8ll4pgb7p6wpw3om5qpspfw6v6',
                proxyHost: 'zyxlf45z4dumcxr0yqkdemk1lyysgpq8s2cqxvf8adfelp46axfhyidywfv1',
                proxyPort: 1199661454,
                destination: 'tgf3uq9cfici6yegw7scwmoqtva7ltzpf0ucndxfew2fvdjrrrgbjydd7hczxbzr80si5yrptpiuht3076owzqizh3wix81zh4hv6ucol2vbd3np1golie8obey1p06dprlj4m0tvfh31vjf51jv3nb0pgb2l0mp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cz79kf62981fyfkar4iguiqgrq5yspl1miuqv1tb6csm9fctah8gppnn3e7x1p258n9v17y7kwzf5um9kekripmb475qm5oxj6voeuuhp12x6wj4eaf0ba0bzmu9ez4uoww2qg42uwdr2abfzahs58fhltemsg61',
                responsibleUserAccountName: 'sph3cr7j3uqpkuqwzpx3',
                lastChangeUserAccount: 'd7tbspisjr7excbyfb1d',
                lastChangedAt: '2020-07-30 16:48:15',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '1mn4txwxoivuy3mootssocar4s50foero92pk3lf',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'cfhl5fyb5w2un20domvqrwxx64wnn8fbc69ntda213p9kbcn7z',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '6bbk064hqv51ehqwdkge',
                party: 'kpat8ctqzyj0cvyhhrcr3qr0uxsupih93sdje3amzzf1jgawxd7y08fm95lbe93cj81xuw9twqzuebq94kyalgqj2a7nhuh87hzsluk5oa63yy1b4y3zcl4o4lbxjuv2nurvrn0inhixzhk5yq0bqaspbvisqdmc',
                component: 'bn3qubybevu2vt526mmvudbo2pc7ok58a7t965zfebvxixlj4pyqcx6gzok62vzni3uwskrvf2lii4vkczw98jqxdt839qbd9lvh52dx2bw7xxcjtno3mhb4cre9hbwvfd18u9hbqgkwevs4xi6lsizz1bvtjnnb',
                name: 'o53dmabb83mg3o3xmtol6pk7ldqwnlqavgc0dciq0c9f9yuyc2bmrqxo05rxbdt9czvzijmrkr3x1941lddfawhtmzmy632z33r9n1po19t60jqzyllbz3zurej8z62ddi8f6g9ewnsvh913hc8pbl7ianl2qncx',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'ivlpsprahy6h903syhcvxvxzstire9vrlxr7zupdn72nzsmusc6i41pjmrfgwoedzi1g29eg2iy4ms1j70uo4koxvh8b8wthhe1zszht2cic1ddl51xh1uwrdisq2nqzpgpktx3wcqi5mdc7tj1lmmzaklbva9iz',
                flowComponent: '6ha0up60g0xtfrfjs4d6xgkffiqdxl71bwz5tpftrnriam10sasw4yjn6kn2ghlpseigrwv3dxf0ds7aj28a0dsczu46j9t1ngt4m3h2r31pawyxe220s8d2gorkziwf9phnv6gz1wb63xatu30zg52e454pkp8m',
                flowInterfaceName: '34wrzso5tyg0zyhrc7ginpli4lhv64d782c2doq27r6cwbp1cjsox31bs3axr0ij3smrt9ndgvanhasq2haqtd1ovdfh7c3s9fp1xcwhuxibsvv0oy8tiuzx9kmzyfpdxrtiw32fz0d9g49u2lruc6j7m5md3net',
                flowInterfaceNamespace: 'wnmqmrmzn4dtyyke8sdm0l0c0ociue5j91mktl7mltrgn1gyrhzgv7l2akmax8r30q69cxz922p0sw25dyaf82kih6so4avkn35se9vmnqxw3710togzu8ilq9lyqmxo59tz8pdfqbbh8qt1pj1trnfsaa0ht07k',
                version: 'ogfgwvrir1mczzkyr2lp',
                adapterType: 'qtk1jwced9a736p59ccnrg8o35qhswred4fkpg39p043rj3nhs1072g3zulq',
                direction: 'RECEIVER',
                transportProtocol: '8yq2uwjf17fpvixu9cahd0di928w2fh0t427t3k79nl24jjb2hkiwvdkwziv',
                messageProtocol: 'eh8hrm44p1m73xst3btgxfo7vlw1cno25t0mtdspyymflfwxow6y1nj51l6z',
                adapterEngineName: '8wng5jiic8rgrv6kqdup326imk7dg33p6gmd27ec3inobrjcrvekfqaejszjfbwcz9f6qgkoprdvgteid0isliyws31boncvp1io4fp9f9zrz2bimtfhhamg5e7ajtmu9xs3tdvadcyn95ra0o5moxo9ehmiao8q',
                url: 'ggdif78bou6pe0vz0boj5r5sntjiegw5wztm086d5nafihk6alvkaz8vhnif0monmnm46lnpvqxylk2gisdyj2wxfpvlh12tuktqxp9dbls8q2d6rgeb9hxvmoafja4tym1tebadhkobn5e4xnn4p5vx07rt6y04vg7e0wqlm8280v6dl3ghrwxo2yslmvrux4dwdnkuegolji9o51cpd3og6apjjy5nvwjpg5xe4lqknzpaklhwmrdowpo5tb0veb4cumfkq8c5622mn96mqegejbm2e183jysoi0959jkl4k43bgkan98di7vsto9m',
                username: 'ab9r0x3h93sax3q82j45cllceq68ynl5bwoog5s86zmtmxjbzucplf65vcpa',
                remoteHost: '93nzzdqpgdjuupp64hj9fczq3bzq4kf5687f2n6o8ntt1jnq8xd3u2is2jbt1b9zn9vj9r0tlpgc8ws3akvh6zo74rmekeex8us8eah18czdqdwqvbypuc19wxvv1dqa43wekckqzvuzhlse9p8mro6jq3bbvfg8u',
                remotePort: 9357613209,
                directory: 'mcvfs4stipvgurbgv8fecsrlb9dq886o7znf4xh8d7s82g61e39mxo7n3sun4agqg21t2hr24aelgj7o3spqfsopcfz0uj6sj5kg7q7hu84onl5x3aqo0vlrxajln8ifjgevhkdplscjb0qtgcaf7cec268saw82dlv9bctcb2v8djb0akbi5dho8w1h1crx52l4fo4b351tmu1qz6ka9ad86gm7vz08mitsbl0aq6kgor5fxz0zmh9og349uimpba83t8slunsumq4diaph6p01qp51zp59nypkb6c39bgkygntg5bf3c3rbw9b31r3hwal1co7dh4m4n4tk5ui6queuyy5iczxf6ne1gji40xsjr8v31gifwmgn49lxy38pk8obhyylefv79818rnqmjrls9cfihbdvewxng0o9zmrcy0j7t12twstoc2tb7pt6th9g6ajt6fjrtp91fl8egxdzqdcvjuzdcnu9f6sy0hpua0whpm6r6dd34lf5iyilup95t0n8kxy83vuf2sfqcpi1ok9ln6gzz47a3woc7etmep8dedg5no5d6ywqfykspnm6o47qf83yapk7p38rnarr65g4xbft365wqphy506brrd251syfhr83mc99d47q62uixbzrg1x9f85nreyx15wpujidktmxlcd8xmrtlglhc9qdnzi1ca6mrcfjldx558bc779jzteh5fi4sy7atyls5ibdahxentsy385hdy1oazpq8jrviqujf3rr781gprrp5qk8lp5rojq6zgyk0ez5ne3gh0rlllshzft094lcoqfhhqmb85k5y22e26rn525f8buptz2p63a2ahvx89dsw33cb8eses7zlza5l4cuqlu3oocdddvr3l40d1y8h9z39mr6ciraiac1fdc2yfb8dlz8sr4eq3ag4u10zuv9na4t842qrnmw8cabhu8vc42iqb9d8q77gdcf4rvrxjz41wx13vynzf65l5mud1ty6j6htpazpaaqixh1qe',
                fileSchema: 'v6on8f4mzcgprypj1mdnwqo7ptgua2dcils786xsdeokizxa3ozi0z9rfcaw5gz1tbbwjjpok2n47ctxkhzt6vkwnizqpefcjxd0dqpbqyjws904aezdsllxzhbsk18ovijtn0d55rbr1foxj97534qggclfqa9sepftsvg31fu1ifvo4kj9w70y44y9ujwpo6ti0zqyjd4tmhftvq8l6aql5wp3oj4y6nc55zp7046dzkvdkfm320j836wx4r764pfln3t982mhar1mxy2zad4yk2vl97ijatfjuroa0wf02qn8itk0zrctx2f75vvsgu8r9ya2ibdnl1hoti2s3q158p5w0dwwz2w82ze3ocb5lh92k2fov9thnygak0laliluez5g69pkep5x6f3kvt07p8t3k8qno0g3ioe7fs85c4u22kl5dgvpqje12v45pegg7gt13ob8wqmw0wtfe7jzkuiadb6d2los4vvok7ltobc5dz8qz70ktpib4rrrd728dc9j2ylinxbd3j2neqqrui131rnrg6ussb9noy7nhvqtvuyptzpdot11w27saadrbnmc99n712v7ucxufnbc9n2p69nyrele9qsadxuj2j3bbtele0akkpnttik7v7kt6f794tdbegnsjylc0ikh9up4i5dp54iv8kicyhs39bi5nd6vdmm2uw88mk6turyab964hnhkq7m3hny8hihb2c4gjpgkwe02f2nzligh2r5002od8iwzx5jgrssfgh9lc70jkubaw3rqcytth8l5zcnp51jceewsfyaem1v7o8jkyza3kksi39xv4024krwq2awozw9nya7empoimq70k8uhkauxwntec0rsoci9np704iwep6lnqzq4vp7p03h4qd2sep6abs2us8g3c4srbjdu7b1vdzte46ufoph4frogtnnzxgjn8uh5cic1buufx2o2k3asbuopn39as9iwuelmpu01q6cv8kcwd2h2jsu44posmcquklx5n66w',
                proxyHost: 'q0nhfkcji39uv4couohrl4i688315i0g2ick220zqs83r1bvt4dz1quek5mk',
                proxyPort: 8703449962,
                destination: '6rqr2ivlr2t6c5mqh2m2d7np05nq7a4spozeu2rcadwqcsc62ohfmdxfm5zqiuq15f62vahac06aemfqv65wv9vpho8o6ak9h8grwj4hnrtglmbqnn95b3rqtywjzgul6vg85fuvbyo7amq4ojx9h5jzjfdt2g0q',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vmbb0qyturpgjgowbp4ptsqu682bbgzjhwozqtza1pko2qkeea9hgn4n5qoblnaujpwzegfmgg5qwrah2l77a1i9vnl43y1lhth56oa6fmg8sir8dpc9d86if0xwwa2tl45wxqzeyeog4zohjhrkx9czoimnjvek',
                responsibleUserAccountName: 'eys1tvwi1t02jx57edj6',
                lastChangeUserAccount: 'v7y8bu0v3tm366ymrlob',
                lastChangedAt: '2020-07-31 09:02:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'v7s9zo42ux42cf2jb3xc5kr8p34dijgj8beydtxv',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'o80j5zaeohb8kdt0crxz0x3x5gzyx6ms5fnahjvuh4jb3x7oyx',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'avrbzxsz4ooem02tjr2y',
                party: 'qeyhvfmg3unll0twcpmpyonfffwx1bev7yid9zd8z4ao2hw14ipwv0qm3yt8513h4zgy1869ezewjdd865b7uaeip66inr7z1zh7l1u05x20s8h7ohjpefi7iwinc7j4iky4yny0zvw1ni5lb0oq0y8l7qrhq7op',
                component: 'q2x9uqbe4agewhdpf7mro66ql6atc7gu7buu2umf0k98r6yf4w4rdatkftiotbxlhjbaswijrr58kqapgqifzcfwni96kljm4wt72rqtbggwio4g73mmwpmvzx8y6ilhuq2vlk5htp8mgffg87kgnkv00df5abvg',
                name: 'thn8ei2xuz7z968po36h4pcah33rfbq5uagazb46q1j94p25grr3dw4dksa6rgbqp9z6m95gyge8c8k7rehnatidxghh8atypa8n4cu2yuhnx62h0v0dld90jfderpbr7pou0vdtsvnnnorzzn4fisudbha412xr',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '88dfig0eayp1fm2zilerrluzo18q5t1ycderpm6d1wqcybepedjh8fffbda9gy4eemktvue9zs0fu2syrado92oq5p0txbazrdrjsko774ou8mqbtmdpp42s20n929ls3vfc2j6oav9uogg5c80ohpvggy8xvt5c',
                flowComponent: '2fytlbcxgcyx7cq992y3i00rlw3udrformuhtfos1185tzpbgfconi38vaig7k0q9kcwik99jwcnz53hh7lxkr5x8j8bd4npuzg8235p5uo82csfnm3v2va7di3d2vjyjd1fq53ibjp5nx0thsiqdluh8r5mcz2t',
                flowInterfaceName: 'qdz3l0jznyplqsk49tf950y0gkqjwy2qt4ked8j6ez2168c50tu7dq26vtstj5tdja5xnjy5tu3n0n3dgemk2v9o6xn8pvukt4a9udwls414b6uq1gvs1tcl5uz3v2pqp9w1bjyg4u0rdbn93yb7u44pmljk5mso',
                flowInterfaceNamespace: 'lh9l9i3k3jzbwvd1nlwguua6thihjg6n9fqnp3zfntw2xf8btvtzdvaw2qwgj2p2p5oajfi938jg729p9g5ut5jlffpf9zx8lqrqu6rprzqgxvv5izt7lv2dog71modwb74fytyv5i9orc9w0l5fzq0tlxpvh4fv',
                version: '79a89cp737vfwbbc76lf',
                adapterType: 'lusg5ltfiygky1k5z8f3l0x2gzcaxc4621ra07mjn2q4felmexw1yxgrlt1f',
                direction: 'SENDER',
                transportProtocol: 'tg9b805c4383uc4hthg32fqylvc03fl9f0rl5bajr16wekkta88btoobha82',
                messageProtocol: '84ivsoas7f3xur9zww4wulzkyyjlfzd6r1rapiy9pq0t9oajtb1p9qc3u8eg',
                adapterEngineName: 'nd8kgnvct8i9sofv9u27xnaiploklg5j7j9l16yqbk77gxxkj38v7069ijo8kh2hlb35hiakv87all7tr9w12dev445v5kds1ke1r0iy4f9xbaj6ehfg5zvhgg4f0gd7u99cc8x2kw2isjp01e3abxt3zkb4k267',
                url: '7nhg5ok34vyctcbvvt6p4sm9g6n9qlvhjukpornqanmt9e9or433zvxgw52sj2ynjsdpy4936x6akhy6z1p7s5jwtanla7s59wt5348qcu2pcpc04zsfsv5mczlu1l9c7q9x3azqneoxrmkp32eqj18jdt0fecrdhefmmodfiak714swmh3aysnrszjolqvlryzba75y4krps5v0fpj04sz1wwq65jjzkaqpxjaajpg4ot6wsjjk6uvx3pyz4a70tip452svthxz3ubmdma795397kt6lwq7751nbvjnlad0g385hg4odnzuu79kjg0t',
                username: 'zf9etk00aq33009n0ulejzkdvivzcm3jwizkt86u5sgv74db7lf9u36ynu4f',
                remoteHost: '5g5fzi3mn5h6z2fovev7tptwhqulhyy4ptla0y1lesm04vzlyy5u7n7vnymgd5cc6uy0kx1du95oafqqzk7so3ejcpr9kxb45hr5251vy3dsp1xji2ui3vtgb8q5zdthingx1jkr8yq9841rptbpy2rmpv08qrhy',
                remotePort: 75680605634,
                directory: 'rcawz21hpj10hkbbwzgofntl4ss4r8sxovn4ru7i4wk7i2jmfsq0n6d68wu66rfh7zvrrfd76813ylgd3b8nasgvawpkyma03esvjnq84wnh5z43iqwcp9bswcvltd42xjkidb0g7ybi29d8hc58jkvaqhlvfepiqpvm868n6yad5bwzcptbm6fsednynk2d90zk5mx7ka59i0cz0d1rft7n7dso9zkiwzlyaoc3qqtkcigvikc4nd3fe9m3zi8alx4vr44jsqtqo6iw4zf113kmb4n3gq24smujbe7e6chahmzxw54xpnw5mqz2wty12o1um301ue2yeqqi3adsyzw8ld130h3h0nvvbuswc0ug99g61sgj5scx5rjj78ccu4ezpx6okeuh9tkrrjs3jnpsendxe0if1kuuf1mj183xntq3bpwd6aoe8os82142mt4tjqbe8bhu2xjghwictk1k2qvjdyowhfxnvfubab8rcg0uoppzofo8rd9xr8yd3i54kegromm7nnqojk9nz4kmtoc6ec334nb7s61ev4yjqpi2j853cqz6kv4b89dawmkd4fd8hmx81ce15qymsv0w6viu7wfdl3kg8kkp6zhsf0mxe3toap3om0f6gjwqlw1fbas0x5kd1oetlk7d2byg88nvvpibcctaow65dqqwk8nfpbuj2x7zvt1l8fanicmvbgs7lc5j3b7ci59f4do4isr1gpc30v64u9o5539wo1fmedkcun10i8qiuwqqdbto7utalctafhjbnwxro8dn27a87ofkopunxjhnz9bzrmw2rsbcmnq2uxmznpuxbhrn1ew5dnwlbyww73fxvlyxy937w6ndfu1awn4odbt0pnra9umw0lxmm3kx5smh3oiwyzw69jrrn2eowphbdsooujykb6jag9c53sx1sakwceiahawbmdg2d6jvhleohum2zyl7krhderdggscddbj87yttclgw66onibt3lxwbwjjm1z8a2jp3pf8kbzp1',
                fileSchema: '2hqjmp8bdom0x8ojpeby24wzj2p7agjqi57r4g231q3986jcryj0mh56l48lp2wismgxwltbzojsbrg6ksz1ksnruqjvshahi3zb5ecpua97fmd0flgp7t1ryl7nxkdj30c9hj25752zz9x79wrxn0ubik2yvxpt8tbu6wdiz3bnf5xp2sd087lx0yhnawmxb3ehmzw11zqagthwkgqkblvbgxxgn1eo7u6g8kh8nuds10njuv4ep2pfi8yytvf50wulqfl3luuq3elvz1hc67r8lxuq5mc5hq6o7qvwy2x9u6tra6os2a8lvspmjcq24i1fzdmbhu9knydigqwy44df0d5xbysbnc8pxpvnrjsk2idb6jpcsxuszgu516zzlbafcymlbab4vi4w2jkdw3agw0umzkug1nzvq5cv6ghr3zkgqkh1xk5mqsnee0vdxmz8dx8m9eeht9xqkicmjb378hmaug55ioclzts44tsp4j8mr36hfkn7gxc2o5zumapl5rmoy1u4o8fgd4spqn17hjvgznpdzfhign3c1zgkuvz86hjshugsplv5gueuf7s8nu6fdzievgwkkelor54eaypbdvb4mzkfdfv3u8ypeijr7xqgmmzsw20nzgo3ym1u2832qd618fzlhqnngtbn4qqv6hk5lr5h5la7brm5ls29tqm9tsb8muhv93n3upmjcxdmmfwnzeo3d5gx613hyaw4utvmvmiss5s91tgcc1rzum1cb810pcpoywo34ogl6r67652ldzn7rohmsdpgk4ibao4d8wl8kylcbbpsb4abxo9pmlbr0axenne4dvvht4is771dk9zpsey2pn6408czfbovm92p9bypookxockh7ikfiimi42j53dvflz8k8q5r0gd81wqaessngkibhj8msk8olow1g09dkzw5bhns8tpto23ta9ygini1pn3u7zrm68thxcm0m8c4w1l5f45egzsk4g9ulua05cilisyritp6181q012fb5lx',
                proxyHost: 'e06uqzqf7k08rm2eg7any3tokqf5dj184chxqwi5forhyw22n1fomxd2tjho',
                proxyPort: 5322898370,
                destination: 'ltn82jhjxl3pvs6g069rx7u8upzxartrcs3uqhumjekg9biehqry9txvwu9do03yoduwrjqpesfc1tmlrta1xksgj6islhf95065a4dx90trq61zc0qy75d4wiri6ptaxkq5svmgxenmc1ko62lrvbmaflx0hs88',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5rm4j9qv99j6hq3d19u8qew0gwn59kv5tn2u0o8ig1hqur65jm3qr52k1zyfzqcj9jfk16563fqmrk8835cclljx2ulkgga782d7hpoec7hox9e6rmwgtkwxkjhvzj58rkhmif2ulgsakv27v880ps19u9lwcw32',
                responsibleUserAccountName: 'n9oq60xlitszum6hgzbm',
                lastChangeUserAccount: 'nzai3z6tak49i2c7kdeo',
                lastChangedAt: '2020-07-31 06:05:19',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'wxx3p3qccs1kai2z6he8017apflkb3prwj3i6g2z',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'l1b7frcikmfn3bmwddfw1veq5iudlotr5t8vf881762nssr1rf',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'dta8u89v7k2g84qzbod7',
                party: 'm2yr7siksvidwoxp8eoj520lj85i7b68126mj6udfgp0ew6t93v29i245u1pujy4mgcegl8serkoe62h80emctv28w00tgs2oo603zaga4li4e2urgb64zrbg1sxsnjehbi6c0hen5mvo90kp0c85zwqr4fv8x9k',
                component: 'hq8p7jkx0x3v623mvly8uwettlllvjssm9yicdupai8kp0lvpwbt0084f3jzcp0tzvzn8mg2z5h8e9mmwvl8b4j45myedlb8p2n5bar2cu3ri4h8raypi0fyofk2t6bvhwpbw28jjy9mzlfweiup76rqe7qi13ln',
                name: '589m92wszlne53qmzg842onlnx8muykj47hc03qoma90n449qbtvtpqhdusqhv4akpdgflzpsrn0zbdun5yqy58simhzoedx5ul45b5i5xlw3v0jqk52qnmbtcy274xzavk831d7wrf8ot5we3fo48g9tk7chlkb',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'hbilmus2bcuueyglz01ztpkk57vov995282tub94sm8k539le9foyn834po4372rie402ep65akdz3l25amn2zopenxkd43ohawgjido02rtwq31pf00wep3xrr4530blsy235c04kei242t4y8gbk1q422tom5d',
                flowComponent: '7jav1blnbbvhe90u9fdratrmzt1bx4feaean8aedppjkc6e0mab7ypeyvzlcxhvwc5q6169tfjo39tbmsiqqdnuknaz04ub6xz34rghv68fzu01c3drobykkodb5ljrm4i0q4m53ghdki1h24mvfk5auo0huhm5x',
                flowInterfaceName: 'v7hkny1k0ky7uf9p93ay9qs315anj06lgjf1q27wnrmyvdmkbnr8y1qsrqkxishgrmme0bxn98qie43sv2p079nisvk91ywlnbio2yya6fnnvux54sn132498a8wxzqjumm140r5pvioipe4jzg8u8o2glwb3uoc',
                flowInterfaceNamespace: 'mbiyps1dzbdf70z3rvqd19snq9bcnde1sirkjwddpe9ftavnij89353qqfsd4upoefgklyojoipjag04spp7bjhn0j3l5oc14oa9m4d376p2gy182pexm59ldewr5ky6eti1ghkbs0wr5gmuevqn9z5p8qdt85ip',
                version: '2hl18tbl9381ihuos0t4',
                adapterType: 'yftqqk9ayi56acmw1b07toibfvcb1juwt1chjx83fft3vyw36kwfrpe3jz9i',
                direction: 'SENDER',
                transportProtocol: 'ktvjdnio085w0estkm93x2si87y108b9y815mljot6bmr3matjvtsb3hl4kt',
                messageProtocol: 'hxoazhsh8744lyrw6kzshch0zu2m8e1ucwmq96iitm6f6shvyl6tgkvr3imv',
                adapterEngineName: 'n4htbdhcq5is1180uk1rioz6rm5u1lpg33fyi56yliusx0irffewy7zldb89t4ehnsx8bny7b0w6t9hi9rflitnxorr0hms8n296y5vdbohjlw3tnktrl4hrgg6npyfcixx4bss5btqeyqhamrnzuaurhbqd2gy7',
                url: 'u81mo4opb1vnqifos30tcfmtvs3nw0m36vpeeunwc9lneroanklcouz4ijp91sdzhvc4trsybppwtiduv4pe6h24gupqrgdyi09tlrqf7f1iik70h38xx1d03yv2ff9nirzucglmoiirxqsglpghfdyqsejmedk4zagrvoew7upyddgrc3yvpkwp3i9rxa48azyfy9cahrh9gihlivb1yg825qccs7ii1yvek8is674s2h1y48tpd2c617p7x0k9y8anc3ptz0uq57y1oaz4swhyhb4gwqb9ikcuws0xgtpkxhv6ivotoy0jeycg262w',
                username: 'qqup0hab34sdg3qfb1kgpe02w7alo3h8h3d2j18qu00ybhqt97xsc8iwgd2b',
                remoteHost: '56hfuhz31by0domf0elu5sp2sl5m7fycqc7mrqut5lkqfsgjg60zo6rtabwaomjhltdt9q3ky8309i2kkddfrw81435do6skxv3my5wgojze6kn2egx8jblv8uj6bouv09hu62fc2la59ts12muxg2vj7hbkc5s4',
                remotePort: 1181973830,
                directory: 'wxpuinmm852fuqwvafq1yuv097qltc591mplygp13ev6fb4af39zd2w9p7r78rlx5eyb7eefjc1njy51pbcclb5862lt0og3uqjr0lygdx9r5x8k9yi23kd9tu9v4dtkywon6cwm9hgvmaa865fyf5jdy681wjkhkqvuhu2o0dtce6vnx63thh67xbt8oj2k458edljn35t790fm9z8qrjqowt2emnbuwgvnzyg6tzai8seo62ghiuvls2b92b9yt63h0h41e9r9bswjdohx7gvfv5md6hertfjffhdk9z0alfvzwd48f1di9q64be1uls2vlwcwk4tn1ud0515qdzmis26zal5dimsdlsn8p6xfq1iughw16fdizpyxb8c0089a6n74dmt457q29pl0cj1zugput3qwkvontuk8ksuxj890vu5luwwtn5ouns5b041s95vcmtnjbfj7eflnpolgq688vercbm61o9awvsdg3zihdlcmsapbarypxnr5u9vgik8x6fb053u4fh1z0x9gwilvtlr0zknf36sv0y0zcqgg8q4bhdatlyrzw5q1u82bsdaq07jrtaq4748i0gvat27netcc5e3ty4cpamg0uvo0az94ys37bftifn5mgrnqg3r9uon6xatevidm7jg3z0r873e1sz9d401osudsr88v40sa1knsutitvt4napl96sxfo4fdzbhdpa8tgxjgid4gijwonra9eb6eam4aj9il4h4gs0gu2rig09u495rmdtvb4k07535hrhffrx5h0om4leuiyfq68gac8wl4aoezmduh7wwx1bvjy72ve5r2n0bl0m4nvga5nxptq7cnj1w77hl8juoixk5mac321jaar5a8nbp3rh1w3kqel2adsqti9qn600w9f216hrn1b361efna77tik2wduqqmndpr0n1w90f7r2198kloiykmekdw5qoa4c9kzheyexeahde3ynv9el6nwunpkosm9sa89atty0w4hnofsei1e',
                fileSchema: '96v9c39e6off3gvrllvs08e449j7s2q37h44k6tv6hymaxckhnj48i5q4dq78z4z9nhbpk0hejecv6hs9t2kbdiqkxrif1gwtmqsmz7igaesqwflzyzpq0qvxu5fk9e7zjs315ephm7v0l04c0bo2elswol1tf97q9c7lqxrmjo58thqucqdzxtexixiy30bwnk9fvq2htg7bhcstczrackbnaghb6gc4u6mr4kqj1leecqou8878ahw1sdnauv6w04mqe6gpdd9y760alz85e6r3gju5bfubrcbc6jh1nuuu9zsd44hn4h9vi9xgwsvjzjwsiipgy32yxso2gfndje3crstkuqvrehqu509shjykka4caioaloao7prr0r45eidto3kzgsuc800qa96zcanh7z8d9lsw17tm3e3fbrygtmus0nc5db2bl62q8l4vtnpy2pkyhulhdc1mqapa9m6dbnem7feklbcesc3qpia30pnlvcq3ph84nl8pf107zwwb5d46krcrsaicyfkfev2mm94qazw3fmff5btwe12tumtpriyt7mhepctutza33jlc0gny52372v351sgl50lm7smbacdt73ggo27380zof51enwkeed37n9awmrjbqx634xcqgyqgf8de4ntsnrgrem5rhv2k27edqgh9pdrx0k6fag4lob0pwb4ywo0mtc038n5oasvb3k1goyketq6ew3bb55ep73abzhwmo96mwtsv00qjtyloebslgy0y2mcm4q0n80qcy2z1ya49kzzzgz925izzecpr1djf22w67n0s4cewp3oyjtvsnixurytqroilsnhbva039ige8624eaike0w58ojna1fpzu6gik5biputim1hs47an6td62l9ggv1v3uub8a5yosgfy55am5oa2k4kq61hu3jhpqd7vr4p1b44usdkqsoar6a901hu0yhh9b1e8rs7s5puqashyb3ynmgz604ipeh42469qj22tc22ct2b9ynwet',
                proxyHost: 'rfvzlszusdx7dbx98tfpdi6ao8h23lm4aja1877zpkfgm03a3j83myr78ggj',
                proxyPort: 7952902799,
                destination: 'easlqzdgvrizyf1f9trxty09900btyskhz8lsijk2v9lp6xh0kps008cvqqak0y1ax7o1buqd6qm11q3xrchqv8gznis0y0jqte0jd2cgq7inm66vtm4ykemsrglzzvn9k5jmqfuvxk72gwizwzck9b6vbl4hjyf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vmffij6rr8lcri12ad57qhxu36386trnz8c64aedukf48j0vot64y3hd41otzrzhzxc5wjaclhem2tu6t60fvjcwf6zgzwr98n2fa0cagjqcdx37utqmn41vhvu63ausr9q4tkxcci4dfxjybkdz2zelqs4b4u13',
                responsibleUserAccountName: 'e4vl32wsg4g7odmn2boq',
                lastChangeUserAccount: 's76y3pb9kfijbrvip2ua',
                lastChangedAt: '2020-07-30 18:41:10',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '0c0c1rvw6b8s288o5vefucczztuulw5w5azekb10',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '6tgl4xyvumikkgbyr9s9ssfrx63f9qhl6bww2c9bpk1yv3kswr',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'br0fk0wnmog1trlvup9y',
                party: 'm6n2vyfv6lgrynkwgd8nc105t954pj70x486llmu63ev0rshmzhjvljd9nk4brkel4glqxeuj2iz1wv38gtt572g2qc62vc59pgfj6nhimhy55of27bq3f2uzifehmlhxfh06ei2iahjo44fsrri5jpjxiv8zp7o',
                component: '0s383zpg8152s3yhgup6g7k4j5j34525pqif9a1uyiobrm22z83lkup9raufr1ek6zfx9z2603jzyst61fojpfz7fz7uva3xjbzqcuayur5ciah04f4at7jyacqfb391b0w0l964ecvwqjd6vc633m91r581gjwu',
                name: '31g2ym4ns1dndp5nzmmmokglao1i3tes4oehsjr8t67d69p1exrqdxayfea432n7jxcu6ke8ut2iz1v2d9k44qdqze2yv6vl7993daixublldyxni0kbwfj0mwuzsgyv5mto3iq1n2dceg37eubwh51rsn3cxvrc',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'hfwmscfya9sg8j6xt822rlqqxyz1nrypb7scnyn059ozairm0lpd5tmfc915t0x5iy1uek4p1e5uxn9x90iz0bizmkqm4wvdxkcigfiv0xyrs7txnmq6di3t57hhedai1zxyc75rm87m4o2cpkj13cih6xa0uqwx',
                flowComponent: 'i069tb0f36voxy9sx0h5fkekwd29egsm365lzf76sm24k1ljjc5cc5zw5aqlqwpqeeqbat8vu3kkw4zxrp2gotgo9h20hn9jy0g2zu1a7ugoyt212wtml0omz3p6xsjoos2hvqf4hu2zzr15l62okti2gjb5r52j',
                flowInterfaceName: 'i9sjkl22w9qzckpx7134q5vf1xjw6cbouvoww5dihf3zlkqworrxmkxzc1opozpxtcilf82ldduee59ktr853x93yfa6vpkyap11nwv3miz8gekfkvoarps5ki442digb3zcygoc092z2vj0xmki4krh5iouvviy',
                flowInterfaceNamespace: 'gf0ocqmaamhpmksbgc4s9uyjnyjcnpcawgm8ovowbnehkrf0rk6l7jtp9m5iju2grmu725r2day4neuvdlzfw0negz28jkog4cm53yb1h8okktgxpe00iqahykr0sjfpczf7431x22aw6no9yu5tbbd0yejxf4o2',
                version: 'ukofjz9ckoidswx2lp44',
                adapterType: 'h7q7yftc42kr4ia3t1azang8sbpsr9pw4b7rm4nmsb09tfnzj6g37s34cdoj',
                direction: 'RECEIVER',
                transportProtocol: 'a2dqbdzv2cdx6diucbfsgms8yz0sl9yzv79rscgyxkjtkqo47xi5ry8f1tjb',
                messageProtocol: 'ha40ml7pum1se5341jgzyewyj9twm1rx5bleuq0cuewsq57eiwkkdd4qusxv',
                adapterEngineName: '59huouivjak9rwjet8d66qnv7whsqtkjwg0ipgmv5ko421jztoerm4goomtonba46zyclironms4c27m3nk0juvkdyq829i126l5bo9g5a51f6el1vnmrwh6pyz0t5b1ofq6emi6ccvi8l7j5g7u3605bii74w3f',
                url: '3jvvdjjsy5ra12fur0qash5vs73demzqvre1wyowxkgw5hlde89e67w8sku388kuipjsuks961mgwhobqigli8b9wod8vgrrt59jmbi6yqztvn9cjqqs4k7r3v9mwegpqf7zzx6i9wy2h5a1hrinfzw1a4i89ku6nac1j3sxj0s3ds0h4v93q192yp5rnd1cfqjgrlad993s7y2t3ys7yj1vtj5nelbemc4baiksqw79wxgvx5bfgswpiwp8930ws2dfvvuq6bbf52kzt8hmvvl27r2ig005u2i6kdxb37sh9pbtzfx8rwe5kcvz1oz1',
                username: '6kqk1oxm9wdcd4i8l5jre3m7avbm7veljd09wkh7n1vqwtjgcpa1s6618amj',
                remoteHost: 'gbiswit5qe7pkor8zls2ui0t9fx7hq585vwrgwuqpsyu7f5iindelrmjd5birvidtdfzrovbfofekprngjxgmpcqedlbrvdqo7oxh44a5jhdnnh08pwgw03n7ff06lwpgbzxk04487l56put33zykp62xcqc7acb',
                remotePort: 5201845151,
                directory: 'lqcidz86yhth0mc2dxkfvjbft2ekprd1razqkrr4qd5epy4kpgae1md0rc1cmxz7qcamrpkm3akz3j03tj52cuvbelh4gfzdpl0jl6tksdxr2a0nzo57oohl60ct0mhsbr7i3ofih5ieyacegy5z57g88c5w3dl8c24m2hc29173doegaix1hi9kax4b0z117a8t2w2890kscpg5u4w7zth0jfi1bf043c14g8aqu80l42rw6v00v3w57f5gl0cabay08uvnxvbeapedptdlm0xudpzyruy8we2fsz1dyd1hcz0l3ykxjgao6wdg68rho7a6y1tww6vtbfu59k2iko0h2tqkrfrqucjbrbfxmo0zedfzq75d9iwtue8sivfrgjevqaej9ay99rmz99yqf5tb3vhfa1r70t9fo44urhqmnar05l1ra5i73otd6t0290jmld23xuduyzj1vltgc7j9iyjb5l1lu8hwkxc55k7bjz9181ru3szouz1l6k6p8eaxrmnlog5x6bhlaxy7o6rahcfx5e6rm6rtexie2aal494v0hslb20pt8xuap84rha2mkdy4rx8tw5t60f5ujtjwm18y0yc875c7gvjtybayotycvuldhm29og2ps2nhcxd6cbrc603jf97m6pni0vzocuvsajygg1z5zzp4fumk6ukdxwz3tptmf70j1021y6jcbsknaq5bolpxb3nntriemkl6btrzha8pixdgaj290j82gl58ff1hvk9pt768pvba878vyp99bqzyjxplfn6x38fi79co7a426s6v2octdwm459tb13lgku0663msltm9sb90ib8g74z9ejpkk5c0swfxkri41lhxxk7w7h1l3ypj9ozy2q7a69v7xoc78k0a2fwerz9ndh89vk2x9tb38evpkhejv7jcoi1nepkk5h6s0da4ria16ka4grtvigvemmyvpscyt77deyv7wz4s7wpst7qyotppaypvecj8wyriqz8efu4994mc2br',
                fileSchema: '60xfbvwrcl3wtcbq39cfd9z0cuso2wr0cq77v9b8xwh10tpxya7giktv9j63ut5eld1i5ofwb3c6h3qxd0pjptt2xk4uikvtnjxos2g4yn54ygjk67jcel16abr45a61ri8l941hwi8l29maykseefd3joy95y75auxmjda6mhce7ekhrbzhob0fngiukaf7rb9esortsc8awkxukcnn48zk3xrag0b0vuds1r60kkx3dn15mdyaoza1c8xxtddp3dfx3t4fepulk3k03h4k4br4wcn5d542iyrwp4qau5snx2vkrnc8j25s4i249gpkdf3ma1tln1pug9gga6q578o7t1egf75t2hd3hwuvmsab5o3bzr2wew4n3q2kfrvhu7xboyo3h6dzffyn24ipwmo7tao0em9rox4shfj81v7r0we1e2b2ggoi24xlcnvzns5lmy59tk7hi0p78s83z89kjkztkwxs4veakvx8fdulj37rgvfhkgx6suyv1gskwf94snpnmrqogyzgu5mpt91rdk5kiytyhbz5unl6yqyrgyzced3d9vtvn0o87d44io5hu0t1sewk0uo2j4e5gfppolw5fffihte3i68uhjlo55zs5j7zcpdrbc0qlg76r42bter30bonp1mfgfsvshymhqhgp81zk1o0os9s0kb8lxlqoebjgkdgalk9aipgf8q4bfz0spate7yfwu2cdp4wgyubtuisbm9hs052d462xwst18jxs61fw73a9k55a07ijuwehm7d3of5leyi03zlucdvalmkp1cztg35gc9las85feee1xdk48zzxl0xylivbqe7a0uhawzfnew30cwyn6aeiayqu0x1mi9oa9plwqaokutm3yuwq51vvh8nz1s0itjwy6yp5w3fdm8drorhwhht8mmdpfmpgnwqhmrkwf4mtip5s4e1r8l7vwntf8mzrzrhrprxto7oizq7nmnehqnewynacvlwm710fzalv2l9nlda72yvuxk3i3ljg',
                proxyHost: 'r5sd1n4uhqszl3q57y2w4aku3aftywbvwwcqe7hujjupnx2gn5kjq7uodcld',
                proxyPort: 5245826377,
                destination: 'orig5ma2w1zlywe0g4c3f90phymke7h8xfyapqdt3ys51c0n7p01rkcz9xjidf7idwl5pv7jvmxaxa6zz4m7idonx2500ws40d8fzc6vyjxqq8oaqw7wm7c9jbisz4bz2y1t6rshe0621rd16h8nustgudyts9uv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'auq491umuuhqztasyrj32hh16vnhkyb31edwocdhmpa8dj9ujuj1v60ebudtkwseny4m4z6qroq63pmny352x6poa7y64nlq1iohqos1y5vdaabxy77tqwhpl7l10cmf1smpu6ouvys3xxyjv6i97a485kmsxp0d',
                responsibleUserAccountName: 'pt24ugseodfynezt2ijk',
                lastChangeUserAccount: 'xh9y3r324aoozij33r7q',
                lastChangedAt: '2020-07-31 11:16:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'od3w7ztqvp6mixyy0qmsia1glk0mwv7l80m5snje',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '6of5yj393hh6clh9z5laami6o4k0lobqtpqubtbgz9g87alqle',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'it0wjicuhld7th59l6av',
                party: '29qi811juy85ndzj9yr1ry2qatolgmufqnmkt6w4ec0hbpr88na1babg0d8odopus3e44n1vzu4g8myhsivdm0hym0apdin10y2wkg0g4e6q1rk4hti0r9ig668om7vwz2n3cpg35mjqxnvewxixdj6xs34n2dip',
                component: 'iuv8alu9s4mdn2hap3gfs8tq0rrueht3rkm9tfs2ss3lvsgd7vjncjmzbhs2inr5l6itywsmhb8ie4bvq561pxbvocfgsfee93ze6ltt59y5lg1k5olznvbcwshi4uku2wno7m86r88zri6cwzxcjkfpib1w5s6s',
                name: 'gldpobt1heqmwdml95dhfvlaslorca7sbv9lsj3p15whvr4elp3sd6iic6s3iwwhvj6ptef84tl0g51br7hx0vojvkjqi49u15i5i2w3t6hs2bbo95t544qn5jkibfqzlncrpcq3bwwz7bl2umdsbesqzv7jkc0a',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'zbdio5skuqf1twyamixjrivtfl46sr2q3xnz31bhrsmez2170dmvyzod286uhbevu9byfml5tt58v8hvrh5a6rod8uomzaxgatyxpjw9o49k7143geppxhxn1uc1y74tulp7yib1680fjod9wudmegah1sgrc45x',
                flowComponent: 'zj7mj1rq24z77goufa8tb2o8x1t2uucvw5x9mo79891s3m3k30muq33au5643gvgv0e9yen6sfiwv6s97zf7si8wfp2cs2nv7dkmdbf6bl9ojay7l2bhyii6xfoo1zivcpf1d0dzfocfbnaxr9sd9pcaq4e073vp',
                flowInterfaceName: 'y9moj0vgdg125m1vo9zz6o1wmq939k58igi7i4vpb34scuhhogv3z2fqp1vbeza70owwhbhusuulcd2nfdn8wirm7mzfedlfgtk7ti3u2mbbzk5v97f775s4j2mhavfednklbq4397ci1gg7r08d0bxop4gqys72',
                flowInterfaceNamespace: '3vm1755lcke4izll6g3fpcoy0go6seuf04nn29dfuk5i5f7jyq94x8mfgq2c4v2ckoljmf1jfakgpmqsd01blaccwjyjda6fct2m2e48p0l9prrrbcm5g12xc4oq1zqcpai8ej6ym97hbhp5qfxexjgfle14u874',
                version: 'edxdnfikns62z4gme4t3',
                adapterType: '3s6uufdedx37oul3cv46cc8pleq7llim808mhfbqxp27eix9c4vw3a282op9',
                direction: 'SENDER',
                transportProtocol: 'vudwglqbgle933clomlnb9m2i4qbdl6y4ykczlifxucwqlzolgic5u5pi1kx',
                messageProtocol: 'ps2b3srr5exvoe4j2m21q8sn0fxqu03gejrpcyhgo0b4lzipc60soqud2b64',
                adapterEngineName: '8fsrc7u5s21dgk8dxjclpvubp83b5mfgzuak46zf6gcqzzj379ed83mc79u2cufe165fcqcpha91fmga6psmzqkmh4are3b1z2hd8ciyl9gnuyayef4ylyk5d4wte2inlndlzjy2kpt30hynz1kwb0v79p8td1at',
                url: 'gltqf6zpig7ibczwpmt2ur72jq7ysy2c4qhzvovw418tnhcq1ltx96yl3o9stn8zjtzn20hyslatmrf55tp04rdguppaikvvhzgz00rc23giaqfa6akwfb7closo0cxcal2cdmth6onhpg9zcqt9jvl51fuwdy3tc2eiux3erz58sm6oivz44ihsx7x2c63k7jgho7r05pag1hphe5kyy0esi4zlj9eb7ezog951759k7inhm85sbw5kdgjo9rl1lngvnmsvvgw6a7tope7w9xg2vl7kkflutr5gj7ukmao9f9twkp3kj0ok9k3lbo2y',
                username: '2i77772vpr8rcxvmb3tavrhwk971xzmihtit4gjdadzqp3egeh2pqfs1g9v6',
                remoteHost: 'eaqalioldpdvji0hd460ipzhkfg6kk1w2xtzveanj9kqzlxmmj2i2vrazbx292p562nmgv5c66p5hmknxcf5kt61yas7ymfr3id2oqadf6qjrlv7dthof5ik073taekrowlh77uxscz5c2di9sou7isqitpdsg48',
                remotePort: 7327522608,
                directory: 'bqa2ldfwdpax8qchwmr5xb85ym0a7tnd2bv8gm6ezga0gdawyu3at0cjtugi7fa0r86miptyk21cuayfk44bgnmx2ukeg8z3qkhgr9au2ngmizfcdd66jo9ip6c3a7jzf26d89uw8hv59gm131o2yvf29x1kf6zkve5mbrxbdgnhgmcqqmxrdtdrxkajyaviok91up4mv3wraf3fyon0hczkw7d43kyvbjkomzlzxue1kxj20cnllp4bg0gzh9m4h9f02949gwr94ajati624duz66l9j6ahr40gxlkmiy29dsxoyibq6kt3p2gx62riyt48mmw1v257bav0q6oked0wwkue0sgd2w1qv17xso2k6pemim3h8trw9enlbb856cy9htn524er75c5lljikpmoqmvc1fqazq0gf7eyrjde4yu1fvp41h4up4lwkbb4ryswhdoqj37r8c97iyyumvbfvoqqt925q3co0pgifpk5ockkn1cf14qi3nbzphhq9a3y1ymybb7gdxjklnoz21djvmgn10cn0yvlx35np05hf3qvi3j50f4qndehwdesmkvrliun3506ylnlevtcytexpv8j9mjtizts1w7msryfv3nd1impm8hvvffyx9t1k6orhds1th9vl9vgo6p3m9iyx2f5g92qntvt8pw6cac2pqra1wnz5o0l83rlac564paqow8xjkp4luys75wp1ii5muhkf375o4w482tm69yvdnkr6jo4yjrh1evu36kpr2xmx7x0kqihx24sf83gkn296il7tci2wzazihlnla03qjj3hr9kes7o69wpvp0cypy43l1mlbdzqzsi1uwuc69e797wu4aqrwva4t7xygcefinl3e67sjx39lh94or5rvqu9ncttck2xzi3lkkt2qrx2bwjimxkytpplbkthbt686evm6ljf3p6jwgylzu98eoysk5qs8ugif51ea5jjsne2bymd0fragjdv1t47kp101v4j3bo1ihr34gz374p',
                fileSchema: 'g9uubif7u6xm1k76v886ue1z9hisuy8qg074cwy5p33lt9mieqf24fa725hw3otc6lxgmq9ilrlgqpyuv5i2y1o85mmwc6ltt96g24zuzldea87joq4105c5k5ur32yqxxg1jnhfpba97yf7m021yl3ra0bu5aut3tz4w7cpcopz4gz423azc0sgi1p2vmo9gaemrws7ur1rplq67kkcy4xglokksu1cv4n1dhe9e3bkp407hqq4vymb4zal6sexjlaqruy6yxdudr565el37epkjowxx4mzzkusw3y7ebanla731lym5hafm6xp0y8dqhljxtdetug6kequbpzxblsv9innbo0wd85w78ankorbt9r6w74duigbje5g3wfq3tohd6frz4g1ama9shaknz2yl4yqcxfp5lp17s0c7g56aazqz2zx5y36fdszkhlzk48y9ytk00oxna3ttq4zghlrnh5zsmpp3ybroslr8efq7rwh4w3birdddabbdkkvwbt08ki6yel9kjx8u6extemj8gsg97ivgb3g94fgcs49i0rzb15rhmm8fhvmdh1ta8zmxdrweofd4i2aae49gn1k1haot0py0sk1iuqx73z46l6b0qyr5crmuo8u4np3myhkjgy5ie5kxe1n7foua40q7spsi049n9wd6dzrsgs0aobijylpys6fq79rybcu8i87bp1hr401lok4z83ve7gkzrtn3zuidp4awcrnt937caf0kwmjiougvz3p195g1jdj0k8lhnv8fk2uxurrq2aaxnmqikyezbfotz8civsm5i6eivr0u2i7h9t4g7wq09kirhbpo3p37rfohf1jr1655e2q6zlchj857a9hh6got4xaybwqstwm09uxdhccin614enf4kgq0zf132tqxynmulqlsmktyhj97ookbh0pdoa62dyue78d6p2t5omqq2evjniq16ruhp9tqn73h4tenvn2933ht9p171kbvvvzpdd8pdyuxvl8quzgl1ud',
                proxyHost: 'vqvlgfk484re694wzwdgaw53lhckp674n44o68zrdtr470j457yx9mzvvvf1r',
                proxyPort: 4796638868,
                destination: '1ppzcszpkebezi3byvgapr5e1r7mad9xmhekt8ciwsm9b651ouuyj14462aejl1muzlybyn7rn9fw40ruyzmpo3s9s7un6upzp69tguuuvayp8dtfwzs2rxpoqhdii7et1avnnqe0yu2rl71jl1qh2z1noslk4o0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'x40rqijygy6qkukbhiiaq6cme86ohm7bq1qntxkklog1uvigz1ws4k4urz5diglyejjx2rh7csymg9v0k6yqummjjgfvqxkpx8re7evjdo7panaad3z7c4w9n57tkmd2a6szhjdbhd8hrynv2690tczersrpz85p',
                responsibleUserAccountName: '4ig46yj2zrbidvjvoyjs',
                lastChangeUserAccount: 'nqun4vkhy2v75sui8rr1',
                lastChangedAt: '2020-07-31 08:58:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'rrj9nhfvx53qk1zfr34plorbda7t4nho4vtm6xzn',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'hveal8w3kubzjqvdunjxjhgsex5sl18o6pecc50yiajh57jiy0',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'ube2skjpkirn1n44geua',
                party: 'tay3513ssfokmrpxvatp8vtnamxvjis375t6b5mlai7axs9uwnpboolncwmw8xzs2qylj4nz4jjgpai7ej7hebfxligz9eft7avuu4qnq9ej5th8qkx7df1ymubisrdboqkpk03zkc4ficsqvhyc5f07izv7t9fi',
                component: 'r36b9fqpuulk766ygbtkmuqgnfxydc9p6gzumj5lc8xxds4sjyq643pkih32fmdse1brqbqx5ij46897lmgdm9goltaaizl2xn2aqq9zahbt7mvrevb16yiwmxewhqes2bj0s749vwhvxmd5lpbkee9w5frd5eg0',
                name: 'oompgzthlbyjwce4xlf87mym26yx87vfw5xrw3jxsrj65v5ss5gynaqkco7zxf46ppugexikq1e56cipnu8w9x4dy33oh9xmc7c28f9x63nixfmuwgngg2ycbfijnq1ue84jds7rdjkhoq8ec6r534c767a6nkt5',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'a5r8lb1n84pzpb0lu7p8m4luuqu3vr4diss72rk8mg22cee5x5k7rz2g8lg0yf9iddarcnibp4k3hi3y0jkgp9um7wquviwcvbuehmd8qwphn33ivfggiyfgd3z78ncnxgnyrbuw0u6wuux97hcpducptim6ql2s',
                flowComponent: 'frr8nnoy9gqdj9n26ntbz9b9gs62wkrhdxpvs0rm6lk6bs3k9lwbpj0907ojyredkrslwil6cng8fff573g3oa1a4fxjx14mku6cc4qacfocufwuvghxtywpsog8ek9r7brc08mopm37qyisqebv48q8t7ps9k11',
                flowInterfaceName: 'koc20b25uhb1rf3oqzthejmenjev33tn7tcnw4ey485buzf644l4uxjlq4k1wbcm7yiwsukw7v5wahdrdfzz5srgkrox86nri9rvy4l2pnj5brq6ifcg47g36yqm297bxy5trbd6uqwwuqo8opknz3ikoiijuxvo',
                flowInterfaceNamespace: 'hq4qxaqvou66rfw7rmkswc6068y7w5d349j8jrw91lmxtykpbegw55mqqn9jrhst7b552yinabt198zmk5ub2vwe1prrz2ul0xh3azf6wds1greij8t7lj8prj0d0nfi0cfzoqrgvb6sw7u82zj3u68s07d33u2u',
                version: '3ow9i7ofed330n1q2dlv',
                adapterType: 'atr1kew7pepmvshk09rg2zj6jzqwagv9xw4s5qdtvom01t09dlk8ptgxg2yr',
                direction: 'SENDER',
                transportProtocol: 'p7j6wexbb6g4dpq463c9vpyc6we4g9nlnbc5jv2chudij4c14sm6uwqp9c34',
                messageProtocol: '46fsy5trujo6gs5d5bz5d465b3li6zrcneu6t5yff3we4m25tqsnwwmn4xec',
                adapterEngineName: 'bkg7jci64np2bxvf5ip32un4x6o5nl0mbhfxlk8027ewbl4lvimhftsoxtruil8ram2152166hgvfbtul5fk5045wy9i3ilhwgaffzmcnb26ks5x6u5iwhf1y18b1qwuqjmxae1t4ylq07qwmfm82o4s1sac9c7p',
                url: 'ho0brsu54yvloxbsce1piacxgtz6m2b2c8ujbixcx3nko420f7nwkjq5mwdy5yfs0ffgvj4yl3w44rlkorkdayr41d5y0ysnwg615wh4mbara18d3wxn3q2ocp9wscjcjjuzde6o301ivz8sp7ylosgiw6amdl1doy2axlkt4gou2j1dbegy3at3ikp3tyk5qoafhsh76htrthos0c882u20wbdbzxuskzkiu7b9a0p5yek259dgz5fz0jz7zl33sn4okpthrxltxf7xsrstliaj2htfvizgdrn3yp40sckfqtyyqjn22ubycemvf3jd',
                username: 'vvn9hc2pdtam9cy5hjk2kyxxc2004lveo12l5chf8zvdnq2mjerbi7qt8oac',
                remoteHost: 'g7rd2q16w69ztldp6m8j7nacs1ar5e81wnojqazjvv0999mdvx5qfusb8cv70v7f4nkbqpcyb8oqjfpxrjl4pnpo35mp0pz7ngeqkvatlzhol3n94lvzm9alkl7qwjmw0fm11ueg3zs7xwnum2hxamz5h41s3at6',
                remotePort: 5656499258,
                directory: '2w9baq5iebtzjy402xidr9rgtstlmf0y841zq8dd5aq4dhv2z6w1kt67pm5730qifgxvr6u90mml30cvrlac2fcjdrrbncatko5gi82iz61xb5nc6nzsf9zislwteo27dj0xv0m0fkj1327i9jwamwqqc8t5jv3g20us3zad7mjfxwd4dxp91i6u8922j730bzjkprqy229vgmad3uofpqcmz9i0kkcd1u1v4fha92h06v2l9vhe1rugl7b15rxswl10vlkdwenwt5g1hxl01sxqxpglg8g6wzcxv2u8qvc04qhokgc8g7hf6oyrkl0ula07j50zuzcusu213ac5ar7h4fdlosux7xg5f4sbj4cbnlpg11a7y9vmnptn61oyvk2z3ht8flk4dsa0rusmtkakgq8gwlmpauo5uh6q7k6j3s3olzfpsfhn4suzfd5e3elrl61os9zo58u50yfv5sgxvtudbmzy4ei5gks1t9xv7coz13y04qnyk59k377r8fw4h1be9x6h4zbl3g7l6ju0qd4cqd6qmwb07rw3ax1yzyvafahx986029g27yik67v7ibm60uok4t7xl9snybqmetcncft0iqksh1h0h34jilrgh2zybmulp5oexx0phwwcqwtsbi0mzll7n63zscjg13vg1s6z3liunkhpgq5bz71uptx2ozvine2876hqv5izt4zd94wofdycwzdrn2lkxtanxu27h18y1hf7jt4061wht5lncsl4m47f3qxg3wpi28pcaatbj7ws9hhd6856mb6mxikrti93snvtx4bj6ar1xnaub3bxmyaa4e5bbu936u0dnnp1u6cmlruobrzina83t5wwkuoou7j85lkev70nmo54ebboo8zzm1vnebyg0ztry0d989dv6b39aaehj0djoh473tn7nmkpxege0zrepsjntmz0kgzbnfv5g4be22m0qk8ev1j02bsljyqg1p38az67ewe2bvt37buf9v59hjxiww9vrikqxxpm',
                fileSchema: 'fj1y8b8z079a99t41fal4u1op35n11yumq2o54j694kiz8rc8wao77d1mjjuqkha6otugioczfrsyf5cdp993hfxpnssc3iy87vqa6tcrn9knta1udsgiq55o5mkbzes3rf5f040mrcbcgkkry6lmdvaht2c0ms5k55sf6hwth33akvmr0nfgrfcm3ck6p3hw6m0db67d61qwo8cw7im2xz6w5ljuskzcqi1c251rc71j9phzb53vfo2cyuk2z2a8ah5elds3p6oen76efdeq6e2uywg2by1258h083wfqke49gcq7k6jkm40g02vl74c8fnshyavtzif76ggzl9bnkd79jtbxfs151n41upp6cir7pi755bei11z950lalrjvho7r8vihd0w2nxnao40e7a14o88plfypf3cqyt2bp8hvyon5fbcren7ij42qc865eam5l9py2h5x20hpw6tdvxo8wh8g6ztoga90h3egvay2g9j4idxp49l180xl747xixi5h963a6zwg7nywtssql99ivuz175zbyev6t5hjrsfsfrrqloirzan23b4pwvw03wqjgzf7y3m0fx9wfoye50pa9uc1eiv73z0yigkslrtlo1rpg2fy06ojeqd06wm3dprpcdjft6pgq6v4fsp3fnxxh36ro3grcw8je5x8ulhomha33sx0htukz8t3pw1d7dlxi8coynsgdvylaggv8dwtn84rqpalez4579kyphrl381ctf3w238q9kl00hra59b6mc36dm8rp74b9wmk7ef9qmbirv4l69n6zuyg87d5g154pcgvt44jj45skb5o331tyqfkivasshlv3hpwf33bscttf3d45hbksftgq5i2ucw2atjy4v0tkiupnwr1fhyolaiffks12o2n575vqd7e8d6dk8i7f15ox05vy95fgutzuvrfjl77oi61rb16zml2hsczjwlo78wua4lx3hfn7gutcnhrfnc06uqc73d9exlfam0fjv9uhqbza',
                proxyHost: 'ikp73l4mxbh9954js0742edhb0nkrl2bc30hho6h2v703ry7gbs75wahe0kx',
                proxyPort: 57340960693,
                destination: 'pdt3pexnxlbspfbbjfjt0z82ujae3auq9jtpd60gofsz3ml5vhtf89t03kfb8eust1j1kj15mi6i6vrcdc42et3geq3zq4jn1b47eombzk75snd21jrvkhrhqahp8r5jkmaqymteq78rk8dd3w71hpaj5h2bv01j',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0jxcga5pw02qp23oiyv5g04ayiyfw0zr6iho19zqkctn95f5o0s34twxbbbo54mretpmuulyg0if54umz1ceiecoj4xj9ki4nf3drb8kjfey6pytj85db281m7cz83gthxw3ye5bv2wp1kyfzdaozsm2t2lubdwh',
                responsibleUserAccountName: '19xlimc9pvpwyfuek8sd',
                lastChangeUserAccount: 'ot7terih8m1cefdt7iwa',
                lastChangedAt: '2020-07-31 06:07:00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'z7ueedzb90h4z22m95n3agubz6ibw9fonddroacp',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'm1nherkd1s402me0mvlk8ug0n23nf6jsn2ur2xsyf7c8pblmzo',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'wk0vwf5mv2scy1hmswul',
                party: 't6zehjivun3j6p7ebofezuycdev4yph57ortv9hjv8mm5gtpudlx594lowba6qvnigugpogbwidunehkmizcke51fvvnoukd9gcr5aaca659pmrcz8iph3w3wpvavg0yhh9ipb14yfnwu677yycoo8onod7e4wzc',
                component: 'epsi5s6ygcvb75k5rhwoj85m6j4typwqtfr1osyxathft5q9rp3y5ow6mvqbwwtzziazsriznju10qnl0dtu5jspofegrlaixtd9434gu28lpjsks7tuwkzn7ljduojkewktlm05af65ninm7dcc9tqdjd5vg2c7',
                name: 'v8gui2o7y96gfvx3dqihcqdxc3qmm6n2wozbly7wqmstuhmz31ir1d5zayi63j964v00a52iw5oot6ah7r74ioo0xnunz5k9zc5kel7jeewx77p4vu2p6v3hafemhyiswgr9s8bibualtewhq9cwiu65ehwutefg',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '30vvkv76wtkpf03b61k6ntyzxb64ibazmx6wa49zp1ogfwnl86fwwrf6cfulocz3qwrvk89z7iymf3del0mirysh9j0pragi04ap9f8ii1tkjqd3dg5y8nlrp1omzaxdchg5rfge6g23pw7579tlf49oployz28b',
                flowComponent: '536vqikqv492f9ipihottyl2xfxiojb5e64c4gdtm0uhowgmwp3lopm23nqpai8noy6zp95dghve89z7jqfptw5wspo0uo7j8szs5en00u0mcgn4ffnyevuq4l4kfu8cpaotozonlaguntdi52974xq1kggzq1x2',
                flowInterfaceName: 'syqflsbud8652xjotzpxhzke4it6hmkplgaegv0g3juf2yxl7azn7dnm4ioe1bmnhvb84vs7rbglq8t3k3dsdl3kio785gnbh0bh7kk7wku1c5d3v0na5l1o0y16p0zdl0w7fzkuwet3g8dnppoxkju3pzizxd99',
                flowInterfaceNamespace: 'yk0nc3z085yndo59g4agktb2u3lg7xhieazt54mm9ak9i72w5qggp4godaaigk27aa8y57bqy84g6mirrk6scn4fmw2o1a2v6boaq00s19rqt5qnb1elfehaky8r1w5g5j2ei8a9ge1bvp96qkzwqlme46l3z8uz',
                version: 'odyr4gcf5ab8nj4zvscw',
                adapterType: 'cv8e37wz8hnc0x312t5vzt8qoomvztw8enztuawmsh5lrrciso67lngca4iq',
                direction: 'RECEIVER',
                transportProtocol: '691jyw0qvq8oi174cjgesgvzth72zqmprw913g7uko6ll9xgfklvepbk0ia3',
                messageProtocol: 'jrwmenis2wvvo0uca18vdl5ocjjh5xjliawyawqe8sx64oympabddu02eezh',
                adapterEngineName: 'kfjzpv3vugs0ijpdu80zl32m07001r6ljbq51zkv5ff9t3bd74imoz5e3m0abeq0hu93tetyyk8wmrq1sb6hvhk5rwbutu65y99au5btmkdy17rg7rtdidihm485ecwnpza34wjluo3tmhxtbh4ijhgtdbaek3gx',
                url: 'mhsb3l01ve9p3jq7xl6sln5h19hu122unngyj7ea8rspkjm8z17sk0ekpku2qc19ac27kzzdfagyzy8tekydun6zr0itnt4n7zquizszqs002wn60uf19ooqsa99v2nixt7pd3n5z74ai3l95gd4gl3apqtipfclx9ffeweiu4aaj84buyc8olq42t2uwqkxokwplc5kpy4ejv7vuig90uid163rpdalh0k0ncvcl1sp352hv7qtol7zrcxw5rg45phg9ajhkrp7qrmmsl1v63pnnp7vg5yk2frutico4ekvro10crdof3zoacit3vpi',
                username: 'ancr9kdfagjw9nhz1jrlneznnkyiqo92mduutiwwys7tmkgt1473a1dry551',
                remoteHost: '42hs1nc1tkhrlpswd0vm0g3a5ae5ss68bx2qku4apl61kjqb76f98gaureuqudrpybiazjlgoik5kj6bpytbdvresl9skigqcnpyap8nhfztofebrxdufckb3g0m4uoc7qvxouunh8ucsjxwl7hcej8p6y7n6nj4',
                remotePort: 9446655194,
                directory: '2t7yt4ci5mk2iryf4eyv0lij6cqbhyzy75cnj0koflnbhj08s5q17hwhtbrmasd1y13nzh1ame3v5v1mk8pmazdrxr1o3sde9hiw68qd0d9ovzbsy5xxihwk7c89xet3pmc7vfwpwgwgndhcyjj4hlh2c23z537qblweae1orop6dacub3rviivebymdpysyfzb9at4z7mrfbs7ag9fjox5b2gmhx63mzi5qklpkyj4rna8dulgb4r4ngd5s5b19vpdondz30rh0exm846gvnffqam4jygn7nb9xowdgzyx0u13cd7lvbck1r2ygqegrqv1q4mzir52p4pbgklvtk79t89aupyxynn5f0rf4ylogawgo8w5cnvw6fqlr5qb0fw5z2j1pc8w54f1hqjywh3p2ihujnse9i3wvfbh5ztpxut8massvt5gv9k4k11ry3okdg8e904v0u8mdp8qpv1tcqm9cd3qig9vq8pn1ejraxisk4y1kq3bx0re0bzdpvr2lxpncdzdyjvhm6en1935zlwvgial7sbd4124lvhi8b7xhzzl3zg9q2zu4xermg3insgqbvdpx84xzi4lpj3520rb5xyvei3hcc8itc4wsj8ywwyx18pk6q2ri88axn0226qluppxhyik0li1wvr5sth9o5x4m5qli3r13gpodm8lf2uorbu0iixbg320hk95jrr2y9tnshkzk7k0ahel3t6wj6am13jqt3fw5hoy8aowolxe8txi3tx4wzwivueq96j98heayjjfq4a4b6ktxyh9w6k28ururxsir09hch09b9z40qw9ev63cfhz6yv0hldgg7j262r0v1dluvw89anoqun4wd0uxqco9cnn13rsabd0o6dwebc5seecdf5lqjmalb0a49xwhwov7d9nwanegzs2m7aaj5l25uh2ekntb5iaa2wzo7v86a8j06mr0fdn25xw87tpsn71sa6u2kdacunkambysvxx2piya2xq9n1jtqk3e7ghstbmq',
                fileSchema: 'gaefx79letcqru1s2y1l2od40z7y1a5ju43mvs49w665c2we63cld37ogpwh9tv9jnsoa3h5l8g9adla9bazktjcc094k17tkbk1eev774ehg85hp5nos2p4mam6vzlou2q6i32thut6iiqtmvy4wvyme3812of596nuhk9mr9xlgc6w6kdrq8c4gbqm6pkch624rx1ekjep6h5juh4h9s5ucx9er2pawep07g5hidw65lg2g61jma5dl0drpblpyqsjss2thzc7u3wvtczg3j6ut14g8ikcivkxwpkxdpv0z7jfzqli1egfxg25ovs2djzwnjriwod4afed31zv9ev2r5nv4r4lragv0hjtdusj9e4et6g55qmy0ompf2elpgaw8qzrk4hlb6shvr7llpjzg6s2op3x8w8enpynxdkxhsyf1w0kuwj0irkxuj3kqelgmti4qnxisvdlb3fxqa5ltg2mwll0bd6bw53dcwtuj336hsy5knv7grq7c49xxct8fcyp5lrm3cubzgzxw5wx9ble5wixp7e31gksdju2xucz92lvk0tuel42d8z7nqy6rtakf1xf371zrru3ouu2x719do7urfpcuy2h7a7v6qrunv8ge0wzmq376s9ct7rpmewix9bwyfjmlz916ji86rtoeo0blpa7dcsaoeq1ax1ybz79qwd9ce758jhg4fpxgczt80dkrsll16izdfk2bxhmvoujktqao3dga0442h9hub4x5tnbqzmz1q09pdx4itzwqawq7fikowqb8wsqdtr44a9e4slt5luhofmuopt01afsx2p9fouz2phskc40rt45qo7wzerjczju3yajo545zfgcfqueycjqnxbeh3m7a4hl85e8g87cjtyr43s8a8g0aot3ejpbrcv799fzxx3o5psxugjd6mq76nyav9n7ps9cwr145v05merev5th1sls9d3c490576pzs15kvb2q52ftmtzs91o5uesomx8t89hmsiu161zmde3z',
                proxyHost: 'wpk0bu2lazgvm0yj735jw6kq6gqv4q2xhzezqlfqhezg3dolgfj8ct79fdw0',
                proxyPort: 8658269384,
                destination: '8i39bugnt08jxa1wpa1nkzyn1ri9s27db13adx55uhr4v8ncfdqtj687pc8vkw7lnloicx3epb6s90alxi8yepyg0rsh0jfdi2m8asveo5dfzc9ounpi2eq797l0nbnpwplfmyqtbomkxojnbcjg61dt35nw485ki',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qv3csq4g7wqd407qmq9fciaa8z1goh270v4133mluex2iisrixg9m4com3ijt5u2u53839bt8n8v718o8giijzm483tp0rlglf31rerfbmfifsvskmr4bnuj7nfhj6lv2ixgs18w33f56sogmee0n5vsi3k1lh1b',
                responsibleUserAccountName: 'h8nyl2mpo0wei3sz1gzh',
                lastChangeUserAccount: 'na55gtmkmqvl3e0opwn1',
                lastChangedAt: '2020-07-30 17:59:16',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'xct6rtrupf472dx86dttxpt4edwnx8oidyb798dh',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'smxns9m90xqc4j1ksrl238ahxqektaxex2shihhaif32ybxm1k',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'jl6u38jjpb7xqjt2vkqp',
                party: '4cwcmth6daogmse0x3uy0fn9c0m98456u7mmp8gxax6j7crwu4asefqts01gcwmo8aahuuylojwh9r7ty4xx1af7sorovzraln5fr2eggoubqqsoiyxer4pclucey6ljy5x6sb1np58d8oxu5t5vh4qiaypxwitu',
                component: '48aukowrm6sl33iijvcdtdh2e9uwx668b47npggr46m1mnwcbc6vpjb08ub4digsamghxzyws15xeuemidzxhwmmgctwla5c7pv307vzr2sdirxkn8j7brxdrk6nb4ej1z6b6ibnm06zkl6xlg0t4p34b5yindz6',
                name: 't7wgy9s90jkla9ntrdutbaol2y8h871h1y9xg2gz8tyvpol5i9gdmjp0n9blxtuecxnprg1sgicys38kcgjzgwfqoqyng0l1sd0oqcjygvlw87ma39axzqgxaqyfofa1u8dlnfcpiclnkq7h7cbjpa9rwqllk00i',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '3unyhwiznwjrsao4cedqgiu9irtl1oungzk6vap6k6mfabouiymqn28e9o8g7bzj0enpzjzwif7v2imyywgjzklf6yjgqd1crr5lkg74h209doamsna24ga17nz8ppibkrbx3i2mec0t91m2djlqt0f42aft2bef',
                flowComponent: 'kotudddclpf1majkqj56x5rmm9bvt6raxkokcyoxde1ml57z2gu87fn4tdv35re5sqy2zi2jv9uruyukrafajkw08n4xzgnmahwq6rtf0yywynh8wmbod0dmyzdy5dni6ddszk6286qg97iqfvknywcik4dx9wx6',
                flowInterfaceName: '973es5vicch2z3frypik3a3pczc2okoy8i44czqm668sh90s7yyr4tcm7r54hf28qxxmtvma582ei1ms2w20hvpc2hwjlv0617qx9jwveec8bsgr81bbxktyvyflzfujr2thdwsf7p6f9iivswmrla70pycxipe2',
                flowInterfaceNamespace: 'vfjorlav32g34smkmuopilycleqfworyyxmyazybjnh4wnq8gtrbpb2tdslfm0sgn5gco2c2mh86jae3z5lxkhixjutf6puj9kbb7wje7bposcu5801l152ztjfh7cij0njfmcqgp7ggeo02kjz1eat80gdam62o',
                version: 'fuqioi5mlcr2cdaocmmu',
                adapterType: 'oixshcin2ig39swl28d7a197jk5ldj2wqaatkigylgqkntjg42fqcuyy38j2',
                direction: 'SENDER',
                transportProtocol: 'of8ou4dyg90lwyxltvl5scygh0hlfy5gymsb8tecayiug97k3qnt9fh3lycp',
                messageProtocol: 'kcfk176qf7a7bz2l0xyx5oc9i4w5smrttggbm0c1vsnhke8zvpdekx6wuv9k',
                adapterEngineName: 'nv891w54pfsx856ax68v62mrn5iclt9gczh93wfutr64b3yvqr35hcw8hdxz6gqh1cnw2cicww3mvgdd9nhfhce87x39xdrttfupq90geoiehs31nolv4f7wjw0sbxstp5tgnwvgr9o50balg03c6bortuw8djui',
                url: 'sx5rpbbeqleim2peqjyw7rsctysleaffb6tcgp9uch4t8sd4bf5evnr2g5fcurhitxq9ewx0e7jjyfwwpl1wdz56x762tgly27v2km5m5dr78pwk4wzl0loqzgkqdjzci3pc0ep3yti1s70kp7w2xujvtupphfcekae10ipd7mozadwrmmz2bcdb8m1j0y7a56zq7p8p2b806hk6ughicf9boh4ubj0kawqmxvv6x30eb8j83p6z2t9upe522u4uekjhpuzo4frebml15039pmsnk29otrs0uqck98p09j1z2brt0kqqte4l41fscsqo',
                username: 'a5jsm2itm9scc14iwg9jbxdmpbjvmmcyhspstqvy2kfd2mcvzu4uhkoi4q7a',
                remoteHost: 'urpttlmpt6g0vytqcrhozoo3ornuvh5wu5wdiqnrnur87t1uua4m8qxtlcb2uw2mo6v5b3cal4z0gz8yep1ho7bcuyrfov8a0k6agisd39vh9nolhw7ecmusmmoeubi2r8kgp5m5c6np2dopre7eqeg0jjld9gwt',
                remotePort: 6144630189,
                directory: '2m3m2ozor68e9wsj9aoit9zwbqh29ac444vqsfxq0lyx4k3opr73hgu7qqrqpf1znto89jyth7rtg0w951jw1zd40yxb8reop1yckvs1bdgw8biq1bg7c5m5cs1thyhr3e7p3lwmoy07o3q2wz6t5ldzuv7eapqkhqo0tto0j1ysdujafrc5b1yet0v8344ojpjeomaqt1oule195aso3bgpixi1ibwt0mhhkdkvfwms85y99oyrrmi14dza56nxa67h51l662klup6d8vo2o1185qqxgaaaz56l0bexv6kzbxd9g1kn9hr8u6imwiijn7mupalntjdgrnx1o1rc2d5amnsxyq9g9acwinachyy7f2n6ccjqs0s61mg5x5ugvsw3fdt6gidzew357pdwvasl68quxxmk76fkc3kpl5ra9kul594jqrdhhy6re75fqcufcikpyziyt7t3vomc4mkc183rly8cdvflf9nx1unnmszbhv0bmff7brtx2grrelhitvd7eqfairqrxfml5a1mfy1s5nhrxuq4828kicg1zk6bldyoz6uboic66c97eg3j9ufhsi184yx90wuclfxy2fvtuiekdx6pfrlt44d00wusm8bxmi839yc4xsfn6htht6ytt1hfnpurdhu7afloj2a33bs1njrmp09vrlje8ja2jfddc1d28yilvm8buyg5f9nu5wiw8osxdv04106ade1vvigo8ca1ne2g5i5dmim1kjpqmkobk81a1vmjpra6ijz1u05les6wq45gxm83874hvg1w0hzz3y6g8ta8d270h39yrvcqgph24wbkwd8wr2doa4i8h8x5uivtnpm6buy7gang3h6euk15p5f6fj3u3ybjf651udtbp44gxq4eiupwxuuo1wjylthx63yah9g4v807oj5q3s62j4vqktnft9v56tr0ht3o2ggyd2sa6ikvmdy1n6sg1twvkbon06y75thmipa2vxcc9ycwwbe9isi9v47mrcxsmvy2',
                fileSchema: '29cetxil0zxksgnn6vvb75p0eryctj60th2twkvt4r6kdrppr2187p3xiwlpa4gqtguvpnpc2kv9rf4tpo3apzyzf3i6f6nafbypqmgnl2cjdxba4viv7w0bmqfy4z4i863wk2a7wuvdge24ai0qxwkg5ms5307k8u7w9pvogn16220uf6r20s6bl249mu4j7c9b44r9fc3hwvus5sh9cxtmqaf3loz8lt31kkoerfro2219i750o0q6j72sbceua547a3lr2kgm7zawiox6bm3zlwuh0bopi8cvqyq9l37mgk8qk2kkg8czbv64x52qhwfysxssfgry1nabltkc9uxcwtdakqn7d9120b5ufmh6rhiwjimcqwrpuol59becpt24nk8r3e62lyzvtba6by5kohk1nq0p0zqxwyrrkrm662uyna2pz3gnxuji7o358anp5d2x0zffd6wlyp2c00jae1ir4uvj2sj9p727abi9y1mjyrp22y5io32svusnzhpfiby66d4x22pmpnho4wunai2wbxddo1itphkqfs8z1psn11e0q7xwtmr12g2ppjsq1gx7pjem1qzqnf5vgkgcqj612ccy7f4l3k2k4qzqv3r74dekypubjlvfpxf6u5afjixnxg1y7ydebf9pkii2l8e42a2n523rgazp78mjb6ucqblldb9lihhrc0v7kknzxnw2j663ldmyhdojyxi5v0hqh7ahmiur9fevgounp7ta62d9tfhkz5dc8w0z5v9h8uffl264bk9p6ywzxemz9mqwusl45djzv5g8ui006fhwk4it0ttpifjho9ov5z6xlkem75zzzkxi2jhb5gauh8zdoqp1ibhyco1mdgslcia4dtfxxjrdgs0edkx2s1b9jcvii96t6e57jfyk1hfpdmwjlpwhl0ce1efepa57d8khj7cif025t45nqs3e8b7wpp5dt0gizzxnx8aj10z7bcsmaunlan6fhzcs1jfn44k621m19r14ivs94vh2',
                proxyHost: 'nq181a98z3ou4itlxr523j6lwfo4aga2csab1rcd010zui9x8b1x01n5tcq9',
                proxyPort: 5573136441,
                destination: 'tlc40rxygnuf4bv4sp1wtpu2a5edb7k4o924amr9b3kri5gh4nd7fpwrwmzp3gms9cean101igjrhrr9mykjtjh07uzu7wszv0sziyiswoqe600860ex00kk7iip1uyzlvyzd3o65k8xwxmxtal43uuqfkyssw4n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jmzwoan2swa6bd51ege9zphdvu0ak3bopomfcai72jorqk88h8j4r6b55x0bta5o2a71g829svnwg3dh6dik7g5rewwxc6vs7od556w9pv689yngfhl5pztm452t45rz7sr1cuni39dx5rg0giddfghlpproyj4f6',
                responsibleUserAccountName: 'ptbzjpkeykfb92nicgmr',
                lastChangeUserAccount: 'zvbzy2vhwnyazxa403mq',
                lastChangedAt: '2020-07-31 08:59:34',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'ymgc2d0n671gn0vgyu3z5arj71yn58gtk5i55x83',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '5g8vxldtar7cv60058bsdz2furddeiyrgwadymakh06bwoqeg4',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'jsm8m32i0ggrmkmf292z',
                party: 't1ajdrujf5o15yr6zub2pazf16dfcoemt8ehvqnhfr82psj4v4oygzp55arl1brad6a0yxo3tnhk01q3h2hqxa8tcx0xaasd0n1c2p57a7hy8kk4l6vgzlvudix7x9l6hw165t0tet2ndwhz2e9nbj1qin0sxx74',
                component: '4oae5fu49x8ofh0txehas730ksgub8i782r9cfms5uwfiegh1tc7r5fipcumm20ze30qy9qi7gznx8d4jws0omimlyh8genvovfdftommi9aiisbfgldv2a8nq77lqnjh2xpmaa93h5q0jjakyykjtv8cf52e05j',
                name: '7tzco6pg8j1q9p9s4yqj54jj2nfqhrm6w1fev9049s01v9efihal0xbaa9iv4ci8aq2gauvm08aurg2zpmuu9tvmsyxtnp037dq8ukm62lf8jme8ehcu8ckrnfe01so3jy36csxca9q3lc34aq6q18p9h1db8idk',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '4gn9mbztcs8fy959oweo6kfzu5rbvb8i9yqs2z2ozwya2l7v6caap322m7iwigbgd1ixgtx02vwojn54gpkjjtj435roavanhvbi8f8ul17v26vbjvw0oiada876qrwznvjkw6uqno4ljgrervsfjez4y32zrqi1',
                flowComponent: 'wi0kacr7a4twutm6xt6pkqlbja172yezw680imr609t38dgxbsnm4bacnpm3pqgg9rih8vp5jdtrnmi39ygzas5goqq2oz9dnm1avnhzbvqg28edyvzy70llkvapigphmg6je9ciz8o4ur5v1b31ayttmjrm9ssd',
                flowInterfaceName: 'xzl5raxjhqybc6pqacykro1oj6nrrc4um31boz4vlkbo4rc1ywsog2hayiqomk52x9k3zm9s0kmkj7lml4nx34wjkkmgofirw08b98o2po76v76kegxg5ithy0uks5ty33o4x2gc22stbgyy67owgyehnc36b35e',
                flowInterfaceNamespace: 'igoispexw2go2wjiwbf2p7048u5s3utqedos7jch7q3jznbmdnne94h38mg2gcf2z2il4caykviclvqjazzrvh3c5qq8pf2iv7y7dfw7bw9824kcv0f2wuw95e5ip4nsrell5qh0557o0jq6c6v5x46syngb0rl8',
                version: '5vojsk6kjurm65rhwqa9',
                adapterType: '3zon6xil53lv7oxgwg6hxwsdoj9l9iopf33pq784vsqp65pdo9zabcpebxvz',
                direction: 'SENDER',
                transportProtocol: 'mxmeoa5ywkvjsrppcq20oy8e02w014s8650nxhxsak1bzqfyfyxgrwjxvsjc',
                messageProtocol: '6rchi7xsrp42o68x23dk3srran6nbak0uq9zo8ornkdoroavyx6z2pqr9kot',
                adapterEngineName: 'xfb5n319t3oqo7ftexsjs7awc4j6gbtbmq2fu0t6k4pqje29krbbbtjl4bjur5mxc4fnlf13vh28o4azs50g6mq9j8lrdu2hn5kjbhghoopun0mfmqu93tnssy7v5c1wlgsjfhfj2p16oe761nwfudggksulzgpu',
                url: 'se0p798509n98fmqkdv5gua3191m9o7mc444j2oatjiyu1l9rej3t36y4owqf6y93hctipl9f7zedo7ad1rp4bq54ul1rrgxnec0l41rl7cugnmzw79z12hqdak8r0zm7rnqikr1cb1z7ab9hjrqjivxbueqeumzawy4slus2rtu3tvoadi4e6iho8pi5ggc75gsplco2l4ox9kj29umvdnmen9hvk6awln6vn0qjgj9n7vjr7c8mx9gvb3j0i95wtggs492tqoh25xi8k6c2ma6anrku2kplpn23wxllpk0zui8c3fh0dx5jy7upcnn',
                username: 'epuwlh25c5y3mh3eikh8i2vds567dq0nkx7031t4ewqdrfecvyzh171jjfe7',
                remoteHost: 'qnb9ja0hg81zx84xlr6hit1n7ywxv0xmd6ew0641zc2bitlsclvibaxtbiztmc51j3v91ba6z1bgvhiw8jm1qqrme0bb3vcmh54j567rfk5y0bgl61gqx34ve490p0m6ac63dpi6ra1knty3os5zfrcbnduu30qu',
                remotePort: 1541252344,
                directory: 's6aguqthj2stcsb7d2w1inla9m88mn67e2uwxhic7x0vki9cwzp5t9iiypfnzq92o4mv2hpy4y5ls0gababszyatb6dp990rmytsm8ydzoiqrkxwyoz82g5wo3d5jgaf2exy2corv3o482o5jlzyvf3y3m6u1f413zgk9sqeg62kfa5xi85146i8vfnogtb0rssqeobc5hggey1kch11333b9pau364y02coikzovq6rqfmyox8zaanildemg7zbf05fr85bqwv9ys4wiae6hzm9gajmj92psbp96hjadpaiu76jgdly23ose6m1s857e7c4phvllx32pzp9bvark4x7z76lzhpxrhvrjnuw7283ucxlqjor02mk1bsg4oegzymrodq1mnyxxwnzb3oubmabaopatststz43bz85oc9ohvnb7ipho5rddvn499701zdafzu9zwck6lzossfahud0uexmi15oosuf87dfleppeww8idi4w6fseknvnhtnirarx3s1fszxiv02u8wcxh63u7ll7ok4icd0n3ogwf737l3d6qvya1qdbvej8dgeoaf3v7ijjllp80ozqpi7x7iymqf9m2pxpcljj3x5cqpwahvyjw45hdlvzyubtvjs6axu3lvlykfkjeajrtwqukrazmpy9o8zh28r09s11r1ombrm3vf4iinbaf3ptjk0nwfyj4bdhaqgirlv3mlai8kry6ywwmp4qy1jlimjq6duis98ju0lk30bjol0e779r0ct12yo668yvbnk6qneve8860t2du0k1wy6rxickhfwxdanx96rgktxfcsaltdtf4dh4spwi51vhhoqewvb7sbh5xnvpt19vre7qrlgex46v7ao3c16lbfg9qb7qmqh6djvkhdsdv7q4y3yc9v6vwmgm2wz90bxhrhw9a7rr1wx23b59sxi4uhnlt1uuq676hytu0wv48q0d7p0hrlca99uzu5tjyxubxe3mevco2avgopi5cyzn7ylzsteafrp',
                fileSchema: '1zhe98k6jiz6qzk3n7u9t2qpi376cn69hba7g6us87uwpjyqm05nuvg0f36dwaen3o85g9odhc5phtb9c40rpn9zhhzced4uo66ucz1yjwyorfzzr8vhvrwzc1fxc51zjnhy21fue1mkns5d7n7hce41s4gymayqoz0c9e9vxfq53rso4b65a4nf74uue74e4i8c4816maw1uffymlsjfmwl8cchmf0u8bxxef7lpp1zdw2kwayit7fdljpqldubri28cqdjwkspeaq1oxd8ubwsos7ki34s97521mgsy9lk3zy7gapv4ibrbi6qp7n6zfc588ysbutbdroyiotfmn312ghph00i3xakv2j2k5z267vlja6be0ts49a6o4swfmx0b10hdae8fuyrjpil64iug07qvsj47rqhaggw2horo0r9x7wkadq15upx6nalz7xshdqfc29skzwq5u5fqwpwkgtv25zn5l1wmixujxiiwq2bsu81yl1lscy3mks1hel1bopz7oubruk1znnbynbzblx3qy4wrzjxseqvs4b33lrqrhv5qq0zx359920cvpi61m35f7egbyuspukycoiv85rg3lj30fy1hm9xutxqahsx82o61fo9maiiu3scno31jcq9kdejhftvn4cf3z049zl5tmvfavroif0o3tczi8ndhoz27d8ownllmkdiyk8asjt1sgepzo96zwsn866teayav477s5i0s7r968blx2j3y02j4l2j209vllchxkbnmfwa9teymtbh9xq5u08l6erwgmjsa7wishj3z9vgfexat3wyxl6xpxvresrt1j850it6wbvlxxh9x0o6ydfptnhruzs9l3b922a2eptg8s8xgbng5xfmqg490jg2hqda8ci5wi9g3at8edz54tf61p84es732t9co068jk2rtyrlnh8xjmzwbyqaff8k8t0u3yoo4f87c8litiq7vyg39hjtctp1fypqjqylkmp80dp2fk6ws0puoz662u7u',
                proxyHost: '60jc3uhiyfhi27035vz4omxh8dbpykxlfmj68zfwfoqijmqdvoafbwpvb1w0',
                proxyPort: 3177578918,
                destination: 'sz22tse2ds2obxlhwogdo8i8lgzcgx95sxzc3m3ap4kvmd51qc6u30zyk3w5j6p9uvaa4v6ghgq7cucgrwhn2f1kkxhlm86ixfln4o5r9603o2tr3b3tr3kseu1eah3w10k82beiuo4qrj1j0ouuhc7dv18tn69y',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q4qmch0qdkppoj7xn09mv2so7ycw2cdrty9rkft3r0u6bxznjro0o7pvw6vkv2vclay41p49ifnt9i7sxotsv3r8ua0xjxxwn8e5q3e36t5wbq889kav6qo6jful3r6k4594w0s6hkqunyioykg38bu757jg6jo5',
                responsibleUserAccountName: 'jzs48iseoqq1gzoujzspq',
                lastChangeUserAccount: 'x1edx803b3l4xnrblwc3',
                lastChangedAt: '2020-07-31 04:35:42',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'vo4pbn1hmvpegytdvqew6xyr2gad9juzpmjv4g06',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'si9ua8vwy33esw426dynfhnmadm0m3wjow0ciwcdhljcbqoa3q',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '0eydgapaqd9lqbkk9ugx',
                party: 'ls9bv9zpnd11bwcsyfhcdnhbfxsrk5pnw3xkngeg8a8xttc67bw6rcrby3ps55pkddec68pu46rcp1kb2cjd1aal09kyz5a2im1tfhqnv77imbimpd1xxdl7h6r37x4w9lvybolplhvsm6tvxdvr37et7w9kgfgd',
                component: '9b91uytllyb94dkjll979zr6rvdahvhtgk8ovnzsf06achlvh4su2ervubh640en0yrhkrafh7eu7qkovhsy59n6ic5n3mzk79pai1ktf9eg1yfirdviog4r1mzphbojel1rm5certwxepenwfpjwd3s55gu1jkb',
                name: 'nyce3jifv6zi53powbozhh8z1tsdbe1y0jc9m1gexrholo63ws8161yqlrb0lswzuq5yzm40z3wvbl8y8snytdnlywvfzf6ga3ijsaxzeaeb4vc2ekizo7wd3m5ff48b7apzebhq54foyxrpb4v3by9x7rqkidje',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'zvcno4tp8d5tiwjrk9ad340kfy9j9d12l6em3qmuugofa5trglozxvy0pxdmzwondayrai5omjzbf3snrtcn2ez5jzx6rqx6tm7pboon2db2c8ieu1l7nqqxt9ufqpq5qwj3xtjoe1d4slwatqutu3rgiab2sqiv',
                flowComponent: '93y45i1kr7brbj73otrwyyr9cu9kgftxy4tvhqg4cfbjb673tqt4ijxor9orcp33ezx8ympcoe6p0vknvu4zu5lbslk12etsmid4y4ndoo82dxv5ppwbw5qobjo8oeaw3kkqi0mpu7lon6mvdq2wm6glbusxox51',
                flowInterfaceName: 'rwelat0ix3brz5699xuz143agm95wqsr6mc2n2a8phkz7ysxyhj1xotuneylydo8xlywby0qsrppr6cnkg8q10ovgmn2vbluan6skd1edo6pfqmlrg5hw10a3zzreylv0hq4ljlmi1p0akubgx4elif9ynocop04',
                flowInterfaceNamespace: 'hpgh66ylpj50h7hctammofunqw3adnobvz37e7lm82dnkxmabrfnl1it81gfo98or45wks3d4hjren42yk7f67rxrbaslm0h1d6ykke1hebok3710sov8pcx3jfg4iz5afutripx0lae159s1jg6n94crqtp6qbp',
                version: 'ncrvqgspga9qcvra7t9q',
                adapterType: 'xf056871wd8fy5zners2vftcpxfhzhvetpuvbwq9m6mcw9euamfi17i36sf4',
                direction: 'RECEIVER',
                transportProtocol: '1wvgrsp1fu74g376dbqm10f9wglfd5cg4gkc902dx2fpk5f810j2qb2vtbn5',
                messageProtocol: 'lp4qh5hzarydh6xk374uoewqj0cjcjgubslzqo81ouautguwe0d2kcs8xutl',
                adapterEngineName: 't0yw4ntv1gf7v0n86ix3gkikeks0eh1wl2iwsrk27z9woil3xash652tqgit42kxottbh9sqstjatrgb0k2rttl3b861xqzmaeekgu490t9kabergehpovnz0trnhqir2j3bth6rumvfet2awijwpvxsy8tcofhb',
                url: '6m41wz894qhpjoghw1bx2c6tymaxnh1hggh2ytkf6fnudezl5560uao0ex64hu2w0dllmq3dvwcbcf7keo0na7im4ixkfh7yuyg00hxh6ckz4cqn7d5bxmfmwi2weho4kfc486v8q4e5q9b9ewu5hu6sx98j2u56dmj6kurgft42pn6sdgyj43lrsor8yukcicxvppyolt9xw5fvovtgv0nts8wyfvu5jjazdi1cq51nmhl302tsos1afg8agrgar45r79ctqxf4l7alhcrswl11mbhnozx6z8itjtgndqzy6xxyx5varrduu95oqbqq',
                username: 'ip9xuh7spnj4cn6j7e1xt72gekw5aiag1rcxwu4dkwpgllxdrmzniob6gltx',
                remoteHost: 'aamkrlztmj2kjlggywq0moidb9f9pwfyj303ruvw4ng0sc2br6dxb3pmd1lzocuc2k4yewi6y0q3o1ed6ld9whb9uzlyhh3m2va081i02whoxz7ljypnh2c2x7xh701726q0ipwhtjhg1ailwbh5yo9il7medkwx',
                remotePort: 4938002377,
                directory: 'ewossu2jz1ywouwp9yt36ivup8030400gjhdo65x2z1bh38shwnarmk6ha4pg0mbljz1sixw08sahef88hg35j85jbx9te3dyl5gucf5gt7xmigyirv8tw0lyxakvcez3duee83r7wlrsb5rmyiddzanlvbx2lzewcbelx6vm5uioax4ufstrb5r8yh33iwo50rjr6emnvdyj4cfup6yn2ba0rrad7sdgqf13luzcv9k5z2qr747yfmf3xgu4h6gpnlusb2zq5kjat8ax8pndfle8cxus5peyiynp1dpa2vckly0ulb3khkyixl6lgvwrbl7t2y4gjnee2wk83cpr003k5abgfhv4dq1pds1s7r6zz68dzm7hwcsp5xyouc4csd5rl711hqdb913ip0ee70rnczbsceqy9jazj90ddazk1ud27ggjfwy7dyw3wayvrd79g88o7va4dqo60gxjdz58jfmklvgf9pg5xk6bogsyka9gwu48728ab2lekxysgufnguy2qxlhrmsx3brgo4ar957zad4ix8xr2m07z75swzk4682rnydeensz5xbwiug9jfta4noja6wtz7mnikwzugdoxxidxxwfovtmu028rr8h4p4vdfy6ohscpisz7yhs0zqz0ap2oftc1x09cn8bw4ljzydub26v22q7tyck6p8euzf829ywnvsikc0kgyje46cm0gvuq2x29z371fiufesjp976g22260jve1tt9e5iiyjw4xw3441qk3fvtbi8xudbojkc4onitlq5dj0wbse6mickruyfc64wi07lezy4p0yrma2uctxf9di5du9d6zd7c5omhw78x2jxq3swxcnx5jqmbklfgh5mq88s1osyepggsqw662l402hownnqoz4bshasb20nk2wrue2n5ofgzo0p0txcsbjqb8f9u5vdbtn1hzxz7pm38x1z0e9oye9wnb8zupr6nrf8z9dzy2smi2qtch8utzfwsnz1tg1w2a9m2wnoxzt6gd2',
                fileSchema: 'm90u5kvna3q58885i6oz5idh8n31db06kzza0t2u74hsubg4fsn9dq4tv0wa8jft6h1lua5p7vaiydtzwims2xy0geidy1yv9clahr4gtv2e3kwn2fm0c8793d3mpcsc4q4mfrhuz0ru110xqmxao4wnh5kepgev1ba1cnmi0tu032lcx0rfldtufpegzyjr3rfzf6fvem92p9k5f1zo8lxkf5qvtpcfgyzolfydi49p9ahf9t4qk5f7gkmh35twbfs5dmo8137krz2xetoh5uw4rag811rjhimglfsi419o58kdiaucnirx1jdinfl5nt0kfhuadu1kxotlezvmzae0qa1r3selloznkd6z0za464lhcvvcyq4u55m93s7tbz6dd3r2y3rp0icmxg2k8jvk9xgzpf6x0xbtuqdmtfcobilnktka70rvj9rrwpr2s99psedbjku05w6s7ejvo0rc7j1p3wxztcekka4akt009o7saimoxzgzu9ing275zxw72uao8rjtduld4pda2gipku64m4zh8hdgskgyj9tb3lz5pt1osdpob4jcxg1v6rfi1o9qudrsvsofputnj31063q1nhy99jd68t7d0uwah2iaffvd3hydxy795q40rjyojdq7xgmrwqnsdyw9leef3oo5o5ugnzjnnoef4u6is8fgmzgx0uq4wptg5p5359thxl3ias3ep911cutduktn9c6dq80b25oh078c70ab23b8dz6db39fxt2mt2vfhaplkb5iizs6kuczo8cs76xpvin859ef3lby10yx4zypuhwdvjyqk09qks5kuvxvhbwjpccfdukiv5aaw647wedi4h44o0l83hfv7o6lbp2ah6q683rh7o2w44ql8v649mum179wtmiuex3u4xi51mcvxkdqge54zsk8umto8zyc7f8iv4cf2qm1jppxu3na4e786w9yq2i63r30gq7ws73b0gsl4gc8k53u0ztuo0wtn111jvf6gybayd050o91',
                proxyHost: 'v029cbio9d8lmz5spcfemthhbcoo4mj8mb45upogv6vzouxfie9ptp0bxhvp',
                proxyPort: 3278102691,
                destination: 'i9psz1tghk3yxjnyomrba9bds8num6jqhz951esm5mcz2v4wn6st1drr7mavybzz8ns2u8x9reye3un8n46xmau3o08ktr1ylskb9x5h02ngrtzlm06gpps32f8n3jjaminje3qb6qxyi5pmppoje1cpnyfl2tz1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0dx82zml1xtnchutuj0dy8y7naq4mxe6kyvha5kg3wk0gzepjrlxja2shri6kjd0b9cw4c9ey9x4sy3hx24ol9s9i3atsccm4ypo1zy8alu5glvqd2b8l77tvd8os2mu02inlbjcvhd9yebe0m1i1t380p773ddm',
                responsibleUserAccountName: 'uufxpzzmztafbp8sz6si',
                lastChangeUserAccount: 'qffhnr5csjdj2ueuzrl94',
                lastChangedAt: '2020-07-30 21:02:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    

    

    
    
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '9i7u7bozopl3abnd0e1o4rdpz9ybgxggcc78l4c1',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'uslzvmu5he3dtqo0n6h553231i2x11b00aqr1p7hxoxcqqmaba',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'hx7169y5vdnmwf8b3gw5',
                party: 'ntu1r01ncucd1pqqvbnuoprrngiuy0zp7x4hbbzq381bf8j4kzki9lee1cxstgr5oev9576az8ma4i42awcplkgi0b06f0pwzkt1tdmeewbhtsrq6o5qdjuh2ts2okuppsenhg38l7o4f85362p9z46kd210gotb',
                component: 'ufugpf41kq9gkb8npaa0bm0bk4f9dhj40dxxp92qn7379cfbbmy7na6prfftntz0nqyum5oc4lklixxne1ncrxenkizh71f6zc5mu7sgxeng6g8chjcicc5quoya0sc76h4ramf2jrxd61wp9zouime6mh31okq8',
                name: 'smixhrc8mrzex2ssgveq0gmis5kvmmq43po3ym23icpdav2mfl49wmb7d47b8x54m5k471jgfydmf1vviixa068253c4oy6g7ny5wzuc5q4dqh9d51omud7qn41z565qnz5kc4of8zw4v03mviss3atxv73yuvt7',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '9tac3e371qwxkh18r8pmzptubhyfz8jsjfceq1wdspxcty4govhcuh0w0eg20hxev7sndiu4n8oiklsr27m6kiixw32kzbi644sofmfqu9sz0twdmxmzlhol9mu92an15l6ezjtf06njbymhkoivo6d4lx7l2tcj',
                flowComponent: '736c8qng1dq6k73klt7ukk0epcm1rqe93ai9p5482nd1y6rapvgv8ptvl8z9j5xmeekhvdntqe017tm0c2901p2y8n1m2rqgik2677m4pmt3uvizmtcfrm8df8u31momhlj5vrlt8i28pfrsxbfn08o5yukemz2r',
                flowInterfaceName: 'tz0z44ddo0jlr5whm1hmsxhohcbaglue2u281bof7jjqzljx7tmqm4hk8rne3svelyqvxext761a03vpuz9k6ppnn5gym08nfdqyz0rd7uw4lebzh2wrku63ny4jryqitmo2e1ljfs0lsqiuyodct60kpqsilxw6',
                flowInterfaceNamespace: 'kzpedugvpx7qfzy62vk3zkxhpjttchiqy8tkaqgi2adr7r2h0l33nm8y0siecmlesnyikx0ld8wi53qw0c4urjobxioj2p0qto232dqz9tax8aowxwvrrktgpu2slny50xv1rtdravv2njh2ogdpw68ph8bv1pk0',
                version: '8f18cig0vvk282mqi60w',
                adapterType: 'hvnzi9a5aaib6pa5ig6zm7mjlikofuft57cmkwsq0ivoip66nineaononn1i',
                direction: 'SENDER',
                transportProtocol: '8cxygtef6jcnwswmhsds2gu4ogxrr6v774wapu39tdp3dbxnr2qm1ufdekzf',
                messageProtocol: '29de1eh53q4ohmavy2k4q34ojjys1yq3xqosj67b669rdx8iw40klptfr8b8',
                adapterEngineName: '6lk8xn47ue4g1yi9o8rzb668mc47wbe1l7scai4oz57um2ltrdlhujkqfiywxcn3kvlkqhgs01erirs7whryip7yakw1ry4mm7b6kzyxboea8n7oejy8nwk4m7lu0fgn0ez3st9of60q4066n8tpugl9fmimwvpm',
                url: 'j8v9jomejp9slyp2knqxkiijzoopsxdxjc4cjsjxhmie7ijkl8d93qxqfkj5n94phar40n7x8xmxvs5l8dctbumi3841swsbhz6h63ad7krln13hk88k1wdriqy2nqj3l3ci8ea729zpv5ip50wcuay5oovct1hhm91w3m95fr8rjf5csvk3vw16tgdukfaof8jf69r407x966x6sdyvqgi73chwxa06nr0oljj4yauoh0dzr3427nshdga20sr1kobcuk3fw2exgrf4byyaq36rpuh7v89ar6v39fc4gkbdd3xkttan8qfkbwgu2y2c',
                username: 'e9pekb09h5rsyh60m8crx7qt18r4uxi8t7ofofxpemf3qdw71mhk8ssgibrz',
                remoteHost: 'i82gurewwo2tw485rkx7lmshevvr3zt8nhhjg24t68sfsfr4u23x9xuqu92j2x0941v4bu3kalmrclpj48qjot65q8hbcxokb4h4yovm7mxqrvqubm0alkbgakciwlfykw01sqsu63jxwp3urduxesavnf3frz8p',
                remotePort: -9,
                directory: 'jla68428frcwvk0z7fbqz28g5a82tonggy9i43dnuzujw1ar1lczbm7hg49ffnpe5ggekgcoq0bp6olljeovowruwamqu4jojh8r5p9fnjuww010dowejdrpxi4ltjkcdpiuz1ixawthsrdc7bawkfs10j58u6brsm9osq5ivdewb8c4xllbyph1exe0g4u0llxo2n2r1gle2gwxtvhtudmh4qj4vb6004yk301u8bzkq65guwkcwtwc0y65uokdqg0gil9pf7k663cmjf8dskzsseqjttre541t1lvn46ko0uadg2aevyp5gr9dxkw97dp7qy7f66sg5uafqqxaw37q6b1qbqlrzwtct4ym0tghzwjf1vz33fopyxegkqlv7z6zf30z8cj51artl3yiv2s3grl7jz29hxz9yc16gsk7bial7cm3vgb2j50twb26e6balk58e79by396ps5qqa9xh69njob2tb5hme74dauhlb6c4o5iun3isplc12bmrw3fpommxjslgrdvqcz6thiqi68tdmf9p3ixxligua0sclpmsb7p4f6q62cri5hgcutl00if1ft2b09kimvybk83u7ak03lkf8egzc3yddz2qdznp51i3z8l78eurqdboemjeon5xk77oxov02xvpv0pat4gvsy5za9fkp3uk86ypbzy0rqxbrih447f4fwg1ay8mkt674l91on0sbeyjgvig4faohsp3ffef94rdpbsklh6t1v7zns8shq8rjrofreo3smwwngj8ba5hjhfpo3c8hjd51l57cy36simy2qy4gslcp057whlpzqtr3fn23fad9whwb8gubfrwu3gx9zwhw2iwaq1nzjb39xnrafags1ui4lw520pv5fww20imq0zss6qlypojtveg47yvam60nszeho7dm968kot4vnrqv98s2eutw339eojoxfcbzh0euwu9jxxkkg5dzna3p4njmh2p875tp6teyhbvn9evckpqqpn4ih0ifzbvx26',
                fileSchema: 'tv14ttqugr0ovuvha7t476gm2fp76u451ox5zudk60kqfusrtkriwy9bdq5a2d0hyz0ixiyriulzkoy4sqh1n4avymjoc2ye2z8mwjk6rb1zi3qbzop6s9d4vmrnpg5jlqp165s9m312li0etf76h0a7hb34i5k73knut9s08671vcu37tv42h1ct719bq9uohsq30us0xg79euk4cuge7uw39bfdlnjwbz4kkc5grekp6w84vubtifm1ullpbmzya9uw8qo3wkcdueyitnktkt108zwj49iyls5ui8kbvg4dznyrpyexf6i8srp62v8ra88p1g58yx8a3irpwpy1m5y999fjcmi5r9oothxgap4686tmu1uxbd1vriqxypr3c3cnoum046fwua5mqcfosxp2i0v2em7xpdoybfmy7v2r373997blevbi475b4slfzm3ul5xvtgckr5pdql6q3bmpiu7r4ab1gw77quzhdntkg74573m9uuogfpz4zybbnwdvoo9o2tvw0dreu9muqyns6xfedzwxoot4p26j5ipt5wxz8dmwkd6gj35nl6jnbchjsprxv7obzh41hgxh3xd9ex3bfqx66950j79dc7esu5va4org3ds3pgzwmvuc6fbzarq4s6rim3j7t0qgrwbvt761y9x1dh2t9lx0clwq8q4hb31se91o256mdxxdq9qad9ksrod25e2ebfejt4cvzxi9oymuclno14cwxb6kaqdhci8dxx02dlxp76y2rgflison3jmhdsvpdd6qyl57dd6ze7c6u87jimchu032x9v4738cvxp6mie1n0chm6kz6dkr9wb4j0iqgieepkn3wt5sxw51ol66pl0tgth8ean6ir7n7e4kj33oerv5mjxyezcq6blv7zhkc8wmuvfed2sm345zcog97ov1hod4r9fbtbsxmsfy6ompwua7y3dyaq4t5p5b0jmm1jnaekgs2jqo5m9pz5l32vc6y40bg23ymldlm5npzgqcncs',
                proxyHost: 'k9q33zeqno4nj7acfxwro1oclkxoy78wzsjwdiemhy6c9q43xep7a6wwzd34',
                proxyPort: 1945043352,
                destination: '2vvau0h288zadcbx1kou5bz1s8s3c58lad7c5ah38qnnk7fq6r170n6dk3gpbp39dfmtnopps5n2n3jcjgp3gi8vv53hpzui4cqkh6dmkdii3d73thdp4ux6idrn7irvqbgeklk928rngi4rbx74dbfko6gvcy3u',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'j0p9xedfh93zo6mikdczdj2om3d5rwl14c18o6exf8bti4p67eyxn4qb768n5urvkab4aljvsxh209w3ueo621pqlip26ly1ipa5j1ybyb8l444x4c3eczk5f9w7sa51x5oq6u9t4p92ntzm5bx600uiwkeydxk3',
                responsibleUserAccountName: 'wuiekjckj5nbz874er2l',
                lastChangeUserAccount: 'he1agslgdliawm0dvcbc',
                lastChangedAt: '2020-07-30 19:04:32',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '1l66mh7t1kuixfqf98frmytjl7ijwyxf4yavuv9y',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'w68kvh35pvksjhbaoenyeoojips8iztj6iofs2vl8xa98crbr1',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'ngimq4bd1jf7era2jq3u',
                party: 'x0fp5ky7hirdb1wmvj9ta9ymbpztbxptmgrub9mhyvhbtihir09fpjvss7m6awrr1jye8fjep9xompees5dy9wg1cogczy8xkb5n6wokw8tvdfs1ksbl223xg3z1yxn8urz7d6is2yi1f1afil9indyoolvk20te',
                component: '3003qhpzjf8l5pmtmgkm2ao974vf5bvkan3trm133o8telhvuxfz4kk2oh1clf9cb9jckpo9d7mnaljgdfr8xwkn30a5hiuc8mx4wx9sjeke9ow977b2b7k7iumsdgubiwd34jd21na41it6zp4h1zfcnne1gxg4',
                name: '4b8kcrcyct34xnc1mrcl6b6fc79scco727qdziupthm1juv5rceryz0c11y07umksp46pcc25zji2pl162fslqmuj2rd8qun3ibf1fp9wy8weivqb3udhpn1w49tjehao6ym6zx5qyumz2z1hs25ahx7ytzh7ouz',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'eh4ilow3eyzvbc9yp8fuhukwi8fgrfkw3t4wrwus60lta8yprq9866fh18juxv1rim6vd7j7gic9iu20yqsb5lqdegsjwfksk8hfur5f7zyu1cozblvygjtuy7cmpjqtnmz8llgffcb0hb80bkjm2rx51yxbxqjq',
                flowComponent: '7lv1rr384lty25cdvh208o1e92fjp422pz7z0kad2c556an3dwygctc03wza65f66jh17zvcs6xngr5faivsyhxpivvbo14h0c3iz9tn4vhhpje64dkv19j48phr8v86oi1hx91eskwrgmruot6354z70yh3py94',
                flowInterfaceName: 'vqg36jwmx9y4l2h8eqrzb6byzi0izf4foktnicx3x6pgo4vkd4xglkg2tpzkzcd10jbvdc1xebterwy8fw3ygvswku4357x8hvreetz3u3ng2ercue6d35ib4mf80ebz2gikdhaqkyhj3c3sic36ebrlwy6svsb9',
                flowInterfaceNamespace: '7iqktatur9eqs0lt8k5lk40oyuykro07fm4rembtw2knoxxbu6ay6a9a6pibq134fi4y9vrwv2mzp4xkw75bkqowvbyoshxg8thz7d7saxqpfgngju5kkhvnsj23zrhedw7p15chorzw5g7lni4mfw14o843nars',
                version: 'zprmphznnh2ebhh59951',
                adapterType: 'whb60r90j949hvw9xmt24hmmx7xrfjcuuvyeuav03yynido7vujlyhxfrgyq',
                direction: 'RECEIVER',
                transportProtocol: 'el7ky8rane2sgv3opwu7tcz3u33vajppge296liv6c8oqy5tjgyyuau4lrtm',
                messageProtocol: '2bpuz0rto1u8rj3v5lfwezmg0i99lyc6qkms6ph60qm2ygpla46u743bwsep',
                adapterEngineName: 'kng5n2yjtfyu7wunud855mkcyd5mz37ltdjhzm3b0ab7kxzz5dxmifh4d480qunpg81dq09fsz6d57bo3cuir0ja4f1tf3d1oquou8f7yiua8wp1e00volrhppu458d9ygd498nq7g0ueq7jft949oa4mvhib4eo',
                url: 'bs2so8fbechm671bcyho26pwfzncmqtpxt14myevbja2jz7702r9te2eup3qq8lza7u7abhc45a01wzok69azlx7xde3s5ku8fwev796ndra7xyr0wjcbs3thk576kl96w6gdf63iku1eg8zz5f5zd2blypqeeuo0nb62c8anvljfurszfxurr5bbc1a1nw1p895zs8zbi3adeavfm4kb3t185nod3oxmijxar2lmgagqebc9vffcki54wk2nfv2tarmxef72ubd625pfw6i2jmcrvccplbmfbq4k6gzmmdshusvkefsvuzam6f80kg7',
                username: 'xy44kdnct76jg0cbeaiqy5pszuyoxuf1i6mw6c4ho35vix1xibg12nwhpuit',
                remoteHost: 'ba140x1con3rl7tt8tn7t3jiwzwuszmszlaab1upj0y4t6v50758u852badqj9mpyvzftxx84r7i6e1ann5x9kr0twwo6s1ffht0plpc8cke1qulvf8olyvvxap4uqpojga251e3wy13kzbmyo6g41q56shsbt0r',
                remotePort: 7645399116,
                directory: 'ruh52t1r4cifo801qkl5avzheziuoqw5cb0pfbxzcw6bgq0gp5kbj7xu229dtkpcsn7hci2pr7p3yw9gkm12fc1zp5nl909hz1dzee3g3rq3gh1b26jhmv3buszd94yupdsji7v24bqoql6kzcysqyqhmo0jipdsus7oye7w6ubsqjgwykiw8vf3lmjk3jvsjnoajjvynnnt0xwgcj5mvon1bbibphb2m1nmanuoe233wil120yldy8tml8ftrtmqy9st2e22tsiyijo045nf1tqoy214vb08z42olxniqtkkgxwox7p0i4tpxaqqupsvm4d8alyzgr683mr14vvqhmnr32o58zykau75yuzqw37sg4svmocf1u6y5l8ndocwlya0hpuuxpwjos1583d6t77wxdkuiothh3fmtcemjyopy833wvyjyftutoz2550kqlkicsi6amwuvnnjime5uqt7816q4tzq9fpmim8ak3ofb3ihcm20m4cgtxzf2svsefmx2a2bfkxope4hul8hhhi7xvoyla9s8qk74z3tu2uxgssxpea02n0crdqciqkkms6za3yl3zjcpmfaeksjk8r9s59kui3xvbjmelxoet2ixwhiwwzho7i1ka2ycvical3nejzatkzdobe6nuu8nlfmvgrmah7opht7oojnkb9y6dcq47hy0aponr1wkx8btzdsw0aol4qdcxfht6eisze51krisnodms5zo2d47pvn7r3v9uqksb95oj8nkmpt2osv082iw5kwyq3xu83eigakhjjhjqytuyvzt2bb80fai2aw8mw8djcik3p94txmpgs1zk50d02l4i99hjuydim5dk0da7bj55892l5ajouadwbewmzvc2ldfyfgcatcpjm1df7fbdwdhs44bsj1mpluca654elhkfyi2az07rgss1er9d308xvwva6910lodf5ir3nai6q14dfav6g8dwfk5cmtm4sjyruke3kn3ko0ueg75013xy8qtcdg0lq',
                fileSchema: 'dsh7kno1euap7n2926fdklip63mjttbuwqfg5yydovqic1jm0um5pkv0lmaguz9r2h5uf7ljl33c33qn08teyqd3awyd40d1so2qntjyqdnjek85kwbw7ex2eipssyhh4vmvk04vsfry3pw32k2613ok8914bwmui9g5i8ajgizw3g0jsuvllroyeuea0bd3e2kwa616w23m0j60v6caifoymmrtgn4de0aizlt81a8b6drrldsteu69ms7sinrawyaztshl4pg1zehifw6dtoag7ilyoaqgo0ohvs3w95wfgfhlb5r1p4m54p8vvsya79ap5onfwsrhj5la5khi419aj2vrruv329vbjrr4afvi2454xsbk2umbpfwi8qmhiwr3n5xof77m9nmhn0le1l88dw097tkuwmww9hvuzuwaxwpw51umdwclgshf9935xykszcq8nhb4je7w6sedzy8fblq2mmmmhp8cl8g5b4p657lvrt7nhnmzspwc2lqdb78jjxljrmvj4kny5e5x1j20dpall25q0dw6yhfe24b1c67emz0rsuxptp0n2saphwtmnruo4czrep986c52e1dyl8uj2zs6vngx3lf8uadwkuxmawmqinckp81b2aau91ktmstgffazhq6m9s3f98eteq6gl5wih4f07mjte9f73dv3tt9iz7oikhcddqd12zxar56st3x0ys4sx5gpemreithm6pk8p96fny8bgkezgjct3nmnh8pl7n0fbq0878i6d4373iqo7jubhkqpqd8ys9et1garkpq99xtie60x0qgj0wikl9y6qafvl6dvod1ev7rrrq17sbsphga5xbrb2539jlanduathnunw723mf6qjn8sqruy1gqr46mg77sgqw6kcq8wdhe7l98k1sx172hkg329rkpu4mvpvxoly2xbcxepuzdbi8v12pxu0ytf3k6k4nlkx8kxp5toe51z29977y82u8o69vx6ebf31io4sref63ko172vf7w3',
                proxyHost: 'm69y10lmhexr9k0gn6uo740act5ukzu0lefcxsbgck763dje3gn9xupp77rx',
                proxyPort: -9,
                destination: 'p84zkjxd4xkxd5jg2ivs06rvsmj9455kkh00ou3ee9jgh1bjynrb6ie266ce1s5x9uyydb96zgq02bpcpceeixvq24o4jb98a73scxxw5jxey3hd9xhdiac9lhlvds20w1ug8hm2xqslos8k28lu7m4jnbrdtgw4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'e0q3k0yvg4ed6vvz5vlbapmpvnsufgeum80pl4k7rhpyf84z7s4k4zrbassf8xkfmb3kdq7ym3lbpr326wz51nzxt59zsuark2vs8i2tfmi9bj8vd5t7r64vq4wje7f0i09szpnrlmpvbfbjghxf6yjofpk3ej7a',
                responsibleUserAccountName: '9wz8vkw8se3asm7s3rmj',
                lastChangeUserAccount: '3w5iza84bhph596hqwrh',
                lastChangedAt: '2020-07-30 21:18:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'uajtiq0uotlapij3a5989a29j4fk98szznkuguq6',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: '3r7ceg4dhkfmbv5kti9805rnlq0ray5p0jibyeqxq9bpfvs4jh',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'vypusdksynqc5rf2higz',
                party: '2lx9atfmocmxy75qpza5xs895pd481lc6g3peum2g28kqbomzuattizs76oopa3d4maicdar5vwyljvgtcimqhvztrohegbg1e69qm2b2d43w7fve0kcd2mietronagi6ofi7fwc3rhcwl8h4zpm447g8ayvzbmf',
                component: 'hfqvgq3mnxybyiit6xbiigren4i7obqarl3j0q48y51v0jah3e6kpyysvba5ccs4pu63fgcimoe5o346ckyci4fyrzx4ap9r4pzcb50e72403muva8h9ak7cinen5is6wsnx8na90hq1h8vbkdd6kxc18dsa5hfb',
                name: '6klhhr1k8yipdf1vuzy24311d1ngjad0cpg2s8x29oays5rndyjm2g30pdgiu1nf25ckph8bnx0ps7ozc3ac4i005q85cfjic1mxr1959hrkcfaiq8s6fx4u42ddhmckvm0e6qh5n1l9fk7wuyj2popnwnm9cxaw',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '9gl2bavjn9sga5wev9jl225l5tb8ntq0cwvv6chwvsozw6z4gbtzmzj07n727s8atb3dvuiosn2wrjiam9hst0ka82q0ni8sm8jdypl4uzh487yb7vkqv3th8p1l7ymr9vvctn980irkfw4g8rucgyhwdnwf7ofr',
                flowComponent: 'p2q2q5dynkndemdggzpx10vchmmbgbjql2hxqqtclvp8nhiy8aanitso484ymov5vgvruu7yrwo66gw73t13i23f0acwj0jel81dw516o3rimbxapbknc1t2pl026ogfom8ey801tpqmisou8e8tk4mt5y3l9eic',
                flowInterfaceName: 'npn0l675vuwaxzrr493naein63uzoe6iubn94wxchj5csujob5blbqz3f695nnz3cvu0mvm4jlholm99ti0wj7k0jfswk23rgdr4w4giohomm2fps5325ic8ot6ogwmm02c4hgvk9h67egelvq3pzulsbw45ny24',
                flowInterfaceNamespace: 'nmen43ikn6hmnd0wca9frp2p5maj7zsd6glktu9ofq8bfdzvwhgs3wkeeca1s5tnftd4uroh6ofwvyx428x26nwxyai0vmspx0yvz31ao2uzspktmn7wxr5b4qyrvqpc5bchvto1ffksyz7yvn0hk3ztg6pkn9j6',
                version: 'sqq5z9p5oplkut3h5jqy',
                adapterType: 'prefbpejwk6aev4msjkmhmnueeg87o469f8zer49emk8vsogkmkj13ex9ccf',
                direction: 'XXXX',
                transportProtocol: 'scgupm2njr6mdzhswp98h4lmsnelv9m4hmhdchnzw66yv37d0vt0d3h9j6af',
                messageProtocol: '7nergupxrq9xapvode7b9ifrrr9lyikqgst4p2lggq2a4j2oue7c57vloaxr',
                adapterEngineName: '3rd1ly27ldgdm1x4ri030wqks9nmh4vxahfhsoi302pjzf80ioim97ofq3recmx8s38d3ku0ajgqsxfiqqsqb2nhed57y47mnjt27ayub9nvbk92cyoo3yim9ex2y8oyr9934qcnsmiidrd05ae3axsbu7jc5u0f',
                url: 'km98lfgq1zksni37lw5kkdof8hhrhot1wf3pvh2nd8iq4jiri2i9ass3xqo2rvfmodg9dqpb0xktc3s7cu5zbuwpnys5sbv9eu14awu0butfv3cfh0kdsgwf0n36xj3vre2j3bnskw28r545n6p2amusj6jjj59m3whzagfpbvl7uw47pt423v8fyfdmb8kml0l98qyx062stju2k393fvi9arp69x3mo7swuobs6as83nye2salisiocoma9c7lz21c3710d055sflds7zis0u59kgcbw4ujd013idcq3ldwlcwhu3fs707ooz5cqdl',
                username: '5u4dygszdsrnrc1mxf3it8zuoymv4rm8wtnmugkq3d0jj5v7oiw6e1iw5sw0',
                remoteHost: '281mgbpv0h6z5nnebjfurcs34gwlz136lqtdxa5l9zn1g11ioj9lphxald2gcwyqo41xp9ws82z5pc0s6yu0toemeeq6mt53rogvn6aa65e4qv5ymwzgpq15axuk9wtzp8hwcjfzorwlqbbmce4n5h9hsw0dtsdc',
                remotePort: 7456078836,
                directory: 'q8cbcnm2gftvrp2sgy36984e1vvnzilgj9wvejjgf415mmos6mp69fb3aeeizhr60gcqp2uuohf630wbp24kc1n66suir0sm7obv6vjg20y85zliaa3h2im43ic5z6fo7o7f378o21v0xvdutejb0y76gyscrq5vi1c3rlyzqbdv6iza1nwnxu6w6q46g87oxz0yx3ya36w77k3hhy2r80nmp7o9fvgvap5nn2i5mpoul3au51nf9ak0omxiztq9zeaju46jgybcma50p84ay6jfsntzafjx6qe3ihypxtre4uypl67679ew0cvn1g15bjud8wkugi14izakuln0jnlz4x975n7almr2lj36wrcjoknsjxsx8fqbuvb1l5xyu3b2zlr7jqud76p92z4203xjls12yl8oa6h816g6a0bg9yyv5aj5w106b06pfpfc50ncnn9ue2bkkfapn9l0c0gwxsvsacwwoy5ywrmtfs53u054qdq6kkp4v890te3dx5lolwpqgyjadzaizuwch4s1rq9xrnm08tbc3ctva99ld8hr68dim4ktyiioqjesy02n77dw2iiixmbec932q1dfysxg1uymd5ns3389auz5fzkk3fpi9gwos675lrk81uozfsuhh8t266z2dwplcohrpo2ev8tm5o2mo876awy560n8rht297qc5rst73l4x5qavd01qwmwflrfxjf8sszv2lazdqoftxycq1mvq22ynr8wnjzwy49f0019rwu48xp2gcxt5qqnym89bmf8d06rnkdfhviigbe0ct08svpjnf2ajf6u4fnbdcb1t7miu1nrcfz78043j9ueifoe88x4t8d6xza58d7feu5cc3flan47n0bchycv5vqf7ql04yrrah5chh5dbd8m9wxswj1puexn5g3uxl2rv5wnnenv0hqz4h9v5ogx2sn3hdn9pna94cu5zva1dhlurlwj0nqn0qcdcee4wmu9kqq0nhva6616gda0lk8ny8hzagrg',
                fileSchema: 'xd03vcujpm2xkthusu3h3qbt17o05102cqa4jeq7skbyvtpv5kc8jgf3ivl85a0c4ud45drltvi1e4m7us3n80qfjo3mwll1oq6jbjfj2u4q3mkiy1o7nwn0yjwjcridryad5opy540pmaccoc797nmhww4x1gr97148uj48kgiamld6zgulwygflirtpmz4klazg3emcof0mfu8wc6bsk1cj5dk3z23t7ko9xjkr4weglvh49jezk74bo2y9fflj43qvpqqtsi6hxctyjyfef78liajhn3entj466drxgr2a3trxiboac17nq5e9enrwc1gy7mui7ty1w4vbhlagfujaj9jkbhvo1pzt5xhcw7vh0te58tcydqnic6c7ij62zt8mhkk4q47u0r628uzaf5wn8sqt1nwu19n5ru38446l1z1zwfmopiu232s7sdq23p6s27pjg2ppotmvfhuytf59no1mufzr58ipwiylon70h5iae0ge9ap2b9dvmvuojc8tyzzm701jhw3gta7maf6h0aq7t5ig3t01splqpcxx1cgd1hcf3fjfsftwi9b9aeme1qbp1k1omv8ezxoxx4tv6gvfn4v5j4xwjgy7bqvqdvms5n4wm1reeshauqfymn01273mginy1avu1vahda2s5y21zts863akusmph257mj7natdt6og6n2b4t8lyq556c39f2q4bdole2lojun7tlvp7wlo3uspbro1d1jgcmrx5hbcp0kzn08wv2tl4250ta7a04dxn2lui7i0yklgsbxe4cj31ommrge0mkibs7qlqvnstqnaonfd8lxcnpja8ioxtexxahauzosewbwy2jvax8f14ti2mn12hdtygmr4k32vuywugzc2nl11pd65vk3bwvf35trtyc2lfpqnwaj9kauwm6qyey1smdinhwgs9jf79m63fm16q1luu0rdshilph2gm4dl8ypo503o40s4s7ma0nn5zdhw8wh08585e1slfmss9hfp5p90',
                proxyHost: 'jgr99ia7qqp4sivcvqx44ci0kdif57nejca5cq33g588c6raqhnwkjshcvkq',
                proxyPort: 7022179810,
                destination: 'j43cl6ngvsc51sv17vv2safr79nugfzsd14taryrpdwz1in2h2pntys7x19v44321afqa16bldl9mkzmec76nfm2s2mqgotw32p21mn90g9oqg3i9yqwbpcjeowvbjkbjbpm9rwsvk0a475x4cscwar3wcm37p6k',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'fqm5oms8a8h9sl8eiw9ew9usx1u77ki24wvel6bapmqvf9aet7rg1qijbmp5gju63pm81dcpg427aruyim4t21f1rxh2dmq0qmm4bpaj37y9ig6blmxguooovymx8bsz8irssll1w95bwufzj8pw73a33bv58jud',
                responsibleUserAccountName: 'a91q76hu3nzisgrmx0oa',
                lastChangeUserAccount: '77ynrhgkmbyiqno09704',
                lastChangedAt: '2020-07-31 05:52:36',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: '7hpq00mh84p9xcwoseygf34hxmj01hrqmnzobm70',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'qmx47dgnaydikfwr28y799si33y0zwor5vzs1w7lqrhdwggx66',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: '1d95h7zu9om5adj0pwxm',
                party: 'iupnckfgj6vf3k6celd33ktnxxxuhrntrk94rv11heh7e5wh89w570iajh9wams1epi70t5z1tq79ldvq2k7ioflnxermr81g2hsow08z03j8h8pgloxy9hvmqsmcq84hoffjolxj7bnwdunm0hjyutk2kqw0pg6',
                component: 'lstybj5328ga1yjgnq5rogq5203zbm5w36ceid9xp3o9i3esgqhvu1j6n0cz30igpdwmtis9gav3zbd72m7ywc9188bwv2fe8fdzfqajzj13ovdbk2924l5zeutdmu1i8tto2utfbg7k0mnhfzcqj5sky0uiwp8s',
                name: 's3dko1ew0vm2bo7r5xsj4kdzdvlziasx7c0ukcp5f57c6lhfvf61hxsaxthjde6saa7lk4z1i0pqfiu3mw2yz6j9sm2bw158q2vsoa0cby65lga1veplfadx452bowao6lzv3op11zlmzn28v89ojql63odx136v',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'oiylgrdsz3ebv0ylcl4npgoor2xt5uf8cljlpwxy4xemh8t9hfy5ittl9uwa59jqic0ht7u48v6ph8497e4tt4d4lv9l82wnwjyj2zaujr4uj15qvkm2q4gxw6nq0zw39b1ignoz9wh5jgt677s5eiyn5vhhhaji',
                flowComponent: '7da9erz7us1xfr71szez4vhgf8n4rvunipz4qjtbuehtuk2ego0keabu8rci3k5sezwesu0wg8pssisl8u6ne4u7tqw75wjt6q0j57gkw6mq7ccnw34uc6yyim4qnzc6tdf02faex704mr6d5u6yavd1q0fddo1o',
                flowInterfaceName: '7i8gwn718nux3sq8oci08k4eh7i1aqhnrawg8xijks1x6aoo7ubae9f641bj3pu9czm70e18ft09b7wvqe6r66qbk2lbyfrcgzpipagnujk7m4kf8h5x8eor4zt2ebhs4a1708j01fcg4jio940acol8bl86qwwd',
                flowInterfaceNamespace: '8u2za27890ofnw0d9e7np8euwqh60ko3739ohojn6z768a8n29xeq0g0q5nzmpxsixh4xkfkxvemy6ow3xcyz36fkf6ymp6hdigjiwyuw4knkrb0cnq40dj3xxc05omcscfo2qfbmmyn87ty7c7ae97gtxvwobas',
                version: '0antr4x2xs750jc0sqn0',
                adapterType: 'jzb9hjc6pbdhgiz77xenea9txyjhcwrd2i1p15gmp5nnjw0cniu9buh3jgf2',
                direction: 'SENDER',
                transportProtocol: 'mr79ejyrtw8mu0vfdkjq7nkkjlwbfq2vrmbig8ki3sf4htuit8tm6cany14x',
                messageProtocol: 'g5qqbycdimct7xb0f4us8i9qv2eiqgaqhei9ufalrswgygv78o9f8h3z9yvr',
                adapterEngineName: '9yidsb4o7mil855dq6naqpdph8nxoh2u9ha00qsxgvy8qldkyklu7nn4g7kjfrtew71epsidp7ge5re2buca4oqwiyns3wayoq7p6nut1xk2pqmjd5m40s9cq9tuql9qr2k0487f3ef30kf8ju2dy5zzceu0byqz',
                url: 'phu7ninirqlwontta0s53ui7fbe1uhmrixfo7b1n9en84m7ir72p9zekpzz1k7dpsli5vcyhpjwdmiiwdwy6ofqg8ffd2p09fblawvkiyta7asbwgqii4xxdy252xntucf8p4rs0h2nhfq4w33cz5qgqdvakrkbbuuevz02zqpj9f8mk6lxuzdk4qkzwdz8b0u7gkddth3xkznrylw8a3rgsspwxkh1nn886456nac5v3fnt4cyyat99loi6iuuqhcij8o522pg6pwvy1255jjtgcf194utvmwvf55mq3881vd8tapjwmygd5efmxc6q',
                username: 'qcq8p5sbcdpjb467r2l468inebefz1q48vo1v82mcui09s2aoor63l4av4a1',
                remoteHost: 'r840hwivc63qtl12c3hw7u42nog3v0ud6g7w8qpbbzxpj43dnnmw31553m4v9xuatx8etix0yj7eylapdse9iutks9st9930tm2h0g21puc9293a6ake3kivd7kthpgoxwp73qha7yt9z1mpxwvh9924gfc85hk1',
                remotePort: 7138949149,
                directory: '1eeupw9tp36siqhd9dugwxv3hufi8m2olxectio1v4keozlkkciqhrywm467wgfseyw5o303u8u6ugbzanwwwd0w1cui3u5brn9m8w7ieid7uljtdimqrb4qztq9axvwtp29yfxrri13zqy7cjuug35vz0xlv1o09iddopd1p0jhxju76udyatacqzj3bz58ji4w61a2gqa92htaehhh64cpoppuknj4nqlpwwj1b0baai5lqj4qgrsyd42swzmefiibnef1a0altseqhi52d2n7d3bmrwipt9s77uix9da2v9yg4krvnulq13d1o1981m9ltd42wmr1w5v6mmlv08h6istj9vlqzoysu6tieag099vp0r33gpvwa2qkm9hcu68s2s23sfaji2k1sz7i9zpxszi7vlxaar3mt0h0um3bimsrwpy2tt2smu8eixxs8djnlx3h2q8by6bl5fk59fkzoy88f0f4p09q79q8ms7fna4nnimtn0t3j78jjcffbuh2x58jyz9n3mand94jo857k6usxsps3lt8qfxghv4g5wdlokzgi0rq72dqz6apvetbrlo5ih2i858d368pjket9q03i2ygd5drzrwsoqkng37l1whd8lla06s646nsrvjonczyyqda6w8y4v37u00mtzx6i3biyzrco1xc0vszs7psf4hu8em5gskekshaqny0ldmgvsuyg6l2pyt5dlw4tofadzbiz31zna6rqy0ebzktqvab00f9943w3qmnyfraxx2b6l0i9ip7twpvnyrzyhgvu6a4dw6oootj1zupxcee6fjkvutvfz8wpim56gv8we767yk3e31bizj9yocz8jyhw1ebgsj94f7x2d8msggx43agno9flbhd8jj2nm593b0p9rsrypivsyfbi34nv9jgz6iabswhefv64v72ni9ui60rwwkvj2bbereh2zefrguoz66sygw55bsoxx3d1ohb8k40cyxkmlbty2720fac1it9ummiy1akilit',
                fileSchema: 'y6k2fw23exzvzb9vt6u788xds36l93x7vzsco1gy7meolrq3s9lgfsc8wh52yffaqv7ziibatcctacpr49pvz7ynzv2smdiyfz7jilbh1024cfy6t1bwbuwsik43q9m3ef4f56q39mru1efxdn7b2wv2vyiqr2f7kbmw7mtzyl7udz2x9ksufidthe4iz7d1qy39j05h2raskntt723uejo3xlsum4780blobjr7p0m7wi6c86mxe8c3wwetssrh5j54xqt2rurdmdy0ehueiz32dcm02mlajtf0nn332x69zbxmz1mdfibipjyiwmjgs9di6hczq4qdljyyr1vfwpogy5vv8pghwme8n1w0ktzge4199v37v35ygjwf9mbibsj5v106wao24y5evwk59i2gfia3t05ia5cs175adkuzj7v86eprktg467yeo2d45zed0pbk6tx60uvfiur057zp15h1eiggkp1p4d34zgypn0yv6wonj2kcaxs0p2b1e36vqsr0mhsxv4a2iqlmdbjnz5i3p37f2pliaz5orb3d8p1gp2smp8igbgc6148nd5zsv1w2l05zkowi2z40i69c5w07kfzxlgqpy69idwm5mqmi7el57mumnqqdfaryidfyjdnhf7x4bpwci850jxqmt3up48pssu8v47mrj0ao6xzc5xrki99wrz84u0xidd0v6c2x60gsb71gvge0xb6nozb15o2uht1ofgaa1rq14q7dgcvpaypln2ktevgy59vlor2hdh26uvcwgtpyo1gs40qeuqhccnnlxnpvia9bqfdaemiru3b1f8c2lg6tqkj4c8tkmxo6s1kvaejw12crswq7rarbccfapxa3m5l00qtdcaispfjujjel1l76fjehvkly9sns7pfp4zqviagjjh35wzjx4inkr7k08nwm2xvdzi0f8kkik9s4nhgyg8tz4gds48t27johbnvfu7zbwt5owkxs2rhn7m28j49634jg2leasveh6y1tgia1',
                proxyHost: 'evntrmpozzaldbgbu1dks8hqn8jmpsmzmqphklbfk0ctdjpzl73979qxmf0z',
                proxyPort: 2019340529,
                destination: 't8kojvt37784gcvoxh63tf4k6kjyvhm5thv7x121cugpgh7dveeqnqo2k7xwz4aq1mivtu7v6ulzsiyly9cvg3p9qu7idvv8zbtkiiw3wnmt5ak82ua68rpwv7jy8gwv1jkkp9c2sjbzp34poetcr857zml0g8fr',
                adapterStatus: 'XXXX',
                softwareComponentName: '5rpl2xglja0u58fsncpafl59l6y6qiye3m02yuf764m5b6be7x8new7usrmcgjxuhvspq9o92kzobl7sm7nr3jjkx9yrs0dx4xlwewxxg9f9ksjz0kxu8phylorwcqb9wuaukw5xwze9l5rnrkv090jenyu7n2cb',
                responsibleUserAccountName: '36xfgzdu6hl2x2gk02u7',
                lastChangeUserAccount: '8whuv88rqhpvax3dif19',
                lastChangedAt: '2020-07-31 10:17:11',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 't58evkq5y0zd29pmg0dpa07390gya85y27t62jfb',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'epvg5y4us3dhggt6las0zu5592u5k7vl5mxcuzh2ymgr0hqbe3',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'l772whd8l02svrf05xxv',
                party: 'irzgf3xl0oe9le5hw3flwrbkcu9tokytmt05whw66wwt5u79qz31kwwgqp8dxhrgge2nflaqqom44ynelq4a9p4e0845pwsehyd9q0yysl0dho0wcn9c9497spdujpe0w3cbbl65kodskjmnqlwykm1rmnklov7w',
                component: 'z9l3a3iz0inabjg1xdqnhhqkv06fvgdeig8i5w12n6yjl52z2ldv9unt0g9an9f4fjmhwxsteao8x11r9u98e48jexnqrs1fvd1c0700wqmfnd094yah0wynnwuoq4tknl0agirx0ezwq11fe822bifyvck3stqw',
                name: 'uza2tu1kvclw2hbndgeup6yavatyfgb1baafhvfuojlpxd9tvv6zw3mm9ek22lyepl4xb8wvlsbolltsvfspone7y1slalwv9xrlviw856h6l97utqo8hhswngindt3xt5ibprmyjsm3jic966hqk9rwt1nqvwsk',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: 'hgjep8r1rou45y0r6kl3ihw49tsh7rhuzaqan3ytgs6kh4d9w57z4cdc578cb228vzh09h3xrlr48hymfpkhlz81r86ryb3awz8addpgj3k57s93q12el2aqrbxbzpqd836cigjspm95cbmt3wh9so9kqa93tedg',
                flowComponent: 'm5fzbncxdza3zxdqlj57fih29ubo3bzm2ylauk85jnwgcfn2kmr7xjg27aciafjhc6en6f245gzavrbozwfbjm3ntp2ov197m2n11yebs0hgjgte3u5a3eybelimjezp2s6izyr62d9a79q9qu8pszt624vzi6ww',
                flowInterfaceName: '4mpb434wjcvuxmpbkp10wxe6q8njs7lsq0437zl9gnx8c3hch30xma0wqfc9p4xwijlgyxn9zu8rzoa7ipl7jf5lwtdxlrmq3594ekmy5bgddhxdbbostklhily2ho4n6joui9hnaovtdjf4rvnvbokemdhiosb6',
                flowInterfaceNamespace: 'qpn4nuy0iv8ewfrvjm7ve3mm28o140c4mdwmyoem6e58impl8m0sob0884bclxh6wsje50egk9osd1yl0phpzdccnfeutx24ch8dwvy6y67bo29puhmv96bob1wtp8vqynym27r4sh18e24u34ghjtzhxfs7jtqa',
                version: 'a5nbdy4acmxqhg0l948a',
                adapterType: 'd47ym7mjecfxt18bpom7s6n6v23i66f2txiphvijme69cp3bpxjaw6d8cpvs',
                direction: 'SENDER',
                transportProtocol: '8d9ju3rwdcpynhg7unn7n3z1r8vzeont7k8je11cn1nfivq7tvqms0jwk820',
                messageProtocol: 'ck7kilqled5x3d9s63ajq53plpze9j6rm5d7xcrzt8p4xoqydjssf7xtyvb3',
                adapterEngineName: 'hlfoet585ilfu8pfbj8buiig5eb1v8wfc8dm8ibvltzafj67kqtu4hl98me3w76uuehuohudw1clb5v0ydy1qhl2uv9tctxxq2hmuff8lalex0hawyutpokxlu209bdktzhxhwiybkg36eeqa29lzw6dv62ea6w8',
                url: '62vmo1m4th2czib4qlxvjfdz8sk90z9l145g166r0ou451qv14nxbnosz84wgkxqkgrw96itpjx31vxjsssnrsn12otlbkot2g8g60v7m7jmpgspoygfs628m5j60oa1h1cxpl9yw49zzwpnteneqoc60514h7ujmphvrdbir5iga6fw60mndj20o0p9nhxj3q05nc45jwieei8pp93nmda1opviu3h3wa0dm7ixwriglmskrkfmi26c7qa7hy1mg12p39xic5wqlp5m7o92563cc2w2fkthmg2c7835pnn63vj1yex3uwv09b0zn072',
                username: 'un2or02zp50j04vvn462vjexzixakm2a86uleiteddvdwbdal6qc1f88d41g',
                remoteHost: '9fx01sth90vnzy5pz44v2yi7g952vjgg39vkgh3lcqou30y1ndffp29ncv6hidtan44qb4n12d2wv9klpgjpvs8wsu8ryejqfcsnjsg593bg1h45skyhs4m2elrbrb0gqc3jiijpu3i1w8zt48e9jhsear0t4106',
                remotePort: 5794182389,
                directory: 't9nfum00m3dbomlwcue2vwtuso1xtnf0m9gtkdjkipztf0hbykoln27op3mzfacvkwk8ufx3spq0vymvfy7azfr4uqpneir4ldqa5f68kxp5fxe82xbzhjirc13x0d740ua6zz16i4qddtji3oanbazj7m9e2ssi33ie3intefsskt26j3f901bdviijs5kobviy015nl325t7d8xkhai5a042j5l5sigk6zto0har9hmckizjkiks5cipnv5phuxaxcpabkb1y26o1pnmkfvi4fzvi5skabc6db0zpiwdbihet4vr9axkuq4tkdubjarmcf9s8iisfc4fw38oddcj9i945tofj660ikoq6nbkkkzjb2wmi8d8x8bfd0htchwyi8r1tmwepiyx593h879fn2bfhpmd4o6on12byf7qgct952x41or6x254zr74tup80eln7wlp8h2n8r396oryx57tkbofcydcs53s7ub3g03bidw7vlavs9o70u724w59avy4uzx0jzwe1jb50ehf4ts2xnaup4ks5k3jwo3rvffws0ciqpb2ovhsa5xodqumh66hyxtrt169r8ccyeqm1ruuq6s58avbe9lbsioc9cetp734aurcgu6cuy55i7vkpqhmo4hu880wo3fxfi6szx70q8rabv9nosm9p43iw602xyndxq617jsdxy0t8uqhe367csnw3kxwzoggej9woxmj5pfno2rexchf9gqrn0bal8kh74z9kqp0p2rng7430r9nta8vsi78ihrt8u5p3ymjrwhiavnc266krk4p3yeo1qjrlaqgfavky8nzq43wnraj8y50ysfdczlo2dm82cltr3wpwe5cp2lp1wzrtmuedkgi25swzf13sfhacbvp3qtxsyrxjew8zyrtn9wlrqwnwepymuuqnfgic99ctg07trfcd9lwjkaol41oamexdvtbxatf7vf9gyrkjzpjnstnxkroh93jlgm7uskrgv35kgpxy36mx4cf1xv807',
                fileSchema: '17nlas7f2bfbt824bv1zq7v8rdf082b3br2iy47f0b685vu12h3u59lblparfhuvp0wm8gy76phc2mgwlb8rg58shd9f99yccdciqv5kcjxndov4knz43ly10jov3p8z6k4lz55nanvu1f07pn32jaw8cxi7a5rz6ddkc2t0hzsd4mlmplm6mn9l7tp5prqmwreo40qsc31akpdg7r06ihasnoh75h8dmkebarhc36f261jcshtluhr2l8sepnribe7j4tqrtetnwar84nieymfkae5i8gzw73vshdsb5d03mufl9qf0vabik4mfqld5qubhqrnp55beeeb9p6x143v3qsuw4prsn4r0gw4c0fqjs4rrb08ebt7qxwgurmxb8xsl21yyi60a4mhnw90z6j46a9cfj0xfxdlmwzh4m25ky9xhmpwfroqll2hmgeenmzsur5u4l4auy5as23783fw6d2ysayw4aq3ks7496eh5pros1mahmaz6sxxdhzs9g6agxf5obg1ith8xbwt7d1ga15fjj76y0rj11z5la34gmuryoby1l57ulp8n5xixu0z1x2thu1igyz3oxadqs47a7sajjiiedyfmdondmxym7d5k8qv3b0bm18rbg1587ehye5n4zw77h0ucxtqw807vff99yj48y8jstukgykbz14oyna2ia44b7x9cdj1zweiz30gpo473zowr4w09v6be8flk9c1slb7as1e6fogtuhxssgrmd7g12svou7n16uas2u5ggfu723yifpvrr8lucmw6p8vlh0m6w2unkg6ray8gprifs96s4gig22ec33m2y7n7a8tyjk0sf5zsld195tpgzur0o1u1m1171g2x3r4wbdtaj18fzc2ltq7psi2lekpirpffun7udacgm13pdoo6g2qntxegxclfos67kmhvgugc3ktplpn7gbl5dhp76w6ieun5dx3a7s53tmv6aqi8h1degru7q7f0kyq9c34vvr0o5we73ll7572f',
                proxyHost: 'o153hsrc3id0vwdabst1d5ou8s1lfp9n8533pd0lhup69ntycgv85lwsb8ac',
                proxyPort: 4747467133,
                destination: 'l17hhnqf2sl8bqxkchjjk5xfvkdj5ozi488uzvr81m0lncsfkgzlqkrc78f2f5lneixg7sr3g641i8rmhpyt2s7c0gv9e8ed4l1z8l5i0ehxrbtsirc1hxwsbssb3luams9rsgf6l2v47v1ow9e8rsshxho3syjl',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cfuf5sptmqm9n3djhfvamhz74urzlxufdt6wjqw3e6tx9ir34wzjd6hgr9kke4y06iz9dcza7bfnqrp7ywh4ha9bneqlb01lccl9ag7h9yjyur5ohuamul79x73cl373t4wurp5ljk4iq04qn1ixkq4y5sqv7itb',
                responsibleUserAccountName: '372ghvpty7swfochxgrg',
                lastChangeUserAccount: 'mbi2n3ufgrrocta0vui6',
                lastChangedAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });
    

    test(`/REST:POST bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'ol4q6pswykqhsbft1k3e295hkhccvtm754ndzs2v',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'f14m2nu71lt6wj2vvyhban5ebhfq6ahpmrd9vnk9hpb0l5w6j6',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'fdq7fyujldsys0ri2sz7',
                party: 'ixoxwz96n9rcgy6mnr4pl0zm3g7z1mxrujbnggzzx1bqkq6je0u66ha00mc0bkbyu64up8wwrcws06e3vwowmpzwtbwnuoqurgiqkdr40posqpr1hm8tn1glcg70ak38py4jrbbzkqx5ie1ynm1budrwjgp38jfp',
                component: '8b3mk19mtb8jp400bi8eyifyrn00a6if0z86rq38rrdav0poon4nf19oon9r2olgodgp2t03se4uhkrx9jja1g6rg1mdylqsushavbg70lxbszhygqo4w5jw2aeeuw47apv96cmhgjcihm761yjjivlh3zx8aeur',
                name: 'z79abtlbb1saqug5q58sgq4419dnolbwvmrkt9vxzwtkwg0glv7t9naemq9tzcpnw1svhoy9cdu1zj5j3z71hjbk6ocqiswcymjx9grs0k6hisl9w3d87r5gy3mdxmqai3o9nndcwkrrfn5x7k6zipqcflh6a1az',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '9rxshpbzotuxp3fm3ezek11rft0a8sms646iod8vhi35r7nyrm86wyn7ziynxxiomkzxo5ezxqubkpdryuffu2cd9xbs5g5uint94xfgj05fgecvp5wo084fv8vw4zsgyvjz8az3udccbrsrfeo4qcacfi2zxs6p',
                flowComponent: 'zzb90mz3xxaclqsnu3r489unl2eodrbq6rojfzqcrhslj2di1t71d7wjrbqdf1j6i92caym7ma5923n5trmoxspcd8ssnz12twg85h76ffow6edy6ykoq9zi8egmofrqpuy46m496k2084mhla502t0k4kbf2f5o',
                flowInterfaceName: 'wy2llo8o6ct67vjphg54ahn9dyyhzssszqsozudixolkwbrsdp9fr3zgo5effvluysqrye2qstqbdnffi0ogd9eqi1odnxu0pjmwc7gt8e5jwzqme12xzg1frh7va80itrkqq5yd6r0trqm4vs2i0xbya435mp0g',
                flowInterfaceNamespace: 'u9qwi0qbwvykikeeu9hx91masf83oegyzz72cvnae5s66utqyyh7danuginn173cndg4cj0u84146up67b2rou67dfbe63um7kjbrd79m7ed8jwjsjh9xnptcoi3784gnt7m7mvbyd4tsxhlxo5uzpouvbug63n5',
                version: 'wvwrjcyr0wtgtoei06pc',
                adapterType: 'ef920rhnmwci5l1wb7178wjd9513n14ciwss8r5dc8fp4nu2oau31d1qrze6',
                direction: 'RECEIVER',
                transportProtocol: '6ihr1elgrgsufnodwr3gqvvteqxirfgy8zqfj70yb6ig3wux0jxc8moxo5gq',
                messageProtocol: 'lipzxdtlkw2t8bwpw119rhnfyzhv5do33c12h65jbykacz2y4r7gib9kixfa',
                adapterEngineName: 'iz63urleajhimy0u5jp0y6vxgmluhvycoxwrx8f6p2r0rzdinodijtbilq8zca48a74cs12tt8u6j1idw3gv78dxztgeeylnb60mq0iwszxf37ymvqhvwouwemkahjwpccrh3qd3g3xsay9wg4xh2ss5vf8b1fo7',
                url: 'eph3ehdtxfmw8glw4yvd651onm960tobf7s8wgfcqsfg5f5d3w983gh755xgdhvcw9df9c84qfqmetugl54eq8tgpeo63u6i57om4vbrmylfdlhxwtw38bh0ab6bb6i2bs3eiyzxw3dlag3skq4wyzn6ov9ywc2c64lbhguvt5ab3dwsft403fzxfxrrntrbqbj3jtm4bwxu50u8prna9hqffaa40b9os7u5r6l4dzl5kdgs7ztd4vnndnvtp3xytq0j64gj37iz7le3605vkwnv4mhgduyf5pd2ffln30ne4rs4qgibyvovbdnfb71j',
                username: 'ltvb46tyel6cqse94w17ppd4wv4yp57wruwc2dt0hdv488y3a8j2gde1nnu0',
                remoteHost: 'ylkly2y4nk3ekcwdyh0rsoex6b8sxfvcuxg08sdd9ho0p5tjub503gfp19m8ke2xsj5xiuginfd2v75b35s5v8s0umg8hlonlpet61o419ngw3w0a3qdq3fn5ky75h38zvzx0giqvry80o1jswwnw5thk0ezd04z',
                remotePort: 8315881484,
                directory: '8ym11tx1yawgqekjmz3s6vc4faa58h5igwmksia5mflj5u1rctz74x16r2xi6upjnvpxhk4ippiukivvohx6d7lmf32m071o5qsoq7uc6mt69q3ibafafgzubczuiw9t3xb23d2zv212mxbhli6fhawt1okrbzrxshcfk77764213hpc8ebtd90bicf73w48agj16lbs5oh70izozyedoxdxun6tx3xjvuwfrysvwwtzwmbqei0fqjdt1zhcra1tvmd3suere7n8voe7urp9mqaqxqvcg6floum0h6znvl9d4gfydcvlesinmq7vzqvj5a0yshpglg8nwi1yjz0yq5djqgklmfy2tkdg10pq3dvrwdj3xobeld2rip4sp72pqk5fgr1vvfuhr8pjomo4drh8e3onsiwp3nmc05u7plpcwjglozgyjiyzjxhyul6frre9ych88lc078q0hjmoe3dl69lef6lga8b1e0jefzny3biqi2td765jsk3ir3c748xeamziapfc6z3hgn69ycr7grgtf4jy25ncv16u39qqehavcdd580109frecm9usidilpfsw12wwai9vrtzkvfew6jx6uh2pz2tc9aqtsn1qtktzkxuout0rxapebeehjhb354sq80gp5g5vnrr785jzfqxevo9u0v6l1bq40sk3h4iy6hu2o1642qpd184jhzdi5wry1rjqoivdqbjabq68xz1izi4tvtc04rbyxgvqtgn0rpzik2ka9paeuoo68xs0wupo76g71dni0e7x4iijpedd7astyxmnwv18ukdnfg9hx1llh17b98jvqu3ob3pr5fvrudzsspnl0cd464q321jbzx6skz6y7vofwv53v7260py6g7cv00asdmtnsadwskcgtbpd1t2idpzw9m1r7rliws5dqvcfvp1chss7aqi8an3rrmsr2v7u5eq9mmzcujfghm9d0allzrq6t86aqtv3ewzc9df8vvhua87ztn6lavynrb9bwt3bm9f',
                fileSchema: 'drmn8lm93hpznqxsbygefwusd31jnzb8epgdgpwr2q6logtgpbcyg5vnp97r3g8tv11elpnw9ehm5niac3od4nfg3jhva3wjn9czultog6ngtol9mdnsd507kqk39ycayanh90x7gmxzijw4wk09xevynoev4cbhc3u195oqswna8knj6jrh3lee8uremnixotdw9be2htmf2z6lloanz8pjlp18f3kf6z59h9kjaw0fddumqa19ryoz9ll47ctbwxfeoyt70lja0spsxawvhgxkz38zw6prl5cl2hw9gwq49dyjz5pxnv0w4kzso4olt2e3rbasr7b255c61nd05la1ddjgxkliylma1nio8d80vzzn1kgzaket7u5nbvtazlnjxhwmvrx556ya6i42ougc8bwuaqawuu1hzxgjno91xj7ndbpy2vlmont6wqpsntrwxp5wtedof86r6i0jpza0noc76cy19xq9whr7g42tonms5mi5vfab69brarruhc21khg9ozwvb4ywgubsg4rt7iaqrk6r8me9i5ze97ng2947rq3srxafagf6o9plqqixw6o7pyw4kvxvuno7xq6la80j4h0prjux0wrn2yfyd9f1pdej9g2brnvdda1itekzucfu117tbyo5gttdx1ain4zt1v2tifh2toxl1qlsndjdqpfrd320jiw0kebg8r8ghkvep5b79vy1jcdiytygxt64y09jma42rr6wyx9pkqkcvd3s89f4m95o1168dqoqw1kfszvbee4sjs7p1kc3mlbksgbd4k18dxkwj99s1usne6et9399itxdociezfrljvjkgkcl8ipqd5saz0a0iinrsdve8v8dwt8kk95gl2npfmmlxb2ko0dwd2j7l3f9fs7st0whbggy955c05ryhd2u8pgqyflt33d6s3nzmzhu0pctpml066rzvv5s57zc11dubp0u7cb5ier6sx35xdxw077da3tv1dckymt29dfrs663nnimffr6vf1w',
                proxyHost: 'pxmtav6iqpztcerhpr2f9lm3ikzjaiwsfnawjjkvdvmsn24warxj05l6vc7d',
                proxyPort: 6689165465,
                destination: 'rdxbmtl47xwqr6vsh378of4nnqchodtt7ryv38mgr49ekgy96fyr3794nhylgxagizjvnvtrso8xljmuhcdgzvis8ct0oebtlnlppz5aqa2aemdas7gegrj9hl666akjzkp688gh6ix7lm5hayezsu7dgl730mkf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4bh64fk07eaa4hyzp1k9j90ec7c48zq9zwox8o48mk9zuam7upq4n6e8tkjxsoh0ua4x5sko0h22teveb3uroh1mv1empl4efrrzgouqdgctkuacsysfjl96zbl0p8yggt2vdvly501v3qgj6fsisfvnj04fw6mv',
                responsibleUserAccountName: 'f0u614ws97ohepkefznn',
                lastChangeUserAccount: 'xh3d9pozrffep1cikjbs',
                lastChangedAt: '2020-07-30 21:10:38',
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/channels/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels/paginate')
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

    test(`/REST:GET bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '955cc985-6792-4010-81c5-90fa917f2498'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/5ac34c01-edec-4f2c-a027-ec6ee484c8f6')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/1586ced5-80eb-46ac-a3b0-142ed1d7f2ae')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae'));
    });

    test(`/REST:GET bplus-it-sappi/channels`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channels')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/channel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '27b982ea-905e-4c33-b88e-f81c8344be6b',
                hash: 'kftp36e5258uate0x9d9nzt4u5ucucbgjvnhzv5h',
                tenantId: '08cf0513-0439-4f57-90ce-095a3d7b2c3e',
                tenantCode: '53enmb56bqn2z5dummgfzgt5oidc4gaf361pbqepp2a9888a1n',
                systemId: 'e7aeaf9a-91cf-46cf-9897-00cc31ff0d59',
                systemName: '3buj8mbam4nuftaoo367',
                party: 'oy3p08w3ylg0ko66ugpghc9iucs15dovk6tkpi7sj1ojvmoercewo30l07voyb0z4mkhw0k1stdkf0t9oj9fo2edu92py5objfvhgdjxo7c1h5bmhpz23doh43ks5g8qkghi9c10fxlelvsrxt6p3nb7xk49nwvw',
                component: 'x3v2p05qt0mkwcdontzm1q3u11ythcn75uloq68b3egbaprty9p5bh5ugrtkbh0ttg22gwgpp9oh5nl44yu6u44iohqbf3u4lmyzm8zllbacw7utydxzu922xp4o98dhvwkd8p3yasrxinqitwek1to6dk2r1zhk',
                name: '1nryq93zbwjn6z03729jzw4u0leqldk5v9ofranmg5wff9xqxpw5u7cv3j3qcn62c9inku7397eoib0jaj014ozwbcmgw95me6zd1mjwcr55v0l5zd8iw8omsuzn91qgme2ie9pldm9byt047gkp4eqvxhesgkq6',
                flowId: 'bce20239-df3d-47dc-affe-0edc360fa4e6',
                flowParty: 'm9x10kbbuqzj86xyijcjq5ck27bfqd9zf5v4zczalybdqs4uxueu6bugk30baly3ztsl6w0ghn5x23dnr2j4grgxo9v1d3pkat4pr8k7rztl2m63mst8z0h7uxdcyi36ftw1tssq9t2yg5k965qakrwv2nlkjnl0',
                flowComponent: 'z1laqt07soy22o79jgcwytu5am61nfhtbqe8iz475xjjxznv0cnm31gyvjewft1qk7nh49to6ewesk21eoev6ocbb826g5xygm4q2ds9ob12ocuw2bdy027ztymuir8hnoap78dtxm11sii7cymk5tx07tfu9u4o',
                flowInterfaceName: 'z2jgzijcyqxa11zw1mpxcfsc25q5kaua9hdayyu23tbizq69gmjwq6x9r9gq8svovqhy3j8o3i5lvp1f8xugjo7fsbzn4ch145at3qfvwkocznjmwvh16l239c8fb5ugek0stdvhyh3j3iv3q83np7vmk8namvff',
                flowInterfaceNamespace: 'dwt14clhh8oww3xl85a94rgup8izehb3icw7o4uzw8c6kmu212xddtabqgen1cz0v0qb8zb81gfadkq7ida7ocj4qs50lyl9351x1zir2et5n4xnupcamza44dylxc3q9bwxgnuqqttr5bf4w3cv2o4x5p9olckv',
                version: 'nn7y2mqtgolqb0c5jq1i',
                adapterType: '957kzg3frvrr4w7mki8diesx8vz2sru2609huls3dps39ablu93ce7c670w7',
                direction: 'SENDER',
                transportProtocol: 'j7dj14j1v4boaqny6vq1fcu0qs08zcijnaccxkm52n027d8a46dzhkqbkqvh',
                messageProtocol: 'uxgmblnj1g3fperbtnr6e9tvtjyj4mckc3x5a43tgcgh8ux3tkevpgroydzh',
                adapterEngineName: 'hyu6t2fru1ofq4hl31iqgndvc3o3lfz1fn1wsgmxssxgys1hqt7zc42tovvalk830ayfyrxfk3sqcdt5uro8rwz3heok7byow5x52r2ybj6q4m40ek2ikadoabkm9q82cbrytm05nw1szjp89dvolyiokhclum8j',
                url: 'w7udf4iciulmiqb78w4fid694xwzjn84q971l7qez4mncj2ynlqfm6xb36aj3yqcaftytjapl8cn70u5ez987ajzxv7n1tmy8bw7vilmd6srto2q5l4x0nlr2f1vva91oglvzexkkiisxqe4yibbsp6pwi11vce08ru7prmkwaszmd9qf4lhc96pbqanl9ca1r95jldvdaxdcleym6aaz4y0glh5mxpcx8jgtkhwhtu3zxne37kvpyim2er3xc3p4vqu0apjzh1wiqxx7qcfgv0w2s2bv1zep07qjz0r5rez3ny373grm1v3ty3cruv7',
                username: '5h5q1v250zi8j75zn78g96fnwlyo5nl63qsr36ryg6t9f57jo0sfha6ty15o',
                remoteHost: 'j7bph0gcgmk75ee7iyfa554t11pnhp7qfgk7udj35fi8kamdzim1ciemzn3lkt9hg17onnct6pkezbos0th4hwd70f4gwfnmklje3kr0u6visia0ybiw5cscqjilflp9pikm1x2kaff74rr25lmepi805jvf5rak',
                remotePort: 7398082657,
                directory: 'pk860k2u50mmrhnht2idmmelq3c5zkdn6x4ez5085nag9w156lfrvuoyl5h7ir5zzc1kb04cgb90vpnagyvdf09v78vavugldan9g28as2kn1erotwnfibv073iqlypb739up1foewxx85sr96b8xj45faf7qnjwlph13dure037cnf4hyl165ifmfaf0mxnepz8cjd8del08fwgh4efj4yw2moisfssiqkxtwyky3fmiptrdg2gq578lnikwaqhh4f6vvt2pop51xxr2z6jscsid785h0obbraklfdef5b9e80nrh50ao5wy1i3ldlmk2076mt9hblhxbwmw3lnimis3mbjwdui0k8mee2nbo8eilf2bcwb732k8v9agphagolnqr1m5u6zbafa2mxgkvuu04e1v2n07nrd12lvk6kbtdlny2al39xde2wdtf74tcuqnyx0fz115h9s2uqkyeh45yc2u1ctm0b8cr1ogomjlwwui484estsz1nzlj3tx3pvr8ybenoo5m7l42oztv1ppkyhd4iixwm745e1zaeqj77gi4vp79yjal8it5sz24h5kqxv6urkk3q4fw0fgcrztw8yjm669xg9ejlbf7fudk49r4pc9ptse9u38icqei74agrp0k5lo2bxvlq6e4chyu5yj8dhxxqbl5lz58m4457fwg6xo1932qj82gthye9zg3nle8hblwbg9a0mxo4fbytqj9d50st3s6utspv2fnzfh5cairbcojh204l8is22pz9p6o40mokyxk4atu7mdpqrgwtfcayr24cnh6qhid1iywcmneymoubydxd2kmfft4mv4jk1mbzk26ek2eq799oj7hns2ew4hqwqm10wkpkwjayoip8naqkkb37osbjwof43grahwm4sew6lecadmebivhgdqlj4b9zpxvrfoij4z372jzrp7dwdlfv7gsaiqn22ypv1nfgilleeujm5drmm8knnrbxmkmk524luac0i66ifnyn45phj0qjv',
                fileSchema: 'xi3ooks5vamzknxwwf94pay710y2env2x9b6rcps9qm68fp0w0b7eswbejfu5w2ys3tvmq6vw4kc3fiejwo6dsjpmx6nywngwv2nsuv5ptv8sjnlfgozfwlrlgiewaksh1nqpc4844wse7t9wj47p8g39fow8ntk3nl7acxcyqb4datv22t28ejke2a52283t7msdeot0bs27ydrzsqtn6hxt4v3gr1pj7u919x8yi76vra7qd71z6s7u33hzc9skcqb9n4oouvxw550ehkpwdsiol2482y4yryj002ets2rdgf0kovwavrliu2kyiv4bhg06wsce1yl2elvbwjwdfghnxsjusigzhnfe79qd8hu98nlzmjpg0s7vkqw2hje6x1fvgty9tyxtar2evwbewd31099gy0jybc6fopq11wvjxo82so02m4lgejvi1u42y0vfysjrq843guu0r9z3axmn8f2ut01caqd578l3hdvnaumg09nloto7eqq4hpgejb6e8ugczaqqrpn0ryg9ajqfj4l5s9nlketoa3zm4yy4jhusmip9qbmgca0f4x94lq1kcb0abtftvnevhxhzqz78xziel643ve8v5vv0h51i9z889fonj5drm8jv46zkmnjc8toxh5530b8tzteulul1o1w8qjnqgqbtm2j74at4x8fc9usnatigpw0abdk1hxm5jtiem2mtocmyzancdrzrytgn2k8shjys6oe1od4u81jctlsm5ac7jbfexll8rnkmzzhpsigbephj4yitp695mvr205yv4fwud35gix2trzhigq9aa1zxwvtsl8xl4bzuixkg6r4tm8kip51z0gwwkj4kyz9ijaszivzm39uevatnnlm0s9sjz8xpqg57c1hq9o8e3vvffyqr86gn6ux79o085y59l1frng1l80xd8xnxd2xnx9dhvi907p7tu3uir9qspy3p7zfen0r9rczyqk9ylgf5t0pv8186znmgtj3r3k1tvvk1ekxj5wm',
                proxyHost: 'yq42ba04an743r2mvh3k44fcmhcjxdeidak8cm1lxdzgdgq3348ktblx81la',
                proxyPort: 4716487182,
                destination: '2sz91lo11bdw55ki4db52hfnuxxcbzxcu79n5atr93x0fkcukznpoq6stl442615wuflbt0yokaqf7zdit9khcehs0x9oxwnvu5m0gexqomiop3hz0egvj4lj1rqpzbuwbf9io8so88qupg38ga7wvt207aw8ejn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'u9k9792npgz45ti1ytpn9y4qxhcwi48qpf07lastzmh80v259fc8smdpgccqvpucyrx064voh8qf815px7zrp2eriz40jfay5uicipz0wzcn64kwps1a2tqsbrbz1wb9deb84j4lo5gxjta7olumo85rdi2mg91w',
                responsibleUserAccountName: 'znunam4ji0pxwn3wuehz',
                lastChangeUserAccount: 'fhft48xu858knf07y1wc',
                lastChangedAt: '2020-07-31 11:32:39',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                hash: 'bjyl5yav9abevstpbii2q35h2ahbwk80od84amqr',
                tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                tenantCode: 'sun3nnjsbnr25c22am2p7s35g4elekyd7ep4s8kurw6tlabnn4',
                systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                systemName: 'ebtx9lu2p07mplw3to3g',
                party: '2es7zoa56z27uxkqhkorhfyfrgxc6kq2vykel39pgftky1lfvf6d8egkgjpdwryac5556sk3mnrikhjbajutw9y409p68p96bqdihfas2iv994ssw45jfo4906axbvs2wxw62upwbrpigyde7y744pgbjdojvhu6',
                component: 'dm20xkf4ok5btcvmzi46nv6f9fv85d9awzk11lnfc4z6sc43j6rpys0e2179h70a06667yjojkpg0womyzqyj3jxu644fjcv2ej7tr1jtrrahlo0t8a7u2aie3umbjp3ckn7fvk4g2zk8k2n19oh1x21n7wy75mk',
                name: 'w8plaxmzvn0ixpwqljpwybptaa5708mcju7b1cg6fm6usuyzdypylqsbh6ulofdgd4iyd44tm97y1rz74ipr6yp3xgn9mu0jc12fas2kpx469t14zn2cbq9b5psat979akuqur1okbomr10cfs4owwpltk9ee576',
                flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                flowParty: '1xnqmkdsmjemjtyk8o89dghlev4yt0xyytahe3jibjedvd43mgjevag3tph9agahkqc1x3ty3cu26dmchmdx4j6c52vy0mjmj47ac60pfd1kqzop12kp88xjfw4o0jd2rgdigetuopserbuht5vljgemhz5bion5',
                flowComponent: 'q45l8wlt4g6ikoqhjobg4gg7yc4b2akl7ecoqr3dc7l05s18eo9mqbdvv7ksi4clz1m8v7kt23u5w1d7bgsxaaw9cj8m2kfeuwxtt45kcudpmtxnzo5sv6c8nzi6ts544k0e1bad4flhlcv1iuv8pvfhqjvse426',
                flowInterfaceName: 'o623g1qg7bmep255q0jog1imo9qf7ipvylvaz9p9qukd9d2uyx38ss96tt2dx6wpqm02am9wg4xjuu4ftt9adszp7mee02b1brtbmab6qfs253ns10km1qbeq8dcoomvlsyr3y9lx2zohzxfv4esc3xsix1scwvv',
                flowInterfaceNamespace: '21ta9frq221u21i6ry5bjtg74lavsw573ap5px27dwia0tiel1icvsh48vocqfva5cgoayudxkybh8nsrtv21fyocj72b1ajcg30gy5wkvo5wpck1mz7xdgx3cy65pff4qs7dfgf196zoqcpattpzgnxlmqv4r1x',
                version: '3mzpliri756yn2psk71q',
                adapterType: '3k1hf67ea6p6n5grvavgoifqtjh6ox6m70qtdyxq53xf5kz4g0zsq9baywa2',
                direction: 'SENDER',
                transportProtocol: 'jovdak5tu7j99mkeqvnhg8vhvkhhcfthnc4nodrmmng75yvh4jtii5c5q3hk',
                messageProtocol: 'nak1fjck555c6q0qdfn7jhnhp6bqrkulbyy4cmccfwvmhhz1rn58hzv2keji',
                adapterEngineName: 'x0r6o6o6lr5p6fmerohuqmml8rlq3x5qweu961h4b87b262ba7p1a7wi691rgbhabe5l4t6k7zz5ipwus4o1tf1ibvulihvq67h01d2jidl16u40613kervkrjnzrrwa8p3ayqc7gjd2waiumgl43q6t4chd0fav',
                url: 'l37qn6xj60ddlri71gw3iryga65zsht650dbicy3j1e3ys82g9l0wd93sgqzft6jvwsuz6g8pxw2ft66weofx2vl8g6gdpmevmk3rh0rvmzulbd6b20ixox0jyzxl5wgqo3sf2o3bkynvsd7xuojn62zhxaqzcfsosx8xmrd5x4cpsfprknwqavh0viiv1qvyzga7fx188qraflbe8n1ij22anw8pgepvivswswdms14svtrt4qz2bk9zgnc5fqm4ega0pnqdca9w4d1kb5492mwm5cpzpcd1t4ud80xt8z96crovj1lb5g5qnamecss',
                username: '884yw3vdl07ctg5iumg193r0432ed2eaje86cl0l3zu9etbqeu38k730phl0',
                remoteHost: 'pz7nyxi6g0rsmzusaklis3g8h9iuw0ecmyr2sa7a6xa6mg4qghops8uwpue6hze6h23ommuhp68an8afrwuatb0uk3h4fyfz8lo0rjiimqchaly7eidbw69liuwjbree35b9lyijlm3uz21mppbbh46ktuvwzptb',
                remotePort: 7072265256,
                directory: 'uxusutfuu2vc3q3fmuxbps44g24k1d9kyvnkkm1ol292me8akrmty2b6xvorzu76ukqy0bjim6kgay972ce6ezd7r6okcbttjcm2bmi2nf71hktjj1z5elxyuapeq6d73mb22mh7808od8mlvzyjspfw6iyjywv8om2fxwfl9nzlc5034e46tiy2q2xr0w21gl6bh9p4xei6p5tytkt0c0ga45p4dyn6cuvgewbpabcjluxypiq4kh8iq5ohhs4iphcsghaknrmw8rwkbzayjwjy4k2m7kiky6u58dsvzx9j31z3pbd4x1a10hjne5t64upjhdch3xmzwg28k156b8c5l3k4tbeyeyzswghgu110mbx1i6hwlnxib6ldv40wgwxeod0el6bsq50washf5sydyuqk68wxkogn6i2x0ukfpt28e3i7tdm5r8w3356fdyxfybmen34fhz6xqnez2io6fhiux6bo22umjrkpv8pbnd02d9id9eum9k6dqs7ei2zg29rve4tjx8g2a4lm68el9r4nwgc79bqbrtdui41hiqnkv8s6bqgv3pnrhqrzau41hcai49gu2rduy23zv9s589njwnf2abuxcmimwf32mbwsgxk1ovor5rz6hqjrfa8lmkc7yji7l98vh0kv0c0i01o6wubmbi29ycfpuw04nexkopu96fx7n5xi7vwliv4ju76dtqiwx37niiwpml2vk40l5lwbi6h9ievf0ynpuiiyctmxei50oaflut1xeis84b4v21frejmga7l8h3s8fjf2coa8ps77mpmfhkoixa86pt2m475d1p36qos2llws1krx2gpqi9ovde28gyfr4us0bni12h28fnluf4bj2s5en8wt1al7tmp7cm7k6gpuyeoyw0td8v3qkij55lnuhjox8rvfvsax25pydpybibxckvqd7wpc3404lzxv88b3jna9tz1ea9v2wme9f6cyr8o2n45xnf6f73p3p5ybemp9562u1xrmgjpm68rk',
                fileSchema: 'sljdal4t64txyyj0a0fo0g6s9uagqo2qhcv626ifwk2lrn1g5s8e1nczkcx1e93932zkgf8h76hah5wazg0vlw71n42lt7km0doqhdd50syegf7tlg0n8ipqyfrpvuajb7c9k5r3o765rpfx2etzpaqoyi73o08sxyc7vwibeztv5wejrgz3zjaly0btwwgrid1r418n8vk35379keqrlpjhuolt874a04l8qjel5rq08wniwc0y3du1sm0vtffn9bxgknmj0rbg27s531kwf8zmabossvufp176eliztcmarixbkgbpf9ytziscq291aqm0alq9hurf0gfpxnln85wf6779zenpt2h3sapznne0b9obaws77qqyu5qj964mapda4ek9c9jj4puikhuoyu0gp3xmz6ngogn5s3hymxm4mselhfzryrkavn6wj7wrtirmlbjtzaekd1mw9d9hcwz2wipgvgjj4qcw5ruqurpkkw8c1ig7595d9xjq2ez66d4nrkf4xjf19zgyq46ghonw9alsjiapfo1dp4oauf9c1p4i68yn4ppszgpfmwpcldgll3ytcfearf7niuhp2ofl7w1ec9boc7im2x93tjnjui24j6hi5q1djnnqzmo0914s68u7wxp6oosu8rgexl9ulw2pii2wtcmk4sh8sltiplogdyth312tlm68uu0wr77g3kkfhb2v9klmi5y290kjhejibbdfolrxsp1cm47z423vz48ao3o4l0aln967fwn5q6uqtk4vw0qbz9wz7d1ml5sipk1run9huydi2zdio3w4db6qz3l2wo4rpko8r1rhipy99z9zfisrxjw5qsgamq84ok7virlqfxj4zkqq1uablfdk5fpn9mq940o6vx6ht3em8pqqp1bafvitlt6e3puunle32j38761a6vpo0rr9fnybz6wol9opq925kty72dqphw95oftym6wgv4b119vx3zmdxner30ahzbr6dqd2gy5h1eucn1lobmkk',
                proxyHost: '63oo2kvk4kxsvlwm8na311hk55lemafdyskt0z6hotkjr5wgsfm6a3hv1he3',
                proxyPort: 3750116490,
                destination: '33dqq3ir7aoeyi730qkv1uriw62ayot7hsd76bipxc3airlwkh1exyeceksdj8ozm12qgmimgi2zvrqbo6ks4epx2v3uvzw6pkfmt90hixig5g7xp0e11r47fewussyxn1sk0ostjbvji8ilks2ox2auj09uebwp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q75vmid82n1y6uasj2dqpkdg0xiwg89la9ugvp7obzuoyv40xhtofujep3th1vtd7d3hsog8d0loo0mtzgrdy4rl41qwircdg3vus1us703ku5c8rywv8dcpdff9ycq64s2brn2rcdl3xt1vet6slthv67y8w6zm',
                responsibleUserAccountName: 'nbpmfwie259ilqbngjsg',
                lastChangeUserAccount: 'sfrtbljvko19u9ozkny3',
                lastChangedAt: '2020-07-31 05:42:39',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/7488304c-8228-4075-983c-25fb09023919')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/1586ced5-80eb-46ac-a3b0-142ed1d7f2ae')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateChannel - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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

    test(`/GraphQL bplusItSappiCreateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateChannelInput!)
                    {
                        bplusItSappiCreateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5fd48e00-6a69-4402-84ed-1ab7b9a4d91c',
                        hash: '1tm4k69a20hiwtgpu6u1gny8rgcvyg3h37y9e6w5',
                        tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                        tenantCode: '25snsyiz04n9xgct39kj5enrp4yzh11w4l51l2f05whnnqqh2s',
                        systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                        systemName: 'dcvtujb1vmjopv66qyth',
                        party: 'i6demkmzidbwcqmi0kqt9trhyds4qnguhotz2dnska1iy196fgmt9b2dn1yia7f6u7x6lpxxy3ytd1w85naftw0tof0f8hd6tdb5cfvvt93sf5p0tu3rtp3nwcbe27qftdparuqhp3sbbixaka25x5wjh7q098r0',
                        component: '9gm2kigfov5p9b4nmu534lllzrsmepq0138fkhs0yhfl8m34049mu9ysmekhk6stqwtj1v4p3t50f9j8zgm9o8lox904s6z2qdb6rpr40thv2kqf25jj4075w1x7r0lx25ic7eex1xg4o6hqk4zf7ek7888n95q3',
                        name: 'w298uooxvgnk7qzcehqys9nite7rgau07p8k8xt1px3ici1wwcptw210lhkc2x281dd05ee1qj42ycnvrfd3c7s51y7ndqxn189w1u7q8vpt0j2g3kqh02op0mfmhrbxi6fz7jzkhoznyeeblsyjjgm1jmckzm80',
                        flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                        flowParty: 'j6dbjfyhvklqo918w3pduap8pol64v51lhc2ofkcbbgdx874pev23lwpcgfnwwn29r3nr9eabnvqmpin6qftxf7geffq4mx4fflfb6074jsd3kus7x7xmmdn0sjrgpsnp9414o1x7kk862d2hsd2h54kpq0oh64z',
                        flowComponent: '8ae5xuy42m8dfzhq10qu9cky0e2kb6b73t27u6hb4vo0tsq3il1x0nwq5wd43mo0tv18z6bxn6h53akjmhj6u2p56dzcp45j18ti1jbzj370baa7p85xbcae5ylc9boktgl06s7tlfxa3cws2j19yggg4glh5yit',
                        flowInterfaceName: 'c864mz2f03jc4i64cqawvc9n8fmngqs1twv0hnb9w76gtbhx642sajwy3uk75ma1q35end4l1b46hiuyrwrj3ly35x23a7v58uza4jxgg4n9j79woh74h2ixwfy6lk6a01ap9cnp4ljbum7kqgr3pl88mqgzcgkk',
                        flowInterfaceNamespace: '6i6f0q90ks6mcai658ycqwgtbhuhkxb8ktiqvcnk6jg7kehs4eamuvrtom5i5kms32yendiktqwouq0ggb7q4yzhi3nb4ry8sz48m7818qbgjl8rn6rwk7h63fdfzlnas067h10mutz33rhxpzrzqk3isy2z1jb9',
                        version: 'as02ugzsjx1az2fhafo9',
                        adapterType: 'q5347bhr0kcn3vxypmyn8kmlbojetq63m2fcks3pqxexovzk5ox21bz3x406',
                        direction: 'RECEIVER',
                        transportProtocol: 'cogdf4y50b695svcs52cmej86aznwp0a6pqurvphezw1qlutx7e9fejx4wsg',
                        messageProtocol: 'vppuis8aujifj4sh7vnxilqbym7ggv08kl57rgl1qy4hcd6xjxi9l6k3khxy',
                        adapterEngineName: 'ylg0cbu8l1qy60a3xjsf0o92m30v1a1f0rltre0loyngbplfnl3fw2hocdjisodpvqnjid45po670yzbobkgkgb9kiiu2ixprqtldmjeg514m3sq9a3padhszg15t9048ega4uuryj7n08smw6pbnw6yessdvtdl',
                        url: 'zjtv8wfvuwccndrp2q1hxhvpr8hp055qjazgyosji0tjz9hjqblpuug3nuk0600rkt7reau0z0u15b65kp4qwgx2rx0i50drnqpw9bi9r151zpq6hx7y7w870r690tva1kux6uedb2yvr7w3wjtny5wtrcop85uzjzc58iy3dm1ixs8vc3fnrxtecsh7je9rnt91g7g55noec9x5k6z76bhsk68go7y5bmm25ycdb7ysw91wnl94i6iaxxurwq32qzv8fmqdtnj1z8xq5q5es1ugt6lmkihsem929clqmmu2h3l1d8fnadv56cdzegei',
                        username: 'n9hf0m2patynahmobpx7485yaueb9t2q6q89al2afpgcppj4s5qxgx4wkg57',
                        remoteHost: 'jjld242mflczyu9xesm09pgdb6exftgxcqe5y0ruz2eup16q4obnjs7i9zqjnvf2imm52gw1qwji2xem9ryxehsrsk8ypohls4pwu2hh7k9nb4sank1om2wjz0n6vacans4lmsz2rhmdiy01ssl2n0boh481dltu',
                        remotePort: 4447512800,
                        directory: 'uy6842yolw8txp48vkdb52g4jvfkanvhssq70x27c44x6r9qy4qfo2bsbha1qpb7qzylokpydsf4ldbbjcy2g2mgh5msblwz3t2vptxpuuv99885gjflmaxehis4ls6lhuz9u178ozy13ffxv4utcbxsfs87vtudpg7fib4or6s1lshg6y4b8qjm0w234tnzd9p1g6m9u8n0j5j6yjtaicx4e9581d9km9f6jo9zr7bui927obeq0rrzwc99yytem1mo2dynmcktjjyvglcl0l29w33mfxy07vji9e8ic1kdjgv4trffry8cu5wiazzyd5obkuqiynjz3948e2ttzvknc54ozhw4p4zfx22fb49m8gr355ia6w5dp098onjq5clbgwjjgazshxhffxv1ejjfg2m02nsb9w58t0mue43j909berrefw2aulo544oyzihc4i4nc40dvggeb6q7i2dkgeratrhoocr1aodd9f9exan4wtak4p1z5sz124dzphwq02hrusllff4weej1acpny1edl67ylmgv1ocd495llx1vhztel60sqwdqmjpt8v1y08yk6dbt7lgz8rqma5w2s7pg4p8d5t6st7aou97xn9lox912almue9g5tz6hr8c9t07iqhrp3bj2li2n1m1u71u5xfrpl2r4x0m8kztc3gmd1jn45tx5gk16n7mkl03s8hrr7utk7jv22v45f7can9iyayfkjfjveahnbq8njv2yz20lbxzw8j36o4zvoh9jhyktidg1xpxqlfmmfzuq8lca9h0j2qs0co8f4g2lahg4bxdpeqjc4hdnuo720s22moqadzsygy969ljg5dg4vur1rf8khqonvihds1r7uws24tv3y8lloj2rge592im6pg7kwsecei39s6fjpydsb0fp0qom3v0lsk1rap1qmxp9apt07fnlai5pvxe24nosuhmus553bm0ohr7pc8twxu5ep1dj8gaqkeoa86qqv13h4w6yef2vxn10ti6i',
                        fileSchema: 'uuzj8rdejg8dth5swhpxevk2v8hsxl0us3a4k8iigqf7142ag3440pdisqljdy9c053m3fc85y2tsslv8svkfkpzkqgthai5r6xg34hcw01wscz121hkg3cnhlhg2bn4dab15wvd3m8cjz3smcfxrz1v8rug5s7p7ftieljoqk83ihy51qjn4qr0nxdv3bqld8pkmfnj6bzfgmyzw41siecs6ce0n7kbhfmudh0bftx8cblbrtidgdggpvf4f0m5liystlizahp5nwczlul7m5sic7pbzo8falqkhy1xqrur16z3op5vco01k9fe6w5ql9eop7g0gel5s26zd1p0xg44pcgxrto1c08pvewy990eojafrp7ajxbr798uwb4hthp22434r92d10quqexmq1jetha9u5gf19jurdzgj5w3ytp0s255rzte2eo7o085pq9r2imwv3onvj2jmso9qxkz240n451ux4ms61p1gs26vdswhpofj7dg22uhx2co109b7aobnthdzy779oqt10rsztvej2kxg6dc8sleid74dpyntbw5vk3bbcigngkya9fixddnu2pqxrajq637hcry4r6in7jsqxbqypcggqqgfnsmiq3j4g9p24221isfd3owsvtbwdcukua6fli5r2o60qzl7v2zjmcy905po7ztzdurugwiib3e5x8h4ug7qi8ufcyzo4djckyu85isy67qd9gj1cdpb40z3bs30nr601hnzmev7hweyhn5jhi0m9reayzhekzkwm86pr15xzdvck0rmn3nadvllchnhm7k15ufgyq0dznxvdxmycs1t9u5hwtz2g477h4d9mt64m9xd4wekkarw1rhltm5ng9ntwo7j4h82xpmz1rwctehiqp8pnq96wim4nkpzfed5kprqbu7scjefg1ud8y8cqje54mgrl9n14ogptnxjdf5ugjmyv49ytl8vwfsmmgep1ai5kpap8xdk0upnlvz6bgj0z1wrz2q2q22qm74a4h1',
                        proxyHost: 'cmfmn7le6wqghop5pk76e545kfoxkx88yxecruedchyae6ii2js6ouasjxgi',
                        proxyPort: 8008306164,
                        destination: 'x6soicl4xf4kqbbd7fzi269qjjk3o4kyrj2qxdrxfnks3u2a5ve0okymr8gcoghvvaxd6tzdnvfcs6q5bb6dezvj9hctsqgf8tz29vp3ghx5d11casdhjclpfllikt9ovmk0611a5k75r3ovi6lan47dwdsiq94u',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'ghis34jne9zwcugkqomy3pm5u80jmmbzebxu276q3873ukwb8fvardbjl4kf13hpc34p874m5id8xs8s4svvsz6pdbad620wpda0rqi24plitd177haf39odrjr2j7gn5jyucsfgquosnqstnl38b13bilq7kvqe',
                        responsibleUserAccountName: '4we3hljsb6cdhp5pnnnz',
                        lastChangeUserAccount: 'amvwkl01spzozkr64tdb',
                        lastChangedAt: '2020-07-31 02:36:48',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '5fd48e00-6a69-4402-84ed-1ab7b9a4d91c');
            });
    });

    test(`/GraphQL bplusItSappiPaginateChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateChannels.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateChannels.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL bplusItSappiFindChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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
                            value   : 'e149a9fd-d7fd-408b-a11c-1d90cacac7b5'
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

    test(`/GraphQL bplusItSappiFindChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindChannel (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
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
                            value   : '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('1586ced5-80eb-46ac-a3b0-142ed1d7f2ae');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5f40ff9a-d135-4b52-a032-49774627bc66'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('1586ced5-80eb-46ac-a3b0-142ed1d7f2ae');
            });
    });

    test(`/GraphQL bplusItSappiGetChannels`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetChannels (query:$query)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetChannels.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL bplusItSappiUpdateChannel - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '87eb7b08-8e04-415e-9a62-4c156e1970ac',
                        hash: 'k6qe605lm16g1s3ah2rjh5v2eueqkzkhrz5bt68i',
                        tenantId: '53dac6de-fc7e-42bc-83f1-c4bcb50ceb10',
                        tenantCode: 'hc1z47k8tvs3j92yoo5n1ao6e9ljdr5yz1jzy29vactqfhsmvu',
                        systemId: 'f2c985b0-b561-4916-972d-dfd97f17ec7f',
                        systemName: 'i9vevx99j7rt977uw9ch',
                        party: 'hawzgoh5r74dv0a1z8pru02jsmbvgggod9xyah1xms6iipat55c9flq2ol9wfd0fnrkm86cvlqkgpj80uadq44496nh4aq2yg3lxx7tbkwgiqbt6md40ui70ufator13ozsq2nfdeixsyoaw4mq9hujuuuhmfazm',
                        component: '77dt4rtq0ns9bj443eei91npzosoa1ot1iz8uojxtqwz1lc6ubitgxkw16cdo520tivv3nasogxj7awqxa8z0j31mdln347iyfv7h02at2mtxmohgq5dphjra4ii8cnvp9njsye807yy18oezrjuiqoz0qexhala',
                        name: 'yhresqbhrv80htql3az48kb33cbzezrcednbw6dr9d8np2u3ckt1ydlirlc2uyvkir7gyr3ftl6lstdgdtq9dsn0j9tat73t1ukfwsr6vchhzl1zczoci7o2tihqv9fnuz4fv1lhrdt7anmb7vw2ep3hi2jjh1x5',
                        flowId: '09ab18f6-8e2c-452d-8698-84f602656c5f',
                        flowParty: 'ukm6yo3v68nrl4cx3qkt1x998eu6se3odqb5fxrzbu736pc4q0xse6itghebw5hi5jee1hcan35j9l3zvuh8oen0k2hanh7xsso89w4x5xv6tvz6ezslbir7vjhivuvi8hor0bsm2wsmz9ankcl2tri416sg1oyj',
                        flowComponent: 'jypkxu7mm872arimh3bvlr023gxp16at5mkg6y645u4g8sq565an46q8ae1sov2vatjz1vuzcyl6ucqqbjysjuqj8qdh6h9hj038ff0wa1jk1iln6lwdz3c7gb0tx02sjil91xhec51wh6ji1427qd5uoj0jevoh',
                        flowInterfaceName: '6eqo43dgbtqti6h1v1v4rmcorpmy809e40af5lbstd40cvtpjkvacfeqdt1orfp3secaskgot0jt915ph7hl0fy7vcyrba175u5ad87ssec12eymegjjopcw7fbrwrd4c38uon6jmaxkynck5a0dqedwtfx1mvy9',
                        flowInterfaceNamespace: 'pr0v87rhoiax7axkf2b1tr19969m9xkcocgbvxgx4xp1avgmupupfayynmbhm0f06usqghzkp8cb6ft695gpi6xfhu4wj9ulsf8cfkmsjzf053yytkts3a62z7sbp2jkdaw941i630asgoargj2lftty04p2ix38',
                        version: 'qdrap4h4m25pcpsq1wvo',
                        adapterType: 'kzkjp4aa5ehaqovo8c2nlhjjskh4gi4n1l32nool9pkrrglada8mkrz1fgr0',
                        direction: 'SENDER',
                        transportProtocol: 'ysdf5uxug3ksbn8x0f4t6rzhbzzri7ho3p1l5021edet2hq053fbbocrpuhs',
                        messageProtocol: 'pe5ann7ubdeo4ntt05dng4z6r1ggx0afhmwg3530hr750o2p7rnw9vbi4siy',
                        adapterEngineName: 't9ku5c975pz34uzirc34kis7e9c06u1tbqkle9xly2a1u1oe2m4092nyla1g1m73c42exfhm1ytutaqcidtb4ri75na89pbcgcvf4pujmnzkujhi7k1knio1p8szt21zoueluc5a6dlei0uoree4sqmvfccxhwlk',
                        url: '5010nb2en4tzsgdb98w8wtvpzeheltlpa3c6g037r1s6pt4duhz0918ynhvytrxgrbc7kfw4k9ytg9k1xdaw4zrd73867cuxq4ycz61wsbhya5c33sc98elfaezlcxtj2zrydut6e0nrds1fjogfkhhseqe6nesviez2rmdkkal82z96hqpxn8xdyasqsz89pqasckxw72d89d91pahteny0auf9qyftkb0fgoeyuay4lz8aqyq8vq8liponl6q7bmv57nyln9sxs4xj6yk4a6fwnvde9hu0dpv8bxpt3w8neo382v23m04qeo03qmab',
                        username: '1dh7lc9cz7nhsvki3qw1y4ehiwhj9a3lrrgmoztq1vc6f8dtv0w46up6w9hf',
                        remoteHost: 'ag3y3az43uor8ctpo1urqstj40tj7iq04dcj9nkl9nsdpdkyg98sp9qbsr8dyr94kf4e96em0tiuwsjtjsxatp0lnz89mc22xans6k964sy5p290h7gjueca4eg85nhdmqs5hsr1ws0qm8mjq58b0ywizrpo9jv4',
                        remotePort: 3399552734,
                        directory: '8ajk96jrltx4evt7umth4hf2bvd11p4qqrwpvluheaht76ale0b2zyfurks2h8wzrrg6svq6ioyiravju5bdklcojhq7cju0b8x9tpudy9gsd1f2tru18mg52pao5x1cfmn8ozfgnvt7o4ae9tn2dngu2ke9ihhijcmbcct27gmk1sekoi6a2aflrprkyu1i5xz2eqba7kpsz3bggtbnt5hz84mvw8asue9adx9zu0xiv3a293gv6c62kf573g910q0ridkr5ldiq0nmp0av8z06c8df2uie8e8bv57vjz00y8wnoo98rzs403e4bcwazzcxrd53ddzdetdroy85ueit7eqn4ok9seaw5saqnc54vc6rzsik2b95jjhcv1bhkybtintdute7pdloon4tobjkay8wjyrcoxk4ii4eojxey78mvzhhqhkemhji169e4yeyjitf3vcznnc1zbons0xfvlmofo205li4o0nrpjch9g6qt8u27hb7zgtwc4u3ohiqan43mlrzkgrh208oj0bgs0qubqsp508ay19h84rvo9eyt5h3rhudcdtsinrrhpzd502ijtbr8q9ca8hj7pj29r6vfel0ruwp5zw0ygf9xasa7e6b1230emmmepey8vprn87dvopi622foyc63v0rhsh0fbym28jn8fmms60lr32qneny5pbmdkoeq5cs7tckelbcv7yoyrp68nuskiosd6rbice5g3rbshz9jmt8kginfmop3lo15ms1m8sod7snmnbviwyla39gwfkswwf401fhrmxuvvvitsmgfo5ujc9xg19edncq56dz34evmr7zlfbg8hrewfdjwd1qjrwoejz3bt2byiglc8646r2y7t6l7rctfnd9gjs2er8g705dx6rycweb3jkyodl7qtq6r8p6pcww2ztgtuseyypvxwgbn44g723wf6o1d1ukh3ng7kkefo3u6fvjjfn583o3imnfvbzkjlx80xemwbfjdudqe4woeyrfywkfak1a',
                        fileSchema: '8lal2fcs12eygtvgmfgb0wjbrdd19qgl7dy8twrmdc7bpkrlz70igwptu10axvujj2pbpf9cedt1kfvo57zd42kxiix6517kugt882eyjngetva30eylbgw1i1gzfgy9q7dy7c8upyoqf6kn435x5bv9s3i7pqi7ehaj5s604wk2nshp3fcn4022ydp8ycovgkts9l3idkowfxdvwm5j5vfamvcr313mccbmxnvwuxb1aue9jtp8oy7fc3h7yb8j53cx8s29ctjjp5rb09si51gio4w4o2idlccisxjrvom0oets81f4fit10p5jqh14swrprp8mlm173npxk5ow9zioa92jpl3yebqn7ejns18cvib2444lktj10ge199k4kodmcu8vvuysh8gsos3x9lgy5dwv3xmf759pn5791uld07nk1bvlatl3j2uh94spoc69y6x7p3nf2tyb5hfnntije9q07kf0yoja4cllsxsxfhmxr1zy8qmmr7e9g1uigpqriahhlb9yh5dcxzjr0zftbau355ycmttcmfbxck13071o7pxouxgl8ckvr44gvvkyuroplb61aft3vbkvvdyte6sx781xylmrjjlep1ylhm89ghzywvf10fxefbxjm7ch0p0g8f9pa2w4qv9yt570k0hcayvmsns1poc634mgfjqx8bybreqildx4dje4ij3lixf0b4724zixiasavsnhmdbsabrz5zvn0iw6av5ockypznveicsahv86pupzl841dpga2l1e7ku14yz9vpx2xcmvjjfq3uf8elfxdd6a4bh5lxs2lnxhjtattjwkvlvbi7ejh7y5232tv4iz81ohufuxc26tybv82ly36pj6nhedbzk50ya17cuw11nwd8l5i6hkv76rcm1zwlcgxykpfvzqg5t4f33oab1m98cm1fl6p36qc5tamqiluu6xtqvzl7pl42pbcymewowd22qud2xmq4e1thez2x7bmj67bztqjo7cjq2j4jnxa6y7',
                        proxyHost: 'cr0fn7ie2lt8yjykrg5m6oeyad4unl7kta5uqt4jlc068lcyhop98bt7sn1t',
                        proxyPort: 2745590368,
                        destination: 'lxx7ygd1q69p93fy1u7pprm6s4so1d0jq044oj3t2eiy678t8o6h3kci7t0a7ui1p46lgsdbzeyui2b2p1bp8acs9dyku0hpw4fg3d9gsp3hwpzdg74ulmyvbfzllo2avt24iltiizkue31ku04nxjhlwl0wg1p4',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'akgcyv7zr5fpzttmaqogtjqr1113xcy1i8xoqdjx4i2h8lb99s4mb9olraxn2ewxdceg8zsu600uhsxbu2mbkwjg5mi2j91ozc87aovl4lyckigjwyqjb3falha7aptv0az37fwgylcdj22evlr3mnujhx4yki9l',
                        responsibleUserAccountName: 'i3k486i5st2u8cf2fsvf',
                        lastChangeUserAccount: 't283j2o0st8ete1bsn98',
                        lastChangedAt: '2020-07-30 21:50:48',
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

    test(`/GraphQL bplusItSappiUpdateChannel`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateChannelInput!)
                    {
                        bplusItSappiUpdateChannel (payload:$payload)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae',
                        hash: 'jp7lb5vkh7jfct309uq3lq5eupi9u077bhqehy9z',
                        tenantId: 'd6f6b978-8b5a-47e4-94f4-73d42bdfa37b',
                        tenantCode: 'peeh4uukllotebum1j6exd9oxyi78e9xm98046iyvq0dgrd21z',
                        systemId: 'a8fd7bfc-d4f5-433a-b42a-be2f88cab25c',
                        systemName: 'xwxl26lemk56hu9fdb9n',
                        party: 'l0tpe32q4d3rp76qlabx80bnzrcp6kf5yw414n2133pexjinnhl452mze18my48t08ks2hzg2kcmb34ffnj8v6drd6z9nqpmrdb0re9e1jbx2ki9lcn02um8lo482esx92e19tjpm6lf8tmbh8wuvilmacwjv2o6',
                        component: '92aivtrf0e60op07e7pliosmoks5m8gwz6augkp0lxj5k9a87brykcpepfvt6mme9lywugw4u4s2scwaagb2675j8j77m05y1di9fzvig3a2fkthpo7zfqbc7eldw7pt4ccy8aqyyux4wybdn93xc79dwri9xe0n',
                        name: '686ryyrgl0qpw8o9nnmhw97w2aag2d6g1q4rcvbxk9tyv18l0uc38xcbdp5p93hjmdslhr4zw3yuo80fjfbfo08it270epmtg9ajl2nah8kpa6h10hvqqnwjft1twtlunc83ktx1gnvxsyngzqyzxubwgfmrhqnp',
                        flowId: 'e942c835-0278-46bf-ae64-6a56cd0de3c0',
                        flowParty: 'd1zjqqcb0bhbguj1z7oe8g2t9ezuooyfx0mdhk4mlvg6r25mqs5yr34tdv2zljjqtdx1wxnpx8aep8owbyzj8bixsqks6saxooht4xjqgcgg8h6s9ha1wqxvtrxb65wtrmakby00wx4bxv86gr0jxmvskrtw6s62',
                        flowComponent: 'laro8kwlzg0p3h53asfzuf1o3nj43gcemhmp8czmtjyrxaeecrtqlte43u1r71xagvm9er82w7k6dz4nj5l9qnydt6mstwbq2wbjofjejmxwrw5h8ipm36wt1gj6genamjbfkyokunhaq3sotbd05fstr01x5lyw',
                        flowInterfaceName: '2l1rhjr62dovj3xch4q43053wjbkgwoq17p8d1q2pa3x4le790a7bpi9krqwhlfjzq6oc7s0diuala6ek4tkpicy75fvf53g0f90yex25i1pachcrycsv3l8q7v5op7a6qsctn0huqhqx2or8z2qct98i6a02g9l',
                        flowInterfaceNamespace: '1kydb40wrc8wpwnin96qvc7809ni2avngx5ovu5mdfjmggenk4brckdm1eql6m8j5gmctwjphqosj663go7b7tgqlzkbgx0106tznjjbcq1ppquerctm7gxhfxmnh34ucyol8gxrvjhp6fj3jv7te6hw61qzwsuv',
                        version: 'tuq2ocy8hxx1isji00pw',
                        adapterType: '94yeq4p4vofuzskvvhgh4235lsn4q7ev99mw6oe0l91wy0eytjitl9vda6e5',
                        direction: 'SENDER',
                        transportProtocol: 'm4yjdg2yg1c3jfg7lu671al0raeuq3ddyuwfvs6xvg1nlqvkw7u17c9x0kvb',
                        messageProtocol: '7omustwqsw7nffk1zhqj4e6k7ny86mgp3qwrgrxfnawi4vvc10xjgxh3d7e9',
                        adapterEngineName: 'xc2uuos89j7taigzomr9ybfxgt6zd7ezgfgm97bedkoasswbtgfwf86gz0a7a8nj88k1jclbval5jjk25a40aascfec95yzux18dxb3knfok2ouutbzbqevqp3vol3rzboeo4w82kx36evy08hhkgv0d3crkdl7l',
                        url: 'b72imnh1r410gijb54guk96e6unq1laug33rbk70ocq069ahhrw0foedp10yqhkb1nh5xee4hpveraqfzvxgm8wlxfa77nmoi9kjmjqr1wwu9c8sbpyhmw6xayxnbj90brwv4jq8136zflwxtwcda40eoqmt517edvcdqeyrvbfnxny3jadahzdqv9kwumihfz3og3iz5sz9xv9x9c6fqe3dzq73pexzry65cekubkd8tol3epydfnzpnkmcy0igagp4025kzt1mbf4f75p9s31hb5o6q4uv6zispn1d8m6dl43ytda1vood4wku5ad5',
                        username: 'uynuxec2747qn833v43fwlugqxvwp1vdr98gs9mnecx01oibxwc63pvzncpx',
                        remoteHost: 'm0wtnnqoje9azbizkhvumlscfjdgqghj6o78vt0x45bii2c2yk0330pu5uducyabywcevl3zg6exknwm0hatxe7e6ihbsi55fbks76fqs57g189tbtjqm838r0jtofdtgrafosndwmf2dl4hgojqjkrqj4iuraw3',
                        remotePort: 8033756825,
                        directory: 'vme043287lr1ypdd05798fdxdb23vk3xztw3c02oow1zue1uy7zx77umxa2b08oazjojquzu6vekvgayaj1inki0g1dh2grtq74eqzlk00bbb71gor75t4zw4oid9jh362jpbgkkvlafsjha1hfrpdml6yxropcszwzb9age2qeonsr3ps6uhtiw0v7vtnxb959s4uhjqinvvqtjh7f5h70py7nhdwjch2la0rindz3t64jotbrdicaenplji1z2hkdoeyjeasl5lv5evhca2t0tsgo6kq4dvwztem3thlvf1by7p10nuqss8d94bo0cyx6vbqz0z1ricurqzlvrtgpod3gtm7ae2d6av5y9vdofyadw7718ev90ylpv46xy450utfk7x68n0lddvmna0pt3zcm2ey2tmw01r9iuh364af95uhk6l6dmfcqb4hocjg9088nu5b8is1cs6w7218xm6ztjoxuytewcuyit985xkbmn43r4ndlt81jggjb8ubd87kme4ghnprur6vps2skr7fhqzsggnfozjc816p8bah9ruhmvgdxew2b79gn2ka2do3u51e66tgvos3ewhj874bq580b6qjy9fvh9vcf7qcsxb73pc71j2hiliovgkkhw0btma9gsgc1bvvvjqpn5q78iwt89oemq4312oqub9wqbwzmtboa26i9p540o1ejbmutgheii7rqjin9ot0160f1epnpan43hzwu37u4ujh08swzwhz2wo9n6lq5rlb87m8bekognrrzxni1xa5rzebt51zo30opttxqm9lfew9ktqq83i5z8x7tughnq8svlq140g6kdr05wqk496xqs3ubigqrskb0jkfm953i084zbfcp2h0vuspz5i2kbwceckm6iuk8nw4j2m90cquvxy8ns5s54t3tu6ecnja4xbunmz1kw3kybriidy4p8eds2bsdr7587ls19q0x4k2fnitroxf7hrfauwwazi9pq7tnl0eqfuvytdgxdnpgn',
                        fileSchema: 'mtb79ee0o25r8hlbquufx2kgz6l4wpbaqsevk4t6to9b030zj9s1lsxds60eolnzgcbevo716nxu6w78xzwylxzsim4g3c381qmip13653rc7qmhqtdievpt7lazaeo334vtq3fo313edx8lqbnh60a6ivem0nxtfsnlybbrfuug4v5bke7e393ixectfh2yg2fnmyj3sri99y0ggxoygx5bawos2w9r38fdae2wpdmdbwg6drdf4lqe2kiscriki6ss1lel2qwkrps5llibrqmuedylzr41kx9xtz17uovpd275b69aley2y6qa62xtymz1087dphln85czscjiiwk4nqmli86sshja1uwqgwc9ts1lldva90akg7fh454bubmlx21923vyr3h2fi5bpvhbgccz5hx7d540p9ntgq9fek5aakwuxlzq70f4eeprz5a2s1ja0f33es98ptdcez6coueutyf4owv0kbzuybndq1fhghmdmgzuscwtfy24ujv4bi83x6eobuksqiy10k1vhso5q448y04tozauffxzispjc2xs5iiyvw7g7eadev536tfs7qrsgungum9ypu9zvpdrhup7g7zdgv3mmljlyxpt1le447ygt0bqit6qpedbzhnmblcr8rx4933iduemfqzarnnx4gxn3qgtwzo7c8bd7t89omhu57xkgv4om47rgvdq1rc4myc4bzy5jpjdfggqe068ruyjm46je037q9dj09dh7ln3qsc943xa027wpotptgjmddgye1w5upajgsveu4sl7lyooxym9pycw03idpkift8yw8f1txasav7fr1qctljex5tzb16gtur9icjnewi66org76ab9yjl9jlu54ldo56127lcxhj4qxbymh3rvfymu33mwxrf6qccpqbt955g3ut58ey89a928d5nvymbprbqg5tf06ln8cmg75mbn63vtp6bgqo6cu33vy8rpk789p4d2biczktforg74py08q1h9zgjj8xp',
                        proxyHost: 't6gliq6mvbnjylkqekcya4q4k5o3zlk72r7z2uk5kdu0i5gorx9npjfa2tmb',
                        proxyPort: 1438202936,
                        destination: 'je9vodfkxwmyyy14r9fnm74nh30b9m52yirte78ild167woqo1e18m8jtpwghqjq463xjaczxbh51596id0cqxs7mipxqbpxmt08oo9nzdl1de9q9tyjmt5i3pcy8rxri98cxcewu0qyd5ifpb641n0qhpwsw4vv',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '1d95g9uxxo9p3g416jyuxnfu9odeh9khpgg8skovplorqxq7mthjpp5z9312w1hsm5iuf0h2eiw8xd4o3ly61uti03s2n9t41lxxccwgjzwm0v85ptiooj59son0vrofi7jjnumziui7hnt9efs4da65ug3ys1fz',
                        responsibleUserAccountName: 't5scsjp304b4hlm4z40t',
                        lastChangeUserAccount: '5da8q0t99sojatiy39st',
                        lastChangedAt: '2020-07-31 05:27:19',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('1586ced5-80eb-46ac-a3b0-142ed1d7f2ae');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'b8778c6e-2378-4afa-b2e1-79498b371fb2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteChannelById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteChannelById (id:$id)
                        {   
                            id
                            hash
                            tenantId
                            tenantCode
                            systemId
                            systemName
                            party
                            component
                            name
                            flowId
                            flowParty
                            flowComponent
                            flowInterfaceName
                            flowInterfaceNamespace
                            version
                            adapterType
                            direction
                            transportProtocol
                            messageProtocol
                            adapterEngineName
                            url
                            username
                            remoteHost
                            remotePort
                            directory
                            fileSchema
                            proxyHost
                            proxyPort
                            destination
                            adapterStatus
                            softwareComponentName
                            responsibleUserAccountName
                            lastChangeUserAccount
                            lastChangedAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1586ced5-80eb-46ac-a3b0-142ed1d7f2ae'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('1586ced5-80eb-46ac-a3b0-142ed1d7f2ae');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});