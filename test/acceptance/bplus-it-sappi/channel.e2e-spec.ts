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
                hash: 'y7d6u5xxoxql5kn4t4dmh3zte16tekz4bumplw6h',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '0o79ep8hag2vnxvvvysjrr5kj3phslnixw9hwn6cvc6z7c1p1c',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'p1ac9n28g7maa6cez1hz',
                party: 'k2h70motecaa0067o6tahzjscu7iqar3zms6h42ad6m3cb172801vnzaoqmlsmqdi1a59xjrkasndszk8zwr1q04ua1rbep9w0ej8v6q3u12zaqqn1i7avtqbip7c41lsc4nntyjof94yilt97uecuwz2xbfp7gr',
                component: 'brot44h0ce0a0ll3k7kmy0o54kpo87d5kzlw543kmcs2nqlhxy35luhr5x7l462fmg11ot5dcjob1suy93xt6szsi9xp4l2pfi4t8a57narpjgtta1oxiklzxj72y4pvkocf5t22bbxdm2rflt1gxis38oxk0fzo',
                name: 'wpfwz9jselu2ndttrw9e2llya0v6xifvqfm5qz7jl5r5cmqvcwncm1rqm0hkks49exv2u7s7n60jqbmc7tfir1dsff77q7amb6xikeb0z0v5vhj7839ew8auqmzjog70edgr4rtibjk8o93xhjhlk9fdfv83xshi',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'emnlc87xabxoqnfeww3veaizsnrj6sm9devcilh10ast8f7yhncvh0a1sdngk7lijz4fyuym8ogn04u91wqp5bz6grgdkmrep7z8mwqbgptw32ypkhu0ete9waywremb8qdsvvc6gig01f92a7x4mevx0ycwtisc',
                flowComponent: '0qn01uey8y0jkutvu51un14z7v1bca1h12bf9z98agqo000xrvs14h2rt7b3cx7104hr593iy86bikcgtbw2ors9qco6hjcullrj7ac8n931o9bbtut25g9kb5jqc2mgxfuwrqxmuydsjzsoayp7vqq9s5icwa9b',
                flowInterfaceName: '6us6tq8h94i7g13n5y5u0n73ggbnd5pddlayaux5x7kh5pw40ixt3plor00f70x9e4h2davs7ae3k1me16jscjlnz0r6r4ntdkdwph7kxigsf6c8j9i3kyy7onefe4zrzay9i0w3s73tufn7kg3tb2bz7nllibiu',
                flowInterfaceNamespace: '2r8uhjvf19i7btbebzpbuylhe78gr5ashdyd3jpwpb048s24nefew0en7ubxzrnc3dhnw9668gg7uv1v4hi4donce1y24qpcl2l1xsgbxvmw4wcwp3mu2q731r203n0bg10jssfrupjjvcexl9vathnfx9ht9kio',
                version: 'rpjdxze9xuo50ao9flb0',
                adapterType: 'dmrvs70fgdeq6923frcmj10fbf47z2qh2mouze2xyrs1uirhlf93z7w1de83',
                direction: 'SENDER',
                transportProtocol: 'fby48m485p98dkkkptth6f8ccqc8x0hmopnynqsnvieyot1mcz6bclblpn13',
                messageProtocol: 'e3ymgefb1pp1g0c8zanxiwxocuvzz0k1jtrc53ttdwcx2x2p8juvn8kfx25n',
                adapterEngineName: '6es12fogkl5nkg9wp7oz11jd9r69b80173mte3308ivap0g320wta4focaoc0up2gh2o694dm8w85q5uv1dg0hs8deegiw022n1u63qsddjxfb7rf3n32grhivjv0v0aejkmf7chqz50yjtyu49ap0yq03v0zd4g',
                url: 'g5p5trooo6ue3ajcv5ci149bqe32cctvkdcyc5vi4in3kw7xliqomc2ck6dxqtonxm015294csdqzjph9gkb8b5yx1s63byh2rfxoffh6z6vg03z0mfp98e8nh6914vl0qwiqcpalqxjrunltv4bqja46drd345qzq2pbcn7rf47tssvajljcqkbn39r1fr116z7fuk7ouai4ipuqmpzo7cbcv0zlg0mjsm7tilhjjnc6zzrwcmumr0r5vh2vgc1kuzi30yol94l9j4vvi8w53h9hyza9cfij5cfraum2c6cf8rzmm4n83q9nblqvok5',
                username: 'imop3leuhd807f7s6kfmj22kjcuuoeacweswbp6xm6npa4ebdgww1zq83c60',
                remoteHost: 'd33zi4uuisa63illb8dsba6gos4hlbwleko63nc26lznspezsgh1locjau118xwa7kg2qvfm4sntlgydq597a1fdy6x9v5avv2tiq0s0jfipwfkzkzy4tsbv806ymoo0y4tt59wilwbb325cr0pcg851ymyl4wbm',
                remotePort: 3015001739,
                directory: '4dbh8r5u5wb8hzs34gsblk4sajpcwult30kl4u2f19l0pmx34hj8d5qivita5cp7ysp0w6xw865mpa8m3c73j39qau7rqdb5fwsavzy5wxujwalyvvhmm2yjl9u1u5ohwxvs5k4n985fklrbp2m9vl7jhkw59q6magley2sssteby9vt02ch5j7zkqs6scimukx6kt4tiy4q7ycqusl3r61q4kpwsgv83gnx0obkk4z0arhrm7xtn0pwnrniahtmis51gvbg4f6t0je0wbb4vlowsmgwenq8xs93mty01cyzpn1b5sbmhyuims0o5x3hdz9r9y3dsd7fy4nfcg4taes7whmexfqcts7zc6li6sf7d9j99s8hquwkukg3bnba3aqg7yaatuhnizecopvzmfvn8kjc17fqbyqzma6u13bed0bmjyqp4yo9qxnypy3bzu62qj40p4fougtidkgehwhl9j4j8rj3usfl3ugcrfphp0d07pqm7jencaxvazt3tkldb7eq99tkcdp7vfr4ffafu89rr23qfakjjrcd6vrd9z2rpjabhro0d9b7mszjncqpe02thn2w4cpeuhrlxz98kz8d9ey8tcrz9qqzne9kknxqywywx5nqya0k9g4r1bsde2lypa1mph94t3hv4ly4uugogjkou1y0qysvq1yuahj0ka3pf3ueiawatx7gbpr69nbfq0vw31aqsa9kkde1qjubfpit0xgz50hx5i8m6iualti53wm8kuilpfim0o6isxxzu7uq2ttz1dseez0ytg68cxjx36s4o6du9jxt25o0hhk0mv65ltgrbrwfvfrbfjyicejd80tza8xlnias1frc9gkwcerb732qudh9ecogr2in4t5ojka8wuwjpyuivl3jjpyo4ce2jof0onb9p9irpi6h7vu6zhj89xuibjhnwf3clkk494kqwu9vnvrdz40togm08awj3pmfdjoznilst021rgkxtoc47vuwvxhob02mzeok6qrhmpno',
                fileSchema: 'sj65e32z4z783568w6h7po713pyk8txkef90zntmttgbs0dbrozmphkenkxi574l8stabgpvdcgc6q2inb22he62r3jv8g5btg0t2juht6p45rvkc7dmppefm8bzolrpoiwn4q1lk3w87b8iwwtge3po6yybllrobwp88h9qrd6nwwbjzk7n59ppx9eldhq0t27xv8y4w6t65vdy9rj9j87l5bfr1x32k1uwuyjzl363grhlv8empuewjfahw921ez34h65qopwcm5r2gfybmchnfbra2mv0srr7yzmp1jkv6nc0m8soa0pvb9cupez0fujyfsvkkci2s2p5pq5002f4r18r67ui7lou2vji4xmomuk477vci5swfd4r188h53w9wyjc73m1n11maz72dm2nzfmvgd8bt53ie66pjgvvoqnuf2vinl23indwwx4xxymxzjy0sduoze8okc317xw5yjq2da832s6iulwbyaf0hy40sqrwn1sm7okd4kfao2k7bsztrvcwcz17n63lrn7fxwddvdmewfxaz3xx7nzt6jn7os9v5puzyy2wstgmbe939kma3k8hrqwnbnoeb73vki2v9i5muehxj9grenogyk0grhrarpkyx9auhty8xdndevipkvphqv0vvbqyi03a3i126wl6d5cjebz7b0ia0kead8fyoqyo7wiq2hmub701i2m94s4q7esulc91ryz216vlrunutu59h31ti33g0f8mu8kwg476kos9qiiln7ebcit6nmlqjw4p3c3vz74598upqe4fmphw46nzrcyuxsgxqdqut4ykn3yaozt4awk8j4c483o7uam47ew4puiap2193dserivv1nws212swiipkoarpge8pwihg38pfln5rq7brvrrcw6tjjjewnjgtpkdybeu55ztlsq3vjfv0f5uiszs43ddxsvp19w43jnd9s3urv8sdsfv5mdpz3napqgrlymyg4jn2pfuyq6b87bfh61uuerr9d7h5j3h',
                proxyHost: 'ftplc6fe1m1gzviv8ytaxrjlyorsjqai9lllct90348k81frot0f7buegdui',
                proxyPort: 9638132677,
                destination: '4cwjmscbdrua7t0lco64y91j53dvl957olw642eu5a5pifor6kdm69c4rfdoc61qp3pftu8sapqung2qqzblcrfria6cmzsayga0n93axoywqm7gaadr5p2zoxh9hywqvy3v0fmu63w3dl0wmxb7az3bfiyfpmfi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3l8c2yq62y933ujt9fi39mgaz5i2q4ko45tvo35n9ukzdenxpmbh1f6c8nezc8knsez9orh3n5nzb7ypqubrc60z322lmyu8pn0az1is913j1zfu4e41tyag4cdxyptkh9q0ehcgbpoum18d6fon07uuz7i2gpbp',
                responsibleUserAccountName: 'p55743iaeuqk7kp2p46j',
                lastChangeUserAccount: 'pwgs6xxl2od8pmqsgzhd',
                lastChangedAt: '2020-07-28 16:13:05',
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
                
                hash: 'kh62z6oslj4jnb0xfa6fp6mkkvv6ra1w69m2ukyn',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'jcfujze0ya2105mj9s0cay5b4ywatoxxny4nc5ze00fze7th4n',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'z2q7az0z1goj5r1384x6',
                party: '5meb0gjah3z9gr1bvl32nb1hb2tx6vhfaphtyr4468vqnlnwkt1xc2znw0b0xags28c18g2r0m7z254a35uwlfempwos06zgr2hcklva0uuio1jg6yhzadw2p6l3i58bu0daqpafoz61609oucj803kkgdkblo2z',
                component: '0vfanth8x2978hjw3bcss4893lxqwqobx4tqi5vsud7077a0e7e3f6vhd72esikcuz2gvs7rb9jaic1sif9qssaxwy1elnixm45uznuagddb6wslxolszv9do3k6wogf840my3tk00aflojkazqsyhcfqp8yldcc',
                name: 'w3il0kaqe8mc2xq7dsekrr31rxtnsbkem7bj7jpozjfxam0hfod3cmlwo87al7bwd61koohqcamtkgc3984s2a6rssxhh9qq927953r3obfrbv4rn8433viryp5pe7v9ych5soeupbpuwtg3kn443vbo0270r26p',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'nl84vq1nwzglpyhautwgkq3baqekcujnp6u2zggtn0cr5ucpoxylwjl3p93ieq1kp1w3ojw7uf2gzl8dfepgtkkg7dl9jblmqqdp3biz7uv22lcludy1xdu7n3jymed5twb30ydxebogixfck88k925seboc7jey',
                flowComponent: 'akj845eauc73skn43i9jj29eu2h18yxo0gbgtsvgfivoep2vl7h9w64a8il7ihwfvrbgwhmvy0lzqg6co1zd1ejobvt3426t7smt63c6uki4djzlbm3m5y2ppvsir7uj9fi83b9m9h1befq84jcyukbt95whkln9',
                flowInterfaceName: '7rydfopwyet769zk6vt52asaqoewx6rqppf1ivxg99jxdusdy2e6i7px2ka3sj0bw9c7gb7tx1canmbqvfpivkybm7n0ryrtkz6fi0e337i2x32bpulthwxeyb3w8vucy7zg4b4g40cpepltv3u57i0ue1l0lipk',
                flowInterfaceNamespace: 'pvc2fn3w05n29g5plvgqemqq1r3znnb72rxozok3h44wnkk0r2mn5jz1npgvagevocryt9elji2bxgkbamu7w3j9yn2x2dhdjw7ti2u7wdg2ws4e6qgcv9jabwdc3a0lsv2olm8qpsq7g28zhe5jwcqf5axuxxjh',
                version: 'qyd18xwjq7yuwgdog7c8',
                adapterType: 'xkbas4nsryqqptaeekzwfoz0g1101mjs1ao792m571fqzxnrbsbnn0vuimyq',
                direction: 'RECEIVER',
                transportProtocol: 'a0jbi5d5k0720bq4p4xaklsabpfv887uc2o2wbf1u8slrv77xx5knp6aeo3g',
                messageProtocol: 'e8htofxr35626zyhi1c98we819wb8wwz25t64jo3sxs6576zzqlah3ybwdx5',
                adapterEngineName: 'wm212ycqb5eojckssr7jn6dqo9ogmsoyxxqiptv36iroi35z5e385br3i6zd9h81pcmmv2iwl1t6p4smxd93dfw4r9pmtkcq32okjsadefqt4jzyu1fik6dag6vm5hjov7mnbe5duwxywhfyj7b79pk6ht5j6gai',
                url: 'oqof38f6xhwm04rdvjd04gg6ygfnd7o2osahdc3e8h83llbei5cpwx22puxssyo55foehz2xbvw55ontrgzptmy6sa0vw29gbb0q1zimcezhnvhypr1qs0hv7a8w1ln5jbrwuzhixwewooons7wfhky0fnyl0wv76y8n9iu630tqxvmvcyyukti6k91ywg1nbh3e5r0zdga0lzfx3mjfda4csmdbm8nunvlnvck79iinlar52bj7bcmvw96ip60wlaresq2o2l0tcwi5bmqmytq75n8mruorx9e69zqlu4rkcjgqz5ld7v332q2vmjgz',
                username: '2f8s3z0gmo97ajcg3sqk6fkd198efs57fv00d4sgczumovzmlydgws382ujx',
                remoteHost: 'wh4s6mtbclm92tfjh69xgnpkqhw1q7h58xk5hcgz6vnyg5ghq5pp2kpf72i1o7brd76n6p0puuk4902tzaz4fgyq50it33l41wihwxozkwtn9qp6mnj0lgzad26j20jei7dr7z8rjv07ti1juqrrrrwo6xl97r0b',
                remotePort: 2271442726,
                directory: 'vf6cnrkfcsi6u8ybj7j3d7ztakiwmbi9abhlhfb83ce4b24yc86hcrmy8gm470mbfaoq3ru81sbguh5xc0tjkqhc7r2t856qwlmpdpxwe8chrv8f8dpjtd123diui57g58uzm1sxyoaaee5d07nfjmzlrg2sdyaf43ng1nk5uqe54uo209of7vcrs7sme2crhin061b73xmni0ek8vse7wtolf2eeg1r0qa3168e2tr458bkd8q2kx2l3sl1g1vv5wgomxqegijoxwrnokukkka9lfh6juxuq3321lvfaowf0kz47s2yu5jtvki7u83tfn6swcixsj8m2t4009ztqopqw1qndgs7300m57n8c58if5h7thwr3zo2t0ttynqxfya7zneyzi94vu5g3gzeyur9ioxgue6wzev3uqsbvgvob7slp394pn82h1btvn8l2fsy29zemfkt08cvz22mlc7b9h995u32bgauna61xhoayboivtp1c1f2n2o9xthlmkd8vaszq1dq5jnwr234jbl2dalu6n0ert8tg7uf6x72yzjpkn0l9mpi4i5k0rogqvu9dtcej4e0g9jz9yeaqn062zbnartszuteugy6zu750rahntxx60yb49k35tzist32tpl2gs8msjtej1cckc06z7ot7hbz7m1jqdoskhcuh294aq7h65u04rw59se5cv5xrj3120djcymnyacbdgio2qclgjst4mjhqwn0pbtoca6haeykcpst93290q34c6xzm059rdazri9bi96xznw7i0xmqxesqgh2hgq4tm291vhij44u2vw9zzzvahae698yea5wqrfljkgy2fs0n45g1i6tqa0ore3guqc02n3somzcyapm6gr62eixbn3zee8nqqexe60kjfejb68i3yhqr9jltjqtse2m5x9hp9ekc7ka5rsy05i247voqysud28zcrywhrjjskjun66oko9w20pyj3q95jyf0jq02u6uq3wlbgdznn33wx78bkno',
                fileSchema: 'n08vjk72mb33n6mwot03lzbg5irg9e9now1ps1l1adt6qls3irucwpx50oj5gtwphjs3b5nke7sdfhn7d697pc6qyzfza73b08kdhmhq54vbuv7vjtezldgl9eel77imglu288so8te4qjrxouz035mn2mhdoly8p8yf7n6xmrffnvj3pn1cecl9oqhjsn24bryevr6s5vjrkxws7bkyxh4o4i863i820epf91qrfdoy0ljkt1611k8q9wv0s8at2iswd2syczvcpg5o9t5u3kmp8fx88p8392zdmtnxiaf57mzr4hkav5yredhovsbndyk3si8hl9bznabnjr4g6tq7wcc2sbl9m2kmq4s7f6dxnhfv3u6xgtvq7fod4ov43ujqv6s6nh96jxmctd0w19ejbn8c7gst1ha62rulw9t4gaowgp2gnwfi444wkngx53n47om7qc8o6a5z1v78qxdbfo7cmmp406j88oyqb1kub7p7of8umo235mh6ecryggli5pgrt06xlpof89dpyjn60298ggos3i1pkhiqhubb9usdz52xn7q14m98yezi7k5c00uuwdip1q6yocttdo0gvgoapsn66lym93jbi6eagxapokc37d0o52phitx9bpughv0sapdtgrdow4govaxnqj4o6pk7029mpy9d4smbsngxscka49jfe6a34zjx6tlno8nzxxg4swpygvgqlndn8s3czey0qajq5iszv4xrp2u11xf6b5a9j4vtg4kmq2qdoopw9ft5ai2e7m0ut7asdfi866a9z0zs01q8trfylgpf6r9ya4fj3oyclwkqb760qfg6vax8tehl8pxo1jqrpaawrckku042zk5ydvdcffoc8qtespdmb0fk2vtvh04wwougwpq9s5v8338331jcrpbmzsrh7ujjvvpioc6oraa5w1wqj9t6al8p26t6mhdpmv2vc2rnbu7ru9g3gpybhe5mpnlivdf1az7sqi9i4y7elkindl34k2zcsipk',
                proxyHost: 'b91sp1ch0j0tt1jahu9q3nb2rm6xxhhpl88pl06ywt9ip86z2f2k3aozj2te',
                proxyPort: 1793932115,
                destination: '17witzw578ueggdqf1h68nsbd0cinbbcafwqhgqfn5r982xvpt7q2xqvpijyf08g3ahbrswhr9r8axqcmam579mkjpabm56hakkvuy6f7blkak5lm9q3bmqy1crmkamsuett1cvjyvgd6a5dxjfkbxhph8jk1i86',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n2t9fljcg600spmwknd7hxczhjvcpahcqfzlsvq7bon5r6y4nfmie9wwbaeiu2tru2af4t0gio25lewhdhzemogs8ldb0uuz0w5465sbfbsdr6f8ldms1gl1vsk9jv87r7a8kgjt88x8dgqgfjpmm0ktyv2ym1ku',
                responsibleUserAccountName: 'qqbdj8bwim2mjmkmbuuz',
                lastChangeUserAccount: '93dkzqtr7uimpy3ztl74',
                lastChangedAt: '2020-07-28 22:41:54',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: null,
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'nhkgt0v57dv1pqco7lhqddmpogdtfoy4ypnwri96ct80b0udix',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '2qjzwsuhkk1sj0av8im9',
                party: '1hmwiemix0ivg5y30dfn3pnc1kxclkt5tldf4e3lagarnvbw2ejfl4gp4rrprz1gsdv0unpbrmav5swnr66j2mmzwfz5zz0vlq0mm1462dyzisakuexup8ymwuj9ifuyzwdrgwfnu3dsctj678vbzf05ekdyuh1m',
                component: 'vc9gbuydloq91awxjdd4bwjh2yublly2w16l19cdhfludzanvtbko73r1i1gz7kw7ov9byzskx0r5s5944rreks2aw9dhvanlg0df0d8objefdup873yttsiebv63wcir17j8f0sxbs03cksgm04gnu6noh80ft8',
                name: 'wd48ixgxad0kqia8vll756e21trmkphstl2ztf4amdytvq33t4t2y7nzbnxrkoiq7pgjlbyqjzhngwrcjkilg99briem51zkkrplktnkehygv2srzci5s22ok3pq93oiel9jka59psk9dccgusdd8fqhos1y05ha',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'v5hd3ql854uxsi4r36czf4y7ifclpwqjdzxu6mnvnprycek8iyc603b80yr22wueannkebudif7xd60ioztmmv2kdwv3hasol3cp85uhgaoluaw5seetxw5fo500le5bod1h5ubkrwvao5cdilkovenv89tr6z9r',
                flowComponent: 'x4hnubdzztvo27hswbnsfjbdxcgb36opr482umtm0u51ocuv0xs3se5t03k9f8oinavsxy5cu3vd8dao98bco164qfbp1n1n1840mougjf9etm1aaj8ywnjh5hn6yndukr7irgxual4fpgb8dtunge8hoap058qc',
                flowInterfaceName: 'v6urtm8wlqi0uqlr4h39qrrkefx52sijwup1rv9408phlqws7qau9jnx6tpd0sa5cn4ej8k4p11setvy7tjwvu4rxo9j2l5n7xtrdx7bza23trieqkhr4l7g33hjeydqjbbw1g826uwu5wmxrx3y9ot2bel9eml3',
                flowInterfaceNamespace: 'kgflkhybp4aa2s3qi1fwd6iba1urbsclx55am3v3qcyre225p850vajq0nn7dho9zqo5njqn3b6n8x5y0dque9p8bcw4likpg0vfhuf0y50hwabqyvwtc5z0otzjdg6t2myevh1bobk8xuhacxdxedzi8b40w15w',
                version: 'lvfqh8ed3mcolh0706sr',
                adapterType: 'we11dt5fxqnqpfccoaabwydfubi4owp9zqo2w1yszrcnca9fd8qroc40g2mp',
                direction: 'RECEIVER',
                transportProtocol: 'ssikpemwfg7eax7pfrfq7uh6hjqc2ysacu0dt7o93r2qbmmef71vv34ew3ax',
                messageProtocol: 'eg4x3zh6wtkljlva2grpm4jef7h4aptun2e7ci66n1ot26qh5d5l5tz3p38f',
                adapterEngineName: 'ddx6tmeqswjr8ckcabldbdp158xkrqjstsw6rctw20r3zogsj1hal1x77oz4iam9ns143hic640iwhw0g5l877d4q8nh5rxkqd6bicd46gio6y8ewv9sz84i0g9o947qohcfcrq1ziu9bszcoozwruvzp9hhdiyp',
                url: 'rg0xp1yf3w2u52lt7ik8zylgx7fup4289yq5s2l4svviyvpkxpck45vqr1zoj0k3e3pqpkg4vcgpy92dxsku3dhquovqi855uekv2k483iqhr2lfy9sv1iajuo5ejwf5ytr14i3ti1i8fg7eafn4v0jvv3g7shv0vyifvqoo7hlbeyp2s3octhydo72yif2httyix20ra4qoejhem6gx83rfa6mmsk46nfyz2gacfr7tkhl4d0k7lmgk1dc81f12rg083gcwl2dbaniv03fqh3a1n8fgyfiytrsge2jpcoj1d127hkm272hv0e13oqsz',
                username: 'xl6bjnt4wqbj2qfb611rrhprj3fsva7hdme4lm4ri54segmx8j7z98ycaaep',
                remoteHost: 'g40iidm4ga6ukwow4scdp7v9k16hj9zueal2b966qt7aaj7go18jtyymwrdt4z4fj3s7n4dyb65fa3m7x7myjrib46blu7i8z79dnkz4nu0qcrjo67x53pe6bs4hxx1pd7n34io1bex5fvx78tmsmnnhcnvrj0va',
                remotePort: 6438676223,
                directory: 'ohj3oyc9iynnfdoid9fidj2wilikhzff47g6ujxijwktd0f9z0d9e17rmztb5u5mgydiiow0sc0aqrxcus2303jc7qgvinw6iplru9f2c2gj9l43d4w2kr8ihcodgnjofpkpeha3jjc1ut03il1halvv23arwblgzye6wxtjd3p8v4bt9aww28ojph9wab3fxw34ysapiubrve1pg80xfr0rdcfuqeb5zwmm4pk7dr04ldkcy1a56vs9ecyxclf28u6ji9fecr4vhbhrfrxx2byx4xb2hr1ue3mywtuawnrgerjudkns9j1la29j69xqt9xw5fuoz5i7654os2utihrtas7na8ckw9o89up8eo0f38777fya5gtf0fqq30d04x5747y7srxdwez3iclj1k9qsaaq7tp3hyx37sgbnocnlso8k7sag7p24uh8gmvwobgvpvf151mfngzs7eebi64v1avfatmp9rwblo3jj5whqq9ay1db01xjte82cexq9njnv8u5cfwo79wa869054l0wjcq227ietel3sbp8uq8snmlvxxskjvqx2lmvi1a1ox9lg9i2of4m713f087npt1nkr6pguu3jrz69dxfti728cjn6k17y9p7if6wwy9g1qjn1umrmltzntmzugwga4cx61v6otga5ew2n00jjdu2loe9fbx1fzvzk98nuuawqii81ag6wtdq319emf8fylcauhj2wk5vnjdmbh2eup7ft330p20rzxr78h10w8mj8yuddrf9f3qr8kxpq9kwftr1qfvxmnbritik5y9k4vav1d6k4g0rh8ir9jo90sjwm2jd4y1014r0a445sfnvhv5cm0q1ro5bkudwb9vrj1userr7xrfnoptsh7qs3p2u1ls117l5p4bymqdq78dgvjn5rcttzb1b8wlpp1p9z4br5082nj5wiswq1qrbyl6qb4yx3zkt74id8mvgc4u5ijun3dvtd1sfds0eca45dp5gys07l157m92dezbll58',
                fileSchema: 'tlbi9zo899qyn1h3ldo4tj9dcb5iq4po6doj08esx5wi567ihs7ql6yimabkgiuekoanmtcj27qzlgfx55oaiyxlxdndwayoxz9fnk3zcmc3jv1skwk9e2o50h6bxlwcq5zi6lu75ekby16o32eqaacp29p07jbhtrehqfk8kx4bv0tu738rl8y0b0ckdi3pzdnw322q5znc1o40zjvw3eo64zb79ui6m4vhhak8uz9zcxfh0fu1ncoy1qh1g2ocmf8wx3utgzhjhpteaezfsizzwjl5zp1vivlupn286et380stl4rjtdplrgqnoz5ecol1msu223lsrn11ytzayk5tozu5c5upst593a6mzdcajxxvafgjqfqtoc8sqtz6tp5hly7v7y695ahlt600i3tejfevhjuduitagwkqda6anqeepp9o61lhsyx4ae8cfnmo9gufbsll4zi3zkmfqf0aoa01c6lcy7uarphakqzlgnbgy7n49ngx3wz9n19tmbps59b8ax4zj8v5aseqn30cafnbzfq7wsmeq5ib4xm6wjzfdugchiu6tk8dkvfiophbjuj4s7k8qb9jpmunbqe166ti42j0o09f7bjmhsa43fr3tv3l6rjmzi24n5no3jz9i8nv0gf04gdogmi75cg77e90pzwtnijz9vrnyzliz4t4j2zy24j8uqciu2aojxrs64fpr3tv77gqr0ljiol63mvkkngkrpl97jav9pvo82aw5g1bfxou0dxex7sucuoncsdufx2hw01y2hjtzcgrxtxyer3cxgavvs8b6g0uy1qopdyqle521x01en4dfkwxjk7ov1zkgcxph3qermd2cd75cab4tsckjzus92bcwaks532dxpp0203ohtplvn4il7sf0dftrehhke1cr731d5ztqbzvzc1biczal3a9sdr05g41wzs2xj76fbjp5sld2hfbqjhf9026d4hso6g1mzqym9x28aavnlwp6d5p2eloueirh3jl3cpo22vk',
                proxyHost: 'ssrajylyu31rwg9b1nsb6ibu68814lsot3z21sum0y2rms3frww4omkno0j0',
                proxyPort: 9466305361,
                destination: '2q4qobr8wc7k0jr159nufzu3u2t6b81rz8owe04ey5caar66h6fpes1odwvni5jy7ch5c26skh6h5xfvdk541224d0t8humymnb13tetxvmtax39ecb03qc77mz2lpleryg5w79hd2jmz12myrl69b701aqf3bsf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'w6tpaoi3sjl6kdy4ejme8107fhzdjdo5d636tnhwy9laafoa744pzh2j601vv99m0ky2cbc54wcul49cdurqkbz6yibblzrwg5683wvmofxo8g5opn0klky1nqv2p934d22560ucpsb44l8q0iwl25iqh6uuggul',
                responsibleUserAccountName: '1owj4q6phpmvt0l7rra4',
                lastChangeUserAccount: '89moi3xlel6n17gbdvat',
                lastChangedAt: '2020-07-28 21:57:29',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 's3e5i0bbwhtrhvn1r0rhiqec5utdjewwweas6krurh6rkojgnq',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '4okiewbv0gkh2nq3n5bl',
                party: 'iew6uuvdwrpvmez3cqj17qzqnhy923svx6cehm5alhrr93ugs83dnz9lv9yo0g5ifwz7dztupzy48z8duccqpcts2iwnxr97ext181xwe0pvc8czzs9ouch8amb44l48j16gd9qwna1z76v4y8mb2bwafxphnr7n',
                component: 'bqldmvwfgkutqtzu7rfl023y9cbi5mnvdbenbyd9q9hv0vj8rr26oh2uubvzf4yot5h1bwvhnhxu2k8r48dzxgmrws0cc7ao3feypcyq4wfecz5mnjgiri09mj0verung8lxuemujyuvc78i2dk7w2pxqae4adg5',
                name: 'irgiku2mf48dt7g0rp6fbln39bidd0z62cbr0iwpqlqr9bctf9ym6mpq9nfwwjfk64xpdw11m2eladzcymeox004jm91snk2099os38i7ehn3xln1vn60yjrslkqhk2471ysvr6k7wbd691ukqub5wm3ibnjyxpn',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'rk6o8b0vyofbav3i8pojalta8nlrbkrawcq23qfnv3jmgjzmanoa42n178y00aw4h3cljzs6ljhkxilk0pdbia985u04nql4ggmrhawjea6kng7riddkb0ytn4pqaburto8qt2y00g2t263t0brbnb2kwvowq0j4',
                flowComponent: 'xtlbud2zc22t84pqdsfgnfh8y1ycr2mw03yngxfw7dfiqsnuotkztlod5qz609ct7wo7n9qvsegzojyi2qd9ur1g7ua5g6ze1wrbkeqa6m2kmtalr18wt3lr0ynj3qqmmmd8hvgdm9u6tm9serlpnwlw50e5x2rj',
                flowInterfaceName: 'u8x8jyyqxhwerraepbna1ougzm8mh1jlff2ni4o9mi212tynwzedfb9t00g5fbcqimiyk7vk6b6poujfl4n3lfqo1fh6znupzbv0elq9c7p37tuzjz904px39d7i33hxw7tij13t25hh1gaw054tnb9et7ux5vwb',
                flowInterfaceNamespace: 'dxtvalmhazzmqkkiw79jkwehgprfxbexx5w422ocq1r55d2bql1vuw6rtq3tlrgnxifyw3fabtf3aeilgfum8nfygy00g44l99jp2znizj9yz6o0lq1eh1un7rhhp65x8m1j2ypxn7836dfx96ifnhyfytdjthri',
                version: 'ksl2ck9f92s4k7jo2uzq',
                adapterType: 'pwoat69bshjsxx7f0hfkusfq7pcwwiylm2h9zhmsqk57g71hpz18f1quqp0z',
                direction: 'RECEIVER',
                transportProtocol: 'shgrd3xwqc61r6800rnv4e6tfqocrxqu3du6c9g9ea0rbyvpdhhqcb5f3p9u',
                messageProtocol: 'see1uorbpbig3hptoo455htvq58dj17xmbn1b22cdvbxtk0oh4qxttkyg1a1',
                adapterEngineName: 'w2dk69i094bbm5b1517scxmwnj2evij4b3c4jexfnhwfe356oyx2hkjahv5w0ebokzvgsd5nqyk2yrf87t5sst16rf1d2ltnwn0crxefi58yv83cpjx9irvzus9ll097rf60r2tg5vdswhgrztz4hj710guqann8',
                url: 'b51surpy1ayo1ogkx6xlr1n9jw8a5dmv1g4w7sll6lwbxpt1byluk4429w80gumnvecdqf4rqtyn8w6w7z2wpse9dsc03iap2k2k4c4nl310fypbg26iynlth6tuzebib3vgb81lc5xiy2n75fm8irgv52ipf0vesg2anbaj4xtj7qqi97aqyrj88faxzq9wouedi0ba0b55go2r1483k14ihs40427z7pcchyezgzpzt8pv89ov9egtvied3gmpztctjc4yb98uwli48hkjuur85sc6cg8n5jvyasyd3lfss6vkgamvg309vyqb8ynk',
                username: 'p5tjj6ifq384smnxfhqei62o2boyg7dljyigkqoy2iv6p0dvud3ln42v197x',
                remoteHost: 'v94y9mdwggpkwzus3pkoq44rz7hyfvc017s7g1gaojl14271mqojf6ylusw6rxssy2eh4oyzt7qkxompl9201so4l86vddfybme0jr6q0qlmddt64m51i793vuuhzzrh8jnaf56czbzna40r9794hgqwtys25rj2',
                remotePort: 8128159827,
                directory: 'acg9xepa99zdg28wlks3ctez0m5frdbvru203n4fw8iz629thavwtngd04oe6t77yygyrqebac3pdwvtbpzh5ugg90aecp3rtkhgriybz29y3d8p7j31iraz102uw19j66tcg5cvf25pdh1jj7r747kgky5a5es4i60q4vdwmr3vs9hlwpthkv01px9pjf29ie0y2feu2vjt3ho0250hlnazynu39bl20mhofcndq8amnynmgftort22rgz5dg3p2ve93i7u4myiu2ps8vfhqwdx9ez9fpydhqszd0ebekggne9e6s6923nnic9t8h4id8ngxceybdy7w5u5hfmle1b4seddr70d36su11g5eeyorxq8l55h4bd4zy79cr2c08s07tww96kgorwy22omryctyyhczglp2dwg6hg9mzfne9ujixn69vkd6g9kcjxufksryp5smglsig04pkleifsnnt027un6e7v5j3ejn5wyws9n20r6b09vh3ldo4t69ta7owuz3dk6y3yte1xkyko1rw1q0z5v7qb4arqw95a3pilqkes8j64ckyd9xfggxx021cwhauzb5kr46zpoojuan4co9wj250i726jj673ta8f03for30qotya5yv13uqu3kxa1ut63wpsmi7d3hua5jk8mqvnrnw4jqlg0kue9v9wbxzw57w68jjeqh7yvm1lzscud5r3r7x9b0iirw07v8uxvct6qjf9u3ciot84k4z7nymjoaqg8840a0qa7ygbtuwhd0q70suju3ev876natx0hhsskulskg1r46jnci35p4zq6h44pnvxdydkyurzyccshwkzklmm82t9581zuzye1gee1m8h3zxx98zhitjfxdbpv9lxulgjyg3yzdwtwn15zpgwvsqun4pkbosvrsc4qczshdczq4xnyktnkne5b9hm315qardrzxc8cfun59tbtxcn2cyvkdai4vimiluxe13om7l8b5ebp0sci1bv2t60c4l7eerjf5ggd',
                fileSchema: '6poa0pisa83jl7n5awjaf2dazik6wm4idigufxhw7nm12y50iyo6isct2iomvgcyei4gcyl0zguke3kdsfbysyqa5p8u1y3gi8xpfhi71g1zxztou5mbos2uxnp1slohewkh7ddetz4e19kmrnwxh8e6p7spmm9m0l21iqmki67y9bi7qmetj9g2cy00as2twj1aof7day4qbxwvil3vxczawv5t0iap6dd7c73corqyc1lghb4alk1ok7cqn07nqwlafh3f71qeroa7cjqtla26mg6fk8s37djh137lfkayoip3caqtjyenr1vn0016x16ry7uyfgk3u14amggpdgtktflj4rpe5uhs525lqv0fxtr7vl4rwicxj7dcklgy2v8fl6ufn84vrgucb498fy44sp06aavz563ltgmr76osymhwovd4ek13wd6lw8zqb5hvc3g9szxq8iki9rwetitn83g1yf12oy76470gskmrpriotu3pekcbg6rtyx4a1fa5myz64qejd7e783qh8kpth384n11ut9ygw07z5w2dbj5xke4ee1fxv4uq3docu4ive19swga06y7mriprhvq0tzyjy7oza8ut6j8inn042dewemfwi4a5vkfjgkoafuvja6ny5efgwc9k0ii2c9fxesmhr37qr2qfnzfmsgxgj0joc90opwhbs4qz6zzyqwctx4vwonxc0r1hqc1wwaml64w1xl4puxrh1ysk32pkvcf0qypb801aoy8dhav2auevi6anrubgyre715frus26bdopyjmxp84tafnv9txtfefqp2hfumjjk0p82n9e8ee7a4nh56rn12f5it90l5597ltkwzolz38jqlrhqz6bi90yhyjckckmupyldgmrot7184ne0efp4czs2637nocll4vic4ga08670n4pqb9kewsawk0sratnzz42bojvhq6jaj5c12j4dt5a6vqgk6nkj15ay9e8rwb976a1too8u8wlyf3jpsnnks5nke63',
                proxyHost: 't740tnp8sdy2qv4w24a4zkvszdfrg2cfcl8avr2hk8ncrlbpugyidpffelcy',
                proxyPort: 3175013106,
                destination: 'dxmsbeb6lzjftysic02hhsl7qdpy5tgcl9gdgl0eutwcb86s44acq89auzpr3ro5ye234728sknup0qks5xew4hd1ou3luw9rmmmv1ybwp5p0yv5yoypjnp33hw7snttrlvg2bv8ky1226w9b07pqpdfqpj5oavr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '31i2pnmehakd841uzq9fy6f4r6p7ygky2bua9mtb84etifgq4mwsmkbtnge3upohyrzjpg971dlo44aq5w603fy3kuxazqblzgmj1pcwqtont5rtet4cszq8cfke8wd2zulmldvch5cbz1i8xz8zyvepef16u0j4',
                responsibleUserAccountName: 'og9agyygfic5dxfyhir1',
                lastChangeUserAccount: 'uc9e1k9qiptawko5adah',
                lastChangedAt: '2020-07-29 10:09:32',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '3o6wey82psibpgwt6z3f11dix1qyntalgceskkvs',
                tenantId: null,
                tenantCode: 'suq8l9kftex1bo43ry6vj3og4ravk77gtyx02bztsqu7cltsrb',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '021wu7jzgdl83gg5n7ui',
                party: '72nxcgn0c511gfm1e58wbpbxmhtj7z4j4iz1570m8pimbmk86keoo83gg02xw4yv0soi88lmlugrc0jcg7qfgidv0cegkpiq11qslkfgw8wtcwz7th1g8tc1w0czlipreleq9i46cnwtkqjvw86p27b8hmmel1ix',
                component: '7qlrsmlblq624wn6y75sps9j0mm2lblwa1xbf18237e7yoriopws16bqlxbwla2emx9itt59fwm9l26namdu4hk30nm7xab9ao4gn44y59nsdmsrmen8t2krys7vcaj13wflwm1e45mt1j6s0oxh13n48h20ye6v',
                name: 'ikm88i79jthn94g8vgpobeewl2m4w6zvtujtj9ybp8mkvz4cmjmy3xk5cufjm7l2j4425ad7offwtzo11hewhfaejs6wb6tmel0gi9nevus5pk194vfddeqt2zsk3du2ny4hkv5jcunqj12oywo5w6f8s3u7y2cm',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '16v3j4ppeteua5pgejg4nm9zidi8utunubnpjalbydbll2hszn02hkqkn4npu5qb2e01fffh92iyu33ank89xf1premld8glbw0zk7bfx1uwetgi7abmnan4exytufzefb734nzi3jpn62yojr8bjk2j8ewk0ka1',
                flowComponent: 'ru9rxa2n6cn3x6jwqkcyqq27e2t1h4d8g7yfzq3upxpvwf0rg6rbio0h3ysg7cvg239se9u68jyyns8jptb40egkjzohld909ull8mt7s8ljr6be2q10gucr8lhtk1p5on0hafr8qsism4v5wv13y6qrv1p07pun',
                flowInterfaceName: 'v9let3sei86uhfenr2egdzeu71gs1o6gj5rawu6kqit0efa2t6b5o37pl14h9gssn8y7ffvzfwy30bqwjdff1gjnodk8xsr9iabk8hz46gvexq37h2aoumrpnyvcrrtjyae014kpq3zgakgfyqb712px9l3jkj21',
                flowInterfaceNamespace: 'impohn83laai74lpen5qffvki7fos5396c4ulisye2gf26ugri8k3tjqwc8mzsjaacyyt0olf8g2kkedm2r7c85tr9bq4u4m9ysryw0dgj3asllm0ubrf2fnptzyk6rub166zcial7t650y8v6mi8inolfivesb7',
                version: '9fxcjmudti2r6g601i6d',
                adapterType: 'zble7o19ewhw5fwfxd792wjivw00pexyv9x7ff9ywcdczztb87xlcm1sddmk',
                direction: 'RECEIVER',
                transportProtocol: 'quppnfh34p5vcjhv8czvqpun4j09oon31i79b0a1nj2j6a5kg0aliaad9y2p',
                messageProtocol: 'xpci8aquhqs5jqmssg3dg21e8a6qu3juzfphxdaudncc2wj4gd9wwd1ddfvj',
                adapterEngineName: 'zke88fyna2hyih4nnlcpp3iams8q5ddveirrjf6hr2faem3m6ymrcp9cpefr00fu1n3icbqfef2yvg4rsgm9zxdup62ztosloc2xk4jazyec870180np99jngqymu1lyy9wg4vwwoptmtysk1k56zw0jttisagtm',
                url: 'scmft3ovwsnrc80s3k204mu7stris5rz0k47aqscyzozdq63me6f0ihjwtdd5ovasobrwc0rp8uxjdc78k5w3xsh7bhd9rw6774jns4mvnvb1d1ghak1ypgcu3dnjafqrb44va0d8cmkgvrcjg2uk3oohg8k0szkdyronib127xddrr8yvnfv3sj4opr1bxi7g11qc20y5ecjhg31rt9s7a71zgt9jzr01mmbgs2a1w0957t0mvzrgypicsrp26btzhbxonmhchzyttp9zyfxoeexjf39u1a72zjgtgk6q3gyhlrq268jojnelrmxehn',
                username: 'uxpatxrerr37wm27gdsc1xryjoj83ernlswj5gy7zkl2l5bxg42uym6hug9l',
                remoteHost: '4k8qm54uig36ce067s6uijxbn5926wtlo2t4ax8f4t0jiqa6nxdjg1gp5lf1rsfh86n4y12bh532h6cj31vaixhvgtjb5x6tm1eqp0zqwzklpbpjzixfmiq72icer668kfe72hxwjacyqqggmk35z7h0ig3bnoc9',
                remotePort: 5072332086,
                directory: 'fcj6idql3fftwc1adbidy4xvobqzwazoh8bzvj7gvlxnyluamranjp3llpde58ah5q4ri9cq2psy2pllagguqapuuirb0sayyc690ijmbr08tj8472h50ssalzikt130zba009y9oow5g4ka5weilga7aiolrfv6khdlp01jos4ffn96r9ih7cp4gnbivsec41e2exw8pgihuuaah6t7tvbq44qmyyy68oz6thxzazuwa1ktmhb2u1xm1fctfswte4w5umb6jo32nxyswntvlj0w2tcvtnin9ofyjhqta8vgkh429hsqs9j22awuiz1tp8s1tszv7z9yf71e6quhs6jj4bn4kg1e6072lq7oqxbnaqne3dgt226kvpbb92iv3jrkzc474glnfyiy1l523w029kx1tj5q92krpi658h5dn0v9duzkvavi1r1rx4llbhmmzmxnq36z27gmm8irb6kqltry35lf82rakrbeiti2hwj47iocjricbys0fr9ehd2pu39wuhak9rev454tpjbp3pskogax8wsm2zrtsw41xvyopim7ccswlv9jhpm1b51vt6wpx745wqmf4ek9t2143bcxb5gm04uwq0m7x5u62dw0ce49tryyebhxjz9vck9mde0o8ar4k538o411tllqb4u5cnc29qc25op9uehyfttq3evxm2epijuxy08sdxv6gx7dhzi5ubajvpxpw144n4z0b6frk09hitxoy569iq318u5d0pdulxgw0ke9qrtvzu2v3rncv2ewv7hwut9ostf1p32lucjaghcu3sr6saom311zl19vj5toispel1qhvieeayk23pci8hepi419044d776cni11vawis0oax58eaorfg5ajoezmqyrpy25yv2fbo4f8kq913yv5nd853nh3pf5w33dwzhnbbbzatcz6s29wnxha5bs51pnpcqd3nzefnd4vopkkgghmytdbja52mp8vgi388tnz64k7gd2ffez1ocy7bhrxavfl',
                fileSchema: '8th5sruayn4onmp2nsdr5w3cgczw4acl8wlcq1y3bhllb4ledb1xh7u2s07saaw6fhd2ojss7e0qikt1rgvo2vqfkatbncpndr0jp074w1lftl8n8miw10opqrr4vta1hplw3ydbeecw1gihgkpo9iz4s7alkmje5mfcmv5vgtxdpdxd70qzh5zgzmly2viqhng5re2cx1dkiylywimffm2za79srohhrm701h24ga9lr59jokgo183ybd1j6ljqhrxce05al1d26hkefw60ld8xa6ac7da2aiz1jhonrhtl2ynqtl4lmuy88gsx7dzjglcby6rveuphpz4jss75hyx6pl4lq7mbf9qb0hmj54u4qkg6bmt61e6is7nz3sc9eskqm8mypisibse358l64w9mxbslp6i4h6z43yc4lgr2hikxkwnuvam2mfx91iga6drbdk47ozb4etef8cc42c3lk4ihowmuo5jx13n4wm89uisq24b6n7fvvjpoj105u21otd5b65ppaj5gu52ujvrcnpqr319e9dmodgxnb6ah7l9velcrm07n7x5ezw0v6cxtauf2syprxkvjtfxvfldpe9v8gg2st3sobz7bl8hh5oi4dtg45nf5w26qt4vxmd94ir7qpyafcgd7g39k0bqin53pcn3qu8i79mz2khoqwi8ty01q1ohij80wyf1bvi92dthv2f6n1hn5m2i7jtm238qw95mt7dh40az1esol239hzrdetjr074e4eje53u5phuzs1qd9bsstqpto1cpqwdycj785uqt8b64cv6v2bfcdze74dy2itnm76on1ovlsu88b8qg30v0m6jmj42m1xuuie1nhnlfimtvfr5uvp17rnxrndyl9cemvcexeephg2h6y2ihzhc3sm6gx5fsni7eqou2ynpzdmbt3rugh9570pdjg1bx0fjjdqvdi6im1shbwp7yvr12nv0gytytw7xh9mjvg8mxiqqr4ab48aljnadhv11d2uwryfj2l',
                proxyHost: 'xkjwpibrigw5k035jbrl299ei9wxr23mx5sfwedzfzcq9mfjj6yl1asuncr1',
                proxyPort: 5304293331,
                destination: 'bcxvldj03196wnckqnp0nhdja1m0w8ljrfq1301ji7ns4xb092yw4ol86xdcu0yxdx6h2282m04qgjghwfpuw8okkbn68cdw49hnl86fi0nnojiq05ag1s77eddjgxfmqe4ws24706bt5gukul1wrojek05276k4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ak536gog0o2g3q62533vyvr0qqmdgc4licxdxuw6m27ifx8nn0ds60wm8d8zf9z2nsz3id5dfnfab83qat1y7zlsdwuc6f4vvx1t0zeziaoizj3jub5bfa25pw2am26ublq3t6okai4yqgl9cxq2vcyvn0j7ovhh',
                responsibleUserAccountName: 'g3b5m8o2hiqr24uz2rrs',
                lastChangeUserAccount: 'c54s9f17ef3r4a9ekkp4',
                lastChangedAt: '2020-07-29 11:59:32',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'ydjryj3ismat1fv1a9mhhq4alx3tobw0pdsoye7u',
                
                tenantCode: 'coueuaml2b9cjnab3hgtcqm81bt2w31vym3fs5pyh73g5blm3t',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '2nq982nbqlp6skqka0ao',
                party: 'tb319nj4e6rgz2z62m58kln09cz6agen1owv3i1gwx2ywhehds3te4ypc7zxeniybjg8jy99oucppvjrwu49ezrmk7pwxrprx8o4mj8dna8olhh03kwec7aipeof55m1jq1xilkxmb1q39yx231jy07oxz4l2u6x',
                component: '3ev9cy9ktpmv2bbncjic5dkx0fymzy87u38godjjf7u89bmviykjmb29kj79byxn8bx1a9lbzwk6wv82cmhixjtlghnk8nz6lmwkoeizs0lksnb0isf8tm3jazqyd36txbro4kqt7tdegynzydfxlks8bw6h4tvh',
                name: 'kxj1m29sdm7xd0uekx571f45waav1x6i73nppjskeyb242mt3ji4xtmbsvti04x02fokwzio9oaznlx1g87i7vl96q99di26iiwsu68t3hmfa137gw8ga8q0fj3ml64a98g214xzzu8w489g54hk0i5z7xl2dq7g',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'lfy0vtf0cadhmnhnfi4yaftfnrgei910jtgy60s5v1y4f9ea8xrc6jpqw2ivvnic3okr15upke37sitqlt9s2a91usncmhx9fq6gsx8q89pcggbb3ay61ors49t6u4bimy916y3gudumaa9k6gd8eypu8y2zqf1e',
                flowComponent: 'v5in5scwyfvwqi1baom3y4qyrx82jmnmhowqtyz7qnd2iu545tkyma8087okmq2u9vlqwwzrwy27gop5eazhh9w5v9mq07u48v1w5ref0wxrg8ddeitbz4xgxty2ubthbczt5hcsqicbqtx6l0a4ckc35ai2vh4q',
                flowInterfaceName: 'as714uaigudvp5gzo6qba6f6jusql6exciteozog4h2w177kpwwwxsmaythlfjwha0docc1hr9ny8p9g8l0adzvw3t7nfcral5ljr83ac3949z35enz9yrqiiruvd2nv1hvrw3ralkdnkt57mt1w9c8qwf9vci4z',
                flowInterfaceNamespace: '53iik81eajmxlu16e8ad5s1hbzou0d0gmddniuex6lhfgas5whytniequf62m1ps1i4dd9i9nv2uryz4ssyqosf4kw42w3we79df4wb4nc9etc8p041ka8kftxb5w7hrecgiagvzpmmz3j4sy8ne027wc7mcd1u3',
                version: 'vsbwnn1tglwrw0dbgsbh',
                adapterType: 'uyqh20umvro0ap09q4dv0zvrl9r947j3v12cecsz3ic0t4ndmu7g4qb6hd39',
                direction: 'SENDER',
                transportProtocol: '4cbsbumtofhw7ja3acc8xn2nt57ntp18v6q3mfn8himpjeg9e6mhnbpsv75x',
                messageProtocol: 'xx7go0bz6gb7mkl4q6a9y68eh958yytzrywde9onz4kaw4d20wzrn3g55i65',
                adapterEngineName: '7fv5is6jcpccl4r3g1fiurvehxt5iqeau12743xs0rk5anmhr3nq7g3v4jlwxse2hz4miyr74dcjztl33dxigida1sxpvcxnwrmy12skne6of77cm3ekqizsk2xcs2evzm9sw8kkwby10qxa6td1xwjd5679t2mb',
                url: '8yt3e62r8ppfi3m15hntf739ml9fvl7ouuc95hgvfcsww7ujd9d3ywdj5r0swmpwdvgqusrla8yprqrg30vbcmtrm69zfwb3okq326hp93kq826qnl7lkyzes9uttqb5ykmvwfq5k6nre6ndspfnyemyxpp3dq307xc31m8dpcshfr7b5ue85mpqfupfiqya5hlmw1oum620rgftiysgg0o3a4slmpkq8qtx0yemt567biiehdzp0wfpydm2mx6fwcxhofrbk220ci0kwkxomr8c81qk90fgna9o1ngyd6ig7npvaxkfse1qdch2zvoh',
                username: '4zjio08ry47zh5xx69bee03g9r4ojcyim8rywo1jsqbqz35e8gef3gshbsgx',
                remoteHost: 'h28wic2jpm40wv2hxd607ejy7931elzdb1i5ozci3nxqu4g8jsmqmw674lbf8nb2huw7do9fndezjv861eok4jgjlpy2czucp3h0cnl136pa0l772j6r1covm21hhwwzurldn2qnpgxn79813kgzmuxvmya58g25',
                remotePort: 8375751113,
                directory: 'fbpgprmn00rxk0t20sxydeusi46xhht10q3vjl6qsohjv745i2j3uw6h9mjjicvafa9ssux1ewi0xp5amhk2invbk0z0ilhnsyyycl2r5a3of6r12559dd5hsxmcuexsve1q4iiiatmezqxl1kfk4ssaje9frmudzv4tx92hbp01809ys9ser80rt6vrhh2oohcy7my47sbjt6qpcwdshrgb0mstswcna5jyv785wyp2f9a7i9909ir2mamt1x97cg9dylke7ifm5mmegh05tf59f81ujhhgmhmlg9yiebl3izaybbfx20w2vcg4aqk7yoots6wjw525kb8awnwzx65miu89rt30rzqojuigje7jphpwc9351mgbx3wzjmhg7wskb3gx4jmi4nm8z8w9is57tetlkn74jvn8lt1a6ptb32wady0iyg6cijd5fcr2xf6vqqkcel8tsi43113oge1yjml2cxgjhmv3ge6t19e9kdlfz5h8cm5wzl7inviirsv41fw3u7g3uh2zydomzros689hc1mm67uivfb35tc0y7p74qznzupfp06grzuwufn2roevuix65qezgiudiwgr4jvau8rgy11lu8wuhj68d7el8rnjvvukbxa1ixcb0nzmmukfvsv18a6lgheiv5yhvlrap3si37fqb4fr79ja4bi3ve7na6iykhy242o4x2vvk26u3d8ove861my74uzfryzdgstza9xdtfl9k4qczsj01cs12lw4jaf33yf577oa88iaszu8ad0gi4m07vv6mbuxr6u5tnin3ejmlka24s2pq1f0fk7ux2ykce7damn72xoeolju9fzbst9hnmivstl0xu9iv7k2o2ixtnuqeuv6synstssuenbn84gl5ai3hvhvvlmgavoo76a5k4wooa65gegi88y9dxuocfmtoxasitaym63213vxeewme7qapecnciiiwu703qbydj54g6jfgxvss5o4ti51jrezeh7clwgj7pbsj4ln8hwz',
                fileSchema: '6scljt0z6jq108l3vie2za0nbeibpch6hs5uu3c84a4b6gtlyt425ip7tag80c7cwwkxqn4x2o1h4sc0j8ojx8rqyondkc86ez5u3ifcaskjdtbq4qyi14ongiae7bcusb2zn2svnavoxs0mlmyuj834ekisg0w0z2lawltovlzf7aaa2hvie1hcn6w6b9yskpe7a84yl2ercl9csek8dql27macdqdd0aqu2b4mtqpqg0z33qjxtkl23zo4w2z8bqaus0jsu9b0nb3wsugpuntag0adc8bj6t6jtem38eqhe71di5v9hleyubytz7olr2inz4yceszcwh9ug2a52k7kpnmlumlhy36ihnr50ae2qfkuualecajfdev5mtzdka8yiwss3mku3o01x9fu6lib3gkwxsa1253unr3h8z9z5hlj4qci3tuso0arsp4q38lpzi75e1x0niwt322jb7xd8hc7tygiooz4nlqd2p4ftepnm04hw9k3q5jqvj6nzvuagucrsutwasp4vaxk6fdewzp7qkziiy8cfylrx3vrgd8j9wglmtkcgu7iowsqyyoki5yy3929fn8k7i63u9ulzp6lyquvl2t1l00jnmns5g1lhfzn1dqfm45i2d3j8yhfz9d9je24uwv43kwv5yvv0g4cvf77gin0yb8i9ltqh5ebkfejfk15mtc0jkzmz705rieu3wqs8vjkj0z8upz8esfn8rwxcas3jpved0f36bbz81t5pb2kmabcm5cwgj3bio4jcgme6e3vp0c7phi0y51zqahr1pwe4x1jv8kts7l5n6ztpabb6s23n19m4lqb3d92pvuwboqpsx2ks3ag08a6wug2j82ba5ka2krzbbvblfn8y58yybclv9eefyhrw6cymmr5x2dw3gf0xw4wzpkedq1go7b6ah6tczc8i26ptyfuhko66bkv84ffr3asyh2jfe39ffrz9v1zuzf9dwszkzbbvwu2iy6hx2cpfmojk2uwf0hnr1x093ad',
                proxyHost: 'ifdy5nxyxox35z4v1hse65l2wyh0pfuwtukc5ms877oge76z93kb2zk35nb8',
                proxyPort: 4443209817,
                destination: 'hnpwson263ofw7gordh1c41ac2ydbkhhq2zztctitqkkxl7ft1w6o3ixp9mvofo76b9zltwal3fbielan8cbkpa1qmvm6gjpooxtrdc051fo3iw2g85bwi4zrq5qr25muqbki9l9rifh3j3ee8rwo9zigz1837vm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nw5mmw7jpikrwtn9i9pbdi4clcc537svsspkwdpzo2kggvaj0cri84uzfui5bhbgdlvbxh87i0q7au98ob5eq5sgwvzptp2pdfwph3ab2cglvto3lfl3mz3iypuhcmvb5qfqheccwkvego6uxmrvtg20zggk0wu1',
                responsibleUserAccountName: 'dcshtyupqdwzaayi6pza',
                lastChangeUserAccount: 'cb30pp9b3gh733a170ck',
                lastChangedAt: '2020-07-28 23:44:29',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'uy7x5hojsfsn7si1q85lrf6sqycqa9uqxv135x5p',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: null,
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '51ebwycrgdwxugep50bu',
                party: 'lrv858h7fpmhok8jlvy0773lflyj130haz9mpizbn8era9kr9gm6wl77br5ukt5ahta6kf03bvr7nqzqwdxmzhln5i68cawkdwnaubrua6lrt1fnfrl2o1gy9plrwh266v0md9bikfjdkyoci4jwe68u3vy53iv7',
                component: 'hofd1pyb5lcdx322eydk4nse9pr1js61a7o22n7j3zwv8hosti6rmwwu1url2tsj1x9xervueguwllco89xff4wk3xeqgwn6m7wrc65hrudh09w67qkx3fmds2t8syqdr2tm7ufwno9hoyubzwjdxiyd6xfdsmrd',
                name: 'h77smwv4f79t7vt6y0lz55703gpz8wpkvtxk2doganjk72q7exgxkgunbdpbij93976hnwd30pxgczuczw4df8lntq7eg6b38tmsrq0ypi7tssy2a7nvlliwic19art9mkuqmlu69gtjn6v5jfz78kw31wj86p01',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'yqku37fxsp37ms0tybb7uqu3ed7rrbcn08walpvcyfh0ktwiso6n7z5gpxayqzwgbmo9shvgyk9jno068mol9jdptxor41no2hyfz84u4z3hnf4z30j2up3yya1mrjjff1bf099b1yvniiwyn00u0m6ql36bmvdt',
                flowComponent: 'ezydyx9v9ipornnvaezi3wt8wbvpbymbz7xasr56tglh42d7wk91wa7g9myvf6ncpjiv37qxisxerntwynzbtee2i4n3344gh7ystp9s2q52dl1ul4q88ou12tbe05hu6fm55q8jdnygtsx0frtt52h8ijz8hgqg',
                flowInterfaceName: 'vkdzr3zntvznjehfonfjunshvtzqm72r0pg74tbvprj92nn0suyublchira1tjn43049cnsnr8ccvqkwm4ospeg2q1fq5xdpk3qeqq9p1fpyjphkp2hyhqisi8kith80dg9gnfdfcktv68ojd7ig2msrnad0upev',
                flowInterfaceNamespace: 'my2gwxoxjywe1u93ti8od0zu1k6nk6tnbabd81ak7zcyrnb88ugg1b4kzw228mlecut0v88j877ndn7qxqbb5robk4nqao2byhytb2m6u87i9utug3etli2u3ccc1cx1pbbqq37rihiignup1x3cm6vgdzptbwhx',
                version: '116jlg1dxoq4lkqqgovw',
                adapterType: 'vrm4in5h95jyu92yekxdurm4kjw88ioysksxu93wqk4234u53101jzx9n0yh',
                direction: 'RECEIVER',
                transportProtocol: 'ypvq0c9pbbxkwnuix5di10plt1znx2dfuithhmt1vnet9lh8510n67uz066e',
                messageProtocol: '3nq4u1xgxrvmasyo1jo4mc3s37ajahnix04h4njuunq5z36vxpj9sc00telo',
                adapterEngineName: 'mdjmrosbfqnlpww36ep1kv5wxkscgl9noeqd8nsrguizvik1e282lsoxmmp6gnotv2dl4m6v5xc14adwily9ewl1oyekf6yw093qi74rew42962jvcod5wm07prvur216xdjqd531bf3bt7q5lb639ud79s6b73t',
                url: 'r47gd5vhhuybsazfcg80vas83bsj61o5fixo6muorh5zw91d5o0dlpl43clzrfd9n7dmtnncw6ig3gd776i5lmswwu0csq6c8ecaj085pkid624ym2a52fr04snxr9pwzm7pwyeult6w3mlq3dfuovtfeq5nsjfdxtaji61ju2vk1bkuszk64yht4kpsvrdkbrkrgha8sfb9e0kgvr5102pyr7xwih6aarg92pcnyyscbp3cd5jww8qxdzqnw07zc1qzrcduqhepoz3hzae6kemdrraiazofy55kncnpuksrtfkquww9919ndns51rcx',
                username: 'qkupe8pjmg26l35hut1zgj6evdf87s3ibx3u94xa0x6ws5yg2kwzq10lbf4e',
                remoteHost: 'xepzh96a04s7al29xq3sfuv80xwwadm9psemma7uo4xylhcbyxrl2nn5kegwhevlkexqssa4h7s24x9eov0wgdzmfcz7jxokeob3g158iueut3ay3cbw9sep8hruei8rzwf9qpcacpihxpeb59477hin7h8heh2v',
                remotePort: 8000260771,
                directory: 'dxqq6t0qdedxic1fgi8iper09rtf357bwl38xb0krd3db65yjuqzulm8lcw9yc6hxbnqynvw439jps06ynkwu25e0mkzdqhh03mc3n2u96h9tkba47nx70o8w2tifmcntsl7lzai0yadgn78ezd725jc3jqi0lb45ro1vq15dalhzc8g7hfiqipsyqsc218rlh6so35830t6s6mm5v7ca8ubjjd6psecs5rgutzgnh52liqjehcpq44vaw9pg7l32qrj8uqf3zwd81tg4kindv8llyl7r0ws8i4qch16f354jigd0xsbnaiso342cic3a2yudozwfda6w6e2kawq9q2nc1ykxm1ewlj7ne5m0l6pq5u1mrvq601zhbmbtstexawtswlikrsvjt6djtxr3gxxgs6ojlza8rkv3vzklr6e8kemw0o7xw754g932ignc9ccxft6jkql50le0jlfjdj0zindicluba3qv92r5r1me8noqditpjqy6unvw7baial5ca1s90tmkdd9aw15rgycihpb4wa5vnyyzi7tgupk6mm671yrg8r9csu6ovaf0g2jgtgqbeo1zkzjl9alxrhm5a8kzhfcuyygi1ggkgp2ko50hz3l96xhum5wcmj62ybwhgsn3yxd9swic0u6gf5027v1u6274gyits0toy12rj2k0k43ufbkfdg55l51lgymfry62l2khomg7kg9xo0r488kylhg1i4qso6aaslvcnejwwn0fj3opje7tf05kbbtvc1uxu4tdqk9oas9i2gtu4moq5x50wjouq3m82g1598jy27994lpw4unre30t15cnqjls20xqinb64zz3xkail8ec6jgh7egqhi9fytwexkiabxqzp8f1d08bara7307496pu6l2swqg1tmg2ao5gqnn6ry7fsskkjms591mvwd7ezqmqnjojw0rwyrlroypj6ide73zr06d9e46idmghfoh6ije9glmecw2huw55acfs66501uz6ob7obt1',
                fileSchema: '8zlo6np98sns74xuxpwzc5mivrbyfca14qab80b8b800k665izju4idds2oy7qcx3w54y1ygpln820v7rq3ec498j6btri0i1ax2n8adtwavrt3qksn7l1gd2eoo8wpn5725emy304k4gmuvk30gv83jk931y173e4x9o57pn2ui68lbweroxo8zayckg8hnvoc4xdtor31wm2iae17m85jaw0dhdd7fiadiuuzvpv6axrtnnxg12fu4c6xi3a3ov3w9ztememgzb4ji258q0p8errmcrh9mwma6t5dfk6iyrh66472trp4073qz35u1z0lgg2ikwp7d5xifno38nkvnebgl36t8xslztby73m00jghp281ri73xm49p93r8fadv477qex3d9urvr6l1p9ii8z69w8jflf4glzs4lmwtiv2y9izbvhb3ayovt8tagte2pw2kcab0rnoa7b3u2340xh4pyway9ufwial8u5hlz8r5qyjqfiz9pdaiv30c8yt23lr7f15e8lcgy9cbvso9jxz090n8j2p322wvqanokhv5glbskgyimkjtnm0tzo8filr0atev9qpwo5dlj5e2kf3gep37tjs8xe19nzitb2cfh6xc0qa016omg2mebqg5ttvhpuya2vjeov6jy4anstkn6bi6o28yl7sf6ya1k865xog3g05gx88ili6yabktx8y417wzwmsiv5hospaq7vfk9hyd9ro44ixeblhyfur826rwzvd2f5meula088uhb1sa6helfaw37ibh5qv8yc3f0rpc8rqmv0b7w3p77xftonivjxk5n51qolw5ul4myvuc2o7ct0dvghc5htyeo274wf499mn2j0c7r8lzgj8x16857c1dpb8f2d7m7ygyuurrbuy08cxpxt9tjm0wgdh418n7r5s0d808yq2eidrcmkfniougdp9mrcvi3i1d0u9rtcqna9u9z6cs7nu521ujxecxap9it99cm0hjybbokkqq0xyu7qmrwsep',
                proxyHost: 'k1sn0sw10p16rgirbrjo8ypyeufy411nbgbsuojwrnfe1q2edtxs3oszqdbx',
                proxyPort: 8103838662,
                destination: '2hqf92oqvfdjtasem0yy4mxklr6sodb2z5icn7b0z590zq9v2akzzwj643yuk8nn40cyka45ee0qcp9eridxrhu297h9ljgvtbczmyzr6fylujbrmqhoawn38si37q0dwx5sh5xsubyof9d3akhbgmuhnb58yxcb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x9s40xqnh4e8j9shwwtopfr7wa3y2xd1v5zq6b4h19a1ce13d5fev1zwlfyuqg7m2pp3jw9qhx54ju2zsjg19g6qls4hciz8zia30bqeu379792txahp4gls8sarno80vpivjuwmsytgvnfolcplhlm4dusffru7',
                responsibleUserAccountName: 'i9hm2ypee1dppcag0zyz',
                lastChangeUserAccount: 'nf16474o9x7se60n3nb3',
                lastChangedAt: '2020-07-28 19:31:40',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'q0icvdg3o4p45a38nn2onpdu0ax8g3fy1ax3zs1j',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '7e3fakjqkz5cd4uc1rhz',
                party: '9hn29x0gisdiyz7wp1btepqmqkktn1u6skdn4zf3p3895kqws2snz2zm12en72fznmed8asy95lgb6ob0m31gmsr3801tuzsf61yqj8rb4fv922bzhsx1g7sfn52i07q5ouq2eemystr31i7sw5gsvg33ntnr4ga',
                component: 'yluzho7oynmhmzqk1hntz7abq3x99cgodyrd35jtrkx5tof1pkoitp0k5wcms7hnyx7zummbx9ddtol7r5j8eiketyn7lnfm6p2r4sopx5hhqn6coofwd50fgdep1fre3ldmt8iop3b5a5zdwkw6aejv91cq2bu0',
                name: '90bo2gs1nd62zd15bslzsf524rcsmisvjvg40d9zx4ir95mn1i5tw8t75giak1114ev8hnuqqebevcgdeb08919uoue54geopp0c06q8abkc7bdtbib2aobe1eip12ubl9oy8upzsaxiecwxywfb8ul6fhun30sf',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '2hooutinzc3ughcp00bwkqff34gwcfhsu2xubo257f9froev1q47vbtq3va2gauf4nxzs0ukzu1sapi4pscgxs18fi7ei8qutn232xv72kqvicof65lu6jdadba20cqiitem8cpdgd19fr57h04a4llmfy1yj8r8',
                flowComponent: 'yrpkdgfky38e6jz9axx0qlftmworbv8mmq7xi6xv5el5apzgxzdmfq5o8itge6h9rydlgn5bas43ivc1tq3gfva21s1fskw3csl5z8xzkn6nn4xw8e41hcj34d1rlf1eifxcmv6pm4rbi628yevus0s5wdd5ik6v',
                flowInterfaceName: 'cad2hifyzq1mgjomrvjo5vb5dh95clo6bohhi4k7ohwqzzmfvumqo1p6ea3wbkwdzebyqtpqc1faunc5u8y0hu3ecn2rvlv6uck5v1t9wgphw913g8kcqkjkj8h4l1me013l6f3calpm0z0wm722nt24rhyc9sss',
                flowInterfaceNamespace: 'gouieyxbbvqhgjzba180hjj340dtidn17b8wfh8nihslps1jha72o5l6ucuw5oc0siq4vdra5a0i1phx319j6jlqfvnt9p37yl188imzwr3act2rq3grpxy9nubqhfyw8winjmq0wxij2sa40zhyd67xt1ocw6kx',
                version: 'jce1d8jac0zj4tihh330',
                adapterType: '0emey4iracvslufp40xoxulzqzhoaypqkmhit252176cur0t5a3ujh3b3k8o',
                direction: 'RECEIVER',
                transportProtocol: 'cu2uqo8pfjy0uoixv9lz561actlcs3pr3np409kr211rr5b4jrs9estvxtg3',
                messageProtocol: 'yzwhnrrai32fadyi0v4h735apa7a1zdt0k1h7z7e7jkek9tvx7erp3pdcotq',
                adapterEngineName: '0mbi6e1915ijy60kesci8oejtgl25elu4ilwm756ajsv204r1dlysfg7l5795r13pwn7dq8ykor149t83om13jxffta0ojnq6v3qwalq2mflyg3jx4xf4n7ce5bm64j7zrmlk5uf2zms02mx3qpetr6gxnkb8dqs',
                url: '9wak7k27k8gwkuj90uh6mi6q9j1s3kz48pi8pn82z2los28931gcff6jq6cq5nnl9ei3rsig4167wasidyqzbb8e2sv0vsghtd8yam014vnaji8j3ebx748u3lyeqfspzpijrgdz958dwpbvsg736x9tuh6byoosyxg04igh737bmnmgqa3miuggllifbh37ayr8c23okr7sojmozefgjexi027ujrpkycrb8gasgfe4eibfg0q4i05ueycu7f1acm0g8ikjc6l3k8f3njldxo97ztx82t5b3d7t85h9plky7al6nd0avgp8n5mclvh8',
                username: '0rfhjh2omtmsuogfjri3qyantm8iqr1bde85v2eesyvuhijb7lqmlicwan5z',
                remoteHost: 'niu8g2uqmx9vx6gan9t90hxl4gdvng3pedpzylpcahgj1p0tjtupvcxhrhqlrqe3i8yq5ttu0tpv93ma8ocymr2za5nb1iy7turi6n4no704ezfb998r4hq6ux5oz07k8x5lh43s9e5c77gmr06onnomhpx8ltj4',
                remotePort: 8180122197,
                directory: 'uy8jbnqosddwm9inovif92u3wrct1hci88k9h61vqvdce8hf7m3y6jp8nf1vu0w3kh4upmi88vdcnpl5z239gyv3hn61m6g71e9o3vs9b0domgzkssp8yrbvwedtmcsl0uqpkxchvhddavagb2aokhzfi51x4fznytfb8l9xerzfkgi0wmqp5zssewx9v2rlbjztabo1opixlrfb7vg5pexc0oue1tcds14txoaou1jbef4rhmp6hklqd7lp9ukv3lfdsj058bse937mcdkomuipa1j2xboh1nfrjzwff3bpb3cxr3th9sbdsvy49wj0req4dadkgu59tnx605lzhnwwqp5fe8fazlg0b76vypch23fdu9nore29y87uidj7x4gxs0eswo2iicmgw92rl1j1ho10i3wyf52gltbffwfeaorb539q5pc7lt11k347ijj2v3a459tury279xw9thk5dpzn6ihtss09gmhcyu0s6ctu5161bjh04d9auvuy1vqh3rinu8h89d64pydvf4grmrte8gvt4tfo3ghstlp5mdrvfr723o4cuputwn6imgsqw3aqt49nt22ceeqxrt3nb4ugowmf7rwei3wv6n4m4p7791yq00phwvv5ucaw16oki7tn5bc0bdqwrw20oy72shni26dpdu0j3s4ekmeczi2bgsgpa9ztyff3gkgzio64t2dw03t58icvr35pkf9ahjcdibjkduor2fpy3hiix1w0c6q8iuxz97sqz817ykpsb84g5byd8gnscu4bds7kw818nvltzyvqsbnuo06qupo0lvq50ai0ohk6if55aokjx1snytbxf8t2fls8gbhb3gg24z9bligeshezpkv1kqo95xqrsy9vs11ui6rqza8y9t7yn7jh3gl8ldastvjzgusdwzo0vqriutl3r2dgkxs6bteev6hbxja9wt2on0foii5gh7v4g1nt2eapndzgo7ie7pivuwh2vn64rl2sa6qnutscko6fwp59rkr2',
                fileSchema: 'l96c3m77dh8xkjzwn5zsfkan8kj8v7vp6hm38z56s469uz07gks3e7b5968kwg2g1teb5eqzwstuywpjxru449jcphp2zcbwpv3bfoidfanotu8urfu0oruwe27w1jxp3yij2weodipx5s7e468kvau25l8r4nlol2aaxkrkbsy7bdtll1xv6muqq4jw3yx3v3rkw6d3u0e7w6kghvz2xt5lpnee100thlmngv5v0fz1ci8j48fwzd5pzm3g1d9gfs5s9vok8r4fjti7xi7y9zzsxmyzmx0h3zuv98i7dfj0o6egwu65df24ksxfzdga6fiyhaw5z19d13icvedvavh4j0qf2szad6q85161hhfocfvy4rh3l6lsj0ibeu5a7crayayv6tkuuxu18j3ipibbyml938wkd7n3zh4mi60kl4u1i1pea3f17r7e64xtj0lvpvok6put0mtds70lfp0mo0wl87cjoahpsvf90o8cd5mqfqogrud7ygwixjj6mavr6a6bc5s6mp1qcqy5hdrt62l6leff39lvs2o0q5jww78r7ene58w5fqsnovcewryqb9cxulb1si94vu6l6z9hl66gbfolspzlegyiviaujbusrwh3sxs8bmdwwkh42fq3hfqoujqca1u1jr55qggika2m30t0xole6tri9lnb836iw530seoml9pp9g8xehhvbrtxvft43i88bjmjjt3e1tuvxr61ms7i3z3virgk0yllnff7u9yk0n3088cp62g88o9riiw2j1kb7jgmktwn8qzogqjoqa7mipng1ez1m764h7wru4aert6qclyndoaf9a7hvkl1xe5prmxxzurwwva453hg5awvz4vkj0pn1rihkllhtlvjv53k328mglfmxzk0q3er815w5jdpw8cb8w2u3bu5nhkulg3whx1243j4lt5yyrjnh2ikje8p7cy27ls8mhz6ommr3lz6l7s73a7bzip1d459fab71yduyydwzexkf7cwz3neldtc',
                proxyHost: '0k96zlafni7hvlnyn4ksx126baw4kbb15322yae4td7lghxswjf0vksuxgab',
                proxyPort: 6512386038,
                destination: 'bk3sgcj4unmnvuob3vbp2uzd10imibpbtbzm9p0jvqgmq39x4ti3fjghj45pz91rd6qa4db8bfmpzm60bnwylx51evt7u77wu4b3uv344yutuizq2dmbuknrisy497xd56tpikr3d0xqll4te9w88p3uf2rentoy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4x0yklpl0fz8pth3jx7oi81cqmzxjo3wo9kmtuewk30lc8v6gxacjes8oncj37r5i45idhion4jd5hgmyw799uslycmrzhxsmmuezr59k5chayfedi8oive53zn4982gzxgumdcgi605v2cplch15jwfbeb48z2t',
                responsibleUserAccountName: 'zz1walwxngc7jdhx4pnq',
                lastChangeUserAccount: 'qtwswlh2ap37g7c14i15',
                lastChangedAt: '2020-07-29 05:04:46',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'hvjly70br65mm8ru1mz2vo8d10vymjdkel5gwqn9',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'n9jh5hcgok2nh54dfn4ju181xjybukq836j8s2gaeixvo7mgc2',
                systemId: null,
                systemName: 'niwr18p43ire2jl76cbk',
                party: 'li7pjz4apvb2mx8u3yidzmna1jtj3ogvvk754a5802ua4xq50ui2p2vlsnt31dc907bbg05kw5i6wi00n9pqa1nrcfy5ezbontp1ykss3fhrtm0jg2lgk576c9j38jfcy91liuau6y59nnofdc4kymy6d9e7pzzo',
                component: 'suaarv92htligy3deyjbz13uply50nmer9v7guopy5ouxmmbjwmovr30gfq3di41p1sc3p24g2jutgi0pec7e24glhqbxs2mf2mw2ks3no96tb9jhon0orrp8s76fbkhog7mfxala0m267usuhrhlqo2dfk08gtq',
                name: 'vyk05t07uj083kbr3f9297f86rvgj848hhpz6z0spdafl6uuni9chm8m0876g45j7auacdkchnzsky8fmkmyylg001jmvvbr6jifpz36m74er6j7l8lf90keqr9mx7z5y7wcazkpbqjiuq1mcyzwlym1axu25ysx',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'nzb3f70wjsax7weg4q7v806op8owdqw0kvxra6lfx88n65fjvaz2l6ra7kf0if568lyyrs6o3541dsyvhz27cka6ahb9fmipegmm52qw4cm9tnzfudapazejh5hsf7jgn37smitakbl2g6am04iv16wu5f36d9q6',
                flowComponent: '34ht4mlxxz1p7kv5h7wnn78a69m8bfuuwzqz71bmnpgr9gjji5w4ij0nd3qmp9413trgwar9y511q9cnoosvue75tz63v30md1m2yzznns09skl2jfez20auh4j4uule805tpjso4g7v4zugf8xufqkdio4jphge',
                flowInterfaceName: 'f3baaus4ectgoqpjdshmfqq1chqz6nqjz4cu86pf62y7q5n4l460z9oekr8v60wq7991z7lkgo3y5b0pyleoovnp7t75pp7237payq2831jultxjr38jx8bknc494s9m0twso1t1c7ckrmjtscpkst2qgyjkg03e',
                flowInterfaceNamespace: '8mo1rntjdogtqg9bkn3boesxwsk7owli6odlw3frgjuffvb2j81u208pyghbp2omf491zwcee34oq61jbnioc52dplhh3l3p1fpvsccm9ck1pe95hlb4f1oxohmb7h5dqa22wope05r4h8i3nkllpbkocyvx95t4',
                version: 'qbe9mmx0hzlacmdcrvo8',
                adapterType: 'cfb5eruof3e5xmcw0qsqj42mido5kvbaqspkzg1hrmd7nd4yqqgce5izgfkp',
                direction: 'SENDER',
                transportProtocol: 'rhkme0eftlsrx26hohhu37g6zelm3ri5c27wpys87cehu3khskn014fqbeom',
                messageProtocol: 'd29lvmv57q6z690rrj0qs2x7pb99am0e1th9cwoa4viqsddzecay8odfssa0',
                adapterEngineName: '6frkrkslktdwy58o0w7susaq475y6rrhwknu8jfmgt7vgigfc4osg1bzqrcyb1n0jeawikoxbko43xenb6urphdeecqeoh5e4odokrzzcskcaw1az2oytfxq86kk460yxvd4ddl4a0s7o1osn8uya3qll1vacyus',
                url: 'qychfc7qvvlw40jafytoiy0a45nh5ohuvj9rku8fpzpr2pse4n844xwj7t518lnegcddgzyd7qspcvu362olub2ux3bgs976vi28nub9uwhihylzmmpoetvqnbd0cbnpg74v6qisikqysw61vlotn1md79wiqk75ghgbce80fqmi0a45jmeyqapm7x111gfqdc2svdr85ucnppnoad7soexstgcc1hwi7n44im471vw2txwtv9d2akhzvrsfqgqvr0law8wh8a9m23bv8dl4r3jxx9fflw35mxnzqa1t8h6mlt94218innuzxvbsut2x',
                username: '4n2hq9xylw9achigjaik03p72468fjv4wnsp3hfrtrpxz2uwrgnzk31m7hid',
                remoteHost: 'gxw1b824et9d1ks970om852tusvvwwmjeybsi09lv1y42fd4rl6c1c4zgt1zw496w255rwvqtcjiycddygothzbthipr9wj9ke249gt7a9eyvrmdeo2ugy8obpw57vjt9exa8g58rpf8o61tdsho5o9ewstt5lsz',
                remotePort: 1842708469,
                directory: '8u3ooeefoyflu6mijgcjosyipfkqj4xikydrw885pf00w4ozercnpzouvx0ef1qe7fed9themrq7wfe938x0sdc7fylmh3vqsydo9a9wr8qrlgvs81wqam6evdklqn597if0ybok3snui21yg27lhxdhndfbi7fkz8h9q8a0ztxc6ovlseatfin8owtz62rbxe5ut58jy4noph3k3zf75cd1fm5pjbqjp63stdfczl0xtmi6eeqlx8d4co6e8g4vd9opvgbv2awnuio4ufzox4iphykpigrbhamsf78pynf5glr6ck1qxxncy0gucznnpqd0sva1mfib05ouiyivgsicwr31i93uspf2klrtp55j7qe8m7qjonwc4swqhkd2nuwiwvojh0o4eidwg1d5yrc44kx4wizibta2upjgfh0272iejzn7oed0cjtjanu3vqk45c2reoetltaq4vycrewd0pa6bmi1ke6tjqs6i187ecufb1ht0b566rp5mri681nwke5llnmsfiipe8kwjkwmtun0f1n3nt9ert8j29va6ih9jvvc6lcj26hmb3lm8hoj53s8d41k0d09hj4jv9nv1z75bt5oiza82cdbjfe8yzina1jc2geyka01e928ziuutayf9ymj328jl0m7rnd694npix697kan24dpdlbl5vx2535i24uuki5truvi3j0ecgone749zfievtbpcjnbjf6ys4m34t09oewdbu8llfiz0a66vf3pj79zhwo8ekuos8j2quw1kgbgirsan6e5m9hw3pblyxluxja7kuxdqg5nba8ybcno3md78jswcms85pywqa7epjvbsbhm4b69uo7dlq4u2ev9q32ev8svll3v4fjyfgmgc6hw4o2v30gae2ryhnp07xjyffjeqeyui3npro0c1tk7smzxzqjyxp21xwx79w4soka9fjxgd7an7f819xskjdxti2y8nv5ba7mq1tdjtig4gg1ljogqb5mffi0l8kwdozx0yds8',
                fileSchema: 'p895fjouey4nyqf2wj37q90smgsszhu3xqx681qklgj724m68jb3vbxqwhfz7mvc0aj29dek3cen1akf6c460fc6k0yhle3747rhvndex9sx697xr3tq4dasred9bm6wo5yr3duwz78m6m09jjyc5jo2t25vmgwzicqnjh1gqm8p22j1jcr8eenswzhvuqumyrjbpqjo1mo6t0jt95n17gxoqvwsp9luu0j6xuv4lwbm2rgj3kr2sww1e5ttdb0hk6t1dz19t3kwathjrv99nye17vib6tqcpnfd9i0mlam2576aut2verxf3msgdu2hx9dxu7ticcyh2xaca5th3ffs25zhq7b29me4cxallc5hxww0ciqqmdcr2r5llpivvfhfm7nuykut3c26m80h89ifftjh1cohmspaa0qiwb9qdtg43zp6gqpn8c9i6troixvaiq3vgrk9h3bn6eipfxh5y0akftcnws0du6u4gyjlh0yzvjpqcm0elzu8c8i49iz1bo8s804igpvv94s8kf8cc18ardwr28x7alqpdwuf5lj7va5qev28nyw46vpzgeggczwfua4kyvje2in8bqd7ecpp20x49gmuv4m3lnqz4k26iul44rjwyowhxyembv71bez3bi8w6dl5izqj1hb19b6a4vht9vtvssgw8nvmf53id5zyjz6g4l8qsmdg3f6lgba20rh9g1y544mzttqj9hgu1ucabekbrj5uzqog5cbrh6rnu5pceq2g18depjgjbnnec35ufid4z8dreugbr71d1rymf9miv0y9vxhp5tl4fxxx2imrwr6g5bqlg6usx8a9uw9362vzwk7t5g8h0zpo8uzo9ib7wh6i0s283nsqtupq9y3gk0wo63x1am2pgetme6ykd56fu62nsx9jyx7moqy2qilascisk5i80jpb3jywe91opw3koba9jcr60a8sgpev9lm2y7kmhgi38ldemdeeiaqurjpvp7eb0if8q9ewxgcz4wivk6f2',
                proxyHost: 'ooacxld7qgotlekryk3jkvrga7p7keza54g1r6keehqe6qn22v9h83gjn5dq',
                proxyPort: 8220819497,
                destination: 'pqc9bs7oeh28xbztgpwuhbaa6uq0majlsdzfbw1q5i9rimn3tp7wklhgoy4zs04uqtrc2k5i1e3tl80ktm8p0nb8fka7kmithbcqbdzj0natqzinbxhwwkusz2sfqekzavdftlrpfqhfzg5iu4v22a0bago5hepn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1keao9dbpcil7bg2cgue6a11gzrq56ql3x3c423e6wqjddmpjri1xubwozltjqa6t4kv0xl1s1vz1m80hncrs2y4q9n7akso6xdf66ucrkbr8v0ok3h53kiwdhlt5bfd7ex38fvgc2t7ys8dcz9lvehghur4owla',
                responsibleUserAccountName: '03sv2i7qx4v68gi6y13s',
                lastChangeUserAccount: 'lxt7g7izxwyav1rnr2pc',
                lastChangedAt: '2020-07-28 21:28:23',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'f9bcf31151mues78c0cf6dxocesu5sh1mgdowm8z',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '16f0fozel1mhhfz5yw28ffhvtfrz67pomronbuvidsd3kaq0u2',
                
                systemName: 'mq7lbboix5a75aa2hxyg',
                party: '29jv9i7nvjxm0obqjnv4byrzm2f8zhshufu7rsqds8uv63m92it1l6w7xrwmmifpejzgp5ndeckcibfzgxes0ph7todru5hk2o6zmi46g2dfqazupmb0btgwtjjp5v6cjxg41cs1y5bhkbnuphhy0gf4j88awe5a',
                component: 'or141kfpy0muu8p15m0o1w1psgp8pe4s8maqj2hr11d3dpy7wenaxqlyo7do3f350p9fcl4y9s78om2yluu14vkr7br010so845eia6eiwjw65ahja5csp79j2bhsspbdhi2wtn65bvecgu7tht0wt39qrpqs84b',
                name: '98m3o4yz8u0pfjknqtar65aeldkxgf1fobux1u2ogdown6ronzyswz4g7hh32ooahx1uvrqhk6y2kic7yrmecif76rae0m1s9usjs743gqa25vstrnr7l8xl67gguk4n06ivhcpexuf03on4rp76my5ud2smqqm0',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '0knmqqnizmnhi1ulm83k82lyy33rk8zea674ax2du4k7bohkvxeolxhz7rslst6i49tpa1lhjxen78cfi99yosfmhzm1mrhzp5wn6pnb3dnxpsrd293g75mtull6x50qes389pxfz4s801tl01stz2s4uhr8brjr',
                flowComponent: 'n70spw6s7ussh6xfb7ecf9v7x9aor0pib7qn12j5dmxg843jtj1zmtxuu718giwaspnvbuz0l7yw6nfu2oh9t4l1pkr1f1lsyklwr2vh65vp0sq9rpd2orb1cwk99nsb6cmbvcg6dlugy6ypwhrvdubxeyl94cg2',
                flowInterfaceName: 'nigmdh17runy3i70i68vuq6xothrw3n3aeibdeuo7hhuxqdbiefcws1olzo9ktrf7f1p5dmnvwrzpg44ajqzfcoi7wbz1v2ta40ihnqfba3klz0nbl5ljtppm6f4qx5l5zz5jo43hv0yxv6msrftnreex39xpgg7',
                flowInterfaceNamespace: 'dm7t58emcw5jr6dy3iy3vuqt0gb34zh4zze3lqest70yt3gqq23wzj5qhzowo117ugi5a40nfva3q598aqy5f66aqpntepl4wthai06vew1k830o7t61ogtvzvktyf2lhq5wz8cn1hob9djsgp163xvbjyavu6uw',
                version: 'yjt21gs3hgjmnnswovue',
                adapterType: '4qu9h295e7qu8013fpxt6w3lvm9lc3jf45wbt4tzjj5mjetvkwsthiozmhy0',
                direction: 'RECEIVER',
                transportProtocol: 'mlennr2xokx3zvtng7epqdwzkk8kvlhvpu0h2izs25iouuam1h1n8crjw5lz',
                messageProtocol: 'fxgzjbtrccahzdpoggc5ld8ld3muy5snirpent55ayqigqf2mkkzx0p8xv1j',
                adapterEngineName: '7qoio7ttve4ikp6m9xbv0m9ygbq0aya85r7ne44k59ntl8ylrnmy4dqcczhel59xeaew5dmbtkh5gavdezsdcob47u3z706ay5nbp7p2l9kild612jnbxliygtr02m03vh31q57ydj5klkc4oebef70n8up3t2q1',
                url: 'affkl3x3zwtkx8hvbqzak58xdc3gws0nems3wp7oq77il8m3gkj3nau8ce8kk89hxq9w7kcczfrzwqjrv15kres8q5tksq1cxth1wyxi19kpw4pmgqzcpmasciixzpucjzw6nxfahixys6ckvuta7j7dn8ulak8rl6plkj6iimka3trqm09dmmsvilfjpjry3l00wif2hylpz9kmhnym0zxhay9yor36ordn1wkiadvvl5upezzve1bdo04bealgqtbnp3xj2fjiqydev32t486p0p7t7clm44fgu3fhvjpepqbspndwehvmlz8wzb6u',
                username: '9bnvsg4xoxdia4vk4ye4y60rb0e9kbni6fren733eytrj5p9ar9avysq6fnl',
                remoteHost: 'eljl4fgyccl8pegic3wk31kva50k35966x1tv3o38tfndb49imedhjl8qcm4z512lw7qm4s7pq623e61iv7czkfa2g9u5v24iwc2b3seffs11z0rdm5gc22f19i8qbg4c0ivsnfsrz66q0v4ybtej7yl6fuxr6vo',
                remotePort: 1986150635,
                directory: 'r9fz62lwo1kpq4u136i420fhc17dtdzyhh0hns45zodzupvmui1702qp9xch2ra4n2oye0zny7q0o7fo2rdynyvml90fidzvauimgb307e6gi2wcqje2hwy3ne7l5de4dnrvbizg3bzms8g8d8aex5ozytwhgc55wjjsvq459nq6894b4ssumlv5ej2fezdijo6xsy6dsqhhrtkqb894yvs6x1mkowwhzvloz8hu42w6ky73ghn83u8wwfabdh9yw8ui9o1ouxwn9rtplubqsqvjp3vmf73gq5nqh6tbnjpnlhc6vrf3ab6470so4poegl59ma6hcuh4at45ov8es37mp1utt5r1mgubcgmogu5u0j5vex9tysjn0ihlt1xbac9uk3g1dwifcq16eogm1k27oujrynbpgb4qtqs2nnbwbbbgk6f6f2hfwnuu7uwqfnelehaclfph2o80vb5duxyg69zioqtmdbbuyf6hx7hcu9h7s25n39j17cqhbr7aoaux9wlgik373n1biyiyyolipep136yql3ci2tetz27ln0tj5ka4q5x11pmebd4rl1pgte4bw0nld9f09q6gf1dg33libn1jv41pct2snh2r44tzcql82600i0miqmqitictluxaskpjhlr8zehu536mfap89k3sqs9a3jzjm35on16rqabm8bchfkq6x8yvuaapvk81dhf1xi6e2mrr8bfokhuztodt4ws2tux1ibwmlml5l1ug4niexge7y24gpxiig89qq17rl3wojs7bcf82vkl0ozo9og2zwvq6ickuqucr377tne7igsn3fuvcqgaqcvjmd2fmy542w9bgudnhtkxsdxbq80ui0cjr0l37p7p1foiyt682qgr745y79g9hx9t42gbeuaa6n38g0i2mj9yv6oh4zrcqncjylm8q2yrm9dlturk92uqiokduap8exejr4lvty2jfhxdl7luspjz80qz14tj1rlwbhwi8tagydnsrubf58tl1tx1j',
                fileSchema: 'koxrw6i25c7rtsj1g3mnze6g7hpbwxq7mp57bmb7ac2z4gmzxok2wde4yebexez5aipwcmnuea1ltrc99zz0i0ptrtbqp78j2hf8n62bk26rten6b1ad5i5n3mtnfw2x26wqc4h5uitscwsfrb57qj74oxqjumvmz41oqoz1tcgcimcjdqo037977jban3xxe58qqjjs9xizzmngx4wrnj3qkj4qef6wey6zsgq64hcm9w5y9ciq1enrx463kgyex9iog9tcdua7fmg2u0i2daf48ofqlzz2ulyro8tyc4g02h3aiuzdy2thmimpijew36x4q2g5sx7f327ydaz9f2mqew69iik522saiyothc9cxg1l0nimz7n6zjh77wupwrnohy1e5tjeugdpgy81v9jhvfhpj3y4la22w5ge0mhknjvg5bej5u5bccweytk688aqjyxko53bhi3lribzwi8wrkhmw4lmmx9toxjfd7ktxu2xvn0xjf88elznve2pafhq8zb82vdfyqpl9hsa3tovkjczt92nu4jf87jjt2txue4dxd6k4lqfj8mvcqmsfh785fbpyair2y4p2l121jxoz4qm5tuf0zzd4r6gfbgmiz7xfeyyhc996kbn5oqngrhyle9dmr0qz7l7xujg815qevrbq035dl17cpd2o1pjme5oc4f211i01rrpubgmdnyde2pcsv1kf4muikvmbjxbd4ioprhvslh0d6n6iyql0ooiaaleuxye0wqja3bcwtgtkrbo5crm2v6u6i3n84voo9pjswzvl7lrfxz4zkxrp4yqmjq6fvnmamea843ttg7tazjz8z70bjd1usqz3ox3r2riaw5ily3e4hnx3z5rwhs0t3fnod9jlofkwdumb42jy1db4u9z9xt51e4319tn6l693r6vmk3drj785dc9a6hkzhg0pgz8y3xg320zz1akox7d6omfjkfm53qqjizttw0ckxagfjhl1w4noyoec8p5n3rgcdy27icelq2b',
                proxyHost: 'hbod0cb7q9loxwsfvqtf0ckrryes35jomizbvlrntkkh0vycvlvd0iji22v4',
                proxyPort: 3188469030,
                destination: 'qr5tc4f6xktdtvwi7b1q9wyq91nl566lavs5pchx4qd3j9wvoybv4r9bzpesgsryqvr56kuetsrwbh31om3yh6jgrvjrw8fny9h3nr4sdbgy0j6rnupkrh9gljcfaoaqrn2amtegw5iv2qudk6m6oyq2wv27naqs',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'fxcrux56mtvywehwbxx112hljkd74xvuiqs8bx393a7ufuzs37yuj3ch1xkac8oh798zyxk940r0o65i4jsvlxhc53920zlnrda85dcmpa66jeiu9jbqtmk1gacu3umf7wjftg7uq5jkqep7b3g9phdbjetela2f',
                responsibleUserAccountName: 'g82ct3jdyq3gjijggb8c',
                lastChangeUserAccount: '6oyd9j2gl0vtp3o8qygd',
                lastChangedAt: '2020-07-28 20:51:00',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'sxp3swxlcu0pr7m37xf3a3yzl7vousf6du5uaufd',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'iikgzd9f7vte6xfqpxignh80n7qsft0aeh630f0ix7ptc6r8q3',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: null,
                party: 'qk03mhactvpyu61344f6zmexuxfhnptyqejtinrbwb5za3jgi6myj5ypicd7jqcoajxbry2n8o0p43q7bchvoqca3wgkg38a6vd4l3f1a8mwusimba70gq7oxw35l1qmiy45n2wik9rf2b6ektmxhwp0grhukrhn',
                component: '9j0ocuu9mbhf4utc89zqmdl4to57ywm9zv74pkl59ozzi2r5807jpuxfwww7abbdpnsytml39i5x94mh58fer8kla5yenh7mrhn5vb95uoyfnu7fjficjcoo9ppas1m4dvnwhttha164lubvknwim2vg8ieel7ta',
                name: 'an2zmbuievylcq4falz8xbkegukm8i09pj2j8559mhe4iqlv2t5v5ao93llsbed8glqr4ivu1g91ys0azzwh8ihq50r340fgiaeiktxwmvk7vpbxo2vqxrrkwuwqfj8yjx2mym306kvfxxi6m8hwir8vpdnkswyc',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'fp07mtp3jikg9uc47jst7vo9gidt8qzrms78blql6eazk5xe0biz84ymbil5dmte3698chmex62sxg15bfmecn0ip14z67yzicj15t1ruyk9a1r7oh1tgp9s0bn6xqzkq53h0r08puf8tfn2hrhrxpjbfjn0pxmq',
                flowComponent: 'q41apvyxwbd5h5dcvmm2zhyt6ackyzjc1ceuu5ni7x62u0ph843ub8jz7prnkpz4qc8i3bo1vx4g0uva3zgu552qs5bfz49842g4h6a5c48zx9brortl2zxqibh805z91qjbfq8jy90nilr1sapyhyipsfa06red',
                flowInterfaceName: 'q2erhk1a4peyqe0rfkjz060o4iiceswl2xprefec40jk0b36lqlg7vimdetwu1yagcc34rly96c19f0zt96gzkxro9o7gdqtxnv9i34g62rm8qq1vqnkvv0psciz0r0kkebdqqml61n0o5rrctlpxf9xyhqott4k',
                flowInterfaceNamespace: '08ikvpx611qzvvagwxfaidgqey597pfs0fye9y3ds1r41ab2ebfcycm2n5zmc8ce0v5ifqm5jxsm402pna5jxn3bbxk4izkfpo4wluf7f1ogq423uhgiy2c0h8u6tcow8qwq1x4nequrv95q5vleiyndor8gl3hq',
                version: 'qxr9qf1tscf9nui0cmbg',
                adapterType: 'cxsta9b5rwqx4xtco3d9hbpd2rpx2vpq4i0kjbeiby9jyh2y2y3llqtuok6t',
                direction: 'SENDER',
                transportProtocol: 'b458ar9ftwbb8adarr0nhf7xnpiqny3x6gq67cfkaiw4wx2e40gzievquhxg',
                messageProtocol: 'fbczbcrge9t2hf7o3zo8uhwpcp9z9ifgoipzksagt84uw9tpyo2vtsnjk0ef',
                adapterEngineName: 'sp1u4ll2m1t0nwsej6wgou44v8fauy3i9tx830ngrhbysoxipyn0sl2fv3v1fl7r1eh48ry41v831kr1eg9ulx7vc1dczjkykh9jhoqxppp01ry1n17rxsb4vha78ra4vavjzuhovgyl0x6avdur5jb7m2g8luh7',
                url: 'sbbpy6vqr6jkpfbvrga3w6qlpyc8y8yqunkvnaacnd1smpjjg24re9mkxe01xbvy9lyrtstiy1jpdb20r211aw4k2acc6ljdsfmpc2f2f0nb2vsswsg4leeqladxsw7knzrt5jvvuy96ph4vdhojk5kbhvqh0ted76d6vlw17dq6rl8ewd1i5ij3n5qfg6xp9qzu7grhkeuj1ikcfcjqvpybi3xk2xkeifvl6jq0uqieb8oobz0p9oipj4tlxpte24zfh76fj5oyenvlaempkhd7o78z6s66f2bgkhbwkyqxnhbo93ewpcd6tked43zy',
                username: '55b302d6gtees04dcm0q8ipqlxqrb28nqiidf9ajm1fzqn5vb63dtlwew1en',
                remoteHost: 'q0gfytqrncbtm41uedwh02c7ux8c60uhnd4unemdw04n50oj33z74o54nhf7qdlq4z6g7qj967v0kx577tqee2lyiql6ipiosxrremo1jxdyguknpvn6vwdt1mw14xmazuf56k6sozmdb2bcgonw83lmyghjrblz',
                remotePort: 2789173183,
                directory: 'vrc3d8268lpzbkkfqk3p0a3qjvkbysv55la8s28h88v36mf1frz4z6518acvu0q6q7suozck1bz1rehomc0ig906nz2tbv9wbr0a6m20wctial0ur4cdaj6g6bitypi32g7uv9crhp3bxwptmvqgkoaxr8q14xwgfn6gkffky7859uf5r5ccckkiq4j65d73c5ag08bw0mo0e6xj1jxcr5bpaqcxowj6f08yfneruky4jil2kvf5kbtcudef46wxkfifrab2vqqqkbidnz9fm5fzakgiv9bcx60p06t5q6m86hlqujlzibh46hxs5azbd1v50t3oxfnbh9bmb8rho6n9fz1lxe7mz239tga4grak3ept1dgmmi9u5bm3octb21t1slal7dwkm9lg1bbddqmlao68gap8nvut5h9dow6lh9uopgir24y33vhxhkc6511u9cspcrhx1chpeinx69ghs1h7iez63aed681d9xpcv4cpky845v7mdpdjm5mfhjimz8wihigq5fkwgdkxqd19jtxrhcxrq6ig0flfncb1c6k77meyjrtz2h48aliwn835z6h845y8nemqpbv10c2lqeopmi7v11km6lpddtun1hjckq3b2cbwdxrx2gdcqkaqukfdvpa6tdvb9zlniitn0cp0ffet71vy0fbmo0glrtv7md4c8w7y4qkouflp5xxciobq86t0sa4ezhhqj6mmrhsywgo23s3si0f0yxxtmprgpfca7vljm78er3xojtch6akovg3ozemyqhmvu2repcze74eg0tze15k96j712txvuv95gvfhjgl2b5nqxju8xem9krmrwvky1ce283uju7h6a8h0gf03eazo4x6l9nek3cfl8lghigw7l8hi7rqmsg58k9avrzcujslktxsxrfxfl9i05nx1y13g8l7i1ofni6ftqgvi80hfasrppaoaicddvr4fybl3d11o69gu74254ofd1kegva9rz0z446jtwxkb853m168rbcte',
                fileSchema: 'vwz434hueo0j510hdpjbgovd11kfwgxpgmggi8bf41293972flsiscl502a9gz9va1320fd2zb17rjy366ibbvt9to0mvz84ds89njs3tx1jal8oqvll1mrc06usl14deh8bcip26vqwk631gtc4geo57n8zsk189qpqwlresxpm1mk8qwi54rzbpdzbq00mj3laf0yyuygg4djtzhfsi9mza9hea1asc585xqo7xcf44w6vgdg7pk4483gunpbc5ksjt88np60f4wmz66dpfmi89h09b792ghl6r3vqni7qhl7l8gp90dnnrl83ren7v4elojk1kyvjg64bdhlggh6p1c7maj0twwgq0gv5dj43oi0nyr0gcr1jwm68wovhsvpb3nd5uam7rs9c7z3ym6mmddwjmnj0st8csnebgpa9do086dinivd9i0kyvehqzw9snbp0h6xyq65zae5rm4nm3vzrdhh68illdt58sjaa8x9onwput47b1lwcv3ilsoyglx91dqwbkjqmos50bhaix3x8nzheoe8lfe9m7vd4wyjf0bnnszfm7ifui20al9qiesylb4j8jykoltpwvr34g1tey8sc7xu6zaaxlqtwlzvj34st8e5ukzl6n8552hbyzbo51rkhx4mtltr2ezwxwho5uu8q139ufwu07olzg0zwtux9dks8wmnhzfm48o1079a7a64bb557jurz8ympu0wu93rw60sppoac4dva3yhd7dkmuwwherl88725gxsn5o8k2p7l98an0j9du8vg70gmukyerbib3i2h5frlsv7gen6zvseomnal90avxou3z9de6tzfy19dlxny386td6knwz0g4neumuou124mfiy079tflm31crxi55uy64v71ocija8flcxqamuc9tkd670s99657swh2hwaqjjxu166w41xdn8ub44ji2yth5o01gi5hvs1ai5fm3r1ufo4h3u7sh6xks76mzcw4fhzuklzwiiwg8cznnz2sehv',
                proxyHost: 'mu907niqteacverlqfp8anxyw6sa167uytxih45wea87xlt9dqubrizm5bz1',
                proxyPort: 6274037128,
                destination: 'unkkfbsjgut8sg5coqex527w60o7pavdcy51phlhfi9v6nffok2up9b05a9oeomzz04fmtzghbdsqarsmy6ads65vlm11tfouv777sn9o65z75soyw22as05wn0f6kajh3fz1f3tv4jraahjr0vgumo978zzrd8a',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bzjc3whe9g3oaoxbfrnowwzy2gg9zdwz08ogchujusz4x0k14g73i8vf9e67z9c7xuzk63hejcfepkq8rlcydefyt8e7h0xw8z2e6s54pac7rfoti7oxth1xeecxzbmm7fehsrmt59ozqyyymbdmq087qieaim01',
                responsibleUserAccountName: 'l08nbnbszmox6fq2wgvo',
                lastChangeUserAccount: 'grg7j9tqj2dj15g0xpf1',
                lastChangedAt: '2020-07-29 13:44:00',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'y4e55i3nedgfsm0hdgzes2j86f2dmg88f2ymigpi',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'u5i78s3l6dx0wasd3n8adt4ymquhf6sh2lvguwt1kr3sxjg5r5',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                
                party: '5opa6b8a7xy6tl3741esgkf4y8wy5m3pwdhen1nyazk37x1ybr5pgr946rrbxbi4it3c1n8z1k9yce2w4nyb4w82kt42k143muuebcnjdz9fjzktypxnhagald48bzi7m1hcscx50kvk06pu1qlp8buymykyemd6',
                component: 'nnmjloxt5z7p13304mv4gmt0coutpw2egp5gx78vnmw0sb5x8j14vclym3wb8s0uc2dg5t53pvmycalgl1fthnmt2lwim0g66i32ynl6rsr70f5my6z6lejjr7q7aogna7tk0q08o0ckn4hzbf6twr92v9g4sg0s',
                name: 'exsk8hz67mdeo8ufcibo6bg0bfyxqri3pt899yqupwra2ouvrd8l811xkvu7b7utroc1ly3c3838hjrxykg139r6ipxnnnizu4mkocyq6m7w3ahiuuomr93hcilzys5nrzqzvnqcy7pkv4awd7bhykxtcfwvgixw',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'deyxezkayipwvtgz2ul4nnr3g5x9dv6u7rwzp9joz2aavnrns7kkgg9efzlb5xq4fb54er2sdscup3lg965mppw6uy50ptr78nksodqu7l6pf8niibgpp63gzwniyqyc32n486ivxflyrqh94gqmi3eeoxpj8bbx',
                flowComponent: 'he5mo0hxdl4fova6oldpzpqn1coz84r1b8am9icisvqoiuzk4pwyie70eap2yf3f31tw3g0j03sczsyhj2zxvggeiakd95wrv07kr3j04a06d7z4thlxloyvet7ndqv4m5mjs9ynklsv8o67z6nu022um2v42w63',
                flowInterfaceName: '0v6scifvsrnj5jdqesngr9fg106x0ojehj5u1uvnx88mh9k5fo2tgursm7ykjuk6yftvgygzt2sejf890ulrf4vl388c36biqdlsh8z08piywjqj827no9a9nshwj58soayk9s0ei89cp2z5j0ka26e6ay067lkk',
                flowInterfaceNamespace: 'q88ydrqiawvm56vbge34g9pon2cf2m3x52vimi2w4qm9jrkvrfe6oiynz2m5sz2r9ebge4pjndfeeb5269kthriocljqfgj27slwsat45h30f3x9j6ggyobscb0tw544qstv5tgluwsf04p7h4d9p6s04xr1r04c',
                version: 'pfvobgzv3oqho673xzp9',
                adapterType: '3c30t7a1khv3y288fnznglmwa157igashpyxh1jf3fvjked1hjbx5hrqlmg4',
                direction: 'RECEIVER',
                transportProtocol: 'aju2i41d0eq4o7dw5x6vi1tj2xu2h8wwlj5vqqhwk6o43e46x6rr10anmlla',
                messageProtocol: 'nildnb1jipjzzboqf6zyjh9nnm1cqg84034o97pcs14isuyyz9wmjczgou02',
                adapterEngineName: 'g2ywzob9cbid602lsl3zb721u7tnnvozmngx2c2h04gt9pbi072tu98mc6k3ff65k5hdwa3rrz56ynki6sk71nnmt4atoc7e0e7b18b89p8cbyoz2r4ov7idnryh6sv4lcwvxaqddanfykclgnxmk76tp6haymvp',
                url: '9m8d8r6d65q7nz9ceumt6wmtehwdlv6fd1jayrfgwg3l4yz3z3atia6zyo8v689xs1fi19blwic20m9a5x0ztd1gep0ke8zg3yf9uq9f97ann8a7b0c8vzxj7o4avbiget7640hjm2jjazubapwaqt3c6jtkzzdz4nkl3ocjncsr8txm9t3q1x0m5cx2tn8qwy07y21hzjljk6fjkbm52vhqb0aq4a5ad1eq5ev1icj86zt5ylbxmktzfcikc3xb4un6p3zgce4fqg4a0374cx2agvg2ih6y0qcxz4r4aonte7t6vjtf960sxy2fw8ez',
                username: 'cn40udqnmzzopmpjz9ff50xiax0ni4ifaj06922d552sjxc1gkzm5n2ofq62',
                remoteHost: 'pjw3wfg7hl32j80ijofmmg6e13z46yjhacnyfhbja5161ee0yi8hh3duj1q1tvfrhrghcdj99v169mjdwigos7kc1itzxia66imni047gxgunmwf90xjvyjgizsqna2okkgwl4abjv6a3rtmiubr1ny6tz2x2s6x',
                remotePort: 4505385090,
                directory: 'h92rc8t9omd4snktzflsfmlx67pxjgou4xir1d2dusk1m0nhm4n8eg9c36netynjmjc5sqo1hzvwch37dnnr5bcurt4b0dtd6a3u0upt8seic1abpiy3rbldtwbfqru3qrpdvkhwodva2yoqipio8wu24km3jscq0xuc2aff6hsthbbwj40kxan5y5mm4azg4o7bmrmqqjjq8xpdtzibktlg1jnfpriknpc6nux1xasljid7ti4bvh2br3ha6foussqo5o1vcixrmsd8jsraf53az5fnx8fsfueutu31am9zcksa0y1r4kljjm4i4ov231hak925gtxf9jmxq33yiroru7266eyi0piaagy9apm5acoeadyrfr2gviztymj83mzxrfolclcr4uhzygktse82zigq0visgsulhpod27x1y4qix7a4phcrysretoes6l3l9x2fb9ksqux3t1hdsfeigwk84ixnhkyw8tg2mcty9npy9t0vavulbp9x3lh7bwi9w1h8i23teiuck1v2teu1jr6s0n1f5bhd5f1y5896pw9cfnhoy9iournecu4jbnpkt5g07fja82k1934x05gzb83hmmjcc2j7bif4omjy805oyke6mw9c41n4dpiwfraxmzg5tisgbo6dj88u7ua4pxe4pqwr3hmvgfhllherj2hbo188csa9u26n1trwr28uq6xp5xom7o1ogesdxafy13okmmd0lf3q7ibk54mp39ccq7n1dfsuns3801jju4a0isxq55ifnzwbcxg1n7gfv33n6hwu26tjf8ktci23tvn34x9thuhupbqnwdco422ehi89gs6wetvdlal2h6rqbfrpyv9pj76aq80s5x4mxz9vfv4azz8myttdt21cwpalo8yuesdvspmju81fuhqoi49mxfriifv05cv4v5gh9b14k248061jr1sepzhdlf45qrtf1bcni0qxx609pis8c3s80rnchim5tcar7a2fu9sswd7zgbxfxyulir09',
                fileSchema: 'ysrthjp9apl1gglc2d1tie0532vyzw851wav018bn8qy26lwwbjl870ctw4gfimowhpsaafu8qg38unevmwl3wyvueq7dmdxrdsqf7n3mx3fbb4smm6d3r26tvnscjf0skcvzv6k094vm3mg0zarojjs7bk2wuqacxw3o6imol7dmtq98sgy1uhlxhkbv6xh2eppjbtm8kr3w8rxwsh3sypfkb3s6smc806omstwojhha6cjphbr7fy6mi4z7regf1a0p1eev9ko40isprxvnyocdvw9305eejce234lz5s0vdcpdzbn5p1gjhj2s1n8eyirlz4gue4wofrq1gwirvoad79bkjp1dw8nbeqpvyhdh92nffw76xeswsaz6icky85r6647flu70dcpprqyzk1wbq70vbce0yhdbxxvw1a9naqlo4m8g3drn98nsbcagpe9hmta9gtbqytw1ha6o4afxbgkgff4bcmeupnxn9j9sfugsd111lz4qgbgo6veia2agszv4cq2guama5izenhslq3v29bj4lifie1ejiopsjxditn6d21bnqzg18prdbhlvdgmxqib0p1fmslqdpjy7b71xe99gewbjor44pcqi1z6tndzzye9ityccepoktod31d9nrko81d5louo8am8algvr5neaikcm7711drtnv9us3guybs2tyxm8dre5ic6450abudfufr3e4kmom0jbnmm3tl9ob6nwtouk837vcrdpsd1skkv4en3y1brwjxycff6klqr4j01a616j4auedmqpzigrta11w750dd03nupo29zckqmbijm5oi2lnxwhn585iuts1wlf7v2se22lrraqemb04j6rzn5i33flcntb42iip2db63go6vetctwbg2r8a4n0pfxvn4pfra5u462vowczxbs1bfp7ltg4da6kkjzyjd60rigw6meymh7lbtklce6pao4h8p6ujrmukokgxsw8mqod32ptuekxu4f95m4rhnnfx79wbbh',
                proxyHost: 'my8f3moh4dd8k4u4neo7gvj6bh9arq19t8ksz5kmjzjvw9gcgffea8qw3rjw',
                proxyPort: 7642824175,
                destination: 'ega5nndodsor56f21ll4tjfgltmb5z1alh8pfvjl7r0ac1now6mqz6s31rj5e60pie6eax7f6t3mq1nskas3ngkk7fi1215l3mhj4p7vc7mtd4apojlef09735dqmvoiwfkqoeozkvd9za9wnzcs6bf7c1o7lplu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gpi5gbc94yzs9t9cvmzhi2lhito39z5fupkumccv0ev9i8nsorbfjujpr4agaj0b1ig9qfpvmrbu8e2mdk5hh6ptfbhp4if4exda41beu7btmptjig4rkjp5fd9fk4esuu8aplzuyt9qs0quasoupwhtfk7l9nwa',
                responsibleUserAccountName: 'xo3ao4smqakistvrdljm',
                lastChangeUserAccount: '8wzi7fprfvmjah063g7k',
                lastChangedAt: '2020-07-28 19:22:15',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'tulc11l9z2lqs522pglkexyvo1k5y0ytjdsqhp3i',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'd631yj9n8knyq6hntivr5jn34i1f6ezbqwf2a49o5dlfz52jhp',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'aqn9ehf0vk3nkcp4hhif',
                party: '71av27nh0k5sr25lp4k1sbcedfctsxp80qobbsjjrg7jf19nepo22182cznwx28x5q5o82yf8t56tsxe6ba9p7kumaktwmwlue37iq3g4rhg3ig8dvtbixldkxksq7ahjeo8qp69sizmgbwfufh9hi2mygidpz5b',
                component: null,
                name: 'i4al7ypp1kf3k3tng2fkwkft51us1wzjgc2ykwv7w5721rh5exgz7takoxckorlc216l4jyh1zvc2rzzjaoukxl8fndgdxmx897b5hsrxsvkz6182yrlxewa1uhw3ph6f73to64eprusogm2zwm1ka29r5d2b5qr',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'cd8cw1l7h4iedqa3xha2h4exib6wvwulwtcp2d8bwnqcieyvplw6fm2ek2m05j45gkagbch0cdrfd4k0vgvomlx3rrjjn3q3vq5is0z14hydv79jqlkeqr8nje2ty7pc650myq59guvbi28ywb8ygdjg8sbdnxhu',
                flowComponent: 'beenq76dauaaaoceuefsel35n491eh7dgy1zjrk8gbnh3mra37ti75686syyjteh8ucnn0zr1xdfb0b0ql8vqhj9dnoe258pafran0bmd0k7evnf2o24zq1rma01tekcx2wzv3bdwdrdizsjwx6s8d0mzhs7y2vu',
                flowInterfaceName: 'kqipnrd6b9htqtueomwszbt6mb4lwskemjwn6d6ggr93alxcd6stgdr3aajnune06gecwiskwfqsxydbf5q8e4f0si71qjd53zwsovj4x8xnm4jo5z9lqousv1wpzncb9ahwgqfebxsjj99b411mdy1d3zz4pc85',
                flowInterfaceNamespace: 'f2bye1kds4mvqpdjyhggooag4ntws2uikqhaw9y3tgz47d0k6jir0cqp89abz3woxcbmivh41awfxrav72bgh3mbro6aidk7f0yawe9j511vpahxl2q5b2prwql2fyzkslvkrllfuxb4unyx3z30n81ohgn1txi5',
                version: 'l1cqxkaq35lwvaomwyyv',
                adapterType: 'pwqpge00msa5a9kcaymmugdze9l02g5wvo8h9vzkgt1uui9y0wpwfw6dt91e',
                direction: 'RECEIVER',
                transportProtocol: 't49c6ekwwbpydviqgut1jjms4xpkyijikhn8jgc4q2znvpverkmw0hlvg4r2',
                messageProtocol: '2t5oa6411llmj3egyk7c351z8etu5renjg8r0surb31hkymsu2q0bzc1z1b2',
                adapterEngineName: 'igx9woldv7iwiu0moib7i16c5y4zx827nwoblinmtm6r9h5y14q8gwpq05eb22lo9vybmkcwrk3gk9xwho671fzaeaw1554k5pbug9sh6w9z3a209t7k4ia0hz853drs7t0j6tr9py4f0138qs7gevn1tl3n8vag',
                url: '9iysb1bf7h3njhlmcelvh1gpbp66iggeemj948jih34caqu6bmbrskhn70i3tjr4uxk9pbd7fv30qdz6eileh3bkkqtdukhqledqzzi31yj4mpwbhywty0aq3yfr9callgjqc8778yotj1ylrhbay61y9rnmm9hp0leo4l0iy862c1ne4al0c3agth07uxpp238h73nhdqq1mu1eqvcy8u0ngfshg8o8k6rm488xd2d2k9bizvk1d56m74iauz0x3rd9cy3av87z88zj0ps8i2q48oksohewphtugs8xuypzgyzxlnb58jbuhfzsjwqm',
                username: 'oxm6b9cdei4eopf6vuvjl6hcz9dmv5cmbq3j7aj78bg2t2hd1iczxwtrzdmm',
                remoteHost: 'sxljt1b34csm0al1eu2gmcu1bqhj3zpv6d8var6t24sbbc0emg4rhty0j7c568pgqwd5phiu60b70g2unl7h08uxn0i9btxzws2eisny6ume9e3drcu78vdi8gzc3frwm1d1dtixaay2byjtnwtjx6l0ev4dv3se',
                remotePort: 8544911576,
                directory: 'iah7ualjao8ngv1pqtvm7ykgatdqk9gac6qone64k8k3ba096nbpmc23r9mv64mam4azgelpsqeieceafn8ucrbz8mk0m2iqnv9de4udxdxyjnp12zrfsxhmc2cw6nb1kfj2j5s9wevn7duav218sfh06oitqwgfzhl0iq9mrzsccukjta0pwousl31pjs0qykbmwqlgg3y87uzm9b8tdnfrrlt0qfgp17uzr3y1t54xctaggllkxlq4u85nmgx1eldtc0yv7kc1ezqx1jbqefyycatd2ftvydz4eeciehmmwewl9pocthv7progzm0o27h3od55wfblzibufg1txjmbc5xwdig7ntlembikalt9tlu603erwl3vyn0g1isd7zqlhwra2qhi1yfkzz2w2fiqe9b2vq9l7mwwf6wb38shqe453nm0xvxchbog3p4v5ryamajyrs7og29ev0hiplojjvzg6plca8xtd396oglirjyqfyaefeax3p6bcw4jdhd4yt5ra0hia5u46fiye6vf9kdbv8rdnmp8lhnudfeddv8h6f64zwwacen4u5ot7lsdjqdm4iu9gwl77uhzlk6posjltwcnfcj6tb9xdbonnjyhnzgt5ovb7ri7hkjydtnz1j31srigf5ruul7gqr1bcurnh3ncrat181cbxpxhe9ipo7s1s1qavg0z9vrlhnkf8o8m3dn008ka3r7atsqwqio2qzg031kn7j9zanr1moziujq5k5fwlwp9mkxdnk3qd3yc3jj0mhq5l33hmabzze4ntemq0ifj7xrfoc8sybicwrqlxofj4ujfcga2ipuo22vbnfy9o2ragjrle8219la0wlikr4p4cm65hkdxnl0cbkbybllu4ugvwbcuwfao7eixu9upt79oku51ngegv2io2qz5odlm25klzt0sy30x81ylgxf1y9j6nhnpguyn4hf6x51q5ppk7m9zxzl1ecu5i98oit8itlsbv2f5yyuir7qykptw9kfhmsnr',
                fileSchema: '0xaaezx1r86i87nuluzx6zmcxekjsr1h0xvo61m23iyoc34rlfddns9qh6cjlqopll0kk8ma2kc0n0xfccc8qid9761n4g9n22fduksxfrakm80r2ewotbd97ghnakulq862cx0d72ig8hbd1r0r1he6uuk0qrzhbopamdrtssb93h02gn3vxpmlxm7oe725yubi9rlqz7pvbrjzjuutxb555t3mrrr90ypjdmggyhzady18qr2w96iri4w0qz026lpa4kix1r9bvkxovvxhhsacuitexpbnti4m9vemvkzgeafbffs7xzmyxt4rd7wrdgvujmud6luma2t7rnu6wzjc66p853lie6j0682axujbuzefzui9n9m27g90o63tg7jmoe0div4fsq0r64736jawzivgc2l0xoyhl3e2nw6kdilfytfe59ql1yweys5t4o3ovotmww8f8910nlh1wu5k2hr61ghia89yuj143n38mt196ex8sar5q77zs1vytq42gd6lkbimukzgpx7x80uu5xvz3jd2s7dblxtjqch8y9jbeqvyl8jpk4796bz408zp9r89iqz56jy7nrd6zcbz1b7y306dxmo3u39i0ngod52foxs7wd8agixnglih51eo8cg3l2h2j0qo408v2gdj0xxpf594j378rmawwfyl03v7milsghohzn3hs3f1vwqls4mweyns9pyts6xa78fxw7edlmf0867v96j47g0ds0gmj80lanucbxq907a9nq9y99mvhlvbdpsc7erem2yyawz775872fmq1xlyczzz414v89eouqkb7q142t5nfk4vrtrxw4fkjj7jrae40lzec2k7lxaapuniuvl4bjpjrmg3i87u3r9hvqsstptblcnjtkkxflbu48uo2t7efd77y059i5v6jch9yp5l6ihrbh0ild9v5gsa728emf49nssht4jh5ciqvhnygc86zzpw1b16ndqz6ft5z3ahwjh9r2vra7clfcqnzzj4xn7j',
                proxyHost: '4vh1934r6kl4rtvjb6j9l3jrsryqnh7z1l66njkrcitijounzp8xlppx4tod',
                proxyPort: 9201592598,
                destination: 'j1ns502d4m968vh1tx5h5monq4d1ov0qlq4iew17ghxmr0ydd3vgd5ld78vuuyxvzlh89n86tzd1t8jg1k1vokytbxgyen1w1r9a0lq667fsp8zlsc98bpyeh3y30mi83t73wvg41eq2k4qez9kqrh0j08f63c4z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c8rwvef0tenv1o07p6zlfaqktj8fmv9lemwye1bg5diwxcoblndsbmp7rv1m5y31aszo3x45mmeyj7yt4airm2kfrko3gg2xy958xz7spdjeamox7zv932m3d2ljqdgaayse42an3pfrq6kjrgupx6izloa5w6pd',
                responsibleUserAccountName: 'fxgs44vmesemps5aq1en',
                lastChangeUserAccount: 'l81jujkefg31g0w540ls',
                lastChangedAt: '2020-07-29 11:19:56',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'g0w5zw314y565qypm5a1xgbbxrbqpn9z3hax0cq3',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'daj6vl9sezfj8orm1o440inh4vtttwnnhmvboyfy93pfi1pw9w',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'hmifeg5xi8425k0gzlad',
                party: 'q46omjfkhzex8db1gvodtnwmlrps3gc57d55zyjfee9xsj337i2rum3begxvys21jxlaznlpfjhko65x6s22tphbfqinznv94ui7t7f2hjo3ueqju46oh6plg5id6zz1e8rh6q4k5115hb5sywyt86gcg6kp1iik',
                
                name: '2k33pwuekdomb5cpssidawqew5qhnrxg3sf52p6r1ln2zc31owgaw8bd2esdpxtiqr422zqu8zszgv0xrlz1831yjqyu02rzb98mivmr7vvlx1gntyeoy1qpasktmlb67nq2i38ibvuf1f2tw25kypq8n98gzjhh',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '7gqxg7lntabuuyr7l8m83j67h4spr23euvdr7dha1wc1dw54y6fit6s1j1ogobs8hn704ea02c65sb6e2qig3ykq29iiezz41yay3vzqolca37k4hknvpx0cpteprdi266zd3a51tkprhk63a2vh0e4gibhvh5k7',
                flowComponent: 'vzciugqkn53z1vwvcxoeu3m2rnwbc8pxcifwadmoxe6pv9k759hae8w9jfpe0wzdmsa1pez51zwpzz3ox1nperhlds0m9696hdzu92bkfuwcx88n3js0hvyo74qpy6t0xxt927d85880e0sa8nmmdqq9elcv0ono',
                flowInterfaceName: 'dhqizdnwknn3c8x3a5tr2o1ta3yap1fldn9v1ifprf0ihx3zwcr8by7t0xw24v8bt62rglig9yeqfcfmrx2bm1wqa3w4o702e8r0pflxqney11a12yf7tnkz9qj3szcm70dzx4wthavp1m3l4b0mv9sa9br24swd',
                flowInterfaceNamespace: '8w5cfi689nbr2o6h77q8mknj787a6ud05yjr8byxjkkf4a2wijtyo37oi0b0ot4r8ehpiwrmw1xeg6l19cmzbtis2anb5c1dp7w1quraqhjmlbzz53h7f5icbw00nfg8fzc5s5cb967mnpth3zov13j5szfvvh13',
                version: 'x2buvwpdymbjix80okst',
                adapterType: '6ad40s245ez0wzc9l2pj2asdmtb1nrfrs87qzi0k4eefo3gd0x7torrsb3c3',
                direction: 'SENDER',
                transportProtocol: 'xsy5urp2c5kf0mio7co79wlvi7rl6urjan4n19ktwtzdx1c5kwprryi81ftj',
                messageProtocol: 'kyd944796ocoltm647yteh6z75arjer6mheyvpcb02zvdy429vxrzkdpc1je',
                adapterEngineName: '954kow909054o5szdwssbptww3cjsz61acrubfd3xc5yh7zr0jupzfwj7f5eav48ua7yefla5prxi7sr6x662h3ndou2lpzremhztulqrcq53af2nsezan4kgq2t461ost4979evuqqyqgj95oaz0qmg5obgshht',
                url: 'mn3syiz34dxispbgqsmb1abu8ppnfndrtala7106rq7s8qe06k7bx8g1fkmgb86e44h055awowzk1wabnyjkqtvs6ciqsrhnzx17mdk8odtvhpw8df2o9qle0hk16e71eh8mvkepkt7ayzpbs64au4q3tu25imea8ppvupw3yhlbgzg7k62vqb9bjqkojrh6cc45g5dff9frgo8us2qtveix4ngqudi2x0sgaae2859caoe3d9prf6up9spqv9yhzrn4jv2x6hfzmizs1rr7aukw8h1ij5qvhfiy5uwzjunybuo2atnr0cbi2vj001xr',
                username: 'r0o6m2octufvk2znf2jshs0efbjvpalkk9d6ytj0p221dyzo0jz706et7e4g',
                remoteHost: '5t7c9cu8q2h1qixljt42nyt8srqqr4sop6ejqd78c9us96flzw9fssbec9kez5k5ktn5lueiadzgwt0e1sr7ov36h3xztpw28ezugeyx0jjc2vmsoqvcmyzmp649bvyeampkwir6xyxnjk6htvx5ufd8doogik0z',
                remotePort: 8880476302,
                directory: 'zh72hglmh2har25c488fsj16dg9d7cqr1lmh5comaegqvm0j73x7r5hci2mobrltgpn2vfp0wpts9kbvodfsa1j2kioxiopp2iq1bn33j7tfc72z8nte5k7jib8hncut3g7d151jidwy7s2zwmglzam4rmiyr90r4tp6ptfa86hn1typilmqaemndp55blpuvey5s9u3si95dr7d6msi21x3c8jsrtkozwhsqugd28xm1s7owmh3y012tsp7pdmve3lqfxmo9ziwwxmq6dba7slbvv0b3qhly9z9hyc34u8uxrxnw67dpnaqwzoeilmi4nmx16rwlvsuuwxdfbskge07thakkeptshoekkz50f3jywdmzvga2fakmx3pdya5h35qrgbjw6znpbo973d676igw5ju89nppyej9gplrr400ciitiy7u430gn2b2x00y9bp5mgr23m5bexum6keb8bgw8fczeycx1z95zryvb058tux653eb65utpdq6d9p3ka9fosdwyona69k005a5d14rcsaxv1fy8fhs7o8u0yjnjwc3wfqdnoxlzh34bqw3qpfm9umz1esrckl9pyo6pxo8ynbuymka13r4aywm4ofumucxao48q6c9ckfeypt6ds9wv4f9xlxy5x41qq65ejgmr6nj16z184rzs0k9frblojvob0ic6efgz8irvw2aqavkg6tyqr9h3op4zhrieg6k2h9oeb0d7n2vmnr907amaox20x4igqoh40754v60hvysi61utjlzm6eevjkvjkhizjgk7htljwgdgywadkbcblt7z07nfdg3ubxwmo8m9gp1w5o7uxd6z8qsucg3xluyq77qyiyq5axi1479qbo1cmhcgwwx8z8bgj7zlufc5f7hwq3ebjjffcoo88izuvvdmtz8wqr2z91dtzfjaizb1o4t311fchdfy84fea4js3n2qy8xtok4dzbnyhvwpv8z2kub8w3k992qq7wemshqwvjdf82kzeqcezmqnyb',
                fileSchema: 'e1i27hg5gerlsg19btr0ysyuu6yqbq3fger1lkq5rxklv4i80l0hjl5hcyak3z0lrtydh2khclyf99vvg58i42k35wxfzc3dxtxe6hwefko4kcx1ao17jlfuu9ygg53x9jckje5e8pq63b825nani9azt8d7by86unzqqhkv5reuvgvx7x8g3rwda7f552beoynwapgdrldbu74r2dqxg3zyt02j5kopf29dkg1o0h46bgl04oi5mwz4j6t45qa2qff8921l39xb0vut3kiscimym1eiu5ib9rs641fslglnvppameftyqvyzpkp1n3htcsg1zq30nfgcuoeyidy02lqzovoupzpfgggulnb0vpmhr17yyslejmmc14yqpgwovwe5glal16sx59t3q08tg4vb835co51qd0a5mxob7h0tvcnjv7h2pj67pja8gt7bdl93n21cea3ynp394rqjjiryfvqc6yitah0kz97slhfose8jsr5bt189iodgm1pcsv2xmc8rbyq251mq051ar9ywdm9ki340xf9qyerjam74yeub4jnbnqf55i3k75snrpgr1oguvthzwf5a4q5h5afao0wttmwdy0k29242otg9jhmzzp3nkwhl8q28jd4e5f122bdv4h0q8r7iy85hn2jmeb6c0ilb0aaj3ypsv21tba2natnx6493a2o8h2zdk8f35q66xyomepaknk5t1j0afvhx64icoykqxcjhoxp7yghko2j138gmypm25aebsnzo60xsmi5m5q4059am391w6tkml5ri0n1qw1rizar4i4th5jl7kt2behtqv1t8jfz4jz04vcvtkf1u4zfsc1c53407rrkkwlr2j8nnd9jkcavac0zm3lmos2n7tkkq3qp0tz0isxkquhixsxn6llz1okvodyz5n8v7mbjo81a80i83tcmd5pshhzym6fsspwtw7tomqyub5nxmwz976arjisywki6frqm19vn95lozxpfamqhqjjtglcc06ju',
                proxyHost: 'nzsfq4rhbnx9t3227xmvmtjgsj866ltlq0ippjt0tuv9o5tyav7if918r232',
                proxyPort: 8059802483,
                destination: 'sf7swe6uevu5z3cktjkyqmracwx2wb83j6in08lch83iqj58mlz0p9ofcx847psd1ldr8pg0c6vxtw55of3w6wyxfqpg7vimc47n0of082ky2se25whefjtzq5annztlr3ylnnlaqyx8v08qbs12mmyuobiecokx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ditdoehu55c9p0d1f7o9apnpgsvutjd1oe8r3gloycravxr9ge7pi60jx85otciuzrcm3smdcqsc2bdd01eki3a9miinna2l3amt9vrezne84318c4f809lg4cecqrjbbippmjdqe8uy3kc39zs5i4ntaef3ufq1',
                responsibleUserAccountName: 'vscm27rxqwn4ky69xh4t',
                lastChangeUserAccount: 'ew7liy04z2my7440h6rx',
                lastChangedAt: '2020-07-28 21:22:05',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '9p2jr4y1wq90z075h77lt5jw5u1fuervo9g7vvl5',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'mfe9c5cququ66okngwy7s5vn3in72bdpkvni9b8or9shrev9ak',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'hs49objz490w2d956phy',
                party: 'w91yagdzip2qkaxnpsnb0762s2ckaclmzjx1r755dxwxbit59cdks9z9gudlkscpk4t2i46gjo2yjy52fy888zzmkwa2kh6yabzj5scizurdi020ewkq01yr28arbusdzljvbh0kulqpf1azup8d769yrcetit09',
                component: 'h8no7krgal5hpejzlubxrc15mstyuoqytj3uqh8wnvl5xb1peoy1te4jg6pufrcfrmzab9i698xlat9w6vvk104z561ah1h3l01zcz1kbzbinjq4t1hin9mxh2jy1yocb8unmk3o6kyp1jl9ndwjwun0mewdfsh5',
                name: null,
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'vxxvybndx7fmtqwi428x7udesutlcosdifth3ww1myc3f88905v432e2qzv9ettgxvy47vcb4h1eimhfnewa7pv5ghrg5aabao49hmlzvjxa1sa676qvbvuvk5gjbr1c53d4egscvzgf3qxkp393egtdf7dsx5ii',
                flowComponent: 'jhz9qqqwb81dbnp8k3u44fx06vrr95ko9hoxsyqnncfxzez9ka8dqywg50tn1n7iy9h83i6fm5q44ngqo80bpqniq1qak38wpc6h58an6ppsj4eyqmv6xz7nhmx9ihtc0r6ip682mqbw6c1l3b452rdgjqt27ij8',
                flowInterfaceName: 'fatijbm6j94aelxdshgw4h8otj1w3kcbepc8yshbhmq0f0zfy3oiwbecxy1j5xgbezc1gxbvc9y2clnxz9bew6kk57ithfak24u19ugq08e21lpvsp9o4suekab0wpqjfwedkxi0bpn1uxbp043laku1zgf04kzd',
                flowInterfaceNamespace: 's34e2lddeghyvmr2fe6kc1oar3zsmqzzl8fkt5bhwjx1ewquwn2an7cizlsfo9db5mp66cjjozt6vrre39o62rnoy8t1l49oj9bfhknyofnbmcmvp3azfz9sm061nknhcd1pbhsgehtc0spjl9otprly9cep2en9',
                version: 'wpszhxwnjmw6b9cucsqs',
                adapterType: 'b9ve8gairqfyn4agwaug9hbrf2qxjghbb0hb75dshxvz1axqh73faeu5xrzp',
                direction: 'SENDER',
                transportProtocol: 'hnjl6oa3vhtbe3657pd6gkb8v747zp08d942l172b7bkbv65avpw6a52h577',
                messageProtocol: '3vlffny8hrfuqk4pk18d468jvax3rrfsnvnzcvfc021m54dbo1g9kqp93bqz',
                adapterEngineName: 'irz9qqf8iy93qy73mkwty532a1m9pt7fp5yurkankd0jq5gtjd8o7afov5qdox9us5pqo22toi0wdtrdhfynl0p969z0u1e1xmtr1t42pdwmtt788py1gkepiry9ds5301sveitubla5cwthrygm00gdses78qb0',
                url: 'rt08jegbt4jouzl9wrpn6zxkwcfmq1l2nxw94lwx2ogj9m00fnucowj6a3q051555yvxdkb83nb2gv6pbvfvyggnhvz19c2ftlo8r0qylw3lnpkw0sc1yh73siukzt11hjvqezqn1j21ft4v58ywvzgfvzam041lky9rifuqi0fbn6e116bjt0o0mqgtkaqso1mxpwkrvvrgigb1ein16903djua7rtvgpgg4yd5mrirojoa43ol3ykvkn9gimvi5j3ck9qx95zr343xhx1fp5rbi54x3sijgdpwm4y9yg57brzx3dfd3naafy9tuxx8',
                username: '1asss6p2sg9wbzsko4d3xolus76s1j37d0m8rppiaktylntnluydnsd89rq5',
                remoteHost: '75k67or9p1we9loas04ic5qil1jzypobsr25vqjyov0en3wpjpyeou9f8v5f2f3smw0jcn9logn7banxj0ygjjsqfvgvua9b1an9ujned6nghgmc8212on5n946vhisi6afob929lyt2oaq8j8pkng6xaqh47miv',
                remotePort: 8327904723,
                directory: 'ogo3cqxaqy89k41v832lfgxhi9wzrsfrz2msnhzsn416kofjbthl5wntwg81a6t7sadve1w3yvat7rvfnv2rlz3w4554tcionemtc5inq1tkpqapf6tbeyy7ctpyb6rlw7yxwwawj8ps8upd5q59rn3qs34hznbv2s76fjiun6vm6o4rdvuuf6e73p88jg3fb0x3m6ffvrc4lupbh3jp5gui0ixb7dzqi6j2kro2e7nvdjrg6xm5ahu5rex32200q59b1zmjg7fjq6pfdvtef0senemiisq6b28z7nzf03bkp3185naabmf65s6ge8ujwlasxsqrkku8943r1epdk9v5skiiqscy4e4s2b4ocgiqk2ah68dbgwtu2n65aso7q5l488xhpv1mvkm6lyh4ekamlr8rdsg6syclr832olh0re0fqeu4gfvgtdpvymukqba2kyn2ljtkgswwmir7ltl7ypymcj5pkjf2kqrya9idrevimkhn3x4k9n0veqwdamu72j4djz6ayp2jttx5s2de38fk8vi7f91gmaq7s4tsb8z6f2mrknq6q4slzkeumfbph01wc42qlcpwoiduqzyzsdo97khuksie6tnsamj2khsrn5c03cluyd078dj0ym7l5i8j8lt5ve4p72daati24bmxs435gb340exg8wgee1q1swh6cbiahgdd18ijojhvprhk5awicraz2mh56evzvzn4f4w3j882bmv7qs3av41bd0q8er7hrazewqhwl6syvsv4yb8ikkxss9glooctvgucgffz3i9mn579wb11x51ajb7t9wu1tdqawtthdaxb0on2anb8mil1juldot0nab9myss4roloj25lm147d97k9mpbgzlqlis4zyqwe3kg8nvt1ms21brby29626zcvk9qf2h6c9rfv6snzxj3e3c95p2ulkl7i5250vb0qz81zgrorlffb0ooysgyw8foy6ybhi2doj7fymvjxa7umzt0lksjtmfhtf4n11ps',
                fileSchema: 'izagsxjcmpxo0l9qoo4aanf3mi2bbblkzdrx21dwqns6rvq2wk7ujy293f4w37v9f7kxayg3sbncho41sarc32a5vj6jtf26psnard2tbnsgc73b1pfg6lgkv3epu5ztw2mdklhhznanvy4u1ftz24id96o3w35tf51lkbum0qa72kvuy0c9fbvrlfwyzteoy3qvf9hgqmk3dg61ptbr25bbhe3nf7gtux614qi3gkfbw6tbpslm46odbgdfvq8p4qnnckbq7110za2svuwggjp1rl4yfyti9jo4lncorqgzvsyrf0lneo1q6g5v9f3lyx5l06yg762op1t02b5czb5jf4lmj21ur8zk6gsg619tfjicyjpnvgshiy3vthsgpfc2c683x2ul9w68625emz3ete6ka0txtzuwlurxayhlyd35sytsxt6fs2cgwfbok4lkfysavs3a12uooteev1nlofq5z5eufflt0f1y430li01ci9zx64o73j9h5ep93e5289l0ufo99xzvfifl1uz04jx32i0tuslxrvfrz3nohtep6310zoz230z0vs3ucb5zkv1xismriu170k2fzfvxe1pugmqwzgj958a149357958bab0g5n0mdlbwrkg7j31dbaoyrrcmi1ln1amvorg11wudu7ia4bopafvq9daoynen3x9oxoavnwr9qdr2iql2iuxtg3fb8sxwmeeavcs7ofstx5t6q8kxxxjsvs29h89bnzkovdkv3htke622v4xfnwwsig5h6paucvlspep9wnyg3jx7pdd8krug7y7eda5bh73raqtfnth8mfunrxxnva05addvezumrivrwrt51eqx337oto9t9uwp8job6da57n1m26dn97jw39u1bg1r8ck8siw1maxqwjoos9uvr3qehvk6ui0pz59l52jlijmc9q9jidcc6vu9fle0ug2cvn7evjsx26nxj9mjv29122rftd5i8oc1puizpx10cenv7jzlx53zc1r0tyg',
                proxyHost: 'myob37adxa0abmtoak4dyue6mrnesa4tbt7e0iqj8kvdeocg6rwbc9pbmld2',
                proxyPort: 3391471705,
                destination: '1wvjdznz9qxrhvok2whk2zn6fxfjt210v6rp05rfj05g0aecicpfy9h8is8cpl15u73tekascqs8csuoi668jrcvg91pastsi48vk44abbb5s735yo0rez8p2zu84tnjvj5o6fn7c9df470b5j8c7j205vwcl8p6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xggrlyc3hujvo5193yipdkim2gd1jf4gxyxlizggrcygtfihp0upkjy6snvlu27gkltq6c20mnzebzv15par5dvpsuzf54kzc3ooic3jdt9dssy4mbmram9pvhs74n6j97uzbz1ljimnr3n4lovpne7m6fv6t5sd',
                responsibleUserAccountName: '8mntiwq3bvzv9h1qaiec',
                lastChangeUserAccount: 'if29jpypgcdf4pvl4zle',
                lastChangedAt: '2020-07-28 20:01:50',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'oylu5ksdxunaqd8cnac5g2v68cfq0mbas8oovqpb',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'pmw2vb57a6x2cp8t3jx0xvo01cylr2i6kzd8q6vxby7vptlq50',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'p3y06v8il4unrsqsgcqw',
                party: '3e6aqlgjkqvchip9zxidb3ufmbzbrs28d0usc32xtr9eh49dckv0fc9i6vyioenx4pdmdsptx53g58351ycdz0nhjqz1i41oqujctmjadqto88dv0qbq9dj928bnf7evxkwfx70sstxzux61bdezcxgcxv8n5obv',
                component: 'g71luz14113nsk5nxqa9042xm2745b8hj3cuegqsax6jzece36qoupm3b7nve8wjata7flxd6qzafq1ntzcwuo3tctlrk8i9rt2kal4jwf3gws5vmsel432u7ojcvbnbr6du3asxkavf37ksigu26ig9rldbdiic',
                
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'fekvlspkjfdnthpwpmf532wxp7yhxmqrwgzwfzungox1bdychz70dfye3j1ccrp1h77bxq6284jlvd07d2po6lzl7r6z0hayyw3cyhtyz9sgbj2f83wygswxqjy3tuy9see0a2rqnam8hh3g7f9k2l6f0rru5phw',
                flowComponent: '5ij8z9mm194bhmyegmxwpnus6ypzoqxgt0brd1gwl929xed3qre31xylzeo2ajhip73a1aaujyd5tmnzuys2pk5vz5ojkv7jsdsjualsmhtvmv9pb68av0up9011ujlfr1eft93ghniv7lqtepewu3rujefpr0uo',
                flowInterfaceName: '1ykyq0hpeu1cmoiaynt1w30u9nhycamu9hqqwyviqar90j1sgv2ikrxsjmja7s8gi7bzd2kawkb4q5y6lesc01h4w3r4hr8w0vms2euxd7qt70p9jojrkljugvrmchdwcydhdkqv43ur1268hjj2w0tozasan5g9',
                flowInterfaceNamespace: 'myv6daqgsje5w3dixbkjx2s48hqm0w8eiancsz2n7sim97t07czqix9kgel1ti6a2q7hbchbqeoyrun8iqp2ysy1061l05b638b45xythd75xk7byg6z9b0thtax5v7hr6zskkhnbrrlv6ow7xgqmw81jzqjzxot',
                version: 'yxy8zqz75b3kn0rqokyo',
                adapterType: 'jchd3h0fibyle980qrz4r5hwypk85q5kfh734jafhdp9y162um4xohhrgk96',
                direction: 'SENDER',
                transportProtocol: 'd2p2iwgurgkooisyzr2doipvjyglz8nijzwh3zhp2avduuevjvfp740idon4',
                messageProtocol: 'o2dzxyhhu8cp5fwxe3r6rjukh2e9obolnjzq83tvn6akhmu9vgcgntzgztmu',
                adapterEngineName: '1qji94kghwkpmshihdq6dx0x4iried6be62z2qdb6n1qmdz1w301erktm7ra77xadlup8iuen53pu6pk41z9ywv75595gt83arlgwirwohxmzm83bmdsi21quhcx825veaemj917k3y1aigj43p74afqk8t1u6ya',
                url: 'ode86e7v2iasex7t053uqt9gcdraugwwxi37okov7z126e1i32cpf0vdbf7sfepinoijgu1ili38o44gee6tavah6rugp16tz8ibil7u5y012du7j32tjq2moggqt1rmgzx5te7b5niwckbr2sruotr1zalrvk7odbljh22mv1jm38gowg1gggvtyilnx5doci0h0j8s3aink2jy2vxuaqkrob90fkgg2tshrapfee01lpbpbwknh6ajok4us1maf5onlo2tf9d2bumguyjde3w83kwvxe1qh5rxsuk3i1eo0je9qhrl1f9jcqzjk105',
                username: 'qq9f8bchnuh6dt1m3vhzyc04f3wryx89pm0lgo0a3wpf536hhwchhb737s6a',
                remoteHost: 'hxokquupkv3cd3d8dlx5chrccdp91cdj9rt1chrysxymxpnnoa8hy4jpfseeo6709knhmjnm152gxohehxddla7ntbshurvvurh2l9ny5xs8nnrvl6ildqy2bh9zy98aaknsugxssv442sea34jhy0oj7g5x5e3r',
                remotePort: 9472942786,
                directory: 'jdpf0nk9j8cwckh6q7h59fxzty7e4wydek2udwk5xvcffqb8ji1hhxkwu7gzgpjw0z9gzkbsclizbyu75eznab34vfrgolld172uo1dqraszwwqwtq022jospqg0e9mxjr3oauzlzqjr13bp7fug8efvjzyhexjrwlzzm266v3ogkwh7nzus6ao88wzeom4oak3j3bhgude4mr4stqhlmq59hw6vqm035tuxfg21su1fjowcw6bnjax2s1jhrkex3v159skv5u19gt9rxrcl7j5y2mpw2cknsglbgdl9pp4q4zfoq7jr2kjthju84s3nyiy6nalm0nwtem5380nxjjul3eff12dtvx2ry3t1nxd4joak0eqn3ah89ybqyjlub9m8m9zqxiwczh4g9i8beg8k86m962c5r2bsrxyltd5g2g0p2udas3fumtn478mye9mytslp3t5235oh8ly1ijuxv04b82tbuh7b9wdetarjfxvpm24sxa4eqm6dl6oxakc1y7wxtznlmiff7zx8omh2bsrdkwerv6piafegteui3cnbo8dd6vo31hd83c6v4ydutxync5crj1xqdm3zojz2n8nlg15aak838xnr53x3rx5ct79f0ht18gnosyshl6u0prfdfs1bqeopuzim1fcr7d29q3cc7z3jofzufik826inxdovbhbeqck65s9n9hyfey9d5858sfby0tpnbphl7400p3kfm71k74cosjjt8hgkna8fr8nmqkfu1m1dz746s5njnddt3mmrs3i5058scyilmz8n9r6830ql54i3ds3p05bjdd1axpgml3u20c7cqq3csoj4g0fdejfhjv6jcq726qbt316jslz292ml6len31ht24n7avp837tsf0fpqqyfgqumbmkol8f8870j4man6wxk5xyhcqi3m7m9h68s1mls8lvi398ddwlq7p2fm2eq7dh1m7zjx3pv2dgl7h82ogjy75ejs0gl4lbnpoch9qkq7e5tw7njtdjh',
                fileSchema: 'ftq4gol4sqneampu28lvolyk5pmwb3gmm12iqbmekz0z6yep5teyqceio0o79h6ns1urzkvr4rgv6ajdie3ph1kiivvycjfd1vhu9j18nms53phgenr1xxd05hkeb6byqwty2uhsnnxt9unwk43dw1atzze1sa66240boptb7d1edhwom65tcn4l88uajb9ckczt70cbeco53xadyjr09tfm35kdbh25bkgjbe2kft3cauigbv4xyqm0746hfmro3naa69nmk8ek6vgad2w4md3s4kqw7u5b198nzabhrebq1t4qd4jg5p1z8wlbsvycq4r5lau5jdf6bb5dx38xwl29tt8yb9k0ce9fw2vzx4re0ky1vxbdt3jdx8zasobhn80w2fp4vswqvhwmpbvwnzu9647b6d8lp0uyaikhcd3nwn9nbloxb4zb9e604ggpwb645456lg9ws83m38ykis49anbgvbriz4zzuaoovceq68lkp4zr9v7dep4abdz1x3u1qe8361pw2hbr0v8o4z7uji8mhfnz5qogujos1kail3dnjz04cdvwueohjwqd3zrxfg2cfiw70mfai7gksbo1r6x7l8f72b7qi7p609226rl6z0k8r0fhpk2zdxp4vvc4jgqiym81l17c9maig3dll5ormy6m8foix7gciy6hxu7cls1k97pmoy6xa0ulreciyg9q4d7ustpmkt1np8wufvakxyt600dtc0c0qpyhwyrzq4gavhv19q7weyogz3f2hcq8kh0voiem51srfy7blqwie7twvd331cng2xrbpa7euy64jr7px98m6gcf91eij4tl9ta9kn9q4596t054383cg13o8mxjsc1v4yufajt87p4uxdwryn9pl485v3yidjlufvyw60l30ma9uf2imt6jtagapb5mc86r2gg6vnhemovig1bg5njlbq9ask9ijntqvigpm9thx6co4itpntt6mmma0rvzclxvm3ygvuwqsu2rfjlbwendgi8x',
                proxyHost: '0fzaddsif86a37ofuunfds5eno00axjg31xla6ib4quntap9x7iicisno6s9',
                proxyPort: 4212225593,
                destination: 'c6smtkzi8ey9zir52ov4ggzsqslob118gq1msy9wehk1vp11oxctzppqauexyj4hw359c8lhupjqnjfzg4sf02tbz2xxzj26sbusw77btj2973wgd0iznk74a3k7y7wa9r688g51x1nxeyh0vtnlat4ieo94slmk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xsok3232v85636rjils0c5cw60hfayyp7ccdex1y9dagmk45co6e21hxq1auucifetuxvy3jrhmzqadywy2xsxeeopzuwvb9a66qvdlyz8qlkzeezlgaq6yv4i1ig9aq1a9ovop5a74b8b5e1y2alru216deiiwz',
                responsibleUserAccountName: 't5chvlxopbaa2fhte5r9',
                lastChangeUserAccount: 'uy619ykm17nv45mj6xyq',
                lastChangedAt: '2020-07-29 11:40:37',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'eplgkf3pejmup4loiyfzdfwzzwgoyq93tha8x4ty',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'ejcljh31g8n7e79ughmmnxejtdcff2ajshmivssn7t1yjgmnrc',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '638wuzdlysylks8u15jy',
                party: 'e389zpzdnj43xm6lhezofloa60lh4lyjqqk0gs21vyt1so79jxdogv5koomrpe81pptsvq0filig8doestz3hwq9yn121dibo9394wiutp1p11lxlswdl5d0lm6mm5y4rdj8n9y8dtzs9j3im0kjvzd9b4j18y8g',
                component: 'ejodv3jg6yb4u8an7xdibcsmpz87ovxpfd32yy8tt598311974tykgs5f29vmvia7901c0u5yaemglmvt457vcxkx3m7qygtg61594zuwbwmq8lunik527eym5hu6eafyk5hnpxlhvxjqsj9n7o78pung04tb91m',
                name: '0ymnloh6qfqb60i4c3kqx8ek2niyregj9ztybx1lrrp0hkifw7o679eobldvkg01k0flsi9fz3p4yzbm85dwjizowvwx6uyrkn1o7b29x7pgwpgloks9bd31k7frk60hibmos3ncth4kppz32munmrhu52vnxchj',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: null,
                flowComponent: '0pjb4kebx4z3bh881h0i4w0dryiofhj5of760tnw0kmxi5ccy001yb6eamtiaq9as4gvc0e4iqurl37nqzp1wpuh1pr692a8jms4sqyse3qu2hf5jkawokwy613jkittpyu7qkmg34ub8uwpcirst7d6w9v3jsmx',
                flowInterfaceName: 'hkhud9vrvwyh1ennpow7akxjokdtdnplet1u7qp97cixxgxprdsgysuxkahmig1w0bscbcygrx03nic8fj6ve8pstfx169jgemk0neciuqo48umeyw4lzgpvckaycyvyz62qgxig8dekxxlg9rlspnd7hfqc03wa',
                flowInterfaceNamespace: 'fd1qpgwu66ql4mtpgyuxph3i9lwfr6vi9g7t3ufs5aq7voubppcghhv7efcj4ggse3gtuks8iycbtvvxldvepbh4anrwkv4axddffyo3iabtzliaq3jtzv3ic0e77x5312bijp2aswdg0vasfjn9zlcm0vtcy70k',
                version: 'x4j62rob2bvzt6g58mrh',
                adapterType: 'tt3xgnwg9fv9uetfdb6csx159lb2p2tkvc03lw5rz9w1whfj5zmu03ynqy1v',
                direction: 'RECEIVER',
                transportProtocol: '3iaqd5q92tiqrqqd8ai7k4in5rkmggoh0jwnznklj2axesbhbwtqltacjoqx',
                messageProtocol: '82o3n0731sgds164pxlv7js00ewwd6k0mjra6h6y0j6gj8v2fd7hl9zewa0u',
                adapterEngineName: 'dihhd88j3ehxh9jxj7fza1ia1esf49di37f9aotupwjy9x5ofqxjlzrjaelcn6rwpk89piya2y6g985gsvr5gn97f78fnct8zp4522eo00tu1kjgtyb8vq3qd184our0c4i16y9tp8wjte4g81jw9lwohyrpxp1e',
                url: 'z7u4gkkxgouz2ohelaezc0uecx9ykt6qtnd4a9oz796pwz2vtuzr8gtdtb413wnr695bo6gew1o09a3tnmawrnx8m9bv5x0peflusxkdre7603vafichkryer200oflcls912rf8un94oyrcy2ufm5taz6drrmyi3rdohq0k01gmnkzpl45mzduiqjv21n44slpsehyxnfsa1xssxeovl8ycebg7uvoer970kb5w54g470349seyonsmlasavcp1rhjt8p33sm3wwvd4a5hix8erdfgjn03lrvhkg51dqfekt28lz61i09puspln38gr',
                username: 'xrdi4tr4twugd27owwegywzmid8e4uofo973gdvthf5jwuze8ftuu5nu1zln',
                remoteHost: 'i0krjbpc81zmihrfu1pxfw9753m2a2dusidkad2twyaaqm2kkn2rv4goe77owggnfqskn51p5kuuhd3puj6qq2gfcha19mif49s6ctuzc5k5pgpg0q0l022htqvfe5txqn1bi8n6f91t1ucz9cjvi54gejhv0l8j',
                remotePort: 3055420022,
                directory: 'eh6el7ejvzp88zmuh9tdcz51am13b161y6337xdc2uxk0a6ye5nfouva31k90ytsjji9whfuienkp51fszn96xvzhuanpc41dya2nqvpxp43oa8ex6d91t47blayjv2ovfajw3kfrcauzjuj62bkblz2gfa9duroo1am70pm0qqahhyf2yr8uipeuraf0phdosnffh3jyq5kq6krwjk52tfqimfgsu5p85t0jmf9d1j8c9obsnq1h9c3t2gyj0lknrdgtfpp3g7bdru9ry227z6s3fpg8vh74rv18ts6qa6yuxhvmc1jbrorpuq4i17k0csdd52z6pdrmkovmokjxr6khqav2cmk25x01u1ehifrnmkxlk398sspls188pmyftxw6ove71hqlr1z9kwx780i8lhfhwy1kiuv5qchcyv43ormplstmbibmvc6cu8ezak485uq622fx3wehsehdiuapiy9yn7wue27298hary8unej6774h4gbftxljkhysjre7pcjnvuf9npvv190rzrvmkcmghyrcepx5dw513wpvbafcmgrzhmfbk2zdnro07oqftibv0z2v03fw0wj64zr276683c3bmb0a9ynhsukcf6cgle8l8pfqp2mx04q38t19s9o857sp25tfus43omnwk84bb0mlsofkwxb53u8n37yvatw0wxvmxepogz2l0bt3srq30hbnd3v4tco7x6fwkd5oauj5x5dq7wu71oe7gu7j49owyfpsuzczmpgyathy28tositstvbbdhtzu2zxto9ha7u3k1qm04cwmqlv7gh7m220t7v2s6i3335knyy2x1j0b1pxfwb6i5yl0i0ncqueeqovt3hgffm2aa41uwil30odlx0wcopkoh1uq2nr7mmr1r9whgownvun5n7jiew6nsd467ql48nkejgq9a5dr76vswpcrw8wjjdwis2c238clk9t7xhrv3ajio89lbmarqlsqap6dk39kmowfb0c741pvyztdx2rm2x',
                fileSchema: '3y9tx9hh9r6yhy1pyu4omwixgiy2jrxejdx98e9z1dwgdg1a0j2vjlh0ea8yc4zb7vmw14is7sjuvtj9t8honjuuc8df9wv9ve5y20wq5xj3l09buipwus1uj1s7dg0w2qzg1cu9zbvd512a56wncggt4jo48ahs6lq3sthzpyt3l7r8iv3uz08xgs7gr4e7bahi7u8vt4ghssxojj2ta9j27hr3alcje6bfy07gtvg5xr98fwy9pcnpezap4uhhi7ow8hukas2efbp3a5sx1g85gcpzevb3pt7wd0kcxqlwecff2hy7nxc5uh70kwo0exgvrxzaa2141x40sd7xb7ppv6xd72462clx0vdfj5wsdoao9sdk7xb4y7o6jsvp4okk8ovbtkrgk9hei44e9ikcphn0hf92pkktp28nhk32ckvfvwhtelvr04yzmdfvv1swgdxgneez0tnau3ctyjamhajgssemmmmvqq7ska2ckwzb2834g60p0i9jn57tna71h4kkwz5jfn2lxvrot3xr952u9dginu9u0f2t6wdvdx2fbmxsuzw9y4eap842e21tr2nfktgd879w4q2rzkz98lqo8pia0zjt2mbjnafaezf5kwyfxy2lpbeb0nal88hsowwjz2w6k51986nsmmxi3yg5sg86ps1ngs3wbv8ob9xckbsf94czzmk0v7bui2c740vatwai7d9t359k0uweldsecrpkm9fc2sg4rbxkpga8bxfqf1t44m5ddngpy96jmybvdskvojy99jswkih0bel0f6q5p67la6vdjqqqx78948qb3dm9mrny5203dhuya6ave1aj49h698szhexat8dzjnlt26yi8g64uhnzev49y1618ouiwk9st7fwoo8gym99mmnugblva9rvp3w82ymaf8hh3584xuprtksp6tmdegs9d9vt9pmmo4f1anwkndfiice28yhu22x1rurkcz0tzp1kb62tz02rmaqaqun2j09mzlfqxn0swu51',
                proxyHost: 't8vrgqb1wbyz4s20n2r6ko3p6sk4l4109szd0whgwcd0fjeecv8nkqta1mnv',
                proxyPort: 8592055379,
                destination: 'g4cogvpj26vcufdkmmflkfe7h8omjd7dgw1mo5diez8qoxdx2lwhviftsoeyqhwt19xmx13xyl5q60ly1541mv8bdmks80efnsem8sscqzqf75285fux75lbt11g3tmu1jx3ulc8fbktqfz82ggkzl0ppjtlil04',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nghjujm1kese32xvw86bo3g11yrc8lu75klcm843e3jqd6fqvn05jbwqsvkbyh1ncxwxau9i11nyyx8vrd0okxp4hp16djmujas6kjam1a0t6q0wyjq2rcvvhturyk4j3d8n6bez7djksr2giu5jkq2kpt8gii8i',
                responsibleUserAccountName: 'zvwut9c4q57to6fo3ws7',
                lastChangeUserAccount: '9ojsfla3i6rcm3swv7at',
                lastChangedAt: '2020-07-29 11:34:02',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'p3wb5ltk1u4zmeo7f4931p8givmz9y9ctuunw5m7',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '1v6lwy7elztdn7ucxntgsmqwrs2t6eb4ttyn6jjrrwlmbea2oi',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'v9wx6apy0356e0wqu3yi',
                party: 'g8l6uvcfnwzthneoea6nkyd1vbzgn96cwupjdzm0tropqlzwwh7so2sfw8n46srdgffj62oy2nt7903b8qafat8d0djb1vgco49cdjqdg6fqptr6uhmamrwg6usihi3odkjq76544fjv2018ac0iusvjps0pi9d7',
                component: 'ps0hm3ut6dbk9e1rmdyqbcdv8aqjcljeywe8z8vafcd7t97hqcixewsbzyrw8oimnhl3vsum40p9geshnt5wcuek1rci2icxkchb5dtizimucod1cd9hongxhnfb9ieb1ofolwq6e72c43rbp2zaav9lgjcze7b8',
                name: 'kh8oltlh0jz6of39qo98j6d40xutwa5r8udhrjgel9t5139zcsew2owuil6f5ud5sdv7grfme47n74cbzmve2eb7i8rxy8k8myl2fmy715rrvtseutdjqbdaza8d92qr3rzwaa097iuvus4umxegcnncx6pwvz8q',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                
                flowComponent: 'o7k8g9w1fflkhajh13spqqtmovko79n4sqzba2dvs8ckx1x61mf1038nkpto5erfsw6jfbir9xcejjmoifpngw85bacu5mrwrqvk9dqg3vboehrzrf4l0r3gkv0gxhc26d8bqeoi3vbyubvffvdf1hp5eus43iak',
                flowInterfaceName: 'zjv22eefa21fbbsle7hgob3k3o5p1gwm4xumwr41p8t9f6on3cixisvkvy7i9xomgo1ami7e3oybn8ic83pw8nldw02wbdred9mosh96usjl1gdup8ac5invamuk9h6ocdw1xl5n4w0pghyzmzeoy8ksmw60pndh',
                flowInterfaceNamespace: 'trnqy44k7nhtkqgrahzajkqq03ksa3wa0c14lwh39ucjmjjymuk8am5tmva4o0g08nb93u8n50ajxgpft0sjm027d0d85y1767p6eoespren8e7r5gr4rj7debjynv0xgs1x4k0qgmk98w9vbxgt7icndanx170k',
                version: 'e08ocoarwf488m4a7abx',
                adapterType: '6lq3ks8hm8yerrvrtr3lstj54fc89vecir7v52cnatxem16o0jb1tu7s1iir',
                direction: 'RECEIVER',
                transportProtocol: '5ngssvad40z6xarsk5vhqxsldnyutfganqykshr5sgarzxr4yhy6dscfinp0',
                messageProtocol: '3ge66o3otsjvf9uoyzss8clnludnpspxsycgm4u2q6uzc9rzz0cfljn9in0n',
                adapterEngineName: '3zcsvumkpd118wuxhct0xqd4hizfncs2z79dwy02eflpvqcya0il2eal73kj202n8e5agd09exneuffd2m77ml52crtuqvllstiv0wmcmx9movwad7o3fkuy7uq6spziz25rxob3c4e66t37ehe1y10wgu3cdcmm',
                url: 'b1666vrwzbuwee65dzdoa0cf41ewsxlox3m97mp6q2kmuh6jobidtwq4gng3vpt7fc54k14o1ycguqklonoebl72fltfaeq16ogcdn0pyhd23comuse5kvdv2zrgde1xztbvt6yfpe5vwyj35772chx2wtqtmczdgvjjdxkqcfi7oy7trkewpxa5csitm7m9b6h6p6uzcsdigy37ro2j94x9yfkdyh4xjy915jcnbfvbxy6ffxo6c9vb3kopcbe9p3w1pd61xlqt485gwph5x9gar98mztis4o9j55t4gatx0tzd80c3jcxay00wl6x1',
                username: '5x70hiymqk04qvbvgg7jetuzle91ribq6508hg2xmcfzfpn2gxr6wax5rm9t',
                remoteHost: 'z3f0w1fsb2hu6v6ycd8cdx0yhzt5kxls8hnh2d8efr6w0hrtm2bah4dq9mxgpjiiw5nwz7lvyioden16g0vv4qhq76xm6v69brizxwhxm8xe7k0pzesb0fxlwqgusiyzdyvob23vjr2f9vhzg2a1utc4u9e72r73',
                remotePort: 2862700796,
                directory: 'zngyreka8ockomg6fc8swnoyatzcrf46yptg8k6xer4p5r41oiaimsff90baafsj180ax9c1d1juuo2e2yf5ee7yxgcstv53wg7fsoc187v5kyk4u9nezuv8leozipi2ir3l7g2f9uv7f6dx17ztg9mdpk6jxao616lpn9nzftqg01qw79dz5pyf40xzfnf7rjtntm29lwowmqeggb9q713pj0e237yotowweaklfswckepys4foa0qj2kxu6w0dwiibvosrj5tj93wnjgb9ia2fdpfh1ye0byfkgf1x3fys8xl95bbx7hbn0p0p6il02ztcfkm13vaz8f78enkspn7un10uetfiqcxa79kwavowmjndtxkwxpnb93av3o9b041find114b0ax3awn0575ymzlk7fnfxm6lp1qmgn9qnbyudgu8dx36yl97xaw1f9zf3xfe9f9g8jncxgypdtlc8asw3r3ll4unaqo2os6yignmmrgad6sp3rpuo0u509jkvuqzrvx33i64hq3shtfh62rn7c5ey6l0kzb07ouef535hcmtnyr2ijrou5q74upzoic6m1juvc842k8da7604y3s2zdfqjqebah0kyzgwabk6gxwrxllygz9i7qjz757h5ygn3mkz87u34g5g17a18ywav0j1e70mn48nulvpjsyd7oqqobux62xk96xt5ll4tf0kicghuzbusznrqyyvr24helpprckq8bs0dqaan3xj6ypofeqk3rft1yfk5aanomwrlegxaq4z5yadp39bqp6y1iea368n19oz8um63p5egg8ymgfwqxfg3ywdssjrdxcm0v9iingy3lnl6priojm626l72y6n0e5dbzhyopbv0fndugwaemsxf3bm6gpk9f4z0helu425hqg5or7bg6b4wvggoo2p8yhftsqv2c80por7k2fe3q4e1vwtwfnwy0hgi9d5dbnpy9s2p3r3g2dd2s4ukvxwgc3wiy6yvldbigqqsj4fziy6t8b1',
                fileSchema: 'h6rca112sjhixtbqp6573lt6kgkui451x8mkkc0bf9pdcvb5px4oteqp4dxzhvpzt77ocbobpyngg05vzoawdx2lb74whwo4wbvd9q81zun2vn03h7vmex0qrzak7gtkabf6fbigl187oo5b6i6v76v3rre7tr6sdeozl6o9q0jjto01yhaeykdvbpdv6cf2l1zr8n30lhnzn8j2iietg6qzcc14zcd1zagh1c3sxy7t00v3y1lorgiud9wybatmnhlk876k24vq20y35gjhbf1w3hsrhpmhtki8apzzr967t79zkr0x2bo1l2ao3s14q8yfb0dkc10e1xakfymfuz2ecqt7vaic3kkvg427j85lciabr56492456e39einhvtazw1uvsvk7mogzx2rzq7m98kc6sccmgt0jikodb15epdxhkjkajs6jy5agyefau9s880pxlys45vslp1yodhp8gsgudrfaxttteixg504wfmr8r8egnwemei1238art669ta72uxlqtc9sdwpkmmkhkodsjtv7e25tdhsadzvj14l5md071gpss40x9zzmyd44stv6elghfo9n919elwcuz5utk09cjvcfzrsw00j1ely8xqb3nn7w5rycrd4x827rycpr00g45pvjpanh26oj6mvbctwprww65xjedr2ttvpm6my0tww7tqeso5f8byau50m04msn9rref0rpnnnst2wsnlzsmb45kpptxw2gfy76e05fw8aalzulppp6og1kp59kvut23faxyvg4eew18xhqhwu95sg5rveoi9493tubp9ujgooxvyeceqyvsggqa7mqtbzskganb7bzh82791hyauzismcfxbyszkjzhxqbaoid7btei5nvsqepuxmzigako1vyddobpb614s3cdp3zp1gmd9q9w6jvby7701yc6u073u612beri2sllrtsn2tavae6nxcws07caj9cp89zh2ltmwznu10n1nqjewqr14ow7y7y3yeutci0',
                proxyHost: 'j5lk50s5xko81c4n2izm3ld2km61hh5fldu3wyl3yyycrx4z9w14dib7yh6i',
                proxyPort: 3837332261,
                destination: '0gzulu8kupkondjbh45iem426mj02e9jfcydzkj67ynjcz4fjet2xff4nrmf3e4ittan0pgmax59fbnc9dviurzjldzftqp3mljk2gzbead64wedsf24yqya1wn9hrxw6c9ebisrkomtoyc306zlo5f81043ybk7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2kpxim7c0rgmvj23i052n76y2x7z5i08g8f3cjbi8ee6n5jnlfzau3s4ds81ifr0jc0im93ssm1g72cne19y8ey21v55mdaj970p28ut3epwxjhd9gw1hkekimgy1skgstlz9stvqmhns26dm3zmpgzevmm0b0ae',
                responsibleUserAccountName: 'aij47g4elukqaxrry8jy',
                lastChangeUserAccount: 'dlr1bl0j9g54k4wg65h9',
                lastChangedAt: '2020-07-29 14:33:21',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'xbukzhy2qrzdgcw7o11h3robeui8js67zrulf2ln',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'e6cd0kh5sq107idm6our0jibjdsguhxdp6938pojxavvri92cm',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'byicvd56423d3jgvueqw',
                party: 'w76r80vncxi7416obrb953b1ifkx1s6tfuxc0lxvli0zi3gi8ot2751zw6v5reuq3du2o59rb1epg7bjktccj1qfdr0hxt3z2fibj7mtyhcvxfe54ag4pk1yk0vhrgfppt2b8tcgqmkjnoykrbp9m1fr0uodo1lm',
                component: 'jqdcxqdubxt5ayondxgz9mn6jy0d47xv3su5indzub5fw9amuk86batzu6prpszsnd7u0ghcdcjiyvb4s0j4b5afgtbdik6u54b959u7ytfupym15a6xsy4a29y90g598lsggbisfvzu064e0n56csmni26d8flx',
                name: 'xsy2sc5wg4koqq4r9zspb5b4gty2tio1rmiekx2m44ij6v8d1jo6czryel3e1t712gw3xme9mamwps0n9jj62yc49ngptlowv8bwnvcxz2kd8npoejqduzu588fkspjokn15qs8nyrwtur1fysx1gx2vzkoqtumg',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '67y5jlu2zlse5e50cdbt92hnkne9aihbu41vxfgbzvyiaolet2woduu1o9i2mn214a8mwqtzs4jsy75qvng07swtefohwot1wep9reabib9x36h3eoneyqap9zuvscexmy1bdx7by50tuua31tvlq37h1hct1qib',
                flowComponent: null,
                flowInterfaceName: '15o41nntb1atmxq29crj0qexezgbae01p5f3h5ftd8hcnko7rbd6n8umzljha4u823a42z3f85b1t3brlr5ejz3gdiqhnlx2zapxkgpc9bber7amt5bh1ppi58kuy3kscqxas5rm76fdmdt5mdxaqd67uqgykh0a',
                flowInterfaceNamespace: 'l9dn2o77gfiq8fspexzm2evrd3139c7d09upd1k3zo0gik2ancqdtujihm0bg8i28oi71ehbl8v61g4a473pg8g9ix9tyitu6jij2po3uipylspna15gj2xmeona2qnd82ptsltloal2g6pyd2j78v6w3cg2dzu9',
                version: 'do83fbfw0rlpsmhvmmqs',
                adapterType: 'v23f9agzvfx9ujcu5wyk1u8hirv2zcwzssgwyx3j45puey6au0s3mfrorbm2',
                direction: 'RECEIVER',
                transportProtocol: 'npqlwp3ehwvpbqay8b9dhnfnsoahaawcbrj2rb10npoy37luzjfzcplrt7w2',
                messageProtocol: 'st7hlvejapvjuibul6n9gq6vv8647a6svx30d2ao18iqceexxywvzmy8ob4f',
                adapterEngineName: 'eckm0hhwmza4j9smxbdwwy3t91ejof0k789kwownpd4zft2mwzzdymdbjpgf7v686d8lt9xg7o192apfk6ftyde09rudomvw4g4kl0x8w8khxpnvi3e0zy52fm5922zkzxk62ayftfe5luzfjcic9q8u2lxauzlg',
                url: 'k6ypij73zt0rjn33y1x5mwbgicd0c535v9691thaik9axyaexcxt63myrfbdoz3c34yi90ae2l81u02kvxn336i73v1m7rzaqhk891keqhjuimkepbi2fyvs17dln533oc0n5nos1afy9e3jmdhldbd6onxnvf7j9cceimm8xvwz2nahd8pzrul5fnrw0twburxn6gbrpoobtmpwtlp8iyuw27zkkmsidkmripo57id8m7kh94rfsuxdme79m3cya7roszel6rt11ertx81nqlicjw8j4f1qacrvintoom3gpo5004ivg02zutmropx9',
                username: 'ui1ahjpmhmh7gy7iohgtza9vyl16rlxz20o0wd5rweojz3l5skvsue1dj56i',
                remoteHost: 'lzhebu5sy1bt27649c3mcuwu2s9tq0kpllkdmtqe6vk4gk72uicpppanysqozy0zr085dyy15duuzt6pvb8v6qd7de0uov66fdrp8f7v3nz0gqjyn20hh7jzuef8u5pn87qey1yh2wtlf1z7glk85812hv1oyqef',
                remotePort: 6132914733,
                directory: '1xsb859xjbjakzf033170ltzzd89f545xlibn4ru9yqq7ck36l8hkt5hc0z606b94pxh7cfawkoj1jsjn7cys77im0nkzbkbqmlk0gf26045jruyhydm2nks4oojn06c6kvp9k3438ujk7d28kq0hhmn3t1zdv88i6lq810ppjnj8qjdsc8fjijm160i8768gyl98mqao9wgfzqmvqm4jprek1yx29qa5mkdu9ld0m7887rhlr988v4s34n52eky7qm8emq46rzz87hg1d1mdtdd62otrdt48inzrk2i2mjqt353qz11mq42xfj5g1agv09w5a0ee3coh9f4c4kyphx67e7vb6w8uutcwuvns5c948xxms1nopje3a6qlivolid764z6hnbvx5opzxw863r4l4a98m7swdlz8ygx1vowefrkttijhtbedrqw7blmn8vok9ktxvgzjt842n7uzxvci0k908mh5rxyucy3iidwd7pn11dyzbpp3hicysh7ra7tx4uy2zsgu4f1yj2tcxbtbrxn8iclr8mik5ncjcwrtotara1z1uu1osp5b7kbdrc5cu0cqs5329k3aqsmqwsmvfp1cu3gjielar9nyx2kmgpior549262142e9atyjeltvfbzry2zr8bextuwnczpbwutsesmophmmwm2vmo8diapgtx087pmqc6k5vefac79aaat9msf1kb9nwl11uda4oh85xvc2bfo0ybavran4xx0nw6e4j68vu9qkg6caa9xhgghz50moq72f2ic46kd3rlsawdd1vn2cuirnrulrtd9pwwidj589jbra16nsus082y0psqcj23mchtqdi7hifkvw3wqh86zagm5nngy7f3k7g8qtmy52jpgzpaq7nanw8oxqnpk0md593jd8xb2vmcx6mhqwmjfp4l8gsr0c7y45lgv2lto4yf85g30vyt1iclqoi6cqcqi5i6tfl7h76ylw7ojhdmgpdqtc7ql2qw2k566ieg80ywy7c0i',
                fileSchema: 'jbn7cf1ta5pvr1gbq5vzdq46nww8j3xl8ast1p2j6oa8oyh8lga0kp4ijmbgt2doid7shb8g4omh1nsfrimd06y7mit8bmvtrvsh0oakz7ov2u86z7ojgri5qc79bals88rx1l02cwzwvqr07xnxejwo93yp4ru0913lqs4vpjt6tf5apnbqc2104r4vev2xepvljruph771gvdtl7mzuj6iwdp99idgis9ovcj5egbg6s93f46yc2nkna22ghmeqnw7ldvvq1jetvewqsdpsoch948363mxklm8zac8ggk51a4gdapga3zrvb79cv7pjq3c8gsuxv9t6dhmlmun08fcl4rtqej0vwx8aipl64tx2q29i9erukn4y55l8kcselygsbnr0og4y6j14c3rwk5g9vs4s4wg1e5vk2ws4vqgpo1a4ja4o2xgv7t672jjqlcdpmhegpuyytr5wiuwv9w3oikl2uvx71z8j9g0n6k0e9s0arg4x2tzi0xtmswo14c7bcibn1hhm2nak27t8yozlpewsw2k4kll0exf5u10axsx4o2t73h421hca7khd33449z786nyoyvtioc5kj2ltw09pts918bv1cd41npfmljcmvzg0ce6zix8jzu7pujk11hw6vksox2yovxubsxltc2r9fgr1naotk8gyiivwfg57b124ffl5o9t0tqmemca1pdoy0uxufi6xuchzzeb9nrz86iww2v485h1qltyse7vkarn970d3mhz28by0tm1vdczle8qzc4l4mv1ystjt14t9h3drqs0ikffmb78x41bcjllrrh76l71gtbjhxnsy5vrb12g1ih29bp9gfmzegedr8c1x00vn0h8ezngp6rc52d2bk7jx2sbg3wld2dw53ptuqh1im4tl6qloegyw08187t4i0ut0oe88kideu52rsp19sybzpzl29gwvfzndwdzo7jdo6bjr8gk6h3vxdzhu7g4f7udgje8i1wek9c12rqspn0mrm3gub0d',
                proxyHost: '6ck60virlo4f0noh6gplns6nc0l543arz8p06zpag8fvbnsk807gbyngux5n',
                proxyPort: 8099037932,
                destination: 'esber1spjeypcs24s2c5tjbz87kskbedv2nlh6tbb09ljiqzd7atk0qyepcvltguiq0egl9b88wygoda4hs9m43rkzb6escua7og5qap68mxcmaxe2qz3hptnca6wgkem7esau2m3dj215z4ufc7fb33ctm1vaeh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wv819nsbw1zhtwqunqr4dtktw51p1r1hjp86vddln45ell90oxhetmnsa5n46cgyta1l0mekmqxyy1ylvnn4g8qipd4p3hq8fjjkhijxo02h4mmeq1ig1t21bz9guovzkbzcncdmhp9jyja9kmvzvrorsxw3qwhv',
                responsibleUserAccountName: 'oxt2j5fayqw111cewmqm',
                lastChangeUserAccount: 'nkz5n030wkj52vck1gv4',
                lastChangedAt: '2020-07-29 03:51:04',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '9g3v95lmdjgt63hhrq9cipqaslqy41jxt26lh2iu',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '63hrgg7ntyli90z82b2q5j568ply3qc6642qsnowpt33le9kdj',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'a6293r9fxz0z7p01vg80',
                party: 'tob30xpesf8gvnnw4s8re0vjgox335jk7mxwyadzqmgxu5kx45z3exv95gv5u554xycnpm8xcbo8mo4jsp0dathptwi3p4hmcirdxtgaa28wjz8p6vx7v1iqscxvdw0wjf2atewzdqofgcxo64uoci8e2kxhrdiw',
                component: '54iwvdck89eti44vdkycogs99973hdlfr8r42ph1hot8zujixo07j8bt9l758r23odzg4rl5c0ksmcku84lws3245dzgw61cx4qvf92c1en6r4sjk5czw8845cdxz7unlljmuj291m1iyei6q3mtj3oq9p5wh7a6',
                name: 'dx0ld7edairma7q4hqnks2sx5w1ggl31y48nguqq0d9ro5mxf6uvfoj8afe8uho8lzaksnhb898xk1zonocvcsz3ogkok2q9o3o29prhxjtlchhp7pfun9td7h28bclbki2g00khrib5745qz29kdz2l8cu8l02g',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'arsv7z9ndo79y5s9g702hyomjqtglcu0advltc200qj8fswetfqfp8n3yqmuy9py8u19rpiko1jkk6avvtegux32c5p9v0a78vmg6154iswd53n7e7khf43fwicrbwclcd955bw289ki83c9938m7pxs9c3uoph1',
                
                flowInterfaceName: 'hlfhsslr4mhojo4erlu2aavs7q7cy7a571k9fypzbd69dp5zpidvgmqwdefjjx2nu1l20jnnp5pcxvvdd4xzh66yrgdxczn5pzrggmi66x1fvy13jf4h1829951ep25gjoaqv6imfj3yqamfy5ezfepzuqc5h974',
                flowInterfaceNamespace: 'z8zh7a2y4wm7j9z1y9ncfaezmqh5gw11n0i114z1bakv2uhex30ddn6153tqrffuu2g4s6q91dluk840a1yodv0f2ro79r7js6btsc2calupijehm8oppeoebcxp7ifh4vsa9e58xajrgabgjw95slomnl6icski',
                version: 'vdxbo9n3s1ja0vrfxg1s',
                adapterType: '1an1g25bllr3wur9fch63qw9i3hceamc9vedudipvs2cz8rhm2ude1n9389a',
                direction: 'SENDER',
                transportProtocol: 'hv8f9zg33d8gqr8gbn8q2ttjgdsjvusgol2f5vn0xcjyo8md5381n9c5ahy8',
                messageProtocol: 'b4ti48fcrj81ha9wqttofz29r6zto0g683wguwcpb391qbxix2go8zq1ffiu',
                adapterEngineName: '8s0rjsseyu42njbp5mnqxgkv0b9ulo6etabkwnopqsm0u1xarf2nrt6l2ht4ouimrqvbo6qd17axobmrj44v30vnlkg814jfx4pkdgjsx2ex7uqcdldznfm0gcmyrhl519fs6ipn3zmvedrsdjsmz9jisbrq86t9',
                url: '8d0rcrgolqmkvvxy1k6gv0x6pwetwpfzmgxx33z73xciq1303w3shxqvzh2ho2ucc1nwqo7mvbtdagkjvunnl8eiknj1o5tu5qn8edbgwn0po1cz2fac179rt2ter7n5sfpq8867rrsvdkw3uoeuw44z2oekhbmqxd9tdutvatdtrqbdahzfyrtny9771rppj5ohy1m7rsf1nx61wotlibzol4fp6q54x2u9ulf267sb1001za1zw4vtbpfb1ju00upcomll6k1goc6sxju28r847mct2qbq494c6aby7j5bny7rarhmerub8pz42amp',
                username: 'erxagn82ztz2jcnk4ql7oqww6auc00zrm67bkkxjvok3uedmvmj1nvx4vacd',
                remoteHost: 's8vsx6loygpbuajmc2tv7v9gjyk09s9dmu1d2kyp8y8h3rmb7ni4ixdo0o7rlbh4tldg7zf1ih944eu03ttebbg0cxlj58nrmct354kau3wnbrkv0ulg31uku9ul111cidwdrrwjt7ad3205ghugfkwrbeddgdfm',
                remotePort: 1816379519,
                directory: 'xq8icpkc19x5qdb41de810xnp838tshzo1wn0trhj5bxgm3q5fv14y7v9bqr0ebsxb29urhy3mt35v2ifmkgys9dtmid78p5fes9pleoy9p2p9wokfp3byup6dl2qriaw6wrriddyies5xn7yy632wnoarzkf3exyd14qgp5uq2bxmn8gi4kwn5qdyz3fahljg8yxw3qmslmhe8jevg4xgw8lhwrph55u072nu773l0043k21kd6t94femgvs8qbhh8076koro7hahn6gw0eqwwca3jtxzazuok7erhypoyyv9vggnai7bgf5mly07xr221trsso63dd42727ss5lcc98m22gdh4pwpwdfv9cr07v6jqhgb46dqqeqicg1eid0zazvfm3u2njilbh68tqat1bj2n8mcnd1rrhwifr9fsa9krevgg4tuu4ftkqfqlnmte35fhyy221pc8ogbhkn9trflz3o7ii9wsxbuwd40nmseb0md5psx6b5ggow6sod15bbodgutq7xp8rlorn8ndjex0x98wrg7g18u28lfzbq2qt3ur2et3wcnjw7ar894thp413p3y4u27o41k023qf9n6zoj43iicgw4uxngwgziz9s9hx6x24itt1mpywo30rfns1ghtv4438esrt6pf885wl0q06wbi6vctk3nd2obcqgzum8aqrctzllo786p2kjg54mw853jnzznrkeoyol3ijkpz0ysvtqwnx4q67s0xyx3vfq1g7tte2l16m24ctf80g8471rp6nafhvmtdg6cf6kbksjiowok1opy0dm4ezex0oq98ig15p3yzx7e703jrn1i60aqeoamw7ro6wi5wkw6fbwgxe0ao1w1f1dkzehcsi1hje007op1dbmp5i8ckthgai25myu14qccy4oy6wp4yydqo6v0zhg594yf1wqnz7l40pfo4giti59lkvlwy5rl8v6chee26hzof7f2pguhdkl046rx34arw3ipeaxr9fd3ct642affa',
                fileSchema: '6wmw0vx2nzp39myxyn9c79i7t6l6hswiwop0kfx3htfvwoyi6b1itiatsdqli1g7yjolohiy1hi4t3z5ddzzcislmhovpy6exxniip8kpztavkr64wk8j0wj1qsuaahmiq2u4j9tr2gb7lky94x9pwty90dkq6ryel5jdfcg1iepcqdtev3nx8xzj75aoxxcmwjbgxe6vecgb6e9i6iqaeawct2juksdun86d60615v319asw8dws8evc2998hzl9h27vj9r7qro6erzarl340qdjb0z20mjyq5yegh0yl7rm57bmfuvh946yycjliyn4sukq0exqhnr9rta4emtm8dxnmc2tbh7ncgf2badr26jw1h284mq2u934e9j3x2atwlgxjj12qnzv2r9f0h3zp9316y3smdb280ckyhosvehmc8p2mtz71ypjc5ce667a24wvr0va78bv72wo36m6b3r2vsj91utot17bo5zjm0sxt27jtgbjonlc1q1s9x4puhxoql7dbzdoocj92w3o04u6sklot0sin9dies6gmq6kjpw4n97foaoqkg4byxlujrhfv3ja1vxnynshjfsu5arroa9objocigufgc7u3uuxtb46pyblmtv7iaoy8hubt98d768ht20v1q7337gh8veuu8s3hiyxcb0w9eaxu3f6zz1gqelyycvyqtc5x7yrhu7z3fiyekj2y6t9ze7xdfibgmwbiv9lk38rv87oyu1grx30alz3lh25mi52gwd5sino4djrxfd6lmef70u0wzsmt9xj0hevuluerqhqn28ktogumt5uar3exdlaqcdeuefi4w9rhzpdj59b6nir19k2cxm3pi11yaweu3oxrhb6sx6bht5vwf5cpy1pvae1hivpm4xsslviy9kju6ozl4urmhu3ha3d6h1pfeboyn4qwhqbdiyd7w1xbi8n9p90qivi35oi6al8621h28qjzp366n2denjbyy86mwazggg6ay60695hjhsqkdelsuz',
                proxyHost: '01jryr6ptzzk4jot1zsg9y1omt2n6uuxroas3nt3rtgfc026vnmzqfl9rbiw',
                proxyPort: 3265699437,
                destination: 'kp6fic05suzk59o26wa13la52u68wkwcx1l0yfl3h62iyheok0nk956gyb2veufvqrluzgj9z9zde7xgfyu8wkhmp9x2r4jbndsnvohx68r6iqa69qzmnyjgvp3oxe0zp6ecod2k6cw6sllsrj8ro6g1xrmzzfc7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bcj7uqu0tdnzeqqtd0abe1f5ra27pif6qli42lfvar8ao5ba908voncupws6ry9i8occlvg6wbxz0j0guzkubh6wlmz970nwl7oqclhkl3189v12nhccd969mxveoyj3a4k1csh6yqv4g4w9suyslv36rvsey3ij',
                responsibleUserAccountName: 't4ygn1894vbr4bonojhe',
                lastChangeUserAccount: 'ts8xuiohzodcgrtadp0m',
                lastChangedAt: '2020-07-29 06:25:37',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '3b96zkwnerlcm8x5g2alw0xis6hpmbblibwvcj1q',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'tkeioa6z78qujhzovit931nxr7uuzi6mgjdoxj2eyv7ptpp8x2',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '8es2haw7etkco2i9zqra',
                party: '9t664ziorld8e99kyncjn63ap2ww75fgb7asaxtvhcc002fxkxsrn18yaqb6i1gapn4i9ozvbvmvh8hjmiq9olwj1s9hupa8dqdhpmhnbkqgyd60x673y6ff6grpvw7wnud8uhei0nw2qnp5n86isjcotd04kujs',
                component: 'co1kvytk61jjfmobedibf1zy299fdnpxn7q797cytwbwojuu9w3s1yyt3rj7cwrsq6ows2myqwhge634lu51mre1dn3ywf806ebis6u00xq2x9vivu1ldzgnij5lhxtln5f2n2lowdet4y6335ahlff612oh25ub',
                name: '3wnk3dt3w5ycml6x7nhe3gst4cr14fzvnkd0ba2lsr1i7qkx3oufv7fdjotfc8uz25cew0bcxt5y5aipskub9f2cnblhm7fz3sajixyi44r1ifq794v4a0hvqiw7zqvz4z0o6bb330dvovz205rkubisoz2izc4y',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '167aedgmm18r2dcs5bdmiw7vmw1mgfitl9n44o5re4mwq13t2ocj7r7788nrwsqgdt0ibj3bwyeavkehoclvt6rwzjo83glurq3agveh5lhog1rnlw129fk5hh07ytjr9ix473q13mw6ht0s9hawg5ocby260wkr',
                flowComponent: 'r8akgcap3882j5is97lmlsetgoj0ooz8f2tl94k0w1udpkjx0ewyzkuqvztcjhcs5pvb6m9t6p9yw7a9dxe8g3otodavcpkzusfb6o9w5j67e9p31v0be0ken9x8o4uhbg5as5kdziaqpykvr7x1wpb7di5hfpl1',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'adwrs4jabwqawi5lc7ai0gjlozjyync2k8e087rfjnhokdn6kci41cfutd01z54bnrqcmzr15vok4ha91nkjcuj5lcp0r898jjsmy40t7gxw3ygihilzmetmd96msz2e7nr9gsu3jbll0dt224811h6wtn502xm8',
                version: '34izolmj8nluiwsq3izz',
                adapterType: 'hfl0sa09rgd88c9t4p2gk7pjd98y0h2qcaerce2b3cshgqga41t9mhj544gc',
                direction: 'SENDER',
                transportProtocol: 'abcqsb5hiw4k52zymyjavi86eblptc00y2yxdcn2x9s8nu0h76ok1i0w4t73',
                messageProtocol: 'gme7505sqnnmbsbvb3axafgdg5s1tr4n9ytbt190s5r466lz7447qohzsb7l',
                adapterEngineName: 'jahjiotx1yz1z602qe0og64frg925v67520dhfyapglgdxujx4hdfz8l1288yckq4e28leyirxfhx7selnmgztegn991oelv7ynhp5ulvtm0akn4y5g9z81pzfg7ha68ogeyw5y5ar0yt4fbnw84yda12ykwe7r0',
                url: 'yotduz2h454kvvn3fxd2rbzmnf8b3dty6wg4zzzv5ka1p4ri4ihat7o0auan12qsu91t3ovtztscugeh7avsf7fqab4glu0fs9plrnh1lby56woyi7h60wyx4b7mm4nyu3uosiy5k5hdm8bzo02zn2k1gaoetswpmhlo283a0lb3povavanzwzd65tkchx5ja7efr1s5z5old8sx8t0mbquespli9204qlc5jpeaoc3sw89qh7p4a19183sryn3alnvk2h0atmk4cfcxzxjgldc8q8cfsssvpfzvd2z8oil7due5hr3a39dqq80rs49j',
                username: '21gk7vyf9koftrabolrcrjxecwn2u2z2rspqjbz5m2owv6j5vbip8choszgg',
                remoteHost: 'l0dv9i9qvpujk1xkzcxhqh20zsqsbioovod2wr6mfwcosp7hj9j8z643j7hii19a8815noh2yx22fve1h65xkirhgfag2bn665t3xyzf6ks122jrd727g2fadum9ujwv6phquacdmjm3isc77fqbcu13jkyzju3o',
                remotePort: 9108331211,
                directory: '8hgq9hs2eb7baqa1i319swg0gpyw5e86j7kmsa5z1p637yhp9sv4opi9evexjgtmqipxncdbpenooz9wcw5afn2eqe1wwwuso02u4vlpezb2t4tsnp7qfuu9t43d8l71v2lykynioy9maxq9tzo55f5ec8lytu1iwydkkyh4mbayq9vzh6zz8dgf6j8dj3bkpwdsgvgbsgh40jlfp5v11mg1at054cji7jrvav5zt72drydhh2njagfmqeeec9ugfa2dpcgpo4gwwwkycv777e8dxfvh4nysgm6pwporutzwpvnz0m4sloyyfbuugz5a5qlseqzp006ks8av9684yd877zsryexfgbyvk08qrz84fyoy7j541eeybh5285yt5z0ospxvxlcaxfp9kejw064geukhwvsa8klojjmbsiwby2xqtq4hxf59w6x2ldsllgmpcghy9ltllgm1h1q9bkh7g58b9vx7aufpnhuw0icfuprahjfodwjrs3hv5caw7kfs1d30km7ujksc08d7s3dr3jdrhgwltix7980g52inn8yl12uwl2qi6q0g045vgvoyauqrnlvqnl731yx90vgsaug7294iha41cujgsifpc24n14rddvgkae521y6rx42j1lpkuu84f9oobjcbd1l6t54oynfh33djk8pruhsqgpw8kungsi6cheg3rstk8v26wbkgyosvvtfs5v3yeuwrxzxpy5qycyacfxyhl7sz8557r8kgmxj4srt8vuvs1823ilqbhoer54qwwgmihwhj9icw974cqpwnxswpeunv8ve8b6jf5a7lxrbp3mddzozch9ueahtyf4edsh0nih3saez2ejh70haknt9o7t2ok54voubkh7nc2r1qrcmo4phpeo1f2pyzy0ahtwu0gbdjyl5v70pn9csfty9wa9s3hdfzc61g5h89oqsr689ciw6fvvgvoa2hp65gdtlgae479fcbkkig1mhouf1vwpl6g7rx1ocsexlam6x0z3ae',
                fileSchema: 'y8ojdsxkldhvkczo9h9fy9vls2iaabk7gl218rz73cx9i8l2d8vyejtb9u3gbjbi25m3zqp110s0sewxbul0jc50hvbinwmqr6xad8lxsn91d59bak666qq52m7s2sw6c73t9svk6m4mdyyev1q0zhamjr0ae6s1qqchklozqgw4hg3pd1sxvaxu9ixr80dil4z2vwz7e6f2vw9w88tbkuenombc20wzg1uvf5tp0727ltk0rl12zwfrenb1dd5dj55yngr40c2f7jywylce0i1xqbhxh7it8ssa1t67xz6dl6hj1w72bvubfff80pfkydtb7n7maie1m7vovbd4s10y7kzndofzek5iisknybxb5im3hq4k7nw9k6zuqgqf0mnq0c77wwzn53jcm89p2rvdpgqgzhzabih72mdvymgogl7g4zhv5kpv9on9va3jwrxm7i5oi09x0nytbrmoqdo3u8lud07u9ks4shqjz7iikycgmirnh7zqi3kq7qlzxmhoese73ilfytpkcth7brssszql56h4hmo2t9qa7qlhfnoq2pgp8dyz3ma461o5s77qardvnfi98xfkwg93dax8xpwimz87h6syzzbh67jaf68lv38pc10kifmcdm2j3iv9hjoavx8i8cptysqi4gnt4mlnazvsrry7pawxp812fixyy0obfs2gq9sl4ihhyxo81tf8olvg9xp84esnsycd5bnu13z9xunoi0vg1zgfmu1p7813tcblwiyqt7laduqk6g42u072sxa4rpiqeenkgwu1w3zmxm8xdxy44ed6li1hai34cahxfo3kdhv1auxszdtxp7p84iklejwq8vdi1urgnra0mwzk94maeoh4o11e4eg931nj1z5q29of2an6b9qft65zrr7gigs61rk2li8dydtbr8iz5zevifrvmgi8fu4eyrde8u4wrb4as98je8tk832frgu41jkyl37lipcnsv8z979926uxz6kertdygqlto8t8d2kxz1dy',
                proxyHost: 'iy8cqnoxvqhrjqzlz1052sn0b2g06u5vt2rirvtbzodaxst7ntcanlv813wr',
                proxyPort: 5692539517,
                destination: 't717h7u59ezbbra9z2rs9de1tink2dwty43md4kwgaeyqvpru9ar7cli1wca80h2oiwfynl6du83k6grmogi32d3m99n6l2r8wqc9d9qt51dm55aea2au3ud31ijypw5x4ltg6ov1g08z21h6pmgpv38wgueibac',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'll1euheclngks7u6ahwa0zytpvh7e6esqdzfy0qqbpbig786g71n2asxtxnt1u3pzhx7b23ixexuzr6utj6j5f76hznsycnjkm5uuecai7zzq4xujcxtypudrxm1il7cc3iyqfavjp2n2lemius3pc768abdmfwj',
                responsibleUserAccountName: '5jk5hgwcvfhjj99g88a8',
                lastChangeUserAccount: '9gra8m89iybcelmrsu2v',
                lastChangedAt: '2020-07-29 15:19:51',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '7dd0inch4erjz9b89yfn3jv1o2yk6m8dljs1rnxq',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '6wthnimqczisc0b9q45k1yf1rtyl21l38e5keylc1eganw8ypg',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'lhrmiwv872yaxq2d3fxy',
                party: 'i2p2dr1ie50ckow48ldwdffkmgcv36j4uy9atbo5bp23pc0jorf13omhqizluaa41vjrmjvkpj707a4x8md6xtmwbeb9jkpibvbavghepz8u64ivm80ypevv1wft1dn1m5r42fehfz1v6xkp15xg97kj6l9rt62e',
                component: 'rch6y50lky0sls0iopis9rbo8m3byqxzhnfkl7givwetdpgb8qxnp59jtr8rj85i27bbculsvofha30npkldvwpic6bkuouh8g15hl9a4cyhx46mefv32l4ng9t0fz7b9bd9kme8nzxwc4kad4a0jy230ms2myo2',
                name: 'opztll1uipqb5dcjeyiz9v1o2f8kb22mo8v9ij23tcj5ay05d9hjr8nk2d491nuredm7eqakstcc75p34otjrzuccil2uj5e7lveakr1i3zj4b44l55vfgtcx80uydu9eg89s7gjuk77ig4v0f3s2evqtr9tf37d',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '4eamgxf4lzsq8s7u8anoa17rit2sz0o09d46lg9qql7cpmsyjyuntegko127duvkonj3vkd13m3u937xgj809emmewfp5j4lxz9t22wvfvqiq8yox2skj42ps7dnzxduv4ayy5mhfivnmq7qjmmkj0niq1h9ltvb',
                flowComponent: 'yxgd52excb8yai8bt1lboomxxd1l8m8wcpimyxa1o69hgbv4v5hdtjg3gbrbyh29ch7n9o7xl5hp4fqqa778u5bb3d56n7ch5orqt7oq3dre0oiks7d9mzeehoneo057uhdgonhc52yhmg67e8cgjjd3vc27o7ns',
                
                flowInterfaceNamespace: '7rsvjlrjw2l59qv08u4uzg7a9o7abmv1e0a67guojk4mvekm9hb17chwmhr41bxqxj1vo90igbeh7ki9eo4k9hwy8kwt5t6ivboued540j37w5gald7b43j7ooxjyr7pm9ys3mkd3vvoi36fy8ttiwl72271lp0p',
                version: 'ht5x06vjuy8o0u28dwl3',
                adapterType: '61tcwkjhwnf9hhbdmqpb3w0hptllb0td1km41p33r0pzr24g0i5q18uz4ohz',
                direction: 'RECEIVER',
                transportProtocol: '3ordf9zcy61a3exhkko8gjran5y9raka8ul2h20id0ayi73wxvymv8ub1y7s',
                messageProtocol: '05btkp7ls11ed6uc5umnxxz00hcb5am50y1s1rdnyydzm0eqk5jlv83rlp7q',
                adapterEngineName: 'xqogejjy8inaxd3nhrv5g8fyk91y1k73mfk1l8cbzsdmagbps4i8b75alqgp205lspqagpz1hxfffy1r47dzlhpm125gbsxwybzoixomt5ortsqqzbxdlbobu1gt562kiqo7sezp8ob9brlw6d4js8drul2eons9',
                url: 'jtw55esqu3vtyaw3ju8q2a7540978ofkdqgmnpiuy3gsxxthdl8hii5k9d75h53w26vb53q9hzdmjwzato6mdwc507v1c1az8taecbnocm3r879v76suxulgyd5astd1qjw051ujhewjlg1ygl27r8jqwytss6cjjaq867u5eljmoiroapxg2wkpw1upmknhwi8rwtimk2tbet4g91w07bb7c3zoyy6i5wfpygo3d83gylzt9ndddj5co4rezradu40e3f74f08gza3jk518gulj3wh3260dodpteiky6pl37ysc8jfyech5dchqjpew',
                username: 'lk9dnc4yxeb7n9y5lx76c0eg68udsxitj2q7ges0y8h7e9s3vdjws1nzdaht',
                remoteHost: '4orfvro1j749eh4w8kloq1bi9zhpxutv337tlfzaqse6x5wvihrfopteltqbigzwgmkeyh60q6uenv7u3ckp0ukshovuu7x926ekkrppoyzcokqcs8zuk6b3pkypoxkupymeh918ocvbzu51j2bapv68a6oiz800',
                remotePort: 9672965630,
                directory: 'y6lk3aqsnff8u2kcil9m4f0sh2nwq8z6d2i042o26tmx0xmgvccn0d0psnz2ltrqapi3b4pgm4cdmvm047syxdj8z0qn39zrajw1ibhbgtr9wiosmc53cy3gkh3kjguweee55xwmro183vwmj4x0lk9n9ni17m03d1noac8rpk6w9vn64k4sxsz86cef2cz95415capzry6xvjxmejda3c2e3jeu8cgc7ne8ts824sv8x4qnvn4irhlm5i8o6ahrt3vkhj18exn8405vkue2c10vzhltrtnd9k9ccu29p3nf5jzta373gy0kdfoxfljfzmaj0jdnonkd80ybg8eediqebky9lv0306tu4s5u1h49hvry13k0qpel3a6jrzqac7bfr7je897cr3u2qlcazw9hlapafwe2i76p8v6wubbrh7newqe4xr2kxpe3omxvjkrhi1crztsktwktgc8b932a2gtq8fnsdnd3jl5h06x18ovcwv13wvexwiyfivhmymtmuqhczhnx69785t7icmk29zirmxshvmg03cv05dg93l4fl8re5sisvk4ezq7kpmoz9qp7ztadvt3s3526a5lhr5ht5udelh66bcinp3i3cwffjc4kq295zw2kc7wmwlkagd4sodbtoh4p87wdikleev7tobx34iiw9uyoebnx1pdf19nqzb65b1stzck0e7qngsxcmbudjb55nif7y04yop827sqz5rurq37npso86rlwudxvrnfto29jw8q91cvhth4bpg7lags92l3t8z7u4ufup4w54k74iljkyl7vnclg9axdw1o8fo8648473abjrud4j73y7pg4ibhopt0hovsu9s3sp9etm3cpxc5ytg6yqvyy71797xgva0fdylpaduflpirkqbh3018a2oqxngpyfmz0ixn9k3hvy9b792o8fowdhjpe9y7268yi5ie767623duhlt464svunrhtqqpuzvdmdartrpflwzw62op54cekhbswys4lx91x',
                fileSchema: 'twhtm5k3hu138n7a9vw30wj5dr94jwil9o3y07nen3uppjch69pnwlfkhqszvqzarwy2d0dnfxkxlz2k711sykf0u8uof9ezomkgdtuj16iz8kg46xyz1z3mxctyxn7pommfy6kgzqtchez7oqf6xc99fku6wxt3ytddfxph8u7hdm8x0hgaa4ij2zasqil7s7mmz8wegdrvi1qgvh3hab5trmw3uricd3g0apvk3zd82wu1v6n0if22l13v4yon91odn8x30zxqa7qc0wh6slwbvy4d6qxb2z7yrm04skqe3x60ijg9xhgh7oq489sh3yoxsf4h5zbwtfohro2je3nddok2du7pb0qb7iyjsw1jgh5wfmbxtyfe7f4of2yd0yc0uojo8oil4pw0z2png6oapniztyl0znxeefagdfpnwgt82wwiupzwjnrir1sftw7kb8ifsphf1n1x3v4yyuqj2sil0xf1cc03txzbwyay9skp6lp9ky651kkn48fuxqm32hodsv4n2n4myorw5hxj8kwk6oqzw843re6rcg8ezyu8p56elpyctlymxkcb2n6j8pqfz53n7jxkhglfo7m7adhowu23flxqrvrqnhjvz4y93g138n63z32pm9paz4k9y5yljb5re9pvm6jtwn8cpy0nesc564sgmn1bnf9avhvxmhee3rtqwwmz3ei929m46fnj9bzf9oy0hcvwad5e4qa3a96b367v1499oxi4brrggkchz3h5lilx9jsrr8gyatsqtpf4co1y3d9e9rszhla0xd620cc8h0pqf4yp5njktsrpnf1f3zbr93n5jlxuhd6owo2i3tp83fjoqro2t2g6g9f9lwzha5cbuyf0ci6pqyeca33dra7f0qdnsa68nc4xkk8679e7ma2uvlk5rox3wv8cvsbqejtbzco8udgnu1dpnqn39gmca0itx83uxs5n7tjxfrjrgr9rqbb3rdxzgzrwm09i8g6a9o7weabn0r3ukv0mrswtrrd1',
                proxyHost: 'yke6l5nkupnruqorah8j4u2i06t8ukuz0xblk5dluqgohm946278e8auk2z5',
                proxyPort: 1123745762,
                destination: '47hnec8i5yoxd5mt4zhc32q97hda398vpzlkmqdzc2e66hlvcicx8nakluhviq5mzcpcwsha18ghd6sxtr62q3c2sezht9qamar70kasgdme6edfqtuxh3swr30q6zwgr8y9vjzh64h2g3jj6uwx0hcjob2s3o5c',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mwusjj1fuswn8wihofsr2q6janre1384aqavuy146tbw98m1evhnbt1yn3764qp5dpgl6y9wvk5rhznjfbli0fwc0gv7vvovm5rfsjz55j9thkvwyy7j2303b7i3k4yow7rg4uafpvvbflxqxtb1vaf7icr3mejs',
                responsibleUserAccountName: 'vcon9gadoi60p17inmij',
                lastChangeUserAccount: '3xrjbfuxwek29b00relq',
                lastChangedAt: '2020-07-29 02:01:31',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'rpp3x9d7ddta9pl2su0xowx1kr8cq3d81oimp9ly',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'oode8ie8icmc6d8cfe7jt2fwllmqdlt7532yb467wg0nbxccjb',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '2icdr4nmsi3f5pzwgtc8',
                party: '9zk1q9siqml00ep80iwxvtw7d7hwpo15ef9grkd8eanrvug87vutarss9weo24l1i6ue5vwsb99ront1bser5ysqjb3lth9gauwr2eu2soqsjwtpzlwskbf2hed3a4jpgu6ovjvn1fff60jtrqkgtp4rq6zidhr4',
                component: 'rtcx77zy62hn85knw3k0rj7hpzqseufdddxayskaenf16v1u011xvfdy3y15u4e7xwzsgmayhp165ojlbf3qc7ut2anse7zr91o54jjti9uzoms23i92vrmbf5sebbi4xwg422riwd4em8ik6mzqy04txch52lle',
                name: 'i5tecofiqomrgeajrasgp0mmvv4239xq9w0nztljeiq0yeb75f3ud46re8suj8okqa00yjpd5psmakqfa8tcut4al1j9c76bglsfn1fho559338pik17ic6rkls0dk51v8klu00jmh0vfjwns3gxivwg069ho080',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'olsm3svgrp5vonzwl7u3pay2yec89nyaplzzympauaaelqkj4jdds6rm4p2lluzrk4yfhe88u09jegasy8ml3znplv2rmhqdhuxm7tzpwsuy46axmupefkldrnol3w407yjxa0w8kthc4mw7ug28c20fegrsz2nn',
                flowComponent: 'abvm3tqo17zjatdy5mix92d49my7q7qls56jwg25cggqk8rb0skdf7lnf408vuof4rux8u7ueii56erba6fvla6863hj5vu9ngw5mx3yjod49hgwkgc5i0hi1xyygzwereixhpdbufdecqty3txlw0vb3l7ocveg',
                flowInterfaceName: 've7vydmlm07b20rv6horosz0j8wqw9wx4dbd9febdz9jyvzpbhumxamgr4oetfcva7l4b8g3t36y9zo5jxh1w07cjnqcg0h0qa6nk3p8lg0uopfeyvsd970g690nrg13qshp3rjsu6wnu8c5nir70r60xh4bjmxl',
                flowInterfaceNamespace: null,
                version: 'z2sdnvnq03ian8vrypv1',
                adapterType: 'shhvt6kdwqidndl98oyxtbngpksfenvu8x5su12hzxmjur3cuejvq580kybo',
                direction: 'RECEIVER',
                transportProtocol: 'uo31f2ipdury293avwmbmtulfixu5uw58gje69o7pt7tm0hxoaxqp1vkuv1f',
                messageProtocol: 'z30oe0hj9v2hjhu950kgy9ffr0axhzy774my4n6e9lh427pbg1i0ruu6mhvl',
                adapterEngineName: 'vzcdnqj6hg3n4wpu1mmcouitb6qoawacbtxndf57zz97pffpdacfl1hs22es15emd5kn2b1g0o2whhrh7se3z83ljrj3ex4pvio115ozknm8z09bc62z0wnwfr0lc5oczeudduqcg6ggjovb6yjcamdgh16hsstr',
                url: 's002tk7q3ehv7qi392y9aqb646rzfjohufbjk3plx72tsrrsqmxe9eoupn2dv798w8box8tev4iebwiy18e5f568ksj7xucwyo9kelk0ll2cf84ehddah8kr6sls7ubcozevt8cjge57p10d5rdzttkyl1d0c1c6322rk97zexs5y2kmi7iy5vf0brphgfh1us6l53iweicrjuqmjumjjadb13cuxr5hcpkvr1w1626n5dt8qtbkvbcq3dbicb5gv9adz95bumpng0me79wz2g58dp3t4q95c0jtfiv37984q94thn3a88q6z0gawgaf',
                username: 'sqgr6qnqjudnbsertt173x01r3h8t7qwwcbcu0lw72ah7rmymrt0tre62yo8',
                remoteHost: '2i0qxm9d4twpy4kmths9zkxrjklowb1ho5n6j195q40op3ls8hwjen2dlihsd9lwjhofaz4nb2t3k8n7btgod9itelcgnlonhd9yxi8o5ix5p9pmmcnifolo5ghkk0efr2id3ntrzheu62zauf0amalgki6y2lr9',
                remotePort: 8742795372,
                directory: '15dvvelfdhvjktxbduszgpmgh11d10pu674nsdvf2ehc0cvsvmucjdmdjz597ain26e1ku0u9pxmmagoojoj6cw6z05m5zyslh7t2q45jbm82l56j06m9kivc1q6tefb8lr6u25cpq8qd7de6mq0odehxcnz27hzy3hg1dr9j2pn06njbst3ezqr4utd3tet3vrjl9azw6ktiw04z7uw6drf9396hwul6xn81jnrj0r9pxzzkkam6xi8iap2bl7pg28bhnd9be7p1foyofpq0wcjjd28uep527ex9h18tao2wge6cplur4j5m2eoezguy84o6ftubhrh93w84wj18yy8i8yktfd5123g9jmau7n9fg2weo3f0vmh13ndfm68ctqw2ul8k2mcrumyxlqveczfuogj1hyc3e1q7egc590ergf6qacm0nl2c1jtu30ylcufhxtgdl2z7v032ylge5x47nqskzp3khtfax26qnac2mchg0d2kccf63u04niy3t361k48iappi73yftdme8ahadp249i8uxkvrpp2booxdi9tp888e9g2gue2z0mkq4qtzotbyldn7pwhlw574pgwzowdozgjq61gcxahuhc9k0xa7it8ryqt4hgj9d4awkmp4hbwb3nae4o101rnomwf0y2fpoi3w4d578tjjtepkycbqywzoeo3ftge3stfjzdbu2bnpzij4a0j539vmma559hyz2ot218npakarjifcfpnox12cz2mttfzd7189ziv1q2i9tx2w9pd5hbzo31q1gjsgknpyyhnfcz9z4jliijsji9zqpcdswq6tleky7t8mqc0nv1p8bza05hrgls3bo0kopxeue6pp9ipq4qykbq07zjb6x8an0gr8o70jizjmkk6dex5t06thxnlgo4b6ncwy6ebu0tb89kccrrwp6yplx7npfxxedgdud7a3qjj3786erxmsoqi3bt518yt7dkoyhkv71ea0lq1thz07tusuwzhi56v4vankku1',
                fileSchema: 'w5fcalo08vayxx00jw8p36hjs81fp4ho6yezp9y1chpd3pv8obxnbvvczki3ekzttlfrrznf5occ6l4jmhtqk35u7ro5wajn17tk6uznm5gqihlxr3k03487xjs5cq6eycusfgra7vcixq1uhft6hpy7dpegnvy4xhhz7f7k7hlmrl6ztuittcpim3921ppor5c7blvgdf0sy8ef4kqbzpy7liec3ilsl6xtajcw7tdxmcihhyllp6tnd444m4ydxeo8w6t4fujju5jgcmygxaluez54rk60886pc8hfoxg8ign99ynbexogqn5zdoqi2tltk6o9mja1suu4n01woelzaigds457gaiw5rgyfuyc9okl587rxpgughl3m419qnat60vabcbmfgmak2uug098oxfhs8qjjbbwtk2l693v6pbz8dsg8qzo1dk83cz9n0tlang9kqvgehbh2lydcrpbu5e1wsvraq2qk7b50b1nf1rysc7a13vdgpt2iifh449l5lenn97biglbmb9skponq6w4jy7yvrecphyh0rrp1dnom62bb6naccj7u8ayrfv53l8gaw6vj92lii9xzfu5wj1v7oafs0dpg71xp89pjftghw7rw1sjl7o6x625atbkxa98hbaopzvcrzdbmkq9wtd33x3gxsw5w6dmhjm5ohkw8qm1e5cd6vih8vbn7s57f5qk8mb49nmtrsha4xp3sybrvo8m21qiveo5l4ojhsmc4kvw6ugw80rm7nm4atxvuh4tm4ovd8hrzkcf0q5qyqzqpx3ernnh8l3yjnnxm8r90jdflz2q7vtkyw34y7l6nxrpsy3hwzn28dw01xjyryp9xoyqohnb8ji2clbfzvs75gkev7bcjiw0a9xry8ctf19opckncjv7tmme9n8sg1ofq77yw3w5e4wankq730ot4drqf6za1kg8bqjpcv9273mcf3xppehyp8xuh24md9pyaqdnvqwdea0253jck76sdumrk3v6nds4m1fs',
                proxyHost: '0lerdvkfpvlnj0m1mri6t23gnpcyy5n5nhwfb4el00a96rrch8ifrzqn5n4a',
                proxyPort: 7984088650,
                destination: 'ffxf5kds9q9sfj9tcirus1zasp4z14e2y30l6uloskam33c737eo5z7ouelpsa4h3bzi1wv5t1t0gw5a5d377z2riu3y7ims33gcxksamh9yqg5icb6x2o3evi35fboh1i80qvyejqca4agghbbfyzf3wlgf7uoi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'wixrr02o4coqnwkrgzycxq2k980y5hlh1o3cwweh5sfz7bj460oyoffatdz4i3w47e8ktjqfcaf0vyx0bnmuwxor49mibr6h770gtpq5sfvwz3vgvw2kktv73rc2v7qwtuudi7h5jhq5h01kv3u3cq2jduk00vjq',
                responsibleUserAccountName: 's2yd9a2hrjznvob0d27q',
                lastChangeUserAccount: 'efbnmm3fajwkpt2pde01',
                lastChangedAt: '2020-07-29 12:59:36',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'qkwcfch213m7rveow6moqhsdfcizvsy0cr69nbz9',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'uprloj44jcu502ryqrjhnd82439gbgt3qcj09dtut194wecj70',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'w35edidkr6pnwi62crjw',
                party: 'krxh21rbj76q90tfv7bweoale4hms6krzch8iwsb323q0mazk5ue3xisoyhcsf32x195oclgkcqr2oqugv113ebb9jxvtto8lko2ys8ks4lr55ntc5r0h8u3y8icry3w6ezt8v50sr422d3lduytkrc5snu1jwn3',
                component: 'ufnseqbrhw8q6as50kblk6g4zb0qnr1uudhfqrhwvhldmmbjo7zgkfw0t790dzhswx26y5odaizs5lw2nxjx8bj1mb9yfmt3x1x295qqk0oi3pzo04gncup9n68bnbpgjikq89ags2reowfuuxjmz8ve5i3ncrug',
                name: 'zhiucaa31bgbzo0o1dxb5c9alyrmmvoqueabn056fcf9f4s85m7rt2iqo1by2ansyxf3lbupqgtvhxypmbqgojqe1fubk96dzkir155m0mbl02732xmeedebb8oncocfh6ov314birvqj28j4z8cc4wz7tn9bkrf',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'zi5n3xcrdw9cfh3f5vtclskmr4rzd8t3yqfpb6ray8x9ohqv6f8spid9g3y95xz13xrchrlmckm6tv4gx9qvyg0j2gfcga560myikiongaw6wukws3m6d3i9xkcs4mbg7pbrsj5xkasfkrs5atcl4v878n89zjyg',
                flowComponent: 'a27q8hmw101aszta05wa37e32z4obsyw7op9y2sewqctwa191jypcbv5nfcs05kvzevpigl1wrtvl158iiwr188os75ys7uutrz8wjxfhglzb1xsfdwf711ym3eioziu18g2bt6ko12ybbtoyk1ganbi6yptf8dh',
                flowInterfaceName: 'nil5xuertwjk53rpirrcz59sltm5h2fjntz70ygtxfni493232eh66calo6hu5u5m528par8hvi45shvawqg8lmqfaypqiwykselpioy51nx6ueomcfpz3miq3oi6jy4gttx7u2oxe6xoc5ifgnw0t97bbh079as',
                
                version: 'a83ly97lu695ilvnoshs',
                adapterType: '2jzkpslpi64uwstrhbi8jfjtfyhdqu1ypg76h9y99jgcz9pahmed82jr6qfz',
                direction: 'RECEIVER',
                transportProtocol: 'a3s6na9q7aho00jupc3x2i68eevwfnlhqzo4mcr9ef8vm5dlzch901gkgbla',
                messageProtocol: 'njpztyi284zepzajshka0xu3q52phjzmo9n9sfl7x66zdi6qtqfxrgm4dhx2',
                adapterEngineName: 'd764g4z5ct295zu0qmakgj7zmq1qhv82a07lvjlrlu7i92vp6asn8xju3v3svm924ndrki5fjeo4torddydds9kneti6un6s2b2x37s633wg3qk59rj7t0s9jbk3sar36ajtoy4uel9ro2i89wqjap1p87zoke29',
                url: 'hinb9g6qcn9fwgfwlsll3fjxzl5fcygqr0wn3k5hyh64m32gi6gbj5svim8jvgzby5iyefdvggebpnqicy8rfpr992osc9yzawc95gg9rs8389dmen0fpvf1dflcupy7e3fw7q2rvf3rtz9fb771zh6k254ydwosthuwqmtyl9q8kgij6gg0fh66xs8bijx0l8wpg6hphy7u53m7fan96wygi6igxp4qygzunpizaf2gwb43xg31cqbwicxmaen8hiruh1alnu66v00dniv7uwif23t4xdcm1jj5xby12zwftvqczldknkt0f3zmj5nv',
                username: 'cf6bshq5uvyg9ahu1qkthwc06gj17gp05ltoyskmgno8ot6x39yq9jxj3mes',
                remoteHost: 'ias2rl9m6fk2lyq3saeif0u8oz83oknr01vrrvpl93704t8e0qznl9cvkcbb7nyuqpb1hcc069f9vmncnnvbkbzfn1x77gswiui0kyfwmyhy3a2wdapdavy5xffroe97p1wuur57p5uxbwa2f11maej54mandu2e',
                remotePort: 1894676381,
                directory: 'bgqsycdxprrntmx68hmwc634k04kefbbbwqfm0set4p0cflp2570hu0yvw6rkdbb79rqarvbx1vziet6pzropt17dgbk0u9bxqr3ef13lck371ugi7it82a0gppj3m0aegf28pxggd5t0fu51022hs7jbl4fa3rioxbpdovoqit7nakaopyflw4vvkzqltcmkc2t0gl9yg7tnw9gobop5kedjvxt4ez596vjlgo1f4rwx3ai8cmn367wq8n3c797bcmdg0r0aheuv1ni7jr2r920obc7dwq0pp515cixnkycvhm6wqi0qtsasx0a41kgrfbarjbg7uj7euuj0vb9srhzqvq7yo4k7803md6s3eax8r32xgxz090m1doazryrdfl47gp88cfolhj6jldbaqob85g0xgnqb8ytqzqyfdx6jri8ro6ysxr14orrf9tawj3dat58l436bkp8b8uvr1r7law8e5zpunmkmoe1lfbx5xb405tycar4dl7bmzzkm0mhwdy6rraghzlt0f3886yauc4vwkkymmqona22sqtln0dmbbrc1f9ks3j29r56h1p0a763czlws9jxqua8asxdcld16bpyvddk1xi02cpauieacwsol3scqjp4zkb75oegnrk23e4plzx7uotw6tnzretn537ckiw9hmhu9iq8tm0s6ln7us6r9zc2h4ishltbhnpqonmtdufx7wl92jdljypp74bmh7vblai833rtekzoamecdvt4pnb5u2xjwumeyrf7jfzznhg0hpksyxsngnw8czzmiw45n6bu0gf3604efejd2o10997oxcwai4z7rrstfk1hcai5pt5rl4sbb36shkhx8n09b4i58mgc1xyq4mixzkp60cy389is1vb0o6fsrgbk606d3ndph0jcafibc7zfbs86wroh2ki2e520xqbdc82nqjh6dpga0d6lpjo7xebzli1oij9ls3mfhfwudjxm7qy3i32fgrrdyuxcyqjbzsa4lr06sbkp',
                fileSchema: 'av0hk3a3zd2jrd9ev4w32nez0ebs5b1zl4z6lbakrf0bn5lpiq7bt9jfmq5zv3lr5afht0440tah1nell9qqrl1ehddgoovqmjzhe3pfhe8ut20khx88yl2ea8u0acrzr0e6tbb0utr0km2qb2ms5b3advkx6dioy0hs6ltkxoyw6xtcqfgygpf9llwhb8kllx5gbypcb7o0x58hh6h6273xm1w1gaxriaay3rmvnhnhod5dd7f208agorkr3qbqcg6witwm2xx1wqtvh13w5log8oa52sf2orrl574mf8qaza58esrgrumaouzj8sel1jsrxrr1i6inok9ohj612v5ge6fpdpqr0u5zvxngge0zt2qo8k2cm2t3dob9knd7i1w3ab6sk516stx5uy3hej1uz5sx1y6140h3dcgodq55rim2ewkelogwkckt2vypbxvkmqecjq1dc7xgwy5efrmhp8eic94ztqxmlxe2v9veric9b5a34jklt4t4eliid5tk9mi2hrbk1z1270pr7fxdszdmka6qdwd0cdlhc2ur0x9ztz32qxg7o1unu3cd8o3pxzpy0j0l1e9hbhqnaiwxoqotiwwy1mey6ppbhqv1h89ciwow2voyxd1weev2gos91vabgqpdtht62u1y5goorwvnv21jpvdxfl3yoilt7xz2ur0l74n2snisn650uyjl5hwguuvsp9m37x2h1ovhzhhdcfj09ra4ckr6iwqrgv6tybr1hhj0qaywr3v8ip0rkm4rqc1pt1st25f0tyjag9hcmv2rd7nkuwg47vm6vfjaqmemmygxju8wtdpa1dpwkdhd9q19jgfbcpzntpjmah83k659tf7bx3z6lok7aw79kc33ghppwcbsjcv4a2ovenz6cqyhu37c2wp577tylzba8nd6amflhyefidaqjpcdarrncjsvehqx5d8ayspo21fhvgg7b07ozvwh2kwvr52h78o2oye6q7omq5let5v9ue4fjqrvx7aj2h8x',
                proxyHost: 'egysdldftt4r2auouyrs9j5mwe3sstjob102k7p26dimj4vhh0iddpys3e7j',
                proxyPort: 3444248946,
                destination: 'f4h40gku82qmxamfctrdrkwp6ezrchwp4ezhay2j42dd539b8iczn1cljneqbjrlg4p8k214uildtos6a1ab9g9mx1539xzl4s4wyamylyz9d2s5t9p4nthgdocff5vuk922g0tgefwvbxorebtq8mu3blpncjzw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '90ltheb67w243581fhd9l3ibvurrn5vh2ekwa7p9yzfmyih24bkaf0net2j3onusb1jxwbakxpzzk4wrr31jim4545khvaitaxcupi2qwivop2dtxna7lnwpenf23b9dy3ad8tx9o9k4rqyjm2607gd01v83rfpo',
                responsibleUserAccountName: 'yors774rghsrzr9c9yiv',
                lastChangeUserAccount: 'jkdl3fdfcet4zfkglov4',
                lastChangedAt: '2020-07-29 05:01:27',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'boxi7x532qwdvdozwa3fyyx8332ze8rfktelajm7',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'ec97o3wkdv6a3n40esxanmy6qmb1texseua7z5thne72ig8aa7',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'grya2m9wxpnzolllddn0',
                party: '5pdn8x9dowgc38crf3qobvbicqnabdzf6h86icdpfv2owtxzj6y4009fqndt11y4e2dv2z1vaamywy9c6qsrw9mgw61xgmd84p66frb7omj4vli5f8nm7cceert3zcqx82xh6v5qtaau7sshepzwkc0325mw4qv5',
                component: 'voqhb1nkdrh12crx0ve02ty8fapfo6sesb344gra022y3kepaf3182q0vu6nr3qp65qxv2d2sykv0bc3a7xjrgw6vz54q2fnbvgrz4q1jfyxkjmm6bni9hka3oh7ta4of3iuqj90o9edt8hu1826gpsh2zmbifp7',
                name: 'aya2grdctbwka0hm59tga4n9griuhaet9r4bs6j4ts4yjuv7k57vz1j25i6ygygg1kta0n12z0xrc55txj9mh8lv95jwkgk9jl1d5mqyxoix9bux5oqcsrdkw8plb91ym0fxdz8ktwj2u82u89rql2shkfj2i6z8',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'ijsq0piodkbd7gunks0xdo9efwtqgewv26zsij8co9cwn5m4bf7hdmq7hnx68a4zaiokwm38i94fxjrmqz0w6uzze21c6vaxco5cr2tu8qs4v24ynp01lyinyp93ufurezjdpf7qcij4iwjcxemak6azeucji5a6',
                flowComponent: '1wn6ggakxxaw6a2df433tajtvdsgwib06awbfulyxnyajafqzldfws78iymmg4ttxmypg9xfcgitrz1cye5832ezoxwarib5lrdckt9378x3dak65ryxscnozqikhrq5za8axkbfea0x17q3kil7g9piv1tiotf9',
                flowInterfaceName: 'nydb5bbx5l0jb4zw0rch3ted3rnrlostylsc5dc7nn115ahbgvy2wdxycewpkbfh0nwfh9tre6ms02wanz8gsn1cq4g9s3e1kom5jieiv9a1xati5uotjs1n4kwbwd6kt0ip6ikd7ysradevugmh4gbkgyxeq3lc',
                flowInterfaceNamespace: 'wkluptawyyidgd4w4gg7w3smu2rlfayjblcs2cyb1r8jusvoybncwr6jo5gwq2dhs2tb75k0zrya8ure7lwrp22oq0sp1kjvha8aqzgwfjd8ifewao00qegqilvlob9x9scf6jesk2x899cgjizespn7v4wmq8he',
                version: null,
                adapterType: '9v7t054nqq1xs2nmts0kglew0vl9s3mimrv1r3hoxsbu875b5678gym5nfwi',
                direction: 'RECEIVER',
                transportProtocol: 'w71p19mu9fnqpfzakutuyt843sma498410lmzbjxh8w1em2wo08x4psdv4cm',
                messageProtocol: '04105rxryorqngu49j29oc9wh7k5uspv0gt49yzp8gda5531h20ekzmli1io',
                adapterEngineName: 'laeseawrsy7qj7uwepq6hb24r38sgckyakucpispqiu40k8fqugj10gi8l0q7g8moh6guzggjzah5lznjlrldd709r3t4c3imcatgadwyxo9njqima2lrmm3bklfj5uckljcpwr4nb5amlgbsbzahbdzwkjhkkwm',
                url: '8e5kinv05bnzu4j4m4261se2fjmw3m2pdi765k3vdkem0h1lfmor3bxa6pxjckdfib3s8orgfxd46yo5ro7iv2bcj7kg0ex8uy666fnk5y0hqtqx33o7664ghpggxini2m3o1ars6kpmslz3xxa1ax50fmss3zhk79kivw2izffgb3rqjuvt9kuze1165ws1r75dy83556ooscyro7y39xaatvf6hqy38b6m08f6dg1fjq1iac6n6du85b654y45c33aun2pvq82cqbv0sgmurrr3u11ymryrefip806m1d7fqfhtknq2tbi9f3m7k1a',
                username: 'ynp9ronn6d9qrgfgrtcontbaj48dhf3dnyhs46f5pmjm96lkhj2ym2uqv5vo',
                remoteHost: 'rxnxjhs2rzkaenex0bvj28nrj8247td33zb8v18b3an2ssu3v846l16imlhw9w8mxoq7beuppx82s3x3emoaxkl1buer3twuppyur491ye84ugcjdsa181vtwz361xm2ee7mgt2z22gytn8dufjxi7zux8lkjd7f',
                remotePort: 9404867894,
                directory: 'cx138fjpf73g24qotwcik4x2mfyraurb6a1lwio6dfp8szwm8x7o73kfdlfes81ftrzcssne829hje00m403cezjglqntee3n7p5pomzs0iujbyco6rr53pmpodfp6bgafo4tsi8orhfsi47ds8mkr2des4dym9dibcw2gkecn9iplz6ta13y96eeghqmdt0l306r9aa84x1m30sqtw1maqug51j3lyiawqmg12iuu2llhu45k5dx3k2dd6gic2kugz7xr3ggullpe9ps2av1a5fqnh127dl7ti7n3kbzkwmy5pf7whnhlze9vwmwenkxosz8v16ztec57zlngnl42idq7okjjax8udg40c5uqzyobymieejlwhm0mwfbrr3knbeef4ompig8j4n2lwzlt73dbhcwntlagt33g981esxm9n8vlfyhdwlgdftpvqia8ov6tpxh7epcdp96mjdsixtlsw5x6gs7naj2gvcqld9b7ffv68m1q0bab37y9ynbayt8fuihfafq6kxxhrst6dzi6hqufvebqgbgd9bnm5gfa3w53xwzpho3xjfie4sc5kgkm76rckcl2e0fz6v6upt0wpmhibsz6u0c7854keqx8jyfpqt8k3szxt046n708eq032g2e8krfkiciivk4a0jxpc4xxxof2rq6vh6xy2n02ntlvnjxpmxfpuggoa6nmkmimnv5rzclb1y7ugvsk5ni7b6moxzsfqyhlz39u8y88nfwe3wmintnmzhc1t6slp1lg1ktpcrwq6obxb3b7ch9omyh8vjssdcfp68i8lv3ri6soepayjrclmikspga22vorjb5m17qmemmlm0wlpxfcav08846tf7rotrs21m8c1ytuwnkup2g5ntcqirz4jyt67y9095syl6hxqkfhl4eb73gz7zns9j8xgaogwtld1dnk8lm6zubzmczxgbva77oamrmi9qi44l9cxmi8dbemueexit4jawekgnx5hkb68d7orpwwe6utlv6us',
                fileSchema: 'ki9qx7s6opb8rg20b8cid4txgszkrl01n0q8cf0qcupjlwkashliubt2xuzr7kklqsjcwbyi8rslpjlos31iwewouenx9g5m2ar58tkiiwfc35kxft7lfh3x50n3xyo2cp2sfojnyzxk67g2o30i76e6k4e8d6rbtbju013cwgwf34nd86n8sc9dv00uqhoobg91vop9duvoalmhun9hw9ohp6g7gzklaceh6pzuzvto5txbv9m14ii91spl4wkm61irw6gshj3atlwrms7pmqjdj3kymd63hnfw216no3r11wuroa4a3xqqccduwfbrzq62mq1enw4fevim4xvs53l3y7x7pv7qstazdj9n9p0b97auo9xn1c6sit8doycv2t3t14wn4g07f7wqwv1fjcfwpov3klxyhfh2rhcqmszv5u76udk8y8xb9a2846yxaqqlo13e66nu2g2e9ichi1flbb4ti7yf4bti8rhgepwstdy0lbt4s4736b5p2o4744blttc3qvzbh0hic8e4hvq1zzcip21hvozcfvgujv4j7qakrotmheqbmgbdxbr472senm0kye556k4j8b979vb6wb68iujowdvn5rjipxgw7lv9tjq9yr7udb2rqvi74lmgia5uh9qdix45pzeog6hnz0epda4vtdggu4hx4qqz3b6ujqq4o9xnbbc1sq8khdoav5pmhb50czh708hu2ew06zlf7ye9ztci47az0zuixq5iqyyxy01u36sl0026mmft1t04eb44wphhymgqfuvo3akbxom6xioziojwx2f8e1chdtfa064yp1qv2pcktsj2v44jt6qacn1tcuruyw2744dy7d0pkoe7r1t9dq2r078mhqviui1gvejs390lv4tqvact36ebq1z7w8djmir5ec9l69wqpbznkj98umazt20qhy8txpais5mb1m5nh9c32mosyrv7u2iex2pzfjcf59uvx6fa9cs771k9uyahvbxrfd20jui578dffojo',
                proxyHost: 'qt7wks1ri6n2bey1q9m70qcvp011waq7t770armby1b8sjtcuc62404b3lbc',
                proxyPort: 4982261217,
                destination: 'um39ubca4dcxrscqi9osx022cirud4377rvzhddrphnt5uqlzzhmkpoz8obk1qqxq6mguhsurryjrh9mb4rpiedzcgmbzxexb44ta3lzkeqw5tch1sl3w9yr5jpd9dn27049sj5lel6izm6b3zdhd7cnipry9or4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xsfo3x9u1l8ebj55vy82gil2snuknzuhp5p2tzh0xmr46btphoih2d2yj7nsljla3ikjg9jwnkcxujtnvfoppo97z7dr8dgehneogd7lie57xfdhaygd06s3rwwba59kcj8w9lxd6gvy2licp31c0z6o3jtp6tzj',
                responsibleUserAccountName: 'w18jsz11irxwo2ol206o',
                lastChangeUserAccount: 'i5w01n5wrhmwd4egh7ad',
                lastChangedAt: '2020-07-29 12:48:15',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'bhy25quz90fjfkfbs3akqbzo866pb6eyhgxumcrv',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'z0smff5yqozgqhgmh5lx35mfw1h9r2vlrm4dnenrewrq8gkuir',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'wzm59tl2x81e0urifypn',
                party: 'h83cmn3ghcc3yrk90zdyb7uyd108m1nybwi4u2i52qlnf9rmetz7lvyilepcm9dok95yerxbrngimmcik1wl3ymtvuz37reywvljpcgqnot3g11gr1xhcyb29wg2837uwjqi3knb7zrdaup101llu6nskm87rx04',
                component: 'gjvgubn6p6hyr4q175zhso2vslimclbt90mg9vlt3waqw1o2spzewf9wulu6bityi3j119c7ypunfzi9yvm5xru1kvy38ic45jw0schfx5z5kivbe962g44qupz9brsi5ljwrsxskgns41sx7a2vjep5135h5xjn',
                name: '0lukx6pv0uapgt8wp6f2e6pivdtwtuvpjtg52fg6zrdvm7cc5409tkmcs06bkt2ywnwsyt0apvrl91q4mwbb4rw1vlz6nkv7go2ojlr85gpw27r1cugykxawc430iuqq2zsxjnintz99lj23vy3mu79igytitkr3',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'paeku5qipkbfir6xt2m6ni6pckjdf44h8v7ylk8jgeufzw3qqsxrm39ucps3rsfaahd0c16yf8ypmq44i59qgzhher9gvf9dqnh277labiwfiqj3k8dqvfcr10dfr24dczwu6im31lsstmeqf5w8m083g4bfj4io',
                flowComponent: '9r9gludnnrb5fg74p45wbn72vrgk1jc7l9loxn3ki4jrbgf070pnizalax24ynjalizjvslufykeeeu2cbjo7t1wb04iw2v2ci8lgwak9j2xjut6jniijquuukc66613oat93ch4bqs2k9n00ncmi6w3csct3oju',
                flowInterfaceName: 'q4wg9xvvnhrs4i5aaudsvnwjivy1d4u87b9x80y2q791m47i3vh1naoxyds7taam63prool1www2eos15vin9r1su5hd341554vs0msc2z75tucnx1pn1c0nlebcajmwt03e1qcz6m4ffegjv1p0vg5tr0e65mnw',
                flowInterfaceNamespace: 'isyx5oaq5gtgdrc98i4wm1ut1e8plwshd2vsd6lys8urtauiv9sl17tx5133jc53k5ngzsxidepyagyhy4xlebl35jyqbxsz400vtx41tnezbnncd6yi6hvpbpucwg3erbowpglzn6r2mzsx2o4v24scene4lwm0',
                
                adapterType: '95m68346f8gk1gbppr394z3f1769dxh5yto1hlsubfff3yenlttywl4n7ent',
                direction: 'RECEIVER',
                transportProtocol: 'dafcn4gaovl9x2ak0zr0jxo04toyj2isb8wgr5zgrf1hzxa8uge8obin36r4',
                messageProtocol: '2qq19qjegvzp683pndgkcthw1k2gs5s5fkldvqhtghph7q34unotbclmtwl8',
                adapterEngineName: 'b5yf2n53lymeetrgemt6btoi5nj3hkvdr6wm2i8xat3uw519044boophvq0l86pp47jjmmpge3jun9ql1vkcm04m2thb9upimba9n36m8ctuqnf4b83dcn5yhqxi0xo0gq5umomgf20p5cubck0rax29w7nvbms2',
                url: 'czcus27y2tnfacag0toza6m49e6pp0hsv9ym1rfn1w8ozhucxc8dnke013u5f1ufsv682bm9y33p8o1ef6t2s5iqblc3j2ldsgfhvh9n6hsprx1kxkyln9d5m2mk088exut4u4btdpqvy5qdkstp0o03ujv32sbtmj61v1ppa1c86a2a2l829ehrre5w9ulvq60bifvpxnhml6v6uutsi04dlm1i2eubr4eitx5rcxeooi688tnvgar7a8s6ux5dfdfh5qh1osmwa3fz7s0axwvn6u7lfgbn60gk59gbmtp4enhp5ul2s0uoi6hi621z',
                username: '7dv31xfyphhbcd77ap4jpmwiqewxiw9um27z49j9l8sa8dz8jz0etb60q1bx',
                remoteHost: 'eq56kfgktud0wg32zp8prq79p9as4a05jyygheqri1jegklp25iwobeucgxpmeigyv5unon1f97vie69u8otzw0ekp91vwdn0izdrba0duq0d0rlwkqxg6vai783u9kf7j0dzidzev9ufbzwvrtcmx53pemwi1ya',
                remotePort: 3736975297,
                directory: 'x9uxhqeljurahtpsawjsbf5ep97fv2ne1ogjvf0b8f6qe477t0cwjiicujwx7jb01fx9s9hx6jhs9zzzq9810a31fc4bqwa50yeyuu5v9ac20zmymws7kubi5ihb5x6acs7yq345ucwbbkjqe08h4tcxnefo0y3s6w8rbgkdh20u6s9tw1et5cnwjx00kmb36h45g6kg00dre16vk9w4qib6tzdkkm9b3lo4qz6kmfcubk0530xgbsi5h9vnmlxttqaldwmbbc1fejohyecbqh6mqgeaiuiqal261b89b604ge5twxy4ta7niv5aahwdeyqup3rexhx9vxlrr7qcpcnaxgvx1h94oj1id78os1ak6pp70656u4nn6vmhthgq3v2q35nh30crxacxv5nj4aeye69pcm84kdhjrl0j7rl53d25kble2n91a6uwrqmr9xkevoxo37l1gw7mpupaeg6qnzcs2bf3h9cpxvkevgw78bnqztvff38gajxczchzelo15jmd9vse0v1cx58bz7umhob40aqyoabktnvjbzq8phk8zjkml71e5t41gs2rr75gyymyv3y84qog9nrjnutkxzro9zr86x9mx7a12ooyqdjklw7r0iosf7dd1qv3ynojjh823jcixp80zwcnwa5nbpd1qppxrnbm2uo870b8p4iw3uioi0uz7rngu12vzbycwrvxf4cd5fgbcvdzztolagltwd0flj9fzlvd76g90t7lupjwxmu2owg1pbo4x5be4qcx9n9kcba1ofhoylbsqpsz3lra27gsyl060i8f5h7r9qdaukoynq1m4eq32r8fxdocukpvm7f9bzjp2rg76w0uqwfctc1c7audp616ch4yxtpa49b2vx5hlvv5xt46yo7zoq46nr892n8fvf6dnpcvk03cjcdy96s79pquwolof6yymh46d04q66lgc5rb6wdq62cuv3e4rqn7vdac92ens8a75w2jicrfh9llfp1lhs5guc8wue160jvx',
                fileSchema: 'fm3crvq7y39aoxvvuwulyj9m0vqghf3v9g2c4oj8ezjdajiqx0gfs834xffqp818o9t72vbsjhj5wi52qgmi2baw29mm1gi4qwdgft75kjuhkwjmk17t940mwft3jq3t7c0jilklu7zkcg5yhqxuya1o6x26mnzoi8o2cjlj5mhx1b4afevkv99jaujhkecu1z8oiybcwmcpxj0hfldv52qc2m6fu7ca3mitvf7jabaq1ukglxclfgw0e9h64ehtnkhsuhhyjobpo4iujgewf1eex7oacc0uxng15u2a8a5puukwqtjudwylv8qyquh0erdvkdvmxp38lqrtkyvdz6u43su1pjardut7ddmq15dfuifu8pqk3zl8zj8ipf7wz56ltq4ntyla1pft001zlk0cr658xp27zy2civ4ri91vjdc2f2nl0mddqdnqd0amfwzxgk0rob0use7fju7wfyu2wtq274jt9fmqjhklvdq8hkn5sv3x638fcnr8bk0ncvlx7vyhpl8qv0w107cuojq7xkgv5vtwqgoznrqodhwxfkvc12eas6da2arqsa0rcbu46f8fc1zclcz131vvwlq4x6m923l9meobm7nlh52tzd8h6abwvdayuwbzbm1msd2u2j5bobhh266lxczjxao7r7p6seihtkw3hjvjhpnm8ov2r3vojfxu264wyr0sben0bs6gjyhg8ecq5vbcal38isd1bidq8hdfetkv2kbary145qp4fw0xf55pzlwpzjnzks1xnn0slappw4ldcbc0dyvobslkjq9fsz0fglqn4eb7miw1ey78mle9sva1boi6f3qal2mjbmlvhqxjyo9e8hhpme6vvtrsm81vs1nfxy4us6k18i94tm9cu8orsxzelxjzob7yqhhplovxshe324fvgt1yy51va1n3ibl2ujqupw31ap9jku705alg0x3hh4lg5wwj54karshfk1zq0jm1p1gxabujv9rxhp3vvvy3ds1bauy7tivhjwft',
                proxyHost: 'zkh4tcj6jlx53q8j43c5ybbsdkyu7b39patzkly9m6afjdx5kxkt2fu4i98n',
                proxyPort: 7167756517,
                destination: 'x634pfirtbmb7vajmu1ku90a41b5izv4qyw0oxsrobobj8i6e8b1tg65dmntnarfclell6saotdj8old1bttjy63czy6oxi1ct3291s1s3088kb4sg8qe3z46ylmeewfn1wk0qd5ecjgwe7hbve7ljm63g7jtkg7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ex5p0so0pjqrkm8q8b1193w2wfi3aak98d6014q5i3ifsbsjo6wb3mnfzbtd6w7845599sidv90gbn29418ka8751lizod9m5aeq97vs9s0u5t1cakzyk7srxyvcmgs69a6o4ppm30lncmcaqte7qv3z6fqg8d58',
                responsibleUserAccountName: 'mq4pmvk34b5ufh2mwmgx',
                lastChangeUserAccount: '3dec68ujd5ut0eflvjew',
                lastChangedAt: '2020-07-28 16:09:28',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'qhbivecpyfeihq1tzyiymvqyy8h4imzao7am3qu4',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'obodyw1kv20vo7xmbrwy1pltuyiw0xe1jqlqivzp9izf7oedbi',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'xedybh5v0hwwxp5xczj3',
                party: 'i3zc935rvp4td0pvqd7fr8q4imb4e7wn4f9bmrn4q3klu0iapltcii5mkqs79rnuw1y31r9g1oje8co1nfyjwq2mvy1apjdq23oqtfcyqte2p1gii5wz7tazet7sqiihzzoi3ma8phdpvvpy4b9vcz06m6ndi52e',
                component: '2eak55z62g4q5so5mehx28btt75baq35f5135lz3cjsm81cjz596mbn8k0b0etkdpxz6yvcklsh60myzwvcrvmfgmt1avprajiw8m5fuwl8kh7wu0581ukwj8msppiymtzq3hxhzbh3bpbisieb62l983i3nz6wv',
                name: 'e9ezuvyie8jfva1efjbnvbxe9q1waaves9hfp3oo8mmuw69uh342one7vv3mntd6g37y85yu01hdipptzy6xszuc3zav86q5gs7jioiao1xxr4w2rtw1wfhjqnhfi9iy24m7ay0tub2pf4jkabndd6h046xpvs1x',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'ffc8nlnahhnw3e2kjppyo94ifz2s2gwp6g5ffd1dtcsbagwwd9x3ev2w1qqbb90eu524mnylapejdng6n08nqpnn7d3xztrua5tm5ysztx9au23sybrxesoaqulz5rxv7tq3te4yll41vepn17igd6q1k0xftkvr',
                flowComponent: '8pxa7yq9m520z9xkli9t8a48n63i5avt6hii0cpdtvfmminw7b6684yfailkkfaac4tpazub8hmregzjeygwvu37k8rj3tt5d2brjy29eeu2s99y6j6544ekjbp0oc6kr5yih1r5ijkwhk3opmrpsedhhuknm6u8',
                flowInterfaceName: '1vukbq02a9y9x0a9daufdw61he25yuwa92lgjqsw935dqhdspfoz9vj8cl3snjsmawkhbgc6eesk92rezqyho5ixa1nhdm0oajlr5mjne3oadu729j3dze78ohcmrsbm9wfsyxql7df81vpbpvfadn39nk3jgw5t',
                flowInterfaceNamespace: 'szgmgfqxmpw0rzc1zk6m784d56ukjrmuy09hlsgxbc228ygvvh48d2stjdy4puhlrwx5eabr8mdkqlqb3ce4ji7gy8ecjp8ehhqttiu9aqvwex54oz795lf4sa9myds44n6mby93wvf5kxyqhy8dr5k85ygfqwdv',
                version: 'vu85wg51dxzu3jyy0s6n',
                adapterType: 'j3x3f9vj7l577n10xgnpb56iwfqu5t6xs3naoc18dxovc5020q8hwz4hflxf',
                direction: null,
                transportProtocol: 'uk0jhjvjkma9relnu8d9xcd9bizsw1dhtow9y9t0aw1tqb7ii43kduese1uu',
                messageProtocol: '90on2k155im7ws9p09b7ebaor0r7i4i6ik4uiwuay89fxk5qt07lyz0qfyl6',
                adapterEngineName: 'z3ledv6re6hsyras57byrdhduvceodm16kocgyxa5s1ts88hqp2d8h9oj01cakcz6glvy1gi5lhqpudhz5qgm096beo1twujxwsqzh42ucy0jkuwi00zlkvevh7kdqlr5ku13n450puj2cg4a9467ld728k73o1m',
                url: '64qpf1yjqu80e3yjr9pqh1l04qn2y4u5u8gzyptwn4pplw1406odgtc7miwlj6h8iifbfourwmhx7keuaalcofkez64m7eelmltm98ltcdbgjv04idpqjdirwi69r9v9ufkz0hgcagbl6kte3oe23iuv511pl7kktvkm7q3jjfxkhakcgjy019y3l2zla5y1lphu147g2ht5w1vb6zfujnaecavbf3qgwczek1yjyt2ey6lw1ykikaua14kxfoxgprndtnfslej8t614wwv29ensg0f6suaazl17ztwi7p1i48g6mgu6j57u4cq16cfa',
                username: 't6tcfb182dzke2zqd9ygro6sgdrcn32lus5q358h4qiup0s8f4g6ojl0523r',
                remoteHost: 'x7d4igagtvpqt025cogp17couhfglu9goprqegh60d9ewsoyosydpblkflkq0n3iimnzidydzhnu1xj2zyf0did2n4ygeqcrogojtyoxr2eoz88olgzxg5oyydeops0cl7fqoe87o72hctew5jo8b0fdiv31efc8',
                remotePort: 9800438003,
                directory: '8prr0kcy9hck6jy9jt0pyrs3avs0fzzwy7ztzxq38ao3afgpf5p8uz1kjwq3afckbcrsbqjihowc5rnqjzdlzac7a8or2olnienbb8z8rmg1xjgjfhl05dsfp6c7d6pugr6m46dx6sj75izfk6mybq01dlbjwjv8464exi4gve9o7u25h78ktq82699m2441yyhz522ivdejbye3u388r6w9r3g54pyyfldeh9jxppcxqbye8cw4dtpc6nloamymzdi2kfwdmnt4rfafzh5o17tss6jcfvibdytybtyw7199dm842hl9c3skhjklotsg6elxkq8k06avorjtev3ogssnxmo2wo3lr3t50ewuvinc60mq08fu1lxr18fxlozt58q9q57anq1okv1rfubskpdb58b3b9hlywavs0aclooyk5zztim7a616c0tgw97zao44p7ql2zhnratyxjxjfmmkt1fw84dem0l2uxybfylybzdgz8mfddsrab2gkwp9v7var1nzuza8u8tvwe3r0wxy18n5uqtprxsbjhoc5so8a8s9b9qw1eidinnxou4b5xkaq4g2jofrcp9av6jachq33yaodbdj8rrqefuo6a5teyupc35r3ikuwkmxf0dk0ea8ix1l3om4hxy35aiqdlmzr2gr1s24dc2jhgfcsdcubyxt377iw7vxpsshsyngzsxr0px0vgta6asop0527ms45h72yvt38bl4wbek29avyywpg2ftnask999yerwysbnwqrrva4bkofmu79h5f54koxq5w2a9e5imgc0lpcbrixnt09ames5mm4rozu5e3340jryrgirzc452s0w91gvn1cnwyehzdwwct4tyjjb6j9bnr4e4ncbkmbysse2qf0wk2aq19o8sne1xgoueqyrzw9xfly7sjy9wc5cgs0bx1byl848kbqjbdczby4imjpc08yr9np0pa8tu39daby5ml660cd5ac12skoozhklqwfboobhzlfv7c5qanxax',
                fileSchema: 'zbtckneiffpwzjr1uiomvrirp67oba93h9p9ble7m5ml5gsilm5ivw3c2beusxh5lyi2k807geh2inlzorytnyly9hi66ndpp1l2um0g8cq4rd9m0e5ry7sfk06dcav8q0u6j4zl45gsfku367cke6eex9wlhw8tawaueaqkqwxaxpg4r09ucfqd8i3nxnbifbmztrnbxnrw0vfafeixhveeyexp66hpls3psetmwtqqjbcdl00tt6sx6xxuo9axz792pz6z53lp2zu10622nimaqql10u05boa9jc7zzozlfdahtwcpx6w1ly2xixi72nkke44ira39ht2lpjkjey5dafh5506vpknkv5okqe31xztbsd1mtpld648wnp8mgmjku07xfiouo759yq0bclznrg5l6a22uhan86nrv45skdinovw2deptwexjzbemlw54sdkhuikpjhvh5wyipxppu60j84fvjtw63vzqrz3h9abnifu00f16g8ldxrastapy0frcr6p1kcg7ubtss37n8oh4v0po8iq0bfmpmpb0knohucjw9ahqsqb8m4yba41j7tepacurcark5y69ganlmy1v19mutpcy4gcx9erzclo6ewhuxzep9cfgka8xalcii8ft9btov5ul9f1s0wqpguon9lunqwepr65d0id08aivl4vsy9lifrvc89wkcozknpoo6jozu39tpyw350vyp2t4nr7lz8hd6s1sob880zt9w79sqnw0c8o5u5hqt7l9aztbmsvlpfulo53ifhtqzhfndpgsyojqbplplrvokst16vk9ykxn95n2aoze9sbj48ua99tklm9zl9ljarxumu16fcpb35y7waup5iycyt7cpt27utbz0cfpub1tytkhw5c43cnlgw22exsse027so7kcgz3s0ylwjyrwln63fi3xf6swl1qkzngr84c9hpb612ths1v6f9qy2vqset9n2g46tmpb76fndtmq4tcfemyqzk3wsj62927c0qd',
                proxyHost: 'eijv3xxyj1ehir0o2s2egmh589eroz4q7d6kg9uqf8uui0fgrgcv9pfc51x6',
                proxyPort: 2924847266,
                destination: '25eiee0mq9mejepkcz42bfnizm2q8izj92wj8deftb6k2s9jxb5szn33dn5c1qa0rzqvuijpqf21nwh29phn1gvs1qensr5buc373gw5yo2qrx4gbmyqk3xgjjo60lkqhgz1jkengt8c0gttn1mshnh5s4csifb9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3fr8o52f0gk9lls9vqk6uq9lkdpe9lbd1fcyb0dbq88vdi58zq8fnljqv4tpqls1cnzkwo3ib6xcv8eov3pvxbkok6lndzelrqs5we97mxbfwh6ln6ffylwoajulimb9pouqmkfrmof4tlsjjsjkuux2bmw9fkvm',
                responsibleUserAccountName: '7trhxzmx2pcstqwlnrru',
                lastChangeUserAccount: 's25ckx81jjy1ilsll5s8',
                lastChangedAt: '2020-07-29 10:11:03',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'ol3qto88vfshu485asiu21283vl9u66nfhpt71x2',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '0ltioa63xv1q2iirz1y43aj9jc847mnkygb8uhl8xff020q0vg',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '32g2xbw7ziu1t61nz7jp',
                party: 'a37wuayk1582e81s53mny7h9ul5d872lzl55w80oq7vk6hmkwhv4775svkqgc29fzavvxrggzptwfj6zlrgkyc7e756ndr3rnt1nrau81foklui91bclg6v1guoaia27yegv5meivhr35lwdobhnb39aiek4bqta',
                component: '1wnsmsstk3zokreerazkeliig1wvsy8lcv97yq6gorsv9enr8pojy9ybf1p80o6vfaib3a0e2e9obf9cx6njcjoc3wrd7zy1oedqpxwbxfw02k65mzwtgrnecb5qv7umdawhfhqvb3h88gdf7tppp53xoifssnoi',
                name: 'zxxlldli59vt34iklimpbtsf5pjl7r5aoz8bnq91xjvhjcpzrjqmli2p0cx60uyfytn9w8f3ys95jrk020xkmoy1lzurzqu28j3bg6loevum7cn4cq1gewq7g6p7oenfv8ag4892bc6h5k2q8mpqdpjqt2drzn7i',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 't6ovvbd1ap8s76wdvr9drr8k1c9jlrsjpdpkgtyn970gua9cdqlw5x871lvyvh6ympkzczzcm09ohx0tho8awbo7hpazwqqd2jm3x8xakkfeiaq0j67nj77d82t2h172m4xwo1tnahnllgxb883bn41wl6wmx1yi',
                flowComponent: 'kpusgf41lppixp4g0qclhclke5vt8yiryv410szob9nesl8tubzc835uf3it59w8bvpz6wkb8bo3sjecxeov3ek455wqnrmfw06ia3cygmg8b9y2u34zulxgt2al17ku6rlmffqzankz56z7nf3cfk169hlcu8v8',
                flowInterfaceName: 'yznab00ems89yeyzr0dsyp4jpi1o1q099mbbb0gj2832r95cv58poypoc37t124s8blpfgo0vjzorz7ou0w9el95wejuqedjomvqtqc5byhuvx0088z1v1rnb596gbypxma7758sh3xyd2my537dgmwvxt7krloo',
                flowInterfaceNamespace: '0lnptqjt8430qukufpduhil7ku24pu07qib200d0m135tn1psxwdz1s8fmsmow3015rq3bpyv3z3pyrcwplq4i0dh89y76j0nijvrb3xs8x7k92hwxpzkzcf6apj5r169qk0u0k18rjsoe4bbxd8rzjaynaxil84',
                version: 'vn4xlih72w69zaza8ld6',
                adapterType: 'zawt5khmc81irkudgong8052txvdg76n6vrkpeoamianva2g5y43ubx7rds2',
                
                transportProtocol: 'ewy8uz4r9s8of2vgkxknjmvma7qt5ep8z7rtnvuiibwf9qesz00xbc6vyepi',
                messageProtocol: 'uyl9gh031ewzhb6co1me0pd989hpja7mj0y5m2x5vcs7zks5tomktpas2zjx',
                adapterEngineName: '25vf0f8z5y4loq89qragev085e0h5a0mg2wdt4nd65xrhftxzp8zeogji2eevcqct43wr8yxly77ks9ofox5gi2yavau5vzcig6btjr2osear3svy1t3quejqcglro3h078ho968ycz4bvq7x4znxe5otskhops2',
                url: 'aumgyw8w7qff3wpphkkf9zk3f63qzbo7c3wjuo9qh9uysh9oz8awdfqdp01xk9l6prkr5zi9sf6u6kwn69zaibao2ttiyuqzcojby30n6266l8vsqhwav5hmj1bwzgcsxqi33empno69ufnek6tf2dncowzf3cv8higpmnm60c8mms75w8lb1suenctal4buv0ed8ofb4mlatayzcg3o0a3lp4a8gbwgmmnpvkg2a7puxgh69egm6jjdwjsiip8z960vbhs6vwim0xgr9nighpduzmjjam8pktqvebystwnhwfl1nwx7ztq8hqk5wxbb',
                username: '8igpxy3s7ivm1cwjto2i1y6eswmy16xooh0cilmi3h6qd2zchm4ju0fmuep1',
                remoteHost: 'h2q57xvwxsnqxbnp7lj8jsmfeu7v26yi9ts276k8eiue19ocaeko5g9eyij506f859md6f3e5yf1fapdhk1epsgyu44o3qowg6lggsq4vzcz9tvir1xpze8klmz6txu5qacwfrm2fyis3wsf9di3w0qr40cbtyud',
                remotePort: 5317137739,
                directory: 'qtx1ezp5ffz69otw20rn6jprtkjzhygab422d4isfuzd54tl02u4bu1sw76q430zui3uobypzym4dsiamztz2oiympamjie2vpltnjy8ft8x129bbcx65uyakomiiw651pv70792i5vmsf2n2flrx46hel6xn2vx048rqzr8y7ivdl05a5j8wrvhkoiw04mnknqhdi998ocindxh9a3rox7zqv2ynpfws1y1mqd7eeivusdth8t8i0dz8d2g9oe4i2znndtirqt1y41ym3cyvh3upiu41vvhtqjfyc7rup2gdkqz2vkdvy3fpepwtg9ag831lyhtgwh5ofxq7r2vomew0gpsbfzcrou69316qb13t91eafv39rss4mbsdj7411n79k0iuia87s47mhuhevaeksq448emtv5e84o1zl0xsz74euanl6qs2icanlz64olyz2624u7yydaj3c9baoiekt28tihnxbcogs5ac5ll99icnsxfbfm6q7bgeie7grur9floj7mauzludnn5vd09r3vw7ue031589v4d81d8el1s6bq43jcvrtpl7m0g8g2j52ku6iu03ohe151tpq2ukv5aa02edwt4k14xhdscbubv6onajvos2avd12q58sl7t7sug88e3b5bwiava0z25g434lcpz0toxhdpfx03fwunm5z9y9y8shyu3hr9bzcdblderg0klkg461kkn2axq5t2l3gusmxvywp862cmgdxsfpqd5nc1tbhsggodtjtrymblcm9e3f65zckkk9xe5jh0tk9ovdyay7ggsvm2c4hdfk418ewuh41nwhe4ho8voiw5xmkebv6j7edv37sjhq6z8xrpzsff29u3x19dtxgr0d7r3tcujddxaqaxj665ox60nkv71qkicvctgsi71bpw1cvd6om9nief7fnqczkncm5c6c2i1opelu4gtx3ln8yw6jouv15lxr1pjq6cmkrhi0n7zk2h5s7t6mq01j67wzhkqoq01075nq0w',
                fileSchema: 'bhg7xa8q1kfuc94jfecpo6w355z0rno1hdk4lessi35c62lx6mrnv76jl6arpswbh2y404o30xibtso0bh27czapbw79hb757kfnmd2qssx1jjdak8bzxxuxfjb8pdq3zg4p098afxktf6gsp1upsskid57iqdv618r87zy4ex4tw819jx1lsn7b8l0xjw5kwqu87wxoujl16lp43u06owjpgb275gy6cor1ogiwlbmtq6xv8wdek9rpkcftyjbog6rvgs18azwxj7fzk7gvt4g0adtbo8kcb3b8a4ppe9ncboogfgdptbglnayj772cewnp3tsrrnfxt6nbbz263nbf3nj2o9xdmtm4axtp01v03u62ppnk8575whyhlwn6lad5lsaanlqcya873m0ynt02z7kr2o8gx3xjfng5i1fuu3y8u0nvz7bfpnj4xxrgl7j53j8rglf2cmy1l5por5apxec97i45y010psvtyouoe269ap8stvt3g56wu9vo1ccs5773yphecytvtlq4nu72z9t7p17pzh7s0vjgicrxj1s8ry73f3rhfs8yaiwl6lxvrcbae04jugdlf5zlivozsrstu2o04zocdsjz0koj6zw4zw22tqtcwim2rao0c05yqmpwyel9uemijh7bkz79s0g1df14ap1jathbtw0t2b4msv8l0vsjlhndo51th3p9d8af404d41lsvmk4opz53u53x1cd2tcmafignrf64u1xli7ba3amf1k4btj2977y05ne98xb3r7i2im2wc9mblqzrsn74nz09040h5e6g801esrfa1oul70lt1lvdyj98d1xs063qhlfqpiokrf8z5szy8zy6hocgnrb7zr6g40chpcc2j0lxzc7kqmrx80h1z65rldnbw06d3m7deyyzhy3r7554mvuazb7m0c5nb2g1o7mqu5h1n5xd1yvsnya26dem7axszfiaoytsdseb7bodzcux8iaynu7q6k2kby73ij5go2nbllrx4vh',
                proxyHost: 'tbjdqfikzp7q4ajs6xhzddh3qxywnk4up6cioci1oyr7tk582a55tvq8xyk7',
                proxyPort: 3861735277,
                destination: 'zjdn8a4u575rf9kzhdwb1zql33rj02l18v2y2ldp9081bpk0c83fug08nlm8fq0afaq2l7yf5hqh1qua41qspbnn8obdzk9y4hb4lfhxi4krebftllv9gb1ir3q2ef17o6jwhxrxlogjt77ztaotlqjtzf1xj7sp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7sv2m36xqzxiikdknt16v3x5iz04fszr8tyv580m2fwn6vzf1897baudvb5zu52rpbgc4l2vaiv9i18ci7lkslqa43mxl8i4mepoal9mfcnmkv2ob9n7sq9in0l2g25uzswjk0hkv372vlsxne0q15yclslp59vo',
                responsibleUserAccountName: '2gr7arox8fhfcma230hc',
                lastChangeUserAccount: 'illqc3wnw0r8c707as1y',
                lastChangedAt: '2020-07-29 01:11:05',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'zu6jocjm80y1vr5fvksaa6vl4ibtvzum4c40hl21',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'lxx8mo8ucqno6g17kgvlqss3ncazrq3d5ok9vc7zl9r9me8mfz',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'tbq6grzebd4mgu3couja',
                party: '4vu5wvg8t3fy3k84b61lgl2rhmlx38eekp060y84kqb4ibisyms86ovov7fpagbi4cgpgpwoe7leg56syff3ymip48bj1qzqg1cx8mdcn949dg1yq0it05ojjw6c0mwzzz0rh9oajy34zd8pvvig46o01moj7lsx',
                component: '915xa6t85uxx9krbs18521okziyzu5x1f94491jdpc9y63or94oz3szzhdg4127ypbn0ri16v1fmmq6h267z6mcgbemnqd9lpatw1am0qq3k9zu061xk4srvn9qw8scivrdyatvg2qvgfix48id6ipp4bpazmw6d',
                name: 'kbu8neu362si7gnpphrrvadynwumnn281qqwhrktbbj9uj7wxq9tk473wi2wlx3g69qvr2sgbsxytz7np8wbbuoxkhb4qfw3ktcgsluxycps6kltwrkzq73gbj80a2go01datwsa0i0lm5vbxljushlgydp2dxvy',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '2pdjcr484czb25jeua4e6mfi4212jqyzn3miqsle9b5a67gcgi5r4zfb642ei2kssk6u0kmh9a6ki7pya24u1gx97x4ete5nsj2xhnk5m3bzy7ww2knv2yyhovkpcixr1fzmwmzkpxov7j4sb99p6v2s4z35h8bk',
                flowComponent: '8yt6zsmgvgff3wtpqfc28useg6imu0rgr7ngl78k24gqcox9nzhgirm344cgdt0qt5ukd8x27ktv6adl8jxpg07axc7qxgaybq3juz5lrvfq9ik550ul2em0zzzq2uukdpthdq86tvtvep9ibtfbz0tbwtib66ii',
                flowInterfaceName: '9plqsazzc11nypsth30ednd4wqvlch1wpu063kr4jvi18awquedjtf2xqg5gz9d5l989jfiraj383yzg4m63w1euwb56bzfhgymo6mc1za33jjhio8kb97eeecfjzwj91u3ykazvkawsvxrkglfk9dgbajrcxjoi',
                flowInterfaceNamespace: 'n0wqu2tz0lq1cuvbwpwomgxmuu1pnx754smexl0f0h1r8w92bfa4gu2zoil0r2s4p78dz4f9ojn121tjw3gqqtwklx7khn45t2ei6xjd95wgmc2cv9l9m7r59dlwo4ff3z9kwwstnfufvdmyuhryrsu1ykqhce7j',
                version: 'xwuk1n48d9lm9anxwjsh',
                adapterType: '25hbsqky3o2rwo589zene4shh15wjy52bgbiyi97q570rwy0ro5980htxtqe',
                direction: 'SENDER',
                transportProtocol: 'qpdm671f7fh2i0a767lucjfbxs5z7mg4fgx4nmvfs6hqqursu95yeud2br8w',
                messageProtocol: '5vw81tvnfkmaas30ijw00c19xx6mc8eok4xsvic68kon36wng65gwjahkqp4',
                adapterEngineName: '94xdfpqoinjquifljzns9lzuqubawxo851b2n6s4qvx3v7e9tu22f1wo2qp6nqp3wkx48hogrw4nh3kmltexfk4sv1s7t5jjiqfmfuid2a1uln7he44fduv6d7tcxk8fus2yb4theemz0tfmaanqheper9j4z7r6',
                url: 'jgyvb1ddlyxjtol6cyf0abfyfqkhfi1xn28ito4l7ck72505viambqd03lmvyihcnu16s4r15a31v67q7dh6ktk6faigye36ambxlq5tvciiq42tdb6qq6331cdc8xik2n92137uxv12zh7kian3bitlnlerb6rjp0pnvojgvrncrxnih15ew6m1ggc8hi8jamlv7es8zelcu37ckfy4fsentkm2qit2xektsl92j9cbk5lbybaoxefy8dtxm8fni6phes12fqaqd3f22k5bkt6cxukqgl7qr78phyjo6c6koojcg8epuvs5218cdb1y',
                username: 'qad9dh3l1gexa973m2cijd9jw19y7csnsf70dgy1nfalujurt7k96sed1p2p',
                remoteHost: '2dqttchxzuxso5blq4e56luxtep3nmohfscdi3pgkge8uk4fba7c7xkzj2et61xb8d42914leqdkyeaxtv3o2arrzh3j9vkiutyldky1bl6px98p0w2ybon72a5ji8vmid2hev320p19depcgb4v4l49ig8heq66',
                remotePort: 1257303461,
                directory: '3ctbduuec92dhbcll2618g403eitoi5ku5louhglpumsjmjs1wu699gwvk6d2ljw71vndzn2uxmienw8adl6s5vmapsygfsg21g2t7s7q2qyk5st93v0h7krbbk6sosy492hdia73v4fmn3n1rklqmbtr0lae3ehmnl3l31ywyr7ar7kx8ej0d2s7hxlhpfapoeg5a5rls3dtiek10jq5clzv9vyfrx3qc7m6x2dp111f0d2xofwmpefoi36njy0xor691j687zzzg54b64b4h1bstper8uts44ajainqthomeavj7sohvy7b5p24dl52xyecoodjv256glgozis78rgba09pivc4dk0zadqx20lcl3txcsu4e9sl9m8ppakgvz46sq32ovacgbs6mu604xa98sn0vhaf3swo53z1ce9mp6f2p37vhi9rlil2bhzqqt3cja45dz8kxv7y4ztcr4as24261fcawitdmm79k8cg4ppmei1rj9p0lje2w4uf9cm6zy9ybq9vwecz3k8ctgrd6wbf0wuacebbnkg5sfwrp17gtmhxhnuliz2t52lzxfb0g7s6bj9wjwtkjeerdrmmsvz26u067mylrsr5xqpe4az5bpp9r1b9iaaxfc5n3hzqcmrikmlgg0mj9abfwfrqlsrkuvnzkn7zvqdxc1uclm9snt61fz2xpeuuq7x07htr08p3a7pgqnqaejp32got8kzeo5hf5540ghry49i885184y2h8nz0zo473lflwn824ykvhaiwjswyttyuvugbz9a23pqcmk7xwho78rouyuymt9jtypaczzihupvcrl07uq1nnfvfub78ciyuviydwd4etu0ss8e7ps9y7he4vplq5qvp5p90e19dsw5fwcq7jbbvfklk41mmrew3jpecjxv0kqu1zu5nqkvum30w1a15nuntfvwvj6dm7gr2s09zd6ycogl2286b00g907o1o52q5wcyjds9lkm42nag9fmpl95osm97r6rp62z',
                fileSchema: 'c5171h4g4pi5kkmti49kgml4xp2630vwekqi35krr85q5zu6tjjg80tjvmwe0ne2zuxbja1ece6z0e5s2bmxfizqm84k2k4yivoah5f6t3kmnaduzph8p5om0a55di4ef0km9uvdyx9yijhxh0nfcez1t09l6sdkde1anzjupo1w4i7hj0qneyj15qmgru6vs8d6i6omklm4p8jh98hw3furok6eq7tekn3gcuwfylxj4dl5kkb1e0h2pff04445cbpp9x6952h8dcllw1538ay6tcioboecqbizhxvkbomf9skhb58x2xkc2t0qujtf4vdx1efuwb2gyhlgogh9nd9lezus8dpv03wbtkclrj4dnuis2wzo9zeb7drejx8bggqkbdqmgozathjv33kafp0hn2iy6erfwb5nw4cwmb6zrwqk6cmchiv7j3fopvx8wkeci01htcg72odm97g3vudv2ycjsdai3pkv3qalmj7z1c502ve288mizg4wsteztiy7i8n9vo69sw0gegw67i3f78z6s281dt7baul0aik4f86nunklx46ulpg27g2oe6r0wwqfegryibhvbxtvqzchnzligqo1d73ay0gxd223pu73glx3ardzjckoanv5j8b2ztztqkyjll03xotbl4k4qz5x1ye0jvrm308zryka1f3kdjo80nfav4tj7z6pgqq2m7y3lqrh8ofc8udxf370wobugbkf4xhpx1moxt7o2kruozj2sf0ps2nk20hjc0gmnlkfbcwoup3ukarm030of5pe02okzcbb9pg0y82xn87vxw2tvteuzi3zxy2axf66n1ucdf7di5p03eijucapwkmxlotg7psfzameeh3zq6ucujtltk4mczt6zy1q82sjjzmmdvmd2s46on3dkq3sawa36lrf612acafexzttcp473fmbw7v8h8spb6hazk2oglll65uimbn79wfrsmv9c63i0de3xxxeealsl0fbnfjrtysiw1xyhoob3eve',
                proxyHost: '9y5a44dp6ynjeffej0o3z0ecqlea3gafci3vv6xj70xvj6098s5d46uc7oy9',
                proxyPort: 7044774970,
                destination: 'rm2brf0wgfgkxh1r0lnjpdt4lnewoy4v55xp5ybb2dsqj7hqh8vh58o0p2rutns1er8jwi8tgyp6cz133lkw0o4qqtupflvywq5fdyiwgrp8kb2wtpnsp0euu154l0fs27459av1wqn1b63njgge3revm8hz2kk6',
                adapterStatus: null,
                softwareComponentName: 'a6rmoltchz1w5jxcsc7b8cyj4jzt095mmqlv4tld4zndy27dirred73soibxu290lej05oxrirrf1l0brbxl9xlkxhs2pkq45krx0jp2t0mie5lyuarcohmz71frfcszlx6s3ku3awueqh582j4eyrokhm32xv6e',
                responsibleUserAccountName: 'dlo1mechj6cc5rbzm1i5',
                lastChangeUserAccount: '39u1v61vy6w9jetwhux7',
                lastChangedAt: '2020-07-29 08:34:25',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'wom6azawj3lk13814jo7joq2xonpep7ij4emsxav',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '6xthsthalu2c2p6rv96s0ffvbdedoxebgdd3hn9r3t21a9yikb',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'kv863x2krp46lleefb29',
                party: 'w6du828j9k6gnnz2vei4cw7lkfr2lwxd3vbwq0kg4hkiugj0p9ghv1o5c03cgku0x0csipzpg80pykj20zs226un94qzfky67pe0cbocxyo98ahmergl154bxshv6rk5be68c5dcadf766dd8sxsaq377y7ooms0',
                component: 'itvzedfxkqt08r9tj5xr2c42k3rew1gyvzgsh7b4avpvz1ih9f2pamvkk9717z7hq5jht5evlt5ycacilsz2edm7swutndzmr2jn4qxupkkj3a0detmtvdfikfqe7xdvi1vai9jiehpfpflexuuppibnzxngojn7',
                name: 'a4w5fzk5yh0qui4mq2el9adqsn7yitulor9lrxvjrljeeduib22db7ws7qsovilblyirkkj2m0mltva4ljpubwilkgun2nib7bciz59iinoybllv8p1rndxrwcs8pye9lq0n5f7su45ds2tjox0w5opz32ekgebr',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'gwhbu5bkotxgz484i2cw3usxm4u9s1eddv9qa4k94imoh8gxhs9qbcg0mr326lx5b2yfpgknq593x3ua1ofj0ttgpnb2utakequk415rb5hqh7sbqaqlo3fn1hv7du0qgkan3ognq28hdhwb2ciqnbytfqekfhbr',
                flowComponent: 'xmeyim8paqqutknykw1aqzjrycxobwc2w6lolh2utvt1pleacb9p5l0rcq5md30a3pebi4n87wcloc3mal1fjry31y2zf83j8ow612g9foc5jtmq6uwinrp0nbnfxa9i354n0bu62eirrwmbkqz7jxzdyx5kkfzj',
                flowInterfaceName: 'u4w9wrfs1mhkxch05gyl6cq6r0f4tflm1dfy5ux9vm9nhgfbzl7hkqlybdj8hkwenlaxc40lkrzw27wlirlzphxradphrjqkz19cuilnb60z6ri2c2pqse5xrea8kw1l0gnogs7p5rfu6obsarpu4npaaj01m44h',
                flowInterfaceNamespace: 'udzhfowe7kwxtoloxyr0l0arjtkkl6co1n2k071kwpmd7p22c0r7sm0gc73wqlmzxvkfo5ib1txi390i8d7uuuwmwhg5wdpzsea5n5wmlka6z4x88a1pwceka5zc9oiepd6rqvxsa4fu31642xtfq13w1aafism8',
                version: 'v7dujmaedoinkizlk61b',
                adapterType: '4rcnpf5dwllpee0kzds64b2t4q4sluu720y082lwuz5r9nxdlaqeny4o01js',
                direction: 'RECEIVER',
                transportProtocol: '2i4mcj0qpvp7g4fh6t63mj8erbq5278542ou1shsm2sg5v19upuycevj8gbb',
                messageProtocol: '3h9wyoc0y7p9f7bn8ljugxm4m9toe26rrj7zeh9rqpumpy9f1qmtmy6jegxs',
                adapterEngineName: 'lw8rix2yfomiq8w2ft26jebiooff0tpqggqj84whnos9m89o5y69c7hw4q7mpgulqr2sxejait8c3m1gck3gntfubv5qz3bwrcl4tw3po16ano7q1lo74vv234jdvapffjs7gk60lznzczlqa3wva7hir8tl3q6m',
                url: 'a7gsbwx90ioy1jqfk6c2vj7467z4s216bglc29dsuzr5tmlwnkyvxzf4cwa37z390b62a66ogfmyjc80yqc36fl2877rzjfnua6udza7iripxmn45lazqxgsubzaljgt2kzjthw4gwfdalzpubx9g6ln646m5e362ukrkgt1v3p0pqrq53uglbuvhhrhuw2jcckxn97ywp7de8t5wksuqjj3gw8o34hcj9c3wl6bjc6zgxa55raahrnaa50z6m3d85fnk6gr5ajjimgm4ml94kv7xbyygb7gfvow129mj5s2mjsdc3xi0tio4jxcevce',
                username: 'x34gg8jzj6v2s8mr61or986thgjvxc5tzp5vsoq9rojwb7f2snt466b05z80',
                remoteHost: 'dhs2pfni35dl4nttee51fxglyovqc7hli65zahqf2f6ut8zh7dzuf8g6wtmllusdmlauvbrjk9bwes10wq2s22xoxvhqe6ue3hu33zi08zi6tfe6ndysn2axgx13hf29u4vzi6daoo22nevuon3eeozj95046lnn',
                remotePort: 4720409904,
                directory: 'z0sltlj9s3iiq96ke2t4bo7xn04q0f7wvp4cvdgpumkk0ozhj3xdi363w015dfds2g473csute9swgdxqq3vo2wh6xl255lcpgdrkv6gvb9b1ti90f0a316qzdgl9zafnxfj2xm25qg8i42bsaszu335uiuqsavvclk4u7lpjsbwvxphu8kbj9bhoekao4o9aaf8i8yeneacnbynnksqxvkp5r02wt0xzvb03ebe5owhvb6tvgautvebye8883w78z5dy0trr64n2dn2hlutv4mspxk2tapklf4eqq4jbdoadn94nutyng3as8rek0a8bh6xf9v6qiqivleux7sp33v5oelnnil2vkr70oyw5yl94qbfeqw0awwtyeb2rqqen3lfslfijvgqb11ay9us5xbboriype4d1lq5bj8pn0y8sogec8dg0l2inr288qaerourb35uhyau364z1muz09dwx55jk92gawxcs1zdstammxrmj2vfa6lsi9xlvbsniy52ty5qgw64x3gugpi764kfvtcr854leqcrogeo9s2qe630dt96cwh43z9bfxxn4eyro35yzvbmk8nk4toed4m3fxufzpvewlw5vlxb96oiwrzte4iktyln9mjuflm12zn1m19lncnqa4to4991e2kn1yja6bbf0xge0jyod0n3shnc2d2wtgq4aelqu2yms9mji64vd5cozf1vckz2gs6nd7efktfak53sjc9o295fnzwntq433vx9021hvrwabjiqri6sr8j9yx64jl55d6tn7rl0iqlp95ho2t17ssfwskhdl4k1pjdfvwxdwo9xtdoys3effh3bv8bydhb1qg3wmvw9x3a1bwl23ji9g864i7ypqh6tkzvbp4e3nz4077nhq8zpw2hec99fncvhueamd92xp9t9mjfbtt5vk9jrjq98mc3y8sqvvr4snrraij800d9d79hbn33c5p8jmy64lzlyu8xmpy5lva1nny5lgjs0rx3ya7hk1nedrwwt',
                fileSchema: 'yrb8nihm1vxvgnk8cysp3uvo9xhuhke0iu6v9t01gwxlwu4fxekhhevb82yc61tqcdmg1in59245n8oj0ww1uquc1fqddl937x9khfop6u2r4y1602kdmoy4rrlrb7gtr0ipc2t42x38xo590ahgoyhzfs2gs0rbf5zgcdy2mt88drebv5sbspajasx4ugeak7hnw3fkbrwo2wzzpyo5p5kzqzsx7hkgtov7wjcrl0wl2fhpp5htezpt5abu5eqz8uhe0f63fyx0hmryrqbmnestua2oz6qb8tdcwmq0vuemsw72cdj4im0obcmas0cp7v2muclc1cwyvhr6har1fvgx78urtd7bog5plj0pnjoj5zy35mu81xwece7j7vgpzz5x9p7gskxvq83fy982yttivdhra0leu7zb28qqqos5wjvwhfa5hr631t39c6m4xv7d4uy83kl1x9eggil42f5niublle6qf1ym76yn4zfimdaut8wvaefannbn6pylhda7ybjvpcl30303vh0clu4r5yogkr797x1yz0au708x5jx0nue54kdctdob2ggznj8l8nxfepcaxsdqs7502rlb7e27v358trf79p24niohsw8ussdv2py2wdszg8gtwojxnltrmuyb0giyvqvl7txjgrol06vtrcrqnn5t7jbghy7ihuy1leq0j7ec6s5l56hdkg7tvw3wyigchx121ha1qfpndk40ji37zdhvjo58q8cxsafz2a2e74n5mqu6x1vpis9novj4l6herlnex7i6q5pj791kon3anh3t4n7htqp5014ci2prjitepb175f4vrzfh2q0ap3lrqlr80hty5j6dd3ygef2j5p31ak6i4vys3xvrn1oiye2i4nflwkth9bm617l20otq97ubasdr031qz21cecg8a1umtyb9k4iwufwhdxhibh52ymctlikdacdkpwddlnbwcfsgepvhnjmn159npw8v5phfompkw76n3dbv1icc3y1oky4d',
                proxyHost: 'sf4h1aff8ryyv6p90aa4j6vjuksk31xusai9pvlkpul48hsbsxyr585rd3c7',
                proxyPort: 7391561821,
                destination: 'mt2hzbro0o4ztin3gqwok70xiv4jlpr45t023ma8b38oc508tzp35govcf1b3uo6b3kjq3wpio9ztbor0zspyjie3ioos786csc3bg0w9tv5t2bmcbjmzdt1aouc8otso7lcutw84kto76fkjvao01eybdfuffuh',
                
                softwareComponentName: 'dsnkfp0iqsagfzf5q1cqjrjv0frvzmeug2j1vb4kpucihwgeeq9u779kcdr8amfdfpeh6etnn7y73v2l0q701mrx3jc4b6j619xjou8wy5yv2yi9bp90q1cs2u4i60tjh7nggfps1c9qefjuvyew7sf842i5mvhj',
                responsibleUserAccountName: '3hxm2y2iqzuaxzw462bm',
                lastChangeUserAccount: 'crc0mdoc0ysb2v3mt50b',
                lastChangedAt: '2020-07-28 21:48:43',
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
                id: 'skoszs1fb0cv8y215ckf3zobva2ify6j72rmj',
                hash: 'slbqynx0dn0njps2b1w4up2e22gmszn1vrwuna6i',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '04kn95d45kfmfguml45k99spqy6873ha1vskp8jd56xk1m8h5c',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '5ftgnucqq7urj6bypyt0',
                party: 'qc0u2czsooleiyh762ly976qfyifprrrawvjg3915jbixa4fppom89rz2vbi2d4k5dwul7e3syz5qqetogokqcsbijj4rk64b1enuu58uki0tdj2vtu5e53w2q6g82szsaznclvzspm8ca55ed5ashxnmtxkslum',
                component: 'vbnqhm45h3ddmfbvj173nr862ekntk9aji42c8kqt8g9w8khha0ty0n8crwer4q6jliacybtak5lp9yslzfn8p6ftpp0gtm3t0becz2htnrsn89uk9k6tmdl7jo4okdyo0z8oksuwkk2pot9ipj2wz1wyanybdsm',
                name: 'j3zvbit732zyelmk3f77w22ywq0j24kixswrqsxamec6psbqpmwmkkjg9wf6rpqjfxqsewq1khtcx4hrp56uft5qzw9e3qy1xmszl0oj93j1gw0c2llv9yzn4vrlqp6gx6pvr6ri0accqe1su57cixgjdwrqtieq',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'vbnej6lod7n3mpgki2u6vm2bvbdvudhe8s26z1ww88h3w70iken67t9hxigx6jpoegxr7j99fozy2z5rea04vjrwv2a9zlqqljyq8gndf9vbxyq2g7n2p5tld53qyk58y8etzme0g5l85smt5gaw5y1gav843hpe',
                flowComponent: 'ef3urp1em76lsuqvntvyrbophqfa6th4ods3ya3egrhp37wrt38m4nexcqzj7urt7ocyyu9yyaae6m6uzmn0tuhfcpxqw4yt6zamq0e75pd1ee4uoau3olfms1nqi5ilel4nclx1agxqvz1usmljpt8gz7zmj2wn',
                flowInterfaceName: '9e2nzqdoac2j39tme3f8x1s4emtiwqaofo9o1bnf3fovtg9z8yzylswlv67mgttv0ltto9tc0a2infk25naydjxtc4dgme9fa2oic06z6thgi99qxp784sp74601b83sckk493xikkrj3gcjwynoy50ux8x67eus',
                flowInterfaceNamespace: 'oohoun20zvisdd6b7fmyfovj8vl8z98d3cc0f18pyg7fs9dgqafx57zobbghhyiu89bgjt8zfvbkmtdtgojseveg5ynzhpr1xeq7ijjsg0vjp3exxisxptwv9f77xyhj8xzwod8ue3nil6wmc2u4zkztrwi34x6g',
                version: 'ya4nvmd3pfoprqxcxst7',
                adapterType: '22nqfx7kxuhohpfz9cb1k6cljm3k087fb5g5d057hz72ul4puyz959gl3wmo',
                direction: 'SENDER',
                transportProtocol: 'snj88igaq3z6eg3y5pxwala3o3y68i3t6236wj5hzxaq11icv0iberlfqd1l',
                messageProtocol: 'btvp4fxwanagruj1f1pxs180trk9koxg7qg9cnyxohf38bqtchoat4vljf1i',
                adapterEngineName: '9ho1pb2h8m26yj8zxwbidyxsxo8luf8szl9b3ewfsviuppay6ajt7mbq63u2hb7z7v7arrcimtj7g02b6o2gdpnd80q0lg4endrys63sz1cio3xk84ihu4p362qmklvmra5vd6lio9vheesx9zc6eyiqu50cb9d2',
                url: 'vert1xiaemzgs6qabohof679r0xxbkj24avcolafzkmrzwgat1lnnmmdljdrcdvchwwvadbk6mwr7h1dtyf6ge8r1s6bw3sl6zhy6adkj8es9ejc40z0kf1siu4vmf5m3ktb4jhbweof6z3h5ojl2gniqodpr3a4a0vujwhu380gg481dxgp4uu64pjbujs66t6ilapz40u6w0tpdys63atzomgpvgxzd6rf482xhjz82hve7jxk7co8btbddccuh9bg8vm4rmn52f3xvv1a0njh6l5rgvxjstdmj8qnmvrk1et1uga6fqlgtivbt5mn',
                username: 'ce21xxw029hlrqye8u4mv4h7xck80ezkzfb2oawawczrpa90aoxy5ktx3zg1',
                remoteHost: 'bgskneqzyzgk1vv5eszu2qz31bumccx8foir9xubesvawea612r98sge7kz6yqjiik1j7l33wctgkl9wri7mlzsbx7n91h168e9whhj44exk12nw1wstl162wnqz67mt7o63g3lzxqrseql7ddwcbpfocvs03szr',
                remotePort: 6558116687,
                directory: '5nekl07usvq91xicp418foxzu51ud20gl4icfgayfrnynoln0gomcke17m564hch9kudnddhpsxdhmyqum2qtkytj1pzxq1sgsyfs069k8egmmdnipm0bklrzzerbcynkni8e6hqcxy8qikazo78b0fsh99gj48atnkdemhcuo9gwx8rimypehq41ci75lxu407kqg3mfn976395lwhpp5c3mczo2jl6psxbu1wq13i4r1sa80fv09n9wjwyrqwhze34sgwlhs9lp6o1l4wqpgx20ir4vudfbadfwbn9clntkaz556xw9advri81t5dlfglu65nvrteznml86guxi401g9u2f91ckd6k4s7k0mfj4ij9qdjeykxvwsx8rulmdmvr1ossetgyu06kq96exlmb8lx9lcftqj2mvvd852w3ejnl0qijcirh2wfqkju3t0p9jw0qy59z58e0o0pknba9tlblvjhgy9o4nqhbae6kdb6qgfds0ra38v1qxczmf6038w164i2uq7vaclx41gfumzg90rp1rxm43u4om58zjeq1dt6vcf347r673lriv39ep5agqixylkwdsmosygv2654aqr2g9ynqbo4o7mfmgvt41ik0rv79um07nl855es6atuzcoblhymm159fa81k9vfhdo8xbq2t7z71sdr4ans49xj32d5qv8ph1ob5fetfaqxwd6ilg94bk629ieta5lq5lezhkw5301g1ujhg5lpyygme155ixfrw3f08mnq5f7y8edh3qhdemmlhsg466dwzgqumgnldmbw5tzzujpu3p85o60atjr33rn4zrpcipo5dkcqz8vtf4kq51knjzruuqh7t5mru91ekqoi1cmvp86eoti5c545x46mod071xjxexaknnwznlxq11aupwboug0l5sf49qwc1gywjmxox2mgac3u1p4bxallqurwvsuodz7c1nrkd3xrwgldp50sdhyp8plsnnpvcrjl1ta39eqoqjo8ys41jjky7',
                fileSchema: '2lpak3m9ah36qqdvg6jpy0z92wjbjbpj0dp17itabukwjsuj6eepau3vk0v5zvxnpamsa1osdau2i4t1ywyqca18lqsieo1j907wyqinqickfx4o9v76s37baerqbr1ujbe5s5leqwalnsmzq9x383ojrv3fyjmh6je1fvyk7gnvst3p0wgssfjsi130wi1vrw9q3vytulvo2o56gy7oyj7ktjnqse8fawqx413qzkyhj22ti6k5ks2rdthm86zjiidhrkvenbt4u8yy1fyzkvwyi4wj8fjdi7p1kmokbdton0wqfioxcvmg2pxpgo4xdu1k068332vnnlh12vwmm1jt3lce4q1vb1sgwko8jtju4oedyt27xvsszhybwrcf2oz1rgqlh7huqbh28adgz43zmx4vcn87puxipksct45qem6tbyut56v400mcqbukfrswkrxlfzdh7c9eucmqzhnqwgymvwpzevfr481k0wmxdqmrmwu99o2x15gvf9ds31tipyjrhtwbg8o9ptj4cplf374xa2ijovpp4u785ytm2vg0papn3m2n0l6rv5zgbu4jjpqgrsouy9exdtvceq2z9heye6pch3rk098yrdk3ofxh3s6u5c191bvyginqa92ck0jkq9hgv67kybenozqzlv3xvqwm0xglgs60q2lh4wuruudu5dt6wosy52d4ubylvzem4g3fgsxs3rg1kxvgth28984gc0r2f8eym6txyrnzcvsx1yhz7tsaxwxu044m3jl3zzvmxf87gimpafqkv4w0726mujj4cefnxr9hd636ehul1iu6hkflyv9n43i30d9gykzgqpyu25ex99z96ep6l3c6bih2508ubme76g3xiq10lz27lmrv0c18iedzneddtgte9kvrqleylzy74xrlnhsjbx1ki93fr9dri1t4k2ckokm722eguhy2qv6g729adzaq7oofrzibkcsy4nob75lx7r6dtfv28pk7yr3wt5s0vyqp6dek05bl',
                proxyHost: 'b13gghml75m4027ai8deud3c5bidsm5hts03ejb07dh4nzmbox99uzrw6rs7',
                proxyPort: 7594862971,
                destination: 'buh2s7nppbj690f4e40nslls3b0itusdub7882532nbmu3rekduihvo3mmzm39s9yklqq5yvomhtec8zs1eab4qc9wgbnj1hxgpm8tjkbxck5bzaxf79hpyjg1vhfgqjo654s4s4maa8wzm9mpqyww2rcbmqmxjh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'h09h2s2cabaohxyg4axjq10mto2mfx31f7qw7yiljg9rtjzjp78wapxp2c392hdflcf54yyok8tg8x4hg2psv43m0hwe23f4ymmhw60y1vjntcnnyzry81nf2r4z4bctsjs0xy411d36ggz0p1xifvgvq4iedgfx',
                responsibleUserAccountName: 'ec80bkl2vvm6ihmp8oha',
                lastChangeUserAccount: '2071sykolew91pji1vjx',
                lastChangedAt: '2020-07-29 14:40:44',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '09788jlekcf2zva08ftwlcckgbm56iz383s4tbqcv',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'cvzzbgug35loxato99ymwixxx85szd5cq2w3rig828rxilspfh',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'ukn164cnx8etnnhn6kdr',
                party: 'ww0bcso2loa14n7avvhi75sfmi1guhzq4gcqvv9ltzyxhh2fn8jtwesave64maa0d0byegxxyp0g6hhd5xs6a00aeiaqq2836yv86kpbor1sdlusg7jkbogb11omyjb3kbv6ie6fhg3700tv9oqgyi0lmlnzqlqe',
                component: 'tik6d5o8i71b76qh2n8myv4swhxfdb1gue80mf4ous5bv4ccmnkqwu5ninbfhgiwueor9knfc09a4kthax01uakbh5l2flr9uzgoghrdtowsumyim8hwhdi53z43y4do4u0drbuh8y7lcwe0aa0pz0gy92ky82vw',
                name: 'p7m2nt3y7s8slphyjn89eoy352bl22op5jzd9n6uy711nceo52zjpyu550o37ffwv1gi9h8dno2lb33zdbnd4x22luvbsxc82w11cue638vtsmwodr5e6w1pabyc46i8v4rkzlogcpjx8c7xawizbu6dpjbh15kj',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'nr0jeddoek3ckuowp12431ggw2hwaue3vc5kqphcunfe5wwrk6j4lsa3vf2lvbbevzioudjfj18zwqe72wf0pw0hnzsz9yjxo7lfgf9btae7altzfmxtchx9otkvgiba9jfnbj8ym21azerb097dc514g7f6kdst',
                flowComponent: '31nedds5dotxpmaglhx4629id5uotulsfx8krgsf8sjmopw3fy2zqfj0xmbz3qkfpbeggwzbxwhc158arasndigat0w9b97wenu4isi5kf6ficnrl0o7ae6f4dps9iw0kzp1vua4owqxsfmv378644mue45u5wly',
                flowInterfaceName: 're83nzbtkse0jr7k8ux23ifwy3s9oku0dkwl3o1zk0d1k4k2zpajz4raphhuifn605lhttsl114q9d0e0vu9l2w1poqyd5nncd9evzkt2g0f9uwav8hb6waa7vky2em4ipbvkc5bqwjmrnxjelpyn89rzpyvi54o',
                flowInterfaceNamespace: 'tb1g8i425a662v79hofoagmtc2vrwzr4ikj2chz51t2m3uavyt54upe55iov5ocuxup83uaiwde1fsuhckta6u5821obtaagyww33akxieoqdz3xaifvg06w0q392v9fghzpkzdx43n6dxz49qd0ke7r1eh780j8',
                version: '77j5s437dhk68zl7sn9v',
                adapterType: 'bubggsi3w42c45fi0ozldldff7iaizexqkd4n7rudbkrm0iic4d12wqxky3a',
                direction: 'RECEIVER',
                transportProtocol: 'y564f2iedzfjm1tod3iktg1hezjqod6pn5zb1m9t3qzsvk29wik2na6vn1ub',
                messageProtocol: 'edc08yoxv99c2jvudqlgdvwr51vccmypwb6joizqrwdupcrejcljznzfqk1t',
                adapterEngineName: 'j95hbsfbxp81y3kpwjwnhn93q0r0ydgm1qn452o402qk4jonbiuj5228qt5p32xk81h989tmrer8m1hvzw5sp9ld7ltqv8rxfqa1qu8j5i39jezg0ps3101v0l91npp2mpfxerni9lttao3fgoiq1k881l1l5ku0',
                url: 'jz742whoah2mcdiyzzdgm1do4dlf2t0h9jgymwba7ojz9jsom9ol7eskkgjyavrqw79bae7efssjte8x9k1golfs7yccwisa61fnqcj7rfyq8njmns9e08s0czyjcz0lw16plx4fsfrf2cy2p8w74x2ifcyp5kflc7ma4ovo2vfa2kcw0d5igiiq9a8b14v4rh7fmb0oujx1kpbaa9od8dmq7o748xpgi7pc6qpz9chycdulpnlb9adxacsnkbfqqhjd8g9ku1ial7umn19z2k3n4yk4as43x7ewosl0uu1o5985bg5w5jilcu48rs2w',
                username: 'qzk9b7zjkvau36di8hp79xlgyirric9o1qujyjju8dphwckraweq97hoa2yv',
                remoteHost: 'ja66lf8wl9twzwht449d0lls6t29tus5cjerd349i81g0z8w7sklgawqe6u15knegelfg5307jq6r6ymitcw3j2rsb4xfpu5c12qiwrwwkzgtw0xr63je3o2yrg8st696f901k51g093nhlpqqk9mh0n87q9kkqm',
                remotePort: 3947427935,
                directory: 'lkhwv2c2oek5t3bw1j4bsz434nyzdjwsm7yao7yu0irr83ws39k6p57id27rju77o32gshf1z0st29h6v4wqd1ppsdqcehw0zkk9l5q1gt6dcxledu9wro4w3hkg129u93txv80nlegwy75vgv6knnxttlbgognlf033bjnno3ha4bimq0lr8t2yq5gsa99tkneh4rr3negg2q010ckzczb0pzxt8cckydlgsvzkivq7zxsrp1zdc50gf42skrodwk7z2rn0ktdo7330917l7jn0byblyfhv15dxagnrjkq2thdwwhpdz9d9xj6xrhdi6bt1pafx0surqvzx387myhgiviq5f4xpetloarjufn4bm2hl0zn9c9qusf4eeqhwftfef4c9j16y8ltqpyeudzyojk2cxd6kf5w170m87c1w2jrvgok0selo7rwdstxelfrpspvh1kllnuolkzii6x9lvx74n7b8zsgr2xfaa9tpqkjoexfndqzfwi64am7077wt8foqs2k5yx2eyt47j44g1mfmld7wigd083qb3hwbg7xfhwp9l8hahl4dfyb530jh2cy3fr9oafpgyccwzezkhunj78ey0dbuoelyk4njb07xvxvpzu2cn9ohbnl87746vvc9t32qml4lfuf5qsrllyshxtavd6z1lgzwgwbcsliy6iqvxeyj1riqu1px6uguh7668fzakb9lajchqzkeeutl9xm8wcg3q4ctvkdkcenkbgbkylyogq56fmvmx4g9j0dafdvr0py6ae5tj1n0jf6yd1so9q3dpm2q0b879d6r4w4ktl81pmnhoevs0hszo6dyjra6dm7ubc4ats7vpaaylbja359ie7ka3yl4wbonlcqlv62hcx730t0pbg5kojhhjejpicqm9adlmqnvtvo1b1l3n0gqehwy3lwj8cjlhxwm5edugljsrygrzsdts2bkpamnb5o9wwyrwcanrtaricqra26j4u23zd68yatp3f6qpo98xitstbxp',
                fileSchema: 'ezvzr2bf0bth1qbpclrto21139cyzhpgbrvswebsqkf5b3alxka915by6kr9nnoi9s1tflbyled2c0v9f5ibl83ptbjs8aft11qqomn53xm0nv80ijfhquoqghrme68osjm3kllr2g2uu93mqjazvl7unmgyqntnip6ofhjtrfmsc0rlknpbzros4vvdxx2zulxaedfgq4wuto1yrqsi77qdsxjoojisbbrixg2tmy951snkmc99g4ax7vweo8wgg0tmgaf6kdgblm34fznvj355p079w8takhz8ejdm2lfbslm1gx17ql05s980m1vexaogllwkhqep275h2noc47617e9gc27bvdod3td5yegzhjyenpvqimd5iahuey3a8krklw7tm2bh6parzpb2dloe6w81edi2glol295d6ab3d4073xem9uwo8in553qv3vn3c357yab9ugv3ht6i7mbqnkuz8awtfs3tjrke75659yrbdc63u0bguepiufxi07c16strgeltww8zrsup5w6fadoz2wav0qcmm86b44ob8n6a49237jb7qd35bk5ncxk7wtt0mcd5uqiv8yloqd961caz4wz1du0a9wn7mfri94xh4yiyrjlczxerufukithvhnj00lqz5w4840viig0cqmk648aqbmvoklit6rxxmhgw7vxhjlqym8t5x9o0sfo0cyukhbiinxios7s70h1yspg22qx3dpqhi6yfortvb4scda1mfmv5gcgpd1jmvit7o3h3grj09m3f311q40mh4jva23qlwn6hhtzgvx3ua5h5der7327lahi0q4ngm4fob7kfzjhymasuvhizf4iwivcbn9yh38dsjk0zuaxsvne1y3fu342aa1vznh2uz13wdixgn9rczh7bp883otwlks0gweuzrjz18bd3qr93132wr7vsdad5i6rbrygury4a2nt9m4te3p563ptb6mjxg59h7dudfziogtqf2sk1moi29f4dt7bn6l6sikt3',
                proxyHost: 'xqp8grulowq3sf75zbjpa0i1cgbpqy1rv7glopir9dkkdsf0gnmta591jj0r',
                proxyPort: 9165164453,
                destination: 'ot9aolblxsn2x29deqzwepavbe40a2d0iyql3nvrt9mq2jsj5zs6brq681354fd5w4qqhyyktd8i9qmnr9cs3lwmcos7ff29cl6u4uu7vn798r9yfl8oyn6svc8z4f8ymld18mrvsb12tqltvsziaffwo6jcnqea',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0jt1ge834he4h6uozvp3ctoc4jq9zcl437sf72dwwgqmnr1mjxcsdxvit1n2rxj5fkkmhpnoz2zowoqdvif91a9oc1cw5y4rjoapn8f18lx8got1fkjufm9wi3pocu32h54jrabxfdwfv8d64iv5fouc52zymyo6',
                responsibleUserAccountName: 'ppfxhzkfwwngzuv4vyhk',
                lastChangeUserAccount: 'mq806b6x2relrioltkhj',
                lastChangedAt: '2020-07-29 09:29:16',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'x9mq7krsl8cu84jopg9gurvghdyiidai9v8yjjof',
                tenantId: '7j28e70gb9xr7klf9la14k859h3r7s5w93ar1',
                tenantCode: 'tlig2bdrm9zjkvvmcaxmoctehn9hrtwr7c6nnfsi9qe9s3kwx6',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'r99w1dyptw8c5spf9h4t',
                party: 's73ndjw8j4b56tj9k7zw5jn6b6740x3waspqrug2xdbfcuund63e604kfl30othku6254veukdltmnwn2hz7s70e0weqkhmado5wgfbx0vtq1xgh8xkylzb3u6h4r2nf01nvtlm1z9hnmuy1b9saes3zgw20jlc4',
                component: 'ewxwpfbh39l96ehmarsybxzi5or1z7vq0a30fof5eevlvmsp1uzfsggy1bq2qqa9yzh8xko49ilg10rzgs5ode4ec0mnxqff3zmoilz6yton5q090ap4g3rfx5b5ytgjk0dmlx1zd7935pjjic0maa05vb2vusna',
                name: '9es95ts24yehbz3g8ux51qj7oo8ptcz6fkrvt6hpjm8yf9acle97yr8yj35216cnaoeglq2jb89vwchb6my1za8ka7vccizyldecwnjtoxw3ejvs4lliazayo7dki6urt2o3qzslz48nkjt48irojhuwx2wbdeyr',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'iq950bqo8jt9npbctyb7nm12su382fa4wme2phq1qpu99a5x4abfammfz52i6txaednoc35d7uv25r2habhv36g3yox7dtpl2zf5nsinn627ypsj7t51z0axpvivxqluih768tbttbhw2i3pol495n3atjk6uju9',
                flowComponent: '57cr96s9a3k7b4nldnb6aq9swjzldog62frud4zaeq5gn6x6u42s9ripi6bxj1i6brp2wtsi8ykhuddmjebzk9io3ciafwuklazzd1zzqy7d7k60pgnckn71pi1j47wovk1a0vpbd8hvx574a0rahu3766zm78ec',
                flowInterfaceName: 'gkj189af786670ehpi59z53nnhao7cgehm698wzyatswltuaj64gtmde32wy8bc5evhspqur0wp1xluu10n6dy753h9m1m5aiund5qz30n9bjnynaibsr7ygjhlh0w6f2ma14uvi03ipzocc1lxivrvx2ydzplkk',
                flowInterfaceNamespace: 'k2ryjn2ods12thmpmlnsjdj807kgaybwuhqei1pbiv9dgwyfrv6hkpgnc1haraim60o05eujy6wg7eyngy3qpsg6s7opfcukc5d3exy5t12oxbjzjcdcwsm8b6wij9mkzlwkiqcsxvq5pkpawkk9u9cblwv8mis8',
                version: 'c42nhl2jeplqwehgr8jd',
                adapterType: 'h8n2zys9l8s1ruyzjxtmuvwqudtrhki0a28g71lfjthpmr7hyz8nutxiarn7',
                direction: 'SENDER',
                transportProtocol: '87vcjkem7x6clql1xuaw5j8uacpfsoxwu1wu4jcw06095ay3ydd6ize9z6qs',
                messageProtocol: 't2a5fo96ikykd40aznn6gnwxhyko03py1s6cw7iooulmq98hxqjiyv9qx8kb',
                adapterEngineName: '864eiquk87kzx91ecc9hxge83cr1w833r51utyfbegmlma71o4x0x2b12sqv5hhwo5sdo8gk12bodleexeb3ereu70g68u3cxc0jwu1od2nwevqp6j3ujdfwl3d7pjeblgimqa0k04om8oocdr1bosh4idiqs44k',
                url: 'zmyje10jvgrh4y5n0mjtdief1dsw7hw7y58vy2t3y27ulu0krmsbxoobgiy0f6ire8fdbr297xxy0q407ezxl9ovzzg3g9lnr98zn5e9223y8soy5c1x1tsstc9hn49m3y4or0t6jjkfsg93gm8itptjya0m8pv0w9li4brbpuuov07xlrv3icvc9wr8z5d8ftcvdpt66wtxrzp1idrqnungn03cb5xid7b383sewlqedue5hakembxl97o24r4dguinam4hxib0heotwo1tacl55cjqy3z2uhq6e36xrx9b1y8cm9xok1dvn338br50',
                username: '77byo12zrcu00r5umx4zluwey6qco6cll4iyo1mufbtcdprxxixlu7lf91k8',
                remoteHost: 'qfow4jwdxezgo2v65kd0468plqtj6tpbo9n409kfoo2e31xd47jgbevqo6htbiuv8e0fw9llqr84krdju15u9xd8sy6rch3qtcvqxvdk2vtjmfi29b9noyux8jpxn3d9772al9h29dzmr00rkf9z7gn9ivv4jzc9',
                remotePort: 1272912030,
                directory: 'fogn3i4gabgnbk3cxatvop0hk945r5ofu2q9ba0l33wzo9udpw0e8cijtpgsrvv8xza88f36298nr5dp2sm8rnd42j7lyi0za7o6k7l3ooxmjzmw8289nb5v5g4aslfd9159ua496mvvabj9pq9splm09patsnev1a0e8gjom3jgxwrpnxlm1mvt3hqkccr0lg9vu34izvo8lo1o7ntgpuibdpuo5qzuzv2sndcmx8wqy4kv7yce86z4beho85va0aue5bbmlxcsr48avrffc7fuuevdqw94ywi52q8h369bt8552bylgss2jw8rxveiq6k0gwqg50nhg26y221myktazh1j62qo117pqog0yycow9b1nm4t4gk9vaqmh3y048zhwuf40hqmf2d5fbe5lwabgkunnw7md53st15f1fyh0f6ylqzaws4mg8smkab75bd4xorfhn22lymnbuws949xvy5j0x2bsc57otvmvu29yuk8ezzlz53hp947g05rs7500q27cyz1ajfd4gtsfz9bpjj6fstlxuw84ubl5fmmdanrrwx3vuz480y7ovveto9oa6baa5atkaih599cxp6q4pfs9kgh99mulpf5zanzkmkganqc9ym0nnwomhhgc6gcrz725cuebbvny783rqpsn4r2i9ak9shexoop3v7t71hsi57ckg2tld9zzrlnvi81fq0wy04kbd8ea1jtete7gohnvjuuvh5hw89fbw9ijt65noebvgprgk3hrhrcyznbjbl7r2jmt47694gf2ay1ha5wkb6i25txzp14wlpu06fjh46yi4wkuwo4x8ng6f1ztma4bvwzfx9xwfc2qtsqwl9b05x8hx91o3dn9wruhgkvxjwwzdxa6o615ce0glx018whn8j7y9tnjcejoiw4zf1lm9kr1hh18msopo0u65ekh9inrxiqrr7p7idcnpxq89nlx8tknszh66rnx6jtk2qwwj19fk3os6g2n7tjmnu4xxntbwa1thnyt4v0',
                fileSchema: 'a8vzftajpwxbsxxu04gi1dh2m5fgqkj6lcqncvzptsqabrrsf5vzk5yqki37as69h1ba5p3sdo4b3q68aouv1bod7lu8yqa11jj6j77vo41fy34vysfn98b1iv9mtj4cdz8bbsfjh60l3n3j4g4wqik9jc8to1zm92269vhyv0fe0w8ot3k1hkowosqws3wcxlmf5cxn2g62lk2kr2nj5it5nbttk1rpqxpb6qfanehse51h6xb6cka7798x3efxtx0born8451oscnygltsbqcdybgf3etv1aturq8e7vedb5k4wioemyg695k2322hwt3sj87rfr9y33kklgo8sfrae3i83fray1g3i6ejbcwavkb81h4hjc0q988jxqftsjph19eag81xzdrt0okhejd9efqcbuph4jfjsbcbgbr1qitjwyjqr58blwjjv9svq2fc5cfqgeys9hlqufpta6uitowzi09byhbnoq1yb0l5y23t4q55l5frchjsldpxj41wqhb9q3dar6tpn66qi5fu184o2urumlskykb66ujnjjl4a0lt41ewsrqqhn042y6etsf205obvjhninx3a3tizarwcguc8tp6uydo24u9krj8x0twsjwz1s8faiyhi2cna29p7pnmeq7oydp712bo2vzkhyjmxk2mbgh1w2f59rmek6uumc49rafmkf7t8zo5cbkrhtutik0atrxgs8w59t12og89jrqrkhv3shjz9485j7w91elw80frzt1d542izww8i1jjwoiqipavstri4ima62nbq9h7s4u70m175c9rt53bgsobgyr3y6w0cx5tht47fnmat6y3epa2vkt3y6j78ta2icnoiz7trq6rcs4qezf4v27zavs368xkcy1kep51ykstx09amcr7oiqb3bg4y469w2tfa9rc44lqyv1sj5fzi6exqyda5jxowdi2px7f7ji0iuns5guxx7sdbafmnzlxeym2k768t77trxz6jflnjottzbk6xlc2',
                proxyHost: 'yyuv7xkc38rx4smwwq88nh4u9cy65rumbkpmqtyag5x61f9lr8bvx6rlf9u6',
                proxyPort: 9318962269,
                destination: 'n7m7bycm0vlzn7dpileqva6tt7rjg4o5byv78aswjryeuqk5m4jsur3x7n0g7kruy6zn9idj5i0it6056t3a75aul059ij91f2dkuxeoz6snhdsvbcs0oqg47bbv1fnen1tw0dn806u1im0517sivs8ypqocyt4a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'l33lsfcxpnjhrda00h9nqbdubyhudwecxh0staqioiztoylnrrirf4vrx3p08nktwzj0ye73rertf44twkceqhis6f3wdfrvtml506gn4xq240zlwa2tg867k68nx90r2q2k7z01tgktlqvgtxhdya2q2qlo7rtn',
                responsibleUserAccountName: 'dsn5nbljaq5y2fli9dpp',
                lastChangeUserAccount: 'a0vaowrwwhiuj3i4jfxr',
                lastChangedAt: '2020-07-28 22:54:00',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'lhhdpm65chll1t4linpaucyowi2qafc6xq0r8ghj',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'do5cwnyu1i5r0vafdsx7z9gf8y9y9hax1btns78ah8n1uahwsj',
                systemId: 'z5dqfeiharn1x5j0c1cuilz7ss7vooak9j9m1',
                systemName: '7s4e832zfk5lc4donmsx',
                party: '4683a5fgyn7gc7rfv72imn3ycfkwmclhd8dudqq9n9ulb60wol878lfl7qqdzhh50fi8qtbb28jcjz9t30ivdod07qkdcaqg50alw71h3a9jpc8wn3nb3b7rxto0fh6r1y47exasaude2m6zwavdcdnlu8sh1gwj',
                component: 'cweprqdhrrt2otc689itffdn3e55wku14o89lzbjvq047nudnkfm6pvhbeg2yxpsjs6dbs7z2kehe635zrh08pcmnzjvempx4ns0oinvktnr0yv5fy3quhm9i6z0cm6lwigqsx2toanznd93vs6632et18a416iz',
                name: 'fi1zp2te365tnqabgmnsiww7e5pzmus0hvj4yx25g7137mx32bnt41iiq007bnaara9gv61970j3pktlcsjqahx4wwys38snphzcb33hm20i9bnpa9xn3ohjoxl4o7qrzk0ezlznsalansbe6gxas4ss33yjzo8b',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'wewojtdktw2p0szcnl5xck3vtwtv6hmmgqu3etq5uuhwtwmx811a7ifwg3g4rdtgl5eccqdvm06hde3b0uw5mvliyjqwomg564kklla68la557xc9vjhqtmt3eb2ub2yjkeswv9d02724uozbkivkpc82mnwg0qa',
                flowComponent: 'vkbodd7joybcpsyyple526e2r68bf7fkmu3c2qnu2l0mr0gdepgn1msum803b76irojvadg1ivv51yw2sp40oi3s8f1ha3dh9eq251ek9mb6p7tziqfwixbjo2lfigpaiku7yx8xg1tnqgm00x0q6ecfoarah6hl',
                flowInterfaceName: 'gtvq994nm3qittzhqp82arlfpu8o231t5x5o1o9nawvf3kc71xgr76dz7d3sd89u4d9k1cvexffwai03iiyha3akyudj2msv3oft8od1u5vk8yzl5m1l6jc14t8uho0yugm9umk327okf2foll79doa7mdqsr8hr',
                flowInterfaceNamespace: '03vjsxib61731mp0y1061f12f553utg9pd9wgnkniugdo52zn5ih5ygphzi9uym4lmgkulf2pwv13xwxyl2haw4tyntyvxays61ykmlxbvvx6gn68xw86we3dh2fwvhr4vkirirwxcz42fh50tmbzc967y7f82ah',
                version: 'hrg9gdjaeircqwuxo68m',
                adapterType: 'l2tobp03wv6xq1nedlm9jwl51yxlqtk0djrmw85n08uzgkfe7u7vkzkzybcm',
                direction: 'RECEIVER',
                transportProtocol: 's2ix74959ul5rmuuq0uvtoqomy8srzzqxa2cgi5p8x8srakswkq1w7t11u3u',
                messageProtocol: 'd1a167nlkw5gp29hmevaoyj24vemkcjkm17m00m1egxrywnfilgzaixvrk1i',
                adapterEngineName: '7te4jmrmw6sc163pi3chyiiu63vqjgrqhzox1ntnew08cqqdgjopzw1zpjd73nq4ebjg4re2e3soql7447phldt0cqony5wmfbq4izzpt493j3xf2qg71ifp23nkf7lnyyjkw2pu5ky7rjqjrol20uez9bumv4nx',
                url: 'us5ph3v9medr11t2ec3vtbbwi3bfzskj3nvlvx2l56j6b3ntkqwqw3203z948j1hxqaeyqi92c7msn0mf6fj8j220qtnd8fkuo6vsn6o7svz691za8ab12wu3xzkgab7dlej4kmjfhok991308n1di0wg7d5yfwubakh2htf8i6zsuflql0nrm702qvhtlahi3tdf8hx7u0phcqkwqh06drgpd2ju5eigwg61vdz12rvdgl7xwmu3xsctcvojgjwznt5r8guv3bb3nkz8j6531dq5x74u82qqumnpjs9wchs6xbjwxbvljarabiv0zag',
                username: 'm6c4jwd6qupzfrzqmnoq9lbwdl4hhb2ldseyiweuphllwu80b76epfesd0wl',
                remoteHost: '0esr0ajiz13b5ta32t3c4tzf8anohrtl47t3lxd3a48ou4pxclar42bcs1pwbmadegwr9nxl77b7a1bksjoh4k945l9zcmcd9sf4ca8hdtb8wbn78hxogv5bn30gnv2o2227y86jqsc1zkji9l5tdoqjy5zwyid4',
                remotePort: 3790032831,
                directory: '1j8eyvxztbjwzwvejenx9awhre1l63n8cy9j06vcpbsvhqrvwt4ta24663y20pohzdx6x4kpq3ze933e6wfepimrpazp9u6cawyui2difedn7ro59i3trns3impr2makcas3iiojztls3jsi04an9nu3xymo9yclhac3myq2t9bta6du95jsmox5iv9d3risodupqdhuaqewu9747j56xytpm9prbczx6v0q8xb0d0dyxt7sfl5wo9y3k1mvaatz8tfuqjmgk9fslbvljl6cwcaz5gm6l78li0osqc2izo2dpq1826ia0ui5nykrr3ucixee3zkcyguecmgmki7ah12ty6vo683mss7bupj6306g47mg27eyefibk9ygppyt5xhsudr3p6muou1ry81o9g1zy73z6p31xx0m9ig2xc8jq200sm8be4drfdbnv8uj07wycxaks5fk44tr9ku4h78bh86ddysng9453vfjiv00095qb5h89bry4jpi6hbx6nowwvdsxbsp3zs2vtq946rdyxgugjy9hq5ohbvgd9so96hf0kbxq0ywh8u32xwfvmkm2lmw6hb8s3d14sfdkqqp01jg0w2dhkinj1ib4uelv623ctccfdyos40xvtixiyyh49v8jtn3jvidha5ajbfzyuxmz4vfya6z3sn2qimit22efbctz6v8ub6tc893a3pknpb3o1wwsy4fu324m7spntxit20w2c5d38ofdv974yihrv2ujmtoxlyzu6k6nd9u9b597441xikhifdmoxn6z1q4uxa1g927cdli2sftciehlrvf2wxhux7krheawr2llde1t0lis2zl0i0mtnd6eu33ev9rsn8j092hb3r3t6dtqs5g0t5l2qhm55r96jf5zo252fklx6a36h87yqzuv6x3cfh2612l9ohx6g269xsz6pywgybpc9i65nafiv28h8oh0qjhtb0yp5nrx9q2q2gkgxl46a1150c0qamfgcrvhbokm2dbzr9t4xiy',
                fileSchema: 'k1bkggbkmv8qm4cbd51qwsw3m2jzap41y5i7nwhvuzoqe5zolkoptsqdpx4w2igtlispbzxoxm23x8qebqphw8at0zbey9irqr9n9ket3s0wgz4nba2z4kh42xh0as7vpdlti70fjtn550hxl1nyk365rjbebzbuy1sr6kal5ff9xtcf77dwyggyul5vrmozp9qtlmh5vnu5ih0hil3hdkbebpapq7e6c7z8f1oqr8rrv4a21hg2ck3fd4jp3h227yw7e47orb8nbhyo1ug35y23cu4fkvqumyhdn31gopvlwmaqguxktsubhxd976phoh8twggu9u9idis3qicznl8gfpvtzdgfc0nerejzslu0q1psw8ekp9z5czxxdbmkts26de4k27cvjalsytv96wzacpsejmyt21wpi9jbtuwm8oeh81znsd1oncojz97kzl9zkc38mvjfqonqhxwh6u2x16kkboncy18wou36cn31fh617y9e7fehcc6enm7nq9j8nvk34c575eoe69ltlgtepu3voumljij3p4lh1aeo0cw5hgzik3nxcu9t95d4d4f18hyqfxheqvn2qdgw864pei4nkdnaj6iw5l1f46oqej2ij3t7qwjti26p4pjz8kk0ldinac38vdc9hcydoql6b5sr8holgya43zfcsavuxwox4ermazlax2w7fnt81g07d949hj5rdbjj921kctx7dmgtj1gtqks4zobjmtss09l4u1iwrt331ind1pur5j6h5p23ipdxi1nuijwb2r1brbxs36kp4hjz0i94mdrndr7szawm2oa3xb8qpj7cuk0wr73lcetmnc8ln6d1bssn22wetw8f4sxpirdds588n2kjjs27nse9o4s3hzkhbh03sbcf7fpd6ore98yp34vrvc0cpwg15iiwy70hj0upli69l83sr7o634hk3m5pyhiryxx58y7nkzjk6gxrt23a0bthol6k8fp9dhop2hg83j0dwkm199iqxegtekgs',
                proxyHost: 'gc8cflwa1p6bigebcst5drtqp70v5tgefkmymieuuxh0eto7fsmkj7zfp3wb',
                proxyPort: 7812042161,
                destination: 'ek9gty48c9tvsezulx2zeqwmvlce1v2dn80vpv7mydf8nfsd4wowmpruq0val1hgr0camltfgh61zn27yz30foe4fbo2it48w7uxxhm7be58z1dzp5qlfh9vn52awa8vilvt2tef0nart8eq3ljzhssvmxzor3l5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c35tthg5va9cnt7nbymo0izb2qfe67gtkzfb00jxhd6at33mu8sif5qcugbt86egb6pj142lqpmbanrxf02h016g3zotqeilrf5vqlch9blltmulambqs2iq049ene02sn31qmjvt4ozvdu2nxldie9z5igbfn2j',
                responsibleUserAccountName: 'juy2cle91jjviiqq8yc9',
                lastChangeUserAccount: 'xr9kz0pdgpoelai6xg76',
                lastChangedAt: '2020-07-29 10:52:32',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'm240g5o3x619ajqsbg0wsxl7zw3nqg40mx68fe1l',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'azketkisn4sflky7nh3e8v9bjr67ic17wwm35s5mknuvy8m0l2',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'lpz29jtpen1jhoml3ssi',
                party: 'iedilw2rxr85i306je5ryvr61girpbuixqluq21q4o05rm9mn1pcwfaaj5j3db9dwcbifeemaawcxrlli9s22zfor0qci6agnuhyjoo6z4k41ietchxoqeorkmj5bocrgwt5fubtzdijlqzgrzemkyokxzpcja6z',
                component: 'l5wh9csf9pvz0j7fj7fj3pucw0i3qx2l7v25wjm4h6byahkrgj57dzmps7g97fdg8dgjbncbd6gd1tz48y5x8h9yyik5cjqrgg0ulo81wx5te9as7d5c68eiqmirp8uf1201gdpetueu5x3uog2qakqehl8dnr2r',
                name: '4dbxxtdx0vo2l1254dlmtlm0slwld8l22w0uu7b47ohzwm1zrt7dsyin7fjvod223cp8dyk97cwoa5fi9wbz3s4pwmsolcz56y9i0v0f7gq7vv7d2pnfb7e1lgb9s2ilpjs8yhuttdqgk6go90z8tfwcnw2wpnyk',
                flowId: '2yx922g2qzo5kwpcmmrndq8fjlj5j63qvqbms',
                flowParty: 'd2r6v5qf7rajcpggf4vsx7uttqkwoh81uoqpuuwazwoyvqt4j13yqndg6szosh4srvc8set9ungrr6r1my4vw2dbbayn1u2z2mnxasqd69dz35zmyu3u9vts670qxktr8o7hxo5a27nc5y3nmmz61v02gbcyeni2',
                flowComponent: 'bz0k0cpuh53s9zo5ufyppkrz7423cic72vcq7nwgyxu5wff1z6gjang1zl37xs6h6xvyk002f9kcq0j1ti4uqe964k0dcidoqncludnfkkiftnvzwtnzfeuqb45bhtqdgsycrbzaxzw2fb8pqagweltuov2i41jr',
                flowInterfaceName: 'asyla0hbbg132q9jd21dbabqjtfu0ucx5cdi7h5b0j7gkzxzwvpyollhbp5mt7lhrb5lzaz3s3uw9iutv5dmjugqbvd4moxqkrakvdh43h0h5jmhzyhq597g5pe3bkffi48sn5brvh8brbbre8byneat7nvm3nom',
                flowInterfaceNamespace: 'nwpy8a9o23hc7wmxrhk08vgcrbbofzfonmwwtkms2nm1m3s1nm9irq754cdcjk15ai3n9z92blgkpr5mgj19mt6odk32ftozto3mgau35cnzuktl18uo3ifxpte3txf2n977xas28l3brd4riw21rbkdbmfe1uyh',
                version: 'rlxy5aiyr7p874e3tmq7',
                adapterType: 'euuwyva77ga9j53hleecfbxanc161daivsmq7i48qv158zystfclqyx4u652',
                direction: 'SENDER',
                transportProtocol: 'efwzuuzvl5j1cyzveatmdt8y9vw854f306l4hyikok0m8ghwaee05653ucsw',
                messageProtocol: 'fu9c789dsw2fucudlo28ns8nqzpex9ye9dqjlowmyx39qm6zwqgmwdieju1r',
                adapterEngineName: 's0d4tprhig7uih3pjzl0w3rox7z90w27izsyq3y1midf7xjs2kq1sq6h6lskcr0bpdu6qfl6n4mo1xhliowzci4aqng91hwhws1274e3ne5qlen8yppntrbq93ozdau1tqae0g8c8x4w2t3kar61wta3re63ceei',
                url: 'zij3y7dtgwg6jqvc2gnvvzl47b9jlt1qr2jd2o94lk5z6a2lkysn4hf8xldlz8czvjfryt608pymnuwypt1oz0jzmer810p9wj9mcwnc8a90kwkh1caz96cf3s9trq25nfmdkvtyvfuje8l5pu6oxaruul0amvp4q4274vlydi7003mga447radkm2gnf9fg1uey470k7axwerlejpiyw1qg2tvol2757lsgdog2ayk8nufljkoph4ymnoxmt13anfvy2em5fsvdf5me9o8xld271ggkfsycuzy2o69fo4b2bg93j1ea55ns5zp89xmi',
                username: 'ucov3i6x526ph6mpd43j536fxodohxe14olivx8dz4tg0yva67vccmvicm8b',
                remoteHost: '28rtm2pvpws1qirzpelyug5g1xpau7ahpqt2xnz8ngl80sl019vdrgie6ycnfdwezholkp8ke9mibmjd813gf4kawga9dj555ue46duia7dnhq5kggraoxbzayzbkheygf9jp3gam8sziaofmol1h9oioanu1f2a',
                remotePort: 2579919879,
                directory: 'rk17ovpmbx21qsamrmjh9hxewwmfs70qwimuwq5umpf9stia1bf4t5kg6uvfrngrytvpq0wwzvl77b5bhnzilnhb1owajdkia3qu78ansyi10fvsioxn8m3lj4e9vkt628uaqjgdgx7fzv3ezu3nmlszdbfq3ihhalfw26i36qwv6jq6tostcnvqju4cvqan7mxmwq6mndowqx6c5x8dn2owz37df0col7pw1wdpjciit9cxhi6234wvbam3oqeing830ci0j664ybiascdbqqafqtifovwkj06bvagbbij4oiey6dsqec6fz09m2dsi9sls3r49hvv0hg5ycd2tccorl88aqsvh5zbar1rt1uo0eyq0iblb8ijwoegvlecdgww6kk8ohegtrgtnhse4nb1nkqg6uqau20y3nr9xm9vq3xzlh8hme4gd06jhd2u78ww0hdg94y6zj0i2us8g7r8rfovsm7zq7xjhptbuxl8cizidvbufa99e1jn40yo3emexto5rofj9d57uf0w4uecnl4ggyfistb34vk72kn7cjl7qzxca2r4v3otplh1u0ytzozb6pxsysojxc35r9vicqj0obetdijrtek6js4djyjgv28zlp8sseecvocowqpka1rc2fv38z3wlhc40m78x500wg93ufqovbcppptow3bv2oircri2ri4i96qagjgl7r7v9813vlku1h9po1lr5xre42r09bdmir0evmo9kffwjzkfdkcf02aofnj3emhtiko79tc6oegofgl7r9snwnybxgryk63skbce1c3vvvndqh873uu5u3yzedhfk8lwbw81gcdzn4r8a4190ncwz2nx98kwknj3smqfithq72qipqv6wu5ocvkiszkfszrsfi3j1bbz5872zznpq4j29nefi6bria02489ag14vrmw2xooe1cp58knf3avhmu758h0dijpq9g8744g9hb9knmo7vhch48ebpv9t2bssxerm7278r6f6lrhuyr4od',
                fileSchema: 'x45sn4i9wwbboefj0ql3qs40qcs23rwfb4lc7p6ae1yvwwmx74e5j8axssfg3gbbl7h5ua188yh7v53424yvjjrj81tidartx841ksd4ynp8v1lahjyoogruv0mqld70a2ivhgirhimrjp6p0tejm7f0b3esmtovekg1zolbns418cnjgrzidmbx2totvdwkoab35ucybrom019ul35dp48p7i3bna8ynvn3yuucwugczp8lrnqknrglg2scvfojf6ls1znqa1k1dhn9kyi6fcnmprb7u9e1ovoc227ftwmcbigri4psf005tf1x8x77hrzays6acf9sn11c8zlnt874xqa7bvci973n68zkjjaym3s01egn41xf30pf42y89i07e2rz07mvbs6sm3za504kelz04pgg3xa38bwb9txvnecj8e4gegxtq9699qry2le0bwvqrf4zev13ttzzgt6mgz35thvep15pswa9okf2bcu3xk3jvihd8a44lkx7ijzmk5zy6k9ec09ywi7024ctvruqyf5kogathqexlqzd26l7iki5jmz5u3383bnzulqw9xbyhtcgkiaz9rualhphlfg4y45rt898ucvegm3rosyl37howys7ukdssyfkdl5vjuxyrle0kvcdqmin3rdaqb185eknuhhtjpo707egjc0qzdy1xhavrso5kvqs802xjno89zn8z3ansp2fckwe0y9xdsywmmhrs699qfts92hz6eiike1ln4zaat20b80sbc4hyooah3qly3oagmztyfnoha7ext9lij2aoir9lk40qb6lnf3bc3kw4nnjq9m23fphjorwlr10kfmobzi6kdzohgm87qhj9h3gfnfyflfsznwu1s9y5a1zl1hj6d8memaf4ec3dyj735b717vdw3rkvf7ftv1udcbz315xt84vp06g0egrfeq0hc014ablmj3npv0izh20ooyxu6h97gc5smwr6e3lb0p1tejogkmd1pephns4uw0g0h27',
                proxyHost: 'zqb1qfdd20edkmu5l5uy9nysdwrg7y11lzex5njq8w33dau0pmlsjpmc379k',
                proxyPort: 4260714307,
                destination: 'uzko1ctyf1emb18hocbdpxdfg294w4e9i4a1bqd31bv7uboaaq8l15wkwc8qj1b66naq3pae043qirmw518yho0g5ikqxbn5g0nosj3x4knyeoc61ydi134q7cdvkmqvdlc8g4bc9xkm0f5g217n3n4p63zzxtl2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '19vq8y366irp50obxntvzqtwvul37c387f1jd2xxcuhonaq76ic9bc4b6emf5hk018gfhmqdy93sq9wuwg1700xzkbiuncdcmvoec8jk5dfuus07tfwsvkcxqnd1686189m39w9l84oedhdecczjq7j1bz2web5o',
                responsibleUserAccountName: 'fffxgmwqkmlxn3izcsv3',
                lastChangeUserAccount: 'tm1wttbwsrdhi3pvzzjz',
                lastChangedAt: '2020-07-29 10:38:55',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '9lt3m4c5vsbc72tdn40o2lrjetury4l7uwhs3bf2',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'lwjmh8ln3f1ich0f9658axw0bc7041vogncj2pxaq8de63dg7df',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'po201l90lvvmi7lzc3by',
                party: 'qjmtewktgi76lr3n7mk5fbfnqq38so9y0etiks54qhgiscvzfwn8vszd9jbxifiniqguwe1ums0cg3r6jfc01ncneirld9fyax5k7xzavqzme39iele6999u5t0pvojyz8psffu60u6l4434o7odyv6drhjlvne4',
                component: 'ldz75au3yshuvrkh9qvrz7xepk20x1fxdkupbk6rr2kj6gkqyaxt86d2ww6g03lmih6ga71k2myfhywyaha9d20k5jzxs423zjxemfr0wt2ryo2jz3kfzqjyd9mlus7vo6v6s44m7o2r5kbmhw0hhrbvm424uszr',
                name: 'xpeuwkabu2zgruxz2licrta794mxgpbnoz0ula2n0x63tc5v6n7gdo99i40ql1a46y840sz6i6drj8m8hlgy5akxtlk0l33t7l91enbyb2lplxv2m5bmzgd4y2nuoqpdrj3vzy7mxxegutcx8cdzo1nbl51825jl',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'dhm6heltf5302h9umpnxx803jhc175ab86u8u080vgzmf2xiesb9jbtfbqxp1v6bupupnehps7mzw37t81ey1wjtbqz0q3pbvqi3elg7xw2s91fyi0xl38r6v912mf58s11hh3w914p3k3w1c1o1weon3uko1mm1',
                flowComponent: '2p8cx6v3mkjx5c6ymi1izqmfnltl4wtyripkjf66zwlxih6dqnfcvhdpdbsswllyfxwlfr468e61pxjp3tnmy0uyvs0il170xr5wfx4wec3kjovmnl3dxw1cfnnzomgy4eq2wd2pe7ilplesr4qn8lqhovjfu5gh',
                flowInterfaceName: 'yebnu10eevf2xdj7g1xcfus5w1xozo1eeb6hjqq8b05iuqhs5kyw3xjg9tpx9rz5p9275svoj3pavg9ra5674yhsgsbm0pq4aa6xvyveag9sbgu58m6mawnqw85cygekbgg52jry5ttgoin4gh34jzkqpy6x0paw',
                flowInterfaceNamespace: 'zjvd7btnztfytyt3r1tl5nqg1ll3bjbxmmle0zg9aiow7bzheqapyx105jj3vh6hlc70b6b7lqt7w5gkktqok4ug3yua4xy3ltpdco8xzf4jk3gvm26w2sappnb6hnb1x3np9f3g95y7y1q4qpec76qxaw2egngm',
                version: 'd87iic4akkq0nkdqzwmy',
                adapterType: 'ujmes2dbl0rqyklnrofveysl0hrxyo0ebqs91p7v6d6jreh75jk1x4y3nbh7',
                direction: 'RECEIVER',
                transportProtocol: 'bnbs34d2ttpo72v5r8enuyxigtsn8xdb7vg5gleyab0qjl6p1rdz901clzqf',
                messageProtocol: 'xyh3bypns5isa9huxzprort6hg7eawqs85r5vk78o45bfdklom7swt89vf4u',
                adapterEngineName: '88u0qu9kmunbnxm18hdb3xffd7q6aiydstis6ussnw8k17w2nf20xlc0y53rb2vzyo6t7h1ko64nhcgn2kc8pjhwz1m9dhd53emj9rupk6u7ccs70p5kptrjpll5dro1rvnzbjmm9jfavxjirxwr75o95etadvma',
                url: '8t9711olyg5bhxommk0vyecykz2esff1ai2upp3gwnnqi6pfolrqlw0iakyza9su25pywfkirtwr0fbf13uap4jjkkudam1ondat5p8iz7ezafipds367z1ykayrv5lg53l6c5jam0h0hnvc1bb4x5y21847cwwzxv61b1t2k9twnfandaqad2b74k6v4dbswuvk43zw21cvnrsxbdin6306ooqjxrvno2u9c34c361xxkd1250or8qnxdqy22nhrji8elo56ykvfy6083dudvub9n6oeqcnmol3kuvzguyrzlmdj7vxvacxndl1tnlq',
                username: '2ohw9747v4yrdjuita34bwrwfialvgtzk89jpoccbi8j1qijumy65mfkstay',
                remoteHost: 'myxche6xgz72mqhj34qnio1irywvmm62f5iku9vo9d7y48kzjgvzcg0q1z7yue9b34of0m2bg4nf51bidzi6yhrv5xis2a7ybs6gftbp9h9w1oyz3kr9gynuhqgbtqceai4u5hf3qbasxgygo8q24izgfa4y6b9c',
                remotePort: 3964389463,
                directory: '3m8i6hu79j29hygzfyshd09nzz9gzwxxmopmgb518e1pc561pupglg0x8x9g443ctm8fn7czg490hmo4ycw2kobyhapm1agobcwe65ptl7k5ea6vs5bf9mw0etznrm80bjy722trk03v6kxg9ryoz068owxb8gloi5g76pl2gjp9ygia55jpie3w3neewqub2k5ir9xtdnv799gmvva33ncogfdw9iwzzoi0j6jtz504xeyy9hdtyrjxrgjbo3q8r6fw27ekbt9890zk77jh5k2qapt6snwgys61kb5t3su761qlc2d62nz8ixypzpgvcrr59xl39b6zh789fhyohlecv0ni628iastv9qhgqzi70wzd0mhzhp4rnis9cb0gqa1bzeyglj764l0ot3l6udstayp4akcvoldff8qdiq9mpw85jijn9d7yt34zp0awu7k689msom1rgsityi1n20vnniwqi0zojrlrb1uegwplnfsus0pat3g3ttlsn7j3ndha1quj5xmdopgeq4mcld2xe3qngn901450tp788s1nt9np7dqyfliiw18jvj6sfm6ddqwxjftx8bpvf3tviybvaygopv60e3bzk9u01056z9ylsidyj5xgfb5a57vt4pwd3a7r8dho91on9m5q6qv92t7yh85cgfoz4qx8q8ytaxv9j26je2e1pm9uczpvcs8l7hje6xooxlg1ggw2169b8af6ub9ziucpux9udhnz9x0d0ggjfvb63gepttici97yr7qiitswleu8jjpxo0oqw0sko0ma7j6z4yufx3n2u50jhk4hd1p2867qj11gg7qwvmqrervp1ryjkbeebs51fgxrx9s87p1swey78w1mbm15xbiw69oz7yph1p4bniwshdwnh0mizfrjsu83o57jbmv7pif6jfcfbxypi3q724zl80he6xus6ou0srwoywgs6znmgj0o50787ah59aa95dzbr5lx2vv7gvlou3o6wd8kdmze66cnpzd5ds4z',
                fileSchema: 'n7hvkikojm24yh192yeuhqlph6dnap5xqbtpadfc7mwsz70l8cud04rnjpphne9veho5ok8vyjkufbvga2db5jvvyrdbo3qd9b8uj4z9jeyycrycd2r00ijv2ieq4x6l8ziunmty60jyr938tl5pjuqalx0ffb7ua6vmlxg5sb903dtiosfhd6gyimmo54ebg8ox2bg1jbe9wyhfoazht7yrp7ddw836t8arppiqt2oyvkxgokhg7dkcueppdka467ao89pf6pvjaaqto5m0l4ozyeb3m83y7jbozy98y8r4g5w2ehp2ejv5gpyk0w93pwswgpm3rn7fudqhhjipsx8ycdhpir4lbn5icxnmkh5hejryo452gcdm54wirtzx53j2s5tk2y72yyq30wj4dnuprrx7bzmo7bwdvd5jadii28aasa2g6wt5cpq5pcp7j4qst6xntn2mdauzvjlmci9lgvj43i0vf712x63z8wtp5j2mpnaulqvqstluv5muy56u0hfkdkz71ynrztkcaeio9u18fu4wn9idkrjvrkfa24auicnf1mvspojiy9o14qn7extar28jm3cfmqcgx404cq70r3wd77vsd3q4ea5dy7wxx9lsixmj2vleo7963hgftrjjr4908sd1iviqooeb9el6eefxw56fw46lb2l163z9mdfbmok8gn66lcqq3djulk172s0z20vqw3pdsanydj3w7qn8cpd1e56wtn37oo0fa2lvzjp36lrgpxv84ko82iuf0f49qwi8ztu5zqubvro85a7krzq97oma3yzzfp4jyv0qe4a6al9eh0p9jxrzw7qv1zxidzygbbzueifvzlud1asz0ymvvs8am4h1bq2ez9uoxtunb1waexrmnoasp1eu8cbhh4ut7opfj0q9ht7r0r7am5es70w0vp0nkogv6iz39xsui92g2u4vwfaglovpod5uqtgvu2rh88rarxpmhxr314sfu9mr4qw8zm4u8y9awm3vzccdfg4e',
                proxyHost: 'avrpw1xhkmlgxliq6m59z7p87wj4beqbjq7bx7gna3tqwe6mit1hvkgy9gra',
                proxyPort: 1403319003,
                destination: 'bqrwxblfn3nsignbkty1wgd6cjk7fy228x1x6eu4u4zolmw4rs7z7huefj0l5kcd6tozlbmxuqciw98i98243j5sa4yqtuokia3yk7233eqafg53p8hkdfzstt52h1l8vjzdoh03af55n38ii7y007i268pbvmtz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'veusfp6renariwhnzamr660ish2iaotahvm19ix272bdea28b0b04s7xbfk28ccj47860n1ilto9oizpd3wtqgvm658oevvfi6v1l7eupio514hg2t38tga51qh081dfrnzp10chkijihhg860bs8tugp53aaru9',
                responsibleUserAccountName: 'lcht11lric81jdqcn1ky',
                lastChangeUserAccount: 'ypajs902md6d71qdj3e4',
                lastChangedAt: '2020-07-29 01:54:26',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'mrbl8i6yksayg666k6sj5rnd5tt4rzer08d4hkem',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'rxwkiwckk2a23yx6yzz5kzfwxj90h102rxzehjjm9zv1fv4yzv',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'm5dlisz0izc86iollhz3m',
                party: 'ayxmesv7wtgyrwkkatew9egud51v3rknz8zcp1q8n04qy9q6jms9tl4qqpylhfq4un02quwaictovf7n2svcl2une7j7v5ytvgwhiwjsibupi4r1mq9sdbpesk2e4vxxwhe0v3uzljt6cz5yd5ayi88ug6rdtoar',
                component: 's0jjm82d9gk2g1qby9ule4rdy9d99aip2jn0aqpgya2e5bz45ibwx2ex0pym7yi9n6i16rbo9fovyx2swwc66d9pnxhb4ndigu0e7xnzlj1h8292ktpllaespcwf01cjpdo7wbg2qbt4rurd601n09z6mb2aa23l',
                name: 'hbw319kvvj9kbqptvxt531jyywat1o28xzfhjfdxkl8b8960b0ywdhsfvioatlml0gg4ivvk9hr0bojy6mk6036moigxv9hj5zw1j8e3clmq9gxwjnj7gzwl5d3jezbls0eqzql8b357z69agmbqoi2z9xjpp373',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'bttxwy8fhu4dm9id18h5nxw5erxneihey9wca2f58whwbu7ny70ysadr9al9ln5o3stmt3ahcn4wrn8ochx4sq94917nzouvz39u03irps489xz0anfhzdgpmtssrtix06fm88mevtrfzp6g0x0x5jukoebztmze',
                flowComponent: 'n8w0g40lw5j17b0cj4wbpo0sqyegpdrosglvuecr7kf5fnathbr0rrsh6u0q8jrl8srxmgpx8n8hgrxh5mzl9d3t9rtqdfryqs94hk3a4u9hz1ynshwe6gr13a8t56qkt7ovatbqahs4fv03ja7let4a3uluclcm',
                flowInterfaceName: 'vvu0gft0d2019ijqxn28iar5h22ainjomryrrfm1xjh6pcrf04vj497zyyq8dtzj9e0bl2xcz1088akqj43bm22ia73qhjott53bzzxqf0ju2jyctihw51ey12tffb1ysd6tpvv3nill76vimzn6v61ew1g1dzuf',
                flowInterfaceNamespace: '026ul7xhkeehwcpgtsgxbhvad1iv8nrrybqb87xi9ijx9lk0zr76fljhg0e3lc3ggjigv4skwh4974sav7qo36foh6qhum5wxv5r1ltg8ee7o7mjkobgs2w3jscdx5umfla26odlxvopclmuoumalr5t0x7zz3xx',
                version: '8l5lt6ox1cgbwna7cyg6',
                adapterType: 'ml5ji53vf7cw8bn9amhgbtexdzmusuz9j7ekcgs88kjpk9uzgehs6906v8wm',
                direction: 'SENDER',
                transportProtocol: 'rs63k808rn8stwdf1jxv6wl8xy77ul51fqu4198pza8dw6yk81ayggh1198s',
                messageProtocol: 'vr3eg4nikbimqwryktnyaigjvvwmpubk02ybqf9gpmu8ya4qll3zmamw46x2',
                adapterEngineName: 'w1ia435tt6e9gnm0vjoxvq5ckv0g0b9iu7ivvu7a5ys4eyf57i42ozu0omiguy48g4zvcmmyvzz3838d08aeoxfbhlhg06jri7yswpzr4psfgkf5yk23clbc57auw3mmepxw4jbp3u7gck29qsofjgb1vz7h0if0',
                url: '6s1dlm3rfyrix9l1qqfuwab5fyb7tw4lezi1z40touoy3z25lqfrp8o5uyybhv512qfpiezmc2awplwa6rst4hmdnogeaaikbex8e6971oj63ym6nr7h33n6njebiwbi00mpcr5hd7tq084pfi4p8r6ealnt602499q8qtjyk77xf6xa7pr0yl5v9f0ez7quukz1yd50kwo2yw0hgh13435whefqr6g6jqvxtep4o9r68we5znrbysgw13f2iw1uqyoa5a4raacg4gcrtnh5ujaif6vikvaox1m9vdi4dkn3xw1afirybvvly1fcyzt7',
                username: 'ccvcny0g1ez0yyf5q3kxvbzv6dpg87a2wt7rtsy6yiakn7gkt1fdbefcx2c9',
                remoteHost: 'eku2o7bsoy1df8r6ipppamejp71zkg145gb842rk7n514wiiya2ht1xfjof0hzt3ott2291oz7tzuoxz1yo8hx7yjrdmc26678wwk66hjf26ckxxd2i5yhk8t4sdeueyicne5n9jbbojiw32rx385shqlla3v0vh',
                remotePort: 1781375799,
                directory: '9l5lboovlw94kolkn3vah4r2av6076qf21l7ancjn4vyprax9h6zwd0mctwiqxur197zjs89n98nca98vcxq9r9jrxpwkz6jckam5hxyoes0zcopyhhq40nhkzjcoyuwg4ohjxkkqy37udnqlgxvicqicl8oyrli8610dos6rmm2jhexw3kdyhegl8gpctctissg4btmn1at5fqtu8rhqekpriqpoqgal6acllk9028q1y7mxu2at8o6l5ecwdgin1dyq9klsusr8ld49oh93yfkrmt9el4bamr1nnsqtpz1ai75uxdmp37jxrz51m7y9avttl4hx1hsicij08harmqc9tsefxv0pu7n4cnx0eeaa3gd7ye2xz3nijjrduvz15gmjmu62wa1mdha1pt8kr9tulnic5yxkv7ra9jz6mcumfeatx3gilwt3jo2onhildc3bj4xv3kxosnwdrxfibujrgz8kpekneyp0onk39kqj95z913pqe1ojpu45vyboff2ipg1v5zmki4loaq2pp2kvlka0gry3m2rwqfdjvw0r0rrgo6mhwcus4szctb2kdmda3khcu8kz0f3yxkipfxd10k2zff4r0s876801w04evcp7xeptuxnxpv5nzpbtm3be4ooyinjyi0njfdvs56t65kbe3ijcp00s4vpzloixaapsjk5mr7yfqz86lc16xemxsqixmirqajdoa2lb8scrh4da757jcjbbs70842qtdhny86gvekvidhb0c9g7a1y60udqdder37h23qs1y0ht9e7zy6ebme3pwdc8b8rmyj11qrl70onurekddtw2epb7m8mxunhl7mvhwyeov9hrm1z1dlx7cstnfwh8gfgtsf1ges8m6fr6neuddrpb232xjnl7uons9pds7f1tj0kikn9p8mqdq56h4ch7p9jrzfim8zzl6tx9xasesn8r3ug3hlaxwgea9glm76g23gxpa9hlxqfgh8ni7dnehapwuwfpztorubn8ohzb2ip',
                fileSchema: '9g334b7jfgwjketfhddby7h2rqmz3jjs5qf3d130vdwesyr8hd4dig6vzgzblp5ya0ftuykja701julm3pv2190wqqsmvzo2in1l3uhoqn1nnfmmhkyyrppr2zrogn14jna310wyem07wwle48d7bow9osv5nz7s4rneb8m38c6eva1fgjzjdqg3q0kyzj3w2oupop3yh2p5pmq02kbxfablwexze54srgrsh42tqixbu4fol3xfon49fyxtvq71l6i6b31blruxzvyxnxh2lydjlxfmr87vb4ruhytyg2sf7j6wedows0f21idv20uzn5tjl0gd951evlyjn5591ij0ifryqtqtj2r4j8gb5830yuq9iko01wnwi6xkfsvyojkwbxkzh2ok15mk6svinzuchiwk2xlossu3uodwd374k7ekwkfx4u17o0cwd1llqooqlkmpoi7590lm0jpv6d2os9ng3k5okfj1r5tvearkddnwfpukh551kl7orsshmar2qfdk2sv54epgt01s2izbvqvh3qx09zn5ojbj5qrez898ku1jte9mcs1w8w767jpi228mtrh8letvupbpwmj4l79fdwusrpxb07zgh5clb7wj4a5bilum0a9jx9whcjrh468vcv0jvas8c20otm65g5x3a5bvpk8u414p1vdkvn642fa3930xhr1b4q9kw88k0qcawws0e9pychwau0zkvvexhsip4fn5pxb4ofka636oxswgc8iq05tyilqcjedg4go5qyznmxqwzjsa2du8vydjy8ogl1udnfk4ht0tz91kvr01zlxmg9kw48mupnvwl1em9ws1rrqfv7gktg7w2ijnu4fdhvvwn3680lfy3emaiw5gxz1m4v1ad4fbu0deg1aguvacl3x0is148o84sim7a4sc2xmyxvcycs3hd0eedto7tdpxe2djwxil6y5coavet47usyjckdcff4ohn998dlgp5ky5wav8vqzrvd6nrhud1ammsm89rzxw',
                proxyHost: '0na5h21ruwkzick1sq0bum9eah73ez9qhhb8kqztom890tjyxum49yqlqegl',
                proxyPort: 1797423099,
                destination: 'k88owq0zkzidcm3vk1d33js7yuphcsuqnlr2jhxwkliiqgdv5fzdzkr3ll5r94htizs67k5sqfgh5dl85wpneuhnmwwshmxcqp37ozmoqui9l2hqs0m5ic3ivp6e4jzn0o2vdlp83unvf56bt29ycz35u8hljugd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ho266m64aks600r1qudesa38qol02x5pb324ohqrrry8qxt7alp2de8olgxo1kbvfn74zp665gi7a9ux7ub94dvgh1d6hho4z2brrhhl3mre9605mpb0wovf1wca4tcmuotpfglymigr5gye7wvuct4cwn0iq9t8',
                responsibleUserAccountName: 'kiugggk2pilfvbzifred',
                lastChangeUserAccount: '8bmhrvgceijqn6afesb0',
                lastChangedAt: '2020-07-29 02:51:05',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 't2c4o9hr5nj770lhogfdbk2xof5ifvjfrgn4u07c',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'x6czn3zc7bl49tefgsybhz5x95i9ri0d60axbh1dniz31czvc8',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 's2pryq6b3lpzd4f7anef',
                party: 'snln67kvpqf4yzxgan6t6tf0wdx20bhnpst4zlz7qrlac4hu2fl870tjq76gb9faft5arzlka5sl40f850ceu2w2wlmrykj0eqlefsxs60pn2o0em8y7je4315o6qitd20lk0yg5w4iliy10rqgts6a6xihnvxqb1',
                component: '5c7mwxr2v1q89mbyvmqyparke0x1qdy20g5yu56951554o6ovu1yfwgzwjds8z0anvwsxa5edk07a8j0vzvxhzvhzszgryx12esh902wdo4u5ka3dycbb4c7yq1ldujti4iblj515pz23zhgkfguv4lgpz8c9yh4',
                name: 'p1ady37dhvld0vy56lyv4kv5rrmp1p2wc3spdm8r6uz1psem9yi3v7wfoouacsrbwm1ogfcuwgn9kampfug4dzpk4ljkp8d81sxkyv7miaus07e7rkcwzkl6wb71o9wxskz0lan9jghht7cv361nqx34bc3guy43',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'q7xcn2b7zy0wbhy01uygwychit7yx0mn3lg8ktzykughdglb6p004byxbhefkmry48b8evx9wqm8cu18ob7m2ubghjfp4w7d3mrzfeeqt34z116ybw235bi5gv2cxqt6f3u4673hoh67zpl8a93smpf4vsam8njv',
                flowComponent: '5ytvnmj0ub2cgrf5d0yoia77pnipk4q0j1put5i4mxqi6x6i4lp0f20ftzfz3aps21tvh63yl7nd6w9sovc2l0dtcog5mx311o6wz7pipota51md3drrfisbinl63sf3aiibb8aykd1013tklyalxcumsgr3bz8g',
                flowInterfaceName: '462a7ppqvqsekxgqcug2zsnchcqu2fcj3kmy56an2qj0ubxt2avhudmst4ew0nc2mswojkb9u7znmq2yqm420a6qg0bdxr455f22yvohl59hdr1natsgg1m7x01e4cc7gp3z1c6mr95q2jsrmreetiikrvgrpc6l',
                flowInterfaceNamespace: 'pvq08ompe9u0dm6nlcezyh7aeo8312khymm0w91pi8z3xmeciefvo07cifgf4332oo7lkn0hh0nc45k9iroc1j28utz502h1hx2u4twqmxnsuzjewbhlevcuvjsi716iyi3oaka9k0vbat9s7ipn9bkz26ljcykt',
                version: 'wbpv72ypg9epxfojgq5t',
                adapterType: 'sor3bem75liz8wbv46vy1x2b6h9zz7m0q4tlof3mzcpqeh9p2ivusypwd48x',
                direction: 'RECEIVER',
                transportProtocol: 'c1cte3o4wah17161582s0ai2axxk9ho2wsn2pr653nuuskyydfv6cxhxc166',
                messageProtocol: 'mxe9xk3uucjxujwxcahgv1tr4ke63s58z6urx5poeqparlews0oe8k6na2l1',
                adapterEngineName: 'pto5qhpfec4sbh9cnmro6ijorgd6rlcebhgdsgmx5u3ylvwqcc292ouwlxvrjgw4g5gpq5nwt98x1guwrc132t0u9u9qr1vvvs88uey09ynwx3omqumz7ii1z0dtlxbqrubnq9bah24qslps52rxccotj9j2xqw2',
                url: 'mmxs5joaakag80heiox2wz3trd3uk7s6amb1whdny5rkw3ftnwg4al6j9ie6xsafoti9ehgamh1gdmrosmlkscgjt7idl2bgnigyjz7htqixcbyz8ik2n8v9o2owmv307smrhdaqhmmh0x95dub8v1uw32l63vy0wpqsdpa9l9nsgdxlw5bo2rvtmb2nw5tatk3udpw86h054wt6fvqmfyryfq98pmein2y443zh6nwmipcv4y4lvesln8t3qd5emx8vx717boe8meixb7bqg86bza4pdddcs91s3pune95kfg0bajakjrh58ypq5a69',
                username: '08cw4yervtr9upxerq1154o4g77to5cllymhw2xcvklno5vn13mffco3we4l',
                remoteHost: 'noyrk2ni3rabijh6mqel7zffcc160upwbvj70upth2kwgflngbee62z72oughjv9kstlosqcqp3097g3mja719a7o2g6fre33mwenrpo42yyulxbadnwo7r6g4ac49jwwap18zau98c8zuh3jbl1dcvxhlesjwwo',
                remotePort: 1143968529,
                directory: 'b4fw0ipb2l9ivbl6oww5mqfdtmird1o2qdr4qrytbz294qi9692rtir563m69tyua0tmqh8hp0pfupskyj3ajecwrwzhl3ii57ecvvaqdk4whapg4q2e3lrhu8moeguqa7zobldipyieicaxkzfopr57hk9kf8wpoh21a1avkp2bn5dyfw0swd22evpu8qbi6y9r0ey5at0iqwcdt12xonqoo0cwlkrbvcijxasnvat0j9epjfuzh5jz5su7mec6hp73f638j13qa4by3llb0w9fwh5jgp1rovtjefka77ocezjtw6w4zk82adw596jdhtobwjzb67zb6mk6jz0x7he0jzwlhc3tpacxo73ddxwud57p2wp0f41ljjw8ew0qj0zsr2l0cp4irqj6qec9ln2y474rbp9k1x1arr9oeaopxah6h7p95auzxcg1b8yki5n5md5kwx500mtbdl52v23p04zi9ck0pjhl6lxjkluhh2uybdxhkkty46isuaelpti1g9lm01idons1150ev8x5rfwo6x0hw7hrlciul0038wiedvbdwpkjoao5qs7nyfwjoavhs02ezchfsp3m7sqhb42aii6z8wazua3rikhhnhugwspfmfcvffs6hp8goo9aernuv0y90qj4iv8bebbwhzafl1p9gukuslr5z5q4bq44pvccna9thdvsj1fs6l3xqcuf3bslfz7n2yky17ujqm8yrcp93r4j6ghxn57vayoo5fkaxih7xlj139880g43u5mnssda7vjorjzfzabrswx8jglu7iek6rr5qx8y1h24kakdnumyn9wd52l2mcmtfvsxwx3b75ptpmeoxotpvcs8g759fj0ig1ixpmt1t2n4c4zl07oq1qafhxph9kdq6zhtqprjv83xiqmls3yfzy5gxmb08s87asei6ysochpawduquw11ekgo9o65r4b9es5ggzx14zlyim24ctnshpl1eux6eups80nfg7xm8f0mr3thl47hmaud1ou2',
                fileSchema: 'z1901fohz618egza5vodrtvddtgv08q0hzlv92iw8siq275qf376l7bedae3c7wmlj7lfvpxvr9rih4b3lgkuq6qza2u941alophwihhdhykfo3c44z9pl6eua3yw66dk66c7wd3nxuqv4t6yaookeho410mmph6lzn4uwgdn1vayxk07e2g4o1p8q7n6ca95wwt4vk9augequcv736bcrimkavz35uh4etco4iri31neq86eggf1cbm7dmhkx2n5knbexdnbedb3ytxvzitk4mosrxyr9dzqywz73iy5livq57brjgq271dabjx5r6wsm1y49ldjts6069vo4gbybcwgbclb7rls7thv40qtpqnxml3aimpcbpuru6kd6eqdpmjspr3gpytwaq93289o61013b5ia9f4owk7nx7edm6s955d0lt5hdmxn9ejxl79c2jradmgrt45wrupta2xfcc3dcc61hxekf4zru12ijwyo1at55h2beonk0txknxzyv404do5b476rejqf413wf8ja1artnn4ou0r13meiys7ed4k7t0f1dqwqoqi3wajh9k39x3d0wpwe3nu7t06b6lncjr7lat5thfg9a127gutzmxms7btzjsjds07ejqe46wyqfnaatfqwscas5b8p6fg5d31jdixkrbffc70q39o1gfq89t98uheqb86vu5hpo5kqkvv9oeb9nwajto9eulybb92kunpbadhypxyxpzk1fpebjds95fpnicu97f9yd3hciuj6l174xl39l8jbug6pzngycf7ywmetjgiehrq88iex01x9tj4a7hn7ocuiav2shqbvvzv6uc7qc2ounay65chw1v2tmzbr8oagolcp94324zkehotf8msqp29f7cagujq29kre8ej6i3ix7xb6br582tl5ny120iesf35shtro2afjjbbsz6v6f33360sszxwyjmrv53hdekzuik3yggafa61riim17meq0iuvwfw8antm6ejtmwf463',
                proxyHost: 'jqgir7m9bi7t1du8dzuxvhacrbuunx0acvslacy2yfq0cd9rxwj61uc8p13h',
                proxyPort: 9551952492,
                destination: '829hko4ming5fs5zncy49xg42dfrio5ukjb860fwjwocn7e93nkwnhsxhu1mymkr5j4v6qplp7fmpze6zse5pka7mng09nofefuokkoauixexg25iz670hnn1kpb2kx6tnggjr76wmwhbeks0uetlqq8o3y5jwuu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'eh3478v4yh9o9j347jayh2b0j243s3a8vvp5oj9545iirfzeqmt6iif3vj5b0kguljmoskh690gakxqzhr8edfl2o1ejmk5codib86avpxcazzdj6ivw0b5stwqrlfh5miyt5p8fhkz6s246xkgn2t7ef0dnzvzy',
                responsibleUserAccountName: '6edtu0xqaw9oes6awdkg',
                lastChangeUserAccount: 'ju1sbaml0s7pwr7rk57a',
                lastChangedAt: '2020-07-29 00:16:03',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'o7jpnym071j9j08aahis9guui46lk8kdz3zoeh43',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '7c1wl3rjqoacs7rva4gwxw70uhdc4suf0mw7m8n1leppmjluas',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '08z7fe1rjdjzmxy7x7gl',
                party: '629gb94mpprtl3ry4nrgn22f9pt0mnti1zkji6dcslgymzjmbqzo3pxuzfqsee5t5uinzo6qnzmno0z7xyec76a5obepja8bjkeqcb9lgosttf9qbsudw0mob2rj2rx16lh5idg181rplgez5q0dehidx2znset3',
                component: 'wzuvbnf6ieyoyeuokrwo6187impqdrc2q89asru8x7bcmpv15mu7xl7bla5i885ryf6uklb3ket9b7hzux41obq0b17m4wkqbnz09umhvg0hxaox9kowx1ejgn93zn1zg6l3r5yw4mlgxgrij88pfu9j2kq4wfwcf',
                name: 'sifpor5lmn69ry9j1z5vlf77v7z3dqvwiqzej65iwsvhl9bebehlc4rkv7d3f8w7zjy3uxo30u3e8wzc1edcclzr1m2k2dsqgxrwbny6iq6skr4bz0zpdj75su6xyxzs2c7cdr71o4zwc2komt7620a9arz2fvzy',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'rww4x1kxoptezzpgbw147v72k66hmo5q1tfwhs382c4ns1xbpms9bsbzv2skewof9fa33ojd7ccmlmvzmgzj3qc6zm2bs76dif0dmke0z1efgh1njrxvkxwb8vjbi6i11bluxz0gb82mdrmm2raf8yjnml0prfh7',
                flowComponent: '593zj1pqieu8fz5h93nmacxng624fyqc6z1z18k14rr92w1a0dv6dqrkm1xovumooh8zyvlvxjr7ipbejp0pz1x8clek4etykf4ossf576qwqpimxx3yjnt6zlv1dpwcr11snmm1w585hcjw8ko79x3f213w3acu',
                flowInterfaceName: 'rqcqjqxek7zohli2i1ebk0z28ctxahcmzqw0r8a9wsiadh5nqfcpmjuqw4lps0xc7zugxdk5cfy1uuccp6t93xwe1i315ectb60ylpjwgf3e0hygn4rtpd0l8xu5f5uqa0a63lee4n9i8ag3oscy1mbuao67oe8o',
                flowInterfaceNamespace: '28w0f56we9ps3xql75dp4kppdxol33pjho7k090ekob2bjfu02jmohar1v72tzq2k2740glrtkeqhicoxhaoyyefnv5e1ye63lild3rawji053mt47y9g5ublslpxcqh036bfv34l792l1aq63qawzbk899xefih',
                version: '656kigoz4tbag5vcmvdt',
                adapterType: 'v74cmtrmt906buanbj6y6fd443rxqevy6xex8fo8jqy7j08yb7978dazlab3',
                direction: 'RECEIVER',
                transportProtocol: 'to27y51d2egzeo4ms1tral5xe9f9ezumn78eq9jgk6g4kni98c0bl6zo4vkg',
                messageProtocol: '21ywpd7npa4ccz40bku9cc5989trpckfnlabo4ih3m8jf85ixjtqxfwdq4rc',
                adapterEngineName: 'x3jnod9m6fjq9xh39v417ahcanfh1zl05d23ft7ufk2j6lcg8yq4wxbi4vli5oa0x7dux2sllzhjuwydqc0dzhj0lfqlo2lyn1dqbt04138p2oqmxqclenzb3zx20ffwkw1f8182cg524m5tplgqbh72qbedcm19',
                url: 'mtyrhmqguuqvf0r0tiswk014q0e8cunbj72c57y2iba2iw81eh48d2tf5hxkb7t4li99pz4l8mvcz9mk7l20yevp4lvww4b85473tw7geio5ajc9nao9ovachek74axfvqe1prtlefo3p22pcgynk67w4x5vm80gj9wuttkzfkr860z18k0leg5m3x37jmm6rtxv1vaj1u09vwibz8u8eug9bd49x76hnu77gn4ick81ifuujlk91p0n6cyhscr76r90is93zehiqmmyvcn37iyvoorouwzp0h1uaxx9gdmq6hdi1jyyiy4ey4tw5f1n',
                username: 'u9gxs9pu1y5rrvm3le4185eyvo0rofxaphjwvujdw5os5huofzqdiedj7zdi',
                remoteHost: 'da7ytnsu7pq5c4w8v1jzv210xtgpiqphmc48gja5zukru515s2i7bjtz3g82p28j0nu7sx7gmn6lqq4gwzmgs7fpz02xr6sw2vj1rvbmwaosc1v745nwbw6zab3k509u8y68tfaeknppv8nglvjberyi7wa4stxr',
                remotePort: 8792946962,
                directory: 'mvxxnbdb69x7xatwzii65pf5mpvmgdrkxzd8bj618or36qg4mw4u3rwyl1u56e4ipn7wrhtq4i3ft4tqoirectifjzqzisc72c6qwqxg5qzsf6x178gvgqr010ehfj7pqsrn56ft8fm7mninwndt8hz3l66gu7ioa5n2rugz9lky336lvy6hwrmiidas67b30upsnj220v07tnksm25j7fy78kyk0tl2n7354bnoqito9odfpkk0ygvhy8yh6s57mjh5ystcyqrdciwcd7lombauibqnxgfkklk6g6m3htltlxxjf8n6bsd5mwk7nm20hlbp2hl1zgy649kltqlyb3zt1rs20xve7zkeeu4iizfs7x10xqcglxi5sasqfl3u4mfhrp95meglbphf6v86sfzuwkuijlxy6uuyp198pl8gqr8b3lusnr7lmkje4ki936vmriapxq0kockyaw5wk06pzrci30fvgxulypxssygcprsbenwusnb8d8yv0ak3s75uuymf0yjfjx8hb7kk69jl4knvybynn74jlg617ag0m9prxkd2mqfmt8kd6562xeqaonegpq588e80mzdif3wljv0362tmuwaric13cq17taeft3uc8w4j786rxpdm8zz8qyjoegi0l5f4n9w7liesalmynpagkwg1sqh6qx8g8ir1191194qww3ow520yu33pkzos7f5ng8qoyh5mxmg8648z7uibuj0rb90wg1kizdvecpmrq2mrraifsdjiob4l8ulgawmxv8smrkzt3bvdn3qntw7t0tqopk1t6xxcprtww96o8rz2cs2akrm0tjbg05sn6kvc4z2zz375bp6x86erlydnpj49ulcg2wvjmq26zo4m6tgi4t39xldss908ulbl0lzbyi1v677i217slm2bvx6b859b2embm8zj6ex80g17m7btmgh648hz105lsa67xuf4alg114an80s43p81ql1g6fzcypvb3c994sh1fxcy032rl2x2vt8i',
                fileSchema: 'toe9g755249kn1o3vudu9dvhtp5nb8y84shrzrupkahg7iuxyu831khqcct7ddsmpql1hwx3vidzl4chpet3hq9emrvlgm5g9c3jp9ezc0y00bxa84rkbau8xym4faqxtm7ls772ioc5zxw499b4119kjm8xlipwjqynpov9eiymfhv4lftvnr5baggvnw201inokhjmduuo5nl9n7pr4z6e5v6bllj7ma2svwfacvdwsqzc4qukgovmgkth4669voaeq9j0fwcxip2jkakswvcc8zu5t640f0m2kcy1ez6slniuzq0ge2guw6vfxszjsyhv0elyqjz5wdjyodmyqfodoo5d4msyaz4gzzy7j7zmxxjqwigt6qg0ngcx2gsivngf36at9hmse2rjm5125nwhodnfm68rri9vufqycwrbxyj84pupoujy9gcop871a66q83gxy75cg27zodekn8w8jxy7p88n3l1x2hos5kob003h4ulaw7c7q87yi3v981xmctv7ypa3yv53k79mk6nmw5xe6rca6pa6i07r4iwr6l954ut27klkx5ihgcfwrv1uscj8cjvd9s7wfzzw5typjd72azvb3pz97wdskprazzz9oy0bm8ga41x94quhidl0ymgk63e64d6s33uji6rz7stm7d3a6kdj7s15q24x3ynknr498sz9ttp02uqt2xyyf5utalichnj42696xoixdmpeok20m27whtsk8iqj8jju32zds2mtfao6m18lx6xrw8fd0f150gt1svxcpquoybzfkx8ic8z5yps1zji4yr8l00wnrn9thcvccrkqe3cn9ryj71d8xle1nac2cie6v0lfjalkou5k79612wadmalv4hbnel8exmzsig7oz0y5yilfmaj1cgqtbb5wgqvln26zk9z05uf7hjpk295tuu8hcr4dja0195va11phgpvjxk36rqen9rju9rif2rcbtoqcxrzgxv0udxkm8o0wecyg75s22ffkkwmswt9x',
                proxyHost: 'iuawbmun6bg4q7qghpim2ej6ysur24d2kaf9nq0sr3v2nwyzd0nzkmvdysp3',
                proxyPort: 5456996597,
                destination: 'bgqnxzprtb2396vpgk6wxg7wu4aiwherawm7af57kqifkabehsm6unr3lvztyn0hl6ixtrjukvdrg5zhu82nor412zzayf1dvsdgp26oi51uw6q4ofqhozs22akyqur6zzj9hucw9psezs3z4k9xgm60zu5po6m5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2gvuvbbwhh537ki55wkex1h2k8tntjxid4zuy7dtdoyqmnuqnih9vfo234gw9b4rp4a8cyz75u5q9zs32jd7065x36w87auhrvr1erg3n7g0d1pyc189q1pqxi9wlyeztjub5j95cdv4sx8e5a1poj6s6sdafogb',
                responsibleUserAccountName: '0ssq9g7mx7nw5hi350rj',
                lastChangeUserAccount: 'e0jeefcoh5np8rj6mm5b',
                lastChangedAt: '2020-07-28 23:35:10',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '79kg7x0xtc734uw9rnklf22ipwzigwa7m69f8yks',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '78kmx2qpfgimscgkayguuy2nabd7g75rtdgtccyn9cw9wz7g0s',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'm18u0erymdsb65kwwa1h',
                party: 'klhglqvy284xkgx1cdfopkk4fxziuc63nbpcxi97ooa9xx1ks6dkdb88j4u8kv3876cl4ha0ajgfjonhr64gposzbpqggu561dv3eozojos1t0pkqcww0fxvk2h6txjqci9f6v9d44a81fr825ye6ojhi90f1zr3',
                component: 'imljv24wi137d9o74mfoo40xwsg6yu5cygrpdcn2fb31cyvsk2ckdge69nh6svdreorxnuzrya788rghw3ezqek3pw7iqjuwj6opnqx2hjtrhm38qn42s03jdoqb0u349qf9hbq56ko7j49ei7ucgqjv23qmyhyb',
                name: 'ulouuvfrtgw2e4lekhlswu8n2tbl69p4uo4adwhvbj64hlev3c1nphxlvaedle98rqmrh9u6tw84ti1gkaigtlngn6rs5tjfxcxhh8u5brgyc2jf1erhs8aqeetanpz94su8d6wzenu0vvq5h3lea0r7get4c5mph',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'gy949alf3i5b5h0xyy89jkx9qkel7ppa8jocxdkoiobadtwzdo82lw40r8ioxej8vs6ec5pjn9drvbonfitywswhmf5yerkh5ucqqkvrhrerirtqgzfiby9ie55b71le91jy1zld8396yv70swyx13ms8b4tl8k3',
                flowComponent: '26xzuajr52z24lja318rck0knoikmnpu7alrk2t29p781bh1czxirmaeghfwksp47h3lcy28z43i46jy80m3v7r4a9ydq4urxi7qyqqhkuimc11vrf2vt4pcsfexqd9r1ycnmc57c5mcy80g2sz40zmh7bcoordo',
                flowInterfaceName: 'mnggyag44grdan89aq4rruzr3jih1nfz2er5qo7xoc9vz7iz8joojr92vvfpq5bw4c6p84r7biagvcj0u210wrcqs1m5jw7k6hqj0ts27szl7f1mk133m4yy3q0i5dmd3rwec256abmqhus4nap4cvy02i1r7hml',
                flowInterfaceNamespace: 'ylusulzbvciz4cmce0gzme7lmk4siqr2ee84kbmg7thmhzxbfsun6o0wjlnonaay6jqnum7cfm5xiz5smfgfmdt8a1rkpaw3j4h9wuaseyw7uf2y93svtcrzwa2nshd0ogt1blinqhewbbjoy1fvwj75yp2ikei0',
                version: 'am4xodvzaglmql3i3ioj',
                adapterType: '6kt3spnk4v88hax5x36xowowip1illbeeanihbkzqjoqk3pj6hg6h8jtxmkt',
                direction: 'SENDER',
                transportProtocol: 'qgv845fksl0dyjv0ydhb8r3abpkeieurcdpnc2e0i9dtu0uvai5046ht4pwk',
                messageProtocol: '69y2mo8x60q7gg20lbkoxnufqf514zc3y3mmq2z5dlqmmm0m3735yegismqd',
                adapterEngineName: '4wzmeypif560oqiqn2lmbku7ov7trq53zsz88paus6mcmfyaz0vv0w66pnw4xdlafknn5er76xxd4kgike8cuq36i5g2t221m8917n7f1uv0k83tdgctq11nquxkygqbdstarrowtdhjin87hi19sy3g8778asyy',
                url: '2tg52hl0s5jdg586z4o81i8hyrx781jpan9ky100cd05zvksxvxmfgf6wvdh7c3jhfgjj008tvvxgr21oe9v50hhbvwcv6rh5498qx3lct735xsofl5091h08uqfcnwzm6zfrbm60awde8f3hcpb4hpv7o06k1sgpbe0ihj7ek9bpcuyomfw73y0rwhklhmp1348yf7qaoacxrdvl7dd0egqa6i1bitm1lgoikduxhqkktdu91smimt1sod7k4lme2rhu3m5bsbsdpjjy6yan16pqqkjnvvodk4q5jb6lhefxw1biho2pahl3ig8thst',
                username: 'fujxkk58pbbweh1t0fp3y2edgcdrnrj8bw9mpkccv2cb2mkbswvs0r3x37ab',
                remoteHost: 'bnf4qzrtgk9q0vxpl1uqujfaobmftuze3htkzuvz42a7thex3xsvhkgoiyaw107ghd8vizqsqfcfbtcxc6o3yh7mw0qhot7sshy72egztxe8e5w22518rvasb4ev0aakzj2wl34prfor5j13o6rkqk5qomx1h1zz',
                remotePort: 7566690633,
                directory: 'zwj658w4dawbjd741czjsy8uafcn60n4hr5wzedikyxh2kids7jxshuf6js2gwx1cgw8l6vetruskmg70vg3oodohwkwfqhpi9uq41c8397mbqprtalaovddyilthae38p5h3b6l8mng42lajpcf8i6akejrbsc905qwfvw5yn0tqa7uyntquljzqk3pu28spfpudu22mt9j83ltc9xtltol5aen33gp5g241ldtk1hvaxwxn48t8vpjfto5561znm3dig8svsmc5178s06v6psrzwlr5u2qkyheo7a71snm1yrfa7e1uqx5p1bvlpclx6eo3wgte22mvs5safjtkfyflaoi19xcthus5vltvt5iow790pok1k0wazf7bxj441nbk7zq4c5rldzqd868gxv9e1soh3a1uvrb0ice4h8w68ig3k2bpngarjb10smj6izwwwelqrjgjhaoub207rzuu5e7fm4bsl0bkr2wl46moaawkhnfbnn083ey2t16ciyt0j29thc2wp9kytbybnj4b8ssr6xkqh59vk6lcb8tb3bq6q51r7pxp9fdsc9ywdbdhr0yo2nqncevtfb2dwdt5svmzj2skz581y4bx750abufmxj5zoilowgbzhjl3u55aj09svintqkgt9pwmbijsf7xvhhjv9jacbwbrju5i1q7x99z1zwmq1se6mbgupgg1nrvewkriwneqhwh6bf0pl007wsut5g9hijm9fpuduonewf3rsisv73egzj6zi4o6a72lkxx959qopj575ecanvfwvgs6webw3t19w2nzmr1p1kngou3v9okj5crmkdwzvdqchoxjfq4t044u094fae8xl6upzzy3l13229u3n7tdbiql00golhv7nl4rxyrmu8ywfdxz329uzsd5i6uecs0spzy66h1b26x2roalpmvx0g3ih454ydi4le2khudqtf09ybcwct2idnmytxe4hehb54btgtby76fegpt9jr4cgodky1yi7yp85gl',
                fileSchema: 'jexgzk8fumm5hafb1by7qxiji7nyskmgifn1h9pw65k97wufew1tod1ffkswkpck4yt0llmmif5ou15kaea9l59dddktqam5330qhe01xtljvo0ejwy1tmifg7emljawo83i7usmtvpr8f20bge6urwmf456i67df0m98mqc4z4lgokj4t35exgk0ltm0fcrzovq9frjgiv18jtlx83ntq6wrmbgsfslgjrlexgg07n0xmldx9hg3ky06c59fmc1b7qrza54e56wic2wkqmpm20bxbmbobtpb05j7tkq24n1oxi5rc16kn3i5gb0wn55agqb4g18e5mik8amw7bybt2fs4f5z6ruwrxamcluxejam2ba8qzc0s3psoe0g51osg8jz3213xa7ieam7ua8eyl79cb1qyem5hyugbazeytelackh84ix080688m2hw06tisvxisbyoty7oa4nnl4u7nui0sp5yqvovz8n5t870yrj8gnj8rbugwn9kl3or1npfxbxmng7x6ovpxbvm4u8qurndgwxfa86i58vkf2jnxp0wvcr8tvtxw1uumsy7qqjdr08cnx6hhtz80pwj119rgv45dj1coqq9sqjb6e7ph8xhyocov49mimpplrs6sqqepqicvwynwqex2eozmti3lmbm6x573lm69w4fzyo6kt6rpvfho7m89o02e9l9o8vfr67gzt5foz6yoilxl9l4qttmva0ef2x8gteg9e1isk5n0wmf9go1l2emwc2nyimube5pa1dr7dkqhr7odh9u2d67bx3w4jblvzxreyxqam9egelmu0v4ruwexu9xjxfe6d6m2jrsl2pz0do89vw7xpgd81uzxnd2va4pshj2yb0vhl802p6ph4bf8ejv781rqp2e38swytsj6j2d265e3jozbsavyzdbtk2z2lxzwx8yo5reg6kssff09ildxu2jthvp0iq51rtr1eqoucpyv9759hvi2hsh7154yphlum96dhhiuw02ucz58acm1',
                proxyHost: 'j8qy2o2idxj80eqyhmj1xoeqwwkqkmddzlplxu3hk5xan73gwfqd2iyr7vri',
                proxyPort: 8822916712,
                destination: '776v9eh4o5mb4yq43v0dimjrvlbufqt7oh16duxiqs7mwhyg0898u0k798vgh41ql7eidxbb1j21cyjskfy9918pt11n2l4nov58kjoz5mohu7yql33f1y3e62u12h6m7jyujk7fa51oof1kpikcna95rpd2pcg4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '00w9jt4l2iarbgo5yilrnirc668gwsfurjrf9kplwdvbnkzna4azyps9e1lpzeebabptjumx7e2k63nam6imey6igljfjf8zbn45a87vf6rbi0x0qcxr5338ycj0aybvk16eoyb0e7vwpnkimgcegbd5siffd1mb',
                responsibleUserAccountName: 'x8eytfle8f0sjw7qo7i9',
                lastChangeUserAccount: '06610pncot7stylj9cew',
                lastChangedAt: '2020-07-29 04:07:13',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'wggitkwfisxm5pkq6uuefcm7cxdmnhaae24zxe77',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'jd50byfnvwparqo2ct1hldejxs57wx6rovgvrp6wnr282m5jki',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '8q0lcqdhtxcqdkqxa8qu',
                party: 'lhvrk5v18a6b8k8ihyhf7mkkwxr0vydoalq6byzdx8owaeksyqsl5gnfajxo6gvqtg2ltg8oor92to4pm0a294ocozixfm46ff7v3wqo0uy70k08lh66mwzljl090xqopw7lkgsvl9xm078wovk7l946mj0d6lfu',
                component: 'as6h5h2i7ts06s4mtqwb9vw4hdj2ix0x3vizamz2ooeuzrtydf2nq2jcs02nhzgyw8ydrw7os9ad94ig4p73kdpgeefh0q61h6n4q3xbbze1ah2f0rfbra4vuk6r157ab22i42v3xkzd5nrmcmprahgzscfugeyg',
                name: '3pv5gebdmulp5n6770gvf0tj660zjrvk255bd7ah59uyqo38gbabj4hiyuhag1lci32qks0fmc6yuz4ng4oqo3g64u2un2fc8lf9olfdss76jnbsw6bpjtmzqak3xfs35epp672001u7kglhhnetk8jbs3oq9oof',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'lgohf2qblf0mcow0gn4ry9txpgta6spc5emi83hlgzgofh33zs37evsgu83eu716di35kn7i95lddvlmfyatytn4cs4ff41yzhpf2crbad0cym6s7mnbk42gz4266u4c46a7r4ujz3x4gv41z1f95rjzm85qe1bok',
                flowComponent: 're8a8114if2l7l0mexu0klukhrjlc2xj1fqgwg7gekhbp3b2zw11p6oubbqxsuqs55p6lbbgsyq2kfmzugb9y7i8shwabim3a476sxsamtfc6v1pdn8g3s8qdu5f5idu0zst8xiffyn04bhu8phvqmcctu5edokj',
                flowInterfaceName: 'udm7hufigj5y9h56eszk33zgm7foxiwx18cj9fntdzc4ubhaw9j71vv33btwa96qr39oqdl04egomyt1rg4z7ebf5mr6q1sazgpj83im53zhoxui4p7f1cpr5as5q1p3d72dkexn8mm5h6dt4ar4cbevrmwdouga',
                flowInterfaceNamespace: 'qqqzlde9hgb8vp580t838y90aqetjkfsu187pfhs1nwpxa1c3j78ye54vfbpuvor9zi0laio6f7zs72bmm4foynkn786xogv47nzdbaf5oj0bkq1xq917g6ihs4qplk0hq53xz6fkssol43a1si4i98y9u5d0llz',
                version: '89ckfbbsq3ue7chigfnc',
                adapterType: '06eqcy2gwmdegufr10ej3ylvcajtmz3hbtyeek348wxcijb9k46ft4036a0w',
                direction: 'RECEIVER',
                transportProtocol: 'ocwv91gb6xrqqgidx591sssw8nxtafhewnzvpk25szq4zpv4c5pqti87ll0w',
                messageProtocol: 'yez31l04hbhhxntqfnjmtj2m8h6sjn96di8ggczyfghl3cm22sq4im6o8qeg',
                adapterEngineName: '0v899df7xtfahon4fi9nvlwz6pndvgtsw9qjxwkxh6zkgni1yt5l82fv4q7fosoy7fhjlw36uk65fbheelzcnt215jv0alu7dmg8nzsyvmml6m1rfkc65mm0xhp7ucran2od9w0fafabniuon4mssa15jeqyko3n',
                url: 'r6njdr5mldyr6e74dcaqlmytkxadsrmoq4357cdujdpou7op0tf0by1rswsbz6th4xx435yp99zfckvuaui6pdi53x3lqs68usmgfnpoiam2sv05p8z7mkl11xmo89n5t4ilcclj9eu3m1ljux85q6k5zradmfty1zfpo2ztv666ls3m9j8dtvszv8of5bcnoj16xy4ygmshy2yuzaljah2aga3v8tt82oh1b4t9huyh09yygqjluir2goxv5bwpjeq17p7gk0icwza141tqtjc7wqtx0v94jdwdj2cq87yia9b6ivch688ttt2idh8u',
                username: 'qqevzvt0ombk4zrq5sqvrfdd2lga71iozbx7ynlldi255oioy02fpj3vp80c',
                remoteHost: 'foq5ftsawul8t0eup9af4myqym7ffsxn9hzy1fgr6qm392krcerww4s0mb6srxnexynnk8r6yfgozjpg5uhw3fxgvqwdasssxf0d1f43qwikj0uuurubfx22ed8sohr2iw36ep9uu6l420st3ncivws77st9tlic',
                remotePort: 5346004170,
                directory: 'voqu3r9vo2qno79q9iwyg7dqvxfoo6gflw4j5j4al8a9q9g72g7y6u8h7hzmrxrs8hkqgf0o3lnh2ssfore8wp5vfst8b9q4gnqk5jrmzophn8qpsp74u9636wlclcubssbchxw65xc2nbxrmn2ktovbo1l8msm9poyecoa1u34y6rjbj1pwd9t584z1yzic3ukg1bm3736ka2wyhwxcliolywv9f0a0krj9iob9vqfcxmwm8bxjk2yhajcpnep6tg97qhnv0me66rkm6o9kgljulwztq1vtuzbp6x8o1x2h7tk3ccr3udd7h5x93qtmomz73tbsdo3in1ip5136er8ckbyhy3r61jutenakpzqzck7974yy3p3kki14itxks8owel0nb3gr4dn76183o77rk1ptmndtkqm81bx6fp9t40gnwuwud7fl29hkd7jnc71bmrxnw828v6s2paooch548l78o5uq1o745ezkxwxqr4kmczgn3anmev4el6j1gz225cl7xfps688peo8idmgkhzs6upkii28ufqshhgyu7xjuz5a32ngt0dpde9uydkmxnyefsdsnkw97uvci3f0qhvgz87hrddjrlrpmu4xoli5cbvlrdw9q4ofjq2ndc595tvubf2tkgaht58ohaugh22kegaxrvlp5mboufztrqwemjnuxadvf2nal33ctjlcqlmiu7397s5l037xrs98cokgkdxoau05dmbvqsj0w0iche0ckbybqs6u26wka7hjet43u353nb9dg2xzzh6g73g3d2jcjb4s5r54ddup7yi0reuw2tgunbvpdkdochivkhzac5x8gzj0fqi8kobi3oi2wcn0rryqnh4f1mrrx5402mssqmwyry7kjbpuo0zhcens61s0xwz3ick7or7mw8cl66hgxsfyz71o2c19xxb2u0her2i6qj488sy43o47vqvyrigv20ecymllgjah4ukfifklzc96bmpn52817i0ey26wiqtxgwplorb4h',
                fileSchema: '2ea52yngb2afvd27nvx9yp1r4h8mph2rbp4btgf7oidsiaubrxo68zrwwlkfamqg7gu5wff4gfvew0q0v12tb76nbcxnoh6i3hvjmmie8ctyow0fle3v2ecaw2kde7g8d062vls50oexsxxvbenmnq6lsbbxb7tq30y9zevxx0gr90o6v8b7jxybwe33dp7oxk5gmqmczgwpornbic8gax3k5w8emgqmi7n12xbj9ps4pvknckiwrxvo1xyl41fncuh6xmu19pba2q6vks7lwc517orokttxsgt3pbaph1ebiccllq1xe8yrprcu3xcdn0v720b3oxun3niyra0cn7azomyfkepyjnz5oh47rnu9tlkf21z54h8gd4e7j25bc1937jaku6o1v7moewg57zaid5kyj0ryd10ws4xfy6lfdyzfq14a8plex2t10xezf5sspu5a6y4wa86y56q0zrqny7ovx5x2riwitf72rv8gnnfvqpib1uowc6o73ffkcubm87pgm62dgxxvgzfkvw2vf7sc76oykja8601yt6nid75krkqdgogefdj2u4otzrsl5nh8ruzp8orfdxo90ngwrwri0vjs2zhxn3pqggp7cykeub60gp6s9ok5kl5bbdie6ocr48n8lh40gmpwwm3al1ppczml0cw8yozq8rxlumbenhe3x3ptwnpr322vg0wguwg1l5yqj9djhnq8gx7urrv076utmdyd3l4bkfxgoym82snmfapvg5o3dhqi39483yiq9zmbglxx792yiivato8975qie8s17v3lu6583fhx7z44at56y0vgayz5nhja0j6iyv6lo44z2uocf40b8b957urvvzb6d4bsf0c2u1fjjfxybd9zmzxc2z9nvgtrlstb011pr0jeej32uhru7ytpf9usi4r9iskoo6blziyrtu58afzlk3myt14nnw7bju10e1pxyo2o43x1zs2vo3xdxfe99uwbm9xg9i9kax4rzcwgul76f0fmibpf',
                proxyHost: '6ulp1wunfkbhv0wkb7y8cmg8hbxl53pybh9m22vhzwmiq9e2v3h85r5f2blw',
                proxyPort: 5562864961,
                destination: 'hlq0dzhkhvg8q3ytyq3ni4hi533jilp91anur9ksjbzvky3j0inxynq69v5f4jsao1sbtb8yai9xunre1ll5wo3bou6sxkf00alp0zv47l0v0c0rklusenwau2ua8gsvm6fq8ggs59109khubbfmb4zfnyf87usq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ljbowrry7xxmf0ws4k75vj37wvnaj2xc27tkanmflr4gzhgjtp86siu1jmn8cioetdphe237wbdp0pqarofswp0ppxcn1o0nk82koeyzpgv6ohuyiaeg86ubt6n5isj8njickmt1eovplm0jlptpf8c9o6l6hkah',
                responsibleUserAccountName: 'uxvrlfzwjita62m0gd9e',
                lastChangeUserAccount: 'wx235i39vnsz2zmx989n',
                lastChangedAt: '2020-07-29 08:14:32',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'tysjgf30guc8br2ubz8gy6k6g6ive7bw7bobqyn8',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '2a2rifeingehapvokf7dnl2okvsanr8rgo4ola0sfpd5e887nn',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'xew2suwps63ihcnw52q8',
                party: 'k5casgep3i4h5la1ofsvplnkwidsree7iiigd2pqvsz25mfkvwjvxp7lrffpks8q7vcxx5ftn9zhvz6xemt4fr6apkzm1x9m0y50ixvca24f5s77z163xkrnd6hpb9r68ex5trwe28whwq193o58m2i2fr5isz9r',
                component: '0px6mmw05d0n73ktv2uurh9xox4b9i1r3gudre6hdirywl7acgibux93m0jmtb1o4e5h4zo7aqe3a9hntni62mru5n75mvwtxp101b6lbmfzgmwq1pxklc6yoqetlc662c7rm2k6wzq0ggseyk6dqnh2obpj3uxm',
                name: '6x1pdkg0cj6z9d7igbxjmdl6gu9incm3giwq17sf59ln0sd8yxxzay3s13bigv3pwbn245u92p30uij30rl6at4hlkbmwmhnnzp8xs108rxpqw3d2xn8yrlabgmtiv8m2xv19t3hgiqjbw5g0p8xrpifqyfp5m7y',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'uavcpp0hxzovs9zv2lwa1hx8v6z16a83klnzsn0m9p45bptyfgccvs06ohnoqnfhbsgi8ot5gaycy0tv0g8t6glsvhpbbs3xdisnovkcb1x447u0phdb2gzoui2bekpdhrkd4cdtui0tr7mi7pwv6ggke191matp',
                flowComponent: 'cxn8p1p54gubi3zlta612m9fa9sw4f9ie2gezpe30m5734mdhp6h10e5bdf553wlslbsaq74onj80ud4m0v7p9lxy58cg3hz53bm4eo6k5d63rbwlmqbpqw26m3yxifulxqfaduch6yxeomp8tqu3ssdt2nxrqqni',
                flowInterfaceName: '7zs9k2f8sq8ey5megety82vfzngb6kasy48urw07ha2hfh2jglo053az74rwg36w5rm2m1i2x84mimc1olypc1d5taz26nu3a2s6nywbgm9j2xnbjhh580tafj8234l067fz6hy51az2svqbmcqbo1vvfz5nz43n',
                flowInterfaceNamespace: 'fq5gb1fuoiyn7w3n6i98kawhimd55l7lj20fhn9m64nzplsmx3msdy038tzi789ua3m3bhbu4x0c5wqbe6ccj41turzm47ehavajjn61mqvvf85v24vz2bu1jbdbhcu7xbk3x3lecnnot9ffy8rfehaxkynh9ycp',
                version: 'xta4303xh9pvcsu4332p',
                adapterType: 'rbhxfdzd4sqt9g9jdm252hnfe5lyrnxc6kyvlolw1hnsved3t1l8jysm1q2z',
                direction: 'SENDER',
                transportProtocol: '1z5x5bdhmhe0y32vo6p4tnab14wwlyvdw30q33lsxo9i1xw2dv34kjut8tsr',
                messageProtocol: 'd8cjb5dmtemgtv6b8whbetsybel1kjg1vl4omvcd96lv929q0rb8841effp5',
                adapterEngineName: '5gqatno4ma1dlkcf404ce52juz1nanyzgvmp7xltqhr2fdc3kit531r4byleravx1lzuoupt0c3lqr82ho3e6xc82by4d273pqgt70ldd6l1txc4lju9zvgptnmcx5l9v6ph56evcoj720e8x5job9cz53es1dun',
                url: 'j2xvq8s58hz4ad72a2tn0ibxiav22o2b4hhjeoo8lsh7uclfzkqwqgyfmly0wt7q5a55opuzk40zvti1wq4gg88ok8xwkx4hyssnnprsf1x18x6nuqjsvkni7qje2ib8ix382kxr87579z2x3rsrkfm0r3juu49p041cbgfektnk72qpjxova87qlq68w9qtjnstx092h7yvxpxrf0dyqzjkwtqu6xzyaeandxivptdes7kvg5g5t1guafs7qwmoomekdw1o5snzn3uvp6cy7ct4hhutay666m0y1x9ltkcgivf2dfb1ytsgm2v6rc4k',
                username: '1wfbr75y7vbohqzgqg0qh91e14qlhqpfbcpp3jtmf0lfucf5vudnuth2raka',
                remoteHost: '8v8sb4jzr5dpfrfctcilzsfpsdqszhhoyc8kt1pevzhv8jmzu0dkz4ajbft66n8wgjwr03gxky1k554sktv57dizrzwwcsg3i975h6m7xbjc698lletj39fgdymfd15dhlbdz2v5evhr0y3i43me1yfspc3gm605',
                remotePort: 4806628323,
                directory: '0fdklexde13c5iu399b5mpg9guj3ru1cj2mnr0psaxol02963yciz5ilh9eksn6kziqldet11foff8uxlpbe7okza4te1g15a2tkjmyqi2jfkber8li1rbkwowprce2m3nrxnkqhyhis2s7zlowxhuld4qi5mw3iilehk1baij8x1317q9c8vn4o5tzob1yalmpj5028n2awqbhegagfm2u9bv733wkcjuz78sy4m4reqouux39do9wxyp1uhia1eo0mgheiz8vcnwdbwo11jhhac3c0bp5ps3etgn4yd7r0cwzv6h933h4hibverh1dd7dwif4z3mkayqnigx91ngerotlb1b85wdjpl13vwnm33vcvwgcxn1p3bxoqyiuqbhu63ggv91b9db9feb1tyhkd0l65fl6icpokdvyaapfmctkzzvv2aeyaq4q36nuavgmkoktczlnfkwpir0xybr6ekvytyu6l883awayozktmzpmo9krrz3c5kgxz2ujgq76kty9e5q2vldlfms9wxybc5zdneco9zdi10zz0l96lfia1fvx13gg0nwr181n10nyceo59guc4dk7s398fs0mioceq9l1t81i2f9j69f9xocx8yhyv78i76u1n2z7ddpwhd4z5bj7rtd9qmwk473ez1rbtfium9njmg17qhfe9dwia0m4ymtazkorias40cnze5khqg09pqf3d3d3je76zh5a178h35j2y53qyokqhscvsudsgy1vsmc44c38483k5sxptv31q9rlb6st6po6u81zhirzt5ost58ou785sjdf733wcjqc3isk6gf0bebw7p7es69q20p3utbh815d3737lyedf9tqv84ec45dz67ih1fpfjae5661fww2ifit9addm6xffseztx9608idza16crsookk2zyo95e4vfw1dnqfeiqqkauhqnq8t59n59qrv9vinjxijouro4zllpdf4wqig7bw8nlz52e459q7l80pvcspisa7j5phqc',
                fileSchema: 'mq1q51rre8i29nylsk4uy677gezf90jkijebghi95v5m4h0yekfbmg45dmwyuhritz8ww9hnpn219cu4dg48gigxt9g27rd57c0n9jijohnevjvbnfvgs2m72gb3pdxkn6zqyx2gy5rzcaqvlmjxytstprgpcv44gc7xsmf1gxq7yrhg8a3u7pjiuryaxdjd0pph9t7p6piyk63kv3hwz90336n4e1kwiurboyc40fvgtfb2taxkb96ovuft3h84icc05hhjlk41g0t5d4qe1zj6987edbpnxcnnr9xw2zrgh0j7y1y2fs11fwo2v069aacrj274xalqrkvf9v7vrpy55xi8r8f9dk86flhj70x2584diknukqaaul3vagt0l1r8ovvnalbfz84feqoqxf40558h7m65utut2mfnctavacummosmxk6d2dwk62hq3tbp34z7st8bekmwbgbdu7l45ubk144m4k9g138y2q0hy2hncokh72zipkfbr08kvd0zw60mi82hfpsucgwt48vuh64lypqzkb6crwi2phc7qehqbsii4dyeeop2jmmg4tcd9bux7o05xufqzc339qx5pfkl4kncmns2wx614nktqo0mqmpdvuro57p446phvtyt8d4tj4qhs636u8orgj4s5r1j2tpf7wpejq07aeoa0x28guvwp9tw4kx1slp222kkkjcwwhkiga3d5s7bw9kh82jybfyu3lk9oecaq4h3845say2dnu42c2lroukb6rqoks2qmtotzh1g8qymyi5a33e3399t5mh247ewshex10kjlrjud7ehtlw8r9rfqty1s20odc9hmo6g8fgfgdldbeg7jyf9vjgvc7453zv0fdc02m61jayud1371s8cwm0yi91bk02h853srxpsiueiafhs763bh9i7polxh64ceesho3jy9jwec9rh6a2g8ig2qhvvcnyesocb0arapmhfsa9y1vfrq05cydoguey3893zoblqkzmo2zsr9xr8',
                proxyHost: 'us7lceimusjze6b1xp1xnz8b093pjhxd9hn39pcie47g6mcl3c1qsxdy5bum',
                proxyPort: 6095994660,
                destination: 'r1fris0aqotq6p4af850u82j311h8hh1n6vtc7ltla0z681cmzzhtavwkvc3hxc8sg392wagpj2qbbek52pi9v9kmfpq167g8w0onaxqxnkd3kztrtcdfkmhzupl9akeeghkv9lpsjwhyj6vurhg7678d1pwjcfk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dr1tfzmx5gk1kxhegua1xmdkmaxyw931koiwybo813kupk64ksgpavjw3i71xisjwfeygdndkmn91a5bn1tcpffat7v5hjmpxt9t2r43ecb011f0mhd0jt58okh4mzoqemizdeecwge19u9i08is5tbn258x1y83',
                responsibleUserAccountName: 'p8wh03bdoeqoojqhb8dg',
                lastChangeUserAccount: 'sod3x141f2q7l5gp811e',
                lastChangedAt: '2020-07-29 13:40:23',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'kn0dphh96oa52vf64vn8jullak6s2k2938olu8wk',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'cldb3x0md2hon8avfk443wxg255vx4zyg5hd3hiebyrbhnuvyi',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '4vsp2lvx05eo5wii9fjp',
                party: 'kflnzqpnsobrjho53lv0y0qtmv48xd5e2exmgy572vhkzegl0di0wp0f18bnpbnvw8tnvqzlosiyqmxsjel0x3iryiztjqfowhfy2ncwzsqpepkd7u0wzv9j7a22zwp3y795hl8b962h17qmmc4exroqkf6iutqx',
                component: 'ljr1fo3ozjd1x0rcp76avgwpi42wj8u4nkl7w1ux17bu0jttxyuuqv7ake51t60f4gd2q2128yrd83r8ykel7sie10dqalxdin92tydq6ofvf3fec4l3pimvkgop38fkffuieo4dwtmdxq5itgeg6dj4m1cb3zsa',
                name: '6wc9cgc3xxz6o0qo1qgaqofwjyb3ffflg5fw29shwpl8os27d42byy8b5oz9xp9xwgodcekasha7z6kx7jj65m3zzrpvdxkudhsg5ydw5uu7dr4gxbqsr36gkreatef3z6o94l2233m1ykki8w2bcnvuzocym3oc',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'xw1r1ylh99rcby6qfduzgr0uqqw2jmh52h8n2zoxqd5jkou8kmxljpa0aewvzef4b7wc2lfyb4ghj7094flvkafesbpjeeh8r4ym89gyme5b0geu1gmi3dif40fmfoykbmmy8pjex6nsxee0xubzck2bvftikx0f',
                flowComponent: 'd90qx8f1igc2oky39eomwt67gk6fs4bpkp2dxkrlbzsmlzgognidjmqlcz57v6fa27vaddn60xtxo5dqj5pbqtsn5wnj8kk9rcdcxff05kj9w6kq0wb8vyo3vllbbes6fsooewrl3v7ejqb4nkvl2jku6f0gtgjl',
                flowInterfaceName: 'zosb7qlyd33ipi53jwcw9mccei2mng4cdccw81b16s8t6xzuoinn3imrfedr5b90oh366uuvffr4khf0bewmvajk5okziorpjzv1sfwg6nzwvfijqx8gebbj7xp7yza1a8lif8z3hyrc1jvyislr05og59nrcebb2',
                flowInterfaceNamespace: 'n8e3d28ob47cbiim66mu86bfotrknpnsnat1kb9x2u8z4uk8w5laf01i9qy0z4zp2728mpcrljb1bk5q7znkwyvtjjcrvcrf4r36o1dvg1cwg17862wzu8znr5w2b8iq6w5hlpxzatd3qa9f2udbej7ppz0c34cf',
                version: '9p7xcilfgiv9r2wjrs7i',
                adapterType: 'skvtlkt48j351ynp7bik7fcqmesa0e8bacfqa46a11bhvw0luoseqilmuevf',
                direction: 'RECEIVER',
                transportProtocol: 'vxpwy5ythg3u1y2orgoos5ufzum1zjfytjty8cnplhdx0vlimm6kck9uendq',
                messageProtocol: 'ox2svd4hngdh76eluomcq1kfi07o53wh6dhohcvr6ib2bhoopvcpz4z1p9q8',
                adapterEngineName: '4ze2yf9883swt6mlk3j09tmqitxk49z5no9b8aiw3uej0pgxdiaq45lx4zm97y61b547ny6z0if09azv0ebfzebpxfqxhqw4bewg5d7dffvvy24gdm59nkj8864d4l66ppfowylbuko3n5w289a4q2bg1qa4bpkq',
                url: 'thjntposf6tkcf4etitg1t67spyh93d0pjlzabtjtf35fhp6fyz3uuxnnpodqgkhj11fuqr03siemx4clo3ec18o2zf9p00xen2vvvky8ju49gpj1r7obfmdapxxbrbspwazbc44tj1bksa25xye7939q5vt5vldy0fzvpgx97nyc78puz1d94yha0r90wudqfpi34xutc6eui8k4oesqkh9b1vw90vuino88f2eegixuk9s0cvyjwndzt0uc1m2u005svbfc0kn3ephp56m3dix8bywt18vj00js1fvcn1s6mcaafekimrqn6w9f89e',
                username: 'wj5ak45zce45i2qh9kpappugm117h4vwprof7v1o0le73ej9qwusvwywlkm4',
                remoteHost: '627bd6pa0lncunzx2y27em0mpe8ivj6coovttnl5ehptglvkklbl27wpjedwr3u7sn8m61evjb6upg3mg70mhcaubb8rsc4okhukn27j93euc8rej79vx01zeyzee2ltco9b4026671sb3bddi8t3d02ikpuibkv',
                remotePort: 7115098095,
                directory: 'aaur980po1u3cvglkqac5j7k2um67cff2x73ehs7cxruz8n3h80xw36qh5v5f8hql4ckklljq8pm8fl5ba5qu8wafqijtyss3tcdcretxkhwsiaz228j5u2fu2zl3gcdbnu5f5kzz9s3h6hxfehq9t7r3kai1xoxnobk4z98tvo0zr2e424owx0uiqx8o2obzbm76vmmminmbs8cruh7g56c4aug26z7g6a6f7ab7ku02fk6m83a2xruw2rbyvpfqnuny7u3epwv13dg5b4ut74ovv2iyw5apdzwae0luhz8vaqoisdoc47vtog6wty3qjmoup36qk805uj33sd4i3dmanb0yznnpa5ddz710ok59umnvby60ispthzacwz3mtjl0y02he1mgxsqscl750n4yp2y9u6bpks7rma0pq6f9lc1vd941mxueryiafpcmwhcn343ef2ifw21edep8kfjpfwtwj1k17tdvvadpqo1vh2pbj62vfdbvb4v2ilmu5h7of589k6pmpm606huegv3twxc9dt994c9vh4bdfj6fnez2q328jfnc5gli5h8cfi5xe6x56wwpuljwhtbju4nrxxvwleeh0gaaqocduu0dd087xwa5pbudvn4vx776hq8wqr275c3cx6c269h69ccjwfzma5m9q2no9nij2h83y2vpnp8zc3a8q2teyfvzdp8bhw1utsbn91egw7kqlaketab1usfisq2znqxjiqhvv9tpmlyfs0fn5iv3u18rc4coors28jyvt24g1jnumuwku85eia4fu7b1wnqrz7gyfkkqpk17sfofg4kdc0sl9239rlhrqn645ci3zbo5w836n15uoggwyi9zj2skjnfqajva8mn1t5j9f22o8i70c6a9t2o966jhewpx72oxkvzlyufk1jcy6jsmqo74lecipvzuu5udogukl31rljpnvoj256dplt67s1kyjpjd5mcht89vns86wtjmz124ii1ttld6wi0k8rrdlnnxldv',
                fileSchema: '7q4cf62uo63x5bqlvzcq2yctvxsn2u8e8vg54ycjxy4p8b0x7n3s8rk9iiaxtxr5ukedcs57auy7o0pkwz5hx6lgtsqww2g6njs5pxa5vokycjk58o1j8l8ecxn2y27rfz3y0g3v0jefxkbib5j4lgdqj3zct3zfmb37twoh8do7rbjeo1itz6w3l2ku1smhdrwrberp9x2yvinyg5rsux5n3t3wh3gto8z9uggdj0s51dveyb588vfgzmzdr69xbznb0oh27cshdv8byn7nr8irr2quogtbyrs8mkur7x9li99gt9g04fmx9aykiojxunsq4mgdruatjevgrni9pl6w4v49zg44yp813xslujf9men2paon7qv6m7t5bmuktkx7260tidyikl0228rj65kieg7f51cvupxhl4us36kotp7hopwrmrmlflnuyheslrgeh0wodv7rtygaovweoojf2yeoll9epdb7ychqt8ezll04fycbhdywjysqzmvh12z3fpmq3n0mgcojrcpjflplejl9esk6fdg1i51eb4ih2nrx64pl1ct4h13hpgodkdznuvq0kvrz7tr5r1hs1wp472hmlu7scpx5j886z1uy81qyx22tqtqqwq33hmnk2ivl67o8ozu88jz196ahv04njx7wb50im4jkotg2ize6m1y7sh57nbyg2ntj3bajdi7cigtxkkot9skddnfz07afg176cxmo1v1837upiuy2rohla6hxz3jeao0we322swbkie37xsiqzzbn0v2v6o0wtejkxmleljkocmzrts42dll3y1cbiz2ee8wxflenm8e3b5w33nfae8n71hjqer26s4sgj8xwn8v7pq6yj3nsnlvhhumm797xqt5wlj74eekx3tpwo5hcl1bv7pb97zlpqfhtmk4x0ii8i4lzcatifjw3krtus54sjcolzd4th4v8a760v8385ecosetbthfvnw02bo99ggtud4i5is8e9wse2n0rr84lc653joh7',
                proxyHost: '3l39rdd0lcalucdvl2ra46y0z16ifhtodwph04ajig28w3myje6mcomb3ra3',
                proxyPort: 5807832787,
                destination: '2a1vzbjt9flovequ7debeyd4xvu7jkwrg97qtkyzkufknncflxfzudvpastv1we949855z7vmb020szfo8ujyo99lo8l31bzg6k4t1mwms4yk9vbqozsciaeqxd5n5j36bsp5qwp605xb08oxls2yvswd9x7ozlm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ucjss806n1tjge3yqcn531sh3drub6ucgzyizcj7fdtv17pnaixms8ibgqifixu3zb72f3znuwc5zfp3cvdqchezaqvx6inv275stpvxjemvxw9fptm4a7j315dr52xmgxaqz8ktahvz21b7ucwe4kj3viqong3b',
                responsibleUserAccountName: 'lxqtb4l5v9fe5zmp4pgr',
                lastChangeUserAccount: 'x2depu54apptevclatgf',
                lastChangedAt: '2020-07-29 06:11:14',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'x5bizbb8a4m1ll89v1xrb3bulpihodsv8yqgcai2',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'k1r8a97zj2429oryvmamk1jigw3almw0tyr870hs9xcbmkkluu',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'b0c9m0mqbfs3ztutwawr',
                party: 'da92dgcxfzn2ila95uvfugp1hyknh7ouht146o7r87ycn93ocew26s0j6wup494z5uuj5wwbxw0ulxdkau771hk5hby4qki0kadltb99ff8snagu4wtgxyswakw7mgs7dx6yg8q51p764p6qhdv0usc9ueu0glo9',
                component: 'p3njw9vgzylgthu8ptsfqtnhukt0qvihm9j5kkgrzp83di193qazbslx0s0kc4uj4868bgdlsei2mhsy4n77qbr00pj51fn5apinrd3mndgigi01tao9glz7mi6jygpw89t3nqlcn91qccwym8dse3hlgpo4b3cn',
                name: 'cy5h8v45mfeut8h3fzdl93qalw6dcu87kz718gjiobrxp8fyahg943i4ggwxxsv1oe70htv0wozvn1t9oiwop8zsxmjrnfyiilmoh8w2wxd7k8dyk7grrkjr6noinojpu1j3eqkvqjgez1xu9n7y2fo406ol8i34',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'rzie8ypsjw99kl6t0hdgcpljojkmqexmtlo8a5iunsy1bpk9706kk64853csqachwdeskjmj7cssslja4ogwszih9fgov44n5kvw0dvrhxkpxllrt3a74tk6gs80tuj3zyv49n8y6mqigyqbobvv3arxn01tvdul',
                flowComponent: 'lpraggndnhdi91bixytphzds655aawjtiah8giiiqdi3iue0kepxzpzudi8qhai6ynpp3zw22i87qo3tr0xy0urfoeqqpetuhgvqe5m8utv5akn7oupgw1hosh4irkxlnf30riuzqz9j6pqt90vo5sm6jl42a55t',
                flowInterfaceName: 'rbfz52xbpztqgaxbechq9d7kwrozvlmp9qm3k6uoku9l8wpmmej03kv623jc0g7vhapmyu9yeo2k1fk48pbk6mago0eaxp459rgkg5cla55qthiewcdcwgr4on7y2d9jrnfdj1cvhc4pp970ukxmpnqswakgyk7z',
                flowInterfaceNamespace: 'o3ep96nran5s1uuqinthp7fl0nxqz734mzibt5eeclcftxwu4itpzm51pfe9gjvasydn2q8b43xty7d97fcw3a8c6zctdvstf2fs9061ovx7drpv578urqpkwcjkwap4ptm33mtevo7bt61o52ehh6p86rj1jdn0i',
                version: '10jxkqbbjcsil2hjfv2k',
                adapterType: 'vb9y3xrq43hhrasns45icrbla3z2yvkshqdtbn5cjcp5arazcpduoki971xj',
                direction: 'SENDER',
                transportProtocol: 'rdqy9t0y8uwggzw9koavhnhkajq5sfmfnamcjclllbxqdkp6rkt5znnthw8h',
                messageProtocol: 'h2laagsk9c7kcnytxgxx2r28jcjrp6433aefxatnqcdjq9ku6cdat867vs0g',
                adapterEngineName: '92g0zpki2qh1ukmgokas5niqwgqdwsvqtfdtn9cru61cws9ja9h8h0rm0xe4nak0wcp0yvesxo1d8q5wl7tbxqn1q9hhr82qnmye93trzo16zp9u3655t3vrmd16vs4qhshayi0buxc8czmz2o4jajsgqgp8d5j5',
                url: '0szzhqivtvf5prg0jetr5oc8ra4sl3za8jo0nmguma5t3ij2cfqdvx2ds8zz7y4uf8mge11p37jtdxlu9p91alaenui0po5omix59301sgx6mjt795zser16438ypae5rssl6ribohio71rvc2712h51myqbvk95n59gqosuiw483h97c1ue9cqcxnu4m1cr3jo5h8mr9vnxz1byuvtk00mz4ravxfzdwh089z21ineumnufnrsokqppz0hstvpyr1spo1437v7os9nd4tiz49oip4hx0qx7h3g5pjlry4uy4c45pm1ni6iulan1z7q0',
                username: 'c08u600rffjkfssr6476qblzdo2g5ybexlek9ilikmcanngofj9u5uxr4lrh',
                remoteHost: 'qilvh06wd9k4lskf5vjlk5bjl7msen52ivhwa34sie0znp7et580y6ztj1b400aexj7wj8y375tiu5fttbinmvf59u4r3mmtffvlvnpw106j0nug7ardz2fwn29ruyuy5contmtaqbqwldaeyg2cptydwwa479so',
                remotePort: 3085949260,
                directory: 'zgfrp520j0w0wlhq19s1hmsr73b2pqco6wzj36f7nvc0gt0wzeyrctag5or5oyxaq7o9d3ys6owycngxnvuqekdgdc7f5vfl7c6vl19j6i7e0g3susxeevjjume3rau97qo8aexhj7no9abxidu1sna7qa38jg243jw689n351fe7wpppjkpxbqp8jzdoca5dwc9cl8d857xxj5tsybr6gnw9trav2sf2453vtg4qpc612ey18s2sadqh80wsibka247imomgbd1ydpyncw5nmrxlgkwk6rug5c8dcdgjrvu6kk0eukaildxzhm716b2iijksmzkbr1wlwxybp9tf6qio2jfy2j0m0fd1nbkbl0rs9q7mkysfgb9t5plqj781qj6yqemmhnqc00ywvp8taj506i49ivoo7yq4n8hann4u1xkxfta1fod3xhhchb85qu22wmerorgfjv29sfcvuzow8xcmiv9sda1shymza3kpd0s7eb72dvkytbc3zd3m6brj2ync6qa909830aznk6b3qr1ms6z3i4nn2bw1qma9h7tzkpbgswdj02ympokwiv0p3ayd77s3fvfwyf7ofo59w7eh48rrurmhnqadqo2gpisk73vnmle00nncqmpcofg7p5o3h08xkm1fgd9oj16kxxpaaipqxke5r9cc91srf1lsxd6739jowpgj9nz5rf4ge4sydkqz1n8n246jiwyu519lsk9egm0kgfgozdhasvrg16ko9b9py3at6xv23592rmmpzvkj02zonj47725gaod81e9dx5tyn2pq096htk1duej8q4mlr36fssjmi8chg4xgknpzveucsjgelxg0utjuig729zdepo6pz8pmamt147qkqu6qqj1nmojfv20n524stqv76sgslehxj9lg1856lt5vwn37roj8hcmy6qi7l6g47z6rf4b46har06efeu4p71o3998mu3bj3wk9pjmnm21wcnw2nmrxb3yotzpsmwgor1xbhv3hgys',
                fileSchema: 'sqvdctoh8wrc6tssee20un0246lhmtohx6lkmfkt96htsvaqu1700u2eyr7bt8aio05m2ccdvssnoz61yfc16wclfbgaiiu4hk5fr75vfhlmki9dxjld0vdr0vvarn7dnrhixeqdddwajqg450y5hqoir6wu6ka9n65fc7xa9rw67661u55sx8rjjt5pl132qqvthdyq2lww0op0te0cjb95iqsui5ql29tjqc3efnv47wrp9x23jlo4nfaykp7zoi99gx49ibazyy870ij2wly2xcsrtkjmr7de9dlwqm87la7xfwqsevsopc3u41s63wv2410fiely24lkmk30bmma7h8zgs5y1zg7psv1gtwx9j8c058mzrpk5xb2590w408okyiwmnfrvroabzanqx2f6u3huxjleqv6uu3qluggn1wuqjqpx45nfb3xscekholqltqngwrfmi2rg9xwc0da00mf9ftpdvefo45ogsa9kyzqnnp4ybvojflbtqn0k6w8t17uc508gq7fv0k54wwj69zkpp95s1uf0hvdhdm3fg5bdi9tzj2csyuwtvtwqbapaqzbh97e40tfwfudgsc4408dyq9phva41n38umdlks2uy867ovw8i7142927q8bfqrft17r0uf3of57ljqm66ljfegurl2rrstk5576qe99sb6gk1mvege6g2pqqcmentm7xnbbtx3b8t4tyur54p720k46xkdjcp1c27rmk1ahqj2quya98dm4ahivq9jknscdpyhvm1j5ndmvq2689se30b9jy9n7510gcgkkfrvowrk43frgr0hnndihiwq3zjrlhx51xb6my1aoqnc43szf9tltphj44rforq8iajdotq302p0ddtd3ugus0m9dwj098867of0l4wumg4hy9ofsol67pnj5znxya7ld5pbvt9qfo02up37v6zyucp3l9luhogsifkbcpsf7xn3x0a0canlyewx40mx26q9fn32g4blt1nf1xv1tp5gfm',
                proxyHost: 'tfx2qf2acvsf8cv6v9rme4j29um185shgmtia51konamgmgblxdryspkwox8',
                proxyPort: 2335104495,
                destination: '96moxoazmbg8w0omphgxcrsdlsrlii4sh8ais3j84s7wt9wfdnd7zu3eblplk1h1cxkz6cots8skl8lrvqkvq1quhzhz7pk4vqbmmonged3fq59etkh55zmbi4y41jzcft8qygksvr00bxe92wzp812k219votx2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1wwjjg30otz907zcv7u3rdaub6akbpl7s193qz2ropfq1nm6sb97chwv5iizifk6p30fnq1i277ryvk4t4fbk8mfgm8fkg64q0ukeldg2pyz7lhfvl62veyy181q3ti0wy794ek29zf1cd7l964bnw9tx2a5zr2m',
                responsibleUserAccountName: 'j6457cbmn9n2502u5bnd',
                lastChangeUserAccount: 'l0svof4xfvfn2s1sbzww',
                lastChangedAt: '2020-07-29 05:29:21',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'tgv77htny7vju75b8551rs83hia6s923cku489l5',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'se1wamsazuzj4wfa30zagv7g4izwckadkmxmllii3avc4h6m5w',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '9sebogpqm31gvwrpyfgt',
                party: 'gudziouy6sgia19bvzgd8hgkrdd0xo74nhsh2qlp1c2ydje01shc6uiagoxepu32z9zy6s9cwawabstg9d5zyv2lom6mbbga5zvcy0mfofulgv3vhinyrw9ec79kb8zbqpmwszfxkyw0skw2gdwoia9acc4lk26y',
                component: 'mabqv63zswrcw6j20xxk85pmqkwuwv1wdcct8sg4afk74p88sdz22ms2d4amfi7kcu5d6emwyi954eij3yqqs68rhp9s4n8mdjekqts9i6fb04dpbfxc00rnsorg8of2vqiy1i341g10gtd0z1vb4nk0418fupcy',
                name: 's2dr457aj3yriovorgol15bifzglz9nsb8w6c65lyhp09m9wazbtdjgrd6iqnutva2bn6ahg6mysfyxlfag1ag38n7jghzoz86p9o1tfxdm5xkfj58cl8911rs3i4ffrr81lnuq3w6l14yrhdpjcaesunjzjma64',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'du8mqmjy1op821w7xfhx9pssosp24rmkodgcctpwwz0psf8dezpyy4ejy7qdn1d9dwl4dqvtpcwgp5us1mttfh5s02680bj1dwoxaxxnvakgtxecpoiq2ytz4h0d42lqn4t3b0trm4g7jbgbx25eeudwxp009660',
                flowComponent: 'em9z7w4lh0d8h3akp4747aqb09jt9ksz3uhl6uoh0pj87ui4lej1atfto4r02z7kcn47pbf144s8lj0g1hqb0zw4dwnwdrqg94wj0d16k6zeb6dshfpi8fpyl3n3paesjq345h6wkpqm84q76jsd24qe8a2xf2hx',
                flowInterfaceName: 'by7f8flpnem1qz5f9oeiu8iosada5akjeopq5u7ohoq5j8mcfrgcxmvws9k3snw5shu44hlbz9a2ammy15op6eugwecgb19y09ep681onss20z4z9oet9g2r2zrarrgklvvie2pcdh8ktv8mh5cpdrtwir8jx34m',
                flowInterfaceNamespace: 'lal2gtyw4kau6tdyvl4golig4x29f631e5idyd61wkb2005zlcw81cajg74xxixbv0wa7khfsk1rpnwdaqmkpakkdm31tj3z1pw81ajseugecrjs73ky53wcfk9z18gwhmaizx1bnfqfczdalxwchbdpvb7fspot',
                version: '6whkpn8lxx3dbahixj81x',
                adapterType: '8t25o27n2kcztvhskif6kp95gunzf99i3gt84fv8kkeoqw576u5kjwupn3so',
                direction: 'RECEIVER',
                transportProtocol: 'g2og520hqmnpeookz01h089pjs1cwin4uluhd7ptoe1nsgh2a4y1b9zugogy',
                messageProtocol: 's51bdib24dprqsccf929lgozgjwav3nabqv6xqa36qdwzx97nynp9jgvve6p',
                adapterEngineName: 'fo4uvwgddz96f6nbev3de8yqkjdunc7d7a3n7sqw2gs6paovs537bdebn7gtaj8elwyetxslu14dm46umybsx2hv53y3cltt3e6vfjstmc856pf3eihtelsu1e2j69hus1bnqc3h65mxnvuf9nxzwbm2j5l9ilfg',
                url: 'xw5qrgwb9vtsq1xlfnh334ijo6jutsft5hbh2zkj3d4i8zosqcnkk0ohomsd2d0hlw0g6f6ai4d1ip54vd7d7knv3cnprc1ca4i450ht3l27obhfwknft7h1vm5loeegz4egi5gbgnyonmuardmkapjek6lf6qym0oqt19if24d4gi4yz1ypcu0ytxbkm6lv80m1f2bc9ouu8dyd2nfx19kgqq7us6i8x8rsr34fxw3zw4elcbop62elzcq03xfmrfwlpczffip7xvaqf5tk9q6cfj03skztewla4kp4d7ra6x9lr8qu6otd70kei15b',
                username: 'nk4lm450f0qlxbfz4ayee6iyly3amutyiymiwdxn4d5r7qbo181glx7h02ow',
                remoteHost: 'rqnf41kwq3uin7h74adcfcr6fiotbxyavp76ld16ysx5po0tpd7hkv1uk0hzsjkeqeng8qd5vkp3qyulrvly4110ecwldk4ovqwzntd5723shxtf25mb214w1k4t9kflc441317k7p7kkr2wxc04eww2gnv2yg1y',
                remotePort: 8456869170,
                directory: 'd51wczfqczkgsc6mocih1iwgj7il1ve1vgc7h4jo5y3keb34sv2uqypx3tr0vd0ehw7c0aaf6zzufri2noqo509i2o6jdifhmt0f12c42ud6xpzfzpnscyq3ku7tvt1z6olv7f9sr00h7glrmvpxto3nmvkb3dkt4a1m1epz8mmzh30wd2nmt7gyb1isd9c8qxmlqb3qu987znl5jst3ajr67scv65935njd58av1ofuh2fz81l0mdmdn7cfqky7j4z7bp10cyeauwkz5ct65pl96q0at7blw38bcb1cfw9b8bw0avrjxcnjo31z614jnuvz6gocqvneeiw1152pgeyydpptbznel846jzl3ezfncb528hzqxu99k1wkfoowzgyring8wsyf2ttof9ke93t9ym8ik82e0xoohoux5sddek42zyxn0usffzchtwzrfgw3t9bs5mv0jxko3gzbhogxpo9e3qk9kky9l5yzri8523s1r9bcm0rms96qtq60t0mq86daoyi083l7ewmj1fs54rxyfy393sghg4rjdzh15m7nggwyhox88cayy55lhf4fwac9vktqsr2v75e3b3w8vg8dk2qmckja0x3gju2hcije93ue2ynqb2jcy9jbf7eqxcw3k22t5rcu2hscnr943go2aam2hvignaygcr67bhktu0bhxy2i3twv8qfuir81yolkb5ozouc565wbs45u6c3o3jxq95o2raizcc8bt6zvgp5f5pnf59t3kt3ftolj4sgzq1gzdkui23o9sxnf5qk4ps6nsf4c8tdbu7yyed9q9e961f6kkk1hzo584f1d5o1lg2avuyusyg0n3res9bdm14ok1831n2oejqfj9xrj2rs7su8me416chapg97czh5xxjqontjva7f2mf7jrompsxmb9d7aecvmt2hl2jm0xlbws6dp4a6zf33gv2a2wy2cucgztbhsg7usg4kpvsk57orhybqtrv5poful1w5df7hybbk2ih7n6238',
                fileSchema: '34iqc7xs0okd6u7gh8rst56hn8x4j9pv8wlutfne36jgzo5jshbh9gw89q632v8pqlrpkz4tpu7qiqv0f8k6txx3fapo85lzohfu951focm5mlnhp7djo0utl3xkgu58jkrl08dyw1hsyieuviglct3jnwnba1d7spar5ni4kht0d6zztifp4pqd7nn0rinkxt0vwenq2qtq32k9mpjni23xl0bot8lbzhhc6huqfwiw66o9oztwp9gxfi6q50yq30uf6f0107wmtgukclbixojih6snbgrjln9lde4sjnuob7m4rbfbm2kqkcc1g914vhc70y7m6x4cmhu3tei5fwgezehcsl7bo4tr1kqhjklx5gcfhenmwfxag808mty02veyejxawsj30s02o9lgr07ba70icqaz7q17on0laout3235743tldze6t4qg0rac7cf6odliutw6ewpywinig2ksguknhquimw6xd7lauz5c3kdcsbknapxvonwzt9sejvy17zulpg0nefm2krfxd3bghpwqxdlcp5a5igolndu3qwf0nu0qdb8z0adnc7hhwbhuu4h7hknj7cmpj6to7en1nzu8xtfm7cnx9ovhht14t5sm4mdch015ui4thdkafcjbnaqj590mcazpumttb1a9zpevpv7nq8ztoh5jk3bbcwd3ukie6o15ur0vwt6ffkqce386910hv2vnxpiw7rn3wgis767z17x8im8wsy65a9v64xl0oh53ombuivmyqc298633pddqbvt4t1yu1l6e82hrvh0an3vfoz7sht2uu840n1ghswgpbgfztu6bt09xzt9iznan7d8z5ezd3wuz88jyei6ojpeslwkgcd72u9elol0xyn48gvrt9ncraivcejygptxpbv2o83xjlqvkfbxpwfl46m2gz3alaafc1y71j4at76tlio5pmgmzf8qjwq370vgkv0uu12u9461utlx7h85hwvsivt17fxjb3wd5eau6d282go6lq56',
                proxyHost: 'u9jdb3nqteleu8ifdpzv9fhkw5m7v5x6tjq0wd0bnvyupftsl5w0g62on8al',
                proxyPort: 7233374153,
                destination: '8v3mrfutzvtqwmjjrbuti6lq3nmotgaeyw840c1dqesvetjz5ig08zjm1sdlttbs9ygaf83e1fbrlicysrgdd1z6g9m5zgnpw8kjy51se9f65gb8nnbbv6vx9vvbnrqc9avrt51dxy3s7haeo963zfsmxv3rkmx8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'e37ko5dyyqf8hw1oexn2zc9cf01l6ye8fd0l9tcamb9qx3na3qrqovppjsknlvjns62ntggq6gl0z8uubreojzk8i5t02e7uub8f9dgqpyctrxi6ek4k367c8nep8ixwbd31ehanleydihow5ns6l7jcekguiojx',
                responsibleUserAccountName: '53gaqn3junmyutsqgxh2',
                lastChangeUserAccount: '4fllzndxgyi8yagppqyy',
                lastChangedAt: '2020-07-28 17:36:20',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '7yq8aafoixl13ng9s17zjmrtkaml84w2cv5vvf3c',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 's5jew1t6lh0gj99romnsy9xsnoloibhzz9h6ikepb5ivmzrimy',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'v3ldx5q0xnkpkqavr3f2',
                party: '7am9f550ap60lkdy4jzscf0ku115cjr97ufucsf8unmk65ol12ledupl3ej26eve3x7x85vfmrgmy2ulyuaxq4w31eofri43pbyed3ja6mqbtqnc9ave54mm72kzg379b76hqe6v76eso7609n9hk30tnbwt5e7n',
                component: '5cnelqdhdph7yqgprjkxs9iudhjt0or6vvjzlsi0kus16wvfje6e507pkfg3n6vglrra793yhm6x16fm2k9bicneg60r2xvmdcx8pa35x3yt1urigweo4w2i4jczdwrgw7i6wqiu38f3w0e699u7eixfu4k9tq2a',
                name: '7vzc1b8o68yny3d594l4ngarw7scwuke0siekn4rj5f3im16qjgyobfc66rgo53uw74iup6flddhc484gcbah21nnq9dlbubslwoadjcq0i6xywybjd8ncq9a8bys9c954b8ojw6pry7qy5ecpa8hlasduhj1k62',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '4giiz9g520fpcxzafdkzju3cf1jhuwh324z19ryhm9h6qqlvge10c66d64mve09v7h2vl9f1z7sxx3xidehnuqhl79oyay72ghbj2r49pchx38yreeizd9mv2q46labpbxgserx71n9esu3r13t2vcczkv0ctc9q',
                flowComponent: 'bx9yve8m4x1qse5ppdh2p3knxb7krdy4e63dk1a7bzc4lrznl1rocf2w14mdfx8fwmtz3lngklwnuyvt2f51uw7wtdn8zv2vjkv4uhd0mlsbvsux2j9izkn4v3e8dfrd892e1soh8bi84jwj9ayxxktf4ekq2xu1',
                flowInterfaceName: 'b0vkufbw8r6hww7q87sk15apoui50bn8f88citu4tsgutohyz4ouvh9781c70ad2pjgurc3uncbu5680fw7xacr677i4vmws2tn059jtep1bv0wlfsicmbekygf79amwgkd22auvz2cq4292zqoay3ju909pslep',
                flowInterfaceNamespace: 'zvvfenm0lhmne7qyecbrl9gx132hme9ufzti55f4dzsabcmfivzfk8rq5b345pmpl09cavvxsg9dzqx5gadxqclbk8dgqfyzd8fjwwojd8obu70pn1seol9qtcuioyj6hgx34rzrf9da9oh41gr77w3qy5nl2u3h',
                version: 'uhc4ksfs3zi25oc2xcwp',
                adapterType: 'jilzkb14pqmt65xkwqgsdn0b6j8reyjvx6883axet6uc8fo9b6zbz75rdhqjf',
                direction: 'SENDER',
                transportProtocol: 'dv351gd22jn01toaua3f4ajhk4on9w33denwafb9in3upl5nqx0w17je8kqx',
                messageProtocol: 'zxk7zmzdewjtcg7g5h3doo7bxy70rpb2y9gb8uxvkfpx5pcidgp53pkfdst6',
                adapterEngineName: 'uctu6h43b29y4hd95lh0tvr810t1oy9souq5dk69rlek5shgwk8jtq43oqwtkdm2upuxyk3axc7wbem6apfee67v3vl9nml60nxrv42p4fuf6zflkgwyg2cf6zafydbnw7zg7mhzju3hnln4kza3y8bafybdc454',
                url: 'xxjxt8v7ok03039yf81w05g4cz1dnhpy0aktno0lppsn7gl9mbon9jd17tjoogi9vqmvhzubi4mi42ur15hupxm3l1xof0gh5bqudsdys7f38qal3vc06h4nfa32qyeyr6w6dxsjq2go8ju0w5nezj8xjux2v459agem58jh5xy2giesbk6qwt349sehfm5c9g8e9zi01macvs4uj6nlnfil69gwn6qsfgb0sv6e1tj34o864xpl12jb38f534bltv282tpgwumh0nc8975l53554g3ka3onyv66j1i4uzefomndfjkircamvyxrirp2',
                username: 'hftvb3qfmrwa9sue38bm2iziv525ft65wm0t2x9p9cn73k1mb6kdpnhn7zgu',
                remoteHost: 'bx8bq9jamgvdn9b67jw2h0b7kskwr5zozsz3q9067cxdds2lhmt227uaqm8sqdp3dlr7wsar6j6lt3gspr77an1y53nyh5ep6lxq186nrpm4qgsurui4oh6fboace58u3zehia7f06iznhfzz06bxuu1lnutpiaa',
                remotePort: 3372770273,
                directory: '0motlqsve7s8v1bww01ypoq9r508271i5f2q198xyidafwbtwojgudd4gpth4cbqgbkvm7ucyalfojo63ogdhk5uou2bil0hgxvcvep8p4xj3r5d1ui4ajra2n7ui1iv5dmtx2okwt8vzoseisi2v0do56m6lwgt0jmhd9xurlu4ipczllrujflfn24up2tbahgxf9xc7c1y1xv1qpp2sif3kiul9z3l8dvku9hcdnkp1j4qqxaku4ga1b5nzwq4dlyycu4ve7hjc6sy42zxvre6gpiwovgw5oh8ev6zddhahoxqftw65ywr4ew5c18l3d0i8nwpqjzdvsu0i6bu014ot9n6p9q3sis6bcu8e93k8wgiskw8ent5r0hgsx907lxfk75ox1m7h88j68zg693y7slu4m4bomd7tluk1nvgraqvaf5sod227gm9xtdyjp9tqpngiwa5jf6y6qi0cypn5rjybs7ltec98jboypc52yzo0d6n8hghisg8tj5ktt73lgxoq2sg8fl61y3oefpw9j99bjiqbl0r18ej4q7w0ati1iml20qxq22cdwzvij7sfs8keq73ftf0eukkws3u4sejox4rib2urwn9m1drhtdkjbmdd3gjmh6ap1635oh89wyj88kh9sru6abgmoallhhebxmhcxiso8jfveg0l601n5cx3eahk065qbpdvs8bpj4vwawoptbujh0k7u3y7jxfyna02ayptjijr74bc32fc59e54ns3klv16386cmyqe4gk0uem92bxw5rpw7wx1zv06p9lsa251nv9vab9w3ofcpqlugbzday3klo6eqn9ptjbmfe27kzb33jg9gsmzfs0p3fchxqkker1uawp600ypedn8z30ywvhchk9v1c7k63tiihcy9tomuhmmcp912yd8a1bqfis6oxu2ekwe4qkr0td7j35ns1y0t2wxu5inkf4v4vrriu4ns7es8uzlbmuou7tswhxocu6lemyb56li8wibzpt5d4n9et',
                fileSchema: 'ci8mwbbkbd7rf85lcwvcszwpextrnuwk8e4qzgt48j82w1m174ft1jl3z1l3mzjeb0fg3wh2xzjpw0cni6g4ocxheahdpjloa5ijjkcygd7pfg5ixpucibdmseflnlxr9fugh3aufczbdwfct2w7fqjl2g9wiptud32djtnwaprfuuxz9jfcgxzb2ckyuzh069prefai05x7jz1v8qennzfcyhv1q61cay52aollkrga2n9bm4tv33hjdkyqoi49v91kb5fvs12a7gsym80nb8w2bo1ltqjxu7l1pmwgl1nunbo2x1xpstcpj9io70mrd3h5zcvvyndliiu5oawlj07e1win9stx8vca6bqt3rxx3n5c7z3xysnicxk5du4nofexrmc83v8svtid6ndcd0od8w5lmll6itm30qs9bx8axrkmx9fxxe20cg6eys389vpinlwspibfeyn46as8lq16wve0tye88sclr707jxb1q73qo24azadmx7j68ngbst8fq9igasw324yf8a6y46w6kzfq123t6j0rzeio905bgv022teph470uc1k018nk93u8tb95847a5e7wlql8bvo5865kwy9skk57iwmlcvlfp1qq8jp6jl6x69by2aa0epehuwhms7o2zp9gqhkf5sxgyx8jbk830cpkbzzmfx1wft6qm7xeedtpfnyutp1blopeau6q62y17p6qip7idvcq9bwlu6i1jv2q3op7wrnzd1ifqnj9wck16rq3jx4gt0f9sd4sy0kqin4rqwwmla215uel2o08u5tc8wnpfd3aeqfkbm34g91kzyckhu8hgw3sx8k0zkz4lkm4o49v3nerzzxgdtgc175vtnbe5vduua8i5qe2ix6r98ioc13y6u8wxb0byfv0gczei7p9xfum4mjpvskyw5g9wo79spkjcey0l7e2957zcknbksy0hshlady4kirpxsz6pqdfjjao0upzlcj23k5anp3hvcd264dpifliahnnoltubof',
                proxyHost: 'h842bcf2osoasbw6gwmomliezigfnx4twlnnh80e0x0711iqsrl9k9gxd8zx',
                proxyPort: 4944988108,
                destination: '9sywg6kh52xdung128rgohe8kbjfgcznwgi59silhhput9l3kare18tehiu3a10ngvvcvvxoba4jk9e1twfv2xyxmrdwxf8bv7swc4veynlt9vf616sitz1uw60xe9mtkf9blunjip6dpkinjf2vwujv7yv2tcuw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ls45ssq5ijpt3ic2b06k1jc6w666qpzgcmd97pvbvjeu66l4f5ro72vw2n7oawcb8od4wkqcu9vrcug8uisx0g76lwm7s7cdhyhb4wdx9r14kfc81z4nihc15bm64124s224qg42n1sz709podd0xdey7j353o2m',
                responsibleUserAccountName: 'neem5aj0vpy5ogffecmv',
                lastChangeUserAccount: 'wtcluli8zx22b1n3wrh2',
                lastChangedAt: '2020-07-28 16:22:03',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'lgngyhbzkkbsiwp2yn6h2ohw4afpc0tlxi0v00h3',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '5na91t23kw7veuygqynzwh9eocjyc125l56wsaepfafju2r9yw',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '87zo9pgko8f993tjn6su',
                party: '7rauhseirnsozc03pv1ffjaw6betx460jl6gx2luusinuuobupc87dnv63b6mrl1py5azkau2saa2k8svaukrmcleggmhwmurygf0yxz0iv6to3ahzzeo0ch2iwtq1hmbarkgvclxilgr7x63vnbhwlmpbkov0hr',
                component: '9o8an9wb7hdhtz4n7m5225ryj7mzzb3oqjzxt1xwz3h3naeprzmbb82ghnqpv06exqrkczf9jdq0jsmsziphunqrz7yxsmkc4noxwmw7yz3frft3qqhom4iujadjp74z2fsh3u37oduxs5cln3tqn6fzfi2qbhj7',
                name: 'goy44xnfpyh6eseik9i2wbsemyhwk8ea4s2g4iuxazwsqwmfux6odwz1c5rr9s9knnu2dkaoe9rm6kei2hzp15oeby635t3hh1in17nsynift34xt550csc73gzwtv894pnrw2ceyt5b3ukj4lmllvtartj2ep7m',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'e1l0itngpsfu2mgl9eb2iiwgwgu2l7sbysx6epvctweb1iyya93mq0k0v57bazzhj5n5rxhhm4v3pmn19yj0twert5dcirotawwkw4397qsi4upcvrilmesvtxk074kus9754kezxyrz7pd886qxzkvrrxp5gxc3',
                flowComponent: '72rv7t9f3agecp72i9vtllzvroq8zuc1xaewou9lawul400ay2moxckstoa01ykqa64r7ipzzblq5ia1298dp9y955kzqtkdb3k3tiodm0cmo11e7c4t5ak8u40iswkhqc5hwt5fc1evw3tm9ifwz2pptgtj6vao',
                flowInterfaceName: 'hgqgxke4shyvvoyxma5e3xw8i10plkenxto47jaaw64rmxlvkbg7m00xbbga104d0rd1g0ti7jaamuojnelox9m64t9hjttpqweupt09n3yoahyhel9mpak27oy2flbbk51sicfki1ku6wxsbsi05sypma3glaci',
                flowInterfaceNamespace: 'eisgukr5rcxsr8qzd8y0mnocan1v5fb6fbkhdprubrd88inja1ypcxykqtqcz34qvaakfe4ym005c0kb9jezhngwpswriwssggbz5h6b4binhsid7at9gh4zh6ekncbvpeezmvjijj8ovjqp7eju418rcr1kbnq2',
                version: 'w60lcl5i2calgrq36mnz',
                adapterType: '2urcud3r0w322oytbddgkikyg2opuxr9480uq1xsvwu3x4k977oj8394l63s',
                direction: 'RECEIVER',
                transportProtocol: '8r55ls3m5z0v1dkqi54ui70jji2uokk6lrpia11t5jmzutp0rugxrq5dganb4',
                messageProtocol: '2chsyi9d2viaszrs47a821lddk6amikvzcmt2voi6dnr0nxxsvq43v7ggbm8',
                adapterEngineName: 'c9yjih2uy9evsicw47jd6avbvy9g79q9r09nimot8j7mk9y8wpe4gufs2jh78tvl68lxq7ndv4tyyxyiww80l9h1f6lb08qn74capqn8vvp8tz6cf27x6oa9183iw2g1f4e0mi3v2wkatxi5w6o6zjwd4uexo57n',
                url: 'rgz7pw15ksq409kzp82xyhno7vt4znq846pbdezlp9xa17489v1t9xmzeg7zncxawqe76ooodngz22omb5fu2oqnvkod32fm6xhqu0hec1rpl8n4ubrsqtsk6tf01mj3pa1qdigs72ffadu55ngz3ltegpdbq91do7ap3uxrnt8fflfuq1j5gtopkvu08ag2h8kxwawaqslypifvm8ok8ee8hfdmvy01zebwa487xcpe0ej395ngg2e4ixfwx4x8oxke17l6284n6z2fy882ivf8ps0nv9a01a3q24zebphje4kb31wxhvegq109dysa',
                username: 'di2qnl7zklqmgreugbefk90t1czu8lx2zcf3s7fqv3kbv3j6krimn4ohet5h',
                remoteHost: 'xk1ns7ob7tc16zishadch9ct46aa9nybpccbbuqjz41vg1a8jq74r5furimg7mxy0bpppqhg3ti9erc1wwm1krawj94cobzyegn3w1mjpcn9uhd4vnsfnobgprwll4rvlwjapipipan3hk7s4bqj3n6bdiqaqywr',
                remotePort: 8753498580,
                directory: 'pyokh55i69m50z0kqdiz6gd10g0jfkg5jrqivqus4mfoyy06ubjkmgcycxlt6guabb7zuxg96n3qlenz1ioxw4hisuwb8nwmr14htccrzbhnbxfo72jdwxkcvvkxumd1s8cmhsf5f3cccgxm0srdx55ojhw1p551gvvqy23xnzj72xvog8vouzplerznqjl4jzye72t54on82o0vulck58thm3gbqqr1hs3jmtghctbbkshvnw1wbtbfkrvnpxgk42hue40b9x8ermr9d1i7xp03piynd4ullq9twuq4s623c7e1zunipnwydqlviiw61bciwb9nykur6ucjbap4g2hsutri3sc50i5bptxql5i44rojtiz7i5ec0cdw2scensz4kvg66z927vxu8zb68aem5kwzi5veswzff7h1zxw41tdb746z9bxufx72usfa257j2xmrymv99d9qwxpn6bqaxorbm7w72kgalyqy9gixgfuovq3t8b7no922qug43l7u8swd1zrpos8rars3k3dii4t1t3beh8pp6hho6gl8oslb9ki5icn6nciyu4chnv6orp7pcgc896rfi8z1kphpsomhg811jf3s1eiyrldr4xclndehrfpz9b2cuk2cpaanxlfmxrj2xkfyae0kuqdwwy11ariftq84r7chm3ri6wf2rtxsnmw9seahnovbncqxtgwvqlau29155oxwnxhpakhj0mgb5mpxg5oq9682f923os9ywr5rt809e3eq9fyur68x3efh4rjae4fgf69nmt7tay22p989rqqz8zr92huilor2wd9v9n4mxg960b5hczxvn5o3ner2jztczgx4hhia06xwiaztjxhdjo9fnx558ibz7eswzp0qj8nzb31bviqy5078xjrg49p2i7d7azda3u7rrxk50pcd0uqn4wgpu03qf39d382ve5xrbllzxprcxvegkkl4ttoabjdnt6kdexr8rzpnvy2ume5ncn5lj0tyb8f1nteqqpvf',
                fileSchema: 'gkgufk1lwwu2acwj4l32778q2hnzetkyv0yn4ti4l5ch9gvv1hrrxwjuzbyz0b0yt35dhfqfbsfldr5bqjqf4wd0njk7wn5fnyh54xtrado5ysvetaa6wkw7rcv630sonlc52d1128byri0vtgg4qpvcya5dgg28xskck3vctjbg5tsdj6l8hvn03xp7m4hhm38a8mduibkdalok3q10177kdpq42ih4xiy5fsxqdprxyf64ketb4bin5e6xcqxr7qmrfdo8t4ixtwbww5j22yk01m129eu7b8021fshrlqjc996ptfq9g2as5vlpv0ivfdvxw8orxpbugfyisfearf52nufe1fy9un8baaztoj02kgav6wvpvnniojsplen8dz5wrh6nsalnrsdfucne9945izcjoomvccfx3vi979a3hhi8pbm91wbu47p2z9ul9q3ug4bn538eks1e96yzh29zlket6jhu3vks9wfkdejw2bebjpzqq838tvwvo1f5i2txe7pyp0wlkwlkuradydo6wlek8kasu13390l172b7jf31acnidsjbzw2kkna73mzslt1z5qevg7l814i1oug0lrimvt9u9fmyqu2zlzpvoqrvudycdqi8ncshfwbx45u4celimqc56138wfrw82p4mhhpimcdrmmtucaqynhhgrc8w8mrjpcybwj81bt7to0lgqez8agtcdzoamyq55l416bcom1jlxje62mni732lylup7zgr70me0tvx53bgmgpz11zpgycmca1v95v39fnz5k4lq7bqa0j9q38ajwv8gw08n6au001vu91170usql7tcow2a7l1brnkc055n3fplrg3rqnmfdcnsjdwdg1mz9szcsodd999b5t5ykr5mckhnm2robn4lxt4614161iyyxp18okcegrme4wgpyofm4fp92sscfjwzq6o650f387cddcawt2am50xvj8avlxxcgdciwjpnxkuqu774cfraiver26aav1radb0y0',
                proxyHost: '3l3aooi1sl0kuo7xk1gssj8wvqbdppkmjrogksltst5p1sahlqmnx8gtqit6',
                proxyPort: 2022937572,
                destination: 'zlpvoierwysrfaw4mpvrslhqbb5mnewai8m3ccp77a46jv5u8pxzdmhelowb3tl1ipk4c68o4t94pao4o31oyl0bfaode39rnk7cx42wormr0klrnr0jqur4o5dkaix5kcgujyuoh7sezg4hj7b58hzobas3cxsr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'clwxnxz52p6bt83w295uvkjt94h2wrv5zwzxukquku7yvsegfdxzojkynhe8oeoiy0m8cnur9ld2kphs6vltyr2unu9t408jwtu70c51a0aly637z8eyrxvckf2f6b3w1a5xwtzn8ba50znuox8unczctz38okjo',
                responsibleUserAccountName: 'sgal90o2ryzfpr7ce6fg',
                lastChangeUserAccount: '850yadwlp5aisk29laty',
                lastChangedAt: '2020-07-28 22:54:08',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'hkd4fg273zfai8lacj519hpbqulptdluldgs1k3p',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'cspi5sbz38hoeby65cccjbel6x3zabeb9sfacootwm92h1t11o',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '9p5lo2oxuuk175kf295w',
                party: 'hagvx0s05zu71jirurfaun8poqbaw6bc8tgtfvtsaoqyy0x4wg6ko5igokrrczkfooeqd3mi174urj52tr10a4nga67oj2c9ag3umayo2cpo1sjnn0repiwif46pluebd3kdvzo91ef8za4x8mjhh9u8el335ynn',
                component: 'fvp25x0oxu532nshrsaiosjoc76m1mdh2m98ht0dflcw9xjeszn21lr8u9h3itk4dcsm4bih8irgss8hz6navf5o1aupvawdbwsufxzdc0hw8wyyt1kxi3zl1lxfdgewqvzlh20f7697beejvqf6f15mqqyvqwno',
                name: 'hp628b0aa5vq5pfhnj7kqa3okn3z6yiexrc3jbpy9y3jq4rd8xls06w5zlc5tdd7zckzy7ag4kpfd4vhk993vug1svq5rbkt3plbz9g9rrxg0sthx6tukyqdeev565ferw5cbe9e7vnxavh7jj53a16okh6dk7c6',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'cwsk0ez0rxz9h471gz0o78638lqj85jkt6rnm63yjhryd48lvbs7fy4kbmi6drjnfhwjq7a8s6ak9255ctlzs9u4bhjj4p80qfjp794u7azu6zmv26cpc58av5derny8vqvybmt1qf830x9b498ynwb4xlqalo2c',
                flowComponent: 'f6xtbf5flhwib2i3mz9zvhr1cldftbai47yelc9s7v86kpyykim7qpp4xunrb202is13imcygf8utz0fm1nllyrj42vro0bo4si13tgdhlctdf0w3ss1kqgzio903t70kdpum6bhvzmc1vvlhkthax9o72zggcj0',
                flowInterfaceName: 'nchhaaeu5ytbor5gadcdic2x8dvtk2alonyegyrtifo5y0e369f9bxwha3bdh7hpussex4wd8ahubb7z10paak47fu27vah4mljaz8ivyn06zxv6sp68ktxus1tgzlyhf2z78spefl8ago0q81qbhpdv75xd8a5y',
                flowInterfaceNamespace: 'isanqro3m39npa68a5zt59mf92a8z4hljky8f9rynmqu8vv0nz00uo8b1zp6297qje2bdmzj70ex0hiy10y9tctvyjr2m94atxgtcn1ol26snodnsqyylmu9oknkyzhcy1efbx6mwxuy63bglxfgz6s8m45c7g47',
                version: 'znk6p2vk4ruj8k1i5p8g',
                adapterType: 'mu6t3oxble3pm0jyht7lvcofmlcbalriwrvdedcfte3ti3at5e01504gsuoj',
                direction: 'SENDER',
                transportProtocol: 'xk1zkmizwz3qsh4orvz76gs7h1i99jz8f269uy0bwo2jjycvjcblosyngcio',
                messageProtocol: 'jh7bl1uvk2hzhluopvdeix5lt6cd0llofi3abmihhnkg7ctiz3f6ih3wbbr0h',
                adapterEngineName: 're34iav7rudk19oyz0zq513n0dpy8jpvs199qsxk4r8yg2933oqhsy8qlix0ktjb5n9325qsbfh3fymnysebufybyclt4t4lweb6my3bbg1ijqe5caw90tas4qmpby0hf5unwu8o7c1b06kn5o62ook4brrhk71j',
                url: '763ahn7x0kykg45dukcs1x1bfspy1kd7xpsyarwabmeeq78xxp4p9nf1vc0xyufujgqj5sbr1szaq0btph4ad4ym115fjnr6rcw5t29rrivzxasf6sghm2py7jeov0a2bimv74lutcjm76myytnpcru1zhfr28odmrobvzi0uj99id9oe17u2rtme6cuejwxwt72darllmvjpl2z7ut9jctsjcwiaowm4fdb2taj3vot2h03itvs3ue6ro3hzx2ztkx8m5mty26uyphugeb7je91cdlxdlta0b7kzks88ufac155iw6aa24jo5qwwvpa',
                username: '3bklv9tilhftzbozqo1rkw0y1icylq0x0s9d2lk4v562bmyiw4ahz3losbfc',
                remoteHost: '4h9fh0jpcwzzo66k6y4o6bn0gjcjxyzmb07ysqq4zha0rnjuzebuz6ela362rb4ntbop9pjbndeaguofemcu4w12gd8rr6ri1fl7cpk5xkgfps47sw682mdc77s9m0pvt6eotw6e1tepl7mhyi5wzgu3ndu7nv75',
                remotePort: 2139584194,
                directory: '3y08y05fy0d3vgaqt3lvlcu63rewgh1nqwu70uvmp6nde5vdhre9b7dbry2vgjo0ezcc57eaccepex8oqu7nzrx3qhuohtt99zn3dzctkb2sdyudmytu64by9pcq8fxyqm6hfozm3bu89hr6phg73r1z26u21c6lbtbk6l4qse2zek3destl04w4s1k480ebc14r5qnbhurw7dw56a70wm2xpkd9btdzvobalbs87qggmjuo99wmvwyvrcgz9g5rz218tidn1f6nr43osi0qlg5juvi111q4n63snba4h0n448z9h932jeezy3eavv1klvxk7p8kabpdkypn25hqs5mxf9x60f0x308maea97hj7d3n8bnyyzf5h6x1tt5vtzikke8mc4qvxvb5lxir349nwrovzhtgijie5rkuwuvp5f13z4kxcomwzk5i39fjdkxjoxw7pvc1wzjtk3e1ms5g1uwi63sio19mt07yzjz8r6yultty4cwp15wzmbqhtusy90lpw1q3z0op617kqrldspyrk6gi8vmy71ukhm5wwb1m981y5oow84vml0e8rhghbf3wvgmix6yqd4kpqt1vkrhin89vsaqq37xdhogjm5ynablpc242x6ixyy1g7g4img07re1d08hx9705uberf9y7yl7knvv3as1qv6bae8i9ljqpa02rcjb2pjriey7qd9l0xopqyomb99et9t28ne5kq4c7niit9n0qra2of0ttlcvclmbexiyizxhrfapcnws8ue7osp5z3moc9pos9hso6i8onnlz7net61wpoxhz4c58v6f3g3kg82bd61lx0oo4kmtoq40ygsyksktly544izlns27oex5tkn8t2ef90jwug0f2vqogo50jzy3gw7l3x8wnf7to9zy2vbi1pjz2idx2iuv3h64y5nehd1sqer555rjuo8ktgltp1znwyhc7aocbzb444ceoggi4qny5dm839du3lh5hckxhlmbv06c80r9pduhyuzr48',
                fileSchema: 'xlc1i1kjyjo6euv7nltvl2ylfsjpt6wx9f6xf6tuig42wtn97ggx05ey9jj3t8g9u3jtfaqm4jzoguzot1p2n1nlx9yef0lpwel4nffcr19kt62gb76m47f266txfoj3bveynmlkixwh6hs5pw8lyh7kcovfudzctdeqpjc9nabfec69ref6wp1c4f8mw6yn7h2i80lgojdt5fyq4qvdj1y5pa4hnnkxoiutynxttk08v5dsxum6d8w14qicuhx0n9cv8kmroyush9xellk9uysohet2j09wcmfancpv1y5u6whjd64h9y6fqdk93rs2o4hyhivboycdfltzipfpexmz943g1ew6gkn8tdvx7d7ip8mlfqahilejesla5tiji8nwn7w17uy3282i2rkev2i6ngng1saat8mfn5jhc5shdkhoy0sjxlncqwrrsf0dm8ajqitikxry47o1z5baa5hxf6do2as6pah7h342rz91ma9rfxgcror6fsi4mmue2a3ipdk5bp1uwgjdwt89sl05khkzw2ebfxjgnus3rtvhn27tf66953yciyfga0gdavrmtlt42r81t4hw3qpvhq7ixhi9j8oy4urlgqx1dp99lh4dyntcevduyb0jgy3he299zbip0b2yn4khku9oafba5oga3ikh28jlv75ru35ml7h49rl2ldnzq3ojhvuw9j2nzfx33lmukf139v08bxawrk4qkhd0oo8ygolzg1xfvbv8bck89rpva66wo0l20zcqyksj8wqfx68bmclso8bdrx6y8zvxbluahvks0jpgfdyaa9r8a2umh0cjvq01g96lopga8da9x1ft92j8homjh036otrzeebu54aq9q2vprka46r2clehmw0w0l8r7uymw2tdkh8ue4swkrpsoi1hcoynwogjboquwraz5qgni59ez8eckycuyo95c9ggba6y3qk3zhnlsgajk64py0ze4hz119lqx5ykvgv5nvxa4lqdekppxobbblj94kiq',
                proxyHost: 'hc0r2qdm6ibo10tjqszgcvo9hh3pgzjf4qmzoamzdpwkgusw3epegmii1mcs',
                proxyPort: 3537328228,
                destination: 'u5jbf5etppqtqqd6oowqqsclzzxadamx0lzjportzmxe0egjzsq8kozkidugw15l1ex5qw7amppkkhws0yeix3f8qcqvu4enfow5ugeo2wgmzzirxlg8fav1x0obunfpkljt4zjlfflko9oj94uez10gphprgr9t',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'grmc9roqn3tu6klc6sqc3at33qgxorc9clh55u26corwi7jbskqwofjb3bchi9ct4r4486dcm5o0k2012iloailbefprruizwcuj5gapuj4s28vgdl5g59j5wzlk4zriuxokee9jx5ke7pmi9kjpm17xjq3xn253',
                responsibleUserAccountName: 'nnzw2uebr81b5l0o23dg',
                lastChangeUserAccount: 'rnvovtrjiainqp5168wm',
                lastChangedAt: '2020-07-28 17:11:15',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'mt0saos3g7gf98yqeb6p1xqxoo25qr68bkzxbo2x',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'crrrgxjtsy4z3iowatm3ipu7xcmrc19ncojdsa1l28sh8uqy8r',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'yao46u8zf594hdbn5gdy',
                party: '5ctxpjb5odnmi90ohbnx6lougbuqzjwdsavkayxui67vxnt9jmjw4iqph6caexmfr6gkd2tm7354xc9udbuwndqggn2siwu3yew6n9e16sd0yuz9kdv3dkwcp0payzg8w7298wvcror3g9behq2wl1wm7c3dafyc',
                component: 'j7fvdpataeb8ahsu2baxutyw96a7emduqp3av2b2n1zg9wsr5zpm8d2jwker9en36u6mhb4p53c6b734j67g36lt44g9ou9z4op6g7zf3o9g0djvgwiwywanrbdleq5b7avs5g1aalmu8erm79gdhcxa20pw56ew',
                name: 'wf42mccxgzd2foxu6b7tmwwgfs9hlp56a4qoywe825zv7upxrc5c895g70eseb5qih5xcc1lwzq56pfqe4rz6etoh3vzfzuwr40yj0mnsratzcrnnkc0oh91g7yryao7pgiwlafqp5k6gbqcssuy2ch82tqc1u02',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'o8l1nnhu58wj26r9185l1r19vxt52iumgif7cg0nfqrssqe3lg0eowg3ypuyaowc1cr04pl2i91hgff7wg2bws3uqmjdoto2utsyrrbijm3sxi0k3ito8iaov6g8s4ikurtij16fbjlypk1pl5lcgq5rb86fndvu',
                flowComponent: 'nve8nnvp7kfn3er60h6h5gb12nd60xaaeh84qojfsf2v9f3wp914ibwjkgi9iq4zmmsyamk4exhtkijdyxfdik9exjvh9avma8dxfof6u6lz08h3wmtnnl7sav4blhr7ih9x25rtdc1jo4z87btddynh1d2z4t8b',
                flowInterfaceName: 'lxtrwv88xakn609z91ychyc4bzen5x8hndhfmbndkbwtim49vvn8oh5xohalrofbk1zo7qltim3ey6zwk55ih253z5bk7soyn6j3lymb35z07vc8lefw5fkarrxi4nvjlw7dcerw74d1j21hv0ks5s1wp7c3fhrb',
                flowInterfaceNamespace: '1sowobp4x4z9koq2gj3k4sh3knz07helo5i0s7027jq8y480476q1fdehbtz0l7fg4yu38gswgi101kjyqaggao4p7omuzt175m1jtylki1ks0ri6mruy8o5jrxc7ra8jyerk9y0r3o95jt83ffrkbspvfu5cqdh',
                version: 'm4gabowc3uqavlxdpzjv',
                adapterType: 'pm8gc5f3bqy2wgfcjp5dqb04vums5d9m75t697xkk81s41dq09gdqs7ffnsc',
                direction: 'RECEIVER',
                transportProtocol: 'h6c4ekay0yi2vrhi4j11zzo59szt2j3jkkivj2zwwomgfad7awmfv8pwsgc0',
                messageProtocol: 'aenrg8lpv8i21lzgjclhzailz1inhj0zapzedmw96w9r2i5ibmn1j3v34e1t',
                adapterEngineName: 'hqvxn8v2krd39r6ezu6mdb6kkbbkifkhbo6mq81zk3lllitw3tktsnkf16hju0dpxkfh921ij905qx7hv4ezl1nju7om3tm0wb2q3jn0rkfiae4ouh3y14lw4lstvedg4txp4qeoizcz5t8n66titvju7dvhxxch0',
                url: '8rkmeo2p8pxdgdjped9b82tmpoze1gh9fkryig7g13sh33jx3rtl332jskp8wsspoyrzw9huwwjc8jkgbtfdp92kzfs6m1lmp69jr9aexumq0uqw037xyaha80iiiia69203c2y83su8vs4onwzovxc8gstwc0h0s1ow58ustm9lov8nidhurccpayzv017d8qdxmvuddji1mlpktwf91c8cainu2682303iflfhdd23t0y5b3lj8r97zs0xl85la865d24osew55yeqrq1by29dpn4d1agt5yvy7couw4kax9w0rn1w8crnahoe4poo',
                username: '3d23hmg2ltd4uotqz3zy3cjphlkxl8gzqym2dkuzefxhen8ig09g533cpq13',
                remoteHost: '3oh4oyrja4w8kjd0dwgk9myrvzjfwjzo1ojp9bj0n3aqqo01idzplrsqry0waxrm7pdfpmgsd0zdo6gw737yhtt0j7etsgldl1527yvajwbx57e6xycyvulam60uctkw8frgjqrboq9jx66g033o6lg661p1d6mg',
                remotePort: 9328242434,
                directory: 'q9yfa0cmqxg9r9frglftd6huoxqojzrj7egcsjsfo0ef17qflow7r4qc54zy3gdqakzmyok11nwerurbpzanf1a11ws9onlaged8pliffoac8t5k20nv5h269fnx9xdp94qmuqa3b98o6e6nt7xcizfpos34zr7zgscjchcinm6rtox39h6kf57qfffxbrqvza8abu0i9vi6z7olftjex1mujt3tzh4f2azjl8n7tshx7v8kstz4phuwm2x4gzdo6x07bs1bgihvs2t207v6mwec954ejhke2ix1tyij5byasjtfdrvox2frq7jspig310rz45ka3lrirx3pn0r8bpi5891h2wno57i5gmgbfdx35v769plrfzdf4kxr81h93a6uwpq3lyqrjn6oyt4lcnialkw91sp2pib3ix7w8z0qlraq5iswf738znm7fqqqgwpkoxiyyn17xgsmqgerhdl1165uzpcjl899pm1g0rk9uka1fepfwj0fg2cr1g8sladsr4ir4navghevfxx29up2s48483ys9qtxqjq67lq5u85ln2zep6kua1bi1pns1ssmpqbwrfl3s2o94yo7jkhn7iy0bk975btlznsf2o9xmczpalikpq9imzxxnhrsc6gu9w4a23tmaywda9108dn88jbr930dpigmc6mhq6qdbzit0r8hdixx593i1xw88mnqqr27q5xisbsbdjdvqcre8cbrpcarq0bxo4zno2m8kfmna77qqeagc01jo0zp9l95pl8awejlo6gq57jrbzi9doyrl4xlq8neqb05z8o36vfdme8l5dvqfkwnaqh8ml7x1pp80lgc3ed9rdo813o2qy0bpzzw7qkk47fyi296awyfmorg8tzp8vbgqa9buusrvm9ja2y4xnsg44107pedcjn61u94wopuwlu8hqcr44cpkmdste88zabk38myujbcqo6eb40mk2dkwh2e6tzra34msa42amodhugxf4k0s6hrx41swvdv8v4ifa85',
                fileSchema: '65nhcyseyenw8oo4in8qixh5w2awmmnb50fpngyz4vi338a45cy2o2587l5nbzuj4flf2wolxon7hcfhrup08jvvkv2mbhugqh0ntj18iikrhi4wdbv81k807rejrngsn7hauufcijphqqj8kekk9fjuuyqfuh5arxnojn66xh2g3na04olqz7li20qfekoptei8jlh71t1lu5zppkf739lw2h7dmkh7aq55f3zzbexst0o68yzqcq31ttq0xc8cbts46xjrzq0fyoswfvcqqkxvfi2nn3j6oyz43qh3xdii3y3957g52v1oc7486ryb1zaq01jl4apb4rzquu9jefqsv1e2msxf4jl5hqozu1vfjxq5gqngt0jxzc5tuamdxqw3lh4729hvfdqeev5a7424vdxjmawn63sx5p8ftn9wwzmj42hq3h0v9ikte3pt3vtb2oyies4ae278w37m7vgf07bl4q858i4kgc7m9npy9ifm9u9imfzw7sih950n5b27zd6kf9o33papcw6gfwi93dtlz8x0ds55rx49pz6ssdldnrez1rxv6wjofqhejwsrfhg2ztqougcc4mzcm9tgqxhv3p4d1bn0bvbm5wsfjdqvbnnx2b8z2ei4xcql2ibg40zvaed74dbe97ubkkrdf12txd5dp5satfnd2uxxslmlzf4kd1lwzafokmmavy2px59i7flt6b1gx8p5vj4k4jbxv7rhk9pz0rfye03u7qk03gsj05c1h9kxywblmvfisp68qj1nh7tby9qc1h849e6ol059ufi136xu2glxhuj34924glr5ewrvlofmm807ut71pljn4uctxgs0ieg4t2n9cwne3461hxzpxifegdblknrf0qyvw1uckwcr2gcq487d7ixuljsawdg6r99gv6sxqkccmdh7uueq5tix249yps4ly85bp0jbsenjlggq5g818u5d9eoo8cp4tom2er4clhgc07paav2v4rul3pqoyg5c25nt3cyye94p',
                proxyHost: '94rq76un6o0rfdu8puihx63dg65ot705lbd839a7lgof5wcrqerk01l17f4a',
                proxyPort: 8480362111,
                destination: 'iamopeffknpqow73bh50z1zix0q7g6sriy9yqgv9fyzjanb1zd7n1t9cwwh87jiwtcbau9z6607ffnarddszcbl06om085ht2r0atkb56k446u7coh4r5d6cwmw3ymiazlghqbhb7q6804p7g2jw5mht77gwn742',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'plts7zl22f59dfw938gwmd21r0yk81n59tqbztg7cx56i58iwca1e0kzcjci3b5kxsgvf7lucovmglusk7pmnzrlj5f2cjvdn1eg0xdrkwvvjciakw0wnbpy9r6td2v3i2asl4van4yzoouczyumx89extckf7y3',
                responsibleUserAccountName: 'ian7ejt9qap0nwm77p9i',
                lastChangeUserAccount: 'ub0pwsmzgyai4bhbj5c0',
                lastChangedAt: '2020-07-29 06:32:29',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'g0jb1kxwc582d9qzshbu6xc57w0zukwgg0ynkqc2',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '1ikwipl7gq73sy1y1ohclyp0q0i8sq7sajb6yco2qu3burqhuw',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'gr0cpbmuxwtk0cn8rj3s',
                party: 'rf3rr6dhh9f273dr12upaiiv4ihvw98zlpity60u8vg033soxrytpzfe8uk2a8y5z3yco3g82y42y1ltwni6lz695f90zfprtz9zndu38wdt1op3r4vgy9z2vfmooktmozdravihra8lxi7npc0audftb6bi1zea',
                component: 'i68os1jsbs5gspdfgheeu2evdsilgawvuv57odk46gq1fnyms5ga28nxwdjcz6yxdwhdjq0ljxmh1u47jnsitqdjusbz2ucf686u76bif6gvx6bb0gl7g15xy3mo3mi5ibqmt4rj05496d9pob7fdx3htgocd6o9',
                name: 'bulacvcwqh09d3ffdw07ac212rukmxhy2y2uk1vqvrh28bd5fad9atqhdxh6cygdwixgofad8g3yzoliq2qgl9k9oxtd6srvxpqqbx4vnhrex5u66zxx8umbzuho7h8o6dzcmvm9otjksroe0m1tv5vodppoqnj0',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '83x875u8fxgo7ztmt065n071uuf877wmlub9od8ghlh383w1qr4m0runra9gfiuteis8519sojpvws8k4n5rxrvs32bw24ci6hovw1ofkr5tfhznm3bfpg1y1w4n742oimtt50ja56iljp1jr6hugqm0vt4ge3wt',
                flowComponent: 'v9e67jk9ent8xp7mq3o2onperdxxdt0v9gtucs8zi92q17aprfdplmn77km90hc2ovzxlcz7vw0o9wmx2l3vvke0ugte6vo4wti215srt7uiczniqpqjnsequbg8frsfuaa7049wl0xleyv390kc0fhwlcjq1edp',
                flowInterfaceName: 'lud793h8bc1eg2r2rv3aotfwwe3ga16epajy4cwq6t99uoghh5l37hqhrxivf6cefq1cuw1jgvmftdye6rarfe3ez6q2d3prgltjeuef8bpoif15yw5wpwy3wp85ew1m4ndn585ssg624i6zj5zx4308ctw6ycr8',
                flowInterfaceNamespace: 'hg55mx14jdpq4uc1mzzvncugwfdk3f5okrmn0ndktgagtpg0s839rdaz5qr8xawz58klh48uko48hau610s1wtcarq668ll35idfpvr4tthhxpdlfgrvjvul9hlvvo77ni6eu6ea3x11f2m9g7hbdeheb1474hge',
                version: '98oyxizankbrfc1fjvz4',
                adapterType: '763nxq5m7lrrmrub2x4m4nig2xb1t9k3z4nbwtj8y9dcn60ke9k6aphj27t8',
                direction: 'SENDER',
                transportProtocol: 'pgsfmmwpero9k6aa7d1xtxnqb4l4x1d9q1dd8qpv5opc4fpq6cdg03wl61rp',
                messageProtocol: 'f3axdxz1vgssl80ayzamz5ny3xpyzyhldmptlhk4r5pd5pq362om5eejvupc',
                adapterEngineName: 'm013blwan7o4rdmkqgzfspbpsg8p46kbiu4ogun4pe63ta4gkucqbl6a5r9nhak2601vco0yvludc3oi45tcn13yvclydlagmyxiiljqx7apbouhbpwf39te3fyowk053lj5v3t201x67qg9scm2icjlgn0u5rkj',
                url: '59xkxtxbibamr4xudoq4iyupqbn9lnjvzuq9oot3edjvvj2edij69zkpaxdqej0b5glux3upmb9ee6iglg834p4uj00uasfzeqc3a9ggyhrqbwa9bbqr6u29jc8r63z2pwoxsqojxbnt9n1t6n3re7nif9up8xbcukjhg7zqa0az9ij6iw6g0y88b0dm0x2gsns2tg8vh2g9v83nshdectgrrd9jmq7lm3vy8r9tdlp9cfx0pkd9l0gwcvxczpjctw7k7y0lgydjawzx1737qdrzv2nijxb0edtnqvbf5a9wk5h93zcxaa25ofteyi7fa',
                username: '9zm9ge7rz5fx5x6tdhznabwif0theic8cd4movm8jj47xxl070fgf90rz8rj',
                remoteHost: 'hyaqk7548xp1en0g0tboeakebvm8hfj5782p6f1gjylxikv8pxngzwhysqkarw7uwra8bi3d8w6hxl4gvh0yixw47puzyefk975d4jf9hll1s86uowvlwha4guuxvqt3t4jjtdo8zn3h8z13dvru4dgg74bc17ft',
                remotePort: 3396183771,
                directory: 'zmqqde2y9k14xhbkltfkfl0iljmvp4ad7t214fd2et7szw9hllpbhxsirdflj322xn5kn826yzx730u6z98myeym8dpmqruczsw5dukh3585doeq5nznin9hr3vcgvyzdf879u4p4seaaczgznwrs0qnu3v53f4dmc39nsf51kngy2gyh7u7q1j9o3dxwd3j6gt10jsd84k0a27pqi1y7xhajv2dv2e11khq08r2rktnlggb9bv129sxi1m85h0jo4iw9x81cpne9xcdd302xxdf5axqfk8mhhdpbek0h8vmi5optdtua9b81syo2ltn3g0yc51bgigdwn4ajakfe2ckvcjoro535szb7pam9uxuzw2eupax6rb4s4p38z6gcfw1xpyz6tbqu7xbg8d75ynchvcfsk0ll59bd1guc6g1she3x22eqxwov4hzd3qu2024kuv289m1h2h83p1govviow3bv22x7uagag589rjof4yp360ogz9vz8q72q5ltlwr3qoknrldipoiyeqcpdt92ehxzf6ye4ogiv1kuhg6nmtp3vli0k8jgp6q7vcwqwsy8d8e9ow4wo8k6xskb00trlphn0lq7wvrkokqmkjgxtqxu0vyv9l5y0u8fca5zzevtmex1k1dwmfn1cnf5it4qwh27gug1ebjazlvizgjp3b7crrgwzu3sx4t3c9p5hckjnv8f3l5fm4g8q8mw6yqxb5kzc6epvaefm47434t73clgokcfgy8g2gkxjz7xpfb380hlk52v58qqk26ewedmg9flxjslccfx9k8zgiam4jqn92qdi4sryh9nf6gc656i64nt3isdqpyweqz2mtjm6oxe5w3oqxexcmztea77x96tegobxkj9zc9me7ew8nna77urr0qfx68o0b1ngkarpgsie36xv2h4cxn6zsjxbbo1a0qd0x8watvo3pe18srtga1t97nr34k3cghu9k53u0qew29f4hsb1u0tn7doqot9vv7aihtbjgs3iy1',
                fileSchema: 'cgobvutni789vq21xg5pw67ieiiuv4vnwroreiac8wjpig33224u41tmxm5c4d5mtq1qght8tudkv1w8hztuvgxcv1o3j4l9b8o6jootktjda5gf5xhec94yysx4jeug6wf6r93v40bpxen5rpy3p9zvl817674enm6iqth7gnkyjybi4z89olchm9trqahnw1z4qx1yenv1opvaustipu38ay3ng25f4h5lf28xv9jtuer6jtoo2sqhj1t5gell4ee95yywv5ogz1a7rz7n1i91gfqu5tcytkf7qqxbz1jysulrqwjkv6glsm8ah5icucb2cr4566wisdtmnco9hm6p08sswgk6mxdncr85umd9hy2jv32z2yaiwq7hy9rp5b7h327kn3tzyzrq7bk4uoduqpo1zjmyf53b3njzyi28fxzgpwpblhs8o3sk5d19suwgg2z07ll0ujqdaza5qyz75cn226038hbxli164356zexs3o8p4th3l6ujpe0ri1j89l9pl4qyu14hgc5myy7khxelhsr12oq07rbqh1x9mfaz981ldtjr2hlwp3tzsuos1i5p7fuutzfowmjxr5ofl5gl3jjujaupb377snvawwfreb0m96b906pa9oj5kl44e2phfbld05ielc44ec859knpjeqleve01drf2qxlovfdirhwyeei8p14i8wm9piflr0lo1q88vyttypoxw9bjseay0ci9t46ynjoajbkxou708t04o67khmpppcze11b5q157jj2rz6335yttvo2g6l40gm40dweoyt27v7pl94s8eik9ncmbpcqq3u394h07mh5nwqy3roksqb5qfim46mt9i9xnhtm43uciextxy7r1rjlzojzrke738vn7j7xk20a8oxvbftro2rmb1uaegos207p8qi6onnu6z5j1c43zgvgxxpoiptvmli8gax50t4w4f13v3o4f9cmx3hbdnjb1uil0h2fjrsbrpbizqpt5fa2rknefjuigkma',
                proxyHost: 'q7xyj1dabqarudgw9ogqt6gnmnbhi2tdukd8v5qj3t1liws30i11dtckybbv',
                proxyPort: 2068774483,
                destination: 'eakymjc140vfxmv5rxn9mjxb49ubv5nk3d324j8gar4rgq05j326o0jgbv54cft66kdk3l2dotmqr6ondvhk6t4hjx74mgsh4sks2vci8epor9t6ktt6skpcqccfqektclg6facrox94rmue92lymp0z3eolllrf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'fttxtjuci09zr2verzes7nt99iqv225r8c5cjd8zajy6tprounhinf6yd31k9ru9eemn8a06mlrcel7at5ukj7w40ijbju4rdgr56jlg58egonb9h98vt4ld6xoqkzsqt41o5plidtv8kdce66z3jzlvn34mzawk',
                responsibleUserAccountName: '2yl77u2zivr0qyldyvw8',
                lastChangeUserAccount: 'eivtmgv7h80gn7dqvpab',
                lastChangedAt: '2020-07-29 08:10:17',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'qh0ju1t760yek149zasvd09uxa2hh3gn5ryc17tw',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'g9yf75xx97cbv08wld9nfmayc61j8dpcp6fxe5rw3ae1qctphw',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'big0sw4ak0fq9jpruv0q',
                party: 'p1vuyza42h0yr3juq1oyk0tjq9m3jqvq7yua32vitvc8wbvp5t1zqtyg3n2c7sftpcvfoz7mpbq88rkky392bkcxejrx6h8jfh0b3i6rvylzt2bmg8s7o3ebvp3da4gb6zw3pc5d1w6aeue1rhognvzzvdmbwxxt',
                component: 'wc1e8wbor1v8rpfntn0p8kod1710h8f3bv7n61zourqf1wrquobnqb6tt2j0o25w06i4o9z1qudlh0olljfqf8igdojen3ldr74hzpt90ii73in3bhh9lc6q55c3pmyvjgiqh7c8n388wcdvzzqvrgazfmesm3d7',
                name: 'am4imvi1n7tu43xgogyluirxxvqi542jjecoiok4wjym22efd4t6dunajartrx90w6mnrb89y6oj87wvdsojdz4ofaqd8hz3m0rmxs8qi3nezmdv95lpulyp1eojhyxsjcngdtsmwut7yaenbzbo3scds98xvxkp',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'rdk0gfxpja4j14z7i89ebdbcojd5rzavd9bid5mfoskdmz6fjizve7n3kz755uw8jrzwuqk8gusrt5302g16i4votham7kxdqknxzve3is095n2vmhne4i2iltg01dki8fyuxnrpbik88pf15hmyddhvq3c1h0cn',
                flowComponent: 'kitnlezlpztm519vefdpdxehf6eu2r972xzdq4abukuktm2aax0het064c68tbgqpd7q5nduhguuh81vm7t0mm8skpmrm2wjw8dt90o6vx9q7g81x18lwqxwz8i5qxjle9aok4ghqy5j8y6iohdjbg013ur7xo2p',
                flowInterfaceName: '5qb1tp4myq3lui3dkwjqii0fa6ycnar5v3db2llkchj2a5byhfilqo438hxi2p2bgwqvxdis1jzn5dkpx9vhdo6uz3ubj1kuytyjs289nirird0csrshfta7g9yssrz0l98djo0ci13muk2phmme76ncn037p1cf',
                flowInterfaceNamespace: 'sw54lmrw57fjdy7ihtonwlak4j1vh6wapl1iwh3a6x1cmdp314cqixoukmhg0uyt4xjy4tutem3ca4gj6dmo0ul2sdoqt5ccmixew9z4jc99jcuj7pthx476qbvq6akdgnn8wumfwx4ien1qpf2se2e56bi1wov9',
                version: 'eu0xhex5z2vuf11xjimr',
                adapterType: 'mi8luz9pi3az3kh6yh2fimhilpqmbg4v3up7utrz16mh09v6wp3rsd7baw4f',
                direction: 'SENDER',
                transportProtocol: 'y9uxyomqiff716ahjjyiqn20ogifm72uk0v729d50s4gq666bpemf0ecz1qm',
                messageProtocol: 'xoi5xjrzjoznr80f7z807ygbhrncqxljjj0d27wvau7oqj97tdwm40h1chhm',
                adapterEngineName: 'tm373i0eg8mufguhpg2y4739g3vv0dz5mltnkv3lbmbb07peuux951imhye8ti7rl1esl66c5mr74oiecsl3v3vy0532gimib8sqjz0l0up8dg4qjjiojf5qa8s9b9dwto3pt7ew74cirylwvyroohncxa1djni0',
                url: 's9mv0agozckhsopau6y0sh4b8pv9xo4n3ubaivskog3z0n9p87apbrpwg8y4auddxbcxby7gsmde4hhk2xmp8vid58rlbi5xpi81jdpsxpns6vhc8keqddfiar7ze8f1s0k0isbkep8w6uo8o8hxvq7hhdk9o5xi4hikm706adw58vimb8hdlyqffwxmkmzn55i585k6i0wl0ryoa5qsn69xll73isk4drp3hhenp7wtgk0r4xnl0qcvhr1lljmvwoi1pbnp2batbgyl4fy6847y4lir07pi4yvgcri9znikdpi90gcfb3pso9u25lph',
                username: 'vsqqxt4ld8lh866uytjakwdyf7afa7id9r3tnrl8u7h72of395vn5qbu40n0u',
                remoteHost: '06solplgdi4i9dbuwpjnt1ax8i35lg09kvlbrj6kmbpwj520xftns0ty80az64fzlryw6fmabagnx2xtt26xu7or4ciseexesfwm6ldk8v3as7cdnktrgbm1r2zwwi16tvdtbz5gnd87bcxupdwu2wjuynhnt5i3',
                remotePort: 7962279122,
                directory: '7n7c1b9pernhst0qfujbak57w9rha94aoc5wb5h5iremyxkcbv1lgs2lqu9707k3c0a71qampbz72rntmsrqpitymens7flxw2crzv66qfd0nxavssmjdyr4ry7jk0w683l0s6a03y2mfsb2wvihhw1zyv6vkhjcr5rbehtgtl14q8mw9stf740ndqmg3phmgl4b1jrinuxc9l56t57p5uacf59g7fxesvk1uuk48zhshuy75g2nuu3v31nwj5yfq353klqm0e8rrxhktnv0jr310vggf1fhw7l24p8ipnaezwnc16omqj1lysjebz575wysircjk5epkv4s8hjtcd2zgtmhgu5oilw302109j53pywzjo2bvvaz96012gzabmt35cv4ubnbzsf7gdtvfkkl99ci344togvhy3e3ukbtvc3kmwo4dj5s203x2qoqxtcmjutfsb50ov3bmgl2qubo87c6il7jed6ymewtpwmi911z5jnkml1ly776z3b1huezon4yqki2traijv82ulb4l95miu14fwl6gbfaw52b41gcq5wv2j9pzdiqsgyqqqybq1pz0tk6zankflrgsbiyqrgda1q9t1oec5ut0hmi75hnyhrru8kps6m7xdug6x8qbyenykuy3a2adfqt0qsvbhk02mjn1c9u2uboukrotpdbjfekjazlcko91j6jz4uinc9flzvxb33ns80wgnmndthste1llvm30ay9riars7i63o46ox1zvkx4rllmxhi1md3r8iioy0mcx4tfn5333kb3e64rblr44z1i6p44w60gj88l8kmcmj1bj2zbp4mkfel57autyf9rid224qdvm3333xlz1bv97u3kilhsy09w42enffdb5urde006pdauhc05okpol01bz8dz1oocnlvqlmm48k1jorbrx7u4frb68bk9cnh8j5lkjrj1gokr4n7u657puub0xwm89rw3q35oj2srx4dx51v45jyyg9lekl72ph7ydboqox5j',
                fileSchema: 'm9x1z0v2jf48ld9e92sw1uqg851ktfz4lawy626z8we2t76jlz0bq26rx9eme4na0h8jz56fywxm2obfa8qhpbr6m2li9er96lqnskylei3kp34pgfl5cqrk9h84767jbai3uci9i8fu4qn3dwwdslmxo9a43n7kqgbafubdftl6qc4wu7m3p07uurfx6gq3hsw8awh4i49ugiscn0spu1hj2b3s5wz8wmg11xra2dwc7bc7npzduvoyog9n2f4gxm7co9x8v0pbyqmlx4du8dsfv26lclsuofph7z3nru2sfrphmt5iugth088kptwc3f36mlh4mqkc8084vsmh2gzpbxshwv920agxpwext251rx88s1w0o86mq9dihmcs16yrmjgasybqxx2ukc7oaqiewa6zdz7mkan5mbp3d6dlxtvn160y2z32dvhnwozu8g5br5cyr8i940arx5q6h12hosoxrkij69vz01b8g6idgyttpjd6rnoptuz6sch2ycj7m9hwjhyriw735136yz5454rb4t82kdj1j21u7xof7ycqwh4rb9u0sogjtssg7o12ya83fsdjcs1r2rv5j6it9uzwnnikibk50uir7fb1xhcxy5my30087iev2n5e006ime8ahjiz4axbdivhrr6e6bs0ejeki22p1rs5mgqjyall8rrp59rgtobqqbi2bxgx0zvqozfu9m4hfj1itk17znunqhtv0nq71ga7suuh421bld7zojlhjuiwisgoxzi1sqm8h8oomfpzadfqvjf36ih7oyvx6gnhtifkpyxwic1eaqa6xym20awtsi84rvos4sf35ujm049e3g1x46jwfxbu36igf0two9lvbq6v3c6knfd1mjngd7udhpmgs8jw8xsto987vl8gut3dgi55kx8b8lpps2644xlwz6a7y57znhthr2zl3zgjf3k62q7pxdlxc2chf8penqjtf48pzutppu7pf5q3lcfsz1rt18de67xrq9wy0o7lcc9z',
                proxyHost: 'ue45xwrujo9gb17hoq6khvk8nsk2hu6x2ift3lgeisv4v29p6u44vc6qi5t2',
                proxyPort: 6036711643,
                destination: 'l0ehrmpcd2zn5zhm3l0cxqrmntgxdqyih8glbpzc9myzsiq7lsw8ys39d4k6hpm206nx2y14ynhh956enyxejcz2vygckqt2bchydj2ji90eq18t1htk62kb32gvtjvdqm2r0v7usxq9ec9tw57zr91uyoc6br0d',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'o2piwd7rxabtwbt188sph9dlbkuvz8oauh530pnkhj7r5sqewnxzubtjkxl6kwy623fdmg7md0n6ntjr66mua5ig9v6w42jofmslimhk9pg0vcoqd9uz4es2l40gyugimoqybxaoqd1pqpngxh7w6uuqs91i2ek2',
                responsibleUserAccountName: 'vrmxst7bkacj56cn8j4y',
                lastChangeUserAccount: 'm0iqiz6nd945wga1pxjs',
                lastChangedAt: '2020-07-29 11:53:16',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'gueovgvvnwn8v91zqgmk5qp43kncizwk4n3ela9g',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'fa9qx4g2obxfpmftub18fu7bfyu5g4e6znebpvtk4aax9aijba',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'qq82gxmtkemy2652vwdr',
                party: 'fi1wqrw2lzik1se1cjx05n9g9wnm9j9vzzz5u982cw1fe9eqxjrrhz3dngd9hxl5tfwdxgvee81hjl02063ga15suitozeh3uad4ijth8syui2312vpahmhlvy3siw6bc8r7nmjinmt8e8zg8ultgs6eeqyllj4w',
                component: 'uazt6fheuvrbpsw33en8xiwny7q7vctzamx7dyokj7fathdtjg8kr91n1jrdzofnbo5wwal0qsii7mdyw5pg0jbm69nyurj9oo90ld2wn9o4r26vs6h6grn7we8vyegksozv1xjql1grhsuu3u8fez2m0kq2s6rx',
                name: 'cab462ayf6ogafr0htul1l8yknj2u7ocbka6z7w1wwx1cfwb9zx9ig749i490iytwr8p0toa0nqd0q0m22wfy8f14dq4v002vdrq2ewz8i0nznaiq6yyrfin8bza6b55uj7fb7y4tmea2b0rez0vqd8w6mnyc49n',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '8q0wqfrr6x85pqohplk0jf7rwi7lnfw54xq1z1mmf3z3anw1vhcmp0teh6rvsgphtxvgmwmzjw6wgbr2orvgubij0fbz0uyeypncyo83srchasfcyw9z5tlp852fy6egtvhler1irm3w49mmt5g19s690duq0jqz',
                flowComponent: '2axn4i2qfq1gyr9rgg95azb7219i00n1qkb4h97gqj2e0nc1zz3wskbrwda007il3yjtq3b1o4w851lh66jd4g925mqgrycf19ck1rt5ebyxpeq0zyt24mm2c3fpg8vttebc3p4baiiyno93397uvo0d87tw5ep7',
                flowInterfaceName: 'ptuplm8gie0r6g6pl8sgppzmjkun785otxk6v9d9tvbot72cuqgfpjr2p24d6jumrmmlbmc4qj1j6x9z65xjcgwgb1iy6vpwbi2971xxuvxq145c6zcldykw9hso8bmc5skgp0ccoku5h7kw932e0rkldie6gxrk',
                flowInterfaceNamespace: 'tuaafg3ly6ube9sjvjc3ssrv7tknvuk5pjoqmkzh42ucxcynfvrcrjfdl0j6gkzt1dd2cvt553est0oiqrqmoe331hx9dfwikn3k4y489toe61tat85h710zddg4yeqnbukt09qahrbucnwmnnxzczqmtkggvhup',
                version: 'npvimdit5ew6vxyh7lri',
                adapterType: 'hgd287cdbsxupzr53lpschbhmzgsrb58t9nkl711zb8p6mluduxi4tg9jgaa',
                direction: 'RECEIVER',
                transportProtocol: 'fox1sc4oiplozacnkagdn6rhzes7jenejbvzo45fqoaxf1yvkoesrj8lyewn',
                messageProtocol: 'sbjl4dsq6lj1oqs82tbqe4ypeysgvc37a15wctwhphw1qk4vo5xi93ch57bj',
                adapterEngineName: 'e4srzvwyu29n5dxm4zzzh8rrdjmsr1jey5ovoyjbc56h57564ugyc6tq9gb3ls11hh9wgt167dp14dq3k3t6xrs5h8demw6dko2j0nlfye9mes91p6l6iy7g352acbai9666m62h6zprwu3rrnuzsgem8eckfjam',
                url: 'i6meyang68ydexbcgo8cpeui6cb6gvhlt7cyiejyfex87uhrcv7bva1p58hpzij9z31mv5mtkxg0dxupnktxrip00iax246bp8r1a254uin93mfel5rvqd88nv9t36w6neb3v7lm8msaggyls9lrmgnjbe54kqyl3lfnmtwa7okmwlirzdfm8wk58len7iw19vptojyx1xz47e3whurumhiz24ghd9iyayy5ys251xe9iv3mi6fbdmxs94prmxsv3p735ua14qam4wqa6iqhc0dxynfryks147l4ep1tzbx73lhrevd9kdspmyogukud',
                username: 'n73mvibou5nsk1spqr92nmoq5hubxcm3odyk6pj6dchy3y9w9mn26wz9zt5u',
                remoteHost: '50x31j0clpoa8ow88g7e39z8tdw4jzqok0egwqbpleaz9n9qa1nghpxgq6l0luy4rwoa50y6wsjzt4oao2gl572gnawwdlcpgunhzkymq27wrfm7kxycfxntt51t4v7ukih89pqim60vjafbox7jwmleruvkam9x5',
                remotePort: 3556985710,
                directory: 'r02qx2s192t57hc51ux2xa2jxlz2yp8ocd0omy6y7pofv6rkyixd95p958ly7dqf0m4wmweq36gfyws5x2df7e4lemse7nqac064oa4gdgfk8ydsqj4eskzu05pqprdjezk1ca388twismr8lfdjz260dem95cvjsboz8kwsak4xn6llquzwcay5fhqdy3n1nghrxb96acj65zcyg7yyh0eobwkpxvv2q0329041f4nfy5itdo97v2ex2zq32613hq6sowsegv70n8jeild2jf1ro7v3k0avszrx9hexj3zz4y0vpgrnarofgj19q1j0wftcgqxrrs48ykaec07ne032g93jk5luwpkrtg9ypnao3wqanq9j7yp6imydb6pqmn9nmrnovb0tft6ljo4xxgopmyzxilo2gh2iapeyd0zoc21o65z0o39l1rm5r67qr8z9uta6ed4t0f7i7w11pmd19fh6xk9kx33njz96kimkn42nt213txpx6fywmx695dk8b4kxs9ihcf4y2nnsye4xqwp6998tmcax01hpfpmngw0y0xmotwxp140yyjhdri3mchcui3b9k5eykjloef1do1bsyqmrdat9jt4wbb9v0eybo4wpketljp2daffmwau0bsh5o99bnag19v1x6w7h41hl5qabdgptthgc6f2nw33rqjwf7upo4xmszg8a3dk9em8vzoz44uijue71z643edbr6unk8q5bjmyhdx3mqw59v0mf6yfm3w7d40vxyvwvgj7ae6jpm4w9vlhir01nypvamj0otlttakx7az2gcg97fkgs6c1x3yv33psb6halkcf1ilvtd3f4a6r38hb2d2pwv9nm0uec2bw59swicukc167h8y3ws8pcntyhwykzyhz44wsnkbqsks972nsullurh1q0dfkw4hbvi7poys6p9fgs0h69ajmxqh6elwyqxyvp4zaouxvtz94dydpihwcx2fhc9l1s1u2qnzstqu700riz54hvkw50wd34',
                fileSchema: 'jo9rxy52b3szkma3srs1p36c54e7bky96rxgeafqjlha8a7x5ops6zj7r9zej05aimxtvs247udm4xqus22zj0wcybef6gyras4h8cyeafw5t68lukfzptv4zzxlfj808dwm6egx4ku2r3ni7x1xxezg1oir2ua4q9nzyruov62f16p4zinilsn7gq2z9crjt5kthfkiv7gcb2sxlvzts7v35bedyfmhqkhmm3mysezk95hvpl66jkk4p5ye2bbeustvxjfqfmges9lyzxaprp76q9e5qonigg030ph1gfwr30jqvwoc6a3lzfif7wtia6oxnx7tz6ueqct14iav22ag4cl2hr1qecojl6xa6rl05kzb2aqmykmzx5qty8ttu20gldoo49qow5eny260psoho5aq92r9zodzgu8cm2ncq8ian7ofgogp2s6k11de7vqf1vqw2mt39jyfatz4rpvehmt545h7wxor1deudzgul7nnbug4447sjrntjj5ifcicyvk0ofwlxldom5zwosry4h8i606aah7c7wssfgvk97ve0t1d8fs01d4q37e5lwgchfiny5g5xb6kmodb7i4394202l28nn1wcoqb5vkq6bgyd0q2yqts0s6vfosiqa4ybftru0nhglpsfefs47ux9jj4bt1l24bd8ny6dkkh7j4slemdqa9xzg9xjxntwumkrhrq3lto6fk8n4hrlglv9l6pgcp4lnqe12tovav5oyow0qyeccbsfwig1vxnsiez3qycorx1a9mtwlccm0mkzuycltu3uzf196u7qi25p893bz8zc0hrqnvu82cnvk39xdy90c4btq0ip4n0prklybkols1hvmk0dwcg8b3jg3nblxlf3wi3d1oy8n7uetp6dqa0wf6ax0ke8hdxptb7x89wuyrpttr3s13zpfn3eufoz6s72v6ee66lflzy7j1siwtjfc2a76r5uvqi7e2u41yls27h09ho3cary881jwi13vbj4jqy164odfpq',
                proxyHost: 'ub7zmazov0i4dmva85jp3vm8dryfzy4m7oup9r6ftg0qo7aieqrynq8pbkvx',
                proxyPort: 7649697046,
                destination: 'z1knulerocib6kd3herx90j43ln2l4esfvywah34qvsqnl98ipkpt03cc9nv91y592jwck5161rx80hn32qf7ar3x5xg2019khkcp4jgima01v6pvg6jo5p0tj21s80b16o8ojpdw2rwsx9zzje690sty5z8mldn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4v5s2seo3w19zmibpzvr3jtqrj2w4pj9vzeqht7cjdrjotz7c2d03fpfm7wu2sg0xo3eames6el4azlu7hylyxtblyisimo1dlsl93z8219o5yfejtnhaln3rw7ijvrtxkzq1a7ebdnrv4s7veruyk5e9682riyr',
                responsibleUserAccountName: '16ebk6lmxg9zsj8icuw1',
                lastChangeUserAccount: '6jkn2ag9env483mprc6y',
                lastChangedAt: '2020-07-29 15:20:35',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '772fil67vzbz1hsl9a3zryx37yyk4yqryshdf0cy',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'zk7tqnto2xb3x1sssyb1wcbvy2gefkros1sq4x3rzyyr0xcaqz',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '1fx9jf2kzyhgqy5hqqkb',
                party: 'pd5q0522yoju69isw7q2cpmp4vnmjg9yke2skq973loqtd5ilzd8ew3ua75hdxfvj2kek1gw2csipp2grvug0wasv9cpw5xarigex6nru5nn51f660nvwgx5555vrmi9yrg1vnhtr178kxhohwjgea5w96lx595x',
                component: '01e3b5t3yaswm8jntser9c309omtg0habjxo052o7rw3vv5f2u6u9fdsljpj4a5g06dnr5fo5t0ixxy5c748nwvsj7m6td6xfzpdjhm0tslvu9h89b99cqg09s1lyaakn7vf5oezv4dkj4vfziy9g0atwk59jzvx',
                name: 'iq5jzdbdsktfe5mz9shi4cljs493w8q92ilvvywycxkh6mryorzy1iovvwiv8vkl3uynovxylk9gb6brxefjlxumcqukki0xdrbl2yk4lzfjd64t5tzv5uc5da28iq241kikr9pra3beu8si0q3itmatasrvwslu',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'j8wxroat1dv1sc1snwt4944tpoe5z72wqma0n1vjhmj5twkly0469mepr2uxvefrx44zo6w1k482ik8kzuafjw5wgcn9wf27r832xuc65bvch97dx6ifpd4c41iafjzniv5hrh47yxm5uc6ngcgx67o7ybf4oqb4',
                flowComponent: 'i3t0ua8b38ydjq0pjeffi76gpkldy00ue6b83rxknz9q9gh1ztwv78ttskhcp23ow733pogs4kpox6vcv0ts610bury8fi8pm6tqw3ipw4913eff058x55yhshqvfbb72ymolo12kvemd1k8qo2ftipj2gijc61v',
                flowInterfaceName: 'ygr0ug9ll1bhphkqjmzl83rpkih34tp0v29rhilaxaptrk5evoqc0yxj0sswq699pdex4kifxrw0ad8jvyo0pcp48vfr0ulxe2ufrcj2uze8qeqo5osgvbbam0pd8i0kfieeowedyfi4ps5mxf9euhtirp68wdba',
                flowInterfaceNamespace: '9yap07jdhhz8v3ay3lhit4vnlxljjcqazeeg7v7ape7lpuykjs1ouvsk682vjfaotzdjc7c7z6twd2y67hq6wayq77jty4xmogx3sxhmw2dk5rghbvhcjkzieapjpkfudd3c4qq6gb1ubwnaj26z7clfubz949a8',
                version: 'tjidgtqwytzzcc3fszyz',
                adapterType: 'nd3mz0qsdjy891x9yptovqmgbh59nloc3jloftvjbj4t1vykdokmv4ld0nq8',
                direction: 'RECEIVER',
                transportProtocol: '4hrfo0l10svxzbik0ppofhfsc1furnp725lyrv68bqdtpqmqa4tuxhxcpo0p',
                messageProtocol: '8syjxftz2p0glm3svlj6ghute4ao0slhkg7h65lrjap1cq20323i0eepeh94',
                adapterEngineName: 'lykwjgkmsade8wezlf26j485gd0ayg2oqx0wt3bo31mq6xyxrg1ogz6kotttexv4uhjrxanjj5v6747mxhzp2457m33dztpyv0wo2khcc3ca4n7xiz9bpe3h192ghmn5u8n9ogqkfsx63z619axhrw5sdyugcspc',
                url: 'ekrdaxd8pq8rgenderusic548iu1ecfxqudt4mrifup12dee7to7txorkwnt1i6uy6sh6ej9ndtfert2xyacxetjqo3s0m6348gm7b9122vimxwghzlr6fus32j57wvo3k77v4x4tg0a8b5e3vkt1bijogjq77jtx0gog091d8e46rde5q7i1c5nmkdfxy546nq3wmzr5i77vav3fuvl64tve4e2r5cm7mzruihcy5nqbqt9y5zufqyuk17911jerox4bwjg3utfmzsrtusjgblu8jrq33h9vcmcge653mp8sp4ipejefdvtj9h6dfz3',
                username: 'txq4h0f06r7xmxoyhcme8e8vzc2wtjtkjtyl26aad6cmkncg0jbjb3k5t4cs',
                remoteHost: '3k37npreuttx0hqwns5kg880ure0bllm9lh4ic6ouq7bxv9y35smruyeyc65ef386fasdj0rxqw84prqce99n6a7n7d3nnnvy3hck9a54x2bd92r3wlubkijar0pd4qtybmard95vhxq8xp0rbntlcgva4arxni1',
                remotePort: 88222114139,
                directory: '782nl7ar8j9qf0e9j81dwnb99ztzlb14uupvp5e6rt8f6be0xfl0ta97c8jfpxscfq44hvr10liwuag8cu2privp9qfze4ldq48bh8d2jyvi727rrs0ptv9fcoxkzl4ebpt5tiyzi5tdftaxpnwx2iungin5pibe0oxlj5bzkeyfrr0xjepvnlh65cdj7ad92ql7lo2r8wa7ty9i2d93k2tj0pae41hqrntf9xchosn9c4wtlm52zzgw8948q2o76smyiyqx1uax3xi9skab2yy5litc15hbhlzzn6erprndmu4ipqyemoa4dm0l5ja51ic4dzxrgo78tlibb5u29kbc12it2croir68sc1fljuxk78zspcz0lyapsyhbwf7meutkpashf0hmygbp92plea0mltz5g23av0wyra0ynh8n99j0jwpqm6p6k9fgv0h44hevc6kw0gjzw9gqgn73fuayhlmq487g961x68rw82w6qexn8zogkh4dzkfyd66ib5sptsvuibqdaro1o38wck3rlcisnwgpn01pcbttrq0wk5abmdtsiborpie5mzbj044i1csoa7kbzj2ldsn95pdcs6r8bv7n9zccydclogiuhtxlhp158jtxuweedpgexlxklwyeb75kplajrj0q750a47ffwno0t62mg5vxsh4pvmy8786kufl9a9chd0dawft33ecvxbkca7ounw00oc0spapsmttuxwppqkut3szmw2vi6s0hgzh36vjfot4citqpq9balcfulxr3anee337432fzysge81vfqyprpcb10oqrafocj0vcmpgoo49oiqct2l13vnkx3i26ohtq9ejaq2kg5efmuatillco4odszisa78g5sad2sftkh1y2r8s5fxvtckwdhctiyyy10pw1sscsb6z9aw6qrw1wptqao1n2njl7d5h7so3cwjyon7jkohkm625hkeubgrv2qwl1d13syu0uvt76j6oztq46h4gcdwq5hs9ch0d9viw',
                fileSchema: 't7qbtas0ch8ncy1j9anlg2u4lm0h4uf4w02t8lo9wqrtspeq080lzx17tlk95rdpge1bc25lpc0t9hd4xrydpv7r3n3vprobtd52i02lovjyet89s8biid61hrt07m1b0o8ihlnxxy949m8k1nt885983rncav2m1hbhesgq26fazfepfncdeq4gvia2hq2mjcn4yjt2una056q28dnjtv60ecclcf7nuuz1c23kitfq7osdiypoa1hupm53dz1f2xfrlglrtgsowmijondsrufi4mdgwec4onk9mh36g8r2f88z6sdyytjzb1y1pyyxrjmdar4hlmamqy38pxyg1ctw4hafjwhlat1zfvutltwsao294vsadqb3pa25fgy60vxhlr43iwwu3qtdnreyuhgni2pkzolwz83lm2878bjdlwtkyn2m86ti404ag15gsopwncqo9m97tojw0hsxf114ver38giz5q9w3ucffcangxvt5moy8p79a4w6z9s1yqoccxqfhhbq6s9ar4laqvgo09zholwce49ca2gkaap5828eqbka7kudhzhlg57yo1dwdw8igs7v6fddypsu6ie9556pxa64uj6qrt52hwoewehyircc769ctxd6g96yh7syagxjzycou3l77oaxg4ehwb6ieu44y867tepckrhciu1wa5z1hutmww8i5ukpob4rj932spmuslkryd3kgn1g8mj2r0hlib692i5ts6emp2f5mh189dbyw3zxpt2dg23ih7bufsqx97mm5waf8j6bmij730bvufq8p8i46nd6lbdhdokxgmzwsuh78gzyuzil7ubibbie4mkfcrxhpz354wwo5pbp4r3rspj0f5rhql99mbs5yp0pqafcr1tahmopua3ou9e2760alqexxjmi34kufzi3tp5necr3rumbm090t1vig6z3ohf3nsu9hg4k156zpw1wpwu8peym1d7o13cnqnohzz0pnz6u0bjxhse587aiw9uk57eg5d9w',
                proxyHost: 'mooii1e8mxc3o53burxebkbs86ruohxl3mdt8s8eq26lfawcp5xswx3qyjwh',
                proxyPort: 5990544043,
                destination: '28zh6irsaxt7b3nkvdu5bl3v5rpk2uyj9zyubjln9v399xwsaj02pd8pipl0v9ne3tyau9sa1aeku1b3w2ftten4l21qdkenjmnw2ismhk7lxjokv3hv0a832osy35miseeh6w5dao2nax9sw4fq4rdfbdck6rky',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'u6u8od7xdp3ej8ow8rpbxgdoy45md6my2fxwzui44og3qz6rpf0cg7jll63noivqwt61ak7ckfbybqdp1m35r0oembwiv8xlm6b5kho3i7ki75vzt61fkliti220x48eprn5yhk21ebhcv724cwld3840k14it6q',
                responsibleUserAccountName: 'xd5njbb4c32qeex9vddr',
                lastChangeUserAccount: 'febr6jwuo6h2tcimccbx',
                lastChangedAt: '2020-07-28 22:44:23',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'yhfs5xm8a5otspo8fiz75eozkk3wxpto049pvgqz',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'kqhwnm12jvmdyohoyjs5nfu1h8xo4v3dhcajqu1rz1l19tzucs',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'lf5eaclcb8dr5dyr4ps1',
                party: 'y8p8vowplj7dnityo9s1cs7253b4snnulo1fgf8grte0egi0c2rgrv8wgmrstu1r0dh2cg7pyy6es5ikvd7pyvrpkj1wddgy7q5naxp11gz5e18ucgejfx6acbn11dgsrvju66dx7cxlyjcw6ti90mzczbgr6ofa',
                component: 'k50sxlcjiowthzzz4jimso6jmjz5wuz7m6kbcamxoee42na8oe1b6xy0fl55l8ubm1d5zd8qzrftqo7jszc8319m5ch2o7z6iurvf6tf4v99tt2uo0pjwl5vga23g1wrhuqn5qbflh51olk8kksbara8lqglrj95',
                name: '5mwnu34t1kr32tg6b3rxymzmpshmti6cdt9nps6elebignhda8w5bzqziiyqfbaivdoqxyavw737ona51qul9fg52o9zuthfkh7yivalbgcufxw1bd4oro83shg1s714v3eursau681fsr8nv6jz631vq48jq94b',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'b0088o5mib94trursjxith5f0a1nzc2bwoft00100juztodlrwmxfv900cjdyn039vq8ou144xcb2l48yzbsx0fko6usma2z6ceae6hc2q28rh3f1ijluu7e4mu2y9ko8jhtv8r3rpeogyxs8zskl5lw9cnjwjoi',
                flowComponent: 'pwdxn4yje5q44s0oxf6qvic888ltai3cxquw7m5epla25djj6h8t95haw4084oiwfgqy42vyfm2ady4rxll868s488q4367glcz612mlv0ntodaykd1hdydt29ng1uynrgnf1fkkwuagach4dfz45e35859lvgnd',
                flowInterfaceName: 'fa1et43k7lr59rrus2wsrgf746ztm0wu5jk5i58miks2quitm8oy5v3h64dk7so3nafnym68t7r22mag4cubzo1tjqt9jagb21m21nuirwoc7nimjygk15r9vai0o35s1k3cq4ngsyuzibafjwpg1owo0fo0er3l',
                flowInterfaceNamespace: '2stugrx6717ntunk0u52ln2kq22f0ml8mgkpdqblob3uil2vfvzsjukdt6gj6hmq0s1ajc0ew8vnpowg4jxhrthgtvp76vcrztf074ru38ikn31zpxo85y55ma1ofot5xl9222q8dk5sendngdppfun89yfoij8f',
                version: 'ii8r31q2psndwkbbg63q',
                adapterType: 'xl4grpk2hbab6r1boxnzpupw1aj9rc6vf4fbgcsuekl6ui25j9lmymdjqobg',
                direction: 'SENDER',
                transportProtocol: 'j96n22kirm7vbwii858nsvjivuckj8vjdb8mayrsrot97ihes694e11ajhpl',
                messageProtocol: '7lxtv8wukck42j3auioakgfijrof3i0jm85k9i1p5dcy10zm7oubcubex9vp',
                adapterEngineName: 'auk9msbb904v50jixqba2n3nxfy6f6yzwk7pcxlo78phwwdqe3d6k5aog9u43wp2he0oatxys9pqkl5jquo04d2q4syt57c55l65s112cbbq554mmu53h7urze4v6tg1jxik9citiminluarfm7wexl1boe8ey90',
                url: 'l7q498gpc6i8e1grow5mmnlqtvvexat2b1yjr98jx2d0l478rku6s9ccp368sgsjiku86dhxo20qxdcmnr2yjfz4rk62yg8tnbyh31ahwi0jkl6bgrjtjlekxe5m2fz6sr9j2gysg6xpgr8659qfp1o5um4da8j4zayweexjngw4ur7teemjpma9s6pzq1gk88i32gseubdmygwac4kbfzx8nk0k1f9bpe00nx1sxu853docmg0eipv3w506b68cy28adyou3l7cxxam367rvyyallk8ouxg5vqcio563isrbqvtpgojvn3m0n5vyjcy',
                username: '8zh4tzsmnxh8sxjrd4gvlgbggimnbmvx8w4baww4wfh6ezb5c931e5gp4wvf',
                remoteHost: '3fr91uanmclwwt15foxccnjuw3q5mlf7f9brh5brnzxcug7deptr71kgdfgq95znbm8ebv8vxub1wh3pr22s82nivi7pv99q65udk1za6xj8m5gp3c6uy4habqytpnnl281o7xfkm3aqykc8ce761t3xm9zy5u44',
                remotePort: 7011011847,
                directory: 'p7s885toxqzkenouvs39qkcj6mhr4ng8u2dok19xpgyiq1yir4edfyo6ll5gd8hojh2ehsjexuda58mw4bwprugxa7covwwn46i8bgxw66c7ogqjqpsknv51a1nhqle8lyoocn5xxx25h0dtzdy6yrwtch8s097y9yygicihaudxalbe8sv4y2ivkgfys5cabsf4lyzacrbvm7c4eowd6pv2hg2173fphth190kevodvhi9qo400guk80i3bwwdsht2hmuehsfpjxl6watyrmt5nc9gocse9qfqraav9pq621i1ju0b1f0yjvlim32mp1cpkdhcnzy7nf2z1vbjx6m7w2m1cwttojsmwqpra1oafecw8lr4s0d8e79gzfta0ntsvirk5go723rkg47gk7me9k6hqkav6qwle0cgmpp64efx9m69yzki7mwq99fnn29dap4dulyad3ipkq5awyiblll2rm7dpxq4d2q1ecrk2l24i8s32jvz8tv4kbxft95dzua77mm2umhk1s3vuwk6kfzt2th6e7kudsmuv4al8efdsqxk2qqp15f6mpey4807k0s4y1uwdtk710a8gt5voxaicvljcda9s2qe0jjsun3dxbr9e90vc3fq5gqlg6sraiviqowddqvhyt7hyluucm9sx6ip1nu843qn7c3pxpxrcxt7pfrc69s5i9acrcjil65ddxbsejhcmysu95ks33casqhwwn8y4j1ykx0xnhp76k33o1l6a3ksnmxkvv8101i1k56y16m7ckj1g9vonjnzd5g3eu3erikwbez8cxxv1ab6uagsk8irvnzwsj76qkr0cvden64n2hpkky1ywlum6na7yfcsiw6bxhycanvh7byrclc6vony1d00i72h5r5n7vytlpkaivei8zoig1jvza88c0r2xggqerh02eosnxo67c1r2ehof0mub7srn2czniuvs542geuxwv88x8pp0khqrr63vrtxu5fsvjtnyaqf0rxsug6q2s4isl',
                fileSchema: 'w49aixw700nnyolzpgzjj8yxd6anm9au4uxb5qfzf2xzmx11k0pufl368gra1yhp58ufr6tulyoz2uihncchhl6sml8udaifu3mboj9l7ip6gmmo7un6oc44mz9ydw38hgiv0m6x402nsckoxb4i7vp6409mfoqrsqpafsv8dnwelikhzuu7f0rrf3sjgcsrqdsdmu7cppw08tqgvsua50g2g4q34q1cghfz0nc3r56tnnjwwa72vfpjdwoaiown07iyv5h1mddm9v875booutmcgp4ln1666kxq1iefum1qz47wpwitkbi0f6azl4kyjw7cpzjzxt8nia4asyijxu3vlvbu0umkocjgddjvdbx57gge27h6wm8p2prpyijc98jt1it9xwbqckv4uvhj2jrzlzdvihx5wrdi07my743gjykwfj1xuv7qrr3ygq5jepnda259s0ru6mzgfm3m0jt761seul2pgd2lyuw2tiukc06ghtfukeojtnrf1f3itzrnwsmj9kwle2jxykszl1zqmu3urq14o0p4bcqjkhwagy50isz6flct6ilvl5mx3y3573k3qvfmxkiqj0t6f17qn1z5u6bfu0hpphg4ksmv762wjt3gvfkaqqxinrxsor4tket0gbkagn9wmsqq56o53k82usltbszdagxue0r5kqsncgdms3tsdnngfjwg4l5be85vaa4c4hoin7b1piz2045jx0uzljwz5zwa75rekump5v9y26xbuy36ddu024uedca8qzsmgf8kwlgqu6usutjr9gqnw6gkn6hxy9020k6nhgjjby8gyij52xd6fgvj21a84va7l64fuhkbzd711t6m6gf8lzu4o1r66ajxmv3aj8e0naqv7iwhljobgn1kgwghrq99akpazpnhfclxtelnsx2xg9c9pwg9dm5j36u2pa17f8o3lumxbqnwpwp03mvlqqgmbb68mhe7nszscjhd367x6ncy6p3wacnafqfsvj9gih75pixlro5j',
                proxyHost: 'd1t8bzq5dhrh7fk8s0mrri6m5kefhsgwsqu6t9a2se3zdqdg923abon1n7df',
                proxyPort: 8018047736,
                destination: 'sfc47b0x29ejz5xm70csiwbvp1xpbe95efelssrqpx4jensrilqcvwk7eoi7ye2o3fn18powmofw0ivmgve39kolrnt6506qcdksk9ks63id2ft5y3mstaaqfswwmtoh2mx5vtnz8r81ixfjdkqrna3amsdki6jd',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5mpts70chnqwi1c0yqtvgmaopq5tx9b8npm0klax9w67ppklb7xpkumkeurqn1191sfrtjkd1xtv45643lsdlxuvavo6eaiklnmg8crjl70w5vk2pxkp4rmytjxcpldemynzqgdr83ngplfz6lw90m7ddskz5689',
                responsibleUserAccountName: 'g3kqp1bbhmrb4g76j0zx',
                lastChangeUserAccount: '8mijmtrsgpuqef43r3b6',
                lastChangedAt: '2020-07-29 12:00:22',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '5cqwn7del644zeu7xkx7b9i97h8ncgffr23s8vxn',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '6pth7a3v0ss0ehmz55f0eppk5ctf80brmi9fmsp37pj10luaa3',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'iki15s3u9luknw77r8vf',
                party: 'rh4rh6qggjq2gq8nz8a26hgxhaqwl5yvvfhcu0514ypkjeyplh5xen43xuhnzs66f9qvke1km96xrbszpemnm06stq76rjlgo58ff5a2lqho8epkpcs4xc0o9s51zws4gjvf3autxlrtdbizcou5ycq6knl2ni9f',
                component: 'vrzipcb98vifua3cw6g8ftwto6xb1vij3cha5idwiqv6jquf6lv4a6u7b3yawwajxmd7kq5ilup6kqdc34o01p0hnv030l2eh6ba5f9su7cbezzt48alxj66unats6pirzvaziq7fypga9b2fjggbtr3315zk3p5',
                name: 'hhhvp1ngq7fh9wamy434e7coiw9st43eetspy6q7aozprlnbjgj0qo8tdbh9b6byxrj4w1qtkijuakfpffihquqa0jwozjf2cwg8nl0twba5ocz6m1gfmmcguegcef5n82fp4xtla19wd9iqtz92n310kce6x32j',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'ifjn08o2x2c6hjog88e009x2huu2gmhjfukv0qo9st1pp5mfhdrv9mc0unaqkvqvrkbmg2kvyu1qxkqr4i1ru125f5tnixqgzjv120blqa6g31ap8nvr2jhp6lgk62w059fxqfjlejcenmvmgtn3j1f0rd6g6cim',
                flowComponent: '2fqy1cnzobfexefkjq2gkcamrrrll2jyya7jvj5ttedsu9zwc6t72wpqzxsyf72f1i3wi1joy1fq4bkcnkl37cik7j2ib4iqatzwaqvedpzivjbc3px3sgrbewackdfd4gshbiy95uct21teohtysvoy99ztj4yk',
                flowInterfaceName: 'owy0inypibjoqec1ms7v0mde4akyb6u2mpde6nwslgztrlhbp8ng0dw2mkphay0f6wa2x6sbd60ycjdmjcjz0exeyrzote5f0zf0ywjmvfjv7vjua1uhz4dfl8dexhigg2gq5wn6utuj1k7vuuvs14p7v1b4t04o',
                flowInterfaceNamespace: '1vil59te21398pxlzza2edrwrw52mudfnqd2fguc6u4fk6480aulfuoo4arx66uao6mdojl21fy9xb0l66q7gssvls87px1426r6wn65hqgbgev5ejhyafsc1qgojbyezcig8vy4xkgdw3znl8duetqo40v2xwub',
                version: 'yk7gfbn4mk0s8umpt635',
                adapterType: '5xh795axe9j48tt6s6cdenkwhv5pwg62x6r6khdgyffk7ul2tlrgzlilwh9i',
                direction: 'SENDER',
                transportProtocol: 'jhvlhojj8994lots6ojyc5rdomde2sbrdrfuvid5udw8y99nrf3ncw3yr4ce',
                messageProtocol: 'xekn3rndqyguag5hu1psjhkixbxtgx8ma6dir7ew0he5otof6gqazkuw2rtt',
                adapterEngineName: 'k45mvzhc0y34foeop8hkcnm5np0issfbz6m5csmk6tqps0gqqy6k4lys7345oayv94pqc7qrl9um9a9jfocny34sph8awpkrign3h91jvwk01ujuhqj3qjbm4mz222dfuo9glzb7bh408gz4ielbo3l8fj8c4qxz',
                url: 'spglezli36unmps3k0hppfr9enfbvc87k3t9hrzbx8u1tjwfgzx7twsch52x2jbiuqghcxz50fzd3odyx4aafu4mei9h5afn0ruhbdusmq3r1mabv1gjwfw3lqtm231ectjv0nqnaqcmrvn8ampwdrqy9w3fx029186kkriostczmppu8t8l0xfr2d3k0f5pnxwwkt9g4w2ibmc3wepgzjsbihjax3r3hab3avxzifeaffbqrdk6p8glx2io1kjn82lc8ju2du6xp8t0j1c4ffz2tv4fnd76u57vcxelb5rmh9ep0r9ftsgrfbbcumqf',
                username: 'cps01tlv18rj2xi1fowxgr7jsevysap8675pnjfpoywb6wwnf0jqzeflpc8z',
                remoteHost: '6tn34loq4szsq012zlmtn11dudkipqzot841mkf3zos52zala7lg9lpud7pdty2qoy74b6x1vzvs8wcpzd3egn2j6nqyr8ikib8dk5nh8wg61td2o3ne34ji70lbe3g81ap935qyb5zy9hregz0jdfebvhqtismw',
                remotePort: 6297884453,
                directory: '05e6vpw7vrc795y2yflt4xqv53ts3b0zom936ye41ydf1ww981ikbgyewl1reykff2ospr34tc55fm0n24o3hb4te0y5df4yg9h7ip7paa0m0qb0vy4yw87ud07t9jez0gq19q3lq7b00x7pvov9hmualaftk4vfbz0yagohxoksbikh3cx61cdmrmojau39a4ojw7cqi833sw6trgbav9q2twvwq91qpvyjeirsmvigmgw4pai45xg9lerh01wuqqj20mcnpr5h1jpkcauj2woj527pezuocs9tm2ltsy4ygfptjxirylptgoap4gpc9ryqi78atru1pz37zd3wct9sy2c0k76qn0t12vtc1stzy4ybxvgxv62y11eh60o5p4t757dkcfakayxh0dey51ra3giszbzvbqja1tv6vig81bita5depozb21abb13jlam1d2x5mjg6dyewehgbq3x6xj4jv0wpigr8deemhd0uxz9qt3vmstcaxie2cjbef63dg6715z2b75cl4tqglbzp8l0plctle31hmjq4265npnxvy3ogp2rbkkzxhcryqnon44av8ay58obe999hze86ggoujn1tarihs93m6s6dic7f1bjejwnf79z612ipbdv0hj88whu7c4tclsytykhm370de9y2cjos9kyxtbayiwi4sz9t402357ksnc4zishtbh1pw7fgamwx2p63fjohhhvxjubneavmu646lzaak9dt27nbdbeumtqzdpa89yitjm5xu04rkt69qkd73wbimtrl8pxnjzrtmqrbdgsanrvjzama6utyfhxchs6zj621di74rkogksrk6t6uu5v8b1l8y0pca2faokf4iglswsvttdkc7nzsog1rkoz4s8i6y09ykcyu9jdb0gheypoy3ztdozgjc5fjxs6vjl7sbmujtrqc3v5natuxdls5dqb1f25840vi7pjtk8fbcparl5hxs5umfqt7bbgr8qt34ln8b0myz1kqii2zn8et',
                fileSchema: '5ynvqxdv64pvsghe5qnk07grycv82nrtxvmx2ek8icmy6hen2vhxr1a028vhlf16g8c4n9fofr39fbbivcn1mp36bdxcbgei5eh0eg9hbm6bbuc5j030w33jk84gey7f0cvj674lbij07ecjd2okjymkut7628s7jylpuyl9s9jjd7a6rshwp7fzjvkic5rpavy6x4z5850f4595o0vogw8p1dysh7m0tlj6u9ha9ex15c3zogwxalfbfjob8sjpzkwntro6a87vbqsrzfg6351sk7vcs19bjzscn0l9mgde02zzi3b35avg2upus9lq3znth615k7txwwzdp30l7byda5ajvjek63a7dacxcqr4n7mjpnjuiebasc44zfvg6ztus3d1umsufn1pg5bpzkeme4jfko8c17kiaa0v9iyicyhia0ulla1fv0qlqfxzbmipfawxhg8uf63chsz2fufl196qwvj6bccvmnv9of4chwuath4cgbxz850ez9oty2ph1zudyx5v6fwj8hgorhmtw9w72zk9aptrvw6nd5235s73w7xzg8lcoagnometeeucpais7knmlyyqu4s8osjhw5v1y8fachd983uh1jsxh0lwxqxmsj45ixqpppjd860f1s4vq6hvcyxgtsufw6s6ipe5uv6zf2sdiu3bjn2d4p6ib1jieg2p8mx0yyfj2s01al5r4jpq82y34yz0tskba1ticgxzamxllcrqa7sagllbbv0z8xsb1vs3ty8vwudo7oyoyj26svywcn4tlxubji2ela7nefmu2ca7knw6pxrwy72pka9z8ne00acc9cnd0k0ui4we53orjrqt0x6dhbw1vs344uve3tlob7rw07teri0ncmn08g8mnkixh76c8d12uvy4re8mvm3jnrm3dl59f9sla2rrnil0q0o3xpel1afrstzv912iucxnxws2qy9k8svxh5nni73l37cwpr7rxjs1uc0wzdnpnfpaj4nqzysunzy64724rgi1j',
                proxyHost: 'kwx7le8bw3ord2bjj880x3ry8o63qytr81l1cyqfia6pjhduqlsfjbkgx9uj',
                proxyPort: 9750470487,
                destination: 'sfjy66zuq9mh13mpxzdcymso216cfkrxk70vzykznomvrwha8dl81c447lq5j333eo97oi4o10m5bhkdyq6mae9m7831clcmojd20q91afh3usif0vbkwdzi0ixo5c8q7ixrw0kj50unjy7x28ey6rudkztllsnm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'r1zqitpfip0uvcrnfrjdxajnwpjgsx0johf3q3nx5vrnypsxcrb1xwbvc7fcigxdzyqe9pjtprz6sl1qfvl0rs3ar6vcxejotilfbn4syn32bzml39cex1mi1xyuj0bxzm3bpmby31m04fj8jfwwxhdzz6ta2hve',
                responsibleUserAccountName: '4egwlgffcer591h3cjnk',
                lastChangeUserAccount: 'qe6gylysit1m8w23nx2p',
                lastChangedAt: '2020-07-29 01:57:21',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'm1030lw2a7gvdk7sdc6jmr6hfjd26lshqqmmhbgj',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'bv4arn5mffaxeganngp8p1j77m9w8tpj2rflvy9cnavq9n5v9q',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'htjy3i8e80iuw208p5eb',
                party: 't1v5svf2x4ypfx3938dmz6rczucm453mywwrjsor0aklv8fc1yp9suj2xlf3nyoruo9ua22vmd9jrw505n7zlsjazvhxnkotbb2dbewsh11azw6zh0d2gzv6xgjsahat7dtaugov47b5m6voauubbzqklv7elhej',
                component: 'nxs4bckxxmgvl40xf8z57xkv9nbz224r6yj4r8lijk7r8o3s2wu3evr0x2b4czhfja7fbbl4gx9rx7kwikn3sm99zf3c855rtc24lmlogxk5g5d5rm5rjunnkoiqrveqevx82j1457w8uffy5jmhvsvgrh1mhcom',
                name: 'zra32m42v5ddii0a1i1lobdgtb699quorqo6we8oetibu9sem9x7elddsbpug8moxye9tl1hrwwpdj94wh5t03sovux5ybzl80zzhx92ay34bq66gkprsru2k355k4s7pjavo6zxuiay2qe0xvmjhce9vccp0w2q',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'ggsifsnfulufrvbvf7typ1yc9hw81th29eq7oaried7h1lruj9z61ujasockd7k7rg1y7laxnouq02plrw7fqxo16zrruvplw0d9gqdjbxze7l2ymkp7qnoswulloxxtalcmcmbrueyasshre9mox6h370ce4qf8',
                flowComponent: '4zymij7svo1lb7rn6whb859bfxsdi5x33ibzidraulqqj9qhrsomnsrpcxcdchbrvoo43xcxbypmc44fwihc8lbbq5y2ct5xxxl4kblfdwn88o2remii7oib6wugg1mkjgr1i54kz3dy6j0o6zk4cxg1kpaq1foe',
                flowInterfaceName: 'j48etd20tjc5skhpqyohs847pxj5ytz7imygjqvo6sl9ufdfrq779czol5yfr24z2bd8wo4a4532j4mgehslwgz9j6fztwo3zpb4vqn1fim69qobuahataefvtly109relvndxh5xm1drx8sftfjxf2wlqcbu9bz',
                flowInterfaceNamespace: 'd4b7rnu9nigs3u9csby94yxv3bd267gakbk69e0lyo4z450omexlr1kmmpre9568bete8hfn1pb4iqg4frji9rzg36p7ffwb5b0boosphtr2a9kbt9gkj6g5lq8dikvcs0f9drf6ab3bgnpswkk7r8ldwczhq2ga',
                version: 'd3ncgnbb05ionndsv3cv',
                adapterType: '370imlkk03394gu5q9tclnn62esbhf6f1kmx32jdnj67caaho8qin7t9t2yc',
                direction: 'RECEIVER',
                transportProtocol: '1p5f67u9m9tpcxl4fe6qt9w5p4u6f3jmbfzov1l6lz4jtnsovvkqhwsd7un1',
                messageProtocol: '9npbcblvf9b0y29ok40f98mieqzvyfgblaep8gpvot7j1c5xrpw5mfwhe5is',
                adapterEngineName: 'j7zw5pu09kicr55qircxfwhx1pgth7dl747mmz5l8zujb61tws1bnau7pgv55wkb0558v8x92botq4eux32uh3h664z6coy687t3j8af54n1ybl2bbxge4q6ol0dapqwqvg1hq0nqk5d7v2qd09d098wy262nqkv',
                url: '0kiv3kqxbzr348i7kxbhndocsb7ep793oelqxp6elyi644lqd6ssk8o5xyk10t21rzc3pybp0ecoigalk7itjladg1idwt5i0npk20wrvhsvzs0afiua2vapn2nddtdu1mqpa93op6e2539hps8zz4xp7lccs7mb9j5329dywdltl2dnx85lp51b0zcxf3egsz4g0a85en1ks1sb2onk0kp0188usbxh5gablagyyaycn1wvugmaeva1lteucj44r1n76hnt6w51zgs6b4b5ye3lz9f0hbbmqrmzbf053b7a4kjvdh3a4ythv4mdpmdw',
                username: 'h10zbao6ecz6hhcqslkawmfo9jjx57tmoijiqela12ccsaa99z7p86x1lda6',
                remoteHost: '6x2wewcotzlswmmk3d0oph0ktpdsnkilbh20pd0la01bgbgne6ilyqv00nmkxdj92rwl8itv3sdm1uy1i7bbgc8yqdpakxo0yd2e6t24zb01c0yanytk7ezssbyohmdvjr5f3ex8n57vgz72xpzsf90i683gbda1',
                remotePort: 9601056308,
                directory: '1t86zn8vpado1zfya347i8sckzipvoxn2gyb8plu4hdgtbcqqinxvc7dbj31z8djpt2io411do3alfnyfl9cwlkjywc0t9pacn47xj3td6ta4wpjtrhagj4ydqx5pqrvkcolz80h7dfl389v9y6vvg16tycn7a28s8ehl6tibydkd3s4w9fb9uu5ukdj0bk142vmqbow1myf43aw957pt0f09rr62wmke9q488lu61aspqwcx7xjr8gzymisaj3w53fg6t1baau1y8d2dttb8wayq56opie7sm8jajvnoj32bmbh5r8w80lttki287skreqln5z7x8rr0vpbpvcj1wcct9ma0zttfd5q3x96785unn4py39c3hewbunldgtlyxcgetpvw843k8sqounfixwa3hebvp518k1pzy2b4mukqdfpef5aagc67w2xoko96emd7b30p3j83wglxph0ia6pr4j65pi4cp00bnocjz3g1210d9kbbommikd8wq0h4pzzgywtnal0dm5iu3h7hklsh51v2kbprp0j3rafd2stysqydo9uhpibwdv1wq7sujua3qour8ttgo1xm9a00vqi3hb7dudorrpocewvwcd1fi04xnhbamlwdi03lvn5v4pk5tviw1k4uvhyxu2vitwyzk2ez01dfge3bkzskvfuhcimc7mgl2hhlcibtb348swg8l9pw0p8yvmnvy0dtev92aqdjy7rrx32hfesn3enutzftoueagf7rwyg9y9koojkix5i3zr5tm2c50tpiqqaz6ytkigg5dlzi295pmji64ycwxqtefc2zn02q7e6ajz34stk3ad1h7eyr1hwleft9bmm4tirxid49zfslgxaoom0to2os57q71ik0ci3kv4gfwu92ff9pakyyrybk73t9ph7b0281u5f9ov4bck95qyxscz3wxw679qgzf1wa708ruiahghajf395uc4r63y4pgjpi7dms2hktl17k23urkug86957mt99xkkyoy',
                fileSchema: 'y94m5suw5xkz4bkh54swq2cldh7q3nj9lrxnb2gcynbwwa2jb3v3wixvsry751kswonin21pnadyo3c9r3pp4xc4kf2tdd6i96536lqachs2aj7e08eopra4kfc8ull64w62gk1n5juhdvi36gwel8mpa565vqyxbv86hd0z0cd7tlpc192z3rzezbzlb50c4i6oud0e73r4w87jz1sxyx1cia01rrxlsqxmr7uoc22np3e18gsbdrz0k1nxaga3l2yuto9x479qpi2mxkkq6ryug2398em12enhfcachfwkcfeseor39w04j1vk3ihask69s1422iwyvxuobr5y25ggfv1arzba6a2en7qaj8km5bgqj77bx6gqrg3fo83q6g4gj87fkzzlrnblcgtedw550u8bd93uz92sm4nttfnwjhavijaeldm3di93ib5x7bxkx7e1gpe4jz9vpsh74uaazvg9ew7wu7xv5z121uvfcu3dv43sbdny30pjn2bn2xvrs7mymmmrzfe1rcm2wblrz9sx0zu1u5yc4tjrpzw2cpxbr7rehmv16t8l5jnxukffr8h6kdeebon63xlfhjpwp8mk7w2myfbhakfrjdbctu45cbon1omw55o0cbi8fy5l8yd12aijks8hkt86ggh75fvuap2op6jabtamjyjittemy3i3a0zmsrjregv1du6hsy5yl4n5d1yynlbccv93x86bg30s9cjhc32tq49umukgpjxggcx643wl5iqiqhqdt1hx34t7hbpetstw3vjubiqq28osrqz4xw71795x48wep71ktpa8jyoi96f0q1dtsbtacq6mtkmiykzte8bszpvnkosnrsszcpsvcnifdad3ui62lpordcxxxjc32kc4guhjwgffizme0z8eyv9a04jodpcs8zc36dz8tr3kgd4du2ikh2vjejnf3sy0ndlz36e4ve0tl63arqi91w7ovum67q3eyhx62aecdcmwr6k4d5rahm7uu3r5ds3g',
                proxyHost: 'jz5iuq4nmg2gh1udc2qhg2ne4ixa4k50fvp0cf91pvct3ttw2ghrplk5fbvlb',
                proxyPort: 7996293171,
                destination: 'en5lsp1igbl4zd1n1kcw5lxn0rbj66pywireu3m6y7odwh405meo8uroqlviql3wjeq4irllvhee19uuvw5t9623pzp4x1shll7mexsj353w21nbd6dj3561zug3rop32x0owz1qknmnjwvg47fxugdugodc79ur',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'auyhvbotradoy7d19ty3jnsnpcz2qkab3shkk7m11qsvkv63zlkl6kuj3yy4415rnvdaj366kh0w8evhhy6orhfu2mzyc7qucxzrl229zfg8a0f2kjnen85rmsi3iz2puyxk9ochlq9lzha2wpqv5u59h55vng8k',
                responsibleUserAccountName: 'mdsqjjjnlbmk7sby3avr',
                lastChangeUserAccount: 'wbswvpsqidd88y2vzi6i',
                lastChangedAt: '2020-07-29 04:55:58',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'brpsq3i16j0s2irpe6iwz1we3vnzoy2yud44m80s',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 's1na4bk8lavjsuuik9p9mq18w2uqk2vcedndpy1sw4szxlaia0',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'n1iranaf5ojh58wed4ae',
                party: 'zrkysiyjad8rs1eihnfgkr1etlvgz1adim7r4gzcptlbfrpuzwv9gnbnrjsf8h3mm0sz1l81fd20le0kbwg36hsain9ykkyc6nywju4wicdv71x9pkqdo5opg0ws2dyyq5g1qoq8cj0i9ybichb3rz3xqelhy3dq',
                component: 'h0x2gh91e76t7uschi4fig1x1oyj0s05s0b3iw6hfvzjx2elpau4d5kczb2hz25usukyuka4e6aep7j6s3slgcc39us6lj8lw7s23r8pxw29vkrp6fe5zruul9ripmijke59tw7nw457cd0xkpst8dixz4dvnlpn',
                name: 'hjgeicze2casg0zai6bmb8gfz4nlonlkryxkms9cfkxecme3c8zvrzb2e6l0ufuw2e4lqopfkz2srgdeei7djgzo8rv8ybv3qpm14f3tjcxni29zbg9vh6icv9tyklvhmpxzi6kdlr9urdl6fad7h214fivikgvq',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'wbxbmir3bksryz0bwp2s5mjq0pqftqih08lgsoqk37t0izv9lz34xbb83irko3tvw3fehlwm7fsdbmalbo8lk9lm1jknph07ilzfly4ks32p8c1q2hl0bbnmw4v15lgv8eukp7rr9ifwpr5r9itk2q8bhnzd3i65',
                flowComponent: 'edav86z9yfpkp8ma7dwhzi0paa174bepsg9l26tht2dcklft1hi7158vgpeb8puftvws36alolo6jgdxxkqqxinfqmebe0b5jdd45dbr47f6d0h6079iwyteoixdwpxl77t0lvs0omn3x7twr17lxuumgvm70vxx',
                flowInterfaceName: '5mkbdflx59hqsi5p2vs1b54lofu6os9uaijn3dfaz1y7t53uolhnkujkd9zr6v9ng9sbayxim99por82gzfcm5vtdarc9haoy6v4aqzsl27xkd3br6zi93esg41fggtegnc0vpf5695kfn1x29kjypuozqdf5sq1',
                flowInterfaceNamespace: 'ygkbzszxow5ejxbome3s0if2c0eiauq092p9l81oenh91jrg4jahi2dtn9nqcka7cdwq57yhl19q0aqvd1xxrnxic7bae9dc24a7kgqu9akl63345l7dux15v3uauf67mpesho04bhsx9u1ydj8wckukp5uiq0tk',
                version: 'vewy1ccubc67p7t2vw97',
                adapterType: 'mjrld5opzex3ctqzfdxcutmlw8bhepw8djh8n0oscii5axttqdam42ygi1uw',
                direction: 'SENDER',
                transportProtocol: 'kgkz8iun98mi12dm3mmh5am6wreil3j0s8xhh9fomb97cp0n0snulkms91mq',
                messageProtocol: 'a20xvulzbjjt2nn8fqcd4wyneyol9i3jog1974o6vxuhfr1lh91vlpc4622p',
                adapterEngineName: '04ci2z22ykghld4qu4dz7v7xr1mh0t2yjua9xg0aymm8ogo29ufxlgj5c4d5irh6ck0lrpu07y6kz3gxeme539uhz40v6fqyjlkvhsbv9bl8hcaa7ofv8f0z6veeezox6vmj4ce71k9q8ipxzieiggdjji5q9nxy',
                url: 'hi7rbumhjzap54rajb9aushhgs7o0dis691w2rdrp1hs77zoiw42b2af7k9yz9hf4w6925ymp9innzrnt2au6gysbgdzfxwo7gftwebqmb0ey5ec6kx8osk2r2boqso0o0z294usksypnvyil9sq29ujzs43lgxlx05918bqetz5p50uk57hu95xmripg572dtske8bej895pm0cis001zxrqubdw7qgd7f2epo563v2ddiwi74v9bs4dpdmr1wmq3j4p1c0xyc6atd1p8frcuoexbr21qe9pfn5c11j4aw7huuqm30owrrdp5eoro9c',
                username: 'vc1rgmq1i3m3abgh0muc4oq28thktz4d2gs6k5kzq84wfzn3gc52nadir0vm',
                remoteHost: 'eiuhpvagsh0thv4mti1b3deeuxfe6h6cqc4ie2lzqoc8tj97d9fee7nsk59sdkdv6xwjq8573kw02pvce8w9g14u8m339nd663rtpl5kjo4fgw2vx0f4g37ssgn3s3lilf3fc5fml1jx09czujrnboj6de1ji0mh',
                remotePort: 4724957803,
                directory: 'hj6x2qe4vrmto6sx2f9hz6hdhfs639q3w0pl2vifiuihp7teeavla423u1qgnftg7rbyftmi3skauoeas2o77vc67ztghvgkl2zzwgosht0ex5w6s6gvh725p9w1y7dp0imoquzi3pmksti5mjujaezzpe4xb6fyl9h9rrsxfo9ym89e5l37x1ejcg7f1ey1gcx1ay95k5l8uorkmgkcqf01htfrfk8ip8c9mqmlweqwhuvog0k3yx51uh0lswmdohwhad7slkxfri77lubd58wk2vuflhracv73v4ytgciiyvgdlewg4usc5qr65szply3l7peom68slfkeuvc6ifota76jd4dygwbb1xwjcds5tj4o4alr54rspofgm37m1s1mdwalld50ic1vdp8xozbme0csbf2x0wirjhe5zc0cex1mciy2ohnnbhfsfsm155zhychdsom6nqptxbvow5veaysaz6athgxiln48vhk8608wmtpmyfjzhhu8ujehav8yi0ljuuacbz3y5wb9zu5z7c3dtrzsa4n4lp9ynmu7175f7u10wt2mw4cohif52hqv826t0s0h7ffqzyegr5wws767xr4xtqcucs2s7arkd1i1gy2yh6vcq2x0xj7qopzncnrsmzs1x1anr3j161rcugbdjr8rbqqcc8374jwqeq41eu0uqelif2jvuia3ifhh7w8ei0oms3vory2k6eg2gjlvyzmtbji2gcg5lx95boykpbvcioihyn0wah2lh4x7cy7fq293sy3k9jsp3940nc6xhpb26ur048scr7l470pe4knheimospb74k95lsyeqddojku4g6vgcwvowoiiiw1vbzydstrztznfnze5tjv8gwq8w3l5b3fsxdzdj0jjgcvexankn2ybo0kt2ojr2564mtnthbwzh6bqbtk1y0sdhr66hatgymcfeb92u9asw55otf558s8992rpm547r1mzacchkmbanazif8d7e1g7tb7zf5v1u2jz01xv',
                fileSchema: 'jfl7jfri8m89f0q8blk4v2zx7yxahah1jd920ko7fvtx5vm10bvajbqcq8ycat3z90ntt654w128ikfr20egw0l842b2jt3bwon1vg8rxzmoxci4kvwlb8br66vk0ulgypz8emmq636b8djki87660umxt2d6mblc3u70vmbpq4halfluzcizq1s8lhya1ijwkyi7fdlu41h2wyec9wta5002o5088blqumgzq942q46tlu8ky8gowqfhboebu6e951e6zjt02em3u254nngu4by49k9m2o4cb1wtf0vmvhh9q47ed8d0d8y0ohotj1gthtlfm65yelnndqkjyd8hph77bu4sus0qaqvmb2n97qig5dh35ca6ces72eff3128jlu9da96r5cbmtb3obqqfk5m5plxovaa4ytq5du44zd389hs9brozg646oo4nyu8wq8cn0j73j7g1r8jmvml2rs7uh7zs73l6pj2s6d47y8sdkdln5wnd13y68s3ja5jq1ze414l6k32oxq1kss1maa21gcfo9ses46inamezcse7w0gv3838uq2awzehvmwa3s9jtk2ug51w7d1xhrmnz9ihohczlkrp0zl27gpgy9zedgu2i154b8zs8c30xwmm4jqhhadkup0y23suvzf5lo4xrfc0iqc97cbkf7rosirwwa2dukgc95oadula37unq2ytbl18wkjod7ya0q1yfa12z0ozq87nrjmb09jcmdv884am6o675yoftsuqowbd8dtbzzrzm347nvtyww50t6f6utajyspidjfmtae43j4pl5kkksocnskam02vyhx3vx0fx18iioayq7iy9nw6z4qgsovnzwamuhq4nyjbvqyvyyng0xvrq8z50m8giyznwi6svtm4015k824iqb4dgcgjitg32e2gme1abksqjnl4hs42hbr7gjtxv5ea3otd4c2np0fvc8xud49aqwcmslh6cdetgw0ha4fpklq4z2ogpz6pv59xvs4ww5ajzb',
                proxyHost: 'svs6o0l2u2ptdvm67brueh2jvl1x9h73u6xv65hpzweru2zurmyx57cjctsd',
                proxyPort: 99539695813,
                destination: 'x7nhs8pjddcmvgpphaxswht63cm0nh7uhn1cmztlqjkezad15prjdrhkgxb9shey7uczhlopgq3lf4ruqw9rbxn3pxhyixcwdn6a4k04uhx58ncvisbtavo8y1e3fgr1rdp7yinp8vcmij2dinhjg8mv0o4y1pkp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tqnda8ee2va4kxr0foeqoqseja9o6c1n46yw0gybsg3f7rdqu9nei2vttssvq97tvur9ysiiiwhsnl866oafhmsfp7phs784n7lakte39vqz2adw3hq3vusk9csf2euylytm3msuybps84uzct79s2k59c7570fj',
                responsibleUserAccountName: 'r9uz2w0gjs0e5z9qfyb3',
                lastChangeUserAccount: 'xt080tfybkfz3cud12si',
                lastChangedAt: '2020-07-29 03:36:32',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'fw18o4s1p30brnmw7zj0xrh3i5bko1ax3q3rl05u',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '6xw6o6smsn3dapz01tozr21b7ce3x4r9umgtwi1hs6pb7tmcw7',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'dlrf6mp27u0fra5d34x0',
                party: '9rf7ia1jw2codr4v4aixiokxvsk6pbkxyhqhs0jz5twvefkpy6p3b3ldsc8xxgvi5a17lmjogzg8pakpg1rmltfz6up810itvt84fdm0d8k8n9b6f92vfzvgm2e6p1bg0e069uvpvv41bh6upefu9cqunai1wzf0',
                component: 'ttbzqxmz09wqv89db3uhmys6e5ueo22k66r07kuwqdy892g3fc150nm9axo3fmsh75hsi0hr98jmm91dps8xnl2czy0hm42e7fmthernnl9hcrxmp54b8t53xbsgtq6uudol46h9tcmhjkr3jua4rlq454sbwxn0',
                name: 'v94mfaeqc3dusi9rmdeeqwen0bay7clk93shs49spl17zwve2mi188alt7cxq87g9sfi22rqqv7uk12cebli99wpflj7yiuu4r29mk93r7wxq1ce51pn6nl1szsblycjvt55qcdf5k4r2sqy5l6qqa0ipjg941ye',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '1zhoybucrekjcfamkmifiyqdeavpxek3qd6xhszoag6kvlqm90oxf5xrluwq1zux9zix5fkd5jz3g3dkx204amq927ghzh1req7op7qtrp2tj1s7bec4k9k31lt7d9m3ipsgadtbit3pvowlvpukh5aqzzq3v6ev',
                flowComponent: 'rqdxwb4txnjt22b3k0rccoo2d6dornhch2c0kcc1un5ygd8etmdahnp87i0dcrtr59we36a81jnuaz3mls3zrq7l3jj6n66lwrflpzvmrnvw22qe30w9hdrh7pg7016dem5pbywbhwfjqfzs9upjudsj79h7hyut',
                flowInterfaceName: '7pa10j10i1bogcdqppphddfyrrrzi91zzhq9qymrs4nyhj5n8zxhuaa734z5uy038vvrkktzu9a9r0xtdz3e9aoys3y6779mygc4o87gtkgkka38cvea338r97mlswdyviksnkseokn7gr7j6i9n545wlry006gv',
                flowInterfaceNamespace: 'vif8jzjye0uqdrdjyhws7sc31z63ox0zxtgftteijij2zubfp7e4hqvhrjl80u3oiizaqkgyd88qa2r3m1tyojcobkr15red5z5913nl6hzlzsf706xb1l123apclhokj9oadif8r2vx1k9xqllq92w18ox1hmq5',
                version: 'cj8723ak7gyx4tfosnb7',
                adapterType: 'gp5tehpn5r4r9z4j402tb73jbphe756x8d0jq5e8pm6qrkbchbtn45t3ew12',
                direction: 'RECEIVER',
                transportProtocol: 'vfbhrauhx5uyu1fq032hhoc8yrtsji0kxzkq0phywuks81tefxl55w2kx60b',
                messageProtocol: '8l1l7a8zm46uppo2kzhazt8ut09ls1oc0pgw0bol543a2tuk39kzu0h3ucco',
                adapterEngineName: 'q6rrkaj25tce0t7uic218m7qaxgjo5s9lb2umzuusxpuqipnfqtgxybc31xdwr80t848btqkelg7qdhtp12ca8il7bbjqqbuarj1gw30d4vq3aooeqi5lwuhaek534v9ou15t3qvlohu33s5401q1s9pyfybyqs0',
                url: '587fpf85axtl5tl4zfmniuimryc1t9phwzi71txstji4fte48cqrm5voj8knurx2im1j5rvbjimsw0zewaaxt5zfpcdc8ja6dr76dzxux3fm21xzkqpukicu4fliof8i8xtd9e8a9o0n04o9zh9nc5508zcdkisnyvsd8cxa1krib6islne82czfs3hrlnnas2fwooqfj8k6t7ijcvhuug917tq7ozuyvvam8j1fpabopbm9sks9pkp2i43atwypa8t0jgv3pdgvumk0v1w81k0md9q1bi2kw0m70g84lj6l3aoiii3v1ghiwpx4p76r',
                username: 'kn9g66bogatux10s4fpnd1kxptwyrlmn7fewz7f6lfphgf86fqlzvb0waig8',
                remoteHost: 'w6i0b102xmqrffq2d6b8mye1ww37pygo8h42c0firspukgvle4u2m1hfyz2zwuduupjvvf5757sglx05en02681rr9zzm2evqg6g5d0oiinp4zdzsg4xsxo757zkaayqc7u1uwnmqllfgpgepbxucir664vv29db',
                remotePort: 1815015113,
                directory: '2birp46ujsytl8dyufn2382y4l32amjkj8g51003yzu3rp4si3j6e6gzvirfxaiq83812al72tt1lrctardocpfqajxkfsd467fpc2h4as57ppq25k6xpq2hgiorot701r1ae9c7cpxd8zqew5n24uylq8bckylunzxbnjxga33b1pyyqj5yn633t08qj3sroo4iuynyik4gjq6sl888mx5eyqmckb72s9kqoivrql3d1zgq5c5gjhzrnn40o6w22fuk48htvr9yfukvycbx7ytsmd5hyt5zdtzeow77lch4qaupkwbawgdihla2yb7of0ch80alxunouj1f9hxfwy9ejhovwye9p2zy7ycwpdx4peyhvhl1bnwba14q3ax22ejttc8urwhcfq2sf9f3fux68d8tuwfwj1lq2poi0xn567kqyp7g7b1cmi2n7ihczqhk8eab72l6d6j2cf3h7xl71hl1rjc43036z71o2na8kkeh6gyqvg6udhj932zbqwazwp01mlwoedro81kfuwfrhj9sz4qqc42iylm1940p8mr6pe0mvlkaema9aobltl8i0v5eovod0vpp31pwrph8je83nhg0vkufkq4ardvhbty3ej4uurtwnt8xmjbqhq297r17x0366jrlsgt1r99lpbe5tz59n7bkcljpbrp61gfa1dicknznbr4bmiggc5hv1sno9069gs4mcuhtohpbso56hg3wqbp7pyh7s2rc41qbgifwoemtq93mpmnqli2izd7g52c592y61z1vbe9y5ykb707ip60hfak4j2k4anlgpx771qthh1vwb57q4z9mfbkj0pexso9cehey4akkhr1k4tjdfcdma4kb40pxk8kxchrltk9nvm5sl33347zy16mpixy6oeh3yd2gmaagkv0dbwacto7tuye7zxvanu9lecvzgedwchei3i81eivjrqc7j9cyd039qo8oxh0walydf1oelaunehg06y5y2eirf3yvbzpawxasqi2a',
                fileSchema: 's5t77hma0u4kxss9i0rrec9hqdoza3hy6g2ixi53e424gsp8sn42qig3ft2rax7ddo0994xnq6k2g87af6f8xt67ojifbes6itwufdm21sedq2eigf4zk2fyr41mrvdxck4xb1qjz4rdfq96lid0hk6r1vots8shhjtsnsq29ggnmvg4g90uvih3vlx1sj1w687k44d0k1qb8wzu8w5z2gwjp7egtgguinw5k5d8c4fhpei8m2to23txr8jsjr2s6s9qyvr807bzyo9z817tgr5708i08mciqlv28wuwpj0dlcail9x64v4eb4xpngdcx2qp4cy418tyhnlnxl2javlgyb2obi1xf31rzrqy75ue3e4vmb2a39ufkw2y5hiofsv2oh1ljc74oz9dmzai6woj67kerqw8nbgu7na8pzbpfspuk2hdso2qityw9zxc434xu8r38b89sxpv1mwmt1e594fx3vgng8urbieleiydd4dqhkb6dgsq20y4zagb397mluhvetxad01ottjcjnhweoihctk5x3ym8r5isjq5peb687chqmbs3l8o3sj8wde2p9pzd0606n0y1y3doa5nuhoj2u6otq9weatl1ouxgt2svcpk3c5petzi1ikioe2rteatf6ipl4erc8w1gb4flnfb47i6quo6zqsr1pxwo5hxs2a6eu1xuocxsvynrn8knqvmx22jmddcesu9psx2itghmuyiopaaaw4lpnhmbif26ejpggbrjmefwezoepn97s17sh7a4hgv6l560lgpn14ua1ffk7qewcojku9ypqgbpleq41pnoqchdkaq5k1m21gu201lryx89vzk0o5z64x6euchjby9n3xcv2m0uvt3zl6fn03gqjqn3qyk2307waoby0zcd0u3wmh4t0nu8sf2z8dpjg17n55j2js98appb4nz6yi33fr2uvuecfss04nzsofjc2i47saerh685eo0a3oa7apw0dz4ynahe4su9yn9qzdmmsi5qox1',
                proxyHost: 'teeucpedpndzglzp9zyd8o312b0tvs7st100wj9pozrp7o8ddrhuvwzno7wr',
                proxyPort: 9937571538,
                destination: 'zb9ci56kss2qokrxlphge7qszp047aevyco3ftyyp61s1f5z65hs2pq2trqm630vxdb4ftgug6rvqt4jtypke65mngdk6wwnm04i99rqngvt1matlztv89u0hut0kxbaumhmayewbrj91yhoe6oa8tkntbh072cbe',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nq6yfkb7bdixo8jyiie1q0p3eoqb5hir3xov3ujvj9wo2amv2idrwk9xsrw2ga8m2hc797695k9mlb67wdx1c6xxaaz06tvdhueus5n40qml16krt9toyxrtdsidgrytzzrnzqwddn0zyeew4ov9qryg148ubnwv',
                responsibleUserAccountName: '1bhvo9lhjmkycmrh75ce',
                lastChangeUserAccount: '9acuhhzq7d7g2ddjrso7',
                lastChangedAt: '2020-07-29 15:04:36',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'wwj3pwbh02m8nr26ncosujnfxgiwiso7l3v7jl51',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '0er7lyu18gg32fqawkwssfl00lf60z8dajc4miau2w6kaujwes',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'm4falbsr1dtpd6rzngiy',
                party: '3aggayyyl6q5ewrmpt5y1sast60vyanuimieea57na4jqpmzvmt7defhbalr8vb6zegdxgz2djh17gtzwnmdqwnulc36mxhpamkkmtvhuqkm49qw5zywlxnkfsk3zn40bhqytjgigj24e9kwf4kh1ytrlsofsn2h',
                component: 'c3j6y39fqbts7eeyks94e5dldgx9pat42ykkoz56tztzlli7fls1spy4dr9nixhatrjn6aoblrc4ljuzgbrwffh4wrjrfk5dm00r9xi2cfj8yp261bgm6xc6mxnjstda858v0zog2f2gpufkll48476hc17hhm45',
                name: 'lqor7ve88nqmkqhh2hw2n7z4tz341dmet6ae3ljgyz8xbgtrvj4jtrisy7hejf09eu9zb9cjswressgy3yo0stsb8699haqgnpvvgifi9p5h5rt7c4nl1cwgtl7z4iig4p9z9mrsjg9vncjlfh767bze2rl93ha8',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'fc52y0rfpjt9jdklepxa5yduqi5r4zvlcgkjhwky7sutidqgqmqkphb3hi8r1ys6au9xxz8gtxywp44515qyugn9bpuzs68cg8e8n0gmjcaifk8drxm8k21gllvmdynaqkqovup5lpk6g92pcwv8nie9cbqxwnjx',
                flowComponent: 'yajslcof8owd8846uq85jy1uxh7tvh6bu0f0v4cjsclzv0f9q0j16t4bzs9eve0ah66df6sdjhr0aphelauuhvrffhdkvwv34gdbu46rb8431mbf20maqoxrw9yggqmc8adotlpmaf6bn50btls38gre1iasjapo',
                flowInterfaceName: '6t7c9jl5inx44vaz5dw4pxhojjqxastdc21u613jh2f0l2ikuctjbst7l2hlbmm2i10l0v6kqe82pdtrtbii6vfkpg5qfx14gx1v2tcgmvn3j5dk4astyhjwz7mc9a5cjocq9h4sq5zq64wfqkd9fhtzpmptpnfv',
                flowInterfaceNamespace: 'derc3v2ndhky9z1hy8kprppxapv2oiug3ql04h7qq9jms2i6hqyezixb1u9su1w9potrvlxxec2c4oxkypghd5uyekq17la292rv2br98p9tyquzgi7twhsjv4hvtq4bt08wz4pjeww3xtcn9v0j8td10a0ly1dy',
                version: 'nmfhf923ddp7ddcfil2c',
                adapterType: 'hwgkasfs9h47wcbsli3secpzeg4v2x3dvubo1sygieqjs302eldvda0ystka',
                direction: 'SENDER',
                transportProtocol: 'bfylj2yee79yutclumny0xqbd8hg5143vqzmc261jy8v9xr8h6febfu5tmmm',
                messageProtocol: 'j86f9mq8ygwb59tqy7maot95cnbyw4bz9xqz0hjxvq5jomfunlspnrvhlmia',
                adapterEngineName: 'mi9qv6cxdb934kcg9auy98oawgsvtf1hehb33ufdry50lufdv0frq794w76ppjsyq7rv4jgrk5jqpiid3ghhhqa39k0f1cadev3grxfd5ylhb9qpbwuc18gd01w2d24ja92wzuxnyft3di6fwiv1t2vtwzm1p659',
                url: '4if3wnjjdd3n7mjvtuokab5b5fo51b5qam7u7v91687m1vvfxg0e0gif3qgqo3xj5idovhq6kgcdjfsfpk16vmkkkkhpm5s6m56medq2piul54s56gw6mebok8sjms3tv71ebim2gt5tq1ewc6n6bx4iptlzmhxk6zmlal4fwyc0j24rx6n0zkpe1zp2aztldyw0gupw3hazr64zbb3fwcasg2g7ag987q7h9re3a811wk9f1warjhtz615d0bfekca9mz03xghimr2qp01j6ez3jd93vngcp6npo9gmu7s6bzu0svvrukyqunxku3rd',
                username: 'yvot48nmlay2kfo9twlcdrtmzglcrzb89gsdd6158c957oj6xdbo5h5ef7oz',
                remoteHost: '0yr6m2c8cliv5wasyc43a21tvv1rdfwygu5jr9swijodd3ca6lxd4gsnx2x73r0hvswfrve9wyi1gwacy6pycnjxx0yy98lslgjb6oz0mbl2m86es4dhrj50lu4ea3fq2ho8t8rtuazz836rzkrhyv730kpw9oxz',
                remotePort: 6912195122,
                directory: 'e8era7gfoxpwnpefut9vm5mxcr6ctmxtj9ui2y83qmtytv2fm1cx5y7o0rfft09kjxt90jrm18djgicyz7b8c4ygjcuvghk36mq3wjhagjoz9rytdr5eywe7j4e27xahk439nklh53g95s93frl0nh5pildmdo4twk51pmls40uhi9p8h2rwxdjoi4g16uhcflqdo5i8ozspm4raox9jrggawrw4fptomec9j0patqm6q4g8bat99jvnglndpabkm8latf393pygldqelhk6s7z6ampcxc2som2lll3xc7sot434ohmizsqusjv5074owwrdeim5i5dspntccw6t59kx8m8d4zc6cti1ysil1nbry2yvm91ek7h5bm5qkdvnxtqfxyk2va25obqt4t5v72ave6i8f34j5a3iysfqg4vzwbohoib8a24g0967e58mn9jbox9qtww8ve7zsxljtr70b6wg6rh2xs2ayk5vfgvr6l5fdt9mqqny6hu0e18b44eoxu6ojohv12wkpe5yjabii2t4rytaeva9lee596hrsye554mae6m8rhk5phbsh20tdk66s1ofn4jjlr5jfmkku631wzjpnujoektfsfcbdxbfpamesetqjtxjo6f5jsxe57p3r9yugky8gvftfqb75aqx3cz1tedar7wpen42jaqmp67mzhsbuyjk8i2sc1lzu9ir70lxp4k52e15209m4r2u2118ouaytsv5hpa850xwtpnw1fgf8xneql6eke89zpvlq1bg4tew4a6xfe9u61hfduz7fbidi2en3cah3h6ylhkufv8e9docenuby7y50ijua6md750oxzc1e3tmnt5nzye6ikbdu36viy0xge8iaf2dcl86vopfjzaeyxt694j9nsbatwmt056fm9v08gjj8d2mnrj9flxoroa6ri5xdoj1j8huieh6uj7oc1f81jsudgf11u8cse792l4csnmyhwz70f1h3ohtuswdh2iki2o930pgan5jd5q2',
                fileSchema: '44o3m4c8dj5x83qqv9pssggn2yicgxnj9w9wtnqoj5456610my8yicz6wqglfve3o1ay0879u34f65e556jqo2o1jkmyd0ey6ihgartrrzqxnms6yynq0su8q8keruoohiw1b6xlb7cr6aiag3syaj6vgr76iqwopbu5fqvsb3wvph9mpqhw8r8cwemxu15vr818eig1jgwj9fmtay696sp49dzc42x6j0tu4yy5aolvyxxn3rhh8tt9dnvkhx3qef9zdde0u1ph7lt6h4klmtcurf2bcg4bbjqdau6czb5v9jzwof736ydnh21kixdyv4b150csd03y6xux7lm79aap1wuvnpn6mhnxiaqft0baa074t32bfy0vsjbw9c7s4zj1fgl1q8b5lz95h3m59ajeprn43mpifi2jmpozufkuuljbhsw93avpjywu3beah9pwmya58dgnmlasppuqyqhcrv510nh0cxf85jww9be1q7ikbqvweedg9t3xz4lgocudd97yb3ab3fxlr1hn0llqkuasncv2abctsyncptbjjjfnipgt2k9u5qqgcza7fum4tf4t1889zzy1qo8mnk7cn6gjkmuowfacdyvf4sv503ze1pftoamv8os7uy4u0ztrp0ohbq9tf0hqmbcl4n1ijesqnbgy16wva1zbvc3wdbedzagtuvwswas6nrho2dwnme48i5pe4zc9r50leq7s3twf311j6b81a81y4feox2wnba05z1f2773jsy11apzplohs1pgu1f7fptdv7o6tdbzct5ltobxiqu1bmerikd8u35nprdpp9bfuw2dcjroqb9hkeividpf6zdncj78hxaizg36ag40vdu9gcsnyyqs0hjp1nrwpgqpgqam88eq29ujyp79hxgu3d6u8clhusefbykd93v9af7umpy42729vw947rif61r13j7a5niu0t3rb8erir78jlckvmxxtg7hg8oaarnml0nhootrlg4xix3gnyjh34m7pgqx0',
                proxyHost: 'km1h9a5lqchaijq01sdjtivabsy2xia3tzdxf1m00cyhemp8rbqfjlzn9y9w',
                proxyPort: 3750651602,
                destination: 'vzg3ei9u9spcjvawm3w2xx7kfsho2ztmg84kg4k2ldvr1zih1lvdpl94qqc9qtwido3uuopk92a9eofktrq13gp6cmjvn4wb06qkr8tni79l67w6y6et3isftfba1plt6psofl17indcm69lrolb4nx1dkcdai6t',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nbtjtyh02rw1f9gfc24e1yb8yacrmrhbq711faskayzpyyrjsogdxvttdgri21492rvrie6at5557n08vo44hp2185z2ttx4cs44ll5g1wxpabqlgaye86i3m31o90g9oi10apb6loylg6tdhms50hhwgkkdas5eu',
                responsibleUserAccountName: 'yoxtrhlzisf1s0fc2qys',
                lastChangeUserAccount: 'iccg8gy454nrtxyy3byo',
                lastChangedAt: '2020-07-28 23:59:24',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'rfxrh0rrpg2i8ws5kfebnqxknzinjuewaz8obsgp',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'ip54cvfxyfhds9zocxfw2w1rxigfv0he17taaj1tx34l6ycuzi',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '6n096rs1j1c8n5j09scg',
                party: 'gy83nbdhlbuaurfdnpfrhc63maoxrlpqx2bn6p76p4dx8ca314dnkivgldjrxtta8paucc50w9awk13vqyfuycbuss8gat0myjo9f2v9fqygi5nufzz23if5ekmwqg686patvgi5hbpe1qv4oqrt0y0p475x0xmz',
                component: 'yugroqkfvyhqf98ni5lnc3187mwscpe35j0nguswp4e74bpmt55zr08q1l8ti8eakdq6ih97vs5oy4bfihkzlxspz2chq9531267vayhdgqxugnqejw7zk2wlotiyngfb71uca0dcqmbqv7qcl6u5cbz0jpneor9',
                name: 'z95umtwr5fn31wgfhyj39s4ygf9z2t1rw4ll5la19sqfsyihk9r8qrv6v4d1d4ifgeor1b1cplvrl4sbkm8o1ldoibywy6cmg9q8wlk1xmonn142kjka3h3ydup16f5yojl41axgjx93x2emziob7qkbyz4c4zmi',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'thu1fkemoomddc9ydotd413619vd98khl36b0w0hwpbsl12usiwnrxjwi0zybvfpsr1soiwcdrrokur5f5l0v61ro6wg8ftq3hcm02atdy35msk03rn73lhr3zn5hpwvmuuc7err790c3iaj9azw9tvva3sxm8nk',
                flowComponent: 'wca6a0wmw3lnm8mu2gt735jpxiyxdu22vz1jy168enbdmgqd3suiwn7dgpwt2ldfhroszq0gbanctgfmipu9imibsuyy416x68m3p1pyp3nm9obv9fuju8oxqj4twpkk0vbhewupyazsfbygn4pnqe83kfawcbw6',
                flowInterfaceName: 'u34g055m2voj1qtxlmnapk6lh7pwfin57y8bucvhzanig8f8nnsktkd56bqf9y7402kwjnnd5sx1az7v1o260t70ryy4nkjd96m5awx8klga3ap24o4a6pw4wpy7ahbx89atbcjzncmsm6hek1rlz2npsoiso06s',
                flowInterfaceNamespace: 'dawnh3pc8jn1oawjojji83e9bgho42hzdaztremmixa671zsz6kg7gt5gftvi4k2q84vmj5n6kpgpq27g7iyw1xtaobqis30a40woo38dqu2kd1qw6sr8c9egygjynnrokxr9dbxurc1qmgohzqh41cistypal6q',
                version: 'qrlfrxz1aj59r6gywgsh',
                adapterType: '5ufyh2hx3cuntvq9plfafdw9qmlcndvkvktmge5myadtjkr8rhiqwljgd4jl',
                direction: 'RECEIVER',
                transportProtocol: 'y6ledcr284f1leu5i34jd2444yqhhwxf56f19ay8v3cstbsjdnjix81cbof6',
                messageProtocol: 'krkrmrcwptq66muxm3dcjndkbz94huwg9xjek2fushogy2xu0fquxpu2k1xg',
                adapterEngineName: '0lsju3oedppyd17whhjj4j67xhyzxly31xc0zdlfvwqtnczb1rvf6o7anwatquthdytnacwuzopkkdetxoszfrdm5jobcz4qlvnuqn2phhoepfqlq3invjo3sfnhbq4vkgf0nay8vuic3xqnxzq8e26dr63d1eob',
                url: '2f90t80xk6amgqq5dx46qfg61861nubfcvrrkd2kaop6242aj3046pju48ltlac4b69mh96vq30r2yy1encjn8msqvx229qq6obo67vjy3vx0si76ouwk7v7asr34w1hf5x4szhrol0ckppwe2wse70icwhvnjj3obohknxxrktsnxldrjiin2x4nw2uemuryoz4f8co53mz628uzzpi03wpg3hu936kckso0eulc1os8hs8z110ufbdo3f7fkoaxbs3f8spbmymjrx4yifkmlgdbwgbagl485b9hh8nay6y9w5ynmnh91rd6oealti7',
                username: 'udo1r9d4el3lklh3tg19fcfun9na9n9s0y5yczrlh8xiwrxghcqdki5ptr9p',
                remoteHost: 'd9qk4dzw4lj7ljequjanp4oxccpc0gef859g71k88zvoz6fg02414ysqg3a8me1x1icjkccuj10eh50sqfaubc5wymo5v0vrw7py6my1d8afbzgwpuelmusbc3icj1x8f8wsa2fj85k94iu4eb98x1eb3lsobpyj',
                remotePort: 7694841243,
                directory: 'ts0kldotcc2l27k2umwsemk3bcmv7x1idesw7nq3qz0y9y1lgsx9oruf0lqyebs3mezbhxahu4avv4bq8ee611pvcec7p6be4we1w3vrjh2bohho8n3qnctr3zpuq8sdjq7roahyao1bivedetyt9b17u6bbeiqm080ak211d01irxqibmcieebgkjsixbbnkj5w76s579aiiymncukcgwk2x4ygvrhxanydv34vdd5lp1v84rlle1l4uvb6bw4xdbviiffgbfqe0wlflrpt3izd7le9u8scsrwgdog0mytscykhtj67ndv95n8e30cs7axt2akcgm475s9bki2k6jnwsyujt2hzqnih7ymwkxdzr3qxoe91hpkh971ijz1a653uzu9sz82b6smhdgw9eby248bv31tt2wtu99xh2uytngsgugdqrw0s6zgc8ju7ihnalbtf3qq2wyzs088wn8wjctagjunwco3mvpyc7ietpilnzhk7w2w4fabguf2otjbkyedh5i5s8k4d7e8y9wy1tyoz0zv4sbn41wsgo9w72tleqz1b9uykjp2uqpl7q9keq2vk35n10ck390pxenphxp1kl99iap7g9s5ci2y510pcx47a6iemj66nu376csv5ulwqgqmgkg6w0xtq3t5k7vu11gphc1gvausob592knjyj3f4nshdqb2613at87w37q9lq0377xpojrq6bsn7uq3d5p7wbl2zjchovh3b6h8micj1ipkc7tihe82mmskg2wy4ncnn8qj56ctbim6846buuu99biymrqxwd9en31k3uiex53p75y9mi1a9sv3gticydgdp0jlz0q2ijq91d4v1vkj1y8x0qz62i3dabf33df5rv10n5au7ade8r6gy2id8axd7u00083mlhqbj9cqycijedu7jmtp1uob1ppfzja36e8795axwpceaj3f2abdvt7du1b7pqv4evcb35rftx9zz14wvi2ki7dxcvb943d23ev13wkhq2som',
                fileSchema: 'fkgllpr8j4up29rbn27ygmdbvjnz7uny49dwkwfrsfif5wnonglomdj3n53ee0asz7skw2euti4hg14cmoo8s945yvczmz8zupzwvh8eo8tmu68bdwvijp7a679spwzotuq2c0xzss0j51flo57eegmefy43c9rk86cebt5vts8yaxegfooudomwho24acjphhi91cxlt9emdfyrdl3zgzg3syxtrc4hcxugo5g3q5cir6qytshnx5jdr3z6ccqo901rpspp4j7lcbshbg337igl1c26lorc3zll0awt4ii2ddg3rhv73j6wjxh981k9pksbjw3t0qn9ffjury6pb7u77hxgbt5wdcci45ryoekz2yyvco8pexbq2tbystrhtmr8n36igbumelr7j0eappdxm8dmaupt7tf2fkldh1fqhyfbb3gt7cec0nk6nrfd67rbky2qg441swsn2heyf3dtw9q22u4kdrkbwfnrfsgtzr6yq95ahgb40p8cnlfuce5i9nch784bt5amud1gbt4qpmr436odvme7tjun8q5zd7mdw94085fojgi5mi8xu9bg1z0jiojrjmxd7f7aj2r6ly0ms1unslda7g8sx76lhx547cwec4a3apfud0q1n9ukkx4fab6wve1h5rmzeyyejfr0kyhsj2q9c23q6oopw8c2vht869yn0fhy8jbi8a4qmi2vlkx0mgdep52xe2oa96mz76fhkachvop4c6igd07euyzjd79982o1hyw7od76djscvhy7f1yd4eldzr4f21zgg67ch3aulq4sik4vt05oomp54dlgb8efq5pysl3yob06x1oulxwyqrswpt9akdq7cw6s06thxoij61hbxp8fwpgnpxmaauyf4croonk60yx6nysjhfdf7fiyof1mh4kgb7t11hiw6t86s5ofnymhcakybwlwv8pmg23wjyzn2xl3mfsw7qgvmy03w5a9t1csup5rtv9e143an2j7odnx0b89103o6ncujnv0',
                proxyHost: '4uqho2x06jbw49v2fbwurj3a3uac7o15efao5gfuqvaa09f51om5cvjps5a4',
                proxyPort: 9265114684,
                destination: 'hmm7hljy7nfex40f7044wgqo3bplbo5ftmi3473zptu2tvwea5u0h7relvok0avj0uwmmol8o8r98ucuc7uekm1ira0pxi6vbimcgghc5s58cltq7lp88iyw4jxtwaeitkwkms326q43ledzhqvqfyt51t6b7dz5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '12e8akkkztdasyah9tqv9339iuy7dfymyhsua79do5k2cvzuuwa93q3kv3punml2de5ife7fupk87muu9itu0sz6t610kc0yhz59xzcje2h60c7c802raee0wmm7yueox2oxrybyb9cjz9p5prqwy485xwrk906b',
                responsibleUserAccountName: '1gju8xe2m1hxviy8pvetc',
                lastChangeUserAccount: 'wt9wvnb60o8y5af1nl66',
                lastChangedAt: '2020-07-29 12:28:49',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'p1xuz1t08sw1zx5rq7zy1lg211ue8o741svp4pmn',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '854li1fn1dmczlewbjkxrfnw9i8n0kcovtpbbqm9zheu81yul8',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '0qba1xi72oelm4sp6dcz',
                party: 'tcpmxvb8vbidpxddi7neyzabtdsfpomesihrm450i9mxav8wvfzla3moodh6fhae21goz1vdd6j0m6vj45r14bnx21xg773x2xdx1qeyg0zdnrawt16axf6bisu1xag140pcm0rknu3lisk8i27uwtsbcctf7yik',
                component: '7iaq3wo74qnfxylp93ux11f3g655ln7sxy37w7l71h1g23qjbgl8qu9pz8z1zz5seszj2izqqf67ykty3gnyj5frhr8u1q8b4uhskw0bwz44bgezg5fbwp8pv8hwucr1qhdu55rjss6v90xyddwmhenmk787jvc0',
                name: 'xfr0jw55z1mwalb7od3cchnblyrdrfto0bebx3mhwi274mw97rv0j6rvj3ha16iguv6a3baltpqfaogt8d97pejnp1xfymafq87833w6twst23mgx6kt9oegipjr94rohiokrmmpt3g0vx7io7jjcvmqutid9p9o',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'n0uppd09pw6bdh8bx05u9j2652t8keggcg1uqoybs19o23v5jqizfpqatsoc1slm9c4vj3vr64j7vze2dnzo06egbila70xf70gpsz4wjwmf6ar097b1ugmpzlvja4oc8der13zipmlfv4a11n0tb2qwi58nhk2w',
                flowComponent: 'kxhu4futnzzdza8jkbkhyh3j3330oi7b6mrp7o48ag43q2osa8jhhu6thzelth16jxl272env0qpm7zrz4lzjczws3rwsahqifl0tvqla4t9x2qlgkvr9fte152xub4auonmzfyvhn5o3y86d77qbi7h29n91u36',
                flowInterfaceName: 'fe4yhwnstv7dih5b3q348folgvleus7jm95tj598o2s2sc027cooo6c44a8wu4ku2jh9w5vfcklpsk6fp7fjmo2ir00die9p6eot3n01ouyyyra11c2kxoxzrobnatsubrq7q17ibrqm65ysymgmqpx8igb19jzv',
                flowInterfaceNamespace: '9rb7rwp2lo5p66d835fk7bxrr663anmi17w4ltxq6ja3m1sfffc5f5e5pk60yd9zjh2zf7y7mjj9ysapcywkumetuq6nz23v8gjrgsamwl2r16fro6lwro19tfgkgx47df1bo0z1g6uq9zyyrla2c771h5vb0gcy',
                version: 'qp5k5ipxv0y5wsn4ew6e',
                adapterType: 'yhem9q922cu1xdfw3p81x76wbyf83jgxh7om3kl7p75316cn3waec9kznbwz',
                direction: 'RECEIVER',
                transportProtocol: 'au2zvu371912z4azxsim8hcesec1blwsf9v1gqb7an9j3lnqlcjozk7nbhd7',
                messageProtocol: '8lhq6rhmlxq7gra0ppotvice8wizacn9kg64nmik30fo6g1irro86s7v46ip',
                adapterEngineName: 'nj2mx31nyybyd1m2g8yz5nsvxbbnw8lhn7evu2s72jg97wovudworhji5gafu7ripgmuzdbnf967ulnhawrvm5uixao8ig4bfxgwpvfee1qyiinpbkpac82bjveog3wj6nlfefi2ojg6675zwai6cx1yc08kopij',
                url: 'gul3lusvbm43u1n3z8saou2qdu61l1mphcn39p5hbys3w1h6drjhz6jrzm8a0il0klq958o0z06eyiyprjx3gcl3tr5yu3bjqmzg2rglgy0a7h0iuein9a0f2a5kuz5gg4h5b6xn8jm636pp4jj6mzwls3ddteom0fy6gyeg5zr52t880olsnlg0rsf7kuh1qv8fkj9mk2dj7tckh9xh9w15n704fqwf0vtncp82eqv08lzv2e3ax8jzresdx0awgkobkeyc1mltc6yabta89gf5gisv34qqsqzii4lkuhj6oozrrprcwer5ykv180kl',
                username: 'u85c8dfjfogyy7svqq6b7uwt394xxlu4qyyty47m9dujsfle2r81qckegbwl',
                remoteHost: 'g6dqmpphap0jdmkmcr6rmnz9hu1n54r8fozco6m9o7ax29tzemzvrvf71f49j7ptlvewfoskg6hnk2xjdsklmu9hknoil1mja8n6iqvxudiim9suvqxrkabu80m8lvva434q6mc8ashqtxsk1k44ss0di00pgwf2',
                remotePort: 8090452372,
                directory: '9il9nedyrbktktho5pkurh4jfg1ekw4wf6srhfb8y9ll5ebb5ct1sm3j8wedzcx2flkvytmlxd19k4ogl79bcm3c0ft0dvscjzitilegcfeg15gyp880m7lwcmp6xe2yjkt9x6wi8e2x5px5oa77srvj7kstxuwmragd3k0otj7wezooxk8gure9jmqdhyexgr2z3nout48ya0gvdmq7vy8abqtrne0ngmvmcg85i23636dnrq9kdirpxuv4iuqh6agqqy5g8h5jm7j4v80fx8ysp63tuifjtfeoxdppu0y34ax8yw54b4h8krsxhgswoaumblclb0yazshn3queenz9u6lw8hxli92ekc1gyiyffsr969b7xxos9tpz49w571kjom1vvl0b0xzesn71s1gqhlauvkie97c3f2z6x472fp4o7e911hh7idxvw3ipg46vcy65ye8vz7oa8d66xi6qsvdhwk90aapxc0zounw5o0asxwtwqr6vp5bhv5mahjktjs18uqtzmjbdygxi96tboa5hvbdmcj23icz6kyt135a7scx4r52vzjw0n2k5ytx91r2lwe3aojduhujt7ryr3bg3ixrzn9rii90nxhgaw3hsll1ihglfltb11z2g58g2wqumz5f2oiitxch5qud3q5uiz8lsllg6ylk6vf766e9iefix033rl4zosn5w6mt4z6dvg23h3yrzyh4i3tsv8v50yt7v3djc5eoeza6xr880r7pmrbypepc93f8io6ph0d2zztsdboj6zju6wb1alucdtyp2obj8kbtzsv0ergn7utap1v03uauf8ky7nrlcopf6btu8zgoy9louwjm2bbll1bg0xumtpshq9tmgeaeba1dszcp94cs1w52s2cav24xd3vxrl2wi2210hckm9e6q3htfwuw4ak7k8bi163s2lgl1uwro1i96544iw3wj7xwxhepr2hnx59jplf6ev8mavt3enwthov3zefx5f4wdskaikdxl6wahfdn0',
                fileSchema: '8dy39ow99ptxo0dparbcgsygsxniwdnho94s7a4av4magk3xvz9fyqw4uns0vyxzgfh869giri5yzh14ozjnohhzy3ed85cpiajm6zotrfp91h6nh80todkhk5h6hu3cyo3quigqo1ajh6kjuheo49zrd44fhdnsztvhj4hjmsbb44ophkled6jihelf8f0uif1nk9bq49uvwncnfg947b637pwv4qni72h2hdv3if6t6qmaxndkjtyd6ou5zbo1z6vf7x8fph9f294b6asefvwbbnr8u38awxcefmjavmkz0we3509razbqx7ukdmmbndp3rxrqsbx9apeoxze6go86rtzhotnhejdvr8l50xfkfq115hyf7ughlta1sy7o7dg1ucifgf2ipasnrbfys2s59yczmpbaelvrsh4zoj6jxmivps3oqu5tohhioh8dth7rg0h3zxht4sd6jxtp2nu4jt8tm0o5blj7mxvtslyc05xz48en4w2caavndgqpxrexa001b0a1lma593bie8zepxg35dvlizlurhe0hqgr0bjue0ouo5hz19a4saad66crpjeo17f740mn12h06e4gc2evlw5r997qu0d0ewpgxd5gevhkp21s26fbi4ht90sx1bjcti8y0b6z07tnmy05a0hty4nazkpeagnaaf5aqm44f9c16y460p0kle5r7o6yry8kraq6a7w7s3sexgs8vbdj5j2uvx5bm8u6a9j8arayw78bhx9r3vuz7pcj8lylptnsx9sghzvyv3nz7ldk5hsjnzi5t0ozx7p90ivuc9gva0tr6xighgk36cooucfgy1jpl7lvmdnqxxd22m0t696m9c7qjwf3so7ys2k2zyetbs8463ulrtbz4t7vh444aw2cmqqrolptl0dhspgku9yc5hhbeickpcfqsyvk23ljfap6htgcicv7w0pkw1kr13o1cuovhdc1qs1bsl7crk5qvf623sa29xiaqm4gqdcg6mmg9xul4eql6cg0',
                proxyHost: 'vdeg3l421r9y70esbmslc6djwd3clu3p0fiysmaurahuhx3ta1d7snd4pzmy',
                proxyPort: 5071989608,
                destination: 'c3vqfg3pf5gw19kk17pzdpoov3w8cz3ofif734oij2y67yg8jpgze4qvqgmx1x9fu1lrnri1pasxelc59bhgil3tkkbfo0nn67ls79tp5sbimgux7e1re2bqlw7tm08yx96qdavde08y0hpnn2wrrl7rm25fbkbk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9uafdzxdykx2k044owt8bz932eszapne41edwvgaxw958bmod22i0f0zr7eqoypvhgb5vr811tp6pen4ljeyx4wvo93smauzwn1jcq4gnhseti5yq7h594jtvbnml2h1vj6ilrtvjblt7k0qaazkbtl016rxepi4',
                responsibleUserAccountName: 't8rnbesc235bza2snk7a',
                lastChangeUserAccount: '5x8g6zcdfvd7k6coath0o',
                lastChangedAt: '2020-07-28 19:14:07',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '9vsw19bn0fb3i1z9w9khcecomb9gi4d3fy7ul0zi',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'xf3i7n5oh7l0gefodfb2pu23rtb8arn3x16kwyybj631ob6b3c',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'wt5hhah2zt471kq1gvln',
                party: '8bwtuzbij38tnuvzv0fwakytyq72g5bsi3qvkxl7rj4opvm0utj5kkalyci1cz9z0c7fhzk8oxxc01hcjop6suoj3g4mwu1wbm8hgrn98wscpak7j7um40kmhz6gio9m8t4qlkt8ip0up4eeooe0esxzglnoqal6',
                component: 'gmawx2e6p8cdywckepxqquzo1ai4gf421rm5ktxj4w7fay56jqbg4kyblv6c6fj26p8snas1dnhdx05ui0nln4w0sp8t0uqnihp5ruk6k6cz7aysngy8boqauvtfp043hm3rum38pzrejphlf610n80nv05fdt2g',
                name: 'rytg18cahbk62hjir08klc10njjvo1m4vgedc365nljt206d3hoe4ofh0v0xsxclh1nu1lmatha46344l3bytvjzaa137kxy28o8vluz4nr67h8lnc8m3wjewq1lxxjjlvwf7ov3oqwoplm339q3oi5l01o87hmk',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '1drgydznwl4u5sqaekpeej7voewbob4lfopi74edrv5a0zltiiloavpkcnoiqtxwnupxn9gubnxttmwlkd6hi3q2ipg7nqg6uj3bgulzoji7zwwy7dp8s7m1c3ikc5vy2jk3jtdd6mjes63mm5ypjg1hcq6pbuv0',
                flowComponent: 'pvobzgbikuob47l142vn7j8tkf9cj9ov78o85u9m1oqj06wu2zzfg40jdik65bmf3uy2rijm7r91ib5z5e7j1y7xhw3nd7lq1jfiyt1336fyy43g568s1fxjs6knnv1nl0jgev8efwt7q8831unasi3tgpyf1sfq',
                flowInterfaceName: 'q2967kz6yebb7v5pxk3psnrdd25i9qd8cpaw2pxui9amzn4g3ntdv8zta68589yqjsittv5sj2mvu8zdxmbnwyozduttv6pwkfukjbpuvb76jdjkh9i64dkh1wel69wgf546hokb7j7jphklpjtr3o43lv70esyf',
                flowInterfaceNamespace: 'dm2ky0s2bvlybsc5q6m2xm03xagv9yy6gaoht5oy6973e9ph3hj3o1ud0ajs2538nk9w4oj9hrh59kq3279x769mimfs6rby8s0cszqe0kaex4v9hw3t92xqw3ns3f36a93tlrnrthobnts5r6r0up0tagko1l2o',
                version: 'mfzrzkdzhxco00rdajhd',
                adapterType: '5d60l6yaehlbpm03w4udpfu142pfwdk09mo52g77ed24urpvidz7wz3lka19',
                direction: 'SENDER',
                transportProtocol: 'h8als2by2b7slx56wyb5hjgk0z8qnsfbfgv6c54sjrbat3sewwbr7y7pry4z',
                messageProtocol: 'uh1o39rk56bh6l0c6virx44i1ldose5dd0lpaiucurjvo3ifjfwujwh76jwk',
                adapterEngineName: 'k8bic26qbzcbxnl29zj6nkwwm4wuzfd6ahbla5pvqsvhwo7yo5uvtrgv198mbphzyvej60vwigxw251q7tmxxfe1wve7g1yjg2xn6ehovoeyv1huopwp9lqhn3id1q3tmkq1f8svtlogyomqsb2kbtqnpqpz7u59',
                url: 'qcc5bikmc0tprlul8erg2mbrzd3y182hm4njzfgs1ps544lgqmrasnevqui2dlzjbl5nxfm7sfct23cnop0g5rbv35ppiq9n9xu6aog9p1mtgpx7alrw758ct5n2y5gp1v7a3pfltf1vxytwyvwzdnpohp1fzy5ck1t6m7164zoifzj151i9rkohpeyj7rzyypdw3pxspe5vbr6gfxgv36k81nt53qc2cipjwfue95icc219sxkla7phyl57asqknkxiskj6hwu7dc9tdd5axgbau3j2v6bqgyzoyvbnijffpj31d79k4zhe7ebxex5n',
                username: 'nxoho4b8js0qki71h00i34cvejr8xnwruex3040o9u4g1qaktoxpe9409zl8',
                remoteHost: 'hdwup0nt1dqg4et612g83decwhughpzzkkc6fy09gp2p9vhhtpydxlspagqjbpt37clqpmidmus962llk0fbykt0l0gu7hnqtdy1a92e6wt72erh5lkcn91r0ssqmacm9cglgjgzg3cc0mkb6pyzzuq2t1lv4wf6',
                remotePort: -9,
                directory: 'kht6omen7ado5f5ynfjgxuu5ggk8lnerao6fao7nf40guzjw3qvfsa0yy5t5f8u9oh0uv2ykcmtwliskqa4qb3zpkjgko1ibxa0j1lk44p7vwoglhk1zxpqa9gwclytbuo3cqxrhvvemzkbqyrfk0f1ubmf7h667mkkc731i2vvfq60kav9kg06t99j6ay9kmdgi9b85mhttcegyqjxom2bt6zuh6h2v7775l03lpjczfb7uczl35uw2fhn4ig6rxbj50ch8j1uwgor5obcmkpmdrs3ffp6iw7ohk9gur4wh4satf5bglnmx1va0xvhpp9gyhnwb6cnt71tawjtdo2crqhaa8329s1uoo84ji2ce4nyos3cea8fqqyb3tfq3y5s6x49ondqynaph5761u64rs7tagxhr1mhr60guj3tsupqjrofmjm78ycxii5w2dl7940xi1z0hf4cvduwce2m9n2jhg0coj55yd0n7ju5zouxyz8rgj0fcxbf0sazrrd6yolhjexybftjks82pxlo8cpo2wmhnnz92on1079kvd7yn2uad9h81r5cu3swilrk7agzrif41kiuhmp8oj9t33c13o7hgx56u3ufzfetmtkhpqbhvddes8f91rtjc8e7usexfoztiiukhzu0ql4we2da24vhxej0lszrf7u89y4wdu28f0x9kh2ksyauukl4axdglxny51t61ro8c6x1e8r6uwcak77p9fjmzyki9fm0pmh88mo3gpiw4nlypj36ivwjyhal5cmh6hdpjm9ozni8bkbu70jm461drb82v0b8rjolp03f7nkoackoic0svsbjjvn2ec7yu8r1qglt68d6gyzxfzinez6l28gc4uptia2ch8smkumz2j2ynw2wapithv93wmtp0wlz96gwwt5287k0tlhvm26rthndsp1kqj8pn4mg77953rjth3r92bypohlu2iinchhrh1o3erk2hc1crw7930iq7krssedbbsfsiyfxcvfhgda5t',
                fileSchema: 'h5k3fq250kd8xh0pudo4kovwvis2zk51ibl1xebkx58ebll2czg531z5eo8ftahcjwag8gsmfnonuveowzoi240wc73y31epan5mp2ghfngq0cffupclo0c6075e88k7cnio3lbytsp9fsblo2ep6qbp6z75oyks1mxcgr6553zbrryysqyr24k9dkz6anwmmiakokg2f80kqc1v85ibpquxlwa9wunv7qp8kpcon7m0bydntw5y5g2i0wl51gsdbefsa5yp2sqwggcuhv2720hc0xj5bkswe8v4q3z2a76dcqprzewdvssf9xops664dgn1w5fhfi0vadf4ldbd5udobj75m7xi99bllrvgn566g1ow7nk5323uvh39t75ojrp20ip0laree09cde55qh36zk6f0qyl6gg3nnkv5q4nzvzipaad08l466s3at5itz4o9f8etpwdy4w3wafgiq6kqzd0h17hz7n6pm8dzh077qg6d7ped15aandk8urrps8yddha4h9or2mpdfwhoxx9bnfscd8p9amtyot7kfzfha6wvbsp4934jh9j1050e93apt46wii0memymkitirk3ysj6gg26i1lap15ryanpa7km4p4fx5b5xblpsz1m3mlqek431exn1b3h59dgf5mac68k3z73z0d2bz9xifhvhabcarnzpbcjwbgulfe64eqt7lbi5v6jq9tkv9f7gb8h3u2cubj86j9k697qj6c5zi31mny2hifro9t6ijgd4ohq0dxnalh4oiq1x8pp8gy2thetg6ftjo42hkqrld7z8hyf1ecow2o8380je5tnxsobobqic411lsfnvx4k6b72505jhmd7y3xoasxwqwdduv04jngd6iwajs7pmi5usothyk2w774qx3x2lfdhnbfxy3seg7qfed7z8fh89pptglcmt763vvhb14fhgrckz0til90neo677x0ld68x23e71qee2hvjocw2m1en59hfafgtxwpmho8ch3h1hkf3',
                proxyHost: '4bhu3e2utcc3vq482u4gv3yqvs5ctaitwegvj6mj3i2yo302bxdkfas60tgh',
                proxyPort: 3346263021,
                destination: 'fgcaz679a90i8w6qjb5lxeltxrfbho05hxmb8vr5f67zjvm1y8igxyv8q1t62jtzwhdm1etmhfz3p8gzcnfxkmds5b1vqobun4weun95bbd7w22y8h3stmdaeghfj2vfs1ybnzgqisauj6zy5hcdq1uj732vn91e',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zv7lquolyzhevqr8bv8rgprlwtzy1un69372zvuw1jz4fmuy0gqrcdnlvmp8d8tme8cb55cajkvzm6ennh98kli3swde5o2w8t0lwve8n3bmv265zkaxd6efh4yygdh18awm0ajywyvmuajur631pcuzzxcdld9x',
                responsibleUserAccountName: '8ircdh0bqo06slgc7ui5',
                lastChangeUserAccount: 'xd63z6mn9rqbksfb6vy5',
                lastChangedAt: '2020-07-29 12:17:44',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '1uttr7gi9qmxhji1wqfhjuvq983l1l1ocny4nywl',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '6d5szgcg4tgnmceayo7mqgp1e07q1bho0jdopfzby0bq30i454',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'mlt5kmlmslpsr1tagm7y',
                party: 'x5ya6up3x2lm6ig578bbu5vm3ibdqw8wok4344owmwakx4p0wv86fmn3op8q0j0szmohkiocyg19h3de3e3nvun152841tcp1uujop2vgsldx7kj9zpn5vwu35rchkodseq3ihy8cys7lr3727wwmfr7fzt5ws94',
                component: 'kv29lgfqk2nrzr7s65n7jluf0gzs7l3hx2zdr34tc6jp2mauofzwgh3umemi9u013fmnzrl6il52ayfyi02o3vgj4fqdp09dw5obje6f0zjz8q63h2mvw2v683wqn1ofkca4335bdrzqypb7igmt4xge0qbzuhqr',
                name: 'y13016xwmqy8qohxmevtlrdlub10xo4prjqglij5inzc7nb7d3yix3poqd4gcd5oo5dw3hb22sjtgkq1vij5y0zlu8azy5t3q0f9lbfp8iz59n6rxk3jaonv2tyfkl1uayg3b4boxadcwnvpuzn6n6fv5me74qrl',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '12u2d9tefy23sn2mcq14ff3v36j7k53gkq6cenw8jcpch76xi2y0k40l83k8wnmf8idb06rnesam9yidn8httpe26uczs9lsydey1mii7k7e6k38gk7evnr2a86h23f516x386jaxt8ihtogey4o7ed4cf9e3gjp',
                flowComponent: 's1d609bf6v2gv2forxlomz8mdtamz0svt4xxe0enbo6emin4eem4zwn2u82c8c4xjw9qeme58wnc75whs678gd3ewl0mb7bpdsgkg6z3t4304anxfwmwdwqj6d621uv51stnix7kj9b5iugsuvurbfszn6modsha',
                flowInterfaceName: 'anzudib4slkn92eabtoj7wb3gkih2gx4kh11ugvdwsg73ve3peeef8xydmsp6tb52j8z8e62o8stc5s50g2gtdnx8gf81cehusrf7t01m8hrwu30xp21qbynnvxgo8kwqlw92xcnt6jaqchof0i9m6xd2r9clmde',
                flowInterfaceNamespace: '07urxh0ncp400sh5xssvcv4vtw7u7u7yjmcocn9ptqp3au4i549uvwljgrx36ux8qx22oevqtulxhd66cmnc356hoxac1waa7e7lelubwf8dhxvm78kwdp9o2nk4suvi9mjzv49pjjs0audb5wxihrt7ro14gbpc',
                version: 'xs6eldvisrcey8q41h1a',
                adapterType: 'bkcnlpxo44wcy7ebsluqawh28kdu9bk6me6kbivnjcy3nmomoxz7r3dmr9k0',
                direction: 'RECEIVER',
                transportProtocol: 'nqav4c7dk1qeiho3qeoa8eiuclcj03ymclovj4uukdtji0c8e0mw56bgdy6z',
                messageProtocol: 'jf11gnanw6esmmwz0b6iqcm1mvfmaopgs65ky48776u6ae5k8vpvogmitwl1',
                adapterEngineName: 'j4eag4akpl4uq5rxpgtnlt93we0i1v09cx6ypago3w1cb5ayo3jo73t9dapqbq497s04xtsmln44gygvt316lfxepocmvv7asqp2zrp4m1fj0iy3q9zquxeipj95apeppynbf3dhadhebi4xhzz1yh09n70tyjvp',
                url: '0c65wd1dlrt76qd5hkc3g18cw3b6rmqibuj58qoxji8nngf1ngbw8vkx2gjeyak338adskewlqo3990130d9973ks8nldsf769ys3parwn4t2grivoipw8hn6dqpp5p6d218xqnvicbg9m20gnx160cdudkgyc7w9mrmsd0sbjsydu91n4efv5d15i1cbwnwesrnrvjqmxyraow28sp07wa2vw9xidmdw979irysv2me65hl9lv3iaevabcqn5djdj3sc28nyqpohw3mqk5v1j09qme4u0qt9r7o5xvef1ix3pzw8du0v2no6ct6xtha',
                username: 'oqhyjm3spd90ygtr6wfv01j3cbwxkc51jev1qwnzs79mlke2httjnr1gusrg',
                remoteHost: '4yhx9vcho7lpmwrtg5t7kf6wmbsorncq1fc2p1s9sbrlo8q2s88t1v8j99v937jiz3be16xhdd5ebnrls4hak9ypmucod77zbba8mtgi07gb430es8smfph81o8ys3bqoonwggy3w5bpcy9ee1yinj2zfqiw01z9',
                remotePort: 1499071700,
                directory: 'ptxjseit1vg9jc6o7nkh7gc55evc7xdaig10rxkamfdl0fkh2rsiv3gl3v50p3hpnkdu6ipaw98kbaj16285utvq98oxcw53a1c9tgdouuleqvjf4o6xg6iwcr6j0qy0avlox7m5hrx4j7jtan86hhd5po6xkui247ib1z7zpt5zhfhw60zevbylsgwmxva7v6zel1tpxj2od28qdfbj64brym6o3cc602q00nu75rcj536zrieep0y7zollejstsg0dobewuh15oxqsyucuxlm7pm51hq7cl8141mk3tph4mf2bj67yqaujanqc5eudfr9wkpxa9p7top2ah5u1urcxsr0guhdtiwuzccejxsnwcvszre6bokbru21bh987w01kkzduxqhnkyy3o57zvoaxwixzfj8eo8y9amt2m8017qiwuq3g5c31x0nwx96uy2bitcq8fnsyi7i6c6zdj1hhmmf84qqwwmcmobzyoh8crasmxvk0h9u5fco68jx81nvg2s20axa3usc340ccq2dop1uf1adq6cfhfi7alhsb1ygmiuhe8uscajshf0cro4p5thsgz9nkze92upe0sfn52jkzjocinnfmmccqhel4otnjwfu7c981ziaiwu573sozsfcqhanvr7wfj27i4zlhtwoql84dzrcc0ejclvimczbix5gmf5igjn3t4o1doijkuce0wc9uzrxqqedco6j3ofpswn5g3rcmalrbg3bd9jtnsd60r0ilgfvjpztd0dta5v22spenwbzjhqbhnfkti2h2ymaa3lv5qf5maxpqcxxfnegnpf43uri7ui1hcmpqhyru1vgv3ktfbpnfu2q6evpow27s7v82nkmir63t4ze6qr8ilhg5c9hk0wbigjgws986niu8vkbw1ctw4dvz07036ecbib0htx7fv1jdevplizhiqh3nn5582vjdxtouyznjovcnp0fghzxx4fbbvbran560oojltdu20cd8e6fggm4bzymmws3nrxmt',
                fileSchema: 'zre4u9twxdvm9gn31o9rogqdh28j332w7zsoid7cwwje51bvpgi2pb6kbg5dc11rixec71jwvldq3l2gebzqu9pl37cl6km9mthzzljkgn7uzqaw81y4ragu18qzrn2wd9nha0f05bho1tetjsidphuhlncows0geob9d0aly3o7sh8lofk6hpx88d7xc9jiqk7cr8x29851r1fbnb83co40tug737nlts7gjrxc6sk4s7r6riztftln7bxek6qlrtjmpvi4dl6rx036dvvo3rm86y2b1um5tkumcmlejn2nde9pcv6er6ve3zmax4mp9ybd34j0ovd6ezu0b2hvvftb3pyr9x88sixpjchsur5taw94fea01cg377un3qmywql1x96m7j5b3qfoc9306esm0l31kdoqbra4h3y6zoqvmee5jrfs9b8703per26xqreaocauwfaxbg46w14630d482nr7be428rqg02ejh03qhhw2m64h1zj5923b5430vjwtaua8dqwnd9ij0f34beq608iw4fw0v3cb7d4a1zb5gyhczn9t648odeu0htjf729ztgalo74b5co5wkb9ywnvmqfxzuvvq5tat2f5n799snlyedjmq5s94p699os1h7jy3sqhkoepvxlsgd0aj082qrlhd3wci5jdxr711yxgi4y7v4bvkxv9qg6uz2w9wg73ckhc2pnrim6kfj7hs7bry99rsnzyzhqjbbmp9xl83jwvabx3gxmlgucwijk1ec233zawkmozs7552c21c7a9eibd8rmcrspdhzzl6nutkpgeuj6i6pzc47ag5y40wetl35zpauzmpcnrkko5exbhddo7396beruwstpbnkzy3hh7z3wdpjguclaeuyshibuj5lxxt23smty3u2sd7dnvivd6ixzl4zv8fjogmrmk7d00js029wzfgwz3spp9hzxrd9i59x8bqkdlg6p4qsc95bl6kv2v3s2xopemqkiycpxejallasvbc8alzys',
                proxyHost: 'kxl8zkix66at1r1in6di8kahvxvfo41jdm7xb3p1y96oysv06lu7i1kbyjsq',
                proxyPort: -9,
                destination: 'anikef02p0la512ubk4x7xmls0tazigcri86jq4x4vnwyxqt8mu326ls5dr0ghrz5yhmob8t1dp0qqrpwbflmcm4agw42afz4b49ihcs7fk4va7ey2avx0hwaoo2kc3aq5pi467b7bgq8fw8be4fajx63evmxrnp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jvcdjwna5lutcpyune906av17909m97ob6mj510m5g4idw41hccpkru6st17xc4vhbu7r5st9vwulnblt92533vfvkkablqqe7ioc3xy67ocxnce58whm1kgs4chzy45ir5nsf1tsm1f7w4mpp7w78t4g8x60hlb',
                responsibleUserAccountName: 'llmsw2z4rilscm38oksy',
                lastChangeUserAccount: '2qjr8a1du795a0o651v4',
                lastChangedAt: '2020-07-28 22:33:24',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'ri8i6dgtdzpczvm53ucw8mu2durnekqq7x2ay9el',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'gqxgb67090rirde67z8g14go9zyp6dh7wjkgmj1zvg9bl6ry1v',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'ksjgl7kajbnfkscc08av',
                party: 'iwic78rxfvt2stowcyi4a2xf9mqthv54n7xwba83rgchbec5go88jwkvkyvw8qpgi53hwq25bezw86qmjrbzuxaan8prymp561bthfi1xcsgg6n3adb7neztpc2m3if83i3ymi9wo5egthzdbh89eyrq84er1i2c',
                component: 'gpepsll7yy1yq53j44pcrleza27c6w4ktlmmfz8turmmf5i1tnfrzd7dxv693s6hy86isim6lnbxhkxti76phjipno8pmyfub5hqafyegh9x60db6bo2ese1denrvq18kq026hk2s9fvw6sju7qy81pjkkzuqibi',
                name: '2sdyknbulfxzp60lncyfqjudwhrmzcrwrj1vr0n12vozxxknphpaz9owk60v3jyv7d9uq3de3ln95vamsbg28buy2xh6imkwux4uz8jsg7xvaz2rxb7r6daekv216qbkm6tyjnhpq7z9pp18zfgyju7hpbsli8fd',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'tag5sryqi2n8qbofifx3w0x1g0rnvejt0nng4edlezw2n38fifkk4nkxb2wx85tpsqvw3h5efgx9ytz69hofh1et4dleuvvefv06bjb31y1x6cg7bi6tvn8c6y5miyoqjkptv24z4le0gx9sflzl9jhoktkyiksb',
                flowComponent: '28clhtb1jblp12cqnevnmjr4pt5nq5chjp27s529qy3q60li7ipczf7q8aum9txpqs3phzybv8fs2cnhrnfqyrqib9yz6bhbj9f2kk0sqyizb5kbhzejx1txq12g225lqpnmowf90zaywvhfzujt7couc0dcr7u7',
                flowInterfaceName: 'e3z0wqxkxsvra2ncwz5z9yiuyylzzagewm4f6qiain56v6xc0wn2qjtx91w8n2sy3km73mtaifz1tf52xe7memzht3lpq59bchs8ak6x2tgf6f4x3oi510950l7vd0zqkua41xvmdxn4dt0mm14nshpf7x4qvygj',
                flowInterfaceNamespace: 'fl8kur6mi085ilmmm661eam2imimtnjt9j2a1oj837lpjb4jikuubr9abw2wbc4dmkyhe06kkyjk9heesorc4fupjt3jhj51oir9vj2brbl7awjs0xrn2afy71y7l2d7ttkf2u067fhh35wvkbyzmwznw9idmim3',
                version: 'a7v7n8k83wl4cu73a471',
                adapterType: 'him7ustp1cgr28pshqq2bremgqnylkaq6p5z0lnrq2cda1k16d908ffnsfdb',
                direction: 'XXXX',
                transportProtocol: '7qxw1d0f3xhqlql6jz2fkoy3ckin6v4ksvg7lqt7o2qrkq7vq0oy3jbqrrs3',
                messageProtocol: '1r6k5m827xj584klr8lak4jvmf9wuabfdhvgwtrulz5aak17zeml6rbtemet',
                adapterEngineName: 'p43gxuy4a32l2zdhk83s9n10zu103h0lu1e55m8c6td2ex5huj52jzppe8ai9rjdjjkyz3bubcsoerucxul2at5e29jgtv6ooahz5avjsbyfb8ie0gqxt7g9iucigzumdjlo8wylb0up45nwio4kj4f1z9gk7dt2',
                url: 's96far6up28sf3slwvl7nsijgq3jk5i2p2zve66g4wi77mblzpsgae1v83dkuv4tmdh2xyhdl8catmis0oz9mf14qy6ovlsr3ui6kykh14uuh1pzkxm4u5econp0vs4wyeemz3okr1d1spygsr4qf0vztoh15fuorv9ji57kf3oi2gql8p857tfn4ccff2m0u600b4v1xx4cc9h41ik63ibtzlefethl36p96tyw01el4qg1o5wedh79x5q6jgvklg0p6avz4rw7yzdzj6h3krq4e54cl79fewsjlqzd3h7hafx1ad7amxw6dtbxu9vx',
                username: 'vregysca7ypecmu1t2oaqkfja38d8kxnqv4t3vg1aaj3848dqnxedbt7747g',
                remoteHost: 'q4ltxh92oyicv6ln88iebuoljvaoa6vet2v8cnb4ibeazw3ugoasdkf9wtfmosq8na637u16e1ye85nhuzvcsa1vkdqw29j7oq58h371m2o46m4hcojcu2ny4p4kw10l8uztzzkk0caqpp9ikeqp2knm9k9yc3iv',
                remotePort: 9970236033,
                directory: 'y5kuf5krf1yv6hcv6r6taumyhs54ubjyzjlx6rdjc9y7x9x0fzqmfyb5s2akxp1dw63oxb54g0pg89hxa39chsdloz6vmfhmqsq8bt49ppnyv8bboj5ea677pty12d8b191o6gw2p8op449a2rsrszst0y4g4qs2pgv16gj6c4fh88qfc080o2up1skhrrkz8j6l2ekzrsaptl3be5zh8ln5cfhcnwxq72orkz81hujvct3ihg2iv2a2vc2w040o4cjjnvbqxac3de6zqvyi9272goyavk7gqb98r1lx3x7sba1paojjntjr9xydgiw3gil4bfyqapmit6jxjwoa26u1syd3bhgx0t08611ahxwmovpy0pat9bx82e9s3rg1f9sdrdado6qojkk1nxg4jdpmsdfb2m9nh8966x203erqxlmyc1g7985wqmyi9d9bxj3l466lcpn4szcytyrbi7g0sp0mj6llk4plujy02d60nxytgbdn7v9bcfm4gnnyt991l9obf6i36kvyt7r688u44hd13wotlvxtsqnowkkkt06oo6jjecau6q9ff49dqaioq2rnwi469r1vmj32kcha46oaa6ti7bkzgdfsohtb1ellv08der3npupdg08e84p9ifvusmgchq11bn6bftywwmcvkj2yu6fgndvt26v01tu7mx1woxakj93d3sblatgfqytsiu1x7ojj1jr0200pogp2ah9onrxgh07l4s8ovna5zt8ccyzryintoekr5ablfcg32szq73w18rdb95spwy56hxgtsgkvwjm5ixhaktgqt9m7accys277sp9i56etcmijd0dzy8x2a5urv19aof5hdu2fqfjq3oeberdy27ix6slsvn84il8aavdhnom4aa0tz9j1hec7bmmsvhovy3rp28r9wpg4nj7anlivs0y2ta3qbc8luuj58umezdcigco1bhjkj5un47isnqp1x4ku9k7lje4oypawfmd123eo11qzlh48lan8ga9n',
                fileSchema: '0nowuxy38ipjn37k98qfj32rne981sw4crfnngkp6lyvwlkhqb1n20j7mmca71zfkjo83dps785esyf8tfbiqzra3snbqba1royi9y0tjlbc8u90ucdjurla1aaa8l5yctt8zg1dc5rv3fbtzesfz08pi4fsclh2g4ckst43hsmniyhprhwoaifws31u84bv9a8qavsb48w9d30npmsn0zvwth7mye98z4v2qlfzg1rk1k1x94p733j3bj7cqk2b01qvfvp9vgulhebaf83o2g62dt90sembwqcfa54i73xd238le2u4imrvggr3qfwjjgrb3z3sjsdg4wjxpxclfijdv4tcbc5pwhqk0s4tcxca2l08wrhca3x3bi4jg4mnkxcjw0xocss2k9uzv8sqahbezobfkhtngmeq714n69oejazwgii8z20k8d1hq1tkpxw791zk7v3jfpakxp3svs63valpa5vemmqbqlmxbne074sqjleevsi5edkpoi1jgiz6wzj2sd82ygiknlq3bd59v49z83djy6vsfk9c3qfztf0hu87yjdz0hf6kdq499kei1ha62e66rikrht0omnoq3l9io7j2m8osymipnnutzf4cprd9qeoblf4aygbah4c2zr1i9pdpqc5f130sd3h8tz8t1jbucc5ij9kyqyxxcznrz2f6ascxyb8mzeoe32qopjga6p250iv2jytwcc2e4n8gc17hu6anxzf9h8uaq5dvzl5tq57hl5e5t05itbge2bypfz7ot82n0tih99skdsget7hl4avj56snoyerbzx4it8du8m5ibmrz0sra2z6wc2pfuo80xrvyz34p43fpmad6fxg14xmg2xo4xaebxf1e3rxc003kobj1k23sewiphb58xz34vujkqwgg6fo1hx6211og7ekt45o9hkyrf6082q72elqmfyambyb8bvbjvbvjwdeyx4fvywof37mxgdpahcbtvi0feelxu9uflci6g7mf5nu3r1bbr58',
                proxyHost: 'mx6a581e6h1yeyiu127y1crr0qwmszvmutue75ab2yw69mr7xz550a3udkrh',
                proxyPort: 7404877338,
                destination: 'axyhzo1lojc8ubgmhpmzgt5nu8kadsr8n9i56pwlt1mra84e5zc4o6l09pok03tdbebkgj279nv5at4jss786cabvp3f4ka8cupg264whskrwf705dvlwb6mtftu8sasggdu5t1c9fq7ejv6uw6s3490tzrpkr5g',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1t55zr38imef0ts0m87gxy3s9melio6omeovyeeqqqmsdtc0sp0h18ka3krya8jxoz8zfxb9o6hyrhpron07mp32rxnieajyl9ytgt3evv31f1pfa618uyipe19p2amskdl21971rdpio8pb7q2ahzwhcfjevnpj',
                responsibleUserAccountName: 'rc4t3azbfj29u04spso4',
                lastChangeUserAccount: 'bwz8niklbhhu0elzg0kc',
                lastChangedAt: '2020-07-28 19:43:51',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'jce8zzbu7w7ggmxseni2vny0nzxh4cl2hohfasgv',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'hfxksw5pcag375qtq98xcpcv7i1apnqri3b83en72xlxj11dfr',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'mfabshtzxo7a4a31clt9',
                party: '4hgk5teezrr5ixdriog56z1qspaldgzk7odrt6que4qlklhp9cunv0frlb9krk6fhnlx6m2wi8jhhni8ba7jhfylpzym1vg5v847f9710vdwr1josq1cpd4bkwencov7u1k1wa2jitfvdrh461dkh3jmobepzzgi',
                component: '501gzam38r3t98ikqqi3o4yffgohc40dwbw1rkzkhatzfb9ba7ecx4z3dl1ih9eoyli6q7xjkaflfzbufjxps9gd5c6apq4y145rnwfk5ri228xjnq8hw9k794sspys22yxf0xv1icw9yeb8cmuyajvalopurs7d',
                name: 'babk82b6tqvivoxcb1rok7hz97ltxepk8sewbsvlw0zanycvv90i16umsrjk76rl90kmmks2mht9f3zgraiatgevgv37td2n7b7r9dy8rhsh81xxkujpgf76fha59x1sa0clmaa7vlf1wnuu6mp5vruixfx8w1gj',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'jwtdsfo35q2vv7lz6lkleez2lkkwwmd935t6pg7p8eutt0teeu4xmcb6ynzeqq7mqhoinjgcrgy116kxb20i3vmryncsqc05cvc0y76hcfg779bgab8b5d7sfc7pj7s6uxizi5ftz8u0il44lh8nwvpsxurjys60',
                flowComponent: 'tkaevfsgdd49wxmax23mljsk4gzv78p4d6o6qwzh2oxg2911zb8mqg7ei9dqzhz171rp5iw78wgvtmom80kbbcw83273de3zbb5svg60axvx52xolkpegy4n30e4aa4vg9qup1j6enkcvnd96xdqkz6wzv7u79p7',
                flowInterfaceName: 'k8pe4jbe975ipngzr3avqdrzv3dx9tmyv5sfgghg3spzqg412c81ftwj6ng3nc63ixqagb485ukfw2h1fzw6822nfxsilcixeov90crmypsuxv0ag2bsolzixq4c3badejpwbvrz28sjyl0jzwxrek2tub3la5jp',
                flowInterfaceNamespace: 'hhu9hjcbngfhi6c9ihhcw4xbmngwqp67bwd6w5w1gxrd9a48sajop3l3gt7wq19euxlztmcnrafyuvhoinre5cyrj3bnfas0x7botq6dfqt3h5vqjovc0qlgdyfvqwhg5p6ya1bfndluvh4n8evr0esemuemrwtq',
                version: 'l8ggvwp7899qam1vk7re',
                adapterType: 'kvnhn7hjl1fpj3fayrxe06shi7ynkdoxi05r5ki424uwg3p4c35ek1a2jnu6',
                direction: 'RECEIVER',
                transportProtocol: 'e4rf9mk8y8n5db4iy17g4fsnj2xc6um8gmpvke406qkztt0l6i33r7ghlv5p',
                messageProtocol: 'c5m5e98p4h55e0ugjw2dhx37q0a9hp4wuu7b5f1r4sfdzzm7e672eq1utlz7',
                adapterEngineName: 'jbn2o6lj7s2zxzb591h8wccbg7crn799vueuq6ivyuzjaql2mypfiix1kea7kzv46y4tzd8jynaxr2esboeoj5nf54zokssm9xrwe77mllj10w7tb0wdfjhlfxyw1blgdh1wecp3xwfzssg2aojo33zwqay8kr73',
                url: 'wa57l6g6p8ogfrllmy4ssutd6h5j5njbtzhgdf9nga7lcinbpznfvxb6bch6ja54mq6nofj88vy8ngsh3xhzr506totg1d6y5maqps6lhdc8ahi5ff3ar57byu3cg48afx9wayh2r0xlzs029pmwusi2n875hn6y2qn6iajs7zdmrqfudrnnkz08rp6hqasz4k1iu81sed7wggvsob5iqzwpelonulsrwejwdctirsfr1cdf2h5e6nesjywnenl39458reb40of7aj97tctkcdtetqumgy07ejkj6ema2sa97s9tp6t3l6drw28rj5z0',
                username: 'mntdwhzncmgz6lfkl2cuf540jup97qnqdsx5t0x8ep5t3gznnljaadgehg6a',
                remoteHost: 'u19y746izmd2p6csvwlf6e3i8b4o806acxq9s6k1zukp11np67132bwzko54y4oen74odjs25hwlue88g07iik9twcxqokpcb355ixrb0vfz3p7jbfjh78nksh55uqpzz0lmtz3rzwth0v4tb244nys2fwhg61gu',
                remotePort: 7499710602,
                directory: 'gyu6dz6h7ln37zv2ehz7z0cyat3fpdn93aye7enld0ouc76d0aklu8ms4kf1jogm106cdgk0tcp7kwvd6s7se2b2oiu6o9bvqddrxffqduftmd3930ib5mnqy5t8s0473aemj43frhmkv9uzzjdojy770jd8zs17xv6xc4uqzzqosnlgyxpd10yw2jz11uw61h1rrf06saxk6f29k9abv94yl8q2ngu3190coez6577blszoo4dvxvbw64atelegkhwobnpag8gdtu6s2qslclhbwb2eapf5ip8190836do2uub663dpipeb5yuu5o47gquqf8q5i6bxd3z0nm9jqn3gmdm0b7z0flhhp91jyw8ezy2e5fvckl785d2zt32rnlte3w8g65jjipupwpwo0z5vl4c67c0vn7y37rxszy6y8ef8rl24em7bmyfqfft2tnhw1bobs8xr0gaw8svgdu6idyiw2b5i8oledz7948erk8l0jd1vcyrcwfnaijvmvwhezmkowfq76l53fhhsh8q0yruhvux6yahcq9y2cri652i90qd6m79r783907tj85sxpf5ng1sncdz3lwiiz6mtevo5k2ps88nha77hqyh4you1c983lme4cpo68etb3tmkvtkmrreqnp68x1xwi5ixkpykq3b3sb5rh4i0wll1ww9rdlalwqi64pqg22thoh196j4l6e47jmsg6vyle8bv9b531m9483zpsndb9sis47f8fdvy1bkdzooyfeavvwholsdjrc0ocb8ozc3c3lcj5l1jh45zav5xuylo6pr6w2xjoqlbceb8p0uxch16cytgryen8hr5j2io7z0cryvmjsg5b8i2fi0w8hjvswcnuzeot8h9a0bzjyju5i8psvxjfsw3tlrp2cum71qt0g98ndtqhu42z42rfrbr9tndacvh6mm7ue5bwwugbxh8ykqs2aomlhmr009ft8gnur4pkazduw5bqfl1nzgoou3bgnr2veziy5o6icvoh7uk',
                fileSchema: 'zbb54tzwm844yyf0q0x7ao5yvzfpl6qjty79eeew5ledruzaja9h7s2cy1ls6rj57p4mhhlqbkfvpp024j8h1gnb44txca0m4fuaa5nd08bgxaux8g3k5jttcrylngunddjkqedc916gqcgcqt8zxrxs82z1gm8rm7l1ix9disc1m35fmy4kxofpjh1k1ttrvo2v7o7yq0lx794sf7sdcvsfcks0grxe8wrfwo97wfg37ckth9fc2zdlynnf8u8hdidewbiskae4dy0piacq5muotm4dzmiam84gzqm5ft54kqd085g7xlhvi1dkmrl6zqxpnzrwbx4lieyf1bqv0c154vyu60skl9sd9o0sub4ido60coc8za3rz56053wizvj6cihnl4u0k6q8g8kbiliuuvruv5ljlyrv9xdlc4q37nys3jrhzy83u3n5a4mdji7s3jauyqjdavzg4mqxjpdujm6luhw9nbg4ujfjn3fi8q7h8ah2n9ja4863k2f43zd5aii2szkfmtz74dlaynohmbwk8id7vvn5ysr7cml0ctqeflaicf2v4dzfc2uu72xqemnwe35br7o93adqbyiq0464699b3wfvvp7brflifxrfe7k44s5wpfpxmpyezsswwk4gusn689xdcoz6e17qgnba7w1lskcsai0hmxsxwuvs0pjawji4vhbxi7ybm7ybux7yc0fle8i13u23wiswhlr35isvtb1536eexuanf3wsnanigf1b0ai167bcgwuoxr4wwyyicmzb56b3c7zjo1u34lqrl9dgq9wvasvul967yxha8mk3ln49uwqm1fjd4wcqx5vusnm4kag0pl6m7t77fvc7igtlw36jjlv484fpqhqv479p7pk6c5xgglbhfazer21ghmat1pk13ehlmhskdi3do1eb2cttwr0774v42osqst6jr3nqq2t88bu731bj2ijxn2uqsseyb97wpxowa8x4nffwc5x2p4loga5ctfe31d1nyjk9c17x',
                proxyHost: 'r8y54d6h31x5jtqnucneva227jhrluy6m41zafo3g3yx82g442qwmid0y6vc',
                proxyPort: 3815956466,
                destination: '3gwz3lvd3hig3jwmbsgri250in5841kz3u4nqow08j0np7ydtbhgn8gnskpo3kolpqdywllikg9loyjtr657gq9qgjr7zymh91wcs2rqjjfj7c8z2dn1euyc3ozcdflo4aljel4hqi5dm9gu2krhemjo74j6it31',
                adapterStatus: 'XXXX',
                softwareComponentName: 'b9d1sgwchlxz4neonkkxhc30a0q739s7dymndgdoemsf8e9zvdjkxx2gl3np3f1vdvtdrqd8ib5k9s1obpyfyd30mztd8d42oho7qcdtrshrwtozfvmloczmmd1u2gjhprp56n87y15zpag1pxjgcx6iuceg9dtt',
                responsibleUserAccountName: 'exjefklpyk329q9suyvx',
                lastChangeUserAccount: 'ekc5k034rxw5xgaogeph',
                lastChangedAt: '2020-07-28 16:37:30',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'p7xs2sd099sctpw97p4e4mqdjxn98ku3ca8kmog6',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: '1pur3jyu9zx99op7z4m46vecn5p07ce1zyn6in8r5oos5yyp68',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'morfe1i40zz8hsb2xmis',
                party: 'lk7ee4xrupg79cx6ef62j4ddttnjs0gm1vvm1q0bnztblouixxnptmnx1bp7lm6pckdr8lbqzo8zi1smaxnj99qhl1x5tq1y6i7iiueez8o7jl28ck76b1oj1k1w52jmt6z99zw602516ef1pfkxvmtd4tgkxjmk',
                component: '8o0m99ds8lhiu6oww5fnlyawnxn8l5rbjp321c8iovrzhw7jp4sc36olq0npt1wrys6as90423i5dn1x2v9j4ak7wi1mfc6g646hib81ft77yzx9wni8k4rnse7w5izrpjsn2h8e370baad7lh9v130u6koxrk5z',
                name: 'utpzc7qv9m8gzeii1vnwr80go5ssi9yw788ipjo9adv9nf6bdag04vqpzvva5dmygoemqgtf1kyr1k8xe4khmswf2ka068abr003mil82i6ve4u8iu9xdsnjyq4sfrc7i6gu4i97s0mu7gsat8ngriffd7jjv55a',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: '7d402qaq5jcyd11mvmf1ufl2cph6u44yhah8ud7fl362r1kwx3uy36okge7ryqtpsuqnyn3a828ex4ht2qxnek5zlkcusv3dc6obxdx92533vufxdi1ciqhxsl94kzr39w9ia7337fau2rz870xhwz7czom1f14s',
                flowComponent: 'y4f4o1z7bkyfe5lm3rzotkfth1n1b3fwu0rxs5ig5lzwvaksyxbrwvi2q90j66xndvmdox7kbgai7hostnjhrm9bwyhiwuvn9taeleyqoxn3tegh826qvqg3idy73p5hm1imuoe09vua196bx7kqey312ycm5x4k',
                flowInterfaceName: '7aqxqk95n1e57fi7ankz7h0c1r5bqhnlnl7dtca23gt3hqzmxjsd00e2plply12n62dj2zvdqrlnf4aiwqm25b72e5i6dq8z8xuhbhakj8l7fhwdnuq5jmetxx2cxqutk902ptrxo0y1in8q14vqracmtkug6shu',
                flowInterfaceNamespace: 'yfo6jjh1hilkvy03arebj0mpmijkw1g37ytw05poo14nezlcs76e52weh3hmpxfdtvdeoxl4v4kqikzwrggyuzgk0kelilyu4xw0pa4jg4ydlaod3f4p0hymxzn2kerj36nxeip6gxlw53ankaap7orp28n0azbt',
                version: 'u4jf84wh8pp61iz9axu4',
                adapterType: 'srdkhrm2ixqluivt6wr9uxknjvodwujfe9fq8f8uwsnt2f8jvroi70wjw5p4',
                direction: 'RECEIVER',
                transportProtocol: '7m3mn9m1yfkf5ygbrt5x1z00vcp62i4c9tnof31zq40mbvp8fsdz3hgxahk1',
                messageProtocol: 'n9orobttfsj3um1yjvvpera4vmb6nvguok3flhvwci48m8cuwns8v2qmv1gq',
                adapterEngineName: 'etmfk3nrfgfdzp2e1xgk5m0jffxyoyg22mauswnx5t1culw860a0o3rwyas7u8333lfjiqxsdp9x111how2xvjcjh5oug7st5eqg1d3ozhf8l66kvs8d3ate40u4l8xpzxtncxxa41a3lybhv31rha5plj4qu5rw',
                url: 'iug9c099o2elypexgr6f6xb9y3yw9mxp9lb1y3mfgah8w9z1dwsb0juim7hkb28olb5xzms3ubbsytx4tssy0avn0twu049usz9o93idgasxg46t5krvyaa0g9mwn38e07k7df092e4ah7829pohajq727o295c48lwjdsaktujqobyj0pusek3e91zqxmo5oe34656jk6vnogpst4oose9w3ajl0ekem66w3fctqfpm2i9kzx77py9mtgooj76sndacgl2eb7p1cwvzqpkkj69rp1x2r4wuhn66tkygbml4miy1fiyu0bvssyg2n23g',
                username: 'a6g5zr7yvf2j2km21lf9v3d2n7cxxmq5ri4eddg5wnsz4n4m92ox96aybssl',
                remoteHost: 'tdn05zujs97fxeya8k6mvqlul6i0u9ryx8hlmb3wdngb9c78v4j4i5rb6ex6kwf76is6y6ouo5qiq2rypvdy3bjq0rkfs9wm79nrsymfxuxqlkrpbrop60ztbch1yk8zwn1n0sqev21g9xqzxwmhurox408mmgku',
                remotePort: 5763952598,
                directory: 'jf39t0jfnvz5mvrjbododcy0k3ci55a5lecykqc77rs6b2e50gw86e5gar6u5st95fa5gu9eeu9l07m3rxsq25eneyfu4bmxt2kja8ceskxjznokclpp3ksrjmqmm2k2t727i1un6rxm6nd3ler3j5g0kjiannaz5rqsa2edj3p8csmwtd1mxg49cpn2tnxuwyj378ih68jev3rvlv4i69ndfpffbaqrqgjkg1kqekxc1jko11ksaju85jyhss0rpkuj4vpalr7u5gapyonq80a6i1ejokherq7ote3uvdydaddz7589za87v6w3kzb594g3vvmmwr0f6302cfni0cb3uhzjxcrkftbgnjfbaazjpivku2z6olild4b4hjxeotyvqh3xniir03s5rlvyb7hfjxscqfrw72htqrt1kctfx671jja6zx23cs1ebdx2yx6en5hd49v3ze6efucd66zwf0rq2lgt3z873qrlqh63vzknjvzq4kdqesgwmu4d4lf6kew0m4vhg59sj496yzkqvasr9rfkjb0c4uartibuat4z0jvyphot0zenr7qcklvstsssxksy2bzmri2ysksg13sjw1iys0t8cp2k1r8gdmg6tz2hq5w6urs25z7sevaijsyd9t6hzvdmj4fw4154g1fk5uybc16pas9jzccmy1y3y0m6zf3yf0571ud5kkxamjtr6ki4f2s1yqud6u0wxoromwua6h9ix7i7823si8kc9lwheo3zqkc9lus0yldeesp8o3mhkuy3s78dc11k7rup7on4cseshjfwuz7ebb3s4tz9ox1v8zu660phm1m3mssfdarqufqtm8patm761k9zcqcslpqp278z96t3tcam55xgocilk341gypvnokbik0638io7wdpmvrr1y304xu7tcto7wymi30x13m96gbkci39h3ac9djbk98beuij0knbpc80wrv362wcp6nc5pbmzszi4nmm6oy7lx1c3axc703h5uktst7j3tzi',
                fileSchema: 'dgc3sf0xmxx14fdpcrjf4u38ludrc2mtzd3e4tvmq0astv0irxf1k8nbumzingv0y9t22isqje1vwgplhy8q1uhq11mqmdqyijbf8tz0wkkfhoqp6qjcliyltxiw2whrva514l8g254xj244rn7i2j5e59pdmli6ryc1uo2hpejan1ve1xiikmnjuzqa0szcfl3gnqsg08v6i1vf0mk2xn3ywyp8eic00y21h0pa5zhldklj264tf0d7dxtldw53tgrhlm7sfaigtwj5xz049f8j1e95um47iv8bwstqaawjuyqy7w7in14a6flcznwk87yieia79vug4lfx663m1bn570d5xgbbauefs4i4p8aqh5f9ag1hgaswyk7yux43zz0inu28iiqz3n320sa0cppjgr3snr0spaf0zyu168i7nxr2r10jhh066yfiwmcmiojrjlg09tjgvls6hoj915tyv8j5omolqi6s1hsea9xvfre33k6w7dfxri82c5f7y2rfj1xsjwmrdkf5fd4dj1b8zzm1mjost2dyv4e9dhb51lhgl7i0kz2uwcznr6iai9fmqpjr0wosasarqp0kjfa993oas5o8b55gmt3ia30xdtt2541n71dugiyuioz99txn0ayvexpa6glse417xhyq6yiobi1779sutuqyecfo6ptyn3pu0ve0ejx24xjfpr1ze26ntu116ckhezlt6zxe5kv56fvoka7keib7qn71omucp8bhl3ujnrv8ipvx2fm80kwqkk8ti0z2cenu5thnie2q3owqdeso88q5mk4o4z7p9i0skktez6q3kwzyrzzcyaxzk6zeva17kaon5ab43wq9zbz2dadp2qe25ark6jwbqwttq0da97lju4hexio93reafvgdoua03b0f1yme4w8k983t26hr56a7r6fyjfdx4xpq5zknxszgpmstm9oatz7j0hj6o0nuaxtzj6k5uwr64jx0448jzug7l731o0by4jj6tghx9aja503v',
                proxyHost: '4ch98srlydq9yd7hesjohb06mexnhahledu7yflqw97oxruz1p4yzxfce6d8',
                proxyPort: 8100726453,
                destination: 'vcb1zp8mwkktkjsqyyfzfxg5mgrp9ywjj1h7kzxaxjvqm9t5nw7cx4l4grsmkkdji972gvg4zebq7ndjw5a0ct7d4lgk9hgfbgbci858a03yfpmkvj41yc6q4ysyjsu9jdmggcir136hrs704ylylafcigpm424u',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5puqtmkekbz0y3bd85n9urguulakgd47e2ee69od502xtob80o40gkrs7annwbf0m3xt900wb20rm6vi035gzjf3ew5cxavt33zfs36bx4gpejqc7hgss423vvk04f1l4qpah8j74hu3m3oexlu8l06vwla6gkkh',
                responsibleUserAccountName: '73tn6eykfve9jpxx55oe',
                lastChangeUserAccount: 'y5jxxo0p66mojf0ezq6i',
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
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: '5gak2pdwky03j8bjar6embm3kv5a1dqfi4qn354b',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'r090291gidpktxfh98nk4e0gwejc5n0vbu2mnc0b0zoxaaq3jk',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: '4vzkv00typbklpc750rl',
                party: 'bdjt8uwih37zaxe35br6t5y830dnsp5xmgenmfc2hjiwo57c0495y3mt2za5tddd8dgkbo668ylh080mr6czfgq9xzfefdfukoxs3tq2zw41p72j1y5781vc8yy0koncow054fznrbki1tfkd6vf7tnactmx12oj',
                component: 'teqpgd5dqqaoal8bxxkrechgspp72aviwxac8on8hy4be15orh2xpvbt8be0fpxa62jkh6vjvsogjdbypieeecz5ol3jo94h1zupzmtl68nkk3wifm654fev9tk2prh0nc1lmbb6x41lq9uncrndc4lr6l4nvr9k',
                name: 'zdjeh5uh182javbb3c79w60xpt8pg6o7r18t7n29ao4xzfbojp8xbepqlkhwno0k7ofvsugdotc7gldgmakww3w9ib5j8xtczeftqw4b5u6aidindpxnw0e1ca4lw4nw2tnkamu32dvr0ov14v14oq9uw57vmpp7',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'otetoygar1q6mmbum0ogpu09lbqnkapbmu0umzskn4x3g4cupgaazwntp6fk0uyt8uuumuo16gjoni2sa8kvj3w9ysdj5ytwmscmsmzijsqc637c0woz5t590hgc0nnunmhobxd8deupe14c4yehwe7ig8dq2brn',
                flowComponent: '13ewmtcbofz92xwnncune39mrsd26ljvcggxaoh1zqf0dec6yumkc7wq79wh3w97naoew7om41wuzar6cnnbeuzf3xzs47oth78i37o2hpbpn2adnyccu2d4xiw7gk51tlpoaxo5ok5zp7pnez0e9n36keqmr24h',
                flowInterfaceName: 'b2tg91ncnoap4aurh0a5wis50r2nd53g3fapl3v3f76hnjyvyo24gcqsmw1j0yyvzzgyfdd79gnzjbdw0gkgjbqr8a5gx4ps40phla3p1y5r1cg7f4qzk6udqmqyo8wy0ffohegv6h5urunaxsj58wgmxd7ys0et',
                flowInterfaceNamespace: '7kb3v7p9777qm5lfh9r6pdiru1y8aatd1h0xiil205x1ag8j41pd7odrht8dep4i0c28fb1nuv518spil6rrsofhpetbftk39et9frogm64ek0g5j99o6v8w0wgv4ln1143n0ub18b6bgw5s6tiqiraebe3o18te',
                version: 'zqdonaipfehffv2mqinp',
                adapterType: 'apjbru691jahdianeudh8b8yf5mbq5iyu1rlfqi18qrwnvq72dn5yqubc8or',
                direction: 'SENDER',
                transportProtocol: '8sjvfitjw79ysfu6v7bgrx64rt6g7euhvyuuaqgxz71wo4uytx19hqkdbvdc',
                messageProtocol: 'o3mtwjann2x6jv51hsa7lifq0gq6wdhmt3jq7187l36nj1xed42g7wsi9340',
                adapterEngineName: '44aujzaz67w327zh7e9b1hgs25i7a594hq5p6qt4mnjdpzq7duq2rjjcjmbiehvsrjcfsut2vc2jykd4s5u7hy93dwf1se34kvlgiup5490pvwdrxiowzaz3kupl3jks15tl5pumfy4ftacrf4s71s4cy4k3s87q',
                url: 'hd7xls8lbvq621goxn0yaphm51vkpcrmtdskd25qtan1fngl3uai6aavt2ns0kbl5erhhwctxp9098hvtuf9ibuw4kyjhew8qimho0vyfqt71zg8rc66w93d0a1hd3tl7mta0ck0motz4z01d320142w3207cgynsf5zimoex32ch4aramhc740d6japcepghlwiv6bbbxmpczi5399g7kih1k9d9ruzfdgvmam3vh5l4u2xuspc6nxj9vfubfd6wm4kx31kpyh0wmmvbitadi9e22ar8nkzjrvh7lrenfocvq19w76jyffeabn55mda',
                username: '43ga4vz5r10hzukxgoltbjffqp3oucbu69yoax4nb0scct0l3wh1f4ib5czv',
                remoteHost: 'i25qotdn9rq3cozu9iw1xgc43vlt3ntbukquslvuhw6v4aflv31myk33dxrlhakkm88tm9pqccx55xyjcr1bkizx0boyj1us24hxu9ezedszs8s3wgygjqtguvehwxlq3gpyuybpb7268r6zhvowhysdp80jtsjz',
                remotePort: 8915930095,
                directory: 'kntpvwi8bvhf7ughl9o9pt94jkoye4h4ehrum95iy06es5m1gugvz7d1fpx6v6udd7xjjmlokmdg3csl8bx5bcendp0i227lnwdj8c4ffo9y9yvwbcey0nvwxd62rfqzb591vbc10qm8m8vhipyuov04x10qzbbhqfnfxgzv4dg18vda6t1cpe9fbyzj358jthaqro4yrjchjfwirbptjfg1a0692uogt05h3x4v3ni9ljnrag46xg9icj28oq8ufd1k2ffl98gvtc96kfnak40no349wsnrmeti527x768x42jq0rs6ed03di182g8fzx0riqxakjzj3jiiyhh7a2ddl5s30gn7z40tl7i5dy0mfdxw3g8dx88grs3wsqj2h8uem7imolpab8biblwvblh3dkht9vw2vm2gp8bvmjuxd4zgnr8hco8i20rxzk3r9xtju7elv2sry9c9et0fq0jy5r6gn6wbm1ntejhl8qtm9kggkdtemejcj1fnd2zgxd3ckupsrbfqn89bss4qraej6c53fkil5gjffemz34a38bxxayciqv2n16vd53x6a61yeeocot5e12atnowx2m9e6jeynygwwh0zyarkd2cuxjrj1kwioy0srhx8m1vnpb5foojeox9wkd2lm62y7zsidghiij46s7mxv0znpa68y7jgx7uq7kxpxqn7itdwk79mldz2p3eliu38v4p6bxsawdic0pgxya5yseepw5dswete2dizhnaz1cjgu4u7ku3xvioic7tg1hycjl38fiueq2ym4c46xoc391quk0rpjjlvxk1gcm2pcrhqoafdf2r43wsfewkqy3lb2p554qhxgdj5oitbwwa1y22p8pi7bbtsmtxf8u4tep9odoue6azx9ypd52vqdlk01w1ptyfxuhncd8i3mch4i947ugngz0x8cppwkyjk8pzcydonafepitpw0vrgklkkj3yghn7somd9z0ca0lzb1z4es3i6jplxh68i0f3k7d7u1v5m',
                fileSchema: 'uo1m380yz4altztxq5ukq4qed8x64nee359b8dle04eh8uzebuo8c5fnbjw10i9oafdzkrgdvjv238wsmznkot6m4451i4xu6a2rgmz7ussgy5arvhve124i4rb2oph51tw5h49nnh6owhceeabkm8bv9c29l3eosviow6loheoogihkar3rlbq9xnpurqkfixyuts8u8u61wcnvyljqg8bnod4u6lqkofakgjwhm8q0e12g7q3b57j26r3iq8r9ypwkmo6vcz1ub1qi48vwtm8y4e2ry8tcchn9aofb9e9yie9z1g5jjej9a7s5od839kqqubg5dbw0hd1n8p1f8w3nbymf8l1jvjwv8qzcz457d0a3bxn6loj273m7ptu8ba3l20mz3uilwzmysguvqgkv4lhn5k5qppsp4respsdy2arpjdl325liowfod6a8wuejs5y00zedt07kqpu6592btasc41hz9171xeeipk05215m4hml0dq48awgmpmku5ddm49r1hss91z0hb4tp1lfu1x9yhe0zyirqgxb9hpx7lxwkbefnq5vocl5qzba1byuxhaaj6oztnnpdpoxkqsiqxpn5g47te8exsmj2aavglxw7cfoy55npmakrwo5rzatfo1hp16jyg2nhylx7a60b407fsel5re6ym02tjn36ajmpt2ieoc3gjizalh5noxkhnmvg206eooayg2yilowhf8m5lp1q5x7v2iaim14fil0a3ubacmndoi493awxxjuu9jkpxlb238l4ldumdnl6lrmezdl3io3wmigvj7djznp7h49ifbi0hsab35ib5v46qi64lqmfbpgy5cglkaoxo1gt9dwvv9zixqslbvd4vatq7mwbyh89k9w9fm64mominovelipirsnfg15k53y3ty3nesg3j8kwjkk3yrgl13eoixfzsd5i2l5ws7bleag0i1x7vnaq5wwr5gwp4c4e07jtof582yfl6a4x63hyjd80cavxkafn47sjlwd',
                proxyHost: 'ic8akve3pkc98lb6rg6r87i3kxz6ys10xtsyr24c0rwrbae4es5plgw0gvxe',
                proxyPort: 6650323469,
                destination: 'zihuq962fzfrv7lh9lhidr54mb90tjdhpfxvjbsrp7moh2hy24i5khy0am821zxjcpclek4fq5a9vsdlkgl4b760bk38lftwq8l3zbluw5fe67vsefbeq9x99ol46xwvh380dcgsqv8g2yhbg19a8bgc1csye9um',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ycjuzj0a0h986g7ltrys2ilsj1u3hvsvbgwwlpzm2o9r2pcwwx6tkdjrsa4i9aqioodi5wlhe4v14p0pf3kjj9klcoapgj0i3f429vipuh8sjlv2tt3bmeqojaysrffahd74i7comc1tsd4ancrvqisx8qan1f4l',
                responsibleUserAccountName: 'zaf34nldo9slo3zz58wq',
                lastChangeUserAccount: 'dtixnlfau45rqriplxag',
                lastChangedAt: '2020-07-29 10:29:08',
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : '78c328a7-e8b1-47c3-9029-563372c9cc14'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '78c328a7-e8b1-47c3-9029-563372c9cc14'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/78c328a7-e8b1-47c3-9029-563372c9cc14')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '78c328a7-e8b1-47c3-9029-563372c9cc14'));
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
                
                id: 'b94f7d4f-40de-44e1-87a6-20f096c4d8a6',
                hash: 'oh63jdhwum2xk1ian41y86hnt50g4ntcs16qruyp',
                tenantId: '303ba10d-0949-472c-a764-87952df8c0e6',
                tenantCode: 'c7ntg2ok7kgdjglmohtzw46x2kh6myxbp7ol5pekj1a2sozxis',
                systemId: 'aeb8a377-f536-4482-a101-e245bd7c7eac',
                systemName: 'aejbntqqnez62d1p9dbe',
                party: '455r0nzw715kz8jc5v2kjxn06ivt5cm26zupxtblg80ojf45tvu1okcvvq2kgrpek4mter48kkho157d4pq3xbk8090eok7s7v2z03xy90rb2diox54zufb27zscj0sithjcnrw6f3ywfrgv8byvmzb3sxwhjal8',
                component: 'h7kwa3r0n8ym5q17asxws8rtqrnx5j5s1z0a1bwyxq0xhaxnagciote06a3mms9re4vepetkdprroey4brvzkpfykfupbnuvqkzo02wq7gntfomsw1oxy2dgti6tfb21iazf7prlh3jjibgxaf9t1elvlni17hl2',
                name: 'xlieyu6yqsff09pnfbsc2p1iqk1mykg1ind0hwwf4px7821cvuvj3yguha97rtcdn1uguwgq3vzlymlzdnsjex1fhtb4hp8hu9661bzpsfgo6369hyvw0f0poz2yhnrxks6aua7o0wqfil02h3d78wzmgccuatbo',
                flowId: '108db35a-241c-43fe-8522-ad7bd948c314',
                flowParty: '7ergilgw6ok9jf8feyisp0jh1cqv2dpq2lxm5a5pacpf6xsgnt5lud0o7o1q7jpcni2ghfg057y8llfiines6knkh623bzbi0i674ge0z0vpv8zk84qf54esu7ewejurti8r1jpmbph0q925x2yob9ku1uju0rzt',
                flowComponent: 'q2s1nzeh9vhv1wqi1mrthmyp2p808ndhz9xpkw2nnhcgee25t5g08v1lrxmjp2payse7rugcjxnlax04j0i6fe486v0w8sp5c1opl7jepmq3utmui59xruzclccm37ql9jh5rll5ldg0vtsgh7y24q1q4d60sy2u',
                flowInterfaceName: '6ltccb3wxtmysum3x92h1kcsdzdnx1jh01het2zl6828jas1ovqimishrus0zikobtapyzqffbu4k3daqp34pyel5viuj1itb6fga3qpdn5urgha6nf07ppa9wviy5lix0ka9tyyzedxgcdqi55wf7mdm23fmzqg',
                flowInterfaceNamespace: 'hnlbdfzk7jcq4xnus7sjs7eru25hfegunnoykyxochipm4s2w0qwe36gb84kaw0b90y6lrlhj8eeyjaydtgrtiuto47e3vb820waub3e5hflv0txlmc09qrbkab814e6shzh84monajmh20uw1f8lzpvk7wtryte',
                version: 'qh2rs4bhwp18r7rm8mvv',
                adapterType: '88rzshd822ewh9o2cnif49dnd9pi3tseamwb99k0lmxneo4itf8bbsdnv9lq',
                direction: 'SENDER',
                transportProtocol: '50yypx9xw38v3h6ehl8fwdkrgkw7f3fboxd5ilznj6oj6pz68o4hdph4wdmx',
                messageProtocol: 'blqscpj59gzs0babuxj1wsjmivexdoeyugt22jva2zx6janx1izxeh9t57cg',
                adapterEngineName: 'ykxrq77h80h57stakjswjznaeze8eg6obkvgekm1ndzmkrev19vysoc3cvf9a4mm5xcs7mls7mcjwnuyft3o06jx46stk9l0pryh8kibdw11hxe9n2i7ed6kr9ekcyf5ek64arkfz3qrix936brfi019lthl3qis',
                url: '9iobu8euegn6p0cd8nygpw2y53xtp814rw8asa2rgovoww76zb3aofymil8ifsdynr2w838msjk8kfo9bcdssqwfajgnuxqc2oafn0ctvw4pfkxjxhv1hueyh4z9mwpa64tutwyxxgxnk72x7bawfz3jvmv6ock14njo1kxbvs91mezeztp66moxbdmxdjm5tj53aa5ef4camnosy6ilfzy6fxvxjdp5z5ifq3we8udpfydb0n4144w0t493wnmf0uu998p1y3chuqpx9zpg4yz9d6rsdua5k0njgltj1uu7cp5ysl28poe8lwj2bdt5',
                username: '7y9zlg0unil3fu2fh3hvm4ieaonyeuwxntb6tf7pd1dfpoi23lml68syhbav',
                remoteHost: 'zhhl09ohrxlxgom8xggl3zxh76i2c9z39tvt8ng9t95luff66229hb4ckqswmoxkgx40o41b1j364wa945ulk2vncdbvfdul9753tzkqtit12m9ncofyh8626gryvyqe2qjdz2vdzr67tan40vz8mhc1g5oqw2e6',
                remotePort: 4095933879,
                directory: 'ow3jdw7plxbsxtusnfzgdik75meco178rabw5pwzd3vi3l9j6h115elkyqb913nauv85g5fzjpsxs781wf6nkqzx5qv45mvctvxzg0h3s7t12rem1iv733gffrzca8vsfzdigp237ggydz69wd5dpke8gzhub6ijjri6ufs8h2efz335a5ajtz0cvm066pnkoe3t5ldmyt20modddgcgq529cyy1755dq4qkanjktnyn8tgt9njvmzikrs9augb47a0mvzu5f0515o9w78j8aildbi726y7pigx46bo5hj7cqdhjtrbw2vvbo84n09fntv3w1ny6nk7gijt62pu3twhg15ynql25ndw1trtrcqlsua3e2f4hs7sx1qyyqnx1h18fwldbaxt1q4hrmcg4senxyg2b96nj5zvpekzw3ttwltja79tkpw58wa0lkzq71rtatcqo96nbemcs7jp5rk8ufmeo2ftnihasbi86h939dmh2lo2nnaych869ef49o14vhnxd6e5pr8kjqtttg6atqdegryj5322uax4okmpkimx3nq06uhc8ik1oa7zccxab6bh6dj77ystzna8yd66ksi10tv64o77c5luebzk9qngzvzjxfqx2f0u1hpw8p5fipcefiefaopkvn3w1iygczwh8tqmb30vbujaxahivx003mk5it2udaivro63ahhl5iy5609ohim3x10h6v299x65r66w7kjvtphzofkyx12tqfs9yajup6wruiml0nt4gi1udqxw61oa8ekcp1cjj4z69uwtpj1eykujjgua2eznevnoj3ickqxii9trjbmx9vr41wze652d0ldavouw2xg7dihc2xk87jcqcrrxwleknpwrwrm19ctplabdmnsaku9um9w814k92h7i4j0wxplmaa9y5jtqj3uc69qp6ewp27418kshji9xdezikm6fmv8l6j3olwx3phc607pflxc4xhbs35a5t5ow1e0tqk4ztan9v8d0ml01o558r',
                fileSchema: 'zv2sd9bac2q5nwuk05fx7mf5om3jp0fuh6gtqyh1n2nkc4b7xlz4fovd159dns70icyqcko3llltiwwde33w22swgc90ajitomo1hiainwos8db17lyjp3z9xzebd2afw32kdxqb8cu858iol3x0dio47a2lr9rs7no1eanbtknnqb21olvj2mwmqql3w8bb0gqhf87v9wcetguy4vm0t4vj04kdfpvkjg6wqcb69qb4379ratyuxdtqp2xgr78xn31z8mhz56n9rn69obvvejz8rm23bhxt6mfz1vh9elbclt8d4krbu8o444l1crqdir2vg641p1onelc2xrrzxwo50xb08fd4kkki0bmq1pgv6lszdm4bj3uxg1z4r8flll2mexf787usxqb29dju7xy29lde5w0n5v8ymcuca3otgbaxjvb9rof7eki0ibhmzevn0d4pl0364wbbdoapjv6ksp39f8twcojz3pjkae4qnoid4mjj15h16z5n3icqcnhhzhqciubdebagie1x8x5jyjebbogtxd52bf8ak5vyr8kqj45jymzbkz4oa5et026386vr8581pz38mmob5de48keez3r2jqb7z1frgd8k837fdsq9yx03he1hxtbdgks3tid8wnv6i0lu1u3gxzdkc65j226wwkqmxqb93kycorc4yk6nat9y4b6uidayk7k1ar6ek72nzq9c8rmjk2ev6sax2vdpe50w1v5szivp6ql1aposm9elgap92tfv3oxjmvo6tf14y076670qissgyfe6vcro1ens4sancefhelv4dou79ov0ck4k1uigwz73lgoy77usinyncesvbhw5qdzpzt8ctw9kmhpd8lrgd2plkm99h2hxtsi53yp4359vm53iefs2bwxuvh9zi1sv0yg2ut5dg2jsa2vhdct86ox6ctxbwl1pyj3iraa711x7bjzofqpyrzm6h7vnigecnu5qhukz8werer7ukxhuegzp9933fz5bzspas8fy',
                proxyHost: 'fvrah09rbhzfdy8lvuewl6lfpbs9653ubef0rkrlogqrzuaec7dq00bifj01',
                proxyPort: 8924209122,
                destination: '695w39672zmuhqfw9w1gutcbmbhzk72a5l9ocyb6rrg0v7b0jowi5khxs5f1icrenprz74w8tvdx9yqxg31sgmt3i76vhwko6ogh1a0pnlm6xswnrm9w27pqbpzourp3pg7izx13cnqlgyozfl6lrj8897n9jpbo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4ghxagyou204g91x1wqh1k3gx5deb3x2ty6evudl8saf818dxu5pc3ehkiaiei6l25g0hyu7yz32ecmqm19mzreshknt1zk7mh5wgtwsd5i4rwc1heoyp39t7gcwrb7wgfbeuqo6kmjidbi7ifxie948pna9y5rr',
                responsibleUserAccountName: 'maxzs9otp93n0y6x9d78',
                lastChangeUserAccount: 'gup5bmtet2asr1mbfqxx',
                lastChangedAt: '2020-07-29 12:53:01',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                hash: 'f7wuw6g9cg0upzvw6i0w4xyvv1y39curjmai8t0n',
                tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                tenantCode: 'rnw4fu0d2yev8k5waofmqlhbpkwj01chz33c1x8g0as7b8n63q',
                systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                systemName: 'rg7jpbto0xeur02oyp87',
                party: 'jt31j0cxwmafcksx2trlo1aoat2hihbpfhsu8n0g674vst89388ejdpyf2zhm97pt6g8ove7wu1q293o1tmq28i7d49i5et1fe15qbttip24qtw759vm5szyzibad5qc6qqqatv68imacpe418s95nigb8w2rspg',
                component: 'a74z5i6cujtelokzx3ntt8w3taye19t085j5pdmc0mtmsty32xj2j9yzeuy7ltjato511z9fy4spvsi9u7ilxo2n9ezmem73whx05fkue0yk6kavqj2e46vth98ij84ogm0enjiaxrzt7qloxssgbkz0q57ypemw',
                name: 'zhttayslyu6h41qwwusuxjtw237yjw14hstqx12jj6m9vjug479qi2rv73nbbsc6xr838kz4uc5eqlbufu74y7fvs2hid2x9l2f99sqbhhhauuhsrgcej2xvwxi3flyxsf2wgsfytb76bpatqrcsqe8p5lp0sety',
                flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                flowParty: 'rbvkjl3fkrwfzkmqbrbcahsybru864jai15fryn3coe3wmv01rb16mr9lmyl6v9r25eqvu36bqahwcw0cye740o060bf3zazpdiqhsg7ahtnxbr59m0vst4ow8n38tjxyb1e79pqze8epl12iw6k1fhskq0ycln8',
                flowComponent: '2gy870hyasir6842twvl0th6xyej6ei98rz89qhzsegr5jn3j085qia3hbhmo4x2w9b0fc5ev8law5gchic2h3118rzsl7ysdy4kstdl47rwkfxvo91htr7y8lcx42y99k8mf4fm9wdxc8v1aka70s1kr1farxuk',
                flowInterfaceName: 'mweh5s76rh9a8v7dx9wrdrdyhjp60onf75qhyxksj9fu6o54bvglj42pl8hof8ol1sc1h6mscurcoti402rg6wy3vfjv6rrk75v0woshqjt7clmrw5eiutqbwrzz21z01zaag3gl6wetxys1x8984sv5g3zu7oit',
                flowInterfaceNamespace: 'bq2jlpx1lfjnt5v6b0m75p0db1y9ojyma8ebw88y4e62zvsbu54cr8x27ch99x6l4tl2g1nkg54i0vqa04o9kuhcrbnanxw6ho0rxo2xs174fwyw9qvtockvg31rv0hdrz8o4ura6247apoqzo9hs2bovumpod74',
                version: 'xtjmsvhm0odqya93no2m',
                adapterType: '37uc1t8o3jjzlvzdv13d847intziesph3qdsfvyrf4thvzh2e2h5kr9haaqn',
                direction: 'SENDER',
                transportProtocol: 'iux5iw208jwzfleae6knsn070o1ze70e4ai8l7jo35kh44m2bgej54yyc5ok',
                messageProtocol: 'nm9alol2uaia60luc8s0f32gmuccb3ijoqv3o57zyjbxvlvwbnbe5o04my8y',
                adapterEngineName: '73su1ey09el1nl8383ide0qvaoq17jqgqwq556wfelasq9j11798g13wn88ib6ha33s0bzc7mvfivmn9728wtiyl1yu53r0pool23cpke2yd3mstulm6dh257vsb6bndqtennhkajs6muh2f534uflg4bmc29npd',
                url: '8ltrgtd0w562kkxesm2c4qvybssju9uqk0k730y7xe54lmjp6mdnxl9f3gtnz0zwfm0p6yl59d6v3kiyvravcdcpn0xedyubm87uptd5qhanzugee33bcz86wjzwcbehw5nutza1hg6kli532z8h4brkvyzz9y4dvb8zia382cwptxcvs0unf4mcmocqaphs8q31ryl5ho8k3agbw101zz4lc2z7lo89ftblkzgqejxjmhya34jz2617v5tu22rt6s1d9gikaf8dxdjs98sarx1qb26m99g265d39hfc92a2k6g9qgll2uj1ypwepyt2',
                username: 'ywfovbb80faiyqk3lwub6rx227ogszz3i2g8o2b333x4dsjs5rm959y6fxa3',
                remoteHost: 'vxpofxdbsredhefpfhftmthlbpf8uobcpibdlijfku4nqzngtd7jnxg8sum1m8scnsyr0qunnorym003bhezvn4kwc52t3gvlwyrcshh44q5rfo5lmoqfc31gpkskiyi4tp0ylti427piqe91cag8t3ba519itlf',
                remotePort: 4374367732,
                directory: 'btccm0a148e7z4jqxzsmrh8nelcckyyduno030kxdazas4qf381smff7kjlco1rmw9a6c4tpfyqknwn6pp25qbxevuykgdbnrx14yjhywoxw5pgicwuanfceyw90v38xrdp0fcrphaj5o9oymxrncik260mp09dj5vyjlqf0brdnkl7jbvrhmi4psii71l0ix777rwb5ryowub5aom2ehua9bductb30by5chmgsal7wmwkhpujf7uu69pfu09t2tj0vanrdgl802m9lu91e9x8sldqylldmcbzuy0a3mn0whyjaed0bt4dsiij62x0huek0pk9xxnenvtqdll3ng6jx9l2jbcq8k2wxom6woewodso3j11nsu4c174g01ajttu5k4mikzkyf9ws5l58rvdt4p4d1o01k77sffxr7z8v8eqdhtzdpazp4suysa8c1y23v4obak7ji40oy47muuv3imneapei9d7xkavevejq0imeb9rqi8pwmh67ol115xg9ozcust79tarxy14oifdvz4rif9f6u4a6zez3be17x6byiln7mpsdwt7rpk6vc2xf7cyhk5cxbnsxk0f5h8fym8fkz2j59fe8icc4n6mztygms459cp8lxffbfv7v1kaib0vuf91zzswsszldfc8ili9u7vjgzcahj1ttw2nywydncmq963tuslajirco31c6tj17de19au0d3bftdnmp5nyt0yfmpgcatntfbzdpcf7hhiyaayn1v29cm8km75t5pb4p5no9fi8p9607mzz9ejruz4be1kzabaesswzi7if4t2ssu5kjtmy016slvajs1fuz74388zb97vaye0fn0m1lbr0t2dsfk1a55a4k8ie6ejy55q3erfyc6vne9wwo0t9hnz3dcdi0kw69t4sese3asmb07tmi3owqt4s87fz40d9qpc68pisgty31o218qgoy2fqqmv34eq5szmhyjpo8ihjrilze66qzjaddxr8mc5wq03wr6dminsbx',
                fileSchema: '9955uydqtjjmw2r6ruxam4n16vnqdpd76qnu91da0ngv1scjthzqqx4k6puc2rfscoxpqkxrvb2bo28o4uffv77hkckcr5khtmrnq186t8ova0bj6dbp74hjdk90gessimge9ikzg8csomjnl860j441s3ocer3r5jx13t07lccmu9jwal8ho9wy87hnj8vxzgcp6d22t2mncvhudk65ai71rpjrij6q1lu5zq947knfdogd4zfe77flp27wsxikdwvtb7b6qs3s5f6zcbawkdo77duxsx7zg1mdmcsxconhqlvsirq6nqktnmnhoje0yx36aq6wrsbjsinxr7lyxwbtqpu2f4y6vmhjt2225kdhoyop46m56abw1url2kuv8dkxkn0xuft8otj0qclzdb4izg1cv4safd32og2sujtefcict31byyabsx1xkoe82ufg0i8dst1p2exxa9ue4wdew6nfcznx4wzdty7bvtw6h8qp2p7vivsyky6bocwtxf7eooqmx7l5qvgb29gtuklc3plx3le7b3pkbezwh0q0u2ijb24raxwpw9ha0t42seu7vn3rl872ml5rknve6eb8iegqbs4omzb7s86ad051t8h6dj3h3m9lqr9dx5sjnhuga3wctzwc8icut73w76qil9tey19qpxk9qi8pe7fqc2ffv1jwk350uzyxxio8sput58o7g6ob5zmaeof1iol3r5f73n86jruwhp9a75nh70jp75e1yz1kv1brwe7ca05ukf5cekspfzgjk83fxo5m38xe2gthi7d3lubh3ojetq3gly30v9avg6a19bnqitpongac8awom5mjlo4hftps2wtfhyuvcjf5iuuwj6atfwiuwfwmjvp007j0gqagq6lf3ztktwpailv4ai0ig6ogrdjqnfm8zexwnroea41uf7btf5zg7fms47lua63gccmgqvc6gukmnr9ofewc5qhmn06m00mib3n9eik7q0cfazeienjgye6462ev5v9t',
                proxyHost: 'g0v0m5470xtk75oi9v7ukixtjgziem3j5x1a9q01sisflb6ueik82nhcv0lw',
                proxyPort: 8108208468,
                destination: 'e2rrr5yqoetohp7p31anzff9x2ouw0dzbv4knakia2jm9uzea7eubudggq99fxduqzbisk4lapy0100cnh2xeack7ta18flnxqhif504vu0j56t217r604nd6jd28mmzht3i19gb37s68df7xgjht489ojt8hp5o',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4h3zpujsmtvxc6usjthawktwuzs5n6ywomw51rzuxs9q3neuwtsxsfqh3htyu00adpbxubbz7dc22gkviohmivdmslkni5nczbgb0cm9jzfjyh7nmshxe7e6l1cysmfv1i44t1m3sjln0ql1k0q8t122tibrh78d',
                responsibleUserAccountName: 'yi2e59xpnp886b8kgkdp',
                lastChangeUserAccount: 'zycf3v3mv8bh1hijrskz',
                lastChangedAt: '2020-07-29 01:17:01',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '78c328a7-e8b1-47c3-9029-563372c9cc14'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/78c328a7-e8b1-47c3-9029-563372c9cc14')
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
                        id: '0457b64a-42dd-4cfc-9815-f5d44774a1ed',
                        hash: '550eov1zw46q4tro1c5d8qeezkycqkntkeq8kpmu',
                        tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                        tenantCode: 'z3mhk9yn9n27zj8wyazmxarionqdvabhxkmtc6stdxbqbvdgc1',
                        systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                        systemName: '52rquuidm4u4tzciyh9a',
                        party: 'uutey5ngx1qflboo8immu8xfgd0ijxk2mow753dmw8mjstbx29wjz4wfby5ye5siq3u4tmw69gq3pk7vavqiybcdvz15jf0ukaks274zfmg9se8a16xhmk3c4hj0bqehemktq3d5sn5redz25u7yj11cgzad5dlw',
                        component: 'ic5yoc5rzuquyve6nucd8myzfedguc5803ha4p80s3dp7tr2qj09pln820l9blb3o5oyag9bhs3zs16k0432gxzder8lbugt9u1x4i3m8ocnbowk9e7mnmxzxat8dli5zat1xf8di90gbik8mh1k2bjikb39gdp4',
                        name: '62qabhtt7034zz9g01d7cvzkq9yehqevza9jvoxw9zqb8ws4u08ijcvsbtavdkzwbq3qrfwdiuemlr4ho59xwf3wabecr1nwrltgi6plt77x2hyudiqjmbv13tz0qo9e87exemlzeldq09po9nyna5rzr6jxyjg4',
                        flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                        flowParty: 'vrqsf8gb0sh1fcm0mah4qjhd0fuxr09cvboom3sxbdcu4byns40rcnthrqwrp6xvr1seo6pmioud1lwftt2l5arcskrimcelmnyrox8ky17ex2dg3xrwfmosv6luayepja4er9lnz0zoefslt5tc5upj91eeo109',
                        flowComponent: 'a15bh1v1hyiencg2nowm6o8g8mwdcpae6e3drtyyu48sa7wb5q9805lzd7bpmyrlb5wi1b5k7pjcgz799up9jz3vgg8fem92wbazizsrjza6y879wz8565o35obdosjgegaf8qzbtq30xo4e5kt4rcqj8iy6fwnx',
                        flowInterfaceName: '12ih4j4f1qqg359nv6coimbekamdrlfwbiqv19gswpzftbhgawpl8ak6au0e5tcq2eg0ywvb43e04t1dd0m82znju7t3heo2c5337sv4tbkjcgpol915c9cxwn3b1nhkiebclq3u5hpby5tvsc48ad6au436631t',
                        flowInterfaceNamespace: 'okp979z9ki432a7emjuzv113zdw1sa5gxz0xhgmivpxkcwb30l41sy7kjx2025n2qq8a790hcklouere3rs9wf3u6y3kcijtixyjkdzyisyqva3snq8vcbivwzst5yvo31bryu7cbqe6nz3nvi1u0lfhkdwpvyi0',
                        version: 'bzal6iue30yx8vfj4415',
                        adapterType: 'oqn7eborxb2plgu2cbkzaitn0bjwue0vz3agxacv1xr9wide7p9exmwynx69',
                        direction: 'RECEIVER',
                        transportProtocol: 'r2l06gw1e5h1nry5hevgvn7iafuvbh3zmy3cdtrvek4vuho55tw99h35e7qi',
                        messageProtocol: 'bsb705i7j7p3f1so3ib4lxpk8lyfee3494nxnour5lmt42bpf53d9s1ar0wm',
                        adapterEngineName: 'ftrlkttoi165o4iru86be4reiro3yqo6qccjbumz0pgji2ho4s3bjz71fhccvf41wkidg7j7rfa7jecv84mkm3a5cjqi5ex8z1lddeymxcyv268co8ymka8lrow7gjqq1yq0lncgi33veceede22cebqtawrmtoh',
                        url: 'mrptgl3ktljg9mrxidv4fyxjh8m7e87jsg5jmw55b57dmbpymlw6cf4fay8lsgegwc5ilwc3y8zd9pd2br4z3974ualhrlh21ds0b8iqdacho83dghfnhb8b1y5myjdln4agbi591u9rs3yevicfmib3hvmsjhifq0wrf3as40aqd5fiuqn1dp8sszjkrow21u7wbbnfywjzdkrwn246q8eys52ep7314b0azg9gu980odjexqdamo0r915xsojrbzjzvimu5uo37bfidfiqxku0uyhbvhbm2h6conrurc05xop0tmz5d79a6twauc61',
                        username: 'jibfxq6srfp7hj7qf7faydnio7xqcrosiuuklp0ahdd6n47g1cw0sr0eck0p',
                        remoteHost: 'z10o8rm7xpolm1700e1r47w2fax3zcz6qtk90vjufa0qxucyfa31el3ymyytcusjmn1x3pqm9teqmz3akkbunag59t7kquqdzf1jt4s7vozecwx9cmr6x3hfj2z43oioncga2sco7aacbd8ojkrafca4zyb87tha',
                        remotePort: 5657403303,
                        directory: 'i0i2udouj2lxwno6c96thvjsbeq7p9tsm88jiss2sk53ihymvuqh5ksw6ei6su341r3jz2e6si0041yprhhuwcjc0y6i45gqx16b8lztftg5ikguxzidajsxgmaeurb268f2hnqswuwu2v7sqiqixaa7p5g4j46rlco6ebmx972b2qbbaawataoj0o3m9w9gufxjgn37avz8hhwmt6rqqywljgiaedfl782upc5mt1qvgrzeogpz2zoghckgqhhjal15rquqjwyzuucrzsftcdq3djt3oa7aqyw5z3ebw7g7sctk56n4sgrzld50t04gphfsvh4cvtrm8sgas4xjk2ngy0qaafsannl2z5dqxrcabwlqqchg8429eo4gnqwn5e4teiox1cne3wup2tzaz70bjvn6jtgg4wdxwjmj3w0nfbmhlltuzjjyp93hypldylh4oj0l1y6z3fqfrx8x0seyb60xbdq0xtodfodpeusg8txe18djd9pqgsvgx5p2y1ukk2k56ovy279s4jv8kt5c1m32h19r49t4ca7vaokoonr9tzrgeqfntumacemqa36i3aiwcqxt5x6i00hlh8co450v9nuugdfph24jmovclygvksljrp1gihejxy1ol1qtinz7ez2int5rjl6ydeha9zok58ntktp0hjkwqgnauvwiramlznfofxhhe6myb5p29c3zpfqa0jngsmbezam4pl4sz41w00dij7m87edeu2obqu5fp086p7vs69q3dz3l0c2c716ozd20o2d040tjsvl9ucgparlaai4ziq0ndjg965kkjl86xviwmy2y20kkgnpjtpj25unasxipu1nf7165nsa33wn5t6txjbdu1z5cs8ngetxz7u42xueo7w2jain642g0gqmrvu2x51w8u6rilckdjw5y1idkdou5c3ov1l88gzwmhoi6hqn4wgnxogxsvaehsa6wsnrpix7nrruo86536e63mz82xt8qp0k57wfimqw927hsowe3',
                        fileSchema: 'gl37dvngodcxbg1qe280ly8tcqqatbg3o4v14f3yp45m9zakgal1tu8emuoqf103wqyl2853tby0g0qhlqdn6jkzb4qkrk9084xbwnok1hxmyblbqrc46ym2t8cafltyonq34hccps7mhq6y0h4n9j4dn4ofliashg5ho0ixxeq3fzvf87jeug1yfwlq0ms5mzvu4zr7jpbnkt0iqfqc5t7kab9g582a39m1ulueojm6u89by1qivqonm0h2ho6onz3cko3wotk5jiz8sk9smnvxh807dky7eu2x62bus7yf6klb8bagbcc7gd09m2p9tare2pmbpqg4f45auyu7sidrr9z8sd8qb0gqv0kjx1m1fodbwtscmohkdhrwf1rfwt63hac4xakc57s4n27pgti63agsolnf9k5iue0mq0nvntgo3241ndd17t8g1aleonjz5d8fgf3esklt2bxm95o0u0zyarjg9ayo80ycjidkk37mo9xz5zdy5bo29os0ol2jtuk6cvaqtugaagljotgku7pv2qk4oq48d28kh7icfkaoj1c6f24o17ojrvk5s7ne28ovhsp7c17m3kpkhopa8julojx2xwj78c7r7onf3rqfim56h1uxfaat349zaabpo732bg1gwzwc06rxgdoxw30cpkjcr4trk1r7wswcdl7royddo69lgurl7tu19nzjcy7prw9cjmrqk9rck08htf70tymjfjf4v80o6gtjvzy65v7797gsqodgjm78yf0t0kde6kgxjr34m3ksde2pw9ionmqfcsmthqrni9sk7cy9r5amdq4lrh40c9x1x2zlwm9biw81k6my9yz4lqkay5sd7odalszid9hmlb5orfycuyoizb6bddo5z6nudkn2jnuive1wu1hqa809rqyiljcq0lyl4aya8r385jlqflvjl46wt0rn4i9k5pju2rz81puhui4b2snrjh3508rknngtxzg225um1pjyo272mfk2pjij21bbfj9fb9xb',
                        proxyHost: 'uq20bnquq2r0oqnrrlksfuwtaxc6d2wnkp6fm2eyzkb588tc35y7f32tccnr',
                        proxyPort: 3399431616,
                        destination: '585m2wu4w1i6tr9o8ln0bksddhccyom2ajc1jrz0pse8eog6aduijxwypc9lfrtrf8zvyraaxzrwi2gp9pxzdirtf1orpdsc7xk7jrank4f2oqgop86uf9mgfs11aw5ivcmtx7rt13cc4hijypdlxg8kd71n1b15',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '1r7wca127olt0oya4kfzjrf4aqp0dvc23peudb93apc7huogrrvz1fgxl4aac7iuwy9824y9r549cm2vejp2ftk924zg6slzpov38eq2hvu2tzzty5m2lf02z202z64d18gniwvmd8ihhzvpqeq34gxjg3q9kbr1',
                        responsibleUserAccountName: 'kqpx2utp7bkvxcxfsdmx',
                        lastChangeUserAccount: '45j3cl51dgiavk4ohhxb',
                        lastChangedAt: '2020-07-29 05:21:47',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '0457b64a-42dd-4cfc-9815-f5d44774a1ed');
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
                            value   : '00000000-0000-0000-0000-000000000000'
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
                            value   : '78c328a7-e8b1-47c3-9029-563372c9cc14'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('78c328a7-e8b1-47c3-9029-563372c9cc14');
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
                    id: '00000000-0000-0000-0000-000000000000'
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
                    id: '78c328a7-e8b1-47c3-9029-563372c9cc14'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('78c328a7-e8b1-47c3-9029-563372c9cc14');
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
                        
                        id: '239670fb-1a73-40b7-9394-9ee5feb852e2',
                        hash: '85nckm5hdfrrj5yn1xzgose8k294l6cdvm705amj',
                        tenantId: 'a4ae81f6-b337-4c0e-97d2-1a1e4c098dce',
                        tenantCode: 'o9by473c6nvu1pbrsmwqc3q22belo0eze6gw9p6gsch7anlwo1',
                        systemId: '4b24ae29-4fbb-4cfe-829d-226a9b34ca8d',
                        systemName: 'gdyuy0fga3o5a970k84n',
                        party: 'spxtbnjzybfi49rfwomtgz3lhn680tzjln0n3ds5xyhuv8bxllaz6ro32tp0sri4qzudx29whvdz7vmq6mlwpp33ya1p035physbwi4i7a4c7mdihgexy8q36c3aymvruw76qqwf3evllrqbvwdqmyq86eyyqx3t',
                        component: 'bayrb62ahrr836qx6cxj838syobciu47efyhf76ey22d9hen863cjksue53kbxz754wn97laojlaexzc3jc50yhrbppgipjj63khj03wn32vdqp5hdteycsawykfrviogm2hcvlpprdgn2f3dwkyzr6a6djptk5m',
                        name: 'mc6qjnfgvkg22osfv13c36jjme4csa8dv1ag554d70vccywjbplpssk9zxdd732to2owajaigbefwq5k2y7uunule0boau0wf6xbcwf2db44m0wyeusewxb2gh4tvx5nps21nyrqvfbxog1pl3su8q4v8tj8jj21',
                        flowId: '07099bcf-6a38-472d-afd5-0495cab73fc4',
                        flowParty: 'lk6tve3wos8bgyf29d9znf7oavwsio6ehktcvo3v1nsdgcgsqly9swj70h6uz0dx9dukuvi31zm70gdwm4qgh485x0j15hzyoee9sjqp43suk2rreel744g3vcum5z8z3s2rqnkzrib9kjp4hapqxjsn55gr388u',
                        flowComponent: '75sb4vuurg89sef5mbfarom0aa6llvrypy616er4ywoyl1dkwc9fau4l1236w87f5rln81amr2ceb7as4qygaqrbhw2j55qad8iafk0cifa1v0ol703hqwzs1fwg9efk5bq2oqigi0ynnoaqdt3bjaz7tuj30khl',
                        flowInterfaceName: 's8u21i28xc02get800h61o1l0gjd8qiipkhv6h594qbbfer4uc0c19eo67mov1r5dnk16fotz4pn1qbhbal7edr07hyxmgudlam3d7i99jfxnr1kythbzpken0j2e342njkzmay8s9swn7jhdwlnmwxrdtjob27t',
                        flowInterfaceNamespace: 'p2rpudyzv2c67ncp1q76n4iqyj1kvt6hdefjr55fzduupdqlj7w7ow2d361l1u4kfssk8krlagt14z16t041v9o06d7905cxp3puxt54yqigcso2lolobisxobxgj0kexhx6zpr34xpnzv67uex89xtw9exxmuvv',
                        version: 'di6m8gqdmk10b1bu7ohc',
                        adapterType: 'bxcp9lv2736ca4l8amyalwmgof2ydnpxejvh3chum12g10pkrxfb0ub4lu5h',
                        direction: 'RECEIVER',
                        transportProtocol: 'hekun4b0toy9n36acxi823igv6mpzsrtda4v6kfdyrnbuav8bz0b9xfrcjp4',
                        messageProtocol: 'ppisoxst9p41grt4l5nhxjvwgewnshhiffdd983ibc6r6mcy1qx0ccte2y2r',
                        adapterEngineName: '04qn6epe3iqqxqyf4069izxrpg1px0kddk3nexjcq4nh9rr1rbse9g8foddduvntr0df6fz2hjqufm0m8y625oiq59fklyj5l2cawmaelap40aa99i0a1rlk6h7ba81u80qvgxh16fxqldrxcypuoy5b7fgj5muf',
                        url: 'nf7trpwza85y2uv737wcgzl6xal40rq3scfsdekb2evfzjne46v5x6tsupv2fscztkq3qen9pmwdtd13l46cwgq1pyvmhu28dutisdkyj3j7rhlvhdq0s9wd36b67ahfphh21u3wwalc8zma29ze60d9r7wfkj9dorwsktaiiswb6569hixcmaxili5vpwqaxo5r9upbgr6k3yh5ut790webb0rfd832bqxage7mwkvpdgpqqb0x5pgcw3v3ppify4f8uucye4o5jbueheciobrmhp4cnr04dnda3ap7tdx9cfpvmtbk34c6kfelgi4h',
                        username: 'cqbz2y8pmk9d46sf76p6f6xs39b97q1dy1sxzulcknvd4hqm7y4ci6dqaq37',
                        remoteHost: 'e7t966atdjiiby5br64rwqqbve0tlar3uqr03ve8dkvjciz56az408a0j5dr315g3owlwumml5n2zi6hndlhw4lf4mel28kys6zyfyu0w1l1bz2r37m03kynhmocpbfy5pr1d1nn29w5bl68zv48jar1796ganpr',
                        remotePort: 4828254862,
                        directory: '8pzin2ppaqgjxiog65qy9hvjmqz5al581ib3c3uvh3gxzko2r9z8o09os2jmoif3veuk60i11s4oceuqp7va2xq4kchxql2rewpg57r8b36popkica0f5laamk0gwg2hrmq2tu1c73rhxo26x657vbowx34beqd1ensbzuvsu49t6esqi0wulnuwpq6fjul2p2kx1wg7vy4uvwiyw1pr75d4yqxv39p832kfvduo8wmqp1vc19si4x1jxsvychp4wfrl1lk7ijz4jbzrxlzs0qxkpw8fnlyets351u9cy2q79ykey4cgg6ncxxztcvbr85wi2xlr3dy65qxtamewvt8k2noopmszrbx27x1d7g74yv5tt9q9u2r45j6pl7grm3dmlkcp0r8h5wz6z4592pgr2ca2r85xjwuj6nqpfaurl1io240vbyyjtf8zgw4t9yseqlymrw0cdpnfcp0l4c33pjeojwyheo8j8xxhvqimj0vzdq37hdzy11zmak3e6jrd6ulj76vwajrwkd6yhibksi8u15y924hn65w1znal2bzqij9cy5nn718fi0hv5cm2ts8nyilamoqskpmsncqh6mlwouhjwhdv9nm15d0e8e3p0ud4di40dbeid3wq6jslpafq54f13heetbgj5bb4ry9qlua3cilj9eoes2jm2123nln1cq0jgw3s2fkeo8we9wmg11g6jz4g2c7gezgvvvoioahnrspaxz0168xpz19wxeh7xa6pe89fuqjvzcebkltzj8zl0j6d7i268292yzkfhxtcp6j1cpfz6i37gn38nf7053jhsodx6cv5l3ce5jldimg2rx8b3n91jzgrdaoh3yt023iiq6858rqpwbziuwkl13k08n24naj6d25hv3ggews8pjy051i4czysvdn49i96abpzdd6gsl1bqupk3ti4xewv80hgnm34u3tq9yjle1z7yr1bjmpos037idcpayel4t32lthtkepkoa3vqf09ako3tw51lmpz',
                        fileSchema: 'u1jg15ysl75pp3jxbd53yct6yf02jteyxebsdp8evesfn22a60cnbsy3uzyuwpewqbky4ldroivlp3rcxu827iypz8vwu9urp2393hj74mft4mn8v853xryh09gn6134r451unp9uz1n9np9tfdyk1fk45y3bm5i22e1bjuaz8fixnttmqbtv97yid7xwxj2tovsmcje0oihfmat1esirtfv886gsdqd6nijadpthfnkf6nmprggs6p99b3g5e6ajiw1aqz1gbzpjx8lwvt7lix3gm40n0bqhst3rs6qhhtj4wfakr7ofm92yfn9x049acw5va2cxknpcz7bfwwszwn8vq9f957efvhjf68v66wvxcy7zy3tm9k4on9bmup5eo9tbfi5ombu3xxp2tr56k1ypgllhs8l412jcmx6ie7pqratj9d3v3pr3xnqcgevplp7yifcyz1j5etu67aeabaf734vymnvi3zv7jt8dtpsl1zkt4ad78hemy6wbhj9qc282e68ec3771758xu41md9u04e4yr7af1kddlgevbrn2xfkyh5vy5x2os20fttgsthmvuefbu0f7wiex5uiqpibagxs19mtb6o5qdqjv9tcm75169w9i3e66glw269n0iiz2jev0f3wnf08scys0slxvyec1p016c4aesd7krifcxf9b5sir5cmy235d91nfdo1zwpdoyb5646pmfjm858i6paeyp7kieg1ztzqsa4pcknrwgg7cw5bjxee5v3alw6t2ighpnq0jckyuh2pz55jzybn8ck2iyuakbu8gmxhvdgz885lneshzzd8mqr9auiii8zwv1d0hrnevjp7buzy61wbmqtsnmi9tsrlr54r0c5nyrmcxx1zqcsjrjg4u1ean94d1261u0mz83bzs1bhmopjcsulur05dquslk017ztk8un7vpgviqsehxxl6ek7ftvvoe2kh0qz68nb9ervk7qp7c4f516clwcz1ieddqzjwfdgfeghfd2pnnd',
                        proxyHost: 'lqakqnpipotx9wx1uacw54xfjhqi3hsnofjwb1rbcqy21fz8q3t27et5o40z',
                        proxyPort: 5031546512,
                        destination: 'tlbqe1rbza4gk8abg41kpnktjuk0fv2js63jtbj07xcu58vnnj8idba3707n5u1aftq40weojhm250yux39y30wwa41ilt4epkueu2dfisinaa1ss7x792nrphl9s9qscqg2xlbtbybl5kenscebjkrzq1a0pq7u',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'bhjsfygikzr5a886xrz36dot86acxkwvovn6nxtirpabc48kkda2z0w9r41oil0v5ru9t5wgiolqz2hheqpls6pdpny75r04u3c7o03kpqp5ntx2ojxyadcb9liyoepm9xecj1sji3r132uir7rfey10k58isx0j',
                        responsibleUserAccountName: 'yddta0nxfgxi953ijj9l',
                        lastChangeUserAccount: 'i51ngsm24m22p30qptx8',
                        lastChangedAt: '2020-07-28 17:32:32',
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
                        
                        id: '78c328a7-e8b1-47c3-9029-563372c9cc14',
                        hash: '2zjkj3ee9kvkih28p8lwbf5w8vpztptr4z6j4fud',
                        tenantId: '3731cf9a-6d17-40e4-a0b4-858b44e74cf3',
                        tenantCode: '4rpsgpbfzo5i6nnzgftixejs2j7c6mlpq82tqkbrtpdlv68oza',
                        systemId: 'a2cee2f3-7f2a-4b24-98ee-b7556bfbb691',
                        systemName: 'l5pa7tc8a9u1hedr5dfg',
                        party: 'px00tn40q708j41iix0r8vuu43sa8qjptnw2ebjwbtsj3tf81n472g2aqcdhiwqka7ohva7iatozztfeye4o08zq3wk28999skm7x5qsrgrf94sf81g27dg4rp0lbxe7heev43gt82d3wy0oi7p8yrziglf284di',
                        component: 'opaku83pmmmhie2t9nza9xotlot7wh7y22dmo6gb1lt1ajy3a0ncwtmvv6w72n3n7kpo4voj94hybc2omi171b16bihf7c2guh77n0q65bonnka5ie20vqlfaf2v61n0wl74vg2qlopb3ojkamj3d93qxb48jonx',
                        name: '1z1gwu9mye6t3ne0nekct9qnp0e5lylvnbf1z0mevpm701xgxx5fja1rtjhgxux66l0ggkajv2tynij6mrdntrz4tn6dqsy70zgqm46oubgl8l6a5nmt34zs6b1ufsmxwdhqfn6rmfq91m35u02romw5cu1v8bh1',
                        flowId: '65fdbdb0-076f-4ef9-96cc-03370603f631',
                        flowParty: '411fkfuncjnqu1l5qy5ngel967bi2y7vclik705467565xykz7xwe69fr461qu0kt3e1jc6pnevei8rzja3xe7gzcq2iyetvuqorp6s6rn7wmsj8dhm2bwpesi33ki8f1jvivp5avin2p28r4wrucmhi5mwihezm',
                        flowComponent: 'cyzxsw8f5yh1yr9qgoyfkqqordrvrb6ky928pyfw5j7ha5ri7kw9z9qtky8q6a5p7vc4x6x2xh06crmg92w75v865nsr4osb45fdibxrq27o870ysbzmfd6m7mcccha8woxqlkxqqq71aqg02ft2pfceyu54liux',
                        flowInterfaceName: 'u1j9m6lvxaj69e3e54giatr1z0ioddv3b0kbwbu8lljmcwyg8vbia33qvnak4ps0jqvfxjlnf314ek5b29fih7t2kb0aes2w1hk1u3hzzu5rmp9k1eifbjwm30xvekudxka5gc9bipn2ukla1b1abg1k7havysfc',
                        flowInterfaceNamespace: 'z8engi0gn5hic960xa1920d1be33u81zx9qfot2mps70q957j41dbaz6xxqf8god8ia1wqm01cid3qv7jlg8syspgba1d1ai1oume6md0ordvipy66tv447s5luh631zph7r3dappop1js6tzw731qcx3dsh4stl',
                        version: '17r6p4qw28v7ptdmrlcp',
                        adapterType: 'gya4u4lmsh560qezloq3z0tzvxa3stg1thxjsl00vr9a55nyi7j3nuxoep82',
                        direction: 'RECEIVER',
                        transportProtocol: '870s9r9t7gze3dpshxab2ikgqq1vza2hxu3a9tvl88zfjpim32zfik728fx2',
                        messageProtocol: 'hdyhifq1m9ra3iynqsva6jkve8jevgrqfabs7dw8i2plxrq84c3ptan69ad8',
                        adapterEngineName: 'm1hmlj5v7rlwnoxxxzkz1cqh60vonk3s8hvam3z1rsqcspmpcagpknggmpautz9swfsi2i5dponp38k9csgi87snc7u9waswlz5zydz9xdrdbrs7sitjvy4yxid1ww2hfruyh0g5njldq8cikrrd2fzkgcy1be4p',
                        url: 'bd0n0ocvsk5yqq861oomlnurnhu7gyot53h7klni8brhcp6j91780fz8e73pl6tzsgngekmket4qxwnoqvw26m02ly6itj9q1339wj0erky2j5fzfmcbpjgavhmkon79rpojq635fxp6uzibz000gg3t2967cayw61jmsjrks1lht2y038q9caw5r2i1bi93p39kjcqu6nrslai0o0v6jq022ctcesl98ahvi1633qlb3ouk7wz7hvjb29yut3u51r68dvuxdkki0fxwnlz68ilz1j88i6q7ynya8hab2btz805btk0djn5o8o8f42kt',
                        username: '9rv6bsvyo3jkpql9p1x97cswxfd9ihxgcv1mfwmdgx31bg7e46l8icye9nr0',
                        remoteHost: 'n3ynspgiendcaa0052yc3g80rvtiz04xfh4o02gz5amg140rlz9qpvytu2owamkb6kjfcs6yqe667cqd5kextqs61hybr8pji9zo7dtyhl2m66fdw69hr5j04bryohu1n0vilhau0k6xjlnza5oq2ajr48amzm0u',
                        remotePort: 6027016593,
                        directory: '78gqsgzhgqmslk351llwsuzuikmmhife6aemeefeeube5x4zwnrrovpa8bfb6ecrwtrt78qiszubmqok1sg4yibi4gc0v580ywr5771ojmbp74sbbvj3n0p2jod02a60aa20ib0z1l408uccdk9zcn2dzmn81sjdzmmu470duv6e77r2tx5is4qqlawrzxr0p2oibpqq800dhejaa1020u8wp35imwtiud5r26k51bktupoh6qmh3ebnwejuq7gtxyvfyt0d1u0ul91b2w2k65f5hryn9ig3pe2523phqw1wkhws1f1rxtc9c7kde8mli8g7j424loajry5iayzvrdep5nt6ga573paf0jq77r30jxzin64zshxe774ztegq9xmhp25hc3e2tjia2zi2o5100b0stri3kbwnw1i6twdg3agd1jlh39nggxn3b5t0n0xhxeracojy2tpnabi5o11d9fz21qe7fqgqjh32blolw2faw7d6s13nilc9qk0a8ni62rm63k2g0n0ztdkub3nl2y7r3aygsunq7ccw49v3dmg7a2hvhwn2b1ggmbavvfyki2nddndasp8ws13j2x2tm38ho0y4wule7buzfy1nivvxiv51xkd24aeexa25pss1ywgjftggo0hszhgh4y2zwed6q9xh4av6zivwr72dxp7fvzchyisamqus2ot5kxsctim3p3ndmtr8bcaz40bmye2vx5xijhd9058ayjb9rcugq0aq9wvct4kv12rf8xrc8jijmylgqf8ed9qn5x9oum9lp6g9lqjeps8lf2awvt1mfhykdnwo36zcscm6kvwh83ggkdjmnmsbgbq0nul24jv4dl45rlq5bqt2s3ifiphpw52t0r63smv9r6gkcu07lfj2dwfc75pw441z6833gg21ba2fm5mam3rsy3zuhz13id0q7p11hnenrkhax31wd0bsf2zwfaieqli3g6tqchorlv35bufzdbt0qjuyyoh5yqr7x2vts942phd4',
                        fileSchema: 'ajmmlwcmt2t17axumv5sbgll9yf50mia04m23vlzpnbiq227tz9sc5k3cmoj71kyshsezzyx50iwpqb7jaxs2g3k7gepsqyokv86i2tevcg5f0wsg6rlj16lsip2pwtbtowc7z0gtc3frtk7elsaw0s1l80ivo0k6ybt1o8924c5a93nfcdk6h9jyb8e7ieif3oyb08sj0659wdeped0h0x5uckug2cyi1kmnrguvxb7pwrwo44k8153kubgl96xp8ab56bj1dmw34f67v8mw53jepd3f6md8vtzebjdiysv9ihkd3qt7pq8hryeuekfub25jkllbpg81zv4c0smv7463ouu301as4zgo9cth3zkzolhh5558kin54118651j3otgu8gzbn0wcxac17i9e43quloaluo4asrylv6x9ub1rxkiesj8q9edraebn88xswvof51rn3qm4m4g0bjyi0q81f89dyav136rnvw3dn61yzd70qj65cwerrwdwl6lvd5vnxtpf6n0hfk8avnxrclny3ye1n92zixr6n5j6bwffc34y85m9bkd36n01ccd88tlypd177lxu0rja9se39a1tk62k3gnjxe89nwuadupmggoihwwdnlr66ahnltiy5q4nqd3m4kjftm0e18895pluady2gevymg72sliofmmjt0jkc6azkeo63tzgq55qdxgvvq92mjkek936dhhde98mwsgigtfvr3mfarql6sqp18aaqba1kqy9vxi55mprv1udrhys7de0wdt5mvi90vdraqonfhlrradq9tcr6fka8xntxaf74d1ddoy31n8r1pa8m8b6q7pvs2z58ebljpgces7yamnf7psxfj304oakium057hdeuezb5a5z2vwl8r9v5jde5s6z0xutcarlg61fjzn013wklrtk0dei1ej6rsdjbcycamlpn3ueqlcik3tbvcjdx3twq456stvvsh3amdvutayw44rxf6u1zuber7j19eacuedg0rjhj',
                        proxyHost: '243lbwwgpx0ta30d0ouz9muvfan4ry2b0dgub5urqu4e8wwmalcq5s3efte9',
                        proxyPort: 3717028935,
                        destination: 'opgvrkrffrrjjnkd6i8w6bcqntq1w3gpv8glph98cl6qkwnhm4l1wfssk6c8e7auce330dvjxsk7yh2s2tsdizqy8nct909hvqxfm0vcdb0g305m8axp8rnjd9u5b3usk48ql0idn86uegsxnn4xcasqx6tldgb7',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'f2zhl2q76jn7ny2khh5o9koawz0e7bepwac8t2y4q9zcwo9qhg9yi58r8csqtnxu3zwbp7hfnemjul6n7m3fytmrnulmzj1934hjiujig3l6cuwjj8loz7um7f20m0t6jbutrwzwa8yt21kbp6ud5tzezfdbx0o1',
                        responsibleUserAccountName: 'ijr597c7s43sr0km3smj',
                        lastChangeUserAccount: 'w4zeyrtcosb9iemwr9kz',
                        lastChangedAt: '2020-07-28 22:40:19',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('78c328a7-e8b1-47c3-9029-563372c9cc14');
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
                    id: '00000000-0000-0000-0000-000000000000'
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
                    id: '78c328a7-e8b1-47c3-9029-563372c9cc14'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('78c328a7-e8b1-47c3-9029-563372c9cc14');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});