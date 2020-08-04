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
                hash: '1s220ztbiu9a0iue8qgosgqgn7q14kha43d6f8g5',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'ydo17h96hi47k1k3c0mi5nya8hlb9be21dvxzaavq1clrm8n3x',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '21xkilqda1ttu7mc2yzb',
                party: 'qv2v5z9c15bhvk0rzpb1plcq5b8p14eoj9u7kc0gc69b1qgz5v0yudecypsoz9zrvs5fpfr571vwkfbkvbcu6wakxasvolsxkud47182hgsp3pcey9pt4u7jw6vczeaovwnh4rf5jjfcn258hdt2znazjf63ci3h',
                component: 'w3wv3f021ex2a2cnrg6jy1fbidgpngsmdsabyco8kapxahvmulmf0tfgrbuvf2hza2uw92px68smzjpu4bctpfvc7ut8jn3l66upvge48clh09l3wp3mgv0eb85tybrenpbqyjv3ygzdhhucjenw8m69um96lm45',
                name: 't3ckjbienncvj1gc3x70b8tzi8lc35ikywtgt0zwek37e6mh8qiddczyn39vafdn8w99aox9nt3ry0ub5o7dm0uptcsr2fc2gnfjmzoe9ds4kxuf17rlg1vjl3jm8hzm84amqaot7zdxzw3aa7m6hlse90lszqak',
                flowHash: '1sce87ol0pcyyng2r6pzhm802p4kkf4355dp5pdq',
                flowParty: 'wq66uhdg5kmv46z06uzcjn4qm5dz36iz6hi8skq477h3tqr6p4lj1lcn0euqmoagwiwz8ooa2yph9tbqp6crehr4krzad5lda1n0dg1rdihwz3dgvgt3auzh3qs65b4oonr6prpysv5wp7euqoaxuujybxv1wdvk',
                flowComponent: '37z2r8ev985lw6a3xhqtbo53rz4bx7uylcurm92f9uafcctckdx1l2rez2oboskac217fk74v4gyc6sve2zb534gp7mif84nxbylqdnk61ec6l619f6n27te1qam2dx1bu1e6dl0hpd9f106sm2p8nqc1oapsc96',
                flowInterfaceName: 'hvtpgpe51hlm2mwpkoiynx72ru72u9xozwbrrmnu3r9ns5q0dl6m8o9ab46nxvpn4k4tl6ramfcwhri7olg1maekhb9bcine1vv18048hap4wd6bbglhhso5hgvd3omayhd9odve9ss20a7yjfwzq98v21vbm9uw',
                flowInterfaceNamespace: '9cc9gi502nncn2d96p7zi7qygbatrg10yed0fbkpyz2ojhopj78ld42t3nj3z9ypa1pvuxwr3ow0n070m53moei2wt63m8832v0t55495uxvah1ldzp0d00nkx3ezued64fhhjkx2rnwapvavvnvumgmhhvkmduf',
                version: 'llqjg3o7fiabcqafrt6y',
                adapterType: '5rwv9uxxdws00k99c0s7h7loe5r1uyzf816g9j0p4exb0wldubpekl730w5b',
                direction: 'RECEIVER',
                transportProtocol: '229f5c264yvg7c58kdjwncmvta0ridlaq02skojyatjqeb82iv974hrdhltz',
                messageProtocol: 'm3ebzn69dxbaj7gdir44v5dacawn2mtxq4dd9jwzxf5c65sac1v5f5cchdqf',
                adapterEngineName: 'vy2rasln0aul9t6j1z7e5xb0ewqiilcsy1khaumvojyqbk7z9gb4v7lf3xd6br2isourgisk2loz7me0hwpg32u2oxm8mqhs8z6fx4bpfxv6kpxahfyev4d38llh3nzl5ewaj5zulmsjpfm84w5y6jnksq6ld56l',
                url: 'b0x7gn7hjp5g7p8xwoozudynfg39e1dk93lkdmh3cykdm7tvr6dqc2y66uf9ar3smlchky7d94zhymx03vc2re156zr3m74is1w68zcjac6s4k103dq3n3yh4wy5y2fy91zzxukbz16pkz7l41l2qp217khsnnpmxw3g5u7i1vollvoqmaihm4gby5xsuy61semkg8p78dtqi1ymu65oadjmj5mn3s140xl8pdeyo2wfl1qjkwmskpf4xm3qt0tyrbbr8ew3p2pfgph97f4ljc7ih1cww02gh9cy1yk8o4b34uwk553dse1o1dkft333',
                username: '313z43dfsubauru7n644hovu7q1me3g80z521vhez0390s3653esvkie8xaw',
                remoteHost: 'wo1yk7niu7hn5c4x4odnz04kqg73nuwvvba8fc6lb0c6s8kvrz5floqx18hx7r6k8i020vo6u6lq5elusf40c7938wr0i6dckctuiceezsfhic497dbhynfsk5qa5o6xrx5401jf5o55uq4mpqoc58mwsd8q4jyk',
                remotePort: 1491809625,
                directory: 'e62yajoz1i3s7ao7lpqa801lhhv7ntx3fqf2x14zl39h2eajsr1cktjik10wgfo1s4qhlexse4yzc03pagqougbs9m5vjq4kvi45u4n8bb4pzhbd19n3vm9ov5nj94hwwdack52lai4j6w4nbiy1qbjt44yg8ulzrsko1ghftytoi0fl4wm203uace5ejj590xh4rdziw00z6ti0ano9wmmamnus995lmnvjkqya16nsvudilzdwiqzzo0yx3ypsz39we6m939jmmt6w12mxl5agrpe6gc78f9m7dio834iqatyfk2dfdr0sqyum4dml8dvxlf9dn72kf2pblzbgsvq0s9uacy2c48tfdt4xmmfa2ex28gn7tkt1p16l2g9v6acuykutiyqi5b88kutwf90cm0o5i9t6exivj3fi3nwd9vtfg66ukf37onwypg5z2ifigq0rjfj7mv70mpp2c1ttks5y708ipm6bjztf3xttwrccev5bylc7zuxi3dhtuf6rxjou3jkbdkr4al7p0op1t5h5cf9ahomnm2cjefat5ndab8e0invtg17m1atzuopq2j76xa8w5coaqd9t16v2224r1qwut5d9g06ve5dtft424ezfrt8vo9sfavv0b0k4lmi62dyl98f0yjcwpgwa55rwtnlwonfa7xth3dkhhge6os0cpymi7a6x7inea26zpcn5ja2ab4z65q6lqmdxx8uicv6nj18gmli850ki62t7ykajbrlomc6jvs9qihkhb9j6jbw9ir7m004nl4czyqdb7paorewnwl31yd90e7ad4hme8fil2lofnrfn4xdpevwbv56t2ijr7oswkgkwhvbvmsm5q74w5nl4og55bs1sot2f0wae2fy7k4c7nk954xq8ysdanghtr4rqd12oias4wez4chmhnt4geuqmu1u74lcsc4ksma6eoel3fgxumsoufm3q163gqkioigy9r2cppvaf7yl9w72ykw6qcmwzenbdihuh09ea1vyf',
                fileSchema: 'zmpkzd0t39ivjnmwqq3afc7d9l7g5bqtibqg0r83js26cc2summ41c665pq44aluzppqxub7evl4h7nor4kxi8bck2a3op678va6gvohm91nsc0ef9s7n02jwpo2ja772hlwjwpn7se24yx19jmte9xug4fehnlsucecbdiwwfm363p53xc081n39aolz3vqklsrw7ozytwd7sqaoad3h6115i5l0qx9rkb54koy5g4zpi26jl47ss1fl4lqfu94dcwfruuvtqqjswwpsl1lc1skobdpuncq8mwr6zvxpdveyolpnwtboc1o6iksj0kbo3ij5vjw0zx83noyydxyoh25fgqx4hx3ywkvgtynqni0ad6srrqndpxrgj9cfdym3k7foc167s0m8ak8656rwl6qnbi3dwhussrrmqelfh9s15gvf4puppeolu5agr7cvadmj9kzi4v5a92s212qv2r9pyp4rlqdhvn4ogap60iqakfob2giqr4qfu3ylomr5ulpf693di8ewcm2j22rxkmwywfdpmofnklx5hnfdi02uxidk7farsi9mrgs8qkpd6aw1yh70v9c4eiju13qbp0r1d2bwur85d8ua9kyexzatos5vdg0fdaj5iqp8p9ucenf7roye96dvamoz5100ffmp7orrtpj7hfxt52oyunqf1xscq9hf8i3pjjoutsnz8x0mhpuggb8vkhy0ntca3rq9qbe4jzs5e9qic0w7keut4c7vke0260ftkl22o45zpin3xuhsbh7r9s6ciuvwrf267x5a3z0capp0ojus8e994h3fdftsfj5y9rwfoa78h9kema1qg970v9m9qc5hcr5no6olvsj6hy97fltwze6ce1hme4ya6eb2500bgb852kyg59prwi9vba6cds8hvuv8v9x4e9l0p3rxqpnvb5lp8eyp91hmjutvraw25ty9dtkh51vizww9byiga21gjfj2z9c3g4le72vi77ka9wdb49r8840rxw6e2knud8i',
                proxyHost: '9gwobvphavsoe5eu5ubp7vy7g1a069fyyjxfkkeyrskoltm09i30i9ao45k7',
                proxyPort: 9407072499,
                destination: '4pf8cxliy2weai6h68o4tmbpr96z7q3tukm95k74d6e1by412cbpsi19w8vhyehbipbfb6hlhoiu2yyf5rwtte8lkmae1kcdco3jz45onlsffcwylaml0ornyq8i8i7hwpxxjhjah24odin54qjavb3w7u6ay54q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'k8mmp6bkgln1dzfbsokiaipqzqejqwzbwbjmf7jvd2oto5svt8st9stau0tegfaaon4ixtdad01ercw0t2jkrs898o0ovb0ie11pvf5i1abu2hg33bvndsc86apckt3fntamzty7a85kx9ivb5onj1s6nek9aera',
                responsibleUserAccountName: 'sr2gnpl8z4932gulh4nq',
                lastChangeUserAccount: 'u914nlxijogqo70r4l01',
                lastChangedAt: '2020-08-03 23:10:16',
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
                
                hash: '58eokzfl9y14mqxhds0k5ucbuaz414p7kzn1pxo9',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 's2dr8n5sk8lssq28vmvbkl373dicw8rtilj320mnr3fl5fdfzq',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '8675e98d90t6gf37mi8i',
                party: 'xbp5xx03bf7smg87pwft2rcdih089ig2qfacvxjodlr40obzl7s3sivq7rwkygj9rhj12t93ijh525pye2jg6j9nsx28ra8gj0qyahqrdzi5d2wryjdxrbx8f87d1jh9v50sqe192ptzhvdc6e4n8rabn8mf1n14',
                component: 'vizcf30lkjtg4pxjqlnw1jbxorjql9a77oedq1zb6urebazcg5myg4fvetd7hdn7el07vmis37vkiiggktnfzssqsjizfif233tv8ad8004ed3uqb1sw00er7u0u3fl2zxd6avroe32o94ypiqjp1j2xq6pn84ms',
                name: 'iuavtpfm5dxcmkxs2sav2w9xof3wnsqcamsdx66rp108dsosd90gjk16m4lkskqj1jkc1l6ip8boslp2vjfa5umkj93szj50tzwebwu7rxv8zjdjnn161m4jxtg656tu7hc2avfwsxy919xkiygtpr2db02t2krs',
                flowHash: '5a05e5h8c41jewcglrhq4949kcrx8xqrysfi0vcp',
                flowParty: 'b263drzsu1fajw5u0td817zqnktb73cmepr95bkkvur59lzn6dgibw4fs84o3hrdae6tkwqj0u4y6aox0kqw5agvgv35wo88o4b30qjtzdsuvutx3rvu1hp3a6ma8jssj8yq7n9fccd8f70w55ms6o3ltpugcjz1',
                flowComponent: '6z0hnlnw3g8mwdk45pq51s5k449r5jnw5gbmi9quszdrnipgzwp1898af4g1m88fa5f2bbt0w6fj4pyy54zotfda9vhl2am9paacczbo3pzl4l7zewscq74hprt5g0ykruxmmwqvxwa44vbohyiezse8jejvslfj',
                flowInterfaceName: 'vo821dbcj3r05fowh1a14almvnshc3dtnrc5alp5fdn4coz1eev8og5hvucevzh8dqqjhwwq2wjhwpmwse9mgd6nirq59clkm7e9m8j0rrbx3uzzgdcepejorwo5hcad0ryh69x4v0txz6w7yegi2teyji9010d8',
                flowInterfaceNamespace: 'fpoh9fb6llth7qcs1o79hewnte1v6vpltbxgmirrkg0cvotv2zcthvb02xu39ucs7ygzhep4dvgqciw5dqjaey4egaru6k88il9jmb4rvoogt7f6w2krbpt2zb2mxdzq5iysxbjedw6pbjtha3bapk9opm28lgpr',
                version: 'vwl0v186cyha1wk6ehxn',
                adapterType: 'tod7egqrxoje9sqijczn7alb0dm524vl3xt3ba30fds46lh74emv5ppoktje',
                direction: 'SENDER',
                transportProtocol: '0hg2kxyb94hkl25jq3bpoj4v1o8d4eht08kmlacl5ceyl0n99ye7mrfpderl',
                messageProtocol: '8j58tlf7rty33i5qydirombuhdwocj1j364vcieof2yaq4cjyvaqdertx0ro',
                adapterEngineName: 'aql6h7llq4kadgrk313rm9tn195hgqdozzjlk568nv2xylamg8rdqul5whar51s7ec76f5n3u3chk35rp5bgmr5uuhdbpecf1c85az9sovdl01r200gs5jsbanpttv6z9y1mtj0l54l1hjx7mwarzpequncyshad',
                url: 'nhbwb0gc47dexo8xgbv665gb98mtssfcz03lzc9ckwpfjw2w9bv0wwk1sea5tegg6935o0hwcur8j9s1pu8gkkq9q87d65vqy5jd0p4s7v1n4q0emmb8mtwy73cjpw9qw3fr7nw6ntzkekngjqg4312dja6esmc3puvikgxdr329vamu944cl61n9k0zwjb4vhg9bx0r7uwyyvsdozpp5bx60xnan7j2e89me3tszicxjk4i2vvyoltji9q72xfhowjwjv3phj5lrgma0u0oqvvah3ar0a4v1x9mxincfxteu4k1bsxcosfvtv4depen',
                username: '2s1mxrbue6pte5uhe6kdnyga8ufwbxfosgy2lo8coke6hop5gk6ksqi9wdn5',
                remoteHost: 'og2f9qhke1z6aoxvrscfp0bp6oqsbp1okkarc27el07d37w6tjwnaa87wvngshlruya8zo94yrmz2qz7sgh83q523qemof3qhb5n3lpi8xwxfzxausolchm7uc8pdzvxcxy4om6rj0cvz8n9732en68mg9327uk7',
                remotePort: 3940057746,
                directory: 'ged0j1g2ziquqcjbqim27zgtouyvoxocpsolwhm5tiea00e77ise8w6v3psjfb3cyg1j9ojsa5a3y5n294dw8v3k4i4g7b14vvcvn632y115snzuyplzbkrckwh6f02qqsx238igfk5mp85ltco5063k5bv23i1kbgklh6gf9fvemg0m48xyaldx54qqor2ik89d91wgfa3w0lmfbpuckha735j23tyewy06loezc2r5xdsiate4hzjs1m8z9uh6160pcwxs6i7hlp9953hfa16fnggbvd1bkkcaat71imaz3pyi9186pluybke4cednkcm15e1cyduepwgv24me7mscxudu7z86glbrlqzhe9f9c7af32ads92qta1nr8u648ra374eqd73uf1f4yod0upso5k1b7vw4l9ki8ncot7t2r6vh749b986s786iej15zm7o8cxfmlhblr0d8wjmmgli09rnmpjkv4nay9wtetjde89pbjt3b51low976ppxfw37si5v33io2c3zvkeowdhqq6q7alf561r6fmtduwf5p5ayew4ooxuvi36j1bwou7gs7fefzdx4r1jzc7m7vah8t3lkuik4ojovmn37jtesto75b4wwz79787uuetde1a8z0m5xhmr3tbyrmm7kgt02872g1wuhdes9ksnlm9v4w4ma2mzd68dswljz0r33z1bekf4q8brggddfnj39ssk2xllojrw1r5etf889pxmoov31ikk6kmmky6ocry6br6vny1h2wjurd1ajhd9v6vkyloy14mkhvwb3yyvdkwha9mqkfd9a413ey7fswtcaxm6plvbp09w631zy0y8wz35flvi9qqv1r3quzkhls5ff2jbk6rz7kglv5ervlu8rmfkhn310btrr3swf0eid8vbicpvk5l7e2cww6wahpynt90i3zyczodbexksdbx4eeo8vpv1pq5f576tcvhfoxd72qz8zjlpnyg05d9ph8bs4goajdslb40anipwfug2',
                fileSchema: 'qczo71iexr4mz3qy1yodckvc3zekda1cqp0tcjt6zrd02r8qviw6tycqkd4rbcmzdhbdy28gg0ync9maz6wyok0gr2rzy3q658patclkg10t8d9u4xke0aq78uuay7w45fvihvpg830tg85b7twa9osd14fmaoarofcr3ll2j0eqojf87xike53pxwt3ku4na2edpq0k5ujgou8v2mosvjse16pohmaexhbn0hg2g3ykadgk2wx9p24ojf3p5obkmpgye33itc70cazrclspbhizxqg6vela97ctu80nmkfo135bh36zj4txj459zh5eppq1otazh0a1lltos14uv26ay0gb3l8fxxtal2jehj14e2bj2xsor81hul9pgi1zh3xwzxziqdjxy2dnvwcro17jvt1a78ny3lk52qrfkpvhbur2jh8pdv7haphks11bw2tnf068wutvx2hkyzg1rv5dm2m3svjqffzfui9qb38u3qzuwpyvjiifyemdombifvxv4scecjy7oy5penh8r8rywwcn3sbqirko2xyu6ik0rjbsekerqobkmym2uom3ki0d0rs2kaj93xodbcf9pxtk7m75ma9256pfblqqbdfk08v97zyl7xslz49kl14njp4ttxbvf49y2724da2s5t6f0qvwvcdjm69mqa9nlab3n4nyl5pi7up66quh9qz8z4eqxncuv8gq717fqnr3ad2oyqdyaculnfuv76mys7qf869oml980ld5z7xbqk5f48yr5eupyoyyq8hjy5wd52dmtea4xg1f3r1xuaol5d8lyzpivs3h1kgu6ulv91a5lau4oxbwxvp2pd59ozqkwiu5e0detsla44ganqzbe1c2t2lqcfv8ufoqz7fgdm5qnbqhhi38k5m3g9ko0qinpcxn00xq7yv0izmwnzoeu3b8vye6dxvg4iwrrvfstlu25gnfcyfwj2n7tq9lgii13mp7o6bskznl0dr3e7lt31mmcnrazoczphu3b1br7upt',
                proxyHost: 'q1hvypbhvpl2mdb1px6b2fl4tri83td1at51difwcn3bo6gk6m4qa2e554a3',
                proxyPort: 8587500012,
                destination: 'fxnnhnt1at4i8pu0ldfc59nt03ikm9w5yof5e01qb9p9iz615gys4mzj8g9jr759ltms760zccrhuvthwb82jh65t05vlnwkb4k8ujkm9q0hkepoi61wlmasvffrxegstdgxa9fpktyar8v29khsr8bnz6k4fsf1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '19zhvyps7dp01beqjb8e1qhut9dl5n9vwjrvcrq399ahiz0y6c4dgc5u1tc67d9zx31d5hvel40myfow7ce9ijncs5xz94e1ubvmib6b3in5ncgl62inv9fz77y4q7roklnbu48c4427j31efow7ffxor02iluep',
                responsibleUserAccountName: 'n2luc5bm876j6hsup6w2',
                lastChangeUserAccount: 'oj6zivql697ex239b30b',
                lastChangedAt: '2020-08-03 21:36:00',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: null,
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'k94dmylb5ceidt9ewzz2bzh9gfgpn9m4h4yq7cagsm4ktqxz69',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'ppvxs9s9imrd5bphzffi',
                party: 'yc24a9l0c0fj5vip0xrn53mxh9txfa6rq3pgpj15wfqt5omh9f7qyw2lnh974faaiv6xum57y3ikld2xw8kq0tbafydya37myz5d2mzid26q17aisu590a2x2nj0zcpxoen0ux0wam152dgm0wvivb4z4hde9vfb',
                component: 'by2u8uphx59d7ebt06sgpdlzghew88jj94kguy503f720ualmqeil0n0tc8oeoh338ojd15zr39vzqjwlmx3uy93n8mzgb98j0jsggf9lb5ilexay3oz2uvbpeexgo1x7sqecxrw2d9voe121h2cxqy720v3arla',
                name: 'nt09ikl7s2yylsqe1tzai6luy3i0c7bel4o9hxw067bonzlhg3klls2a8zw12t6huz2v60k51yi4psbk4ecb08nz4q81igw3qwb4o38ch4ydidczeowz352j84wp0r944uj3e4nrekhtf7eltni55gl990zvpxre',
                flowHash: 'gr5m0fqipmmeude0vy5mvvhc182ozunde0pqikf2',
                flowParty: 'jpwvkgw8onitlzts9r42a3vza9c69mfet93sjx21p1hd3vcc6b5g1b024bnvhtom6s1jblr5od91tlwrx2xwbbnrp8pg7b2be3mlwsvqooottjlkrpvpa76mm1nqwnd8xog4fc57lomzxuwzi4r73ky7d92r3gmp',
                flowComponent: 'bdpi2gw7u4pux6w0sp6afu6rmcnyx4ihchvyb29u23xq3ici1t3itagjmpjrl8wl7swqb8to20tsfc67b3qseterdif52zlliq1s4ajqooss7kz1h58tpkjohq2rysfb67i2w6jt9b31urh1i5lssjcwu9du882x',
                flowInterfaceName: '0wrj5wtxb78l97r088eajn8eayc2oopjsh8m6gsvgub0gv81iq82nznncdlfo7g9zk584cxaa2de2fctyn605nigsuvv4jry2g739d9wkcwn8qi3od2fg1koa2xuurg55icx74arv6zz0ni65qj2iva8hi6jbery',
                flowInterfaceNamespace: 'av4rxfbext5n9d9csxbtt7zj9zdby5is7li7k01eix9vw93fq3jn8m3xoa97ls1595woehv28eh99rrzz6lf2zn02d2y2wxhtubcmc2j1pm6kzsa8pljzq19u0ac9hnqxed4j75sgelrdv7x8y5xtmb19rbnh695',
                version: '4d9deihqn7j8dg3igypv',
                adapterType: 'awoew1c7wlxqhxesy40xopa4zcft9x58fag5doohjmdtczbt8q9dramp7puz',
                direction: 'SENDER',
                transportProtocol: 'z0tl2vg7571a3n0m8fx0rfg4it7md6jyp9od0cx3qk060mxroby16meyty3q',
                messageProtocol: 'uxi2xgoq04d214fo4rllze2da4utz0e2e8hgr07xhc5s8ph427smbq43o33s',
                adapterEngineName: 'qvem37gx15j4unqre4x97lu7eqhxbdahtu0vnqenpgota8f596fq9xi2691rutblirjs60s62gcvawsn08loyhggtdv1b23lw5rw59f15k24uo05os8in7x3dzy2e52d1q9eg3o4oihyjs9sv5v7g0h311xdd8xe',
                url: 'jj4goppab8vk9b6w26v894xgjegw0rvojg0nsfk0fkptcejajnjir3ygiiiq0kupi648z7ly978t62pox36czsbhv1ren2cr44nnip6huenjkkqoh4ba96qdygrg2txxog3aj28rnmtxhulsoyq05oj2zotlipjbn7uemy7kvk6hc5k9sqhhivvw4h7ttm16ol7tuvbzp2ha23obvxq0x2doc1q4vls5a9uwjoiwr2ua34lwxt9sn1rjypmxqhdw0xg3gtfzka4vujycre339739eubbm2jhs8i1x6qh301upvq4tnmkhstm479bdn82',
                username: 'kmlfpg9kk39gio6znfmf8qmr1zjtl44mx2aaiiqs6sj6r38rea02ju8cvnz9',
                remoteHost: 'xg9dykhehbd16pwj50e06vu2p944rea2d468t5jkmvqdd723qpeuz4inveo14ige26kkltotvn5xtth19xt35byfhljxzcm16cpbc6sqkojf4m7c50kgkjkej0iyn9vw3drwctjlcbjs4rl35b9bdlshtkhuyx1u',
                remotePort: 5140515742,
                directory: 'oo329vltxtcnd7r0f504c41bt2vg4i4mlsumx9lmchkb47rnc2e3icw4bxn0c5w1njkilpyktydpb3cfu08jmav329m6r8w7uvs2jy6x1dem6dnz88kxhxbw3mc0giqagq4xdtq8i7vt8pv8oa9tfeo0p9ga5jagskltkc9kr42sja72fkcpbjbokbh13wkkkd354yg0zpxsu3k1wqe7t6hb3dov3n62ot0gfa8goddler8qw9vj5n6fse0nqlckjq7ffvp17ger9crpo5j03aqdfbq7rd5m03b67nc18qdosbsvacv2tbaolvx2pxyqqy07kvyyoo9yaelch38q7yzc1bt1pqmybo9kkizo6f7iwccq15atrfh205m3j8zplhepk6sryyvqvf4xlz023aniqyadowv3u6c9f0phcdejuh0q82i8jdttb8fcj0jhhujl993l518mlmnl6jocuwitnxdcwqq6tadkxyngrnqyk1fjjy0nmf2jhw93k85t41o66vyd5ox2kvp72qbsva1n58eefotfydt899htkmj3r6p86d1jv7td4sn5y6htnb119m301309afym0ww1cwtykb8wga79zkdp0vpgctuml88ylg2pff246935dg0aqemxm9an93vr42lmc3gs0ejj7k6pbk4y0mwihwtmud5t3th0krix3d85r2vwu6nfcg8fe0g550cosiy89uu5bd2mcnx7nwg40trbawx5f1vyn0pf6d5giahxqdf5jeqiawgp35l9lb53tkext26rd5kc8mxqy2jyt8hchbusiz1v4fv4iu9a2p68nuvanpkhl02eqxvyuoev9ym7d7b360htt30jdkr3t00ao54eo6nm0zow25et0s5o8msd01yo5bd9rnqlntuj028v7osancvde1s02ilgl024309kpumlmmkcj2upv5lxrk8fay71do11glmd1z0ngndq3sa5oo3iszvhx4zkw06tran5i9oe2tyfr0563nylry4k9eh6',
                fileSchema: 'rpyoqwdm93z3lmggslj6x5eimo4jsljhejbo9zu1z4cmbibp5x6l80z1lbsc31sct7nrk8fje0mjoh0ywc441aydup5ujszgbijer3sdjuahycbwu4n0iagnj5au3lltg0q5iocigb0v4cb9efd7ftujeg68o53b5d5z7chl79j55laed7tjejyhgt9je3uw7hb111w61z5gm6epa7fi3nhq9ogu3euab1plz86gc401mgxi23wgnb8qwioc67xc37kw0ty28yhkygdn3yzxdcu9g6nmtt6tdnvs5hwj39qvily3hhz3krfxt8857qfm7dyt77yb6ia1d6x8tww8tfk5ouk6pwjait9t04hyx7nk7ujpo87pwsa5n0l7btvzhml4wberh561jgguq9qptw7ic4mcur8y0bapne1ghcc363sj9c1lkf76aqznsy0qws84h5wcggr77gafmagsrttdugub4gb3jiei9r6zjiw3hm5obunqw31wj3u9px7qbr21vikwl6fqdsk4snf0w0vl3isikf31xx0xo0xlzkegj2v9n925gudz7l689xyjeyo8b3c6wr5kpf26hppnod06gnuwelgnwdfgac01ns7nagz1nkie8t440l2z96m5yx9218nte4329acnv2qm1hn98udtdu3dqd2hbv2k9rry0nep6ri788x757vm6wgxmfxi83k8uhms50404rfv31fcnsmlr2w1ua8x8mmde9459s0m961uq2mvrbclt8e8lwbdhrc3jgxm2blx39igvhue8qz1jpmy95hcol6xz1w4yr4n8bkgl0q7qz7iqb50cgknmu26trjmdazb9aex6baovqrhailm93wbea9chg123z264yekioyke4zcs787c31hc6b180erk8ak2ga3bgv6w1rl6irarayo2f26ojxz6q97gfhwjvzhjkrnf5o6wzgulbx8jq2agf78tspebqi8i81dcba19kldlqx1ekuhyxsnym9tgm6zebmt446a',
                proxyHost: 'f541fvk9zlecpac57nlkhp5nqjaamm2x3pxopdagbt7rkiuopqy7q4v8fft1',
                proxyPort: 5090077293,
                destination: '7290blvvycoohpo5kctzgfkto86cxk002guocg5rmqvpkherhdw0u3gqgj3b41ytbhcvwfqa34gqqbcvqcovezqbn6rsai7wfuty7af31rok1sa4krrjsebgnnur8dc3pwaxgzru39jekmsp67xoq964hrtohsdn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'phdi0hmnztc0dzxc2lbamzvqhz934deoc1ioh7vt3c5z6ayzv30cy45j8d6jx5m7gmoe08uomm781u0ga7xxgkvbcpqvw0orddqen5rbxr346ytfd2zdql7m37gnmjq3ftehuwt0ybt1cytn6fcchlwrwre8ld8y',
                responsibleUserAccountName: 'xjmqtfr2i5s16il96ixe',
                lastChangeUserAccount: 'ew0hqbcfexbvax1odfuw',
                lastChangedAt: '2020-08-03 15:27:14',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'xtu2dkx2501jqh4ci9ucvuyvrlsf1pkuisowx3wwbd98kc6wva',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'grmtr05gkptqfqfxoqa9',
                party: 'abckd9nm6lu8q7udl39jdxbg798yr6moinq3gidjhngatpclxipnhro55m7e942mw06uqt9du98205yc5u3ls5zz9hlx67sqnutcg75po2a9x9sa4oh0r6hmxxm5ov486ha2gyrlz8qyhn50ghbrkp1dih8jma3l',
                component: '8ycu4bz73b2tghbkjzjutdw4kspbgg7vk8k6npzzly2o6olazh471g1z8po074g7qrlg90l3y1hdbzk36941fmjb3cwg8qthknr3m1xzqr611m7ach0jt1ygetqszc2risouua42lqrc45chxyz706vt0z1m2ap2',
                name: 's86obq9alnwtvpp19bm28xzdw34lheyzp282yh3xvfg39riliwhpesmr3rkhd05zjoqy36gov4qst5bdj6ugto0cklbmo42ys4mt8qs54z80d45o5x3l3hf75zte7i27won1out20a4wejax93mq96xgynu14psa',
                flowHash: 'xj3pt05hmvvcbrqcnxgt4l09dis3l2fctlyyf728',
                flowParty: 'w7lfwjglz6ywqxrkpzwm6l4vwogcywnui8mvtszv4exstcfxvxeqhw5wb2umficke2em2a9vew7ag6zxg3gktahbehiumqw3mm6rrfzsnivg1juwvdgs7yh36whvf97zixj9fl5ugidj48o5g06hgsrl4yferile',
                flowComponent: 'gbwfhgfm0xesgrpr8prqioopiatkm7swe3nw8vp1jv5oqoszu21vvmpw2ko4ztbzkdq5pbi1gswlesdi56nczj3l3735eja4k6e4t3wgfmvwkwauciji2fvpavd9pi7r2o6ls7rzybx6kxtooec1j9edtl2dly5f',
                flowInterfaceName: 'wex90sw60vzea4okovyaj6renjgnyz06ir4fm2tdz3b0njyhigkbp7asa983oa4bb6s3uihbkc2i6emlj17q0n5b4zw940fli009kqt5w1gp3ce5xfvb1lnm11gs10vaf3dxu536e3vperta248c6lyk91xylzqy',
                flowInterfaceNamespace: 'l9w0ji6ruwgl53grvem8et71a49r4hdaoo7ip4115grctijx7p1p57j8fylmmjell2k7nzagcvxs1nvu646j3nk5rofd9fmm9pysr58xozywn9f4olnw4rud8ohnqgnw99cb5v3nx581vhax6to6lf9tiylfkvh8',
                version: 'upt91jzxszhixjyeycwn',
                adapterType: '9ktusgjz5wv6iqu3cevf49ymquzlmosujsgh1pjxw7lelnvzqqnmop5odf5n',
                direction: 'SENDER',
                transportProtocol: 'l8nnyf79ffv7u5ak257mh9ezezthqlrqrr90s60bov0parm0jtmznhyrt3k9',
                messageProtocol: '8pp9nfxsvg60ykthscmchkp92ob962b7lhl0lxdbcne14atr2b5klzznnxbd',
                adapterEngineName: '41fgzamg74sn1i4ry0i80awwcvo67gpi7pg6f0b4y22cp73aj2x9yopvp7oeothzq9okkhp0mfa16mmd3x62nora7kzr6rtuhetc8uacuzroztc9ggag2dyjyrylcnhzthrdqwjtwmrxcovpbx66ke3bibtdf5gx',
                url: '8rj26lw3yfsx1swptfdeh3remtwlfqoskppmxvigz2qx96h2pmf1yac2yn2vbwxqnnrssr5ngxroc43so3kop8okvp6debpczcdlimxtboufe7tajkrxlk6jybwnjxcuds9l3kzr13s753z706azgaaq67dmei97137fokdf0fe7q33aj49ajmuzv2qtfcae8o5jaq5rfjj7eutw4r1kxb9ztm2w760pimqnbv06i393tjup94dtkgv8wgrt0xy6wrc5yrso6bhcmjeame899syaybd3xk0neu2hkq7o0ofbgymlc5hjk7niie87fmvy',
                username: 'g9sn4fmpbzzsl8nnolgrnr7eyh9nqgg2bqpmr2atw25xw8g61pdxtlwe0n83',
                remoteHost: 've7vpiqnr87h038apab618ospnmyemoxybb2b52693xckx3xbql28d12xjdsm0f6vo7zb9qatpo8nv6yze9xlqkdthrw4fb9gsf7f0bct0ny5am6vivlxlxtgmd5xsmk1basmg0qlukwhwr895rzhylcpm5pjdwj',
                remotePort: 6884475274,
                directory: 'kvmxq0a15ikbjycgy2duee6pm30rq0daindj9zpq9fc5ajuor5t1iukjgpqy1usoxi7ub06g6o5z0nh1omvt3n5frfuylxn3omi040ux5ddwjg7w0asqmlgdngpetmszcjy9nkryg3527wwbw33zlo8cz7puwogfmreag4n6w72qidz3wlfymf587drhgctz4yru77o572pogkgcz6d1ue5vzqr3k70jchfqdse0ktlj36bo7tm474gu6vg27mil8sd595f4c526exf8pcdug4gf0hd4imd7xidy3x6erxm1h4n6wninc55p8mgw85q3leimwrpuc4a16g2kkkvegky42vzh3f9cm8ncogmlpjcduc7qw38sf1sfp1xbze9wcxjyg46p9tpsu0qb12nbwsspiigcpyxlejf6h9vhbmmpppuj9uok6r7d5lcfl5kmu1y1acwmz6kf7huzqne6r6gs7gdkh30uv9j6m7r5f35mftzi00k2kc2fd8xepwrn1zthkn5w2zwrvslftern2mpud71kzqnwqbt9hbnrane9bb7otydl3ipckyas6sagm1geaidnpbfzyn88wuqosb8ksek9cediwr9dhxxw5mro8ulxhivngb5uipsyn870qarnqaitdbqn9s61dxybsnuwrte8az40pmndakejo7bsiarmh5eh7rpvz1y5ruwh8bynftar0nspb4579jbnrtu9ox6euwqwrcbgihrdb2yeem77gxoe1btdh8ip9sahd5bewhh0is8lvv8xus6ahxb92gs7v5y3vvd1jfbarbxwnpn0hdhzfez6cqiwbkjmq7endm353au1j58lrxsmpmm0e1c3w99s3y9fcbk18srdgsmg2b05slzcxrywmtah7a6o097pmm59urmqyaq4fo9zlh0c1esyysfdgse02w1iy25lexpf4s9jpvkgo75nlrojkwolh9bu78uepposka6923u4hjgk0wlbqsdipb4mrqwwhtwxw3wynmcf8hae',
                fileSchema: 'l1xygi3rt8v3nvtwcdoh95i7yu9n7c9z14uq3ez68i7urmf1jpm4hw6ye0gkpydn0rtoic5ufefdkmlwslpkiy6u9qahaxx3ev12o1wnay1kmmxp63ch8axwe80m7ide55uhdbs4akafitr6p5asluv2o270zn2ulnsd86b2ve0pg4jq87y2orsfa7arjnld8n07k726dvi49n5b3uv9nfcpv3qa37f7pp4aiy22mrhjyvwp5kpmfdhi6a5s0eyx7xby474k1x3tq243jz5pg0kjp9i47o0raj0uco2d7phr4imerwdgbfws38uejxi4v3fcc4rwrvis0zoz81bway7y5map9xn066lnur5wcyml0f7ffw9xn11m7v427nu25c9k2hof932dwggnu6jq6igbyxyltilwmsqyr4me4fk22ydne3olfbvn1rmb5o6o1h76zovn9eeae8lujmhxxhesc7qc5ta8jvvrvv9verueo2kx8sqcb2d3bkwb6wfs2pyiao985x0nbt714xbc2sni8d2pktl4s7r3b4zw30um8p6eeutin0cgfqrxwfjmr10fvrpymfuqnwdwf2g41osr2z1e6wehtrgmi9kld2vgk07u9an0h9y9yxscxbu2cezc64h3wxiw5hjmh1uou39y5cf2je85t0xvbkyymkzmz9b8kx1q1ksemdk9zyklm1dg1grwwcitl0c82awj9pyfvwl2ilx2scl524wopp78bsh60jift4ti484l3lktx1if5unm24p804lqy9d00t6idw7eyr7ucqvpn7aj2ohvee8gs7w2vudtqprhscd8mpao2iwbp8ilf5mhkl8pbceyy76u1vjo5qtxp0zogxlk4sw4jqgc7gq0qz8jjjbqxljsbz2xp177ypsgtml35jf9omgjq2lbu6b9kcojwbqmmjfe29rl2689mnpysod5glaualcysfqu4oa8snevf3t2n09gthmyypcf7sphy9mjr9xqpfqhczsxzv6xvmfm',
                proxyHost: 'vozcxcglsbcpxhpsadsrabp6byuucpfr0ave255oqfhx6svs4c4cgvc34xxt',
                proxyPort: 6462645880,
                destination: 'k2muuki81mdn1vf8rtibrdthl5e25n9dl355l3liuzd3lh11xmq4h3hmr15q0rn63wcp9artj2pasmvktipm044d8ep5ex146uo8w219brscse7e6nuz244vtpolnkrbynm723pnxm87ksjuvzafctb667b5vy1l',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2udx4a4vyh92v2h4qu8siwkda10yzbgzzdv3w4f95dp1hhgyybxcj4bubcrbe1p7f0vdknh9zfmxt56aud58zlayhc71is57k5j4uw5xxwq3kabdhmnpipvt2wdgxvy17dv1o597gxzbhz5j1n2pi372j1baufzb',
                responsibleUserAccountName: 'vhkx8l146gkmx6o88xov',
                lastChangeUserAccount: 'g85nb37tspg4pvbztnix',
                lastChangedAt: '2020-08-04 08:48:54',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'ocp9lzjhlct50ypuy2fa2n0x8e4oilrfado1p7kp',
                tenantId: null,
                tenantCode: 'nvcndl3x2fp300exeuxr1axou5ic880xte4f4yxmtt5p9gm7rg',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'e555172jlz09e1srgg90',
                party: 'gd1gd844birzdk17960tz1ojd3eyep2ozbez5c5pqpl6ineni3vuikiphbydimooghm3p7j03xy2xh7r7ubddmlm6m5at07aovflh1a3szxe1lemy3p5xz25fxjry9ehf6ylna73824o9o91tql722akzxtf8n3p',
                component: 'tvom2k6ng3al4vd70gcxqkkk194rrezls9m3dekniwv9a7h6rn1qyyqblv4mlopxg6e1ebfost7bxk76f8m61de50ka5tzv8isjd82asdw290vnm3yr5rhai2siw5qj8jt6o5gh2o6cc59a2m5oy2lvnsp0joiuz',
                name: 'hweyc062e1bqniqeosmzeoe40dsf9g9s1exhq165zztzxx7u8icq5ikurngj0b6jx41kgvdqdgen4pktxhsd09gabvj88cx6xzrk9hpjonm1v6nnrxpr9bj52i5olgob8dust7t6eeywv1kt3hhvs4is467q3kz1',
                flowHash: '9o5h9lvwti64llm9sbfeveo9z4b7zuvnsq5sb40f',
                flowParty: 't8kuulwkg7q3f9i9n9tstjdvmqiia8yz60rsc7v8v08vzv1a51pfcryb3rfpfeirbkythibmk8vh5x0y7s2tj05h5tugul51j5vlkjqu3ag8hto7zbz4l3hyd2uabe21htmaq1hu97ruzvwsa2cobr8j2bqgopaz',
                flowComponent: 'jr9jk9suakaf4tq69vh5ml2bc8obsaxr7jrecip8hat5pplds24wmss6ifz1f7fn6stcexcywqd6cljv4uuc3iqglspsojsd3cq2hhyos9fo92dvcn5zegm3jsaps0m03rtw3l4qlk5zh9o82z3o3zg4vqkcmnhk',
                flowInterfaceName: 'jh1x3cspq4ps9rujnbjm6z2now06zq67uukykongzsooses0fu56o61ax68n9hes18i1ld6qgb6juxpewrfvgpydpjcnhtc3lp02j2gk7tftvl6dpux9or20lgk8zjzqdme1zzmmux2mv4t937vej5mn5zpgwuki',
                flowInterfaceNamespace: 'l2zwa53v4sqjy1zj294jpykfa89rmgiiokovvedix6ka9kfl51p6iq38zsnjhpr4vm0xgcfy58jnoxjdkpbh5fqp5sc36q3z08jex3c99eyzc75n0bb34515komn8c2q2b98udqo8igtcp6h3loq2f1ga3y3rks3',
                version: 'lr53nuld55k3n7cvu8gj',
                adapterType: '9exotwu1bue9yyziscp0qav57kkmyd1xnibxkbsx4py2q6rng26hx3pxv3mf',
                direction: 'SENDER',
                transportProtocol: '5ra1vb7plcoijbu4554m6z4c27h8yvsn513wykqtz7u1ffkro73lj9cueqsr',
                messageProtocol: 'at1q1cemu7v2h27eeqj1n7pg0kksw5nrhm92yzf88qkbzlxqyoqldd98cr81',
                adapterEngineName: '77l7gb4xkfh9z0kwe9ubr3i3yjozg9djml0sdj6f3prz6bfxiinlel4b6i6kvbtq17yfmuqbb6f1aaq88ahc38bsxqop4qkf5t9j77pu668uej86zi7f14a0xz8dp76ocqi7p30534tms2cy5eys9xmffjc3thlf',
                url: 'g0hnh1asri7t3j9fihljv75tcelfzpetro8ink6gs40vf6puzi70f1k76n8esioavupsacjhtz75mdp96yshpwlbshqu3r0lhklvxlllrv7m71nsz6wgggbvpe1110ewtt5syfnzqcz8ikm75ob5ehui2xg1rwbxwqwogkw6da97bocfo8q46pfnmximymn1enkyownb67o84w53igwmermsgnoz2fmddl30r0jaln30m4g178xwa8f6vehpxmq6qckhxly3czc6prpg6jbp6x31s1kyd6ugxr2plgxcl6ky4jbls1fu5o6a74rxcff5',
                username: 'l4g61s98ab7b5wqzdv4jkv5s62mjhha0lfhyx637pbbbvcp0kbw1pwkm87dm',
                remoteHost: 'swk6a1rp6dhjax5tmm5afoa5ys93b063u8zgeqiqi4jnccjmhddo2zd7gdshfsgtoyp6kaa5qrfo1nnclsfg57dl2hqb5l85v8060s8nhgrcylsb2oq5sdl0urm7nq34pdi8pt9l0wyhseaiyia6r5bn2bpm5m0n',
                remotePort: 5571751139,
                directory: 'mgu3r02io810uslw2t8ofhnzyzmadm6zmn29leifj21qxl0akn4ra1cwwm6o8n9ae6glfwl6unil74m2bn49bol7oa0og1uqtv2o4ui3nayyhosy1xol68yvcyu1l7ebqbxwlbgjwldpjxgspe3ue4482g0nht28od24ikphzmjs6j9th9ox27g50vq97s7p27ra2lwl5hom3vuqdfdbfwj48pnr3nqsscwd37knhziix54026etmghy5n8pj47ifttkgagjvel3mpt61z6szzhe3n2s5eoz1d3ys3jcfde2amzxha8entuqvrvu8um2ju44pxh6y8kzj9b8z4ornknxf6cu74qv7zgb41t58ludbxrt41yab2jmqnrpzrx43fd0omu1si2higucki9plxogcchwlc87713p1flpmk1dx9ki0kt9d053vc9f5xqp7t1yf2byi0072dfjwatmkf7goa8ao9k3tkfjw78t8ctvru2ilh2w1gxl3d1f5dz9dn4bc32ueb69s3l5u94i476w4xvzh0gwxvqd4q6z6ftzu36e0tlahz98ai40qh3d2a2km70kufe73agqhl29f9fd388hc6bh6aucxehn3d42r5hz83m3n3iv10juv00l0kqpwer9ogim8j5q82s6h7el437c81vcodd1itmrw8vkc2tmo7e6vn05q9zlgtloerskpjr49qt9qi4cindstmc29451xicpl4ozo3olpkuozou9228mil6f552zsuup0w73ezbfqysboplr9ioy4jnfnxgbxs09sffghzikmmie3whmihxb2e9dp1p362c0al7tfuh3pg3hhp26rya0ead5dlgaywenf6o6xhsru2o9ye0zju0mdqj5v3wjyfazprqp1tesbf0srs2pzphb4hkfbcypb3nsyz8evjnx8cpmkjm2n5ay0rdpj1sscjgbn64eqaaccu7hqjibnepf7vi1t6txz7a1fmgy5l3ljfgn7oqnuv5an71twn0ivpzj',
                fileSchema: 'ped0sd3unc9cagyk8xrh06p0gxh5bzncfju1f31cix4zm05jbw977l0ixb54x9c138b6pk4dcct7cq5zh35xsvil8z7pmocygv9gjuwvzbrf3lx4aebs5bbgy1qhuls3jnsy5oj3xlpcv97i07o1pseq3k8s8ppjdruw7j3ir1k8lg63571cpg3jlohnigu4qjyo46ezm4226wgpxf0pgc812jzom39ccicae9jte9n5xqjmng7i8bgy4q8as8qfyxfvpqiz1wfbtclkjnkvtq545r7jazjwuas6j93z1zhxl1ldvn5s3ezr7v0fii6usc4ytocoigfok3q538wbrrbr568u94t2xjl4dotkwuhdvuh93n10pzrwdt4ghysmwpf74vonv11pkocwon9k9g7qudbnr6v3kym0n4bw8yv3l07vk2coogarmc0hzn1rddkwa53uomi59c170yr9j55a7pq1ycaz8uaa5j1wd1k55gg3v7528ry0vel63oz5ul98m8h9jkqefs6b0dfcyeh5o9b1t0ustb86pw6anfl1vzow5e1nyih64mbv66e23g2dqr5blf428cxz5iiy2ntg7lupdgknki0idvpsdudc73uxsodgrnqncz3l84xblw8sathaupd9us3v8gi5edimzbkjw840sk75rx311b6qkkdzwe70okj2v9ti6w0xn7hmr87ftb50i6np0mqy106acczzsswin5zvrj4gd29vq3zn0xswa965u76eufg3bx5aukgld6pklermg7i6yy9djmecq87rdiqv623ffg8q31okgpgz65lvn8aa4m074mkutlpn5oe1rkjryue205o85oq32fw6rfpx2159nbb0m0hiqqmaq3tfudnu9clnu7l52m27xhscstk4elwrvbl67g713suty0ui5rvw0n02ytlhr2gz9wte8hr7usvzij0khzdf4itum5uq2l3dan950q3x6o9wh570z7vqcpharwwuat1nacih6aotbzfd',
                proxyHost: 'qskg93i2plylhhgwtr9fi4wcu2nuq9r1kfminphb8l97igaxwoyaky5zdkbj',
                proxyPort: 9327956590,
                destination: 'smvbtwrvl3zwxt6nyvgdce3w26gysi78wtnpq1mll3gtsrfcpzz6i1udz6sw4cb67k8mh91vxpwbqb7m1n6y32qs66z34emhmbk7f6nw7evnqju1tnmllmax79vbki9xfje2oe2jr4th0frylyjm651h6hydqw74',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ei3guwgy6z3ffl570tjqy3vzdqh20tkcx2xvwmaeikboevzegrymp3st6id6beyhw9g8xahy6aeia53zfgcodicvd0j2j8951l5p7cz8yb9eav6s4lq2f22dkt1tij3de20hsng6dqdfayn2ceoo9elqp6tv247e',
                responsibleUserAccountName: 'mjldamga2a06fwmraumv',
                lastChangeUserAccount: 'x6lj4uisxpw97gwgrbi9',
                lastChangedAt: '2020-08-04 11:47:53',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '6z9uejhkq42j1yya6nw1ywu3cgs85rzz2gtgejxi',
                
                tenantCode: '2w9tq2hxy9cusimd9ipg51ltmw1y6alav6qee8wchucqz5ybpf',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'oaulouvhjroihl5rc6xb',
                party: 'nwzprw3zx0lrbqhzmh1i5mppjqkqlhe3q040gvylwqkhgpih56ajtdo079t2mpuo4n1l7ztt6iitfdvibtus2lf6174bio2hg3ui1kx5jdx3z7ibbmnr0p42uzrnw2b4xkvzqrjj9r220a4ybmx9mua03p2y3fj0',
                component: 'fitn3sezfgl9cdte40f0gjzk1mnoa0k9w288ptef7uso8ojswckio3vz7o5izvpyaai1djlv5qymibiy0tqmbf23tu0fjtvd18x1fd7v2q33y71m1s8yx3s5mnd3ohjxh79rq961bwpds0jjvo00hj19mwwoolcv',
                name: 'jg38r51cpvr1pvtgbixkc5gu7623inofm0dz7mu9ad9cngcqs9r68y948satu51v5fr1um0i07qx84jaauyea0hixowt0h1t7cxmi6u9qaqt18ly5i1ett1j7f6x8kuddv6ua3haldrqv50s2ejw93i1n2i4662n',
                flowHash: 'pm3ptstfj05evnl5tluf60s24y3ohgsdshveg3z2',
                flowParty: 'sdxg8v65gx0oki5i5kvwrs3s62rhemmhy326x6667vwse70h694r9umcoxmkkhd4nu5qmq1fbf5e1gxw3nc95z0ae8mig5mk018dmsezxcnxvq0ywsyt438hnoujtixym1ljka471jm8gea68yuq51mymoivy8vp',
                flowComponent: '7xsizunoaeyr44wdu02ayf15i0m77x6xa2hye4wi02dnkcmaipigp91txkfrpndc08zw5iz2zlvf1qk7ef287dwqx97fsdg179xuxwojlw826e7miv8rxyap1aglkp1ttv1o0kbwrropepetl6ls3f16xjimbkse',
                flowInterfaceName: '36j59v74d1sdkinhgl6fgy3bf7nbuonn6xjwkdbhsuv83fwn7rgh74jhq183vmgpnjbpv0acu1sbhexr6s7s26bksboqh1fvdvdohttmv96ad3adhn0eu1tsxo0gg3wi5ssxa4clx5dafsojbiiku3ig6e6rpllf',
                flowInterfaceNamespace: '7z5fl8z2t4h3j7bkcwkr72qs0xrx0jzfnmtcgfzbpwdopxhqa8u4847u2ytwisa1f8ib0wj2ary7rpy1l7vbvh6wymuo2qlj1y28e49ki67bfq0q24bgj3xkes31iiiwvx2jz8buplimz42ve8gqrhe1ttkri8y6',
                version: 'aj8j00zx28ffeh63xs53',
                adapterType: 'qv5uqn1815hr8kn5ig594v3c3ysjsub7qgpx3nk09efu84j3dzmtdayvzdut',
                direction: 'RECEIVER',
                transportProtocol: 'ffbyfaemyjivwpey10g0fssn5m76vy2cw3fegtwlxyo6mi4gl8jwgokk3y47',
                messageProtocol: 'b5fesg3zr950yuuw2tnmzew8sxrc144klqfa8eupz3e65uf43t92bje9kshf',
                adapterEngineName: 'dt9chl1l6gbegohh6v7bq2zqixzyhmejjyjokjzfv9gj6keggaxn6yrml9nd68v1y654f41444zuaxc3mv8hfelxdxbf7un2rf6hhpgb66zcmv7k85eb82p7a04qahazdbwk2p5ojvhax8w9347oxuog2uohfo64',
                url: 'ayvfisg7d9huy2j0su8w5mtvq5ka2opvame0nr5zhe2pep5hyblts9124m09khp9ciiyhvb8h9abh8kbs0kjbet9vdqad0wfhwemkuzda6dwqfcd4xql2j0id4dx2m5k9veus579jt1z1uybmwn6pih97kq4uoh4awe1kg4gc4u22a2r9jpxjj6ni6v6rpdbjimk2pdp18ix4fqrkza55i8w7whh6fdjgq7qggjdh3o9tc1w9q2gcciknr7reemt4rn0rg91new9zgwcyn4fu7cthyihz00l33tztjkc189x9wlcflnllx9mbbpur2pu',
                username: 'q776hwain239mxwooujy7ayqdgn4ni4y0uwtmaktlebl1mn66z3f0o0g0vj4',
                remoteHost: 's527vx2om83ekjfrzwezuqcpq2dz5f3r35p3q97c4kuwqfxouhg2zabyg0kvwbr39u00fu2bx79r57q7oh73u4swwuqc1veaeiv06c15dr1li8ab2bkh1phbofagvaa2mevsn5xkdiuqej0qkf1ssz8memciqk9g',
                remotePort: 7045921081,
                directory: 'wgtkv34jemjahlkhlwd9szot29csk3n6ho0zb2fhzpaebfu3l1e2sfgb3dzxnrh90kfho1t6yeg196h47ouvxffknjag4rqla3kh92728gpb72yda9cjr0cl5jbhi4bqw7pdz10vxkbhb0gf7wvskffd0xm8keimqxm2u4n8nz9yp43o9zgaqpr1exdi93hltufegsbin6rnuiukgy36ckefrd0a6trdrselxfhy3h7s5knnqt4hjiep84avbb0y00v2dhiz7dem9q4sl5cp9lb2xt51b2x1v8s7z9dqk8tigie3nlispe1ri5cfd15mly9a088kfhsa1vse66x72p7kaz5al7dwj86qg0kvlzs6yv4p05jpwxx7tdcet7m8o649nhl809o41tlzr381kq1k3ouba5q9di9kphsjmpaesz64os83k6yvc5tlihui3j9zfmfytm9yxwzhsibol0wmal0ghzxg6ypbskajwigmz96cyxmpa2mzcy85jyj215wlegv8sc1eoye5f4ftrxyn61acunx976k2ot40ngwac6zdsgm0svob9o1vqvt7tyfw3rruteh5qs44oei6253g83p7pua7ddr7s7jplmvrwcmdklrz2cmugymonibqje7dop6k90s6d0nm64zuqcl8edum80lp0kqhqgnlniwb70fhwzwcypdg7qbw3a4fvnm6vvhj478j2h2108oga4ceimgde1gdmno9ffu383wp0s45hby778xk2u48psmfntxj0mjznmurlmoadie43ev42ytusp8eeumo4me37fdqkmveeynnhhqxskqg5sng4ed25qgavm4ps90h9xe3bhl81dsb47lbgh3w28h8gble2vu44clzqovwsiis8lfu73gsxuspv30nnv6dzlunj0zmsuuhlt50bo1it70f7npo5fwdm634m01ebzwou4o1o6w4hufp2ak028dcypsujktgf544a10aw5hy89yh7up7248ksgcf3ldpmrh545kp',
                fileSchema: 'zkli4xpdmt3zpboy75ys6dygw0k5k7227bahyxidg5mmkdrxo87ebxcfnp8cgvxii6v8nn5p5jo8webra5lzgjxsjitnedrj62ck00mwxp4oil0q9k5fgpomjh8pah1aej59dat3gzpt47onva9yuu3bq1ada96grp2lie154x68t6dcr38eh14e8iulldllhnh7o5we17uje89kl6gz0rcn4uf8asz8yb2vzqbg4tprh1h6z7han9v8xny5evgr2cowwwj7izc4hx6vvd47vkak6oehl0zx32f8c149ilxmqrgptc26q5fn5556fgn7kjyqr1od4b5bbiitcmpp5ar0d75bpiqjke48u1pg4ip3x0twuag7wa3z2kuvhklu2hs75s17rpq3mida2hctso9j5sbyktnkhehhpnulb0wdzbswc6khoxxp8ezyrrqylg3yo6b8ha7x1fj8sc2jmzzvo2guu48jmh4phkxx0eoe8a3v1li7pwi4w1vdcs4rwn422afrtbt7jji7rpfjyskl30juarovtetp8l39g3v3m0jqg2wj75mqaxltmu57q1yijlvavhkq61w44jozicstyui3ereqg9nmmcf1dwtp3c6mhaj6jivjvvlpe6bqkp6uycdp7x2bonst6m652yken5p26fg0n8930uz6afxbb1n8y162fvbo9ibuvwnce7oviqamf7sbfu6zqe8x8bipyeg606emjtoe0so07ygvmohkir4nfodznu8dffz899riv2mukis71xgtwwiy5vymzyc6fzespx4iy2608p4vehsj7wylyrdes6ppegn8toau50qa5vzail79mhbpnwmi6m9i3vhoz52yezeaqduu1569wbswhj6sab7n71tb46g1dp3zcb0165pi5o2cafqy77qa9t24g8t1q8rajn5lxxcoi1k32occiigy0teshpl2htymwma6gvl3ubukmvxnl5gb7gav4v43wy4wfv7chk3mjo4u8dmai41ggva1',
                proxyHost: 'ohvxjnzpwrvab4lvtg3uqr1tg3jzwpzrv6t1tl7puua22nqkkjzy7zu2m72i',
                proxyPort: 6798797291,
                destination: 'xy7al2xioo39aj8k0ra8x70rmzwq0rzkerrti7kbxp4hvqdyetsh3h8k0p1bpwoavc9bffrqv9duz8mwhkpgdocj21niywewg3sbyhwdln1l8w6129gby7i6muezk2gaq7pjpylzhvozh8unmxea2h4dq19u9qil',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6vwk6c750e0r9hhpn2o7hrio93p4m2g3m83u3yev147qejn6cr487l9hdr5yvv19qfbv7yqu5b8as8rs3clkhd6bbvq6og5f6jnn9g0pc0qyc0zwweyn83jc63fby8yppkneu6s9m93c06oszod87gq2u63wcwaw',
                responsibleUserAccountName: 'cqepsb2e29uko9ymzp68',
                lastChangeUserAccount: '0jqftmn0bi5n3rod2j8j',
                lastChangedAt: '2020-08-04 02:11:23',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '87j1s5pvp1r14ty3yzf8l8kw5x5fkrck5vt6tslx',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: null,
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '7lopl47felf7b8soz2i4',
                party: 'ruass6f2i4v8p9a1yw6v7njn5s11kdi58ulfkp4158xh9qxjpvbx2upicc4wvirf5in8dnu7ofgsy0u2zdrwfs33t68u1rqxx5odgppuhqul1y0o2kwfoz3fes5cya6x1jstpkv6zg54hg9402za7b2kifd6nikl',
                component: 'itocrdm2nw9u7c5bv0i6965kbvrc20onhbz5ithabbml9r9zxde6obqcc3e6mnw2kcjt91sdygqqapfcve51fiq8c6ojdnfoib3skxc85l229b1nf5scw9cyboc3v4yr8jkj0kq6gcfeysp0hxtpdxfzg7i5x3ve',
                name: 'sjhwu0lpxm4mocep8p15agtto7x3suawoqz3z1egbzhggniwa1uj504rcj3x2mhsqyynzyavinevd16hmaf7g4qzhhj1u0l2su6d5p97iwefxpygcblcmxahjf4bgrr4n7eyy3w1v0yj6q90id8eja4y8wknc5rl',
                flowHash: '229vmil2qts66d2gdcrco8tet7ndoemii8u3mii1',
                flowParty: 'x6ibqhnwsapj3jveubovvzbku3rh2b7wqo11n2xb8ppfot0t2ur5768nqh8nw7wx4lxmm7tpzskjdfp4ahao80jjjkxwrcjq5aj4w45ez62kn7ep7r7twni9i5ruixhqalhvbl35wypthm431760f827djt6oapd',
                flowComponent: 'obpszthi0tlv5vic3aab3sjxcon1di2u539xelnuwy4ut8rlq5csz7zx14os2wug9jjnch4aj7535iyscq8mrvscglyf6s0h8ro44t0c8i58lrch22jdxg0peuw8nsfd9wjqgh2j3b4p4pl8qyrlkxdb2gxj84zr',
                flowInterfaceName: 'zpdakos49pf2sef9o2fsfipn9yfwr8tzfmehz8tjl8fwm8qgwfy01vstvz8dkp1o8ebpqeya4tbxzzl89fgiltiug7mrhyuf7m122s1zjq8g8vczj99b3q9cswrojmvscdp70r9dziby2wkghebl8877inctosaf',
                flowInterfaceNamespace: 'yndqbohvqzlp66qt9edusrtbruf8r05d3ox59md8vzbkr0kcs5owu1u7l2b7euhyultqwxkq8v34czzuyicurktit483qoeurn1qzm2vlg6jlz1ekudme0l6xj0uqmr4b0jbz3mtadpner8oj6lzf28022wbozmv',
                version: 'qyekjdw51uawn81fvskp',
                adapterType: '42ijt12dtn9jlgtypapn2cb8pl16duf24elx0y5d2losz3f1beqhucf91qjb',
                direction: 'RECEIVER',
                transportProtocol: 'w506dk40sflxqvdmx2uq8mau730pn3iynatx67mrhkvvxwyv2y3iue7y1o6k',
                messageProtocol: '397dckc87kzo557m7hes9wpflzrfpbiufja92t7b3dn4d2qpyawtpy3us0zc',
                adapterEngineName: 't56td213vhjpskuqqxemi17yejxuv7urbypydkf3wg4ofyifyvxgo3x389r4q0hhvzqm80fe05mkxjab7f4xjtwz5l4iox9hcuhm8hh62vzqyszxm5ky2urr6dq4qwsxum1jijqslhqv77j5ordczd00ptyl9fxc',
                url: 'g7jmbph9hk54m1vknvt6dhdoswb5bwx27hf1s7xvpemarawtejyfg2u2i2ns041iupeb9f2y7e5rjoo4shzl3pew03a34w6xjff6vr4gg2lldypj7gtj6nebvel3gmncn8cflcrn4mbjj8f2wsykrvmo8rho88yceps5zk417ibt7hvwbzm550io8f2y7teq7kwexgvegj5hul3glo2xwjsdpwocxmysjtb5kuquq2zqlovjxwmpi6pe9jfy8ednuanqxsf4dlbmx0d8yahbegpzra50j2gkdqh3nswj65wrawbtq576m2862l2y0ojj',
                username: 'j1k6b0ce51nwa23jpb0kcaz4yd7zrgo81z44ac46gz9phhrahoa9l0e6bem1',
                remoteHost: 's4bqw9ninv39dj16al4ge30oxqj6pmqivosbeloyf8ejwqlphff11wc5oeikjy4vkzg0978dp4fltkrbk4gn0iaunk223rn2cvqidda093sisr52eka0jkl5kfj0ofvvd46thjdg3fj7pq7la2uzjza0hey1zxlc',
                remotePort: 7699238725,
                directory: 'qscvqaj1p8x5t07ucddkvftq9jx9b3f1b49m2c8s0jzffocz8ryumxto418dm0mpoo1jk57h8xd5lvv3bsbos94vyi1e1jvfklu65j8fceuh6c40k6g8hvt7l82y3jqlcp3fye74a6uxuwrb9d3ih678ain0m46izoowup2veods3kpapun16vcgczx2f9vgpuqhj41xsjn23jo9hnm5vzlo9sru2m5n4b62kpnizjiob7nmkpmz6t4mthvtjr2w6imiz5fxch8yo8mvxt5ye4cueldi7vj2vqkn25m3en5x4y0x296c0lpmc6q5pakrn0tc0pbkogtibai6lhppoo2fx231mxzo8j2klgxj4g5c56ptjqkr5vqoqbigpfkkbshgw025000kxop3mhter9zft2212krqoxo0h7vo4rkshabvaxmi2uwyphjt0v4owyd4018i22915ezj187j6rfn2u3d47x18w63cnomv9fc31pxyzqyto40u2rzael6nsria24vwn75d5dmi5jda1s4qd6umb8n2c9cep4fpaz78dtc1a4otjnvfrxsa8b5knkv0gqkug1est6xp48layyy8gavat6yzsaojx67tq5yeibluilll5d3wnd6fa8mfc8bxvpxc3aroyvqvan10g2233psd9noif7droipzr3w9vqe7zrildqdicoyyh3vpl1hpiyr71pzq03hgoou0akwa3t30ttf3lbq1d36sj19yuq6ovnnukz2jz9eemaxugiufmun5jy6l2n757t5nscptvcnp47u1inkv9hvr0ua6xwuwgo4ne5kkly7a0g4i2n4xrc8f68omdarhwshkebebwg06ltq5bif8hvjbbwqwwz6rm1cgkneycgsuozqp8ov587t4x78cj8ibfm341jwapvoy87q8kr2wnzv28ew91bgqsgdg2ef6u9fc14f0bhx9x45qhzfxzw8j14ljaexpny4phze7mtbue3zo8vxu1ly2plnvhmes1ds3hwp',
                fileSchema: 'jzbgk17pm4j3bc0d10oigflvig8vva6nmci40zcs3yfgb8slbkdk83ytow2qql5dqxpgpex9vxir6fxqcu5c5rhwu18gbrcle6ibh4yk5pelq6356bhnv7kyrqccjga6dejeksz1gt69elfobak8kgre7mpx1pmrud59ul5j9cqfnap14q8eapwnc792wunrd1zackch8pbu9m8dt1ga080m6gb8lavdtgsd7djd0ee103x083gm6edbjdg1djatuts7da1yade8ncisjwou161cvc3m493bwhhoiunwuzd9vc1eh0lhtijzxzsjy2tmdntwhjux1zrw8jy5l0et7pneolq9bevtb1basw9fhfflo7h8f9lsmyeqtvavnotlalod935nbk40ojc8oqzo25zwejfrqpq211vfun8xag542tvkw1mo210j9sshvr18lbj5ydt16s4lf4nqhgn4lcza2cj01rgdrzetv94g6l2pb8bbikicuu2pn0dctwi9n55k5cbwgmppvn0ybzbbd6dpf1i4qm66hlboadd7mta7jgxtu9v2pske8bsyv4hl15gm9qy6bqwqt8cqhzq8avy271ieyzog86vwm86hqt25i43fbxxpkyyph6u8n0qaoxpy444zhhpt7hdblv7cr105sehvswh181ny3xk64ngeafj8drermz0dutnmtqtrwyjjmmg81szvcbdz5nwla561j1iftqkt4chbov8uuawjntybipqn3icz7lhh16ng36jutt3hejpnx5sovpnbtk462tqkgw1irctgrz0ml904lp9s3h0w7mfaoea45mamkwdy1fvq02aoomcim3in7w2ez4njyvq9bdn0v44qp3sa7i4gy581k7kino78cv9j684tlt8lwgr2pmmu9ec4xctsghxb00pekeqh6k0ezgbcfbjnoncjkl85zsqvxzrkoogn8pdxajo226buoc4bvb0rpqou60ivzfhrhb5jr7kbg1mx8mlqn9b8953wuhrd',
                proxyHost: '9oq061quqf8o3hibu06djdr2eec52aat829n69cyf8y4337atuvz4c0hmqr4',
                proxyPort: 1188586678,
                destination: 'sqwjjg6zbmjbdy4i55txi2zyjpp5zdkhkqrrc6xdv2p0r70vatmprp8oe0vp2lr0pqlhlvg13qcv01e8ouovnaqj327sfxbpjwjopuvtvhabpf2hyn1sjho0se9fo39wbkyz77lwlza7b23o8poc76c9t8h1sn20',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '5vivsiqymv3xs4j624nwu8fy6qz5n5dj0fty15nwczi0p0ehssz3u9swcvm90dde58vtd8vwwk279hrkmsm80xvu1cfnjhqjxuzuf0hepludh3lngnunz5mif3zq5j4l4x8gyh62afkb5tunyfp7yppxd2qws375',
                responsibleUserAccountName: 'dp1ealmg023cr1vmbf4y',
                lastChangeUserAccount: 'sas61e11bj3krb5ruo7y',
                lastChangedAt: '2020-08-04 04:35:38',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'v7l6nvosbihml9016wn9lojrw6v3248pkqtwxj7b',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'e2r847pg5scxecfjt9g8',
                party: 'lviyd7u04hwybevplcqnnv9jw8a3cokfptlrx713gtdeyp8rqslcy9s1gzb7u4hcy5gb0aodr6tuoqj7zetx2ojy5xb0naoz2vija12lpavzkfciq0citaq0rrvtirlm5k3hjklbz0qzotuf83v28av0l908jf83',
                component: 'whlb7qzlanut1p7ibzksl3hzspb2kp14is80db5m1mmpm0r9crghellzaxmtb4gtxqzty3i74vf8n3hhcl5ab28mz68ry4tzs9aiw02mundhjci99af8xpwzbde5s6958epnqm9sajj352yzy5267bl2ehmh357k',
                name: 'y4uuguiofqcv5ufqobpcxy0mw86gehpxfewiziy8h634nrjg6chz7w722fihonsuhm4t5rl46upiepc06ka29kti1qbtek82d9a1r3rlmylm61jpe2zse20ti57grmoc0ci23oy65ix7pd2nyw00znajkrt3lj71',
                flowHash: 'yfv4kdrizqjf6w3rrw0kwm4c5daku0hdxh1pskfe',
                flowParty: 'kz7677k5p4lcul0op571jzju3gzzw3qxnnupdcw516sfmu11az368tep1ocia7qy4ge50l98m1s2ox0neog4utlw3gh0edgrdmtoiusqdjuh3xa24sjor4727shirixywj25obpdjnv5oqd9s6ys2hhnmmpnrj4q',
                flowComponent: 'xa8aschzi4ywl7aok5nfpl97qvb9q6o60sqshxzn6q6q9twppq9eqhtv6hos8ywgsfid00cdo629logjiihb2n1ddyyjb9q49mqhhyb0j3iq3nd0tg95g086sr1qpnhunuq4epoc8lbxz4skjtdv3lf3nfe90763',
                flowInterfaceName: 'mtkkf8ohmp3dldnql0u556g8756kt5qo9d7wcyxy2f32rvrndh8oca6cbb0i29lfos51axsnexnn0zg9xq6q6gl4x43xbvmosag4s20h4mcn21anpjirf8doilv3j0jq9xds91syg6h5y61y0b0ouojnjue31qhb',
                flowInterfaceNamespace: 'vt9709plzvq4dx364evqlqve2hqjzueo3uvoiqn0li0v0sj2agqz6xxlt3jes3oi4lutq4on1t83luvfwad2t7r9qmtfdtyk1u7ly235mtwx2l7at7l1wra5omn554ckuzsi4fsez7mj4u31vazp5cz98zd4akkr',
                version: '8x3gh5lp633jcf93hw9j',
                adapterType: 'zd3k4zynl0izxy9wzo0a79i93vd8t01o5sfvrktvj5rxeivtb9gpqsglxgsl',
                direction: 'SENDER',
                transportProtocol: 'goursen01jn2yakfwp0kuucv1ufypa2iu3msg6p14b2jqttmqcidzdlud44x',
                messageProtocol: 'wbjgw9ngbfvujqtxebhnst7nna9kimz9iknqrjk36a210ap21ea5yfhur6m2',
                adapterEngineName: '4k86one12fqwij0wq23aify38dg37biz9w5epgayd4jzqcfumw070080zik0ufxgmv2w517x0ssm2m8kyvqhdmla3e4ea4ty9yy6uv0ivbgt490a2plvw6nthenjv749ltfk0qt28wcr8bnkg32dw97uulc37c26',
                url: '0ov7infmgntkefy1yq17u3idwde6fjlxkpu9oyz637a6mur7yrcs7xhvj21ehtg8d3scxrda5ehgb3dw51j5jn6cvgckk71pxu8yl7s7st6ru6by7thn24647j2rymp22fpx6y4dvgke5idenxfv1kuy4a3eg24oonk9njxoal3gq3vls4np8dwgubk4tvshreuo2eza7mmjkehc5qtt4ejj7fnhre8d4dou9wtd8vf7vc5to1umeb55x4zpjhoicf1parjoallqbww3c933uel9t03tytb60rykt5gcrndmwoimk4m77x2judsgdsw8',
                username: 'ajs2n82mscbnnmrq5pdvnlo42shwvyleev9mclidhdfsxkykrk08bpsaexa5',
                remoteHost: 'nirbb81t55o5tz2rcy7gap4wgafa2eucd419z0x405ydnsduj8xaig3fw62w7phju95uhz86b7ilqs3qshaju0dh4gs392u6f2rg20c8dt8zndb1jqsroc3mayfql5859tutzfomp3ajr4xrryiuzkhuejpcoy4a',
                remotePort: 5303668194,
                directory: 'wmrx670mgn3o309cppfaapjrwjl3l095vg9a34yy35w7xpmpq9hygye3rs349kfr5w0ixex8k7ll4lt1xruj8dei4z2topx28fivg2so39qe1qf5sndun11h8o0s49iv1y7q3d3yxumguqtq76w5ncq1hxvhrhlshzcb100q5ltkyc2mh0rvg6bzisiuw5635kcj4duvmbztkchq05sgghbv4w3r7pdxccxoilbckl59vjkts85ve2n3lq36yexh5r2cdcdo38evvk40j962xm4ngf3jicr2pa0srf1r2rlz2k0yl6h6h9e3an6fpcynhmkoedz32xv12jup01aei5j4agh4lfrfka7xvseyxwc6iopd9qf7e9oko9ywrugq0wq00uepedh78ou3hm7uf8zlfeqq5dn3dgmlg64e0vy1nasrt5jog0k81kolap8pf84h3fpkg4mxqp0qjkrj4gr44p3mmtaymoosd329tbgr40sj1ao2omu32kddnguqfhnt5u2ts9roc66bp2d5z0q1l5ommw5i5ux34jqalxf109mfs5m1enlnagg3m6cqu44u4chokg8761mrhzlg7ifo7220vd7tnsawfu3hfa5dqdz7dbmydr378o6h530ful64lgrz0z49fhs87308leu7wiroxvi1rrhs0dp23f8ewvr161h0ulav05qlgxknzgszjkbtgvjirsbssihj6kdx8szvy7qxvisxq21zi12h552klb68kvgef9lps83yqg7r8l035skxa3ed11yf1zvkhkjtakl8kemaevp289jcts42jpg2dtx4uzkfl11mwlf60r2oj34nj8kbfasihtko7qrzrpm0ol9x03soje2zw4356hfiw3dei2bbe0zglksev0lbilgk5k53rjy60y1l7if2rxrme7yh3ld4kf835j4e4x6cwr18yn7stpgridoodi59yav73oag0fk6xrbjw10ovp1oqjuet7ntsk0rmisrbfc9yti0mzy2lber',
                fileSchema: 'e6wbp9spepc3yx0eanuup5d8269etoion0cfsusmqulyf0g3jayc87a2gyg67rxvujkmurwx5j9r5tcav19m5vznswzd6ago8u64t6wwu3gw22uixtgbb3irwj580i6sgqj9mw2jc4tet2zyxx1kdwmh3gb552xl0xpvkuwk9ggvc5j6bfakqgdcayotkmzk1w8ffn371onzgh0ttrmjr35qpfi8l12a7izuzpljn8jjeq8jeikrnso563c4s5g1902bo3hzp88pzxlo7joqraddya8svzg46p9avu3i0wiqouunz50cqwcs088ix9j7xbrhdropqchx562bdbeldwenxa816aasn5dm38uv96z26dszqodxo7rdistzkv60f6s6owc2sckohulaa473rx08x1lkdvnirz3zf6d1t63pzj92ljfwcaxihv4gbon08g8t0wskskq78e4d5w9ucs20t6cm9qhmpqie7bcrp0r3sy84rll0epkh3vikp3lgoi8t33jhf4lr9nxntn13srwwoys8vcrvsmqugqd29p99jwdalneozcrdjf5rbu2bhbws23q0esm0hrdos02dtrip2av2b8sdyu91y0l0t1jwft39gkniwavx7iclmbexeuoosicj0atutnybx1utb5kyjkyqejbgnumait9vpxpe9s55pyzdd4gjtyv3z30vserocz19tuopbhjogfkz7aedan9ffwkpmjqpo0qziosgk42jmucolvr1c7jjz1yyduhti85ogfum0xvgzo1i21w8q4aky16wb2e0zsaeoik8kx51842tqtb50gs6d116xtg7l2iu7vmqcxq7pokm0hvgdjhrwvyr7pb0o5cdeejjz9wwgky329m4p3gme4rtviwfc2gwgsauza4kbci0kfm1j70zchzju77vtxo8u7r8oyeaygile9m5uarhuqddjc663a6sqzfzlnxg1s1ka9q4d8om5f556g82em9wvud61pb98begmqormqtok0s7',
                proxyHost: '1k551v3ehuj0eg94qwe2bmfhjn35q4kb38s754di5gshgz9n7unikfeni0th',
                proxyPort: 3739375821,
                destination: 'ol36lzp0pntcgpoq1makdzcv76o5wyn9rk1l7uuv5uckm3tfzvnj27ucpyqud0mcwrweixqjf0ayh299d01hgbjaw2ywm2lfl04hd1clz80u11yeokihi86ejt1c07qp0ccrr78perfgtdsd23xfn86438h421oh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hdmjxogfvd5hoj7lcrquqidob744wghz4epopvugxihqo5ckcgnvwctl1plh53rca7wrcm55xzg578ixutw76zvcq7i290d8gjytt0sxfueb6xu467addw2hnexbxeihwpgss4ql31eby3wyubgwj2j9xwn5e4df',
                responsibleUserAccountName: '2dxnuljq7psxhgx92hgl',
                lastChangeUserAccount: 'oh067gpoqyqw48yebvqt',
                lastChangedAt: '2020-08-04 08:21:25',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '97b2mgp6wvffyg0q5qpdc237jkujz887098ua6qq',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'tzv93pljtuebnkftgoxoiqffo426ot2sle4upvlfi3redt8au0',
                systemId: null,
                systemName: 'refduvctt3xcpn0j7hwc',
                party: 'mxoube6furdfjcjwbtp38ezuetsvttto84wcryimzqfjot787d9z7hpgcswyvdt8o3wgh413s9onpmthm5yl3jqspb29ofnenut6yegty7isuu2t9lyzsjrqnc2wq3abkou7yol0pwj7nnm97m28rsaudyhpa24p',
                component: 'j8ah1ufj1gpqy3420d24gb1fmcole112n0bnncd73qo3qppxzei4hxfzmh1d5qr475sa8yiwov7f3xoaihqd0wyi3oi9fv49tfoakithfakwvmhpzbvefshkb22iquasvfkmqji83pnrh073mft4ujvtjp4fb4aw',
                name: 'vmszsvkuu1zp8qjb73k22auqaa8vyf59mw3bjjw5akje4agu0kq1xef81w9entfcarodc5bl0ajcg6sefkl6w8dphrxgs2l4e6uc2aywxxeh0qbz6jej841b2gvdok6thec3cfckzry0xztuv6y0ywdr8eh8azhs',
                flowHash: 'l11r12ptss7ozpm53mae9xkhm1trf9tlyn5hx11m',
                flowParty: 'lw5n7p3195lw7a29ktdp5faharmoyykb32ydkr6ccwe96q3fd01q3ab0e4zyk9op7g8hoj9tfkacc2bhcl930j7zt5jbf6ibgmx8v37d4dk01hl7jqggsbj2pwvk2szhj7md4xw4140yszuyi3kz50k0ykq8m2yn',
                flowComponent: 'nku63nqrcpmlt1q3jjkx02pi85im7jus346wdpg82ddh13uapkv768nk1i2s0arj5ewtuqsq1ukfs4d241ernbykxm2rvelek9cugj93gr0p324hprb40khe5n8n33h4qhl3o7pvc5nbdp0qzd6r856byaf0agbz',
                flowInterfaceName: 'waad5waldnskzf8iq17q94h6plg1j4404hyq21yn2sebmflkecmdpqsa7rkerp0cif6a229rbaf9ps0qpdlxqo75jb2n8gfmweslthem591c277u6wfnkhfuduywvnh9q60qvx6yf746rc0ws93qu4rfqbol5h3t',
                flowInterfaceNamespace: 'rzalp3poz8xljgxgl79xzpvvdgjjefot7mtexomcxb1ybk7ssx9t9vk3uzt1ija31iauwzq4fh8f29yr96lesbl42rxfpsxb2tn1mada1ttws3ho6dnkmam1t83cuuo967ynvx48spgj5yr52ym465kdchdr2rkc',
                version: 'ka8mm67atyhorbrr9mrm',
                adapterType: '97z0jd4qldd68dlq8dvd10ajrlp4use7uxt5qgzyqrmctl65fhmtm4msajm0',
                direction: 'RECEIVER',
                transportProtocol: 'urziugqmcnejbcdmff6xqld56fae5qsj5hnfb1btyk2z8o5x8na9maxqxdh6',
                messageProtocol: '11240m7c1mja115xeqe35kkp7tmt6rj22auvzsgwvisn9z045qws07h9bwa9',
                adapterEngineName: '9860wt8kvh47fabp1tcovf0uo9r6x6vzgxx3hmxbu6wx2hjcyf8yy9sf29aa84ta69b1scgu3ver9eutj1b66txerbq9kfe7tozs485nh8matqlv624iu41omo48y5d2gnv0py4bg08k7drp41hfix08qaw0i6g8',
                url: 'mytwe8a5209n5mpzsq3ul7ntb8zu62gdy1noyounxh4a94xrvlf9vqujdt3hsf1d3rl4qevjmkmz1ozhyd1684awlaxze8bero7ljrogx58q012avbrzke2l8ydlnlo32sqouethmg6of9tbi0i6mskvkb8mrgqfzqasp2ej8f0ps47xum0tr2ek79wt0txg8jnz6jsxhr7gxyiet5zhi9f3hteznbs5lncvylp35adyza2n5mc0hzjwl8ytnjeziugwxue5pb816upu22k20efgoa9nfn18drpg0syxk8x6aynzvxqyd9ueve5i5ams',
                username: 'a44lcr4vwpnm71w7f21tos0rus6sm6g0p231wfbcv4z0s8a5wj6ke1bxg8bw',
                remoteHost: 'ijnufhli5ptmmnrvx6te19fruvlknkknjtcqnc9c3ydl9rs88a6a8m5fiv9bowlh5j52sfomhibz8lavzizhvtp5ufk1qatttztp46a3eck5bv54g8i1tcgs6hoky3fcjmqi6j2w7nia8a5is8k2brrqz0otege5',
                remotePort: 8681307401,
                directory: 'joxz1ov2lcikwuu253f25esgyy93jmfdm6ofhk5e1fmjo1u9a7zu3g29cywaqceq2ed9zqy5umm6jlsybv5q49qph3sxzc0endh8rvqtqfvbkci07jxpkk0kh026v9hzdtucsd93440rwek47vbearxlu5jpxk1nbgwo0vpxh0c7se6veiy1w768onv2jpxcmvq8sleppq01wa6me1h02hw5qhnynkcfrxki0ceyypsqja1gog1gdjrhtuls9d56v4asjvcxdw5ocni8x7mfmwqdtgaa0hl4b9tga3tfm2tifziqigfrgwfo4gfixkjodshzmr8qktfejjwen93iblj17yz35hprtt8i4t6cbq0rjmm1sxoqi6c4to9lxy3f9u91qpv9tgmwdrz2ruvbqqtn36bdzgenbukr00zzgqfcb0kok6y1wpuyqdxnksuyhgw84y0pg9d7kci43v4dpo72c15lduika4x7k2oppnvy4n8lhf7dwbuepiaoz93ph04gexg1yx4bd47uwceb66mn8oxvb24choy0tsguhmqykowapp2r2z43gdb0kj30rnyl4b9kuw7vduu67h0f52t9dnkyc4mqx1nwyd6856e8ly87js8w0eik3cxcfrmwowxlpfuzj3oqh42oa8tqji32je23y8jvxt5g570sn7lvzzc3wsdy8gpvyvp5e67i1c0w0j2zeyzvxa22hdn446orupp73rkp6785h95tdrbof63hk69b90gq27kag3lftcm2aj0f7us0jtjd1dz48ktarxzta6hd40wm98u40wec6fiv3dlqqb0to2rkke03quzl8s28n2xrlk3b1y3blawqb01myjz5c38isgp0dj1lp4nrc1q0rahf2to0fn94i8rnwmags5c8202bxe6wwat75ldqs8qwqrkbi1bbw0xk8w0p416ed0lhwzno67yoq2lfe0x8cy8nch64ya2k2vn981sj7b13rq17vp18vogrdrdsumtp1xgdujei60xv',
                fileSchema: 'l5u5xv28coc7ncwbb113vrswi0wr4skn8zdtwwzqc2udvb6tc9t5ltekqxj55igbh7qv152kbbo5qnk8twslvg2r4jfj4pun6abkz9i4iapxwo8yzpn3d423n3jyn9cnxxz05ysq75e0sn1q13zq4vnze1dadxi8pvtatp46q5nznui66jusbwkqj9jhy358l92v72defm3a46n4ktwexe9fsvmb1vhtlv4ml5r92o5a6i68mu6ikvdf2mw2r12hrsmaze5xpea5eoydrik1cue9ukanarlj2wblr4a8e98ioha4ub0u2pjqdydgtyext3y9kc4nvqli67lqc7u8thvlggfd49eqsvjsddpx1wx419ztpijfolfq84mmo3dtmthreczgzg576wjdvsiql1ezdnq3pb1oejwj5okxa2kszm4py5u8leii50gwtcez3pnl9qq2aqkjfjwpzjxy8u676ev1v8m0su5n67v6eup50oybow11g2zldo6k3hmichxml4otnku9m1rioe7fis2t2l96icktiwwdfyrwbyqgh3qwf84tdw89aziekvbju2vijnxculpggt9njoo86mskekbmfjlztpqv380zklduddiis23q9lpriu4j9mzfb2ddce9x3faa47usqn37fas4gizokwzdcvlelanzmbjx5su7d3f8u1de0n2rkmglv4mvr49z1bniqqg1esx12qaxwq1h7faln37g7qzlv852cpl75foefokx3lrcuu0lngsxi1wj4vb1jlszip4h39ome27tjyvnbxwc51rd49u9q1dyp5y5tvuclbdd9h2323cph3pdxgkfhwahhmawirrsc9oelxg5iug1v7k0z1m8kdid40bvup51vjxq784bekrhzgj2n4wdj1jobyks01c1sidqzeunt1dmmml4g3gz0rrmjzdkkrt8f1xg4utqlcbds4405xyc54rm975wzuf744gje1grc9v2sp96ecdow1bd2k48xo5iyo2wt8ec',
                proxyHost: 'ibq03zb9g3hih9zx69jn707ra3eyvhg3vcq2n6utc6d397yc7xx34gmp05y5',
                proxyPort: 7470123361,
                destination: 'bkbxbif775ttrn2helj1s174vj1zrqgf2j0h0vcto8c9iwxojm24p9oagxbw4u9m9xm764wz9h67iueix5el4nyk8s6ieh7gqcmmtzffyla0fnnwz52jpeiv2p3i8hhngfs2akdsu11fhx6s7qm9bdspdkx4l7tk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'e42dn4gk99osjjwqnn4hx7d06zhnmywli4zqkakcgnb4pft2n4jhduyc0k1tybhm49khctqtksadeemgc68u112n2o89jnllv0d2p6cqycf8x9xv190113wqnmi8uc079nc56g7oxcdw5i729zjeth1mzwt9mogf',
                responsibleUserAccountName: 'vqm3pni2g7mn6wsnccjj',
                lastChangeUserAccount: 'rujgymm3d7wxtcp1t01d',
                lastChangedAt: '2020-08-03 22:02:16',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'iu1ofxrooiq7d8vrodaonuyqkdjjoaqhdfd3o00p',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'tg3lwxnx6spb8iqn9yn5wdie4caa9fvcwb5zzb60l9ilo2w8p3',
                
                systemName: '0z2hpwla9sh2v4uzpkm0',
                party: 'd1balkn87t10fz8cn2kedzhp45zfr7ug35q4nbzupl80dt9zyzc9yztbcxqv9heigrml2sda4cj714w260cafnmwrhwoh58ovrx8mrmpkt6jxypznnffb3fs94ah2joezitee3v9psihfhvtbw2o5egnhf935yg6',
                component: '17zn8pijhd8kfvl4u1ee1u37bbmwshn3weyl3d8npundloasztgfpov3uhmbw4ich9wdts0ui9v00dc2viz97le9peh9t60emlb3alejwkz2nk26rcynn1zbqw9e2vy8xsnrkzm5awr4nifagprgvjhnkvl7sl3z',
                name: 'rcs7rbtajrpbyqmtn8dd39siuuh3xfcuhjsdp2v7n4uern4kauolp3g8dglq0n2y9x2ub2qrg4n6fe5k1wrb33fn5t4n8kf6cap6zl5nutpapet221vji2jmlyzsxjwq70jzqbty7ln90yuanmj20a34gwkx549d',
                flowHash: 'l7jvz07e8o1z28ti0mowrs2kidaw3iry2gxc58l7',
                flowParty: '0kysvuclk632uo4jyldwxye6ae4511st96xzxpcpefhb6kp45pe9pysbjxorg8mixrryh183nsckjmblgew8zbcb7p5i9ibfr3iiyvws2k8hzyhcwu73nb2r7xkmkdan3s36zx1au3sy6atsabh7bbvptiq925ka',
                flowComponent: 'ha42kmhzqrvufuiuzfrbnuiecdf6yqucabr39e8mko1prlj22oqv25lobqeulcmklheludn8ktlkl858ctfmkcubx1wnob8evoi3zabou9j7f31ta7ys30fkw537qifiv29ffnhtu1yerw6kymqn2lu8lptldb2c',
                flowInterfaceName: 'h95yvm8hx9w0kdg3tflm607vxbzxoay26rm8picr1ghe2wxn19skdzxz6z92k3og18azhihdj0yem570130cmueg38opugenvti5sd856dx46vcb9y76k9y6li702przldufyp2dvpmvurt2581w4jmsoiliytra',
                flowInterfaceNamespace: 'zrx8cw7ozsaoupoeyzuwpo4xsq1pc03s4ebhompegw84lmf9v4kzj9cemauk1a82qprzh16lg8ntly78hkrnwz4x35s80vo3yc094nk49yxaxvdpaza90y13dv1oytsqrof67tfo92lyeztflt2afdrypxjpzdm7',
                version: '8asco9u7rodo9bsb606g',
                adapterType: 'zh9ul6v52gcslsh2o8iu9mscxijy02ukytjfszfnjr8tzqrh5qotdkx0cy7h',
                direction: 'RECEIVER',
                transportProtocol: '256nfrv23ohp1l2j0pmu4guwkbdcaa8qi42f6otj8ez6gklsmy6r9eqtrnbb',
                messageProtocol: '3898jxqlfc4p7r3g4rz4s0zr9ytebp8s82dtgynzos9f3xt7en44jsagqpad',
                adapterEngineName: 'orzputvv5sbjrknyfisyy9too47kchnr4b82f4fsfdsjdaehevqoqlpmm9ecficoh90elbsf9y0q3pduy272sfqjvzjz3yk5c4nd5chzndc5uxh15ys1ysgorunb7l34fvf2k45iwi13ww41s1p5l2rw023p3e6k',
                url: 'qptgid2qe8bj41drm5tqgazb831swky0v377v4pkz4ml65kgwfdolth1owk2k6mnkrc55ndiz0fezd6nzjqy2xpe8aubs325bc7kbv8yygtrkl67ouhlspo9q49bjvpczb15l36k1ac3o90iw0gzt39c3973t5iyqkxcvbyvsx5q03zwqfui0yey1evbc4fy0inx5ekvc3h42na7f1q82l9hfec4084yl4mpotqebd76jqlflz84iklw41qns4wcsn1122p3l5n7qzyfjsjzy6mgnvwzo9h9qf0rtm9qdf14b505aqy6u7ka1fvhsrqu',
                username: 'etewvugafxynnnxtw00brrwbqquom62a6lackqj444icj2dbct3ekupna14p',
                remoteHost: '3grrwomlhtblpm67ek68ashlcgdmckn3wqevg3wrufjkiybcofvbzbrj2cvcyxwwwz856toej74t7cli9gyzr8ht9qriqsbue6a58yqoifyrru2lns1m7q2l6jjslv9x020s4yufme3lc0t5ylv7tw0foxlfjd0y',
                remotePort: 4140289985,
                directory: 'z1n60l60lixrrewz4so3pyhm9zita2pbqnu9t2tjrfsbucegw6wdjv5bc5bvielps7xxeey60fmk8hffwcrzhwrju03eynxuifelxoq6mamxdw490xa8lmpbmrvyx9g9ejk8rwglh3gqm0vqvtoanh6e5xsiw1xc574rdkcozdkmeqzl2kjl4a8x7y71q4giqp8dtshn38piejv1pshxbkdyuv2rwznhea81fvqrdeoprjfyw6tseg6qlqevapevbu44fy9kx2oasyfib1u46ng27qzs8lj38gfcrdwstorbrw97z5vpfyysbnnp5rq7gg4h96lz4okxmij0uyy4dfiup1feffjxxfuvnx9nco1bq34nootdoegf5bko3n54npyuhcxq2vny4d86i53dhpupykvrlgu14r1n68nuyfl4vmvtu3pybt4s03b12vnaumuf9sivttlg0gwkpmz1f3aovdpsvgmjx2dvxw4qa9e54shld0bugg20hg6p29f7fv3hjfsj3ico7yo91281r5y99kkm33il4l7bfqv1bbed8mcpqqgbqxcnkl29t0o1tg1t5xtxchq8tuthxapb3r8gvhga8tcj7hgpgsu1afafgqkm9mkne7qfc90giqmsnewwbicjbfd2xsiiyptaxyyuhuxhubm63onxm7exub85wfcdlon2iphmvhmlewkse4h9e4fbmt1tszfb98nzpkp4oqn8gacpvn61e4wvy9pdrel6z8ijy13y6lxcpg07k03cngzq6gli5eua6n3sdd1zt2p99migynb8zoe58wjaz42cv3bqhu5e9rtdy2t0dmf60tf4fz55dz6s5yvvc8zk67ozr0nhgnsfzt2czoldz8jc72h5fykiwsi7qntg96j8ueie51hvn84jyaca4nyvoheytn1hwpd3ls1cqxmhylsfv2q18d8qdzh25p9c6rvxiyvobtipgsa2jdk2vno090ed1us0m1bpl2av6guuml66mycvd4i9vocp9aao',
                fileSchema: 's3opd5fgwq8piuw1bxwzxrkhbe0b17yh5hl0d8amlsjjcqgq7s8ll68b17zceyy5xh9dodnrmdc9mbpf25viais41b0ewpmki8iolifhmsybylqsqpjqscxu0towrl64o9kpfrjnrazybql9te3tef9ze9dwyqobfzcylp94b8dzfeieoj4ur2xojso19cio7sovqw8kfiaxcq1hwrbft85iav7g3ehxqlcduld1ptgf4efzbucqt9w5l55i45cigrcuq9gb0mw5zyien399f6bp6wuj32z3f1g8qv5uhku3uj5r2ghkqdknff2i79eb9jhszf6e6wqqpapuledb35vbozfqbcxcmfftf4rjc5p1g0mm6jgh2z3nm04hrloot63egh8lglg6ukir2pvtlwk5e6jm2y5o5c0ddrbi0xedoi7su8veoudcso4drufod5mauqpgjsiroqteiaj929pit318qt5vqlw67b3s33nt1tuywtkbwsozzh76ds9qac0ubwjxvi954z8220oi0yh6hc630ngas2z7g2msew2se2vmz4dfk20fi68m9p1yh0193zlfnkz7hln81jf9tm8y9iozr41ddmofch8mzxcgudslrt3sqksg6fhdmmwn7m8jyu15si8c9ielwdtmp1bxutphutqs0gogzflq0elp4ecjhfzgmdxvy6iutxa6e1x9axtbyhxippzr7uns9pkr2gf85ngpjq5dfforziwmi465q21y10582svzmen59cmaxxnndmdkt59219zm6u34z4h03ch6v83x6s8g8zind5tu5oy3drrjiro2utw00sncipbzi4xmnyartas4lldksaoxxlwl0mum9ss6db1ns10mheti2ce69n4pt7lmozumepj3zgp4pdhlopffvtmdvqtr06bwlwy3auyqcjfgxmw35ggqbybnm8e7qtartjnuikeihby5kq2qwyit1acxh2f1v6axz01rvac64ebzsjl3qefmb3rp3vpvbi3z',
                proxyHost: 'wui6t0z9nmzxmosa6aypgskc8z7j1sehlanp8evkikuj67dvfrw7g8p1vhxg',
                proxyPort: 4580857099,
                destination: '5xqbjouz7avsd8xk0qaqghopyg7przljtzoc3j6ij0c7xt4id12uj0tbdwaeciyfvqv3difvyxd5qmy5spcbsv8lev43an4yzvnvqs5rwk92yakw01l6ljp0wmzy7p350mlr9svgkzqyho0spd576dz4pcpm28xo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'k8xoofyneu2l5vxtflpw28az8b4yynmgypr38yzqi52d2wpy4q9p1ogdfnauquw4xg1ddbahbspi4op5m9rz4ud4hlddqhuqatg43an9laibs0ysypn3t7zv3e3of31wltavtknu5c7ttpp5kpody0sqgfmx68nm',
                responsibleUserAccountName: 'ckach89immgyrnkly7vy',
                lastChangeUserAccount: 'pwfaxutpixxn8e959rig',
                lastChangedAt: '2020-08-03 22:05:21',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '0rcfjjfl3rtvwqzfa8lrpxfw2e488yvm64cbfobc',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'mql7ci2lhjzq7aodk50g43q0v2zcug0wyz7c70ic2appfp48nc',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: null,
                party: '00qlkeasr07zkncrfgjge8aeoi2xbaqhnx3zgojgfdenb8kbet5qdr3i6pz3guhfr5mxht5kr03tt2xbcnwhhkd66rrdsqziavdgl608xnf5ilzkuvfk3i5hv3ntnsoyf9k0b1387gm4zpvfg55z63hgf4si3ixn',
                component: '1sa0gh99g3hc76op15k80u7zg4j4qrhqv38j31xnwi36jw4ff6roenjv7vpo161eei531u0odsv26uytu6ch3aag9i67c73iseszoyzm7y8544gk6kua60v7ecta9wjc3pkxf991znsfj2zmpyc1aenr8087xen3',
                name: 'kyc3s87kfgg6imf14dfr3vn94b9qa0hq7ydelpwlei7jg8cjezp8skn89xynt01k6lkdcelokhufm3x3uwshwsdwkg9b8m6hqizrsf4wpy6rnkdjr51v84ghg630g2ohaeqtfmok99poii5c9z4rclaehs9djidv',
                flowHash: 'rn3iqq4s6zouo2umycca372yz6rjz96540zdvft8',
                flowParty: 'wrnxbxdx04785uej4bhfizwdo2j1eyn0fndkpk5z3px5djxefumszhkhjmah8alhtyzn8r4iodm0ld1owvw6k8hlvup8oq7k2g7not3p6o20ksby2ofvlxyvgiavxpqhaqc4d80pj3bi6owqh7v5s4zrihceei4x',
                flowComponent: 'euj5frkuhpy9kbzd53k7snhufx2ztenyfj6d2v6c9cxttfh7v9me0ilxlltu60are7wacf3wzg4etjm8m7q8q3dm0pioowcxq2ricz716cojxrtxxpcx0mho75slxcopeuj8eme8ljlb3fnovdilk6nh8wb555u5',
                flowInterfaceName: 'd50proxs00j8skm62rb5dm2a708cbtnzb1upaw4w28v8tmeed2x4r3upb91v9k88klf85ok8wwyi2s03r1454edxnycaailb66rdwr5o03fsg2vfgx94nx4vwxes77yy8y3ioq3sxhf5sb8t8giv48hf6p938u6m',
                flowInterfaceNamespace: '0m5kv280awjgy51v52wyru735y6ffytd1zsl23u0xu8nmkezjfx16hwr6d1b5co7kd5hos0lzj3et4npbk3gagzqjbj1m9g6zyutevls4pwgkvzbbe8qe7w3qjsptlpqfyxanoe242gs2lbra6n1j1li6766gqhp',
                version: 'jyb2pzokkmle4i8wvne2',
                adapterType: 'rzwmaix33an7m2z6p4wpgqos29llce7erdega98v2sf9oqfmi5ozj564tmc8',
                direction: 'RECEIVER',
                transportProtocol: '4kcevaa068g08rb4z6je99xst5gn86bczv2grb90y0yqryyz0dea02swvdwh',
                messageProtocol: 'j1g8ehvcfwc97wp4r6jyiemiwkaps4dv9ys4mvc2zom8zu6c2dzfg3fkjrhy',
                adapterEngineName: 'ifltxgsqi9ufiilsk90cs2fg8c86jkcn7ylic3rtf3mvk619kuayll1o43io963ojooug5hgbx50ww8ke9hf1tw2esf63dvxw29i1sh5akbnp9q6miji55c2llzme2u0z8ukb40wi3q0za6l046rt0240wwj29kz',
                url: 'qzgpvy9cbz6vzwu8uuv06bfwlvge4lwlmj9ny9472gpcamroiemaddabxynxnt4msu7i5yatpdiblbkpiip4ezkip18hfo7o76soxiaaj3l6bxxlbgd8nx1pwj4ejka9wuknv10hh764cxwu6z6rlwxkv4jwvqhv415u02ns6zer8chq6i82iclupvxd8qtn917rjmrphusjnfnbgd323peevlylcsky0xy2tlkk1wa5x934sl5euam4mblawp9rijhvent7ihlh3ly59qntw7xi9k091b8wrlpc4ky7rr2ibuhggwetaztp9y8nc55n',
                username: '856mi48do5eg2ynq3xvmyi1c8dmfwo4m3gsqrj8hixwkg8l396htb49z3926',
                remoteHost: '14lpzmbx6ulfzpsgrsayppksydr5361qbdw48qrbmb7owcxtb5cvwcu50l5st6yefte2cpwqmcy1d8j59dq7lveq3tl2cetrql68w8gp0uqvf3l4tw4k2izyz2ffsbi8ynqzeas1gpkd0k1xmfb4ehdxt73agad0',
                remotePort: 9370185255,
                directory: 'ljswxyrrb4sqya975uc80m3hbg5932y4lnbegoygvke7ugpdycryp1ufhikpza7hxibfb304vrm6v530io74s6q80hzrrblv4c3ym1t0nqkc321wibe2057ogex9kb1xp2ddjn4q6xi2ow8u5ppjf0ji0hwsukkeqsp5aa7aqmt9v34jdwqj40ytbymruse6vdatxc818ne1e9bphjgsy600w9jf878p9hy0iabq73ynzpgcx057ao4136aqq1os6o6ne7t9ftulon2e43aoijghqxotdlqb99qsmh1nf1yzee73481tyc9tke3ytimhj1kjed54jqk8llfb2ma98rjs5pm7c23g5tcc07xtf6xs4izw4gjw9c9i6zotzc0ukz1s0i6x7iu3xd4d7j0sbon6uff53ojk6neold5q01r7br84umeczk3tk6zhslr6xehqsdvc81qgxyv1t0g5mlqtcwan8fvcwmemx4wc64rdjuj2dbdp1hbuu1wf1pm5ofvpanjran2mcv7eib3irff43osnb216u6ziky19vb4zwpqt8lf9ylx3kz9723izs45nz7hghouhl85rsi7rxuvm5gh26zune2ai4dq3oyonmx4hf41e1nctau445ixqx1dg2uc4sm55p4l8g3gxb7nusstbyliswly7rrw37x2669va0twx9uky98t5alkhkq04urouu31dfc0iqjvsc7byzg7fz5vm6i1zabptuiykkj2ipksavyjsp05qzu8v4ek0kjfftzou2k8n6yilit4rl5ync65mwld2so3gr2rb7zig8m7k6zmmafdrguekzem4mkgvw4vdwitnywbaijld9w2yldjx474u29i5nk6jnzbgd5tbo84o6g9zm5dg7obv69xxhbwo72fg6zpo56z10j65ea0805x1949rnhwdm9kdipzk0sphcj7xnewiju3pjb6zsk4avkpcsh0nbejbx7w73rgsimzo0efgfdck825of4blpedz1bce590s',
                fileSchema: 'ybrqxg4nng4engibwcydnk5njhzhyc7afql2cloybxamib6p4g5bag9s14nvq2u0losvtzsc139651wdnlp1b3slgcquif01ca205lp8ctaovcc3nxv1euc6igw4x2wfcpjix7y6a2sleasu2h34maga81rupkzu2sorisseluf60k8szq7u5crqzl6ox1rde502426qlplxej15adp0wjat8f13xdshksfj39nmcq5vs7fybfyp9j2ax8rpicfm5f3fa9bkhg96b6ut62wxd0g10cey0hihdil8sg74rma8u40gnhzxugg8apx58bv6k1v65kgycp6sfzgyqq114tsgwgxwv9l2tsllaegrx7hwoq7zl8t2jwj4hhoc3qcytbhecu8vaf0x28njaik4e9dimsyxg0pko6alkutqzsfqrhe6kcmuf5yrz1mkmlak3ps6i7bcwtepmpzkstginc8qsfhrbuh44gxv4x0bo3khsmf5w8s44b0dsncmipusv0kdeow3lqk17dl3wueww3kuj4a7fl1bx0wmq2wkjc41ccnhyap58dqog6bfopox4t0lmvmny1x7klbi2hpauhq0fhq5nzfsjobbjv9mogk865jb64axuradnl3vx46l2709jcxhons48rm20ssuwsp6zt1d6ys615fs7612mwn10wyl112iycsf32a7hwxfhryl80jqj6tdf092v302cp9arrljsaf1ojyod52042ct1u2xwlql1d4z42atjnry8vgczkq4u604cau9gmlrp2co9iir0hk4l0ja89qufplxcqfp1992pscr4mj550hwcunm8n42gsr2v0w0fgrpgmzib79tl8oo2ajpt0nn80yzgi50s692673hkiid5rcgsm22pk1g3lr2tf421v9c0nyyyc3csdaftbbm8re67m4k8xgn7rt07woxm9dqsj2uauuae9cbb3vgtfyirnyiypfghp3qzxlnoztf73pw0dkov2er7fg1p9rfktf8zq8a',
                proxyHost: 'fiv4xzyqy1dnknmgervcjbc49h988y0xjwf1ksfettzw0mvli7rjrsr5f9eb',
                proxyPort: 6454670166,
                destination: 'ose777adzq4vq34kmjyhr6c82l7y048tkb5cxp9oagk3onidoit7xwcxbevzzfsu6634tc0goi2d2o412ys76ypk32i8kh49qyy3zlnlldxx1yaytd8q5oflnvhf1wwuxke0ed74bbz6mdz2vvot1keldneivxum',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'mqktzyhbdvroa0f4czffynih0i3emf0vleg2lae1peqf6c9qf13nd1is6hy8sr7fgw2me5gau1a825lgo94hntbtpsx72whqovp6gdtm1hg3ytb79qc2a2o5ighblrivd5cbxw8yb6d0mjqnoixcvrc85mg543zb',
                responsibleUserAccountName: '97tghfd8wxp8kwy7eg7f',
                lastChangeUserAccount: 'lr4s6mjtvpzk04ml7i72',
                lastChangedAt: '2020-08-03 18:48:24',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'up70g2sgttg53fq3pvqta5go23exrgwvzaotnszj',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '5z07agevm8ikrw7gc62cp4z6l38f0q1p59unfiub7cnk1v6uk5',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                
                party: 'xryhrjz5dri6ouxdhacstsnbdfzaha26nugk3cnifcm4kqmhb09higmfcr67pygbe0v7hdl171yvruii7fk3r16ymxnicitg8mu5j80dwq393i7xgrtam80hc8qv6omquwn4envrledhmxnxjiejqez87i80rogx',
                component: '0h8e57tex8rkwemck6d4s97mdztaoarjqe6h2kapzg4s2w9raiqrtfrc7oy5hzcjgu7p8tbhab415jog99jvfdkr4fr048gmwiwzrbdpvdbpqzkagabuq0sbqcxxfpy7okckkom5knvgegnhoqkanfdjjm3xf42u',
                name: '0rpu0h91ju4ecawstl9yksx75f7bsk1d38im0av9pbw3rzkyptjqxnzrg3kj2l76l6xgc425ywg0okxoanycc29gtfcpbcoet8lfqf28npaf32yv7ddozxur8bf5ih45iyrp42a1yhsssij64gpwkahq3zc32lw2',
                flowHash: 'xuzqyzq3edodysf6725h488jiph0f4gku4ecwcrz',
                flowParty: 'x7qfxfa0aljuc7jog0jyfjgwg8fxu4vh2c2xj0ivaghkh97hbhdcmj0yhf6twhlinwxstpokkwp6sdsb2k5r7p7ee6gbtxfuj6kzwid0ir9fgumn4n6rxfv1nl995j8aryqshyreal3h5sjizvtjit52cpu4e6h5',
                flowComponent: '1at65bua9drphkl0qc7xaqgp94t49u6ustlzus0chz9mrxxpn0v9v03rhqaegjgs8xd8sr6hpdllmh0x7en55cif1fhm5yj0qusc8lbcxjqfnjut7nthwceh0snlz0r17l2d2ab5qybe1on4tk4yoyww15tr8luk',
                flowInterfaceName: '788v2m8hc60oj1vj8v235xd29goq2rmhya4lkc5eavng2wvrmqnrg0o24bkt3tn2xogvij9il98hgki8ub8jypav9m110fuhuojd7lrvy9mz4nzr7oxrry7n70ziazgdhu1k3pnqka3qffto9qs3q0qag4041pkq',
                flowInterfaceNamespace: 'nocdjkfixo5iv9e4g22zzaw6hm8xz1a5a1ufo70xufogc6k5d68xrcadfebya0nkq0lrxvmk8okm5b0eyna4gefncviixrd91pdrv9gkzthc2fygesms2m1gk2t0l28f3eaiiv2njv1ga6egub6rie0pe9uzdmy6',
                version: 'upfjo5as7cmkdycyzicv',
                adapterType: 'szqz66ts4lux2in2nze4asfdfku48c1afl67ov5gghvb6zanrmc6z04woimh',
                direction: 'RECEIVER',
                transportProtocol: 'bv8ikdcyqffqdfkmzz44ib8qz72mbj21zzli78b1u6clgyp10ovvqn9f47fk',
                messageProtocol: 'qulhi65qliccvm1chodgyjs6spafgtwp4rpplwzhty3yfsqsvwhwpvhju7wp',
                adapterEngineName: 'nenu9fr1re5d303yl8v2tdm8udvi4qy3ikoznsd5mg8rypkt2busta8mn1ey84rda5mo14ii2n51ticlhvbqzycxrhttkxtsu5787b6f0qf4dpuw869cfzs8xt3pixy4fkgzcy2cuzulih7229qrwbeo700aoa4n',
                url: 'ubya05fosh8fxvsrults4kzzkvm2h60gxz2hx7pl3i1ltxim4up8tqq2n9tf0pzsjolcvlgso4wfvz3a4r12tpzynx061wc660j8q2ewoxjwdip5ez93c441xtuoknc1ke3paqtkuvtge0rz0vm9cdeekf6zd9ffpg0758zbrd11r85nn7rn4dvj41xuyu4qx1hgoqhdk6s2o10277y56wnmimr5tbwktha63lhy4rgsbof1ju6mjaf8cofuoxa58gmz78ii79hi03nljqfgkenxv0x2zafjtfbkj73vdh5uj5fjl4600i15dwz5i8al',
                username: 'ymfyocsh3wwut186g4hbvjb80j4d0spn2vyk02x60p359ma5sm5um2tye25u',
                remoteHost: 'rioqhpc3yam2vji4sf2q86h6sje1g3wira5fs0ec1k2wiscjno3rrpebu1gkrrxfwqkobrc2m1pkrah25scyflr0wk0rle7tes9fbs30m10h8gvv165kznne54ghe5wnxyjctzk88bf5ds2lzucpv6ljt9xsyxee',
                remotePort: 8803496010,
                directory: 'ikcmfl0h0j2iq4xsa05kqvq9ywydgscebjzq1zrotfsyat0gt7886c8unyonh0umzbji3ixs56qvivt5reit2qis2et3uaxjezaemit56witldxnazl27tdy9b0dky0nnuigi3evr28294mcr12ocvg7m1bbnncsxzmfufvw3m5r5r4ut89kdk2g37qn352ozfs595qlr3c2sog2a78cyyd61mudgf0iczzs8v1n6nrzfife6a5vnd9e0uk5asolfgsfpouekrcbgo4ff2wx6gejfkztl4yzyq5nsi8358jo1l5giyk9j7yjngxi8r1zqql841s9t2qzem9u49c3uvca6sarosmbsq1at5tqpe39n9aowdus1rhlczhagx3au9fwzmqy16flhqicwnthwf4k0wctq4s48dohm6ilr0le04rhskacnj89tu1fgd3w9etvnwidssqtz4b7oz0bc4ic3g81otzqq6u09q89yn8d6x3akpm7nkkug91cppxlpb0zjcqd8xervdwfiyfdt9ux2r6p1xdotweaiq3g9cex1xq9okjb3n97csyakg1j9bughejm64wlorfnl4mvzvgx5pqklhq6xorjauu3dfgghy3cj3jtl1lgwg2m3srj9jjhlmbk0w51yzbftwsz4mq767g5bvjjskhepcghx676lk0imq54rj4tdby5w6q6ipyyshh9cb75oc82kvvj65cd1wcsm9bkl6w1eytswm7l8wa3sf5hr7l9qx6vrl8by04p52gsqwdwkg5tolzyl4wxrnw98zp7miqkqy7lrq4m5q144jhjvso5j1cdjdzzhxx27joui8eoqq8qofyzmsmc5rql1nw7qlimvg8c2nu9a0nnlqyan0hfwgb3jad13uphdo6fy6f5tbr8m4q05fl5zpihuutz04hxawbg8ji62gkwdfueocwcbsimka6wk8cw7zuo9fkiwmpddp6vr0ijzb0tbi1xyp393ayn3oijhhohz6hfdnjzutm9wt24',
                fileSchema: 'czhgog7pwgup0nfx06tzg74sivxjw42mriw42t43e07dloap8oy8p10tbz138hm503ejhuurbllndr4yts9pxj7xz0aucyx61gwn6xtp8x1i8ncht64ave3k6fs7f6il130dhvi12m4qozilidylsmp5q1727jpf49hftnuga3axi34hx98n3ybfnbbm9qy71mr5vpoyes942vphxvggsjl978242krow0a4fmuv05qnhuek97fl7t57wftcg26rc7sdkdceqx9cuny5x5cu9xelwq0umf2wrenzcsnabuwxncpjonftyj8sv7il1lxmm7mdz3vxli7s35vhhcqcbhzfzppz2acgzcrm6uhc9qzxwtjgcw24rt5j737smfmq0qzqk9v6dz6zbkzvsydhjn7ii69w7hpcvjz6r0zuybk1aaxkcvkhfsq3tnlm4x2k6kvc8v0i5i7tf3mhggc4h5j3dmo1y7c4x7lbae8v558pc1d7t39v5nr2n0om0dlscz7qmvqiipb438dqfpj47hi42np7x1snuvm48u4zhlyw0noj7gl9q9bke222g63aof3nmsncngpyi90em3qvf6syfu6j57xhkqnrse9im6nevxmhzucrok281loz4kd7dhvtwpnpaexyh2xmxwbzy7xqcg7y5n2cecqjad6uaeecsn9lymes7mggrleyytyvz55zerp57buqvl6w86e8yi17nikxysj14olvg3pdjsi9xngpe7icamtxra0rrsv95p0ih7x1mff0bxsrjsx0bnpdexdgdpqry32jzetbichbbgmhbxhi4cbikgafope03w6x93wxwy90r5ayja788sglxdghvv8b7onvktgbizawvsuycgke2gpj845tiwlqggoe1zwxhqqjgpnnjtrwd4oe2q9o0gcdmogx0ckb5u3k6fqhac0h75uwn9boyr5ix3a9e8lmd9mv6pwm9anfhab3yatsi7ye6acilshimf0piwc2f210y2vb4l39jq46',
                proxyHost: 'gg2mclfwbfzf0q6t04pjgoy7vee2egbaf6yjwu0ebrfss0x9z0mmng7xnwrc',
                proxyPort: 5973307388,
                destination: 'iz4iuvvqes5uvnd5yzk8w1m8k9dxs6xd2mwujsg8ntqeut1bs96pt2w42w7wka9cs55ed59zguocawmiomxeuwlh201edrln04fl39pkzcmiemz8is4urq63lnels6rhewm4crvr43mvh4abbu7uu31jcnxi4hke',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'psj6vsnq6ydts6mnvlof9t7jgylq0ee3tpf7y2kitrkmehvjp2q4mfmxas99bv3hkfw95pkwl5dhf8e69gzqy6gyddxca3plgv8fwsrz5vi9t4na7n4s5yhz2liduchlo2sf20u73jj7op6r2db7zwgqlbptrrkb',
                responsibleUserAccountName: 'iuz6jgbcn38dpbe7y5th',
                lastChangeUserAccount: '5f0v6rnd2nivxkzoy8qh',
                lastChangedAt: '2020-08-04 12:23:58',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'o0vxqnd52fvqr04k4konjud6sr1kl75jm1vfd667',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '8bzcchjnemuepbq8z0tysnjwzo7mcdqgb589935rdhxk8p8cpx',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '53ze72sgf69awc6k043k',
                party: 'ssys66byynbdisnduw9mvjz03orda4gezrgdgvp60m8s7y3ilo1pbkhze95pno0uou6yhbjy8t5cmcncmtvywqpj7mg87c1b4iyxn3xwbe98hnxswefgjqfb75hnzrvj9hxlwlvt8119ufydvkljpdfgi0jhu1s7',
                component: null,
                name: 'r3han44jno7batr08d6j4n5a8mgmuoduk7a2nkvxbeq5p5d9nt54zqc7la81670xv8m7pi2kunxtquge5bi0n5nc6d68ghi1w1qchltna1x3fj6jvklnbgb6foboahkp73rq1q9tt4k3bqigatkzhjiqd0eq4d5k',
                flowHash: 'a89msew3w94tnbb832zispnz4r6f9bnl5kgb9j0w',
                flowParty: 'ff6b56emosmu7eq45zzisyc91fz2cqewd463ruibyf3pi5r017vif56bqke8oyf1xmxuah6wie0eg214xvbcejflmwbtpg0vnldspgbmfn88auhmv08701hw8n0pyn45ze1ygra44r8l5kpo8z5i8yfmldlfw23f',
                flowComponent: '16p2yrte05sl8rqmn4yykw9f0ikcwpslcnvejb9xicki43zxpygwnjf8qewn1hl4vly780gft2xhbx6bhmllb7mdkd5flxvzhmb235xkqvctsqmel9mmo3v3n8ef4nsn4tuvp7sw3w5tj76bvo5a56c2mwn33k9y',
                flowInterfaceName: 'mfonr67qasgovgsxen57j3vhrgri3y55xkt6aw4c5l92j5u70f0xjnfijhe3nibkwbpzwqwle9fe9dbl9zlgibkpugwqjq2lx8e0nmz4tryuyupkpdwd4clrh4fth02wkmwn62pe4tq5ziw4tun6lf0f9du9549u',
                flowInterfaceNamespace: '6iow0jskfmk3u6yxf9c1ot1tkddqiltf2p1lhm2u0x6l4sdfpbi1hrfnjhcbwz8kzgk6qex3c6wp8k9ptvyam62tr1vli7e0kyg7f46nwl0c0nsop7cxtr7m1i0ns009n0gqagquraesztv94e568m1yo2w28oao',
                version: 'kjbrwqkokvwl1pqs7h9x',
                adapterType: 'k0a6yiy3v413rgx97ku9z30wjrfhlv8c4juhea0353vsvgn4wp78uebxxkxz',
                direction: 'SENDER',
                transportProtocol: 'urpqpatz5fj3mt34kte5013invlsdxd7ygt2juustjx8e4hzrfk630sf51mq',
                messageProtocol: 'uwrl1h4hek8sp0yeod5v21zmbfjpcjza62gqt6ndsrniz6doobbix88nyeb3',
                adapterEngineName: 'ng7u9cqcmxawj281npk4ckkdctz54yz28srsmetc5pn5wq6rqx1mxhj4nwspwhawp4deyztcdeg4mtxwnnbsrg26bqa5nze8wos82vnfmhmivc8pd8fy90brt1e77qgcgsfyi26xdffbngjoidup8zgf8a6qr7nh',
                url: 'xt922m6omla2aqtail6th4f51kfvubjqpogsc736hrahsfxbhcw8jfoa3fuptqq9z20i9t4kpyzu2xu5rqdpwbu8ubeezkgjhjbk38y2dpmas8x2z79cbyzt86e0al3vfdgmxd5acq4oaoivbmhr4eyd9153xqv1xtcg97m7rasty8k7kblaxhkr00rhva5ksol40d3w08j7jcc4ezmmfvf17fdvmul3gfdu4wu236wz5obsiy43ip1gie1tnmvvqw79omasvt1dgt2gbva0lzoa4np36wkj1u60rwmm4nmd8a2l52lnrsyengcnq3k4',
                username: 'odaigqh6cix8tlej93u8picea2s0vco2tl5enbnqzdw1ritzukqs457f1fxr',
                remoteHost: 'jpctr3ychnpoembvm7v66z2p0st1517ysu84cupvpezdrzccet7668yckagojfpg4t4s4zjzs270k5rji3kvy5ch1q8qbkq536o19p0qwhlpojwae7gfgo3rz9380i1zfoepslntr7jnerpa8dlr1aa74zu2t188',
                remotePort: 8331983185,
                directory: 'b7k77bpegmynjjyjy9f389n1htosfbb3zhd4riughxhvt30cbwfm97tdbnj8yb6kiv9rwyupq7m607somtk5r8ue9981xpzp946k6a97p6yzhhc2rx8rh9g02z3qu5lesj0a1qsf1l6wvczwhjaeq9au5ic6ojjojw6iklnc4dgh56nn0ewu93q7jdxu47onmvkebz4ovkthligz2mn18o7l2f7bhih6dh5j165ebv8b21v3a7555lvrjfrw1nc3yj2ivi5houe0mh1yc0g2bs7b82cpzos5t0918i71110lxjbhzzwqhmnvorau5xmqu7zmskxofnn3agh2clo870y5yjeopxma9p737e9uwcmvmfq4u2fmv3pie3ss9drqejhc52o8arxj0vu4unn9bblz8binuku6vy4692s9y5shauewgbjf3py5w11gh6pfnjhehc92117lu4lqdh225t3p0cnwseqeqrlihefztg2r32quma906ax5fl6z2fxl915usxavz3bs5gxnm89jnzajfxgg2fjooi209jrorv03lpuj22d860bxww03dcnlah57o0mjxsojkhc2p5wl5qpfcigzxs7c25gv4torc383dmwgnnjrgssepx82gpodcfogk86gzuo2n0llro4zwllrd0ooe7fbx21ru31ikwo7fk8qnl45uuesqcborx7mzfsaujqxrqbtdtywkt4mt71oqpug5m8seiigohvzttw2blm9y4x67941w7f8dfyh8xuuh0vjpjqrulndgmlyzvr9gqh2iqrowz9f8iuigbr8m97lwxgmdb53vlhqelukvcx0klrt6i0hq8ukq380nkd8w32ttr35wdmyq2h33zdyrbih2udmjp6sbz5lj7oc0keafvl2ivawj7ck6c5h9khxzfoazxgtqw7rcj70f1pb15dv3klxvw12o68dbkpmv6j4o0utznmqo611pq0n9aac2ujv7b5lqx84h9ugb932n4ydrblwjq12f0vvo80u',
                fileSchema: '3q3dj3fs32ggpqnwyb95l27ab01ah1iotkeaf01b8k1bd1l7l5obv9wivuplltvwkcge3gveop7kg69nq2mes73vdnchtbo3cjt7nqmp43etohw8nlvx3lg9xj718ckhijvp72y4m8bflgu8y9x6ajds1s4wlkxar1bsj4okhal4eciixv47e0qapvykd95eyfxjnmoay603gkebjixthf7brqhaoxdfm4kj8f68wcichyqwfxwj9igrbp2awe175wsplaxofeawhteqoqxtqgeenrny0dymdf0x3abcoe54531cevktcjzlamlupxsq2t8a42fvdcwkbgpl6vvihgj49mkznfnv1tq8ltbmzz67pfxn3u2y5avvg9c8lwa7sl376oj9bxt0247nv3iyfpxkx2lgnockmwn5l7d6lo2jijrg6ixcgkzgpugjfau35p4km0ab4ssntbwigdjqzcks8ljxqaxse5joehufcexku4gu6z98aycg2wtgravtygftlhn9n7c75mpti8z1wfglmwyjnsz9asxhhpkm6xlv9d9kijktmzypqzilcwsfynhlnm3ukkaeft52ojgjn5ypikc4x01ssixsren897c8hf81lmflua747tmaxiozie6s41specclsojpqwhivunmb0tynzm4h1j06q7sfeqdgy5p66n8yqgj7226e0zoupmw1i0yebbm5ramfrfmavnbtfgublowurf9xtwinfh5niwa1p80yeoph8kbetzapi7r1f9j7i0ieyyy4mrernt722vzjo195n28n92okqbjtm2qaew349n49evkasrpowrerm18xb5c8s00ddli3syetof2hdiegbmuhcnk5eore9fr09i7f7yubmb8aee0lyvcjoaike9x7b7ij7b6axu5rejwdq2n2n3vjd0z9u8r3wx5lfhnz15sd9kq5ivchtjp7zbsb1m45w3eglhvrbdkfkg2hnm64awazmgc682qffoqpf49um57no2mo1ht',
                proxyHost: '5mgb5j3ishi280ig8u0onh2mfzmu33iz4qoeqgne2ly79og6dh5numv83kjf',
                proxyPort: 8234049853,
                destination: 'q6da25p7xa4357fbpasknybizcevod9j4o33tdnaan5qh9dzcagcrntbdcpebkge6txghrfm62si701im5lljm4fgxa9319u6u57im5x39e3kmyqdyg26zvgtdfgluhg6imh693h20nfayzg1q3x5h6gchgqh1oh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6xpby210ra94kg38te35lbhgjgpyzs9s8fm6gw91eilt46rw4ilfey9nh3nuwn9buokr6vgbu2l6isqb2qb0dzbjtpr2x3upxhgvwhchddt7kitjpkl03fkvz67rg241jmtwg3nlxghlorbnmdac2o45yx92yew9',
                responsibleUserAccountName: 'tddk2utwe6acqfxqiyc0',
                lastChangeUserAccount: '0a59egv9con9q8607x2f',
                lastChangedAt: '2020-08-03 17:40:12',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'xwcv8r7o8cdrild7xkg77dvzl2msqv9dqttastdq',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'c5fn1kcfhwp2jzwobji03u0o23wh73ldd7lt139jx2ehmm110a',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'y4e3r9938jj6sedf7i84',
                party: 'ocqnz0jmwfynnbm6h869osh8zokd3vpz4j1swy2r44avbp0d2ghgwxfsg6rnjh5r4bbsmox5yj554ey1t1rg9khl95ntlpgy6vlo8zgcmgcw6tqr3yzywlt090tdafdf78jt3r0derqod0cckfb3reah28tnq228',
                
                name: 'l7tuu4rhpvurs48tmq8aohxsajpz7wwdxlozijzxm54p6cakxiux5xvdcid4qrna5ir06bifi0a3sp90eji2jv1iefbieiy1knyrrkibqnuy9ejwkee1hl12cdhx3zcumv2pn03m3lepsuj9a1qhap07k0x0rhnt',
                flowHash: '89lbeifswhb7n4aeb8toppsnjbb7dhw36j88blyk',
                flowParty: 'wis9ileyjf3kj345u4gw803w0e9rdxeokx74u7c4dlr53dnq05uu1n5ksu3d6w2jas0zebzr28cl7hhngdza6hydno3d5cpc2401hqpnfqvlsy4cnef6mzn8w6shalyr8ayiuzluqaezqwz62nsx7kbftztn5sk3',
                flowComponent: 'bqn9id9lzldxn0ubye8ggsk377uj0ufn8yumwkr32ntcpnkocvfxmvebw6n4pjrs5lyyur1rw89vqblt5ohhkegwgeifsdf6o70z9mvp4a1eomv6v9fsl66tbkpw5vkltr95w8dnjf845lk2yta2kvgfb9uep6du',
                flowInterfaceName: '2gvzyt36wnvl540j4myq813mcha4tpfjy1hndey2zfy37qi62vpwblyzqoy12vp5rpujzs8opnwsgbhsxcqm74w4gq5w6ee6bcs2x4kdljee68qy531sg66e0rt4bha19qeg4p2gwivq4owhn49raqxhk8w3q0qb',
                flowInterfaceNamespace: 'l155tx68z17noxso2ozuiq2cd94pi03nhi4qhmi8m4gvtuby9kvqtef7hsobxvutywf1kiblrqmpmllp6sqx415h1iwordlxo1wmx40nik8ppk3mnnh3d50tdcykc0ocvuu9fs4wsy90kh5poywfzt9zj2lf8blv',
                version: 'ltxa0mxj89g0eopk9nz8',
                adapterType: 'x4bve1ejrxw7287tdivw9yyp46rh2gavkbpmwltq67l08726oy4s0y214hl8',
                direction: 'RECEIVER',
                transportProtocol: 'e2u5exsqzcxiy4bdkxxsj49h4jzyofz53p120uud6xh9f5yu4ah20iyjmcvu',
                messageProtocol: 'l1ahhws3763c3nyaqslybg0unj2owpkigc17ym5u3puawvzmwnz23g7197uw',
                adapterEngineName: 'lm829loaoi8zhg1i4nj04arubxvs1yfavbrvniqx0ucqil32pvmvzfy78bt6v1hr9wa4vwdahnuis0aich9tjx4kqxo5ktva2tny3rxswst7oulbkvp8bllcqq5soa7quumievqac0gj9hhkvqnc6qndw2grf0u9',
                url: 'a7j1hgxlejrcetqnxob1c3wuv4t9i7a6xfn99z7y9n5vg7mdldh6qs5nutf1rkejc0f3kdxmldb5ftmy4mfojxg3qkju6ucj0t2ki2xkpw89hf7xcu1ni9xoo89ogblohaw696nalm6h5e9b49srxy6s9iz2m2tw21k29wqzpzm27c0s79wsv2te44qpmd8n69fjqgc7kg5pc4len9rk1grj8fuj6yvgpleg0mr3dejvt9lhgrkxp7efxvhr6tcva80pv5p7mtsa4qmr1wrgb1kqp7mnl698hnf84hhjv6cxss33b56sa63ud7zch7va',
                username: 'yynd45gdd45b12apy1pr2s66tr74kvsq1d9kzbk1vlpbiczhywyllvbwyuks',
                remoteHost: '1cq8bz60eiac7op3mtd9fx0b42c4fte040lw8doc11wkqb1d950jdgdswf2gokgepemzo5cvdbpkqtnxvfywb1y2vc4cbj7b2y1mu69fdqfskms2tw4nhiohd4ezwa2axv8kvwrmtul3ukox8v31262ktmomhwzu',
                remotePort: 6254096562,
                directory: '4ypr0da2494j1fz5243f9y63dhgsd8scgfid94jzjpx871xtunvya4x42mtgkzg6nybk4kwkobzn9on6sgkn5guqoh6s84jkc017gw3arqxvganenqt33d7f1i1hjlnof87l3xxpvi793mbqexy61o5xe7ehujje5dj956te6onulos6jdsvowfldh17do4lqulck4z7gok8gx9q63t4b203fbhi41pvz03zxleuh0wm0ra4t8gfnmn0pn57zuwt58f56rupt0bilhinvyn1njcq2tozeptxs3lvq0ta4n8u7kg3tgtltotpiej0rm2tzgy1rqb0xks4kadpkxtazndg9750u8s0cbsj9lheie94gr9mwuc5wozhce692cshdvutpf266nck21f70lkgyrhz3ufzmq9zeu9dj5adh1sga5pbi2h9al3m0i6hdvl161v0obh5q1m34uq2i6m16xeebahkxng0ulieukhh4qb4825qagucsf1q0vn6965pz0lrlj3kb601hj7s4ywm4ok3zsjh7nyi3zp3ld37f4ql2xzql0dwypno9kbguki67hrtdt3v9kjuapyeflao60p664cd0s4f0avnlmn1rg4o1sinvqnjrelgdmqo8pt815uevdi9kaqr8jftvz6exd9jgu7ceif2lcwk2hwkybbcqw71x73a4n5w5etnlxldz6kzfpld0znutc3b4p5kpont7k3q1dfk5m8fxcd3zdrgfn0eannlgmnmluy90g8nr06b8q4qc0zc3ojpkhytmtwq488lygi4b8zzgyeefpu5ksdn2bjr610gum4jcbpi5kc844405nwxb4r8r5uy68b4l7c30a1876vfbcdfb69axy54ud1mnp2h6drwxeqpmaxzuf6jaz42upj6noy6dwsavfr9ra7xpzml9uf4jyu5w1jxb9t2b23fsbi768im130zyxblvqiyj9lzvx59gzev2af2skn893irhucwxfek3a95yga07bysa6qkamp0',
                fileSchema: 'nhqd2mp9xr40csev0pkoe30h48xcr2uzyz7q1p4cc2fdkwwllhpi2rka42we11gu9j5r2db2uqjx4y77f4qzhxscbqs0i6pk0jehczvsx6dcoi2wv0dt3j67h8934ot41lo70apie6yl6iqynvy8bwhn33gv18hsey9gueoi6q1m49y6i8qknt4gti1t1mmosgqor14v56bw9o45tp9kaecwhqgoz4ey54rmrrirhi5pj5bfeoibhi85ddetv4cli9l0dcr2s2ocpru1pqs9k8qppmealkw1rh3ylzo0288wdasoiyegbw61pqc22vo2r7w30xljihwoyeax2m0zh148di8to5n5lmehqmq3sao9wxhpfl6wp2gvopw9jigbjkf55ad4uvxhtuq0a9myr6lubboqhsazkqcas9mif6ir8g6hs68wvuw5w3h49xo4mr0502d9zz6clfozo9i347k6ait3ku9nj8adeo0nur0uh0704f7bx4c2awaoy0z5zvqk450xm85boeswxhmwjgj9o4j61v9351jg7s5sqlf81nmvvc0ypd290f6z12g94dx2g4wop574rqqm1q4tox3ypv13bqe7jg6822jtebwrttoxnr3c9lq3hclz56hqjh0amihchz47da5k9evr4rnglav9bl6fmz7aze5o2vjgvnyxjovqmffz88bzhsjhiqrdqb3x6dd7veyeq9fwv8ibao1lpnzbyldixqrr7h8g4g8sqhgpvw3pvz5akkmkixnj3nzham4t9pisczsteh6stcoronmdiw58yx9revjcovcuayr1o83gg2q2pz4t1j454f15g3ljb9dtkbko3ikfnced9r1xnp7p75oi09vgp7ubnu6fsahmd10tmszn8vdmcw8938jc75a58yjnuyi8djtvp0cszm55kz27ad360pm0yloq66cxg5co22bych3mrpr1k3rqa3p6vx7qqub5l9f4blcshi1nefjifoh3l8u76237jxyte9u98cq6',
                proxyHost: '4ivnzv6001mbvju4u4kz6qkqtrlsz395m7xy5ykd4iyixfhhirsfd7p813xb',
                proxyPort: 9760097571,
                destination: 'w7pb7pgbcypvknp1xuffxr1h1c9p8ezxvz1pyc24d7gk1wsmiwlh8wik4er7lh6cqrhq58rbrqm9uidlkq470y3vrb6fzula4o2v0gvmvixheksiy7sf92cdt4uh4g8ghu7q0nkm07m450glvwzxwpwwpgw7qwxe',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'shxfb9ctjtic740kk9suwte6d75pques2d80vojud4yvzjohgoiwogvs4v92bi05ah9s6nt63rbs01yqlci30z5pnkghvghibeqleo90mvi27irwiaa7tbm0m7bxenkpigvi3vhw1xhpfzs79yq2876uly55nw4s',
                responsibleUserAccountName: 'm0ghxcd8a1qvbae4e32b',
                lastChangeUserAccount: '6wu6b69jp2sq9k74qfgw',
                lastChangedAt: '2020-08-03 19:03:54',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'midlguzedovw09f0pw4jfn0yj6te7pcvf443chut',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '1ftun2n16d19deudnze057p2k55iorh66rlobvv1idarjgsce2',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '3wk31chg3n1q8vbj6c9a',
                party: 'm3ay6u3limels7mh9ol43kfqyzs4bq9i8fl18i099mf7kk488d5lrvb3obazlp992t5gonwov5hr79rqhs33oik29j927wrd4antqwpg4ngvqmxxsyye2dour4oo4zcdnm34mavlwr3ygeng6byva99q469zjei4',
                component: 'm2btz18e5hwkgxrle1xkyip8tdrq5dbczfph0f37o3mox3df5y5bhf691bov39twgeepl9vvipdkfkf8tefx6q3pa4h7q8zmdrb8muoljpuke1sv1pogs34xd6cfq1crmo0so5krc4g3if43htl15kvtrjmq3t13',
                name: null,
                flowHash: '58n2pw47mpaqk9cb6kif0rivmjha7i6hg5delfk8',
                flowParty: 'n0y2sz564cqs4k7psngs6iip45o5m9pwu0806tbjoqap8cogt2eycqsh7ytsglqt78rdvgdlb4c0a2wny5snqp41twjnpzjkspwle3g4pg52ef0txyfnjjn179dm5ttkl6ett89x9jqtpqrrd6gb3300co1q7cpl',
                flowComponent: 'faypsf7epsyi2kv874vnp8tiltfxmsmd4fk4ivwp6sd4353gx7o0uw4gbd89f8gmr7bg2y2pgyarpppe4j1fb9vk0vehpoit3qqjvtgklslvatiikgdqjcket5auklbirupo4gdtbot6zw949e818xiax830axiy',
                flowInterfaceName: 'a4nw2cygse96ed4ucmon131dnk2attgjrxj64kaovr7sz1a9qvk3b9kn8i7w7vs0j5fp97zml04tj6bnk32d5x0h84spmp9g9tui698w2uzbicjthy19d8b01jtwilx1kyoybo7esw3p6pd73mlktp9oyibhuup8',
                flowInterfaceNamespace: '1a1enm2yr3q1s6bancwx704oq6ve1ujtc8n3c8m2hx2fzik07w8mff43x567wf724svd0451x1ov607dd8cwuhnfe8wfphxf8r2n08dkl40rsbv4mlcjoh186dav1x0m3a25svuqomb7nmykac5o8ptkhingictk',
                version: '3xhul9t9kuluxcoedp9d',
                adapterType: '1uzjlyobmhdg00at50u0p00jqkhu71y77v247m2ox36lxt41caavtaxps8pk',
                direction: 'RECEIVER',
                transportProtocol: 'go5yxutf3f7o4th495b8kzw0ukfynq8ve3lqmw5y4npvicopwwsgjq97hiwn',
                messageProtocol: 'tot955oy1u89sow5c0a3tws3bhh4wa48ywmdkds5rzoolaq13950zsqb9t6b',
                adapterEngineName: '2kbfty7snifyycdlouly4jhacyyv0axtdq2c2pc82jkizp0bqmld95buj6swb5mr29sk0nikd3hasahupa73fdmwmriabjjjkrfwwub1vpdcxb1ocm2xy7brtszhnsgbmevsv2oue1x5wxkqvoky4hiyb47dfgg6',
                url: 'vdlpotw8xtac50sydqo50j94ve2dewyd36nrff2kxrcjhj4wx4vm336v0f087bwuymvdtby79y6bq8cqiiduqiscgnw3n557zyjhgpg2s5tojmf2hz7x9w3idgd1avbpavuo9bglza8ml6roy3t1ukpg0omts1ohthofrn6jwm5hpovuw4qhxrztf2stktt41xi3kk41ftknlw2sezxazttp5ggv628cifwhk47eawugdedubx2fv7renopip4s9a1o9un9jzwbubb4xpmccq8vcwkimd7ltkf3ajzhc1nluwm8mvbfv1qmg26xcx4yo',
                username: '1grlhlggfboq1iyq8719ycqqkh5acyx7jeiogjnqc60k4843mhi73x6ir127',
                remoteHost: 'bx9nixd68l3y6uidvmdaydvox5ds4rr6pjdpn3lyuc1p315tix2i0meabkvtxckuvqwbypqzufq6y1wc11xhs68mtc95ozjrhz7j6tld01303qhdkpw427ps3ufqf0qf8m51mhbb87mfwa6dtot6fz2ff7eekb2r',
                remotePort: 7539080320,
                directory: 'exd6oniry7bxv3m5q88i3fgp5mwakt0ukjw3fagdg5rjr3eoi0mk51359fv468axc31o10wegnvyf66rxk1407ec0yl6tik02on9exfr7f4revvtmbv2yote39ef0n11ta2dtlola5o9uglrto7bywibttfaf6umgm93wz4j67n27q0fucz8aj0ee59kr43l33c05shb6onfvrdf32387ah48yhe3x35fnu98rvvihplpyiwqz1o8r2qpv2kff245exxvb4w7io8idqul1u5i0au6y7c31sw78ekyfk0svzzshcop4c0x55hmij7j1nsutp7jqss0z98juercessuly15ateff2jcg3s2ijm12igmp9sagjchjvk0oehanbfvzkktf8g1s07ku94jqpkzmpr0ap4q0afp75w1sp4vkn6ljizwavnomggrarq5t6tvdiyrgge3hxfj42j11evoil5pwqx745jo3s16p82eez9r7h2guinlixved7t57p4tppokumfqwp03yhu7w9md3yomy6hjt3kt6bu2rlq4q04zvn5pn1fidoj5fu8qjtd066tqzwxmt5r5esopkd0n6g7u8l826mvyg1mvtf4bvxasxa1v0bzhj4lnoltynu1kkfon0lylaukwoin9xlqa2oxh6dmtd03mmzuytr4ie5eh6xub2p7x08tn9odj85mrnuuj4iq5d5cdsffynewnj934vf1lc0ih7tlbeofvrqc4ar1gjdlo1yivk054yow6odnfqf84ry45jlgzu1qx99j5d9pq5cix2m70p4uwoxzihvby43i0t1amfj2bx1ouiyxho0abhrs1g5zehzna5maf07fjxfz5p1gkm2gcfwj0tush1w7zpvhb7wbukh0i1k6anth1bh7tlmyt5rwovrzfazrtan6pq3irerecg8ojwmwkzspqlgmdezamix54zvn1jkxs5juoco28fox0xag6f1yuvyiyjndaxcbeq6v9e5q0axvhaw33gguu3o9',
                fileSchema: 'ayq946xzjwq60ddipircprnarsxpxu9n49qxzmamonf3lgrqdy7fpa2yscdtxdw65h4gnmhr37agjh2bgexua48uuybb9vwm7eiuysxvzjs4p1jtspfb3thnjw2on786aetfd649qsb434umdf3qqvd662d5392cmtpkce7paxljg6zdw7k4xmcx1dq9hx56bzkkymmhlh8c1px2erdj72vdltwuvgbcgxtavlke0025nm71dmoxdjk5uotfh1lq11fri9k4wxh3h0bw5yauwhmsmxekkeqg3osjou96jjcrlbheag6tru268ked13vnp3fi9baxexkhpoae4azx7lrav1xxoq1xdl1d9h5zggtbjb91nxgzhdqh3fz8mjnadqv4bagve83pu0vmvnw41f6nkydxf19eoeyi0f0cil3r94opdj1pjr5lhuyxd30vdoj0wpxllf12cxwww9gaorwrscmevbtrb07eftmno1xewb64tiehszhyjd0hwqt5rvv6comti2gezp8iiwn3n15iv4nz4p862hitaqp5x2wgz55xaqia8nuc97uu5utarmuccapzrjikervd3e5ac4wivsgaql4nx9zoturat28i5ym5k1a9oga7evad1x6ixkoi03c2iw1maa4yb4ekcsnft2ql94w7h4dp9rvsie0hjkogpa46ls8sltfcwwug36sabpwl0ediefb52qv009zmnm7xka7gxxd93sdgh150fozxsf2sghmp1h0b97q8qidj3sqp7sz6y2pu5h47t05hbevp55uqvdt4onk8tgfobxnt8nimmb9f9ts611t0euj3kxqo9eb9959r8bd8ot0gq2wcvpfcd1j2381kk04l80yrwkj3onu23837b9tgtekposzhucflnfwyqlg40oatbek4u5et44cjnoq5yuwjtyuctvxh68ky8lqlixbmydrx84h564qmxnhpt2vmya28sux5qzj1nfd7bolxy3sxex7zx0c9qhukiqcwtyz7',
                proxyHost: 'vq91e9qyslcglf4wkbs1z58ddtubi1pb6ygrf2rare70jtqd7220packt7me',
                proxyPort: 8754731601,
                destination: 'n9lbtf6z8lyboiv2x8pun903ilr3nz1y74vl8ueszg582mwg8jufcr37jv50cbbs1vkxee9vckdpjuunev1i69nqzitdi02b3fhdeljbt4coal3shpqs8whh1u9uektlv7vp6x5lgxtuuept55sth851naw6p33r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6j8st195vyiuwaqlojpn7n3dzhv0tc4i3nrb5pmfiza5fqrcrhge4x4pgzx1kd4xki4b6x9yq4jqgzy15pw67malce9rsg9dru1mr2x1h5pzwmea4dlq76944xzuti2d9vkzh0rkvjb2o2jqoolkv0r7bucu226x',
                responsibleUserAccountName: '4bts3v7joiw3p6fab2qt',
                lastChangeUserAccount: 'qhqm4hubri0i0sn0ltvj',
                lastChangedAt: '2020-08-04 13:33:47',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'esy3kgjeahpj4tjrxphen0edi6dxecnfvea3rcnw',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'y4ruz11w3bq49hf6x682pl5w9qye03c378eytmghh90eeiqa4m',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '4uq22jzp9fw8os5g6vex',
                party: 'rm9m43pn4e91lxk4bq5p2o0nk6l3zkarfjt0u5giya4k30hcc64vccbaqzdoxb128gyw5p42gmdvp418lvsjz61czjkdyj0ve7b7vdzx820x9r73mfo0zjyw7i0oa2z6osyxnvykhhfdk9a7kc2170a3j5v34qn8',
                component: 'hzxtzmvokasnlmluptgfhvy4gn6frma3b89d0lf06y5d42j5b8e98muylzlusoau5qrr28pf4rxursd5fcxxzgsvfeargvgnxnhpgij6lk7j45973dzlbppupzprv1avmt20qr1zr398yprx2g2n96n6hicedwhc',
                
                flowHash: 'n378bwivt3cftrmbx99xyxyy1ldpo3np9r8y8p40',
                flowParty: 'zfs41mscemom5ox91y8haj3gs9u77k6c2igl94idtu08726x4w7p1do4ldflhwx8ykx6qrjtw13iq6db0is0psbjo9dx79qvifv30gn6qw9goqs9o6flgo1sf253gfsxwmqexdmzstbze2kke754eehjq5gu2mcz',
                flowComponent: 'usiz4jmj7hipq1w1a030cu8m2qcj7hub9epz0roim1bej580biw3ef15nkgflwnt3khtwjhj3xdkf1660c6hvetmfufc8v6kqhjzijiejeyhhun2fz6krqhvrvjhprolai77skadajleb7hp6ja8bxq7na9nljfu',
                flowInterfaceName: 'ewb9xa4icewawws8u3vi74l8wymnl8hmxm86ima9ke6s7h6ry53inka52nr9sg4qybxorzs4tyofiae4luq63m406c6oqk7t3zyt1np1swv5qj2vbxlqaxithy7kwr8pluia2lj970joyxcmht4ghwd62b4do9rk',
                flowInterfaceNamespace: 'lum1rjy1iqv4i7ipixbu4dmoal43kq2fkzl3zst8tkfbcik95i3rjorigflm1ed3zix0s0bb14didylbvk2wf4xoil8a1zqz57fsm47uat1vopxeophsuc69try2zcik4cwak9x8dhupfhun9gxbultjvu4fumlw',
                version: 'dwys4pyka7algcq1sxa0',
                adapterType: 'dmtgr6keuqwnz7941r2muepyf1m7ey8b4xbubjuvl3fo9rkakgct29exliom',
                direction: 'RECEIVER',
                transportProtocol: 'zail0jjio1db74zaqiq4em6j8n0vot9i44i161tce1jcwe3v0dw1ojidoj84',
                messageProtocol: '30acewfbo122hy7nim9f3olynyp6pows41umj3vx9ltsz12bzbip8rhb7mod',
                adapterEngineName: '8sosf6vt8ueuvjqp7jjtvjjtkm5dd223ew66fwm0vp5bwnhbluw2v2yrmsepgyny4bgpm3hyd2ughr3m1qo4jrix3uginb3ajdntkkvuzhd6k1gs1bztzrn5zaxeqhlar6jrck0zgwci2s407rms3r6hxubp61ha',
                url: 'nqgc6qezmvl0pzk6su2lris5s22wljbrli6olxl4vi03x4oycxvdycyo8jx3dg0dxc63xbrz4rq14de1gvbx34t1yar7dk2z56we77kyi1f8i19hpmetvvngpyzbbi396wqhg5muv6y50v6flyah1jwrcm0xl9ppqeg3doftf23fnmm5ujglj4sibtfo1my5qyz2tnv3e0byukgcaxk0p25axhqgy9vjhqugcu8ylinnjhejjpbun0vge3559xfyni53w29bf1e32mf5bvx15ethht77hjerljoh36n5bstu1o18xv9rrf1y8t24l3om',
                username: '0mqur8dcojmlx0w9ll5vurs0vvh6spcnn89ll40m4i2sqt4ey8e6ozd5qbo8',
                remoteHost: 'fyb597modmlqxahr4i8hrg1ugjegpobaqtbuyl7bxwkgwa20pkx3cfnhb0knsdi4o5itgqgki3ytnqzflua2motlxf7jz7mmvihcbgh1i1l0ge6mlrm64tasvvuchhq3p71nf47icozxcpvgpcuecu49ik3l8v3y',
                remotePort: 8829232779,
                directory: 'al8dgl1spj0jnfir3lf233ts7qbnko320mja0w3eg3r3to95gwsp0vlrju7p49ca6er8do5337dmculstbkvkrdgh6hc50ftud39c6tehst3nx243gyodp2klaf8jla3kzq6koasocng8o7npzgbrcloy8cxexzge1ofcs8zq1zddkhur1cwd4378196xrvc030g4lbutszhah5a0z1x1py36h8sz8fw09wys1fkvgu7jkr5cqaw6pwo21ed5p3tdqe3ueqifemq9thf2xo6nb5lu4xlm1ok8p2zvqh3au73alz2k2fxi31xrzxpl5cpyep99qcw42kvz9qu00rx23ggyz81gy7t4tiaf31mug8s322tbhiix42pwnleiiij09t2rz7qzwcbf1il0e214ydvvb35r7mfufjy3ryh1jzqw9bp8iy01swa22tzxa5cgqpd4het0nvtdo70as94u42unnrqhy66v2k956m8aftk4pkbp76o3eyfgp8jean4l6gxf9keb5f5owqx0nfxwbh0rslwpxrrz5zr2xpuiueoqx9vu0gku2xzc1gdfd4847qnmtxgeb48wm5oa1j315e493rlaoah72980rxmn0hkha2p90u737etepcmlyro0bv0iqxzpjxs9mll4613njvetkdkguyxt01bpakavgheaffe9181l2dctklgxlwbsen0pjxg2uux834z812b2r0a2mbgk39sl75weioh4rv0mwrwypg6x2nge9vpmp6zrh0qar8ffbswhsi8iq3uq9rtwfny1j4dddlsm8lwzl1icnv7hxvh0nsi7ob5qz34zlsc7tw9mufhe9j434ypcc6exvfxze3xauef1q0teuag60sffque2qgeje20wjhakoohupnlz5dfcqh9m43z2iuaifrtw90e2t4jyaftmtfdhjyznsi4oye4a89bdf23o5bwr4cs291hatgfk8i9m91s0lmsznlisgqbh3nvtpzj8r2nq02l06mz80chw0cw',
                fileSchema: 'tk5od1v1k01w7tmr33qgjm8hupcl9ebua7agh3l1k3vyadspghrykdmx7y2tluryn5qdykjk9izenj1b41fizfgznad9odllsohogjy5nmm1sw2s1ko8505r5nz6dhcv57rttihp001lftqzi61v429cwizkupu0tl3mhy7flro34ap1b6igzrmyrntri7ex4x29s7a57lfiaw9dbv2prm9kpyy7u83l1h6y3bd0pnzngl05lrtw9a2rk9kmxvsk65gaqtq04o3et7ys7x0pv7mptlfue7e94cp6lakaxhzyuvwynidyvrerys8s25jrh0vxcx0tfn9heqi50v9zmj8mvg6y1ewq2pvdqplkbw4yphvll43p2t9n38bakt14wi18o88urucl0wz5uoy4n6mod6fj6b1wet8zwsdnlyssl0qq55vo4qmyb34ckwl7uvydsf9sfcurz8epprm8tz2133s8hq77bprpaz1mf5wyy4x0oqy7qvqwr3lu9wi75dsjita67xp37j2w89wn8juih1qsb3yzujojwk9ae12hjx27au7sd890r6kvax0r7kos37qtidjtvr24dpl1nd6wbkkrj2r86g3wppj80dzijex0vsxzy0vt0e6fw21drouzt6dnbxebya2sg204g36z50hsduoeo0o1aep64cnudx5a3ummm10m5pch0ez46uhvx59oobxtaqu0937h8vlliyo96uulskfpjuuphryg1xskmh58tzllyxgv6e3s2na6zwttx5735e2euph73hgwhv93al7ppb0l21tf5vttz3jx289cds3pu4c94qd2j069kphcnobwsn2q6qrmczr44xunohmis7ylsoyh74nzrd3t5po69h38w1myd8dw4bewso84e7315a72a1ofzddvcotdz86ic4ko15umzjiz3mv3at1l6frr1madwqzhvg9u1jmy4tvzbg0ca125o47uziheamusu1ppgwm2fn2n78mqrikytk07h0dozbor',
                proxyHost: 'yjj5s48w838qewqqu67xyxwj7fvli9jb1ci0czx2kc2c24zyltz9otb4rnur',
                proxyPort: 4590880282,
                destination: 'ssn6j275xf0z72q0vpy295li9q0wfzfix5oz6hzmz36kmgiezdxj3s5rs32sd1qsmnc2s6t6p2zxw4m2qaui1ocx3zvmlbe632zlvirergakuk9yi5cfaqpw6zjgt85uu8i92ogg993ph2ncagu7w1x7jezojdtn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q4ab2ax3zca8gl2kcyh0k0h0h1i61m9pxmxnxplq5tvjyo9s9muombehlpktvtp7kpegyvd5nxm4rdhpvw3lyj4qk1a1n0cgyik4y88lvilv4bt3bv3nuohes393sdj5otu0xoz143d7g5jsylrwgk9krknas0e8',
                responsibleUserAccountName: 'hofksy7kld7mvoprm8gx',
                lastChangeUserAccount: 'dtb8ousvtcmo7m5cqwa2',
                lastChangedAt: '2020-08-03 15:45:48',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowHash property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'ev9ifp932b6a9tyhtbf8if9xycajra5peaz53p9x',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'vpj0i9f7qpuqvnho5x2xzvf6iid7hp3umenx6leq03ty4axpd5',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'lzty9jredcp23wpgv5bj',
                party: 'i3gg11xfs41zb9fnclh629pa218l14n7sir47rpthyxvql4e33yz93mcltgjnpqnbutoyt3m8khi6gmf4v5ohky1mmkpk5c3wu6o2jccu9tvi1272xxud4pbd7bhautg3mf455kzbohwsmf63kjunibinynr8v4z',
                component: '68t2midos0qkedoyep4j0ptk76yl5g3dmpxwdyluufbely4nxfwicbgealw2w4uf8qkde16osmue8hisnwxaat2k6xgvv0zz1ejdwdt5yitmxp28h86vsdv7j6nremaa1s2760ydbr3u6c7ht5spzzs3i76r6dlw',
                name: '5lf6m7zeg0pc5xc62hp6mm1u2rs8dxv2el10ttikdui70xny9q0d36uf21pphi7ladng4j27hueusiyatn48syw5csijfhfd7zduta6bac40870ratgepf56jfjfua14w8inded1l93578ohfv0pklpc8thmo33u',
                flowHash: null,
                flowParty: 'uf3yvkpqf570pyz96pvd4wob99cnm089wm552lrbfe251gf2kytlwz59h6k25vqmagc36840pghsx70ime3w3zbdj4vp1jm6a5e6cdeil6qle1ilfu55rh7r1wkbuzja95oa1bc2j7obtlg6yufu41132qao236m',
                flowComponent: 'q95db9s8y2nkhfas1dpcxyyi3fe1vmzfbl59e6l1ldxdkgxyzhlfyl9ebelm62dmpifj4wmvhx6qlaihvq3kzgrwyvon2qfw7qcy3bs1s2kkzvl9447zz2ef4hsjpaxxqvh5u1bwljiaqd1cd3xt7nureuub7155',
                flowInterfaceName: 'dfzw4jo9aiynwk5q72b7g151kd54va4wsz5am66lonyl947itffld1dknbfy519b2f94ke5v1vug6nu47zdh43q11uqws7o5lb2msnm030y9m16ksaggetizecrm4gi7hizvtto80e7q5sbu2ororo67h3m3o1yn',
                flowInterfaceNamespace: 'h4zy9f1hqx41s81g74emetwhihx6wakk3cmospixahf6zr8akijjtikknhkru7zfx8ikmg1v9iydw7c89u5u1j36utk4o49scs7b5pg9i9k0pxxcdsxl9gg41s815q4q1g09k8h0icj1eurwu5pz6qc5r5oee2w4',
                version: 'obixfxea7jqxctmqe3i1',
                adapterType: 'cl0s0hsq7v6defyht5u4duisc84mzdp8rhf46cpjhl89gjpohbj32d75pzbi',
                direction: 'SENDER',
                transportProtocol: 'ht4jej115mp02cwb8kyabqa2x66jou1rydsjuy6rnyvm0u3y6ifgrg6wtn9z',
                messageProtocol: 'a4kcyommw6x3qrort8o1odz7rv4q8epcr040vu6poww5ahaqmnyc75wo8jg8',
                adapterEngineName: 'oi5rh9q5um8mkurjfdwr884puwtbxhgugdvio59yhmigu6q9xun4s3ntzqj5vt0fm2fqv2fmunmpjmpssb1d9lnhnkrglv0aj4dz9k7cw9cjegmvtd7e9tuuro6o2i8x9jv9ebe0up9scmvomk0ur77fmuy7ct3w',
                url: 'r2lr5o5xt8tzieqk48jimh9px9ja9461rjfkx0y05kt6mejujwgr7xsjzxndusgqq2ir8q2x8dre7oriuz7fjbw9bh87i0wibypi50sb97oneaa4uib19n8tgypjb6yonjpswwpx3ba4gx70yhtp0ww5nur101iydxs4q64f6tabtb3bra6obq1i827phia0jacn0r5zyb3vdzhf4j3wkd8b752ajz22zh92i5cid43y70cdar5g5wcxr9fmsheenv224vex7s4rzvs5bfs74r2v131jcc2fhk9dsndvm74i66g3y4e8201fbua5dlen',
                username: 'i4469edc6d8lpupvcq6rllq4r1tmk3n4zk2fmhhl350ouz6zi286jscs2kl0',
                remoteHost: 'cjac34z4phkwlabarqwoe5z3vevn9i74720bgsw75w26p2fv67idtc5sxyr99eb66dzgrrwn9l9qdxc20ehkuqfnpta7xmksoy3xavdzxveld37qqah5duz1j46qgfp87vei02xy4qtr719fis94kctfvhfcf07c',
                remotePort: 3104843804,
                directory: '8kkafcz70ic8mn9v3iodrjhxuanbmomszoof5twtqgrptf3p82ztzwbjbdhxb48g9ulux8l4a754vxchnfaj34keath0vcbr0nof1vvf2686qblfdg9n32drz3per72o1b8ldjcvfbq84sllqn5ap1a8l00bl776alqnqbxr17rlaubsqfd1be8mwja0ec23ktl4yetmy9g1ghoghzwriea0ifhrdsvrrb3ijuv0jgiqv40e590t06fjfnura7so7o3wsyx77jqs4zczj1hec02xwhdlc73hhg53y5kbemjqmk9pe3n8yu0gndedjfrd731yfg96lqfin8jaua48vxgq72fuaeb95fcut6ab7yxdon1cn0z2rqu5rbx4wmb3k16siqp7hfk4sk6ad3oam3nrrz14imeniqctbws6wttfn3r7cack1r8k90ihonlp7c0cnqi2fru9pghprpu7r1tjkxxdjc2f0n9fkxa6084v047fl4usjllef45qh139ld2c7fs7i39p93v1clvblufnkm47emi6r4j9azyjxlre1mnet68su92u5fscnj7kip0khi4yig7awezuklfskxum28rd0na81cfwv4ag90r8k8g8ghs5in752m9kyyp5sv2w659eedxbemyyzof4qm9ya63ruvdfo469tlom3694xo0absf0vs48p2vroguapr70qoqxdtqf4thwthcbqlgg7yhflnd8jr0fc7fjbo2bq0rxcitojdpnjteyn3y0un0nwum2kwh3nqucbrz4gaoae8pesj5x65vinjwiwsee1fshw6qo6ukwv32rmfxo844vk3wfei7lbxclzp9qyh0jr2jzhbl1svu1borwbydad3i8kmmcmodm5osozmwht2pg0f42yt1s430rljuovrvyhp0tgaga3d10ktk4iawinwm0duk5dnx1p5vtvc7kq2d1vdnk4txr76n1jn0o02snxv9ynx0gyqtgu2uaruzrmvuvfm2ritunq0lt1yty',
                fileSchema: 'pdbm3i6xl0cw51gcz27f9e7vaxnw4bnm1zqik9e0iugnt37jqjvdgslrwr9em5m0s8rprrg2n1lar8rbvv1izxum9gdcka03p8xqlbyz3orj9g2792r7d7nbenfbny56xllvz8watwwbysz5221zbkzonht3b8z05li322otj94ta36lcenoegvdx4cxj7mz90t88ho0hxua2el6yu3r9y9fnq9bgpy3mu367ynkwn8ewr1u1zaasw14ltx1lyenk2ww2pux7ph7adokr45gyf9w2ghuhagq5os8nua5n9y04aad5ruoycmd39qxeo150p0fzovg43vkn8pa7bz6abxe0lus5f1sm0ts9av302rcso3cqeplz2f3ren1q9tm7lahfux210k6fe1zvpdegbwe2jzux5oov09urv3exd4ldnhc1zy0huhj15pm48yjuxladihatade85qfu3l9t1ehfptx1rfv43dttkh3sojjtlgd1xaepncw7gn890y89kp1fe7prn5ywjmvt47uerwuxzjrj9p8chxm64i2re6lssoyo5p32bv4mok1x4kqi8hghrlzwjng8fjljv498r8em2r9a2cdhc3e6v7wz6ftbr9ht3bc1x2d9b0ph266v1l4y7f2ly9bvvx6bj2zbilwsoom1gh8hexr7buor3mlhpvyuf5m0mfentgw2gy6iqfbofy7lc0uhgw9afjl5lq0w88iqmgry9hmeiw9on86wba9pqwfb2wicoqhniadugqymqtxd2qwpjm3r9dnqnrrhclpt0dwhk5emzehhg53xqh5j4kiqz1bsv9drqg44ra3yx982gusz0n3grbsb28qcua5wpiogubdqvav70u0do063rk0jtmr2lnc2akdj4ux7q9cz48u28pjlnj297xun1egcynierminwplt159anvwdiahy8fmlv4zk2wwt7gmb8iibaz3lvjol946qar6deufsgce3yp17enqy0e2xklsv1m206bjz2py5fxt',
                proxyHost: 'ysy4moyrymrz1bginiuim2sgecb9fx02ziar11jetv4jdpkdslx8rqcdov4m',
                proxyPort: 9527285359,
                destination: 'gf1t25u6g0vsy2ahl9eoj3f2csme16glg45uieio5rj7lzc07pbi6p6an3g3d14jmlxjmbgsj0v8sn8jh26zn77u77vfp6rxmlbre344bre5kgvd9lpx1swuacjvylmsycpdz5goxq6ahf4v6za3xrbpn57dfdbc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5cnofwvrufwvm1emx2985y2kfxnq452al4512b4rma0cms95vtz18cfvtp2qc557x1v8aygxxwgxmorxnrygmf29h1sjs60xl6hd8ffiuel80jgsd77jweweqv5mqo8bzhnaofnkzw9j2l9qn3uyndp1atkc8uz1',
                responsibleUserAccountName: 'e3rd6trx23bl274de90u',
                lastChangeUserAccount: 'jrvke18g0vjady3wt5gh',
                lastChangedAt: '2020-08-03 23:20:17',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowHash property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'b6p2qa0t29tpq0q7dg5dbdlh2eku42fr1guryts7',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'e92fmw1173uu9t8g2afr9io8citxrzqtjy62gzrmzog5pib1ns',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '9cg6lse52t5f3jey27ho',
                party: 'pw8mwdxpr3h7br11wtrsrtba1xkg3s8f70ukfiofk7zdr4bdw8fkf6cn0d3osxw779i2rzmncvocoyg4yw1j3axtgc7baeweq0ycxrb2hk4j5tx5efe5xk6ak3n9otm7cavgku6h3nfaszpndiefaavdcfcg2rnw',
                component: 'poydd0sgup9j825f16lu2dsdblomdchip8f93bdpxb5vp8eg28w9uhjwfps66ce2103394kj1tc3uh3zzlpqui3gmhttpiqfzs28y0a0492jn13yepwt0w4alunocuy6w4iv4sy1mz5eav3gmjdynhsckz44adlj',
                name: 'phj5e0l1kebwspdoxwgase0bc22odcw6wffh68fdbkafnf0zjs8hufj365di5z413cxwf2dbwqixofjy5lvo2cjkulppuqnmfkbt2ye4inwzcdrsddhss9knqqguhf925fsazw4onyz6ggykjs12911mang45eqb',
                
                flowParty: 'h9wph6pyulk6xef150sn74606ke8qudesexlb6tj4f2515ewdfsegc1udj1c35kmd3ez3ap9ezhs1ldte76hhpq620hj9tpehglxpnm1cacg0c8eqmyr8zexa1qgi17zxg0fuatdrst9t5xb1vvedu76yeph4yo5',
                flowComponent: '3znsgjfhygyhb5x1d7omr4ewo532lv5yd9m4im53yiqb0pi3v35ivzz4lcl0u6fjq4rr3mxxgxk7v7wlbxy4bh87b4hvfmppu39969k7s5nymrys0nerxkzw3b6gl5gub0f9n9rxejc28hndwaj7uo1jdk1au36x',
                flowInterfaceName: '47unjipcug7jntr8dtp79igkvwfxmx7fl1s0kdak7t595sn04jnc93ycgq1jcvnjmg9hcxy71kz0vr0birzyxefjs6eb0jxedete7tvr8ux7jc27e0hk4h1p70x3jo6vfavgpszkcvfyp0ewl6o9esh9264288p7',
                flowInterfaceNamespace: 'cnuhl81jhrxgmfv3jouu5xtvuy91o3yzo61jx2vwdf2q25j8s7l9dzx9r933gw8xiz0rhiuyikllx8o96ee68m7xyxtyo094pu4zujott8mvf0qmmt53qnhu58m84g5ynzva2f1c6lqt8ll940gb8mh5mgshxend',
                version: 'ujwtuemjt2lsnylifu7j',
                adapterType: 'y0285xslmgn6p4hx0pk6gr9grtdb86hg2pi0o2vqgf5v0ngh3ftk79myre8j',
                direction: 'RECEIVER',
                transportProtocol: 'fk1g004p3cub0sg34bkw1z2hqzgo35hzc2n6j0f0ujulobhiozt8xl1e2mvr',
                messageProtocol: '547re610eyd7v5w5225hcve1hzzzo50d4yp6wvw1q6575alyuxicpf4l9bs6',
                adapterEngineName: '8ospiv90t6bd8uhplxeyahia8i0ruxvf74zk524dhtho9gci9ig0jswza8koiibu6u0iqljwv85o1iy2g07e2phezw3pupr78bs63lqayo22f77bnrkla6ayhq0q2xw7oey4d8uhv5gpot9v9zjipe3d0w3qz5uk',
                url: 'ik4wkvvfer73f3ydi64x3p42e80681qakt2r0s7moghpt30nenjo2kjbpn5sunwtwyvbghvlvci1ifgykzybxrptw0sbo3p9wlwp6msyvhkuxztna0b1909o00701o2it6wfqjv6p16h7juay2hhbvu90zcfr8ab6e1hl2ibs10lprxcv6d8v9p7pqcg4k190osf8f6ivid31iix51ld9yydzbfzwrgn51qtti2ry2fmxtu22njy4ar00uzv6zek3ngta3h6bdyngxhippo4b4xdb9cwcw3dfkiyf1mau8rj9v1j2cz6tvhw261aud0v',
                username: 'vmhloa1jwy4ps8spuro7ps7saploscpal09ljhpo1nen0r4hb6bprbxta1m0',
                remoteHost: '4f8zivxaco66q9gya7w8hsg6mxh6g0u81k9f8vjwumakkejbe0wx2z20de477c1vbcoc4c4t9et6pc5ayh6nhx25pkjncppp8c9adeffvl5fuclf8yp9ndmvuo8pjz7381a8p66d7t58e7ucn45pe3ybkkzawsp1',
                remotePort: 3484808453,
                directory: 'a043lc3ncve9ow4vxenphk17uc6t9w5y0x0d6vkf92w17ld2szzru4hmgr7lxwfuaq7zdxr5efcb4gws9xhdvmshddlyr0h6h3nmt5ntmlnzu9d0c8wuiazol7r6gvz56xh6je9wiccm5gkgq5kbygrombgl5rt918ukdjsjgnepvdkabgzy0tmh19ktzumxtkzztrjnzti7vykzjmlpxogghruul095j1usxtq6syo4sfxuul4g8l9zrks5r8nzikhv5go3lqnurmbi1n2u2tt2m46scyr9gr8ezbbnm0gslks502tx7kopnudmg5trvb911ta2ybm5lpweu7y6cw0sbbpauqgi6hv96wmct6h9m2mxisbz857oca7tbvgmz7ij415frd7kowrbpvfh3lp2o2ek76mli5orumisquo4691xsyne45b64br749tmg4omwhpg5j8cfyoes4ncfg4j8unra3wtrgcd22fsz26erq1r5mrqsyw6lf6si2svljqc1thjscejl4ki7wflghvfcnpzvg6oorumk2ya0jab4a7mqfmjt22dccw2juwwouz1a6cclsmr0ybqx4lbf2hm95f58qd0podm3tr91h7u7im8udfnh6h94g5ql965n27b4wtd1zgqee6hnqpdn058uxfkwo9gzi1perwdy00hst0te929gzetbi6r8u367u28s1mvc7zhn9cpxb5hogchbcznjtw7hmpbth0sye5p19gxwj478uwzertz9lleeyzrwv6d3w61gvrm4r0xd2armjbjtv3j3a6uoi7ds5eqayocnklxcwwq33hxx6mgmbjmtbgew5m7xmysxbbiqyes068o0a5hkpgby23xtudjgjtvc5jrryus0d4zpb0h7gstrgrcjopw50yiz2e5t3w980sg8ehvzvlp1djljnnkoc3bwzg18mzsbrewmcql86odo0h95kju2ayll08mbhzjfvmuv8rx36n9lfo9sy3a920ewcvnllqktj2v75cu',
                fileSchema: '4tc249hs39bk8s5f2cja4y8zh27xmjewhfvzzrxnqgxlkmy4e6hb8wl0gkc0g61ksrpzyz7wqgp7lmshbptowucqghgmqg0b5dw7517v99ljfshtx4qmkz16sbb0oxgb5x8jpbqtukyccvi0f4p208imdquci3r4snlybkb077w6oguhohl8hegoctt13jw37w0ep8yx0acbi4109582zjwmfw7mstenicxm6zk8y7kmwiyruupbgkwejxf18f3p86yk41m4ucd8lr712gk65eeydgt96c3smriglu8v47cdjx5j0dsgu1bn4vrj2xbnd1iowexou1jyf5kb54snae7v61fjrz1yb9cnw7lc5me3229n1hds9albm4hcyollsob4efn8h4onfid4018e52b64rha7bb9j7f37l2593db6489f9klo8kb541ek4uo1t2k846geysifej4u3piuokvzi24quksfd2r24h4l86tvchdyklw2to0xn7lah5y25nl3s8g8o8035toj5u9f0kqs7bnkl7n0gzxez2r8kd0chuo7xdeiiscpu1i03rh019hrb512yrb5yjeyoxoeu21nnfyd704esxc9g9m1ryfj39jkwioojm9v2tkw9y5nypvodmrr57w0ptdl9txeg7hjfu69e7krlauc20jr5r4sccjm9tr4e48v43xpol1w8or1erqopv976z2cax27zmxn0ercefvokrzk93xq8mzhf7d0f0d9uvtfzrcpk8mt1hvqxzcjw2d81n2qk1rk9xbg3e74bfw6ufzbv9dplp516urdntjemflyi8ah11kwvpd3j6v284ewz29fsmw2v12rzsg3zx0wb1fa2a4fd4mdqm8w4sj3v0o3l08n719b8dk80974nb0dr22qxpir8mm219oikale7zh25ndo1ikuerjoudltaugln10h5v95h6lhoi244t5ynz22r063pm3znr3refe6qdy96lhl9nxu2e6hqzs4yfznnvewkm2',
                proxyHost: 'vn57fnaa9ytze764a75jc3n302b9x8q9lu7ylfezrdopa7si2dg0fnbxosvt',
                proxyPort: 1958106103,
                destination: 'fs30gridifuel58sshvvtmwumzsq285ri1j2amaq4y732sxu4svb5k8q9khd098bgu5di4xefd73wvocd1ggw5aolu0hd8c1eot33qw0gfzlvdgaez6o6ygmyrv238devu7tt2hhjpi6e791ys0vqa1058ctxaxt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'p2mrjny5kzapbfizxybzfu2cb7fgvhlgnx51xsrr2efis4xd4yz9zfi4ksfifreocld7c6gnbk0n549wklqgsjvmt9wt4i1d3ee4lr40xg87gskiqwpkc5ds52iy91p17zglbcw1hdtc9rqhj7he1ie5psg2dkc9',
                responsibleUserAccountName: 'ks58i5nh678n2t2ebs5w',
                lastChangeUserAccount: '3av7dzg5a39ce6ben1mp',
                lastChangedAt: '2020-08-03 17:10:57',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowParty property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'tvkarmtjq6zznue8hch7l4slktg6o7ao5hmve0h6',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'g981orphxlowvgl21kluf69t4fjf1te2lf41rlduphrmedi4s8',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '3bc3a1yi8783cpcs3c9k',
                party: 'rl6gpjpitiaagzjvq3jg0skaxhhrr8pwvcsjad3lnc6sb78v80gkrg1xhdyqx80udo3ez16zc9wwwta14stq7t9rz0i8fd4qf8x887yhf7z2xm75bulrn8qssiay70pc16il8o7pjbzk5efovz9rp9j2d98eqney',
                component: 'k7dfmwjc5pcpmsulm04aqtc3m4z67hjlvmozms9cxg1uq5e3uk3oofgwv8c26q3vnz1nxnyz77th6bhewc7z6tdgi3t3vnna30saqacjpqyjaggfv3h7c7cmm3f6hhvem3wmwfdyj08yade1hbaykkxbdph6a3qk',
                name: 'xej9ql2ggam1bh57g19juwcpp5lk630y3f6oas4xbxknu6qtpj3byal2ls0mg9e2ds80f3ttyrethkltzfjjanjn3oekgdxvv43ipa5esiuxnzds0a7bxdfwckvauydr5fbou16vo3fv9qmhszaapd26pdr2pel9',
                flowHash: '13xfsv5ewjiovng3fgq03fe7ijvwmbt6ewudptpo',
                flowParty: null,
                flowComponent: '49we49r782t2ty1t2bkimgpsw6g0hamud0zu294iiddfam0qp06lzj7gjaviin9d86wtn5s6nidbqb6rqea7disardu8jm2mbuu8239jlrg4j8jx6a1b7iuuxs7stq3cjfx7xw11cmiturembe8ugq0783jh65by',
                flowInterfaceName: 'smdxz9kqfwkdwgn1iuawpryoodfhyezioxfg4isxku1y1nn5gwkz0c4vysl72kmhpmvr6rtp06d7535i6wolgpbaf5jd4rsvcr4sp5826h0u45us61qpqdpy2fyufvh7csh52iu4khcpp5cda689vf88gxce94e2',
                flowInterfaceNamespace: '27o1yivs2tj1c8d8tya6dnczqxv08nd5map03e9qduheal11a4tn8i5dob5lx7jkyszoruqhaw87d6b68tj37aeepu62o12uts7v69doxvq9126zym5lhqtid6z8ougqw81mc0lahrnq3rm2um01phlhchcngqzs',
                version: 't1vy2m21iodxy9lr3ent',
                adapterType: 'nfzpgyhrzfjqc4h3rzlm9zkemixkzv1l5ir7nyqqgzgy2i18pzl0zi08qcij',
                direction: 'RECEIVER',
                transportProtocol: '4yg5yoxwjt2n2phn067rvu1g8jxrqi3c4d1lp65l5dolyyklfzdj502h0t8t',
                messageProtocol: 'hhi0vturfaj52hleum3lst37ymzp47kq9054sthxpxb1wzoo3th9v6bsmplg',
                adapterEngineName: 'vtxxo762366tkaw76st6nn5az9k9n7r75m3wiyzxwva4503wkr08atmbj1b4vytcv2vdg4jlig4iyn2us7afx4fqx7p4mw4pt5joqudnfflphg2w2l4rm6nhuer2h3v8xve5irz08v2szjbr8kco8cbbq7mhbzlh',
                url: 'q1pio3gr4ulp8rhet8gamkjv3mxcxpmbe3enlvly1wdt22moaqvndfen51ylx1ol9oyvuk3auxknjv65b757rduno37hdt5omjqoymwwnrlhhvr9ai0ik1fz3jmonpq01ddi9nj1nxkkzzoy5ier0s6cxxh55c5xa7tu23then4f3ucli338odmcixpu9985p7zgmg5dqlwswpmvqslpasshvx4m6duuh7mzplk7jvqomn6n0odgn6rgn4wmnr5psc72hn4j66n7gddz93hchk5dgfngdkve3irhbzocnkitfv5hjehv6kefpxpremsf',
                username: 'oeedrzty54flhucry5ys0u5wqevvuly5ldkz401t7x5gbnz4jfq6gpedi2qq',
                remoteHost: 'gqu0zec79emjuw2dn2u492clk2vi4ifkymlii05odej0khygicm6wee3akndpg6how8wwnft9bch5y2xs0jhkmofuiyojz2lwcwezo1cwt8njpkwnc75fn80dqy7szvsv08lp7d5bfqppdnlrg88w2q48z0rqj99',
                remotePort: 3248784633,
                directory: 'y3foia75spb4ai0p0adl2xx5boef279qso5i7kgl8h8qt1h7u19c7zx6ldfjycsz619m2adptl7yqfvo1daw62n0zghcpenl40udjbbis4n8rbc7ncpycpbaw0x4annvvthfkvm9shsxlkoy3uxjd6w3ahqt5ywfook0gicicyr5xtfa4r7tc2rn5wg416egx0vqxqu8qz20knp3v3lr3djv2yl5qwa7jf6pn2jjib7u09hpd51iuo28brg1uxb94sc7lunlvh4k36dcepek2v1lsttm54mon91uetmixamgjr8pammw3sy2eyx568aca5mmga0nafax0u9uuwhnk5skly4g8qxzwgxkai4b5jteqz0ilm1blc3qz0d793me2imymbyuxrmgdxjeilgey4ibq17psi1ere9q06w46zlmozv90qxm2vrt2qdivpi5ccl26oifjupu6sm6c8q3u0wrrl0z5qzjgwkn1wz1ivl7x3x6mongi2p9pp57eqyx4f8odk0d03khv17xdlxoqhmwmj2url3nq2phb9a3vxifcsimfzzxjohw99rjorr6qc4z7x2g6q6mwpi539rchpx82o9920kxtotm3gehgz2uusqgz7isohbi3rpntqvfkgn2o2y80fbksqgpfxbbguz49ruxthnf5tcqum1wuoa2nm2f3dql9atyurehlcxgs47pwnir8rodugtvsp23cfslb8ebcoeiqv5tehxotolr5gj047emidurtlpj5mufa8fd34ed75r23n6a4zr5g4kx3o9nn3ulv0t0et08odofj06kw15fk7elyxi31zjc5y83fhgky2e8ba7vpffl4jad7021zccpobc7av2nwkq3kwwlfo8msp6hcwdsscqytzuztu5mhkdueujf8rp9myjn9ftogd0np8uthp2ix8fg8bn8rtu3pwepau5kz29otwoiucolu2lp2x5olgagpy2t5z9w7g6gtrm3qzlw442nw6i48mi78m2m4s6xodjt',
                fileSchema: 'jvcneszejz7tbkthuhj9ukqlrc6n2r49uenwt2xq1kc0qve3uxvh0fbzs4wz9fjwlnz3nk4vrtchdo4b1rl6md640y29wtgao64t5yut91eziqu7x9gso3oga2ju3gqsnro5m0szvdg7mzkm8n68tqhg6lqps4etat5632p9w3hm96ubs8hatmf35435w8cqmsdr648pgdmk8nf1xohfzusrmm3qc62vp68mjk85djkwieakr1hw4dq0i2ji2i3zyskxl65241vu5ss062qcnexff03jwhluoa331ebky562bk0640a1yrtvy7iwdep696jla9msck7va9b2y4zgmqp22lwx0ujjgjgygq6zebssv6vaoy20db96zmudfh2n1fogrg7bw1jrf8ites4msav6vode4ydgwhx37lvvdpqzlrr2iwuwee1gizo19c8ieo5hp3h1qktpc45no8y2zt9mnk0612g1jysx9hpyv0illc1sexgxfu6p1vev3jfy8sut2n76zxoy9aipgw9ihifhsxmj1b2k4eo1riboxfu57jkdpdus5zm25e6nc477pwx9uz0miqgvc37wzjefle21726sstmm9q8a2sj6bbnns6n3uhvlhie4gwhs2mvu24nznqdmq5n7eu0k1pandewxqn89bkhfykuuewn4hen09cyd0op374jhrdgnipqu3vkgtrkcy7ok8bd86wjc7mvlqr81wd4kozksybp96290o8xkcchysxs40wf385p35dn8acjumgafqqcrm8qrj45mys0m6r7g0g7p5x9rnbib8vzhofrdorkkye64v6yi97n6r0f3a8fvizl387s5vkibe6c6qy00aycs6gqgickow2aki9z54ns1sp48silwbrico2yck3bi0kxtwvc0pbyftfvpvgncy3lyi0yafn1nz9zs2w2e66t4w9f5ndeeqmkreyea6l0sdv3fcifn2yyqmzp1i921z4qnnctboz0jbmced9d7oa12sud4ya97',
                proxyHost: 'cqxzhmv50vl3f3qpguleb0cai3op02hcth6t58cxljwkv69ki258usvy1mzu',
                proxyPort: 4050066377,
                destination: 'uy0y5ddmc0kp3lebw7mlounlky1gk080d4o0ydd1ekso8jvmotvwjup6p1gav7b8l382ouh72324kgyrbpz8oin37vom7addjrl0548rfnwcqmxidwnrywmgkc9q8z51e149bx80hef0hvvxt0rycdoe1o21v0gb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ez8eif2s4pfqpbkvoo8f1ahdurje3w72mji9yt8ipt04npmrn2dtpfv5744b5p9v98z4adi9rylwq3q1adr4h0m58jvzhlmpw2qivw7ndv7qkbx8vmiy347ewc0n7ctw2ujttpwsbrwll2u9zcsvtl7vwjkgjds9',
                responsibleUserAccountName: '9icqfxfp27albjt0sfme',
                lastChangeUserAccount: '32f66wpyoziplkfwvp9k',
                lastChangedAt: '2020-08-03 23:17:48',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'ur1led40gvn7ul5plrtn8fvoukq5apeyta92x5ee',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '6bffi3fzeo6r8ag6c5lalinhrgssyn3zdc0ijhahookmzx5t89',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'uuxnnwv9fieotvf8azpp',
                party: 'je1alnxdok9d2jit3nurgk06fyyx3k00ld1upsowwdq9a2t2lkp433q7rfnxf32qn802awswh6mcv1kchj224d4ufgj4yq471rj2ts5djjdi71g945mj694e1efomd8oz2yg1pmo9xgmevcaw9lkl8gbzbdvr1i5',
                component: 'muy6n6abts05uduyegkatneipsx2rcclhp4m5r2jb2h25rat3fc9sspd21bmbg2pacih3fsldubs54iwclqw57gadc2gncm8mx7zsf3pz7rfhu2zfigq6mncg80is2m5yywkoznjyxsgzjftzt1c6qvrxrvl4l29',
                name: 'qbgvovysowcio3k8zsak46al00dr3ua74gklj4w6ekoeoj4y8p8v0ove1lhzpf24ljajlskvmegjbm6wuqynakz9g7597lxtoghufu7qk9k1c7y8szclkri2izo6nkmp49ldhys6762d339n32z9bxntr48m5ez5',
                flowHash: 'j3ykps0yfhzsfhknzinos9a20u9f3jjf0g2ijuc5',
                
                flowComponent: 'n5iqbcnthnggllsjbsoglzpmkk9dgn7ja5c4d2vf62r9tqv7lgu3d564shn72whkif4pvwlmw5ttzwib2x5bpxhalji9wu80pb2o4ikdyiq2p8vmhspeiy6p9m8wd31lto4oeghri1z77z8dmyib3y0lvjyt2tyg',
                flowInterfaceName: 'v4o94nxf98q7r4uutl6mk9hhw2be9hsdm5tzttwfntkre2ob8x7f7b0xnz86xrpjibj5fdwnlsjvl320fbvqauv248hndjdjjmarwq7yo2pzzvna7bu1volrul059676pi9x3a0ql0f1r343j924wjvco3z9kt3l',
                flowInterfaceNamespace: 'rm1aunddzpacnqmv7hb9mk2okbt7j0rlz5zhofuqw4ne18ckvxiifzbwbxjgrzzv0hg71lppczer7fpenbutx0cjebcucq5qj5wxdfhuu75zs8owdezb08nrq1pd1mqldcs47f5m0p5yp3mem4eq4x8go54o0zhb',
                version: '42vhhvd769bid9sm8x90',
                adapterType: 'abr82ou6fc2i4vwfyu98latoamkn58mh668keyaz5u0mlmq4rqjbm0q93eje',
                direction: 'SENDER',
                transportProtocol: 'j724o68yzifm15a97kj0opwptatw6ds51p4avkslwvsjdw3uxh00hwtsrxwz',
                messageProtocol: 'cw9rn48irbxy90kp26fenck7aflfnxkoh5zfm0v9sg84iy2uho4sgqsdj59f',
                adapterEngineName: 'wlsluf8fdy46pth0yi47t6rtb25ge8kf9pxw5m5da5fecpcbxndsqf8w9aobzo51ukjabd76mkub3lay8ilalcgitiw7xqrxzk3yovn1xwsy0l3qpqqb7jhrv92in7uzv3dwh7ezucbkc3i0cj9hc9eamsco7auy',
                url: 'hlpow3kearuglpc887mvhwj7cvc8yh01ret719f251bymp6sa571ubr4w0xw4bnrp4loe1pkyq1ilzn0t4b6wuwoe6nh0nl3t8xa4xh8adhky6lbg0i2505xhxz3kq8gzilrgtyofgcq3ujr509fwrsiivn6aapb5wqbdfw3fq0zkch0c70aeyz1nb4fr8mv1fhye2gacaxogr0kwh8u7ngivlh7lzokw3pe35z8vqv5cedlvpk48w35h9s9n0h6zd79d1yhkdndv3kves4nlxnd2mie0lu456owrk9jr95b2vqp9d3g7tr4f12ut244',
                username: '9cyhwxvdb3jq6aytl3ujr8wbkghy7giawcgsrco2rpo8e0o2pakd2snld2ld',
                remoteHost: 'xlwl4mx0yot7zurdnoq3f1iwkhghwh05ehuq26akjf77jf1g9n6l9dy1rj3l2pmu37hilpuryf3agc6kzcg9dolsbt5qpkmo8eshk7smxc92x6my1vbtjdar8sex1qgrqstwilchasnupkokpur4zr3c23vvf725',
                remotePort: 5610749316,
                directory: 'kys7p3govqgg3av2xqmf1hqebl2pnf8ydf7mgpqhr5vqpiy8b8y1xqg0gso3jdv0t9pghdmxpbukdzgwm65xfrz10mz96hmik279notdw9f8uww2kvrdjgijia1lo8m21indedeerjmsoihkfkx6hvl7zm1hfcfo7txycbqfty8yzbqpyyra78kydsv2kku2r6j2j8f3oyppch0710h1nvbgr5goivpbv2i2u9vv8gu64n199juowjsom3dpcimczw0w65qtzsrvyfjn5f58shkvp204t5jgjfiqzf4tk99x725irvlyga7q33vpre4inarygof7kt13xslxa985zie2iq1cyu7i9bq9f5lr1ur7nx25rwv158nxu80atd4mhp0loxlvpr5or3oq4dwc08l3u7fvfw6noqttdaspwg3hzit6et2ihyy2ccrs8gyg06vr1wp2mel2u2x6ail4fzpxujjyh7fe1xoq5k795eh7bc3z6rydg53vdm32kr2xig01nhj2juy43xpgktzi0wf3ridssophgzl3e6cs6xj8cr8302mpv0r197bdd1vh2cpqakwlv6krubx13wgb5u3q32kvxn9wt5st7jj9e4ni947l6c69zr6jqtlwwr5yed9a45i5btrkf6goyacsatq9c4ra9cim9nijtcerdc2zp4oitqlt1i4kibtmwe0z4y4hmggv4vkmzo1tl6zb74djq7p2hssevhggblnmlqw3t9m68symdve25mck28kfabthbsj5l77dtw4top6j1pjfvz7vcjp16evztk193wulyofo1vk4dgq5f49xtbg1ytgctdaeisjeagxgti4umii1k9n4485qwjsuw1bze0icqwq0qdvg0wurgiacfsaus46wpacapt9ajhaw13jxdq2t2f6mjz1uj52zze1idgar91ojtch8dis3hg9wyw1mtq2u8po1mfbuj69z5i128kv5mkc1xzb27o5rcxljo76az58bxotmw3sv11ow74qy',
                fileSchema: 'wuo9175imuo0iw1yksz3xwrgndt9ml7vs56045e1oaxch6zi84llpn6t7bldezy7dbimkfqbu408fvckapak1f82bn5tr6i3ganra1wn0i5hufch9djub2jnber3t6f9k15fglaupgypon2q3siog5ppvd81ncrulll6m01ecoak3r2nb9bkm4ukdusz9zylavxx91nvj53hyotwbhxhkt5gjs1lgfjrfwxlk00030imxkjm5fw3hxbpucz7z40t8k4k12hbzsqkdjpjc83p4u2i7e7z80gi8bs2anhhpirbslqf4adyv2shfan87n9300rhp28gfmlws044xljon0yderj420a7azzq205umrf52pvi6geerprz598v6wa7e5kal1tvg3vxi47jh55h62zvuqbl8yii7tbytpqz2kgxm06xnm2iloj0h3pwz89whra9hj3v8gf33qnai81n9d3m27id5fcfpqxah8lio37xbik42erovprkxy5k5xs43qmzlqmxbgc1nwr8ii348188g01ile6p9vacdrs2vaxmp1chibjslg09kysshhowcvtteq5o9l2t1hx1b6wdv57twjxya8auctrfiav9yla0kz1dveyf4huqshabek9ms5uec6yxuj9382rmi1lv7tlqal6wjgbgjdnoivqhu3jiqu3v5ui6xjoz9xhspnumct2eutdj291x4u4gcerivr2hqfkkjrnigm1sdrmpmiig3gvu1tadd5yfuuiuc1ydhvwyiz12c7ut7a7zmfvc3c1hq08iauymlcqptvm44pbqyy8ni42kr3vvlukrzse9xwoilfg4r2m3e62addl0ocpqw2md7u7lyk5luujkhttz4sd0cjhtk8lp91l3e45wuij4u9u5jo399pwddvaqzaf5szynzv4wkdxl9sya7ip3lmfzh0u5lxjtiufnblyzzxa8lea5oofr1lmbcev0pj5uej9roenzqofapkbxt8h793onwpy0y17reg52pda4',
                proxyHost: 'cgyfejubwheqz5x92ojp1ka2jdlwk7sezuctx8bssewp8povy38uoqknow8l',
                proxyPort: 9369480597,
                destination: 'gdm7cxjjxjqgflizkce5xdlchzp3cmt4wdb3izzb9va935lqdybl9lq1vagu33lr326ud70aanbyp5rk8f2zh6ett6sq856nhsoc04bjjbwqaxppnuxrf4bf6v8izitlkurkw0annnri2d8nlrx7o3ct23ooyj6o',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'x652kamn7f7yvqx228xj8elu55105n4l5p0fu7j1uu4unqt383as3l7r4detw78g26yakqjl99bvyjpu85lhqzq2d0fpx0guxvs780owhyfy8ih8s4rq6f6icilolvnbth38m7ggdaf94ob08k9957dyxd8vq81r',
                responsibleUserAccountName: '8647xtupflk2nq9pposa',
                lastChangeUserAccount: 'v0fyiw8mzo7w4q1w84zp',
                lastChangedAt: '2020-08-04 05:36:06',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'lubhvmidsisnvwy62a6wiqjrahrxraob7em5npih',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'me3dq6o30crw8igh7vah91jfpbqbqegoiyqpzkfvctrjqtf2ki',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'lr5dvtsuqnorpopkub0m',
                party: 'xmcqwpql9rf16kyyvy73hkg2d2xk6fl9s5ntf9uut3end2snuz20dmk1vamh44402s26rsmt343zfjhafuqie0sig5h0mv0vfi17kkveelxm17mb6ukg2d8g24dzt7yoebxoe8w07ex377hyu7kd14dlfqsjgm61',
                component: 'fthcfw4hfkvi9cvu847a6x5eeuzldpmaawnug48190vwhnncf3o29cezorv98qq0jri1z1x113wxkksg3y08ij1rwmt6dqrqm6csgkl4xqwywzoq6ly0hrtjz2hl9gt6u0jqdv2ictk0fyiivz7cat3ow2bbzjzr',
                name: 'mcw0uxp5qzwvkdpixuc8raf5j2rn7nbqgqgpgnpxac265ps1lojlh0zrletq7ohuz6ezi0086zee93hqm0z2o66dvq20oozoh0t8ebiragsgur7vwy5htm2f6ea3e070i51ybi82alg9ifpbljokpu6tvk683ffj',
                flowHash: 'knmub444i6b7fkerd6t28e1yofi90ll9g68aaf5m',
                flowParty: '6anwazls0woijwnlh6o3l1albunnws2n0bhutldk6xiqzwmne0g64lal2j238mcgle8a0n6jm70245rubwdr57dq53rvxyif2elwbnucit4yybjgr5xuutbxt10r60kin7w0j7jk858psz4f0jkisd7a3fj6ehah',
                flowComponent: null,
                flowInterfaceName: 'tf648etzyjd0tvr604c1wzfqeoflnazrsbofkhoziarc89kkdq9yai2krj9hs635tv1htaafbp3v5expydsnp30oy2rd2l2qdqr51zfd5zg1sqjqptg6eswz883pkhwa5pp6wkf7rybikjh2le1ad3b311gw1vag',
                flowInterfaceNamespace: '3b1dbiqx6m9ch1d1hstw4voo7i2drrxp5yr5tgem1kcqvnrx6lwka3xpx7nf0nvus8hk7n9175ph10nu9jlnjy8whiisdnyacnmbmbahzvxogbu9tgvupz7gld8ex1nz49x5jvnilmk9dr0qozv8d723wvv87fgm',
                version: 'cm6yg36x6jbjzpbwtxci',
                adapterType: 'twubvuyiox6jig19lgur1k4ht329qtwsowotdesjonbcam83zoc0pf1wdsq3',
                direction: 'RECEIVER',
                transportProtocol: 'eezs9kkb8un35fw5fi24rtvy4ron9gi53y9usflts5heaovzy5y94y0e0ll0',
                messageProtocol: '13uxapz7mxeyrgqzng1e2e0po15868ubhqyrfkk7w27wjnq2jej0w8h18ign',
                adapterEngineName: 'dxe56gi7jab6wl2jki776k5b6ouckisak96o6t1xmt0yycuwelkfitjmqppxs72okuxli4095tm5aetui0nff6iglxudt03cln5y93cu6xoefwdvkhcbwwnl93h7qhnkipxb33f6v47o4rwtmwu1rz7wmmtentgc',
                url: 'h8pjgbuyd9l8jka8s84oppawuvml8g8gdrihb97a27j73k5pu9dmsy5svwjbr8vsd4zfrx5vbpnv0ss9aloz1wc0pkj03egjz2w3e3nxcc8f08e55rf104gd9rgxwsxzblqsuywnl9tmk0rh0zpmxuvg2mm5f55qadvu6yqvwdhoizhx3556tekpthf744qpl44tw7u237odtjiki7kolhnq0sshs1hj59u6emupij8jjeozz2q3kcao7uf4vu58jvn1h450d1euj3mvv65qqvk37ovvs64oncz3dghaocatc3jjfoety3ob74m9debf',
                username: '1ihymwhfe73qx8r45dshh5fbiq3gfk2yxtjb0yk5v6pvbtnu2sbrx64habm9',
                remoteHost: 'rhknrh3bq15itli2rgc5x7w7r9n7hplca3jw6wctstrfvikjxy14gqzptaz8qg971xgxp6v559i08jkevxgy8lam5gdhvodzc6f10scz0ymd4cfy69gyowalxku5wnbjc2buorjgqiy5inuhvo2lq0crhzfx5gmh',
                remotePort: 2990451581,
                directory: 'odgiu6jgzbkh0i24f7lnieeqi5w8t2eqg8cxamdpx4zbpsi6bki7zsrvivph7xb5evhgo60n3igcahomojp91r27puayt23xft0sbspcbbydr1vyfyovdvv7e6he6nq8ubecff2z7iglz1wsxtbw1xm24h5arhucjw5u15k9wahoug0wqsyskmlgsiniityb0tqkn3ugntxjf7zoax2esvgkoiwl5tw3qjkk2iy3yh8sujl53u2jmd28zl8d6tzbzcqstt9nh9h6aoic7k1y4nk4cbi8c8xj7e2t27w61j6lo2338l7crtypkp5mdg1y7bbmqpdjx9ak2fdqmxtg0qb1cbtqtjinuqc8013z69ub4vj3ydgjc915l40k6my44198bhfmf5v59h776kwvh9sedpe1xpagef7zlhrxhttjhrrmjreanji85jo64leltbfaow5qi00ci84tndyezk5bkjzjxlzptfk8zlrxoass1fic5zwvykfa5zapdi7ld4gxp6w27x6ui5pdfphu184h5k3nzn17grrkvt88eg3ao6u4yhlvmrahyqekbvs8s82pw7delef1zjwwk79ocdmhnc97s69zc5qp75agcvf9te48kz5sge9b3j9excsuqt39kprx913vu5g7naasp670dhyb4evc6hdcg7kxkxegj2d8myq1ba32semkkchdixfv2jd61wtq54iltynepro7eucq4gjkam8lvo46q2fe7tgln1cpvco9h77cszeypd0qcxtgmv5opzn0s4au34mqc0uezl6m3y9gvryu0yeegme9v235uu2wxngzn27u7bsdgjs9rp5gj4mhfmmuycomqk7272ww8dxcwdppktsrf05pabf0vfv569i1xhizd9naq9v34v1gjlz18gms748bi3srx7rp6h4uvvk6vkpy69s8rusc1bpd1dwckucbjlnczwr5awxhugktq5tvhkflooy3pmrt0prj5mveft4qeqpx4cp6tg4vo3reqnn4',
                fileSchema: 'ekas1se1nhxj5lgpv94lx7flf1t76vsb7ma6dew1ajnony9ilmwgk8a40byx86f8ql9jaiuw9tdfo9qaqgzl8bdf4u7059uvg2iae8iyah6z89myzb7fy866cbbllg9yks53nnluvrv9u9j7iakvusmxvn2mrpwa1w4a0gl0xsmqv59atnfrfcn5oplhbkrb7q6t286n01434qwo7fhmt2wzsc7uz3qstyadg9avo21aksbabluogd3dm3ds36or4e5bxz6nvy77098iren80surg6fl0tedhs32z6fqcolpipeitm2sikrqah7hhdiytdhyovdahq3iyy83ehifm856uiqb0v4l0jg69un1gvq03yla41wswb3p94z5wdu9mqcfu1ats43dcoaw98fh5hfpl938s1u7fhhzm5su8rutmwasdks3f6r890o86o6ixjzwdoqwwsxd73kilnw06aqh8h9ovyvbxk5p75ieaant93x88eb4d77rtcxta957e7smjsoq0mk3ygu6y428mvscyax1p63dyigdzvo8w6sdcmczeihesk1jpct4omwhjrhnnqty40kbqf4nag6j0n84a2uf36q6re34jan5uulmlpwtafz0wvw0losrel4n1fsrdc4izraro8i82qyhbxqoqhnnbh5ag54riicdm8esqqrhe1fndrgpuqbqphtakfojb4rb60u2v22ao75zdk1eg0apmrgix6q3y18prsz7ae1u3jtj2yjyazbnhhcui3t99zyeqr5o3vlofu6u4dd006j3qmg905rsayvhrllperb9j1rneszvyub1f9i0apvtkmjzimm0mil5ygmy7msw9v6dqd9xrzcnyzwghu7khp9oyncxs6p7wek6gbykbszmwpo2csx6b2b0e2kogj5bosash33t7ng71huku3blk7qc0jn3m74xzq43y9rlfzx6n88nmtrrikqv74zc3vw5g7q6o45y4o4y8njkm4hooxywbuq5q855t8coq4j6',
                proxyHost: 'o2doly6q80iqjd5nlfm3z286x65gf3jrmm0u54ckoejyz5ertsi23t770wlw',
                proxyPort: 5893833385,
                destination: '5z9rmgeujfq09a6bpa3jys6qnayjm2xodjbjt8rjdr9qmxjk1rtbaiku1sghcgap82gbis6z326sd4qyhpvqcy6kkgay42kqjxc4j50et3g22r53qee8z6xthmzpraqhjxk4xa0k8046qe4ha6goib72xh1y9knd',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8wxk9f845r3n3kpzhf7257dywjtgsnahn1ll40o380imtcxdp824h5pjylbv02fi7m6np86d2ahhggebcppb99iwowrux879syr9bgwx4i6bj3lf1l5633zvofgz1rsd9398ri8oksx6hkqfxrpleqr5ls4f2nto',
                responsibleUserAccountName: 'rhmvdyuosv3xuop8gggf',
                lastChangeUserAccount: '960a2q80469hjiklwbw5',
                lastChangedAt: '2020-08-04 05:03:57',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'ijxaxuunydee9on88fdivs9b385l5t9scnv9tq9t',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'wgjkym0l954hru54fgyom0hj0o92c7pv6i0kqwjk4gcn3rfcwn',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'iro77dpbvdtdp0slunsl',
                party: 'p35cz0smr9i3di9iz1ohwtu8hsjovirixh1b3uqoy1o5i95oqkmz032i0ja2z9jy2691w9in2nbkhdiok4qbyjcvpc2xksbfa0rn38iy8nsxw9qtg6uao5wben1i4mlims3024v8c561rknjuz4air7f5hr5fgvw',
                component: 'lq20r56djgbxcizx23h2ygstguh7qbvg5b66cd4tt6dqf4sfx6l5r7u1dqglcdtf2badzrpngsjfovryi4rcgzi6u6b4o956prmz56r4wa0y4xr76rrwwijk2d34r3u1jr524lk2jf863f0fodn1am5wz4r9nrkl',
                name: '2r4j4xthz0syr6zqvfq423x85tshxiwwq5y84tzv726t7lli430mgii9bxtutwtsb743411a8ofn3k0w5s0jop39ymtjbsgb0bsowu6esuf6jmzj2efzccf9nz943biyef5l12dgu75eucnpvs7qnwured46nggj',
                flowHash: 'frtzsdetmqgynp3r1wug0a54a6ul8sbftpm3igep',
                flowParty: 'kulo0kzjoo9apa34p3h8jb6n7al7z83ygtdvxajfhdb5tcnwflf2o9w238w1jl8svogvpumtaie6qr1erd2ilfihppcc29kbzv9ykloo39x6s015cz58wgf8q1rawr0ewbgt7bkemumo8dt8d2flxszi4rd2kale',
                
                flowInterfaceName: 'y9hw7c0d8opfnpflmj8o0tcnoq9e04ly964tlywou2jzift07vsiwb56krpe1spuv57iexu2p3a4zhbfr6ctbntbreaklx907da4ih1dt5yrhgya5fv5d7n12h4yc2oznzyd5rlhg9fe4yivsk8qgmbu43xsl494',
                flowInterfaceNamespace: '99uzyebutxe2w5blpjt20n8y2fl0oyqib9n6wrioii20juk7buokngfwityb81t0423tz8j8qgtniva9gh730njfamq0a4nl13r9v5ey3o1ouo2bu8t57fqw7a0kdvja0m2bzcezpcenlztiffka4y1s8viejyf2',
                version: 'xq5w8hpi525wnt61phqr',
                adapterType: 'nnyx6kzucjal2yh63jv33vg7bscmnyvqggdltibstusttxarhytn73t7846d',
                direction: 'SENDER',
                transportProtocol: '5wjeu4cf5noujbv8qbly7ew8vlbxd37osh0bxf3g2oeerb0k95iqiycnqers',
                messageProtocol: 'gyzxlfpso0btk0tfbocnqk6r3nipazdtv9yi7r247xldr4xzqzjvo92pwvuf',
                adapterEngineName: 'r276dehlzx5qb8et5d7npajxacrmtptl55sh8bv0d5itcfx9fw098kl015lb1ldt3szlrcgdryq6xgba1y5ysvby1qdg8cjop4guteddl9jit6oysgbotilpka45w3k3esmxtf815wr75wn37wpuhi0byf5iq37q',
                url: 'caw2uh718cfowldyu97xmhfaooso5lst31h5q79lblyt5iq5myberhx4i6wjexigcf61zwyv6xbvl6zptox2zo39710n1htxq8z1rz6z1033cz5cvpm54ow4b91m63hi2d16btx924lulrarxyv3o42k2km6ttuaa08huynpqfmx2pp4tg8isn6m87fjvasxg0plxpeba1bvmey1r6g73ez3nuznkpz2a1kwapih93qaeryzu2d3lun7oncaoawrwttsawhswpu7jwvud8gz6jvl4a8xasjta8v86vx895xnxcxs599dn34qlgiznzfr',
                username: 'ag9wrrm39y7o1038akjqf81r7j718ljufieuus1jwu5gytbv7qzfncz24p4u',
                remoteHost: '0w380g4r66kpcp59e6fjujkphx0t84zeyskc4kxs7u15e1iilux9tn90m3u8lmh7hajv6ok0jfwk0igndo84wm4ohm5flyddy08v18ljnnzi2ltriunpilzz75diiqmwdp41o6la7nndgbe6tg8dgde58lr0flj8',
                remotePort: 2484287059,
                directory: 'dikzuxmb6c2rqivym04z1scx44g9aivz8bcu2f28iubdjpo6vhitdljtwjj3wnmqnw8kxolykn467l2mottthlk3cp17w3ofwj6pog61a87o3vmfpqp4s2bz1nbufj3eswez0tq26vbty2c52l1ckx3v4tpj966h93a1phnjh30qgxk4lo5vryudohunat3egfuz7o844k447velzgqq0p9v4vbjdodxurqj2a6ie63wpx1i6y5iorghx5w1knuspz8cpn8ms1fcvq8nwdg1eoi9vvw63uzfiej3r317mnf6lbexdm5ix3vpu0opmbl94u71djp7shn8dfbfb4haa0ds8pzsubz42edsxbseyeonze6m9p2lgo0ejr2gm50chtc4uxx0j436naneslmvu36q48v7rp3mvii0a5lvhzhmpxz2kq6acu86hju6imw1tpe61svs6vpcek3h3h9dqa02snvapfiuh0361asq4f54nlhev6bn8rzktrbbbesx7n2bctlwdo7hjhtdteln8s3nzwwmrcxh4p1oq48x58ee2liwrqllhfb7e8pgp5hm2lvdccqfmjr99598xqtlcr79dq1vb62v4akj69bms5cfj6srmzjdyoz2x9izo8y2ipc29qli95zieucmimn1zy392qmwhuzu6uyrmpqzn8grgmtsgn1eiz032y03njrwo6in0vpcl5u8gvbd9ixd5wuhsmz9ahgfjz8e1ivqnmknkwcoftwdxhdmy5lcm6kwbyxyg8qvgtt939izj477jx5xbrczvyo7wjecekm4ox071iyeg2u14xkv28bzgsi7sjnrxuz91rrc3win7hi2wiosew51hexk8fvs6gq5q0d2isq20w63yiog650l23xypil6mm0sivh1csykbyw04c34qdiymwgs0276z6u6tt9xxbkzyibjrfq7sz125045wxk4kr5vrtrnb1id2ty19qrcs293p2m5bqa4evcnzgurjq9ykhog9jbbzzfzykde',
                fileSchema: 'ymnvjaijwbg9zofiofodbtajap6ji4hypfe8q43bqf7gl9fy0t7o30diyk5xui1sbfy1x89i2lwbhl1rgzc067bpdrcmwsfah562c8rpvtiy6pciofok18voki1nr4avhrxdpbl7n2j3ggk99ldl1vuz9lezen2l6we6i321qnldqgit2cv91xhapbsa4q6tuji9rzwi2a3dd0uk28hhkvcgpypu1yfpudr9hqh2k2iyqh0jd53eh8f9ykbowhbof01ahkv9kr93ucekwq7j2tfkd5hndm2tnv7o8ahbyjdspvxexe02ln1skgf9s5xe8tkf8dn9jpplh89oc2wro6shfw85zewwt01vqaq3cykjaaz0akofzd15nmv7o15a3fj8a3fciw72py5cewgt22yv0l3ovjcbsp6xnc5zj82wkqklida4ts8dqe9i0ncrhhs2qbcjx3ygralgv0qvq33mjsqzp7acb8bym5jhesx54zlm4sw671xgrg0pa90kpje01vhnabocvlq0sin2h9uz4oqha17osgdeee7s199i0hmzxztgznsf2fg217d4s1ve1r0fg1kji3kkb3p8w729mus6hkrdvolwkjd0u3z3fj4zlrwnr8z6oq252yly3jd2bbvv8lz9yvgjc907rru33lvecnilqlwxbk8akfv9u69ycs75aies04omshbg37kj182wif82olyiag90yct4d73iw0zlm7di1ly581pq2bd2to1z45qwbui9ccdjpsync8jg8455mjw9yooyyjqm8s5qcr8gymqync98khsr2es0xqdpmb05esy7qhgeikmdtqpti9nq40uzyghkoyz6dm5924qn54tytr02ru5voo8dvghtvyw6bny561h9qj8ujwpmqlcx3ocivpoou27f3mbn6idiii8guxzhur8c7sehzlsbct0cfmp0tj7s1sflre3ztvowvu15ny9n8hzfniq9hb1j2w4enh24crzhoa96jagnu47sa87h883p',
                proxyHost: '2t1z12tbqf3bcw95ag3inf6ogwh1qyomuxsf267bk7iviajkxsggbol4z6ot',
                proxyPort: 2082676487,
                destination: 'dtda85hfvxki5g4jsqxlqjll3a1wwsd3sxst6b1hd9xcqrqdk370a3o4gh83vawkbldkzpxo12oiv53qvinhvk7m8zkb1kswplmb460lxctdsk47yn0f9fmwfk8oz09utr923sfj6ho0ew0pjsrouja690169a6y',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'm8gns6lpbnwx4mcp5aj5ilyllc0jfda8vnwkaougel7q6f1n5amroax4v35ftx5mejoxp8mlosxq5bfpm5h5uny519awa8p5fos6o1lozfh9t32bftlok0z6c35kg7z7cj0gjt4au7jb6alzgpb6hv84jq5f57tl',
                responsibleUserAccountName: '93o258g3vv62v7ayuzmt',
                lastChangeUserAccount: 'kzamsdsaezx70c41elj2',
                lastChangedAt: '2020-08-04 11:47:58',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'hshvs78li1u8d0rvbvnitlumvl49mf3ckpnoqjzp',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '8h45vp0bwt1yheq1wwfaqn63g98f4xxxmpaql3r2brq9qi8k6q',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'u3nfwjn9kw4555yt0oyh',
                party: 'm0w1i0uu80gx2b92f17tbl3uyqhqtrbsp0386g2tqemcnspnqsb8fl0i0892poh4qv82vblqewd2aw4y923lfxodmqcpzb7rm61e6ctdvqvnpnde8kh2oztuy7ae8o2p1nkkawl1x0ky2lcoebmzsmqdceihbq8o',
                component: '5eov9ehhn80sycybaa26h2xn7kjyl5ppwwmz6jm47bzqhe1kdwat259d7yod477d7dzp7y20hyhp4m2yr0l1dw049jsm094r4tm5yu46yyv03qimf848jih8hjhew54a28719a4jtve62c5j8njw80sfzp9j8sv9',
                name: '5kcx1wphxm6ahwbl4vozzukamoczawewwbujlmw39cec30lkeveh0c0avw8zs2bbadgacvdf0rdfcka896gauhdyxwafgmkh1u7xscgsv1r4ye2mlto77u8eq032hmqutmn1phdlx3cv7obqozfgi7xw54qcsjxy',
                flowHash: 'clxeu4hp700fcns5d4fczmb8tf54hqqpgmao4zsl',
                flowParty: 'd9a4128tqsasd5aq7b4c07k37lb1jru5yvw7g7yerz14ixk5qmrzvdpj5cyr5ob2a6n3fcbtwsp9bqn7hr89tmm3iecmr51xjxnkc2cttcilhm06irv83wdrsayueqlt1ppj9iqckgcl5qyb56v5zfjsjzwm0tpc',
                flowComponent: 'ffbnexsze2lldgugba47khhek3xw9y8slffh88yt53qm5diowl04i91e82gvlqdz9ksjtdo1p7mlshr87rb5vw9u5b067qejgk0d7pz1pnrg5cw7j9xiatltrgqad0ya3sr56i4d3gqlvu2upgj0c46vrylkanie',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'jmxyqly80p2x6agdt3yzv1cwavoxzejv1o1o7thid6gi7xtshp8la0ozv05s0i0urvge9lk8pvp60qg81folzt80pueemaif8dzu1r8dewlo4m4n6jm9q9n0rbmlm4g09zzlbrozneafzbbj76sbmm3yzwfifaeh',
                version: 'eoss9kcrugt98o8b27ho',
                adapterType: 'lsu7qr468yfcflf63nawnwjtkwoyh8giok63twb0xak2s5kub5cc3df63j8a',
                direction: 'RECEIVER',
                transportProtocol: 'xderhd9scs8uw3l2advrp8lhsyx9u5etodddcij7931wuaot940t0m97n6zs',
                messageProtocol: 'b6kosciwwvbzd7na76h765x36hdlhp4va3yw638h1nfefbqbjd9inveiqxzc',
                adapterEngineName: '9g8tqo5mfqidfhtjfiq8uvh4yv2yglp6bsxchbjtqjvn9664jqhzfa75vgwbdwhia2sq011yz5itff10s7y3ife9r5abi10ljo30o29yn5ptumdoli5fcrlc8ecxvojnno5pmdiwxzn8v33pnng6gotpvb7pg8ph',
                url: '0xdb0g57bezwhlvmlrxitupe9etvq7f20ll78m5g3trz1lbkn09jeixz3yuc97gpc9dfj7s36kcjr8umnawgtdd6oy8vm39smiauq698yqz7vvdpig9leyjek0056v586wtmldvgghndoaplfi6k0rq6i5z7oea2gxd8zopuvlgeprp5naki7ymzjsp03y4i0wbfomvj8uu4q2nmu8vutvxnxumabvfe89nl2c0gupktkwgrmwpq396oelvmvb4f3qmbgp9c6l3nudvt12lzfikv1beutae3tmyg1t8b7awsgcvwm19k17ozumfrlmi4',
                username: 'udnyx8b3htzf8orseymmmo6k8wrj33l2umi1q2comhk1j6o76l3y49bvce49',
                remoteHost: '4h8ezsgqoat71yuzu9dmumzusecoi4fif2m807tlzmmv61vas3ofrxnk1xz2vd6nwp71rplq4ko3phgimp8q74edrnbkxvokjyydusvrtq6ah4zzfkr3gv4az9293yj73q49dduwogvm2yw4f55miwim09zkusxd',
                remotePort: 1245299937,
                directory: 'y5j1exh7ei1pr8y2e49e4davxaf5mzkjq6lp42dzadc7kahykd6ldtopomidntiig3tbnm4qyzf7z73qftuz7k2fjbu1z02om5olrn4vn7a8ed67806s93ojt31633but4x3ohgskskimxylyrrz6wo6pbaqwzhwedtwhjfksv890qwwdu6hkfrhx1pmppb56e7cq3wjm7w7pyln90pe1qubqrhk6fsn3sqggemu0jtnbi13kbo2rl5iqqqzb5a8jjnelrtmom9ij9puwd9ev97q0yw95nol606jmob5kodqqlj8x3uif2ljo69m6tr6a8ur3vj73qsso2zy4j8ljw86ynxg0vdtre5o0lccroh20cu8ex0j5gi2z0lyz1shuxdikhaywq6ts2ewfc6zquym3eg42yd27j06g9rzp5myc2u8cbxlgbzziz75r6cig89ayzigzzubke7qud3y3l8vyd1zkdfuelo5tcinlvyvc44sgs1xyk66npv3wdhsef5gbsyj7sd4k8a7apr4qylk1xeqh7dgszfhakrb84terv17k11inmm9q9jqh2agbqkvxum2avj93j6r0ovho6sghnkout7ju5k3z7lubgl2jei6rkqxhlqrmm15ilsh67ewjee3sr1l40amxpfbiezqw3lftsubtd6m34zwrs0dqnggphv1l2nygv8fo4end8qzrr5z8rvxtisg92sm7ea3ox5ihs4ls7dl7wf2nsigba8ve3tkss1m45dx21crsnz11le12xmys3l9h9sn2l6ufz5q4c4x0irsrolrwsbueqv6dg9twila6fn4da9acmvymqx7c67hhao8su5nlo1gneh9394wnivfsqlme1y8uy4kshk1gdgiga3033wer7g3gxov1bkpgn5skkn7bif7f9at4bmuiqqhqwvf5lnde7cerk61xf9b77ylf7834awjwqu6pr6fmzwj0rl7dgosnrmk5mluvhnvnxzqmp6f81d9jrcr55p3hy79cq2k',
                fileSchema: '4unjfdd1mfw533ikat1rmdmgk1atum1o509bgounn9b1ncjeyzvm7kygs0dvdwq8njqvy5qij8m8mso0bwzavlpyiskuwua2f0t2k288j0vpu73p1s0h3p07jf0gqn88m5pc1p9vh3inxoptifcn9yx4dv3mhhvey74xvec7xun9vi3koychq5ykcddhcrwffha4dplolzo60vc7okhgj8q4hl13zxl04pxta3ktdg3tqvf2aovgar8r61us1t3lst5b3id7z3y1ps16z4ju2hhklnveucwofegbiq7jx22qzjildl4tyehxjjszuxekwu7b6g280rns4dmlbastnjfvhsi8lp72n2w60z4ynnabiog73q1kir46plyw2dtfuwbsh5qyao86ew0ek4br5ektvmzrdu7txy7my3hyzgh4u1amtmui70ly8mzogfw5p87l221aoj54qk7mx6v7u6javzvq36u030x8zxqhg6rqeaf90ziu59peablag114ic4euypo69fhtmbm27f86w8ubize9m6nfz95nxftozeexwxclarsx5o0ks2n3vxponuha22pmiktplz4al8io24z1t4dp8wqa2qm379celwgaawygtfpmj4uhrv35436jqkzyiu1t5e5xbhjh41mc3dtebgy9bauqptgto6r5ircnds2o8qd5deviq24q2m85hj1wavtwe5v7hzshc31v467bbqothp3oasxbuzsu59eco99xaczvii5z0b0h5vy04ylbe9o5hbnq3adome4usc3neyxb9rh0smjh7reuy9xnjgtr018dtubc2tnr7uole7mwlz2u52ej1nl2ddfwenw86tueyv0v8waxz70k6ctgpybxopxyf486xfh25t8vovvf9kzvzw05s1m3juvv4elscdyx706szj68vuepv97ar57h0p89ndovldr4g55pxxlp8bbcemq8l6isy0xruz7r5lhgsmeylc40f8ol8dntbto8b91f34ntknn910v',
                proxyHost: '3yn44vn1ffnyz0h6i1uv5usudjjkawzb8yyed93lypkntt0akakx2jlkcs13',
                proxyPort: 6215937893,
                destination: 'zb82bfdodfiqet2blqwxf1wsglca8yd1zwvte6xew1s6tctw708ar2o6zetu05eypzefaeqtst5yfmb3aem9byn5ev7mzmvrz9reaw34ym718q2ewid5uvnst5j0tg5t8qk3r4jd5gfm30984fal4tcvtz97zy7h',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cnl4x3vc1r0fheyh0ch8rc6ybnedlchlb518xikk2go1uarf24dpewc2whjssihih0h8t2fqjtoj5848jckl1w2blp2i692mhztech13ixxwstes6ian9s4u34p5hwzfuixgwx9d7ctqbvbjkhcc4df0ik55f61p',
                responsibleUserAccountName: '4yi2oerseclqltg3zxhk',
                lastChangeUserAccount: 't7f4rgoq6pgamncj15b1',
                lastChangedAt: '2020-08-04 14:16:54',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '64t7j1t8koa98jq4i8qzv2ph1b6va4dieysw56q9',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 't5102r0y4dlfnj672nu0d9mnoubojv9dgr6lmyo5l7b41pr61b',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'oqy1z8i5zwhkre8z9knd',
                party: '72x5a9bvk69cqslocy2d4bncvd6w0a5b7vzm7b4hq4b0hmscx1rbb2low4vw1z0ovmr9w45stafi7xxi2vul6us4c2s8e9hw8b6u14q743zysty1ivezdlwoc5tulu5fzvcimib6gxfw7goseciuyckljf1n2rj8',
                component: '98zczyq24tar75riq0mtq2br40b4s5vmudbzdrlnfjbdw4oppvf32n8rohavxopf4z8tze4mvvwkcs9bc27nj1jtkrwvamlcxpkv9r88e5by5yjdnr8ayj7xtshhq9t6gof3iuo3xur58rkjy4qelce98i0o0rez',
                name: '3d8f9dsl8kdm85oeu6paseowbnt4jwvg0sc3zc1zj8plibgpdy3fxdy53x5loll0ioo6vv2bttzwqm6oghex2uyzerzeqr3rvdp99btuy0jaslzusrys6qqip350l29ji34ibnxshd4m459yzgar0tfnl884omur',
                flowHash: 'gszrxdxlidshtqcclagzfzma8qb5nhfcz5pzwdp3',
                flowParty: 'r8292jrwpecxgg7f09vj9dtktix14bb46v75hmv0tuwldiwm393na10134marapg6sh47lg7epftso62mqdjrl8hootukpb6qgn1uqgvgq3bg2rzvv8881uwnwoi4f58ijwxh3ora1vaf02c22vddtje6t3c9er0',
                flowComponent: 'x7ob6aqn44iqewb2krdfnkqpc2jaercg5imjemxsqfzyfxqd7w9ozunb2x5kdlm2tno90twoq0cs3cebof3phgmd2jd1ft2xs277qxmbj7myjwowdjgvqptpkwix0tzqdbcjac2uhwzczbc2vvqsitmmv8ay0rkv',
                
                flowInterfaceNamespace: '0xsq7gz96pakz3qevfkd5jacszmjrnr7pxeosswsxqs3pjzy5vejg3eylb4nynml13e97dvnsbnkao4bn6yx9vzik8gmy8f3m1ljgbf8jbcy48pqhrse6mfmb2qm9i6c1t2i5vigscf9xebgqnh7imee6bd551vt',
                version: '2t90ihyfani146ecxj31',
                adapterType: 'y7a8rslmgto38m7zkzpu4kpllxraw4r2aa346hpegn6a4ur28rtlly2fvdem',
                direction: 'RECEIVER',
                transportProtocol: 'rgt9kqfkvulk6euyufz7h281hgsgt50y1dujwf4ice2b12c3t22fzt0dlhhq',
                messageProtocol: 'swsu1hbs5qycvrev9m7tdd17ilttzfejflo0061ajznk9hnqk8xf934nkv6a',
                adapterEngineName: 'ctib3djo2s04pp4d22mm56o15uu2g26nv7ky0raod7gzhr2z9dxzvq5n07nizoplrxc2lhu9l8aq1am623g208ou7sn0vwqj8kqjysazay6qd4y5ltsx30ovz9nwju38xswxmtxagwy4d4a8l9mqywul8mbmvwv0',
                url: 'tthi0rhq564uuon07tbvxjziedphg2fij5wes43np9edlbvdq3cc6iq4a5zp7qgdlz7bi8ifzgc611ovgijwd7rxposj9ipvopyslp1oml8jg96l1fimayrsaankagjygsptvceyk643y4jykycelbwh8163bfipz5qec77e3081c910nkon9fwlnumf05ww8zhik1ll83477uyx2u3jdn4w25uupbcsko6ts574jl2gvfvy6v4uz7u1525fyf5o0c67hippxshnfdr02vh584zy4rjb96giaspj0pixjw5olebg2levtjt5nrt2c7mj',
                username: '7vafy020dawmeo5jtad31rfxrmgr5xi4nakk8zc1pqvf9jcevs8yigehufh2',
                remoteHost: 'c0k7rmg7onm8ksbzqwmunbb4tonmmyztfmaytdbjpv54qbf5ks0rm3jgygdi997nm08lb5ygiat28fy3udx3ny7uajuq3wjn8os3zqstgeuv7goqrfoqa47x3kokfkaby1k4j0dnxzon81a083w8lths2umkqxbc',
                remotePort: 5877064383,
                directory: '619kdo8u9c9qtoeteq68b9mo8t913vqu3mhpej9r6r8u1c6moukw2ln8nxghieh2noqorp9ls91ucj0mb7bu0yhzqmfklwbffavba630i0keg518o8vbq57lnjetgji7gxhh90n6hp6zl9b1ethqsbncc86dl0d89cvg4oc9y3corzl2vzr8m3c1pd6eikjya883asbnynj27mz7ms1nwl2yo85427wo0572mqzcwv05tgswpnhxsgkgimodzb0jomkcl8n6q29v6pr5mz1c6dbmwhn9xvznwp8rxdfszrvmiietgf48fr9k0eu2dhlpfnkxxf8iw08hj9fxrhkg4cq0r4urpjkhzyfy91wl233j3a5zx8870y1btg3rcioe76jmqs3ovwd8ekkgtu9h6x1bvp0br2lefeq3r5xi43al6s27br8yxvtogd1szekwbaf5osiw5ccf11bkztk5ey8cpm7mvsnvw9mdergoehip5edzesok8x1x8co9u1mpypoqsrpfqjbapxsjeki5alif4q406dmvyaj3125fyxtjyq1mlewbduw10uu732a6pthefshy7hddqwvzuf9y1evfsfr1z3qd8r6jmc4trw0pnnwo7dhex4zm0dhhd16p5zro0b1s2bkjxgok20u39k613boekyu3cqq44g3msdvzjwpy96udk2dug8f7wjabqgrzljvpe5rqc67tbm0phmcjrz0svd44gyxst7vih4uxm2qnkw5ec9lqa95b3yoqw5if4zz1t8tcoh11mx2et9tafale51vjyjmxabjvdb8sx3iw8ozahc0bjdg4blx8m6wps9fe9xtw7m1b4s58pkmobha8t1qd5l107y2tn8za9c96722ls8aoy37dr96qu4fts63tzrhbs4fhxzjomnpn12y6qjzlrcv8h9mpd8pdwxth3xwhf5ik23gvx9o3bti2xx6vpobw4ui03cku3splqe9qmvx513opitptgmmwyau7yb1ki9df983ryqwq',
                fileSchema: 'm4a6egp6qlfkbyx2bhal6ew22pk6xebnz5w7obtuctcs4ymhuswgdedro3c08zh4sfh2z6md4mqb40y6y8oj32h5do4sozfqpl4xaylj9xciehry8uxfeesxmdgmmfq5cz6i81fgqiftfyqe40y1gq6qyj0v20eif09q3jt8doyvuh3rme6s74kg3x9ltjmm3l6eqn4spi44ez9wnoqgtieb7gs686nsjq3hz3gwiqcoftcgrkhtjcbsnphlpsm6gqp9ii3e4vac4r1ayugaspncz4iuep868ebw5za15egrcqfa7bomga03q3aut2w9xet2tw9vq3bqxzgl4swiabnxte01hd5g2g1vbjojp5fgs7cd6fsluk9uck1rvvwvqqwwhjas04r1uuxy3d2e8nntllmxz7ltv50u5rslxvblkyjb8drbdj8g1vrphdztkt4opd4soetg9e47bg3t7ktkewu2lpbwfyk6z6kmdujctjjmr132htjkui3i4q7urizi0u798vgdly2zr47swkm84n8hkwe9e2m03ngzfx3x9yjz81x257q15i30a8v3111esclaln0rbc99usxoup6e51phy1gf2cgt07xyleehgy1wursec4pr7prxlyjpau3a6gs53ockj7ysrlc2skdsycqpggr05es3blibqu08yye6m51akkf6djtix132xi0hczzw40z4p9c6wdzhw58npitf7ak4slvt6nx9lzqh8lw16d1vc0l0sqnplz4u15ifa7xk07kal9bbdtglmgz9pt6z0cde12b9b991kdhoupfbdrocjwcsblylm4n5l6fjm473uct6fgu2p0sc4jzeqvxxi5j35uslzvn14fwvpx2idj2wcwo3kgh82iwrwfjof613xv8w989sdaj6q733xsn9fwo1xytgwyv8i7y4bcx0f8ofxutyvcs8vv9yv264nxw734jllb9igez2ay0q0um7vzrh7rga39fm1u5sssip0oyehpqu13v07ttj',
                proxyHost: 'evcvgycby4zmfryw94lghtvidn79d9cuyxa0f9s52m2fqsv0kwvdtgzz8y4a',
                proxyPort: 9875862525,
                destination: 'ay2npeuas5z9u26jd0rudmgx1ndltfv38xsfarfew0ax6umt97vbwgq7u04od8wb7owcukxd3yyt4kvulzzhavk7mvzqxbrroxtgb97csviplptxpx52en4gsu1r888kasedlx8jhwxrj1ow2lf31ua79oos3ybo',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c99egsso1se1ro2ivfijphv1h160wciwbf0y9l6brzhpolcsgmjmzl736uhdc1biwcimgli6gkutfnywea5l17bm907rsr1ryxv76m0g3qep2nor80cakanxqniwvzqlm8tzsp3652nbdamdpm8a4jfzb3t8pe62',
                responsibleUserAccountName: 'nygowsb1ya3f3nvi9w5a',
                lastChangeUserAccount: '9224jc6ndymdtbvd7x1w',
                lastChangedAt: '2020-08-04 00:25:36',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'moyrjzcjppeziswuc0ui0a1cciva4s9bv7pc0new',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'igmxfeve5bdujb30k25bmz5uwrn9dk0eyct3pbmeg6831o4r7l',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'kzzxae5ndbtm9mrd9rqx',
                party: 'b6fx8sfxrrc8ueafyagxhe4dj2kysqswz2u1p72in5gacmmebebzn0adbn3lxl9m2iow4talf4bxchmt0efdu8ataf54u8nr041jftw6kxcrmz1qvgqzyh7zb845f31qybn3deoedcck5iymu0g308abutgtijlt',
                component: 'bxixgsjqcocch5aa333utx8gu144ybfb7hll4ccevs6xui920zfgq0ipm717npgt904o6orznilnh6sqp349c1q6jl9x66ccvv5higctsbr9reokicwo5pu0fxeufhrqqtv8n75ho73q63pfcko18y5kk5gzusx7',
                name: 'fi668xbce7ajoew0dgkrt3dgsn758w9a6bsvhme6kzrskh7ad8uhd4t9ohegcnvibupn5dr3b39df0mqm1yctgzv81umdynm6lypatsyueicef4xcwvqbq1lg1retq76s2uq5cimy8gp8bkmxbr3or4ey1oklpm2',
                flowHash: 'gompqr6tzidilm42r1d2xgzqk2xgfwerj1dj8p1p',
                flowParty: 'o0z83bkf1z7yhge9l6irnm3tcz037cw884824iwosk0lcfdyz10038te2upg9wzf2pbtfix6v1yoe8gk5azj2ftw17jjvbr0gl1j7a3jeurr2rvclvrngffsmv7e5js8ycioam81iom8ovrwbiec89cblqti25o9',
                flowComponent: '1ulg7pytm9iq71i4ivqam0attuzcyj0jnliqr9nww0xva1l4zmniwfy96axgaq57iqaxuix2a96eufhis1oxn6k0rm1652gqkm4o5ih5npk3up5umphlvuj1hp1gb315k3nwcp6b0vw5r8129q8mdcp96sfaqn5g',
                flowInterfaceName: 'x8r051n2tdbera9s9244u949cxzw7pzadtt83u6xfdr1kbf55ruaosly9xuha65zp5jw10snrkb30ygk6jk3c27pqj59r43me8lik1f8ou2upxo7b0parhi19wmxaxhty43tlk36cjr55xv559zkr5eraova89fg',
                flowInterfaceNamespace: null,
                version: 'rw6n5w6c2nfmp3n9iny5',
                adapterType: 'w3w7waqjz0h8ukupel2wzp0bh572964y3uplhu7xrbt1i4aynt15y9i3rzip',
                direction: 'SENDER',
                transportProtocol: 'enjhvjg0clbszh1rfktt7ipu980qqgjrq5ti61juzzuc0hqujwjkmgz1n0i8',
                messageProtocol: 'fk6x0z10viz8gh372ajzgrlc2ipz545x3n9w9y5l5p7jd0jnkghr0hxtea66',
                adapterEngineName: '3x6anyib78r7qa5dhmyzi7w3nk7h4cjccxzva61qswk3juaddviq3d0hq6et4p02cme0iqj8h1e4p1oybzokrtnkfc06adlury6xlmd1v4tfe41mu7wl1tw3opg6q4rygwm13bpgmwdazgg1pwtxbw19f131k4qi',
                url: 'nezwlseo07npccvbvy4yebo8e9r3lsjsxlabjqqhylhaa9i45jk5qy7my6dy0v3l7s7su8ja0crbr6ohmb8xm01s52jf99egc3oihophi5suw6sgyheja2s2c51pvb69jwbh0vfo05vif5dymzq6j0iw8398f10337dm2k4zbl6vi4ly115kh8ki8pd744eqgpff0qg630nf8wsihgaijqopy689x3c07fp86xm1rayteukxnsxqco5wyx19v5sfn917u5c8tv2hfqh03a06y4otth1iar1bhs5aqpegrukyc65e7zprvbluvzlo4j7s',
                username: '5994z8iq4w5s4rzs4s0rvt86fdbw2eafzajcvdoupmdqsaoptp88masbx7db',
                remoteHost: 'fy528vt9v0pouxf744onc799bkipactstgt4t0b9rurbdboyxz4h14vl1erullcuug1dxds0qegaxpxsa2cxnp3qezgoxk41evqqgeaxcv2upk0ngld88i3uvs75fk0ji3396biwp08q1w0f7iyc8rncqf6d8lvr',
                remotePort: 1896276461,
                directory: 'sork4y6ited4mypgxkumhk1clc1vnbx4zm11oj35i61x9rgzzjfk53c2lx7qjwql6hhflzbs7h7ymmo66joobcj4qp8w4qa8q8iy1ht4xdhaddskoadlky41ldvoxw52vr89yyad5at41bazlgh49rz6zg1u39z0fywemnhfa7m7c9tyzs6yzrmwaag9lk6wr77rzkloqf4rgvx7k3006kdkniqfz8boivp2nmac3liii6yilawl40q7ba2zo5vw6w6aidah95v79gcarseudep35gkq2ceys39frccuekszs9nojgee0g3uwt57djbeldu31oubdrhseb6bzlwjoc9f19eok6g5cc69mj793ey09tvbqwmn3cnuwn5r2j9vlljfzi8noiycnwmiqvr4q2g3siylk0qitu3ktiodn7cpksz99ufjaplbve8586hcvh01a0h9ytsjqev5rj0zowt92jqrati5r5fob1rbyllj4g6wq20zz4zaarxounr3dvkhyudbdtmamw3llnlaimk454izog88ldvxup3pq1rjl37f8cjsbpr1feelrcrz7a9kkbwhqc72nqew8pxswe4zi3ljb184ide7bzq5adwmd98jf6paecmbin42zqrqhgu72b28neojrmxr0s4yziwx80wl37xfnttvoc3yijpj5mg105359n7624qovl4n62v61r8k9ygpwdoza6mtbgih873yymoksvvrew2xkg9crxpizqiv7bm0e2v3oxwrnvn9n988aj5p2xfo1bz9661hpr369uhtwiopcbqqyblslzjtkdkru5l1m8cjmjhawpr2i2lo0vou5kxlkmv4wqnbt4qflq2er7z87fgc6mhfiu6ciyn2a8a6kbrqqmntq21vvme0jklwwxp9w6mf1k885s7hmu5rylm950sulbxz1apl56gdb0ova7v932rzwqodgpfl2fvpx7aypgw509valrif4oxcjgxlztp2hrt1xra4038x3h1urm94f8u5',
                fileSchema: '5inc2ydh9lx8xsfrspfjoqmmk5s2b4r7gxt5wners5m6mwaouk9gcnmumoami8e5f6dzc7ni84x6qbz9t67d4p4itr4xu0xwhvvraalme23s3e0mu1pv42827i7pigl1qu25ir18pnjf2l1wr2kkvij2tdyd742rng0ajfnj96asrgcyi0f0brdejj134xa5pr6xsif1spfefuhu19qgg0n6iqwmgjyowpt6zebqkfezeglwb8gsud5tehsu9pwyh0qjdqa1jurt5dftglpranviq5ctfxivgegqpay35sndew31yepz83mts2tvyye5te28h9goxittx5eynkvl0jd1bgrydox4jti2gthz5yb5ggic0avu2nprixf42elb0s3ghinqrqdzyx65c77d6kb6gzcpwbp4anf8cez07i51802hy673ldwozngi1tjr85omn3sfs5pdi2nitmds7x2xywlo0m9reuz1b6suw8qjcsdvll61wf4dxdi7tp78e3kk3f87q4p3sg9ymoqm615z3slcdzlattetskozubvbkgtcdln7vdvjvbepaxuf1ygwfnpm46j8y1ovc6odegg103s9v22xde3y5snzxm5q00yp3jmqb8au2430j0ut0lwz0pe8ck60cpkzr7moqgf5lnpxfw28o1ocdzbz4xcgqcnrp7ttjwpfdfkxhmepu9i4czswicr0ptyq523s1xpsbwuajaq8ffqd5rs6cii7izl7dlbrlrmgah52r34mppmiuideh5w4sp21p5d4ncrc8mh2ij8l8dkjbuu2ay5d4hzjcznxi2ne6ukb7mzecqdlj3ptxzsfefoporgdjb8oymph8kl2vu8uc57oiw66p4mzqss592ml1lbqscxsksj3z49wlqxda3v1hx9dw0pzmm8xawgctv6ry5led7fzk3bostyl5deo4yghoyruywbwlwsvlc58y8y8ptq5m8hd1kl72kx9lh1iyf4hl844uxihy0936w85siuuj9fe',
                proxyHost: 'dol7a25clcv4llsb0z2b45cryfvxc4539qa0taivz27dyeuqe3gia323zhzg',
                proxyPort: 6160833231,
                destination: '7t79084pbr5vv8oq2uq3keecq6z206la1y5dk7172sywgk2y0w57s3b2fiusbzwrzke73ahrfb3orasn8dxeh88y9ofwu3nuepj2y0e7eypu10fdauef67p9c91ganapdwee5djpdk320piw1vbvby3ulh5p0abv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'k2iwa6oz6b8nwkg0l1uumf81wc5tg2zm00gfon2nw8eh1939uhqrpsxjq9k42nrgmdpcwyyup44k9ym7sfnb7gw7u1vj660v5dlrdzt1kgqy4fx5ggp87cyeycn9kcef8c1ts4w1yhxoe2eaplahnp904l4cg7k0',
                responsibleUserAccountName: 'xq65rya3kftbutn2ehs1',
                lastChangeUserAccount: 'e85rlubt32i2wyu148gn',
                lastChangedAt: '2020-08-04 12:21:45',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'h77hdld1wej06c0tbbf9l7jhfxjus38m62jqgz6l',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'd21guzh2784be8rve5d885vj762tavjav2vs66kf9ghlr2953k',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '6zdibx0ovb9mm8rcvscs',
                party: '94q2r4h2rzjmghyqatnvpdptk89rbcrnjoi56bcshacfsbozvif5hwrmpwjftx3d5povsgv1h9jtxuocg6577nqt12ke78p8s1f529xcu5jhivde4pgb4o0s2ui61zgbesx4vfkdljbdnfdeq0et0uf8mi19svjo',
                component: '8veqtgg18k1t21x2jmtrki7tid43wh4hq4gdfks4v3m3uf8om38b6h1m0de7vhrbkuuhbq3rwu2xux44hdfhz7607kbxyw098yvkqsruyqltiygewe418k0zc6203c9xvykocv0ny2yaolr5u7qwiy4dz6pbkmx7',
                name: 'qcrf283olm655b1yvbbzvrv8rmlawn47rgybte4ksklglevsh2tf8r7f2g8330t6pq6zkt2k0ao0mfin7ie6mr7hljgebcwomtp2r05jzn5re0rxy3epceohy9yy0njmdxy0b5wdydpt1ob4a55zslx5iscxuoql',
                flowHash: 'zeyxwo5t9adv2v8tlrbovtx8h5yryq7hz55v3hzn',
                flowParty: '6cvcsbf84hdf2kp1o2wdnhncqldi2p24erbz2o16iyc0hy42f94uodf6uhc14rprpd9v0c5kiv1yfblliij61pt4knkjwp2k2pl3wg5s4nx5ax9qylqms1nxniz7c3gzossyii7hrb3bxzqmr632ix1n581kwih5',
                flowComponent: 'a65bcolg7s8cqdzmqjxadvxqywhjck16xq1wh7mmrza1fwbqmnvnqum3rv1humlo6swwh8tr13vjyaty1c1q1y40am3csr1yfsa3nd94rake4lsyn8lcl6ewvlxrc8nqu062j5703pdstw2qnfesysh4rph1jb5e',
                flowInterfaceName: 'cfzwunsv198ch612s49r6lsybv2hp4qlzztys3ocs6cny0assuqnqmkxlmlntkj4nm64ocqqxxitxbh19mluiq93o004t230quh78b0qgdk7k433s121k49e5w6viqxqhar5ywakgbmmlrndde1rduv2ol23zwyz',
                
                version: 'm0rn4cmn5s18fncvz92c',
                adapterType: 'w99mmz9m50bifancm2fyo0s4x7qflxgtmj1d14wqlqvbn3w6fh1j2hcdxf5l',
                direction: 'SENDER',
                transportProtocol: '3gjle4zfve048q28qq5nscyblq8b1yy1a7ocpwcv3snfjmuxka10ids37gys',
                messageProtocol: 'por5s8bltdv8qzuw737iukwh86xjelj99f9879iujzxk43z6udlxk15xqtnv',
                adapterEngineName: 'mbl6t3uj63pwn6za7lguntj1bawfhaa7xzlls7qm6qexw3aaiwlq3lao6l5hk55u4entogbpyfmynayl8c7k3zvz2jo4svmcl7z4xhbijlj2zrvjeyp12s25znlqfj7igj0ivyknadz3jsws1qj8hjuxlbhtt3rt',
                url: 'k3xw0dk5rfkpffiedi51hyhsyr9xcnzhfpyozwibtnrh6vcts0ykpf7uh65pjmlnshtkelapz2ivfs9zhh49deszbdtm84b63vmya4p56lmzorauxx71085j1c3xnsn4mbf9n3jagzbzn4aqq5l4ji502byirma91zpzeurmy7pz1glb7iao18bf6q3e5p2c30zelvex4i86l6nnhecsi75mr5ddi2vvbiyczx4xxct96fbp8g3vk0dxsobbwrwaq6jh3ca294nanyfy1feg598v9ng6xb2ytsiuelngxxniip6ytkjun3e04iyxs3bl',
                username: 'q88jr04c0emoevvxa64jkgp938tk5y34nqwks9bcwpw0gsoruubn78k2m38p',
                remoteHost: 'zr2kek7kbayb74koltqdubpjyzjcnna63iw51xn6gptrwyvl232blv22qivvqsb2w34ed5plypr3zcu3jczfm1afuarff13v9ykxlwzdpigyjm06hmuk0nj7p5i5pvncvbginhjanhws30c71if96fgv58d9zeew',
                remotePort: 9226454807,
                directory: '2q2vz4ae1hspyxnr263f45ozg3ljwe315eal6gpa2tva8qzpuw4a2q99r63di5fyj58rglwngsxoi2lixiqudx2p5ul5yyeptmihowpzckcrdzzfha7ejz7ujkobnj0n7gau39x1wr15uqban3nj8dec3ej7bkb1r26ijp36horycv73459b6gq74uolurakpk89hk1s66a8njsi3t5h9vlzpj158vni06iuh1tq4ns9aqv6vpdovalwimli12uuy4l0nlrv7hopyd9ksxgftnleopci8bwqzwijmoew4790c58klg1qe2jnytit6yh3t16e1p6bsoierwhbzrvmq0pq6hafgheh88ss67z63r58rgfuv3uq6odijfh14k27vovurejl976cpt1q5zxx6qk9osccuv34wb4iu8d0dqel9u3kgfwt8wz38v66uyz5n6dvvyp9c1bapqwbu8zhzp3uum2pda05gcw6h8zryf6zxl5oiqlz32888mfh3qt5b5kvotnh1qwyrkyhxitqzmsgmjkcr8uypiybvfyli1wc1i0i09ptap57enygxzghwomimrolrjv8ulpmwu1z0vepdbayvbopw7mpv9wz07u9qti9qrw09ttzsbmtndre90r0n7yh9mfr3e22dlxh3s0lu6nuh4aq3n03ol8xpisawvfwbq1l9y7ek4p2bt8wh0mms86uus70biu9ezs0x4bftthsxcqr19m8he8u0el2sc4obh9m3n2dfmuw1cf84hbepbn8bvxnxaulsc5lgt7rdnzkc2ca3cae2o24v4mvz9xj8sgqbe8xendlus24d8s1wvok8d9as5cim6qhhxa6d07gw7xzs9y1fdcgkgbf4zk1j4cvftgmpebcckngz7gpmj2ma14lf8mvjys0e5iuu8t53nd79h8wlnae6fivs3h74yw5gc2wghajgd5s6r93xepvjybqxhdol5siw5obsxmqgd5sza31wn9v4vxdn335rymddjiio2twhudi',
                fileSchema: 'mvr2dbu3x2hhj5utjzj82x2cmkueikux5l4z1zogh28vuyi903k2tjrn88pm06pb9swxadksse6uwigivba0qnfekf1vb62lix9egdui9nsxe5uwylfkipby4oapw9z88ld4xbn99thr9pnb00e79tufu9szbq8dnorl2j7z6jtpzhe04s6fb837dsy74mcgffn30jhyv7qt98mg5oimyx2bwhk57xe9cebkbhbmihtfvyi9h1dvn7isx3of6s0144oxysz8zrnsgla8zlr0u6yxeru2r21gebpj5zwaqrybzevo0q1sbgmmkqtrldx9dl19mlvn1f70vurhc1v1c1lbojwfsq9d6n7hyv9dbpaqetsr4hjqeffncx80va9t0z3dqdh0vanxv82dgi6eanmrtyif3majk2a2el1xqiqfnx9j3i9ip0vzf7jw3jp8t0fp854gav72g0c5sc4z2kna7rmym9finnilbsah8vnmj8kuc61w24rz2etwbobp1oxb0n7bt72qci5w7jsud4sjwvzqjkcs59b113rixnutj2zy5wlk8x0b6uv9r13tnrxxm6xx7o0vnbt4tkeep1b0q48u8s476um4giwpvzbq21zq8ldcaq35pe0ra57cswe0eeaocyw5znqxjclatwlopcqn9ley42nms75xgnu68pu2jctar5yh3cwlqpzs0myuyocdbozgkhoi52525y1hmzlmvwyplc7j6m4koc97w9jjbe6xtnvc9m2qfy7x3u59vuspu1u36rzvdthytbj4x5elwbwvv7b81lqs63u71yesu5uy3y6i9zswn7vcjwepbvuzhxecm7tjwdo0ga7jw7oonw4zdzp6wcjgmq469w8hgv6rm624xfjpu0uj19yfijwxky5dlt86jspjtnvmdj46pjezzo54mt4pecwr0mi5aedl0z8wwuq1wkv9yehoqy8gwfkb903jeytc4pxpjkla0gb8zj9z2e3uskba9eypr5bwra2bx9zasglm',
                proxyHost: '1i66l2yok85tr653r8lcwlpqxnkqft6kv2vzg4ghth5hs8c2wigpsc6xl5q1',
                proxyPort: 1183479016,
                destination: 'a39e3ti9nu5c5q9xx9e9dxhlzielbenvo2busgct038lwig9q6b5lki56xk6tq1jvuhrquomjnibbpitqc23y5hdf629op0oo98dv90vlztv6xa2dgkhaosgjq53grrw6av7bbzwhk1ltcebc5nefyhdr2uuccfs',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'uz9uk6a7uvriw06k9c8c5conlg07n4m9l1mx7fhjxzy2cqc14tyu9trsdxp5xvhr9qh0eg946e9ns3mallnmxp0ry6w4eu9ubhaz5uyhza8r1pii8ay4iw9x5btgr2n84wxwmk1ec3vs3yg0qgvfcce6p7yx5z8r',
                responsibleUserAccountName: 'a75aj7ge2yrxwqq5bbf0',
                lastChangeUserAccount: '9zg9c9fr9d26jttd6ymy',
                lastChangedAt: '2020-08-04 01:56:32',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '81pq0wkm7qh15l5l2rxhpyajeyqe9szb63g13hdc',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'ovjc92kxglqgidesmypczn75477ru4kwg67tz9u5jx57x50qay',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'jqx4k9gujvvd9fbaimto',
                party: '1mexu49cqemx5kzyb89gms71tyjlowd3zngr29ket9m2nc8nmyuac1qh4tuzty5ifihhkk790e8idl7slshyj02hd64qvazic8v1djob5bkenqqbxr6gofg8ymrxcryuajzp3zg1syfv8tjgrr8jf0sb8gn9dup2',
                component: '85j78gq2pmc639ile27p6guy79u0nulzniv0nv89zbsh72yf5yj493jdzw8z5hhvaa02wmddq0quwyovvw2nyspsnmp9fsmlm0wwnyr6ryoq5h05wglgxab4janlgpplq3s3fvp6apclo2cjthbffzse81i0tweb',
                name: '2uo1lpxxm50czhsb6qcap2tjdd0hvi3m9kscfm2encx7cf1uuw0zo0bj5shpgwaljiwxo1qiinzuwsuqc1q2ca27m2qcu82p39mzwd0t68i984gy4c6kuybu280h1zbi6g6ap3d7p4r7td1engkqnp94g0laja8m',
                flowHash: 'dhv6kbjahmhusfm741a807ptlrw5auuqcu13hddc',
                flowParty: 'xgksal3xqqabkg26myjt5r9o54lbnhv6a6vuky88exo5k2ap4fdnt5ihkjeupdlvh5u2dm8ehyzzxfjrvba854skfewknnr4nnqk2i4jgvt406ihmcovn9kcp0xr87km216xu744paxegij358va846dla97oa1b',
                flowComponent: 'dfhifbpacgedueuijjxd9ikafhft1lml6aa3avgdhpgf4swycwvzxgdp0psk6liew0r0ybl2r5cyxt81vnutijnhsaky0z557ezkesefmlhb2lj5k8gdx6ne10jrdx2sl4055n5gccsnyixgwe4ry34h22zibfg7',
                flowInterfaceName: 'iv86ey1bxicakxl8kzdbdpcrhi7x0g43o9m0e9w1xtz8krrhkl85bq5wzbap1zi7q9ad0xjeaxq92bh1deb8pzy4u3k3wahtusfel1b7kw2aq67fsdvi4a0wsjm60uoc07okawg64e1x4486wer60w12ctu09mv7',
                flowInterfaceNamespace: 'lzhrzn291q03ch0olii3ixct6ged0tntrdxawqlted0w5i8h1w0o2zjxa2jz60q964a3jass6cm6qndf08d8o3mtvzthci9zqy8dr74urfm8kdpxlmyy95ynv271zbkond17nybnlxfpk0m5fmv0dmvn0i8c58ah',
                version: null,
                adapterType: 'j9t1c6ayyrr7unxwxlyxhakxuxqdrl97wwyjv2uazka3cwc98btuu0qk738h',
                direction: 'RECEIVER',
                transportProtocol: '68f75f7c8a5gwgjt59v7ac91gurq81aay675019owo4ngq99y75bb1uy3v6b',
                messageProtocol: 'o3otiaw2yefj7ooycncd8yrmba3hfwdgnc3p8jxdjct6swtxm9kzqb1vvwsz',
                adapterEngineName: 'u6idxvg7u35f9eiicx8g379rrnzh1v4mmr6y4a56rn79kp9mxrmcdugi0ba5ruyx8kty9d19gr9rlqsshlgdsoq21dddjrl6oruilu3kmp2705hmlyr9vrfgfbzfxyspd6jelk32tx17nxz361rtvnic3mvcic95',
                url: 'n4pi9p1jy9ujpnb4i8nr7dqdmqs4y2qmbepbsj5tlt4vsrlccct4gh7u9siplm0s0kb608ju4cebwt9z004w05bxtql12myf2wv8g2hjpu1kowaig0j55coiret91vcmqdtza784vuwudnnov60ye5aofkzs0uy1okkohsk51ztpzy565c4eoyntd3ffmkz5adq2hd87nooza2vhrqntidi0ufq3stv3y872uisrgnvekvyyc0uyq0ajw6p8gdjor4pt00pldjuifw3iwzx9qtdecegg9nc4l4kgytpqqk2huozp4oj628810m2z8cxj',
                username: '90qle5sfagyh4b6qdv7ti15ozk3at93jvp89bt5kinh6rxwbtne7qkhtkshh',
                remoteHost: '1txb5dbgl4mnm8qtmheqcy5wgri3d3yr2cz8zevgpdaromgnfofr4wg92jadhti2pkg8ofrulq3e0rgge2oaq05pa2i4lyy41swl1t5e6enlz16xt9z2jm4ztoh67mzgn7mjafd94cw5zrcu2ihu0yxgd9wdix9d',
                remotePort: 1468716781,
                directory: 'bqeckea8ugmqoo00rfzojagg0solgtradhwb44ha6kbzu6zsvx6qx0w803ar2nuqgjk7mhdwl4rfmwzq2cndrjf3z8sm9grxqwlyjyytvt4gz1b86uulpbmu0jj3zsvjbsszkn3v87t1g2uqd7c6pg247ta33fl0teh2zj755zaiz6tgs26ur91kcqg4r8qgmgbpn627hvfiatoxzo5aq18ozietkus1o0kz5rofgmh2iwgrwnoaikcym702awgpwpq2ybtjaa0s4jspeo2cdhtdc48ujyjqj52uw1v7jrlgn72whq1jauhomjd4t1tqqi43vsa5cdlf5bwbakski96qxv6is50p66pl32hz1jvct3siiio608ts25w2i297vrr1b8xbm41mzooe2zjvphz75s3nrn46pz8cm1dgu22phw24phs691lmiko2mvnjz4tgxnt8rh69260twougx948tpn81nzlk0hgmmjql2zek39ey5h9loygfbabmgc02zai4vcdf7cgmiyea1j2gk6o0wt0x071b6ecirquztnqdjekaj1m316jwv37qthjoiw7ir69wa2jrhtft7p8n2niz9ao6g00wqdm52cvgac12uyjl9lkclmdnpn8amwwmki2dql17pjynvflvnrhtvaagvq05rj0d83w52j25j0nfxtsrigq4t30im175u5m2g8pv3niysricjbwy8shrjmyig2morfvo6iycwz87vhjggjdb0m9cdz4xwlp4vpbsvzx6nkyx5ta08lv38cofiekdr7bcil8j5517usw0q7rz975bvpktohhbxcc2hh71ttej9eu8997v8v8sbim7sdu3xkewtcwv0wp1c052vr05nc2yfjo4pajm52r2lcz7lky87zxa5qkosk0jb58epar5ltv41e62r6lzn15ztbnozsobhoekye702v3pcyshhawi8dm3bp5xkcgp60afasf5kytq1xcqc1lzk6a4z5r541wl7m3ugegnpsnot6c',
                fileSchema: 'kch03e3mcbla3qqqu1kjql0jfrszmhinygalnqw5eiyjqu8fmtmjga0kskxtd9b9g8faiho22qqbqu85oqk2c0gxfijgeuvjx0svcz7ff5fn93y496qg5tg2aim7w98d9ww1fgprkrhn9jggcpxcgbgrhf499p3x4pqkotwokt1ot3cehbgazcqhounst65phztiudyjgrulku4r2t5hodlxhju6ncgt00f6ykr683c1812dkhlru0ifqktjrf9yfocw7w82baeh4e2fq3s855pge3ha0g7ldm272vwyk22k2oyutrs9z6t7gri2u6sysjb19hpo0x0u44u8aped7dw5qqtgjhc42kta8hzdk8i5em2oyou8wcigkxsqkhhf62e1zn4zhyhrfnnp6mm6rc39upaor1incqapb16oq6t7gqntycx2jkurk1b91gl3q19drxg41sx87n93u1dy2rd25xkhs8tvzx6xoe42li7pp7ktcdx7a2w7v6r45zden5madhkhks7nhvooukfun61co0aw8mii6de180siamt9j25bx5x5qycxo6mt6z2d2jh32mhpygwc8t5fxihecfb4xrcw6776tsaapl7h46x8i7sqz5ropq8at4yvub8bmgs383tk4wy3iwpcxzq2hmafztu7v2aq2z8onk7v21w8rk3il4q29oh8am316mo46nul7mh6rs8kels2394olnrn4hunugdkxpbnn9456n2zjvtfmoepwlguxcbxxd0kpf0xdy2g0zua4j0s6e6pqr3h2yfx0do2h2sgj8unxsd9xgkd9rtfwlug7p4tr9m21yizx1xy1s70pxk4oxif5hb0n5mkz9lmtvvk90h9y87x5uxa5kanxvtcyq0bq42qm2nwwigfjzt1fbynzcz9xphpnx4liyx5qqvwn8d95z4509wl426b4hnvgt0opj16iwbopw0a179uebl6aee961t7jid8ynfjejntg8qsxn4ypojrm7m7poukhi3sgq20',
                proxyHost: 'hnoq9mtpi9ta3cneqxdfvpxiu4zia1j68i5sgeidn44emjft7174kgd5axsp',
                proxyPort: 7507218915,
                destination: 'il4h6kva0i396uo57paxqfwofu783mdgzhhosxsuhm1ccbljdj9a0pqvcev9o4t86mkqbfriz38ul6gbevjsc4v4vo8c9ox2rkwak9xx7i12jydy9xq7qe48g8ld30b3diphfmlbfv6ro7ic87nxk932xyod4eep',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '19j1af59ysgfu01q0gvla9wouxu2x4vvpltpbwctrqsle1zkz2pdacvdue2pyl443t9z4f7berfe81am5lrgth4a6k98eznbsf8t60kqis4vlvbh99zcz8k1lowq3baabrki1ip8me12bljcof61d87vge6y5wbl',
                responsibleUserAccountName: '4onyrp7x0cr4a4qqg3wl',
                lastChangeUserAccount: 'mflh952h3gsqbf69nkvw',
                lastChangedAt: '2020-08-04 05:36:08',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'p1er0k7mvfjepcbfwqasuba66wylhqcsoo9zpxxo',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'b5sdcskk88sz9c2hpe0noyf5v4j22aseijox7f4dcup40mq6zi',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'r8g2s4y4c3wiadwq4qv0',
                party: 'v07ihoqv8fv5ayb5hhqt0zp3g9af91y7hds6o77ci77jt3lpajfm37ng0pv3l7nw9wltcq4uaplzgto2b7uwwl12lwqb1vzzo0af38jrwv6l5r00cpoimvpssg7srapg7rn27ypph0qbavdroc2ld8mrcrpvf9lg',
                component: 'kwpzozhbwtvwmskajo0q694rd67372az59cwvy32vdsn6mhni05xj8ud88vg79xj6iz8zgo23oadu9x397xpiwc3bwi9zdpe9g1lucvkdjonjso5ctykjsnvtyfhst3bq8h12t106jga2a9n8stej90mefod5424',
                name: '00mtypt5oleupz84t1oero03awgu8sw0hz6rdgf6yo3u38icgehem59bnntxfleq2xauwdv1yxhrpsakxk45i7t9wz9ubzs81wp6tte1ph3u28m1nw0qusk7ikx12t428ag93fn3dmpq9gh5hyigodyhwr1o9bos',
                flowHash: '3nva9c85najlbnqrf7npood8y0keywqb7qduo3rq',
                flowParty: '50bqfyi81m6jmpczck7w5vjvhlwlhqay7jj60ocrvhzcmd92tmxyl5l1cwyc7de15j1i933uepbf301jrum8zs6s4gyly9y52io4saq1oqs4c2m9q1gpch9r3qy3fdzatmnkuc0ry00lpnuo864iyqqig1wbw258',
                flowComponent: 'qtywq9e3f99aaxiuutk4udwm404hvdrju3brzgajxzrw4pgwlv95ehdzruecl92gfsvh7v3g0qgfdm2p7r3x19gm1zlewj14yc98pndfvaub63behit3cps71rxx197l4dxatbrgcf9ne1b2jn9rrerte7k3ip3l',
                flowInterfaceName: 'w0lpy3j62dh56gqqcsxl0x03c9lk3jss4znqwfmbc4l45n7watb5g3itjzm6g5e9518agwdtsmzgj12o1fhmxpc8i0ri6elw6s3ibht6oki2jptk65unox3phiwepcrcrnl9dfyvmpom5ufxo1cwzx6q9yv0zmiq',
                flowInterfaceNamespace: 'vlp0d4tkux32pc7mnekadxb5jm1ywgg483j3qwpeu5hx6267t893sw3nkhxxgmwc109pqrpvnea6z89nr49r4i8cstyq1ggdl0tblxeyeyyl8aze649uv4uu0uclpa9byv474y3s3bmb5m61sjsb7t6z2pc8ilw2',
                
                adapterType: 'ex12j0klvjybfsd2hgc1sbp4ux9iebefbilzcmctfa5yd3wsrsto8s9i4q2x',
                direction: 'RECEIVER',
                transportProtocol: '7bol4lbj8qpa6aj52hq6q7626izdu9nfrbm8ioq1c3ii7zfg9jmsplucwjpl',
                messageProtocol: 'n6sel8vllp96xohrbmws8ixpzr2hjx6hov4e8eivz555itmaacqni17r0wml',
                adapterEngineName: '8fsgoydr2qs4mj2i9f4ygz06l1m1899vufobxsaat9ew9nfyo4c0jb21y4elo65ymv1zvrwzzrkdvx46nmgemmogxr0epiy5ok463abv8yciubs1h6sjx9ezkf6qxzfirfkzqs6g4m2oxe6dhj7obeffhbga0u8f',
                url: 'b4r4zc4bbkfx4xtlnpps3by20q0uc6zse6l8cfapzmapwt94v84w9tr7ulwyiwhgznz8u1wkuv8a9fycfzhp3ghiecptpqpurogmk8p70qh9canqaowup0n43b3sr3w2q0qrjgvfbfq258msbmquzowh7sbkic7whzgsfwzcvoab73gk01pf5vg618nqbc4hvrmeidn3v9vdp72iom8joktweoqfbct7llym56j92il6nv4bnjp7lytbjzermedoq824z0p4xcjn92qiy3m9j2mcax0i5818vutfp29v62prr12vr5ogj79elfbpmdne',
                username: '9x77n8z94o1ukich7w7c67c683bkwsymmpid21ho3cishbtl56wqwub8mtr6',
                remoteHost: '0xck2mwwt1398rzvloac1pzbrbtg6e2jxrlf965l684q7ywuywvtn1lba6oa3fmuzxd2dbll6ijtrcrss5968xewuf3h5ti8msfuqhbrpq1pmgfarso34w8oiqy70ibtbiszk4cvqiplom2lellxo80e7q5mmh70',
                remotePort: 2395210254,
                directory: 'a67s2poq3au0v7lhoaxtg4k4el6vo5r8yqzvkob9lz4fhxzhsr8kkpg7zxuk0674vi1c8q2hc847hdmj0cqz3kfyobq2yygu6675iu4fpm847slzhkdykqep73l1ihyucjaqmnrw7gzopym8yuolmenkbm1f6sx5hiqeyu3ddnqvfy19408suo3co9jxxdm0o6y67xrcsn120yiw260re5s6z5zwsxzjd3izz6b1ti9iwb8llxac6a6qt4zfhnhtjp17vzif771e1cvi5xdd4dwm0o18fuyajyfhc9mgh5y1vpzlxoyt0blu800dcn0qxuf5hmzido3ioyej5wlzi6ixpzvrm7a36nug8oe5n1ikxtpydwoj88ll9iwx8dvxkzq983bzvj55ydr5bzvbworcq4tlzw5qwozpqyaar3kpo5ucm8wkbbvydp6ecta2q18o17jpk323cjd29lbwtfvduzvcjcumfqqizhrco0i4wa0ra5363qk0rkioj69vf9iktp4n200sh1gsqso7e533bxmiwwe8c0zusxe37xffl7d0rca4vjz9sxnu0icyk2ndc6sgnfy4rik1wgco0eos75d4tnfo2ujqjybr8bot0hbacbb5ra9cpi3hd06aaq9a4rzf9p5615o4v3xj8ylpen73s3wi9fsvjsuo81imwj7i0qvn23zhpd2mx8fg7bwlgry0e7pg3ghn1myt5cvqqi7l4u39czbarq3vae1uwnta1d5a49oqafc4wqcjyuddzfzuwzx68hu29acyvd3fnc6xxgjhwux2f9zcq6u7hy0z0i3sxnw804zp3xczfp369171f10ownz3fwmc6iprc7ja5aai70nq65ccc6aennut0pc3q1quh5sq0rjic8hyjhjh0rlj5ow3cdmek19kegncox2nfslezc32imvreapvkpqp4ysw4dzoc5x10f1oac8z3e79z2tiqhx729cjuo939hg9x1u36fcm332isvbmi5r8msw7k6toffg6',
                fileSchema: 'i07s7uajm7gykfshp4yiau04eix8b3h03yrmvk9wujjb11z8g6xfqad2okqt5msvjxct9mm1xmkt18xgi17obgssit3a6xhw8g6zuod7ffa6tqc6a4yjbv613fxqv7l8y6udo6h35uxo6amjlt49ginp5bw63f3ecqw3sw4mjcfc1d1g2hr956nudeh60ldfoku39mg00meac54t8ie9fkb9msg753pce95fna1prqn36p2k0guhvbayd9y2yhaik92ynfq8gbmmw1ubqkzf08oo8x2s96yxoagtcxv5kk8bbh1xtx60ynyx8bplfea7jsdire9818gdzyush8sbdxja9pmjl4levu4cdn38zd3zfq7s8ob5c64jndw7yy64u9fe2ougdfkkxbzw5xrd8u1cyifeiz5mpuwvl18awoi3zpap827m9ndkaa74tp8wfzv149nrcbsnk9g37wrmnnwtnlhfono7imaj1u7ejfj3k78db64xavllfit2w6dwwutwzhuyiaxar6qkxjen44mf630sxpy8cyj08y7upf9e0mmwdo9tq56dpr098524o5sok6ww4c41j44et8isnybxijkx895r6l8akl1ja1f254jcmum79ifzxdovowfa4mfw6vn011y4a2maymhphl6fvi94n110odidrs0kdo8fo97hesnuemxk3xhy4lik66g69zeczcjubo0zpmw8qw84j4rl2ddv7olbs49qmedjxq40f1ibgkqocy98hpj3v6z4pxspm5obs8ivvdbidbqmrdll62x3m8ljroo8hwpn1usyhbdum9q84xxphz59zlc19iskvbwr3etncw6dgpjh759x7huznf6zyx6i1ehj1w4f74jh7s2e7e4o3xadwcka1r56sljo21jpxn1mdnk7fbx4qa2wkbmvmxpadlprw9pb5hy0yv4logq7ded7l2poik1wdc03a2c9n0bqrza1wkxqg256xf4uson46oorc71fl2gbrbqho20worh9',
                proxyHost: '4e716lvxd8mx9qthxnxkh69l6oysyd9m187tyhfa3dl8emyzi0i2qz9unext',
                proxyPort: 1460857854,
                destination: 'rdk5lxd3bg5n2alv9489lj0mm9kjk2jfzrxxzm8ee44rvaraejtbu89hq5vk1rn457tejnrq9nie5bqdpgfw61lq39xfj5ulvofznl6nju4si0mlxou914oiwnsdod8288nl5b3pz4vqafniu5yrolijjkqxtmkv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c662l7mio3w9saw82f50tgd9onv4438edxdcx5fmf1c7ue0dknmxv44nix6w27aari15rv7fvejp09nmlxu1pmtk4ilozea95g4c8tgeqhywlmnk5cgaz06poxyxql6uy6lju3n4ikk0zzjx0unr6x66zna9cj1k',
                responsibleUserAccountName: 'v9in4fta4d4425na3imu',
                lastChangeUserAccount: '0pp2vwoe7a925jyw74tl',
                lastChangedAt: '2020-08-04 04:11:09',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'kq3h0zv61p79qfvt2gqrpi17cyu441i8ix6ph6rd',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'z1ru7dmo7kolxo9aruda89r75o4csbv3qcc5q9nch4i7ecko2o',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '6qeljktnfvdhij6yefqx',
                party: '18qlxiqbvnd7kkk93ys29uiw6dwgfazorfy6msa41qgnxvljbc321uu8i5evj1a0k5472convel1umnjtpbcb090pqyp7i5hmwuvpnnoubqp6x9zitppuorr1blym4nt7guk1qp0jexre85h5479oa4metegq1gd',
                component: 'w6gw3cfr5tkbt2ytrxlq55basjtkhlhisotdwdde4hdv1o5xmw2v1l2kg3lenylhqbuzgpecy123mieybbch5ta07ryz89ffdk3ykxuiexj6hpmx3js2fnyu3eobzs5pkpa4h8jc0us49lcyb1hafjb9kuxppw1w',
                name: 'z71tydwtirikovc9m74elmpdyu1zjs1kkjubbu4bv7z4mye5uljde2xd57l4nks6bv70tccy64b6qerz7ell7a6oflq89xtng1e0fbi75vl2kwef6c9fqieeyiszoj3kjfbypmf7ique2r20f1djye61bs2aetei',
                flowHash: 'dah57ehe1bibj3h13oxrlj650svr1v1g058nxr61',
                flowParty: 'p2vtvinux7zy0hnw8ao14n2ld20heobgnuzmw1emp01fqgy06ti1uyzjry07i86ths4eoztjm2jqioehhevc72gi1m5hm44m1b2y85ukdkt3rrbt8yh76p2ib1qbzgiyjcfrqsi2n314noqv9yx81ibff49gre8z',
                flowComponent: '3ly2zasf1jo6zf77dsx0os2b99enn1jbt2q13qryva0xuz1mnk8j8atj6l1a777zlgcu34iyy5o9c9alfmmnlvk3r41jqs9bxbb4ni5ni2fblpzhwceeaqphipuua03zhxvsc7djpa8m9nkbuye5rbdproeltd3v',
                flowInterfaceName: 'ftoxy7bw1j6aissob7y9n29jegmralfev4nekqq8ybpejt20cyzx86vnx0ro5y3oijax49d857rrka48kn6voqwsswp2kvwmfwkspdc33cube64szw8gi27jileofz0etb2675fitim3e56q8gh1eyi8mrh11xq8',
                flowInterfaceNamespace: 'gs3ffjpca9c8y30cf6ki6mn9gnzsvgr46p3hg5q9s0hp8nmakln0fayrf5plt3n1dwysu9iadk7nlfi2wbbwq5qb7blj5v1hods9c57vb5l9fqwfg2q62htlrjhe2zhxmd0xt9pi085srmc3gphkelu2pu20c67d',
                version: 'x5fjvlld5gh8ts9f2rnw',
                adapterType: 'du59delvbh7m334vpx71hdaj6tz8c34mh70zbpnn5tlursdboq8ai91dv6x0',
                direction: null,
                transportProtocol: 'bdabloewndqatys5q6vdl76sezaa1ppv9cichqqschxvq4ji0vwipxtw4i56',
                messageProtocol: 'fql9vxr9mqc18zz12eynl7fg14kh7n6goanvyet9ivpmoc0pirphnyimo9r8',
                adapterEngineName: 'vh2w7khb3a0t1yhwmpngh0wy9jt8phqu4r9oz5zq9wxk9ml0o6z3gauxy9ygep6snydmme8w44ykkafeatuiwy07nk40orbcfdxffsoja166ck6sxl3aw7pwvorxp7xble641u04jka62fwrpvq3nfhamoqivkiy',
                url: 'rm8y5v6pvo5f4nt5d89l5jpjz1lhpiz1e7grhx4qqj7ogj28i543exm0aoahui1eynvcjtblgszpakwxhm1wapwa2bbe5mebykdqamor7ca02byf256392ncgu4u8meg4apoxuraslgarwkw3cgfalb3sfqlsrptw47p7k7zwme38pzgcp3noo37iudo7enffchfy7ixlz6jqedfd83cjds8j9evoupwnmohpshejkulxgdmar34bji5qumw9ocux2a2udfwxcc3k2s4mx8oblhqrtkock712bm2fdwrjp9ebbjkpxq82d7nh3ug17ea',
                username: '8jg2qord70fint7xynannkfbzbqw0k3ybrlppkef2cq0c3qsp4qo6jco0rzv',
                remoteHost: 'qlit3m7hh9lt071ug8w490b4081e0zm9lvd8aalvszdhsw60gihom11myvi1d32zvh0h1i31jo3m7gq2wem2ozf0b6l91xwclcei0ausx3q6gi607jry6c6fcw9g77sxuee626utd87vpqd230oqikdncw53ggkr',
                remotePort: 9296498221,
                directory: 'ml7gl29idcnxnucsn4sxofrw6r2zwvllcx7a4yrkeio3f9bi4ggu4a62rgybzqgnxsv00w6u5eeuz9qat8r6rba1s6733uqctsgy1hn763212iocr9favew1ymf1wrrdxoamivlkmxt7lkj2aiddhqrbnysgkvy6r795dw20g4n3nycfulm7w69je2en4b225ei2yvecgodl6mci2228bbgjsoqsj0vtxzmydlvn1kmsvpejlcqjwv6ztx5cw5xh7guo1vbzlsdrzohczku0hs31jn1clywmslgk3kginltiv9q1uiyvo6dd5yozhqri1d5yvlrkahqo6v25imm1804e7fa1xf6jylna1gmsdjw3yh73ihz4d5f3jhca305ckt33qn6jpd08hoidq10vg8kyq2xuf1s23wp7ga3onaxy9z5tehci000x8jlhuzl1l4q5r4xrrm51ilbnk6uhx2op3ysnzevdijtd3mnqkin32q1xkkq90nk0ka64jm5n8s8ignjclgf0cj34wmlnb8o9qfpbs6mmcso2521tzy40bq8y8m3h923ci7ozpkvebl7hmuz74ladkljykc5166gbhtyna8qj18cxeitfrq2560z2bgznjx32920mqniel1fzj55a502kp7j301iygwaq91q9hag3mvsnlu5n3a7u1bqw1dm4e4jcn1mm7pj6hieh423j0ja0dr4ethz40o83t5iup46rke92o5fwcpoc1vllga3afn5j6w64h23aj0bv2ny588kczo93rspl8vahp81vieyk4uxv1y7bfame6hjntpty4opwnp3kn3bo7sv23m7o3bv8sn5ihz0prrucz9ktv8ah6bahwz3fzuvfa37pybfqq3vfwui76sby3vw8lh8eaq6fso48bwmmt590pnxjtn9r9i2krckhw4yb4psel7c7huh9uc6ib4xmc2tpkanmslh7o5ij2rlfkxt7bq5k8u8q5ojgmcsthvw4crvxgmzc7a1jmhnppc1a',
                fileSchema: 'tsg5r7ax18r8wga46mcn27mc09bd7lkuhw0to0esylfx384frakew88l46fcs8ss7v2rv01xmi2o5z8p4slwff8fl8xgbjok486ouq4tonza1cdvead3nu0vye69ck8v468pgyv6xz4lgnk2w45o3xyi46a5a7fpt7v6ggi6g9faophseb4ltb8yr9pm1pi989oardb0ng3lkvabh6y168ej6mnejo0xdbuscmkk35qk8wfmgqjdw6so37j2ijdkcwedlrdq4720vu0dnnoe9gwi7evqlwlwr597j82wzjinvkwvdkrgr59giwmkkeprt1oxe2n3fu3mbgn9sr8lr9hpjqle9tlkb95vim70h980k059k421887n0isabe12bsjksl1dp5eso89016x63vrz0ks9a8dks1jlgxqdflm4726bxd037zgeo6yl1oaui83uct8hxdndl4ubwvzjey6uwqm1q7te1whim2pk1gmxc0ks4p3cpmklgnoeq7ah5eoov15fgzzp6x25p3dkc9i0f3eey7f7naeeqwubim1ev0ybzt0wt53yzeonmzwhbrm1nt3mzma8hzwyxjtovcl1oz7chp5kzprdd2t87hgsl5ppku0cuk2au2mtneghmlkh2uql8qx1vh6dsiv7vko6898ssvf5suls9cq716asopzvfbvdgsx80rds4f28i2jpjkyqv1m47fcfrf2p5lz66opgtcrhzk7mupzrl6hzn1ls0k66h7d7ggf7wo5lvpiz1czltltjertzmealcoj6pttrqk9fbrihdpiqeyrlshy5x51ryv56736m7d6m64kxhfwjk6z9td4449mb00e97lt83xye1iyuupxcrw98v5g9wbu38gmt8u89rhs08l09e86fp7bieca5muuug5xtk3b7iw1c7sha7itiv5fjewhngal3ubtwfiehjnjd9mky76nnqycudx58h55jnbguzl7cz7gc6agsama3t0apj2cdxudffsfzjdxmhoyy',
                proxyHost: 'kkjwb8q5be7atcs51tjt6jfyqd4kmaenm1orhfk8qt4pvbfi36nynqn25yj2',
                proxyPort: 2270166617,
                destination: 'ln6zxiefu6u0sumqbx3n82h1dhgbqfrtmb0jkkybo9otq1vdpfb1kvrbbs7r736j2m5birbfwej5eu5vn2t6brra318b1z0lr3xeesrbvv47scmcynmzvsv3odnxpqfgz5kbayr3l4g3l0m6ns5smd4dqyg8kft1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yseutzgplpbm4xvk6z916hd496qntzen5uafezdzba598lh0i7018o6olmd4sdu3h6d8pjkr0ev9ka8hxud0m4dumhezye4pbf25j7h0pgwu4zchxspk4z1btjnbg5kg7776dcxd6076rfpo0x9j9n4d2ugq6eg8',
                responsibleUserAccountName: 'uutb92elvpda453d1hpr',
                lastChangeUserAccount: 'velnwt3o0moycumuasrw',
                lastChangedAt: '2020-08-04 12:54:44',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'hgdaanq78b6bxcdlu79ohvykz9unhosv4defzvlf',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'u7bqz0n1x53tvhphb9vpfg0stnrivy5r317m9pobg19w35acfe',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'echctytlriknys1isx1n',
                party: 'mimpi7mc37yqokm9vviy299dukm2ufjbjuc2xnnd5ns0widcge8gtk6lhng7wevy8s6mbqd77hwuptp5aln093h27na0gc0eic4bnu0mpn5mxh0ucqxw1lrj2li43yj2d3vtylyr3edqfm5lo7ll4gcj19y2k4jv',
                component: 'q57wrp13me6kbr37c8ra3y3f20tyaxvfaecoq7ljblag8bbt5q33a3zv3qugt8iug58odp74twcmaas4pv9137wwdez8ch4ngejxaet9stq8e0jaef7bdmdun0wiu1r17g2oeisontmii30ozk04w5okvz4go1c0',
                name: '5x4bjfnt9qn28ritfje2kv62sta64zwdgmf13rlrn99mtpjaqy1dc0r2tgbm64cusu5cu2l0iy8ocxheq0tb1qfunlaw1mfj7jcbtc8q4ikn4jp8lz5dl8vximssym7jkw6s3s5bq1hkx48p91ep7b0ojyop4er0',
                flowHash: 'hri7itn0pczensirzfi5l6u9ipxwjzqkw247yww5',
                flowParty: '3u1aojddhefgibavaxb46qq4e2gv36ml86uricyb0yimvna7rzalcam99mz0sr4ngizwt70ezaygnrn19sas5htfvtns24jekspm2xcmljha2en93ydtdk1q44jug6c4qmy73rne61d3k4b5wecj4ay0tpyyv0ve',
                flowComponent: 'j1ylwa44oizvoe9rw8dil85b6g6bixgew4aj6fkwwydrewggmgxwyp0go7ds25owx0mvwrfcxdv3rj009faw9ek54jj1avdg16hkndu9jshq2426f2m9zgf25qr3q1woltmm6nstlk14loxh03k3pttmkr38g6us',
                flowInterfaceName: 'av9m0iv71o0nc7tnqyjumg1rhjzruzhvxkymszwmm0okqihe5ua2yna69xbqf5oejq42ecq965f7sng6haqv0ffbjszt9ge82mx9jdu9pwkd05i25j3t2p20x813hvzxgfgzi4aklz0henxv4vf8g9qwm5zsqvee',
                flowInterfaceNamespace: 'ja0supsg46kycwqhyyb86ddfwtkrk1ljmx9z258j8sw8xhhly9oavyo8igoxw9nqd8rv62qhlo3qtf7amuaahj1e4v2puma1ysx3s82w5fxtmf3ktr11zlkylc466it0izvse4rrc463jm09teg2zlcdc6ps5j6a',
                version: 'so1zf9s68bfbvby7fg96',
                adapterType: 'yv8dvni0lgb2u969j2z5v8oo5y5cpvzxeo123tkcdvv7yeybniytqc9qcftf',
                
                transportProtocol: 'ycc5s0t2rndfxr3wf33wd8i5q2o7xr6f7o5tmwcjgoah864ylzooac849l0z',
                messageProtocol: 'qhak23lf6k04gq0nj174756p7ruckredt0xob96f3ckt7fjiz6shdz8mofjr',
                adapterEngineName: 'ql73zkmrwwgpn0b32lauirdxzabfuqgkd3urzwbaahtffio52od72bpp0gomlvo23w1tsrmirn0a0v2psesmu4hc5ir22kzi1h0k8shsfv7qvxly18rzmxhj5spcwa9vihn6l59rpcmh3ra2fao0slo4i1e83hpp',
                url: '06xq1oawz9rlue9i91kvv71o46cwx7lvwfsicnqigwrspozhp5yu1iaxa4z9t9usw95s1xw8j2zf7bvpbp8nt0mpg9o0vu3skusvw1993v26ih2dlnip1gmtdxv6rl3fuesflbz07jb0d7f6g6bioyf1wbmacizh2a04uzb93q6xolbn1cq7f259lqs6oic9bqve3hxbsbe6d7c3ll9ickc4l6g44blydrxu3yprdwnjth59bimwg3rsk9na03td40a88vejk87jc68qmv2lyc6f8iju0cm8jqjkc2qz68gwnxkmxv0szuabo5mxuwx2',
                username: 'rxcdrdg4kx05qdbv862ykyumlhyluegjfcan0ied9808p50quvwi1xmxbd7z',
                remoteHost: 'v4nk2pf8r3zrpefguzyn595poq9sphdbp342df1hgt8qcm3n895fwdd5qz42fmkbq2akj12s7u7cymxrztsp04ejfusd1gsi0ks0p5zaszmj41bfmig8y9ux0hmxer71zoool1z17lese5mqufpcsm3eajs7aru6',
                remotePort: 8109308020,
                directory: 'n7akp07ylgvgntk9109kqcii52zndlx1og3wurbjuciioupkh95spsdqbzsyykv03mvpr52ny9e40175qhxylzpvxhg58qq0ciy91h85jpgasikzpkdzrt63eayx5qczjqv3n8qggurignvqko4ad27agyct76qagifr02l541tacrtg8johbelydlwajm9a9iv4te4gp7ggh2crvhw0oxsxzc3njduddpcnuhc6vfxh2w2la3hxdf41js16d79hfvl2o4roty0geov7s6vsuuy4f6cs49egars3uhbyhir0qrywkzktpzwmffsprmotbey6guvi1tb3yiz3a1s88t3rex431ha7ph6xvr3domcs35nzy4xahoqsqpuyd2sowrvugzmcr76y1xj7izjpax4k9ucp8f7hr84b4m1dv5p258rs098feaucl7v5s8km9p03ro9pjc140qtxjavqbu1v2gnnn7vbm71m1ix1w8btm1wsjk2hbbp1mkizzarroiiszjfu3ioa3kpobnxprpe5kbp6sychaqtln3tjofwvegi3oqiysz8xfh0fpjud4w7pmq6ak94quxfg8np35tbwbq7e3r3z72s4jmm674os8o0rpq6f25yyvqp85jhlcgxhpghk1u9d8vukmwev0kqaewoq4r746hthh25el6rga03vkmdtrdoetn4wkn6dn34c0j5pt3kuv18o8jzs6p9cgzrhje4x2zq9ro6fnx6wttq879rb6s02syiak7s4ipv12crty9chd2nx8020kbr5d2wnma9crkurg66amh1bl1sjmq159u5kwxk9rmd30cs5wx1ll3dfig5zgyweit6ooyod0pjxnnvf4mhd2decmu13a6hteoamwdor7yadnx52k6wgmckgyjav1t6hktohfo7wxm6nh9sr7fbwsylh99byyh759mf8rd1azr2gogolnunpkuy3mi8k3yj62xnr1h5dphltm7f8jm25iafw2s5uzyc7y2820pgm5p50',
                fileSchema: 'ko39qirbbe026nylhpubl08xv4e0gpgo7ojazaq4jq4ucu5xg9kr3j860wo26f2cfoucj7nlekbl3h0o6jiq90jd739lbnwqpht0znwvycwoqhnassmxv3pbyim8pqw7m8vpis2lq5tseqx1ifded5l5tmqyd78qougovlxlimdgn1ihgm3389x8r1zvkfdggh2rmsxnsx66vsyf46je43rnnl414khl8jyxkb0mlgdsucbeyulx1agqs6mj1mjol2orn4l2tmpruyip3t4xjbymmhn1gfi6c09jiubvur2rbt734h5w27c8jsu751131akwprv2lgyq5fbiexofdssenjyyem32hcst563rnq5q2h8hcsoxgv73265k89g2fapw9pnaxjuey4bgnumqej6xadee5mdrhs50a4n8vc0g4c0bf1wz38dhlj5xwajet07y96hx8lhuchlklg1c6tfscxrxjb6unccq94xvu7ao5fu3u0raz73gumy7kbharpjnclr6smoer7fkp6d7e106xqqyofo976qlhvenqqds6auv7zvwnxmotpk6qwu1xpdgc9w7glfs8kiumhqoww0gsarchgcmwqcvepp3z6cwss9gnu9wju01315d7tnzb4zifzoyejk0ejo6h18msuewwsajaxwrg0qu71ac0bl4mpapz0x0aiu8e8x7vzyvlg9x170wbzmmfgpf12xs2nrirjtahi8qfcz7q9ifo5vjgu0fc4959jkhe4j1o9vuwqdt3wxg41uayntyjjwwgu566uvsu2cumjy1p6i2rr3dl6nxma9h3m700f4fy8bul2pk2kk7kjy1ytoayxkm27vpgh9m7famwdhtcm32l3k8rrz6angu103yam5pd9o25o66zn7ra8e3owwc92lfevzvdqjji70hxxynv8moxus81lbpxct6edgpckyv0prvcgx3g22zfp1s689lxvhw0r87wv5tp25cn9i5p9si65md8n0nouji1apstdoja6mp',
                proxyHost: 'gogdj5a3s9su4oii7k0g7d871fwnup6nist0mblfuqr6b3x3953se6gjta5s',
                proxyPort: 8418057335,
                destination: 'msi8i02k0g0mcc48a2pce3hcd29w7jk5f8822ykmlexx5racu0526tqg89hqee5ck6e9kc2b2dzqvoqzsca0k47vgu1efze17vj3i2p37ngttcmu11y7pizrdkztmgq8kfoaqk5pnfv90vf9yssxigj3gr7fn87g',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vwhd1pv6iin8jnlazyl88sxu5vo29ygrzxu39adph1l0ft779rrcib2jkmvm9jjr87wkdmbvyliczfwshoroy0h2b7i97yvpaorcou9fnko5wuwwvhmyycs7aa8rpr3ds6ji7n5tjl8zfcwczasufufgsupfe6pc',
                responsibleUserAccountName: '6bm4h222p2qzw62jbwpk',
                lastChangeUserAccount: '0drlqeb0z0gbglpjl5yx',
                lastChangedAt: '2020-08-03 21:01:51',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'curp6df9cf3sfik5wtky5mz8un9f0dfbvzhvw1es',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'nieuoumvw167mk0hmmc3i2upen8k80s12bhllgnknrn91qn4iu',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'd1dtveda3ki86logw6ia',
                party: 's0cnp7qg01hihcny3f65cpz1ya1osb27m0pyzvlrzgpru8lu46zlqs5rvc4r92t9wpejlo5w26w5aa2v1hz98a9q4gm61plhmzbtpms1g3tcqofy4nyuixp1m65n0vy9l6b8jk0oldwdeuqoy0i7v1sr2w01zril',
                component: 'wd91m8zkwoojie7xabopxmbarlqjld8zrlth0hubaztvcy237icxopdz87vx3ff1ls1cr3y42g29iyxk2ryq904x9d6euhjeqst3198ind8lqsc745llab2117e561l4km8agxgwjmuhehf3y31xvlhvyrx63uy2',
                name: 'mx93e4zxb26tk4tey2w90trrwehgrofq2wgoou9ej5vfojoh3zz3lf6yttczpjwwgtevcgioonhl4ouzn6x02otgo3c8759obxhjzdwao82ax2fs5y8x27ocq5r8i48d5hdf2wx61xbqzjx1alug732itbiwowvr',
                flowHash: 'grsoi9iet5f5o10x66pxmtkphl9wm351w3fd3qzm',
                flowParty: 'nhc30jpzive97w2f2nvqs89roi68agb9c3l5ewipfd3fmcr9y86eswxig9t0cfg7oyk3fanh57k7qx39b3wy7r494sah23zyrqogftqjw2nu7eod436v0ua1yxbsn0gkym6zycbds22oua4fk1qoywwwy6pz2jlm',
                flowComponent: '7ch32g5wfwijxtz4fzqdluk2aikzg5srdtalsm77dohxwl9smm2zilp0dw6q55tnrfjadkewtfwa79z1i1h5viaf0xkrdo8q0qooyfo9pe1cfim4muw6h4jsl1wek54n8ro27n89xefawdh05zqemws8gx4xv0gc',
                flowInterfaceName: 'dkruodfes45se797eg97lj2e45sxsoydhqiwajjujps68zdm3w1ilh28vooz8mdptxcibnf2bkk371k992tvwtxiq7l6f103kn09jrc538id58v5ipbe3nolqh88crsnrpxa5l6w8s073pfptkajbvl7390oyfwf',
                flowInterfaceNamespace: 'r14k75l61w7tze7cquq9rqogp5byqh47nx69va1pzndu0vqhunr4gydnqfgc0f757u15lfwc87hx4irjdzux3nrjssrneuxnt4zrdqapwxjjztg9cc14vlewfaydoww64zwwd3bo65x72lr60iyy5ro3uh9xu8vo',
                version: 'ofvrhrp1833yxqwjn85o',
                adapterType: '1p5uyqz8ddz73oxth0a75e28ea9kgjxp4eem2l4aa2bnhrlc79ti44e8hog2',
                direction: 'RECEIVER',
                transportProtocol: 'fuc827tqfs97ockipo88lk2y9xvxt9swrudch63hzh3tmptfgmb2yjq0bsnh',
                messageProtocol: 'w6tqcjyf9um42ssm6wnoifcwcvtqux29b4x2wp3d0qw9i1w9i6gtu8mylsum',
                adapterEngineName: 'aa16dbohpxk3lqrw78j979hu7zimrrd7gqmz0s3qp5zad361xujau66o04g2wk4gz1jcfp0a4sx9nmgu1tsr59tzh0musl7yrpq1quechx5a7bcuk030plmzbgk6zhxkn1z2uloqzrlm4cldqbolltvetu704mou',
                url: 'bddg4wep55224ikozmqhvjp21pf7uidgx2evf55ew0xnrc0sv5zlyaczym006djngi85v75pp76ofx97dk6440zcpimazbaygu8qwl7z8u694nlcqqi3cy9j83tpfe73jc1d53wcaw276cqxujmixzjrwahhazo6icdv8lua1vn18ocrfl6o5xsiywioq3stny52p2fv3cpb8ek1ytqlnnmuyk2nujvlbpqkkh96bco9m9ipvnq9v7cs2rzrsdwgsreyf0efx12oji2b14qz1v5mb4b39fyz8divpifpr5ct0z1q3lclyljvmsvaskw4',
                username: 'n98ylsl5eqn8acwvjwh3gj4dk972v1furd0whthituq7erb54zg05z1p7pwi',
                remoteHost: 'gyod467p56catfickmebxju8uvmy5ysou5tud0rcfj8az8vcszr4myq16xh29xmqu2lfnp4heq2so7627rx5696axidxtnmeq42y02alw2hyv15bjwzt4jdnecyjk7g18qu6cdufu04evp947270tskdcvl8233n',
                remotePort: 2801202046,
                directory: 'byzhrdsrrdphcv2j246b6csknfia4w9osjh35r8ro8f878lr7nkelhv553mjd1iajbo8abgvf1yu0hpenclgji7gim4udo6454so96v8q5nkc5ar755m7ktfpgth7kiddsosqmu4ugih1q3mpvmhe1oyzhbsofrq3j4zgay4sqeud6xpz9y2u8yl7uy7p4vz9uo9kowrswgc4r4bpv7ueohhunek3t4m8rkemjqt77ijml207pd59rsv7uh1fag1pwzhtllupnwrk3vv0jsdtful7xmqihso6n7uiblyehdavwnleshfd5n7au4g2qn03ok3d7oz0iwqiq6g0kn9sasvfdybc6kjbwdigazxq18bs1ljuwpg7kgn1g4celr3u7ikyuer6ypy3dyafahctudzdue2h10ru08l6kpxyjdfqervotv0n7z2o5y2f2gvsubwz266guhso735o4ee785c2xu49c2ayqjr298q9q072egz8e5ujlqgxz414mgghn6lki1mo969voqmlp7z35jzqb5fodwh2b7vw3t0f0uj2f1ebarwini7v1xylvfvdo6oajwi2p600h33ab2dutwjdpzbj48t6uo4wm0cubuskwgpmz71tw99mje5qmgcykfcdw27pi1x6192hejv2zbujddwavn3ewh1q57qxub3wb9k7bvl78ogpjg1kl98cnjwqkq1scsav2rg4lb2kyjr5nov0snnpybvu50zmd2wfhcqo917gtdbmqyv2cmqugptrcvgaiq5zx7prvy554dwm65z5ykxh6nvdtmpzccbmsxmpfqy6j1jk7j8f5dwivmz6w5u327zhpygpw3qcxwzfjjfn2y0j3c4na1s5mki3nyrje2jzyoa4nkef42mqnh2og8uqjswmpy7pmiyhpmolqvoc4f0v3qhqr2zxygyb8kuqp4gzi8ebxqo4dsw8yniixy0rjlb710efrktl8cg5x49t5ez00gkz3poot4dsvg05b8zvelse3orwhdu',
                fileSchema: 'yup417q024qtauea5xjnf8o7q9qiq7objang3bnfnolhrrong0z2lxzdun4a8vvqd4i7zlqtqbykn6iteh1hgyqaisshvo2843hes8xsnr9frg1r62s24zqhg2q5gesemsxyouv9s2nyrddqdlz17oyupfcap6syhxhxggzz2ky4zwfnixectm3z9nqi81zkarl234d4tkh1mxat9f5y8vooqdz571s9s3084o3le0l1qj0xyenqmqwosv7rif25td5zj2vm1136zbr2rzxhzp7hrrqu3oeqn7udqaqyrxxr9lbinq96o6350cqpdgzme0r9emvc085tc5et6cvqdqmiuq0aam531hgwkmkps4tees8woz9d2l1933rlmjwbxbl3qwcuplovxr68z9hofujh49ay25v56tvd1wtve4kpcz8aquxy6h4w7ycovgok4xhqgfhthxfhrm9otw9fwn8hmzvb5gqgmmuqa8xuw4oreav6eltbqi63pcebeshat96uam9dpo5k9wkdb78gxmgbrp5r7oijotzrkmce4ua47q0rmznvrlx4fqtdjfcovbg0axig75u65rzt5xhhhqjw1st2tsyugop09y5ezercop7ncaywb4r7uhf2pga1jd1f361ec18gnel5uhvaxoo60bgr5jw4htk7tbt2mv9ktv7qg2plex3jtkwn6v4vex2mmrb8tx9hynqi0s8iumc9i3r9p61xd7ewiqxvhpcnh8bfxiykwroiw2go20xco02giflnyw7esttlvr4ixwsg7gjq0n9qt4l5z0x3midfenngjewlf6g1zkl2oddh7msu6lk68c9kyfzq8i67uhuumyuos8mj6y5zq5cdfyb7hvtlwwylaey44ewvxjqmynd2xbhj6e1a788ch141cwb7hxpautcfq20b5zotemj93pza9l4np2l9wtntjm99tvzli0h5zg7vgbiod4du5uy7wt814rojgv27389piu35g1j2ne8w34qgil28jt4u',
                proxyHost: 'dh50eipgszovc7dlvz2p8m7f113ijn7r0tzeyq2ol92wpmaq38anw3chzn6i',
                proxyPort: 1880802436,
                destination: '6irpo41wkj87so1cwnvdkedi2v64i1d3xxv52n81ff55eyw59ztntct970fx0khwjvtfoavd9ap6db11rqwn6h4maclhubbxuze5et2g9flaqe92l07ko5u9qf95u6p4cyua34p2unz67aqt627gu3smhfevcn6x',
                adapterStatus: null,
                softwareComponentName: 'lm7hr5thjpnq3b0k3okc66xydzhyrl5d8adno2qx2yy8nupwtytqlgwnrarmmilg02tlc88qztvp1fswh08stf8lsyapfcf9nna4en4q06gt00u9vd3dec9yvld8uf7ifsrc05omypdrkvrxjuv7oa2p0im0grjs',
                responsibleUserAccountName: '8e2uai9rjp3br6iyq2sd',
                lastChangeUserAccount: 'scvnvi40dm0c90f4kt1k',
                lastChangedAt: '2020-08-03 23:14:27',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'gube6zciq4apku8ir10m8c5w93vls13w2ke6prm6',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'qb59fhr0wv4u99br7rnxrjpoy3f345ews12ui9bwyzgiwuxkqm',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '4u0i4iwpli3b48c40t0u',
                party: 'l13533otm3fpd2eu05mfuda27o6exa1ur5a738qp4q10lqvam3lthl46kcu91d3etjj8tf31djiwodwe1oamp7izwcj09nt7lh9cs1ayx8hi2vn2avjs6hrob6oyz0b8yzma8nilae9yyc936zmpt79xk0pjo3w2',
                component: 'xf78yda8xcjc7a42xbeuxa3d82d18vcx1ah0vwes4wjq2ohmj504spzekyy0tz6vjf3ywfmhl8n5kfluiknbds3yogdmg7tq28h85td9xk1piiacwzn8pmr0cp92gl0m83i0i0r7rpvuliylek5kpxj4f53hxbeb',
                name: '9b3usy15ufndtrua1qavuwzhbs4srtda03u6w3t2ndt1xsjrei8531a4lpl89vsz2so26obhx3w9n3h4ubvwu4qcmdkvd0okrwjg2sdieddd0sbbvshbe28ovsbiimdqfts153ij3zicf7ryrg812ybdgadjyuk8',
                flowHash: 'k3khdedkqfma38dsryo9k4ox7jht2c4l3wtxscm6',
                flowParty: 'cq78a6o1fgl0v44fczavw6kz8j3i1do7xaz1z4x2hwggcwdqsrd57e0k08tdzcvpgoirags1bhy10bezu5kuxwamlrhl0j3es27f27ic1g5qtw6k9g3rgra94pdtk657pux84au19ltnrc7qsi95so3kyrld8o6a',
                flowComponent: '9lqkwog4j4wsu4n533v155xcrnltv3wgj61t3gphgsipuqyghp4ou05noyg9f87qyap6rkr2u2q3zk24pbzm8915x8ly64jme68oiz7w6fdau0jy65bn29h3v5dvvbdfmrwzacmgrfr799kwg8yh7anpu2i8b2mx',
                flowInterfaceName: 'kclz0oaglt8m1murn4sfvpyq5pzxlelo3gg5ulawpu8692oku2b3l9fg16kakiphkae32iouskczy4xxq3shw7kg4lf9s1d6k1eit5zl1n9uk1ef6u50oxcco0s748six3d9ug3uvjaxid1m1tqljhjo2o5uoksw',
                flowInterfaceNamespace: '96qk1ijvbznv2tq23g2o1qrzrc0j0n1qguz0fb2r8l1b0j4u684zexl0vr9jb0477ujv8ayzlpq76ez1en7um05hsknkfcd3lfln0gc19oc30vkww3fmfzan0dop7kig6suej6vq7c0pin6yyfp4ald94iipaenu',
                version: 'io2xkqczg424zqkbqd78',
                adapterType: 'kce6bf391kfoweqttu2ddbxoflg0fbgkvgfaymqwtbn8zwdfbh3aw7s0lrxp',
                direction: 'SENDER',
                transportProtocol: 'e36b01jfid0nwyf2oobi2irjoftdjs84ht33on81uikcp7yqrwx2hxgj1025',
                messageProtocol: 'k5n959xx9u8j03gtk95zawkfp8nzx2m8zwwvfq3t2avl585fzfq74irig52i',
                adapterEngineName: 'hvykp877yvvub3gxw0l8vc573k3samblor7cxn6x1vvr5vx73xi0q6w9fpupcfmgqnmiddf0ys7azukj94dwwqj8g2rnmkbof2nglpj97dr3lkz1doefdkizlur62nsxxdftfjdaoa69q2zfuonbdb6cjelvspf7',
                url: 'n1b7e8yrf49ndxes5vh37pjsv3va0t5ykbkf3rz3p6n1idcaxs2xxpr1mgbc3fu9ywcnwf6sm3c3jen3049ed5sdertpl6g8sktvzyw1f017chdxk4j0m0kjvhd1y9isuiu2hztsu50vudruucvgxepkfb7d9v8j2387q8b9r6ztadyhyepww8ek6zq2d8fqm3xihpol4n5cph46cw6ua69hus88h35vpliuti602qfv4zuf6rcglvaibpq0vytonlx7jzyqn0pta4s1fv0px1yn071wcd3u8dgyo1psnz6p3rnkwu2ldncw8bbui3cs',
                username: 'or986ya6ch4n1r98k9k3vgvco9svqw6w2la3jpmhcwg4wfajtb5zbjx6fk16',
                remoteHost: '7lvwrojiakfqnyw3tzsx99rn91vlw0adgwatduvh792yo6m8b4s2r5eisq1pk8mrsjh7nsm9bbbhbowo0mztd23jv01aw0i5w9tf3urbx8xzwf9pdne0axeleudfam58ndj7jn15res5agmq9efb5k0e5frzj1ep',
                remotePort: 1793695684,
                directory: 'c6yhc8jr83yxrxvf5s5xd766qj5alxc1yncos7wtziwn78mvtshubhwshtfmjxfs718hsr7o32f046rne1i995vb62g599int7izko33iv7rq86x96jqdjamb2pm4es3gck6hko0jmuhb6l4gc27mktbiglxuss5kvxkvl2y20sm82ps86ckbo58siloyslc1u0e2ca2pp8idmw2t9asxk9atp00jdfe0szgjw6f8ji8g97vptudpxfvxftalih9jntw0cb62n3c6b6ujwhyq8m7z2jdmxl0wijv7gad6lvwupup246vodw7p5pmbrenfppkjyuezw1tfyam6so2hj35lkxl3tdyhwxgxk62cmqktpp7r7x3zl4uawecr2fik534169sm5bo0ld2x24f682lxvhz3jjy867hkqjtnw37pwu6xs42ostkc4fbwg4jik9he10l5v8t6jvtcwryx660t7mid97shyiq6xlp8u2oiptl771yti6d70iljokapx11v3d3fy4jsm2thyiqbdn19c1ky2hh96e8v7mqmfuxjwgza5kmtoi3axetd8nuyxpgn1vadgcli2ftvsr3v09u7ff1yen6hl3p6jo8y4p5cvuodlulute0wiwciyd6hwti2lnx732axpj3bo27oloxuyqnivbjjk8sexfwkr9v38i8yuz1oh92kvpzir92ax6ntow2k6e66gkt89dau3gr6k8ucgpzwrrlfpu36hx3ig6ia6yeikjk0je354wt7uffjmg1xd5ws5b95azqmj5yjtpgigy7nf0rpat3i5pfz6ulocb6jm4k4vxfryoujk88gy9zxjlhwb0hyobtvm6vxvmydxr8jx3n8atgx61eojxi86ma7bwqoor65htkuxzhriioo8e4ndfrngttdoc3fz3ab7mkv5hah8hmd8iim3qwwzlyi4bmj1mzzk58dn3o2p179xaba357fqj30xcukq3g9sqen2gbqjavdz9297swvhduj6pl937klqko',
                fileSchema: 'ia6ft7kcbsk6ju1wyuxwnndy2nhf656yccvr4udvvhdku1mlzqqeghfs2s8lcpl0xtyjl1by2gf7k9og1a77iaxdd7qzi00yjzbno7u60dkr14anyuht8wdjbxmt0d0v2eupy84xwf44y8svdz6do2dl9baomscb271opwozmrqt80mcku1lilcngx21f9wdes4cw7rhafzy6j4wf115n4fxzgpdqgg3s6pzlc0xyahyb4ofa55y70377sqca0yrg14n1pl6t05mxo9a50lkb6gfhkppxa66feg2xynrkzcybtt0kdt89yv3d5vw6y0c8whefdbff7m7s6x59gy1hcn8soryu93gx1sxtrq1tfi93awq0upc6na0j88w2uozpuqd84ixwcra3eagbn5digvaitogpg955dybdlmdbr72vanpzm3mrb1vslu9if5hkxq4d5gmmhd78k2f88h7b9rjiaw643ue4qgvzepsxoxqsxzxzwlv2jqalx1no9xoyauba6z9ktlgjsv7huemtwyof6uoqbipy51d9n0327luyb09e1oo6j85wudyylz0ixdcwi70mtx0ux6b4ufqprmn9qvqffqmsl2a5lm4cpfqfhwrm94n0lezb2d5gimuu3htlfr2gde6w85tm2y0i8pvsdasdzuuq67n8gjyonrnjr3qqhqs44368iqxybknn7oe714tnhq3nvytr5jxgwiwgwolwoawjrxajtaigvm8avij0u2mxnd1ienx3hc7cw6osyc5vzo07un3i0zg7r0cwkcni8p6nl51zllxskn7sm54cflv3x723zlezlsgowkkyxtuqrowodvfeeghfnushn28c6jyra3vp4781kzl7p5yevt5x5pwlp3mo93xm0966ppjgbdj6f34feo86cgtx9ugjz669dqdznkyobiat8z5fxou4dvxtmqlj9k9l4s3omycut9itk38639ntnt7hw18etl9171dte46ew666dvafj27aaejf6hhf5eh',
                proxyHost: 'xjro440j85qs44oikcufhqvmpyg8hxxe3o3bbtimoz0smklsvxuza8tvnf3u',
                proxyPort: 1167612167,
                destination: 'w0jd0q5s6s89rfm4uh0gph9zef7ykila4ss03wykxjmcjsqagoz41325e7cg86xcnmkokhd4k61585nnv3fhs3riiklueh719kynu814lre2vx83e5qjvh1iam043syu56bkn42npkaa946sc5kd9jm3pau3fjsy',
                
                softwareComponentName: 'h0j6271u6awaku9yuvpp956dqgab1o28hclmnuuury8i3rixw642bly92fokroj35s1x2bp6av0q1e17wv1chnjo0qqdqs660o5kmvnwzw410tjrp4zf0to8u1771ecb7hoyljr117t86wj165c3417327ibra27',
                responsibleUserAccountName: 'fh813mnoulty1cx372g1',
                lastChangeUserAccount: 'c0ln5x3bpzxlrexrz1jh',
                lastChangedAt: '2020-08-03 17:34:06',
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
                id: 't1442jnyoje0fo1e8709osi3o4gngd514q6j4',
                hash: '6xv11rqsqdh59ruq0z5wwrvkkrengnutqxqttump',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '3uoim003635ussgeqxk2ykrybouzrwcqqyak0okcyd3jpm0hz3',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '7y74ef3u8i67yh05i331',
                party: '5dgkajy854238jft0xwv9y5nobnxc1tz8iotopqxj7h8s93z44o9vtd68yv5hx9ta0ne8tgcaij939acnhp9mz8bnl0tui47h6xtxv52brpzw5ikmhaillulsntks9uyqjagvfjh8nzd5vr3kidgw462zk4fm49o',
                component: 'qrbnu4iysrb5t121zf3gba03zew58wm1z8ubo6traui542kgfscoqpqbev72yk4z8jmzyydhvvpaiupn8yuyp6ulcv9m6fhw0nkq2a6hcyny3ex5nx1lo9zkh80u2kfu6v2ypqewgae304gybm0cj6sti4h7g47x',
                name: 'crs528cq8vi4voca0setsq2pi4x7x0je117veizww2z3rkvjbxuo029ovzjn9pxlcgd71ab259li74i1ypd9730se67susinygq7kj27jyqyl19cavwzcyx15rt1ll3jeoijr99ununp9rx3mnnjzypgrcvggamd',
                flowHash: '6ihjj07l8kjwlp20kbpqxnhnuqtjusroxfjry3yg',
                flowParty: 'lhlkr0a3g0hzxunvhuncm14m989qb8agunsw7wulj5hrqtfbcwampqphc7rfnlnb69zrw0mntc5iix4pmngxeeuanolfh2e7940qmrlvkzr60fip729bb9bcvt63audxj6tqq48odjlv9yy034s8gysr5oj5q0ox',
                flowComponent: '98bpysyrtayq0h903s938p1dlo4rqig50tm9rxuv0y6ob0a0oa362c6qvdlxux14nk55vnx5vfo49bho6arw8e4mmj5mlv1i47oxiw3mu5h0v5uj6b7kfae5bsj6ka12h0czwxqndwsccx94qce0co4c03nrvm21',
                flowInterfaceName: 'isoz8mkze6fyx8oargp2efubxbs82gsfbdo4nrn0txgjswc42fm7bw7r0louvmfr8nijq94rft7wkaep582xofi2mtujk10i5mohoy7wffm70kfbmw6hwhrhywaqn7e113mewdh3tfy6lvg6ai2gzas6tlug6tw1',
                flowInterfaceNamespace: 'l32gftsi2jprhmh05yej4669oscwjy3ioknm0q7kx2eyy5w1zdyflix197i4jliw095by69j3b16ri069fxbjxzly1qj7rr2mwcrmakabnn0clyg6hn29rg4d1wv12rqkiuurnm71l12i8lxxluiwp289wr4bgas',
                version: 'zps1y04oz1oc1b8yj05o',
                adapterType: '6ncpj24fweykzsqrfmqnwrdom5v0exda1yagta3daoftjshkzg4juifbim6n',
                direction: 'RECEIVER',
                transportProtocol: 'upyy6836e68tt90l3maubt7lq2pgghhc4rci0sbk5qlf1n9i9kxstq440rx7',
                messageProtocol: '51kn8f500wdqyjp614owx5addqtsi7y1867lcwx32xvbbqdx7seq7b1v3wlc',
                adapterEngineName: 'qnse2tiehhr8iz55n2knc101pw4rj5l14ldous2di7q3mloprghap9ais9kcwhc7kx2yzswclf3ol8ovgagiw95netpeeeyg6a9ryy060q8immbdodd0ghclqrkcj7r0oq9bpjg4tuy7nhpubsehdhmnboqgujc2',
                url: 'e6i8uvtte2mn3yvdqdjjj4cge7he70awhb6fswzt696tpakanphy0jcj5qjv4jtnnryddeub77fb3lt0sgm9n0esgd1ul1928uob6qel8z1hmnso9gqzxarv2wwdlztk5synnrzj26nc3a6wjivgde1tndhg7rk4rzv1xoknus14vsrqb44lyz85f4vzlj2ri9zfohzladroq40z7omyp1c9q5eheh30amrati8nke3we3o38fw8se0vjjcwstlkmvn8ill1trceymycke0oy964vfdt52u70t2o1qh1mhjgktpydbp5p5rvsoxd815w',
                username: 'bqfbqdj1j3gwrkam8sl9jb9dsv1s1tqr56dglcz5zv0wdpfgh56xlu33rme8',
                remoteHost: 'lbm5qhd64kkjaov4h2eihdhbm44u9njzzrlzd9yb61jvgqwnef4v08px11hpedgf6lkhmr0fgmjx20grz6g87q9igfajhn6tg0jp52z0nw0bib8641hthhws9z2isq37t6orffvlqz50kdc5r7n8zgg3ecxs0koe',
                remotePort: 9699999032,
                directory: 'ctojjp8v5gnbuaaqieu3qcof4q15vq7qt2664w09sipzimjn0vo87fhk817sqh46wakvlqscn3xm7v3fjn99hmkajb7ylypw0yg4t0gedra54cj0c7fvtn9bgqs22wnrz681osdvfzna66fk4fxmub5d6h31vlbcqdybqb9mvw7m37m98in2cdfo7o9so34v62gb0nh6ytrcoqxi1khkj1n0ez7bl59p5dz1vllqwmctjtuzmmk10z8qj1x0n3h4datj7tfrzuj7ofc208x33h555xwy57ucpwk3i0vun2gznrk4gtreco0c4mqn5em4ano6amwvbshapq4i7c7fc4enksmv3nzwl8hkelzfiamhslogcqcwsg7p3ihfxdx0f1vfdaeaqolvghz8ae472mprsbkrohs3dc8ttr9y84w6q7faiomp1izcahsj7w0nq6amr8b1n1sxry6j248jxzmzbiaj52vun02046xgul0jlk5opfohhwed4p0xlhdg0o0inj26za0559gxubfuqullwctm55qle5dquz3udjq92l8vrmnp4xoktriqz9cy62ruagvmsp3zwae3zp5tfph4a3pfik187g3gx24ed29t374b2m2ny5c65xwhzqxig2f72dop914c2lyjk5dt8b4i8eu2m7r44kueyxkb0yhmljpbtol5v56h2yec2hc1rafjqaaukh5tq4iyznjznnoqgahygvteavaw0vy2qqehdalrgio4be90ngk4xx9dgma8lavppcvqg3c4c22xmacxlbw5vks398di4cxzqx4wz32wujj2g7xrw3gaiff1lnzxyba2z5qiqulmskti5f87b47etfftzkjj5x1ucmhrhl8qx3nypfx2sg5dynl2b507dzkwqidnd0lnzdqmsq90lrqc4j0ov34x5ouf86zs14bsjfvp0aroztmgp4fsgpvzb7atanpgfuuflzuzdliv15n1m7c1s888sh7bsfft6bjtejofpydmi5l8hdgw',
                fileSchema: 'nhp159ae2cdj2kastmkg82b9l4uld7m5o6xycrsvbag2yvm7y5db7fqppw6n9yvqadm1cds52jjf5qemyofkfmfbqhic1my4su2odv758zc4gdg9aqxqbw4zykg1vk3jbha5fnpkuffm3t1o6m2q81lorahwx9m1ju5255c6p71u3p6wwazco4bzem44lxcb65v52ke6yaestsrbou1jfqi6dk5xao9mzzxaq2tfee0kf665cpw7ztgu2uao77d0ujwpfdfldo61c0yqut23rd7q6wzm3xma9gizterkx13px00i96t28yr0mbkpxb5l459fffcx449r58446vocf2um8ijny90qw0370r8bwv7qqf0ubnej9yp8iyvi5tdddezgk977bgm3hhv04jryy4jx8xpe473o5wu8nx4r5inz5df7kwz3gm9ghqx0oj4k55zs9cav3h2opmsrlv2iairl0wg6p5vmfk3ykbfik43k468r2spbtltuo22efs3qdx8hbs5bndxzcqwycyogrvlp86rl629o64ks9p3zw5qrah1ie9hsfwi2eh2w1nstviu854sa3pyz9m7duvtdeqy7myta73mr6cbq3qqwplo8ls6yyezygs1fcvyoiz5xp7s3wzod6owxxlsd73sxkys6bpk6i04fm85flcm7bgxtblf71leouv8jr5q8irum7jn79axa1f0182ig5jtop0hr7tcgmdu6wjw43mpn2cumowskbx9r6yklws2h9aiw912yiktsbsxpr8inhwcxoy83xstcfteht59hni34zhq0mkwyjzb9gnp1461fmkphs227xmpwomsa1o41xlvcmdk1qqo8c0h6m4oilb8esu5jym89s8ysofquxwlhmx17l0qpr0oaflm7czjb0ehuyjdd89i8nib4dyopchaabse7kt82tsmsaoz65g0qw8ybszneo3gxxwncph5471n71c63gccju2wn959h4por041ee4coy1mxldcc6z8hb27m',
                proxyHost: '66359cuca9t40lkuov47d1xjey94txrdl6imfkh3dxkc9xvvum6oft4by1rw',
                proxyPort: 3384900093,
                destination: '3y13gdznkyu7qgs2hcn1a91v65h59gbo10i6mef4erby662pol18e1yi688jqxo57w3fol41hs90hk957h6bty4rph49t09lk1r1ndjvbwejtqwqdtvbqnxg2rdvp5rff7nrnu4zpz6g45talggld141rjs7xubw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8gzgv5cpoid8jvr5pz0wy7yvf6wooypb4a96z09iwvsl1oiitidzkowvdf454yblr5dzx53uxfw3h6yffkjxp55tm3b8i8sbbh2mxoqd7z3g5uuz4gvox8b7wi5zyzmgatc94rvrg7inv1hr5dittmftqxvmqwt3',
                responsibleUserAccountName: 'rx7hc9rj3espimx5gabr',
                lastChangeUserAccount: '9ivvdfqxb717s5sttpih',
                lastChangedAt: '2020-08-04 13:44:00',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'zgjrp2i7leu8ep4rfjknh7p24g1trfmoyfa4sgmnf',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'q96k6zl3e3q9ltrvlla6pj1136hx1op34k49x23hu1knxwe1bc',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'vnvjivj1zmouugsgy5nb',
                party: 'y8rbtkztehur2bywx9n06ezrvqn1cp3qmxz48c96agaxx5u1e9yayuz8i9ymi5l520giysamrdmckjh37kmliqqkybeg87o775pg6ycy6dtdrkagc2gnqznh60ma0ovvz04lnxnv78r0w27geqvchp9ij2w7fy2a',
                component: 'via4tiydiuuf20qa7tph3xkoht1lzbdceyt9ohv4hmgie47p4gnrwddl3boevfkhnhuqci3lhqh1q1519pqspn7rbriv5ut8h1679w6icvlln9f8zku6qi5gp39mspuguwoc9ypms7foo4c5isq8s2qjq8v1d7i5',
                name: 'hanhpfx7kpnk7wea13i1elmhp4wl7t8wna5yempnd1ogl0szvpdqmrlmrz5r8oasl55kb5riazhqeqc5r2vt8gctumf03p0iov22a0otny6mndgrly6dkzd474w3ha9u8el1gvtdm1nhwhajttwk9hv0lsgthu4k',
                flowHash: '3h57o96rfmv2wrt29iw5zayqz27uritud0wn8y87',
                flowParty: 'dt3ox2po0ouyj2hwgq16ko3401pcjg7nrnzq69hfolwy8q9fgicjzah4q77gpfggcmic8dln9n0b4p60463xkmwwcm0358tz4u0ue2qrkrm4zu1uvz1585a6syxbzx4m8uh695dftabqdq2tjzmxhx52jok0adza',
                flowComponent: 'ojig496voyvu0vz76b9yf4p3uz6eetgw1jt63i2r7xt4wi7kcquigmnfihvrsrzr812q5oi84p65xjr1nh5lerhp2npvukkdigpci7p3a2jvccsy049ganwyfedbi9uj8s42f4ghw88sr0a8wn48wrtss7stz4mm',
                flowInterfaceName: '4lik6biipypsiqllv9h5r55zxp2gug5iwcmoie4f7rh4p80uvkn5a3p3fd4o3cjrbbdwset6yact954ehkt1o9nk7261ecaiiv8k3fn2pdzoc6h34ibxh1cpok2odyfh3w8n4kbhebv4qxg6ovlx1y48t6p4mayl',
                flowInterfaceNamespace: 'regi95f2hcx50ua5pu0w1araa6fkabjkegubolzvviypw6utdscunkeuhjp7k5hwfo55j8l8yg75wfl1xp8fcf8jwi27aynkfg27y12k5288edd3569h4exhixgufihu66d8807ut90lvtnqbz5tdco0d3qqvz5v',
                version: 'bjyoaeishg88rtrjvblo',
                adapterType: 'pkyjkk0rmncxih4xgcz24yujtcrct4v4x13x0ktxa32i24hchujk9pqzdbaf',
                direction: 'RECEIVER',
                transportProtocol: 'alljpqzl9o8ll05f975ph4nigsnlb96b71cx2k14pgj1sdvr0351q4wasmct',
                messageProtocol: 'q6palnh7lmp85olmrue9q3o9gb8iqmlk437a8ocdhnb5p0y8zm88kizj3uak',
                adapterEngineName: 'vyauqb850o3slogh1ihi4p7ino814058b4ek9db2s0rktyrzp0mkjbwf5ivaojrlgaoi3no0ht9jz7qy8m48mr7mbo9urli1hwpzwrq8a0mr1k8bdzeef0vtfn31qfjcj7vk6gi43zq02khshraoonlv97uj0aiu',
                url: '4qb6l9rjz065t6fu4nq8fjzr5y7j48oy310yu2njkafbhhxji800dv0yh5lfq3k1gmjcwcvep9gvsp6160adqi1srajstjzr7ovfn2a700mmpf6qza5lvm1of1njz9gfixh2qfm7yhnd18c0egjawdozveierdbdxp9pyt5a7qqytsk4auyidpxsc8c3v4uu39qrlraq7dxxrys8qt9yopxf6uc1asfb9qlun4i4kfhx4h5hvc3brpammy70a4rdbk5mz6k9eiv78dole4yvnui5m285aexs2l1e8waiu19clad6il1mmt6rwpy0wx4l',
                username: 'rdpodr7by2hvpubagbocjczmfxf633hkhug7no99pa6l5ueyz9sbku74wm5t',
                remoteHost: 'm2c2mjuk4j4m5pu0fegqo5ru6s6g5vzaft5mpj4t28ol15wtyq5iciuo2zhuil7vzgzxa19tl4o3erjzrcy1whw1246j0t6zl5d8d3n18zbtm4re5yimndf2fionc7xedi5vwnyyc5qkzjkyn9xadjhtnemnxg89',
                remotePort: 4374956596,
                directory: 'xl6fvot1odex6be6h7ba2m97hltwhun66aj33i09x27tyypf0eovdk09opgha64sprb2iffsh9k6zh9oiy4vrny2b07dvlz6bwkknmmaue2n5p1vd24owa32nc4vknpptg9g8uwn2w1b6ho2sos1963rp0tebzpj7e74bu5kd4bts3rx73imoc5lcic32mglvy7t6re8gbov3y88ellxkfd9tp4ibivs213wa6a81toihup16o7gd9hb4oki872dh9j2iwmq10182dyhq1mu4x339d3p8x8eqq5xiawe4dzhw4iyqt7cykjljfwgmopmovhz0npeiknm68t5mxbqipaxo1th9xwbyn07zp3o7tze8jhae5oamvptmttgqtmpzd9fgend8c0q4xljy9frpvo06ytmk9juzqc8pjqhopq0cxv3j9xt8usu538qu0k0jn0xtyfyaap0tyifhjh7m6fsc8nxtspgd996ayrjjmujqfrhoseg4appp3mu0b2649yk8s2qleveff140varapfkikrn3wbdxb1kkycrjl73uby1ur3yii55qygp5es82qgb5qbl3adgceh0ka6wcoz7odah21j6yv2v1mtgg4bo38dmt0kdo32eqi5sh9c73g53zxf4w2xwxxssozj6w4eg83rv6gcbjovbun6s8re0qxmqdiknmda1lovg84mhf67g8iwx3lg9csis81f1znploz7fjkuky0yfhx5wfwdk8mzh8qzuv97oi1v3rv7zca6k2zrisvo7zykp8z4xyfs6fltol3iuqwn10fyus8o5hlr5zpp9sjxd3artcuvbmxtdtf126k7pvyr5p8yl55aoil2l4r3t7uoxvh5799xnlnq31oc8phvfiai3elf85dfo8jwar6tvhijlhcfq2pnsk4mclsaeg2xdk7aba6lwdkrqjrud2pb5k3oj5eeytytpj9z46rfk24uw3ixmylpzbicya72krhqqsknyua7o3q1wkluyi1nobkrqowel',
                fileSchema: 'm8pugmib6y9uci2dj3uadsgdscehk6qfgqfh9btl8kqq9bhv1xfjmaeavhgn293l7y31kaml5mcfqg74c6b3rm6uvqob4pwwjjb1mkhem8mnkczom8s103altu5jb1mc9jz6bjsltjhc15ea2nq2sv089qxm6rsfvgr6u9kmke2cw3tv8eqv2h9kmvz07sqhs8pq6f534xpyp7dwiiky74icf5zymgfs062p4w5cxgbd4izzoh80zqb9hhn517u2canr6y8jt924usqhfv65m4sx4e8kfectmhk17efxkqh8icmgiun24zvljm82yzsfvm3fq86rsbn7htm7lx56mnb2aswi4phxe2f0ado01ywyzxol2h8u0zrmn6d1qim1v2egq5b7h70zan76c5eimn7z1s0qm1iievct5u4wy9bk0wj0o3fx5lfj55ql82iuej94sfdrqwsta8dvjmd8xm2govyne0i1ip19shlcoaje9uyk6j8tryxxowke8bzg1lgcphwgthvk0ou1nkckbxnt2o73vgjif75ay5e6w52ik7dq0funhkqgdqt50rsodbffbzsnwa8hlv3k2su90cmtwmzisd4lrs89y1bmf6n70gqdgbml5jxspbp787zkvheq1bwp2zpntagte49jq2yk4dcju01ouqo78x55zf1yd4yidoc7280ovg9fgri62h9ptxm8ktc9jciw0dlt0lkmyevnobufw1djla49o2c6nhaxzy54qznl8ulpic1tzkmoaue9nahbesjadasl32z7hg09pwp79xcl94n21nl8yjtmsqdpofuq87w90vfaza4x6wbf5axpi8cs02ffv4sfkixou4rt4nipn4jdetfojcn9vzww1mb3wxeam8edstz89mcfr4wyzqcz3jjpk20xuwc0j20ruojjsrm78ga29mj6bd22wxy1ib3oei821c2mkbgiy108t3vpdisg37fx5fzqcasb5r653ns5afapnkg6m81g6hlylqycq61t',
                proxyHost: 'j03hqhg263pd2syttzcm7ehd4kfvktaj9rbzahkomvfn1wlm53nsca9zo5cw',
                proxyPort: 7690459028,
                destination: 'in5yoe41yemn6gvy7p197lr8bj8gmy9i8ux28ut7qxknv3i103ca8hsp7nps9bv2v14wfyctnlkvs4v9jwlv6z2p3ra7wgeg06638znnajdpclri3iivwjv08dqminh6ebzyilzt9xe511chxm0etikxopesdufs',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yg8ybvzuno4xt7pinh0s2q66o1rfs9zg52joejywi08drkdh0fk0pkfmg947i5pwgcnsxdp0b0xtdulr86arebbcqrqd13wx36w9523nmdmsjhwcz2zwjv4f4ee9978zr0y7sgpxg8pys8i66efl0qb3zvuf7yj3',
                responsibleUserAccountName: 'brwym71cd5gb7y4wy8z6',
                lastChangeUserAccount: 'y6zgzcu2lbb785p62l1g',
                lastChangedAt: '2020-08-03 23:37:48',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'u153x0g434k3jcj5crw36mncgdggyyuro3n2n665',
                tenantId: '38y7rbxqmacsido65k2nwj03tiirb0i2ok27e',
                tenantCode: 'n9lkrj2p3g1l6y6ocjpuegavhbiy6qtswkflijfgjrshg281a6',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'vqq8oe0rqcfzwadyf09e',
                party: 'b8odv4oirgh789lod2f4ye1vixfafu2pvnvtm76v4mbm6w6ottareu716bnfsciibvslu5pzgoevfw1tuo4bgtvlkg3765z2na49qzbq233mjfibks12fhf6wepw9pqj3umcyfqb8vqd8opavu96dd1t7bj9zsx6',
                component: 'dll30cdrreowvm5i1m7k6rnd44qkhmdzh4rwq7dyjd9ui7v7g4s39k874m07ertwxni6lyb7703fgu28sv07pjf21bova3q2js3xjzv7hplno4yd4sjgi7m2tsxw41pgu3uqgzp354tif5p9kixsxfyy2nbab238',
                name: '8k8nqqk938y0himsysaabr6otziwipxc9omns8plb65xodyforkr0qw4qoxvxdn4k6fhaltnx1skqocm3uotzl41yjdlxii569bvgwcxptqt8uazj727ljg24h5yc7y8ngqntrkgir8iptoshmxnok8knz86da24',
                flowHash: '5iuycv7zcowsqa62oviq167utrkkra4ceku196la',
                flowParty: 'f1cndwjj71tdd35xamfos555u8esr35uftjw85vba38w25mtr9ycvbzcik9y0fllhtzyeaznjnuesi6bsd7skfdgtkxj5lrlz3z5ho00dtcr593cr0wa56x2k1vyyij1uqd4jm7mvaqt8baqrplnt1q5balcrk9e',
                flowComponent: 'b2d7g2xv1nwkxc9rtn38a3c5lqy8731v5r1vczwqw7o2nh7b87lpzz0luboz3d5t6cgmxepg4pfk15onyke4jqvmv8e06osw43sx7unvaq6gfkaxddjea480dyh7ihv6fd46s3ekba3kntjb6zfnrrh7c5wqrhs7',
                flowInterfaceName: 'qc6pwnao24desz3250usyv3m0czr6h4a5mjvq8uxmi1kf7vkr66w8p8ygqqyiqd7vknhw7seyh5t3jl3pv9kae0b87upy2s2zj6fy59i0mjzntbdj8ushngpl88clz4h5q2l0nn4ovo5rrjlshgxsw4btc2rll2z',
                flowInterfaceNamespace: '2ad7qwpqzmnyx2qveelwxkfx3vdo6zed68vfta9x6gqar05phepo6svu73u2fcavgv308cj3rbiz4ud5rign0zqks0ehawq3yc4ajydk1o538bfj6p0ql46d4smkuclxdilrqd0a5ctya3in5hvn9p4dwwyr1ooa',
                version: 'e8tdswuul3pfwjj69ujx',
                adapterType: 'uiu7hgwqwxa66dh2z7jsqjdfcjxbd8l35i11q1mbff4bh4wtxwkubcmeut1z',
                direction: 'SENDER',
                transportProtocol: 'v6gzuk1nlkoutmt0li6d9cvb6gzlua9r5ds9f8f2howxadaopya0pbjh0mbc',
                messageProtocol: '6ut7xnrwkmnm6hbaiirl1sr8tj00ki55u2wkhdw34ea59d8ig66ubig13bsx',
                adapterEngineName: 'yirb062ocd5l2spzhbqc47y5bm351kmpf6ssmsn4qfwp511cl8ikffw6t3rty2mf8cnxbyqn5e6dkki1lymdsyvhtiy2txtthi3kfcdqmkha8wzsouuhsas8wcmn28s3i8iwv9skx1zoqud6c99fna8ihju924ki',
                url: 'e8wp5fyiazbj2qjz8kcm8dj45sq0544rip8f3uxw17on5912qvkbvxeyapyrdihpw2h8sk3wegswzyyvxk4fen1hu52mzeaw28d91fyrxg6kcy3qwb3wi88kg3yzlkqqgw3wmwtv48o9wjoqld9vxwgikn17dah551skjk1n3xnlxtld4vivah6jwm8g0zg16zj6h6ifsnijcz00smm520adl63lxp95akrmn3j4m0a0uypt311dhfe2x5kb2dkbh1gx4340aa4m7x140lclh13ppm5t3g6yvuu87ruiazsib0q8n1l4d1fcrkt2nlrh',
                username: 'gjrfo21gldd72mfbzrhu4wwr94cumjkorqkrs9i91vvua0tvx47ez4secner',
                remoteHost: 'uqboi1olrqrg02yxo2yafpdukg2ve2bs6ygyfjxpjdgi0cz6qfod6cd0nspsqdqf49lryyhbv3djt78fqoga2oz2dg04rbjf9hkcp260jbkpddu5sotxujgotud0lzygy640svye2258i8h9lvqabdt6c6q69ncx',
                remotePort: 3811328981,
                directory: '57r0uo24yt8s2wegjdzevrpgzp6lk6nir59nmcr6apo6r3q5tst80zfxls00kf8y4t908syov8jy3pb2mof9l8oyc0e4tn4tnnogog1txh9xjley47wot4delq3gr7aswkinjv0863iz6pt0t3bi7turli1qv54zyvfigvpk31xxuwanw4s5nscpvlt8ay35b3b0prwze5qh2cw3ud8x4vuv9sygv049icw2dx6r2limrxqqq4gken26jvl7f5eppg5e6asht3vhkc8nqctwb54sh70tdu6yu18p279kbgc9rldh4bwe1661bbkmgt66yn6aud4j0mxtm7uv8hhrtxljnb5ee04js308nambk2ptw475s3bsqb3jdek7sc3xx4x4zygjss8dpxrc7c1851f4m2yvqdu7rpa8km2lkivryd1rc8fh7kh4ihg01rn3hugj61pcsi4ftdk0jsl9el29s40gupm8ccy4agw7r2lv7gm8opcvrik4r5q1awm03j523ofuwsuegr5hd31r10gmdgfkm3eysnb03w948ujj3b6t64a3h6pbfhjtma19hx98aaga0tgntf5rdrygqpqqjzlne3zs3zu0mgtnmi6f1qiuj7rhwexa6xt6o8pu8muarlhu6frfk45m0n3hfwvestx20wdqkbntaczhsq8s4ppbrxdgrbn8m7vw4ax4l3mq3fhvxpixc9tuv6u77je4myem1izr9rc5u66s0peyaratv4kwyltyggm5jre620h3oymbe2pm787i051l699ynwfj7baahq5q42w9emxxxqtho28l66zzrd18amm304bsjfmda101o7plispeito112xydx3y5c1tl3xy3zm2kty4nz9sf59merpbfp5qltl57cs3u6l2hchsigwfdwf41z2c5ohrjqb0i7y8l6or22c47mw1me470x3xd1r3hlkivooyl6ws8d8qb6pkvfkyps9pdiaseedtpymdlpkkwun6305uswjp2ixku6kr',
                fileSchema: '2ll2vct20q83029vc2odsi9cejdj2k8bv8ew2q6ht3i0hpbfrf7urvgjwe6hbte0iovwqenoe797fe9vdmqjudh37q9rqqv9f5zjjimhbvviv3vty63auu73cn159hz3fbxjtuenxefeg9t6f9pd9ljmskyrx23mn5sl3fz2d26uni81ldf7cx4mvyamyp95fprbvgq99rrs10fgoeuiy63jyua12vq7j1hcfz06st7jebd1cwcvvbud0ax5ebbqqdh8h41qrq4qyqnrw7yyvwpq1lyw956wgsbl7j95swl5niq001nuie3dp8j0qb0j3o6cxcbupfiab53dc1kp1meql4to93umcv0qjydwp6dcixazb53rty79eufxcying33sd6imxtb6ravtddpljrg0tmrijdjnsdq3ok6ebwhpqjwaoyu78551js2zu8ej70gcpvzav5ncpxvlqnm91ewrs7e7a0tbiocv0h9vl55g77efjr242ofch7zz4wen8l22j5z8nkgxemn292aelnca4k0z9sl0i7joennya3698a8lag1mymoxlmels6dmsnoffky27vehde1gggmu2rots5edooup7k35nb0rj4tidx764t6fyiqxaekrw8eibb0t049q86wyh2hr2kpbwa2myaxt93fwhkk5vs5rwtkugwaf5ie06gyxpna26gi7bahruvlzd6uw3mh5kvcowoiqpcp96hs74j3zgrkiyfl9aoptvvct9vbplrj987uo0q9wqp8yw5a9h8p5fdhht531h1etcqc2kuc43c1nfc061kwxpyl4p09wjfraucwqdt9gs7b2dl7olx9fjlbukn1mkpztd3hyjkwxmmzgk4l4jnhhfvrxjdznfnnaicun81hofpi2mdgsous1atnanrbsap2sbo3s7batac26q2cqzldw1323kg6ffld8fnktwc99ds9i0pygil7wfxg22ijvpr3ovpa395r0bme0szdoclj0csycjs3rsfrf7iza',
                proxyHost: 'mz66vwx4p5wopkkvdalgmsf448s6zejhilriffpuwawxxd7hskfcez49vtjo',
                proxyPort: 6340679542,
                destination: 'cshbzkkoi344yk6hx0iuj4dxv40zod1kb80q95tka273kdz6kj62yek0baf5hwv8tqildw0a7kfvxg1hyuz4ogz91uk3ipwu5zxpmuc6xhee7zo442dq8nc7p9dd7v1471aiim5iehas06wp28qxs6jjxwbjlr0m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jzmpgeso63jifaw3v3o2v04v4p64on2tw3tw4rfzt4e9egg9q1pw8j9sk84xdy2ande3v6vh7lrfwafp4w0tidrbgbx9pzh14mmjjxhq5l7z63zw0uvna0s9ksb826hjgvvsz5uxb39jd2moj63hqg7rjxfowgxo',
                responsibleUserAccountName: 'kqbtedo6sdbi1vvvukjl',
                lastChangeUserAccount: 'op2q0ywed8vpooe2ahc1',
                lastChangedAt: '2020-08-04 05:06:46',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'o0bceft1ddh7y87z5hloyfjk6i3okxst7vh6r065',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'yabs16129pezabn6mj2hlmz9vuqpg0jjt0m0vjrankz5frzb6w',
                systemId: 'owy0j6th39rvdtzouuxe0mhuc9jktc7w5xgui',
                systemName: 'mon1b7g4cfkx1dy09ecp',
                party: 'o8pi9939repklvvqu4i8ddg5xc5mj6lp0e0sy900oyw8wnamuvnh28zp9iv8h9pdfhh1ab3kjqhlupaxp499e0ft62n1uuxg1qyx7l524emoo5nglg08gnujd34nhufwzn1s7f0l5z76upq6y2g97oq4v4dspzxf',
                component: '64soxysic7uxtxrgyvu2xt47vizaf2meezb5yb9gvapqiawkgxxilygt1388mt7q0w3u1kzjnhd9slk48gmv5h6z7dqtml7czm7crb4lv4yypvrsy6a6ipv7gszc9td4lf9yai017gihdir93p4txavg9gx4fx2x',
                name: 'djv50el872x4a4nw83uuc141cvb0lpkbkf75urohrnnklyz41e1bsyfxgxbt75edtwxbtr1lz81j3vje7lns7yl60zw1f225lng5sxspscfwc4u2who5zu7t7c15wy9up0m6fprhiatm99r6pxtv3ej6cyba0p36',
                flowHash: 'pm1g41slqsvfdp7iyaneg0uyz6l4ls70z8wanryb',
                flowParty: 'lpmrc1ap4qrodx2ik3mn0qxa10ssyijpjkx6cb58mkhdgf5t32ml7aob1f6brpdgk5s8yblm3rqcbs9pjvshzjewxa1wlpp90wpj0jbhaeo52ist6n4iqqnyuijryy4241eir9s54f7q1ypcxcn2hatsqwkmdpms',
                flowComponent: 'n3nswe3voqiv1cnx8jodzoyviniriclgvk2u4gjmouksj8gpttt4ejlkeqrej6o6jdbir9v6aia9s8f43hktlo4abjnnsntobze7heix39dl5q7edwemyeeiylcxwca9rmk9wq3a9c8l4jema9mh99y0u3ergmla',
                flowInterfaceName: 'qqd7i5nm0nns6mzowzwjg00tqr06byqd09davw9g8lui5eyvaf9ara1k49r7o9s6my86pp04hdeqvxfvzch33hmrr9h90kwibndln0fcma3r3y1pj8llc3od06el7kdzexizlsprzvn7jo3ka7yu99ul6098pdey',
                flowInterfaceNamespace: '8rs8irik76dspl1hoj4q9yg2q4hid7cmdht0xgouxc1qvro8glo9zhlz5e0kx3o0v4gg56rzkfiyn4egtwql26e48y6lhe0kbbtn5m1absg2m9cudnmuu5x3mm2o5m4di1fyudcftqaucl8yvnxjtj210kdiii2k',
                version: '0dv8f8w37iupwpjgehiy',
                adapterType: '1i4s5q12rr08t2mk7zg15as93yik48hzpysvjbsuguojbunv1rrz2y4dmbex',
                direction: 'RECEIVER',
                transportProtocol: 'vwa25cildxv5afcvwavlzdiskakyymks8pszwgdjwh6xk2ahlult2h9x9pbb',
                messageProtocol: 'a8h9b8zjwgx3w61ltu5vbiruax8lu5b8ksotgsb77kgpjez08s3qfni60g2p',
                adapterEngineName: 'x9e4g0usywzljhyrmgcai8ltgjrdfmxf39c0keosrj3wqehmmp2w288jv6915f2i19w03yzyr69eodw4tjf2ykok1dq0axz444jzpu5emtyz7qm132gz5vl5r3azjuh7tetdqmhprnx5e3ctsdqvvr4l5gqw9kds',
                url: '7ocg6n9lsdtn2jp4iauopug0bqu7o9kd30fl5ffvf9hlyptz0ihk822438obfbhfor5hdoec6zie3v4d35oobbreyljunjamtyivqedeqcsbdlusa5nvgp23oq39qwbgfwuazaxzyrpm7l0uxgzkzrhal6fcmwc9luu4pvu5skver1gf9o8yllhviizfdc3dsrb70r5z3d46my6ogf3pjfybddye3sn02f2ec5gvsm5t98wj19fmr7kanazydytncw042wnhpdbrxv8z3xwa0080691d7jaq8r9dcghj4irntpw8h2sow4x2s7pkro9i',
                username: '8q11v6puudeepd7wbi7u2gxcr2m8k0dg4cu58csso2ex8e8r0t6n9ymj38on',
                remoteHost: '8xd4ndm2x9t3tmkafyvmliajrd1coeexszf3khqmk9sdkewhbxrkejomgpu5gmp4b17ym3y8k6y63o4ytrzlfgunmt9fc6yir7gwrc9m7oggdqrzkb3tsb4kbcxx96t6svcvf602rdsjcheb26yxbrg9aduhp19q',
                remotePort: 7716014113,
                directory: 'oigafb9tbxjh0tuqdznq1wrc2izossz42p7c73rr1voq8g10laoxlm4cac68px4tjyai7tck9vd2qxjzk4ksp0zaaczjh8i8a870g0pa3ll5bjrv1q5wcz6qu6wi5jhft7t7d7pgjxtot09zqvbdpnnbh61mvbqvd1sk5leazdf7ipxc5pik16zncbv59w8oy9noxuqkvtn10463b9hzd63mko6t5j6364sesgeee6dplonu6o5i01y53l2l8suliel1uuephlna6tzh39hpwna1gl6w2y5hmpezank4b7esikcnpdvhnq4i56mci0u3947vzu5zqna88iwmv55he33htiku48jiv373j8jl87ctsmwuxpcuzrpxg42m5chpv0qcs7i4vwlhhil7ugwlri9mnygrgcf335l3a4cg2l51bk3w5vj8t1xnb5ypfe0lxxmk2s9l02qo1lmz4zm17zooqqnru1ljkol2tuvio555x2355q47teo2l9i19yrr836y0dfbfsg1ir41amdo2avpra2ocy1lfiopk7loco67nntmlypd78axh1llibbuj2hwmg4dmxx4w7aufwogur3belyxkgbj51po2j74ofztamakrhz4oiph0gv4s32heddx6659nz4f9uueun4yi4iiximk7l2jixh5ddzq6e2s6rof0hd5thksvcgrvwjensiak5ysrc5rle6em9ibohkuacbm2haykmh59dge86pbnx0lnq4lm303l4hndujrmucmwreq2c8leq0trvquchu69tozs8h9hzw0gt6wdsizvxhf734pfaflo88lcoiv3u4ilb5ree1yic9kqt29uuvt48fmo3aaq4yko57tdsk5uxejtjxiay9xjvbi079glglpj13o6lljh6sbdn966ye77h22gxsg1qro838n2lse8wlelsmxp9huvrjx6syx0wi6z5dh7foar6gncru5ygu8xfd038r1bcnuys5l85g6l7ix4xvf77dc7e7iisxc',
                fileSchema: '8ulf4xmnewojy9u2k0k90vzyokwcw26femzh67jfbmuns4yi6payft7p3mceymetemzd4fo2r8dtqdrh53ao85g33glgakvc0hnkagkbibmakyunp8ci1g5w0olj3nr0zlr65pn4a65q53w277qj5i5696uhbh51mezr442zmb4nq78c1cka24j2zl303lew8mxlouosa1xzj83t3r1pmo4b2h7dxpo7u61y7m6ln6jizhjvyp25cgy4llwftdi60hd8q712xaxla97jn5zd5asf3dkxfrc7dvo17emlxrj7owkxihrgwjox0pywymnn8viqwo0njux7ujbdos5cfwwoa7znflmb129md7rjmsxoaq6ga9eri5wbbgah1msbl2pzq4wzvawo3xzyzdtvmlzabmsxczowjh9txd5q7vrskn9e3aya3wl4z0wptor6ekb2n9awfkbhqmo3ve7k2q6i3f4gmm8e5cx4rzoj09bhfmbxx41rllnezte44c0xiq7z1fhw0kz10m3emsl0d1z0s31q6kdlo8h13r5blsfz6jhwhzv8mkb15751oufk6zwsqmtahgmjriqy6fhusbq4pfm2gcvk7fx951rzwwi7esywrnga2nlcs7gcf4in2hp83tvd7z2tn7ios7y8cmnt0m1d0ao9ki3q5mp2xy5cv2s7em249sog4jlm5xc0kwiz0xk3o6inv3jchicoj8zospwf0oi370822x1mu4twerp9o3mii5esytw1geg1nsdkybwcdrkchk7japioiestetftsof9pcpuqi54w5pnqfpnz6u1en87zqjxl780zjq8ehxmflg8sz3p3emhe1l6zvdln5yt7u9an0f8stphwyj8rivmp0lfjqvub9su3onigafd8m20z1l8wra7q7vrjn96o4xryoiohrnkvxl9caer6mxg7r3m4z4lossbx7zgv5u98tz5bwx6u0hr2o0cq4ctxw0v21ea94g5g8id6mugo07tyfnoj4qngwaa',
                proxyHost: '4tlvlippum6mhmfy5fc4onafmcie97ianme2pex9o7btubbckmza0amifg6t',
                proxyPort: 5549627263,
                destination: 'v7zlp6yjiz6gkn0zutn4u5f6z0i0bp16o4c3a1lizaic41u86kl780fmvt6iahcbuov2hgdtp6rdhet6xsn2uemvk5mihpujb61qvl1vp3ub6tea830nlyicv1pz3ixkqxqtkdej8pk6bu9b57dic2rs1178481x',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q45mzmaebidiz5ubjn371t7t11h7c7pmrmke183lufhvc2jzt8xu22fi8z6asw0imxa6m17xfj6rzt9jiewuc8nbrori4w4imz7dsbmhbtzkm3djg3dta0yjzbyal6icb6zc1ogm0nfuc8ios36q8av49j5fpl9q',
                responsibleUserAccountName: '8f7t8h0ga7lz2v2rlcpl',
                lastChangeUserAccount: 'vazb0f430xqsabnqaf6f',
                lastChangedAt: '2020-08-04 03:58:35',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelFlowHash is not allowed, must be a length of 40`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'dd53linfvwcfmxrb7qsrwd6je61ldxqumr1hbnvx',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'f1su0q5ngxw451udb6k5mrhuuqvcxltn163wjwg2f7cfb0afht',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'sfisotbxriam0xo0qo7v',
                party: '567xr42dazobgibxyvdo27p45tygh7f1wfbf191sxi53dh2kn747xgcuv3h3fbtx5yfnot6op4hcz3h3qagoq4nacpt25ntabmw0uxag5ro8793e7dsam49h7552nox493bp1tcagnk5qelrlpr1t3qodu1pd9hw',
                component: 'vbv0ouqflccm8u2j6hudp2hovf9si856ygu274y5ro9tmynwryvej30tejq4d7jkl7qhmz18h75h4a3f6hvjb0vzlq77kkbs8sb7cpc2weqqeulx5f7v7oe4eba153yb0cgpvf4qyk8vk4ixmjn0dory1e1c50cm',
                name: 'lubtaxz8nlro60b8fdkwlk4dynu8xv59dzxyryypitysr9jflhbfzalm3ynmekfyagxiyxcqs0dmqiwfqnovsuu7ta8evo2q2hb69suas1o4fwpi958abwibyukf0a5xr8436kqj5jrwgqtlhm2vkikiqlf8v4kx',
                flowHash: '98a3l41pxoe7sx1uc6e3g8kps0ey8ue29a63cpoiv',
                flowParty: '48aa6vz9cls4ilrqyo8kyoobfpzuabqfy946kww5ewbs46ouhsgn3767pkte6x738yv7rpmea4e4fbo87d6ojo63ypizippyh3m7i54h2nd5uui33f2103i084436vd1qtcehm2dh2hpch5a4uq6kiaa9ln3c0qp',
                flowComponent: 'ut5levv5b1x2u7dnc9sq4vimhw2fhyrdjla2wm1ki0r0735sypn0xj1qk07yucigqoxctxbynyqaqx29peswp6s1o7skblcpxa5v1sm8zxpgyhhjbk0wvjdin248qs18lkmg0z5vkd0clmgc1eq4mofe6zvwnr6o',
                flowInterfaceName: '6685iqjub9zx77rq0e6780556or7voje1dmj9vi4p2jhgjxzis9g1eaj68elak1jewf9t9zcyu67coviyvvac9tnpmsdcrr0n7ybgmc6otxcuuzpwwreeskl5xmneondnbkhosgu83v0og1rljdfvf8qg4cinsr3',
                flowInterfaceNamespace: 'hg415ge6i4mowo5vjnw84mssb6fp5aymn1k1lbctblbg1xvrnxbfha1xaszguxezzlqqy323ty2eiq6blb8pmc4ur5fqzqlepv57bwlj3qlo8z52v2h190us5fm55y620kljr15w8lmatzcfpjpmyn1tzl2li2s6',
                version: 'p3or7x2o8zoq6z5kasab',
                adapterType: 'qna2qe12kvarv9fhh9nl6jsp0ahr8ib1j4r4ketn17fosu2z1fjq71h70g4z',
                direction: 'RECEIVER',
                transportProtocol: 'krmygs2uhm9f25j32gkbgomzvsgzgh07vus6cgcthmr8wte7hojafkvpapo5',
                messageProtocol: 'ydalf8bwnhtn8v8uonakeaa47bp1cj17s5veg695houyf60o0o0uxjsjbqwh',
                adapterEngineName: 'ys4u7p2j6itginde9px8y951x05p3z4nhe56byg6a1fx66dzqhb29xyc6rl9wz33vszofr7p85b3gyiixq5kzvsrp492ooa1w1z0djot9l2akb8z50x6aoh3an02dzx8xh0nbdkxexu4j0ic67zyqmiacyg2zctv',
                url: 'mhq94gi5ot6crboz713qlm5qxd04mg3aticzkr9p58yzmun20l3np50lxsccy14p1rxk2ionoptpf1f9991sfmk1z848bwyeb98no2y4ptb8oqlowpmjcovyhd5eqwblh02pf314ujifdvvpwz6xz5yf8w172piybz908435xpqhguypzu3gfdt27jz701c3qfji5uymu1gqm2m2jv6uajdr9ilopuxompuub887j6tckjnh3rf26dtvixrec0h80l3th0yivat93xhfsawqvrwsfbvsgwg3fx31jb578kq1fbzp88ixoz4m5emxwk26',
                username: 'uvye6bzj5nvdd2jb8yqoswiv7kv986e27ymu25vlohur6wkhesxxrb0tx8c1',
                remoteHost: 'er54nhj8vxf1un3drukzsrm3ad9u90jocrizgwg4uy9kfdf5p1o4agi66yejirdayr6o1l33fv3j1rs08dk8tvwgwsnlloa6yxqijelhie3v8xgk9gidlu5cln5zm1ikvhd4448sgjdtmp8zwc77v1ldv967knkp',
                remotePort: 6196759859,
                directory: 'pjm3ssixm1kx4npwhst6ny5wbz2vmbghhh4xxlu5y7uqj2nqzryh4d3mqmpwdeng6td7s27yeois0wupc8ajy09lryfcduhdbnsed0lo7ay43cnmykwesnanjznq93w949y0aftfyc8e2x38urrvao0558sfhs5r0nisytwzyhgs5iyk3p22tm36i0j3fzh33ucprgz6ey17e7babil1ebz0tutsbg6vt6xn7mcpgusnv3a1c0uehnjxkr4pgjpgfsbvos3srtlmy7wke21jvexsf5m311he9bqu12nb1yo30jf90lodc92sjq31eozg1v6boz8ca6co07r2wkc9v0g3fcq6kxtwqpgbeytjaeg7ireqesv27joewhbac9hsdom904vwa5t2be4akayss0bkesxm4kbzu4qmhizyf5icyzd91xunlxpee7qlc4ppg1z5tev84qlz95qa3mnt13808ho5zerdtfoqanrhs7sh2sxf3wdfmwmu6fl0je1m63q2xfwnju3jlc9j99611y82l1fq6zqjinjxvp855dq7bcyhq3j1dkhuw18v6mcte6ps5wx2dadiaods4p4p7eiifk24c6qs7r8tt1lwa9ejcau7cymj8hyuwg0rrzkb021uq1zcqienqtcqnf460eevyqb57bw9o32w2mnb2m7ou90phblwqon5h4dpmakjl9bd5knvt2okwu5sa4bzti9azr6b9sclimwukoygjhujlmo26blefijswx6h9eitnvehdsmuaf80mtyi1n8funjlccm9ef8h1sqyrxoi12km1qo258p4rs9zb0fqtbhzed5bclfo388xws9smmho3ixeacavpzknmxbzrn8k1adewpn6idsffotf98vzpkt7b2ba7h0k66rfbe88ktaa13wp6z4htm3j383c8whqyvx7x4jk8xhr3svrkv8sj8v9z73tmggaoi7pf116uww8dvzd7lk04hod5rkqbmq5uh80lvabpat8o08r4dtffm6j',
                fileSchema: '78uhx7cy2z2qi18y7y0yz1yv211zhqxd4u13i6x4wkquyoknwaotpy2gsz4iwbxiypxu3jnxjz35inyz6smwrqu5ovq68lkdtz7a0t2r97z6ragnyvcx2gmzdiiyybfk5raobdx7gvxgm1r2f1mk0jex0wlpyhapyhzxokrauoc0kjfw82c3m3zgif9vsco1j6mnqk2eznpf957xgj13ispgitvngrj31kd2ffg408o0px7kc05i1ymbchkhpr4m8x7pevfzqgid6hbhg1gzrntdbe3x9kezmc1e0fp9jqnaw5b05v9jb2feusbtdqmnde3bil7axx26l2l3vv3frmvl962ztjr5iu55csndusu347dqzpf1oy5c7q0z027mmjr4x03knc362rv75dwmpdf1780pqwm3qzb9mnao5ivk11ngsfml8pt18l940h3ur3zvapa6tytf7k6txvobmcnkwksrd8henadltookn6fdi104xrtcktn7lwl05zcavyz2yi5wlsbagzq4qx5w9o9n0fss63ww64w70arf0w55tenyaf5fmzzeg22oudvb5ebeh3c0ao1kkyn48ufmpd6p61bnebddb58cf764hf7fr52q3vh9ac16cv5ioe8ja8mjxuldmejgkejfjurxnlh98t2t5r3lvup93bfj2x9cd7vfcqnsz2riebug56aygb59g70ywov6fte1nix4pu8ew3aimkhaqmjtk1j6dqvfw3e9fzj04o4v3553gei24otkhg7v30ho3f7ie1vzhbyt2i6ors2djdndjufdjgr4141um1qzdanlx58bdix5ofjywesrg22jyl3qh0tjugiv3mzcmx0ffczspqsl4kjay3ky4br3h3ibosbzv91h8k3r81mav1d4qqdyoz6jbnttf0v5kig0fvxf8zz9pgsve8p1zwgh1c3ffae8zvg6a6lgwaurf0utb3gbnzujxvzrzmpx1k24ezpavw49keatkhll7e61pf69lp5odo62',
                proxyHost: 'addr8onkizqb673nd4bs81lnro50i346g715v43ludexcr38nh3p6lie8849',
                proxyPort: 9587184463,
                destination: 'p6pzd438afyrkn1z0kfx9at63dyxs4dl1m5lhikqfhyo1nc7bb746g8k7emwp60jwcn1rfw4oecohrt59ujznyiebscp804svuh1iacwmjyhnybujs9m1fcru5prfosjehggu0s3a5tf139jkz14wljor5aoc5kd',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '48whc20tack9a85h39jmm8qvewwb9gnee4hc0z3pnqr9fw9a1fbo6comujkh71pc0pi848kim9dzvg5re7jp79bn5xylwgm056c2chmurwnyycdhy0x2t1byxpfgbthsioxrjz6ia6m6tnz6nwsbcmt5iqrc72wa',
                responsibleUserAccountName: 'qns8pdnl5udhptgyjqrm',
                lastChangeUserAccount: '65zqrs6wr41znxrjg6cm',
                lastChangedAt: '2020-08-04 12:53:06',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelFlowHash is not allowed, must be a length of 40');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'jbvt9z6s2plgcrtn6547nedk6lpk86vybvshbvmd',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'c8jhv5cpfpwgib6owel5z76r6v33owear4562gcw941l6rnm24i',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'w3xc6jokbtkb0c5gl7ai',
                party: 'sll3t5zi22eygw9i5lpmmaiyag0ik91vf5udfkr86vsiv4wei537bprmdjqoiw7fsqpk7wsnfw0r20z58ipe13lhztc7xcc2e6k1zbvmbffczlxoos7mrprzebb6koux7nqtvnwyk7mphfeuvsmigeu70in4sv51',
                component: 'ljtucistamxqnmpmkk8esrz46vx2akwaf926o39sqw7hd9g974pd1dqnzqknxawqm43jricne8g0k7h22tgsii13mbjslvomw8zwny39zd9p3sffuftr5ko014u1dyp8q7u5rc41hrg1cmdeoyy5bnwgn09rbf2l',
                name: 'plcadpxbj43go4q7r5pd2w4ybm7ti6rhhv057cd39iogk6xgml7mrjhnjdeitjerzjtcjo2oxbwlxr7p9y5zgq2u6a50q50pl0qtla4ml0wv7b98hlcrzybzszvuiuazfa4q2ngs371ha1dxwhp3vulp4oy5kjs7',
                flowHash: 'ug8vseiy7fgdxqsvz5yp36vavjhv4bzlcd5r8kzg',
                flowParty: 'cnj4w3pzxwjfg0qqvmhdfltcsbasatewcbrwz6979lskeo8wogvpwdkn1t2pk6p6ocmudryvhxjnvbolcj56jj6ze4278xz6qv2cdl3gygyizht4tw8s95mjwh1qqxzqi934qg07p7gls4g871rudfwrsd9e4de9',
                flowComponent: 'vtg3afknghbzevx7j0rp1pltsdm23dwcmnt4k9el7gd1f4hd0tnhpc16titguog5r1n844jz9xglc4lqw6jb2doqg48k38x74lb33vpay7yyevc786a87w0nf6gvh9qfdqy8koza1smaetcu5ylo64xplea2xmth',
                flowInterfaceName: 'j3s281j1p9lts4mqyvb2jy9sx5rg0hb2q0tkkhit2bnk62kfizqv4uj6ia73heqn1mfi44tvg4xrqtebxtx1wqa961fvhvoas826vzyc914tu41fd89a2bypox6vl0hwjn415g58m2hiu8x18ta9sncph1w3cicp',
                flowInterfaceNamespace: '2228j4i23ujx87zc7h17ch2wxiyym315uffv3qsyrugl85zrwug24fhou6ewp4w3ri7jc5xio19zt7h72ozanvhhd1812nq9bsvsxgje6kfmz9chrfqv7m2y4vtew0ptlq4079uyzrq3m97wt9pki8mns79lt78h',
                version: '2fahzs4kjoc9y0cs3z8b',
                adapterType: '8at9tcwnu2r25vtmzdj781mgzxq8qw9w6ejdnpip94m7wlmay0ytvfoho8k8',
                direction: 'RECEIVER',
                transportProtocol: 't06wxloe60y379goiogrxo20yvgtmr2069iummlpol17wywt85g1u4d7j4rm',
                messageProtocol: 'a6y7ennk075n2vvfy55r2kscjmsjkqlld8xjg0x3kpkj9xeh14nd70ze5eh4',
                adapterEngineName: 'u01uqx0l3bm31w8wkz3kchojrcn48dvpmi7oa4z95g5n7s2w0lmwrughg8wx7zrfl8cpu5ezfzfajgch45rx9ov9jcnx610rd1a62fu4fupop36m12rymly0jiabl0f4pskmrae8ss57c0rc2o3mcrgefdlmu4of',
                url: 'y4znrb663qdimdb4wvmav9wlmdw2gkgcqklcql2eppkxwwz839q4d874m3d4mu2dnxcqogwqpyulvrmy3115co5gvaqhydplu3pbtka6r25zvfop0gmi9qvomzr1tkmiwgo19e47fx6e13o9xx9ec9ptspl1fhyot8be7bo7um5jaauiykq68q6yvcptucyycc62vzf4hco04bqi7pzg8kzkqaezh7k2ok46isx6nn7ju7k6zegsc6siky6o64isgcpnlsy88o14xylyaoxifghip0ay4z7en2ugl7ebnft34vk0dsm5jv31dycpglr8',
                username: 'v9u1nmg73znnsbwsulzsaj80ns9mwloe13q0t0on6syr7z68ufviwm83u104',
                remoteHost: '9eordah444wir0oiuuc670pf5d865o7rrda04d1z8hafdn6y2tg2r57oym65mcsl5xvfzfxk5jj6ne05oqkxdq8j7u3kk6f202ufw1tebufmrbg2l9m7uim4hdjfnynkk7bsv32wjca4a58yjis37epy2r9n7s56',
                remotePort: 2737407719,
                directory: 'feu4bisbghn9mebmgknhshs1s1o6vvr0ymw1mn0hcca7zh8ma7mcbk58odjb9ds33tvnx6me2ngf1o450n7ib0n3cdqsrty645s87i8xehlhd439hrfm7qq5uhqpvecy162z2pl0clmxqifiqzdj5pgkkk4afbu03r51ia0y1cmwd0m2m0dodeewuw6irgguu6g7gn51hhcfybpvtn8clgpke05dgg00m6rsi2cvs82gdr5zkmgps4vrz5oct5ov6lsmskpz2qquzbnry71uyzonnwkbdwkndikfxxdzeq9x8ugxinw4248rtus4ikoesbyw9kmy1dqrwce4f7f6wco1kqeyfcb7z8iqd8yxhnkh08kz60cf2ogrnchtgaeo2ez7cms9zh9byc2n7pxcx4otx56pmlp2a34d7bz7i95i053l20ulyfob1uqsg00mqq63lkfuk74lnzh6ey23n7g1s9ocbt4bhy4d2v6ec74q09nc7gfwcxeeizqmbpqxaf5xgx2kqzrtvua63tfrn7wbgtralfv2crx3732j8vgxjjfslvlohx88kouv62kvdd1g1j14pzl2ktkyhmnouhfwbe582097grpykoiku6fx3gicwzad4ehqc4d6ssidn5zzf1fgrdtaghb7xfqqtbmt1pxwbpwyqm4tux2rtj3ba4d2tw1ygayn0hubj0ob9x9wce10z8ku0xm6cidsylzyomzktkym818rji34xf7e6y81v901yc6fdk3wmz0pumu5e15mpnop89o5vyoroumjutpufq6rrvaathbltaayw1cwmn5ia05jkru20zlx9xljk49vkyotj0eo7yf3t2tqu2gfhd5xp4cioa6zdavtduxfjfemjyswhfu9nizax59494x5psyt6smoku61kxqq1qrlzvsa5gz0zt5viskxh8xr2kh7xsuxv0zh34ujtoqfcrvfy10gxn0m2zvb65580mdekdf0lufiue67slewhlarfpel4gqhg3wvjehj',
                fileSchema: 'esuv39m8o97eg79g4odtsvs3qb4fi4st1h9pmcrokdihlr7dlhxcc98yaa0xroj3d3u51jblnx8cem7i72hz1etzsxwziatm8yr96czbfuowfucw1bx29smlxs7s98jou4ad7x3r68gsci17olsnagsi4wv4xl5a8mrbjrsm5bycin32v5klxyi23s3zrjl0ir4xztlncx1qtd6csjthrkbhu2nkfanb0lqhbqbqebrrzvcqxdi1dwwtuj7jletfvffz9mwnnwfn6au1pg7xkk8avrnxn10zeck4owp08kq78ym0x3kooyfxqsxtqfshvdtuklstigh5uj3wej21ua910ky3yid895ziw90xq6hhe1wcluo1j2wbe5h3mwt1orveb9bj5jxgli24670js44smxpzz4h2a5vk2njej0ut3303dx9qgnut49kqnhk702rw271880inouxfszqm7pnt1zgc65tp3fok3qhfudd0wg49gkdrvsrv712uzvnrem9ls1glgsqgu44yrudexe10m5elsdyhffay3mgeqi7amp19geqx9ysst0hxh0mies2rqwnei7uev89pebc7yd7xriugvu9eanuj5tkrsz1ax0f4n36liho51blqtt756qgt845a6ih1qirkwzveogfk3knade2oygp5rympklv4kvjmtzbf1zn8tor5c4ccocglu82veeefkjja88cp3x96kbvx45qtxq5wzrr6j4s377bak2e68z4fxuylhzjn8otgtyf9fx2mbn5ro0rxtldiprwujdmswgzmbnv9sqzd2pnp2rw8iuis4q4ohpc43jx64cki57iv2a4p2zlnp5trqsc8pc8ujd7clzeoyond8j01rj07wag4bcymd940hebq2fe311nxkidtqywfudny6az4zwryntcd4t0hzugw9dd37laf9k00sex74hjohjobzve6i7jn3yhlhwzyao8jf4qt29yekvsb3w0p2tozd1bpp9lv5e3h2zrc0pz4',
                proxyHost: 'vsp1zqgnut8t11gmc07soyexpliayw8egf2efr61h1vgcv3lpv0xg4ytbmsa',
                proxyPort: 5782191014,
                destination: '045477j40kujqrxm9utnj2hpey0xizapfbrlezbkx86cnizjs835z6zvmlp4vznq9g4bk6mdm06n3xp94ohc4z5wa04j83xg0f41kbglrqdxbbvgmy1u7ukeiwz0mzcjn4qnfc2ii0yqxcmllk5m0drr9iqkiztt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dg4bkvm9ri241vaz4hgopwyan3citdf2esx0sh007027j9ewf55mlr09w7cmscfcdt7qylj9d7ljgdozp05gzlyqlu5epawuts93bkj4wdfohe72hahnpysawyaakgsj8jktn3eyh9wn1xls84anjltzog3u5fvv',
                responsibleUserAccountName: 'c8tilhmx3t4vbqo1f6rw',
                lastChangeUserAccount: 'pztyixfeht40thkbpyct',
                lastChangedAt: '2020-08-03 21:34:24',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'c0xcy69ccts9bbzjagxcbywgwezttomc1k8qsvyh',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'wsyg55izvrq9euxgwaexwucmd1hklds91woxx2pti2h00z4bdd',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'cksjqkq6p1q6x8mk1g71q',
                party: 'yvmsjvqcupc155yo47x890kokps3q3fsq9bzwn5lqch62wzepezdmst0vnakmlr31tuzctpzd8rgewx0ma4z2l2baxn25it56p2uf0lcl57kosyu1qcxbdx04yobvynme6oxv78mdv1psthn7zmxbsbqvigmtypa',
                component: '38sdhvq390p4r39s22fw01w7te2wlz5vb7so5evtv1ag3ii3mspajg6vvy98ykekdne4sqvksy8wyyi7s06cmwb5hpku0zbg75rtpsq0k7k4o7i9cpj41qvp4ecnal58n68fpvejc2cat41o79sxa4dd4gp4at9s',
                name: '0ka3b75ktf23vgnks7o849e5vf9vjcrtmpo9rsz8l9euhz9jroz78tb65ldpzt74cbdlioge1sfiv108bp5c9jctlrl72mg37a2eoh4zxx658of9v85ym5n4n7tvvpiop7uw2i1prevw7vgtyvln01j5jsxvm1gt',
                flowHash: 'iunirubo9v7x1ze5fgljqi7fxh6rkr382ymmlqgz',
                flowParty: 'slsdoq51ngoo2fsjisr85bofv5hj7819sz5cgzn2a1mf9xen993x051jbqagluqoltzfme2bekq9ikvouf0z0xetya80t306r49661ywuktb06ib9wpzmhjrtov4qbsep4kvt3ekkqk75dvvcikhza78jbyp68a4',
                flowComponent: 'xdrt066edjf6itmfyfdcoqqxe2ma948szha08ylxj3vjx3xruugx8pu7pnua41fgj6pw3auygu3njv5wracrsssv2df8zfh639d8q9v4n24wilif4qcvtnof3fqcfq3ed2c7t4t59zruwt55u0q6r94obxfqt29k',
                flowInterfaceName: '7ijpvp1gtcpbpny19eqflnbc0wil4anhjlmdyw6m8xrssiwhbe4ypvv46dtytk74kbjdz073e31tik2st99i17n4fwe7jz6fh3ynza2b08d3v3ab1aam72v36feutx7oba6vtts4sn90e77qfec2rx93b4u82k3d',
                flowInterfaceNamespace: 'lw4y39kb40764a4b13p2114oi1m4tw3ykfexlkjgdwd2f4zq48huxagb4490om97opp4n0jyxoiyztzvpjnfbpwf8j80c348z60z0j2ac0u8usu7y3alce79sb3o0z1y5f84ienmrylbznsgb27zpilt2p9q7qsu',
                version: 'qcl6prb3j19ce2gpzbou',
                adapterType: 'zffd19bc35rmz52axlarl7qvbq3rq4x6rlrv9ntsawg4wib7t517rhul11hf',
                direction: 'RECEIVER',
                transportProtocol: 'b67xmj9iqaofbkbvl9we2e14vxhwoig8wr65u1aq1dj42jjs02b1o62aflmg',
                messageProtocol: 'jxo7ddvwb6te1zsjcmho3uh6u6c9cu9fsths17lgqz7sitc201pqzvsq6ggu',
                adapterEngineName: 'zxco99dsjnf477vajgfewnkg336km1relwprc1y08jqa7hri26rrxtjjz72yqsu21k3p15due0x678yl6jxartwnqcadbusbsq8x4mny8ul7s76u59s04dp38gunh83mygtsy9rz1uezx1v6r4ztqyvqclilxf2c',
                url: 'r3o6bmpheputznc2yrotllwvpipxshjbpkpldqumwj6ilwbvqjpz2rio9mcyrsegfrv0e7vs3v1zqsifprp51zjtgtvpjtska0aoyc2tbqfvep9r7snniz46d032adab14ycjtzzp7vugqp5q8bre19ztvcotkhjho95x0a6cc9codupjg95wn6mppxtptcwcypwmfeceejjcvk3bdm1lsr2icsx91cc10zqrt6cng2b2jizwcuyd2ffhelnxupmcbpjvift57f5voel2d7133kksugi8bm4bgdoqbtgls9rg7528zdcbtvh3tgwu8og',
                username: 'zdwabx0zk5qdgqcp9ps8zn20bqprn3lxaavnssbnhmqn2v3x9e2g3xlq262e',
                remoteHost: 'zjt9fc8occm9shgk1vl9opqg5noch69nptcog6r8sjxahf9b94g3ebvy6e7hp47uhvv0fhogfpbimyhg8gjy88i31js9ztlwtx3nziey46aw38fokr2fp4wg2h2zafg9ym7cw84i4b4l8ht998u2l1nkgjlws0j8',
                remotePort: 5813853364,
                directory: '45mjs5bpoyed5ukuznbzhrwu9k3dkdqspmvrqn9lu329oj4kz8u9n3pl1payipm7cymvxx8ar9dylnyu2j9t1n3lqjvxocd25v4lxpp9vnbss46r4r7hc96e7is30gewcvpumugpkbuerigb87exxexjy6zlatw8v1ui957qdngmi9i28wvjfom6no2j0bkj4kvsntzprgvm919nqlas0cndkn77bl3r9bfs3cm1qwwykwn29ijodygdqdemjoqr7nstqk6w7vtbqbhsxcdvou8xozts2rjwd3m4bw6o1bm7mrob0edtu3xb5mja8g5b5atur6ewcfs2ufts7corer5pgu5yvjj5m1hvp90g3fpaczqirofs7mwxngeptxjfx12kh9uy8q1orj7r6nc5pid0m1fb6l8qbve065dp428rfy59ynasy3n8ss75eeh59791r9nh7ppvb89rqss2zw4ebw2qizvzi4mauk4puhqyjcj8yahzqfnuib0aw3d329o29tg772vcyzu5gitnbem2svz06l92okn7ostqdcva61n6180d8dedqsxbndvhyvv7edav29a7gbce948b5o9ci49255f3ypg6lbj7jvlyv599vkitqaoj25f6s4t8v6j7syry9s2gxiy8g9tdv2t3r00p3xxof0mex6gsu6njsav27kpmoir03wctooczlsgvclonszautrnh8egx101coueee7mfxveatoyngm65n5xbcmyegesmm8rrmlt8ghub0qt85m44p7x092bp7f0w79j0fkb3mmx6rqvejpqq1de04tqf61v6k5wss2essj2yo2pynu41di2bnz3x2awqgvioijey7tb7n48686vfd94j08rfypwyix3t9lbc6grzv7xfulhn0zq9gprmav8ykt1fpzsqt7ghwi57efwt9ufrq2d4dhn1ooodyz7ol8g2b4ncx5ab1gl7olts6pwxustqelyd2x2b0ed7h5otf246rfcxltyf3nqa2x8y',
                fileSchema: 'jnh0uqtvy7u3t5na31jnm31fbwywn03q9a3mwnmmwmjiolihuslfjkjnaqjwr800d7wla50y1agx53npn5p8dkn3e9hhlip3tfeg4z7uhqgad415fy9vapsl6smk4jif2u6v4jle962apahb9j7vlaxk1piwzxnv6v8klu4tbu6c73c2gtjleq8folnzcxgpwg5glkb81b0gv9r16r2qb5peej37f5iv1todhwrr8os9znjk62y5vivupbfwx1w7vnoydqetxvonpk7biq8pog35a0kkdl82siuhmgt81np5tqrcwkvqahtrksq250ndl0qzn9wyxc8pm014usmdj16iwyjjq1v3r801f0f2946d8y2ggvd8ijvixb6yk8d9jhkx608vr4h3w15t8v1tf3vd2cd0ljyai2jd642ry1xz9iwj0qbf1j1r4ero9x0b5agq8vsm4j62sbout9c6gfo4nrn2vvrkkegy5lbj8zbx9ro8jfj40uxx9os60vr1afe4njnpym1pyub02hh4r2v0rrc1cvd2qyt2dzd5v45xo867xmjje293cylqxgmez1r1qmy3ds9ikn65t3n59jpp30dg38do2u39prw2oxmbg6923sdom31eubcobay5r2lrkkxoe2ea5ejiiussvga5yhqa8h7c6d0uho1k04rtzlhq1n8vy76gf5mp9nygjjv1t49iv77y5preb87dmunsullcikyfhfkkkq8frsghkhe8p7btyua29vpr2xkv624dotc9ivnyk77yu6e9ylepkiokyaw16ulcj2leczsdrebu6gxuq0zshw5wvb989ayu4kagzp5oc1t2m3kasyk942q4qhl7vmjepk71qt550e7p5ilst285wbtvae22ze2gtvzgia5n8b034zk2wufoheyimhmbhfgowa0jla766r1o9vl7icgi045aau5s4mgn9hpq295qvochnwudu6muug7v1315od8r3fuggdfbnr1i1xaaazm0pb6t0uxw',
                proxyHost: '5ck1f4bs6ao5wxms5nq8bzwo8r00wrbwpagll332g8rwtoqmcn8f3jn7bl7a',
                proxyPort: 4738624301,
                destination: 'crkqo372siqu5ubut9a90sl6dknnegxurjxn971r3linctvrzloipftjsncxca4e3eyp5p8zwz6uqjqo78jfbfrnd9a4rjxc3y3fao1dsc57uj3gl9f413zxlv98son9fvwybaalbcpa2s5271a4737fsinjek8j',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hgjz0a02vdi0vi36e73ffcg20l17jx04gea9obcwxonj8zyjv9thy6lx2ee7lsutsbjmb3q7f56i9pl1ia8gaet5i4dtkhesvtnik8on0ux75q4dkm8ksi04okvtj4f71zea0x0xqkitgyuu9xkt0vjvlskmgykd',
                responsibleUserAccountName: 'nkqrot5zm6x2qx7tosww',
                lastChangeUserAccount: 'q22dty2avv3tk77xv3de',
                lastChangedAt: '2020-08-03 23:19:11',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '5b0ncvuc5x4mdba4lx0owt5lk91sdtl3xm6l8ky5',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'vfi0o7fuzxp952tq6zxh78g934sztaivb5arcn5vpjx875qpdn',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'mu9gzghxa5gj65sv0wuf',
                party: 't7ww5ulo76apm11duy5j02avujtlnvbvlx9f1cp803sk12ph9o2vgwye4jdd6sxwy1g2v64m2yhn8y3cvdmr5tae71m33l4s62ifkrr3geiussum8lnbols6jmwtpksvmeayiacz677yliwjtw5zrd6je0n6m2gw4',
                component: 'qpsfd103xx13yqhojca5n2a6pex1gbqjv2ucr9esteufauza7914gxiqzzr3pd79cafz4k3eosxs4htxgkykwy0v0wcgdsnke0ldirhfbkyzn1gvc4zoafbp60w6s57xfllnvzt9o2qo07k1arekkn4fza5xabwq',
                name: 'vyhievs3s2jue7254it0xbn46c91lkz8ze8lef3x1v8yfd2t6zolv7wrdx3j4vym1dg3uooiomm12wiffo8xpx4n96qu30zc94hhf17lgz03dl84pt77dcxes6hilrxoitrf1z23fhsj5k3m8bp7w7203xaywq1b',
                flowHash: '6bpbg8w8amzi9lnk7hujfbrmvt6ivfb8eshfrvjl',
                flowParty: 't8jqhcl4sp5px56helaij8wf4oafkqyxi1ppe2ik39ahn4atfk9wq5grvqj7ryanxoffj8smc8h5x3lxbu242i6pj6rd6ju5u76bwup9wbi2pfa9pqcw5nq657w54dwwpd61ggl104m12mxxwrcfhnhnkntzuac6',
                flowComponent: '7zclb47g0nj4vw4bz2n2tbx5xgzhz9m8wmepsb9b6z1wtnbrhrvqjggiakuwwl7d3owzd9nx8eypc6ayjrjaqii80fovkndpkphgv4psh07tf0xmk64096yrkyeotwdaf6syylhailg8fzj90o6mruja657soyoe',
                flowInterfaceName: 'jhbs1g85zyof9lrh3lf30evim2du5sp4ymivmwb9ycj24wuvvcui82gyd0bjwnthddse5hemfjb7pvjs3173bofvgk58156t6qvmbi9nmvwjnxao89wbayjeb9gk575fouis9hzrry38fyfgdf6l0kvsypazmuig',
                flowInterfaceNamespace: 'tsykz5l5esharhijkeinu1cmh9fw2uv4d8g3fsalmb9mynd5ouatp28w9u45np5my2aw8mokhz11tzh74g1p3lja0y2yyvvkbvdlfpdgcu86mj9d08r84d2an3wgjje8s33tldpmx86b0zmxl31o9mb1jrbf28g0',
                version: '69m46rj0gp5llddu0qdm',
                adapterType: 'bblvmr6lr6wknntmxgqqgcjrt7m4pnqwhek6proylhe4wcfwgmwlso3to9o5',
                direction: 'RECEIVER',
                transportProtocol: 'crig3benudur5u19syxti4fy0ixbhb495rip38spx7cvrtfuqhqtpslrd7z0',
                messageProtocol: 'luswwpbyg3x7t7urizwwchdb3mv1qqrhuubohpr7cq5lyjgmiwarogpi8hpx',
                adapterEngineName: 'at3lbn7z780hp8ntgsnsdrovdn199sotn7q33fe89ojyyyx9w63su0htt3je5fwx2qa2npyrnimophbflr5fh8sehlx4eiooxq7ryrnhqy3brx820478ms8mcc11jlnpbwol0qcmfdnnsf7t71j3y9u8g45xflr9',
                url: 'wcg5eh5zfp0q7l7uurk3b3x4wyhry4q9qwp7rtsmpltur551n6w3ywttt4nbtl74akffxsv8oiszkh04f1d3mot5ztdl9uvfqm0n1345mb61a2otl1mrrmv5arlko7xjgc6tzobbi19ujexnj41zhpxaomtjj7kbu0pcnprd71snruc0amdceigt8dwgdw1rxtvmrn5l14qq00lan8gxpl00yekaewyzyeppbcr65elrgj89zmqx7r9rvnq35lm3w554i8mo1kwsp65tg2f5sjl9rxqbzgx8pnbtjs1a4gu7ow5ura4ntwkovcozakwu',
                username: 'rows9nti09pomnkd9xor5sdbbonml6twj3mrkor6j5reond6cczd7sqxn4b4',
                remoteHost: 'ts545kgdxmxb5pgprhawa60zsldwkh6vn2b3wsrbr51lxk8ho65ykay27a69btb9a71yi6b2ykzfjz0vhie054xu8x8e4d4xpgiunmcac801ihddy3th8gdu33fuwqxhztk41l86jfjc593x6fiwk28t26eyvgh2',
                remotePort: 9661868673,
                directory: '7wodjsvojo3kreiqxielxo5g8qa6qy3qja30rk2a83mfsij6jq8cy6jno2aw7iauh3wgbgvg14govsguxxdelxbmvx0rmddksozfh78g69xwpcuomdfg0bn5lm7m726j8gfxvkos1ilsdfqy2f19oa4nqrvqmy7zpk25vki8jrvorvuvx2zbbtx6l4wnfykve96e0w57cdcuwpfc6llujibyo9bvxiq2r8pl4lajt2q1ewjwfh1wzytguwy0mejzevcptq9v68g4m8von27v7cyeli1gu62ll1izodhzzbuj75pzvo7trpiugdyv2ezbbziy873ch5452bh5o5255sjwsmri39mx0y5jrqbswhnzybir7gwmgfzwr3u542n4bhnrqiuzowls7t0mfme87lprc4784r8ng90qkw4wfr8t29broj8y85g03u850vcr9nbl9kmd6jgxmpahbev4s1prvkfimuwx2jwy0kz2v5benv5a14o9zwvz5v2ow0x4lu19k1o0bpfluvpz0kmzjjvav0axpf8ojtglmeynv2c4tnwn52hthulu3sv9xaf75qnm3qt5kcy7zx75of4d54d0baclzwqpro7au8bxstd9qei0re12a8ayf4os19984u0yjds4kw4511iol3n46gl8t4jv6361szwrjgw1tqlsv12a69ojmo54860d0d43b26yls65fphyup5kgw2utzgnlprxt10g79900j12nienzzgyfl01hgh9hucu55ftapggo809w8f0ncvtd531wogsfqrbou8toszzqvr9q6tq1slg0skr4zlbh1ssal5qpynh2hzcjqwgu7juwoh812p65uzdpphwqzysguaxgeubjx1tcsz2ldll07grgapbnhifayx46gosgcamzbf2s49wew75ppr1z9a0e34pp8wb429od6l4v9psuv6j63uzxn6pwjmkvye36cehjpbpkqgpwcmpexxkmeeczskd2c8163hg92ojheq89yjf1nne',
                fileSchema: 'wfv27ga39npl81m258zcs0lpw7r5tul54w79priuzi4vairfm3lvkz0jqpamteqrnwujhrh1l1km019j29yvgyk9y4zrvu7tosny5cj0bib31q5duc6a8m1j6uxj7yewpbz71q57001ekgytpu4f42y6u2hk6bs8wwaldlmw0nqabrw1q2qm5vbg97rkip4ezg9orgwfdvx7zz3k3eib236zlqm07gwanl6b8qrf2qdo26tzjis6u8o89v41wq18hmgcnq4pd6y74ibu7h50w65u8qr5lbzj51szi39hcs9usl08sch47zzzxhjgbq4xh4aj0ok935u2uj9abrlq6ge8g7n3sn3jnxkdikc31f1gj11vt4n3plfkx7h7owspm21px2a8fl6uxnqy5bepa852hjdj4kjenx4bqr671aiyol9c64ab9331sk1ewoz1ciz1m79pzkqh4dz1wcjjzppkxhxc8umhtaapynwpdlcdchf6dl34amswislqvhunyrpkz8307e8md9fwzmartg1mvob7zfcofjjyilgwglcai48jc33tib8h0ryawl5d1oztddy9pf4qagu38s9r87ts496avq7k395msj4df5mvpeb25ykbvbvoze81465q024y3w8tdu5lui8bn60okfnk4yxp7hp4rakbq3w3vsov5jyutjgjyvztv8r9cupsmrw3bhx777jc4cyk4sp7gg3szkakml41e8htvixb7yivx844ratb9n6nsbt9z5xit7hc0lt20t8myasx7h1e0g6inbrvqmw1tvvibv8mbyly42dwd65i7inji0c73pu25xw99yfuth4n7e5r2i5yaqij6nv0toj6iql9c8m1emto9o2lry02ksqgu9oj5nr409cg6j6wrmuxb4ob2yo1e0jssi6waclr7vhbder6huhi9wro8twkxwji972nuiabq2qrewygyzo6k731oivqvew90p9pmrkpyhabzkngi9maio2wk64sj95tgv8af40b',
                proxyHost: '45bnm2klrueaylwbayggka2on3stft926inc7f90sk4eu8wj6crflot1138u',
                proxyPort: 5813903035,
                destination: 'd7qkuqyd0e5mzkg3xebrw2b6f2l4gnn22luv8m4376ipr63dps15miq1pgaak3t80ijhruq193zcgcollca3ojikewnll0lizvhq90l1qxkub91bc3mhfjbvri55ujd7df8cfxiu43ka3p9zazf692qls54accdd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'efhed9yqytry78w102z9nqdmavlm6ij9lc0esj581utnelduf9v0puzezmwlb4cs9o9bdy356hghdx0j94of9zga04al374baunoaufutfwurh51b3k0ponwrt37f0ckw7sc8bd4vxxhzpqfu0hst3bhvth13s7a',
                responsibleUserAccountName: 'xdgyk1qdcfbxh0j381c4',
                lastChangeUserAccount: 'k38t9fnce7mom23xh1cb',
                lastChangedAt: '2020-08-04 11:37:10',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'g9d223xou2qmlo4yroqffsaodxtj5xurrcdd8jrh',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'grpjj9m1jg7u79zhdwny51hqfqou1qigg60s8o92nv28r0ygng',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'r6qfci4hhvtq6y3ydukf',
                party: '53n8stlgyoneumst4kde3ymbk6spqsn6sih8qm4u6bnz7xplpbh7hcl4zhozpc9ab5ki733b5m565bj9jlpyxhzhrzpmgff1xxu3bi4ew97yw2aqebyykxm5zr2mnkadagm6ggk0baq80u0ts09e5uduv2oaoix8',
                component: '79q8j0axuzzz0jhbgberhwnfdb8757silzo7jfp320ed7afbwzb518pg7rv3b2dr1szh5covcj8bnoexyud1kefdyf49q6mqorsy9pq9ln3yuhbp7tht5o4ijpkq1vianrqu7wghf0lnz8o3lquhhpwj0gqu7z3ak',
                name: '07xkmv794ecc8d4918uoso2x5vujvsrqucrl8ekv7etaut7habejtni7g5dm6n9l1ebi2ad0if2s7po1li75vr2t35e4ahn8no5ox91jd23e6t6mn1v9tfz0av04xdee5axf6lt2y989hkbybm2xdpdxrxky68hk',
                flowHash: 'cdaehktt8k8ceo4aunesp7oqlu2j2sbnquu05b7y',
                flowParty: 'gt8lz4cqbo0q7688cuujym69vqcsjbcx5rmx1n986smlxvezjw2e72fsrnscp9z3g7th2az41m5dh18sp5fs7a1as38f6gjejpcjl6u99udku9l9l6l7jcrh67u814gjir88yhsq85cq421s4twd09lcrs36xdac',
                flowComponent: '5pj83ol63ovpp05xth0g37j7mm5fdl5ytxtz8sjw2woot3dh2onl7l2r5t0vgh8us7k5fthte02ak00txw6ksv0mrgkz4554jg3rmnw60mccgcsajwtgclmt3a84z6h3yofql5yzz34gr21n6cs5k9y8rhn72dr6',
                flowInterfaceName: 'fobdzej0ycbk5alhaw9jj9edhn02p0d5u0u5o6dy6mhjgban0tfae44oppi46s8ksq1ykf8dvycz0uybu7b8jh42vnfrd38qkwyd6l89hzq6g54rtv2b9ln19nvfsk492oj706jcsxgi1v2xhqsh5zx6wh2v2tko',
                flowInterfaceNamespace: '2rgbk1nv5av2jju0ng7bs3ggpbu8xn4deookk8ecgo2txb13h51f12eiayt8cq3f6frjhqdbz5xjof9y94fxlwea85x5sulmcn4f4szjhkce143th2rszivepnqhxbewg18jq79iptsmwxil1h7eh45yw3hs4jtp',
                version: 'jjaak06yull7rfvipar4',
                adapterType: 'rdzqoq92ayssoekingo2uxuo9agc0p5nd80t8jqjug7g92att1apik8q378e',
                direction: 'RECEIVER',
                transportProtocol: '4shjo3zjx4c4zkckoifkvs17eli06gmm3f8i124ysbvi46em4xb5rg8flh85',
                messageProtocol: 'alyn79d4jdedjj7vc5hdb33s8eky8n2tmh7z7fhd2msa2h69l7otpyyjcb9h',
                adapterEngineName: '856jsap8ild9bp6jgt9yi69xu21k22b77hueuces14tnwi2htiqmb5ev59w4939wb1vk4oi8t60hofo1xam68pll8dcdql78gyev36t45nupd6w6515p51gj6bxhzf0vnoo86hqs69665nuuzvgu322l14djc1z3',
                url: 'qc2jphcbxclwzqodf9l009mcb2kr4j9vez86tw08d2pqwfpkmdebxj3impcp4py6gvt1u2hv3ass2lif669l8yx05pu6njigjhol9dsed94je903syoo6c79hvieg9wt3poskwxgbu4eeqjllhr3l9e3x2yy0ejc0zg11rkljow30jipx4a8c31s3pcokqgbjesk36lyvlapd6m5g49buxn2ity6nyljpd9h44966foxof4u03x5rnz6rwe1x2jyakyqfv44xc9j9wgvoi2d46syhklxkmxlbjy07sfcspo35sc8tha48ciqsfq1f30e',
                username: 'fo7zn4nfb1ke50ontf5xyzo04ba25t6gqicrkdhhjzgmdtzy9p79docaegh0',
                remoteHost: '99ujp1jeixi2w6om3p8mbpw178ly4jjbg71mayn6f0wppnj8h2zyukj3cawz4kge6r7ij3js6niachurrxfx9xas7gaiesbl5rfdvkgu681rp6doegsy7a916ivo24bmvdkd3h88d47zqoe8zge47m6efp3zrssy',
                remotePort: 4163100756,
                directory: 'v9xwk6yourdy0tut5cqzbt0dvlsr926rsayc47a71815oenzr8l7rypzs4octsadr2sfzi0one9amaayh494bcqk25ve3wvg0v7co9l857t1yy46f3w78dqof6iw5e68u2ebabostio36k1z0tk7mjw62za2ankfzmndvd9rcwnb05k20vygr5wlproobkodyp7u9r6ar3byeme2ppfzpfqco3jl0g02oj0v0et083mv01kitvepdnhsmcn1c53ktj1z29n5ygbascuqkgi6way2z2zys2wdpbkbek2jfi243hwk2pjud0k3y3jdnt3bhtsh0k7vdc6zxicf8hjmx9li8ai8cqsk66u25oz3fb9ctm98dse5eazlqcnh8jr41rwhpx7li6713z4xy152dg8t36vt6xnp2kcw0b7lnqoxy1iwgo9l248qxixxrl1igjnf37dpft126fv05wgz9ksftiwwabzy0vfb9o16ub94ddm71bbeyw0ff13y16o6397mo1ejk3j0i8oj5k8miw9scm2z2k09zqa3gsqdea1556pyzx7qq4tj2rgy7l9c3joym4f27hhbecyktxud5eurk2znt0o6p669wir9dlmaug6b3w5wc7izv1ykl03b8y387lnwld4dec1a486nk9ybe7v7jgf1yqfhil4p4lw7d20vai4md84njzh1t4fj4xli3biwgijtza0gn7j7a355wjc6muyblgw3yjksuru28zyxizn45su5j82uvqm9i3s16lpz0f74uzgj320ey76k58mlj85l4amct1iad7b7ejri21bfau44viqx6d5cc8ka7eo35j7bnbjgz8oy4gb1juedikmgkotgunuex1lmfr4oyxzu5448vpzqrpc5ry7a51wtmz6s0th82p12d928t9rt0umrze10jnsvl32c93r9g63ur1pgzy47jd9dftvxsoy1oh84e000xw3htng6ppcp5dj81o8r9rmyx5x829ac66bm6izh8oyx8p1j',
                fileSchema: 'oy70jpr83fqmn2gc9bb9civm9g31xwjx2oo30tp8ycktuh7qpfsl879kxno5yby9m5gix2ihozsajjos6y4z9sfdzl0qlgibosdk7v8cs4f322dx7xqinfmi4oregrw0ngi259oudrqnabpzyb3kb6icxwq5inb73szxd40596nq09cv3slgef1eog4kn38u33gaxc87fb61w65m41bx572eadptqcnlobqam35toh7f0pwbp6tg87z69j7a86ar9t8hsgtxznungvs5sajrgcigijipn0npgtf4eymw0olavpq66hmw9u8bt5p30lazpsgif3ddplvahwmrrr299ebytm511ibko43bmzaycwhcyvz0c7hstp1arkrkbp10hxavbvsghdani4nmmm58k4fpjpfabpzun5u8n36bd8vgd3m861pe47j9r0z966wz9kve0ua8tj63eu3tk536kmph9f0bo51fqy8j9jyk5rr4xfkke3u627pqiek6l6oucxgaiudl7xtiqv5eglh0yx8uvturiimh3kdjh4hhj71nogoz79wi02ys49w3w84xo6nlu1ckcv57w51iexi3ll1164nga63hwc7spgi3twkatlsiypxgcknowudjly3b1d0owsmfe4qxku4jeyeqbtj5qfpv0mnhsrdzwhbdf0ywys0dw4zelwbrj4p6x00kthrcfmeezdit43ca8zstpjsxt7e8xiivkqez6jru4adr0tntt7umy7sufn1cxqp9y4j83vcn55fjswqby96rqdeu1s4re1a9w6u8vms9zvk84trd09mauhjw83uwapr4a0pjvleo6c6dlx46rjxf760g9e3jjxoqvavrd4inmelz1n18ytgue9vadcubuxoefug6ycxd551nyqnuouqwr8dtkh82ci39zzh8akra0wwy5yqb9bpo4rmesvasj3kjo0fgron8rboqtww9euvh3e6zrim01tbdy48ttlksh1nbele21l1ig5xp2gxfxiov',
                proxyHost: 'ldxpsb69cuv247hdhehovhwzfwix3fzcwula56t8p4s4x0vz55ifyka69cqq',
                proxyPort: 9690905313,
                destination: 'xh4gj4pfqocpuvwhpqzwu0xguq5gv1dffz0e8sz2ve54gr9ptqemsmerd37396f8xhpqro4v90t6gtp6m811hogsgfvwyrslp8vtavtiuxzg9o3qnphtad4rsk5gi3lw86da6xnjdw7i2drbeyhfcm15vogrwk79',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'oojxfcxkn6m1dyex5k9p7rbi8szteoi28eszkud0gq2h1ok9ffcc08nnz9esqnyyzfiuzulglyo8glihrghwnmqga61vzst6s4717s5nm1o33esdc2r3khx80s3se2poyppryo32vkcni5ygt4hf411nsw6sn7px',
                responsibleUserAccountName: 'dstxgfts8qxq7i4asb7y',
                lastChangeUserAccount: 'r59927hvyl0599xfo2i0',
                lastChangedAt: '2020-08-04 09:53:40',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '40ehil9zqhvcp5nvdz8lmtzg76gxwqqwibd3i58f',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'dgl9b0ci82tk84ijhjx2lz1x7w53dzst6wjwuikv9b519hgspl',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '72hcvp4eb0qri6cm4tob',
                party: 'y8sy3ve4at44j55rbr99ajb4ke2u1pa4z3hg01ndjegss9hrzx6w1zus1m7f0vevj86j6d5g27ajmbo55x5pib2v52vm7agijx8aw9isp6uljn2xf3rgnjwal4cab3c7ur7rfbzagugkw7xo773r7n88tjh97fd7',
                component: '0pyjms1sq3fw72jp7zki42gim6q2i851049uwmx2qq9xlaw56gwfj4aitt7okohgvqont5gk7mle09b66fhg93fvjil7pkolzq78lk2oo5nyfifc6naqrmjwwtb8gygl8lmnm4f5f5rfilldqs2bxgpevqhhvapp',
                name: '6ujjemqtwz3rm7u9uzsphe0euwk8jknv8v4odgk3v26prgdbaiuuupz9hwaqzzdnfc3fcqyu98hfgjnou6m43oiubu1beq1qwl0egrjmq6cz47c2k3juegl2mhqoegzninv8fjef0w67xwy5qtpncplrtow6kqxf6',
                flowHash: 'f5de1lh81hb0vizfhe08eplc785nlgpb12ssb36w',
                flowParty: 'jnmrk20dhc30j6yzzm9lhncw09vovm76n65s0zjpnoccnqntisyrlrk9yvqlbbkkoalf0q9nuf21zcgncckcjjaqzvxth8cmr1rcsgey5ew84e5ofjcoz3ovsmcnicyw7biq3i7j3wuxs70vgmysqeywznrap4fc',
                flowComponent: 'sr06valk5vmbpb2jzi1a1yp35z419z4izwar1puq6lzmla0bourzwz5irurmiq283jeq534297avihu38quuq5d8pdnvgjpadggucx9wwdeqwmc72ojhze82uaytxnqq5t6dak03zjtwg5y8zvdlf8valwh0r7r8',
                flowInterfaceName: 'dzmpg9h4pswqb0pn10s73ulpxbg4wgiyuf0rvrabo028d4mpjakj9d2cterwfkmlk226g9w8x7g8sowy9c1w0kvj1hfovgard79jcwpvfpklysh0aq6ikxj67o7gf6wdqsvubqsuts32bdy8jkxqgteaklgocu4q',
                flowInterfaceNamespace: '8ysggv225niwwhf1igeqg9fzpprcx1c8thu0b12erchg4ap3z6zm677piiinw9vn3pvegpc2yo8elk3b2rxa802986tg5203wamqssn46u0420fezfmzvr9o0ni1cpybb6uezhx6f00hewwq5r1gjo4nc42noc2s',
                version: 'scparrecbhku0k9zel6y',
                adapterType: '4azxgv3tvgzp2288o9pgdur0qt15j7nmebh95uqos1h3o2bl26wddlbu8uq1',
                direction: 'RECEIVER',
                transportProtocol: 'mclab4urnqjszx3f39xga3h8b1s607fhigfcadm8gclgrty659dhlogfe58n',
                messageProtocol: '9gake1fvokagdm5klt82ga0kurg5dxa0kttdkq7bvu5vweeg4eudqxjah93l',
                adapterEngineName: '0ju6vuewrz0jd8f5wexpmh101hc7ouwf5kseswyk3retbupnx7dlp0ia1ya0jlchrfr5t0smzttxjp35jtdryrq3i1xy3m2p94qxjvvtt6d45c02mt325ze8w1mnz5nwpvbe8h85gnmcxgcluahmmm789teambea',
                url: 'mlravzejbpksry0wclq3jfc33vnlmjm9bmgleq4t9g299owzqkzoqefc49u6zvmfg53xailjlcog97wem4ml62kj236m2wolc777k0fct6bowobdp43tre4denibkhjlnzn2wvhd841h0ouh5u831yjdcsbfa0v3lmdsabv1rfr98vz87l6ph51bqi0ihx68mk7a6fndalgji5cb67n7qyqcz3oy35n3991kndryv85ythcao17n3nqif00vnrna345xr1d2usy6ceky2h1fhexx76jh7udlqu2e3od3rbapzb5085d85eciwqtsy5po',
                username: 'kl8k3bnql5yd9j96ogikxl93o9g7mvhggjnbdjeva6qpsc1vmrden9yek4l4',
                remoteHost: '1c3i5xhjvd3wxfh8ji0v1mnebta1sdbyyyqgpa5fdkmg26dabsta8bkidyol2n88lgr2y4wzfjy4138wrfu4z0j35mp5wfuv5r3v489u85u1ns4mg62bb4mm4q9f6xjhuq8xz6qsksjxm7hh3a04wr5jqmad7hmj',
                remotePort: 6222772729,
                directory: '2e0xj984yb79vzfjc54qboizxiccrjaiw35ei1m0nbde61sjpqyj75v6hpksjd0fghml0n4v5vvhbu2ksaa9moppjicg2whajlyyam90ecm70or31vuneo5055s2pvrc133efgx5637odi7c1pys9unrptc9cu3bvg4ungx30jd1f5d4pc3vqy7par2wwj6ar8ihvp8jues7v0uk199byps1snjsk65c94oqfdtfcftn0k87m3lz20g3tvmyzes5ua1vv934q3absu8da443d34u8um47hqyjyqewrxpeulj4z5hhx63ujypkc0a4bgdztcfjiwpzctlsfm5d5qk2nyc2p5crdj013zlk1fd4pkwm5y3zeqpluvbokfd3p1a36a3iyri5g3vq0g40dzpzz3jerli1i9ntd20gazf07u21bz1dzgjtsynrjhoac0tvogbs1za7ln906p3miwhr8dheikrbecd0ekz5l0rh90pbgyliax6gwsgkmogh2ztsxsgok74bj4jym3ojucml48wf49e2rv6yxdcmdjrpmk8x8j11jla2hquyxd6plhkg16l3ggubq3w4lxii1g1r5ygis165lca8mo8lsk5itisf2wxclael52yux03fzqdtlfvsknohpwm5xnjvj82ujk1s4zyhlrq5djsrb4b291wifp5xbria73sgxrxu8te7tesourwnzgybkl7klodwd1m91cm8xoki97soo91s39n25ch8grej99nongwdzmn0lgla5y23chw9hopx34tf92fio06wjo7ukc6ymws6fg3wi8lumda18p07xv5orn0obp6byndbwj1zbyde05esicquu8hmg9q1vh7g7oys7b6uzsa5fbb0jrh9ykuicjcycye832guo4cl0ptixrs78erg5gdczrp518ahyghwvr1jcslt5a9l0v03c81429l41bdu327pnldcmet0ofghxt72fja2tbyqjmprymieibrhkmdjdazfdf1g3xvtcqq',
                fileSchema: '66p5dktnh71al86gd691i2zv4g8fsqt1osv5kjfb5sfjwu602rtyic6lzz8c7pixajbohgneqg3ehidp54fb1ksm5mo3aokraw9gjhxeae64yu6xttvjmaucj7f1zi8i1nrralc8dvmsco26ovuyvx0620fb6nr1sea1txjshd6f1j7g8p24x01ul9sl39wdwhr1zeli2jaxwsqrvboqmcibxq7u8v1mdkvpe8m7c2d37k1qyymbgfxpb8tde8y2ch1bwypwn8y53mz6qgess1eg0l4cpquwyu7euipzqbtm1nklh52mrk8ucfapftpsq9uu0j4crv46csxdx6bg727m71mh8dnunoifz2ekg96emnilkf1n5pmm4rnsaf6tuwhhlwckere1nonf5gzvx9kgrklwn60w19lqquor009z3mnvnu2konc8j60n9tw7po28pqsrcw1t9kozdj5hrj59hrwq54h3vfufmn2g2nr64qnjslisqju3n3i4g8mj9ihepsvi0bm89lzyoo115c7k6dgwf979rtakaitzrqwvnzh0e72y97ofnnqhnxsri3ltzw7q3wo59jflnkodrm4ujvicxoq4hwhd7ndvepf0ma4bjdunr92kz1e79y7ukjdhe2y07x4dnzcqty8glg20n1avid6zjt8pxonwl9azlpuxt5jk9nti9fz4tej24i0v9bhheeqvrqr2j8nt8hgoxiup2b3ssl7imujc4bt3gkupbsf51c5uurmmrowlkuxxmpoadgdqgqkt620hml32sg4ejhl55p7t5slvx8ew280yr6x64mw6u3cv51xwcr3x7bix50c54dxrrn6jjq7nch2lt9p267uta82qmcveq0kqbtinq978vm56oqydlvyaelo7y5j12s66b30umq9vyke0lg1f911gtwlrpg60i4wadseagbwnuhzfxl0lyz9iqe9ng65fglmlir9elwc0rjd0moc9sdxd66nphzwno0bf2rn8ipcrm39twglg',
                proxyHost: 'y637s9fyhsuh4fjy73sbmrqx3800s74nma5u88kw816hrr9ff1lxdvzx3plo',
                proxyPort: 3585213485,
                destination: 'ixznkwf2x2ypyu5wcj4ys80gfacpeng7mc17x29qjs8z1vpj65t8p9qudcd3b8serfdbiyu1msgutttlnmgz2owitmc6b3fqixxeqhcl6zrj1dxir6ppr16cb4vt0jdaphtooeadwcignyyu3bqampjzt26r0xsk',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'g1i6l7holws4qzx6owx530ym44gipl6tr6mmibwg25hthea3ua4vgeib0xc3nc252cltyg3g8w8xb22mmf7v6nunck9pev2qkqiwkggh27u1crxana8n3eb5v79pj9rf2mu733v0m5z2ngvov4cg9mvy61glywfi',
                responsibleUserAccountName: '55om5hkxyr5he3pyodnm',
                lastChangeUserAccount: 'm6p0ljch6j38y8wcpjnu',
                lastChangedAt: '2020-08-03 22:58:18',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'jfz9iwa0m12xd6xe3h0bev2xyfqm8nv2ddv3hvhf',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '8539qhtkr6jhy9q4y3pi086mbwynb7h8dypwniaamygxifq058',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '0e8oznqfbmw2fqr6rsbm',
                party: 'arvw5whdx8epo21wei2l72al6kutp3ntdi8h2g1xuev3mq8ox6ih8g0bi7sj1z17bjr7jma5gxjuh4jda8q3hg6qsyymqbl2xfg37tfjw7q0or5k5t3u96jr3wy7qy43w9dj7btu5mdp5tbmubx14am77fh6hm5u',
                component: 'ev55wndmk6aimje740haybgxawf4dcfbho14l0fzt605yoc3go0r764qlyfi6lvmzi42yjzviqas90vivyk3hwq8a1lw9jk2mhrr386jlg7wkbcxuwp1b7z3ilzqwihr7ancml9tobpo86jai0gobnzm0y9tcmpy',
                name: 'sv000s11y5l2s7rjofjzcz85knsaxz4rq0nq1c9utl7brtyqedeo0ybdppeu6hk4ruaik36nv49tqqmkof761mgsrps0r2kr5ns2k1b8t1u8024b85v72boxdmm03dh38leeyv94kuv8jwazg08963f5mhvbftr6',
                flowHash: 'd614iuaclzpsyyfmvbf44a1dxyvom9ozzdv8hxgh',
                flowParty: 'rfzkfldz5cwxowu9a261dm6a8a3px3sb9mbfxrka9psfkxvpabuy0iu0a7zl969fvus5tnnt9d9pk48i9ot6cyoiwtx2vqvw1jv6mevr1eysbmltk5nktyodf0zmcrttghvochn7wpg3idg8te5om4bc2ktvbkqnq',
                flowComponent: 'd3wrihxfr1bm1u9t2zgqii1xgyjm4nt1k0nympn33zkny05fulwidalgiljnb8ac899ez0de6nfmuq9ws7fhsets61bhp4pz88xd6mi9iu76djngyle7o5xf7zd7vuvkrmlyec6rrwk9nqg3pant01h45oj14cgl',
                flowInterfaceName: 'q0gmfr222175q0n39a69yrb8npa1qxhlcpr0t64bx5qxx9xaw4svqhlb8pnluku14evzyc3g5dgz6em7o3giixz2ngtk5cnb12g04xxz6z3aoafw0a11yrjsyqa0hw0xeqwt4ikaof0yu475135glodberrhfpfi',
                flowInterfaceNamespace: 'df2ijj4rfml1ilo238zgelthtmtgemls6qs847q6rnrtpqp1mzmcjwmdd6zwvpqz2q7hm0sjr0xe8ymhieprjme4dwvfouse3sbo73lpc8nh6ah2nhb9dw6djiqngxs79pux3jbjuz30818e7avt8fypcffj4s5s',
                version: 'lbrizcyo666nooi7apv3',
                adapterType: 'daz8bs0xbhot7ew1eo0co9y0il1wg7iik5qghyqq67gxnx93l14icgtjilwl',
                direction: 'RECEIVER',
                transportProtocol: 'bga7ykjtuy99jqos9d8y9dn37shlaluo7c857jfw6jafoqlkb6usn5dic4nd',
                messageProtocol: 'yqpw5s5xusa2s7cxn20z5a1xnw7170ieq55bi0owp4k35u4l2awlx3pl0d9p',
                adapterEngineName: 'r6k26wkf93nqx6hkj779afy5szf2blh6kkemvs13c1gp0c1qi48kyn025mmbda0q7tul5stnskdlvzld2ayp6u9oc37efu8qth5yw8hk1epjjq2fsmq4xqi3jw5rn0jq6xg7a0wnkrmlj8omine07xdwd9x8vza3',
                url: '8y06yz1aclswtfadwh5j31dssvhz617qp08vb10y5evhg0z6xtk68igfxvkz1z8869dv6l2ai88zzw39g9aiguy2t4vbocql600h35drxyjjie55l6227ywyyn3lw44mr4jwcuikvm9z5gedqiu91lvoo88uxyi4hg9h6fw9t9ew9tbx68dpu8zg8fnos9yzqgb606h6g894vpmv5vxqn4i9yu8skc07dibfr0kv717qfwkiqxf8n4jrmisoowzwev38r3it4oecpdr499xbwrkyx8cw6239nses2ik35sdjf1rd2d8kytdqdly3oppo',
                username: '02khoiolj9n0c96r92u2oktesac9mal410h2lxtxeb4aitqiltj00gjfg53v',
                remoteHost: '5kii645j5rvqwc0weljsuls3fhnfrr9jcjg44vz7vhnfrps47jn91dq44j1h4y8dsyxm1of2khnmn02xzffholw86u2al9huf0jzvhfrkwq4fuve47m58x6p6nwlw2ogf4pm1xntxzkuehhzovmu2wn7mdvbrj89',
                remotePort: 8911531248,
                directory: 'a19jhdmaf0fsx8mkj093idnprp2v695eovewdyfzmn6q4l7xdq2t5jb9yc0i6vmxrx9j0a7jpg4ezyeobrlvvcl01ott9wr2jo197iixud2xny9v1b8v6md48sxlsp6iq9hy6nfifqp1z9wnswwtpf5ndisf1wxndnbxv2lbezcfm2titvipen5afn872rmcjdqrg982s6bn2twku6xoyeax68nii6wqn9avk0hbn3ukgwji8t3z5u0cnlvbe5538p102kbkxr6p7lfsxtm1vy5hr25ngydj7pkxtoqvelpipogclrwx98w5t9btas62hg42rnag1idgf1b7jtxunq60935jwqxpptffpyuupct60rmos2nvnrgk40xsv7z3skdjk0kk0xgiw4bi6sx60l4dfv9i3r8td63bwydbwmeibghjxitpxgrqc69mor2azbawbb3j6z1l1351a0k2jqmndav0v25d6ehhyjmoxeonp7hol23vz1eg489z6cv7v7j7biuk18oz9uyx55sa4e2v9xfmes53g6dompo83l5v22nbgyrelz9q4f8jsev13c4f96xi19brojd2p12g2snvcchxuhitnnabvuwf4ew3be3u2d9kiyqpeqsknep5qzvnlgin0fd5imzw6y6ba1qf7f1ik9sluyea04xsk8yddo3xt7p8luuvd6vuyikln541y8223zkazz57kyie0f9rz5z17660qargrsqyxtj8mrz74iyq4uch1j420afl3f6z96jrnjp96xjxdkfy90s3z48owj5fxx3bzt66j8j8249s3l4ooarfxyqehkwl3cfscye4o4ucxodi1tgj6e8l6kxvjefynkz293wgt6vmrtmh04scsmk6b2lsnthc84bx3hnkl9iwqft39g5f0qh5dw9jta2kez39m3tfh40to89p7shsifw5kv1quw5nqc1yncmguf8ev9b828dqlmi2127p4sf6sgctgksgjgqpabqaryywi4ehpss1m1i7',
                fileSchema: 'frriep3gkqqt51oxug1lkncy0g75pnpgo55lx8vhziihcove0agt9uuhvk376w6xwyiw1oso7o5zzxqikcpdst1lxm2sunrzltp6866sdmm19utysqj1p4y7unzidzgpifu92quz2qv0vck4o3m96ejhf5o2kz7qpqs7j3c2mxg04cv4x2kkvruac6gvx2rzau9mj1vdoytiyt1u6oz3ae1jsr46sx8opuotq3j9fslbjmmy12j7ko495925303t4yeqzey3ygk0dllncvug2xpq6oz3pr3hthernj4i7j7pvpby55efcrqghd6v1ctwhk6zwxdfqc2sl7a3xsffnxfx88efkmvmi2jw08ws480n1p7lv2q3i3gyb6oxmxzrv8r69xstdvgdk6eu86mwawkl59by7wrcpm2lmxd0unytzyrqie9t0l03fbtgoo2i6o5wqz1lw9mlemji3up1y2bx7ysussnhpjnhwo2kplxy7t0r6vhqdg4px1eds2niz29onq4jycwx7sadabmhys213o7cswil9sf7ipx8cqtpz43ui71mrl5c2ijfgubre3krle8izjkm2yk673ry693j3ci7z860tqrob83vnn0n1bf5efe2013ryl4u2zz33mx6eo3xlz2gf8fa5p1ihwa9c6i64vtfd5xbgjjfb1dtnswag7y584x6uz0x3tpbqgakhjzfe8dwy06m0why38tgq97pas6psvrsfbpqa853v64b6qljzgqgg14hl5acmmoor3knibvjxr8ys97m1ea2qy0s7qkerplkb3bbjo9w48m76b3vpbdyvz67i8zt8aprbxdvc9j1wwko0alhdipb7qcz09704jbd6rv459x2lx827rxycj7fdqkl6p0b8akkx9oh7c96d2blwzzvtzucm3cooa3g72d4lxa0c5ubazu1t73ecg8bcit0kmkj1qci74xvgeazt5jzc48h6y00aqr04b6a2t3g7v3def8cjj1z8qr26s1topz2wrob',
                proxyHost: 'hc9jv69xad5sbq6oqezt5wednu9fgn7jl3no4qncon0ef7rouvd9u0mdo7qa',
                proxyPort: 2227749221,
                destination: '26jpwinofauh94x5mnjzt4wnxbotlubr1ivsl4tl6y5num765r2dnw93rofs27i91rg6jvobnvfsle6xufnlsrc40ljjjnj1zgc9aw4nta6qjuq2x4534i9to0bqkrales2skjp8m5hjgwut6d8cfizh7h4vb5o2',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'lv4hkkvocdra2aieb7ptg35zshtn9cwnk55dsq3x5lx5b5z239xs83rlhn4mnovi09mx6xtbrhzxikuzblv2a1rgwm8iazex7qhox33v48ex5510lfc6n8jw7dpgvfeebxby57jps7g36wj22nko6f13c8hnzols',
                responsibleUserAccountName: 'z0gibjiijtooo0wmkrdl',
                lastChangeUserAccount: 'ry10czgrm91vqj7gc73x',
                lastChangedAt: '2020-08-04 05:28:24',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '0wb2rqt08k605t6w2hkzqa4g2d6d1f1g4926pgw0',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'oag47azmrxs0czb30us5jxihgzjx6w7of56xi3ri2ehuvj8p4z',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '814d9nce2yqydx2s1lhe',
                party: '0ajuvv9vljrzxotq8eotwvi3koggnafh9mrf7smcovm5z1o7hpi0mam1tzv2zztqqjm4i043vpgof8mnfejd7jwjvq840gdxwmayqnvam9lo6m97exmswdqwtj49ya9dkqypd0jdfkz90yb3jwgou9rbpsrpzfrv',
                component: 'xpj1a5zo21cwmk1v41x3g4a31zdrmbded7kmuasz6tzy6ys7xvlot66m4fiqf0c1hazgw8ob9lleru346zlrzyjd8wy6b34cxgqyw29wnwzn43hsyxtyumxfw93dv99vflqcgrkp3i9v8yjhy6tqvy0g7hkyqr7c',
                name: '4772m8c5bizysihsufcr784z9t5chd8edjazor52gyus7n69y7s7mex0ynf48xuqeci53a3e2vg2jgnci3vcpv6xuhqsx0og3ihw9f1nhho4ozob07g5jo4ltxby3b0abjfp3w5w8z9vzgezi8i1yae8ndk4ep3s',
                flowHash: '79kr1u914utgf730l798iktwhz51whg5rn3x2f7g',
                flowParty: 'zc21x3ephwqtp2znhoa2h0kc2ngfqerjx306go6vl8lgj8cle5b7msc6sldgqyfz1of0zmmuyufbo0j6eukqjreuukqn5dblfy7d67uedmhssc0b5dg0yv4xudio3m6spvps0hk3hc7c6zsbo2pawn2zp0a7agzv',
                flowComponent: 'pvvmtf9rcepoouu08ehil6g4o8unh0oth2q2ecyk14isontcvbakr5i5zgkd2csadzuv7o4ya99gnt84ob4qwone0hvvtaibl1sk6ns911lk3lpptjqeioa6z4b3l2k31mil2pyqz860z4ndv4xhlqktcq30p6h6t',
                flowInterfaceName: 'vxe7nvbwvm3lksfpurd45pafgn3f7gkvcmpg1l49jjf1bco3t7phvbc1pp0dshd8whcp48gaggokjzvy73phlufzw8moyhpeyl0b7xz4ti44k28mpzcqyrse8kjy5ixjtm180fy51fes8pmoikgdapwex66em39r',
                flowInterfaceNamespace: 'd1yxd5gq79c0zuzw4jes1tbayc0lmiyrfnlheoxsqe6q5n53psiqsf7xzmac1disicklbeievkcohiw42t6zvarfttvm5dju7kqbi5vvjo7km6h5hp9um5d5px8b93cu8uo3hctgj8lpuatbm2y91p64sem4p9s2',
                version: '7b22n3i81nfj2v8h2pst',
                adapterType: 'wot9uva0j9amm894p6s1ixyr4w2x9lun7f794e1nchozuke3xrovrhanuu6e',
                direction: 'RECEIVER',
                transportProtocol: 'crmteqxnfo7zcbup6uljlf3hp8lilz4gjhyg7oaxweeztyz0585rk4dqmoiu',
                messageProtocol: 'sf5dxggy42shweo5yrhcloymsyjgtcgbybqno0wg2lr6n58elbilqx4mk6sa',
                adapterEngineName: 'odf1vgmkm2o0o5giklvanpvq0my7v6scie18074w928akxnythcm8y22z37bzkwupqziehoac1e66fz4z4s47edpvumj5akvjstqu9ixlu7lq9i3qshu4riecq54sfeuk0kokcz5vdj6dgvv94aqrdyi1m0ec7md',
                url: 'qrlxxpq5fczfissx9yb8ab93i1kjkd9tm78audnxra2y2bawmzmqauehnmezokzsu96k14ipvh4aiw93i6x05d36nve4xckw5o4jk2ogd1tkwujitappub1w09jku46hagjlctj2ksp90wt9h1r78nwt784tu6qdduc70rqpfq4ue2mtryrttbj2t2pncjuhkf3ke93ayp066f4jlnqvjoy0rr6dlx71thnh0gbcnmgzfn0senrz8x119c5ae80tb24g9ljtyv91m16b6zesdjdi5wdyvy9apxzgb8tn54mxun2bqu70o4drwlygq740',
                username: 'ezn9q71ujisq7yr6mh2rce6c8sis3kfwslqjluswx8y7y7sjqio12tj4q60c',
                remoteHost: 'mgx7w2egxglj9kzbzwjgakx2048bmg7ljaizh29vmqs3dsucr707tkgn1z4nxr3v6v6xoh1gbbjzsqnyevravd4tpi99arwjcdpwy630cfafckx0xz24eyn00qk31dxl3ujem3eucagmepyq0ipm62i2ldgzo7jk',
                remotePort: 6091858983,
                directory: 'erek7dyv9x35kfz8ehp6ttxvby1okem84cn35j0kxdy2qu1e4jwap5upnaen5fwouc3uemrks5gdie1byhfiuurot137je0njd7fsx1hi0duag5tm4fvuc616kio1pudwr1bkpbdlccnbo8cwzq488yext7xrm37978xv7x8fe9hdqjw53su8txhbnd2fm6004pp7rid1l2f4frpktijv11ki74glfkl1qfk2hpwzpiaahddrbtf86pxpeowsg7rzhzko9p9s1efus7zucomy5vmbl8mwx6r25xlf4yxr5dfsemi21zn6q0o3kk4aj6blsl9s6j3d0qo3hkk0287d7f7dhbamni8by8rb9b7z1m5xd2rnjrz5tyx6i14c0zmyu857j2uzi9yb006awm9058j6hgdh8ei7y91291lymooalapv8t9mvwa62ectd7g00np69hjsb3tl7zlwkwl22bvnpk0mx57jerkxjs8zo7ns7ecrx442pklz2844khhkq7wqyqs5hl6j9i8a8kcpknhth4v81djmq7gogs3hd9dzi9ufacmyou700u5r6takng89rf8qccfxs2ilqg3g2nezjhhx7gop0oblv2i07k32ja0dqu08it494u4fkstze2r9x0zwj2ftxi9uqrwlnldxjx1ufjxw4jt307x0utob45cfjgkoel4bq4j86gdupm5t9apt3zlwhagpk8x7qv78d4naguxeyn2bzesyrvgd8lfphrucc8zxdx6cae5eavz5fy4e6e0wcpzvi3dxf49z2eh2lcua0l3yc8xhbxq1yljboqfhnc9fh74b8z02tiiepbkpjlthoac0tvrac4bwlo4uic9ncc38cffudzyzulxmu464jdhz6ghcql8m7sj0dvsokjf77kcdpvd5fqbfrnxj10r2j7wikc6p7vmz8fuejraki0cp0kuo4vvgj4qlqxy7qsbu98cdytpszk9c9cqnqq6xbduooqupp0k97bxfx0qnaqsr2fb6w72',
                fileSchema: 't5cgmd3anptuq38pmx20fb0wkfb500joh3g5ahfil6n919ko1ksgoykg14x2so4s6sgpfwtuqwpwca40yb3jsjlwp8g9v1u6mruy29my7yyetlugb2a4k1x1brcl26wbkco7x5ddbou0b3y9cff4du2c4dd6ppu2a4oehlb0p8u4ek6m4qphb8b5w95405z5zph17zqz8g08vz3e07cbzdwdg0ydoyqg8t8syn2l1ans13brd7rt7jb3wv1njeavnbu9rwb7wbm60dfqn3jwfmim86opzk2di0i22h1ezh072im0k7h4m0409itujiasfl8o99d9ur2dlwjm2rro5bhosrb460p4b84ie90er4os8svdon3so7cq7rmw15p9771yeb67xhugq20z3wklihchewhpdxfv0zukz5pb3nprqetu2zq1lagjrgh56flr3cto0zumxk0rpmsjav84zaetqk8kjzjs28jlv46yg78jqcbz3h18p1wf7q0kiwzgaya2ofi04pxup1t3lobg5wnzfrovuqr9hb0nqrlazftigfqx7gdt39evuvxxpopjz570sn97qhijh7gh4a46fsxxq455k8zgupfw74yxrgj6sc54ghq3icuk865abqqmxq1aj5ftwtz6i49z1v1l3z9jqderxqthw7tkk2v013cu8uuzeb25vfelvs8l6femd3d43sa0wtsgpz41ok3saogr98uyw6ytytsz72jv9wszpc81tnnqn2pykya9d2cc7jpui3jx4tbqrx7juj1fpddz5ua1j74rg8d1acagxw1ijsxdrbc162xerhz5runfevzf5kzt5q7rruh991kbdrakoqbnzfnzk5r3jd2x0fcrur710a644rhwchiu9hc7jvziabedwbqeexp16uo79liwasjrrafpt05mw7n6mgsu1vsjl3eiccqqnni6c51k0txpervlqudwwkewkykc0kadfpsveffjap19phwb5h7i23xdgc14tkl5tjwheovl',
                proxyHost: '5okod0qnz8sbp4is23vow33bjurb4jtcmgyehxheilorq98cprntw3qxrbp7',
                proxyPort: 6671005080,
                destination: 'yyr0dn9wuxfjqfbtewb7ejraixsqgk8u6jqr3pyb6q3zymj9fz5ktrt2omh5u8eg854mnn68dpi618n0s8u6mg5srfiwr3p7wquvr7ai9nmyj3xptfelg2s4hgzshi86lxllfzgnbif2epl9tyrq15bhwyjsplc1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '01bf4me3s6b8z1z2auqidcc2cwgzo6ha25gmhprxce2lg3f52mu932fhe1o850pxrckizkf2w8g9p9shjprdnq7f0opcfayr1p6crtmzz6hvpg3s5jmzp9rqclof1t9xtqvq33ahdud0w1sz9lfvtriytyf9yw7g',
                responsibleUserAccountName: 'iscjeluqr7gkg5cnijpr',
                lastChangeUserAccount: 'o2we72dkw5ip3iqzwyp2',
                lastChangedAt: '2020-08-03 15:56:06',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'avef0rahpxe6rdmrcjwdgyjdap0c0kvg1jrx23z1',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'poht10s9uwidmmzf5ssw2nvvri5fvvncm8i1o8oeang8tcbta7',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '8yd9nrry72t8z3uu63fr',
                party: '3xvh43np50bljea9phmnoteml38mv39m9wxru0t1f1p5c6i94jtlilv1zpp1vahq26prt2sba47m2d3j3vk4mio0n6s9wxkzgr957yjkgkbrw0yxauuqrnblcmsi37o0sj1chzfvpvrnfpu4g09ci968loo2pvas',
                component: 'dpymuuu9dsfm17tprbvm03ryjvvd5a3j4czvhiskvgrn9irgcdzai8j63ac14atqe23j7ysaryd1jdln4si36r4wznrhqrbnlvi6ghwotorciicfojfvv4udvhsdbf7f47atkdu5bsfd511dxws8yvsqrrui802f',
                name: '5473votonzhxr6tiz2emjc0zwlnxdy9uzs0nehm5n5t4yscqh9oqdim43lj83tl8wx6snb6n00hgwdndlhyc03ykvnc9dehraomuvxweul4qp2cpelwspyqxt2s2xnd656yjfcfsqzf470pyjg6lcqcwejy89ndl',
                flowHash: 'zrbajnr0zz90bo9sv9t129e8siut71wlsf3cxze3',
                flowParty: 't1mm6ex0zjonfcvkoso9uo8nu6ne1z2xl1rk603bz1naypmq78ayezk654z75ro060x33egsc9mrwuhfgsi9f0sqwjvmxnx273ctojc6pj2h4sw19jalk531zvdtpwxvygiircvcyvsvleqktt2g9i1ukcvsd41o',
                flowComponent: 'yb8bxdvpjfluc3f9cu8intp6hjmt5jw18y31dzj9cr6iiqfdaqx4xnym2lzel0xbe03y53a5qe5y8ogzzql3itrv62959gl088orgnlz9eu5mm7khxy9j0xpvzg0rrndgy5a3zgb4izs7dsu7u020kv5nqvhcn68',
                flowInterfaceName: 'wvfov0vydph1ttuzv1kg63dmr6459cy7rm27wma3zqj2rm6blhommnxezmt7gsvpzvpjt2mjsoxtvev7uo0lw8ih9yrenxzdh41seknpqjaa7wdb8upsfgm2trvdvi8qsptiiue5ckjxrpz8m66qe03l9rv4wrxbz',
                flowInterfaceNamespace: 'e6hfwd1rqmii5rq9gys1k6fepvx4yowqpjqij1a89ynjen3il3ekx29drtbp4lumsugvoyl2gk78nwxih39v1t0letphtrcqt2xcdynq4yc7z2sh0ki4y2r3pa81mnd6ke44r09ky3oefpcbfvshvjzh26k4clyw',
                version: 'vuexpftx4s16qdun9vnk',
                adapterType: 'podb7y04w0786zyyyi8tv6rbe2p6y6nqvzxa2mdmep24yyfz2r0y4el8kxqe',
                direction: 'SENDER',
                transportProtocol: '7afdkdh84nvqnlglladljwmdbzdb38mi62o4t5c1lqf0t70bgo03rxspxe1i',
                messageProtocol: 'a6ukprrgq0kmarte40wblmie7sgi0m30krs0lkgk2y4w5ls8kfvdlcl3ur8j',
                adapterEngineName: '0in0gotbv7aosbykzwax5sdaz5941llu95hm0d0y16ljwwxksjg4c85rq9knxuksyc67w9fn5muo2ass1r1gx4bsi8w4hq59doevqyh4o0apuitu72dp67osephnhohcax7pzswxo10xa6d7in7g50rokzz5nh4g',
                url: 'vojjemxje83z583jw5jt5v5mrtvokewjso8tzu0nohjpzoag6m0h1z7ns3zsc1utcvnihwmgcr8xubo5nl492kr3n1iuh89yo6rg9m6mq1zlz1yauw1cycfk97felgmz12ofrbpqd3ft8qfwpbzbh8nml1wri67pd9a5zg7bxehsfs3nwxcineznlwvqx4soa5qkbgdff6t94ieh8uvcrhb48zcl5zffvlxc94gtdb1toxajv4mexf592rkifk29dn7kqg4rqa48y2a4jmq6uy3rjicsqkof0nnmi5wht2dlww0x8ihls3igjkxqkqh1',
                username: 'r4gtj8op0tnzox1t9o9cms36tmlf9eve2bovmvoz71t422crk4756oo9vlq5',
                remoteHost: 'r0niptdy1p8r7yzcl5slamb0hbjzbwmnppnjr5dubm4gakmchmc2zpyxi75m4gun8ifh7xn70b3t01ctpyeuh456a8snwdvp08hfsuj51r6wxr8ctcmvr151jus0433ezrvfxxb70i5rivrige2g6v5xq7txx0g9',
                remotePort: 9569665552,
                directory: '457v7cdc7qz8b91hn51ne28othgf4wqh0aqga68j46g8y2bazqb9dgun656az9fqcmd7mhnc1i0gbx1pxys2si1p3f8oo3cbyk3vmw0dhullm5ocs1lc2lu9jtreikciq6dbcjje39di3zuvk15iy5ge96wtw2dh7wbs95ufr8bj4b871y77gy782tuxbznuq6lqn525n5p3hoscootc96a352ickpqrvinh5j2pf8ou4o0zn4hi6x7y6n4wdlaz824h66cf2p6mljxbae4sdbs44ta8dph74f75oq2c7zymwlxq18143cddq5mmenkqm0ugcwju9w3ib19ln6x67tm0p36dm13ig0l4xxyi577ou2pher6mc4qf2iohe1mqp5yuc4hq8ii8fefhtnbkctz5e6w6kylf0csc2ctcof8v2d73fywl4ui4fplqqu9j1stk7ahygimeit9uxif1c8hun6cxe1bsygtgj12w7xkm7g8w3y2394igid1ohciqyy2dixleg3jwb6uj86cjb67vakjwcfu7vjwz4mwc9u7vkwyvxnbwt17k84yhibjphegsj6zbi8rigr00yrk8j7bx983yyrcn9gjh5xy38asq286smq1zzi4d6mucdlkvwldtudvwo1m4mqhh0oizclt2r75b7exqgv4x50g4zhg1sqcmhqnxg9yjbqcs37cwy3f1yfj9zhblm7qjtmmnfgel1ba4br7rlb8cdsw1gct1i4aeppzunj2ium492w3aaqo63ykx689a4wlo9t6qq3mneakbivugkwypzslivvcr8oui3dw18f0eb3998yg3etmhbqg0ycf9i3yjzb102e0mgl48u4gyp2wbf515nt8yr13zyo7zovp00v1szd03r9aaklns1lujifjf3qvyjyix6u3xcjm67k32xnzn4vqty1ee2dlunifb4peoxhybbn4h7ljy58h29zt47q9b79fk5ljw72lo0yrdm9t52279qkbla9k3jv7mn2lysldc',
                fileSchema: 'v89ez1br6pf7nwc2nhc6ep7noccen1selimap1y0x9sszmsdiu77kkzjbk9fatjgr68w7bkpg4v4kze6tebfk0ze4pqp4q8imjrex67my6g3yvcbd7qtjolstnzc8gpcfx850mrfpoifl595s51xj1u0wz6xfd78qx7ks6tgzufv7ow35clt7oxbzvala8sgtjq3uughjqb4k2uqco467k6zx06kiayup3l7b015afvyx0obkso5yp2tcvf985i1vqmuox0ru7z2c9qg5ok84v4vitnii021c984dsggt21ofv2x3ddwidids87137wfxz7hlxirx95av3yc3scn0umsjv8qigy1se2vq2y75sstv29057ixyass468jff5tgq9fd6hjngw08onwo5qs7z2r3gbmhkevsnv3fupdsnudrbxl9wxehdwpk9tezjg3xkdo5oe20rmirwuvkq850psdwyf290b63nni1a4ew8w4umc3eqmmi7j32nzxm0m3y86gypk38h006jv2twhgchueu6f7fgy7uk2r8uuuyugf4ecg6sgfkpmwxot3izab6elvfn9knswzf7dmtr4kukeb2q6cz4ox185boi4t0lqkpj7nl0n8heh04wibm0o3bl3gtdz0nlt8in7ll0g68pz5nsjr8r0nyokuj2cvaagbe00x2p6oumt9q5l6781hu3p1o2b77t7b622oyen3llkex28qxf09zl7b657r3uikoe6d0cx21md89m60w5i7eiqehk1isyqb9kdo9lpguehb6dcn8o763f7pb4dhvamen1q730misw9bl0a5kseyj686k30rxvo5tzwrp86co6orauutz4ydsco25c75wy2dob665d9glxx81sg9llf4kjcmp79qzxxn300a26s5cqng1tgo3vrt2103t3w3sc0rl7wn6kmh2h61bu3ldeo00o7or90qoj3ufpt4zoig79ijyyg8r89ts3vir91ky60rulhyds1sfyjh82wjtkva',
                proxyHost: '8odw7bd4xbsg049gu2nmoqpdvrxcxcnk3e5cu20ozhng3zrx4fcqsv6fl221',
                proxyPort: 4974377266,
                destination: 'oqtri7kasv245tnoom5dqct1ovxrfwar4t0kxbyr547r1j9orqoicqm8xzs0hon1ffbemuloqgwrk5gdwg33g591hh31p3xkmfyqqea1ifiy3kqafebq8hw74rl2d8g9fiboafa5kk8ofswxxs5e932qy6vvrn9l',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hhq3ashw0z98quhhwqj89vce2k65pizmpaxypfun0x42zvc2moheztcnude42gxnvpd019vbli0rh2yn8nd8vgfy856aagon4xo7wf2817d0rswekog4sl0wzdv4wjlkvtf2bhqcq9een1bat4y9rfn3mrokjd0a',
                responsibleUserAccountName: 'jndihqaryvl2mtq08ite',
                lastChangeUserAccount: '5k4tenfipy4d0r19arva',
                lastChangedAt: '2020-08-04 08:21:10',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'az6aal7lrsm008mzzbzcfqwdktb64r252yzn8xmw',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '677fhirpone9ziauatih2lbk6m3c8sdcffp8n5v368kh6mr7c3',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '81z4dow54b7ld29oi739',
                party: 'e9xqd2jvgzgpca6xdc1yubvq551q3p50nbe7x1debnr0leikx5kkkc795uh5jumxopkuz7no6tjnzu3z57384iva5czxbijirxg6ew8ys3qrcs6ta2x0fwrid1vj6rat7npn3vkjx9o7d8bcrl4kl45hw1ylz0uc',
                component: '13e2ydtdtrl2w9ozvxhuo5fhajabekjiugd51b9vascas3meatbfv1bvy766ibb4w0mp0arzcj8kszymkszp3f719budaiyjutny2tgcy0h4bkgjummzfkwbfzajwspq8o7qglhabqizf4f39lstgwgyfoiqcyl0',
                name: 'qr5r2o95gp4ttvtz4bjlui7mi36he0in9cc3yv87y5ic2zymjnoy3xmyfxoxdutylr4rrkcv7us29kplclwttbpg2lg1rvvao71lot5nhy0p6mjxugm8ryodeoptb7avsim2qfj5d37f9miuhyfxdeb3op6xm6gl',
                flowHash: 'cbwegemdj63pi5h5blhn0qf2bbpgkf3xgf5stx18',
                flowParty: '6fr61cpkxbdw8y26ypf2lzkela3mu37uxcl78vewi9vrv6p25szby59n3994nqona4pzqe99bdqe5xht3by0be9xdathbtskjs323ht2m2d67q4k97q4h6y8kaboq06p27akbgp94z5mwc7cu168y4r9s6hhj11e',
                flowComponent: '7wh0ec832tmzx933p8t452kpjvi85vachei47ziiw1pll8wza5nf3m4zqo1mdzlg0mtmyovy23gabwdwa5of0jhuwvav2t4uv9pnmgm1dqauybguv2op384i3pffiiimdevxk0xbz6mep4x75v281ixaxoe0ip1c',
                flowInterfaceName: '7ldx0hl7s0n5ndwmjjpzqmobccvqq62wxl1kb5gpouw4dqiyy1pyrfhtyfkrzyhly5il31mnkwczcz9keog4tcwecm0rt98w4ree6nm64lumwrobx3v5nx5c09aul0uqcki11brlol8ije1profdyiud7lc2pm82',
                flowInterfaceNamespace: 'zojsposw73of9omrdq8s7t4obhboy5s4vwcexsi6os4cg4nfnwwlgqwpx9r7lrosdf086j0i7x1gfr0hs85bbq8v09dthsiqjvf93vfwfncjfn4x3r9tbb43mfkggokac7i8xjvidbcz3h8wq0t58v3jv2kwba4hd',
                version: 'uk9k270yoevzf4mk2o70',
                adapterType: 'o9sh1kwrr51yyryh72dxlcpiwjbqaj1cuitjfaqproonln29g17imticfqzy',
                direction: 'SENDER',
                transportProtocol: '56hyyyx3hff8ksgzc808wdhvvhlhnjcbugogx47t175f9wa6fhkkw49ba6v9',
                messageProtocol: 'abn821plrp9kc3245j7uglt3rm8vm8oacmtwepc2tro7zhb39grcj4r4233y',
                adapterEngineName: 'zgjsbw6v1k0naax6mg95huc2dmin3pprofo7y8awdig3bxpdz80196izi9v6z1gekbafvfiz6dldfj48s7zlju2sq71cutr2yua4q343harzpej793ejm47exgi4hbz5mdrqibpq9f4hdti32zvnrisgdf0dwirr',
                url: '3xaaihmknn3pkpukdbkctnovafeelofi1ullpq3e2yo00buuw5cd7a44xnum8vjivr9h0u8k099xzsk68dkndguu4kt0p3n3ym6ix7yuu7qp5obtdnnf6iz1mpzgbibiicovd39q2cfdy36bb5zj0vmm5vlw5yqy4fywieeyw5hs2udn13pny4fscmzzo7b4id8nfxbccq1d5ll4xd7e4fut0hyn2rcst9vxnk6e9b7mdrau24jytrkljdsmwzpt860noaoof7t4myz9p8ucdu941i2jarya6pg0jmtgohj3xvoitx7rnuyhnoqj3dp3',
                username: '9pc7jhjrk459cdvtvomj59jtaltlz6a8flb4adf5pr73zp2w7wehsm6jyfj5',
                remoteHost: 'wsdb9k3cg9jbeygmyo070n0ywlmu77htejl4qc4xfa1pcvhr41wqdpa81b2kcxmsbo9dcf98ta6bbg42d7f03dyxxmvw28xzwgvpzbmoyw273gytlzeb08wog3xtqvfrbn00rtazi2d5ex5vdmnknhcib0pgdao2',
                remotePort: 8385242706,
                directory: 'p5ehmc51gluvljbzh7dg8o9zx6xfwojk6tt7dp8lz4sjgzvhypzwc4cak9h4uavnhfytg1zjjgy3ftdveqdayi6fq4atbbp15acwz92obdjvky2kavts23hn3cvm3gjkqfbpmf3b116625auliaz1tqkler0tib6q3ddh8zw87ywk3ez1ik14rmcmwrpqa9x0agy18cenkjn85xirsd9xxxoih4zb9b6wrk62ccgimujobh3lbj3gkpf6pw0j4oua5ifnywmkct1aje6qkmncx42yaqa7xhtikm21ky7y7evvczhcup472yvsmrl4v4i9f9amwxwhi0ejqden84xhi02j4qedm74yawgm5w5qn0235bv7zdcbc0odishp8emdu0nh7kibsampeigeqxc0gkjvm5bb270143lonz5xgb6niri7hcy027uanul0m7naqpsng00d0w3ut86vfmapnjizhfwg92q5j1x5i1xrukhhbmqu3qez8i65carf39ed8yiez359t0bimwzr4sjtjwfu2b3hutq0l0ici99r1lrsk8fk5w0wyaq2giu9skg845iwubbhltua0odlla58c7ks6d6w3klqh0c2ly8sialsjimub7lduehngqedf3uobeurg949z1cc0uoe9vpelfayrvbtzhqlp2rtbyhn7d7dxqh3lqwh3eb15jbg38scegrxu8eelvyek2cs0tnr9rh5wicomm2jmukdfiztj7tjc56ibago36vfhjzzzuugagdcfzx7yvbl0breftbsr2j4a0bued1qu5r1s5vjv3usf6r2yeyhtxnpw98nijvitq3z0oupp6ut3vklj4oc1a2xvqg8wa5r6zv16ln6sldrjn1sjvpy2on0sumgtl4w234ob2ayn2y2d248njtr315w0syaxbgzio33mrqfw10bhxswdj5sjdqrd9dotlbfxpur3c67x4yq2gp7vms56rseb515gl2f1dvjug6d4dc5gi7fve87k68iqyjj53l',
                fileSchema: 'ei5xfvw8mrw3ga40o97u4za095ssml7ye7m7qgbbeyj3uali9vg4hbjloljg2girtvxx7scbj6xrbmruswjhc816tfcdbraemiphr6fq38b8xblw520den4x72t1q2b2gb3avyhh8iqo3brotv80r6mpv8vqn7qaonsu0kkgan4h1nm1i56o0i4nloz19thlns3l7p4bb2k5qiwew25ognkvz7eahxvwjd1b5pjvj58ljnv0iwp7kbh8i16qk206zb2pqkei06v4765y56j7csbrjt81xw13qj3ng2rczhc8weteyuvopcuik04olci080narffxutjzqr9hg3s6sujtq2223jgd27cr1ygxua7582zoafh1v635je7ksg8eavy6ya3lp4udwru0wzhn2g9f2w4vn02kfh6ujtghimnb27n8o5mfhhisrjyo16155b2jgoa73yct0pr5crrldnzkko1ionok42i1jwaqrjz8wwrce3rtk33q4jpy32o4dihh0vz1u2efxanc9b6k7t5501j9zttmcprra59hy1phwqxvx17roxoj1h2b1r3l7akk0dp8qhrxc2xa7mhz7txpeqpbp7qat1ecpowxd23zxv6k8iwd5ol92o9yywnrrrw81l3wyy7gvwwikclrve9amx77estfrr05w9oipz902r64e3jt9z1qlqwgfzm09v1vae6odrz8eeljhpqxcjl46ocp795lt98q1o0itwudvpb0f6a3gfs311okqcswbbg7xdtekuokyc8giw3ogyw78cp1qub7ib6m132dv8csjowyw1klev9jib4scm1jfqrdw7enutt49pk67xdpugc4x1e2aightq96kmwzxvrulk7w1n1co936prveqewhx9da344fgr7sh8vq4z8or450srr59upiu6v5pf36koc5uwjdcb5moiws8h1qlajylsj5pl9yig3xg0kr60o49fbc5a7ixoq2597t8vefkgsv38z9vmszeg4e7zsreqjj',
                proxyHost: '3hp756y873p3gc8kllikvrx58cam1415w60slrnmvsp00tt17zrbz7ck32ga',
                proxyPort: 6922265717,
                destination: 'ys0xxf3ruml8ht18h7g6558do8h3jx296fdp4e08w20gm0fj44qyge45i5c9vk909741flw2vcphbb39m9f0iz6f5q226elee8j25xjuoeetpft0kxg2m4ooneox4302wkf1m0dg2xpkaqswdvcpyeo7bk8bt95a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 's3jn3giylgnkps2eg8whirbecrbcfrc60s8sti38gm62ssstptti67967i0tf71i7qcixuynog2e1g45araucgmolkphkp98ozxzv682t6wf9the2s7uxhbi3nxrs4frq8q0071ifr5vtvvt4p8crikn0fxmiynv',
                responsibleUserAccountName: 'jbggv8pii55egk4afr97',
                lastChangeUserAccount: 'wcbd95kiv8cazvd23azz',
                lastChangedAt: '2020-08-03 16:15:39',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'i0mq4511lps8uua8tsvykwvtfnup1ezw81s5c1o3',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'r1jxn2gjyb32pzi0xh6b555pzh73wac4edn6v7qz50274o3mjs',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'o4jhvv7usjy42lvdehw1',
                party: 'h2pl59guenrponx93573pzozbyzl7yuaheve9hbbbkttsdy63chzuz839t9d13wdhfs9v9gne5gsuhm30mabvujcmkivc0ib8lf7aau6crotn2zbl3rgki1x3m9djdghhop0lz9xrory4uwokpom59xxe99rrh00',
                component: 'fm8m166gv6xe3xapy6o90o8r13v35rbuiwgloc51tmiiaj0y23gj5gmct44d6v01hepzrs0wfoospv74d7nja6t70okyhsr0vikavx13ibrq53h7koz7zaixxtpq6l008em4cufffelvm2zqmjn7yxtoyda1wzyk',
                name: 'zejufil6fq2kjn9ymhkr5samz2l23vb45u4rmd1kt66vtrsti08iaqawm50dlrmnmpyzlgwmji7dijaone1r71qv5x5xaaq1nu0hmcc7fucfjb3i34g5zz4c0he1tj73a5w96y8spin548vvz8z6tznse0qpkz7y',
                flowHash: '3tqoztcghe5mwbyp2fu2fz2n88in2u9hhlobsqsx',
                flowParty: '2j8gchsehjja9gtbi2a7shlqq5ssmoogl9g3hpmutwlx20zrtb7blosa1o5o548hvgcuu9bzhx2xzjyqay81xadm2xjbau60cl7djapo4ehcprwcd5ipurgj4xxluxc643fteyebycvpc7t7w0dmbf7c8o8dnn5h',
                flowComponent: 'e6twgx1jt1pi4cbceusmiar2v98bjm40h9kdq45a0x6f5hwb5x0kho64s61siet1zglb2w67vv1pgtoriv3waujpb6lk3l5u68tteqpu5gx3aftq7tdighxf24f3l8lqbpabuf0akfqc888ladkj5ctszsmhhqmn',
                flowInterfaceName: '23251s20ik0osqmkja6wp1uyj37xdlsueoe5p6t0c6zz8i12gw2pu8os7pukayhtlo18c4uh4krhjtyndmiy2fn6gcxqi8ch28v8pll7cbbh4fykgxmp8fnjucmxhr5m1ejyf1jhbg51rx5jsf75eoc1m26l88fd',
                flowInterfaceNamespace: '6swncdi9xleqf3jlnsc4jquqzgvgrwr4phlzh3ynl6qnt5xb957ywzlpsiu4t5h11jkxutompwm072cfzblfsao2o2zmtiwiafrip81uqehm2hl6isaz2bfj1si88gdnxev2mk0nsgpf33cl86kty8ri28idyxar',
                version: 'qpz0z1633yci9k4hdkhqa',
                adapterType: 'nvaawutf3j1p7er5s1foyhv41awmpd8v5ct1o9gi46it1r2l3trpo3cxw64o',
                direction: 'RECEIVER',
                transportProtocol: 'v9bpf2tk3xtfss9n5d8cre0hl4b237nxrv74l8sv06b4qepg7u7qcb8kei5b',
                messageProtocol: 'n5yqvuzoqhwavd9wcs2cyabbm6w6nskgq1x1b8tgcn6b2hdvakj99sfj55eo',
                adapterEngineName: 'dn9ebltukhdww3lkzuejnjg6jc2rkvvbt21l0up91qsnn1kcnsu3lvw7b9perofupqf714090iph9f4fubbanh7ki2c25umk22ti3z9wfq2mh2c7nl7rg4rdvd7kngvndmgl7xn075msf5jhgy53p3j1oh8s3eca',
                url: 'w93o1ggunchyid36ta5kpv46loklklwdovo90fsn5j9yzu3twl20l7yqz2u3w4zvqdang4lni7d9gahwbrap0z62lujy3xp6d6hifxlhsy3h8cmye9ef3m01c048xfrplt7fs5r2o0f8je8tzssnhkaujr3nx247qdfonteykptpo15e8lgqld1buogn6m8t75p59mhgamc3s8o813fqbjdz18a9g2x9a2rtoyppj3qprrayd63tsob305fbr0avj9isw1bb4os2uns3ht9xlvrfqgeh1fm6qee9n0fpmc55ryatsqzqmwmwlln18z0k',
                username: 'jhintqscb2zd56r60aggyyp0athqmc80cr5vi4qsvr7li0b2kjkjfrve2bvj',
                remoteHost: 'sms71kdo7fzjnrager43frqx412r79imvq1f54owtw67og6kbzxoy7gvfh9x3bkjwj1ezjte2ge8odk4hjo6s108pafcbn3ck25za3upzea2qni4z0eu18fdfycvb60dtmmojti6gurph1ip7xzfntnl9v13vh8m',
                remotePort: 2282581779,
                directory: '9kdhcgm5v3e4uu2n0qt45y9xl6zf9al2gtd8n9yqsdcydwf8uy3x6iqy5d4zc44ns9ono6mavdzximfdzeauofmhjtyuie3b8fl1cem95ve6lrtnjyvpsf7r8rtaxfttlx5mbt0doczl71zo6vlv3urcwr5tkobafysx0xorndc0ndh62qp7xv7928mpbouql5fsa92pmx6y8x8xdruie651m3ifpafeownynm2ifw6ceo9oo25fjwjcdl0vnxjrcg58vxusc26rnryzjupaprg3cmfuofupmec9jp7uu60lq5lmuppa6iphcsm9gdtobxppeak04ywitchhxkl94b130p86u7qmc6xlwed9jxvji2aerp8hutzdt6tww0isyverk98q7rx8vuvbq4e63u91quy52yc7fvapj8gxnba2d2q4zthzpsf5qnq0uw695a0ti9m8qfuq1ueuxyle7pgxp0e6468guynsce9e0tr7xw47zbm3jgbwcgavfl8chiqm489vcvv0s7v3s7om3xy2xjx92y4fv7eqd5a970jxb21c242dy00sg9d07cv754b1j19a45vt2l6hc9hnlz7vev2tkegvbv3sbs4sm1s88o0oodlvitng0l153b02b8uimz3tpvugra1ulsg0ciggxyzkjhrgtnfq2zabnpusr7luxt9i4uz0n6ue97cah72haq2zphrnvfuz352fvarl1clqtktjj1g4inf3gjnmdxjagwufaqk6kos1ijxja681t55kgmpj7wklpan7em2acwypdne59vbro1l9nkwcwdpi9gr2esj31vbm999tsscbi1n36j5eyhliye1sejfr81o462p3rnjzg53aihy8yszd5q8jyhqhdrgsknfq1gagzsreoqxqplgez0pvnfwnj93boyqu9ky8m027uzobsyppiszll737nl3do6dkffcr4vmm2okmu24i1bcix939zv3xnxieacd9sml2fpxipo2jtt3zlyzr6ma6n03r',
                fileSchema: '0xzzw1e2abxqe2qg5sdes4bys21m5c26cqodv9koqow6oxgbhfbxrt65b1oedousz6qq600xq444muk679iii1aa1qgzdioscrapkrjwauosv62chmm5mvt063c2ta9wlbx6yujxboykyp6k8ga6147v2kn509ktao5nl89cxayzqraz69uzja9vop66en5iopceg4ga8lcsaq3zcp7tbr30rtgb98p6u522y2hnm7vhbdh0s2ufuyil0qj3scgbvq3zidwt7e0233o8vjtn0sovdkj6uqni64yhvh6hbn0l55ge9ucg6qx1ybg8m37m029kqve7jqch99o7a5idblhol3c7d5641ykghnqocrqblqnnamg71elqwxoc514bgjeerw9bs04obycbnkhf8dehln7t9opmdf1ed8hsqxif1iiq6keip6nktkxg8lk372jygmilgmme7rh73ff5fpjrgg2bp6ufe43tzve5xgoka6wtbhfv212o7ctl1dbimv66p35qff5i7rl7v3om22x5nt091yk7u0qhi4rhigk6fau6fcdlrusbbp2a2ncs2vygei63pgaw3boscrowiu7jmanu3ufubafqqv2rcngqs3yurpb0ihyj48t0b3cy5g73d5gtq6s4l2zbej45163m17zauzcrnuyeittahxfs4yzkpvcw2eur74e161ccn4qd8cp3e6jv6ab3d7pantleen9ajymd9u6x01urjvm4sjjyhu5suidpps6r3m02euyq8pu2xkzhkz3183wgv4h248uo7l21yc7mrq4g8euqyng9ouut4knwkj8ry5401rq2t1jqpo2ivi8fvl2go32yqxv4d16nrpr2gapzdqydzcojizcopw93bzzhp4ydp16g61e8hqvzvxklkg150fnbe7ecx0g19en3ig6wxyo6ivj6tdjligetce4jeuao3ph9qpkyc99z6m0civ8geyeqpzt5b30qo1yxs5la1gbiaxemuegzsur2s89q1e6t',
                proxyHost: 'fne0fopt3zs66xz59064avqgadm6bmjm6ecjpb9a20awj8th8g68yx89ebh6',
                proxyPort: 6598100546,
                destination: 'fnflmqcd5bf8hp7lu7edgd8wz5z28ghfgta93yplx73gnuqrmhuig2c1h269wzposk0bdzqbxwq5t8b21h8umdic64u3zid6ozi04b9uwndqujd8kggm97kceh4a9e27c7tjvnwg8ejyh2yxzwfmbzple3e0sequ',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nvctpfcbrlia9vift462eahkrz11wrepwdjkbj05yfef6xcnfusjk4ljp9vznm34ms2787ribb49up17pj60duogq8knj97zh02sq2xq6sfjmpp2on0jko8h5jh3nd2p9w6wa8ou3n9kz5yuqximn0ofe47on3df',
                responsibleUserAccountName: '3gmi9hyfksas4g1hat5z',
                lastChangeUserAccount: 'yuvc8b9hbn0jdhdiic4k',
                lastChangedAt: '2020-08-03 21:47:25',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'x7l78bu1ka3chsikfm12zbdga2q8yi9osez5hmis',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'i61q9j1saicq3rd3872834e2axxugzw0qm57o76dmtoun4jvaz',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'onrgnfb8452s9h3b9qkx',
                party: 'jrbt50sq2w0d6kdqwdyfnt3dd300ajbpt4t4upf3eo3f37jakygh210vdaaqcp1utjr4vq7jd7onhiyp7ovilkwvu8fn2wfltxo0bgibxutmbvc9dtw174lck9xs07lix18m1d6xpkzbdx1xa1hrigx3zu80o8rp',
                component: '79kiuqa231g8qs7808a2aafkhkk9260a0sc13h875jgluyeci7p34byny3stwrhr8gvj2wtl4ynf191f2y5vn2v6vzwkm82qvh9ebs4ondjdl0hvlpn57uk40dt7i0o1a4vbzqw8c8xpxgzktjpdddh6hqp2h9jc',
                name: 'xsg05qj0fx2ms1d8817sth7nd5pdszsyes8azbbhospmlphezvbh0sulxvvo3jg49t1g8x2zg7lc5mu4gyb0t634qcdrv18yaajt8brz3wd30a3tzzsx0fbbmp1by0dkf8m5bswhbmtx0ctk11pp1nxdw25vzqn0',
                flowHash: 'qqu5j7znv99dpin66omltbq9yjl8uydmqiwv141b',
                flowParty: 'kd8h3q02rdfjrkkdee88svl7zgd0d224jqk9dcev6ovuar671s14h5y31e4jlh2ctmbfobov9kutncyf3h85tdyl4vn69ee2doh6bf2sav8hftwpp2mpra54l37cll1bxneizsvd8s55lzaygqxa044exfmp65u5',
                flowComponent: 'zawd65nl7h4p5frio1g8hapq8qt4us3mctl1ate735knv8yxez76atdaeqlneosimyblmd8s9s5yh72ha13qe1is1v90hz1jqbf8uufyzf4j9jw39pk41k8osbl2qx3vc2dtv4d72x1pququ8cdishtxfinqezeq',
                flowInterfaceName: 'dmdgpjgsxs2yckr838pukq9fxb5egus8zjb987y8ipwcy3np4pgbzsfam7gkdss0m3x9uzm52c8dnpw7uasnc7z6n2cjhxnlvel6wkdq23bhw7d0zduw8nxh1dupj0arofcmtfd9ea6rae7mpdvpdrrmn3eb5ut6',
                flowInterfaceNamespace: 'bmm89d67wp0tmm3w4gh57ib0zddnh52kufraeee836wpztdl7kux62u50e05lfzky8tl58hmvgsopflt4eudz2iu4c4mok3cr81te2o4jwpp1dnzsi72nqhmw8jpjqn8dw2g8eyovx3u53pck9mp8ldwo832e8r1',
                version: 'sa5vk1wlz7uqzb8ltmjp',
                adapterType: 'tdri1qyfzh8sefqbozix1npdznl5j1xpqcm1fsbon7ttsn53wano4bgu7qc1e',
                direction: 'SENDER',
                transportProtocol: 'amsmbhuok2eraq6f0qqbds66lptnjf0e2nnnbiw4mkme1erk52mn23jkk52a',
                messageProtocol: 'fsi8m0sfel79gyygsawyj2xckc5ccpfgrtcq6irniormsa2tp0mojxqne65f',
                adapterEngineName: 'hfc1szhoq8v5xc6smr1kby2usunx2z04vmqix8tuux9z8ket1s8oz5wfv2upwfr3czl0yok0np5br8px1y6ghg2ywbgyprglwdmcuoe9mmfpos93c1bh7ji5zouusjex6vqc0bhi7rigsjlb7w9iu1ppcllwb7ih',
                url: 'zcccp26o9fks88zcdg5c2d7o5cks95a6kre8c2t0n8shxxa0russuatl9gfymluimsxxbbc0488p1f41jsysk5gsrxomfylpljei4kafzdw7h4h6ngu14bf3g7x8h89mb0f3451fuhn5lpgm4m2ikp6dy0paox3xnl375jqv0rlc77vf5a9vq2sfolb45cd71zodwkxiu7bsbbrxrudfq88zy7vgfyc5n9ox8tmqmnvmmxedoacd8cr1xobndt5x8gx21ldlt7aa4mhundadre44o7c1a8jjwgjwsrqr8k3agvt1ovk1vpa50z3kom9i',
                username: 'eqr8nzhna121hohbamxtm4j53180cw3wbtwr6j7rb59wy9226a50qjq9b2pd',
                remoteHost: '67f6x9hrjkemz2lxep5n7dh2pwyuei8akcm94qmnb8n4m95frr23z8w1mkbpa410xuwv23bx4pi0kqgh7sdw24ngonvzrsm5cf1f0csk27vzgvdvwbd43a7l20dphsflihinux47x6olegxg4vt7n3dhf212cuk2',
                remotePort: 7049030879,
                directory: '64kg2l7y0rbt4tys4k50hxl2wprh52h0tkbsc7ilzse4qzhiaw7hndvt87uan2r42x6lucegjeyt8fnptx9qh7hi0h5w516f5f9bimfrmyhzv8epj657i76usyl7ospwhcqim6kg29o0i7fs33my1e5owxdfae56fb52bjjaneie7a258lepesbbubelra7srz3ntghss5qdjgu9snulcg21nctezb8n4cjyii64ufi265st9cqq1shroy9yg1cz1uay2bedk8qbs4279pazsnyqp9g1rtv9cqi0itdcbzgbqkh4xqdt3q7l2blo4m4re721peq8p771cwemtd8v1qzqyj4t8icyag1hvl6zi0qi38kxlpu9cwxrb2yi4xipo9kzol1lb6ck9ni80ux5q52ihnfj9z1lpz3d05j9pih3f0jud2ja1ck0hv0643bmqpkeb1ujhis4rj2fos5vjvmun2w7ivlbg9t9bkkwlsj5egbqbh5t0j5m5meozppddlwbosr76srwkieywdimu69uxaqyn4le1dib6bjx7kygyl13k3jjomw5o4sd45rm7m0v029sot1vevsn6vfgzgwtq08xasxwax179q0ks7hjy7tcj13qoiyq7wbngw6j4yuy4jrii6k7j9dzvw2eg5mbbtvmx41vroed6quhqdp7cjax4ffz42zf5lq13ykyccv0uouo4rhqryyl7g9d4bboh2ylg98i08u81kaowkgw6bq50kc3j00v17c0p0xocn4vftzqqonbe1kai0h5rjwoo8hs7qt023v2oy7sbv4nl2fblp9ujlxr3jrdzjqm2aodf0axa6xe8agdfw4w1durphfj9u4rdnbl6xqe90y4mgdk5dclqy2pudbnob7xaq54pk5mgenr5m4yb5ur6nshgjvvosjp7orie6w10tzdyytqi2fbf5rmmd36607gweayk75x3a2b0zo1n2n1qwvpw5zsvvujmt8s87q5uzpqlq357vyv06k4euj5777a',
                fileSchema: 'dn473i496j0iyh0h5o35jnv9an4q180m2eyivmrhq9i96tdv4vaxz1e1ae5gkdf26tbngjb7kagxfi4ogkubatqx0c2jrnf55fog4zky1j9mh8gz8tt8rjbfen50qpwsmzej5sk1xbtglnxq2dkyerxrjod5kcbrbodk74imrmx7ze94fhlos9sb3ep9ut625xrobuhzb76dutleveqnf40soa00nzlda8ww3zcjjzwabnwqdl3hus7jhl3wghvefhm296j6yh8yo3ywi0acd8m72jl3uzrjypfa37n9m3f17b8o0hyog6luh4db71h8jpot4py8za4cziubz6n69on0d9ixondncejx8dj0tcz06z06epyddvdqohdfantmunsnl8n1xkccij5go3msirdwwgr31i84pfk9klzm50fum35cb9qppk47xbf8351mhoknrqd0j9pl1mni654kv9qray7jr4v7inluhbma6w90kobu9xl7b0kc2wtmx1mtkpu75004t3bjtgqblxkz1e2wkoo7g84wmvyi9y9iukgp9ab4t90mp8gwmdj0f8m0y6e41j7elqrbkmtfwc2rki99usgsh0fom3hg8994aby5dd5s82magwqtzc0yq1so8j0327oybr1kp18ffkfj3l5razh7aq4ynmoaeekwiyz1p5x0to24bzy0n8vpnt9wm3d4ows50ib6d86gid3c3btudhzoigpc5ltpiyf7swcb65zr9tjzxnhfxs9hn9135rj1fqnrvga1nosssc5avno12bblr3y7jeywvy2m7ih5fsg0ndpha61tb5svtfdhgmmabh635avgt6vxupsutgmmj3hf7swrkkenvzuxb6ygjupgrma49f0ig75747vw8umq22eylyxlcsp0lryabtp2vi3h2kaiylwsxjlzvqipcc5sxayrtqzw1vxvizqeygichyrlidrfs4i3zfvpdduby2h9bqd2zvnz1vwozfnof0zrtm2uimk5plbj47cm',
                proxyHost: 'g0zvzvm4edsapsivwfb4cjec6am4jlhbbwlq42hc29q6wfyemwihh3coxlt8',
                proxyPort: 1104657150,
                destination: '3ljnryid588say2hp0zgybu8x2mlqkchcercw2acmg1w8lwkqf7iujw5mjq5d7pa3qhyrpg6t9s67289k3cum4kk4hm4v4zksgywuyx78rc9vzukwmibdz6djp02ab2ujoh7r70mr6e7iayywrl536xk332q2itw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'l538hhyserminu8td3tv8an0kjl30k2swgftq1vp4i20mh44teyf0g2hd1vg97t99cty5yng6nmglumqjy0yyomff63oqj3zjpn6mbmp6a65c0qd1mjph38ntwnyttfqlcglicak6nn61uujsz8be7fbj64pwfda',
                responsibleUserAccountName: 'chaarvx8zk3als8l2b32',
                lastChangeUserAccount: 'cmuwfp7il1lrr2i3rzqc',
                lastChangedAt: '2020-08-03 18:44:53',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '05zxve4bsnlfr867uhphn8ha8kirjylch1o0rej5',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'kgrmvm1uyr8515nk39mtptwm782br3au7owx9x3ngcagbrrtbo',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '6jgrx18fle14aw8xje0s',
                party: 'bmyvxayu2xfq17xg7wi8m160maabifa9ifkfui6quzpwutxxntilcnw0km41t10pkz3ej38xflulnjzxbr9qxaqjh7194u4j6x8splgzqllpoe3r1sqv3nosvw2eagqzaewbke6mutppmnm6xsdck5vkrh828j6c',
                component: 'lg8qin5d64sg7uy764fc3hyordmzhforvpxdtjurfkbfc22pocdsozc2mbaqp2dxwn8yuehmykeo2n5f9s17dwhuaflrgdcwx9s83yh68o0h7m2a26mmy4dvi7osdf4c27q8b15cae2kjs8i6rspvs61zfakig60',
                name: 'hegqwtfxak980r9hsagyzyq0f3zhquraqfqcfy4ur8zkt1r84mmbjjngb927lqvf01epus1vm1vomkm2fsfkvwihi4e488ik9fv9wwv3se5k0a68ne4se7qf0crpti0zkro3jy3yznsiodry5s1jd6vgufj1j9c0',
                flowHash: 'cbj94ggwap542ocx0s5coh6qpshucui67ygjpbpt',
                flowParty: 'iim58jekpslljko24yro7sdrcz11ckqbmskyivyu2brcffsr0y432x7y9u4vtc9m55miktgzqf2bcgi3hhhbyfwacw5buc7f9wimsdcoked6dygcfmlcsimx62j3cjnedb3si7dty37g6pjqa5prz0fki63lk7fw',
                flowComponent: 'unyzj1clt5votxjgmhv97opgzpjsm3fnfus6qv9t7v3k9pxee9ig8luou8lh97vcm574l5478puueyrz5n0tiqm1aphbsou8hdmwhc3cgg592bnfr9hyrivwxp058t23jrst9rbripz719ic79jnpyosfg3yu357',
                flowInterfaceName: 'mrsghcg9n6un42hv5o6lkjqxo27zrb9kad5k37f38qxvyz5bbdgnzzcc17mu52g8d5yop1s2ypwpws7rmwoim0temxr0rfj74qwt46m9qzbuhbo0uzwug0x21hckgtklwfe2v8ux0xbnavxs7583md38nkqz8ykl',
                flowInterfaceNamespace: 'eelbkvjy5rzwreg9ttnecrru4i9x8r17kgkopl0ii2c9uipv7km8u9rexe9w5cnwns46qqg4fcujsuqwk2wk1cabb7w13z039dji5dtdmukudoka3ci4mtdaub98xgu8o4thc603flljsjbt5s29b2ejztmoj8jv',
                version: 'at8mjx8eq4ja85wrekyu',
                adapterType: 'gcw75vlwnbfnsq01zjzxtqjzagn5grlm1lzlgl4fvz5g9v5maq47e49t1nnz',
                direction: 'SENDER',
                transportProtocol: 'k9c99cjhxzpkr61373u4gwxfxnujbg8nu5jpedmi0wqb23w3ialnpd53jv0si',
                messageProtocol: 'zek8fbefhq72pmli0s3n3ngzwayd35xb619t95tcsp67cbbrm8gm4riy2890',
                adapterEngineName: 'i1br2m5gmxpbgwhxo0gwzh3wm0a0l14yyar3hp1kbm226vqnblthus12hayvn83km8tltdn49bqd8s3l03qxsc80fh3dl6jipob3r834d5di4krd06e3y1amunkx7j5fsomlzqa4bqveobmhomcensozytiiridq',
                url: 'ofayw1ez3rm8i6ty1jaz3g12xp3jmkitrc3wotz5r9ufskvjq0pwplua498n1a53cu37y7zmzfbc48kcukx1cy4wbph5k5m3wkh0w4g2s6w27etwurb7ssxn9ebc0hwolrcqvkjxn3nmvyt2bslyz6nvvlv79qygc7pe161vyjvtpaxnl8vi8e6pkfja0gwy6eyxadlm275dzr7tlksbsoenimjeqmeemz7kq44da4bjpqp9magbccxhig8hr4y02eptio6brx9bkhqy44rhu5l7p82plupqd1ixgeavnjma91buocq1mx12aznr6dwz',
                username: '01snqgtyoszmsm9mpnvnwjy1dea1njw9h673lk5mhdbau205rl838tbyd9m3',
                remoteHost: 'kr6j4fzxy4049yn0i3giljnty22onh2i8w6bjf4ifoa9gazskt5p8uoim7iyj70hw2xrhl16prlpvvdiamqo845wy29vzyl1h5no1oc66hb1wfsuj13kuupn6yahsabuy8ieu9yzj344upqvvnafx83s3p1oyhhp',
                remotePort: 2722256431,
                directory: 'b41dgjkdxfaek9cvaa3u1r8d6wqmcfcac3yrlbfkri0nmbf483ub9ol9mwc7yx73ubw4q0e3wrd81rpm4kw7w4h3m2e9izbvlijo0pb30pcgq88zoivi4eqrsemdqe75e3chyolwwv7xl75mw0amnu8b6aci63byu3rr9rae2kocgzf1ej878crdrw9obmbd7oa6at1kvmimcaljbt9o2nhe1f0brd8kvvpshyn24foyxx51zttispiv4ofjm9c15gzzkhx58e6stej9w1ypo4mx5e36i3dag631wnzbqt49p525evw3qzotppyqh01xfzg0xvetoa7lxclkfs7xycflc5d6x5zq467d3zmydmqkwvifymy59jmbi7bgzbut3fal6arcepe7r1ueivajhnm1q8he3b5lbjblufzjul886rrtdq66csk0hypuewhz1y7rj5vmx7mbu6j7zpo5el6h8m24f6pdg0s3g3z0uf5hqvcuyibmfjkp2ci9e43mgrpj3x7ij5uu7x0538ad6sivvnayicslikwjzbi67l6ujtcdzltz11usb4gdv6tresyopv8zkaiwprvejt44nudb3qhki1cnv82essgyyjdtegn095y6138h61lzgtjzctu5g654smt1k2za6vauo5civ8cyvsanlsspphm6hwbzrwrw7n7d5ptrzdx61fok1qt62hta4kjoi4egejybtx4rd8c2wpco0qwqzgmuuqy7pgyg2bi7scm7jhgh7z2xtat29ffsiuferxl4zn72uivyumfzcnpdz3md67k6hd1udfoiuj2p6dj5p3kyis0wrgv2kfypkkott5mt1z07mb9dqsgpagx0acu7u4dn651e7ijzmfuw0vkasrk8eprwrsofrc60mdnluh7r6rdvfr3m48fawtcud1e363izg4b1ra0oe6hn5t6a6jz8r3l95x2wxhdzlii5jg7a5nst27fw6v458z3lkptc12wd2t7tqglyj885l1to4pn6d49t',
                fileSchema: 'yt5sudxengyuryno8jpb4zdc8s3s91voj4vsxkel9q41873tadf3jccnzpq3k6lgluqh40u78to1i8pge1xr4l7vpwtjacew9l4yufb1mu9s9s9m7arige0eqqvpvtnzrf5vvic50fwvvtdxk2eoidpx7kj8om97onwt0plobnxx5g5u13tybiuix8tsl4442o1blhmn3ox87hql1z3a34szu43p1bz5tqzaqrtjxu7tppf7cfhr4yb9gasgvwtrmfy0kqox58yja5rlhuuykqewvhto1uk5eyp0bhb9l6uz5st46umhhvx350ioh4hsgw9jevddy4nmd3he7hj9np3etargxlsuqxdyje9bwht6po2684jonotkhvfar4jcau4jpbzbv7ho9yk92ta4vfed194dh24aflaqwvlikl29hdgysr14zj0nhzo9i5d582nnk2rljexfolzbfh3vzv0lmi5lsgqqk6vrrlo4mzyu1ra7o5s4qyu1kjwtu3f98rba3v78jhfolqc910lm9wnvm0z657cdyz0u1lnmqolaclvrgfa9wy28gcc736kp7q7g2ot6dcb7zll5q5s832s5904jmmf7vtaabwl8bnus88lnfhk5vec2ivtw0ccim42hq051s03lrs2wh1mvs2hd23o1g4mbtga8dgm3w49zr4ai6991x7q6nwg8wpnfmpg29joe8fqh4bxx99n3lx5a2jpncbqelgyjbb40bkwgdplom5mrbxcs01e1bhs94rvs0q8u11nsxjmesolpcoac738t241d032sf22ktt3mfz8q9xt4lko40zqdncb0fvmsz25ahxrl47m01ih1x140tz847gb2bvt6yuunrrectfe4rhdsj6lk2gstmnjaq5p7hof6jko0rjkpfu2zcx9o1nk6osy8ewlrxz69m3g8vpk72i53g9pen8wbilt91ez7itiprii7kg3c3yvgd8hmucu7h1o9hxvmdnbn5blznunjswc3s7p899lfk2jc',
                proxyHost: 'qbdi3y4rrsc56ap6xdjf8za22ozhiuw3k7mq3mre5y6hnqbui717t0mcz0eo',
                proxyPort: 1826822284,
                destination: '5b2536gum58pn64vxvyaopgfemc01jb498kbo9m8k1kjrutnqsfkmkyvbbnb2vzuyv062cztgs2ldyl1v0q8ltb8oykktszkhl6xko2hnajgwh64q9c1xgr48zow00wp9q0lh9oecpkv1ynrude30bk17rm8w9b3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '06hlh6njq64gx4x9sq7ag533gggvqhzfe00as2rnmsofs5bvszwcsm4k7krmlucuzo0uz61z0sdu00n189uphhd859yj269hbokevg42bnq9edutpgy33ozabrc0iewc6y1van5tee92adqxaeoii8emk3erpng4',
                responsibleUserAccountName: 'umgotmlw14v3oz96nu1t',
                lastChangeUserAccount: 'qd25wyavpl69cc1xhc7f',
                lastChangedAt: '2020-08-03 21:21:47',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'j9bg428zoxwmjg30dc5d03ydurfzkuhozm134x60',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '2p8vh1xjwk3llcspe7qgiupro5m03ia1gvjpqtltlywfl23g8i',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'cxcj7ab4ovc2zx6ppxup',
                party: 'cnj57pm3hmncap6val6lufw1866l84t9uks3jdynyzcnwe8nwvau9beuwqkg5t6aja6qwpl905t37xm8z0e4txhck6amg49o4zxsxketn3bgr0hg5u7ctevz7uf3wvhn2306l9ddi9yasw4s1wma52u4ekao5zi6',
                component: '15zgaho6y0nvyekmknymuepcsyty0p5pq8xdvx3x6s62e1qc6og3lppmmt1wgb8x85nndrb7v77yz9oktkpew358qnq4yhqioo6x5myylggx1hjlnzpoq6euepal8oeehd2wiivg0w9fyvjwjdcqkdf8aqe5781x',
                name: 'or8uw5oktzn9satz4i79nwjmf1uylfmox9lm237fwbov9m4mnvru9ckpcw5kzy5l5l8t4g99ao7589awhbbedgsatejhool8fvufr4e7cg2vrpybltcgznxoa9n2g3alu4i9o1xzkaullhr4k7gheer8oqwurjcr',
                flowHash: '9wbxgm32mfpingcqikap0joedciyvtf3amjs2za3',
                flowParty: 'atkljx2uo6fiamsze2dxurr9cfb8z7vfsemtrhs7w9qv1rmggtvqxw1529u8kzvdzlynope6rx8xiazvoh1o5m21upg0ounvlfcdli78xlaj6jdyv79q3aus5plx9delxnq4ppkc5f20dfjsnecfi52epa0hoouw',
                flowComponent: 'q82d1r1lqtdwfi6bbrhgx407zvjnmfvg2cv19vtj0g45f5mbjlkvqi885w1l2n6bp6uemeons1ffzkzznkwdka4nb5ystaztbidqj5vt9m5cioc59k3xptpj4hwdcxs2q7j3xzy3paa6xucnsr8fapt6eqi4cy7a',
                flowInterfaceName: 'ui7x4zkqe1pxgoy170zec2uqcy0ufos81bhawa0rbveu00t4qktdz5k8pcxiomtg8ad18lkobfmijbnqr6do8f6ogos8n6pr9zf85ftzdioygbbasgdgtn0no9xy9rzn1f9qm760x9d0n8dvpkz8wjhhfgxq1ddg',
                flowInterfaceNamespace: 'dv06hq216z7y2jgt1wey8xnzk1tl46z39jltfl3meqv7jhbfir8p5hibt2mm4j7rk7xqr334lqe3iov3neiekihj7yugyusvria7nfdnx47zihdpqw4mazgkke7x020andvnbwkdzmbegmdux9cennmm7zj2kjyj',
                version: 'sajlm3qeun1si8946mqi',
                adapterType: 'xwj20g75yfpeuvlqkqb54w2ek6nmx17lr0gudv1475z209l4srgul1lu6rcn',
                direction: 'RECEIVER',
                transportProtocol: 'ks4c45hop9u5kpk5fgefe89dglk4jwnfnzmupqxzwkn69y6lv0pgogs6gkdr',
                messageProtocol: '1wmpg72i7k9w5skhwb0x57bap5xg7n9wkaahrnhg0d7cjcb8f8pky9lns0mit',
                adapterEngineName: 'o0i6d1uudefur3n9403tv4sq1cs39s5zy89ijhz5c8zqel3mlpc4h28mozt41bb86iawez376mkjz5plpfirry8tlyo8qw8y63x7at1fbtgml3jdwq2tgb4bwvuxu7dh9521r76ndvmlrjk5klfgbr3uxt94kvuf',
                url: 'lbcwvffkpyol06a1i3ie2e2reqoatyc4635almbvwobza0vcj9afm79yi12e0ca3nzw5ywg0a7lfgpptytno78ol3tir9grpcgxia8u56g3553z2fhkfn6lo3x2cxovl5abs14jh2z1w3a8wko2xf6u8f4cumvom6296ftbpimebmjum4ymlunlsnh3je7n9751vktakx2jwi6wxta0dwdms5dlvg0anvfyiy0p13c1pctahq2ty6ms0arpw3nb371lptjm5gtam0non6q2qzq91szjjeh79mot4qab3ta4sagn6pviyebldcfpl4821',
                username: 'umib7u4itiyniufapbt71o9ufjpu51azvcpf9b1sztxezliojgc0etin3iqd',
                remoteHost: 'al3ym77x2gnopkdb5iq2eqa0nlo6l1ocaxr3jop3z5hqwmuwssq55knfnytpebd2cthd9xy336ndsyotd2jaagz2ielwkkwisiwwd8pagf730akgkaw3qiu5qld4y7ywo5ftoioilx7mhmlllmcn153da9y9yeoa',
                remotePort: 9111880228,
                directory: 'mdyhb8lvqkv4msb2dmx37c8uumrnl5l0bm09ijwjb667enyn065ge8hk5g2nf1hlu9dg8vzwghl2uuhxue5gsrlkab15aj3g030osvywdtli5a685u4l0gq5y1jhp1csz8go0sc54qkmnrphqxhm0nr0kd1pi1ogpw88ik712gm527zgwvbr3t5qomprsfbr13kj6vwljp5shg7kzt7331chj9yog1d3zkwmgeryoa7ote6uxn1humwis2flfaxz6trk8iwxhut8kj6c3yhltp7g6sxzezoo6za1phrcon27kzjdsg3yxsrtyssa6qugpcili32rd5vanr0cphl5fpnbd9jyu6swhqfb8pijwnvhlejosl862pllwhdt7z4g5wjr4bqd3aj6vos2sd4zmjj2ucw3c608lg8d4ecv2hppk6203tchgr7ioej6vw0ac2vaxrc3k90wztcm9e0j5nnj8hfbjqfcm04dp2qv85npbbzq3yd4h4knymvfjy6ki82v7gzdeuqws51m1lke3vjot97yiuq03colkp2dppr6knzq9ljxxkzcfm81oh0qbtcmcu4loud1cl9s8429jiyjff82xry71q5w2kdo2ahe39mn4gfsuxougpvfsgr3h6t872nlntm9qtufs96w9n3m3fkqw7ym8azfu6g5m4osuog15q5kvaib38cdir5wdubq7midqdj54fmh9kixxdivbhdmr0egkzih6iag8n7zoxlouslb5w1h3sg2hqikndu3cpjlcey2kch663a1frkimpg5kvs7f1ix5dmy7knopbsjnmkoclkxmf0l0z6bgd83isvg215w3f37w1mqou2oxd0u7k7ygb5tfm7qncnr0tnrce6brrpmlbs3o82h04e3t6saq46jatlxundxeicl5u3m22ahbwu787onafo3rfefnqrpnmpcoys00t5ki9v2jhesgqyth3tzpq75grzkj0n3ph3e55jgegkk2vr9u5av8et78u3yf6f3cujz',
                fileSchema: 'drojjeqnf1xkcnyxhta6mtgjlug18529q7igi01zh3sq5sc826wlq9pozy8f7ks44brus5pqen7ewabs7l4wd3fxui31na1vgtw7t7er89bkuxritf6h7hfleobebyp2mbrn9ppkawsyxs3516qkqvhs0zaiyxcz1497tx7cpqchccyzqpx39g634w5oapwhqgphncwt0j9vuocxdm8d4b8soda1y9dvl5fihced67sx7ml5zievmnmzl6ml98m2fgppe576xvgvg8ovqckph8e1q65lio51eh5zosbyi8u6sjb2x1mzwaxmm8e237eequu4msvguyf5w9ok16miqbwkbuk9jbeiq94gvnbz7wpay98lv9nnghgkpfwatuxa1o1mt502p6uhnxb9unve2f0ngf2cmbj4fwxhvxfrbktqe31sqnujfmn8satam0el5dtowyq4o3ufkw1yucgb43edllib5tol43by0em7670vjl6prdnai3sv523bwe31yhmkfoticf7no4ki30p8t091hpcqikamrldyga4suchbjzl0ekh4mdccwzjxadbnl3f4po7mgd2vuz1sptzynvgyi83n6qh9s1h5qpa2y8y8l8hyfsqct6hhfmlkiw3ovm05hwxq8otgq3feqrn8umzkhrqdj2kku1i6ojo13nji0ubclrzgb9cwfkx0tdukkprwr3ulaqsyr1ccdlh0o3rifad08nfvu8w8az4o8gd8nnbav2p2x6ud8jjg4kuh3ez96mji7tu43s9xgub983ubuxyqln9gykldqkgknleizpfqtdi1d6c0piczonxap3cxzl1xgnx793hlhxg3p54jsme4km0to3vzhjmga6031xz39cjpid0arsmqspe4z6erutpuhj5fmr4sqg5ufqsirruefcl23h0r550phhopuw42djvpvp2vl5kskd0zkxkgfzh8ibzu6wn5bzf99angciwtybqybisuh9bcdo5kfirlnle49lpk2e6vacoa',
                proxyHost: '0t5391e0xccuc7t309yc9ybtwwh660qhy4urt94m3iu3qwgecil600z9xsn6',
                proxyPort: 5888511662,
                destination: 'ci8z9dkj23lynq7w89rc8n21tlj6uea23khjbywp18ti5bqtjvos4v1ejr7ealyiip31y6q6kydm661yqzrvml6uqt4316vo7s5lqouudxd1l54pffnmq8behhyf8hm5lq6i6mfpgkcvy83951h9lqm6rexwv0w0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ekwt8u216y7khnafjwi9vc81hkdgr95ip8qjpxp9h7vyirnqvnmq2jumx996ieq931at5llb1hwehvq2r7e8h15irmg4yuw5ry23luaz50601253pucxjtxqd0ev50nzinbfe0rwp2rwppqwfiacop8lf5n0xr2d',
                responsibleUserAccountName: 'w0ba33p8f8kdxrt8y09r',
                lastChangeUserAccount: 'catluvmjiatmwwgntm96',
                lastChangedAt: '2020-08-03 15:26:45',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'qsd5mz2hixjkq020xkvwhdd156eai9pz44ss9jtw',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'y2bcm1r7l72i6ggbd9pvw24asqvbtuo8vmqj6u5a250ppyzc0z',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '6l7xw8rbrjdyupntakaq',
                party: 'pwq5ffzjsv337z5lnf3se0p5xjk1894hwiug45f8h6nowicptt7kqvxzx9wa3e7k9diszig8wxhqdykej22h9s4hbtzoah3kqgqg97bb0cm814bwepz2w28hf9sw2eh4brlcz08yzv08m0bthmajx2g5n2pecr2c',
                component: 'mfawfvn9lwxliq0x4txwwdob8nm0uax6nx68vb34f8i2l7nmrobavzpr45tsfvzjfu8fs0yk5buiqsniic2m18ucal2i647t40bdg3hd42nrebbrk7nz9fh74vqdzrhbsx5oz3rzzdhz8wtakwwdnmx50qzvewg4',
                name: 'z5v1kh5z9mxwnnxwylqhwsn6jeanfvkmh7jlqf3iaalak2123757stfifa2vdwikey3ttgyxpxwuwyqm5s8xzkw6kcyyznizp3kxccn71r1vqxr298qbd58898y5qhet3y4opy3cgnwlz958fpim1pllayhk2m1p',
                flowHash: 'qkcp7en8ozosspngxgej1kjecv3d9pygrc68kz7w',
                flowParty: '1h4ssztnvj71agtrc93b345dygjqzb1k05gn9b4utd8fhw3wnr87vnemxx534nzo7ee7vgkysdbjs18q6b8bkrbx4kzcz2n22s80m94dafoxco89tl1jldbpyv6b2mdpd56nl07ajkfhnjhvpdn1gxjgm2siaqhg',
                flowComponent: 'a623ft89g3cpa6qwnkpgouy2eks15o3vg8zpg5dx1cibh91oa66jmfux8a86xrvdxvigywh4qh4tdbtyhwqr3i6po2ccgsb5yxx0v4x3w3eewfcf5lgn3ow9dma6dtlr34sat6ntcdfmgmq8f5zy39eh91lx832l',
                flowInterfaceName: 'd9zappkn6k058g5jfafbdwinj74r7ap2b1ocxv1vit7e4nt5mudray5vuku2euomdl68tbf4viin94avbafrr3878nimpqwhun30p1qig1jf7uwpoo48rhghg7ovqcvlvmnyjug9lzkvreet37msxcyqkla82lvt',
                flowInterfaceNamespace: 'q06qjy4vgha0fk3flcgn4cgv0n16t12o75nrk4ggrohogiswb2jwlx4c7ab0ov3pq38r1uct4sdxgg53l44e1yzgrngwzewpqfwffyqfoacgrjshlq3dl593h9kg8n2kr6s1h113o1079g23fv0wa63lz2gdmh4u',
                version: 'zk72b3uin2kldaq90mpq',
                adapterType: '7r0v0zywg6w4r8v81uj2tjjaslmfdqbnq7ssxioqrl48tqs5425ylxrxckxr',
                direction: 'RECEIVER',
                transportProtocol: 'b7m0qjulozu0gjvh1c5m2ccyoo2b7cbc6f1b23ptqenqcxbfx53qxzr06zeu',
                messageProtocol: '76uubzq2w1ksel5l8jl21fe3axs8oae8fr8kl2fd78o92f3qs6npsnrgpofe',
                adapterEngineName: '9s4es88prsyl4utoq96ksv5g0aah593p5q9r6f6ekyucghml0j5ycgyxzhedalowv1iv9w4ol04qvsok9p4pq87mx04mhqoo7qk3ky0fyn36hv854ai8niizrtjsbfupdsa3etmfjev6nf2zf5wkpwlfilzq9izr0',
                url: 'mi0ylt696ht4eu8ch03fhjlhw9oa62bpm9dca84p7ufcoyozpdmhhvd5n0dimrhxqd0r4cuxejoc8u5d78lomwzcn3dvb4dt3s104g143zwzo38ijka65k3p46ipfj532sv0052axac7hkv1jxyiwp7nrkbz5dyen1w0ena7kmf7lv97g7q0mon2mn8xd4ueiczq0mhfoko16qeet9k667pazl6osu2wcg5zeultqqr2lmqd1ddg4urtegelpaakdrnvdviqvfnudjme528huhhc21189hynsgla7urqt31o1urzn7an3zhj4nkihxch',
                username: 'gbgwg9xuj5a4n8pcd2o79mpmuh19sq3es7wuqw3d06c4e8b3det8cy4q4ptq',
                remoteHost: '2mc1z9psvut5t00rjcgtb4c7mqu239eeyqzwnv263najpwrzcactthc39ijpa77c857du2frzhl653w8i3fmsd9w9ee7l4jptl4lkpg1edbrgw0yu7n0vv37ytuudjq9daitxbc60m3jhlbrltlbrqis0u5y3b0d',
                remotePort: 5560095840,
                directory: '0vbgku67u53piyj9i7zz05d4dpp9zh61vss5sastny5qa4nl3903pvfamzvbt5xjiohavxjbmdwf2wrih1cn1n9e6wu64rgkby5w7b2bbclbhlram409tba8cvv1a3zd5o9xvndf2lnlsivjpff60og2eniriq39mm1cqmk2wkuswrg1exx6bv81ofrrbs9wzm9iklriv9r2yndwqcq1zz5fhwf2m6biovi7h4f3ut7xbbba9ixkqlb9du68eqb27t9rofze9r520x51zbcevdtg2ezig5ostlc0pejc065m371ajire1zmazdi2kfaf38gmbfn83pi50c4rkzdct1a6iz6yv2tjvo70pkn3q6q3vwnsg0os0pwworz383apsra56tkcb89jcjhaoiwtivmwgxykkmew4hw0wvt9ndqpjn62ju8v8shhla44i35424uwtyka0okurqty46stbsgbx770rfbqh2ltci94ojar26favap2b311rciounaj7znom3ekggu6cxa2g871rievo0kzrtq4e87ooweybxgt45t7730vmkg8g41jx5xe7qoyzlevqukxnjc949vyrvhck6iukzf78sqggl456gn2t18lehaf64oony1p1oizpntp3fdvu8kj9u9xkozgsd5vc77z5ccmat3f1o20da0ztax0wsriy4ssq4dw1aqzj07o35t0ynrxm6ldrl1htm1hy31v8rucrpsrt2azcqmpxfv7hgmicfmu272lfffqogr87a6mlgmki48q3m9y0tf3j5qqlw7ed3k2y32wrvyngx47707n98dhwsak4jw56vadlqn9d6x8sqzh3hy6mcziwopcrna1lml84808zh6vjdnjcm54emrwmkzlt72qzzrlrtn7sdpy94ctf16597so02sewxdya5h33xhthw8a33gwrnnopg0hwm3uoy7qc6ky18i27os44fdb28l2vu63tzse59g52q02t5d8pis7fpkrstm9uf830tkl0osx',
                fileSchema: 'j68ld8a439s3rs5fymm36uyx80ko76m51dsx91zs5mrrhwqufxjrvxm91wdltnggivhovhgmhyrosrthcxm8q2xl3ker3xcsqvzmqciw3ddcpuxsbdk3qguvlzyarea4cyqh7ggpqkwqwrt73lfjsvgez1gufrrs6pazfffr6b5uhuv9vdvgw9f9q9wh531otn4hloq4habnsukmyhvpi3jvw4kcw9jarj48sequ25fsjvzhfkyjmdikv26cp6v47j0fqzq394jibeeesd2q2s3gqef6d310y7w99hafclleqe4ql5hg16hz35kss5u5d6iuvpnpmkpzrlibnn9a5ey404p51krliwb7m7ywr2t9nfugcurxxlpz0qa306n4cr680ogv2uo1kbzh7u78zr4nu9s1p9cazjwdsjnwrgqzb1xu4qtg8vo3wj7xwvydtq0qifzi27ceyverpc7g5u9zdirmoasntstnq2ab76r6vtqcmdaoojct9nlukycujy1q88rebqhgi868rh77rzv69r3oeobcqvbth76nvzuopqiqp9ykyzub99lxotr9qjdluhlzi04wdnl56dnsqxmv7oq0i38r68giitkvlg577ji4m4b0ee5y1wjlhm3cc3bijg71shavq7hlm6m7eoke201z386a2z8wfup5qpqzjdt7wv5h6h88yd2811sb1otis6xqbe5562r89oohgx451bs5mkeh0cgtebd2z01bc4csizp2w68xcx4n6awwlryvd6hk7i2dtkmxm0vsgnf1guibjk3vo9x22s2i3atb067ym4eg7os7il683wxewopyrfe13jsnd6rma9kskaeuuo7kzkhp4gsut5tvro7q5pim51tfo7rtlvk11rcdy368o1fubpvpniit4dtu4un5s2jr4yr60m8fv8m9850e5o6zb1wxm2ipbh2hdujx9kddl2b6nfg2dzj8o6s48sy07jkhe7i5q1b75rr6yqy49utl1nbiatjx876p0n73',
                proxyHost: '9y2qytgyzotx4clr8q0u4pcnk1bzz0907vxm03h8tlc457rqwy896fv4kgvt',
                proxyPort: 5445868578,
                destination: '5bkdeqgh8r0di0vmjzqzuep6yjh6lxa4vqo5t807r6327pdqo6rgiua9m4p90jees7z7iofio2e5zedbrcnz19xrv3c6zzkhvs3hn0uwc0lnz2wg83hochl8jqclftekz1lkdg6anltyvcuij2z6fwx5i18xd512',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q16dicwn1kepjynj5f11ore93x5zd8mer9is7ibshxc9uhrnijyuq2t4uvhd4kj7aoc47okjwcn0wweprhbotxg370v8iec31a0bpr5awbvnwuhplnyae8vqhhv7e51zouxs94mra8p0jihi1vjs0iqezqc5x2f5',
                responsibleUserAccountName: 'd2jwxkm57gbr6irgglkm',
                lastChangeUserAccount: 'pe24lpl509fj99b9lvf2',
                lastChangedAt: '2020-08-04 03:17:04',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'szl4xgt8til0c8ok56x8uav5ltknc9c17l8zvfy7',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'fcpde4f5quc3k85mbkrhp2yzjechcdlm372i4bf1u88ioftjmt',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'qjyimj0ek9ygpux6kf2u',
                party: 's51sf26nrecymr1fhkcuuum5rc5360mxeh26axbwsomtpresxfhlmn6w4g5nll6no6a1tl2rbvrbf5lpnrcsr89445nj7cpau86w7bq1sb0d115o7bckwfna368n0pde4sktv2vsi1vit485froe4lfue8krcysf',
                component: 'u5f09vfayb9ujtw55e5mp4rcvedxu4t9wu3v5lidmut5eajyexjgu90tl758af18d7cyo9ytwtb94jheofbp0uizrj1oygdbtr89mckiq6p3maelxgqk69z5ipf2jq93vcdfi68qm02jeyyza2wl0s2w8797n0qf',
                name: 'ohpmebd6f9nborxodaqa7ttfamel4qb76c0mfhen5v4i18rgit1vdshk60re5biccna2el3kjr11xtnffxusfesei5f78y1qzin0xqcb08p962d08kgjact8re84tqzk8vsenwbmytghlrrovxviqrvwf3lrezol',
                flowHash: 'zdd3p0a5iyrav1rm6mh53uu0ernexx3gohdlkv2r',
                flowParty: '0dar4e7lnerrw5doiejduwv38rphyuduzh0caue5boih3wogc61dt5w66wmx8u39lfvgqm2cerc4hyldj2pssba8vq23aw5cs6jzgiin8ntw7d6ejif0bclttzcnhy818ad17arevkq299o347ll1otswanr3tkx',
                flowComponent: 'j1wxny6f3ne8yiibbtd6qsdtpfu1xepr1ktfdd1xwixtdeo8lncw0zwbalvy8euja7xae2piv0640atboaciyo4yslwczi8m9aj005i9nk8iy7c6gecm49vawjcxifcm5fgxyjrtp2bq87kc5begcftlxr7w05ei',
                flowInterfaceName: '4gr10bm0cwc4afmi7a2std26lyo1tnki4l24nv3hlggsao8481keoz210dhs34z6md23y8hcmr1hnwnemjip1qikxkfaqnqm16x2zk30yco1526c4wwbqd98i4hq92nshx3err4p09zqkuep2ltwv64x4csxt6sr',
                flowInterfaceNamespace: 'o3mqb1g0yjk0i9vn3gjqhahx92ys9mxap3o1pf13j1sdrlrtqfcidne4ezcau9ofapvir35i6edcfa20jzgdh9zb5uv321iqvbsqlg982wpfy359pgx1w80m8de0xaw5lnbves0w2bj3qzslysz2ol8e7ve73s3w',
                version: 'hkw33h1tm9v7wmx29g5c',
                adapterType: 'ph8oxa6zow7vp2r3vid346suueiavrtrmrml31yz457t5gzjyjlua2g4nrpu',
                direction: 'SENDER',
                transportProtocol: 'yn6sozxroo7rbbto2d8ig29q0j97mon4a9fxj5m2szjdjlgoblv7ct8snym4',
                messageProtocol: '5m1tezbszxqqo6323fhxcu5qwe96dlvi0nblqxmsk8ycy7jsrwtu6tag71a1',
                adapterEngineName: 'uidg09v8tsw0f9po840d3l15mfgua1eu03ppta2ixb4aivd3jxc915izfr3tliziobgdh44xlf0ibgw569q6a0vbpw7va8ityzzhqwnp49yezsjk3ddpqp9hvi6y8x5nq8jazlvnrdoso3kbyuqmmc4nlyxzqkae',
                url: 'puwwhkmkz2lt7s948z8rwbe3q4usi67bgkg23xl92def8yv89heitcnt1vuyxfhlpz0adffnm7lm8e0hx2am3tk79madhr7c9bijv2zg7sxg7oafg6k1jwg4t7f725gmuexime03bvtpk306jospa7t6i6mexx7mqa21oz5dqialgs7chh9403d5gkbvadjigdy2hz9m0p7kuneewglliv6epgaio1p4kjybzl62i6ir0jzxzgz3ygirde4jafflu3aoaby2iqpvp7v9ecm7iiyu83gre20smx5pl48frvw0a82gbgvpgk8x0zcf3ow99',
                username: 'm6wvcio40hozm34mc702p7gpzws6ifpgvarbyu8wcdls6ydb0cj9dy1aycev',
                remoteHost: 'd5zoidzh5gmdo522ccm67lrsxwszwbv7mpwx76szcl3vua5mbyz7v7fl76wblxsrv9so7vwnut5yejtzv59a0i3axngf6wquj6mhzmjtxrmdyw643ozc62m2ayog0iuwv1a9bl7pncpisoayze65k20oxnlma00j',
                remotePort: 2242003755,
                directory: '5fl614sugllzv7z2ecnund7milcq4aa7b3ht4dzgsqodemfh24wpit149s8g6g9ed7rpkz4p8n3mdhvft1y3jhp7po4rs9rixm8cvq7j3ei2w2nhlriv8bppaj853n7wf11saik1fyc1xunpj91tjko3tb2noo7l9q6oc6ffs0jyh9spk0uto09bfjy1ol40pl64z9h5yivy41z5takrkb6uunnm7ikff4bj9vjobvmhyd9x5hefpioj7javq9c977fe5jbpzl408ak57lh51mo3lswkgth25fa4f7qe4p72equ1g1jat8yk8tknu1dzjsthy9ky7tv82a4msnysbl4ad7suptw5d2slv4s2dq9qv6k1ynz7rrzw624f2l67lzlhha5hic24fzlz6o7ltkhv2dvkwicnfb2ss4yh3of05mjt2n9c8h9rgbrffvxrnsh8wdhy1aeggyubsfi13l60r03yqnq9zedxtlygeb0wzqjoo349songkw2e86llmw17f2ol5sqx41qg6bq38q36k3ow56gc0pnw09zl2boo3l8bjhbqgf7tmn71lnouud9tfpq5lko05akpj739vxy054ew2pl6z5u1jm1z8vpcnndlz21fi7zcmro4e8u1agfj0u52rei7n76nazn2oxwo26zjlhb5exzsdlm9xfmpi65wuwp6z2026pc517ovf71fs0ro39v39cjghcc80vpjsgm1ik9pwze4jjonbvvl6wkf1six42ol2wstgekeksg0boz8w3gi3f2v2bgo5hpfddswuogzibgkbnnnkvmmxuqncczumphxe011z0imqhvbl32a7ekdawh1wz6ublityuujuad814cl7ve1w5yavc1imkgr0fp7e03o8hnri8enhngragghqfxvo9c5a8nkogse4tn5ckl65wiec4jd1l81hzrflja5iq130v0zewdx8g5lru8k1knbd8agzojhkqh4xrzladaysv5bdlz3mbah0xwvlss3x5kxdd2n',
                fileSchema: 'siuuf7tzxyfnawgenfqex1bbgxlnl44n3w7cim1wetqf5z4u6g60yvtyfi7c4np9o0nc2b5m89rax5x83u3wq4bfofyuihnwvlw7c6dsie2rjk111qoyu86oxk4fal58irnld665lh7lwiadw7110aqydj8brmbqreauqdwfkfbraly68coch1ajilwur9f6vtdx14pqkzbinjf7p3yhbgttc6tkg7rr9lgx2og406pm1j1izpeaxxmkcst43ewbgp9365rpec9iqoz67m63m7taqwbx1gwi6uhezg7ldg04ezi5o93wmwpsfcnbtqr9fs7ogg7u14fqi9td0lcp9pi4ot3glvlpua8zme57shj8chtbm48f0gn9ob7pn4a5mu48u4p9cemvhoadnd5whjkv6g78z9cin0wv857nn1ns10quoggx7a04tkld573pu5vg61ys93053w5mutkajlzw1w48xi5u0ubezdot5h07weuv4epifuf91l528htk6mf0ullif9yeu3xrepimtmb2r7k1a2fy02ujd3hpl8v7walhfvpgtg249wzmvr54efr9n7o9v21yr3kfbhlncj6djjr2s154y7qplnni292in9sqxzewpzjy6ilon2c69mvkmom7noa8ty3g4fwd4lf7i9se84ectz667u1t1v3tjgw2oihnaosk4k9181fbqwlmgwza0t12k9xr358kcuih7xggd6e5wdfq1cmy80rynkax9itta33wm6tvp8p6tswzmvmak2c4os2k5n64sdhijlsd7443uke1ygbhwt8lalt2y3tf5kwm08hx3bah3ayl2yp5v6edw7beczbdy910sd4x6zg2v51n0qangivq0xol8k9851k2mtgay570gt44cq3clodkxc4oo5am7w5y1qm53qardb450jje9ubfoefv5qqskjwezh3y726ypaa47aoed9qqu52zrek1bhcrd5s5k4xl8ogwl9hqa6q22cchfvumtt3sxr9ffer1',
                proxyHost: 'rvnsxza3gx4awmumzsb0srd0yt0oo6sqpasvekyq1cupn0x69w70qy4hkzav',
                proxyPort: 5006425796,
                destination: '6msazml499iajrtfagw3929rqmccbkhg9z7s7ennxo6tagpsloh9b4d4d6z6v62kq448dti05ihju3umte90qladzych8hjap0aujwkffinud9yrrgtoyn81wsz8co5fbia82tx376md3mo3mmmhh1mobmmyekzu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 's823css1ncthc57py0eaq41wmz5gut3fgeb4p3ii2ftq4zovtvnqwabhqhmtmuzbg63ij9g0rdama433tx26p3yig5hcs5oy0dddm74mpc86d9652442vokb1d6ge9ph7cwew22bzvvpy6dgn0veqoknof2vp575',
                responsibleUserAccountName: '78p39blz4t5p5ow4ynyh',
                lastChangeUserAccount: 'grkv8d89w6hkxh42942z',
                lastChangedAt: '2020-08-04 09:26:27',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'ns2ir4i6pr6jqzmb3canhl3kwofrsp3ctsvviy68',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '2atlkw3hfugyqyu3fide01dlgeqzjneps0bnpxfeirywj0kcvm',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'b7c87nrcgvyx2oz96o1p',
                party: 'w4q9m3kvikgwqbkptyiio71l2hy5h4vsfzfz3yysuojc4hw8hcu619we8plrur6jx8076uvweqf2cfo4hijwtkxg67aibvf8x3oqexgd4szpu82hv4scrz0ccdlnem0hcy5x4pzccr6gz1frvye32xfunxs6zm6s',
                component: 'yu1jijzakrk04rcocp00ban2oynam82ecy77pub3upal66sgb38ajb0p89lnzuq55wm08fimc8jdsu1ao5sc96sr2zrkp763hl0xtonvik49ikzs21kjb8uchccgmi7sv4zav0ngob037p0h29skusgubtv0l3uq',
                name: 'o2cus5njdoje2gp0pgc2cy5cl00p7wubpi5gs0s8xw4bd5i1dqvw9g2chh1rny98yriimiackoxp10ttsqnxp8qczves3qvub29tj0qfj8x9f0rac6wkzwvwalseih8igvnx8c5q4h15y1vfl15nyseic4c7bi7s',
                flowHash: 'q3n8c5oq5pqd6sjfyxrpg48vmn9lnm2o30inxpm9',
                flowParty: '75oc8ffmm5tu0ymrgg7njvjqdr9pq71k4l8g6kudy3950evsje1cpqad2y1gglbyrazoxtr6slk9ifu7aezqbpzcoj4zhk2uwbrqg9e51ccj8khgur4d7qtfo23yu8bc0t7ko468xmuojdnj0j1wlh3lnjh24n3f',
                flowComponent: '4l4h074orcgbnjqy1enq8kq128w71kpdnd82ickz87mdo3xgfsavh6rhmm8cvc6fpehlochm2jqn2180p0y2182smcz4sb0u24lamfuufogiq7skm7v3hu483vtjw33qhniibdmn8c13il0vkw4eyq7uvr0qjo4r',
                flowInterfaceName: 'f8uho7693q0y416rnakosa1j3q7afhg6nmgpn2he5xpb3waun866fg4yys5r3nsxfgulh96opepvmr9awoyajapznfckzoxv2rxk5ylau76x5san9coa21p991iej6tto0yh5zf7xkdptn94au73sxsmfn71z1jg',
                flowInterfaceNamespace: 'smysae4svebmfsvttpz3ynyamklpjslronag59vliw5ftlvce57k7sl4irnd1zplgycpfe4lmvkavwv4jru3xp9ozxv4ycoh0q2bo3leveslz6ic4l2myyo511wu4y34ty8m7f6yl6db3kh1sragf7ki8mmyemh4',
                version: '1juk2t39pr3s7zp1mz8a',
                adapterType: 'nkr90fbpj5ne7xermz85gp9dxfa411fcl03xfeno9k3fv9dhw6vsx4uhltlm',
                direction: 'SENDER',
                transportProtocol: 'e7vthdbnnw99136aj5lbdfeyh0kkh1wdvvu84kvfy085xczghhju37qy16he',
                messageProtocol: '90igugg9ybtyzqt9j501cr3co0g35ur22ol0nv7xhhw426wlfwtahezjx77b',
                adapterEngineName: '1glm9i8ahgwjkxjy0zrasbu5vduheys7xirnr5enuc12u1ap3n0as3t5yg540jb3i9ura9tyhqvjcwrjy7k35o2t0fl37byg4o33uh7pzahzvg0ey0oe60q935x2w6fficbw29nwcd69nr2hh692jnz9b82yj6ub',
                url: 'ld07pxx5pdu5l4s0lrnql65oywxn5s15s4xfo9bx0eulxcnlkt38dtr2mcgzyf6vbiq67zdjnq85t5p92qsefvds4iijlyji5h2cuv95iy3pu3k713yj163hojix1h3ef24blrbd9jahpiinusxp0t3hpzdy9fl8bdytmfropt0hfg1bpa91g07rhv5w823y5fwv24eui2e94yau5ua2cf42gdjqz7pqwmgwpvjj45zlkxawnigo298usz9x5vqmi18iqzwti9pl9mmrptyl39u4u18czb53a5xxcirweehx8y2id0oprhqri9wk28rc',
                username: 'ro5suw9fc3wr7loxff2mer8fqafp2x2w1nq20uhoomn1cc08wwd386rkvydrd',
                remoteHost: 'u4yg5lvvf2c95yuzy6knzas9sckrc2gxdnlpx181rcdbjitv6tox1pqqgutbs2b7hdtz0murj63dkrz7vvkst5bbbe36ovzob68jcg9xyt2u214xhf8tmklr38luxdobmftbw7eoqqt8nu37d16uyw0tquz27x7g',
                remotePort: 9079735989,
                directory: '7b29eiita61wt6kulnhhuk521gkpzras7tbydmmutf58vtbmh26q78douu0rgnhulyk276s4spghekkuahsgozf8k43jg3a8hnk0c4lnvzwj91n8a7dhtfncm7ud0yzfznxtu4iravl2y3gbwt0nlindikir9320jf37m1i2zxv1a9n8bc7kphjykqd3v0troycfsnji2xfugj8rci46ipbejjaoc42gfgt12vduwl80h60ek8rx4ag4efu7uh3gqcki8r6ssynnw7dmu59gb4dckec81vud7gz1czfdrw94tsntajbzje9zvlngxvdjqe22u5sah7vcp691gep0pw5baymsg2qwrxxenxdcm9ryd23l5oy65ykogwmo1edl7gotwnw3mc9hbkhpmnyjrkulblx8w3cgw88fanjpu4gnntsbtnku99jq0tiijfaz8jq672pc18edorn7xvdri6gf7by2gbrcuhvf97jgegblqle8xaxlrn0i1lobp645vvcxxwc6ax51unrfqpo1s0jpm6bifek2sts1g3awt593yujw7iq0ty3brueix719o32x0yyjwgspc36kqlio1m2pp0fralydhuikjt5w76eecte783ntmc45vbntbajt57bog1l4zvjwab1o3ktj35ffi4v8so7zm7p5fgsa4e647pu1xz0rllpvymjraskwo1yz6y044giqis2nyrc30bj9wlrovb6fsk5dwcran9e94v2lqzxb0v8xk1be7qemnu5q904xc57gm4fgdzudhazifsn80n4somsng9xdlxygfsgtjnjzbi1jca63dukxypxzs2bj257on0drnzh1tytgauxprgahbqxi8o1i7lgt5xp2j6l2i39lp65jxiny2xmuv4p8epe7gqney47vrna8l25g2qp1e41yp8wl6gf5eq4s9uoyn6om23soe7j0s9250x4la1rlk7vv84vkrn7hqahylntasnvko9qc9kksxlkdtjzae390biw45lf0',
                fileSchema: 't1u07457mumg6cr3ckoo4gzp4zulsp4q57trx63nbrymuxhmvrtl98ruw6flts7v3848zaivrzpq6sebw3ou1g7g3s5slbyuxdxankz13vy1hvur3lp3vps88590zxljqp9n6q15d3xorzhqlbh6vluebl7yq8b1sesrs0dfjf17fy20tkh0g2tjghhfaya1h6sfug8pky8itk0w2xzwmzem7yhafa14stnilr0tghlbuwvajcmh85duuxxd8bl9jq8xzmqd9eiglz8j2vi6aulpis7dp8spvjmn420bc04i0simsbhc9i7vk85l9sx85twvkdhdsh2o502vcrn8h97gdi0zj9rx8yu1mdjv6mtzsxsfdbwkc4eq0k5qkzk0e46ielldjtaym0j7v5ohlxxvjjbmoho4d3fvdx0f50wzolzdt1j4cnjc00sgfcroy70jlnif00315hvr18exca0ri3x2499tb7sz9choimbdt2o5wa9n16lrv1zk3krvgam1op6o7mqrno2uefwnm0copw8lh5vnbswhvev05wu9zbxaa6d7kiikc1tu83cg8351yvr46wigqyr78u8vzcpfy2mrqzbayxhsdkikhz5trngaigjo1pwc95wh51beq6sm4sef9sshx5ucx9f83sqp0mvqglhfn0swudq2pldkwf8945iv32z4e6pug919j274s2ogydyyv6m6allt7xatlyd1r0f9ll1yvmw6leje1881fauedr0vcwbt8wnuomt3hm1g41hicg9cwg1emet42do5otqc2sl8uahwlcm01n8jt1p5ohow0yf6n2rbqumw3u70hnedpf7utuuusnoluloh7ytxmtax47wzgxrqfdnzbd5g6qc4qg2ic19j27ze64v7w34fljcfo406hstari6znyf6t6f7mz051ori6yuukwt0cn820eta7d1jioe7t0lsbyoyyec0jjojkjzttq7zb2j1skghbb3m208wctwejypvw5rjak77wvfy',
                proxyHost: 'hm84arq43asf7fnmtr8i8149yh1gbzru2tthpfj3007irciu66of6m6debzd',
                proxyPort: 7101600782,
                destination: 'qs432lwfv57ieabxj52mh7dsk7ttgu6ot3lf9w7devcx4jshztonpvn3vivrr2nmi602q8enwpaavwoju3bqs0tcd48opll2v785mi8dp2tjesvbo2m3gibty8wd6jgjod88x88x7o60gfd1j5i2czdzpox5mkzv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6tfic3u4tq28b91ztw3x24mj38lcj91rjcgbas2rf6ui5nyd4ojf9fnxacqid54e9wlvm3bhj17d455pkyv7z85fg1u6jipcnb9cmto5fe3dhb165k8fnhtxx72vh6m2r8fk3trhmamwom4tlslo1geku3aoe4a1',
                responsibleUserAccountName: 'l18uraxs0x80lc80t05o',
                lastChangeUserAccount: '5410k9m9ojgwx67wv2jp',
                lastChangedAt: '2020-08-04 00:31:00',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '0pzfzupn1kz7qyqfxmhvzpo1lpza22k7t3jh969s',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'sqs3vt8cvmjnrcarj7bv5jv5425xgmm56vvm3avuo8k0r711ip',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'sscl56khgkgsr69ryhls',
                party: 'bep4i29zr5mxll3w63187nyru8483t5qbd3elzpncbac6uvk2hkfszcwbqv2x6ko6a45b8at6vei0x7zb7a55tr2z07qqogntdceb6jk875ctjbblb0dp6csjplbvaveglgo7n5258o9ihv97li2dkju32cy5v33',
                component: '9ekruw6m79flzrkx6neru01ztf3acdgj98ndnltz33kjnoxfxwo8iz22g79r0k7ml9v0neytn313hsc8u3241flthkyyr564zcvc2y012aqyy45b63yijcmzey0uc42wsz3r1v7rl8i2hnquvm8qqc3rp6aav9g3',
                name: 'niau3lp9g4v9d39d86dgg8fqqma98zm5r196qdgz7n58t4ehdmi26d5b925spxc66fgkctveb29rwk2tf2ztnhzi3qoetkm7tx5go1fzi3a9sppoczelm3dy5exd1avxnm3wpy3bwmiym8u8orryep9i5gcare1r',
                flowHash: 'uodvlxyr5bw47tt6fxj2hd15nn1ddb7gda7yruis',
                flowParty: '8vlaabvxmssxu12nlpbb4l1ny60mtmy6jiz8kdxn8g9igqzlbqjo9okt53uunxxxg05txblz9jrq60qwfmmrj3h1wl9akynbtjbzfdlrk5i88no2rkq4xledpwc5ol30qjhvg38295r5tcrmu7a7pctgj3yuw2l9',
                flowComponent: 'tty2aba0d3xstoejty9ssrcdv1pwoucz2dt0unbnk4hsdsd6jqgipfxpewcpkfkyul51fsvqi9r90ffijf325wb3awjw6tuck7ftz4mt15pzc6b0vyikac7czrgc8ni90gsfho5j71gcjw8ehui7rx9rsmj2iv5l',
                flowInterfaceName: 'v6pgk6gwz3xth9nmbwitev8end8z87shetgul11ztdb6jf6vgysjx0eqq4texka4vb90vx7dvjm0ph2c2s6tseqcgowfjs973xd7ir44grsx06jgzw71bw9spfu5quddz0vrtwex6prr3qkuknivppchrh0vn022',
                flowInterfaceNamespace: 'bu5tzdzx47uveodxfttys8tq11nm3xhp8vchs50nopscxxzf2pv64464g761izvxz3hlwztuyi6bbnojdqx86tabgw4d3xiff3essjl3tyhm2obq6ri18pf50gufvugqd43w2hkn1vgm6e9ak3vnl4ejr4ve1t1q',
                version: 'q4vgix2fzmkua2b2wyrl',
                adapterType: 'x8bmlxzx9vhaiag25wugf6vjwsi8bs7m6n0yvw7n1j4wnoodb0ws5jjmswzn',
                direction: 'RECEIVER',
                transportProtocol: 't61h80tr1jja6eai8mj45pmsl5rhjfanwx1ph4gsj5jbds2p5pwbhbafkutc',
                messageProtocol: '5c544xlnvv64ovadtf6r5pzu9zuf8o7zf31bbwofjmwlc424u02o209sdabb',
                adapterEngineName: '1h8qoq4rug4q9ytau9p63whs6dska3a44dfbynhp63vcg4vyk7zdtalm2h6tepa9gty4awafjhxwi5bdp8i1u4js119xqfj6a24q1m42mh88ritu73rhbh5r4bs2qenuzth1u4ftwsq7xuxzompyndq849q5xjfz',
                url: 'tx495cjo05tkdqperuq0c7eijidn047zu71rxu3t6gq3t5iqj1jb3hafzjeahddg8wb2o4ntdn4ahtmrz1m56edrw1zuz18oktw46mowoq2rk7lozhhe2h9w1sniwk4tofeqj5hu3o3kamsapg8uhq63cyr9oy7mpbv8ycig4w8epn949qakambe7i3akabcrjugcmpnbwy0s0cv46zj0ex0j1vdzm3ja7mfyvpyp1qi8myyckjk7zpl79myr31mfka4jaxnxy4kgbs0jtqwq3is3m02zg0nzivdjxs7mgo654y4cw1cokgg4hqw7jta',
                username: '8cq76ycnba06jqn7edisb7pky7139vgy9dpqzb5rnyqz9hvo68zpehacvmft',
                remoteHost: 'kxosdaxhriyt7hn4x8cyblietdphbgqmrjptcsspdux3gwvocyx00rwbgku9fqyc6cqvzog9oug596mpp19uhae4wksltjoml41lj783jak77bl0tylt3zfcamk042rn69pg8s0qjgk4lisx56jz57i3isja1ta8b',
                remotePort: 4714050013,
                directory: '9dlrgtchkd07gygp8j55vjd0mrjb9tc7gg9ec7e7nf3xr7g8h6h3gc1sqhpehkwwd6l0e81vjb8khfidvtoxlh80gc2c5iyudtpc46f7b3zr6gscdku4wv8wwfac4rgsmceaukyykc2yum0yjtn3j6vyj5qdpy4fhbuhzxxgv6e2yi7ss7uwnesrag1wrc61i1wulgvh8fs1262obcvt66qd4fi979mj5nstorp3tob191wuavkzd393p3k6x5s5zgos12g7kcere6skn3sx0y7u51uv57voj2wq3absx2gdzio27udnx5ykbwavwafdre7xalgwnpmfy0uruk184qzg84rd52bbvj84g7rd7t6nw2paidgmynb9b07bpj3qiymnedccvwodyt5zmwuxsgsip1hb21koslxr8wps3y3xdd4zzdc4ph6jvsoi743pq7f9aeixfa8t8g14zsndm0mgh7jaugh5xiq73wvjemuld3ofpdl71hybh2us02wbdx04ozuc1ti4exlt9m7i1uoti0xw3t4n34t3j8kgixjipdsqfxjk3v7hdn95psvpaybvkbt39t6zyzs80zay31sxtyktcy5plb85jzkhwpwa0c1zuptrplzept5pp0ik4ccn5yecywfjtdt6b2j5crkwwf0c5ih421jupcupxflo9r4aqmrcvnaz4xf2bxt96t03xcr24j93i5vtlo60sa0fcubvxo3tq7dxemx5bv4ok81x2akj4ynl7cff1ihe84ce00ij0xm4284qitk6q42ed11vy4pgek6xapspgjgugwkuhrcz84xfzvy82y78l4uj25ca7avyrgs31mw5yryas7mf5twpmuxqlsiaamuoognttuae5fqkiobu6rjowz7e7lx83vq61mx560ublotbucbldhovmh1b6xbmxsdvuzkxaym7b8m1kkpj5lp80h0te6mhzlnmivdsjypj5jmxqp6omgxvf48fds7n1xbrio96zftd8x92kwch8b3g',
                fileSchema: 'xfslut4t26glw0y01copk9mdxikc8kto58wy0hn229ny078yzgz0vgk610wpuntvg0cgz52gb34t0ox1cp6nl1wbqefjgzwwkcv5a8asm8ucg1eqsy4qnasz3uyl393z4qk069uya0wsdq90199bf18cj57ccsj126ri2vmslerqul8nsscvu7xsb7tgnrv6rdy8cepevuau98qss1yb4szd9vmv6pt5lbhi5hhah424fbb4ilkh7qj4q94hmdtnlubyokav0dnbcazb9z3rj54gdkvkagulnou5um1wld7li8p9ubjhyvf2hozuqmg63z3jc8io9f3j3rjiqgs6enu16xesjrcipv474444hhc6gb93k311rhn1lpmttgnt5ug4g6h5rnw5i9zn4ysyt3ubgl9vjwg4b6kbl5lbt29fmygz7gf109lr8v4dd6nujxcbojk341cagytw7vwn29x4aqmf9obwi19lg1zzbqximcda9zko00l3eubpr9xkm1v2pboinazq2reopf6j00iiv3h29smqba3lbuh7cqprs1pegmzfx1payq36dkuuasmrv4hh17arcu8at23ag5c52napgrntqqxyx44ej66xomc8tdd92gpbq9aoe9l7apks7751vx965zv2yxi5btok43wiobejnbxp180hnk89b1ndm0pgr92ng3lg6z3w6hu3xmnfdfdp13qwmfuegyql5wwpw3ei1yes83b4dpq8pnp31no9dxk7586kaix09y08v7pb6dsko5840eiqr3kmwuwb79zlyrb9c45jj19u0bwsx8dmystv69tgx5uhxqsubwxia2m9i200jb70phju049xqhkffw1ohm5hmtibq0grqd8utb30vgbr5dz14el9lwmgtufd4tfudvhewjit7g2kn5opre37ekj1pxsdu5faoeo6ysdyh3nh7mlpt9w3m87lo8rzlc9lmnvmrnvvsk0pjqt2g32gnng35b0vnxchphcxj4f02dz28psl',
                proxyHost: 'swgv385fing4m7sdgvwmecmzg20q7hzglvyk0fky57mhfvctf30it9jz46ys',
                proxyPort: 7475200117,
                destination: '8aj2mwg08199eakpag8vwzpvuz8tkrf9vnw5wat8p8em2in5uqlu1ki0comdp9i7z3zclk53sicy9qgthpg27k5rc09iwv4b0dx6sezu0kmhnqwy6kxjwrqatg0lk3p6nmeh6f9vdsdyi324j17sl5df7yu7l94m',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kh8aw3zzn4otved7adtbszlxhia60pnra5ulcmx5fahrxpk5x2k6qx7ge38eklxer9pkqvke3b3kc6sgk4li2zih28ylj96lle9vz7rbx0xnf0rjm9q3fagkyhy7yi5046tl7zsetoikfkyadkedbb7qlg6o03a8',
                responsibleUserAccountName: '15wuamxec1jlqujycj9p',
                lastChangeUserAccount: '2z2oic3zvrxo6w7vclhi',
                lastChangedAt: '2020-08-04 10:24:36',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'xj4o5uagc4usm8lqgute7cu02dwl0cvstl71rf8y',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '0qrxhkdeql46vz135pgwgjheqy202pl75amtqg7782patecuii',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'ahru0n7pnckzseipfdd5',
                party: 'ggwb4nmffce5zkm02zjoch6iss89mv9oa31tk3lzdvmx113bqw2586oj83ra0zuuzsvcleiuhii9baukcjgw7kd8zavjw0384o3s7eocwzk5qklaxpchi7xei2hi3rxmaz5112zuwmrs1ep3rhsryfu6hi6avu3a',
                component: '5smymtou67y2ngs8dwe3e4dbc4evl8k9ync42h0qifvspll6a5imig4wpel5fcabiu6hmtpm6yp52k0hy2zpsg377twiv2rii1qjxhck7mtqgq8rggrial4mc3ekhgfk7tl3w2mldphhzmj39mbdsptxacgitc3s',
                name: '3odzng7tenvrcq9g17opkeciddpmg47ateo7p96izdw8hkfvwda8dt3lr1f0uhtolcya8pt47r3gwjeyjyki1zbker8uwdgq2smavybt98vdbs3x5jyyvw9oneoalyk7t7tbbpnrv8azvo23gwyurybaigg18ebc',
                flowHash: '44aott8ny9cak0ewdx19f1bzh91h04s81vrgva51',
                flowParty: 'rfm1b3vzs4i3j463bij2gorh3yy5pwfvamf95mokz6whvfc0q8t7jwpi2u3i0vpdmkykejgbyauvqmwvf94haw3zdimx24zvigtw73ioolwv9bgaz1jblrsxprucox3usdq169bfvtpem28faeerkvh0g9wl99hf',
                flowComponent: 'etynvyegrdp8hpv6ahdeut4nz086bvb3bwgm8xvir982erualba0ev9vnxqvoqkukwdjzgzv5ovr57znprrh0ci4009v7l8q41gnaylqjknf0d2l1nf07exusmjkwpr9px2wylea6bkvcsv3a2gvrbs90w4hby4l',
                flowInterfaceName: 'g7noe7mdlpag78a3nxfz9eslf5w9xayotvtb0qwonsvnv6beljtegt07dykfu4kitet83z4d8a2rruqe7zcebminyi8v074whokblli47rn11ro6bp78owjsg2rbixashlusxagm0gexawa1prhtpt2z9n20pa1d',
                flowInterfaceNamespace: 'pyzsegguhtrsuqzree9wsbfda03slwps88soz7qv45926x71jimbflp7n3ihi6lr8dyf5roc1hgb5ixpngzaypfrp5xqviggndp0ndwcfsc0t6chzet0151pldgbm89f75hs0squuv86jdptpu9sru8vpa6bqv26',
                version: 'yg7wwooovwiqfitrj8o5',
                adapterType: 'n30w6npe59y6xvgei3eh0004ynifgpbc1vc1quc13240mfbgq1eex2yfynbz',
                direction: 'SENDER',
                transportProtocol: '84emz76nov3r04fk9i0x0y1ux1ij61m8bai5ykipcvcssxmy476jm78f0lnk',
                messageProtocol: 'jcyg6vyl901cobuh11a9eakk4cv2fwlnmx0pumn70xf2bfgpo8e41cnl03mi',
                adapterEngineName: 'm6ubjhbgneuqtm76ga315ue3h7czxfeayfzb13ngftkko17506e3ii10rmwwc75cq0ybx4k915c4cj72iop07xvge6lmvzfoxmonwld2m4ex2i99jpj1gwdwurc35jz5yj6ued05hmioh77o2pehaendwrx6mnl2',
                url: 'rk214xnc312yfpmmh3fgb1nfgk2yej8em42krvt4gv050yvwxq5b1m3ogsnrduu2pvqveoq6ak6wv9ds31o3tq70k0c45kk5s2ns9xe8ajz35wtr79f11i67d57q4ihpm23qxwi21q0l2spatgf03cp8bbtbwyvkhtcw54lomfz20jpnl9biurqgyhous4tg4avf6nfkh3z3v4woxa6lbd2lte37noczebskd3s2cnavt6sob0tszij3lblj709mzuvoac1w76tcecuixeljquh48s2kkqqdd9o6vtw220s6u7tgxc57l200hjkah7by',
                username: 'cgkmkiwhpbww3rq7o7gnvm52usbp769lanyb9v3j73fgnslg5li6sj8k0ra7',
                remoteHost: 's5snu1lslrbth1wgfp5k5x1fab9ewzlb5kg87uay0bgf512ckhkswp2e7kjdf4z0hfqy3uglij8egtnk512rgukupfyoydvgt7tbtzw4e774ck8islf3wfc1wz4kheyf7u1ytz7hs2l0b8y4tfn3wd5vy1tbn8s4',
                remotePort: 35378712736,
                directory: '827tqxfvj2bmic21y2um4f6az7hi7j4h3rb43zxi7hch32a7xi5a472ld79r63262exvo7kyogcfhjk14r94s4oh3m8wzvdce9s92nc3p4k9n9zgq6vbg1u607m6m4qvvpyzk9811b1n6k721tz371wv7j0208xmthnx4kp3t602upajt38v1b3xgs5iybvnv0qzg0qkhqqcnajaf2gh2nlftcmagueusegxbvoybet9fnwktw700z71qihp509ovw93hu2rljp1sn5iokhaqsto7xjsn4phxv8pbf73hdy92wunv8phmzwcll5kege6mttgaajjpd4plg3kfsv9xizenjdh7llcg09t8d378rye2r7uskcf9zc2c4tgbuz59j4e41lrj1e7zh5ilhr5rm1bkzczq98616mvagah9nikziutf942175rovfdrmeuhv9p50x1eyd6z3n1xqbkqhifl0v14ht14orhv2wjg4qwjdtuau2kyy7u01lj5zkczt2dx3fdlekoypwlpjz3f2v3scitnteshnvbyn0i3eqtty863fguosf27j9wmy41zy6txm2xpjr5p1bgqp63t191l5ol40qisbrif6ejb5jnj0p7xcsvwmxue9si9qg6zets1y4n5w347598e4v480rnzrx2mp5fuxk6477ons9b1nf3xlvpvvcacigq03oj3u35cai67dbca4s4ruobcy3y3ddjlfk6fckwuaxgk8lf55dvk05ugn603luz3muzma6zgg3252b883qerae5pliesz9f0clxf60g4fbqkxbjqq5fe5o6uz6zsnd3farz2m2h3p1au5t4enbgqg4hoc3bo7gbgt4i1rfb12r0or0l4wvso0s2fp3i1302cw9h1od50r0yyibmi18zwdlm8j3d4y0ah632ijy2qwattrk36edvq7stsxbp59j5bdd44n2uoihe2zrxfgusxjn360y2d2cm73f1m5erupfied1g70lx0oi90kfmcjlid3yz',
                fileSchema: 'li9i0ufq4i0kdxnz4n052335o7j78ybkakq87ap9334zkufv3g2w2fkhr3wqsd9z8t0j0kvcf6iy5tqmkkj4ttob6mbb4n68cprd2ckrblpludvanconpeeo4414o95vvvk0w1odrvx7rk2yp7nznv1avw3s5q1opqes4fzg4rqbldoh7cxxeosf6boea5o7htx67pjklmwolhnabijj9eqv1vnsd82ryjq4v7rh162jptsacmn9esr8hp5pbg1r09gum15032h3jyoryjclgpw3raeaffp27kqbioaqd8gmo1zeh9bq3y4as0xoxvetw57sff7ua6ruqul4fk877knjtfdp6gh3f3d05ucyy6ssthxp6fimk3qa0q9w1awoy4ty9680etnef7ryb2ya1rnde7aq8vdtcakcd7knanvkml4bu7eal65dumvbs33gyxg3vwzctb9oflx08ehyg9r60r9teey35me8v5tvprbvrzjg2spiod122g4oev3altcgsin4bq9jq3asdz85yvhkhhctf6t9vydb8x9ysiwy7884i94ddj240x767wfzot873mmpd2hmu548fzuowfenrn8cuf94tz84jseiyo5c0ml2do7z09bkr12gvl4zmnx4y0riqkcb4iim61dwk005orb562fgahtxqwfu0womqfbfp27y0hv11mrzsujrjg32ktk9ancu2qvpjkuzhxmlwt8c1zozs31x5v87wcrlq2ophqoeocyy0q63jrjcfeu19np87orf30ybrvn7rjoeruaxmbqbgqkhvlvud18xm8fchr78dhm7awosfg6pcjz4ijm5q1s2i6lox2loufvperaya6v8e3mpwd4p8nk911gxhpdzf5jkqch7uvpzur213ggap5hkmhy3v3vkfywmkd0r4ofm1g8hdgjbfm9l08y9sqewifebiiu2xfn2dtkf1elobdeqnxvvpz3sdz8l7sb1zz7i2fg9u2ch99m8a1vsbbkstd81lv7owe6i',
                proxyHost: 'wuwcg83x90gk0y5ctpi6uw9c1am7mx12j5zhgyn7boxmxsrtdct0ina1syc8',
                proxyPort: 3855633655,
                destination: 'xawv6xmy2qee2fhxnnoivma3dw8sbty28mpgqwmyze9kokqn1blgo9xbuhaxqujnhk8uyfkmkrmkytn9kh49oot09pgd11q1cp5fdhr85osemwhcskg4gi779ak3p4uzhfppxyyeqd3cikylo1xlzzsfo7gcwovt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'e1izjh5dvh3nigep4ls37fgc33z952hlbeumjiojt2sc7fnrp9v9llyji6luq65fms9zvraosydnxcg85adhobohsuyvmfodqzr54rg504xjxr9v5jwqzr7bfafie1nsdffusrqts2rvevgbeiqc985kszu9vyyb',
                responsibleUserAccountName: 'os9ol1yjsacsjy9kqxx0',
                lastChangeUserAccount: 'abvmwuebnylp72r6hxxc',
                lastChangedAt: '2020-08-04 07:15:59',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'ajmccnnx4hu3c4r1nshltvlm5ovb6hkvpbov4jrg',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'xj8853gjbunl06wi0r1x6i761uixoqt8ioh8xw3qs7amlshwye',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'ulkh2pvbxq4o9x4f860o',
                party: 'k85f7ijf66dbu88ffmpju4t2wecbrzbvaozcfi65a6q3jmfg0oxm573j6ryqxk75ba7euljmzqfrociuhw6ukj7r3oikwazgqohdztj5kd54mcl911mm94az6oihi9jgxysmk2t6un33e4jj4zqlf2q4fx0ytilq',
                component: '8v47lqyzwdmhca5jd0s8mbmalitp0beyzoms82xxynp55b9ie5hfjbian796hx50bskkg243sky7ahz7a3est0bxa9twn0novpf0s4afhg6z9829awtzfvirpe4cbu48cchoceols50gt5agdtifnrvo61kglrw7',
                name: 'duglcz0n1q6gwrhfgpi90h2cr5yd7uerqnf3yggqwowrwjt81gl8u934n76lsptlplwc0gh9ipj3kuk95zt8uu0ie2pfe3zpo38qdxnepz9weeksw5rjrl4qldagghyc0aosl5w764xvrwxcat274s6qjsii5t2j',
                flowHash: '0n23e775tac6fcid9mpa02rko1a1bt1teyep4ya1',
                flowParty: '8n0zeipmgc74776ri4ejnssffccdu0akt8fqc4fxjk1hxoq1yzmnvrog047441kdegl2vx86v6e8jm0xlpg0ucf2bzhq4bum5dbf4knit02vb3g3lb3zu9nm9hqxpbotvw4fylbx64qqfpa98isw5wz7q439gqqt',
                flowComponent: 'tqjg9g6l5kdp8cufnvzrn01ggr1awtew9op7mrvnkazypl75lswa48t3yyxdkhtc8aqrphhu90k172guif9uy4hyuvayqhrxs2mgmmyowmtlatc1tbdtuoxujk571mrwm5jufefzrn29p278jqh5chatt0vpo688',
                flowInterfaceName: 'vdkgzxa72gssureqd1xbgwnkw5p66quitevqlb99ykmx59jyjxzesc7f8d5uifp6n04u4mxw274lwu9sz6rvm01v16yizr3ivnakg4apj3jgupbr9z2b8vsvnp10zbt6juxgh0wdd2uw87wn8hfw2pll8aj9sg3z',
                flowInterfaceNamespace: 'l87nh2f0xb2jt4rsbp5tnmuolrshwognr06bdq1zgtidqbhnnouiuf7yssst9smwftj5mha3wr9ke91mw48zpo8v0pbg3xwx046gztclltnzqwcte732ij8bhojkquhmrfu1u45sdtej8gz8aodhd75panxu9k7i',
                version: 'rf82l8dnlbk5oxi2xu3k',
                adapterType: '24zysts0865eztgropowyacli1z4rxvno3ruv74oh8aca17p2lp88tlphdku',
                direction: 'SENDER',
                transportProtocol: 'f8ekqds7qfbxlz04ameis16i31cj2q6mknjyasrvs7wn2vj0v4ek7xeoedta',
                messageProtocol: 'n6w0g9zsmhd3gvxi3llhr9ygyqngblhcjrxpgedc1bkrv6po5jorx8cucbfn',
                adapterEngineName: 'g0p93rdez4uwunuchhhh42ivz1ld89j55k8p2ghjg2eryva4fjh81chylk60o5syref8tw0gzrefx0nc7rn9lah76niwjlm2udt2ziei5xlmxpacu5pkjwpxjgemywvb4ss96jj4j7k8n8vf1ssqzq1zksok6748',
                url: 'b13dxtlist4eaws5lm2qmij2fd8j9dpyahzk8exbejhovkr9gxk2ylq1i8z2z9q8lj241b1aqo91e1p9n2nzqcu0fem8q8er44ud0b13ncm38bjbcr9kq1wcti5c0qtcnfykkve9dknxfxa4846bifhc8z6vdgu58vbli2tomlhjv7bmhh47zby4ez6bymylcedrgj45mkscmocmhl23yol1uj5y3qzidtjxxn48e9irm8kong2da70olhg6s0wkhwnlnbyj523s6cevve6eq8j2sv7rrlvw21mo8tt30aq3wy8yc2a0awqi9f1voji7',
                username: '42uopjc5pwnqonv5fz40vd01blpuc6qeru3z1dcuwwb5ywmbev72uvisakjg',
                remoteHost: '4uqnutjflgk79k3f8mew13frqdwyl5gslo08sidp9opcx4a799138b4vxixl9fj0ylix644k345h7c0f8ip5wuznxu3eo4e6vq6e6iy78rslv9qawmdjq5dzu2gmzzejq48qofvm62ttqwj9q75i1gd345r0s2se',
                remotePort: 5909012161,
                directory: '5t4to8no6d5dhejontu7kxs0vlcovtxaj6f4almdig42vcpw65zeciqxoo1lnq36s7g7wcg59phqk7xnahxhsbgtaausaoncmhrtefifcawh88asx5cqadmpyt3s419p6x6nwhkrwe7zrznhy01no4fbe3ur6kbx0bjvkqhqrzputz9e5kwdnupfbs8udv6uh17ehos4bql7s5pcj7t6oo5kfra86dd43vc7746w1x7aod976ky77a05chspu8kr6n14alqxjz3ohexd3rk17o1b4u6i1z151sqvuwmn489a1eh1dt5jaa486gkfe8xgf5nmpwv48kmqlwu94htcozxdvknr6w67djoxbbpl7d8t79in9m11acemiwpp6tjdbve5htpveypaah65bwzsus9sw55gzuxugzg2ssrlzdxksb8nle8c234ho7l1q88flkygbxouhoyyagtuol1jrmffjr08o6tes1ntc3d83djyntwdl6b5klj63omz3rw78lwhi9abpveoi6ru7525ed7ywuoc1kluat569gjrl6pnwoq5lrsswgu7qp8z6zrdaeyq5k9n51wp7tfkysqmpeoset13sjdrvq9hhcqite3ub17yd5cvglp4fgvzhl01fqo22gg3paw8whk91878l72eae15byxe2fut4sep6pxay6fhsl5o1z3asd1ry3xcgaja6i0dg7kbwr66p7tk8r6fw3s3shcbpfee0e79ybb3cxf6lt2zfdepvckrw8sa8f006969hsu056cz66h5a7hxz359xdjj5f80enmjrskphml6h20atw75mxozpu3bkycghjr1jwsh30mebxafhju2e3ad6akdm3a6f4el28agnoih7rh7c2wmcir3i7qxlzggn8hpi5p8ihb4226sqllsq4jtsbnfdkr8cryd5et9yxqhi93hswwscrthkbot3r95e37rflrb4xd7au3i4ur4xbnrba06si8npsndahobxizkkruighrzi283ss1hg',
                fileSchema: 'q94fao87l50b4wg317nuseot1ja59nbajfalnma0h6b7zsm7aul57ydxdeanyq284sap129s8fxak740wwts4hla825xlebbsa4hexa06s6dolkh46zwypplcsdpldbsxczo6sr801nixkybnqtlirt0y56uzymnot3cdwytwi2dk5p6j132zam70grgjlzzq11cit2wumjinvz5g655hufqa6hj7vmv63cf8pgu936s48nwe0nqoblo0j5owl6vl0ltbzqrnzk0excyv6cs4nabzbmy7ph75a4lakwy2gco7hpcuko00yj5nprcx2kw6h1eg03pakfd8o0x0phscymzp5jiyl0ocbx7swe13t1qgbmzelnvrdkr9n294i8xoovpl4bhhgxbr9cifhohh61t6enthax9u0dsf8b6momi0i0kocmsece74vx1cqkmjq3pk7zfcpnsjvi5kcrgyexg1mds0ltdyj2toqwumfk69govvk62d3amz7uxch7quyihpt6zy9km695tr5osuyxtosp46tbmnnlruf61xb6yghz6gqdc7qqpliqk1vsdlkx2f2po3tc54akfuonmvt55rh5p9xyuxo7my3r1eoykqzkez3t5e8s1iyju613h4433r1mhpg5b9qtn6quueewt2hap9r5x5gol0at0euf0jjxytyx3dvu3g0e4n0fljftp7je4n0gnoopx25blj1azdnh0zufwsfqr49thz5fu24ymtnhicmgtavy360i2mqlss5yr07agin5ibnhyom6b0gdcuax3qbv8r2l1h6x4n22xdk3df92u7tat4ubehrict8ix0kpdqx06sl5q158zq009gsjnqpux1nsmwiave7hcb5nuwhwumsjhuo5za2vnsnrz51jqvsgw2muu1zgv4srz0kctw3hrpqjxotr3qvk0pi8odh1z88w8xtiscrw6jm2rb6uufhoeabx6323w7u5epu9p18w2g756j2chm1byi6m64zelpg2af1eb',
                proxyHost: 'murfsg4maf41524untl9wh0acwfqw8kyma6l5rhvlq9780n4tpwlirprvrft',
                proxyPort: 1509919767,
                destination: 'gebji2t0d3yhiqpn6t3nazp8t1oxg2r8f5e5cncmar0yqzlj1c3acad1m50dvwrv7udrs9p3e7gvvbtovrtiz2cjgsmi23rldjx17wju71ov5ke168a7qyexcvqwkvvj1zhh7s6hi200yslkoi2b6glec7nohhv8',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '34xal3570msz13c0j2qkta9pcukz5vlji9aa3i0papmkl69xoefqhpaj13cszkzf10sze6fxtkh7f7irfok18cqtykr6ay27eexy3lc22zggktcg1envl2xrl6utl401jmg2fpxeroghnrt7p3rykqxjd9kdebvh',
                responsibleUserAccountName: '66u3fzvyg50i4j57a8j8',
                lastChangeUserAccount: '285n2c1gpgjbrp4u3bxv',
                lastChangedAt: '2020-08-04 06:22:46',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'fcnsnt9wfvbx714rmxz5zwfp0vqqah92l6r8k69n',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'tsghly28pwpeov2ot2hdpc5kgwo8yb4st1q79d73m08dpff49i',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'bumflqi0ofcskmsqkcwh',
                party: 'cvo97ivcdybenu47ti5kps0cefh503fz31cti22bag8hnf8l9yt2u6ac7nqhvmj0o7q5szpy3mdboo8at4g8qv8loq1mcb0vh8x7912y4qx9f23j49qeuso7yze6qxuq3ivp7ldd24bdhdlu54a9vdkv0suwmqsm',
                component: '7yzan2xwgos006k0vgzwxd35261aofo1rpvvl787ra8f5xoze81j81dpf2wluwdoeri0byog2ztjwli1za2dtmij1hh9xplv0vahecqi1rr10ybaajmf4vs39q78yovoc1g427nvkrpgwwmd0ewlymyvt4wcwan8',
                name: 'ig2ulag6g560w17bg5jv5f9dwehgngysfoilvcwsnsjbt04el7koi6mm1bb9jgu2jcpixo4hoq9yne68czs74xrragh9ffs7of17nx4e68jfaizfbgz7t5p39pgjbmnznqyf03b836gfgaqb1nnkgsep5o6btkaz',
                flowHash: 'e73tvo6rxrw0pkcitubsahcoswb616tsoyvhi2hy',
                flowParty: 'hc6nzk3xwdarj9m2x6sp9kob3scv6abeasoyt0acpbq791k6h5xdrj4ak61b5mh5tohage5pqhfjue0g693wsguatwy41utivorin9mtbd2crr4lf9da3wj11d0ia7heh6zf1ye1qfcmyjdf44n0wdbiu3rrn9qs',
                flowComponent: 'x2u034y8idbt3vow65253orvoyq500ovhev1den2uz8co8rd4675b5cusok4qfw622w2of0e354wha7p4wzqshsgdjfia93s8cy2l7i8i70ua50ex9x44jjhpbo82agl9unqw2mmjfnjwc7zxbjkjffkuauj6tdb',
                flowInterfaceName: 'd61s55fxwrdzopo5dfl4ty7c34i440sorbbt6ul1meg8f5q83dzag2fvgc1tbzhhfzzeppvdacyu95tm3c7ap956g15ycapz3gu6kg480g7g7es8rwkfocr5kymrhi9wg5kprmx8oawztpx0m36jo4pi9gbdnb8p',
                flowInterfaceNamespace: '59mb52la7f8j82pxhw62t5e1f3ifwxnm40olgntrhfa2rvbkylhlm6zikdv5sm3z1z7q2xwvg8zy7p17nh94e5isunihr5sajn4qcixyrle0kkt31kivimf45m8xoay446l0tzd97oy4obmr0y1m8quj1yu6q3wv',
                version: 'zj5pjrgfez7milgvqhpv',
                adapterType: 'd36nxrx00bjp8vz7oc305i23d9pytu4skxvtittodi5mwo5vaybt3lc96h2h',
                direction: 'RECEIVER',
                transportProtocol: 'eyda98o47d0y9ti56p941dszth82lmra1ryj9cyj7trpioqtkij346fte25o',
                messageProtocol: 'e1pqth26a787i6m8ibvsqlg16ias4r4b6i8eyc73svjpwegeov85hcbhq8e7',
                adapterEngineName: 'yz76fprne2tm64e1cg4cf0qu618n6504w9qp9pay6olvrbna8vzczc7lmbrpsoirfbx3pxx6c8fwtbqvr9u223ot1ioqeu0zt3qe0qcpfiiqvu7r5uwwr9xew6kdu1ezw5jnhqkm2y7aui4r76cv8yxuh40o9l7t',
                url: 'cl7ti2ubwgqqpk1yqca9euv8u3i4ci19x5osefrb7p2awrro4lpnm6bwi94g064n3qgyzezzw04ilirglxpn18va3xk5pdlwcuopbbi1gju53hkcfmz1j6sd379pv3uxpfl5rgptprgflm1kwezb94powh9kmvtta7u5d6uokzh9s3wp9qna0bx2ed3gs9dwablv2f2fav05ky9u37jwnhvlx9xjs40dsndq90im9w7cenz1gq6uiodaqhv1t3aotq5ts2azi8qa9lybpwnh08gv8i8n9acf5wqhyiuw4durcfuattq97batphmehp38',
                username: 'u146hmmykhwxwz8qmbxg7o6rxa8xfuoxx8eq2o84crvd8n4miry3wpmfguv3',
                remoteHost: 'qh06d32vtjxo6rx5kjxqb35n3bjus86pu66c4qv28v6n1sfxezuy0l5dlv6vvsgung2dqyzl12tnyvamxwyftilmq47yf7ajzmlbmgbqxjbzv03vmyzv44w1td1p0hmdciltrij3njcs5luhmlmahx20ojb333td',
                remotePort: 8125160016,
                directory: 'qytvdav8p02bea0bbnltyrk1nnw4mwtkedk10hdlzgnmgmxkporl7rr9m23fe7m2szpp9dozs116wt19t2svhljekoxz40xlct89xvaplp9jh2oq5un6d70wg75hgctk1e5yr4j3rkekwxul36l211frho0bkhjg3cckwtb3bunci0nfjkbnmwwcj7bq9hzevwirz8z1o3ckdbydcj5p02xgxev6hvhaddqnhe7q4vwlx82a43d22zou0nda6r4lhcj26vz7v6du93icfov409v5bi9zwfp5537vmtfszwmtzlakej8ijxsdevgtyba4ri44yka3i6l3ur9ccz5u408g2bvl7ub3pqw87wm419yi9p8o7cgz9wa2zou3rxk8z7vf6a8fo5fjxnizv3isepxxn08vghwp7pm0xxwe7mw90sjz411a4ifx7f99hx2kualf9cp03ksh3e2zz04rkzuum2asj0dk7h1hp99969ypldmi0qxohlzc5x1qg0jy03a6yk4roi9761rad7pxn9c7f0nhjil496zjecl4bcr78c876twl0k1l3fk4ct5vr1baulhmytb9ama2nufrkv01e93bk08c60k9yhz9pp7jepghb2g3ytu000awjycjvl7l9j6wwtefcgbwx0g3f4l2gr1bk8z15s8xwvh1zm0es4ynw7o4v9ta0d0eh2f1x6ty6uxpljb9kktbsg7pnqoz0tzp7ukp9yeptprcag18eewcuoo55kpfnfwqkr9696nuek2jkbiteken9e6libtjy5u2mu0emz9w4vibmlil8i3bshrvrkts2n4fj9yprs1dnpm10zrf7c211wgl0gfb6z5dpvstrm5ora9fgfn5w8tvmxu2185zlud0qcb4u6y95glz3vfaelftw81d2nbeiw6dw8uz61uxazwr9hm3qn4jcdhts8cntkpj46yvyoeyioakovg6t8wfiw38fq6wrqrm1p6ok7hyewzjx2kqcc1qq15m1cupleppvddv',
                fileSchema: 'dsnb8pd740uye6xsjkon78l6yd718t8gmell26rped357fu3fokoptb7nbijn1zro6acnczz0sbxldf3du11aq9i0tbybypgvpy66mxcslw7wvd5yuhguogcbt86vawwws0g1hmjfqj9voz8k261jpqs1ndtcp1mnpuj1ww8x9ksu0ljpdhvrocx7phpfxhlzxylc54whxfjxiphk9tkhidjokbtbp3th7z8w9104r2foy6o8lycatnp6j0opzbib3vgfqo7aa9ugdcui96unzf1m47ek35ris6nnt46jbigmqd1jre42ptfqxhufdo6nueuwmmzbiegu50t8ypljaw5m8wbtl5xob8gbbyss6v1jcc3itev2wefz9eb3586fye212qcc9twu94i6pnc2x7dxw5u3ym9rngy8dvmawd4mesizbvgvw44dmm4s42eg94n6288emuk2wp2p3o9oit8xepa5czpp1jrmmib143rjvykjb3g6rv2masqfz8xyknnwzde7zp731zdhycdktv7ogpfdc1oykbdigzr9tjxac68s1tfwkk4fq6c2b1ixv4css7a4sfd5957gnbwqooc203mviffz8qgvmmvb3mv25oiqow07l4ap8zyo55qy0anbv436s7ljx451etnx55xu6g2l98tabri4cpb4ouk6utdwj3oab53dqbjdblhb1srxedolqfxa9creomooi1feqhtrwahnyvpjsyz7culffcefbanldo46edkeuy758rxlnfgmx47ixd5yjwdvdfd44rqstzn4rbi4eu3dssi1bnss9yr82b1egxtxgpa409aj5ev3gtkla6u7xtse3yhiwcsyqb05724os7mw0hyla0cqlbhwyehdac9jmmm1hv7mgo3ikfyizpf5s6rar9w6tttu33zdh68ottk40dh3tdnkg0snb9u374ms7z21hsr1gnkddmrr4oeuor652r3f7lop4jp0wfe8c5ccepg01g02gxm0f73i8mkeep31',
                proxyHost: 's1ee41sg1w1z7vb8tj6uoz8huks0yyel02rncwct9y0ui06o4r2al4qre5gc',
                proxyPort: 4609310068,
                destination: '3qx9v1ulzcwtcy9uizf4nlt9vozfycr8iwfew2w9m77aqal73t83fd9pzm2tew6k293eo32xxvnd746pxehr8e7pntz2c39k285e16m7vc6fbxmcn82o4cnbuazwtcjt754g79zvybb4uhxecthhtkxvs7wfx8e5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'j1ev81ft99wwkknmnep63zo6dmekdq1tnacamm91bb7w3res0dlvlkzkbwel3dzzck64x8oz2n0t03whg5c6j8n7skz43h96f29xn8pilyg332gywzwmwq6eaul76mmpilt6vbt6vxmuv852g0yz8r0yf59h0l14',
                responsibleUserAccountName: 'dlps1qc2scshc0dmd5q4',
                lastChangeUserAccount: 'qh8b0p5l6md5t17yyso4',
                lastChangedAt: '2020-08-03 15:06:54',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'yyqgv87jpxzi6oufaq65xyjcg2i6whkiw6hl1jtf',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'f99doa23mp6eo8scb0yhnlozx3gaqobgj01ij9kok9hdlvuc33',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'z2z9lusyogpiuiw4jr4z',
                party: '6jasel6g0tfhwqgco6ic012f17pvvo7thcdmuytf9fafsv33wa2djvun9omv5ivncdkjtz2nszd9q3dxdrrzoqzkyf5ckyzrkew5266hy2d2pldpbzb170rtyp1viol8mgoqux0ew91nb7npap3ja11tzc3rtww4',
                component: 'h9k70r3pbweh9htvbzibtpufapxpfnr4c55uv6t7yi5pdr620d3uyq9rhr06lcdjqaro2gbloge8ba1lj1yfh1glzc6ipsrnekqs8mvi3c79jphlld7z2z91zqwhjdxykf36fy1h91ntojhtg69qn7iw8bxxf8xe',
                name: '6pzsdc9s67lrvergloevfwutbr1eob9xilcqarfsc8zvbp67hl1u22yidobuyut27t51k5egyhc1dd5zyyeajkk1fbrqmbx0t3b37siojcxkpfl1i6pjsmszhf5etzp8as5wh3i32ssa6n64y2rocp3v0v64bq19',
                flowHash: 'sl4vgohgrgb2cvoxfv40kpaue0h60ywihvnp9pog',
                flowParty: 'jlc1d0rbwlli7w00dbe6vwjdi0ppbbsiadfvzxbdqjhj0tz9rbub13hri4yxikcon2lsqql3pfe4p0ac83offc2n0dpfj71ray157agw4tjhihkkr18nja8dduzwr8ve6d6pr7a872vmqpanp7ccax4uflz9xtzj',
                flowComponent: '7y5j22j03dw9kz1jfccybh701e9sdftg2wonk3x8b27vwaire16htw9wh64pcwco286q7ar9jxnjdpbqiv3rn7e6sxq4a6p3biw58ll7e6bwg7u5rnydp6j7cqjh56neint2d0ouo3oq6u2c70lccevwcdud08dn',
                flowInterfaceName: '4jaupzlgnlr8woi26bhgkznaykvr4uivxo2q3n7vavzlirgxane0uegwp0hyosucnxv5at993uyb58oao76kjf1knghvjqwi0qdauyk3kqqgqbf36fei5o3oubufylgp6js8vqhq2bwvg2zzp2jp1t7gqt5ayf6k',
                flowInterfaceNamespace: 'smiu1oxi5n4oqau5da05unkjimnomcjy1kdgf8g1z7pjhnh08ld5f0o7v8pqp6y0k0v2afmodaxuu2hcz2lwumcg7en8ngwv8mbivnc2ito9a2jvhpo9o4zpn163b248r8j19rh4h045azqbra0mwspcc71ppv3m',
                version: 't962vkoxhaqz7c5a6qt1',
                adapterType: 'dhkc8p118uqk8zm0hhgedrw63qoiydutf9r12kiaikqwfl1e8x4d0nxmvkgt',
                direction: 'SENDER',
                transportProtocol: 'o2ffwqe20s1m4yasbezt80sylsoiakpn980qnoakelfk0wqmknc0pro01vu0',
                messageProtocol: 'wui6dghm22od4mstq5m7jbg1fiw9l833wj991275x69m218qe7jypi1m6zi3',
                adapterEngineName: 'puf3jrnhw7wkkl1fvlq3q7crbgeo2h6afbwlocs1nbmrekwauf9la3lthea3k6em3ue2dhfatv8mdfcm0bm6fi8ri3isma74zsymzjlysh5ry67nbzd1qwme5qwahppwhdvfsge3eto517h7xnw6ogghqq5c3qzq',
                url: 't2e88bdbkmstkzyf1crw8vwup4sf1126a1bjb7uyhiez1y72hm7mx7g4kym8u88j699d2w6jqnc8ey3tx4d2r4y1xf7x4x1af1g1n8ep18zjjcrsaxgxwrmpg620euloytjt5f58929i9aqv7jgtuz1jdgg9wr8b1zvxbw7qydqp832cywds6hzeru2i1zbtp646qt9vqkiky8tbsw8cf6dmtxxg6l0mim77zn136t3vhou5ob13gfoozevf01q0otql9tof7wfnw3b1oisajy5mpn1xxgq05cssvjo1whtz86sx5x30wmpplddatol2',
                username: 'wtqbwgoubo4w1ri9p2hpk4bl7t6jrjh1bkgy9hrd1ymi8zylyimbxpsnhpnc',
                remoteHost: 'mvdj3bd4za4nb7b327czbkrrth7yn2sg3ro5tu1pa3mg9qfdos2tzv8bl2cctd9j6sivjkydrup12njsr8pl9bvfcx9cefigsrrcz0qozyn5hlsjo2b46j26u35qo0zt42wq4twfo2v067o1uf4xpj1fiwhftkn4',
                remotePort: 9735938076,
                directory: 'v8loypejzb8e19l8cd65ueqgwhr2p9usohpc5ytuefce2rpgwdkyqg94kwra82rwv37amsfd0jc4ibjt6vhg0magoj6ixlx8e9o39nyrmhvlwam8nn71bxwb0t2j42dvsufm1oxpc9jlxz32rq24kub3xod2b7b9l1k8l6hwx8mz5kyovdof0i974zpug1i9e6iumkmzbu1bviqq0vi4jo5yl9sln94fgd6090qg18hgi3kptpqdhnfvmivv1dl7ldhaoxh5aaofk2i8m46bskilc6zuq8g4iuj3ebp71e3uvfjcboub8vixlv1dw3mnkm4zxb9ky5y1f7a0wux4awnqo443znk6jdixu4y8bfrphz976cvw0zlslsn00jwudkyc3wpp3olorjyl8g76rctiyclutbh0nc745mazush3rqwyc0b38tb8w4ad1uuhx1xboei01w9g07en4mqjijnln4eyx35maa66cz4q6hmhzlygucj42jf1c6twjmmo16diznykxbc1l6d89vys9k6j5s0udxfsbxn45tjzonybii15n97ti3sc5n6xvhlsqglljeegnft7sqqbchq11hpv94xroio1nkrvvp5ggay5fjfy8r4ixi21d1nr2sz57vdg2ly929ttsim05yfzqyhufnlizj1lnxzvdd9y5u4p11zx836v13yi6zwfnafisbr9u6o5pdef9ihdo78eabos0jhdze9qawpsx969c00cr657xtizy361poti6wc1w2ljphld797t7qorccetan3qjk5to4r9oui7dwgo7zpfvfk7tx4sr41egbghikfa9zf5974sbe5r8l3jxggwjtarga1uso9kwohcbxd6pggyj0tjy9svltjl7zd9233hewryc7amefg4v9hznmf0oh9ldq87jzjhl97tz11izv2xyz0wz6tywbof6cv32ul5kgdidp8795qv39onxxwr7b361upbaxed289z4groynmckswez0fot21w1yd9tz9g',
                fileSchema: '2n2n2gta9mgkbd58wg2bzf8ko0l1qyey6z6asz1cs0d72b978qiqf2dxruzu94liktv4bwp16vy64ed3tqgpqt4k86bkvognamdk4s3uyojuo8pmx97r7c06cl336ysg9pwhledxez3spr27uhbczbbqwyv0tq85l3pemx4tymx7uzyw423ts7qgjneao97l3hp0dbx3lmtfm5ahm83irkesgs4wc9bulrrd2rpv7t0amxz7q6a9xvgkl07w3nxd2ci9hhyxzcjce0mbqfifgx4exp9y5jsg0gl8b82dndszkgg0suvvllcgn7c2lzqomyyyzad1xaoy0gqzdgjnskoujmzm26xpqkrzltsgdnoxywu62sj9cj23cnhsvvdzm80lybe8yewtrtl3dtbc3jy47s1vf7ij3c7jpm3640kf18wopun6a9iirvxn5ohs8vcrtcb9yf210jwiht5s3oxyzswrx2xrgqje9s0xfy97dac8ic7fsb2m9xgat4b0wsbldl76sp1ajqf9dt8qzjwewpkn3ycwnev64ym1ddtrklidh6v6ji6s73i8yxpx4y4tvf8l2gd3gqhzya2h3m6djownqp2lw1jx48ibgjwb5epfoisa1kpdnzio55cltckze6odkrd3soj699c9syqpdioc9eqqrd983kfbqx5odjnu7trjktoiml008onlqe11x9oqm7yadabhnevudrw4tr6vc78tinjgukgm0edyj0ijobphkoa3yz7weecomym0o6kqbhh8lzrijleyltfef7fukirjvc1ty6d3q7fnskehtxmbi9hjn762xq6lbv234mtqllchlbxeto3n4zctmqfj0v8ogm2i8c08uv23oq7gffna3n23l5l90l2qzs6y5hhpcjg0ecwolkgc3mzltfdkqbckd8ghb7mxi42ixjjeskebx0c9hchuv85n30l82iuubygyjtw78uhlsx8zldgcfbvn7c6jaqen7oou5hpqahc2hv1f6bsqjdll',
                proxyHost: 'b6ghxbg5xl06hinypajct67ul3tl8gd6llmxx4mbhay4o16oij7sr1bo0e1p7',
                proxyPort: 5608020651,
                destination: 'a31xypjfj6fhz71299p5mpcf723mop46tvunwlryk3uj8dkyonzf8bkovywc6yh24l8lu8x67e3vmf83lt26tdihum0ouupkh3omxq1lj5t8mshcdu8dp9hd3ng1qzw5yzgdliya6fzxubwej6j7hzbgpcy0yzbw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6mioy2btwx2x4sebukdtnmt1lcgwyeyznexai5d31zvos65pkcwbf0r5zigqt1q0lhuazoe1ur4gnpgijuppdp7zd347lg2q4tbqbfevminpzlmy0edfgd2lmq39b1wts1s4uh3j440jn1imz4rr2c1audjevdyx',
                responsibleUserAccountName: 'hiixi5e76i1i08tkey6v',
                lastChangeUserAccount: 'xpxvovh0g70jqd8teljo',
                lastChangedAt: '2020-08-04 02:56:20',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'ipb6taqlg0qpslueojnksujcrbsyijqppt0big78',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'sc916oz7ajf0j4m58832r1mg97ijvevf7q73mhkyz05rmf81my',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'umc9wo0u8wo89b77y8d0',
                party: 'vgiyltfz0dxxq5r7z741prv0wopnu42fwlo14a8qyfk62vnfup5t486cmytjegpc6qm9ax8c283ozh2gw97sj4t9hj6gpqu2qnkkijkpduue1to73oszjabttmo6dlcxqert51nkmelmn8oj3n7eqhqgmq21alry',
                component: 'htk0sdo0li6t68rz4e5gmbg1a3at8bexriqttor2hmxouz4dmtouf6vao753j2d462jxwvact3gj4kvjc8mqent1wprzq6ved54tdkr0n4ksckkr5mm1wikrzlsc2blpes0lphgganm79gqulj4p1v34v70hy9nb',
                name: 'cpygslr5k5ow104xri421o20tewmotuj0jtdu1hg2gnhxajtlin11k14mkq7e3y1upwcyobsg55e8y5sl1xaqe55f43nf1hfahucpxcwf61n20hph4pbn648lvym8z9lcjcszrtd606mjo65drpy0cypry8cwc2z',
                flowHash: 'fpp13xzfe2ve1llgau4nmhksdjoixsodfh73p2r4',
                flowParty: 'ourei8bcwafsbm84718yd84nmbrwntnjcabl4zru77j79wx4sxk3vnfu43vkty8m0aaduo4audkbrp7djtf2zw9h2nrk5jxjtjatxwliptzxdc2f49lhumafkhhzh14cig952tejbbj5rz6vud7rufrnezs8ajjg',
                flowComponent: 'xqza9raqrsj8yhibvdqjxg7lxs7vamkwn3zgw4kddbtzo1buygaan41dpvzmwss9j15bk5le95xnhrdtec5jib0a3rh1agzp63f5wabp56xib6dodclvatsnta3wnb8q4it1utmtmzy5aod9bfirws415y5dzqow',
                flowInterfaceName: 'u6lx5dbhnrk2y415rqjsduf641ebpssn6la0twmydcfalx672hyda6a0iw5glxe3835eki5d4eqw0h0ebfo83ihedqvki2eo7g2sdjx7p453alf4d65ldktjm01sfpkdbrnjrs2enouzty0u431mekgbuauar58l',
                flowInterfaceNamespace: 'p6jhv7nkqayw4gjp1upp884789ckint3brogqog9ohtn90c6i4cm9l7sh2st9tix9t4z7ij1jj3wc3k65g554ky60rxejetwwe9yqn996linkkzyilbcbicuobkyopd55gaf7xbfb2t100hrs9trdvayuxpim23u',
                version: 'd4kuli5zy8vmo3y7d5s9',
                adapterType: '01jrdlcbgthbbwqgsr2pfs90y7hhxo4y9spd1cfyumiwjyqn2lk2so2dcvph',
                direction: 'SENDER',
                transportProtocol: 'xehv5s1psf08e3y7o6tzfg0c6r42irri2vgiev0f4a3ougtqvelqtnrve62w',
                messageProtocol: '9v7prsvqmj5j1q4i7puas0f4amlvajktfg8s0zehxo5mbgkpb3r5wzbbb4xd',
                adapterEngineName: '56buc7jdjbi49fb4wubxaqmshzgsp88s97yyt4ze4mzi24kbbyh8dtnax058g2vkdjizr12mdtnji90k6r7pptv087aocj97rcr15oohzmhv6jh7vf43xjrgrybrn2enq9q69milqz1dszuyenefms0mbqipzfii',
                url: 'v5qmgqlxeqv42a5oy240luq9mj17arm8l4aj26a7v382u73f7tntnfs8vbir0x7zvl16wv4d4h2a1ag6ldghzkp889ygrtr07t26n5k0g28v2249avqf9r6chfy3v2xltx11tj918c64jsfrkbdwyim7rfrlkpls9x131sbff5eqk7szmlwnn07dsycc9cqnswxxf307bws2u1zbmef5zktdoxikz6u9vqvf9nglyxlhy8rcl13jkzgny43vf9qo23jw1mipnjzmunfr15hx1zxk1k9u1tc2h1rllb3kzh0gimfm5xz4m01g6sowntkq',
                username: 'c2zph6m73y30gug96zvpfodvuczihy9e93t9f2th1rb7l8hm8qqab98n0c34',
                remoteHost: 'dti82vwintdzj2541sy2ncocnh61mk8wc4rpkdgc1gpts46jopv9797nhzy44s27hocxftov1o2aatpw5gma8b2aztv7mkxwbz1hcbp1k0sqnlwpbo532ur9cuvj8rxhtwia9m6h4gjpj4xpqgt6498fkvpf1a2j',
                remotePort: 8009886530,
                directory: 'vuc4ijdonppnhde7rtlkl1myhdwe89utafjp0mfqfm5wq54xdur3yly5hjq88lod376ouvh064mtuh3fkdiufqq7k53pgabidbmq2d1nqm5aj5sk881biesg85ya647rmnu6m3dp2onhvl8kwdyz24jk3vie7ytalnnc7muv65q3gu5gyha5j0f8jguhu057gsolmafacu525se1dz5a4w4qj9hwrz7qio4o3mpjuwh1mygbrhb51kz3enwqxaokb1my9zg3jg2azkdo787dzhblcqdrefad8rbkeoh0n97gaayma8qv2y06anj8a4sth4hz7oxnsfrz1q28b6ymlemhj02p2imkzut5mjetaypyqrwknyo1hmh0ueqpedg7e5x88k8ztmik2lw3r1xlivb7bq915jtzizzt8wnb0s18ejit3u1nbz6w2uitg2zzxedollvf786s4ju27modtprnd7tc5tp3kfkpdjftmfvqjjhllpnzuyw7m5rz2as0lu80jzwobdoskgtywwpib125yyyata0xpvhs63xih160njdo3izeoymw9hql5g85j894gu4jv24soeefbp4ws8agbbkg9qqc77ibg94wjj66szdt3rdx9s4bh2hj9fsx3cwjd5n2i8ok75y0msh7v883ix0ejysevzksned5x586qr9t0ro25tuba0tziyl6z2o0pvpjkzps5g2grp1v01mfb39i1smolr728jirbizexnyr9kuj23jv910mk90w8uruowf3jwnmksh3b13f3tyl3l6rvlehlb7swhf723ues2e9i4nz3to3gen5ff09uu8taqmh6tvdvjy6u875bj4ckgfbkmopysqabf2aqg7alwfjngkk06y2h5mhztzjcpf90b1havqxm2b672rr1zrf4lr64pw1dpzwvmiyb5j62kf441lakzed4s1x9fe0i48bn1w4mckdkr4gem12ac8mj4e7rzt9kpu8h00pgpcpzoxqqi081h1n5guksb9s',
                fileSchema: 'igefdba39uz10b801zjiih76migba9dxysdh65ibe1604i0xfg76sn9utwbcwkj0coo6nyvguzvbcng1b5zaa258kc3xt6odlkwetbfwnzhghyuzs73tb7gifgyluge7067ng9kkorzvphc8kiy5mfl5wngnb8z2f1m4h80j0c4g6g1s6xp0xo254s6cf7kzppsrxehf523iq0jw8btohg9jn9djh4v7navry1oabpgq308egel9zup00zp9wekey9sfr3epv5s8fw31uw0eeft8oom5nm4vk1w8yekt669r6fssjtjacrekvkiy7anz9iyklzbpkch6mao5xh79irksgfeo78z4sylgul93ryblxabua4ited6oyyw8y80ie2unnk09ema3mzb1o4yvftfddcghoenrrft9snaeyraun4o9w65dev196oci533j82hnschplzgnb4omyuilvq0puzapw7lkmzysvgjkze13673p4plxqvyxa7e15aqztjlrl8cjw0gamldqewyzms51dnkl1ytvb6ypyrdn1hqgl9ia9vgfyjwgo0famqxx78ykl7mohtlfzc2or7h14pa8t52tkq2ue9h7u49bs1vvis10ywlnlm8imbgrzf3t17rrnin56oq0itfxoh9ewkmrsqx4oep1gv0wxul5vk9xfxclx1cs1v2ruabssr2lj0pxdhchgye2wv87rkwqcayclzlc6rcra83zvex0hza7620hdcnbw4abhg4rjprwdyzjz909gt0598ygpkfcoskvh2607xcydabjfo5svqakgsspdtyjugam9d3pnfw0nglbtluxdep90qfc80n945r0zrdyzncelvf9rde1i1ho9pax984xnqg8v5rj3rtl9ms96giwkve76t07ze2wf5rtrhbhmfuuhimy6oln0lcn4nl7cey6oqz32rec5da2vilqp2ny0jbcdbmefw18q8lkshlb1daypgy01cm2ek5zm754l3fa4hiveyyvszi9',
                proxyHost: 'x6qzq6dxe388zuaqnnzshhe00f0dzk0p7hab0hx7x4xjqrmgfcaei850p3ua',
                proxyPort: 43958359949,
                destination: 'i51p41s1ph9smflrx6r8w28vy6gfcoomksxrq3b42so9sd8ity2lmbw40pv0ewwosg3xzr869dpccu7a8g4195er0s5tb72jgbh0misc7q8vvq27047np8m4oiszimohqai5u93bd9e9s8ighwcka51cu0bvg9dh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'toi30tgp6gptyzmdgdmzka1g4cb8u9z227ja7u6gmr6spbgn0bollxdlx1nt6z8cb19g5a4613sbs264290wygx44t31ze9ofxawrvwoa0fi7rqtn1c3rkj5v0a6a0cbdp3fty0cwiu4hz4ywz77nyu03sd24l5c',
                responsibleUserAccountName: 'dypz37tc2z4bzepe8d2u',
                lastChangeUserAccount: 'ss1s5nlq2x5orw8x5t07',
                lastChangedAt: '2020-08-03 16:03:15',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'k3csxa1yl4cd8urxod8nl2232x7tc3xfe5vlw7h0',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'ae048f04qvrlwgj1isi2ubybdf18n9djzo9j4ghh4zbc54t95x',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'yq6qe3zzy1l3zw8res05',
                party: '6uzhp5pezaic5tuglgpymj6b1k8csmgtmnbhzdddiyfep61dqya2qn634fqq01lu6u1rolkp8op4154lhfyzfr2hdj9myzulh7s8hkh8fr0nla2y2kx5c8zy6v3fdmnitkxm22flr5l43vjl4efv2btf6y4y7pxa',
                component: 'jkhu9ih0m9dnl9ghynaaccjp1it884anqa92087xtrtaywpck5algi2iccbrjfieb9u15uznmu02bclf37lwxbuxztqxpjpe1fdgkzp7v2mnlqc0dibt5dfwisn3nlpsoq58qx2tt8ne2elr85yby8laob344i8k',
                name: 'w1nz7xjch8b5qzavkekaazn02wrmkebeebh77cu67f8xdi7ncpb6kccivse75u5olcb23hdtdjp87gnbf122lk3z76gah8gw327eerqzvlga513jnhicwenwx833idi92kjzlti7pwq5tbmlgvdznsjos8ef13h4',
                flowHash: '8n1rjbpy2zjz38lcjejirugb6jltvzruweninnxj',
                flowParty: 'thk84chan0r5e4ue4uuef9k339figf6y4v6qyxrovbhnvp6v817przpuvgkogkexpv1w412jj273spt1c49lv7bmhbwm3fgmp2bfu1fs5du9w4iayw4kr8ay4n31wex9tna2nnmzpvbxtnidp18fp5fxr83wtnjc',
                flowComponent: 'jymsz6vfiawanudvw1mrocp7f5zbxlkmltw9w6y525owzxvonmfm476n4hptayow2dejc72iwtve0l9kmv480203d43tyrceqrm1a34r78h2sl5lruwnpalwv23m6cl9ochsuly0qm5271ybef238jgthue4a2u1',
                flowInterfaceName: 'x4vwp7kn8smvn3sssvib5f1rrqggpid5an3ilnpcf9ewjbcv2yzlzrukoomoqtmshht5hrdqm5450gj179cnx2qeylpe9w5orldtyt986zv4cjortane6josnx2cigt3b7u1h3odhn4gpn6v903znz63n829w7z6',
                flowInterfaceNamespace: 'o87kqsifsln8hjp9pz26mupwl6dkvuexlvlsa1g65fxvdrff9rrpf920l5befeji6tt4iom2p0ctbotnj5eingjf3jtsnyhracu45u7s74999ctxv90cl3ena64d7fiym0aiu9k4nc04uiyxouiyzbfdl5k9fmog',
                version: 'h87fqd5noawqvy2d7kmi',
                adapterType: 'z05pw3mezwjmjaosphl6woy6dnhy3z82vykj52hn2o9j4yuqzrzfmbus7j38',
                direction: 'RECEIVER',
                transportProtocol: 'fehleak53h4f0wfrfmk1jle8ay0qd8otnkli40v6wqcs549ijf49kwmfid45',
                messageProtocol: 'kd90vcqr5f5qv2ac5le92uwthcpv42dy8g56bdn4anr5esy2gbxhrc53tfhk',
                adapterEngineName: 'qyu8v1c78pn1x469clv8dqc9v7bjov7zgd41htzcqb64lg576mf042dig7wdud8jkjyhdeww6d4vfb04uo5tmw9gixhumbv6059cgyn23nxjfhjscyu8rtedtlbs3ma3whhcek5dxzzvow8fve78xhy8dkvxkgx5',
                url: '8a09q0prs3up3h79ocwxn9rup7qbuavef3tvs72f1ru0l6r7dsi4nxpdezf0i2wjjy98li21lvj5wwnh2nw3tv24qkw6j58stxkje3s645xjni0it17ebhv0dafkwojpq8530y6se9mya495s0otx1y5zoikkrfww69e8h7igdv5zbs0b2d78uo9wgsj16vhp17gvwj6t269v16hp8rwmf41n57fgv7bainna4mxrbu10hf8vahqjf6nekvkq7h6vb1rsgb2qj5dj0eaxkncsnp3fap7uv3hvhkoeo937ibx7p7qni4jzddck5mat27y',
                username: 'zdanntc4nfahloiwn9d0cyd4kq8nuazd4910ap0e8ruofmi0s2d0nju0qukz',
                remoteHost: 'plm621w012tug4j6kl97u3qgmgb0t8h3rd6im1h2d7h82gcz0gxisaslpvo80izfohyoltr3waifrzovmp9yc3kh5028dtedxnmdcby2tlgdee1bm9z34b03uy6n5oo6v6vn9d525x16bp2w2iqgyfsd6t1r86d0',
                remotePort: 5103419417,
                directory: 'khnmjilgg7c1domwwo9roxxjt02aibv696ech20wvjyfchff1mqbtbq0k1f6d9831v3u5rf1r3nuep4rt79840dfmhiyuv0w7ktr61sbsbm7d9tvp5gewauufzukbatuobxfmo72ig3kkqw9xu30pcotkqnra3ekmndadxfda0ge7w8bt7bclw9lrpqbo74vmgmnhrke24silclhxctoqbmyw9mv6ffro0ppxru3wgg8ffuh90jw2ol27awxyaoaouihyimss1q7g0dakv3it07ux9kndid02nwwhq254l3itfcg5gnl720v633yg743evpgsgedzlssvkev1t0fp2wqg2fidow4ghvevumqt0ynm25wg8eijf5to780zmvbl5ft9lkl7dffem6uw22qe50zl7qo55na59ee9eu4pb6aehhdxpwr51nkbt9gntga735nwbuuqykb7wj2qszwcom3snsa5f7o875zbjm2q9ozfitha4t9e8s95gwzfh3gqmnlckdpbdxbp53jazz8sislq6ijdba4n5c7fq6aiwdw9ocvd2d21xij278og28o7fv8zbxc5n1011hc3wpoga3qdqvpmd3ep1f99gqim5ibxxpusveljhdnu0fzkg6abnsiojf6cwa6e2fci8infje5n2safzu04pacwty3t05s03ks7oyp1nnrsinwblbrmt1hu9sm0d4j3s9nh3va2r8rahakgtwdrmmpzf8oixa75oxgw3lfzn03e97z9pkxe9v5663liq17hgcacfurvyy4xxndmoqw9a5k79h8dlaer56xdonlvpjcdckbmly7qh0d2d341u917wa09zrpb5ueopptj3ar210qk1qt2ow65cix2okqp4yby2471jnp4tqye37848xooydkd09j2lo6fdrdbp98304h446pj6au0qyoz2ecooqt1kndzlqcre824tcja1p28njc3hbbtktcngs5mudk03kn87bualvy5umy45v9sf5tpztimxa5',
                fileSchema: '1jhie17hyzj8mujm28134k07h7eyfob6d1zcexeqfp6p9zgindljd56zd764420br6jv0z4alviq7fgw7c11ajag3oclwlemzw00r37ylrbden7rsjv8ozh3h3srx2c0tcqvpdrthxq4wc3i5h5fnv4yud18lel0weamtyawyoyl6vculzn3m297c5hz7psa32p5a0i06sb1iyur2u9ldxka09xv22bqzwfrqpam0rv23nxfhoa1vc2id5jjxpicpjoinxg3qo0xl5scl08yrbxhmhlo7zs382rwds1oi0j945pl3btvcg58bzmm6y47pji1uoaq4zvf7aukamf0q9dp7zpfroee2yjb0i1u2liakwc86dedn0vornzq0xp7mch1kutosrww87yyfnn5bawn3qoz8qqf9qssjl6axgrze2t8gfle671gjehpkkd41hd7j4o3pwurfsfbbjcxwb4agblqiczy035fqpufy2hp9m3okcw68scayjn5qy28vpft9ojml50ve88u480b2rdpxqwz627oz3174846m8ykjxg97irzvhrdi90vs7yg4n2l8bsggs6pk7txxvnskffocxv414quyecn9hfg6ufm54bj9u34whfwh9orkk82ctn8w1liexls988jrx25fchqx7jnpldkz9aurc9l9c8vyocf44hng7nujt9m4czf2ybo58skxcje41ixznz8ekgkul7m7jemwxuib2nnbgvdei2t7uxtvwibijgz2y5qd8fe7rsafcamjx35xph58ru0dclx2bv1utaovq5jtwbiowe8twpjfwb3pgg9saga4g1dg6dlgy8vhh4wc5syl4ubcrglqx5zvodlzfjnjwl2q652ucke9mrpo0ilnnum4f4cvqaquzwu1s8jmiwsksxvb2sdjn0e0t4apariz97pn0vjmjii5rhg07oiv6tadnzjez0z2gecn7ney7jgehqsyu28t6va9qfg0r81w3j7fgha30qutfbjckj0lm4f',
                proxyHost: '8ft9crbos6poprr5i3q0l65ml7bjp91xt4pjw1nr7k78si0hiwpi1xkcyyzm',
                proxyPort: 5950327190,
                destination: 'n3q3a8kw56ze87o7idvixmeicbiyg6qwx9sc6rbxwtlreqboy9sdpvwenld987woy6jiy33aqxsm29udyji4o7cmlyquebcdxzzxhasrnghpd0xee1sl62pzuyms8kbslaital02rlw8khi37iuglvnwivxmzupqw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'r0w31i4ojy1bdx94zfdx3gyxqol8gnjgtk0r8f57kvlixp1m13z55bfgo1e0fwxfcsmhfm3461wl2a9w340cdfj58pyerwql2ucm0jzg00t096fo70q51l9404vphfau5c1sawemjb32f7sl3ughea6dac0sjopd',
                responsibleUserAccountName: '5b6ycpmo51yur4ooc2bn',
                lastChangeUserAccount: 'gr2kpwbz0m8p4bwqm46s',
                lastChangedAt: '2020-08-04 04:20:54',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: '4ftjnelpyn3c2vs94g87xm4o9ks432sb7ap102ct',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'ca9gfzf5dv4s78e9r6ohr0p0k8owkm376usegwgmjd0w1jov49',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'q5e6bnk3ial7dq1yhu07',
                party: 'tfqsrgshbtn30w0dw6glif2ps66uqipc1t995pdevdfx9cdst27mz317gpayh7nf6bu40vky5ao5z3qhn8cb4u11c2psyzjatkw862bf1n4hjld9jv8364efrwgqe78ctc66gr7ldunimqkrp3hpcwm0sjmjgk7b',
                component: 'k6sd4h9sr2x12s4y5bhyy2mbkfn0xxc08x8utskqccmo5ybkv3781njsz27c8eccofm3et40yrqbg1vkhadcadroi2dpei0pxx9hf7ms0swli15be9cd62ytrdctdwzt1xw2f7an4ewd6cxx0im2kvch7jg7c426',
                name: '1lu3wej9mfjcq0zmqoar01iorn8ns3kvp39i28yyyl5xxhxg1nhv3e22jyn091pmzu9fwwhw2cuo6mpk22o6bhtgbmpdx7g83rjnlzi6g0ck7rzb1kffr95wxvsxll7qbyp1xf3utbu0t971u9ec9j4jpzbxl2on',
                flowHash: 'vimdvbxs3w94565dd5rkcetzkpr4s4wt1ozxdsbb',
                flowParty: 'gssaqihub5860lj78n22291tujrn9f09sldnlsybss83tncrausj4ccx0k8xw1wpd53td453g8youjeaaijbdg8hongagxr0plsesarkljgk3ygaketh6ufo0b7t18miz8r4wh93lrxe9ggz2i1xrkiyyeniqzzh',
                flowComponent: '0tyqmhn9r1q1t1io415aqcrk0d0kbl2m3a67x06bqpfogxopeifmunude6vmmm8e1luqwpmxgv8amxcj0bzxz9xm3uyoyf5ufjvnw8dduee4hq7ynlosruvgl63eop71e4gievpblve4f4b7r17y6te8r8lhx0dd',
                flowInterfaceName: '10pipeawmwi7ggd3a1jyqvniykwbfmusjzwg44kny3l83i6qr76gx2fa9q4amqj13jqgrl8ygidklc85u6zn8q22jtp0smfbbmreo4nbxsj7hvng320qzg9qa4o6ypeb4uwagh4915r7vto78ai2iuyddtm3dbng',
                flowInterfaceNamespace: 'ghq6u5ktxk769esluxhp1emxej64b4ezinp0panhtm1g8yhwp5vtbrpemknjoe61117n6o5yd9tl2gpqg4g20s6yp91g3j57ckykda9wk7g1pv1bw8t9er5eth6burd6quvz1yhzftndln9onnycy35s927uddmi',
                version: 'vrmcbiml3925koo36ycl',
                adapterType: '03n37ufo5rlqo3vxz7yjiabs5qh3q0x92vhlae4b5f515czmughcedvfp8e8',
                direction: 'RECEIVER',
                transportProtocol: '9lfks0thxly0bgngb56czoea6b030d34eg4xuiuju02du3iz67271j0lrbz9',
                messageProtocol: 'a4f0qz2n9u6eo3ll1x8uyj5dxlzbo03wv4vkqjp00yxy095c8qvidgmpnozy',
                adapterEngineName: '3jn8sdw6jtz2aorlcka96vkih18u1c1cz76x9vjj2jysi2cowvcdysv21048nmly4rta3wfebuu8jg7mr0n65genlc63ooxopqwfdav1v1eeqne3bb4sh98iaxv4m3anq7aifrxp5qhanx37cmf7biodk7kqzrgz',
                url: 'row9cnhaqqujxa17rhk0uq9xjjjyaoucmn0ggo5a0kl28mmmvksx9v0wjggvzj645rskdahf26btb87cp90qjdh07e36dfxx850lfnhl6cpp3ln7ro2f7jwiwjqeyy77rado32ndpw074kl0ocbata4wkzcsrt8177q306sfi7xi0vnlpt71trc317lpk5rc184rics7qp6zqqoyntbplhiwy9ttl0yoony4ivorp8plxetse3blupzfr7c7e9gzk0x6r6gwb73v6s7nlmp4spwwatxpmk9uyjgk5za4fsadq88hxs2f4mky6id6qjp6',
                username: 'n5k6kejum5vpjlvgp44uhrktp84rdo8ohg0s7uk2evwtjbg05q2a1bdql2nn',
                remoteHost: '892m45rs921j91hi6dkl5mpqpm9cc3jniv6ddojd7pd26d36d1fmgajr1t2zdmgiqmafbzdzuaql8o6rliagbnvya6x30iyk2jt4b8hnt1hn1arv4yxvx6s39yyunud89ahv3k0tzy47vthcq4ntjtvq5w4htl8m',
                remotePort: 6260971506,
                directory: '97e3si0wfnfakwkecsivtezi8mkp5tt57qh1wio2obgfqgrq5ugq1evujlde2k3q6t3jo61rvueox9q1ofhsr6kc804ecbkkgjsnzevli9goxef9cyd1w1yu192zrg9hoc249u8o0tmf85sekzhhelv3r52y1bauujkq39eqzy5khs0snyl050oiffuwhwa5axgrhmxc7gnuxg2klgfk5cmhks9k7iyk3q7r8oo93jkgc60gjwwbza7eoe5y0ty98581nf84u40zvywt80ph2irl1983pewev57j98wfapc83358z7688c7swcmox365prcsm77chwecvokwmrcaes4j1sff1g6vknid83vpezxw2zk30vko7oqnxxno63wbq33j0q044zj78abuxr06quhw1xtrlrhxzgudz1uvw0eks9c774fiegoycsrxopyonmm01qrqh09svd76980j7adfv8dmt39b7wd3tmz6fotzvqlvacx55cy4uwju81wbvmbbsb7ztlpf7y6ngu7prfdbjvodekomhbhgexh798s543263vlsca1uom5p69xjzfqyt3xrl2sb2rmvvzvg9xccz9zvqaw1jzir1mxzp4e41c3zbemc6mzzptzzue2qvsid1vtqm3n2uealt0rznhzu932px3vgz5dxkna6iz4rraremk0qfbc5l3ytf5qzmxzvlrh5h0fvifwpk20fbatmj0d94jdfpgi6u6xs0hh1rbwllqwhqpev6f3ossy3tb731wilb8p4pd4akjowxpbga9ej16pzxfkk3g8wpytzffi0ua5gwhe0jimx7hj4pczdylaq4hmw3vxrrl0gxm9l0wvyktokva0l1g2qahppfaasnfgbh0qpf2hkp8flt1vror11ngs9xumwlxl12tm51a77vouzdjarcatdrdjxl50olln3cal18qw2kmrzmj89c0bb9m0plg2os12wn9neg7gwmhgr0ocblhlcbd7egdyviz0cyy9q0y9nmzjj',
                fileSchema: 'amn2sjbp2fe2j3yzm35j3rpzmkqco5tq8ynu8zsj7puwqy7x9d6dw4dblm5hdigoobl2nx53h59amno0cynj7tg97wllod3pn686s3yiylvkb48lhi9ic6i01vcfnoik67ufuzkt2wude1c1f5uo9kcl60m0ubeqvv18e350j6lipie91x2rrw94917fh8av3qdiymcw26ivl01j91lxco1yy0bo887y6z9ajfts521dhdu5amjcuejjzucmqbdbibg5f00wa94sk148ittrbk97r2n40evnx6j7d8ebwbyzeababg30b4hb1pcym064csx06ar5m8jfwj5cirdecxtlfm4w63m9z84bs3sx5pibqj1cwlifkm3aovas88nbovsu3jmp94wnb34n70ilmg29hr32rin5qly6k0jtronm2ojd6a60vfxnwhkimjrfg1powiyow98t8m80rf8v5rzgwufb5iw5yjgjfku8v4x6tcjiqevg3wkj8sbz8sezocsatnh0q8c87v80bmz21aaokh7z50fao5q7mkx4is1wd92qor0fzmf7kzyvbm3hinbaa6aevvuz46msdibwxozxki76fczbnp1og7022hg9ln5awdrkh7ap2vucl77469lkmhuh15p6sfxkuup5vnqlu2sii0yz9a306d870gafv8ii9plfyhads2qj67xftwei9h15ji4zev4qoa1elfmtnc8d77oz9m73s213a9j711mbg5jed6mgtsn6u3rtdfi613nfelfk85o5rywj92y8mwm7jv9s2i3tjjoxebnxea871g8hv109opbt9g7bqxmrixi2h29oe4rotle2t4ukas462z7iu5sgzr02fluuj1exih8g0qgn0i2mu1e2jmulzk8puq5nutx3mssvel0gldiu7hprq80d83dzy0xxl4fszw9fypcumqioapwprtz9o089luclmkhh09shi31fwjicobku6sg4fldq29rwmynxj6m956mj1esuko4i',
                proxyHost: 'up55ilentjxw7ht6ohfzgzqifpedblwner3jdnb8k79970jdcz3eykw7k9iu',
                proxyPort: 6610407571,
                destination: 'e97iwxeugvnbj5wtsjpw3blzlg3q1i4bo1uzfotvx5kndv127q40w6gioxozoewrr301pymkqmwvki240e17nn4g4odfl0wqv34v9plbwsrg0hh7htsnt77v3du95ywjs8p55rhcdn47l79nvty3ow5dt5ypytb8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7x0aouhiv0mbzw4ytfgogug5nr2aiuu9fvowp9kkbnos0g1ev23drtk4r95fiu2sljhw1eo3kmxo2vq0tdpas8xjkr1kfjahvv3ivdcojd5p33bxvfimhp31r4j1hi37nr7f2l4t1ai9wyxqhqvg53g3b6fmq57ym',
                responsibleUserAccountName: '8x6z5sv2h1k2jn8zrm64',
                lastChangeUserAccount: 'mwdrtanm1wqnj38yibos',
                lastChangedAt: '2020-08-03 23:09:22',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'jf9huqg7pw9r7ia437e214tdhwr13vrb3ekxas5c',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'z4m9zccnt4nbyg8dszt0d8099fwg5zv216f7wmgoha3pu9rwyu',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'zkisayzv58x05t2beai4',
                party: '1enic79frcem7yaiyswprndr9tyf6wpr55s1v0uvfgh8y0l482tdat91yxbj8afdlz8z3a8zsv4eygu33h43xkti59fw00kmbtcz0ua1xkw7zruashm6i9prwk7cp1d2vcg4sl8fl7yismrmokqcvf6cabzgke11',
                component: '0dukbh66nq7ac41awm48t1je5ghbatya5s4odkmi2otxjb1gpsbhdccj1nhc0kx3rrmlkb2hdb19potupc5crdnb4bk2faqagked4va583o2h9gnux15bmoaxmrthnrhri93omipbwa8sr8r5iun0odyjcdj5t6d',
                name: '6v1ubxjbhbpo2g58q7i0qvj9wlqzxeqrks0pu0x061iw6efhcq4dl0uu88xjiaflbtdcekwuvpu2cipzrecf4y9om460o3p1w7fqqljscz03vuvnvp2bmr1j59cu0brukjsq9m4q1dik57jd45og6g1dlgb8prrk',
                flowHash: 'g3lnh0wlco456v4em5g2165ernmj6ulqva5reszt',
                flowParty: '07en5y9hh9p7uvtscp3uom80puty2ly5x33497wb8nh96eks269co6n17angzqd5yas0sno05vica2eukyih7l5l2xwswmi0qlpblqz8yd1wtojyz79u8lh1tz4yg4v8hk1th2yb67fgq2r1al5qtv1gevza7b3l',
                flowComponent: 'bqyhvitnyuk2xy2sk1vx38hu0s4eom4jx8np089et5e7qug1ryypjp1ssd9loyc9k7gwpqy9f0o1jcquy14kmfwnxq0lehdq0j9258ji0d12klxlw56s4xn2uy9gj5y7d2sgptzyvtepjebedlgq57yre0enkkq8',
                flowInterfaceName: 'ovir9r7kt2yqeepxudhqrsvg57rzu34pefozvycsf9xud4wi0npviw1s8iyeo2urc8yv9k85m5b49eq6j8z19al8qcdb8ehnlswyzrbixvlp96t4w4pq8v2zc0hhzv3u5sorun5rsy0bnvhd6lv4leb0g34q3aaz',
                flowInterfaceNamespace: 'aw3g0mj5ijytmt07d7t2rrfxa6j3f1vq4ism6h2czknrdh1zgngsnlk721j5y0mfasn1lucsauqn8z98vjbaov0jbyqoz05yi8g1swlsnjki7havfb11nozc0odacav4gnr97u18gq4qa3v9a61k67j6ldfkvfnh',
                version: 'ptnh1isdnd25hl3m0m9e',
                adapterType: 'h9ti1f3s3oamlt0ngeeetuhlagefa6zixwzl9lcmpm3q7ye91mp0n0gfsgij',
                direction: 'RECEIVER',
                transportProtocol: 'i6zabdz5nfhu3snvnnw1y5rgt25xya6wbhwsrxgm8zlce1gr6j90yy0mwvhr',
                messageProtocol: '4si129m4l145d7cznbqfcq5o22y9lb3uzehn1rylalzpcgsjirxiwkgvavqi',
                adapterEngineName: '1vxulxkm5vhcnu4pfdd5bawqc8behao8gsq7ox9uerpva6q2on6d56wurxthowlyl995ikj55hvdy3f8rvta7dwx6h1vr6ij7rqvww5e16msggkfhjqamjxpp44opiypc60826f8brqt96j6r8ekn1hf8hfiifgk',
                url: '84gfx2t2bzszaktorq23wgh5wlw169e64e6371vtm7zson14xr9uti2pvzis0pt4temimvh37yj1lkuybhkd8s95a1dwn572igpk9yva9velj4oxvlwxezmjlbl01rcwo1c7yfez73rptfmr6fridp174moerjsmsajlx049gqbz98hh51xfj1t5whlcpep7crgs1z33v03dohhuiwcjv95jeit7a4ir2v0tzl1y9eupn7k04sz5bqekajuz6okk52goj4vwjv3bweg8vbnsvl8hx38xlw8txrep30jeoyex9r5drhho4n05bk2p3lya',
                username: 'uin8dabp8y2uyx88kltk8s3gz93c1sm1uf6dda88fbme1e6kdnelda43xt5u',
                remoteHost: 'aqk5wfa9ibiffanwqb11w4juzeilzwkv1t2jhg8nldtylyxdxf64tkcateo6tan6pin0jllzkhy7bc0goeyzq8le3w84p474svqz1d0t9yk2gvspo36vwgeei0uh5qtziw67u8f564m0la4ii9gx0vx3by091ath',
                remotePort: 2863689764,
                directory: 'xl5287sd9k6c659mys8caiq30euve2lf9qaf7fspa87dulbqtx4n620jl5j8zo7ar2t7mahnwpgpv4877wmvaxenyuu13ic2uj1judwnso5wyoo56povs1lz02zqt981bej1bdmo12tann1861mxkyfktbvu76gov26xhd9bzi73g85i18ltnul8k2zjbp0zoshnfoh0wb1fe0he2obsgmuosnhf7jcgealdymsuomu7x2lhei8l10vnn1rvhk7pku3cr0yhllng45zqjr5pfrv53dkwiulzfw1l60rgj0tzdkipkudblu5boj838acy3m2zai439a75nsffmnsxvtiaondr112fh1jjf9cis4lfrq6sctaglhv5fd3iika7muxq7e2fykd10k0zsnmeu6dxyow5unujl5os2hxq1m9dxtsq2d81d7ebzzwc592it0r78aexmymjqmkkxspt9j34xyq7hnt1pivqy135wph808af003ftylxm25ynkh5whr2kkcbnap2xpkq5dg52bb1s4e1ih5q6bb18o4o4thufib9gqrrreqkp8rvb4r5x0whw4ig72vckqd4afnpbkzbi9bxs4toq9huwvlxn68g0d6c7fpbcofv3zad92ajakipgi4oxeey8hhxvf4v6srvss4ao2ljtgwtixxnnpmswtpnb0dvy5o9r2tkacqssfozo0m2k8hr1a657vwc64lnynchd59p30xy271hn0rd9nhv7t3hwbhyazb2tf0rxftu6fnc857d8r683cizc1bspcc6glq7f1ss8jtujdn2j5r7xud77zjkpclifj2kq8t7s7biyt7ao85fufifwws8adp6nqwkhni33of3vpheyuavu5vipdvej0tndeskri9ayow67v5g0tyr6ca5gm6y18xrfg33ptg28lcnsslh7gwa9mao1ojfdm5wytgks9s2a35svj99alucvor57oucz9pmfaflhjn1hbkn6pg8any30x1jw3yz23bznvjx',
                fileSchema: 'y2vmc4knfgl86phh3igdogldrhfan0pbbulvtpqg001cqscuekc2ydv69f09icmc9v53v6rqfitli0qibfy686s672g9sjrqaeve0p1a6z3pusph7kon5grsoxrk3dv0gwce1rteyf5elf3vl6t72zyklrwckkoqmxex1kk1outtsnzgzfhfwmwabwacg6n05ed17r2vwhwzfphk1ybwvpjydte8wxtrx434ldn97iviif6un0tg1qsz5x92ktkbnrrhmeqqs09hm71rmp2rlvnmaru4yfjsscpov93qlrq5jo0y8l1ca489j9jmwebh8zb5lj567aoou1ocr3c16d6f9ir1v5jon2b92ojhz01vo02hqnkdtrregfntb27yse9ukedqn557mzebzcxcypaoglqsafpy18s1u9r15759dcm3mkdedsnfcb72fd4xzr9tvdowojpntzweaz7x3a5fu4pf64mvy5dvuzlxsjpgu6j5dj9c5tomyhk2roabx6toodvrqdwafs8raikhpdr7k1orrw5p0womiiwbqdgoa5ioajw7qlr04559kads39q4aaf3j4f9s2l9cp7yqicf6vron6cm3gc8s97hfndyebiyjkrxh54ubdpnkj5htkq5vr56jgchdqc83j1n56t40aqzev2hl3z5u8pnfq3mdi143ioy6kbp31y47qybfy0pmcu6vlrnd01kp6s7i8qvjj18qr2w4arijrqpu5k0bw53irzbg4zjms3t5e9jjk742rtfwwuxso80bgybh9cwzzdq5za5txek8ojg5kokezzczcbkhi3lobckxdmu2hlgfiet1zqrcn5ll5k62qsahftgg0rriybg7ditebrm4x8qs30zhtisvb0sp5ro445y8dti8r94paduy18dsge2spn4h37dh3xcblnbydwuzsbuex86mrv6s2annnmgw4lqxyctw7m8t75sguwyte5v4y05xkshre2tbgv8wyasrb8kqg9cdlyfm4i6brdp',
                proxyHost: 'hmb8lqw7v8bufwtd28y1zp287u2nssbewt534adhgfan2cg7wqaa5mdbey99',
                proxyPort: 9896846147,
                destination: 'ub2qvvvlr70f4aamtlgxu3n85hugjlcpy1r8nmv2jr5s2ayvbhymc3vgvkzxddv1ym4e1dghoqok7eit5k9w64kyup6fmejs1hfaw475kc5fpwz3otmw1o3bz6epu1oqxu49d6aip8vid8hdst9r79t8lkcfovyw',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jcxsoreldyg9vxne8dvw0wfxp8dasy83r5isu368q5mc5hblvybu0vvk4ls9vtjz1oiznedsfgsl0uqwyj81gftihepa6e2xh8dc7m8nkf99w82ivr2zqpiimhukc54nfxf0nhj2ykoodbr05qh265qlrg28vwjo',
                responsibleUserAccountName: '6ri5bgq23r1wdsg2r4hxs',
                lastChangeUserAccount: 'exxicbfvfe2xrw1fznar',
                lastChangedAt: '2020-08-03 22:24:10',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'q8dmbsegn8rmuivyad6kr19ori5fj6r2nxzarbvz',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'm2d3ccajtpghegi196d5666lef2bbtbxcayc6ejbai2iyn5ujn',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'ybqnzf3yp8q8sacv9atd',
                party: 'k70xpj6ot5jng2px01lcs50c16lv6pzikx5aajx5ymu70c9pbx4dw5u7xvzopfskj4562h4lvj93e6l8kmus4v6k0v4o544gauxt6htyz0konh5hvvba858btjle84hnr145xt5c6f3rakix3opbthydc057hjn9',
                component: 'dbcphu2up3n4gotb4nctkbxfahgsizwc38pp86qxtmqta0qm5p90g3gep5h96ycld4vtzjpfwqlrt0kypu7aucpt1wpfahksg0fqg9qk0g5hboshg571p9useloi8g3g1u7ek6414py6459hihonbnq1aido8wm0',
                name: 'y4ui08umvf7frhqfu7m8wa3r6h9v93zz8x7t65e2vekc1i95uoytto7xgkgrthi1khkdgk5n1r933r3koi6dav6e0kwe4v85h610cqln6hl37kl6zxyc1tw4lze1gof6069gv4mcjxjlwl5pn4ymvrlof9q236u7',
                flowHash: 'jnduhgtzv09p9u1nscyvlmdy68hiosebhe5s6dni',
                flowParty: 'iz59q9gc3dc8na3lu8hzq2zu45r0l6laa63rdihd1cx130sjwbt0j26fehcfr9k090mxfbjus8p28taev551o5aa4acj22pz14ngyrvaef2wsux7qga726whm08fc2cf8i21pezj0mlbx5oizh6ax3sjyoe9a3d2',
                flowComponent: 'psv88njl1pxbb4qd87gkmspcim4a6m8ahjlglrki22d84mcs55szzypiyvwl5n7lh3rhkebskt9dr5vbpxj3iqovju385fiyr1q0ujgxgy8ziufzxmcl11g4o3rxrrpw4h26cryd02kuivl65fcp7vuqqqyncx40',
                flowInterfaceName: 'lsmjd9gcj8bcvgnk6ctfrr7r343pg1dnzex1hx7vbjy44zovg2qrsmw85a279osknaunog611tea466rrfsi167a4l71v645dxx1n8hwvf57s9po3usaxo9oys6wmlqqcqzphuoltf31fi8224m1hwb6xbnabmwy',
                flowInterfaceNamespace: 'wg0tm7yzl0g8b0r2ziusljtknpual4deo8qyjyy5dmlw79gv3puilhdzplofiy498dzlc99nzh5tfpv9987z88t04a7260j7ptsbzln8i81bdk9mhwynv30mkfagsq142vvmbad06eb3i8jou8v4znpgovgaqj9q',
                version: 'ba8i2gk3lyb7bzkyxy1w',
                adapterType: '53l4i7s0ndl8esac5ej1yc5psfgbgjgselom3ycnmfce4lnpt0zopdfxulai',
                direction: 'SENDER',
                transportProtocol: '77lcerzavpak1y04jvzee2ynfws7356uqrtlbzsvpqk2ud5g7uaypbd77ylg',
                messageProtocol: '2ax5hrl3mqd95uwl659os66ksdopmhui5er77ffzuxy6i0wl4f1fs1l7hbqd',
                adapterEngineName: 'vkfkpm8rdbjjf8hwexmguuv91h6wfduiehloarzfz1z5f69o0vi6ldp46sfqvroaek6hg50q9recf53u4ekbubv9saavocax21ur7zqkreu47u0w0pfupdjizekuikmsr8hoftj2z0g4hez97gfec91c5yzkyk8r',
                url: 'tyfkf3byc266zp4cne02d19bxx93xtqvb1vt6l3w586v51bcmg0rybsqtn940oq1mutd55rsu92m91hr2hyk8ckgg8lhha4blg7mne93cove3nay7ptyrh965cd8v79jvecac8ph44nj7bpho39inexkqut82n959v0cqx2g9g5z5elcv28k1njspola7g4hz9oil309iqdhpg0feiw2e9e7ftur4rao381ltmylxayp8lpk3qubijy3qlp49h68b2vcwilwplg7bbzzlantz5grf8vooeilahtxmje02b66uskwpkywcrcgj9gz3mxi',
                username: 'k3o6mydlt3rv2o9id8139wj6aerrn37fveoxw53pj63gxdg2gmzhvj204ggt',
                remoteHost: '46fv287gmdcgj0c44u1booxs8ie49tmol8uxfvc5h0ogekn4mpbbqb8x3u3dqvcrymp1lnnrkrchx33ekbladrf8sxoaixsggwjy9cuzxlmgkfqopcy5k6inpfbno80mdvb3p4zoyetnstfr5ztz5kagu1vct3q5',
                remotePort: 7310745210,
                directory: 'wo241n5x8e6zkeezu1n5zo5k2xu6mo26h7z0tkbq0dfrzhx855in8t5on9a86g1d6ev55twqp3wkjc9pnphamrqg2lnuojuey2tkyxyf3xmxessdmswddrsw2uoeff69yu99jyjhhr9wayb98br4uwb154xgyc9e06q1uwzwas7y1tjhhe63zqbbj0ktrs3zc2b8hoyfqiaqcp5sfb3d90vx8q1b2uh1yredp4bkhea5smtk3fqj7jkvsvg9shsuf6rvaydusczmk98u7brzx8rjen1bcqn1cyhwm166di59seos7zp7r5clt18lus481ap2tm9d7vn808d2z0kxbxf08ufpjm9z8y6qg5g4g5q2vf10v0knf879comes52kd637p22rqtbu929rpvlezm49o45787iqqgrp2642anamak39mieo1e6zfl4bwups4g7zoqv3wd46xqa7y3vt826aepzva0jqa3m9v1uls08bxeoe69br2vueputsg97t99r5l0y08acg20owngvh0l12eysg2x4omind4l5xexpsxd3y9zzmmejodol0dhj8mss54t2g6wxijjdscc8rjorsgzpedwz4uoyjdo2bckx7g6biw6v87ug4zh20um7uxqqvi1d1n3e15uefrcgjjtdqk6ol6d62e52ka1yot0w37v3sj9yhfjhmd83o00ildhpj90zhw4w227u27vmx7oyqjn7v2fso61v0wp1uvezospvb4jas1b4a2mcav8flkbpbb7mgsxpqxroj7m28l00yzx7z7nwoz0sbafyyncwb65j41zurczr0y0ykrtlrxctc3gsqax78yqi945uu8cwzwuiphbum4gh5p50c55tkj76ufml9598aftqgw2krbzh2sypwmng2s6lmf78wyqm8iezlksk2jp1oz2ut6b6cugpsiz722h2m5j5ypf1jqv0id1icp8cwisdcl4bj1f2p9lx3kh2oiyzry9u2thcj9m4qmmr5yn4w3velzesu',
                fileSchema: 'lvksnc245154fy84vx7bus3ptqxli91iiau75s94iuwi3jq67k2w9av143a0qk4j3uza7l5mvdemeetd7yxvhqw74fyhmhda55xsk2bsujehvmlwte7keaocp6mso28o3mm4m7gjb6n5dnllep5sic5r1q26sdudu9bpc702o9rtuy85r3w65awtmbt4al6mk2zkwzcy420irgskl36wyd5y3tsn5duwrlu8q75g3vewauai1dvlb91a8psdrc1bxjatfb780xhnbfqaojvh6aru84py895wmw9x9t0hhcgvt7kkzhnvd77pe6hbkkrtv4z838ohp5dh2kuj5m5q3imsxbfahpenpme9ilk6wvh2ec5jw7jsq48my5sc4gt7jbvartys4lpihw2vejerdhj5ehyb08idykvyhqfq6ubc52vhaczqwans2t4sshttjrr686ru5p6i2fhguzr9w18gl6wfjj7asg5o4exgu0h8ntyetih44uom4jc1w643oo9y11jdaa6gzp8gq0pgh0ovt5dwdg5dos2xzje9gc3mlu6gsz2576zsojug5bzz0fnuzv7437u9692enzudrcmq8z5nl29ekt2x67dgliiqa3uk3h8y4wj8s61c63nqm9z5d5s9ox25f4vhx3n6vahnk0wtzzujv8hw5io4hkugs7ic84a6pcqj6ua6jeol7xk6h4vyk5krn778mwfohfc8lwosuklzciw6r1u6qnuadjnp155irj36grgluowhb4o3biuuydfjnlqedr6jqqgp61n6x7ei2k6l0gkjeb6k00e0fjpwtg5gpud98ukpmt62f12kd88u0zggrdwquagad85q82korz6gv0r0vr3qn6xwh0rfjry6iscvb122bgvcpy83hzyjykld8frclac63ne46yo6wn99qj9ixucsn04dvs2xd6fek9vevg5wngoslhjulnt4k2fz1wzh6367z8jg7g6xy6p8r7ppnjfek003aq67dcygsj1ibtsf',
                proxyHost: 'p0rhwlclm8730qzr928m9qd0y4d99olrrcbqi82odw6yzi0eba0a5ysw3pv9',
                proxyPort: 4609425649,
                destination: '17mzw0qst53z4lwi9cbpc4yzmxccgvpo811u8k66ylz2ydb9jd51w4y1nlcu4h2khpan1rz8bcem4f3hpy5v34pf69jjfbew6symn2u7bc4fzrg4qbzzaucawifnhrstvx4h4bkofzc12cftwwfvloa9uj0geafq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tjvhpjv4l5hvcuazn3n8sz3xq2vyjhbwm0no5k1r3ekfgg5dtggufqycjbhf76d1vy2qww0bciokefop5znfaks8eyi21kfyeuqmdxbs5f9bnpe4cg8bbt38qsqum1te7qi5qgpg9xv62ozog4h4xrz3ip9srpdz',
                responsibleUserAccountName: 'j33gghh6z8km42eg3ypg',
                lastChangeUserAccount: 'q93rn945040v6q4rm61wa',
                lastChangedAt: '2020-08-03 19:59:54',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'vsdklz3xvdr63josinqn3897a6265hged01hu9ol',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'i1k1v8yg87yzqwr9j2kt8oj6e8cx8eoulqbciott83mejrgoqs',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '5yaht0g5mwjzey20jn8v',
                party: '8g4tmgcz6c6p2fon8tefhdapvw7yheqmyzsp6q3ya6184cir3h1y1c12145brr2wusi3ayrftrpbbsvko2gtgut0talt072vne5nu5ghql7h49kqb78o3nx2xlqcph2j74cj7s5x6bav28cylgreydw1rx3dathe',
                component: 'yj81e8uax5yjlv4nwxkkwf5p7j55pojaqbuunn7p2rlljulco4xudu5bxc4rmfi59asmw3509n7iphz5adc6x3qvpofvqaoxchnkrbzzb6r85yxqv6as1899zv9xr6zf009bv9hnf3la9dp84m3ln3s7upmcnqwz',
                name: 'xg0kk9rhe45473pv8tivvl1ar8nib8ej2vmem4ctmv40dfhl4uauvkvgfotxiftf88merhj2ex5gf0msmtiojgp6t879oi2lv5xbqe5qs1rcqev0vn4kjr5yrdq248vfcjn67cp9yyhreiv00j9wnjbndj2mbs5d',
                flowHash: 'rpeljgbq2f7tffwzs99e7yji9qhgzx32kwaivo96',
                flowParty: 'rcui8j8tkj7gaam4t958gq7gwhk2c8ocl1j67bqxzivm6z5ntlc802rqeypbnzs1cwsxya8yoczad0ufq7s3b837dwmj1a76r4v237xrpctgd9j2twk6v6ywlpzd83x7luf52djuw4qdemz6jgxd4yy712sympr2',
                flowComponent: 'oo8y49e5is39u9cg6qrepith6dprkls2fcah1eh0djlsl5x9u8cdee1zqk9tr2qtpbr3jtfa47kiivocf6uwaqlh0isc6u2p46vgbtf7wh2e63fuhfdaf08xo9qez9du8i1hbof3kswfus94hmowaswde9z7ud5a',
                flowInterfaceName: 'or3j9etuj86bqcwz7wo9s7l3yl1xchsushy9jyeik6r94tgearc401an6u76yivte0mkw685vhkpv9gpkvqyhpfbmagdmn9g9x6q9vcp2n8jvrhz678a8rld6w47ppre38jg7pqq83td3j7a1gfcrvci9htb0qwn',
                flowInterfaceNamespace: 'mcv7zrtu9j8l06217mwpikfuflryvs2wmt8c4pf6qww1rsaf06rta3ow2ao96lt25238nc7h4ny8zt775bez95mqglzau7v19gmbbkoq7egqls8zecqdowcz491gpzyu0lp2mq1ddoak1l65xm3kvq04bis68wzi',
                version: 'smcqmvflqu546oryio1p',
                adapterType: 'i0y20aku7amvngnp6b76feeyhfd74rlacxr7vtwntjqh1a5iwlhote4yifjn',
                direction: 'RECEIVER',
                transportProtocol: 'bsxdyd38c12oyov7oz0fst4ewpu7t7b6s2rd7makm2bhftqf1iomeb8q3a2y',
                messageProtocol: 'xuc17mjw4sed7jpaksdytcpbw235thnhq1w9g4l8y9z5n2lk4nuyyrqe9rte',
                adapterEngineName: 'e842n2dgunrmw6jp8v4qz3ldeg7jgcys5qb2bss57hqqvo3mi1b5cowsfb864r5cc27oeglwtpn5ishgcq913w3inwqpb8lh9k5xcbcjm7dszmmow7hgxif5mdggy42uowjjphswu9rn3h86uzb4y1juaju3ajbj',
                url: 'gadb6zv19lok2f8dubjlu0g0m2r2jyr25hsdal9m2uemfjvgttzr6tgp9333klt4w0x97nsovyo1e1tjhshmx7kpwosqavdo9noorrwo80qk9mcvn5femprrnzf5it84wgxqc1xob15ixv0pdzpc3yo5gwq6x8095ce9iewol438w92a60wobgiuy80g1zvwoknel4auiqlktqhv740lsnaceedmn0npudicqsfm51xhj1j72lmp2jnr99kbd1gn6aptb29z4kagottdzy3e48adc9cpgy71zo6lcpj8209b9u6y9xygcavtu78f3aaj',
                username: '707dc04brmt01xbm0q2pqsk8lb6faocs8y96w45kphku0czbu91zxuq4thfi',
                remoteHost: '18e80yxairaiug3xi0t9vsdkajjiavikjrt1v4xhwd4s0km93hto35wz03q94p0m4uqkn666bmc3wa3xcplc3c2xh3z9zpouas81hgaq1rb6724r2efp2iq96fsfhjihj229rcqhd2l6jquk1lz3r1f0mjqzop82',
                remotePort: -9,
                directory: '6cfmih3bl0ow7439fr6dq489nff2potpx9nc8bd1izco4f6nt43rqtq012ezc8tqulciaafp0la2s9ei04j7vt8fcz5bgu8tkyf2m6v7cyqjdowsjeepw1g61v2btnfx3zcpi5gh3wqitzvgqoklvc65txcayfxfdgsgiqe5eyb16y5nn3szavaivj093azhvyw5zl89kvepkc79wfrqs84fqp9uyw603wfim4f2whdt8vbiklhbj133zkw57gecnzjhl4dsd7wxiqm3y4z92ez3haemq6ab6b7ib3yugvlbmfjqqld83b4zl5nwgt5nc0lqou2a8z2x9pvty0p7sa7c3iv31cgb1z2dpemo23e1xbqjnnpr7rxxyl8st7sog6tyjcgejai7ew7z3hs5tl8yxmwl62lozlz8ynnzn6iayyc7w4qzcqpsijju7vjn92mejo00anm04jyzxh0r97hgrg6fz0xq57t2ftwg150k36g8npbe94kdw7qyfa7nbvicfmxja0odj2787pqxcs0787neyn8kit5o3voxjuj13ef1qgjfk57egzbn3adcppey9xspbwx3pcdpdm4c9v6gxhcu9icimkpxe9lym224lgfv5h06aiwvie1evaapitwlht9bfq8v57zd9mpveisftkkk0h1fa1mm0hlmkpulb4lr11cgjbpx4zykm5h93djnnn2es9u20nq59i5wjnnnx38cxei4a9ql4yqymx9loe2v899dbiw2txang1jki3ys49sjxdlsfy8515hxiqaqbdzj7npmjjdcacnfc4meuetic55zu2ng85mbyaruks2xj1irt0sfjcn6m4chy6wrgtilkq9n297uqgeyhgnz6akfxb1lfzyzm561zwpekfyc30g4r8106svshqleq6faxncvtwwwmsoqigj78frh8mn4j5jeniopl9f633jfsm6ya2pzlbop8ldbmajlivjvsoeiibusrudd1up670u7mmu2upp7xsondkwpcvkj',
                fileSchema: 'vyzfbqwgsyuugzteqx0smdfotwmadq49seq2r4tv34op4jo369t7xbz4dawt4mzma1fpfcaj1e7z4w6jvau1auetsf2rrn8gnvf9jekc0i5p234czes9r99r694ou757pqodzubcqfedeui1zvltyrw76l1n2six2ybi71kwt3lv49acey7s2i0o6a6r2ovee5kahqak65qbjsipl479muk0elk7tznjha1memwzu73ce5dywl40yoykv05xqtd2qeexz9y9hm6qhu1qk0hvpubyyfjnkthm46gwf43jxfditzf3iq6jypxwe6fotieitnbrj5urdb6f5r23atow97q9byxq2qbd2x7flja9jar4hu1yfb6v892hkq3gequ67yv4lvyrnmqmkmd1yqkzffcs5gc2nbwbyxcw3qae3lce09hma6qnrwufleaosam2b8k1hkbhewq9z34fqfaqxkwxnwwvaoksw7ky03rtlvrt2lof3hqz8yjdsum8k0fnj17qv1nzfw8qxffvgfq78jexrdiywy45jp4cxi4gbfwjqim39vdo4zoxog8acq8u9ekbgvbf9x2omif8884tp0c3mebf3zoqd73t20oi2tsh6m5vgr2s3f1443027ci3u1giuunwj93d9vqqynablcm7sxtj3a46burhsgykp815uv7gz6k7u3on2rl3nkoop4qe96xfxqiac142t7sl0w4m8nr0oo78zymoo2klpvrp4h28xicffwpo4crlrhdqiparzmtrbz5me7ar499vgeuv5dpuqmonzztrsv59arpe7g6uo2qd0jr92r8yoq07nqwpzh4h2xjgl3cmmc4qs25bduepaufpc0oljs10xxpnjwaz9ajdto7tw3qwyrpcd0k2mg0tfa6zc91zh6b6cgpdukncfxilvnhwnyzaaqdfxl50xltsk87vr6a65xce50jvovkk4m53ud0xu2c28t6ln55lmrpqw6q7vi9p7jdix5jwbnhavttyxlflrqnz',
                proxyHost: '4v2181x2rwjk4acz8zo559ucwmy8qiecctw2gzw2gwcmybyth0hrck30f0dz',
                proxyPort: 4724589587,
                destination: 'l7u1g0xb9fwoi4e3lgnae1jqwupcvhg8kl6h9zdwlo8m8ekhxreo1ll1eljws3b5y8699c7aqsj2f21f4bgh6cymszzw0f77y06twmtcd533x9cttoxcunvbekziyxibbao3z5vnklhuuzauylky44vcparsci8s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'wu5eku8q1gzrugu68qjw8uyi2le4xrdr1qbzrj8xvx85wv8a7w3ryi2p1k7qynrv7hhksj2pletw8hidznjn6wkqgdjiknvqy800k3sw9jvfuiyyo8x6xfrbwyw0n3mpjiq45e97sb38n0tlbudu0ay13ygutz0k',
                responsibleUserAccountName: 'kgi7si67cuuc2dw9ghd3',
                lastChangeUserAccount: 'x9zir3oth98xs3rv31qo',
                lastChangedAt: '2020-08-04 13:44:05',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'jaxq8mlcpnkp00ts2yxxhn5kzdig8iph5hh2pgjm',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'ik5ri6vpgy4iazctr761z0ix6enu0hkiwcd3tlm6areh5e3ian',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'nx9zgb2swby2im2ycezs',
                party: 'di8e78csm8oihhyvnbqhmk0vp2ana5u2dq8z7cflx71mfiwgop2hsyoerq1q85mn67jeoz5nhzegjzshx2ouonlfi6fcdxaoqfdu2s7fpr263klw2zn1i0ycccoo75446d63f9urdfjry33782vcarl8rnvo2mzd',
                component: '9sg9blwblgd8qpjyj2gwk4eavpzth6f7jmyoyn3bfxl0lh177dgv1dqdg65wopp45p4hg5xil394feqj754nnmhyhoqsemmrt2xidbic0mzrm3h785rbqzuq3bjdf393dzxqt43fi5oo34yy4pl9oqgeilumr3sb',
                name: 'xeljqsil0gle68dla4rjf4akl3zao3zj27gre3ufcmtn4hiiei4ru11bljk720ul3b6jzzndp1t62gh4xdhw5tb36dobouktos9km43jcxdvk13lwimofcxdyxnowmly7m3rvqfxjvjz8e3te5k2eet0a0r0lfph',
                flowHash: 'e0gkcal2ej6ol5rnfld4qadhx07krvdkw4se3q60',
                flowParty: 'jt5qja74ikkw2l8wybjeg84evlsbaxhxpjc5yrxwr6cce8w29eqbxzqnxbg70oy8wnxeuawsq6az7wamn6cwf5o8zzw4nqho4drrbxuak3nrpaz534h9ekohce4s5hoh66lyt485me83k6ed94wuej9xuqtpda0l',
                flowComponent: 'n0r58dl5yp7p8kx6n5xlgscpi7yz1f2h435plgk92llyc0p564w34oqo592yfcz8s7xy0tcxicwe9mjbrd2yao9dsluvipg8j3v9q7zfpe00pd4866mjwki4k2ifyhniy51pa33h6fl1pa6g7haz3r9kh69s77jk',
                flowInterfaceName: 'rzpepo3fmwf18hqar4m00xndpjgoi7y5lfg03i88bv3oyof6optl047rjmxskr47jjukps3t6q4gcz2epwwwy6kqofexht29jzzo2bdrw7ytj2r17wd3r11n1mnvbaek8th9kusm5uryxdxbrguh5nbvwxsh8lom',
                flowInterfaceNamespace: 'i00qhgepwr88daqxv2jjlg4zacnahfoqow7autaaa1nrq693q1j7erwv4e8n8o5huvew62n97lzmikzv9vd6op0dg6128g6tgz07xs8c52jzmb6aoc4gb4regbd37ih7hw4zv0qrxks8w5v28tgnk4r37d3wjhln',
                version: 'xe9t4vsm9u7tzpd68r5r',
                adapterType: 'qlj4yo4xgx5dqnce1xpti0hr621atkq0zw0gou348ymi6busgwg5rmb4s0c1',
                direction: 'RECEIVER',
                transportProtocol: 'mhr11t4jcla7ebi0tvz442nxbd74u5y4ynzuvra7etkz5gr9n15uldjy6ihb',
                messageProtocol: '57vv8t3ztq6t9kapxy1vt5vwz3773jc2uu850cntufwys8x4kfpzdclb7bvw',
                adapterEngineName: 'zzdb9bxe8o286zkokluoba0mhhos4ukviy4etpl19ct71nos9hwn1bty6p2hpcwzbguwbhpqnh93y3j9oa6bqlin1btqns7of2b6igene5stj5hkawkorzhtbpamp3eofznxnte4ep61c2u4bi7mkbcmvto6r70b',
                url: '1bpdbaysr7i67air3xwm5g0ta6n9r3c82u7esdg4t8fsq2vsdntolpaitdgdm5zc3ioaoppt7s2buo0i85mpz0l35a1d9yq2pubeau6ouumvucwan996wdujkh20weiju9ib2jtjfmhlizbzypcws5t9ht7fx4vrq0a03zm4dvf2y8mfmxim634qbs4nblni30kc619c3w0ug56xz4l48y3i3opqoyaio8d7unvu3kin1hb66kgayz50qv1spyjn24wu3yze3q7ukx1py0ak6a3pfhgg9ml7m7unpxa580h8tz9aa0a6tiez6y4lhtix',
                username: 'oaooxnbxbcub12a1f3aas33c6pggm0ih8xvpm4vjwr3jgd93whzddtk46stb',
                remoteHost: 'rj3yuo5dkrjo89wtbblkutstnozlv7oagd6mtnylzogywtd6fpip8btrsot7p7g2ngga318yb0bvu48im8oxd701twmegntn1c2kgdox69h0zj251t3sl2s3mzzpwlmoschth6cf4vz2do1p43s063uk828grg57',
                remotePort: 5426751532,
                directory: 'enznh9lhumlc7tmm2gcovgo812e5i4xo1a8quofv32u6prtmf1ndv8dk4jahr3g2ry101ynpicmxbjxo4uhx4wegj67z2lj4iedo2gcnvueaa719dur3w8wfm26dlldby570dlwkyef58bibjn61uxfk1zqjwafghaq7bndtqlfia5zzq3nh1nj6dml4m3vzl6sy0adlciv5n1n34ocgzh3egip0pk5iw19h7d4n9qq7afsizfl73fln80te49wo7vso434iacj9oo65bwpx42l1t5qnkchjac0rg21q9uw3e9mnul3t7ka2q7bgilmupyi9oo63hdgrs6xifo608mogd25ohg9jdt2ldcnro0kuilbb87fkbopaue407v5eopu305dcjq812sn9df5qluculj3bc67xi5m9ma18d7is64oftjsdr4vc4v89230yyo2pa2deuneifqkska4qegzhzzdsusx9w50fwanyh6t4iqpmays2iktupo35ei8nxs0baq5y3u3o818y8qnqr020elkitms1jch0u2z7xia6uw25h4aj0ycayhiivv7fz3psgkhcpi9ryssgbfpni301frrn3o41cy6npvt1n3mx3fvrj6kbvc53z7nlv8vrn5cm1adx41qxfxw692wzdh6759snol3m7barm36eo73ng542qm9xodmut6f0fo2hv3tucls4plqyeme2vy7m1sye7sc72b5ddfy7dt9i6o7ixb1k8zcnavk6xgi19xp0gxcv1hf78ve0jw1yt3g2auj73ts6rtu01iyph7f20a7bxyk049ja73kdbqgtc9k2pak8ua5izgglkkscrigdslntf7r84womikm1kvpwxfavrenalz82lqzomffl9dnu8ib92uymvo533y5dwoq1mqe7qds6zjjjfs701631890bzfs6rne5c81cmjhqbesnlk20gglhec3eld2jjm0smgfym52opb3hao10ov0boxfjbmj4tx30766xz00vxlqy',
                fileSchema: 'robne81kp3p0job0v75d0hsiscrtpxxxvdk8eucj4q0yujk1izrkjnybx33awsrad6j6bybbb4n7tm43usols60epmdhx0zqx58a7r0at57cs58pyeuef6lhwd0jeqcaya42jxvltf1w9bpd1hi7b3kiho65rspzcn7mzvc6cckhnvb0b7dz9g8m6yqyaffxtqbczc5c6jmvqkzwcwr10g3d8yh64rb7omzsklpumr849dltetaw8k702162yikalla0yjcruowz91e6pk5ds7zddfqua7igeqs0kirtnk2yloinmq65afudbzf5drx0x6cjhc8rf5dxr41t6h8cxrizb73x6kl9ifilig2cjlnzmlxpbj9h9ek1vgu1eg0y73zlp9ns5o94uci9z7igj6ne3xh21qedto34pgqean4klupf1mb20d6x22w8lquotu59zvoq03fjf03ci2kikbmmy92sh7ooj0la1eu3mjj0u9g5a4aou8w4kcuuzsals8acijk94exs1txfkgx8cr2pbm9g2678hrw4jmgc0i0qegtggvl0hhwjlao6seujgbvbqm5wn6czk7pnec1f84ywdae5i3jgpfm566jidtsbk9f4zcm67sm4x2hha8t34ks14h3r1ew5zv1ncu9f0pb64f48p63b9mekahcrvvxbmg91yohg83tzhzd6sgbdm7k8k78ji2a1t534j2qekr3jeshwfom9puwq20aodb973wzfiyegtrm27o1zdv36i7dpx93voxrhypmxcb5kd13ru4llzeyxmm3z5s7j1k2mwg9ltvmas9nkzrtbvjssr0udl504j1lt97kqrooxjuncl6z2k9innarsqur3ybjhd9g9xovqi6yx9ugervgbdw93qtyeh894d77albehzyx3f7cul1mqoyvrf4c0771m2dddbqs1893cr0mvc9rvemts6f67cz2n8djexpckswogf0of518op24ezmu6gnimxv8nmvkliqgbauv0nwq4',
                proxyHost: 'hpmkbvfo9h14wridmgbgetjy5nn70h8mkwd6t88vsl4ogg5x4ktskcku0xrm',
                proxyPort: -9,
                destination: 'uzknlw6qwoasjfz5078950bzm4tirasg999wr92h3lapqj7vlkwlieodg3gba55a8snaqoaa7zyu6xbw4xhe0wev5tqxn8uvrjitbbra0im80qdj9whvusosuzyhqn3tshb62dcpntkx4kci5dgerega8mckn1wf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kob0didae7dbu3fi994lelku3485i0nzcdl8ijvszc79lz558ph9u8vv9omwl5d213nzcrochlk7xugqoha28edk4q40dkpcx1hslhq2z3dmk34l1bhxy77hprw0lkchmktsylch9k0jbljfzwwnjl2b19ondb6e',
                responsibleUserAccountName: '2gxqffsen7php9tcbj6s',
                lastChangeUserAccount: 'pm0ljju4d4sdynfnrgxj',
                lastChangedAt: '2020-08-04 01:17:50',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'yzg8fl9kj3lal3i3rr84up0t08k7yc4vqvqbmjfp',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'lslyec4lwst75bpik143bjf4ljll1to65is9qb4kl2r31rmr59',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'hny9s6troxkeoj4s8tsp',
                party: '3uqjhw8kg5esquer7nl6hq1cq2hbxvk6ik49y5zp99xlat39477yflbvuxqx2vb1ie8g87xppkfssm3h9aiavxewgwqfpdi7t4r6duxmrxtjaa5rhy6rtorfqx8d8068d1wt415hjhi9v7ipzez58nto5mv1whjn',
                component: 'i03pzvp9pdzmsew6ob6m5tb2xt2d7g5zmkh58bxzbs855g1yd8vioh3b532lkh3ba5uo9amwgfd74kf9u8gv8lgbwk6ln09f1j0ym7xd240d95q6pa92cmz7xmtxihjz38wp1qo9z6jzd0b4i4fc9sw1yw158mwj',
                name: 'cmvnuyzsovocdyjfk5z508uz9qwrwnj7a8icwms7h1pjbkgla0d5ehjuw8in13xavgbfmix0jlcz98dg0dkybawhc4ynwuc63qzcxydhthjoc0853uxwt2guzwlrkox05qukkgl6xnvhzcy8ev4e08d5meo90kfc',
                flowHash: 'rrdao6wzo0u3o04o6vca2eumz37i8gkn4dsofzrp',
                flowParty: 'gqx83cfddtqyy32swwoh9r7hd7j6nq6q84ukwrjwrn95gq6qauslknx5g5mboe36kaxa6vx37rl596d278bnu4g97kughy6ni576gyx549xmdol352pnut4o42h9zoq342aksroy20zc7spjsohy9ntc46fmim90',
                flowComponent: 'n5b6qxqeqihe4onfhvmqzbrt0w2or7zfstlor2kcjyx2pzbczuzdjfxb5avfis2tki9fcpz5uxrzanaome9lxho4cnob4of5yg3xpthagt84x02a1mpuqdly2x3xpswsdd80tj4apsvoxlud5s9vl5zxxxp42hfm',
                flowInterfaceName: 'ieng5lee1fcisa7ka336xyo22hjiueay47g0er43jd31bhjhyrseqyw08sw12h6g9lyeg01akpmsa9q3isnoopp2gra9yxfv8ds48964szh3twb3dlr6ruvpfj9m70kfum6lu2gb5tbqjard930z1m60i7epyp85',
                flowInterfaceNamespace: '5ymygprlbazrgqpyokwpqvw7hcgqz5pivqbihx4t8b11bapbqlv24n2kwwtu22vd7fcl1kzrkyodrz86x780ct16u7oggr87ivhpdxkg9nsrj9mielupl3zwf0ftr117dqu09ullx8jbqadykbwiu6uzdttmcm0z',
                version: 'sa19s9ulloo6l8mb3ld0',
                adapterType: 'j51hvujz9ctjt700qj9np12b8y8gh3amg2m423iyddgedyun70d7isvggyxs',
                direction: 'XXXX',
                transportProtocol: 'gmvhy4voapyng1g7wttjw11b01h4eodzidfprti7qbs6j90da77hns1gyj1j',
                messageProtocol: 'bqi8n1qlk68qth4e502pgen24gg6t3x7hwdsjgd1y8av89jgkafcjch1jboi',
                adapterEngineName: '6i88q0pnps75h1kkmhnk2iv1o4dkgffzsonvfiqynt1kjo9bzqzwjebn4pqrb6ay7ns5zt7iwv0na9woj0ttw5ye86hb4vgeyqgd2nslaqcxhk2kdhx2hl58veoamg1zqgjme9nlom9vb8dklcoz4oi5usd8okrn',
                url: 't9e5i2hj1tyts88vk4z9g6zrphni1tvllxx0cdcsevclna8ga5g5urvo3izwp1e6c1jmon9waxb4rf5mjlc3s6qstifuzuyxc5uo1i7kmov8d2rgd1cp11n83pcfyy4zrzlc5qp1217dm6uawis2d4d93542y9usb7qxmj3zak4lxvjjk800nyulddmlhjb02qpc0ccbl7xm0baxe91kh9uydj7p4cl2ds0se48lncc49qvuev7r82tojh20qa1mv0zf74cxt8szg6690lyvylm7vtexvg0g0f3x6xjmky6soppye40qaka1xbv6zatj',
                username: 'itx5qpesna8oz0rjxv3yoy70d7g2e9v49kdgefc3zpc6uys7cv8sw72wyxs2',
                remoteHost: 'afxwjqhubr65mfe2lwd011691z237osyhmuq91ljhmtcgqfxz15yd76d0v611v8qq2snfb4y0nx5tu731f0n936pvtlet5nekckrz91bb7uw8a6c02obbo46wdufobirw44ww0ufvw7zlvk00sqag94232myhti3',
                remotePort: 5286634501,
                directory: 'j1vkecb3hznpi6cnio5knimiq9xc9ng8jlhm4wucdopappgy6e1smdvmzbanl6guqbgqxos2xv8617c4y6q6wcbybhr463nattmbykm6jk4t3bxx6zx7urlg2g5by222fvjzwa5mewc039km6s0iwayrp6n25quqaperajv72frjogc3mmyr2ufng2mdtrx8896m66rrwlwoxn18vzljw8f8n4rkphd5ttbdj8v6dobo9hvnhqw4bntoe0abz1t5fevrzg5181a5b7fndtum6ap9ujngsjg5o99qm83x7w0iac1skc01hygaiahyr2nfi214h2dd4rbwcrw5ybhjcw0vu07d3c85hz2u9frj3pefr4vefvqmuxkse51dylorhpx8hzj6e3y8kicva665271074ukqex74961mppt7bjhw359z8kqes2s6gowwbtd8lmkk4sut59iv4vhpgm1mq6y0r3rmvdy07nfqmx7d5vz77icnrbqc3pebqd3742ao0jiussyx3lbhx7vjevjpx5r6bqi9ah8phcyg2ovox7621987pfdglyhr1ae0suwms8buyh9d60ywaeigr9hdsealk9epavla9x30pj4sziy3x3d41wy0mxq63d6alakd9kfbh75tpn3tqjh6pzwq7vmgzh9wkrfcjn9835rdk6owfeqdrov1qmf1b23qioatkxmbjacq1a4q9wdby7pzny8pj9m6qvn4o611c65ezf56qq4zgkaqkz0ji0c640g1857bqv8cq3amjjhch3yx60ynsxy1pmw0vt1m4xz9mvnp3fu5zp6g84tlkj6iz7fzgjkh5cpfo23x2v7vnimg3bc9q00l5rni85usmftr6a3d2e2g4lw3p55rj0srrawu1lasw43iuaeflfdt5x0yu0ofz9nw4128qv6nckfzcsw34pxtt1lozaosehdfbxdj3er2x3oiiy2xtjuxxg3z3nl9zyqxp7coc1wpb4d7i6szpttybryr8zr12bz6eqx',
                fileSchema: 'yp722xvui868mfbnsi6grewx2s3czy90l6svxxba8a2prda14jkyjt7hwfscjhi3xxei7k5tnhhi0sfcy4dfkkeyeo0nktt53p9hy86sctgwimwyanwertv30xkp1t0bi8gju6nfndezd45afpc4bnqt0ansrt9we3y4pye3dj4d7if4vygut7ex5g6ksf6t20ifxbeozisrj0cguzcj0grut0uhv3ho2ssnvqrmotzfv3ik5u4utvp9smjg06rcigtpweh7z2gy2ybrqsadiy2vnt0voxa653ub2ozjfjnmzy505v1uihzwsd5plc431nejlf05vxdjvibk43iyqvegaawewkwgs59tfz0lfop46vwfdixw350gbz4pg3zjkr5qkxw71l9st7z9teia6oqveeyae3eg20f1l769mykasybta46dz9dksxbdw5kmf6snwx5qrcl3hyxaf1wpcuo04iyk31a6y2auc928brsrjx8v4fqz7djv0ttb3v68pez2ry0g2t8crt07hn1ppw5wp6qo1sesp082lgv0196cafrkjgqfg4bjah5sspsk3041lu3pxwut0lymb6hltrpgn79zeagnfnxs3ycokflayrgjk0d9pgf7n8ud9cx6drdi2rml5hvycpafcz69qztpphfj7euxsuzw92uw63g2isu5sbbq62qzn8qomxzfcxkrcngph68a9yjdop736vywgao73shd07un567is2eco1xl6qfd8qiim9t5zyz36bygllcdrm0oj7h7kh2znihnd8gpkdxj0afstj9u9ygv6qhn1u4xho9hl1pghscef9cn8f69abq60r6b68gm5xjoavspozthgzagsal6w1le55gj36yemo3k0jagip4tv2geiqugsaq9ll0g8n7ywubcv6u1k6vsqzxvywlmh8plaiuuhlyzkpgjra5dhqhxd2y00do8kfip0ubijlix8ef1hf4h4denca3q4cgfrnkigsi2115htqvppm0zpxde',
                proxyHost: '3pjy2moisfwb5vfbaq4n78wesegwtbiwqspg8ceijt488ilizb5731g5n5yy',
                proxyPort: 1896163941,
                destination: 'ciz5cfo2es3eicp9ubdpibd5tay05s0cgqfi7nvtqdh9msg4ulfwm1owozuucb6g0e7knx2u6mrp39bk63q68ir5or6om5vgsedtb6somhty56dw0kxj5ry9ks0xcrcthb4d7mhpm9q24rpj99wkz2zpxvb98xf4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3twsbqd1dcek0wtgbh5enke3s2aelpi2lxj7ahzmqzeqhm5n6trtzpwufto5jusl7gojt2yx8pijc0nbos0afl25kyu8r6juuxu3z9ih93ru7gpfkaw4a4hry0c8wo7okq88s7u3r1qugj4jlehq8qo1aeu4kpd0',
                responsibleUserAccountName: '0rln2ungy4glzpfpjtuh',
                lastChangeUserAccount: 'dfy5nsy640vy5vuqlj6x',
                lastChangedAt: '2020-08-04 05:17:07',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'itqi67f66s0ecvc3nn5byr3x3fvqsl09875055y9',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'vlkg8seejkafasjg7ux3w8oh0mwqodrjmxuxrbw1w6rrohj8hm',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: '3rv5ohqmixrbhkv8e4hm',
                party: 'cw7ckhca85rm3q4cdxywi291qewnbnql0vx5pn1hfxra1qo4u1ba8iciuxt8zggisfcdk33vzzjcf45oe9k88qt0l4nv731gmjfytraovndk92pzblg6thawkfxxsvrape748jswcgls018rhu8s3ie6pvhxt2ev',
                component: '6u8guk1die41f4ug05tkxxcjgku2pp2ll9ouynqz1gqigfi61fotyf9iixpzrbv4f3hgnlcigilyg5via95pv8x8lv5p4x47tgj6iso0ghgzx9txs5ubeby41tz7hxif7s4svrdkm51lgu5ejgig1auut23gm0d3',
                name: 'xqzaj56d1wn81iporcd7lvlx9asjd90u0bmtai0xlqp3fsstqpq920ky5ef29njcpchudifkm9se94aaetrf6bh8cqzr5obmc3yuuhxhx9ooricwbqskntv5r7p4x09li0cy8wj0qd1km0l4v1glrrzlk9cfjtta',
                flowHash: 'piahd1og8vvdi8o5flpm24y77nvuvxpw5nvv8c2t',
                flowParty: 'n8q86txlmd5vryju6y08mx49508uqz9c6d56rxamfotzie2j3jifeo3t2fps8nld5yegneqj4nsztel2jvp9zwhzk3l5tssh411u9wfu11bpbtzw6n7r1kfb41hg5t31fw8zet9r16edpbfgmv9478ta1r1zvat6',
                flowComponent: '6al4o6esp5z0k4dfflflw4okbidedmxxyay2zeb75z3cq4nh9jhf8m6dg36yhgox4acq8klaq43ttph0hq6hrevphb2by0irqk9b2ksyzsn016t8q0j0dqizo37r72fhamxp6len7m2torsqyouneuejlr0er6nf',
                flowInterfaceName: 'lrfyaap9ab3ub7qvcszm5lntp4488bl4fnarw60kimympwjadmvgalg324l4zib5j2dprh42jjy6gbnk0i9tgo27yx2ahmx8hlrqfxtly8b752aghombbpf87vxsvshg4pzefznpskpwf06ah5rk42jwdwbn4lni',
                flowInterfaceNamespace: 'sec787743ei1chuoze4hz89ylsgr9gzimnqo5sdgqjql7dwda3bp57qpd3ymx6qqoaai3e3i0hdydsggrkf82lk7y1ff1io8fbwp9uuitjfarelhev56430ejrw1c2wjgbwzucfggjizob6sh6zxsmwopxtdqie5',
                version: 'b52c6coj9xzp2ui7ia9b',
                adapterType: 'lhq2l904axzeeu2e392hmcgkj90i1dirq7afdckgsppvo7u3hgnmwa2b6nn9',
                direction: 'RECEIVER',
                transportProtocol: 'xzuxcqjjub71yz86gfh6qvbd0y59jouimmsfayuseuyq5vdhyisrlgo90u67',
                messageProtocol: 'w4xny8ge1yio337dpz1j5q2bo7g262a0goph2u6in5wc6mmnwz1yur3ugpbv',
                adapterEngineName: '3k9dkjjs7lsz204lg4xk2v1ov6z5z3c69aa0yw8whkaxjwb4p1dimt8olqhryxhnbpbb57ap7hr322c5yj70shllko9ah77dwdjnv8lejvihmigsrgroxvk5t7nx1jfp7zj15yyc42n0a8glyqvvif8qc65doyov',
                url: 'p5rxgn5weih20pkbaawzet8qb6im3fa3hwcdyidcdxug6k9gfr33g9lh8f42hu2td4xv5q5nbi0o3h5ytx8el0fji4dsgtldqlnp7co2tifvbw1chbjrff1xipzx38wh1gco1261wg1psg2xc638cy698flsh7672cectjcovwinr1mh662t5x7z6wboxwya25c8q4v7fuwk40wzvgjwg7sg33rbzn0rqvthftyybjqhz4srdlnt087pixg2t71lv7xypr4tr9cgcpyujxovf9qi4tzk1z1idtaq00g0pa7sbvkaduu7lefwwk75tmtw',
                username: 'gprnulwrj96j4925emtz91acpikpk4qavz5pdiuf02coonpeykaaetk8cx8y',
                remoteHost: '9tt5q7x4rg23eru5oomnyqjy3czhgchxywpmzatge4udy4xx0f9zef1sov7hw0pb9r652z0hghdaatvxa7maewz12vzytuxvdhezzie5ggwx3gqa0xoehnwgi1pa2jk9qt9ngyht25macebzfbyc0puozly612pe',
                remotePort: 4273828120,
                directory: 'u3pyhf60xaz762qxqur3xqn2o5j9jq8uc4ydm3vr4dmu7ak3t6hul2us1pmu7afxldw17vrdpk5c0d1ivo4bdpz5p548qdacei7ftqeq74wy33dudokx906kdervf319sbfv1lg1ajfyeu7v5in9vvmxomm007eur4sd5sgoshj3sc06bglxu0tos8fvrue253dhkpqgnpcgs1vvddwarhxiwsdh6js8bspqonr23ancfis8yvf6xsap3yrzprun05e9hyxqupn0808nk6jjyzqd4xky5wynsat2aik4t2ki5phjfgaj4auydmd8spv912msd61xd30oofjag04x99et5ugiwiz9ciq1tugr9uzj98nmf92u7vp9d7m4mlerll4v37fnw0zhtw5lnzgw2sh25f3srvnb9gi787g5x6w666x860gzc7ufwem29b2gficj4dzcicw4kpiii994e69wnbt328s1aydv0rs5bw8y2o8rwikcgq1u5j60xbxlugf0xjthus5xuvn0qynjuq6qai1h9xzjxxzdf6o63orkm0p6agt3f7haetjm2foa8ehdl4okhmnqgl1ndewfnscirlj1zeag6yxcjq475fb7kcmrakkm0hgsv5y8n0v43i623hnwldfpcl9hf77ccmkehxdmstycxy7mjqxiv93hct23lakj93rrhreu22lz5yemv0zb3tzhjhx1h3xf2qwwgjljsd0t2bajcn32yegdnx0egs72htp2hv8lnp36tvf2up6flvfu3qjstg2vwv150mk7r8fh0negz5l4ticvdhlcln6tug88tqiyh9qgu42d4s8u4mhmlhw474x3optypisclc7ec330re4a4kx7ijt2c7ngt5f82n8z1p1mj23d5lftni8qcnpe631ltuj9xctidukbtnmhuks50qijcufxgh1ploqkqbhzmiyi07dn1cpdut4x8996hiyk4xolexxi28t3r89gonwks0xzlwkvlz6sm2tkul1ph8m7',
                fileSchema: 't88x2rs0jume2hlrj5lxnwp9jjz7972i5qasyjhxwj7h4qmwfxpkkx3uarjdprlekzlxwa2eqkai4a23li2fgs1y6o14p31zoaiefiqqi7d7gmwzf6rds20os7mez29n2e97lch3ta9umc0ls5ihm9eknqtxzqv2cfjoewbd3rpo70pz2422dtcvow3wk3poc87hqpt0wvxhhowvetkvh2e6vvzgarbigt86ud7ujmr6enzxbmvau3jykcbukxpq0gh42xfbsqmp16rivx4xky136y6rzrxdy8zioj5sick7zhd1tmvdin4tyziilkb6vwsaocwd6vl17g26krrcx95btnd2kbylmr11shv1funps9ph6pbh0hh49lcs7vckriogi4hlfp28mv3jt0j4kw8a994rj8zl3ar932vlu5r6214sp0zoqktr45qv3jc9ew27cbv3lqf71lv5nb86qk8a5jm7n8oe2zleo6xszzy8hpqabgn3uvldjh9sb47zvrfvoz10ne2q0782w2tz1scr6jiq8s4j0k91ft6ij57aifwmz1u7hoqyhpanhfva73a239hytaozufgly2i2z48qce647xv48qalfamv3iwb257hieuia0er60r8yv3lk2m0fzzjw01qq1a3ds1p3vlzd1fu2acenhob1qn1mkm09r87ux0ijho8kufltl5kmfsxv4ighueq5sj2zhkqrya4o5y1gy0huchpzmxrvt8w0lythdv8tkycmf46mfmkd3fjabehrgfszl693lhm74ed0h1v049m92zzy2vwwk51at0zbliezisvbo0vh8oykuxljvl8b35rft182migy59qhetr3s3a176ee1u22be93nuyltlxbll0ka6rfht82jab8f5uszxv7pj4af9x797c1d2jrurjs2pu3w3pgy8s1sbl89is2tapwspn4fesm0owpkuidw7ob8pogkeh5mqcs3kagujr36271dnhcaee8c5fn8q28v6h6d2ncxnz',
                proxyHost: 'fo0cyquwz5dxh0a6zk7xqzqjxh9ua796z6ooop5y2i5815b2jb6y40np3g7r',
                proxyPort: 9442244077,
                destination: '2n3s4vv55oekgajtdertqlh3sc0os0hgiu7i15udkc9hce97wuc18qzrbb0arqrynrhfrb13xbrcyhx4b4i3qbsfjywvn2ddzdtm55mge7c2cmx7xespx8kqtiktg2g23swmj7c2tfgoihovqsmrdqb3gmjnqhnr',
                adapterStatus: 'XXXX',
                softwareComponentName: 'hmn9yrxz2irid7uri9ny1pdvo14f18cjaw4d5ag8bkao6oetdsragl083ktb9w0pcps23ccp54vncurap4ml0k2t5qml7c805aloyxcymnf2a1hmue4zj5e0vibbjfwvj0h0gcugcw9ar5e7xwe946hp6kwecgnq',
                responsibleUserAccountName: '08zapshe6dubct1h0s2f',
                lastChangeUserAccount: 'm4ixu5u23xvuy1vi6v0v',
                lastChangedAt: '2020-08-04 00:05:07',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'bs8ge5gym98dv1rx6b7z9u753u7r4zfb538v6ql9',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '8yzy5xks8gs5889ibr4fkbakcmmte86cgeo69t7f97qlwtll26',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'hqn2iqb36wabaxi37mfv',
                party: 'htbwh36jkr3cky6e0rouqwn9y94w566bo8sb50876j5pamm8t23d1algljbzps8lf84lkpfkwj19k23ki6wupgp15s3wrpu6xcjzv1jqcoy323zybuyp7mrtn2cm2fhxgdezkgcuuuviqz3p9l2nz9afzosiyhhy',
                component: '833xlzgckjk5sizegznv1v69zixad71vpfyugqzy5rgo1qgyzym4e7dqgr8y34fxu25rkcd2y32fbpq2n8bqtlirep5e9bxf95ez7r26vt3hytjm14f56eslyrg1xyt3zxrwrsf1g3togvewjsnuy8ymq1fq04us',
                name: '9uwk37e7z3u2623e4x8tjfpmyb00dw55rdhh7xs5ogjni93t9bykm8l76jx64rb3jtclrz01gdxg8fu086kdutbja0zsyhk62cr6jcvdujy4n2mel6ljtlydqerhrowg80c52mq9nr9mwcpbt4bf6m4nynuk8ask',
                flowHash: 'qkwoocth0o212bv8x9049baiush6glt8chwvlo09',
                flowParty: '1q6sw5gtmvm06b5i1m5jirlteoiq3ydr60zwim1nf2n5zi3tyw59vlhfockrl4bxhgw59safakcj02ge8qk8hkjp9qgl0gbfctsdgw1mo37h0hzc3ssdfhjcosbrum0iamm34lc3wgjis5ir9jsknslymds4t180',
                flowComponent: 't9vo4m1mw49rcx053rioq1asml2p62264j8zz6wd5otcmpx674qda7oib8o7q926ui4kxagl4af1cfe2maf7rad7xlqtx66svciv6mmo6y6cpv6alujgdd049ag58y4daknbha83jk00fpteazezwdzar0czuvrd',
                flowInterfaceName: 'jqajpavkmrtaxoidi8vnd67en0an887pupmx78flbl805vbry4kne061ivb86ahjeojggj1n5uo04zusngity3g15gzvt4j5o85co1ii0my6qeq58pp1khydqxy23wj84o57hus3ucgp3o4o3yvpdcyaxj0va17q',
                flowInterfaceNamespace: 'd6grej3103uuant1erqn5aeay8flibn079sqjn7xebowcy8gjp58h97pbseszgpe1ez5xuphg29yftp5f5zdtcmw8uoltzbkzjpsbgxdj2axmzc30kp696ds09qobqihoqex6efu66q559hnr9kufvyvgaqdfmi8',
                version: '2d9gksbf7uaqvz2czgwk',
                adapterType: '5quglfdrwq4oeaaih2hbc9ngugfm0sbt77ljgmmgmrbgh5p292tidvjzqy81',
                direction: 'RECEIVER',
                transportProtocol: 'ib2mu26b4pfdgbpvkr2bm80yjlce4zwwc1b0j64xngc4n5os1o7o4t451euh',
                messageProtocol: 'nudrdfxcsr4qlbz0tm2z68vd6bdr1ijo1orp2r9jrpeu64sksx75ki99h8me',
                adapterEngineName: 't1379jy5oayhswbnmnpzhc44f7jwn2jwme43pmyirfindyblqb55e3jckktdvcf0c2uaje9yxwr8qg2dmmat0shtq31vlnfhyawsi0a2e0q6qju4p3o43lcn40hvz290eoayxdiwk2nedn9twuh9f0ww0bxsjmwz',
                url: '3luhe1sxa2ynqnne2k3sutjc8053z6hahyplgkhjio49ye2szu9vze1c6sksetvvjny1vbvf6b4cgnzet87s0segaw6eikwiu3rgkvefa5kvw95wps70ew9npotu370svzivj0p8uliotgjisbuqffoqcyodw131ssdubilnsll51qtkr0ci1fzfq60vi7kte7tphnze783p7gs1i2c5xckore7qt3bbvbnze9tc5attig4xvv82tqwg7q7h3zr4zrudgpzbgskqglpb06a5phdmqwtq0ybgj1cny9hpgqjcbbjibpmuq84gmbc86orh',
                username: 'azlvlrkqtedq9g10nntdqry7wjk2k2zdx37vj7zy1oe0dwv65f4c79e5p6yy',
                remoteHost: 'ivmbgovnot0i7xb7dlzbfvp4w74huxozl077ijwk7yj7ss9r1qrhwsn588i6bp19crqj0q66c2zet29uv730nbiw8t8tf8ojghmnv63nk5ve20ltsu3c0ozch6qyxfnhcjslxxmjv960at4ie2rsfw3x9sko2m6c',
                remotePort: 3191223977,
                directory: '6gk33dlw6473f65kc433xzkeqzefcpbdmvai11nw2ebohf0c07d48vyt8z4h1shysc8n952hkgf3dr3o6q65us80g1lu1fhw2pii1328zzetocso2bm420rxe7rjemuokfqjy4lw9t97wz1p2tslx3a5p2ldhduexzpem25crbvu2pajn5wg647luqf03n8p6jwzpi1z6optyv2to7836adnasspbu82c1toyqtp19j26v578wc1uc5chepfff8zmifsy3lme2owmscvag8ujbjweiewcd5g9yfoa219cle459z43zpvxvnjowjetrrs8toyzw6zx841lm17ac0efrvyuyk2ssodq2pcbjijrkkknmo8evc0ae0i77ucvpusbe28etzspg8o092skq3c14gubbx18k9ywbggxsea5rdjwkugzwv8vayk0mkzfcs1g5oiy49dup8mxfukrte90rcxqr5h4wb6zrwebbc1uotqqvt8q6liqu4dykn4f526htx5yd4tri9f7gwdmy8q8djd8kg2x1immcyfjwk9rskr7jz97chzizxp28zsnq1l3c05oq1zyouw5jpxcmbzg1oky045jxds5qedekoa2yzll3l6sz8txwqcpmn0f7cse7okfmt08b31ppadl0ciah13z9sellmdoumdrb2o1ahz3f8yxt4zwipv4n3u01e44oqht860tstn48b7lcnoouwu2hrgr8ow643vyfb83vjs69kxrm0tccuxvi76yaj63oioc14hicm83mbjta7etquudsx1yc09o5izwtyvclssl6bgqxu7374rren5jbuxp7klz1ayuqt6healyl799nqav1xfz2htrdq1bph4fjfyinx7t595e75vpk7te30bwo966ddl99qug8xmgxirovu30bhkq7nhl8yn4srur96l4rh3vkh0xd3ogbl7m4dn7fhi2099nnz5lkxqujuz0f3k780xfh6ls1o38z5rs2m7kr91ycim4lne7gia9x4m',
                fileSchema: 'ne7girso6mmxmfo35i1qkpk1rcfjjpjrh9xnhedgi0ovkkzphs2mndfjmxrjjcj08gfcuplor352ztc66o7hcwgssyrh8r47de63bhl2oov8sor2u5uhom1s7oabw76b347m704a5twc473kog1y1nqt6nivfz3wox93k7vyp2retgvnd5f042ve4trehcksxfwrvxn6fthawqdws0pckdcrkewvqu2yn33248k0ntlx9wyqhfxbmbssugjshssne3i91rmrfv016frxyusatqfwoqwivpempnb04zzcbm6u3hpa4cqr8ba0x5on02l3shhj91ok27cfbfzgjjfe1tr2gxnjiil27x9qk8y1cn1wi6ewucphghvlxi7h1dauy66s5ftz93fib57sdfkmm1zx1gi6df8v8akifcd5qzpkoga9tgymj9iczqhizusofyo9h7tyje4abmvrvxc5qlkrdzi73vur7ims3ycbjbbf4dc6dm6xijl8av2dsy7ffhh5qo78ef9z4urh52wyk8np5vyzsdmyfw9bqv9x06c18dvwdvaq3x63pipoycn52qb7qau0gapjeuf9scljyjin6jbwwevr79dn9wh89f00xga4xuvudlvnf8kj1hdvtbbddvn9r8t94hzjaub4bnpviolo7bbkt85mf1ajng84fuoor671oiyhiqvshpun98vmeixrxbjie5cdy29ccsyeepjzqwdfsvun4lrc0lcxo29pm5ybjzmwfzypg6y3ofjx3x7ov2t8pth483bxjmxrztk0ykkbyv220eighu2w4pb82p70wnfulqdh1ajpo77yeyeelgnao58o6snaw55rfxhr6utjaqgucfa4gsqi2yfdblj9hiizq99nfqp9dkrnsn1wchvtagnjay9nhmlemz2memjwevz2feakn153ejxdgabxj86yvqu4cyyglu44a6et3jdl52csg3mzu8g7ar4g67x1j3se1e71ojqwlc22hphykgid90zmc7us',
                proxyHost: 'rd63ueczlv8tiu4v9epuiax522oxg06bj4b91ve21jcw3rztfbijxki98xzc',
                proxyPort: 8748150747,
                destination: 'uetmy852w6y2ju0fzr5ed56647xo4w1uh654xxjpe2bkpv68fatzs1ncckr5lhp3guw0il2nb8hg588cszq8xhwcc1za41230pjjuvqm0q2nb4f92etvq9pvl8iqc1cf9vykfiaob4rq2m2buqx2epedhlv6jpdg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qx0b9vf4b5ohgpoaarz6plwkjmeatufxayq4tj6ad9wbml1pnplj9ha3tjuy5vv5c3wxbeybocdyhrvz1fhoq2snnxxiz2awtwdqfldsd1z0sxm8956dl3363nt92meno9iyxj1z8p7sbrp0nkr7lk35x7lqfur4',
                responsibleUserAccountName: '2byfgk3oypj2snvkiqji',
                lastChangeUserAccount: 'qhn185qw0ed2jr3mtcxl',
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
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'rurgpuqrj813e424mnldqhtocbevs9pkam8rb437',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: '0d3kcvfq2lcq1hdw9m64d3jem2s3dymy2jlvmk4t0hbpbh0w8z',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'e44hjb70ib9k26ap5wvi',
                party: 'cx6hzg8lu0d2iw103tme5uh2hqaximj6bxa1alphfylldhbiplk24u2uzqz5cftuot3qybjie73wvylqqq3zedq6upa18n1a7ev3mnr79djev65e92gacigttrpd1txkxzimnwn475i6hjoxb4dgv3xxz9nr9qvr',
                component: 'pxobc1ldmam2ra2knmr3vaecv27c46221t2hxs3imi8mxyghm9js69v50tos7brojp2veg5bhz0eeqrure54eaze8tcfdxspbyoniu7f4kskoschg3b6qrrtx273c845w7vkibjkcjqoov8pkpcfagav47u7kya4',
                name: 'ts1gkcpmqn2wtxzztq9tbswvu9vu7s7qwidkw8pdzn7xai6xux9diqf8r8wh0fcmg50klaisq8oxtxsv4gy6p3a0a36h8ybw70yxsyxn6tlq437r10g0u9bglrcenp43rehznx9077a557wnt052lpqd1gad55yw',
                flowHash: 'k3jtod890bt00mkxbce4sv0fc123k17ybxmv9i6v',
                flowParty: 'ebm2gpdcsk4q15af6xccfvmhl3ip4vwimxrf214nams5gleo56h4g7vtk2bw7z0t90uqdynhu0rppwcm0b2pymhylft4cablvjzmieuxof00adkst96ndqug0flqe2sn9k64pvegsbpiqum8cwav9394669zdujl',
                flowComponent: '9vl56g8my3p1sn0hzi5n2u04edy7uoe31scie22k3tgq9jka2t3bw5luevcb4w6b5lqwqv5jvh31i4ygh7vdizi5dcau9estinytb6hn8xh90pmuo8klazx3z74rcefzektr6tvk01vym01c0vfx7vg71ktsrwgt',
                flowInterfaceName: 'lqil51uhwgv7fyvdjmjn7jjs8qer3jx33fx8lerp2d9b016t8cof0gnutqw16mqxi91zp0hnkdwncun2ncvkvov16gmw8agsz58dzkwd3j6s65j35fqytudq406fn6h3cofmu49xaqdvef8nugg66f76wxfcbqyu',
                flowInterfaceNamespace: 'obux9p0g7inafzc2ghtsuj2u1qv5fmdxwbgy3099vju9gt8h9b6g4i7rxw1zy52e2pat419398bps4os81x0cfd2d5vj6v1s03l3nik0jpytx8akkcef98ipdr0fo4o76elg3js922lo4qsivz8eskgkdq7q6859',
                version: '0php3y21ys0n8xnejbj4',
                adapterType: 'z7b5tkrmoion80vdn0exw0p7p55u42zvvv48mcnnt7yazosn0k3imey63ndc',
                direction: 'RECEIVER',
                transportProtocol: 'pe0zyi1d4pyjagrw5uqgvdqahcnf8h2vteo68yl4rx3zbucmyja1di2e793d',
                messageProtocol: 'ursr3lm459r4b8av4rf0i01wi3m1wk0l4l8vj2ccggx757hnp7pll5xde07x',
                adapterEngineName: 'iu7genkf5p12stbb9s1l9vm447f0d0z0b45lumwyquugwpdppqzbvgmm6swqw3mczrdmdaqsf73jr4bb0f5757u2rs5ntx5o5pplo2nkq5dgwevstounwr4cajvt61hdp76qe8id47lahjpq8py2z1nz2u0u4kxc',
                url: 'jhuqhifdpatysme9rrneqww3izase1lmxclm491sjvhj0m89rwz8qkowcb2snqpixb1e2uahet04yv1kbqd6ba07hk76gc3f457ba76297yvie4ilegfv4gjwhd78p0d92e3y68ldhvfnxef00efdja58qnyjhthvv6w3zl5uaqsx6bdwqxhgbj6fsgm3keh5v8nt29gbo2u3nom1rmr68ix7z9w46ij0evd1e1kgyl5n2pxw2igj041gijhmzrt6paf86nw7ev1dpswxd3lj8i9f92fvfwr06dvilb2v53llx3q6x1zkhilahubvdzo',
                username: 'jc2w5hdp8akym8lnpjsq8nyalw01s6abeu989mnsn2xt045blrmknhyigsat',
                remoteHost: '6uyofktwnwko884dqvkvadz5n5djyciw3tif64nap1icoupvon05dqhuvbbq4v9kg9yujh41v3dc06jbwugel8k8nk560zym6x8jdleuli96lwrma255gynjlzipdf6fxwzd3hmohxp2xw7ik51re0nbw8pgxjs7',
                remotePort: 3157321711,
                directory: 'wd9bhh6tnwb4oh1wio43cf1adbv9eta4rocufnitcv8agi8z1pfwxpszfa30vckdr2whb0jw4xcai1b7sqynkwi14926mijccj1dkcs3yy15gvral0s1weyb4qytoz869h2f1r0s2g0k7lgnz3k9z8cur87s3ra7wxdugm87c1g8sb8k2dvewfcp48ixy5ui8mrhwz8zzb6xenw3ae03njjqkebtuktvoe0bi83znd2ymnih88qkog4euqkbjrraaakl0ecxqpwkf103mw0ypnzjznlydznrk451nf3hvzrw0ux4iyes654rjk373yeitzmm7whh7zeuiw7uipsvil80uwf58brr58kfmiptvbi7rrbuuued60vs79kpzyxbqop0iq505jrvhq1apk1pyoyxwngupg01mvoicg4xytw5da9fgqu9ccydp8frgsn2oyvmtv9446vj2mqm8ht2gi7e9fgbtfs1o24jh5sj7r6waba0govt713czsogph2zjlabt0b498erwxjpdxesqgucxzehuy7rifcjijlu6chnphyv7hg4j0h0g8aobjohqag9yiardx1kgcwtemt570fqw263rfhaao7sjkgrcernhlume3sgvs0buvgedjkxotwz4gjcpx44dzex16fnro361spfkzy4nbyh06yih1jh6m2pmhlv0lfl6dthwkr9jp3zms2v28hskkcy661n9y5lql52zwb03x1uq11g0y754242r5u9m89xee8tlao7xvqmrl2vbj6jbq8cwg1o9a9i4e6kpinknagpudwdzphug0o28z5arkbnsx5omse3m1bh1m2szj9kcjx8to68fc3ps7tr03314axqzwkcd23n4adzct1xly5tulqky5mkhwghny7t9haubq77cjyfnxyqyta4cb8g67gsdaomi2gvmk5lvxgzzj8lg6zij3ty1sy28nu9utskd5y44uhu6oy8vuj0h1p56upk1dv5a1nmaj6s92quml8ab05tnu9x',
                fileSchema: 'c6i7ccna6maw4wguxhuc959fpq58ynzqd7h8rnzu1fbpjjse0e509hz4jj30p3jewq2omxjno81n7nrvcyeu423ttjksg3fcyas5plm5nlt232l3pqdzsvp3p9d4zprlb2r9vzuizuxydpm29kk4iy6c6gi9udmfm4avljsv37kox0eyqm5f3i3hl0qe9d81tba5xytlqc8k086mvcq2qmf9zzx810kitysdyd0whq3thb8mttj19qlrw7tz88yrx4gcfs371qzwdg8mdkaevdd8caelgmricz406ia6da5g6mcclr4oqah6iqpo0ijdtng0zt68cyl7jyj0fg24scstn4w4lqqq9fl7un456z3j7gt8dnlqfqhjp4p0aylq0z3vucci5jnboztg1ku9fvb36pmsww60t41f8w3a1oghlfyb3rnpo9yk9lz64h9tb57fr0236zry9mjr98gz2gmgojabgqesfe57987qyl1l7an84eh783ps95okz5efppblynx01ykfi38tunso7zisxt6rzilfd495v533byh2sroalz8ogeijpgd1msyqono1g18nbp04oq4xcnure8n3ocmovd7mpnx7dfgrqbr2akzqjjjdciu58lf4cjo74pg2q9z9o7k61zgnvtpcvxpdz898bsmhrkkgs4riiwqwz4sccn40r6yh7ffd6urqelqyytf6mq063ycfkpqmz71fgo0eiceugyb2jlyrqdvn0ekpnhjqta94e8stwc0olaxdq7juoudikpoami2ugm07m5458wdx4u4q61zh8mpbbnidhvr6byc6fuxtknyautjf02l2dz5jnse4unhxhbuecaw9hgiaxtgbacwp5pfakql9pccn2u72ctloxfczbb7h6ummyb3qtknmnz1pyyri4lkiabg3538hcoif5jbue5l7n6xqyvj8no1jwllsk4skfu8vjydbiy22nkdawi5yjabidvzaoxr8kmanbeku2gr16bfiw76qxko6axiw',
                proxyHost: 't6fa3k05ab047eij7lod6csxdshs281wl8nhopwx10sw1356vmx3whjzgf52',
                proxyPort: 3638901213,
                destination: 'vcvov2gzty7s67t4qe9ekcyft30pk0k1dq52kaa127gnus3pes5hwo2xg7fdhkqi12llqcu69oqj3vysqc2jhk6x204u66jgvceyjtf8y07ixx4bjy9n9fjvo1ih9561jzgdilwnh8b5b2ljaepjgmpoggji4j7s',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'w214x975oef6odvp2hr90y0z7b6z5e0wgr5iudsumk4t2v6hpcwzhfus7f0rv556tbuulbdmhnao8ovfdtcksdmfyqpek8tjzojukufvcdqrs59zyjamuw92vv4y0i7gkbjfde9872cofr9cjscpuroepf0o7pjw',
                responsibleUserAccountName: 'pg2ik6divplkfdcszgr4',
                lastChangeUserAccount: 'ot3olwwe2hm91x79drz8',
                lastChangedAt: '2020-08-04 13:37:54',
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
                        value   : '54596528-eb89-482c-904f-ea18328b11ac'
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
                        value   : '82fd1860-d84e-481f-88fe-0f047985f5d4'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '82fd1860-d84e-481f-88fe-0f047985f5d4'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/be5635cd-62b2-43e8-b28c-b761ce649dbc')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/82fd1860-d84e-481f-88fe-0f047985f5d4')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '82fd1860-d84e-481f-88fe-0f047985f5d4'));
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
                
                id: '4cd3212d-8f1a-4e63-b1f2-545646f127f5',
                hash: 'cxthfoqltk0jjueoybeaep0812tkcl60onlu477f',
                tenantId: '6c10ad18-b096-462c-bc74-fcdcab253e7c',
                tenantCode: 'sgfju9dlm04dexurscjji15qturtycda926dc08r28j12vkqlf',
                systemId: 'a27ec749-16c6-43a4-9903-5c0213ac2fe9',
                systemName: 'nkoonwq68nc7b7gnsba1',
                party: '5np55uob90d2kmg0kysh1l28y6ky6tavwde99ek2w52yv2uxm6kfty3ibhzu9ab820zepg94563u5ip3f9yu59uudf6durqxq6jl5y0a1az8ksvbbbxuhb0m0x7fp9u8zwy7lwahzy3t36kuhywkk76lxzyxp646',
                component: '9nc8c75b1oxhv11cjeoqy7sshh6dm2hkir4283tgraxu8kd7dse2s4myhyvkai3vrrelkgbffxh2gdq4bulju9ljkwyhx3y1c0kd9pl2cc11q56yryq942znvd629qf0ak3rw1x0hou9ndnfnbd84rwbt9sst5xx',
                name: '6r0jt2726gjwenukinazktksc9d7g8ogosu742ow5fskesnu9f2z6evi18iy00rai2rbho83yoodtewp8co01kt8l1x702hjg8tt7ahpg2n4ycyt3mc98dhc6x8g0i4ln3dt4jq1nddfc2rcdjuj77sdg74vp9h3',
                flowHash: 'rwovlkxy3bol9667i61n8vtlk8q6c2lyxyh0ad4c',
                flowParty: 't1j95eaj2h7r8g7h4cvj3tg5k5m0f2skfo4pugl1z5rb95r6hkuw1r968x78yrhztqhuojo7g3mf2kq125vdt9j3801al8hydufvu6v0dusdvncdolwkyx6y953mb51a0knpyki72wt49c1p70u0fk8ez76rzi6h',
                flowComponent: 'lqc28pngyaavqt8mppfp82mfguqdlti2b6tpjey0wokm02ak03764y9yye8e9h6gtby4b2k6m3pkt57pcoqbhix4s8gei37yzz51cnxr4bmb4stv3bp6kgz7ga8tx4wp5n7qkwxsgcjd8dgqyfa78tkncouh8xdi',
                flowInterfaceName: '35zq3y2salb5q4nq5v4d7p4n0v42eczyc6w028e30hu7x8y4n5wbhqts40rbiikzt9xfii7gjj3elz0kfxdbehdywb0ww1h8377yd8eh0exi6pwtvtji988i7273q7tvd9wfanmdo91eo568fg891y7swuia7ml1',
                flowInterfaceNamespace: 'gedwmpqtmo1bb30ecswupnts065ln7ks78xm8091r6e8vqiwy1eis4oelx71bglns8unkb8n6sdwj6ql3gim2cbvyd7fojqcbt3cz6tdywqx4tsoyom86qnksoap0mppzau8fsv9bsfb61jr31ie2tarfac7clv2',
                version: 'yw1r0wyce6b9cyp6jwxa',
                adapterType: 'aezw9t6ot1yfsiusuw17e23x9pawj4zl44e72l3lxbl8mk59wqnhc9kcx4le',
                direction: 'RECEIVER',
                transportProtocol: 'xjpusjtsjjtqgzvd4n1husgocjyqqgpl67wz4jsiim9gkefkxmwp5lk7fbw7',
                messageProtocol: 'fnrh5roh5gwa5r00ngxzn4m6a33cx1geds612ctr3qwdvvjrqfbt3jzob2ew',
                adapterEngineName: 'yx1toteyvr02jv0hi6poplc6ah1qso0zh6dmtiqst1njo9uccmewregh3wwh4lbmgj3aq8d4n290hso1ug3in6jflhufxe844usepco7xm9w8xovrmpquu1s6p7v5s4e49fq0eiqgyfc3i4feuqyl8va3txo7m8w',
                url: 'brzsuzgpvmq9auspx838tiq1zjdf1lvej63nwq6qf9ck4k79x7jtr8d65r2yjogm98z734z79anzx61jlttlnn1gs4y33o3bunrn6ukirf0yrgznnefzojc8ljyta4h64534urdrrdfz059fqnawh2qu1unq0m7tzf9oqsb0u0ds7k7nvec9jxe8gxw9qkvq46u42igeoz28g4d3mzpgdxadrp93o37hafw4jhku412tz2af9wtbagb1452hps78dyt2dgaf6cpzg2n985dy8z5fndfn5foqba7khunapwxwqou7w01pcdf664pau5qu',
                username: '86houufkajm32h9tuwt2auggq47pn8nvcm3q8pbgi26rz13yvu47a37jmcbg',
                remoteHost: 'ud0vs01s3j3jcc3y13vzi63r2rz50pkymgfgdufdwpsfjv1dkllj11yxbg76bfzyfsyrd4y8e7togjyqc2rk7erg2ybribk16lky1jn9xbpcddc0p7yzk2vncj77o57zrq9cy1z4v40fp1s0gw4cg1gzlq3u0bg1',
                remotePort: 9119568033,
                directory: 'seo9xxjaxyeittmcl4cqvodfpwb0ty3ti9kjnybgy01ze3kzpzdxit7yufy1a0lqxu0bs3qtgltyql22hpatdd8f785ynpngmvebfffklu0t7zcnbuxmpx7026ma2a3mm7hkx9l8mgucz2uj0yq0cfi0b66lx5mmvngpcqndcn4ij8sl4crwtk3u6vb6mvssvj4x96ck478pcwoapm1o2wqiebg907gocv32huzfowuz84g5glssvvcpj499v8nzzjaeoh8d9ifqlbr4tlbhzjhbaf0krbor0w4vt1bni9q4xw52jpa4mwrocyw39nro6wxx130ewzpbj2dx2oflbhjl4pk94633eh8kg6qgm6gh0wzeyli45c3ubwij48zm8bsptu6p0745wk1arpy6t9ef4ol0tsofea4vioh3dvupc9dpg6q6310sx7p6jni5kgnyg51nayh47ev7n3zi4rfwb8khrvok5qh5chkehs4p8x4tigcca13a2j12eisr1kdvmndcedqbe0lcsh0fiufcp46b8cphdvf31m0y0ceb8h3f15ap9pguai9sp9ikvk6kx6xz84xx1vr1cvigq1jqbu704iafis9xgn246hx20syxryj5qn6puz63br3q8jotoz9bplsylwarb7mvfczg5ivz33beoorfw1cvwse1ae4wvmdcbangfwufthx3af9q9eftq9ze0a8fkx4z8l6t0ykba8ee0ntpgy3wbanwk8g0jwl1ptjkn465m8xl4cihocgynhvnvk47jjrh0wnd08vptj4kzl2odlblibwjrh8vhkmr558n5843vb0hp0em0tczw6zk0rq1ovuhm3kfey8b9a5xqpx4oj0xyb02cd2gqebafzx3cl3mj26r4yhrw5osq4xk0cl18xxkca7nz8tvqiu5h76rb3hjud5pkbj0xduoq5flz4hevpxvq2csnw8mpramhga6pj0xpi2zyz2febuernb21fw3l2o5dafwhf5hlo0xbn0r4me7',
                fileSchema: '0847yvc8wabog9kzqqx60vopm41fxp1p31i8ys7pnt052a04421au9oaifjhxrdqw62sw4sla615tbytm9j6nrc6h8lpc19zi7sxg6o0ep6i2ewgxz3uyxc2wktxvx3zg3i3wmb4q2isr2zm3zqq91rjq0n64dhp4qax05u1sulu5iuyd48676vmog6zxyz9byrv20g44vtqpv1io2ncdi3kqm0g0qdyd5aimfl1xhqzg3uyzxidcl1ol585b2ih4oq1sq3c30bfwn5o6cue6k9zdfghyggeb9oy3z74e9g874obl606ed1eondqtc6w1m3c5jr5mllfnlz4h11sqfwwmjd0bbrui1lcadieufk0mjz2c7b53anc1e3tn12frlt4ecmuflhx8nfkdqu5p8k6qf77e8h8z9upjgu9ofts9ci794zeypyvjcdr14a8xh46vxy6iz5677n2htn7xgvhu6td3kdxv2a6a9rxpznj0qx78gdtl3ul7xdhvxvdi9yoswefvsq38mafpsbrx81wujhvl0zzzvbwcx5u5dp5gcpyabdujsmlum1ylzrppj08x3aw31sr7s62646xieuds3fl5sa52okg9r8v8hce2v1nrvtfrp0044lcv04kv0dcgzosgglis45rj7nu8ps1y1myzmz1q7wpladrra133aun1edr7ohod04xs5sl64g5ogmuc8bl8ovcd7aydkqrv3q9haloktglausus63vkwwgzfu063bzx03h8yqblcubem2pxg6gyzg0mt4sl45t2v60djqdphfsodndn5d2uijfmohkq4be7fvy286x52gtljsyoc0a4j7hk4463pqcypvdlzqz4a7j2cbgi41h0i09ga5zce9jc6xkz8f6ahpiu6edhhh3m02tzvdph6hyi5n4dndbi3tf96uqa7zg6v6ig08rz7yv66kyfabixtnj5zufyp05ad5696goxz4goefywxwwqn0oauq9eb7fsw9ug1h99x04kl4sytpa',
                proxyHost: '1f9gbjeuaqqfj64333b3m2owwo33zu5iqqqn9z20yihoszdu8pjaphlw005z',
                proxyPort: 5073620976,
                destination: 'iq3tboawhdn821lwoxwe6cyq69nek45nalc3zgzgiox27el2fu6wnbm80d0c6r7m5ip71bc6qpkyntjscprhos57eodonuc2a4dug0vc28yct1temdopwgfckjxg5xysqzmsvhwhnpddnxji73esvztdf2lcq7rg',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mvpif6yr1c5cbtxkpkaclboipejcw2ybhteji6m6l9gql1ves6ndewmjg414l9xwl9x4e2nc3qff8mfkkycf8dtbeq13j9egmoysc7kvbo15qiizq8z63vwogi3cwe3uxmgte68na5yf5n1nruiuf2v37vexd1lg',
                responsibleUserAccountName: 'fzivs9gg6p4qjvspmnjx',
                lastChangeUserAccount: 'yzj365j0iwvyhx581zhu',
                lastChangedAt: '2020-08-03 19:09:41',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                hash: 'tjwpk6nz3ou198ry9wekru6441jf51r7421wvvf1',
                tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                tenantCode: 'cshneczosj4nh528g1oy64ccs5g6osja6kevf4fru5ctt3md4g',
                systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                systemName: 'upktroqolugk7ojlyfcm',
                party: 'q1jjsa07ykdgucrk9k3zbvtlhpznfu3tqjmlx21fpr2bs9wp56ufj51klfpv1qbp0e3xcmexxpn9de8o2a6dm7l7yztkq90mazfsf90vyt1um10bv3csivdxqmpnzx0qx9c4dazveez4d3m56idrkvl4derhr1u0',
                component: 'n6f3ygsslsrosv5w76bbdpqr6thtvowp9sk7fs8ahdpp0gu8rjrhi4t0cvdz1fiq2pdicrmi3x43e8lbcid71sggrmlo0ipluqh6rzz2r2zar0t282jq2wgjsdjsc6bvyk06wbv1kuhrito1ln1iw0zo0m7fwegu',
                name: 'vdw5f4x1brmjcxyc13hdzwzp7qrrsbhmp58zsyf7adv5dfembvnirzbut21587fnff0a7585r4ysk6odbf044bioa4qpbkx0m5mkq8ebj1gxbbjg1c5phuro3sb25cn23oxx0ymqakya4w06adkort8jhozt688s',
                flowHash: 'xhhvpri7a3pa87c3rqda2a1tzit411bzt0w2kg7a',
                flowParty: 'wpcd2qwmtgigu7g8i0bqq33y5a7t7rebfnpm5x9ergxdgw5reqr0dyzqm5vym9img9gd31j5898wb3v1vpq9wp2d55tskvd9dnkpdh0inm2pi9gyii3xnxw4p2z3vom7qrwf9793zq763ceb8ew8t0ag3whkeawm',
                flowComponent: '788xphbvrbikadmjup1e065dmuy9keuq97a1r3yksr9eb3mls28r1dfeecgtyomqfvyxnfn1pih03mpa3dn63pnakfo2hw815jxdai1fo3figxj2b58ok458vj7ua3l1n3v8z1xg2tmqa211uqs63mr6i71qudu1',
                flowInterfaceName: 'vxmbsewdw0xyoq0778r1m5qgl4vdtvq2kp3007uvipwuz6fal49486w9ch3ychn11abe4mbmcg7rdrykowfhbfpozd16cr258hfxxpujg91ogn99zot9zpfqhnhb0h6q9mcax3ai90jya8wmws36ielz1g9bpvkx',
                flowInterfaceNamespace: '1l6a9yvs5184s9rwflnj5de1kpgt2zd6g9t72txs5dqzl2zjsqx8w1k3j7fg567j1c6xockorx3a4cpfqs3uta11pv1x6x2rgkuwaaoxcsv2ynjjpdege70mlt211sc97orhxk50f3mqmjmx15fkogwsxyp22i1p',
                version: 'j3scmq49ed4b1r4o0388',
                adapterType: 'q79efi7b55zw9vxkfeb20y2l6tahjvure13zxu0r6xqu7tjlfzyatq85bi2g',
                direction: 'SENDER',
                transportProtocol: '0wlv2n9yryequtrk2n7ms6nmw2ye1rm5nv0adx1mgdalol2ehto47zgqmx0a',
                messageProtocol: 'bn95lbuvnnk4hjgfa5jl6t8o2e5bkqxga15wu3vaj1k8h7hl465a114ay762',
                adapterEngineName: 'rkkjl4zrmoli8zap6kgtucppr5gi44d1pqbgaqt7ctxtyrbmxri2l9yeud124sp5x2ny3re7p6owktp1iv9uuzo23bv9rsme0qodrd2hhixalv7o1fwmv46hdqo08b1q6wnqol59clbj44c1qi2usyxxgxeb0inf',
                url: '23fs9foewng5l2dz26epbkwxdx8s6z2y7ujqosz2s2d3modvhdozkmx6unga49tkqscpyy92afnuwojvny8ibwyqt4kkyhp947s460k8o1cocwwym7oyc5ue0dohirol08960ickd9q5jex27tktkh61zo6aff1zuko64yagvwaeeachscnw15enlvdla6ifx9oh1ggqmicmo43861v0ii20i3iqgxohxias974gn3fbt799v5wt6tx8h5a1k7omu2yzpxs20pgu63796vnsljhyzz1h23mi1pckm4d3yuqjz4ffn43f42k9shzuyi6b',
                username: 'hnqgeh64m0hefrh8cnedunbtruoblrswvqu8dsd33n6od9dagatszzzcwha8',
                remoteHost: 'l1k7vjok9w1vnbdrcmahi4trprsmjclrew6xc5frnobbo51tj7p2p5zhaiavur5hfn8bhvh2ctvy3u1h7qq2vza8lfwrg3nlputldoxotj7ei3qwop49m8lywyan7jk9fv88rs7y4rqkdi1ship2ridapt2daku6',
                remotePort: 1946280070,
                directory: 'rxhzmgomlu0d13zuf6kio1megf27fazqza69md6fno1x8cbu7x6fjscsr7hd1lpkssfxy7alv4rivu9du8ra7rnrngms0y5b1qd5o15xoqy5mqrrlmmb338zlku7goy44sca735guahtkvkk0lnb1jfgkgrk6ig5avheazkhcbn580y3noos4tv67y6jg49nettrs5va3dztkwws8ryx49kbxuf90ygp0jzst7lmoo9ndo8jc3q63rqarujyipqb56y8x0swjwzr0q8kzrh9enixt9j8vur3wry4lgaim4ft6c47hy8l73ocx79akezcolhploqbwn6unqhcfdfii1vub77jqdoiug8zzhuriatsvjfysknmzz5w59wlbry342hlh3x804fz5fc1zphjrg9grrcnccmwa8qcmh9h3i6gcg3b7378ng9wgiuzhssqezbnfdz43vougc6uqwlq1z17dkg56t7bb1pftvsxhcq5vjxg7czijcfkywh6jhvq4c4mnr1bbmtdwih5nxoi19alo18exn5tqn5t1nly3brt7gpd4tkvde5ipc1vuw87vjoq6c9qr4fcdzjhmbzyq4vs9705y5tx15nmif5zqyq4172ut7ka10nozib6sucix6hp129o2wapsyyj8mow7mnvcgjde217s9o42volwoob2v9ut5o6pmrlu17ol1z8y8jydaj98078xdzqis73h1ji6ym0dx68ndhthqydb1pbd86ncdjpl1kahts0a2s7knietjmt66w8xjhlb8ruzx1wpesov0obr02siuhbe525718n8mmd6icckicreimc21jagcaeu2sv13kenigm94u9thkb60pj6fxmny2hv4e4ms7a16tqgmdrdou8ncqv1tmp63rix9348at3pp8fllmfrpa31sarpufgxvix1bjo0ihx45k4t5k1h26muohfqgz22r8y34eyyzx4zseyllra7xbyphgtq9uupxs55de1rwtg9qghhzhvjr0t4n00',
                fileSchema: 'r1grxgk46wpm182i9ica7dnleevobogl0u0e7g4qq9mra2pc82ri6bbau96f1oiqumy6vpguz16wre3ftz7wi1phlx8f42rk7xlyx8pewukk6f9fpvvpseeuueatijrea95x63vrfppc1vzr8si5k459a24hkl2gpktd1fevp4lvv7naw4df01vi1laa0uqifu8objefgxebuiaalqijfmlhirby51xrjsbj05bebtz30u3r4j8nz6wyzbr6fofhyng5p3vcad4mr9t5tnq51sxkf44zxym93vwnby86du0lw09ean0wykze9ozynj92sotq1wey2o68hpscjs3bccv0duxwku7kt30ljwmoyjumua9nkvl2s4ph84u3ncofxcund396qvy3tyk5kw4wwqimuopwxlhwfao3l6at8mtecvc6we86lu1v66bcsbb3n9f8m82kert7koewjo0cbe08nok7n6ci1k71xbxqazd0ln7hsue9mg4unp7m5tj899dlci0q060kpik65hhrq5pr6xyjmxmowhb2y2yu9grvl2vo11319ivyu107eb5yseur9d136dahm2a7uz6pfwv1hl9usv5hkfi3qnph9okfrqpjm6wld1def44htgewbfvs59pmw27tb4ifbv35ykcxibnl74uunmzobllwwqlio78ok1qyxa3zx1jxucm5r3uq8h7xg55wji90c98qggs3ccd1683mgdqluelqnqtsfnywufz0nfwdxxzhkd392qdn6y34ppyek4hghm2gq885ajeskwdm4ohcx379as2xg0ktd92uwt0t9c0n43cgtb59kvqkeggcpwrafbmcytde4zr1r1s8q7dj5pz8ugxaxar0lbn1w9h9tvnpz49uqn030oxuzngo183hr1odk5codd0azs3lvfo1afzwyvcooyua5yhgkesph5wcf4yl16vay71if8a2d3626e0xxdjlzmsiu68rvphtamb7jj0kw72v8z9pjx572hkoxrrd',
                proxyHost: 'rhgnkxja0v76rrzja15udlc5how9wdvsyezsa5x86hnqhp8j0f37b4dxv25v',
                proxyPort: 4565884904,
                destination: '0oiz8lmuwb40gyugjm0haucqj6nwvd6nu8ooarqd1rces2n86vkpa4cjetlwjqo9ey4h6keonsmio59kj11dmefvs3dbnhp93l272d0byeoogxuu4xxkytyw1d51yczq5ojpov68mw6mqzsdmmstol0qu94znyne',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'r3nixdiw9otyy6imwapxmenr11r1sis6nk79zivbfi441199cke79d63l540lwof8oubavjyg40f4zypqz8rk7n12jfucjc2ag6kr2is9xae8fihl4h0obhje5deczpvtiscxo7wwtx51q7cz0d7g86p4nywdmui',
                responsibleUserAccountName: '6ye6o2ggtewusjnao0my',
                lastChangeUserAccount: '49euungentcaxsz9hdz0',
                lastChangedAt: '2020-08-04 00:35:14',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '82fd1860-d84e-481f-88fe-0f047985f5d4'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/a35c45b5-9425-47fe-9513-63472649a773')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/82fd1860-d84e-481f-88fe-0f047985f5d4')
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
                            flowHash
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
                            flowHash
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
                        id: '0b4b19e6-acc2-464c-ae3f-bfa8f8c179c8',
                        hash: 'jmnopjyptyoi18e3usaae61v9cvle4m8ulfrqrp5',
                        tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                        tenantCode: '0rs2ou5cckwi238y1t5yov5hzyqzhwqo8b8lp7chqm1c56zqd7',
                        systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                        systemName: '2kjvhhw3059x91wnhzyo',
                        party: 'iiw7p24349jutsjd4crwuhk5u07d1tdtluax4smmhk9bh70cabij5qjmovr14ouwlgyfiwjd73zazo4sdrrabiihqqhph0zmlv4xeluxw1sua3h2raf1up8zgg686pom6uhf6jftkt50qttsal1ne2609b5x7wto',
                        component: 'h6wdiinwpo1brfa9mk7dsj5mqms4qw0cqkge8adg3g5cjhlxrb5mbtutxss8u4s37xii35pkma676ya3wekcw0730vm4tc96x8jmk2z3vb1qjvh4yo7og60hm3pxf53xofqiealppo7dm6uqgz5vyaj5xjr044m7',
                        name: 'yl11gj5jmixmmmrphv2ixuviloc7hsmbp8vhb62fs34b2x343dskmsegp4nvld359ot6fz38btd31hari5sgjwg2aej86mhqo4fk0oy0pp5el1x8tht1qfibtc8e7qn97i8q90uxlfagcpy8pw2pwdardbrliezr',
                        flowHash: 'flq4je2e35f75wnp9vx6w362hwm3t4vp99sw61p4',
                        flowParty: 'xz4ppouw6y45kdz1dbqat9ajx5hbsod4cy2u1937no2hdhotee56rws0pgua7h9egmfrodh9nv3avd1277oj0pvyp0wmjs1rr3kik2jnt3b20xg8dfajqb7vurjsrrg1ecaiz26lr99g0g873kqu9eyuqle63icg',
                        flowComponent: 'bp00lfxg6l2yxhbr5qoxse5hpm8xrdc5x2r5bacv36garayxbraq03wq279y06d5u8ciarsullq272qhtblafznnvhhmpfef71wkl6otzrmv5vwopuzwm82rc51yxwmwwg64kdm7wby5c4nm1n5vyalt1xyfnqk6',
                        flowInterfaceName: '88n0uvbugkoav70448zjeads5d6oefkqqfphikh90hvw3oyswyq7z2noiu5bjxrobvlwbpxeg08dhasvm94ep43can2nc7jjzflo4ez3t5l2p4nu770z9s7wlzftpxz4ptayrvheka1ubl7ddc57b4gztre31ekl',
                        flowInterfaceNamespace: '1e4fa9gxkmb094djp8ylf6vv65w0bpmzmbh6o74mx9tzflvtwbjbrcu04t2cawj7jqz68rxr5ytkvsfetaswk41tujagjgoo49ryli4k2hy3qs341pv16mr0ftqt31mhfyjwzrgbate2jus2ry60ac5361b9qsvc',
                        version: 'dau17tl63hdskmsccwc3',
                        adapterType: 'appevo43skzkrwimnvprqi359m5aijp6hsya7vz4int03dz71ize966x8lr8',
                        direction: 'RECEIVER',
                        transportProtocol: 'oaaa166b1576v4hvssjyf5l3a485jjp1hpslrsgxs5wwkbfslpb00bvtxn59',
                        messageProtocol: '3d1z4m18kuk6wdtzjvmpvqp1dhqeun7sws4ki17dx2h60b3atoy2u0b2ej8v',
                        adapterEngineName: '7b7wa7nj5o8c964m7og2fo2tpxtl2pu4vl1eebhai86ur6jvmq5488yaf8vxuevfcxdl3oi7u8e1208f1lerb6lt74n7igbpu6imbwscx1rj05i4fqz1gy882qlhvnfhay2fic66iwf10aku9wpzaayrwqm88glv',
                        url: '3wselpvwcv5dsuy9o9byijjm8d3npr4pljfvdrwb8z19bcfqr9wmaqa37y7rb7s3pmjaeg5mlt74686vbc0kd0sd2p3b9d1pw0215b5cpub7gxy8z43cpwajb6vfd33ivhsde0zbx3unll27hjqo4ujrjllcf6rdzcpvwmsc6yhxe6wy58fpaubvx1sfmauy5f8wiro1id0ipwuu03rox01vew98tztk2amcq077qjq2zn4posarefqehvqm1gn5ls7z5tgd9gaubrmryjj2yrbn9ghh8f0b7vmnrq3v0umpql05hnd3xia1nqk4ht3k',
                        username: 'g4ojif4ng7l1su3nl0mwnbxybomu5hwqbh6bk1i5bqzzd1f2aben3d7wz86t',
                        remoteHost: 'cf57e8xyxqm1q5gg23hpbochsgtw7d3j2yu1ljesaovj2powdwqsxsxgul5jmy9rty20834vgpusksvvky6pjr8nq0czseya0lcuus4fltm5vfvt91a9758lb7r9nmptwz0ct75mgdmn4u2h3dc287xdclwzt4zs',
                        remotePort: 3159213239,
                        directory: 'fmpwu14z04kd52tpvs8vc042pnhds0iphtgxswpj2mbdzyqo8l51jxdo86vz7iwmqio8iz7shgvc1fukf4oq9las4zlcvtkxwhymi5kvcv0csf6iymlsrmr6cpylqgchtfxe8cslvozd26w40st18wjyn3a3a3bw2enn1qntfmkx01r8ypxzn7rae2i6nuv06myyt7forle90yr282kk4ahwwaj25gtemad5vpqv6nu94cni6m0jxfxic2q5u6gbrzm926ns13654pwcpa8gxf7yqoslne884pcgog3jtf1j2hxsnfciqezrxzikn8ikq1iu4h800y52x394iz7jlwdvico6aqakawqi4g0bakb958trr1uydbel7on37pekl70od6r329wz8pcjhhmelp6fgehgvjmfti1dxtwu4jitw21zj4cr5xr4paa95mzqqptepjn5vqgkce5x3aae2s6v4jnpdppntwol4x0ot99oeekwdikqhguti9f8f3cvxsz7yw0uksifhinfrdp4awllxstli4x81ml0h4s5br6vc5ekliu0g366xlvw91pasu0de6fv41tnglz7g1vsu2y1vviz8l8t8czapyvx5fj87n6ddd3z9bai8omfmqatigoh2ovp61wz796vubie61udo242fwcnu9vcngft1p1hokg5xxjcp3gw8h3ze9oxr4raz9lczuibz8vvno167xvupzxfen7p17hpuzky5ht8acqyy2p1v7vvcdzsbusz0x65ymwdx4f61tjjigbcdxtsiaymd4w6xcchibr6k044fejafepj27d1hm5ifp2srtypjjocev5u4cfpgx2by5rc1hctyj2vkj4jz7hdkyfc284jb5pv2teekyye5hesrbrrtebwq7rzz91obsmp7e8clqwugnpt8pobkysvrcaxvs31mftpoej1zwhahv4qo9cj6nxd6noipyfwn1avfg1uhlez6t6c6acasj4m54zlfniq81nc7xkdq2yztcwu',
                        fileSchema: '6o3kxxllnyq0js0hammgcqk6iiyybdbsrybixct685jxcl17d2bxbqdcfierfuhgnegakqsb1jkil2vborpnkzyw8z1qx5fese5wgkeeza2q67eqp2fojwtq7sn34i3k5m08qittwx0g47lpikrz6j6wxpslx75n7y1p7kd5fvmlbo1drlywbqbn1sh8a91dsy481st5cic4d2d5xbjwdx1jkxi5nxpp0mmkg816dfro4t289ig9grt8zyw4eblapgxx708nqzl03xwmwxsj7kqw1seyrcryak6bmxbgt5hwilb511ymdc7jgk3776lq1i9ns8pjmp5u9bwrggufy52t66995b0ldkjyyxwingj1viwikjlhobg0j0zrogzz52xuyoa8mio884azd8m0ral0akflwn74qjm2hqee9x4dp2np4xew5atcjaonxu2eih1lcayaa14zhle2x2edr243nbrmyink60uoa024x9wkdg3lklycccu8kgyrnljalege7675jappxcxx40b1roibwj97thejd7cw7jmdiq0aduj1tbuq13mgnq9reh0nwxgnt44tzr1msgqh7thx5i3wnn5exrvbbschufl1k95895emydyrlujkfnp7r1ar3r03pbh3oz00j32lqh9f9i1rqaff0sfy8t7eogvlme7tdw247rd8mmdarfizseqf2eo70x1ormdfiqad025bwo3jylr36purrzk7gymg9yq3nvcbbf5i4zk5tmmasbsq9axffptppi2c1hq31m4rf6oztcy3yviz9xo6mtmzriwv8gx6qc9lb700c4nq55z1rzi5dhgncfy76wmspyboeq3j9kdtusv4qbf2vgk6n8fvf7pji755hsdmkxgyzaqoqjkyahusb451pwrbnn961578juzit4lwx7jbvk91x4ao7en8dwq82p5cemochmw99svkseovubbjwb73elapiv66xqmnd74ghch8laakyvv9gnrax60m1ecn89zptfvh',
                        proxyHost: '5a5h7jhwgg9joc1ed0geb85gdeuo1mft7v91wjh94fa6ezojg6a4mahr6q79',
                        proxyPort: 7900196057,
                        destination: 'cmlczqnq79hor0jooxfyd6rshgzv7ah5ks40ka5k88g3e33nh9wa9o9mzh9pcl03clva5yohlkuzyw2psh1y08blzrfq4x4vrpkgqk5pf0l1ar5c5ery7bkty1uhvn8c0gpzw1wlqywmrep4eyf5j0rgf7a2tn8v',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '1t8uaxbadfwyhe0ckwi25u28ipt1kncu5f6snkyh4rpdvlirxht8v8tviwhhcog9zzsp49k31sr6ap5vsdyhv2necdn97v6il05vwmciaa9kinl36uyylzgy3qbxtcg0pe74duh83sxpw1c99wi0vbqiziv5ohwn',
                        responsibleUserAccountName: '77z77kfrjw3zz9672o6w',
                        lastChangeUserAccount: 'ly932xcvvxzec02z936s',
                        lastChangedAt: '2020-08-04 06:04:43',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', '0b4b19e6-acc2-464c-ae3f-bfa8f8c179c8');
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
                            flowHash
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
                            value   : '1e5fd1f5-2176-4234-93f4-97d4f9703ea8'
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
                            flowHash
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
                            value   : '82fd1860-d84e-481f-88fe-0f047985f5d4'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('82fd1860-d84e-481f-88fe-0f047985f5d4');
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
                            flowHash
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
                    id: '782e3db5-3bfd-4d86-a80c-82ab87af8559'
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
                            flowHash
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
                    id: '82fd1860-d84e-481f-88fe-0f047985f5d4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('82fd1860-d84e-481f-88fe-0f047985f5d4');
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
                            flowHash
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
                            flowHash
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
                        
                        id: 'd3997db0-ea9f-49e5-94a1-9e898745330e',
                        hash: '2eu7lbb98roonnqre1jc7ejntjf20mukphk9oiik',
                        tenantId: '6e50db2f-ee59-4664-abdb-defe9931e4ea',
                        tenantCode: '5tkwmem2kr9bs8kx7mh57iidzdg3252x2cz8cpxqmp3xz1ns56',
                        systemId: '24d00c59-f5d1-4825-b11e-8fe02416612f',
                        systemName: 'ceq0puld8o7mfi050xxm',
                        party: '584x46gnl5umxmh91aamg9lucfcv8muofq05t1ndqv8fywpqh4vce77wkclz7pvdrp270poobi1zbhfyb942f05r5ckw0pgaku7acqmn21rjxztdmw8w6eb777cppb255wd26l7en8mpfd7hg5xqser31dk1sz8l',
                        component: '96ogloblj9xblduo172fpll0y1qvlpkw62mn0tqc43z9h1epgsk05jgeio6dr07rutk4dlx4gtr1w4832w9tdpsih3o46o6ne2g7sinsn26ni6rtljvmoar6df3xgdtki77dkpe32v9vzdnks7nkstw6uaxz7cqt',
                        name: '31ili16eozig5jgmox3c40xscbfu9srby3zca6dzuus4rmh1g6vabzf2i26aq535is6e2cle1kv8wrv84qpxb7wqcx52jmlmpg97s7rsw4g65y4xc6oo68rs42nlocfq30jjj4febote030e5eeusc23o7ar9cgj',
                        flowHash: 'gwjmbzh7cupod77r08f7yi47eewxirfg6l1a62t8',
                        flowParty: '0nid0qigds2wtuiou1xi5pog4jtoya8bs103k50z229d7itekedwd3w8kffvo5779ni7yx0yzuyvh69ci583utp76n6fk08t013qoj64wn9lx308lrrs7tj8dcuxn7ifwtgdg8qocibhput9b6y02p7s1vp2uq98',
                        flowComponent: 'xwmambmjs0s76o363bk5node0mz76lumizs6xaidv9oqpizl25ngulkp6mu44d0ne7ebmfpbw81ridz6b9vgiua2g912ag5vriht50esf2ww03raee8b48jwmld5ev2ea0py2i4qs445anj52ljrc3n8blvflf6h',
                        flowInterfaceName: '83h49kufhniet3tkrpsgfs6uv2yn1kwqnbizwq8y2b32b2b9dpu416fimnjpq3fwjeoib96pm23be7nkr0600vqunm5znpi7qmphcjkbslvhop2wex90te76q605x5i937a9ondz97xndk6sc931l30i3duwsxqn',
                        flowInterfaceNamespace: '01j1eb056hp78swuv2vhaxhzu6ql9cwdjq4ymhgncrysqbfvqege7ct5m3aap6to9y1fdybk6wfy49u79frasphgomtdnsigdwjugr9taab2jyepuzr3d5rxonolitea9rtnk3tj634l8kc06jlhch8ftfzxxjok',
                        version: 'ud5ainuljz7zye5val40',
                        adapterType: 'hs2f3jfpp0jc2bmtx2tw2tmz467uggpryne7l8x631xdvz7at6cbucyzvh5k',
                        direction: 'RECEIVER',
                        transportProtocol: '3yncdp40u4ne932wb6d2krfyg7yfvywwnn180tel9yys4sn1rjl3zhv9n1j3',
                        messageProtocol: '5v8qwi0lafh5dwpvqj12x3lovntnbhpkjg3w0nmq4lmxgf9z56hiwr0822je',
                        adapterEngineName: 'i675ovaf3eme11na2xg0dvlqg3ybohluwrmw0ndynj40h631m2pchfkhz76k7k13derrqhtdob5hnb7og0db86lvstz3afqh41jbc3oicz9i9pd5zzaqpd86jl01woxm79tt6ykv6hbdkhmxkb50qxjugc3yp6q2',
                        url: 'lbuxhog7kf96nj1o66ofh1so181q7ejnrgm8ys587fgo01amahuz45g73sn2f5n43vdn86l42tyielg31w849klaa5xw2k6wvc2klw7sqmodvqbyd1zm25zim9ftbmexrnxiqbl2gnetcykj8bn1mgledcl99ajcsixztm9auhtht1y12i2ywoa9d9y7b4lciwwwnktf1azfatlmo5ko706y8fvn8yrz4xnglr7uug7ujadlu11fkry05tqzb5u1qovvwoqi8jcgl3fcvp739qb38hjyjzsej2ui086ap5if74nzckcmt4hk8541i2ls',
                        username: 'r9zpk7y5ibe0pahg7xq2luycjp0my97m81gxxnsqq4epj0yadpwfyyalizlr',
                        remoteHost: 'h1bkd7befg3vmesjunxwefuwrbrwjias824plte9egktt9vzdkmde57ho96ovjxz5tebu7eq1qgidbi4m8y7a0701e5o9aaaeyww5dthi9v51ftphbyjiz9bawqjtd6bu904o90g3kz8xnrx3s94m7hulmf4zfd8',
                        remotePort: 6866190425,
                        directory: 'g9tcmb8e3xdohjm0nwhwtnoya93rxe9atapkn06720wmhlee8jyqtqoll759fymh9eepdgseg1w7iiw80ehmw37epuxlj2c22po2fr80vkggyzvd5tre9aadlls1te7njikomi0zrqdof1zecahrmsrajs8bai1hc5kcuq9t7hpma55p02rgow7f8gx0lfys3bauh9ys907aq03m1jj15vw2i1j7ukfrx7nga2y8sz7gqh5jgzbre3fdn954ielqe6t8y9zebcbu540gho01pcb0tta68qjklg7g88msxq3d50awih5v5qv0b517urqty93gltmewtx9a6gyahjt79kdrfaz8lkgjzowla4fp04ofeo8q915sv471ex6xc6ntlvyir208fh1vdqt9zlnqq9klt57l502fa9sj2yaww3q5ypbph4fcni2oipw5jpcwlz2uh22uu4wcd5raq3sw494faz17wqln50oy60duyzl1ms2vsbx9hapjw6vam3mhm9qlrlcqyu45qf7wp0jz8y1sgndapqljfbqx1h1mhrunh37r1xfhlonut2882pz5jre04iurcg6ce7fkoli3cjjtaz0189wa5s3688p83sjzexdv9tjj414zrjo4v9l5sxoxs5md4a4c0tzduxexy2322usrb6rykshxm6ht1ab5ob7xjc2pxmcyxowkq58fzbe6zxugwzhpzmnmn05ztc1r3uqmlza6xroxp1hzoo79aig0x78fk1f6iiazjy19ryeef2ovp9e2b7m6soigoqpjimodpum5aoyd0u0ujyzgqsrcvf5d5zfwt4sf6os536r5y351ftrph0l5mhgav7lo65uyh9sv0azu8z0bbeifkmhwgq7924x25rsvmnul2qyqaav7bleeiecoqs0q6qr7jrpnfph0htuem8tsdgr36s6g50dd9ew3alj12mxrr467tdurq019191ovpgicv7jige85rcs1ei3334iewinv6ay5xzat0sp7k37s84',
                        fileSchema: 'xj1vi7a9n89ii4qtpl69ri4vux5sjbxwd0rrjhdfpxbqip41f3910monlyo23kt55i2hqq06mrys9832eva98zsyncfevb7xkwfk4a9ekmrkrztx6hy3pfrakeojngy63453xoz1c44umkljzwiin3mfm04cigv1qeqci9rkcoqb9qohahyhvo4p9dkxszkmvnzgwnl5ud4qzs75zn91mughfkzd4d6zhwavzi33t74c7cbz4nrmj0rkddmgz7o3vxu4mamnokva30b20vndf0a9i584ha2t24rguia74a52qqlet0vhuy2xdf014xjn3abd0wz5fcw0uba4qgiwew49pv1qpdtrc72g1cwowoinx8mjckytj8sfcowpe2mqsbbhkd862s5p0oqu7uynf25q5flqcgvammuu2ahpe9b2geg58e4urvvsmlkszmmc0w6fnogzt7e1yynbp971tnqhw56m37v3y1t0r1o4w230nn8nd72404oizkjncm8hraigpb2111me01i8n8kwdqbtrerl6wdxszsgvb6th6jgd3g1r8g5jtaeb4lv3hhmu1tyt0nqb11n6pnuth2bkf7zgexcwuuzkeduxd2iws90t5j8fpuhm9q98ib9u0lmamuqibjdm1sgzh5p8uxx55x4u89rts5rep706tkjnpv9gtwrdj73pehlcbhq91mo6seeo65fhirqa0omd0uls4og04qfzgcumphowc5uetonp5m72fnjyswm3k8xp8rm49hgt5ptwosrgvcp3n33wqey8d28pt53v1kyu6migowr9w85thp63qwqo6bylk0h0th5j7dayplxdspmakwhm37kj18zrv21u1aghromwxvefx6efldvj32k6c3sx74j4b1sawgg1f1afwbilsg1jykfh1zvkb35wa958c8murbw161z0evew2qszvn27j8nx8mdhjglo8rvo3wpycx9sa9xdif5ld4b5c3rk7zsyzxo5t7bme8krpp0jy2qfwvs',
                        proxyHost: '2b0tr4qhjwmwc63a498yb6wztw7tsivsx874iswtg3ap1sj7qjku0l8u1esa',
                        proxyPort: 3152104058,
                        destination: '62kjcqnirpnpeyptyx6ag8xixurhuqhfskiatpehp27dlgyg6v2fxdevqgxcci4r7t6y5zqmheihfvtscelekgai0ludeoq7yo5y8hoggimg5ifj3imert755884ll5tslrf4t9fzg7peiqzzrlukjbnza4s9b6a',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'yg2kamap46efnao5idzzw067e0pz824u5x35r2a1wd0pcr0ra5tjnphai29xs2aughin1ypa5c0k9fqelg881wts5i4yxwnwdrfu12mww7r38761zaq0wqof4fe0aixliv7rbr2itazgsiq6r67dgpyfiyps3aht',
                        responsibleUserAccountName: 'pcod7p86e6fbvln22xer',
                        lastChangeUserAccount: 'uwm0u8wctujsprdn8osj',
                        lastChangedAt: '2020-08-04 02:32:15',
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
                            flowHash
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
                        
                        id: '82fd1860-d84e-481f-88fe-0f047985f5d4',
                        hash: '8y1pn6gdrkzsp210aap51gfgdn915rs6ppj1p0l9',
                        tenantId: '3ccf397e-23f4-469c-846b-5ea87b4cf089',
                        tenantCode: 'kir7ahl2a544qigi83ztluhkwj1besmymgdqqlgzkweg86z6vy',
                        systemId: '2494b540-d8d3-4767-9202-8197a494f31b',
                        systemName: 'vrb4spwk81xqvg674k3m',
                        party: 'qdbr01ikow96yhhwrlw61p5az4kvu5o2nl5q1b1k2jwpfn98zdyr2vssbiqqz4e9eyuz4ca448qcgf5p4pc3zaod1s88h13ewmpx3ku88nvj5jtfghanfnuf80yqnvxx85o9mqugmp1j4b4obcn8c9p23r1t6s0x',
                        component: 'yf31tiej8r71hq5e74ziot2366abulxl7pfdxxcoi6wf4hlgiq5ulx1249qsro92evy2jcaet077qtadixlm624jbkp2fdx239i7crze4rjjhu4xesfmaimb10rp0vewxogmgp9evvsh5hb3rlnr4ie83qgbkpwb',
                        name: 'egodqlazd22n85cu6mae3agv9b3xz1owuopdhjm3d7skqwcawmcgalc3znnt9hxob1b19k6rl9bleslprzxt0bblswsb6snh7lratwx3xgx4fj2lo6wtvhwc9lkzx0q5bk4qh1bm0vojx1h5640iyk0hv7nlussm',
                        flowHash: 'rjtr9ilhzu93qgrxrzhyxh65us32tjz9b947wh5o',
                        flowParty: 'mw6ap0bt49zi20fkrug277x1jk93o6ax5d32ploq7yr1txpsbwnow7iokjxe757wtgrwxy14a8dqqayxquh0iu7q9ue7zu5bvjf4y3p2zto466b0lp8ncamgayqmbkjzxwyx4p2bj7vvia1zfjwuspgo7kzzoc1e',
                        flowComponent: '1glries4pdv0acj613s4fnnm5q8kynetdghmg9lnmorgieldkit39kx8rp0y0csozbjrl1rily4yq1hvuprz076cg7s1tw2m2brhuegt2xlcsmoni00zcfefflykxecgu4uru9y4t5cslbje751e0v0ghjio4bfx',
                        flowInterfaceName: 'i6w9b3qopv063dmc3cqqps50no70wmhgunn5sx5dd4di69dg93hmtpir4chfhfslmuqy4wmrgmv9jme1acatmr0sovx6afk0hoh7a5sf78254evujypcbbblkbdmxsc5ecwihdcrv2px4vfo5nv9y19q3b3b8ox8',
                        flowInterfaceNamespace: '70m0mnywserl4shs92j7ilta09yxrh297wfjx68tjvloat9xqwg803lcx2nvnx0jszhq4djatkhwp9vz8qrn6r5b3cy8quk51i2izbok943sydpy77oo97zfnsoeai652oejdcmt8ea0z8qvcjfs2qcjxstz4gk0',
                        version: '6zt970gtnfzi659ecj4n',
                        adapterType: 'a198kadg35vol346web65o7gvvafn3bpgvireru1ds9pt6wg03p456intnib',
                        direction: 'SENDER',
                        transportProtocol: 'h6cbqxhyxypd8c26gqu7el0naeto1no618jmeta5w2w0sh9lzbmw8w9g1dmi',
                        messageProtocol: '5y1p5f0qel502t00dj2ir35wyihappmrh4hxu8jzyaeg0rj3wtcjpro0q8vb',
                        adapterEngineName: 'mazrnsr6duu7i8g0jxsbnjeievw6fmmvyrw51lzvi4vgxm33yr17vrjfgdpxjnz8shvshs756abermn8h9t0o449mrc3oqpwdfh0md0sts1fz8o4ohzlw8irg6wd6t9n7535dwo9avpmz7lz81uktgkv07vwe9s3',
                        url: '1x7f8fgregfl0y3d57bep7bkvg7tt4qm9q5w54ugjj2d5f65vr85vfgy4vqs0te6ojuq2hw6ls30aq3u9yfr2htczg8yl2sasljhhj45xgu8ejlkwj31v7oipen93r7vb7ooggiogafkdihkd80h8x2ncgy87e4xnttr79daj428uolyyqnurhzwkth3kcoekjunkyi8lz4dvzr6dmh5y9epdpkp4ki5gxibb4n5vuc5mhgcrl35jl1y2pjc3ylqlfb6aw5yh9s1lzfoclatbsu8utgz5yj5ep205xmm40zcq0gab9u74rcz629f1eku',
                        username: 'k3947iie0vxwzv6l22ew94nutnwc26bhig3z600aytfyb014s6zcvrjkrhkm',
                        remoteHost: 'xencr3dla7f23whv6qjushohkk9h7hvdjd2e88keygix723cybywxo0fk0qza3r4wadv5t1hv3torupnik0y4f1in94ztvkrh5bnflttx848a1sucul2wpdsf9rzle4gtjxjxthz7w85ggeys7zememmtxbnr2rw',
                        remotePort: 1759280088,
                        directory: '6yvdj1tqoy5f9z0mackxborplc56ickpvly4rdluva8mix9bq23f2zu4ke0nvywstc595rqyf6w62641ssw7e7y79ey9oa9qd4kx8c8lgh1qvnzj38xagnseyc8s33tzjj6rz5z1evu21s63f6cde1p9wr8qlsodrvu48njf81jjnjawj2sdvzp6d1iiw8unukh8bt86axv5excqkb3dtdbkdrsfblb1i7z9cqmzr2yfevwl8trd3imd4vbvdrgzouep1kkm94qamolx1f92mjnahrbvz7bpxt2el3x7watrvqqiatvqftj4tgkmqpjldf39yx5ycteryzstcjm15h0vh49f7qurz4zi0ttl2o4siibnkw54cdf9zkp0e6fxgtjhm8sqwnbeaycm6yw3eb7cmszs9o1bxs1smyefnobx5z99mu111tonvzjp317dfubcnyhbjd56mbavg567qxb8skxpgahtq7jf1hf4o2h46zyk8o4j4m5nafpdhpwvh5s1sm1yw767mho6kai6citl64b39su9cui0z0dub4iufhpx8tosm6yrc5p90l3w2611g5oed8y3fn4mdh8co40e0yrf0phhvoe383kdrb46emiowmlmndv75djegas8uhvjvnq1hz7nbyw9dd2s9co7z9sx01ybsz2gj0241ctxq98nf56w3x56exfhcsl3xkae1pvb7sj21kk5x07p8rcla5c793txyzysvlzoqk1nslpyd5vh3ye1hskd1678xjw4kdxn0khq5enileaqk107h9ka64zv240pcbam0dsrmeoqjn1o7myjeggqaxtibh514zwrnnttfwjtrwhvqyd2dipehm0mh545d07hl1xqyymugywq0e6yb116mxnppt4h4nqsetgf5ipodfpqqp4wwrqj0cwotfxlonjxaki99gv848hku9mwowy2vfqkc7x0goxholp3t9c0owlm7nd6k8ukv8pc2r1j5fnndc24yhud49r42bs7s9xbz596',
                        fileSchema: 'w4473k3wglymzzo7jde0plh8q4hnh0bv5j6bwqdn6k9yu1dpie1epy3hzla4k7se0ackex4xbpdcmakaeujqo3qwmai6x3t00rvf5lyzhmrtccye5nwdsinjganf38lb7zl13rig0gvlgq0c7nzg93souc29myj17pfqjhkyxlpstfsogkkbe57euo3vdjo0gyeitzf6d4gp72r6dheylmaj80l1rkvp391r3l0wb57efzt1k56c0cl6fbku56sseyyz2x9re6kznou65jr86xjswtvclwltf9ltfim1k3j4bgemj5poe6d9vfnf3n2d89z10y5pfqtp5bpor9f2pi0xvjqx5wpvfsiiukys1f17uyeo1l5525cnzatt3g475ou3p1a13iqd56vst8g54reww3z40117b5skby73bbf5nnx3sj0t9ym1oplwocmgnxcojkhrzz02m5jfp86nyp146sy6srug1g9mqo8o1icicunzwblv05pu7deut4fg553ro2fytvpxeop4rij5dhl29qrkm5m0rxlncykr1qws08zawql797dtalllqbpjw0g6d2ox3evb4918vf0ajbgswekpabjh5ez10ztbcnjkveo27efhfz5juewgwu2apb9yt8jpq39lbjltizgsi7fi7hap4j9w8oph09hojb5a2s4ef4e5necanea8usazjfktqrd1l3bpq6d9yfkdwp3c6eyq3pxtncrbchre8b5l6k5n5tdg5n1tdppfiz5wtkygb0i1k6ktw9fthm0mcn5y3x5lin736b1mx6n0ze017m3g50991r6v4qygbh9nh4znutbo7wdw5qogbozlmemu6r1ymmksawu2okxg2x718xjycfmhujdvsmgf6vgqguae9q4pxjiwj8ebnzityjm4dzxrl3x57rqzxsah7inga12jv49kv962n5o5jr821rbnvrml8h1o96ku8r41e72ewx14izz85omdmnnbpj27dr5c8i68wp1ythw6nc3y',
                        proxyHost: 'fkcf69naf8u925lp6vtwsqgnv66o06fsywk0anxobjlkifcwvwubn7yw94oj',
                        proxyPort: 5174496959,
                        destination: '4w2pd0yt2ki7dgpphjabxxp6ng4sv0qig8k0kfvsves8j2c0t4gp1txo9rd72mk72cipog8nmwd2dnugyc56scw8dxkwkhg2d1qvh2nhk3n2k9si1bbl4kohjtvc2i2i4qbjayveogdfx9rkid0kqvchlomwq4p6',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'xafa5o2rkwtqo4tyv7gyo8ip549vffcr87gkiyjzcu7sgkeyqar7sgp10n5ts6tho4ne2sowuus26tbvpwsl80nj9s20y20j74dqtos4dvoue9fmdpqvn9j7y4xqec64tm9k38yfw4u61ehgj37ixzi5zwem3eme',
                        responsibleUserAccountName: '4kekta9zbr9u4rsmhxwj',
                        lastChangeUserAccount: 'qhezvau7siwom5b0i6k4',
                        lastChangedAt: '2020-08-04 05:19:19',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('82fd1860-d84e-481f-88fe-0f047985f5d4');
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
                            flowHash
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
                    id: 'cddf2623-629b-495a-8307-7cb755b00b95'
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
                            flowHash
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
                    id: '82fd1860-d84e-481f-88fe-0f047985f5d4'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('82fd1860-d84e-481f-88fe-0f047985f5d4');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});