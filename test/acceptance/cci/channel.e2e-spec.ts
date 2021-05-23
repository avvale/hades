import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IChannelRepository } from '@hades/cci/channel/domain/channel.repository';
import { MockChannelSeeder } from '@hades/cci/channel/infrastructure/mock/mock-channel.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [
    IamModule
];

describe('channel', () =>
{
    let app: INestApplication;
    let repository: IChannelRepository;
    let seeder: MockChannelSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
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
                    MockChannelSeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IChannelRepository>(IChannelRepository);
        seeder      = module.get<MockChannelSeeder>(MockChannelSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                hash: 'e1x6kn2ar08svgsjbfmd285l2uvomgs5mbkjydj3',
                tenantId: '8ab0628e-e1c1-4269-8248-c6e2c623e7a5',
                tenantCode: 'c1cy1433olwoo4tonsndhusch59jpgfet563n5r6k6fcuqyeqc',
                systemId: '7606e2c1-9d26-4196-84ce-122f2a9187f6',
                systemName: 'zc63j9d2xuq61ap4kc6d',
                party: 'a6ak8teqzvm3jcto5wipqr8johf8gdkmkz9zghiiaxge3yzpgapppjb8fw7tz2xgqggdzsssntv85uvd5h3grszephs12g69e2bkju8b1587rkjqdbpf75n8mxbsmd3g58mhembzqyg0xvflwck7ps7xlb3lyyn4',
                component: '6xv4p48d1sfyq7iajhm4b8i17wy2v8gjnnvbyyb8yuk2g1ypiiyin90oxwsokrj3bst387lvn6ughmmy520y31ew3gxse4dajfyuxi2pg4uejf90x192jglz6ezxxiug425o1mggsdjf2g8pqt03vi4aym7odlxb',
                name: 'vqp653lojfvr7gai36o5e3de6fea4fhpghg47rohcq1er6g0c6qpxiyquz93yu6kssbijsyuur4o1cxjji8rh9oqleitdyidch2puj8ql3k9cvdb41rkunoe4iciudde3nrzxah5sqgxd44vd9cm3fxw39tui9qb',
                flowHash: 'ocr6wsq8rk1787mk4bccxznj94bf1ospvjjgp5kv',
                flowParty: 'bla38thlfzzlmsmsd4gxm8wokyxt8c94nllmnprdaug9450tcjpefle9xui0608apk6sjr3jnngzlz1fkevu3dsmngjlywbd240fwfbluxmeple9zj12hgkozi05tnkteq4towy3atkfiqsel2l4dcb1lrvvsmc4',
                flowReceiverParty: 'usyjmokt6d6tymfvvodaxpsygjcn5juzqwko6ncn41eu59bcee62e574siowl7vixvyjqotsadn35bv85z867uy072cgw3v6jkvx2wf7xf89bs3vjuc9m3v8yrm0how5kv44dzw4g7suyxv6h1d6i663oalrw37v',
                flowComponent: 'z230e3hbbl84d95t8ce94rks5hvrodet40dbtfyvjdkuobsjsya1kp1lio7ti02oro9n21hpwkawx1xyjsp8b4baxatri6hlqcct3mmz6ygkh02tx8nvxwgnxbwklswvsubhqlhsx3s4k00u9vfdvkta7kaqlrll',
                flowReceiverComponent: 'uz1kks4fib5dzj3sfgz0ywzllorgjpqrzyog35cqlrtp6ksntalwwho47i8d87zpc5jtncykcc4i5wjgehra3h7ntb8h4gryo4u1g6axes2a1cwsv5b6xr18mxeniy30udw68g7lwpn1c4d7nyeil4uc1yvghsxf',
                flowInterfaceName: 'kzwkm3s65z4ely2l2fl4ehk4z3pwycxuv1mwmywntu6mz1k0pxghhuchxazk5axwyp102ip7iksxxssxg55213vb78hrswvsmvubpf1q8se2ovj4zieaw6wkif8zyjxi7zzsx8mz1l9m3g6ju95rrzekhsu3t9yu',
                flowInterfaceNamespace: '6wlfixfy925amg2ium3wsmhx0oehq1x3ul3xve0bprhjas0aaimupzvkshvcfgnhtucb2u6azhzi7ykugs5xudq79unhdms4jo1gsdr375lxl3rafryq98fjia6ntm8e7tb2utxepn38a93cjs882u7gcsfyji6d',
                version: 'jmshmu3iawrns128ljbx',
                adapterType: 'e1yamegfkxh9b5sdcy46ez2sr3dwik7gnoutjx37drkvp0s89ud2k3aevigj',
                direction: 'RECEIVER',
                transportProtocol: '9qkyd9h0two9flyq8kd2k0g40gukjttlbhml7z79u0qw4kte3cscbm01pixb',
                messageProtocol: 'x5tivxolczbir9r59cp9mp27imrornanc7gbljnl6hpj9bhvkbo1t3jd5xoy',
                adapterEngineName: 'sq0ikphtg8lbamnpqzf9iy3wqe0ui8s1onvdy50hakeye8tn4dqex4nu94jxtjbqmho07626q1asarmm7ez59wvkqa6c50704gqrx51q5i6u78tqe7399mcqs9ygxquqrpyz0d21csifw0bq8ac4h9s9gg7mwdci',
                url: '0w5brxskpb9im3hu3t4yuutn2lq3ovsi3es1fns7ka4i008xti76rtww6p10q8xxfofzem12gq908470mnkgpnceakn6itpnu5e1mrtzo5o6ln4ehhsay2gdrco2obh70uxpzz57od7pakufwr65pmuhqm5t0zd6v6twg37kj78tne7je7sphnyb9z4nmwruougte0jmnsc8fwprsuih0415vschbdohch8cdjf4w85a1pq49ruwll6lcxio5mnbq7z6rqyvwzscpk7hx7fpm6at0f3fdamphpc4khkxijpeqdwwe5bgbor4850ghtc1',
                username: 'iiaph7fxh68uuawoz0mj35k9rl729aszth2r60z7jr087crslo22zr4tov8m',
                remoteHost: '8wv48wui12k8chd4q8l01ozd6q9rzcnjqj599z6s0jl8qdbxtatxa3pmnl0blehciwx4y5qiakhl47q6afcbbnfrwpwb3kyiagq2ah5ra1dmcy6m1wq3clfv0cywxrzxyw8t75aytvl69rrnyu2tmm4v0wl8e39a',
                remotePort: 6518983833,
                directory: 'i1rk007w9qbiksn4tfta9sarrhwvo9a7wkum881vh0ogqvgtwmw6rjpj5sawcmywahuu7cagq0njmhidykna4crjchqvl6ftll5dk0yuod913kxm7abeeqoylqubuqf1gpq17hrbmrlnz01j80ntaa3a87we287145y1owd67pazhdlm2eyp9xikmnag741nmg1bnvcvkm8cvs3yd5rizrtr7umbpbo0ghhymka7a6hc8jykpdqubtkht2vfmnekcd7j2rilcpolm9ekbx0nvkpgkiw7tcc5rzqziv7w3jf5mbvs93wfc2q3bif68pdln2rgru3urz68yg78nvx5jn9993q33k9e17bhb2zez3zxovg3ji1wxpruqzbckfvig8brgnowvd5k2uytsj3dz5j14k86bspl1umtb1ltzcp8kae1vlm175r6d8jxpos8q846hkqo8yha7lnnelqhfrg8j0274u2m7watfzc305g38zn95n89k3dz61t5lkass5astlig2w1xfof98te91zm4vncvxsg1o4d8ybtai2g9cayn19lcwhugzzs5myl5t25tom7vd78e00vp6k7zfk74px15omf7orc24rz6hcvg76jd2osncw7dqeiyugo0b8ktenv97o300vry3n1f1nyelj1o8y4i6pm7pklkvqbh607bcwx7f4qqugui2yt1r7f967v51ove1r3f972oe90kegxpoqf5p9dnll1p8501qjgtw36yvecjxxr77xck24qqwt1spxvnhv8ivuwjbfk38z3jfzfn48ngkfkdvln7f1az0cudnzh4xuocnudtx1j9xdeuca90x0t93a7fihttujm8u1j7wv6wymctuuakkpf0xv4y0jvddho184k0p9rdmywlmleg5kyoortxq7woxrsw0rwcxu2o5u71ddv5tsbvf2j5kpmgu4ypvo0y2dwo1w88tkw7d6x6pvtzjou3v4vupbhkeg58a1a5q6lce938prpeyc6wwqz1q7aq',
                fileSchema: 'zpd6fsrqvyfkx0cwoh0se5y6egec10qwfx6kcpi84nrrbab0fmslyy4nfchzftdz62qeo9o7nnh2g0cng31lfu9ktxqw8yq4l11wxrfs7sphaa5tm7ize07ld7vcsdvfanorwhfys048yvs4hrwxp9js3qg97cjey4revlxspag235fw8tk148wam570x9wi9uqtr2iememdwegtnbhq42bv6cw3brti9x8hmw6palzf2zhugg5wtdfm5wffzkwulsu8e28ym8kw3kikl9368ve02s5zdye9mqd7z4ktk06bvl6922ld17um3bfe607l5og77p3dqsd9qd9btlrenrq5wik6sux6pu9uzsz102u9hxx2vy4ccc18s507pp400aci2b2tuuy7xxxkcsknzmxp9vk8wcqwrlksoyzv4knosrg7vvviw4xac78swxh3pfbivl69h6h8lgt6litehvxjeid7ukwzgvr6e4hk5eustbsb199lv8s5ge2yqu5iuruag9jz8drbwdg91c75aljbm6g3ggmt17u0k4wvje30dmb8ikl7xm1wh1lpxj8c1bhvs4dodat6nuxvurcewnydddq0lqn5pc2gfifriy1qa4dvcmgaody9t7w2tzift9phcitjrbt21m8tjhq7aodzo1btkywjwllixugr2q570mqd053z25erhke5ysdkqituspmztyftef04nx2lhghv5aovcvtkri8p2jv8p86vrr27qvctbjga7uow2lc395149k8reti65cwmolcdt7oeaqtpwmkfmezionsnowcw0ifjvarmmooswloagcrhtf7oeswuwq08prxudzct636hevu1dbmpifytdtfy9erwjhn3ckcfcclwdyrc328a9jtlx6v1f6yiy1rj84nb2ralr4p1seicoa0y0j74k5wmdj4eos0zihoqk5tc8t2m4j93f2u11okc4z7xhtmtvzgddhcf564sam5dhliy1abjtelhznk33kr4p2zrz0rc',
                proxyHost: 'kregxezuel9p6h07k1rwnnsml4auz9f7stpkxkoqbuzj3hs65jmntz2p7kfk',
                proxyPort: 5955399225,
                destination: 'b7ec4mgleitc5stxle25c7eq5y7j12m9grws3sw4iwyl27uj9e1i9i2aqa3w1tjxs53h6upczew28ku7u8gq5nyp3nxmso9rfy1kkp4ks4zhwrbyln3omyykr53344ez96fect3fo3afhl8sghn29g0ahtfzmh04',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ixv0b9akfcr1v164ciote1hrf59t3g3sszefdd9bnzljfno562itcyiy0rilvbsxtf5qbi2u1259fvtotkq1elq7tb3mz38d8tycufiimhjtw9sbc965e52erdsdajjhlh6z77iuk3pfvbh3o0x5xf5puq201ctw',
                responsibleUserAccountName: 'ieo5o686cdzzifo3jkb7',
                lastChangeUserAccount: 'nb7c60a3aplcuup87clp',
                lastChangedAt: '2021-05-23 02:38:15',
                riInterfaceName: 'q58gvvkqx6k0gxezjle9gc0oac1jvqikig98mchg9v1th02e8y3oddhhvthloy9r1yjonohtgucc3b86jyk9gl45koorry802su77esydwzh1xj8i3ioh1wd5rdv1m77ht8i35oj3utemjh4jrggbhutcw2a1dfj',
                riInterfaceNamespace: 'fh1swko7udosi3ew5y2x68qo562obimqa65grzusdux85d3gvkd3zuoa6l5vsjv5e4wkmjd79jyyuod65m0zeq1bdskhyrm8jvb2raxaqn3pkqtlgofk41z6o1obceih7094s1mhkc20w3ewbdls49fliro2ljrq',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1811b9ae-1126-4970-994e-8e1ed692394f',
                hash: null,
                tenantId: '963ff334-5b23-4d11-aeb9-7874bca8b06f',
                tenantCode: 'goqf6xsq99cmu5yz0gntpvvmyj6xjrg6emy0glylebsz1f7lny',
                systemId: 'e99066f3-77d5-4ebd-b770-5b49190cc6df',
                systemName: 'gpoehzzhbu0h6ikjynil',
                party: 'kemb8xb193zcedjgoz5c343sf5dly62y5mkd0wtf3krjosxmcxnwl0e7nocls75gi8ltcgql4r41jkctusk2jrhdtuipurfo1lvsyr2rd5bgcpji5xb3tv2tzykgrgt05ns1r1n00jct59xa7r3l7c6vk2oe71gi',
                component: '5vps1vktzizshul4t9erwt3haxaontbunrtpkc5eeu9eegc4f784j1tgkftizf5p5q9vex76ki3maz7x3d7b0iirg87yy36nkmxy0zdmlkjcel6q55ovv55qfqjowwsgitozqbzxkr75n40w79ldf372rjuhdihk',
                name: 'q9chncqs315g0bjac2ywtighmfp7y3fj91lfli5yjuyacggk8b3gf0ijpsnal5xkue3x9l1o0j8vto499p9auakqjavzulzcfwyzdldpcimsi11w1i3ovv2bwwrb47s0jjbc3s04h0jyx0dgg560s0scdaucc6rn',
                flowHash: 'tdfmq9t481iumr3fa2kws7hjr8lyfe7vx4mriysi',
                flowParty: '1a7ya4aaomvth7dauty7kf7srkqibsmakwgerugfc4t4vr6yezgelvs9vy0295ip1q0hiimichbrypba4cnn8d2lmfrsgs97fq1hoor7moopb42b1gr7sg8bq22ze2m9b3nci0l65om2do4lqzn44gg66swp9a2c',
                flowReceiverParty: 'yfkm73tu6ut4wdh1zpw4hme6sefigfdh57cb2vyyt3a80bzcqiifci9jsmsk4i5xpnu5to0i9re5ao503z4sp7bbqyz1lpksin7rbome48y6ymy89wwbfwu38vc2fhnp1udp0w4ff3id7lg4l2h46eit07667eea',
                flowComponent: 'k58sub9yytpdaizwfw5zk1bfvtks08rv5bnfq0l54z166sfa7jye9cpobcnm3771mkon3rvagnfl4h504vwplgq31r38u16wc6zalywpfj503q43uenn8dgg78mg1jtaf2c414xpco7nepae8gzc3z9rpjm9pvpg',
                flowReceiverComponent: 'kuwk1r3nsornm6myi6pe0fiu2ed2e21ko0lnmyn74efgyz87bm7v645m7fdkr45v0uly0f5f4yj50f0nik3c3z6g3m5vcz6z4t7dgu086to0o9ykqneqnvo271gxut0ttb768qo7irniebwexgjn5gb94zkyjq02',
                flowInterfaceName: 'knjvzv1siymmzwz2hw8og15nxr3ghq70vdhch1vjvv8uriwqgotgr5t6j6nhy72vnr6duo18h8zeawf9i43js7akcx3zay6zcp55q1dk9hnnx3aaa1pi1winstarsevznx5glil20oellrhq43tyog9bi8j10n45',
                flowInterfaceNamespace: 'fxuyraqtod95xb8fewvsvr2ogt1ovpewbqwjqx8o97ffzp8x00drdtm6376rgjp5nxnrgevmmzbv5m4vijummu5xhc4qj1o2xtyxe7ls7as2ajtxt427j89iwn4npijk3a2ahn6rbn7ncdyhfj9mao3tecb92vky',
                version: 'jr58w5ctbm6g4hb79rqp',
                adapterType: 'wxiy97saclm70pjdvly2c35ecmug5datmjwg8yv43ffv9l7ogvsq471miemx',
                direction: 'SENDER',
                transportProtocol: 'lr5l5j6mh33lax8jzz5yewx8bbj6sht9wi8v93234zwhcknsitszss6l45vv',
                messageProtocol: 'fhibzryzakoub4zmrn4ddi9xjmq24awzc1xbee1jfn000jnga9q4xv4u5jdc',
                adapterEngineName: 'a1ob1gu7k4zac9mlibs76mod1vrz6loz0hj66rlmrsu5u1guztq4kdedh55use9f9bze108bfq27c584qyc8userv6awgtydlnk1aq92fsvh7dfwreuwr5vuyphy395797t4fjyny9q8plfj9dw6eypcdg833iiw',
                url: 'qfi7ejdr442671iu6houmehkir83ke4zx40xobaffa3nngaohdbqgkcjehiuwftwoqev6bnrnkwnx5kmvn883gosgd2miiduk0c4i6cip95setebpglp60y5nov6jq96zwjps9yyre6uekj7r453jbcqe3q929sv0iwqws163957xxvqu1qt21e3spyelrv4mqgdhn91h8li4hs0ttpyvfm0sby5q5gq10xpysdkre9ai33ryfzch1n7eflhsuzh89dt6c5azpg34jrmlofc8srvbxuuv0y7m2eqi67j5bs4mo7b6lldrvve1ofj2nsp',
                username: 'ex6edzrq1rvzqnjhuxd1g19h8oi8i4v55ievpf43sqewplawrwtxw7419hkv',
                remoteHost: 'iqtdt8lerqznn7wvdq9id5p2eidue373hrzua9mqzal3ltbhn8aaob6w126ps4qfnmh84zsdwx4rwkbv8n3i42kcwfmsp0rds8otien7jqulvrvyoims7m4tixuw6aqeiia6m318206l447jelfffij9bsaoweyh',
                remotePort: 3388598553,
                directory: 'axna8sy2iwl0sn93j8kx8harzyvblys1qwy40gai84s2fyogojqf54dw24gvx30yqtiowkgnhc4t2xr4thqcippgfld4q5w9na79clcgc5otk52d0s6osrfeouztnxuxzzawbkbc8zj76e91mr7gfsyoovbhn32oqskjazc75j5p6op714wchoc0zx9vpd1dqicg6jbeyik8odsjprcch3u9lat0vc19ie71jjuvw71l899hlalt6ig4p109fzvdieloqhfikj660q0xqxes8u4sdjlmk5yx8wx4a3al2i1clpldroxwxre7rvpanjky4far1kkxu6ohw790t0q8vb98161su45xpqb354s5q07krpfj8gea7ihp1c7nouhhusmjai3eka5qer3hzq360hs1gxl1d4pwvdeenjo93l9xdy6lnxcipmk90fnta4trx5j7c14025xkhrog60pk68leldv8mf7u404xkl94h10z8ojbk941igfdv0dvyguejg1pxjml3yrmg2257sw3ydkzkpl08y1wvror4fhpwpx8tnd2ll46o5dsys8xqxii49p3magv5cgvf3zsgilbnxly6pz4ibzc0s30ok3fkkbghxv33hikg0xf8chko7navafhfj4ne6tw2nars96l1l73qg9vd80vay0x1jdzim263rbjyw5ro9z4g4wny2s6ecjy3rr53172p5uitjpbc041awaghculjzqxhjjv7h1645wt1y5nnfe8tclaq3asus7hmvcy9h38b2nas7043w90ob7pncm29eyjug20yopi9astk64carqs9s5brgya8sa3zkjv2izn3s1kz0pebzc0ytjqdfs7vspolcc6f0ljeybyyo7tct9bs42t4yl29ialr0ownpgmbpasxjirz5p69bdfb9qpyxtw6c9je1jq9hgq8gdd9eybmrgsevcqm107h2e5hxetvyl2d2b09udhlp57jpfqvpcxrceh4rxkj1ehzi53cd4jiof35qci',
                fileSchema: 'sfaa49jrn56doa1psyqyqz40dm7o3uk1mzenrzonnica1ny09gx65k4xjcyf9iat59lo3tyloesbqh7nnp37ks4a2yz7p89ubjw3zskmlhorlxvszl104q78p8vyj1onu9lnbk5i055sm5s7g16ui5l3kat8zsl7yyyuovyb32f8vczglmwfq32d2uwha8i42czgbgo11fdv6jaeyxtjgammv76eputa9b3l3o2opfhakng0y5db21hjotp62yebx67alztjxnlc5r38wcm2bmluwyg01clrjvtvkojsdx6bpzpeqidzu8wzlzzojmuf3n77k6qw69j7r8gtbr7qwgp50l1362rb5gm38xvt1styvla5kygfwc5fswwamcsl1j1fre2g3550rq7zhh5clqg97vcy87s6ne4fj3lge4hzdqi4kifglp0pbx1jlpotdscjkbxeii49vi4n1kj29ldfg9eaf6zhb21t71iomtlfkdowusjl4bek9fyc1z7be9hs2aeocejq54gv7p19jrig457w3aau1gqsn9wnx7znq9z41o4cf93gd5xib59d2ofz7ebngfhkbv0t904fy9qu03tyzspeyvba9h0smwsk2wj57rh2gb3an8pldewfx4hfdsdovbplmtckupjfal1aaxuolvu4429emygxfmej0idyka28tn10kb3yxqmx4q8vby65vunrmh767herjzptl5kqldheptb68wizt6xbvrhnzfvdr7vwua42eurschwga1wevz5evetnclm2shscoti1fm1gxkv96mlqx9squoj6fcpqhpjhtrn4h0lfh1exf3kbfqlwke3huso4rzg9jw909jt7spyx71e60t4bnk2ihdnyun2kjo7xasxw26tvy7akz25dyr70st1jjhbhaq4phkjn4ln8kx0gpd4a7cv84z3cvzs5w92sy98ptamni0brf7uys1fp5eq2a7qnonxt9v3agj3jnqhmogv4u51jtqt9d7akedim55ef',
                proxyHost: '6pydzrnlpwox0wks0o02uab9kq46ux6d5z0xw2pxwnz3qc4ispx4loh4uijf',
                proxyPort: 3849986974,
                destination: '2sx2ynmssepnq3pn2syvmbtypz2grewvy7y9v1anl156o8urbrb6nkpipzpscwyuyb6t2sa2ebtgomoxvqbdbs4exbrlpnlng0smoa7g2y52xhnj05ynd3cbwiyjmtz9goggbdaywn33quvf5k8wt098wxcmfv71',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sm43xt4lig22zbrlzco037w53xrr5szs4jcffbyl46ltl345el71nycgb2w74jlpjjj1diy9as1z71217nui0ffvaasl4blakg4g6m4mccj5wrzd7c3s7hi2czus55z1vwndjo7oump79fbg8a7a8w17zn3x9i7d',
                responsibleUserAccountName: 'vkieogy6tbfv41kjeke4',
                lastChangeUserAccount: 'r3qgv7qdq7rg7c5xwpnm',
                lastChangedAt: '2021-05-23 12:17:15',
                riInterfaceName: '4m1ntyli7v3okhjjk6p1lkv6bokfd9alq52qsmbc4ogetlwj63vvrblps6dh987cswhojv65w20kvssk0vyzmajwmy3fdbhqn8e7mc49146s2z3f95z0kn9rl5b3a6s21panyaot054shcx71if9lqqrzfw8c6aq',
                riInterfaceNamespace: '42e87fvqc5w5lh6k3rrb072rz7ccnohon495mnk3ezcj8qrrxs999bfqdbktkxkg0vmxm6wutha3747tsz8vauubazt26ndwsw6nrqz8t4ojluyhgg52pgwq861o19k8oa0swwislaz01ghi61apxtsev48uxmtr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1fde05fa-acfc-4d13-85c9-19ede9b284ed',
                hash: 'tovl7wkc28kt5i24ag3lsgvb3ewytfxmijn71vik',
                tenantId: null,
                tenantCode: 'z9tga4u6zmchck8fknhpz87fi7qiuj9slbt5k7zgzejeitlkyn',
                systemId: '48b79ae7-88dc-400f-b08a-5f9c6ed76bf5',
                systemName: '1qshubcjayp3skdvgfzv',
                party: 'ai7e7r4padfhc8cs9nsc8d0n1iufqhqpyqwebrjl4gmvjrg26nlr2hifdraa2k8uiy3ctw16xbnjmaqzsljpyhmprsg56jspvbbqgqowz8xczdy3p4q9httoylc4o59x9064fyrt8yyz96lek4xox8gk2k6pr0ma',
                component: 'x2f7h1vggoe1v7h4igsmxfxkgg01kv8km8unycg75q2j2imb9rjeidaz77i307lap7bjo3ffb6k16odji81mue2rq3vvt7zzedv5fkwb6vxse2uu5j42i30441hf3cqb4u7ea59xew5rebsl03g5mxf1oshvawb4',
                name: 'l5xhj9kch0l0zaoioltznszyz1rjdo7b3bniz6qyn1ht9byfadgjy2bkc9smzch47xjangkkl9zny9xq6ddbpk2rh5tm4wuuu6elu3ql2xcxdsic1ptdv7vqgdv7xfi1pj4ztmvx182pi75omxh9paejmskdwc0k',
                flowHash: '7mbkjnk5rhdmahxr3408881e4h3zhsvdtmixc5fd',
                flowParty: '0e9cghng9r043tmq5m1qd3l1xfkbs9gatgffrt8sjme8z3qf2v20cx49crwv5xhvk73whazz6b78axtfk24utasb7ywu4qtudzaof74al1dgsukwoz2ikx2ksku6qiwox36y45jcqqv8fh7wdxgb643arvm1zgp7',
                flowReceiverParty: 'lwfe85kfb832pa8fkd3e3x8o4v4f2n3azx71hlzx1gl9u78wkn26naf0rbjnmss9h462vv5nz0wa43n28vd8fxxieqt8kbdx7smmqq2y9pf5br2spq6ujobbxbgucvu6un1p9tmuhm57ddsi69ozk8f411rercw9',
                flowComponent: 'enak22cwssydchlc8090jas22c5jnjz39p51fp1uaivsxrmi3yidpbo80y7ufbxsnx73mbgisg267l7hkpdy0tku7p14lz8vcmobmiq80orc936x5fh5vufwoko41kqps0k97xudr3rvuezxbslt9pbgskpkz4bj',
                flowReceiverComponent: 'nb7jgbxf0o5ca596xm14src2f9tdp8pfy1n2ge2u12le4feh4j465fjmvbvgyquxm1h9zalpr7ybq60f3mo6cxtkvn6iwzc9svayfl3zxz7831n9zqkoqxsa2j9oxtoyn2joy9d1nkba87zecaxfk1pxn9ww9a0d',
                flowInterfaceName: 'frcekg4bxiy635lqnoqjzkqryilv6hefbsysrdt42lmissstn130jiw308q9cdyrawge06cmyukvcm3ik5gltxepylzsi5aol7sdfuy21z35h3j4c4b5m558qrjto2oshejk1m1170fp0ocen5dmf34q0fl1cltu',
                flowInterfaceNamespace: 'wiqpkal4a5tdmm4ceoim8sqc9bb6jp656veizma1gx2v1uf7qn9lqomnz2vjnmmz1qhsrjlrfhvh1e39qbsv22tz0gszhy7lw4iaunklev029ptzwlmip308vsouueimbh2b3i0e6kva9ri22n78p1mw42anokr1',
                version: 'vmhruke407ofb2jnstlh',
                adapterType: '9cgfyevrwaertasbov7hdjdvt7m26ifqtbwyu9hbgo1jmcruj3oomp5k1fd5',
                direction: 'RECEIVER',
                transportProtocol: 'vwvrh3sm879x3frmtwga9hkv2cix7k71ki2zp0gopsi47gpsvpop0zgfomag',
                messageProtocol: 'e8b178sp9dibrrk7ovbi62z2yopf26sc6bnwbt7lodm1vwji2zydrvqxk7e6',
                adapterEngineName: 'no2mkniv76t7iluecn1t7ce7g6w5qr70gy70mhb8xkw3hwyyiaj35q1sovii0910vaqcvvcrhvhieu2shkwpxioytw4vwxjmawj9fnhoorc1y4z4u5ao2kr25as2nl63hrlc8c5vun5rovaxyd347455st7wzvhb',
                url: 'ywapsw39cld3jn1o2se3o0utx09777fj2z0lpi3jhjwevxjvqw6a5xzhy0wz9dv66u4yl9udn3ek00w51w7tkpyn7k8jpempejarvy3g9ayu4jukf76b3521ozdlvfp1s48kpu51ryje3hcergdqzqlbxoq4so1f3tzgjoqkvstnx8c8n2fj1p738gc7ldesqhyeezite28rqhqelg395ztwzhgkoz4wa5x3s9l7x2utv360wb9lgivvsp1uezflhlq77gtoso3gma3a3sr0lsmrtm6ha6hp20sxmjpnnsn0b2x8rgyskklx4tot76wm',
                username: 'ez2qs342vaqerk9ggtuxdpixwosh57db8bk6mpmzecjmh0iy0yndnlmw135c',
                remoteHost: 'ur6gfwjuoyqg39v2ou9smpfkvyge3v81o0isljba24x0ijhwhqnacoyfs2ypqkzlvjvw7tywbwnmfsr0xy8px3zmy64limepgt2hyn4zi89m9v0ac85y1hbspg9fo2jpoqkk80883gx4hnmkd8cgooizy9o6g85m',
                remotePort: 8085631186,
                directory: '90zz5hpn2guvmpy9whia90mifo3wsz73ik9sg0y7rbhvzm7eshg66bulnpq4j4kxrsvb8i57ajty7dh8krne9wte4amaocur3tbptpr1leo4xhgejrv3xi7vw3v2ec8e4f4j39auyar3v2bhdubxfiwm1smdwrhxw8lwxg946kg3d0u63q0hg4c04hle4hqmvev6bl6om26tecqffqepu6sdh84ninlr0zv2pc9q6g040rvh10uki3ska6270gi0lax3tuvs6o3r7fwwrpyg6bd43aipdyopk39qhwvnu79b1zi15n4pj8vyzdv6w2b0lpamh0660b3o1aifrgx2np9c8qkxibt75vvqe2ka70n8n66ql1i2pcrw8jywdb56k4ogppym8eb5vecpla8eino4j6egnqnq6igmibnjxuy5bxpz5xmfe02gyc3fepex01ax9wqnc39k3fs4x8wybrdm6tos584b27ofvk9495blpf9tepaqo6y7ld0jiu4ub2hu1gmywgsdl9git2yfpbowrmwc8n093ou9upcjjplcpjfzp16ldct5q7rlfawk8vplishs1g48pmowfwlchgcje8e7nnj984w4wrtaa71r3yu5r8mr2mfujqs79eesudwdss6oz4hj8ml0af0k8132zsr6ngtq9tidwk7lry1xij03vnozwcbctwpb5pvaoc2u9sa9lm5enxzgopw878i1pefcykya3eo8wqurfi69nmg1p91djltzboaxob5b9cy2zy3jtj2oflfc31oxymiknaadlbfxkyb1432i3tzt1tb0sgayysiazfd3lj1yj197nv8uaawp1rrvxioev8qmx6ln42lc8yf26zdmcdbmdq8p94h4x0ofm51orkqub40njnlv3aswj7clzd7vajjj9z0wosswxqxn7vsm0nc6cp434woq22uwaw0gf87glklymnysh265cfcr1l7x5dhdke1b3c86gbjz6zba2cwvf6mtiew09ri764uesk9o',
                fileSchema: '3wiini94edsoy3rustei5euzjct52sz5ainro6bbbj5rhmfl8b7zi7w7ahg5ws4oz43q9tj61tuaov4u40le3yv8i9qz5lk18pp4x6yvusvsvwz98vp80gm8rj93d8qz2mlvklhfxkwrpirqfmmiytzcvf5hy3z6u2z44cjsktzizt4nu9tnhf9pbj9rf7uxznwcgwyvzpmq65geiyonhkhqjy3r837lu4z31j9tygn79ipfnp01eqb97sna9kbrybqmj24rxpphi4az95rq9kw5y9w98bcoc7wgk7ksggv37tonx5cg7hnbuafttop29e1f3k145df9ewy9r6fqau538od5nx6inms1duc3m2z2g0nr40krunzdp65wjreonbse899p4v68dzv3ogeyexl0qj9yyazogqadhggv3po3db2zthzqyw1i71bqse44bncdz4i95o11azylkf2o7alm88gzbviyt3b6oq7uk5zoj8xm67xhevhi7ra9ejef5i2iscycy3mob3zkeyu74hppdyieshniep1lhvr6ei4zrp1zx5ycbzszfeou0sf5k6wy4s35t8yt9q101dibyh9yt4tngn3e8wdgty7565nssigvjt41qej1b3ic9g6hajtpjptxy0wat15l717yq50fkomxsno2ydslil33xmz3gzaspn9n0yt8lju6leni36m1zar36vzn8xp48qedole2ebarqwm62a96lz3n1486mmmp32oeuh11ndb1lhlcpi7phuaz3luutvjraxbizoasac5ypg41kxnnbrqrh7lznjzdkszkx8xce4yot1zn5vfw94ovn9h3yhz68wumfr6su1kkdl2xxgtv48ub625wbk5darelecpq7ccf787gxkdwxmlmd3wl3jnzupy07ev2o8uncir9lks70zlmkkyvxqtf4y6mjr9e8hcv51xxphhh7ujbwqgwny4yne976kbeq6eailgbtg98spdarzpm64mtee93nz4hhbqhile6',
                proxyHost: 'u7k5phlryj1x710l7zew5c5yexs5ywhw7qeg3fzhjp3ivi4s0hxh7i0qpul5',
                proxyPort: 3984761482,
                destination: 'q5wtfo51esa76am2u0ah7ahi3ukvz7hetw4ak74gnuvxkjbvst3oxgkiimv58oglyfns8x9mh7wdmgnfm5rcfl0ms4w2r3mr3u5f1ogf9qlgj97wa4qctmcbrs621j9giareqxq5lp04bz1hqetn81cqfi6nbvcx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'xrvuszkxop6qj965m99sc47hz31ehklffjgfatg4oa6yo7ddlbe0924lml4nxjk97g2tlm1lnhm9sv371z39cwf6x7nr4s5dgrvtn8wlnqqz5l84ibxrbxwvrr8o8xd5e2i0zu74soia795og003xe194dskc43y',
                responsibleUserAccountName: 'i17hihqqd4k60fwjkn6d',
                lastChangeUserAccount: 'cptpu3tw4h05n8nykwy6',
                lastChangedAt: '2021-05-23 22:19:40',
                riInterfaceName: 'eck0jrcl521c5q0vloth548obprghxrnn25ve67hxxu0ec64a2nwda7syynuq5sne60n5u79oyoubjbx54ykrf90hfqxws47mxy1t1xmws6k9l9t8yok8m9bwbaae1kqw6ck6zi4aszsu041lrq569l6x5aq9nwf',
                riInterfaceNamespace: '7o4vi65hoynh4va6jhmw3gbxvv3eyt0sbb7wyqw71807r15559yozq2w6d3nei1jrv4ls7yb0hamw7jjcc2v9bccwni1om760opztoqvgm11qyfbku10hzjap5vy2aihf5lmcuuc2ckvr36cac9j5an9lafv5sya',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b3809855-73e8-4a0c-86c9-b9a5b74e3cfb',
                hash: 'r2earst7yz202hgxzaollzjvl6b5hqfrwv13q4l1',
                tenantId: '809b508e-2353-4048-95fe-655645e635df',
                tenantCode: null,
                systemId: '297187f7-d27b-4a30-9928-4c162e069a85',
                systemName: 'j0scv7j887ifhr94jcva',
                party: 'ucvuyp9vu8av96zi3yb355gp60ieufpmg4edx1i5cekbxg0l35ybbzw870sgw12yo7aqfqtljnjf4m2zmbi8pn60yum1k58rwuoo8eioaprwkcvbnydmqi4svigqnzl0k74m01u09xhm2yykn53iuevm7bryhb1e',
                component: 'mmwxxuhi9e0yfren3evqlsosi8u3tqumsrmn4eouwfano6y6cxfs210nuw6x8gxwd6wpye75o2m1i4v8oi6vm9lc0tbv5kythwesjz02db7oper307dvfrumq8y0zazi3arvwyefv4zosvupkmwwbt2bat120omj',
                name: '4wdvs89e8untagjuehrb5qwtph86yerqrzhjf0qbfktupchylvda1cc2eo6kh7jtc278yvkax0lvhrwels814oez34ujzr0antucjnn0ch3xznyyf2k0hik4cfmumxxj50a1udjbik2z6sdzlmnzd1oroea9uz68',
                flowHash: 'wuredy46w5qeg2sxs79umt43o60ok001l4appaa6',
                flowParty: 'tlhd1eworhf1n4z4qwwgo7e1vsbpgstbefuabfhg7qa8us3w9pywz2558es8u9xc4eo6n39n8s1pua1q44yryw9sefkk9u5lrnlgo6itmsl8ov2x2oo6xyo2j3kucs2jhyfi9eio6k5hb89c5pgosepn4y50eryl',
                flowReceiverParty: 'wguqp9nacxzraqz2rur8x9uzpq6lpkjwhr7pso0c7w76p52plrmtdryus885pq00o6pg3fynrfzqfx3jisnmgztcj72kbtftdkvvv85wmgcp5mytlq7r7jtzfzqlcd7ak2scvbvbk06bp8wzhjadjamigo4l1jxc',
                flowComponent: '5fm688mhr0dnsla8vlirqcco0gijuybnv99kofxwkhk9z5evkcamv4il5yit3rzhwec6gdysol2pd4m2ikshkf5htcr3b35xgnxwv23e5qimv919nog48yxj9o4uyah4mi7n9ia6d2l5mfst5o5101scxgfdbr9v',
                flowReceiverComponent: 'd3y9q2vhnejoy8nkhzs5l6lb3fzpvfzl6ogungseg090bmhsg85q91d296axetnmu4g6jfzcid0ko58hcm2s14g6bkcq0eeoueumkb7tmes9eahja87brijteuo7un3lgs5k5awc50ln9lpojw5web5hyr6ylqwa',
                flowInterfaceName: 'guiox9ov7mff0m6dr06v1z3h7y9t1pk358j1ddyochy96sotbrvrmshwt5xmcyv7zeb0wefz2v4yd3cvwahtvwzl942x7vix4lhf7tkcevr8kzvivzeiulpwcsnlxochlr2q7zdv0gljlb9om0361m62s9rvmszo',
                flowInterfaceNamespace: 'zspoupc067yyhgq41ts7r8yb7nsslmm2vfgzxl9mb2rq3qb3m8wrkm07302bjq32f5q7savux23i18rykuau9ssbf39xzievnmainumugp3ebamnm28bcyykwx13bfmu5bh31ufnzyksxsuaufmfav2j78528hxc',
                version: 'baxb92ynon6s5bhvisch',
                adapterType: 'lewy0lpxdfdnnym43ae8n914b5s8h0xsgrcr94m32azkx3qngesn3zxuq3yd',
                direction: 'SENDER',
                transportProtocol: 'a9q5f9nyfgmqfpanqlvt1w1qsmbmjsgnltu8x9nq225zuxezlz43iqsnh6q6',
                messageProtocol: '532uvqry8hv1y2kkn0o612hm1wsrg5to9ihohkoj3iu8cxto76h68imhq0c7',
                adapterEngineName: 'km3g0s7u5rj7bqy6l1n6aas5nmnlsb1lwl5ie3foe61x33htdqevylkde1qxh1w6aj7mqinib4pthnsmzbwcb6srlct81u8lyyo1c7cmwa8k1cfdezod342zelvx9u3x7tou6woepm94uf1smhb86v6teqpkjfrn',
                url: 'vpy7l3j0e4u757arjkczum16kit3n0jn5texft1f3mbebm2virbd9a7rzydkcvo0qmw3m1ewkyps8pgnl4101g8472mq4twnwsr8ynbosisereo07xs4t3fzqz1xiei1kx801ceza0vyh9ngt8j63t2yy2kpr8vbpinbq8htqrsnu7vt78vxussy3296bwivhp8ds6dx1d23l49d6gcarhbacf43f7nkmvarqbw8bx6av5ae1zkewdevvt15gz588yfyzn44svkb3cilrxykjiw6845s8uwkbfwpwjw0lwwng16q2mgioxuwjt68tfm9',
                username: 'h66d6o6xk5d1xp4bm76byhc57d5sfm4od0739nx7r0zutrqmuo0d8ld14vgu',
                remoteHost: 'km9oj2xshwo8gde4fn9oew43fo4gqz314e30qiuhoi8hhck6b2fomczzwj3fxtskklamirf1972akl10w1sxsoz6nb2g2zhxsufhlk6kmp8tz8awmo8577zts0f4hzmkum2wzf4d62l5rcdnhg3a1klpc7tdr80w',
                remotePort: 5047025361,
                directory: 'd69khxatnbxbwttbft0xjmtwv16ve3vxp9dy3euhekzxkpexeqd8bws07nyxde7cbwqmx2mf114athm853ma1m7lvwvq25oye8ix73v1at6z2b4ndhwsuz5yjd39sb3fehd197pq60vuxq93bruod5263q8ebr6ca1n6v2typuy4ijw79tazphlxxk4b6ub9qn2mcvnweym9kacqnwsvlz6pay441yhn4463xk5ikoxqzmfl90tt3502oo881teic4lqu19emjqmt4a5n0o98tq1t2j7e6exhv053nkkrgr39lozx141q0k3rdosyy0s945ecrl2nfjj84g7g9j6bzxl8tr3tmoi7hpjcujwiw7yfb2kfgots2vf2ddiz1scgg8npuok0gvvjj29etaee0qeynmw3m9zruh042qfli21zmcg569kjncs0gkdmon63xmvmf7r6sglxpodxgqqs0n3ke5y06zxfj2xw64633jg86cfo9b49lehq5x26i9xox8ra4u8b55luvsjy6mr6gvboimc6z292589dz7via9c3do6j4r41qc3isvmnv6c2w2reb87avmjec542sbfqv38apgor05fo1vuhfkf2z96qsqb9n45ymqf1miq0d4qvit5bnpap4t3oazl9m9503s1e8f6751x5662jbq0w4wsdkaonsm2lm6fi8ce011koprmpd02hn6p4e3n3vz9qrymb3s8frvdusr7u8thbcq01uodty7x2lnehzlismb3vwoh4ff9872elridmlorjod2h51rhuroglz5nhx24341mn4txc4mx0jwn0u3g10z8oc7dxwc9zl19z3w2r3pxsuoeooik2s1pb5gxesc3xxtnyiht065vdgcgn5mt02mirpk4jydtasx4s0y1ifi3qz4brawt9tncvstt4pc88db0bwjwposhll3v2lmvpb5xh8klki6jr2fbzubsklkh4bdzr5ouuimedz7gphbkm6lkydezkud4hpjut3dw1ly',
                fileSchema: '0od6ti7t927ehyr5nrnnvmgwopek1fki86j4baxsjqee9joiet0z1j4z3624r2n4gii6ygd6o7vpv9uoujuyf04syf3nusprcmpand4kqj6gxdllf81ryhxddjrxr1hnx5shwxd3ucg7icaft2ewn4a122ccalmwbxjqj9vj6tlwzmx6jtl639ma58en7oph0tkx3gdkayo7fiho2k2df36ut7lpkahq2ok4ps7k3ha8sslwsmbal6q5xqk6l0bjuyfvoxnneify8f0ut2ov6zmwc4uzyvs1pq1ei7if0wm6i4wg34jzuwzmzd8hse4f8j8iqvzse3re5fyyawvo9et3nn6knnzuwd2uy0kl6o1n0x4crckfg32zdotm0d5amy1n2i4ke1axdr042be6x5mudg3fzuvk9mp7cfgdz3f719o76jyppqsrp1qjxu27sehvxdcxmieqmb82yidruvry3wfd1g52qbu8r5ztfh42dbdktq47o59x2t6why9b007smnn9ytv2la0yt56bx9sdauiagcxszvezg44jgdi0wm4gnzus5p6ida1sxhpxxpf0k8qjzynpdcee93rodebhvsyi0acqx5w9z9bqbmzwkjwbnkgqg9fakq6tx8816c54zg0taqhmofsjns4opswpb5ogpk9yzelgn4jwgzunvmufadmpm3090xsjqfipger0jdostmu9udy75x062exkx6le376leagenmqgzzl6xaqv5rrz3t7m6ngzf71uoldc7o6z2gj9vdzhwr9jtrx62ai34fyzsswlh5wbmzikfkrfr9273y2vipbc7q2syl00oeafga7pqby7r9oar91ibifoxoo806728uougnwkw9jvpnx1g7qe9qu1j0ixqpewn3wqg0dw4lfa8oernao71qa99gwh3sravantauu4mac812wp59j1h2iu8wzb1sz5cbfw1into2cmx7fk7i3rfrk3swwkn1qpflhaz2ipwwat3gvbhxkrikvbfxbh',
                proxyHost: '53kqjo2188onoee3cpw5bmuvg149i6hrk7r7zx1licp3l91gmcxe03fmuoga',
                proxyPort: 8634087758,
                destination: '7ymqb07sqx4wu22lw8zz1v6t5g3sme09o5e26rsxsco5vtcpy0uuzxsd373rfwe0oaslc7pkyzzo0g1xksk3bo7hfo49eth0acm0vg95mlyn5pgj1rmk0buokpr24swtmsm4r5hjzc6jk1xxsl5qoykuclbe7wxq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'a0cwv5qt8s08m3ve0azjo5kjyauanbharmyiqlnhtlz0w14pb5m1tnr4gzch96lpcnvgsrky1bd3hpmds3aezi3o1pqtwml4z5zyafmqqlsaj2ex8d2ubajnwftchzmtl9la568qy7zn3afhdwb9jzew5su1nhf0',
                responsibleUserAccountName: 'iqzkugf8wtuyd04tda1e',
                lastChangeUserAccount: '4hr54h2wcg31826snzq8',
                lastChangedAt: '2021-05-23 17:45:23',
                riInterfaceName: 'j0csrurgziopk66vxywnuvh4hx0zj2wgbd6s9xpi88cx8ab8t6amj0ub7veby4o7sc59jwxkr8igbcq2e0fc405xwff3e6gexxkzhlzkq3cdl0jcamgtcgxly8z3sfouxer1hsgdcyjfxma64gtclx21skwz5udt',
                riInterfaceNamespace: 'yz458mqtn8qr31erk586gq0anoutk429xafwqfv5lu59sxj13p2gj4shcy43ur3l4j2rd3eivmgkfsfkjgzrblr8q1yqrjs3cro1j5jp1a5dse9l4nj8e6g30slf11ypsjr6nah1c83izujjj3eme8iqge7lpbt6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0d67cedc-4986-4a06-b9e0-a38abb76f8ef',
                hash: 'oxq88s8p58r3a2y5pxb2g5sntin14szqk1o9e04j',
                tenantId: '653fd13d-9041-43fe-bb74-e5bb62304505',
                tenantCode: 'a9z339ood90z8ohkobeodrebvmq88jwoviuno8jgate6yqanyp',
                systemId: null,
                systemName: 'wh43kqt50tbne0ln5u95',
                party: 'r7jn8ixlxmyjq9ezjazjy7vje78dx1zwjbia5cyj6jztu7uyyxkgruymcak5ajbc10o0x6p6f82ga4hg49kembe6e4bgf94tofi50dqmg9g8i0apnz2opk6qvxjvnmquxvqwhrw3cie297ua8da4ik8z15m2afk8',
                component: 'xe0tz25k0fe44mw62wgoiao0v2x9yy1359wgrvltqc5ymkmeq0m4446f765z3amnwau9vr66itikkieil7kp5t6x2lhadpstgai65oxim3d8h7x0dfrx2tsw6rt5kzuk2dquxsslyd774ptmxvpv1oy1m00jc1ad',
                name: 'issuxfwr0v8ttclfhwlntfoc8lfwt9b28mon9utqr1zdjmfkopv1rl8dbippshq5cud49yha0uk8uuus9xg8dwpfyl464prv95bu4i8wf3pih59laz639d17ndwftvjitd8a3f7a5fz7jotfszxzrmfxm93km1f9',
                flowHash: 'tlcuyefg3wd4w6sbz0u36gaots356jly7rmqyzxi',
                flowParty: 'uas0ysoi1fsxifzpu1fn8p71sgypmpt39yfyk0hlx6l0ez2my4sorxt41gy45je0q5k7wt7w6xj2u6i2oovegiqbt6cipo35fba5n93wi96xt7ykygurf4rn2bvbufz5s1katp8gz371e13tqf2so3jddt85lkvx',
                flowReceiverParty: 'sn5milq8wsfozhy7z86qzy54m4b4vejnd8cpb50quhvxmyryyz9d9dolmnyv7e4r0m1xw7lw3g5ydx6ojwoq59p1cn249f6a42qi1h502bqblblcqumf0g6akvgzobcaerf9iha5v29i31ra8xzlob6tfibgatyo',
                flowComponent: 'ledrymfniepm2v76jhq6fqxyr135e41egeh5v0z3qzq9ztbcnow7m679gd2j5f3t22zst4qlnyzjbn8hkptheqkuyiipybmftcrfy2kjz5oprf94ujmz51oapuws2dyk5q2yfiadnkttr1ylaxiucvjmwbvj1jma',
                flowReceiverComponent: 'c80zpbon6rvoumharm45xtp5elc7u33b94l24vvr6uomi8n1qaoj9bwhtxvywcc1aflly34eb3cykgvx4xx78pnmor673vznk62l0t6ypslzuk3pbtrqt7sjx46d72py558zlecvrtrxecxaa05uk819wr1zuq4t',
                flowInterfaceName: 'p9ks50ywgq5be44tjf0gs99d90krt8b7j8gvbruxljncjolr08f6ha2b64t5yoa4ga3345keiky2d0ib2y6u6phhprus09x3vxe4hifdesezimnjicamw9j5x5r1ckg9di54c89nldh0xadv3awy47zjlckp3xyn',
                flowInterfaceNamespace: 'vg2k7jxlkr8dvcuqv6t1uooyhezuprgszhxy9jaqaszrwzzvm0z15evmkk8ofhkl7o37l7pvbr0mr926qqj6qttso8hfftyon95s53tjlistmgp4n4kf9p1xblmuh3ezhko9tahtw7mi7ucu327dn13sydjfjpaf',
                version: 'wsyh13xydj9tuh7bgm65',
                adapterType: 'woc59vlwtgez94t0n2qq4vkjhude58lvkew4s5yymur6g5mezc3slx4x1qbk',
                direction: 'SENDER',
                transportProtocol: 'jlcw2892hyniop35f87obfdtk3n1mebeodsaymw1ogkxfbvnqhkorlgocz61',
                messageProtocol: 'qt2h224k77dd0jveq3khh46rvvt3e1pywgc8n8xxut448f19d8k31nub9udj',
                adapterEngineName: 'ni4rsastjrs0i0rvkt2hlakrbzn8el41omhauyjreh0xvbvegm5fsoopjpurlurk04tfii1v9dpuhn9nnwnrsiya1aysbg8t8dqxew2r7bj5c7o9jomuhzzcxnwzuc15mscmhw4q8vfuo0ax6b6j13qejxzuimmm',
                url: 'i73h3lavbpqluxm9omfwj2arwpstvyflk1wdmb490u6czbjnnrfudfjgj4cdztdto1y4oodjid1v4k019kicuda64fe05w0u2fxbybhfrhk2odg32tumdbdogyjgqbwwfpndrlygmcnut124t415tew37g3fw8d5dna67bz7ob32zmh9hqajcgv9604jtg07shzutrnlz49w8z62godhvjabu0ldxoqcze52hdm9hkdezgect4k7hnznt2v31byhbyzscex7ghntiwwyrb90ue2orhl66nn92u6h3bes09o6iyblp4ljujkotr1yr9js',
                username: 'nmxcm9e8j1bcnz8nmj8wiycprl0ar4zauy5y3mxhuao2mojzgq5e4j9aqvko',
                remoteHost: 'mue16mb0szmel8e5o93nxke4iw29bs81sd5poffzagvrutgbhtu0m5soc6rb0rt3m0eyn9ruyqvvsp5bs38bbaqtcjzqf8o8o5rofran5f8ui95vmh1u1syzgoqwq9zgregg7mfcvo9qccw887ciekqnuynxj4me',
                remotePort: 8606451214,
                directory: 'chuaeq6un8yuoweopevrmbqd7t9qve402ufqqucg4z7v5js9pa8yd3ndgafdlqzcbdg0boen6skpgk0apb1wbe1vagy61rvr78n2u3xes9lwrmr8j45tdmc1pu11c62zzt99zzlvopmo7ddcqz6sndljdpkg5p5ksr8b678lxtmot4wnbnt7eugf2qvuf374z9s2fgh3ev6zrm9g30lbljqgijhgmibe7xr6yc0lejjj8cfmqigt5iqp8vw8hh813tzyrfv3wxuh273m5gujoytoh0zt6hdsxrd6tvb7a3x0onmbck73848b96nase5hrfw1z6nhau3k2129sz2va6nmso7ev7a1xkagnp3yorezqof19vc2fppkxsnvl0tdalx9l33y7w4ngvxxf1vhj8snqg80lz2x5j7q7sjh52tntpcs0654r4a1ztmiq6015ovuuy3s259xu9hx4luqmhl1r8j1g4cbujex2owjgbkm8sholdjd2ql6y0gw9xvurn7wuyx70378e62n95uwpzkb11ls7sq29prjf1sbqd743dpfec5rfvvw255f74edoz894ugi9dkabbgrs9mogvoc3f71ljh0wfg72hde5w9vrsadq7k6im3twl5ryqwvaer24ncujq5bgdj6gqnjtmygdue2mzq699odq5x3zocz59szw8qt923rmij399k7owm2zylu89ra0ekw6n5qiph3622rmtuze3bks5jwzm3avku9g9exslar07o8mhfgjkus3c71yn3o2nzgo4pmk5vevjfb0tjt6m3yk8r3f7prhbtnhwmv7c1rwd673tzby69fy3pncg5v7uraibl6libfikm0imyyeqvckpum6up3arc8m2e9z372x6le28c02wv3zlwmnop4qzn4c8lrwrg6f7x8pzyw4kemaqqagxicqudmc53holxtanir17lw2vz49p1s0va01zgshpydrmnhrf6ok9y51h31tvcjc7bzob2l4b3y3g3uzif6el4l',
                fileSchema: '0vbm4omjuirxgykqbg022rhg4bx8erpfxsif3imuqd3pjazjvsbo5uzihabr91qeanm6zqtai4kbms2jt69at91g7rk1exlha0ow1nnjykor3atr1m61iruksw33bb4zwjgqh34zgu0qmh1ij9cvi9a2j44kbr8672ipdum61riaqjgvnyzymmt9yqqb27uqug6l46q4mi19zneevgs9a74phdqvnb84rb10vlymmff346dsj1k6hde3xhd72cqlxzb80uqmfn70dpusgm4eak7a8wtikzlz6spkv6xpdyhvxba5wwfkbj79qym61dvecnd0jck14t96oec3zgo9fyob1pwwbffrl69azll02jf38yicbgwgt2sfv4uf8jdyer314jf8cpecgg2iy3x9axtkd71ov5pgxbmnh2fqx06a204n61hfkc9z6s5rg3fy5cut17r57qzp27u2buvza3euw1amqrbf5pssy0vpamud85tjfvzynyj18i31p4v5ark0j6gqwjdh9s789wuef1a5vzbd6zwjyg7fjhg83ayutuelt9yxow0v51t0rkl8klgx9s4baxh9yswms9pv0ariaopra2nwsf9hg3e7pik830envbluv1tk48n3060o0fec5kjsx1tnj0riu574srv8lqkdhf6xwkn6lggou31amvjq0sxw9ei61frc9hhgo80jgj5uer04hkvmmmvjeuhz8fxjx53xcwog93xs6bnzk91e89ws657rsy43wxz7i7xprv2fhhtqfwa63m5c3m6pyc7okl8kbxfgqcu3b9splpv0oydmxr9i12zftvgix75ayns6tchxvw5zboj3mlm04y13w4fnu7jzbcukiit8wmg2ras64lian8ieulaj544g99sqqdrzi1oz66lrlfmmtl5vkcd4xho1plg0mz5j1m3i9qax8anho51za0is8felubgd2s91xikr594ewe9d3uc1rc8fdzqj1xfu82y6fb55uqtpq2q5v45vfdpe',
                proxyHost: '84a8n8tvsvtmtlbp3vdfkuewvm1vckasp635i1p7rb348zcrehauu4l8p5xb',
                proxyPort: 7662667185,
                destination: 'i4574y02lilqoor2hx32m0sj1oazdpm5y2pjkp394rb7fhijwlbw8d5dyxsgjezznrf78zzj4ncbmy1wuc6e55ddr1gd4wh2hb0t31nkfzud7iksrgocvlqoavu06e0458mhboiaqjpf8dwetp12fw8fa0jor20y',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gin07dh5pb1pjy51n8hxb83if98gtum7c1arin5i5medngicdnlko7bvpt3rfgwakl3ag2vno6mogswx6rzn6eye8570jx3f1lmqndi6447j99tmb1vewbnul27wwjrpx8bn8ggqlzrvivoxxmglnp8wzwnpp0z8',
                responsibleUserAccountName: '3ur91z7cdfps9in4rty3',
                lastChangeUserAccount: 'rv7dq4qvhdpmeagi97r5',
                lastChangedAt: '2021-05-23 05:00:11',
                riInterfaceName: '72l4xnpyq8hff429benf9hegxx7fhhon0zvrbd1y1aspvu2plyitbllscsooz6l0l75xdknda08vrqp0yfim9des0iwfveg0tbn5bj5r1280vfam0hxvglssjxbp23slrqmkt4bnwa8etndy4qgt8eiy5v6nnma5',
                riInterfaceNamespace: 'sg86bxbwa14ckrn403q1w3rgc2j5mmwzhai8davv28kqg03rgfjlfjrz7xpyvlvehqn8h83vz90bp55tsec8pecdn7d4bx1d3cy1taio8ngby2oesii5arcpyhks3c6mzhk3j7wn5vpylpq9x0xg3t7idpvzkrft',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9e284824-5564-4657-a598-c0d286f99416',
                hash: '0ar6jrgyoro3503hscu321art6uj1n0n25rmb249',
                tenantId: '2a15c0e9-cf44-4fe8-8271-c3ef1e93b146',
                tenantCode: 'kmav34aw8tyhibqo6x3b9k85ck3tqzvgvnbp6ws70mrqocxuic',
                systemId: '70798a0b-896d-43a9-8196-49b9caad3396',
                systemName: null,
                party: 'bokqh0frq433mghk5fq0fbjevsf6tzw2jp4o01do6cz5xp5j91djz7ylb8deqo7p4om1tonsq5qpye4p8wumc4iregn7llx4gvd06jvjxcacs951odyodb1cnr1jdx8u2h4gs00i888lbl1bstae228sykzmnk5s',
                component: 'ebmm2ma1o6hlauoeuidfdh60tzmzvjsdzro8cb62g44lzfb633qn7k7unb0jtqbr3roc7nzaaoojv5abw1skdaes9rlnbuqul9l4z4exo9jcih0ldkmjlhp7ndqy6qwiaq22vo3a55j78mwjcrolp5hg6jigok8l',
                name: 'mvwx9qeufuxx13tyj0u8u05ricvo2i756c1mg5fgg2olclsrwg5s49ec8np4lka6ijopgwcq660aqvv4lrflqqmh0uw894yd3czv1iq2pjs8g7d56em8t4jyvw6nonaz0wvkoqd2ydj31rvuszibrvmxcc6kcy7h',
                flowHash: 'xvvb7hyt7370htu4bgs2d2hrqj5r5r9pnnju5usd',
                flowParty: '6rps2ey0wnx1xjionlmfe6vy3gpe01aos4du39i2yqqxj2wleiakoslwk2zlgjtmhdb6w3h8xufjmwrcjaipoepzl35moztit3ayce1gwkckyt2ijxi0lcl1qtkp2py6p2gjydmaxc1hdrajlao963ojevm7fcm5',
                flowReceiverParty: 'ft5rmh911033uakcabltinfmn1zf1ophmarfqo1btesks7ui9r5chfkk7mmdp1978bgs8iff8j5c0fzy5kmjhljxck3irk8oexacyqcde883p0eseler8evmctild37lic3e92yd2lm7lnw33ai4hfux6bww7q2a',
                flowComponent: 'tqd3zrtjxhmt2zu7wl2q7yrv7333cxueqnpbq6jjfzc5ckzt72h3bne64m3qywj67wliqvk6hfq4xib6jzd9znqxvnaavr7pnsm7sb45lqrgawtcjlf04hdzrtx8mj6rdrptk4eijiifqh3avukd4ewwhwrqgk4g',
                flowReceiverComponent: 'dezm47aovb87rs410a39l6ujluw2kyokoehiov0rvljdaobpxusuicfeteeg96oo6ktad67nbjeqq8kifrcbtwl73k5122mna7vjm61sjmwbm3599iy6xgdvjjlf5lpfog92zibgedvcdl30wxrx2pqwpidaot0u',
                flowInterfaceName: 'plnx9ryy9v9unmus5cmmnsiyfe9xjzn3zko3te5g0n98u0apn7dl6c6s4vemxwbdw7iwof1xtleg4ubueiswo1eu5nv14mls0x6an1ua8u155k7651r3sqew0y5gy428esieie20yj8swix4hx10pviebcpex2qu',
                flowInterfaceNamespace: 'owbclvmz0ik8r824qoefhpvsfnp6ujizikn95v1ud60q1okul5xxca7c3d0i7np5o4thb44h58dizkt0m56u2v45om9fu15yypywjdw4my4imx540jtduxicafs0233n2itibwxqlyt183uwfvsof0eg2n0y2l81',
                version: 'fa5fxp7ok85a5f6eif0c',
                adapterType: 'x3k0ob8qcydwg70de1vnx6zb98bvce89h6ogvnlfay1mpcns9n14nd9wb0s1',
                direction: 'SENDER',
                transportProtocol: 'fjbbjuar8zsex52h3y2an5b969i06qjcpzmnq18vt0e2obsn4wjwpu4nd2dh',
                messageProtocol: '8p9ayfsza2299v799q6hky8kaobwkx9paq3b05be49918g65po6tkkvhv0pt',
                adapterEngineName: 'dqy6n8mlev6ko96gsiyr5biy6nrctg1m6xyv1lrka0z3o3dv2zm6e13ag2edak9ifgw4hr8e2y59va0x5094ebf2hr8ty5ykd7o83hustxvbr95z9skxw95t2a6hubl23ks8n695g501b9xi9vaj1pfy9ty2i2ns',
                url: 'simtrwjmqy2bc66suw5951pdv55f8pk79m8maygmplq0ys9dvuxeji3d0lwym7gwxdwx2k7kqa9hb88rgtlqba2hqz66bb9sj2voe0ivxn5g57uxcd6b7sbw7d6qxat4lu49eqif4iac4bhfhw4ikumdmqd4flg66b1iqrrpx7cqtcqw4wv8hclmt1hvzwux8ep7jcgic4pnaxii60p8w1enmghsx4m73oont06g9gl9sr58jyos7r624fjo1smte6qdah3z8sicgilzz77llffzs6u6flpve6sce15irn9qxek7iefg3nxyrjn2pim8',
                username: 'yqt64rzkvoqcpdifv4qo4ic1zgd19046td9nt696l3uu878jolfpn5d34odu',
                remoteHost: 'lzd1aherptrlcmmdxetyvawn0c46gontfwt7fo64ancvnd9cqlx4mvcwkdizuvgn1u8g6xvsmnkf47nzdq0s399q5kgh3ot7fxj9nha4kkjkhhk3tm0ws0vqwi3cd73piy5ggfdugbykvny1izkgdri9niunyilz',
                remotePort: 7866206566,
                directory: 'f00rnz6ecggga2ybs2mlvfmck7j0gxssw49p4i48ifw3io01afoa8emqh6yiedvrr9d3a85bv14aajto74flwftr4v3sgollivvbdw6nng8rvrefksykd793xhavswiuq6h8gwb8jmi47a7medwo08gsnjnrh6jbx8x4ct9e8ojgl9mj78oxqyd0fdfpxyh93e8ifx69j183w8nqypsxrttjmxq3wwc4hwjq1sx157lphb2uydp3okjt2clo7bolqhbvgjk55x7zlis62tllj2b2f8n0gl1rotcqewjv3lsp9rgph7hv4yy4k8iqe7qsvzatx10h6gdpgiypjdj0x4y95uiah2utozy8qpk1rwdhbr65j18uk2i5tv674dsohe27qy3xom2fjvhyymuobxk25g50yi2b5pxn5nf4epmzfem5rbk20z9q6bwenok0nq1a9b6t9ugre7igls4n7alndqqo4jipugprhpd8mg24wn4a8ekgi6edkrp6ybnjbm99p1v2kpcd6ucp2hsb9kkmnqpeiw9y41syrlxospgqkoc9xbovvzsx6qhwhnz71j1g5d1094td23i1hyx2ngul4euhaoye3ow2tpucea8vyng8m534t7nibg7xy60lne9d9cpqgwtzou9xgui7d652lsrrwzj716by08u5zwkfbqb4byg6pu3ly4pau5j7qyjv0kof2xezbffv1frloxxom392704dzmvwr2d9foa3rgcyz9yuucizr1gbec9wx5fomhcln16q5zkmjf0diuerol34l3i44qx5b90mqaxrc0wdye6y9row1j3rkrgvtlh3ib3xqtk7vitipqw1de272wynuhgu3rtbe5dscjdsf6p8fw2c9h8s5c31r9u2fgs9w59c2612xd2o5ria6tse2f4s3nxnkxr8qof339o6i32jj9lk0umzzjknrnyhs2oz88hm8t18w9xvdi4mlii2u0ri2q3jtltx890e2tntiynbzb0rbehse0pzedgf',
                fileSchema: 'dlyrdpo854bp2gsn82vobtrgxcjn18y4vdgbu15a7u9ircitiwdsdldfd54hggab66k1jzndu433l91og407pcmd0yptprig81mb0um2k43kqq31e8pz48av02lo23jrn4jcd3cluy3ww4s0q2vwxpdzcgfox5e1yxnw397t1xmia7rat4qh9pgzcvk9df624do75ub1rvw0mtqqb9mpb2fhf1thdcgn160vm4h7d5hg9eqsllbtxe4gxl7rkx1cp0i4g4pwoqnvcprqts2da9e6kmcvkk31y2d2wjoust1egje1pb67dfqtghkpbju8v1htolq9libhl014ssryk9anvrbm72u7urae3yr5qb0oowhujz7u1zfvctepbisd9y6ppkyt4oey04nu6hrd1jctgjyb3uizo61mzl4u4itr89zdtx5d9tps9x8graviczkrzd7ezbgcsd3sy8m40dl4ct38wyszls2ksc5jptthyai07viudb4tvqx9survyioheas1qjyqbofb7ggev91iqukllmyi1306uydedgck6q6w05xyupnbv6zehxniyowuvfojziye272oo8armo9514vy9zdltkmhkdvxqvivzns5j9r1udpz6viktb3hz52ac42yh6ixfqin1wklo3e3swpdohus1d689s1h1d78hork9o7l9ukbd55hz7o06hu7qrptl3r7muqj2r9ayl92e23230r749bh2nv4y0gi62520kyih5usmrruqs8g6lg96pokvh9bu2ujp3yqtglt75gt669cqb22n4yiwoz31wt40gta9h1h09768q6ab5eok7ok63gqhs4zg0qfy14eo3i6kp84i6fya77y3hlc8erqqter1bkzp9u98ya18ypjjy488dbzw2n9ldgewgf6y5d7ve26au76kco1ut6kxdwhfq87l9n1fv2cvhnnco9htwvruy6heohi4suchndx4l0muwkqxlr231kfbf71cd85way1uask3my6gu7o',
                proxyHost: 'ixkv4ae8so6g7305e5ni42vqbk3i34jo78pvizmv60e11va9fsnppsgenc18',
                proxyPort: 6985740661,
                destination: '0z4dwce8g8gokj9xhhfms75h0wae39uuiho7gl32s647mg5inppgicr3un3dlv4kldx3qi3lv04emrab7cz2pdwz2drep6reh83ywdautqe1a59h7mw0jsc9hquq1no8g08y9aeiqvtkcnuzgfpnw0dg2hpum0nx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0b2qx0jsjehgvvkr4q9aolmlvx83bds0mnia0j8i1kodn6bm60ecnyxn3uocl8lh50ygknmvpqo4gvxk13pdn7k3c6l1a81j3qgcg1ip56qxxre97yfqjeruvtqiamh6n064x3ed0aph8x8vm8toow4z9oesyzyn',
                responsibleUserAccountName: 'blijn9tpwe0zv4qdb5xn',
                lastChangeUserAccount: '85r3q4vsu9k801mwvne9',
                lastChangedAt: '2021-05-23 13:30:14',
                riInterfaceName: '5180xftqp92vlnfshgbvpyqrw5hck11yeagguzd2c8g9gieq9fm8jtxfymb09u6u2bq7vjg38if7vyvzqztwchyy3w03zxxo01z3j1515uo8i3jcicppzu1hk8no3sp1u0ztaav3uevh21qi9okjza7la2wkv9au',
                riInterfaceNamespace: 've2evc33y39te04ry6e8u3orbjaxl2l15t26nyn9gwscxxn45ltxbl1kuabox70v2x7h31lz8362g52h54qnsgpp0oqwehigigqqampeinj8ygcu97ws4j97bdb5u875y65imj5fnjo5h1h0qwao154xm0asgzuk',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b73cbcdc-2fdb-4206-b93d-1ebfbdcbadf0',
                hash: 'j9z67r6yr50b6i9hdd0sh5gmwckdtr67bpwu7azq',
                tenantId: 'fbce90fd-1ae8-4270-b00a-8ca36d5e76ec',
                tenantCode: '2pq804sdayx31mg1a1i992hun06zo9ysz25kkf9zlbc4nwx5jr',
                systemId: '0a4c8f9c-0d4e-4ebf-a167-791e6cd07157',
                systemName: 'pmlhrx6p0adieux0j35f',
                party: '77ptah2adzye7g964yk5i73esngnvluqcq42mjfdoxgk8c38gtcislg1cer4md8mnt5hagrqpwo8mwuobiaqne0z0ktnz39dvo1ddrqq1o3nvezjdc0i075b30gv1cfej9kc5vqakn82c5qfgmdekdxck3gsk8hu',
                component: null,
                name: '07bpu9snm0ae7e6tsedio19oqdhq4o6ort2nd9uvnehcst6a221bzckp1puue7yjjigz2sxqpjqxifq63k4ne9g36nlz9dob5msc0nd3gie7rs0ebx19rqgehhs42de1qhxrmdmio9yb086qtwxnglf3167sf2ib',
                flowHash: 'yh72ltntjmdg8jqmnfq83do1uhq6g3hxen9wmuq5',
                flowParty: 'xylb77jgfxpf8b00qoilykmn7t1migekhg1h6nrhyrl2yt72ir83bsp5ngr57dsa1wwta30hnxwm594717idnuwfx95zaf1sf2l2t90ry1aek3x13br0m0cdz0lllsc3ha0wyj0yq00v1zpdd0dhm2wcxg6td8wx',
                flowReceiverParty: 'ojidkws1w1mcpzijbet16p0n2e79x7gptx2p7d31u2tble3zv9qngw5x65422l8iiq4sivuitgpflst7n33rp9eqe2p6q5j9x712yw7go2i6kie4s0witnl5ymwqwcirmtxn4fxi9mbind7pub49bzxix284uyg1',
                flowComponent: '58hrnnbdcgv5wjgvl9k2y4e6tovjiwrtm9jhpi68ydx5tmgwtdlj5tmdwcfkfejioai1yenep2m0ynwf8nrbd8of2asvub0eg35tay2bi10ybuz4umbrmq9k4hohz60q62cvgq726gth3mu6cfpvk2n27waymoc0',
                flowReceiverComponent: '48zzo930l9ht5zmu1maavvallsg65saqr3nnz1j55eu5b994haoaoosnn36k86mbi4vwn8o9gzezn3j29egazmhw8pdiix1neao2nmi6yoj8zvhbuzslmfqbbjdo8w05ysb6elqxr1y3we1ygsoxts9vm8q6rxfw',
                flowInterfaceName: '1sykxs606ltcx1m4zcvzerbzyjyp1soypmwdet497tf5wowof0tiyhhmloua030q6xkvwl34t1s2dhy8tsqa00g1wz7wxfn0nr42i2uvb0rjjf51lf20p83wd5k95cjhf5arvkoym4lng4ampizd5hg5yywycjc6',
                flowInterfaceNamespace: 'dvzmw1mv5bima2p5n7trahr1q8im4fezzbj1adcucdce89zdzovultpv1hgnn3rfy48kzhuqufubr6uh741tbtl1hww9m169p2vw4738lykuz8kpoo4ubvvyid3dsr5frwogi9vrvx66kxfvaeensweosmf639hj',
                version: 'p6z2wpfh2ah5gwj5495m',
                adapterType: 'ca369qd88ztuf6lxbfv4lvv91vmnx3xlx3spq8itoc75ugepkufp5vf5fhjt',
                direction: 'SENDER',
                transportProtocol: 'vdqo38p3w5n4y3ca6cuzs45v7d01c82nn7bet2m2mjauuqhq4m4lpg3tpdov',
                messageProtocol: 'u1wg0h6yy73s9f0g8hupmmv942w0h2ump2647jhi0vv6mkcvo3bmexp12oi0',
                adapterEngineName: 'v5jd37k7np7l6x13ld4qs3c3rlix9mpy9dis9y5zpiq3bvzhr88xorlp5jz3w7bkrnfp60cdkwchc76j1vpb0f6a5jxhemsh92oph8bg93035m4omvy1rhea7la9iaa26kj7zdzetqfhiz1fdxd9y8nyv6hvwx4x',
                url: 'q9jlt356cwxze0125g1sh70bow803q0m7t79bsim0g5sooyxr93qideksufo95duqxs6yg372wmftxf1g4err8nufn0eig6obtjukf30hhvb8s2ga266gcj4pw6szbelpaq8nzexyl0e7918s7g1e2xd5igp4idh7p0si06ej27r5gvd4x1kwj2o443wxb1fmii71fcehh0kj2ffyiywyn0l8ut1blaatf4rivdh0nxtzlom1jevq8t6sqd8mqa98ns8p7rawya9vl12m6nhrthqfrnfkr23oliaqn4ijc9wolz5a061rw37s5udw7vh',
                username: 'nimfn9p5bhc0ud50cp2lumi4h0xo1eevn09xvwtnwxcdottte5bwthf0zce7',
                remoteHost: 'p7wvjklx1p730rdf1c9ghi2otmrb92xoexjdms6z0cyzcjigrr3cj26d8elfs4827rjfk7h1ja4eip5rizhw3e1qy5mgbmwe4odduf35lyejf10vb7l1hyi1nf3nnhmtb48r25ghi6zwnr7dfn73vk62xtmpiea3',
                remotePort: 2223646779,
                directory: '2d67rt1xqdmgs640o0mcy8bvx8stzym3vrm3x1idk2xio2220g1erv8yzk0g80tqq0zqv93oiek1licbtn1ovgdsbl5cbmaplgy2ydecurlnh2lrjzpx3tau4496hps3k7nd0mvteuquie3uhk2nohfrj1jwjjhr4hhog01avjv2ok1x0ur4n094u5pzu6otznmgrgc93q52tyeye31dwlwxzyvm5du3uvyz1atzp7j3dlfdeycucocum9i3aosnxgns87vw22s8x1c2jl0rknwmv1ekzti8s0ycxs5kje9cgfz9fnv2cbt83z5qvz239hf4ax3i70gns1jyavaih5jalexlwwac0df8ibyjy23v5gdnkabptf3chzgsiou0ye5ffx2fat8dqyfrwrt47dofhr9aecasigxaedvb3uti8rbxdiky29cenfwe7cxpi81wbms2z7yh2nzodx20ob4dchj7l7jwripi1ww782wajt0ubiy8sqhxaqd33pen560j90hxki6ghlx01i3276flavavfz14bhyzg05v9kuvnhrufglxg76p9qfxnzby6ytqeyf5l921sfgs3mhoh8vd34ijwyaxig468c4ba0oklo7s0k62dg2itvazqy4hu4ag7pwloq8xsn2d730kzgloavqzaefug03wm5kj2kq3ju20gd7a6v0schtq0atm5ioavtksi8fw1dc1a5848mk1cevjycjm7fa7dlqvzl2h5pfz1ojzs1h5wb5fb7vzww5o0he9e7zycygg9w2bcw051vy999j5qaqvviv29csvst8bvnk4xrbucet28m075jkqduc9l26dff0hc233o1l7jl9eopaektwt891r0xtir6x1hfax7b8t46k6yod2l16qvdsjgcne89j0n9y7ls6iu3ejzaw8vonbq4e8lt5bcrvwsdm010dv6r3xp8naiysk75vftnuojywnlp2kccg9y7w4jdb5g2sp5ald4flcnwrvcgexc49a7q1vp5yo',
                fileSchema: 't7ocvz2ayyypf4eqj52wqqfqbikjmos3tz9ed8c6lybw75fu2hgogf3e0v9m4w70cif6wh03wba593ocuqcidpcp3rhinpk6e80mz3fjyphhroycfj41fy7xmvqqk68aoj61uvf2tkp39o6khyf2oysef35a1c6pixctus1508kj1se1njkptxw5l29888o5qecoze4ic703mzj3wzsibkgeab3p7agjjj4evf6w3pq2jakl6trh0j07q33o8ae3xi3y7az2v2s5h207zfrw764lw7xs6isr3qoorgll8sfglwwvdn2t4uvtqqtp5x9h99bvbjtgcxcq3dructalyxiar0l7znuoi47yzi44prn553cqdv341yn36uwfji4lnbiqeo0f2odj3cvjqa1z0yvjdhwvt0xemvujuqcswg6rlwo2lo05mrfkno1h5gk1ycv2nud41idrgv5gbu3cucotmkluw79g92hjim6makzq99q3z61yjgtto77xoodld6bp86o40rkzs7q6ow2qj2j89bd344nub3l48j1dpscmtnb4rz3hhcerh34n12zqju6lmv0eemajgxzumhgp6gzjpkdm7xp8uckm14db8rok7otnwh96jtereudtwq7htrgr0nbp3t3j6qpupu49rnxo3kmzdvdoe7t7ujzaee9cq8vc77yt9sevz1bpwkcve5c2qzrclv3hngengzhlqn57te2to3p99bdc7lm4bxpqkddwuww155z8phhnocd0bn2t7pj5azkz65ji4jexmd0kt5uj8jqe3ebbetntox6onx49ngrwro3cj9azqqrrpu5mqn4ti99qa0q5693s1si1m5riqn79zbqmeimvqeannmalvfe0xmo05gegmyurlpt067tfffqv6c8rhlboke179tay91aydg4nxv9bsuejsugkbu4gft1udsfhjhtiu0zhn5o58budoetrwhvx2mh0nrcp6nxg08pdaknggfg6thwqr3x1ilkppycu62a6',
                proxyHost: 'b3q3gyd2hutle4cs1let2d5ugtf4npclrhecczaqlr9fkcxrbemv9p6p4es2',
                proxyPort: 7673441886,
                destination: 'zg4qnk2dwst1sc2gttr82iunngaln4bb4ra0e0l2vr5bvrr9tr3bqyis3qpn959yxbsuj4u239ik2jriv76fdqykbwhhpd5ft7npuwujmasoip03iw5tfk02b8jl0v74yw70748ibg48bq2uj42nind5rfwedkdw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5zenqc29qct6u2hcith7nl2mazv1jjya6ofcaq75a29g91o2gkwg9w1y1gfai4sibpm00vcykee27hpqcg4lxptju3pm59iifhaafrf13mbi5kk7qmm5yzior0qj7hfjvjd2l84uich4cc55kfzr27je8cbcs7yj',
                responsibleUserAccountName: 'a94wb7elqmxn9br0nv5a',
                lastChangeUserAccount: 'f8tzxu0lap7y85caat2o',
                lastChangedAt: '2021-05-23 04:05:32',
                riInterfaceName: 'mczwvwb140029jc4r3px2czbjghyaj16fgk5edm7xf6411dict1mgfduyl6w1teglxxjki0tr4o45rotltco1k0t99ljeiq2w9jhinurgvd20turql01o4ux9jezuerv6ygumqoerpfxcdpduuketuubovz9pc32',
                riInterfaceNamespace: 'hoy1bsp52rspqvgf3p50qk3j3i8m7rgxh22hsxsh66q5646k1lz2seyyfwkpxjicx9bxyihf2hl7cxzvva37mms0y46ftw4utv578fpfb22jkmirp17hk2ws1c8qzebdc2lhvgquxmx4qaox16t0k19l3b5bt5te',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8d489dc9-27b3-4fe2-bb13-7bd67def5cad',
                hash: 'q9c3x3tjzmg9bpqi4f93m1uuc0wax8rrs0fb5x4d',
                tenantId: '00475f39-576c-4ade-a2a2-fbef1872f5a8',
                tenantCode: 'fj4yjbbkudpbw8srajxyzqkxfv9xxqo9j1proyx01xc08fs3wb',
                systemId: '0d2c5e4d-b4ef-46ad-951c-651f9150d60d',
                systemName: 'aw798c7h5sear5c2f8l6',
                party: '5iaraa0rhh5k4do0fvyggx0by7tc5piss8qn4qb9e0ef0j2x7p0lyw3anofqf3dydsk9z5zqjg0ax140uw4x7f1pm303tbsdcgc9h94yk76irl5ne4thnx6ffvo8eue5hafgpkpam4wsb5jrywwc5zj4tfpy3vfc',
                component: 'mkqidlt4c7aq1w19n4o2o6825pto8ayxxdgfzru9ncpg6mn9hg2mdg7avibb84m6qegvilcoigcx0uhqe3sge5wp8tyhhym3h4ooxfa01bpk08x21d0x9g937tw3ka2vrsj0g8xvvlel522varvwd2nlj8glv5qo',
                name: null,
                flowHash: 'jtd2qmj5dri3oq4uze68uh31so266ugq96gnhcld',
                flowParty: 'h1u88oblkovefy4ddu8eh61bm3zjotiormog13le8xiec7uhqz130qy8ne0mw97v2k389zt43z8ajhvj1m9za4z3dwvxcy9l0di2abd5beym5686hhasepob3di2ydr3li2xc5i7m6lgti248o8apyloshdlqr9d',
                flowReceiverParty: 'qe4nhdizcz4jj4fszu5uv1dlma5xhn87fiauyrmqd8n8ndi1gxxsg6n259auhj5vfa1o5ymsl31oyfamb20boxxc94jlf156i2aqod4tnwrntgwzrevvsw4qbq4bnbqzsb0aeu9w3ujhbw38pbx1485suaiveqkg',
                flowComponent: 'esupadxn6en9emux981xj88x477yktqmsgn0180xw648n0yyec9o4gvlgcky2o8o3u3baac8zsuzgu4sigctwodls9zrm7dodrdbv0soz0prdwu1g3youzm1rmk11qkv8amp1x6e5u8krlw2mil0ll3oylors2d8',
                flowReceiverComponent: 'q8qwq8jpl4ls2z5f2ox43ngp6p3e176aeon14irod0iimaqsldakahnh3qgk2326s125qo2vvwlclwa7rshidecsf6dl9g4uvuw8pasevyqieo6lu1f2mv7u3b4f8f84p1xypzhnsmfdkxin6ss949jvc2lh2ywq',
                flowInterfaceName: '4c5y81348sdlsmp78golob9itaz3s2u3pin6z34h4f4jo4v5d39d9znx7a4lj3koaq5dypo20qqfprs2ew2m8ui1xqc203mwhkhduve2uj5cklqed3jyrqwg0i0186x4si2433shn1ykoj4absskas4duxgtllnm',
                flowInterfaceNamespace: '7jq66ref11es0dxm4g5qbuwxjm0gm4dnubc9qx0pzg1sg1exoicclh5yml4875f9lq3zik55258hys1o7y534eq8uq5elvay1gldazscvypc5qj5gwg0xxzg9nysnjpi0wfyy8r6retphsigov6gtbq5jfw8qv2c',
                version: '7xeai0a16rtjh8euaemd',
                adapterType: 'hvclo7d223mld8dzdx4a31sb5fd9jrofjah7kjqldtq2lxxi0k3tdzo4gn8t',
                direction: 'SENDER',
                transportProtocol: 'jwym0msn7sk46zhuqz5grchid0fxxu1omcn9x9l6duco2d1q074g2wh8swuc',
                messageProtocol: 'lfit3xm1wt6vwypxfg2xrc2ed8uwltrcpfugtblpzd62oywr2lw2r38s9rf3',
                adapterEngineName: 'e8flf34ldzspyl11odq10kni4xt2sjkfqa552vncps3ryujva5iuh7wf42mxa149r36kze51idzpwhulcjlyb5ei24zgy2xaqvc9ipyw9vit1e1z8655kjk06r1to4kusnx4275h0ln3tfba5qm5daktuhdjh02c',
                url: 'zsclw8stads72u89n5l5zocw70ptula9dsrxb0glo0ldoqbn9t9l0gyhlgsqyjxqf3teeun04zzdcmqc1yyc1psgj5jso063qsb7sxkzmo93qmgtzvtn9n3sb9shvrgcno3mrj6cyppew75ogpskiljkbwk533tz6szi4d8mn9q9j2x408uj26tql1rurynt39iuiz1h7nrxcge3yeqhic8bprdyuu1qxflvman4ovn1ewqyan1dcw28r4ljygwe00wzolidwxghqg5fdw0dbljywlbm53v3cr3dfdagwajziwl957uent86p9kthhkp',
                username: 'ppclr8ekfdjhwd62dave3ysddjodgrbnzy4ueckv4mrzzcipa45qz95s63k4',
                remoteHost: '9pmew36a7kk0jdlof400skwxy2yhyod4eun75knhg1la05sqwfd58yhu43qs0f74umlplv1uax1smy3xu4mfjgoolpnsapgo91mrphtcs6k8szyslx42wkdk1tqsv5bimee8xsfzau033nng37mks897nk215u26',
                remotePort: 6363574359,
                directory: 'dyv4ff4t95qvf7503350mjbqxdzvjcde74auyjmiy50o2vjo86wwjgfdiv6cvgvvunzj3c24dj42u9pdst7h8n3qgysrci360323leqkx64v6y7zr178v3wimjwz6rscu7ddn43kdubkt5balnztywbzgyyv1c1tsa44gg5ydb0ff29t2ofysc4jwm1c44tp2boppn3aeyuydbzcc43lag1ljqndnhfnez3b8bvpvew81zxb393gplotkstg2sh0bo9shylb5jj3jcj6pgxu04aruf2kn0gg450lke2ijdptcgl88iauwoyu354hdbesrx7bev0zw1tdzc6znzkmh06urkpb0ql9rlvwa39w5yf1xivqpsy58dfi3fy6bw9g71cu27noc0p0k7y2tqgwr7qoveoz20cs3a9hhjssng144bh93iy2jxxvdf34re3rqhv30ulfg5n0kerf3br9nl3peeta6z02zrww9bn66aocqdiiset2lh0uaeh0zyj9eghnrzygqixq3lylkb1ohp4mdli42emli46r0r7gmec8lvu8yg1eab5jigbow8mzud9j6odoeh5o4spr17n4sqj4z8srml1kbb03nsb3jwtg4t1s9lc18r3oeovlhbbdnxzws6i55atisirllfkxxuxgvcrh5he3d7z6muod7zdkkclykq0zlufstlh8w958iivbxyjyovaslpl39vlr3ixttsogs5qkw1bynniiwlw5d2kuzrw2xmlop415sagsiw4nmzl0vqvnsw58xl4n2ssdgf50vkvnn63qwonscwwxd6qz4jbisql410wlau2cvat0ccomwv11npocv61k2i4iypn6oz0czbnf59wepcfej6p70yc4eu4v0l5vvbrp1yzl6v6cv47b0tazbxv5onq0idllmszxdl4a1iaur7bh2lv17ajs63lz3oksj0l8909pzsksdevy4h2924v12a7rkbrizpjrf8z5v55jk7a8y2szl9zccp3tbhyurtjc',
                fileSchema: '343fstq8owjqzsd88hced2wv1dtqqhwdbvwbj78pvzueipjfrvlvkgf2sekz5aqfus76cyjnam4cxcir6jbgypn8av9vzqfa6y82lnp3iz7n4il0ib038gls3v5jkg0cc7vvt4uwqhoynsf599tc3sbz69rckhkbu1eoklao9jbqdsdroy1dx3x01zk1vrzdeg7tu9eln7bzchuwt6xudx0qyqk34do5ieow84f4i716335yac5jwlnwz28143jcd16ehgyk0173fg36rz19gzfkp7ulku43uco0nk65lx509pbnlpsjqg34cjxd9iu2qpymmk0lg9qgxy204m04sa322eosq61w3rzzlcs0x38j6xrahfav8mic1mbrd4n7e8w60o9khvdkira9pvv4o0om3t7q73sk0g13vmaax06xqdkw3jhdhe4tzj8kzyw26esaoqgqu0bf6d915yk33zzh6zz8wyfxokloiagi9nkz4d1el0uv2zrh7jf7bfjnnkxdrc5wtv2qiu1yxb3e8edcmwni5ji993ae831lwbiz6jlbgcaqwi2t9bo1g9c3lvrw8xcpto9k1dvriiwa3w6q5j5k9ezgzn9uqyd3kuxg4kyaa3q9h0fx901wdypvz4wr4pc3pab1imrqzl27qldun6b6n4n8ys99o7o8jh0tf0ivtlsh2sm32uk7ogqg5z8sbyngynjmskl73mwl8pjmgsriavf2mzb1xtajebnyraoeg803hkqxr5f2bi5njkpp3p446809pnbbwcc7pndisv5tdr4m3k5jilp1i0nvxrdnvr805caxcykqlzuh34vw59ce3wcf94o22a25dc365vx4n9v292gzp8zsi65fooamo16a6tyx8ewi43zf7m5zfhmk2cxorrw7gdo4nxev1dz11551kzb7wyddj715ldzqk9b64b4w76gwyonwsvxuea1x4qc8zcju9ga1vpjikkga1ivfd0ho0gdcuecfvkn79limvsoc4hdb3eno',
                proxyHost: '0pn8anlio3mnhqfdazpbz5wyehkkc92os3nl6ei6owbikizmnfmlojs8dskh',
                proxyPort: 9634655641,
                destination: 'p1vdm0maxlvsm8tcjfhuppeasn2pe25pk1omka2505xjxewpexj3f8vnx87qc2v2yrpt13qgz9zz3gj8vx1j3h4f2fwr4s3l5hnim1w1fxyt0tuvuikdcyq1x2nd2cmxuys08gakfl5n8pq3r6tx2h6yisjqgiy4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ohwqx6hbnlwrppbuewsybronvxtqewl9tlqnz92xmp68gibubmcywbhbrl56ejce9umisylnojdd1mwhg3umzyp0iljy5rh3heb6ogd7vncm4umvtaq7t99id4hf112o528eaj90gyilf5dlb6nsa7n4jajss2pt',
                responsibleUserAccountName: 'dpu1lllea6684tb8l1z1',
                lastChangeUserAccount: 'gs2z7tenejb84hzxl27w',
                lastChangedAt: '2021-05-23 00:56:16',
                riInterfaceName: '7304yn9epj9ukcyw4hr9psip41grh4edplns881mwvawa780p35mzba5etsbacz7bwy0z8snu6tsav7zmhjcjqsgdi9b0lyvs3owixw0a487yocjh1rdqj1t7y4j5m44edu6hr90mgi1wv97av82a4li3y4ck8b2',
                riInterfaceNamespace: 'lx4lzvwag92kygxe51y41wybvtl3om6ht6ga37ni0bpkn49jfi6mrdpzl1tgzhhgpzwbv9nruvmot72fwi44j4oouofhgugezfhvmwsedt9hki5eoigh4okob5n9gtgoi70xq026n2cjlz4eoq20lyd34xxh0h6t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                hash: 'g93lb9goj04yua6sav94kv4ao1e1g7b5vy8nt1re',
                tenantId: 'c54cbfcb-a1f8-4a42-965d-04cc43860ef6',
                tenantCode: 'pb1408izoe8ef3m4vcgddcrbleai1dhbx2jp7penoutkh24vpa',
                systemId: '78bc8fd0-c0ac-4393-902c-cf325ef0d950',
                systemName: 'notg4132jpvxfklhqtse',
                party: 'heib4egwbnxqrhas2h7tkq3phfcwis882t2hd49qxdv6as5jmvii981c969be5latmhug9rrgbnkjfpqs3528230qu980ynp1glld84s26hlvnlrpk2f0l6cp18btznk5zkqdrdr5721kwyv1d3g1yk3ryubaubx',
                component: 'pi4dvn85ehn6mgu9bxw2h29st1zrtw2x6n824xgu1vq4h7674bhlplniv8d4agm93rjsdjkrozkkc86jnwd2bhcretj4u20oggvwy7yhjgdluyut5775tlojh9682h1edlur7ociytdvpnyey9muojfnuzzat7cy',
                name: '4o5ex4skfm6p2rvtgg2nhov4ajowc1agzuwiq5qmtkteuxvfeqnhuiotn320tlfldu7vlwdfl417i50s5psox2g49j4hprld4zfg39by6e3vzvtbalm837hfnv4xvaa9zstoj511dxz3y6wpz8o8dcb22ems42e8',
                flowHash: '5x08f0d4h5q5hw3tozvnu8sa1k0a2bj24de9oxpw',
                flowParty: 'ixbtsz58svc24jz7az3yugsu6j5v9r31vgiy52ffx8qf68oy86lyz640i0732rviymmkxkjff4i8ox8giad9pmjmacto1eziw9ctu3c2nmr7iheylu67ki2nhuhoj8i3wpq0vpnf9flbcd6busj5qnbduw5k9eoz',
                flowReceiverParty: 'j3sxeojgtqbl3vc5nd2vcmjt5f9y22v1e5a1lxw8bl3n5c317ks286vanclxz8oou1orpppky54mtc7ocvh5iba4q0xn8dmrz8rzqe854mmuhifu68r9bjd4tt3q45nfwneuc6ha9h5shusjvbjm22acvefl794y',
                flowComponent: 'v66mtbm6ba4bil4fvmyhmcm27hce8rxorchqsa511zlnpdmjsg4977a6evzb7lg6i2x8xtshnzgq0mb37j8uztgeonj6nwkp9k4jzq7v1oet7hvega33lk8qvwm9uju9pw17p62w2a19yu5whn3mbnvlqbdl4sgx',
                flowReceiverComponent: 'zosl0jawo1fe2ztxjub9qfeo529rrfeayjapmzpbttg32l04lu60m8qfa9xloennm000ck4zr8kkcfq7tascvoo6sp9z1ga28pqhptw8xkcf7wq2e6mjq8qfrq8t31mi7xfh4zxt6nmuxbe24z0h4zuhiv3qddi2',
                flowInterfaceName: 'taovlx1y5cr7xybnt0u1u9oyw68bn1gasf7vxvtpvf5ocv9l7ffw3om3eq2qbjtnwr1qrb6oui7917xxy3agq74rvyzmj24i0afl6rwde6l16rpebfbo6xrnmy71xee1api8hry6xt7btljgsh2thk9a9ymte6fk',
                flowInterfaceNamespace: '9zou30d3tn3nqhvlcugynbef43p0rsqnj7hmh0jm10jzgq5cqtdl1mzva6ji9gz1tj1wjk66zdwvkm71mpzo0vzpk90so5v26uxu89o9w1ri8l6gb3rmj1la3oxip3sdw2cyqafelaxt2qrp7ngqh0jq98jh975k',
                version: 'gsyl04iq4d4m6gu124e0',
                adapterType: 'vb0okk7spp7u9wp4ilq88dglx264goyi0ahmjx0pe7iihsnjwuibo1of5x34',
                direction: 'RECEIVER',
                transportProtocol: 'rbo3df9kzglxwmbdziowqhsmhi1df0njc70fvunvw57wh82zc1hoxzynjrbg',
                messageProtocol: 'hb0pwng3tki3ux2avpxnmmvh2falewbvfdd278z64nn1d0lduzzftnd4pspj',
                adapterEngineName: '23373ekud65rsrvfaribatydsjh0acu2opolbf5dpah1c7h7zyu482ekxyqxhrajw1ule3u5bfzmy4af53e652lct4ytpjzptd64ufsbx55eao0405tlrrynv0lv2k2r7yrvv4txfzlihgdqcymoir5daluqvdlb',
                url: '5r8olo2tnd12we3t5tnne4g5t996ydge8wr1feu3nt5owi4u51oyz59lulllmfkk58byurjcdicnryxpjphczwb5kqck6gpttef7u15vsw969gxqye0re7a5k9wcox7el2i09y3rt74y4i2ax7p8z8mukokajvobyqcfm31dtumfms2w5s28vsvguirrr4gd9496hbzen848jqnppj0zueyj5ki9j2an7mxf7vddpo55s1j93etr3krctrhwkuos47itf7frhwwyh2adoum3o6luttt3n4jwv6nsy59bwp196g6wpevhpg2wzvgtjvzj',
                username: '668u5cz5cy05w0l0mro2s6rfxw920h7alu32gmqhqyewonwiyeeotb3ohka4',
                remoteHost: '1qvsn2a4qeqvlb0ony71sxlnqw1rkcxpm2nmpgzya1bbnhyko5k56yl9j8zgx80uv1tlxpudik0bvi5zerrrzc08q89zv62deod5hnrhnp6pz212c6kf4sxdc4zupjka6uzh5v2uv6khfkh0a87lcjjsy95g55ao',
                remotePort: 2144975835,
                directory: 'lk03nw311jz2cinl4ht5iv8bsdvja485fi0zgv4wkdoi70qdeuqqggu0qe73oefg1o9ruh13cff9q3myvwkwe9rb9fkmvt9y5uydb857d32ujkq7w4x15ofbub4a6zmsex0i1u9owzqua5c3sjp7vb5d1zt6r5bqerl1gov8nn51v4l0bmknu0orwmonxj3nrq52vcasz6lg9de2nyrciz1sx1grwerx5xfbhvwnfzjd5zasur9pctwyio822gfknie5uajqvhs7w5j6dcz94zy9ho3lwtx9gcj6fm6vkl5aze51kbcfpeaxziw0z8jgk9uvree0clzv6scxu61djwq8qo6cas7ui54z1t9lr3txx71nlssbhctbrnr334s584rir9qzfpsj1afxh2fr9922gszorku55kntuehwe84h4qqs44d6n6dso5wz69iyv3rw3xbocbf723oethqftayrfctbls0u3ehgo5zqs2mbp3nne9sr6je9akean8ymhykjz2axeq7iywavou6bepy3zsa7qztedpdh2rvotlkm0sjshe4ipb8gh92inwrfhxjkpb6ma1pa3jqdkihbj0gttetu5u0ileh49keixai2gkgx7cw7zjd68zh2vczrnp3jqnjxopgin7xwnx526qkd35b494oc6uiod4phgj8ht1ygn6s1s1w9azwo8e4xhqtp5hg5jxy8jthmpu9pab1adsfbvf9fp810ttn2a30v2t5b7ngzewy51ed1w650pk87m3qkncvkeejfa515jjz9ze8grtnpm6i4qxoqlbtiatmtstp7ixaoibjsjq81iirwc2nnv8ukhxmmnbem2fq6f0en162r0oh4941qwen4azo2cvcxavqgni51ma4tqarzxewlr0tgwcdwp9dxrdaxevj7tv8mjq7xy28zk28rcaqgklhmaewez9542b3mbmhno4kwe7bju0htt084120sloycim2162pp7xqwnx7jnz1ub22wo94dv2dc3yem',
                fileSchema: 'awgb6i3hqcmcdmhcsao3untq7tkzyz7ry3s30vzop4gy84lcb5iamk5yk434m3nq18b9ypoewr9pnorp59sif0knw847lxyhgx98eez4dgnrrpwfjv5iptwsopja6p3k3sjjolney2dzf8za4glikcyz1unfbrykwjk4xsmmmxpc5f9pqa8fd6jl83kqedm0l6d1g7hc7zp7xie0o59sjuvkd4xntrselhfutc2zvshywgr5sbwic0hgoiq5bunbh8z1q7c9bwpfbnrfv3chaavwrd8cyjlp52wc8uukrpwvt11bh2a7xcjvj5exienhu29fhho7l1tyffnvmof7eg2s6dmhpczhgue2hn2ta1wmnkiz2n826ndg0zsgnuqkj7jjvn87gkvqy49n7cot90zfhqvrc59oldm7a9g8qxa8nwq9jjs36knqmtdo3z8dfdfulyyd2qqor0m3eqwdasy44rwduaqdfn0rm0g7rdrpaxzew5r60s0ob91nmwoms4fbb05z7fqu3gyvtkz0tsz65u3xhzhuhvaxy16osm3pmscmiwnrq2cv8mldjn8xb21028b4fxu3ggyfbtlvmtw0t43i2nkq0aknxjn2g1uurz6shjxy0nchsahofbptks1v6qwxpfl5b7vtuq99pkkges6ef70zow3nb0hcb7vf2ijlxem2xca2ybi7ulnwknrgbsvu949gs23wzhebmqd3c65s1w9iwmpqw42n0hlaqpjnw7i1f3q6v7v19rmze9pqbe9c4t38yv8y2l7avg1r0lupntusjmzdcw7tou6676i8j3mp80etvyy825yrsgguoj0yre7x791twmw0s99zl1xo4hus7lnme7anxi4c8xn0d5jqvocgl1vy89wbefa2dhxz0eanea8wz9htwdsdjufzs2v1inqnl7byn8arccjz6y5059kzsg7kmrxnrpxxn0qahig4io6x9yovn6wyqw74w1s537lstzc7tbzei09w6meoa452xt3onna7',
                proxyHost: 'fnagxncapq5l1vzb0gq2lwyr94v58gvo13dggthxfv9hy0fwyoklgvgavj4r',
                proxyPort: 7904894326,
                destination: '3ts82em417hakz5pjaq5ps3yzudaf0dsvnnz66xxdqogr62ybwftq9w6sa4p5oh5ufp0c6ydmkhw84ectxxhyp0rurhmvb8amqunskk6azskhleq1oiamuarg3z2etump3vef51edsy7lsvvid8gxhvgjlywdspb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 't02aszku4b25i48oap2xrr99qgvx5ucz4fo2ltz7i0zhiaz58ljdyx7rx2oy5ugitojz4miehbxghfkzl8ew0prrokfani2c8bz5u5gr7va0w73xu2o1yrqge65vzwslve3tsrrrteiemkyoeebsw4xaja3exbhr',
                responsibleUserAccountName: 'c8vxjedl8ozfh4v60qu6',
                lastChangeUserAccount: 'irdlam24d23ydhwlspxp',
                lastChangedAt: '2021-05-23 08:16:16',
                riInterfaceName: 'tkiard048m2xkkc1tdrk8v6aeczh4b457yv3maxzip5r1py6or7d3p8wvfgqv3u6wa7ec4in6fxrk0a3dmy7d9pbe51fan67t3yt7ucyniwzqh67xu6f71n21tycqr4d1e76r0qeizzwpn0vxorqptheswaewqhg',
                riInterfaceNamespace: 'p2gwwabvfct2ohkqu4vfxy4lmrngulyrluvs8absiu2sw9ir77f5updxvrkul5yg2xtex33njio83ninzs4jccj56pmbiar9n8tbig5g03gtl4aq91u3fge540rcw4sy76n6g847a0u2f6k9ju56p4tm4os3clv5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f66540cb-3800-40a8-b8ef-b05c4c24371c',
                tenantId: 'aa825641-e328-44be-8013-610fd7860d2e',
                tenantCode: 'ymypob49ow5eiiabo9jvjtfi0nh6xwplc8kfuhqao7weoilowg',
                systemId: '34180a9a-1b7b-421b-8f22-ad179508e1ed',
                systemName: '5fp9bifyb7vdsqe8if78',
                party: '3x3g2hy1n7sn3994k0r8xv0wj2t8ezp0vpy46a7y5r08ywiyh9xst5igrvnrfkeo39pk1joa3o0b3tfoye5tt2zrvagi3kbis2zhi4g1b3tzfvvh9vbu2pr6w3vbvt8gtobdwd4qs1r4o89aolfx6wnqvhc0g81j',
                component: 'nbv65mfe732ylwjk0mfgludqtnf3oi2872defqt2hf9ppj1bcicoyv64tti0kp4cjnsn8okcfeejwfqlbaewf6p7mw1ph9c2kz3031znxbfb9nxe0dv41kdbos95ca98nns1m7ytpog8bv6u5ko0s1pkz8hhzg2t',
                name: 'xarzbtap186cdpn1g0fkbneko2h7wqe1k80mz0tlev5wqhqt96kmm87qm19d52o25zyxgmibb48wao2jxu27d878n2r8deh4vxl0wa66zzzpjzmphp6yow7qv8mnff1g05iy7bykfz5n6m69k1kyv0v4h34cs0pv',
                flowHash: 'or93q1gsms13fv05mtxdpi3u7zog71s1npndedul',
                flowParty: 'fhynqbtd637pacrtkaogbits7ujba8lu7kei8sj1uxdewa50of80go5pd0i9ye6yd8w9h18rmlntl78o0fahnicejvtqq3o0ssew3y5cy72w9flcseoo28w5yrgo85a4sfspjp3tad0ghjrhhidrek3plhtkos7w',
                flowReceiverParty: 'ha254zu1ffegkh2be5efg2fr7l4ivndi5828oqnczx38xdgbqap453tx4hcwycmmt3qqrdgifnphp4syvza9sp0k6q3xnp5z2mzbldzird8up7cvyhr6rb8mh58qwmxwmi9zkgky45s25bs8oinh1cxvnmwlyiqa',
                flowComponent: 'fuxk6nmcxavc635xtly6xahfv4h1a8qfyelrr8wzt1kv4vfs85r54nykhgkwpu1p9skku4ehbxlsebekhvi1auudvc0p0vmir3bicipqm9hsjk0t8k1uwdflg5zzxtsg7wzv7e5fih20dgpzqe85f9e71tsqg8x7',
                flowReceiverComponent: 'xkjz5o3vpos1660mdt21qztumo70m3xg5nmwj7nyzt58zmplrwb8ogl234gi79kbkdre5tkiem3cnklln355cqp3perpq62uli0zjnbsey7jeydr73tgxgxxzuarhdxcucansta42vssq7y65qpmtxykmxxezpmp',
                flowInterfaceName: 'qnpa6r0gdz02me9aoquhhayh246ku0ecpb3jq4z6x8i1se5z50rrd8pt5jthto2v5yy5pwo1spo3vxz5694x976baplw8hrd5j1whnuh8v2fzwy3lt5vb4gp0esstnoyg37sqj9nafmv74ntvokkfi6fqm0mf4xd',
                flowInterfaceNamespace: 'catekhb8iyy3tp38kup05i0ktedy3h1y6663d4uluj3l14dtdq6bsldyu7fmn0cm8xbfygnszrth9j79ws4sliai9td5t38n5qqre7zs7solujcs65c8opu1d0ri6oibn1npuny7hmho4whl1aq26cblvvq9e5gi',
                version: 'i78tr708xx2r2trnzuqs',
                adapterType: 'j2fizl91tur9civ8wnxuw7hf5gvgriutfl3piwbac5zfhem11ugfsur5i8zk',
                direction: 'SENDER',
                transportProtocol: '0n6yhrn1c1iek38qefzr6dlqkkr1o68tl7o7nrnps958o4sa8gqffwp2238l',
                messageProtocol: 'f62c4nhsekbztwgeyqdnti4l07ai7qfjit6bssoku4l450vmfyf0xukr7t7x',
                adapterEngineName: '5l4jlzehkio3f8hkj73ljp8wbgrjz8b2c133husa2ycl7ixq52bd5s5fsys98jqy7xnwlc23i7t41t5od1p8zchgy765n89brngeaefyeqz2atdfci1uo2c7x63zwghqxhmrgxve2ne77khan2qxlvr0v6c6l5wp',
                url: 'g6hdjmb1662qm38hhtyq9dfy58eha2qiw3f1fx51hu0b3yv12f1pwtafjkps30s9qzl4nisedq4fv06znu1icuzej7zp0ierf3b3jm9mlyq8ty9izeljkftixw7ei5zyz1n7qrbc3944f5s1ohb1hze141bhxxsir8cu0u7apniyurfaie1hkvnrliqbw0ziqflbvn9c08d89wwnwod2d22d7zixr4rw7unrimqdjae4719wbj3me7oj0rvn8ds0jinwn6c0wevucvpmheaowk2teertfzi454a0pyb0mtinmqap7v07982lz1mvyled',
                username: 'yvgv54wrlfae4lvapjq8zwogd2awie4yx0hcdyyds3jttx0dmmjk95qbbqtf',
                remoteHost: 'afdpzf34o276dws8ggugqt0a0lqzi52pzq84x3oe10ectrrd6d2ufpnjp0iifp0hjfoq2f04jjhnhcpdmbkties6xyppf4w3yhoe2dgedxzuzh011ju54qtf8tdb97e8w8iib5v4v2k193rdhyhnxu1ywtkx78g4',
                remotePort: 4419723422,
                directory: 'lq05dqfdv9ll88b4v7qvkv1l75br2fluuekc4zf8vjjhs8ry5a2nyl401gze335kr19jkw7cdb69u9vxizs256lsed1yn375r76r0ajg1qvh3fkd0b3y259hkiv7gj30xg4eecierve5h5rgujavjdshqtthkpaz0co7byzvy2sskrxecpjlrsfy4zweasvnrsh8z4uhztkropdkjkk0ey99rtmvt9mmfincnx8anfzyizjvxzdvnmqc7xu059qbngtahtv8sy6esmw272ps3yclx8vrc81kcdmsoi0sb60qz0u7xdd8nte4raksnc4kyvtj3xu2oqjdpm3y7m91o6ubz8se2ha9nue0esjlxlxosubtn12bb4lktijrxpnf4x3uwsw76ekvtdv1m9gz5te60qylhxpt3iaj095umle4zcup04mybgyi16hp4jowx6ip2kajhp7wynvnx5cncwbrq30fevdrzwkyplf0rka454l670127yqvpylbuugpjq0138ct3jiu55ka1yfewi7pq9k67npxw6g0u0a6saw3n9jlam3a2pv31zrjx4ca8ojx18otkghasideq6q26zbpzbum0qhc1263a7z4ikln61880si89fd8lonq8butnder7aeo0a77814vdqh9cg5esrpt6kyce6fqw8ayfcs7vyj8usljv5wuak0kxupi15lala4o83iofg4xrfn77ew8jop9z4h7lddt8esj8rs3f3nlfreen5repdsm4ehqwwsptpzerllqinmu0kgfhy2tkba5j7my1py04wxiwnbquisvgbzv2qewrvldtcgcb8a367w1wzw72cc08tfxuoaolx5tnbyw5yeb2fc2dthxrwvqr83lk2ny47g85ct616cat80b4g9xu5g52arlfyn9hn4wptfdj2ql6z9igqzzyp4n6u6yvcciy854r8da8aq7n6cfg9j6gonw0hw2jtplcspzyc4cr1mt8nucny1tvyrp5pbau4t3mosh3g3g',
                fileSchema: 'u19mtfehxw5uk442ae5fgdkvnmoas427tvyh12g4nznv5hrk73d51oced9h1uziigse1ht9mk5p5dwyldyy6pbvnm14dpql6eegck18p4gq78vu3511yicwemotnce3s7bsf174ur537mlxo1y3rcb19j6gl6oyhqprm23e4b6d8ucdhpo58s5o422fscfhjap03ddnw1s8y4psbyy4p0ie46hif5x32scej9wqcrsyf178v7237tz861lo4k3g4nbmedgm3vchfk8gz8ojzx4jel6qd42x07tbi786m05447l3o7olhlxs1u81k67xz47q5mnxyvjimhr28ws4nkj0f8t1om09q4krkh77yq5bfs32o09r0jswok482lm3oqpbrb64dly8xtxqoidljsswqh67imw4pzbg9htwycqhc24qynxpbwjnqdn3yut5iypeyv5ziykcmalg4nd3ot782gyeo29769remyov1cz6sfhr6tdee2s0m0i7zp4tq63ykwm95hswm5cwe1gpus1gqyzj5z5nuvyaq3dz3auico15hkm9it2v9jw0xte9lncrzi2k7qnvy7aook9z7h4bu6qw6867wamh557j51v6oji0goxj0ds9za03wzaajrw6skew3417ugkvjgd95zolggzkxjnsb0we8xevyi8h49f09jr1p028i077m6u42qzempmxgzkah4zrkjodnhhf0t09dug55tu15l0a8wxu0lkn1vn661rs9djveepw4t3cscpm9wx3pecg2xwjcr02a37bzv4vhn4ljmzfx5tbm3lgly3c0i7pg5zsojxe9mu5rnnvacvrbbkho289rf9xzjud80zdl61v50ts31sgs09e65qy6mo4n4hnj7fo65dqtwce9lo6vcj0s1rb19nf70in3ibykxh4fmuqy0fr0jgtadklvz9cmbtqsgyhkrivojc5w4269f22yf8spr8y6bu35fce4zd14jommoedjqmbjgfum3nlukm9h1s2w',
                proxyHost: 'bvivlkqme6ghzoqiggr67z3bidtg6l6wss1s2vy8lftqmqoiuonpqunb5srq',
                proxyPort: 8576468590,
                destination: '5yp4edbrjuudrqjv81bg1666lwdfd8mjexmzxaxuultaicb5tjsx8lnenhxl5yj7815kkicd4zlkc7osn74kjeodyvdj3rodhd7rianwh5imomz7bzovldu9wrl1z5jn594zttyi92wsu2sl6ly89n4r412e7j79',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3tt60edo17b8za9rl4ajvrw9qfcwvei9d0r1bznhc9gtiez3ztpd3lt6cy93g7pl0uayce2g52cvze43yx0iymi00r43vk9ijkcyfbwgjho6ovty8gm9vmex6kfbjmhuqpviyfgnytfd0jlu8s8prjuepk6cli8o',
                responsibleUserAccountName: 's394ysoojek2pt0ohlc7',
                lastChangeUserAccount: '5jr35457f1op52crzsau',
                lastChangedAt: '2021-05-23 09:27:47',
                riInterfaceName: 'vgwsmlv059naaa438gj6i1db5peiv397nbcr98frq6bvjp4km20veldou14bkjmoanivu97nt59wvcgvatncrlb3pyau17x9hdkqw1kck21nfygnk1220yo7pvnpl968e53w1qlk0ofkj6wzhil2qaz6stytmon2',
                riInterfaceNamespace: 'dm8e3f2a5iu8x26sxa999x8y8194p7o7ad5gkkyqc668pysl3ar4fg93e4zur7m4kr9vttkyegupuca2o75abu53wf7byk1ag8sb0fpj7vnsztv8yr2uzo4om0lxjm86s1hp40yhtaorlzk5he7bh9vdjkd23v69',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0981fba3-2701-4f55-8d52-7f4051d1a156',
                hash: '014jzgpg20lvccrvapp7vryhwve35xsvr6pu2n9p',
                tenantCode: 'qmlgaivkcmvx1e2wbej0t0eunl0mh15rjom4uixshgh3lgtoe5',
                systemId: '86fea8cb-6e44-4c2b-b482-396ff1c4bbae',
                systemName: 'jgvs7gyvtaei6u5o84ux',
                party: 'ylgpa4a5v4dtppsz5ffupazkv6i69i2u195kmi0e03yl2pddwjr2xmdgwlu6ifwwwwgiylov0ve4qrxuq4u824283erceun601xhk7goyayq3rxvqtpcj3bnowol1tngemnrjsiildprbsmqlz9v2r7pd2fakdic',
                component: 'nuc42cawv8uut4xn36gro70qft4uoahoubldl23i7asz8snaem08ccs0my9b0hxy707gr00ngz0ujtoo2m1nxzd25s4cs70f6e1q3f209n8rnzmp4nh0162l9og0vi6gejynjs6d93zmragzwkp8ubacwz45f2el',
                name: '5lhs21ux4heolqvqrv6479ev2yox8oq5pesbovjqfl71sd3m58497o6a97j5vi27lafp0946m2h3ilha0w9c4a0zvtrdz024bcn3u84dk6oyp3su3sritmodagr4qdqiqxax9x42hgzhhlvz4jw7bjk4tohimizy',
                flowHash: 'wiifsho0irsbrtbdn1syyyum3op69wmchyhmc9vi',
                flowParty: 'g2b4qwp3ud2xp2eiami851e59jmzfrmlgkb72xif7jgxti280l38zxejoalne3p09ytvp4huvvxzyxd4bddw0h5uh50p7kqgb4z8fd92upjamc5b5zf9l26nhry794u11nszx9tk470498cwwlsak875exwtoctw',
                flowReceiverParty: 's25csyx4q5q3fr4u7p9hlmfu0n17fwiw2y1clvomaos96cgkw6cwm7zxgwal93kuc8e8mxjaci2cyhls4we32nclzk7cwybhkw1xnw2hwl3l95tcg4wnx54hx15seb4aa0bs1ty9ena84w0f140tafy2by40aa99',
                flowComponent: '0xsynvcrmbo8rfz7y8cxdm4d2j9gbd4424xu3so7tl0wdydezkf6ospc63oquho10ndtdjltfql3gyrhhhaek5nrsaxhr4giyybi3cnj53jorx6gmfhxjqsjnzn23sus4jgcxcdmydyosyysxxl1bx9n809r3zeg',
                flowReceiverComponent: 'ptw2twgrt911u2ukdny1blmci3sk01kr4py0z1rj0167616j6541oq2kuenkbfjnw2awq9bpjqt3phfi2himq15lptnkssxvejdhjdht6akedcmyi4sfeq7ug1jrnua8qw2lmond8he1jdovl0v4qo3s9b15uerm',
                flowInterfaceName: 'lcdhvf73h58fntv05z1yi9rcxh17j61xj7vt2yfi0iy6ovi4157tb9n6ofgcbu7v5ml11lky6lc2pz230eg4v9vqau5peobzwphnp97l6gqheo7y123tpfgmluehoez19u0q48zcj9jxvv9jup25dub5ifbvlidu',
                flowInterfaceNamespace: 'nh5r77z77fnex80z42mlr7t7b7jt9s6e6fal17kykcv02ui93zgs0qj4b0hpdtxwi49ltg8b46ksll53e0oxv66cdihkcneodrg5ttphe4nkbjd52vbu76ppqseotmlfnvydn8g28ar86q4z0zt3e3bxk48rkqym',
                version: 'jqc7vpno3hlwrr50bah0',
                adapterType: 'r0ad7qlzrl3a9v9vi7vnpjw2u1pjj6p1guh0o5dejc4zphstih63uanu3p0o',
                direction: 'SENDER',
                transportProtocol: 'qtdqe0b05w44rxe26laazz8zsyid54rtf1ui75fcrv6m316uli3dygi0ca4v',
                messageProtocol: 'niajiypjlil0tx4cd7ro68uevkld3uqyai01xlszr4fj4lg0d06rkuhyfehd',
                adapterEngineName: '8ppxgtb19t0frfrw0at0h1m1j8n2ty3fr4wvk95lznve4n5qbtiwkz8lxx0a1a0wnke07nt9x7nl3wbzq41nit6sx15njs4bs0hmw69n7s6ivsq5qm1okwvi3brr014o1lpqk7yo6whqgz5dzy8qpvr2islemyqr',
                url: 'leu21yuffw7z3njgypt2dlaj54s8upr6dbqtzkjasjxi8mebhkxxgk7htufl4qkqkby1yxx6ex020ich2yhy4md0kkut0nx1bf6xunx2t286rs3fffvotxmx8qzdceuocp4z8mrohwedslypk24p7t9hknlgc0gj0g3stvawta4kb3nhgohy2fp1xrfasuqzbqqxq3ydlw0pn4j1nb8frnsiyekmab24e3ur59oaeffqdka96qda6wz3q7yijd1ve64rmwa406wlzuj37ug519uh6wy8tn7btvkq62tianhby5y3algydgkdpagll80o',
                username: 'kebisif78yu6mvz4fl4zcxst7ji62i9egkhdrrr49h0fanj8vq3njre6bsl4',
                remoteHost: 'lu66zw39tihs7o9mmv2p9imjkrbgrqe1mhaco4914tqn40fp6fcae4v8j9mlfak82ocxe6d861g8hzbkvtr2rqx10tzdx32a7u2p8veqzi9cc84e4udld7di1aqerfe35yc5mip8z99o7mgooz22nv1iqn3x52r9',
                remotePort: 9253955975,
                directory: 'uqljby1bj382xpz4x3ginhbyos33agndkczaaqolrh75elkmbqp6r7ys21plind8ayp1vhihf2mfrgxknx6fkvszzzcoizl8eajd02gk5bgd9sn2a0yhj8of5kdkw4dk565pdzhow14q9tt6sccjl3q5mb1uh38iql3vxu76q66350avgwx2h6j1i0e7t79q9axtw42ullxfjx2txxsiap79t3jz4tnmtde9b6qydl69jp50eoguurzrx3zneb3f4pm84w4x4aypbicd9emgingpoh9lzc7w8r0gpe7f11fb3rdsaa4muq6vdxgfh2b3wc3zrhdvgni2xungruwuscfj8v3dasybvi02zcz3yu69jbrvunc9qhvltfshrma6ywqm9br6zljn7mu4qf4fgqqdhkdop40g8bog3jgafowtcnj49s2z813h7wjpgwrmbd0j0okrta54tz7ehob3dyde5al4p3tiy0g1juzrj97hn8daknmi5ox011k6a1zcdijh43h5eitob2vwpyyyrf32nzumygw36jy3blx9g8axj7dt41zx2imw04n7x096qq0ojv9opt2e7cmxzeylf8bryxkttq9jo4apmc5443l069m2jt43bft4x7mdmdzngll5c0eehtebxp61lrbia5vx4a3sqjiqdql543t3jiq501qb6zsxvyqhk5k9667ndpbi7i0s00bs0d0m9alnkswc8i9kqp25ejbi3df2n4hegfxpcearykmh2gigid673jmfcl1lh6dcvv2kkcwlp5wcd28kzhatq99u2k4b8ln2peznnkt5hfjrvunmqg5z1ogjripucpzgyzg6774g5v025aibqfhdvvvkkcfzrg3s6tc4qimiq8bmh9za13egp82qytieim91jdoff07kg7coqk606m2textyxbzralchciwufamppbp9rlfqg8yy7ns8w960b88jz2xytadsi7d8oyvfvqnek0uvyzrst9mr8ghbp96nk2h0p3orqi4u',
                fileSchema: '5w2gksc883pupnt5blcwmgnj2xnwmf7dmeqjmhsy9j2wgf641yqzi8z86rn18c3d3f0yrxm8jcm79ipfvlyt44vxjx79uyferiuu0e0i08oc02fsk6svcs5wldqhm3japoplfl0zyf0jlhhyrshedz8jbjsx53wojuj7qrrrgoiszl5fiwhnw4c37i3av0s1wwusdm8el8phq8x7ux5s8851vc5le8j2dus4si40y8uyn6iui7icpxqd7i67cb28k243l545vwysv2pevn6md7gut4fwvy0e987kyhfw4zhvqy5gfiqegrhx751y0wy25pu9ltvaaquw1m3430rum3r1q7tr4bh6e16fjmgttqpizomqltitkqkjcdwy3810ewd7bmlr1ny7frq3hgfzz87ujq2g84d5jfhdo24t7nb7wotnmk1lvv2owtfra5lq0ty1xgcu8mi5q1b17isxwod3hvt3920r3z0qkzn0scew9kjoj06bu3n0pnk1lyj6udxz12bqptq3nhgbvr1ai7vbab417wiaeal7s28qi7h91gvitg83m7doxser3zevusixi8ciabtcj8ci7z2ozniaujm2dgkacrefkdwlxdb4sqdw0u6kygg7nm59y90nqqyyo4bk9c8jfqbqgqo86jkjph97sri6ds7g41bjo91ej4kaan3vcjy5hggc7mmdwbgg44fpe4fvjoz2my07ghbzw0hkw0fycky8khm962odwqd57phudfkchdrcv5t8n44a0zbzstckkkdj29jy14cx5u5ijk19cjjpd8k6e4uv9wr8gj0nvuor241x4stqcqxkkvc1argbacg37wb75uhg4xigmpnmihh262b7w79543ve6pusdbtyhvy8pmnn7rxdocxef3xzzrypvfs6z1nks4ngmv7i7oyz4kfnlx85rcxhr32frs2z5k7wnm89oir3iyljuzttfp9nbe9b70t0bmlgxs2bwxogukvgdf39qeynt757sd2hlg6xudos',
                proxyHost: 'bczqvsmflh3onk76zt0uq3cqjz8f39viffvxnn0xjw0wap0tdqckpk5aw6a6',
                proxyPort: 2313508858,
                destination: '0y2i13eugybz65ppupsldbn0lnh4yajkadphc7y0qg95i1rhj9vy1o86vt55gihvmi0yeopm8h4r7orfitkr3bfgjz44be8n0w6tri99kvxfd3o0bn6w1kj4m21lgm295zlqq77zjq11hqyewkzv3a44dfjauf2x',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yy6skqril9bem5mt74lfczb3ps8v73g1co7eww971uk7t0lwi9orgny6cadyto8mqkk4z4wytud50w6npkrci1nsm6i7r0ewa45gp9cd7m009ygtfg00705jxebswnwasluw70fad46q396cp93p949zfl0prx03',
                responsibleUserAccountName: 'tim7zpewf90zuegcs3gt',
                lastChangeUserAccount: 's11p2inugspaim2uh9f7',
                lastChangedAt: '2021-05-23 20:43:57',
                riInterfaceName: 'i6b526zmk6mklc5fuxtu618r6ccrejw02tjujbwolankvomqn47s89e7eqxxy1jaghr4ux2n7kc0l9ce3460jmxajst9ro2reqeadx7q78q3js78ncyv2b61b7lh73d22bc6di7htwsiljfx5eia2io85a3wjiy2',
                riInterfaceNamespace: '7x8t5des9de9yho7d8ifmghmvpka2ax1bzr87eg349e3xze2xuvzto21ymmsdl6edf7qu8ix15cx5yymgh6lbmq40ymdm4z5fhd4f4xv4tmzlpt9ln9sgprcp6n7jp178k57gbtp6klsgi6e6tahs5ymra574e1y',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '45503934-e3fb-4a22-ad8c-845aa855b464',
                hash: '0b2oq5r75vno1ysa2rddzph3il3w6jgqn2kqtzqe',
                tenantId: '465b2957-9d8b-43fc-9ddf-4c02989ea05f',
                systemId: '086649b1-1d0a-49c1-8942-77b046fa1ea0',
                systemName: 'lujsq14v3871yas1jvz4',
                party: 'dnjkyhjtzxe3lfvlf2mggr30bnd4sa7y8vux30blf7xz1aifc4yxu848gq92go2n8otlqcbxzcm221w39t3jhwzb3noqpbovv2mco7k0ng7tzuzmqz8sexvkod4fgtpiu1k634tu6i1qx4x9sozdmntu6zl6v557',
                component: '45c59i9ast486ke2icvi134x8kh65ggrhqfdsl4qme23cz3s2zbq691jyrzalq4b2w70dqmmsoc14ynta3mrney6ylhtqkwsc9tgmxsz2mjw2fvgke8f66so0spo22a0gc4exx15jsjinlvodva16yfawxff0dqd',
                name: 'u77t4he62wc3ej9wub564lqe2tuqvdw33709xcaaimsluxfc9ewwutze1mzq4cayphzpa5xwl8ajj6856k7zi3vh1y5n0jwtintx23hgvh5zkfzrjriha8feq9xnvd6chu9jhjqlnkvdb9bj4sujpgoct1sqdg4w',
                flowHash: 'riqnm649fns5c8qwl1vjn03tczmsjhfdt4rcwleo',
                flowParty: 'u0vv1z1sa6fo903f7px3nykhg8yaved2pf7njsmzezlsn6xnuwqc4ajo4j8236ub3azyga03hdwdrg0e0e3qniqcrwfi561bp6a8osi41h3xh457g9iady3mvmp1cw8jio46qxeokpobo3upv559f7aa67c1qwnr',
                flowReceiverParty: 'ehx5q0o7xms11aobb28prcqc9ns2fcl0p23mqbyarbnpp1bl5lzg3rnt8imn1oallb8fqcbkjcmpad52idmwd8qc9srd0g9lqjlul8sadvhghsmfus5rvxjqmjoi54kpbgepz3omdhh3fr2kr1makmmyd0meckeg',
                flowComponent: '2apsjnbx5u20xppdp716n5bj13ei3uzwtz1jlsjg3y403i52wni74zdkqh1d5nvdpvs6fhfuozvtqlmhku5mepjz2f3ysvvkk4q473y05hx5d5ntrzjdry39obdzjlkmncoijtkbrd170y10v0rbbd6gez3x2p32',
                flowReceiverComponent: '6kq7m9hd82qzfc65y8u99m1l0ktbp1e1wgb2xjwjqsad8vzl7r9b0web18cex9staques8im25yzcd530nkaxoyhq3tsyu5q57et7hjlxptnyzjv9lqnzevgqf4keznpqinyievfacqug451w57hl65zjpfapevk',
                flowInterfaceName: '9k4ohy90emetuaj2g3ffsxbv8cledtjxbgsswyp90c75yti3442sx9kn3078sye5ttxxj4wjav5ywcsy2goho90tajfxws613wdap3m5a65oike29zvtkc32n06bhduelcl462mwbshkc6vmzfko92cdzume6uiq',
                flowInterfaceNamespace: '252xt3p4vo3uckqk4imciawo0f1n5jo2cqizfgjr5gjzk9xq9gjl4uv3oh832wykooi01l943pkhbdm2iaf4z0tap2ra5fbu0mgqn7x1a9w0zxwqkru2xkbrucsdzjtjmq8hgvoao6ncr9al9abjaswdic8fzggo',
                version: 'hh3xtkahidnecxjb3a9q',
                adapterType: 'b52iitadiptqc2t4o41kego6jl483ehxhcag1as87nv10rn7r9tm2iwc8st3',
                direction: 'SENDER',
                transportProtocol: 'a64z2ko50usdclthxb3geg45iu3cf5sqneikn75rfm7sofjjpruxw07uebrh',
                messageProtocol: 'w7huv462xx9i7jf2dwy6kmq41vv7ruetppqv3n906vk1w31we1uyapwwso1y',
                adapterEngineName: '0trh1gmhb24f7arddjatccuqq021lem1851ux566mwq9pffpyqb1gi3cbnd01yu3s767mcx1hz4ubo7gzk5fhehunwpvfpf1cv6kobfkopxetbnewclsfhjsezs7utmz1hgytjxez5s4evgbrr7m4a8vi4yjcirz',
                url: 'i3xc049uqfzun2jt9aswfaf3o6vzi1e55g3m4vx5b13ft67u74fryxcgv2johllj8kyqq4q24fuu70orlbkg0uiu3ta0m1i0voslfmfbtb57ezf79vcpxr3frn1z60yjz1zd7vbgel7ugmkey2wt5squgsn2q3yu42udsfti5lw9h9xdy4sjw1vbjkgtst4309qq0wvmz6fdhi8nkpuwh13my9agvdd22xyw51mohtkn1wz6ro7jqysy4cx4t3dclixc7r4jpluas5lp5ubkq7ycqv420djjq8el4p8zqib3ilpf2eig8nmqf1veg0fr',
                username: '6fmpevu6mzg45ikw9xe33x6fwls55qfd0de215ov5laquf50l1y2bvldhvzj',
                remoteHost: 'gj4tmlxzmuatsznjy5alod00swyok6wnszojyt7q13u7ywcj0i4m94crlh3bb0oltuo5gxsu8920nvrtmt6hfr67t1l0k4xxbrf6emzfxqkiuolusn371dqhpm3v4ivnjw7vuubzvrdfu908g6hc21rhkqfeidcy',
                remotePort: 4541815980,
                directory: 't2fhcrm1lz5wz8seelxghzcu9mhno5yitlw1s35fw77inzam18gmwqr7dbgtzl1jzlcey6oeoynfd8rw1tnkllzb08f55t184nftpfuyyw5k1scb2yitjxazbf1ocuil4i11akbydwsq5pj4cpfnlwlwg6x3mxhysx65s7xarewjcabkwbxcb3cbdaw27qbg2lneq0f3ps2vadcamodgzdu87ted326737h9bjqgilxohee4r8lm0q19be2841rrecx6rv9vor2kfeq7rn5rb1tlyqo30q0bzzxs4jp65lvxmth06e7augnyhltu491lo5r8otkut8hbb9ul3rml8ewyeljjwubx0wtlwq3s1ze1trmetsys7gz01x0hw8i6brs250wg0fe8hornpbg91it3gl62o27wkgwszt2bjgaafod582nof5chdvo0w3658zrd92mkybismnyvtg61zt2hznca5wc9isqb6db50r70badc1r7q3fxzc3n7csj06yng09zqu4xkpemmfcw37tk195er2aytvve4dzc0l3l9kvcwy698apvjt4axwp08y97v8t2h3tywncxqx9jt1q824cq7o6yrgugscjuwte5d1aj8tpti1zkxnw4pn3vtm05xucsk3h5rha397w69v5ke7m116uhot6ydoc7sjhk0he0tmcnoobzfal66rhn6w4aqigzm83ztxt2f9b7cqhslmr00a95rv8kazgecir5tjarx6puzhkcmh60m1jzbrk88epe4z856aa1k6v18vxv8niv92c7z8x5ov32njr7pzp91gaqmh1f5bvm07ebokq93n8aa73tlpnxfyilg111qsqq6chv0fb4zuzx6uytd5phfah41i7zvzq9mi7jc58201o14kq5u00xje7ebrsy3adglp7umxwuaf30wncbc8hui7zupa2nfu03z32sbmlbwkycbhs9eo40p7lavwyjtfffts4rbqtflxizegacv9yr9hz6ndva1j1stdif6',
                fileSchema: '2i632dpl9izs4kg96l7vw398hq6t23tiaa82oqmiweriq1jx21vhlgxdq9hz1139y09eglimftdh5uft2rpqmhypubly109vfh06e3fji7x2cmynpaupimizu8lpudg1qmyqi02urcj2pel00kcomu57r3jwim5i4luvua06yei8e21khiupaptgpgqlqjgw9oh2honzijbalgcs80t3o576i897j0dvkuzq8xwlh9orkqxndogtv86cz7w00hlc8umjug15luit2s98peq5yd0s5i3onuit94dcgoc8m1je76jjn5576jvtxhjhy18jx9odb0fov826vtctkm6chca1wafxsfb53zxqs5485catt6ajn0qku4cenvomhv9u68getg3n47xbzpaafxdwq04g4jacsby3wo068mazx2ag3u7ntqagouc0oswyi5kyf6g7pf17sag0w71mdj8x6fde2l3h6zpaiv1b6xgfpm7ck4gymhvqzm8x1gpy594f08nzv98di5sxgvtxc4zql75vo96exxu3t7it2e4wweqmxncs5srye4jfnabmnt6b3i1ih57o2iv43kvg4jsmlon3qw8wi9jycc5tji4t5235d1awg9uztg111szo2txoyd9pnc2h5dral9fshpduysmlx8g68yuw93u0d7mczaas4tfbz7ifmm0vcaraqk3goimb0sylv0y1fr35h59v9iulqwgruxgflwt0uhgjdavz86920z2947socqbdqk7vw2raopd52i0kuex537ydzr7klt4ds47iu9m5tut393kmincl7mfg12pxbpd18nswqzey8rob0svvng9j49ipmgiaueajdd88upmu6bh5it9frz2wjj21sajqozwura4jzrp25tk5xtc34s4innx642pcgl3qepdggm70csdplxvmevxz1r2zyy1dnq0ypf7gh2pxj217vtarpostplux7wy9v7x9u5rjmq8ub3q93ngskf5umoxccm9t4tn7v0ut',
                proxyHost: 'r2nd7xyu6p4377ur7ceu20jenhvmpwhg6dz0wcy35uedhius5pt2zi85cs8z',
                proxyPort: 1858381556,
                destination: '3bay2lygmultzxa2iqceu0u7ty5rptug41bj2kkh5jjq791j859x60o37czev32hizn8szv0xangim75m12pppa2cp7x5kk9ananv17kr3xyf4nev0kegwcm1fvb1bixx656m147xnzzfvj8u6u05wem5wrnnfp8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'goqg9anyp5zpnr5xc02z8nm5kqhmntdgptmwghlnprdsixma07989zzgzym2cfju24pfg5uomqylaoyc5v7l5td30hxfke5f9iz4k8ljrvmjznwx8voj0do8brlhzebfvoei9waxlg5ij7ap6nogoqmhl3i2lkhb',
                responsibleUserAccountName: '0rg7ex1gic1o219h3w66',
                lastChangeUserAccount: 'wbwbhmozwvh39750wj7b',
                lastChangedAt: '2021-05-23 16:30:57',
                riInterfaceName: 'ci245puzktmsam6p7ja14tqtrvblxhank4cvert9jtzflpzemifb0tcn1j36t5y3bimcp1mih4ow6bc9i1y193ajvx5x0nncbot8d00dwqaqnsaopdr1cp7c3qpk0cz748fyo0zfo2h59bk42dco4wllne4y2dk6',
                riInterfaceNamespace: 'ppf5szcfmnb6plx3vqoc37pmrqpovc4r0lsvgagn7ltyr2dje5yjsumkvogxsbsfss5qq4dni4m77h9q0vfhuf1ne9jekkb61z0zc8w3qoq6x03gjob6wqg7wbk862r4uf8vx3gqyhyl5ga11ev29ijfzog60w94',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3c6ead37-dc2f-4368-b2bd-53c20b72584c',
                hash: 'ey1gehkxvqbhxacw5nwhrsk2rkzkjxj8km4ql7jd',
                tenantId: '100b425a-110d-4dc7-beda-fc88a6e8b8a6',
                tenantCode: 'sgazqywa30dptsto6u3sp9mgcgxrky7abi69n7hpy4n4gacc2q',
                systemName: 'lzl7wbdwm1z5di7zr9nh',
                party: '5nxu96el1fsv57eu6pa622mmczx0684riyxn3aqe37nir1our1u3p1ulrq5ll4092fxe2r596hwtnw4uios0bwr8kriwwlaxdei1iq8yqdrkzma9regou0v3tltml8p5ql8sd62rqscztwuygioxswhw6odaa369',
                component: 'upcbbaw6hpbsd0pequk2v7hi1anio1x8m5slz5g81j7npozn5qcd6jssq3phfzsy6llxtnnxvrmug086ivjrat5pq8chkx70lug3k0i2ap2r3ejrm6kgrgepvbam3sbuu1g2r03g3m8gkcf2vhkib8p56vbjxwf0',
                name: 'qx6vd6c036o7136wa3pkzpd75g7ncg4h0vifcoghxmhz1xngwbg28t1qzoxp5zkmce41uzzhpwsatwk0xgp4ynp6rh5i1fij3aqq4lne4zfrfbvmrxqm2gutktria5m8xw5gvxz9bwly882gd8ofwwie6me0srak',
                flowHash: 'tjwcfypnpf148860popsdfun5p0fzzekndwl4zzf',
                flowParty: '0wxlgfqzgfmgzztkk6g4oo3bbmtnfqpnpfmfq9i927w8te2u79zjgu7dlc0oly3isqpzdk2x97tjwin9c45psly83tqgua83grsc1bqe7ip8i1o1ib22gkajg9opkcbqv9tpzjko8eoi79rd9sbvzgc9y4kdmxqx',
                flowReceiverParty: 'ebmj1b5fkc0j3cw95t0j8gtor5pr8fuqz9xbfcxuffhgigf3cu2fhb2ob7rc6s9vd2klp3rstuvodqxpqzt8hzqrra9ulnfmfejyzlzeull1wbdqs52af5suly3n2j12jbrpxj43vb0otvotzajibu0g9ulvdk97',
                flowComponent: '1nsnsp22ghzcaj3ivvib95ae81mn1kdtpm4434f1jhszvecrcg4zbaf1qxhj65bxbawcwdpznl5duvg5qi4ffbcwn9yqrnkqxewbhuvxzekj91783poyg6u9pbvfhwvzbr6wbdf4q2agk4s1pargxh6sj19a07y0',
                flowReceiverComponent: 'a4048fareqen3c1nukp4b6fv8wis2cynr1uv1qn2blgx0xsk49uzqfqqnevz80wg1h9g51wha2d0sehev7ahofup9nmlye9ru6j1yp5w27mcdzaea6sbk710dx9bmp475bpva54btsqbe7zd0m0as65gvfcdc70s',
                flowInterfaceName: 'ivkham75y3k887d4uhh9oeolvd01qc96kfpxk4qzlth36ga44raraoyixu7e119uw242uzihmcao0yne6ytyn97k9vaswiuqjahmxdqfpu5m111gc0ax3ksqugenzyei5dnpppl9ckfrhofsf6qkrbatwd4qyxrn',
                flowInterfaceNamespace: '6q92h3evx7glrve05nx1skmb83vgo9k30qpwcsjw2xiswl0l51es7fp9uqht4qxpa83v8gggdpd9uaocl6lx71iua08wvzlz2qnr8sgt897r3krigryt1n1fbwoke1sxwyougi6nmbo66shf8qrw9nakiyf41kr4',
                version: '0ldo5lmas3kg3fuv4bxu',
                adapterType: 'ukgtcc8czirxekzfk8iej7mwomyw5igxpi9nq5by1qtfqlnes1y70pal6c4r',
                direction: 'SENDER',
                transportProtocol: 'iq3pucea9c9a5bm2vi3eq16w5evc4huq74olg7xdazt6j0qh8400yr5iwlwq',
                messageProtocol: 'do2py1rrho2frkhebirapdz0uoih74la0b1a1ru7ww3fsbgnvh8b6ajh2xcl',
                adapterEngineName: 'ijd18n9q15jfma68t25dk1zh9bexb5kf1yk946ohuzaaz2qxdvr64w9oh508vppj9z0ueb6s3tp9sfugppbwtznpcq9eig4zf60crgotf73ekgyfmexyl3z7vnypo1wj57ftikey9pqpkelvddsr6qqzb24rvcbq',
                url: '2qnqmfp7vmzdwmmszby2k9xyl1zwio6kpbcfx1ddrk8nrxwhw5cykink4k2lwaq4dlelhe8hzuxn1vzd2ycxj2lw3pv69xjrb2sw3zcin0pczidb7ym92j8yimhlc8s5fnwp024ik46chnwzlqj4x20n2436ecel1x6yygtslb5ra62zqxisth3cpiacinpyrf68l8d4ma39h8008rm90dc23jxp48dduibbffswwpdq202fc6hx8lf2qeo4a68f4q6flx9yi6mp8k3tn8r8wpx0123k0zocrh63utaq0y0f09ciyy0tc8pizwv5hxa7',
                username: 'trbw305nfbhqnmrftqx62hgb050nmlcd1ny2hnz1k4pfqp56vjp7d6h2e6yu',
                remoteHost: '6rmhwe6nindky8x3ivldyvgwrntq1c6pwdo6cxcfmjwzdyomfie21odjcs4mi4twudvstqb1vp3hfzbvy7qbf6q8thrltfv9787bs7pv3fum2eimngvhwi9ge3onpk3w25wwpzp2t49jvjmspbzc9dm5mm8k4dgb',
                remotePort: 7212286608,
                directory: 'k22dkcqdqj6homb7j697nroizpqrwkfbu21xeh7d5mpskhjyi2wkqfdyyxepbtc0s7f1ij8h98o4c79n694dlbjjbt7qvd8v2mgb12qby09iilso8h6bhunsf0harn28vuhsnxghsst1q6u9ro8wwpgwjbqnq7xsd5o522hakcsfw9jwfth2gl6s5c5ju9gg5j5cy2boe7ic2bgm1aknm6y4g7v67nnxhpyb74z07tlh82w5jgsirqglcfhdziq9l47maxhwycpywgyd7r9g1k9iwwa9a52ckr292wpjwx26u5gapa7etzpperavkvi3g02dgsps6asghvzk023r49399z08k59imtljitryp4jxt65umi9qzw0rz86876w536zz8cqp5s9nnyizpajghpjcwh67j56pdtblpx2pc7jfyj6mnk27amripa1wii9vdtbpt9bot4pe86l884iuv4117552xmrgfy4v6lht7izeogth7l7hcha267l2quvgjv86dpkja493t8bcrn6r4oweavwh9t9qb4zp9n6l3o9mds8yynlxdt8d8bwl5p2dgeuht7mtbvc4ohn6k2qd6hs2pfk75ii0l1xl005gthaeynxtuqvc08onpf78e8kkzpvu3fv161elvy5ypeu09y94qd520ipc8upugmjbu398ic4m3q72qit7jvcd83hlb6puzgfv9zcbnas68ockejxl3fr24f3hi4w7kvvq7ifswnttnovuatyju09tnfzoy8obt8kjerenzujeodqtba6haci9312rmjjdpvin3f7x5fxichwb9l9b9ld6qdrtwrppk7lpe7br6rao2lzjfwo0gb73h4dnyppldn8jbydz01r4xancwavp8v0eoz7ddjxr1n6da2sfkoqmun1o8ylo1fak0r7bm3lym1sq0enczly05jn9w99l2j35lzsmex24joavghaaa7ck4utqoon9c9hw5sxoqrf8jexko1pxxxlgjzo672362m2jkqsv',
                fileSchema: 'mbyhpuboevlk49aearwxhhs2xqi283a1h509qyc8l0cftx2pba3jxng6vo42f69im2ryoof9vhi2phdu4w36v73rzvvsfsen59klqniklpjt5wja9ji5xyjr6pv3ezam8vjs5w2pvbga77rou18yy745u8qm4gch2lszfad9zl3hgwyv1rabifcgg0g8u01g0v44owwh0gzdjjzrv2y9oviyfqayvrtwbmqvdwwhe2r4e41u8guj8db9yinaotco3svvdd6hftijbg995qdbcyantg63kmxf7ftigohhaq7tj4jcpllcgc0dkaq4ypm6bec646bn0ipjqgixqnk783gdb25dmc21uezynpbjtx6utn8vcjok27imc9z2mmldza5v2o9l0c74gplcy08qk0kmwi1e6qo0ckqyc3ixi5hibugrxbk8ym2y2497vze0cvwjkqdf2s8l1coc3dct13nimx1gem9ufkoiz4plq33pmscul53y3i9oz6vec3moy1mvrs7bhi9h89olvy0cgcpyw216cwc0lm86prtalqmoe483eajjr2yut1dyx059w3w36sks6480wknwv2makwyg2ksld2g0c35x6ks4h0eu3rd8xv3yp5qhfizniil2d60hd0ahr3bvkmvag24ddotwwre2se4bp93zduhoqwjjo4ys4qctae3dipzkfef8m83fal9hic2vxfv77e0wwjgcktz0b2g8ippl275vxw2fg4n9w8quhqynfv5l113ya12cbu8gt054h5hvoj2qpll4w2yryxiacy7kfhxqq08h0a1n1z8cpfocmvf4rj39nxvn5s2ne5efnf3mkcn7o2pt68b6ewtu6rgyo8fpy1lm8qpjesuke6cr2aqnco22lmiu23bpmfgpurgyo1omal8dmcb2lmuq0fqmm71qb4444odgwsn2oojiqntnvn8whkrqgexgoy8dgplc7tkrgehdnr3sn0qdaj7iir3b7agrvgka4wm65gc8vafv8u0v',
                proxyHost: 'o2ikmumcyj112tj4cm6wf7b95debbz6kkj6v3yrc18yjc9b8j5gkjrapntw8',
                proxyPort: 5472972524,
                destination: 'stjvcdc5ui71tjx80o8k1p4vot225amfr9lguopgqbilxy67ypwrulvopuigc379asyt1jjty4bv1jbhnh1oi13lxrr9bl7edp8y4si5e5qbscnqb4emdufubvopupv18xv7cil577xs2nv2ykfn49xw1z2eewcb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'z5jolo610x20b13x41usmdpurnnadgnqi3k47vdcx2vz2myecvwniomkbw5dacue91cqrkv07m3vhjuiy4jh4nkh0qocww12mnxg96sye0qoi0qwgfibxqywqix5wzn6a8me5uqenx9pju5lk0rp6713ekfk2smo',
                responsibleUserAccountName: 'i6zflor9rzy97nw66nad',
                lastChangeUserAccount: '8e5pzdh7owhcr7ulqfjk',
                lastChangedAt: '2021-05-23 18:56:35',
                riInterfaceName: 'qa6e8zi3ou3oygmijitdkgh1ghxqc35v13xsz2d8xugjkw1k38cokrhuh5ah8fwshq95meri3hj73gtdav6kzlm60qvl8yo5p0ysa8y9zwlm2c5ot6y0okxv1mtx3f4lde61jaugw1crafjoman2hoz8ksswkpnq',
                riInterfaceNamespace: '22x667ty4a1h1utfphb5028zwl6ojaa5jrzwrzy9yjpoj4fry36wfqxn1pjeotve4bzvcarfj89598ydk4319ml0ysrcjd13449lqcc64tv765mdpwv2c57zhq9udbywt4crzdbeb3h7bv76kd826qcsjt1e9mrr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e6b143f5-90bc-4707-8374-cc199741c847',
                hash: '9mkud0k243athfknaij3y4ek6y0b0xm7i8dn9min',
                tenantId: 'c4b7e534-0937-4141-9987-a19718d40f83',
                tenantCode: 'lws74f2b5pny1du7c370egw0af6irhenzcr2ty97rlbph8ovtr',
                systemId: '081bc91f-1f11-491e-b9cd-eea7d451085a',
                party: 'znltfigb5485k7lsjh6ow45sekogf1hl7h0wlax66ghy6yejemowmbvba42krlb3owmvl3u26qqq50eidyp4w8v8ogc7mpwsdexe40fahcn3a5ebseogt3kq1z1nfxbnns67z2pa7hda4js5vy4zp1a1pw3rnbyt',
                component: 'dtbzcr24jzx2p59ryf3lmvhtzkrfcgjnr64qizklee3b4y79m6iqszy12ef57ndchmlz4p886xhs1wzblr5mqacagnewrfihq00bffqvy7xngd8ortyqpy8nxwo8jdfh58woo3cl8j25il78z1yrpifbbdju3pa6',
                name: 'p79mo9dcous6rsguu167kuzob7acmk6hezqvlx9ey1baq55jkvc85850poryyhrp2nnmuvl2qepcezkd05xxgldtq7p58d6tjligywjf44aacb3fjzy3n60nbro4obbqf8fwnleis8dk7esh714ynj3rrzagyyx5',
                flowHash: '9ckfaufvk04xozcv1o9vf4z41a81n0dbmugnxueb',
                flowParty: '5mvke9mx15vvbpo8cswc84lwdl2775syjljcf4gbxqplmlu2uk7pfn16nmxuvgi1c14c20ejgxjid98an0ie7ngxw26adw8bzlknquotr24pyyrjyr8zoqrqa258frcu7y8tvzq2ouxzmcgepxsfcdqh26ty0w6w',
                flowReceiverParty: 'encdg90m3d6awk2jak2cqgi4kl3476buo6xbcrhxtle5twgttlgjg9nv9humalxksjm8rikydc1em6a4it7hqrhtqlr4s4nmsuwcoyb4gw0eoxuf6lekiq4vfzirjtso15m0c3wpykwrxcikpv4a5cw4p4akc8za',
                flowComponent: 'ke2sg7y96as0v8p3865s6bs2gfxywivsyt6lmkfq6v6nz04gr4ugo115vppaybfs579ankt62mvwyumf3tl4bqxuduzqxbx9ty9zp5rl5a4xkwt5pswu8s9xczugy373xf1ehldh8n8yvfpd3spy1i2a78jcpvnv',
                flowReceiverComponent: 'rzl76005rv222odi7xb1i1wicsjv0n75tqrofi0qemsgo3y3ya4qm90uo79b10a5m7eon8dsq7a1w3cahhne9jzcw9474xy13iwnw3by945swsqor6041y5m0ivubdle8340nssg4xgamzrupb0s1ykmmowfsmvn',
                flowInterfaceName: '4pm61zh51li1s50eg3mvaamxn0ivbglhquduypczap7og8vmjdbh6ok8w3iv7hxznrk5jyp074n37tn8b954oe0pyi20qrkwqmuxy8sjj0ohpmi003v550t6gflfrqpkvmj1i4wiba5w3o74nl1jv474o9tllvj0',
                flowInterfaceNamespace: 'jp35yahivvad3fhm038s3qcglhcche7dp6khv9v5tmo2g7xxz8l0mz224csbrx0qldvwn8b0h99a6tkkz99phyg0747qi8o5c79940sytqs4xhpzr5vsuhy6gw1eqb8mssf4x8z6iw2qyfonmy6wprojm2x1q1eo',
                version: 'j4iw5fcin7thpthe4ww6',
                adapterType: '3jz6c2vjiqqr0q8168ogzrz1vt97v2g0t9yrlcxnc0py6gedsyn6exmco8zb',
                direction: 'RECEIVER',
                transportProtocol: 'micjyw1a3pfj5zktec0qfamj3d1le3zxzhd4soznkj4ol9oksn7iwm5w017h',
                messageProtocol: 'w1py86rcvfjtldxa2yrkztt5ig87i0s092150x41op75n9vmnze3qqviqe21',
                adapterEngineName: 'fg1gjdw02ryrsvadi1z7vdrpvvoib3uimyliz74iwhwtb1c629vi99nm5ar51q1gv0vraql4mg36bhc84e4o91m1arkxiaztic2gsxw2l8bgpdj2im8bd1npj7e62z8htl9vu1koogbikc069btladogk021blja',
                url: 'cbm2to6u1xprqqzbk8smgvoesun4l45e572t208n6970872viocdjfzu6tnfmf9oabtdeh0br3eleyk3zj6ukvwkolfg4qhe542ucrh4wjinx2ejif210ucklr9kzsd2vyyeljurn56ozpjl1q8xttdqsufp5ifrbhqdklilfazktu0uq6xqqlxtqbh23dyokqcur6nb6syz9f9mk3tn3f3kejyuyda30zofzgjsksirc9t4znlmeduypxnx9aq4s09ieeth3lbo9di29t6c6bakkd0x2w3tyoidwx26fgyc82fs2iei23l59hw1k6e0',
                username: 'hwrgzc29j8ijqxeb3mkvdg733ojkw7xybrhnyufwlnq6pd52mktkht0pymfb',
                remoteHost: 'jd0gcpettc4dpgwyli627u5umpf8aq9as58qnjj1ir222h2fp9x3ienrt4yx7zwu10nybitqytfeei31ajcx4jhh7ybmmjikwq9z8bdoziii43yvznqmnegnvlt2759se5n7n1tupsn0lgb0ugg86z38u4qyhnbi',
                remotePort: 4084952172,
                directory: 'dfuvffz5eakef37no2qx27m1sacenx1v311v1zl2pb5v6kpe6z1gpw1ezk7e38hmbwfpegrdfkgjconhvmzgio9h1vaweikv2cg7mn3wm2vnfvodswp8xxln8wo1inv5le30eiocjibn8e4x8ahgr8t8hdkm9yal7xnbnovgpuqizk0fkwxvwnfkwgvop1cxkq9z5htk2ca2dd8fu0zc3uzyv0wde98w4aurxuyu908rvvtfc5c674ckmfbib0ziayrgff61mxlwxv4sp2wo5etq3k3yqjxou2d5fxwez9817ws1bhwjkhpdbet925ty48xxh9l069ty0qyvkr3sq1soqr1asa0k0di4foqbj0s96pmiottyfaucc4hrch5hkmqo4sn2lhng6xbk3993zq8ht0tktg6rz4l8q1l389ax85ij5awb8d0l3c152uu60wfd4z2e6mnbuh06dpsmfupe9dlaiyce84n9fz3qyto0ppbwd08r1ez58v6neqqvb76ndgi2ril2zxq9sjggbu6wvwevuh2vsajpvz68yr5jdlddzluh9x2r16c00n2dte3r20gjlmtu8b8j8zie8bjzxm9bwlap4r30chp9b6wdjhgscft9ulli6mdiylgvqgmc5euz1v0qdl3p6sw7bd035ynb9w2u2rhd9s3ufoijxxl7ll4pqqy391atwchlpr2vdnwkqwd42ebjodes0nkccutjmct73obx3dxbu6lw8mrotswpu242f2t73dqou8t98qqiu7puzp5oxnaafu2sohoyuo9p886z4yd9tsnawpurkhicrb44etq8b6dv7r7dqndlowli5lt5b2h6f179fgr4omzsnc5tcmuf3dn59yeuhg34pzwrzxknsp1u2ax5pqkfvsykhgg22gs01li6lgecz1bmc82h2x5j923uv2pb6p3d0edh27w975dtm7v3ysy9nzfo49642g9tem6ty5ugx2c7zrgfz9roxbcp6rrkv39r2t28vfmzylr9',
                fileSchema: '0htocwjb6ylqfaucacdiypso1wikzaepzy7ck9ammif7rgubmj0bht9yh5ntj6fvkz18j2kcsf6jdj2u85wytlis6knaajtfcyqk1l7os1ja6h621xvtp84swbfi1t3gwcs15y5w77027uk4fuqoqoofe0hwqesp4oc3xqic4yi1er3opw7t25d3drjo6sdxocg5gd0i7bhq5y2tkgdt5wx8zjfuca36daw9sm1h00hmx37ueo6zi7jxr4x6qfd3ju43wqpd4o1wbj3a10j4ng6opz8ay0jm2mxj3ehpj75kb2s4xrjr2rj6rdk51wmwlyn0ulc8emzgt54oh0qeyetflgxmnkkd0x12yhjtj9lixfwl3zdcp87rkymaowcbg9xhp9gm8e0112z9f2kugua1jhss0jfzja13rh3i0jmwqil4as6ce4fvxwyqpre92dkrl49yy0hczrj5ssi40n8e7qcrw516sxifost0aykznk8n9lvi31ks4mic5fwh3yjit1u12yr58uamhp7n9m92rqlgueyurthfhofzibjt5riv5266si9hi90rgn3lrodzvvyrnsc52572qz2dlh51e3mrffqo1aa6l5bi1veyy74j3mgwrjkcbih9ftt2s8n37822fqkahx81p9dauhi5wvqtkrkd9dipp3k7n6y4r4by3xvhy443xmddxk2u0e19x1bh6l5l39yb1lr7o596vffk5xayhg8296f2mos9zp7rpd26mf4fvzwffcqhikjllfpqd3f5aorl63nvol4n9ix62sqhet0t4uaz8rxxqrhjtsrvdkrid98b111q2x8wos4en7xvd7juq9bc0n05zbjyhrm6fxef9lww12jygf7bkf3xhhu2eaamupl858x6h9uqfuqtuxlk0of1pbc8k0ee8ul6k0iyqmsq6egjw1651he1b74ns4o8wdru5t264t1e7w3wh9r2e8q4847gf0w1pv57g3s2k00meicgd08l42jqwndblvfphkik',
                proxyHost: '4aeifm8u687m7hfm6tw51fdfu4q11tm6aqhskaa309590ig1qx90xwr2w6nr',
                proxyPort: 9915780278,
                destination: 'v6qvcx8tgmn1ulkpul5yhrexn7o5ye9fvdbhxyunovge1kaj4xmchzxf3l9hdyu9inr3t7l9mcl7ijbh7b45un0vspymtrvw3ioc5v19mbhr4fkgbrcop1d61k9rnwb8gyxpls8mzjltolb1ugewqjpid7o4fj9b',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9re71c6xoq8wyy4dbhk6qbo0ctf6km5ngmiu5u9uqqmddpengmgl2a3hh9ab3szvj4iw20kc1dfd5bexa59rxl7szaiuep93tcg048nivqvwlz0nen7acf2i42pmzijvy2vx2t904barg6n5vyi9mlcdgz2qjlp5',
                responsibleUserAccountName: 'n525oe1mrteudmojxu1t',
                lastChangeUserAccount: 'ayq54bwrp9pm7z9awqvp',
                lastChangedAt: '2021-05-23 15:58:04',
                riInterfaceName: '8g8dta123r4ied4lobw4oo4g29gd11c0fg7cbyd4ubl6hswxlrx0nexmks327jun4iacji583kvna3lonri8ifmzr6b35pdb3xd48gk90rok0962z6fs9hm3b24ghcubg5fjwhc54xjg2cxpz03tnrchpksb43ny',
                riInterfaceNamespace: 'cigxcfsfyciuc4dm3gythmw42r5966eqv3w1lin19lk7xxmx2me2ls58bkz6bflf0a9vdw68gsifnb1iswld9wq7zhzro9znuynhvo87vrremtujmz7hagroa43vqyh5t93a4x9xblcwl1y0mhwzragpchbm3bge',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1a4375ce-0184-4f7f-b6c9-5f002f5d9879',
                hash: 'pe6mwx71lhvrczn219d83bpmbzvm4idms0cr0pki',
                tenantId: '60d4182e-8b05-4b9a-bd1d-4dc87dcbffdd',
                tenantCode: 'bk2t6br40cp8sqwr7k19l8sqhulkqwebakcik9r09x02x5znt1',
                systemId: 'c392ba5f-e630-409f-a18b-16272c200393',
                systemName: '4bkqknju3h8pc12rvbu8',
                party: 'dsvff1v7y6b6tmo0sfa2yajwkag4n9prqz5omugl2m0saq8lrj84kjqo0maiditwlnpunamucuxz6d74qcmx6fqa3wzemu4vnvyyv4s9uf2ubg2v2p20qsty49vt527scatkeil75kkarclw1i0pf8p5s5bavr0r',
                name: 'lhj1inozh18wph8evshu0eo7lxxz85wfwaeemp2r08a3og8s6dlcg698xisvkd7u75hcvcbslxrtscogyeq16ht3ah0iojh5ztmwlxh33xd451x4oar5cbfuepk97ovmdvigi441lysfvapkj2ueyvllevmlak9k',
                flowHash: 'gurpfdoai0ew2jnn9u6l44y4kzx12xv6mu3mxi4i',
                flowParty: 'm3i0sanlfevuhrpmtzx7fj4yc8nw0px8eg15jok7ludz9tsr620dfdjo1oa6hh54cn42nbuvgekry1vr2y5rx4yb9unzq8lhd3lhd9nd78il6dxv2nlz4mhoca0oymaj1dy2mrh7srn35kc5ry5awc9leh3r1pb2',
                flowReceiverParty: 'gc42il7h0mq8q4fk1xtisgl8k6mni39ykcvo12gsx8qathfka5wex0e8atipno1f32gjiwzmkhk1jxj4jwahmt1g0frybb2c00bshfdj5e4dia2ck8w5k417ojxsonvv391x9323ppj89n3bqkcw0qkxz9sucx4w',
                flowComponent: '46je5ep5qmzp1061b45bhyfftxcx8yfxlfw9tgjjixcyhtzi0cbvg2z609435v1hpezuv5scz5qx55twzdvb2njjnegey7jg842ht4gghfw3ku2qbqnggk9dn3nkbb71ztp746r9zfrpv12vm3913xt6iujxluvh',
                flowReceiverComponent: 'jnuztvtik43yraze6nyab6k0h2vg0jgb1xqanmnj7c7hi86dd3gup6sulwle27fsgxe3py3x6zoesi6vrwur7bth3p7ew7lxmxgi958moi1xrp8w6y6rs677rf7389ni6m57qx14xfb8a04nyxmrbjcw4i5nyqqz',
                flowInterfaceName: 'sflcluvyaa6v2xxditqvdauv9r6jujp41nkkt7mvqmx2ap19sd8ymhnpqi4ofpnzx5dzjz59f2oq27t1id71jeb7wk8sygel11pxy6vu71um6ludu0k2puonb1eaoiqa3rikvfwnvly3ztqbszujw0qo8uudpkek',
                flowInterfaceNamespace: 'dgyrw7jkesbg64eci0etnxmbb2z3ote19eknxyat3rprfri83x20l9ho0elpybwkzi9v7lfbrziz430x8v1jzwm6qdn4eizgouf191rhlpdsvicl6f9qlgnyz9gr2xenyvzn70kdfgngi7nrict5py0t9zgreq4c',
                version: 'pcw0pb3497h9q9fq4gom',
                adapterType: 'w5cywwfm86l10rizzvrmqp5au6r39pi2kh228g1r5g3o4xo6iaxixd9f8tj3',
                direction: 'SENDER',
                transportProtocol: 'ov05nikcxrm3d5n2vpvnuxdyuye9nxhs15rx642t2uinsarebjf3nnv5a707',
                messageProtocol: 'bc3ov1ktbyr33e3hu0uw42xo0hq9o8klfqffn4wfmgxcajtr6jhm543b6xv8',
                adapterEngineName: '8du3xj60jo7nct2zj8jipdomxn08r1p6o93urnn8lrq8dvqujs5rmj7hph35zdwb83tbns0icbqd6wrldtxy2u7vcwr55i45765fpuhcvjffveaqg0654gc2rfwf47loica3ghziqeywvuoiiiekpai74e75rtrk',
                url: '82ou2qj513ru1kobkt44bl80tle3is5puxl7siri28qgu6xylg2m29yqrx0a2btv5iulth1bo6e4gerkbg3uyx8581m6pvottk0h5uz5ypchp5dbgbi008if2thozfy7l3hb9pin1tin75j8emzzef79icw3ts8dvhg4z2bxax6wpxaennhodr62nziraihef5vtcam8h9vuow67rb3qgpo88dxyuxm0u31vb38ko73dsi18aqj9uskk7gbvjtap539wk7gz5taukcolmv6xiz6b1ix82w0suwfsh1xkzqgt35ln1xba42w99tmfcxl9',
                username: 'zujaekih62h7s7ak4y8yesk9jat03t4sammg810kbkzdnachmiyoip0t7vwo',
                remoteHost: 'iuxec9teqmuvjmp8v356k4al53z24h1ossu7p5mtrk5wbwvfvyjurxsvhr0akzfs9xljby1bg9bdpk5vxted24o1oybqbl5o1xh0foom0nuan49c0430cm2w1qtdjto59o8m7vsvjri0kgx02uttdbqvbetlg106',
                remotePort: 6556943554,
                directory: 'c621kxfe58p52u67t67u90ehc1kvgoj86kzp55lpboxwa980rssitc44rf7yj2xblrk15ypw5jxnc1364sbukqz26w902kuysgfmmwwob0ceuv4xsj0xcoic46avcwz6ez0xccws6opmbesvkmimwo83qeqenwxiq1ruo97ur0mcx56ev9cklpxujewj71blyjxv7k5fjjipfa13ubks2502p5oiy1v2ovmgbjyzxp07xwnu5er3a6mh166omi91i8v1e9mrt43dcu82uvgld9xe6eyy8px9k9f3kpep7aofdc55ddh85f04vha5rlh2s6gho4yiicxt9q4cim55f6b1z8rdr33ekauxsongilwicjhza8slbcjyugzcpbynpeqj26sdg5df0ocbi51x4zk7qajci2i2xpij2nyof49detpqh7rv6v4p8gzk0cvtp81f0nbv18k1zfjczcoejq6u98hqh065v3r15nky5mmer1iehcrfveqnqtwfoxtkuhomfel4su315ywbtq825n1qyun4fahlgdh6t5g7atmhgkgxnzp3fwwmj9vpkmdstiqhlebmn2b02ww0oda6z88wv28ch871a0791r5o36jwthp467bg9vedvwj26oqo8bme6eksn2kt15n7vqm5qb7yz7xehw9p2nkse39u5a896pnqiqa2rfeibni1co7i2yf7igwqpt34x7w3qrcfcomuvmzdr98tqo4ar8qcz0x7ck9j1gq2zqaycus1usjwsv6mae290eu7x2pfictwilwls0mvnvubnlhjh83xp8d7kukrevfrasqtx7eaaxihvkmelm5svb2i1a3loezvu3rbxjj2popccuwp6pqfx15p2vl7jzsir80z962qpegnobczn374xjq2ruynm1dpsjfzv1969zml739kwmyiam551syjv0rd6usk0d33idf50bmpjy2m5yb1x3n1f8h3xw6ggxb0ntc5p1os869rrbg20vpg6l4ncpp5bev5a1q4',
                fileSchema: 'vkv975yqqxbcssi4rnvrtyksjc4sl9wsy8pw0vrcouc55qhken4ppo2gixk8i7zb038o0g1q1fj71nxpu5ih5qmdudvf8ww2i63yhfftg1v6x4h2e5xrdkjaqaobn2aiagun68euappnl75q3crpytzlc5hneplxcklnkvxn8l3w167zndplkttu7456xgpin0mj5o4xb4g0ym4vamjxsyeq6r24ce44jibui86kjtpoki2wv5t6dzs28mr4fj1ec3fq3zv1xw6j0j3lz5c3jfzqhp8pgb8ppn9oc4en07ouohmfso5k7g0sle4xdn89q08w1yee5ov6torwarunmnhh7z0wviadhzk31talt85x02p0gi0jxfptuuq6qarv5b3ad72lsv7ws41otkv1etzrt4el3coy512zert1f3mzy6vlzivx2fgfngpyo4dzf4jiku3pu6lu48cuulzu4zkraplokysfeno7ihwpmxgxt2omiafno32z49tjnv01fgtw28pkxnei61rna5kcp0gy504vcajgy0fwlenhhgs44ciffefz7nwokw9ei3hppe22oyao7njgdpgz95c1wkqotso8d6sr65wdui6kh3swwo8cnw5f58wl7tq5ovroraqp0hkkgw03ypgokjr4i2rnfdr36wjcx607q06znhpp0m85iaaj1gzw7hfverfwwfaktsb0mra38o6q1gvraymurmi97hvshdz8gpxxkrb7hdy35bm4lltqkgxrdgk79zk7iiwt165omlzwnkocfbdcp3udbbot5vi0wzme85203weopa7244lzcxi4lrvj7vqmcgncuffnvam1jpbkrnui4gq80v8gl5rbz12prekdn5xqk7l40d2wrzzfjb4fid86jcaxo3s5xwffevvo8cssx74rfbs9ckguno75zzo4fjv0y6drt2fveiv2ourj9rq230xj9t7voveabu95oedsj0ymvwl4krdc333f1rxz4k41ssc5zar7hmjdaez6',
                proxyHost: '70n4ewxb2bzlwlxv8tuafe8apx0o093toy5cwkb8nn2x8kfdqvg8vv2r4q5i',
                proxyPort: 8997349762,
                destination: 'iycmqx2titbl0r6r93bzfqds0gxxspk2hbydhjrscs9qjzdonr2znrjq6ftxqodike5iayqf8w1tp39yxquotbn8f4gkxs08ikc53wnst3d5fsa6ftxkz2eopfpvk6tww9nd96zlp3bv9xh06efrskl0rgbjvo00',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hp5x7yen662xksfwsq3mw5lotul7yrp3lj59dnk8yqb2spoeg0i574fgbqnkzdoue5l99qzta7nn5fwmi1h3r9vq62s1th5qpqhsbqy1gpeo8a6k8wj3r2tz4dvmekb0g41tlcwo2fspnjuqxo14enui0q0voub3',
                responsibleUserAccountName: 'a2ty2m80uj7yskm3w7yb',
                lastChangeUserAccount: 'qbmpbf2j46rpox17jp0p',
                lastChangedAt: '2021-05-23 15:02:05',
                riInterfaceName: '5twcm3q476ob3h93jeahg9oank68hqnv3x3njv2rw7i0kpet7ihevp40uheuexr61xtmiywu1tng4rcor50zwuxo1xk6m635qin1k9afzej2tbjts746lyw5fd2w6km6rq5t2hogckfny9kcif2w413ciggofxuo',
                riInterfaceNamespace: 'vstup9sut185l0ikol1ea8fmfha6xgpfjlahgxw6vac5o5u0f24xh6glj0gdg0dlcsok7ykdxepnsiy34qut6egf0i23bigf9h5j8kwcie7god8du44a2v5o7srr2dra03mzpxhsgsbutsyblkcj8kerwg6yuhf5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5f7dad5f-d9a3-4274-80e0-7f9a8b94a62a',
                hash: 'uxke7ighni5y0gxsefx082e4955qz2ntcur56oiz',
                tenantId: '7bb54014-85fc-4c0e-b84a-4c961f8e4913',
                tenantCode: 'lbu1ub7hwsg4lde2uvsuyb3dth6wx1s68u302mud1uaitagss3',
                systemId: '618bbf00-39b1-4b56-a629-daf10795b89d',
                systemName: 'ffwfr0idrhrazym4j6lr',
                party: 'rivdro3uue4k0w0y5e0is48l16k13lzmxwkq5oyps7yldtp4vownhoj91r5ataz6s0hsibpzz5axsw2ef6nwlod4j96t3ugudutjyyqnf1mnj8nfzxz9o5ev7w9ssesolgglq1c1fx23rpgvblnytakgqwftoasj',
                component: '4pcbqw2w5h7u7yxy02kszus184656rjvgh7f82mijc4hf1qi6duqh9fkxzkn3br0pzrymfzk4xb3lqzwtth3w95rlv42vasbylw1i6cqdspjfjq17mghs8mrkmhpw31rtcakhp9rg09nt2cgxy32ja7e2dhj5w6j',
                flowHash: 'iagecx8l7xg4ne0z3uqolk2x9qokmrdxnrgiw295',
                flowParty: '9p2hm1ddtfcvh5zitfuxblyqz0no67zxpsmpn0ksc1449rkt5ouxsdfaxnf0lgg45vf40a6b3u8tnt3bcyk49yma0fox6eil2aleax9wu1i45keq6bxmf7hoz37c566smrciq591wdkx608wkrhx750c24jbfis9',
                flowReceiverParty: '180n2k5q2ab97dx7ifh1xlcbatw81rj03w4ewhfzji5to1daf20ppipjzfiu7it839ypo3axxf0eii4ba4305g7mautv1samddn2fykclq6x6uiacurkg2li65zo01x703edm8gb97gbhorj407n3lnhx1zs5ydi',
                flowComponent: 'vl0syp15eo45fjricc6l9ai8sio0zdi659x4p3mlgpjfgqsgqaxuzpiygzvy7ye1wrfzhdjj1p1edrekvsr0km3tgyivvsrqirzif5iqjwuqsq7069p28ecnajmrr59525d7a4b047h7oisdpy0vpqcshy2pwsvo',
                flowReceiverComponent: '3wunp6waq1loxw32gaa1sbrvuc9qgvhsbo47ckxgo1ycghkhemj48bwu21kt5783f7hn5yq0toqys671o721s7nnl3iercud91bwmy8kf8ija8sqx5rf9vhdikralkknps8q005il4yhhsc81avy5z18iv7wbbhx',
                flowInterfaceName: 'cpzcvkjpnkyk8wprj5iu6a55a6vhxq1v41ewq1kjyuix1y343y9exortxuy1fii1a8jnvh225bxdifvqie9zx17wwusnw81ztb0ubvhrxatb04x4986m1sicaid9zld60f73kvqk2uu9fmgocer9nz6tclitycq8',
                flowInterfaceNamespace: 'w3yss89v3wqdbn30bpg5o26nvzl18f26o6s9e9bwjkf5ccfwa1zb15ytsr4py8cunu5p4f6z46nx7am5puclhy170muo5o7445eznbo1vtow6xebdis9ju0mfdyxg3ae1qwhuaof0wamon2lt0vg4bzqlqa2gyya',
                version: 'muuz4ocdlfjmidc34o6f',
                adapterType: 'xx71jbbv8lclqwbldprevpw68v2eb7mye0qdat3koexitmtx3hrli74i6coq',
                direction: 'SENDER',
                transportProtocol: '4ampqgb8rfivs50qeeexzptzh7dqp6z9dmg45hz1ms04kl6qij1qzysampaa',
                messageProtocol: 'efx0r50je6x3uhcee8k9unmcnap35kp1l0uw4aa7r2j6bjbzem29rivkszqv',
                adapterEngineName: '3zevbk0eiqkuqfg427ryca7n4x0d4yu8g1rwrc34132owe8yy6v2gvvpa908jxqy1ubgiccuw6tme8zzeiqzc7x54mkbif4hi44ylybtf83upkp6ep1tbobh4orqw0mmjpuha1s1mol9yi5xmx8anpud9lx0ms01',
                url: 'xd8uof61wi2pihuudywsphj6xjo3aljs7cq7jxc9fjd89rydnirmzx0vqsqrhj3jhbqyiqft067iipd05nlf33upp93ltpf4s1qqa3mm9x4glh5c5yoiocp3dzlz9h0w09yt6maxoonc2f1fkf2800teteke5zkhpdeweirxkpl00s1kt4bonkwdr2ud9bgnr19ud10vb29bf87lji74yxtr2xibtc7ivk8btsgdy5ecrq8aw57s1w6qt2zwet2sw4of0ip4sfw1hd5fmiz5sll78ewxbo112n4zisv9mk1ra5j128dlhz8dnua6p3kc',
                username: '49zsjjq861vnx1252usgdvg474lcd1j41j49ha2ax8r8njdz5etf0iyl6kej',
                remoteHost: '0hsooqoz36q4nk4pg01o75f5po60277bt9vkm1mdtkx8iur7l7msdf3b1lknaorbtgr7o92emvd8o96e1xveohrmc92zzs8m3peqyck7rgg6kmrd1c4mbrjs1s72xd7sp888esipdj47jwpcs94c5xxj2dn1ry2r',
                remotePort: 2223184477,
                directory: 'y9e5fgncq71hb33evupatj75wt7qjecn5bn062m6h6pln3f85eqfsqonrt9pp8z6r3ldx9d2ad0ek3bg95umfn54m59pd77fejgf1jgkxrsfab40utw9j83qkp2ndz5xhs8pb5uhlcuwmb3hvhfsrs9z4dxwbqci1ee8ql49144bws8tyz9bl3qvj51uqd3z953hma5t1fad2ugz0zskum5cgofuxw9t66q5iml3uafhbk88k6qxzvsbobk9crljaf1g176602md22c82xmcm4i8rpuk0gsy33ijxjd40lp8le1xz7m9maozgo56of6vwqof0benvzy8gr2n1mt2n0hnc18ag03rjetyt2bjfd4m30v1o6tmz7pfmn5r9lwl1berkg6y5ernsdngl23i8lgtb5qynwlolo8s4zms00myug4qz7j0givd3v8l2lcckjztxpjnvjcfp0uvudlv3ghjqjri3t4b891auy6hvvht8svcqcmaafy9cshyvvnashfs9bs9cc1pa7e9k14r1ny7gh3l9rl4r87swkheom3rexkgmt1az1vjtzm2ukuca5gtcra0r6om9fiour4tdu67hbdj3mgv874su0mivsw32lac07ax7q8ns5cjn5ytjsl126dq3bgwx69qh7vaomu7tmy4qf5boe6hcbhyfl91nenou3443bzb9p7hn6ws7kv4bqg1opgp0mvmkxaovzxbc3eva1vmq0sva8dksxhi0x23za7kylgjouchig26j4zqvw59rmp0yuj47a7rkjm213fnc0vne1eg12p5lgkdhsw1h501ax6zxgkvzu64sokscqkw6qo1tl6f25hbhq83w92fvhlmd09uiqlnz8kpheoxyhh04l0sotjkdvz08rb9t8mgc3mdvjg0onl8jusk78rk9v8hm9h6t97n4con8prk54bcb9m5ykzx24taedlawkahtndz13pcg3duez6dhfptby5dh3dcdgeiwn878uij2voog85tpsokctv9',
                fileSchema: 'ahqlp1dy6qkwmhwnjkvb6t0dyl95laowjy1c0ith9mu2robr7prmv5rzzuhdz4l09cd8l41m3vqrmc7ds16qvkepxo8swcp3lchtyzy68gb22z1taqe56ntiwn2leu2omup0z9hcwk7usn6au992eetnrqwfyi11n4ekvgxvr252qih4q2z943vt7ei23thlmi42t1e03hny4gdm1jhbr1g9yczaisubu1zeohqn5z6p74lg8iigh112uazu3ga438cbo44hc07ji2fe2kwk385dfdo9mkkbgaavud28lhqmri99xfu7wtafwsckqd3qy1pd7wscez1uv9v4lix67t4pa8iicgan5n73uiuekuzp68t6rcbp6j0r5lmgio7qmkdarj2ervvmkt24fcg0rld5y2j7fa8lr8n7hi1ocy3mwmoo8isadckx8gijj15swdp5zw8mniacfohn9rd6obpvd5jytrn9fcgnqx6t6zbzu2csiplv5tpw5ul9kgxlkgczy1gmzj2yg1z6dx0eh85gs9x38pa2w2dh1zgsdn5ij4o7gek0hvqktht1cyji09z99h2dg5kt1rmc344bbjs50olfwgbyqlvjyaj37ub8w6ggefkbedz52jyi1kmq2xk2y9ssaf009xmq1r730b3kna2poi8j85r6la0xdyhwri0vlxbtv4xohc6k2ldk3xpax8isrda7v2ws2kit2g73cn384a52wqc5df10xdjh5eacgzd8qnln8wavq7c7gfce6sbyxqplr40xunuugztsxj08mfhtsdhkeedkfr7gvvec43bqezhekmzux0nd224k7qxvx26m3wwklklpoxhz2n5vb39dvnj51gb3c82lgx1qf7x36yhmj90r5wmegmr7s7bcp1nr3x9z8ce0c3fqbs15uiq17pkcsdmru8f0ex7fepkd66ycp7qs6m2ppw9ga2v5nwqv1jn7btfp7g347irrdfvl8y1677ne5kkirr5yq8f2bppb9gxdco0f',
                proxyHost: '9flhv106f7lsmslem4zdxwywalrufmca89xd77x18gre67pusp1j90yuzwo9',
                proxyPort: 6500322649,
                destination: '9zq9lstskghevlxybv0w36dc86gmaykth6yrnfhd1qf7kqp5jzuvg1u1ytuoccta2620d87gngm0ok8xjh4l0xesroyzj7fdpnh0vrtx48d1n2qvxmawki02dcmrgm8ur4hvmb0fp22cry3ukc84cyhgupd6gudc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7ts6z9c1bcodekie53ilk5wcc9cecdkghdzs8f2aevvuspy9dlrln64k695ovlt4w0egn3w80lemjpqr9djgi62wl62pqag1r69gd2i3th0pqcq0drvl2piowztl2jzx4iofhmbr8hr250n8m2tu04cma2bfhm7k',
                responsibleUserAccountName: 'gfbvn2fv27e4tcy6u1i4',
                lastChangeUserAccount: '8m5825g33jtmgv5r8taa',
                lastChangedAt: '2021-05-23 06:19:58',
                riInterfaceName: '66xz51atoowb1c5z0t5n46227mndljgnj62h9sjc3fxlzpngxnu7cj7anlh5v4q92xqzyyey6snocgvg4ml2r0v6whndi8aah5y5r2dfvkvrhhxbvq7vkl3mcbjig47ku546dcbqhqp47d931yhjl41mqigpev9b',
                riInterfaceNamespace: 'w7036738iibkjrdd09jny16hby5y6as4ora1mmcq41dw5fjvl21ebxq72v1edn0uyx1weoifpufs5cffiugbh5m5gb0qtofccaob35vmhb4hw9dlkil2z284il3rgjg7aghg5h21ghkenp59lu8s9eovn4cuvwt6',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'mpv7mmrsnqthustc6gfp2sefstt9osrkri6z1',
                hash: '4nfn8jt9frskc67f135ynzirhiyu09oyq5uoa51c',
                tenantId: '0e1ad020-f745-4b3b-9fd9-dc968e0bdc12',
                tenantCode: 'auhuxi5ot883j48b7q8bof26dxbr7r0eiovu3ft4uim12b23ye',
                systemId: 'e06fbf9f-6108-40c8-ae95-5ef45018a971',
                systemName: 'cz2rsbtt3ng4pv4clzcn',
                party: 'g64006g3fwhqwlx3uyvleppxzqz8t3qqa9pk4lresareuiy151syrzs8eec7nr6b7bhocpl2vm30ru05rp0pvsi9ikv34xp72j42m7yqtbeo3vkhyi2eo8sghxh707mvxpd5hqcmho6m1zc504uc5ukghewf5d69',
                component: '3hok99huik4gkg9u7xgev2vmrwgn5xvggh4jwpx5aevsxt36a3aauqej08wm4ck59z5x0dkq1fak3h492g3e1o8dxq9h5mpbrwesuskklo4nkjmx7hi6770o4n96kf3ywts5cln17bqeiyynph5vuojxch2jtfn3',
                name: '2wbti0bh3h8yaxr1radzns8whfdnttcge4ccrppgkxkvh971dk2lp52kx0kdpvkl2mlx3p8e3oboqjrnfminyebkq3vrgfsjch9q4t7csc42ottj4omx19bf00u63swrk0cjneb7do70yyktt73mxor3xdernm92',
                flowHash: 'cqhywlhhg6evk7ztxhm7d5alf4r09sr9d0bhevo9',
                flowParty: '90dhbk9673mi3n4luejjphvjbt784ivuzvtd0x3f2dnec1mlkar5bkxoe3dr6jugg4pu7zsrf3raakaim11tc72cpovfoi7d6x61qwj3xhbsg1m2amvdvatf1j8vg1sxjzeo7u1e17lucfm0olqszborq1dyeobi',
                flowReceiverParty: 'rizy2md3hi2so1ihkmhbmdtrdjrbywj67sbyk7vcei0fldy7tlv9vnkz1p2yd4km4lhobizr6vmapydmfqej3wzx6ue11fna4tx46f8ygr7gwa5d8c3c9m8ei0rpg3sddicj08a4a9iuu7r4zmarw9yh09s484xu',
                flowComponent: 'xhz1541o9c272gwwytfnni54tt9yge6e7anmbyxa34f59n2amrtdudsn4qvecnat4b04jc4ts0sye2cihuis5ypgyv5b330b9xb0rgnmp28n1mmv43l7krhrx2sbg41s2it93tg2wmp8emeteiegzoxxla0vdrqp',
                flowReceiverComponent: '899yaq8bya427ykqhx0lw3rb3bpvnpqihx563ib4ced3wzdlnpelk2pnr5r6ren19ox1alrypmdi5d318n6zzguwdoegst3gfwtje0cwzyymjj87s493osfwmxfgwejzehlow17ovsx1jr4uiruffypsco5nff62',
                flowInterfaceName: '05mfz1gflwkgz0b0ww1ycffw2dp4hvhir64b5tuu9y2449o0t3m0c0ucoxoregw8p7con5phaxrvacy0oyjhgp0cbjq5boeuy9mn497qxi4uotfw4tokw4dj0ikh7nidl3yckk9sgatuershljijo98sx2imxy20',
                flowInterfaceNamespace: '8w5sl8ep09jzokowaq4086vsg452kzeu6fk34aoc0akmx1qodcbmw42gedjothovtqbesxubdyy9145g8kob89mphrd2r7kvpb7zp6yfhq6cn50a9nlmi2zheo9g365wkm29qjj2o1mnh5r7c1u9drrc6nj33p5y',
                version: '7kojlhu11sj765318jld',
                adapterType: 'imbyk9cndffcpjj6gbolra4yw48bhd9y9hf01z46jkyipg0nguz04obo3xax',
                direction: 'SENDER',
                transportProtocol: 'lqq8zm5mpq82rcxknppgwcnpv77or74s2hskul360iuiks5cgq4bb94dc395',
                messageProtocol: 'rbtvo89j8vwnr02i9n9y19ifzflbguv09oi8433rk2q769odj9gdg3zoirpt',
                adapterEngineName: '9yfbhbl6286f0watkyfxl5gdlydvb7hmrs1yx58vdg006zs8ea8f278hunnaqppnb9y38cbcllwjefoyglozv7zz3pzjuf1gn867r18ropy4bf2b1s1qmu0u66uaews874ckvf81qnmzoe3kl23fmzmlnyod585r',
                url: 'xk7gz9o1o554egondpoxaz7mwbznwogjolglbcn0i8wiolqdgidgd3wgq5n5rw8p40pr5wf1kxnrfb3gd7g2b9amdjrkqva86fcz7p8emf73qqcdu8irggv9auir044ecih1u3vhs9jy48nhroa4rut87u1e3y1iut3s3tepqdbi877aw36grsg62d6pwi5q1gouwzar5mppw9uv8yss86qb5htcx1t4efhrxal2db37qmcz3qprzztds6fqvjceg229g3odtdtsshv6xvugp6yzhfrhuwxgghuv4ekw1dpsekagt13layoxzjcpavsn',
                username: 'ph4wpmtkb77yzycie3z3holmw442sc24hso5gr2vhhj7p1wkd4ol87cpit75',
                remoteHost: 't3gjf52cdxv9hvotpdccez1n8vql975dgyw8ktehafhahsjbboyg68aieuz46esinywvm3ofzi1m9p549a3orcqrai2e996yyzxdlbxo92n5vi28l08geoo60nvqs6qau8g89tf80ssy2xfb8ioweb2sajwgjnvc',
                remotePort: 7371975235,
                directory: '9g20rmgmnsihfn8kj4gb3flfv41mhhd820n3lzv52h0s91ntpkx17stwgb8aq51oh6q3dcebbqi6334z0imfed4cp12sfwlai2nc8hcbr44xjwz8i5od3kb5q6nh6r0jqvvf42yz9bg15x8144i1d9m5jd0i2juwi62i6cw0wcssfz38er1h6i21er807drdywhb1js0to78kz1q66fzwvnxor5ecogm8vebjjpjm7d8jqfnysimyosp2yk6mehivi559qs81zs96f1gb8dxa6s1dzvpfwi3ybj8occbxt9fn48v8ehuiyshv4ig2w7xby46thhcyipqh2fpc9xbhngwobzs240fbsuvwxkr7pzsq5rhsdj6kndlu4yxs40rona51wbew9ichnm2ozg7nd8ecm1hs5g1lizaxaod6tv525kkp3djf8y3gs4i14z0scsvwdgrob62cr7hccdz3um47mlzwvfgcr4au177y2a75tdgui2zsn0an1ejupq74ah56vfa02wzou5racwp6njck672wuam7s7qhxxmily3cj5qedgv24ckl4irc42wwj8tb4h3wm4blr5cbhv8mcs7qs5lhlmdpjfxwveeh3soa35nk56zy8pji6h2exoq4dh0aptv3nvsr0xc8i36qj4esijsmlr9676tt78vchowj7z9y13y8rkjhlzpbmsfllcp3132yk9db3sq6nhjbcpeulgc5ctjryr4q7ln1008oykjjf5g69t588x7l8mcof4l25dhyj1wvtxaujmls4q1dmzdfyq09svb02bhmo7wcp7pmtpd1bnmjzrfa2zt2s0jdj3dhwyf824b0f7n9jj0tuodwqfycmj3ehkpo5zka6libl12om2y2be5w9gqpve743h5p1wacm7dq5ff6q5aqestok7ikp3h2fu3tj33ybigsb01xoybtvg8462oleeyd65atvt0wd0astvdqj8htwvbfd0tom023e602entzu03prz7ldn5pl08jto0',
                fileSchema: 'cuphxrjxvhzm4d0qd5jn1isbs1c3q5wflbkfu9tpiwhsnrfmdd6n26pp87mh1ox4r9tobdewwf4w1qaem60t7s1qng3xvhxk18r30h7q1q5bhgn8n9r9hl10b5yw11gans7tf8r7b37dc6gg551ym1f55ul1fz1msn0c02emu8v51hxoule4swxinzxl6g0jiydwnbbdced7q3mbyyr6o4qjjq4wk6zhdvavxmia0fd4pmm1ux7q4c35vvecb3yxpuxmml8nlqyb48b8lz4z9qb5al1cr9ges5dqrjfrqrvfymcgtruzxjh8h28qfk5zt083iggwl10rmmsmtqt6grahwoa0lvixnsp97lquhshdaz10njowzhnhz4rp1zbjn27mbo2jdd9o9viie47bx6l66v8sy5s50fy5vs8auzz7wueql9o76nxdoi3kvhxh8sxsj8j5wpst81em0xtphilav5qg7ropl48cwo4kydqre31arr925cf4135bugmm1zv9nnacxrvmrowbd7menx2oqtf88w5qygg1ny6b0iohuy29zjkz55rexlfksfwuoy2im2krsixoixubp7zcnfkdd2csn7pee2nlh0dig796wfe5e7uek6qk44hw12olqjbxux7je9kb5yrykuuoxfkwfw6e1xyl1yivjayliilbs16iql0883pmjfrd2tvqz6ly00z20cgtmnotw8ljkepneblwe00ugpcurazwe0k76ub6tw515zgp6q7j4tr3tlazpr7z85xbysznkxywsbmyf1e9oc6kbqd6bkjykmulizoyzapuld6xp679q9a2vbc1rnpbvsk7nnrpj3uiarnkp0ukag6f7xrqmgyowwpz2n9tf4cjvtf11zdfjzujpnsfgpl0lovlen33wjxhg1z8frtibvgh3we4tfemvuyziawz1brqlzoq078q3gixas13i10yshix702j0dru4zgk0n804hiup86sxgehuqmqpcr6jvrae84qnx63b5b4',
                proxyHost: 'lts2tw0vk3ji8jzyo3plalwrc8e8hnr2y0ojh4xsp0no75sxn9xfo09bmpvm',
                proxyPort: 1339645365,
                destination: 't6boztrqb2kr1bbi117gxbma6ati9uop61h3ufodwyhjaifmqj5jevojw0hk1xzcwvmzdyz49c2wgp0i2dfzqmhodji5prsz44i03yysri1dwzyrkpar8grh3hi9tcndvdf0nv04bqgq6yz4eitcwba19nwrj0au',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vujjhrn59qe5mdaxflp04ymltcfyeuda6h17p703kixtfjp13aok3tztrqv6q9dvtdzw5a8gej6itjltupdb8w57fuod3fmsec3x2c4ppqfgwejp2k1e1uhhru71475uwxmqkry9czqyugix5nyi34703m6tsogx',
                responsibleUserAccountName: 'i5zqurmmnu9r01yxaaan',
                lastChangeUserAccount: '09oam769zwvtbs5g97zf',
                lastChangedAt: '2021-05-24 00:07:12',
                riInterfaceName: '7z4sbcjq3l3ib2jgd55z1oiq2dnqiqqqwtkqg2n2sp60uy3nyvyoujs6ufe6tdkytdzayqwpg6nv4qxjzleh7afw0qo4foy8guyysk2mwbuic9rrmfv1npmxmk1yjak2v1h7d92vafb4xejdrq6c9jng3pfuqfqq',
                riInterfaceNamespace: '0he0v6soyedz8w1pca5ri6fprbaykwubbemiwonxomlsx0bjsejwdlc66d74pzo2k3l0360g2xiyzbmzozwq3q2anbkqjau35eifhhcc4v1v2b4hbg5jmasmro1okyuul4tvk80m3ymsd0oxd3nosz4tck513jxy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelHash is not allowed, must be a length of 40`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b3711b61-c961-4ec3-be3d-47698934e89d',
                hash: 'qahaxy0leru7nyjnm5i7sqmd4h890uw1mkrb7s6en',
                tenantId: '5a6a3d72-ba18-471b-8979-49492f846362',
                tenantCode: 'j281j9nwdrc5yh7tqkqt28byh40r80ikl2tx5pz5ubp16n8x7i',
                systemId: 'a7923963-40b8-4ebd-a9d3-0bb9eeb1cb33',
                systemName: 'pv5suqnxey4jq56rpq3m',
                party: 'm25tjncu75evexrmk0vrohpd3i5kxhohbwo1wrri2atllp9a1zags09irgr2hrvzz0p3r5t09yureylto4xnz7yh88e3qq6w83e63vzyveucfo3t69jyk4ithntri7zxadhblrk6tv3dmfl7g23uu5govxob2pqs',
                component: 'xhcr46n3tbgrfehtz9q21iti7urv0fm1vruypq7py1qripv4wutg0n34ajiyh1gaim00ltoloceyr5kzz8ouyte99yi3hprvgbiiu12aftw4dzc9gw00plomkswtr7lu6ch5y2l4j5u54mxknze8ybnz22wvnyqy',
                name: 'nxdftyx2gm38cbqsookz0erfpb6l67hd7r5piwsmes2g526dhyq51b24cu2lgyepoyvqffit4u65z6cevff6gyysc6toqf7wszdh1pdjkwkswp11eyd1oo7ksihgexpdtwq2shtbtqgczr7lhkrjycr1r630hxen',
                flowHash: 'q554kf0l38h1guuk4q6a460558td467ub8qjdxb5',
                flowParty: 'afq58bvcgkcmfijoy4grcya89j1up4ckcerqhqcnq6wjlld78qavvuq1m0ob5kzuvdvxx3soda1o2axmk9edwh6bakw5j3ovjyinfage6kmmzeh552l78s7dr43shs64sv8kml001fi5i7qw8qs2dumpntsp5tlg',
                flowReceiverParty: 'l59wwosppk5d6i1qcgv6xe5vs7k5ci35y8accj92h01qlnflvmgurpeq6j31elula1xmcbk6b84orzd8xbbnjv9ffnh7qkf673i083ga946vc905hesiahzj8jc0gmqqknnm6gjrw1d8arr8ofvws3nifj85wt20',
                flowComponent: 'n32qged71xgoa7gbyroen06ct03h6go84bxyr7d8277qtgzspl9856wj5b6uyamlvxobrn9nere7pjo4k2avx0zrgadk87xj25zl2i3hm72upl885ri43taxrqurf0adkqm19w7saeappunysc26o4gtm0bpjjjy',
                flowReceiverComponent: 'v8qbuwdwy5wnlhf25s261i7ieel396vmnmltajlijk0r75fg58p1m3f9bvpqm395smwm1qu6zp37hv84seprwarv58ncw88fzi3veetwetx1dt1xsc30cpxgcfrzi5e1596ywzggq3gnc10rj5sflfit8nlle376',
                flowInterfaceName: '5mqa8ntnnrho7e4ihopifc1ffxl900vcro6v92k0wb9h8bnmvge4im7cjkc7gcixzs1opnlgg4sbcczha2ll4w91gg1994hykttehciggh4395xk6ro8hnhidzonzn4n0urydmt9omhyzuye4bzpxexgwl6vi39x',
                flowInterfaceNamespace: 'qu2t6k5oqc07vof99igno8o4g3ei2m59pbkzul1gu1hdtgqejjl3i83k49xihbqx5k5044q7jsbkmny61xwfqw41g2gjh6o5friy4tbu5k6bx99k6xqooh29b4b3fwnss5qvzth3tmfvr7bvoy4etn3cvfecc8cf',
                version: 'q47mxb7ror2dgukundm0',
                adapterType: 'xbn82remfwq3yd7cwy1n5ba39g4gj2e0cuz5lsjx7n956pdz7veq3s9ou9ez',
                direction: 'RECEIVER',
                transportProtocol: 'bribcbvbmuep4xoawhoqa2munlxnrmosd4tdwfi34xz04oljy09rmpgofqbu',
                messageProtocol: 'emeag6hylzf4n3gqgnca2akb59ritovnibr8k74k8x1uw6aqzi9h70xxtp0m',
                adapterEngineName: 'yw1n0wb9vfhhtmfk8lkxmzmmtrgyg50f9whpvb32hqbulib0zp6c2n0zymaiu65exjen1svf2i3rmhoz53oxc9xpo1klb1r81isxxu11zq4mn33zrf6st1ko6k467tnrcjuvilpf8jwpwbywy0y9anpulzsx6ljt',
                url: '3evgl1jhqrls1zw1e7ej7v8xl4wu8stlp1k9bljr2fpkd9lvqfpywavwikipo1a1jj21y4h6j0504ps8llfg29jvl79wxskbc2fpqitdwbhr3jyzqf6rxrjsx6u7c6g15bjkb9njqtz0usmevmwct1de74i6i7jzhjz5ssn0yc9dk1p6a7mztnlvoqmnq4jcbr5ome4it674odmfr94yay0g1f5xscgkuun6n3izl8svwm24ep69iwe9jk69z23yh5m5btk8t49q3st6r98o2cjuqml7k3f9fpb4thao4f1b1kfgt65zj4agmzd84wy0',
                username: 'ha34vcebpoiuelidrpdrlbkn7mh6uikc4zmjkwtfzuc2ley038sp6u0wyof7',
                remoteHost: 'ne8hvphybcqaiohbvt148i1b8h4bebskary4sva6vlt175c7gbwi40fw16p2dx8o9hns5q2l7v7d01aq0xlolhh4292184ze80plu9c3x31t20xb7ij22el2q6tqqyzm5uvvxgkscyjyf7f5qjcc24jw3m3cx8kq',
                remotePort: 7444908732,
                directory: 'or1kjnc9tlyclqjtrzoupk96genhnperzrzkwjbw6p4bk5jmiuhj275u5b1uab9n73a774dg17oqgeyas1aiu98okvqofjc2ngpipnh7l3c03w5ej32ftuegaoii8h6fcm0pflu9h88v0528gm6uqx3ti90fy61tmnmijc39ir2upw1w78dklp7nxjejdssvkwqfou9ktv1gqzdggj7f73iqx70h8l9aul9f9svn54xh73feh4v1yh09t6x803tzcgqq47ukinfeychcui2xojmtfkfy5y9hys3zyxaaxif3eekbkhg7355yf51vv3xasl5fnvedog810wzziorhuoydfjfpugujbp9zbnje61x893c06si0id038o4e3juqu9ldujvb1dfoh2t4u16bk2fzqtx3b7lu0t0hmfcwogxsoqwugrqijg1cbe7kz7in5singcgwadxz61dvy8x2aq1zk8qol0wsm6beqb5qzanl3bok0csyx9xdcixb0feqg3y12t5hci6y20vb2wsjhzvikrcn4hnzivkabhtpfhenqafwsnzxjfrlgt8azqzulcd0vd7lmxlmjntebtgvnpnnbcsty1wkygizsym4fsnwnfrjuww7jb3nt78uh49mvboxkr7d0w7uyl67xzdrzle9rucppbv81rm0ftybwa076pwxzjjx8ezvs2jn0hkxm8ipts0p4ucg0sek0pk4vqrsvib5ue3qohlwf6ohpo6u8oujbzvtnk9zvrmfda3mkzs51c3217ux2uzwbsaktt2pppk1are8akzcd7qrcgkjlzprg97t7wn601me4gek8jmaavy5n8r9bbj2udv95yn3kyb2gkskevl9ugx9p74vlbtvb9ko1i8o2u1fjz47umgenuoqkvxqn4avd0nk8beqinxo08hfvq70vcxh2hp307wwdwjcbdzhkego1z2azkyzjyize54dy9qdy23rtwjljwgww2bmad5cbqfdib8ufzkywh21ukfm1z8ivw5d',
                fileSchema: 'u69izwsya20pumjsl1cgysqac78nejt7scxvj44r6aj2um5kn9z32i4rx0wcfpfsg4e98nse2hkmni4k6suggoymrd6hr4ec98uq76vr9xdfayteuf7zrncvfrtlwt6du532bakx82e7ifk0bekzwosipsfr64tlylbtz0cussdsgig2ztuy7oa1uhctz9ur4hx1ay2686n0wsedsqp5m1k47u4gha51lvwj5agjdsvjmvz06ztplp27xfbu9pdrlbg309tpbhj3tvlgdz3d6kmuvc0ly2z7qeb570xpbc8yb4r58sqsyvtbdpn0w4dc09d4xj41ayhejxh3mbkdyscq428mtttxid4j00xvlijngy0zjnsv1fn96ni0436a0cdqkremx53klc0eo55gwlxnkzx7qmw7brl7tmf2zlkyghvxs0nqvhf0oh9amsrzwms9rcmj35xlf3gd7dioo9u5ireuigprleyc538ju5tu9rybcy5kasu026t6pi3rlp2zkmgjqgou8gbusbbffwx9pljwlwk45w1p0a4e716fgko8t0o4hl4qmgxjpyvwmokpk8h9fifbnty80h09oyi4783thud5z1bphbnulxac35vywpyge7jj4osov8hmny4hyxkko11mk4x8m927cv6nas1g2jlc2mbstigfo7w2fqcsv78fd9xkjj7evspybo5joblyj2ojcetcat6gqu5l44y0osovxhdzwdw77ri2xsrja19sehjbzgx1hjoz3ao0o630xnydwunip050yvmygzsnovx7817ljdbw3id3663alchdovzr8axktmx13fbclppwy181lbakm6ap86xggeqc7qdfofh3wsa7onvy8devpp2zwit0zm1dpssewtnh1q4bug29n8mr687al320qvtkkzhsucwgj4o1ruhswv7ktnpcwib9fmmejnm62uiux9z0mmzqhwczo49hx1rl6xynnhw09jd6d60ehtq6mqx22vtfwotek574ums9',
                proxyHost: 'o26w558nwqwuabniwp0hldnakyo3s82qvjkg8wdeybie09flcrahao7zmcyc',
                proxyPort: 8357310570,
                destination: '00ub7b565fleocac8kegtv7b7l3d42gn0cxt58t96sizchx36mp1caouf404vf309yr7wuu51izek2onvwd10ntzanh2fzma1ac4opm5vrpocolg1hnqiyinuer7rd2xi8c7een6ehl4y64utcwgiog6a6ejm8oz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6ej807lmuw3a8kggw5yilv20sz1czbhluxkdlxl64vuo244mubi9c0un3jdmajlnts2xm0obw1omjvruq89e22l20x9ws9zupji9z8ugoljuwt4trdlq0r6jv4njr89vjf6ygcsy5jktym8dmxmif8l618rpwrbo',
                responsibleUserAccountName: 'gxliasulb2u7vi5bmmx1',
                lastChangeUserAccount: 'zoku019xyxjgebvfrkyo',
                lastChangedAt: '2021-05-24 00:28:03',
                riInterfaceName: 'gst0kgu4zi3vr4356rlt3qqg7qkfzvq4e9i9ddwoi5uzewbhwrdz2cyx0awgdppdbgvt530wwfy1ilfuc4pmbk89kdu8xhwvs6eivsvwu6aavgzy5yxuju30jlfsp6mw19qfcyqp4l0rntyaggx11aak8pwp0j93',
                riInterfaceNamespace: 'vu7dc1v28ivea85xrlwdp2b7rlo0kpxbx0an3emuuscta1q015gyaae9y2lzfn3slld3gul90d0jwgopbtu2udssus52le5t5qox9w9ow41j0pd3xya7fs412l898d20g2ql0dz9ojxys9wksqe8rdycazs9pt5g',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelHash is not allowed, must be a length of 40');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cb7e9d2d-3653-4227-87d8-aa0531b8d9e0',
                hash: '0desp464ladwjfnfbarq5dvis3zi2igf5k3a74uq',
                tenantId: '31qd10mo2l03p7hdv4eyhg459pfqoevznkjl5',
                tenantCode: 'w9hs8hf0l10zgz9kwelgq94auj6dphho6j0dqi8ry1t4iuwrrp',
                systemId: '7ca07c8c-3810-42d2-a294-6b31a2be7c11',
                systemName: 'ksblgtyrlyn06t5j6auc',
                party: 'pbj1g7w1drblay2cmevpofev7trueq67ku3povp859p76l3mjbpzagx3u2tecb2d5n0sd6nycz5lhypx0iib1k4sjoier7quzfgdyhpkxcg0sauutmjrcos6g9us6lzwp8x736wp02zle43kop4h01dhttqbvhu8',
                component: '541u2b5ajn774xwes89d3tiu4813qznum84u1wh1jyr74tazbwdsyynlwa838gmzzb8uocffv2dl8jx78c3gx3jrgtdzeruezn0kfn6da863ysgwvej1e8y04a3i0gfde408nw6odr0feu9svtl9k3p5i05ctr12',
                name: 'n0wn0oqeboqdx1fcmo63f332stq8s9335bbj2yoy5wslxxn11cc4to2hrmuq2lgm12u91sddexv98d0c2ydu298uqoamkcpua4outs6qcfmimwxpg3jrk0xq1szthe2nhuoizs28jwl9bbvktpjzipgk40syga5t',
                flowHash: 'm2kdjtyqwyxw974vf8uqfytam7cznne46leezbcl',
                flowParty: 'mm1l11xq0i1t5mr6u3qde561vupcmnpfk7a4o6wvpzyn2yenk9k9p07jlficr9xp1d0kqeprumuatrflyl7qlmq0bqc5ix3lvfeacpn2iw86fkxluabl60zdh5dvbwxd9r74k6w8oi3evj7c4ga0uiy6bx0se9i5',
                flowReceiverParty: '7wj1yddhfnqhpqutj2ko6n1sfkcdbgpaaw24opb2v2aqu7g9z3hnqiep47rseqkms673di96dpoqccmo71iyimn1anfszf6dxjzzukjh237fqtzu14sk0gnm6v9qpgco9gestucur4gmp18kwomkhngzefymqzqo',
                flowComponent: '4f9ibsxzcn1u8p1ilp4o5b074wqij3dcfdgnlp5bg1rpq5qdmohmr3681j42h02tav2z7yxznxn85f68r0cyb8kid84ny50yci9pm4vglizmt466jjm8nn1gvhxmp4xxi5ysiva6cjghxlxgxg8u1tuajwqv2ju9',
                flowReceiverComponent: '7jiy86tv3ov5270vsbknji96lnddsd6msxuqlle2epvue01kcf38lb4rvf86pz4hbmuelwcr1xq31oqdof5ka3podobkh9ruxrdsb6y8loojnrr329g1vvxdtpboaqrca6lownd31mnla3ibpmzjnuvwafhbxrqy',
                flowInterfaceName: 'u3svp0ctojw8mx52uuiluodqgpwsw62ail377by8pxnq456a93i6avm4nwg1wypr6bao4vwv6x69qukxikx4cm30sfqqxstclr4tvtwetzp5o9oxa9ir1u0jdlvwjwoxp2yzbeyqd7qrzu6ala3pbnp1kou28cjm',
                flowInterfaceNamespace: '9qppnxt3q7ukavxerepybqletr0iig6f1hfrmxt06dvk700s63k9yrwtap8t09ql3zszqpov5a33ax3f8qgdssoiawbzmtc34ow69kvknnsogoh0gg8oste8407frtf0uv7xy17graykrn2anxv03kupochptcws',
                version: 'z58o257jicu7uyjlxqa0',
                adapterType: 'ki3jqw957xyx0ucuo84ams14ffuaw1nwrjjta83xvkhprvoexu2tks4dr8r4',
                direction: 'RECEIVER',
                transportProtocol: '3rcv4yn3pblzg91uvmwdy2hlify2kofdmualykcf9y2drit11wmph5xsbzjf',
                messageProtocol: 'ljc9r0t59p56m2rq6anwirl8cdp211d8v96n1fviejj43n35iv7fayk0nc8u',
                adapterEngineName: 'vqfbqknxwxbf7fi6qydlcyp2c31d3hou1gvgz46raec5ndjv9yfrx3kp4z4538p1jdhvr0ky3v1lm0r3eb0hphk3mt81ykthzsgqfxbcknlgeyxdcqvvvj655268fqt2ta2ycgm4s6ne4hiq3lfsl3d236kc4af3',
                url: 'qoagqhig9gtaqulkj1652ci9qjxmfrn8uf2sr5w1rno8r8a92xhxrbc96exa0tpx1pxvbyjvqid8lvpnlrcrukl75v4cov1c7b9me9r9kc49nc4ifdm6grwjbbh98u45t0xepppy504rxkfsjx6sqky5l3e15qjxf5t4u00quwn5io3pv0qopw1696s0jvjcuesb5gdhag4r1hx9g4phpdwooz7tueyibkmkett3fc1dgl9zce2smwzf1t6zv684moe5f3nzdtggrqxzjfped00mngcp45b28w4u4bahztl4k89k5q1nuenog143sxe7',
                username: 'kzjib7yn2un1osidc146cy5y0wu2lrvy40fx586yv88tf5hzj2qfgklaq0bg',
                remoteHost: '76dmii3l97wtsqluelb08m4q39ushmru58q8oe7io3vjod472wlrwco9u5qp0r72oj5zmnarjs4smc4g42qub2dgfsf2v11csjp51h9kz705db1xhh4u4ncl4qgwf3bnvbwpcksnm1j1cjxsvnzrnz8rnz1gpze8',
                remotePort: 5658461865,
                directory: 'nhvqhqn6nw75iaa1a5rjcr4tmpf2c2uivr9enp5g9cp81akgzvqg4u7y79exwl795rnl5ncnb4fc8fkspgrgybg669yy78j95vg6xayx1ppqpkym45ufnu5gtwc2v4vn7rwfoko425k5im5oc5wn7s8y3tx8j23jz78jv2t1kq381v2nx5di6t29wm5jsbyirhviwwclimy4mqmb14cwdyq2xy1yw67pop3fqph7k9g91do3rhxg1gqgo0uuyyexdpdnmnqvepjftem9r022wuuzjtr7ey3zhtcwwmw19k4wrsumqgutd72ylygi2j6xmh29mwfk0vvkxv3g8a87nn49s2gaq77ntcvdrdhwibtfekhn7ecl8w0d9atgafb9twfce2chifa42jpydo6bf4vhm0ixrk4lrmmyeo4q6hgvsay6w4dgecflmb9n2l4t3pnnc8c2ne5zlisej5ilcc96pr893p4wdges2u3dyo7v80ifiatvecd9djk2ohfobdedtz4x9pzgkvmgqjn7t9300pfhjgponu2e9cw4rikbwwpkua4v3t8s7glhcgc9qx14eemhy2g83fdqur215uxr9ju1cu86w89cs9hoz88dk51y0kelf4vgsqylf4pn28rgko9cqku2t15uk3nrhbz72na2ex8jcj3a3p22gcqfo3ulu1j95opaf62c54xd86vo7yv32e8gf71drzywdwxvpuiqsli8prlutrhlnah6oyby2k8f3z4a1sl866xjj3yxm6szwsic1mzjpd3dgfwcy937ft1stfv2ic0wnwhvvwpibprvp0rhr5nle89sg1w99llkurja4637lwjd2lvdakfcyvlnjnplfmvt6psbyh5g5ut4haarbbd47cgy716nzrnnvkajv8wykv8wvwf6upjqrn2v92grxbaq75giuen6g5aedouwg48tk4mm23qs71qozmtq03mtoe62xxr08cdymgrm460t1ywdf48j9om02jg43nv13n0e7aun',
                fileSchema: 'ujjhhvbgcxu6vxqp0mgg1kpoozyy062c0mouf5p3vjm6z1l1m91zuurp8cmtp883yqcj8ulltm2ohx4oos5hmu7vkbgap2kalyu8v9dn8k4fpk5j116x1aem4vc9ednpyb5nvh82n8v023kyqp8wvxwf8o55nmmbk7ypqkdcjidrp1n8n79ay32lzn1recoww47noevtqik0r7qwe535wqa8ez9xapzlldl671mhthbrnm7y0gu6jqe9yhpfyab68e5tvfu5mco24tzt5wxpxtgq11mp5qxuwsic5xx1638yz57tzs9ovmrrcokl98jzwzpaf2ztf0e4uy4j5foa6wrl6t60lnnwwubv7bbuv98bphihccuyestn3ge8axbz4rohp5ivccna4hb0mowwafk0ih2tdyq3bmg6cn0gdjnjjoc9el6r6btojojuojbzvk017xnn3c06fns8hgvp8iezynvqyhrrsrogcyp1j9eu0em4v5huf6crzcdvxtov39xsbeojhse3zirxr0409b0svryp9w15ilu6l0lbmq3te3ufdeev55odvec10cy6e3zmw9xmbk7wnlpvfzx8z4dcmx70vc79mwqb4l6wnh58lth7ckfl4hluewb2wu142hhozely345qkl7y6r9ocg83zuj6hwkqkhn3s65fkfg5hfob0emb3y4k5wvdves8ke7ldamykko8a8nlyks7v2i9vpa1ltux4g3xy22g92d6q2iz6rvyirol8kqjm59au56vfltftopv1d8e2waxr72jb9oc1y0p5vezyekkhdjhx3nfdkz8d098k2615l0843874trki9h07e1r9tq23paotftkeupn6r724jmi03ba0tjk9uvz78gqsx97qbec1x4lfp40x8bra05gr38x2nbiml83ag73lev1nmkxc5chucorckr5rn5pywv970kkfv1l44bttninvm8ddpborfngr0gdi0t2o8xgrauigzvpsnga5a4v3yhxxme39w4d',
                proxyHost: 'ody4udfjet4pqt6jkyf07oa4tk4yvpqs5vs1sia82kjhybb0zwv5eok43rlm',
                proxyPort: 2993853188,
                destination: '30qmpcgnvlaxmx3nlzwviz1ivjfnkl4u1vu51kqg3z1axt6r5tiawrp5h4fze4sopur25nwczodx14q52gcq1kq0iir7aktl9i6k10f8e9nh03mu58sdw4o9aq2cyk1gsle2sjln9e4pc8coqppapd808h0srjg7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gglnnj5shbig11tynu59hpil4sgit6ed59sz80ch5tcq5a404t5wrjjzfs2l6hwngbob5t44mt5qwqsyptqqfuioeteou3gxbba7856xuh687v7o6vbxzenabi7yagrib8rnmupf43ro20ftwio8g1fn16qi93ua',
                responsibleUserAccountName: '72w33rhe9u2qp21140n9',
                lastChangeUserAccount: '8k0cb1vdd1fjb482jr1v',
                lastChangedAt: '2021-05-23 23:34:47',
                riInterfaceName: 'ohrlg279gmzdb7kdluledisb4iqb48gkq3wkvxcznxhqx1wl37h8sj44aj5b0zzpzxfnl7b2pcws2sfx0otof1ji4od00i01noiyxq4vys5i2j77ihgatibf6quvdcu017cktevcp76pundwbbjdvkpdteyp5ud0',
                riInterfaceNamespace: 'qyt3qpe4gumzpfqjfisfluj3x0uodwuj9j2dcqg0trfcc3cfxxtfjykr8uhi137zw4wq9j3bafe2djvxnmovjj7e6kugqcbxo5ri1bwugb3sd4cs80w85f4y8netxyw675nnqttpd87zin4i5v8nfzmr6ozzzihr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1c6748f2-3405-4351-8115-0b448afdd4c1',
                hash: 'vusek9jhwtdm5epvaujk2a3wyrct2nf8ml8nbllb',
                tenantId: '9dd9bcfa-20a8-4a77-a465-172e04d40910',
                tenantCode: 'haj13ket90emcdonbojbzv4ovszh6kxsdiofcgusbniec78ht2',
                systemId: '9ooosjjqnlhf7s0yvvzbzc4mqe4fzjiyzb9tu',
                systemName: 'k30xcfznqzem2abxk3xp',
                party: 'b780ubdp6pj1psz7s6quv8w9wkmm8tpq20mhgtxy77xrhecd9xf4200rzqw2txodyqcwbmbg79beak4zfr2ubj9wlg7p3kcrmh89qesxbznjczsh6p2l6ze5xaiwxdounlfey3kzu9cz0pmf1umqj81n5u24jn12',
                component: 'g5poxfzq3eo0t69qaq4tya1aowlj93u4bkfhfqn5e2hlvwz2th12doa69nzfphm8r9fvgqpklh0jfsd91ah8re5cnu15gqts5fmq1dpywo6nhid9ro0oo1uyqmbrd0xm1ma2jpwm99drb4d2bo40ahupr2ys10e6',
                name: '45z4p8bwwinilc2m84kkx8wxf6q78rd133h26noybfez9elh18eyt5govsm69eqozxmyzoo1dsznnu4pjktrfsqtb6q3nqtdlk2xu2ten17fq9c5g5qgkl66kerxjufgi2zcdije7k3fv74rxwtrln960chj25b7',
                flowHash: '5grdl4yqkefcje2mtx9gq1wis4n4dyclqupfmug8',
                flowParty: 'h42ah58z5daddjv9bs9nu2l4arsibepjd7llnoh627lq0zp584zas1nf29y651qf2o0lf4xy435k5nvrkyvptuvm8w9ba2xy0ny8pj2d54yp54veiuo50jpgsuuh817wge9cx5f56s6m3cwlap581dhw9vqk9r08',
                flowReceiverParty: 'vdu4reydbkyia6qsp6u94iduvkb1jzgup0mpsneebvpdspe7mkzu9z336rv875kter438tpx0jcqzx55s7ihu98l19ccs1kw4250o61b16p38yu50chrk0afrdq8dt0cbosr9fhajfcxonnt8sc96s6bax72hmq5',
                flowComponent: 'bbmpjhd6vhwgnjxcqxp1d25sse6sm0b0c9e73w5p7z69s5pbj3fia5icy292sks8c9enb3xq2331yj4s8hvkp4t5tkylwsm94x0z8vcm63t7uj06eohs42rpl0rsp1aw98ziq69b7xdjls2c652o6zf3ljanfq6f',
                flowReceiverComponent: 'og1roerqw69ssd039vfjec3wwcwplutus40uo3m37qbrshwsbbkw6jcghnau41fvvzyp0xyntn82p7d2rct1kg73sl2ymisiy7tapz90u0ornsh41irufkwj9msjzzp2j8j259pq2bsc9zoapdqocbwv6eychnkv',
                flowInterfaceName: '8z8jjc52dw3xiu3l6lxczfve79omfxp4xoqtkgpqzgf99v7pdhyoxoakbbpd5d2m930m2bw68se8v7mrh38lze44lcczlijng7ny21rj0zu37yyq1cc0te9exffu3wiwgrg2egepm37l3v5rupgnbhv716qa4b6h',
                flowInterfaceNamespace: 'ye91kxapqjcphbd3xa4jt5kb8jx793y5geascpb68blo662nonm7b9pq9mboa4fazfbbisu7adibjqj07hwdonp9egeayjbguqaseyhbe9zqzsnm9qhh79qku0t178gp0jwqabitmcv71s6xhi7p38paw5no1y1u',
                version: '2eg5b05ihwtthgsm43e8',
                adapterType: 'h117vst70avs0sqj9qgogscn4uqjklbxp0j4mq0e37ifklidop21lc7g8e5v',
                direction: 'RECEIVER',
                transportProtocol: 'y46rtax2vuq25e4ljebb93adc0x7wmtb8d7ozrqkog3mt53cpzqc0692sr2z',
                messageProtocol: '890r2kifkdqa33c8gsddkfyssrmt5927bf7wl9bpxbt04bkfvpzsfvn0j6ae',
                adapterEngineName: 'yenksulfedag8nt03czv1cdtjlrrb2xuamfesfovipym2o6rcii7b11t9cxppktdlujo1kwb85x6x9j3jj6lmfs3btwnfcawdgp90wv96czoltm8il56m9uaauz4h3b5arxcdsp6k2x6bt11w5t5i3ar5lxjxuvq',
                url: '9hnef7u0ja9f8ydxn404ep0gdulsbz8rfcvl49cmtk6d7jtbsx33n0q53cptz1e9ip2quw5fb40cw3ui9fqhd2pd3ukxh54gbo2j3918vcv3mvfjoy04p4wv308cjr4zi17j7t1394189alyb7cj67bkh7fhdabg1e1z5kn9xk0rhw7wv5g4ihzj87kwjwecaf214s1jcpxs0cfyc3jud4d6egsk7ifzf6fmbrrmn9oy5ool519xltycku47rhi17u80ps3q5kwk0rlcdsxv539zaflw8oapuvg1gpavbv6zbv9vsy4zkh0o0xpd0v65',
                username: '1zsz26mj0bk8eqts3kz319hs5r5kgouamx8emo2omb35nkbn5ugo64ii3kxg',
                remoteHost: 'o8465zp4cyes3gkc1gzo10lam6svti06l3q3fxw6ffw7tfimcfzysrheyfb9a4msokb6um9jva2vfraf21tixrsi9uml8rpikaymccl0o9c9a8ncv146ja4kaqtihbps2ul8n188qlxppsm4jqrlzr5ve1xobfqd',
                remotePort: 7608045209,
                directory: '3z5td8i1n54cblb980l58p3qpnmpos0dhivqzy14ia9x5unm7tzuy1f3iwh8rrwcttqdrpdohtg9r36dblt7clhi8xge8arv222f4mapw6x1s375qta4e60046ujg7ivzkyyr8s6kjudkgrgz7v1n9gu95vnjip6hnw2400qcid5pgfil0lt933592po96b2b2xm3guvvqazusgh2sqh0541j850wu3xbg1w2evc8s6q2qirmwkgbop7o34tz0a0v07bmwv0qr8knr808conn2kjrb5uw6xt45ic3di59pt6f74khqwcmp8mkq2bvwgcua8c2vlrrcx4htbankot5h29u0icb975crbjhwbt22ftbjz130ls5rt4zey8642rm3sh9c7dj9t540v0gp19vpnslgp7x2uez7a0sdrz163wgshmnsv1hsvs3gow20kjo5igx5pu8pq6xezpngubcvu1bfa86fvk9va5eb1chzcokepfouu80y9jmqmk1ctsnt0mzzfe1e8o2fwfmadqx44vjqlcl2k04rs6gwj2wjlwbhju5e6c7409uls64kpwerdq46kbt9pi7kzn2e5c8ijqz7z77gdpikg25c1c3m4ml7fclcqv9imah13qlb4jzsbguoidiii4nrzkdi73da26xo8oj4i3xobrz2bkpb50ebymvph5a2302m6533sy8mmf0fkm3okl58efr3coc1pfg7clznplg37ge37s4jzqe14ag3mex1cww557sl2ffa3r9joo6pgge42xcc0hw0zebiagrzzm29js544a7tespdo4wgoe5itt7qdgzoxtzl94uh7zai5vrza3b85ut5hnfcer0ufy7oz7f9cy99xuc69l0zrsde91qcs8ufs7nhxw5j8xxu8oqc6u5fnod4vwd4ftcwcj2l52up6lhg9sxgoy9xfi3b30bi4q86cxerghk391vpi85px1263gokfqvid3ys3m4uym5k28yoisox09v6cu6xy3kaapj0rs',
                fileSchema: 'tioyddhqip5i9vft8i0ygoyriz10wm3da1xic0i6u34dibi9uo6d1fpuv9lt3hariawyki2wd6uas0dz01iik1w1fowilrb66n2m3xg3ou4al29ulw8routa247c92ala96nzt1i5l1vuh2w6hp8btkkcljom8b7o7atb0oj4tk3n9ehtr2c86mr8fsp69w7eu44xt70kvn0qu1ql78t2jzmunkyx1apeoedzlmtw0utz2a4kv1nxxx9mkfr2z6z6vqg0033724h5uw9n94irjbbxrpwzdwo16dzwahif8oo67dk665rid7k0hkz8f2xd8hq1cjefvom7qwp11zn2u4s9iylpvitllqr2rrwccetniqhv4a9fh5atwppblxj7p4mlcaw5xwrwsj3szo0im35kqqclaw2wr2ytpiiuhjy1kql84va35tyusaxzv8k49mszm860blw9w9swrng24tlvdggd1w4nkpi1ckx19wvmcd4piyqy6uhmislb5b06uyhwcpkihp2z59cv1ru9xon7v5cerd0c2yrfn2hxrw1wng10756qpikgrvi67ckz0k38fasaiuxox9w8yg6dt18x1n1sj7l7zcd2tog0a72l1jd3iz2rocob0h2c3zjnsockwtsrkjexsvu2xqpok26k75smwpflno61xwwmapa1atswqipm1w2uqj3gqsrpk1dayauqnw9dxiq7lmjc8c8je9qpnmwp6gaj5rvkwtsnhtb67wveugitm3bd3eh72qterezldge5ehgnxkmsraydftmmqqa5ylljn86f9zdr3n4dvpc7dclrqcgg3jax4uceh195zpo9zrom2uozpmbpty7a2ukj3enw8oumae0r3v1wgkdxul3fj18unflad0g2az3le5tv9cve6e8woike4a054vpyyhmu5lf1hlpz2drq9m2x6u760o4bxkn4vr2crra2wozzckjx6jurjt2l0j7iv4ptee8h7hcbi6lm2xtbu7l8vse03d0pfrw',
                proxyHost: 'wlpwud3js4qjzurrae8xwcvnr7uy67t02x39pf541unv1zgy9h9x5bvkqaww',
                proxyPort: 8238483469,
                destination: 'fbnh39svlq0r0su6ecrswg2hx6kyuw44g3t8248dtwzruhqwjpx03bxhsavn7tymvsdt5j7qiuqr0k6o8ltqlbc0jeqa9ubmgpoef9oxea2axwruuvy45xjoaxnanay3h0nw5lg3wh88bbcgnyse4hfewwl0y4mp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'd8ptndzv4cn2vrhtlbgbo2jw99wgseeh8bgsejq3fd1kr9gzx5jywkv5i4bo14ycxq6fkqwfgkh343u00vn24qu43zp0b43yin44chwmvq7r3c9k1i4tm7vq3vbpp87itu45m4vfx47ngvdagn0zyue7uxzxfanm',
                responsibleUserAccountName: 'wi7k0ndeu8amvt7c9e4j',
                lastChangeUserAccount: 'cl7rhcdhkakgy1a8kfp0',
                lastChangedAt: '2021-05-23 01:08:46',
                riInterfaceName: '1ctujqj77zmkizyqqrp5ovtpghv27zpyqow3tjufmlfw44s3iusc0cyfdmu5l0rjo9o2raz6fbwubulcx62g5zir2w64e21ouodeyo2pz8h999rb5ebzb4d772quy8iu49l8xs8v5rtduqay7g7j4wioo5zt3e2v',
                riInterfaceNamespace: 'ebimoffs0ywxxkajn3idh7a86o9z3yg149etvibpe9b0ytvh8ebh7eiljiswigu6kyvcpydsfctd4w74e6934703t86ywrjfq7lma56ch3xq6v8ecbg03t5iimik4ppagg7nvc0nc28s8wsvrro00zmrcp8j71f3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowHash is not allowed, must be a length of 40`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a2aa9f27-053e-40e7-ac7b-4558ea1d2f07',
                hash: '6jhxf0cz481niasqip8qat31acixy28yoi65h5wn',
                tenantId: '1e9e010c-5aa6-43b4-a3ca-4c872f9bf86d',
                tenantCode: '4qqdvbx2fo5iwnujkynyy9ud2a2nfk57kx81uadu84azflircz',
                systemId: 'd459d869-b6fb-4e54-bc20-ab75599fe6d1',
                systemName: '59j7vuuob3rrbd7eh262',
                party: 'wi6umwe451hth6t497d0oeg25r1185zv2ju26d4duf2w0cjtcuqbetr8te5llplis0rz0lfxb2lparp6vynephhdzklxg7otcmswmlkzxe9o6vj005ke57yae0j6vn6oalb14z5uclnwbv8ypzif3r3lp92asml5',
                component: '2oub3aytjbyr5errojjrcqkw55f63qjgrdbq8zdxzk8g887wm5ftt63k0rqed9lq9rxai69aeng08ja03xep943kozhtw3j5fifjl63t1d5k0oefw63u2vpc2cw29ge25cdox9qa7pa1oeowf9tvzqbzwpn1az1q',
                name: 'rzoxtxh9kvcij4vfzt9b0nvpv6wjh0n4x6d6ifgmsdlbcb31v5znnyfuffid0bqh0iazlr8fli9o4333f53b3k0qj01azul1s3l50nmjnsx0ho9b86f6lmza58sp28nmbrz0hys7rd2fgi1iiitc2fpbz8bv1u9g',
                flowHash: 'wtge09eabjeg3jeag0mpzsibrxtm6bkcv9zalvkk3',
                flowParty: 'k505eg0scdcclwvu8lurcvn2aj2xr6ewpvql8je4i901ia1takvxbo5pa77cr0z77vsn55ezzu873vb2qergxjoperjpbddr36swqnxgdes8vkz186yhdhpfj0j4foh2v95sjsgilu1qvr18l57mqsvx8jjos4dq',
                flowReceiverParty: 'u14vj7rvll16s8208py6js8hc79m4fggccj5m07akruvt8nqgdt3k7cqs470f2hy1ibp78c3a21mfhxs40fpos11ccflfvf6xgqwfbft9s12p86tjiewif4mfecnmzyuh0irlislug15vepvf9skqpbo2xratkmk',
                flowComponent: 'usqgad5t6549gd8xjk8n2tgual3bitxp97l92oda8viidlbj9qsrfdg1huwwvodu951mm2kewp07yxih8mz34vagmrh78e3tb0311htuvuuk4qhhe7c02blccgb0dtns5iils7fhci5jzjhk2v8c8j2tn11a094f',
                flowReceiverComponent: '213org940xkmxknd5ewz2h2jnum64y3sr3m34dfm8kmci48xys4eouyi87gufr0e0cjvy8c77ok15kk95lu3nm5y8c092o58z6q82vgn5mw5v5vgkn0j0dw4l7jlcm0wmwb9c9b4544vmpmsutzxpybn2iggpb9y',
                flowInterfaceName: '87nlj7nm2uove4z8q5oqpi72bsfkv1nl039xugclaj08jo4sybul71t6g992j109zh98pcd2xe82y50v729e15fm4ifulkth6wn5nxpxbzzrmhmimnmujdib9d60p5emjj85j16dmiix8jm4g8vckszee0p2pux1',
                flowInterfaceNamespace: 'khwoosg9ve619ba0za6c56qe77jrsx96xt1kelrneiiszbyqylimlwpn3fd25hg4jx013ziojamigwmo8bc6b5u2w3wb2dukexcu768acas2jy5yd0wxvpausc7o4cg32gdpgny8bsvl52cnxnfgdu4hhjumq613',
                version: '73a50yvwjivgbvgrd64y',
                adapterType: 'v08422k14x9phf1l86jjqr5h41jgzxpl37u05reu108cxar9olhbwn5eem2a',
                direction: 'SENDER',
                transportProtocol: '97dphpy859hqhifg009k6o73fcba773guqsyshpzswlfrcih6vjay3ie1h2q',
                messageProtocol: 'el2qcij4j9ctrf0q1qn09pzio0p28fctp05vwnle5075opvy25bpqsyltfpi',
                adapterEngineName: 'p06mcoyoe8luazaec2mu7ruggzao3nuprvowa5y6t8w70by6x8shi4lqo53sn30wwdaawpnqyurf79vxctikzwdf402whavye1i8pat32hrj7p3u216iom26h4801sxvj0ga8a5bx32zwe5g3te8ki0c2s02m115',
                url: 'tfnklvzwvwzu3ru0zgc7ptcmjavb9tjy845saps5ztzr63s1ige8v0x03qri2iaybt3e7u5wqxm6vuhjlc5i9taie2k9r2aa3jronafkhoujwegaqcmiwn7184q2xrh65scec384vs3t0so7nltfg28j3lhj4vvz0duc20h25l2w4g48lh1a45349hfspvq31i6n0lv8kpc1cjazhktv8tnaagku4miapnwa0no6w7ehd2sw0ykopjw174t8unb6jgkk6yjphn6e8adfz28i1lz48lk96jjyn7qw4s8dqta72w0h7iys92s6a0zir54f',
                username: '981c6mp2upnr8fisgsffunorgbdf63ov81ybonlefxwy95exo8yprv7vzakd',
                remoteHost: '2tslmlwi7a5denrm8fc3x15invb3gg6y1lknymoc88a7vf4gmgcojy67phj0p35whv6ivpm4eni84q2w2wu1vjj8gd7x4lsls0gdxs2v8raae3y7nelz6ve38j5d1z9id8dng9c0549wegvmxk6yq14qhb30ov60',
                remotePort: 8342733884,
                directory: 'dhytjs9kxbz6podke9484gg8eu3sgckhhfwa7xpivakn7iykjutqsa0q1kh9sm9abtov3x5dteikucern6kw9huam699el2zak3o5ip0jt25ls19e7nip45det9ntgthx458awhbw38brpbssohj4ouy3h7nppqebc2r50ekpf8ui38k3naeve5g9muu6q01n3xhxhccpimcdzenpjcxt1flqkyp6nul05z22q6xrs26zg4gw5hwpxbqmhljqb9zfg22vpj08kuix9pmjf3dqad32qvvfnow4kl5a0ulupgfnwvbil9e030zoa4wj1v3wu36lg7pq98wa0s1mb1c88aitf07ash9og6mjnrd7hrh2imqh2t2b0koutrnrqjfao2tkmp5h6ulcas59creahw1b50kcflko7pwbytlsnelwnzj06zrv3j0cj0ce1nkox7coz1z3my0i1h5ltxdhrze1r4lxxnwb7uiaki3zgng53lqgwvstlerdu9g9qn7765k1uvmr0hnbsdi8vv0xj7pg9oulnxiydo2scx811wq1fd2wjof3k9rsgtjouxkcjcidosa6yp9eqlnesstcnceqixl73uadn03gc7bm6bd1nx2wwvaax4arcwy6351bcnh3s1a8ib7t90xscwv3v7n3df57cuv3n212hublo0pu2xz6qa8vd8bi5pjwmwv5qyf31f15s07ls44xqif4p6unfrzstne6wub0kxq9yl0a9xbu849jseairofhlv5sactytcpmz29hubrqd4rrcdacpscu3spavzlomswbv6rukfs55p0fiwu2fc4weeb6maoxcedqprcjvq0xznjw6upat9ag8ozh0opkiz637v10nx1fi5mgxw0zsy56fsmpmueb346n5e4f7lh6uwyqgkho1wv0zadv7ygvpm7r903injm66bpf79i2z7fsj4cknryb96a5689kdn5qb6dksqs0jsrldtby7yhmjrrk2fd3qcsce41xs1xrsbeo4s1',
                fileSchema: 'ss65wt5jnosdhmhhjj461civw6e64e1yrgmytw2fbq7gayhwhe0cl31cvtyuxxq68pua2i3ll2fc6xwwxwbs133ntcj9fv20t4o000syeidwtnwdmpcmb9jkda7jslt493g12kgzt7yk4769fqt62j4fy73wl23ksh3nb36idsnafgfmag0ui9x5mhl33at5jwhjsce58i1brtucykx8r1i3lecce6fwn4k2td4wazsxni3le5ovd6hj9amfiyt55wajtmyce9l41blq360ik2w60q9kkhucpcilj7nb1gtsazus68i6gs2heb32hthhtcbkqvuoiliigvs0qr9bpcc9iow8rg311x8d8eo0231nrqvzx5uj5b6hkp4tmt7uxbo8xydacfl2lkhio9ophdzf44g1d2ihlijov2i06pajnkol8antby48ohsju9x9qa333vniwp6nu3bj0t59z48a2tp8w6v091jtmp74f2kcf5ym26tr6qb05b41htgq2ehuuihuj3jrwb67t383vv9myrgrwp8h92rep30kbcp20ipmlzw5l4ei6lf5csyrf9int7hf7ctad7ip17jva6dj0qt1tqifnveah8h4j5i1gscdkwx3zr7k0hmmb72circepyhqusv9nfdkehzbmt8zb35zatn0z92fwr8jx8ym6xj5zir4rvpuw3amtxy26ibzlwey8re4z366adyxd3ukkpk78zgw1scavq5g5kzm8vrjqb4v3zb942yxaqcidw5s6dhsj9wueytml8jmof7enf3pgmxiy05v6c8gn66ncfm1u70plgsbc0w2n82xq9kunpkp5xkr91kuj6dbnwe7h93tex6o4std1lrzfixfxqma7k3au2m47w6v8hcobs5u3elnrwlqcp3u1fh72i35y5hanw77wpaoebynesbkn7fx92ob69ny08jig7380c8nfqwqee0dp98cozh6iod0gn5x1dcpg75x8l963oisczbmxh537hpbtkphqahe',
                proxyHost: 'qyp5f640fa1stolmfmrzrwfdkjrz0x78on1ygiwr5shvu1ncsqklo0ar4pc8',
                proxyPort: 6531200996,
                destination: 'zlrwf04a97mryeab43qg6lvcgsqvmsizcecq7q5zyhixhyd6gcu9wf9gnf7o9gp84aeu7p4veoiih2hrvrz6ozk2tnaycxg2j7nqi0mojrbqs0daqhnlgje523k897jfzwl2q3s84uyjqz8ga2eug9uxhl7y07p1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ldp67emmt1uwhbu6yt6a3gvx45om679x5ahycw7k1zrrdviko9ujriv8y5dtb1nh5ca6cj8hkcdjog4ab1wxkp3nxg6n5j1c99xgzy079kx2zvg4wfalibwns6tn5yt762tt3x5hbej8tnx51rb4q9n1kx6eyvso',
                responsibleUserAccountName: 'ttdhkego45rj2hc3tp5c',
                lastChangeUserAccount: 'vpym1uocli0g040jshea',
                lastChangedAt: '2021-05-23 06:46:44',
                riInterfaceName: 'aast6s8oeo1559vile4oa2kjjag9fsh8ammlq8eix2xiznvei2xbmm7jppgpl7mnr4wveog25x26ej8ce8iefzpvcqwr9inm1rrjn2wc6q4dcp54248fumnoxiva0wd7i4gyhdsk70j8eni7pdi2w7s4oujfvkww',
                riInterfaceNamespace: '6vcub132x807tazmof03cwkiz98r90v2ylux5ct9im711xg6rg8sjy3upuvjdw4i2ya4p13hi95bi7549pf1yi4o1kkwbg9ydb71j5ca6mr6rgrcjgfdq4y18j63z7aws628ggoaz5ewkgiwnsqk2ig1xz0x8seo',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash is not allowed, must be a length of 40');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a1418669-f235-48a0-9742-89d4cbfdb29d',
                hash: 'e3kuwbjtgrbof5ml72665eax9hmsvp7cgk71ys82',
                tenantId: 'd9046b62-944d-4320-bd07-fd312f173d2c',
                tenantCode: 'cxunf5wn4r1haya54toxcmrn5djjom0agfykqne11eyteb4jcft',
                systemId: '2edb1098-8f8e-42e9-bd3f-328da918db0f',
                systemName: 'mre6t9ypk6805pm9x6xr',
                party: 'y1egge8xdv9yt7l2toovscqpj2kdes16q75pn54zzy7u9wivuhy780ade99x9g31da5i71l3930vnkv9npfx12lpe5eg6xg4g4w58eebqdnymaz9dnp0bxrjni2tsmul6q4igxh1uut1rwoqe4i08dd6k68bwqqh',
                component: 'fz74yrnm3djaplu2nrnq3reoqvavb4n6okckm2qq3apkgg009q5mbd3t6wix2tfjgk4m0qqy9nwm56d2v48a1nmndgjkcmhyeza3yhhqjsydvwiu4ehp4l28i4fn1xlnffvtz2ech4oambwkafs004pdygmvw6gf',
                name: 'jd3dxok8ng52ib34nl1icz933bgfxvij2mu2bz058ix6cyqy4gggxetniyoys6qoo55misqz02dx9fe3a2ritksyu9ld02ezfd9vpdq7cff45ntin9vtyen8tnn4swv59i9bt0azke1icnest9aco6wyih3p7y77',
                flowHash: 'kdfywgjmtt5ftq9xyqfz1sqa9m9sp2rlcdwg6he6',
                flowParty: 'i1s8tzkylxun0b90phz4ycmy30zkf52wjndz94uaa2nokbtwie7qdkhr7x621a8v3671gu70cr1iq7rrb1225b2uzlhwpan8g6w3ad2huqvo5kl2z2in5qyirnrrbzh8s1eq38j3jsop55q3moz9vqdq7qz0lqnj',
                flowReceiverParty: '0s4bkos07dhymbfv9kb0o4242vl6v4qsim247un4w8ewl7ddfbzpu9dr0ptkrpbhvmlmz3j956b8crsbn87mrsem7quw6kh1yt5fl4du0qt9twqt16ul450l9xv317xsv12u11mnzfg22xhwlqso0q4j4mnzibqb',
                flowComponent: 'y23xfd262thh3gskhg2sodw67mayo5jabor74nqf54wzs79nr7ez6oh66jw8rfgdz1lgaxuhwl33fvsp39a96zjtqg8qzy9jv6ad0fw4sgao3utv9ks2fqeapu84xbgkpyg43bxc6jjch3xzzjgvwibcg1av9z6y',
                flowReceiverComponent: 'p967elw98d0a210qo9cict0xhnndhlguhqntpm9uzcq1cmz1ikfd24ozoxzu8ao153cfdfkg9zobdkn3nqyvkiih8u5lunrik2xk8zdizagya0r73taavk9f24tu4oizwc1fl2ocrca6je4pfhs55lyj2g9crxqb',
                flowInterfaceName: 'sg739900albe3jkbt2q1cj972s8rjwujznwpcgp45jnqk4eul56ur8jft510bpt06waep60a55a6u022romqvzzc6zhbl21lyfa4g8fb2d4n8w4f6ro20hyqehjuftle0nx1r8v1akv247kytlsl0f3hvn5iu3wb',
                flowInterfaceNamespace: '87e7kigq9s9pa13rprwm98ejq5wph52wd4whs5fc4as7ay0baqyb5bfmczi6izbppm9y4z0mxgs4zdk5dqcn36ins6myrkoyf092uegf8zc11puxx6diqd614ij63sa3qlj4f21rzowzm3jxvpdigow1ciplnqnr',
                version: 'kooenhd9xj8dj6e2uf38',
                adapterType: 'm55o713gb3u0g2xdzvwkvi9jys87m0goyl1qnzcp3vd1rbgptp9piw79ui8j',
                direction: 'RECEIVER',
                transportProtocol: 'lxe97v64zwafc674s28smz56x0a6lj0nepn1qlxi9e306cbsracf41g45tj0',
                messageProtocol: 'jshmb9xnieb4499ib9id3t53f32nguqbsjyysj07fxw3svi2vgvbr1ojqet8',
                adapterEngineName: 'vtf1ufiv47vc8ro5qo67ca7kwnxzxn5bzbxtqvkwbm4lb3uhubad8069tae68bb1t8pp4tnt7x4nvlhc56mxlnilo2lncymewx8e66xb15vty2go9qoiizk1yviabx9ph53zfou8wwpc4yp7v150s7igvyb71a0x',
                url: 'wmcaix0wgcmbkvz2lho442l8kquy1s19dnnqa9kl9iianwbdifh29l0jlkhf1tnys9ro1dvpldb98a9o4mv6m23k72lt06oaof1avzyiastifhtef21lhohv4lhf0c33vxz4sn1eli7hvll6czoeziugvp1j34ot5e907ixsfd5uzmtodaajovmda70jcmux1s0ybtulyjftytzc4ed6mmr0ywr8rjkl7gfidqidczimgsbsh4p824qjhbopqeu4h3bwd82w7vl95y8xndtnnpql8blvhm7p9o2wb41z7s6qapf77j44l8g1iirj3mty',
                username: 'qb5zw94mc3y96a65udcjr6b36dx4raf3jo96rnus7p8ojbje5yrtwtwalrlk',
                remoteHost: '40k8jzg234wpoqyk05c4lgzmyf8gmqz0c6nu86e12lo573nu8chomworuo2l6wh4rj5htc8jydgvcv401nyirzwdu3z753z431bd7zr7lnj206c77jj832oxgh74gizejsqsulv375d33h9w90cdguqcv8wk9rtq',
                remotePort: 3464854555,
                directory: 'renlq2mujrqktvw81xxf7smsjfwnndk2ybmjo9174pyup0xct94nau7bte52i9nlzyxa60pgjy4dit7b1gl7i5w1bga5jpj7rjp63wp6ajrr9t1hyzc3y0dx1msk6htbrrhy0emrcw81ds9xcofyt7kjlicqxtpmykrf5ke6dl07ig5dy9b28j4vwg4e7vvn8vbp946y4rwdtchq7ekboxwqmac32xleruy91ufgk6yblkn74z5nqzzwvsw4d99cqqgj4rq1r76nf1omjo7zb1n3q8rornj02cf9tifd1kw2vqx5lhhmk9torsno58fq3g59fbyjivpmk1rovjowcbaj137hsz0vhjo9rq1bbpjdkdy64gb0rqpkqfnutz8ngfmwnz547oildmmfchwy6ougd5j5wi4qlnhhj8y1nnxixy7zwb98yz6ht2voxv35u4hmnl7qhxzxjgdm02izp77qdjshxpd21qmvwi9cymdt38qzy8rplxyead671q4zm1aygurgpaop9t93odcscdhenzbh9t4qczmbrq0goh4djkfze1ohshpfeaauh4wfay04hlthieei61alpsn9nvgurifha34h3k442cvlg8f1m33km7i6ptu956vrr51oonvnyykw0flq7oi1he8tco7lif2vtvbzcrmdilkgtfasng41o69elv95afwicmko8g6gw7v5mbsy5j6yn44w32zcdpznnrkliqhn70uln4xi2qvr51qdg08ylxjate4hf33ko0ijd5qoc3zvd9u91n1gduhjyrud6teqfmj4zfo01qysbaqwde4i8x30m2dyu202yhqs3kreatoy1j09ueai1crux3kfoz9pav9bqp5tp1pecv5t43vgbe9i8b0owp8ywpua80te1wiqgeoo8qi2xihxtcrtk0rrvd5hl2rb2188lnpx66j14dp5ky7d4jt0ss3pvf0ocipepyu8wijrbrjtb3sh5w8ffa0h3jwntqzvzlqv8ldgffq57ovi',
                fileSchema: 'qbsn6h3grddoje4uijje6mtrb0y2qf9j3kqsymm3slwr9qb0s65cfxaw1lylh95bkktcqet60ygwefyays7dwe78ss3c0u9tur1oxp4vov8iyj356p3t4szhks9sqp04zj37r46bcw58h4kxie29tid0mswan6117d9w7atltkm2ifz717klnvncy12rgs6o13fcqak90qyrzbaj48v5eavp1c4z4g6apfytu98z8nwfxryr7kw4ozojqd634igke2wxy821sys8btez2cfnc7u9g502dvoszm0xv2usrxhtnfj502j76v8xlkphxmq0mcrfpp09g6fo9jydlwfsvjg83gaf79c8wh7yrjquv8mblff8kswztje5bev4qh8kili9l5s62phf53h7ergui51lga9m89n1aidq2hr3f5j3e3eumol2qzs8xjyhimg0dxsds5yq1amiha38i0d0wiayahr88rwltghigesqgykrc9vqzogw4z9d865bd16tgandidpzbylpp5pns8fk6z9y09fwui5na1qvhlxvknxfoi9qbxzbgn46wxq5kgjk7e2a2kadkaowxvrmfni9ckvrjrmcr0c8x18lz090v8vvav3f9i27mggye0beodl0fyrbd5csx0lgl1kbyp1vb4tl0pk909phl90yvqmyvd09c8jgal3a96mqlv5e4puxxbhz0csu871vivtgtn2dcmj088yigjljccdu3l45xbzts9r8ddipkxinrrgjwc73vjjro1bz8e5sc601tnlzi17fdsmy2fy1u3hmvp5m0x6kt9td6x5fkg94zdfqcnnrbsfagz8s76ngbi2thv6uf7hz0ztbv64k3lmo0m2keceynslihpjqqaebwmt097p2zzn9src2pp1l9ftow0re4v74jofgb9ahzmkxi3gjc9wnht40brwvoinzylvw0bxcqwrp2152p1r2r4lftgfd453ohgphm8kck16k3sq6uqzsk0am0zcnvlk7baprab32',
                proxyHost: 'qfo3w5ntiq4gq3h1zns1nhr8u9hzh29gp6h88haimthxb2ssucekuu0c2dmk',
                proxyPort: 6610917316,
                destination: 'silgbfhq2wb0qzjzsq0nsbmast0zet51arl6uew1ivdm940tx0h27v3lt0izq76zwnpsx4sx4kb7jelguavi2atv06sn6d7d6ehba3dm36im7tl1fvz9funoptycrh35lhcmbge76vd6vmjku5vsjgrop8jvogpm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rr5lshni95866b4j3xjb1annc09ubwjxij73q5g7fgpb1pr9olxptfhatle1cljsewlpkzseyw5nq020qzuw4xq3ccefesr1ylpopp3gsbq5at4x9i8nul4pb0kcrndx2mp1lywtb2uslwotducrp4fc5eh48tp8',
                responsibleUserAccountName: 'h2oduwg9y3nmlcsv0biw',
                lastChangeUserAccount: 'imt89kzmw82aodgyvpxn',
                lastChangedAt: '2021-05-23 06:58:17',
                riInterfaceName: 'j9xzcsdez70la64r2ekc7nd92tbkoepryk9xri2j0vli43eoy2r9jwpghq8enx6lkd7xosyup2s6g2jqdlg4zgl0crc41hpkyeuqwz0whxyfaccsa2v686qtmmcy75yetp5v666g077gxdce4uzvvyfncbt40kt5',
                riInterfaceNamespace: 'b9rvvalrh0x2aeil9ikzgi099vllu8orubw1pj572w0tgvmep12ym6l084ueq2mm56nohc547xs76d9pyxh4zsrlkggbk2rf4g9aah8zmwxfrqbb0wb69t96v1jjo3nyznqnbsxjjyrjavk0aziov9glhigd06hg',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTenantCode is too large, has a maximum length of 50');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSystemName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7e24058b-185c-40ba-acea-c184b796b345',
                hash: 'tz9vj0vsccwwu01ohlzc8fcw1ax5jjpbm3vlf8ir',
                tenantId: '5ac55deb-b6fb-439b-893b-b8be8ce0eb92',
                tenantCode: 'kwp394i3zznhyd0fh9x6wkdlon9ofjeh58s6c6cnwefzsi3fix',
                systemId: 'eb960a09-8c52-4436-9828-09e9e20a8cbd',
                systemName: '3xdke6koko5w736xfl9x8',
                party: 'bn9h0qyxgk24a9xpo2ioicdkm3dfwxabyvpxfunelirorp9p72lf1abvyh7tmynhqic5a9v011ss42r50y4ucxomw1id0oo0sz0woql6zurus9eqr6ei2rfuxuubw2i1rt44u7cg952pd1vc5qsrztfeyanh7m0t',
                component: 'eo56ycmdxo6vvyi1tessdp8fysppe0mthy4b26a0cuj4j3yp58od20kv6kjy4sdjcyr9od11yeduu0z9t4ttt5lvrlassrt9fpmjj6ox08fskvfpwj737amfdfukwmru4kof4en1xse5vqqea1qmkd9mp4n2mjbd',
                name: 'ktzuq2tj2yisep1reoxa4uyzfijvukf98gvuq0phgnjmkbs3ihwigmc555vfujn4yxajllhktg6jjnk5u9cu80vb40avpavgqfx8dh7tkffhv3famwefz84ubzldrvuq2znx6hk5rxs0nd1qm3azvsl86itsus2a',
                flowHash: 'umeet6xz0xmqvko098v0o5th7asvxrctuqgernmc',
                flowParty: 'udhdwigh4edbod2pgldtbfd40rs3z0orila22hifm5kt8ab4mgsjw5z3ub1gqelebsjy5pdw73lbd6q1dlrlblzm4o3gps9xociakomucfnbd9lefu7vi3qph6o02mcqcsjcvzeisz2m4cu3fzjiek1n2lk0yydx',
                flowReceiverParty: 't76its20cql9f42sjwj161tv7g4ghzn9jsazbi0v1g6pegzuf6df4eaa1y2ebtdqanx4d3yn3odyz0kxiajoll4bdvtkyg092uqrld8859mcqzztb7zglcnr6ehem2je8fjlzuk7l9v2dkd83w5def3gz3cj7vd1',
                flowComponent: 'mg8g166izuo5rxraxzos5i285tekq0fcbxysi0lfitana1vw95o8flika0bzp813fp5uf5f5ipfomd948vl4tzgu2ze0r5nrim68gg06jcwbvwtfjih36qg2ctxhrai4yw2uva8fnne0mi55r8eqk0rbnoodz479',
                flowReceiverComponent: 'ibijh6be730o9lby9m3obr3nz876iuxouwwd4psqx993yg55o43c0invi625iaj45d53oijj282vs7x3eahkwt0ps73s3bkg5qlr8i49quri22pcv5lgjscz7dc7ak89uutoegyaim2k0qnpp5w2tygwucyqg3ql',
                flowInterfaceName: 'g8pwb03ousirubk9t6wwcv39667qs2j2ggvzokatcqqua15rfmos00zu7mfgwihc4dv8jv1yymdfbn0lg2y8bz1skyo2ym04y0fpdp9r1a5p5o03q0jdb1v7n7ky73c6et9ckxfcd3uphdldpqcprp50ubj39tdd',
                flowInterfaceNamespace: 'ijkdz3zgeihagtu00re8nh4auzhr5rsw2r5couoc8dao37b2jez7z6p9cqvywjdjy8tvizb4qjn4guim0nm8g7v4hvfxno19lpvyknunbh6ud5fb66l8eupccpmegz8mpngay4b359mf2zmzs8mkquhfnf9psogr',
                version: 'uthx54ltm74uai90xv9g',
                adapterType: 'a73kz7gnsykyoxbb6370ekkbh0fmotnhuh4kwlx6f4ukkxtet9sdn8eiz9ms',
                direction: 'SENDER',
                transportProtocol: 'if9ktv636dq3649ueq8rny2ks5ypga6jh4z2i32lrmqvjjyiikeoyfizcyl6',
                messageProtocol: '5rzgquzdmiycxzvap3ec6xq6xuc0biducmpw9al2u4hvkoi407g68zdeu5xu',
                adapterEngineName: 'lcl2s7gqg4is28asqwnaxellx7jpumr0x2glxt9iu6fqzvfkcqt8kqu9ge6kdx9asy0o9m6iwzx0vnawaaq5l48lgt5k5niuaz5b2mjioc1fae4j82eyj1c5vdn4cl0eapwq7aw0tluy9b0anlqs0f3kb4mdhkxy',
                url: '07mawvgeh0o7z5f308ibdkp4j4em948wk20ufvim12vnj44kdmadpen47abyuejzbhhcu8gjadhwm8mtevd26i12f6qag90zhknossmx8axzc3wx9kof3kxgqf1rxlfwu7t7ah2uoemx0izrrrx1xqydb57un7pxq4trjqq4hflyfod28c84arcnf4bwz1spcckkphdegk212ppoi1z4hfk5h9b0dwkckfpp29civ83wia50lg1ljmmob0a5qn7a1xrhxagsjifvdzvf41u4uy9830wfixwb22x3fvrphtplkzfct98it4llfh5laa49',
                username: 'zstjd3q15wli5kc9jpayi6x0bzap0qwvlfj2mcfoavshqgfdi0ia8x395ink',
                remoteHost: 'd1a8o8f409osy17xusnm3oyz4g703zv3cjaws429m9n7svw8hpi5fbxa26c71ae7g9ea8z09wmrb4t6skfqg6wrtn7xfw1y6s5mof5f7nkp8he5bwkhov3y3tfu3yqqi4qqemulydz0vmx7dadnz37pbbz5aupgo',
                remotePort: 1092172854,
                directory: 'c26hz729wlkmzpbk9naaoe8l8vgs1nrpk6w14zlk8ls94pvgykfx1dim28vcmjv0nz29ek20gdxaw58hisq3z9n1qqqmnxiyos9ncip57zp0posjkccu64kcjg9qf8mdr2l07ce825l1nuzltkj4lh5cfag0systtacvbrb6v80ye2roa1ucgxmvpffzrxvjx3dw1xkmrs0gf50hhvvkodbnaop772ckfbhr04eturu0ah8b00n4tk07k3r3wx7ny2c8iill11dlajfox9j9432b2h02if9m2xpo3wwxzyvcqlbh6tgdlarf4kdganoqycla5zy2y9gc3duyfme4vw2wfykz6i2wl7xjv83xlv0uizw4y04zb9w7vzrpb4rtq7tbdbiqlibnaf4lklor3l36lttzkd4sj69rhni1uyg0hugphnbmc2i47xfnnuprr0vurb3wexjam56oikbcl7p9ph3kdouw5zwl0xbc59i7o90ex9tzfiz9l4hdiwqd8m4je5dd0f3jhnn852qu20an54c38c556jfvi4pxxfvywzpyz8n15ng0osrs9ti8v6c9q1ib3nqj842768wg6cn6kgazs5uev1odc57duhvsag2no4kpe74abnix49xv7c9og7rzbzxsoy769x4gsb3hisxi2yijzktajhfcs8ms7z22hvcjp5nq4pki24lhhhy0kf3x6m50autuaf95khm0dnmxjl454kian0nss5nu5uxt5a39wmm8rxeijnqxckoajcjnt0bjf6gykz05j5oy1me2emje2knycaglw36u13gtfnh4t71qha67tfgvmv38xamykoyrj0z3fl9k00kzkzjju4z031ga52sa0bw6awt1rdwi4jbe20bwhurptw8zak831uzmb9y3a3b70d63sp30788hsee3gl5tefonb2oocbs6rtx48zb3ki85c02bdlm71vdv64wk7gfhbp21jvg03xmfgpysbvzn50gjokqak8rtphplgisnhh9b',
                fileSchema: 'ajq789rypg8zwzv5tsh5yxh3nfzekakw91umaa8cajjyj3hnujvywt7wy9vfp9ad2ds3va35kd8j2e6hglkazk8aw3oekvkl11lt2nmaw426uhdy8k0pvvfkat02owif7dyz5bsfd7y6906dtzz63h108fpws30l2s2d0fr6dvjwa4aw9h7wt1j32w8dwuasguxbgji1ccokbgu1adn8ibzzavvqochpfxg1ino8geuag932k0ghwdjqiiccj8gqxyhyb7l2jabrh8lluvgr4d00am9w4hcfg1nlnt1md63bbluklqu1aizak3x3esyxkwffxdkswb9f32p0hudadozxl68qpk4bik7wc45qgyrb8z8wc06n146r6oaxmbmzbspr42eaorxr5mnhu5ydbst6lw69lgzf7ya1kf1w5yt67vv0rz85kl5ghu68ieokdukcwuwxc1qti5bdzvv4ivuyqa52y9d9afz7748538gjn99v1s1jut5llltoq3jxtjbqkb8clcndpno8pgi022omsjmbqtcpsjhpjj8befcknvd4rfvmkilqb8xwkiqel53whayqswbg47l4dl71znvvzdgsnaf02btg0zkfjzc064pjonkkxanx5mgr8yoq3jvjtarlvpi5vcws5n5m7e41v8c6g411c8awqyyfl4su1voy6abw1dcjkmsqom1o0w0at43tkpmk59v4mm9k3svgko926lw7kcp41t75n93t3lrkzl3rzgm1f1kgo4mtavzrcj36el7y08af8sws1574bvlfl8q8yb9y1s6d3yilfja2ceycztw7b29z4m5vju6nqhlod2iqom43kvm04t9jwtj8f37l50mi7yxjuwqlg7witx7qn14rrksrk1xqd1s2od1k6tyx0petkyz4cxa171pt0gqjvy042p3mdal8kyarlr62s7l58kw6aji692k2kntnfglvx2z0myxnr0aw5evqs1zu8aumfbxd8b1srk5ti01jmt9mj4jwhnfe',
                proxyHost: 'ofy962fyrprenuafp9kvfykhxcsxlwqbgns79c6xhknvt8unzdx1u7dys3x5',
                proxyPort: 6594903860,
                destination: 'x13vgyhf3ns2r444berzoxfqfzi6kbknazupstvbzukqgf1eobw2ksemvsdwvzs0idq16ddljx0jb4gaomzdd5luvam69ffqu30no95y33h1wn4w3d66mr3rydpof8dor6iliufk871v2m8v1y9escswdcx6ewxq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kdyd30rpaa8gjhneygfo9439pbmzy5s8fas3d17tmzeku0ayu8nyf1af225r9eyujzkbikvibh30edh44v5qbpauan1f8407c79ezc0p96u2f3e1bt1fqdf7aehx4e1brmkya3ikep9qwbfl5ebuoe84xxpz5cui',
                responsibleUserAccountName: 'kdt10ywdzx68ibdxogql',
                lastChangeUserAccount: 'yz8b9ax5zvs5alqx826z',
                lastChangedAt: '2021-05-23 13:52:18',
                riInterfaceName: 'zzzx4ks5ugey9wl4uyzdkb2o1najjzrbi6fqrvdheefn3jobgee6l9ba8arlc12jo9oxpwfw8i7d93ddyxh5rlnaof87fo8cnqwnblag7xxfg2m6uz5f6bi33coaruvullbxcibgewl9nifjy3h8p1mh4vndz4si',
                riInterfaceNamespace: 'z1th3xoyq2n31jnk53g0imwozyafmh50g9nyq96ptxh95zw865g1uyt1nfazhlnxdz2pfina18okqectnl4iini39p0zngir9pmmanc3nf10scfjoaag7e17qnyr5jtdbpxiy1psk7hiqyg7g2z02cv7ligh52dp',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelParty is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '061f7f68-8b8c-4051-a433-9667898c2c7e',
                hash: 'z9xt9vk0bni048x1ivnmvm29hrlvyatxzja5p0vr',
                tenantId: 'fe2b7108-4745-448d-bd43-a8579b2bd69c',
                tenantCode: 'hytvqd16nr5chgp82ia15rjklm1bm8i4lewcf1pbondp9qmq71',
                systemId: '7c9eb42c-cdf9-4ac4-8db1-260a6fa74e48',
                systemName: 'hkcxlv0pynnyarz8zvow',
                party: 'tw9xwdxkdo194ao6qwj6hxn2y3ecc5agmtpaxhwdj1ydh5bm1fn6qg5im1c0p2gb33maq7z5oadss1zlk4orurhhlv64771g0o36lwf3cph87el1o7h2jdj7dgea9t8l9topt46albc7dfsp6ew4d0xwykx2o3ikj',
                component: 't9sem7ynu9peyj552qalt3iplp5nt7m7af37c1d27wtzqe1s0boefgcs8h2e4yjsfx8cm910y0co18x1352u7bbzagbaekpnm00m78mzcic2kqe29vffv056q8vol2pau8259xu1401iuslsmaxhvw3al1gzkmap',
                name: '09uohvsd0wanbpfsmpbz5l1t3dv85u1d5tdbu45h2ljz88psst1o91oc2xbccy3cmaed4loql8tf2dhezqqu81rujdn58y0inlpsy4bn9nethyfgp8qjfedzsb37xs4olczuhev1q3e9uiyu2l80rjzp9mxbafxg',
                flowHash: 'n1rtsivfhfszrhe88m6iqj8ms2m39vw1pi5rxjme',
                flowParty: 'mfyt6e8ej5h1h836m0edeu1tp5tecjvze12deh2nbmayvu0wt14w4pms477q1iol7tdaqu7y1rerwqf0d9g0vn1crfwj4uc3gbqjs0326oymmfmrzt07f1ja49hk0w4l8dv1ikslaqs6fgfwcqkr6j1xa03qjbls',
                flowReceiverParty: 'nrqf8q5yli3hu9ml53r8rnqxz2u4lru8qf6zsf7wpbjjnaq9jnp0wyohf1k8ikz1hwykow99zbmm5m6ox1fym2e4nbyqyvjrmgsiebj52nqhxkg2jfb8l35fdzggxklt84twla7xoekugfdvv4pnj9teuhpsgcnu',
                flowComponent: 'goi3h8zfgubrrf1fjjp1do6oay9p24jc5a7tehmuo7vx0407sd0mfytoq0010zks1q4a6hrho0czid1a944obd9hiz0j8t2r8bv5liefq2y9mxzfzg0lwho95eabvfv6if6nm0dcrn3ssclkrdwwumfw09adxmxz',
                flowReceiverComponent: 'znpsv1xkw8zsq3kqxz3xdg6a32o8v7j0vhtgih6s39xhpneb5kmehyxgyprl7evmkjun1ceq2clwenye22agc66yg867w7gq10rjb13qtvabd6srtkz28l9461qzb3s4uladx8wlrg39otke0fjwn7b1wj70iuxv',
                flowInterfaceName: '8k2rfk3i1bdghlh79lly0q5q40ylbmmwb2atj6e0e2mev4lyjddc534pgfnhg9kb8azkvtk9nc4euc4h85z0oh7ghucz557sa1f6f1xuwhxxqv2bead3imefeitr9z8kyfpef69gdr6seorxidvt2ln84f1dojke',
                flowInterfaceNamespace: '4eg18v25lvcq81cmiupeandr5oa4uwj2umudj68aqt2dwp2u4eolvsxextvwbxh43gvmsv5xfe2j6dx3u2addqa588lvdfqm83w1hfvjjku2gbndx1l120susnud1y2cu8wi949tz9gjjp5dgf0hqhabzl3xc1ps',
                version: 'v3tfqtjay4omm316shc0',
                adapterType: 'xt3ad5rebybu5xy1s283plnw5v92rxkzkubwskrcjn992yv7uaa91cjx6nkg',
                direction: 'SENDER',
                transportProtocol: 'waw67mc4lyn1qrun78cbnlfv5i2amxlrqtbt7iv8jezeqfjclyhj91g8589b',
                messageProtocol: 'zhiw4fg4qsxzzhkvuy7m30lza1ooech1aucu10om1qzk5utkdiu49oh4knql',
                adapterEngineName: 'rplladc0e4299cncbg9fvsw3h4h7wpicfkb3e5hxh4sg0chstq1e2czd9lel69bal4n7bbrnwhyf80vbnsbut0v2jh80mldcqm9wf1norbr0ykftoyqtg2zhqls5dlz4sf7h06koo7q5bglj4l1sakmr3vplfr94',
                url: '0j6twxyzbf5jawp1k1c9dryt6mqza11hkhztjojm8m4lmx6nzmg6v096ticvm569f9lp0def0k5qkdfyr9wts7ovx9xnrrb030ifq48jp4c1hc4o3pep2v2bjnq4rb13omaa8qx0kbt906tr4a3cf6bf2vaf2bn1iyl0v89h7ad3wahspb1z25qih22cwof7fz9tnwyvkllzlgf4lrldutwlx1ptbpmqy9onsoqudg9vupe5r71nxhqtw8h6jrge36h4t4a8bwmlogkqfxisekntht0lykyluahkc4jvfgoo33sf1s7yjzqxtclfu9qr',
                username: 'b6meh5dsndukbcssmm6fcoj2leh35thdhxsqz3qzokfzse1q169qieph0mpx',
                remoteHost: 'u4hifktqrcx4bxjrs1w4opgu3euehdfkfdjonuz3a2a77cyhvax31ce9iama1a1k04sahn5qyhoh6nmzeswadbg1jxhrwhgv2eevozp3j68ekn153lyn1ig9lckitadlbyex5unnlwbog2meye5tzo2x69488hfu',
                remotePort: 3187917153,
                directory: 'raot4ejv2wh2lct56usakieqgbcmmfgymfcsuuqvzp2shi5n6dvedq0t3iu0imvhol4ls5wnvv867xdexyfsp8tf9qpk349bk94q7edpg4wkejtrs02ef8dco3l1943j695x4nxz0mru7y8ub2y7a1lf0i0fb08isuejw462ds7or6fige7xqbvdkm2us1su6v5a2upma2pkng0bpew484n90j2t77yxk1o59h0hga35vp0h1zyjm99x1q2gien7vkh6wl2px4cpczspjwnw037oo7se1ehpm4873ert15yzc1xrrtuqn8q7m6y37pmt5yy17t6pfbqu2sa9jxenhck2kp9z5odntpvn6utbq946fzex4kb9rkywbhxscspf5fmou35ednbi9ud3njniia3x0f7x5jnfgf4wsm0xsycvg5lp5lzhhqyhen4gniyc77dcnunt75em7bnrgwozqpjaizzcww8zn8sxbukyc8h5t328zii7ij8mnij40ydl8pvpheu7slbhr9y7m7wz7k6w53hwu1hzisfxea450r35i4zki56o8yxo363fxqg2f90gkav3d0mrs6otuu16217vxlc4m5mi5nklafswmlwult1hbi2arq7bw1xecdqh1oixbj6ooj5bx0m1ktjzyopgz72f3g8ktqngnt1um2firr3j4o3jfw0z098inoi8u4jzcxc1a0y2hi4aagjz6mpjeuh1mhklpo199opwtn42t1520qks3crep09ultbpxlchnnm5ji3s9q60kfsbyvyklsy487ymsy7kgmam9shrmvsq62ytdyi8o86w9fk3wz7u1vhorkv7zzlecd84nbdfxqnvvsna8i79tbom776087hsn0q8jp5bajj5avk1ryxyw0h6ux6t8avjsak83giodsqftfxsyrctf6h5pcszcmp1t2gh7m3ps9lhlmrnkmv0mpb41u770m49pt1q9qy82bjuohcgpbp2ki3dqj2d0h9gfrwt35ton4mzowjt',
                fileSchema: 'a49rt8w5s8qcnisic5f9i9jn598rmd04guurmpekoej7d7rjxptdo3mjai07s7shfy5mrk5oej54mh6bvmwspkm6rzuaednlix41u3pewpgll1l3xhnjqq79jffojpjimdnj0c978f4urj4ylwqlhbx5j3veb7w9xnvfhuzk94dhawbioa95hsrkufo08238ibjc7f62vr764anrzaimb1z11x1ket5y106bhp9n688cf4ghrafp6msbalajy8trn3mubbzjd75alr993646mh81wyxj5okl14pq0r6tae4g1r7hgzem05gmmiz11m2lyov5mhp21k7y5lvzf7q1oe4lumrb1seb26081ejx58hvuqdjhmv6p3tjcxdfrhpe6uewq7clgfs1ik87daihpz9hmjnma4f18jfrysrokx5ydk96kj5hys74j67jsy0ktqpp1reww6oopov5iaz086jjc7kvqcz1qnhsh2dtoows89soaupngli0jao1ggchv72sv0dt727y42amiubult3ix81ze1k4hz2xwx6wwe6t5alpittj9e11q7l541k90bw2issj0f9mgir4svfr3mydh7pc5pz524exavfli9z6s55lbdbdy5clvlxopofgt8gmfz7bjegcc4i1oftsqvpioyfme4cxnih5ci2jwholg7u1w4gqh42srn2jy950nfbl5d3g9em9mo00j8ipeoqu3370i60ofiit60d9cy3aq1aw4tg3pilq8crdz6bvxwumrqk59ss3y9bis3ow8m0k6hsb59281pqsozmi1hjxd7jyltowhfxut521q3eom7o4lpfgmdzisjivuxm9y8rel7k6235cr2akfp1x142l8n8za439vxprnb0lomwajgv0qb1sufgdyfo4iaxsfkpes3v49xk3jxi498m68bumvb397k0863gk1aa2hprslu6b5v99f6kt0lcpvvh2m73vrkkml5afs3no1ooqmup37sc0cvk5wxe97laxwn90',
                proxyHost: 't1127gkqghxhyd9g43st8fd3abi6463wcuw6brg9yb8r18q983qljhz6ke9a',
                proxyPort: 9490898664,
                destination: 'izkkpjb3t1ojc6tg5it92s2dvks2z7olal1ytq181ps22jz9h88skffvhigp6d42g4g5ot3qwr8ofest13pr5f0il3m7u2t76n02tlzxangrkcm9b11pelr1s43t5ugn22shv0r4iwg1ldrfkpff8en50pphwokk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7y3xmlf8557k9f2o4j36o9lyp6qikkbkrion19lj361f5o1k997swi9l5dbaq6f8dr3shzs9v8guxjkgr1ayvzzs0xkduva5vjhdvv4wwo778yl0a9mo5gaoarqkd3og5hbtf4bhng9mc01wgybs8gyczm1793dt',
                responsibleUserAccountName: '3uvk4iz6t8suiiuzwdqo',
                lastChangeUserAccount: 'ithxhyayx21buhs8zs38',
                lastChangedAt: '2021-05-23 09:27:28',
                riInterfaceName: '0syxgcxvf4la5xt3vmw7oa6bwxb7eerwnzwrslqou9b5di2h4xioiw2mkcoq9s6lgc7whm1yvs8g89hw3047yge2k8k7uhy2s739bvlqevwmdbxy4iq678htj0f4vbjdp76rqr5vd44yjiajrhq0ionf951qdam4',
                riInterfaceNamespace: 'w48jvkoskaim2lexfld1egnb3yuqsycx3eqpv4c07pc9twa5365v36n0duq6d5f5itvvu1etgxq31ub78xkdfwl7voeiwja0lzh5lgkueqyrmor5clg35bs9ti62z1zppoqwuyryiq9esoznl9y07xnglz1q6sfu',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelParty is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelComponent is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '230ede3e-f591-4814-aab5-9b4106e31cd8',
                hash: 'mbwtnwvfr7tp1vmexmfokbnph59s5emm5mtkifm0',
                tenantId: '86ffedae-fc55-4526-a8cf-899e4c9e273d',
                tenantCode: 'othzjqq22x211jd29fli4ty7b0infqa9jr09e3loccs54pn1or',
                systemId: '8cad396c-eca0-487f-8400-9282623f01b7',
                systemName: 'lrloui95l3ap023b0ngp',
                party: '3oykjqa1dswtuhm08t3b58mrgi02xrhx8jkzvkut2xoq53mzqgmo602kf6xcoku2dx934imbshsg5tpqbo275c075dgos1u7810fujpqbbeupl3cp5baeweom99e99rba3tfw4dz4ar3hljkisx0aa93w8zrspiq',
                component: 'hszl6r4hbsoj9in5bg7amkgjdyq33tak0lksnkmah10pbpi1stpfommslx4mk6pzpmjrw72azzc7xxq1p7iyslfj66sduvallpfhfvgo4kg8bs15pzql9mtf6yxnzxj5mju97s7nmuvvej0ym106dvek5np9y6l69',
                name: '6d7kektssuajhkmurr8kgz41hm12i1hzo7jjjmgcsdz0tzcmbfd0spcpcreonvcosi91otadm7yy5hyqfi0va5bnkueco84d57rkftn08yy3eiq943hbi1pq0wchi30lgrveduv7jc0sxkcqq2vxvwpaklpq3shh',
                flowHash: '3uxg3cn50oty84xeco7c27mbcxvmd90vv6jg9mlm',
                flowParty: 'qamk235allm7k0he8zabykkyinrapbf7ihasz5budz6kkwrzbfkwi4xlfok2pl8pk7sifma264kxgwf1a07oiq5s6y2gw3ecgh5zw7516o7cyuijkvw4lyectidn1o4ep3rdbv6mju460qmfi1d4kijf6mpnoyu3',
                flowReceiverParty: '77ms2vzzrf5ou7ujplnmil6dkfrr8n94py96hcwlephg3l7935v13szop8zlpd4mve09tcf9a5sgvg54en35lrzo4psbyhl3stiognso99qwpndarbl167131x11347pki664kdwn0t9ddvc9pu8dnief01g0b49',
                flowComponent: 'pm6oyqlnh56rvq6cf02i8rswr1036c8eu5phlsuew3mcl0z9qlrcj7q2lk04b6osk2geclr1vfzvol5weg3xthmz1oukodaey9hy6keb487pb59cgy4osdmm8ivq9oo1ohv6hkg57fcrjp98jtr92ugn35nkh3k0',
                flowReceiverComponent: '85byyept77t5tnf6kxx5736l4pnx4ot6e4iv6nmo91smxdlfx8ibl71zbkjnseg7ppt5lzj2x4oyez2689n36ncuhf9uydw0pnf61fh522d780wqevqbt07xdpp19unypswwdts1atzfah9fd4v0hecjavu0xyxw',
                flowInterfaceName: 'bjf44kbe9eim6yeqo79xg7mnme155u57yglzrtai4bjweb6ni4nh2fn6c5fm31h9lc03m3da36mh7wzqd8zwgmlxcz6v0nknzttztn0dd9b1ewwfrlk8nibkc6sgg6k54itpxeb7430awk4e9x5077n7e7lpc4eh',
                flowInterfaceNamespace: '9rvk0d0js59onkxizzmpn3j092b5q32ue6kr9fiy8o6idyheq0d3m8atmmwdlxdapbd1fzdyst4c0z61dp185pps4lddyvnkowywcrwm46iwof05nensw7q58hb89yew577bz6kwgndgsltr9f617ynp7ozfoify',
                version: 'lyjp13xmog085w4i4kto',
                adapterType: 'dvohcoxhn9sjjdcpgljnpx69dlrn8tvbg4vlahgiock1uv856re2u56f8r0h',
                direction: 'SENDER',
                transportProtocol: 'ozxp7ze1isfnzovydj7ysdzni9f9x2vm5oir3de085ozc8vm2w2oran3jui3',
                messageProtocol: 'lgef8w5dia884lw9dlgwgi8zuxm867qmv1tmrkcunyjv5leons8zw7bp68vy',
                adapterEngineName: '089v7jg79j19oz4bpqi75gh3a1brs3a0nsbbil5tvpssb70m07244y3n2wu0257gcmdr5umtdh3jce64n576gwgf5i5r1v4pdkr3bcve0kpot3lzfdsopnbb9779th83064kn8ouqck6t4z0lj9qq8vytqeegu3j',
                url: 'h1rqn3awnn0bflax7ndxexdsrk5uwsygctff92qmlmcl11jb9fa7i7wsgqj0i5c7jsbr8a0hfnnqzhz9xrjp6228dsghs6rdp48z110b4v8po54qanu38jaer9eyb1nmy8ly7fet9vfuur6zkscdmcj0sizd79zdfvejotxifmwutt5yis8e6upv5jkgc1jnlfcpi4gh9xf59loypomtqipm2r60fj0zrbggjref5qxpacao1bx9tyjvqnsh0ct5pf56j5o9oo4ibcr6wtn3d4tsek8bwgxxqs3wk51vnl4eoza52r3wltc32tni88lk',
                username: 'w1625vr7jck3lx9ouofsnnm4y8bquwfa8m1fr0ykzemvua1uieo5s8d0semx',
                remoteHost: 'm3o3l5sd2qp4vgn8637l0kpwgy2hm3zgieym7t2fe6eglslb2b2nph0fhk738d1rf8ij0mcqxxgpys4lqkb1j60zy5mjc3beucc359h91c60rssxz2ik9s8wbtkqfp4vz2lqdafpaqhsexpr26ydutzyul6la9vh',
                remotePort: 1420698359,
                directory: 'qs1hlx49dzvqb6ejeljf7uiic77qmhmqiqk1frul6ha7wksk17mg8xjkzheho820mu8fmxjygdsjulk8mgqquj8g72b880hexis5hrcnvc2tvlssx92wrfbhoi674011hu1mpy1plg21sncgm586pnzanqdlxe7qxbvzmdg0le8ewxfm6b4f5fjqm6njtihn5dwe55xugvgqsmilrfx6ken794bbykgpe84otrk5y03tzsrrbnlx0j6ojqqq0ui5g06uy9i89xnpzdgvelfppbtvrczw41czbv8ttfdg2x4pcf4s5euep1nr9vz8kmcsxif148q92xg459iepjnats9f91ro7pjubqyhw531st1axn3xdfuryx336fsoviz4wswrmfzuamqeskzaz4ifmu4wffxzwj9ws04mq0apnza67l7i964vpe39l15rhv3g9tkw21b34xngww61659rydzuqos6g5v2x88up7fwv2jckib20myiq91o4l3uleze5kit7ljde88jdkbho4adtkwkuui7sjakqye0s4wqdqxbyvi5x4r5dz5952oz1nmauvoo4wyddpd566zt8t6gern00s7h638u9tctr50j4oga4dzw4goj5b3f3bhx9kfplkt8p9qn5uz7wpo4kx7pijupsndlykkm81r88bekx2r521qu4fyppcoznrhy6ycy3vm4jy0h77lqezmchgqewj0f5nmyvlmqqjfku0sy1x1uk0l1160bmhjmedpkbwgkw8llcbn1tf001ubx2ltbgnwkatufyrct8nsqzvbaqgfmt24m7ueus2nsauqbtapy4p3y28tnppmde2yf64wcynfkx2ixkgl6j0w8xdgr8v1z750ueg7n8i7m2v9q1j49634vc2gtk4na45ho7acjzd70kswskckd8pjeejpu9azma89xqlv7fvindtiu4nb49pmcv8ui72ku0w1mukhord8mi2bkj2s7xia1qx6ir7v6b3ghcte2n3n706a5yi3g',
                fileSchema: 'rkgor05yxnnhmvby22anp63ggarces684hsl9h7xt1n4msm18ay42wz2aasbznctzfec7d0qjbzupb1owsv1q4v3alwjdwf85by2w1j1i1vazlj0unsqtcltf0hvavffufyqenck4njf86tcx68oka0y7809ygdj95f3euf3e9ezi8xqm64m8jz18v02o9lg9bhc454z66sfc6emi9hwpu8rd6ojpff43jqyhcdcwdut460xf1wwl1w8aupy66vk56qgep35gufn73mknb30nq8oy234wrus12og2pavu9vmlcdhkc4ol0ljzlpetqo7nn3r1smemo8e8u837epcu5jc2om4yc7369v988ty6dk05pqeahakgz53k9o74q6c2wi4o6is1i9ii2huzn28fbneb7zd7niwtq5lk3s8m3g86s9tgs6i8sstucn11v452jnlpdkpihgfhu12a08ypi4omvseuknpzqg6vntcoi11iprl93ktkc14jcnfynhgsw5gabaw0pqpf18qmwvbap9qmx8j2jsmdhkba84bn327b16ttf9mvgoh9okzoh2zua63yxwpcbrk7ulovyngzywc3ql0m58ud1u7en4ddl5wbr2umrgj7n43vs4gacpdnv5dh5lhnlbsjroyv97shwcxaapkeqs23me7zs81o6y9ntg18lstllc4a7e969zxe8bhirrifup9ucr6136pctm1gwfnjuo6qc51sg1mcksco5hibgomsdrci6z6y1t7zil5chvs2kzrod67bd3q1jv6cunai3rjd0aqtektyy3liaowtg5hzoz4qmej9r0w6jdic5ovag8242tcezk33tqj4r9lpm9u7ejtoksk1th7cix5ss5xgwmpihz1e6mzex8nl70eb4i5kjmasvqijqnpn90hz6roh89q20hfkb5cvu7kovfttzg3d44s9s0ndzmmtnc20w1x0uclgkrtmlfdxfjrnsnmidq3v3wsxilv2j9tqavhcynzfjqmh3p9',
                proxyHost: 'ex1jkkh8n99emv1h4q1ofzhf3ysm52iu2qipep4a7jm9apfperdis7ch2reu',
                proxyPort: 5661140647,
                destination: 'e6j9erq2p0mqwlqqe0b0mb4hbcbk9aiwyilgpe7dazclzi361z5nmkliwt7wx01hgyt4n67k7meec77ml9d6jmubxb92rwzv8qhqu5n9xfml6yiowg1ga70r7gcpoi6n869091fzo6imyib0uray8r5qxvuu3qpt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gguohqobvg2twdm3anfplq1wfhg8a0jjn3wwqlor2lyp3u3ls5rz3bhbzl6njuhk8jstpw6erkk9w0uvhki0z7ibrejeyo7xormr5kr5mnx3q51f8sagi0civs0owsnxp8uzv18xgg4b95i7lsbtykifxua6c9x8',
                responsibleUserAccountName: 'tz8dqg76b96wd6l569kb',
                lastChangeUserAccount: '77u9ytzaiy19oy8jeetu',
                lastChangedAt: '2021-05-23 04:26:33',
                riInterfaceName: '6kbrftz09up8qmfpoocz0s0dqoxpzus506ys2uwbkoqw5ieipzi6kyxru1ckrzkaofc610ekjpfg80axzjy0s1exaz1z6m1ifmwlbl7eitjzeez83u8u4afcmzxl4dnhlpk7evhnnhq7xy7ad9kiu22bzvttj97e',
                riInterfaceNamespace: 'ia1lip3aqkoulqz5c2toysx1x7h8ukmtkk8pbckgf3m5nv4wp1kre9urlsvebwj23ophrqn8ah1ejump1p2u5s8jmia3nhgwezp8oh8szcuj7rug8huybpy18tqbio0846s0ys7tsyvou7swkwwdvhjk1ss20cqt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelComponent is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelName is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '334eec66-e61e-42f2-8014-8a46b49e6f40',
                hash: '37wwygrxwq93mw0w2o2byprmhx91nvvo8g93s4vi',
                tenantId: '3ed4826a-ce24-4f86-bd5c-8d74b543acf6',
                tenantCode: 'd8z8hdwxsck3ejs1wea87dgjimtiqz380px3wikl7xkmiaprjz',
                systemId: 'f29fa1c7-9cbe-4150-9a60-d1e6a7c6dfd2',
                systemName: 'fkq61oedic336sawfl85',
                party: '4tzqha46camcuc0607ywivdp9xokog0unpckj8a78hejpyezr0ai6fa77su06cxxatit412uvaozkhii2rnn2glwbbbuype8bdgo3qo8s6mtkp5jp4tmo4s387htyh40sf29por3us4wg7xu90gbt8ab1puxctyg',
                component: 'v277vulvt4j74u6498cq1eklshrgp6u3dvhuug5y6q830j7jhamyro2l4gpfw55djjuxxnxv5z476k4x86ls34oqxmtx0gwhef27hhc4gpcm7lxocgvudj7y9afdngkcomh9a9gku5b2wj84t3rxyloj9q16rp9p',
                name: '3zd4nf6eong2vxshocl7mwscvcwn2ba4ltln1nxn36lzufijlbp625bfpq398er77bieqluwz9o9jnwnyymlnt195cklw2wv2ez89ya91rofpuldfuk5f1juz93qnnb0df9m4n0vemfi74ujak6j2o7uicgz99g2i',
                flowHash: '3t31t74kgvenfou0elqe96p03mxy3ih85cussarn',
                flowParty: 't1mrgd1m9ju3lrv4wog8fna6blof67o8e6gus6smjoqlhqfcdougi99pkh47mm1zrbtx482lqkjkpc065l7l7okv5wvq5npgfe6jhlecyk3dehmhz06ihettz34cm732cu1bhdkrnv48b1gwvp78qsnnrl8ims0l',
                flowReceiverParty: 'p2yjr5mo8f5v9gxup6goo5l7djs3x7peeih5wr36cq6of95lepm59qzbjfvkvamfs8f3m3cgq1i3liuh4bozko4ndzyfcpnlh0l3ym5pye64ymn2ze2tinyhn0hh4vbq02gw2t1drofanfty8ap4yoh7fvdlwc5z',
                flowComponent: '4rz1a3h5iho8nam2qeb65ykdg84pn4gudfdgrzejb1dpztnny1qa8g62xm9mhqx246jjo5c0s9630da32l1m6nnurg775uypcdu8ggkdd1uf20fonjajynlrf41ek8zh8gl9rgydsqhim3mx6je5p572om5cpvyc',
                flowReceiverComponent: 'x5i2reo86mr1lzwawbpwgwrkjsheydj0jimb2gi61fnvn3jxajxcr12w88muoet9yiq26ll6cmrrfzyb965srrjvvk5lmxr0dxjyhh657epd71g5f36uakc7ye1ob5ol9g8mv704bpvgrdq1q0bbr3u6ovgscdhh',
                flowInterfaceName: 'w98sckdcpnfkcahr9b2eeaul2z313ubdq8bk2d4r6vcizgf72bdy1lt6skqdydx6uw231wobhfxfwly2d7m65i7mlg70i78nvkzqgrfnytq4ba9yo4962ohhuvaz5yickwdtzelpzvg0rres7e6s025jvsco8qn7',
                flowInterfaceNamespace: 'q7ikljyng6zw4fnujo1dm75zecjxxiq0hobp0u45t5k1zakwp0g3uxumazvj7buarq27n2i4mlkb1ov92pjvy9bqx2w2whn97qw9vf2n94bs94chqpcvhbncxqlb6k4wz36b0mcnrbk1g9rl08yjxge4wd5ln36p',
                version: 'q36fpdl2l4hiu2pot65f',
                adapterType: 'jqq5drx5w74w7ckoqbmnalo7g2yefcsfavwha7ly37xssdg3s04t9j26ptu4',
                direction: 'SENDER',
                transportProtocol: '82af7uzb8ncnbw5jlmlz5fbrt3en7u1ol3am8iikduya788jgjw19iptv7qa',
                messageProtocol: 'luam1qaz5q2k8r2gy21ddv5w1octx5a2u8qmdk81lqfriv2d13dmbulj5gex',
                adapterEngineName: 'rdtiqmh8t6kr6tnzbcj9az7to7zmkjn543i3wm66ax0xdi8kjioc419inzuh6aay56fjlfiufu6yo6c21jqtuhdisr8hlzy0s2hi9zz8wjn9s51p692fq6vvi96gx24d1qb4eg6uuum6u91cgv1e611s7hwdef84',
                url: '0o48lvi3espo8n2u2kekdrc8pjloq8xy7243hbw9ukez6v2by5ucs9y15bnxgupmhgzzwnodhgicculynzrfpq1cwfpbef4usohwl5oej05a9msb7y7dz1vtnulr48og0kiz8ji32gc21ea0530eye8tw0va2jr3rlbhdyizeh3pbjknngjqmsz493v1doe5priquy5z1jzg7dfra65z92o8mx1bih2bwfhl2r3us8gl3od0dp5zu0v7goh121midgxwpz66jcnlc4ty0tse3t1hcjjsr4v9t4qy8jmk1piwlj5urqsnv3d764l8n4b5',
                username: 'jowd3lprcnt2ebwkqbsadn86fggkbbk3hl66lgb4zjvk2rho8sfwy9p7ws51',
                remoteHost: 'c0p0nbuj81ikpfvch6s27kd9rwciy1u96lnqy23b5ns9c61wl5vokqfbv3nq8szsfcm48ho2jzw8y1lh5k1qcomckapbz5j21tbgxpbrr3pi0g7ocrjymmcl0x3kumiote4acbpa1cz9lhkyvhukfp893aiyiac4',
                remotePort: 7852728145,
                directory: '5hz3f96mdqn6kzhw39huk6nio6j7o0pj4smuw8xl25m11trx8vtu8m3d1c1i170t10qkyaqbskpn8wo068qfsp7yfk0nnn2n2n3rqqntwgdvm2lgghhjsd53yallaoxtz5gqdpfx6cthsmrhpgybesgoz0mrwugkxyjbhhx18vwz40u430g54v4l0s60qfkbydz7r3pzbapguxovs2gb8l0jrl98jl90vx9nmmvbnfvvkzlpxkpyw7czkhth7vb77uiejai1b6c7qknd34vcpyw8i884ft153s6srng5gviy2ihj53zcd55w20zj7fwvkx0jjfkshgtr11ncyawgo3762veuxbybppths3hvi68ou56dr0oyc0bhkpxl87mg5j6ts6uw5kubpgihq6j38vjcws5msskco9e087472eg1wsdi42x2uq1x4z9f3tw4blb4oei9ym5o7i4mafznf50eq8cfijwhuhxx97rek7yske3da5lvmh1kzckik6nb1k4ozru38z624z6yotwdx1t0w9rgtoflj1097jp3hn1tpciuxi1e68sbss22rgypvrafz6dl4oqarglu9egsaw6lrw54zy81bsxxo46fb11re9bf39jncr5yudpjqw51v5ze6u5icx4p173j3m6nbtodsg1i8ad2fs69fd2j347m3uuzrbfip8f9rnpiwzsm23cu6wz54cwtv0f2qzsh6c0aakor29kn465gnfo52h7s9ww8ehzxlzszawg8zh0xgfdx19j5vuthgcchqbhxs8tx9iwyrvg1rpmlx9rkxyf67sjt6hx1awirnbvrhzp51glyeqc4s6f1o6bw3729f6vvsa1ek947vnq4i8kpchs117sbq98c9j852tqxzlcu1crnn2cwfs3h7qtdg19t1yfsitbnau4bng6w1xk14gsduy1eh3t53vjttp4gj87p0bxkir3c02aav60qku110mop6ypbl48s31smszr292h8qjz5qojeb17d8el21h90',
                fileSchema: 'fcdb1y9wcqefdrgqv0mc06jzfm9hp8gz9wuev8pwba1xape7kw4no1dksbc17mo8kypf84cqgbkm1tno1nbmzeawmlx2veiqdmc5w0ofwppjtuh3lz1x89qf3eflh84oi8fpfpu9adr33screg0qzcqg6x1y4y58c3xwn0uvyf5z7qxw1btnpialr8pswduwj8pyxyz4hq8rav442f8dv5fqhs2ft25jsuftlb80ir8qdm2jbr5q6gd72livx4196nmywp7t5wfqjn2oxv8ligvy4pt1sdjrksvu19xe0xrf0ndes45i73tf9ekgvld2zlwxv5b5gvf2xs3ead0kiwqfrltl802x4zpsi1szd6wxt94fp73ewcr9zwu3la90r0iemsk9utg1cw0oycrpfeht6zrnz67gf0t7npipo6br0if87rysu0b7tiiwkvhfb9fsf3mz81vrl5mxymxt7b5re6l3oqoq52gbywcx9bq2um93y1v2bdhpar7ayr2p3omyvfsr1ocy7k3savu0ryovcsfnf1pxb7ew167903s258sanl52ijkj65fgpfpdl5knik1r709ys0dzq5xpfqt65mk9s7jdea9gnyusz8qapbxhbwzgcdyjyh1t1om21x42teph67r7iulrtbrjnbn0vuhzz781pqb5jabrnrtwlo1cc3m9dj0xjg56uh3rwfulhbgdl1giq7jso0q19cjafbud997jmch5fkc2c870izw2uctbll187vhyy7s61lrgsvadfnyp4ve7er75i3yesquov3xqluha163x8l1jgpsfgpoc3ruuhmigdclvk8irzk784adtds10tomtgs1p32fjqbhlzwczcofp6ulay0qi6v9bk68m60j8qqtnl364efiwpu7o6k7crip2hpvlzdlqfuw7vv56inguvukckx7628oasurgz7lzrcwbmbwwqxbilx5oo4tbkxcl9px1anpxp63qutchkqit5kvc4pczb4y0tskw8fooup68',
                proxyHost: '9acg46cqh4zr0upfdcqphjcysbp6f2xmy3r20as38zuacoig6vkpqn7k1v8w',
                proxyPort: 7539360867,
                destination: 'jsbr3qbpkw4bezmaaj8aehdduzzwp3huougumovirdg9ruugd2wxgmnu0tc3shrk5u789xmig4uxvzk813k61nlit2ornspbfuke6rgrzt4c2a89aitzk3unme036ushtmqkycl5ic6pv66c2duzm1b0f9okijyu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'a2psk5tnh69kkcztcrrar57s6hz6afu4m4bk3sk34h5ewixm72gl0rj2z9p4tw3an0yeoeizd2ueebbttyp5uu83ry71ry4z5jzvwmofogjolnlko4ko9gbq99n1ikznixhgxqasw6yvdpiz7g7sy954tv8uqb1p',
                responsibleUserAccountName: 'ztqc7c6untycqh3a4mgw',
                lastChangeUserAccount: 'pwnpigwzhdgjysod0ol2',
                lastChangedAt: '2021-05-23 02:03:39',
                riInterfaceName: 'n1l8lg2z5cze0pjekwd43ludvw8wqe0hih2nvlyun5m4ytkcz16sa3veb90cti62uh5s9toupz24vsoy2lz5j40qkszccy4mkcoozfsw4n3n07zjbfb1chq7uurzwbc3ugawu6dfbkiw2x470nh1ol89r1oxngw3',
                riInterfaceNamespace: '62kssdv7rjf8qir3d2cdvkcm9d2v0jnkevl2mrcsnpe81xck7asnw0t8l3jgy1f9wr07f2urx7q2rt5pxy97gn9rspbk8pwcgcigppt57jwlzep6xezvr2nurlow5fsfxu3dqcdoroc4t6l6kwyzw12sfb1wjkwl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowParty is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1c3517fd-1e71-43d5-aa86-b8918e4801fb',
                hash: 'ekbvbgk0cyv571mk8ajjbmmj90xbflv2o5kniar1',
                tenantId: 'c91851f9-3b2b-4f80-a8cd-e6ff2d1e98d5',
                tenantCode: '57t6im7io4g0xgodd435afdahlb7ed3nq56zvx59t1wrgnkwvu',
                systemId: 'ba8b08b9-9f3b-4008-93f3-dedbba9195eb',
                systemName: 'ihkmgwhqndh2ybtaxm7b',
                party: '5nf25izknp02t64dwjhdbd7ijwcfvkp87w5k10d21mkia99ht73w728g6mi8cp94f0c87tow553yb0qybjmnobnkgzdvnb6kcdg28l0cxb35gk4mw46str58qb9qjr6rylasnph8n63h0qorbvmx888pwuyc0fev',
                component: 'ecenvfcla7mhlvbxf886ru10ya7arh11c4d5tbs5422gjtyyj32qsdipucmevtb2swf4hsqdxzzxncr91uj7k60l3yk1zjwkuwptcvofx05lp80twz8rhrf5xfnq8vuk4swunvvk4iu6ekiiidxa32ew4ywf0pq7',
                name: '67wekwbv406bgjspokozxyygr2ll1cn08av8ushzwotgzkw2dv08vndcqpelde31h9gq1snmwgytqj2rmxwmfgejyholkagfz647bf7vtfs9p58q956hbypd6a37i4s45kz3ijfhqeyn5nmu2krug0r3f6v62e8m',
                flowHash: '94vuw32gmodz9mh2bqefbahja3e1joqg0yijfpmf',
                flowParty: '5bvzqjtg87w2lks27wzzmn3gm4jxdu06q9s77knwzch1f1j4clsttrtsok6ol4i6n3e1ah95bxst7ajkg3cyrbg9k153zix8r8bec1heiaatphio5ryzcdlu46o5ulrik12s3s5xbccb3n9yc7z32kkwggqgzx7m0',
                flowReceiverParty: '68gtpypjub2hquu5n4tvohvj6hdqte62owjkndjn3lmgu7ghd90ebw5nrwiygbo7xi6lpfef51m15e2wp0llt1mhun9ia28iho5lkulv9t7c71zj28emjqnub54nys2ko17tlk15kuuxy4li7xl0cskh522kl326',
                flowComponent: 'ouu4wcgi9q9qwjqkn5rtnlwc9gflpjy8ox59blz7ac7qk11iuhmil0o5dmfuy582w597eb7wpdd6l73zn0k2kqi1rt05tzkv6wjszkm5kb0kdzfnm0e7xjwnq1euucgmszg9i6urzx7cp1ad0gokmgr969lof6ic',
                flowReceiverComponent: 'wei6rsobu43u8js71x2v4yhnfiwaepywkp23beiqlszx8jmzyzuqsumuestnt75qt3nu8fmnow04mgsrltzu4gl8xde37kip3waa2f79bwvhnq2cxssaactv8r30kvf29o79e9z7drv8yig108og915hcopl3nag',
                flowInterfaceName: 'e7oqr3v0ot1w6tlwft3fq8859dgfchqcf6hichqgtrz1qa8g5ccmrriq215s4c9ri4osissq3l996j8gfrho88n3pm0azuu61pfpgxxa8ye0zftzeey59tl2rllygg1n6zof6j8pr6zi5ckrxzlm2i546cqfuh4a',
                flowInterfaceNamespace: 'o8xbze962ejige858h5gdozmcneyefeud1iubh8b6ul0ttbnmsq6cj8127bisgy2j2aw38f9qlu4cgwnwdf9l4184hsbcn0xb782r1wqmnbe2uwaz40bbipnmybr1ct1cizwvdb7g1illhxzuyz31edo4sodqcia',
                version: 'of545kzq1rudxgipakfp',
                adapterType: 'q0irzlhfj8bh6qtu0a3ufgxl86bo57j3j7uui0wl2cnq9iuchc87h2ndibcd',
                direction: 'SENDER',
                transportProtocol: 'fo3w0rk1csadeltto6bv926gbg346cwdnmdim8re9ujyf29i49lkvvf5v7sw',
                messageProtocol: 'jqtcixcg01a5dgixc716z9egaqg3wy8f6ro43e3frnavr4ik770asa4916us',
                adapterEngineName: 'drdk1wvyraz9w44obvc07qinnumulsikebva0x1r8e2f7r0zv668szfklxxr952ayclb7c96wz9au3hkua7cyz6hiuni2e1rqq1wd3pf2jym8ce9s82gti7vqrmoe9ndisg860xbvwweatl0p0zutyi5evomltt2',
                url: '7w98e81om2k8neft95txcsqmnlq0jdkoiw0861x6wxjoo3gj6or1hyszudmhh8fljig4sq3ihfjpv9n0h4efyusk0g4n5w7tm79zxxetdrglkbpvg1hivy8nhm5cfnsqoio0jn0owpjrj8ihig6k5jx8r03g5hmxmlm1rx8wchk5dk0ebi2pf1tp4d7gpatu7ibtz5fop7kvh01byvq2z6nfvgsudtcld36xr2rumjq6auweelo8csprdsn4wvk35yj13gs2iyt9xw9utba616xtu7h71ey0el4oxrdjbmy3c7rlomjxjde0i31oeipv',
                username: 'm1p3hoofss92ynlxs6y0hjm0tdfdix26wd2f102j22akf3o54xdh9ytdfz3k',
                remoteHost: 'w9rrpkdizf2zfrbs6wwnd1b5j2gso3wkdsmofet14c4hpcw3o0iotepxgv3me8lwmmqhfy1gkfwgclog8ohnnzdxzsq5pfdgy01xn67ycju61clml7md8b14wdpexlwk8r4dbpup4nh83m69garpxfakq1lnvrhk',
                remotePort: 8564299852,
                directory: '2lqzoi4cdl32p2v9n4q8f8bn17e3bvn3ljwse46knr9tto9dngypygsvgdaewfasw4up14hnnzoulnuy45lqv1c7e9kwj151l7307eit5ggfipm8b5delpzietlix0ewfvbn8vmldj6pdfa26t4f4l3z9pjrhf5zsfmpu5ad4hrq737tk85suxty3uhv8ymm2qaifgczh3lbn4um7k7m5fnctsack9q474bggn4yulrs14krs95xk5qcg6l2dtqnmxq52x1iygb1eb5n0t5r9fctupg35fnpbg3uqbt6yrvil95cayso6btejvftigem7r7letbpc5uacy9cpjhof7kbwvspqqvzp5384whio98wsu20kowy1kwmhf1dcopgdwu123htfhwwnd6u8u1hk5248dnt72g156i3uldja90oo4bin63xtyc3i5bmw7yqauygwpchat3bsarah0a7vbj0a958nwix4s1avie134hw0bvmf9cov38mq6iedm2hkw6wn16gmzgziadhuonsno0jtkgcinius5rgn9p2637kcibn3e1m942a8ohl0je81act8x8rp8jgr2nxhbefsrgl5kgjia7n6pzj5un99alz53zfu8ybt6pq46sf6h2088wdvfi3ss71z0kjwwl6srmx73216k7f9js2flnqsc4l6snyzfl0gqc4nlh96zl4e8gi5ivtgvwxy6vrci9lepvx8rf90nlhxu2zrkw8twc7dger9735ju5kcyqt7ii2rtzlr327vczh7iscvtvcxtj56jppzs08mbelbnexbpxf5j9ysqlm397fw6nglsipaf07kyni4d1pndxosflzea24g9r8h3cslk7gmcs9l6rigg18523q2zb5rsv2uem00d6c33r3wmfzt4t89mzxvu5n7e7xxtvn6ryv5gut53boej3hqdd5hcw7chnx6iv1txjhnak91cp29guy1fbphbqyyi8diemtusq730uaaeaeesus1zdsk1rz7h3w1me8',
                fileSchema: 'sml16wk8h92j54xa2d5fd9ipcl6wvjeggcd5wd1bjv3csvc224ny71ajruvcy0fhwsuv1rdfk31zzd6iczqh6abbuqq75gzopd37ikci477dbpib2ow5mmcdlup93la52c90drvaig6e4c6gbf1dug4np23mmtkp19sffac8rarh9r51mxubqxulrfcdmknih2fudq7q26wzc8ftrlocrhhjn6625vz09iy5p2wt5ceo8rjwrw03m4vl2otiyz5rej8e75j3hy847uwdsvs3k5ieoga9rkyakutj0auf4nwrbk3gl1nnu1u14xbbsow8c5gph86e0i5av6ttq3rq2kztoeer6oq6n5hw24s7f1qjf9oejyrggy9nuud1jukx7dblmk1cgfsangp3a9mic2c1ab0gnstv0ej8uhxsxbam6svytzsh3rom7z2sflj4ju7r7ds82uq9honej016i2hfktv6j2r0dupuir2wk93svww5oohhduw2e5jsqz4tmau0evgvpjjxm4jv9qiqs7cvfuc8vu3n6sqzer5ddjqjlvj4st8yije5d23hlfj2nu4nwae1nlvx0ympmhor35ky8fmm6n1ckq94yksqvm0gj6yjixdyicmxxi7vmbsk7pn500n2ianay3d79wtq1rub9lpj75bobytaeyk6pukwsr1mkptfp0ftgqh3hpl8a2v0yzubltxkt4n5y1oqlpj11qlr48h2w7bi2t9ah0l49mkvosifz1lfizlfqksyxcgasq7m064p579k6tk41v99g1tffi20me5874ys2hsi81tps9kn4i1hfj8bk9bsj8cv9mkwy2tn2ee46ig879rk6sksvrncwxknu8jwxsfi98kqa2c049zjudne9eushxkroasl6eon1rezhxf6fa7c9kgzgbyvcu52nsmtrx562hy3gcdqtu99rp0l01tqc5ql2fgtpjizger852jkzte8c26lw7t8pty18lv0lhltv819gyje0aafj07vx9k4',
                proxyHost: 'qk2e6tiesuhxkuo1vnhrkmf392ejsxxu8r2u3dbbv8mgu0v1in8vc72skkvy',
                proxyPort: 5054985152,
                destination: 'japzu2x66mqt8ewbh7pforxo1oguqszak63kn3r5fh0ywfa2kwe48cf0y52gxl1a8j60ze1kj9lic9j5bc8j1w9x5l2peh8w9lj7cypzgfcx92tpkmw7i2clxu7usiaevzl98d85oun2xxp63qqxg19pla6mn8lf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'vf6wx6nb3v5vkj7vsvrw7q8sm5l9zumhyun55z287afrxcciu24mtf7oa70ttjzgoq0pr7nqpqex6uaqiif0v9r7m8k2v4e6cj3hu0sdqhanw996z01l3fl3851f0ob5cs32xoyc84l3zbsu1p50d9stncb8yynl',
                responsibleUserAccountName: 'jqxfoxrdwjciumqp6grq',
                lastChangeUserAccount: 'xqn0auoobcdhkcam6pqt',
                lastChangedAt: '2021-05-23 06:10:30',
                riInterfaceName: 'gh5g5fwu2vm23a8ldi2itjfcohi48oyam2ghqenuwuifx805b9c80rk9v109mn1au0elwkygc364yot45opspd98lybo3c2gdowqmt79yr7krco3z7ckoj0ooqxu3k98bw7wa03m2uj1pwsddbsjzkhu0xiznzo6',
                riInterfaceNamespace: 'lzmqrwvmo79uvtv532z6fzgev26urdornwp2sssrrcc6ulw0b3alampnygzlpy5zhjn0elidmdcajy39wk9hxgcbjppbyfkcfog93yozb231kb33d8yfrwhsgpg6upfv3852aa37u7dyek6zui5ybvkois4nqhjr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowParty is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverParty is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '14bdeb46-6704-44c9-a132-73a77fa63805',
                hash: 'g1jt5ow2bpku9naf70oku2cvnqf9at5vrcrf07ky',
                tenantId: '4924becd-2e77-4bff-8f1e-255f819ba488',
                tenantCode: 'knxg20n2b76z7kxs2ccse74kz3l8fjvouq5u6iqrx5k7dhowpa',
                systemId: '63d8f545-6862-44e1-9f92-3374cff854bf',
                systemName: '05im3axudpqm1dhp5s11',
                party: 'dvo9ju3mcjfs56xq9u3vr8idccmqipt0dxxlz05po3ycqkz9szcr71qh3gvh7hmosnwjn3mfgictfdavjpd0tihtz147ansav4midj5lw0m5htjvq7ab94zk0aw3j8ri89padrgjnnn14d5gyy85lvx1qmi85t3z',
                component: '285xmwgocpvwyp5u7e8o2cur2jgxn6g312c4huqe7o7fjqzzahtmay00p2dam1j673o857zwbagbdqxbnmobuo05rsy8uh4uk8rh9bohk4as8pnfs89myu46gaja1o0fe2890jo0neqvvzzhbx9xz41vh5stdql5',
                name: 'udyhmyb8hm78d3smfcef3a3rbcg7igftdghlgfs4v4nej9bxo76v61r996gg713vhxpthyab47x5r9uw5wzef3vm0p59ypezq2ymfuqpicw6kfmv3rf9sw96fg14h8avr3u16e6kq80eexwj8oou2ytzvyqo34zf',
                flowHash: 'tprdzsmqal4ykasnv06yvxitnugdhslvw6ria5du',
                flowParty: 'uj4lfwz5y6ieoa7j12ug7ms678kxt6jw9xn96ye2wiiqxcki19qmcqvqrfj2uf1agpkxqrya58seckty1hsvrotaxb6g7aehu9myqpwlemkh1mnwgp1zg5vdjcnha01u4mnumi063kbf8lb4yf3rtqct50lhpnei',
                flowReceiverParty: 'imnd2r6fv8cxzhljyrll5eob34kcjfwtmbg9t5hl33vy8bbd2dx79hjh9s4ff2rba00rlu3xwlcf6i9vqs53csec87y7oe2bb1ichiqgtbx3llaq289palhsrz3doyyrac3nznqgtqdic73u1kpt2mybjzvvte3zk',
                flowComponent: 'vmc8guhdjks5ahrityzrlrr9i8zqr7k286q7iaicmmsn4kah9c8hne1xtyjz713olsm4dqv6arkpzdc4zqzyjyvmf1xi2ygsjdfvnn2y8sler3upizp70nqnnsd45vaiskr9oubdd9jamwvw8bghgkxr32d6hq6e',
                flowReceiverComponent: 'soydsgefg13g2ba0efmcqdu900nfdj3bw6dm9jlk3oay0ew99tffud99aoxi1xlttgmq2klxvkewpembw1n6m6t0kf6ixof38coa3nalu5o43rakme3etuwp48wm9l0btty9gopar6w5mez45wdajdv92agcxx3b',
                flowInterfaceName: 'hmzh3efvxcz2sqyha9098b4m101wglncws18r7bs0rdetfttqunpn0tygoi20h9pv5x1c2l6nqt1mkkmqbglkmqddg55io5j4ixzbksfqgi5n59gl7ve5eob1pa6yp21k0tyihrfnh5gq3njej3df2b5s170tpby',
                flowInterfaceNamespace: 'eubf25wdhnr60ye6jr5f1b5axh4ql35sg4w2v00qq4zlfdph2j1w4108zi1sgoo39e20lsf51diis6zijrcbsg0m6foz3mca3lvc3gdq2umohtovov37kasymcl1dxu2qfu4bcazgyirm0o40gszi8kx3uw5lg02',
                version: 'lf9j66cfeip6go9t8c3z',
                adapterType: 'ormrg13s0xw1uvz9xckij9c6mwmcqww5zes06yuls5vvhii3boy8bmda2krg',
                direction: 'SENDER',
                transportProtocol: 'h8jif15ktidve0h5zhzp7kz7b5kwutnnul6l54spbab3np1ozxmgiggzgw21',
                messageProtocol: '86wltok6pzy82n96zlrbvmlpwkl825hgcnzg5qwqm3v9wuxv2kl6s5skgq10',
                adapterEngineName: 'o6ij39b00grd8hpwnyo2zl0lf11yt4627ir48ut3u2385qonbk5aenkcyjl8rbc7gdgigmgki0gpslda15jubgpg3mcbpxlok6s624skqv6lry6ywblu35n9qcn6ho0r693jt3iam0fuscre77ktypi0wnb615bx',
                url: 'xtr661crrw46s4ud87127kcpopektdsn3kez192f1ixu4hoq1fg93v0041362dj8cd4suegtfd8r10xj82nuf20fy2joi22254un2lmj5oxxjimavr8xvq150nneurkl6145pci9w5m9u32rn90h6qgiv3tga88ae6eqkdghxdufod97j33a19e1y8mc9wpwj5ugh4ngk88cleot5n02q59sae5tznh0jl1jiad22e6pz0njwu1zxvp0migfv6evijfoatwj3cs2tx12plu4mgd6p9w59ixj77t5w1d4zglvegbosy67jm0bkvdl7ox1',
                username: '9z0zs019i7ho3t2u9hz1hxiab01sbbus5v5m14kg5vrlqmv1ytsqf7l6o2nj',
                remoteHost: 'kdxanfjxiam94xounqblf927912ff4v3cb0z0tp8af8fz58nacln57au2zvs264xuqiq3c28t0yaaa65t07amctjgu8tf8zj2prksmhju3xbyujdfmxhc4df4ypbsk3rnbyn7gy7wxa5zxrdbk2b3b5ghjkr4nvu',
                remotePort: 9383730979,
                directory: '677hc39ab4l9nsozm3l8j8qbuyfyxonczn6b1xnhm53j2jsdo5j5ocnv4l08wrzac0fknwuqtnolxols0lwooqj5z33ywjayhpu0ybdqkloz34cdwajs2p1ek36mid8x9w1btfv7nf9tl5jesahw9wc064rln3h438q104vyui73rljpf58kmo3tr4p31sh0pafo6qfagwba7ww3qvf46zq1bssciv5l5xp10pal7e1be0i344orlnh5imk3a33kbqffa297v4knf4av2657cjxzqx32e6tlmqp0f7qczciaxjgsawxza7it8veg7959uek6f5ktfnrj2uyyjibvesrc0f7gqyb8vxtxoxe4mkgobwbu50pr7kq0yt3t4ij2zwzv0qoqd6ghd5fv5rp0yij4wzzxlyc8a503lhys8s8i4nfdnjoeehlts8u74m9zw593ouxp36ru34x8riicg3n2q2j6mcvor3iq6tmpi41uv8449hcna5794jxcnmd48grult8iykayreqkz3tk940qd3bp4l8l6e9oiihy1rrttjyidkjpi7d08npdplm8qlrknhzz163w4vqrprv5ziwt9r8vj80uo7kf1qqyp49y7zcfb1esxa7ilsshv0es5gtlnuowvyq4us04icecipto56gqvhdkct96t1kum5j2030dga47uq50yrbb05cv9ceab85zp590euclwsjvftn0afgraqy8di11ixpc9j4422nk41uwa5fnu5vp7t9ubsgwcxpetn9qedhmi7ynx61lii6honyyeijr0lz9ze1ufhwzdn2n9tkw1dcmzn57wnc615yuw0gbkc1ii3mlozks17veso0rc2uxvl5zmljjnnw3ex6tidxpep6xd4mrdfnja98yxnn3izkhgnqne7m67yqvdkkmoasdk2hwx0sllzn73voz931y9jifmr2m4r4ll7b2be5ct6nqr8u7r0ap5yvm7g902lskyc4wihtu374hvht6txjt7mdehuob',
                fileSchema: '9m8ai2izazw6epmbb0sydilne2uiiup6gm9ort4prak0b8n4iwxvvuhe6s9eaq22mymio8v5nklb9iq9by7co5tu25xdcbpme83ed6eqygzl8oex9qsz6ym3eo5izo3rccu2u51kfj7s2nkcvguwbp8ceu2ybxc61h6efdjqzjn2uby4fhep2cwy7n02gqafursjme413cu9meydipz82trfngfffaolxpntidfqfspiiqfyj6cdgkd9c6wps3hkgr4l7k3j3u6w3u70qsqswy0xb1hsiz1yybeiycby9c95ufdfkwk2lnnuday8vqyek6a2m1jvwkb5nyj0snhiovfpz4yhfa7vooftlghebx5a1ftvlz71oou926ipnd5hh1uqnens7zkt6eoj1hr6e4jewgzlw4hcag26tjmanuc6y6wd3mreq298l9qajourch8ds878gzehqy0c90j4o9kuxt7mg0d02xcl5804rmzgmoc3hu94mnqdruo46ess79rcianugpvvgyklp381ajiaaszd3f18ze2qh1x7w7jbk3zuor7iqir6326ngmhlw32cdzz1ot054fl5g38yivzmhhzfb062xjox9r3ii2klrpp6a90o1vhd9zqkvnv5ok3sf9hkphve93mf4mzdmi04oej6lnwogr7r6ojuj7m3s3fr5703htee9ox66zmyocofnvys7lyyani90dns1hllr293i7gc3j3p69ocxigmmpcgu99xgkvjg39dw98jvv7uiu9b66e4rs9g29dzje46bkw6p8he9uqpfjq0c6aiyfyu6s7u2rxvmdf6j5fo9mfjunfsjaawdvyj280l3c5t2l7rn8duftybooy3prc05w5g14wwiwxrkpycoiyk1podu06xjwa489bt1wxlf1g5tzpklu9eg1q0j5l5yqwlkbkakbw27saz9e3dwc2nfuksgzkd4t47nmty40a04ep6f0jorhuy0166pbxu6te2k82jb1ljtygt9hl59tdg',
                proxyHost: 'abxpv627aq20q3i5gjaepstw2yhzb4q68h2cb66ss4q14rvqrp13t4wleb35',
                proxyPort: 2046515962,
                destination: 'flqtxago5dlt8blzq321z5og9br9lccvavrumwa7bbyzvzop3nr388bs9o29y0poxk39lad99l1kl0z4wy8mednpoecnkrdrw0eb7fdv05cfuywyhu5c5pf9972rzypsyx2nbxf6qtiasckujfgd5j4aje9dfc8p',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '42vkelvuopumo5lq0zmcixeoqv06h24s33s87oj8r2msqyv3vnm4y27ye3fut63gfypszleqg398zn3s3dc3esuneklb0tti8thtc8fqnm9m7ppvbbmpt79tzu01vwpv3aeusf5s47cg2d0lvge69k4uvlypmz84',
                responsibleUserAccountName: 'zxsgyn5wangxwkaonjim',
                lastChangeUserAccount: 'iu037jtahd3peiuparkv',
                lastChangedAt: '2021-05-23 20:21:49',
                riInterfaceName: 'xt8845gw8b8095sco8pdkj8gzmzaswc1qehmoctg5jmgc431ursfadxyq7cq831bgbnnk3k2w8zo4tj43d110o58brywh24howvyw5xz2loqawc6sj74jh2jl3g7meav2knio63wjeehhivui2vah3l3gskxu1v4',
                riInterfaceNamespace: 'wbe75j76x6zd6gxykrc92oes1kl1g4umnw54jt4kgo0g4vlwgzl652u5i89zd1vxcb52keemvtkvsyy1uf3z7yq0d5prvhy804xoyd8jm0zp9mf1sh2xn5foaf3qe37zjk7vsulpyyxn5gjn7mupyn6zqul80niy',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverParty is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowComponent is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '1690ac12-b2e2-471e-acf3-e158e7a3c821',
                hash: 'd8jt8fp915haoo1cetip731gls13dr7o383fdzza',
                tenantId: '854d8a92-3102-41ca-8e57-80da828fe3aa',
                tenantCode: 'mn6mzibd79qhdy31aoxbfli4pgcj2c47kfrvdwmvi2l4iqt55k',
                systemId: 'd00a027a-f0a2-49b5-8cf2-087661a12a70',
                systemName: '20kak9003j7ohdd74rws',
                party: 'i58i9c4o6u680mnwaqobvavsr9sgc570eiuzshgx85fjfyndjs8r0oalbrs6q168eh7her87nyaiebqs5fvcw7sm7rwm7gvno1h9wvx47ruucj9plgilz93lq7496c6v5lp2q880c8ix9c22faihtip3sxrespud',
                component: 'g5gkdo914dbaluk0bxf80xzqu8ui8kqknnxa65n85ctihxle7oxg6wcei0mdv1benbw8i1wlf3iz18dvuid3ynd2ayaaumrkc41htwe9r6kzxcmxffao4cvtgbqa11xmjjkbovtezmi1cxcqg0wfibebp1zpv7fh',
                name: 'ooshhfn65vi31rgp032gcy5zcenfvrzg9xua28mdd3kb2ohk9csdgx6kx5x9qabqyxll0hlylz29scxxmg8oqb0ft94iy0xyt8v5c6g2ajfi63t50539qsa1w2hks98aicp7ry5a1uqf3bte0bs54z8o7e8sxzei',
                flowHash: 'cx0jc9q7g2p2pqpmcbu5vz722c5frddrsb3xldgi',
                flowParty: 'id22ovy8g33utrv07tlo58vjmy22ef4eaja4u8gn0j5bfr5eenkj590vj16cqpy3o0gjfqf59kahj657wbsl0vn6606pfnh8gk0othnii2qo8bio7afbw6qt5jqdwmituho3wix3klxffotk7bo2e1deh37tc9sr',
                flowReceiverParty: '67li0caguivkruhea7qulm6gkfgydezh7xzhmwaipvsbqtg692ciq5ku7ujsvv3tkl92778zhx93k5qayrc08shw3vbmfha16ufw197ssxfp4wj7qo8vuxvpmicr6ti7oqyuq7aqmqf9f0cq0tcobv845ubywgt2',
                flowComponent: 'gowj3q6we1rq1nf1mkw15k6a9fe1u5virbk9hruuu2jmixkft5muwcp06h8i7j1b35vvjiycumgqrns9n4k5gve6og00e3jpxbvnzwyxq5rxzkrqwqh5jn5sn9o1bz6zbxhiov3by3267xzxzy3gz1dsmn6pzdj8x',
                flowReceiverComponent: 'fra4lqf58wqimlf4mzr7q37kpt3dndchdfkb72icgmsrtuimkwmrjequpze4aawugl3ox0ihzm5rdb6re65u8jguq9jd4uz4chzi5gxzwqt8vnkz69o2w8atp3pebk6ejknm9q3v5kr87vfe2njj0urse8mokvqm',
                flowInterfaceName: 'wet2b53vpz72zfujfa0rmet1h1oc4s2bjpy7p85qgb51eh9gcvxqef9xhfhln9vrn8c2obbflb4yqcnoohyo2irurh4ss7p557mvged2wtghf8gd2vkbnxvhotvjy84zpm0025ml9jf5h1er51iejl5t3tbqjxgp',
                flowInterfaceNamespace: 'bhfkrhwf7svq4bswh1bbe60bst4ujo0nzqc33rf2m8msk6k4ybi80x2f2qw9ee4rkctp9pe58rteaygwq0n3shi300qt7bbcv1au2k8yx1psrh6mfv0w53xpcbw1vo79haub63k39p9b1ga2ox86d8ypyn5zt23s',
                version: 'pvgn6c8c7chcbri9wqnu',
                adapterType: '2y8wstoznewkgufajuby4i289v2rwzpo0vz1tjsvw8wqq25128ueoaudbq02',
                direction: 'RECEIVER',
                transportProtocol: 'x2jup6fplbon3qvdc8q87nvfvo49lefyjqoanwog6p0jghwrwf5ijb687j2k',
                messageProtocol: 'u59b10ox4vyqzs93bu4wwvc5t6gk0yie78uao97dle0en2upmq92ykm0072y',
                adapterEngineName: '5q24ha39xrvnoyhyjz44x4nlq2y74z4qob73odtd63ul2mg8d0jnc6u8be1v3b1jurp2hrpjyydil6j8e6el4bjxf2z92awq2dl45tac34mujlexqsjltvlkb8tvmjsyvwkw3jtpn009ykeyjtufvnf9o2nhjk93',
                url: 'mpsoxa4aa3vpvrg710c6sfqs3bjny8pclfgddoutzq95yl5tsolivlqnai1bguck834t7s4fx0djy2vf68gv5t682jaltp35kxo69wn4cqybsj2rbut5d28ar0h72fsv8r9rs7puukd0mhe3adh07tgtrqtr01y3es4x1h6fnb1h81oizqbnm6666c9b1qq6t6ah5p12bhalht1etdijj35fl2waxsaicviheuwpmma9re0lha4c40tv4ogkjjrf9wv3num5l6s82xwwxthrwzlpcjlskgs3lv29b1cxk27jbl5iejptyegwxy0s5u59',
                username: 'k30gyh4mk9yydjjqgd2j2fqhm42gxhobzrn019ipsj0ohwhzue2exkuz83nc',
                remoteHost: '6926ypnl3za5c9ov3f52zfj17mnc2wrqee1nsr8nfb27hyerdn4auplbx8w4x9c9hzh08br1ui31gugbahfhu7acp8kfdjbnfol9tcxb1r7rej7m537brdi3c1abye5n3lo0nku0kttkymxdmzc3cyzswoibkn3g',
                remotePort: 4710063132,
                directory: 'kb3gnfn8to2sgvopwe625aij733fhotgzlkjmj1hrds88u8b781hw5a8be788gxeha6hoe67pnlj0vdi688e16cfcmxzic7kia5nlhvfchyp1ilx1ewbla4nqapqdd0naeonyy6o3289xovek7icnxdsuljnf7gg5tk6s8n16fww5y2jcbm5jyunomb7kqih0y7t0d8ntkuqvu014jqducn7mymopvx6khwyhzsaz7x9tp427vvuxs0idufzb6q74c5bxzv5whyt8e5u9phq8fpeqop1hg49u1pgl8z49fu2uj9gzv9ulp8pihwd06ay7mlwxn3ici3bgnt153o1zijrc4fplf7drvyolaqpkmmbkjmi7b64e1njw9wdlj8af85iosple1b96ib5i4h2u6bwqbhnjuxnmmfuqun64ljj4l1y9do7c1an98djyvfpmpn8yugzy4q4qxvruwml8p7l1de2l6v1ibb1f1zwhji6xs8ptgszq0b27e0bb7jo1g54oapuuz62yf78q5t1g873kduuvbm1d4e6qy7nz3nq3joucwc3qimmrjfwp1zvvxjpxscj1uxwpe2t9xng2u8x0qr0cugu9jwm3gfkn92cr25bv3arhofcw2vzqe3k893ginavijdgq3sc7vkl3ykj9foyaxd8mba6hxmpdozdwb1jwdipoa1gywjd9c97vx6ap79h24shvlbkowx4nlln423m3yuqoai99uaeh6eppw6p4tsx755qoi21ljih7xwdkhy7cwpelz20ux2txxmcj9wzxll7pp36vjnteoodxz2dgzebla1e5zgo6suxrrb26777j9irv30q24108urlm2z7wvvj9mzmb42uxtin64lnmexti6web1z1kvij7svb14y57n1adyc0lj1mttstzaj93mmxwozz402wbwa6uedgz2cax43b5hr0kcauafhth57fum3dm6qfumeeae6lq5pexuqnrmwglzda126dzyfir9ginicqjaro4nbs',
                fileSchema: 'djyfrmo1vdz75jw9p82wdjjrpxwmkkann0okjpt6djpgjjupc41kymla0jg3123zr76d6h1g3uytx461u9tbv1by30xn0j1vvi0dboodew8izm1i4qongl943432eh301tu57vnjivhfku0i0tkbhb2sy18kim2ukn7sdhc58un2hbmdxi2i8bdn71r6v5cy8jpw8cqitecc82sqnepc61r1lo4bsi8l8qhkewns54vd60iahziaa5txzdrp96kmmyg44vo22jjnkaa7k2wmdo4mgzou5rmly4mil7n4wmrpzrfjarcp4r4eopry7d87ke92o57gqry5r7v8aw0airtmkckwstg1c62ubckexfchxur1ehbwcc09mgfhn2g5pmn5fydg3kuqc28y5aryhyizcw3fo58slthnaz8f7ovk2n9vbamjubwmgqhr0k2jm5kevrd7yil9uzk0lykoqqlb5hojdfvxz9z70046je5jg29q9wca2npo85batso1qsytd2ktc7iw19llgi4f7omxbgtwpp8b98o5tmf2mt3z1l6armzffwazmgorxsr1acl20x94ezsvqibe0wj2b0tsclw4pnm2o4qnwgqmm162f32w21o4ty1gnwwjjj6gqn3lleks15lakkg8pxur89u4sdc03ge3eypel4anh3oryhtf0n3swym4p930shqb054ftnnqehgksg35n2eeclir3sfamow0qn52i0cqyt0gn7qfp5reqnufb6fyrg2p3t7cy4zupkmn03thk51vexkzz2t1ddam743fqv0ywqazngq4qip3au0202ebkn29ejkedhy3j6e71xc1qi99w2top5oyrroe99u5py9dnojbnr3by7fs4albvy62rlrwr0tezl47g238k5mfohtegqbx3x05divrm4ezghw6xb9haqbpsi3l8w0eobifw84wwzkndcxruj6kt0khgqt8arrw6atimvlyjjftujyeapnv9zxisqdp9yu5la9etlu3',
                proxyHost: 'bmdfwonkhl7hxahbetntn4egemu9rbl7bsi1dg75jbi2q79ytclwma2ndv13',
                proxyPort: 8523285681,
                destination: 'ukpjr7qwwalt98ndbjb3xuuz9cyhntkt6w4q9huhvjtmkucum1795dcoa7wjnrdu8cv23j6bo5hqo2ubrleloy9biawwyn8nz6badlci5qhk75xtf7wphit6zwaixxlgsz7yn3n6tbupebz0zdquw61yv22svoo5',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'h1ocn6eo1j5sntlbb1orxhs2arzzkwdfqpbpun4wxbubmzshcdi2m7nw0wnw3sipj5k6luyegt9rm57k7wle1qb2zl78rz4ixn0syll6jvptkjssuq69ack8pi5zjc52ufnvhsn1xp4px4rj5539e5m7jwmy1bna',
                responsibleUserAccountName: 'x7x4k9qqebc7e8at2dvu',
                lastChangeUserAccount: '92hnxx6scklrjojqvojs',
                lastChangedAt: '2021-05-23 22:42:02',
                riInterfaceName: '6gmp1n874mxn831uk084bvfqjjt4e03z9cfs2sywq8mznrtqj5n65l243mz4u9tljaakdeffnzz7lqeyilka8tle7z8xiudu06j6e3zysf6lzznny8awcvb0r1o62gz54dfc5neufi2oslbf6xyarg83u4olj0b8',
                riInterfaceNamespace: 'ykj1gh3tu5lc2bhupv8hr9kniqopb1tbqeek1jj6ej6izigxuhpjcbv2u44s1cg07bwyojd65nldmphzcx8tnlmq2ihadtwkqzqtq5w655jccsdiiuek0ikfp3v89r3yuhx6w6djanpgn629r49e8qypndcr7riz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowComponent is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowReceiverComponent is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3d98905d-6693-4d92-8977-2a86a07cf2fc',
                hash: 'ce38chmf6gll8rkawwjm16jjqnvtwnktyls9tfcc',
                tenantId: '2b73042b-6d28-4b8e-9e8a-66a9e108f10f',
                tenantCode: 'xxg8n7qs5noml5es8z4jv99o6y4ryyzls6wgtvxullapgtrn5h',
                systemId: 'fcce9228-5e6e-4304-85c9-33f9c1945a9f',
                systemName: 'y2cetxpp4t8e455oih1c',
                party: 'xu4zyoag2no49hk8liywj943ghdas5nq19sy7b41zn4og2qy0qhhr5bhhm4pj6obf8cs01n8isxob64y4hgmguzpbzgcv4vx69uotut4925lb8t23fpn2n4l7383xqtsbt7nuxo7hut6cpt8ytax66ugnhw04jrj',
                component: 'dcc5jnily1xyt4icgy15aaow988ta6n3j9f4id6o307d2b0i380twq5vstsw8jw150qz7tfuiavzasevqeix4qsi4xf8qqgpbkfz6mk44n20on44hqzda7h43gr9d4yny2htwkk89mbn708uakb7gkt1tgnm6y9z',
                name: 'ejw21t82fjxz9605b6t43phglmoi5birgfrwluqqt5ckhnv0xgb9g3ctr2hswq6axzrarff88zu4438wlstgp3rexb3bxp2oa770qv6nuylv9npsunulszm8a4sme3hdua411fh67w2lzuvpv47k025kjvdre5pi',
                flowHash: '4e691ig8aq8dq5271li9oxax6mcp9fb6ar19ik1j',
                flowParty: 'rcot6y1719ijl67hdj0lu2twb142ju7zitjsp2mo70chuv9povgd20ji70lcn0g0nlsqabpqm8fx5z1k2wsruhcj4et06fk8xo3km9rxgnmowh7dvohhbklt0jolza3m6smprecwsh9y4s01nqfr9a03xd888uwn',
                flowReceiverParty: '5vfgf50v2x7j4oh96dp2rj90rji8x0ee0xaqpuz8gzgl8p8xbmohviaphqin9jt0s0mnr5ffourgotygas48qteom5dems0sok8updwyz3hd9iwkeonuzzenjdato1cdeo7oo602ayjrek9dbyhnbhszskkvf2fb',
                flowComponent: 'hs763untehusdyg2y6e6ggiszkql03kjsmigjll2ln2e0pozmnvg6k1l3ig1c0t5khh6ivthf5irehgpubj7x96rg2m4f6ukev3czd1xeo4pnc0r23oxihwyjvyl5elz9m2mvgch3m59xfsouxx2fbth51thre6u',
                flowReceiverComponent: '2hxbvrl199oaqr4rt3sgdfhwbfb8cw6gh9uevsw8ih6g398zmrdpuew9skbie4waq2tnw9nqcucki61vo1xpx0eh4jxmoj1h9kookveggyh1pms1ag84xnotqgpnnubjldiftth2c11kxyzwa5lzki8vqzbls9yuv',
                flowInterfaceName: '9szeso7o5v2usb3wo95698l2d38s7oxcih5swavalz24qxoni7v0de40osoqje9r029zkiram1rlpp1dzlul4susbhm1be5k374inhp0vo9j00t1wb44lbfmo6ai8fcafvigzum7zdi7a07x5qzp2me8bln08jba',
                flowInterfaceNamespace: '0qd7wgg7g5bu2ayu3ewaj1f8p83hrm8ttewfxcuphmbh6uw26fdshi3p7hzbxt83bbu2wxn2lrx325ga3bwsyn87p3v684u6v6gsja4gxpdj5wt2vl5cx8h3tpd6qfszcogd6edgxtbfdsykcjbnvzk6ailvxods',
                version: 'kyu260ad3ksxexawd6qm',
                adapterType: '9qa1g9y2kkstrpwcq4gn4tg8lcqtc2m3frdm3ppeimlj4fmflwyllmj0ypse',
                direction: 'RECEIVER',
                transportProtocol: 'n9zakqmvlgjy67zcckebvw3bflsn6rscwo1vombuv18xb682dlqyz2zqy1yu',
                messageProtocol: '6gv1mswqf1uxrorwjbooik9taeksfj9lroy97a7wylqcebs7q53nsjh8ryk9',
                adapterEngineName: 'kdfpm5asnqc6o5xd5yk72jb5xbs4yzuopkg8cnhzzq5hlhzfcbdhlgr7myjbpjlvr3k8jl2iaa2liwqipm1t4c2685yx1mdl9ql0hkywy3alfgznph4c5xru5sklxiacqn8novgtqsr6dkg6k3oecht61n5jhjes',
                url: 'g635uu6i0mw0hxp1k52mz9yx25s4oi1b0g3p9hr0vherdp9un7ylw0fkew6voww7c32qa2m1us459b36cg4xycic878nqg8t2dno1sft6178h5c0xsfz2bdc1dwsd0goz2p7yk4kw0ozeqmzmbbayv6ejqixojewwqy5qmj7elzeb4elialc93ybenfp888j1i7axafbj0b96cbfg7rb0s8uib03b4dptj16w4ykht1nrzytfqxz956qabq7x2oz6fa605upllnabk2n1oxpt8py4f3oqtz15ixmygfr4efn0cug44emvmp13y0azx1y',
                username: 'rw5v22ox22ptmav6k8mek521jm0nzhqak9d0dkavdtur8njewycn1fhylw9j',
                remoteHost: '266a99uz5con47g2byx50l4qq71mqxkid874boeqple9n8pit6azutsojtrpkr2ovn2stciwzctl3hlfoi2b4kfmzmc3lmhby12crfcbv05k7wjxobn4k0gd5pqzpzzwoshg407cfllkmxwhhjt689t242i8u4fm',
                remotePort: 9348443429,
                directory: '8u6lc3drs1di21mzvhs6nxfbxukn4n7lar42skov8cn4m1s91hsjh1xpj6wskfsfmeyka3srmx9hd1frry17cnvlo2mnakaifj1p8rnainh3ahz97ajsf1rl48e5nbxoikqhlw8w5gr1wdnpu15mghltkvokck14a2df7p28mm77ataz7lhtze7al34t5v5nspbrlpv8n1hdzwowtlvt7pc9kem82wtdjmez990o69h631pgvkv64whwshh6ndfwbkkxq7boaky86p3w1ntysachcebvbbvar47s4z1p4pqzj3749ds5z52xqui8gnfvuu2l9e8oc7fthk82xzo5fn579w9hxsc7xemv9ke4en8m0qofs250b4jf7jqmzuz4cv4yn0ii5pf79oho3zlpznjxgzum3nnv8277kys4t3q9cjaq22o8bged1pzjndlcw55t0fmhba0wro6sbzxbibgmwc43tmph17c0vthul6cap304311enwn7ottvtwuav8wfv75gnuv2lly9yodtuls1adgml39f7230834w83c20hze83efia43kchphq8t2n0vu9bilq0nhbm5pz1gaaqfmzp2fektsr05buhm0aj4m3v54ki7lyg3t2ssdz9vw32z8moy689fbtaa6z58c5si4ygyvb88d1gvhqekaosbtuxud4hcyfpur2u88h3gmwmx5urz960tu4zw222se49o435h3k7v8c69hv6j5gdlv7znjrb60gfrq30948g2uy6cy4uw7l9n0yllerlcfvo41jwrvatint2l0g13p9sd6vw10ie20auc8ki37p1jvz7lb439qj6c0nlfz566mrgztit1cqsufgb0kxyc19cwhyo6f3t1cnbpnetiegpafdwotw9m1p3ib2h7tgxgtzpkjcijnu61s2o4wm95ud07j2yj9v722oxhvxp2yz6xky6pejgb0r568framk2f5tj0lcwokobop91dz645e5sjn8616stmivng41rc3hlp',
                fileSchema: 'ewbw2e08qemoz9g1x3f7uqcuax5ao4g16rcu3rgpsaiwgrm9u5mgxggn4kni4d5qolk21ovt4g1rvy723h4xfm2l77ugz58efz777du5ximmn0pr1escq8h3ew6fdp64bvgjf88cl6ekf7k5qkxg6zxc9p3fj2abbflqitatz8uuqukpx01fxiaghw0smf4dxfkwaqcr9mjdx6q662oyowitnni58wvs40iba096rt7kg0z4egqnxkty2t8ia5cnjm6u1m7nx3e7q0mta3b99dq6hpugxhsdd7h7oawrwo5b999x2yaztmprcn3fdl8s0n4wkp3suzxsr8jrcr7unh5q809mudyf2z26shcc130340tlfqilyu22eo1mac00er2w2mlglwphp3bp8zf0fotq48osb324digb8urokj47ms0c74s4r2u8p8rmaum9wi9ukaqatbqrm1vg0rlqwobvjhd0eavzyqopwa899rmhcr9rmc4su868uogkycd1n9eytqrqnoz9266sxdpfor3wyme8q9ksde9304atma1fym6tccv6iycxzfdjxytedoeh1ywfchgottp8fqdj30n1criwxwcdvvuz3r18s4jjyoisfmku5s58d11s9fdchmi6vu4f244enfj612tosruunoo83ajd5pdciux5aq4m4eerjjy6lk36cjiowuaodkrudoogyp61pm1q5xpkkntw36776fkvxmlxmdw4qufl3kszsw1gcy5k4e29pzptdk71qxndf9rvvlgcr3acx09kz4u8lvvfyfbycwydzons7u3xvwj3d4ibfoewfnt9qz7mmos7gp1qw06vunl2py5v9ct7ya76q4qrpwmja3uweei09saky92gi2z100bkarp5y3trwgvoy7g6imhszl5yicvprhumqdwv95manc3hxl8msw5da3oixh7osve67gagt1qfmrtgyktk1s3swawt8fbokbaxouijmwn717wt5fa5lg2k4pt2stgpc8wx',
                proxyHost: '9k16sz4oa7y8y5st8rhn0harbnvyllwvosgq76knj69x39cuj88kejf1798f',
                proxyPort: 3005420084,
                destination: 'q8u78c9vedspaqdgjizt7vqxeo5tekx458pz4hcug6a35yk5173txyd0vapqaj45pn4oy259rmo00ct7xm8ceseuretjvbpktbe7kjk98eoi1kl6yhb6jeqgoe06zydiuzpysv5sw07j5sy88dol3vhw066qiviw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ha38n4y3vr3azr5o8fmobw9v92id82mj2resw9okalk47ui8wklk4ii8q9vnr8yabeyonog38nd8rp53d1v2trjs6vcum5m6r4engtr3vxajkd0w9f44t0h7c9n4ih0ztub5fu2xalqxghywutfsx9urfq1dr3af',
                responsibleUserAccountName: '87ie55xzu0dxedb2k18j',
                lastChangeUserAccount: 'diobv3y4pzhbb2arkczw',
                lastChangedAt: '2021-05-23 03:54:01',
                riInterfaceName: 'qq6shfp8zpi3hy8pn1ifjl3w7l0o11fe633nwl5xsyg23nyavfi1ar6ofzm9qz06dmh0tmtb8cm7cut7dvbqkykglmg9w5w3efeo1gvdzvz6vekehhj7jl9gu1ddjzpvt3f9002y8z6r0ncdhszvzterfezq0ia0',
                riInterfaceNamespace: 'fdhtxh2qsw16xsbw3vmv645b5be0rndi0ikx09qvc7ry9q67r4bvld05hmaxg26m7ouz7al76avg90i4cchhjfwy2iqypxnisiada42h8kqyafppkn5fikyuepb9no29l350r7q0m29ht5f9hfh50uno2zuepqc2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowReceiverComponent is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceName is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c2892028-1216-4868-8900-07fbb3051ef7',
                hash: '8266tjgftlfdb4v7qbmm28zk6fx3ax70qzgyfkkq',
                tenantId: 'eeb72d0a-37fa-41fe-95e1-fb5870ddd297',
                tenantCode: '6cguydza8t3ci9m3zlpbtdq8ie5lwws290anwm9goxb48n6o19',
                systemId: 'e5ddca7d-5475-49e6-a88c-5f13459f0a23',
                systemName: 'll23unmphtu4ag7qegvs',
                party: 'vgmzw1lvtta1kgzyv2nvxxt2xbgzlwikrl4zu8s514rem6gro8z81tlsceol20yefrazwl6sqlgn2crmzqhbjzy7i1gz2vswdnughpi6o4sx7m388hqyr9ipe7zjkq248zhrg3b2e38m9poajh0zo3xhyy8a2dga',
                component: '8glvvv78f0al43n3rd6soyw9mllmf7li3g25wk35182ygl76mbzevx6yhlcb3m133ze1gom4ojapm22l9s3q1x4yg28voxmps02uvbhtyl5jn4krjg0xx3craz83geqyyxt7go7cl4dv309mlm5c4bncbsv5i19s',
                name: 'ehsc3v8uts6i46bwh314dzohbr03pfjxnik6rtgz930i86na2eptggngt8lxjdxlacw3l7thon338xtchwjllb9x15qix3p4tn0oq3hf4dj1k7x6ytu5twlb7m8ucwbq8tev42cec8odshghqpny99ee6e9e75dv',
                flowHash: '2usjxofofld1yjv9mli4ef80zprxyyq115u67ful',
                flowParty: 'n1tu977lpqzja4ab5s9lw1awb1ip9ipmthoevfadgnm0plegb9ltrbaf20dx3806io0cnjgmnvl5su6u9xkiuvh2jfs1tizoe8g8cc77xje37uu2kjkgx4tqdvl5uun0dltlc9gz9qwc4h5goo336ec73nohhxwu',
                flowReceiverParty: 'q3ezxo391zqvhef052fozwe5427o2t5foy4iowfm7dg1c8uhxabmb2kkat01pkvfimdm08dvuozga3biyxuvvvbp7xsvmht8fg0xp5bb3c7sdkvp4qh15141i7rxz2flc3hg242iz1azns4n6zgxev2mbtzaktoi',
                flowComponent: 'stzvco811b7izy6a3x7xt8ggr3tfq4d5e0b5hn7iy9wux8akbiw6659oflcb2z0qgndper3p0bpu3i8g2yld7flslvcffzvdu1avcrcwogpb01wwblm3d44j7l3coko6guhq0dqvk22g91c0w1879de6k1kgisrr',
                flowReceiverComponent: '947mlwvj3qcdshzd92s7h6dfd9ep1axt8gjqq4ldejgr3t7quxspvk7xn9uguzeq0t96uhjktgydilfyvu2yjd42qalh6senrljatws076xp77ej5gn2hzc6cer7qkofyt0mkwflgydw1e3ftwf8nx4v67fsdhgg',
                flowInterfaceName: 'jkk6pwxt656d9z1b8cyzkuwfy6le11066wr5rmmy9ot3lnqbx4z80cm64rre8hli4c7mu8xknm8uukm4vyzjxtv8aai4eecpndmngeonhpn2yppkll2jl7wwo517cjhvzg1y0gsbbsuh6xr9gqnazl30qpbi8daw1',
                flowInterfaceNamespace: 'k2cwx6nc651fadlb10d7ttuq224xtbnhro8u5rj27hbs7c9k2xq9cfz1b7nheroq0ta6giw6t0hvla004r6z5on5coowbe9jjnbwgiitfaf784gsi6ej4v8way66dxb2goilh066jhjuq2sfk31b5qttpdzw4fwu',
                version: 'pzbdmwpqa7nlw1h8kgt6',
                adapterType: 'p7m8l14g2pd5hdnulpovo96c4qvcyrdac1rc33mhc730vpjynebcz6brw45b',
                direction: 'SENDER',
                transportProtocol: '2lug4vidz5n9dky1tbviilfd7i3pahorapanfm0c8web3bcaeqjvo432sgo6',
                messageProtocol: 'cqspwew4aztyfuz5l6l328ytp0j6j5bbrue9g7pcjme8td0uivm2evm0vqu6',
                adapterEngineName: 'il15ebbfb2am2rcphz0kik5zg3nlxdbcjiz5x5q38yiiu40cjfm9svj9skr3wgyc9ociaj95ryrbo5fwfixgyt65amc4q7g0b8wd7flqkvl2f9mymnlydh38ncg8touilvhoqoajs12mgdvue7yk9byhqbn3w3vo',
                url: 'c9fozfj9sktwalss64dvvohq60rsu7ko3wzkc36x5ijgfnwor1el987443dvffdeva13jygm2jrr1qq1kwzqv049v08a7wkw8nf9owjcv2m58mgtakddwj0yn48mm82fb0fy27nuqrd4i38hihjqq08w48xxqumaaw3yd7nwkbgnijc0y98wvxjebh5skhjorefb6tahea3kywpqy4kpei8ygsojwehekvt9ytmrcenxlm67kyd9izcaix95wu1nsihfrsy244j0phuz6gk6bsqhmv6rpp689417f0qxgbacaug1a4tth6coxs0t40ke',
                username: 'u0d375w40h1yvihjgni9zfw5h36metj6g46d5xs6x5ak08tju4wosfys84fs',
                remoteHost: '0becwx01gzda0i6ant918a3t2dktdu6jxnf7frstyzphw6x3nq7syo8zqp4u719wvluidtlehvonmu6rscwtjwx186i8i7lsznb8puwdk3cdn90dkiqg3msdanyan30hd6ioqidh67grw2iyl5feghk0etp1fddj',
                remotePort: 2280212739,
                directory: 'm69mz8yx9g6olbofvc8xmmec35qabn1c8ym7595vkrk4q4a3axsyol4jovopysy65nmfap9p79b6ihb8nzpjhkfg58f78pdqk9wr2ttvad14hhltzec4859bw3fqd98zyytheujheyplyzbce072jo34qs1d1fm1g56nqq4dlbcp826t6stvcg5fv0j8ck0eojzjei0ietmxal1o0n6znpwlj4vthqc7rbov46i2ej3q8ppliimh42wb096yp8osgq9uiepmceii4h515cebuzvqi695o3chfetaqb90j3p63ift5v7wwfkkuwuq2lkavxuh2f3frlihi5qi0lavi4miqchaz7fq1myhpyk7kvh3f4be3kqqpae8ncqlcopagh1ak5j7qqu0u312gpmuf4ei6iy6i59dn7ax3s7qe7vkh0gttep7jrb1mo3too421mqqedd3v6zukz8xj1cjbfg7s05dcwzxyq7t35hudlpysxr28nzmiu4zr2wedm3aeeb69p13zqqw7aimpr3wmxz73p95nxvaz2wzd6shrinyay7z3n4bxphfpg816lw1k5b2mgie0m3w4pez3k8rf6s5w39b0wq3t4ei8ep575uokvxu01z048uk65hx4ghndwfevw3n66l7909jbq4812rpmis2fdrfrq4gn28jj3bsr0fr71slwewv75f7pr5pix08visbg045j28v4j11oqyqzfpunuk0fulc4mp7yicfrxlos2c20akchiqefdpxsa3fr2dldwbenoldw4e6os9s154sroc7k3v1vawq4faojjqkav8n3p3rts6n78kjjunznu114tld54abpvz548r2gi2rlffqsezlv1hbp3slw8a9d2atmihj7sxdz846yai2s4sg3g3xyjfcw7ruadgqh5pvnrtqyf5zkhry1sensg4mn21yhzinzc4q6n2klbrck04spreuescfjq338j8qzqkm2rhodg0nmos7mm2niybrzp7y3xk284kjpqta',
                fileSchema: 'bxf076ospec0pysceomsyyhz8adyncg29pxlhde1qwy946sua64awunhql2vcli7vl8s7b15vm1cgulieg8f6393bvmgjwb5iokkqlivi2tr6xjuqjetmjhnplaozlcan07tetmc62gkv9qv5tu3v86a1ksjejahknbadykugelqfpcuqul8jbo5tbr5v26jhmdssozy5zjlqpswvlrzinr4fp2qg9q0s7txkkc1rf9739y49ews117dkgk1rz55e67yntots63i0golp6txw30yhw7yhj1f07jcngz9o0l5b7gxh9le9uvf3afb7lgk0m03qk9w7m7r2a679fp0nhvnrj0f6fh88h9izvyx06c7dgyhkypp3pzze21dwyauaem8d7j7c5qvygoxd4mi4dnux7h9088rbll2zbizsvjeav0vkj1a9ynzlkwdp1wwn8woddd31oeviw15gdueiwan0o328o651l1z6k9816jlt4xt09pm2kxw7upeug8sjz9ryaszh7e94mp5uo4rtd6csg2huj7uj958hkpl6zuxawh714qke5qobtrn71xru2rr6vmle7m250wqdj14ka75ka4936dmk17wwfs1qe26f42evxswi5fmulaoxhs6fpqt9wsm07ujinwrbthczk3qerus6wz7acdh35kyaywg9wshomhonf5xycc1om8dzuo8tjixcxqopvdff1trz0ng8fd05avdmgq0t07bte757ek8u6ec5w4ru6aut2ohdmclmw99eurovkdncxqowqefcwmakwg6u03khauwqkktnejogrtileq5bx518ocpo824kax0vba4ii2dng4gdcfif1fy4v33qxq400kolv26dg5r24gkuem0swo9tnzuidf67s2jhiyu27e06w81393p2xudvk24l5bmpobxtnmvcbdmvs0bwqm05wyfvul14133l7jhjg6zjedbp2xpdya9w0zzhb8mtm48iooptwc2o0vhxfsy7u2ae4lrqkec',
                proxyHost: 'c0kqp1d8mdq6j5gox8w085tueepi5lc0c3d3pacotu8s4kdbbx6ajb76fd1i',
                proxyPort: 3808791661,
                destination: '2xr2g5fjl19vdy7aqd48u86m60030l4j9kk56e5vygl589rql4zllg7gi5dp21ji3kj835lo9m5mduiion083jvid1cli5gtlncnawluhzad0f76pczrpmn7agbukyoapcobqsysfv6sdxoxeo5jsx4r24km12j9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0z4hyuehcktg2lz4mvjshz1bujsnj7xruzak1pj0aqptaaogc7ptiu3bs4hjuwm9rx98k3zxuocs46icp8iqqn4f932q3ok3v6co824s8h8810tgpmqfnmv4taohbkedfdw6xpvusykau1js0jst441kgfucp2cb',
                responsibleUserAccountName: 'jbyxt1c1sqnvr9k04gje',
                lastChangeUserAccount: '74kz8ii46humx0qvtibp',
                lastChangedAt: '2021-05-23 08:38:02',
                riInterfaceName: 'vxih5jo2d0b07lt9h1tu66fy4n2fztkt74kc3g9d0qm0tyqvw7jw407vp9ld7j2vuxq9vludqfs9yp18l9piy2w0ujs6kde3pfk8f9t7cpd1hvvmaz2wdakcnh92hnr2ctn2yyr5vjpbqjb88a6bxjs403mlaa37',
                riInterfaceNamespace: 'fscv60tirjh6j1f30twgzkeyaha37uk0wss3zlv7tw8qql5ai56idudhtvm5dtu1yrl9czsrnzv4pqqonyg59gwknl5ss727f2ge5j24f72xksugno5s7y44c9ypc7mvrbaothkxiywxhgcez6hguve27cq0vm3i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceName is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFlowInterfaceNamespace is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a2a4764e-e5be-432c-a94c-040964c1b3b3',
                hash: 'x6gyezwrzyfgfdpnrytgp4mlovhbs8lfuutmn44i',
                tenantId: '898dec98-f374-4ad7-a87a-d851c9767287',
                tenantCode: '4u19rbkcw8kp6jdamhrj0r87dz4lh2yyhd73gb4kpukcb86rj7',
                systemId: '4abd9833-c879-4526-9d1a-a4541084b5da',
                systemName: 'dpwofmvf05cugueydcfs',
                party: '1ojbppdp730c62m1i7to9r5r0g29995uf48d5wzyt2uk9ig3naju4os35v0uao1mcs82jfm7s4imsaxrkezxv86tzq1y2ldevpdbv0i90fnscqk7mabuyqirdbhaf0u5mz60dje9ew2yqrupzttkinpg0sdnrx6z',
                component: 'dxh1epre35ro12gst5kplg0r5lpobxnwo6wjpsewiksa5s7nzy4wvns9bk6b7qh9qnlo5si450ntymd0j3noa1n9mxfl77f4qehddyo9t3cdh3qac4y4harm3lqlzt3b9xjdy6q8ffajjmagt3n42xcuz14wd4ve',
                name: 'zix13x78gwvgme49wlgn2izzecm61avboh7205zw6dr67jrvcjq7fkayfu4oy7h00vmokdh6u5qf3fa97b96ic487sf80tt4bjzyhs3t466x1d0exrr04pjvw03ub9tcj7w9etznk2hktvyew6a87mdclnvx19y8',
                flowHash: '4r4gofpam27ri3ve5475ly9behccyrm0871425zq',
                flowParty: 'k3qvhg1ex71fd7jz9iamcd2bvk8ip6w1nu0bzhp50lu84pk537quzmt3azdcu8sdk82gn7s4d5dctyltavymu1wvzsituloj0iiqwfv539l97ztvp9obdysb4alxhdiri5lq4czwvo81y89awo10j4l0e4a7x6ap',
                flowReceiverParty: 'wtl9ktm3ptm39zlihw2k043pgppzm0jget1frjt9x6i365186b7cb0hwven1rf9efz84tfv4p7fo6jdr0zu7t61cw4duqb3v9wtrmz6hp0umeu68yqkxo4d1peeduq2ng9v8jl75fytw76eodhlib3wdyyr6tin3',
                flowComponent: 'h6fe8ipycbokfhw3224rsiw7yzcfzjloydjb692voz8im7isk7g64ui5ltuvvgngtg7p8tjt8v8xjisjulh2tkbm1edhyn3oaq40cqqvonzdhzzvmrrv4uyqsrpsn3r1ezi9f8em0xatzfsljoj1sa3dt6r2hy97',
                flowReceiverComponent: 'ffirntsa5sl9bsz54k7korv5zlbwgyofusvviv7dum4jthf4quigbiis02w3thrvsagqkou8716c0v17zhpzirkvl8o2rsahpkf3587kb23cvdxhyyuxiwfgd5tdwknxs1sc55ayjl61guoss854lhebijhow8bc',
                flowInterfaceName: 'qsak7trk4u0xrcprw0unnkc8pbi0sbh2hcbfept2xzbiu7zdg1czld5ov36usx802oni8ekqpx9e0od4qjf1dqelyzjlbstqff9j7itamp6ydan1780qewraqsfhp3n2y7jtdtrrtlmqmbypzg4ssxyvbqbzmmnu',
                flowInterfaceNamespace: 't2aum7lsr9l4dl5wze3axtp2k7mvs6x88s1elmk3vikua27lffa2yft78y8k4p1935min00suq6f5sbw0sdeuy1ywuk0gq4hewg0cfpe1qmsb1eri1rcbra0lvo1zpxz1uvzdyewrrxr47kci24wa5pgedbkf0w0j',
                version: '5exztz5o53m5flk4wnfx',
                adapterType: 'cmqyyxuywdvr3s5bmaikcervmm1c5nwib6zlxx1bee9juf57tmsvj22y0ctv',
                direction: 'SENDER',
                transportProtocol: '6zz8sisv01248pj7dnngxxuqrvp7z1nkkh42d4dlql0s6c3o1n6q645psccr',
                messageProtocol: 'lngphx7zr98ed5dxb7hhma63jxoqxno5im8dbjunuvwzmuzgb4x1sc8jnvee',
                adapterEngineName: '9awo2kbai1ngcpt0vx7fingyyy177m4hvff8sfoazksca30eoeg8dhc3wdt16flvju9xcj5c7x2llevn6znae3wl3m4esuncwmj8j7yiuyceruim42q821b8y3uc5vka9h155tf24wzaefolextyjj5i11h1c5yb',
                url: 'z9cbulbihy36smu7ic15h5pw7g7xy7eq66p1t1vrjcpqh49t1fnkwnb6xqnaexib3uboqu0zul0sp1lfqryni3rwh35lkftmbqkrlykjmk99gpc3kly0xirbpz4h8ciwrbld47m0m8or72velayohfvk6kjj3l01fvpute07f685zzb37ezpzadorqynighwyvjpchfg92eh75ncxcc49dynqct5myt8r64852ausk9rdm0qas1hs7ukhxag27w8z98j28fg9z8gmnf3f0d1cv47tjn876s9nvaqu5d71xp8b4l4np8z3vdywv13g4eb',
                username: 'op6yydnzeog0jr0czv2xfisroiatxy56b5nux1h8dkr8qa08ayooz5pgx1ju',
                remoteHost: '4ot2g1uu0xl9gg1im5aahbygz10yy8xyui0zf2wfrw4q5ndeucwr62m3fylsrln2v1x1fav4yov19ju91bg4khnupno84z0v1lsjpa4uxi2gp8cpuncpu85uizy2r70b2ntnlrfezyd9ipz7prlo3296j3fe3c30',
                remotePort: 1671244387,
                directory: '9ml7910qegpbqdglzafh1nvt32i1s24e6cb6nyragnez3hf1p4lfvs7cxy552gdgyirnwl70nca01o8eka81gh15agknjgi2iprfz0zwhz7nlro0p4dqxzx05jaebapd3ato1avcuiiqd98p9oxnrcbqgti345vwx2gcl9747uwnm47bhvbsyf6n39wvgkfxc20sq423isaxpw0vsbw4g6odbq680hqi2gzvv1371yfphiul6ufr9nntlz4q2chzaxfgyw5ud9kojhv4fgbdsf9dq8ifrv9mnjcnnnmae56caw8y3rijm1tn9brji7zczx8bh9lctqqx9q2njelv7uy93x8qinp22ehhnrc5e81wlv7dh7gezork8gsnv60vkyzvg7szwjzz2xcro9hhir8yqjwq9p4u637jvdksam3425v6leyh8fviltop1vgbnjlj0j3g1dbarareir4kiozszi84m7yay6j7r9mqzxfxk7ezh9n62x2ted3c71lgktss8kw28jlcos78oy0stf684falql89uvfc66p4cx8876lxae0ee0v45358fmlrh6h6thamghghkohbzffmboqz46yiie8soy5m4exrb7en0fc7q5n9bkvlz2opm0tof1swgf23m30npai93d3wq5wvnoe3ff8d69jfnaoz70pmumx4z5kvkg3c5hpa12daewgyko7d0xh5t7auuo80bbgd52fxop96n1vspt0ddog3goia7ws1mc5c0s47w9p858ttdrntukn0axaqbhodq26e3izlspumea6peqejjvm5kmhe8orlr43q0qzyp0t4715hzl99dikx9y2qibh1ritfm6gk1pwo6xmh7tr2ft2uuu7s6vh5p36g7pxsyvs625cnpgci8mnq986vpqumt6w3ygq71z7ouqr43ny59i0q1mx4ki16mb0s86wy0o8c2l0ukq7tq148c64gtl590nn950abro20sg6fvt3srk73iczd7zuzc93pvhqw2jzf',
                fileSchema: 'eugnowgtajuy00u58i9yiwwi1y0aaletnrbi4qm0pejqpcfatoiwsn6c8es798kpihewaa1lk20xqw8k04kyk04a084bjshvm3qf2sveatnl2dg05ahjmje6r5wf0j5g6b3koq5dzx5u6km2s0isf7evnvn5ev3023ippzqo2mgdtlh5d3z6ng1taydfh9fn5s4u6nom9syecbk4gqz7wco7v5a2zo0wbv0ewndkdprg9kuam3jn8ede60n9fz60e0pz5o8kysht30zq63lxuiiku55wh4s8jmen80e3x2m7r86guohfv8iui8juvg3k7donk0nb11dggs1mn8d0kanknrzvz2g6798r6vrprlnr0b6eeg8gq0481cxj3qturibs46lsn1qb3s674fj85iupwo1oxulw8w0mfzvwtf2lzs2bmymdoifuulp1jznf0c3qegm1zw43jhjybsnyn710pteic5g0wxlny4wvutu1pi6opwqxygrj58glt25leinpvzqked2f9t972zulexsryrqi8jbr40draurucpzumlhv4whd98h8fnl2m6b0grorgg75ikm1v7oz7ld7qkc397myxkatqzoz0lfb0tyvckibeyh8bbtbbd0soyolt424ujcv3snz1zvly3a7jkv7sh54vw7lhln3iadd1e9770vxzcfifm6v6iofz9qf19caydukpkn77r4vulj5npd69rdxw5i8au32gvu6f3uify8iiirhmaf1081ettx2zqu4l8vw4o5yqn4z2hhx7z7mdwpdvfi61zfddzav8bb25bx2isayuj0juwwywz2rngxf6tbkb2eak5mmikc8einf8sp6z2y1yi72pt0o77kso240hzhs3l7k2iuu6rotlm6qnmkdh0sxaw1yzgkepdoxkvqhxnq3tfm0prgpiv8xi44n06dagq3h4v4zpxqevck3xodggyusagvb5oo33q8070w79tqmk2lnqvlrk2zq9fq5wv2browu5t4ly4sb',
                proxyHost: '4gu4uf3au7sqqhnb3y3n84c4mtfdfy7jz996wnc18qn64047tkexi09ilo38',
                proxyPort: 3410357902,
                destination: 'g6ttodgub66arb39mdv8rl6locnzp6jpzus2s6txtu7dwwm7yrdr520mhnjaivtnwrj7tyvy35q8bjvu9my1jk716rjk5kq3fhxiuau8p2dcfqvrimzozmyfxs8snm2whw5d21yu750mrch0weckcte3zg46fihu',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dh00jqed3yq4gimffnjwca41pd2ybqodif8884eqtm63h59txen4775jtqpyh5spkm2q1l5k37kvrjq03fywvit5ege44df5us8hin62106y75ahj141hpmat1o440l4dkh1ovpc3yo1061144hcgcv892jx56q1',
                responsibleUserAccountName: '3vr0u8i9ue51eu2n8tus',
                lastChangeUserAccount: '2bpr8v14qtp6yowc2oqj',
                lastChangedAt: '2021-05-23 11:33:50',
                riInterfaceName: '0b32gk2vvqp2t82bt70w81kwkbb5p2m7swz7mibjivscaqeiqcthf6hlwnfux9k6f8owizt0vyesb1r6856dny7h0rs4udp5hzpcjag5hspx3lnn0b2zm931k8zspdelpjcg6nra999fvzccpusharcz6lo9erli',
                riInterfaceNamespace: 'lhu7t0kxfc8f43y9uvdt0wtwclv8l6js55qhnxyca79ifxcqxdb4ur669gu81zsv69uleqyqeh4u4stcsn829sgiux3xdual2afnotosxzvx71xl8801zcxid38b9rv4y7ro90xq1crxhmw5jp6pp8fmbb1lx5jw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelVersion is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5793d4ff-fde8-4347-836e-df98c50fdc07',
                hash: 'rtc3as5qcpo3e7fj3xlxcvm3rqotn92s7j2oa5wa',
                tenantId: 'ec033373-9a24-41e9-9f68-787940168f4f',
                tenantCode: 'dy3esmhwxh7ij2ppsvnfjtvdapi4po1pyaca9iin8g3ybqn8d8',
                systemId: 'e7875ed2-bbd1-46da-9ef8-1327b3060b31',
                systemName: 'ss1ov6w5up2kr6aj80ar',
                party: 'zecq3sscyauzi7j9i89x3ycdat5lh53bho8qb04mbor98cyigxxchsdhvhq75j68hplmcwcs221uj8i7nu8gxjv48iebcm99rk4io268v90dq1furaldjmr05pax7ga12zkqw6irktu3iywrtv10dg5l4kww68sn',
                component: 'q93rj4q0u9m1xl45vv81ud142so7xtljwjuz6nowwaa3w9gpzy5hhz0cbl0idue9vxojl0cdga11kkvkwrkn9hnvnlyeejl1fmw74jg90vvhd0avly6hg86pk3rxk8e42lc60lp61q2l8me5ldyg7h85c72h9kme',
                name: 'y9tmsxglird8uxdv1asgis90cnvekl0hebxiyznkq5dnv6t48040jva5ty6tavqrhxbk0e1ictwqi28vgp4btmtxp876p1hyoh2nxi9cax7kw2kdy6gq4iudbuioojee9ivhal6tac9uni1i4zv4jlu5stens3y2',
                flowHash: 'zki1d25j5vblijac96px8ataynri11kecmenu1wh',
                flowParty: 'ahmsvi0yz29evskw80widc13ngl6bi2dxdo5dqp5s5ev1istya6qea8o49vl0hjnhmol1e34op0c2mhgpqcyz1qa1cz8n0ujz3jattbza435aextnxgtfkbox70vdghgxnxnmcfqs48jikua30sbt1sxe1ksbve7',
                flowReceiverParty: 'vc91z6oyo92sr7zh6tudjkx525eaaplostix17vkhwtrs61s04sc34j7ik9x6gj45q8i5h8lwjyz9dhgrlsbwe0m7xaldswblrlnfhul68xne4p5qoqqchnt61apkn9onk9dkk60379b31tgn04b0kq6b6k2bqvf',
                flowComponent: 'ocind7bzkxdolqk6mwky9hxl3tnzornt70qzvfavq6bja1xeyrbnvy2qs4ci9rea0rqlz4v7n5szt4k7bxab11colbbrgsniudbuz1my1jsjk2u1p439bqouh7ua6wsixcbt8ezoekp38go105ddhygg3szjds2t',
                flowReceiverComponent: 'coo49p5bvdqynsckqmhj864t3rtjkel2m0pc3jj3osf2z7nraymiemphl7vuilf85uidsrlnywxx4j28o6lx53s1g366ebrj7htondi29zfehy2bnfr36o40vvfeiaqisyab06w51ubamrjhs2gqt9vdl4m9mitl',
                flowInterfaceName: '5ob1gocw44ukbvml2rn2pil9tvoxh6rqd4d957z6eki5p38h02o9xybz9xzwn0m6wr4g6icimhwi6j1vhj8we94y1d7txybltzva1mswow5hgn8t4cnqc5vrgzjnkonyj2mik8y4pb4bz1vl2rmcocapjnce4krh',
                flowInterfaceNamespace: '7aktauwv9vrqngpxb75lunnokv83sskkpoevp1nw9hu44hxpsq8sxnggrmup7036ml6mc7iqhkzv9jpalaaeflc3vy786yr15d63vi1qwzxmaasqco8cs4azr3o8lfp97cwohjkqcjslwaha4xi7216mvhny75so',
                version: '1heylim0jixfoxt325n7r',
                adapterType: 'c169csa15gytb6mix2cnd4arma9m0oi3t4xewadvcql6n1nnl2p1p4bmn48k',
                direction: 'RECEIVER',
                transportProtocol: 'ckrnn8h1h5fox84cifs4oz4nhatm93v4jw9cog5xic560pyaupeil9agdqnf',
                messageProtocol: 'q5psfit0547auzw9mnixpm9u7okxo0h2eakp82pckapiscwpn10hqq2f5kbf',
                adapterEngineName: 'yhmbjgviul5wlwchgqflem07n375qrl1j4w0pohkkgst3sn6kjcc4bd90p5iodxtvjr71wsr0pfp8u6ws2djt6mj9jsiuucb1ocxj1tej91wa2qlc3bjpnmvt0f93jk2kf5lvfkoy7u01n9myxphop27bzy0z6z7',
                url: 'kxm7jmwvey5a74lvdykadj1z8vhn7lg0jnwanax6elmt39f676axu9yw5fj8mab4rqmi628h3mitwj1zumlhoj7470d37665xj66pfoi45rlgn7rmoasnay9jw39qz2raymrfu0hh16h7cm3else7xwwibv0pzva4103px8sxi3097rt0h3a5vaxne3ozcea3ntweushm6ik0do32gr2y9izwf8t4h1svnqz3k1fhrala1dadifqcgpb3vinc4dt945jrmumvg00vfgz708d7zyggpxbeoh3z1cjv4rsk2o7r18d829zxawc7dj89hwv',
                username: 'plr3042sr794tl40xe7pkiiiqacrt7jf5dstkc8kfbhs62z17emyr7sdp1bv',
                remoteHost: 'vg27f56cjd5bc1id5e42beor0443zglfopvgu6k0at9qcr33e5g7e5uylmics0p9lzsdnmhd4dp9kedjm1vrr5i5q2u7lzdo0fwj5l0jia991j1fn9e2jq5emcehvbz0bnn84eoa9dngs8fqwfpdez8l96jb3qjb',
                remotePort: 5677868190,
                directory: 'q2zecmgmrwkaxpkdkwtmioaxzovs3yga7buc6ga18czsqwicv1zjvxbdi8sue87asq0qg749z9aoz820qg10l469o83fzv1elb327esfk9bsnpcxgt92u9ovgasduz4p9kzwhwztasewagdzu9fk3igoda44gpmp3agj0h9vc2qip7msgy54o4fq4u85tiw6lcxjf1wx4agfnxemjqvy7ypmci8nkjyazuuz57sssctx501fevashdk1q21l35pi649d7ijm7tp2tzqxwhmgys227ge4xnpm5cdwzducnxskcvf4clyrnmtiwhdyl3r1i1j4k2dcmy9hb7bl7w5cnybzvdhbs4jckd5en6gr97s41poy7q348w237897t04o3pr8bl55d3tom51kmn5wxqnaguwcubvqcyfffoj4azthrc3tcz5r42wzq2e8n5s26ec60h2o5dxeug72gn1j247kka80um2asmabbtq53lzbnsssrpui4753rulekidh9v4r3pf9ku0if09t1d3ywgf25xv19senfebko7kfiugngp4q6mowd4f97womt4e2glzk0a70cimra0p1h0t8mevwti1qtlex2r7m9akuhg1t46r9b59iwhqme4qzur9nyjra0iqiqhdng7e4hsgi1r9exxugcmj4sywudj1wfclgo8pxnt4zk3ecyo3szxizqidw7p49sj2ig8wceu3kzrk4tm475dkxypt23qjjafw09x2ot1yek9p826jjlcvp0vsgisfat43hw36hfonhsgrktdspo4tm15u3lfn3m6ckko73x7alddlnk2hbrtvm7bylwaca7a8pu44amkhpoyvd1ni34hlvkh1mbka7nj3bjd0044hicfkng8z2bqoqpap0jl31g0xbvfy88r5ukq9hi5r2mchs3uzb86np34yd278uozr28yer7flmsz8tslmowb96eta8k8bsaixqy92vasz8seia94ma5n4fubr3yn5qumz6ep4wv4djdwv7',
                fileSchema: 'bagna6msusaudqxg7hfm670jb8ffmn9z12lu411zv87e7khqautcea644ifc4l14xew0mq4pwy6d9rssg0fwhjhhsmi3zckki7ycxiz6wqd32e719icsh4x74thfw5g72ljbbaj1jlh7topcurhjw5zwa859dsiursyef2jeceddeoh34eecryaevqxw0d0t90orpzwnhgcb8wpviv4bro8312t7phjz4ipyphgq7r9yj85jw9kq3m6x42sh4uld7xc802jr596xaeetkefyrsmwqrfkzceeh819gy4wkalhisohc19zsyxrg0eer5j1afg42s31gsdvfx2zrgyqc70957djpo38eerazfborospw87vme4shn0nfd8wguboro632s4bzepxysmqldrs85r2gvo0c0kvj64sqctrlaf9vdz5a0tymegvoaawosmrdd5frwv23tovme7rpwuvb5kr64t5qnh6gza2wdwc769vlyldco5jb4hl3uv5lrxq7buu9l4lj9tu59zkoyw65chy66c3xe2k5oi00e9g5ainiqbgtd4xt6jczjic8ukdh3e23w0ik3tmpmdthkjit0thzrmb9ev0fumw2qq03ks1cq6291zt982gyaftienmh57e3u1nh0peppdxii59v6p3fup6etfz0025a1myvxflbutjaf3mub3rs1d1v8d9mp8qz9natccvaxnrc0jw9xkydgo1sk925u25ucoxpagi78chi3aphyczzak6h9stltlnn5e7eeap8f600pxk6fpm5oe7rzzdnji3dojg3l8ppq58ax4cw6qlb5ei1efays3kjsw017pi20chlvwr7s3kkzdy0nico7848cixcqu49yi69rrin2gtypgbpnax87a9knoonssz77kcbw5hng7kb3tioazspebnsiv9r4a5b1j4gr0b1r5jlloptor16qu8yr2idojwo2082ja9vyb35rzbgyngm53wpp2eqoysz8h9jce7nhrza4f8x81v',
                proxyHost: '16pemdljp0n19dmaysg13brvl1v5b53ul2sd97xdqj3k7toun0lumrjhl6wo',
                proxyPort: 2334024355,
                destination: 'vocw1ndjkay36ahl36ej0rn3ef2deuklsyk7un8h1mrvvh37ui63nu8bqori6hiy22atw2aaafk63u029y777ng9g839hq1hooifw6vejwq3ry9abta3ut2a64x640iz0k0el5fsmxslis75298ghpf14rp5pdz7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2x3ihtvswilewgy0n0vn4294po9uqpq716hbrixb03m6rrs5g8zyq096ojw77xyiy9kpujg2oa4vr2a5nlrhw9rnrtuflph1c7vky9tv5tfvh4bn7w47bbq8f6jqc1qqtu08nkq4n1bt58t6o53qxrgp3q5twck3',
                responsibleUserAccountName: 'z8v1eh2vp1q3rp29462o',
                lastChangeUserAccount: 'lv6qemwinetic6avhdsf',
                lastChangedAt: '2021-05-23 11:38:59',
                riInterfaceName: '3iqz2f74869nft70qww0wcuw07929lcdg80abjjyug44uet55didurbwhdqx2hziw184cwstcy7ww09s2w8yaylldc2fxsizeniiu8av21w5ejjbk0v1fds9pptzecvu74r6826smw0xi61k27muw3ir4gvpq7wn',
                riInterfaceNamespace: 'ux5ihwxwr5hwvltmbe6jpf1ba3b9h800yb0gxvu2jnrjz2bytxreilq60gqprglb00yhdsf8gh4hpes4wgbig6asif5nkgknqur87j7b1qo3k0xsaqnao38u61nccncrwv45miubcacpfft43ucstqwpat9jih6q',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelVersion is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterType is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5b878fa9-f97b-4f85-a02a-4504c82a14c1',
                hash: 'mspeab27t1vpkh6jbmzn3val7knrovbvvv1qz13j',
                tenantId: '32e4f1cf-ed77-4c61-8efb-fd543934e1bd',
                tenantCode: 'gpwbc8okf6fm25d6555zn3iu487hp9plwcd3eywmvim0p51wn6',
                systemId: 'b4a2607f-9881-47d6-ac48-e863eddf30d7',
                systemName: 'uo0b14x2sa5tz3ws9bai',
                party: 'v5j4umgs02tg8p73v7wstukbxrahnmxnla27qt8onjldal8p99pbj9plc1lo1j0bouh5eglrb5xk29td2bqsy4fi3mbb294vk8qpv76kqz8rmvyhb8149o0uduwfgv7cow3kw7pr5xlpf69u8knwyjbhncdn0c2h',
                component: 'x68ptjnd4vjnlfvt8rjagubireuwctfj49mn8jhgyid0s2h9wpdu3h396yfzitn1i6up5zae7ld00tontrhptruc10v8vkp5dc0iatn675346mmfc5d4c4lmljteortoqvdujq4jx7rjd60gll1v24eeleu11s4z',
                name: 'qk9zf33p82bavduposx56dvs116s09d7bk7jl57qyd90ccev1kl0u4srwg3gg0ynz6nm4mua56buf8i7wx6tmj8bqurb7jit2azn2nro4v7shf9j2k3lu4iqanupyxwd4yn338jgtym0anmyfheip9z00ksev19c',
                flowHash: 'hn2u2o6x6tsac6yn07yc8cnik7vbzfadduq4acwt',
                flowParty: 'x3sfu32mz4rr4zeqbu3gtfnxapwslqjvmwbq6eawm7btp80yf6af3uwvzrofbvftbahasglavos62twnui6rlhb9tk834y81w9elsxyk40xlgk1t9ijtg1usqsskixle9leq2y1jb90aaxsg09a4cinqqtb9zi1r',
                flowReceiverParty: 'ejiczwqoiw5jztfyiiljro8dtgk349fpuush7jlkws36a9ngpz6xf3h7a90797jut42jd1tvdcydbq0mdoxuc2fd4ur8wwu0lsvce2xfz1fywn3pu28vzel6128l280zmre1t70wkb85h1pfdgy1anoptntvvwng',
                flowComponent: 'w29led9jf39qnfqcynxg79cvpoyqmqr4atwrz0x33oqb0uv8fk95aw7if75hawforv83w79m6py3gnzcc1i37t24qcvyvdnpithborxhwtig40uvqfgl38834387tcgjgsom1pjphry9o2xhs3r4pobpsv5lbhnz',
                flowReceiverComponent: '0kqoriakixcotmtqfsgxsfy20of2vfb3mnowcsk1r052ct5ehjh75lpr14xvpq91hmnivmnrgyarr6i6t0vczityj3j5rmt7ydsvxozgjy7538mcce0ds9uxsxp1siccfqns7me01c8z775x1ioh8px2094tflmc',
                flowInterfaceName: 'muaut5tdwr9l6ktto2e4xfqni7ze5oh2gj2762h87h1edtdwyctthgfrcvv1px0jwy8anjiore8t3ngprsw54pf11lgpdlm5zo6f74twac0fz7vl9wkb5u3ms45fn4gtfy6g3w7fxrbhf802oewe69rqjq10iikg',
                flowInterfaceNamespace: 'qwqachxl1468ujgrayk2oc2lhwfg7q05fcyg3oywhm3hyvcv1kgj5mvfzyrkzl9nazg4qvfxbnkyu4la218lce9wwdd6qoshmgosjkxpnx316m5xj0rbx6c1khmiwrsxf4kyh6nhr6toexn4ah7qikrggpaf9in4',
                version: '4xmw3ulmqqy87qwzky3f',
                adapterType: 'lunst11h1cfzmoson5yzfjbzth6bfbdfbnas43xdohhjclztgxft1uj6qr6ae',
                direction: 'SENDER',
                transportProtocol: 'chutfxyp0jhu548k6zaijdwcgktp9h7vlfwhlxd83s9m07mrzaea9le9dpxs',
                messageProtocol: '95wtd35r4qhkb3v6e5g107hg8l6fbbc0251wbfhgxtqr2blgmdzm9yhdd1yr',
                adapterEngineName: 'dbkrz9tdxihgqumcjfr63u237mwpga7kj4dw56fjpracdj2qayv1ppnco7mtggmmbpjcmdggjkp1wnlj7yq0bh5ctlrb4gqmp06hjj6s016c7qwwp6sgbtwozhgqt0zb3ieyege2npipfod3eaixjq976xyjx8qj',
                url: 'mlzgk2evca20i3pi4ov91konn9faxt1fd2745doms8uowlet7r9b7qn4s0x66x4rm8iqzzs0l6dk55x1t8h9folnmg2z5mgl3eb54m51w5ghiv97pf3agj0pve954xubhu9j3zleql6ygqzvnoei8bdaa4gz5ymkoi4gepgwsumes550jsp1b3vh046by84kuaix8idl43lojp6a72ro6vu0hxpnnv1zodppmir3l1qhsypy8jey2hu2t6z14eurt7ct0f8z9evssov5zw7a28nixhymsuwbkubk6aig457nf6piqoik2prshzf21xp2',
                username: 'nxs4x92bfu1b3l01az0g8hq5hle43tgws5a93pmplhlhazxd436ppxqzjb00',
                remoteHost: 'oc1lf71x905671gu50gyysnk57js8rdt8meojbnijxaoucrtticavz9ueuwj8i7m69eal7s933iweo3ix9quxxl2f73cgvf7bzuchvvvaveu0ztt7jutwwcg5gclxicismzsmhbqu7f0sze9el6d1f9fohyeuv1r',
                remotePort: 7943020784,
                directory: '0jhjimgvrtg6skf0hb11ncb79u9tgpsp7hnbj549lg64724bm10sodp5j7rpr7uevkh3kcllk4c4xo583fbsco1fja8yclf6osnvqxexvmjtlvnp5zkc6y3ws5dpqx0kpj6o0e9gg4jme4jff6vmuw1h5igo3eiaarit3qztsut20rapj6y1ldq9cr280ag6yipbof1l6dqxwy0z223igfavkrxscjr9z1pdhiexcxx0oktucmhe6pwf9hxmmxh28zh8v05404vwy6exxi69d4nh1x2co4ua62lu77mp99bspryvhh27sxyg14kaj4now894q8s3l7674bock1zho3ar5qvl94nt1yd0q3n4boz9k3bfhgze1vxxct8szz7densde1s2ms3yuzutxq63r1e31xntgeor1l6bebk5w0o9p7dy87r07ldvrguii4ygpp0d2i1sa057okegi0lixk7qsh2qss8r3kv03au58p4o3btss41nr6mizg3y9il8f1mu6aiaf8z34da9odupjdc06bd8zctkd3ub869f5b13tsu4piwmoz8dnd3a3tyzdkk2pbtkt01qb2u6ifznp5t39y2vjucodh39bsjzklrz8dxqznkak5bg7j4wicm7fv26ydm3zhfqxm0t7ba8gmcx9eaivdygqdkm4obdui16uka7w2uyi805atnfl29dccnoqh8qlalfpjzs84lwyukisqjn21c3nte9vprnnhz9qm570tkkg2u6wwj2b6r09pae2ntgi54wytnwyiqtgqif7eay3lx6ybmh81tps464gsufi1evwmnhm9coslbx9cij8olb1gaflgvst0275igxg6d2fux4vkfzpr3qjzm8nbdywm1w083jzftsjmze0jm4yoxsasqod0ktoeqkkt1h3tywkylkqbt5yqntolpss0ynufrngmqlygy1sssvlag0wwf0gp60kop39bcc4g66dgeyyl36tdtowbtm1k9z9pnrnzbzuz66ezi4pcby',
                fileSchema: 'ypx0op57ywum1je1jqc21lctpu3k9hkuu26g3n6n28cg5uqkry9kz4kdu709y5jdjyc2jrpyyuccf8ymndq5as45nnj56mlk9ebpoi4tw56i4k86km10h2wulr3izqs3nc24w4lpftua3fw6jc2chrratwoef2l6h7r886qwoy9oug1n4mloecq3zt1ge6pxsdni4u05say3303hqj62ful25lm8op0o8axqhn5gz3fhnvqexjc1fbk95zhzcrb77ouitmju6zsl8kdre2gkb4i3u315zhv1caljeu0wds98s0ot2axmpetoyakh16d7km7eqnnpr959fb0ym7i5ubqbn0gj3evt5a1sv83xszcsa7qvn4s4z1yhtl69plwpjgdhh2nw66bbz9oshnnh7m8qdtuo5jwggg2pkrnzcf04l78pdhk9t8iavbql3hx1j70ipx6d06vlwrlxdii7phv8i9xlon5bhdxbhrcu1jhw32xwo85unw4xbgvnvwb3f9g21y5s7ksaxg41v78m6mxtm3dd95pnyzo55m34uc250dk23c4i39f1ccsgpyy45o668k1k6vpwdmsqvtuteqkshfbqekpd6pufgytjzg9db24sfdnpnk3xvytqp8dyiab0ouzob5o116am06ph1obw4zyi90q6fce3nosag44y8bbs8cqdj67szqaeqrva3n02q7efkv61w6v3jducjoq363jy429jmc88x7xxd6e8ta0vsfjlrxowsp3dg2nhjhwjk7zsclg3j5hb67n9nfl10uao8mizy66lj1gx938h72gep72k9x468fvfhlzf06lywdmn2sr76qvc1ivwl6cl2eoso0hf1y85qzfustxdmjj47lhr0yucmekcznqn0mnsxb4grtaocp6f7mup0o10tj6pdaos3ssam1v9zkzow1ysz4io2bzsdcvbmqfe5y60tz92jdlmzpzkdickqfsajowsz512bdxrslf1g37iop62wz8lt9strrkw76ro',
                proxyHost: 'tkqqem6gr3ohcoi7ce0rvo5eqzqbzj755t5wy802wp5maooyzgppwwa6fomn',
                proxyPort: 6183751928,
                destination: '9chl9r96qepezwy3ad6qbasar2qusqyb1idqhr8fur3xx80x5k13kgtitvg7j7fjmff2zi5xs9ec7wbziop4u0f2n1ad6n5qibeuj83uygz8wkqeblgs5l2h8278is4gxv7nofcxi797fpp5xq2fvdkelihq2nu8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'm77trzp86z4bid0t6zegiihv6d89cb77nobtdq0da51cdpf9yin498dojslmt916t4gn8ag867wqhdqw4qfydo10b3q0yugi4yhckuyb0s4rclryu3rbv9z4qga4z8kxgm7sn4du6raf9dci4kkuulra1urywiik',
                responsibleUserAccountName: '4frcm8a166d5q69bnjkv',
                lastChangeUserAccount: 'hdy02edxymqotgtc0os1',
                lastChangedAt: '2021-05-23 19:38:23',
                riInterfaceName: 'xel4lzfpmkkfofqtepm6bt5h5ichxg6jtbuwykifupf1jvsq9e69nrxpr14sx33lrfpa2eeuud5htc40363n7ervxujn1lbexmgecqvgmntvh43bd5ikuqcj8i8073afhytrtm099pre8hrwo3e0nocsd9eoj6ym',
                riInterfaceNamespace: '6p0c4apt0vmxzrb5bztbb3ycy110tsafxwgwr2upj527mh11eqetsf5euqjs0l1d91v8ne9vjyqmveae3yfaisde2z198zt0pezjcjc8j9htrfckvr4w0jg1eupb3ex9h4sx21hro1ahvgutgmlwf7yjupdkg11r',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterType is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelTransportProtocol is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f03fd691-fe3d-4867-8787-6da64cddbb06',
                hash: 'kb8172ilnnj47gjnl459rjaaameu684gfdrahzfu',
                tenantId: '83af2437-288c-4b03-9c9b-9721c85cd0c6',
                tenantCode: '0iaf720dgviwinomirt3ghu003k630939icta0dsene4vepgv7',
                systemId: 'b1c35851-cf7d-4c55-9818-7e66fdaeef94',
                systemName: 'rf5c2m701ovglqytp2j5',
                party: 'z0zrlx6gbtj5y311rlccymmut2k0hkdnvz34pr4pr6v1db93n07qve656tk1c75h041qrsjviq9vwuo2hru5mk1d76hgzq72mrux3p4q6xb2syuhpx7z2u5386b2lqww5ur4z24n58k4rv1duzepmlmrzat8vr0i',
                component: 'a67bcziaww5mk49zhqih5hcrhk9lxrvzo1s0tlklcyezfwzmvjt6ler3zm38wjy22fgg9jt2exot6ew0toix7emjf49xca7ha2vrw8u6kbwz85kvz3kdrxlncpxg5if4o458qr8ekx63ai6wpektilq7luobmbju',
                name: 'efsq2d21sruhr8kbctd4j4djg3uiby9350ljns6bmo1y9ub6vm4k9re19w6pysqrdpma4tv0fuqu7vjs7e147uebp7x82gbp4wfqkfw7sfw2arwlo08ybpssx9i9pnnzvm6w81y2zs306ugt6d4ypdduwou5calq',
                flowHash: 'v6iku9cfnk6yfrsebadyzev1z0bwoyph3xvrjdua',
                flowParty: 'hxnl17a11mfdivmel8pkbu2e9gqvx6dxzzgb8g4n4zvjmerqiro6ibadtfjuwk2ycz32d2g1vwb90p9aibq5tpdvbuji81incjl0nokes7bv28g3vdno8ami8dnek2jlky6zyqdb7wvjfa7s0uvizd9akntfdj99',
                flowReceiverParty: 'niin9ircocvn7o52p0ja8or3v99y2r4cj3fhuvnz2h1kt2zz29kzbfh2giw47kzuab3vwmthw7he6xk5hiowro22gt2s1vztn6l9lqm1h1lp2o7re9p06fxtwa760e1jhwq8u81mn4atanuu14a3mwhqyxedcduq',
                flowComponent: 'dfp4nn3fy9sk0znlvxt1mmbfik5wvok5oifqif93xtwox4bk0n3afj2fs85iz2newxsm2ibenjehlqx7yb7qcbm3quo93nj64adkewiraxmhnvp9bysvxshltxkgwab06vct2visgbfdqh7oy9pj8z6cad0lr69w',
                flowReceiverComponent: 'mgr3bi4vdoda13sw3eegjdiua02v3w2v2a99ezxhnmxdii7z4m836ecfuqvyakjcib2njd5837sq89087csszy70q47mturp272n1v1iogk2g4s9ovq2g415upglkhaun13z6sq2znkct9r5x48rbkqu05yesjbm',
                flowInterfaceName: 'vbr8i9nidtv3oaupwq6fco0nj779wgvyjiytffeunp90us6s4ed5no0razj34ytlcxnslkvl16pqgobwnsnf6eq6j03qxltqeit9bsawcgowq6fs0wc1er7pqskaz4lfdg5q702k8osg3hfsog9xd2w2ad8bhae2',
                flowInterfaceNamespace: 'shp4czf2vqk6kiqy161z52gq0ifit2jgeqgn69b7e4d6cpqzfem16tyavyj98uzhpgcsjssk49u0qxuy35wx6jklro55bczi65dwzcm2xx91vc8cnpba74f4pmrru6lgkriljzsql3vuje8wcwytmqkzi99jxmxb',
                version: 'ocko9rpre6stv47kelae',
                adapterType: 'xxjsdkzarjd2ufhgm84c0966ns0f3d8y68xo0nvxtgzcml4civ4f6n85bbid',
                direction: 'RECEIVER',
                transportProtocol: '44i6rdkkl83xdtzp87zvk2sekgjzywlme0yp47ehay7tgaf9o5gpcji27osd4',
                messageProtocol: 'hy0s8ec4lkgfa5lazbxxl7w0q5n8yr69b246vzt87nk6mx28fmmprsrnvqka',
                adapterEngineName: 'pi0583f0fhss8yygactm4hbtcry8rqt4zrvhj0jhwmag41tvkpx4p90c4tewcps0dhk8vtjh0o1d7urgay5fi2gz8omtlah1bzixj5f15vkyba9dc2j996ag8s6c0908jvqbmf6yxsqyhu8xkxy5wpecog16tmpm',
                url: 'pfea5ldr11d9f2vzr0q18o4ikyq7pqx83bazri2t6494vxua4nkwr4uchzre96hut0pumbd52oalhmrhynea1djc00flppysdvu4rllsz53r1kgck5exisxdt27364qy4jijp02u8ufhlnir96p0kylz442tpy9xrnfvr52lugvvssqlg5h8q56p92rxbmr155tfc6nb6lc4bbtttpb2ckhhtou76het3pzngbmrd9ybq27329vlnm4g0pisxkgsrna0psbkxmcq68rsdde77wmnob8f97p95m6z0r3vzzrhplwrokmvnizg61u4ajjv',
                username: 'kjwxksgnypxuowoqdnu4tf6rtnyj3anyw7a5rm2gzfnh45vutdko5rln86gw',
                remoteHost: 'c9cfd142b2k6coot6xdoglan2gvunzpr2t3quo9a709q2mrmwdjmztivxtwecro7seo01dfxom3x0snqex9ih4mh8h46q081nuc2e2p9du08mpf4j4zjalzbmf64bj4ffhu026marmk83qe051h42g78r9h86kx8',
                remotePort: 3570021673,
                directory: 'cf9yqxr0h4xi4qv96ibh0c4j77ejgkbet9iezbmy3o8sd23g4pqf4i3qzpmnl5z0j20rm2qee4lhe9075s8bugz3q9hrbt6r880ynp9r3buuhok0oc133e1njzg7o515ue9ui0hg2ydmv7jpy3qr59jmby3hkec81ht0cq3iux10trcnx8xzoqx6wrtuc04tjk3m85tozcpakmv49kj613dlwl7r8odnpuusr5jcy7l1sjgmc7e7w26izf0advzoxuklsn2rs6a5asxrx2lyfjmq7j1ga54w2l6k0jzc78esuzu3aqj9gw46ejrfdai3udotog1bu7jnnjofwn2l7m0g4zflgnk8cvhsj8tbegd08r96xoa83knrzct94rcgg1zslxu41knj3jtmmzc086epnut2359xrfp2dg0hot8628t7qfwcq69icho52srcpugtmdgrjxfmb21ut3hd3z3a9hwlp8ljs8vyk0ja0vawfl8ecrus9tupltdfyrmdaoc6c3fjtg88gq44qxb4judc5rkyecedtpkrtryjdkcjlu74l2oedrwwvtjenw8plxp16emvr8lwkd0fnlramset3lmugy3a37j7b572oqogfcd5mpb9hcknpm9k1976f69susnjh73uzim27aswr3l7phiuii6ckfz5yg1exq8o2v0i0aj5i30q7pvjumlyz16xgmjekoxsmu6j0njgucpxp86jxhpugc9d5s7wus4dh3pvqx6indwbbahcbxhe29deyxlfcfd4szwa6brirc7wk1yweux10bzn0oe35k2ih2swx9z0lvks98n5c4guz33d183wk62n1t0sljyrduxpk4kfsqeg7q7p6ki2uqmgsjjktud2lp93hjqh1gkdhyh0nrhks68lyd8s6j3bo7w8cpyo1oq2277xt8vpxmuxaehmgnyytcsgg823p6et3lo6wjhuhvs136zvbbapeokvqiq4n96hhn89h8b4ouhngfmv3fx8fgd9nka46ixr',
                fileSchema: '2c992d32h73wqze2yw01x4uyn2tla76g6wucq7m5wk79wuow2meceehb4pdfo1u70g2tdmzgun3h3arsrywm0tntq680zzid3e5y5k4z9c7gz1li304auk9cgrzqlcf9pgy7cg0qfmvc1y05cskv301vytzs9677qzp2h5vge33mpa8kijrg5dh3taejixwio8h397r9tc846kqm49agbpo8fyvdmkwt0dwr5qv7hga4r92ihefcwjt3jeirr0ezqf2ma6wrj2wdwzdngc912zq7nbslr61ptmlb6xl2gm8i55l74ifo5tn4fp49tzqqdpa4gke6mwcjgdcfevirct2z1a1kjo7aeiaak7wkosh4lsmk743l2ggqecegu7mknmd9u289gj9gfyqnd5y1yuzd2bq0vej7pa1bepe0rozvno8k1f0rb95o0754angfthd78jloq5g1ub6w7nnm9yhgevf5gs5n3nb0wwsczru81ejq8ir9srprjgz5rj9mfgt86bj6dkkzp1z1g6i0eq77n7j35tp2h66y2ftn3ygkbsetozutkdm9tcc72w9prj459g53uukuily9x1rrweezaz9wl2umyx74q0v5rp0ypavk9t78n7t64zite0uzr1wwqi2veu0iubq494c7rwy4evv226wrq8xidospz6257bwqrxiabedixamiyf08funvwz9g6r782t5cjez1lnyjs7t8x2nr5nrwfganbkr5yxj9k8zr4q3pvxkgxmjjo30xikaad7kamx99h4xiipeddqjnfa4yf55jh6qwu65tsd5iuk5638tu33anxh28xedugicvvmklk7kawk4umkkkna4zxyxfqg2ie1up7oux3e901ow5fls07wnmun8wj5srxpc48j6vrlxx0om8pmlyy6ie9b9t3v42ty85t6jeptwyvhsi6mzebuefhx3lw2uw11v6ttdfb40owskbo6x2e3a2ri00eo12hidzc526b70ycun7j0ofo1ijz1hl',
                proxyHost: 'vwoqoszy84sg059hhwcug073pkb5mg1259rr9x1hixar8ff3ovt28ckloa4l',
                proxyPort: 2633126657,
                destination: 'g0a8s58p0s3ltd5qtj2ee2nkf0npd9iruwh2i2254fkj2wh7j0sf42dwjap2ifgqxobnecs6zyixgab9wkpedhrc9h6656h3sqz6e049igqv5etjjc6odwrh6jmk7aayxioy2axnq957f5wjvxnjs1mzot2dif1z',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sog9rqa4bz7g0xzn8pr76cfqsl4dhygahn1waaphkz1xagkz04tltrobdg4scncx2fmn7ky4um5o8i09okwgqesx1mlrmyrre7owqo0bk71iwe5ps6bynwxa9zoplab925huka1pn5xok03405ximdpkof01zpb0',
                responsibleUserAccountName: 'lm9a9uwh7egzhugq0emm',
                lastChangeUserAccount: 'ey772gogrr3i2g1pq79u',
                lastChangedAt: '2021-05-23 07:26:02',
                riInterfaceName: 'e4p2u0sfirqbhw2rnsintkkr3dpq2v1z95jxinpwemfeu8ryd9xfrggmb7d24h8aqm8qcxa731wo48hx9vwb5pvf0se6i8fxtm2yd4qg6ogfgizb2jpfchtkzadqiwplg4f39ofyansbe2lsvou49ruj01tfh2uo',
                riInterfaceNamespace: 'qqs315lenxec0fhwhv18brzwm9wc6s36ii48yv2i90hovqdsjs3fy08yy1cjgzcdij8wm79z7eul6dye3hjc2hnees56ez20s5mz8kfocv81rq5hxv1fdxz4y2eo8mgarajc6gx2cf2bicrrpqrgpyk514dvxrpm',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelTransportProtocol is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelMessageProtocol is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7ba8a7f3-0e01-4165-b016-44b1f32e539c',
                hash: 'lz0nnvsfczg5kyva6cmsv5wqtp49p8kyore5gmbk',
                tenantId: '04ba8cac-08a1-4ba5-95e6-9b9a7cb263b3',
                tenantCode: 'act004urjgyyvbelk8k8th86fiahwypzjdosznik2bojd4brg0',
                systemId: '882cacc8-c1b2-4bf0-a584-c2d8cfb7d5e3',
                systemName: '5qwjp6swsprlvu8v2rnf',
                party: 'i0k2hfs7tsaerrmt06avb1gsytci031injkbbs2nwq7dv0mmetwmylow659m8zpohddbu1b1yhy79tzi4s32ee47o6ee34kis5954k4rff4gi5rw2vhi745qlsjvd6449209juji7z886jkq1a0gnqr7zxjkrr8h',
                component: 'dobkpvnv7kp08qhsogj093jl6np14xaprryltymllhslmo3ye24dk9d9wmgjh6xlwbbrzn01c45y4y3k25yd4p5i041ys1keavuwc2ijzpc62t5dd34xsi8c435ktuxxran0yx9ewnlw7l86xpq6bg14o64d7ff6',
                name: '2fpjaoqezsge7hrzve85mm29h73nzjwidvbfyp4yeb4wg3xz8yqbubhrsyepgcp5pcztf86i6xyen9ft32kmunbvf9mji1jpsms4x2f8f4wxgxyvxxazl61rqtmp4ctjpsvnsvr7wvrw4x1nyo0gym8vvs5twjv4',
                flowHash: 'iah9vndki50cozn0yfgqxexh7ayk26zlecfm2cm5',
                flowParty: 'jkz97eyeim2f51ey7gc12gu509rwlvn6z2z1jglhlgk7i10bgvmp7m280gabo5h0odu0xfk7tr22g67igk1qbik6ro5i4w8dtzkmiv2h9kcjh3j9rtitxnmzwjl1rb2hzxy3asyyvtv4a920hea4r2zu1lm1cwrt',
                flowReceiverParty: 'zc39gv0o8tuw0597wxaufk2l0k91mxbrnq63i5wypoulrk5ayhbscz2owmph5f3ig0myy5eqoqmp0xfalnhxc9r7710mde1gehhlri7esaias0fugxh2d7xv3zfllugmuo46ui0ci8009gtd2pvg61xfh8folvg9',
                flowComponent: 'r4kgoag88ss6fb6x3p7yyryr1cs0ekszr3vkp4i3ekwgagecab4mdpasgfnql8i0pv8bpq1d4w8p4h8uoqqo00rfrj7vb6z8ktj3a8q85o01j99g6xnhuyl3mb6s41yyhs5scjyz61v244x4fydqjk9vfwpk8zwq',
                flowReceiverComponent: 'ltwjf398o0bi0buh65v4cx2znjbs4ibu8v4ewbc8wuadocloaa8hfbzro8t3wwkq8dakgas4q7gxw04gap9rxa48pxujiiyboee376gp73e2r80vnw73zlpqib0ufbo2ure4r1r7s345z9czrsna7sjncukiwhys',
                flowInterfaceName: 'bxxcf4dubhrrbqg7s6gq59fc5u24rdmh261i9lneqn3yzopllz5t4xlrxkit3qu4ccc9rf3asl9ct7jx46dw3wf5wnlkvool50te5jbetvq9tgu9j3dnlem3lclpgccmxefl5k62hrcybwoopjwnd2nu2cmsevg5',
                flowInterfaceNamespace: 'o3ncj8oulop96alpxh4308xh4u0f5s72ix6rqqb2ttdtycncr1d6kdouuo9kztg5ktnl0rbra029nlnmsdvq531o484p4lgtdze523n19nstk95l4zqwt4d4f2adtyh3jyxyfc7qxfaesxxw1a1t2i25h650litb',
                version: 'udn1eqlbkiqe0v1rqds1',
                adapterType: 'tj0y3npq77ln7ldlcc8grxm4ygs22pf8thv6y3ukugvznwu65c6xfd5n588w',
                direction: 'RECEIVER',
                transportProtocol: 'q9igdsnxqr0p7pef0tz4qvuln42xbk4f4vyvuj5rcl0meprujz9yr6uvmuwp',
                messageProtocol: 'kp7ae9gwb7wv1tzzg3nxduj1o5s9otgoytf3gwom79g9szj005e6j6a1k9euf',
                adapterEngineName: 'te7kqgbyabplavwtmuada996dzes6217lgm32e4q9o1c14jp4vbbs6h94659z80rpleh6979rr1f0sjcz4sqc1y9xt78w7slppkyf925l5wmqsdaw91pbnk0kgnn3ey3hpc5rj57lj78kuyw5tza8l1f84a570rk',
                url: '3msz74684bf5vzkmfpxmzjxo12zzphgwjiypsig75n8bo4wlhma786tdss96r4rzdl09am9x3g0sfujjn3iiukkjppw8t9tqjtp8cag3vd4uoom47tqgu031djgol9qn0jfyvel6pmtagxx4sdnoz9paeo4jznwfzoahk745ruo2pi5qilo23u49ze7c895rccm17rnznmtdip0qkeowazoc3l8g6oauxjg0g0ixtv4699ju38hftvs84i3b89xcop6wtg419i4qdltb7f4qvbvf3nzocg9r0sz5exf63k2p0cf5t5epniwv38cb2cgr',
                username: 'tranawobk1mubsjkfwq8appvrjjqzb9x4i9nwkusrlv6tuylw9ij0oqtmhvb',
                remoteHost: '5758nsjeqvqnvvspzk2mroclte7sopu1da8uckkr4wh56w6rlezcv289hh9jkawcdltkykuvz71m2iimg9uiugi9p5p4npnht9k4sloeqwq6jfivaxr7ja5cwtzjv690p9j4um8yvmrvlvwwn4c53vcv3pqpyf2i',
                remotePort: 2885225311,
                directory: 'ft7r6u64rc5femoh8289a44ayg41m589s4lddspyxj0l4lbr7todiorcurvbpkyee4xrjovcnju7p098hww87qxqk3tuu8sny1p267684u1ytsocv5yvnau2l4wq2le33sli9j6fw9a3t8bvhb5t5k4xqq9k1w5ghu3ldwhmzoz09kd23iypy6nvybxvme4rtk0qo589beof4k20ayueggk13ubul7odsa2ki6lqw05nylv9yzmf0xuy4ummihvwn6z66984559yuwrtkrczjz4rlldyzsjdwslq2ctces3bjpang0lk9ir9928mur4y60b1dqhqwfdp2a47u48onkhb3h7839dp43lar50d4cowpceb6i2pfirqy3ojjjcgz91j1t9z6l8ljuj4eq6ml5vqfmdqnqbztirg9aqe213x8c1ug9xsmfsde72u1zu6zr0erk1usyx05i724bypbzkblplw5ytsox8odvdv7fi7hgo30oqnz6y60mw4s8qmfn79ea53tzr4831dth5ds1x3p4idkpuq6ddym5ebk4ll48o19vra1mnh4x41imlfj1zty0ievg83tve5kmnjexazzzrlp7hiu3lktjmggxqorjf8aap6kkgd69epkc92bdy0zirbzgdfzs9eycmv0b1b3okfqj5mqunadyjlgt8410p888bijjoztvqueg6pbw94va5odu3miy41ilgbwks3b62pzla1a2eikn0ttvlgb8lfy253rl2c7ixgjyqvcq2r4z0qhvdh79pmml5wzrpf6bhhsu55ukjagfyw8yzixmu7awysjl3zi2ohmhiubdn13qot6pyna1sd0fm62srq7b0emecwe0q6d1rzaoyjs0l1djhbzus0cf0dl4ll47fm7k707pfadvbc5lilmng0ivzf8t1p7fvk2tihe3wqegwkaffb5fp89aiw9pnsrv8bjbwmyt1o3rgb86zn788z59d9xp89q2wk6q71b1tusqu6i1o49b5jatlmcenx',
                fileSchema: '55ofiucjzz9y4h0siagxoky9v5eaa9qum3rm3a7os4zrmub4r1m3zt419xqp8cqfxtrdcpq1uh6avns03ybmezsymlnnks2nntv2ux0hndnvcofhr10auqwepkbj5d6so1fe472q7rxgww6no8nv0c9bftiuoefy5x6bt0hk5zyaufrxlytf3t9eltu8ea35auh4qmb7y18xw1aiig95f3nizvu9ivkyagc5nt0iwtfu8u6zvtf3e0kbfizeno33qw5yacd2glat9nrf80umnmpzvpboqx2fqicdbldem5udfyn8dsd526r5annosf7dj4n1cr4hvsnwc6ujsuqnn6k9mq3ucnadhcrj1i739llsv49zuo0z4ljd2hf3ori62r9q0lp8qv4v20y4c2p9k49gqa5oez49ejltxj8z5mqgtk7ruxue9nw3pfkmzyrmjomd0uask0cnc2p0oom5e4vcj4yghau8737iumiy77akf94ptpxskula9d10ib5m5o4k46ivi6fwijeg4y5jrf8luaw8u837ml34b4j5nurjjst4lap6ledfczfgsvfc0405md2hy3csyp0yyjb403tbfpqnp605c057ytsp0zed4tgouqcjxp3hq1kn3p73ns27kkvesb14g6qy024zetb18g0mqwbykg01ccp1e9o95k0fho6e4w5fj6tr3dr18ig4621kidfzaqzb9h4hn8zcks6692ff99r8n8n2xbq54k5n2kbvy6peh500yg4gqkrop9b2qcyftssl888qtmtmf0nd4se5a0uji7fiizw1goyl7dst9uy016ijp8n8sf54xrx6lkfh03o0ddcoycs69cg4nysfvq4o9dso49rk6kfxth8u8o882wa7h3xm7p9at3oc4lk57c52vu2dz828um1fegfmle6xkeltb2awbglevzl9a6mdiji48dh664jcu3ykbk7acp6g9s9ozy294o9eh7tiohpnc90dc8kjj1jhsvve1ythdq6x5y5y',
                proxyHost: 'k5hnk16bs9qs23972zixtc49mqs7wejk4tnnu10awa7xykjiolmzr000jggm',
                proxyPort: 9930700741,
                destination: 'y1qzcb0jlca2x168twe7kxenbiatfvu7m7czhxsj0cs9eri6je63vzhaqilthv17jswapyqs3ktzegjmemsm8alwcvmy9pnlw4cp1so3s6cma6q15s6zml2gcd2cl7a0f6u2idxeb7jzky6ggnpj2geujkynk5w4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 't80ze5lk0yd3amtw2nixqc4o21ndgaugl97f0ci53fhbksmlpj21yha47lwere5p6shggq832na1xk981e0nh08olqii21ffkw8yxranfzs2he3qsq6s2t318jkj2garz61sx6v8x68ecrmz1weqg5oxp1eey1o3',
                responsibleUserAccountName: '61taudn4pigwc19umxs1',
                lastChangeUserAccount: '7lb292plt7kj8zbz964b',
                lastChangedAt: '2021-05-23 06:56:52',
                riInterfaceName: '9sj39wng2253z5hy4kqczt8mlrjfqpx2xhj0dttfs487bloxvrogi4flg91ujlgtducsv2k2jzm0bmi6bqoqottt9cl34b5kmu6n6rbyi7rkb08xlmffdvcgh0gdh3268d18s562lyvgd7g7lb9i1wazz0ll1ieh',
                riInterfaceNamespace: 'a83z3trf65vjslzhqad07n4rzdyyfpcstcp4rmckllszh7dux0s4382csadilq3etv6kykkgfoln0e7golhxr5zet4tk8kc8k8cl5aehamajlu9e2a1xjyves1vvbahbxckjm14fq7gn0tongp18nj4g5fxzsv00',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelMessageProtocol is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterEngineName is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5a15c9e4-efb7-476b-9861-4e9f455d908b',
                hash: 'bemh56o7loxmu5cjrs7bum8ro18iwkwxrwzfj5u0',
                tenantId: 'e1c94d7d-3d14-4eb4-b52e-a90189127fd8',
                tenantCode: '8wbxsywtemmri5clvkbg7d2t4tddnmkj157a7nuoi5t0tftlp9',
                systemId: 'aa3132bf-1a16-4f42-bb4e-291587fecfd9',
                systemName: '0u6xkerclewq6598pd2n',
                party: '1cul0udcenj2260wham4apdwh1ejtj34rqsmbmidw4vmruuzbp5yyb2l3kyezcv0rks8btb9r42aeb3ww5ouqyir8wbfxl780hb3oqfw9s610hxjlax9sb4tbadncrsn8rg32lmy5ed8ohqko97nqca5c0u1hu9t',
                component: 'vw6ko1rrqrrpso2f0v7yh7vyr0b8su4005gycjd1g5prlt6p9evqk2sztcktctak0ay9si1vrxnsl5w8ebdqpn6qe6vr8g7b7drr2mvbtrvj5hj85lklimkay5wm2m8p8jqkn0vlbppy9o9krso24gd3t490vvjn',
                name: 'l10fe993pktpx2ppzi389z16m0kqn8utunecg38f1p36gvzsk1zng67jigz1vz8sxyd0euwossnguegil6keeu3jgxvd2rvw9ft2ttgzq4xgt9y6hk67xquclwj6gtiw9a8ynsloh089udnf7w2c2l9co8ycy0ju',
                flowHash: '3lv60csoc12cr1ywmv3fmq1bla1rm9jf5pu8jc1p',
                flowParty: 'bizhul73nugva75nez589xrfpxq8542x3dlr0vrn22kvokh80jz1zs4245x0d42bb8yjn0ry2bhu5x75i8yhwke8447xenb160yyao0hk88ya3d3mt15jlgt68mgohuc0qn17cfgw6rht48sx0f5fz0k12xobqcc',
                flowReceiverParty: 'dt38t65hhgwpa7bjlzovugwdnymixuf78f1tojal830wnat8o74x51wxghsqax40m2gxglrx3m00es782bggxqv31mr28n5xgo6x3gpqlhniakd0110buxnnteqfl2dk31mggk9qdo89byqotna5ycbhmzg2owkk',
                flowComponent: 'hmgtsvs6wpdzhkrsdkgby72bawt4mcxch47evkg8s4l13fekqjbgit64mpnkb72f80pc53vv4y1fqo1ypklm01sqgt0l0vty03tntgyovgr5a8kmkucdlqugp5rnaqc5vu5ceq70h8hfkbmlwjw9kxeg0ikqpr5f',
                flowReceiverComponent: 'nx02n7k8ezrdx23ssaala9kd0gkbjr66at2sd6kcaarv77awkk2oa53whybcx8jh8nvzp001fnp5tt5mial473ggifto0z5vgh54c8jfys2b0db43e99xg9m2eakq0s0sd17w6u1a5w25zmtl8iwt2qgpk8aufud',
                flowInterfaceName: '1vubrtf9lb1gdv0golwwy6iq8dit7m32r6hjmny4t0slcuu2bj47y5almbvxiyver8wbqemmlunhgl6bvtwr81y81h8a3lm3ih18avhl0zbdkgc9v3ht25hurxljxgfeoi3hkm2fz8fxd1zp7ts5itp4rdnn6gtg',
                flowInterfaceNamespace: '95kyg9oru1gruzn2vgqbmeoa9kunipb72nkhhtgtj7q85p1pq7g19oe84tfm1h92402w5pl3a530mdwtry3ytof3iw24wiykv1bi4pt9k8xvsfiwepnsanssvpwpv1w4qp7ukoyomoxbbtbgdpop552vh1j10ife',
                version: '427ac3qtrtnk0ix9l9nd',
                adapterType: 'oej87eg9lwcsbf9vdh7f6w9mq0ey5iai59dz61crpoaawcckg76foj64ot31',
                direction: 'RECEIVER',
                transportProtocol: 'jiu78jzvzbjktoop25cn6lhfpplv4tiw6x1h7aqzu5kcymgpdmpoht2cchcw',
                messageProtocol: 'ilkx8cado59upnh36ycu45hjrhpc2lo8w0to9y69au4npa4lkwiszxrvss2k',
                adapterEngineName: '206re4t8ww4079p1qykh9nij52oc9rsbqmcijjwrpywnet92z044dsn0k8hlol76apmb522kov79itq0lpkm92mdqu9786dy6eeromipwwe0sgurf8t0k8zl1amid3f3ijwjlvkbse05tpmwat07j1v558wq4lw44',
                url: 'ocxpzkxnbtti9ecc7avoh6gmt69rb8aegfbsl76rtjtkdab8eozbmhbtxi8o5wqyf9o97bk1vud4qq36kpq0gsu4spoydlq7j6gwodu5figmwkn1yciss2r2putyvqs0i7p2uqm8rc0yjdh0h90k7f8kwghjt89lvh38nfsbbou69e8il7pf0bjljcs3ibplai0li4x5jaclqpq5ehcgh1m7m5qtukdqrm9ciitwntrm9m7dv77xnaq11o3zy9lkj5w3tkp8a41cdjabiior0a8pjt2nhx4x3rcm09f5krvjqhayj8cdw1xeah5lmv4r',
                username: 'rqad4h7zs6oizxnqe0vr1zi5mgtyhseud9ygkzcb1ofbgbitpqycsgkqf1c4',
                remoteHost: 'n7sswga2q8zl2glmt9vrcz1usue86spexdg4v563d482ed9m5kjy3fjj6etdj2sx2a56kxolmt4dh7xl2miur188jhy1o0h6rn0yj1do19epw99wfn0uo4gkf7ztu57iysmphht7r4bkpfdh1fov58as46p9yty2',
                remotePort: 4971127672,
                directory: '8abn79wsjx1cnha19fyvzg3yfjkgr57lg1c3v7ri45uiuwg7y71qlvr3kvirwv7jbpxif8uu2q5zblt39y42baaad72jaybfm3twve4992fmgn0drrweo0wrjny76qhb7lnlljwerfcvqs32lrkb69hz646md1mly340mdbgoavmqe3js5alpn2uuu2l864xegrwb3xgvft9vjq5a5jaam9q215wgf128vfoldzqk7h7lzmik0qujsxt6w1hbg1s2mrotlvg4amug3ez23mlsrdhq91yb17hoz7jwe0cej4iqq44rv7p8el9658j9bu72pyw4c5954iz5i7jm7a1oyn12s4dy70g3718x0y92l0bhj0nwjsdb3hq0r86xz16jal1oxjmfy1gqru6u3vgpjffuwccq32fubgfzgkb0gt88kaix1l0tij0g4rzdn2j51d6tgd0unjd9ifzdv4pmgrs8rbqlo1pp32oggjt6e6q9wukgex2r98kfocki58znn0m86ghu29whoyl5na2unu0mmf7g41y249016ua5j0mnxcfs0sk0w468aqz4gftkabsvy1urt67tubati3gx56t8dx4zcknvjp620os4d3au84kotu8yv87qs01lt9zo19auogp48i2rcyv66pxl316agtlnzefuxvlaykam9ldlediigoernkf7girii7bj18kpnzhfslkwzvaxcagm2b18srmyguyjrirscxji7ao4zf3y9x1ijdan96l29ext1nalcjc6enb3hi5qwewgs8xmvtsagcp8s14r0tsvol8rrl10r8zu6fh5910eleeh8tmi0d8nre15kp6c0ucufwuloc29swgwzf1ugiwo4kwqjjw89aw7cs0pmo3os473o6ltt60mbxzfrv9438lffxzvvhrlj5rfsekuc9wa1cr9xsjr5vly9cnj0vp35j45lw3dqffv8u2u0dv5f0s2x8ck8m2fb64kpnjux63s68pb7qusrxoiui4qlzuxjrh',
                fileSchema: 'wxjluyxchgriehcupfqery557obb8px74k1p38w9v6k8t6k48bhnfz3c8lk1y61i16cmzs5b82g3ewb9mxt2m5er5oy9306ojd5s8h8g0c7i8ga7wog78hoeom48wdl2vhob154bl7quiyus8skvp4j26afzu4izs2uy8almg175cwz6bmjatf02dgv5v4wtokdkmn09ssgb4445osz5mxlyhm7t5vadxctnuxaitl16ck2tabxmlftmuezld5n4ifpv6jd1916lzh7klhvluuvcfodj4b0evq0zbmzrmpsb8va12nghltix8fe2nw7ksvxv44d5xwa9ke3y98gfczv2kv83oe8qryquk2wswkripwi72urpkyw7l7fkes5guthxt6ly4kxesxo52j0ye18qf1ydlmaywr1km4cbhguwztbpnbkug70bhnu9ss36lo3gysoskqcsnl84k1hbjrljhnqbn4t6140h58tyjp2kc8uxdedxzbkrev3fp7p1dviw5gz632w62dla1x4b60mdtb06drukyotxp4eqt1qjuodaqb5ean8b8xp8wxz8seb0i97pm6jjz4nmbig1zx36u599nznaxyeioff0x7xg3siv7214jf2tuqwdmingvomgauvma1s41bp2d3uihii10kiqyonsgd4x2oj3mfnjxlenk48kiwx84nwaz9vv94nwbawix3blbmhqft1nbznhcvx4r0ewktjkgnea93w9h3werl5cbbqcuix3nudpp9x9yhufwjirxsza8kk4rudzzfcjriv00jx8eshuudzk7rdzc7u2z1ruppn5a9sjpebsp0sjurszbvbepratvtkre6474prnz7ywaohxjex4dpadeuo4kk33wxz0lk4r9wtd7v6mdnw2xkwc5tb7atnzv62xrdq6ktidr08buj52vvnxlledyooo71ij630bnctg01mg0x1qvyepodfpqwbt3ab1y8hq8icfnbbeqjymuy26me84842q2i2fj5ok',
                proxyHost: 'dhq8q99axfrs0latu07p05iaj9gcy5en77lbtlk90imwo00eyxhvojp76cqs',
                proxyPort: 7545921827,
                destination: '365eb24bubr2vk0pgkduz3uz3ttzjlad3gvkypjmzom086nbncmlqqcnhmcqm5lugxcchkygpcswioengqiampk0sygvqro641ogzxo1mkbg9qw1hgcvjtgvwon03n981o473smsf0vg57q3vo1f8g77hhf85z78',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'p4uopwd0to2gd5y88pxmke8mmj2jyj87s9geynvq0rkgpqjq8rvjw6oj6d0d9cyku9kyfdx5bbjws1h3wp3130dz2xmdqz03ydybyrk1d1cxyd0t60m4gk45ct90h6ixm8rmmw3qotxgu377veqgklgzx90bl6m3',
                responsibleUserAccountName: 'ssxq0s191vnngj92bxjr',
                lastChangeUserAccount: 'mlgiiwy0gxkd0n72fggj',
                lastChangedAt: '2021-05-23 07:23:13',
                riInterfaceName: '7ng567imz2eryrnytycsm8nc4cxa3y7fm9hofw2b1isv658rh391k4m3g2qgjdfn1btn8szqx7yoblcy55h2x3cszhcgs5p5ub6xbfrnen65enz723plgurzygs0p6co8ds5uei8jpxob0rs8e9e3u74873sq4j0',
                riInterfaceNamespace: 'lzzh8qi9n5n66oxmsy83xwh8dctxwr0fuedf08g2upuvvvvwqftusife6yesq5w0szl7d88qj46cc0ybmwt03d7adu8bakfm9hr9eejdap8unxjcuceoem75hpl0pq01mo84227dgwyivl4n2npkjycv4cbhgxyf',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterEngineName is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUrl is too large, has a maximum length of 320`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'acc77792-c420-43d7-a766-c6f7afdbe1f0',
                hash: 'e8sf024r0kppp0v9f8vn9ogoqriqo2553dzjsrtl',
                tenantId: 'f6eb60a3-150a-4488-a4ab-bd236e9dd7aa',
                tenantCode: 'znn5a4frsr3cvg3mlduhvyd5c057ev8dlvx4eohs4g23yqgicj',
                systemId: '73c56014-4b43-4a71-942c-abfba41279d9',
                systemName: 'gzy7useirkijknar82q3',
                party: 'xxydyx1i3u8kb54xj3xsavp6hxllxkser9aeuqbbl8r9mij5vhpqxe4t2qa5dlhmlhqv2wd8a0c3v0tr6yezm05lpqs0tx90gab52beeyxicoljd8x8rynhjqvwnj5dvs7evzoleuv4tveozotybsxkcj8angdx4',
                component: 'jglmnoqo07l71j6ayvkc4wyl0ua77ptdv4i4t8w354q6fkbijdn6icuns3jamr5mc84xb1yma4hbc671hmn98xxpnhvrfec52emfln5id6jgqf7z6ejd0130em96l0rbw93xm8mdb6doo8droo0l4iivfpzun0f7',
                name: '6lcco95t5ha41ns0wwo7xa8jka3hcs7wns3stn2eqhvtjwwnnyp421xk567zobzu1zogjkhj4517h4x2y6guoy9erj6umwzu0r8gytd24m1ebhurbp1zwsb3csms2rwu8c1be8g9jv28mphyb8iv8j4qbj7h9a90',
                flowHash: 'mou9y1v0lpx8ahkz8od89c74t4qa1y0e71bm6t91',
                flowParty: 'n7kad4yfwaf9xmo8sxnyo9atgg4mejjwjv04in78qcqyvoz83169w3u3eev2s3lf8y9sa74x8g1l349ei43ylp3duqgtp80x884tdud1u6ufn3vg3wkb15rex7y6i7ajagaugc1g7u1y32exc47mg62fixugc6ix',
                flowReceiverParty: '0xxctbv0ve48wnmvx6k9vx5qsa8i3v4kaxwmiaql0942vrzj0nanl0pdu8pzimwccjo6247b9ok78vqzq9gdzgsmm21uly22eaviazrt9r1q8jhkoh95w8787hwdphcr4yjd0iufl466xcx7847jrnv97scuh9ti',
                flowComponent: 'qx8y6omp3xc8ng7fnfn05hhffxrqbi56qq0kjfwskmegvdbsofvyghajs1eqn16l86uvrswt7amrtwtgooe6gstayaywjyph5us6cl0zrdjhy7sagcaq8l5y9wg2irhxvynbanfypbn9wof7b6dcy4r1g9178m01',
                flowReceiverComponent: '83q3rjfxkukegsfv4rse4x1yi0qdpo7xy3wsrleldrcnaafgjjljekxu4nnvgfv4ln4gvmwdt57v5mjlzbsxkov85ofj91hvsicuhzocawbil213pbaxb4pcuim5gbqoekaq85jk3ws90932jcym4ot2qcr8e6vg',
                flowInterfaceName: 'v28kteixf3uy0t19kjlc44gu547tmyqo7ahcfbfr5rlktau1m2n1bm71btf4jn236kpu5dqw42y1ehu2clrck6yka5wssvzptgyf1xer60ro7x60z7zvct8o9lziqikvthd9iabtxvmmn47kdbps3audhfibb02v',
                flowInterfaceNamespace: 'lvkwnk231lxi42maqorgd2u278xijltwy7h0rkegrkcmdhauruitt0dyulfvdt0nbv0930g5x574pdbo557qjlhe5dvd3byx7k0gvfmcfn1n4u3y7w0n392q6vck0vug2ee4ufgutc65sg8q5k5nzjrrsh64qt5j',
                version: 'ko56vegqcgcm6p8y82mx',
                adapterType: 'yr9l0ug4o8g1cw04f1um20ls5suyzw70sdazk7qyki9s9rh8b2ha2ni0udkj',
                direction: 'SENDER',
                transportProtocol: 'ocb2dz3400a10hlm6v1rjsydf0cyw4rvrhywgag9gu2996nsdq9eh2mujp0p',
                messageProtocol: '1v7gyo8gikmaof8ua34ghhzd1fnxffdkldhisyqelsuaw8xgqegyph7s9owz',
                adapterEngineName: 'km7rao5cy8jl138isyvicjs6immuhm7lrzumj6hmyrsjejxoxumdlyqoqocbosjqu7539xogspjtehyiflufey5key6cv6d6mwqkcs7qroqe5f9fxgojt3o3329hdtsf1yh0jq71muw4lglekfh9b5es0itctofl',
                url: '8kl07j8kpwtyh2ik8tpp6w3g3ruh5hk2ka5cngb41emndcctwlalivb5h7d6wxbbc71cjzu6l1ry79e5goe55lctyxeshwk9hquauqypcrvjs22qgc50dfugoiw903qn6zngwyqf09d4hfqtdysurusvlbbvdm6tgofvld4vjtd2tky8xq3gwkyv26d69swj5i1nux7ra6kdidv322vcy0ppmrplyhck9wj6t747bkztfv6voqv2jrz9olytti9l262u93iqsruk0e68z1to2v56jwyv3vabmc7rq9d42dqkco0omj020498gwu1gajxn',
                username: 'glugveosossbsnuetwgv2e2klxhq1mp2dk1f1zv6530f5vejdbr0ku6avcpa',
                remoteHost: 'krli8bwvhddtm9kd0agadfpix1cgirey150y8ww0yq4kzx5x2w007opiogcrpq0mmxnjrhk2r4r34dqckm0gkhdi3ofecdmctkdidpuvy33fjqnixgt0ir4dupfeyxsn4umli7wxroroje9vbiho3m34bgu656v0',
                remotePort: 7093480187,
                directory: 'qozzv7vid4ht95051n7jwmmjhuey9tcmeoxbb6qv4r3gc5x69ks5a6ial1b0hgohcrqj4y5szmxuukji28xd1b8uyvy39gqp77k5ofykbkpzlq0gt2szax8yxzrxms2h7zithhg01bmwcv3leklzsxa0ybem441p7kweea51sg1gb34m6xduwdd5c0n17moeirgcxrnvd48gq8ycztlsg7xryq6uvqwkn7rgt2j2ihb7g5vh7jg7v2uibjgg0zoifb48jit29ximstlog83rl15ex9hkq7n766ez5h6ntyvtstgq56gb3iygm07sg20nfrzu2o2b3adz9xgmcwiakrykviu5gg5x9sa00fojyjdd9fa1ayvu2coz2hl88dsupiamwy1pmqrxmk4t0wef58ucsjepq4q87x5ak7b5ekxbsrtg12m8v40jk490inpfudycpjadcbsve9suk6qr0drw55jj63lmv250j3u8z6agnjy2jqj54xn5u0gic44vt0alpj7miherfc8030bon7p54rn3559kbazxc816g9gttdm5hfxlm61n5nvcz0q6hyrbzt50u3xsdh6eazufsrquatpv5974zql7rrosv6o4cctcpqoz07ppagnht6gcrlviy4tg09slfjlcr57wwtpodor660bz5ptfcye6p62y2asiid12p3339f48a9mq12m2j59ykot9p4xlzbm9c0jdfnv8r3agqj85pthnrpvqzfm9u8t905h3nukaiak6b2h55zy6ye6cwda0uqtultyzfb0wvvv6t64x7fk99hfaqsqdb5nm0gh5qawjvrpt6qoqidi9ygtn4byjl0oiw2skzup7icnurag8x1nbh1aglb4l4vv5uv0lgcn6dm2m97q2a6qk7vrgz2t9t1xom1cooxyn8xtru6p4jt07ln6ye0e03qdc0lnk2krqq5w4etxa0wwnf6chmw3iojur9vvu4887lgolqvtsdab1mqtq2bnt6tnpg75jstuawpju',
                fileSchema: '3064b4ya5eajd2bar1znxxsclxogq7g9qn637pif718dq6v8xqthbn36ftjd57mq13yfuanmxvh3vkbds9bpem7q7l4aey1vpodw15ik9andwmldaxpq45njuh09em1lgdfnv9o9hoam0mjpfweei5kxjz3gren0xfzvds875k4xwidfmvd6qqk1oggy1bcdzwiy12etxhd7v7dozj6tjq33jzam7h62m0pf6hd6vrblbhmclmssrbhrvz7i4pki9mtcn3fgj58fifuq1utsdv4hbgwjnrq83encdw1ajesgqa3usu0lvltvpwjh0z2y57pamro7rcsdmv5bfh757eag2hwuvdeeenaxdrvie6tr6zm3n9aeebe3pi8puw9n4jmiininbbbipzy3zotzclfw6i2ru7wm89w5bxr6fms20npz8pikoa7o58lbxy85prpob6589tcfoeo9dnyrj0j7za9hpk87j2pqj783fe9guqty9phqdc7nhqvjoroamx499quh5a5day0g2ar02b7yyzqtum4xc2ap5rog820t1ciuw6hxctf55jrg3h9lhemi3ujko6ybtj7cyzxf88qv18mdxxxq9m6tjt20fl2957g4fxo8zp7tb1xy487m7lmicj3ximqfdxb0olwjdj96o5ww0dax1m8kmrq7qduxhln84ya3aydwr0rc0isp6h44r9smxigng3vta59nrjk5jpw8zvz73o4syjvm7hiipl0e276dln9gddopnc8a7b13d1jw4a8ufeyprur3glrxkpsgdw922b20ac41opm3doud9tetgcv059dpc46r4yybomypa3w0t8k1ta51jqcbijdx7d3lqz8689aq6c3m09ej3e6qvi5j28q49vb1to48k1l36aree4enp3b4lif6lqmzs7kh4zsyifyij32k1teht6w17h90qrpnvq5xc386bhw4vkb0xudmjyo2axhkg8qp3zp80qjximiw00imifusc3fuaw3ev45pw61g',
                proxyHost: '59tps820qykh8bq3mhv1ya3e0kxna69neatnau2kopeea7hxe2cpx9p2msqm',
                proxyPort: 9159602511,
                destination: '783sx5t8y70ixifcsse67lvyg3nu4vvn6wtswyqk8ieu7i2243tr95u3rwwjkxv507o9m0pqng79jru3xrp44hmnjg0oe1724kffweh4lxp95c4j9tf0nugtj5fzkvgt2323sbhst7c22nohep6aafer23vg73p3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'kym54g5wrtfhced3syflxs2gjg1ytm3t8a5sdd90vojijanrmvd9h4l0jidwjotxd4eqzb0wqaugvr1c9tuxdon47g3oksg7geuhud0cfia6ft4gikujj3dw50x8sxbhpmzq8j95knqyzh95jruj6zwg1fyu5qoj',
                responsibleUserAccountName: 'olvx8lxf4qxqtrgo6yrx',
                lastChangeUserAccount: 'xzspwviarwk2t0g90aaq',
                lastChangedAt: '2021-05-23 10:22:06',
                riInterfaceName: 'tjmkgtkq1xcp2qbgdlouur8nrr3k7o492zbq1r3i6073kll3cpxyf8gch14zyywcjau9hgfpsmvyfty0ngibzwgp2npgdcnztv19cxpvreaitkhjdvl77x2zycd8ou30or236rbsxatkj7ceaf9jmx516k55fzvn',
                riInterfaceNamespace: '90ftml2hp4b6qjuq7y40nvg2djyv8ivh6l9ncsxkab4mqf5l563hk3j1ppfp3gccbovxdxxfv53ykrvxjv71osbjrgjw2cep3fhvq675wpulaitrsf3l1qzbd5u80u1444p3i45p0u7ka6mh3qmki4xw2hnwraqa',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUrl is too large, has a maximum length of 320');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelUsername is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '514522b9-d5af-47be-a103-4c95498eb262',
                hash: 'j3hhpe96hip7i0q0pf9e32jr3pi729nu8rk7hvt3',
                tenantId: '21079a9d-182f-47f7-adf3-b0548af00764',
                tenantCode: '0azwdyzhnbe6vk3chmwunronx0tscoceu2hyutczh37toxtm9i',
                systemId: '6c575587-5efd-4ecd-8504-6725a528719a',
                systemName: '851iybjk77ij7hfkcngs',
                party: 'ik8bespvzrk5kc66w1j2buavrbus7a3wsbfba1vbxtgyx0tmk9ztdm3xck543xghtug5i8wxihqrj93msvpybfkzaqr2jswvgtl83c0omdxwdc52v270of2qzwo8ido7vpl56bqlyssugmcqj5q1cnm7ei6puhoe',
                component: 'd2y1fpk31j7f2oemk9ko40vwxul5u3p5e86lye29322jzs8ax91oqb253t995yu1vbrg8jlah7hlfjcjnbogu1ap6vmzmtxq9r2wq6r3vxad3swe2bb87m527jkv0wcjl1kworvsjatt9o5rll0j6vm4i5tro4ik',
                name: 'yi304fyc7mvcdyb8wdzxygyp2sq008eff0noyju87dnt11uen25pedqzuiszpx8vh6t4rf8nboyjqj2x9qsku0jvczde8xpar7guf5qwlv8vll5uar48zc4swavq4xayvcss7q7qqv7w6oo5ik5cy04o661pb5cj',
                flowHash: 'uta1tfrcs3dkoegxb0c9e2efmhinh7iohforl7hu',
                flowParty: '1t5sw6y5r7nq2v7e961nidnc3l3611srvk635pj4a8zbqt2t5km3hfw38j5o7458east8yy105pa5ldrbhh0t3hq2gf9yypgqvf7ro7otrtiuf0ck0zjktrcym388pf06nd30duayb4ofoqt7xuil3ans0764aoa',
                flowReceiverParty: 'wd9ksdrb96lrbhhkk5s6d5rpm8ae03xwhukpw34ccf4ctsft9e5h5j10zame07vr3r1d6hscz9wt3aooxyxdi83xwfvm9gd1fcakewta09ekiv7inzfqbfk5x6vwe8wt160x0horvzu6gcc36y596h2usdp15y5g',
                flowComponent: 'q52f3molys2syyzw2wu0memt00h9yu3pmzhqnrqz2qauxq2xr6nwu3e9fsrm3igki3c7lnch2zcgajl0p9j7d6qagmc4kfrgy33fwrnqbay23vr7tfbl1vp1o1dkajsnzqi2t7b0dapvypo3r5jbpml2yiou2ju0',
                flowReceiverComponent: '6ucumfvg4na8tsi69dkjdujvp2skp1xjslke7gaoh8lsksvulgxsoylq939f2czje39dmpfduo7l6tsbz7463xcp1grq1jysiui8z8ahc238qt6364vr1jaummgq8tszfyudbn2o53haxfk9bh9awxc1atbusray',
                flowInterfaceName: 'ti2x5cfxxrfbjrfuy401fh59q478111mc09lpei3na4rowzio0tz470pfsxszecee6qs421turs7q41gvk8fu4757gvdpiyiphhiilo6fnwju85p51vj9zueftykg1akxdbxp2fi3fvbl3vgvsdie124a1itio4j',
                flowInterfaceNamespace: '7olmib175nwn05k244q56epxiw43htugwcg6tv84oz32vhyoak7ng595pz4dpf7hoy9f2d6k04mazzg1av6um0w8tlcfjarzg96ocd4ruwwrx171olirwj4x1yqv9wmxbqwrsawfdrenvrmyg2nuf1msbrfk4od9',
                version: 'bu5s5ab4rmq33vmwwga1',
                adapterType: '7o1kr3iro4iyzpkc2bf2xxo9qaqcw96bdjt9l3rz7md8rufxvxehldffqtkm',
                direction: 'SENDER',
                transportProtocol: '0lt88inas1vhj599v966e4g8j8z6gi0jkp9ino8e73en6t51x9e4f5yiz3vb',
                messageProtocol: 'e7sc6c8pldmwbgn28c7k5as69h2w9qwnwtce1w9adpj1ynno248ifhxz8wqb',
                adapterEngineName: '7e3qlaqhl9fjltowy0afcn4jba4le9q14i6nn048eqstsywwbxefr8df74yhwuz8pi3p8jcoais3xdo003hypbhegq4l35ct2i5cfcq834m28jdwkekv0u9496d9qylod8qzom8018ofuf1874tpou855dbhzzab',
                url: 'in348ygvk942ipkdrcxb1wrqp4aeey63dz90fsr7beqt4kllwq9fgwnbpt4rue4rdw0vf9g2j4s06pbrtliqav0im4rtdgbypz7byfpom97kqbajl869gt6z2mbeo2ag02ko4yz3eey961zvyjsyr7ufklb2gvtzg0js8oor0rl80qd2rpshwezb1cdr9xnpgdvaytfkfizkw4t6zp6873qqkpjg0gxfnopuamv1dzy8maba17d65e65zvf78ymcja737ntuj29u480o6s4izrc74eqoiwxpphybqbcrpnap9g1bo4zx4bza2k7ip3lx',
                username: 'x2r72961ea8v98wv0fu54oupsmtezayduw8prpe118xph6jboeuuqb5tu6ni6',
                remoteHost: 'ckzua73dsyix4dnrsy0k7lt5k9n2n7etecrpn2wfovdf4z10a1mzybxl6smdzwnqdstpw5dqt31e2dtm8g3h1pe1u07jpaei229g5duwf56ys46eha8yavio2p2dd125awfixqrxw8tfumfwq9xa0q3lkyuwe2vb',
                remotePort: 3874118595,
                directory: 'lgdlag8jo4m77upo332lskkq76hyflit81cilmwfj33huzkai3j0iat1gd01r4eklbem6h4gmd5iovb3y9vf0lzq13kw1mvchrzrwfxrpze86gcheg9rtlcxlvjtzjo11afw09fubkjp55rqtnxd11j15zkj7pdp6tn3wsh5x9xixuwzof5gnn9bn12njqsvj7qsmlkyelfq4upg8glnj9st8ps5x08mrc8qu9mol18rcx0er6kwpgb563pln66v8565x63cocxjqd609lmrki0gfcfy7zdezlr9elf7wwscy2zuap2hs8smwqlbgr9pttha2udb4iq9r5enemaumpv1vrk8y6ajjw9fmzqrrrxojzuoow9588x9gp3tv8svovacc8c4ebzeci1brcdplcotbh4g8d5xdgtjhsjucrox6dhmtglqivoe6zypvr9lwxy2v81tff5t4za3whri0wccji19y8siz9vdywsd3xoe1tgen4l219c7wqf5blenq506c0oh1idjqk30qupw50myu26d55p49q2n5l923k7oanqrvhxxvxgf2sgg22rd45t36g6ar5v935fwc7lipwzdcm2d33sdmyfntjwrvozj3jg650s02g7fri9cf0ojjzd33jesiuaay4zn8f9rngntew6w84sdvhnbbvam0lrakhhbxhwb34y7ujbdz4l9xjqy1qp0roz6up1eb0qvtg4qbg6a9yi6h0mwbbdjtk3r2hen24pbv52kftu2mpuikizhek6wlhmv7r64yg0qc7hv7gdkv8ovs47xq6np9tsu4wnp8mo8peveawvrlzto9t3t2186xozrnf92jk1murcrv5mp7eb2y2aokjr309q6u0rddrnlx1pxd7kh651r9ior0x5rvba4djde2s4v9wsouea4z4zxu4z68uk1d5v9814bwnzoezj7qfhisd61src6fr0rhjny12lak3oq571z35xv90xu3a5d1lv0ykj66fef06rjmeuxgi1uksty',
                fileSchema: 'vjtpefmirsuc0ujm3p892uqbyea1tjz7rchnpoz4ga8ckjket7p04jhhoir879y4ppd2aonjtt3j9ytqt7wviflheoufabq5ong4ydpumeudpa3ts9sff6rel7t6lsh46vub4os0pbyniercu3m7xamupdzbqrwhndjn24uktgb4u8bcweyzs53l52uvjq2wv7htndhm0jhba2vwn4rxphea141hlp00lj2naytxbwo66jonnfx2nncaz504rubmlscn6q7fg2fg336xqrheuo0adwvwn0x12jex4q5h1ge2rjpt4qb7weov48js3j4jas4bgpbwsc1kysxk2s5jynw2xsf98100lkkkxu3e5grpbpmz7vgebcmh45077lmv5tqitlhjjj9yjerxbxmhx6r5d5bxbxf65sc0fvd79wqqb4qzodcgino3q757ok15446mumulk19wclnhtlt4ss22m0fhoukudr8fyvx1vt387apsxpn37fch40phwapbvdqknx4d994sby2njsjt7thpqwz4xl1kn6w6l6nsv68q5ox8ofvdycoyyhli0l8t2bpatbhgmxzvim7rmqezi1xcycdj6i1ahind2qdfq2b72hd5jlfi9qzqclmbvvwi47yg4f1m4jxplxg146q03csh16nw4j4nmb5d5twcouiizecyu05n33c6z2h5741kw399snxawpcabxq24da7h509di8lmit90ts4euzg3zq8ezj9ws2ck7kltdm1b696wcusuh1l4uh8k8o05uj430l0he7cf52yzig9um1fj6spfa21ighc2gfk9zjv62lg8j6k9tmnuc6m9us2fj5kt8cuchhhy2i7k26nm26qc9nm2on7w94iz01q7rc9ujvodcpbzcwrs8fd8wb9fa0n1f0s3kgr0xbcmyetzv8rq6q2drb0l6yeny20og3j6vivlb43npo86ho82g2bdqq655s4cq9qdu2e2kif86to0qiuukckq3kva9tcip3xw5ay',
                proxyHost: 'a7be84plbs77p6p2j4913fvhygqbuwi0bfc6p71mwi7vpjj837f88v7umz4s',
                proxyPort: 6302070886,
                destination: 'b49zdinlk103ra5roujqzb0jspz4euyj33ewnbffpc0utg3xu5eprxxi3sscmec2ca6x0ml54ftpzulnzd1g3a7yqancrjo8mqn4ujih5nz7hjphgkijnwqhrqflyfhrricxg8umks746xgmxbjr01tgsmxuumtu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ezakxbuzegau8kvqbsnywnsaa1f5z0usm8ee8oopx689mvo4dz0mzpadv21v3z98qhf1adqgxtzxogeoa6um6catxuqn18bmwv9n9j2hd95l3fvzr9b33p9sbx64e047r5uu3whkmzh3css5vltd56btc0symejz',
                responsibleUserAccountName: 'tdnm5ocsxnushkbj5pou',
                lastChangeUserAccount: '7kgdomj7w3wlhdn0abu0',
                lastChangedAt: '2021-05-23 17:27:37',
                riInterfaceName: 'rum8hny9yxsmetjpzc1ur54ns6rmc8ait5byujh2pc8dikaglcfsi8ut28jgns2yld60k32egp5sfyzu3n8jkhjmzyz192qaj3izc2dhfs6n9hivyh4lg6mvbxbz2pmd83tduho8ow0jd087bu0vevek56xs111d',
                riInterfaceNamespace: '77esj90fkoi7e2co1p7pxukxtyvuwgsviv6ji9efpm7nc5jb6ez3aqedbtuk0ighr8wx9kw0axi48rf88ibx9pwovgh9zc1d62m9acem2yalscdcs5vcxzf0rhujjlkfn3n9t7vc14jbcx48khbn2pvrmucru1ih',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelUsername is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemoteHost is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cd81d23d-9e02-4db1-902f-f6d7d2c528ef',
                hash: 'xt63jg3s9kje1kswc0azvnc8h4kxiuu5m8vz4hg2',
                tenantId: '7cc7992f-295a-48d2-865a-915d0207355d',
                tenantCode: '8jucqckcj1w6kvufos5l5myj6e8kf0s6rtbekf7xlqmcko2dxp',
                systemId: '04023368-4699-46ba-b734-233945ba2eff',
                systemName: 'iynpexerlh7cx5z3eohe',
                party: 'zvwy0sz12jxbc9y9rhfb8vlxe33ngkmwmkqu82ct0qd3nax5gh2pvelb0ct7g6wgz5nm9s6sy6w8zw13uuo0ie5tv9vvn9c4ymbedekac3ch2i0wcv5x5usc14nadgxzg4kllg1z76vy0nblv25jmqgkk6ykrf9b',
                component: 'jv09p90wwc666vgmrloy4xvwo7cqa9nv889vshb6l7y23z21oh5jmwxpo20jl7l41h3tnu2qy2qmovoj3ye1w536109etq28cdf44983xcekov3m1oubeon056d3o15180d1g07h2u9j7rx47662o3ixdjcvodmb',
                name: 'u2q0nio0auxzm5rl9xb80ljoirdk7c40tx5kljzk6yv2meirdqlrte4dk83tjkfem1c0whhn8g5x6xpi8hqxt34amrcyvkm96m0ncbo2ooufju5qvv66j7mee6dz4u9q8mb2w7fveq6bn61k3cqdf0xtlebqi8vm',
                flowHash: 'ihs6rd8dotwd6ybpe40frf975bs69dusegxmrbls',
                flowParty: 'xgjahea27k94xxyxq8ah4glwsah5lg3uqcdezj0ydtyallrort8xhwfgt5963a46yguziv5pxnf2kjohczkzmj8lznkkyc26htgnzzvufptvdt60ks25xpqpu1ko5f9vtc106t9nyp537g1wyxj0zfaryateqljn',
                flowReceiverParty: 'slctbmwvgltct3e68i2s6po5s7tiqv3ujac5fddfn8umlkappptftnb6xnem2u3g7dta2f283ymkoljecy161ti7xncr4wsbb1tja0j8ryi6ssw4ik9ncxhesnq067v3lrs13a8ejjew7h0pg0unirriichkvfv6',
                flowComponent: 'imh9lyb36iksw6rm99ufuq848aedddjxqjmie8ja0g3gfqnvqznve9fwwufi4mxalc8gs0cufz09i6w89w1vpd98p3r2uyqabyd08ym5x2gbjlxu67hhu2tji1ubuiovsef0g96bfb7pykz6csey1rezeq98i921',
                flowReceiverComponent: 'voff375cmacv3lk6be3m31vzrcb62bprbmg43lv7jmqn4yaf6zz5328te8zltyswtomt18prc6zxa5ap3gazrwyppmgocxt10pfeir9e4mpo734jb76c7rd2b613tlm3diifwzlxe13ht8cnujxp72r1jebpnriv',
                flowInterfaceName: 'svlqqoxk41pf6vyndsq8h9qnbrlxo4dzb53gr09whe64rqymxcm51qmsfuf5u6y7i21ruw5shz5lfeqna4iaqev9kddrj3zqkwkh1xf2wl0ru18wdeizbqu1skceicqw6o5syvi0hgqqrk1v2qfv8ezql84qg43r',
                flowInterfaceNamespace: 'uzzd850cj3chazngym27azgjuxniutmzth082a0dtvk2kppa1iqh0w9nc4m9pdkj01fi9an960aulxwrafp02xyfvmno8fo42zzj6v8wo11addwznvofnlckfngu8nrcdiyo0tlpzuxuxc1dsaim7xa7yn5caxkq',
                version: 'zgxe6l7ylpbxxc36vt97',
                adapterType: '3qp9gsy88iieqvpiy6kazlb8myv9z5es75ewejg9hz6b29blhrql6g9ad3ng',
                direction: 'RECEIVER',
                transportProtocol: 'ynqizf17gensulgdwqy6vo5qefdzxjel56dee1m3wx32wifsq5lzh1rn718t',
                messageProtocol: 'oy7h3oftipk0s7xvfhug6x7jm21s67twg7meaaal1nmm2elygvrhuzoqt1uc',
                adapterEngineName: '93zvll82trfqonwzwyl9aimuocfllo0mevjcjowx0jhb4vgawaaoq4ngwpwboaflwr6ildb4kflkm38xzgkx5v6jfby4h9gbqe8ozfwi84srfyiei6gwc0aum132vluy6az0f879v2z07i9w1wcq4olww17zuas8',
                url: 'li0nprrem0np51l734u5q07bdmx8nn8pn3yes7cupd9gzme6y6f4ojxtbcemqfk1u09rnm5v7k2my9c5jkx2lafputrmjscqc0u2fnkienq6xxwdck7n7ofglkwsizwsypot5pju6yk1h7q4j85o4c11cmbtzsji81gnxtvi4x6v0ui4sd5itj6ppuu6hqvm5d3wwf6j3h8tjgud586zzu98aicv8f8liq0v9qii9gyf2gydvkg9vs4yy1hndf6ybmkun0chva6ywebhb7g9a17rfj0di8xftodoh4rggmkxr8abalgfqhta85pajgyu',
                username: 'uvtbwhpsm8xkt78jmwyklbsv5a69cw75rp4p0c9pkd7i8o4lmgm9w6u5n7lf',
                remoteHost: 'img3xfvsl5w7j3ro2ya7p3esv01v7dcdfn02gal21nn561vthrft486w4yvbv1th3fgg6zayf4qqsru7om7m3hu34tz8yxrqslvamcl3man9zrxjgmwxgjktqii3cdegggy8emnl9fml9mxf0r2y9kwhwdj233yem',
                remotePort: 7905344478,
                directory: 'cjre7skw18v68o384tbthas5ml63xlwwgp4xwkd4q6u7778ra06dh4txxd6x07td5dnxrzi69y8ry4vaudhfffjraf96in7a9w6fehq6mx6545j9sjr791rze02mymvdqdklcr8jckurxopwklgm3yswhxeumrj7zmw6b7aoek9vlgvjnlbuonvf83qxf3y4x9wb6ioksn8balzf1l7ytdjqz5g6ehhq4hrdoasp2y4rz8m0swwestk16g5aana5aqb6x9ddvubjdck628jfllv39lemzkap5vv1i46w9svycc3tmhuvcnw2ytyyxc5e49sh2x9yfxm46q8j7ny1t09hep9s1c0c7c26hqody56fcc40b2b2dtnyh0fi3hchp43uue71zvfoejqo30jb3j703wfd0vmkaeuuw8hogsxzwfznqtah8joctv4rz9wpmk9rzzkt5dvgug193l8ck9apebgeiq8q2oeo28xsukjp3tyhthy84ea9ejtogyjf496ajbzg0xvz4658zfwfp5vi2q7bt9mhljjje4zpow204ju25asmtuv475eccmct2oluwdyjsagaidnztl7kov3qrjl67tglm3h7lae4vj9vt77vqbkun1hafup75nknx3048onfoix49ik1qdwippgo535qicklvl6w609x229hhg0zcmtm2c3svfiyal97s56pp3vycpez3a04evzykseto5rflbo25qzue3lhz7ryytkv2ubfevqx3lc8tofxhpcmbpljnt034vzqmctx1h2f7jlfvaovk25fjdqnm6jh5ikw8ar7skiig2ya3mhip4a34w4cbendl76zr5g3zga9exegodvdfdk6ukcvph3mk6d0ut3s2t75zb6mirebic7q7iv362o23ua41m1qtquklztuydhi9vnrknd8sddcwfou2fh9covj8tjm4ok9d68o9upnuqoy2etaab00rhdnfjgjya7ltkx0qu9omqch29x6xp2pj3y8ds9psg9i',
                fileSchema: '6zsk7djw7sxxzemlff84605rien0pxpky1q09jxoci8x36nnnsxgtfn7ty0mbv8g4k7ikzyq9rdt2cy3ovo7wyhx7p1lowhjorr2pagdgr75rqcumgth5nz6e91os26sq2k0ool7a1lfxpwnuyzg01uldawcpblbb6lfebszuii4rkr647mnl0jlx59grpuxwzsndu94w37gkq5i9a9ovkq3u5sg1dveod91gc0aiw1vlmcs3bjj9s9papbyju3fao66izk7ar5y2yo4v626omf3g7qj72fx4j80mzc9dr857664zndshvdheig5qz1r1ens21h5htglojap5ugych5noucvzz47qmipj2hr5w73e7gbulljyb4pzrympugmmv38wex50etm3ynjiah1y6nhr75rpy2bm4fsebfpeq000lnilykplpgwo0xs4y4dv1728zck20z0x4hbtxawyybppcckrjwwqqzvi03gflamvq4ltn97rixdrigoc2iqagxyof5dydh7l8q0vwefv3dl54w27f2uleiy64w76a4yuw929cfrts28xmqayns6revuz2wm2dspqms8mzdi4ld6q76kuyctxb73t1qytra4v8qgrv92cpfyry328hxcdm271nysumjs4ntsth8nr2wq1mqd9eewqfegqygiph3zti5veqhz7wg1z0fiivg08tjw8ykmwoz177c3hdcl9343y47dh2pdu0zeah2ytf0kidyx90b1uagipv2q7zem4flvbaexb5sbliydpt7vrw704zjd5qdbecqqk1ms1vjf14j2934qjid65tb3um92qtpqr2dzxo9dxuwxif5hcqefk4ere1a5xhix1vihkg4fulttdirqfzzppgfxl099xa6emr2xm32ald90zzudzbgugk2123f6oei694s0bge2o6hxink2m9u8l04xfoxupzqljlc9vbnbh54d3ush72e0pntlff1k5qgz79lts3jpdqr8p16iecvzfiq9be31',
                proxyHost: 'b4wufkycepbj2hfm7x9dvbyou0q26n7frh30flxgucq513jshvoo6q4nj2u9',
                proxyPort: 4011877459,
                destination: '8krmtyfhiz7r68aiyvej5fwfls7myvyoyvlvgfybzqs8n81bys46fdmpno5yrhtxwsntt3gkx57b5c9dn7ivt9xqf0xue255d4z7iywu8u4keuleksyevytia0vqhf7yncoqi9z34tfrrkwadvl3czisrcg3gssj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '9cj6ql3nlkh7x7uo7e1ic71wmjnc7p6y6nqjgmexlnxmtcb99vmmtg4tesq90z2lp3x4kxmjzu6ev2jxn2iwiq1vgql1sjuvyzat2lcxhr4kaqb7xa2n9ddn4at1dn6oa84ev3aog7fm4g6rywiuvg4828rnxat0',
                responsibleUserAccountName: 'reczr9ef1nymyqwqifyk',
                lastChangeUserAccount: 'jjrxznin6hqndx22djag',
                lastChangedAt: '2021-05-23 08:48:55',
                riInterfaceName: 't85yyfwyam7b5nfz1qhl6p4urp8ntp20uun1dikicrw5maeoj4wp4304148ztpwmlv2yhziqu1acigbhgfl68ewjtt44kftpg59jszkg2n0pokwtladzgi95apbsk8qb8axsuzv9lntswhn0ptxhadnmti3tw309',
                riInterfaceNamespace: 'tin8d7lbqlf78m27g2propeahju3dhws6n3aw8neayql6egs6w1dqp2tjj8n3bhghnd0zx2qcgafgvuv2tz7tcfsk2xvi9jfcde3y9r2pxuugq2z4tr0xra191bzmdie89pkn3ijw9rl4fk68jgupakq4ec6mui2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemoteHost is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8c5ad35e-8083-40d8-a9a1-c7c1a434465d',
                hash: 'cloqurvrq8bb3qvwi1vzt97b5bo1lnwb5f80ii2g',
                tenantId: 'ae016345-7afe-4935-828c-abeba8a22e19',
                tenantCode: 'l1knk3m230e7jhvtp9t865wysj3secxz5cf6y9tv0s4ksy0lqe',
                systemId: 'f4e1ecc8-a801-4b41-8d86-b4c4363e09a4',
                systemName: 'v97zkrdwwazcira3n0qq',
                party: '7xzu0rkctriis8vsweeb8c9brp6ie2qs7gr71qj54hva81h0p4ny4wclzp9cnb5o38os2up3mc4rjavt4431uvfz2p5kjicc92gri411cc19cj5mswn8yrbx1p23vqp9mtrl8usfegkzuwz26cshgm6eetyxqu02',
                component: '50f5kugmcgdvef9uh3ak1rtqfbupf6frwe10l7z6l5ct8duklomml5oxxjbypacf2xgkdtwxqeo8ik7u0go7e0fspjejeqkk3wcvdhodb17ydvg3hakx77j44k8vkvadgx7gqw31go2tb14aldb5oz0pccmekxe6',
                name: 'vs0ri5eg86m1kgjz8pnawtdibglldfxwoyjj7khljg5bijdxij5vq0tpekq295iosc21ftnodjidxqhq1k3jeaevaixnhomqxp9z0gm6ahs7u07gww4tgk0nmjscpa2p999p0udhfph42oh6a7rkfkrzc7svt4ht',
                flowHash: '289ee6911fv7zz5mstkkz39glw8rie3pvfhfpql4',
                flowParty: 'ie0phvmpksr2o6zdzasppc8thhfz8zj2vy7zz26a0a0n7xyq213jcj7hxfsdo72phrie0bnbr10vowss60z67dpxvk5n9ce175uk0a3m6yyzud70l4p0j8gj7nxa8799by06wbug28unhgcfygb1emb9z3j3oh6v',
                flowReceiverParty: '4ek5eay4e74webgi1icp5l60vio32xlm5mehztt4r02pkf3tt9maohxwmozzsp8fwyuob2qoeozszqa31odanfbqb5grepfomtl1jmix2ogqrgdehhts7pf2ephfsfa1b1a5vro3cazt0ew9lvmq0kserph2sbt5',
                flowComponent: 'qj77f15up64o4i7et34kooblhnlnpm7rt89qbpjw5xxbvb79ovxmgf2xk0hcdh50notrejmeyfhmh6bktncoiazikq3gy294n32yey1q3l650ef3vca86iywb5ignndbdftc56u23evstw6hj6kn16uvf4xn21hb',
                flowReceiverComponent: 'or6sfvy8cdxwjky2cxj55qyno7nsh5psimdqexqfn7p6oiicme248300xq36yeg03mdcxx1f1ut6k15jesxno3ybl1dlkhnzfgj4j4f6j7dpkjj5aekvobu2uvh3z4qik49ke2a6jwsfbfiijulpjydu5qo1q2ex',
                flowInterfaceName: 'o4o762z9n2dr4b3pm5cj06c1e66us1h8pg3csi9xcuignmm2dn296dozqf646bizhvzotdrdlkpc667pj5wo72vlr405abgrw9kon0ajhntl839d1buc3072nhh03mfsdn2sti72dz2osi232bmk01vd7mkxmm4s',
                flowInterfaceNamespace: '78kkkq0tp22tg92z6m52lxovexzjfxw9q2izi9u2umpnt8plt7ys784w3jg2pkcs8bi12p9i113ks2cm63ywwaccqglt455i8yq7krgy9uy4a1vr51w0xxdwco13bgo6eyye6in5hqbusokis4wecfnndw73rgjp',
                version: 'w6svvjemdfzmmxg5nmn8',
                adapterType: '5wfj6gjx29fsogvt43ip7841u3vkpjjb35gckcclxwllf4amjyi6gxj3k2gy',
                direction: 'RECEIVER',
                transportProtocol: 'aj6l0448xehgjs8jiwuua5pktvzo3o87yv5rdfqs3btfedgl3nt111ka1lvp',
                messageProtocol: 'n2xp720rvcd8y3j1fc7m4ghinyop8b6jgdlcnqc9su6qfaqsj3uanum9dk2s',
                adapterEngineName: 't84v91zy5yodw1qdmrvopx8s0g0ywm0lna49nmo7acygl5tycgft6e7b8rj20cdwguc3el610mn1h5vsn378147smu9nhebhncw62fcqmkh03m9nfog3222jq8lni6vcjyhtf1hbpwjgrxzatu84ua5cx24jqha6',
                url: 'ei7x6rr868izajknd83y4fro9m2lgo8u215u2fr7vpskpu601atrwc90erz0jypok5h74z6dt1red3xgfzxc82vxu6v5n8ko9pxabhsshhmvoqkasmkbwky08krazflne5qxgegfa3t1bl63bzzg03q333th2eoiqfk4wbwpc98qfu6z36ncacqblhtv9grv051klxvcebzq95ig9on8ktt06ohxndp85smkr1s9pwoyd1ijx6pq7rk7k7ei2v7ukm3n0ryq73ahbcvdai9s626ofc4w4ah08cpmg2uop5fp92wxcdj3cxc0z0u5trnr',
                username: '3ylh8c4ldk4t9gwrjhemnbcwn0oes9xwkb4ghnvz7yjx9o1hx57ten0pa994',
                remoteHost: 'ewtqx8on8wgd0p363u2dy46kzyu4owdp0bf1s1mmc90in7e56ym8s0dsdbyr4akwybe0wm6rbv0i1zcysm3u45vmqay53gufzop5acxilrqvtiihvcza84rt2yn2bniq908xdt3wopesa5cz2wnq7ynkou4wo13i',
                remotePort: 35557611882,
                directory: 'tlilac02jy97vfoulztgegjmcbzmscdtnjyb6xyb3youvfzyr14aihwfhtav6jvcwm23f6885h57vz5m8wbhsn6r0ni3qimrng0hxlwep54dz3q40efo0wsw75hxgukt9f9aoe81nxsej084efg2ll5ok5mte2xy8xuifl7tivhde4ly40nr0602bd3t20zyf2hnb3a2bc8lvloq0yifdes1chuk0dg8hfvevvwxyf6gcvvht9g4y2btgtrod0729iedayor3qo1aq6c9i6a4ts6uws1cxuxtz99ivob29cm4sdxa3v576d8kze0r7k74jv0qpbcdq04frr8p9dbqu12ikw8vv1o65cgyuhbne6vefj138frl2tq5qsyumcnb626dexn836khozizjxs6088y5ouxub8svrbg7e1n0vjfdmuglxnzqrtbeyyy0arlosiyav9na82lb75dppdjdbrm6f9cgoutgjk3qynd9rgbck8ze8o58zu0c9giujwt05b18lsrq2remx1j4fi34hmfq3xx6rfqhqeknrglttt15npvhg4ofl10xx6wky84ugmveis92arss1iij5frpci83zsbvn2ff31o2uybfyua6mg562flyayfjtct2rkl00zwk99ahlwporxavfddrno10ae1dhd09to5ntw169rl2ghuwlzrqgbn6qztaf88oxytysrpwa0tfj455wrhd3l462ww3xpm3i9q5fyozrk6ls8p07nmfpc3mphtaikfsmvxrbjcd62oy8dxo1fbbov6odil1scgkrou8nkg8scl7zsdinot1ish9u2hvr1gmxivvgdo6zcmsiprc46yyjhnoorkttdftb5ojvfuqu23t78e9bt5hyivevpb3a56ypih1xu39zdz5g91oxd2wsi179u2xyudj55fbzo0ganojlu003epg3o2fa513gnnx4o7reomlqiujbklks4tj17fr4chihq959pmm5kxdwqomcmo6eu5lpvvi4zktgm',
                fileSchema: '309mttk8znik9v8ngqu1xs078l4hfeynkynp6c2kd75wnvs5yj2w326pi4sl0xg47lmss5f83ho1ajh6qoe9bt667v4refgcrcp37f99zf82qd4yik0tsf18y9vag4b5op608a6uz0nyayugd8arwhak2ed6ryw3469ojxxdsrnhrdhvndq21seeaxtbbgwjdtmt0fac1i0lb8ffv9najpczq2mzcbokwfod64065m3cq7jboitogffjlzxsee45ug2slhj6jyxysd9nljfy47x6hiydqb6evyhuykty6m0ur1x0p84eq0jtqyixq61n0w5fbtfkk8ubzh4u2t9p0hgbxqfifymjljvznc33a1iaohqkps24kk900dyjpnpizg2d9qmxkjmetxw3xmslqca5z4wustzbipwgb926c9izosq2tsdrrgicqx80q4v8f63wjelgwifgnt9z41v9aj3nv5kvac5sj33vqq4o2skiw1991hj2nxky6j60inhzmhc6ars7g91jwup74fq3371gbsyrbe5jbhesvh82ch3n6qapczfa7k8cl7re304cjzwpjdry4sa5j0ycapyr3vnigkfj437zas16mqksnby5yhqmnsvg1vhlep52325af3zuc1hl494eawsxvlao2c8v69q018f4xbg5sgkdrc9yxvlhs0sezrf8llgxjfz6pno5ytq2b7bbdyyzwtynh9vgmf42nrpp2ty8g1zbjmwk9rfp78sa7nljj4ak9ocsvxsdprgyemvmohk71j06fcre44qmra1m9zrejy2kn1pcnmog76fkg4yqe6yajux1wg17vbec8kohfh8z9qyawy3y9ymb22n0xac2a8quez68qg5h5rsmuqjtyjkm4rv7nnpsbitnodjdc2gasj55fqnf4ix653vwkpluj5n1k02908vi8v5qstf0nw1a7ap0m1mqv846krjdmxxcba1z3jmrvm7gfxewtidcq6wfojv4lmwp75rnwafehjxcsqey',
                proxyHost: '24fwlytpci1hgxbxfr890vthuv7gkh4zr1euk71to1kfq2kj98pgng1ru0yz',
                proxyPort: 8960751371,
                destination: 'ic8dfup4uh6zh8fobhc8hns1nv535nhj6w2hd8tnukzcyt8byj3hewsnrw3701n74doo2834ru5n50d3h4ad32aexby9s7q18zoiyjatblt6hoe82lafozjkag79yled5jivp1cyx1am0cn7vke2ujuhoxta2pjm',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'sny4tyjvpycgf75tu5bl2nhe97wg9odtem8zgf1tr668i41717dpoi0q68ibxdhl93rf7o91502d41y9nu9fxo2wyif1ot1vvrvlosh95oswghayfj3sg5gk08ucp9r5t90tyvx6ck585gpil78trelmkxjyi5co',
                responsibleUserAccountName: '3qonrpi2lok1ygl851ed',
                lastChangeUserAccount: '5ma0ckgu0j6ts04gram6',
                lastChangedAt: '2021-05-23 04:56:46',
                riInterfaceName: '70qdbe3iendw8j6uf5ue5c6yhxyvby8n4s0mrqiyesaq986uu7btfqdhp0nebv96b35pe9i1jul3s36cm3yyopzlat53nwmm2j3scqxh6uxmbkrz5wucj5ipdiq3b22x2roobfyn9rklmlitg93ay7s5o294au00',
                riInterfaceNamespace: 'w1dvqfzd82f0z8iu8miqlen8vppvnfa9f415thki4grd3l59kpgcqe7hg47qcsdr8bb7q6b4adr918r7gmsat4sgvo7tufkp9qecfvkuvgknvwhulk7jdpbzghbkfgo974m3b424okfdiab3ob0flqji5tjfmp3i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRemotePort is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirectory is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4049d521-712d-4e56-b498-f847f2266cec',
                hash: 'o7ugi5dgm0g5txef99yi2sn43pv05ablbthgsl2i',
                tenantId: '35331b73-99bd-4f17-94c5-51e831720fd8',
                tenantCode: 'ok2omz73l9gjpw7xm2igc11ri9rrpkrnbf3ue8wdv7b269ep3y',
                systemId: '7f6b8781-dda4-4824-a99c-f911aec1ed35',
                systemName: '9y96vr8xolh584vks2p0',
                party: '2qwtrp6prfykrotunxaghl0nz3f72behco9asdeg0sizeucu39ku6gm0cgo7e1v4jpl3nd6gw55ldkrlbtwlc6qj4vxdvkc8i8pqrdrt6j01va1eoza9m48czezrcqdmd7puwkkisqtsdtrray8qt6ekz6iu8jvu',
                component: 'jabcb40yryjk7pd7gx8r943pt2xm02m0h6060kk8tc0ivvdxtuwtx912xsbv96zk7gwlidbjs8ju42z31dkiwc8muzmfzcohl3crgsojneul4z6cgqesbjwz891dnvj86ms35jv3hvzhktusz4ac50xv793gpr2n',
                name: '5l5k7141euw0msp37toxlkc8w53uvznd2mg5ys7rvkijwtyi41xs5c80ua1695w7uj41r6r24t47zn1griwc3uydydjk3n8q6hsct39uol3mu82k4q9cbx4xjhv7o3jkjocpsifkat3cklp8skvjrrcbf4px2z64',
                flowHash: 's5pwxfyx00ypmeugp8leaevil8thawhiilx1m7hn',
                flowParty: '2a3ux6jtv0z9bccf8ko7dthwwf8jean4obrzuqiikd6uifvk2x9zqayuxxyiadzxsxvvpmtyf73smv0riy5qklo5agy8d5tutkszzosbp3411zlz9c970exd4yd9r21oacqyoi5hr9ph8mmek7hjc3re4so6zv26',
                flowReceiverParty: 'pvjbymfoihv8ryqt4fz5ec4adjo7153ea30l1eynqcgga6eirm1en09nmy10l5us68i47aonbpznq7csyea6eypuoh2yek58cwaa1704coppr7syi5jzekpmh89anmfywkpyni0cfnrbtkc116kbw9eua1xq21wg',
                flowComponent: 'rhu0lt6xmitjcgst23oodxib5mnomy94gmdb9oqiwidmr3dhhl6sdfwyujwfgkg8ipjjlgy4ye22qjg8ucfchfr9sqvaf2fvr8d5lxa85k7n61zu5k3w6vtzvevw2mq6l9hvs7b71ogogttfjsc0gdkljpidmqj4',
                flowReceiverComponent: '93jdzb0hv7fvnid4hndnmfd400sv4kzoy3iokzzh5765n7pnu8sbsm2ecwhn9plvmjq4wb22ksc5fikf2vz7z9h4o66zatmsgnd0qrkzsh62a5jy0omg8goz4a8w6l5ompleuzmvkx5ufam4ufpqsn5rmujd7pp3',
                flowInterfaceName: 'w8u7jy7ns1m4ihmni13jphkm615e6hzqhjua5ld4tka1a7xpahlw83aswr94nshoczv29gjf2vlnd0j2jtk8y2j7fitpkrcn4wsb9hg1878qufapibueg1q5ro7dtscehjxgxf0swy4wndt1984uoom8iulvc4i5',
                flowInterfaceNamespace: '1gxeztaljtmnurwy9reb0h7dt7kca4vk5fyxwom5wvpieacsl4yu0anh8uaxad9vho6yfz7ji634l0es433slmguacfhqvaorzxuoygcom0ssf9rgxacfsz33c5gwbyxkz81quzl2m2hubsujdsnsj34cxzyk451',
                version: 'oy89c3ijds829lczv024',
                adapterType: '7cgqfoozvxh2m9fjohmtqey9021vpxuihahoo8mccsvlw0p2shp68jj6xyay',
                direction: 'SENDER',
                transportProtocol: 'a00kgu4q0w40ee69ytrwm89cat44ljd1ut1y4f50p1qylbdfi5ctzk9q3p49',
                messageProtocol: 'vf93azdemd0vp4m2vxbdbwvwp1ul2bnlzq08jvmqigbavf993dfhlj83nslw',
                adapterEngineName: '67v9nuag4ieuo6sd9iwhu7w487udgag779m90gvfej5yhc8j458fb5y0l2h4i420ejiwb8sv4a3vw5of796fyy0motylk9s1296x2l5tcccfuubwdf82mo6qkd2ilso8f6273xzmb9jze5bkdjyk3dxl9klz5e6l',
                url: '3x6g3qr2o856o7spz6d383l240vltt0tqpcm1n4an43t0ujgr34g1e96fkh8hp7952p7hi93u4dymy0e90k1cjvghtxm8tt5w7e4iynp7qxb3f8q7n9ofxz6kcsolobz60kei28sb5metcksw5aa3rn816ca5xq6h398uyu9ai77bxle5cr935tzsexftm554g36qc53huvpulr7f3q278snl1m7mkjg8908tgqi4oz894b69gv70ynm5ly9mxq5ozbnug1xz4mpmbqcij2qb5xecp6g50n5eigdaxxbpmww6brrz4ci26xqmfchixmb',
                username: 'id3bl24chvl2e8yp3hccwx79gb97blxktucym6vda5r1c7qccllbqp7y1x79',
                remoteHost: 'k591hfinstrh0jerbbf98z18gmtfvzisd1hf3f0j35aeacj5xmef1552txe0vcpt26p3j77ufeh02seompwc4dnwpek6di77gnrihaqda6py58svbnfwlqrdj96gtsiziz1ggequq69ng91lhe0h6418lwwy3nu9',
                remotePort: 9854791644,
                directory: 'j2ogn2gdian49z51eare3guf3wdqbj849s84fxabv7p61npg5jbkwbusanvgh9562ckx90fq2u2cy2c3lf15vhhvpifb2d3v38fck765tphthe33ru264t9m0098l705egqnuduzrous83m4t8myuhfw8hmhj9imn2nqa2491irbhmch8bhp0u1vegtjhx6w0okp4wz75ht3ia5zspre8vmugwp6h5nl2espbckq3fimbz9prtgeskg8mo9eqpzr1v7sg63w240rff1o1ck6fxqkfunxx6ialuh86vzls2gxhkqbd3c546j4bq7cuyuk4bjsqnvi3jpk8stprymb43uvpdtg7qufepw641b8llket4zm9omxt7g1giaoh2obulbefd37tz4yila6hx4rduormzdle8wh8ek3qor80nb5b0rt7w3ciwedejwl6vvs5ra8fuuguall94x50o8gt11n8hg7ud8w86xowcuxo49jq3e568oxhlyvx98oumpwbdyj74bdhd7agrnwslrdo3bxcfj7gvzu6kzr5lj36l2jbh38xupm0zmudsddzunak2q7s2h33d3ltdk02f8hhy0fnemja7d9ne4h02t9lpfxm53gfk5kpizrp1krderni5o8mmhqis31dm3qwwof2d4hrzkd65ccpbnns69rmi0qgeldx7ts2vods22huljwpwekt2zummgcuj64smyljglbk9o2ux1uz0ad8pqy8ff826n353qgtul0jjmsdc826sq49j9iuy4w1h1x04aqziq3ytzman5qf2efk82sbiuv5z10zyr9hvgkjlc164619v8sikw67j3rufd7qyvn50gb0a3t1s0gq2gxbdagf3tbgr8ecdm8zbokcljwv1tyxryrekwn3fohrtv7pgerza6sjz1lf11cynofocd22s3mgg6i8t3n42txutdzvfes11jwe85887v42l5mcctn80xl5xdh8nfw43swrsevwgbrypdk9qh8abhmr97huvg00',
                fileSchema: 'jjwtj4ug89qjzju4yqk51n7eda8qp9k7bfwov463h07y4569ps5m5h2e1wdh024oca01kxjg1r8vukqnz13zl7ryehd1q2mni10q9zav0ylzfz2y8u92unk6l31unrz2cn0abkn2facsn2k4ynm1wgi4wma7l26tsb6wzqgs4s7haojvtdzptwe03dgc3c7573ynudew6wxewowlxml6d1fpc8wiivjibugagzmm0lu78vp0dye72d0fzy8pvabzy9xp0ts0jq34ztbtosvztoyxkk6i259dhda6iyieqs32auda71tghsghjqc468oebml7z4yeggm78zxtr79v5havgcsfhf8qyf7cq2tgvluce67xdgc2erm2fn6ks1hyk71dv24pmdk1k0zz3pduxkzr2id1c0o3cp030ff7ws0wojr1s73wix7l6mqeotb03tp1em8kf1rpzkv6h2kis53mmg2tpiltdtejfain3xsvnimv16gl4do8p3dztoxoye0sppb516gzwve2p2z6n4xpo4l85ohzh281kp5xz9uwch4rgzkdvmdzbr6w7ht413gi3cbyif7o1runx1pwu5734m1lqtikcruw1fvxjscksjo65qecahkf6akev0fqgykcbetdgpvt2jf0036by4z0ak6nhxdbyjyadh35e6nps8k9xgcbnc7azoyyaelsscswaht50t9ovg7bfph6247wqevgsmw33t2g5z0rcmkjh311kvcc2bel0xn3jynpk5tpqlahuii16pp1i6sn9pk4drd7ycecyyiwt1rkjt4bthg9cebnolagmoqwyei6r0mlu3o28xxn00vw594oi1sxgxql9ou3anoozmc7gzpm8imt8u93i32tg4ltc2uywss6b7trl6cyc6880rvcrwca059hgg5vba8k8xqo55yxanvdxrd48x33ty3slcp20207pl3sblqhwq9ypk26oy1q0f107e5t6fnjlz6gfmvo8712ydl3sw4noqesr3wk',
                proxyHost: '8ocaidlgw4hzp4z89h95uhxru436l903tsrne9zi7vjp6xghy0hk30ueqknl',
                proxyPort: 3749310786,
                destination: '65wxob51a4tli7fbnhw639flpndeyg2fpavgr4kgsxlwelzuwbcayrruf41q8nxfp4tkct20zrw3r5oyw48xqr50xpjgq776blw0zj45yc7kx4p6yha9zz4fquumsgxca3fbwrde7s3g7xw82eekwzz761fgvsrs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yp7lr491gohyjltvikt3kicwx6984mol40hhxs0atl7z54rk5f506kpkk8ylghim90k4gpj6wuzaj0xo7phr51hufhwrq0n969ibibhdgrktak7c3p23xgw80j88znvx4b2y95pqpnadwr9mcd426ul6fftmtht6',
                responsibleUserAccountName: 'l4me6zd04tb9oh0qth6n',
                lastChangeUserAccount: 'vfqvzwygh0q58pd03qk1',
                lastChangedAt: '2021-05-23 10:12:53',
                riInterfaceName: 'jtnvydxaw6grcihy17csf5m3fikj2tcxztn1loo5zo0ogf2m3f41p4c41y7zwozvobtpuwid1l51ux0b0igjdiyvjczdeqgocs1j12yoh7hbtsyx8rbtj28m69wstdp9q8iemvg6tc7pvhsl9zx8krxly6idyplt',
                riInterfaceNamespace: 'iquwet0ybubu866pny7g97asn63on2q7bn3o1iqn89cymx0qzg4wbhvg9821xybdb4j077h9v1mj79pvw56mkaao2ruuivnhxv2snojew5t9ff1i27sxbs2gr5ngkhsi1ktqlrjowz96kjvbkceostfan3ein79c',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirectory is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelFileSchema is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7d230df8-2e58-44cf-9726-88303c89c7f6',
                hash: 'ocahsm2r9sqai2o3qlajzb30uf3f7ixt4cu08qo4',
                tenantId: '28b47c96-0126-4d94-8350-f9b0afe1bb66',
                tenantCode: 's5g7xkgoouwpswsuq6rs8m33xutq42a0913zbkq6m5qexn58g2',
                systemId: '4d136076-e6e4-4260-94b5-73b290c69df3',
                systemName: 'a3c73fsyivwmmcb8ccmp',
                party: '0ssfje6qf7j0dbfke0mr8lnmy1suwwnzegmcob3yj2weul715btevnf7il8tncilyjkov4wnyqlicn0bj2qxvr3vvu2q470mexmifh0clcvsiflusc0ugwzuzps4db9b7pb84alfwk8pl9mwehnktqiquybrx8af',
                component: 'c50ylkpfwgfd2asfks00qutnq83wl2e6vd52q7uyohyoppp7lqkrezuxmfod6848lxqydtpcq394ujhmstsrfizi8c5hsvwlhv0qhms20186dd7plva4wuekqrnnmpoukzj9v7ljclbi4ly904zzc9mnavxj1g91',
                name: 'ddp01p4hjaa3s6ptuwre9jyplw74anxy490knnnbkplto9gh31iuoyuo4y1pgio2u4clvxlxbur34fpys5g7uyd7x0b4usrfgdm9r374g92w7tu249nm77eqwflxu64jcq9y6pnldnjyrgu7hr9xu1rx2la740xa',
                flowHash: 'ssu1wu10a4g48gsmq9ueg9zffr3i3pg4rat7jcdo',
                flowParty: 'f507ymasulepjr03a6wuqgqldzxxau6yqctr0avmgzq5v09z47zinr335806tdytn2bbb1wqsa6yn91m8rys5kgsflsi2shju6pf7lb35iy032k5bpslz2rofwyprbnzeoaglxig5q4e9f4k7pzk5645aalt8nn7',
                flowReceiverParty: 'e41ua2pnzgifb2vxffxqffokic51vc7id4flbqc33kbhtxnyvdd56ao6tyx2zetanuhwu8oklcysuwwrir40uxaerdtbfq8ne6c729xmywi95n3a4huuto4zdm5xv3l2ot6vcmk1m57kaoq30o4waoz0y4lpnrdz',
                flowComponent: 'dmrq438o8wt7lepxz5ralveru915me2vcvytpe7lj8kswzt6tq5ef86yhtaxeyopzp4690ppcwn558c3fjnxr2kagfwtc9n3kjqac9xyn8ch2dy1x9dymui3rteadnlv7z4zzz1q23ttmjwqrgy0fug74hnv9zso',
                flowReceiverComponent: '656kx0w4cmhs38wzx7srkcrap306qhjqkdtyfgukyvu8augkfn30dacdff4oph52274kyzpcysh9oj6eys3186zymxrngl1xh2ysamurzn4r1cbyw5isnfz24v85d8vng46vxupdwv7ev4pzb6mb4gm0q31t5trg',
                flowInterfaceName: 'a9no41ddgx93r9d7qfg6ruumrhao2danzxfnhp5gmhbfhkcdfoq154h0vfjylh15mm1uqegxuglhicnc2lxns0odn95n8xqbg89r8vjz6tmrf63d4sccyl6wz01srxtbg3jj75j7fh93e2lcvjgy4ysri6epimpr',
                flowInterfaceNamespace: 'hm6i1kobrfcbqxye8j5b2d7z3yvhmvmqe0n7otllzf02zhkeph5x63kveu4l2udvy3l1bzsxwy5rifrttlfoo961pojifb1v4rb4u6xf62as6r8bhixywzvrtx3r03wy4bl0fev1976hc0ljqg2laej3x0rs6m3y',
                version: '2na533abk08qsdazdzrx',
                adapterType: 'z1unpye3mvh3a2o5du46mwwxb4syosqqt0j00xw1bhifd3fgbpr8204k7sdf',
                direction: 'SENDER',
                transportProtocol: 'lredkt43xwyilddjdfo5k58a464t4hv3jf0waoi8ziadptwak08qw5qo60q0',
                messageProtocol: 'gd8c3jlo2rxsfmadasakzrtnztid98fhm0bnfb3fz7io46jo0zl8imtaaxjj',
                adapterEngineName: 'ty6a3iwk6lafy80dtlc2h5t263cyglhjs9jsy3jmwxie7bbk7wks96syfnjr80400mythlwrrs473h0fshvo4cxi1scd530t9z650zube2ubacqw7t8gp6q208bnzsg7bwwogimkvj103wt48lie4dk4u0seye7h',
                url: 'm13yn3en3t93gj372m84q1fhxy8ji2jpt5aek3mzqr6yhzky1nw0e4p3g744thu9wvqsd5vlnexce9o0pzsh812b9nqzix8dz3efg2l8zugoh3umdtklku8rnf4e0zpd199ieholwyey2il1f2dae9onfa8ssadrtgg9w5pmrhyjjmoimpjbfpqy0rxmbvdpwutm319ti1vy423rvq9pwfqggx0mpe83dys12oe5ofhy6pb76fww4cezhrhywyv0ec20usprnrwr8t2re83c2la7l66baz5g71y3vf0x4z8qi2thr2tx1jflsf7yzu1g',
                username: '4tatec9ckwv88onofrd7rjm92bg4az7ptscrmq3jio9nyqx6kh6qrs2yxm41',
                remoteHost: 'p5dp0kdv28lpbed9jssqlvo4xd632yrbdur0q701qx6wqe7e5x9zbzxmm4lt110wcqwtz2ti3c4u2bizsrp5ssa6492o7i8l4va2cmoa9arw3m2rzip8o8q2t31tk1czpy7gpxjjmj40s1rkkmctuqn6157r9nih',
                remotePort: 7028442572,
                directory: 'z48dlzi90z7f7ra38mvmre3vbd7i3hkyhmd8or8tqerv4l39u1wa90p91on3sl6s27nyov3tmgymdmd0piunh4533cyqne8y41tiesibg1ma5oiz2rdnf1h92otjoahphtvadth1b2gkglzl7u5o2f1lw98yq4oq8it0bu68w7zgu13lrfpktwm6fwzcsekwa5ng8v955apm43qecwzrdiwm71abrod1zd0gxvv6500zui83pdtnt8zy3sl6kcdudpbklahswfugv74fpzh4usfgjbdfm431aligktk1df9oldy2llqzlxqutjbu47bxpjl03pl75s13j8ruvosn92dq0b29jsfzqmwprpvig6oytzf1m9lx6h3jnmh89i8jqya5ij9lzg4dmb8sytpzfg8xchvk5t7r9cqsxd22np14xl8y86jyi67ynhizfrhm50tw31eljjg92xcv8zhusbznca3iwkavprsm3szr7ggrkf0oogpgvvedgk2lbhcc2jz6jgtsk1d73g2zfkmlqmmnryxk8dpskx07rh37icuneod8r8350n3kssl67ysifeakkd9bwojgp95k2fqu9ixixh7yxnoypvoun8iy9vhw3tbr9nyg1y2yuawvp9v941c0igt192rsj196991iwffdnmk06843yg5tdux5ihq0jrd5rrfhyf1p026cnceps81clwajcyzpa0g395djrdlpdykpyw10sm4kay6hocym8sutp2iux5fqqomq01fid0np645kbqd4xy4i8ykba4yu9av1dlvg0hhtaetwak504ruhfp24nawap0c33h08u1p2jylok3x0s2hrcxntx8uwwilxistp2m435ncv4n0e3noc1dmajywdx3ty3pjiloe9j3s3zbg9fyt7pvcs0ch2xviqq1t6vdrb5a00nw6frdt05zfdse8c08mqka4n201ecoa0gktpyq9yvbhb7tpol7kw6euqewakdcte7yvu7bbk47pj6hg5s0y98pnb',
                fileSchema: 'xkv38ognvstmnqjobeoo8098cysl18jqydo33mqyyhs2z76nj9gdfryk3x4ipa5obag61u5tdbhlef9mcidofrlk639l1so82pfz0b98plii1wifeypxbq21ensad1enxys5n80gcxpmxrojlab30er2dvs0ecu7bwnfzla3mqrowxuknrm6s4k437thty5j09rqvopp2m9au8rsr2w9jkw63lovuj4e9zm7p2s171t9liy72s8sxiiltxbekpy50mwh1x1407xtsfuza7u2u75w6rnb0xk1jpj8n7073pbykhn00ypeph4lfpap14b27zmw89re7ys2edg3303v6up1bwogyo9e5gt618uyi0n5ahifuqk2h3udx3prk9og7y56y0scf5tozg79co6tsf8kk8jvydaa6kx7jnn0a0lzncu809vevxrr80c9ns3m7p0dh2tybmchgomdon514ztmotq4z0hldyqrdoiprednrb5u878ptjg7y3c9nlw1ztvpwj9nr96eps3wdgrjrz75vur0yw66xl55es72yrc97308c7x5pcwbe08zskf9zxsvg8r5998cgmkjlw76tldjw2c85x1xphcm1ay08rz31stgygd8fw5oi347d6leuxlzvboxgeho3t9jufu3rjaqutyjujdl6s96pl1oso7az09y4bedk7ywi4yxhb5oewj05tmuqo9sjhwu5x329ki8c95mqk8u9quf522tz4n2nbjkwilzc2ugzasxj0oezfa0mx9eh1tj20vx67m6cmrfbrdmvpxkxj6zxpyhevoduyb9ytx5i2i5n0b2zhbdj2q0zv06p7bz1gy5r6g7wxvcsp9gmyhyhj4phg5yxpygn1pvs47f7a6s2ng9mnqxxfhrmvq1ryxrlikrsur6jvie18p2mjoxrek52cyqok501kzecmisbkiclfad8eugn0vnjadzvouxw99jszr8d6ifetdi7sp1506hidtvuzr470dkg4tezpfst6g5qolf5',
                proxyHost: 'hbjnvoelssdg7s7m8npk3q4meinse6jlfxq985ldbhyz928nks9te0ot7lc7',
                proxyPort: 1581594889,
                destination: '4d6i9vwy696pp77g61q70r3z6scf29y15hawvpec4rchplzyby5beh1zqh47mxuegp47cyv6d5yzn0we5fhoqozrn67w0uxnsi3g5xc7ulrzojejho0wv61s7lvjq2oheakioilyuygemmta9t8tnmppvrwya6s5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vzx1ho8v9mia2wvu4t1yvuycosn7zr4j0fpz3n7xp31way8v0jq7kdswk429ylc8df70q9j9bu7jqo1pmuc91vf9fwr4y508rg22soo6wu4ftl33ezih7s1o5wxaludwdjuchltw5svg078xn4nlq7mf2ltwirg4',
                responsibleUserAccountName: 'u0tuyripb752n1uq7mve',
                lastChangeUserAccount: 'e67dhn62vl1dnu6w6zn2',
                lastChangedAt: '2021-05-23 17:05:01',
                riInterfaceName: 'utv3y77cbhcsxry9ee7bdiizug965323iy2n5ilu2fyn3bvkpj4ge1wjsgtzyd3k13lrcldec9u23tzca65ef06cncn4jo2cx3qpiz1cft1mdqbzren9270y2usbd2twyd36tg71hfx2gauzclsmzbk9lwp62mqk',
                riInterfaceNamespace: 'n569u3069ihdl5xn74a07y613vq9432mcuqpcrf2c8r84zzm9ju51z05xbmb4kvitpmcgwx3vmmnkqoioy2h27plnun6i80plmc7913hvjoexnkqr1xpe00s5yyhoe6iv4a3l081oiu0nxwrnejfnvb2ajfojr2c',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFileSchema is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyHost is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b9e74b20-c276-4869-84a2-d64d90e0a0e9',
                hash: 'asyv441v2385nbesbml1lwvg10eoddkkapb07srh',
                tenantId: '0df62727-ba9c-4202-b5fa-d4ee745187b2',
                tenantCode: 'zcowlxgvcxp3vmgy2m8adcxtxghjb42qkdctmnp639cvavv3um',
                systemId: 'f608a11c-d949-4051-b0f8-57d071722396',
                systemName: 'zxx5tcpnkdok43wk4ard',
                party: '1h6t6s54rayzv2xfsdh6g73ysk4yz9u12m737r2of12a5n98xg134cknwrmhvcjvvbuspf83pofbnfyc72r8amk4b1ne3mosvnwn4lyh9bew9zjwheg64rvblrp2k78ynawmus1xlli7wtvp6slou4mbejwxkcjk',
                component: '0ezq022keekea2gok1bhqetbsmdk9j5i0vb6mnvvwnwtscwsbde4ombjmrh0e951r97ww6sqrjcb28l855tpk7trrtc29hcw03y7t9ppox51no3mi8abxhaunx9ctlo4wc98flhscf9jlul9b83en41fsem0uhvx',
                name: 'u7zt1kbvfgrorha16gpx6u7ei85xcyx9msnzoywjyrk8rdxa0g44iwatpxs99yw960gj0hark9fgo9i8m2lx5g4q4iat26o8r46k3avdjgga49vxy3sxl3owq8yjlhiw0sdwb9dnqhm6y95fmgoh9lnnyuxx8l26',
                flowHash: 'optsk74mhyje5rrb24brx4v85xbk38grpt5zfr01',
                flowParty: 'h58m3v1mgnk6ncsimz77qx354co6kvz5h51dg2o9o9tnsg3gtswxhv2pp1gojfwgurhkj2247hvetyccxwjhlcizv8yf6n46bwtm2wtvem3ojlkm20d8x55yklwtcmd149fswk78pleuu92joh4eb8re92xnmpma',
                flowReceiverParty: '8967xdpxlmq6y9z1ordrlxl3iknebvz39kk8k96op3nz41otqbwmr9amyc5aitt9ozau3tu9euhgcbg1ijmh0gp5322t7ed1ehphhl0m810beqqu2dbq3jiagf09erbx7wejylhty8fywto29y55lth8wdg0pzoi',
                flowComponent: 'bdi2e2upfcimrfgtw6codcuys2zk4jugsvc9r3otzoasghxq5nmmplrkzifl8ofi0z8i8w535za9x9hjxrash1zrkw382aielgds639qxg4id1gary6dulquhw4hfy078oqrkitmqczkkvmc6mlk048rn3xoidy3',
                flowReceiverComponent: 'wn3bbeckdmw1xvuv92aldmnmy2inb1i5vj4mwifbkkibfkqztpwajvvz1zvtj115k3pdgcd9ok3mpcq1vyepsxh53dr73v3m2l30dq1yvdcbe6izj50fajmxmtz8xl9bmstrafcj98lhqts3hgwqtsnbgllq7b08',
                flowInterfaceName: '48jzhh69x6m67wweklpoeals41wx3xazbb1fiupwob11hvqcqzz2agac9n9itcrlsvugwi0bhb07gnvayuqrw3t8k26lr6oyi7q75628qfkusnqgehq935kso8cln8cc4ekef435bag3gqxuz5axjbmr0znqjfaa',
                flowInterfaceNamespace: 't8h2jz9dd0qwea0sjbmfmqfwa670p2qh9cni3t39ljwpqp01g6g3p01fc6cw4x4cr8dtxathbxh82gcrlkhgvis0xlqcny9edgxz67gkh7vrcnxx0yckk0un4w6w1n8ijjmf975qif3y6adltvr4993rpyyhxg40',
                version: 't1r5zzn2ytyj6micn6we',
                adapterType: 'vnizw18nd1kc7bzjfze1d5kf8mll10wwhbbcmrbaykio9sw6m3gc237sd4bc',
                direction: 'SENDER',
                transportProtocol: '7d3fwfg9ljexj6kizbe5dsthhsktyp6bsy0drur1sexshpjq0rb1w8g355q5',
                messageProtocol: '0za7jq67eomotbwbdqq5nf1hzobgsviuoscdn2vcw8zvijjw3c6j34p65yc3',
                adapterEngineName: 'ryapn310hq1grd6nakx3nm3r6bn2v30ddqrsnlmq30n0hq19fhb3us6y40ov2wfu2won6huq86eh8azbh54zxmuqyxk8yjivg765eu4cn2q4teiwa0hmmwwcgyycrj76rkanp1ubug5f7c2r83f3avpjbvvf4bo1',
                url: 'hhc39mujbi7jic2y7a796umfdzk6g3xfu09w7q2gs6v2luqo9v168trlhjqr34pg9e6ea5lpild5qw73aayekaxsp01y7x7rljiuees9bxaiudhpk288c57xeqitcv2k2nygjluopuub22phms1d2dhakcu8pyoxeb7gbywqwf0fztfa7r4rf2d8yhemh5wzj7k38p261e3x8jk2e60tc37iytcwapnbyu2bifqo6yjqg5f8vxyi7skuschyqoiq7ti89m7dtarlxhmri6jlrojf78ex3ylz0vykq361aqxy4kc0q3nfzkli7900niei',
                username: '97oiqddz7sqdlwqyof33youkrrk1n1ub4miwmc451cyk53w1c7hl72am5uk8',
                remoteHost: '3rffx97xmhk67bd4cnwv35bf0dpcfyrbnsyjtjx1n9t0napm17zj876h9wo4e7e9fffmdak555ea2o434es4mqbjp06aqhh004cmxag1u36dgly583lj1a3em7hkhzhsai8d15p7uursr3aot7kiv72oah2h5hgw',
                remotePort: 1372379917,
                directory: 'why3vsq0f2w80a6w2z5csulv3jzsijr9853cesgqf6ea3jgmllt244cmpmqa1i6g6xvwa4jln6353pk5uc7spq2h5nd8mlhrrsoeckoekuo4auf758dctfuxh28xx1uknwgxvnn71id5qesitjtxj88o6kmsprq2gm8kty1nm390jitvsqcmkpc1s7sbs1no26tcjo61cffw173jiu4jahzikc3un03siph1r374j4s1nclrs63mkjytsw074xlcj4jaw0f9tcobk1fop9lyhipn6po8msyxajshnxtwrkdi104es26vi6mg0dx46rb3xpjk7f3ghcpwwyh7ddpk8gtfneqo2wnkxb5b9g4e1bzfxe3mgtll3knbeshob9w6xcf9inh6dom5b4ofoexa59rlyo7ze61x2fk9k0e4n8wi466moxyrici8w20pxjj43j8t61amu93a9prq69ptq8xgnwrktymr5i6a696iqatt9l87d8dhp6w2n2l7yknyqx7106duoifj28x1s4b6ka7nyhrj6hlglca03xi14j06jk6oabh6rjj1dewmx8lu80ry7ce9svn1747rxqwy5yy05ikg9dyqfpd7e8y4q12o6yp4ea6xkq5xbs79iij0hof1xz36u7sf7vasvuw27z4mc7eaqvy18xu2s462jm0so4qigipxof7fnj5oik9y0xlvm3adp4zdhn3eakcpzze0yoxib1idipfvdwcbjkvvpiujpf45p5azttzihq3avewtnlrq15amzkc29b5d79pbhdr4ajhhr2wo786ewjig8maqxq89jy9jx21lg1scve9ftck8207perv0wcpvl0quish278v6h6j3j6d8ztu7rzf273j951o86f00uc1hw1i4hvcgt1z53tq47l0mthcwkihnplr85o9y39r16q1h2p67mqhq0z571jngfrgdexz89kgjujuviveiodba1qlmunf9n5u2smpz3ylt9m40g2909xbu74oti3hdug9y',
                fileSchema: 'nxacyb7quzsfkmk5kvbstxj2fn53a4yxi3ehjsvnsuasxn0md6rcgpuhue49gm02tsjc1hwelmshh1md59uwas4aanr4nsihac9wvs4jg2dqk5u3bnq6vtxvgq69hwduvilswphx08tvy2w6hm0nnkpjt48pcr51of19iyz2465dzl42r2tnivd6hf7x0y5sxjd88btr8dbwodam6llag8nktaihrwyt35i6lrhj52c7nnprrncvy2jkmbtdujesnsnsff8ujdrxk1757zj91xwpbtf3q2w1ff87wh9ulpk84ck3y028tmys4msnu0a639cykqxyj3zirvuhl5kzkwyt9f6lawclds8v8s0mw986w2qfgjjqmes1su739zb6o1bwjehjm4tcc6ryyiyqo0tb7mb2huzylpf3xliamxtuil9fzezyfywh4vv5m2ni4j9hh25g9suhyjgardipp5aogwe6vwqzjzxbci95kw5jm99ym77exr1ni9eb2oqp12dpyo1shsy0wy50jtxoetiloj310gkz4if0hjbluce419m2xnw5qfdxcai2pgp4cqw4ujc0gxwmxlclw5np2uaoiy0hnk57d7xx9dcnz4j7wer0xe2krytlpjy0e2eklxo5gvlcdltxxb0ego666x1rb08g7zywbmmrmlk0kc1su40fv7k9ci0ddlpl5vetnj0ku3kqi8mbympk4tcj7rk3gg2axwb5vdpzrbyxe3h0xcxtabc9r20q2ruktko7zn3sm85c6g1p6dj2yskcarw8k84zc53d1fcm5eir7z1v7i57zileorkpy91082imtl5oyegkcspl5ga680m58fcqxe6by0kl8vleblu5ecotu70q4vzvdr5mbb833luekty30g384lbfnwylw9gppyfjh8syo2icjugpy1pllyfkpy3sm0bwerisc3nbhit8m5q7l1lu8nwi2t3x4wp37nib8nn0q19kk1zm20p0eoeapgeqmj6jnk6n5audakgi',
                proxyHost: '5pesn787w2dzllkinc9s3hbkey7qbps5ln5qw1r2e1zu0j3xne4t8nudklu3z',
                proxyPort: 7810932221,
                destination: 'tm791irnbqup09s1u436dgj9w2zvvijklzpt5ech7ofeyum7tlrumq00sb5aba01a3yuihzevl66s2y43ipfybv3fu9oks5ypyg5l0rlnd46z2qjw4xvi8jz0oejhiuhetohzpfivhva8m58flxm23ppntm8q9mh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9iguj2nj6qvnr4druq0h0pzbr017nugqbg0ut09a6qh0gf9t5dtjdewjro2hsc7b6kn14emwk1bytv5wzb069g0q0qsysyq4pyejlvut2e9rvsgzyitfe38mf050w61io40oa742tea6mn9044cya93qezww342e',
                responsibleUserAccountName: 'e03rujyqen386s1k139n',
                lastChangeUserAccount: 'citu5j2lij7zago1yetw',
                lastChangedAt: '2021-05-23 02:15:59',
                riInterfaceName: '9qap9xk80ti2r6oikb0rp3mzvgbkom2us3vjb56em2qum0c75t499r3c80dfpttp2yneyaom7cthg3wjyykcompzf4y3kgblvbs9x8hdeagso35c3k89iap5rpc0554kpbx8pe6kcf690m8wuzefnlbnuht36clg',
                riInterfaceNamespace: 'a7khkb7y2td9wxn72vknlc9eetv6mcabvhl5wzfrkz8w8jfd1riwybxi22rer0on8bm9xsvgl6jer4gmbbtsatuz55lhi05s8gtt920mfwtgh8xogx89whghtzpzn8tp002aejepd6kxddymwmavzwhc3v2a7ezw',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyHost is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f7a8ea64-1dc7-49a8-8e7f-04ac8173cfad',
                hash: 'vygiwn0wytusiacfddzfher17ssxkeaouoi0psgy',
                tenantId: '573425c8-4364-4e0b-858c-0f42773b3629',
                tenantCode: 'mwbhy6m74q4qc481vyx1gjl9b85brywm17jt1p8gcwyr69pbef',
                systemId: 'aa59d386-104f-4f2c-9411-71df0701f9e4',
                systemName: 'emy04477e01uwrpp9q7o',
                party: 'dtnkx7mrfuttm47vilqql1zg2g35o94uca8tmkcthx8kynwgy7tu55x2vdzu1m20wco51hzsxwu0vngh4jnv8b7xzuap805zujdfdcpld5w5a8d3hh40smqwsaniqg8j9q8uwmz2ald6924wkufvbmr4vxv71p61',
                component: 'xq9qiacnblnv2a3oc1y80my5u48reyuqmxdmcsp1y5qk04cv2xnvzgyt4yq4igoqcart1v2jisbvqwvy4zzxf8gb7jgmsgzc9ql8d821v48z8sb89lipn0ved986fur1uo9ontdn0z3upm2c8xcjg75tn4mqea9t',
                name: '8crn32fkcu5fx03da5kr27moiijwmygpneo8ptj8zspjr1fdgxad368jymam59r0qtaj28jf9twdlldsw0as9vb0zqb7ctju48c6brbjs9xw2eerset37aggkc8be6n9dhcjpd9wqi3wqj5rtu2pcvfkzhq082yv',
                flowHash: 'j8q889nbg09f608bktx594jz6v1kmylli2ircw0s',
                flowParty: 'cpjv1q88a052ueoqay8rp41s3mpeaowh5p7p82zljndxzvwyqvjkxn7scsinx53l51h5qymzkz37hqwfmtqusv5yb1gvu2xuxibaid3e4zwn8thyimn49i9157o8kmko7gvsmw039apwsj912pqh87p8nnqsw6za',
                flowReceiverParty: 'd1e1f4cz6vn48izm8fkbyvwjz47lrrzt1zthasygz9a1tgnz4qc4ld8eqr3gpmjhvynok81rgv0u7t43afpdu1v7g0ij9bx6k11bgto5kvawx5zwxoti6lgzuen4ipp77tg454n0k4rmma84japhvvmc6ofwfb0v',
                flowComponent: 'lupv28csxuxgacnnl3gb3587me5lvfvqr68hynoeeazowynelv46c5fd5r8upa5y8cpwvp3dphe0ekd12lb6kt2wy56zy4lfdhz3gwt2tq8fgcruc7xfmtpap16xsj3y3bmov2z2o3vmnorg23w8w42srbvs5otg',
                flowReceiverComponent: 'aznnucpg6h8ma1j4iyrg6awfty5bttyf3f6fxfey7d4st79ukz6xrkogvo1fv8zr4j4vmj75kvcbxpltpytqr1qdsxnx7y5m7xy4azkffwgb56i7q8te02zdi46i1z0naby0ivscvrw9fskoxiyz0icjdiqwgbo8',
                flowInterfaceName: 'tk338jzhqdwjs0n9altjmn0b4t9p68k321oe9jq0bq252lrq1vsz9f4x5w277j0ede1138r82ijjy0kojap33d6heuhzq1lx4p1dtvokrpcbruko1q5t6dab9wgnzh8mr8x9dhvgnm9kj9bbj471pg90t6tdqlzh',
                flowInterfaceNamespace: '3pbfz3lrk1y4zci34zf5czj5gzi9w42poa7xkczyymywc3qmuwd3woglrljo9ug8nbr43wp999filcfb152ezxshkffetiea5rze4xotr3peajp7gf5l796q2xf6m7khluddymv8jlwfzef54r3wbvepkffbshme',
                version: 'le97oe03bsbvdv8yblhs',
                adapterType: 'p5wl7mg3mkrc9d7j7pc3ibobs4i2radr16om3x7y2yd4ix5yuor9rjkonlrq',
                direction: 'RECEIVER',
                transportProtocol: 'uu793ncshx35xqpik0aay8mb62uya2nf7qatwybscylw939dn8pnfw2lybp9',
                messageProtocol: '0pyjit0h33p70vk4d1rzmqkiyejt6921hy04ghql6bpzaf7p4boaftvr3rbv',
                adapterEngineName: 'sr17vwspyrjp4jhz2alm8cqfhrr8hafzouscz2fpbo3f97u2624qbov4x39v5hzmcdpkteqwnkczyc63sm20zyq7eu0jcziuqinkndh0xylxdmj6d8e71x26l4kyvw0c6hu16jaz53soa2rmfprw0dd92vm8auy9',
                url: 'l3l1i0scv3z7yg4ftwxeav8xtasg12adm6w0fjf0udrt03lc49o3u94byt9ww8tdxvllh2bv1oagbk9ysta65yblsmxym5z4ol3fip4egptmp7w2glu7y2cjp3ku8k7ddzpf50npu36teox97reh10wa9fehta2tewyvb3zjx9eaxgyu38e8qd2aqkh19x8j7qnpj0az0j5dqxtd5y8e6xtfdbdtpspqs9688drrqtk1a9zjpukjjnkcfu1wv7m1r2v2zeay0cqwogju0rdctqu2brw9ngsqvxbc89gwbggis0zt3ninn24g1713ffnr',
                username: 'sbcvj3mus234to8d3bagfj3he0un90av0xcnxwmtdjjhd0epapjocan4yy0z',
                remoteHost: 'hsjnc058389f6awjt0hx8snb1ef6f3ditywfvjby8fl5q214uj86r6lzjq76p8ea32h4liyar9am8pxgvqy8lr09onzg9af1mhq1kkvlva6bi7cq08gw1ke214qdywxmyklg4pqbp4yun8087ecmj6l9n08bk5of',
                remotePort: 2303315604,
                directory: 'b2hglj9skkpd9aubigbhfqkk938ro86ojw1stji21km7r1yqqaa4pm2zghtfuz7hpgd3rrdekbevpixhjtnforuf0qi32v8nc5xn0ohjqrtyyx54f06a3wabtcz10emnlcx78u86cyxxf9uh9qvf30r4cvnfccnrj2wwujrnqu9inf5tnjm7onjc24iuhrhxbwev7f33ds41p59ej07vg9nadj6xqjxx63yz1hak12pd46qiyoy8uq20gvpficyu0lquruyj4hmall1vmhmrloce8fdlfnvsmakm1m81lhlbga35bbypd34nxe2nrptwm3uwgj9esga6nj85jpl90hqfgiphgr2ul8g9e9lmysl3ukldl68zt2goeqsaq1gnuhm7v5uqeujrayotjjg8susdotfojuj6lfx12k6dg4vspzhx0xph793qmwa5rwqm97fzpptjztqiwb48l0rgmmwnsg5rxjkjd94r4mm1coqpw08nrn9o9gntdxmslvhg4h6jq7ujl9xucncgr0z3n6nkrladtp8ma8umoakl0gr7z6pon1nft7jyfxtr7k1aiwp07i7mgql63n4ystwagqxvaz1wk1zouarsqab5rgo7xiz4rocqddvvpb6guvu3mvqn1wp6elfkf6c936tgmys8dx348pxtlzk7xskqj4b4pg5w0nik347lko9b7doc8c255l4y8u9fxwndbgrhy4sls9t0yaebm9ogijvpbii5ddz7turem7u0chg8ydtoriwk7krk1w7v2gbc439lvcwzoee621fsggefo8geqrkitkr707ocuuagk2dnaafy9v09rpns18rccuv3eg7mh6d533k4sczdznk0aw4slprwmeymr63klb68iz5vo34970hzdj5bs9ezahzxoo7boq86plf80v888ux6ruh7fqg2h75hevl48jcbo94r610j92d4z7jjeapd3gk4z4azxb31ymx3kbk1edwsjyzndytujvwul3weg1ik6ab1ne3s',
                fileSchema: 'jbu9v85x12k0mbdzo6k1mbq565dy5cw9yk061qvl8i0b0cns1a0aodk2cki0y4y4i44dguq9cc8v3z5uqcyu1es915gsqymoi7pv8l4v4q43qjlaw3nhkaw706k81g58yo2tj5dwrgswtqnbb140dc3v9e2tlsoy99n0y3rshwfrpr8t20ut5jw9dwq5mc3d6g9qelwaoh8fe9jjpvsonldww7rsc7218b8tvinhqlirclugs8jq5gwelta6k3c5cgm4q6b5slhb6m17r67nleobzhlpmre9uq1df5q8dfds6fvctbjdcwblner82d1dlqnd0wdhcaalq35uv0a6tfb1puvr70gaufzxh2h17ujdko2gemdel3nwffba9tk169okclp5yxi32rksapeiqvtj8pf16b1ajwm1gh8ci6kts1g0oi1g190crpj3u9obg9k0f1duomrg29q52i8zxpcge0vaglh3k02whzph7bvyzdht435wl5upg0oysust4b6ilimtrtn43iyt392rkq17c8r9th4s2fo5c1a0iu4lnafi9clb64x6vj4mj2b7l5ye9byi61uuuwyf0b33b7ax2qv626z6j3ji0hx9cxtv6sif77c2sd4xbcjazxsskwkfe32mutvk7156j0lwxf6fvoy9w14spdqji7hxnx6powkcrh7xtakdwk3r9df3mhgkbroa5k1kkwojtbcf8a8ya1988gfa9czakgvu33c4x9tb50ybmoksdjh6rzfqi13zdmc5lyup44bc4psw776vtxm4dxlwjrgfsfdhmtzcyclmb0l9d6kgvpe1f1nd39rtfh96eazvih5y6npf548z2yumdx75msqmpje1azp983zgzjsi8jnsnr7fgzeska1otiwglyqqrecnfc22iliar0chcekridi4qihwegoeoz2j39n72c0lluutxvvn2ecchs24dgyz2cq20r82dv8t0eox1niookwrzku32pecav6xcb19glj7mk2snymh',
                proxyHost: 'hh0morojimaysw4dqz75nbzgr1dsyiw381kr39csfg8fkvla5hnwn2vvlqxg',
                proxyPort: 94086974677,
                destination: 'jxymad370qoaclkxlomzhckkmojn34kbxvxllbjdzeg2usz01705qt9gg8o6nih1wobagtfdpte9e33axooa2q23xjlrlp6no3bijopu92msprfriv8tx38ls1ev4zuvxts1fobjt4ff00g9ii4jhfyl32hzt7zm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nfepg7yuok53aoi68wpsua0nt1dlp48xss3o7dbz2ovjxke2sgqquoglh16a4vlupgw2btw5ptv1t30ugma2apuooj3ldmcyd7vapv22ls9ezvmd9er7310url4a7he1m4ck4m0zwr7y2s0isqctysw1jnlarsin',
                responsibleUserAccountName: 'x4kwddb2i8jtsjhcwj6o',
                lastChangeUserAccount: '2tqxtswr2cv3jv3e20g9',
                lastChangedAt: '2021-05-23 21:35:27',
                riInterfaceName: '0gvl1fmvbltciljzgik979bw8u2nmi0ejt24xjy0jls4wvrd9jdiwz2pv6mfrxbvidpma3v26pmj6ky466obf4yuxv04cwfqw0tms0xenxt036r9u2qa7kcexh4x3opldki812ixr9vzltftjgpkaiiwewgakofw',
                riInterfaceNamespace: 'kpecr6pab5cigwnabiqqjweni0j5u3trktlbemy2amybglof4tmg9d28hrqmmwktx3kbdqlwn0tqlea61mz2at24x1qq1sw4jhiv2vvzust7kdrlatbsp6iavyg48qwpnoypfrsygdwj2q56tnrm4lran3k3ry8e',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelProxyPort is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDestination is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '9b54c625-d60e-45f5-b6da-a17cf51141c2',
                hash: '5dppmdf1j9940wodmpo9za2xzjpq1qxajvjl98j7',
                tenantId: '100f3555-286d-4cd7-bf6c-0953275c6979',
                tenantCode: 'uz6qye4p9ouisuma8bfhj1c53e86w08gd7naspj1ys3drj24nx',
                systemId: '6041bdcb-f0b8-4305-a3b8-a96a0d24f211',
                systemName: 'wichw6pviir5ty1k42lc',
                party: 'xwfsyzlqz3w5gskzt9oyqcx3h8h64ckj9klzpa4z5yph9bdbipuueksy1qr2goxj27b6nhaxskj7ct97xe4dkub9cr5bhuwblm9ws9eu8c5ym9ys64eflneyzamzw8zrq7lc6t04ktomc8ihfpr0kpqk4p82bn25',
                component: '4adbxy5o2w6oqua0hfrzh9hv9415aw10v6d2krii0qvwpb3n9kb4ucgd2m8w4s5i9y8lvnz9tq15rxsm5zdtam7yr714i92jhtsjewxkxnb0q1nh5kpybon5paot3hzyqswdzop46m7urztrxicev6pr0sxuu6nz',
                name: 'xsc5o8125y5xjwar5ojk3ecklmwj4o7skt5oqsn78i55a11ce22bsug4ky568tq77jsgc7jyqfqh5tdeehs2m905yvxh3939up09rrww5apur1xdfd1zc5bb5pvc50ticw5czg2yfdjre8yb64czin0y4qewsev2',
                flowHash: '0s31pf3tu8sbs9rruva73sm0w1l5prf4jah78jmr',
                flowParty: '9fwu0ig4us7jtmeminv9rycn4i4f9m73rjhwxkk74w9s1ti9lrgcdm8x70uw8zazb8f0lu4dyyze3wg4tggaiafbxsxyrf7yr77apegwc7phv6p84pci7s5y22dmhq27jlj6ne0vw1ng433a36mu5vgv8t5wpen8',
                flowReceiverParty: 'l721y4rjuaixey7ns5wx4x46x93p8oiv1nfytau06l8ij2qt14sclqhllj3ewfoj9galvyuxg5v9eyfk537ogxxbnrl1ze02tp8yhc2568oopqsqx6dwbdkx1bqlacg5ygaap2ikk5tbn9munjs6k1q67e40am6a',
                flowComponent: 'tsuogtwu6j4tidyeyubedk4p5vfjmm7sn17oos5j5tdl6o945s5y0mtgsz7taboylicuozj8z2sxox92pvgciu1l2xm86zj6fw87pdffu6r9pdhf5b3lrmty6klq88lg6guqlk8boydtqjzm3xoec9sphxf5hizm',
                flowReceiverComponent: 'zxoomahi4wicl6qydnghn5vaf1mh65juzkyhe82zn1udlpsmcg5qkt53ekrfn328h7iyq4dxg7hu64dpht24o6g6ddonc2plbe4wsq8o1wtln62qd2x6rj6qbit3dgh3l2yshdbt0uxa0ynosd8i8zeopuzv7t80',
                flowInterfaceName: 'nkt3sgq41jyetgzq40h5qpak67xh2drq7zbrtj1gp1ly9ehunxo6ff27evbfi25amui0tutq1b9ya4q1oaklmou3vut8g6g67ik5ah2zuoro3o98ltqkwgmjhmc9awnmgl6qrzuaqlrozar4xyzdjgzw3j52uk6z',
                flowInterfaceNamespace: 'huzpm32mwm08tp9cmbp5u32bmdfofcflzltf470v1d6o1739cmvw3uvzee4uo5o555l4qvret0s1147d6ajexcwykvf7b70sjxjamnveddfzk877xgvecmvx15g3tis7p7k9cpa9hip99wmik4p937rnmk244190',
                version: 'xgocd5cwpmh7kfwhs6ob',
                adapterType: '04qvnf5rwdkb5rpw0nwd4unnh2eb63nwpotj4m4txwzxsd7qkwvlvbx23z9c',
                direction: 'SENDER',
                transportProtocol: '4wtsuvdnmhz20gohcr17cprnrdlh00sqm2tywn6cfwy2rwucjzs68y9mh5ti',
                messageProtocol: 'kg5ic3r6a3vym0x0u0yjxqu6qex0blvvgjmtnmfxcg3t1gjz1mg0oesmo672',
                adapterEngineName: 'svcnnp9ewxvdhafmdjwq4hzgdii0ivt0vtvusgut8hi0kd7sboa4a4w9x7glkspdjz3gf6rhuca66echtl6x57w7m1uu4kpswra9uj9wxuxz5rro7yi25hzdhjmhz79gqst2chsu9yq7vzhpzlmi3vp7y45k20sx',
                url: '30yjiu0c28dorq157oeu276091nmrgolx7zd4j5akwqzv5867jnj5fkwa53yyoerqw5q1vmpoooy8eaftnf9t4vetymgvp6620rd6zkduzg4cnt512md614t5ov5bdhdhfiu9pfq6ozsphrqkk3m7xh3h2witikksgrqs2at3f92krsegh8qtfqpdla69bkyt09hzshgb7t068kq2zohnyt24a2ah5ly8mugcu267mgbi9eyt81x3g6wumw6s5pv99juk2h7szhk6tbf2h14p9oi1qb0grfvgy66xkjykdnibmsdi5x3yjowmpg3snld',
                username: '8pacdvvfdxobhaucmwzyebfn0x7vibbnddbtq94osa9yjnbi2fnsxtp0gmv2',
                remoteHost: 'tfdh96xkm0m87t0txyf3v2cm5upmd1clmoijxfk23g93sgev43f3bhfr3eaj5wfoq456q6ka65no0n1flwgf578mesi3ia446orz4mnvlz3o8psu280kqctvg3hi2xe6y661uy1mdsek064i5nkaqxozhevhxioa',
                remotePort: 9119774426,
                directory: 'q0iyjivretzqe5exyuhen1mn8pilabevvjs5gsl4ljlsvm68b05uwv5s6yryeszudm8ru5c7jlp2cxja9xrfwr2io8mga6kr57qcq4nvhfseyc5t3bn523nj40ied9gx8q39s7pn9ldz9o035s1imsvzwlpyrfiet4g19j6v145cmvl9rav8dsi5ne022fk6w2thot95o18rta24x8qxdjibwhwtdpm3fh95xq0stu88zyi2x48ap1dz1yzdm2q4p0d8nxgz44jdvgdc8ipsbo6n7sxu7zi7splx94s4k6l7ca6ncfv1dhu7pct2ec8m2hs4qghvp844ev6fkgzbdfo2owzkqdy4uf8aqmol3l8bgkiqzfsovdrc120mqhpfu1zg4ep1bbxrzxtpmx47og2vnq2rjd6c07jw830lmopoy6ocki5e7hgl2xzz5ap4wn891072ggulgnk2n7xphfvtat7avl165lavzm4lvxllgafsulq8r1mbzps9l6lgeacuwtt22g1x0b3ie57khomhy4lwra9q1xgpncsxwbpirg21afyh0gfk5nudk0fzzsrrv1n575veqgitlqgpzptr03gxfxmlpq5ox9x6j3mvjqtqwds9nu7plnfeyorz4fdz76ucn5k1e3yt4vifm4v65yibfbdbw2dbc8ldgc8jp43079g3ccmfladv1ha8ztbq5lmi65fdl7k0g1w3ekd26zzgc4g4ly6qj4ofyj17oujcqf9umd18jmi7x6bhrv4dsb1h5g02nh9g7zls5nzvbef1jubetn3j0rktqpmgq5up534osa4xjaqvet17i5ewevp2zsy2uovrcsft9yrp9qlvs8yig3zaowg4gjxboxx0ote2yrr30bsbwf2mwuuihnxk718izdg769lqsia2ap5qqujlagyh18cnh72hl11hew83hvthc5t6vafph1gu8f9na7ca00mx3gxqt1f5a6kfcksrd42meawiisdpqmi3qptvnclp8bk1eadh',
                fileSchema: 'qrxqvtswkgixq2iqweq85shr3rrx7so41asp69car6aefgujccpr52vukwk024ep8j3onuzpwhyzfoirvu2vhm0p8t6qzsmz3mgolcpve79q1f5zel1hqpgqas87t5apt8b6u05fizax1h2js8nge4tmzvshthymz8vnmklame5afy8ymprg65u6wncpf6avmgky5yzxogm93ejiungqb217e811lkkqrevc1jkhci22ku2uowxs330sasnb3juru0i8q4g1hfqon4smpbvyljkpy9yt1zuxhsn4fhsimmypik44m8m4qzur85wjmj03xx5a8sbjcs6beqkgyfmypwbxz62imqv72vf7kd6mqd0a6eo732lp0g5h35rcioivquwitskg5dh5my3rqbk0r4xmjmxf33am1hoiyjk82d0flikwbil4v4ehqteqgi3cq3bpsysr7d9c66h0glytfoefgx5vzy5lvdhz5wx4lctzm7hep6bg36xesc93qiijuzjejhpymjixi3jjeavjyz6znejhikqxqjmlq1f4ns3gcfe6xtmu1uqjacdf1klh9fl6jhjaj140kssfh6tz15mmlp2bqm0spbxtsogpxr00apu6kyjwlswq8xmiya99pub4rpwmzcrh8a872qv0ghqwm1nnaxwb2cq195scyv2r9p6pai8len3pltaaiudr1dy5xgqg5jme3z3ckwt36hc4gus60mc123lxfyyx6isk4tbe9fhw8938fcra4kbjcvz5wf2h6vvu66g1gbri7c4rhwtoi4dbc9krcs5uhpeim2ecwa4ui8k0fp0tdau6k3r8ygr4bqomjqoxj9gnit1n4bz3t91po4li1g823fvgts6zugjn3u7413hw84bxsg90x07wh719dv2ug8k3kz0jv6xav9dgdtvei52h7s7b29safb23qvvznaobqe2w9u5hsg7brmbldnc54pbcm36qiai11b2ttzvg37ey01ag1fm3dpq2h7jzj831h69e',
                proxyHost: 'rh56wpm3hrgzpck18js65pu4fotuovz7faodybpul600xh31osyozsoh5frd',
                proxyPort: 3013246900,
                destination: 's7az6un5e0mf7tzatjgids5r65akz8znxul8a4sklubsok7bi7sk39d3bpbuua18xjk67qbrx9wpf464zl97lg962julsbquwggsoyvk71zxnc0zw1uhmhnnyrd68sjfx7xlzbm6pwaabzy94xkae672q4ilou4kz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'zocgvj3bx26yne61pkiluyhskb6mdlcqrvlvt1tnlvmvjn27qtvn4gj7l8bgdvncoxwu1qkqq3v7v83evcy27wl1ov2mwmz2qdcr0vzgu00j55rqnw22p2x8l0st0biu94f4b1ussuidrstii5sd44b1f043rx6x',
                responsibleUserAccountName: 'jsidwlgfdmb9ta7g0zdx',
                lastChangeUserAccount: 'mlcnvps5bd7lpexl85xc',
                lastChangedAt: '2021-05-23 08:51:33',
                riInterfaceName: 'n7maesrm0colyt5f2hqtc3jlejq858whawk37ogi0x3uvx34v2uky25fb3wvhdfcdowjtj62wv96y9w3w8cr76nwazfjut7a61i1kn16kbha2gdkq11q97zly6oite3f5q4w9drvqu4a0vuki48u05nlxor4rsi2',
                riInterfaceNamespace: 'wg9822qlzak8buq8s2rekbzdex7lj2z3w9oix7ex7f0wscy3n3sxco98w1esky1io2r79bk6ezgiqymbd67t9688w6pe5m22jh8b9g0khmkejac53i8asbng0c3345drnsvvvavnt1po86dizlyswrqfyhlc705h',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDestination is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelSoftwareComponentName is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5e6f1047-5cc8-40dc-9d21-b0a6b1f33103',
                hash: 'tbt103rdh899q4tlzmk8tgwuukewtazuxmlmj2dp',
                tenantId: '1f0ffd41-6e36-40cd-a2d4-45f2cc634e1c',
                tenantCode: 'rli1tf70livtfi2v7003twm2aapw0t978btqn7or9v4updrc2m',
                systemId: '2579df38-b96c-4037-84f7-171ae178ccbe',
                systemName: 'x9awhyhj51tw69kcnsqa',
                party: 'dmw5k4t6e1v1myztzim6rpy97rg919cz84wsvgyk8vet3w6leboaexu1i7wnukirlm0v4df9zzj33rn0kxdv1sr3ojwhlj761cs0tqmoy8qp86tc5fv1s63cbin698itdqbg8jplj0ch9qryib28e4jbqi8e3pu3',
                component: '35f69hosysjmlyj15uz00ifnsgb1zylz6mfh5vxf3oxq95iqbavujkj96anih6crpuhfmqc915m9dxpf6a3l9er3lj7gkekv0k8xll5zeyfqttdzamuyqzvcjbkdlt7vibjba2zli784ilv26q7qrnak7xrltvta',
                name: 'gwyl8nd5pf45jgtaknyrw5njxhywfm392ce5cjr747qybucuhbe4kyd241oye04aim0u87dgmscsqx1aalljg7x7bxy8lzpro2778mc7wc9hj3ivh4yb88vm8b7why8yt1mopo8j60zr5qmgvm5d3r70f8490d3o',
                flowHash: '4ij8yaj5gy91hdm7ownz8jf35933rety60yx0dc0',
                flowParty: '5v79t8vmkl1dybyx6xp3ua67qz4sxgu5rcymw149rww3rxqusf3im79biczl77suwbqfy4esacaivpvt2zbinlax83pul8nmwo8ckd8fl5inftp4am3sggdjj0cek2vpvu8uu7rkspoook063qcpj3fxvjd7gmxe',
                flowReceiverParty: 'dxxrvpdaqs0qf6id9phv3sqt70zr6v6k2mwhlfmc3lyg6vclejrjgpvf1xvmnkdvmve6u0pdqqlhoyewx78krgv8onufq5t8r6ojiaqcq7j2q2anisxpuwce3es15m0qzbj6llov93pgos3lg32jwrikknu8zgc6',
                flowComponent: 'i162a6dxmjh4i3qri0xbup58ese4qm6t7vgfxlxtvnfl663giwv1l0511fb8l497vv1p7l7hd0wpxly2rv6j47sllxnpv82bmjr6mg4z1eh3jxto35rki75tvsa3z6w4xyer57ybfjb6i9axohw252rki72f3bfu',
                flowReceiverComponent: '50m7tj2a7t8pw9erasxz4inrvxi1e2wlm466e8e1lf0yd1b6u577i2fb3bzfjqypzpwwtvfzg9f2n33niqu04gmr27522feqk6inu77cjzbwbsupb0f06mhdaun3xt2hypdscudkpwctftw5qdehfrz370ztwywr',
                flowInterfaceName: '2fy12i5jjbjaproq5w6rw9xtk7p0d4nwllz2hav3fc2td5t2xnvmh6s3zako3rkeqa0qxe8jgaxh2nv8oqurhx1qfftz7xsfv8mj96kxskey9v8rlbbuoreyv8psylj7xss4et2xda3u535mr3772t0jhzx6xgky',
                flowInterfaceNamespace: '6heo4gfu4mall062baed14r3gh08l6e317ubigennjql92n7m8m4agvqo3nvrg7296t2dsk6om2f0lm5uoyjaiv2mp70tzalc8tajvo75qyk3ohpunauthpzcu3te16gnrcd072ei8mfyh4iy2mke41sslv1a27m',
                version: 'pozel9o5dm05aabivsu7',
                adapterType: 's7dc76ib9ogcdbtmepszq5kyhxjm0d3kpv8qka3imdvfsfe84d1tpn7jxe3r',
                direction: 'SENDER',
                transportProtocol: 'm5i2tdijwbsld50zkw69f3kie0gxbok3dudzpce0t40k2sip1t1kgkenwyb1',
                messageProtocol: 'obn1zztxon6qy30rb2ce3espm94phzcj2gh0xfho93pkj56laavezetj0th4',
                adapterEngineName: 'mxvl9hu83enqk0p33neqa83bzi49rcyv0ywm42bh6ps0znvtq7e3pl1czy6960tmpyebe1aoc5qsw39p0sj9qva33hh6op233a55cou1ivi5mbh8lsw7bd72zjrrb9xyo312p5qfm2bba5n3qgvk625me69vg8iz',
                url: 'ff8nmfpfmldkniglxob4je7ciijivye52emp595b0ov15wa4hu10ye3og173kv9az638f8rp7mntlqxkew9vt3f5tmv1bmr4w6qj93kj08s1wsyp37n24u172yvtpjbprqtzcf9qnra2ljma9zdviqyuw1un944wbb9ho259f3a0gpobsti6zfqz9fz2rqldv841xhw8x5hnfbhp087iqymba0bbjr55s1rvnoaxb1w6q067kdg8rta4ci5d091tq6kv9rwysw7im6px634b83edyj3pgnoyg5l4usq8dfw2ri4x8euwzlymx282t8ge',
                username: 'nsajpm8azyiahgu5wg9f4zdor5alzv915oes6xwvd5paot0siwk0nir4fihw',
                remoteHost: 'reou13cac2h7dl0rial1dj1zfr024clq0zy44bw9sg1ntpxt34jdvn1f7jh8dsb4zrecjhcxwdydaxx743eqnwyvshp37q9xxajhc01sr0h6yqpaf27s4cugjj3urriugj9nl5m64k3k21b0fhijf67hn7x6zx3x',
                remotePort: 6559254287,
                directory: '53et73y0i4qa6j4s0fw3sq2hfszydn6pbnlyfgu94eq5sf9943llj9qe6rtlcg6jca7lmakmwuupqq4i1984q5j1s4cndmus6f5iarqq32kb4qtewmbtqmlbck3378cdftbiy9qitk22e3avi0c3fnogy9yhli72960ap8m0c12b9wm7q7e6zj10yzx7qt1ei8vsfda0nl54gi34kwucrcvtxns0mlxkgidbmyaejdjuhy8zosi0svl6htgpk0kuke2z0o6f14stct5ucncaxawi930zugw1rm0b9lpau3a73evayd0aff8stwq5b2lhcqy6ph4vxzgra7ycigicgkp3yp3w8czk7w6kwz1ujxj7h8vie31n4gefxjgb5e0a6eoevy0nvtx7j08xqe7ebi0qc42sxt11ls0c2ficaopobxvt8p77c7x32k3qwobqsgdedr58e1k2oq9qb22xlnrm8no53g14nkyddlfnt3fk8fcro4wdh0cfvgc3nglz5e05ln85w2fretjju8cl754uckav8qxuvxga2dn2hlnhni7mzm12rse4x9c143n06jesbup3lbkgvk62apkrwogpaaixcvvnh4rkohqhc9s6vb2brd9cucs1szzysdjfictoykuby22cbtrrye0fbela30jdbig07stddo3iawiyks5wy0h0lvmer28al7onfcyqg1efdtckdqy0u99277xuqkqwjgrs06hul1zzu30q857iva4q8wrdardvgwjght19cpf25hmdgljfugqne69iv63hi2yipv4kbsojsq3droiaxnnus46oj60sx7n8p5o0tuvvv4vlnroff66jhwz5y17fcbbyw49rgq6mcxlbzqxj8dmqxd7v8e42mqwzpdbf2ryuy9hntpgngs445h3oqtbxj455gxzg4nnhydto97ekxgfn5yl307uh39vhl7vzt1f76qlbyg3i1b81w8ntqjssnxned1d62500dpmwhr98h4e3ztidkc5rj016',
                fileSchema: 'k074hdnu6da6ngp6ph9dehngsoji2i3ytubm9ewrs29wmmh55gx779n4crur6cxixlu14qxqfd7pwyhaqtp92zem78rkefefmit9wgrw7wr8rnyx10s6ko0vaefey4j0i0uv6zp52249y3xo2zdyykmalhaui13l459sphspnzj9dxyinea020j2bqtknx8tocf3umvq8igslhbl9fnax26r2nls3mo32e3j2silhgwc2huq2pvkegq16869bku5ld1tv696cy4tws63q6vumw0ms6bm64bk150zil5r0t6ml5yav06aw03asmbj83kl9xwf5bt0e516xf73dxjq8l8qtq8ompbnwh7m4tlk9nq4pewm314aw1egnkz2ifn4b3ecjytbgc3nratfaoc3gf4agufgwwkht4bz2mgz5duaqoa3x36511at0aia0ak7jd4ldz24ki4xf90eybts339tf4vytrd88chnhpglyua5dxryadf3kewvt30v7xwzz2a2elw3qt07pv15dtwzpncp9hcmrof6q8x6bva1cgg4gt5eck6r0gy7ckkn5ljdfkpzsnvol6debr8050bw9b7lbgz5iy9ocy1zrlgi088mfkr22d885tx2z8wrcb4ku9p1xfm2cmpvaqymo30uo8skrbx04onqmal7pc3pne8ysqebucb9qinjubxgbg0kio9x4g6figc145n1fdrrxx8jigipasx88lyoamsflvxix9qoktgslrvef6e6y5mgun9lk8y5h4inkoe5v3z214v8ysjfeg5sijgnpxmz3myoje6wf9wm93i2gjvdclaipn86zeffiy8vwikzhnv01m9gmjzqy2ioh902npudr2lc3xe29wloakg7su36bm0a1y4ma9kzf7d0cphyvwp2lxps8v4kcod89y94r4jzc251oirs0p9mkju96zrkvrxq5mal48968nkik28n71jerk98a8ckcbnim88twna2pmx09vxn4no4dk42fyn82pn0',
                proxyHost: '3ptufu3mfutoartu4iiqq48yl37vopa0nipcdb8bu9w2oyy09lzt97ra79is',
                proxyPort: 3410777518,
                destination: 'i0ipdy8zgipok2oozg8fbm4hutx7yx03lqkwbyrydm1o5dfnhqs15dxgb0b8wwqxq6plm2ipbbymzh4otjhy4z9fuvkov2jp9k8o1aptoqtuefd6mj2eyxo5frsr4p823n25qsaz083ahc7nqzy6nl1zp1g7utvz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'u7wdi6e8fy7ldszp70nl394pdplowqqif62d31tind3c843qy88xz7ru6far0k92hxjlt96bwuv0z610lfv7cni457p5dlzwpp3jr49bng3wh90lp7vw4fvn7c8egrdo7ip0e6pz0rzxjg6yykshi540vuvrronl1',
                responsibleUserAccountName: 'kbyjs8a7veibxq5srk4a',
                lastChangeUserAccount: '0gw77b8xhto5yimstdtm',
                lastChangedAt: '2021-05-23 18:04:05',
                riInterfaceName: 'ck5e7xh4fh4iw4pzrlbi84n33adldc0cihx8aj36nbjvztekdjcg5elvpreln0h03aujqrdz4ucxlro7d8h8mqjjam78fsxh1w7l4adrayjr8lqv90td67d5i28ivame1c2b7v280ulfa1i9zrgfmi35cygu6q1y',
                riInterfaceNamespace: 'l72ytpexlnv31mxn3u6cbxejh7jnlqqqleggxzk2sepf6mk7h0wl9se111rn8sg7mowdkoy3t001ekd6ftxdk1dl3jstg9wjtanp30vknteyhoo966g5y5b35rf6y1epwnqsrw4oixsawe16z1q7ktc8oyqeo6g1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSoftwareComponentName is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelResponsibleUserAccountName is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8f748b54-e01d-4679-a693-cd32e182f898',
                hash: '6n5fc3aqyrfkiu9avulz78npjal5ltl5votsi3yz',
                tenantId: '03fea616-5c24-4897-a9da-1bedf9bb7ba8',
                tenantCode: 'vra5bq73tsxdd0i3cikm37zp6gmrnnuh5loqdfc1agxifsrzzj',
                systemId: '58251a91-106e-411f-b580-522f3ae62ba3',
                systemName: 'x2ogyc38smpc0n88z4vy',
                party: '6wpjr00s86d5xlmxw1dlqtr2uutqspj2jwjm7ghtl2pj2asb721pazyt5q25htvjnz0yarq771zo2dmmpsqmkatg2s2ybn8e2h8q1uw47pmgquexxa6mqeka7pxor1kyabb376cuipuo34bi9s20jqqf7s7648zd',
                component: 'wq7jpop8pig5i47j928tja6vo68rf5x9b57ny7pmsqtc5cyw9d9tcmkdiodqy713c28oyscuoiwcn4h03yzesp6ahogcyl1ijqs1mikvtz9hnc1getlqbvfqhktih2ftylhznsn60joz7ph8167wdh2rk1s3rp3p',
                name: 'nxzlfvurs1ywu48pzxbqas4w58ts73pgunzhw8v47oomenul9zgwio0peq8rtg5lnes5bk1ix22fzrudx0ztl7pze2pzn3rbdqke5aicwhk15ws9cisi4wrugvnmkqs0hpf3wmse9skz8xfvxhlqkjq7wo4cfn32',
                flowHash: 'ajce08b3io7vfjjssba0ocsanu66uxhl9kbi7agx',
                flowParty: 'z3tzdwjxgyvul9ozxk42o3i0cm917cebbj03419tzmk0xl9f3orgpp7wu6cgrpggac7mfi0yt93xunuc566g31e4se4a0h669ik86nb6ze2dfuo4y8v67xklw2ow2tti59mvxa8st7uthe8uio9i1csyl38lam5n',
                flowReceiverParty: 'xrgtjayvkp6qf5rtx7vzml9y8czskzntlrdzbnk2yvhylth0jcotrj7ph0hr9ayoxntqe5lhzl5ihbids25zc44yzk5phdlr44ci7zodb4nbc4yydn6exv36pmtoyfgjdfgsr04gap8khixq7z27q65wzcmlt4cw',
                flowComponent: 'fjwq3oxrywxma59azbrm5sbs93rwble0cfs8i4fawx2q5upexl3vcil74270rvlto9m7awb1u3arbv0h5fan4nezjrs10p6pdw6fpbyeld2rttryp7npkvussg9888trfclhqrbtbo9duw0xkj4jgsh773m8dpfh',
                flowReceiverComponent: 'e9pwje0avw5npvwvw0lttj66rkogy7jp1jumgh2eivc9xqg8dm4s7gqf0qy3mywl6g3noyqnw5uremd7u6i3atvbsepr06ta7dqums3hkz3p05ya69gbr4cpgovi0yt2pqugsmxyw9i0o4tkh78undn3bt5b8l3e',
                flowInterfaceName: 'v79qxccdbhp5wm9wf65d6qwvv0i2kgr0ops7sghy88l248z59d6nua78jcwrsc2ruz9npxwikpg64d5adqmclljxvk9ydf3cdfg16mu4h51svilf07yoo9wjj9m51hy8na6gliusxh9bgua99l9blm7mos5cuy4c',
                flowInterfaceNamespace: 'wwagptidnwawqhoikxui4fazhtbruk6c2a3gxbon3mrr1btq8z6txl3g3dvvn67ufh1achihga0lj0rr5yd1it51q0ia7idf0ekqzyzm53u6flakai77ol8p9y5k4y237neu7tbmrdc91f8w0mw1qwgmfp70ql9m',
                version: '42x8diz3gi2z68fyx6f6',
                adapterType: 'jn6b4leuhzwuf84vitvk6g53cn5f8cytiprpup9bcy8j9mda4lhbyvtlc09b',
                direction: 'RECEIVER',
                transportProtocol: 't5gii63ykgp71wdt6q71yzi0q61sj0my2djhnp5k00vh2n6puwgq3kzpvkm4',
                messageProtocol: '300unsvpp51lkyrqbu4xd7fhgsttuiocwjr4tiftqhd8ogfxjlfi60yflhde',
                adapterEngineName: '31zv3v7n79dy3joou7hob11hiogynsg5cfecoviq0y7tkx3tmioquyu5zfggytojjc7nt0alo6rcsbqe0meqkcq6935ty2mnu4pymr9n9zpey4z5qh2dbe1g3z3vil6cbkyuo8f8811oaorta6l526js4r9t7ate',
                url: 'zc9ht02cc7rdc8eyrrqibtjpcw1x3yttz3xvu8csv2eeq0h2uitywuvjv4c1j7n0tlb5cxhhtrlwcyjydqdklgcn5xpm5j21acvd373rggy1vhgclietnihwjnx2ua4idoy8yfcnu8rb49u510jrcqj0m8yogd080qy4xukn67af6dx92cabhxx2f27ui1xzopgxhcjf130qtwowc25c6k7lcx4a18zqdqmu1va093k7eruqd4y6phoi78smcv3q9rxamee64sseruq15uk125r6jmw3tjil80tmd9nxpnq5rmnkth2z1xb5nkj0yfu7',
                username: 'rpz3wlf11j31fbrjj7t01qeo8pmxoceskwz1n0sz0e28yxhh5v0lygrgcweb',
                remoteHost: 'u1bkifs0pfid1rgq79rgxn4imtj2w19nbempf372p16jnfeee740j62krqg77sy67f6zi835x2iepq7ncf1lxv1xroi43rn9gvqxvcutymm60roknzm1981w3bi7affyyqie9uq4usgbjbtbmombh0ot81rjtrtp',
                remotePort: 9268088661,
                directory: 'xqp4wnywa86pev5d37bjfr2el1yrd831m92hhrfejvh2sco01l52p1m68mfskaji9tyjr28vh83flytg02hiw4ot3g4a0p28bs42fqxw0d9yc9l9ady0d7o1mi37ii8sxu1o39w84aqrshyd9npq5bj2s3qeuoh0tcduzopmpc285z53nmpa5j9fr4edals13s9tgw7lrs05rxbgneirpmjggoffjfgph9gncfpu6iw4vwagon1hxwdrlzuuqtebgdj9nm95fejwqzq50a3g6ug00yfxafmg87baoj3txng76pjb8erip1uvspp6l8j14ne53mubeqly1lpikgo5c9cx7b3h28tdvqjivh3feipxstj43vlgy8v4tgvao6y8r1a9ip7zpim2wt91rnhp29mvuj7iigc34y8wkw7e8lwjj656vjxzrtngtn1mjaqtr28x4h8iy6i2u8wspv227jt39xd3dxlr3r2xxz4cl54m2zqyo6m2wgeoj37pj6x94q1jh95utayvc6n7x4szlxwela0nb8np0jacjbkn98pqid44y460j6idmpk6gqcoxo6x2lk7m76ti0aqc1pqg64g90kahdyxsjxrusgxqs6tvjrjthu207y8iqkvjux86kyzdymkj11s0izp1lar9pfwtghw3wl63417xh8fr9lw528tthqrwj0xqnzmwkcc950b24v1vblt2hv77lhtf6yac21m7s0v0tcm08fk67b91mzgpzh3h2mmhdqj73p61dqxulrzckuvysir71j85ixrfws4spvqibpsu0mn0fiv9olfczgew4tqx9gh25munjh417p8jfu8d7d6kt7pu8kf7r4r8um3smd99pwqnkkomess4g8b40rpdgm4bu76zo02gsm1fvmw9axjzl49ne6yhkb7lxz022towazeg6svaaqnfrtik77ytndmtzvpmlodhpku7ermqq1qu8w2swpc5qzfw8i97gpwv7ecmxqfkxy0l0420c5e5ag5fdd6',
                fileSchema: 'l4vylo36gvaf0gfocwstpnb6saic1kwv7nz61edyrocenbj6cv6txwuzaw8v8cnanjmt0v0mbtczgieufjyu1lgbiz0gxznmfxveuplbj0kb68dwr2u5lcf6at9gc6vvi1m4g46fyriy75jatwa62tl093vndef5brjk4rfix2hnfqkxxrio10rt6ufv62ch1e78eew4e0wvpa5z0hgqvytxo9rgxyy5odbstun94bzgzwq61391p970f2bkvrydyzd55d1a4q5y2wr14iai7oe9d8zakbmj5k5tze7o8mlmcedmikerodstaugbucbk1ft6v1tuys97ep3m6s1da5rrjf08p31qpiulmfjt6ydbs8jyiynfe47rnpq7fsw5y3lcxihjau49em7orh8pumy8qa3tbh79g1inlpcm30jc7d8vus9fq97ke55xd1u5j1nywh7msuwz6zh3xgzl2qwbwxf84i6e0ayax8dyna5eviha3gi8xmhd0bp8z6wghx9darrafhf2xl2nw1rh1sq8raqfj3s9wf6bsf7dd16l95dftpgmjrk2ytaojhcv5blaf9w9odihy40d731r6xj6zce8go7clx0ajxo1efegbgxgeydkwqkay7abpn5ygklxjmu46y9ai75q45irtz3yvwenoz2omb4d9fixzyffskx1emb6zoxdoxl8avm8u158ujrlppbt8b4h37aquxkw4b9hjeoajluh0xhvbm6as1k8o58jnjpgkbxldibud14a1mp8h98mda9viwcde3c19sz8tknq25fltzsw0w1a3wbl040uv0ccf49r9vrxpsn0uuc7iujr1gmly6lfa8he9os180zdkllge62zekibdgvvyhal8ma6urkbtuklye2w0pxk6xnlju6d7u0tbjcjwy0o65t3hc1hyurkz9kxpevaq5xhobm2csjbisonnuhcz5cluo426rvp5gbyabk1y0y2qk9fpesva1fqzngbhwi9mswfeai8eqo9kzye',
                proxyHost: 'if2pvqu0v547c3m6ur5hpa6ltp4tp8ykaxkgrbj1livecwm8hlt4i0hypddq',
                proxyPort: 6338920191,
                destination: 'gy57ss45numx13w3nuwb41mw9yzm9imjgv2l3sqw0zyd4meoc25i1aor6qpc047atea6xel3xxou57mzeibjfp7xald8ndc41fpvx9cgnj1bnuy5twn9k8ucd4w64qrz8e16bg8bp15s1ets7p5pvk227lgrahvh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7jokzk02bqtw5ycxlo5mu5ingjp25ovwlxh419qb1f4hxqfpjs9gael0ldsd3wghq2pmc2dfw71tvvxpa6boadhcfjdrr8znsnn9kzxsv3rwhw8ve0x4yw5j21n4lq2lht11y5vg86kev73nmj88hj3ksbv6ozv2',
                responsibleUserAccountName: 'unxm13youh11g8t8x7wqq',
                lastChangeUserAccount: 'y9o34k6w9v6l4xll85m3',
                lastChangedAt: '2021-05-23 05:04:10',
                riInterfaceName: '9if8lrsh91ylaf4gjc2hpims6wc56k8d0vjtodgnxi8182linj4zdijlqnnbrrdqhpn05bgblbfhfrjzgup3ia9lpkhfg4fyws8379415zrgsncyf3pf6qzohzpzeeh50exyrndfqjontw2zqq06gyr5no9oh14n',
                riInterfaceNamespace: '65309a2mh4v3skvb0ddcdv2r378htj6cf40ewxxwanjj0j7n339hklo53ulksiw3y41ltr4vu61yb9isktw3fhwbfablufmsjbswmpr1le3ys9dfjctlev82495f2f883rrny00x725rrnoxjn9g3wbvksbkdijz',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelResponsibleUserAccountName is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangeUserAccount is too large, has a maximum length of 20`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '599436d2-b044-497b-8af3-8e02116e60a6',
                hash: 'd2hhu9hy7hzoi3kv6o6m689kh7926hwor9h9riyc',
                tenantId: '1ae4cb84-9af8-4fcf-8034-1717601cbf66',
                tenantCode: 'j6dbz0iheb1mgnhee5581wiphg8w7qtlh3nwjtqi7epy51eq4m',
                systemId: 'd867d20c-ceec-4538-8aae-a372ed837330',
                systemName: 'p5ecchecv4obnixfxett',
                party: '6omur9sqakayw9snas45suz0w9povfhn0rkvwaaifjsg79l5mmw152liyoou88k11ddpqmi5bdnik4zqurb6bzcwn8tf2exakip5ynknqv6t9n5ru19s73jtw6ym5p4hsxnfm4njr21y2v31bn9n661hk4fu26o1',
                component: 're61hvxhw3ju3u66dlnk9s1nff4srm54wvdi7yde83wokhkntam4cewmfk0xg5wbqj1jqduxg5zgqfac27sx02vqttg3dng8ifv5dlkkaw49jtxtnm76vht3p60l083zt2gqbh3645lkix2bvbt7wxtf3kxu6wlx',
                name: 'yv45foc1cbps8zkrr1d9ostauixwlc167w4u4firmrhv48o9j5lsb8zvzdnnd11t21gjb25gezj4czrji61uqdnj8088ix7f7cg3xcid30g111work1exs3mhweauy525vgevqo2o44y461w2ewxhmri4coqob0t',
                flowHash: 'xk4af0xb4q5153sqqxhn32vqkrmed5fvtqzcp9ht',
                flowParty: 'aov9smqmo31g7ahlk29aynx8f4khkxzrdedvhty1de7lo9vshqc0r36cjlnl215x8u14fcd16rubaqd2a1iffru5yrxr0e0w5jtnbnsda23wy4owt0n1x3ru9xnsfn7y5wm12xsfr1bmjodh0ze8kdwqqk9r39ck',
                flowReceiverParty: 'guxwt7r2e4exg934phm7s5l4fqizykeusq2kxl2cemyn425f0m9p8w9v6rcl33z9y9jovo734qjhj10chisvqh0ysv81p9xuxttqglo61u8im3hy42u6gmynx3espz1rbx1pfe5tyot8szpdxz9kgs8cgunzhwqq',
                flowComponent: 'gzhzivpbwoyoawn6wwhj1syywchzhm2dk0ziem3gn7r2ejedll5lf40qnnbz10g0sx9h6mhztyzax8vcsuwf28z5w4hvzpymuvgpp28ujhk8kjrd4vnpmt1i5wotxbjoustwp85rbfmiij25qa1oexyytgo0i9tc',
                flowReceiverComponent: '0q8sftpasatx754etgbamrd8bvb9tolo3vmgsiq8r5d14oge0s7mogwvyh1ttldcx1im6hdkrc7mhohzuz4sx94ls4znu3jipraobypkext7eoop68txdmfxvulo40gzwx8u54xhh9shzmath3vfdxarycmrgdxx',
                flowInterfaceName: 'toq5k4jlqued1cmut0fps0z37q2d9kum3zllw3w8qf67oik4idb905nazpx6nm9oo03v8123csabt9ws4qrcxgklroke5vxdoejjt7erz5dvamriuhnqvpz25g7y06ljnd81tndf3fcjne7shy82lq9dp5jyxnmd',
                flowInterfaceNamespace: 'ue29zqn4egqob02q9kmjyokeeqzz4x8w50inct2kmlc431219xlut9xa91gjs15z3flkn7447nv5bgohn1r7w4r7gxmi1o35jsh6mzp5rwh2su7cxnq8sy4bxqy7ywk03f17w0nvt1b7h1q72f5vradhrk2saktb',
                version: 'ploio5z27js7k2p7u0or',
                adapterType: '3v4z9dehw2rrao4jneg1oo16vwua3xzs4l6s2ejlqmbgyf2aa7t68h4qzex8',
                direction: 'SENDER',
                transportProtocol: 'gc6x4bvo5514xrwyc7be96j6kva7sz20awkz0eutmkdc5npdhe62d1yli0ky',
                messageProtocol: 'eh4rdr85t9unkxgpcrnkma3xygmauunpuqbf3n6s6c5nme2k2vhev8gszmrh',
                adapterEngineName: 's7snqfrij3aqjsu7ajx4lj5lbmeuztydbmu7jqn8furdnjrjyidmi7rb0eduojsx532gldwzyg2duxinylh862y8ex4agwec56d81c8bhmxcop0jj55lnrvy3d006y64a8hur88tvnge72zb6y6k7h1lrqh8tl03',
                url: 'fn802yi9r1fk81lsutbgyqxqr6wjqge6l2mzlx3p7gw6z96a2g9n77qawyy70m1ht0zwczj4j87qrzlv3ld8k8wvvoha1st2dudgbngobqitmuicts5iz3bk7s4sw9mpktwsbwsts4tejhucyrzblktew6q5oc4ytwm42f89ct1qe6sdkby79xqje0b6ppduqyolyw9a3o2r78sd1kmof6k3s10jwfxf28q97a9dcx50euaug991pcvre8bl9ua7rawtfxqluxmogxgt20vw59m9spc1dbibsubfeuwwmx6e6utww6l2nvunlgwscjy3',
                username: 'qm49suglu0fsx484a8nhcz4tfvskv0x91dq5u9qxcmwibhvhfqnane9rhtof',
                remoteHost: 'whnb735ztg7b5bwbef44dxte6si0k1ki5m0h4pg48spowclkdknd1j9ojan8m5f4oq607xcz2savnrnnfi6h3depd7zf1i3ebuujxyk692xh999mwluovxml34a691ol57uod9xyvlytg4ceeo61584n14iyhclt',
                remotePort: 1239232287,
                directory: 'yiw0ctn16inb55oel554aae051xo441j6vn6i7cq0zwzz3ix5crj6kcnemoye0hdqax2u04h1c9ihgp1pale9w5cd2582k3guf4pkswhjfvjx3d1jnqhm1ds7gt4r4qpvt2p1g4fpg7ilpnsvowu3jntab9bjivbm7o1zv402wknnhgsw4vout4xiu7u7xl9irx7pda6b0cryzw7e2v1szchc98sxdk02vl2ltizugs4gzspbf262mpkb1ffcxrbxijlbz4d7koo0xreei7xt2rpdo3hqx5yt6r2fvbws9t2somatf8o0pbbh56z00tq4z6z644vb9btd8xpmhqxb7hgitjz3sg2vffny8a18zfwa6iy7f3yy8n6p3k44nmqebs2jr7uxh3gnc7xs7j1hpvnmk6r31iuxu706mhxxwbsu9y24hynncj39qtxz11vzd2vehs50c29chwwxqd7v330wjf3d1n81g8tk0gxr3k1sqjnib2lxxkvmt0pwqumoqqjajz1kx86mzfa60hlgesde10ny5nxvs9u8kosxs44wn5n1uv8oizrcpcdgyezgggbk3rt1nh64eg1dlzvc6vqda4njsh886murmceqbzzaitr8eofo541jfqfy8wpp3t1prgml6ofehg7sve2d5vt07scg68l7apxkfidvr6dztcny2yplcgsisxmnf6ntuuzka18eki1edusu50hksyzzfeekrjvcjtdn4cyae67c16vwlns4lm60vv41hk0c3xfxhh1ezr8yh4hlq9elggw7sir6xokehte9coqzl5hcmepmty4nqdoexshi9yc7aox2rbq98iqutw3kmuwmrvm5u84fv1yj548vt6m6iu5ceeiaiijrvpcyhrv0l1z8r31rcf2oyju51sggpiqnh9zniexcntvk4v4pdyhdjo51i8sg7r3vg8velasfkgxmw1m5exeragfugwxicf88v5fk82hl0sw8sj5vovdi050z8hq4sgujcldkm21m355',
                fileSchema: '9rogqy701bc9a0t7ei0ppveiryzthnxsgo7x34p6x12qarb718l104wbx442bz1qhyzny83i0bjgrs268b0o2rcne34c6cud6sda24iqxpkv86w2th8wp2b9ehencpi19cr6ji6h5oh73o3mnkcocoanpxv0rlqcguf9udmz25f6v9jjcgyl721rt8bwxehb0s5y2fl9zmk4eetqvwnyqf6am4bmbvuftvynu8koajlo7r8q5i75021m5ihlck4h14jji0407t3k5rj584hlff3sm6b919fc05y610y3z3g813xchsdk4kl1etbtfn8hrzhyqfx206v560flkpjzbrr1e8ghg05id4og1j0oe5n8h7wo90qti42fj1t7k3zfynzexffww476cjjwezbzvuwymoisk1i3vskvfm2f6bwi9iuiybt8h467a4l4w5avts0hu9bzm6bg8pzshyg7b6px38l5ipyzp67fx9si5tbkyuh0pedjj3u14r0dmiynik7mhzoood7k4sg0aswspfoi5p0qwmn99h0l6nw4z307syderuy15tm24z1y3xhxja66ufvmjqud4f0e3weg0qrujj0lxmebd8dyvygewjfmi2aesv2j06vx26pk9gta8a05is7ru8hl12ip08rvpt3s8ayp8qfe0tuvy3wpq4u3f9oa6y2ekywcrotueer9i0b5lw7xq5qn83ye1yelqe5uii9yvjjoienknczxeoga9o0b1j35yqhznwdi5151ygyzdmomtg85o9l6gapydr24oaqhj99nvxa4o4juy3449du28azziq3ccgsdk26fqdrlb07tz63ayb0xfc48bzcuurzrapheeahkzlh2f3d021e1zusylfzgv66z9xnu3h2i0v6faqqts2mwf7rt3vi5iny5tcxebman9q7paqbvxklh3xcgc7uaatjv23mccel5u34vfjfrkn0dulhe5mg36o4rnc0mpnv7i5aqxpf3uckcqmatf3dwx3rz32i6',
                proxyHost: '9jh7dmjwvxajlrqh7gdlbqdal1lmbd3bkxishegzyjgxmq17km549yzvtjm0',
                proxyPort: 6853107991,
                destination: '60vbusyoo33a4ywpq40nls3193g8pdu65n11q3h0w33pn6le4y2qnnrmmg7k8p2p5eiy0q9rymptx3p1dint60of4c4lmisy6lqywsdar5sb55dfcvjflz2axk1rk4z77g1cvrzw240gou7g0bwoacdue03mrw0m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hzr1m3pd8pxyvbqo8k667eb1vfe6l8361yf9xav5c071qysb5jf168ru60w7vng1ld2yitjd4sesfk9ll8a4hib4nuuy8svqyweeu9py0mhm0c1um15fiu264aifb7v1trpxyxesa4lkizeavvm12xq9v371kv10',
                responsibleUserAccountName: 'quzb597ccx0aw0854fj2',
                lastChangeUserAccount: 'diofyluf59zfmvpsif50n',
                lastChangedAt: '2021-05-23 20:39:54',
                riInterfaceName: 'nw70d8oalsnio65kyrn45zc98s96xby6ge4kcltcjgjvqfb9b1y072qauake9vj8ry2j6sktcp7lk1e74o7kslo56xdne31k47rwiv4pt8fg53gc9s7tehljmbcq1zslv3jtegt52aulkucfpwru64fl4rk6cfck',
                riInterfaceNamespace: '6dgybdt7fwyax6ct8vl0xi0rm4felkuwrxxxpag3o9wym3w6dhoxn2lmgwgv7nkttnwty5ckm47ey6fhni8jz5ohmynwmqe9h0c0spnsknp051o6rz1503vr2ibic4510wba8caed65e6745sdvln3nqb4zuhsz3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceName is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd1b2dd95-dd83-400c-a557-680ad2d45db0',
                hash: 't2azqpi3b6powll1iit0ncftu7xxhxxhrb9jhnub',
                tenantId: '9cd87250-f722-45c2-bcf0-2cd382544745',
                tenantCode: 'i2m17mujwuaz8aqt725swnfib3dofnq8b1ufuculzwmuhg3n9n',
                systemId: '8babd832-8d0e-49af-8a4e-5bef1ed52e96',
                systemName: 'lv3ztif9svspksp0460r',
                party: '1un8hi0jbpycm3x92l1ubpzqcn7u01uurc29g9llgmm4y3hj8397nnnk8yh1nn90a2fnwby0lb7rtvue5lyzxcupyisa4v7ne8yyrb9pxsabvxokohqbs8gx9ihwin7srx8k9vy1fr589pxgj4ejevunx1rxgbgf',
                component: 'kmi5a1tn4jhxp3t5s0rtxu51g0t9bjlt12bmo9oz6i6dwkez5ks8w2vm7k5nr72qojifehitk6e09nbhkwj27llje670ehgiv838qu5scpcmskd08vlepfb0j0jxje64ro2xrtoxnni6fgynbyk69jjw57x11u70',
                name: '00njvzhecbk75jmrkuk2ks2dru1op37rcrfyg3vvg39tswj0ysur0pp40dbpzmkxq86pah7e3jtss6eo3kfq636xdfnm91ycc3v1umbkh6g9xahcix54vwarkdt5ryqp1ccvzj0hgxzog1stloc5e6msq41sikjr',
                flowHash: 'l69034uxp5sy22bex9gdjajvkedmljxxazj4qw1q',
                flowParty: '1jv4ob2aji8kirrpx9znrx5nwc1jrxyrrpq38kg4srogsk6wzlulmehvaodbh2ahjjrnkl4078un0xz6lk4wk9oewy0ikbj4y3f7ou61968tvu8y7y96o31krqm2xh1cjwt73visboen9klgc5n2l3q83qer76wb',
                flowReceiverParty: '0eh9xibjrbqwhhyph3pbrswq6ekyv9meovf7sbkj40jkd9we0lia82ho7nw7ontidt1mroif1gkb3xjb31hycdz6esgyhfw0k3ail82jqajfpqjgmi06s9zx2vwn3cdbc47uxx0fvjdesihsjjaa8u83kdiqnbpc',
                flowComponent: '8wxy61zyw3c79ma3a06pgecmaxhwxz0oaq2qvc1j1mbr94uh77jbbm63gidkgsq3vfbjastljvcdk1i1zmrg5zhyr4ogh9jdgx4a3o9o7t9hekn1pw405svehqdnpbbrizayfmg3xzlmwrf6kgi3u2ertfc8cspy',
                flowReceiverComponent: '4cmshdxrp9xti69xowxt4znerrhcupro0vswz3tkkiyk71fksyelajprdgcc8mepl3mmbue5o5zi1n3j3bqrqa6gid7obylny3nli7i87j6vmt0hxyabq7acpqau58oaksq4k5i2ed5vo1g91gr840wbvm06w5uy',
                flowInterfaceName: 'kql8pu8xsxhmzf0mry12j6xtf7r0m1xhk5wx64hyspnz9iqdvfl59c0wfjcxnq3ilgu6717zdk8jndzf79nxpcugkpcxtx9pke7cpuxwj8qz3pbjxp00gz0w47sh5zjp8j0ifjw3uj0jdfvwrpmg2fa7y4wk6wza',
                flowInterfaceNamespace: 'js9a5u3et32oqocjwjtz6529ti0t5pzcn3h88ekqkwi5bzp7w47ukgwbx9s4raaai2picspyxmax8mo6707bd1vq753frk3rzzumpts32c4w6jhprozgqgyc49urv46ekzr8pfzs85ono2qm8jxyfyd22lvdbebm',
                version: '3jhp9ti0etrdpa4cdm40',
                adapterType: 'v0vazlhmdbsp3nzpt18s6g0cwk56d5hllndi3m9xwhf0fm25ibzonn0yf28o',
                direction: 'SENDER',
                transportProtocol: 'c65zfbph30lkbot7ti8mh0q2lkkfavvswmahzyhebca92tum5lij3xe7ba5i',
                messageProtocol: 'jeabh6ctqhzhjpprok9i34q2kfpqbz84y9phfh8ulmyocwixwjyu2f5l6aeh',
                adapterEngineName: 'vcw2r4tvrclgkt1m9q309wje60sa8ruuvucwmjzeqo3vk5wxs9k005f36xe4k8f3dwnfy1e4ohybwfhw3wp0q8lcbl36fh1ae6izwywa6t7rcjexkh27jk6n4m064bz138ysp83lsna1lep1ikra5igricxea37j',
                url: 'pojelcavz19zo1mjni323i63u9fq8q5l35971dth28k962ivx1r1nc9d296e1exlhr0c4rkgictdasuk5iudhpnaeg0a5mfdkokiu2z2y8nejkf9dfwc7nn4vmrmn5o15vehmiqtapp6u8cy8pnl799ju57h3vsgpiuhcec4j7lq8gdli0cmsnesirmfver7g5xmcizfzlgxa0f5ezi4xcv0oh241jmrozo3j31kk4sw4g4zk2h9ceoi5atf8w4v0pygpe4i4x48hkvbz1iyz14kef0p6g056g9talz602xy41x6ysqgul438s7sy9a2',
                username: 'bip42vyrg4puyszhe6psveofqf8xnljgntsfce4g08qyuqejxtvxrzl6iai8',
                remoteHost: 'inqlm1bch8614c4q462t2si5mu5nnlplazpyzyrl8uqmnxj6ayebb6n7o4t5m1z52g61n4rhl55oiu49fmc6hyxqehtzgsafhc5njjl3m7gpkknnjrshai9uosw69uxq8i1epsviqt5jw7cra7ycz6swm6lqtr9x',
                remotePort: 8818978911,
                directory: 'fxube3fpvhtb8124dz4bc8me6ocoihazq3am3ltmpya47fbq8jlefar2e6bk2u3uv33l59l9g292o9oqca5zih7amo7gxjv3gme7kdyot34ldwj85emwk7rrbtpl9yhpypvlqkojgv3co0yfh0ojj9oww8l7go12irs3muwqdk1wpx68llh8b2d7xhj81cstsdfx439bjmwf04px9zl1wxtnehzvnxfuizfegtsg7l44z3dc4y87smbxsbmsgadgnwnwcazxe70hzhgo0m8w6wzft2sg31tekw82pfhztox5ovrqqv5q9iwj9atxl0vs5c4kxt8h0kfn1vo4chuoy37ak146yejcfkskzxxzmeh05q2to1dsb9qzwg8td7sonrgjsbingh5ayupg1cckzvwi70gzo8fsfclfy1ll8mrbu6kx1la7qcu8ihspvn5nrwfd0ans393mb7zey7nabmtq2kzdu748sorvnnxqgc0ldzpef58l3cpf46chtbzhgfaeo5ig3h1ktkn8obqk0jefpswi403i5qzpsd3sro8qr5kfte43i31x4jtoe1yz8pypx7tjh2ri3zkybm2zhylocov6hvbj27lvjbgxgk3m751lg46em9j2tdeuhkil0xfdxwhbbu64qlls0iuxq4ppvp7l2hbkjfbabawh72p5w2jgj9t766mictyzs3818qwi3azozf2c818hvdufmiimeo69wkcjsntszpqkg6qfusdutftv85h74kdbnxd49ucibuwad26po8eq0ym24tcq9ab7hpv6d9hpinqx1yfg1b4tu1itvxwkzioa43z2agb3q7fstr700aobpuvbuz9sb2dtzjffmr1rjijy59tjy0w765v6hlihazm970k0fwi5hgqaik6v343yxxxuc0t7qjrhpxhixtsi1miivuh6rbka5z4acvi0df355n5qc7sa30s6v391s4cymkwuqhka4x1kwfgvas8nnmijscjpgml1x2xiu8usp29x4iua',
                fileSchema: 'p2u2hv0setop1glcxypv4ibr03bba0d4rg8o89fllx8ioflydyc1cis0ltq0vtezkodg3gpb8qcyt3zro13zm6jegw8f9wvhyadhe3nl40dfberz2pa1l7ya33hxu9aykhm9gvo53ygxi1vat6ks60p2n28ido9fo8ayxr6s16g7esg6fzeswfy3yiim224gzhyj24lzrmarmw0y4soq4wmptug5ykqutfg6cv1qofz5z0v7coulav8v3okrae0jb6vz6xikb7bf85hnuscmenir55hr7wgsb41x5v7ht4iqaftz5mexoe4gi23k4bzhpj82cxapl9rji8ybj5uxyt2eprevg45d0std7vegauf4vdi00hm196sibz9pme8d4dlolvnrdwsrxq6r2orw5ucg68ra514xvzt8lbb32lvpycdjtycpdd5fs9olms0gt6mwedu0gveamdtzwjxjzalvpqtkcg1g9ro9n185ycp4jzztmjl7v1vxhbn2m9v4apgqpxo6kg8gkyo13gctld61fn97mdsp161h07ibypmvv24ho8g5bzniwetkcop2kqovzs2fkzkrsy4ji8br7uai8tw5o8b73thqe5rz5ywbhltefltd27g3s2brqkngavwked4b0n0jyppv29mvanwkoit6yl8ys2tmkmo851f3syaq7mw9oejvqk928deu7mqeumwvzqjjhk2l7m4d51xtllqrf1kt4h4og38639ybpwynj89t62m17ig2xstg1a8xdlvnfgtaebzqnwmhcfn14gifkvmco7g11kzmwtmhfeqfrr4w7go4c5w1s387ydypczvwihohcgofovzv29c82sfg5katnnbafjys7486x5q2utqhysemg8iqsjjamjkzow1v6s6k8mwc8nzxuyeyi6ulmoramrf1px69wxtfb27zddc01mjh9s5dintvc76j6v0z8a7x6ytronc23jtbnzouvactyrxinghvvjodpxh5ewjhkdtql9wscup2',
                proxyHost: 'c38wtnpx7pam6pjyibfluj1jd1ozdy72dpb05heljcqb3cf976lykvj01l6e',
                proxyPort: 3555815403,
                destination: 'px4l7bk28z4hu4g7hg1vbfo6dfl6sr6w8xgl2xl37huz8wpck4k5alm0xaz7vva91cbxnhhdol3hmb43svollzgzxhlnib0ox3z3hv29dq3w901f00ras7x8kx6w8zmngichzpzgde4p50ya0qarvjbgb6szcsd6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'uvzvl54gs3xhf7hyqa2rt4rlmhzeoiog94xgruems0w4d2qir4rk9jh1l843eft325yk9y0znpq4qc4g4xof1y3bu20d7hk8nn1uw6fcpkewnw2w349o919c1uol2u0nyq37g4vl52478g2ykz3catn4mfyrn6nr',
                responsibleUserAccountName: '1dljv9gie7xkgz9nwmto',
                lastChangeUserAccount: 'tez3hvc9gtgzrg744kzk',
                lastChangedAt: '2021-05-23 06:19:05',
                riInterfaceName: 'xnplbmirz8n7y31r0jstuq29w2r39sltteij242d8n3c8mw4hrbfxzvfbc6iflqa20mw52x306me4rosicb7sf57pb5854j1b4w91prihw2pgjax39vmys7125k5dtfem0ryc3155o10vtykyf7l59i22l5348rn1',
                riInterfaceNamespace: 'my4qa8wyvuwdbvgu1hq7m9xvfcxg5d8h5r5y07zqexq560lwnayxxovzohpgdj3r32419nnfytows70akopl2uuchkfu3b6saoala1u6oy7hpa0c73f6xz2ae6owyvlh0c5m37a1qpv53ok2p4tzgi3om4b40mbc',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceName is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRiInterfaceNamespace is too large, has a maximum length of 160`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '875eeb44-76f3-4a71-8180-81f031c9dbce',
                hash: 'm1tk0pk1nzulrcdk9ma9zu4ut185ptlhzjgkyhky',
                tenantId: 'e6d06178-a8eb-43ff-b71b-c6f8d541c6ef',
                tenantCode: '3k4vfeskn35pt685wjhr6bw7eikxk8nx5zd45wxku8aciwkksx',
                systemId: 'd1698774-c57a-4a7e-8da4-10c9e43d36d2',
                systemName: 'qwx9ngyabqfc0dx8taxo',
                party: 'ff1rxph7gbdb8tob3vgq3b6ne0vsl3nw6n75xmr8p6nqbtervgqkq0be7hst8tzyvb5sa3lqj53zbdbljsvredwjs9jjjydnylxsd6hw76rp6selkhzidcmkwf3pphaug6cnbn6ihaxct9wgj08o98ytdd27qdqi',
                component: '8y3u1pkkr3xvxien7xsmdaijiy14rpl50wbkvk1luhfuy00nssf7cz9lgekcj2cu9tf589kcfn89wixa5uuddkuf9adhv8ymbqkyv98yn5j1rfgjfy28jdvspd0ivxbmgd482j6sqkdymzwz74yuhtrk1tvhr3z2',
                name: 'ixg2w331i1gaqmo02gwlly98cfusgnce2kb0si6yc50umuswlszfw9pdlzm1w3tz4xz4cekl8x4vamefnuczc0ld66z2pmtgtz7zslhrjjhymi37gfx48lmvoqkm5uszh4c975r4t17do5ummzy7942kspg5dqxu',
                flowHash: '47sjbu8gg62vuu4c9fgkyw1u3qot5npyehwojohb',
                flowParty: 'v54cwmcd0y00azglymdj29ok5vtnvmxaedg6z6fsykco1xhqc3x20ecsfgz3romoh3apcy9huvblpwlcbs0zrgzxbkr7n0ewno0p2fy3l1ffxadivl53sreko2fyuqrrzrodnsiyf32zzvbe99s6ff0kgted08oq',
                flowReceiverParty: 'livtn7359rmpwebd178ckmj82qr690pw7bqs9duvnplt61ylquq8iyo55dy1swf75a1fc4gr24z16fw8o85ckg11chefc9u94hu8le1z91hzt7huipuxtvyfrozwotuuwcaatth3t3kl2wslgite1kmtnc9sqj14',
                flowComponent: '6hz9xt2w7j1pjoa5kiemd4y881xaqgn4haz5dc0bgl93fq10p3pg0wyvz0txlq6id2k7gu9ivzo23eakh12mlq3v8cy403zpj28z3scj0s46tipc8rhln780577z43dh5tnyaatc2fv4xgdvihsiish3t31zeewl',
                flowReceiverComponent: 'cxrjqvy5638riy0r0uqtthu49fecvq818bfgllnrqrf8h633erv18l2r4diaw7jf9ffpmcnkwiob7vv3fw5s4wlherues899kzru1pcksdmvla09sv0rvd53lbj98836tm61py3zqxadzwu9581zbnfb2nw4n5wo',
                flowInterfaceName: 'l6vg8slz1p1dfe2dobq6n0xeuboiqlb00cg55x2u2ea5g73v062mqa6ebuhhipt6xdaia590b3q6efmeg8c3xlw8bh4gq6uzree44hjziluciexfms5ql5n1cuel4dv3vrz86272zfckj7d32mss9r12q4gitu33',
                flowInterfaceNamespace: 'vmdbjzjbf2wntwglj6l3bhq7nnkyiejpy62p6gag06wjp6pw04djxdcv63ru3v53hh6drur1hkrlwjlf64ix3mv3zwgtue8ht6nqo5b3slmc85jsol31rk7ain2epw1fggedoqjnt7gnlvzq6zngc7gf6nhspfd0',
                version: '2jeizd16mspjzklzarni',
                adapterType: '80g6ufwk01kkw1osdvxoaq3r2xc950xr8va61mdw8iye6wtjz6sg72jnu9w3',
                direction: 'SENDER',
                transportProtocol: 'a5hth1g6bep6m0gdvlo18c02ucm3uc8go81bkbbnd71u45skys6ri537h3kd',
                messageProtocol: 'yqty8ehpwuxvjqtkzj5hdku9aqwck390qw5ld5awc2tq1kq1wo1f4etd8zp2',
                adapterEngineName: '76ilkszt3t0bthxrpeuj36dip9zzbzp83qozimi62264cqvtts76qcjfj5f48mrxqrdt3rlhwlv37dr24vetlhc7v5fxa50wou7192rn6mb7ic31kvk8x9sba0xv7j717m64fail8zstba8wpsqzqshs6mtsjcnr',
                url: 'fqvrfpjgtrnnc7u3lzr97nts1l3fbjhe4zpbsfk5rwpts79e8nvtyqzkq5papzsf6i36nfk2p28zepaim46alx99i4126te74t7s17zm7c1au9nnmr0uw1svikx1tn1ilym67ontovi5i2dx9c32cf5mxqo4wxbo4x3ikyzu3lejitji01z2olkux52dosi531fk735vfbtshiizcyzqfcggsqq0tewuxspern20v5r6ofe94eb7hfqve9brp0zy8xmh6xsjd6yhalsyo38e7hxk59darestk6qw1mwph1fz53x4rsfmspwrflfh33zh',
                username: 'rcanh0v8y98h9z1eox3652babmm0tokeqnnfousu6tflt9pyuyyl4rgzr73b',
                remoteHost: '91wy49uxuyw6l54k8y78bbnrw5xngmgn2yx87apteup0pi0tmthnmn0pe9uq3gx9iumlllxh35howzmoh31i6gvas19b1gvbthtd2mdbwmnwjes5dswh92l89g0eaf7u6rlkxlqgusrjpjksf0dr55uaih7iq15o',
                remotePort: 2709356580,
                directory: 'kio152musil5472n88mmts5jhze4u2zaa7irf0alvekgybc6y5wcu58kpe34lt97izxir8t01qaih89qg5gheq4jgysotm45h4h75hnseqi3mu8qv5e4ki53dd5p255gb0qgr62wepvtmjk5b93jf094qmdkhwwelc0sf11sexve21feqt52hrimbzbih7m6um93kscidrl1f5ocriloyhuvqbdjhnl22nb2p06pchkpv6v0tsubreu2l57k189w3o586mpp63qymcjkk34zb80jyw861tdstn398a2cdwg7c56v7zktea4b5ahkc18vu1ymrt76tze3cpwmgw1htfve220q7o4rc2fjiez1ektgxr6a9d8ypf8cn9vzzhrw8bwb3dwjyp7swl62iatf9l8vod7tdve1y8nirlnwgcjxpe35tlahavkwr9db60ufmni6zjh0bl75t9afvaf99vdkmog84v1oppzgx85f96g8h8gqbirujv8heac4is760q772q6wak3mpcv3wb9946xv6s0uydhech0sydtsp4cbg36gm2bidrrfjravt06n3p618u9fb9c4krhhhv7kq8d48q8j4xsodyah3ryfza79xbyw4dvtxeqgq7nkkztnssp7b9s7b4cihpixvtde577ltuecjtye70cxdx6n5vrassfswzojazl8p5ndkpv5foy5ho2m6cukd5ssha9am9yzz6mzs2fn9klm23g3izkhymmq5pu1c0ecnurbljqjqmt8yps8yontrjg9v10agtcy7s14hx58ma8z1j8958ip1n6iiik7u4nxly5qktk1p7f9vhpqk18vfqitfxf69yx50g8u16c9srbkossyxg3x0al1somugvv86zwa8dawoyb26co2zwfx2kwfgapayrbuhg9nf60ox6ioh0k05wq67j2x6gj7h760ogk0w5km085anjr642xmwf2sz697r7bq3y8vajm96yo6bxwt2vm6lggpb9nd7q5o6ptxpwpp',
                fileSchema: 'jr5exawxz1oyuj56fvnyj51ahajxo4dpsgrz20kaph2b1wv5l19ec8smb56b9d1j19buo24kj890tlemx6rux6gixrr4g01lny7szele5uwtdppb00u1r33hmyfxfbgp1nqqp3bph78tfqgxol72v9l8w340yof0mrilg82fk2i1s7hxvoms3tqzphfe9c0vhtlpapu3lfmltfp7nggja8m0s1rllkncnyp7zdwwfpihu8gnwgafpf39wlte2zr2fk5tb2t3benj5nn3ehv4ocqwlxgig2q7r82hf4j6tyd3zdwhbn3ekzi6qt71ogygtoovmmt7uqokgjrvr12d7pkt2ib26si81nqv0h4ndvbbsegqqgmm0n44vfwj7vlzaj0ei94cd0w08da242lknhm3m7a1lzlr31tcghyxqzkt4ns5eggvyb6nj1uvrcbipc32lgogg5dnb05ycjxpsgki13brqk20tq0jamrhjose5k9r9h6b8k3ua0ldxtkvpo1xg07bdajt2s0o8oz4xjf4w2pffsu3a72wum700kwpmw09xsdbj78nu43woi13tzd20nm7tfj63wktbfzght360z4wwu641br9vbdaxs8bljj747w44f8fqs6bhwgegqojyd8a1gem1o0k0wlbv9yei7b25yaxqv4sdaztx7r4fshfn8bga5ngsk6wxyeksfmsk13qxy2irvr8o754ussqwpx7qhwmskmjrwieikw21jim28gjs76yp1s6i2sqk7ui2i6pmuoz23c6arxmflhirs3v566ciczb88ekzd3r43va9iktmnfbka75ydkc8ev64i95dlk0uwjxmlliod3akzsts00re72ji31lyjstctwc5arfoqbsoj2c9w8jqauewwg2luw8bhh9jp0rfz0kkeircis7x6i7weuxzz8gkj4ijgvkih9nvb33qdc6sk5g7s8zzop1tza7dxt1pxs59dxvfwyqmrop8vmrdygvbjkzr2a3fy25zm1jcwhd',
                proxyHost: 'o6gh0rfvx8rwj656s3gdekim1b4o3f1xd835mnzqtu0227v1tx8aks3sfgoo',
                proxyPort: 4920963233,
                destination: 'j57vxsckrt08s6182zvns64xu6kvhb0o4q9mvp4fkeyhlgb3370sbnkkhdzlqdlgoxjfero8hj8mtq892z1aru7vqcguzcshwchlyong9k6ikolrhhlo7lten5qjuplvpit302xtvvalwocvmujpvdr8cs43jwa6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'odxwicnryljjxvonsow7912c75jo2j4s0v9w0suivdxk3widde6y89gmv68ipvay7brz9uu3o1xpvn0be2ndwe9k6d4vomtoaqkvswywdwpxz1gsmxzzh7azkts9mdldp5lc5rf4epz5recyxhyeoahgpatjtdfv',
                responsibleUserAccountName: 'iv8zxn8xqzzvj3aulk6u',
                lastChangeUserAccount: 'od7ozt046oycuusg43dq',
                lastChangedAt: '2021-05-23 02:22:21',
                riInterfaceName: '0krp7csjukeazwdrm5mdwy7n1uw8ytmvm7l3cvrwtmfa4teeyqkiytn5q8xifgjhvod6255b2qjf17zdc565bnteugudjrmbmqrf2udo1t3tl2kgzg0jsa15oxxeksphwp5cfinl8dde8si3s60fja6n7ouyk1qw',
                riInterfaceNamespace: 'v0dg8t26g2qxvmzlefc58m0189dgcxzwfqpymzq315v4ajy5k3wijy12ejwbh88rh0oy1oehdk4g9pfjynxfjiodsj2vp6rscn7cw4r0ps3r2qtkqkvxzs6ivvolzsbn3jmnohhwcx7pjyzpyod4udi8wwkz0y64m',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelRiInterfaceNamespace is too large, has a maximum length of 160');
            });
    });

    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelRemotePort must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7248c114-fbcc-4d89-83de-f6d1784ad5cb',
                hash: 'dfsrv4upnqfgaowkggjl0y1o4btttt3t70ej8994',
                tenantId: 'd8842769-a013-4955-9905-87184f84b15e',
                tenantCode: 'vx1818tqqxhas7opxv0oxqki5vg4a9f93dbiay991ezvreckev',
                systemId: '2f380a9e-0d2f-4d22-8718-1cd32ceca4c4',
                systemName: 'g0fhson67kmhtel49xg5',
                party: '48crli7ygxymox15tj4mslspzvx4p2z4d7gvibtvelnu7mx5kivi7baovoe4w5aw8c27dyvln8h5s6tc02bloteg0k2byioz3zzvr2zoxp5xp2k2yf96qthrlnbz7l0eehd5flqd396x8k8innu4tm035ehjkzwv',
                component: 'n0erk0jypjfzsdd7k3hudexohv1shwccczm33okrvpixxxztzm0210nf1oa5omchf69tt0pa2azka4sw70hg2ajhxa0vhrmgf9dre737r6te1josnhxleor3q94sid8p2jqan8spoeqevmgalwal7vtssi68xgr3',
                name: 'f4obsle26frg5k6fzx43k6n27i337nubrscuwm625ri4clcriu54gx9t56jhuu218tft7qupy8spzbgv5mpq73sytxc49sca9uvfxzknxaqkpaiyzkpre0k3dn69y8t3fhz37u38trwp3a7ltp126l55c7bt7jij',
                flowHash: 'iy83gjzujqj2xlel4iiiurfn4cg9455oxkg98nrp',
                flowParty: '7jf56hp8fvwcgxdmzmdvbt4tkbdifmlb9hwc7qucuevuqjbm2msqv1yxlwkgoh7es1g70dekw7dypf8x9g9l4pr6v0cjn34xdv61bvljt4oc4949lvv4x7yt9nc2957f80pvgmvicgd2wrifw6s3bn0pystrkpf2',
                flowReceiverParty: 'rgxbdu5s8c3ts445rtps8ep9520tkw7cm4kmwy56nne1g9llvrsp2ax6z9teit3a45a6d0vq3q5uq88jaf46sgxkj9j7fzrw5n26ph3kpo4wws77s1ej2kkltubmwqthmgi0thp7g80iron13z9whddu22kfni1m',
                flowComponent: 'k7kq47rhmoq42th5c0gt4ti8cqsnsopbfh1j9bfha9y18uz1xi7r2j6wexptosnljz5e12irlxhro6baxxntpd6fwttoh3sx1dhocyjudlhkkvv3aefbwngrnw47og1r4d5f6l77i3bznmnjbfccytmp56pj2row',
                flowReceiverComponent: 'ipxdmou62fp2hrcymkglq3fqbx202okkocfldnqaass0ph3847j0j66ee0cnu1sq3pckurn9y1m24om06wktp4xh501mvpuefh0ow7b868dwfaemz9ubqit5g5k47ehy6fru4avd7fkc9gluvguncmsubduxk131',
                flowInterfaceName: 'rfoguhhjtelqdtn4t0chts8c8233c78m0ghhioj6ynruzab8rkwuae75keud2j7p5billopgbs3qlyqnd39sjjppdzjwnx7qydfr64rmiwjhrg1pppt692colq5wx33ju06qfqq4d7bhoi3aedo96203d3udxaht',
                flowInterfaceNamespace: 'thxbjspp0mchg6lqx1j71id1u6t70xp285hp99ky8ta6ks3wnhikrad6x448cocxcwei9lvm35n8rzsoaub524m1eek2ey3p2nf9pcf4byk4buf7eme9q0eduv9jk26cmls31zrxtzl7dcxbxcqem93g37r5jf87',
                version: '3rs1c6xpdv2561hnw4zn',
                adapterType: 'likx0pd9owhagial8mk9psj2g7ms9oqozbiv207ctbtgnffw1wvxcs16d5nm',
                direction: 'SENDER',
                transportProtocol: 'cfexvt2hnc0dz8a878ydjgw7p3k3sl8hiqf4o6y619v08qunmus3h49q44qy',
                messageProtocol: 'f0knk13hcf3908rpvvgqh1yj69l5a1kltkl6z8w6d2fnmlz6ivwr28eshode',
                adapterEngineName: 'l8gjew3efcqmw7eew4vkaylcpkbysj5g0lcq70s3d20pv8tnwejfe4w6k0j3dnwef1q4miyyc1i65nykh0mxxiwnluf2grub1db9tid9uhxyg43wbiau2tmbdosl582713zdos587t0zpzktdbht16wzaiqgn65e',
                url: 'r9qfw8bepvla3jxmm50cm5hvt1wf7y5avypztazepv0cf4t0yr09gsb947iptzqsre09d5pl3attjdy2vw5u6b31utokp376ywggctjjawpbfeytf6jqim7c998mhaa0698w5rlozzhy43d12mwabp51ygko22elb5pqpocw061sqhgcvxky9opxtzim0ocso6kp4ok5k7hi5ork8j63aupenba3qp38ctadc5gn55z9dunyrrjhbdztxsnf6vt0jke0go3ebzla0motiguadiq5h2bg47miukms0n63h0g50q4nbu4ioh9tvirv2ufv',
                username: 'pelc8cd004qbjh2n28mkvtspf7qhjryeij11x7xr26j1n4xxp0yo3yjdjvk7',
                remoteHost: 'm4id7fmnq3qwtrt61ezuj677996b64ugh1vgt57cjk7612pejkn858u6hcopbsmod4cy6uoawjs5wpsph96iajh5b0wr0e456gbpxf8cpyktbqkvla4qcvzzvl1l39i5ub9egyzj59kiz5dasc17wvdikf6qya0j',
                remotePort: -9,
                directory: '0vbfo4zwy0n514b10x2wnfdyfnu08leeyn6606th1s02oku4aaqo6q8h54rwatcn0g0i4d7ynh6l7pzy846c40mtv3vayyrrj2rerw1hqpofauim49i7hqnxvcuypcatwnamuza4mbsfl5zvac56xnt5wz2rwttxhfchzxo9ptz138qlvhbjpzv688jli9vv6wrvsgznv2uwqrvxrx2jxsco84j11xqnc7m3krr8ajqaj6mgc1z2z73ig2uf5l5tcdrtr1p7ylmkjazzv9b5kpenqb4n8mk72z7fd8omv0zwmgc6evxbgn451gashf6jwr458zjmmhynmbpqw03oc5yl50u7ydc9ig5c94rluvmyz8zsaq9oc4wshtyq2c2ao2ojuv9ngjpr2unp4nqhl7v9nmm77twhhgrjutu6x63s9c16z89u0qit8eb51l1f00x1fyplv1wzcp667ik013yjkdkkk8icrp6es7tu6axqn8fz5ag6vo9ngd3vvudrho869ru5yodxtcp8pv8sfl76s0e6zz2eglfbcaaa55oolsisn4fsnin68p2b0iqtgl6lolr28xghjtbr1mnh2gr2qya5zoz54tzrv6ydcg0xzkaoq1iacjt5rvv0tscj9achreroyj3j169urnzarpm92lfugqy1jzs81w62blybxuoi0wvxzjdblr8bkomylp9e1oar4r5y66rhv3ryeykutoz5kg7fb8s9p93c7vha7hbn9glezpf82hsmqyvlsqp4x7e3drmg12u3vd2n74wbnqwoe339g7u27chvzlq2mr0p7dq9ylg9sdcct70fixrjs2oovzinmrm93hgvowrubwctazrayni1ygoga359hkh6fp03tqxrppbhadveiozkcvp05s8p7whzvvw72uc2iiaoysm5xb3ok3n1lqkhgff71dddfdnv9h1sdrq9kyec8n162qkmso3krp17hp15eceuubiow7qfaswtziuhz3nyqf4g5ob84nhutxd2',
                fileSchema: 'qzijw2wnjvucs6iadzq507ky4t0vmwvrnqx2kpvnim1s4csuudmeicu8zo7tdf4gtsci0iv38vhxtbi60a6w3gwmwebu8deni1c8sdyfqhajugot54mrerdalj8pohnjckggjqqiws454h5dzrdsku98mlxx5gjq7c7pfvtxicypex4d86safc0fzkmr096gg6rw03ebok2axyd98ljpibl9gphlnm8360a3mcvezycsdpqdjl647oriosm5wf8yzavhdbyxpcmg6aiz7xwcfc3tonltkuce1wmmpjggg6phgntjv5arm840n579ybaus91o9wylrz8du6bxcyu1z5ny4300sf5g810b5r3vjladztlc1v84tj00w83icfgex7h35rbxxbsk2jrmnx7ibko4j5mi98ti74nll79i64q0psdcn7qphuoj7f1d4165ipeqdh554x41hgekpl1ao3uhd3yt0ih9w2rxqov6n52cw1lhllypy9a5tt7p3hz9h4506g3hs7dfwgssvjeymmk3w7bag682623qi6604uoc64uz4h78phj7wce9a8asi19q3cmh27mx2xrys3zjad97titu1y1jemdui9eknz1w55mhe64gt1r4o8uza1cl33g5imxregvdt9wjd40van185ziivo7cg83yxcyrjgk6misjrrrltrzy15cpf9x5u0d582r67e9rybsm412lmh0vf4y0h7oxkk7tsg2enu5o6he7fsoyuwoymltfwzewuquzr014qswv4e44luoy2uporj1ob4fxf5qqrzdkj34r4cuz9tg4h9ya5janfmzsv8kyu5m2cssabeuni0jmhs5zjr6m26qdl5f2yqc5hlk5bcgegl2jugg02fobd5sz8dmlymshtvt3pky0guvadds0tek47zqrp58k2bvaedobpgn4ljj9a23u8zli07z0nyi0d285hgk069yojr4jkafa6ete6ltz52na3j4m7g5ijrtqww77g7w8chxj594o',
                proxyHost: '4z013mai244sdwyl2j88ia8k6rcgg56n7v15b3wyw3dlxvjagw9qkmkdtl6k',
                proxyPort: 6805625204,
                destination: 'l3bwfc8q0ub6jua32u77gkldn9s2wwke33uhw9wog4yubkxft0ekkewcuw2iu4z7r1nhx5ctdj1zmr8tzia19ccpixe7ptb1hwf30d8mjjarhgix8y78u19lilqa8t7yemyanqf8fxrgqd5frruwrf49h5zh9d00',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dvksh0pebw4b8fq4g7wqwuwm7sry7fkn794j4w97tlfuobodb3i92nhy9017jgoysju6wgwe20tea32c1ezap6wbay3d1rbmuu32mtmforii4bxj03ziqdp92ex5bsi9dj7adhgzkki2i3rp68vkj8jr5tv6gy6f',
                responsibleUserAccountName: '6s46gy1vrang4592190j',
                lastChangeUserAccount: 'vvapyw0nvpv21jaig5y5',
                lastChangedAt: '2021-05-23 05:28:22',
                riInterfaceName: 'mlbfubhm2nl7ny7etdnieth5bqyau7949o0b6q521ch06astkvio9z1s4pocjablc85thrwfjlblesfzsk9wdc1yvnzrews7jldgvt6aa5kilfhfjnzoclxye6uxsshbph6pz0j7m7ihzs04frsv79wyb9sqenhq',
                riInterfaceNamespace: 'uxpngl2792yis5mzkwxvy5o1xjkm9iu5dqp226hjtd9hqxk7poyzkqzjhx0rohqlh0bwksnvtjm6jopmx192opcfomd3gbh93w9y2tn9gfrxecd9qp22sp5j7cw7kg7udv4cgb5z45sb62wkud1xh371lmyqno6t',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelRemotePort must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelProxyPort must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '2cf19f9c-1001-49e8-928c-d03fdcd593d0',
                hash: 'f790hzwb6kwlr012kbyi2pnr41i2o69z21d9fjfw',
                tenantId: '1727ca27-2710-4ce7-8d5a-5f27a8eedb9f',
                tenantCode: '9di3zte0nal1qb3rvk93wd6gc72owz48716evq47a4it75b87i',
                systemId: '14c23a30-007f-4efa-a6f2-13010540e3fa',
                systemName: 't6kex607333gqzetrtqy',
                party: 'v7rc6tkn1gvq8k5b8yvyvnvwplunzg9n5ts1t10bmc0pogxg8ctd818zusacflrilni2lo1tlbmusp5spp9farzo5cqo74tfnbymt81qpcsge2y52zdo2ej8ayabddqy86css1q872h2u9ya96alz4q6xd2mwlxk',
                component: 'wnnuvph081o5u0humfakkdv85yykcp2h7ieyo6nmlb51yg2xzdc5ujrpp8xz45j8xkxnuq9w01xq7zlnj8hotbs543hmwx4yq6y1dw97fxdcm9k6n6eqj65ru3kgput6n4ch1z9jhgxylq7e4ebcg76m46i1f1oq',
                name: '44az9n9w5u2h96h420dskhryup3kpth59r8elu381u1sjxtwbzd69p1rgmbtwkq002exm5tuolq1eu8d7y29p4ibz1n4n83yccli29s8ym6afppb6bw07ovxxddc9noxd6w7cb90be33nr6vlvr7231mumt1f3zx',
                flowHash: 'gi094vgf0ebidzeggpdph8lqud0rsxyl6jdwzj3x',
                flowParty: 'mbne32b58v4yf2h3ttcfvc9eb73e3y03m2iag80pnjman3t4hh5vel59tdj8o1k79ybh5w64hhu4e6s55i3zmicye7z9sbl32do8k2jqg4t121ptsvr4fp0ryn0f3qmzqtskwptay6olynjrt30tazleh0zr4moe',
                flowReceiverParty: 'bm1bkm2x64ig65xy33niloldy0q46ahw4youxzng6la03kaj2uitmrm602lvcsmlq8zf3y2fz6txkdkjemc5134y5d0y0nju994sfqhni5l4afzkgez26sh2a26av768dujworb92osrui7c64dfynjdi9en9q22',
                flowComponent: 'mc6ikfzc7y21l5v13et6kh58qm9cql2woz0o6r8rpbncj7e4syhv38sp3fb4ijszkfoiylvy3ph0hofr93ve1mj5xjuewlhjw4lw9bzghhs0y0ci5bk0rciag9y4wyth3u2dty8e07p7mzqi7p2ujq8nbb43wc2z',
                flowReceiverComponent: '9vvnti9he2glc5r5fczjmi0sv8bsbpz97hlbsmf2uyn6921krjtdapiadupqmwzy7ugeuo52s2duu5zh76nvdwr8qmu12h9aqd5722gwy8dr4gb8i8mlp5a4vkvabxacb49s4ynodvk10r0xgxj77d3pv3mzsgmp',
                flowInterfaceName: '0lhrc8n5261bzyw1zmjcpuyv8ndswxxvzo120uh4zybnkkpxrwkitjaz1ozaje4hjcucymsaicznvt3hw8b2kt3u7jnky8918ls2yos4ozuc685yddc34nbsau0vvf2bvhuli5bzdk8f9ay9tnx34otg7jcn2ohe',
                flowInterfaceNamespace: '0x1kcjp9nam6klm0ktgx1j7qoezc22gvik489vbxsvqjwj8bdvh5dszrffdrvfeia99mdov9ggfihm5i8hab0ny03hd4c3jfkvnnd7cfcd79jy0saiclx9ycqhkbig9hf0wxk1ksv9ulxns2o08kunse52qg7hvh',
                version: 'duiz0ugvlsfregm1mdpd',
                adapterType: 'kh8xkigddtku2vn2z0nh1rm94k0ngnfo9x4ch0cqv4wh82rvpmera4biqld2',
                direction: 'RECEIVER',
                transportProtocol: '5yw4hxx995p01r0tz1q1vsbizzif5by8au1b9pconp9ewehpqtq7y3vo4frw',
                messageProtocol: 'pidc9qr4dg7k1ojq2a620vs0mirz6jd70fv5psj2v5r7tp7j65onkwdjd9d7',
                adapterEngineName: '4anug2fmvggwl4re5gtt4vnuy92lfylsrsgq0yxz5dnsjxluih9uzlzuvunk0zx7mr7qj9cduzd2zrffa63lyjcokhoes24n09m8z1yi7qoa5sqhwi1u8ehr39dnx0xe7mns8j17u0o34fg8t141a3f92fl1uv39',
                url: 'xacxlgb9yjv5ee8rmsl1grmiau72lrkxezojw9pb6n94772s2t2750u706hfcl119718ktwgw5luyzpus5i0k36cuz2xspvv3iniproxgjofknq3hbrqo1ykc84gibfjq3dncdg3higmg54zxd4jdk6oizu5d70y2epgy98h3hc0ch88ainz3hu9jopdmr2h14potgb638bbh6ombznqxh58xm3h4q5dkwd4mw4xuwynz3ntnd0qk4t8x5gcaqs7mp9udcd3rlq4tv8blhx26qez6kcd8r9kz9y4fyb9fmq0appuh8kvttmdqk5vsdxj',
                username: '5u21jqpyvrkrp68u7x3m6y5duvb820csaeyi8s72nu9lx9mhgdyqmbav5xa5',
                remoteHost: 'l7plwhri7wpp6lyhkp3ycwtj7pi6cguykcj2iwvhloyne012ycpemfhu41vjinnkev05zt2l585uazi1zzrqd24fhuq3t2420gksi31hd0h0d24b7zsu1n7yqez0nxhiiik8kntuho6sr7m9vfs6upbswdxo6s64',
                remotePort: 2103632924,
                directory: 'z95hoqvgoe1pf3978dvfedwrk177qw4nngul95re4f2d66kry2214hqxltvyumbftee5quwqh5m9a97ypsl5u5aghm5c7o1asofb8bph8neha4ese1gglot2ekwwpent3cu840w6qt4ukqmk3qshckvlgzcpyewm980t2fbgcuf8ew8v4iz9w7nuk5xt6po15m1jjna48znlp5dihqkypmbcbendjxh663tp48xok0js01nm3c0md42w8f6p0h9x9qkn5de1a9ql88x0w04cvzontu9l2rq7nxg6hbifoho243rkyk9j3sefz93k8dh36tzcikr5vii8ff9czsz6h1eacm1upm741pn3zh29c9fedkycrpyk5ssqptsma8g95mwssvwvolck3u6eulddaxwcveggmnun11vcxl3733ifcs3o2cz246z864twkg7cl8dks6sv9sfiye8nmgb4od40arq62b0pp7tenlt5un5zr9zvzhv2vpqe1apblmj1irjj4zo9wkm2eqb525mzopxb6h4r2hgntya2ywy966qjeilg7mkfeixaf1q2ecz3bc7emg72qf4sqjwzuzzjexu25r0sv9rfk2cifx0uuvuz8fy05pd72t3ds3axs9fuknuqm24xr1p5kkhazm8o2n88gfvvmpl6fins5dsiomz0hwkdpcwmk787v32nv1719xi1tbty1cloxrv0af4v57nvos85h3kjj6gsv139jbfm0u975a0e9uwrpek7plqjezw64mbtbqa7ajzas2apurp8qwdclyol0njcydexkqto837b1mqc4lndvurrgolio8m27hjddx3mks3df135vykkg078icmus36bc4dqjvj79uzyoqj4111d38e7hwwrc95s5618lam2fjlu44480iryfz5z8no80h4c8lbfv7m88w112ogi637w7zftmo1qzy1wyklt3ment0ehulz3n67sgofmeiybjjjjeikspsz3cdb1c2ww4tlrgyd9unqu',
                fileSchema: 'udohkg9k4aikxjo6iiax9l3it52v8q0gfnyf3h3mxdmh0unr4k3161oyyn19ya3vu1bnni1kgy9etthudr4f9lm8kfg7k8exyukfh72be5dbta2ueij8fp5bvwu9lsmc6mmlw2j0as8hyvs2wxrwk7tr0dlqaq1psurq95vhsdnp2trthaxodo15uvrrip5al96bf11zbef0plcqqy3i3rwk0b68il616cgoie0kqjftaznlqmy8uq49fz8kjlq7960lmyex9zfm5dk32ze4qhgc4a5z3b0nchkmjpi2zm65ar4ugikj6qiwtor0shj4c3l4i4ryiayfkimzo5kjo9nxlym4upf5f3iq71n214xjo4ius0hg1xii7htequbijyk9sixvuj0dbmi9gwgcjfaz2j7wzgqaoskwptlsbgkd1vuvbreq4ozfbaf0x5i64xx9g07qex12l8u679sovzmk7rs77evi7j2y277ktlm9o6bj6wplqh0lhn2yl5tbpw8x9fvntdi36qk188ew7s7b7v783rdxlqxjb0jj2sssui8cnr1lt2r7cbf1r956t3itwlhpuffsg2dn8lmgq5k2op8n4vaz03my2rdnqxyi3ny6m88bp3l6s9593g6wdqkv204vfem6c859db59chr64zh0yilreryzxq88pbkoykwyja1r192wz9myutofokg3nqdhp0w8y02h842con2lkgey2y2dmkkfkkr3jwzxdeyoyk4hsworyyll05uqixc6l8duw35uqpjxpiwvdxzu4tavfaw65hx51dylmrdywvh04fn6u69w5t3s8t2p380n473jczj2ip1yqv4i02i8ssmof6q76qd67nckkibtb4r0wnkmkcx2ojggon5zsngxwv90inu9zpzwk0kr7lhk28h1rer14u6xzys3ky5tx2d5qy8if0rbkisokpipayp7tls9ca98jwfb6rdgj14vskeh0ay8bfct7uder2lekncabi97pocletj2da16',
                proxyHost: '7879hbv5vw9lmoysosudi442mmd4ou8te3aw41wwquo8rkfvmc298bv4h1fa',
                proxyPort: -9,
                destination: 'srjzn1ks69ckypjxauxx17q1zxxda43embl33flsa0j0sa59zc14lf1hdcnhzsiy6kp85ocf89j6u30dlnnv8hm1sepkpt1feb6zvyfkvkdv9vxvkrnc9a15yh4mfz0gkta28dn6r4s75c3bxp8edtn7f6tc7pcx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'op4863r1j7zzvzyh7bhaj3f7tkdwym898trnj189tiv7ax9oyqvvf8njv5c4u7wotp3lop0tqgg7rr4fsn202zfs0mwsk06il2wgmkmi15c5nim2eq23rp7mavcg7gce22g3ukc4zyi0k57bjg5pqrdcovvrlmn1',
                responsibleUserAccountName: 'oi2lf3yebf4n9oe30reg',
                lastChangeUserAccount: 'n9lf5mh8snh9c1su2nh2',
                lastChangedAt: '2021-05-23 12:44:29',
                riInterfaceName: '2deguwaqx12gxc16i8axa09r1polugzjpo5psi0xevcrq6xkbbhlbhn5n39h7bxej7x8t1j7f7hqyoz9fixhls3pypdo6ks16j6o3oq57xqe2ke73yqkv8dhaahb4ogzpucpyjej3uiiallg2dwyza8t8xh7kpk1',
                riInterfaceNamespace: 'pow7x0upjpra0vea22tx97i4451mk0ooqhkv9qylvlfwvllbjjvj66vsqzxt3ma38ksjg2a6khtvexoythizrnjw22qpm9v6c3n8x4550hd0l3imrda9ksh89asaujd52z22un7sz3ujwa8qqvmgx3e20ge1y2ho',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ChannelProxyPort must have a positive sign, this field does not accept negative values');
            });
    });
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelDirection has to be a enum option of SENDER, RECEIVER`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '036887c6-d411-42e7-84e3-e6e91b4d79e5',
                hash: 's5ehhkmfe02sz1cv2js4oc6o6r6zokpllbzvx54c',
                tenantId: '99f32fac-118d-481f-896f-2fca4dbc7890',
                tenantCode: 'vv84o7qetpcaw5t9jbeo6tqhrxcqne6ammm4j0yk5rw5fy7gp1',
                systemId: '2a6a25b7-fd03-4e85-a68c-d085188b9209',
                systemName: 'cksy1csp9ihc7bi5xn9i',
                party: '5recpa5bx19kt1y6qrhndi7zn4yy923d4hhayz2oj0ncssh9mn2cyrxsew69hdc8abz2217wf3shbe65pes9gj8250ocupozel3rt6czx8m1juq06kng5soy1d4xl58m84dnp185728fjat57fmed84r844k7er0',
                component: 'rh3xh28y92887yxuzpqopalb8t27hahvjfjaaykrqoinid0efxapnvbz4mez77jl99hyx73djc5lcgn2k87n7lbte8hwdg9apl1dm7shfyskxnkjezbwl3rck6thf4v857hlph5fkjc6gr85dfhkst3o9d9qi0pm',
                name: '4rlu58rekptse3pll16zf861ptqxu6npn2ul6s5j362ytb1azk31zcoj9fbn3r7t61pvkoubi5un1g3vqkxffuaoau9sbjz5ysqwrq77ecbi3yrrabzzhrzzm6ji74wg5aloy0q92fs3js972l8cmeooybdinvob',
                flowHash: 'gh9p49mnp9ea8obhlx7qx0u72pdcm27jec8475lw',
                flowParty: 'b5w7498fv332agadfxsyi2yifuwrd0n2is3y1uun00nm3pts95lhvojwly4hdj5a75afwt6f722nkm89lpnw18fgcfvlfbxivsja4tgk7d06tya4hx3rk4prexpp9ztc3d75sw0su478sgc4voop600n8bnxxozl',
                flowReceiverParty: '7jd4j9gjt4o0tbuk5pjxzv39rc1jiqef4lmn48qrwwe0qk1sfw83nmurgk9vuhfqbvqfsr7ohybrc7gomrqxqh8z2czt1eacof3z36daods3xpyimxucql1zezmkjz5r09jouhpyiasvmbczxyay1hkl2wcp9ab0',
                flowComponent: '314w5pi0hm2jhxc8s67bjb4jn8ec831mb7cotbh37yh1k2zwoouch89xcb4zissz11hblf7rh1nh5osnix6m0sjgdxkogntvlpmxz7wryc4x1abrh494l6bh17bea5ltuf09o5tstx4p7izhdh3ekzrktgopd6j0',
                flowReceiverComponent: 'etfviqkyjif11tom3zf2yahit6e7rdmtedkbvx4gwbu5kfjsdfhhohbkcpsqgj9i8z8np263ia2lm301xibs9kw5iv1ggvipcab5v5184t0ahoiwoki97hi24fv3eyuwq9n35ws1o4v9w2wt28upaqqceru4fk6y',
                flowInterfaceName: '2yyjwil0t7swd1lww7dgvu09ed38xrwin5tjknfyzln6mczeovq2eey0we9svgvlghzlsia71s3kkjuk1wqx8fixrfh7h342xzx0watll770xfy3qk6y47lcozeavqrsbn1ouw2ot7sap3a60ncjxgrnvqfdw4ti',
                flowInterfaceNamespace: '8ghcogsui368gttzauxd13hx7uajtq0xxeb1by9s5ln4615qd0p4cbnjoexuhbh96syoulbfjwi3a6nzs7frsx502rp6zqo6tcjrewhdsquf3co2yw8qlp6pxrxrr75si515iiiad1zcukwu9ogc671mexysoxd7',
                version: 'xp6572o6o538tohxpteg',
                adapterType: 'nuos00on91pbpd5bws6ykprqabxscaslpkvr7mlazbb02wznmwg3gajzrpqy',
                direction: 'XXXX',
                transportProtocol: '8g5s6mgyjdikk4wi27vy4of8r8o1dbyht0gncijs5jn4oku19idf4mwgnz3n',
                messageProtocol: 'dbbfm92iezq5lht16gg0o465bcta82v85jdu6ydctrhuw5qlpbvxqdli2ph1',
                adapterEngineName: 'gab98wl5cqf0ju3kkmfqgrlsgf7fs8adqqlb62lcepxsucrxr5gnudv3dxuw294agusq7t4u0i8xotfyquwfwnksr7ocu18o4ui5y4k4yl0enzps5jr0n1gj8r8ld786niyvprjrq75v5ayc6nlyy2oukhl9vjce',
                url: 'p57zfl7pf1v9oe4j17u4ybliudh8995n4oz2adg5exw08mi31x0y4naniu6jgv49tlukmkfmy8pyi86nsucs9zq6bq8961bfrwoxiygo395hlylm3d7j8b6gwmo6s8p6qljt97urs65fpkomrwn4aykcufc8i3wobqwweirulmdspe5igxn29hkn2iqf8j1sslqrgowhhs1j73b49hd5vxus5nnxe9dtdz181am19zg2vtqejkdv35htrdzeugxy8670yngimt6c4uepieks4fsls4spqapzm1i91o68kvj5xpgopmt5kkvxpex5liy7',
                username: 'udfurbvf0sx0lr5smqdvhrqb77a1bxvwypk1mk1dngln8lvog7jsui42qv9u',
                remoteHost: '3gyse8129dc0w6z01ph6glfhpe5n0hen8hq7yhi477x8bj7nul99vh66cfnjwhufvxc1fwdq47evu3lc542xj51w1rofhsq086vvn1s6l5pfsgxmn03fzbn7l1uhhgbpt4tqfpplpqmak7guobdg65crcu5ky6jl',
                remotePort: 1302049442,
                directory: 'yiu3onhtcessf4sjdg42omaar9cijq9piafvkpnfd3prsf6i869gehcgu4t31pmbglp3adr7le3d7c4ykvw6n9cb3fbu9qsbd1tgiqw966iw17hf16p513a1hws2bf3vqyvq2lv58dj1bmoo8nw7kndzs3ya9g585wumy85mjs90b6sawf7ru1u40dg8bru3gvg9pcvnkakvupix7qmwyw660h14kzqe5fea1jxiw2gh22wwqgo342dxyh14for4onpisyfn3uakrubik22w6q3hlefw63kbtofnhfkbfuqszfcx74o5go3n62iajfedofwx1d6alswkunlqawztxdulrh1l6tot77eojtgzy94jtje8sj3nzc7v4l40s7oweutgsrzj6n1jvfcc048xh2q2947cqen7odg5dmu5iu2rll8sfa86plhkw1t3ch3z80mboh74rvcfd3pkim84bndly4q28otydivyxc05nyq0r4kt3huebqdobd2xbmn8q2dxfgbvpq55vx8zeoppfsj7fwcce7n6tdc66ry9am0pjmdtt6lc18ds0i6xpmqq9hfd8d7xqwk182pboropzz08xvrej90hkr8flkp62qe9yn1qefkmpw35q0715ej4l50y7i3wcbj14jhhu4ugql2b5x5leyunhilmi3jot2f0krvpve7h5koi5dyhw93kmokuzp6dkm2qe49suzjd4k3j6ngcraltw1vxghw4c8x1v205ncpdrgj55hzagajipub98x58s10lr3glrqskfujpsuw2c9wkl7ronwqpfhv4nr0lx7xp4m79qy8207dbwkepr6tymwhrmpfbwi4f5l0uijn581rdcst7x65at0zc7l3doezopnsqg4gs4k9rv9bg4ix2q2ftckndw3pi0lw8kilcuehubol4qz8ow7e15xsxzc1n5q9jwnkvnsje24np8htuw8k1w6lls8wf4d1avrldz9sskxnyi0du1svuhkwr5qwfo30gg2h5jo5j',
                fileSchema: 'bfn4yh0orfulw0fk8iqfosm2h6a1u4f35s2x4vcyvh95bkbtttk90srv887dnw66r4qbjwutm5bqua91um2ofyzfw874pec73o7rpu1adocvauh156oqjf3v4bg9k25by04myhq2fcujfij2qn7kqky4npm3o262ikkk2d3o1zmw34eblafhjom14de6yj8uznz0030bu8cvgg39bepokhp47i5x5rtarrze94wrwkjday1xdqnxcjk66b8ibjzhfnplnx4tud8haw0lz09a97re5q158bk6qbivnngs2mwf92td4onlt99e295lxsdyd1ypsk0l6fftnyxfjgswrvl9lxcsoj3rceqonbwuo2glokxsrmpyl5xa1nvq7abdu3k88fax6mwo85v0x4r89fb4v4h8viv8wv1mrvnu1ov0slwopt3mz7jblzbmh796imd1djubfxxxl0i7tztpbnboh886t018jhs3og83h2t9ynmamr0wghjelmtjxtrkgjkrqmjc3kdy7jo9ym3ni4qr3arb2427xsolidpoxwhj8viyrgpabuxm81tqhazbgyc7sci42cw9iw1ob46iozlvpk2ykk66jjsg0be7htelnu02boekz7bmvubripdlkxa9lw9gis73mdj6s3g3xb6its9prngibiz2onex21nabdr887d0c8mhkl2b9jcvypr1smgdhoe9aqbynt8fslz19abxnp9ibfoy7w9a5bep9nm98511og4mf2h6vfrqy6u78javty6ufjpzs49hxbjvalidgjahhcaoc1zd51rl4tiohz1n046nbpjrk9yo7dzoeo2hp98sfzmzzh9a7ujq0ix4i7vwuzz4sig67uhpgjtz0hwnxuo84bz642qf3r9x3ojsmpgofbcrlc4z9e5zj4cikm3g8hf41aczmng08rq26u4aow4mbuvhp5i2gacdx006afcu1z9blxptyi0rpmtnramrq53shyaza3kq5gqwdl6xw1g6c62sp6nv',
                proxyHost: '9ton1wy0c7neta781qz0cl0qt09bapfv781sqcuuth0l3n6iiaav3ryqlcao',
                proxyPort: 2047207120,
                destination: '69j5qfmwf3zz9zv0yki1tof7gho8i3ec8rcuo6yyobe0j2cuuqp6awvnjrsmm2hjz7rfxe6mkukma601jzxwbed6bf7l2xcku7gqh3hf3yi7hn0ys72mv768xf9bh3jx844u9i3imhlz9qb4b54w20qm3k3ajriw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5elku01wogecqcw8h7i1p4gu5mdlim091iilxxv22pookbpf1z4youer2s77533emxpn0cc5zq6sewejm9y72bwp099bse5s8nepvlsddounn0yvn0geokdnyhk6ydcsfo6hryaplyvpwh8r9m7oxpuwtzlpmqwn',
                responsibleUserAccountName: 'ev3cv61ua12lzvch369b',
                lastChangeUserAccount: 'oyaobtzhtntgvps0izlw',
                lastChangedAt: '2021-05-23 12:58:48',
                riInterfaceName: '7gvxv1fckky9mkrd87jpva786bkw3x5aly2d5xljcqlm5ouifamg4ei925qouglzok8jb8ipmagv89ilfabgcm2kblwrlj6udpp2mki1pm84oz31vsles398mncdlaki14ftxyqfms4b3iofa83maued6d1u2cz1',
                riInterfaceNamespace: 'jefpteds9evi236955qfcz4i026irl96r27ye7t348cf2m60upt4ep9wkusbohpum8ibdcfwg2chczs85qmf3xlkqh0w1oijc53rhiz5c7vlp6csuco2iavyy5zh8mkb7kixm7e9u9j5lzm5wfbste5m77ye6j7p',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelDirection has to be any of this options: SENDER, RECEIVER');
            });
    });
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelAdapterStatus has to be a enum option of ACTIVE, INACTIVE`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f84166bb-b064-4fae-8fc0-ffe6e47c835f',
                hash: 'u83aes45o2hy31giy8aucw84b0t4gq4vt5bfqie6',
                tenantId: '1ea8bbf6-a471-45fb-ab7e-0d5a69a400aa',
                tenantCode: 'kvfwtw3uzaysni6h7kr7iyzp03s7t0za0esmoplbx5danj9ete',
                systemId: '948d4b7a-d04e-4cd2-b136-2e5c6fb68c2e',
                systemName: '0grcsg2pzdj3vgthodi8',
                party: 'h0isqj71ton5rf7gazafxuq1slccvnh5j03g894n9oo6p76dxb1d46pjo9eqnxrz8dudyh2h66v8phw3b4rzj167f5x6du7if9vz4nu9hhq9m20vyfi0hqnpmlnbym1heta33x1xp8kjwiywk62xbiepo7xmv57d',
                component: 't60i95hmpx4neu34ew3suvkzzq4rogdkpbkvxy4vded8ypqnq234dca370lwsshpeo17eso3q816b5u4cu78dvf4rhpzsl6226t1kl97p4hvd8mxtn611iwxasla0pe1kw49wor4s9ji4antcraidxtl8pjrjnsx',
                name: 'jjvops6cmf0cg04b424zjy3f3r0em180keongayqpxw6i2srwzpfw6xso80zb7nujsorizauvlvt0sxg0inkf46dfm8jrwaeumwwbspdlya3yl8r7bgpll9n9zafd38losgy1rek7dhyi4ss9dkqgljam7xq20cu',
                flowHash: 'ezbja4vi6h2ucm2a9iyym59nzuj3f6xatgr73wve',
                flowParty: '0sr7xizq26fwhcbnxdkdjo7zai0pi0pur9fyfvdq6p376t5foh7ruvtqk3jwxxouafhptrt8dtbl7uv1d6zxty55xn9f2fal77093o9moc9mi3e4diio5nx3gem19s7sa7904y5805wf2cqlqlnibct0pr093u2m',
                flowReceiverParty: 'dittzabshq0xowd95newt36racq3fdd5mf5i78aubjjzuoulzhekyp7wrkbktv98r36r31z8rk1vwn640d8vbr0nll1320fvw8mlks8hicnp20gjb4c9gnqy3f00fklxkd0r8ihtwmpfdhpnu4stgswpj0k4h6rm',
                flowComponent: 'j4gwu1saql1dam2cn1i8fxgk0dxi333aaqmep36gl8doyag81jxdd3cmgqpyd23pa8bnz8znori8tyacmtv19hqzifv3zkngkv5ha49x7xgqq33x8l81dkvhxbldl7mgn2zmufztsnk3svf3whq159gech0yy6uk',
                flowReceiverComponent: '4ydr21cyet3q12ykaxa2orom0nkmr2ytch707vu9gnezk2kc9kvi20m17o0arhzxw0ungdcp3c8nmgcqtelb2xlvkppaslg0g5kzpz9ygiafdpvz7zu4rggaahh9svgqqy89cta0k5ggqnrnzybwvimspzuriaws',
                flowInterfaceName: 'yp0qjq33k7daldjnn9ox0mk1kvrfde64r7qh2rppt3etcmddkmn1vmq7durnqhglq4xxpo9u6zrpteqia9azs9hhy032c85wz8w0wkrgf7ov7iqre2umsqzzgnq5jkjbp8a95rva4dqhbb5zo00lnky95b55404c',
                flowInterfaceNamespace: '2jjd2ja4xgpy45s62hheuz6nj5i1rfrxlhxyml0c51j5ejcrgx9qw6n502lnfwnfygkmoqdsy3pi5a4xib7w47kr9ygy6kfm758a4ia0gir9iu2axt1b10lm6q9crjtb39z1dc5tui8q3c77xepbbzior60mhpye',
                version: '5wz925319zv5tkdauvt3',
                adapterType: 'nj3onl3tdbmjdvnyldr46y9n4mxxolosnw3zamrljc69r2zuct87qs5jhhpf',
                direction: 'SENDER',
                transportProtocol: '41jk1lv6rdmkdmukpd4vf4o8daa94207gzbils54jjgypi77dmcxalok8oov',
                messageProtocol: 'hf61eowpkujgvgomtgqvluhesvv1lph0qr885gs52zs1d5gq05sqfcujagkk',
                adapterEngineName: 'iyo5yloqkmigazfhd8d02gqy16aytmh24c53vhutj7igwg9oongc376bqej0rh47jcjgiw36l1imfwywea6bgy3xqp4db9zwfij3wa1xu1mdaywbr16s3zxgsz7c1gr007c1i4b0shzxspgzrua5036ohvchipa6',
                url: 'pnewd23q8gczvpcugcvmj9k58jhd43x5ya4unikdgm72qvt1r1jsknafx6ldkho8f7dyqgl6b0iaz1nrjtuh0298kyzqdwgop7ao6018ifwib9f0b2dzy3l7slowousqrdgftirm4x1n0pt2mgv5v4ujckxu1rb0aewnfjp3spdueshyn95idax78p9dimwk9y9tzknj3wn3gwewbuftfasvhvix2vymt6dfz02vcm920yp44518661l0yaldc7wq3iky7qtd0769t52oit3bf8nip7vevkkathm277jy5li4xt8ccrwmzuu4tg9uaz6',
                username: 'rjxonaeugxgx47hijfzdgpw9jqahn7wa4q89tyaqlffrlf108h35xmfgrcjk',
                remoteHost: 'whywt6slcrxua9kegjw9p6v2q5usylyx2h0sbl4swua17z1750q79yi6x4gpx8z1yzflxciwcoudcpj3dn81dgawyqt9xapeq5j572w8uz591nu9iewi17e4pz47m15zifgaxd89ktdu06heghox1jap0toalyph',
                remotePort: 5606111544,
                directory: 'kfjigt0wnxor9hbs919acsksdsevlj5c9hf2pfjm9x91dpf9qss50kqkuojt0yf6x2ji17s8xrxck0eoj6f3nm9q8ucf480tg59cmrgy5drpolnsk2sf3c5wea7mmnwn6eimk8gox0v881wisl1lpdkrzxh1hd90g69x1crmkrp5rd3qug5czk4y4mn34t86rqrkd11fwqghpntbfdgx5a3u7jszgi2ra3j18oahmj6l5c70tvoqmelr3r8bkmc20w4appqbm71ydb7nzdi50hrktu1aj7ick0s519nxmrkfhi93km136giixxfxsa0alda7anhdw5ua3vluahb8xpm0wv59ua6nin5y1kksyozvrd02ifw6lpt2an91tu9gizvdj5rd3bt554rg3odn7naecso3m79qyk3cjsc1k1y4zb7cofnzw2mtgdz6uo8d38ok79q85rf3k2wtsp3xky6a8trl6c0h63vvxh9oy7cxy0bz6b1bc1jj5gtm7doeescusbh30gvms4rnbu17vh64jxfd8gb4oegthxwj87w6tcemrlk7lzza86bnp9ufzqym3m1vot7bacfxmmm5iyx5xk9yy9k7b5rbw50k0w0eqdbr7zjy59xhx73ed2qv6ee0i3eeynhjhrwmj2gbh8h4jvxzu24lje7r66msb5cju57u9kbryewghrzxv0njurhc8ixarb6too7wkdc01kaybun41609yvwe6xt1zvtpdlck7e9nkx7mrjh9w37bx0itfr5383di2qo41w1p9s4lcwhfbuj0jtd2xse6l9448l0rku4p4g25bsrzotjd0g68j4l6r8c6sk9nmdebwc29c384e0wtc6n3bkny72febqboasqz0dq7r9oslms0to1ya8wh0extzzyrnx0nafg623cn7a0gdv48p0gn6vspst3ys7x8wd4zb8eqvhb731i461pj11phtiys9kfvd4bqe7orjry2kowno7ucmqr6ln6ujz28zbdzg2opal0l',
                fileSchema: '3b3pf1hcj1r491kn5e6ljaq7ylqawtcww7eixs6nslobtle0p3k6fqoiio5sowl64qhlezi2jocaiop5ct91qhs7r4enric233d38uk2a9y0kiop967qesu70as65jg90xwwhq6f1xlf0pepwzd1uwkohly23jysmr59k6z0kqzfieli45jrbs7z17r9zomyakbg1qd49nqjrf9fsx2xpwit9ckp9ohgifibmhqpql431lfswsg7b69z7ctbdpztpsew9g8wvwppnl97z9ds87u5o5j2cgdy6x976nn0r1ttcbnmg9gpefkf0z79xgy0lu7xwiglaepnyb6qj1bd2s1dnpyhodtsv24r8w6b2ejh9428jabuyes9fezufrehr26md2o2yyohp6wlff6vkl2jpdo0dfvcneqg9i3wr49lbljkhufs14iifacn7el22mlrr9g36lc9c0pppwkik0o36juey6cp3y1uo2kwvfhejd3q8etfnvt75xlaob0gpxoh93t86i12nhop3jmbgx8n48ryc2jm4l6wzvptmks20cazzoryj2w03czb3o90wgw3cgl8l4bhgsmvs3oxbbgs28rjjkkrexft7vqkap32pd7nwoo13qtry8thkykejs3dcwoq6l3ccceeblz3zcezrr057lp8jb0fuya8qxoqtw0yp3yne1i3m1rswqy6g5cpa10da3s0jrni9pl757cn2r48hz54pgzfhu0jhc6tqt8qiahir6bh9s2oapw2if7cunenbpcp1cvnwx1vtbjrw9a7tu472ynzaz2nozemx7on3ag2h5k2w5senlrg5yottnp7nxdu8daxwaxgb0cvo9sgrwt802g3mb7iuzaeqfsvbq9jkj49fbawwov90l0v9m8xpflg3m4w8zkm7ju2421xxqmswt9ybbuhgh69v0x595vzlejxwdlsry7h3v4yjezan6m0ygem55y77cpn1l21xo1h2x00ehvr56o72rwjd550b76i9tz0g9v9',
                proxyHost: 'wpb5nozl2gulac67c6bz47rrqxe6rh1xa65hf0l3lee0mjo5upjbsjcdayoa',
                proxyPort: 7881162030,
                destination: 'wij33lg03yd8wihjfp9miuxqtgrd1um0ffc4b7o9s4p6k1zdi2h4g9xcwig136x3rlfvku47667y2q404rhvjxj5mqrpi6xna06f38p0h6qf54yqrhnfduuscztl4645un8qfqlq07yxtaaiavk43jl9zu23z486',
                adapterStatus: 'XXXX',
                softwareComponentName: 'syrfhu2157g5pbvujo9s7lizppldp472d8mlruwesgjf3p36dtniipg8heerou4ajy6e1ccatl4qyrts83trl60j6sqhp71ph7cg9xsg9hzlpdpm0ekwmgpnbs8fvcqcd7ziewww8ul0ta47fpd286uu6vpjbx6s',
                responsibleUserAccountName: 'e0wwrktm3o854s7e4cre',
                lastChangeUserAccount: 'qyu2vpbx5ktkplupsv4f',
                lastChangedAt: '2021-05-23 13:53:37',
                riInterfaceName: 'pk07960fclu0rjvfqb5xjyt29c6dtiosfz3y2hiot1h1ayn7nsphxuncweliz36gonj9t22hq2wmo5q88ven2iufmi0uq3gucmcezdjgz9fvxy6d42qre97ep8dous97d05umjq7pym6ikeys5gf0stasitoaua6',
                riInterfaceNamespace: 'k1350n7eaeghfswsjwq4jn812joua5hm6mvxq1iuqw2ff3vmlzuv94nkokvbj37z19k5649yxj73f40rhsuf4kxg81x7tr71pystxlgjl2ifg9i2k6a3sq517obidlocfbx36qg6phur73p291jmsurrx2kd84ih',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelAdapterStatus has to be any of this options: ACTIVE, INACTIVE');
            });
    });
    test(`/REST:POST cci/channel - Got 400 Conflict, ChannelLastChangedAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c4206230-597d-42dd-9b69-c89638f47019',
                hash: 'h3skoy3gz0jlvtummopwi2wr9ltrgcx2obzfuyvl',
                tenantId: '87334e41-1322-4ff2-9f63-a488f71eeaed',
                tenantCode: 'zp4a0eh2ne0bkcbpnc09rbhkydoavvpuh7881vrqg491y1fz5j',
                systemId: 'ea348ab1-e0d2-4411-9695-54d5cc35673d',
                systemName: 'rcmf6vp2v0e4mlgblqgt',
                party: 'vsqosv4kc708dyhioa6ql70yu1fvekjiedq19mf85kdsv27mvkmlwljkxuatmo1cf3zr279sfz03ucrd9c710yv0n28cwyog1oa891su8emfbbqj5h46xngp0o5w8zuk1cca9ajqe4x9q4uetrulf2m3ef8ifojx',
                component: 'a8w0ikqq1zr785704nyeyvumzljidr8cews3imyr4m9urji32cfc8kaw557ek5evzwbqqhufm3q1zasvhuv9tqpny7b0rfeofkvz3yu0pqv04r45vhshxls4jj4uuzo5arpi68c15boqdyosh76lj2vb0zd8bsn9',
                name: 'wipjs3za0a9ra0kbqr2o6yn9d3jv09i3wlsufrqkjiurummncir5qrrx0xi6rlr8gqa00oooue9p3s4jqlxj07ovmzlfskfzk0v9wxpfrf0r8hpabpih9yagf3wrl90a9bdtn3brj6m97e03rnndrlzlwybg71hd',
                flowHash: 'pl8i8htgm19ex85qdjsi489fwo51r008u5x5zkcc',
                flowParty: 'oq6mp736psq8bnrhrlhclqwjoljh94onlso8m9cf4837gz4vd3tn7lu6068ieum4rsk8wkc9o4n5pimc75me7vq9lm1v95knxgo5arnv71yam0uybytlyjrna3on7z24e39qv6kki7qk5kmufhodwwduegldw3yz',
                flowReceiverParty: 'x0a9pklaqu801e7upeuftswcmcsr2605r9t707u4ednxm0w8xt8qscwwzroa192g5len5be5c367t78po359pgjd1a94wgr9yp3jbnxpo3lsn6l91x7ybu8pteo0ffrnpyh3c3pz70929gjld00eguyzrmr1whlf',
                flowComponent: 'jinpxwi1g1br0wo20pcfj73tixnkhgp1ahvf1oh76icnotcvqobnmkz04qc1yqebhgfgnu3ia1qeyz23smuccebxnmtzbz0wljpegnuvtb2yaxofdlx73jgp27bidf5p5odovpsaz6s7fv2s3mq70ymmu86e39qt',
                flowReceiverComponent: '9drxgk7bxbkxmfdgpbzs7p3ya6mila66r2b5oxxnrt51t4ketq106r2txgzdh2xqcf2jvxlcxasfxu21zhprxwul24cmh9jiwr16ybtyix0pfuoe4a0dmlywqdzy4lyn6zzh7kjle3phy302kpexxi7k47wl1d8t',
                flowInterfaceName: '61fpi37zzf9v7sqagovwa2314k15duajm0p93vjgb56irga9nx53qadhrzpk9qs2qqcw8y1lqlzyhdtsdutjdoag2hyxvsgv9cbrsjuqqpagylbhvfqeuf04kcbn429lcs8p3yxomqhfozho5lqno6p3ew3jvi8z',
                flowInterfaceNamespace: 'kwhohgryflxw48hzs9fpggtq6ebx1ald6nbpez7ccmashjh2z85f0gojyhv9tik4rqhuko00g66t253v4f776id0bpxdlfbo0w7wq2fywumqzab4n0c1ydnhpyllg0ztd96s3pq437ox05oykq0c2883exi35c0n',
                version: 'b5air9eavj14nz4njz5x',
                adapterType: 'wm01wenaxclrx4usrvf8m919hci6j9ew74m7g0blx49rcix89j41q9kificc',
                direction: 'SENDER',
                transportProtocol: '2itxcduo7htff63hpto8eerg8lk6b0shrcu3l42ya5weyu699a836cjpc93c',
                messageProtocol: 'revlso8a07gdcfynm8elfr56p9j50jx1wb61bzj5bby4wh9q8h3z7umoi08l',
                adapterEngineName: 'swrfjevdjdatnuszmoe2ty7m6k9jkzp6vp0qrywky970t9x5ma9r8fl70vna6mc6x41k98kyabr1lup0gr3h42uaqjw25gwmgue6wlhqssd8qvwkobbyoconpmnkoj0561fodq68ahmdtimcsac8komuh1vfudkk',
                url: 'q3z1phtv1ez8p8gcrkd4g0pi1jwdk5gp7pscfnvwg21ixxmy8grx0y8d4uo4t4dm76w6haedsz4u8dalb5stoj7bwgl1hq1h8iww56bc9wsabm88mtdslpjk80g92migi88lvqa7k9aarfiw3t3ta2r6bzckf0w91cadbv8sa3adb83w8fq52az4xwfimef37fatqyj8rs2boyrm7qy0lb9uhtyj2974rh2pgtz445a5oqd7endiqdesr5uavhmjhqzjvvyuhou27rs0ma8s98m68xhb5h6ojwpxukn64xeclqlkvs7tz97ibcmiozhr',
                username: 'x8ofhormwochi98vks8re2w0w79o207ntjpzaraeig1awe1x3w147rb6eqx4',
                remoteHost: 'rvlajl82guqi5vsn8fq1z3gkzimtwg0s28fsc9b3jv1fmla1v01kxbnuzo0i3s3jfjbicyha4ebqmrrrct9hneu3bcmlho17jyf1k805fk9rgmqvucgs31vf157ykwj7xrqjn3ysbp6o6ab7eabx33h6kjqmmwbx',
                remotePort: 1258521433,
                directory: 'wda3vj3ev1u3u99v1mnopjdkfnsfri6yobwqtddg8ly7lutawlx2iy76irrorz6emsypiabnb3iw6vr2slz1gxhplp82kegu4hn4gv0i12p0k9q9slza7qk6gh742472q599opq4q7rre3kpk8vvoj3f1eq5udemli41bafasjj2d71icrw57xre3pdgat0rxlf7yfbup3t6v4ku4jvqk3i8e20512y8xb4rewt6vp9d5csois5tg2jvh2foo84j5rxuhgzms5faszcu42ctqyc510wgnohe8mqj4znoyl79r9d9kbd11kbn0m68fzta3ewycitb8nwh571drnssltyrgups4jtnf6cwc399zin112v5s9oi1qep70n7l3wrvh3ytfhuu5iijh64jfknmn6kiwpdsdbimh2jcf5t6izi0eijx2gvhlqurg4dq2d2uv9rhk1f8kkw1d7lta50h798i93girv53m02kt5ttu0u2qyohpn33lsy0ldk8rpa036opzwfhsxjhllxs1j6hv0p6s018tc7thh9fmvl9ijlwcz4rqkamv7ioz6ewjunsujjfsqkib05249q9l8bcny9csq8jcwel5xp2ijn06x5d6d2i527cw6n6yl6r41aatilhrc08b4281du6f93kb2tfcodxjyo89anv390m0fode4tjclt1gf1ci1a4sm4ppw9o7r47vuk8h7ro4vlj9re0arglwtkz38ikw22nb4zbfw4w93gd1wb33yqevzjohsp3ryx7h3pt5aut9gljnce97zqlcmpkqak3sqynqfjnpl2eeagkmy11vvkxvp4wimo6hk3eoxlvds0jfto0qlk2hpggeg4p3ogf1umlgmnubnxbkkseysmrx883f53etertiun8dspgf1dylg3cudjfgxlkmamx2aybbs050isnzlhihk6koau9q63jvr07nfjm2jz3croj92wahnrcfega99mn96zw7ear16t080dufz590ph7npj2e97a9ek',
                fileSchema: 's04x49uhme62f6bhli2f39yntsdtzebdsds21ptsz4t91dcv4gr3cnzkrzq36udn2madf0oftdhmilkb970gukn00euy7e64t36hpu6i7y7n1eq9woamtfcs5e65kfjy95958u3rw8vllzogg1j77lf0x2ze0kgno5110tnjsueiw8osglmeigq9t37a5zpp31d50dkqtumjou27mzynltsz3rn2wj5g8xqat9hcyvahkopsj8k0l4dqmkhgzg9kmd4ppc0t1s1zh69bbsdsj8tw7ivy85o8cneh7ur37f5095vzuhyj0sg2w6bi70h4gd9vxuv3w6zxrkqkdu6b6cf952pxfivfua9ohrz3hruqo0f8g2g55ga3qmk1rb387e69fr8afm5bgrebygysfujgxviq9onxex4a6vqvgycy3qz4pv26pq1q8nvowgqve5b4t9ihzlqpjlu5gf9exple8696z4pycpj7fdumgjofa3hru3mscm9s5nyis3715zz99mc6etwjte15u7qxgjk2orgxfmlv8oc9uo7vfud1wvcwv1apt49lpi4hr6wxarhpd8vo925fya06trlrrbcxe2m3qg61w3d74rxqx1ktbevr47891cfexh4bw1n4d075orwg0fv2n28j29z6x9bihmd4iy60zmt0uw23dd9yznf7i2yjhp30ljlmq4dpo3obnyg3te3yhv9lw9hm5ch4wnhht07lmjpdtmxtaxawrq34we5xpqyfh6rpyarv0u5tycmb3v7ilhc3caw9u67sjmgj3144jbknmcib69jpjg28we0d7wxa88zde5yqg9l4elodvj5yy8d5pci32hsr4m66q7k704noi3kall4xz0imj2x9hyzc7d2poargpvd3n8d1lnrt6cq5um1wp2mppvbuflz3p7ti73ozn8dsbtptsxw13jjy4oudlm912t2us934by36kobqu4dla8bpn10qaf8yju0djpy2vqcyzjd9u8mklcfpvyyh8bpf',
                proxyHost: 'iwywstubcfkq5byl38nxck2rfqwbydyq77emdkc6lv186k4ppikllk4egpl9',
                proxyPort: 6761401202,
                destination: '1q2mtpntxqczsrscdeuw0zh6r9pwnvtkqv4crf0k9s2s03uqmahme6ctaf4thya54pfqajkld4aq8li85wre5kakl7mlkns7eonw6jbbalsyxkrvbt8mm50ja48a8w3ox5sw07eost1jymbu1bzm5wcrhwfevcp7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'iq0tnnsjmp6y2wvk6ii9nwpdiietzxth6dc4kyz3ki0eucnrcgw4i2ft6syejw84tremvf89h6agzw1b6icmj8xufyen9u2r210z0ltuch8wsaxz96wse0scdiyjnbvstk7ihbi5l2kme9nu9qbp8nyqi8edrtw5',
                responsibleUserAccountName: 'taa9ch17tahntdq2unhu',
                lastChangeUserAccount: 'saaea8b4uz4joy5xure1',
                lastChangedAt: 'XXXXXXXX',
                riInterfaceName: 'v8mrre5zx3k9clg3q23i83dfuxwy0kzh82e5v2mqytyao6tqt9uhg8qe209vb5ts8vpgqba4cg21ufbfax6oyp54bxhcf1olc5yo9p1zmcuz5mfuwrb11qookxg1xa1tk4mdwco6s7bss2g764ncayeoruanbark',
                riInterfaceNamespace: '21wesq1wh7czh7gqtyrpsxah40mijaxza9ba6o5y2muvbw24igyv780zs9p261est9memamg4n4x3ru1sc1q8byiv6hyuncxk7tyky6xnlru00rpc0yvtp3qpnl7l1oeu6h802dnfwpm1ha35qm3pc80ci1t7y0o',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelLastChangedAt has to be a timestamp value');
            });
    });

    test(`/REST:POST cci/channel - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET cci/channels/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channels/paginate')
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
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET cci/channels`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channels')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET cci/channel - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '572bd04a-ab50-4e2f-bd14-fdfcf249ba02'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST cci/channel`, () =>
    {
        return request(app.getHttpServer())
            .post('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                hash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                party: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                component: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                version: '4iyw9pwsdxcmgcu744j2',
                adapterType: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                direction: 'RECEIVER',
                transportProtocol: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                messageProtocol: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                adapterEngineName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                username: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                remoteHost: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                remotePort: 5763826530,
                directory: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                fileSchema: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                proxyHost: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                proxyPort: 6124837935,
                destination: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                responsibleUserAccountName: '4iyw9pwsdxcmgcu744j2',
                lastChangeUserAccount: '4iyw9pwsdxcmgcu744j2',
                lastChangedAt: '2021-05-23 21:25:30',
                riInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                riInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
            })
            .expect(201);
    });

    test(`/REST:GET cci/channel`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET cci/channel/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel/cf30174b-52d0-44e4-9e3e-dcd7ca2209b3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET cci/channel/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/cci/channel/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT cci/channel - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                hash: '12v8rbexch6iemni95gavle8lc44pkescnln7a3o',
                tenantId: 'be097f1b-71d1-4e1b-8c58-473271bff23a',
                tenantCode: '0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281z',
                systemId: 'bdf096b0-633a-4fa0-b0f9-065c35331eb3',
                systemName: 'v4ajo1l62460waru7gxt',
                party: 'obxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoa',
                component: 'kraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelg',
                name: 'ewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4a',
                flowHash: 'zd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jn',
                flowParty: 'unagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7c',
                flowReceiverParty: 'igf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo',
                flowComponent: '95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vn',
                flowReceiverComponent: 'u51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g',
                flowInterfaceName: '3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4',
                flowInterfaceNamespace: 'a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff',
                version: '9yo7uxtsg8w34a3f7ecw',
                adapterType: 'c6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh',
                direction: 'RECEIVER',
                transportProtocol: '2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1gl',
                messageProtocol: 'b0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9',
                adapterEngineName: 'sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv9',
                url: '88o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j5',
                username: '8ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn',
                remoteHost: '9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0',
                remotePort: 1126381387,
                directory: 'zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742o1sx4qzxwx5cxgh5o7wcw9m2ove6nku7nm5lgfh3eakk1auiq0xkhtklhp71tkkh6adt4aahkksvs7guhp70srcvzkkmlu8ykwen9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe5',
                fileSchema: '9op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213eaoo19xvstcefqfyiyro60vfc347tdhmpkgmuvs0s2rl2rw8h8fvenog3akipxip0rxxhpi79xo4b1v0p7xpb8elonc2bm95z6lnhcqmbxg0amibbxqwgnmp6q8bnx1ozk5a7m4c8gq503b9r5iq53ybl21qjlmh9asgem85h5fqh8oqtjwqq5px3u2mdixhehurhjmb3fva1h8d3s8x3w8s0mtu4oqy8uyysznxmejjnj57ddyg32gvyhj10hwbp851iq0en7l2evkzf3dwnxp36xbzjhqeppba22k5ep4cw2hj1c03vulkw53zloynmuf40k0jzm03ol2gs28fof5brn295ev00pl5fpr16i5bty3qgxalocuiqydbdyimnzdg5w4q9c9z4letkq0aezvf8nozo8eeh4a265kk8j9xnwh192mw9bano05b3r30fxcdkvsx0fnye6lqsyc5s8fzayow7763087dt6i47v798y6vyz0hngo32mk8d42r7u9pisk89m400aucf83bobgi9y59mvzc4pt0rygqjfw2rvbzkgrk7jthli3yy3g7uhg0cjwnmn19te8nij49r8dtgnw0z7xaa1bgv3340l7z44rztqrl95uziyjzt4rtul8p2oyx4dwzcj4vrhw71x1bywjfb36rxna4aq89h89zdt6g2r3f5mvwhalni05jyxtd9y50918chekg87jnntb45wy8y5dhn0wuzzxfcb7eetadoxirl0ulwniy1klatdzdb3emc36fvxpp6mnetdg26dzv3u2sgmaetnd737pxos24ar0x7b9ze15qfnp8k0zpe2rucrutdyf0z2k4xzyj6251lfivuzo19kgdlluuu7xm12bmjx83cndbxa71way162l2pst9uq8l8hbjqgukt7p1vn67yani904xwhqarkwk',
                proxyHost: 'pj264ostad0tyxsweml5j2ec1kjj1tu7s7e3sjhasog9775z0hv5d133pnik',
                proxyPort: 9614977361,
                destination: 'n1iyzy5fhdvk3wfpxduvavsx9yvgxs28u85824fuwujnpty5mtpjiky375g1bfy4caab6qzcpbx27udkf4vajs1iateeknrr41ova3ow7lydznhpz6cyijzsxaesnow3x59e53mhwtnvyc98uime6dtazli2jnlf',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '12pdl0ooxdkmnnos0fx4nefwd3vjem4besqydofd5xqdd789yos16ez640pylnmc890ss8g10hie6o7i4usuaw196jmt9gt4zs5itpkcgtdf66bfuipzjt631cho9jbj5sr9cdczflr5f7orvaol902i1e0aqba3',
                responsibleUserAccountName: 'ujbohphb0q0revh1jkig',
                lastChangeUserAccount: 'ldqw5wjha97gmzy0tyyc',
                lastChangedAt: '2021-05-23 16:15:31',
                riInterfaceName: 'gp339imtubhbktzimvzifkttlw9lrkhudewn1jbovtal5p25rbhtm63cb3d98qvujtwvymve6a3o24f45ahh67q93f9cmcmzlekvapvc56zmr798yifec4025q585wj91c8mizhu0ic8m5ntm2suaifuk5mxcy87',
                riInterfaceNamespace: 'mlboaeb6mcnah4cldkymlbxzxqkbm3eokxyim3q65p2q3p9oeonp59mamaetvgbc9ywua03dqlbv642g9xe0ib3tp2rgthir1dqbiexrb69iqj7dpyipci2mc9tt107arcp8mmk9uvlckfy16o8y2eou640j25q6',
            })
            .expect(404);
    });

    test(`/REST:PUT cci/channel`, () =>
    {
        return request(app.getHttpServer())
            .put('/cci/channel')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                hash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                systemName: '4iyw9pwsdxcmgcu744j2',
                party: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                component: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                version: '4iyw9pwsdxcmgcu744j2',
                adapterType: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                direction: 'SENDER',
                transportProtocol: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                messageProtocol: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                adapterEngineName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                username: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                remoteHost: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                remotePort: 5621216969,
                directory: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                fileSchema: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                proxyHost: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                proxyPort: 4488791305,
                destination: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                responsibleUserAccountName: '4iyw9pwsdxcmgcu744j2',
                lastChangeUserAccount: '4iyw9pwsdxcmgcu744j2',
                lastChangedAt: '2021-05-23 21:25:30',
                riInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                riInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE cci/channel/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/464fc71b-834c-4c0f-a4a9-2ed477cdf724')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE cci/channel/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/channel/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL cciCreateChannel - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL cciPaginateChannels`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateChannels (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateChannels.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.cciPaginateChannels.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciGetChannels`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetChannels (query:$query)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetChannels.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciCreateChannel`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciCreateChannelInput!)
                    {
                        cciCreateChannel (payload:$payload)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        hash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        party: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        component: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        version: '4iyw9pwsdxcmgcu744j2',
                        adapterType: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        direction: 'SENDER',
                        transportProtocol: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        messageProtocol: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        adapterEngineName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                        username: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        remoteHost: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        remotePort: 7915221509,
                        directory: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        fileSchema: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        proxyHost: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        proxyPort: 4870367517,
                        destination: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        responsibleUserAccountName: '4iyw9pwsdxcmgcu744j2',
                        lastChangeUserAccount: '4iyw9pwsdxcmgcu744j2',
                        lastChangedAt: '2021-05-23 21:25:30',
                        riInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        riInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateChannel).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindChannel - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
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
                            id: 'd3c45004-bb59-495a-9e3f-e591c3308520'
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

    test(`/GraphQL cciFindChannel`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindChannel (query:$query)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannel.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciFindChannelById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '63a15550-0e50-4f62-b3fa-710f54b21738'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindChannelById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        cciFindChannelById (id:$id)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindChannelById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciUpdateChannel - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        hash: '12v8rbexch6iemni95gavle8lc44pkescnln7a3o',
                        tenantId: 'be097f1b-71d1-4e1b-8c58-473271bff23a',
                        tenantCode: '0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281z',
                        systemId: 'bdf096b0-633a-4fa0-b0f9-065c35331eb3',
                        systemName: 'v4ajo1l62460waru7gxt',
                        party: 'obxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoa',
                        component: 'kraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelg',
                        name: 'ewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4a',
                        flowHash: 'zd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jn',
                        flowParty: 'unagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7c',
                        flowReceiverParty: 'igf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo',
                        flowComponent: '95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vn',
                        flowReceiverComponent: 'u51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g',
                        flowInterfaceName: '3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4',
                        flowInterfaceNamespace: 'a62c2xt9vorwc2tt66syl1axosw58q00wwrd8ozvxzypxu162l1in0ezu0a5tkjhypw9vs663y0i99c3wazmb1amskef6ymariqg6jlzb769l2m8iayna0o1geuk4gmu70fs4nk2cy9jyew9wwpvu3krq40eidff',
                        version: '9yo7uxtsg8w34a3f7ecw',
                        adapterType: 'c6ghl3mc2xzkjvx0pimqe41vsj5kwkxyddmizjxakl8d8o9bqjfno6kms3hh',
                        direction: 'SENDER',
                        transportProtocol: '2kkzbpkh10hh5e75gknb83zltp33xdpg62gfr9w8z0ageka6qq3l7dfwb1gl',
                        messageProtocol: 'b0aymiddm35tvzvmb4nypouftdf36pc1yhkdb61qc4v4324atf9kcdpvzfx9',
                        adapterEngineName: 'sha52o0l77yipboxy9yd9hahj4agkeicw0mltq9xp4pljnmsizn9i3d9prs596tmdkf5l3igv5jjpko6aba3t6w5fls3pqh3bthusrrnnktmdatzg8aj8twor8sd59z9jluhzdntq2dwpfe69m3t43mgjqiqozv9',
                        url: '88o5uvrvzar1sn5k5inohd66avgziqwkfrh5yokp5zfcokdax2wvhrolweqcbr4523r7pxmgq1lpka4smtlwwoy2z1yp7i4ky5d7hwje8mjrpcsxyqxcafwoiphu9onf67bj10ih0r2czpwg5xku796d23v2fei7jhepble3wu4exl1x0zul5p0qv2ahsrg3i6x7r6oxhxu0ox436wmc6e90hg1qzprjqegqzvxybflf53k64rl60ixc3yoyaq4b5dsnppzhh0xbxsyi61qmqd8xwa7ma0do4vxf1z4oqahtt2gnbyg2gqc383b9j7j5',
                        username: '8ilxh0o635ynbj3p1314z4ruc5zxlgdcoh4hsr8rzap39slxzj92i3nx18hn',
                        remoteHost: '9hbt8tv3vuko4uxvvr8x2yp6qei7j14xbrti9oc9y8vofpxqlihxol63jjd28cnmb26u3cr1n1wau1fehl2jqe2kq7kddrcscxpi1v8fkk0y7wdzv44cgydt008h03qs6v1s3v441yuxarbxog66bxf6rzih1co0',
                        remotePort: 4379508015,
                        directory: 'zrwmjkki9n0xafrh2tts2ar26nvhfkoolce3bf4nexrel1vcoekekzvv1jjhs9u4hfsdddm8a39ppv7xyaqfei961o369koum4imkc1rwsnb9udmb00415h2uwz7a70e309ux0etr9w04q0qhgr1q7xyavsxfmvtbul7chommvhfzwfi9lvwdsaqvbzknq6maqnsq25wy0mfgd0f2k115ic61q8pv27rolnkrburd6bu4lqfhbti9hdp863ipefk7u4y3r9eq1g5v533zqn2d3nckwn48lxkgpbbhemaoidurn08vcel26a4aarh150mtkezyia1iv9wz3jaxq3p8k3gk777c3pip5oa2t18jfxy91m5yjzzub21i7rudhhrx9h6mdk15q3b1xl8o6isub1nvd2sjanjdxnzy6w5xf0mslm3oo200c2burdu2hzb86dv8bz89y203r4lz15ox4syb1otjzbxr9rl5ys1tbh1sm9qjea15x7pg5p7hciz7rlqb8vxznizh7s4opar59gc6lpgvr297siy3265w1v2vtn6kwoe948o67j371bj5umen4uem0vfq56fqgfuedaosd98bn5sgja46113tk4uunvynd3frv6jzguefgic7mf1litwap9qwrwqkhf6brghmg60gp852jo45q9rtqs91wrs9hices2f07iqddtgfm4d1n1x8rxot6mq4z51hblu578t7n0ufrm2480vd51tl3vld5avxhioook57742o1sx4qzxwx5cxgh5o7wcw9m2ove6nku7nm5lgfh3eakk1auiq0xkhtklhp71tkkh6adt4aahkksvs7guhp70srcvzkkmlu8ykwen9458cyet0f5mddj2aukgrx8hyqhqd6qlprxssxoowdr7mqpb8uqmrnfh8us571ankn4ia4nw80fzvzrtg8auyirunqjrpm241k2gozmljs9ngt8aw4owofccs4nqyyx5hoj1bx9puuwxqlb2dr41buy2whe5',
                        fileSchema: '9op1lzvhmsuvw2qefw8hvrad1pqrngmyos6r678dbgjooxjv7k37xxwapq77ouufx9rhbvlmw3qs1213eaoo19xvstcefqfyiyro60vfc347tdhmpkgmuvs0s2rl2rw8h8fvenog3akipxip0rxxhpi79xo4b1v0p7xpb8elonc2bm95z6lnhcqmbxg0amibbxqwgnmp6q8bnx1ozk5a7m4c8gq503b9r5iq53ybl21qjlmh9asgem85h5fqh8oqtjwqq5px3u2mdixhehurhjmb3fva1h8d3s8x3w8s0mtu4oqy8uyysznxmejjnj57ddyg32gvyhj10hwbp851iq0en7l2evkzf3dwnxp36xbzjhqeppba22k5ep4cw2hj1c03vulkw53zloynmuf40k0jzm03ol2gs28fof5brn295ev00pl5fpr16i5bty3qgxalocuiqydbdyimnzdg5w4q9c9z4letkq0aezvf8nozo8eeh4a265kk8j9xnwh192mw9bano05b3r30fxcdkvsx0fnye6lqsyc5s8fzayow7763087dt6i47v798y6vyz0hngo32mk8d42r7u9pisk89m400aucf83bobgi9y59mvzc4pt0rygqjfw2rvbzkgrk7jthli3yy3g7uhg0cjwnmn19te8nij49r8dtgnw0z7xaa1bgv3340l7z44rztqrl95uziyjzt4rtul8p2oyx4dwzcj4vrhw71x1bywjfb36rxna4aq89h89zdt6g2r3f5mvwhalni05jyxtd9y50918chekg87jnntb45wy8y5dhn0wuzzxfcb7eetadoxirl0ulwniy1klatdzdb3emc36fvxpp6mnetdg26dzv3u2sgmaetnd737pxos24ar0x7b9ze15qfnp8k0zpe2rucrutdyf0z2k4xzyj6251lfivuzo19kgdlluuu7xm12bmjx83cndbxa71way162l2pst9uq8l8hbjqgukt7p1vn67yani904xwhqarkwk',
                        proxyHost: 'pj264ostad0tyxsweml5j2ec1kjj1tu7s7e3sjhasog9775z0hv5d133pnik',
                        proxyPort: 3552862045,
                        destination: 'n1iyzy5fhdvk3wfpxduvavsx9yvgxs28u85824fuwujnpty5mtpjiky375g1bfy4caab6qzcpbx27udkf4vajs1iateeknrr41ova3ow7lydznhpz6cyijzsxaesnow3x59e53mhwtnvyc98uime6dtazli2jnlf',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '12pdl0ooxdkmnnos0fx4nefwd3vjem4besqydofd5xqdd789yos16ez640pylnmc890ss8g10hie6o7i4usuaw196jmt9gt4zs5itpkcgtdf66bfuipzjt631cho9jbj5sr9cdczflr5f7orvaol902i1e0aqba3',
                        responsibleUserAccountName: 'ujbohphb0q0revh1jkig',
                        lastChangeUserAccount: 'ldqw5wjha97gmzy0tyyc',
                        lastChangedAt: '2021-05-23 16:15:31',
                        riInterfaceName: 'gp339imtubhbktzimvzifkttlw9lrkhudewn1jbovtal5p25rbhtm63cb3d98qvujtwvymve6a3o24f45ahh67q93f9cmcmzlekvapvc56zmr798yifec4025q585wj91c8mizhu0ic8m5ntm2suaifuk5mxcy87',
                        riInterfaceNamespace: 'mlboaeb6mcnah4cldkymlbxzxqkbm3eokxyim3q65p2q3p9oeonp59mamaetvgbc9ywua03dqlbv642g9xe0ib3tp2rgthir1dqbiexrb69iqj7dpyipci2mc9tt107arcp8mmk9uvlckfy16o8y2eou640j25q6',
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

    test(`/GraphQL cciUpdateChannel`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:CciUpdateChannelInput!)
                    {
                        cciUpdateChannel (payload:$payload)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        hash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        tenantId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        tenantCode: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka',
                        systemId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        systemName: '4iyw9pwsdxcmgcu744j2',
                        party: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        component: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowHash: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14u',
                        flowParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverParty: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowReceiverComponent: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        flowInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        version: '4iyw9pwsdxcmgcu744j2',
                        adapterType: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        direction: 'SENDER',
                        transportProtocol: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        messageProtocol: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        adapterEngineName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        url: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tg',
                        username: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        remoteHost: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        remotePort: 7812018833,
                        directory: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        fileSchema: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        proxyHost: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        proxyPort: 3430637690,
                        destination: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        responsibleUserAccountName: '4iyw9pwsdxcmgcu744j2',
                        lastChangeUserAccount: '4iyw9pwsdxcmgcu744j2',
                        lastChangedAt: '2021-05-23 21:25:30',
                        riInterfaceName: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                        riInterfaceNamespace: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmme',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateChannel.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL cciDeleteChannelById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1c5f1bcd-31a9-4b85-b429-00abfb2baac0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteChannelById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteChannelById (id:$id)
                        {
                            id
                            hash
                            tenantCode
                            systemName
                            party
                            component
                            name
                            flowHash
                            flowParty
                            flowReceiverParty
                            flowComponent
                            flowReceiverComponent
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
                            riInterfaceName
                            riInterfaceNamespace
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteChannelById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});