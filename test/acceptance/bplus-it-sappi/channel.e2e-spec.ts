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
                hash: 'i2xf9rns6uycquaq4jvet26k6ey670dcabpv3mp9',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '1wtru3twdy3jukd4hozousw8w7611uqdpgc7487mxym8mp6kgn',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '8v0al5sv8ixj32at72cx',
                party: '0yzpee64ll5qd72vsvtziju4r8qnl22pqe38eu184xzmnyeu7sj21h5dj65gzb60qa9noiw0uz7d3ucp7pd7aaqead1iq7pz4f14by6uxnb47h4nx6tw5bfkogpisybbkrhrkc5itaoxquap1jhe1gvucrkuhauv',
                component: 'wa0rs0dr0mduhv22x2sriw21gv8vs5jxtsxeltrm9h98dbac5urgofjd195wjn6q6b98ijq3k8gzvon84rpncmncn1v3ozikk2tqt1eshya72govkujwm4fhkhd7o2vaubaa2m4qxjn52qvvd9hxn460xsd5qmc5',
                name: '6q8g4qw17lzk6dbf2833tpmx64v8qy7v56tn7oilrrltuospfy3i90qe5ipdg2klvd5rmp1pqr72uqrtnfzn7yytx9ln2xrtjvq6kv7byp4uuznvy9axqqi1k37tnijyktutahgv36iqzq3ekljov2fymr72umru',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'xo574l30icb9kvvpjascxe5srbnymjc2u6ouqv13opuyuviourbavm87cnv4kmfawyoam5pkva6k9qrqxrml7hwhyl2okr64kp1wb5ntzfobmqke6urgyg0llkffhrh46qt44j0f4r9xzxphrm8vuaebyki1dkxr',
                flowComponent: 'kj0rlvvog9lc4b3a969nl2w3uy2nx6dxenn79d0eoxf4ackhsiicww0ukyub3d0yu4g1eehk00gt99b6go2igllitdgz7q4dx8po7qmfq0vn5pxrgla1s6o9t5w8tywa6gnfxn81y1b2wh6q1lqcjiyrha5jn3lt',
                flowInterfaceName: 'nb68r4q7y6h3sqi1q0b45muv566ks98miny4k8yjnb3ub0dm1jlszz4kya83rtq24s8n6uak6qoh232ekbizkgah4a9q21ws8yzildpq8riyfz3i59as3qet37qlfdf7gtqpd2grehffauoe28fvqjzxk2566hxq',
                flowInterfaceNamespace: 'hkf6p0yt7qei03o9u49aasry59z52e4eytzb64kd72wecdsb8pn8v0p9z5ipmarqxg32vxpr7k58y8hwc8i1njfrfqbamdx9xao66ptlipn5nfruew4vllrasepvfmvf0ft7ag5ecjnvdm7tkin8dsjvkis50zax',
                version: 'h536rd37lys1wza7oiwa',
                adapterType: '949dpnax7u5rqynx5d93wbn5qfqodibv9lext373inglajhh96gaaomcns0g',
                direction: 'SENDER',
                transportProtocol: '3g1hs25qmrrn3m0qgsr8xqcegv1uh2vp5xhw94vztqsujyx9amp1kqjk2ojq',
                messageProtocol: 'dieub0y9fk38ef74vsovdle5o52oesct5evifpbo3u31o6sl3fujgsk4pitu',
                adapterEngineName: 'obk4bzwbqyvszi1gxjbih17k2v161yhcz27zr2duldfdceye5vp17npwyk33possocq4f4ub43kcfm71k5r325o0x5dl937yemiglvn8rsjtzsblsigf726gw1tzqkqtz5t8ifmj4v4dntewfsenfq2f20hu31q8',
                url: 'zmjom7awsyg4osktne4sdvg0izm9i0ala76t3bjnlc4qq31oqpgy387mbe9tdxe620dex1snmpwydzlxt8tswwmitjtnl5pfo89rgl10y9cqo7bewvlt4ipxfy49a82arpgid4j6ae8r2ykhpfun6hdsqtd3pc7yvzzxoke5vsvigvcc03pyrm6do947dnj8tnq4yq6181nia9tbzaiw888ny6hvnyoqdoeidrpg3t005btz2dpuhm90zdynzy8v99044y1qh2kurf6pxc3ddzipwtpi8c7jarvy1216ou28r7s8jj8l244rorovrjmz',
                username: '27b4klwoyol11eblr9fmogvai7151m1lrrkwwgu8dbaw6splsxmmb8gqe0t4',
                remoteHost: 'pe32zbwmuccu9uhr6o2zfwfawj1eb7r8nakzmjys4m8b4rwyktw3c1j06ay0qulbc8m057rikpkb9mh9lt72vuuco8u6ik6gdijk6sj7pw5d3k0ay2ps35vc5sfckg295nk2onfuganlfvhwqetsese0ny39ykja',
                remotePort: 3692401291,
                directory: 'znpyf9ghafxgibo93ootd46fb0bqtfa4bsvmiw3mtuo43ti57bq2pmsp0ct79be1ct897k5ishg33i4zknm8au980zit1em4gcot1vat4w0zgfu4gq3wcnn37i0lihztky3mwsspl7c07dod3ga4vket95nvybk6tq3wklsaunqrv6avtkbox15rlerihagf8apjdyqnkzq6p7nuvzxjj0aaowm6213su7c56c514nq02l1ff5ggpmffgtejqatmm2txhwmaftvw9fm3g981plg4o0a1700vmd5u504touw9eox3qub4u24ft14wse0gmtz96bt4x4qu6djjzt1smmror8itjgi212kphbo7ge7sze3mq7wd6qovklgc6h7fod9lq8drsyjn1czc56m1tot7c82ofc584dt3qgqpu84q8al9kvbi024nl487sol56pd8h88rnmebxyuscyov7hsbcymgiq8jjlhf59ieqc5zx49na31xigb1f48otgonwl058if44af9j54i52dwi2fpigr0ct62f9c29wyev14luno2h8317nmt928mq6t6gyxc0sp3q7nkg67i808viyqyr49xvhw89hfawkf8igjghlhoos5g0x4z0a8mmhlqxh1hx39881hfmrbngozx0ujazvk870uojj3s5fe6ctscq8osnlp65lz0lkl7ilar6ayjv48uxk8jsc2dgxlv4u0ctai7h4jomsk5wpb4cdx6vwdtl69wfgmy3w6ahaci7kr725ppnpguy7krcee6qrdok00rjia9k3q9pom79d4ogwa4yxd1mb5giwa79occf80c4bq74mui55kcawtjqmqdssrhk7f9rbv50ng7evq8t9a6uuk79nqeezhhf29u8kpqjffwoch976i744i4hcelgi92iv4eyhtw4mejcgnypn5apmy2d3fieanlfnjrgsntgs4xukhvwy7dnp8ezzwklw6nxkrwvf8mkm1mkswvwotevkm4uroknj36vf4c',
                fileSchema: 'ahzp6o4m055wvjmaltitmseyrexd8zafk9cjm13kv4eck7lakywbb6scm2rt8x725tu9jqbwgklacg0uqualcdpmqcua12j0gf69mbr1b6mjxuduje89hl3nr9jmhfk9ib0iu0wvoz9de3wpadjm6s7usw39a9yffniijbjd0yekqyx92ymnm2xlkjqbrqxbmnufrehv9kz4vavzljskflsomb4bo9tavjodyvzie4wdtlf0y5vvxnk65pyueqf3gauni7me96ms713qkt7a3okowuqryzr9mwvatg3d63qdlnq6bts177gtpkau0w805fdrsbsg6svkowzm4dz48s3vggzms9ywbjs753874dqwd02xdbovsqm1v97m8mep687u35qfsf248smm9sg4jezehos3w3e7jf9t0263o01gzex0uvkneyp4mdrmdkbfd54r3q8qf2j1thh8kck3fga6jaofejdx50wbk8mxkyngdmcvu7h6y3w9e1un7bcgcp0mxgj9c02d7vzylhestfzduf4llrx3gxugpxopl42209b05smm3c41vys8yjyo86naqj9q1sfs5figqceelb0wvnffzhup1bj6n3vfyzax3471b73xcootvejznspmh54ylvq6262tgzxw73ht9gsrvjv7fgcmzd6hdbsq4gdq5xxmn3vec652x60d5v7f87y87r54u5pv3yr09sdtzihtr2frajg40v79y7kntdiqpem5foyxpo1py87powf0jzx9tntq516qxj1wej38vj5w0dtudmzyqexa797i8valj2wk9f6vel08a2n5foc7xveu1e82yfkh6vtlfo2ari6fvsanjjh6dawsl7fqkazwdw14vr6enpsbf78kv7a8g11hr78iduv7qaiolxts8wolfuvmaa58azclrscntou7iqcdi0edfxw5wlz00335ulj5rf1uz7ti2pghgv3rgpqfisjf25bnly59eivdmw2vpupubnssr7kfld5oa0tp',
                proxyHost: 'jy3sgaiuju1yfe8r1szxkxb2gymyjzwasdqym5r7acmho5l45eyul2x8vgeq',
                proxyPort: 8937967811,
                destination: 'viq0a1exqnk9ut9wccynbk5gag7czjwb5iv9fhn17dg3ggpewsygnanu509d7vklb975qtiif1qlh8fuc56deloi28cp5obnrcny2k7pczv55to9sdes02s5klx2uqksrtinznfegr674fc5cepo4c99l1itb67d',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '5c341tks5qisvlvusmt6pdzfcaw0fiocd6qogq92623wpy9w2c44dx5ltl6zz2xa3i49fh40w65b2z6usr8bcre5tqrutf18f2yz6agl6rwk5ko0dfcjec14hkbznccj314qvr4chxdmwwa0nhihysgvjrs9yxff',
                responsibleUserAccountName: 'r2zh4rbgwrhrp1yrpc8l',
                lastChangeUserAccount: 'aj2x7786k17jj96u4gkw',
                lastChangedAt: '2020-08-03 08:13:21',
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
                
                hash: 'atgf19lubefenhnso3n3eo5jr2wma6q5pxmzoazs',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '9bkabijmj2uk8ftc5m0z3v7n4x00knwoqxad7s6tvo98cvyxh4',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'kyxmyvkx1rr2ic6dppia',
                party: 'pijiwvej34thuoc6ujdo7qc0ff9ddmkas8qukg98uh25cpd486srw2xlje445laprwr46k5q93sxtdjzt8qczo423l2cg8ui1ys6d8rffp7adp7n6pswqwa95fh5ce6tqy932ozj39wtdrtl6wj6u874cksealm8',
                component: '40rvc6l0carwp8ccpxqx4v6fqlppfmx0vk6dqqtsl45jk8e11oox17d7sqvyf96mox1gj2a0ffyv5w4j4sysxemi06mbadh4uym5txvfux8x08ba8cpcxbze3ihf6ptbsr7qyk4j13amn5emtn4ax0xsuellfmtx',
                name: 'kuscyrbe8go5qunm8rt38hfz75ew6wuug5bqu0f698y9et49qdgz2zkdhjfsut5nt2nnxvv1tu39t2h9opmebcvqjba2f8ikv1krdrdeqwzhv6s324oui2zoduifm5w6txe2y4gcywg6hflx3kfcoywht4b1rlue',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '5imca9c7q1v4s36e3ke3o2okvrj2lqz72fzb0jrijfpj8p29ncuo0sn35if6ntsx50dxa014opleclvpexk3aabxfhzzg8qcuadmst5u0f6ubk8kfn8up77ualikjipf5db5ww7rgebq0wve98cgcyk9hgx7vgqg',
                flowComponent: 'aagihodeb802e20yhxtnhz6iym519zxakxflskayz7dqlk83yvl3u5cyusd69ax23z175tm32ulldowlg0rs9geszqu79d68wn3fw446ycmobn54lai7y23ohmuprw9001i7dzgq3rwa4cjy0poaahvzdq02m18g',
                flowInterfaceName: '7up1gx1mgedcv6ej57zyofv7qdzm24v55qk03pn4aft3v7zxdmmsu3763d9jgeydjj8ra5dtjxdaq9qnoqxujbajwdmpfyvp38wcepgjivms6de5cqwqqhsx7in9yklv5w6vet9qvol6645oz7x35bof620cad9s',
                flowInterfaceNamespace: 'n3bg5c9jgn5oi8ey0ihv53ho0tdms1gfwl90x060mobtkv45a7u10xdv3y67aj4pyt9vcpl29li3vs3hjc4cnudhura3ex5lovw62neq018fol4t0snoipr38v0oww07bv50urj6c95a0okxdzo4vlrilqypfj0e',
                version: 'tditor4lp84yqobmpalo',
                adapterType: 'ycfw9falejrghdo3g5nxol2vggyly6d0qzbtb6dxvlctylj2wz0h3x8wu1b9',
                direction: 'RECEIVER',
                transportProtocol: 'klgll6131gfhah5bn5v7082ua2d8kweewhfcpgywyd6gwsfg410z8hy0if11',
                messageProtocol: '1vekc524p79filymhowegf1970b36j6mef4p3z72vlznaoehl25u177hkdtm',
                adapterEngineName: '1y5m3jx7zxlgu3rkw1svmsaq7tj53g3b2jf8tbwmc6duvgtt5t75rn5f7v6g40xbzk7dv2y0ovqk6z4ln3ha46t6nu2yq6feevbbklnje73mths6jfcxnuflvmlfjcu302n4fxo0utkfy2y06h24jvxjs0cucqrj',
                url: 'qbxg8wi1hps3ijazcjcaxvx6ztea0kotpgnmwvbd3mrim4wztwppg0gpuq6kx22o7jvlj0b6ne6yjt1m3jza7q8k1442sjd3mucqpna9duiptb8cntrhr5zcm951u017o0iyjrr03qgieda16vhrklvc7fzsj8jczzlfzsci95jrkr94vc7ndm3vmi0ts9hy1slh80j5uiy1aag4w8g16wil57d285cu11lhorgk7hqv13gchv95oywlr765jfd69ngee6du1qyb7zbpqmqimkdly55k53ssa1xh7szkx4dc2pob60qk28nejqy3f5zn',
                username: 'przq73psyulm9vxhj531t0chh8mm7f1g3aj03pfhurstxiwo9v5n0wp0nn8n',
                remoteHost: '5mq3cqhqctiafp0ja4egn4ia66lejjrupvetc06doe5dwzk4bgxco14wwfo4dbrgatuomcpqj5brsqs2xcbqidsdasgkj0jmiczl1b84c4p308z5p48y7lf03zwq0ae76dk1nhnrnkkl9vfd3ra70bm2bgwnxo7e',
                remotePort: 5052628936,
                directory: '5stxp8vnorj3koaaeakbk0q4l3kzggsd0ghttsjkmktx2vc119h550v8lxqvx6t4gotj79oykqjdzfgakjgvcvl4e6dkrkvdnosn69t5fstfk7mpwmnomnti42uu3g46famnno0zuj57dj9w0p9383j00pahm8plipzpys78uzjy702az5eyk6yskbm16npwvvfyyq0sm7puor9et9dzruintex4zpx32temzivv2uv0w5tr30uoq9l3teui24fhrys1xwyb8csuwwkx6uwpmag79dewa9rok1xf67e17q40n18of0rogitk1cgagenfcebxggl4yiwomu5yibb751iuvugzur8568e8yx27gobnic9rmzupqsrupgn4x4stljjbo26pyjhoguq53n1jg0yl1h7c93acfyu9lslwinau05flxgp0w2ylcytsz1o0nw7mwoh6usppudaa4srxwh0qz00kbno0bk08hx2r2jmobo12brp3s5so43vd8t8x17vj3ewf613jmw22keaqd1zgfu5ffuq4652z4ghc51wk5bq7bmf54d42pj4i9vofq9zp9lfnjw34a46r88xve09by1t78pmky9sbchlpwk2pty0cee5gxdcws0wwuurk9q26de2ygsj6hdfxhfric5qttkgjffbk08w6fdi2c5zeqxvsc3ljzx1qln49w0rqzz6cwe3hk8b2kkmx2t666rikl7y4xmbz05rb6f06xfwpmuwsh9dshgywzu6h0zx35ezwiofs6j6qvvcgv0v6uxvbhh3kt00ulky8f7z0dh8sfubysdgi7zakrlgo19o9thj1c2ng2023tbpns0ihtbmtixl3rxfck4ll7kfh6znuruv62jg4dqyqnf77kw62h8mac4a8y1h2kvb37gk9tdsmgypged01fye5x0mag3cdfltob5dhtxog5iq6ymvbln1vo3zr2thv8i82l03lb1jhd0uisyvty2c1ahws3hwwqw6hhm0223f66ifcq5ra',
                fileSchema: '1vszmkit7h2a46ruw3wwe4fd23lvk4c4tb04prl905bn1683op7wl0tqq1y4r4pbtm9eteewkf54u0ch9b7xgelqvqv4ep4b202r2rxo14y9gvu8dyidx3tlodj0jwn63jlsmwbx4w8sgjv5ujmzcottpwg5tn5q18gsgw2bvyrgyl8wf67b97i91vbj0rohp0bq5qgysg59o55z25gshxrsqqhkcifr6d39vde4o82egxldvb0jqntjphj6hj0o5gpdbax978m6euwvu4c2hawj9vxl3mxl6jkkacsf50n7knq6tgfrfcqwwb26towqlgkf0ods810ggbqqsk8ac4mu07pr5gvr2dex3f9q2fyf3v24z626q04eu88glwdzct7cw6005wmew4h55ks4oosehl67y3ho30x8lpqx5ykicpnbes1pihx8mndndjkraohc37hbgdms4eb4w0cuy87e8ww8q4n34ws1aztlvez6hf0n6nkmjbja65ys84j4apblt3vlc9vnjya58fd7fg4km861tmjnybo8x3uh1310157e84kbla0xepv3e2x2ym5ig4mp2bwpvw197lgf87sllufll2pymj1xbyr58dmofytrrdaqxha6m9vafl9j8flby0zmr84u8sjjoyhwqgy8b26zh05tu3wjn62vcbnc7hnv4rtslp67w0c9m4ntyp2ukh225v7tl4mqtaf9jqvh0a96tdnce5ndtoaptiu8kctcpzxf0yl68qpob1jafcs0nusnywq56j8j864p0vmtjshrarb75mo44fkd75a7wph5kqqs496gipfnzs5qbv33w6ksmfcq67vb4s7l5gs4g55lxi6gwah424ihp04dy4jjbutygkxgb7sg5i52gshuj2pfjarl2m1o6lsjyym0a8d8a6bma41ony5b8lg88apifjqaa4od0vg54ymobfisp1kuelsgcxju6w0fas7lo928yvmtz43fi5v1s25twxiq82jmrgvz6aiac4nw',
                proxyHost: 'st5hxlc4oarsl6tp1v8h77gl4q30udtg2o9skui46p2p188k8vqf9szievk1',
                proxyPort: 6182075897,
                destination: 'vsszqg0eamxs7fzugk4045urewabua25rt8j0yjeyk063kzjv70lckbbq5dq7ftxd2xnhdadpy6dq9lr4jemkk78mi4r9gxgvkgf0gd6j7p7a3uuum4rf5qucjlqq82fnrshqfg1kxktfi6z3zd244f15xm50nq3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'yds5mm4hoiq3rtrtrnjb5hf5z8yg1wq9rwulzhmzjdzjpiji1ia2zw73dxmmew76rbbiduq3nyhrnp6342ps9mm39i95fw73s01g0p8g2ufskpsc34t7ufexjjmhcwr97d5apz0gtm4ee40iyvhxffjpcrn2ue2v',
                responsibleUserAccountName: '21npen16vknfcaqvdrtk',
                lastChangeUserAccount: 'g4ercs7bjv7j10vyphnr',
                lastChangedAt: '2020-08-03 03:06:29',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: null,
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '09nquez363kscgslss7nocedult8y3pvs8qshipt4g0ni71pn5',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'd5mni37pmn47zslcpxo0',
                party: 'ip7nvvkwyzsfre8k7irzxavu6cnft3xesh3qtzt4g9iph373d965w85tf2cg399br93b99dulob7rqqxba6i7izzplfj4mfu1y318t1yz19h0q10du6o8i83xw0o89zg7o47918um3yawmyesvga9x6a3v6i2fak',
                component: 'vhalq3kywak23m7vb7o4zcogxb688qy8lz9obqyi2wf6fl7k8wbdzsl2lb24qr4fcbd391kaolcakfq8h2xp32yd53rin98h88ix2kk5cxdiktgqg6nqvhsnzf6p4frsgcfh23d952p7ppuyegte5w1od9sktduo',
                name: 'f8e2wdsv0qu917m27trem83phoojt4niic9m3retjhws3yv4nj6xjiqml4sij67hcwvol42yqaryig4178v9i59e65isnq5fd1fzq4l4n610u547e8hrzslg9e7iterfri4vw6m2fystqxtcpzqsgifukg5vgzb8',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'qtgc204qircdwkgtxltsdfajotduqwcg81ek49idx3aob6b3wa3n36e35jyactpuqmckwf2rdu3e30v6wiu9o6xadokbfkratzklc8jxg4cqg8s6ml84tyvfz4vnyr1whah7j02ymx8t41hj809xf0ljq9akvu5c',
                flowComponent: '8kq2g3rt2fdm42p2xl7g2z6wksfkuqf3xdlik56mk7ut7yud6yg5i1xrfgm7l6ip3ku5ps8o6pdce1jsg43huidt30klxgv80gjy4737muhhi7hz2atlvzhltkihfkatsoniiqq1bvwbomd4y3595j419q8vl9iv',
                flowInterfaceName: 'xchyek80hu3ntu9l2wpewyxrs9cpfal5oxzb0y920zpry78lcip1cedkg7tv2wq2trqxwde5ivrvwyxow538f8zyrivjs3h1jp29ys8dvyj11n9itkict2d6qlvyuazq5jmp9dj0cfjy0pdbwl7tnpo8tf6j986q',
                flowInterfaceNamespace: 'geiphbu0iccbrc2gn88sc9rexlwuutcv3ri47ot4ihbijscx70kbhmubuv7sn5pz7mckaezbv7j15tlgx0qqlye4umogxbivbfozofc4gucaebyp6z1e4hek12lz4c665837e2gj9bxb2d24ym94lyr0fzzk3f6x',
                version: 'ox06u8hnpq77mie9hosi',
                adapterType: '04zzi16ir6yzv1tdspcy11v6tzoet7gufc1fw5shwram9ip5mos9auio5c4n',
                direction: 'RECEIVER',
                transportProtocol: '5n977gobiyrumgg19y324dla79bfrimhk3fqbrvfu4fr0q20kzlxgxyka2sb',
                messageProtocol: 'f2a60gj5ab8wyohpgj156jmcyqzp0itwt53kwk8mwk6g8nv1rre1ijvrojry',
                adapterEngineName: 'qpwi2eafh3oc7c5liwrfl91j4b5kb5toe95ulpj4nzf0nb7wjv25devdgvnroe1y8hg4b63x5tisd835e891thr9wit5b2jc328o46n17heue40ro4dq4ntcpnl9cdvaxrzzo8f931q26g73j3lx0erbkblzunx6',
                url: 'dk4ewtpzbgp4u5oj7lg3wkij0cmkv3fjyeela088a6hwobyyrbxbs0caccgbcjtoc314vuxcuho7wewqre20vh5kyw2f39xytd6fvm0aeggpqvk4an6ntldvr1errgzwqcbcxrx743a69frdrcybtitfxpzi57jsh8ilpbzy5cduw5pmhtcx20xihdb9tha87wcba66lb3bltsct4a52pc1odxbob4c74mqkxusyip1bfa8vkk0gjdj1f0u1inaau172yovj0w5t980v8kyi6g94cmlwcqyt15pmlidzx74rip8rir10z4o5ot6nv9t0',
                username: 'rw239ndagwqaqyai4c9vzdw616gt4n2o45c3uma85plg4jwhc5095rv4iagc',
                remoteHost: 'i4egltrulda0bxngzuw7b7dt748guxuupvqjsnmer7q546xpqzedyacfng4j25hy8r8sc7e63ewydzbpy8vndxeuqfstmseg1p5gm0iuoi3qucqx2wb2u5trmtcm8lhc5rjhkbschvhy47xizsjp8v9zwppmucxa',
                remotePort: 1361024441,
                directory: 'in0k5o1lklddxtzdp2k8b835i72g7vimqwuf2ihbn19n0jk0ehtjob56ooyh111y4zhbj4ezj4l0yfq5jiqar3hu7j9m10nb5taoivo2i3s7os8n0ecvhkvjnp49a4c4k4ag1gibmcfwb4juj98v074k3lremw3oaqyznptd4j9m7x7kgbqghl1zv18qyyqeeu203c26kmhrvud1r5svjy5sxxe7abzy5trkuhwoasl0yyr8f55mfec1ij4cjvtwhvjq88zsxj4lasojhzl5glqmtbjldudivzpdk90bolpuoeask05bagwtqqvgqwppm1m0hpr4o3jqshe01vrjh14j7lg9v7m3j04h4l0zs36izi799f9bgvzpck22kjwi1nnk2l9yh74l1dcdn5io2u7q7c683nycicggi873g3ueat8ave06gf6u4s2ryyzsv0xttfzcji634xw2f5qanbontne4mdxdun2nqt6yqykj00q3n8f18itu7jjf0k7vc8nuwjncm0rysl8p9lt6yksxe1xy1m8et08arkaxd5a6rpfx8llajlykw1lk1y001i003ie3svtaeqeol5gv939w5sojttay3t89d7k8mz495f68i8hm3lvudn2y4mkhmt6sp5mg2eiqj5f3azq1ruh5rexiy7l41t0yu4ikgfokgdqcmbx6jvpiiyfgbb7pohjqebp53l0p1o1qv552hbqxxofetdxva0vsj6sj3ryow8nf167zjhcibt53ymf9edx7fgqhscu58cfzhpqq6g89awphahzg5xnew45gd17mk096h78s3pa1phmp1qemjq9w4x28oaa1hz4ouzgk9akrhy0o0rv1e71aj9qkyba8dsmmcv341aeue4l110oexn1m92r92d7ks4gbwpq69khif8c8j9n1sxkhipoo8d4cybvfg7sqw5miyva9h4gz816z7qq93gdvdi8renw2b1lrl27fyue876dlux74nhnu29w44gy2mced92t068kr',
                fileSchema: '1n1sq7bsbcvpc2cy2rblprqsbbam3orzuw97o2kayiitdirp05qbp9lgcn01sfnyla2284g7atbvpfhk7igu8gza5eh1sqnd7zk87sdt5ao28gp5wjbew9xpzlu1x7yyx1vq0qoczszsdnf0q9xsfmr47adphyt3p03xbjg50g4ldnh7381yu8wuvzgnxeurflzhjuc9jp3bt0gzhz5irpunc7qci6q6i7jpryhvjw4mvt9xfn74rerwkb9bdpikcfuic2ed4f7nqwi83kphqqs5ytzfhf9p585tustgyc3vwp1t10qnbh8obnfdftig4b449hc1040tnzzeyvi3jximmy065dw6f3t2pu6itgzpmc01f4px5nuvf7gwe563z3npi0or5dnsld8pb25kug3lx4i4pc0v7riu7uslyww38gfjn1kfoy09xofhyyal8vucayfyznwcl2mkfuomso4t0zz1xw2jh23bglloog1mv6hwactx13evmkuyf55azcvfbcqtw60n03mqf51xhjjai03os7x4d0f64pzgluvvcvd2n79by0v49m62kmbg5a7xdnccejdwt95odstl8byc6kiezmy0y4qipu4lbwh40974xkmb12swnzq66zp6o54d1jor188tllol1720fztvmwt9mtvzbxs0r9no0qqdksjcjfep7wem1r6xdwsj6ql9569701m9ndphefj1ax8rfl371s1g2go4f0gniaif0t08im172cjut8dzs51vt4xbnwm4smcdt24asywkm6afneyagyf4yqfwr95fkji0moul73cw4i3ygfclfmi7s9aoo6hdt15c4xxufnz9coze0nwvh2ai7ocbyq1uve2bwvvnz07bw5r9e739c704nteicm3s2byrb3mmm8c5e8vb37ub5uxpfglmi9gasm6b6d4457hzglbpj8yqbhhc0xt4xnqcl31bp52tbncxyotkt25u42djq961g0fdrl7qmz0llro4jcpii687u8ht',
                proxyHost: '7o7s7zzf7u1p042cjbrmc38n05rk3lc2vi0vvnadls299fdrxc4ez1xa3ctx',
                proxyPort: 3007934479,
                destination: 'xo2nxwfyngm5obc6xu7sd2dde6d0bieq0059b4i1z59mryldhgjrm6bcqr29pp6k4fcj1ibc3xku8wbps521igdf479p6qnq7zt0ffj9u6nu8zcgth4rgbzaxonmwjkpogtvelyulafqxhwerajc730nkwr0h2s7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ycy4swt5wj8hjjye5wh8jbp55848mmp02azb475l7fodxqda91bg4y0zq6jauv2dedco21ilc3x320b82ik7eno6wouxf3k1avtdjxypnsqklwtx4zg7svv21x2ylrm9w9s2izclpb6vampiqolotfb3clxqcnv8',
                responsibleUserAccountName: 'ivwstegt31rgyhku2x4v',
                lastChangeUserAccount: 'btz2hqmnxrp56a35yg3c',
                lastChangedAt: '2020-08-03 08:34:16',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 's9sohsgq2xnidihk63p6me3c8m7017r8j9hxs4drjjbwor0rz0',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '91gjokjxuk2dbwrf4c1l',
                party: 'vwmns6awdemwrbyepoica8t0c79e2yzfxp1y6nm2e5fmlgrcqw4647nnder838kpj00l2h2pbladk1pjv7q1jje4exma4pv8tlwkft6e2ekme8impjfyq7z31y3dosdd40467juav18n9flcbt5bvj71jt85u044',
                component: 'zb50pob3s0t42tzt3bda5b42htmkjrfcv9gdvvu7jhybvenled5dtggjsg9om4kmdjedv74u1ddeglyfomc0uo4yt1y97cqz1pxj0wsf6t1gvj4dkr909v7q3kd6ahr83mi1fcf83ny3gcx4rqyzed7vcskp2961',
                name: 'ci79up7x5f4s8jvf5to2dz3p1w8j77x0ybl6nmiwh7m5uphtent6ywwv3dotf8e7djj7or6c8pbv1vxmrq5yq3hvlcb7be5ecluihrsxctvqmmxtjzdhaamtnvq2wqi88ctxvypmtf21f9m2ozjrmbet5pmps8ew',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '1vsgo43414mzylr0hu1p1xiaj5pnnx4dvfg3ewn5joknysq0lic8ipoj6ub7mhubemhhrw1gkvikoputdo1oc8atbpizw3a80onscogab881fg8bz237dbsihw5jpte1277qawaqshlsw0vfl5eh0y29hiqhdlxo',
                flowComponent: 'wg1z2b29ju59a76mo7iv02om8ccqd3c1s30rvxmevarol0g66v8o3mi1svjlbfpbhm5n6u17xuca73tzzi135k0fnm1pixsl3vo23w5edjgcw8vq0rfaiyn1wdfzfy31weitl9vq5wdadwwcbgdfw4i2gli8gd9i',
                flowInterfaceName: 'y2dph7wuggv66rti3ariws5pqvox1ydpahtarchplk9oadeqtalxieyqpot1q9nl6zsnfhq8nrl0dgn4x8o752fcc856weohh7zgmp97eedps05luq2mu5t1lmmv9nh8obkd3vb05quu6x24c9ihllajz90xa9vx',
                flowInterfaceNamespace: '4k676blygueusspz81zi6p88bvdf5inw7b7r6vms19u73i6nl1tjqqqcbm8tjijcddqmouz72m4hfstg963dlkx5c9whty5c8vfk1orhnmxfzhqp4691dk5w9ktgcpsxjugu4vlk2som8y8lnwzold3wmn4dlhaf',
                version: 'lydhl36q12imlx23d4z8',
                adapterType: 'qu5oixi4voayxten7pvxhhxwmw3oq9nf27wym16usoz0y9pa1rbxzuz3aypx',
                direction: 'SENDER',
                transportProtocol: 'ymxkbk2iixufkr9mzn7qhchfprgu1uo526kiay9ssyolnryx6ign7yhd7mu9',
                messageProtocol: '3j9ppsfufjm1o4d3th8xgxrmnl914hnfg1lzpv1slhwakix4e3uyd47whrv9',
                adapterEngineName: 'i46t3kxduch5udqetzpyfe3umvqqbrtoqz585i079ocae4yy5nuft1re20jft3193bmb4jj1racd4w8xy3usm81ue6yh6qyusw6m1dvk4z1yfbkwxbhwamwmn3197lq7rwo6vj66ss4dxvvivccp31osvbd83nge',
                url: 'szclk9sjymb29w1hbq7oq2nganium2hra9yr6ml8ownxl46ky2jv7pca2ezp16k7doix07oexkz3togwxk7rt14o3l6d16wxh90f2yrbqhbd9g7fjsjp2ut8nzfrq9rhl226tequk1ploi4aoypngnwvm4ma1i9dapt5g0spaq9j6fd5e7hbqdpwrf4j3nul5lcpiycip8hxfmjzibgfwjd5168uw9q3jhl4gkp7e8ahq9jixttn03w9m2jjf2rt5puyzwu2gsg7mmm0y2yl0n00zc69qlonn11afe2fvliusesjd01cwd09bgsid721',
                username: 'ae8k1sryvmwo2dt9zxcil21llf9jbzkq2ooguhdt21b506hk5qebf0x2s7nf',
                remoteHost: '9iuq84hcxgi9ez6u4wk6devo9f64pinavrynwc6cauj6a3c7oegfsx1jm1urjylh9p64csea3zvt1xecxgdkqw2wysv4ebch3ycc3nbd6v8tnz2sbrdvvgmf6ogvl93rp6au7fzt9lj5sxglnq6x700buf1jhxbc',
                remotePort: 1687471053,
                directory: 'f4ojtm51ua01gb57p7eyhm4h10w8o9c6c7fghleea5xrv7kx4ubg9o7lxb47cr002odzddhnguz144cfedx0lfnq3yo17gyp3wx8lni6ook5dp3dqlem9b8idrb56ibpqkgsihhvshir2t51it7qs6zclt7iz8nn8opyqdwiywdl62s4mf0bmbdm4nfsx0rdefq92rjejp1c8pfbstzl2g4n4n749ndvtqpzux5aswkqb04ewcbz8spismyb2o7z3hsrzidz9d0r2qld5mcykcp6lezd2nowplefm3c4cqjxs505akn0wq1580a3w64ae8f651lbdko1o0pnzr4dogrsbw5bbu7m8csq575cezyndc2cn4ld80mwz55ja0ni982nhlphqgy89ifxq2f49uwxgejw6decqe8m0ecr193id47pez23x8dudc4fk2oh2e21oxm7kse1sh23k7j9oa6x75x1iemotlkrnzxigkrjl2x4ayb12udx1x0v04swnehhl6w9eq1k43gqxathqh6p2lbtm1qiuob3xwm6rqqds5w19bemh60yscmg5lh575uqern477pdvda4wku7qda3bmne92wdx9v1or0cd58ex65lx30l04pb27thsh75xghke6dlmsia93u0bfwosdpqje4m7kmqgzzqkoos248voohk4sllyvw0gziia81x4d1g5d7qnltunfmrwo26mwypxh8lxmabgdbnzfadxt4yyg41y8vkdbjuj49wu4goixu1jm7h7n4ukjy651s77jlgryj6flnnsqke45r0rgickbldezpk96430ekygsxwo52n5y4uornlp3kp25mkt6j5fe5fieup52na88lghw8rv7mc1npksdj5gxmxnifnep71xur3no4qt16lolpbzlci2umxnyobqdd4m5kyauau8zeqqt3czr924sfaawtovnwkja84wk5nv5jldnyqbe4ld0gaee8ixpdlt6kqddxg8l0j6ddrswo3v3jk3d61',
                fileSchema: 'yxwvhlfld3omyt0jtp4udfc2039jwdy314kzusi77ffhpnjycrb85q4hm4e1h9dmye1ldkdnutpdkqamk63ice9wjt8n9a1ies27d5nmof8ahvx1m1ent90bmgx21srjyjzgqy30rucvhdf9rf0hcgs99zfrua0727r66wju7cgtsh1kvd6ifcqgdmqcl4pyuaru7dzxo6jakmqp9w9o6bmb1zyslhrxas9oir0xiubd3ukylztyh8e8ogdcspxaiu7w5ntcxgkz4xpit8otxsy898la8z5s9n6irt34bbafnr4ttc99ytoo52olqehig2jn7qu58ldhsvenqpkx63052ovvz31sprscqabtry1998liunyf3enjrx85xrsdxf93ytqhdzibewftj6d7prn9y6lageb7ng82xyagjl1mub499hjd7o79cdy8r62mttik38k6zw7jitzf7r4vr68fh7v2gxghp4bpvq05rvfgk1qobhcfri6lhvyvh6qw6ingdiz2q8mmey8khbij04wvpqdd2xe71xwcg5tzmpa3ez0jpqtdnodmnxiryw1tk71o1e2ysqds20ug2dr2oek9rtmzgsnypomig2pwmpig7rhv5rx0i18yfzqvithqjizv4bfgvlxtnws3t4eby6t3a8epgaoid529aiehma45ilxc3mp38bnjcwn37yjcnk5odb3lccqp3ldy0r2sr0y1q1dniwke4mcgezkf5sxtxqvxpiwqfdzej8gfjstg6nr5rfnzn5o6y62wssuekhg4fzjo2k95y0qx69zbzbzoi7dlo50lsgtvtspyyqco417lzdvdbxfe8c6saddt90dvhau3lpm71x87j1hwie83by15z97lslcmgn8gjh9u20rl48ujey6gnwtj9tfet2i112ejdhxsvqfvvce4yqzei70ldlfxvgwndxbgz7cuoqyq0sqmrn6d08it3jynfvs5bdcuzoeriih4mzx20oiwgdshdffweyd5bzodxfun',
                proxyHost: 't9ytxbycdnpt14lxm3apxaq5hj0n7xkovhekar090k24azc3ukmp0u1rhn8r',
                proxyPort: 8580358932,
                destination: 'k2tqfbyklet590eea29oxhl11uuwo5ghpp4fmc3cg3uhavm9vv3i8ytla6y4isnwc0nejo89frw3t7iccumcnw8kga7jzammmz2bdnilsd8uccymur2hvtff7rdnqz2qo9wg6qpgygqox8cd19wcf9cx57svd2ev',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cofva6oym7uwn3bstzmmlhmsv53e7048oz8aw7pqrqzt9llkv7kg1ixxo17xvqr35xfxf8y781gjd61et8sp2jck494q4fped4a15r5it1unkr9fq6u523twhc1eyg2764hx8a83hb205io2o53f5uyvmq0kvwok',
                responsibleUserAccountName: 'qakwmaicblfkbtd8z8bu',
                lastChangeUserAccount: 'giizt1c9wvaofww9yjwa',
                lastChangedAt: '2020-08-03 04:10:42',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'jc8p6ousoud687y0iyxfml96bkeyz9zs211299fn',
                tenantId: null,
                tenantCode: 'll0zwg5bci0qyxqmb8eccjvcnl8aseir88tubxs7ccqfmsd712',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'wtn2waecx9ro0qm450pg',
                party: 'thi453gc65rlufsssywmc65l0ta0qf0qong2g05it0wd2pma4n4f0dmu31h3cstuna8li4fgc74947v7yogquk7a5qvqzfnvzry525zksi2749bdu0bhmnau9doighisedrh5m0s8e21m9sti6c7we41wsy7gct1',
                component: 'g6iv0ux03wnpk1k0q0c7wv1fjfhyvtnd27fcxpqs2jdbeqw5oers0z35to85u7ab2lhhedcdnvlbxx16shbqkh8qcf9gu2xmplnbdx5lwzvmpwt3t5nptc163mbhn6rybtdlqcvmlq690fxhhtkbuwtfv2ajq7wi',
                name: 'wmqkvxiw5ctbajm2ukl1b7qarmx14i1i9k32qdw2r96gbvhvzmtf4phat56durrh2laonjh8n7lci2v030dm1jdmxfg99ctzjw8zbnl05a98e9d3bvzivkm65qkuzg8hodantk9m5ovy8211fvg55i1sly6ipr6w',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'w6i24veveapxq75w1m433zsibg07d5vg5m8qfhh7e0116hrfufgl7dlpk6sd246w5lmdz9vgqq9soem6dqnivurdxt089a6ez2mklcqwwmefjw8gphjm2sc5ye5leuefqnvvu6hr2w08bhwnqbvunhw87or4y5gb',
                flowComponent: 'tcgn9ys9eyroo005y207mx73j13q615j90t1m1nktm142d6sg92donz98bngxn07frw9q8ef64vu0430g202wqc7avf4hq608jm7dwjru3kdv8t3icsq52v2qukwwbzwnd3kcnkxql16xi37fq856mrkktghnwg1',
                flowInterfaceName: 'arwf4bmpzlnk9fbjjn9m0kmzyyzuz9ny4906ys9xc1t5fuffb75jvvb6ewp3m4ebtd55znab0xcxz9lf48pwhyvcm1pl8fdr07fgj24qjbjglfblvtujoqr7r17cgek3i9xzv82mc6m0jju9i9f12nzrrtgyob6x',
                flowInterfaceNamespace: 'a0bkdefvrdvzu3c48gh79769hnjsweqsk4obem819e97xukm87xhxekrq1p7nk9l6hnh8d6elmn926innixkzndg0hqua2io4qr2lonya3lwysvpgp6agecz58bat018a2v1avyeig6sal7ett4ug1m05c8afcu9',
                version: 'iieu8fs6r9o2g0e1mb2r',
                adapterType: 'nyosvm2ycurqed2akgcpjb2ckafsllii6kadrg8d3f2zw0gxvv5wl11609pf',
                direction: 'SENDER',
                transportProtocol: '2v07by5rwb7heau9xnvzej0zm4gepceodk3jy4yc10gmybefdd50ebvbhncy',
                messageProtocol: 'z1nn0mxfsiywgtvgl3j5g4cvp9fx4u8waz4a00r8zoucqdlyuj240btyf3ae',
                adapterEngineName: 'sfez70dcxml13cu0tohgqr2304a7abflhgjhj60cg8ob85f5ookvveugex9tna7l302hk09abr7lr7o00h25yicvbthq8n0xg2z99uzgnrxxz1djc10sh3x73n2y9fwkbwyi7vrwa61vg132iz4q6d88x58uess6',
                url: 'yllysmvyfla4unm7p0d08bgfyy8zb8iplx2miqse5d1wr0o24lc9g4l9bok7442p3ksknrglgkk0ymcq4m7nj83skn9bu9u1ok0rsui5s4vzwjxvwu480h8uem04gcpkgx8wz1o1j8ada9zn22r2jot5lc9z72qbmzh2hcmaqqy4vp1yv6mc33txgwlrdc8i5cdq3llts380h16kshu2qeothzxilymab5b3hmagw4m2jfrvj1df34rh5lgsfrfg2gpr2v816tdg4e96wv0jtj26ms073vvt72fu7sq07zqij24riqbm6flghbzzpdh3',
                username: '971rdfmujg56lhtmlceuiclesptz5r1h6s4yzyg3al9er8mhp6p16xsm3kzt',
                remoteHost: 'vbgmzt3cel0fy1nkh3f4jqus8d5nrn5lix4oxqbxbnbt0e7n9k50cspcxnptjhloru1rypewstzwb63ldyy8i9v7eem73vvtd4xrbw5gu4222cmyu5lx7h7p5d089b78wvosqbi4d72uvxzak4if69v9jikatb5h',
                remotePort: 6532673270,
                directory: 't8vxi6vumocqwnhuxxoe0vwhhgudiyogu6thrtnw4xjhkcjp65fi6wqb8qyjsdn0a8dazbi8x13bydr6lc47x7lhwiva24n43mk0wjpmqmuklc4gdgadvkiqnbpdwhxua9ru8qln4kyl9i86mgb1uqn9vtw82htnogr4ctif4ss9iz9l52o3npwc4cl9sn3cj1fum34m4gqakxy0e3zx1kv4nbnam6axmomdt4r5b7w8du2ighwohtcw9ud2f40k5t7o6w7kz3x8doqkmri9f6s5mfkzotkao0uz4ym17ihlmokiymfma9ntz78czoukyx6xwuk9c5crwuuc059gcik5mr7fu80yfv462ypmup0s21iv1zrlrusp05q6p64p66it0mz1vrczt2gn1d6y1d333eeil4y7yip2d3dli39r6ioctzatwm58v43plfysvrgqi2lsa5bvnbm2byxzdg8vu862yt7z1bxskdfy0cl8sfkvq5qvmjbblrh4xh1qizxtdyud7fj42lvkap3psqo2dkyy6ysx3ml7x1gsyyibg0srgbjvkv023t0mx06uvd3krvseyoz1z7tdyvhtfq22i17rfz19f3e8paoka76gomwouz2z7k8ym2y70q80cj3yytfdmsw9togbtyo9ezzfqvku0leu5dedo6jgo4w9h64xyh4ry8sbo7zruk0q90ola1erv504a5k5hv6ftnb2da7z7jnr1rh94e21zpxh67eijpoz6fkqqvflvvo8hiry1q0u7elgnvc20xzwu7e372xpbzwehvv97inr1snri2pk7rrofvmoeqtrz2u932celrz3jdb8aacqojr7b01emc5rfggpta9s17bmecfq3pmpson5o9ytcr4bugz6z6fdm9n9hxlfvhhz8lhjqtt4m89wt5ppcvy39wur8ucnf5zqldpogoic738u7du3hl4kteubtsrzsalhaq2ic51q25033yo2vbxo6pfzzybhfmrccyqspbboqfid3res',
                fileSchema: '7645rknj2y4sz9r2wkvsgy7jgfa7z0v7iaq7kgi4lzcsrdczy40s0e66afgl8onqcr25lueo452bkfvjgfl5vdapi5hr8u4mtr4nhtqvn25ljebrtlkeb6hkcueqv16mtis9pd6u8vpwvm0jn9jkgxgttr15vijc2cemerelvfloyll5uqopvn72cbpl26v2n10vnb4bultym48pt8zy3kxdctf1nxvvno8rwlj3fqupr8ovdin30sw5dodxicrlb189m2qcoz6z25egfmpnr58yqaseg4dsggiec330fndmjco7d6hby40f5vbafls2g4idzmgsekyy77fze58qo43k4xd70piv9dxf4gpwqdff5nyrtbbaiqkpxagxfb6s6psjy7pi8e5sxu07vbcoul91btc7k5jlloiqwup3yxe9xiipdumos4eb8dc0hjvo5gk72ydhr7ysrd9umjacfkw2sgmh7ho80bimpts2sl378r68uiksj1o5h27j1duajhthqyznff87prlq1cqnr249rz4mqnr6x27zzj8f1929ecn6z3ytd4n5o2stk8nsr3ydn6jv9yiy8vyecb3n3hjnp86qwq1rqfhk8ll46p8hymthspqagz2f45z3y7p2ecn7tkx6stfsf3gaud286c2xvs4xjw7w5637ctrc1joadx505vi7veqkcor7gkkqnkgh0h2pxgkiw8airgqa0888k6duggyqk7ny528grg5onkezip7bm9ra1x4vslk1s3gxdu8ou9effoieh31ar8isujmz1jsb53cc6nysuzmdlicw9i3j980r8hb67jbnnesrh28sjewjku9srljb2m671y7fsqkc9ddasmges9r7uc9l1uijqliai8p4tsfg0x1dg49wxbv3n79m0pytr1hwi6xarmz2abjta9moshfl4q2j80itrpd5r2rtgfvejf3k2b8w63fu4tp8fvrd79ogabne35c2gallu7lq1o7w33ttrnu3xue42iu0t7i3',
                proxyHost: '5iwtbrkfly6yrbef5fsqiylyyruid6eszgfu7n957ik6356pykqaa33s0xqd',
                proxyPort: 6263492632,
                destination: '70bezdj7ttih6to2m3xu37olaukep5wiq90svekox15dnpy1gmx77vlx3xl3g3p71f46kdg97x5gt5r9oip7wdyar9ro0wn1o0hf8elpqgpk8yob854i778yw9r8l11lm56os0w44c2yurfj2ged4pgnvtd944jy',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'uw0q94btjv0uzkd9bub8jvavad4o1fmd04ryjnv76b5y82ca21hcnh4fot7ga4kkvb20pafp4dd7pht8ktg7mxtksyplfk133m3h9okx3rpg5qs2gsbbg5s03d7kcb02sfhd5di1l40prenvf1vcff342ip30132',
                responsibleUserAccountName: '2cfrrxswqz7bihq6xwpj',
                lastChangeUserAccount: 'zaag0tdir5bi77zluqra',
                lastChangedAt: '2020-08-03 01:35:43',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'qm412se2lzxp3uf0ffl7css5f9yenpsgagubree2',
                
                tenantCode: 's2969uu011ozp48acuaafs3jdnkpps5oogf0nko5qvj6ascgfw',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'mwa5wivh8i9st3ikcs4c',
                party: 'vkddwpf24wz0t9j4fdax7ngghd6bb5hh05i0zw4umsiqzvve4mak8k6eidt8wqooccfq8zk1b8ap1g72pdejthsrgvpg6w1snkcdfii2xb03fimnoeugemc8gu06enzmsczpbom63pd6g3j48f08msmgpv5gqbux',
                component: 'jr0us79m2tstpo9ntrvpfbqvdl352apouqfs2p1ng85alkescb6rb1dqv976n8ds1oavljrgqnzp6eyrrualujdiy00sqw6qhj2qsjyrxq48kp2uke97x9mi4nid9kcrl1g2gt3hpzh6xkzeg0920mp8r1d78ezm',
                name: 'r6jwnj7aj88xpjx1oo8cpy18bubtw8dslk3nip06p4hfkm8ac8vw3niv8xpkdcmhzzaf35nq494rwlzc9sqt621jzyeve84tsiftl4ihkfkatfno45s81z5xsqw6ytkk16wz58huzarra7dhc8bgj8gy61llbx8c',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '58cb3zyflan527ob2ra1tz9a2p0ot1ox6g26gn12jinjsmrc4gdv6djgc6rwd61ylstqvwro8m73wedp7rayld10pt8oul11y3t87wqjrv4tam6md4i1i082v8ackydnhog1bjg05eo3gvssyigas90q6gsgn2qa',
                flowComponent: '4xfu13upxzk2dufxv0ybcj6c8f0leww3f9n5ixze65u5rsmqccs93zln6qobdpaqhamm81ze428433jp0pxjz2xe8j4k3ccqsjhoii725f4hnbx7cs8a6si7feryv9n0qtjkd92cjbm3fhryfbtvi46d6u3t15ub',
                flowInterfaceName: 'euaisp54a3hocahk7meiv55h0x5vmgtskkrfdmm20ztyfrs615bsapuvpdqy2479wheqeucu6pbntcnzjjfwj2du9i7k4n0uxvc7m4jm7m6e56kdpbm57uyi5x4hom137ufkt7z7e8j7654nhiz1otk35v4nj1lk',
                flowInterfaceNamespace: 'qyygu8uh7q0l6zev2cdzmnui2nru4ew22s2aysbe7dciyvhyshgc80od86le4xzhpbg3lkfw6sv7l9z83f1z3it7sntl2141i68uaan3gnq3yv1icxrbp2ll7710lhrsgu8h16k3q02jko5ux9rxv39lq7ftr6um',
                version: 'r4rfs5qrqdwc2amph1z6',
                adapterType: 'tpmikeiorb1eveymzpnghw6uyvu5f06alj6lda4mzrhdcajx2se1a8un02vc',
                direction: 'RECEIVER',
                transportProtocol: 's9lvurs9s8n8z3f3vdlk29szbexod290ptigktxu8of86gwuq8kze1k2lr4n',
                messageProtocol: 'o7um51pxtuk2skikj7s223fadba8xq2rl5g1bm3ghvuiipoh5xsgv8fd4idg',
                adapterEngineName: '89ygxr5rikloi4f6vxs6yvwvoxna0ij4k6j00wjyq024uznzttnhcvb0ne9wsvhwb63wyze5q4i9reznu6hd4fljkmkc7u9aoikkywh4obd9xgg72lonk6r397g1mgsmyojos87fj0q1ctigxr19bbmtgleij9kr',
                url: 'orktxewq38369md92ix0q905nn1ui0ifls8lye0zyanzl9urj7zd1l6lhrmorhh6ohtoh0amwhipgl1kupzs03a0b66ezpkqcqbn7v5yokfe8qevi0qjs143jxavek5udodmzvhsr72q1za96rfcwnxqtgkv1clly3qid9gst1jofbm5t4at6kprve84okb6i7s4j3mihepp509mxckvjj5xtdlhl0k13ce7fkc6r1webmnp6abzozq9d0y5swokwb4ggt31toyvg7zlij96qkswyg2owsszahqdqtktmuu3vtb3c7p3sfd73r11fzby',
                username: 'o6xj4nrxo0318q469kg9x6euhamo52gafl32naev0sn25z8kh7g1pniqq2v8',
                remoteHost: '93dch6r7049kqhv5rnvtuqn0i58bw3hhoty4ca60dir6xo8viqju4iasm4lap68ipnwq40hcdq26egsv8t313otxoj10qq4sd3w0gnsttqx86dtkja6lczpt4wo3apwglv0o4ht1g5po6quthvpy4extg19l4r66',
                remotePort: 4226271276,
                directory: 'c2wo0eb6k7fw0hpo8rengeh5ove5xbi5nd9hy5om2lbqys8lnvddnwxj3uj3lf1s8c37a0lzma785cjreaz4fqkxlkqlb8v6ipukk0obxj6dv992i8h9yimfvud2e9fddjixamfkv7tsw5h78kj282fscy86j43t0mjl8yko2yxefpdjj5zejx0y68epki228x15796mpmzpa54364jklvq0prs2f1dqy6507esje2e3dgf3hqshdcrti4qxjnqstq9khst24egf0ikr7g1aw4dncfnn7ltkdlnknwol02tc63poot5mo4qre32boix4zzfqgprv6v6u0bv4v2mrs57pasiratrl3vzyzuqdo4sg5471p2fy18n6z8knyv74t38amv1o01d18p4pgzstfi2doogl0c2ys9hu33hljlbmrwvqvu4e3efzwlxc16m3394wpgmvidkcmh9km9j9kz6mik3vbrwhkonzr6c2l873y25rxnu5tnzcetjaea7czdgm29x503n2r3daoxigah7p7wd9w4f2jlnocrjic5ohfhvg5y6r7pre7qjbru1nryuf1eqtmecoddud6856je0md5lgttn9h0uyvsyp0edumt708gjv5cy5rkdzxg8w0y34bpmp5nkrsinqihdw2xvxfknm282kios3v062c97rnwaugxidlv2sykek7h3x6q4s6b387eddlazcou2w2ao4uiutwa0no1pni9padb7lzpaob9aawl4514du9t2cu87edn934hbmmr2lu7qj1dki759bkvh0i7ftz7j18ys80ati7eeohz1rchdu31uqxe20cxv6a5h9dwf75oltd68fcut7ns2h37nkxszhuxgqlc2xite2nyalsfudnotaq6fdh6cw5ytbsi719pcc8crcf752xvf4u9kwogu7dukgxe2lq62qngiljcwqmwbwsvqieejumk3bjfzt9xmv07s40cn7jq6sf8x35q1tnuhjpuvt50nrv3w1r8r214n3',
                fileSchema: 'jlnrn27ub701ppx3yv3mh70w0u5kdc26k9vn20xsf5jbt8hcs2cwgyl99c9ff3dpiguiqm71zp2bdr96pubb5eykejsbb9e1rbsq61x1k5fk9u3qg0aq80chmr9ulupko5m07swtuygftd0wdqzqkjj6fhgeawye49m23vue13bzispf3amxsxittolahkjip9diaopuj5i9gcfsltcgxfi5moa66k8es5hpde1m7g0dli2wpqmzoyhlq4gbovejy49nybu8huqfrsi8sfi4nld3sjupie9sfcydzhzi5zeisw9p59fhlbkhq80rwp82fmcd2nifqf9oz81o0hexgg5g3fgov98u2kurnyvx9e2kva0eryzgqaidq8ghejbuajw3r1l62vvpd3i5jq24yu0zex3cafa6jd0smgh8zptam9m4n8xixf3dj56l7ky1dkq8zo2shkqdvkmhmjwhozlxwf0aofv6xhdpepogrkp2xh4oxx9h8xpqhxnream976t0xjpzpwtbczik77bvo8b4rckbi8p66s0jhiveazypfbwevbmgxpp0f4dwcyfofucc3ji6n5mhd7nrct3kkc8hiqme5t0scew37svucnylaw9em9jsrkwm4upuqf5opawt8t8f91cafm7o7gedaiwe2jhuqgcm8kbhz5t3idcoey0fdccztdb5dtu2ucgg37h1kbxgqq44x2mrg1l58qcb4qdifsb9eejymdkxzhnbkhsa3sqc788vye3s583t2pica9tkbndlnrqrtayk1y24o1ckjx132epx99nfh3x6p5zr8r8k6t0t3p8dbrd9x5u240t5v2j2wonltlrn3vzfotou6m83jeqteawhgep4k7h8drt0rt5gx01mlcp2eengeapqgbhgrs3acix9nzbxsyq7hr9vny6q2e1cm51uxyqbd6zbrgciwp9f4dacqk8bc5x3es5w04tb1onbrrh6k8xcray2mxzhtutniyv136jk1bqx7oydi59cgx6o',
                proxyHost: '8rmmzedah80fmvmzm0tqqinssz6sqwt6puem11mb4lm98833uu6ce071hd3o',
                proxyPort: 7587625210,
                destination: 'e6al4pcoa3ck1uvcd7b7fq247ni5ibmdd3axmy4xg1fyl9r03kzeq2cfyidwa8w1hq3pjeec877jei5qij5yocucal9yn3qjcb029bs88jjie8l9s4siryjci85xyjjbtixyobxb9g42yuk77jqa71gdfbvhwo5l',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'gpu5fles61wzg6tx5aamcvi894fq4ckibwy7oidyu1iemdbdlgznwy7axpyq2s8eop4phjn48krotvkxinrdy6aj6k9dx8w8hfyzwcg1jmahh03edszgep3o1se917frik75i8vy6mdd7m92er50sq3yriticfg5',
                responsibleUserAccountName: 'joklkgezlgsq7fl4v6j4',
                lastChangeUserAccount: '4ekqgfv53w51m9ucif7i',
                lastChangedAt: '2020-08-02 21:47:48',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'sy0qaiooeeru78wvv0hrp94x5auttpfqrf17wuzg',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: null,
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'sjnr2ma403tx81f72n7q',
                party: 'osv9jvf6e3e75042by0ya5k71ou0o0jz2jj6ecqxuikr5b897uupca8wyapvbpbrz2tqa0m4t39p6a3dbfgs52w4p3d0cjb5f45lleddb5i62j9hq48nyuu7kwupfuu19a8ltbfn9ggicdlm444nrygxhker97v2',
                component: 'mppcvwhtcjd4x6u0rhkqqe7gt7t0b9dsemib3s1hx46rtgl5gf8xibwbpm3djpkae22fswlk7mmcq1t2fmtp1ywgd06gxk9ehfi4p2sn79jo3isag5iybglysvojjnau4gsrj10wkiogkauh705g1j2pvxzy72zu',
                name: '4ubeubhfum2em9onmjr24vuyg538q5t1hnqmpz6xwcxnlq7vf5cnhlw41h3vnidmg386vavm44ksc8wuayei97i5tu1d8c254gz9kqglboooyzf59l0vnjmrlqr81v9m7r7ugj692zsxn2rgpf9ikve0kbxqkc4o',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '6yo5fw222k1a1owctr7r5phrcb4jr95o4v6hcr0adyepw0qluv1cnrcx3kpse6bmw1jzl0g7syue3sk589yce5daaq6gl65gext94abnhjjauwilhrxszczyrigiqtcq1vwpdnp8lf33uq12botg8hxojmtn5p2o',
                flowComponent: '8oigr3px3lr39r0b1yexllpj03pwhl8t3rjv1rua8cxi23grgtrs3qp42b9b1lbprmvw6ubsjq85dtp1sympmsxc1nswfc41vdyu2didr5jxa8j834xbk8u2g5bbz3w3m3wzdotp5mulx2qgv02pq5akhul99fw0',
                flowInterfaceName: '6vjecnxpqs31rcz5aofnn9vpgn8vq8h71xp9ztso4cyimu9mf5c33scanfezwd5nap113p28i08ohol038x1rv7xniuoucx4mafaecbwgg3nwrgse0yisx8fdmjkghst2d7276p9gfbjigfc0mm20q1sp506kzs6',
                flowInterfaceNamespace: 'qdimaqcoh6okv2bust9qprmioj5ydp3jh41ezvv6uvzohsb312d4yi8eiuzud63gkkoqqif447thocs46dz74nwavvudknteog9f7tuekkk8hmtpq6v61xuokicgfbwd9v0anfnp60ts1l6vn0ul1jbe2xduxlow',
                version: '34hsbfov5wmtnr6n5ptj',
                adapterType: 'ecss5mhrjsbn18kuiwv8bkofomkphmafag2lneaoldhvu1qztx2wi4j9qqxb',
                direction: 'SENDER',
                transportProtocol: 'dhwsg70d9369c6krj00hca9zvvk3ehvwefmk6b6o1rsbauo7os4dyu3hr98j',
                messageProtocol: 'flexbyxib1d5b9he1ld8c123e17jv9qr7n8ky5pjwgf3yd6mn7trzldba48v',
                adapterEngineName: 'p2y6omioslgmiq2q8f27k2igf2fzrwilona6qe9yiameyb1xelluoc383caidchwfwojrr1uxke3qnov6y4w768i16w25goyp5j6rrx5ogkfyslrym06mbx0v8qgttz51aem8w3wjox3x4seu6q2wn9xtq8l163a',
                url: 'fp44gryigtba2fnxl8udsu4jbd8u7ku15ikxl1etf300c97fcb2ifcbkb6ruhnmosmi8pbw5umc343ew9y9ymib45e3nszdx6lhz279r3wnsc29zjb0jbrhegzaqaatdq2s1i9im5p2ev2dacoji1eiowr1us0p86ti82w2j2q3gez05qcatemm09imm6tthy7lkxgj873awbybg66in3rerrduq9nv9m5khfk5nrj45cbr3nq8rqpxmdq1pv2wgjhq9413em3inyegrjv2ro9zo1einkmn1ygnjzzjvmtzfct63l0fn818ek5n9m8tj',
                username: '5b5dee26lzc7kymiw3bhi6umigtn0gro7wsj82npehhplc0uhtb9zrr59soh',
                remoteHost: '5xzyg9gtq7rbgmvop364k4cd00mw4t24w6muz7dttgjm1a79nmvlaelgr71hfoum052u6zbvzx2fh4wago0zk9en9vx6bvkjkxc2j9f5exdacyj3oxs84ilasrbj1e9eod33xffinv5dnkp069hvopd0fqyq5ww9',
                remotePort: 3341934363,
                directory: 'uwad5jc30toen48hnc7otc92l7zj9mpuxc94uvrlajs9k1zp26gkdzfe8ffghsyhox5ho205nufix8lq64fbjyvtgllhvka89797ql89aasvpu9myiulefa7zohq8v3fn2pf8tfa3decu47q2gzd4f18ejzy4tshmu1xpdm5ynvtpn5fucv2mpp26t0crk80aqzqud129je948xq1xgiyted25iy9y01pgdpyegz88q8f67l6066vrb6a0acsg0pzz1fnqs5kg4xywmi88x8ctskk6lsb464q3pot5fiup29iizb5xfpl8nqqng14cqci2z5rw2826go1d67zbwxgkouqufgqnyhpczo7memcqefjrub46ju44zorgvi3jp9dmjd9hujjsaey7aeq13k2r3zxksm0y29e1fljr1o4ek46zifx4s9yguklef9925bmy7xf8ma0bd48m1uld63x2235o99z0q8ly6u6l4wescunw8ufzcnu3vy8ynqmv0djr3rnxp61s5m96mi601631lsefxr82taz6p65ri2xwevlk1xefg29izitrcnunjqer55k5fdwo9q604wnbx89a4r628901ihr5tc1p861asxa85rs80yrvk5zj29qgkwav031l3n441efyq90t1rwaabi729z2j3wg5wzwt8vk6nfbr4hvznkkwfunkh2i36n6qfua0s3xktpdjpg4fv8y1o7ehlff4nqn166d63nsvlva6s5z8kc2001pqthp3a8k2rtq0pcg2yth7n111m7o40fqapdn597zrsp5mkqcbfwn64t1b1z5fghysaaoc5bqyzagr0f4tj8m9nlqq2q7k560gfn5q859jpx7ie2hqjrjk9ajq8ej9d6mg0ae6tkh1ysy0xmk4eo0s01uy77b5c7klsvxbnrf65qsd1528vsnv5px73osvp0gxa7oueqlaobik9qqvy3csm3nr55mvnpgiz152zohhxe7yke0jw1trg6mjeslt0zw2b14l9',
                fileSchema: 'ucasbz6m88juoxyymxvgc1wlmml0at72n5eomd1xxeri60c69ct28x9s79ta3a2ktgj64drx49bbkruvqm462zwu9j3l9ynbumb6tyzivchn9ca4mqn9c7tym5jkab4vff4fcn0kucogbqko8ekdxannneo2dszkk7a8wkk45ejzt93vdl7nxr2a11xqebvkayu5gkbea2yq5v0h753m9f7bx6qcvi74twfr0p2ladtap33c4tjvpj05ivv13x8y6odk4dmgbslz3ueuq20gb4kkkjua8w70lt928jboalogwgttp43otdjfa8nwrgbgmoz2m5fx30njm0wzksccy66cd52nih6ht6107r2uu2eoqh4jcpe4zixoqsww2s07u4uq6rzdu6072pt4fktf8czxokqd6o6bstqehpt38o92xhu9gptl8v418yux438z3b4q7ij4q6186db9a7v4dy7ck06uhdq0w1miouufismmqnxw1k7x57omc5jcumkhoesywwp8dmfvn7d901s2avk8d73pjp8wcdv13yqb72fgr9q3t4kdg9afnjgdthujdq4hvzoncnwcmf6zgkiyhb7ieiivfhgivp3lv38gthlbjoeehfn8ny5wxui592ibzd8whxd5gfek7w2qjavu0sidogeaszqmislu4eqybfqpz55gz3ekn8xpvaxxvlm8tqjrqemm6p956t9ih7domog9ykfl8mnpoyiv2e2gsi93jdjaj5t5q55dtbdwe6euqjq8s3x9vk425kqdfhevcuahma9a31f2bwbydhj1z7cto4103reqzfwvl67cbciunp471a7ng6y9ggdjw8zygpt9bsbw91tdcywy08b0uabtppgnk0515vt4hcmznrw1zv1wpep094ue9fondpmsj0e1wib2kr1fjkvj0puk4znx8zg4hyrioy83w1vmznnxhr7at4lw1jamocpz7r74wh3qomk2uafe6oflpnopc87nxzznx6gu9bjzrk2lkkmp',
                proxyHost: 'z22bt3liptcfax4vfion09r35giw81lbetxu52730jiojxj3cwo4dhvjbx4s',
                proxyPort: 9246760165,
                destination: 'f35u0al92dkelftuyapv7i1c8qacc39t48frjwkwdfn8f5rxo5edrucuj9qzj781lpgidrfkry9ijoee6z2cgz03gbrjg0v5mhjfxny08p9vicdezi5wvjpfxig6nvece2lf8jtmpyyur9q54h3o1jviutj0praq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mqc7plqjo7g3cgqaovekg4ev9jnhu0teiofddl41w3aibewmdo9xiodegwlo87zt9d3n05mv4177r38g57ixhlxm9735z2c26q5ulzl63t76vq7gqtntuinib2m526e6szdvyrgyw7chyglfvcaebfou9rojbslp',
                responsibleUserAccountName: '1qyvzgey7rypbh0tvhc0',
                lastChangeUserAccount: 's6obzybgi0iyhjlhau20',
                lastChangedAt: '2020-08-03 07:45:37',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '5vitjfsu567cz88c3h3okqr4cy2bszhrljxjp4fe',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '9yqf2wrwkp07wq27k9d3',
                party: 'xayl5rdfrj7sb3ezpvsy3d06bbvs6n9us3n2bxcuzv88zrxcmadd1ummgfxlsrlol1ggi4hevf393gldzatejts9rni8iq8ue9ck3gpe8qi500tza90lx1arhlxgfv85n2g7okc7441hfznvsghuzrk0fzvygm6r',
                component: 'kp4nztolmk7v8u3yqxogr6mc4k7mtnzg12q836gzoenaort40a1da6eo8hths0n6ytmfo85mwrtoc75txx7yids9dqf0mymsp4xfsfjqys5bgvqehbommueuxugb57e50brsf1783otyrtwx8x7aogfd2l0in82r',
                name: 'ouzny3c9n21f0x8d0y7cxb0hapc57a1mr4s54ecwhel9q0uszza3716ps8f5ov78xpvfjik1ologgu1wnq3909n6sdiqo0cqou5c3zaqsx3a3676xj1ii7cu8b84dj8b8t2jzang3orh8sufioq3u2e8eie8p2jh',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'dorkx4wk4pso8adxkq8sdsbeiak4wgm57tuyxpsetg9wj4c3ngfhv12kw8wrfdpe26knojv55itcg950h2qaab9hzq3v7zub933stxpcdudol99znjgdkoem511wkgb83dt9km3pbvt4c8upr796ous60pnxa70q',
                flowComponent: 'v3mwvu7rc61l63n6mnlolo3338evtlers3b8prces8xyvm1exvhzg5h0z4beyubokjcc3enlwbrjtu1yihneszos2uay5yd6i51fkkl6pk4fefdlab0328t21x4r5mzmuwsqlo6ik4xdbv2eout2d2yhobox1tbm',
                flowInterfaceName: '8wj3yg8s95h17kofgsjb3qqrsyngxjjp58zmtrnzx8lkh2plcg7l3imhlbtk6brbwa61evuf8glsdzxgs7v8apc352zg6kboy796u6eb4c95n602cc76d7u7c997wt3zncgpdhhhy0w5j5sat6th2hn19kdcz971',
                flowInterfaceNamespace: 'u6ch65nfy72kcv7ioh1r6xqautxjugl8bw5bc7ir9wckjleh5yqapel4kuxhhgsxsd3d2lhjwhbg5uesfl0tuaq6zs0bolx16zvu9iv1mm3uswcquc1bdonuuwo6w9koaeej81gxc4878q6zyac5olumichtpuul',
                version: '0ezoo48ccta0wkezrv1k',
                adapterType: 'mx6cezxtky0jp4w0xkmib6x37uedxxbsytarcn5qjw5rc347fpfuisaqfwq7',
                direction: 'SENDER',
                transportProtocol: 'qer3cfbemkotmk56lizwc99vq4l6cp65mgfdxz82giua2tv1gi0n2x1z4mwr',
                messageProtocol: 's90echizuo6xdk0ch4sqso96tkqywpb8y6hsp4gbwm6zstb1z7i0302k0rfg',
                adapterEngineName: 'ofxp7j3r660y3imsrw82ayu8ja789hp6fjubi3mutef6s5l21dbn234uhk9xe3pabdavvs0qhzpikti5pauqq5ujsoswdoycxim06kd7u7406ckzciywkn2itzr5dtb0oz69qwemwnx7u17len4bw13o5ky9uazm',
                url: 'gd98u8kt4x8dwd635xltltj2nqdqix8y0xr9aptkggoi6y7gsml5tqe2hzbyx85matrpelrnl3s55u3fqj8qqkv0wavsve611oc8zwv3wztuwmpjyik2dd7sqqg6xtp26y1rxxw22la4n93zscepk47xmt21oxd1nrks4pxrf774afnnqwte54w0pprrstao2bg9n24uqzpkquxj02ki1s6ubtxyqjf0bttdymcfa70960ngc4szhevppw00ucn6poh64ijcvxve2svniibu25w1myj98x2xhezpmu2a1sbzqbe45efyhlzbz9twfc2q',
                username: 'wz759zqbgid10xuh5ui641d6avzpyb96sbxr0cm7z1fkgiu19k4dustcuvyc',
                remoteHost: 'ibs2arhyovphkkya7b3sa5qzj6lqgn6bk98zlt0vxtn4i5lo2jghqt0yvxeitsox26m5og8rfr7c9rmf5iukh9snywguqf8ejhbu8mijdeti5o8xnnibldvftj09sefpuitxvqcxc81w2wsd0w3k2cdpo5spb144',
                remotePort: 1663926224,
                directory: 'o6mf1qnv8g0qejb09ptlz8p8eynco4qbg4l10ekzgdoc6bxitbv1k4vklamhpf1su685x5bc47hb1wz8wcgjcnsltpf2ul6i0lxub859hokfirxhiefhl6i16qsiu0cdjdj0juzl00xozfdlqmhvrsrec14vi4ce1tv6ey962cqxhcbg79m19f7k9e0sc6hwtjdo3npoap1r90rook0ph0fd5tv5u9e7s6iy0fs1cj242mj1jg4wshfq4t663ndquqiojtsawcnus05oyl78cocj5fib6h668x54or0zazkqc583zeex9mujynvygkfbyazk2t6zru5v7aw5z3y5zshhti31fhbhhgaar0urr36vs4l6qwtxgr2bs97kyguwsm8d3uyfd86kwaw2f8r12fvmx1911t2bifusgbv9d1pfc1t0xz70bm2uejbh13elzlidc4uh52qyc1e9vmfkv278czwo2i3w7ybopg8p5lyy7k74iapk8clb4p534jna11j1j3q114ko3jkg9gp195s2o8n3v6ed4f5e7e0t7ol7bg5ojk9vcvzgqoz1iged0shu99xxnpmrzayoth6oqfqok72ggvh2eu43uztidanuzfh5q0isttgm3nlbnv3twpby7cmbyasa6kib5vcvu5gs4mf7ri3s1oxsj2tkk218n2tcp58zy78dbrcmskloa6ey5k5jdytu7rgr6rsnn7yny2nsb4diepouvqzeowe76bfly6dwp6nizpexe5cw2mnxi34m5ic5vrj5830ri3vcdw6r85mq7fcjlde9b1o1osl6lwlw88mbek50m7r6j4ypfsiv67r1vtxz1x7arewyzcwrjxsxe2jph10p6rdxfxj0kpyouv0osp17edv4cd9c7zh6a12bi633pv4kqxpv8wb36rmnzwpfwwp4f71darjwv47btch5nc2aby6ynna8oabppbr6xdz7z2yh4t12puy23iydwq765fuy9e9gywtma46gqlwon44y2kau',
                fileSchema: 'j4wbtlm2x4tudia3q4f6xg08iibzo66z7ug0bfcpv6f7itx6bh41j1h11nbwpai28v8iwtecikaw331lk9bjk0fkstlr8g3ljgaje3do5vrs47tm0wh7y8vaqj1lvj6bdact83bcioj9rfgu7iir5o2byp3usp692890dqo2pedjted585kuonqrplbf8qiq2egjrhc0wt8qakccnwu7w7m9h5v5edazbu86lhcm5wn3t5j5cvrrxdootaezam3t0w52he91jk0yig23fsomnmu9buh1kb909y6t77clgymved3o6prbkj03yzor1fsdbklgfu8en44wdqtzow3kv879bhgqxtieg0x6rengscqrs3fju8xiuz21fmktta22hoz580lwblffd7lduaknt597qu5npxw93labtet2zpg09hon9z3tw9c814nxkvfizpnp03vmkzd9wes1ye2ssqv9ghgsgsvg11fpto8r0m50l9fgor4tg6fkxl1u9nx6ndwetjt5mqpdj9rw15wxkdobwd05r9s2y6c5zkfdaibk4ujk23rkeykmp8whmb2e8rxjkhe9ye7ha0s2suhig19dev3lfed4tjz53p8mwe4c825zrira8609fs8s5xiehn43wy0g6nwkc9612bqrxriabqicfnu1zivp2hw70envb3d9tyc9kpluv6s8pnxzvhu26orvam3ecv51bwukyt8771o31ugh4fy5l3qn0f2d6sxdv3mo7vbp3armfsixjhcjbqhiq6p49wkdhclpgwodhsmjzpvvygix1atovqgc2pc2wnuw8zbj13u89izyyk0qflfvpni2jpvagk0rb1iiqm7nt98n49zd75ds17r4etmvssm7yv03ae915dnjbscclsusltcbw2pv7jcquhwq13dz2g8a87hu3pqt5h2h4ybc3aludyvhmq7hmtmnao9j38o4p7esm6s4web31urhzchvbwiobk58mj7ivqc4hcordzu0i9knq5kkkf1y',
                proxyHost: '5oeh3km2b0npeeayyppwrk7eas93jn10rlc7v5817u23mwtgm0obexeosbn2',
                proxyPort: 6654364753,
                destination: '3ly3zpz743knoxv3412m9twq4yg5hz4bzrjf44tqu88158kjrq7fjbmjv2idvu7h0112bhecv4xk9srkym7wdip9rbtn1hdiimj4evbkljbaujhup9sctab2ignjywkvv2meknu9vxl9zrvx1byk7si179xpuytf',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '49fwfodhn8tu4lmfd40pwjr0fg59gl56w8bjv4hyrrmpn0yqt6vcmhe60sqlaiwxwjk5sr2vdk6c3ksh9g7rikfannw3t6u3p1yiicxl7aphj3hqur5z9782urdedaim3xs932hf8etv9ylhc3obsstejl2dex3e',
                responsibleUserAccountName: 'e4tc18jepbdztmmmar42',
                lastChangeUserAccount: '3zmdz4c9l5ut5u2debe5',
                lastChangedAt: '2020-08-03 13:10:58',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '5dcqqzx71p2l5orjyhk32adhwm1p6u0nc1tkphy9',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'xu4wh3842nt04qtytsz1gq4mz17bdbrjo1eo19145p8pjcx2wf',
                systemId: null,
                systemName: '83rrk01tm83mgm5j2ew4',
                party: 'fo0khcjkl010o20crf4hi3vyd9wphm56f2twfd8quom7404i0peij4ftgwt9v8uzonafn3qhfin7lhesvim5t68xwyvb64uen18cymok8k0cj3b3jiglsgp05jwslicziyc42m1y1qb0tewl0v49yutcdv14n8ht',
                component: '5327rs6cfgrj88qvdafpnjtn9ah48jg5eu1i6yqqykk4540lx01j9b68earzz4h7icr2x1xzmub34imbbpvzz50cq1rc8nsw5v49d1socqu3a7his0s5166ydhh2rdf5b1t0ur12almfihc0aknicunbwuk4ny6t',
                name: 'qs47o7tnozbwf585stwo8idvidjacz76vn54bd7gc37tlmwxgyuckqe1kwksox4cc5o6rwpafoa0egy0d86ssv9lgr2s3ssgq5kgmuq4z7tv3r8ffzhd2q5g4i4olz5yphbx3foaee90hmo0lex6yzpn9jhn5k2p',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '3otgqxrh4nzdhh1i5p5pqd649r0qld5ow3naph08jpcd6azbk1mffnjnqk0sggbm8zhqy5wgk5cyol1j6xhs8hkstgphq4zou88qwg5k507aluxy9aenk1g79psb55bk0cwgljgpmxk8hhlo4v6wk4f7p47df00s',
                flowComponent: 'i29z42ohlc6nnp3gu8cdvpd63rp920i4kdgy2thpvj03wpxly1oe0n3sko71qs8kboi4xl5wxtrfvq9s6sr0murbz6jouhm8e409y3lw5ae82lm093um16jw3lk1iryyxbdzieb1stwgllxg9da9x3yy5km75h7u',
                flowInterfaceName: 'zez59ez4f1mm6oxd5k13aor4zyddpjgacejwzg1o4cmhgny54nyhcx3t74lrauhjk22el11k755933lyw08md4l53s33elomiaul3q8e92s21hk7ykt7rqr1qcyd4d17kjopocbdycv547a02svtrlrpakzq7xxl',
                flowInterfaceNamespace: '8aepvm8q8e4l7wdimagltgbl0vku8r56xx40u4k2y84r3pk4jvjdjlda47owp5z9xsy7fs465xxqga1iyh6ox0z3n23svg0gr6no98fyz6ns8eo3rpwbyu96plkjfxgr2ls1a4x8hiz03ajha0if3sb24z7y8k2w',
                version: '44jk68kjozhtwmeef0px',
                adapterType: 'rzvmmeqlbrfzoj742nefy0bqqifnzrr52823tvi9lxf1zyplqtsf6yefzvba',
                direction: 'RECEIVER',
                transportProtocol: 'cgrjjg0nn4d9p2tv956ztwmcpkfdvw87g43s0r0yma9wthakmzllyg35sno3',
                messageProtocol: 'nz4zs2vbhmgjgz2f3jicmbbajtrxmg7fbx1domj7er4ort0796hpj5c81bko',
                adapterEngineName: 'brw1xc9ucxg638ds39nnf47h3klwn1osil07u3x2b7na0ngocoeme1357xwyg95r91tuog3qdyggght6ad48xj5iurgsagcn6ib34164thaj9ik0yjydl4i2ovbxqpt0z8a4o5bjk5w3schqok3vvw0zihh98wzx',
                url: 'jz4wmwgxph9wcws2ylrzfxo1bdqhpcn6aiaoabb0nbh3vu8d7ab79am5exi754odj11azv8hvubxgd5l9xdl1qccvb8lbbfa5c6aoixde8hokjvu8am4pa6ic8lfsaikpikosqtts1wdan3gkqt8oh9tak4lkrxq6vfyjpl7fxcqsp994gyco68tcbwehak2jz6vf3g02hgfgptwqxlq2z40ntfncbw1zdbvn4cvj54oxl8imwced9437w2d4zcicu3u5wio366pw6jdwjq72ujxp6y5tij7y0vieu1kmdsgamek04hmcm9mdkkjn14g',
                username: 'y0941bfinpa4j2h2rg9x2fd3ksd39epqxc5pyxbiuc8w344i6k26wf847lk4',
                remoteHost: 'n1ozquwx388wrdtzrgc64sjcwnvpargrow44d0qg3a4ca29sojej5mzh4zq58e6jj9botkywpup28nzqcc5hjpmoe4iiqdvfdk4als9e76jtzz6p0pelkwrdsntzhicnw5zuc7tpzdm95wmkbok9necpi375y74m',
                remotePort: 1119135851,
                directory: '8do6lhj3tnb0kqjjs1gpl9mjnti2p2vmuvo8c855pq5um57keful76xsaaoh4cxt3kk8vs05gvngovqle8ezck5af6fn7e99grjge3c6m3gb39jgnddwfz4cjpg55d8m4icoea86fmylt9ixvzoq1zjomqtjkw49kxw2380snpban0rab0lt4q11k1c1ke2rcszct1nhgdrk9jyhau5azvf2f0am44d8agojpar7bj4yneg2h5r37k9m9476fhdefzv94e0dqjdcnp145gxokfigqshz6eyt7wf99oga55jklqkw8555p39au39vywxpmeqj7ecn8os3cjr0bmwor2yfkghnvkih2pxq9zfiv0i53pt7oobuqk2hckaidq4k8l5q585k53twt2xvspy4g4bltllyz43kaqonlzz01bd14yspwg4nv9hnqh9j3mipgqwa3ftl8csj5w7f2k75r7k2rebi6bffezrrjj8mu3ci8bq1r7i4k5rqa6nezgus8tsrb7pc5pe5yc9w2y9zi69sdstrdmhn5hd0s0jt73vgq7ve9ggmfciop74o4n2075njbbg5vw7ax9evrv3pxb0xsw89u582b9gqs91eg96z2h35y8wb9iz8cgi4l1mpkp3yib6v9xqrrw591we5oh160crl1fas2ca7v1bom7v7gou5pqxngjvhcutptysuo6nw770tv7e9u1vts1rwni0r4tdnf380m9iot7rk4a0ge8vbizxo4pfdix7j0kro4lrst9re19lmoqlo45napmn69bgyg1odngjgswh39iubmbzwqvuf80w988wd7vdi5xavjbbfdxi20n08baamk5svacnllxrg0j225nq05em4kmty1l5c2s7lh0f45ahbwsdqe3qfhjzvqblfnxvdwawbp3yzqtmc73udr3k0j4rizrnpr817s82z55jtjrv0a4hdlswygao2hrp88z4jsr8p6bgavcvl76snl4unift28id2ujzpoowp7fxnm1h6',
                fileSchema: '3jntdnp3wri2t5idqhctp4nneozf5rb1whcyu967ho3jqy4t147gqharfho79cw6ueype9tmmji1ftabwkyl58ltix5827fz6jlz403o54up8eyc1n525j1t3p0r5s0bxfurfmw5yipehxtw9mz1pgd4akp4q2vj02o3g8p03c9s5h3yfdwbipjkwkgj3n7w8lpy2nrncnu10pnblbwig7ajltdwekd1tkwy0h1rfnqcrqcagul8vt6sprz1s6d5p97grjyy4pggux9tlt102kevw77h150k2n6indtbka44et7a9vdsvraab4a1yzr1u34zclwl2npfwlhwkksjo67cxwn124n0nohqormq3d1rngfp7ug6xdepjsa6eb4mxhwco3864nr0mnyqfla1p2g11ucdgs6effuqjvkj37ekqwa0fv0vsphg36a6yhwet04hdp53gvy0msu0m5vw83mrfnyr5ha7o84s6ll86d3buzzunrnrfyrw93p8cb3dhote275n14cat5qo4ozjzrl23b4sc2ltaz9a1ssho8ooh7y6szknjgxlaxb01yosk6yi24etmhs6ritn7xjkooqvq5i2qgwzpcmw67mdjlz38hrsbj0h63usafwd7c4d6oq64ukaw39cr6n3bue0qx9d9zqs92i2cogzmyvv73n7zddmpdeqzlhsidugmdncasuokpzr58bz5zzicwsxza6axovo9lcmnft4b18jjg8vt2rdkw6jb6avq6xdm4rce4l9b5srco0r1srn5rgyf4b0w7b9nnyn4quwaid11d2ul0rgx4kvn26kr8abaqkgi92u4cfm6z9f7kqvsx54gg8dz8oj1oy2xmfyodkd7vd0w1mi6y7kksnrqst18dpr2c6cdc0o5wp9asghgo2s7eyo3uw5i4ydyzd9i6k4o77due5m31zt1m5zzmtby83k0z8328w8al7h8vynzog454624s94rx2xpq2y6rpnj3v4nygdr9r9mr3d7q6yusvm',
                proxyHost: 'v7xztfk2y66ja6r2deac98bq6rf6wpotpumjbzbv6vtxdrkkmyytdtbazp1m',
                proxyPort: 7641795983,
                destination: 'l91i1ahxv6y2k2rvtydgj2ze4eroztit8p8i2nq7a7f84zcgcuyve30xph28ov0muq0jcng0oklval631mcj30h4h3d10xyxsc0nt67sww6qbkcfkcfl8zridnndenm309c71nf4cm96ue4hqnyefrwa3wkn5271',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'jibcis310b1pwtko5htj0zafu5vg7ewzqonfdvek8r6knl1ygldtdy9krjrr9t5hwzk6623z74gl1c7pm8nl6r4u7636tutmoo5l6l8avoya78sltamg5p6tzsa09vpb3iwbspzenjbphmp4fze9fek88sr7ns7x',
                responsibleUserAccountName: 'ogdxqy6bl9619b21qags',
                lastChangeUserAccount: '2zmown7gb2f0v4y7vbh7',
                lastChangedAt: '2020-08-03 06:18:00',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '2rprlh4mm2l0633yea3gmnf6lx2oz797u13n9ejq',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'wkosaxqzep9oqcpwgvdszwc8qrbmc6fpdujejjlm0pxxt00753',
                
                systemName: 'ziqpedbnr21wfun8dhdz',
                party: '5jkbdvhrxl30ihhtjgd4izxkx3ctbzmcnamrvt36m5jr2e8u0iiqq7igom5nt1yhi391zj0plmctanx868zyvn9cbmjt4l6321igto4aemp7gt3z3q25dyfdp5d1qsy0gd3mm05w2uer2ma9ix161djepck0kgd4',
                component: '72blr4jq9aanzpy093q8a8tmjsscxd0xxqwjkzgy2cvgf6ytajoc1evkqapwupfq1ybdjdvc36vikapnrpa6o94yl1k69y8ydgeavwl15adtdz8fxiltvk8j6xn9lxhumd80zq4vgl6wld9w0ktdsmlzsidvd7di',
                name: 'v7myzzjtbywaswuot1klhzzcd8tdxycbupw8x53tro6xu2w2r6jz9342ka07iwek6z1ew8k7bsxp8koh118h2gdork4j4r5a6k6h4m5h6v5dhhinvow0q3u2uweyh5lkecj3cmisghnu2tou8xxw4mfnt412tj54',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'h2lzyvlrus3ngaf5yv92t81yn122sgg59xd1j76zf2jwrsnseq4h56qr140yrynvt7rmwvy6e2qa1thupp8ron891evcqq7kavdndbak7bd3psv4x2y4sgcuen83g7htcfc7yp5pvwee5uf0r3xcaqyeyrz1nf1z',
                flowComponent: 'kp9lquo8dk8wwqpt2k0fqk8z1nzgwtfge1ge16cjw7zphdfl0qand38x8nba9gf2e7bm8pf5wcig5we9juirgsnlamptcu5x9l0jc98500io5w6lidnr0pfeyh76pr3dq55t6f51rkfx4qa22qmp94sr2w101kt1',
                flowInterfaceName: 'pq5ec0hi6bpv0tcrnfx0vfghzi7v2r6cksiht6mo9fy342vu53bnir7n1hjya1k9qznrqjy67ge9cn9gim2zpjapvmz7gyas1k6cbieyz4d9fun2bbmuaqjsyogm63ma0zk09y7e630g7erew5g3vb3k2hjyb113',
                flowInterfaceNamespace: '9fcm0pmzyq0tnkrewf4qpbs1sbz83qh2bg9ctp71e31wj5hcjsgml77jx2uf6tyf1f5dbn6h6qg0wm8rgymn5asdw7bea5gkw2phzai46py80ju33a546ni4jsq8nemsq9i77zzuw0rpqme4qojdzp7royduu5tj',
                version: 'tkv9xabvgocmpomc65x8',
                adapterType: '8dge0f3mfleoq55ci9uefptdzw8qhc6g6lhlc9amusylezsmx1jymnn181xu',
                direction: 'SENDER',
                transportProtocol: '48bmsdbzp8sf4zhcw5cn01vujo8dbjdmu272lm8ucyday38fj948d73l92gd',
                messageProtocol: 's14m3gsqtftav1ij6oykavju8x5hql8puwgn19z3wnnwi5x5d8w9xuxyg6ke',
                adapterEngineName: 'x5o14v3jmvva3n3i6fxvucy7c27ojsr1z4wls6cact0vflb0pw79ltldagdxwn0qf4so9e0p9rmjt6z5v62npab2a43g1kl4rofi1cs4u12yva6fo061ykjuffx06adfoalx1xrm7rzjtz2fdjv549i60sw09s0y',
                url: 'pw1y8bjimp98tk4fywgaiwjhlu5tdtuk89kltoe5gghg6lu12zng4dmp0shg69ax5libcrwzn5zf6m4w9c3cbi8zme3kejsx4ttl0yimhr65yrjqfj4ut7qd039xv7t39eax9q027j6u9wqyjtrlk1tz979oifbh392bapu5qxbi7lpiye7p3jezbyo0l17dgeonxkkx0q6v6ap47pxuigi0hf3cgsqg9sgtoiyoqyzgpolxelq6canb2lbhx81pf3uputl1wo0u79lm505qz58kqtebgpch9mzzshi9qznbjklyp4eimi9tckyrhpmn',
                username: '1owbcdg46gvfz2vdlx21zeu60smd1z5s630a2atoic2crr2gyxjy1uiqzs4q',
                remoteHost: 'jw6x7odka40f9l35y8nt3l891g8bwhahyqbpfywshtv5ljbmb4ds19s4l8vgj1xis17z5w6use356ijosy4dnc2k60kzp3og290nv4ii3es5v7litdh1cnqo6b42qsunzdu2qgqkixz1xuvmnj4645k576b0v45r',
                remotePort: 1800289025,
                directory: 'e30hsc3y1d13chn6ytuozvoavjofb8n8dwehcvl8f13xflnvwhv66x1iwg9fu26w8pvqtkgpzhlapyx5ct5tin15kmyth7bhmsrr8kdnzbhxbh7waugdrwmdw1tig8n4i2fd9jmer1dtohxrb8iekerd3dm1gr095at6jn0j84eju8c17tbrgvv5fvnw1zeuig5egaom0gzyuzrepo0rmob1dt0xgsijlvxeh640idvduwxfcboiuxx6m27chios3gxt8yme0y0dgz0kdet6g2x1uh5mnab5gllgdqfp3fqbhifz781dkqb9t2lpq1porbss201s3vu1ozoaiep4aglgw2xtidoevzs17wgido12e02xpbu6p53d9lvtrwoy6mlw49ukoyc3gcbgr9qsophyvu3dzt8qorbw3z25ahf81keln13tpf36xx33rw14r9rdhj74a5sccq2iiv3o0tvoiwxrxof9v9h6tymaezyq5v7889doti60f3buaatwd3uxn60pi6gjeb373px2axump6tzef4ys6us107fydx7ji3xnpb47d5ujxg13gargrph5l1mng82z8zv987l941lfoe3r41aedkcn2pqa43mt9ldx9m2spu6erekmztgbinzx7favuftxkawuic7luapjoi9ebibixrnhdy3q5prttjtis4qutseu767a58a94vw0m11q3xpdankimvue6vky4bolzzi31nv7jd5er582qkm8jpldd375h3at5dcclxjxppfxo3fx6pnqoeq40awezpj8m9l8xttx3vj2qa0b0certqbczdnisy2zvxkxui1k1zjydcr4tfr6wmc86jyv7id8hwcabxpz8lkyh961ip7x49k1hyhst56c4qki1wei4b14v8eerfmrqsbb1bh6k0n5vplsh41yvot25pais34eey4rncvh09kl0whuq3kuxretlbrj3n00gh4gmgcd0x3u302j44tcmz1fs8og1vv0valig9sbbz2n6n9',
                fileSchema: 'say2ixu1w1rxydvghlrka37csneiq0ig2fvtg6zlpd442wbebyw0ia9ejjq88d8ckwmj9ura5k98crmq7p8renhwrp5inmpi1ys90m58lt8nu35rui2syg2z1r77ywmef0xw75y5db6l88rjzharkqx861za3x7tp8gyzxrty19pm419cvpr5by5joqbngvs5m79od78pcxpkbcdgxuauh0mr23t42wx1qivokyvo91wsc2d2qdtlvntiz6ni2pcet1t6c4laovisi3iotsjfkjswsa8d8yawg2bi2wnbxnume9di5c65gjmxyc7bzb4rejj41qrvf2wwq7l0hsb4r58g53x3h57a0rycm79u6tabort46acvfm2ciw0vf3u7d3q1uwooe117n6098vr65iawrloo05zl18w10y44decyv3j4w42qf4vzlicuc039b7fsmnfrq0lsere892293nangzkvcr17ll2foew07kchr9zwpse4f3qdopkh9wndzw73e7gckyoh6r01ylwf81bxbmsqtbe3xtnz614trbr9sprjoejqt6dzuearaundr3ajl13e7e9egp4ntb4xdz5v5v5c4gnc8qdxyj2bgvcpyl5a23vtmvkb7c3oa1bllbeqnmnfo6ejwu2an8i01tnd3kn3e5kh7147ydw3wvejb9s30njw5yxkdqftz6ewc9960ee408d9fhcsfyzy5gu050mdu9p0u4jovz31jcckiin51ikthpw76pn30g5pj5ycxd4ap8qanj5wk1e2689txtfx5jjbrnmz00how774lka48jh2cyo52a97e3axjpqpop5o3riuu7xj7xiuswvy3l6ec7zsc3dzi5yx13cmgesuat8tg81xy8gpb3uvm4vvlvyrhcs95qpbn878yv0m2emkpelyd3q72ywjrluf33c9khlljqx2obt0l3bo4k03wezpn1r7ibkyfkc1zd2s7afw0ukmkqgctqa2cb2aimhsoz5a9aba0fn9dy1',
                proxyHost: 'oip4j5nb5n24uzntc0p3llj3pmok2kyzecg1y6nvxwndxol2csze5bvtfb15',
                proxyPort: 7146244304,
                destination: '0yuw1dekk4pfy7xeq8yiyj6wzlgdd2enjmghp4sfpn08fobaxr75747yanjapvtd32mznu9h2xnm9i9k5gerzndzjt7oi2v93qmgs5tgev7fvdjp69p6brnr57d30lad49i92lthwo4u2vu855rhvwmwwgd8kh8u',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'nuxd93jr9smppo7jqg7h8nyflv057o7s42zat0ogu846h4ggeczo4slhwep180lu5973rgjy4u1w5r0s2a25qk1k2dx2sstydlu4d9dcvzmspxif953lue7elg8k4gqrsti14jw82e0lbyc1190y4gqjf5qkwajf',
                responsibleUserAccountName: 'c4tgvm6aoupetdlq4i8e',
                lastChangeUserAccount: '3fm4f7h5glyotxecfezw',
                lastChangedAt: '2020-08-03 11:15:19',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '98mukkonilcefez2rba8eabwluiilu0e04yuws3z',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'ngamowb8f280bzjgau5w9uab17b48sr413uxrfbtj7gksmlqgn',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: null,
                party: 'k766q1ntgnu394d52gmwxc2erq0yx2fr85gkocxa2umu9t6z2ryklxsnklf1kg8jeh8r8yta8slkg8kld6zompdbzp9glraahfh51paavyvriwcxwirfl5sbqublc1v4toailpsdvw8juj83l3kylazsa8beyyha',
                component: '73idpc0lp2qtlhoh67x0kh23lxmn45l2pru3ygymsyyv5ux6uqqr4z7tau1rymyx7xceyacw3x78t0fkefarn9o3455rexcaxiqcyxblhgzsbxyev6u4c98r1aaj59aepg7iwa8re5q45h1jb4zj92bplowwwip9',
                name: 'quxdv52qahzoq59nse29mivhdg2d4dytanvw5x1wqgfor5ipyxvuqdzk1rxxw94xy2vm9yegf5kev4eddrxxjj2qvtoiub2v3xs7yxr3hni3beinvthvm9h8jnplqpx6ox971qpl0vkqjuc93dnods5n5jdkmo7q',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'mzp6bjvaif7ltq8yi5cxnzhvs7ws8gld5f5yze4au6od2cti64rgvhj5v5a91ywtzwfxrrwybmbdh2jmz0ak2robfz8sh5xdtxifw4ed00hqvlxsbjec5s3urq8jgkh0b15i8itmgj6mt6kzl0h2d9qe30hz0lo1',
                flowComponent: 'j0tguc80b5u6l82cwseftxvi92wtbzn28hia6ww56twyav642kxzoih73e80mjf5hgtrv6ef3empl7725ovg3zj3w9y926f3dg9j93mikh0lvy12t7n1ktg1fu6ucqa54jtljqp3mgxxmboaajxn6tjnoko3w58c',
                flowInterfaceName: 'rjkldgrr4vo7ybxp03kfe66ufl7172d485gusaapd728ttxoef6k5tqn95gz95h9h09ch1del2ldu6t8dyuwisak9y586ovhy2i0atm8i9y4rz0dastrret2a7uxetk2oyri92gultzmfi5otri3b1lerm8uzkaz',
                flowInterfaceNamespace: 'utlhp7bjg285q57xvx6d9iy8k0672vpaybqgo3ycj0tvk9msv9s72lvorsaa5ijx6pwzd1o9fhepz0p792h9ythmpvn3vwg83ezq3b7jphhxp6xy4fjsuuc7ofukj475cnrq14h037tdfhd1g4t9c4na9zorj53z',
                version: '2xr9ri60j6zzrtfjfv0w',
                adapterType: 'st4vlbivtge1irluzej3n8fpxweskmkdiwwlea1v509yxb72nf0peks5du7n',
                direction: 'RECEIVER',
                transportProtocol: 'rtonq8ia3fa6kd51mxeriqlmet9jc3fdndp8hriwy44ihzkxkpse40apopns',
                messageProtocol: 'q62mlvghkaw0509ebdh6g9gusqxe9sihinqrtaxdcn5i6qm2mejyhaoxjwau',
                adapterEngineName: '28k98lqad56fadshqjkwrc5fb7evp4qv53fa62na2bk99yghgimxjvw42bzcohkszawqyiv9g9bxo7z5qmmnp8r61zjm4mb6ycqiwa5fs594yd4q5saumwelvsa16zg1e7uz8wowt2esvm786c4cydrn2xxx3a65',
                url: 'mu8dxulyywx02pg5l2habd5x5untnsnl6r3oodkwx7wvzmglfk8n0u7ticxikh5vxgpepdr5k9lq3iuel35mhuzebtdw511w3hn2j5rq1pnskyzs8378tslwwlj6o28tts8e4wfb45v1i00y7xxg65en6050t45uv7be1y6h2rbiy63afn2ff6db88tct8cnhcq8ml4i3kt0h6qycyfp7mq4r4hpmx3mj1v3n50ut25vzsf49uva0yq14fati1luoz99ehv918ae9zqzzbu5l2buhs85nhl13z9gut5dwlojblqe53bv0z4bu96gr35u',
                username: 'imzh3d1g10vg2y1ncjk36e6svkzh139poas565yd3rohysvyi6e4olgl67yl',
                remoteHost: '8q02nk4f7qi2c9326dv91dxq439e23y4nnkcwu0c28u0u30m272jxlnb7cy8qjz9jxy7f0iavyytqiramurfkpsn6eicy4v19bk6fysqrmq9e0640rjvo5xo3zuoolcy8ygrhvycxmhvpzcsl78urkhez5cxo8bc',
                remotePort: 4971151919,
                directory: '92ltck40z65d488ergqp3x133dygrd2a30ktmbd2uv9x6uswdv6kqfzogz2hg6tu7i23pcxp4kyricac6umn6r1b0dvrz31qvbxsul16cn69902yc68w8q1wmu1v72207nitsyn563yg8wcn6ludjslv92pxc4mm83cnzgeh7t5pmu9h6tyd43135kmpn51uffa8b1d5i305wt8ew7lsb1qkgnuctcp85alwdukv4zupq9nu2day1d3in25e3hzsysgvqk6v9etn0s60ykf7k692ttny63d9vjr8o9ay3vrnztec8ku7kzy4vvt2x5e46a20jx2lyobh4ujx3cdw4neapvuvigaioy6i7dux0eo007468zb5vj09tay1mp2zyc3h72kxqvjrhgz4z152gj611qxyjktg8aqsdtvgm637l0zpik7cnmsooliafiyfw7yqb3rwqiwti86e2kkqsgk16f1yp0x9x6iel7nozv546llga40fa6zl399oszq647ti5h2xabje5054fb333elbw7g7qbxls80jxiyx2x8opxmkb1j6qtoxxaf2g5lhm0cu3lvpfrmudrki15duxcp7wnmohl8q3i1nobprvwxqoiy0q8b2m5kedpkxwpp77wel5tke0d6i65yms8d15phcp9p47stvsamaak7t1bbxb6zzeazsokpwa4fkudf8idcjiyc5s05nv33r8514kdjbrrhokbdaesklieb7y8r656i6x8w0aqw9l18dveham407uju9j75ru2wjlh46drv1ifqqjruh45n2cvxb1wejdxn776j185tbs8rhxasqipr3hdtmofzmmmzbt3gdmj3pwpo5l4xh5drivlpju0pclo3d1qnl8fci7hq5ep8p0hmkfymhrtxfgj8db1ms4b37lhf7lxniesjnnx6aspan1mycjanyowia73xc2efngbfobir57qugxul1pd64e7rzfgqpnv9hbvd2l8tmrmc1l527jl1cqgn7w3ipj590',
                fileSchema: 'jvwwgyvzhxrprlqngrrxqgntyljeey0s443ti5qzwu05i6fa4ktd8z8yi3ns33c2r6i70tdwgy5r8m4sikb6e11tjz4vge7tvqn6fzrelub8ulf4o44b8dv47nv0or75m7yt0gpauxsfbbxaoms9ryqtchq7chesb5xd9z59iq39dgu0bp60rf330sw1f9m0ju4tpe6ajhvf2cv8mq7j2v6dhb5uogzacln0zrm8j4fnvmc5w4h2y83o3u3cr8vliimq24mlrhfccv4pvndvyoiwktiezmqx6f4zu0dqvsr5y75uxtgwc422j93gn0zbemznh8kq6aapicme9liyh7ifmf0d6bx1t6nyvdz2ifqek65lo6k1ej3q553b18m76y2e84uyxngr5ynzbo79gl44s729bk6po7vfav4b65gk2b4pqx51i163o15l4itq93mc7ad7aq8sxmflq7pb64wmufud1n3evau01hur7frvedbzmq6lkpi86m4rh9h92cbu5ct4e0jc376h3ndu6bpz5zn8295qw4nsco3szgap6o8p2g1v08bvmdgwdew5tp6ggoj40prf1f0efw9jmzvxewagu0j1scarhhziasus7yoa10poh3zmuje6lu567ykpxzfoweatec28unwsusbvqenehief8y2f2v5cepqh0xzydqmr5y7dkxr25ebwqw8ymhwk1c6tl2eosx96979gr8f0eu9oe44l3txvuxxhscvrh3vm1b7hv3miy3o6qitb9bt10qgiz34lo9s5qt6c37vey5o2qqzdkg8zqgqkagw7rj8xz0j19r9zd87fa1mfa89jbn1nczj2lkbef9xw145rx168p0hxtt2vbsvhpjt8y1uw720r4ddet8iglmhpj7zh6ibm4nyx8hc4tnnl2rjonvweeb9ck0zj1a3n0o9gy5f2xivuifrm2b97r821v5k1nj8wne0e3warw0ikfkm0454amnd3girxoz652h7crxmnod931703zjxy',
                proxyHost: 'fhiz0opnmladhcrcjdci5ij04jpwud9bdik9je2m7zs45bxyc97hmrf47f1y',
                proxyPort: 8037457252,
                destination: 'o8342jaq97ygi6li46nvf2ioo51pkzl1yo2k3em0m3vkkkz1u8fb4rec0n3vexil2iw0chifm9sq3lggiboauzy72ek04n7zvwy48jfov35jro7g2s9qz2yfv12g9ntwfy6d6sodv0fjmkxb4k3hodz7hwp5vk3n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ja2gh30nts7eoq8ywptxdyd1sldq1us3kghh87rsrgpj4ay3etn3mkdiim2tkb41g05ncuvedjolz8e092tary2qa79pruscb00xb56dx5rjzo53oll0ixj1zl74jj5qk4u3qypulalwjnvqs524m52lkn7q3g2i',
                responsibleUserAccountName: 'sywc0774u6fvn2m2xzit',
                lastChangeUserAccount: 'u0ztwirn9ftpe3sxh8tw',
                lastChangedAt: '2020-08-03 01:13:00',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'hbbo8zqcaomlya94zx8ljs6jvy01uz0x1m13pfel',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'pbl5t9p3ye4bwvfqh3qq42o8ie901tt7uy2e3lg28y9irqqgnu',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                
                party: 'nsnxtxnsljbvo377a1tt8zvfwgs04rj69tw7tk3tifj9wuzc8u7dzfblpakv82wukmroc71nspds2wgfl3it2fx2s2xehqtzk05frqmdk883bhqipqj1fjor02i1535b0ctycjblseog53zkthlw5nz7z9llgfph',
                component: '6ziajkxhyofu6z70y5d7yodfi92bdb5ouzr8d7i903mkqk6wbjg6aml1qf9ni31863avaiaov7ytbepmv9ngnsp35fxyvq4rk67o1kg0n0j5fhx2wd7hmhawnfcxc7o147q6by2e39x7tvg4kiklebiogbfua39h',
                name: 'cewuu7raxy1velqgk4t050vnk9wq8asbrjl2pc30vezi413226hqgsz41eyq6hxwhv2ubcbecrxidefspxd88jyo54msfu1jfm4ohkvml0onfozpwe9zr5996gbvphqhiwfc2w2449nsvby55izy6440jnamsf3v',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'jknhoew597vf86qug5y0svp1rvyw256kk0sg9dv0r1setmlq5cudoxegyonjpcpbuhu79buy5049in8d0opphc88r3lw6ol8cq7asvlj6dhr1xyzqywfqmo84uokcfb34jaiicgnvmxz3os16ov5imxoxn5go7oz',
                flowComponent: 'g0gynmkfn3on9llj1hzwvu7okkyhfq9ayjcvqz46yjpdm3h1wp90hewmjxbho56qiqcgboigllq3ndhymzw1wqx6khdi2igr14aux4auq2yog1n05urhc3ebliuj2pnleebfgntdbgyos7s1ndp0b8gpd95o7t55',
                flowInterfaceName: 'ajky2x4nfqfqyw66kgee9x07iscxfcevi9v83c6ftw9gb1fjq4nihb2ibqu3qi5w6tghszsvq8rq0sexkjhrn0tpx28z9u7kv5tzyeommbunwom3iefowcgnvcvo9e5z07q7ywq1jenyqqz33xapwgpop16fow9q',
                flowInterfaceNamespace: 'fadgnhb1izzko9q8zpvu50j29mpy89904zux40rk04t63e0t5s3x9iwrp1utm72idqvxwvipbmq1fexoqqvd1j85vw0kwd7ofjrsd6q97j4lgri3krpqwda02s1eiqepj5ralm3q1javg24k224ffci5l97nkg3a',
                version: '5c8kq2c6jhbxcfkarmkj',
                adapterType: 'alaj9w310u2fkcrw2ohi75qka4ru3gnav9wzklbr6hjyrksovxsvxssc46i0',
                direction: 'SENDER',
                transportProtocol: 'e8zq6oct0zyptvsglzafv3pdgvlqta1skynkt0ymbhcec7gnqyfw5yewyhhs',
                messageProtocol: 'idc7xksr12l1ulnwuv8rzfwfv3wxyymu7bahnjtcg85f2v41l8v4z80le368',
                adapterEngineName: '0r4t84afu4wkcyfu71r30jywhiopuprs8om29fj8xm8sgl5oytpbaddz6y2x89kwace9302ni71mfu4y0ejrbn54yac6o1px6x2z06kkm56ua2zjest40l7n91erdel9y1pwmtbqfvqecmamgj7xv8qlhu0327iz',
                url: 'bpb225q8s09if1j8fd9js62gv992kutpcigahl23diy9dyw03mostty521lml9utxl4gefow5imu36whw75yha25cr0z8nc8qh60qiq2p8el3rb8txzj3orjvrdzxbpfdjqll116jzj1bg57d9qwn80ph9a0amxselwp4hmc9u2o9djw33pyjvxbl7f1p39gluwxzci5mxiceg8abwii5jjgnbt06whhentqghr0rzf83cduespko26hn1uzj6065vbtcvc7tnxj3md33b0yr3vrfw6yfue32pacju51aavzyvv8u7snuyvgsl0byhtr',
                username: 'ikrhwowrob354nbakh6t2y2w2mme4yzl94gtlku34ub8mwgo20b21h065jvw',
                remoteHost: 'tkcjuii487xg3fyraymq55rdrwdjxchj92vf7vy4nt7eh4o36p8zwrvh8i2ainx8n0bpokvg40q3kq7i2f2eopbkpzap0348qrhu2ixjto5ytyswfkb7e5sdf85avwqgqoi39bpmmytbmn3d6yb1tw2tcap9e1zm',
                remotePort: 5380950250,
                directory: 'hxts16lcqrb2k660i9xkc5gg4q8y61epd1u7o9ff7grt1zvhchz2zjyoc4ifow8rbktxnggkpjliyke39t5r8tx882l42df1ojta528bfoiuwaazf4giyfom33ldg11um5o3brszjgayqelcrjgh6xdy8k3rbhroj5myar3wix6qepnpq1b7g6j57de9td64fjo7ss2w2jt4exfqrm19grn92hy5nj76pti7z6k9uamox7gz4b9hkxgw8dkkcrphjb90lor2qu9fm64fl94lz5ek03xbok1tgezkesgfixm5ful1g9btqv3jbtjnjctgl2pcy9hp0xdtqmccsdvnkke8fldeb10iv50vs6qmto7aummd22el95gk6lyx73t3a8koy1onwgwkhu1znjiu3azuuiar08x9tj0z0r7i9jozr7c0oxjuxgukz0dwbs7z7xiq67gkhy9wm08vhjxjchthm730n3lo1kib600p8ct4qjlg3xcngy0fqm6676ji98jzp0shb2tg47exb5q0h8yck2aj3sh4he94yo0aqwjjc9d2jq1xsluyvtkjd2kuls9goehkvqgtrjj5tinb6cxj7ihcn0yf0d4bq2fz2ylogl0rprim9z1m9xwhbnc4s9kgw28tly80h41jozw4kfr0nve874oz7ctsuetd15os4bs876bf4jj7aph79cfgrmrv2tdhqqz22y4soncgnmu6ohb3aw6i3ihqkk47s91ke6hyvjzeywpnxh4y5m26bpn5rpdzs8iyfp6jxygxz107obyusgi5tk89184imqnzmnm8dj18gj2rt8szg3hwjniuz598n9k0x9smh5sr03zz6v0yibir7wla5a1ls94jg7g3pkuk4l1iugub5wk8tthxhcxadw6ch1deh6cmrgi1m44o3f9fysgskg8g7c7ez3ku6uu45puq3ofkd7elxkhtexbv5vxgey4z2njxxt8wkqsusyhs0c0azkw449x2wtq79897mt84xaqmqg70',
                fileSchema: '0nckslcn597gbj7i1h2a4dzu8cs6py67uva4x5dsse5sriwo1te1k8bpxw4tf5n9rtambd5rizdkx6a9d09osinw8vrh3ygpbv1rkmdwzddvweze4uulwlpf5fx31wbtn97z7c3n25aq45nu4sag8ured0yf4at35v3zziz0zhgfgcuh73bnf8t0kz5mjqkeg3wdg7oyyrrrmvcqknch0njybx1fq1uqe0o7qu9vx3s8mvki1kx69w68d75sxwmkgaqtq9iwwv2klob05r7i2rb6h4sbz0ioxw9azxsysp1gvyh9bet25aznvulawatifi68ibesqk7w9xy7fydyvx09m0330mwttgwuy7smje7ybdswaz36sm0rpczxhhe3in9kessofae3u6riqi4709ll50qju00ecvda3wezy33db92b0l4d5yne6u0m8cuh77df8gbpwccr5d1bapfcnv0glzjvmto8f50mqyxxott6yr4grwlwq1sj1d7ytg43prjurzpv00go9bjq97fd08wm711nh7qq4npkc7q2qq4jw504qo39uno6p7sr612jz9agi4n45wfroq8kd321jr8a9rygmw9f15z1d7sfifq58fvys88s0y0ub7a9cs8fvjppb8ycjombtfvw8kg7grbpzjzea3pwtthmyxgeqlsk86m7xk1iw5hkrr5ocwv0xraou33q92vmzwnew2c9p0waye12mpsx7of143ifjimg08erwt6diio86aywctph0865nkjrkqtijidsv1nj8xoin7okectomvkg8hus4i3a2wh5o69zhxft0s9854wztn8t3ltht8w7ifb4dw3wej5b88yll36m8myw0f0o038zzj2afv6ktfvtbynwm9yvw8vzuh9c4n6rq046hfi3kxyr3mwgsrbcp71suurf9iyatiza1bl5w5gq19xf77ld16ex10rl09lwemw0shyv9guulw8kxvzh7jx5kdadlwq2xkj3nt7l52j3dqq55scs',
                proxyHost: '9p0w51lm52m9hmpl9f8oeavqohqt6ec0gjo8wfvpcf8jlbklulh2m9e05zxb',
                proxyPort: 5895059496,
                destination: 'o1fai6f6cgrxdvo1747ni4cm6403ug8w4zp80pfb645ktdoclj6f6ja45qoi8jl2i2kk8903zryo9mv4vy04o46me7ckvwjr4oqwi9m6qpvi5j750v4jxwma3yc9hlya97nwns1iwd4cpnklxhfsjzwf82ptvm5n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ucdr41mftfxzhx5cosgkqtr1h33hxjcxxvqkll04q5g4vrio7vtqpytf8qkuxmj0rgtt4z1pug3po5nu77dvn0khs6itu73su6dksd4x19ibyxtx3rfri66vdgq2po03gu4kkfhto1hq2ew10srlby7jw142exow',
                responsibleUserAccountName: '29ik6gpxm94h26dg3jgd',
                lastChangeUserAccount: 'x8uqjw69vf9tmuny9pyt',
                lastChangedAt: '2020-08-03 03:00:23',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'a19c4uh4clrnvktyyg6sbhjeff9bk9yc5mj6yaa5',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '3iqy96lh77g8qpbbuokwkkuh30c8e5sjzna8h7oiu3kh54zya6',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '1bsyp6iln6veioau4bzx',
                party: 'ajgzkl9gj90ts5uu6hlhpc4sto02k4hs3j49c2zu814djyo7bj5ntdwtcncbzza6dhne547jlwa6ez1idks6qhkfgyczsq0inj61h18atggw4mlu6imrnjjo65zof4w1wtt4klpxayj40m33tinpcwn4b4f1h644',
                component: null,
                name: '9e2jp1e95ix27yjownpv91354tjpezhmdc0nmm5f442aw4pyteisy5spghm77c1q0bsletdn351d2h6tb02ksw3yygigpeg7w4r64e479e264j5jym5tmyicd1rjtxzb0dzg2r1x71n15fqx369rw0cxr6ea2fdg',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'b4oe483yayhgbh9e91a6f1qk1pzi3g7xlmk5l1przdmdo4luri27it7g0khk7kaue46w95ps701s0bys90km75tv9r98bbq0z0rblcn64a6ci7mn5yl3jgr4za1wq6rurrcx3gpy1vw819mscsnarrynq5udrk3n',
                flowComponent: '7zzgycogtmie2kgfm5m0awj7ur1h5vkxdyl7ag3p2dahhsjj7wzxrf9s3cvlochgimvh4fpnzqprq4apt80wcz7a4p4vf88dqek933dr1wgcr59a4c5bwp1yt8n53035blt9qnwaycezve7hwkagha8vuwq7xpj0',
                flowInterfaceName: 'emzl6ecj7s664uqkjtu59t00i4ea4pwum7493tee9ufmk8hmp7zikc4amdyz4ygnrrd3dvrcw302eh7gsp89bofdkeei5a2svv07jlwjh3c7o2nkmncbppgatnhafs7a58qovv9hzz6ewhcdzo9t1g3ws88xwwol',
                flowInterfaceNamespace: 'ooe4x029mjcqiqam0gmr0tdif88hl9qq2uegmqlne3l3z79gcydsl8od1cdf5tq8fml99zil333lll4qjxzpjnpae0pquzrbnh0gbl421c4zd2g43gvrv49squj5w5iqw16ny7g4h9122rb30s5xm9hpfdv14om9',
                version: '5plhs7f2qleiho6uxmzn',
                adapterType: '59m4zja29l0uu8mxyiliwv9vtq32gu3g36pdr3dw300punv4qi58ihfxbxse',
                direction: 'RECEIVER',
                transportProtocol: 'dzwcle6px4sa3se9ahx0vf64vl9ewtjdy7kg81kp0blr4kdqlf4ec9wwrj2x',
                messageProtocol: 'j5xtpqpizptoowbdrueq99yxdk51iqb9mlgz24a6xb90meoj8eackvfb4a9y',
                adapterEngineName: 'kx7l8fbtye2laikrmilnffvcmtqguszfpayl547nd7ssrxirx7j5jppiyd9sr78t2bpjijxpy76t20z2vyhwtbjkrf05lqddla33lng2fxqom4ddf0cjpuvjee0wft0a6dkqn6cmynv5ojr6e2mqewgzcwvlsk4s',
                url: '7yp9gihpl3km9vfp1vo5lvgvx4qyize0pb38u8od9723a1fzl5mh6ti1m3bw8o3p17fa65n6lrx42tcirmqa3cbq3o8yagg8eot7sq23e8g1x0rvqczdcpsaxyn1u1zv5hz24kfeoq6sr174bxv66wvq6djnbxtnj2qf5vwr8nwmzt8kve9iy7fysl8asomvrh8mni1jugxxag05qt0kf9fqqxn9k795y1zf1y6yw455ec7653kiit3iggfub1psnk42aul2v3yh75rxgtl2zhlxpy83mizl3hp7px6x4yjy6w2n3ug34h2sq4yp458e',
                username: 'fqg2ipjvlsk5e2e95xbd6xu5nyi2dj5m88w2y923xbstv4eolox22elzq85n',
                remoteHost: 'agli885snjnrccwtlvx0wlel29pgv66sv2o272lvl8lsuat6uloao8u7sdoy031cpkyra8iozr3boojl0r9qoce1eazth2low1g8bzisdpzwrbvuztholq5utpe3vwqdwd54448pb47qkjyhndeie2ovjz9eczh8',
                remotePort: 2037574839,
                directory: '2y4q28j3s9i080cg11g4glmodnbmkum57pfm808pf0zqzv44fcnhfpbv0wdk8l0o4wk0kc3qglddzg1nkmdavgeue5la0g5ejdx69ke9ycadocm9mz7gqfr3yp339joirw2rnrfouezqs3rk3wqc3ztc4qoldh35peorfak4145gi09hz9wjq4ugblngwxlget9vlo5vk95glyisxcf4xuud07qxeb5f3mbxd2i3abxf5153yfwc1ar734tidqaar9fcboaw4vxv8wgcyr7ahxkftjouzw99btio9nru08f60fpdgc6q3howuveqlby7ssa559l165sna7zusvc9s7sk8pvsqkydebpj0eqo0re10nsuhgm06uwzfhzb8kaekwq97z2xe9ffgcw8sc51i43ab16odcv333thqfoqavsih5yli13z0hbxpd4qygpg7mn2ld6mhzabefoirolipi6hnqy3kq1evrolfj1dqpclhfc7ccum8v8n48xq3vtwtjqlzrd7d459vozpzrloj6yu6hn1ju9tmt02k137qyxp1jbh3891e3i0xpnb7rqn293jrgur1wbd042xs0hgs21u1kg3s37sask4bp869m0wf4fll5xdcap19bbivzqf0vjc00ow3wf6zymstv09gxkcty36mznh4r8496s4zp60ukpgi8p6zl0oht7to39s6vacyj2pkss7dkk7g3yzvdsxuovnrvxdfl4vh6gj3pl13y4bizulm7sim31jdssldcqx6kxoc5sn7v2697mbms4boo9xlta326qfg6w3f02jsmaypge0y0thnee7970oqmwr4drh9hk5fv51scu5o0d9jgile7dm6bjtzp5hnziql8eg0qwddyfxqnuaryp0xjdo3janvsqhwx9xfxtzdx0h236ej4g1nklt6fjw5w9uyr9891jkr5amy5njs2piv5c7ilrn3r7fun2nn43eej007lyn9evvs4hjfsv5ou8itnw669dpxl2buii1zivo',
                fileSchema: 'ejwftx0uz62dkf8zmryxjtwa9na4k0z0jeilxpqpmct8g515a3d4vj62oyiqujwdb89a5jf0rffqn2abrbstfad60onw27sk1e8def38q19x4b5ko70v6253etw1bsqdrhoybuwwd6qnj2h2q3y5qc2fpxc65igsjqmt2aaqel330h6aa4ployd2f264lkmmsdesjoput2no7mqy48j16mv2fmkpskv0oaaoyj5kt3nu9j8gzdw2grks1sc2mccj1rx9tdgq22el35umxjvcvqo0wlpqvr7mo2nwcn83eevaxnxuwwt5ssfvlr7gh1eoblgq8qvrb55jbgr5jfm7f0oh53ftv0n20wx6shjbok9ywx5pjjua789uwg0jwtx7ngw5iny5xbamnnd4wy12fd4zu87yvjkwvif0a2msf4mnzxvlhwcyuvi1gpagjfbos4p0hov9c8t3jl7dxvtw02tbn1cra70zxrcfx3cwd4e463d7d7dfqksi2r25gmg18skfppm3jiwaqudfqj1lr53gvhnov9cv7hntjhffosklvnm68tkg4a82bnbbkt1gmncsmnr1fqd67v7l1r8wuktt8jvfw05m154xrtn78k9vi9qej7bnbud5ari17ta799ooptoq5t0z10lmtrc05io7vvnjm44qzctr18yuq81wsltfs80iabnb4b6xsz5bmv3r8xow2hlys1q4nglwhay7n24wacxzfcfmelblmzn86y4hsgtin65t9rjfnltp5w0lvax0eavjo60tx9vedd7zc8kzh22cb5iz3jd2wto6u9m8l4j7ox059fr4giezb1c3ucxil7bxspewy631e0im268tfkwc0uxjxz4sv329oci0xicf1lh9zvfyfc6wg2v5e9wbc8qok0valbhzvcxwqqu1mniicxy726fpdzfo67pk0li0lbk8t0s517wyrwlqk6aqpu4wp45g0ecm1dqltdo17h485l78tp9azf8cvjc60zlna9wd4xpt6882',
                proxyHost: '5v61nbd05jvggeljngac9fqf2hjxq022rzpuiyeg0t6896d0utg6exoz0gg8',
                proxyPort: 9437611400,
                destination: 'qp8l0zm0evdg10q3bz4urljqc79nraclb30huej4ppjmusfl78iclgy29pt5gk6hxizp850o2wbkbfulo8ygcir0tf793hm82k6bbsfiqs24rz9hp9lyx9th7nkekgl2eik7dnpuw8xvawfdqkccfscwgumaz2ju',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '27i0q1ujdz5qvpqixt6n9x5bgheswd6w4okvztq6hc8z0dtvzv5zyq9pv031jkszy52xr8cpvxdpfrlpbvg593fnlam39kdij7ee8lm7o42juaca290ji6kb6cfg3b84n1tihh4ohkzkcsqkw3rbsjri6o6t9nkd',
                responsibleUserAccountName: '5qnbfg2cx5aoijheymqr',
                lastChangeUserAccount: 'rpnizaj5b7eiyjkel5tr',
                lastChangedAt: '2020-08-02 23:24:24',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 's3wqo41l36jnvfnpofli7t3zu584wgid33bm8kap',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'jjnkra4p62kglippatq5u6nl2j98gpwtu3mtqb0uvfedoy80y7',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'qkoofjcwvk04vp670l2x',
                party: '2q4mqbte5v2ibjws70q3lye5tvdmwxdpn4biuj3ufi7olskuwwn5j8gz0pnj8ulg2y7qi1njhefpc5wn6ihtmov7tdxj41bqagi0z8xtnagobch7eh7128wjd762xrrzfgy0didfxi4tt8dk2w1c8p3ptx34c4xd',
                
                name: 'l5u39jm2p8cj80eg7or99x6n1p8zkgu5v2epksxlzlho4hym1hxd2jm3h040c9svh4kjfb0xsk174lgdicbs5kuvdk3emrezzkt0whfqw9mimpbk8cdz70dads8xa2mwk75y6hqo3dlhd69q49czkj619g32bjus',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '8on0i1di29cphxuqzup6803euio2pgo26g9yetxmqjsxk4d6toruzhay8tx499eygvw9o6nhntrlkb2n5rva82dnrjg3thkbn8ges6l54kbufi7t2wsk9xzkvpob7zh557qm05air665aceulvi7yt74byfmocyh',
                flowComponent: 'gue9t41ub2d25pfm5106lnl417hqubichfu9giwe1chsxzs9xka0g0gmyu9tu3es979kyktjkfdhsr5vxplom7chi3qjjflf9yyk9kelwtmjytjhvsjvaysgw4nzjs6ow0sgpjpsfoh8s1mvv2nlg51jdtuu6bhr',
                flowInterfaceName: '4cwl1nweregdx1fthiyk6wmc3136v57o4zirmsc5jmhij1knm043oxh2hyryr7520wchnlzkrl697cjg8p97ao1x6fzjxk7w40hdw5jjptegmfjc97cun0pdpn2sm1x9xzpr9skowurwcbi4dujn4vf5vld0x51d',
                flowInterfaceNamespace: 'mwaldfbtn7rmvgfcdv64ci5zxvxh51ww0l397zzabgzbmc09i9eu5l2mdukf2aug4uqomcnvvvs9ehaz0ysp0gmawrh9al62rl8ep5gseprt023h9ge0fglskvyh7ov9w18g4pk79llph5s6g4saz7peylb5ytza',
                version: 's5s97rn0tqgwo2oa0o4r',
                adapterType: 'gd0tnpjaanyu0u1k58e6ed8hip7ybfwi8774dm3wl33y8285ooddehomn1fo',
                direction: 'SENDER',
                transportProtocol: 'irqqd3reamn7abfpayk8vpxt517wg8q3qmpl0xg60g0wzf553sa3x8k99ael',
                messageProtocol: 'ogoa0kkqm9o6l37pkb75v6l6hyexr9e5v1acia1gcjjtjvb1vol60ol5hq30',
                adapterEngineName: 'piebnct0wm5xxiapa3nm34o64b749ee7l77goesaglxkxdm0s2hz988ocgumyv5p9utpr14kh0uf2ndovn23ko1is1pm7dfsaopnfgsscs3rqfqfyjl0ikvji3uqoann6kwhoxqj5vohzya92mlv0hz9mia5u8zc',
                url: 'uxy1cc16d1biubbefs4bmgdr4qx03sffwgxbwtstdlr26zme9pc12yys9tu0ps7w098stjk1tpbjhf14hlru2yh0nphsswpt31xe72umzdty21nevj8r7jwms2r1ltqmatxnt4pwlrv0rcjnqoeuyxeg3reux3uep5b9fqoj1glzkzhvu7ubizavi6yu24esp9ud4bjo405pkzq60qj9d08t8rem8xndos9to3ionv2vsi4lq87gwoka82a9oy6e97to85656nug1p39bj5vt41js9llm6ora37nykq6tkei4fgm2yg4qqgfxd2i6qjt',
                username: 'ftjadzoxortccks6jcv2ukav5r2s35qjmblfao0goxhd42pl5wpbzljzlyc9',
                remoteHost: 'zn0ootca9m66gjnewqbtvun2nv11g6oprdf6ahk1c4nsxnabkskfc92mco35pdeuys5j5vwjnesxrl3weuyaxdoqjbt0edvrwm0wmkchr4i58jz9yd3c62botb5uwzydbgcu8mcxyai4vy7vfyxjb7dwflk3yho8',
                remotePort: 4347227630,
                directory: 'vb9wph5l3ln64w7gbmwb1vevu2a7neki1pwy1nn7tk6sbdyiyz2086eoclpr9k3osfyib3klgx3o0t7hcccvbqhx1e87tw5v4hmfdwbrv1700izxi26gih5en3rbqc9w253tfa1w8qtb6ylzr70f3uw5x5qbqy42ozljxunwldtfbccwccaobv0mmj27vbqz9k26hjym9i8gbyhna2ic9y2zwrsjp0fmmjum1br6iceqta4v3aww3zniljp02vj8efmwff9r7s253zntn0ix6v5abfmfg8gxseklmop2qdddwoz3i8dfb280jr2tnquewgk5xrtodmoq7t1wz0q2ygh3a3qt4k65dq7ttsaskbamnlj0nrdyqs1exb5go0tf8czb405dx3ayfxaz4ha5w1b4qhqvs9nxjd2v82cujpsh8y9kusfpejg0wli4iiprpfm46hoy3hftrqsqqzapgucf2ufm0gv7dw1ebkdpy3k57tvxrzi8suxh0oay8igq9g2v9gd299tsjayszk6dpqrwrgitysltjhetujxbrv6f1bwlhq1krmuiv4v30bnd7ko37mwhx6ffhoc2tls4tu2vlvlrp4ho2a8184a3jx3er3r70kvq15a2ha5x2m4fjlmg81pfxc58b8n52c52yruxfl4skp7xw96a5lqhj1mow4b9y3vaan0vi8kxs05qj91mx5mvmb2gkptmtmc0naodcodk9tuk3w4othmqprj7bvhjgq8a50uzvommxe8mqocd849ccw2rkjtbvfz6i0sd89wxbbmbjs45tgisr16ivuemp3rshxvjahhy5l2pqoriobofm7nd2ig5e5uf720tztxn2gncm52u97dstd3tgkcy63m2ibgos48473wvv7j0whuc26g6cy0yzwk9sxc7xt1loqodemiiem3xcv5ij5czh7b3wsnyqr5598ddzq7htv9l0z7g3g9gr8eugkhbra68e6alxgifr9rimgpio8e227brvimuyl9b4osq',
                fileSchema: 'tk5wea1m3sbunhsxjkbnwi3nmmsk9opj0hbbxi1a8x61597j6wivzq0jbdrhyesodla96dca04y3qbqe0i7soobgjm2lt73u4jvdx08pk3uqrshsrjytker97c8wx0x5mxgpaxivtlxtqz5neb1b5e7s2bzwa537j1gpb2ia79wl8l88qhu9xk78hj512p4yi6fxj1d4g0m5dcpjqda5umz9fsjlwuyhagh65v17e5xbmsvj9qc1mqd0tis2yimsphxqu080muitw13nh81ggq1ml3d2axtpd03fbx32rzo7q720hl6i5ymyok8i91knda2cpjje9hjoiu0t1v6oxu4w043qap7fmp8a45e2wh2a6az0lmnjno5goavcpv0pyg1xdfzlf7mmure9o882kfwjh3ws4bstq9dqzhe6j8iby79o6wb60knrfryeekzxbdie9b5bn9cd47d9h1o2ny2s2qz2spu3lsnhz7ql6racz7y0hfrz4mxgfvgsy1lhmrlngk9252gseulyv7f0q9uesx7uud0xftg626esboi1i1vsdrny6e8x8vcx1nldywxklx5lkvub6wju9jq3w32q5m64rixs81tdb4zgw8pex72b1wd4c4i29y8u7jjwcaowzk5ikqdffnsswpunqa2zhux67n5j056r4cekvhn7rygf65e3d3o4toqta3ii696nbdpf00jhdfotmxjycrchvw5mjau9n2j87z15b39ao3d6517weo5t5g4tsfxtnhzkzituqhasb7iiirl706il4orl4g5vqllovo1nj4l8pwe1h3oeroch6ks244gaagxgu9z36mequzpj1mxftum2r13l1h926xdj11cm73oh7bjmu9v731vsheuygrb4mixpvghuaha4p5cbvwelgeahfc0paowqq5y4iqafhqasljditlh7lw7csc36fiilkln93mcthu7bhlp9u4lwuxkrpuqqrezua72a7l1623e96rntrqu5whiob1h0m1ih',
                proxyHost: 'm37npesgwa0vu6qd6yzzbji7ethae8yf85kyzbrjz4thxn9s9hqo114sewcw',
                proxyPort: 6579611135,
                destination: 'ota5myqqok2xe6tb50nolzd92ymsqai9t2yc2h3quiwm9aa93qhpov6zq4yu7mttuzze6f33m0hvvpk09n8rdph0abdvnhpgfdlip6xux6r8rfvfpch6etp71a4oqnk8o0vx8puu0lxwiweg2a4vunxb6e01xxp9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2t9njuzrq04z624gr7uh6nylcmn1ep5hdyadmp3tc647j8lkndzj9gqpkcg91cbwtok2ucxtfsk3obj3gellppcsdxoe26x02f6x3atd7yopqc0sqc746rg2wq03xgsgroypem28mzi53fwd4ct1n63f564s24sr',
                responsibleUserAccountName: 'rsywec25ay998jgvaqw8',
                lastChangeUserAccount: '7n9zdw1c4zxbdta05mds',
                lastChangedAt: '2020-08-03 14:53:20',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '9nde532ftxm3a035su8jcc5txr3j9l7quix50oga',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 's5mm8llf6r3sqrvf1hv0piz2utp8gvqrgv4rc3i4wx3rw45zyp',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'pjc3ls3w4r7rdad2l6qr',
                party: 'g6x3b7qbnwk1c1x5pvusv7fjc7rur014umkypzgk54jeo7g22urqxp2gb82sllow5p7wjvz2cipx8zvaixixbzt9ydun830jg80doy65gf4pycayrisx2zdb5a5xgc4bvk8b6udxswjnsx14x5ij2tw71ba9vuqo',
                component: 'deg5or13mkm27tk2xp404wbdjy8zh7vrnavvijdv155csw2gnj4p5zggqtz6hzz260is4j0bf2jd6o27djh5too522fgtlghperagk5pusdzhahza7e32w6a1rdz3yein9atpsijap8ouydohw4dmmffgd4uy73v',
                name: null,
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '2xfkedhqomnxegxfoa8cxztptbkesokiag3yvfsn715htkstmusretmd3u1fxtw6uwaku7khmhwhy3th5bifany2wdpmhrkyuypedtrtl78adhuul1j26w38xat6mms6epro13tkylodz2kpzh2byqvnreie8gtx',
                flowComponent: '5sgyzl68fasunfd1re9167ft5402rvpbbmfku367njrf4qjinlm2ggy6o0tnwsur7gwizi8dr1etjh3m74b6idfra347xh56ll1jfa2xexyzbbof00l01pz2ysx3nnw03bdgnc2ezj2nkg4oh66fertjq0k0xeql',
                flowInterfaceName: 'ar8q4afy40a3dzaz7ajrp51p1cqn98z90ahqstfmb4mxgne0igav3ghd5wo2uvr8o6thhkafjmowf0i2kizrs46t6fmai1v46so90xr2azhzi88ratgh3xuwjfrmc2fg5yyqx6tgn1p63qnff2ky20z4lg51uf1t',
                flowInterfaceNamespace: 'votx5agrslnzyt6p7uq256wk5u570v8nvy3s7or07n2dgfpv099jca0ufxew2yjg6u6y77ciufibwkz90p1xwmlgo9dey1swna9z5zggub254atwlkj55hkomfomtyhiz5a8b64sr4mdpco5rdiadxpaygpk2mbn',
                version: '1hg7syf5vbc8k9sw1ajs',
                adapterType: 'd9o9jqio65ix47zznnp8fb95u3ko4o8vtmd6n1nh1a0aabf1ttjsg4u2rf29',
                direction: 'SENDER',
                transportProtocol: 'gftxhmci6tnuop12trqwetphyyquggmqwkri1ye29kwyuht5fict92l2t6jf',
                messageProtocol: 'gj4xvxk7ais6uwtcfg3nvexc6md6uiufh9igj8vizlj3m1trylul8iody29h',
                adapterEngineName: 'snvf987z7ukbgplei3a44rpd5yca8ocqfjn891gjaq70xdm862jdp5hnl56wmp05nd1gb42exgxmcu5swcoebu1il08yagzu9pcy0frvf08muwqne9bl95s5ko2i37g55spsocnbdcso1rqgscmfagbw84bgn7yo',
                url: '9aera9ideh565b30b1cswld0nkk4iyla5yvmpz8go2ym7o483j4vnv6gc7zfobztexl966tqsfhplfl3xs0tbcbfxz5sdutpks60iqrz7da331vhc34z51l5or7tyruifne6mmz2qtymt7rbqz1t6ucg1zph9nh1b0ycndk9h4wd063jbderj8tdf3wzyne09pkawra0fhhezfeylz3cuvmysw5804hbdf8rl80ap808l5p5cuzx7gjcw284oh57qyalx55qom6aodbdwhbcsejr7yrpj0ayenfeifbsm1ux2ggzak9a4t8zj6wempkj',
                username: 'a435kmtw2q8kcfadoptmgz18p8mhd0c3vvwkxpzy4esh7sk6nu4jbws7mh8c',
                remoteHost: '4ohq5rwgu7kbkrybui27yv26fm8is2fjivdho7m45g630zdlsbrcir3y80id43kr3hs1dh4ml0zgg0nopx5syicp9tesrzbf1nzhk35j1ocksidtqzoizsd658h66c91aawvwz7ukx5sglzvdym7271jjxz4ocug',
                remotePort: 1637878838,
                directory: 't6kl6mscwaqhguvqoyhv2783xl3034hneaqh1np82uuj7j9bfediqzfw3kxpbwq59ovutdr01f3tkx2k82xcqcwcr5b91qzwyzh6yi6s0cuzwk4yq66mn12a15gi47hktadiho67du8ezskkvx1n6rjcrm5uefp6mhxh3j2p6wlngt2ikowt3alymvtj3scjo5gtly6epq9fs7hzqrqqn4y5rrznhjty8q0hqykjzcly5q2imtji8ic6a7zq23isdaqvnxiw60u0v761xi6gpgkgwxy71g0shj1ohi3mkf352a5eqc5m6txilfdoul29h2hyn9dhyps2lyfgvr01xb4pxr5ns2npdmkrvhjyux6xrwp7oky7z6etz770o7lv22je5fhgcydx7b36p3d3ii59wr5ual9l45i3e9cqqynib2flf12glbshmh5t0xadmdyaaicbjfct1kkhomx4lcbuv9byrme427varfku9u722ma9vgyien63fihq0637c7cch1g2foycfgeg56ug8z2fv0t7iqigisiftircaxilne6rrq9uywrocbx8ttjfvqut7ufi3gpkzr11m96vbylmvz396upy3yfhjc61x5g2d8d9w2n3ct5xd8y9y63qvhpicx76hhhjbmwbm7h6l9mw2vyowtlizxt8i9pcm9ijwx9u3torxrgxtr2mkb6zikz3fi3l51kay4cejomjr4r608e23jmvttyxa28d974182dku7a3juwkuncnrbk07hgbz28ncae1z9xxi8bxtrbzttv2qk67bsfzus6a1xmt5tovg0nisr1y9vb9fj6j2x3mcaufawwuxwtm2gwiuogipmo5m41ae5y2c6sehp3sbuytp5y6791dasrbsce1mxvwi4flzqf5xj5yxrvpaud7vnt65p2cwu8ycmyx8zeg51i4ktqa6gzvk1c7tpauep2owaikr0y7cphhasursnnxdvlu8lzkxh3vqjkqc1q3yoyg392pxde2pnrvr4yj',
                fileSchema: 'gudvgifltbkk3b4gtphxetqoplsnqkokxduye45z2hu3vd6s25ka0i6mocnhyb1qzycx23vcued9ht8zupouy4xb5bf0cley0beq3ktrifog6z532vkd9gr2lpajn1hb34bicwg9nez7mslnthxbee4qmryu9oa7xlhtoe0wnnk8j0kgw9f5mt1xo4ikm8srw0q9d9qdnj5ynbs55vqfs0o5ijpsqt4dydahvtc5x00qf79olerunwlcb4hy3j28dcqrg3357mcbj0bltvsvdtuwojccts8f6y8h16e0idm5esvppdqxu7yhom8gpz2z231scseewziih8e23d3qff5ikapioe18axn3un6yttz4x8upkr63dp45klcdsm3qp11l9vk3uccftx25gl9w1imn8gqwa22qn1229d36q3yhou0ygu3oby6dxuddjnpr1mfzwq8fviwrsnln83csgsr6czvsnt9fwt47xnkw25jdetw812s4jqdno9l26pgiikta61bai8j7wd5h7fpackabcvlhtjxr65qgm9qnwrpy43g9vnyk2j9ecrjopr26o2q7v0cpak0fdfl02yhh0fqo3l8x7rv6qr2jlnh550ua54v5mrjei0jdi8l1h9zzqo1ggn1o24h2muaa9blepsuyio74vgerqqif238isxy4bf7f4uqkpexawk6ydgn7zvt9vj6dre9ph6pk22dx5ssp06fgso1hmezo7cjfnar9nvdndzus4lzc3zlo4kwux6fq56khban7x87pggr11ooxdwhuilnwck29kzt8qrfabbaceqjgjplekt23qcih9804jxkt3mlcgi3lsszi7ktckurfve7o6t2wkh7lc6g1nedtsnsaawbt51x1nxr7fa103pvr7fm0joo0x7l955it7u1wz7q73k5s33ta3axf4upjoblpftthi7etdf6ak223kk4kd3grwqbq52wp2fp962hinx8zvl5tbzcdds4axm18fcnc9czff8rmple0',
                proxyHost: 'co87bhfqk1zqsdkininrhoeajpfncgxjjjk6a32nf0xeit7so3pbk7n5dr2z',
                proxyPort: 2168081792,
                destination: 'n4rfspkrmyw2m1uah2l8cip7h888b1fnw3f4bfcfjzaafktuwbs0v145gbyryfyh4run2ms3duwob4kjzaqpsm3m4pmtt8ammypr8mzgw89hm81jupkr01jeynnat72544kh0oydyawe0u7jlchrm63jp0xug3ur',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9q8c665640h59hpkp90qowm2qarfjmkmgey0cs0q4ghz9azlq65vajr9037cddcjkqplgoh3nh3vuumjx7y1s6drplcvkcgfniakk96iytsx6nrbur8e6ywp2ccc16dax6zalgtj0r1rurfozup60f5osrh8jybz',
                responsibleUserAccountName: 'klsd3mp55k8i4engmywn',
                lastChangeUserAccount: 'tvly7j1f84hp32a6gd72',
                lastChangedAt: '2020-08-03 06:57:34',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'k57u3nma55xo13sq56lps9gngboapg82n9l4rnrq',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '513ck1vsxazg9xi4dpbpsgmzzbc3dev3m4bgjienrb5h2kwzg5',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '355vo90if9t99x7xy2ti',
                party: 'etj4kig2ievo7hgxn2f743n02wd14ekrwp4twsru9acajmgdveoe2kevh7cnzn0up1i5phvh2od28fvu9ub85ysri0y3cu19h8c0i692k7jdbwzym5y1kx7suwaes2qowzxr3709gl8p1xrh44yo3m4eiu03nxjb',
                component: 'tbctjwl9k4jdpf9jeug0dnri3w6cg0f6k97i7deckk9i5lai3xdqhplcylrn0fqelbaa9sm0e2iohdrrap1pppkas9qcec75heol0769f2ubjng4m5kxcl1gqxzofwc88pj70cbi33rj288cfwa9ufnd20s79htd',
                
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'sfvauj4ubmq3z1rz5d57yi2z6pio7hq68lc8uoodzr7c45jorfpxlkhyr4cj1ot31aqiy5hz1h3qyl6llj9fira5yy78ytqobkmvxxsjmxwnzj313sdm41b1xos5ct0gbenwlxnnwhjdm3bq3u2po8dgvbjgach5',
                flowComponent: 'pugq0j85gkf8gn10ckydppbwbqp9z3unld143mag1m1ryxbtojo7vjpzi04dpshgpiwc1b0fmfhirix4dy6n866z0jpsbfn5man0q9rcwxerpbmn477m0egmvq6g0nvcm5zpdlofei6ty1hbo6dd8llv7nq8k5o6',
                flowInterfaceName: 'o73xgynz9zcxqbmas6tfva7v7l8e9thqmqqq5vosiskxrw6uqg2aq0pmto1fgkp9o71ii48f7f1vwofw9vrx9bya4ev4q2tob6u0vfzdshra0fet0r0hnyk2zd6aw0bc75mrgclj8cb0mouq21xosowv1nzpgogl',
                flowInterfaceNamespace: 'i5ywa9krtvtykhgbqkz1sd4f8qlu0k74h922ipwbkv73f2mjopm92uvixnmso3bpa9cuvi4ex0k04jhjgitjypudwl1cs5r0fkrfbspom04tz93xrpsa96zh6xhgp0kmjinmlv8ib6m22ipy2n0bjt1q5s4npf6u',
                version: 'r21t7z1iqvnjyxtin97i',
                adapterType: 'knt1f1unz2cv3k56b8zcy86ye93w4x9ana7djzy4z6407qr62jgfwfcxjuqa',
                direction: 'RECEIVER',
                transportProtocol: 'qsiy8coddbgpqn4dsq3q033gu33qkyqc447airxl83fl2cuckaa8k8wcl14m',
                messageProtocol: 'okepvjygcm3tdqrkmyeak5amge905wdqtpnm2robg9swcq74q5gdp59d0yiv',
                adapterEngineName: 'w341oc55ud4676jlax4nbln2ym3lzm3kfb8tdoqcfb3n6ww8x9g9z24ktqks03c2frywtwvlazfhfux2ymr1dcy31gxq7q6qzm4hdruvkbie0lh07n86zl77pd9zxr9fh657vekabwgjrra6ja31bxttrl990th7',
                url: 'uiwil180ci49kshhyedg6h9kya8st7kaehekri4827neys3n52eaycce2pjg9041rop9wgxytw2g25dpzias0ey556q08m72uvgvptzjzjoj6q44wycjmcjfr20akykrhcisfx42txnmzioe7n890y1t05vn5gevfj38p5uscdib1ehyzt05eskyytjlibrh6jlr33aal011ipd9ff0iiyc9tacy9ciojlrjo3nojyh41xh5z1ikqw1u2slvlmyjqk7a2pgfn5c78tpomdr1vu81clnr5acusqar8r5cqx7b9t8x9ehcxs0vu2jn8gqw',
                username: '4vj9u2n9udaifm1kohhfzrksvw68kipm1lkhtct0ekx3lbvofnk4zd2mc2on',
                remoteHost: 'bnxu7pgxo6mguwe8su98m0oo97943mxean7ls4j0t4taa0mvkrow107acjhuyaidld6j20ct50rnm7tryiyasuh7pocwa3k1oyzyzev11zluuhn84g884vi8lv04p3qqshyvgugrda7jkuogotmzgz1o4y7oqgtr',
                remotePort: 1360525355,
                directory: 'm0s2h90z36xqf7icd42td14kenlzgjxje4bnwp6mm93ysrmc03v3bo6z7mzxn9cy145ljhkz2ehmwv3qwvceq4rjs1tjhns3epev2uewtcos77phx9ff5icjfv2jg3fo9wxak3k2gz5gi6u6t0aowckdpwv8mrhfeuia6pptkevu93e55ndyaqw9nxph3roh87qvm61zqwqj1su2ubfbfvq11qgvabc01fgatkkz74h9cp0fr0dnbr1s16ds3spuqjkdbtuw93h0ra5vamyvgq99oa8u6syma6v238z7xwjuwlwsznllxmx8eromzccbm7fohnq1stmbkp7voh4j8kdtvutt9ctpgub4csnle57wax3mquckovq6z4nses4rirns1i4decuxqo0cq0kvmhyvrw9px7cr1ffufhe2fpv4g3dotmlvn1yubyxya246y47x712enrtgajjym41qpt25nfxxe5jxey5g2p6yev2arlsrsorsyhvzhln4u1bihxti3t7m6dg0hcab2v33mycddcel0hy5lafkucmrer1l50xslwhmbao45hjb4u5y5yg6hurxim4lqh48zu1hhbe6r16emufdk2qgwui1eli1e1qcuji6bsvlayftstlwmgem55cnq4wmiac6gt7bwtwftkukrlp2e972qd20zwqlaxhs24run05ijoodth7bfrej12sb6gi5hfob9b3wusls5igivduxnldka4wfqtg8vzzo43k8s3glk5w24tx78hpl5q1bfv172j3xs231w42phd6zopwv75pvmtp5gtxyx8dr0zch6ctshcq7rvvu7y559nm5abklbyemhlm41rj2mpdmlhan33w1ot8342mt4mujutx6k8v4piazpq9h1a2tkgspk2iwlga9d6rmzax9atywb409ron9jd0jg8avp8xbjixaa2fvll2bfuavz8ce8tfv7sl0zrm554zo7vccrf2if53yaqp6i6vi0ddo6qt6v2hc7gvj6wmjg6dq',
                fileSchema: 's2il1smsq2s6ziun04nnxh00r25tafo1mo7lgmnv18a5uz8tqsgny2nesryyktkcwk83mhx6yoreexab3mf3g1qbkb4ws2karu9sunfb0atrnk027y481a2nshvw4vpessij3y76u46u9vb771ovnxxa81srmq97da5gxlxeo8vm6tcn1xw3dj3z73gvhhyc12l16cs1ze5jfljwrhugprhdhzeso6p6dw4wa7yehtc116vm8v30bov94sbwxzr3sa53uz83lreqgm897pve4zi8tvvuturuocdtzhlk00wllw3bbflyudowl06mhihji7y3ea3b7v1s13mk6pj6qz3dee3bazaxw836i58dhhrtalvht0pa18hletgwbionhth6prgwsee4lt3ee6h191g5490xqc28e0w0ejb1svlljiz62kgysmwunw9yrtdh9fgvbpgi1s9u5m8jeuactxu7xidyntzl03e09rfe5yvsuxjmssy4farg1mxyblu7d8gm7li570twzgkhnxjofgxic9nvb5m43axok4r7ustrc5yfzwqfg8quonda5zfzeq9r0fypniny62t3uof8ji754htxzkp7o25zvg1gd47s1b1gyx0enf4eerzrdnaze18ev567svznuzsjf416dr1njy0e5uzhabbsqwx1meac5yy6a0tutjtp583bbbqxax6pc6om4a784ua6dndgxlmq0i5dibgijj6len6hybfbvf6h0uyiy5nkt12q9sxjctlpjd0sqmh39aqefdkp9azgqj8p4ds5cvf4erw94sj933vooihyrg5dtju1uqs1k5njhog8osbjt92s47t239zmwcw6uj6s0x22yaj961vvq8e856rvoce6x3q9zb0wyz2khwspjoj0nntvj34ujoljxt3tu2z44uwi0cu743tiny6gn5mjx82u1tjwhck53xsuqd4gljs1uv85mcmkcrkafejxugv7v3w5ltx4zel9ae3u7lnzq2jpizw3yhvz',
                proxyHost: 'ies4z6el62omp554ykq8lot6ylcczifuakqyfiqd82phlsz5ly2yor8piwlt',
                proxyPort: 6708180549,
                destination: 't761y9k7i9w2n3qrm78ho0go3fb8zj5iqmoot3f5az4vgu80gkx7zi3wvncl6n4tg3sajoilu2cm9nammc560rn6fw0ayozwuiuxge7y6vb6vz3ukork0gsm01iaxojf3ww7j4q192zx1x6t128ll5wa95a0r5oz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4rbga7ul2dl9rgqrqz3dmdlzrreq21y3twgxcoodywx59ikrrj3lc7e6twfzu2233hif7xy45fspvye6xpu56s6p3jiyhk2tyanjxfoercl2pe16biv6le5j6dxskxmc0vsyh3wt1zl2bww2fw019dk5kzulkb8g',
                responsibleUserAccountName: 'rr7fs8vzdp7o83zj9oc1',
                lastChangeUserAccount: '7yw72v3xtt8kdzco03bp',
                lastChangedAt: '2020-08-03 04:05:00',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'q5vmf49v58k1ao9rbstdp4qovjfvgs41ev5awzt4',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'hafkkvjg6zi70bqd4xdppd4u62b0rspup11g9ui3njg5g10jjl',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '6yy2tvd366y7sa697iuc',
                party: 'ye4fpenkm2r2vrvscomgq5pg6t915z75t5rpo66nf9o6i2vx3zd3ifmi81eg25rd2hkr0cqk24t5teh4b71o9ku2pnc73hps038txrdt2iqbx0fuhpkx8amer6zvcwn4ct50sd4cxb2707idhhfs9nkhrp9g1r1k',
                component: '3czxuor5rbrzlq72jsthgrqzm4y571j6i5679xdlh3wbzg69ub75py1909npwefdc5twj04769ql22wlf2pd5416zjc9kvze5a4dw6fgndbropv8buzjftjfig1exas159hw0oumjy8pawk6h1ttdsb1w66rhq7y',
                name: 'xizmw521wjt7zbwlp071uyslgqjqcqgtj4mx5bdlabjwbws1wi8rcdqa25qty1xta9idv10dbytrytqytvwgpin0g79wkd7whogf3doc5k3360mvr2hk0c8yf07jqxmnuwnpr8yxt6v7u2z9we0s1tx9hwz6nog3',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: null,
                flowComponent: '5z9mb6r782pj0hm6nqcy1g2trx8se8phjmhowisrr2mxds8zunn571xlhwt2sh9x5v9d6bhk4u0erjw0bs12chojy4mveiiwt8fqj574eztgvasdi5ed0pxivkou5intj966y6poxun16usoifspw9bjwt46irhd',
                flowInterfaceName: 'f5h1u8wwmf8om5pe8h41dzbojz6xv2ag99694xgcn0qp6x6pw7xlatsgz2q49v8mcw4p3tcme2sicjj69041qfsc5vnvwo0zcyfpptfb3v09xgj2bofxsgmznma5r41k95imk7ddaqt8m541m2ryvynj3e7cwtmb',
                flowInterfaceNamespace: 'kpksh6liym2lnmmvvznil0cr38jbfh41gurpmbw1rzo09p6qymst2kshqrvdjrjfr0rgfyq586kwxsaj0hcpld5sbrrfwph1o181ps1c97f770hvz6iou6l6lkf45xgqy4ar0lv5lems41aszl416vhmu5a1wm1t',
                version: 'qokc2ituqo19v1dv6eaw',
                adapterType: 'x7v1z1cxfdrcr2saa9w3c1lqugd6ubhhl5td935g1b65kufbdmrg97ocg42p',
                direction: 'SENDER',
                transportProtocol: '88zfqwjg4xa9fgnaxpb23ib9u369mh82mgbv83n5lekueeqbomyaz6op13cj',
                messageProtocol: 'r6dnnnj0bv5dsv18ww5n3k29nzkcbigk76d20pnu6bu76ts1mt76l19g09xe',
                adapterEngineName: '5v7yelwuwyftlcomfr2f31yiea7m1zutggmu1rzgtxrsp2panelwonzioj1c1zhljbs7y0mbva5ldosuwn627kamjjy6by3af5z97ce8vl8m570gi2n6pemcshyd6uikfxfinnxefcvi39bzf2s5imikinbmo2c4',
                url: 'p4qbcegjnm680ahisscr9ag2ll2mhpyng7dsz6kl0k6b5ywfcpyy3zlkppho4n2hn6mmhm49pi0w6z1h7da956md5ndyaymyll0mpbduf0zmjxjghwcqysjalift9oxmeeezlltxeuh58wlkq5hpytbiocs80ua9n0vsokejoaqtk55qyvay3pepcim5fm6fq9ahv15tbyfwgu5rlwm36wxnt4fmiwq03ofqd8mm8pjw006m7tap0zkymateswi84alr5ka5cqpdivl6o342kygoi5ktmzvjpzxx4ub1esehhwn6uziz0lba08gu80vq',
                username: 'sdle8s8potxkwq6r098wticq769bjeryvbarxp5dl27iruvf41t6ptstsim6',
                remoteHost: 'ysmwhp4jtdkpz2p0cssx6q5b8wa5x9rjdr2ayb6ez4zrp3p7eflfw65nwobla6fu6cxo476dmcstqwyof34iw00yrd4ij7of88wh3jasgr1lwpudpnwqlk4lf39b41h0r9t3w89l6gdrhsoz6m3pxd0nvifchbt8',
                remotePort: 5278344019,
                directory: 'n82ez3dr46wu8k7ju5i7qb9pz0ns98pyl23q84jy75qiy6s85h3op5vot8ip8towr41etxzzviv2o1mjy1ivzfdcwdoglz6jycm6iuwy4xpa1qyq2cta4xq5tjs9ihkhwnz236tbdxyrn2jtdaev67xu9m46tr60m8dt5cziji91d69xgzghv7ypmr6a0qd7nxdyt3ditz7dkewh8vxqxz8yub48uic5imq5eai5q9gwwnan7myezf6isdpy7qke4mzwzq18fuzmhcvu5dt91rpzjcerpmpdokhh1uwl7ofbjczyyng9vp2lqhr36qsazi962lelb49wgdwb0oz5u3hidmn990lstf6veo69hcrp9mpvnjktj19t892fgq9e3hdg5v1raunozzxmloypobuy337vpc3n8qdjwm32us3zipqm24tbhy2m19l7jiju59n1k3pq49law74dwe0gcfwj3y44kwp79wzxzkbf3pe5mcqfa813bhsd37a484e2d239t0tcg29hy7ve4jobiyffssb72mbu62quw6272r59w1zibie8c50uddt2w9jhxhzkxdvobr8sm7jd1a87t0wamjksh1pdjgxdekmu3iz4qxr6mw12r87w68yyvpeapnrzecdf3p9k5fx5xlp54jn9wuu42doijh8mo7m5xh8cs91artwz2te8mqa3bs4heq47iiknp43xjutf5b6mn3djjy1090ddiq4wxpjoxnassr35nxhpvlb5b29t0u9dljvbr4gvrtnxe25sdjbxjn1b7uqil89z7wm0o6r48yvi3vkqlbmbp1w6jpxy73ujjtpkbjmpyh7mf3tt9s8zialabj0j70rypbolcr26yf7d8fa3ltwv0u4d2dktghi4f88v1za0sxzq264r5rim4b135yj52dzhaps8eybey84htfni5hij6m5yf8qwfox8pp4mgog69k5js3oheib7w4lxre3bxjhug6h1f9bwq9i65na746d9v966bhtt7oqv',
                fileSchema: '0kgca3bxt07p9vbtxxlkax4rifv5e2kfa6k5vhwv4ifvb6464575iv76nw5gp4ehuov25t3nmmb4kpurq0qndp34tinnn866t7t00quvv4vx5tk05lig9dnee0gx2p4mrkjww86p7smz81e213p6xxedmsil9rz68k4m7o5seykjkyjbashnzcu8t3ap8rx507benzs7xbcjuoipj1j9jqpgc8vk27hn1a0ls4ytpakyoe0bfg2b5759dy79enqeq1cij5kztwelt226yefjg54jklbm99y7jubz5ixavcyi5rj45n6qfwqicr1eatf0tj9b07lafhwqyrimdami8z33hqrbv7033pddd9nokthw1qnw7uuv9c5uo0anbc7vsd89xpq0lpa69maswlwz7gaunz93s3m7xps5zqfzgnulyuq4rohocxcf7y89nk82pw24pj9ckpwghmvmfqr9fl5gxw1b32lbot9g21qcna0f58547oku2q1wmbnrh3tns3gsqba8v3p6i1of9ht90yy33ch25ave5dquf6r0ocrfdn37e70elfpwdn3hedvz975tszwhszx823or70h79bd9akhzqn37yapr87ke8his2u99ysjqvr9ar3ne0kkre5qwq6gi8zsdllc7m19265abu6xi59edyoda1eqpo61yi66egzaoqvz25o8q6vfp3re54xbl3hje6t22vew203smh3dgdmc88lejwvo4cfn788a01k1zkd4ammxiz1sa8h2xacln7jjqdf8s7uq8nrgbor6us1fnaqkhoh5kd76mqmerxm6kzr9io0sq3pg9m3l4zc2ne1vyswq4fdvos56mmg86xo51lmv19v42kpmnmg5el5bfncic2q63e1yugwayaochorsw07mvg9ig64xmo6r4imnyeuc0v0u6r0lntjub12evwxzl3ztqxqaq63vu3q5to26z5ulxxn976rmr8xgi7b7e4k8p459539ls0wjoc9l1w9gt1jt5s6so',
                proxyHost: 'e83phbidhcyjx7ltcntnsufzxulhr7y00uynz9fbmbj9yaer8p54865lc4rd',
                proxyPort: 3870907472,
                destination: '840d993ab4zwbq45gfwv6fjysl4i9aollprhmr14ilu9dgo2h34w2bdd5a9mxxrjlea8jblxb2hrjd8jwfu3v9h7nijd2hbs7k9gxwrghr5hlpnaqqvathhap0it77pmmwzmtn0uv3zvuyxy3z5mdegd4mt6oxrk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7f5ivtgfaohx58bjzkrg8vwhdyfbj5yvyzcy50bzv33yl42roz5qbxb0hiadwdveaysavd5r88fw4d2d51hvc0e4be66syg7geqxpm1euorr7apkwxd299ve69gsyupcc3fxfkd09i0jh8ojvyf49lg6kk3cv7hh',
                responsibleUserAccountName: 'tnxzr09x2fyckt85u8io',
                lastChangeUserAccount: '8cvk821ptknq4p8yfog6',
                lastChangedAt: '2020-08-03 12:12:09',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'tdrt4qwdb4u28814j4vbucy3avxphlpumk45b8eg',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '08r0imohqog8s7mu46ikk3irgb9vl1c01alura3xncexu8ofjs',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '7x8rnaayn7tokrnsxuid',
                party: 'bmzycxnv7j44fjsejdoyewnc49f6j7ky5etmnghg76k58hrmt7vu7v8ra2svuz1t59h3c408fky3cm81z8mmqo7uof623bcfw1w5qhe3kxgduxr20k86s2bw0eoq8b1262gnrg29oq33ewdepd9h3pnqzzthk5u5',
                component: 'q7366bspf856oirwpkwkpf67nwp31bmqsxo6b9arwnp5cc24ha4zjjnf7fmn4komw1cv0t9g75wt4g4x9xjcegka6d3jl20mbq2p74yplpqhoigg4zpf7xt79tde1y9hm6r7wavugfw9mfmaqpxdx6mkgk7vrn0h',
                name: 'sygj913slvj8uxwb9wfbqoj79hd0bh5919ociffd6wm0tld8e29xq9kkput4tbyr18vohiwtwsxk37xfq3r53cj8roxig1z2y0uzohnbravgcfgl9dk29zvb6renhrorm131sk7d2v7ln4sh1wkbgw73kam8ltf7',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                
                flowComponent: 'c7kmvyk051q7hkw32dze5cna6w8b83y81dcw5272ahh8ap3fhjb2fn0th5eytth3vfoj2d9rw6xtghb3arta1m85l93fypek70pharbr8xct1pt22oghnrwdjxz7qwzi4b3t5t2xb7ido9eyn4mwkls08fpr6960',
                flowInterfaceName: 'b9hdotqod6n6y0y7b0n3sizxt0108og1slgvzf68yuhkg2s6sxic982z31v5oxd86ryyt9ab3fs679siukmyja5dor26e6f5uq6u7pkjg8plvcvansyx0jzn3dqywa09nrimo200dfmh3tnmqcsq8tmxqti37o6b',
                flowInterfaceNamespace: 'wu1a4txvql8fox8y2atub57r8d7mysgl0cbhrf388vnykpnja6n1eyw9jrffye5ninoifmciin10lz4o4koyqydtmpxcq8ne1zttjia0361cevvtqs4ewqnu79mmscvbnelj0nryubajcz4p985ioagefco23fc6',
                version: 'w0kh21zckh0at1iuc9t8',
                adapterType: 'cbwpfshc87nbpx8wp2tqmjgufc0d02dr07pd8v8qfot9h8ia23hwaxx1s8y7',
                direction: 'RECEIVER',
                transportProtocol: 'qeq5njgw2cuzyiqbzgljfahrkztwiappwxxqnnk78r8u8mqw4sks4f78watg',
                messageProtocol: 'f7wnjlgayrwx6y9ns8q0w1fh4uew3n5bedno2dmgeamhn4aax3939d017ojw',
                adapterEngineName: 'po45951qzbj2hli6jg06elpd5w251ofmuiyoecozusn32qfaeksnpegq7v278acmh8wzxf9rlozfur5v55gcwon6vidkvaojzxy8ucg931aiw8e7tk8d8q5fz7v7rqxwiowp1ybjmj7uq81g3gpd19x7i4si2tv9',
                url: 'b7w5ikaskzt1iyb5ay5mlwdivff2aubs49xwbum0aqwomwuirw67f7hc1up9a6v9q75uvy764lh9pjktco67m8edvq23bnpka121iofs2vcsl4z04rrhc78i5a8r45hr529w0im0wf21xhz6xwuthn3m8xbd7u98n4s4wcd6fbnjlxgesp2kp6n1z3tyxm9e9ia9b9bn644rnstrtl2meuoak2j291av7hwxvgrlm4rxzrek5ynywv63alhaw6mad75wdgn6x8tudc6snwj7su6lwy17s2v8xzxolltmspy2k4092neb6i0fhy4tunkr',
                username: 'nv4f30a4ft3fqs78huumzhy9fh1oedoo0ct0yjye3cso2a0irpvqu1nt9w7v',
                remoteHost: 'xlds6evy4vr1d8myujd2oy513j4fa6anro25two35rdkr2c3mw4kgcqojedr7hdvn62nzi6mjmzi6ovx5t7l8ro18btmgpxuzsh30i2xqvm1h11ffd9b4x3ttcywh7ibl7yufpordzqtswjl4fqp1zbyv6jdwket',
                remotePort: 1731491354,
                directory: 'u2fzeyodm6jgpe3c9jzznx8fu1kxisgppaizw8reuzkn3x1pzvaj1wf3uorrrq3n8pr0c4vsymq8ntt307jtvm78za1tv48gogqll0g2bey7utx3rt5in4bjmhe1ag3z9wu2i58tawdfx2l0tv6afjhv1jgn8btps2f5r7dvhb8jcj4n4cavka6spytmrgx461fasscxeqiqnf1dz3ppe8jdg511f7ylvpkqxm0e3zcp5mc93rso4gl3pnjs68yeeu217l68wmxcwgpwxr07j5j3wbv68dpuiosk2o2r0fvb7q5bhp1cyjpf2l2syc8acojcdx3nifkm5a1athp26dzo6y2aotkhoca4vlx5tqcuopxuadbvf1f8xqe5yn823apq3t3sbvk4jo9ycxbf8p0fq8166250onjhfpg7vo9mvs11zojnydosv982n2hu5hhd89vo5wu2ja2e4flbd9tkbx2vqptbzydkd1vg1rmgvnm4ux2dn546ty9lvs8gtkt9m83gmvu7k39r4l7fev227nmt5q918yrbt5xb6yul9pm6yghh6wjejtfrtjqcw64auzal00fj8rr8qiqizm6m5s9ty0631d9xdoa86zykkrfv2opz71jo2g62kg63q7h22vd6iefe6q3l8tk33249nhkrs3v9an6zw1ec3v7yrmyd14zoh83pbmp64o0p6d6vzyhmidz30buky41yfaayiucn4wkfplu8dd2lmxh2txdf27e0566wqx0zr0uliyykh8w8v8nypqwdfo3h5y6kmoc1ee3ufdprhtknpaf22u69qztmj18phwg0643yogvgkhovoi074occ85hm1rmbmvm0j6adhomn6h7zd6iu0mg1dsort9cgdh97i99tzyzvgux6r1adyfpnib9ay9dorz5gcvg8oro5gy24xrr6pbrru4wgvkg8sw3ex5lfxtlebyzrqs0iqsyxr07jteef7stl7epf6vo426j9yrljvq17udtidaaq0rmbqmko',
                fileSchema: '8zzaaebusgn2v7gy4ke6h8cgdcd6ovhqhiqy4zkik06irkiunrp8vkpj6cuy3pxsoz1r4zuvho7fbntem3dkfabnavqvz82q9qw833lu7ccn972annwffjpz4t0uhm7wh6cuotk6n850pyie8ypb68ellwslz2heuipgey252ws7wuug5489qphrlwvaib8txntzy8x05jgathh5ffju1kpts9hsmek9ho9qpicfyjrrjk4oy295t2ym39hq2y5bsp1rumvv5175u2jqzilfsrqcn6z63mj1iz25uw9stosn5isgxs4ob4w250pnh660jph13y17ylira8mpzdpgohpyg5hn4331uoml196vq7csiwpruhbja2ow89gduia4l2c3w51nn69n2kxrxy1v6uj71utpyacsvqlp2eldstlx2ias1ghbyoog0etu6d5dxur8t8yxmkv66w52hqbanwq3ji06jq1j1yao74l1yqyy5hsw1mlhc0mxirugzl7elweds5rdzjpxvbq462uo5xe29373s8rvycmb1m9dqbqcb4wayol84e92les46phqoki4kiw6nenajhv5oqys5cq2addud9i23dfyi8e41b3g04y8u6vyhablt68xuxr3otwegk5za1hehky8eh814kt88n267869eaz7h1be3hjn8l767m1m5nwk5ccudcjdffme46kogtxd6crkrcq5iozqt160x107yn7zytulofxeosj3210jb72dri2sgd3wzt5uwhen7zpbp9okyvtpmkbzcaqhxknkeb5j403i9o26kkp0bipw7ruhm84qh3h4ma43b60yyihnrg5gqojhhl2hyzzsjs1n9sv8ikckoid9aftcg89v2p2e6snta9jhyytjdmlqqjqazghnod8icj6dvbnae6dbsjni7hcoploxx94363ur2iq1lebsd8udxh741jg700gywar18rz86a8lebcaz8yqz4y6ostpgvjlrfqqd0bk8rtyovgo73rl',
                proxyHost: 'y3v2ymapusemgvqfjdqi6kpxf9ez8r977qnnfz4prf3x95omy6t0y1l3d80x',
                proxyPort: 3084440023,
                destination: 'p467m484901xu54x78m105djgu8c8lcvhp6sbt3yz8ebu0nyhclw9wqnjoeuele00ovkstuj9sfb44rkw3fsbqndwcazqfpb1t9iq1limfqz471dplxij1d57wy3zo2709lbni7jhg9mza2b1ewobf0u4zjdjatx',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'c5celj2w0q9g35l8nys318obya7habszdu19qx1698ggivupo2oxopqpyehntn9f3wc08y0cosh7dcc05na4sak7znqyx3rhwk96yonubjfvyqfpfqiip72mvunbqwntldogg0vuy3uvp5qsin6sghy3o1t9cmmz',
                responsibleUserAccountName: '5t3v66cra0f3ksksh0h9',
                lastChangeUserAccount: '0t2ogs7gev98i34qzlu6',
                lastChangedAt: '2020-08-03 12:49:34',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'h3zg9kpj9tmla050xy23ybxd167ztmlhz6xfsh4y',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'damj4nebpjtabu9j6p0nmtsrnnkmouk00avk04jsf786sumnwb',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '1rhl2rh5kjz1el8kzraj',
                party: 'ip0ga9io98qzf6n5k450std3svy5f4e80o5jinj2nitj3us3thh569xnqwsoq0ioa09w54p4jsjzrx597bht28gxbuhh0onnlq7u9lppix8j371dxecmb6poowbdr7kd5tfrltm24u7meki0icys8abyrni2jccm',
                component: 'ricjlhafqoizdzvmdt0ah2ekyo6kapdi8w4zfk7n485z46z7m690a9tp7fdh11w691n1y4z5pj3gi5kh4wlrd2y28qtgh1zmhnt8hgc2f5b8xceu4k0bwaujazcelst2kl3f2t7urhqb1l480mj1toyb3d6xde26',
                name: 'badcw0oa9fgff1xygxx7qgahwlvsif8aqdhwbqtd2fux2dmf0gipyrocw5mglzuoi8ohwk43ytsj6yaa9bhjqijcbrx7400akvb11tiylnww2m0wmq388yh3ng1mbtje9kmy8qvdywra0vbz6u0s399dik3t5hvc',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'y538s1wh13d1hmf2ndsal7wfkmrviv1ikwsabzsyboncdabr6ga5t00v9aopxe4o6lscl1y1jremgprh2ok3ai2j4u720whr0y3rsjy5b0zxkhijhsndpgjkjbtlqovqtas8gooiq03valwgkwthx35d6zzoguhc',
                flowComponent: null,
                flowInterfaceName: 'q6831bd2c8z7eth60jyc8imj6p2ve30f3wgfley0hp32z2xvjiaxzl2jr0vg8e16dgfiywa74x6t6z75kumrryv1215eia7kczkossjkuzbvoxnufrt36k2qfai4m1kpqz6ev4ub78jpeskumk20ors0s87jp9si',
                flowInterfaceNamespace: 'wvlaxyox1wxdmt9z8sp1zsbalx58izven1652zwhvhbq1henvliuf6ibk1c3x6qq5aw1imruyy1t666erf5wnidepuvex00s2w4tot0pqhpg6wgtc62pvok5u48yrl9ncmwj2if5pfwys97vfez7gvm9lwx4mb9r',
                version: 'wzs4jlpqgz5c7bdq6qn0',
                adapterType: '2vz9xvrnycoh1l16icdwfy3umagox3kab9vyjzcmz633gwt3tpw041fbepna',
                direction: 'RECEIVER',
                transportProtocol: 'giuthl2s5czkgg97eifynrfazhxthfer72yt5n4uakbxbq989yqsggv4m8wn',
                messageProtocol: 'asrcb0yyu9gptk7btnn5gnfocyjf2bgvwbdb7677wtgyoty62wnauh537inr',
                adapterEngineName: 'hwmziu2lkcw9q4dr6n5glhj40gmepyvcmr73et331mkxt72v0yqotof164qf30lm064svdu4r9nk2s7pprkp6gs0uqameenu61559td22b8dkbmlnhn0olbqd7cl4m0ojvz7kl05fd8ddmx7y5g37crpaum9zce6',
                url: 's7ez5o540wysqbffeb1yiryhsuci74tpd7gc6nzdyrjkefscl6sfzp2buiu5h7ihcef8nfvsrq6u7kwn1hbfmkvt9iymb0fp6cxt9uzsja3q8aul0s3b91rf0zxvoy2bb9ytmaikv9cwdbk7bdznl2hg169zbzivnci661ep56pmo59gik55tukdjnx1eyg2d4jog0lg903hrcerezhf23mywatz66ebrf06r3rn8ktxsfvb2ryvch3jm8uk6c24skuantqr3n2jhdljujhmr3knmn2jpsrr7pp2wcfi8i92lo8wa5yniw4fljqs3xb1',
                username: 'stk24cou79459po47bk7so1sztrjzeznbh9r1zuxtxk7ohbrs6ue22vvo5s6',
                remoteHost: 'ssyavx3kuv92px786fhf07jf5q6dr65tslckgm74jfybpl5xx4cg5bguar53ec422oepruoa24f4p33r1zpaxkhcu3pr71xmr8fijtjt6554720xl4fu5dwzywozdfv4m7jjoxrkou0jrmfbab4ljbhlrd8kb8bz',
                remotePort: 3795534090,
                directory: 'icvaqr3pelacmhyto8rg5jo0xgmdmuavpwgkydyb7qi2zgftx90z8gonfvsnxqat747upm9qfcekmk9piux5ej8kvtr7aiqk6zruv0sx9qitq5tf1i84mxbmk76u489rgerz8g5ij7izpp3mwgb4e5uz5dvuvkepscwmubfyhck47jt0etsgfijyv7pgqihxn2f0e1cco6osrcoqxnqminv1tfgjkg4nirxe11thvhxy4zbz71azmf26a41wjvckmzkppk1cscyn7ly4i150f92n0f6gcm39aayqlpp9owhurq2hnybx1mseovxhyrp1gi1bhjd8oodcvkvryz68ixbme9vm3n6ajfsileb8xylo2wu8pcgz27nf3putttngrngzhjf5chywh6s36jqqmsbr1wcj6tnm59nrq0bh7x3rrfy8yxo8684rh983mhr9w4k3yj8mhuzb6knh43njnnctfgb2w9u1t2easoheecx2tf1utgrwpw5uiedl4w1hvvrzu36y3vy8o8uf1st6wyj03r1zfa5p7wgwzk16wd7efid6x67gntzz8huhd9iqrnd0f9r9pkus40ekw1ha6uh5zqabvli6kdhtmg4cxg1sdhrowbmh0vxhuokhjveuf0zkutqd8k0ubcys9r26qrdpp7utqze1kslv4i0ya6r5ts76sgji032f81pmfbdcu0qtzdac54gz3ffttyd4s0vm8g08g1uv95ghdr3qsepcyrm6up19lhg62uaaunheqptu8zpumh5r8c7cpnjlisvoanh0l7j8pgbf541erbormud161wymvobax790ishx17sv1h14q1y40u90z6oeu34j85l17evhjya7rkvrjn5e39xlr1f605y4vh54rnhw8urbrc5sbykthsqeq89qu5ffk08jooed1np85ppbozc683fmrdaqkpvfavqm7s0quh131cs6t5y2k1d43gotuiv4fbavl8c0rrptt5xmnku1m7zze209ji2bfazw33j',
                fileSchema: 'b2v6i0hn7r7ndij930z1wffxofxaz1f4ibhjdjxtq9dtl9x0ru67ig7wp0v7dqqiw62089nkwnh5j4vaq1exbq9v3w8jqgiyb7xs5awfwchyq0gf3rpkdi2qo7qnzjwwumd7ozhsqcwujzhjozzelb3gbhtge4pelzks71x10jag8kjcnkz8wymm9ksxa0eua4uhk5u53udbovtmjdto3hj3uj1yf0ouzozqf2xiycm40dolu7oqchzyhatde9k6fdgyg4rqaj8xfuqw0fijrzgvoyz8xb6g4yb2zmn2838tmal1l0uue7ma04howwrsxzqppskneix2921ro81cwtre8wy9lld976pnvupsv5svsdp10bknb8g8s7waux24wn06tp0296k85t3fh4d11tetqht2pyeou1mjw9kabahaaj070yrusfsmnb6iy5ukeicxuop42ozptqk9iocn6gskzvajulz9jzmuepi2djzkgpssd6nn6r8krvu4g4wehw52z1dc2xrb22m6a796slyq78g5sjs7bt8ohq29rhi8elbpi73b43codkfxei5dsjqd9rpobm6j74zuf85haysg3nipwo3v6o5akzmbxr3gobpbnzv43h2kkpzzq2k5lkcvkopbn8qn00pdj69ebetp9fogx3iq8e5nws0wxpj1o88avdncejoy385tna52we3cz0afe3dlpuxvnhks8o6lfdnd93xg059t1fw6q37tdfao5h9he02exm8zbfgyw5vjnyj2aey3gz0j62p9p1yc9rkvp4ty56dgb08hnz7cmtk39r87qdp0733hdfasmkvcp6xsgap4peibabda3obpc7nipsyl596ufjwyin8y8gdbpbs887f5a9s8s7a4izlpref6ohrr932j7l73ar56vjj3u4gzy9lzipbqnajuypadv3tw4c7tvllzhmc4dbcm6gxctypm1m4i6ixackvvo6no0eublvzhm0vgq54g7856yfhiopuld4wlfd8q',
                proxyHost: 'lnm7c87wbrghlo9a4usx4syaqnf4hsr66n98r2yvnzwyxvrssqjtocktksrj',
                proxyPort: 2372071202,
                destination: 'q0qjc7xz83q9n2r9foirq9snttdh5sgbdj6z6yqyvqnqzbd45tlrncejyizdgbvrly5axrnizwmcjut5nrpafmukgnk5vbc5id72xrgtkd3wya2woqfr0197pvt5rjbzqu0dhya90hsa4p48sv87rtbhyrnxk8to',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y47s121lhh45seojm8udv3zv45c254a1gu0dc96afuncwk4bs75ap581irq23akix4yecrcgra62v87x10w2n1v93mnx7xtlu51eg04ozhi9wgykefq8omhek1vy4v1x3vi3fpiaulj2gd7tpr0mjrhkyy8qdhkd',
                responsibleUserAccountName: '2rhjxxnauzdmssuaidrn',
                lastChangeUserAccount: 'pyuodrsbb6vh2cp368mf',
                lastChangedAt: '2020-08-03 06:28:44',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '1pj3a3737dnrik0bvhfo3nh0dttmcieny6apitzz',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '29jj1zg3zto8tiiagrmwytiq4tpqdufrsvoaprm394fwlicaqo',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'vatn1m624ovuein1bp9s',
                party: 'dtk3yr1vr45fzcxqpwsdif66dfkfiijbrdt89utpul64rwp39dpr3y8sqjcb4a5p8uyjluccapdsj36sur932q50pkbrxi4e3o8erfypg74za7ofu19de1v2tzfqp8ya27fe88wczy1sqtdyqogooi8erw6sjaal',
                component: '24bccid7j5ml612wvzr86zgg2cus4c1a0hvra17xr663d32jeftxd06fuv4f5u2fxowk8hw83hkl8i3jxaifnnugbbs17379q1xj1h8zmyw53gpvyp1i8tfnkj56hy2d1355a8btyg33fifgji8zc844s2n7cp76',
                name: 'tdfyrh7g9r8vxfy26t9htwfts1vse963o0joh6lsnnzqo8lflzyytt0qjvmlexdh51wx83dqaxv0785t02gdlq64dfcm1smzeghibajhvfq2bjmf6akc8djrn556n2ldrrrf449yt25msmgoqb4dqibfytmgcifv',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'ay310ix40z1i8q4t87p7cdzex8gds63kwyu5yniuyjul8vvfkzz9on5fkxw3j8xoofu3mteivmcsyk9gs7mz91tlviqm8zr892s2jpuyxjdmnckijy4pr0ojmyum11k60jzv94waag3hyrw3kksxla6pizv8auai',
                
                flowInterfaceName: '2xbg1o3kj0xa65p0ywlz4yw9qxo9g30ktmzafov06ryozumfv55d4atxtl4um5o6pqjb438ybm87bvtz6cs584wbxtwfmizmid1vl4swj6r4vhvn4hmk33gfdnavmsuwssehlhhh0hex40fuqm5zfnza4d0pfw7o',
                flowInterfaceNamespace: 'tj27v5qfew8647mtlkgvim1g207cjb9ky2ctydffa57vff9gupi1xlehnkvqaf8ltx4zxski1c596m40en5ed66vy6fz7y1lktpnj9o6x2xhxqomr596ywt44va69ti6qknxt7oiaczhi8y6alf1jllk8huef9y1',
                version: 'qo7087mrrbyg3mpy4xrs',
                adapterType: 'pwhxv84xqcq2uz0ybmwp400jy7bj7wqfuampt19ekn2iprjgsxyqyh1wvxoa',
                direction: 'RECEIVER',
                transportProtocol: 'nnpscjnkx7vdgk0wcgr33jsf2y7qhz3iekcjfglu9rpisa9rafmhpvnss0mf',
                messageProtocol: 'k8cunqpvwcd7iq3hzijtl5wjjgobtupi8s4qhl3uvwehecm7q1xobp4tytw9',
                adapterEngineName: '0bl4t86mcr4l36igujfyrd4ofa0wu9kev8yyb0xg44rz0vir9qwp6sggm6rcd3r9wkgcu5p9rqmbjddx351m9vagbha4yvofhuolavqfxmd98vrl9w6a7mefrh651ml2sd2059lvdtgaqzgudyda9nm5mmslmzxh',
                url: 'o5w2rxbk6psdya9gbaj7qjt6ijn75ycl97ztn3py5sdpo6wc2nuvaz593ikaa2bvnuisk65xib3mwq240aysmsspxzpi338qyhpz1so80gsm8fbna1uz7ck05fye3n3vchux8z1xgkjk6d482yvev6wbzcr17aswkj1qzqvncavgz2t6391n9cxr5413g8cm3x1oj2b411hamsf5pgr0m6gb7jq2n67ss3ljjbbvxuglaxo62gxt909ipslw2cfip3976x2kk1cwcx5sznyzpkfap7xqchpftnqdpekwlf51t5co0sxabzkm2d8rbipp',
                username: 'v6w0vh0fv93eutb5xqs0373ls28ig03mw4cw9wyq1rlench5tvnb9uc8ogfk',
                remoteHost: '29w3e385arzu2ro39o8taaxgp4vqs9qdcnpgqjhobwf9ljdo9swyx1upjgna9myedtsu6j89q2pad5pc703yflle5dualao4ppp1qempt324fyf80yl8fjjjloety8vxwe6acsazwuoias1y5cvlwmknncis9lpi',
                remotePort: 4910431011,
                directory: '8b15vezmg0ugoupswp3s86s9p6qsils1czqcf26cq8d7inspf9qj5tyv8dhlahlv9ysmmnc8umcm6qfujq6kzn1tl8j8db58zmz761kikij9anqtadfe0h3ym0dcduyndmr283rem4ngvfv73lv6sw0x73vo9ilr1gy9uympxdm32ljbvjmdohago24fbk91mcx4017vfh83hcptxe1glp052q0b0z5y551gcp24s991w41h5dy6c0715mdlvxykd23spsos74lw7kpp3k6nuc2c9go614d8tskjbn9vh31vel87dz90uedm0mpioddolfzym970s2a32z0jwaz699vwtp7mpbsknkccvvpc0ybga7nl7uyz1r5asojcs003pojck3764fn6f62oqht7zapyh2xld36oes0vkeetluxqiab9mq0frn0rlxkuzv1suypwwfowt4ugezccwlq0w73mhkf8t8vyszwe5rnrx7vlkrk32y8r0zw034xsk8oau8h45o9ebz3pq309wr3t5kftkxpljss5se4wcbsypt6qvx0f7ylnjdvnqr7dbmnoagpidejwqho5d8vof66kk2p2kt1gzdxdmvzbd32q46uama2pnkvebjm4yt6l8aivx566ylrzvkjzinua5efumspr3o3pnd6k5aapwuxmn9ndgd4uc0kajlwa8svqlsr401vkbfxdlwisj29cg7jokx2kgqwfldkbahzjrl1zuozjgat2urkyi2bjuz23lzlm26qbtc3mt29i5b418lexh9yelcmjapz56ogwbojcjn1htuvckd95i7sj0wwwn8zg3iv41l9a0ycq5qbaqkbsb9tk61yevfz77o49dvhyd8n5hdfkrs5n9kvnkl3f9iy0vmlh61xt2qr8wgqr6i89nsz4qpksfepq9lsixptzxub91ay35t66i38ibeu332t7kki5lbl8l57g1nc28hb2sltavcakf44i95inhgdyccs8lulseyartbgyxvqi2mme',
                fileSchema: 'su64q1cmn1r789gvii3z1a2jkzepbzb1lsb68wi7wf8ymrto1c3b0pksl7ym0stmvm7zgitn766xo0uwbumv0dqzishem08f4258tqfaeflgp0e5qhzor72f2n0qmc74sb67wg9ltgfinq8qdbdyikkwjmin7hzn7a5ne4rymuo2c4qzwim35elavcxs1bxtwnc0simck52hfycmy35qy77ppt2zwkrmlfhigc0r3xf9kvjk02z7q6eic534jqnskbrfq7oiyod8hcbl6k45dq47yiiaqffr3yy6ptrvtof9in9zr6ch5ir3sq6sdj2namsc1c75my23fzb3rriok7w1g6pnd4fkafz9wdiec438ee0937mqnumcw60rh89apopksiwetkdps416ys02xglr0t4dy1txuaegx4ad7x629dxbkp4ksr1het06sgtasttju83rw7vjl1lmsk7wrdgtfzfhhvg1fqajpz2v4flqykvze4j7xzczkvx56eorhsmccj9tncggay5a7w385s8sx78ywumerw9px0nlq2bddnof9wjmzecojxlljt9z8ydqsobl8s6p0r6rqh0uhz01vrldgboy8nv13d6somf5qk5v2uqfiwx9yoc8xp01b00qjis04qxrybjy8tk1glbyttiit7xxfz4tzp0pq839d1ocgexs1lp4f4nnpmrkgy3rdy1bio8lq2zou9gqywoohoaa5n0wauz5gwb9s7miwyo1j39uwqn691ikzvqs3h54x97q85yllrhh1se50fy2n0gkh7s41093co65nwmpqusjze3b7lltpffu0r8z5hbhi67xuk7g72ngzhm1jysg2698hzdi3kuo8ieyxsp4p6qpo251b6ki12aupxgv62cv6d29yyr3dk5jpl370iu4gja955t1s5v1u9m8v4smapkl20kgtq5szql55yckgsi5lgcz6unnrrfxrb80nywzki0ozyk31up02ptxoft0fbuuf8iq1f41tk5cxdg5',
                proxyHost: '1xj5jtngjknluhml8hgtvi2vbu0czyetb7e3m58ipmpfng8m5i0xzupug8y0',
                proxyPort: 7015299999,
                destination: 'roq4bbfm8whfluubj78rhnn2y1mvbnrt81olehm2b6cunjm013czijltywmfu196vrahyl92kjh3cpin0o3nxqhui6tvxh02x5pw87hvng5w34aeyi9bqud486cvnh01jj043xx3e30cje4327rwesljv3sv52wj',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dyyfc99aljhae0jue6dxzkg1nh7yaedjw32wnu2f3swpb87ot8glb5jpzxcgw3h1bpsp3sacyeanayuic09q02odn4rt8u7yg40whibjq3e1yspge9cpvd17ske6sqip49wkalptcjill0jrcmehbs3sf1d2ybtx',
                responsibleUserAccountName: '8ab4b288m1mas7uyxhla',
                lastChangeUserAccount: 'gsu22ffduudyvtchxu1b',
                lastChangedAt: '2020-08-03 18:21:09',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'qz2ba1l7u37b7hrr857e5sasccd9y3j6olxlr1tn',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'hx1inw1jcw67ayoydc1so2lzfnmbp6ovyr4kknm90uokvl04ze',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '91dwt69rha4j403p17ek',
                party: 'lhtvm2l8s2jqkggyxaf4duskxcdzgsh8fefo5wd0zidv284ksuiql9bvg5k5fkf03vtlmzri8cfweewbgl6cekg6k5ccntir4pgy8czxa4fmet8na6m0vlog6ohr03o6voowinf9k2mhfjjt3trit0etnju6pmsm',
                component: 'igb9pw5p28cfpudscp7l4o4iveufmqdjsrgebrofy8n6yj58wy2y9i2oriv39658aeiw1xilmhv3lv4i106xq0sg8q1i4rx41r4iripn2h0uhw0j0nzsmrappsk7ngwiwmsz9jyj6qfwwabxlnasu6ki5whmu9sf',
                name: 'ogo877y8fy9frk9d2pkts6x5oqzqmsygqo4rbtfnlcqc8uxcyiibd6c9x7pjvq3trc0d05t5yayb5eprsue4u9lebpdqmym6uqd9599va9d6e2cjchu3ykdw08s7q510xdbninuxlr7twdovtos87rk58dee4w47',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'g2733tbqi3a6xwg5ilp7t2tqtejjj3hioyvysuhek9kwlxgqeb49bxu4yrwphs32jmk3n0l05o0x603hv1z5hgibtu7gt2ly6pnfan09pqn0000btficy2hplr7r6bsxmop4squnitszw0xru67sglc4078trayx',
                flowComponent: 'o1atufk913kjf5gcbo1kuzbh77sf6kv4e9q2ql3jjx0ff3k6mhiks8cbsf7qmjf40rkm6mn3df2h2v78sr4k2tvxetq5fod3qucu4i6igs25cdnru86yx318g3od0g3cpnseipga8ebddpt4aqwus0pyhtav432y',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'ehyx2472294cxifq7qnvkfzrq188jw8jf33ldt48jc564fqvokbk4x4m2ut77x0p2bi1wpym07ddgjyo2mdbmk869vhquszz8djuaxed5p79fhp5jambl0lbnkyztijssykoz5nnmj4i5gwnk0grpem6gpbue6s7',
                version: 'xjrey6r3oatgfiy0mdyq',
                adapterType: '53vn6psrj6csy2ttcj2sxyh70g2sgtelnqwruyor5xe7t83i0j6z8k7z7ydt',
                direction: 'RECEIVER',
                transportProtocol: 'cexvqb04opaditmqaew466tpyava8lr8czsct5icp5mcygzcor8us8k0kimn',
                messageProtocol: '9vw7v4snhu3mb5n38og2o7vu8a8gw8i5ut9l4o50uolemyk3acmiaexruzbu',
                adapterEngineName: '8f8mzuvyzbd2tupehgo5jr846tktmjcy4d740l2kx5kbp2re2515qsp072206e188sytv6mjg9vjs9fewxe1zir73zizmk6tme21qfpcthuzamhyd3oc8wd8re8wdlchnrsb9qtbiurybx5d1vdmlpkle6c6vu0l',
                url: 'v2ku65byuwqacd5lhmlkzwsrz8qmnswwacp0qsbmgduw307bi6wfh8261d5wxoskbn3reva2ij7iacde4w8sm1b2wvpba1y4kp5o6k6zvmc3qvch4a6rzvdxnhd70n1pe8y0m0a5ivox3aov2ip7fk9ve71sn1r853idi6rtcqxrxgfve6s4698vaxvoxiydna18dxzu2b130e74l1ks1myb4rsblrud75ahfc3j44i7uvpx8n6h2urtpf6b9k2le50jvc2ysoytq389aqb7gdue7eq3i3vkhhp83rj6vjz98cu9iy5bb95jar0oa4f0',
                username: '6f0y7b6g5x8p8a3uudtha5f6kznw80jqvnwu6dzufsl8zab4brlj70arcpkm',
                remoteHost: 'w93nxmf5yb7x2r78dv2rkvwrq4af32hrhvqdjapx4a0jlln7p3tx587fo02vy6xwwbzzll84nogebo14tqismr92vdm8wo865oq70ltc4hjtt2p6ik95t0cglxcimilhbgidmhx6f13us53qge805jwso9nqcsaj',
                remotePort: 7899317654,
                directory: 'vir4yg5wo3cb1e1xacqfs5up3cmex93pmzn116j3iv3uemg9fl6ar6s9o22hzzbp1xyx39ahf0sc3661z499qe9i7e8d8a0kchmmpdwqbpl9yrawm5r9qu9cd1ot3aw5tugmq17j422y1fb3beeblq5rryowkchlgz7842c4e2g46d89p73400eoc91poru22y5wiul29nh2olre970j8efjxjgetxwcwenvjwvwlnrelqgur1yuqgb1uiceo6qrwywy01xivyinfng0k2h18r3jj595tkc9obnkfsb8qzej3jpw9s4jqogmp0ebd02wx9sn26fd3m4y79dor5v1hz8wut8a7y1qdndrr4us896d39jn2lab4d5hsiyu5mvwuj1lkfydx6ti86qmj8r2v4vmb2a7w6nc42hms5n4957qrq8wy40m96exr26jcqhajva7pp9yfrtr7a3685rkhvf3viv2aoz6073pezzguyaz2zig46izwjiqwbokm8gtats7mdohbdyt4kh1uik89z8fl1ffzwsltv72azds92ggbv65cjrs12euaotg4wu1yn0bx8wynarl19x3p1fc0zb4yt26836v83h2h7ukajsqey5v1uzly8bfbuzbyseqf8ja4qmmwj9i4gc4xpsrlshdeg323rznfuhgzw497iyur50ib7dqfzd5vhmx3t30mo6nlm03y1u9mijv3jk9qefpvdqf5gnfgla4og26g4a7b71icaslu18dkwvakzj79d3k1i8bilez37ec9lstyxw4j59uk676lfdulcubpn4bfew9sl64qrpwybz3ug3vjtc1pflyqz4z11x0u6uw0isedi6v365cpx8s6pichsdpsxmswvenz78nka17vc1z12rnt3bb1kalc26f6hvmjmvprmzy3nm90xj3q73ugowaonnpunnjohp7k9fcu7ndey5u74rva1le6bs3g6xr0osrrcvotax1z5flapj28kyj77btzbo9m41z02ew3ue0',
                fileSchema: 'rnhvm6l0f3enscjfp5gs60gnds0238ufjunz3wcizln01674vb3kt7msrnnt36ms0msy28bkkft2tggqhmzj0ucn5p3pn5t90shvjeh8njwrgu255yk8apjacywcytvn5qwbw18qzsadnjz2g8og6d06a9i1esq5izinilfjfig8bdk6n7jpi8jpky0fakzekii7fjrm32uckimvjonr6468umsflz7257gw8mqzrscniphsf23x5rdby4h4glqrnsnpe29tpkacfw011sldinx7ozop2dznot8j2wjz20gk28q9wql4ox6bwrncqv9zs99icphxq93lr032iu78pjlzb3hx9kze4s8fzuu7tvf1jqiu17c95q21aahpu4lmhbi7boarmozfasfp7wzhv8wk5l0t7lbp06p9uxqe1k7zo60zva50eubw5i5ehs3kr2vaupakoh946k0eiqh3voia47r6zl31l998qvd5mv459b11qc444l6jki4clvwf7rkf2jxap4gaceuhmy3929yfw2qsw8ajobp5em9eac1zrke3ecpesw293fh2fwcv28ymb0sj6g0gzho75qhtouztrqa78k6pm5vf1wck081zibw9xyiky58djo8rfrxt5dxls2lzm974fwalhxwy3lnlp5euucwvpmbwj4a9d4dymcpdyeix2wx2ofy8scdevk2sip43ue1zpx0osy2vkj9v73hudahur40d1j9ynfn8klaal2t4b7t03sfbb9dych231g6vmxet6xhgzz4l9pw4dpn9asqba0s71n344fhhev94wsno5vn29ubum7e670izpbyitk16rvfxbzs88sikqvmgcp99mrtluigoh6av6zhsmeix1pv1bdos50kvysfx7ufespw7cdchmw5ljui5qu1g2ka2uq7dzzlxc7cgzf3t212uy0x4a5d6tu5f6b7lwhp9flf43qrludcjuoqgb5fpi7aouk9ene7qe1rm6r6uczyaqqnhqqe0sf5c',
                proxyHost: 'vmixt40m8it03wihr6gz9qrbv1g981l3wksmyv8usd19vh9r77whpiry3tp1',
                proxyPort: 9781016999,
                destination: '41p8tcegkp038cm12mzekzazul5snigj1bxflaroqfdg75irffh03iqkwjt667zsa3wfzhpraij8m6kyx3exbg3zvfwdovx30xglkupzi6u7lmmypp63r7nhaocblh01vqv7toihuy18bsgm7i8ovw1t0r3svzmq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '55eu6o0e54vm27n0wy8zm13bphtpqj0m1uwtpm43rqw26s6zbevb00p0bdnmn8zx9zs7wskzdyrbknznsep6oa8nhoo052zjmjk2e2hdcslo8nite549mwrwjch9vphe5k3nje14aqlux8ciz9bch8qe2uk92mth',
                responsibleUserAccountName: 'q7ub3yrc7s5e4ihw9khg',
                lastChangeUserAccount: 'kh55d61pa9dg5vc0awxe',
                lastChangedAt: '2020-08-03 16:35:22',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'mpzqzbawdyjxkkh0bcmhhc45fyb82zyt6w0atpr4',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '4g9glbv1due9cpx00al5tgr8qjrbbwa8si10usr0h5l4zpg8fm',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '95ashmub353xn61u07kj',
                party: 'n7osqebv6cm98j4c3dnl5nvfgdszul0i7fmgyocw7lriww9m5zf8b54nd5b5jwlmzmav3wqk7tg6ctkovjobv8i0y8fsi26ja8bgnen1n7kdb50y3dgszz13ghhnsotna1h9ibv1ktgqha5b8f6gmihxx18bqpn5',
                component: '5lp82w7tojibjg10dzq6pz7gpawzeuvc0kv4n1xwzy9wuba7edtpy9a9lj174ls8eofi5tir632k8n5ogrrdtjgu3436ex4x1bktw16lqhdp4jcm0nmi85zl9hle8tzevnge29e2cy9pqyhxrnlc0ncfb1pcdqh6',
                name: 'tvic0z53ec8a85ata1tt56xyws16buolnlktlmda7g6y8n8t3aoz5fuqeyou7aw9ezrs54v0xlere2gq9xzkdux8idlak2rbps2zsjspg6nxttj1pviesdl1ij36k6dylu1fbhbpp752zt12fj9hl3n9pg2dxxcb',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'akf8n1jk9veqa1cwm2b4mpqenap7v6sa8bzrukqt0bshrx47w7ukonct1vxddul0vkltpdryo0u0y7rn89u506atp4wwxvfcsjp2ik8jpe4k2806n76qeadpbx6ha96nbzg3ryahry5tyudy51sh9x001peyhhkw',
                flowComponent: '87cwfd0z19w9y0xiodkg50srloszpevzmklxlwevap1pffodcbyyuj72sw2vs4k3cp7viyxeucjh15ymw7v8rlvnfzq0h3nzwoeckd0gxstbbjxf40i4mfgu9lid8vq8jxmt7aw3lfa8z4efud6ektba9xjrnefo',
                
                flowInterfaceNamespace: 'bodc2uw5aelkdfhas3405wgfmenjza0vevyhbhv45z4pdo7n0ok559tog7nfl8ise0zejcvqtx7r8ugmz3jmhj0yqtsxg1ug14kanbxs4ncy01pymy8c1jcj981i6e6sdvtav1m09bmyd7n0p16n4f9u9u6e8xtp',
                version: 'mc7you2dz8ygnuj73bto',
                adapterType: 'udq0fz071p8rq3rnvkl10butxchqcexrxza6bdlckr0x2r26ji82qj4cz650',
                direction: 'SENDER',
                transportProtocol: 's04v09yu78vlis1ehbcm0yhjvhf6a61794bvgw1bbx1smjx8ej7jlpv3jlxx',
                messageProtocol: 'd45obfhc3ymwlmo545nwe18p2itd49jhxp9vb5mpj5vi76tb7d8v92zrjhbu',
                adapterEngineName: 'aikpeckv691iro2xh5547xbht5tgxa2xh2vd9h3k02h4j9kdot10s2k9j7t0eru53efdg4k9gxiuvbfwol7141mrv1j6kpkoiyg3rwbtoppphnv520yqnltgqb99384q10db3rirqiwx52rj7zvdc3ymrji294k7',
                url: '9xv6au6dlmdu67zplmavqejuyawlpreh1crxhyhezcc79m72ct9zhclq8hgaxq4f4l126b5tsdf4kb6t1rhz6zhymopi8zx83ggqu81hofs6488s5urcnci5rudk99pxiycxxnmn95wcab7pwu7x5jnwlnh0wx7vjf7zqys9hjbje056ma72op048xiwdqajelc91d4bepl5r4tf9o8d8ogldnj527m9mled5iwgtubg0elqgt0b71i7p84acbffiff12i9qicyuc4b388z5923pu91dmdhqeaxladxe7escdliu3gvpim7l3et71zzb',
                username: 'faw1jlyyqdd3b92ugkw7qk55ozewhn77yt7m9isk7wihb0imp1g50uwepv74',
                remoteHost: 'opccnigphro370t0du4ae9tw1ek7vz4i0l9z770pmiwmbnedni8s6z16kvbmo6gopsdc9xe3bbabvibf1gfylc4cwx3frt7thi2fw72g0zmxi3m4icds8lu86lzaf7ud9dt2qx9wao1vp19zptae1qza5bqzy6it',
                remotePort: 5993208404,
                directory: '5316jkyzjb88qe7rwv5v52jjojcppohc3bcgpj6rh3z3siv9d2tf305cpgsfx47nnezhz7fgkkvpq7gcq26jec95zgdg9w7m9qcz2x3t9sgyddx1ywib5ggk4ewmo7af859amm7qxhaalh9wpq044qtxm6rmlwztglwvlfosvynti4gjykx62cx9klp02hka0kck0tqpx67ojkevmu53cazm42cy1tfcqf499jdn6w56idwwxr6zjx6kque7ic03xelzlgxqmz1cbl0ptkxiu9xocyp5d8blcmgeool89we7f2g61grdgkiwhs3kqocw9kf5bwhlhtqd8no0twj1m6sq2o93dn6fttt77kj1sz2af41y4mutx7obb0zp8q012nh4a68ghpmtquztdix5u5km23rpbe9mt2nha5x3dpz4zx5pv0xhz33t03a8cq1e1sjf01mjx2g2kairw48d4erafsa511b22wx5l8rz5pkol7ret3nqggyzwqwl50elv0jw3ejlldx0g2qr159uhjd0lhf711wy5sgk29lznnf4k9j9tcz1czcpn718p5v3jgpqw45nxbbh5vcmuu9w1joh9vk97z2yjn24klimja9tjbn6egxipzkwsr6skgu2wdbmfpku2xhf8q0tdah0daw6oop66bfmtv5sa44u28qfrxywyiuegs5kqt1vvv7abeae40rpgjvnmij500lsr9sfxgaumsjgmgabipu0oshbup8u5j8fgth1plofujbdi45uy9tk25v9cyvryyzjgjzjy7czqyxf4ilvufffhripcyegnrwrwa2tv8jdkayabwnzkr5xwtcdpgeum0crcl1e5ssacid6r09vwciwf6isgykwgew225tom2aqkgnftxccdxuct1sgysobhgnsb4ym91s620fdfidnttzd2vfwwl7ky5l45di5ylkuqpdc9l824bt760os8ndx4628qypojgzhoghox0cqmbk7q3gk5gws8hrlt9hecna51vv2',
                fileSchema: 'zztad26z8avjmu5v9m0tzgowwtobtevia4ijn9i1o9khf0dli8r3eh4cr0bx18k1sugie8jq9cxgmczsv9g2lpwg8pa2y1qz8b13hqlzqlh6q9bj40toxq6e44lw63tph4hniw4mou6ehyq7ngeqxt7i0h47fpdicvojexpyfntc6okndzp00khmx04jfcetmvy9ausgw01djvc3ifr9gf6f5ucvou1e0nt5qafq44blhl90dic6hjbkegljkcs6z6hyrg517e43vivcrnw8zcotruubnx2fzy1rhj49gpmxe0lzida2vre2kdmoj92pugrdlr2dag503d7cak3idegp85nsb0tvo0c8p9plcyv7o80ynq8697m5hmavc4dup52pfri993ewrx3i0f6bzepwf4bpgg4fl9ojyezwpvgoijdknex6wtutzeiomlvrjueuzo52w5a6b1ikez8mdky2p244kh4cye211ec6ap9wtv6u204avso018rkbwk2gvxjcprs98l7ynz1acdw30ep2bfgzvppexirt4nqm17in22r8mgequzhc5vbg7tm27ylzfxpkl58zjdswaab1sbxfopb357c7uhjfe3h2xgmo03aq002z97jfwd9q2n53a8gyb51amfva3hkqjzyqdat6ezxm8yhft989wqh9m5kninnc2clazp2yf7dbed1uxyas9q9lqg7d5kn0kyhnun9sgjni4z7e40lthrjoikvsd4laf7qz1quxzepjlg0njmz71qdavf4kad3td9tso0r8cic2r1lv8grscoqdm51f3l0ktjortu0t9gbh4fipsm91t2een9n3o6eyqwtrc8kxkqw0b3w58geb2xwn3sv6uvz6bkmy9dh9aahw1ny75vve5zrfioqlf1r2xum2y305dh4bk0is1thozugu82xytlhd9ahmlqn68xhkd3sn2re5wfy2d4hvrjzyh77ioaoe17nfo59oy3jt4lubmc8dnzbnhpyj7kcgpij3h9u',
                proxyHost: '6j4ma9i1o0w7wniwlpsf9k5rkwou1ld0vu8swafswhlb679651lyir0yice5',
                proxyPort: 2053892332,
                destination: '0xim40qhurm0pj0bkb1wk5j1o2me86502c5zig9kj9huu8tytnar0kgxm9qfmdxrgx7rkim035jyv5t4w9qeku2blqnw7tcxqbn9yneg5ws1dweqya8bomdx4hggs1mgjx9i1uza5o7xdq7m3tx6s5brujihue95',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'ze90f364epns25nl4s86b9t29prma1789hlet8ymnz8x5r16h04vzg2vhr3qbs94sje38j16e7scq03up3hgnxoj2x8m96k4ft87ijm1nkufufc9pta9xr3mqgq0sje4tb8knmnspc2or7k4zvhvmgsso0emed7x',
                responsibleUserAccountName: 'xhmq3itmi578e1dsyzgv',
                lastChangeUserAccount: '8ps5tnv6rokuqkn3ufoi',
                lastChangedAt: '2020-08-03 05:27:57',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '4sigagzjvvxf8e6qtkrrrb0wvdkzws0oluzhnor8',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'dlbgoxmhbhw2ah7fcbpr01immrebs5qec8ot3csqysrj5bdtp2',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '6a69dzn8tugdipoihuyu',
                party: 'p8wqluyejnu36qpg3g5lfpls0vi6yq96tlx1yrxhdfopfd4zo9vm9xe69xs3rgzzx6743zhr0w04cteeola677w77jgiuwb7nbltur61nzluge06i71qjwyxt69vd3aureg953v5c2ues3vo09fk6vzp6vytwgkz',
                component: 'l61189h1mfqwzfndgs5n52zk9c2004nth5rx1o8iohhlcrzlk80c58azoy9wmp3l0i832suiq6mlivcrlirvo6py3xzf1v56isf6ixxa6xfo2bx08wpf7ee8rnebxoccpt5iqmi1q61zatj9gky6wth10ed9qxll',
                name: 'ys1noss9z6lwqokwt3w1g06dbmezdjlms1tupgxhnjwjxakshd42v2suqwysbkf246igxsn47padplof28d9rv5ihzmub94f6i8oxuvvfqhh4xfebx32lv5zi8faprusl8nxq6h05il1vecf9ik1wgr3fwr4zbvt',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '1wzzhmsqq34h40hgpk6iwhqwd1r8ugd1m9qdl8hcvrx0a8phza2wzr1cq5nzwb0c75ztm6e8mp80md9h6m7a9x87iobw446vaqi3o7c184615vazhb6st3onc9iknoae8p9y4ova1j33z8t1zq8xzqmo4ct9a8l2',
                flowComponent: 'r45tvey9wehff458j7vl5ffeod5bsluomr4216izek6nkukyd85s94qjpnd7jnebr70cf4r6bm0dclp2d4a8l4vk0o4i71jwmrw0epjesnpevlaw91g51ttka9oztad2l0qcigb5j69ukiv2wms953rmz16tmchg',
                flowInterfaceName: 'srimmxugynyr79ui415v5iy9e03un441f5doz9k7x14jz3sfprb63j8l3tjfhq092oiumfzo8vs0ofqyya8ppf7rhfkxyg4qpivrsg4lx95xdgj4m7nhn0jnhalxeyuk4mzwqueza0smk9q9mgn1g3ry1uhfy3d0',
                flowInterfaceNamespace: null,
                version: '57v0qcwnbt0hyxe73gru',
                adapterType: 'axgzkfps2hwnvaj9zr0xqrv33n0o47v56gvkv98kcy0c195rvu4z5puzhy8w',
                direction: 'SENDER',
                transportProtocol: 'do1i2oehhg41hlu1rxzc8v7hthjcjiuvh0cwndp6xx2snnmxnhplzsvrra9h',
                messageProtocol: '6ux5zozl2ahqh15onqytq5v05d5a85kw4fe79zgsbnbopiw0ejnympn2v3ca',
                adapterEngineName: 'ndl0jk25jetbti1ywqywjzerf2o8pal09zhf1lsrqfbzav84cif5ma59y5p476f2m60h5ooei5kyituvbzdtycr29543krktubt6f745kj5rpunxe5ua2u6rfy8tmmwvwz0qnobdqnnlpnk5abpnjeib08imy8nc',
                url: 'qfxfv4cjaakeoeiyevsyenpe7evb1qf938xcq9ort2y2dxihuriyt0usaaojw710poskbg4rpetr8rw1bgznfl4y3rhg8xxzor8p6nrwf5nqr121abwguawsxuptmy8r7zsg94ldghbmrg6ic8679ilc7p0rlgricxsjfhv3zbs6vnoq3h95ulllgry5trx8z8yblgm2ivgbz7s3d4nw4qbjxlq1inkwlxizmj1asxqjp6acujqlhydiild493p9zcb30ffe9lzl4a6rg1b4spf9ubmxwsfr1vqtg85yjy3vzu9gq4ln5u2mzpar4o9n',
                username: '0stuwje67iuixppj4b8umbkncau7voll2lnc50wp9klbrvi86fi7b5dc71kz',
                remoteHost: 'lrmq6go5a8vzyb82g9d5hcz4adza8q4tvxqv3g9f46pqpw34aj9j49jkop3eso2tkb0g4kykabvcaweuj8qmm2cuy7qb6d7i6ez63sjl3e3zcjg9rzeqo9mtkb05nc1ql7pgdse5c3wlz23k10xr8ku668xcmled',
                remotePort: 4535613846,
                directory: 'gc20ls1u5oecqtalpp09hje5htig6vq0orj9yh1hpd70zmvn03uvs3zfhq9zvqm7ni0ephhdco027sms11cr0dtzkf3onrxby7l73wgjvutedzhrngi17x8mcr7v6eluc7699weh4vmqjjkq9tzpxxkv0wyre8ytc7aunl95w304aazdbu1ewefkyfgrmiu910ykuggbb9hhyzprg23qalbxo4pyrsfcqhmlk88fc1iq6f9r96fpogt0914finqpk7v0bindgi04u81ipsyyb7hjh9nwrokip1kpfoagol2eih5nmplm7eynjev0h3vzomv50djefdi8jiw94s15m2grfn3kk75636krkdgwfdaozk9dow18qtwc8i71zf24iwygwfwe8upn719nmyxz15sobgxxlzcdrbs6ug48efjwlvuvifwzcemv7jbsco5rsurruh6saaeewk4l3cq9h59hh5itozrxt34fil3mbix77dmta6kdtodfteqe1plnrtbk0vb9y0toc67dei0beq1ntelizw4lgnzro89ghdfr5frcywkdxq18jnpwlrewsuktneml0neg8yd9lxl9c8iu6r8c23y6y24ew64zevj61x0jdhyg6ouavndxl0wp0j6qgnvntfq8h73bxsdhddu6qt35mnzou4cespd19roqwnnhhpjja8fqw5a8d32btg9c8ordmbkm6opu8mpzoujfo43wdei6bd0yt5oj0lc742647sbmlea4rjnuvu53b9zt5h57il8lw4v597tu4rr44mcvdr9ujxxg24pm2qluwvs9nnw29ju655yfl3tkiq2x0lmg1j0l48jb8nsj8hcupc60bfsgjl1ekhfttyuflb4ptp50t08wz4je4ixk8i5pzp8wmd33qnewszdtmpg8ld60zetnrkcadbszujy5tc7kr22m8ws2c8ttp6lkaijc05ri4c1n36nmnxxmdmo5xrq8x45u9jm4rfago5df9lezgys7qs95e3riye8f',
                fileSchema: 'ubs0wzwidobm0bc6gsh1ye7mbarjhcj91cx8oglxdujn930hjtmjgy8hdg3wxjnhxckv3o4ajv6wj44iwhhkcd4khdhk3btaj02zihb5cfe1tejr9bn5wg4zyeyobcpjao6v04f8r6k3714h3lrvqm5ac1jovu0alhmgrta6p1xz79zcmpm8h49lj12d2lp4s2cxi3cwjozc1cs7qgk8gmf7nja3alf5jqkd7hd4ncp791fboduwdn76ovg4olrvvvylcbxlup7lkz4gwa0o0tjnddkjplx2pi8uk4qfoykc1sw8wxlw4xx7mclk0as9hs36p3mc7cdi73nc95katokcbesozgwuoaxm09vz9qp6y95z6sk5f9pv0zpnqudv0yve2ykpcramul4j6u4wqcqoz25r6pleky27hohgzid6if0a5312pxd9ow6j4japfbjlkc26x3higobazg4axns17qb92sv5v15d8id1io9zj0fse1mrks13tf97je6tslxz19vsa7ut843nq4o6u8uql5t2k785x0a91h2z9tvylumqu8hck376v6dcngzlgdjfgof6vk6tyfdbgs6h5pirhqa89vqq2vlyvmnmrdvlfkldlex7o4u5db8wm39jmvg480c8u2xdrjgq4b9ayyouopzzhckts9nq2i0qwhp5fr48kx14vr4cfix4pwfmo83yu7x5pzvpeoalmvhmlswh637zz1h42m14najkbpdcr7erchovmmulmq4ntrjqyb865gezhckod432r7p8flvozjm5e80es6j2y1jzs11n33jjuesi297k0tl7ggh4jz02xuddk0cgf7jlympnl26x9l7ewzvm8vmrqilhdkeztiazf12mpegqsb17zihgbbge4uw1rma5kaxq11hyb1tkqawczloxkld0hofhot8puu65r8a0uj8963vxk3o0cbn9fsj0j3yuz55v4tz9lw46gi2cm6saf6utr4c0b0mvkkwnxwz5s2zlxab2qhnf',
                proxyHost: 'oh5nw1vgowpzswxrts4325sbztdrvgdylmx92xoo8847bnyf34gwa10f4rat',
                proxyPort: 8231398978,
                destination: '1h4gcpc2llwk3vju5afetner211yylucvvxxyto5qftxpjmrfwpv4kvdk01h89dmyuxm6kecmme2nroyqri43oqq10w4e75mtecanpq2hypcssayopellgldf1hwkle5suh501gwscb8pj1b17twaeouxpmuw9qj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nc9ffrnkmwkcros94ugytcxzkknfh81dlg6e1zpfpnhuv2vl9s4rs5g7gbjf7pycl9a0n38x8n5mnzojjm6586o1puivkyi4qu0ng3freti7ca7zbw8b7dppye5f4gfdto5pm7cvzpyj38usjzo4iuft2lodna82',
                responsibleUserAccountName: 'mbz0on8vdmhf77upecbo',
                lastChangeUserAccount: 'qtwrk2k7tntp6ncioxxl',
                lastChangedAt: '2020-08-03 13:44:04',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'ysmg9mh6141u2h1k9w98aic09xarw36q0vugpz9a',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '44nxb4z8t3835og2f85tr0qasvijlsjhudg2u9z1979b7cqu1t',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'f54lmpjp09pev1u8osd0',
                party: '9hpfzx0q3i6ydgtl273fl7qdeam623yq0niox70c9i52gb25c40e4dkuikwjmdca8r7yzjoi04nna4s7h6sg7iao3apspoi3bhxu6uukj8pj32ha4giu2lx81i546d0p48hohl0am8b2605v47aqkxysazlc0aiz',
                component: 'al9ueem54ev18y0z37k4ay6ceri21famke08z0ls15o9al74rjgonmegio12nszu9ejmjmgvq07lhnm7aebhvjbym3qc43jkmky0bgjcn90krfqeagk1h067vaohmflqis2f7t1qco6kwd648t4p03s9diprrw2v',
                name: 'p4tq1bfat9use7ku0lazm28vaadh2uycn2zgd37ytkoqxk7sdy1ekwt663hgr33u89z6dsgnwx7bpk28my6athqtqntt5dacrzeyxeuun2qdt5a4z925ifko8qualeqvrg1prsl77vv6m0iibzscgvu1s7djqhnt',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'xtxx2dfvew6v2p32lltbx0pkc3l7pj9bqaz5osroyv7c1v5nds38xxdq5y29o3legt7aqc0ai591nb1iuts83wt6vhefuujvs5om8gsnqfe89yb9t1v3gf71l80sl794oce29itqbo3nrgsmxozqzl87yi3xtrhb',
                flowComponent: 'myzie3d4jyu3f5shlx6szu02gguehjxaj1xy7htrfmubosfh290cooxvaa1hb41nv6frvts9uhhg51c2hp47j6il79wy443myiltpbjmv02ym8xpjj6amw0gvdqvcdusu1atmgrf83gqkfgtevwwic7zd441o6tr',
                flowInterfaceName: '742qa7tit1padv0mbbv7u7lv3os3z56io23saoe3e16dnb3z50m5piai1riu9uo11t04pll2ri3rmoced9xeahtkojewwfzhlav8rrn858d79bkhq7qq5bx21ws065cchxacm8l5t50hhxa7qi06uh3x7t1mufw4',
                
                version: 'qmr6w5sq9fmzem21hgpq',
                adapterType: 'c5nhfvzo67h29an21c28pe7o9a3zhpr49mscw1j9yzkxqhg8l84r699k52uk',
                direction: 'SENDER',
                transportProtocol: 'dqt47qvkgoq5v5qu6ez5a1r5mft23jcqxyqo49mdzlq903j4akimznf33ce4',
                messageProtocol: 'wi5ammarj39wwrh44xjltzfjmk9c8psruqs9jhfo5qm0e5mxff506x9qsm3r',
                adapterEngineName: 'sph9oabrve66tmbrbcm4zgcrtcbg1cc9c54276ymgxtb1jwtmpqgfg9g32qvt0z5msime7xgyk9mmqk4iuosw3lwv7i8qomlup04qerts6n7ewjmlyc47drk3iiawb5lys3tu0k6561x698welo94niubqoo90na',
                url: 'tc9q8ekfx0s078roopd24rkesyk91t7poyziruhjj0dqstveoh6f301yecphc4nlb2tq8krf0qpxw9p2l18bshrbklgsgeoh2hwtdhuv6csho89fiwl0f4c49qr34tz29z7vifcskpl4idq6cw3vqejn00q889msi6i0a9swwwchf1gx2lbydp751a3w1tm6uiw0useey1owzp8ef1ea0ii8t6oq60dqep6phaea7g1scryt0izunvt32oyi3vhkceigatbpkhj4aht9ukok54hinl8f5uqq6t4po409q2plhk4xmh3rmzh2t6m1be3z',
                username: '37l5o6ntioxldntytedax0gb8l573ykzge9atxwlvwzcwf98qb3jau4xm2fn',
                remoteHost: 'yc2ojmnfo03wn9iwi374ryxks0pbza17szttismobjskp4zmoi20ape04v0e0xdb0wwerdrjduz8s3k67b7rni85z92qyldudns4socg08ch1rkhku3hca4ly22bzd2l97x527v5cp9giueuhzfo6dz1qy0kg4jg',
                remotePort: 4199868273,
                directory: '26xlosfp6r9d9o118wue3r8a8n41zn6fk9rrrjk0k4fc3w7pg11t6h5jrawr3xo54pxrnsczykafxz2wjmzykk624lv0noe1oxguekg228onh5bq4pngwdp9sicyoj7fyog61epmqbsn8mfbi8bm4k0s9t87j3iihs1vcoe0minxsnh92tbk0c1p2s49c50m58xm47vchbsll2hx30tr85tn5cffi797wwilfpx9wramd7nj3ryu2jnqrfwah0pmfsgf81bk634dqswdm1pkym8xbjb8d3g27lxb3d41ymehr9tqw85zfrcpidvdqhmsxvivid24sx309106rglq40cbnlszt5z0m9svmhkzyvwnptjjdp77qz3of20os8ma5gly93dglq7pmuccyylo0io04a6o26ryis76conrsoc86cjvjlgjjxwed33adx1dzg0imzzxicdnyxmd0ah1kr48myc5tknl4e8m94x0l1ujouoeyrzr9cdvil8p3qqdywqdztwq6w2gigu9c3ofdln1k5ruo26obvo70cewq1nepu61oht983b28eww6m8r6otc9lo7iogaf5aqsz90f9rlenbjljwus9cnv0bp5egmv0lvveb2lxocfeegj6385zz7o66zixnja0gdr20l26lfvj0u3bbiv2f8xi3pwbf4kyk3wh7qcuxw8es9w4yyxy6fgv07mrcc3qgfkpzvru41uj1adctqlj35vqtsu7fuaehbg6uwlob6xpdoy08tsa5u6lslxts9gissw64848afspq7b0oxlsmtuaxa5tkr7e2gnlw5y8dvqtcvsey51dwziuikdoyjya03utniv2904rnhggt2aeuc7udgibz86qwv7cpwxdrwfg6jg5pmffpif0m8ulqho70sk1c1uer1aw4fdfx7kyn65uhekmldvr8lriejzght24xvwfcvkl3nuj4ycmmlno6ha4thtadfu0f3qxe5dpz0x2pwmpd8djqgser120bgsbb9hufr',
                fileSchema: 'u71c8c6y786zz9ie0x5huufkbo23qc6oae6x0x3xws1780hwgrh7hucxgvf7mhaqnafbc6oy9sri45noyjzx6xuk1vho1r5v9250j0nkfgc2fktfwe5qgs9gunc91tozr4t68zll4ew0l0i4kl766ruy86w660zycxspce7vmoyambm9v29g8l23mxxoe067mza1o5gtxb2dtw81q766kwzzbc1pke81ef6xqo0lu7yay5jatx2ldqdbcwvrysayq29r9uuml2uy0622171qt43uxaibgcb0ki9xhawtwwtkdxqwfc5hydcuo9exj6jhxd7fc70iaqf84r01lqui6wrxkll55pxlulfacb6hhb1miotu46vug9265dmfzi05gmlnb7exoj4r1z18dtzmi09pwjwzv0eo1w9nrmh54efryyksap038d4150my6zt021t5wvgswo7kvfgj5wxvj6en1yeh7i2nbhuo0sw603cbkfuvdlnx8f4a2loxu59rfwtb6ovshptfjni4kkavdmjye26g92nsbv43nbgj36arxb1rqhnvfdirvhgb0loq3chgw1mmo9l00iouf43m4xjrwdr8rwoml5c6rzr17sru4rwm4qzpngdwq7m1k62ilke5xginc4cha9jr7l3uzqfjophk3ld509wssn8erip811zmcipdyxafay93myskomipvxmy5vvzrrww4wunn80pxvpu3rjzyk8qtz44gwyof3j9xdhl1icpnebji22szmjo6kn85ts6tkhi7hku6iowbt4xpk608m5ascijy6nfg85sdnvx4rno4srnfc97lcdv2jw9lnjq0tckqnd4kxxda9gphj1miz5d73v47xwq5s999hryr5ir91wxacw6tlvxh16vaoca41mahb0pi7rfsy1yhlziwud0z6cs6coylulddl0satizplapukquxot37im2xrhf5nvp2oiqu3flgroe557tbv24i6rftmpisa7wr1vuqrgtz73qvu3w',
                proxyHost: 'e1s8cdy1fs3wj6z193e7d674ize0rkv6okuuvecicpiicstgu5c5hz0pgtko',
                proxyPort: 8631694411,
                destination: 'xhfmpmafk2manw1wuskzz0k7zh82xtbxfyyr8doc8cnr7werdwpkgaztcb1q5qarb6a83by8ct8icklpfmf4e8a91ivfid7tyklm0qtg81omw9kw56nyzy2g38gteodstfeub620gabqomg4412n34zwvkoctv5v',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'twf6ls9ah62iut80m990xkn4gzwtp874c0goe2zlv8jyolcymb1i6g8bdxbll3p0mosmmniskjm5iqnz92d8l068gknhpjf110aoye0928gni7xpvjsyjsurhzqu7vaxy47titq3jkmeqt64yq3nzfggill2kang',
                responsibleUserAccountName: '2klzy2bi3s72sc04ymii',
                lastChangeUserAccount: '15esp88j8kajp5lsiyox',
                lastChangedAt: '2020-08-03 12:50:38',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '3guga79kkl6okl4owwo98j7zf8oh1pbw5ic1c942',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'xhw2ue0ywbo966b03gdia68c7te7srsd7jn57aaz4rjm592uli',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'izg7z69lsrip7yopdni1',
                party: '997bfe75wxtzog22vu0yj8zfgynz67mfhi6tx7oqe3xw1ugkzpo1sbk6lr0l5xvqur2l8nir7ld16qolzlb0ewqt0kwp8bs1t5rb64hwgq4jcroz69dr8m7syzjbzhejrgtd5v05dlmzjc545jysj9p1i03cw4fy',
                component: 'glikc72r4uojf797eguumc48glxf1eb151latkkeimkit689dvlj2shyxo3xmjz30ddvn8m9sq0n2quv3txzt97nyr844udsspvkuh4ljnn9oyq3l3t6kvbaaf3rrb8fpbqndhfgvjrjcmodutk026mqd0279dhb',
                name: 'je957dxrzugmqbblrz2r6qm3avyulluwu2tspztu4jycay0xdsdewb635y3z37nunn86vkt9h0i567r2jldiq845epjeaaseqeqryjsrvqxmo67lp6tgcqw094uacpxrx3m8casjmxfni2cp6nhv0u45o3ajyc0l',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'rbet8n8uezxld03ic9rwe5apesric3pr6b7c2nl5ptfaulcnsv67sl0skejwrdr151ovr6u8wk0bmr6duu4y8zqpm56lt3u2xgviuirrsf0956xot3yripeud35ok42n97spi9pxiwogj6gdpv1hunwswmivo6ms',
                flowComponent: 'ebauz2xbgxyebx01nwx0sm9hjtxtg1lcbcrzvzmgp0sk6bt5goa6278ok1o5ynkf7m8esnof1iztdjnrbu8d84agb6ygwft3v145rwdjmxlt385oksst7gy4ztyj37dbizl0dni7o8jj85rl3dq0pqkbnrd2v9py',
                flowInterfaceName: 'cm7izw7jadwxcw7nif89ay8amj0ecz2cv2aij4m5wttqhkqkrf3yyhey0vcol879fd9nkrpzwq51ewvzov1yfdlxvjy5dba3z2mcgzyzq09cr86wfrwkllkkcr9u1srp569ib21kpari01gz1mg6jon7gvu5zqvg',
                flowInterfaceNamespace: 'cbgyaxy78prmzrw61gx2ayriyl7ouabapce1x6ji7qmyehzgdbh56styaqidxp37ujwvuc7tjd43ra0pw48m10tmumo0dx8ostfl3fjf8g26o5uzgauw7f37xfff92udck5ec4i21p034e3y239fvlr4qbdsi1ba',
                version: null,
                adapterType: 'j34b1hcxt79ahdk45b9150jpwr8raiudkzq6csg398vgxdly60w4urz5jy3z',
                direction: 'RECEIVER',
                transportProtocol: 'zhzlkaqzhmp59clle875neelghpomcq189h8zs7art7fpqzc7pwe274c8tzr',
                messageProtocol: '4lyw58rnyh1yw3c6qo62jm0r6ba69i0qjasrumc3sx74h8af2s1k9oza26ut',
                adapterEngineName: 'mu3kwa6rdyqo23l8m3mk35j5hhyfwt8udf6ku3bvqowmjtikl6g0vs40prh7ap4zoqnbwofuorlp7mhbeauv871o8p4d7mif14orzkn13kk3x62dmsi32w7saq0aumg9nxrcvu0s7ksszx615c4hp3ounn0dhshc',
                url: 's6jgoupf4vtq32day7u644q09rlb2i24s6xzuuoxjxg7cne0od4tx7hyildva5kdyf9qcqef1ueyof7ownwexwi3y6ne0f1dlcsiw0lyuaym81zxz57kcrgl78ygnsmqcgit0xv0zv8cmz343lol6wiok205rglp8utr93imc20q9o5egdowheg76wfusokkyhsdrc6wf60xwa7d55kpihopjobucdzsq9dpybw1x15qtp26mfwtp4xxxvthpk8vgk5zl6qc5il50os4k60903gm6nstd0c9efy5kojxt8tz29sckq1iho3n7m7sa5zi',
                username: '3atuvqp6fbo1ool1xzbnc99fqztfpyevgfq77fs8i7fuwzxqnlwp3vp8it6m',
                remoteHost: '7h2hmku6fzpftyqnha35v610g3bp45n4vp58nzb76p19fo3cjq18e4itc1qgmpvzva6ithyqz20gbo1869hnxhixn4szi3hnbq2diptflfrkvlfsgkfzh8jedj3fwxuwp7y0qpjqxhfak4oy6lr544fr55qr6obl',
                remotePort: 3078117979,
                directory: 'k79ho0b24kw8wa86a6npchm7sxy5tu0ljd0tifosbrxovqestb698jgtw6b5cfwti62nyzpo5az37uf2ofzwg7jq2y1ch52hjmsoc6hyh0c58j0lrgzemqicta2sflpjjed6plv25f5kew4d70k35j0d50cwsmjzgvw2aex6611hahfsit1qu7o9p94e32rjmch5ysxt63mn9ur2dmd9f4u3bhmajmss8cw514f3muleazqphq0cumyubj65teht4iy9eynnboh48049dw9q3ydp7zl01ubayz5lsj2joa4jalso0l3rp0q21ykp6r0x4qxal7t29h9fn99sbzkpacdhxthcjfsa8a9o9f9bus0ozl4vnqe68vrqaxef9bl2bb53m4bmdbipc94gkm2moh1xsl8jt7fp0f55ly26jxq8naaxbuuvf077jrn5tf2x5ttsdxb2wf39jil1ebxdq9ef4qsxhb6s9jl4sg7ny837ncat6v9fs29cxp7ldkyip3ujgms2162c6cbhgq9fa44oovd3jvd7vdc1rni8alu7lvh81zcgxemfcftzehs8c8ybi5jj2kmejuhz0yc4bp9yj3bmb4fd5b9v2ezcql2726w3kbynjcnhkae5elw2zww5qriwdmpvy6ghddfmq4e4s2v4bnkh8ajp2b6wmtegngbbflojfkkpaf5cgug5cyfqdro5t2vb6eelbv66zmwuk320dbn59vw5mcw1e6x91tm9hf9bjpyv82fiajntmkknc9e7312t6tiuswi7um4hp0udp09pg716dnju93m9layuysesxy8f74zesnd0ih0lubbq6penm8gngiuwuiv7czxxztpgzj5gu14ow9uornadztxwth3swhh8956jh28j3siuxrbo38bgvhm6um58vnw9f43k8c114dvwunii116fybksb37lo1k87mxtn4ajktht9o24dyxsqt8wwffaqkau04cuudm4hle4omumwdtr7bgq1su27q3g4t2d',
                fileSchema: '6b5cdsj07m8y5ostcolh4obxer5r3g2qeta1z7rvm1hd1gwk59i9yv59mx1w17f6mhgo5bbw1pizz9jx6p7o5jilcdkn526sthj5lcg32b2wjxxb13jyujzk6r4g4uda96lv77xj3y1i2vx6wjdcq8nnau6884wmroz4refd4ngoh5mno2sos3nzw1qpn5oe05h286phra0fhkoqbkmh1kn1m1itc6l6q9ra8txuwlmfw9p5nt2z376xkaxuy39y2525rz5ud0efqp6o2g8w9jq13w878dlgd0igd4ejukje970ex33hvhzvrsvosfyzb3bh0pkk6drekv1vj9of7sdi253xp12dv853xz3u7onj815tjsodlcxnuyknu1tdm6ayavydcdsv082lcmdtp6yy6skbttu1ne7e8hnepwfe1auj7eip3dxqk50eycsfujlx0kjt1xh3rvdvshekibhijulitt76qxftwnct3hpzy7xsb927q5jhu4d3hheydzl81iwk74gqed3gvn0np1f5krmmdvhe1gpaoluotsg3zvzdu5ubxf6f4ln5fviyd2mt8yfdhsw21wstxqt5rg7poswkmtwgkx4fblsx2d3309e30xu7p6aascyfc9oq3xfsp9gh08yv05tr789j0dcys5cu70uwdcq91y0ileddxwk2mbn2gcw4xvthjgbjsi1774wu2u1weh5v4tufm9docy75vi0iegpmy3ao6gdm6shm6pmrgwsq9d33ch0twywi2jmquhwvk3jkkbxra7f3k44tn8igb3a2x51es0vrdcgl83j9l9vlc6j6x977nemtorj8ma9u7xshr92829stshlrda7gl7wtf5f95hnfsxghvk1bk6hhzsey9r9fedqg2ouqixoxavn65uws4dps5mw96nvs36nyjlav3v34f74ltdhjk956dvstcb9ea5gx89asudyfq8017szvpwwwkutd31poqm60uuc2p2in54oopk68451ii44botzi',
                proxyHost: 'dljgsklz86qizymh2uaehd2zhpha987zs5zbhnzyz02l1i96ixwcd7eqflh1',
                proxyPort: 6240106504,
                destination: 'mt0c2djd7vs3kxkqvv9mcn4huahk70bsy1w21d4iuoq69o2a0lrrif45v5dwk0wcah1wgadp9z33k7acozepmq025vl82rpyafqqcmu7j36ftwyxrsltjojzfa45qvze56s5k4y175jdv2m4jm37mv2ieim6z34x',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'inw4q48mvy3t6lipix1k7iltf7cljl70q2e1lfkx9y4hfjjudfn0e93msuc58o9l4nas9mg5wewer4a1qh6yiglv7as76f3jr9zfx6q608rtw8qtfqcj0i86ca7vwsfs7dto87qjsduzq72352thvvp5yiacuvzu',
                responsibleUserAccountName: 'kj5tomjrwyg4tnbk3isl',
                lastChangeUserAccount: '66bd3llk7nmaer6yekj3',
                lastChangedAt: '2020-08-03 12:58:47',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'vpw0h4p9f8wzihf6nqb8366la9sj4xxmqyy4yk9t',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'zjjgkyy7or3hnv5pc44go2vm2ucyrhdw3ztnage20m8b331mwj',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'tfb7hox5toyp54asux3s',
                party: 'bo0m8ypll4gt2i7wpoq1haoxn7u4cwwcgb0kgccykcifhqexclnu2kqsh9fvmtwfs6qyrppte5a5ftkd8vhl0zppymmwj7ea4x3jdledak6jkvp7dwxwtqqvokrljjhqgkzme70v8tslop5ctdimai6zi6x133tm',
                component: 'v30rve4q6mc68j8mc1g5l1u0ub2f7go2dpahirydzo3q7905ptw7ie6srdeul8t6ki77ba1b0v2y3iaz61fg6x5ztznm5u2tt9v8pzcllk0urhdtevcz67nrx2hbdhnjsmhk7rqysj0crc69qrdluwckhy73s8m8',
                name: '72xc2b6xjh9o21vmcmrcokjfmezeju14vdgsmdrw26uke0uyxq5d830xsge7afuhbbzekwjedy37tkivcrseuxardpr3l1fidf8z7kz8zlewokl1jk3jsiny994t6m90fnjt7qm7oaqy8be1hbjdjt5hehej1h2t',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'aw72sdedmziqn9zdjcjntq48zerkuq36jlubtfpftgikp19hjd8e7rwtsdwymgwvwk1bgqptf9hhe2iyyjoylesqc2vxol3rhpjsj46o5jyu58b7nvfby16mtn7d5r75ciao9u6fusjz33i8f50960fe2v18gk6y',
                flowComponent: '7offzz0mfcpk8p44ua5hx09u7hy0nb3ij3kcwnx0amwnqny8xoa4xbyk9ihxu3ipm8lfwwxvbrqvl5sdqnw6edgxpf8ni1lijs39mjz9v3c0b24wbeiisgl3alvu3wwr1kvtfpq7ozyznnb4lwhh3w9fcrffwj94',
                flowInterfaceName: 'p4tsw9yo0qz5ydgcd1pexhizz613fo1jwq8rgvvm3by11w8x1towb99d6fsoyh4nblrpeidust5xlvexyizxn20ue8fn01jw86w4f7w052btoluu528vfzwvdfrw8lq8ckiz9k0qx29zzr4soz5stoi16ga0kr7b',
                flowInterfaceNamespace: '53obvppvtv9gw5eqox34gba4puhuvr7gqyvwim73uce5d151pj6xdji0swzdw9ssx8cz3uhj6k4n04cgsv1v15p6ch8afhjvce2gaazq5zufj0nip12d4e321s0rqye1dq8ozozt9hznkbdpv03k4abw1ccbdzpr',
                
                adapterType: '9c78sd13i78adoqj296kxer5kx67acivvado8uiu9891rniapcvzgll07b3j',
                direction: 'RECEIVER',
                transportProtocol: 'i6iz795yjdxbb7zs1hfjv5p2gcs3uq14vng41cgs0cpk4m27h36nuctp6n0i',
                messageProtocol: '3uan16a1c9j30xw75rl2m3jrh83tu7d38128lyqc8iotn0j1e0wak5xp80dx',
                adapterEngineName: 'lfchi8xp0mc0pudcd8x2t0136n0fql40t2d1rejha3mvwb5jmoqho4g1srq9798ze9et1u0084ytslsccav14dw3458a4ncmdq1rnyvv9905azq0y35y42dht35mouw6pp4bkfu11jx1iv2mba7usl76u3nk38iw',
                url: 'rb65fduuj7gs2u2hxayaqk9kqyzp9jootsm5iljk69zj00f7ysuv9zbynwh7o94ms0lu6s2csx1i1d793rq9f92thad3l06mxckrm2pgg4op9j0fmzv9yowo9xicd1eso2lewy4l2o81s64y2x2h3sqvmwo6lq5kdxnzwzcq5gdbo2j4vm9swogabv7c2esgvxsuwz4hzybjjp8kwg0u9sj11n4rkdk8i7wjqadbddjh7l70rgt6x1jq4cfx3qelu3x3ljrm44fehqqacmakf6vr362vifplrin7jyd5olr8oo5bcn5hiazo8ldo4yby',
                username: 's64zhxlrq9p9icpfrij9j01rv9ianhq4mw26lz1ngiz36xomr2lfcwe2z2tf',
                remoteHost: '3argq2hr46tx9bmhkpozxjj8qsjgd0dopzneqwawg9cddocerr9e18anfag0vu77abxxrh2ivhs0c7inmikfepvjyi1uqs1807fid7aqx4lowcs85ceqaaiov06gvgtl25rwg0hfol9yg8m25rtr392zowcegpdz',
                remotePort: 2651146447,
                directory: '6pxd2eqztsf113gy6xsuo1ybgqs1xwaturb4dsysh75qqfh3n7i533lgg0q64m4tunz4s4mzb6tgci968oh54xnr837qhjjuof13zwsx05q13c9jch8moenyrr2w4pbu0vvswm598fql6bmr0zjx5344tt4vv8mjaab8txsf8jpo62msoep3icru72hw24kk6bamwns4vtz6hvu2p807f00lcmlhd0jeir00zxkc3vr9fnhm8x9eic7adi4vonq9guebzmnkzcu5o3ka0ewftixrxdmuq8dlg59za9sv0za0x6ao1glibhu2mn1ani6yqs3zko874c6pj2hjp5dw2dg709i2gvv0xgopvf5hxphm5ehredufcg1qr698rkcushky9h16nhk4kvbbh1k9jyrtcehyowfx7noz2xj8njeu7cugh1mz932vozu50uunbmf76qszr9jun6hxfgxsc8tut9rrmu327lphw4xdjsyiwir0pfpl1p85satw74a0sd04nizjptlxlu2yytr2wsju7lc41kth4dzi2y34vlkx3b18mepwz2tr85541ppphwlze4aorq1sughcrf5xtu5enkemygfx2gfppkclybvykyzvg1ydjvmuj0lv83ffxcb8giicjnknls7j8ep30sh21quev0o2m9pr4chfp3wlhb8iv55h40lwir1zzxyvggpd1pmqp3khajuicof8oq8wgnyd1jjoqna73zjvq4dcwt343z5wt5yn2k6rgohnzunu0nuq06npg86ir7fk4i9siki37ywis9772o24l15hr7yj2bga83du4zx37r2gu9798aso9oeyw46v611neucyytmun4uxkdetprj4usa3kx7wdu332kbfsh8cfqisor8iis2jyv03emm28ww0w5ue8ann0jydyubxnv150dqnoalu9frxpom4x6i213ufjj1kav34l8yg1127ttln0rjkps6oxj83apr9sn3anmsfdas8suhp4ymdiix3guud',
                fileSchema: 'thfnls162me59jwae6mn8atqdx9hfbwl6zy9hv0ov3bme433g6ks1ek5b5gzjkkokhgo51ka98pj206bg0c0ix9n4yzepuxiw16t7cal6jwe0d94mh819l5tl3xhaxtib4f7smgxg4yvrxf15ng1ys62sotzz79yf7abpottbenucny6z2gvtpj19n958429mtdnvrtlnrr031qc1i961rsses2ytxou59bmabgcmbugvt65q4v8h12yhvze28mc0hxglxfd4zse2w5afe9u13g035haor24ovje7u7idymwfpcqyf69a0nfejdbzk2vtf7bbzx95uftrd7wgtz1lzpbp5eqqdxtol5h0s606o384ojdxrz91mh1og07emep260emoo217foytz1krm4ld86meakh1rt7fvzjw37jwimfxhfcrsolo25wh6t7j1wkkgh0at9ocycjztg3jx4jo8jtrp4q17bqkj76g7gbf4zj3esa12jrdht3mkem544tm3dojbu5dr1y7pplosz1658maco23hn07brjoji675jp8w5icubv2psxyzrsqq457txk81j99zbyxzpavwri5jday0luq921o9v9o0t0ix3a61zueprd2pz82deewbh3m8635jyaet4txgxw73pdybe9ivdfikrlpe9oxaf9whdlqcc7rhisd83riedrskswpnwvd9z9bamzijju8xj8hg2t7st1y2sx6jvnlvx1zilp1423ovcnyvbun7qyvy83sa7gmbsnln2g2q1ia0gejfjnu2fesvj180qzmjtkz6wc3lwpyznriio05r4dopvo60ptkahfheufiakj57nzd3hk461bso9k2vih8ym5llk0wnuobsvrz3ff6pds2edx8fusihm56hkkz01mmi0ftmriraugu9arwzv41xyir4pr62vb9akaqqqkl6ut5kwc3n2eexjdgjsmq4w6z09ub00fve0s1nmps0lzgkprc0ct3w107t8giml62q71da4',
                proxyHost: 'obkqbr0m4ur7okmlrq29r79rvggrmnegihdia10uarp0ukm4vgd1iz7cqak1',
                proxyPort: 7380808039,
                destination: 'nzqr00xx7rm2idf6zjkub6gqp0cyzthhuzjz1ga8o0ixuon645z35r24600oa78no3brvkhk8iju236ssqba6lphqvf16stw798xan3guevgely8ctwoh7v5unlexeamf3bc63pc5i4xdmifm1nt6u2f2grd3vim',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tbbjsymulvqtfbr0rahyuqk3pxxbcxywnhj3p9nl4a988kx5mdswi8kv8v80lpwcd9lfi5pke0no8wj06ggkv48fojt6g6b6nwm24e3etcqwg2p6uri5qwp8noz4zjtocxizfqrmc7mmr4hcw4whgzfiqbkn7sc6',
                responsibleUserAccountName: '9bcb7dvks0ep6gqfe5eo',
                lastChangeUserAccount: 'd9quu5uspbyp340yunmj',
                lastChangedAt: '2020-08-03 06:05:23',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'qlkbxd0rtwhn2ojglx710d5v6967hh1iqg4mdg7l',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '88h9f0b0ik2vnoptoaxdcaywopzeeko22ke2bsa8mk5moplcg9',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'rrmpce0hj4v7a0if665i',
                party: 'cspxqpc1girh9rqt2frt4n8hjyr6b8dmnbw4ob5iawzcniszqylw8vqs49eua2labh98d5he1u4m45v6gii59il7tmq5hf4radwzdc3q1ci17sojqgpi7l68w88tx33gpbeh878faslvbw70zc0uqryzftzezncd',
                component: 'xtdg05x59vkl9hnp4lpyp43xpr2ogf5zk6h2lmq56qlovp8dfepbb4ixzwvt41j1h7qjm1sguv09fsiwwenpjxs0g9rygne3g7d7ggz3cbmqz3a2ku1gs3lc6tt96uheukxlsz4y8tdb7ni5ap1ljk4romnd8jtw',
                name: 'n92h9087elvmk5tsze6wzbmpew5jdh3yncgxrwtdr09emkvpjanp6wwv0oky1u7c3pefv75r03mvzufivpka5ewnyt6hjqf1eeuqq6rdtgtylhh2b55sc3hd0vr14g0xchondgoqtkv2hc5a4q3rxyuaeel61jtg',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'k931dn33hk5qfjgwm1rhn57eoftswioclu2jgm139awlzwh6ji457a34uwmbhwwnv26779n99jlnvhege27rglcvktkkblud6j1qiy40w87ru3fjjc0mex5k5qujhnj22cboql2e2stsso9mcfc1c8mywavx1l4k',
                flowComponent: '3sj4w5du6qlyb37k59af79fyievy60p9xgmnp9xa447kglrm8byglofp474ys2410cg05r31ns7qaqlpijmiwgs5ks99fahco12pqwua2himzy407ezvylr4uxz6drtm352kxofdr7dcqg80qf2n4ukymqez5svd',
                flowInterfaceName: 'mb80rvnz7la6gljnuo2cmurekm8avns6hyzn1fu343vesm1477tatlvcjuwl2xe7jc6w73bo318epi9ba3jyc8mkmeydyyz8q17qxltfa9q1wj8dlmgndmg3qqnaumjw8ikro3zek9p6n98ac7pu0mn1gk64w9y7',
                flowInterfaceNamespace: '9z760hu00pu56iwt0is4atlyzuszfq9ybizz0hqo9clpeu65e8vwpd10o1sovd022d7fdepebytuwt1nekv9upqi5i4gm19fu16rvw5z822b3p5qhp3zlcoj5c9bokughojys0hy568f11r7kohf8psqwqjshrat',
                version: 'h0yg67s6ub3oe8d6b8zn',
                adapterType: 'z2ecd5ywpfb8pp6oykhpoub5tj9hfacjdjky0i03j03nkg5anlx5z4utokki',
                direction: null,
                transportProtocol: 'hv7wvjliupd9fl0pjktkqh4nclu4lqp59mpsv4ytbrru0veyilwri6r4u1h7',
                messageProtocol: 'upfiwaymkhcqacyhj1jgplmezpfz87zrd3zwl7qjjduu1ihontxygkbuwujs',
                adapterEngineName: 'gnp0xj6d2d5gzcut7ddranduq3d1asr0aqzlemz0w9yzv5ka3pq23lalo8liafcghsq0p5j9rptq9najixww04n1gscqddb5chofgigerfapasjmiiudnta1ivp8wwnkkuvpzfs9eg0fs6kkk3faik3v1b8cvb10',
                url: '0aoq9iyg7kpfkz0gekujghtmwmch5hb8njs9lmozdohdobfhme76f9dnbwfjc8rwfw11kjbqgw7u5jtojo15k4f66nb3ot4cd33zln9eekztiajmmms0wo2qjulngrvmu40jbrkpl580z5z3rzn0lhfqyxi37ojlavtdl0yj3o9gd6cw2o3x8y2mqjafsem1kkgm6t19t2bwt0yzfvi1v13a7jeqem6vy20jmexz65ozbbfbpko492m9jmp2esv5yy7htef9fefhr4rzz8gue1i0ia2urplvbvh5l5v2uthp70mlyq6u9vhq1hqwjlvu',
                username: 'orn54ww7qwm6s1dy7avxyv29x90m1a8gcff2rdjm3sf8gcerufb62les2xdk',
                remoteHost: 't8ncltmojhni07mzgtaqf8owp234qp0plc1vdgb87l00amnpmu2u4o7x9eh2cyi2gstpe6gt70t2kzb5ktenr4kgdm41xzvb6hyvfgkeabyw6z0k4ut1uq7g3q1fsdz79y5khgqn68z4xb986do59t2pnoe31dgb',
                remotePort: 7843559377,
                directory: 'dw81n32ubrfi2gnqink1yznuy51aj3puj6c1lclj8v14ew9q1jmbt3di98s6yxlv2ewlbknkszqera2ywmgv7h3v260nv1utg06mycinry8n5jrm5wjw2ixnpbk5fzcoopm0wnsft11v2imsp7d0firte5c3wc1bguzr7u03kpwbn8sad6udofcdumm76q8lehk113knkl281x3v7almvrz7tspq75kkjly9ttmvj2iby20r54hy5uqlzdi7yxt7jmqosoafnplem5q3lmcxmei8dpuaj9gqmbwkx6k0g6coc21hgym8xcumymx44vla0rhej0h30u9dpobfvdshvru93gk2zmn8prim0x00rgz2bysftgq2e85abyvam941ozqkcaw2gp0ut17on0u7obv7kj33p61bqt1w6zjgwktvhtxwxdz6dni0vvqcha8a649iflvayq4lk4tqomn0zhjay3uwxq4fmm6x6y6bpylw4vqird2q59d19h1z8zlvpsf3wsat2zwjun274zn81mjvzqq128lfl37hvk92uf8i808jfafshdays0lzut18kf7o0k0tb5n68fjw63alb0y1q1frhgre63mphcrmrba7gphnljms9aoo2p2g5bs0x5cv044o8y8yd15dcx0xo56mhnmgiphpu0zu7ertrw4rfnl83y45phumaddgr6gabfovda2gjt2kuhzly63oek5lar6yfi4i3c69u6svts2lg8bg497wffbyjbvp0xc3ze2qlsldmjlpwcg9ai7r6sp5mwcv82btlgv8k4sil3rr4jwp3scqveilg4dg6cwawoiszld468cu5bh74w2u2btef2mf6d7oigv6uuoqnb2v41c05q40uv5bqqthkmro72n61xlze0hn96b38j9n1hlc4nh5k4qhb8ifvqgxcq2hxpqxyo2szkwue96y19oyg9i9nm7ycumpzahradrg469m9vb2q0jx7bowdl463heledykbs2ianh4c1ld9jz8',
                fileSchema: 'f9tk4mbyyofw7qcnb13jwe1vez3k6oks4z6gtdrw7wlxbeek7it4f6pgyiw3hibrs8jpw49w5gxplyf4c05rgg5iygw2cs7gw5b1w2fg02i9agzte73c86uz2pdbs9y5wnok5jeloabgrqdcbuy6fyy2p58sybgtwrga7jjw61ddvokbkzrl6aar9rxvft2kemq1ekjuim3lufhghqdbg75oyc25wa93007rzwulpz1s6zgfsvae9z5120iv4mzi4kozwh07lp803czbuv57myuakjwnndllrjhpuij0xf0te561837hlrrqsdvk7o8o7ifn65boj184ibc56ja3t1olz00ltwe8c9v0slthlga1satk8xned9e9zsrt2jektmk0vrvvuhadik8oqlwgeg89q9vz7ar9mthcsao4koas7w6q3mze6qet2fmnapgdqbl6jc8v744z4qak3w6t6nb5ve6vt3uzdlhfc3qi0q3o8pn77xq1dqkboda48l1ri6695b26xvwfxc2tkgts0poi2lkdm5da732crrso53a5qlh7glsoqh6k7xlcwqfef6dnnb7bdba1oskar0avfgrwr289b7l63ch1bfecc3eytwcs2770mol08rs8usog7wl183p6uz2mnt4vegeo24y3bouchf215gglqe4irz70fjrmwutkq3psie7nq4grtfjjrwnbip97b1z3u31g362xqa8yrdemoky9b8s2td9noyy7dfxexuqd0pr9ekrwra8nuwocb0hx5ggbcq5z883r50f0mdu0w30nli4gliw7lz80qay9zygutlmif8tg0hjxm536qxihvofli8no0z6ku2b26hm7ksq94gzebjuadnn6q2ngpd10t5yrd0p7appzrd4msc67fsevw68zu1m2qr0grp9xzu3oiavgjwh76djae8c1iovqtki0uktnfq7ycvbdamhxcj455wj9hl8yr9dje63dc4ady19ksinixzauxynarfg2qx4sthbw',
                proxyHost: 'gmvzf1kh4a9haktmoz8csuh2ndanjfrapwn1ch0ab2cqzyshhgqe1j6ayz1h',
                proxyPort: 2228891810,
                destination: '1m8semtp6ca7hw6q33jzsas6yvfccn938d88q90dh5eyudrikriqf1sakpdlq7r1dciaq44rwdio72lvc0hh9ybfw9i7clr6w6kpbpo8vtkudn0r8qrmas32mowb0i6awklyw7snebsr2mvw7hkzh9n5ax9e9zdk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'znl8m3319i0yqttihq82g0nagsqzfduabzwiw39is2w6dljenkitg7rlockarru9qh0d2yugtq1x262z74m1nuslnig90lgu29crtm0obj9zfg4jkfblek5grjvlleu3st26aqw6y5awr2q3x6qhgnc6zpinlzls',
                responsibleUserAccountName: 'hygrgh7qx4ccowh1nq6e',
                lastChangeUserAccount: 'va1hnwa8vxlwrda1azxk',
                lastChangedAt: '2020-08-03 17:42:53',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '58l2m9frhs08cwmshc22x4b1qbyg3yntojfa4iv5',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'tucf5udlzqt2peungz4kf35tcxdoq1c0pjxh64iae1wbbwgzwm',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'vwkklpaz4e275ahdbfxi',
                party: 'b2xsxq9jqigatvpfiw51w8145b1unkclmaf18o9x9u3bbf11pn9ie5i7vwn8u5hvuhu0gzhy83741mfmk1p0exjqeu3bckh34qby65j05uptsr9vmnbg2f58dh2k4ddu0c1f1muw3r2jy57j065ejpctuua7atn5',
                component: 'b87upj9lbgg15t13ruhcqfc0kgez3lo0acou0nzxtzhr84eighd6dtbpownuxf8dbb102o0u7aol8d3a0oyjwbb3nzvwr8fj83dl0qn8c5g671unrf53rt0kjkwy3oskt8xkhqp01i69lfhaoqhbpjkl6k92dpsn',
                name: '82u7odqgfaduu5bkmux25dgw3dnjug01945l4frhuf9hvb1r970z8565xll7pav50py09f0lohe8h58ylnrl6lrigaccmyoh2tcp5axru35h7uclde3s65cef26qgulewsv3h9ndntpfiyov1odailweib7498yo',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '4w6dfz5jkmlho7cxks0ws09v6ercho6qf8mobjmo6oy2pxfdv1t3opyprssx7o9e0bs5b7b1kes7grsofkkqow475pckxmzimrsn79sk61za4wx3nr785042bzudso0b7777bgjxh8ud6ug8jg1w81cwsoqiiibx',
                flowComponent: '7ycn0fhlunzw17hc7yacgbzz6byetnixjo7ifvo7cxbpv47gknwobx9zwf25h4uelm5xi19jj5afzomnij61rrvvg2rezzfg0sfvujiaq5q1dadqtqlh287gtxz9hdb36wngo4nnfa2zehdjyqmq543acem97ib2',
                flowInterfaceName: '7qn0axjthx7230h0obumxjylles0r0dxiqsrfcckdjbxiurec0jv2how9rt4qn56ivutlcmomrs78tfc78ejcyfy67mjtezlxw3lgfhujlrizn1jpdaslm5i70tfnq9e9nuxxio1snygokpkaf0axlla0yix4n3f',
                flowInterfaceNamespace: 'h0n3bvc29hzyubm2t463kgyxl7kkxz41g35kw0z5opuls9pte6fhe40lhefq4b4ayx8t4s9nnov4kz4x5wdda0zo4a9y1fe6uq5nl1br8yrrlhfpg4jgk7o7oo4aw80j1wk3lpx01b51058xe4vy2jym82a0g959',
                version: 'jb9lmmx0tinig8sxnxjm',
                adapterType: 'dw9e9i8mm72d60gcgyizu1d51pqmdujqzcxdkfkef1rrm7td8v4w4uzblwam',
                
                transportProtocol: 'ylpezayjgjxiu0ns5awtie1ia3fpdh0spbmeimeeune6sitxqlednno9kyyy',
                messageProtocol: 'ppxaj8rdmzmd7jjchige0jtqypso2br9pn4lsxtr1upwgxaxdaf4e276bz5e',
                adapterEngineName: 'b7zoy69zf5xfpy8spn0hs41c4kpx4b1xch9yzugkr7nmgwxrbr9mis59w4y7peie4ddsncph8iwil9wk3cjf6h0bu940mi7xlktxo0nqqrbi8mlxb39bzp7qszsl4uq1ti5c4us19hmlqujs7m79bpgt3p0gwv7v',
                url: 'rlzxrbfnud05qb258fghbs8396af9tvrkl5jf0ig9gcifyn2ygoap37lrk60ob7nkznfshclrpf8h6r807y6dwrf9ujuj7bj0cbm82br0sdvsxbom6jlj87ei817dwoimnis4cubjhn1nm6vmk1txlxm09x4u2fquapn6m07ivthmq5g9lahrril9orn1n80jmub2fcssw694ae76pnmiij8fqn9ppkzu0e544zxlqehw5rsvq7onlynoxp1we5f47mhsqyd3zfd5hwpcm7j55oajeazffux6joljd164twhedwx3r2vehsl8qnx2gzl',
                username: '55sdl6p2760rcm4u4j0ctvgazx4un12o2s4n728dwvxjnwl2fweasxlwfk7x',
                remoteHost: 'r6u31y1pk6u4r26hyx1muhlraqvcmkleld5u4wzcsftipk2wgohewafu7u4qlllz0v1kqrgknh6tb065tphxdjp81v3cc79709h5alwju2f56m2yebfvhcl6h60x9zjvyvb7g4umcq0yb70l08gwe665ypvt1c8f',
                remotePort: 4603937481,
                directory: 'cz8gmhkyayw5ty4co8li1q803se9xab2tzl465h4kud02hlud8fydd9h5ir4z4wi9n7dq26oyyw2vxkw6jom9p0vgt7k7ojmvzek57w7nn9me5djr684offgzkr0seetyyhuurhvzoncsfrxhe6sact82s4p377gy88a4yxcs9u09ez7b1mfsp2hhmeajion2q02wtza2dx36goo3u8fxpvs7ej8gy3j61j3dbswhxcsxirv79l5l3lbu4ifxbfpan9r0a3pmzn6rj0tlehstp9abv0ydepgxhwvyo0a8gitb6ic43s2rmrr4vi8dzq9ofvspzd3nzzrxx9euechb3jc1jusx2z58js1bej6z8pabil0ddemzp0crvjtc0zqu4ynsunpggkzn1zvcs18ha4b44xns9ja2vewqpsq678ugiyy7qorv3xgpg1l0krzzz3yqvrb2niuw9rt2cux13yo34e08ramjyeumydaqh700b5kuddp8jlmhn8eq7j1iqs2drq4fneb6e81tbwzv5wg5ucz9022izpdl4mj7yjad61qhv0husy4o2ekoxwl4a5ukdtqoyfj9rypojli827mi9bopvs9b4j9807mnfuwb5b1nhkbrndak8uqazfyqu67u99dz8kavib5pm664a3g1c9qi6m608614hkct24dojn9ra6wv9aos93wwrtpi192y01k8432kxi4ao5zlpegrg15tj7q5vlwg6zk5r4m86anceo3w3v6bghaa51x0c2et7itsl3e4fsdegkefopx3mr7l2nelt0dcn86cwb4ckd4uydtu28fm6lf4np95kbaelzkkloefgcfxkqcui6usrg0g5qqfk81i95uoazuhypyr0ulyhgism56e89298afqhor7yy820qxu8c14fkwlcpmm6fupu4t6q2yzo6nbdmxdixyogpsviu4jbehctfqiyh5mq0be6w7o2nhcbl0tu238c1tu8wur3rtomh26gls8psp6cmcwgqtm96l',
                fileSchema: 'wfkkm5c0cxjn3pj25ctw6g4qql7vphi4w9bvvvrftkqhyn5cqe6q3ye2xl61aoqwoi9om05w5mdkv4s2ub7id1qoonp89jmo6ag4df1mtck0hew7su38ezzccga2za2s7woguptstovh3k1odm1pwnlf53n5qwf1vk5mrl66iab6ig4zokej0n8b1hsuwwu3y74f6ix0g235clclyz9gbl866w1jimawna01v6ytkdvix34xh3qxndbx8ojfk59j0hm6kc8dx3k505bw27jm35ox8lcn4udibw46x68atqt070o4kkpabwjxqxz3vlqtb64yw6z8sbf165tckxh6zceigkbofco7xmgrt360g33wpfvonu5du8mgwetbkmqo5cxpsqk99cyi8i32rbvwixxzk3shjn3eza0170k03rh5qxnmh2unxklp4gl37ahht789bj8lqddmelu95u7xcell50w2d5qpwizxven48yop2td43fj7i48b88jq3g6cx6v71n4ddm8y7trcqif40r1xy76tpimixru1ofxbvp14etfcbxhxf4fjqfuykksisrtsqs1nwp67gsjolld81xd8cbnmtols0mcsuedj7vcsoqfn5kprv9hvsvuvjp3rvd9p15hq3pm76dl01714gkbohxexdguvjq3bjevb47fy6paju9hjt33ozyypd9g79xv2s95xd1brmbqtb2ukxzn7fz2n40g3q62ndi0rmy3oelriz25q3km3f3rdv9gqauni0t4s831289hdsqqndk5jiep311q6kwnth62r51uzgtw2dtgg59umhc3vx6u54u3ub72age91yo7crkxkreyoohwjaw5457zdmuowamtxnzgyx36kgc5v9jsfo01k1ep1xyepwgp99c2zn5klbezyd8jexfe85jgau8mltiog6cfxbu0aql7iab5is7dmauwg4hpn8o34srsvh6b4dx8lr6a23o28krsgmbkzjpqxtghvjesxs8d0q2whtuzk',
                proxyHost: '4wmiwjee6mj53qzixibegzpgk856nj4cymbrtuginruswcoxzouoxnf918tg',
                proxyPort: 9800555441,
                destination: 'zfzinrulusf7xnbpgzsri4folcr6ylpcaclet8e9e7b3veoqcmjivox2iad5gxyzcsv62a1zsg710rqgbpmroi9wzipjhbqzv8vs3z9slj83fxbk54z4t79s6ip5cb12lxjy8eopjzyt32n2iksnlzqlepvlkfqs',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ji834ed237orj711int6pe914m5igxc0s6kfh2g1lf14lok2e9k7kikgu4fsxhgtvj47chglimasgdoy5hzeeiz131gnfd4nsqm7y33j1i576vrdkw0rfyli4o2rob9donofwvsxbvszciuml2o0vvd1zzkkrdtb',
                responsibleUserAccountName: 'ozjt3z763kdboye3vsh8',
                lastChangeUserAccount: 'ihihe6yv4851a9a2xef2',
                lastChangedAt: '2020-08-03 07:08:08',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'p5ifujwe27aq9oiyooyka6f14gvw28wn9cix4xyt',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '490v9b0xzojq2mmtd57inl5fidh246ghgnuold7r9rpfidr3z7',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'liywznh2ok2w9eb6i8dh',
                party: 'm3x7hcar4jz189i4dp6kps7tvhforxk21cx8ayvn01yuf10kbwi0i7nwx9sbtp07cw8ytfjj249e2avmfqfi81g6pjnbbe3jmemhv8hi5gn25ztnawlb5ur0fdk0k4r8srax8vjho5gfzoy88lz0dnbjd8ntumsj',
                component: 'ng6vrp14p3q345slp537ypr5yj3vqe86kx0vyv1p33peutmpxw53to1vcmlcfbqox0g89vq6l7tsdtpylk7t2fdq4wifnc39p66s4runr8orpegrwwjwpg9vrzkgergupvw941me3orme6jynbxu03y01kyrb5i2',
                name: '4k05ja01as9dus7e9edujixpp4fkrvtle7pcv6oy9j68m5qg6yqcmm8gridyd15bx71m68kfiz0oatdiz0jvak73387yc2ctevca2kw0dkyf3fhlos1kq6duzmmisbagw6hn2e1cqmwkh7m2cxfcmzmvoosxurxq',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'f9ys1bkkbzlb0lcl4l6koh15d8p32q51l5aqzc1kfqb9zk679h3i1ho1zzy1cuyijd3qax4ju90ba419vs01k8ociovmt5xcndzudwq5kg3pk0gtjp5dwg0r0gzgvypg4rgo2ddhz39hgxbvu3w6ri2mny6yy0y6',
                flowComponent: '793hfha15nwr2tuhrirt8zr53rxqreocbgn57wtm7bpdlcoxi8fv6bng34z57i8palsb8znpva168egjics0bbkfhofavn9as19qhz6f6lylkh1rsoasyasgezcd3xqyzzz3tzb9cfz972v6qicvl9uad8hfgpo4',
                flowInterfaceName: 'nbmrpv6guopwz85b2ucmhpbdwphfpest6q11abr2jlz3egu9zzr9mq5tkxttp402s95alu3udilbo9niz02yuc089wicuis4k6caej306skfoirpjqe904jb8jwgtot1bqpdu4j73rw7vsqbd0burh5j49w2uoxr',
                flowInterfaceNamespace: 'o2sqbnveo5pz4v30p2zktkmnxjlsxflxf1w1mecxfpg9ygo3e2ejg6borgwesf3ixh1bi4t6p47lmp61bme80i8oihi3xffx758sujmdxqqefhj8p26r5qvudw7ajxzzu9zkjjrli3npm4f85vwcnba4rceukuxv',
                version: 'qr1g3rwh72owvxbqpzkq',
                adapterType: 'xlo8vhgobkzmjq4zv7teee78azqr72djr9ksvusuirppiiw4uy52i258xhea',
                direction: 'RECEIVER',
                transportProtocol: 'ncmbpn47dj6s62u6nmjgrp0jtc5knio6h8n6i2izv23eod0ntnq1lr4429g3',
                messageProtocol: 'rku4tqaa7k43w04cekaa3gomgu2e499rztzs5jly17lhqqqdl1g726f6ar00',
                adapterEngineName: '0s552tbkppm3nh7kcpxt2qxvotgzxp1mi7znfp7wqimfn32br54ev1pzhpmm4ets3tmi3al3fiimeto2raok3xxdivey1d48btkg9uhy6q6e0tzmwv1nnnr6i8h7xshl60xk321q4wfy6b8v3t02o9fj9s2ldnk6',
                url: 'snh8lg0bgnbm2alyewqj23lxjm5hjdhgvohk91wbybb6anybydikvuuno5fqfhir70r969wfltrxz0qg61xmtaqp6zw7ld98k9a0zwax3cg3yle90kqmpo0xneg2ssmixc9i6l2p8pbuah2pa1frjud1f2uz4kli6fzpemjjen1ut31b55qnrbo7hkmok1mo1kvd9lzoh0p817f0xsctzgfs6d8vgcrqisvjdvip73j8cgwf3148hx8zujqotlxu7ke49g2zfxhfewcx32voauan70ldnpl777z744gx4bnaf9urutks775029xwcnab',
                username: '9h2rvn65u5fpf4emui1y71fhem4g2cnwzrif662feaz3ypak8673ugr33v0o',
                remoteHost: 'wgsa88h0yhs7zr54ralpql43pd61jo37z6r8rjynte5iuj1hxr27y2mqisz1ti367ysgyp3gaz9r7wyrerjazi0ftn0mw9haexkii9omx2alb44gyj0xjvc6ijz2kfvu63xmutb0ng0hrerx3jixwxx4cdusqd8b',
                remotePort: 5426667934,
                directory: '766ogz9t8w6xrhpskxlemoo23bsxy565dd3uicc0atfgy5iw49llvw6oyjurga2fq0v0xv6nobex52x7jx14liri7jdh27yr6mc44l48q5j85ewb6rdxk4pfrl2rm5bthtiayqfgfq0li3c8nioutf6kvcgvww1iskrcujg785gwp72dwew88qn53t4b58jufa7ru7bh21kbq4p32n5y6lap45xwtdts1be6ga25xzy1n0a0jkkxstwclfvyg7lsemy5lb7fh05ddyvcmfel7satw2ip09ikskcrd3aix6qndh60fp7j5awfatowg5fhzcry3fhd0cfct5dhtjkqsdo4rm3lapjwt346lsn34ez0slapqe8htu6qto1mmjb2cal7fxleipj5zpyeaa2kyk9y36c1zbr9bpefgrbxsex6x2rmydu89vadrlmlc4rire4sgrykr5ndumfkiletntzrb4382iafjjmdrqi44rztbrmaiqsv2c1vgj18350fjqxdsv2m9lz9c5ar48kh8ha9fd5gc9ekgc2xwad1j9mnfzkjvnhyla0x6si3a3qnuc2yw612x6r00uey5czr3g68pnl5wb99hddnl4k5izylonnozqe9cvme14b7ox6h1tk1h2pan1xjneyxuik0a14oj8dzla146r1squ5js7qckh9nq6asu3d51aai55cdbuofp1uhnbkk1k20a1p4kmqmf5f73lfet7r4kvgcfm24xhymss3e6xp0e4i9nz3gl2ii5nwyi79gvgxcn5i5esub4j2lb0qicuu21ldqybgciz7gvxfz619r6ue6bu737lx3w03oqofqpm2q71ecuqdtdbmwowt4g8jr3dzt7rsditky3fd2sd6cnuthg23zujvaadifr32h4pv56s3yns5jql1lwarvvn18yqqq0wks5k9nt33x85rzgfg7no4bhry0iqa6ae7mxgd6xib7j9xw0pro88as7zf6r75hfqjrc1kb67qxqz1i8oavmmrq',
                fileSchema: '5bjxowxo83w5jilr4b13dha5mbgzulorzezzmry3g8ao9hldtl34pi6j7ffkqvhytdx7mu0dx5werg593tq3t3oxvzmyc9jfi5iza6rdd6j44vfx8qa8yclcfq0g4zt9r1i9v81tf7a6ubytojjswzxkclxx83bd9ukzts12mzku4y20c325ienvmxrzv3sa9av5wzmkwyivg51zirhsehpts86yliichmztqeez2t5wtgxrrlg098tw50vi458f7nyb65wvmgt07r0u20rhzx0ucqd1uuqg6n3q2ys1k3j7pd547d8uccxfvi0mq3mnza5cin40ygw9b4m2j0nj0942036ddkmap1ds4mp7bsfzn1ckyssap17xzm5pl6nrvad2t0eofro9zbaczig5286b58hlq7x441s3ax4ppxyd6a6go6xgsk4yeiomjv4ug5kqddqwkc2ca0vyvvxzarpj7zvgkl71uszwmzm4i7ph9rycu0mm1neu39z32ot1hv36lg0uz0cpm552nwe0yn9evnflwuwwpvt7l48cmll6tm5n7hgjm3j0hw9ot8t5rauw30qpw7sje79im0d08c4vpuj7opx2sgxrf1gm0y7gi2wi5t3cvxrvejh9j37i4u7th4bvf2jk4nlzuidxtjehe7z9oq7gsaeanfiur2qq762bnsf03vynseshjyrwvh1r03a4obo3zztjojwh5xhohi8b8nbx89yt76lj3463usq38hxuw74c5fgub7eokqybtsbz9oir3c0s9zi54t6hbbpzts0etyslm2rhscldr0b6rsnvhj25id4wsh8k0bcd90xqydbb9dqct7mts895ssqsax0bjub2g8wmyte7uxpeg0p08g67i874654jtw9poud12vnbal55tn9d5p26j8cdq25pf1hkjdx7s7sxuygrd43ttpk9sgb22g623nza7xy7hk975khbwawnqlcnqfi481k8jbuo17u2e5yde266053zuy7wv3cky11i',
                proxyHost: 'ynoj0ke49vr1507xk0vu2t7yqp6h0u23nrvfmjnldqy3p8bt0bl231mzpmsd',
                proxyPort: 8925975859,
                destination: '4gb1b4xjiyb8gc14j68jjm8qyjzxd0knplr5xavflt44mcfodic3lyoviy2p31sgd4o5tv2x6wg1na2xfcwr4axo6x6oake38db13sfnjonr2sitx8byg6h1o8f5yj4p2jmjl6rqmcstam2bm9wnssd77yglpxqi',
                adapterStatus: null,
                softwareComponentName: 'eo4ggtf3uv4mq46w4z6lzn7pnybj6tzwoghxs5o6esju0lrp5m5btsd80sy830xg00d8cqyzr6thtki5m0llouzf0dqv4ro142dbsdz1f8soc5nnp2weh81y7e8v3zaij00nmmoylg88kk060g2zg3le6scmy3bl',
                responsibleUserAccountName: 'uj1uv82jz97wzeo406w9',
                lastChangeUserAccount: 'e4tn8hn0yh7gdzpkimgi',
                lastChangedAt: '2020-08-03 12:49:51',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '6t4pvjfrev5jam25ogcqu54lo85gkbtmthesk7xl',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'vwqzsvaktef39rz9jfzfd25val8upjaz1ld5xk986q1rgmk9bb',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'o6usq6mwkh85cognsden',
                party: '2dv32o5wvzr6c235k8i9nkpum5d98ghbca1wvmn9ebp0fs1d8nd666weqiqmtnfj78tiedjx5kwua3f8m4a5qnd5tumjxf1i1ha34ndtbq5io9u0olu5h7909gys76ik6hdi9uk7l0mim0pj8akn2xkgca3j3d1t',
                component: 'u5nsd0nm6hxfy0mgof047tbb6lgai28dz3ms31bvsv73g9ruje2gr0ix75gw03nckwpixrvx3iy1w94zqi1n8lnz7qgfj5s34yrc0z8h3h6c42zjhk8pmkwz0kjqddmruc3fa1ea036r2ut7cy2xa10ndx1bjl9q',
                name: '4wticlas2eyjc0n5fnmynss67zv1h6wqanulpohmk22jybe05ybokffynkpxs5jmplzgdgr60gzu0mt03vk5hzxyo40ng33xjg7ubbhyi3ns2574r39jszmfh4i0kxvw37cznxzgumult8i9oj1cwhg9lrz0h52g',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'u4qaxid1joal789f6gxb4nt58zch1xbkpqwmnzav3b66mxtd4rz10ywbpypfc78cu2n5isw81xbgtfbhtnetse996fwvzpm7twnsr34kfl6w7cv37oyk5fhudx2gmz0y3mpvgbv06crbuivf9cnpbu12vzmkm8ge',
                flowComponent: 'j0e46jetv1vgtjx65xasmdsmvxaflcd34cq6a3asefiwtr4uol6u8j8x814fcpulep5qs38sx9oiz1ofrlfw1azbb66pkr967ilitqrcn0q447dmzkhvgec4bpswrb6jl5ee47c9mvd0ugrb4vu9re0aybn76dn0',
                flowInterfaceName: 'g7hlmmfy0w3uhpe8bfn4qvh3jn2mwk609los7hgekakwzwml6yv1pd4m70k2fgmiiicnrwkvvtrxl5ngyo9rdkp4tmbo0kfjqiupekvudxe36hmpuwjugdiirdzyiukpgpanz25hbubymzz6k80qo4vox97dg2fo',
                flowInterfaceNamespace: 'mp318u22hdik4txdvqsci6h25eavtg2r0wblw7nviunvb0uaun8jjr19k3tqdt82rik8f8heb70j7zawf3bsxbai0pvd1gkun68fp8v9lbugdo840kcqk3h6gd1t97bun6pbi14ytahphyfhm4fvx9fal4o30uze',
                version: '7zkgnsrz6hmzw1z6a9zb',
                adapterType: 'ax2o2t4hhxr7anh61yntqqn9l46pg483t4vmdg3xd5rhgn49j0kplzmngp3j',
                direction: 'RECEIVER',
                transportProtocol: 'zha7zy1hy2edfyyzytmr4na1kzcdql7ndfqqgwxvnceckvwj6alhhk2lmmz5',
                messageProtocol: '8qwp69yaji5ywa6g7cszzhnnjlivm6yiib2sbxjmpsg4dnek0euux3eo9abz',
                adapterEngineName: 'j3t10ukn51wswin5i8ibt2wxs1a99oe7onqsll376ey6oj1u2cpe9iev6gkgq8smbdm5wb744axgucwrhybfkqek4pqbfmtpwf9m3uvfyr6ru5c5kgix5d0dozk361lytr3cowvrfl70vvz4vw65tssvoylpu6v0',
                url: 'zfhkrhs6qss7xjypjuvyfwj0njb8pplv2dd8wy5qwzznj4lva18bi93lxvloxgu26jr3gkyzpgcs2nsu51do8hmu2b64wth0pa69obeh2oqso2br8mwlv023b7lndjszolnbimqqsm5lppdzaa55veczy6469t6o740chlcczbol449fndwjfhqj3h6ac6kzshrq4uvkdr32hc0sf3q6qvsw4vovwvsuqz0m8dt36ka4samz8sjfngq7gd2ggx76dhgg9snarnf48toq4i140u5gtqyfrsfic0qs8vr7o3a6v3opjlhzd52ahb99pzh8',
                username: 'u345xumozz9bmfen1kd1ls6kcya8ussntebahuvgxa6mdtgqh87yd266jgkw',
                remoteHost: 'gbnaocgkljfcw503hxho3s8kggc2jad3d4pve4pl321c29lynx8pi43kjlutkh5fh7dovnohs5h8ujfmwzh7i4fsvkbjs1h9ers7y0lgwo0ift4rmezx0f9qpy5untaeewd0dmgurswrflquyqrpnrdqgsn5xroh',
                remotePort: 2684876038,
                directory: 'cm257b0irkdtmpr1p1hs4zabfvbsrsc7xub79ltxdbamrxkbs30hkha6781rrwk0bsvab9lcym5tqjsrrdn6r8xhob6wkidhbz8i2fjjykhxbwcr5o96b6xvq4qu963rqgpj1e55cc2nn83uov4w2du2z9b0xjskaolbzl8u9m8wteon46p9hgfds4wrtndd2admu2ugtfs4qz5ru1izpn5tg3rtzgoncg38lg5bpe1bv7pbsrj0slnge81r3vzv16abw5uu4vnw2f1e4hzj63t963510t5dngz5cizu479umu0xqb02dlqkj5bc250n6vu92etwluflwb2tm9j1qhp36dgntabocgcn0yukwy0do6prjp1qmf7qo0f00cqaahd20r4tgf8z8ci9wth3tdwy9gl28nw6x002ote0mh58cm0h1t26supchllatpu44ppodjq08x5sqpcwxtly3rny84ol6prj37dq30h14g9u6ko5mi05yru8n1pkkrovz1izmi0tm237rmrpjxbozkacdm61lbk9qjg7zhgsgne13l07uwnezc294kfe4e0k3vwyn9ug9mzj2p7h1ievqch4avzmbpj41hkuyp6l41fqsj1ioejsobe19lhv0f6jkjn1f315q1sbosl672pu2dkkn9j115uziwqjpui79dns17nnrtje1v7uwp7mcpoh9qmqe9y30quohbvjgg4vj9bdf2zcjkedkwjscxvi89vkh9936blz3xfvutqx5b3cz39ut4onufm6v0ltoaa7au9gnkzma9v43ox7zzgdxbjv7xnurvciopa19chdd9qbjb8xlmc7xwe4jbtt0wd8vdzgab7xjqtwstzcfe8kgn1vwa3ciu5ljjthan9uugt18ge9khiv7r5exvikym8w2k6mfggjegpqx4c1u8jih5tf4ownvllr226zksj22qbkh1rdx1y9idscoui9wyszk641obvqyb7kxczof7rwqnqtxycpip650wp4iyqn18cg',
                fileSchema: 'suveiyq03swhjnvhdgy1ncofbsaouupxs5ftmvpyrag7tvun0cxp52m4900yme3cr9hpplcqb2esfypa8969u1uag4pkrdn7n9vlo3508rv613n376usroayc44ruz13c77zda6yid2asq52qvkr6b0f8xoo1e76v4ptsu8sccsta61gfr9e5vpvwnhjvvtdy1jqfrsoq0y72yba6k5hmfkw1sd56xai5k7je6odso88g835wqac6na65jdno5l709fsvrovn9rhqs2e0ocidb57o2bd95obt65gtkkkjykbmiucj0m2iaw2txqsogdgsqtbgzofqmnh5rej3x4sg12s6u3q4yle8evwqai9a1iftk1jt0na6uq1qi1rjmplf4rtqdjq8is6jzklx448axg9z2mpaa3sdi18v77k6lxy3uib9xmzv0xkbueql9wpibtbjnvlueff48pmthep2yq1z9576oxi74bgb3pdeslf515fv4x9fj76udb9pwumz4xj0rmd62hpek6cforteghmins6mt2l4urr2or38scbum00h4jxgo38o1bkqkunvv282hzvqs807f1s1mn54lzie2n4h00uvnel3c308yy77dsfu7t29vpjqb26mqz6pg05idd5i075c6ymup7eh73mg71pjpkjfe5e0igylty3rv9sc9k0erdhbu5izmswlazjnif889uo2aycnathlffto97fzf66tbcdxax9011ijwycug8r5wscfeil4kf8sr06c5pcaaz4dcttfc0uedi1brgfonm5kg6gedmfrqe2j4kavblnp9e0h7c8b4zkpim621i49w9nkqufm21k05vjz4m2pffxjloyl2713niyccpu84gl3nzw5x2dua8njxmb3727q4fqyunbpwpvl31retc6f51k44j2hws9j8ti9tx9ihfowquzgqks3uzc8rxgx09imqfolhzn1e7sa4kf6pwq9gysnb2oslothf4jxwcmlg73szssy4pbzfmk',
                proxyHost: 'nu5bzpcshcl8l2c1u7bhqnfdr2p7arp5wm64dz8t3u84pbd7an2dmwiq6zpd',
                proxyPort: 2036245555,
                destination: 'j3qmqmbqwsdqlze8ms2wgm3xdbj6gc4p7v0xjifcgdrnd9jsi6v3ezm9kn43uxispsc55ra5faa9enhid155poe2eq2xf5d7h3fw7nl52b2lo6h1pdl6o1pbmra9xchszkrel9hstpb0dkpva8qbf4hme3ijxs0u',
                
                softwareComponentName: '54atgh4olfrm8qpein35ue5chbhd0my92frq3hoqux8ypy9r9mvtkudfhqhzfb8fcvp35u2apvq6v6il4c4n1wh6x6zt2bbbl491iyllewt8z1arp6wstrtzivvefq5aci9wejatu0yubn6e0ngrqi6xbyxyam66',
                responsibleUserAccountName: 's75l6hltz7rsjdi2g6lx',
                lastChangeUserAccount: '8gmawputzipqyz39h3gv',
                lastChangedAt: '2020-08-03 18:09:43',
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
                id: 'g1qh0f5915ujj019nm9ylkbbsn7x84jb4hr50',
                hash: '4nbh7lhbgzlwv2dinbdxczquq5kn5ggzg4ew6b2y',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '968ymtw1vidjzbyqehvwh17olqxweu77vnq6aaxp6y943gxzp9',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'ai95ghd56l11zbd660q8',
                party: 'zxnc56zeagp8os4cx381n42h1vsvw3ox52vye42fyq5loiozibaj1kq4ti7vojbd1wws1q43mmg0lkfgrz0ard9xbu76uxj7fw23smybxbu6wms5dql7gel750b4o6lsb577o3wvspyoys7fand9s0e9uez5tswi',
                component: 'b2aww9e4i4zr2kqni79xp5upip6r13nci9177b4uczef4qj7yq8c3igh1da4w81396bpteugrg5afnclpnsjx55l2024xz50pydxfd14uq44ezg75gkptioy3dhkd6e6miemcc5pw3t0e2dvzbm1qjbrf6gmjchy',
                name: 'zv7ffxmcu5rltimxuag4zgpw7ipajfaijh6eg0fmmhpkop29e0iwbw6xkzuc9ghscxhu6hy6lcfpcpidxqaiw4t4iue8sy9ioowu6rqeihvreneuxnqyeruyo4k4lpx0d8d28r4ln7kuumfvkb0p86mes40p31fb',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'cyr53w93zgwysdgmezkqn8fm073jwi13c9uh6422i3z5qm5msl356hwzhfvh53u3ygp2msk1ud6cb4ayhiu4gqbnij66lcn57q8iuherlz0y91ruenjb7b2m9vc4k63ahdeirnod357g4smjese4igsl8a6vs9q9',
                flowComponent: 'cdgtc2v53upb5gzk3ayurpanmgr2h1hu781izw3tmjnigj41s42u7n2pgl92i8vjg5uyv0djj0e98l5xg4mlpcfe7vq4fg38xf3hx38j8stbgqp24d84c8f92qrhbm3woaytsz6yzhpqlshkgd5719ghabgvplm9',
                flowInterfaceName: 'z4zrk1r367dnq7f0tgvj8fehshtvunk41v23v64aps5ktq6xny6071rubfsv08257fun2otccx6iktgbch5ky6yutjw4sd5q5qo5ey9xdvqtiyfx9csgs5ed3nonrji317q9t5v0e7szqothsh24c6h6vk4fs02n',
                flowInterfaceNamespace: 's5h6zu05abo6xa6ahoq6bg456fxxucadnrxmhbev1dkf00yw0xhim6nx380t1s1gn6f0lzruzboidw5fujha6vhh2c9c6rd6ktz91nasvwno0qqbiy3sqla4h4zr0ghewen0m9u2lrmz5h3jborfdocxsttox9j6',
                version: '47hljalyxtvor3yj5uuz',
                adapterType: '1ib4gcfq0wwbsqcrii5hxwn3q16wfwnvgzj0n1mx8kmpwzzgsjx17up8qz36',
                direction: 'RECEIVER',
                transportProtocol: 'ukip1oyneqhbsvp6a5iiwrjk73no3fdvwjjeqet6ukojdyxzukmiuva0jto9',
                messageProtocol: 'g6fa5nh5c2nu1a2pjg8h2febenmgxdtsftzp8xp9gfpg8x5rxm8jrw71zmx5',
                adapterEngineName: 'swsfqvoq8tq72ec3tbcls4ome7xubg77zeei8lip6swper1r7mphi3a94e55mxpbiad9dsy7cjyg2x6rzxcmg1807hx6pl5d6r6lah07jkew25qtrzj22ek11clgvrdcusqitn9of1xjhntwnobt0tqxqaijv3tt',
                url: '7ebo3hhitcagaijm6qeblzg3pcl2qn6sqc7ncx0w197gsk0wo3j7cjp70qxpxmeppxjz772vi69lgzr26h17x7ri8aytt7nnovelxa054dzrwajz70htm0n1fpf5nc9yysyj8or7zpym55woz98t8cm1c7jiozuvdvr76nkob5alfk0c5t533gyyzrv9hnuuetdcfqosij9pb3um0qr233cvnfnbnp44uk1mekoa36cotfgnwgg19orccijaayszklamg22t1i3tvi9gjtuo4vdk5c0sq2znppx33krja7uobwv98awyainju572291g',
                username: 'qnu6k65kch8kgp8d0k061rhmlhghyjyhso9j25mnp39qppk8ukv5i0ycji14',
                remoteHost: 'w8nr1nmch8ml4hn5bgmfbjcw5vejghhv769id59rfcs6jr89vuylon5a8fzq5194r9a2fyebnv2m1njl25rsu6kh94enm8shgpiw335gvr1i1up8parc4jls4z2dlupv3sysl579i4tqt7ouxwl3fn42g09g0mz8',
                remotePort: 4764897951,
                directory: '5t029i5gyag8hwgalgyo1n78qnggl6m0iy0airiwiwnf16l1gtwt22yhvbkjjz2zxqof2vzph818rbefyw27kob7hjxcaxqusmjdgt4gzg7sp7c2uh1yyk00hucgb45qm1gb7svy2orbch57yp7ubiuj3uk8xirw0lr7oy232c6262he7ft4kgyqagadoxlbtrqgwmbol592bd8jcgrpla01ovviqz4xet539xxhr6d6d18p2blh1ganfe1b8s6cru3ta4zwxne2agmlyghlqu4pvfrvkvilmkswiyqduidblozj23urd062y7y6kua9fu9he18a45ra8qnzgizwdfbn4mrkgqku85qqa6xb2duxrp6b1nj1e4ke1paflgucexex8n1grucmdui6i38nhm1jnvliax6uniqmyhs8rqh9tb8oiepdv1wi10aqhfppe5lhdj1pm4habiti3bdkap5r6agi0i0k8vyi5l899w1rayi7q11fl30ghwa5pq8aubtx45ia12vfdnciysc8n4j6hge87pwww064xt7so71677omqdpblp7rdu2kzjeidgtodqpiere1o2guep980gcm20w7kounub8ywv59jx7jpz88onmhjwqergu517biwosp8l2xcyx2el8okf2wsghbguxrsl3kq73w7vtita4gorqeec9tcvvh9yy8xumnc9leffgk78kgjk9zhqgww25rbzu3ooqqm0n0w4hgwgznjm1qfzq6uc4x24omliitztpay34x00jmz3gfq05f13m37kg01w31mopx1vsl5ebb7o0w8kt0s787sx5d95y3c0c4h5s61ihc16bipdy4298k99tvdhxbgnc3ifjztiwii7rr2mzu29nu56ivzobzqs4aiuc4szmxt36lyen82qm442qvskyozff9yldncf1utxxw2s0d9s9yqvwl9ye60i2y10opibbg9zfg39u2p0id9cvevlevltbljom48qlb6xe810bzhir5449df44i',
                fileSchema: 'adf41aulbmzle7elq2bcd3zwriqq6b4p3o3v661jnh40dj2glfl68bpeycz409r4t9751tv7fj2iyv3u8f5gxyddk0cypojkdxos6z6o6fku2plj9q3ngu59ji5a6h3404q361dk278hr6f1t08hkxqup74vskmrs9pgj903wgx7q2yapr8cpr6q43fl7ctpwhti8j9j2qtia7iff5eci6napssx6efwdd6e061r2fnvj7mzap3hd319o7z03po183c3vdyberhf8hc45n5l3wz2pkzh6segszkgwufpij7swx0dsqq71f3au4k6moefu0j4isa8ijour7qjk0wq2y7u9k9w6euy5mzat9bzg1wcy9b4fawd4qzzo3mclw5r6w9f39q10ia59ww1z1kbbcvxvyrw3icfvz4zi62ew2mehlmde4cr9mmgeq0g1iesb9oetiolffis0jw2s4thkhbvvb9ts7pem0son3xj92yhrpz7yovuil10rogpfqmzbhc88h3rsz43wg2u7uwt0xompn3befyw8pvpv3phpaw1n86mk5uu7bfrgefq3edewr3hqzqyjw06i3q2dstu0xquid4fxokqn6lw0p39p37ddvoll2wcik6wuym9bv28p9mc0syv2j08c556owukwwlz8eycgbsha9p6y3ws6gliwmauzg0l9bmtemzi2anscinh6tfyoaowmim70ga8pwhg6bwjle96fval2l5of946pg5tchzfl3vovd4accfgq8elhazgvziaqs6w4f3l5rpithbvokltphrxkl7o9rkijbv27nhuriwcda4at0ska7mlh3mcfce5pfqyufer50n6usy01td395tv2myetxvougfq211g3eufucgwf8dror0l1voizlq2jqknudv0pz0bicxy6cp5ywocusu8kxjlpvf5f1cqq95qmeqe4zx1qce6to743ueh9j7buro79gxagg9neaqcswkxt1efvlkofrse4uir23s9easbed4e',
                proxyHost: 'sijq7u3t9hiqrkehwh4iwadqa7rx7kbakl02oi3ehh7b9sm32y3yrks99r8h',
                proxyPort: 8247731515,
                destination: 'lefyj22i3n8y61yoqwmaz26xwdcuu8yg0zpyv24jvdxmzxq1c5tvbutfo6unm72x1tfpp9lhfk6dcrb7fnhsm3cay16vszprp2vj0zuvol34zo8yspnz1e1awtivgn3s56yjt00l7k1e401nmvgwfw6pa02xjib8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '838797nt8nijjrr9pw80484swe1jofw18jatdb10jv9kjwiqezt4vj70ca86dhrdituit8e9dcbwgew2pfvty1cpmenr1s5ij4c29mucs4x9tnbe7mdc2n5zosuv874l3gqh6ktdp2lydkq1rfzc0rpavx6giuih',
                responsibleUserAccountName: 'e05hqq57z8ddwrzyqct4',
                lastChangeUserAccount: '7o0u4kwsl6c5o0fx7hup',
                lastChangedAt: '2020-08-02 23:49:31',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '21twoq992x4i81nkny2b572wztjqr9kabavu35jxn',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'qzbposnb1xq7r5cbixwawbm40fts2k4mfdy078ysmxdsihlbhh',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'mwsbpvkf4fo887c10roj',
                party: 'yj9puza8t9i3wyblnkdccpgbuufuuxln9jox4fpvoy0gzy8txe2b4x19rrhfgjd2vnuwu65wc33dbapw66te844vu3qb4u4xnbead23l4s2n6cd2uhts1d8w8dnep8dqzyush2a9to6zybq45qpgca4gro5odds4',
                component: 'gt3wuzlgrvjjf8nn6efmxxfxdp6rh4lzckycfs06v1gf1kn855qa2df9vx38kn24ifrsnwhcm1iore1ao54z8c0o8q2u3odbh6cnb0p639jiemkylx8e3pothfg6krgwvfqqc7ubyumlrny93ggueuq4u8lyanr3',
                name: 'ff0gsuwudykzehj6rhtvr7t44zw6kj6egwzz1g7wo9bzls9pujrk4h8vea5afoltd2u95inr9afu4q37t5bl5f82nscxhqk32var0x8yg9rnopb0lbq5p5pr8o99sou9pm2b3xenlpa6dgo5v76yfp4cf4typ08g',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'ucyvihfjlpv3s97pn9rgwht2dy0qmwj5tr1d93bbolrvij5m9t4asn3h4jetinza212hswvrmwjmq01vnijposn3ogg26pczmch24sazosgjrf5twfkt99550cs4zl7ij3zlur24vw2grm1g2bhnkxby7iwjsgkw',
                flowComponent: '2640zczbrr63hxa7fx26mrjdh4rp5h8ef080x4nxkykmgbcbojh1lt9mx0zuwcw0flb7k89ea2jc54ey14m6x9pzbqoxwuvqqrvd9gdutamsardr2bq2lolhjhud0qin8h9jhhs3mz9jw75phoruisgsu4ixk4ig',
                flowInterfaceName: 'huc85njs5bcskrp982h8cm4pqa7kctqqbscwqj5ra5jecipgncp1dbw4tg9jqbu0nb0zly1kcixlpukuxt0jqjtofwkn7hy5d1prl9k7p18hvkb7pl4b0rix6u7vujobzj993v9brulyzd55ws4maks3qs9pu1jx',
                flowInterfaceNamespace: 'bgi8q6vkdsou89cfs7euz5ibova76qt0t5di3e7w4f813ycdbrs59suf583scl873xst8bpwmq2ld7htwji4zexawggrao2uvzy3ekbm0g42nrpwr9s4bdh29xu7yza4r71zu6sucya9eiv7bc5w0ayubqs9uqol',
                version: '2ggq6xa3r73snl7adq80',
                adapterType: 's07t1qf89usanbtfgsg3l7hxcg57cddcrav70seo8428mz0n7kmtqx2hgtyz',
                direction: 'RECEIVER',
                transportProtocol: 'y8jbrjqzr0jmc87gjqe7r1umnpsxgoafjkrgll6jh12lhtwaidq4luzzwzau',
                messageProtocol: 'ur4qxafw5pmtk8a2s4qfpm30vi0z748nuif8rozhjdldk9jn1jyxcdsd56an',
                adapterEngineName: 'wunnzk0zv8k86k6aso3agzjvmb2cego4xnvokhofolvz1g3dqt12ughd6s0b2i4jo75m9h0y5s511hw8i8pu8rvotrnp9d33tvl27th6u1kqjq0lbfpvzced2jrsskmxsfw61hxd3msdy1xm4v8up69c5ppb02wi',
                url: '1jcqhkoh0sbnrqrddiqrj6p3nnx9x14lumipgmwbb0js5xoe9ps0gkzz4u7bnuxnstehdeoqg2dnwwzacygppphjyc2cemf3dzop1u37fsdcmsopihz2nnu6f0bhl44hieqigvvkv2037ol5muthzqlvbivrpj42qodkktba21u85l75blmn0cwbedjmk0q2nn4yz0hf7fybz3uck7fh1cwru695tyrxe0n3kt81uxyc94jglzuj8947qq5daszzspcy8g7jrp7seqngo8nzll9j9w15t9826cbe21zpvgdth88scpf0pfau6kvgc7xy',
                username: 'yb8akvlq61amyih9wngqixisectdbcud1ct9si3z6kqhe8mif0izjwixl6sl',
                remoteHost: 'vm18wcp3b6j2vvp2rnvldc2gd8p4eby06ud64hh0zgevns1ew4ij2ng0yhcqzlufn487q8scdxwiacg9mb67yq4qy8fpzf7pxf3b97zuu65wpmht0k2nayrsx2kyj01su7u3jok1rh05e7sfcv5bifrfryl0mtbq',
                remotePort: 1189160234,
                directory: 'uq3ouvs5edhtigi7aqf21i7rv88qh4lwjf9m9iokkn4h1jzs559ien6ub38j76g74i3jsw2wwwy6y3yy8e2ueupenwduqkmhu335jyt05oxbg74hqnql84jtzi4efxofczz5bd2t5hwvyvvorl64flnu5mdbfoxibuyzr2l48idf8aeio66vxeyxjol563mpp8alqc9rw6plo4gw8q4elwbd9noktumik6peac1d1ge7sftyjqtp2svyr5hrv40ilt32vvxivj4jsro9pfptlu2ly4jhryk3teyxu7n7vwqfi9scasm9e4fgibf808tu7ebmocxvkx5hdm9kfwiyp4s2c7rj35yl2poerhm0f7kzwd1te9ciquu8ux7mmz4ptt6fnapxme2n803n0i4ky6rjjdmxkzyl3n9e3vld1u7fx7cl015or83q6lyptr2wmbfh21sn24dmkuv34of225thwdn33h3fe8wl4kpg6676jbnruqztk207hj2w5gugc62hysdj7x0it5dh9a6u9lafzoo5a6uwtn7jutzjh8xq05hlydlnopuua7te19xrnpa2lv74nlpswqidigfncmx2x1vhyjb7afl1m76jfbu5wmb4eav249nctx29bfq6g1ri575otjz3xke09q7wtzxbqjgf7sq5wmv4uja0fv6cocqo4igmzx2moq7ab3ncxtve79gxgp7jvw5wwj27yhqgj5wxopvp18l7blunvsahgkc3h9d9kif9umsa2h0euer88w9lugdaq6w7wmrgweic096weadh93jvcok57th4th2iwzczv0sxjuidt7rnygcvebsxf9p0fn3yrxjmunu4sqkamu7w12buqebz6omtiw9rcxz3pdsq2vmqqv40ape7bferzulxvv0rfb3eu51t3tx2dkwh56u7h9rjer1f3c4y8yxajk1u5akjhfblai3541ap66qrwcy8t3hke6erny0vrbrzxrkvzgbyymc19y61pyylpp8w108p6syw',
                fileSchema: 'lkyn71oniti4qjwr6ehsglylxr7oxs4tqgtke53zeq2owvzwctum20hjw1q5yt5a8hznt7t6bmbltht3mqgowjvdqq5dp63vid6dftqqddxxjosu0upmb79jeodkl2v1f28z3qkw5ewnlxcf4m1pfl1nqnwd19hj64peh6z2u2sxq1smog8x7rmppts3ms26a2vqycydh4suwcv9e992mlb5tohhgfj4h9418d3astj62cshhv4v09gg2rz1lfkl21lbyi8mzudvawhsnx75av533faq0z1yqxgq35dscrs46mx572yleh79k0363zmzjpnpv2rhw8t0gka9jgcwunvo1gff0zyip0ocl153bxht7hro0k5ymqgwy8ej9z87zwnu2jrlt0802pltta9s84v4c5ghhs52ootu03ya50oa5r08a45igo4bh1mbmug4nr5pwayh8o0uqdlo8wrxxhlujv2hdnbw2hecvhaf9nq420jrdppyf6w6eepro3mscrx8fkmi1v1970mzati6itips4esrh39xufi6rz6wnxmmt8dszkc92xfppk7omr58il1q4wa106c9y3yg8bcj091e6p082sbwy50de4en3caf5ietyjigjltco1wx8uo4rx5a29bhjmlotijpgpjarrjpu852r7nhoymcyxkq6vw07oz1zcpsfnc223taalk4b17nfh4umbeq0wu81nbdymxfwzpa2b2gtlhbu340i0qdih2e2z2xtpem17y04eyaeujjcxgdqu6q785c0ivqedlv5w5ooebsodisqiag9dpor3ga894sg6dsshqq0i9dj4qzn7dnty9wo6j87gm24dutf7uhj2861vodnvhplao2hr7i7i1uoy7oecbdggjp9nehhmjq10jrn9keq209rscslx4cpsuq964jk3mzu0hof7j056xfffogu3xcp9hftrmig4ty7evez2oq8xm1x0n8r31r8d3cnk322jy3nppuhvojlaw21j1oeuepe7r',
                proxyHost: 'krrovc9vg7pv7mhz7cve2zglly9689nvhqx2qy1ontiss1m1poioosifk1hd',
                proxyPort: 4984803281,
                destination: 'vixb56omm2zwcvmcm9qtl2s47pyp74ie3fj0uxkhekaipc2ol5ztquywhtxczo0uzkvgwxhdoqs8asfshv5ykiqv5ifnmhmwssrr2z8kiljanjmc4mj8jm2p6kuh4dy0f67b0aucnift17wdc5ehadmeh2jd54gi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qwrxql5htazn783iar8ippgxhehkh28n9j51t779r34lpprvsyddxfuv8x5p0sx7i6r6t13uk8sec4lf0m1bmcphvby5a784qykgbggb7z1y9hj0837jiagipsel0d2pu1a03zge45wxpamchs2mp2y44sylm7ro',
                responsibleUserAccountName: '4jg5rtm991smfnyz80lt',
                lastChangeUserAccount: 'aidvqiyn9t3zcps3642c',
                lastChangedAt: '2020-08-02 23:37:04',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '8zgzbpy89n6zae0wzfnig2yp1msqgrrq8d0p3g20',
                tenantId: 'io6inra2vtx9608b0lfw2g30p0aulw6m1of9i',
                tenantCode: 't60fqn9a9kpy10b6qc67wy8m6aa4pzmyka40u6umrrbuoddqw0',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '676mt7hr7hrysivm6uqq',
                party: 'b52an7uwplygdjh47w8vvbbo229zesq9r16ufpov4frjn028gnpah0hyr1fxv7p36bdq6gpopm8vxs9tza9sxyaf21bu32w8a34unwzvwywvtti783ccqwzr1h7zc63qfmke8o2pddvr7u1mj5qrnq0hra2fmtxw',
                component: 'sdpyvk0d2lwx742q0e6g0hq2itwykdmn1mz5ng9xech7p4rbp9pnoc2vqzcsldcjtsfce2ntijd2fczc7n218jiajnmcaqqv6rg3xz045vomxnwxuq86krmxr324qbvex9anemcm8waeelxrzrqxjaah80u9g2l0',
                name: 'vntn0ewezst25440qfb755wzpxko8yjmjqrjj5fhbtubx9qady46zk4hgsbp7dy7qg2zlggs1qu3a729zwkb6yfxcjucygfcre07fdyzvkjhklzxlmab0dz2pwbbp0gmyawf41ssnvie7x937tpq6klejthb2ryw',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'ybvp39rl4zrmu1uyhvd0xxsx8m9pvfb98oo5qi5xw69a5jy8pam97pejhwdh7fmzc9j3veos40eldzbo8j58x4ibvgljm9mmz9robl0n347ex338e68aqrlbdzbq8n883nz2vjih7umwxuh400i5hvbqot8bkwt8',
                flowComponent: 'rndprayop3ojgukrsjxqsz05bhf8w7kqw07wpzbeedbl8umfjed7pkk5b56quvjkbnautqlpzcnkjkfox4gq6i9e6oc6sx29jqgvn5rty6tbn86q075d085k665pm0hz9ad1h1rsrioe0yvn3wjy3ptt8dv54of1',
                flowInterfaceName: 'qqfj2nj9dc5s7j5yxt9pf119qj1yruf3vk11vbs9u4geauszzkhuov41tx24cx6i2yfpjxkjja3736efq6luucouqzxv1innww8c4ovronmpu84rog91jnl0cja14rx36lrj8vnduggk9e28ugm1ayghtfpm6pbm',
                flowInterfaceNamespace: '6cx1zziinduubej2iwu8fhrgchd78qd9syl0zbgftig9ywb3ip8rt9k35e3had4d4aiw70yfv2sa923zbqib4sazss00yb63e4ee7acqybcgz0jiewxmcgzu3qzxkk2hmr3gmvqqriltjpao1n59gyh1uenzixnt',
                version: 't4hd59cpwcyp631q55fu',
                adapterType: '7c4o3r7o6ifjpkls0ltilxey6mdrbxsi007pemvm1mzcj1m1521flo5ag318',
                direction: 'RECEIVER',
                transportProtocol: 'y5p2dm61pc9srbaezhbyx55tgn4lqoykik0383rmgva6tg4md6f8wh4bh5uf',
                messageProtocol: 'xd043r0bb7o0hk6d1rrz7wuvrb1lmwmvagp3n31flp02jrli9xq8zfn282hl',
                adapterEngineName: 'wigh8o5dzj2llzovlidt8fqz2z0tcb4jvg33izhkqp9e1j4xr6d926i1dszdr7fon687emuqhrsmmn77fv6ozbzscxf9pgj706sfh7hj5thto1xu3mik23iwapp1d7fir6rhjwf6vl5t9p7djjon7r66ryybn87z',
                url: 'r5jedtnn681s1k5wh0qmywx8wtm75rmgu9wa7f2qnt15igjwkmn7qn984zt69mxq42qic7ovtdjznzzjpv3u3eg912wl8500qi6yqtmsy0sbegkgzlsyyemlpdft6afmxupq4k9z54f4hw58u1hni24ya3ot6xxx695req1zxbbshaaijn94nijrs5h1lros9myb55p5eror550k5zto8fnz7eg02ysivh35vwujj3dqq7qqlweoszic3h14q1t0xeon5fhl2f96i3ffisc0ycs4cdejzyxixo9yhica8uvpivr6ypzaci1m6wd1iukf',
                username: 'bnf1spg13lbysu66u84dpolkd9vsncsd6cia2aer5ahzasdpw4tkpfzp2idq',
                remoteHost: '2tpj0x9vz4pzdrgmy9wug9dc7qzd4dl41buyn5p9diqmk5wgdgtmzpkz3e75i99rs34llj618vtpxayit3xyev05pnoq0r7eqv707qk8yz36n0pm1ozglt4kurn1r2mic0k64mx7hkumnmm87oiznu8txu3ukbbx',
                remotePort: 4210686557,
                directory: 'ff32t6y4etub96vh11ldybkkfp9fq5pygcx2l92g11un0p2lrbglbz7ifxwle8auer3uingggmpwppik6ivqc386dxrgkok7hs01j7fu9ajagufx9rdu2ekiun95d4z7sq9kh1p5ys1to9eswuixl15fzlrb4itx4br26wz8en4lzq2z5q00j5frzkp1yk559bpkcra560c1vw3ly8k2i3ht4rqhcq19dk78e0z6bnspirxbui0edsoatkgoeckz2ho55knbzmq5totygqdkz1lj5lwxykyn73rajwgghqjequileiv4vhsa36ctf67p2npv56covzpv7ohozn0j6w0cw8zxmg2ds6uig9tsm22ywchrjpcn3mynr5nbld6b5vkw70bh8ef0g2gso839eovsi2yx6yxytojt5kv4pbhgdzyto4kkv8fwb8zs7cml508y90y3904vwruf13qgsbyz9b0icrta2jrkjssqf8ba88i1cnjspbqy1ruqycoddzft9wtpc83upzhnnaqhnyxwmn9z9ek353zpfg48xo88bh93ozyieaihjkrgdta9u7zljhilnelvvnhg7fl5k2wltivaruzclj804vyt8lxlrxdva0q1ezrgkixyjgthi3u239n5wumf5fkxdcfr8r3lo4qzeaq251l4wjr9eo2q6px6klgf3sgfdhlue7i805jo70kn7xhtb94qvyl1juxjvzmglirr6glnvw4xlebio6vf3hfayv4w8zyci6tifk94u3k9plfo98dkg1msrudzb4ffp4dgcmkoypl2vkenn62j823n837o3l04ov0vddo3mia36e5g7rbwwygntsrwh9w0xnuvmyvn99asqec2bpub8z4tv69e6fvw8pukpkotre0ueezrqip42o8d4mvucndqzongr6isn09ewvtb8zpcae1lxs94aycxhphgp5gqm36lhgt6x51okzmtpfxtqbqmat6zp0hvyg51tanzsp4e16mrtrbobgxhtq0o',
                fileSchema: 'nwe57ks9ieegsajjsehkwxnuqibij4ro7kyzrolkq2s4r4bvt5yoipm9fjl5hqe5t65awz4l1mlcvx2lq15x3e9ctkrg60fa4hux4837b4py5ckghpom7alflkj0h7vyht2rwtluahy10doyipf6bhzrxljcm1bhoxs1k7d08jygtb1h6t1u8t9axsyr4f48q2qvfzfdara76bcuz4bdqsght1o4rj9wwjctmx31ujiiajt0tbhmrq0weqs2nzj755d5ngl1pe6nujzfw6n7at34b15cqe20e09oktgee2fhlet3kq5c6u00fsv4vwdn84ad23qe4yfeklgbzxrvwqufpea8x31wdtcdwc3iv5qbfwqplas0q0z6z4wg4653qje8zgtm0po3xlew0en4o0cssyrfbxl2vtg3ttajj7caaebkvfs292gm9dy7xouied665duieplbo839n6jw35nj3dsbyomvuxhbgdvco000t82dper9v4l890k899zbzku1pwe1iwb7rt6t8oprwob075zaxtj0htru6ys3fj50vk43uf0pljokkaxs1lii5ws39q6ogdriqf4qorluspz1zpg72v1l7kchbwo3zzdbfx0qdjqzbl3u3zjo305mrs2tn7miy11yse80am0z2o0nlstlcoybahn5uwyxv1lunlhrk6ozjc6joyixg4f5r4loy7xttid9hjzqaq7hmb0cnz72pwhv3eyfardcggsvtzi1dyn6v8yhwhq9gtj5c7wtmv2i4m8x7oht9vjqdv3uvhrdlweu8m5gfbfe6f1f5iqlfo9xt6g13ekuaeauc56iugpwjyw93k44nnv7gg7agrnjwja84bws4560wv1kuunu7i2c88b2ugsaa8vqklmu1rb3go5k9nyupah9nvi3jtniis6fmjmzwnq0zgan6vhg8mw5av9le4wzmtoxobvpjocu3sw7fm9t9qhttfdfdoa15zigdf6kkbmbqb5o0t487zsozbgb33dfkcpq',
                proxyHost: 'crd7ydagj4f8kpky4hck55qzzj5vhhw60fgboh178x575lrk8gojph6luyy1',
                proxyPort: 2831969238,
                destination: '3pk759vvdils798bmb9dq21dzjyicwqlz5ylov5d226igqjydc74l18xbjgm6hr6hmorlejxa2nzlj1mc8o2ppk9aljg6vrn9sphf31p9km8n0g1hje0cv0soztlegm5fu1oszrtnm4y1fcnr3z2kbpz401mgvgk',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '95mstkayzaqttooqk6cvrlw96bp2bviex1m4ionou6ryws5o23ycyenfo6dwlyezseo8onrva2xb7w8pjeloxkpssgr507dmx5v3kep6gz1rpzzwtczxhyzvqwvdb56j2xgkb151jhdony8ed5b30emuu7bmfz97',
                responsibleUserAccountName: 'ue7rsysour90rec8x01j',
                lastChangeUserAccount: 'ft41wzhrvr8grtwtu1a1',
                lastChangedAt: '2020-08-02 21:43:27',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '2079jhhgzedi55ulbm8ponebywuu6vlmol24acy1',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'olnypkertxplojx9imzoanybvc8l4xprnigpf3txr26l6snpr4',
                systemId: 'yz0pvov95le7uysmqa58pk5862xk8o1z6xjgj',
                systemName: '1oaa4zqu0znx2v6ci765',
                party: '29tbgs1tviqe08rovx3oo6tm0s639d5s3bkjj3h8lk8ifrjmda5jeqnwy32yx544naxoaexfmaon11u71bd516ylq7w2511yyrzt1lkq2xl0lzqa3foga085pr5u8xf67pjzcvffts30lkzn3rxowapgl1w3snsn',
                component: '8a8dgb7odse2p8ejl22ars8j8ehkcnedtvrouan8tvh8d2ee57ff0u3m8umrxjixdkl5klghtsaefznd7k9vqqdaa897h3k6oilydmpk90cgxzwzza5j445xy1csx0a9k19hyotg7hfub9ii66bx7mhd33ln0e6n',
                name: 'ek640hl262zzzmzayvz75mrvbcnm7mleaesvufrdlvoac7t9bp5o13hikod8boipvjufnty48ntzpo6yt5d3kuezzpz5i44b3jp40o79cxdp7oyt5nxzt4hkfjqw5rb7kq68ejqn7qtmnnoblmz52it6blnovmef',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'cxqfgdif4xege18ir7cxefhccspv4xtlous0vwp8qvqu15fue2sqn78wvvntr27420spqpp8nk7qau4nny11eqo8yoou0lubca029f2ydu0iehx4m4nofh8rjm0f6wwwb76ba65b47f2eatp98vrlgkwaf0r45nl',
                flowComponent: '149cc8lhisd1qeumpjf0ncy68v782w727aha8864sz6e7puqsksck7nt4cf1jk99x1g5pb22b0cvpx894suja4jjdqcfnee5mozksyk8b42h402w1rj693xx1s7eo6zdxgqnw8rfpjt45dd1vg7jg9n5xdotxf3f',
                flowInterfaceName: 'mlwn3jw3p9ynirisg7rx7mw7b2s4u262oyzh4k5rc1m9b2w33b7e9ydh0cf4j3qv0bnso1h2zei99f3titn7m55g7ocjv7y7uh8f9lu5ox041m5y0nhwkyou3m6pgjg6gub5ysgqqackr2kuf29yhgqfu2d8zx2j',
                flowInterfaceNamespace: 'v0aufrmweedj90t5p9x0n2m7k536dzqlg8a7svgsrl462a7cabeznhd2arelpf7zcuha316jah11n67vk9i6rtb8w0ota4yhmstzo8jjgt7lqn4futelrs9sqbvx4x9izkms3dyhnrlo1a3mxm0hbzw05jbulj3i',
                version: 'zgv7o462ht2dhvc8tx9w',
                adapterType: '378u77p354zhxhernrc95pp6cdexnh1glysj6rl8f7otlj4df42at7pvfvlj',
                direction: 'SENDER',
                transportProtocol: '853aqd0hpcq6y79n2f5i386z9xd907946ypgc59aibyguk65mccq5v1ztsqy',
                messageProtocol: 'byihzzaevw04a5402e6tofdbev7h3gqay9ru39tgltrd2pdqa3qvgl1x0nlo',
                adapterEngineName: 'ris0m7li6ijfwjhena1fweiy3mu3fnmw0v69mhbgkun39f9qz2zjm1l8wp3e2cjootr8vy5vf4ypgtue701u3l8u23f5fg0a4zigenii0uzuc33zamx0oq2re5wq8jqb52b9ql1kakuy3so741o1vyv96dro5znw',
                url: '0l11c3xei1kjc3fept5md2ar4ufzlllqzfl9llyemcp7g6rehyj8ja7vdve9qtjwc35q57wye30gb67thjuvwwn44pra0tjukftmc2gte8r2aculn3y4ugt3icwvbzzst65e5j5c9j2wcy0nr3fbreiga1kdqt85p0bwa0dozy3k9wwc29qq2eofe4rkee9kokk8agtqbw5zxw20njbnrxmlxxr9jvip24oa1aipproyuvhaimaqrwkkwktnmp151p4nqnckdjodq1npnokd99pophux7icinl865y9y6zxk0bki8fg35u39er7j9nby',
                username: '58422vqyucxkaraguwml2jpju12njxdi01ea8m62a4e982qn6rg8uw0r6ohe',
                remoteHost: 'rxmzug21ovwnxt12cvjf1pa2cpd1n4vczfc8veki13ymdcvyatvwsyxgbuxdtxqpd9d45hxtqxmdsuabxmyt3qx0rcil8u8acl3062u14kjxom7l4lld1yl7sj8lkwo7pnjampdqko11l8y4dhx2fqszlf8t27xd',
                remotePort: 4154756071,
                directory: 'byg205f0fej8m27eytbpf1rktdgq0rtpr68v1p3x460cg2c70h68syuqyiu5yhwjy3nf0ardtxfswzrsudl8d4cmnz5gfsnx8vh6vejyphocvyuler48fxw6aohvaz0c789stwzlb9jg1fjdfrj0uunw2zkaflqbm9bagnnsc7f8uonuodnb4qc9dp50ubj2gvbp5f1mx42fk42wp7fuvhupgdfnc5u58oergkc14cl1fbcfnjtj5vvdt0dg6e7do7bjhawgx6ku9oqqiayx0zue23rng6563c6hjn3rzg0glgkwrz7cobz85c4hn21kv8acruirowu5edlffpi70ewgfwca2rubizjygiffqvb3fro9exxd4wx09y83qmvw4knkd6c0vb649btxjbcttyp77dz1oashi61jeim26mswiwcbamgya97aa2rturai4pambj5z9bagihz4k209khrlhqf6a17eph8zgiyrunc9t9gozm707vecx2d680jryv5fmlbq38tsaoxm9pvdfue9exzwqxhdqxhzyuj18l29hdze8a763hdkio93bdftiz32wrtnvwuo4ylg382d4v04zzqoaz3kq7q30e4w5l0e94394kd17pf9tkztahl2kytawfkfttaos819g10r736qiyd78bca10kswsurydo9i1sh3k1ts69gv2l5naf2iztikmv07p5tec4b50zvrx475mmov2gisweby92srqg4gw82acfk1j3uj5i506mbltlyrzi9hzd0tba7wc1dagod87dzww32w5gh0d3a4iwpl26b6ekib1hczt5rri41bwykjptpo2kuvaqn5l8p5fe7r846ytrjk99e27q1rntrv6b0p07kp09od0q35m3ex4ilpqewtremj5s6s50qv9l909d5kzy6i147e9abf9qd81htnu0y9k02s9r8jf838v8ffrfrvq7ao9izjm3s5ep8dkwktrydvuumsj30rmuqpi02ixfresremj35a0xt',
                fileSchema: '5aobrs6xb68pv69kxqw68p5zwpqlwfp0lslt6epudgqkgfrbosy02hp1pkz3uxzfupggwektld7h1x0pz3tdgzmf93fom82x6w4q3v2shyjtg9w057ggdcbt05wuk3i79y18zdc98ry8zg2v6aoenkc8dmu118c1z2etmhef6ic6ezgant4xajbp7x5a6tmebg7avvroz45mehyxn9i0var1brqgv63x56saqray5firszn0kmat4iew42qgl9kcffsxmlcdl2eqqs8n21abfwmgak5up52kjlhjb1aanzsopsf21fqwer6a38y4q5b57alxcrdfzlpjf94kea4ec54gyvsi12rbhj2fz4bs6tdnkni8g0vl9222mfq5ajpxfhfxuc7pd42vjeqo2jockqtzrg90gik9p9uhabvpd78x6u7iibckyvyhpnm38i9t0aae239na0bamq8hxrxwuucpk59uuruuuoocicn96rsslkyhsr1oudm4gkybpsic47ffka41qizfaut9yx2boqex59vkbhfeupjlm3xsgke9ccs23zmcxo1c419iwn7b7guaqqmbw1cviexmjcjm6ssbeackh7heeyfb5u5queisdkzi2og86dr9gxhxqnn39swcdlxzjsf5eucuu07lbmw458nu0xt6yjra73ms35myxyihj5sxky614bbb9ifajzc9f1kw1a7r72ha1hrcyxpg2j6jpid2ezzfn3nqmlm8bizsjo5bnzsiqz4xnx250fqgfk8z0rslprqqucr2mom8m70qgxhqqv1rx1f7bubyk6ex0ujnbn8gprbwsijjb6yjv4p4dcdhemc1yw5xezg9k5jojtnkkonqdi7kpp5tat09ex7toxim22nfizcj4pe8zlaz03ysye2wkwwqccc4h2aygbhukdh77teufgmw6zrpgxbsti1p4ryjjb3vows21f3ypuktnwaktgrzpv2s986ywc7ey3bwunoz1j7uer5q1t8k6pd59c6a6tzp',
                proxyHost: 'r5htnbj1om8q80hwbnx3cl1rgndk6s4wmumhvyuxaxvbvkctpq268kuc9edv',
                proxyPort: 7013931076,
                destination: 'l8pt3mhz3un42t21tjb218ipqomnyn04py6vlgtbv2m9rbvxlaxkpchrduvlhqhqi7rfmvvzuzwi2i3lc86otf3swvqsxk45lk1d98ti4v3wurj0qyklrabpguz5azzvdvoznlp2i1uw4xs8ypb9ghlp05g1jb10',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jf4v99f07ctccpm7h2ywet851wdmcir0yp16w3fxvw1efxqk411da4h43m4z5oqpx8yntb9ux2s3ljojnzavp4l6mgmp0nsahjqijb87w6x53ceb0ax4a3wcl817t8t749jafz53527mwa22hwth6d3k34ms34m2',
                responsibleUserAccountName: 'qezolsjw7jx891z74fqb',
                lastChangeUserAccount: 'mqgf0oq5y6t9ltdibe7d',
                lastChangedAt: '2020-08-03 04:35:47',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '60mxu9zl745ct6a8cyrysjoekma1uflehntk8jv3',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '6hrxe7hj553w9gu3sh6qjyxzn2d79ptf6pa201225gmr3q0oxz',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'krcy5m6az2tpyes5r56x',
                party: '85b1s1w0qjzfx8s63vrc1u9q0km0b5s73o1ygfog9x4vsk0ausggkom743f4657g5p4c5tm3u6wz6v9dscse5n3q2dc0wghc1wt3cdzmihvgd5ne35ybvsbel4b1zwps7fkz544dkwncs1jaqhr5691vqc7a30m9',
                component: 'yltfjbd8znc5bkdpuxarljiz3i5nwvysp1am1iseglh9uuhlzudgd4yhm3tdyvfy9qmw9g3zp2b6v0p0tsysqlydwo4bgfoanu93520747w91ukp0wwbj6iookbo1lez0lp3duai6ub687ar98djhsvvvx4crn4l',
                name: '2006tg5lqgnene8agrh6qlift18y182i58g6h7h4tohzbu54cm8ym514wh0wtx14gxj88iiyhx976u92pfc3hrb4uc518d1adzlgm3e2ljl40y76bw1pnpxuelx53w1lapgezf22dc1sgsufjpt68gsxjutlxk10',
                flowId: 'j8ignixyv0gdi19v7vnyd4v0rd4k24uynpgz5',
                flowParty: 'du5u14b0ng0okhiduy5v044q4d6nhvh2ivpv2ovx8ut8m72ehd8qzyh9dusy3ce2d6alpjxhr8kj4fniw8iwy5yhu6my41fsmv9qk4jezk8spoyb7xjrztal6u6m1mgj76h7nzrqtw9mwzswuc62gb3tfvfpbpb1',
                flowComponent: 's2bg0o5s957xh635ihajx93orcv81aauo7y7s6a4gouh1qwpfzo1epfmkbu8vzqs2mive5xv8lh9u5kw72ix6lka586g1dwfnknwij2lsgylnpvo8mok6v3qdl6as7mfpe799td3ke3uavxqwz8cgkicj5za8m5t',
                flowInterfaceName: '80ykdtty4uwaj8fm7ygyokdkh0f8fhkz2nukrxzzuvja6zzwfj7849aejseyjwvmxbbd8qku18le1nsm7y9547hjfcnw7e9gmt43bzfxw2vcaf4oxkejbvv1eqv56unu0pcgi41d075v0rguea7av14c7vwo328r',
                flowInterfaceNamespace: '5spap3tonkib0q92zzg4kmbil9vli5lt7nl676nt6dxj8j0c312vpr7ojhjuon7wolne1z1073y8pf143lfiphah44fzhv5x6xjfyo6f5w2rdxeqckejp91u1rz1cga9iggr6kr6rseyk2jesfln0gptn77ottt2',
                version: 'mkdtf93uu5ihvnoodgfx',
                adapterType: 'i55x93mvzeyd9e1y1hb3n5kwx6nn6u9oc561gslwlvaio5zwuda00np1agjp',
                direction: 'RECEIVER',
                transportProtocol: 'mb05n1wu9a7j4b7nwji86oywwr6v35vzp01oviibqj3qq6608959u5vrq99z',
                messageProtocol: 'yahj3p9iug8zqar6962chu27xm2dh8tsefnezjqk3fgjx9uugga4s185wq5j',
                adapterEngineName: 'iaa31tm5rnj8onhlswofxgfw1cltskkztbvmmjfpkby4900jkby8lo6hfjzz59a644a0kuiz1ymriklotifguywmp0vc6r22v83rmjsribnisvw7qithoz2ibjhm0lflauol42rifpfmx8zspuuwnrdsnktyg6s8',
                url: 'k8aguqkxak8usmen54mp21wyvc0g55wzae9z3o4n579zz1untek5zqec3bcpl765j3z8kruhp7x65pomankrd37ikk24jr6qv5h7n6thdjc12vqzia9xvkrsxargto5ef0sjveq4y3al9bdv6tja6mp6qeu4qy2matmdhhgy8cqw3mfkwqtbw6gqsivpyijupo7qgdi3ow2ilepca7cfkkndqa6i7xkqb0pwkgqkwmuasinzm7sjv5t9irvy4be6ofxtnr29jlwzd46qxzskfb28rxixf7lw1eudjjrcpbvr5ou4yhz88bp3w4ua3dko',
                username: '8nudpa0jt11o2i4hzn5ror0px4ify98i20ljn8m5nzvjj2lxn8ufszkjmm49',
                remoteHost: 'h92e53a4qkiv05hja0c7uxco99xomzy6krgp9i61dl9e0lq0ume1fa60x5afdpl4mmn2309dewtovydyzirbc7oswyw2xlpkatam7mrxjgki2cp9nw9nz7amgkhpqemd9tdu8e09kv9yaoblkb1j5oxezzp6eyz3',
                remotePort: 9510059904,
                directory: 'oms27qbxgv92oj4vyidusodfkajp19b5h0wpjs68vj3zpirpyl1fssdunzznq6gex75fd3sf1nlozxx17dud72fotmiqh5c7d8eqlb6zb1fx4bjtnbrrr5wvm8w6m60f98smcaegqq5ed5iqv7nkwo1hlb0avvc2x6s1nrqv2oxw4l76ca4sotngs4kyl0z70vv2168tzbujdsmfxgeesij6scv1qenvlq4pe24l1qm1x93hje3zlksam2ebyyr4hcgmky2l48j7g5y92wvvzstqe80ax3umlcuwh9vplgngyhjus5ufp3pijqvjokjvf3l34ydusxw6whg5d8spza4hq08xumulohaij6yl6pln263fbysy0eokunvwfsvg374uwhxl43kqjjwkgerpz1jolyr09havwwaddk8v87u36dwu1fc1txk8i70o4w8knswpszi9vk05z24u8g2owusmakf6o66w6e54huaez6mrpgszccoo7cyuckps6zd3j1k94w0yw61ub4pkunzxtnvs6858q50dgwmv7kayycqhr3juvxaehe8yjalj1wqjoanpqqosasgw9hkq4zq2flac07idr6b756puot58sjxtnbtqobcvy4bxc1hie0bgmvht6r7f9hazs6rk9egahteslm6sh823yoj6rla65sgor46bgb0xg4z6thag1vdk10annuevtylz5yyko1kbpns22jrqw2w52sqahby5o3zbegf9svmjqw1steiqm82dork5sx26bb73yt4x8ert9chuj1xljoxjvxqx3kx9nqzbynp5xvw9a2i5xv3p0rnzo0ht45ntac93snfbi1zk7hsiov4h6qnnv2ukuequ0zaukx8t6b90v0u2a0n88droofzb0yk9eixu6d0jxsx92fyfwhqrj9deet9z2fdvtwxe68lk0khxg3wrshn9nnltb6i8wiupzmc82ephchub5ski70ktnoa4ymuaap8acg845grv8fmg5po5a7psgf6g',
                fileSchema: 'zubyro0y74xsszha310wxh24gb66dpt5i8kasdk6uedsocha5lil8w4bkrr8rragnyrgamc44vx9m244s7w3u1myxlpeaq78oqkab6zvujjuzu9yblyobie4yis0lp3mgio3vjsx4ko89xjausud83kmj7bn27s03idsjpvixmgmrfjfujtnb6pcw8vruuu5d3ufrn0ob9y6uaiqs56dfyvgboum1lu4myg7nzawe4y4xkc4j7jetow7ezki5knyvq2dlx3to0o8rj7o7d2jy1ysxua505naahwyt6z4x6f9rp8hfmzsbe3namk2w02ukrstuwsm8fbhvp3vnpnkwectvyljnffsklnu0bdf6tcsm2nlwbos1ktjxwxz4ypcwv31rvb3s3tuthb9a2qilt9psvacms2zh454pbglanxx8x5mfdlb1w3b21p4mjbiioxv7g2jx5wz7izz5rm92zd29a1pa7c48cda6avmasyhp352jah2ny1s1n5gjz86yuahp9zfinlg8oad2a1ecqth0d4c2gascp8eusd9zyywfb1dvg77gp6gt2gssqsxn9xrhvo7lbkhjne06911dyougaqq1tozgte9po87ye2uvvwiey40qqxu0msvgw78w3i7d2py7y7pew8dr1o2equcf4ka4uo1lu2aatjcfn599hgrjtzrs7ur2o1x062va4kaoa94y676ike35r8f1y1ljcufxg70bkh3v4hpnjhuwcq38naqjit8sdc1jz7uch2bzx1pal860rleidlrmig9tgsvn1ml4tgvztbbq30clr0nlbklcov1oc8wfmo12e6yxgt6ern2eu8w40obcxvqzgfmr924nj2wcm6shfxwu591sfokcjbrlquuycd11d9j63vctu9c08g33x2725l5dhgqjkr4orweaoch0d9qq6y2oufhd5ys6q2icqfytbnhez8x0kkc2qx9u0f4i4fswfs66x41ley389x1pkvr7iqzmnjuekr68rxed5vp',
                proxyHost: 'sdcvzfeggb39s38ultcrl60rbfbidg3nfe6ufllfqvpzntrzdvahsdrd18be',
                proxyPort: 2926571185,
                destination: 'zufqw5y0tse79d54jad84q1nz9o3tdnwmzc3e2x8jx3t9oasvi0qvm41mpv6aj5hyfktmlhmgue0xgxl5sb0n7vkx154rs1hudr31mrljj3sm34l5txjrcyapt2azpo3pta0n7k2ethq7imx5te0ogmd7nls7udb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hb51zfhh90uen2e11uk4s1zes5bwoyu2qe3k8eqrgveqlw2n0eqbj1zw46ygc9x0ek2e73bivp4hyd8i79zjdq2cx157kjv23de1wzbq549fklx6srx1dz16jwi5qyfk5x1jnfx1bja5iwdoi2xtjy4qh0359bwv',
                responsibleUserAccountName: 'oj5nrgk4v1576c94q26e',
                lastChangeUserAccount: 'semngoa31ry6zy40tzmw',
                lastChangedAt: '2020-08-02 22:01:34',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'wkstba5urzsg0lffu7bc9fn783fzd5hqnxaw9g4z',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'rrxh01a3u2ongycyn7yntnyw93v8gpigqgw87fze5rd4j8sgdu1',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'a0uuhcixn3z4wv3ouw4o',
                party: 'jtwtvaqdp6g6jpu6yamf70ucannppcojdcm6z5o5epau0btvh03bmtn5a7s6scpx6d551q27fn5c8br48xrbujk39nm9vdv1ae2ka5lafhhk6c217r73e6z96dwo916z3d5z25yuy9etazvmxqa01z8lsoo7dxox',
                component: 'xt690bzu7qjzq4fq3wiibpgw0oq7dkt511ldfpijn0zmbd630zg3yvbuvej3wl1tz5xaukyocu6zo7np8z92wo8b7fzl0jngu2wmi7llhzbwajptnz3e2yemccq66amnjxko5jp3qp1su33qkb7bhqllwowwivky',
                name: 'mpdlwdj7bm45xwmbecccq4arqxac3h538x76elq4e8swps1ob6opgerqdqpr2tyi7icb9ht56hyuabyfvlnotlszh4qf6s71n9asbbomnuvs49x3f336scm49ncki9hndfb60vwwvgxsri0dnllse76rue14l14z',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'nalv7ay27pwcne7valljxi0fbbaydifuzvvbmivg855m7oa56kdehxoy8a4gwbx8s6eepc3nlx364sosy8wdq8dcf4btqzuyst5rojbk2efsyl1j9xoaxjadtta6n52zmgfuimv7q8a19wtszu5w0gtyyjdze8n8',
                flowComponent: 'hdv693n3d6qge49i9oaht8wbdrt1m2xt04j4hrhp3a2epptfdzwkxvf1608lvqzfdeou4518zd7k69hame9j78bfunr6avq03b375c42svlzrxex05sk0idxd9wq6hp4zpnl7rycgksp0ofuwd0fvh4zopyajera',
                flowInterfaceName: '6rpolpmf4eem9qmsgdmsi3mvg5iqtyw8vpjpvpvli9miti42rrr20jprdn17mficxr5uq7ivin6l90tmrix6m1lrotcydlhgmgi3cnetmptte3qh4tj4cck43otvaxng5zewwxk2grgen854jrru1nl2owg4tnzo',
                flowInterfaceNamespace: 'l5v2cvlh83dsx0kigme8nocx0ueigaponvsd0fnnomnewyrt4qnld6n5dzlarob2q6of6nam7qerdxrcw1n205cvnfc5po9b6pughygk3w49q1qmhl332yvxnnl92iwrt98t5d5fch9uthp8toi0a1cf94sugdfp',
                version: 'gxa9vp9bxx8et883caf9',
                adapterType: 'delxdfkaxsau7f5wntibr4u4zuxtunfx0lf5n694t8cb9952aqqpn0o1lk9f',
                direction: 'SENDER',
                transportProtocol: 'qkza3zr8psa5gltny5un56ooycasm3rzrj6li0qxvawf016x50sw0w7ztg2y',
                messageProtocol: 'kpfx55lolqm18bnjkxpo8zt0xmnk521qzy3zp6xdaft61du0ir9tlo4x41nh',
                adapterEngineName: 'ks6zyx8qosv3zypljqbsmrs3ekhlgcmrqmsqi9496zs2gl0gnoktvwe657mfruyio3mtfjvw3o5rv3y26jlrdllt5j81fv09pec0juzlwvsfaexwlbeutzefoh8vwmmnrp3w6m1rvbids5b3dizi6byaic3c77zn',
                url: '1mic4vxiayz0wu8yut1vktcyglvphi2lrjng5rtzmjext2htr4xrye1mcuod6jkxyv0vr87xd4yp4pevzma9kcbxxh3o091ugsfk8e1vz4hx5x7c1h5hk8usesoub3oysvq497xxi0hgfm9yqmqabgyykan48xn83d838jdbi7gvk6b2gblw74rwmnklgdtqq0dqcze36b2audi1n0b434qbgpzy9frym6hkerp4n87jo3h7zbvpvcd8m69hj40eguchsc4q7gpyf1uihtqdiuznio4i3u7v5qq6ra49zkktdwlmeb1pzmhiuxny6fy5',
                username: 'do13iy7ewnkt2zfxj57uou2rfz88204ik70ha2nwj75hqa26ioig8ip9bghw',
                remoteHost: 'h4ygvacdw9l1pqyb0o99vpmsrg6m3spgrz6h279da6p1hjsq4ydh5hi8htlikxa84nohgz5e2dcdplz5tut1w3kf7wsbf9v011uh0k4cxt75m7pyv7xbktwt77y7fxfy47c64x5tgfqrehvd0j2zn6zsupxilw6e',
                remotePort: 9606805222,
                directory: 'fl1p8wqvxgwqdvoj1ij7v7hyc1ubwhfslw46u974deoc1osy3642pj9slav1ruqhale9r4h0hgi2p55ex5r9aj5docaelayqd0hsybn9wnx0ozwvdkokpdyso14t3koqlfsf42djf5t19yj6c10p7rik56bi7kce7qxjxk09pduhbq8p6pny2s446pztmw7xomrr8squ2ekwx1nccoqkmc4h2dwnmqc9ayrx2tccy1ymww3t4dbgszhbyuba4bkk43wvdoh5dk3k0sg74crpi203qm8mh2eqby0occtoggssik0fgm9kemyz32nfmztdm98ay2exjjs9n5ycvyg81rdyj3o5r5ag1cvm1druqbwf8rows1p1t4jz7m6z9odrqk6kwomqp20h4uny5alnku0pdt7p8ms7ggj0ma1jgj0jublpjgsy1il4tkdc8md8e6f6ud89xdm7o6i8gq3ie70rtrf3thgy7a3s1hzrkwzzrh58en6m2my2l05xcsp291eooj6j6voi03ssf998i2yx0va20nm93frpx8tflv981wglrpz2kfqfpcheeb3xc3rfh11cy4e86i94zp322fr0yfbftezue9p7nrcdij3ih7bgpmwe4hl0pqg4kb9wnvjcw7h2bqnitucils3z7x5c1pki2673z8a8hj0ed2nhcqtw64y45jxjkozdfsvza7r4aa5ydu3pl425zfh12luzm3d7gh0n91iajqlhbiagy39i0t4nnzqr0zjp5l2mfsh99yjol4yx460h77ve36njc5efdf3dtk93d36v45lp4kao1f5apbuvjaamb6e6ql4k46vv5yswwixlzz1tl4g6tvh9hxk5d541wblgpu8gospayol8egjny3lcflgvafgnbgm8v8xwc166ujpdl0aanppuzujenamw15vhq81rlac5sf1cwwbjowd2fdkkttedbmfwxrupj468gtl9si97pt1zx9tbh5sdugzlhwcqrjkpd38zg089p06eo0fk',
                fileSchema: '5uyfdxlc2t7p9kfhggv1p7s1u2cwkynhofarlrxm2kq6bow7l4iir6td8m8jrsbqngdehcy4b2a5nruszmphol45yqrvrik10qbvqvlnzu1ugf56odu0whcre2s1oj9tg29onc9gbosxl20wwhz2i8s45xadqwditqzxldpfp9dshp41utjvjs1xv5y2d4dq30w1riz95b9va80jpw5tihgao7w4srdoq2s5udeea5ak6upryatz86wvxdu8olqveecxb4c9acp9htdplemoi07upb244ov41eu3i9qoio1a3wfjj3n889774x3u2n3vr8gqwp44ozt3pdssrm1z79ktp3bmkvo3jno7nm7kiy33qoysavszql8diliajeuzge8yz2gfqzzabmkmz0hvan9vjn42v2upo66pojq53jfu9vo50xdwij06oy7tbjj0acdrb8d3de4rxx3szip49dlvyphwmbhmrh145stfb6rmal99nctgicr7041hzqvwvlsgs5ya4sdqq7xr3ztzfpqkt10tqt0h9at37yutqb9pppapnab7yu0n5y0podl62t3juzy0k1a37llijsqhb4s2w96gxako351xgvs4iq8lcpda9nzkf1pwnp0r96lj3glg385d97cn6br6lxv4obryqnnta4t3n63z0wlbhnrvqkj4xgyt18xfkgh2u8gd5ka9h2jb4v4deirr5jxafelay0ugkpi5gqfdjgfyr8hnio7zlrufxzuyl4sr11wrzy4wb3mjtlcdvlqnawls4tk356mueng51e5dsxhdwe367ygup2d4yputox4ollncu6ux38heqsidxc2iykjr0bhal1zc6wnj34zmd5vsxap9m0kakd1vciphtchima8t1ttsoxk7yc8ixe2zv6x9aedgaw4bwni32hxbjhoge8ll8ogq8jnq2gds4fvsw2tmwbj0kzfw5n511r87tc1en2zrwrndqj4nf26xp13nq03oshiqtwb0e41rw736l1xm',
                proxyHost: 'eoltz7s49pvuh3g2j4e2sjsw9n3un16y9i7s32cy6zqj1g4fanevq2zvtvmb',
                proxyPort: 1177731554,
                destination: 'etwimzql9zrxf7lsav2nzi0phkuhdnzj90njq3h5k9vcruu5rj2jxxvs4vxf9m8vkowzhlq5if25h3u1508y4xr7fdndn022ef48dx3sqmr1va0mptqdg2dtumrygllbwnu4hwzxs3fbw7rxk8otdvcnu9bc2a6w',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3keqdpcjcmb1aas15w5cydq0ujpcn6odlzdjyknwfydmmfr0zso9hym7cgl80qky44e9wbzqc06rdprvua3p6wzweypihn5f6kcil7vx1mxgcb2ggnqms8wjpxu9uyzyc036430zxadwxpgozuuayqx96vu4bl11',
                responsibleUserAccountName: 't68ikxd9ntwkciaap9my',
                lastChangeUserAccount: 'pd79nnj8e1fp997l23fd',
                lastChangedAt: '2020-08-02 21:26:16',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '30xnx4dkaz3yckr431zjk8kssowbtxj9lx2w2qcf',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'ne4gsm8oh7voogr6ytt08j01p85gzb7cc6ai9qj22viccp0rpx',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'lx3hj0jynvej6fico248m',
                party: 'tgulqj0h9gjdh2v714vtk0lu50a68lwoau0f4c1f4osphpj4cyujkfy6fdyvwqtlfcx6agyknwnwjm5haap4eykxsugrpxspcei5f6z521g0axgyg8dg1rhfitja579cq7vit00r7yhf2q14s5emsehjyssc2ujo',
                component: 'pw9bqwa2vo1aspt8mypxir00meoeyglipabj1cwb9yuwl30njez52diskprkxm7vcqcb361cbwm805kdjsy3p8zg2u2fv62w42tzu338q7a5i7qqmi9e9cetic2nsdq4tc9s99s9gvtyweljl57tpjfeft3odxee',
                name: 'dj78a1gvl0x6bdcbifcbryu070bp5xzy1yutj32gp3mr93bh13s9n7oig0a7xchvsfn7m8e992qksgz2nxojjtgtd0217cs28lac1zeoif18c84xab08bgg1bnh78tjzmc671d9y4dgoehp52pzfr9gqvewivqtl',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '69xrhan3s8tc2gfrleja88x85p1shh1ope64j4jytd4z2k3ql9p9rdwdf2q43vf5akzp0wgd694csk9rpli8hrrroomzowhgqxeda3flrhgcg2gcz3v486fpx7wozd3x52m792g3egtgpn27iv1dpt58zcmu7ls8',
                flowComponent: 'zqij2lr5opk9tip8vm8cntbnvu1u5lplrg6gwl00jqvtozeb38qsetibai94jqyuwvfnfzzjsawacdv07r9g876wuf1ff3r4l29grxv3uapkqpso2pe8q33qhw8ro6w5q66kkglfd00h162cf6rqp6974upcwz5r',
                flowInterfaceName: 'kgzytz7zje6q0wfdohodkt4tadzx6wbkpw5w90o0zqysb86wh8chim1rlbw938c5b3zj6s726746xnlm18ki7r75iqbtt5ksnvc1ewwowj8bp5xnwldmqxlo2t0dhrbm1u8qsvejhjkm13jfeatppops0od26s2c',
                flowInterfaceNamespace: '1pdfyus970j8326a7ll75w3i514e6uu4icvmllwnh0961m158y2rqkp8vaxamiyn5k0z2jy89j5lgy98teas1ujdo3eu3clyo4wcy07hz6pmhuddjwk1lob5y4poawtsgzu894wb5lz1f4se3997gxbnyr9waomy',
                version: 'aj4ukmseper5yhv9klim',
                adapterType: 'wzkr5m7zjiwmwcjwuop9lbffca1buw1tvnw4mdo5vwosofohmhscceovbbmf',
                direction: 'SENDER',
                transportProtocol: '040kmj13q6t7xmslii52fykp417zkmsgb7sv0a54szr9exsm04ljzuoco8x9',
                messageProtocol: 'pk72jcul09jd03i7igzeqevvay5cn4776uymobcjwocph4qv12e22q09ju6f',
                adapterEngineName: 'ob6vfjf2mcax82rla0r8clbc78eqyxrklmk38kcpll7j7vtyuetrl1qjp2e59ker1b2ttgt0ejbwxmgfy0i0lbsk7nomxcrdmcvijej98ylqvlxh8ccjck2icoounmzbv4vyvkhw5fw1178zuwevlcyghohq2e4i',
                url: '7356h7toehtqw797r9rwxllz7inmstw0iwh0sxhdantc974217a7co0xrg6sg08cuiby4w40s2u0fbo1bc2ltqbgz87g66yz181ydhhenc3ok0h54w16y2v1zogn0ztf5uhxobos0hqlkyi7fpv6q85468y8auffxij56dpm8ij3o0tngjnlj78h1s4i1z40ig3nyg76hin8s64ar6398yhn91wnuutyq3grlg9dgmywv9jvq47fe50329xf2mlar2gsxmp1a8ytmx820l76ienr7j47ijiriczhb24j58a6rkuqavet2rg0lird0vkc',
                username: '41875w9216u0e9i69a8dyywyhp96jj1s07eofff2z4vg6e9qbxrxmydzcwbt',
                remoteHost: 'xze39ynefjkobpjutvz9771glqey8fyf7fop3l25q8gafaermizhjtlimdg5yzm786so2ak409vfo7gf4jfb0uth11by1lms90vhj8lqe3bfcl0hnvlywicdkp870woqfq480fqsocjko31jb5wobwsw0zjlyrm8',
                remotePort: 4324707440,
                directory: 'bjj7lae96chkmfncjk0uk83ae1qew5wlfc8m4nk1opkbqbuhna2xrxiw4u8czlrqj83h2eca284gz4kx5d42efj26hbs9d3ur56ieor76xlot7v3m5eubw30lh5eiphhoe67x5erzj7ecchw0poe2v3nvfm9jggna79qcbgn1f3aikrb6r5ryqy5x65zywif7dz6kkfmbm7s82gfzbbb1buknuzmwvgi7kz4s7hnbq77rtoci5c3ctkb027yem047envea41zwq7k3ypgywu7u1oloj6mgd6mcseughzynthvq2u44lp5fqpinfgbca45nu5rc4pd3yrjr6y9ete7lqbpkr6x503cdys988sqg21pe0bwezaeo15mgj1jaj29mkqbn5i5o7v3euwmb2djawr1xw2pvogrs6zyr5aotcgy606760vmi5217l6wkwo91tdlil2w4tya086e0g0902idq40e8g4op9kr959nxrhhnj7c6y70lwd4y66ytq48l36bn2mt0jgwkc9h149n5jm51rzfj1m7rprnlyjl1x6psex460zbd0zwmobxfpysedqfwnuz5rzkpojdqs29ef3c73hjy3jkew3pl0k4wjrjgp51wozlpt9uoseptappjackhyaga48u0cvvbifsicu3i9rshiz9l238592ci9mfp940r7bit0bjxaecdmoweji57ua38bnf7xp9xvr7ebttbd47kf1lj5edi5c2gkjbehstfuqnzbuf3wfe5n4ml7izbiugjtuie6fufxkzht1852c8zlsndeh33f6e83pkxo2ozslpjgof5mo1zm4pp1emm6f2t5wxtbjk0qic64cvvqo0yr38ltxuxw6nqfbz2lkegg41twfhmhmznourxnkjutcn17t8yxb3qmufbaazo1mmcgfwtiu00uazybusxfosbpv20543gd0sf85dsd4m0ubrrthp1mrqiskkq7u59lz3s6s2744enus7rhpsv390w351d1i6b686a8y',
                fileSchema: 'k23w92n7z3sflq6egwtktivcfbd8kjiqzyd9mhuh3iexb70hz5dwh31dt4xp59wa2cnrqoy0bzefcg1r8278airmcim16vw7y55qeud6qsx8u2zu9fknx9qqtfhk09a1uq2jm53fepctf0wnemxxamr0s3d5toobtv41itdu0jqz8akoe8zhjq6hny150f9cwqr8ak00eel8de3j8lykzlixtsnyh12talteueocvb87n5jpf09f9d8hyfrwteglcuxcc7dmejjettjls462cx6ywagdd39qwi1u14rb8z8wxbiw1t6l70qevq3tk3ltb5iotm3ogq0bilikyfo7n05qohfmywmu7rf3dszhinoznickgd1cjgphv1zjm60g2rbgacd6rxnlrhd0379031zoaq6fzod4ueouhh29gqfilniaqwkf1c0kiode8ayjarhufnrehsb7ulblqtbuhjng1qkvcqya1kp2g5gp9trn4xdzjul678yjurjrd0fp7aci8pjm8adv5pdvi2lzwkupbp5zabjabk2ajabdf8h0trzakjp21kxk90vmdmmt6rlezbjsrpy44l4tk70t8mvmaab9a7lruk5d1u126qebopojlxnx2t30vys17jg00a40x6qorq8yiu2sgzqv8kfawbb206gimjqm9xi1pqzl1grw2px9lzn0674omwe2bfi1utmoyj0mcic5j3puklofadlp0sfia09miigj9jvrqwn01w0hns0p0v53kq2azka6129c3wqrfigf5wys6fdxyejx0xru6mnc4xoekoy6uwnvbebu88nm66wexexgdjx8ioiu1tvn2xc0kjoa15299y2dj37nbdmq58c0n4rchwjc1v6plr1qh4yq3n6dgl986l8y57ag5vscm3ilzuxmi1xi5zpi4sgx55zkgo9nzxehscsvp356rkwdx3kxziz03ruskqtvow5v0f45fo1ci1qxp9uhzw7vwwn1b0ez8hx0aqi1sdshrt44d3kv',
                proxyHost: 'dksr1b6npaacin49cb9nbjar5oelyrq415j7rtrtvpt42l3a7b9rcfnutpvg',
                proxyPort: 7244349132,
                destination: 'gklkggilwdtpawgt2nvrfphakhfm8qjgrcfmlk9v4mh32ygf9pid6rhqqgkd3t4xb4hx87n2j0ottd085t7di4k6dqmkv26xhzc1bu7mihb77mwn0mu3i7uzkgu43farhfkjdcjtcw1rgjo1lo4e08zf5ylzfnt0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'c7ztvd7h467dxs32uybywkwt4h4jltk1wqvg69h7d8sw582e7u9ep2hcfucgnx13am6bdoq89vlylq8ky9aqxp375yxeng5uz971tzapkblvehqcyp8lyilj6d4dxg4qsa0l2tykqfvdxwdpuo8clk78hen710tx',
                responsibleUserAccountName: 'dxgpoa3ge0elx23uhwi3',
                lastChangeUserAccount: '0fahu9umqzy1gh1mnd5u',
                lastChangedAt: '2020-08-02 21:51:00',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'b4jucqqk9dx6dk9fc70515hm68u2b63wjqswtpjp',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '2qh4jjz9s6y3od4nhmzt6jvxoobh93qbapvevnpmjq9drbyo7l',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '35xt5rdpznzvevqx4ss5',
                party: '0y98tqmrpuznb4zhnokettvnh27e7xwgvumj8r3bzitwpie7vi5j9do3a3rksfipbucqsvbrnx8xlptvsdojuad6ylarr8ggjhrqtorac3yf7h4uqpiyb5b7d4sv0npmdldjzo71nqw3l52dqsflkwx8ao6lxa5v1',
                component: 'r40x8y7muv0d5l4f6eui4vul0js6lbdcu896y9i1rp3kszggp9yf20zemj6wmr1f4475anu1bi9wvn0a24o7u7uely9kl4z2dvfdjotagm5ps7lc5sb57f8us3kogykhfpjs8a46i1x1x1plfag7p1psw2ne5ejj',
                name: '4kjadkt44z8keg3jztanab2dloyubg1we8cuns2mxrm64q4mu0cuz4ic2r4ha6udt72puqhecdy5ftkacz4unvpkyx9gjt9ixo8cw2eq1j8we1orct4v0uxi9g9n0gci8r0c5mlv48k9zvukj537jugaesutc4wc',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'jhphd6u7prvh6map628l7349bc79bseblhb8xf8vy2zx9cuvwindy8rfo9b2bmr64ndh8dmoz3arjbjnkvcl4qqxs5wo0ivc1csojvq15e8ngk19ljvs6gqdu8xw4a0n43qt5j64hode0zpdkbzgrsmgl1cdjvrm',
                flowComponent: 'iupolqarutagh6wvnqgh5ms7pphreerruk523b83ed29xjj0fyacx5zo7fdsdlup8ln9rrckab8nsrrboamjyhnhu5g5rnjppfc1dd0mesucuqxq9vg9n738z3rz4uk3ryeigsjemc1m3tkxjzaividehiq2gf8g',
                flowInterfaceName: 'tubk4j3886kxj3dz8y7qp592u80kc12wggjje4yzqxmspk2onqxu9czr1kuoe65xaqdhd99uwdl6muphqgf7kv1hud43okj054qum0i9bop1c4wob821a6755x5u0vm0uxu71bhssseojaktlr19s1twvdiljgox',
                flowInterfaceNamespace: '3eeakjf1op2c64xqidlw8o3e1jafti81178tnxbtnddvf0cey2hbgvrs16t3veb2zu3t3r8kwpu71s78jnuyarx8uwuprsxwf3ixeyveyi2fz0ict6cqmnt2hg06y9kb07n0hhl91v6em9dxm09qlqp9gedewp1f',
                version: 'cfju2zlfbyazat83bhbs',
                adapterType: '38xqrlbm5wzeej2ugqcbi46yd02y2p1ol60y4ncx5bt00805a01v5a06ql5t',
                direction: 'SENDER',
                transportProtocol: 'zjlp6lwqxnvfd6ezjukw951svwyr0td2ml2h3gq6bhdudii4h5m4qrv77jp5',
                messageProtocol: 'r4d8qx6rbiesqbdqnz2jt2q8tvpin73wfz0ule6yrfrqrpii8lg4bkez0kpt',
                adapterEngineName: 'dfzf2cdrgd9t6btxf4kk11hbver8a5m1ghkjqf3t0twnwtr2kqmsdlv6sixbk4gwaop6aclhjrocsi9brf8p0aa7g60m7uges6y02i05ifx6mcaryekmom75nevkg76zl0zqw5qbrpwj55z8z77oi16zm6lqtj3o',
                url: 'eehl7tmhnz4nhwi7pf77vll4dskewrr5n1vjshd9mutsksjtbrm6y50gvo1tc5gzwc7lk5fv5ceo0pa24ivwa2rpv9u05oj28ugo63nq8167w7tki00cqmm5m55w19rk6ptfnr9ir9tuixi2mqocxlym4texe7utkxxhbnzmd749x64ag1qguv8ir6sv37ump1uy1clo4bwyqpe8ih5vtl2e77yj7xxw8pfvip9ir4io41li78hgzggebnhph8qbzguxpbbzg20w8eiu1mhu67imnt23gdn9tx00mbloeadm42ulhgegm01oelbqm9tr',
                username: 'pjz65fzsl4yl20wzw43rsi1m4n8mbvsk2zzzemql5fbwn3alxjyah2zz3thr',
                remoteHost: 'm535c2uwwkunq3qu0zz4nbj0pqqu8wgp46mdq2qndt70nbzxo3tmil9t4h4fbbpar1alt2d947pu22vs7nid4jhczdev26wcexa4odl9ktye3rjb4zdstow85p7uxxlbr35vcknian983wiklk5542njj2nqv6oq',
                remotePort: 9854383748,
                directory: 'px88a30kgjctnfkze1fzia79iwt908u5rwig2uihccdd0v1dryz6588pxjpk2g1nuwci6a0gh5p2nljv5no3edonpnyvveynpqvgawqy81wkdd527aw5rxs0lvgc2a1iuy2sbr8ixoe525s7u8e6s0vk55qtuwalc9eqebnf0xer7xm7vcvaf1mnt8i7a6ftlqj7q7mdouc3v4hpb2pie4db929vnuf3v4lxw69cyrdnbnco3s8td9l3izp94ytj780rg6yiqnzxk4h72hrrqd3d656pzdyo4buoo5is2xfl4odxpvfqzub1y5q1b2t7ukr5rp2o60i9z9qrvbypwtilvvm8ka4hult1o0iq5txvn6gg8n4tejjfigu38znrxmksfhdhvke1dzxulf2isjrleaashjx1hyzcxbhl9pzdcksebrxotxmb35zsn4j71dbptxa05ghn1zooo70mfhtc03g97q62o5ygsmkg3wmm0tyx78thri6n20a711s63bx56rbknxvuwinmpyk6e2nmwgnjx6plm0qmk182uubrv58hcyom7gcirsm28yg25c1j4sms6h643qdts9h0my3yu4jw2sz0ms70bxh73oqmytcbbs4eeezsiw3uu5hlo4svjro2b9zo0ogv3oy42pxbs09smpvs431mmqqoapo27i7b29h3qlftk9zs7zbc27oe969eoukpltycoj40xi5xc988z91mm2m287stzig0zrng6adv36h3g6ilel8tgjuny58zprrfpo3kb54sglfqsznedb2wa1kuzzidystf6cgnhibmgelsem4tin90l9j8w0bpgu7vzgtrgv11syowe0dtnzddroyqpgzf9stqqchm8v98sex5zcs18yyxlsglvmyepmoyis4re67n7szglffr8la9vc8uphaldxpzanao1ze0nqns1vws3ebr58ty0159zdoga423zkr84yl8z0bwnp1ddv5cva6qqedshrspl1r84babvxce863j',
                fileSchema: '32w92o5q8ps8k1wx5ywf1a427qumjvpx7pvyztzytjbj4srvx9zjltkl5el9ka3xbscpren4ebtq5h6txanl5c3t0o8o2zg91yvrpez3693c4uni8ywbc67emqyah9uy86ny8xpkutp4om3b73bwbg3a7elzzmyhf0re5318zohsmwc09u4d52qwfrg61g9vwnpcdo9iqozzw7oazrn74mnypboxo9egr4g5983whoq0tmklxlq2n61f0ldz3tqwjjaf655qkpzgzvrrdh63b43e59sgqk3rgbtxweuhejsmdt7hbmmnka6frnf4zfd0mqdxbrce61yut8vgmxbg3ha6r72t0fqlkbi6ramz989obmcs3tpbep6os3b0qmmfhix86qxd8gs65reh5x3pj2t269m4jio4nrcblakz877qnw3zv2jrpc1u3m0jitm0za0pg4ygmi4t4yafqw8wimpafgxlfxug4aqemy0v6ghlqa7xansifeo0hofwv7n8nlqc7uase2zyhm4eau8mypmk3rmsoxmszbpz9ks6oj3gj774xkvf5bzqcwzdewxkiiszavp17l5eiai78wwhfwrc8pz67zb5hpuas9tmmr4gnbi4wb0yugsiko4w9wny2ff08g3e1t3tx31slsw9smmuntoele5ooyfdgndk035yub6529vgd17q0f69rl2dgp75atlqucql639a9rfqggataflc5xqf9ai0b6vcp8kmz7tj7trbybhs4v83bg0h2wof3i9vuhqedg4cilqedfjnbkois5zoktd932eyrwyux4m47f5wnxi7fp98kaddmb3ixa3isxroifxls66mwihgi4q78m5izbgq3n2d9ent8bhvsu04scguplfnlf5qis4wofk00j1ea4jhrtlqkmy03ba3tlz3icemvs6i7e7inv5gys796zcpz54mmyske62ifquw7vrh2film8sqapg29hxkx8u7ovh1or15um23avsh581o07z5yyy4z2k8',
                proxyHost: '4d7pw8tgpdvsetw2vgmeoznwn1b7938jf0boye65z0tikb5rua3o3b4ldlph',
                proxyPort: 6499644373,
                destination: 'o02wap26vvm475h24cxm558dag3hz0n9mxuk2c7ro7rdpir23lqdjcloyhn4mscrnu33x3jztf6gyod9senn5uyy8hqibdmhrne6ks6k4ne8drxlhoznbhmpzarngdypvm89wdrdw6f7bqj1df0lgomsax7dxnu6',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kwujbtet2k8hqtu8guzcdgsu18t6cvjdumayu23xh3fg3rxjm0stic6hc0934k412fj97p0o61oj08hcj421sdd87s8h6adp1zicu7t4xwml1jqnhgvznuf91buyauwgtardi2s5wxp155117cm33cwyvsefps77',
                responsibleUserAccountName: 'x4p64yqvwa84uikf3qkv',
                lastChangeUserAccount: 'ya0pqv5ejpfrjp8tw0z1',
                lastChangedAt: '2020-08-03 02:07:21',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'vcyauj1z26p6l2nj3d6yh241n71tjgudxhxud8b2',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'w0m22hwadzckm7l17fgxlj92hrk2pqpp6o31xnpzna80pi7i8u',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '7yg43k14el3kw4rtbxsx',
                party: '0lbfwcx662tlko3jqxtprnpw6vjwlgvey2d7gcat9hifzf6gmdps8richq4ttfps3iyp7xiuj2plnrej5m41nik1dvdgsa8aulnuszwt3d7shypmgm3w08wrgn6fu6ny82rjamcu15uc6bnhndz2q53cf4ha36th',
                component: 's5hmovb9b2xsbop3tby9nplgsr0pojsbre3djaly0tl26ngu72ghrrokqy3523z21zz3bd02zt41rto1e15y4bxy0i2uvn97wyq31nd7dy0uznchjt23b8r6lezmohijwkvbbvep17b2jisch9v7pfqh6wq56toiq',
                name: 'zwzrx8uv5oztnnrpr1m339cy1bwbzvpeld7jds8f6qg9s7syu2k1g4dx0z3sb8zy8u4i5jrgnr4pjre9qsilbzpwsx2g5wdm9emfw0kdchifh90jh9cvavlm7fslm9rdm57n4bie9ax0o7xn39ku4lpybfv7t482',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'z1g9pej4ailj54zuurhen38sl8ljycksqw3s224y49irp19sh33hzchmigttorm4rjstv0zz4cq85n4o2ylwtm3tg5fynvdixegefwipahu5guchqocu1feip7azt9lud2wp1wruhv1fh8i0jko2f10v3bbkj4hm',
                flowComponent: 'kcq0o6rgk74yad08gcpnshkcsmdy9fauxihihh1fk5ygc3h6xk0cmgyhnpoe9u1za7spc13626y1tpy5am7s80ey5tn94pgjcyspiq3u7ok6gr1ngkvfrcdq3t3mplfwf9jyzu8etq8kcq1kvs8z8w5d9gox18ho',
                flowInterfaceName: 'd4lnc36dgisciggnd5revw448268nfig7tdg4n2ncigm4hfy87az5vextbwr1daisi7c2nxv8nrsp43hr5089w6d4994qkadvcvj8p9rt604vlwmywkmmuv4xvz65vuutroxtnrd3fns4e3u590wg7nx8yg4zgiw',
                flowInterfaceNamespace: 'a8ehwnd43bzrsqmx2tlag8a2gtipmio9vurhtv5famdepep60d67yytsep6b76ud3qhq3io6y0fshpurfslrkwp4dzp8g8jte2znos9uxh6ivl91w2zgskvqlnql2mere4l5toi2913mdq2w803wrfjgz0tf7aly',
                version: 'hd0rnpqpx3bxvzk4gwfz',
                adapterType: 'wsqi2ymy57hn3bfo1oxfj9ki4z5vjin79t6djynfbizxcven7wiwhyhclak6',
                direction: 'RECEIVER',
                transportProtocol: 'skzhmoroedd45y9n4a9nzq1svae45349zjn4vwabqr3bbx8zzke88divm4ic',
                messageProtocol: '9nk3n6vbobz0gylpn3n2lzowt9o8agckm743potdpwrbu17jgqz0kaz8sq3o',
                adapterEngineName: 'm3s70z29oerf75cctydkrtvogfs67aulpxvblegjk0pv37k1w0cotn6i5hbilbhevfvwx8edxhkc7mqbimo0owjxjg9ireuzbuowyhpyv18znjvn53bzkuzb1u9zkcqcbhc92er53tv775e9unvoak6p9649qc8s',
                url: '2rvezayra51njp1fuql3omajuidhq3zcansmbx0vdatvhqx9hlqdrfrcqgt2ef36evwmf0chkm3ixw81rxe2tecuo3j63xopu9gyviip2q8ckk2eqbicqhiyyv6zmpbe1elturzkj170uy6i60kz4cb1m4mquvxrwydtmsznm5wlomq3g2io94s1hjjp35sgax04uh922cyqd0xbtuymq7i4acm5m8gc5ei5hf5v8z3c4bfd0o7ou4e29xxy4lzzhfxxiq12umxkttiyuqq1i3mqk2d48rfzzs5un148utn7vn7y7ltoa92sj483ccn2',
                username: 'vd7z2j85vhzr9ptwfd62o7smt43d9cfm4i83x7s2yzxy0sc9uuwrkpoku44a',
                remoteHost: '69oehfyerzrj2in647k4x7v4tdh6e4qt1n788lnovqw3ikv88459w6xwe64m91do8j3o8kgs4pfrc4pa4lygkc41jg8qwmrkeptvpaxeulxjjwzchzqf7yboxilgi8xiryr53ooyftlgsvdxe2wx7q8ehqyvdun2',
                remotePort: 9048712483,
                directory: 'xrrptoj88iza6apb268rbrvhlqhs7zmw5v1p8lvxuddkavuxedc0hx587q7nlxqkixa06kd93f6940228v3awlfk0fgvx5l1zeyb0u3j2bd8lv26kugamtpc31kn1ewflipmbzmsd3t6ekn4djraoolh3ckztjyc01gqcdbescetnu7rnfq7w14zrxv72731kizy6smrm9xpm7kckk5ob3jum68g1kxvznwu1pgy1y4qydxg3wfvhm3nla5hxgh71hcq5b0kpascisxe2oybk16rbl9u7cwd1bgn2zvsihz4c8rlrjv7ul44ksrsetf2oprf1xxy66x8b8ytjh8y8ovh7q01474vk3obq8cbhvkb7z285ldxh08pgllp2vw2ne97a0hmxzmrdtl7fqlx8ojv009ic4cav26scvm21j158m337vq8wwr424t00orhelinhx3g4l142sazn86ulkhcdvgw19tqqnqpsne1zf9luftnpjpi6gqnw84lya10ymz5kesa5hyp8dwq20791lah8rywsv17at1ot26poy2j6bz1s6zlv44augg586zqul48bx78bvddoy05zam4nci1wptwm810aqeynuzk955v6wnwjsx57crnr8byefb7g24sujlnpp5tshmhcxieuiobi5vz74y96oefnwz8gjddddipefprrvd8cca3qs756zno3owfky0gurl6yzoirdsj0rasf6h40yvepo2w7eyvnhufvmer5lsm1e7dsrs1lrq0yndg2jh22utgdal1l9k6je7840r189qwa9tvehivfuqpr1rfby9dexc00708aowsr0t2kbipg21zf23oszspin86a5287kvzcbhsrxi4fn9toey8uvndne6e4q61icw8vztb84gdk90ae5gw3h4nmr0noddktmc6l6aukjm9uakl7wik1pegn5wz3166w3o2ashh0igughl2mkf68tppkmhxc5ershgxru6fovowuc2rv261uyilbjvfzh2y',
                fileSchema: 'mcyh7vv12lw8x612pavoy7wkyluzf8txbo4ai53ulfh7a38yo1cdly56dsh56m4ih0xf21sto8fcqahflm2aijo8d9znalrfexfk39dwcx0e385icrjlh3g65jxqomt5kosc4c8rikxuily7uctlven5i5o7i5ieqxxwr7iql5vqwprt83vbu34gsmh1sa7rns9s2ms6f5ucrlk5n0muywc1ihdqxq6gkna2fmpy5twrbom0t7m28xvqcmrhojt1flftdry5jyr5vcfg2a19ueeg6kcgima314lb3aohk5ou5rfzq3de5ugwny8rhnpp6aio0o0a34mcxw55jp9cssplxmizjrozy538n8wiga8rdmi65yrqcfd4wyt2nc98fjtm4ut8brk76zrk2g3xq7mqb5sk6k8j3rafzm4vgi8msyaw171r38ez0op1asn7hxll031r4452zyduqbgbo95mhiprmfwfckn04xog6ntx420974g0g4s65bg74q462ic04vrd9srl4vgizkyua5tx3x8677sct5j9yb2xn4y1hi22rl6j5j584hp99jf3g204h7naqwuoui26cwiapepv8yr0pc1w3bof6qcpjmv3tmapmkputkvt1vbqqt554r1ihrhjdkq3e7e3y7srdib4f21sa8dlvpn13ibdnjm39jor1yziedzojxqpkg7g4ovwchqc4u6jwbvtjhu22be400ey1gxm9ed6tui9urarhmdqn93ha0u3fy2p9ba8lfpff4cow8kom5en3qdw180p3u0pgm6747ckbrvib708zs1ysrmxuq16ab104yw2zycny8sho1hzd0uwneqjbuxagov104aqt0uelnrq4244053x5os06ihcgqqexb1yitzqclkkx9k3l6kuvz3qoixd9gs9d9fq1p8jttnps4xzba1xlut0jrnlqymf54guhjq4xq3xxtl1m9y62s2evozq1czzv1pewy3oo6sjaeoywq2nhqfkh86hyb92snp2',
                proxyHost: 'sm35qht0a3o1zk7mb4ft1o3pw5zwkpeidylpcxi04fir9h20apqiizs0jj9x',
                proxyPort: 3215202380,
                destination: 'rszw6h6ecqw5m1p82ypcaf9zwxsa61g0pmotgmpx7wynip3wy4hxfnq205jesjn91jva2kmxds381xvyge64d2s4e0jyxyks8ma7hwnqigeloi3ct65gunwq8f3iddrivazmo0w4lrna1a7wdzi9iwqmvq5gszlz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'sgilzbvii9fkg8ludvw7a5ms5ade7e3c75p1f5fmcmkniz7qlcjamnlkkmar5srmru9hx25q0ivr7j8zymc947ufhgapjx7zb120e2gxkkjlgskegs3jkfhqnqyxz4ao6wbmzgzkxopq4z5tqfw1zi467j8r3jg2',
                responsibleUserAccountName: 'h9bimx9fuihf7tbsuixe',
                lastChangeUserAccount: 'c2ja7uj2clzqz9vys3r5',
                lastChangedAt: '2020-08-03 09:37:04',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'i3b7k8wj1un6v0t72zxde8s53tr7ss4t2aoqi4iy',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '1lx4ccavdzp5troixo8q896irbwqr2dc8r2pxxa4alxqultbfa',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '2tbvnp0s8vxp6cuutb3e',
                party: 'fhlmou0cbwwxma4ms0m6pfcr5otzdcj7hfu0gll0h79pxtl5qn1dltmevtfxpywd1ogft4j2jeu2olmez9np2ekw1q37ggt6uoob5dlm9tzzi7vpqzav168lf1sxt8dk0ai4dg7wl2uj8qe038r77drk2qclsevp',
                component: '3y6r2ji2mcz2wgao6jdnr29dunvyvjr0mnpz8kak7z8b5443x7z8qkd6tvb62fdxvz13a9cak6chh1ba0ryp7px11wclm4bcew16hk0aktgzrpgciwznny55pxehv0cjueo7yh3vdbvtlpc8z6orlpcrplrfzq74',
                name: 'ksl953bww7eq23wg2x33ilel4w5f88kuxqc27c12panjxf2fkqlakap5giljma9mezrdgjqfmif5w8rjvhi4hbtwwn3ps69iqppkvbq8ut1katpvda001k07iqedfhn67c5rv0auyl47qqrppkut9nhr1lcjt5wxp',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'h9v376w9867y2d31ofw2l0q4ysl9otoqytgkgo0vuney9ej65pnv46jlcwrdzu4pnkb7so0a15fpbbwj5h43ocg4gstpr77dxge65mnjfp1z1tqi7qj1x6aldfvi91o5mes0bwq2kq9vlmryiw092elyg92y5nxg',
                flowComponent: 'yfbykfsgqpedoya20lqvlek9r31huwfsffws117t12h8hr3ms3nuzjbp7t9wx7lgauppf0eqpco5mtt6fmngqx8k6budzc99yfsn6xt7570hj045p7avrk35uvo957w6qlp8aqd1qycee5wmdp0v3kdfbiskmij2',
                flowInterfaceName: 'ga0x7t6d47r4h0h7f59fae35hplnkdwdy1lmu92zkkunqzar15c4os782grdsjjdy4i4sh1xoqjsms1m4zj9pepmxdqm5avcend7w2dxlhu680ge2dxpdzolftiapjhr8i246ezre2r1mxa43hjv45na0bozb90f',
                flowInterfaceNamespace: 'l23idjfff6s8ah311dd7kog7umvk40yaw7pfsjmy36eruef3xhkhjotqye15zbsi6qmj3w4c7kicmw21uolkxqlecoe4hwps978r6ttd2g039hqf0sfr2ahp5ac97tjumla5zi2kuwp3xdxofz4im9sf6lxqnel8',
                version: '1ednerwqhr0mm8xf6hiu',
                adapterType: 'a1h4xbrjkltisduj9inq06agi7dss70upi3qvv25csy5x2wxa4yxv0g3quoq',
                direction: 'SENDER',
                transportProtocol: 'a1d0pskaecrhmb4gsq2282iba3lq9jpiftg7dszu2l3ar1wn51azlpehv1cv',
                messageProtocol: '0ecmr29izabxt9o0ti0cdw52xhrq029zyjp0bzpnnifpn29qdkffatf3xxja',
                adapterEngineName: 'boy1on1kyjwf1njwz1c005dn2by5t8ml1rvr05g8aui50hr7u7gomrd93kbl5ja2mxo2bgvec9fdp7dhcxp5dyow448aunkauffm7byt5q2nma0c03piwvwmxoxx05zfuv9byl57jmfxmy493pd3wg10o1svyxpz',
                url: '9xrdz3jplh3flcjg3l5jo1jsllf5p9s7ovrrhnlvb5n3p6gyewd4equt9amx98fsq49efb19l7sw0jrvhilvpey6s4pku9qo9216j46urvfrcjce5t088ijnkbd6hti2d1qsbgrdzz9d4j1qamebfcayeqicopw78w84ko8sex38h2chqgnp5kcq3bnwab0dd3p75p8ri2y50fv5tg39kdn4wvzth4xjkfiak7d6n2fvrc451rkp1s2rpxgasvk9gv50wuvq5vgu15ci2309267g4unqkb7dpjpqaeedh69tneyzjhbwdh0vjv0klnvz',
                username: '2fxw6b47t4b1pm5ylz97j7zimw0mvx0uigpe8zq1dlf8fdeyx5s9mwrtpibi',
                remoteHost: 'bhvhro4a8ut5rd3rnnpyl27axu4d69k3wysdc0yc0fha1dqf850wmtzjngv8rt5okw7d5mj12gmpagdf9nbuhzwzfm7aixdg9rw2lx4o37dbhe3ny5g3jpi6yr3syxiem75t2rh6b6uy37gzx0wrj8jwen4buem3',
                remotePort: 3411904223,
                directory: '6evuhs0pvza6a5cln37pv5sqifo3mdqayaij0u3dsrvhnd37nqbcmjr2fh0z91kcaqyu3vk9x3rbe90cjj8n3pydpxjjgd8ywfgcfkt8ylk1zo6rt1c5xgfe321xoukzxx4qqbydfn8whogyo97h7zesv1tzbsdvnbpztwsjut2yg4isp1bynk4rzxy61l3z9hrb7t8m1ge7j9lilal7chmrjoeu1a0ppcg94eyj1gu30m138sdaeiupk3b4beg4qesbmbr1zrv7kwxft90ncwveaudnfcidipp42c8ktau9oi87y09ztrjf0tinfa62l20x2qmo601ntg88nb6m1xiv6w0a9deswqxqhjb6f27v55jv55f759f1m9igpbiba0mrn72cix2wwd84le9slvm7rd4lyo9chndzoryudt1za71h68gf49huny5r2vcpzyoevj4e6ht8gsvgip2hdw2cjwuinvkzenxp3t1gjvw8tmu9uvm1qpucilp7yd2ax8l05jftqdu4ufd8rih39g2q6oxmc9tus14dizsawcg0y1u685lwquurfvcrqifzc20el4wb4v2kl74kv3o6gavvkrs0i9o01ryojjhlddrehgd812sel4ylvue8ydg92qf56eyw7544p39rexslixjxd4kyyg5uuj4vqf2r41pyojlxp9igyx4u1pqpfqb1dmp7qyqca6g7bg4ps9g1bsseiquuh4jjoqah16tdw6c7d6yijuqxf2ron3erwr1mfmz9xyi9jsizkir0ln48zyz5cgdn331pa1q2ajfm2ioft1yrqzy7xknvkvnf6uc594jmv5w33u2l2dbaal62wm6wh4g562tvde2pee62i4sq5pzpkn56mkyopoz2ysu639scbwxvnmkqd7sjqr47rt2vappw8kspe5nfiickvq5k8ydf5tolvbgudkroo97v3fx4s8atfw7leaj7g92dvi7m6v9huc92f384w8i8annvoskftb4ta92loxznhg8m',
                fileSchema: 'a56k6lqtu137edgwzmbnfr0zzzn38pyrx6lto42nzl3h5rmatfsdt4pcntqlgnggcrfmre5vbkf14wab7qia31th6jp6qse59sqvrxo1ly5vz41y1pwo84z7qbts95lphnth0k8vr6rtsj6h37elarcqpmal90sqkhcxgtquy84u7p1sm1nrumd4j2j9bitq93kpwkci3tzycjl9olbw5sumb9mce81xddr8guykrsbxlojoh42zq9rajocco7c5v5clwt63b7ol84gfirmzboj7uzhsg5gjvi77q8ivlrkledimgtdv0ugtntynnwx9djxdrszka3k14y6mo27s5cx8gt34pn41b0pt5sxghmnuqo8kug3ndynogm64urhb9zbwxhjgj2edjx9fa2qinyvnd2h2thwt0qlwq4g0npkasowldkv8ed0fxndn9i2evmskxd7m501m9yteqwv8i0jnf7ili1yrh6pqph1q2if3ywsv57cn09w92l1uxmw4w6j3is1euu5l37ixs9sqpt1x6urxdvg8qhkoo4g7ei63hoo8jdnfj16uavmpxq3eyhhbk9jyxlqqnmxdnsgnamag3c7xahfkxbkk3j67uroamuxbix173z66wdsqf7taapjao8y3b2ic9zdf5azlrmzf2x2z26hc6peid2sv9zpgcjbczvff3er4pf5csnwntx0liu2slea62vsw5tibe5i8yjo315kuogzgyl2e0ix8ws2hsxrk8dq7i9e3ff01kgzwee89v108zne148f1shz2f4r3dcdxv0opewvxlrc2046m6pwzh7pankvebjoyvd734wm5m3ydbq9ezou7m6wm5mbunvp5z8jf4hlfuswl0loxmhwbbi481oxnynjmn0hi61tc8ii83q8v7raad7z1f2qwu7ul9437x93dfptq8ezuhhp05t0z4u35d4228r05698vm13h3bts7bhk4xyetsve8whtfxg6lu5w0vchprbc4owytbibvmmedkou',
                proxyHost: '9dbt6s1jn7amt995ayw40h2m2fyzgjytkgbc650j2is0ge2lccpavj3mgh96',
                proxyPort: 3672810264,
                destination: 'q7ecsme57wflr5f7khsj8009q4ghzg8gupmu4u1v63ggtpa85epqwrdbixwq58oljpbx6mzvuofo6eaxwp7vmyxezesjgbasdlve38k4u8kskuj99jqvwdtcwa0wtf050o93g4e8l92lzhdvzgy5t4a7me97mzm4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '0ls1vchepohoeauaqpuw0rj85t3gjp749mnnb52dhx7k6mlq47a2knusv5uaivgc92n65dmcafoh3hygmxnyjsxa8d34ip6lffdstsmopp9kd0km305q3ftof9w0s24uzz6jtn5ghcpf361v22yauxmu4re5l3st',
                responsibleUserAccountName: 'm29caruhrj810k4he9og',
                lastChangeUserAccount: 'rwadqzftew0rky4l9wmc',
                lastChangedAt: '2020-08-03 18:02:56',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '3wydqxljyl5524mwzc26bbysftui95ov51sx9xoc',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'upx8bboaizn5wipibpmfqsumh14cy3iooyq7ucfobixs7qkj36',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'akqbsvt0rob26y209yw6',
                party: 'bjo2peeqt5ywanpczflpqulk3hltz8luwcttq639shau7sjs7m358jt3kl573gtq1dppnyx84vilaeq29dc47899shc30b7txg1w5yl6hqrluvrnlhw3fzmwogjtt8lrtzb4fbu6ukaz6cpio7n7dshofijdqnw4',
                component: 'xfo8wkhu3i1plfbu4b5mfiwf1qhsabcjernpstk1l0zybtq1boupausyslyzgnu8asuhdkuw6t5fu6vxdorxv8d4prdgi52reobww49jv03qrpaedn45xztixp1s8rfcx99hvj91wgo3pm5vvvsepzs68vp1intn',
                name: 'sweijjm4e4eftfbldde2b2jmmdo8p1w78go9kff6qoptgas41ry4npuh346vy14xee9t3a5nasnqcdyxsyeammfujr9trc0hzxrahyk3vk6dpxyc552dq1md7r1nlaoa65kkryanmzy4r7hfj57zfue3xgamqibp',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '61ooe3254jfcz9h5p80ezdeieoj58tr1kdqtbpkgzv3qqodig62pkqwog1hteuvwvihb8pvjt8agqa6q2dznml7djspuflvs3pqhfypi039ze23xvfjkfgstl1k9gd6zui6zjkqok714kzhdk3e0iq412ei6i0wrs',
                flowComponent: 'ura9pj5jdpe9a2n86z9zqfdikqgxescxvl5j0w0qwy4imhq2xskt6o6cbdnqs34ru9kidv1p4imai42sys23o7lgmr7is8btf1sdyvdqmrjistol9dvg4qbo0yk90t256qw2nvirixgeobzwzxsil45lg7dva2w5',
                flowInterfaceName: 'ghn6xu57rsfu07ccmkufcwf6eilw2g0e5yc8o1q80vtv7rpqk7nwe7u5gz682z7r2q742tvabmgmpi6rejb21975p6x4wgr27rr9i5vujcx6hroqyhtqj3lof5cx7iia2jpd21vxmxa0qhpa90xdf2kpqbxkfmlj',
                flowInterfaceNamespace: 'bzqqb4uzd45d0x1jmi5rdfpd58fqomwa6uc55gakaghm8i2ggj6j84oh3mkrk0yv3tmleza7a1zlb0hu88gohryl6l1fbf1dogfy881x8tx8xhf0mzoxtby8g3q2ghtjqrypnmnj1x9htcv67hp4kgml0eg6lhbw',
                version: 't4q41kzcfffowedd9q68',
                adapterType: 'ea9sklq0efqtebhyvt3utk1ovflgwnggg10289r3qkw81v575xwqf094pjkr',
                direction: 'RECEIVER',
                transportProtocol: '4amb37iext09wa0gh4d4gpzr476yz8xs03jvz0a2etbyndqm91d2l0fk1a93',
                messageProtocol: '2x7vmj8s5mrvd06z779rre3ibkyxtwf2oi9cqu54hk9dtue8fooj09m45muo',
                adapterEngineName: 'gv8gufesnurg2lro00peg8kzz6m0ta3o7awijpbha567h8k5dm1inq3utv13vlc9grldlgf9e5qdhpe7tq5yi26mwdh8tmc3jqalpmxfyen7ll1dex792of5466pz6wi309akn38k0xlgljqbfuhpnvixeiijh3j',
                url: 'qzai9bubsv81tg7jcwz3u4zyx667qfdwqnlownemlop5zl1osm23r3va9ikrva4gumiul65l2gz6h3b7cjf0nedn1bslkwulccawmg4bx2ma3qnykyyp8a6oi7nmw3ka71jwrt7wkhib8m8qq71d6onamxcz8dtgbghbavj4o7w44r62jxnn0tm92jqd28zwom2redh50cme9o1e879rr7ajjwa6nper5nh0cveqobttphsif00xkj1jwmpopc80cmvsuh4p1kw1vjkwxqdqturj87bimqeuhi6mue52gfjil911tqab6ae4aj1up23z',
                username: 'q13lxheut4ca69u4mb9c9reitohl9dmn9g6oculgzgpcf9ke8uc1g57t3iqg',
                remoteHost: 'nm21ziquwrqoh26dcme8ijlcf1pp85ec3ab6ccf31ynbq6n6akg9go5587kn0tr7ugo3lp43pul679mskm96dgdsgdjgokef9fegsk9mxepd97ym2ilwo669nyu6imtrco8vhkgb6xri291fz353xrwsrmk4weov',
                remotePort: 5555729274,
                directory: 'feijav72riixbbyhg0m3oaw08hcnkdemajaopui6ggy44311kvoahhzyodqxukuv6e8a8mv6w3fovwnvu1u0ujm3h6i0r3g0tl6uhq5r3662jgmkfayoh1vk0qao6xmqzhgesisy8gl8x6nkh2jnke0xv5oy1uw1akp46s2dj8rh09k0rodj2rud2kfuw3g5uuo7xx046zbtd4hh3nd3hlcldqo56top6mqxeomncbcjf0b15jr3pd53t85344vo3uhhgqkwdpxxbapceb80x3xw83auutzc708vjf1y103m4wm5wghqaq79m8e7ciso0tlm2suhssp4b3ynou6rcjxc3xtmeclgz30d0xrbdgwd4a56pij40jdavi2o1fa2irvhcrjclp3vqhi0he6ccew0uoefhcp70sg2hc7fbg5w8pj5swcps8mldr1l4wg0jaryf7cd25na9axkyet7sd8ce4wxh4z3p0mn3p04ch8ui7mt06zeo2fht4hfoas7jvgcbpctkpicmuigm51c1db1967tp2p6wvu2af8tmed0678rzv5kprprd2idv1kklb5jt9yxq0doj9l5ma38yjrxk7nu0sy374r6214kklh7ho3mcqokfbrbg9y67435q91g2r3jc6rioyga1k31sg6e4whu4zhayilwhymnw0hqfi9j1s5q1gvg6gs4uqxw9gebtj8goj29ryambljs1tpzhk1mfpzyr1001sllvu8pfe5jglhyp9a7rypv36yrn0ygbvhwme1m2801rhgciulwov5o245oo8rp4ni8f9fy9973dml0qqlzrgsxqbls7lg0t5i3vdycmhgpoulyqhm7onfqodcu639j3pyvjk7feklzuiteu7u698it76eefzj3qo9nrgfdjf3v9k5lo2bpe26nwym68cfhd37wfwjh0f3xm930fpul02otdx25ol8qgqo24gogl54bohtkpllbrtbnval10lhff7r9yqlh1aqbrnig8xmz6ewm8m00',
                fileSchema: 'umzd9lmngx5a1lsv6w1utzboz6akjl4y68l8bzzyv0mpxix4oct0cdai4eximpc1l6mbc2kuaglbk9gz07amvv3nk9n8gc2ccxh90wofnlr25k0lbvev7x6tm3lpklil8sa8l1pllz9zxg99v1k0piee5lrstqxcsv12ny4p7jw4gl45zynjags6lco4u1wqlvtuhbe4vqfkgleohkdwellksl8aoqcbirw3prgm9ayioloo44yjqh1dgd0jul03wtjfv0i51z8rwua1chj97lfhgfbkafy87qugae90kyz0uvw3rdzvw4rcv99i04lgzukot1n406o7yf641erjyot4qn2cmqtqeq54yhlnpq6m9sh1nxo5mi8mpwzs0mx2nacwmn3nto8ywsq9oo5mbdxw45kbbzhityr8nwtbgj6rafj6y83e0rgnzida0gnvwqxxbecx6bhakiqsi8uvapnjm17p7xm3sx62zm6hhvs9m8jdvy7l1n3boirl2ilzub96iglj62g1nyhpn9yvwitwmkaa4c8h7x997rudmn3jasybid2hi8qyz8fwn4ofq99auibfs3z54fw2hjdwvi3xydimsucsauocnft8krxrcnlhrxda2fdzeyn6e7g8z1aun75ojh0ssqyp62cnlofu6nj4qxu3lapthc9d4fqr4dl0j7c0znirhcwavdck0ksdzxz2wlwbgdewhwkd8s5pch05nsgv5brl2zuphjmq6xcq5o3ka8d89cb12c43ueyp5f8w01rr4w0uptmqev1s849av5mun0ow28s91x7dsb5gbx9dlzmykxwh59m6pr0r83hq2oei9tfun5xrsgodhikhcbrwpsgt9j05b24q0zlipncbrx6j0kck2bkrwi72x23k2hz1as828se6rz3vsyibs7t0pkcrkykg3e2vfe5f3ks9oigd3ay2zijxczaoy1i218m7plh7gsbiy2esyqcq5ewpawvcwbgo1z79gphogb929xwfvy53reqf',
                proxyHost: 'wd4ehj3cojlocof0w7t7xx49wzlwj0cdar31ifis97r0px8f8zjl8mr52r22',
                proxyPort: 9047440568,
                destination: 'e5l30iyffis8op4jstyr8smnsjsau126u36eyzxcwxkyws42xtmfw7mvz5whxw1bdkiagwgf14r7dta3x7cq1ra4b1ecxdc18d3v43e5htomotkoqy0xe2y3om2asjxuppxwgic4erenb47lmjl679i6zlleyl18',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '98i8n9gazeofbnbzrju1fnq1mw2t8lmcp4gu3tzo8lqj5856pg0evkj88c5uzoysskckxwona1ayywaqj747evud9r620vmzh5rkzssxpfs3yeg9c16cbnoicp9vq37a8w2m2j7if02smx21uvek95wbfw7ls41g',
                responsibleUserAccountName: 'r4m5vzkg2t679c303kej',
                lastChangeUserAccount: 'xccbqni3xq1zf9o2txww',
                lastChangedAt: '2020-08-03 03:43:27',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '3n0jg2wf4k2s3dlr7cc8l4u1eizfkprgm1ldfi4f',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '0bppd4pqgrf5cxhq1qi3hyma8tvlalqnobdlxt2dzd5y1eu60f',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '68l7zv38e675uvhbksct',
                party: 'iegl8v431py9acyxor9tktaesccsj56giqd1n35xdei48yyc9t09kff0nbafwfi7zrch39pkpcd4020t5aajx3no1spy21s1jvj1gslmc445t7z1p9p7p8u6962k2993byalkrgjrr4n7bjlpdrn1mm0xjodcqdo',
                component: 'sedjayawiljikfkgikqxvyhwip8cnjy2z43lwz2m16ewqzjz3dzvgnhec6bpinludobk2o4uqyc0o4sa4uqjer5l6kv1lzmzrpqw44w73skf343v4ysccs8ghvbz7x3xnayvgnvsljgcv003ptle50r10tzgca1d',
                name: 'qf73mloe8miv7lsi8b8vhij0c6p5v7u0li34smpetk0bjq68lo0yvi2x577jfzsd7fj4is7swra0df97c4iu8qsmuzy8jfxn9re6cvh9288v9cxgwzorr9io2uuavienolbhudf6res1s0rwxxl0rywj8k8f7s3c',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '6lkmhxje23xq51rnxwbbtczejh7m21bv92zzznigjio6hj016dpt51ej3abxwgtthv9k5ajxcgapw0kz205tn54n899e2nom4inosmflikq91swktbtg5ojkvrvlji9q84svjjmfeg8k71asks5xvt69j6jg8cva',
                flowComponent: '9fa51mu961fng3h9w7gdtwlon88abb26ubuc5qzbcdursncn3suqwe673eiev3bqwsb3mhn1ey5a8j1e1lsfr0hrtghr0f8f7zmzhg2ilc21apl7v3nihmixqvngjfzejj94xf6ibomuh4rl62x5hhkf88cy3f0ny',
                flowInterfaceName: '5huoc3az1j9oflazbboqw5c7r52iwa981ca7kfsc90diegfs06ps0pdjitt2tvdfdx0zqduz1fag9hn4ejua6zzelri7bhgzf2v3engfgkog1jt0ga2ylumterhulckmiyiu4yha7lu25kq7aweo3mpw40mxnwbm',
                flowInterfaceNamespace: 'xui2zltuxlng958peya79v0q7bk1ituieow08kqvwtemrbnifjeq01b6fzjswdj44jhbt8pp13grkge8pub44m5yloginjt68kjtfg02sjql7f7cfq10h1mbl2w6em1lv10aoz4377mn0slo4cpyfytbhojnm7ex',
                version: 'fsabcpv6divbwl1l3795',
                adapterType: '25zzu5ocpycr8z8tkh9e4kzqa8o8vm5sgaeh1u0g7owh9ov5968vsga1b8x2',
                direction: 'SENDER',
                transportProtocol: 'tx8g5b9htwpi71lrwzad4drt1r8km58vhvmnkv925d4jn790bz2fgvbn3o14',
                messageProtocol: 'opgp1q9154ogp7gbfmch4lp3m5sr2d4tylq3knjuo4ca7zh8h5dqx69613sk',
                adapterEngineName: 'hiyay5eqcefgpcruelcb5fhbo5s3kh3ubvhmvo1kc8h1umlcjggn5qwp9bj0hcgcr27jrb4j7ti7p9afnp7hk1pa34umfjuzmeeop1legznglii6bj6mnh206vavnj5b32qzfyqvgfd94g1ujvos7qbd4bdlx00v',
                url: 'fycjjyhwvv7f5ondlj04w6159rnbq38yqapeccp4tt3bh910xvwim5k0eeqyh3xn1bpkgspi2u1aog8gt6fdhcrmxfxeft7n3k8ql9u1q69j17vw7k0xhpc15p0w1kssu7eatrrygs7pw5ij3s33mny8jie9qfs7mlvsyiuzf8hhbtwqzsi9ubqdfvqxbvtf2m9c5a2ad1c6bgjk56e5js4lfc98xa4a1puhn76owc4tsksjc94rjp2vvd9sek7aly4hhy1x3l7nuw5vhxv9h2061spvr86ed0mauznqdax7s3jl6rtk51jy3ynwcgwd',
                username: 'zaqz9z0ghztfb9qox4paw2qx221kzeok9hnbu5167qv1zd7hf10w4x5qqb9k',
                remoteHost: 'jo3wq7rr01kgmnkr2o1i15qe7n2kqp342ej6zsm8izcsck243bgunnct8expz0pahrtzxw21lvhtzybod10ymzp9nm18nqu9xkq5e6gb8gpsvyayvof26q2ephna7lyd1yrexybc540ci9xzvb0i11sctnldygth',
                remotePort: 5279160422,
                directory: 'zcfmfp2cv98n8qpym43y8b0jbxglbvi4ddxf61sbs94owxgs78g8et6kh0jpdku9vfc0mctxzs7egq2xjwom17du13agpu8o2sy9nennhqw0wyp60c7htpxahu0umtszvp1t8az4tx4ul7s641csyruu6zaswoezhodmlitvezwqryk7cexgd4z1cewhuypd9pp9aqv10az7urn8wgm3g4bmtfflwc2vk0wggnfdr74ify6ayyb1lawc80hxxapywqoaj5fdh3139qy5uiovfyr0fz01yrpqx1lih7skd75tup02t5kpganaum4l44pagsddyjyc1rjutasqc2v86hc0mfi9otzrvpp06hc2nf65won34igoxi9xo1bnl71z38gczy8yyd99drjvcapw5goqsodqetr9iv1qqc8cmm4l06uptn0ia977b2eo6xfplc3r0y8qua7a8y36hgrwe4kmm97kx5nl1h0chgtl3owbogommq72se5uspigq73ifeey333cs9ftt3cf1b5v13gxwi33fkl9sjp83x454x59nefv3bvnoqmx539fzavspbogshutl2vd85cdh9w63x5d8k6jsxo9gp2xvq0or3g82bx7yf6dhepsn95vstj4oxcvs5hewm2nu6tbh5ihtaa1tg3x9j90jy5f6bzyhxsy47k58tpp8cpq83nwrnaaeimkbgfs2mf859tsiwptv38pnf4y0bfxzi331tb7b7s78i9b06msry2j9mznb4uzdgfwplz86zdausavn91dyifsugirhk6ezp7bm31jjvjucpjnirrva9p7vdd4rlixn1gqvvynnnxz1w29jewn8q6n6sxxgdrdwsd9opeyzirb3cdsu5khand6fsx59thto3v7kqqulnv86l0m7gmffj4axbxm78ivf1uyw0pv4bbs50918xgcv7x6mryty2jkl5cckc7nl6jyes8nx74bhxy5awq8l4cozd0w3i5803y3mgq55oqy0mzce5km72gq',
                fileSchema: 'z2bko1qbd27067513axvpk470birfarwdv0srfxuy4816r6w22146x96u5dvxxwisdpjsxabn4k97rgb1v8ig3g4ogi2vykzbet2ay7zzw5q1otip3lur0p43naxm2mcuvjwelhuc49ladmzr0alqx46kl7pfxol5p78g81yronhqp9qv2y9x3rv4j7hra3g958nuncyj1kj3dbrtkwew4645xioaf8axk41b66z6vp952omo52nkfjegz1v4tlvmj80uox5go02o1jd2kh0obzayhoqpta8by3dj4cjc1uc44al0i13m6fjy095nbep4mjmjok4ub3lthoptbbsae54uvjhngr3l3v25yg1xniyknu5sfm7chmwuj21qlwb1k6va3kad6h936noyfdiak5enx2dt1shn0lg4iwkwo8ahoaonr5n2w9ls2qxek5aks75ebx6vydh2c0y8cpf6h9paanr1h1muxg7oeafpx7hv62240k9mwdlw035lpz87s3e37cou0zee6id2i6pqyp3xmrj48kjg2mz2m2ebz2npqlg4xudzieg5ly68e0h97qbys1dunrxa2awseczzo0jvf9pbb27wmgjn9ylwu4l9gg47oyefjr10fqaxz5nyyhryjjhdvtq6km6e4pvlyh0f8yjh6qo6g23n2s4k4w1i51q8wkjcyz6qf6384agv0w8yqpuu8bcew2wez648rzaljtsw344qabt12xesrvauqbzmrrsekj5y225f5tc3lrprn60tgg4hyywcxegk96efv2psqwil8ktisswt75h2qo0fm9e8ora3mhsismr6pc85oxdzi3ct7c9g6hhg38h0ztnqxdi88waflfuaeo0g99w4u4eqbty5fc2t01c4vy2ms0irgsfysx2n1n3s0tj3thjdpdg7xw1wtoc7bvhhbrr8k4pgh8r36811as8bwi2dqo4uqjbdj1pt4lg415laumuu2o7ccndwv0xhxyycr0snkfb5r2jdfm96bm2',
                proxyHost: '7bbbln8cs225c0v5issdeuy2bizcvtw9xanpc6jjd1ywilz95icogfc1y39r',
                proxyPort: 5508062764,
                destination: 'zyoybb3xkwjqaxyaqsiriqe07kiny64ex18qrxq4a1dvpj964j12hxhoxxp8agifozitcm3qdlyvgn6naqr6yaezrj4oq7sm8ib1ywdau9mamerhmmtnlqwuaqzz404n7zbbmy1mzjdcfq02orbm50kx1epb9xwo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6uldgnvmmtwbgbtyxn5ohv9iii2zhfrj575pv5ckfjlhxhn01sgujudagctby0zqjhg4m3sfqu1x9gakbrv3zjoghkrw0qezzky2xpnxlmun3owgc9ybjwufntaq5fexszsud7krch1egocabfq5c21jzgcwumce',
                responsibleUserAccountName: 'r1mxkm41z2qifxityrno',
                lastChangeUserAccount: 'pr5vhbox1fcalkwx3pt9',
                lastChangedAt: '2020-08-03 16:52:11',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'xlwd6vi34yxgmmde4lhbxlbjtjr4wixi7axrwhk6',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '0fdat4u26cv80zwn7e97x6fx5kcfdz6ow34oc3y4mf1movm6sg',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'j5j0cg5d3uhj8tmhfjn9',
                party: 'mllwq9onug4e8v70dn4gwa1alzerh38n8at1axqgotkbvnfowcqc2ckaj7jf2ye0xjdpw9km3ynkm9tqjck3qnuckrx6wdbq4czc20yk01danv7glf667v5kfewv9ss4fh5aslww6f60uwpzznxgdjwijmo4lvm6',
                component: 'l0afayy5rthnynyzz6a9261zl9b3zy8jdzybdexwzw8uj19p2zqy24k2mtz6d7g6ipb22ycop6gfgs6expyl0vvxiaolhj0hy9s9j8b6zv5lelf9j9lrcmpj0igmd7t0ne5snqrpl59f41vux2g2ekooq6wjrdvk',
                name: 'rcs3whxw5p3o82z2t1ub6ohnc3bvogfm6vi7qq9qwqq0anwed6c5z6q8ap24vghvct0yhgh67xib2q2mtbzawqiiwc6jjp98f46s9k0iyqakaz1oyemca91myzdoeg1mhmutwkq771aaah7kamhwypnhpfcdvkld',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'qoy1ihag9kfq54xpza1zvcunes921gfyo3zv9v5zewzgqqy19hslcq7gxe7dzdb9yuc1spd05bbfmzruwrp0zxe8c4rcdy06rhuz4blfwgi2qllcufve3lt3xgrhu3sxldy8m8tl1qvf1i60kbsd47xd638fxbgn',
                flowComponent: 'wtjbcotcqc6ikse5fvds4z9e3f8lb0ijvni6m8ppsx23o5itgm58a34a634c382fnbxxsb130dikogagutu0bpt5dmhdrw1e1a2r1tbt9ob23npxnawf3c4vtwzs1mxz20i5fne1b5kk2i2ly9jg35wjjpgq0mli',
                flowInterfaceName: '7dderye8aldm8poe15t831yqm08ty9ebt2i9s7i450q7uy3kd9cilbuqscoy7pyj8qkyjnlnli6nxqe561ez1ten579coqx1uvpo7lrpsvrg9nas1wxpi0taft3k6mgl00utf1jqu5ie0ohj5a4igzgfbewjqltpc',
                flowInterfaceNamespace: 'n45628psxrih3l2y5spfam3eusm0gcw7rkrc5tvpnnf4yl2fgwtce4v97l3uxnilf3k91pst8ehb7bi99vlbp9g4czniq2u7n1e2xqoc48a5kuoihx2te2j8rah0642ott5hjcjdin0rau3sdz30xue5icdh76w2',
                version: 'xjmtt4qzh0qv4q4s6w4v',
                adapterType: '0u50d8zrf9brafpbeuafa1c3xd8zjfcxovgak1tfehhteqq1ymrk6y136p7j',
                direction: 'SENDER',
                transportProtocol: 'vwtcxn2n01z7942o3c74hnlbdfvl35ba0ivvqyoascv3kbh09ne48e7zikmq',
                messageProtocol: 'sbzd7fxb9z0r3gsjosyyvigxx0lz7b4zg4zc68usylh088ieqrey45w09a3z',
                adapterEngineName: 'qgmv7k2vjr6gi0k2pnki2q5q9d7mb0ekjwrtsaw6hcc0xkt4i7s8rsqftvgzt6434b4oqnicng3zfr3krqavlyzs5msytkr4iluwpw4a84cbnhnk3ixjv06vxf09bnut52v2vlzgoe68russ9lu9pvbfm30p6h07',
                url: 'z8o5su6fjdynwm254q8ejga4mq007pjc9bi1m3mjxpcnt0ezknvah3faqx126iliwyy8u2z8jtxvwvzsqx720dx0jqqg2wp01og3h42snayjy7cvqmcht2ozrveywhfoyacveybueoa5exkimthn4kt7zhpgtduag6d4ls1bwpktdhjbpxofg116bisyywrdbjoh8j8iazat99nuv3t7pljbt42zxykfzl81x2obvr5cg8onk7izlg1cwrxnizw524xici1fb8ypxtqofo0y376py24vbn36nbmhagigb42v3ej0za4p35ci57j19r5j',
                username: 'ewvu7wyp2w9y9w6hh0m2ebwrjna6nb5lceg1jllvmpr5jburygi1ha2wf3xd',
                remoteHost: 'zcuriiuvoeyn78v2ito2p2qg9itsqrj8n5j0kh1oulgp9k2ieqbwzwrq69oo92npsqtx30fz301n5u88ruzrpufwrisqi4t3w89lk2cd15q0bmmrygcvuxf9cauj3ek7sfuvyhtuxyydpzppy5uetq5z8a2wlx5n',
                remotePort: 7836175437,
                directory: 'xabl7dfhczdfgwewpuicottrrjfk6dea2ibzw81fgljue83wzs576zf1a6gcfj7gtiyx80tzg0nik6pl6rgymfgyz9o33c2xjmzd87n0qice6dfhvkmkblpcp0u9rls1enysp5n535mwzwl4mtg9ocgmjemt1qfcs921vfcnty9lswiixnjwk2qll0c7q552gh2vcojwhved1b1cyiuzguys8ds2q1m6un23k50h7115hb78k05s90zzlcuigul3gt6tptnevrft3qe5jjn56x96z4651wdrvp38a9ie7fe2xsjwmzzlo4t3jppspos6j4xlln9cd54xdinj4wox84h90ii4v6ea4qacgnhxk9voj3ic7e32fogu773walxdm798v7ddi94cuf9nfpa98mg9ry0mm63x6yupjx50wfu1z53vveysxtti1yono62psthmw3ttdo25pft7x8lrpryazh6obzb4qwwhlv8yeele8wsclgezbai2gg4hshznux0lksb2mwdu0f9khd2ekomus2vyr3w857pyqjrxidujjdsio24ix7qnmtp3rqo8amslkotfko7r6eqrm6417fvit8ibjec1i1ujsdiqdu9kjr262judgesz4p6vsrfrsr85o1edqumkqh64ib4z6earro19aceicbfbcoga85ecgue0d0inl76c56lgsa8228d4270igc0hs7zry2vyt9o529ojqcsh97dv0heqg0d221hkmcc39uhke0zx35qmgt6gya2pxnk26ca05w0pzsc81e2gxkmni1ytdk40d8lxnr6sdyxz6u9g0sbw5ccxegi31r4b4q2rgozesmjym1h37nv7wbizuqu2otrre5gg5l5e72mpd2hsbp0ml4dnyfmfoklihxu3qr7gd587p12ys2vhl1tfj72c058ypf64iz8xuzh1nkk26yebvu9zphublpk6wktmr6r7imxx7f0rdu79cv08ghtkmbs9c4tbc8wpsncnqagj9qsck0h2',
                fileSchema: '36jzhckqx1415n98b9ia89fx090vw7prixklf742j7d46a0he5k8a08icsrp0fwyp4kfjnv8zxhexu716ltvqm62vifddnisqvz1cgwg18tkzxnc3hs5wwto2c7ba2ub9yckk8mqp7pwhhygsg3f31dxrj3k2rnyb9godd2t6i5qjvmer27t0bcrsthrxpmc17bqpv4urbz8op9yxiu5as5mugdh0cn45s7vju1nxrv97rdvw38tskkzctv52wmv06qsgfj6134yqiuv3pzsuyhsx5uml8ubqw5o36u2s2ujen4sb6z8wx36zyp0h43ph5b9scxst42il6mt7s9yu212js3yupxt7qseayri9fe6sjn6tjdblf4j8iv9igobfeulynt30kbwn397ha2yf07koxt59v66j6kbbcq8pkfcpuf5zmzilmtm90w1s6u9q8vx4r400y9fbfg0vi3w61wamgvot4dus4vu97yxk3yr52two61fmcix56mnc0vva458r9g88vp4tt2m9vf326v4vpwu2v3ml6i7zmmpq4734t7y5wyd5ehcffsqd4ldekn662g72onm21ei9ti8xiek7npaa94xj4lns03pn75m12p25y5m2v54ujmvjaqw2k63nljcsw6sndtbtsw2srubssgd7j4cv46tvty7vjnq07t7wf5w1ivkonrtp1q6f89bm5eijc4ryi97f2q2n81hgz1r0m1ooova5d7hhl6w00x7syr7gn095b1hdk8sgklvt88qvx5otuq99j9q8m7v11xkkuuyy52sl28c15zjx5dytspn4jdeh8e7t1g6vtnt8dn4zz5qr5wzhepx8x50rlwv1aqsks3qw3zciv72qdo1yayu2o627c7yfdsx8mcou8vfrf0x9l15p7es3sqcgwcg91lu5efpcc0mjbe02m0bpvfx4h7giruw80srclebzgsao311whaak1fc7p7q0awp2afjdp13ksj5c7mj8nudgy06w25ilnwlcvjm',
                proxyHost: '6d4ek2wzkbwlongtks88yxv46oayl4l5mr06hq1p1yg1dqisxcwvuh2qynsl',
                proxyPort: 7191498406,
                destination: 'bdw8o80es2q8viebfkmz9oar62gg7jb0zsfxecuiyh9xa207bupt8ajlqk3e9gufgk6w6kh7xuuhcom4e1ozxf0eu3uaa17jz2xoouqk36aaiwtwbjcqvre194rbo9ytrhdu4r2thqktipz7hyv5clbg9aza5tl8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zv6uqezcrcjml5w6gfhabo2hg7l94ijgkwweodsqzrt0fmcgww5tarh0ln78rflfmdi3s39qrsj9vgqkv1vlvkgfgz90jjmx9ljaddwcuq1yckwhyoxlovilh0s4v2pw1c9l1esb820y87vpc77zqr7ml8az26ha',
                responsibleUserAccountName: '5y84tt2ppug0xyt6dlw3',
                lastChangeUserAccount: 'r2t9aedklge7dgnv26bo',
                lastChangedAt: '2020-08-03 07:12:44',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'fchnpemww42oyrl6efdnc08p20dycqrdg3oppmgs',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'ei2uzl2vvlcqdoawxz000k2sa02fv18faojz4l9ui41h6n1n6e',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'bu4f2inegwd9oc0hctnd',
                party: '4rtggqk7yubismidgq242icx04wjmus7buvnfdinlrfowvpc0rw27x1a7gdwuthxxwbs3weptbqhqddktf1bzcm7arvi60jmwz7g1cqssq18ap8b0birgf1bc3rxiuoa0gauejtxjh5q9rb6akcnv3d37rp6dop8',
                component: '9sbau4vqov7ruc9xfgili43ccl2mhshbqff5799829i1t1vd1a5qqmh9g8f9enqn1a5w5od86fhbhwq8nmpvteo2nqpr23848fkrhsnnh9eliws1f74puzq6oqm9mhq72vyr8adlpzluzma777p9nzpgusbpoiws',
                name: 'e63g2clb150zw0t2fvmkha0f7jukvrgyivyolxek3d8w64l0axrioag9ny9q2mhzlmcq1toun4837qzdj1pao4kvmy9ofv9j2h3xxkw03dgyynjei6isije3lpk00bx8ovf7ypu868yeybmso26bvjg6cg0rydc4',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'ifze498onleuppsifju4xtjzwqdshvrlhjuqokolvi1y8qkrrxchy7vr0qdunfulcfyg8xdqeo7996mzfnqb7vwyswbjk73wte5hk6mfos2gc0s1divq4natm73kwpx61e883658y72glwjhseggrgp6r7hf1gbk',
                flowComponent: 'se4fetklia3b2p5qbasrpo7oahsher7c2zt0i47c2fhqhirvk1rb76tca6zacwrht5fsejznzmbe7yuo60nlhu1wg1ztpu803i63pxawq8d95vs4s8lp07mhcq0zpew755dqapbqw6wwguo33bd02gnpajtb1gqi',
                flowInterfaceName: 'aiyjnz7v6pr9ypxhkid6pcr9y8y488mnpdvb6sju4iewo3eotfurpsiwy1k8zop7mg79tnfdzo37ssc2xc6lwtj5sfh0n8dljnbshcx152e4nng2amuznlt0rxsc91nvopw4abe2dnk2cm2302aeglowy7w84mdp',
                flowInterfaceNamespace: '7dhvq211qhnpihqdc84out27owe608g9fv44iegxp9qpspc0fkcyaqzrf8qdozbij0py66w09zy9nfiull4lolt2nqtxvy5z96hlwbb4o5u0zuw8fh155dfwtwbn8v7143199ozo7rvcv0qhxtnzelgi3uu114dck',
                version: 'x1gsdlja7oj6ruyjam54',
                adapterType: 'qisrc65giqb3ovgk7rsbc2mo000tgc9d1im3ixq486auf5fiwqdreuat6zxi',
                direction: 'SENDER',
                transportProtocol: 'nsrxm9gpzn09ha96lu6g6rvo4ynxol4k7dzvsqvu91psaaz38de8jj4lem8y',
                messageProtocol: 'epsjdz13rox6xkkvgbo8bw20jmbqpand1of50nzej531ss8afko75155iwss',
                adapterEngineName: '2botusltipit2imsl2xkmtzvbkwhtlgo0xjoc7oyfdrbflp7t6ptwf5h0fy5c5ou29e8bnq5rg9ljtu1o3bd8oefygy69ta39j4a5zvk1278flqxqgm6ningv19282h20mjpaaxs0k0en28ei915w6wqg4us1pe1',
                url: 'kkgt0d4at26q27ctw8ihfx8zx5igzosw911wrygf2ng9bljzrs0rtolvsltnyic3bppjdrxwsqnqfnn0x1scg0snq9qrbrmhz8f1mge1myok8xzzaploaa3ta3q62owddigm8mrx2jjlg5cd1jpndg80heu12qbr382g61khorbfrmfcunj7lvsncufw20ukzz5oicyb3uaevtbv8vdzfdvriuagtu3zr28pxkuoj8yohqwn2j05lllhojd2gf30y74dl1jchm7pcp7aqohjs70mctal59usnp4r9w20y7p63l7jxf43tcq2t5assu4f',
                username: 'rb5j4ctntu1qctbwcudl315w0stdfbfd16nliomzg9rj51zjg07t49dtxxo9',
                remoteHost: '7lg2jnb3pkfe1pcg80u4wrv63rhahvsbfysu3uzd9ja3zc6dpuf63wg39zq8w2caj7uabqh3o0k2w9ylien6gw48uto0jyahcpmpujlhxshbooigpf9539vvoin16esguh9a6myu3ub5nb9ph9kvuvbd42fmud7a',
                remotePort: 9479897106,
                directory: 'e1qs19bjdbhq8nxsaugi2ncyf7etx9brwfn1574ram9jhefc0nbiffhgsrapn48hh4k93togdg2f0qpd7q2bn9ipsarmjulzqp7rkgadtiwhg21smbi3n4ds0zr83jlb4a6t067ca65q3mok4tj64e4d3ges0m6sl8hj7pdnp07gld0x9ifktcqnumf8q8s6cpag69fifvxrn4a8xu7z99s6gjdcapibuxvo5jznstqks5zj8tucdsbt8vjdgjamnkqt14y63v6m731sfvxqpjxzbxvkkzxmzwye8asxk15eie5l4m455f9lyxd3ms6efvhcab5767k7ra9uz7b4yt62k2dp50smvdpc5fi0sva7n3tgdsriqphpccjnx638qphhf7knu4jjq7bf2wpxki5woitu3ftax206v5qhksesarw6qvposxyhdmhofxeomwhicybykuc02okll2kpej8fau4g7bxt1tqod5ltn152gn4sdl6b94y0hrwz26jr1sidt5o3xyfnablotbct9knzrw8kr53pt8ukabut7m872pe5zl147x41k9hq9em7t2ttfqi0lpn74b51sbo077f0szloj4xulx2tl9czb0grvt31zwx7zo90ja4osauqubecdv7qld2y1ctvwkxneg4ozvg82trqpqwewm8vyr4pro99ybfitvcpim06e9b0mc3rkgy03wrljvaved0i5ixa0n5kubh450ucb3jdde4d5b6deb4yb5o02zmoe16xk84xusmyf4gx6prr3e6y8ldmgttihwr4182gpkjuaj3nvfs19775s2lsfakqi9gslrf7tvydzg12dcfg7tq6otbrmt1ky1ua71puoscuyar3yeeso3r6h0nfyps1dno3bfq2jg92hra3or7ou6wh7soxgydghd7lc6t9ftx1n2v3qdttvc1ee3bvl2uwbxwpmbwn8uika67a5zbgbokwnakbm8pm1v0rnkd2wrgsz2a0xbduukf5fqklqif06rtq',
                fileSchema: '0adt0svin23yud0wubv6m8o62gx1z1zbcu0jn4p9b9cm6q1hbtxzimudz2468h4m0g713af1cswnq3fq7mti8znw90znqzjl8s6inbanbv7se9wu220mqdsece733jb53cw6p6wcina8zt36rdnsvwvhbxuwf2oey73cmjcbrqnie1fbbn5ftst2s771u7egi3r47mxsyf8zzt6ppqe1nmk8kdcmuhehrpbhd5mu448xa6485wywjzu4a0t4rhinrw9x4m5wqbgx26ct7xdd4xizomb33t20cprcf96vmjkz53tlyv0i7h8osx8shl0a6on2ical74kok5ixgga6yqh7z12xqbko3mx2evfrgpm2mln8l8mnhzbnjsgx6hw1qtjmu0r7ak3wnswwlsb2ss35h68rwwwcs6xwqo8fjxqcmylwreppwaqssjeu1bsi1qkaye4kj9czt17uao9k8j9x2z56t6xx2fw1nnhd57ph2ztj7fxd7ukmnq5egagpvjhg7n3huqjyogvmzexuqovyaze1nkpgj2f69nff3ecyo8sjwpv178wypcske378pmzgk31ssbwng1okel1n6bdr43r1w9bmtaueac7lfoli5b400r1mzlgidd9fixzrbugwf3m9r2bj8qxb85mx1vtb5wsieujn1s7o4vy67ft6ovycphu42zed1b26i0yl03hlucivetu0n53epp62lf00s3fgcufwi904i1hmpefweeo9hs1sl8luy8c5zut3uo6nr4dhgqk083k4qqjpfyzt7zh01ce668anm9x91vwzstvso2jg3zkzukyl0eue93j8f3ciqvr2noafofbdsr4ymq8451x1biq9zgfokmtvu2azo5z24z8z2w8gb93ce2x06baeuzdkf7yz77ubjundwzvkew1tbm65za6592a0asrbao557sxi8gm9a1ufuiw52w2y4030epi7yggec01qfgexcwflk1ai0zjidbrsizxe4lqug9306cqkpndh',
                proxyHost: 'wvf9eaxymo9wmqltob3dsoyijx6qvug58phq7e56lezueuoi1sz6cina6jeb',
                proxyPort: 2834662670,
                destination: 'rvfqr1spg1rhsievf42behmzqty943x9700z6z2gtpitt5dgzitdnoyaj32pnlkrhdjhrlnn6594ngm44k8pva62bvjmk842y6t70mo9vtay9p20q7d171t5rbl8qejukaadv882omc9ncwftmtz6hjsuvskhago',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '80vyr6ey2zsia426vixpzuk1ebq6gremmv46jqvg3ovrety6q7w4k07y1mih4yi7g4i13ntcbn7lpsc07k2zofx8iffwuwekye0fqjen8gqyo5gtp13zgsdp579y2a5yvl6lsi70xyys4uxtdc5xzj3qxt53j9sv',
                responsibleUserAccountName: '4e3hukmd5qfrbs738ylp',
                lastChangeUserAccount: 'zn51kv2kms847m71jvri',
                lastChangedAt: '2020-08-03 07:31:14',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'pjuk91gpfh0ez4iag6wega544w0sb41pju6lngdn',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'lu2yw0tkfkwjplee9gs3wgvm3vqtvb1lt45jfrimnjgeniv9xk',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '267ogme5j14nnpwio1b9',
                party: '9c7dy227r9k3103matiz1qj1embzuv1g7sow7zkv3m0t5nf1mxpahqf9y96cbijx9k8ohjodlcw3zyrnizsjejf03syayk54cgs9r5bmu9tacvvijojeryxylsljzxn9d5uvhddzwkj5tcu6i66ur6o10ujznhpj',
                component: 'ef41h8ooffdt8mc2721k1dtyxt2q0qdl6wwce7ohd8a7bie5gzjixdlli05devbv6fhol92iyfup2r8apb3ap6nzlxjlrw545cs2ovj1iissxbw8znoi86ggpe7pdo269oqx0ymei06xqh9sz1ix6hw8yu8eoxf4',
                name: 'bf7xqeifqfhogx8wi7o203hvnzn88mbul04gae0vi1wzolk56uvo8uafo8lvp7tykrjy8kibc52vyev93dlmme3xaw43clen6b2o1mye0q4o7pzbbrhen6itl8zuejcs1puo7oydw1s3artc0bf1kgdagq94315c',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'tamyocpsr0ttyirfc8mvbrnbob48i9uchdl8m84tvx3f7gycgqp08iohft6438eia0vtmiriiu5g8nmtnltkpsufxry8smzd8whcwdla0idd7grzbx5cp5phrbd9wf2omzmotaa1qag5kuz6zbl6nhywhy7h4hgc',
                flowComponent: 'n2rdqywmfo6dzaefho4y8nfirak5wa4t6th9elehwla8dt416zf17yk0klhisfyosu3afxayc6ajqfqm09aktl8k258wvofr4w52w1ler11pt1kop8c3nmu4sdja9abvuahaicz06d75skz71ev8e0ngakb8hb1r',
                flowInterfaceName: 'jl0chr44irgw5dkax1lo6mi4dm6tc3ujufu82yl8t10c2bcshgyh6juef4hxwqwqajbg4bvn2ql4ovtgdi70aen9650ts57rnwa664v48vc60653nu2jdxng16f4sou64te2hh25l8ge2zjorwtrwrsllysw41ii',
                flowInterfaceNamespace: 'qqzvkmooemljatu6a6vr8emdr7j9v191swlz1kcex9ck1awdto136il278t5yhf2c2ipzbu3hp6u5yrkucvfcm1i9rfe3xpvko5h4n1vxh8xo4yjudo4uw4ij4lujhhmuyua0gaa2uko4foka8wein8sp7epwxmi',
                version: 'phnfu88bztsn0jzkxm567',
                adapterType: '0hw1rb32yqcp69f4caa4u6tudqr7z6ljp1raxurwomt4nazt143og6vwtsih',
                direction: 'SENDER',
                transportProtocol: 'p4qoudzapyw3u1qo9alkuw6wft3d3a56g4imd3ywgs6mpyg11uz87vu23bri',
                messageProtocol: 'ukf8dg069anvegc6399vpk01rs8ha1m2dxp43qtpjxnkul1kwj400n8pjmhf',
                adapterEngineName: 'fagtsykv3gh44admhd4oioqbdkvp198014gk5feri52grow4rbncwmq4kjr9kl1ju3at4tx90ng1dpn8su5gcniapfk0mx9hzafv1ovppom53p80j5mm2h0h6iddbdlu8r4h1skbwbq21vadbav8086dzkms6i29',
                url: 'azsqig4c3okpi86763et2zxtq9i9fih86oiv5jwdemndzgsc999p6cuxmu5yjzcfqjckmtml88ptzuemjahc4x8ae4upztusrs66wzwwreqgt0kiomrhor6vy22a01okmfd9t8zw62gfit3samz8ht80tfom5x0ruvda9cpo59820sion3urt2aya3z1eg93ev6kji8sotup42vjlp0er5skywhervj2kw101bil3hldw9pwnjw5cacrjgaqufoxutxxzrmzntgm3qejav3oh3207z2od5biau7m40edaxnehobm60aq4a1ka3k6zmoc',
                username: '2r397qh58i4psywsx9fcvzt9am0sa0oyf2qmcne31ydipnchj7rb6pdrqyc6',
                remoteHost: 'jwkt8t5z2h447xp54bxgpsui74hxjbnz02pcujqi1612z5is85nb3eg2btjlbwes0apsxgp43zyvbgmse4u1cngslvpc6dkqlnbjb07okglm9lj3hr2b5he9nd0nz7xla676inzpdg70el5sjlnmvl1jtgqrkrt2',
                remotePort: 6703835407,
                directory: '8pia7w6vh0hc1sa34bgqrbsm13u38gal8oimqrn5ednw234fv1fqy4r7i0b6lqdcm34nhurj6i61vvctlrqjsmb9wmwtxxbsfoitz4rfc82s36yte717dlzw0txn68jzmjpvvg8epy5bnbjouo0kt25p79fbqku8ytgmu08g5g2n4za42eymhk79t3sx55c6hdhgre5ez5p5p93bsd7512mebmc449gz7ql1hhi7d1zrs02zwpvbc77z2kmw6pdq6ibn9bocae6jfi93s5ywfair3r7b47a4nv4fi8yhokbr79rg28g97k8vniljxgbqagap0oafjvvnfncroustpfzcrinhkyr05ydunycikstki4eyxz139us2bl0luaa805qjl2xhsntq5gz0dcjgjfsd6nvhe4wn1dj0xwgvpw9s9cq3o2x95heks6ucknwf8ywz0ialacgum0v5ylb38ntavlqsxbrbgn8tkk526n87dls571zfg59ctp0wc1x4axqcvc514yap4p3pqoawhmf2xa1um4cdpzcheledbgbcyhhy6eyvu5si8zymsx68rcytjm1cu9adnx6palr3t3woco5lma8h0w33s9k0dip0wa305fma2hqvp0fdp3cbjh6it6xkvfrhgnhl1nwknujbe8rowf4h4d701cn2whc02mnpcxat8oce2pwpskuz955mzuez4xovm4wy0czfbhy3i8cqdfabsp3drqevpdmiupnr968ijq8d4pp2s9ywblt2faod1ossx9b5z0uodytv2rpawbk5d05gxn3zsp51lat4l7928gv8b3zycvqjz8u9lhf524xuicoxkr3seuabvvx3a0uvuusq9ooi6snumxzvo02psyemv5y70ani9n6l38iap9bhmopmviy746naf3szc09tnkxwk77emp9tn9ndvzuttf3rhp1e7862t9t9vvr0wk11tp750t3x5p0adzk5e2zpq731qlgx830gnyn4znoe2us8qv6xj56w',
                fileSchema: '7fsmmgqifq9dkkow2r2khduk6d004wlgowblin00mirh7ektmnmbks2n22r3usz14a9g6qzpe8mx9dou8xhiubouuobzzai116j1t927cqru1uu8s13n6coud3wf0ms7wuglgl7lofx3biaio8pv1tpks1yd7q7yci8sz1nn57z6ggsudgbm9cs4kkea3944t7wmwj7cjlxu5u2iffx7fpwque7yeza1mhdqhy6e8q6ef5pmqnbdfddvkcaonysyp15qfhpv092w8tgrwx0thlg04gfvuvaovcufxdyl0vuzhxq3nokw5bmatgf1ch28aaowhwqm3qhzfmyjdckh5a66xq225m2yw8ijwkxuz5v7evnij8p8sodbifo3xbofqi3p2o83obwm7pc1u6ai8995zpabidstvvjilvca3eiuoxpdblfrq4px9tommv89e073b3gyo543if8xm7fbew3jdqjspnvc7u917etha5efam3j1wu0689t8huogcih98p7vowwo6iy5nr5scpjkeefe1av4si8ex38yuundj3d2dw90sybgsiwn6sb0mq5elgh2rr01mytcfzz9wfa79chs6d9zeurid8aljl7fyl5nn430usq8ph38ahhidy6xw8rw6ny5fz4yvtu5hj35ih2vekjn9d6osw34mgwh2dzg2uwozb94h6pyfv2sns68gyllgezibe0d607exedydgckk9putnr731onlyfcghedivqvwm37p0e3u98vgbih1muuma2w6ls310jh29d487obv6c8xeea1r6mgfupii4f9h1trgaziaanbyuqqsmx5a31jx49g75ycu8uwl2bc2k8uxzb4pfvv7ri0vgf107agg9si590mmh22c6lbdegikm2t8yb94u6t3x1y7ptcbz2x2xiycz9uecb6qffpgwz7kzh4rbvhxwcbhrvty5jykizu5nv02ysr2qisfhyxwy0puzf9o0ocjenvbmiqrcnei98t32ots8y3hy2gbb',
                proxyHost: '4l95fbsra4bum4ib9x6usfdpi3cyuehmzd468oh8shaffuow7y23dy3xiaql',
                proxyPort: 1795337954,
                destination: 'usv58ryxw3fs9pi9he6ufhxvjeewadvz0zyotdpuzmb6a5spzfi4xo05g3h12osb85m08wvzpar8ayae7wwubzpykug69l2k5h0y6l2lu6f96e25r1wtweyudlv88rqx8jkp19om3d83s8hq8te9fig2fl165sdz',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xb7a161w3tdnh4yq8t4ibghmee89708d5m8yc82omp4ozxnym8ktxtqx07boboa5yucfrsvi3djx1a0276l1q6tln3yajndborg83f01ogt9e4gx171nj8mg0tlojdkedwe3ehd6ecel3b37bx2y7agf8o5bqrxx',
                responsibleUserAccountName: 'bi5bz9l08lx93zck0cdm',
                lastChangeUserAccount: '3n395rn29vroi0nbh61m',
                lastChangedAt: '2020-08-03 09:59:53',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'douwn1nru68kncdn1krf22y018aowwq5yvjuwqtg',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'uz0zckjsgsu1dp09t7hvb4yaylaquallq5hh07bap7ix6rdqiz',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'a2hnmrovm4kr6s8vf68t',
                party: 'y8ewg2npa1f5cm2ro10xb2neonzv0yjvs6ax6ov6lqocvx64j8twgekrtv1wak3ivxp1xqfrwi3dmttaxbfx77ajtvx7v3eb0lm6lbb0oe9ysi6d2jkou0wdnxovw4pemesl1ccj499cr29c23ry4rb0lmnpsjze',
                component: 'yuyc5mvh3bz5c4ix7rwz5p7gmgg3sekusnq75xczj22wg9unp1el0r8kxisb7fgkj28in5ms0qoptcp2yb4aftgujxwkej984l7kuc1ah9971jqx70lmt9u09syhlfx8ivsmx077ysp3sjbg0651pxg1a3idyag5',
                name: 'mcgys5j3lyggyawyzux9udapwv77sg98h26t8gmjufh2etengnuclv91s8r5wuwrzl5kdjbhuqm1zb8t2r73c4vo0u5g9qi0h89ipt3n5lje42ceklvyh7ww81ir4d1fs6ns0rmtqh2lwcx9y0p4vdy9m6v04tay',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'taqtufm9o5kvq70ike5ld80rn97beh0efo8egh6tzaeatrcgj1yt931gmx6858c8zy5c966c2rjf4fjc4dqui5ooatinfnvykcteyc427mzxrtwq4b1men4xquzook6r466h2vq727ow166fuz6uqqwaupidguv9',
                flowComponent: 'zdqx924y42qra0s2ezxfnbrj6opqfgi9agxdu811ivn78g478m6fcvm5btb6pxjxruirbzutwhbeu2mp6ks31uymsywogxoa3cy0a51crvp5ndh5xrhs3zsq8qqkaglx9x3bbliiumh3m4bueovrocrfjq5mbkxp',
                flowInterfaceName: 'khxx51h8iska00oegepelqqbdmi1d9b0r1etm0zohk0bce42pagbzsiewu5ie3fkamo7wuzt0ncotn0ht1jr6gck92ll05kotmo6f056tfphqdvlizkmvd7a4xdt0h05aggpdp9i3qsdnzn1wc6385lym8vpq7d0',
                flowInterfaceNamespace: 'kagkbp684el2q4rof0he7430sh9edq1skw87bg3xe5avc9dwwgjajnfcs4c4s2hznlq5m9vix8awzz1s5qb1odvxqfkwrkktv77zgsn9z33md4noghqtnnsnwth4d3phhhgtvho73n5rlf8jiylxpxrm5flp0rc5',
                version: 'j1do2jtruxodjd44ovcm',
                adapterType: '6qgnmwosijt66nykj7brcy66c12o3dbxgzzj7qkwnkwp5hnragw4e7su0gif2',
                direction: 'SENDER',
                transportProtocol: '8rzy4tvhse116j94hezciw4kjf0bt0w9onk5jb272nogliygrsbl3ex36sg5',
                messageProtocol: '9tqixgljpyg36sv29ukqjkh0twlvwfpr9r08to30gw3z0sc5lznt4qxz4mov',
                adapterEngineName: 'jpw8bjp116ruqa1frbj244zcm1dh7zbqezsqpmhnzv4bgcdlrl12yyoi4btmmhih89o3gb8ytrri4hewqnsqe89a4scrgtwkhi470yxoi686b8c9zwncz7rsaoxvgpd2plrnveddy1o7fvsya1n5ri0fva5983nq',
                url: 'c5ugug3gjkoo616ok9zoer7bdnn9aqa0c1elbc92yrtyi6k3ge0rmlozkbj2jx03hxv5khhu7ikfunhzfwe8k4sus0cpa4619prw7jnug7z4pma5ou9r1s62iip1dc3gl1n5ybi1uvxefr8bi9sy30vqka4gnm0p2vzt6obgbhur1hr5d0prd5yzr45rj8toe2lqopfv42nw3xas6lqihrlld5zxvus5zae1y5dk2cvmjgmebrw9ucnwtjfi37ojdfdwr1457zafm3htrwcdqe2m26sj6c74m02k8qim8s8qsgn1fz5w82gc829mf4rq',
                username: 'q9ulqnrgcjizolca2y8gd5we72jdy9d4ig908k7kjm906xc42bxero2zo17f',
                remoteHost: 'q4cfgbuikx8enlbq1swvdqf5x07aiudpy2kacz4t89mcybcimw8ms190kdxj8g1rwmuhf1fvshbz5bgz8vgtv3b0ypde8fvooka5l5k5m8ng4ersrdndvxvfpscq1g562qt680n05cdb7hpv2vq1c8l91bx37v4w',
                remotePort: 3178817086,
                directory: 'culbh3sx34fvkbog12163b0qgvs5cuk4m0zorw804dvlcn37bts5olmibscytlaxfpcdnyxj1ht8338ty6p22wjsyd0l2d8umtde2klznotsdyls41vm43fa74k821k3ogdpr8xmhajmkvue6g4vbfn0mprxpcbilh7rrksl9dbcrxz9fxub94zs28s91zk8z14ofvajiye6q153e1yenlu92g1ii1vdpq0v1fvtp6b4dhg3ixck82i5ca4hhlyjlfs0q8e1t41ckp8nkgux99poastnh79o20x1uxorfgvwphrvh5v9j917kvzmsmeo9oabenx3g30li9eju48t9x9ze21yz7ucqma9nuj1yywtv3nx9lvp14nkh2hd00rdkqy5q5eghcq7vfs2xm89r6h07j4xfznd9yumrs1ij5xmmwt3v0y1nyrfdq9b849190qkvhrvjfb2n3q5cy0tska75esalxfjsvo0v3h2903smyptiuy8d6fmwnx503l3r0yg3aitkj2z4wbi2qtf51e275jnxuuvtpci4vx5dl76h7pfzcb9gtt9d6jd2f3sr3mh4o0qal1516i70ovw0jvveadipmlxbpjv2w4mh8718y8a9e4lnpxxna0h5vvagmglm20dyb3e0k5xdw2gcecnyzkevelg7n9un8zih6dbfuuirc8y3sgg8jckq7s6nv3erjui08q1xluk99nbp8t08o4guiper54wsdenmnir14flwwwcjgdit1q8sbhjsr65ea7axhmcoxcog0e5853wk3e6yygicecifxbhjyvd5te12k6qi5kaota7hslr8cr4aq2rmk2jh3tdb542qj5yse1c0vm0u5il642p8i4xg9yqs67ml5s4za3qv4t2nx3i6dzl3yrbhplmltuoum2fnd91zdlv5zymm4hvdlxjl8ih1rnh3ewposh2wdt0v2wd1ivvhqe63zgaet4qme2x4z9hjp3h5gfpc58p2gtcc4cvzi7jpkpmfcamx79e',
                fileSchema: '5k1wn6p8n9qjgr1sev03ldy729o1oyllo1p4oea6imlt8oij0iddczqd3wrh665npzpjrjjupl8svj9fzt8mgh3ukk6eo9jj3sss7n3a3js48zv8g6abtrqr04c27paz3xr4v7nx0w7x33hhh008oft8cgs7bysqkrqx92qbkigq9e92e25jekliqm7zl01ig36selnm3aloazc6rjv0h7inn20cupsbrs3g03e82iopd2gvmlb3cy1lr8mgt66ygc3joox764dfvizgu8p54hrfrsfgz1khjtxdegz8o9s1k7jzgu8hiaew5i09qam4l2cbcrx6tuiibq2pna8sx8iutsdc7697adxksccpvi81z7jdopxqu6gcku3yk2eayrdw5l84xce5gkaaebk93lg6uzgptxpmwbsgjuui5xyoq1xalbtfxlbozqmgcrutrcq4hjv88iyeunkxfeo557pr8lz6zwufzlabw0swfkil75edwbeoe2entuiqedfmq09omlp3dridpm15wv68f5gg6lpv1twi5jcimxhsegjxj61kmqgmketknpefdeohbvc3oi742ux3u1xe8dut38s2s2ae54z4xojdguttibkpxz3u4vsnuk0571h0f60wxatya5gimb71dsbubxy7diqrhiapigd4hqzw6zesyqs9h573bstt9zsgx1obgv46w4ecu8ospwthsvpl34b3y3y985r416mulc1b4qtiddd9pgq20frz5tv74tzigyudiexaidwqvoecm4cufh9vp92mazbza2f7smatigfp21atd8vj0mcff42tykot0rffb4ryqu5jvu6jfvinlft6pkh4w22mj98k9s08lb0kacxg3odqwbvrun8h67it0ph7lcav3ctp1cnxo7pkrvio2yt9kzzliyjrxc439p429v27dyvkbq2b107u216v4m5yef8eey7yvzn2torex1tklgp7rw0xv4gkbteaxcq01xtyn9w4k6qqgpnqap5l1r8i',
                proxyHost: 'o1r05f5wins45fcpjgcwk3al03k8ce5kdeltertpkyklyoclbl5juv6q25px',
                proxyPort: 4358231609,
                destination: 'dde2sfscel99qjn9a4txnjeg9e1m145kh3p1i6n2fvyk1ljrfr19ea6q0162tn2ajhykpgkkn5pb73pt800qg2yy4delzvp5ewya9t89gp91b0awhrne3bzvsdcn5lzqw7zba59klblk5c5ufvfrbp0xd9ahkp3o',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '53p4ykh3fuz4783lov6fxds3n7o42h7zphtiil9113ye857rwyts6xab7ijnf0yuv4fcqnsists4eiv7u42j52k8dzcfphipa330cp20w8azhl1gxioi3a9a7lmsyehh06kkdndkvb3wkgaytpjorry9owgk5768',
                responsibleUserAccountName: 'zmifck7bzrtg88kxqtvy',
                lastChangeUserAccount: '0mshngjrithyp5an0798',
                lastChangedAt: '2020-08-03 00:45:37',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'zwsf2z8m2ak7y78rhcrwlqax8qmpfbekx568a3u8',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'i90059ffsybp2s48s7z9z1h4j6zl3h6hpi74vjp29lv6024gij',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '0eboe849lzr8l2xnvrbq',
                party: '5x3hnoqix4jq4oisdi4p8nvgr4wffd76rquewspy5x3iqk61x1ji9mgtalfk376b3cacaebr9ocz474xmjq46isrqr2ruigry2u0vmysdrp3u4drxnugtbd7nnn0qymvf4zxe3jfmd1qlvdn87jocd1lbs0nb7g4',
                component: 'v6rlqc8rlcwk9am4k2a48hebn9sc6p17p17wws3ini742k6r3ce2kzba7ai5sq8sj3wx54uxf49q02om9mx5ury1x5hjiklzk0k7rib68mp0cpw7ik0qx714aegxsrnolfhocqthxduhx8g8iac3kryhvbrf6s78',
                name: 'k3yivg70gjvsf1vpvrkvp7mns5khzeen6xh0bborwpwrfna20f7lqz3mqqj5siefbfeph6pgd52sdun6hccdqjjpav7j7or8lx3bfu4tmy4qbghfkzrp24or1ij6sym2faot6smqsfwf5tqmwn2bwxra9ehpqj3s',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'v7nw96cvvr1mw5q2mksqy43ru1de3v99f05ws58wwrh9pmz5o6o6k8pun91st5oo9e98kya4ebqwgglbgo4eylkuhu3cxt91sjt25wctkldgfbf00ydn32n1t49tc3q7xta3u8pb4gf1qngfjuprmrjeag2e7brz',
                flowComponent: 'ayo0euz17zy00gyaipbazjzgdu7plfr7t10pz36wj25wlhcvl84hh2vtbibiyrlx7rfyz8nwh76ma2phqdlipmij0qlth50q2kg634h949xq7gisgjz0a8iuwfjqvirvakm8uvxh4wq5wilciz1rj808wl3izygf',
                flowInterfaceName: 'tcc672b1ux8uqu7b0yw0squ80g170noru77kic5iuxj12d0ad2yzw6spvwee3o81y84pjc92bq5ielcbnkhb2y60vkqau4myxl8kwrpm274hx7bvl6gfag6uq2uivuw49yuj2r16yvbdpozd1sk7u7znd0wr4mxd',
                flowInterfaceNamespace: 'rz1kyum1e1kjgc6qdw4p3y6ppghwgk8b4akcgmr2jzrl7usbzyepjn67ihvs5o19nd77s85l24kjx1o2oiwjfsh5sbrkzol03pasiln4k0740jbihw4y2lprsmz3leowvcjt9noydbu8rglry9iwyyi4bdgvcnjc',
                version: 'v377baeako6y0xnrqdoi',
                adapterType: '8nboo9kltquaot5m1vljmq1wsfpkdmdo6mgso4do6eo06488vssqiv0fbb9g',
                direction: 'RECEIVER',
                transportProtocol: '3bi5fyelpbghn290sxpmigqm2rggwlka196zriuzggkpaar9w2t6ow9ibvyci',
                messageProtocol: '36y5glxu37j1rngcu1c25friazisylxtcdwzsa4pcoxnlnupqg6pygo4ozas',
                adapterEngineName: 's3qk3zu193nyakm7e2ebx02zz8zesw8wpvjsu0zc43lzy2virfk8epxremku3ctecd34jhxnbeuic2ifx1x2hl8udilq7tgda56awdl7qd4yb7eru6xr8o89v62jqkh18dflfxrh81wiy2othhgqcbweph64bk15',
                url: '59d2jfsby1k9l8uv0ueqwne8klbonv4ramhblnngi3atf33bkeze1x2uvhyplwuonk7utdzp8lmbw0lorblwhhvxfvxsjgfq6ozlezuv56qv6riw6bozsna2cwzssh9jd1veubnzpa7t300kkl53lrouxu00k2fxxgsbd6rnyeoy4xc2c74ig6hy8yi7k0ruo5xqy143wfvqi5i4u669jacg0911sh37883eawzfvt70i170kd9sjz52quct96koslddl2gknida5tdx2oqtv5gys9upin1mdsc59b3z9dq87a7tkr8j8tqjgu99di40',
                username: '0yovurr4msjoodoa3h5otodtr3u8wvr79eg2iulvggtl9zlg8ns1emloaxg4',
                remoteHost: 'psgmkkz8s3m3x1gwj105c38on0ftkt7ehku6phijf7utidbpkkh0t8meusrdtw6bs8sd1ye05no10xo94m8anf22p2q2lnzpig1yi39n33e75atmquojaq31kf0538ko8y3mmh1nta9ks0f7xhxgnjdob2dmo5vu',
                remotePort: 4516887809,
                directory: 'hfuuc5353ycaleo05w2y3gnugssqgva0plze44pr6zbbx7fzdrog9ay5yeph1wkwtm4plvz7ux3p2ur4ka1hzxtqdxooqm2njj8fs3am16toc2noztwd9lgwfl3lxkqkd7um5zs45mstirn8y75nudarnq9152xaa6pd5933h7jef2p4ww0sd39w4zu3x9agxpu0omrhvegptw35eyvkhat007ixqclmowzuo8r9d8c4jj6j1q4ywz4n125ohdva0n4gya1z1tikxdorbit2b99e3egnxmqpqpdjl5ibfbddeev2djysx29hvlfrusmzdkzzdhl12b2948y97x19snbf3z9yq631cwe10s4cs7oi8g8m9ijeqsrfvlwp077sb1u46aehwknazm3jtql10llkeztxl95mu7brz77u73240yb2yfjxr459tg2s86ot1914m2nf94np26wwm6ig3e6gv15owo8fmbcsglifz4afx351pil89yebxh7y0sw1aqpwa6ok2thrlfu4if5yopmnfvylvikqhmwqmsdw86g4t6n932v5nfgjo0jaz8rd1ea4s9a2vvmc2m73fcqdq6sw6ly9fspr854o5p7pypbfzg3js61b7vjjuuq871oyljkmlwtdr9iu6cr4arakdggcl6vp3bd00uh6vclo45gpf8pv7wpm6liq1kgvc2ssb9lmdn1h15zfyn08t577vnuj66pf49p6lkaqqdvhlwoc62a4zrmfy2ddogeif6idi0qm99f246tbsd4reuyn13448iic222n66dtitj6v7gehgbtpiwix6mgmbz7hjw1p1zl9xq0f5s4gy5uvhszti7vcub35vbqy02udk2rjdvdcmtc0i7ck42sb0rp73h4k6o57tgunm4c1tea9qmfj5dqg67gxtwh1xt62mcv5iinhu8eyuzgjl0u5mdxb1j5at8jvcwvoavlz2k7qb9mpnw5vcn19e0kf09qlrgyvmpjryd86fs0use7h05he5fz',
                fileSchema: 'wbnw69bautnveznkklyo0twlto2nuceo9co6toq829pfd65f17vd2311arsvk5nmm35i4a15xkmei0gtz8kppnff8vrzwd1yg81i23axsieyjydq5kfrny1e5q8pff0m07nh3d8hri612padxy4p8nyzonig4e9axx1v3yu1kufxxvahb701lz6voww09h3yutreqritir5kyt93qg0f4wlh65n1b88f47mb3y3fha29hxqdujbfzhv1y3xegf6rpx3tsrltzlsbyophqyzchcpsfz7m498h0kaze8xqzv2eqlm3cejahdx4aeda061ajkq133fge521ygdw12uo3y2cgkokxltlcru508kau8tzw5ukqpckzt8lp6m0kblvtvk7q6tf285tdd55xbmv3ug5p4si3hfk1oe7te7qy9z46mbo1wikp4rqriw4zd1dlv5z46rncclcuqh8nxu6lv96i2xscol0ocxe1ezqbsfa2wllzn0a294jqrdwtd73vyulmwol05cf5gkck9q4uekw2k8zwqblbvlzixmrvhjwtf6sx0fyis87j5wje3t0gaj4gizzw686uv3qunplt6klrdxpjrp9hrxrqcukltutlfd5iqe7l9jm5s5iu1eiw0ineqw849q5pq9khzu6b4q3ivcldiurrweb1rsnbbwcyl1mp8ox56mnu00evsv0kgd1lsorj8fwhmsq82kwv1j2xi156ze4und6lb4e3r305vcuiyqt0l6y8hkvhnkxsrr6g5wd7ge8zr7t3w00vumiiqkfjzejm34gr7rcih65z9hzoqpcndsyfxy4zfuzn4oqr4ejruanck10a7lmly4womrvyhanz1i8n6re73bb5k1w3b92476aoqpsfounctyx47lo768r7pjrt1kmmiwihrhsmsa6g0m34erhafrfxsypudq8o45ng49nwtjhqicdn54gnijs0ikeigic169qy35lpfk5851l0e322skp1mckjupqyqfgejyuhad7',
                proxyHost: 'z6fmgx455ijchluirf42d3ylcxuow953tucggucltp3z9rr0h2i7ckel618h',
                proxyPort: 8042785968,
                destination: 'qbas0sx68yllo2maci04np7aw97q0ylg8lypyahgldcwx7casvq5e9zmf9sr8v0lyhlpfb8s1rfhlmx4eoid1rj1it6zer6kfdo8tk3ro4nmf7tei4aj9oo8tzi39vtoty3fau35mzd0rvqcktvviisywkzen029',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zdbd2zo0t70o4nj8cw7bxo9d6bfutyscrrwurd47reg9vsxoidbm7khb3pm2ka4tklk85n4991q4hnsp5thyd81g3eef8swjmigtdn2uk7ts8emlkegb9l46u4g6rl21w997qoptshaj0o9ywggsj6jga7vxt54m',
                responsibleUserAccountName: '0oi77zivitcjd4x6oeet',
                lastChangeUserAccount: 'o3kasd6f9w0vngj4t5ru',
                lastChangedAt: '2020-08-03 13:22:54',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '5j6k0lod1vubabmfady8q9uo2cul1i2ui3h6ga22',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'a32d89e25kfbhhso7zyzo3kp70sm3u88xthzxjqndpt1jurwvs',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'g7ywuvqldogpq39x3uhw',
                party: 'tfj3qsvpw8ahdz9hz317sgjrqfnisgwbg5ul0zzy1j23qhdms9li6le4to40sepjwssn6xsdodp76crciuxw3albd6twg52t70fclgpzxnqly4c9hfdhlmlg2s6nawcmgmchuty8ep7yrc28au96ayg5xm8ay9ed',
                component: '56fi6ei49fv2x1c2k2yh1jvajr665hcrwuyef5wynybhljwm4j8231f88i67m727ha5m7rxk3g813rlosknnoo0um4um11takbeayw0yotc64zvhiryrlreovquuhfd6e45wqswavn4ipt5y92pav1vmm8vmla6x',
                name: 'mks8nwa0kzz2ale9446mhdt6t2mcwhfzwruh2tdsaq82bd6g9o25u568cwd2nyj940cqx206wxope44d6pybbpoxjvlaxid0dr1i1ri7dyv29v37h2icwz86wvy304wyngy4fsbr47egt3qlorw8r17j0mnyux6c',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'rkdukd5vmi7ig4x8tfv6rr3nhni3c7rr0zeg8borvgp3szrl5t2i6dbmb9bxkt568alnbz3qu7986qe88uagifio6b6hda3s98wo3jsrir41zzcjorpfmjh3p33a4flx708u59jonsnjtdf6tmh8g78tysjkfomz',
                flowComponent: 'mdi2ur5tdhc3o7i057awc1ty4o1x4uzhipp8umnn8nkimxhiusnh30j39nulc9gajcg0ghn7q8yf15gf9zqn3k0s5aweuakohv8pmcq193k7cl7mp7wa0sq7lt7l5nfn0y93zkkk3j56sttw3ewidffydogjoitr',
                flowInterfaceName: 'jja2n7bbkbbyt7dz266yd7du2imhxh0kmrl46p5tsmz710quw343u0gimkf01ce52wfzrly62gie4mto35oj8163zy5d157b4hf3we70l7nvqx0d16s9x8q4c83llqpirsly5xl80qxyu9664whyovdvk3rrh8qt',
                flowInterfaceNamespace: 'o1f0y7zja6ppcpnh4dtvoc34kc8jrdvmxlsurq91bqqbp8n1em6leu0n0rvwqbi2o8iehwk301tjz0zgje4ugadrp7lvcykam2pq3vz2px99a3ij2dd75plqz7fxo6btn709z72k1c94rmuq8vvofczbtr1v39pd',
                version: 'glze9k0a7deyujhmydh1',
                adapterType: 'bir1uz45ec1v28999b0i5l27ud1aplqpyx2e5pt9njqqgoj6lmrwref8hkj2',
                direction: 'RECEIVER',
                transportProtocol: 'ackzfr8kcv4icinvbziz0le5tw1mxjjduzn1hju2cer24nnq2v9i6cllcuav',
                messageProtocol: 'xqzt2kv13i2b9gvoj8vsogvpqnf1cgafkbetorki3krzopj1y1e7jaf1xxz9n',
                adapterEngineName: '4aorgbs9cp6v1pm52zlnfx4bd0dbuhe804i9pjxhib1a2vwx0mwhzzd2rr6xhqr711j8vl0anumird96wj3omu946r6o1gc1y5x4c9eh6jhixopnl8n6vkwswpo15bwn60np59a5ivf8r26e7qf0yclevcm1gbmu',
                url: 'wioz8hiwmebq3ifgdewvuh58n4z85guo8lbags77tooizp5sdublyvrist0tqctrgh5jx04gacor5lvhmtugshqa9vv0138ar4ztlqiuhgvpgjzhgzmcgmgeojf2b7dffsoocjpgflntbx7l9jgtt7zcuuvyze5orlizug5kigcy3a8xmo81e7p8353341rh4mvqbrzr7u7l2z86gdkrppcni2u1m18os1haeqincevlh9hjwv48b5xpqb1sfove3c5ngh0ulle6689us03ffuqupxeltlt5d15kfhkbbatnvpxguhuu6skmp6lf3yxh',
                username: '9mrarro6qp3bxy6qvq4b10akqb8uy5l035ujamncim6bmcmlynpe4wqyzlad',
                remoteHost: '0wrb2lym1sc4xyyexhrnrzusr2cnf2obvpixz63zo2jdinytqjjt21yyzhkk34uc73n1jy4nytd6qqm9mko8ydc81ysld44hs0z9d9k1jh5wjeig5pkeyckl3l4ne4t0oz3y13ovkbh05jb94gwxagd203htp6dy',
                remotePort: 2118140023,
                directory: 'vrrui7ea1zul4htvcccek4svd03fr97nybdmn0g5kheyp5ulilz4k51somkvzs1z26d371wty2eaoef5hu1ypy5rge9zuruts18831t9b1iki2r245ne86hbbcgl5w3wlima0w86idon3g9liganrptu4pcwcb392y71c0t0toorgwpv39m6k9uk1p9sxlnjrik2jh7aroibtpmc8bfsrc3vmwsehre7noue0sckh0ht886w5845bnn9qhkwk5tb0cvzwc5899tfr3of68u7lt4qiyhd45arxxbetfhnjsy92ffwf8quse8zjxjyqyruzdbc36byo301zkyfk9qdcxpaw2w262ui6b7kwls0rdh1hwi43c33vbocqgkvtdug069pgwwhq670q43o0x4kydc70h0g4zqdmco2n31y972gmo3zzrweba4oqa3f7t2er1c7h0q0hrdur7cpupu107gm651u7fodp070e52oeky2s2zm104rcmr6qvd44j4yvs83gkw9kvuywsmjyyxto61gk3goinjm5l1ub2zap4z31e6i0gpz862iixxyufk1yuizrs3ap681kmua2xnwwnm0hs73xl7sipqkykrute68wg1p33j1rk0uoqiql2qq30pccyxkgxo91uaxo0eumrcc7ty7ctuvc2z476o2y4c2e2ry3odnrrv9clzheonju4auczno2f7ei2g078yt5swqhgjc0ppwwgplowo5fofqwfidyzd2rqvwh81iznxebdyfdhk4a0ez2utylcapfeivp2msivmawjebky3ahcsgkeyktzrx1f9fctdtp6demuahlm007bi237h6hwwo3urkil0xlfpeftlooyvihd3s42xrfohlsxo6ewse5bg85kflfzxtnipvs99ck5d38uefrp5a5ew3okolusoy1wns0ssw5brdi5m40659cykjll8pvc9515io1lw2l8hp3pgy9frbgj73222ktdxur8r0ios678sv64nha5wb51xw',
                fileSchema: '2in0nhvyesc1414d6o3wrakfsyrou7n9co4lvj9b8jtqhy10pjfw4h1wg9zkd99qm8n27soyrvriiv6f75rumogz25hiz6cuea3rmtzgnh2wi0skvuq3hff35cbpqj2w8s81q7oipo5q7qdcjp9jkgaj8w1i6v812ui2p2gbkefr7mmei3x7w5ncu19r3o2ipxqvqxodv4cyz6rxdz3o7f2vs56vnxf1dg3nqjc87x67ok30mgfera7yiqrtu5f3sf9cx9uu42spnh8rr10j0kdokf1h0pie5a1i7srl3wewrcm6qxfkgi11d453982w9ftxtj92k0sg1pyudrblf6xi8mazeu7t53z2rawzbgapb3ihljrvbopbdnfvucmzqk87qg4vjq0kzf6casctpbozm02rhokq8avkrv9djabxcpmlhcn6hfq3j62qhn8udsyq3dc8b4p33xx86568jbk082e0dg2fte4vy6bb0c66dh36zf2oxh9id9hkq60zdo36ybld4asbnfmj7s8t8psexwkkzujt1vonj0d8il70gkwlcd6w4e8rd3x3gonst0xxfdizb909dbq3036dodjlynvlvmox26gcu8vuul5vecvn5ez72yuiav575dp5fi6qitwkmzp87js56jspebifjax24cj3bylehtrik1ethlsgmbwtahjsk8klwjlr7v2ndpu9dxdodg6ur2luwhk5nxh55ysdjywnivcxg5ug0vzq3psrxqsf23l5r3s67wuh2mdaxj4ky8ua6rdl6u421dba786asnf1xu8vuxzlbnreyc4kdta9gmscmwedieguoi82rlo7jtlwl5i38zv5bfjx2u29zxk86ir8mn834wqta4q7kfk06yf536pq7uj30wdarai6zt48grrrbccrwnxnmqtoa903si167g7fbxo2vh8pl3dvjzgjc77b8q0g5tq1cid48f9suqz1ezgr4fzq44knmn4x8u3livl7wn1fxahfhfsmirerjgyd',
                proxyHost: 'x0khu2945uk4bssfbtertjnulqtkrexz7op07kym9u43p328pr7ggkpplnmv',
                proxyPort: 6133355736,
                destination: 'c52rd2903uabi0hqb2lfim6ieqpw30k6ne9kwgr18m8w979553n929u0s2od6oijevwgs2ssbhkc07dpqtacqg7akzz415sg9g8cr799rw5t72jol9bdqjj9eqtmixnc5jd9vths3hup47323nsv55jm7l2phw6v',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'x1s2f2y8tboez87la6y91bpohu3fq1l5zh949xgbwirbfp9nf6a15qlm4w3llxomrfiykk5h9iqh22chl9rkqgbdzzsqyy4j35knr638b2yqz6iuigw1rxvjw3t90wwosp4at2ptac4ljp6eeiqli3g9qzkd7sal',
                responsibleUserAccountName: 'w9ps4dwytkh8mlp6o30h',
                lastChangeUserAccount: 'mjoklp0qskob0vguf3jr',
                lastChangedAt: '2020-08-02 22:18:39',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'lw967fhb04g9h7gx655a263tj8ksmgfgf23tl0oc',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'thq2lx9ghgk84qtu65w2xr21fh88tsbb6y83w0elsc2fwgkvh1',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'u51tpyggotn9y2fmnckd',
                party: '6couawg3f69og2moejv89g4upwfrh097t1wrqonu02jk1q2oimo8vnjkxtmxub6b7feutxbwavn6k7eg02n0n8l2p0lutoxfnutn90q4qusqh12ifydbth1kj5as9ar20f173fchnvf5j9ur1iuttsza2n0h6xa4',
                component: 'okrgf0tjj61jj54rxnfmbtfxgicv0j6dqxh4kh6i4e1pvekpp2mu7d80u5ggo1rigb7xvykdaio9yxn4awo2sg3tcbsf8qhu3jnlnhvpegt5h9h1kwxa9zfr2nvq3i17ilsg8wn9r1v779ptyvy4rgcsty795lqz',
                name: '6kp8fwjutql5rwtopzzqt7d7g8v7n4adxvu6bw37p7sqy2fz8b9bfji08kvvodeteenrgeaga77cgbt777yihilf8yg5etis4k4ezgmhxw5c7u6klo6dyby87zod1ih0hokhb0hlga26k8jz60eco6sxb0vr2tky',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'ofxp5glrcz4ob6poeco31yq1nf26cjlkvgwkbvegzuoeehdww57j54gtjsf3p9pyihb16599b7mxfuurjcne55l91oxymblbjgloh458ydi0vyjf3r8ugqtpr2jc4mrtmwhzvmgrw943a3t2vir7cv2qr6d1god0',
                flowComponent: 'lbrzrgpb797us18jnm4hqe62au7b3p750qfile9ujl7gnt0vxtf7w9fgtxcfroyc7pwd7fma5ivsnl7repxckoorze3eu2y6pxdqz81hjsjnkg9wgrmb6j8290ycij0bl52gmsb3hhdxer7dm58necxfe0vw35ng',
                flowInterfaceName: 'in1gskvpvkbxgyl9w7adocgcl14p4w78u28vkermbuyreka2kzp8t3rffrgzi3qbfsr96wnulru3leefz1z0lmy83m4vcitb5g70hprxltxz5nlcqqm3dzsayot6xt5u8j2cbra9i7k1hhq5rrr38dcndvb6b0ds',
                flowInterfaceNamespace: 'ul5f4sfa4kl31tn9rxl6e5216e1s8umb6vseoz9w2piv5z4zzyur1e2xj3pyy4j9glepmv88fixuxf4m4qfp1f1mm1kkcnupwichci2jztn4ktzn1via0wiuas1e3xyakflqvzmf6liw6gde9nom5p88w7s0q4ch',
                version: '6mlrp3nv5qheum9vkxd6',
                adapterType: 'ki6a37sv9jxmw5ppw7zegv49z6gqczqif9fnklnlibok6mzwplvb75s5tv1h',
                direction: 'RECEIVER',
                transportProtocol: '7y2eeupp721mzngwz1k3w8s3zd2sp1dagtpdlpsa8fl0t38dpain1ccu5rai',
                messageProtocol: 'cmtpptbugslwgynwpjpfh69qb1fdpdjkfvdahhmf689602poedd1tt8jwl11',
                adapterEngineName: 'kcoes53ce1pjeod5pbyif9929jtqikf66sm6t9tb9xvd3aq436k62blymlbz0ykzt7rbr4p5a2j900omq00tzgv23y976mhetimg3uvtolp5sbx0civ9ahqoszib4o9lvr7ovdxr0t8pu7s8us3giuzpbg0173n76',
                url: '3flyg12hwilnbh90ffiht545r95cwb2zt786ar84g4d6nustef8sstmm91k41k1zhe9bdm2m7q7to40aal9ykpidkemm1r3idyq1f85zwn5tldq98xl8bachrvwkyb91a6fg90lfigof2nu836p3wzit349gp14s3rp044cjjps3ro3oclscmv6fe5r8q1kj8g4blpnx9vqlaw68beiids1oiz7au5fmm78oc7t84t3g62z0467zlp6ywbrt4nr7ant4972nvfmenaxk9le2w7t3fxf80f8zed8rfsps3grgwhglm9dl9uam5nd3j62v',
                username: '9p6dr18lbl9s8tz3bmte7ufb3rocdzh9tjjpws580yh5j359wqizsxl8bn9s',
                remoteHost: 'o192mxavohv4td1wnygwum87kgdwmmruryhcq2ma52w8zv2ftmdhgw2x1671zdvs85ousrwa3ivsvkitpas0saln6xhoeun5hn43pcr9m46fd7phxvm9nxeyz7zfgll0l1whk4hh9ay4dj8h4pkr3ytimt2gbgbo',
                remotePort: 1044933554,
                directory: '5le7y3hok4wsywxaz1dvsn9cjyzxil9zowwel1ozt6scq53gvdhljxfugmfonsiuq8lfcyid8wwclx2jql8sx72bjizyxlhkjq3shxi46m5k2bo1b240vnx754n5f1nxfopanwqo4fjwat7syoz8ts84rcmw7dcbawhh3hvpv21hxdj3ae4pbx6osu9y8sp6o2kqh7f0z0oqbct5j6nuomaf8div7992tepabwhhtsi5ipuaoe18grlmylumo9v5i26zn0sucl2r1mrsbj5lxez8fuh4ghxg21qj6g02muhkwvaiaiwnu9knbmrtpguv3ihebyhf327jfglsyt7qfwmqpc3ycx7ddyrkws2jvp3bmla8q95dfw9azizvrgdqw04iv9ltxkfp8c0jhvsh11j1r0042nndftciooucwuztj5jdneyjzv1dqxvyg85ls7dd4ywtj1fheg1h6v2hq46nzhp0eqw73pnowreno0wk0s4aeqspwyrdnyuvgy5d41i7tifocwr1k41x4m536t00o0gz7otv6t5kl0c95xajukt1q1aypm0e5jbzqaunxeoqfovgdeas3mo66nccrk52kpzo887tjqsx9hy866q803ghbfqxgp2l6azdyq4a4ahaonk0a9naf7cemz79d8cr0ojksh8lcv34gfrp9tr94z5gx5o3vc3u2jbxxk12o8wk0to5k922u2cxxe1i76eso1mmxm1i3k8gb9aezltiz3lrwbuuzyugoxzbraxpaoceu9m4xjqzvtf1352ii3q0mja55e68iideeaz2u1vp638o9ig3p9semlihdwtsnourty9ometuhsnv0rxhj2zsjdmd2r3lobw5ijsmg1v42mi7zwmr12nixyngc19whdke400muprya6evzh94gd8riag4fuegodszfbkl5uc6vxud4c3lrc3wd8mvnyo848mlp7g6ttzyfod584tkmz2fx687onam13guutbgyif9ykhmo28u9sody6cdg6y4',
                fileSchema: 'v9tsydqlf6ft9y8qpna6xhv8azynyn7pdxh8q0ocj7ubtmel5ndak65rkcsgyafbj0lvku2q6h16u1re7x46ugog0vp4ql7shv0mo7p36ftacbrlmhcu50v4xwsfo8mxcbzii3gcyxyz2yusn84oven53ie6jwmxjywsi5c5bp0yf2y1vz6mhqu6olr902ds6to0hdzz9agl2pbpanko8m0gur5gb5ljjirhodcjormnpjmonzjfs9282sbe24hebl8pvkhu9phnlpxtoywacuvwabf9vq142i3ka278jkx3tak1p68bnkycztwqy8qed9x8ibtmzvr3xo7xa32dmm919gtmk5peb3rh2e7jrhkzq10t9ubuum342rlkmr0tt4gg5v4t861q5v1smfunulae0z6prrdsyq5f1uwywpbr3x5uh9sisirx33i6w185qpknmcu191dpy6hweuthhl94oqjjpetqhbk3psumvlvuz0y08if7rojw0hfx4a1lte2wybmmqjovx30q13ky1yc8ycph0tg6hadvl67bonlehrtbfqf563i2cl9xtc9zoa654kqpd83nq7u0kgnyu2305h8y9bkx4ux7iuo4rivziw3sedyrrz9llyp4khzhg7tpqgh2qgskgrdfrsksyieq95mmoka14lkr89a9cgz9tam3if5me6dv3dzcqlun30jt4reivpj6bxm42455gbcgmd40mkwm2z9z84aqohsktggzd9xqqnl9kh9pefpdvnaloy2sd6l254zqako7nli4p4ho00hpx5sj8hq1gjhyz65vjrevk3sl8z6gpwew092k8r7hy11222xktuuxijmynmzt0qsy0vvpqn7arnuqv6vfobv83dbe40uoffp6d8zn8ktud4rc9qr9jd2tfp9cgkmm298ycxl462ut0jkwudp4nh0qamcgu26xu9i6mfg8z5pkuuk2585xvu3c91gk7furlmgopm20z97bpiyn20u3jn94j1xz8tw57u9m',
                proxyHost: 'gs4urbrrdcb8h6m3qqmbxr1pd7n0vng7z9mmfgumfyys09xiixhy9b8euemh',
                proxyPort: 9652667309,
                destination: 'l03zotbea5svh4874ll1ntkqqp2bteul80e5kmxq2sdivzlrp749hwgljenm24k6bvq3alpy6z4ua4rcjmvbfg6qow5e6joby62x855hwyxzztbdb0n8rmpzpi2fvxq09o45h3eym5c9a4elos6h6nqa5r7nldjx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'z8p56klhlmbr6hzmbocmkh7s6ktrq9g14k9g80fi4njjuattzoweoa32dpn6wsmwjbzmir6kj1ypv12tfizuzt4kpdoxlg6cuukh7lho7akt0gzipuxf6wijbtg97fz4k4ju051iltahsq1ir6urqgjbkldjcopk',
                responsibleUserAccountName: 'xfxbn280ykngjcupzti2',
                lastChangeUserAccount: 'thlysdh86u1ycfoxgqte',
                lastChangedAt: '2020-08-02 19:55:02',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'hsof5491iosfnim9s5cjf34alz065yds99hn3ffu',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'g3d8dtuu7a9e09vxpr3zjq2sxwy4tq25uoyrf3aa0fc9hd7uok',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'sq0nrsaenqiw1ak2jct3',
                party: 'uh8ww7zfr2bbwxdkxf7br918rf0bgcvcq9h4hk68e0hw8nk7z0vpdkgt8s9x68s3t0pyqpwkbgy7yuvtiicdu8l6986cnybh8798nue3uyjy8pqfcuo904stvnbvuyu17ant69inczonmf3lyf4o8q25xipbp8jn',
                component: 'n5ygxl8cp7i0pg5p6vssynrvki242gyk84t9yfuobiejfmfcl6nyu05a52ktjw2w475vf4tgu9mq5u88a172z4qw3e0qsmvytmhyakk7gp6i2cce0f0ka7xp61svmiuq5xevcj7ne13uuknaezd3zx3njf3ekdxa',
                name: '7n1yrran928l2w4fmiuba9l28ymdcjmoigx03x6qj7s2cvdm7yhub7vzqo804ra9ciuktzkl82t2a15eq6agjt61i06igdsy9sud73g7n31byjmp81jmd7wcc90irp3dcpzp6xwnx0sm7w8gq09ajc4i1ajug5eg',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '4ryglvsdx3w7sthojr8uatyj4c6mi16ysn3348mjagohh4m0tkhmlbpbuorlyl2gkz4mwxekm1d7qdqkv3sq4o4oqt2dvnsso4hwhqp9udo4xeg7mdubute71eixkxzjgmint7i4l3rrntktds8aex9tdtpd0xln',
                flowComponent: 'tt40byzw4918ee5ijs55bw6y6y6yqijrfdwnrpryn5hajo35lbnn2op1p0tv81y37u7ztd4w0f0qmt5t2z09tlr4nd7zjgo33vk7xxcxb8ayy21mz73rno6j5y4o74tc9e8j9wqpkkhsg6ajtrs5bcbkrofss0zh',
                flowInterfaceName: '0amayemuc2y3yy3surk4oz3yroui4cg6ewef5j8bx7ecmzpfqo7ctsvrrih0s2foy3fbf3e5lqdt4vnhil3wo30tudkr804j5zwlr1rtazsullwp9si6z1n0zihsidhnobr18186hukoti60fpa02k42fyty275h',
                flowInterfaceNamespace: '5vesqpw2xlh1rd8el5bdbn08n5yyalh81ts0svrrwh5cjlko1p9m1izptzv14z273utcnd3kd32r1buortz8pkc2c92esb25cduef2jlw3fldietrnlep5iugjl7t4vp35npyfw30zb1w6f4j9c47s9zxivj3tyq',
                version: '2nbup4qmg2i61wv2c2v7',
                adapterType: 'srphxelloap5wq7onqbg7ozk0gukdqnsllhbpbgmd41xzxvb2t06w4fw8qt3',
                direction: 'SENDER',
                transportProtocol: 'ailgxyms6pbbrjq6cevwspixu0qy4hlbt796xxhzgwrdtcujohmtjzt85xnr',
                messageProtocol: '70ddbedrg1z28vhsx6likk2hr77wg75i0v4r3x3dpgco7lwv2zkxr6or75dz',
                adapterEngineName: 'wg6jjyk9b54mk3tbix6olbrx7cho5sksskptv4d4x00e256b25d1zt1nu2w85tdlfp03cekz47bda1fwl2ib9cljhz70dnel0ev0ks10ctxwcvon4qwwmvuxvoxsdwevrrgl06jc8inx3tnsz4pcdd7u0xdettah',
                url: 'ew9qtgz01wbwgw807n29cdw0ey2xed4hp7x3056iuy02asod082u50gxt8tczunf0wfonbe72mvak62tb24vumq7c6zyzet1icr14camtsvnoylp2hytr61db6so4bg6r7bj4fxqshm7189tpow8ba9qv6bfcli8x5yehfsgwp1tewpyt13wub40ihd8e2bjss5fg152zef47d32wgzmakcyjczeffrvi9d9uox3u191qcz63t9fvvdn8t1klrpwpbggmy03tzlku6kbdbie3dh2zgxgu3gtgakmpgztflq7pqoaihjgxq2m2h0baef1d',
                username: 'q7dugmcpzj8bbwmlpg2q33sh5ghntnq931uhere7oe5z3j7nf9u6n9f77pjs',
                remoteHost: 'z8ip9k7q0j9hf27j2r9qh5aqp8bs19wcxhwpdbstste7h9uuwqywiu5t6ps6yy8oeroxmsfm2wzw8k1juf4fa8dhgurqfi17tx1fsmkaugaftd0yohizriw7an5xr3dtxhoq7jkwqjchgjharyi6fl76nk4iyks7',
                remotePort: 6858359002,
                directory: 'zgre0d6twfuk1ajd8f5h2xcnpba3g8h6fwuzit5bgt99cm8fs8rsq9na6gyt0rc30teiq8nj5xnui77o2khmkoo41jd6rpko8rps87zyf1pep3mopappug641d4fnmhq5z9wxa6lfcrb3h9ak8fbslfma77anzhd5fqlipcvn1n1mfaowxhuhpa1ed7f804hz5f43kg8mc94d0u9wdr8lbr5nb8jkuku6i7i2l57cojsy4le1o4v8ositsexl3f9we9fww9f73vg0ss0xx851lmg8beaetr6bqz0pnsjrz8eev9fva3w0pl3vuxzt5cbfm16n0krig42otpahv553jtaylbz6ll5x13huwghgm60enaspdwhhlwkxw134yrl134l7q9ykah66p3xo98aqp478qax8kd8p96ajmt0ljyvsprwoqc3j9ivizq7gnftpd0xdbcwa6mal5ze0azado7nqvkzsujukper1eq6ga607vztwn56pkzz57pxxqsikpvosp3f4gwcby5vm2750utmzeifrwtid265qgl9133ks6bjs59d1g14dtf65mt7r1nit9vgdnqdz6g3itgambuoebkf5llwxk3ij3npeuicvgvtx9hhw4mrmargduin1w872aq2nnqrsajy48o2t5k7f35xm1zcntyltc19ynxksdkqug3xvkeanqgnd6ojao51ch452h1ftp47dzvjg78rox0yn13j9770v2v1wpjsu2a6v03lcmv6ckbm56g15tnbv8scfcqtzfgjxa4dea3fmlcvrrl8dn279zpo72hqh7a3ad89yq8r4zdw6wp32gw0gvybs4g2unseyb8g9m6f703ozxnue9ni98db3hte7rq3jdkso5fb72vhzolvj7df8a7l8xlt5jh14gh2tu4eqj81owvpnklq1lsaok98e5eto5zjt2hanir1x2zkzof92xqndty7kmsd7k3t6zunpqmfkr3obsm79cg9y8fdbmm556c76dhzhprew154',
                fileSchema: 'g8t4f06gtjk6qul3i9smfc6vpwne34dvqbphzgb64ti78wexm8t383itp0jxq9axctsz5wgvp566s7rl1oqqutsc2fous231uj1bxaao4mh70kv8gcvofonzfnhjmos6vxl9uncw6d61s78ep5e3a9iql15iy9ue0xz1hmniy6ax8euhexlqq18j31e39z4f44cyjrvy6yjzujt2fs21nrjd1vjuwalols10islyth9s4vql9zlsgmawy0pb89xxdju2ifeu1iyy7feyib9jcqna5cpfy51y9yw02y3iy8nwt3ckyini90o73c9zwgzi4ltqq2g3mzkjl7dkaparqytmjmbulvwba0h2jmf88z2am6dnpn5587ljmhvxm9vawphx4csy214vv83j3hyl8ixjfsq9zl4608ksti8yhj368laxfc8nykaz81ye98de06bjh9bsq8gouko6tkrpueu8ge0i7742zzcgdenskqxes4xigpbgdukkzvffqqkoq6j0qgcvx29d2oyib8xz3ivvst1oh9heb2cj7ez22wus7asd5bhrjiwl8sl79zphpht6rs8bjqhun2ao8u9qmfuvtyn6i9hod0cpxci0qba4xbe1oywpzoloaw2b39qsh7bo7nnombxkgntyz6tp1fgrv48tlg22ynfcqnysmpcvlb87esf0xd9vcoys0djliubyyenw1ypihxd8gmxpks13gmpf4kzextyqla17bb482ehvms43hyb2zzzesaywb4h31ke6j9yhc1vod4a7wje3abnt1z4k36fpjjlopy49zqv4ib65d95qdm9ertpy5jzlvi2uv9wan0twiba0kd6nig86s0erdxf13du20m46hb5apxht6p0q29scip2p18wymawvydo58268uhyckeyxna3aecna6wi7dxf3p1ipu49lojat3kyskkcwbijvdic7todty9uhuq5f94ud9ibn8umkmz2kcllal6qr3o670mynh5oilgsklj3psfb1',
                proxyHost: 'c4zq9bjss4w4m6f3zwuggitgchbrjzr7f43j9yekhifphj2rqlrk5qrt5rfc',
                proxyPort: 6903754111,
                destination: 'mni06gwhtg1ffsjfwshk7hgzenxpwgonz4ytd0lotlmgdn1pa8q801203lqqgzphkv5w75slwqk5us1bhb2s699jw22iola7dwrpszysucym2l2tngl0vzm8rrgl0nh88478iz6978obzpsbg393dfghysnnim01',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 's44yt689gpxrj3sdcmdnh9aki8kbntgjzozxc7688b8i70zorpwpk9fbkoqe2ixkjpzb16xo2cy4e6of26yqo0d0v02e3sjb3qq3kvni9tbxwjhmypp14c7719m7leovej4b039n03omwkwpm6n61q0gqkvkili9',
                responsibleUserAccountName: '9drb0fq4nc6lphu6z2kd',
                lastChangeUserAccount: 'flwofavliqavnoyf2018',
                lastChangedAt: '2020-08-03 14:54:49',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '7b3d5dzfk962nt64rwccvll82ssz9mqc0a925ot1',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 't21keotng7ypqdzedzqyp2ezti39hlqzc40eccpjy7zw9ufw5l',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'cuuhmmxobknm8ndbpedw',
                party: '0zd03ek9nk3vactyi0jpj8p6zi5oei7mh7drrja9eawcw4s1v1ukow1ilpjisraralounuxls62wjmd745x7ul00um5qsn8svlvrht7m1hlcw8xngki7szqp77lgum3hnymv7xjp26vbeh1d4ja6y4h7yj31x5fy',
                component: '8w0iw5asf9yuw42wsqda39flvf0ccozkb1pmyhb9i7m9sqds232shfq6h6kctvb6cz9rai7x7khzgy8zyia9awt80v6dnxieqqmuj0g7c0rxcn96bljynuzht35t7a5exebo9rrpqnw692a5pzepmxldvea7y9il',
                name: 'etdqf1mo80igwbxsivbldx5hqyjr4ra1c4d22b3d5giuvdhb4ni4vdgknkqz8ti5zg5d046nlf1oapss3t4yfw1u8pil4q9fvljncj066y9uzkmvptvkqoi42cop3nexc1sww9ukoxj3q770osta8q6pjdrv86tr',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '04xyozhqktiiyxw9fhioye3vadjf1urj9gmjop0yy0brew8dmkvynghhdhi5sdbo84c0r11jktnxnkr1e1hpawyvc63sgjpn08mqy8d4jfmm6dpz9azagkmpfj2ite9vq07ydcodwdek03f2228agmxrd590d6k2',
                flowComponent: 'iy1qk1w97fszp6v6wswxjso6owlbzt27ori7471gkxtjikq4us5jydxxqnhpr8wj4qefhvmsjw52pem6cmo6mdetnxt98y1l05a8db7mcecij8dn9tpf7u93d9duwm1g6ieo3mfiikasfd5y4zf4qsr00o5k60fh',
                flowInterfaceName: 'smn7dwxa68serkhlvuov4stk8vfsrko7auhy5qhdnko6wiznz2jl9fuqxalminyf5titq729ntxzs24ibuc4c5zn7ww23ke3ilpkqfar5esdehy6qxfdrogrv4hi6s6mbksg1nbi57y3zxofg5jugp71hjj0awzj',
                flowInterfaceNamespace: 'em35hf4ze7szi34fknmevpd26vzv8sf6iwxyef5rc4arkz8sfyjtdsuesg4ffgxebtslm61cb2q3g9u4vp5ufh70rqbmfjzdrw1qeqvk691i1t0k7zjx3tbwlxyzehxpcs2k3mwnpw9hmgcp28sin4ghny2fhvp0',
                version: 'cw2ip8tt6x8v4m11p3x0',
                adapterType: '4gcq4u0swbr5l25bzwi5ymi8kmnpy3zvvg8bfdjynzyrclry3p7e7ilt7xh0',
                direction: 'RECEIVER',
                transportProtocol: 'o9538l8xbr8bpu0al3qmx0b94fxb7r6gkrl9w6uy404p1y5tsboqomzmwmkz',
                messageProtocol: 'y46e22uwc9erodias5arhimblzavczbkyi9dakgkvgn59f4hct544zk1b72p',
                adapterEngineName: '6sj2y8qqalmo1md5ka3029axlzuf7bs4i902m62t0aujmdvasaehqvmyn97jzcdsb3vyo20duycpstmvaz6ffdrfk5we0xpv5o0ldw0teqy4d7o2p6qkqstzfxk8t43r0y3oej9yexw033kfodqyv9vg7fx2zxgj',
                url: 'ho1j6h0fvidi3iw9cgg65x3y697401xh22iriql3wv24b7lr3g0knlmjzoqtlgf94r111nzbzxmo4ltkmko2gdip78epk6zmlujthz3ggudy6aj1bkgfmce03u7cwy9cnzoks6izpzmeu1r6w3i5s0gppnmhz23c5ou56lytfubwsx93pgdxlkozmgy2vifcpgf47jltahfebt5stkmvqtem15115or7ttf7ymzzf7a9u0m5z15pr7l7zn99poikopaua0j1fxudgn63op6ma1blozjbw8t7a4nt0v2l4socn7asusrecoohi5swt93d',
                username: 'vhzyuzgue5r3d7osghxpwc3611zstlncnmm1dtpme8gqjvmq3rbplt45c1k1a',
                remoteHost: 'uv06o6aemk3qdph35zr5mdslszs3wapa8qkm45viji7fg1gkz76zqv1n81d7aarsneel2rno8h5c8inkutopbh4gw3jmce1sclt0xikhj191cvflis7dm1uaxly1f6gxhaav0ewktk2mlfbor8qpe9w2unc5d0hl',
                remotePort: 4023842719,
                directory: '5jw9d26qn58n4rqaprrr6sxm51i3c2ajd7czo4lpq5yj53z1uguegh8lrc79ulwoi0ifng2no3y7nip71vcr29b8d0024e65e0rc4zvyxjcehhbdgq33wpyxcj04fodxuak6tp6cpngcomdw388tnyborr9544plyjtlyyswueszvzvucjdqt6g13piwxstpbo51obg0j1h6ptezzwxtahktnazl860ovf2lnncuiy1p0v15no0osichn1fawtgmund6wx8oryhjlkutl20b9klcbutf8dthpwwv8wlz3ln4iktdo31gpaluu5g74gd5nt3l7k2faj0yhn7zvty19lddyft9vzpycsnax6tqge35ogq6jn0hoiw5g1greh4xsihaiohwy3wp8iqblyqpzsl1zvxqkke9cr6hwps316kibiq6q7uv9i9jn65llzz5pvsp4s8q0qr4vmn6bizkuwyt2yokrmd3xikaxbeeyc8h3pqpxu7lso1cay81f9rf2t1pe54hbthc6dug80y47h5i682d4crbxbep8rk5r8gk5eh2anuuajwvdnnf7za4yx9pl1okip96i5xnwjdqvn1i0ulnl3gao2qndh5oq7ujvlfn3dltbwt05dvq5qb8qtfw4qygucly9a0wovl5uf7f4n3ktwxf1z1gp5c8w76kb8dhl0n3bm064lod2p2v7701mh5loj4895aen86w7fmtokgsnj76a9x13nt5lp3fc08xqacufdkg4tscwq6luirjib4982jc4hpssm7sm837xk0gugewnmswkgwk0rmmkulek5u7c3bypj3vy09e8twmot5go1mu3r2jf8umf617y1qd02a6m2tzh8ljrjahqxon7bkrq7rbrv2ylvnsh4x98yey5bnks8rvhgbok46jitvvg8vsh9ppbe4wq2mikafhh0pkoktg5f6qcg91ftp1stfkxv84xzc7klg0immncnxncorxkqiyaov5pavmdby8w9m5jci2z445vpv4',
                fileSchema: '0ymwp5kscgyxdu0gsw4vuthpjz4rogy2b6ljn5ssql6z1gbwv974xwcnyyrmupv5jic0w4zq1fkr77ydxem3v6nefqyaybhbygszjtnd0vrdnq6tshh1ox5pr7cc69myintjvj8u9ph3w57iesqsroo5gaqn7kodfmzer8u5w32ehuz8efshf5zol0a6ch6wjibk4ak1z6me1y0o02vrj75qorf01swa1elkbtgbmhhakqhja2ji1pwo6xww5vb2yxdtgdngdjwlcmiw3g4ipp1v28m7sgv33k0j0t27xx9xmxbl2rqbmvpdeznw3qwafbjssaae4ms53z9ucek1vb8fxcrvus6hnmqvd6qwmvlhi5wjr8cswjgaa9fe0o1hl7hw9ga24t01gkrz7tahzlj9cgb730l9yzdck0jttc38269xbb8sfjxh3xd4r4xgrcmwk9xea5om3lkj0862d0fe9lbuq90j8t32ztnsdq6y5icx5vmbu0enrjli2qa4yagqrw6ddgqf4but6nortbmo08jblohtgfnpytcw0coy7bsfikex37kem79wcb59db2wyh96e5faaadf9jv86pqqs12inlkajxekiq50crgiaaju3fm3h269unddnokmmou10t14bipec5jk3ivz4xg6dw5xhifvemdsazir769x6n1jb2ptf1n4615eq7aqclni482he1zv6sm0u7upv2c5z1ak372gr1x6xyji71c5ig3bujs1z80bapm0155uuab1lcvnr3c0phrkisvpztraukpso7fmsar3ej22kjenkzlw36wwdutfnmjvzgm7d7zagcjbsg8ckgarqlmyvnuc6nx3wl00jamnbqomyrwjicbekgvvwjtk8os7zso6r1mhdh38wom643wo6icqtk3t3julbn2t1530gnnowdv98r5cibcfo33ma6o8z6fwz8yq4xk29x6lr3s5lkwki0hz4kl42itwjcf203sovrxhn97dizmo4gen4evypxab',
                proxyHost: 'hn5der7162s1vq948gy11annmgznuwcylaee4qghq2fftp3mpkq0hhmf8zwg',
                proxyPort: 4945556344,
                destination: 'fl1n8xxaepj3gx2lx5765ep0o6nawgv61rmavrgu93ngyejx8hl52a2yzon9mspcug141pt0e8a517lgd3t9o1o6xdiyr16yk5zrwhhf1qupc8hi44w7yvezao1bv6vzibzi3iyvjxepjbqn4loqjkj14f7zzlpe',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8ptboo6svthuhkl519mjv47y4eifyyufx3tcs3uswes2bt7n5trx3cqul0evlr8cfgu06wutkk58eq4bpco9j0pvq0yfrbpse7ysmf7wwogqecs4l033bkwn1fs9epx1t71md6n5go0kfvwyy3ic57edkv9x49z2',
                responsibleUserAccountName: 'zy8hodub4rkarmzch1k8',
                lastChangeUserAccount: 'ppqshh597m65fgwt1wyh',
                lastChangedAt: '2020-08-03 13:11:36',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'jxnqp349p89owncfdoohbfgf6j2k1zoghjib27za',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '8f8xg818uwhvxovfyx9hdnj46i9y7f65jrttaoxnn016nxbglu',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '8zrvyk2sxrtvk5um41bh',
                party: '0nawu2fkiepryfw1w9kpz4kss9els0uz67tu4vjxg9onutguul16qi5syszyzrr6nyktygsxbyf460nmmx4r72bcjzz34oayi3htjxep64mrc1y46wmkuptj1tnvexy8k1w3w968ddo33f3k311s53i9l76g4vyl',
                component: 'n2ntztweu26p73nov0vbrd5p5t4hcdlqtcg4wkqzrxmt8jh3t4ztciq94tchh95lock42b59g277hy5e5tin9g2wx1g6trbx4u8pgu3ihbexzt2s5394tbjppzom2jubfzdr1w67kkkdoyoehopdrbh2vgjgpgir',
                name: 'aaulalazw7dwf3je5lw5z4ks58ifnvlodsyqidlodbs0be4ebfrxutk0364s58xwwmoq58s3m6bmeq43h4ijh25p3ubnnla049rz5cgw777nn89y4pjgkc2d2vdiwkjqv2cxkkvp3jc7ue5tjmpp1i39de3cr1yw',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'cfxenil7pbkks6t69cqby93o7aeedy4rhm2u959sjhemb2qfjfv0fag3leyyoy3ww4qz1hsiscpg12xwfy3v8ja9vep61lv1zcay6xhmizu1s8xh83fl9sqwi00mhumha373tuu2w7vfgs43gzlbgpozwwu1pow2',
                flowComponent: 'us9k4e25707ootaxwowsjgjkfoa400x9kg6abp7z949s25sw362jfbbe4981teezr0iy9ah48vo7eigkssesig72oluh03n1opjxscuarrjkamgvlmm2amqbonv0fu9v5qu62pc0szv4u3i3kd0dzb3na4baw9qw',
                flowInterfaceName: 'bhlflpez7zrf3czyxyek994wi8jlake9oc5rm9clci027mybdaifokw6eefq0fvff4mz10w6nsei7f2sn2ev9v8h56jstnvoe3ltrxliqu62hu4wb3rvf44e65l57xaw2ahldbou8kx1o2zk3xu5zt7j99hwyl17',
                flowInterfaceNamespace: '88f94aqhajk7r43jwyyi0q00i1u06dw8m18k9zxxw1bsroxp7rjecx6cpesd65w5cgzobnpzrvn83eg4xyimyiamf68v87zfsv0enoriejwg1e7gf9n5aej61ms8nyere87czc2eu31sczrl1ry12h80u0snoiav',
                version: '6s2l0u6ufsnoibk9b0h7',
                adapterType: 'sjmc9t6a780vnwedkof3p3g25sysb67h9v25nu3sz18c6c65nog3ohdb5g52',
                direction: 'SENDER',
                transportProtocol: 'ysjxcfjbz2gv8j5x9pxr103qiye6pttali5tzvzhw0lwbjdv4q5a6xllx4xr',
                messageProtocol: '2end6bije99jhvzfrchbwieq1evvlr2t1evwfvp6l6l0a5953tocp3ujru4z',
                adapterEngineName: 'jgwgmr6tsvf9wxr5zi432dw70jsk35c554jlp38rydju2cs6rl1qmg1cd1lm4gcjnemwvros53sidsdizedns3g5e8x8d6183tn8p45iys06wzebvdxhca8r80ts6jm7fpxc63mwvw73anahymycm088jazebw4z',
                url: 'c3cb62tjsezug5748igyr5k3yesdeqsgil2ic06433e9dspv6jzpjzfa4wkiv8r7385ke1ryw18oi61owv3v242rjap2aj5sjbclmikuy73nlx8tntmt2lpuc7xg54behbpvekwzjalk86ltw9h6bgjrfor7rhk569k6rc3zdmkjpcdjg83y9yuy6z717r2h75opmawwlxnu3vbj9n91z2zuwc26o48m9yd43f5qiwnc8xv0yo937q5n5x7tst36mbrtiu67m4d5wh1jtmlzr8nfgf5t20tv87co7ansyse2ktis5ky09yh7tqxh5eev',
                username: '8k7dpm89cgvn1a2q3e51u65n8fxprgxh9sf20twfk6zrgj0xpj2nunw34tai',
                remoteHost: 'bb11b5zul9ai3iz38co834e4ojnd72d9boba2dz68llfdw378kbooh6dh1784bgju0u4neuj80fc166kzapy7la1exmf9cv3y0z052at8jz7dhmeyzfn9khpgerdyn3t8a6jv8h3keupt5gogmcb02k3n06qerlv0',
                remotePort: 9386852877,
                directory: '3ud8ievaxqa7ov9a8sbf4o9e98d16c6dx44p5uvgjcik0igkq0t1b3nvorkmjijlzt0obln84ql1jtpfshft6uamnxuekdyu73qjt0tfr6716q0h4xe15iujpr0es6h2p5mqmpgziiniheql26uhkpjtlyf8clskxjjajo944szp4m49fzhmr7m1yvgp6d4i7sh6po3a6wgb8j3tfpfm85nxy5ij3imdms6uqv8285sk18lfdjjmhg9hxhrym7o4isgn03ymazaymuch8wjtky69tm7c81x2hn926hfolzaaenmex29s5dsrvltc9iy2axg2gxbef6618rv5h3axx94bjlwixk8x9ib7nan74m3fx2adlc4udwuv4iyz3i5wm67zy3s2rocd0h9m0ffkgpii4zn4fdco27vaj1ust990i66irdzscj0r2nhdew0cadp7kfuxo1cayvx56gtv8enlvi3as5q5n9nstcgtk56ggiuuhvv4xhkig51hrqhrey0617x3fuygdi38jaigv9jg766zq0jr7jfpdwzakfv5iqm5fnp5d7tzprplmsqvc1pjpclggwe5c9wchhyou1is9v4ttzps09up3ye3ghwyfu83jwgkpt1pnl9oid6c6iogusfw8khflzuqsnhxe9wr9oq36vx1pl6iqq1qn0od85j6afpr8vnsuqdr31yfkw5rfswzn9jcwe0dqq4o9lvuspkfeak1to9ar56vm3qu7vvbo89nj4k9h14onazyak4fvmo5ftx9mjj484mo7x6uo1mdftu6imsqjc5ttdmlnyb0aqw6lxs8qr01iokowe6etobjjdswa6xz1tjnyl2052hoxalr4f1tqu4b0oljxaz904cmgpi487vxkokl3madd721p3yfq7ydyda4uudic4brkce8kkd9ngk7wr4qsg8t3oossz7kkxuemt7605el5efqy0e21jpvb9ogupa97swknsz7e3oe03atixynyu50v489ofcptdkkkwjt',
                fileSchema: 'revpxnv3e8sk70vieypdt0rtp6a7kocpc104qzmhxef0kk8hbet9y822cuq5mcr6307r5xb8p9rd9tt3tdqk1q0vwlvc9qyfyf3hkr7ovatiibj83nogdcfnh7ui1lp0lph0duxzpc46fab56kd2dtb9ez53197qn1ktp4mz7ti0l88msr4ofcyp3n9pz4zbzvmcezlzgctp50u0iwrq65pag3movcu317cu8mwjgnfviy47tdmyyo21rbpc2qaq65tn87g03e5i5z411y2sg3rjb4ujmqigtay9y0nwfnslydmlnuj81jms1l77pu3d8n2157cl4qsa2oehryvreo82yhlpn73fgfx54gl5d04uayigaljl50b4kv1nvzrzjmeththp3t6ls3p3ztracf0qiq8fvwstkb33uqbonvsblltv9jyehehjv4h8yntzrhmnuw6t9g9jitmbkti1h7g5bqqrxbmmqt628jeq1fcc739ighzzd7ta9zuouxwte6q4bfw6fz2vpln6j16qg9582o32kywg69h1y5y6i3mt5tkf0qnblueksjcdx22zlx4vw8b29u9hbp2053pkjnmm6cr19ya90yff9qihczxhbo2at0rzvyg6l2ink1j83kq9b9mznh5rntfdx9rvayp3seros7121b0uslhuswyu0ewgq7u4y9ax3gutwogw1uwx6or9b5i5pyowsn886idw8p8vprnoav3xgi6ecpvxhkhk7688joh0o3srhmi8gxtudbeabb29aggm87ii2dku80uohdnqaszbiojkqtzm4hpwh38wlh86ndcmdxytau9sxki3goka4ia4ot73fbtwdlret7xkwfyjqga5u8tipt9hbp08zgvahnlxb8fxv2pw0k7fxqbbl6fmwrzflyqv34wpiggte8tvzp6xcrg5anctzetw4t6hhxv543d1z6dcpjfmnaoybsufot24y6pfpq0bkphvgjorm1w128q6sj2ti9hrr9qen0umwlzj',
                proxyHost: 'lnwf4n140380pmn71aivvd1dtg7ncb56fwaqwncztn994g5liwwq4olsuoz4',
                proxyPort: 1689718537,
                destination: 'j1shoc6mvervw3utv7u0bvezqlgxr8xwbwz4eztyw7ipb0utth3b8pct3kh1iyz70205ebivbixyikkcrdv7bk8rnjax6fxgpllmdgrznyqo7ss7s1w18q68dquh2z9r1o1htod6kje3o1ejqssdbq742285ji36',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'sb6y2ji1gs1l5c0y8595kc9itamzxapf5g1i91k4bcxsjhgz9t2iu4qm8ivlqizjy8t992de9jouoc96otyjukg7k5zhhcmam98liluo2kdyizw3ad00myd71ii1llpqwpjndy6ncj2i4mywffxznmhs5b8v8m0l',
                responsibleUserAccountName: '0tkrefacamqim4ty0ax3',
                lastChangeUserAccount: '7jxersku6c6dwci0zpdj',
                lastChangedAt: '2020-08-03 15:15:48',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '2xa4hwdi9gbifrhttqbb4ckpnf3261andqbttwn7',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'otsshiy0korbzrp1shgs6g0uou91pqxuiefytzrttpvbxhydmp',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'rags51hzq0mlgyp0g2bg',
                party: 'ohufejbig2sq1l8wxzw3d65z1lf5pdlt68jss77h8w9wirjw4frx7k97yggxlnyd9ocjkxhyhzrfy42e7tdovwumalzwitklqdvoy1trarlsln08z7earidni388adp3hazr13cp63dmzn2d35e178dni11u706x',
                component: '12a4r2maw0lfyawxv7y3qid51te2nwpqrfrtg6mha9buagfurybsluejrhw3y5uxpup2q43bg8ipxy2dqfrf8ptkyzeneexq90vj9gyy9etsrd68x24c4bx1ncw7lgpfup1ccihzwc4alpnno9gpl83gf0q7g1a2',
                name: 'yd4w3h85m9zoqlg7i9nwqgw6ol8hxe2wk1r8131dwpw0wjxj2rm5z4hk2c67f1kwsxl4qp85mqxvnj06fdfursxogl5vdxedz4b9szrkw2r3kik0ybmcnjbpzfhvih7nqardo6u0qfcinkdwls9iq7lifk9dryqm',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'qilig5nmigudp6osfoce85z93xb0mnh9ks8xu73affp5xwov20nwyvmzkktl69l16fp8n86dkl32rnf4np528mnd2q8yourcmgm6zktp9puk24l6blvgrpyeykstbglvriwzdzie5k8k7k5chca5p1j125gjz25i',
                flowComponent: 'vd37moq34zuvo74z91k5e4ysp1favd929szw5z3tf2jhnzey7mbvrithuz7dxk39bzg5x84o23jqqesgw78bml8ly9qzv3076d88ykwxyjlnwap2ac15i4q6hcc36xo7p3i3ej5vkumesxs65yi61b200uk9i1r5',
                flowInterfaceName: 'li5rhiy0y9usia1162sc2rj42vmw9vjmyo7fq3bze39k8m0vofocwgto2ei5tlseqjgtdg1tygi5hej5bej3pz3p2egt6wpf65i18hikp0yjkpzyvx06v0s5up0i9t9mfouvnvtc5x2vyw2mjp0xc366znsquckk',
                flowInterfaceNamespace: '6pusyg53iuawj9862ggc4hecd7ttef4ni9tmznuepbz10fm750rjghomaiuyf8mmkoei6ycq067fwguk9vvmcctcall012pm61606sgo39h9rm8yrqm9h51vjg1jfjnpgbhvy99ofhi7b1znxfee59eiqoftajk4',
                version: 'add033l9jxnwhizmeqki',
                adapterType: 'pyf30i1ww4ognnigl542gobzbdnsesiqs6jr9aos20cfhc35j8njsccgnpbj',
                direction: 'SENDER',
                transportProtocol: '0gyw4vkihcdd22eyyhkbzu5r96j7rkdgzeawwm2vgbduoryq1yzb6po0zh0k',
                messageProtocol: '56qq2fgjg7ibqnth5yyl52fdt48soevowejw1but3jnbk7cf72b3obi349es',
                adapterEngineName: '7rdhkde5czltr9r1kn5zgze1mbuc71dbubahhupkxkgne7k32hyknv1ab2dyhlizc0zop68n6079mkk8iddaglrfok2nui797fgiy792bzmi9dfcbdsvh6d6w7cxoghrtwb8oqfw28pxey1tmp19cx2zyvi8dn8r',
                url: 'xce0awq2pbrhy7edeaewl2wq83jhf3wp8h5hdrkhztlatxulvhavacn3d0sjzy3goc9zjgo4mg6rp8pze0jdna4epdj7nuchno0rd6z6141lp2a5leh6reirc9wvcxr5n7bdy2jx9gfy637l8tbpilbjhnrx0cq3t5p8p4fmrk0bzlbtnvljbqpl1qwdh2ry5utyhpfki1pnvrbobp8gquqhla1e03sv6fkfngxg4a5gh07kh1gu4ywez8849cjpjg4fb9uhgiuvdtkuoxqndrsak0mmex5pxb2w5uh0a9bcr177on6fqf1mqsebrb34',
                username: 'a22mvzu88ekvwdwe6yhiy4dozj7s07hkoh2n5i2ae22gmoa1ye4kdj8ovin6',
                remoteHost: 'o6xpadxpgi7d2rt4j1xg7wt60n9uqaqcffo7woa0a0dz1lyx467zstpzmisy1nuvqndl3i1iicsixf8865h92o876diqfgd038xykkny67g2ewdn9m5vlsn5x802i5ulrdbiml5bwuaz5s1itpvrzzz4omtedlvf',
                remotePort: 17410561635,
                directory: 'v5yj1lcwtqutrtgvqr611dfcxpxhxeco9nlld7t8nbpo24d3ccj7dguvk40nvwsky5cxwzf43fhr1gpbh8dpp5323hvtuzmssh2q2hhhbzsvzp2g1bfkruwjfumlp959lx2xz54o5hhon3m3gz6widbps6wpkhxscw10g9gf5lop5oc9w6g76rqkzoz5tzeuuxrnwpmlqkxyeu71pckv8glmvxuffbmh0qjva0wfkzntbv1jblbo5dbm9xv42p89513wulido0le3r73ngndvwyqz642c8xxcebytsqivf5hwekbrem7ep3bm1rlsi4ib84ivljd8e5xa8kfyx8y93kuv4ppqw3jxrfavns31wipypbb13llq1nc3cf545fo643eu3yv39hfsnh9sfeh2ysrso6x0rn2hjzycf4ckzyrf0fhrtbfbvuzdtbu5q2xpvik3i30dcbitqhfzef2d1tk8qqw1ik79k1fsb4kanmtiw9uec8tmq20hhm33rwzd1hzik2060h1kvjeeisw0sfzvk8ab8blxz4bs0ney1t7syd3a8aqldzexazsvmwhr1os9syytl8v8ko14iotmwcquupbxeli6mxynywh5umnbmtupahnirhtv0dd28kl628jda1taotva3dvogcptwnoh5hy227mi9rhlv3o27ua03sqxzu7th3go0aqbvenk5pn6up0hbz8jixv3raqydrlztjfo8eyknonjfvae1lcb1qtjlo7e5rxqsv2f1e0l3crx1mwwmxv6aj3qpp1uj3vwapm77z25ye288hctrq04fy9seknnh5lq2sx5q9bpiidydme93u6cgzm12cmurt8q0sasnap4kj2vhozkz7eoh1orlcxw48qvaw1esca6nt5dfu0ot732xx3anbd2rferrc6ijl8uakhfmr9a7nss1m5dm7kc7fi3takrhazvh9fenayt7cedhzvg67x2duz0tk9sd8kz12e8ewskayu27fud368t4c0etdmahtv',
                fileSchema: 'dtyvlprfj2uz8lpdhoky3lhu8sdmlioqsdtnx3lnzzaedehlmkxzjeajchjooosdsvtqg93f6e7u7hiiwyirqoj2cjfnf5tgxcj3ybet3zq90b8qcq76ql5kttdxw55ipwnnu6gy3d5bhdtoqd9pkwszks3dltbvk6fuecbzzb5b9afmpkiq221ext6n5sub236q737fql3t2g007ghw71u0n1y1c9t8aqd3hyy5yd966rl9qnm9ik8fy07v9t2xrfabzp3o7rrt4foz16m078dj914chptjhf1rn5hrdtpxybn0b1wu1oywyxn1jifga589sibukz891ayleonpssuphdra49mjhamp4cnz1kwbtfqhj81b78g6v48kmji7l137i2s4xu0hjzvwy434qjv753rg5jer492rpr5c4j5719fmcdj8h7ujrjg16a7xn4xu5gh2fk6yoszyw5j7dypal7pkx8w4wnwmhtg9g61kccaptj8qm1bb98pf8515bacc90yrgvi1yp1xrszmcz5ackac2vzs0uuehtg3nc69dau0ddkkd4lt89g477pjnalfcnyh9241tt1vn1x4rywwvhwpog06u5r5aihspv3oacxawjt5uvmbojozv3tkhz5t5pc1cbi8sq37k621jebhr4vsbky5hjfzmlnwtzix1mjduq121sne4wk3wchzhav9rdv83sdupyoddjoty6ll9i3ud34118x34uxxrvj2kn4i0d789lj02xeukfs95kqhjbso2niq2g44ziqv9cu0a4rveukr93wi4g4sdr2fjs48zx2nayo0ih31mtf22ce0g6dmzgjkksnlioo0lqjnioux81me9p7hnr9odp9x20r9ks4gcqf3lqpc84j3lofbp3frqyc5ng8hqk7ff8z7r6b7mlwxwmx933wuw1ffozcnnuafsqw15g1u0rdo1keqb9owh8wy3autxsmb7tyib3q1l9su2xsazp3oas2ysabcrthi65l2xggvakxl',
                proxyHost: '28hb1t6n9a9bkip20xhj3yqh0lv249v23ucstd6p59vmgxityisslkzfdtem',
                proxyPort: 4957227519,
                destination: '6d0gvo4lgwp3evmh0woh40ypcjdpn1ldu6lgn2297k9y4gd8g3lqzp0jwnt8d4zxw0z9o4fy1kdudobk5vnzwdl438y1f80gol6xtcf8cysy4s7fo2o9t1ipze76woeb4u7mfalu3c0wuw9a9h4w3o70lj6e1h29',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'no8d4ow7kj1utorpir9inbektbjv1f2zpbvyg0kppyn05lietig53gjar3n3n2u9kuyt729lpwdxtsd0yjtvrdw97tdblxh9nwxsiiqsalu0bzayio3gvchn14rdad06u94ov54roogi5plcjlmiilkodjbq8th5',
                responsibleUserAccountName: 'bg09fswbyj5fkpvpfl43',
                lastChangeUserAccount: 'guyw14xwa578xx8up1tv',
                lastChangedAt: '2020-08-03 15:22:33',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'q20ib6j8peizn5m315gk4jwbbrd6fivveqry8w14',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'z90akfxyt71g51yvndzpjkomvrzrb06u7mmatvmh28mcnsv5wv',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '23mjdttk70g5mpwnpkw3',
                party: '1bizipbo4sre8ju3g9fd87zaaifay998sne1r0lbunwmfw27yegicxhkqgisia4l9de18c1dbfi5knbqo4tq1njt1jsjp7l2ckg833crk7orxnukdnaofux98n116u3b28lzh8vrk3chfrnemj44d6eg6nrsjh0g',
                component: 'z0k5wbcqcra3cqjrsof3swhmxbbox9j4pfok0y12f0x5j0ulrqdl2yf6ed2oxvjyipo56mmo22dh22qs4wtvmi71rh3ldagdnz2ptu3oztv8mndyfzl1laogj1m95pd3rvsbidc9qtlamlkf08oheqnio4e3bmld',
                name: 'hnuhjx3xhnisq1fvb6tiafayf3m85u5acyvjpyo6drm4ac64xxqmc7aygncv6zs04k3afii2vfhqwoycpipgdkra6puqnv3nb96m1w4i7n4a6wuukg7pqjdpnffd4khbirqkvw7hme382ftna02wekxeesvbxxy6',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'rrz6u8550txn482wv6rk0g3nhpq2xrjecps0shilhr9x7o192ga1nduaa3ou5occwtxlkphmlcese6vqxxoigmzs63yv2z1s5wgriy8ic30g5jiro7agyutrtmcxwx5v2qpebgjp4tvw55ep2g8ghrinmopuc3r5',
                flowComponent: 'cpz4zrm231laluqnah1etw1klho7q2ghu6nr3jnevjrcp2atzskzhh4ely87apj4oc1v2jhqjkbftn35v3ooa810emymodq70n435hj9x94obappi8bj2d3wddr9xcd8xp9j5pjcpvxkaim8khyi7jxaujlbqm4d',
                flowInterfaceName: '2nxlpvt2fjedkqvj54gfje76m3vff9txgcp5gutin9x6oejhz9kndlfp9wvypez1anfltdkhkbpl80rs9jpuazkp702auj2sfe8y9ae2yyt4wk0hineb1ld8h9bzd5sd9jla3efbyz8uclsih7z4xpf7frtoa0q7',
                flowInterfaceNamespace: 'jlwg71rbnl77rsslxaoglrdldb7ofutjlw970lnnnli558cc74oo7x9a57ux2hyam4x61wsy3i2iarv0fw23jax5itsqwpp5u6x0b5hq6r019kul732xu0nq0qlpuo8ql4byllvwjdzz3om9a6nmj9g0y5u2c7zd',
                version: 'ome1em1kyxxq54xccnr5',
                adapterType: 'cbwb2zfmmzjkacd4yo6qmlvkbqnus9684bxwwu44lxfavoez1212s98wjh0f',
                direction: 'SENDER',
                transportProtocol: 'tre1r86gx0kzcjna9lgorgamtykpp5d3hv9khqwkqzoyzhw8nn2eiqypcyqw',
                messageProtocol: 'pm1kg4w6p1lxdi37zfgthf9t5282seyqb2acxghi80hd3kgen60q7lvjfgn9',
                adapterEngineName: 'mmcg2e9l4w2pa5hd07j70ahh3bf5grcm1u16iulorpky4s04a116bsaghh0irtj7ojow0adt2vq3v6d1xqvfnlmykigb13azg35o81716telvlazyoufygbhjoiml5tfb52c0yu9vac90rg7y9jdcckqovtgtpi3',
                url: 'vb1j1sfen5vefgm192nag46ph3gd12chcfw0rvokdp34y2euf80ba52myl03zeuzzyzi21vbzcsdmd8ri8tj7dtziehnwz3jkjl23ggnqejtsp20u3mrc51ab7ixp20nv3a6okx0jthkr651855xuk9bkd9v62cp507a2kdr1dy52692qmvu9b4obqtruw53p5hlb9iw2rzbmwyblfwph6kyumat7xea8rb0utz1h05wkob5cyybouj1oc9ogmjy9hshl25i3xzbo1v8ky69eq6r4iybiqvhw0wwh8219ko0dvbkca225me6ga8tsayk',
                username: 'vbw1gxg758jud91srivz4va8ggcmr2nbl06x08pdw3de5shnk38lfiu15ih0',
                remoteHost: 'nxx17enudeum6jafwlhgy70j30g6tsraaw7ozruh3y0e1jhytgcbpr1f2h5hyiakmakznhbon1kxe9uuj03smbxj7t2b0vjcxsaupvik3ehthjs78kkj3pxx1h8yiezqx6c4sxqchdj6qkoqibx5accyluy2b9te',
                remotePort: 4846376235,
                directory: 'umwm30rla3sv73r839he0yqimqj9talyeqoyoryfmeowradw121janaf35y8c50aef9yly3dvoftnhj0las08yhb0628vz7j68hwolq5z8iixbpw3rupl8h6blmhwums0ykpck7urxobon89c85yg630vi1ps042s775cwo3cb8bguad01o0kfw0lrummzel46dgha69goypjpqxncmqwdzujlyp6ugjtdhvo641c1sbpk3irn825syc39vtq71upr8etl77bzpcd5lqgms739045kji3o4uzb55k3i3h4runrbxdn95j7f7i3wgo2qg08d5hhdc48c5omnmuzcirnu0whiol8p8s2728dosz4zw5oqdqt5etul6p4us0o8iyawqyum3gilfe2yu15d70nudxjl3pgrenhao07p7kohsks23uppkmzvinz60ru5anh6t1jis31jhfjqhuvs45v312j35u12s4oyrlhzaxhxvur2k3nl1dnx98rodtma74sq1wxhsryfj3hr530vwb1c56ikpjx74s5a0bj2adeyb1lfgzgnlc1to70c5egefn88xtetwo4lz50xpkn1ch5hk3tki8unrftigv5uhzblvf4l7syjm5uhfb7lx73pl79v00psobezsx888kdynvkjyzqebjh4lzoc3mcisiofns1g8kmwfvl8oxdqvgh3t8q8lfo52cc9qmhaty03agjgty0dbbyt7a9p2n1isbobjnu48gye6wdc888awz9ysf8rnhns05xa5smn5h41qebrv7iyihw4d0ogaqa3ctnazms9065074lrcxkp4pta0kkqmvs3221crlrobg4guue9fsyfek9728toxo925eo5w6b693l11a2q5mky3ih7xhpm63ynee1c4eunbv9ujkdobiqvanyqiik6cyb4gko09lwc0jq5b6uhb80z9dgs89dc3xxtondd924clhkyhanithacw3yz9cssvmoqkgybhb36hs8co0srtz0b8sk1m2',
                fileSchema: '706501nrnkabh480iwhxwkfrn1p3ild03n2berdce8av2ygjsgiwtpl7712yu5v4kx1f814zjbs336f5fgxugu3wvl0y9apjvb2qvnxgfounbsxgp1m4p09t4h814z87tjyeaystbse4vonwv55k6m52v54xrzi7sq9vy63w0u7xvj6g7tgb5f6x0crtu8kgkiy418y39h7kse9eze0rnn107y41sr7umot4bzvw1ie21sx1ma4obczwl3v7d4f1a3l3hy1755re5q682yr05wrf1udrh7ynmgx4ybdem3e2n5hhrjrskh520ahf185x4xex3q595tjbqvx2xqgxfxl1a5tkfki3degk2cndf6edb3nigqrfcs1di5c5y0ryx4t2y8kp7mfmq1piylkjqvtun2f01zrlun3pgd205j7ffq407grxvnmmhj18rs2edutipimmzb44nkg8xoibwnaau764iigp25yguxvajjekkfld2vrjafgdylfx22qdbsrg4p8lift47scqlan7tv73zannws56f9yspez56kkfyyxwnh0kfbnz921hz73x78oo4yckkeqow7m3oqj4e7dnndt1adz24s6t3kke1psaze9wy2nvu766fwjza17hewn5a8pvzah9piuctcf9si0trn07d2gl1myh88ovejs6d6o6w951wqc8uwms8g46ym22mpbmr1fjugak9psudj86bxympmap0k94tesjbq136010sgk1mk0526a0qnopwi3cchg12ixdy0fyvm1netsn4okpn436ao5smynnwycpezac0cg7wby7djwj9qjxhns9em4b2xyn5lm5oyk9zeevvdvxezplk7onx9bjf6ik1rx2lavt2bwnrie8t84yzt85mmpxuxmv6gx56g1rjpn55egnq4x3fhhhui8o5lpu72e7cwtndael3q4lhtlgpufmmxj50gmb3lnxvz40fg4khlva4c3bszdisu9woe2xhwovq3kfu95jluw6cqad',
                proxyHost: '7rakf4ub4f5pp6jew3xnas3lwosw5boyywbeu2zsq7bsi8e5g221hs28pny5',
                proxyPort: 4342421164,
                destination: 'a8vrhjkts8q0pn8cjkcaxzt6tk2k8ns4nlu03l4m6x7fzaavbklvbuqop9w4sc6v4clscty28mzs50q7hf4xen0yk94ebseaqkb03turkuxipvdu69ze01p7o7anxjdol0s32j175vjbt8h9zrce685zltvwq3mh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '85bq00tpa2qi6uw03chtav3tke83u7c5zpy3czs67b8pqco8gqe1ptpr2n73pfatq9ohou39p7n2dx12opgngfbrdv3uz0bm1xrs7toznfluswjx4rs65jldsq3vc2c4bodli6nhhjbo1etuo1sod5evbptqhx5t',
                responsibleUserAccountName: 'm2vh2ygecun6emka7l8c',
                lastChangeUserAccount: 'k8cfykjrk1b35g0mlhaw',
                lastChangedAt: '2020-08-03 01:58:16',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'kwtx80m4i7y7of9q1619j4ofbd7fdbga2vx6tyy5',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'lxpnqesghp4zq1wxejmnfg5cdjm4xn2lhostc71frbiwe1a3sr',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'ssx4az6ewkwr7kbddinu',
                party: 'cqj35ktamtz6cf1im0862ppudgkhmftznqta6b50o5zcwa2kixxezllncm76b8jif9vllkxgl932abowb0kavq088shrhxv1w4c2or2gspvc7ajszzoifzepw3ncelrvn9yt69u4hgvinteeuui5v06m7d729vjl',
                component: 'o32oqdcw0tre9iq2z7ffrt3jmg4q9eefk3kl3rnldqzsavxoilqt7fb0h369iqze2adif28ktvwiuelzudrc8ggcfari52jyjc2911rkjdmx3la5ccai42v66ogb2th8pbo3aslzfllw76tt9ywshvsz1bxixt2j',
                name: 'wzufj0dqvxogalaxa208j7a76oe5n75il4wn1fjjvkjx6vmamwtirylassgrm93rww6s5msof1so5kvgvnmc9pn48dsd98f8qf35w0snajk76kmigdd698l4j7l6q129ckbiuyqoj22qly3hhq5ho8bce1z6ipee',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '0408l104xc5ok4ex82u54olzbmx1qhywzcmtlueuqdt4isucihphqdcv9hmbah0kdds87olx67dyfkc63uf82zfd0oqpei4gvbxh2ao6hjfj6fa08rc9ys4o5hgdjmvzne4vtz2brp1stcebfboqqzx7yw1tqgsb',
                flowComponent: 'brssycvjyji596i5whiqi2roo51jvukvzy50x2qhsfiilm1n87ce618nd26bxcrykjeo5pj2sol3o5g9jnbbxffv0vagwvujja2v5nrphtbd3z54otzb564fgo3ixd7ovi71725dborka26o80kklfoj4a8dq4fk',
                flowInterfaceName: '6wxc2x06vy9vhg2yf5eop1vgmqam26j5mmmczjx1gqzi0qakjem2xsew2yj5crqhpd3pfulyt9kxrashrl0nuplrt4zaim1s1ig20itfj1kwgo0q7qme00ckvpns30gwhj1i1beges1y86fhgv5ggn7pkw2mmia3',
                flowInterfaceNamespace: '1et3xppj6uyilv58kp1pzbenvm4jdeu35yy4dkgi3jdbbil6s3ihnmm5evwa31nbv6ngkrhbco59kjrbd6ecduaya3zh63xtydb9xv8suooffa9w9j17vszgbn244m9frh6and1km65jy4wbdyycblhb1l7uel79',
                version: 'bne2rkjqo7l4fa20zkii',
                adapterType: 'zdavpn15itxmhoh8lhavw9rxsaw7hlzzzzxxtovx4f5jdoijoa7dhqm5i409',
                direction: 'SENDER',
                transportProtocol: 'xpf7q4ap12gy2c4kq98mgmuwgi1l7xp9gytfgj3zxy5syv67hqm05o9gl0s5',
                messageProtocol: 'ceyj9b9twxo482sihloab3hwpz47yztnpuvig4nvavwcr5a8nqr92zftk8p4',
                adapterEngineName: '0xyniqfa158ejvq2muo71kvc56dgcikulduyqdmqfswsnuede17qm7l9kxozgi49zmmvjoyw959nycv5l29swdct8rysvgi63dxalpqcrsxqpstievc0dbguoy8hhziml362mcocqqvl3unxfs85ydchouy56urr',
                url: 'vtbir02lizkhvp9cu8hac5rxqifvah9yx9bo01o21ikurs6e9y99yfzvvl3xx0xq8lbdao9umsbislnb59c1aqfvmkydrlx5uvuyo73tfevgemeupwuunwzk4c491vzy6m2713zf575xnhxx5ykovbpqik21do16xrrkma01ibe1td2qkof021utnekdmmiuwtvvju59i2nq7kibqfbcoazrsiv2a21h1vekium5zioj3ukcoa3fxdjzfowl4o25x12ljewfewrjlaoii1u3p6p5tl70rzt6yxfll95n7q1xbg1d9ci5kjfld9b0rplo',
                username: 'kbx0kgjszfocyt0fkwiubpjfrypmsay36urwg69vn9e7leif0slgxgoumnex',
                remoteHost: 'ul08umfb9lr87m3fvvnv2w7s3jqo2hi9hxdpx4lxlekk1xinwxc91c0539p97wbh7t265pdqixvh0a2vh5a4n64o8oi1kaq2qu2i4bsfql74jozcl1xmx33dcj1tfqvbrkm7ujo5syl4vwf3u2y0eprf7mg8jx4r',
                remotePort: 9225543881,
                directory: 'z8fbaw38xazl3r8o8ywuka452mk4nrhgf4gh2n3rtikvdh47lf0rwlryarbqdjc9vm4y0f18y6e137tbbcteipathj3ptqqbhknkfs9rvmenyixb3p3xjiocyuleoq07h90qt5g0vib35t9tx9f4tdlrcz422zm8c7k210tl39xx46ogxhebg7aojzmjgd2tohrtkkv4yoiyconqd20nzn07ygyrgy4tnwn269atn762wfvdk4vkjjd7icj9kffn79zktldsp8wlz82mmzwzk1ntmp8ss3hr9sz7g3thzos1n66phq5lnexpjmmxpjaf5tt606mym93xmxlbjr4yy8xgmqsecm7uslji6z67qc72b36t6i88z8omkwxysnotb4lczc20ier7t2qklcxuj1twtoo4b18hp6y25q0ndbwxegw69j1gglzqg7dpq49fcp6ylf42gllkea4nee5kwth4b2xqebg6lmgmoiwbf6sjyozbxh5e02fxr9uolvfpeyuap7pl1o1f0uvzyzegf8ukvhk0hgxrghz9ky6l9pr9d3aju98fmmywea9qdtqmia9le2g6zbvxwfm5ye3mnk8kx5objg7m3m7izeqw1ft9s8lrsaqx1bykwba2kskv1lzng4bgmq34fmsiiifmpovc3oasn5hxbdm7uotmmpphzfkclwv5y6j20m4t2uwwj3cdo3p3qcz4bstnbtv4x6utxddxysrmjjh4hr4oyptjzfhrol4umamjxahnnrz5ujyft3yxd7rj8ehjfzer2thpotbu0lku98fo5aaq3wejo1xy0ibpxtbbvv3gx1tfudlk8d3c0ezjxpzgseow2henhp4gcwejm0tpg1gx9ncnma3dwbz7p23nww62zaveycstdck1y1lk1bwh498btq32jjaj236kexverlfwpzci4vd3bdn5o88i7fcowcmd9mhgvn2fm3wkj51b23u3vbdlzwpmj6hykvv4kavh8fc3z1idx2uvhuq357wqufl2',
                fileSchema: 'nx2tfmunolq2xti04ws09gzoaxbo7feeoxona8utxbhv1fjkq1547666caepwlctm3s1vmrzp05zmsn83ckjvbhuxnw4t5bzoupkt3y18goh8wxlcwdkmdhm7nlux0po316bvkk5jd69rs9nl4xm3vzvma0b5wmwlr4fclxdr8emaeb7s3vduyfypopljyqnt8xpnka3jc5rf5ef8xhwjtnq6l3c4r8mgs8lgkfac9bnukcf0vy4juzvbny6rq7i578i56twzvhp90u3jh6j9iu32vg5nppsycfzae54f5kqnwhds6jhjtqf4wwzx69v5gcbvxrwmioenyo2wvggkw6vwekvpf9bepehh2jnt5xmnux7wosgb8gmxuruzqqslewacx6q5wc1l096k3cglry6e2sp3qna9rq7y80uagrbxw515ip0tcvsqfeht0ongcew20j72pfu3wofl77ypeajnruportxd1f5buzq9yp6wn3rmw1b5w9g5x4rp1x7qfi4uruzl5msgveb3p3fp979xxzqg6l9jkuq038pyit2x9shzkwd5yolit5keb94nyr4ixxbvnz92ctadz04zpjmddh3vi96nvikyptelessdk9nsqt8tfu75yyk028n10f3molew88hffjozhz1jv9aqqzouymgtgp8t5p0pi4cn9kb203eldbzoas2sw4aafdn9aurvp8l62azbypve3wj7tnv1q6pz03xdx9cokqkzbtfq4y4i78213kk7lf9phnc98jsnm2sp57at2ii1ndabybziyrpgpu7xprc9p08c07ov13odpeb45foubs1yb09oxjjims46b5r30f6bcrb6y8i33x8q6rk3wz6ukm1xsc5njndx213k9uhqh8yip9ogbbznlgamkgui9xmacp2nbsts7t9koqe6cq7tyxqvzjqk2putnlnwsr9rzvjzucyxqek7nazamtwk55bfsow9as8pyfne2xglp9n88k8hqsgl09swuesmpcb6uxo9',
                proxyHost: 'dz3fr63s2pm6arc94vijbaxw863k93mkunj70munmq6row81dmvpqt8yfl0y',
                proxyPort: 9574701739,
                destination: 'cb4sl748zulxk7d3kw5hjkca6fhwz17slfx2xbm4lgbqp60nymd3s638cff8ogy448h7nodw2z9bur0l9a27dkqb0br6p3wx3a2vvl93lua0so2f2uu1fp6yoobvonbfqawbsjwtrsqoo5qasfa0cziyw2ounawn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'catxzwr5lpv7yx8u33xqp3zt0r97aix6w8wi80ytqsnjq0x9n0th24bbdmysklassfzug656dys9k52oo9xv4dnz0p51p1u5z0pqz6lmn3cdnesej79mahmunhqi4befizcv04q942pdt2v8y4f7ss8deiy4tj7f',
                responsibleUserAccountName: 'xkaivowxjuqpmwro70v6',
                lastChangeUserAccount: 'he189s63rvt9j9xtuz79',
                lastChangedAt: '2020-08-03 04:11:43',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'p263cjbkyhz3q4mregjbvhgh87ldl1u6540kh6xx',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'zgdrvx0jhe052gzi17kruicpgkpl9zcrt2n0taiyy43vlyc6b1',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'ni3zjg3fjd8o02apic1f',
                party: 'xuugn7wovafg5a9au6y2ywfy2huzia5je4foiwxh5xpfqtirpsbeidcagtz1bvlwulmozgh2o6kq072kspq0mup0k7ho6p2lh266zoww5vx25g341gtryh059u237ggstpvpjr8o735n96fegi5bpcyh5eosifuy',
                component: 'd4h18qkbqrydgxezurj4bmknj32adj2hwfv3ocpbmtft774azqnpb781ydkumj0olflom73wdt7vh7upvv55e0mbi9ttvsc7zayimfao0orl7apm4kaxpcxmgxrpv5n6xk8z6vf401atnt03ty35he2u6dzjeo9z',
                name: 'kzdab42fleq84krngqxp7ied01jdnn0mo16dpv7g3elcf0f2tdsspdxzkoclk2tzaq678ta0wkdmq284gs2hq83b1zt8uersbw477acgn16qgd5a9020xr79z8hnd8gr3bnxsh59ah8nc6bxk0elat9rynl0ksqu',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '2w0zp5n6qvvamfemy97mg66ax03yady1t63e6m90owq7kk4mx0zrsstkrqzz1g7ja8caxtub9e5c67t5otqhkqoh67f8vsq78jjmglu75pd6wmhhv52kv45yd8o16zj6un5jwruy38jljdv7ryjuboxrktw57mmk',
                flowComponent: 'qw8psyfk16v0nmj1axine681xwa0bfc06s3ozf1esouapxhq9ptypd6g5ydtdgp3xgubprf3g9l289cz82j807fmaxnx2ctgev1htxalgmxs15knxzxxbi9cnejqi38k6kk1a1eswbl72v1a9lrpe0a7tri39rxs',
                flowInterfaceName: 'bnuuyj1njo236p850cysxpl2dd9vduqkhtjnxm203vtv56ctqdh0amn6t5rzdf6lhcqsxh1f9i8hp2sv2k1h8mhk7yboazjhibt3j4hukkwl02r5yixlxa9ocqc5123w0i8t1chhd5cwhparheuonv4jlc4mcyr2',
                flowInterfaceNamespace: 'ow2beon1tnxqnse2mmr5ajh38l3antk9rywoxb1jd4fg5sbz8mlat1tf3xstr36ttxb1xdlh18rxqf7y690jc0np794fb87s6tz0yljkcwzxf0hz9m3gb9k2yi8r7cs3k7qe7mha44k5myrl93hq2oyspgb8f8he',
                version: '7lysthmvokq90uu0tr6a',
                adapterType: '71kt5gapqcpgbemlhpqxkrmev7ngp3il6pp0swcvb4l0q6iklrixnm312zfn',
                direction: 'RECEIVER',
                transportProtocol: 'ojmh2wd778phuqqg7tnf7rak7rib40axeavxltljns0yrl5yejwaid2m1d9r',
                messageProtocol: '81k0jkys69idu96l79b2ao7wja6z2llbfl5cv66n3i5bfpqqtc3zsn0scdkv',
                adapterEngineName: 'hawcylf5sr6736zm9409utka5wl8dnfbekmwrvqhbwqmexhsb0ovmk46ddinrivn7hwhtnugyp1st8ekmekovkk6b3kpcxur7smxnbmj2fp4wpm3pkdsescltev20nrxw4rqe7jwgx8zgbdbl3nhz42cl1t2b7y1',
                url: 'm3djbjzsamvsguoux5ota7w67si0ao1551mlxsqtbglnf551otvdp4n9iij097rge9hw6mwa187pwwanw7vix41pod5lffwg7rhyzie3xwn2hbsyrhtaofor3i8jwxbtmqnuaiq7m9hkpcb2t1u3ly0gz5q158svljc9zqrhud5r7wtnd4p8riq4xnjwfnc78y8jmythnvq2n8l3so6e9xztld3n9m6w7esq710nhmcn4a30f4w2amvwxc5rpbmz6077h3ek8mbw2bxc8ufc8np7x1rsh25fcs7e06ntk6vhz6uwomd1ge3zndg3ke3a',
                username: '5g69jy0irhx9k1umvu380bl8jbysf5baivvwra3zi8cdnmoejoo46cbczxe2',
                remoteHost: 'w52eshqf1pzpwaitb6o1y3mpjzvqy0qh4ptgwxvun5l4rnmd9k5llre5dgcpmr9igq5hi688kue5cz0g37vlj7q6gx7q9f52k6n6zd1qnbvrfcz8oxusb8h49tabdqd1c9eagzm86k8ptbsgnpxij1sra4p9ezl2',
                remotePort: 7882529253,
                directory: 'jyyv1ijikjxuzsdfcnw1fbay32o1xqibinztv4cxk5t3206s27ndpd7zzje65b522ftcmr7nfpk6qlyhbqlxacb2mro07f3n1u3zire2r6etnje5nkf7mx6snzi8plfi58jtx806s3w3falm9qp2n6xwqei5bv2f9g3gbcxlyj61e9r8tlqkw1md0cty5lnegfpj0pajuk3igi8r3qx7g79g7fxnnbpabjry2hq4b4o2shk1clzvn7gpoel4nuzizt49zk8xzm2h2bgsjnteu8507d49m0qmgvcj8r59f6q193ax21qngqsn3tlk1vfn9wey5zepereqo6xmvdrcraxzp2uw3p7mw9qhw0wp1defyvhc2fjtgfdnpp9arvj53q8arqnxk4t5csjgj1gj7pqv9ybzc4pnakqdvcn0fbhmx6p8bnh3sbcmxdbkix34nbr2hz3h0c7tmtpoq8e0wy3ippairuyf13y83zqdzakq1thhyapg8khl8wlevx9mjaqy68wetp5dey4q68eygrz6rg5ptv8dccka2678djp00pxwrbn4y5vcas68he7f85zjg4j509zsnosvb3438v4duf2v1pfhrsuwwr0jjrzx4szor1a5cne5r9sjcjjdk4ob6yv7pilcxp7oxbcgnm2jvu2874gdthl7hrhl5mpxsd2d7ewj401zixdiu5soqjry5xfyv37alg7ayefdn61c4dij44nrozllku0r653qmd3x1vxmpys1c22ompcb29fgmu8cqso410wk4fvnbslmd3gm0fkp7ys94ihrutob8rnfstehvxqp8s0sazbq0s4vsuup1bn2l7ti3pre9qqucgx5fdcl2gly1dv7dudz6so97qjtzeon0q7hhwdeny4my0hadmi4p5caee8xe41mxci4zkd5jagakgorj1vru4nlk289daqntwnntndjxnkrodymrvadzbpwct2mg0fowe07v12i32ehtffoe6j3vl7dsmt6h9a05vvemji1',
                fileSchema: 'd0inh1lhsxbyo466f6ptc806d430mi1l32112w8wp6gkmle8ruvj879gw4ckj6h7rx5dmzmfxaxl60d2606etlbwjfcfbysoi8dfdbto2u2cz8rvuyumlk15hrmtxsyav5rns4iexzccmkugf2apwblwji60ynd7l0fpqiz8z8qrp4hgt0wnfeg2yeug5irnizmloqqwi0r2bch333xnqud22sfug3t0f3dhcwjn6mbgkaefe02fjck40ut4i753qt2bfzuzj1s4wqshzajt9w5njmwkus848scfdumgt4pcfyyamgtzzosemhchxh6altdmuto0wc2rtm4st2t8w986fk4zn3oq7fblyx496l350nu6ozd14ihhb3224xq4fh1ykfuxbqj3xv983r0vqzd8sai97h6jsp7dqtewn8irt8y17bcxhbjokvcg91vbsgm7c4fp4iu2plazme3kmsntokitnf2avccbj9cylj7u77o0d8n4f7wzp40n5tzhfghe95aymab79iy9cnpk73t9g0ecolt37oxfv5bboxppmen0ykvizox91ko6dj023saj2c09kuxwn4hcdjtkigliho7x5enrw19l5ovheax6fdzdip2znwvkack8903ftktocolb07vsknd4kcixlrue8bwmj4j4b3ms0abwgm0unz36tg786f5rurb8bkdevet0ydqkk19lxup5tl3lt7y72uykjvkev8114qxmcijn5bne1l77c0c809ouoeivhc1n2d6ro7gxrbtuy9gvg34m0dbcof5ag1bokielogrespvcctlw5rl5wvqj9jspkffaibb1nh4ie6h6izsy0w6nl2kdh4yftg7b3jpcqz2b75xhzdl74bz00t5ba2j7c0si10gjjdcx2b0hahspqzavyvrghj3dm4152aru478btpo9ajzp2iue5iu8z4cw7ksmxyflw3umkh3mow8sab7apgdigud4mt7645o6k4p1bgrs6u114w4er29ncx6v',
                proxyHost: 'mk8edsx9ynk6b2i9er5lpgy9bneu1rdfiym7yw4jqua8tfqq1hnwgonjk4wtc',
                proxyPort: 3658886256,
                destination: '9de0kzxjf488mdvbas3l2tbl62986bq1mfd4tcxz30ad65lqmas0qrhib9yjfxjh0n4o41qqpfqppbmfn0w3c3ca67mthj443i6dff7ia5swda9gyeoma1gbfi92z6kyypkk58wkrzoibb5pfuoqrp4jsiytd87r',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'exbs00nugfjzpz087zqh3i55groy9q4ex2sryt0f9etoo7szzoive2ytb27ejd5zx3ietqj1vegkrey3wx37l1sqhzrt37o5sabjnf1zq9r3rv3f15bvmp9t5t291utfd2ruvlg8xt1849j995cv44w7ue8se96j',
                responsibleUserAccountName: '8nzbq4qp7mpxz94ev0eo',
                lastChangeUserAccount: 'qrr5u411tf8yvkz51i58',
                lastChangedAt: '2020-08-03 11:28:50',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'fdnwnxj3gmjs797j3l1zj72ogqrpeh5xtvfalnua',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'tos8ipw25bq9dzinhfxbe0vvcz4q6qkv3w020jxvf7qt5j7nh3',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '687gzcg8anpzl54cmqu3',
                party: 'cf01hv32ed0b216895s7ye1hjq9zbzbwwdnt5lxxl159e2mgz0s17jxm8jv7azb06qntiv9yhot1go2tfbjy5dju8d10dxkrheewh8l1tvo84a6tecayezruemk1pph3uhiwimrp6pwnekujm342c3ohuhurp5g3',
                component: 'vkwaq6mibu78xk62k0r117jv1ui2d07wo3tgpvjsnwxiybelobf6elw251fvft8ia3nzzoqvto7uw33w75xym732i8jotgmyrvl8dn03ilys9tt87fkmyzoeqdq47wtro93jtf04qh9wc6kbhevy27wi5kp3ew24',
                name: 'ht7r4kl664dhjz24hxnbne42x23be7wi3xy2cxuuesf1j74hn2bjjs528rt961wc8gtcd0tyjgv79ikkrbhuy2r4q3uqdn3ajzgzyvdogtv8jpv65rs5bubuuvwq385pyz161sa77skyn7rehdzyzov0f1tru798',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'kcvi681qmvumtx39iwncj3bpb6ss6yat2sqtjylvxo9kvehfuv24j91xunuf5zfhnyrgc2xwv4bsq7puituefg82mffk7i3zc60xam1dfly4w9gk5is93rzzd171f6r3k7sk0kl4u48cgfpnran92o5zf3np4z15',
                flowComponent: '1j4syfy31x0eij3tzpay612npzy1g60jpqrtkj0jy5wpvs5iz6126f9t9kn99bt8vmdc9anfm89zyadjwgo6kociuo91rp4nnrz1dc4ucapsfgdgopm9d4l7u3o9bmivg4jpt34aafcin1wpazpul81mlh9w12ay',
                flowInterfaceName: '3wqbrcm5bie1n3fdjn56lodp1gxjxfs971k281558c4qbccrdpjm8qvw5ycq5myc62c62d9lxh1ov2kwuxaovf00jqxobgtsgwa2bhntjovf6q7bw09tcnzptpo1n8et3v2hl8livbiredzr0hm2ccc6077drbf6',
                flowInterfaceNamespace: 'ahux1lwl7f444dkpfm8k4qpua4pj6jxrblqzgstkgoj9bthjhrelvh0y7cwtqcnc7az3mgejfm9oktl620s2c15ug8b8ewrawpsvdrwziwpbzmyol82hyitk4ygtc9siprkw5qqi417kpjrgluqrq5gnvngwvgif',
                version: 'polneh8lxdmcbp15pj8c',
                adapterType: '6v3hprwhu235v1z71664eibrhg6dznqrxd42dyi8i41t3cklj67utzgwafvl',
                direction: 'SENDER',
                transportProtocol: '3s432v40oineqvh1bynyz9zg34rvloot34ftulvjlmwm7m2auydsdv2oz64d',
                messageProtocol: 'bjlwz7o3t4cy5piq3j0u4z36hi9d3jzox4x0ugjgfqw4jap1tbwe091bcii1',
                adapterEngineName: '9hq1mqz75g6y161cu8f7n93g29msz6iey7e6kvtcoga69lk695t2f17kvd9aaklag6ii4fh0bymg5m44394535a5a9vxlhr2ein2zsfjt6o7a7tpw6vi1kz36h863z5bj6pp7h3cnntbrpvxqo7ny72szpoo1g0n',
                url: 'jr6l94rna45j0f5u6jwbj4c4oslwsv2dqwg5a50yiet7rpcz9e2xpa8flqyifkbncptfpn0y9y69mlnjpyx6hs09lh7flkwr3vsassxvwrsx1ekk2m56uxi8wl2l9q9ubgbmrxh94wol976wptif5qd9fj1hdy01cq9j8dpie7ck88c5xms2jiyifsdoznlevni8rkj5rzfvvphtu6ovvybwjzb0x8zaiokhz91x1386yugqv0esh5eig0zqz85vfra3o1mhqowxk2svgzhda0a379x54166kqzxjsqdi96nlds5wj587yf1a2lzjmlg',
                username: 's2frhpudurghrqmxitl5kc6bb411tkm7nhp98rg9hizrzx5q6a30449jjlqq',
                remoteHost: '3uh429m7rt5sm9qej7x13xg98ey6fnp4ekm101zjf4cxf2szrglzj5y0m4a722zuxi4r7v6gvnva9g6lvg76ntxztdcs82iqzjajcey7jpf9c7ekboobjsd69xb8tftucvxqwgiuh1p5twtx4atf7vfl2v1e88lm',
                remotePort: 1650579801,
                directory: 'oidww1egmt6p1t8hkxamfgcqn5ltjedf5muylqlo15kd7yt1kldeo6e33522sph0uuugxo9lct7eqububhqicnt8i2x2psx8i16d1qxg54meo68pbqosawiqmg3q6jbir6gwygolzzk81wgg7jfmwqoolb58g45izbzs140dxeleymygbkpsw8gka7vnrhoz4yec5pzxyx8zjzn2n62bssw6vumzn50f2yo5edtvyu59fin76uppu5zjjico4wb7qu6totukdm7s1spht4wr85i4ipirn54f7ykyq4cmkho0libmrnupl2d4nxbghu17gzpvboa96xjs4v8j70jrvsi91hs13xzahp1x4ih1o2e7maaoiwc0ujju4zvaem40uett65rar4cpqwdj1m6rr9sc4je23qs9rveymln5rtq3bnnz0qr3g1c7qat9254o9xa9spn2lh0hmm44k17wtq52rwa3pbem2qanooleskhwsdk1hgl1oytxuy3oyvxknipovwmgsla45inlcxg33h26gtw8g11l2ql2y40eom3i5blzynw9968ctqumrnv8zn2xq0wiuhhkfzln8vm0vof0yaw8hkfx50541adsqwkvl7skf79hvbc748sq2j9dr12p2oysi0w9uodkuisasxoa3fklrwuo8bz5fx1t3qounjwki0xb6nm4uh0c0o6hu7qul6i4kdptd7kovjwvtqbocf44009cj87bl89yopl7u8isgckkqtexht3kl0qesd9p7utwevennirie9njb3si6asq4ib31fjtai1decweexzmh12on1z2dg0l6y9cnchkxohzsqa7k3nuspo52ir5ck5pqfkqr5q98d8r5uyrl9nfvfy2hajyh50pr737xnuentmpwhxmq1lzrt2g8s41xc1yhd3lpqmcyjeeitktdkwtl3w9kvfttdpgjulyg9subnxqqplx4bscvhiea8xu4b1o4kmylgcwcg6ps0gg0jahepxjre8szq9yv3nm',
                fileSchema: 'vn88wzim4m6yoa9cu4l34hirvu3o8ldfptpnv3h7ww5uc9br3cohpxo1lclbzik31nytcflicoosupyaijrzhs1frwj44obgr66ei0hdbdre5qr5g1ibw55otdb2oic4to2lrgnyg6rf38ovl1i10fm7rlxb9ovaqdl3qdiw8xud4blxm0hsabtfpsqpr2dfbhpfprkj3benzwkqakqta7z4jf83pi4po283e74atc2g5kze5lg4r622l382f11robs90a173dm3ww9xhi7fx5lqiy6uby3913rhnxz65s3t6thil9uf9xr8jo8fy63wxl5neayi3q4wjr72hbgfbvn5dhsmy5bxs5s2m9hnyb2uscijyqp6h766ixa58wttqxpstrii8c4du7bs0x16aojztvncn9swh87k020enlibdanhamgq47c8ralhra8mvu84yrpz0zc27fyizewsc53y1a53c7t16icvp74hn5hb7xi681liclzbgir0kueaoljv1hgq2wfkzn19tmon1gajjz4ikthqwx3ac519o1ddhxqoghdalfxacq183ajirxpmlbga0q81tzfpc9705xzwie477qqaadq2roaw1bwdc98qvubs489cbyt9gs428qk5xuqw19k6b7a4h6teco30u0gkemov43eimb9h6tdmkbl6ih39hn2f0uknlpzodnvvhbl4iefhnqyb1konxfe446iilnymbrih0edc4m0myd1zi9c0kn7dj6jm1qpwpvcuw62be563whv4pt9qtz6azgb8b8zsskylnvxxkttqd04cwoq8epnuu0a1t24liblr4rueepeoo97p59i4bnwmdbgzhrfk578lfarzt5kzu5vpt6ew8jgkmdgxv2q76ckhne7vxgrinp0b674f3t29bhta70f14kuuvsy53kxkq7zrpevsyuq0qxr31e4y2a14jbwvfvwrfejpwyc9xi7ixpuw7040al15d4x9p56ufyzv1305k8mjeo7tgjoc',
                proxyHost: 'vfi2eishodj41b0orn0wy36xmd5zv0bzb5prmdhuvufk1tyt2lp7fnsl8tr2',
                proxyPort: 47781973286,
                destination: 'f1nsrggs6ax7kr1ifvj16w1odza3nssw50699ow7348zedkb1rxq67tizs8rads0ukq5anrzbrlhirnh208gi6h35epgaiy3mbca1boscgv92xu53ut7pxcgvwing0h5gdjkxhonf945gongxzmwhx6of9xe0pb2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'qjwwz2kb0xfkv4o3aa0p1q46v1d5bfmisavlou2q6h2yh2br4r7zautrk5n5laglaf9i5o2w7pv22rgq7k2ly7lhinsau5casxgvtti5xnwpy4ksbh41x6v5o4i3qgd3ja5wtq2w1z0bjcefyp9b1dityg3lgfw9',
                responsibleUserAccountName: 'hm10tu1cr06nnsegn5o9',
                lastChangeUserAccount: '0kee8wmsshfu83g2jesn',
                lastChangedAt: '2020-08-03 05:06:31',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'm15vjk2ov2r3qabvoutw0rgyu02rmj7xh9b3juzy',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '7gzgjjvo63vdw4e4p7fofl9b2y89uslnyk8vh0avyje4rsvop6',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'hl82azdmvudgasoo00j3',
                party: '2l3mm5qra7d0yr7cc5i0nq3lh6dreyvmse0m1nljzmqyer0rgjy7jq6w58cneuhdaxurz7niam917nwvybcnszghwb5wa2lwr17wxld41qg0zchimsho4o6bfrlm4id9y95sj9kumnv4babounvz2m255dzhxcue',
                component: 'tr7hn7q7hrozjy9aoe2b94a06wka5jqpsx61zbz8m54725feo6hxvmh09kex9u1rgbbx1uon8m3aep3gliovifqsx4ho6tii90wf2ar4rxanwvi87t3y9bcqz1kxan9ezkk2vqdo5fbz5ocy79j66rhd4rpcj3t8',
                name: '1uqjik4qvw0cdjyztaklasrht5unsspiqn9w1mm5236dnkgbymfl9cyyvaxoukghnt3uer0r2lye920zt0f78ulx1c5borqw7gxp9022f624n7ak1xxhdh3vurs8v94m1org0nk6cyl7bj4p64t3vxl0pfkm4a13',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '1f5ynwshygdqnssk82snmjqceq4rhi1tiafz2hqmsd5za8rew6ivn9dpqruhjj37k4i2d7a7rqf6d9xgpo6ssd03c4owr5u9d07pvjan5at655wrsmzu1ac7lga0km3xooqlu7l3zr3rom7phs1fhdwn7oz5hn70',
                flowComponent: 'gvze47byhwr48szf7ruch1dyf934pu6vd6qq9xqc8wrzgr1wrralqlff119f7jkr5g1hfkqsmbburgqv9ca7a98brlm7w99h8gp9stwj380va6ftyum9nk7d56uaxcoc9r8shsn98sbtadys5oghznq3afh8ro5d',
                flowInterfaceName: '7f0ulqabuk90lk5t9ltop79fgobj4q41mmc2oj4mcm4rucdjb62hmv871dolvk2z3i6u7g5m8559f8ruxnfa1e2o35c581tufbwzx947wsxope2dwcanufc37yx4kes65bsnpefaps5cldt783xawx7f2rbpa7ho',
                flowInterfaceNamespace: '4l84fbz5lac3u3t0bhd0wgiesmwwjwm82pvpqk988muqwzb1hsj0eolgjf1v0hzpr3bjv8hrzet6rul0xurtpvapr0ly0sfy0bum9si9k72xnboa8v2v0vprjh4q8s2jisaqrja60nqlly8y3ke7rjq3i7nned2q',
                version: 'tkdn1zbc3kmd8b52vb5z',
                adapterType: 'c0ibnurfw2li74kp7uamfpclsh9gpxxmm1dk283ge6qn6nmdzwrgyoym4ryn',
                direction: 'SENDER',
                transportProtocol: 'dj0cpt33xbpqlp82n4r84iauz6p6euwhwy4fdpwt439s2vsai45lb3d63fdt',
                messageProtocol: 'xfanaqtp6l6raxdhzru1rt0y0zruztvoft8e02ezkhuqdqi47pkk00juuyjf',
                adapterEngineName: 'f7wuzgge8ulsjgi6kcack66bse7rhu6oviy67cadhuou9bekuqqgs0ss2i65wwkyb8clbzbz6piprsoep92k03kg2negsxtyidnpbiv3bqtbhatz2jcjmv4atw7wa94dqbwnnyke73iu9g6pryr2vgusq8rmd6z3',
                url: 'ldlotz3iir8lnt43eu5h725gkzqi3i5sh8q40ru4h12oq0hj73xqx17it7jgbso0y4ft5i3ofwmrg8itkgtl3hd6deukci1qcisbqk6vjj1qd7ub92ae3eq6ckp7x8chpt8tqjjls7n8bblkly6egoh6n8if5u0ptw326mp6u13isgvj2zu42zrx07uofoeb9zs280m7lsu2ww73ep3zf7bmbl6yz0oabsolk0t8cgc92v3ra2h34pst1eh04cj2ljcvhvqs76w0ls1he0n405kvwhqlmnbhxo5xvpcyo8nhx8w55o89fqr1pmvv0rjj',
                username: '3wp0a1v5kgg3slaymah007nxd563mhrsm35vu1b0ea4aj0l74kh8tpotxnzn',
                remoteHost: 'yjcwvrn0lqllehi7bzycb4294cadbplgo5s7kux4fl3ip4rwa622xm6lnpmhmi3g3mczxbk7oozl71bofk2m5a6x6a3lw2t78wu4sxcuvdjtwarg8yl0uo23384plwaj6370hlcesjbonwpsajc79mity8yr7z3a',
                remotePort: 6289607678,
                directory: 'yaypve4ducmxbu4oiy0exxs51bbd6gow3lp1h3mplw1urjfnzr8n9754aco5a54l8qb928i1655edf282h8z604zvw0opr54d1mpguml2tada41vcffec42xnhn7cgfbajjsd5yx84ew4qzfnh4tx2v0w2xxfvpycjuytsymawmobsbvyo2rilfqe36xq1h814ajo7xbydxbc3oje9ptb1mdj6qlwqy9s3tmwld7ti7cckm4220t129x96kzzenf30rnuycxauc1vay4fnul9bq0si0m0eeyufzp21guachvcl33knvbvot68twvksh02act5cwl7r7dv7p0k0jdf9bazco912eswfmg6d16ftctra0td7ga2y2z68631obecjl3lnyz5ju51deyucaxucl6aqovj0n0lrkffky1sdvwa4jyl8vjspwh0qcerto5mqzh1kx76bn7v6mek3cd23kxgstflev13xfwc2c0mdhhjgg068z7553dnvyiaq9fvmxdx61ncnhv7qsingrdts8a5v5gyst2ipul440jva5b00g57xfo4pu8i38urlpjqy3nf1om7543q9d7zx5qw44n7lyhmmkuhfqdy24us6ff0734zrpemdctln7pt6e7mdr7vtnjjsq1cg04upyj7qh55kn38fipvp87w3zu9tb2vkp585qxejg9yzdqfm4m0uky3zrwl399oxip8mz6zde6nsxw0lw21t3gqd9ce6qi67qasw6aikzvnlg9013yplxtimv5oeks6s2u1dsul55pb7q3gajaqq3dgtdyuwdxy93az8spj25gnhr9s8kqc9xdcbqkxauam1b4s9gwhy8lqciwqlilgw3me7xpsys9zi2uobs4vwksd8uipirz1f2xycq84ad10uq5rxygruqjw6y879uv6vtr3e2owuiq2m7frs2sb6r8hw84njf0id114ovlnlhhjb9lu9gdnb4vehh73g24agz4e5ppu58ofrhdkhjjwvcaebtakaft',
                fileSchema: 'heq6lyy49ol21unwjuj5lpnac1c2fn5j7rnt7amignvobmi3yvpfyauvuye7v8dx2gfjbo4aixr5g9238kfwcpg8bckoreu6wwi1md1qvdcqqzeb1wyv0cf6z8ae85dicbv5nfq2ivvox395v9avs8qz30opiswgdg5jqbbzkbpku3qf5lvw3t6rrccbz9btppw058yiybwefvntom7v2sicvlgvqduye5jy0avg7p0ka3dwn3eeoje9xg884tu8lcewv3ugtv9ujqm515olcg8jyei7t6b54j0spwpo6er39wfkpyi9e0cicvgf8vv975ylmk59phnmqw5y1nxpepwu4rs707wd8uqiypg1r09iqeskhpp5sxquks8noe3ub6mcg0jb6ahtpphdyn8nimuowfvrotzknd250v9h0tdfljt86g9zgwvitrhpqk2gpor9en8hou8ccrdpg0u4gbajiwcbjmmyb75jj1nk8ugvt2spzts0xfo9j9i9wjczw5264bcxkk7x96xei4vhfciirnnil0d4skexcsu6aayi4bheej2836ei6equsrni3uzff05bueqhgbeotqphazydz0kr60vcng8s612abw5yj9zu7u7a1c9aeyxspr61nrm3y8djqq6ihdz2l9jjoaw38et73s5i88jrn4zqd1o3itycz1j1rzg3abwmd4ou70rfp0b46fqyzc6ctu7evnu3x7lrp1smv3dfnowf2f8dme50pbusnasm6o9llye26w7rpre775155ry09pk3tht5vq4bf5wl2m18i8kvvbse95xk5kam32xtbxjxdopmbsv8mdlt3sun2pt9zt3xhosb8hrv68acfjybg7pweefaqrryi70o2ojw3kgidnaa2t7ovk9rpaoa9gic3zp4f75b5cvtecytpzrlktwl1fmnsg3t7hq9js19micu4zpxbehuvcvu6c526nqnu2m59oj1ikwkf192gvcz3uro7si7twdyjx2qjdhke5n6fozy',
                proxyHost: 'p0rbgi4wum8d4v8ijeer5cd9amkjflgu0bxfwa1tf7eus03hweja4ygxq10v',
                proxyPort: 3944557871,
                destination: 'tp3lxlgs350yz5s1xvxmceni8wd3wi7i1zqhy333uvia1204htx85t8c7m3omeqlh0fb3xp3kogaqbk7vf5e4qxzjhbwbgwn7rncbrsktcvu6pzi8wf18b2u9ne46g3n6w4qeoo40xgl0aztvji9f3ln2ypcnlwfg',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dlp859ty521bkjkebyrxtw2kt1ceo39e13blwnecnkd2k3uswx6q3tehag3sn94hxdpgq0yorecahpzl5bbfrhhljcyzpyrfkxbmw3m0y1be7jpa3b6sgd1wqeow2awr0j0h20jlxkx27bidzupomyl2rpc4io5g',
                responsibleUserAccountName: 'xn6bml4e6bms49iyopdj',
                lastChangeUserAccount: '0xhb7h7c8rizclvn3nru',
                lastChangedAt: '2020-08-03 17:31:12',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '1x7g0p24xfk4cq6jn6b5qtt21a39373jnzdemnao',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '3z5qvd5w0cnzyn966ynvi9qsg7yu93jxsysl5wuziop8g048bg',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'ochkxffnd7ypk2gqjna4',
                party: 'b2mm2otgfzlav98mn2w7n6szv9rcdkjb1kiv52fciiueyy99zaav5d7al1jpn0amqdjahpi8s5fidiomyost8fk6399oey2ko7groz2bme2s6c9c73qee0d7ys6tglx48bq0hnk665rie30t3dyhpjj7x8h8lwo5',
                component: 'bxtew6h79v5p0oh9vhkgxhpmwnpncreywvnxj0qvlxdmmt2q89pwyh316110l7hzcg7bhz4q3u44b58ckw8ne4tl8onjckgkberpbk0pe6i9zi5uhohy83yxw2hfpveg61d56349zokr7wmkaaw0svfyu47kshmb',
                name: 'w6w0wxedfxvz8k3mnzmuox0krcb9ej2uxao42yd7pa0ifdrtp4fy05iaqhjdviuhary3t5ck8lfkpmk9kh6pgug48urm9s2d621w6wrrxbos41eej0jftdg9drqr49jnpeubkngomqlo5e667cdr6p8zjtchiw3l',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'o8c8pqqzso2spce3dpkpr9hzcticx912q25l9foklced57tiyreoa7h1qwi1j2fr594utrke3aglql3egyd51sied4e0fzwfr1gtdlbp2cdeu6adgoud2v9pi4u1kk7tpphsdnyycb78ryfyvbk3oe447eb4cz7z',
                flowComponent: 'sf67oq6jsgox1qop6jej3iv380622j62br8ewhnmud6st8omwfqij0r7ieb6syr2j5cfbp77u340lreut6w5l4z3p1ffpxoh1zlv6h6k7ma7s1syto78waskactkd5rdf8uinl3um6zsmrl5hkkrancbgrlebdlf',
                flowInterfaceName: 'v8l2o9u11kvvxeka4g22ey79mb725r8fy0o86qab7uynr4k2jjseri9klawccaw6jmmj2p5fpdhe1y2g71rudhu9lj2340jzbp0k5ikbhsn65arhch32qgbzykagl9n7ter4sr9ivprxaum57vbiuys7tcwtbwgr',
                flowInterfaceNamespace: 'tq2gf0jmh4wbbufw0vcboh8hkc05fa755v4au09p9kng6o63ywk7xmc3244zg1fuimil1txliv4jm1n8dp40d4tbbvodfh8ki35ehmofiug1ztzuvehu3zjbpihnz5m6ava3e5zmskeg9jvie0c28uq87tkp6cep',
                version: '5vfmtpl3lrd5m9ebwqfc',
                adapterType: 'suyor0o9p7fc1z9966sj6hel5dcdpm423hv792yynywn03wz56wccbyiasw5',
                direction: 'RECEIVER',
                transportProtocol: 'b5wwa5nba4asfz9ro9wiyhxpcme2brozg9z5t20jh6fgs9728z3qol6nevrl',
                messageProtocol: 'zgyg4klky3vhw8b6i6j95xee5hl238iij5gjzcnvd3lkencqk030rw3jo7c2',
                adapterEngineName: 'vhbt4fdshplnmy36im2t4gavv8vgsbhwyk1o9vveyufe8gbpo9ehe1co9zs5kjok7degdpgzhse6k7957g1me3ohp3hf9dqi5dbaqt5jxji858dbgk40pwcvzu7l3aue6erskdao4jdwhbxf5s1i2sd9b2wc7q8w',
                url: 'b6xlqdj8k8qyff3z5o23yhkdn08p6fq4f50r9u95ujmiyda1xbto9yq7nkbz40ftxvvyz2lfxinqtazq0likj72sxbyaz2x7vqfdxi5ql3zspid60r1f86i40fx322sgix3xg7qi0nrzpg0f8fb7yf5vqostrmjz1lso0a1yyjd6g1z11j2o9mgr8k3ha844sj2h6z7j0h36lv5srexpvn12f4hi636ukf5m4nu28u1xzot0m1a0dt8eykhxmg3kzxx7j2q2n11hyjyugod5vjhqq7szy469d8yc8mwslo4s3ox8re3b2bczeor6gytp',
                username: 'vzfg826kly8pu9cip9q91meotktpin4565ucwcids7twngqbppmygy5pbxau',
                remoteHost: 's0zslu7y2u7dsmouzcaqgbjop2fzevalauuy34f3dufjuxr3hbpgz9b5p608sd5fk4dny6micef82hx6y8sz31a1rg9yhtrn1xozmzesloxzzlb4bwiexsdpnoconf4pvvtg2lgo5zjotbx995ztvdmo9ntwepgg',
                remotePort: 4195183365,
                directory: 'ycddkank7z8rn2r43bqj1c9geisc9055d4bzlz21l76klb6agzsimnlbobt0of3t4z7yj1hdrkq00rpbfrlfzshu7yh3teokt2honxnj4n7nwugki7nzntcf91u49m9ps76ye1rdi7217mtqo4j2eutuue4hgrhdh0g1h16ktozlkupw9ettxkjxu7ym2orkrc4hh1ypi0ohbnj6awfri3yqr4b3vxm49nhhdvacjbm3us5bspy63vjz0ou68pbctgnl5b6nirc979vb1atilkh1cyj33obgakrvbl2qqpm1rm78aaibbojm4z6wc6s5ibof6rqmton31reee2m5xbghtku1vbfpgjcjt7eqwp3d3fgyjnyl3om7tsjrx0a6ybe6zmf85p01ijomageb9hqnv6ynx2uj558eord1r117drhq8m838fdtmr7rv89ob0bgvqdhc9qh8fz40ze1rtnuqjtt3vzyj866hgz6detq3kjb0hqks15rowvy13wp2r203a95x3bbpnbbdqmpagyrqg2gfgp1erib1ccc3auonmsjopszsa9sie3v9c3eyethqcmb9oyohovcb8pm44mohvrzm1vzeoz4vskzn73dlw5mn37jqwl3bi8ybd6to618lm6xme99dy5al2t3pwrqeguq1ad84uypkoe9o57asuprm7jv8kwz05pr77q6q9i2bebzha0y6c4ksltjqqdgneacuzwz1iv92bfrbjo36w1qgmcemaaypga4p4zjaks3stfaubyczud73fe32vckn4tejr6d7xwyjf7omq5tvnkaulp97ci455zp4oss63gd0nlh74t8h66hteskd8gyepsdqv358lhds5x73vr7jy8wuid2ddglwjn4u9vzbtunb1kikhu2p5h6e32r1bad7tc37mc5lxve0i02t84y27wag0rqk7gmf3l5nplpucv3kxwzo16t4iyoqpaeo320cvchil8wdrg8a66rp5o3y8vf6t82056avn9rj5zg',
                fileSchema: '54hxwnx9ap235hisqnya9kk28onu8u5tgtbq1ry6h97f6ja0jd3syz7wa73i8wl7czmvyhvsfy4l45snfmd7p6m6uiazh5sm72izd1cx8mspo9or5iynm5cdffafbe9rdky4xqz3tp7j4ytnrqvt36r58posgdlcxokqbpb80r8yufg7vd3iwim7aj9mvisfcf7npig23ey3m64b3mwjjvpjvkoba6fvuhpadwczzl7zgwh7wuc6reypwxf1wmq1vgni04g5zv6npccxzd93lkzmxe9r3wklqjizz0kammq1fuej58oj2rueffs4h1pc9v3job106olu1ro0ewj9j5a6mna867pn0hgo9u2y55ybespvmp7jjyfbsfjejkl3egxw1t997qf5j5d5qh0ryqq6c1ak57k3hdg9kt7g859imww2hobzwh0sjd3s83jfxb2lmjxkodjfy1wpw62ijtz0fnpliv12ejpttq2f9pz9tq16704xgtvjm8djpdhlym5qwxghqhz9m8p4fnyqun9pga6mkk7a6kmcmpoqvv5b6ddd77e232xvnv3ilvf6t2rxt3zz2n40iqy8kn5n9o76nfrjewddqk4qnid6bw6az66a6ystka0fe9s7l3yhxbq4wd848rd0b0p7mkdoy81hiz64azhpi2fouub22yw5g4dyl4nxc22k7yoc2x4jq6gl9q1y6ys4dr1g2jdw9ilnpb1yvj2u9mjtk9rtfamksamltwwmw38mubjz84nqd6irq9i9rtn6d8d7wjsi4682l2vz4v7cajen3fng7afdzenuue66nx1vav3yqbjpfmj39l99622mmouib9fa03gc31mp781iougml27mn85l9ii6g6oihy9kzjw7jud2a0xohpgm3hplol5pt1r1h4h2ozijg4m81aznnqjrrv9qo9lbbxnp96zhrx9tzfflo44rc4c13z0ckwzl23i0mcpe1kvrdrzoh9r91tjiolv1943qvfozymxweo6qyha6',
                proxyHost: '2dwivy5wnnzg5bzgp5a2wau286uf8uxgyfv9an5x61mpz32yn8srf1fmkk5a',
                proxyPort: 7432201869,
                destination: '66p4yjln8h39zhsjfmcz1c7ovzpxrlsnin0jsfpjcx5kdckjufoq9qb0uisw5v641a633auxcc8v1ynku26p9s514ra8ue8qd94ka03ogo1hl5dvgzk9kr2vaulh9r040fvh1kfsa0323nd03cufompekswcka3v',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'm10i0qm6e40tedezt88yoog21d7koa8amhbbkgwrv8o0vox2w8ejts4scqlrqoguqfzgnmmm7acwun3gckfz22tkhvhd4xqscslo671jdzj6fimax8r3kq92fyz9rop5rpvq5bzgg73qo6pbo2zurk2rd8a0mdrgm',
                responsibleUserAccountName: 'he1vv4intgjfydhsfjdg',
                lastChangeUserAccount: 'waa7m9x2prl7xq6bly2l',
                lastChangedAt: '2020-08-03 09:17:25',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '0qonkmmwz1eeto25ds1dqm521io7d8cp4q4s3yqx',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '0xxahr21qnk9e4w26gzv2mk4auopx92b1jc8ruh2mhqphpi5qe',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'tkte5evsmv8lvxaqilon',
                party: '13edwbi61yelw5hndc5jfighpus4iukz8vbz9ypoul7lc4bmg1mbvrjkm98mhsah1q5kic38zxeu3y2hkrj5tgpsmuqcvem10jk8xi54uand4cqsh99pjxbp8okml0t3sgq6k6ugj8wn7liu0nhqlh1ug0760trl',
                component: '5fzzitimevxpdgwngxfo0ssx8v28w0pqzjwv76zqptlw2d6t0fitnfvdg2yqndlzdsxlx57jeht3ygo4d3yk9eiknsgs1p7qw1wjaxe0p2zyychjh6wdfzi9q4jio0ip3fzzxbi093tgia85u1f26ohz5y09kahg',
                name: '8n878ii7s90acvgzyzcgjtdmh5spawbbcjlk6lwsmbdzyvel21bpxf08rmuuysu68v4ewcw0vc1cm1ips11k8nd0tqv8nxkspbg7rn996wlmtqh8yst9gd07oiuoh266m9gvmi05y9bxw1bmtxeqjyfssz32jwsg',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'epqte44232koxotbcciehrhs9zek12bipx1zw2roxmdtvro38bnjp3nppqeqfyynid67eu7cmhk4aslta3ypv9xvwwqnzjry4wr7bfpdd11efsdbec2di3ntyqux52tp8q99cwkghjxqespu1scax1929cmkjz6n',
                flowComponent: 'kjuos6iab0ll53132v837fkf9305so3nxjwjv8pxe6pf334aiv072pmq2k7e6vzl9u6cm7kb6r5flrgspra2fkxiy2u2xzilqxoe2w1ap2fupsk1j99br3q0az5k6ph1f98z4488xd32ut0woseqwh1nvbsbq1hd',
                flowInterfaceName: 'ier7urlnl1rv9bvqza4dvuq3rj4312l9gim07auzjfcyh8v66f5orm82c4v5w2fjqbvroqzoufedayt37ck1aak6by43usof7dzdqb881n7zy1bloufmxtab5vrmkc0b70yx9zknzzjpklowpmgad6t8h5ljsnqp',
                flowInterfaceNamespace: 'bqebcth2y8m1occju7t3kevtlhrhfyola77zy5lytz3mqytgh4j6guxwx9t2oi00i9e85dikxn7yr5pn21bo3vrml5olqqlufqyarstudkxgtyc8eemainpjkp57laa0wr6q1jbtaq7edq3zhojfbpk9sq7sl5lk',
                version: 'boant6jlogsu3dzbwxhr',
                adapterType: 'a73qm8nciq6tdt1j85aaefnw7cfoiilpvt1m6ggf0cdhw7saeccimewe0i6a',
                direction: 'RECEIVER',
                transportProtocol: '7tr05ry3auhangg8eqqj197pkwto3ph52n2trp8nqeiwkk1fohratdch7asb',
                messageProtocol: 'sbnekpas2q8knwimgwjpw9x5l4pr0aquerdisy4ozmkiy8lkmw6lyd0mn9nf',
                adapterEngineName: 'noilb0aeer4elmecjdowodlc4m2a2cn3n26bxvejf65fshpe9qi3kuv7ojfoa60koy95km1pi3q8e625l143maqw5e5n7bluesxy9zps8963ccf58qzsjenhmjt3x3mj3qncvznqk8h5a9wzxdcyfakk6hs2ry4r',
                url: '2sri0iricd6dw6gljszdj1p7ozfz2ze5ib91t4fqxwgxvez5ra49oqaon41719s9lhkl6dpaoo6m8dn8gc1omgtpuswfj7teo13xdcdiyqvd5tsuap29jxakj8xvpyazfdik10zbn87pv6esfbk600t6dgp6co6e78tt5fm8kas8zyv5xgo55vi7tgcrir5lxnbp5envdg4eayzxqmvk35xg6e744m7psb2gwuyobe9jrsr7s1mg2lygpr4bxybse0o30d63l7qhu1znpsqtxiuq5tsxaj5e0hvdtm969lpjr16nvocznk6oemhouy9b',
                username: 'nwtg20sd500wbtju712ud6jfvwzamo5ebmk3wewwi73vye8klueyx76fu2gb',
                remoteHost: '71n4pwj1o8vbxnwo3rz0707fns3m1wbet5v67crk4dca6l9p1u7guavl9ktcfec0nvtoc4qzzadikaf5o9qyf35nr1yt2cgkras02tet1ngymy9rkasxupo93df58ga6c7nifu38ipnv3w8rpndkvey8iumbebi0',
                remotePort: 7571687948,
                directory: 'tban52zjivgmmygyesnzsrovhef9legx78v7worw2svra64oowuj6a3ifinphrpy7z080mamxl28kcknnl8i03yu9n8ry7m47j6kby2hyebp06d17z70abmp8hwmkmqpk5i2zntsvf7vp9gj9z379dlq6vqqlihv4c5lqhn4c3w6axwv7lkg81u1h9okpbyq61g7lcjpvu7n95syi655gqflomtc3zdw0t94rjgtytnhlxkm2k908m6bxk51k1edip8bkoqw7e2wq4mtq3fqw65d97r4gl7w5dx94kjvsoxfogxs8mc9yi5wuuczkkmc13ruaqgs3snkwe3fgdcy5st186a6gtyknpwtthwa46qek15arp4mbj4ad0hu7p3ewvdhn0b7ootmc9igiy64fyecwm23ox33yumilzbcmbas66eu5vto8bt4hrg5tktwhmj9248x34apair8dlma3z8u50aaz3o1hktq70715mb7b2fh385plcg1z180upnbr0dyx9cc0zbdf1596f2wawpvrerlfjez9ppigp62o175ir5kfbqdmogasw5akxdw9ilt6s31dwgsejj4j5oic9il2d5k6ung9g48lpyshd18gkc4le5m99say6fbrgvtrq03ln8jc3g1rbxq52pqsftw7vcakjex52hvmjz29jm6bwflban73fvmq1me1261hwpqukuz5e2bn7flhuxka30t98czb4efadjin1ir0umd5rf9zms12sks3pazygeaod94k0xku3b125dz5d8l18n2623tbrc21nokcqiozjprwu0j27j3fegygc5zep28njkvkvxqv6ebye0c1uk7s3u64w9cmnjwxdicpvqdgzfulmtejm1blptwtckfiixpzznfbksebwxwm6bld8ls5w8oa7gnthqn3vy2mt0tqn7wdpvxwrjhrtr08lg4w8pu461y35bikw3pwkwfhyyw2jilf7t265lc76kzeilbzq7hmasghff4gr4epuymqkhg',
                fileSchema: 'n6osil7o4w6b6gjszkvyz0mg83u8ap0krt4hyzgu5lbf3ytv5fxxpobltbkc9hvl28xojki737puihh53n32i6reb4s694tw2qh0jpkq2qbwc2s165uuacewygy94cp5zf2v0ihcl18cbijhlsx6cugqahhrvijhemvmvzc6ktbpp8a6dh6mb8ihoem68n856k8crr2cjuak46902ppla766g8ovo7vojbdsmp1x9rbihw8xe2azdpfmaygcciauhaa4d9dmvlifdoid81gbxdn8sf9tqq4lit8yzj84wgd9rie8zzzusvvlhll527n6hgr7oswhrsb182g4dgofytojtiiqkegbi1nybf18xvv8oc5fqy7e8ww04yvrui3o1a1suf64gu7u4o7pijpp93mcgt6tu3ql1bb4xas93sjjv4s0atqq1z1nzhywckzqd6nonoxug8m5a6q03tljfstrwmeeicwiw6nxvl1f9umku2gikqk3qwqmwp8n3wj77ou7xs88edojiwq7bz445ygnge3a6yhqt3w0tlzesh3rlf7xac9c8xfxkmzzun0aeryavgrf0q195aspo7azimxjxcul4ff6dr6jlb4drz8gr92wz37868cgn5cj9seii8sp7rjcu5wrtotzn0jspil9qz82hgnufjyubt04vz956enfcwqruv00z7d6ruhg0xi9qtfekg0r4s0cc0fdz6vdgwcpmv1bdkt6fcsx8pffipjkck91vrk38x5cxswzrfc2ak0eru90rd08s9rg74aru5yg1osu2br2675mvfbtfva5fkfgtu6m4w6qsvets4g7xw8ia6hb2c8l6dipqin5ex7wjj8ryon7mwin1m3dl6ejk8uktr090yx0qtel9u3aelkvpifldm6qrexx51vx680inixsjx2n0m5udsqdn2w8s4lzcx8s7nya86kibf8ayyawje56ft2ki7b89wwcmu9p60qgt560qcipzz5noa7k1b2e37ote0pzzwaj',
                proxyHost: 'esfkmip2q8iby7eik3oyqvv2u7zpj4p5qkq53pfzm15czg42626sm9f4dpwv',
                proxyPort: 3139625659,
                destination: '0gxuwbv1w6grdthoh9t6ws54cwgz0hre5iajznoyuq3jak78vnq5vwmbybj5vg79ducfybg32wq5nk6dnvqtn7hjr7r8h9vgrfiexvubl868rfexn92rj4qag6maal0psuzs3chdo9feuicv66a8484vskykrwk9',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'egiqy1g27ba92mxddwa9o2lt4jqh867j69rymzqro8zntbhgcopmzg4rnq6t0k6mte76vwc3wuuokvqwfckhhmztg5dhgz5tic1i5xzdf417uyc8hjjs4051i04ric7gp2krj5qn3aacjbfkydvtedtdn1z9qc11',
                responsibleUserAccountName: 'uvstoysdpu6y6fwg8qcz0',
                lastChangeUserAccount: 'sfbo8ijyuqg4e0fg7xbn',
                lastChangedAt: '2020-08-02 20:38:30',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'fxbj40r0ufitvype7avu1y9og6hi6ijtsk0o159f',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'nue3g6okhqfa1tblxupyhzj7iyk4h18vi65npy2tkctmsey5gw',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'dlhis7x66jc7t8l1vls7',
                party: 'r0mz99pl9cbulin725d1av6qgtzofibu7xu2d2ha5wpjn2ro8ikd0qwaxylxdjuwm4356k8hsj7jtlasbz6rdtpq5q2rm6u0c0kjn9qxkjb5f0xx8r9qijnfizsp10hos7edu1w1fsip7di52e9aqc1kvuy7war5',
                component: 'wdhnsjcxrxiitt79617d5tka3qic1sg33lrerzrsllrbu9bep8w8hlpb4gez7f10utp5eaie2k1xncockjkl15j393j7y5wzuilx63r0rdz17ojuvqomd8wg88sgtk575jg1a9gf1eoqwl8olejvwgenjill7ah4',
                name: '8pvwedcug94dlnugig8l5it4g07onmo14vb1ojzt9ewcdxmm7zjwg0nzx7qqi4z44oig5yiurqt6esu19lrkkhxvcmne6prt7ygarx032beluc3b3a9zf5rig1h0issocwwceqzhxaard36t1am3szvh6vpbjz1a',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'mgmzjfaf6ly9cdvesceasgldp19iucgi9ni1ng3hvte8oi0yanw30rdunvd5u79ll08y5avi3ctso23uux69hijfr9uukp1utu7e25a2e0qgp7rv2kaejd8zgln8dktbg8y4mo7wo5jwtfl9j9owz5qm05pcbale',
                flowComponent: '3lfdbuhxabwi2fxcbx62aemmt3ek4cmqbi843a3uke14ai1213d7e947ml2e8qt96nnt7v5212a7y4fc94qdvmra50wbfc22so2w276mnxalf9aruh0wigf8smxl64766xnu2ckdkojs5n2kwo05zoj4fng1mlau',
                flowInterfaceName: 'fujiynfxhcicphiy5mkatn8vlr0l3kmwtk7y17yydmywgsy8xj7n61w0e42qq3chofxbp78ub1dd3im3u4on39x6knhwuh6haapd4ivhsasr9q7vg1z0vs1tc5fq8lshrbe7th9drlnq6g52wou8mia6lbppf9e5',
                flowInterfaceNamespace: '9cryhygk94oktehxloxvwn7g07bmjlpic2urr49p26c5m83459k29cle1es5qkiy4t9x3n8ohl56wxw64vrfw7a6n98wzxwyvfioce2657jfs5tn5kxazfs4nbv9dn1yf4ubbd5ypg5fbruulv5xpsxrsem2wlhu',
                version: 'av957d5vrb7sqy88jiz2',
                adapterType: 'qxz63ipgvw6l6094pmls7u7zvgd2iidigur8cmak5hrnyktbrl38uuv6mfww',
                direction: 'SENDER',
                transportProtocol: 'srhdl2kpsus2g1zm0pasbfnw2foq9jhy904snx493i5cim5x066dq1mh3bk2',
                messageProtocol: 'cejp0slvv8bp2ql2y9y97fam33jz1xsmb5w3o0tjtvgxr2j6v7yth3t38u5x',
                adapterEngineName: 'z9d13hsp5ws35zxd1wn792s4c58scqqr2bnnibczsdtlllthm5h1anolocczi41qndh37ihkdwod2gnb4ayw9jqy3l76cpizpae3uppc7uffwu23df4a29tjc685qnhuq903np65z0t7hevuxsl7ip8ch7dth6wy',
                url: '2ttv576l3wlpy6iajl60ugc1uhmnz043nqb7chx0fnd8eqr9r9evpxk987a9nxl5kbawwzvlmci6dtzju15frbf46jl0n5cd6ifkv513o9wc52agce2xd31qtguphzqtwjpzpeem8mhbpxnsr0liy8ad64gk8e7gi3ctib1naxaotuxyh8o2m1cgswo1puf9h4522u4c92vwipmnz5iwkrm4x1lbcm123r8gb0dw7v89m7oje7dxlvtkp7p6zg0s56okv9l6d1uqvp4eqj8tyaurget9soyankl7c2m41o029squ4o1xjq88er0oo5x2',
                username: 'b8njtdq4fngieuka5hwjmefqy02c9m6xq8z8fn859jgd0redb711xqbr2cjz',
                remoteHost: 'c3m7vasxnbdrej5rxmnrnurhwdovzs7t8pwt7a1dbnr7q2jjortcsf2rn0700ydzfr5cxd20e1nqtegp52x4xgo3uyzja84834xk6ym50sirla4pqyihro05p187j1hjpak3sblnm4v3fz9u3r83h7mbnl35r4ze',
                remotePort: 1988637977,
                directory: 'o6jt4jel545199vgwoa47xi2twabmwgdj9o5tji9b98cr0fk6mje33wcyyzfxcruao0r89yhdel6uspalzd929vbcmcmpphev5z1ql4a9ov2pn4nrx5gwtai4mrqzq7vdbbl5cx9gd2svy0g782uo65dmsyr0acxjej3wvrivenv90yth984lfl2kd23pqoejl6qk0424l6ixbbsg12qgur3bce7hh52w1omy3bsmfqtp9rn6w8ittrn6le7e4esgr7abxpnlv42jiovyqv8eerkewhmep847cihfsaqtfg8g8hhojqk1ekf8m60sdgfiq33kh0tyraj43vjm01bjrs28eveexzzf7iza1qhudbivs8zj6pkzy81em5rhjeeeppltcog1ozn3wbnu5thhbk0eupc7foy94szf6wd6f73kow1mayldjb3uvso48nh5opfy1jdjsp6b35za3v75fn2s4mf160c1n8w66pj50u4z2o1tjgyrsy0f8w129qogwjkr8qext1lvuoes1tws69e8k1cgwq5pozvz2sflobve3rihvca59s46kez8ttdirf2uoc32yarhwp4hdklxm3pyl4rha5jvxoxmpp210cyl1vfqe5nwejhxiwuxotvuldl67v9e2n5ane0rlbxlqjuwvrv994mymq3yl5b5zxcy7y10rtpxxmpi892vrb6jhmxer50dm7b4jbgg30pkgyvfbf1we54nyqn7su5u9nubugwmbeqttxwcaeelhm4cbi40dibj4k5j84dk074vipg51kyvvf1mpd36202px1tnue8qzc2odsqavrclv4hzwmedbwe538o8j52lioo6mug6cqvbl4n18lguqgcffi7c6sym2ldinxvyt79jtdrc6xfok5cuyzc77s3vh5qow8lh4cunh68vuion63etk83f1r1z42mr1zj7gc4wf717nqetemf5cyum74yznl2lol98sht9r9y69dxq63lxur3ky459pairvebhfnrom46',
                fileSchema: 'lsds9sr5fha7dfpfwkeffexutglex3wcbrzhmmgcm4ajjjf66qqbc50eayqpn1hz4rg2ocpp8mq66c9xbyjb5cdnub4ondqqwueer6d82k6ne5qflugaxhk2yhe0hk0vxdl5bicxvw169jq4x3vs1n0jce23a46q0lit7tfhet4a7adibae8ka6pbirqa3846actqtkxlo6083f7rhslpbqavwwa9zb4h8j5uea1h95llzbjvgyu09abohorlhcxxcdy1qm0hnce686g4d2pc5h44aw0cg13a2bqboao663vtt288kmmrkxf8cfh53bp04cnj8oydt3nnue8n6cuqi5ax14knegdct481zr8a6zi47agm4r6405krvm6h5pygutiqgow0i8wy855s2gfkwbhpddj1mfxf94u20etejbyt8air7e6osc846q85z6h4o6srps2dv5if6oeb7typyotsrwyxdqfcwkoy1wxg3bjchyf6dqnf4osg0gd1mjqi4mponx38ue4p1t0sk15ivcbp1c9vja8qpwxdbgamm5c0h58kxqab7cecpcp79a3ep6vbjbh0zv2qpwg624gugfz2y48aml4ua6i817zj6wf9jkyjybh5p8fxi7wo5yj49w8quim4ndqzsujcqf13964bhcn5g7hs84ehnwnk85xeh42a272r7tqjy80k2ap6vqw8qsm1w04pybe78t4c0mf1hjb8dblxl2cymzx1ko0bzqkuskwgnwx6e2clcpjijs19u78h1of6rrupk94l9nrn4w8s9a8bmij2ab0r2l37b1eu50o9wzva2s5pljfcmx0wtbe84c5l33spk9dfqx54fmt3rd447wfeupm29g6x7291xnm8jh3qbhs9uoou1935g31w6vpe9o9zzylk2onj84lkfe9yqntryw0drx067j3szhthlmhhj9ivcvpzsudf9kop96peve6ck733pylfjq4u60v2flow84dqwf26u3hdfoobjgopvuduu63',
                proxyHost: 'rgqil8gvtcgiesffxqblb4kdypfz0c4p4ydwg4wdupqu60c9xx5b7ru0ca0w',
                proxyPort: 9765014582,
                destination: 'z6n8ggd94vsj3a9l7t13j3kxd55nudvgqksa22qkvqvpbhxl7pqdccpyf7os39j47rkgogadh80kwab7fdrnjak2nx085your8v6xkk7wql3bcomr0mwa3aatkvxrvmmayjvxu91eie6gq2ab5t0v79daqdbdpqv',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8ocbaouns23jcw4awn10x0ke7voi0c5rlguhe3ic7k3hm687z7mwpsdoyvl9099wz7rmmsjyopalbd8i9d6l6n1j4dtltyzmeaurcd7z41o0u3ezlnqlse3suzpefz3e4hrxyq1siw2if8whg3ob46z2w5frrx5d',
                responsibleUserAccountName: 'j7iq254e0c1v180d346k',
                lastChangeUserAccount: 'kitcz79qdafb7s02ypv4s',
                lastChangedAt: '2020-08-03 10:40:27',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'n8q8vqoe46d0arbfuqhrquw50lvo6jdyz3ga9ems',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '3ozy87r4ju07q0zcce1q5rjnvhn7uzz2888obqtl4s0762z1v5',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '90wh4fagg14fgsigt3v8',
                party: 'oxd4p8pqfvnzgdgf18pxf4z2cecxx0ys1m8mwdww2qrknvetgx4sk6wiwyusuj5t8kgjlyg950kw9bplyh4ze1p82c78bdse92ol3brq26ftuug2rdtgr0shj0apngm7qlplk566g512a2x85izhxpshb939y1ip',
                component: 'za9tmq4pha8098buf3igd4tnmla9pkfgtf8x8rqab8jqb8pfeehifp9pmzura70gz6mnm9s6bgo148d8kc6v6f2p2qibgvhyjxb15hu6tthdbneu49zp9i6qassjmunjrsb6lou89qac80d88f9whwgalqpgx1zy',
                name: 'znbpjr2q4b4e1gkukkkema2g2rkcmi1wwxiqjv2i6hoqcedtl1bpw1p2bzykewlvh0syn7uwkkqyd2482m2akphrdcfktac10zrkj0k2p44krnfr6ccrhggfr9n1yge1nwjgjcy8khjhufe3kcnn68e8gqtjxc1p',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '9kobnnnoop6v2y999ef1f0vpo2iblwcuwl23ftb76ld5j5qy759incig8wsiwadtjfovwc9bmsgoulpcbilui7j2syun2htyi6x13qttju4o9nrxak4enmhsw9fzdxxmdk605b3b6ls31gf0pjom1oz2rectfxhq',
                flowComponent: 'wv96p65icgkclh20xxo3v5mtaz24vdf3zmi2btbilarvqceak6xl44cv9stf48qdf1xhamvesinuxb4xm45qtzdlox9hgr4qoyawcv3xa8z4m76ffspspl4h6myvm5b4zruajz0infhxhthzb8hbz7p8iboxt6bp',
                flowInterfaceName: 'qnu5v1jo9usdhgjoonhd5f6xo3xof87yf0ali1zwo4vqdeox64u7b9p5ge6t3dmtu21qehckenpgxxushlg2ka1fhte4e9juvyebeu7a937tkpf8bxpqp9uoayvwc4dc5od3cnt2f422jrfl6spw01xr695oxpnw',
                flowInterfaceNamespace: 'b4ibs31hngpn7eb5om3nj5o1f3pt4a1fvh32g82bjysj4breju24eemq0acbs62qwo2e6g5tko2zdc69bv5pidxeavq0u1n4i9s3jetywm1do055dy1iudwbnwx3acqmaqf8lqplrfiahu05uvmgvj5ng6jxs3a8',
                version: 'gk4mf0mscbotmoj5du3q',
                adapterType: '4vqfs8pn7oz23iji3dl6qnnpc5ho22uf73psoe9fiikereaocws74ov7gkgn',
                direction: 'SENDER',
                transportProtocol: 'le6b8biari3xb61yfxj3sbn6g29jxe3mruk1q4319cluf01dq3kxqwynfgo8',
                messageProtocol: 'egc5zen486fgtgeu8507i8axj29h6dminjn8lmr24fzizx2iyyvv3rho10l7',
                adapterEngineName: 'aqtp7l0sb3zfehzcwwvd5v1o06uhs9xwbc1c3lfzstz2wpfenv1kb4a6fft4gyi64jcea8pobxoztdk06gx6wl56m6ul93fl37d9y5qhkhelzezbh4v6txaromnvtyre30xg7zbqpv3ysouez8f0pm1n8wq0klke',
                url: '5aeh8u2e1uuo3aqpbfvuawjdiewaahs9heghy3igdotlo84apdj8klxkesvmknd1x7eoq42bh0rcekl84zj1vpnj2dg2nbnbvuo1glt05mwvx2rt31kfdmvwnw8ql19sf5f2uablxu7ejnfix6j5tak1xo4u8gtp8qwsjbscezvxevkuk4l5tdvumkdzhqbhjcjokgkzaippfgc4e7xqveolv2dcyhweo8zmm0vfm0q02ghlrpj98r0of6bzs5grng16v1edlo4k0xfpopdc3k75n3cvxc9jvh5koojhzolavelpb6ktzcoczfpgg175',
                username: '8f8uj3ra4zx3bkvvdyqd90hyc6eq5i53hpxj10e6o3pa0jt8ydcl09ehxecl',
                remoteHost: 'eos6ygmnkmp31em12kt6p1pyl6clgsbluz4d86cp430av18mdm18i8acbqudffbfqy7m9vw0wsuzlzlgv4q8c1d8udttlcmiy5n2xttouzvjuhfnopfd3zmnstvs2bzgchnnak678nkgr471wmya8gncenedrtyj',
                remotePort: -9,
                directory: 'ler69n94w70ynecieic8b6hymwwgb0587mpj6rig0eik7snqxy62rmhrneivscci2mzcnzx0rrm00ppe3mezywh9cbv7402wd06do7kuhbkedc7pojdmc3mpxatbjbq7j5buv1ka66wpd3sghha4ol9ij7ma8mmntcj3b0cazsuj3omik7wg4naig9j8zf9go2if543v561mp6qjhbgzbg898nwdk6z7la6aqj97kh0o38zn2ysnegpg5p83o3h2wazduu2mnvpzhiaqmrxg5a6190pqmxhddeoi0ffnkgsmsbostnnqwyb92q52w0j8edkt3mrrnoyut9ndyaaswp6qozuotrdbl9rl6o8p2gvfy68q6ia63t6u2vsj62arn30g9f9efbqp9ufeml1ul776usijsbcah3ijw2d34o1m67xa7qcqlxb287pqv6fysexgji1jke9p3vdut93lrcaz7bzpa8mwixw62pgceqyjlcdy6509z8xu7hw4tj1cdnfq7gduknmpa5jqhflw7246jgmpprghzzvb7jllgd7lxg2nptq0xn4d0ltdymyfjom8cw1wwk06yqblh8dbc2u5sbr2pnw48zrh4iruv8d61pdlv1sg561ta23g1bytlli786k9wpw0j6x0janir61sln7ug0q4e4x3zsuiczmufvghcptmrq1itwq246crgl0ktlxtlvatsgepw55u0qdrjtjobiuclm3ia47mq3xut9d23n7c6oblz1ya4nj11eba0v3isc9q0q3xl63m542zf6nhaxusih17795nwg8kqk44c2nfcl7l2d0p6nowanhmcmk9zzdx8bp6t4ujytm1phc7vfhbse2rr97ptgz1rdwz899qux5yu8l2pj6z3qnn07zgt2hzvjlhkiy16o6nrvex1l2350n4lxboeg1noqln3u0xxvi86l4m3xi7rshyy79iwm8108q6xgoegaqc9x8dq94ta592hojwd24xdbytkavr439turpjukt0',
                fileSchema: 'ehbmigjwgzff7t90p1l1blx7hlnhfbum6qdylasz03yprrcw8t8qifr87y37hti1wmbinil1bwohuvbdno2xhqt6ubhifxlp9e70k8cbgbllfnzrkbnerk1djhw2xknzl7of4j50xnt0ftcww3a8bti6eh7nys48dna3tvyz7z4y9lw7uwc1g1lqynt13iwpvqpshjcn2zj6z12l5vewqfy4con7vf1vf3elomt7ztedr8pjunh6wo319fa9kev8aueqzafwjvuc1ox0taczxzyb9x0s4s5ek8xcvlscnvvallg1j70knhxxxpjj7552hjadjajj3ol1seeubpi6l2q6e06n9wmqqer4vkg1jji00mc0odkr03znel8dfws5nhr85gcgx63ltmouu7vqanbyuc4p3fsztmd3s7c1tepum3rlrhgu1lsrpafwqq1x5e0v8rowb7hzwatx7ldqbnuggwm2si9xuy79gyn052co6oiqvtha3ay7ty76wuc8bwwdxvrh0mr9fq151i92jvic002a079twaaxocdjj4280vjf4zem8mq0muulcymlm20cjwaof3l454xaowji9i50wxwp6flnxwrrbo8ipait711urvurqsre5zn1rizbe3r1ubdjhgheev9anlbe8oymtpvvi0377j30uyr9pjkmvgk5nsw11e96tjba92jdikxjzj4dtnj8jl1br90jqe6or0p3h49cxd98ai4tk6lah3jbvszwbyqkq8004a7izh6nes0mr6uirkxmimyd20llhnmrpixxmlptrvaf5jr9vaiawavechm3kkc0nlywb6apdddn7fgaci0ntcy1qiqjd102qzk2qys3ixinbvt4g9abr6hjw9h6yentqjqep2htwculs3iqmu8xp4420h7hgd67nwjp32u5zvounlwcflrbqy16ftmcric9hceosd0mdpee3tmmqcavubkqynytbz2thdkr4m5bqa5si0xsfmn2ikxg8bnn4wz783yd',
                proxyHost: 'alsv5asrcpctv7fdlemkznk2gpf5p3ll6wy9hmwncsmitrgxhukikhd97da0',
                proxyPort: 8378813064,
                destination: 'e6l9fsom8y1eukvj47j1zge0qqy0cww18wrhjh5mxn0rbx1ne519hoarfm5nadi2dd642tj45es605ntkg95zkk32ut9kvvfx9fzryp9je60yhc0s58h7exfdb4ce63z8ld6nk461b66ev5p7jqidfsupd3rhm81',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lu2kutxdzyksaulg0je7vqxwb4kg8yfn6h4hyug806qzmebodeoytsp0a2fzmzhlk3o2xviptbvbs7lwqvykb2y8npeay1pi2uzqz0fnweviil74jlll8ndqqxhuyf7bc883uj68qvgiqk7k05jz58crme1tm5ma',
                responsibleUserAccountName: 'lltfvgvkc31ad9bcpg6t',
                lastChangeUserAccount: 'yl88frufiynzvaao67v7',
                lastChangedAt: '2020-08-03 11:17:28',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '9hw2glozxpur6cbyxw3kjdn77cdfp6v1ximbixox',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'lf0w7mb1z0hjtkmneevbk26tgcli2y9amgv9jvxp1p34kkqmlq',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '0g46tgroem8k1sg6e07y',
                party: '50sg88tq3z2y74zynqwp25av3jcqd8icxetldagf46hu9bsn53lpsrsdfj6zcesxmik5tni5t61ig134xbrejo976x4lx65vcs0qqpxkvca34dyz14oreu4rgl93cclg75biqrcsgdwr9eyu4f23jmerxrljxt0q',
                component: 'iqk6o64rv6w2rdl360guz7evwg3kzy1yt4teur57g2xyivji37m3rt0wp6ji0huzz0v52p3xcfszdere1flx0x7p622dle2ikesvpro1m8khhfro3syk6nuz6te616kmi9djatpvqso937h9ypmx9twrbpuby787',
                name: '2sidcguovbc0l08ev2py0do92x95qct25kohs2q3tnuim0vjoj3py692c2qr71jur59lwgykp43qh9201i77zig5rlaphjk488l1n9mw8t12mpvl7p1j0wylk2wrnmxsxslohoo27sq1bstt1rw3fa3buu2jsnd9',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '1j4aakitgk2dheads556w8zmpx1wo1wr80mbfajngdy5dpo70r9co96fa3ev57tu2q2ph64etdwpgyne5ryogyko1s6xd8go9fe39cisce6eio90m10e6rkzuj7pj9ny9ehk0jxze12nkovtpknm33fnux2sxuru',
                flowComponent: 'wb7re6afuziwttswfczruwypcbz7k5vyygpxkbcvld3yuwbm8p9zalbp3k9zsase2hcqy18i2l8mywctat4160xjha6xbote9babuv5ncrzr2fdiinfli1vn6ydyej3imm03i1f4dmx1grkio39vvsqzetqxcbbr',
                flowInterfaceName: 'qft2nqgvblzjatc704u5xb163qs8godbgkeufq7brfcd72hxs97tcd3hibz760c5uaclq5aaickeou9eisj34h18j00x703rj27k676pejdtwsj8pe7p3xx2hr8898zw7j0awfppc9ahg9vyfmy65xzrxh6d6a48',
                flowInterfaceNamespace: 'yeequh6qb2rn0hxoy1vu9p92pnham2h8f4k3zamiwbzu04elq57q2m1au0kilxxvwyhp154exfdcedc598po2zyvn4rir17tcypf28zkm7dztwomhtfyx6mh1945bvdfm5por551n8x7cx77lasarmhuxvhsf6m7',
                version: 'slgndhteoh7tmzur397z',
                adapterType: 'lcyvr9mb57hvlhjnghzz0sxekqdosqz06pu1d5bldtyppgd3xg1lsair7i9s',
                direction: 'SENDER',
                transportProtocol: 'b6gdtfvxhkblruyltf2m71ly1e5b3jwygrn3v0vipcs3kjgaz0zjhbj86qmq',
                messageProtocol: 'f2988pw64lewi5lhsjc6yw62emdvf9s6s4kn1eqvyevgp62gacrz1zxzluxm',
                adapterEngineName: '1tejg5zjyvazsopj5escu39chnbamsjvwqogo3tulhs2uqjulfoewlvxgio5ceehiq5hh0ekskj890zqb0k19d6eg1fiqlxurnvdkz19m5j3aq1xiiz4i3nizjy4316fcn574xgwdovn7zl834ht0eunpcdg1ior',
                url: 'twskga4qs0p7r11zgeghgo2xnfsn6hhoqzo3oz4pkok18gku7ptpc9k5n0vw16dytyqezt2bk8ibum4vind9e8e827gzjoxkpo0zfbxp5jlgol5dqkssfkfv00neewsopnx54i0h7aiwzz71j3trk5lgu2qi3p7ghmpwuca2k2dxiudansaokw3ry78nzxi3jb7fz29fwomvb4q32amnjoorpm7qnjkitzqojbv9xvtzmjxz10bcv1j1imwxh3ziddpu82e5nahfk2pec4z381sdb4g695m5704omvjnl3utn2alzhumeeox6wu83aut',
                username: '5j7srj2j9vzb9gistod8dymzefabnqz2zgwcseqfu469l5of4rk4vdf0m4ni',
                remoteHost: 'i4lnlromszj6cbsibf29w1ibm10oufrmio1hfge8bi8fiuqm4v0jvkkf4x5b1yp6ps4zv6ihdmb9z0bhyk8hi2002iukjcr0oyagb8zu8kyodymc1ynp2qpwbeuxfgxauvk88mif0ca4j9wlgqwzjae4ek6yjwhy',
                remotePort: 2002519982,
                directory: 'hwvqiwwnqeq17416zsiwwb07wlfwtbbnc7trtqkwnklamr2cxw8digjejr287chtwcehflsn5g2y1u6de9insivwb2lysm7jblyzlbofvut1z84qfyu9ua030qil3qofq5mfeib9mcyv2f0j52lyvn5xatj2csaus1k873gf2fyk6duurdxwl8hurgypva3sg1677gymhmzf7p2m333bjm4wrw3l0qv0oqj26mwlj3v07utz847mecv9pp5zne35hkj22hcbztnfftgil7d7et9c0iob4qywlm2zi3fhy5xgpqlbbe9fdwtqjv7f8xynubxe06efmcpw4yykxeyfrtrqexnekqlw6sy1p9m9u8d2e8x1jx3awagsgrxr32zxsymm0rco71ea46la2dwrmmn2x79660jlrv8yz6w3fb8j0jt40tluxh7a926to5pbjqgw9k82xaz0io7gj3pvz6d1u62jsseyqmql81o7z43s77uiyg45y4in84kwgks52lqfcp9wc84sjodkxc1aiilkqmg6t4kgfmz6g99dz1y0oep2gvqnu2rlzz6jmmoz6utjvje1qg7jmbxvdnh73tgo421kvc21cekvr5jdyk45o8v7aasnwa79anbcxl7qdff2oq2gemk4sg2vh7rosdvvjvntwz7q6xra5ly7czhtq50v8h330gyphmi529bj3oe2h6xvi8sqrkyc6uffif4yali9wzpjxw19ahqkacg68fx3ezuyy7wfg2o07r1kcqu1hdja0roupjh0olw35m45b6wqzudksttkri6jxmh1qjw5lyixtbct6mucwvsfdunvajpofx73v7btg6f3eb2lgvfzq5stltlm18zqwwehw5il54ohjb9zbzxvtdm5wro31hw1qbpiu3swsfa4bvivdm10wkisyja7rakdwafhyewfkzwjlqoxsbl3z1xlinp4nk45ccyckkbvpiqxr7qgeshklgkg3n2i5jbcfri11pr1alg76j0k72cd2zt3',
                fileSchema: 'mnuhskzjbqdw5h57qi9fe7bfyqdz43z60kod0n5zr9k0stlsm5tovqipuzi4bsc3i4tpf5m05k4kn581cbjmi1reiclqeiefegdwv4pozeb0ddztdshhf1npu0dv216fos9bvnq2emdhb5twz2aoas2x938f6s6spdmg9srj0z32epoihvc3vq1rww4k8mi6p6chiirmfhpcobu8kzuedo6fpzx5t861zpjt4nf1gffpsffazzf1u3fomlkue7kg57stk89j8r1itymc5e1na68vim7g7s2m0dm9dymhia3wmxviu94bxccdrg9vav579hfmizd4s2b6cb5kltw35p75ttpjkkd24n4syui345sxgf7b09pkipofi0uotb80e44kjqb4rql78orgr3ubvg5k4az53zfwcqwhq1hsq7chkagn34ejtbxpwymwaa4nd0c4il5hwo5ibydfkgdrorlkntmq6vfcn5ax2wkq9i1qyft1wlmh9h5hunqbcxkelesm97y1mguu4lxf7kbr0a4o7hwphpm0kks0jnriy2accumo1sycgoyjpehwcpvfah1s8qegojo81gobfkoo6y2th61r6oowkdtbl4m1l4t2848qitzwtqa3w8p97v7gq8rzm8xikwurcft3dvtuzfajja8vkojiorf13l8n5apf91962rrj3bzt6pv9jvzdwzrq106jjushffnuzvpq6zelmotdnvgmme6n4tzzxuz42sqzm3guqij6hu7puq0cbr1me28mg882ad8qgsvzlaf80jw66dyqggzj9j900rnkhwko9fbluiia6e8x5796suroeiug5tbz9thsv76mhilvhxe72uuybvj3xgl4b3ntcr5fyxk1htacqha5m3mfl7j6222ujsn2sn7pyk587z7cnpmqm00f7m3hwqf14kewnrlrpywryjzhxgq11sjkf29n2ryhbzk4h54rt3id38amkr5hfzhi71zk3chr4egacw63waww529hug1dywxq',
                proxyHost: 'wfjkrhb91rr5ze9bo0ne8cmsjvkoyxefb4lasdgqxwwt3otatl7qszqhj4mq',
                proxyPort: -9,
                destination: 'vik8rmmihxp70obdw7pjcbzb0bp2rozqgud70m8zgjlzmgx3swtcf7fpln1en8ni58el2jj2xzsci89snkluvxdp69wiqc19pnug2cr5r8p8990ef9kicxshk3yonaywtx60psya7tx88msouesppxj97xwv0qq1',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yzm1xam4m73dzau1mt0w8i7y1vdcjuk4mpspdej28mv2awp62hswn0k520ygsnjfhk9i18n4s4bjayusyrepisl2mocecav08a270ocfkgp8a3v1l386ydmk59uldh6r1ggpv0wzjjgohrpwhgl8pww6samrnjnv',
                responsibleUserAccountName: 'mcf2wav42pqtg4u74h6b',
                lastChangeUserAccount: '364ts78crncgjpxxtn65',
                lastChangedAt: '2020-08-03 13:49:43',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: 'cs9v9ar9ef5mkubjpcm00xg23fhoczqi4hxlhxxr',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'w6t0pjpukfx9fayom1ta8391knmxtal2kjho4r315qfwparb5m',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'uhobejyj7v9hdy5yd8sn',
                party: 'e7gj8von5r9e5jd281jnnq5n2lnfnxk0qjx3bpwzo9n2d37gdkle5jfpgjc9xp3krxyuqeg7z3pfduripklygvngov77lz059i1a8mgfne0110yise0t85flbgtnsaei7s9vvv499ke2qw0nkqb4x2nh9n3165nk',
                component: 'w6mif3vdj6xv3w3c0kri569etf14de0gl07efy6qoq0mq55xkalilmvuml218ynff1voemoscfejb396cl36tu7j0lzwo90wjoidtr9q4pccre0e3byzgov0fy76jn06y5msvfy6ou2rs3hs0xdvxj4r23uxunsc',
                name: 'k8w20f5a5l6f9nisdeekp52u9ctnz2gqfxnfawbynhwg448fp539ggtdstppk5lvgbvjszauhh86dezsbkstuksdqo9kbkd9b9jiv7uh579f3wir6ncqsx5m8ccqwp370fb715fwo5qjryrsml7hk5rakl3ky22j',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'pwl9t4r8626533p2csuf8m8nilhjysxcl2w3dw9j13r602732mqzzrf3vtxi00l36rke11jhggs8h57agkjbryx8smsmt35gl0s2nzbesnibukqs13pgdz0etjbegblwkdu8a2kjrrtkojcufsot55o4tzszvkg5',
                flowComponent: 's61mo2ek9ejjs0z4igxxw8rp27a6eevqy010zinxe3nmj5glievgry91c5ij72zijmrv208kjs7liy9eankz3alv1cmpa6d4rqhnmlglsu855pd6gprbn9rgsq1ns4rfnbt11boxb9dskcarmp9v1f307j4h5mh5',
                flowInterfaceName: 'r3tsfeklgxcbpwaje5v62s6pljiumdd865qgw0mjj1e4iot81lfyd9vv71qfp22c8533wre7kwf5nlwth7fs66bh9s6wkax95ob6hhauxsjgr5nu0pt6thej1ssx9j0l1j1xvcbwrcq9u6ri2836iqbnp6w1e1f3',
                flowInterfaceNamespace: 'ho5o0cndsmxg2hqqa68ad2v41drqgg0li3rx7crm7r7ew8cgj3qa0fa6m8za9onghkp5znem3ig2swub9zf14lkk46jp6rxqx1smbdwif8ciyrjzcg1kkqb6yuzbi04sx0tdok4gunfnismoi73c5dbtpbr8co9o',
                version: 'x01f52kl5608gyj07sh9',
                adapterType: '880va3kyfasxphyn6h4ibg1i3lppxfab82yh96yea00ix1s05xyuv0utj3lq',
                direction: 'XXXX',
                transportProtocol: '55q2adgoyrsy2etho6vubbfpsigk6qizrm2pfyxgu9wj8b028hfiitqntxw7',
                messageProtocol: 'nkd1rhtkljblm6oaqgjlaltav2uj35n2lceahj1mxp4wm8ihvuy9jcm7bxyg',
                adapterEngineName: 'a63lhmn8symbd8enrj1vk3vkmlu8p4wh02x0ycbomhg78siiqpfxutykya91ekgic589sfoek8tpb6cd8ja0g3vjbfljalynvnf28yv49ad16hglt4invlucxlbx8uxf6s31teuz3vkgpcq4pvccs35qtyp1dv9k',
                url: 'ppiuho8fp3cgg1ova7gsxo2i77d86blwbjose9h7h9cmj3uo83bre9wuc2rdtbltealyle00odabvzczxhfio9bs8lvdht8kr4yzqwihhx1e2xcvz7ena3ggqywj7s3mlv9gpxbg3omcyrgfrzr2phntxratnaxc6amrq8cka9zqopfvmtl65notsx5ivm17up84s3k5lhg9cu8s2frpjqqak1cxq7r7l9l07mutswlz1nhp2xf4w4jysbj5b0oro1ud911mto2upsqaoifqcuz17rfb29bmsrhx2zvjmy46ce5p6hrfz6b8cmmwu7bf',
                username: '3cii41imb7ujbxy9g8w2dj5ngtfkd9ugm9zi0tsef9fiur6gxz6251xkkqq9',
                remoteHost: 'ry1nrj25q6tkt7uncxff3ydkzn9yo49dh4ecxj9c4d38suz5jg08eaj5939hpxfgqgg13u2y2ys8on1be4p8k16zrfk1i3lxm2dxx96n60o8uabczzydqeyxm3imv62nsw1m3eiimc1nqc2pgakgx84l7cq88a5e',
                remotePort: 5108016619,
                directory: 'd1lsahg2mb7ednjaipx8mx7xnhmmqjv65tpc8a2rogqpy0ycw431gwgff5sqaxeuaom0g2he3k5yq78zipvqhz8xq6kaci36967zbnabkewbhaexxz7j7hx6yty0fo9ykkke1inef9pwd748fgqqh24sf3jcv7add6ors1zstolrv1au9m4etrnli6c8eye9zt97h4vp35vijw5zn394cfruip5tall2m7ytg2h0b0wjjwyzh7uzzd4h2tfoef9nqki2lzfd8t1wphjx7a9ehewvudqaxdwiqgd89w767v8h7vgj6ojwe6g0voqej8dzaac0xr74u079cod0zvobkpc8shv45cb7f32s5t9b92rxzrwaw2y3fscn82m963758ghp31eu6ggnj84ym3qzmprcxh2wn8ixxa1pf4649cabhlvm1xk5eb3s4thpjfn9vtbqt90d3c54sl74lwi4qfi8ils68uko7cy2dy36tsfqw5n5tk3kvv05qx5ca97zycn3dougrq2j0qdnz9dry73swxm0b7ikat37fefdvdmekv6deffqs6qot0qikh7hq7o60meclbw4t3y1j6xfm6go3xvjzznx9anlt1n2ukeimyrgv42kydgaqhuuwdrjto8vhxpiclv0gdb591pkhaj4duxfu5qd3p3xsuh448eebyrgdhwqucfbx8nd91u7604n88jgnmjn569okm8unsnhvz2c9znaqj61ozxioq6zq472ctr4iopx97hahslttr0ygoh6wy4srkeiw5eo99r7h6ddqd0kg45c5w1xb65euprx4h8jy3i8sk6jed7o91761ui5qvuykp50hutj7t46vy71f39njijiqjq0031a0mmbwptrls060pz48gxvdr1svsnrqq95pltafmhk4qn7sje7l0ibm7vq3vq2coo3k859xjm4c5gzhbklc7r0f30uhat50b3ztp8ji48rzidwcve7eplddmpc3dslcdqthc883h3v3euinb3dx6sq',
                fileSchema: 'uyic34h9vlix6dal39woarwdpnjygmozdaloj0gfpmhf1mpbsjy5m3mn5kkcue70tj0fyrt6yzj0hdss6g6fwk84dpe0aowebyg0vay7m5l0vl9teyx1dh73unsb09ikghnn1my509uu3bimw2djjlr0g4tobsv0ep95saw2ylbuinbm5sx8iitj1age4ee8zb2fov80bzj09v76baaxz246ozchxos4rwzgss5qwusx3j3zdxg5atcwfm1n3o7c0jj7ni9fzzuoa1ji651fzysm9orf9pht7u7mdihyaybfpw2o12ix1bf41rdd8rscwnb8ei34lw4o1e9uw3yn5v1g4qzpt563mi28mus214r7a3wlfjewhj4o7iybbvbpgl4bi4si9jvjs3ps65eru78io2cum1p8j7iez8spuzgkgm7w8tg2lmaj64yktfwug43si00vmi27wt0ku9nfutvq3oa80y0yifipigpx4m9942279zmvi82rwf426ztelijxr0n86mg6md9yb94igm14c6f28wy2dbcv5dcoallxx8qys7cbalemknm4vttn078630bt06d2i81wmmu92ydrowc9o4c4x4dgzvlqmyx1x0s6psy0y36tf6vnshuqsaltvl5vzvj33mc1yfharc9kjtco6c8i7h67pzq39aqcjd7gb3b6x6yhckpyhztwwjwa87tv4j5jigsbwcrosr07vg3fkswu8qwgkiv0jr53kutoghso5uh9ik3eftf1g060cc7i15qvfchr566z170gkru8f7hru10jx48u6t9j8m6ze9c91o3wlfe5wkd0arg03v6k908d0na4p08avzr66fqvsdtohph5sxop5m2s3kdha3eo9jaoi3twfenykljow82g3fnqzzxoc4p28tyxera1rns04y39n0vc4izc1hxncc2zybfod65uqcy7uy3xohqw88k5uxi1b8etqgl4i1n8akic7wx2yo9ad2p324r0x0pjfrimugnterai',
                proxyHost: '1kf41ot9o3c2fg724t3ng2ra2pqurr8jjpo3asi6en9vnfxng34el2ifvdzm',
                proxyPort: 3143360673,
                destination: 'atwiobsun268e9znkxen4b60eiiybzekxgqptjaae8rtvtcnompvhl5y5hten56wp5qmvn5h9xrlyo8bwpza3p3ifq2vvirj4cuwi269k5opocrb9phrncjiy3qxbvz7mvrf5bmzx4cehv3osx01yqhdsem89z4f',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'r3639hsps72aumjzp814ey929snphpzvwarmsdb3ng20xumkhdnsf8qctb8tvcixvjwv8om5lo5f0g19fx8429349wjd4zectc6fjawannypei524ck5pm7tfjlg6of06o9gr94kqofdyxv6gbmu75tfpyjiwywm',
                responsibleUserAccountName: 'uul7nzu4es5fyap4c2ue',
                lastChangeUserAccount: 'xg5zzuu9jxu2rackg26s',
                lastChangedAt: '2020-08-03 15:30:53',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '46xf45daohxqrihdhrs58zfugeo23mpgbk986a6v',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'w6n7ljrz5ucrgzisvcn15bexc226n1i4dhhlpgene1n4ucb5je',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '8y8m63r8f8cqc0evk7a4',
                party: '0ybrzjzy9jr72muwghn8vikxtatgj28bkkds9j66aca8twxp7ircx1meenjlmu9zaubepqkdv8ir9t53u10iuwhrvoxh1po0gfqtx6eel9brberp3b6cdt7jf0mhucvhaczj17ex9vdx4n3sdz2upjforeh5tw6i',
                component: '5sifsackirx46g1guky2zxzvq5j815dxqcwyfil93rr34bb4u515jyp06fn2n01j5n3eo64cbffj3gtbksr6441ydfk7art1mmvlb8vv3lmjt93s7nvak8y5kq0gemgizq5eb1sw1bnipazxmls0lu7yqtj1dy6e',
                name: 'dzbgvdf45nzk8xbaw0nb8vzz5l52hga7d44msfmolautxieezoonhljbjnddv8x7iv4lz8gmyyp5bty5h130z0yoxw874ig8d6qo7e1fzfep49h34uh3nfufkcfss3acevexe1ky3fbecc2env30utqsx2kqzcxd',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'izzolvhib2f6e4s2bh3zpeaupq3klwsta9ezbsf7xusc2m09oo0m1593mcjke41q9v2zan2rmdcuiwq494rtakr9hb6t1agi062qryrvw57j3n27uyfhcxy19e7pk8j8m4nh26xop405d5vcrvzbvqm6sv40j6ah',
                flowComponent: '5b7uor29eq9mpgxxu1x1on4pt14x3skejs31r6db868nudyi3r9t8i7kbs1zg669n06b7mjtug13b4k2c1jqa3imhsx9pq0jphjutg3ow5ohlgrsrb3zttcb5gouchxc16fyk1p7n60a5je0zbr0hmef9vbuwgao',
                flowInterfaceName: '7umpl8s42hu7ey2mm1ga8wa2ozregjx0o05alrx2z0awp8u8yyhe3lj4uqr8y9mvdz0cwxlkhg36qpy5gio2xm4bqjsgfytfrphauh3ytwjv6mup8qea0gxl0iwzdco33m1ffc94osi5krt9xqpl401mzsslxous',
                flowInterfaceNamespace: 'pfhozwztcrrz6b1v47us94s2ogfp1rdie0yktch28ifwcdnicn45wf2g3deialnfqzva5clms5lg1lltclozo0ktex4ob03hz38g3tqayyp6d7znuej6hzw5kez7wv45rlorfntw5f0roga8jllfazkdxtgxchgj',
                version: '47x5iyoexf37c179luk6',
                adapterType: '4m7eqphkx1plkd3ubju1yz9cxf92qerpc94pzixybnbqjrhqegy8ejzsu1zi',
                direction: 'RECEIVER',
                transportProtocol: '8yv8hgc8t0njfm0accby2fp8glnsws3ozlqpgr75e0q6qqxe6zi6lgsssupp',
                messageProtocol: '4i6wcrz6nj0cfye0o2y4pavhx52tjoy3plrbxmu2r8i0avbevcj5uk980a99',
                adapterEngineName: '93z1cez6egy5y67ncc1e6iz7krnx7e4fenus69b05aue4i98xpi6ybv8nkspmox9fvsum0f23iqtuh2c38eu7xypt9a9ja9e5xzp0ey316qyll9b8kfxk03s2pqnvrontks0g72l586je9tl7oniloeahklwtsm8',
                url: 'k5rmyjapmknsceqtc5x98k62x0k59fdlpjb5yb5z8l1lj8ln0abl34dari6nhvy2jo5mivsooe67oek3d0yf8bxpjul9c0g4lrxmrhqqa7hwhph9x2l9cv05lbfoin9mbf4fhxeytwrbkfbtlblg40wn4ihjkd77esv6dvqxjeghekrjuiytcr90hge4rd7p7gzc0zr09jncmkh7ka4s107aqmbj0ilm4kn6d1lv1xi00if9flakisl03fux0mytpytu1uv7by4nfigc93lzngtpzbpz7ond1yc6xe833gq15v3gt2mdk5sljqd97wuh',
                username: '4xuj46a5o8ueyg10cu35rooz0z6pufwfueew3yer07u4c1h69vhr07p38fe6',
                remoteHost: '4lznc50ksc0dtqzpf574ugni2zgfjtoj1d4g89206pldc2z5syo1q9h5fc8ttl28as9b866siozkvn34k5z56rnn7qnq1c14nn5l6719tiijdezvqu6vbvuq4ziad7435wk376ppar49v76zbtrzmrffb7nlfjgt',
                remotePort: 4998389030,
                directory: 'z28ro73aecw1sbzgqbx9wey2uxgmhh6wo5m78g5n74qenc71a499e326fbn8sqka5f81qnfkmc9hj3gce06l2wv1oui27s4eslpogr59jt5jqx41qr8zmriv2dpzyv6dvbl1iy6x3tnux7ncu3xnsntr8h0iyfepmows1l9bmo7jg5dyqrt4wefaq76qgtzhe28ga2c37lmqaq4fmuidqd6na22k4wzfq9y18gjflxx2g9cecxbavuny9uoifv54fgmdkxqqpema1ymzfkjtmhl29j6uiqxfxoq7rjnoleetjilxrrupggd8a2ke8f9dfvzi8b486fisugzhkk52xtlj8ifzf036pv0x2q8zuy7q2686mdaqw4gq7yisqzftd4ot4yp3uuxgkwd791zihpabbr9p3r75k3lsmcg0ebt7itdbha9y4f7719goefs2zd4veegr4slgl932gxaxpg9qlzl0ih1sqpm37fk0h3vkykzr4yyhm75iaql3rhecykwu0il26a69s3shrqcwh97oo5lcv1qdt03tocbu8ppbavb0778fh7fnbjy4c9pmyasgtshfq2a4dajvqw37ocdvrlko8wq77frb1l0mk4vsgppcfs262op1jbb099xs5svt1flvnjfgwznd69fcxbrr4p0v5hhvm6srf4vb0v0q36k1g9vltouyzasbc7n8h9ukytq9b7c1sksmj750eko9i7gdqgr4ayas71y3p3p1ayowxxvwt9dt8cl129e2egfm368xt9hpcu16dcw13x3tumubffzzote2xz2me4lvpsklky4lr9q1dir74ksgbtg3rfmpgkqmw76p2ybokhqk63st320biqqetr0vlxvxrr5jv231pmv4y8h6ecdpqqx1u7yxx2ilj5dr9hdqdzwf9018n32rt8bnylz1l4ocvv5y9s1xncoda3hxsd88j3lqpbntt8n27y90zkp3pc36gv2qc3br6d4eibw10afiodu9emvj8rwytl6li5al',
                fileSchema: 'ib32g06s74s0vqhp46kvzvvl7i6jru70aqnku9h8txsfxcvlj4g2oiluwc5swgh1c173lceux2q5532bx2m4r7wy8ogb2wnok78gqafgcms7ewrzwwnpywjcimgigsbkrf7m8clkbus7p7ienxma2t54brvn4rlsu55uod9jey3s1jnc6s140v8g8ui6prno1skozpdwzalquye4pbjc44bhmol36mzq1s4sgca8immve7agys8tg1y8ddxcy0kpdgn93dtcsngkqi13rqedsifi11f12z1e5lk9wtw9slk94pm1k0tz2uefqpnb8dei3xpetedm912a61utic66zojerowvnune892uo1dwlqm4ens9oo8h3mq1q4wwn70omm628vmqt1nce2igot2vw26okbec7nm87xl4pbvf7alowggebw3ayiwvl3yew5bbxqpx08c1hbe7amjf9hqzvjh3fktegx5fo0p90f9zxjnvhvib4srve204jhp24iznen0waq3ieptp1huodknnb2bkb6us5svjs2rmynkga2g567noci9sifjv1y7pzqtzpess7w8i1bneu952qc92dbe8u5l9f8nnf1qj2ad32lun7p88d5jzmimvsle3g1odynyd4y40sa2iucfy5zmiwx4l0kjh5g3rnbrw09cl51v52p1sjt247m12o4j8xchcy8qhr2bw73zoph35f3cyfid0ra3g8oyjw1io9k71bdljmfshvgk3rf7ep379e3r8mwq71snzowr310c35p08cu24637apymhuhvtjj7nftqlgi2rdtrgwsk8iafxkgbz1aleob2j7melzxtnyzv7ywqz0e8ppjcgv8ox0wb6cdu3gqbbj0ewza740obqyfxbr6d31eaejncrq493t6fjdl3id5mn4gagwwbzh5l7ebfwbmbjhtit20lnb14hjzwyj5fpdf68b18fwl6y93s13dzhj9qikhdyuxezshh2jsjo04royjab2x2m72oxsfta',
                proxyHost: 'das63bdi2b3unaoivc2d0yslytso17g65s9lkfhw8evn6pcyosv9m2qwrc9a',
                proxyPort: 7236912269,
                destination: 'auetdg0hny2hnnmauy9r725mnnm9lowsaui7wftjowa2091jamlno44ca71co5xpwvp30fbmy0fdqeg6t98baxzn8akjwdtve9rrxmiatiqx37fu7mtga8tpq9ys4btujxk8kxey4kmrep9aem0g21hzbt751fkp',
                adapterStatus: 'XXXX',
                softwareComponentName: '96os0y12nqwdmq0rta6v6qjn7rau8ikady5slmqhz5lvoenmzm26jxpgcyw4jegf20ph5r9meot9jure2hd8b9c5l2e925nnqgsgl2r0t1va2ycvfghitv75qz947utsdjfy5m6uys5vxcv22xhtscn9683k11r3',
                responsibleUserAccountName: 'ph93rmz97in7jk9bqv7t',
                lastChangeUserAccount: 'lre4xkdz2jxivhlkl8rl',
                lastChangedAt: '2020-08-03 02:50:21',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '49no5hm2suzn0726hpqhxe76jvlvrhpvibha23f8',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'eicqyhu6q68bzmcda11pzx1yonex0m1k47mpzbo484uzccuqs7',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'b33bjofps7lu99pja78n',
                party: 'o9g1vp7u4eqiev04bv53f3kg3ngr0k9hvsboa46c5t1laf1lo59yb1yf994j8zruv1nkxgl3wmehcf4tlnp7yatqj15q5bl3ze81uuyhbqg9tdirc537pwcqgltm0yfk3jp1d5hop623ajprzqebc8n5cw3t8dcq',
                component: '7spd91g6se418dv2ho1g7jwehmtln23qyeju8sxg9o5tjrsgx0xsil32yian7vxnptqnmf4bdk429en6axldhxsl24fcchij03c243762l88mi7v68lrzfxx10sf6wffg3h98xvitzybsncbm4pvnis5f3g0oq7q',
                name: 'dcp61vtgz9w0b3m4nv7f7xlgco6odkfcpys4xqdbg5runvz87udab87dw9z6tmj2w9glw56s24u28j5q2zm76sjzmtip7ub6q9tv3ec6wm87aifgyeb9edz5tcwe9peaeg5c4tfg8ovvh5yfhvs4atbaitaxz6bq',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '2o4mtwawf1ke27y7yftiwd3nmqyxcet8r18hiasq30i7h3ikfw1y471543prt9fe96uh7rawwvc3a73hbk35oe9uv291afo2o7h2jcvq9g8trw8xq6lzv4lidbz3riwowsp3kiglxv4czfoidsxazymlskjoi8r9',
                flowComponent: '00788atmz1pqb0g8wbzs3iy91v3czl2qzr4218pf2l627h3r3momao4ugq8o048zs3xypr98it0biyxibo1aq1pudq6a883gmcosamvkjpq4yrmb1mn44f4sga4156tk6788fihovluzmua6u93663xw1hvc3prp',
                flowInterfaceName: 'l3dykyvi57m7cd932hdofbf7a47zuozt4xuhe6w0o21pj28baq4b96xgzxllmtkubyx0n8uqtmv1uf6ha3rs9bkl504f2uq7b4gozpzprsvhqtrn2mlx4qaz9bu66qw3wftfwwbhzgkn31cszts2geycsjto276r',
                flowInterfaceNamespace: '30gcmehbrzt7a6a5m4sicb3w6xpdctz9tmnu9ixya0war7ub4ntc6hrhng8ddacbvfi5os2h9wl2iphjrzwgw4ns0gki5lgtr3rrjvwnspfdlyh6k9v97adni0hqxf97ugypfj2dn7xhdf2p49qpdc19kpmr4dzs',
                version: 'tt40ffmhwty3v3xeddpe',
                adapterType: '3sbwbnw47bjvh677yuekwg9dltrcdhp70bfbigj2mzdx28weyeg32tt3xqz1',
                direction: 'RECEIVER',
                transportProtocol: 's9daftsyfqgxfgo54dul235ylwiu5bwpawujda6czk7by46esvjnizre1d15',
                messageProtocol: 'c6725msq8ufhuni95jec6e587okq0qhppmhig0ls3302zf61e65d4y154pn0',
                adapterEngineName: 'q7vip5llz9nj86ktdoilwo0onar2a6sjhub3qctekjdz1bfixo3rv7emzxg8phojeycp429gpfjdvdalnzichwsuqe9asvst4f02z10vy1yog36cy01zexlezpv5k3ttm3e45liith52hrq41kpc2nprexdnrw14',
                url: 'v2nfvabq9evl0o90yo2j6g0xry48v3eumqd0ipznz7sb2lnlo8crcb300kseap6syd733p4pfjsz6apyeu4wglyqajsn5d2rvr34t6q3gxy0mhvgy9qn4pjz5y27igf0r5fjxso9zoo39uflaoph9cm7rk93e2em1zfcny6nivt82t3fhnx2066mnlzt6ipea3phd9458dvkf34xaxaiz6t6p6xgrg7amza7z77z7yvqxorpmk1dh9i2hnzasptqrmwdatogq712ciejpppyiq8zdwws5e1o7sh5cxlteqwe6yn15zui1ukvaf0afjps',
                username: 'zfo0u6fbsvhg7t64mdspxqgypogk0whjsh1o63spbr7zflw38cmtfb376ea3',
                remoteHost: 'x9kns5d4w451ag7mv04m7bbck2bqsucqriq1txyqa9vhttqn67yk2pn6u8vgsgk9p0sbww8lioww9v9f9woxqe6yaxyg48hkq1zr65nzr6irb4tg9dg4dfvwq2sfz8etxrj73jlv9lfu8mfoonaiwms4uu1c8nrj',
                remotePort: 4759298468,
                directory: 'n20inh2ev5ashy1fmqg9otic3zac34wi9erh1r9356jwu28wzn5nz133bj5dctmv7rtx7adi4mpt4ln2k0e146g944e3vhtkjoxbkyznyfflun6f0zhvq80op2qnpgdwd0s4zu9wdvzabg876zgl67qunwx3x1d73erynljhst5039heknm3v3w5wvo0i89r4bsmv2lvu4cwoelqh43oahdy419oa5ks3ulmn21ou970oefkdak5t8yicl4gwh7yqkwnhwyny6mr6k5tvwvffcnm01ehvmjov8vaeg7zeo25tuyf9cp83hfsufsd6jjp1kkdptcl3yqaky473zuesx3g95jyml3x90kuqr1adnzy0kczycbu5k5jl5ttxjuomz3ye179ju64nj1mwmdoaluvmiyl0esfy8gnppkkq8s5m5j3r74drv8hzgusfcrhayju0wcfsu0j5fqa7ghl327f0h0yab1ff0ml8iznxjl2i8etmxs35e3opotygb4rxcgjia43agml09scuvnscsfdk5jo3as6acgy8xe60yjct1m23q0gjj3fczl9jdqjmlbtnipvcq7amjmklu6852wctzjruuz8it26vrp9dig46fo7qpdrrt0kkjhqfsuexcihbmdv1o6epzm9hfiet3x81tp6t0qz3mztalvbpy9hxofj04lriosos4vibqaf3ymjsh0gwdjz25dfzqwibi9zib1t46e419kyywurp3at23dxs2ekj8orh6ssghlggjoial74wwo6vy2gs0orj5l460q0ex6cggk9p2449qxvswink2m34da0oylzefp5hyqorxrthhlz0n59nwi87751gdajvq1rzb9hmin77mhfmn5f9aqon05xfyxaws6n8oj8tzeucpfz1l0c5yq023phemgf2wox38swiek8lqmhxse7k6fj6jrfy5lhrnoly8u38xbtupml43vg88rtzq125i2n4g5rircvqnqav7b9jlilpqwrv5c4n9qxfdup',
                fileSchema: '5nmhtm95hbzub1gxmpu6x7dg00pa1l2dommljycvejq4sg75ob9uq9d2oi70uo0wfk4nbgr9fmw9jsrponbool089te0wpfcfu60edk60z7tmd7bx1hn8cc8r29zcmxl8m62316s8gjl20c9cmwr8py9ad7sqvalfskfe1gg0f87mg5fqja4r0i2j4oxit0v7m7kswdg2uyj32s1g0sy809o3te7x3nzb7n8pshx0metrpq6ycl2khellwpyczkepnubh3pprbm5e7bpnujlwii6ldb7apuphrifs8rpkhgjjdcoks4x4uu8lc6gtnu4dztssmr03q2mh101ul8rp941rdwtpfpsqdjhi63nrupfex4epwcprfn7e6vjzvmr75rl13a1k3rfiahmgkrss2bx91zql36w88umqkc4plu0ytrv8a3luozvxvelnpfetpn24xfepu3xnmv4gfehu2lyi02tszslmjfl918xetdb3kricvrsurnuv9c94s9ikuash8grdk8krt8he02y94ywxctgf6j2l4rkk4vfvugb5giwza7r3cgjyoirw9p10oarmj9of3glgs34bf47w699k3w02ay5kj2eelr83c8y1942lmh4xshrxiykygl576xspvnumclfwj19luxtly4qmjyx23gpepjuilt47ce67g5zrd7ttimv6w6zp09wptd5occy3ljxj2dheu8jqzpe6swcjq7dqcj4eiwzofab139aqzw3me0ugq7st91b9zbrpad1sna7xe9sy4og277p6pau55gobeketvdxt2lll4hjvk2s3x260qiodgoedfwdrwqwe07jiqklg76b7x3vwtsguwle9vm2znbaek8wwaddvu5cdtcylz44ac21jl6flq73ktwtvlopp6ol9dby0cdw74mlnlqwm45z8y0xez6e50gc00hvwnlbbox08rlrwldqd05194p2rjoyetg75x7af9vgfg24tojbk6lm6b4w5e98vtfbtn9ync1c',
                proxyHost: 'diotttvstsw9lfek4uqq8ixkat281rh0fynggxx7gh9m5gqt56tm9fh2g958',
                proxyPort: 1103302129,
                destination: 'lz1aogbfushc0upk34arx5pho96tdjl9sltgy3y0yhut44803zbu9iwv9flzbgnufyhvbp6cj58ji88sxsbz6d97d95znio8sqjcix3w30q5ghshwrvw1e4b3xa1db0eov47zydpcwaco7xsfclmlpqqe2tls6it',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'nhw1ej5pienyfv8z9t59np3fc62pu9j3s5hjihcb0e0exh8kk8ahb8xgla27hhynm76rp12mw3yvq7q668zzfutmdezw4nillahwxitwmr4d560rsy7qr2epsgmiuj5hyisleyftg72av5ihq1rnate7bqb5mqot',
                responsibleUserAccountName: 'n2swb0jv77wm70zsijxz',
                lastChangeUserAccount: 'fvlvfa4z5dlhrxhkv0w9',
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
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '72ae1p07ai1onhpes061hcsao7woj7rulvng33ok',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: '5slfe8cs8mn8fh5gia6kuljojahg7scz19qqc1c9gj5jonma31',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: 'ava9rx4i0tnuiwlsmgay',
                party: 'hg8vqjla4zj2db1ie9pgilm1358dlbk035vh4qmauqcerxfleafx5ng1egt83eql9sp7j5vboai5o37oy5v94ght5lm9ms9of9k6c1a42u8pnk2fr76u0bf83ydoub6wt4e5f7yfqpwqeuy46wc04u1rcigj77z7',
                component: '7egj71zv942p3qf6oyjxnoonav4xtr4iqfae53hpkwy7w7dmo2t0pkqhwqcy3pwga391l3fapp24clxweyzzi6jtdyb0cvrfyf1cb77v6ygrtkfnsv0d3njgkxq96veb0qescw6fyis4iu4iqnrsoh4lzpurklo3',
                name: 'll72ulzvc1aghhathe7xohft8f2o62uh19i358fergbc5a2rtkoexe4cbv46k6h05t57vvw4egb5976ikm56j3rp4mofulhe0ofdek9gthetrseribvqm05rp3o3al5gcw03zowlcguh7ual7014e7agl0vt008n',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: '2yc4ju7e7x8wtq5ov6l0b0qni9rla6tkbj5ups1ebw0zeqax0wttv13xfsdig70jmyfagpt8g0mq87vqzvyge49pbzt8pxfe5o5744il3lkz4amthe8fkm4d625s1vooz4o119mvrcunnmmkt9gpabgp3kctjk17',
                flowComponent: 'mj4pt3bwyyb9g781tl0u9lj7flz74q3p0lcels3mlse5ntusf9bkkifbzk9ramqom6iopkrq9g7bdzdeaxvvd80nurxfzqdvcen04jxxqaw22jox1zbdmg80xouq7llmzktprgl13uwuhk7d6jurrg585mcaeftg',
                flowInterfaceName: 'kgpcvyjkc7jzo7gc40pxj1gwqckftiryh9y3c077kxenrn8uf9y94bd96ff0zoi5k0yz0onwacgylypa5eb2buck4t11nmozc8grgqsj4zvrczep3as7znoqc3zqdia9sml1p5f9rhzfsbuu31h2aeow3ajbvhbx',
                flowInterfaceNamespace: 'cc4ssjpt6iguxe4an7pjgwgxpf3bsmtvs12duce6qw5qoxreoszclqe4xjdmbf3kins1z58qxj5pik459qf9rdezg56cqttjmux4kwmag7ug4dqowt66o9h5125yjpc8je5q7z7uk68jdtx43uug24kn2v7vc7m1',
                version: 'll5dz4aci7we80ykgz1c',
                adapterType: '53e0v38hi4747nu5rdom1l3r6xdap49f6kwy5o36jiwxgozfs3vwqk0k2gub',
                direction: 'RECEIVER',
                transportProtocol: 'j7tbajyfgj8zzsn2a64hk1ictdi8ooaya00ur8kl1hrgtuk48vm68rym9j6t',
                messageProtocol: 'a0wmqc89j0op0yccy76famypoqsgd38znkieo0gexjwyxv3mjlfqaaevnq3k',
                adapterEngineName: 'pb3l9lzd66hdmtt36w5rqno21aqysqhkx27jtza28s4d8mvzjgcjy0ygdaprda8yeuk2v6g85phw3x2w6k4twihw2s5v2zi95e6le28ts3do0yekddqswkxy2ylnfy7veqs7s6rb0c4fwch0xkto5d40plw624hj',
                url: 'duuvt25sj23t6w77hczau6xuc0q1ghs7fn0nr6zcb1313goaaxc9jya2kz7ul4pa4anyloscyycv70whp5s05kb6mb4jhw310grzy68xrco7oec08vl3fgieu0id9dcl9efq00m266c7w22e8x0j7m9ylj9kc3t5psqp96bjehfgw85yhrysj4h79enwts2ews5uwp042638q52vg1wcv23gw4gbzgi9xwu3rwra4prfcx81lhpohgiuvx6ahfxns2jtsy4i2gdth4ff4qh4klfzb0cldmqdd6ovsvgmczgb1ltfx0sfrldrhl60s9k5',
                username: 'v0ee1vpv33oc64p5uuvdsd5h4vmddv5odlur16eqpgv0m46anssbkjwrqdl7',
                remoteHost: '9t0dj0y30101neb4c44qjas6hculz8d4xjzjt0qzbrbnuf5un1o7y65yx02a3kulad4e4c339078u7knr93jlvahis0n0a0ro724phfikok17x7vxpvnygsxjhzzvdy9qv2rj33lhi3vk84g5hdpgrb34w8wl1g5',
                remotePort: 9843526710,
                directory: '1ribp2yf891qzvhh9ymfxl10w0lwyonif7l77vyqtmqwx8yw4jy1mmia7vp7ueq5uhihtiyopov0erlth8y58urnwz7prdar2yzcvfcivw8mdtzzrriq5plb05p8qbo7by4jkhro82ebshl91lej9d230rm370mh59h61bujq9wsr5wpniidzq5yhg3urkh827u2mkiwsm079wz0z6cjmnyglfj8pnoznfbw53i47icgvhkcfqj2rpdcvyz0d66bt3weobqkwm0ttoii1i1lh2j9j02dmhryz0o739sdd6bcgz5nnraeb9akj1dp2xga8g1yabq18yuk8q8l5oobkxlejrdyqu6l2akqzxkjvjtzw9ioj2gh3oyg4fshnuog2s8h8wrlni51dgwkvwhorovaisqzw9oo7pijk3uefx58k20bhp16f09v057qcpjn6ba2aqf4ifannjsec4sz3v52xawxlz9m9devcqudr6vvyohxad23x1dx65orhkbbj803svi4wcfmtp38sx9ioctrza2hoybznvb8g9jpcfq8yyq4gw0a3ibsxkmewmkfos8mw1l7tdk34wxs5tbt2g6q2uce8anrzjo3j4s4uqw7k1r3eth7eazlnlrw8c43nqokalvcrpyvhxpag57eo1fr122p0aa0iqcxkz0koq802d5hv4pu4xbgexvzag6mgqu94ulkrv8t9wij15jlnlekz83uemv0k6p5w9iha0zmyqlv9ars6plbeu2fj7af1v1tpsgu2plvdtxye5j1v6jmgzg0mehc9w45pix7r34e27oq41mtf00o1zj9n1d8cx5xpu7s6r5nuuy0xbjcsdij1nxz6f3slpduyweg1k0lv05fgau2z6ivmpqaoaxv07jz10ax00vntkec5a135p7yqoy85a9cb62zsh6nf1w4kw3g8w6meecxy8jk5wbvy56f0pmb8ztvhle29eghp9r46qimnid7dku28m1jkuzepgo4mqu979ndst3ub1b1',
                fileSchema: '4fhx1yn3s48tqq9hrhyvrr9l3v8lb0rcx2adfrxsnsdc9ytjlr16fmdr9iuzoxc6uq6tbop7plx6r8jlumnnl1cvi9mxjkikv0e9hvz0qw7w77q87br6fs9vne3xr5nxinjfwf9s3ey73esy50c3097hwcf4csaiacyzca6xpuxuuxrmkcakew2gehm1gbos76et2tee69q6m6c8hd48ir1zzv7t122440t5x714m6vvjhmzhumrenyzraf8qfaf88u6u3ardeabtn2zp8b24wmug3u1maavfriboclgwjik7lyrms5edotfk0ux970a3x8g9ivekvzeok1cqlxpyxpphoa8i7ukyffj3p88lue0orzxiuyftmrlgmkgxnrcws75oymt2afujxy4scxal47dj1lnnqp6wvnwgwaqmz5nrg5adxzqb9t0mgt2a3qpi7rpo0bkyhy411rz9w696j6slbzcnn3itq374mfgpbnkbaje55931mcr2xap907ciwrq7w8a78ccw22ahoz41ichzl8ty57mqce2w6x1ocyysehpy4hdvr2hzvb180kpovl0joxsicq4czm0wxu6bqo94phj8ssdaurpyy0kztwygp0o1m8b669tb71kv5l04upbz6g5vx19id6vhadua9nxah1inwa77xnxuwt7j4ow5225xlihjfif1tjk7fhxf87q70qqcligfsoane58d6fl5sgs6r80hp36zcovedjtpsdiiu1zavn7xkzze9s1wbuufnj1ickzqk8sc4thyf33i8e6mq4ph7twq424h2rayrm1qh0douknh4aavwrer2zgcqbb6v14apf5yfc5b25soqgieangmfashbjk05ew4ji4pr5uc726a3ocnyp83yvjxhlfkc9ujxqwvc3ij16fjtq1hvjplx200olxvavhe4g7nqo0k6vrl32r8oirig25cpsbhq41fn8u4rpn7q5bhikigfpltwl92udcyubmy4tu94uqkkl07o2wm1gn',
                proxyHost: 'asp2fe09to01d3f23b0wq8cjkqh75gic7ohuwnv2ot177xww9b3sevl6zoeu',
                proxyPort: 2907686732,
                destination: '0q8qbeqnza198m6khdvlsebd2mbll7q3t67ep1gmmsxpctpgeqolzmsr1nh4lxae735ol373ff62x0nobedoup7px8mclbk8l70jo7bseg2af5qg0g6gi6wa3bm9tp6d7aaayfpjoqwhef4hka5r2655c8suk2y4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'elzoc4lg79kh7gxgej9gmm3lzav6cpt8kdwv54nngiwwoijv07xrzy53alhk2b2fskljgd5mdaafnvvm0gfmyf0f279ykar59vny6camm5fbwg6r6mgr2q8z5h0wkrpphmacf9ak61j0mlamjky83mso9oovwktv',
                responsibleUserAccountName: 'k8t5eah6m24m3vnwawl9',
                lastChangeUserAccount: 'p4ma98ixzlrp805bdc4z',
                lastChangedAt: '2020-08-03 06:07:00',
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
                        value   : '1d662425-a05c-4e7a-a898-93b9462b1983'
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
                        value   : 'ca360478-6988-4e28-86d3-10aa75f73e68'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'ca360478-6988-4e28-86d3-10aa75f73e68'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/fbcc45ef-759f-4a58-9302-520b32d4c1a2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/ca360478-6988-4e28-86d3-10aa75f73e68')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ca360478-6988-4e28-86d3-10aa75f73e68'));
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
                
                id: 'cd6a72a3-457a-419c-b6b4-64455a9a415d',
                hash: 'shfmzmf2rcu0bvaklanojbuthd1art5ayraqtfjw',
                tenantId: 'e0df67fc-3597-4bdc-8c50-969f23e1fd61',
                tenantCode: '5u2bppg8fnzxnoayc10tu4c3hflaw0fershqjm3gmhluv1mas1',
                systemId: 'ba20789e-a3a7-4511-a2c2-b949f40c5697',
                systemName: 'iywz20izuqj9u7bs037e',
                party: 'kyput4sfhi0kvry6oc61uswtxudi7otkzrf7anjha22oho7hyk8723fxyo0sg780xa1hbwokek4ndl070d2o59yvhlziodxcr26cicmc390td70of3sf5fnt9xuyxox7mrk0u8aqbde6ukkpm14dweeffldc19zz',
                component: '7l19i46uksutfw4pg7j3eb0ikk0onuc3rpi7j39zbh66grtqusvfm484hp3cwyc6dnajg8zf2tz7c815iiv0ii5sbasqpe34do4lv0p6f9zrpwwjfqhnhx86rz69fty52jo2zsr2k7m74yf31l4mrlor4oie68op',
                name: 'rpfuwvivw8gyr6vibh2cfvepu9urz88zerxofs6z615m21pt8zlwbx6b9ik2fga5hwysatc8w5anvs7o9he5cvo2f98568a37w6lwe7dr9k2vhtlx314hj6bxl8igpacm6wdz5ino9kte9q89j54uvadik8t6764',
                flowId: '5c189212-a393-47b5-a708-952605106496',
                flowParty: 'hlq13dsqfhyf3kirf455x7skm6jegtz30jn0ifxino27qmdnih5e92pbama3zk71hxl2euifk2z5hqqd156g164ny85z36pg9t06r7h02kfqe50aszqx7qu9i9uqxaffapv7zc2beebzsde47jbg37mmpiwq9gpx',
                flowComponent: 'myv0k3mbx91c2fnx64q3p1c2rix7o0716yphm8y43mn5rrosfd6nlf5lmza9rhnm0dbg0a39gtuaz0aeabjk6g259vvn0fs1eqnvo12rv9c1mphakkkfa10fi0ht0l7d5272yz06sj7a9caf78l5our0q7z3yijt',
                flowInterfaceName: 'v3xjeontvrd4yufhgm3k02yheoqzdkg9vc1p6xwndsj6vze3cixb5z5y5m54x54of1l0gqcj4pa9t9ez9uozmwmr6ib57t7l7az7cts48txj4m3f7biraxrb5c9imqrhnmj0wle80vygfbn945308wnuliety8tu',
                flowInterfaceNamespace: 'rak68pc5hpqwzrg9w9ifyz3156l0m2trgegcwrhhls92d0395wqnqhxehnzuhpd2ucbk23vsj4t0obr31dyxnzumzpoqbl9v3fv1ddkghhmbl62dfcksdrrcua99nti7bn7xhql0er1g54pqpuq7xpltdvjvi37a',
                version: '6q62v5pzizwh4m13jnqg',
                adapterType: 'va7qqgld3o5b6dqppliwdky9gmf8l90psn3dqbvkkunsdlf1e8ebo9w2tbta',
                direction: 'RECEIVER',
                transportProtocol: '7j9of0z80885e9w6qa8fswmyh46njanvjbpnoirxbj5u70g081gvi64lg4l2',
                messageProtocol: 'ttdahmkt3rxuiwwc6wmek0afy6vt5ag1rc7hfn7t4lx2fjzlhorfixvc0m8i',
                adapterEngineName: 'byeg8qo6vmnxtawb9lf6bsiwau8bl7p18a7iwlmmkboenr2ntuolpgxvogzj3lsraswq7pt0fg9aip3h3dg536f70v1ga08j4ouh8sf1z6kl6nalzk8975xtbpzfmw7yp6gx0uu35xz91yaaaxpnc60l3goup2l1',
                url: '2s7vfag17b234n5laigpeicwv02vgu6mr1w5cgw1tidghlgrb4974m1oa9mt74ycx3zqvm6r3nkken86zw8ah3cgh2j1ysw76ncyu4a7zmgx9r5lyf0kj2etzkx7irg3s2wyyfyu4oj4gejqcf1wth0ao29oajlr6c5o6sk15w7m1ascy6hu1bvbcvx82v8fk78n4z2x6ncp91efs9q8ov3nkv6m87i9dn7cf7g7lhyg4m9tsqt3zbv9tl25jkymgc1tip0hpfhnc36sxx5l55rsdb7owccoddtsf6im4jd655nn4motm6shdypionab',
                username: '8805o458debcwdjqctl9qmyt7zhruoqh6j2cvhe0te85wi07emvbq0o1xryf',
                remoteHost: 'j7ugn94v9itiz3ea8rmrk4799s2p1nc26xphjs9o686a53vpqjh29yrxowo3aqgug4waz4c7x1btuxv6byx3x04kt0cf8zgius313kej6g0cumwe3p9gvsd2uv78wmzndqyk5ay6pkog7gx86s0r2pc46w1ghemi',
                remotePort: 7574157689,
                directory: 'ob80szkkcbmpytd1c94t3cl9ew4ypubsap30jg6fuqbfme8c0zuxen0asf36nz1u0kdclkd60lwtzqhhbgmxh3bxxm2pstnexmodoigds89i7m6y2q8mtpjmy74s9v7uzcph9gkk6g9dqrow2dp0r0muu6n3wwz7u1uvx4kqg8ps29q7ct65iw87cqh3qfq5opvq0i7sqjg98tykpuur1ca7pscus5xvyujlnw7dizmereg3xzox5if9882ozasl0954j5pxpz1ab9fvp7i33vddk3o418x760m6pogqi5dg5ovfftjobrd6xhfs25zhx5w3fg5h6xzjo8y82qtltkv2epsggh9dz6a3blhsvg9cjyf1j06fc2vd3wids3y9j1n2oe3ftfnzbf9a69vuyd0f9k6kroby2c9sxre92c0blwact5u4e3j3jiomc8g9kh8rafndgtzo6k1xeav9tcmof3pm940t86ccxdkp48j42yloxgsfdsc8aybnktwr6lazuhpo17pdk2j82qac4jni68v7hzsdfve3d7qqvrj04jtr9i8tpmdwp35e7jsbu2845dwxsiknuds2zboqxcgtxr7l668lxpl1figqdcqrj2ludervkq8cabk79hxy09xtixen40uh8mzlrwgpw4ms27fgrnsfvo1hpd6xczwwq0vkpvz1awukyfflyxp6j5cjlqtpy937lerpg9hbxc4sgj58mjlugc1ce3c4733n9x5xjxkvbwe6t4975ylc6avxq7ij5nwjo4ojuhpwiuymyj7j3nmxbkatktgzbtmg0prmsptnwy5txrcx8u3s7vc9lgasj4d313yht7kvkech1qsy550a8frmgem7p9i7fh7b2bdoaq80v75ksct34htwhgldf24cbntasdqgf5gv27jbr9c4i7l45nq4mnq1fvztt55gm9s9pztz47nevteqakwl0dma5rzb0gpnc9dv366gn9ddny45es8nmw6b4jowxwd01itgznb96pzu',
                fileSchema: 'x8vdnvj6zi68v0l78hq42wnfkeqybwm4lrsinqnm5icmvidwe6a6fims2r76nkmcbji2on1fn1a59eqxqluqw0m8b0vrkl66ldlwlzuyvtr52ce95wy9dc2jef8nxbqdgagrz3yyygmp7nyzx8fq8wbs744z6mer2vqu7osp3ljy07qpx4y7umn9xinaij75uk3rjbzmdqgzudv12wafosg7ao28on5ltlh8d17i8mz2p9e392vutvud0sj0dlfqc7fyy3utxasco8ssnnjh10jbrpelnkoxshi4bzla2dcdultrtb9bn614bgpbkb74xxhfvjuw8bbi3arkmql2o3luwain6pnr7dkldtqbq5nudwan4posx5lzl2pd4i6c5uxdur6nhbk0mhbx2r0wfmplimo8jpejtfl6cp20bh8ugksorrqtjnlikhvehp67je9hu0re9vyotpdda9dylxruudvc6w7kxw3yx0tbvfp6ss33gd1swpp4r9g8otb8k8yqxsafq75cpqtplmnde6jqrn83nwpsc54gq4q17aysfsj3u8rabs38fbomhoxl5412wxitki8n3yo0ycr3qpdirevq3iyhhjcopv2pwwiv7okuqsjcildhh6sz5a8hgqxone090ffjqubao96sinkkifxyfin52esohdx8wgij2cose5ltnhum7j7sp6czn1xr0r3yah9pmjolfpyuboc9uekfxppbe1cb1vpqqi9zor3lhcd8e6ncmqyqageisgaq5muq0bkyrt86vzt3aehnbgo05gg54rzyff3gvmpbh6d4rd9r7xf302n2p4suh49im09q8jef15dwxi2mph3wphp2nw96zhzsxurheomjgo2u66pu3p19pmoj5qsi8idrcqha8vwhqucz1v6sw92fyp91vzkt66jqz2r2sk9n1g5clem5c9zf1a7688ptb2w6ulfyekdiqrk0lzay071w6tjdara2kx1w679scuoykh6rh5kkmpabaumgf1sb',
                proxyHost: '5qr9481wd9h7ucx2ad1toihtczecogrf7jv1xjecw4c1ml5zrsl1lnnd8ots',
                proxyPort: 4165474221,
                destination: 'u9378knpeuk0k1muem8tpk17kpkp2qs9t0hz5ra6wewopbcxymtub1tmwjnlt90nrijyqqdhuryuu7hm8enqi4i836a06e2ylwsvk30oz0yj8h37q2glufnw6a6m50cha9cf0og6kjsfr3cnsu897zceojbzd828',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'bb1s7ma3nhoaxvsup5qwqj0i5b9ufp8n2pou0xout7vgofvq6xa8clea4ye0pqfydh6jiuvxaa0ldl43hrentgwfuuxzyg7lefj0wuyq10pnwk33l7pyxnqft2udtqhxm4p72fdie12izldisyt28hghmn8satw4',
                responsibleUserAccountName: 'qhzfnfwftlxorj8xljjq',
                lastChangeUserAccount: 'yqjd3fq452uec228r0pe',
                lastChangedAt: '2020-08-03 11:40:31',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                hash: '3rtbd9fkxxs7vm95chy4w00a3xjxepz3qf9eu52l',
                tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                tenantCode: 'bbvqiiypjs8lshb3qyrlxm6f190t7wt3gsylqc7bbd33o595qi',
                systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                systemName: '322qzs0mhqe20yrtyeas',
                party: 'i2tb5ju8o5v993rqnwz5qtplmnezw2pkpjhnwq9dg8iy4aiaq8ye0a0hg5zycz3maii82r7k03hgo7q000qw0fhk0fwzecyy7vq1mmny0xvai0u5jvxib6q3f465mgnikcbwxt5wf8lowlv4lzsaeu6pyom6ximr',
                component: 'hvlkmigz06mdcdqz6i9vabvf0mjh8a2ool1a2vtc7ruu4yw2jwuk3pvm1eualcq7brnghzu2rlowh6t1cn3165phl0aps4lc1jbl4c9bkc7b2l1sjvykx5lkykln35b6drmxii30frc7zhlzzadxx5igucio5x5w',
                name: 'usz3znwtku9edtefb9set4sq6w2ezcxcb5g229s0rhkobak1rz8o77gkeyithp1myl4l7a0la90o4vlkqrv9sc6yaz67mggcd992dku11j61krz847xd7aenvbypmj0rhs4wjvsy5n11zrm5lj4u6szumhplri3d',
                flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                flowParty: 'ztpe1fsgz9n9r1ulffqtsz8x8dnk5posiv2ktep00w340jm1dyld0wjdtrjbdv3kxy3qsgfyhnkhn301lu5a0evzp31k7qia48ygnxlgxn881mevjwl65y7p223cmfai1mjhumrzsk75xrsegssmsk4e5rt3pv5z',
                flowComponent: 'hqbe0nq1mphneqzxjlzgf5msfz1f0d735qdwwfx95ulh7i47ykiv219tl12m4alw7ep1fa3oz31xer3oljgk889xro0efce7pq1bbhbkomile0txq55lvlfm36e6ruq2q5jpdafb45qswv5ws05ar8r6v0zslw6v',
                flowInterfaceName: 'ctdxjfncru7cybedctcohe9a5d1vzggvz5czxkfyn9jeq02uqnakco02ou43f3t65fkuso33026z385hjrlvfd2muh7zljseih9xrj0l76mxf0i88bnpxgyq0777n7roxxrmw7r9kfjr0rqj1kv5ijg9up3zyn8k',
                flowInterfaceNamespace: '5f0nl5awjfgdm5cfy6bkfuamyi3f6qm45q6pclwgxz5lltm396ntg1ooqka7oyje8tj446gd827d47hblhgqrn4ro87ane99tnldt6yvkix5m45osaeg1yfch97r3ieg6chzhs5u8z2sbqihrnio3hh2xnrxk70n',
                version: 'ejfkyukjdgrmonlh3d3u',
                adapterType: 'uwqgsyzx9x50n8h0jodr5hdmh7766i9ko64ex5v6ou1ihtopy84r4pwx9uxd',
                direction: 'SENDER',
                transportProtocol: 'gglxadvf65v9pepzdnzfla47yyuffuemneox6tnbis09zhp1ksobfk6ctfpc',
                messageProtocol: 'eur7im0v58miq5q6pozztwdd5638leu20ug5jq2nsw8ag0osb8rbfb4dwdfo',
                adapterEngineName: '9ywjxblnz6r167c8eqnyxqls7zfzdix3plmx0yi9r0p5l2o75yjb06xakllznnkou77y4gx237xdu0xstdwc7lxiypiu5zn49ni1vvhjvuhsrla30oitic6f5xz3wbd5rvq7qxh3zkigggr0o4jlw6vj8xmzvmm5',
                url: 'd1gpbeuaq42pruxee0d9euqhpkwmu81ne6fxgfylwhlgb6171qckd856w9ixpnrhkcv5srcp25jiauy4c75tcjo4jz7c8pys3m3ze00ce0qepqwm4fa8rw7its4ygwxq7zve84thh014fwsm1v8sdzvyxk0t12j655fmja73l35feih5z8q31q9ugctpljmmynzhariyjqh4c8ug5fie2n08w1ux9uib24ons9cx9lyo2lrxokj59xn8n5dppqoxyyj8gfjizdox3t5y2z6zwpmd3bfv60hobs37elz5hpcr6mh9sg64f90epo25ov0e',
                username: 'm2w6l6mpxjkderxlumt414uxqbj0d36kmh8p9k78yx6geyjb49pk6ou935rm',
                remoteHost: 'u2f5q4priy3mhb2sxob40jbzjykzfb1oyjtouab3wo8nrmnnhl9kgrxq3ir65wmmg96dccg4rrrf56gwus261p34xs9x7tqh65uczjsuipctkgu5y2jz08voefeqbto0bhmacn16d26kwieaaw30il58grfh80re',
                remotePort: 3087457748,
                directory: 'vnanmt2sxz9k8yn0990afbsls46w0kx13w0u05wwag39igheo4yqh6i3exutw5m8p373kxsxsvwxo0smoa78xuolc3up7eygqr8tcyfi31mtaopedhj5oe6htnmf1xboua5zmeofoj62z8pyqk3c6zjal02g1b6lqtmfwfd823fmmgqj1qc7vy3z0dqi2z8bxrg9b5gsp5y5dfk0vj7prkc3yn8s20itp3gzpjcrev1ud0e53helply339w4aw88md0jo7zdgbqc5ftaup7eui99a5oevp52bi1nupim2xnrf2y8i2bmepku4f161sdfpz0v1jnmyak2fab1zxh4yiujh0ch7t8lwfhx0eseazbvh28npq2scbj4kz9p7zkyxbjuqqn2dctdi90tu97kg0gkt4wz5ewvxjexzl4ds9ibirrckbx2roe3xxgjs8h1babu5m6kx78z4ohv6ywdechgr8vvrsnds9x3qysshaq2ya6hn5glxrhq6yo3hmdl70pmqb81ggakluhj327drkts9zrpbsgxomn4tqkcg3qe41o6p54l94lg1wofun6xtt1xdk43wsrqleued3nt7ncffcgop42xw1ielg1cky66m9gcteoioxptyku6wunnt5t2t7vlkpqed1g7eua4vj9wyv9qkctr46w4d3qk8xu1e75ze08r25idcx3m8etrtvp5nhyiwdeps3ixvh4a2bpg7pj5gyjbjqvtj36xwdyw119pfhqz1xkxbt3qm6q2v2sxgpsl50ea42u7yze3h3s2w7eyw6lc3alq24kbbpyazv8e29edfb1puc2bcn1v41p3kqjoumbwveq8ihd6h7wquqlf03vbn7j4nc7yg9rywbis3713v2abgvaowseo50py8zyt07kmszhncgsmmv3txgos8tjxgio017yxmyynxh39bves5ofy2fufx4a9w27bhuvf8npzi5c8hmmaee3elaflidg465vqyycue3k91qbg79t23hogakfnl7ai',
                fileSchema: 'gukl6n0pvy1dhqoh8ywk2gav5zrf58bulxhmt4rk8sqb8wpb1a5afr88j29cehpowbv4rvx6if7qkeutx7oef6dpycjl7e4a18t66qdyxc4701x467mvw5rj51e700qzk6fpfygbhfejy8zmaev3x0uafyxtnr8fz5dmxu9b8nekby9ahe2l2g4ftkohwcqh5n84pbvbcm7nojpko3vi3ai9akjajx7wbgn69zuqrxhfe37p32o280b57epatf7kvvqt10svooag89ppupbn57847o54amdjyz1h31byvl9wtcjdq2e3zbh9ps0evl4ltzoqfhat8bubqjek6obi8dd7qi28mhk081bjxksw1xw7dowam9vr56vren4il85bfivb577wum7fykv38u928pphn4funzplz9obxv97plkuxmjsxeaq30se6rplooseyaur68pv3xhy8ytbw5kuy4az79351huz9arldbxacbj000cjtpsij5fc0zd92fnnmrv3u82dul8w7k5s72ju8jd3bm4d8tc2r3kpwdkis8bhqz9h3zrqsxzxo8o8ujqzw37sg7qca7tczv70802culbg2su0eeza0df1w5ha4uv80mjhx5njrmzehz4pr8dojgnb333xr75wliwmw6wv4pqw0kbxc93kxk7za4mflwna03wyywpusdn3d37zydgwq4pggfhlgyty64476d1ez5lag3d8rsurv3mdq76r4xb9gyqv5a4g2ph2m3axt8touv0ns0ujwmju37zhx96vl7dpm21ggu94vso56gizqwf61ofcge0q867wx6udmzluu4r4ajbsbz6gekp2oy4wj0u2t5qn1mn7zujialqy0f5uvct1snjj8g22p24q1zxowxgenzio71h69okd1iidu8dg8bf7qshx883qmutwrrk5f42rsdpol1j4qynju1l58lwle0bbrd2hd3dowlzsdy7gra3m34w2m6phf33ecf8zpyri7mlv40mk9xh28gen',
                proxyHost: 'lyf0ghyrq1bzx4c9a8h2haqscnyq5l1dx8z8muwhp4ud3rredwawylpuyulz',
                proxyPort: 4401941954,
                destination: 'mlfkyzi07tt8qaxd8caz3002qwhep2s1mijafzbqxmncu01pe17vnx33ywd4w5joltrewwz2c8mus6po4nqroqba2badf8d9hgwcu3ptyrdwzhjwk0up9y0qiz39eir7u88os0iyaburdn38gvz2tby2ivgygjc4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bt0s5j96gaipunbxxjmh5w8jpk3gheob8jfmump0nh7xoz9sprbkz4mchdnnead7rl4oydnls9e28vx4anlm932k5xxlqnu6ob3you7uoj6smm2mmscqlqthtsnw77put83bldkgt31jmk39tmperw5whzfa7dk3',
                responsibleUserAccountName: '9sypqiwt9tya0zcwu6p9',
                lastChangeUserAccount: 'y9cjh198chp7hjdsohj4',
                lastChangedAt: '2020-08-03 06:08:37',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'ca360478-6988-4e28-86d3-10aa75f73e68'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/5dd2413f-8e52-418f-b5ab-ef64b387d81d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/ca360478-6988-4e28-86d3-10aa75f73e68')
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
                        id: 'ce20857b-859b-4073-b2c1-114f4a3b5d52',
                        hash: 'edogbwayp9mkhbclrhcuhh02va66dxnkajr4zwj5',
                        tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                        tenantCode: '7clcoiy1mcqfdvzzc4vx4kv7cktbyoxo0zzimxzo9mmfssw8g2',
                        systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                        systemName: 'sc0ofiebip49xicbhsg3',
                        party: 'f7e1d0kix5be056znxtnqbslc6xw7nntuyeetkci0gj437s6zn4rzahg1kutjyh6n19q0zigium2zizqcsy7x2317lztbynn3qtkpp49r4yki9gg5ccgw9ljig0s76q927snl8at9fd88qysyo3bwwkl9zcb9rp5',
                        component: 'yui57ksjruhjpejoiz2jt7ml9pbnna7a84bxcb06cw70j5zk86cw9yyxeifpmy3k3xxi0grz11bzz7ydi3si36vudziiszzwlxf549l7c6g3ozy090vw7brv51ae6iu4y9zjqoxn46pefdcfuxmcd2edcsrquxl8',
                        name: '9kwoxv69d8ffx6z1vdq02cmyxfm3eldg630h9ytjd40u71ct9gpsrfk92tdp6rwiu68lb93lrbta6gbblkt8cvbqdeorwpb9sqr5yhkp5qtopyp1mmisw6s5x99b0l0o4o26pd9tnk27twap1imbvnth6ynov8mx',
                        flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                        flowParty: 'q4gjo3mfjfswulgeauzq90nqsadaad9uvyhmpscbp6gt7u58ki30tbog6eofidqds22i1llv4hmqr17ot54wnukq8frbvofw4rpimqaw8ac9xzx52qp3v1b0q4afarlmgnkqj2nbutwj8enw670b18tvrfjir00u',
                        flowComponent: 'p4qidur8ktj0jm2lfrm9t88odgrxo7ndhnjnisensacxdxyeynnyglxd2sjmxs8edjpk4i0pu6r194b21jaza5a62ytcr59daz0l0ffcn1scmoq4rqo9da6fapeoubmk5n5492gn7xpyu45ls2wgyu20fpaxlci0',
                        flowInterfaceName: 'tdqyg1i3ktbwjsxsfygv0pgbff8l4ozp71m5mtrz80qwo3r976ts0t4fvwiwl9so4t2h9i3s2d4b02krfn45itohj0yvijkq74xlvzfpf1dl3fawnkkygpwwf0c2f6autobahz04r0txelqe9z57nhy57nbm2vc9',
                        flowInterfaceNamespace: '4gy3d6mvb06c8an94985p5pp2iadjq075p2qqxadjh4us0tewgdv63bp5qsutc30g82gzgd60jrodch0ybc2z5f7mzc5gddpxkoepyxunbcnk44kkotsb5fusassjkxpafq87agigy2n37z3df3hpczp5phikjaa',
                        version: 'ke65qkloxq0b9352uh4s',
                        adapterType: '9qdc6kq8v5u990wsc7hw443h2wag6zxopksy8jna6ajn28llca001hczv3m8',
                        direction: 'RECEIVER',
                        transportProtocol: 'v6bgfqfp69zhdnfykra7mfeiui03zhniabqqfawk3xv88b8jj5598hyu6951',
                        messageProtocol: 'xer58askjlq3ihub5w13pm41dez1bh2upb9374swf4vvpianbx2ruspqiofg',
                        adapterEngineName: 'y1m8wytoudru1o44oj2rpquroz3l2dnx2kg23pt5byt7jy2j9or3kaxrntxizq1zfbrhy8hl6awvm95a1k2z6k8oi4s4woobwmg18gdsoeqeqoyob5l3zxot12spdr1cn58mhy247cknjwpvomkydvnihj6zhyzt',
                        url: 'ybxi533a0lw75024mnvw49c2oybxk9xb521cq5cvhbfp9gi53oksglbvv902xohvzro4klwd8qt3nv0lgv5imll7iiq5awqmlr7ki54lrx2zfz9nccdv63a0x4oulpovw71c6nzzskc453o0aip94owwt53bsnmato5khqp929drbhufnoyqyweq776dtgmsv5bes5r2lt470stmo9v1r7l5sx6wwqyiobl4s487x85wp9c03wc43wm33hhy2bsol1nt231axi90zjwbvbtz2ci9zuu6q8lo1yxdzqkmeygni7ho2jvorssk3rpggpkt',
                        username: '8jit1lh4k2uvxc5gqdg5u5ngfmgy3xjie1q2q8yjn6tam6vauao1jh2qxpzj',
                        remoteHost: 'g5fv2pxbqd7t86gnlu3fxsitiovbrawzjgm7qyga9bl8rtuzpr6zcafi73v6ghdhnak58qpbi7t9uilcd3pkhmdm8ph7wnf5501l5tbp57c66udkfn8ixgtmybreovwaoi7o55pz1tlt3rlnfm2rmhxmgtlna94v',
                        remotePort: 9447267620,
                        directory: 'r5ih111fz9a4pvl1gexjpn0arm7r2mdkxq91a64dbq1rvkptjo6xl8qhypvg650ett7ph3wn1iowebg02ddhmw1b9anfviz7uas5g0tnudhgev3kadrlujqdffwokgzzfjw15hftq5iv77f00w3p0r8vgsbhai35wwvcxm230hf2mi0fszwbxauyjf4fm9zn368vfrn8zxmv1nkdmyn1pn3alc45uhe6odkjlob9s0g4go285dv43uvq0l16yvbibdpfu9b4drf7cjbz52kz5f20zhmvunt5d3nd2z6jbg31ekcgj7b287km9tvtvv0flz6d85877bd8kv5gl9pztmjch5l8dsvw085pfrr8u6fyqnqhfp55gc8g8oud35k8alk9bbwusbdc44a0kqjgipaf959pgzej6f36wc5d90iq30elcoh9dkoeu6z7csp0egdxq2l9tjd2cam37i5upg6p6t70tdarh5hl2rv0job7hkj1spiigum9uxz7414tpndd28nphr8mwx5c1gydq0zfl5toornaen5muzbg7lsznglbt8l0hox1n3dcchc0gs8ax9qjyq6izmyvzn1pbs7kv07fpukby6qvmstyxedhaf1emcgppk5v4vkl7h62s6xyoiukurr63fgk69x4cicp3271jvsaa0jly974rl3l1ztdxz0c4ed30pw0u0igoluwgta0m6m8rpnhikf6u9h4ylewlnzizw62q8bp9xfarki9cfsykdt6sqyn8v4rc7j5546sku5ncnpeq5f1g68gu9wszwljn6g3whn243v2jnxvgotsvws4bmf44o6m3wjm3uqxsfklve2zr0med3ejg2ax0qcqp0jfupxl1fzjunrd07lq2wudsbehvpxv9z371wvy8gj2d1jk4p9zyllttwwam3qp010s83hpiyh7l5pxe8bcknzfp6tou9s6zj08p7nvic9zy7ds3ap8qrb6f7f6ze4dylcjghypm26ke4hjgiwcip97otfrk8hp',
                        fileSchema: 'udg5bvo15i3w78b6y5538kknn2yqi0x544xs0sndvjpxb02fctv3h74uau3cu1np0hd08faqvzl0wwz1ce6yu8mkz6eqr0z0p9iq1p150uv4tcub7z2nf76r858m9ba5qaqhxbaqzb568g0cmh5u6e3wi0h7xqnzd1ac78j1b13icehone0bp1vuhfwkhlbdd51w6nzwrd7sdy6wdwfand4snfbl24x70czqnoswkvd70r2wgxncw8t0y8yqub2iv4ywx980mt7xksmdof4ohzbn7mk574hmi6f2h0pxmt955zh6v6tk873bc4w1iqozsmpfsrhqxdzvmx6x693rha7bl3za0vl982pvk3akg2vxnuin2sg6x84ci1awfi7orxhddchhq7mdnh4guu0192risrwa5pvn2ou4ru6li8e8y4n6945pcvs3tgp71l9b3n8k01mp7zqtvmkciut1v46c79bou1wgmrje1kr6vtr1jhvupb45iwa98z3opqnpum58wxquf9ampz4jsrgja5bmzrngzbns7sto1ogh3ua15a8ne41awug6djt9cuj25b1hgf7adzjz8ec4wuuzd819tabsl47db27fsd2gysn07udwjhnors1rovfec2sqnca3sfu15tqzig6g4q8a3lspxo1x3f8fq4mgjn1ijnx5lp2y81dw805u7zfdo7wm8hjbxn3efitp0yx7bmsr7bld12cnk6rq3lx0udadpp265iic5hjtgjuyzzq9nk9a4pz01wczm7bwgcm43ktz8g3bmw1yncgkexi9thyc2zwrp9ktcpte09lj9a63mpqhvwie7wkptjuq1nqjkdrwwqi2un1xwtphvy43ob8tb39zaryarv0p1xvjppsuvw21a3glw0titwxzp2kqopx1o1ge5cf2srg0ivn35jwrj1ltz11yzwv773g9iaqirxqpqfimzcfmoqm3far1fwmakb4lfole7flr00gglqkde0z47idph579ahhzj0acazn6',
                        proxyHost: 'shskww3hs41xww8ptwibnhina0f7xvdmaqdl3rcbi1s8su3hww1ekza18du1',
                        proxyPort: 1237584290,
                        destination: 'q63my3h4xup40v9s0sl1yj8a3t8ozcukvi7mbl8mu2x6auo12a5az7jr6a3wb2zvy2ycgewg0t94xzserqtgr1tyqlyvnx5s2oo1bnb5gmfthvcflef5zz18fey9wrtrvdtidx9z6dhlyd0by29h0knbb5dws2og',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'xbi6a48coz71794j4rvbzu3iwf6gnmulggmbx5qdd1mz9vsvvp6ir0obb4cg9cmw1v6kqfiysutq2pvu4dgvp59cmx5qzl96dam3krht04dhguv95ewk8604eyixptbblmm4auen1ve5wv0ijiye497mjd8e4z4p',
                        responsibleUserAccountName: 'tedlucy5y9sis4w1nw9h',
                        lastChangeUserAccount: 'b4nsy3xl4av8qsbdueew',
                        lastChangedAt: '2020-08-03 10:56:22',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'ce20857b-859b-4073-b2c1-114f4a3b5d52');
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
                            value   : 'd1b0b406-f5b9-4b99-a0a0-378119c4a5de'
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
                            value   : 'ca360478-6988-4e28-86d3-10aa75f73e68'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('ca360478-6988-4e28-86d3-10aa75f73e68');
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
                    id: '1cf42225-cbef-4cb1-a7a1-5864e1fe7d7e'
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
                    id: 'ca360478-6988-4e28-86d3-10aa75f73e68'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('ca360478-6988-4e28-86d3-10aa75f73e68');
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
                        
                        id: 'c71d3d41-315d-43e3-bc42-146c7ae2fb2f',
                        hash: 'fii51lm4n0e6p6o9gfy3082ji111jfkfeaz81yxi',
                        tenantId: '1a03b591-b8b7-4aba-b4fc-4d197c48fa08',
                        tenantCode: 'ez2gvh0hyasao7pxflhoaxt727f75w70j7zqclw2l3jtuhhjkg',
                        systemId: '335af36a-05ec-46e2-b006-6932fa8de8b2',
                        systemName: '3weip6cjygjpvyvdda9w',
                        party: 's530wpazksxtk6gsmkgrjtncft1fd0bmekdtl6orzajpch3u7u3npqqlq0vdx2hk9qhqsijw8s8p42k4fpv2kqj2b9i70mcqtqibzv0qjkjo69gk01lzd5xa41vh4v2eighy4j4bx079x6dym0i9znwlllmarxe4',
                        component: 'o45n2ggz85tvzf34d8kfsls41q7why3y7pyri7oilj67sy4q410t9d0v9hkae78835pbwg8mvyubyqtsdyafn5xvn43lfszop11ro7btqgnrdn2dqfw8p5iqmavxwqjm2ir11j9afksw24z1bnrqmyl8t0vbgc79',
                        name: 'vayfyd266nlbdt8wxcoymp99r8zvzlv2sszakrnl93z35xjli8a489r2yt1mf0ul9y3x1cr3owc4e48cmorydd3aaar6badvwl7o95l4xqrj98tio4zdf8onkoo1olm91bt14gt2ulmb4hh529dv5qewrofhinxz',
                        flowId: '914ba770-4623-4429-9174-20ce0ba33810',
                        flowParty: '9csey45tcvdmlz8dcfm0b7ztciaojyzkg2f43gjgcmc4z9jdp6z5mmmuagxqyzj6dtqu0aikwd8c3181yuh8kbl48rk2l7trmz4g7uz5ad0w65jvf702hjx46ne8nuvbeunxzgjp1isyc86wqhi8lx7z5k9z1sic',
                        flowComponent: 'i4htykkphhejduyy2ss6qggusqko45uttmzpsasq028yio2gfvy1p2b525ootsyvarzyst0lbh003ze4i6ampkzodjx9qc9dt4995kueeftlid9u5bxn3j4bbckdd6bqjh39spfved2ybgc4h0to8inkgbthhzrt',
                        flowInterfaceName: '0iyq0pbr65rszoj4hnyuq4w1sglqlas4755p16dw6q99exyd55dfg8qe9gbde5ma10xl2ujwke8crthag7ee49d4q6zimp19e1jrp89tltjwzm0msm9xv9wxonqm29o9cxe59n7qb9ptpneo0f2m098rxffnzdfv',
                        flowInterfaceNamespace: 'uei7rvgizt6f8mjuiv9k8cqzc9bgknxmiyi1cpw5w1i8whiwjht5a3lxskh1hg64iwe747uvd9tz1uflxfpex27ap48xf04uhaw4jksl34wdbv776fyrr4ihyjw5wd3s698on00x13n0zqqnpnph1o9jzoiau6tq',
                        version: 'n9fv1h5qayc6jgdh2z3n',
                        adapterType: '7p8gjri77dgr42kr1ykhoxqdo3wj6luuwjvisz7i4yiped40chsq6g9g47z9',
                        direction: 'SENDER',
                        transportProtocol: 'fgm0bhdrs9i6omh7ezwfna6e4u17gxnhgpbx87pm8br72819ngkd5evn3rnm',
                        messageProtocol: 'kpb94a8zf4j24pxrqv7lattoohjj13tfz6o0sktn4a6wc04tgfug9hz6mpr5',
                        adapterEngineName: 'p5wqampxfs1i4gg0i53oey4t6ozcm3e2ipviggfpmu8w1irsmxpquzsk9lqi547t34bmdm0tt6zi8ymqa5m0xlyepxcj2buifxwgjn8l0vjtte6mcbu22f5t1mo2xt6f6vpltdwxtk2wqv0upn98r5vw97fmx3ha',
                        url: '61iiopjti3vylwmcet1fmh46fis4aojso51maqmq1qu88vj44l92xmycgeh85rhm10uhf5pifapmrislifjs0bj2g1nh029vsros0llvajf1pj3luz79bmtrnvk6ycwil1sl5gbrjvp4w6fp5rbeoma3t87h0myo6dvfvweppjd8fh82jjdbhiozme6wbf1s57ryx724fx5wf8e59ma7unig3km3385e8or88baia1uxizu7b0khur46vth52oli01jihhvwwi629uzv7m4q90x3557c46yiwglgo5a660a38nilyrs64iyzwd70r2ym',
                        username: 'uqpkoli1okddl8elpu8tzbggm0rwaxgm5gjik6mc7n018af12rzofa9j8vcp',
                        remoteHost: 'w0al95g22aqhx9gn3ow24m4wg5b78yesryiyq158gtugk2zlrvjbc92rb8gd7a6hesvow35obqluxhpr9q0hgxjs7kkckvewraad27gpnl68cyzopjnuky6pj5qele15d6dqla3un2sdl2xhu91mgyxlqfjbrmru',
                        remotePort: 2228197690,
                        directory: 'ymmu7b03avqhtfucnxle0gt92k8w77w7e9uhvff4zvzn7o2f00opgd4dcmhiandqkklwtom1p8ci27w4h3znjczea6inlruxue7shya7q8rupf6c5gobtu9il5tczs8n7q6112x9qzwfs7v3ddwm82catiqc7tkchxfeb9kkvz2cw1zjdcbimv0w9zoymr6ucz5bd1c5gcg2bwuiixm710vczxg9ap3u2f4d4woz9lq0dcbuq9ghqmlz7gqj2ixm6pq1p7gk4ybkk49rpxstf64n5bypewzlbkn5zw9mqx73rfmczh43p2w6izk7bazr4z8v2m7ix40tnz170m4zbqszj97j40v0axwgi82xl1he6m673pr2qnhue21l41xol1fof5x2lsci25mgmy6d1qi6cck5uwztz4nw22dxk4642vc3srbb6kl36t78evwi5t7wwm98g2hxyor9ix83nuj7s8df1z122ks9f6bc47xgnebkb1p5h5mrsq2h4bspnemvurn7xkkw7n2iis8eu4fhzfv0ak4taa9r5nygt1ypdlqck83p9tkhyxmcw1ssmo5vjmz2uydfcjowwacsg30p8z9isoxczbg148cryad3u0a5hhc3a6li8fwqvaxa3sqr5vtk74xhax866vmp2w2njqa6xxejgnvs4itigud1vma6lcbut6nvfx4zcynaupjq3kc48ru8xewbmy8ux12cvvpk9c76i0ed60uq68zvl5a5y2zjqheidlk5b1ak7x1yqedncmdkw2bv0nnnu9si077vps3mllk7xayye3yg429jycmxsleelagx7edpannp86zdor5wouuk6s8yg4yx1rfdz7dqukzozdeg4vy2ch08klvlqmmaemhgl895b09uqx6stn4xg0ilx0a8esgdqgg5daj0j2e23gewc9kum9zrjfl3t6alldynuocako6ecje7ubf0ccil99wd366oq31jx1vjndys2vg8d76ahzvfhpbep845m5gcueis',
                        fileSchema: 'dpvum6w5izmz9i6fgy5wq0e1e54d3dlgcapwhcqcfs5el8xbccp5uic5v62vit6zd7ij7bp2v36tpv0odq94nt4k41oas0c4i1q9i6dhbwjs10z4vfdrskilx3ih1ak90t5pm0vpk1hn3okptzlm8ofh5ggxil6h6iutma8390jrqsixcmz1eeoyusfnox2vgk6amogzpv0cpns7zfmgajq3t3d0tcoycxxrd110rtxhv0w2yrw97crkj0brcsmm7248i1sbskvclit5yde0irjx0x1q3uqsnny617borwawj1udvtvn455rjvlkra2cvt890blfntd491slydsweoot10foqce0e89pgwzumkl3camhtuldd6186nqy1tl7oznhaxkroi2e68dzlhsc80z0q1ogvagh0l4sm3m5qmok5uco5j2xogjtiixhr8fkkewp8idjmj5tesm8ke6q6falq5i2tyijlpf6ua0539m94of00o1cd28quaqnszag15ddgky7wcpbf1ry96ftqkc9zxaqq2a2zbqj0185hgfcaqu2m8do5gqbu281plm2k169cx4vxld5ysd7da2ashoteh54kojyjnd355cm1yjzklu07wwgjstxh8rsm3s0dkfxtn72zw42ejgc2vxl1zbesulij0o1f5yla6lnrdiogpfgly0ysyphwff6ln1nkj9lyyhidy0orb9q5hj6hqxqq4acet8468x8iit40qzy3j6tgqfaxgsj7rnxb3jhzleixnd3bngyiktd4gtkd0hvq7kn86c0l6oz0c7copk5vo185sku6qutc5vc78iyvoo52wtfte7c0f7zmbpxmkt5qdmhi0m5awrmn8ecvla8riif7aqwurledt61y4xjuypayi8ztgwmzf6kvs27tbz2opnt1i1fwfaxfiawzaiwznnbpb81onasl51wb4alma5twsyae6r4p160hspmvdwsvmf6kxjkkxtemx7v6b3v9rzt26srb1u26vbquld0',
                        proxyHost: 'hezpdgdgib5agxnchyr3huy7i54vg2yh9gbw6w4tp0hdvq8xo7xel31o6n2r',
                        proxyPort: 1266121334,
                        destination: 'nnlctgrgaa6bos7a9r8ng8dwxxcqp5aw2s9fhozyrzyqh90pyq0lnfbux05x77e4380x6hw6bo2jkp2t8j7h89z8nfkn8lgnlq09gbgn17ea7wbldcmh1y387sbp176mgyiy12rhuffiabhdmb3ok9n12wq9o2fa',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '4nzkl9cfy05aeggwi5q7jrxok2lt1kc17jpb7erw205wreo1eilvikdny38j4keu0t24gikaveeuoq6c9qgxu4qamlgg4invy7a8hj7hqxcnwx1j7o9qk56ynfn1vgbvfml91hmz87jpmcxot89ga40iha7z90vn',
                        responsibleUserAccountName: 'ee3bwcp192d4349w83tf',
                        lastChangeUserAccount: 'a3emk8kq5ywmostw86xj',
                        lastChangedAt: '2020-08-02 23:10:48',
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
                        
                        id: 'ca360478-6988-4e28-86d3-10aa75f73e68',
                        hash: 'wy74dgxorhrqd1vh4i79estus4kgu4d7otqqh21q',
                        tenantId: 'dcd78845-0d79-4bed-b02f-47a91163fdfd',
                        tenantCode: 'd76m6ghn955brobh05sunswi61yu1i3d6pp7ty7osisnnwl48v',
                        systemId: '3f03b1bb-71d3-4d16-8ef1-00949a1aad44',
                        systemName: 'k22rm3vn6v1b48d6ctbq',
                        party: 'ki8lo5xg4xrg3rjc87dtjwl83u9u1l2g8x13d7pf0a8cc0bm50uanjt9086epe4ak28wtcy6w0mkfxq7fwzz1403ih1jrz13y6geqqjimnz29ytypnf6yo57939bjvkv4vm2ks5yres2adqd2wtfnzgay41vmjdv',
                        component: '1y1ojx38xch24dgaqk26c5y1kk2y3o22j0s6izvebvuamvp8pstg2k8fycbzgdov98b1d3iq4q5rxg3cg6pr9gh7eimqbh9it6mr7t794d2xal6gzl6tftpib2eqti6jvtut52m5vcbpgyz5jgda61ktf2kjug0c',
                        name: 'ood2d7tica39jpkwbwl8sjtwkxybx1051cty1xuc2eox2d6p2bqmsmx1e369z0wr9zdl8yn48fmwkf8wzc74qkt2yjixbslkdu0e5bfy6jwkikh3k1nc5oaevsr2dy0940coyl8vnrnvh2djafnif9t2f90umgv7',
                        flowId: 'b6547879-31de-4289-8e9c-6c2a75de6604',
                        flowParty: 'utfpqq7kp7u88gets1c4coevmy2iztfa2ybf2v8c48r9ztl711lt03b34vo39wggp6ealb8fv1goqk61vp0ul5ll54q1clos4vovcydik77731z87vhqc36ie0bmhzl75121e1i1jaqe4euh0jg45ofb4opytcpe',
                        flowComponent: 'jwk1cm6egpbmc7qeoypt04ecnlovvg5oyamzg20hxvrqv4803u1fxw3u0ydr4t7v8x09nxa38u6rh5ckv7mop2br21oi0zewzbt90akkvtp5f2w0e8vtv4oa3ugzu0r4jmfsorlig4q2ag8ekbjndi995ftl0zzz',
                        flowInterfaceName: '7iztxsnlnjxr7kwtusys50uk4pdde9bi99napwxcpcgtotlvlyh02ppspm5uayxygcnag0i0yzxjqb7ovucikz118vyf102rruepoacvttu9aqiioh1txtctzonb71klhrrgy6hqvsk02gghscqhrykl9q98loqe',
                        flowInterfaceNamespace: '5k510vavvkbi4o72fh4rtjw3oryy9uy1kz6mpfo5s1pnw9q1sizdfaqsb6y0n9ednqtcurrriszu71m6xryec9hwie9p17rfzzdhyfg2n82njst22l4cujbmajnv2aqedsr17pe2n4ee7wrb702szpvj2mw5f5z0',
                        version: 'cg02m1u4oub0mym6gxf3',
                        adapterType: 'hyjpxep8ig7up8hnpbi6ecdjpkykclblcrpv62pthvmmqr6wj2ski9yuko4d',
                        direction: 'RECEIVER',
                        transportProtocol: 'ucc542fdjjswyirgq7zmej3v5boqbqptg712keruyp3p4outyz3gtu6fir80',
                        messageProtocol: 'faliz5xc03xz5j3qb15s7p8gqw6ehpgkv5hiohw2wznrv33bgdfly3g4lwxc',
                        adapterEngineName: '9374f8ubnjh9qvl29qcqvcimiwusoucodny8jwh7d0a824adwym6y2fxct3pj8r9xffxxfp85kzor5t8rf33mq7rs2k8m68vty506rom68l3caoa3vtqldjfitmeuaftw023lu6x5b4y3a4ijwgctb68vv9jqm75',
                        url: '7mrhyr7428h0gf11vjv50y4x5uqaorzw010f7k32nscao293dekzhyxyt3q78v771lmgq9dlieu2refiggqsgzx7lobvp95ejaxxtv5kxwegakntq0wqag85dxivygtnpp276xxi7ibicwl125qilfj1laox4h5355ud6xwnvjewvcgbwtaa85mxr212w1w10182g4i1t940zt16nyikev3imy6f3ztxod3n3wb2drzanzt3eil18ky0sasd14rtc5v6ujw6s8ggyd2eviw7j5y5us6j9kzalzhq3spv4gei9iwe1y7jq64rkekejnul',
                        username: 'fu2bzlob4ikst8l24h23kqgslhhlvafhuwjtpg8fj64pu33wfxbd8wus2gi9',
                        remoteHost: 'p8dfmw0o7m0z2wjbqxbikybkpy9t5z4r9u8cc4lse1mj8pwl3nwy8z7rzoq4cpw9blyjd7mqburgswdr08dvl2othel35tl1r8jm7689dm9xbu66123pk0do3osr7ni010wv002lvnycj18suofoyh2oh2uq37i1',
                        remotePort: 5030968600,
                        directory: 'npprkmm2qv9j6wxwhudglu1ct813kg3z2r4pmo6ieimlmlkf0f2rroihepm9v7o35nruyovzhrrscmujtocz2c9h4k6wss2z75fwrytwqxorwb0xrr1kfpq9upl9qnnahya1nkb5fh8z9p5wjpifqkslki3g5v31qco3uzhqdnkfkkh3v7kdofcmurov71ahl4lp9eexl5vhhuvuq28miog99kiykzmcwiobqj6ju461oxr33klcobk44qqgwl5fnj3mszeyeregeyuoomcds24v39mufjflwfzn2qngw41oqj8tkhpbmu4om0chlc73isqac0nbnktplcuhjj2o5d44mz6r0m4to8kkhq2nlqoqln71gd4b6le6v3mkdit77inlj8edag289myhadxeozysjitao1swni0p9rgmpzcl7wot4z95ixf7iw9ujxv6qb5l8zp5uwxhp6haljpaxmipn9z5hc6yqz354e0og68uzeubbh9go66fs1364vwob18ndglkwhsa8zd99kabw8yxfufyfz69zj3wqvip0doicw0wzigvf0g765jhdq4qmusafa0dnb5bv5e7tcxdiyrfzjim6v1qft56398woje6b949dwp2500g2ykuzoe8wfpwnpm03gy428ajdr87r7n9vvl4lzotowhesx9p0ytopidtre5md2e1i6nfxkd84shir3xatab6l94okms79f7n5b593tn16f90v6do954qup1efab0xwomkb29e5fduxhix3xebt4iwqh1sg16tflqu7hjhqmr3goh689g976ifc9parowcaywi0vs0wn4w037cebr95tmuqac6mzj2z4yhznzkh86apuuty5nqhl25nhmv0kglfab5px4eb21yc2q995u8q3v8c2rgmy5twaiasd0xbi8buodetskgfdxluwpse0hkgdwcgvee7kft3p4uciqhe9dxxqx8fvewxrziu7e4umutyca73sbkg4dlum81voobpcjwd3fai6l',
                        fileSchema: 'akfebhz5put75pdstuyfcsc0dsy7j2urhwk32z1urb169ny5ztx14cwf6tbultgomsr5bxzw2gv7id7repsspxkna4atm1gph97szsqmmv3t7gdf5pmidvgkoyot0rz5s1j71is5ny1t4cdle158hij68xhhj14292ssqmt89s8xahfq641xw8dr6b0uy37rixzel6oz7yoypi4rr52hwbtxaojyzoybnj2fogtzkiylnullo7rv9gw4wakcxcixpwdorov5vpmt5zbpoxtxhj15pu3nnzhvux830uiy0m0rb12c3rr5kpr5fp7soxv070yf5w51vh5194mpcemwxtu7t1o7lx7m39789newkssppjpabe7yqci7sg4cuk53qbr8swzgcklj8a2nws2au4alch9awvwf5wbmrw0q2n6v9igivl677ytvmj3vw8vipbyjodgn4o1iv4v4m4uywpcj7aa4q2xvdzakm4hwfl5mjcqew9f2zyjksevtcwa0o4ad32yitjbx8iuy6kytqf3ksznqge8j69ziskyrzksxs3j2nmas0mo53lbxzth06y5yyzo0t2ybcjqrtn4e0x833io84gpdhmosuam83lz2k3izmo560fquf5pb49wxbje5qzsdhtm6i2u8wlnghtrz1u0dxha96092ltwa4607ibh37pnykwk7u7l3hroocspgrzecwj0e2ka4tn5rtcqqp3iyku8ajoauvyx1zapmbr87wd3gzfze3k82mxos2gt9zmcw0qfigxg93xg3grdcjlv3qv1n6s8ycrvb19k4os58ni5nxa79a26x7saihq2ve1z485phzlude7t423pe744wd7rvc7w9haoqpnliewtlo5mwqf3ujyd639m1e6tin9bode1jy0vc9212smt8m4a27xjrag874j5vxshm9285jubkcvpy8ipec0yczvfh7pi037q45izcl0ycqdfhl0wveepq0uxolac4orb4cwu7xg8o5chin74v6mr0',
                        proxyHost: 'ndz8wnvn1fxqri1ehr5jf15mhypatblgpnihtcrk2pel7gpn1t2snmun974j',
                        proxyPort: 7911963997,
                        destination: 'ybpttvr7wseb5vechcanla9pztv0z5dyrcp7crunmvv3a5qp2comgpgebnhqvpjg55fq18fb7yd4we93w2lk0qybh111n42z79aut71ozif499cv57akpw4qtjspfjl7da957le8uv9m3hyvkb1eki1qpqypy5rd',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'wqasjij1syxex7v68uxzv684hsl3nspkskcz7mo6mwj896pikppo65mv1hn4yr3dp2qmcnfrlmv46t1zizxi9ixtk3rl8xly2knn7di2zvk5n72eh2r75pmon3222ttee8yi8usmjdtvrt50zn4tir49hiacwl8z',
                        responsibleUserAccountName: 'byed7jb0n7ofpfrelaln',
                        lastChangeUserAccount: 'uyvg16ij6lhqj86jrzfp',
                        lastChangedAt: '2020-08-03 05:11:38',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('ca360478-6988-4e28-86d3-10aa75f73e68');
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
                    id: 'f07b9947-b804-488e-b7ba-288263d07ab0'
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
                    id: 'ca360478-6988-4e28-86d3-10aa75f73e68'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('ca360478-6988-4e28-86d3-10aa75f73e68');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});