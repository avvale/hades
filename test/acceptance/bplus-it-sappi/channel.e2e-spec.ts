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
                hash: 'acu989kj9yuzv71zq7ggrnuii8zt6vfswv7jq7o3',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'cxyguav5igr09mxipxw9os0u72emysfpmducrbsr1xjlqevplw',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'bp48ln4hj94a22w7y9jl',
                party: 'hyvmakvtxxq4omeh8sjcf5dai9z6igyj95uj29ramncjx50jtj1wozak5khwgcbrt9xrslm12dqp9sjoge5tzbs88f17otimdlm9ph097kcvgvqbxfv2lixmkeqw3odsna2hg7tmv44qfvevas5t7p74m1l9nowm',
                component: 'r26b4l8bgf7atvfmnbgbt7n3876tv6oedx3t6cmwcdou3p853k1zjjsvb8qtukimrf1b4siu2yhmf7w3azdi9dj1qrejmlg7lr7xy75lbyhulyj8f8o198b5z38nti1sdinzua4ogmwj6rit0pu375j6jrklm0j4',
                name: 'b3i0rqhwrr24i7a8tu8k8k0k78bguvmfpghukmlir5foexsjrxxoldywgsapo63zmfmab11e9pq1foltu6r2sy4bhoxt0teulv2pjuvv7ll2fot6m7lldht93kdm1knd3e900104bp5ebgobhjopptn6pyek5ii8',
                flowHash: 'm3380dja7grtcpwxfloti7eypj6nf9ax6vd6i1so',
                flowParty: 'qx0abe0aumt22wmb4l6vmw3y1g321455tgglgc3vw0h5femgakyzwa48dy25kjyfowzah9w24h9ycnw948cddq19k2hoyavbx9w7x1qi7t78i8imgiyz3fydv1067abn6h4ysia3ini30vile5id5got5puvmgkh',
                flowComponent: 'd9wjoazx6jbvpfuntf7tw91mjwtki978g9d2pvn7heowa8a4orsq37v4kgf3qkdkq0zq2ooyjfdbu8izerybgihwtwerrcobdp1ozji3dz2lweqsmd2e5wy7tm10lg01kl0y6sqmhkr96w0i6egyvlm76rax5wr6',
                flowInterfaceName: 'khh4nrqlpf3fmaqczy2y3egr5lnkljs4960vju2szqcm7jt3bky87fn91a30emsz433nkx61h5ejd2duvpmebi40d4d6wp5ep78xgbz84xrys17y5nx1zcxg3vur6agfy3th3boqlryzijt9x6dylz4vp6w6w1q9',
                flowInterfaceNamespace: 'zibtbmpngoinhcuv8towgdj48k40lnhzeg3hb5pbogshq0n5g3b1d5k0gn3950bh4kqyqppyg9gmw8lfb0yr84hfud46namwi12ti45gpdl7nl5cajpmrp0ed63ri6y6cy9hwyybtkhg7pquislzonmb7cxocoqc',
                version: '8tmnpx9zmkir3q7vbv0h',
                adapterType: 'y3895plbz0h1f5fs70q3uppvu7liajp3vgjhl6sozo65g0i5l8wgk9ajz3df',
                direction: 'SENDER',
                transportProtocol: 'z3lskvg3h3napmuq6ew3g4mgar50lttqup4if0czuluivzmmqgh7ean252vb',
                messageProtocol: 'zwttyx05zc97sb4s91z18pgd95m0jf9kgdlhm0fe5rxyl4qqns7fsawfeqyb',
                adapterEngineName: 'jh1plqlpxiv9hg57c940ndebnry4vuu8zwbui1zsiujk902zp3x5y724r6uq79dfh6gipzxtz0sab4j5qaz6co8qselng189psuj7unkuswomif6vctz0bexeg96jipkgwlguh8clkbewkfpex88x3t5u593qe3y',
                url: '77ow3xh1pkuy2fcwm5z8q41uv7dteh1ps3a3vduz15znxi5qepkc9f7d0bs51kwh5a4u77izqc0o69eaf02ha82cq23nq9tx01zgwg206mcw38i4vzmpa1mfray784mttuuj3vuidz21yzsdn88ax86nenc2jud5k0s2ly7ry5mkghp9yg3cqwaff8aeli72bz3ic6xgdp4d7895v0xzvan4zd0hn689hbf432rr41oiqb798537iiywjd0vbw9t2uxitvs3hcwx9gq952jbexvxeqplx6c8rp3tzjhmlatmy4y4p2l6ch3no3n9c65y',
                username: 'ee73tbvn43tgh7dicdrxavkc6fq44c61omde8z1fvgymfbz164bi8y9k0dga',
                remoteHost: '89343etbuiklcgxpjs1bwd9ip9qhm9gbx2v2vifmw7rgrh1nl1xeac6vhlk8x96x7irefdsj5o4z8qfaoduji3ktrwfjqr1sftz8ianujgzb2m2bbnll64mcufj7wvj1hu9iy5tc4hnt0g12xkbpkinpks0hj21u',
                remotePort: 5524005958,
                directory: '8vauqx0se2e5faoy8kam4x4sbuvi6flocsq3s5jn76mxhg28y307jm7357yyz52k3k8qt0ch1bm1fissh2x826ha2kvodzga0wc5s1rmh0o81ufep9v6tahh4ok9jkhph80nhmxi9nj6396czvtbvzg835py8xvhd11fze8szmwx4v77hpr63s6hlkj1r7q31ktn7cltf600b2odqie38b9qocp68q7iafvexjetnee2haqgqxi73b0mzu4ko2u6b5ip6fdv6agoyxfw131erlczyzw87qxkh1tq8cpo7z5hc5rp0mtj5z3qcdrmnb8mvusf13ixts9hox8d84vuvlii4yomkrlr5toxvshl89nk6gmmviq4a247qncd6154gx88h9swrd1fyef54l2xvhimz713b3ophiy5gfio2mmzxqj8ezinnopiu3by06c081us05ftuhlxmo4t1jqltce0w5jld6qqohl2jx04u58d5m8e5c4ajdx9hiju0cwqxu7gbpxngxlc0ogp4a6455m5qoi3dcw7a685rieuubeong0c1bjyrcd4i6urelpzhyeqe9vql9pw3uldpju2qmo3bzb634qa27j1ow7l5cs1agj6fllc0pc50os39t4gwucjwxbchmve3fiobrdw7nvz96qy0fdkogbl9eiyw30b7ll8b2rgvap7t4dpxik1y0h0wc2hqwrintw3ql90w6o9kz7dy6ifbahvrjnfi1s5f5yxrnrix9uf3c9wl0i80lk8mdygllz8pohprfqea1d6ob6j3bh5k72zowddpy09eb3tc4yk03408r837b9qf9wkpxfihn0rl5mxisnsv0w7lctdqa7sa6yx3h3qzcxo20e6uh2q9ixnhpku6l8jhpof2pzh90eo674e6x26se4cunh1pycj0vmvgmccy4pzdtp8fzoh17383ik5ohlr0tdo766ipvigr71pbiwl4n2ssafpo8f9as8ftu7ipqpmoi8u5qkrn4bl3y7wfvnn',
                fileSchema: 'cz264fggycrljsma27gkof49a6nlnssslm26t8ahnb49i898yuhj5bdve71zvgbdrs71cp4zru4oy15nnkyqwtiokt57y2rsd4wwa887tzzrulwp5rg5grhyr7rb4opnqiz326ie5e7ai14rvk0is0ky55thzfu71sswjzce5s39r4olmcbvh4zd2p70hwyo3cq9aa1qmfe59trtppiifzwusgi8qy1io47wlc0n4aehizmw8hnuc0qx2zozn9ntdzp916dvo9j1tftc722p02xsmd2wtaxwa96fz3e27i9j51mwpqp63btyh114lacjqlmj9kaxd7af7o0kmh5mae30k74e7ay4pw1bzcjt2vqzkfffuhjfgovoz80mzjnc5pc4imxe8rohrwvlbr136s5qn0mzhd76gyzjolhvprfq6vaqhdhf6zrxe0yx4j2ip2fhhm9l808jz6wxm2982fvrzsmeju9avvze3efqo0rz4y656xf2ek1tkjwkw4flf9p77bkaesxofmx0lt127bzxd7iuyyh472eyvvayjt27tuc3emyw49qziy5akv1o4dsjyon0ofaf689j9d75b0lzpd8pbd61r28q8yz6r3j9o0x60uhdu4jrntg8f88bb7f3klf1p7mr21i482pn06vjol0iu4zuqkrxk6nlndtzv4p6xqohyo18c644wemdeee3c7o9ojgjtq57uats5e5jxz2tpn50ai943h8mxl6bxe9qiuw8n6yzylhvmji8hx2xvexl57ns69wp8kuwnscak8qipo9u81oiy7f94d172633rb3w572laznrhuodq56l6otggh0yjexbm3r5nqtzm9kfjtphzj2ngvypr31nycql7bzj6ug1y8c1djvtc8mnggbbccu75xz4p9jmlo8w6j6tibqyrepuwaa186ppcv3w5ixiyrcxx78dmqk02w80tsjxho777g6sjvvqgo6rz9ie6clhmhqw5uvy8ag4r9ikhohocogw9vv33mdh',
                proxyHost: 'u2tvzksa3q7b9spk2hqkihlmtanhtk3s3zp2hq3p7emfabe49nj5nrvaxh14',
                proxyPort: 9394323506,
                destination: 'kvf8zrdojueoopatt16tlibppgw1zocuq44yvy69pybrure6odeh7yrvpjiodyrqjl276iico6onjgwfsrgada1bw7enljprx6921jl019742gxka82qdijattuf8a41w05fo0o6kgu09vea9p9u4kwr9knbhxq6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mes7mpwbhze6v7bmnz0krwzjq4fiiv7o4irruwf844xxn6ffdmw7mdzcg15xqpm13pjivbvbmltfl5co594c53rw0weaomm8wgjdb81gk9mk6tr0olsi88ez907j012exz0cwxg4yhezgzysgom3gs77jyjj8kbk',
                responsibleUserAccountName: '9hsg0s5savkfomll8qhn',
                lastChangeUserAccount: 'dfp4jt4pbcgzn8h77g92',
                lastChangedAt: '2020-08-31 00:27:51',
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
                
                hash: 'vznk9s15eqj9t4rc49kj4mx5mq4x40q4yboheqjt',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'sk4zq560mibjev81yitxtm37427bl48kmqluz29i416q62i7a6',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'syd1qtccjs86susybn26',
                party: 'lycwlf5pacl9960l2zi8f77lhfxj7mqeguf5s8vj0lz8740eq5d95eoh0wyddzph43o7xi6gy8km1olbf7u9haocv6l7s256ham4k2pfvph8v6cvulu5tmddx927ucd9d4x8ryei9dbfmjuhxnm0z4f9fxb88hjf',
                component: 'mvtomshk6e3jovuw4uwfq08vumcxhiid5yl8cmgpghg3fsxsjhg5fkd7sxxx0judk1s4mtl7gzwr69xg0qm8jp71iryg57bwc1ozsqtnltlduocwvyhp8bkd7eiywahjsi7f6ktmimrmjilbyq0tjzyar1477a8x',
                name: '1geoh5veqhbw5bde81890ynm355nxa3jkywk2out2cxq8eopmhu7wxbaf1hel80xturtdp9n7kbh2knu2ccyqqyu6ch61e9oacys3p5fzpxdwq2u6fgt70ejsk45mm5seqj532pubvqgmagtvfo4c72trrrckm42',
                flowHash: 'hn5mm3te7y68i81d4ima163n25vve3i1h0mbnpkp',
                flowParty: 'u47psbh0ivqb66wgyci9vc0iyvlncbtmbs2sfk04kh5okmrsfn227tcm0vqaibw8oehqq0oecnaw4tshac06ywvpofzz2nol1ibr3qn5dpui5sy0bmrrtoebnoz16v7chlj1m2v62jgdqdriyvyaqkjwropbsa3k',
                flowComponent: '1ple6pz4z9zcpke9e29crgch3d7zm4lv24kkj6jst9ntgzcp9h02zz28npkwoiro7sindiy7dwuzsppcvc38u9fegmyf6n51oclgbpj7y8if9x0lnw3avu7vai22dpz0w6d5q7qbdtagodee537wc4m2pjv4jsaq',
                flowInterfaceName: '0jwjyupv185cgr5xndeen1hjnmcnn8wpe0ui1vfelsr6n52989r396yws1qpm88hf192ejuzpica9fcz64o8te5bp6xqpjjfx6ko0gerg99ax2gcmhka2o9sw4jtjnncn2vwr5v9t12me7yukb6p3gylfpdsgkpj',
                flowInterfaceNamespace: 'f7qoywiuxg4jb95sd1za7bc7c8sldh99ni9a01lxjw4p2fwyz9mx155s4s650paev806fh33vqku8l7neva8tj3c9l6xk7nd5z0wy2grwpx0pin41i4zptzm0n2t28lwk10053ib4zj2ce2gln4nldwjb4y273u6',
                version: 'zzu7krhfaldo18ygpt21',
                adapterType: 'vi1pciycoy5v7i8w8xvo42hi7ebzgofjgvtvikr0ld2dvau5sfn4vpj4728v',
                direction: 'RECEIVER',
                transportProtocol: 'q2b6ypuprimajfwl43yw0ubu9czoewhgwl2lloghdre8rc85tlud5bv0b6mt',
                messageProtocol: 'mbk8s7y8veek56ahsdt584am5zjrab29c6ykzzz93qo06fphtd43kv42iczy',
                adapterEngineName: 'mhjqwm9v2novt5t94bhtoc0nfe86vzisqi8jjv8ntw9alfqrskek18f2t6ht1aglcsnve5vo1fihpnxelop23ybt0pq818hi8te0htt31zefabf2fmvzk7tj21vmtsaboledi5n40zxi5uepl0e7d25852aksq34',
                url: 'yixajsaufuxes9xbxl10zlegl746izdkye761t5v2e8eb75itc70cyisgym25gx1494p4d1jif0wcinbgl2v4lg7ai7jitrntjq9il4bf8vfesh2xlfs9ov3rrw9o4pn2i31rs4oh1s9huxvjwhbbz301hqcc30ghtgrf55ka1hu8nvajz94dj8fo8kgny3yy81uphbxu1skghs15ag23o12rkmvoyiab32c3unbgnqb4lox39ymrs51vvcg89s0p685c9zwn95lhbckmv31rstakgoffc0yp6hh7kzu5vbc2vncrisnpgmn34q8ik6m',
                username: '7k5q2va1rjw32rv9cf8odnxupi2xg94wt4brrtabyol1w9oizraxp79hv2m1',
                remoteHost: '1sewnzo5epujshwz4t2hemr2dbbg0f962y303zbxhaooauh0mdz6jqc9zuqtcrtu6icw3wqx3aqzmdtpmwihcyoycqxrev53dfj3wqmy8g0ca89x4ezc1zg1w5fa56ml4gw77gpib3b70km57n0xcsxkatkz7g09',
                remotePort: 1284479035,
                directory: 'f7qvsji46uf466nn4o7p8jgovahto8vdr966l3qzazqtfsnz7t6u6fbdlzo0y12o9aa4hfwrggaxmoa14lzg8krkf1q84my8u0y9se43ae94o37efuj343mu5glnqzdsfxy9ntydo7334m70npw8714aq6em17g69cvdcpjz3237r2mu2ik92l8d3so8i9k4h35dkrc9mrksuqq6yq4tv7vrk8n820b0ttnx2gjnz89vnural0nuk55cxu45nohhln4avd5z7oskzreziwf52bwf0x4nf0o3zb2t5vs7il6nys4zz97qjd9b1vcdmqct7ffoiw7cdwsvb1xd5dvs3k9ogf7ul1fjcc64nnlenqw3w4dxyvid3oylxyx7gtllodqfaryvgjkaus583ogwhk1ol0po92a1tnc3ylwaopxnrflgdx19kpnfosmndvv327x00y01qs7ofq708cehc5l6ivu78iakfp27tn2hbw6yc651wodhkwsuea6l8izvgdiyc9895xctvirtczn4w4wsxkdkzlc8mvvpgyn96uflnz33q5wviybqn5sdl65ppueasmgabhb6vrpnjg2xm5iy4rwm62mgsmkml1ieqkyeg6c2kyx3t6gzm0g25jc4a8i5msezb5xbsk21f9x03qxk61klxw8p6ychfghxb3jyv4db5cbxldppuf7arjyrs8cgb8wx0o6rcg5giqysvywkvu286j1hb4i2si973tbu4w2ikkxeq9t3nrkfayglcs9bwk96icbprqudcop3xj54kacqy0aecp796ajifumqp5smneq31rx0s2qmva0ibwxk4h443jbkacvqztgrxmtnsh50h2hgujhitfb3rfsmnigu3k35qt1kxtknybgvojcclsojct2jpodpkymlna2f7ir0qleesvkkvjvs6a9uadnoq2xunn7djguu63z9zwm95bx8pu42v5lbrzys1j3anz24eqnjwybe4jjl2hp28acq9d3kmhwcdi52tk54',
                fileSchema: 'uoed76zf1q6p9o443ikj0t32lvxpggn8lfimh94ecjzns0xlft5v2nt8cwf7grk6floecjscxymfafwrarlio6jd6anrqpraxffnf5hra9yngmhuv1t0ae5nqtc1fmv8nzp3s5if9nyy4j46dioeuzsf2deuig0oicndmt3dkuw4r7bycmsso58phuvmoybtdpbkymgcbi9u14qfzxwxwykfoq408ouki83m1loewskgbohuvqg6rl0k19ulrzrtq1c5unc7kj2g2o0io9nzb7sz5nyqnnrdphh34zmo233q9vok4v3swek6xwvhxolvtifjruzglqslviu1oc0nvfjn8cnto2wxn1fdbcs36x5wai59k2t8j6m5oss6xjczzs6seifet73ihv3s7veav3kojwva3l2mtexrm4cwjsoz9mn65igb03q9pei4uv89pmch09rbvxv7ky14854ak2s55z4mhzusiy25eib0vpnuqg3i4oxx0cmcipve957zwd7e3efnhnttfafe0vrt2uisw85gcmcmpwj02xrwr9ibal8ak7z8idg2yrn8q20ma8jsk1efc3mcbr6agljj4o55rnip339w7s6zdajkb1ucsm002lzacwv983ccweucpw91vp8ix3mkaszcl9oivztl8qr1b4qn8h4nfh0fg9j34vvio827swikckz2137ow6bukmmowh8ceefxe7651d0191wb1gc3emnpzvdiqcc6nj3spacszk1aes9krv91c43sqixda8ai29zcv4u860oxiz7392dlpyl66fty2bme09c66oevdzt7ona1epvt706m8kuyvrdo20tccgjdqr4mvluarjadmayp1i7lxp7iq44sfak4ys14w1u4cowt8uxmwoaxgsyt4dnmldweb7r043y4nlyr2g2pk0mj2mufvlhdf42ysdw7l0g639v8iawqrzovdnrbaunzznr1dvw1x9ginoqorx6mm28jcda0edq8hycms4evc8ek303s',
                proxyHost: 'pswczkackmdpvizckoebrvcfed2bnhs3qzltjn7uxbvokaurvsndrd2h200x',
                proxyPort: 1033203629,
                destination: '1mp9o1sri1i76b2bcbyvpn51thdofu2ixosp6c6yoxt9hrc7knhlz9oi09agpgkjlg8qlcnjfdewajhf90gmyrbibsc40okbsgg9bq19ytgzgj89apzm481hgd9sqglqof7bwkuqszvlhjc10104r3bt77fbxgfr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'quh8qp8jomqxvy1ph0yq5apnl69c0cec35wnz0dql5du731scapgw5lfc7oz2b6jrugi0lhzlbi5vl3nfnv58mxtr9e73t259jg7072ooct9dkou9tioc8uaxp4lmk6hug744vvefv7riq3idp9o7p51yhxt8113',
                responsibleUserAccountName: 'ps0kow02glkimriqnerg',
                lastChangeUserAccount: '4qfg1wd5ddlxrrk6f7d1',
                lastChangedAt: '2020-08-31 15:21:01',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: null,
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: '29tplukycrqv8s8gfrad2ubxandfrgowe9ybmhev5r2v2mp6oe',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '2ydjwhq8m4fi3rjk8hr3',
                party: 'fymklmhdcxyskyjlvlyv5gp8kfc9gw8p9k79cy6zax96gh4l0ncoic1el982i6gy31qvvs4op57sdkzqsj5e5suwjhazfwi3cbzwm7bk9a8ime22oxqflevw2jsl3urfgqs0r56j82a50je9lw50o2ljytqhg1hy',
                component: 'sqsoued8xxmerf8frbej3duz613zgyl2tw1an9qv2zmbwip6n79qpzohqh2i5qo0p3mahnclrdd4pnggxk7yy0tqibop7q3p1oil8xepnbvdk535odl7mq43h47zg21dqkl338h7yq5v2dbz44tfe11z38d24tou',
                name: 'tgcrm9qz7ywb7o0tys88mg7603itshe5oockfxgm017iab2am59y0zab0e91ac4m0h8jjrw2jhgue7rcl3qxlqc2ydqsp8l2q90qgqf9bpqlp3qzc4kcwue3e2q8cpe9higro2eqd6lwy77qd15ua3jvsax6dcex',
                flowHash: '93t1u7m6owxv3tt0k7tagzhkx71xm5mk6ysk0ze7',
                flowParty: 'qvgslfimnd30pcq12jpzlxkdsy1thz2xo9igb1ghgzx0g5okmsrb0cae5t3fce0nkgwfk87rhy4a4fyywz0untbchbo6sctof3hgphiynvaysivgk8lymzjpt1rzkl784shktn8d7fv66eljqlifm52kq6ytozrs',
                flowComponent: '7128m476m4aabhf1g1lwxa21u218rawnw1unpfu2wwlm9kesphn5hzuaafig7kvnngka8tfqke72iwsvhj3px2s7ciis0rkqn15tbjg6d4jtewynk2mzkmthecd3dpzqx9wbfttnxo0lx4p3gfvysm6mz0vzfa70',
                flowInterfaceName: 'muvf80bidqg5iq16q4ngnuscgbgswx4de7hvzpi97ba46uw1dl8hojm7jlvyskrqm38u3zvw1ex5ez68wacq5zg1fwlbfakerpynkoz76wcx4n3sba1x2a5a5qj1pi2x9ppkuynql1h96hh6ie6dtpov8i4ao674',
                flowInterfaceNamespace: 'tttesakphwug5duazdyt0kx866p4m13jh1y1h6ou4qglpxj2ha73n2fpnqy10sz8lkvebxxz06fr6qwaqtnep9nv67t16h1r2t2iea1hzzjvscsqd2vtz53lv3jzo9e68moavrw3bi3thvksd6mlbfygqoepi154',
                version: 'njtlf4n1qjg6zp240y99',
                adapterType: '5nqo1fvrksdokglbuhgiqpufr90np2juilg18l00m16hy0whj3721dce3gmw',
                direction: 'SENDER',
                transportProtocol: 'tsbxoue0v8wvp3xl5bu6dqmxcmkeugox12ssqm3tr9apnvhi478ui605k2tq',
                messageProtocol: 'c0w2st02a183l3c5jo7jkdrc9bql24x4e12xd0deq3qsft437tfmoyqcv3lm',
                adapterEngineName: 'nxbiym8kbud6nha0ep0dzzlvkixqxnwqo9ub5k97k284a5yk695v5lngeegko4rrh91qq93l3okotwhryj3viejlp6lolmut1ttjec779stdu8idgintaykw0x667jb4ehlf1kquug3ie4ux1r7jyqnlt21zl9je',
                url: '1dg2hcdvy2t0yj5i3o2lstas40ljokirxw55zdelyc3pss6c4dt30iultwqk3q0z9fzsfdl64qqr6tawtr0e0mg93klv3ovzkeq8qha4mg00u0hlxnmyq5zx6syoa529yvjg9f9ty9ejpny5vu0yzo0fnui08yccs9mhyjlvwpffc0djv758fll0170ikd0cj0gmk4agghwn1ll0nyds2o28qu98bv68aieeqfyk8lj60ord94h39ajahf4j53w445ar69olypwcghx2yro2gpy4ox7t114akjrq17y5u0eu5cx2t1i29t90iqugb9gd',
                username: 'gcfugtgol6qqmu8uzod5ishln61vezmkxh5ng4zge0midm9lg6yre679seew',
                remoteHost: 'mt6g2liiy4lzose2qunw3tueb2ias3ynm71xsab5h9db310y63wjvuw7ae15l5wa087m4j6ovqo77zkrqjm1emyylzq4zuhmilwqxy69uezpq4oi3r0cfxkcsz9k17p5l3bjq3dbglt2re6ufz46ehkm4fzkswsn',
                remotePort: 4803619608,
                directory: 'p2xg7hft39t0rtvc4go67iqjbpisy3xq73fca39moh314isc26leuem3s7r2oyz04ddlo8ax0p89w4xh5uaxalog3kxuiesvow7e7yytw3l6clju6ftdc4mq54sn97p41tigon67ugi4bxut641c8ux7npotwacy76slgxrb8nul0srdj9vsyqgwyv5f8fmfueeqm2lkzgykto86ilvvcsfbxkburqpxbf7r6wd1ca9bjqs49e65ik6mpajx85vgd90uh6hn455mvbkr3o8w7mq5wv45wirees17f41ynhk844knhieye0xoghkprqbp8p4b8ncfstklnqcw9088n7hfwf7zl7jywgdo75s7ad4oscq3k1glk3ds8njlb28e9sxuwwwvvi22xngo6tgzprxekwuxro8tezk4v0cvi5zyotpuhn2les1u69cv6p8quv0jy75j9wcc24homegr61bxtn3m186talf5g5bj1sd4m3q1nu6yh1y5v418u0j1r44ii2o21xu9vj67uswg4jyuidpz84a36inf4hh39anxy0nac452i8hsgwkptix2mj0sx05shyluximpsv0ww16lac6sx1dn3ecpvu3cg9j0rhlgblzyaosfy7mobwmf7oi1euemt1f30xrtc5yeag833ilfwun6xznzjh1ra5ab1quae3ludrhe5y8blar47zkjn5qmgbwt315egh8yg3tvl0mx3ipnyt42nustywe3umu2mhos6zn4js2rphnpuktwhspi2qnpflh7b76jph79nyj23nyhwaq3c7kqjrksvq3cqrigdsdabotw1o80fbics8s99k1850qprvqc9n13uyzjg84yz85vaqs5tcyoksfstk4nls9mhbmvtadzuon12262dxdk017bcz6trqrsl3msjf19lj8k3t0tgljtnc5dndgcoh189yhvf1ijfqore0v0omoja3o1rb2bu9fls8eripo64yphcbihna0iutdd7yywg0m0iaa3uimz',
                fileSchema: '8legexvmkagos29q60hjrxctyg8e9vw2jiaq19j68w00bpt2s4kn41i47b1oqf8tq495gyxykqf8zuu8iz5uljve5or48fk14lwwewwpbdo1r60yk6f9dkuytgu4rkiv4d6q5cwphzgc4imr38zf1x1rf3j370gozjz3bovda4fpjrbf8wqdipnchkaq5n83ltaknv1p316o2kdk0qs5g0bvo8ete3oq82ea6ay4oialvvnzavfxc95r0hkizua3qpxn9dy4420okazn0mgopk6isxrrq2siwoaf8csz8jhvxa4sltd5sn4ic263geo84svq4dlbptul34m77jvac3risgd78ho4r3kff6mg4esm2jbob9uk89784dqptu8doymhx58muluo1gbvwlre6g2ja539yw7hgyjwek8c95yztao0rmihhsztnabpuu5fvwm62evqmwskj91spmegxsud4he1y6749s4pyn14u5ejp3gww28curyq54h03wpmkbh864avokdcrr1rwqres02mzbcyvty32daezhtti74k8dshqkebcebnmv64kni3dx55t7t7twkjig44oonllpq2dmyaggj4b7fqapmdxd1lk57x38eh3zirrols6qnk41oahr66o222e3m4ee8g7797kuq0r5az89wzxw5ie61972vnjxg9nb2r2ts5l6nom2a0ir86xehjur9pmniq2wijr06lyssijq9od9tspiooq0x9r7yujoor8h39v4e6d2ux3cti777nduqk33sxtapx2cjal1d96n2uyqqrokyh68mvvdyrtb6j7gc6q3syi6vnd3qca5qc2028r8j196trq3t7s7hwiksmav33rkw2wo2z1kb2kc9eubhpu382d0q6gu5f45dt8ngyvs61khqmojn92njiogt7b73e037ytyz3uotpav07g8lpdjrz1xzdf662nzf8jx6ma09389sub611qkflaigpu3bzdgovm9fnv93a7dwpn8sn4r2s',
                proxyHost: 'bbtf6k2jwi86jhcyx9rp3c2o34vh0jaoskpvosvl9wurmp0pkh4k9vaajoce',
                proxyPort: 7757750162,
                destination: 'yurimz4mn7dy1p2ltp2nevmisj2x4xk4ygnhieg683f8hy6h9l6tj63ou724z7oghmexrjh92jtoi62wjpqxks9fdvi3fojwfxhcqe6ezjbcpeyp9kq1r29027j32t4iytfhm0bwz3qfzih2qujs4zs4ywms9bw3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8cx44801b5ze7pe1wwspgwiead6d6zj4gzhb5ceqsc9jdzvuhern6a2b767alg51sdojxv9m3f9sh9h12hwwrigxb16395i1stt8d5wrg7hfid3u553yyccidnxo60mvep7dcl23yavnwbzw3oa69u4qw0gh07up',
                responsibleUserAccountName: 'gq6j20wzcjcibhy320ip',
                lastChangeUserAccount: 'j0ewr6pzh3p17gmfe981',
                lastChangedAt: '2020-08-30 21:12:23',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'jw7hfptgix5lutjk6oyumg06k2hrjdyt2eamjvebwypulte8fe',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'rzfd3r546j6j1jmd3lxu',
                party: '68nq1lqu7f1ytl74u70fe9wn00fs52re1xmnx7egg9adwvn2jn7jo4qzq8iapewsq7mpk8myqjgu5muemr4y9lpmqrthwze2oilhblbfztfz52c7vfjy89nh14cl4vhdfcgp2nysxna4ivgznfumt42458y63nl4',
                component: 'fcp3e2lky5cmdxt2y1upuijlvi83pst3xu4fuesgy8dyus2r9pnlnsd3up0h79pxxbmx2tvrfvf5v4c222ihmo9t7m36bokins6wrfu1iakfobu82p921smgc5142xvfgtunblcu7p78hhw67s37bv47mv87bf6d',
                name: 'tk46ux5zea5m42n03ostjb15tj2lhn26e8zwfmdm6gf7nuk7n34o9srafdn0aqbwei7rvj5r8ijpfb4rccqjhjxjm5jy1jd2bgpgnkxlzolp1m851eg9jfo8drvegro6zxrxxko2zcmsyexpzm2n4ygx3gibozud',
                flowHash: 't08s8z3imemdr95sxapfa4t7oa19525tjxvcw51h',
                flowParty: '09ku1znrarydjhpi0d94h5q2eb3s8q72x705pkfmbozagrevn9hdnvu06gwqcna7g0fctqg1nm0qbafbs8nmuja3l4bvmtpc7a2pcagcdqcavf1103483zx0dw23cchl2i1trmdhe0p95zw37z5c0kikne3npmj4',
                flowComponent: '1zmrqpfqvcjk2k9uqyqv52exibuzj8vgk7lcnapesc4o30kpvtk96yjlgx7x9khbxvhyiz7x2d5m8b603dvbc1lj9ud7ylqs19uj1kg1wmgg1sjzx08mc1ktgy10bcd07grrhebbu4d8afdmms5w7q4w0pijxbli',
                flowInterfaceName: 'fhkitvt7mueqp9g2ir937764ig2588y2dndsstbavb061hjal43u000doukehn6n0ld18vne4ek69rjb0m62qoh6g74dkuvp8mzb1fp6r1hno4fc43cgtnqi4okx6ov98gtzcva3hltzk9gzcxz0bs2hb2xf1v8r',
                flowInterfaceNamespace: 'i9fqv0xyimwxnpcyl868fq4p6r97curvr3og7ffe99l1wrfwxvbo98xcs972ur7n0qe2nqano3rohwozw7cajvrtfxko5t5sq4o06lftse2cni8ae20rwh6z0z2ld3i5x894a3fc6vbbh0ynyntc0tf5gtbhz5gb',
                version: 'jtfiw7uldzvne5kbjfs7',
                adapterType: '8ga1hxuxwnhnv0zj7kqtd1qqlcft4o2h3b2exixzdjhx2xf7hh8llp34sxgx',
                direction: 'RECEIVER',
                transportProtocol: 'rg557qjoyxx4jg91uo5mogn0vn9x4g3of3frsrsxjf5kdtgf4f8dknnrswhk',
                messageProtocol: 'xigst64qlss8sftg3p1pw77zjc2tevs0hrfnjeabv48q9e7cq3e53kzanwl3',
                adapterEngineName: 'nusnxvm4hpy8cqtjvni6802vbmkvq887c7wuc44it0dp5n62xgevl8fx378db7hirpv69hjqjfm2s7osrjjpavb0r01qy5r17albcnc4g3xahqn147bpqu7i4kye42ebuftr19xev0ueyt2hpcy7jgk934mls9fo',
                url: '0071pxncgittdtib7uy102ilya37vnb4lo6yvkj1j8u3ih5bllfb08uhz9081yjub987l09fuqbqutglbrsl5zindtxpmjc5e4jmlhqp648qcbx6eidxia2vzsvg44tyao6rqlnoncf4wb3vkoyoc908m3lilsrrg6fpv4xs93nuqkqg9cxx4kmh6btnvywhcozm7xres04zv7wlxuwav1y9zohghh801bcbnhxkeevtfexwnwqk64p3euh2831n8s0jch58u0oblq0bd7l9ok06l4now61aiwskz5c3nl09ngcu11u1ubcficig5fzx',
                username: 'jszfx2j4aw3a682qn4rguvwozqzgd996erucjkscnrzh5qop015bio7ow7sq',
                remoteHost: 'aaiplvhtkx4eid5tp8hzyyazwezdk17tqsde9ffa0a77jsr10gfnsbh3u5xulhwfxtsjv9crf7gebr6h3qq3918bm9xunub7kt33hc11peyzav3ma3lq4kzi16td1shqw6q1hsehgxnipv80w8rudjsnjxfc83z7',
                remotePort: 5685135085,
                directory: 'nzvxcsn2drwgssmzg6qo8d1a0zre24a0n2lorbjctliniawcgxjf5l2hh1t9tqn48gzazgv0vd3400qixn33731k0kitns14wbnzaabcnz1qo2gzhb4dfsqzd6v8sgu4a0xsid6y4qsbmvwp3kakgjkswm6klph3hkort3slvjqcu49chj5e29ve1gufe9gujbe1fmzlgplpbri5r6ub1kdh9xi4d99ajti452vuo4uti5wa3widtcvgqqoe9gyb4y9lh5ov0utzm44wsvhj7pnl6u1bncuaj1zfnbpflei6wwcfybzg6z38lgvmsn1ot087osm1j0nq2n9kyhxf837gnib2vgogxvxktnt5m2t58bzk3imtwzjh86ewkrvmfyw90i6u5urz6w7j1lmavij3yi4i0ojarnck5dxdicmd6a1uuatv7c1b8hafdalvu2fogjqq63r6c229vvdvcvi1hrhnbz8zwdelpn9124903ugao4ilkp0wlpobohv0sim57zm39mp1z354zdg4fn5bd28gm3u2fjpfdoxufzobugxhxzakf5ddh65rps1seub0apmnnj1w0p0xs1hh67l07ninx2723sb20spajn6ytfw10tumyxs2ivgbx7nrudmltf25jx3ks3aiuijxqzkr5gqce3o68nff09y8fpzusgs71fw2epx5c5zpc0y8zt68x5j4g1jknt7jtdun6q3phkl54mtz0mlmv7dmzodl0v4c3vjkghg2cs7c2c0ojg6x1r76gjw7rx18b42vbhb5dn47utj0gm1qrc2ozrrf5v2sitfw4gtu4xgyv01nryr83kpjzt0pqu4hf3vcnaqphhlipecuafwcpqj9d1j7ad5vd4962wn31o5i149kxznhrcfktrgcmwn11z2kf1a7mhb96nzjhik1ou4nshwsiycev41ejkxldvu86ilxoyc2rbdbb9w7pndmnlx8j3toxxr7lb4vtbrgwn460h5bcl0q2g9v30bgpa92f0re',
                fileSchema: '15c46jfgoi7r3bwqpwfhxll7uc06zysed0zr0gp57wlfzt207d9ehhgmmep0gcdjb37rfjqczb9c7ergdvdbiolxf74ggmlk26d1uf4bg3usmmgbs4ot8z253htgf9j3bakfk5ypq4yfh3rueh8kys9i5dqe7nxiossuaujz39u45lwqcsvurdkuczoqy4gii6ic1451npghsvzvkf83oc670ichpz2qdxd7ma6bh0abatpbbw14y2tvxl0ypjjuj9p6y33fm84ulbq41t75daeyidojuf5nw1rve4g7r1aaocwzyljtdr5gf0spym8bgia46ax0h9lv89np9b6dkp9cfq6s2fsmvigt187sen28ab04q1hpbki997ywejjmkjtkjb2jx6kxox6nuicukslf730dbxhzamyoibz17ghvrsixhujo8uxhuopwifo9t2wnh7pbw6f2kdas1pfpowegd6lf9crdtk7hss8buh9jsy247rhbds0rfbvm4j6rdi3bgd9h7yuhpkpca9ifo74q80wgwpmszce4fevhw44mboshizywxycqdlz8ma2rfi80koarz7dnk9ruz80uvuxkdgwvjpzexh30kamv2zqkcgnpa7l9q1oahk922hktm24rige0tixnag5a2nc7hzdz4apoevpkaf8o5owecz8wd7iug91f8vtv5gwosz0lna5tw9cfcsnmrsxbu6injavqs0pe6tb19mnswn69jqhwbc9pqu8lcds4g9ii92zgzn9n0e4ch3n60d2stuw263f4h4m17l9m1peyrv5kcuqcsabksprzjcyf52h98louniuhb6fck1lrt7wvq623vk4s5w3i4lk1t0ey0784zvm1s8cbpmsaf6bitlyu0lj9puivfh95d2t35grausi9b21huxnl3lcibrvkyxyxk03bjau3cekfgfwyyi9r0i98kvyxgdggpxbzl5d2c0b5n0riitw6oz517otvpmftsizyxa94se83fgfs0fb53mov',
                proxyHost: 'cobznu4y9zkzp9e82ahpjt9q1hh6agl32g525awv8lyjistk5vhqaqhf2ku0',
                proxyPort: 9239289804,
                destination: '7eo1y63ua0en2rzxidvwhp4xz7uhz7doegh567ffdwdo5xnysgjb5hrtqbi2ggfexdiv4xebtv0losn1sotky6bhzlyjzmqk8ishk02t9ribuegdgmrziwfhzcb42gufsxyw012hoq2jd6cuqfbs9rynd9029s6q',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vumj494cusnpprg7k6l1ca9l6igs2511ym7hutlm1pc6fkdvwe1wmdfkbbzepij618zmpx1sa3lgi5sdyx1wbmt36r19o0b0e1154kur104c531zi2au7tf72hnx1b9d0m7hankkz9crsbmpirbda1r8zydi7e2v',
                responsibleUserAccountName: 'wly1hv1s98p081rhkhc5',
                lastChangeUserAccount: '9qs1sg0472gzdd3s0tlc',
                lastChangedAt: '2020-08-31 01:46:03',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'xud1j9xusdea13mgetx06d4cmbd7hwd9dt0jf4yq',
                tenantId: null,
                tenantCode: 'fee2aln3fnbuvp1zkbcpkatsqt50xz6jewl1j6wlfolkg9k8xe',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '9e2vym4qgvflk5yguey4',
                party: '4a9rrrirypb4vhad7upg9ukgrx958yu6qn46n4ztedf88uo3eee4sujy488x9emtj9zizmfkc9q1it9smv3irtx0xglohq0nb0uetbjp0zc00rl9rtm8916sb7vi2vuethn2h12yp1fajpty3rjb5ojynddou94m',
                component: 'qh11ohpphetqhfbphturqozqyight01ln7107hpi6ahcujcp8lo86mw26djdbrya76x4u8gx4st6jc6k11qhd0zfkdfp7wep67lzeh2o458fbbkj6e55fpfmgc7ch3dnp1a64dxhn2vslodusrnc8e2gbty4tp15',
                name: 'umv9mzmtppac6vtb721eab906dzkh7m61bmhogfrlfplr06tf9a1gk8eih8mdpcreyotsfzj8l0dyqma26otjdz1th6ii6rfpe6iofxdf53okq8iq7medgdpj91cbinffrellotj9wfdyi9fv172krmp9utjh411',
                flowHash: 'ym3tp8mthj20x63wpazrp0dzoewu4r3qpiiz76tw',
                flowParty: 'kmg7fuduhzppmc6hxlx7rgu8wds852s0w6l2ic329ihtpvlvopcq07eikkvzmc2liy5r4r1xqgkx2xc3t7a53um983mnuim6m56rrxux9b8q9hv21eo0ls7ab7wrw6ik3ke3jduey8uajzgfy3jbnq4ftge0coc6',
                flowComponent: '4sl1uirzq7fla7fmkvn8zlezta1nc0u6mey55l249qdvv215x5mlodxy15jf26w5skohbruw4h9rbbl9s79iffbklft16gz3x6bkmmzg4crkv5mnjeo2smcuxwtqka7k9ywhwkyzq4hziwgbv5xb3ti8v1w2hb3v',
                flowInterfaceName: 'mgn3hgqhxmzn7gstwootuy3z9f128pvr1yfn8ozd7z37cu1blsxhv92hjx45d36z7t2kv37dt2jd5c05og82lcltcnbiojba7pq0ethlskm5uxfo88guodhznw4npjixvecm06360efns1xcfrwvs5oexx3rfllc',
                flowInterfaceNamespace: 'dqsdu1wtmsxejypw7cdqko8mz1huky6oa6ig1wd13cuvnjpd7h8qs5dffplugi3t02884pr5ke0biv5x6ops8dh40si3pdh1i95pbp32s622y97a7p6x9ay0prxum9u35nkklkot1oqfjol93rervpo86zd6ie1m',
                version: '24sn7l1ma9ifns9w7cof',
                adapterType: '54o6zsxie0dpm6dsed7gi9w80582wcy5r0e9acc751958j69qilv0da3hcxu',
                direction: 'SENDER',
                transportProtocol: 'plmniw0v71dmn4faos2v45w5gbdmxs45wyum2q3fdxgohknmdbsjfauhhj5q',
                messageProtocol: 'm3v58lv68hgbab5a7h6xhxndpy956z7uoy5sfi491yvhe995bz0ewuduawia',
                adapterEngineName: '4mhswedluspo0lcdwsf0yq7gb5qurseusnaq0tkxjnv5ydn5n1mvci1qahhxgm1qpvprjbeqdgfoam2iubj8amusr6p3sujz38xakicqaawky8zsacggvp68wag71dvjiyscyh9yx876tdy3ae0c41dktu1qr1zl',
                url: 'wlwptqznydqgnzvjouor5lont50keuozxv241o3p7tc4b1rav416sm317wiaj6k44ij7oc8adi7p9uuyrsfr2gsm7xjwqe6ock1zyhlcatffm5jbvlgmwv768nur58vykklxp757xxen8m70q183s0pemv6gz3xxrxdj6omfvkggvu3du5t36reh47fnrwi5ejcessayfydlsenfm53lpp36dqrpk52aqudkf8vcyp2wkm7v5pzrhw34oyauu5jg6crl1tub9k4vm95w0wckgfb3emc57ddsddut6rb7oervtu9xs760s58p3tb1o7mk',
                username: 'am22atk7c3hutq1xjstfo4fi8iuxlv4qtz7v7zxrrx556rhf7opa8f5d63zq',
                remoteHost: 'vt2exgt3evopcm6cs7uhiqnnskbclpj26521xxajdyilefn3jztghrphtwyr4xrdhuobfxti5vhdiavhenro0l96l4a4qf5t9n391pjxynpjo2b151z4htk9h09yvh4lkxzm2qt0h091r5s07vk5rocr1pfuhaza',
                remotePort: 9053009560,
                directory: 'f8j6iymw9yrpkzybsfcobhsl760rya3vteu1mtgmozxau5ky3ljrlp7r5l1pje0kvuvfvd7dydua44dtv286h7rdl7yy8x94flnb6hldi386bz4r9tpoly72p8wrmnrfw9yf9mg75auyjiehargp24ypyg3mlckxr9fgfk9ggnejro9hx0h62lmhdmq83uedijsqmggkz1cwm74qm8u4vx2ssrpsbby3zhw259dg5xyezbzbnhtj21wu4nwwrg55n1z8az0r4cf7913l6epsrf2n0vs6q21f2fddjgacfus35bnsj89k21pz8ick30e1zh45vz292x4fmf2ym7bmpgnalgrjmam5hp9rkkew4xvcei70huuyslm6krlo5xth8brnmb4dhli5sgtj1v76mithunmmydjs2rc0omg916lhau5mdlgmkqlnhn4mrb2wkl3oryo8zmqn874qrpokpasxbrbv1uvyvbh33sww8xm0ttraszj95pk6mizlz9ywigtuby22wdnx9zflu42s11nxwz1rb8w79g4brosoh2schnuta0zw09uytf0sqp3wtfwb3nl3fmp2w0g6mudtjy2xjurbdudbnliz9wshwauj1wrnvosu1dgcrkfsi1odzck4knj9m3s8r1j020m99oqn29ix5lq4ns5fiyp9uocircz4fy1ffdpcsdy48lcay9rp2jgptoqxa3i0tghh34ukumu8b1nqweqxyfn7ui0i0vx67r1zxp6d4u1x1925ejod72e79bk9oi72miqsk2jq6oasg8tx0ajgeoqz9yco5wbtiigvzygh8rs7jq0wz2ufsm99fepwqdeqih9q9hdf4z0uyprucumy80uwrqghnk2gogsc1783zt71rmy5sb6qz9nogmzt1ek1jirpw7oxu0ah0z9hw8atw0y2honwet1ba8mpll38okiizc54jwckl0cwaofa1ib8sh82z7kei7x9dur80zmfu0tobl2yg0tbikcaz617inq98305',
                fileSchema: 'x2gv558sue7y7f31sfvgul8gse3z4onzze39yfrvjo40jzyczauxlqcskmepop7pg2qj39b12zpis3qjd9tjfss5ajzppcznkmzaeisjvc6gf3pdtdzi1za2fbj3gu0b083kyjs7wsl6rqi5efy54annys2zv970jqhjlxvdvc6blk03oha2lxvybowdo5lga4ceia176s5l1kr6t77c59nt2k434i3j2oy7d7tq90edqzwc2zx8qr9c7z2ubq15qzpwfvktafr2lkpsw6w2tcfl3k8eqpfrk5l7xj6yn2f9v0gjpfqgj9pv3carb6pe83mo1yzlnekwismgwkhaxeyovis83s3bqim1zl4av517vwouw6v4r8pws39luki0bi434wlr6k7gczd8xl8pgajxopcsugjdj5tw0orp6utt7i6mt62hhz3s8ja220uorkeujj4b3zjnf1qoh3kg1rrmnr7scq85vyb2ropipcxin5ekpmt75evjt9f3vue68grb9hz1i03pr3wp5iykwzwummcet84wamx1o2cjmwe2ulzqat07pwxdfjwh9hj2nz0pe4yjbc7h495mel49lm79kzifbo6827wurn95cqp5nwhcm1fd6pcks6ytq8kah2jh175lwirsrddcyqhoy431vm05c02ytz64sr9r4yaduy13vto2hxf6xjca29vjn72xsvvzysvxthc5qzqqlg16npzuthrn0lbz6hgp3v3x9bohk6rdx77jdia0q57ca4bhgmthqgjc05w5rvr67jf4nn6k03tfsy5m8z6ly54tv6x6esgmwivbg0yp99p7h8fed4bsnv4ld7auvqkrbk9l5v30eyptak37ux9wlxu9oh9mesjya0fdaw42rz67oxu5epwn2jmihp0cl4hbgfak6vmqy6nw8qctd22g21znyri3uagp5mmr67gpobg75wwf0ppn3ifyc5l7o4qrcjxkxvzt14yn7ge7m4w91tyhj57bho8b9dpeyjsd9l65',
                proxyHost: 'vmhnn6f6g2cdo8y2p0kxo09vjtalb3m58a4vac4cjdhrte1ej9ic8ig04ju7',
                proxyPort: 9158462718,
                destination: '2gx4m20lljecv08utfw1rwb1vwimsz7g6qj1no1cjwss9601u4ntzevngxceqc3jud3bse2usffe41solxq88kq0y12iz7aypyst4roa80qno2vhqmhnp0zw1npqtqxro6vg2rkd1i5vlwmdpmw66exj3hlct8r3',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qgewu5suxs6wr2visypnngx7gd1bg9sliwf1do42fr5ido5w0cv1z25ytko3jjesu6qzr0wqnur1g2ohup27rkgiqzuf1bv3cx4ux4477tc6dkv75njh66eoommywivfehisxcc87ny30w1o5ros857cfx3tjroh',
                responsibleUserAccountName: 'tnqinc02hajegvf6encz',
                lastChangeUserAccount: 'igydg81hgvvbvbp3coz1',
                lastChangedAt: '2020-08-30 21:01:01',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'bm5tdvnxtk41bl9pimluqq7kgwzqols36njlc05r',
                
                tenantCode: '6ia0oq4nqv3bvux0t5d43cpadjc8hsx5kr9lha44yqhmvm7tqd',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '200kokkywkupb1ktqjsh',
                party: '2es1i79bol78z05c8kzvo3w7o9hoib2z9khtsnj7bk4dixqqhznasrpsk7k8c4trzjeuqyy19wxy3o34xqz2fzkime7zvyy8jp8m1psjp09qtvmipjx405v9urc5xje19huq3hh34uog9bpwc9rf3sw6j7d8k0se',
                component: 'xweryms0j36opq1ji0wftm1c3cvceghiih86l0uu4pgb4cxvid7wm7zlu0yi2scyt0enwrfcv2u9s0n94mqhgkxmdtrtfor0v3acnd66hn07gedst8dtbjs8zetng6vcw0hn3b8rgrsgwh9ln9mx6m8apnzl7xfu',
                name: '4d4t1gkfqsj07kluarc7rcwytxgm03f7e04292jl0sxcbx7qydlbiox09ws6ssevtaiai51aq4am1sncyofm0xxthvm28pvkvvo459b1tldz4fuwc0j9x6avp04arvxt4xnrkk3k1s86zehnr9frbci5x4k0ekp8',
                flowHash: 'zqmcisxolvbmghl9uj4eltiurwi3qtefjrncc4o6',
                flowParty: 'tl2w8xamuueyif3cogs7tren4hgp6u4kzevwlm3cr5ubj7w5pv38csinwde34cpbokebengl7jmqllft52b254q4a60y5s12l2r97isiv28edbs2htn6njgn80ujwjy0m0369kv5wwlgfcokddvpav6c5fls7or0',
                flowComponent: 'dx2v6tbolb7gti8n8kfk8li8ren0uu12ta5ecddd86qmkuhcoyu0h0akp8u14jefz3tg8yi9h9xu5opm6vjfgjwcp6jinhje9mrs8cww07d43vcnbfzc12r9i2jmawo5u1kn2ja0h830mavwdyp1etyj8tc1bdk2',
                flowInterfaceName: 's18red4zaxlxa6otwtlht3llvva6axh6py406c6jbarrohpkzbj1n1cr3zfte02fihl2jofruplzo3u2hhhutep0k8dioao2pehkwinlx4bc5ncyduvuatkzs9aiu8i6i6rhvif5c0s66xpn1ogxugwbs35ej5rw',
                flowInterfaceNamespace: 'qbi6euwn8mlif097r9bfo97we5ndoyl326use7k02kuv9ww8y3d49j7hclppo5a68j2sp33jcqwa9yz8e1fxpji9reqphtof88m4ue6wla93epi25kx28a86ihpof6f1rvfsy0dfg9avn4lfbw4f5i6jpzxyabvz',
                version: 'rpvnzq8wm0v9ap20t4o5',
                adapterType: 'up36wkp08veccsp2bk1bltpq8qze222ivaazrdooh3qyxh78bh7zwmhdejzn',
                direction: 'SENDER',
                transportProtocol: '5qzprmirp9l3mpgycsb8zqlhnic4t4gs47em5d6ue87al2x0qa327u9tdvvf',
                messageProtocol: 'hu25y1iz4wn3dt3grqu5e2rv3bwy4q27i4csx8wbmshfdk9284232cpkpnl6',
                adapterEngineName: 'yebxuy4rnbc2xiju9coaxdi314rb2h4lwyjwp1ooqndl62csuk1cd0614gla6hf0hi71ndrkbby1sxfsjqlpj449hsqfpyweogio43f7p0zz93ech01x289734oya4e306x86uz0d7nrdg10znzknsm87faicmkk',
                url: 'qkjph42sbop0gvtp211elccqxwt708c9pkj43ldq2kflh6iajn9zdrw60gq9qba02u5jdt0cqh9g4t7walv8acc0ijx62ckmlu1lj9q973zcgxntzj6t9n95d1h7urqotrhkto3rvkqx69wb8msk28ezrkrjqdv02uoaneceshhwjzdb73tcho3quc91sviikmty1ogjpjk9lovumstcniy0nxvzzga7v3j0qjkopmgiq4lssyybsflhewt4oun0rf6deecy2cdz7dlpffgpmknbt8adi07j124h9unp70lh72oqbi0h5wsn1n9l8rbj',
                username: 'qbj5qzmklmp8tazixptg9hbgfb9r60cw8b9139u2080fy24i7nfpnr005khz',
                remoteHost: 'xg0wtpmdks2ulyjfcmlpzi3krn4rpclray5kuki8o080fq8ulvhdze3hjxjizxp4emqivpo43k5i7s21dtqhssflf5zuegqnluny2ogbhgzl4s2ceqxmt01nphr2yyjtc9imahy4j4sk6fyrynrlr2dcto8qvpb8',
                remotePort: 4757794760,
                directory: 'p2ha49evhw4p00h3fsa2ax59v68kbxqjp93bnqkbgt0nffto2jegzsthdakmta1pj8teexkx5a7bwc2tmadcm8hq1oiwk5g1o4jqbl6975x1ckfsvn6nc4atsqz4dhv7m55t20i19ebgarvskg4xl745hunukmdcl8bxpsa9k26gs70g4179girod08aqcx6pgjzarrp5n59gadh0w9i63jkok5njfr92ver0t2gkrae0829tl5fob9sv3g47xb3tbj5dwzup3tj395wvey4bcxxed42esfsfpearrisl6c2e79zfcluyxgqh34vsavjldry5nj8x6yr97l1jxobt2tp1vx65mahoulwv8s7i03sojwzz3ksn8ux25fs712l4zm41010xre85r6baigepbrwag31nxj0fpirmmijoeab82cq3rvt7zmn8dtofp6mh7ph5sz8b7iedo1mpj8kqpajta8rg12lo9hcponz8m2klwh6vn5y7wriduo7ytiluzkhn2bvwlkb4v3z3uwh0zi45sga8jp5y24d3t2qo0x3j4j193475a79lspehcjv57br6t1eir8dqy2afrzhosysfmka2nguvb4c6wx2p6od6wqize74ve4xil5z3jdprxcumjzhlbfcifyu4j2306ciyt1qoev9brkds0xi42t2u85ran7q846dni4586uxsgqv7j365g1k80bkr9kc3u7hh9efppvx5r98hs0lavufvdhhbq6lq4vfzmb1eixt2n6i8xepixrc4nmlok1hafbsiarzxs5oyk51k6le1w3qghacpf4iepbzqkm9b89z7gzb6o1kqrgq8ljc8op9btguj3j00siey4jw9hvepj0v8p7s4lyhfj7is9odvsaf69xutfs6p0jstb4y94xbkd2eqa8vbl6me20uktvj8x94hlyx3u5vqsqtskkrhc8k6nf4q8a9poqhma8uyald32oimaa2a7pu3c9xjvpbt5ygv9jyc2n5zizwg4qnhhfa',
                fileSchema: 'eitvixrm4lv0tfoxqzjjstak6t0751amn6kak4nyeibn16u0x1uoyf5x1lwltpndixp3pef3pu4h7geq0l9c67xkju2ojlzh36tkjb81m4f7zg6zq7v4oq5djwx7vhvrych6p00eu7mlgbgb6bm1agyuficeu48cise736667nai2efc8kl5fpj7o0y82c6e1sstigyxh33dmg7n9ss168cm9f75xbsnqtyauui8o59a2qc256fbn6nadu4vtr5zi25x5xp3qr0elpcq3hpttxcic0tl5dhfbdbg4b8p5i82g0c0xzf6emmy5xhzn64hcepdqacounxt3hfta28v4wkyicls7yt0gpdn82pt7prouef2khnkrulsb3x3npqpr4t437j8cpy0y4zf4clpxz8jffwlvffjl1xs2ynytl29uhju2lh1b3hfhce8qn5uomx7xzxt92tcti2fzb1vcd98hez5xgi4sikd18z6sv21f0tlq95lu90gu7991pm0budl30aw190dya5w506h73isw70xh0n9q3hdzf1loqhg0if98pztrnvwo391yvp84qm0t0jnhs0q7v5eu4g2671o8pbhyvtq1nh7w4rjaiff4hvfit846z9zyrgtys0n23dpyz4y5mzzt28oladiri0jk085lt07329rkr1uy6ahsqjq3elxbo2id7pwr7nktn7l06m62blzmv9f30nzvvoxba2uwm4dep84s689y4yatuyb3tdu703mwahlhf7evpnz937od70xowgmc0yzzinawbw5ebvn5ipuzz65pxlpmo1noxhuhdnfrofbh9q6usksy0hzpzuxahtwpmnqnbjvitydnx5yhgtvsqspoo88p42rfyc4s6oi1vlwc3gy1froyy0b7prq0xrlvbnsxo908fg4qbqk9x4m2jmig267usg63uj6ki6ljl3m32ojpumzg161xdcj6j4ymas8mh3jf9ghlj33u2xa8dddcu2c5se42hoh42x1rfhtr04h',
                proxyHost: 'yjvfuymf6ilqeduflwt8yac4kv1dn2xgv03pdm9w4qig2frbkkdkjedj0flc',
                proxyPort: 2517854454,
                destination: 'zpwqdxc7tj4vgzv2aaoacufzh1w372cwvpear2dnnt3q646qr73dx34m6511fj8nidhuf0vbepabn5587yeg5chz4l8bnv874nc1ip3tcik9vi0m0bo11iqcunjsgso3ijo408a9p3ot3g7rjoknpi0f7zwhyk6a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hmcfk3fuzgd4nmn8l29db9ff5elhah94hpgxrn4egrogs5zz66nc9l20kqyk7pt1zouysme2wsdizlskeoianb38lwfmcv782190rih8nmzynerbcxsmopxqnsta392siioaulrzbgkjp2gh351s608w6sixyb12',
                responsibleUserAccountName: 'wt7s5o06ksk0y0h75vvm',
                lastChangeUserAccount: 'p1iyoi758jb5xwker99o',
                lastChangedAt: '2020-08-30 19:31:14',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'x4csaefpntakdcbzofw2of3lv364jgwhoj3guf9a',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: null,
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'xc2lg4pspxjkzbwo03cv',
                party: '3weubbc1fxzlx39rwcd1fs1p0ujh66xrikg8srjciwamfjnzpi896064ja2p5gmz70qu5vmj3lr23xr0z28452ieom9yl2ze1mqxft1vy157yuv0lerqg683fuqyos1jstvk955q1plnojv4mqmaeu5ghlthozwp',
                component: '9j8cxtkuzl3vdzqubav4qrcs7djempvmzx7utyr9ga9wfyv2v0shpq29mdutkcm2f82e0z3uce4qjvzelq4b48bve8vklmv705ubrbvuua5oom879i7weiuhtk4inolfi59ttosqosdh4f2c1a0mmvil8yooib8q',
                name: 'erkjg5uwjz3souyoif8bmtey7otinr0rdau5x5pm1jnt0ww0092cvwxo4gsidsv7q0nkg56a2404gtpb46n7g0i4zb1v598y3byq24ufcsbm5edd8o71gl0awy8806h4jdwoisvqkfjzqmj5s1u2qkvmly011677',
                flowHash: '0i90ugznp7tdyp4jznnju1t16a8j450runwcld9h',
                flowParty: '3okmit6fzow1z131wezhewox67024jl63nw5409pt8ev3vnyqs4xipww223v1hirb9r476dsw4422mx6n4r99wlf9ter9xf33rvvm20u5i447r3qwnjaztz96pxc827qcap4k8s6ry3n7wkqa8bsnn5sf6drdb83',
                flowComponent: '5ne8upvb4sfnh2esykiavcvrkoy0idh4xatng48168tjddpwmd1dssmihjc499c5oqblvn4f1u44xwdgly9pdxnzwv1p91p1lg5t3cx3gt3q7ome54fksu8pi563dhjgs117ssm3q8voe2jzfrcszm1a90ywxgtk',
                flowInterfaceName: 'vc9l37nrlodioqfe2g8nrcma6rqndk2clihqvwb24txsyrs117mk98d773rhqeofa69bvrpsp9h4mra0j3pahrrillqc4uj7h4j80yx4m17w4xt2coqwriubqu6qw4r3ctfkz1ld8poqea2ktypj9jnfphpdq5wb',
                flowInterfaceNamespace: 'vrk8pg1lmb954zj94j6t0dycdrglu0ykon23kvbvp0nnb3rgqz4wbqqq4euebyyyqbs25nuaer569t8iuxo9sfgz87n3z1rgnn8h9pe4hqek7a3o9121fvqac6u3002mzy8uzc30frpg7gkvz1ytwrcvzdop1faq',
                version: 'tub4oxhuscuu0bvom6od',
                adapterType: 'rzlrxsl8gxghwpa9g4bme48rz7zg8dt69dwnvts2dkqjc5pv5nu40jkzd0gd',
                direction: 'RECEIVER',
                transportProtocol: 'moyy20bh63uh71o2wja8edw8ccb6pmszj0erl2gqhnklqba6laxgwysc2gnu',
                messageProtocol: 'zed6yct35z627ikhhlz2ynpbm7c7hnuhfspuqoxqhb2lmoe5ly5tonsxn6u4',
                adapterEngineName: 'doh6ey9krphq3th8m0zzmr6utu339927fz3gds74vysh1d4fpbm7hn0793hrb6fnxuodmh2op7m9o6a7my9f5d8s139laiysmomrzigdxl6x1hk1cmicx63zy1lk6harl51b40luk4rt7ls4zryi20ofsacebkl5',
                url: 'ihjlyu8ia2to931hqs0ztejfnshbvf60ev4tpauxdvyz5loam3l4tbfpuzecwc3wealxgzbk0n5vj2symz5n2q81236fevhywz5ira7okkgtubnxgryvn7ib3cw49v3wn1ik10dx2j6pjifz8c60cgs770grpti4nydr6mwnafms0nw518kin96bsvg5vx1vx7qe3xy8w0fg98lz0tfqqw1zt4w4jf6y8p9dqcvfmurrpnmhhwk66g5rakfi867hehoe9cfvk67jaakoy4nyefm9v04i81zwm26ylkk18spjh3b2f6mcgsc5xa4aofwk',
                username: 'a959a49bguwnk87deoftrivkjnr42i99pg2w81bj6k61lhi9by1brq7u7gs6',
                remoteHost: '4lfsdlwonp6yt1dygd71e01od2mfk43jqn4ra1v8ngmtzix3djav63byr434r1abq4y5r1yvcxiztx5dmuyyeq5kkq65noan4pi6y7g3mo4nb2brszxomqzvbjw0ev67va2ap93cb0to88fe5i532diovfss0q0y',
                remotePort: 3997529881,
                directory: 'ey6q6msfzwkudhok9dzl0agihrpekao8y27ljssvl8n3m1s3wzjl64swa533a0nkerixcfhsx6xbcx7dd33p6dkmtxqhjra73mfdoectg594bccyqoy7edqfrh0t2xsinshfjs8zxvnfiwnr8hcdmcn7kjrzx9uqi4ohi2tkkpvf5ounm1cl8fcp1yir2863ley5q4wdeetrlvntkob1yzjh0fmfdoz74zpokoit023o56qlc7ccxgr6jfsdhf7zjahs2gwuiv500fcinu10cmfbcld1ltgoclk58g2wcoxghxdzge4z8yygnn4f8ot3avp7wntws71kyujr6nc2q9z8l1c27j2vfhewoacz32fpmbcvw1qbvuwaxavhtyhff758qvk3bars9g6s6syfuih7d74r9ajtebsfudqw2a5e0jrzxgr9td47j1z6s5zb0gzr6j3r1j8qdlsepxefxfzdbfhni8564b3rn6t8ptpeayhz89wgo09svcodaqug8z7uz2t1spqb8x825xuvh6g2u2jp0h5wblhn5t1rovbhlshul1visdv08uoaifz4u83b4dzfz2i73bp345yeh8imc35idia4g3j7t27xh8imcehdgx13ib862fwpl74zuliz4qipmvjvjerr3zq5a42487kkhktaohb9bme4noqrk4o33ulyl1q70lass1shkoo77c15swlqrbo7iwbj2dyenybt47hrkf0rm8nviqb9pqyzv081ewktdqg9dvlc03xmq8oppqdw2sa6pilbp6igsn3t8756lxydsim544mvaw9bhzz82q9e813q1p1d3arcegjp6patwupa428kfgn1e2m6an17dhwrrahhanzjit3nrmlt347uon2tcdpgbqhcxdda4pmbh4amvfyszxq6zvm5m4g7vo5byvmy6dxw4uhsrli37mo79fsj4aqmqqp0tn9ct49e80jg79i7p5rkxnhqjyiz0ky9crzgqu25wdmffc4oic7ee5i689qo',
                fileSchema: 'k55rcqypz81jmzonjwyh7me17opb984de0kuridhb766lmb5a1hyykrcpej5i1aalboa9xrzd7gkjeak2iepf2u8vm3g5n6on1w01geq56bwmvwd5wguzbie4zrpa41b9pbruyi7iph6ad3n71o385zhk064m9mt5y3gj998cvs3xym82ejsm0ug2spsuhs8h570xecmlli71e82gj06swmbkgnguic6iyzzs5rpcvrfa26dz4w5z2sdvzmwe6c2u1npb237uvr1drdsjyounnrebitio5xxnx2i9gyy6sre0pz1dm1aofs332j6pn0i0vgprntgo3wcfkp6hdvul9jt4st8sukjkc9ftftih8trnav7ioora3j6s1htwzc89vr3seh2ymvidizylsxk9zggkiqc6r9n4y8g11mx3t0h80dnqihofg3yctwlk0w92uyh3yvbi0y0m9tvchcgjeh5kyia8d94c7wb5on1c9s2zdn0ysr90rqzju4x2yfitazr6da7e4xzeab7l3kavfjliiz205ae85e8ngc61jvu4yb30jibfaobru46eqk1ikz1ctc6roa4q7k93t72xnrc4v0vuuvnf7r5axw0k7tcp3yipmh4uemhqcgsjngirdruclqwx8vy3chszv0bbx1g0e2twfhya110ztiumw1mb9xxzbtkcwlb0onoi3op3g3g17d8j4a87j01zwreic8bdlrmsj9a3xgr6mgngllu5ih821314g7humfyvb98wg8zarvd9q5kaerzpgdfcozl6sp0o8ug6lgnzyj7qgr0xpwr2axkbeb5lvokes80t58xszcy5yu85x4f50ygtf534v1xwuk00pxlyr7jlpygus1k2ab7tvbhzrkaiyb2i7o9phzalhgm8d92rjefspz8ystzpcy3yn9qgpf3ge5urxxc56pwuh506je6blatymmxeevz4a0n0fn83z71t4nc2lquxqrvj75z5fnc6w6dc7m3wa22h9b0yh9ct4b1',
                proxyHost: 'u90022wktwi17zujgbrk8vo36ico6qe49zvwltpxjz7abel984c7vvxitgxc',
                proxyPort: 2390508323,
                destination: 'l5sccsar4qgu4z3iubtpl5tvavgi0pd6rpte6cbxltc24mmnatzfhnlo87pfqa3ru71sqp132lk9egrn72p0tn9vfn0s41sfgsqpzejh5e652lqe4zy6ezfnlijvz4lese8az8ap0hvnyj19hy1g55undbtqrrqo',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ii8vmzn4p9ya96g4cc4ujrw1eksrylxu5jyt8uk1vqef9kw2enqi9thjk4jadf0fy5w1a6n60z5o470fnsvhf7x8lfs1d0e98q9vjotfa0xafo6mirfv54yqkez04akrjzv5u6rj6xv0se3xnha25v0mw3hcy0m1',
                responsibleUserAccountName: '4mbtraslfed4kbbcl5ha',
                lastChangeUserAccount: '4zrrxynr257jil2wwotv',
                lastChangedAt: '2020-08-31 17:04:24',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'bc5m719zhwvfiy4byugm0uot5j1w66oze7x0ppfe',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'i676r6mc5i45sni01gg0',
                party: 'p2cv69alb57iyleqqmhfrctuusbv80pu4dytoomd2j9jpdg8nljooj95z9bh63e3j4n7cq44x5nbnc8sfo0wsmr135wii7fg3rwkdwmikup10qsq2uu79zaxw9xo5s013uoj8bvrzgnptqlx8hxjjwyz8ovmj23f',
                component: '41rqdtc3iz352lpfoaceycdsgm1d2xou7xjbgtl8zsjm9tgo4dkk03njtc177o74zli7wxutx8wc93ceqdjqdihf5lddoim6t7yvomk9njpkgqigfqf9w9qjhegxp5f2comstpzrr25mhsf2w5i14tt4hmmdt7mq',
                name: 'q5rz8ekycq6baqrrbph9hm5ofl1rakchfbozd65l09q1n16euh8pptcq9s56v5xogxiuq7ly0l8mgos41n291qpciuu4erf2700ibp7qtgyfe6t1ws8n67x9741hzpcykllou5xf4x66nbq7zojc9903rdm13zms',
                flowHash: 'cbd9oiaqnxqv9rl5m31st0myphauxv9yqbq1lts6',
                flowParty: '68i6e2jkczvhxw99wgf3m78e1r25a699cs2xg6h3a43e0vxdbhhpf4rszm27rxbg2uuzc9wufika2eh2yg4roxj059bnb6qu68vratkx2uloqlrjzz4q4o9060qbdwqt1e9d7vw526pui7xubj3c5q7cgpqjmi5b',
                flowComponent: 'd9xx8ojtpolh0s4h6n4orsz3n6ga70ggloff4ia4s37hds8h63j5r5x9810bu4htr7fpa6uiqi5iwbf5hn9hcabo07bwdw79ecvh4sh40mh4edb0cblustvct7nz1afdrw1v4thegx2rjtto408muh05f9eb0t9p',
                flowInterfaceName: 'kgglq41112bs0xgxx49fntwosiosmnt6ohtdnkacflltv3n86zxidrgqel5lu8ovx84yh0vwdi1y91ck2yg96kf5yq8gqt196b6c146pg7lx3hg4qcs1vm74v3n9yx9549obc78lx6ns1kzmp81auwcfg4s021tt',
                flowInterfaceNamespace: 'h97nnd7kwh2ksrntzk3sprmfhvtufc0oybc0wjbo1z5v3fe42irppg7w28uxr7tkvmblvkkif9wb49ig2u9mt7ua1or6mvp6qyo56ehofoc5496rn5xcdgfbymtmnvfa3vsnwaugq9jy706amwjmkmc62fp4wib4',
                version: 'baqdmc3l8yv96tvid6k7',
                adapterType: 'pvs0dgrbe7a295e17rdjk1721fk0gv4cwkg3ni18o4omr0nqboe3jievckt1',
                direction: 'SENDER',
                transportProtocol: 'ekltmsmpmha5a86ysht0eood81n9q541nzr8cxpy7vhxcmkf7s1sua25d6je',
                messageProtocol: 'a56uqy4tfbzrggbb7otcmy138i43v8ntipgjn3i67rehq1ihqrpuaujdlixr',
                adapterEngineName: 'tq5fvy0gdv7e286p1fss5dr6b3ce80618g2i4veufhp9jmseq0irvtqpr3rr6ycir3xre5ri1zadpex2cps0ohwh8et1jtccn42hzpsinxbc7ndfi5hator9gs8e6tgfgss9ivrndp6rkiyufqv32lcfi3esu3no',
                url: 'fvgzrj66iy2y5vs9vi7yeebggp5fjv25okztox6uqm8fb719fkd6phouiz9h76ssihs3gfto11p1x979ufuymvggxcdc12qzz1njps968jyggz25fcvaodz80bokq291gjo9b3cyfjedmd0ev22r57rxf8gd2a0c9rdhzf49668m7hwes6vwjycq2dq2cx79pe3tbu5wn5le0yjqawt5a59s9wj67an3pd29nlemvwkas98a2nxvydg02o92ytyzpc4fy1g0m5etwhx844hxposkwlnm2w3hl7kszkh08zls62i6gus7hfriyk3e8iie',
                username: 'gj4dxyqc2fcx6guhwwm2zwkr9xxloi2em70qssy6vmmvz14tiscete2v1rnj',
                remoteHost: '60ywf8ldtqotec5jivuye1bbalaypty18bon1havdg3afswx6l5heabwd95czc3c7mdv2ke0rfd0hreop9jep7rxtr6ny5yof7ss7zktm5b5l59f4fj6gftqb5w4omztrsz5wipq5favcvx1wbizbnsmk2kuebrf',
                remotePort: 2161362988,
                directory: '5xl7bqob1k3xoan83z8n9k6l7pu74jeuwwcg59wtudv8am6r5dzm8dwpwe52woq1d3m80vpiec6s025c6i6ybfx1eqpt0odavvaor9bpithwycpxt45udkf5le4m1k5s6jutlrahsjq38nflwiraikvtuzkkt2lwbam8retwxj7wx29noxic083zi8bk92cilhmy7k1tnyfy3jz29kbulyt6gercu1i4lkdnjzsunc63d89pl7lemepuxgpw64yz3cbu1ufvcynkid7gk08xj70cctg2vwrr1nw9qux880brl132el0jdosizbjo0rkpe4mpetpnpjskc7jwe2hnyez88wt6jhxwq8vy4unaotxwt9el8bt3nkq3nr2bo3eco03lwz54xby4z5ekm0q8wioral3h9if340ii7ywwxx477gn9o4axiqd8ktvf63ramwtzyc7z9bcf5nt20eydwfbjaytgmuc3cgmlwgbrjae0kn1alf6eqzkst4ej9xmggw412hydiuk48aoiroej3grwktjxm2jwrgxxy2kpwijnqqbrnesp5a3gh43zumgyyygav38gbyl4nbn358ncbgo7595012t20nkxk208h7gmau4tulr0xnoyjfj55zz8nv6870qb842sxyq6bubx7y8u5puv54bh2ygs4rzbh3d3i65g9180j0kuaa35jxwc7po8dlqp6tpxahg2h8g33dnabmck5y5s734vnjhc3wvdc2qu14caeozk0g4gagtl570a67pxmvtw4mtdm19f6m450x9wd8vhboryv7mronzpa9sojjjwkgyn6am0el7cc3a4vhzr2aby5blvawq19sm028sqd9al51ujz7pi47untrf28yjv0rrxr6l8wi9sar2v8s6nkqwhn834rgsq4xirxm5zhkp9lwrihuuf7vyxza59gpul3hls0iwftgyb7m7ly2v1kcg2ucq75i3buljxnpxkte3qfshrn1ybkhh9vhz8xejaapbu8cezk46c',
                fileSchema: 'dcfq29jy6i5t92l7xu58uyvij1e83mk04hupfgwdhs629w1ak878uyw5sg9fyflek41p4elmjlhebz2lj2i1g963ezxj0y58zypo0lcthjp5r704kdtholv2rzazqud0dqa1i4q0wols8hworegranvs4vcx4kvwq5l85bnhq1jmj2sevi0sbqe95nfddapoq39045dbrxp02fws7roqp01p80yy6h79dgi6kap4xe3s9jvtxvwh9rvaz5h9xfuhtri0hb3psmnimyaeyeeefjrfr1io2r1etpmfkghkmznadh6189almt3zzuzllj9x8xafpl5rl59378jnwr5y0r031zgmne0e46soz3pfful8jmfrwy1for2leef702nfrcitew3ads3xxl1vgtg56th0oo588em87bq27nrzvav1v0n38whwwbq1u2mm4vvvxgbqsvdib37tg6yyymwz555h4l3nwwbds2tolknhr4nhjdr9x8mhoba9bzioewkow0r08y4pk78o3bsoas44cfa14etg5orggenhx6i8ykqgqs0w9qhxjgqi4gnlb9v4du4k88p3pe9vhghh52rnuvgckfx55wejkso16b7on7c19658798d07jpe08lb2vnwyx5pwfazoabowospo2xtgsrsxfokplojhler09ucm5jlwu82ph9iejqu17c11xd40mpffg42qxjkmapbjwayk5rrsvttz68f903fwh3uuz0cd8wjnewctms4bpbay1dly61gj897hipkuw2eh85uaq9wydykhe7muvp76n3ustff8lm6ggrropb4qm0m4exphya3fruszolzx7fajjeheajmslg6r8fmhetq1sasm0xj6gri55uvmxvea7oknzkqdf7if6hdstu9pmvkdlwgk5aojqyg4zywr33tysmmq1ouuab5m94htlh1okv3yo38vvisqpbfdq24o1ubvtnbu79rmwn86b9hm4kb52mpjsj74517oa77l6luj6tsn8o',
                proxyHost: '2k2bk2l4ku5o2sgysdaghxxkuod575fnq5j0ssyj2adeb7y3hywt24otkso2',
                proxyPort: 4634695560,
                destination: 'zkpfor2mw8i8sw3zy4igvnzfk3kapc6qqrqgkba7svu7qgsn2p853x5v4mp51t2qkjf5i9hfhpqlnmp1yjki3vycjpnlpg8xopmdw2gbvu2v4tzn03t454pfilrnxfnquud59jqccgwbsg1dnx9y0jgke3m6bypv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bpveai9vskx6wgygm2gtzsuue4mk9ztad3uf3n1tqh6awd2jh1q0is0hmcm9lzv64kovyci6th73nkac939ddngbbyi0cam6brnhhkd9u87pz2gcxmk3z25xog0drj81ycui533kiepzs20b2y7yov619hfk0qwd',
                responsibleUserAccountName: 'z2pohkt0nhreju9d6ep3',
                lastChangeUserAccount: 'qsknblxg1h2rbw0xin9y',
                lastChangedAt: '2020-08-30 17:54:22',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'vp2bx9zesagbnpc3yn0t1o3eg2obsyjienw909vm',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'o7jd7adyxkdu1l8kdmflbgf1nfnykcr4389j4fli6w8j16rzx6',
                systemId: null,
                systemName: 'qb032sj2nytdddvr867e',
                party: 'o6k113vzrnndcbx8fk2nc8pzd7qhe5z1flm8g4llflce1o1fb3wo5z5fznut9or5hdfcfoo0x039jo3w8u0jd5b5don0yniijik7i84e3iqyc7x92ujvcyzi20d7qti432pjp7szeufian5tz8bb95jia0kg5iw4',
                component: 'cwbvtxcc87s1t3q8loumleuc7qtk1zo1awvsi4jrogt4iqry77d4ey22vbecd2tl2j3asbknlq0u6ag3ukgk63agbnvc0ndenyv4yucgrpr2mnsrpen4dtpefk3phiwkqoivmd0nwmez461mpdets5syfym1tegw',
                name: '5vixq88ggr27crxwazy9qin551e5drmqz450kud0cjze1z038st8wp4i6fqxy6m3j7xqka2ukr6qs23qe3bg5r0acvyhkh0ulpj76vqt736rnca724p89hjpdq7h7ti8z9plqoee8tyrho6r8z4uq4lcmcy83y8r',
                flowHash: '92ndt0eysy52b6le6d6ze1rlzralpe0oltepl278',
                flowParty: '23vdw0izojaqn2gwtgvoszznte5w3gfw1hf3bad04e5zc27pnbw7xun0bmf6t9bdjb5m2znsm6jd99q5hvxfjstiyq52ush483qj5u6bl30h3zk5ot7d6oho34oaptda4q8yxqqeffbgtkebgcghx2idas0dv071',
                flowComponent: 'gws68ihu35m22o4sv03on1exh0qiqo642pxo02ada035b7cfpr3w51vy0s3ccpr8j1x7qdp70s5gl0yxl2dnitzc2f2msvtutzci04fae21quu3ue1h0rn7fvrlfdmbwmh0b7d3r93qjl5fy3nxdhomsy1u85nup',
                flowInterfaceName: '3987jee3g2ciybsqeanekc6sl35n46pbqz0be2he6feahnfuoeo4z0qe0r77v36e02wp0pe0csxl1rpfg01rojaxm1njmo46aridvoaiurvqjo251j6kb8ry0wsgxd2d0xxtn9lgpeizzwz0800vkpgk9nb04kp6',
                flowInterfaceNamespace: 'kmde064cagj9nv88bruhhc0xsygwgim9j4qrsra7ebhvo4u5wec91lfq38xwwjc1a7angdal19y43d290aec1ojjlhx3m2mp1fjz5b8brd5bz524gmeim96igcwdxhtfxjinquecjdlizmshmv7x3nq6ps1qzg7s',
                version: 'r5dqcjos6ohbq2fmbpsp',
                adapterType: '2rcxn810av4zz4pwxhi6qhs5f9kwk17ovswr5tccj92e8xzhvu101jhoxw2z',
                direction: 'RECEIVER',
                transportProtocol: 'qoxzhbn9ju3b5itowqiqqhcrc60ph8slxjeryhs55tqieyk2oca0yuksiaov',
                messageProtocol: 'lqs4spnwiginvmva4jry4lt9nljdf2tbj7g4zdh1bdzun0lwpnlphkbigan8',
                adapterEngineName: 'znmyyxdzz0mctmslwdlxmbfwcc2krnzpuosj9hkmoeab2drhrtp8bzyuz0hy7g1a5wcrrod28hy6301053fhnie56n1ign6x31oqzay4fdgpwecg8y8eco1ha8i5zrrkvbxlzz7kn8yfky36jkwrdjyun4utuxqj',
                url: '6fnvssa131bj351m0uns0c6u8pv88p72z5p05zoij4ft3ucjay4ozim9fjwmj10xf0kr6oc7ucxqj1i8fane239v16ltb9xpx9ir1bieovj1ppe87o9e0t1dq4uwxm2f58g0gv5zahp0elv2xwy472w18hrkckzkrgudwpu6aegxxm4pi01hlb5wrlsw6api0kpcquvxppn3w14h7i9pxmz4nrmxmfyabtww5xqy92q85tukbpayqbbw2qio5w96mrvg1m7ug4zjccajzuml2r1mt0od920fe8syr16wc74di7z5ha5wp137qccgz950',
                username: 'wv2aehfsz0idi7zcr66tde7zjech1wars2vypkdxon4iq5ilvvb5y71aahm9',
                remoteHost: 'ygd2a9nj2xxjzve13ppn1yrcwxid21s9x4zs8nl4q83lootyf6s6n5w0xcns3f5zmgu9nft2tsgumuz2yg1xr6loql6hrsluqcrwqgjyc0tygn23oyu3tavv5zm8iq4jm2dyz0amjwd6cpshyn0dvxnoxz3elvlg',
                remotePort: 7431008163,
                directory: 'k0lb6eqdndeuexaoegywv767eue4404d50j4j9gl16wyg3yui05fxmfm3fur228f6vnrhanzu9q07ia083jk0v3io2fkejqbp8mv9owqojkimd3m6naho5te78vs16q4515xgzkwuo9x28nf451eds8fg1izedzhin3z9yf7skpyuuuav39uoyn2sd30ldfkjx9o7xaq84sktcjphovzkznjpfaxpuxbeozce776hxglc9y7futpo62gc4u7er0zhwzgu58vukqybb55osi24oiswtptgw2t5a7jcga6wjiv3e94z306i1qwpb6wqu4n00w988yf7z2zrctdsfe429c3wf7dugadt6t9wzhqk4y3vygxe8e6w9n9mnb2tqjx1o54iiduojdy9niutwpgeyxlxht3qpk4sx2lk4md2jigtzje9ydvahiu4s0byfrvh0i4cp5exdwsmrxey8jmpnjbkjesvthp3jwvfisrbmlj92br1p16il4th03shkbgmd3pjoocmz12m5idis6xv8nrehg8qope4gbts0j32v8th6jtwexomz7kxgw3vuro44ornby0c7y8xxbjy3kd5dv0hgrib5a4w5haqwfbkhz3clo5eo6m58shrdzdntr379jm7frhmumto8xc2afk5xmbsgvevrmb2vpy58zbb6gb34his2cryc1zi2snw47wvbnhvept6m4ftf26z6wnkmr0r8mkfdqz4heoihxodybkxo276gouppsaw523j3e0lchtt4a3bsthofnoqd40hgph01d5pt0sej8puos9zhzyu1t3o11zhztofxz2cn5a09qph9b8upxbrd0fg066k52lne9qd7rxg1qxvq82kyzequzj8zbxagqwn45skl90vz5w4nld9bt49cysfqt7tlim5l29hx7enx8yn04vi05yxs4fz1icjpihl1rozd0mpvrw6fm1rxfqysiyt6s5o5oxy8bvsj540b7zyok4t6f1eqxyxlqlhng1a94nwcif',
                fileSchema: 'qevswaneyr2porsn91z5v0ysi5xb88ks1t2rvll8ccqyxd3tz50u66w6e0l1jgio82v8qdb306ogr5o8gn1m4gldc4wgyshp6z479qep82kn1xwng3gb6nw7qpefrrtgbqmf6q9xj1cazgx7vemen7fas447jtg30n6ii9fn4mwnus404bqrpzek9f8gcnlbb197lykxcuyxogeg1o9d6exi81a8r2lwga09f1gaiuxilc6p9g0e7h9ut454uuuds91fl52hyw45c77anocz0tr2kgs9q64w65gb4t3cencjjcgh9hi1dxq2nf7ghkhokpye53h4xdc16sfyv7fuksmp7j6neq8133z4uqnxo4z264od5tus9lmz2n5a2jttzhi9f5e3fhhhtyxlni63u7ed5ai336uf2ta5v08ja7ka8nr4lro6oohiuy1wyfcsxihiyfqmgy0vltxwwya1sny52lo9qsu8ta4006owhnxlcbsul8qyeu0slz4v1pluvoscn28v28bqvx1pc81jfvzjai5dw5jkktyhwzs2s3r9io2b7j3c4ss9jc5b8rs87m8qt3l5wyt4twzsmlthyk98ekxwn1foom0qc885q25h19b89sjuwiuxaz8u2igan0qnlystghmwqt1ybqnlk0wdqnchqkxmm8i4mgy3lyq4mtdkrgrb3l22mvuiyn3amae8f0vkgtbm6t7zkmruvqz4jk2l9rb9wy476a7w4s3tmx8fwjua6o3jvbfktfk6nip1azhr0zroh2roqswdaueiunku75gus4v20qikjdtxzv7wp7yzj6wb8tyb8pc9ukmlnuetmwvhvigqptzxjrukosq0qhzjzpt39hz1mz17lwwqhdnnespy0zdlkwd5z6nzsnlz98ns6yz0fuqjwjv24i9a3bfhsi19gs4un9jdjb2330ri11zkjf4z1b24lphdg551x31mejcp2rix9xqunp4rrr8u83xeokpvwr003zcrmi5mekf7jibrm1u1',
                proxyHost: 'qffh31cyumha28u8s7a8zekbobapnnibixh8tov5516h2glpjwlzdj4f46tg',
                proxyPort: 3910040871,
                destination: '5ve7ohwaxthkov3a4gikv53pj4f5xjeq4jstsg8gf1ve61txvqimijx6esynks0bvk4jitf4l1s75blmpavzns2w383hmw0rzjkd2z7zn4j1dp89c7odcstltvxwfwl6x7c0jxfhp29ny2dmpy66noj186vqn47n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cqqfvilzogjculf5hng3vxu3d12dmkkeevjqz6qhpy361nrrjygvym3wwlm0zwjs312gtlmaszey37cdp63h81zesqgk7ccsg7zxj4et28k0chdnz40gjh4okf4a2s8vniukv8o1qmy0ttxg6qtwzb3fiyajam2f',
                responsibleUserAccountName: 'xxrbuqiuunkv3hzj4g1b',
                lastChangeUserAccount: 'hz5fpiij8mvt7e7zk0vn',
                lastChangedAt: '2020-08-31 15:48:06',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'cjts12vz5sbpr8hs1xp0nli5lyxvfigsr134bpdd',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'yk2x0e3rpxtogub1x6ukb66ueleh3khb0413y1fg7uzwrw1ube',
                
                systemName: '2rs3zved48p0ypgj1ita',
                party: 'tx9yjzp78mhwlwki9upo2kjdw1tsjg3k4mpi8e3np8aea4red1oxeyaw9asakvltdt5g2v8wddy3pnqc27xls6e4pb5nl1ixhsw6yuiwn8ogpgs3qd1vb7tsjq4tnu9qkkyr096dhec8pd32hvwgvls8w7ry23n6',
                component: 'evuytvbg1yb95b8kv3abn8przzurtcor8ahblgsm10aplda4mm4u54ecsozvb7ywdxhetl7idn7g6wqhl0it653j7yg6s8s8gr0uiwqrazrzwfm79bxefa3zg1ivj1zyfo0g3ftj09i3aeh79lobb3lhtn76ccy6',
                name: '4wa29xf1rueoyvtvbfpywh2ojwr70guznvsqruae5kcpx0b59g4s4xjv2uloh5rv3xep5inecjwtib75evff3fiav6gk9hj5aymtdo9vstnpa5z9d693inmofgolq30ygp175or9q7lo5n22lbs45795enn7tsxr',
                flowHash: '7ctafrd9lebtcjqg7d6nb1fq8kg2fb2oc5upnvp6',
                flowParty: '594w9unrn3zlvkut28fixs2tm92qw0rdm2kvdw5s4zpbpf0rwxblf0uiu8r2tigwrhrp0z8bylvrykhi6bpv171r2o920ukcaoec3pl2jryaqzlzmgzvk0bqa5te7ru8pk6yvcy9vwtebbtqnj5ycere42ocnyn4',
                flowComponent: 'ikx3s9gni60eqn8wpw92kbwkwbj69we10fgjgpaezpw828a9xqvuh0x4ojvy6mol71imk01f3rffnsga1jdawp5d969i0a1uclsnpg3zy93qwzho1hxqzqwcwpcegyxinc9wznqzhatdgf5rrwlk7kwzr66agxdt',
                flowInterfaceName: 'zfuw301d07gv8rqcop8sounuu8fox4zprxu9fuc2ie32hr2n4ls61gwex4lpemy7en860ftki53jyp0hpseqqhut6o0usmrvk6vud5i6qyk137recv4r2g3zcxhgak9p1vsbyabuh9idz1zr181670sgg3rppb11',
                flowInterfaceNamespace: 'm1m4xd1005nyznmj5ogv52hzfyhtz8zbbdbgn9hfm6ygtdp5aayvn985g14u2rijtreius9xc8choz0uriyzyrql6033tcc9hc0pqdcv7ibp3x7nif4jomx5rmnrm5e1p7drcv3owxbe0x7c04k8gsyl8dbfltsy',
                version: 'qvyqdsydd4yl1juidf9j',
                adapterType: 'm9g4zlk17sdpy1drm4o2ygtp77xlz4ki0sdntzlz4yufvn1nj1plo7fbp1z1',
                direction: 'SENDER',
                transportProtocol: 'phdau5213hblkmepnohwy3opbn7u817cjouk1h5nw7adzxvxyn4kz80ux8u0',
                messageProtocol: '2rs15i0ox4etz2n4tnvuvike3itj35wdfz25fi2rf2xlr4apaejqitqdnqtf',
                adapterEngineName: 'ge472og31fcbt5ayieyzhmhstesk1cuwgv619ojqm1u9tcbz4ye4839q1guomfh3b3caf8r6lzjtp7rv0fis2lzwaezae2wtymyioipuzbrxbfgum2016ds4ijt8021ba8hps7e6famlwlpiu6dvhuzp22tvs6vt',
                url: 'aiqd59aylr9c2lro7uay6o7j48fxt12zb6wi8jga25yc2uxbvx90ew0b5f1d0e1a0241zfdggdrk7nvhg0428ncmo532ouyo8ftg88240wwd4ud8wl4ts68r968pvb57dsvkxs6xbj0oqkjmrfs95k5e0yu8l8d5ekk84g9fw970gxjw4x1owdpzhyvcicqud3n3pm9co28apekruoxjk98luca1ui0edlrvyi5yfhsx84ro581om8ja7x3poj6ypr64zsj2wfix0ggwlgy4wabdnjzp61qw1q0wcffd8v9clrqv2obef7m6h1ismrkn',
                username: '0h8wongodmmqr5pve741v7k504l4v49e725onagyabcfssklfmn909mqgj5s',
                remoteHost: '9hb2kduq4xskfhpp7hczvg4ffdkojv88dy6yr5kaa3tpphhd1428ucfosvxj0d60766u4pkyp9b1u28z4p05r0focvz19apzjkg1w7gz22o139bqg2z0bi2wt4t2uftjjl6xtgv4etxy7zjkj7g64znwmauqdwpf',
                remotePort: 9462184861,
                directory: '8o25tpdebokho4bcf41i75hfs66fdis4s9heb09hxmmfcvasixqevj6h6bhdvipl6z7luqk6gixvrgxvcjaeiy7zxvqhxzrblwamceoimymfqqasaheli9fcfujuypjpe4qrtaeey8l1m50wkykm8ul3aqwljmty3msc1mifxm1144shp05p6rvsw96cttl8yh8eaa0g2c8d9bvxkhpoz3dv9vrn85vi8pimo2vc2rlu5fbv3rk7ete4pbhc1q73lcnidka7rx2bicrzbmxcchurob598b5oxbqiljofypllattriklo318pe5487743zlfn43sj42tcnh8zumcbujzrt7f5xm2prx7avbfee2b7digbkj8h52nksurofpjwiyveaaky5ncvmtbxdw6iophlh13lb9sgshx5hdkd28if4e4s1ootz6c3lhch9oj23hsgvnizv20twxxqp87pb5ernw1fuvg24my9f0mx8ruc902ogf95dfuz0o1qroxyc4m0u9cw160v1kr9ehm51t7rn1gn6wdjmhpzs46d8w8hlv6hh6kg7yqotclgy2gkyr0ff9gjxqersd6c8ox13ovj4x4jux4g52azwqw3w9evky3u8qjky7stfo4yc226sf3u67gr8vlnsyg8e29tq2yfnnpjlvurwds8e661t9je1zfi7bgvs0dpwuhg6aqx9uff6vustgnoanp2nev2zturatgg83cy3xej0jaxc70n0jcvcohh6hrzz19v224nlyqq55hesktona2e6gqcofca1tks7krdvtw5elqnv3tigy6a0w6ibw8x3g24fys06pxd0lpn9ievfj0s4qg2qxdb86kvq7c434k7ucoisgvguo2l066bukll9h3o4zptx7aecwxmkmgsx9g2wkz93lcxvaoyd8ai86weygnflltm7ju1drbs6ypun4lt3ibj71mtfr7bdqj4pz4dtkof52qu5byux4rp4ua3xim77yplphw42f5zknracjhizqhu',
                fileSchema: '7d1wdb0m6q7gbz5vxowr5y9hhtfg3dfck12wag8oquy0uumbd2lcj7i3v3aqof8nrvh0ed0gbxkkhc0zlvvoyioxbxbk0auz2evwgfh0kioc5wmay42y2ciiinbumhg6t92nxj53ir2ip9b3ar9dte4y1lqiwz2t483wgem2m1hmb5tzpxrhpq6b9mebvio3vnwcl929orr1fns8x1tvhx0ds3ehxav7d80q7uzgyh43ub7kwtkel7ym9tce6f1xgecz4y5t2ieam1mmp4x2bi16x9t2u6xt49hnanytoxpj3v1vurub66fyuxew0z07x7v0bdpdboie9hap7vvmuao0alx6o3zqm0iknvze182izzqetgg7cruirgijra7ld15ihbth5pce5lyx2cuv6w8nmux6gewwnhxazrn27lpnqrtt7i1j7lvdqg9qh4r90701oaelu08cu0digwtxv839t6yh0hzrql23aoq7qmk4hzn6p2va97k8mzv7ucoszfc7nmfxyvm5jzh2k4p24oakdaxnf2ad70ftqfix3y23pu8llnaim5ey1ejgtmreh2oo1dyej1f4lg9tziwfi5evs938s6d5ycchyxs7by52pwqqfmrb9jys7dy2uaha84p4rjyqvg19z6nmehyhfcokps7m8i8ijsg0qk1zch1h1khqmpxq5ayoenl8ml2sv0jluc98gzgm80b0dvgheuk2y4dm5lon17gju9bq4eqqjxrqds9pt6z2nw8knxgrdqs12v1f6htnlwj1022yud5gedpz4ws4m0rs62c1a1e27h72kll7pe3go2w2jsl6x896bfdzvfkl8dselxcdnv3tn94xf6ptaylubldhceay58807wizuqti95rhncbptn3cto7lsvenpbqsc11e1qccads1es3i48092tr4us6dq73fdzzm4y9qqgurl0jmxddm6cvgv41z97dc83wrksyg13medlvkpdrmxi6b5std28sqio9gmvo82k9k774y',
                proxyHost: '7c7krrkhssu7julp4g92kw9387505uyyzkapemv6l4tsin9lpc23hdh1b1y7',
                proxyPort: 2851340913,
                destination: 'wtd3h77bzg5wet68lo82pxxbp92mwlz35yvgys2yolhc8zseq8jtckur27hq91l7z0vc2e91nhzy77n1xmoale22h5xt8hty5ooxllag8r0lvva61uhvfp4fb41ebb5sa4kt53ck60ap050qbv78kbbjm2ms1en7',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'zp5pvbeeerosmam84daozrufqk18ffxz51kumf5znf2c1blgwoxks8tsz7nialtxb04yxb7z09kshb5h82tem0uvcllrrf1oou5l3nsm8s4r6s0xv5im0a3p0nryaw82e999plnjz1z1edpf4d2hft0cqevtgvx2',
                responsibleUserAccountName: 'bsjjilausiur9u939975',
                lastChangeUserAccount: 'jgwzmg7w59udeo6oy4lu',
                lastChangedAt: '2020-08-31 14:36:54',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '2t5jgurxr4nh65avj8t9ln77e7al46ci9imfcibd',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'yngu80oh02vkt0cz1pnz184urx2jhlks5lmexjg093mgsodevd',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: null,
                party: 'jrzy05rqe925ughnehm1048nscyih60uiu4yy6uv4a4g13vaqd6j9a86u8w1ixugr2hx8upy8lv3kc3holz7v45r5k1f67k4oflwntw1iuh1xvfpqg581nge80imsaq1l63n2f0n27f0a74wi1uuunn9zx9gvx5b',
                component: 'am0f3m4ti9r1lwdctkqkwou09z8gjpvzczg6n2e9ufwnf6w4vijm73i9t19z0s5bkqg4xjf143qwppywdz8lr694877gribhojg310t6foua2oxe4bcnk5d1exhiocq3psfbjffhsqnl4clkamfq1lc3b1kvosv8',
                name: 'hcy3nvuo3bqjcklwi1j8wlplrub3aqms1vsp8ns6oa042y8kfdcdwj2uzchajlue15yg8ttfmpicddb8gvsccme7w7mqhawgzmioasewepiis74id53azplq5zmh5wiuuqlhr6gciqtdyfohwmsq4gqggqtyjp1g',
                flowHash: '5hcvs35jmqd11zmvrgfav3mgwstfu7obt2rqhlbh',
                flowParty: 'l89r7eidvy338yq2vakvc8gbp4f1fn0ahj408buwmjwe9bn8vm6d7asyppw7egsedl58r97epy6rvc1yy72lond7o88c5fvjvxezr102cssd67reabrdxu9tdtbpktrp02coj2mc0zyauvwb4yeb04o6tmde5g57',
                flowComponent: 'fznq3qkb4m717329kts3k69ejcpkin17x4girow002pgy603dfc4dyqinihbwsdbm23olmmybol932n4w8cwov1v4mo0rrrs4holu6p6107ydvsn4zj0rvhd0v31duwomklt0wkztl1j4e5oyplzr309azc5kerm',
                flowInterfaceName: '2qgti7zjkdwmwy1ij5g1rsfseicn4fzh4rscqn9e773v78hn9lgkgwq2qsvirftrrosbs6aggp6vrv64bgz7e2x3xxcr8bmxbdfd8mchl8dev1fb5y7q87aop4lzme0j2ag9afbulgtdxroj0i2v9245qt1vhy02',
                flowInterfaceNamespace: 'y6bs6gogu678fypngtjav014iga00hjr99i0rayvi9rwin5uu7yol5dbfxuo1y0zjpqtjk9wv4zr3rljb4suvd0dzuyhkw0szy5yrkdhk5ae30qhclb678usdl6mvrk9r5yrebwefcnw3wqtfu2iy6qfep2gom6w',
                version: '62mqxjj4hl6ljq2e94gk',
                adapterType: '36tlewmx4j1nt7mg3yqtghv99ntti4bibqbkd54utosus9r1ysg23p2fvds6',
                direction: 'RECEIVER',
                transportProtocol: 't36xw5rl9rqe150c5a1gqxfyic5i4y1a6ir5jk8k0vn92vd47pe7k8hkj39f',
                messageProtocol: 'qrzh6kjal8q1vx4np08tuadb4p7fp35iw5zef2miwjke23dr5y9xkrnywudw',
                adapterEngineName: '47jveby3aehpaaxsha8p2x5g4gmr9o1slzg5462x8u1rhdjq790ygvwbzndswthghj922klo8jxk1fiibexk3jck34qi6z6963d76l35obe3qyu8zctwl9z3og0l9ag9684lxd26ifq7ufcobz2jnrxqvmxovew8',
                url: '6arytyzqn4tgx8pwhvvq1ktdhp5xx5e3mqysvtjcyi9oohzc83bdmfaq04nrdfx9jtu361m2wrlx5qj7ucn4ohf4l666m4ar0oa56rl95r52fjmdbzpc1ihulpifbqfu64kisaz322tw1bhf6g12q88zzwucf15k6ta0xna46m5fg7tv44j5wd08jfcqk5cwncvq304mwbhnloayz2i47mt18uc0ar6e2pf3lwvsrq4x7kv7zanu0fiymegzlyj8n3z3bs4b9j05znlmlnckh03t9bt9ot08uj75kitog2n9ypnyo7ehowdxue5nn9tc',
                username: 'tomnchwup56mva2mbujae23joo69949k9h62hnrfteml7wsyuda4n7ri944h',
                remoteHost: 'xgom08wmxxfn5lw6jeeyd5g033x5lth36hig180nyohpp0h1zm7ymma97bwsvi2yel70g4afaddfpqe2ajzfn6jh3dhybpct6x5xn1byeuagdv5hkg589ldouu3gwyipqhq9b6ncua4tw2beccxbe0oqgjt8di0g',
                remotePort: 7810735751,
                directory: 'eeh9lhicfnkmck5vfuwr7i2iwdojxsy2zem7ourfxmlgs0b6rz2ejeqwx2hqui6qm4glp0asm6pkajuh8lyu1o0qcqcx4fu3uzrs1wu98r4tqx5kmz56dugqkx2vb86njzjob6auwpm13frxft0jghl6c3f3awdz5gzd14fawrkta7f2zyjpz6j0uttyulasuuwmugol68dnx91ydft3v67x8gk0bxh19h2i99ye0thx4jz535mwszb4mw1d48z3dwnqzk0jf4c63tfld23nhrcgu40p36i2tbnpc303wcm5ilbdhbzn12welfqy17507qwyakqshy31xpsyks7k7mdg4yjjpwbbp97o6on9aa355ffwbsztrfox5miuf42u19gsjxqpo9m9ydhjrt9f3brjqmdl1nae2sdw2vwbojpzhu8o33ita3y6sftw311z102qdnwc8hadbxdeztntxlah4rzm7rr7reqmgeo7uk2y91nmy2g663og7umlc4p6rlmxacci8wkg61q1dn9dc5pntu8nu0ak29yb805s3lokpzsolmrkg4j4g5sruhxnu09stx0ec7xkg13gmpkjltedfpgtu5o0w8rlcp2x35zgz8mzzzxynvi4svsscst15xljiz9dzuejtj3nj4ykx0ip3texrvgl5l2n1eqqoowbjnle8dg5927lpn214tdz4l6p6ofa1igsomqxei8mvs2ronjpmzjyx8iuqupa9bnasmk4axn99ggczw316y2v7lyvfxj5h27hpzxoug8y4o5tc8b1w68llotbaiqgzma6qghxhbsvxuuw28s8wm9al3qxfuu5zu7mpmrgn0ypw4au9rokbtlxjqdzm6opf9jfzazx8k7j33zrl3xm2o0k15j9d8z8u5vcneghessrp4edyjs3tgu5wrlqg3a5uif6ksv2e87bk0yxeur616nvy81qlsfy9vn9uvubvjytzqob7xybfvy6if19053dy15iapju7blvy9umqwskcjng',
                fileSchema: 'cj9hi5s111ip4nnozvr4mhv6pivcwyi1qoc0z895ma96ujj60v604tm3x7g780amm5lz35k7wisiuojnkbppnl23401iwxw8aj741auwwzu958r2manfeiq18tjz9zvjkfpiwqz6qz43b4zd2hgw23tv2da63dgth5nltng1xlo17iwmk4ofogzyqsshhjhnb797ehe5n6s4ffv5yov0fs00pqstrcchc18h4tylomzdvx370hwaythv54jbr6mp5uyy89aylzgi2ikd4q5rh7z58sim86wz07jxvd4y67c3zvo9f6mgjgjj0ov5r90p297izrpyjjjxh1w46wdwv06vvsiazga5b9fuzwch4ygaq5d5jf8a64dgwa6cn62q5hlyzm551hhj6z4yh18t14q2596jih3kbzlmda0317ul4rb090eeg9he7934dk717rjye0h6nof675yljxuzs0oeunnwa8am4bq75zhu1di0nc8n1leos7nsina579mu6kkxo0rfkrvt3sqbfszx0ndpt7mviap5huimmj161ddoxloziwlyocf6u3betbgqqe2nzq3n8nnsc4osc2djmptwp0sqx24jx879fpjuxcnwms5hnh3nv8yqpxzd72q5j5upilaz836cflc3xovrjc676osnxwuugv6r4o3ax3jb1w89unq3ut48ooovowfdtndefdk1ahg0rm6aifx2ejrngvhu7v7qei1htiowrtjyhamz0iawlazi41rc8jppv5bfmo397km15ipwytws5v9bqmuo9o4r1ofnpbdbb0vo9nrjvaov94mqc4zj3aunyv80aqjepcg27xr7wmxhb1mpzb5t7mk8n63kp05jh45szlm6h8kwwijmj9nqd53490nvih6bmtx2vsvca98hd1dilfe2xldnhu6vxfy0yhm57sadikg1ed3fgyw5ko36ym8o2w030o837stxux6v99u7jrca9bfhfjjg4vpmdx7szu3i85giivb6qgwz3151',
                proxyHost: 'x2dof2hlhwpisq1ah4jz0435jqh1cjn4ioeb6wsyc5ix5yg9gk03r1ndf1kn',
                proxyPort: 3649053020,
                destination: 'alad3jfctzy0tc9spjr231eohl1uriolnerqe5ryw5ni29x9ryyt1xrtvgy5vhi89819sif0tzobu2tnfky242hz1hvsrnxen0981nqqt7wo1amo9xu1nk9evw84x9ajjuhmlt2203d0s97jdtnx540f8o1k9zke',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dqmxhasq1ngo2sxnxhcu92d0xqcv9m3wpmn0168i5d51alxtjs3v36122ic9bfffdxe94y4c4szl4eunmgvk989h9whgtwjjka3si0u91jrsb6oqkw4rves6kyoprxiweop05garadt5m6823s5abr23yk1e1c01',
                responsibleUserAccountName: 'jfu8sgyw32vvlmo9cddm',
                lastChangeUserAccount: 'p552iep769akv02xkmxg',
                lastChangedAt: '2020-08-31 13:10:14',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'cbfp8zlxh0jbdf28c1g6dgjfodnc0xbne71uu5wk',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'w4x74mlels09nezzn85w3kcm60xjwy6vozg8qheodycn6es5ss',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                
                party: '8lx1y6vhgah0f9wrtu4da5x7pq5r1sn95gd032g8mlegu8cz1mq77a6f6fm8pvcry0gd40urckeaymuunqdhamj2337e96sjum8e0c2m2xyx8dfk4kcbi2mzs0tutgwelr0dx5aioy511nwz60ze6j2hzyxe6zmc',
                component: 'ad3om4s86dsvmlshpcrecnulirupil23qk0id96jy7ohmxk638cx8psqaaow824x6t4th1k6x9yx4pm8hu4bj3gh6oe5qm7kzjm6b9mdevzko3qof7vei6rwx7n3rxix5y4tjxayr5ny0gns18xikjmcurfpq3bl',
                name: 'b48qwt1dwqkuf85ov859m6mf7nkf13u0hocacn68clmty19f931w7mk3kkh7alw3k78gixcd3b6shd7ph6wn1ieoy72wzj4tnyd1bwxs7d85hhhtremd950dd21wtmq41zsqypa4cxfh0nwtd8q2geol9cybl595',
                flowHash: 'wjxloaqijp7dgmkhnazyivnb7op5rofoftq0rwmx',
                flowParty: 'yagadts2w83h5j9ksvcl8duq8mgpo5r0lyni6tjckifr6u6nmh6985gnj0daeozap6l1i5golg0wzgojob7b8j1qzjc9ri0g963a9dyc5tkeo9spzero5cjm4rkzxft10ev9n071ii5hv9w2tpwskpasghze5yrl',
                flowComponent: 'xoh343u2ly2jlnbdtilq4oj92vjv1mlsjgebpxu1h16q7zebaupz3kh8k8dn9w3irbn636xbcqr9kk2pwa7wp27ryyp76pessssa912lreppkhpu9y4uwo2ao46ss3xk6tvaa416h5vivgvnj79p10n4t4yy6cxc',
                flowInterfaceName: 'ssra9lmr92l0eudh6e43x8eredqd430wd49ucbg573e5n3iupbnj5sai7t5zzn9d3lucqlzjqukl32lyc02kqyv1johpour59tigvdt235fs5qib7tp7mu9i8defdxkoxeswtghzy9wj84wvyk0rxaobz2un12gw',
                flowInterfaceNamespace: 'k723uh8b9gvromxyux5qvfxzmkioft5denwhki95cqq38bdy6h0xuyshf9eqbk64ffhj8d5zks2wq35zs4rxfgkt9amr3z6kmuryop34yys2jofg1eotdnp6z4xnha1d8s1vtlm38gl9g1rnlgwamzim2drlo9tw',
                version: '4s6cw09rly3edqfegfrz',
                adapterType: '7yy5s7ybb4mnah0wt2njgzivop3exgwpf12mmvi4l74recn4c0wqvh0t9asl',
                direction: 'SENDER',
                transportProtocol: 'xravh9ddzoikctmczd7pq3am15b99igkux6cfkedv6o6gkli2izjmpuw78y4',
                messageProtocol: 'jm7cbmay7bhxgsnplbcqt70tpip9bjjdhpcfs5vfoob1fjtrtg73eprboek3',
                adapterEngineName: '1o98dgylxm46kfgng9t27k561jmuu93as1l3nsr4ghukhi0wjxlj7ws29s44bmynjoaps0kpugli1b7hwpe3bnkmzvxrctlcalcfrnke561q3zl030hth24kkf3l3oprfde13ae9sq1aiskov46t7ao4co05lsya',
                url: 'ogc4umg1wuv0ot0u5f56k8yc4c6y0ag05mge0ma283opmexpvqzit6no2mhlwr1r2or22rjz77jx1y5pwtbq7l9s5cavbthrolktkh4y02gulwkphz5kzm27rv3ujnp8n8v34bqvj16suei9y6nx6yneqngyy0v5givowjhn0ahxx0lnmbul1re4g8qa9d2c6b0w4szhn5lrgpoexco4kgzaiditewycc3q58pw2ewnkdhce83t70n7s7ehv1ktdr707q820a2gifehyfttbacjess28xz51415lgjqpxwqysaa612qtoqlqpxa3js85',
                username: 'f3rn5nx1azxzku8jo74ch8xu6kqo5uvwoyizb02exdqf3f3isl4yjwgmjo7k',
                remoteHost: 'nq0nmu6llex7buw0x1qp4yr56lmr4dzzyehejuy62tef4gqydp8lr96s7f6c1spd76iyizt27czvjsevfvke5yqduwgxsv5wrsd0hmobzwelplcchh4df8tzfpe6udgk6abf7k32chlg7rlh4xiatmxw6mp4jcb9',
                remotePort: 4884944622,
                directory: 'ra3jaga7r8g1ewv83p77xdldlcs2x2ua4pihfdslnpkwn5ixsd8ffc6zdtar5ur9ut2fravnhfq5fthkqujek7fx6b95frxt0a3ytosqboz4itdi5q6gykm7aay5gny848yn2bg5cy2avu49yyq7z7c28v7f4btx22axwqr60oyamluslm1x3yy7u7lhcbrsorki99sv9u3hs9qnx82xbkexrchspbosgiadt5a05x7h9scozlse2iu54lx5rhrme5t9ebfwfvu4arm8051bpydbvl33q0xgf37kpu10w1wls0agkizxsuk72m3bvukqnfcyi9xq5hqfpifixcxb3d9jbh377oqmjbfuwxczwrrbvzko130bmkpaxhrreovoxsjrdzenga6hmebaeh0ns3yzpbcc0lhef3l3r78o76dzu42bugf548oyzpijciire0cwzttwwybmpseaert3zxfkc54gizawsrcynrwcendv2dwlu9juqcpza0lrmd5txiegch9l4439slbh1grl7qd18ldos7f9ejb2t5a0e61f6i8vrkpeacd09p116xpcd6l12np605nry60ryuovh7f5b7ess7k1bb493iin9sl6qqzoyn31s5ni48acpubiw7fw4b7pxdk2uzneg1hg9df1fyqxtex1h42cn7rwz1m1llsz4zy9q1m7uz4xdkwospun5n9fcheac0tm5ali4r0m1jgirhqoyi6wbhgj1q26z91b6c8xygzew99tlv45g5hvh7qmhsbrknqokalstqzdodmlclhr78kph8j15k00n8gbd5o2bk60hogculg0zl0zol85ldgi9kfbqr4bxcmaj5mbnmoqxt4a6bbcs7ywl743xhdc4rx99ckmlj4nlf2mtqhv1q4nrvzgs3l8miw28c3c2m06s65c6pdcviueml8invqsrwe1whuqu8mwdte1aceffmbmqtdym2j897ogd83vnhybhay0ml7e2x00pblask4lrvwci3z1yz1x',
                fileSchema: '2jzy4uqublnfqomksoqm7k00uio3yky81w2vbud4al5m8m2lv17sewcgxbbolcevwrligrt27wtcno9977e28xtszd7gn394yshz1o5ygak6r99ay22ckgyxiogkvr5dls5zojtocns8dt8v8dycqqf2dgptwu9tyyhoo7otwvg5r50zxywcnddp5bgj2o43f92ouw546nwmd9mg2rgodbnn2t3jsycgc1jfjcjawpe46eivvgb5ygheyf66h0pl86iya6s5ojiza783b1oqhwcwy44at0321xql466ihf5z6c9pv0ns6pox7wkbige7u17how3xvnn9hruvu8mgp8d6yk54aa74j06rj2uu6596ddvwh76eerimdqb7l3rvabl1jhv55tqz3t5o9zigg6zoabvv72a5y6sbq61aqudsdjysls633fniuxxtsvtyvhkk7xqbipsrwzagmah58zc35d3xgirh96k4b0vtrcwjxx77fv07vhn3c0n7pcdq5aq9exa1ny37016qtcy0cztunkz5yjzzte7dtpvqlynbrcggeroxpf9qj57h1yt8c4jfkduqg6qy1t0moopcqq9cpfp6lnqz8n3biuxvvnbcebv6uwch2nk909qfspajmq7binbnae4n0d676bxdi54smgggd3gipkwgmmdnyd4rqgq5rn4duyf94rqekzflyp8j6tsu0x3mjf0jn0wv1aq1zxok9bjgbxbzpj7glv492zu6y1j4fkyv6r4jpnkxe6x1vxtqdwm51hnlpjqzp4gau1p5u4xakburwzwg96wgqyd5lwsusiwafahhb1u84an63oc7fvk1n724k9j9ptcvtugd8gxtndu82cnjt6cajm6u7opjelwsnwir3xc1v09hn3eg3h1rgu5bedcz8gber302mbdo71odfi7f2hszu26xmfpp067ao06gu25abgtv93c6rmt6r39kqon03kthgatpofbgugjve889ffw075ivmb5onw3qooujr3s0',
                proxyHost: 'oiw3dq2hwo9hwf4nze7fttqwt6m5mbbxmqvss0keioqp6x1dd4kd695ixinm',
                proxyPort: 7692645013,
                destination: '4cr5mxbeq4346lky2xifbfeb121mfu6yycm9t689gf4jr32rirp84har8vijes6j7jbhy79o1ueom2nnskjkrphycc45bqd7277ws36rw8soa9dvsqjnoi65fx34mlrnnuvsrcfbi8057bkecrensj91kx7gtgvq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '6bkm723c1h2sczk96mpmcugd2s0u7irdxds04l4q32bxom8ln9v3azdum6cmobde8gd888mlt8bxn9nh6p75n4g4sa2rom4d4i1j6ckwla0pzd87io09l8uvpxu2x5cptovwqmva00eefzqrnae8akzooaagjr59',
                responsibleUserAccountName: '68zeiob5y0ab8rlb0vko',
                lastChangeUserAccount: '30akmxqbx7x6kojn6as5',
                lastChangedAt: '2020-08-30 20:08:57',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'ffvy874auemnbmq8va6asso8n71lws6pogex7lsj',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'r7ohtxxhl3gg4pv8af7i85ddqabxz3vu53xxibpnl2vhbelbqt',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'jlmkuxgkkaflzfnmmq6h',
                party: 'w69fqgjtkshl95xtffkitn1ze4x5qbis95etxl5j99ft1ism8ctj54rci79tloizv3ngzivjowlwxts311qn30zzvpojxbclbi2h5tzipjbdeght2j97q2d6nrsevoxlql28w14fek35jqjg4a3qzdo12wtr50ex',
                component: null,
                name: 'izlm7a9enslg8ug054p73ctdbu6pp7lgm7bl3d70n49u8lgw6r85bfbzw0k771wteidus0ifvbp17uol82hcnaqzxd423nw8hbq0dyzcrzxrke89sfjev1aalkvw1vs4eg4tvnvre5jcsoba9flmub68ajawd1a6',
                flowHash: 'uomacvp9ua5i7deqebgobxdkvmgzt5yurfattuc6',
                flowParty: '5r8uxlcta8y24r7g5vtomfphdkl5lianvztlt5s1rjdpsj4ljbwzrmg0r5x921e7iqc7p0blcbeqr57i7k8drwwrwsw81uu1wq7le37a4ez9z3t9v20hg6a128m0rajm5mnqusn42gq26t2uigyxmxopf2k6cef5',
                flowComponent: 't8ugvg3dhqb6xarvjf99obl93joaiqne25y6ybiwdu0bkwj4murjlo9a0i7zerelax2a5b65dzy7uh3bda72dynbgt32udne6fcyc6bcnnm2ttl8o6rg7y9j1uz9wubb05dmshlp9b3cxieunrgpbo6tekze6d8d',
                flowInterfaceName: '6nr286db6b7jwzzahp23rxgeffcppmmsm2xjf96v4qkg38zxtjxbqjfeum3zwhxafw9so4gl5mg1lsupcsw651dxy2ywws52jzobd7833sahf23g0j53vzogyccl326746q4lez0wp21j3dzeam45e0b44kkptqu',
                flowInterfaceNamespace: 'wto6cil0g659rfxejo0wekf1qehfu6ohj70lql035wo3ax0m95lxp3prp664aq7zaurs0ggdjuvu2sy3hprz5wq4duwf6830lw6tgun05dmr39d71b8m6jn6j22q122kb2acaxtokmv04t5ah34rh9ioweehlspc',
                version: 'abi125bzcufplahjo1w5',
                adapterType: 'xpulzg9cda5x34fht9rlouvppvlvis6a39d5a8tplii4jjtaqffgzfsk1cqv',
                direction: 'RECEIVER',
                transportProtocol: '0l9pos8fhftub36nd7opp7ytczpour63ol30cffdz6r4y7qblysbvuqgttkc',
                messageProtocol: 'fqn12dgslmadcpayu7t107ay7xut0fllnxuu142zl7xngytcbm9oz5kl8dn8',
                adapterEngineName: 'hzkqppymf7m6ysia5bnkz7zadx0lr9kpjobrpwyfk3owsswejt2q7ju41pd0mv3fkfc7k0207xbk4blwmwm7ohczts95h536y9jklkspe1u7felzc1m8bd9zghq2yehb7qghlj9g1swv57xo39nbe9zg9drw6y8o',
                url: 'z6w7da8l8um6q1btr4lebu1ohy8sfj5t4ui2r6sz91h71sat16kmzuwkp9hymnf8lx6fw0233gf234u1nrixtpvyw9yv43a1j69ccye2ylzkss12nbappbmd59itqx2kpwsoklleu6o9ubnmwaf3t3iwukeztbxl6jfgjg9oy8fe9u263w1zwtk37opcqp6j91ivxcsh7rwk5jak8x8eqxkox4wsib3p3rvvr5s7dybcvx7gna25s5me7uq6vsemdwoeulh2cx9l23t65igxzx3ggib6li90h7uevmu5sdq7yqntgv6ptl1379cdzh4k',
                username: '5cfkdojorfo8d7mb2mxq1a0v4lgvsxhb2izn1acig7lkgenkiqrr3mztgm6k',
                remoteHost: 'bdyptm146tp9nbrcfwl8i9o8rcgbu3p1diid5yz3kgz5tgmpwzcnv5m2bl2t6babzvtk8f5ejz6grkrghrhd2s38wxsn9tnm0jygmhrfl7s0r7wu5902exm3j9ail5fz67k60a4ds9fqhsimm6xx7hwnpiycmwy1',
                remotePort: 8255012092,
                directory: 'vd121qrd5zpwd57xnw5vyfjm0gpa6mruk44ukh41tmqp5s2adaeix9uh8zkugp5n5fu3bh8enc1hncxm7xh9a9qc8icqwrzmav94biw8isuy9w97fh65bfy7r4nhs65voclt5rozwykylpo20vlac0xq0t7joc4uxnvpk6vfpplgn4zjs1qkkofpu0986tup3o65cnh40g2kb2utftpig1khnycnwudd1b3rmsuufnyoxu84tz9upqbw6voedxg2i9htnhhnozpswxicjnz2tp9hak676lnea533cnchnu6jh9y7jop4cm7r5mrax83whrvuvhimf6uevjvmtv21358zzgrgdniqjwsfd9nug6l3wrt6td84tysqomd8itq0t3z5f617fssn7wet1febzrwk13efrgfmzecct7sjc9w223g5zu1q0v1ceh39fwstb3obytx2hhnljxghfvmsihjr0ta8zdutlqexshid3rr8bgs8llpfjhxa1o7q7oyq36mqk5ycpntc1xkx54c45wmup8lxgb02doxpoxya3zz9cfg2k6fkamnyihvlwo58rvyclpt6557s6f1nxk0nbxj2u0kwufzhud4wrm22iwc93hsaiv0hpb56ym67vkw7tui7znn8aavxelcnfpsbaldafj9no1lu9t0d1etzd0ko81pzr68ctiefidbz9d6req9k5osfu5shth8ztefwmqhsvgq81z3yotqjkdmogwijpwm23v8gbmzmm1csfb5psq8yz9fx7i9etypee6u1a2yphzo1leainx72jqrr5a5r1t9c0xo8sbi63z8t9trwdrnl2nee0oiysx3hkeloslslm3ef42q5seaqdmvu1fdym0j5laga5x16lf64ol6jqw8bpa2gsx45fmfg3ti9h4pu9unm4a0fyugoegvews0s85k9o87jvgdry73r8k1ckjo9ns2itxhcdv0s0vvnr18fubx0yr3rybwgba24lbnqnzpujdneei65t7j82qve',
                fileSchema: 'z03qgc4wic9c3shn56wh1zic8d2tj124rm3knk20uhqp5jhvcdj9n19ttphvspfigwo9bxeblbyd8ke4iebkr9qxrxbmmisdtpfwuvrt7ukurgf078ytm8vu6osrb971b9tq20pgt3puh27lpf4iepaojaerrhqwsiqwj7pmgaxjl6oo87kn2fnx2xvzj18p55fl9thtjjmyrsfpo9ai2gxcrvl94fhbphqq0vq3zherlrgkksqsxxk81z6cz44jcmqmgem6ltehoeb34ky67z1r4b1ke1vus4o9o1cxo80k76nygiertmxvnabcp6pa763wb4vdcj8d0ia21hb2nx1w6v0viqnivbrggxkrp7gwdw5b5fya71q70vv3e63c9xvta7fat9u6ts75738aebcalhw6n5luh1kw4mnpp6bhsxwneb40wse5m1bsz3dtf09tpf3qv1jzf9q77gp4ghyyeod6ploert0r2kivioe8eog31v0v1ncq1a50071avegemox3yelbdu2oizivl9y45jpbs6b1a7umrglic4gzzgkanwxmg0szf7cnhrv3kmmr9xv0206t7tye1p6wpdc5yxfwikbpeybxmy78gq40opef60nci2oh3dcw8ewe6errdj5l7f9aq15qnnekxs6za7fkgbn6p6pby0gqd95g7b7jnfjat1b3u289tojdsx2s7ke3dwpo5ckbyd41v8rlbv7m43tqi0unshj19vp2xs7tuxgben4bmhzh1nlczsrcvvh85kifqyangutw6en9t32zz2obbp1gndavfp01wwbvpriiud84jyy3ro6z1ke5qm9vx7drfj5pi36evpwe7nv8l6o8m1ey3t3ilzxi6umx0rymve4hmgou7pxtcx4xdisb68dq065nj4o90j9kbh5s1em12ny7qe1q8bx3q47v1x2kzq4e396vwey25cyt8yhq93z4tyvqet3c08c9x80wb3zf7bhvaehm4ip54kdq0sf9b9p3n3ga6jhj',
                proxyHost: 'xqwqdef877njol3qwtb9n42eszv7kz07xql595vyfwj6hwt4ngqvan11qr8b',
                proxyPort: 9749656735,
                destination: 'rmyioeumd88t9xot8uy7fusvqgln04kk2goi3u8yl0ke9h1gl8keo7j0ra6i0a36ze16p09jdu87jyg58gug243vnds92skmxvjrdcxnoehyrjxd5q22enozt1p14djhk9a6m3asqai7fw3fmjkx4zvxl8mbmnsb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tyr8ecr2c0rul7fapmj755z8s2vaw43nzx3q0n8arug6h6cfamau17gb5wzdpzblklziijnzk3d8oz6g1029zhkz7e18gtble3x9lgfnpzpppp3dal5bsx83754lqhc7tuibvwylkfua6zfigl0obzwns70ytr3q',
                responsibleUserAccountName: 'fe1opmv1ko0xw35gd59h',
                lastChangeUserAccount: 'sv0f1gymx6vzwb94nb27',
                lastChangedAt: '2020-08-30 20:38:59',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '3bkyxg8b9jqogi1xzkcd6cp57v5x96x1twnxvkju',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'ofjnhh2vwyeogu488mdyzot44ixs8uvw75e67ndwken6tqs1ca',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'fk1ttr98nhto72o1x1hc',
                party: '9mypyxn6vxe6x4z3ycju8kj5pdx22zs02qc36kfkfyuqtvik6ycxa1wt359w31x58dcc2qegp13x35y801vc4cmqlvx0370nepjzuyyktw7g90j5al5o1rphxf7gvyea4ue9jdwkhv0yx3y943tazgd4a7ci3vpa',
                
                name: 'g8o6xq5uof8bt2b3exlsg1j5344y4sf0pcxqmagjqmnytktdejds3qysrt33psa5grozp7hihv595fjuv289f320qvjd9gmeszmxwpfjd2rpkc9lo11w8hz2joqu2jd94d1hn6uua9qp97yfvnd78uci0y1zofb7',
                flowHash: '40ekt8sq8n5lehxqaaszlibqufsowq44b9c3o7cd',
                flowParty: '8j9okvrgyththjs8fowj95pge7tjqhookhbal2e73mvgww5b9aaqshge4hmaq9ow42445vi4ogr9sta40kl5jc7v9wp7qw714dci9cnpa5dw8frzswglbpbm9l4ft7d4jzkqyg5wj1b6dy0vb5123747t6vu4hos',
                flowComponent: 'jg29vhvjawh9p92l6lvpuiuu5ok6ixpfid28td4bbquew79k9socln0a2n7e790chcgw9zt0bgr9gq86wcbu2k9m55o1s2jywjngbbwjlhhomlrehx7r6moo81u1ueb3ftq4ug1z5r56x9xn1p1ja0w1l52oef7h',
                flowInterfaceName: '3wcs0kgvq3lgddj5w6homooeak0u8om91w62r9auw3714w93819zy43qw3g2svbmszuuic8qoojoefn22brv33hs244jxnhczbnquqqx7xrrlghxbn7onq57890nb653wrof5cshadyzq5x3rvppe860bk4wwikl',
                flowInterfaceNamespace: 'qh0lp38qajfbn7zfq33tft28bntkezn0k07zsg9em7fnlt5anqs2g3wk5hzwoobu8kgily4gugxf4csnt0kvonl3ullnj5u6tka3s32w11av5g2uijyovn24eimlrioyhydoqpzm3z2vhhazi596lzivs88ac8vy',
                version: 'jtmc2pqi2zl7zfhchlf5',
                adapterType: '5zlv57rn1df3mpml79y9j6sw3r78g0uu6hdzkwfmksruqc95v3xetf11ti89',
                direction: 'RECEIVER',
                transportProtocol: '5nfjlgfxx41szzl2of03orata5ye6afolg4j03cv131uojazwp5q10o6f8et',
                messageProtocol: 'yj0yt5b936q2gpy1xblt20dan40we635r46guupdp3dw5g46ru3k7g546rlr',
                adapterEngineName: '0xhy7c81y0pqsvpm35p2mgrh4ja38b5y2dxjn9yh8r6ezhld5wvhbyugl6o0pejaxlvnc6wz6msix2sjhtqscxe6lnep58n29kiefl8q50fanfpo13ea1g3ue1335dmyp6ox5ssb38konhba7sr9908hmtr24a9n',
                url: 'euhrop5j181bm1oycoxd7xrtz6b6pha5l84ul02lmazybvnp6fin4j9u9nskg9uizekxd4o0kcny0q8cnmnlqwqhph6gbrlc8zikuz59dzupntqsui93fiwf01kal0z3e41qrgr9ykrzdmuofga8mctert2g587mcencyetgx3hpwkyd2vfctx90t6835ns5uepjvtlz6xjpo8z0twvk8d74o7ilm0kxg27sydfj0vt7t1jjltsuuv40c7v4hx9arh6vpo92zgkpkhui11jfpen2tehau8i762xvicq6y86shn1xw1boi1e8crt3qbg9',
                username: '45u6o81fs3sdylh4ftzwi60fcoesthm3u3unjlkl0vaf9gc5n0p7cccjy8vc',
                remoteHost: 'msxc6h92r1jrvt0ukxt88ud7v8kam00qo8drb6mizmfkdy0h4pvfrdmmwzmqfgx67ojp6wliv35ln34xt0t06n434jkj1k7n6smstdm8m3vu1qaefx5l7z9zu18ky5ojlnjv0z5p1d4527p307751m6fgpmpe6ua',
                remotePort: 4525295793,
                directory: 'efawpmokvslth2rkupsnmeun3vpk8nxtgur1fxle14q72pwo5cfucjl3k2p19xpon99u4uac36sf31j0skxx4stpizfw8kbenasy80qtj8ndzi1ba64kd5n5l9v3ir0xsj37rtaqs90f820vtgxydh1m0ir8hbabuf6cbxpjwc2wm33hvkxyq50u1nk1awayaman2kiqct3404darku6u39zwcwgq8cwvbhchc8e3vbone3959obrgcn5zjhe6j2u4abdaaiopzga7ho3t81nkgu47rzzz9krqvoknay8i8o5lnj6ndq36b6k5aivhdkgnaht555fyrn2ozkn6msferxo7sghyuc9cedg2zgu7s75r7u2l1jz8jqybwqelhu997ea1spfrvkpbo6vudl22cit7781gkgm77qmtkjcyrrbn32wxd7xa28dugai6ajh5mjqix32jna9l995n7z5xn9t58lxtxqlyos7saqq1hv1u1x5pq6lw66o6gumpbxfk56znt3e8gn5fxm03orfswe7op6crm7li1omw1b7v14b5hm5u1babgodvtv5mbm7jehufo18hvv3zlrc30icx9q9wn8zcntg9bf73fh1s4pc1ihzx2zcfdhj214vb9gbf77r6cqqrtuc2cjsxwmftlt68rj68zzc98hew9iskhqi5ybm92seyutdat2mhakm0jfej2s0j703ci6estvhb9c80emdw39pqy4hnh74okv02xkh3gikcb8awcf3rfknhzj2rk4zz9bgm161qisf14f153o2cbwbmdu3do3a9fznvbjn8ft5mdd0z3mlqhz5tzdqwuhkwk1dqpwx5jnfel9jzjlbr066w78khiszyhs1mqp91xyk9h1jb12lvvonfjmv7sxv7t0qi0egsmtlzjti4wt7omd409midp495kgdnn40faz2ysz4ou56654scz3z1k34asnt6h133mkmm37ske08kqjk1dlluqlipcq35f6q89tjk7ub6z0vg84',
                fileSchema: 'l65be0i3d3c5ati6qmc6oeqmmw5avb6vl24h2b4dtbko2hxaiw9u2zbqauukpcp0cbs9szg5dhyk9brzdvhhxc1kdwcx7dcjy1gxhmssrsabai0t1wsulkauw64livnup0yxvapf0scpsoo9n85hz8m0kxe2508zi8g8uzqmayoc76ipkxbdnhhx4zs1im8v5z00puc437t8ess7pbf5xissijsrb5ri2bb7q6r54dy05cay1qwsb4t2ffmcaehou7in2h3sjwdak6qgr8eil7tjwf9na6f2ahatemc45vbvyj1hzyq9octs3m9cl31avxn0p4t5vsv1e41olc1bs3lyk6pn5qa2j9pyua27heufr4sniiti90fh4q2mn891o31ko1gaqnw2tspwvt9139ocf3ck52lhj3v7zmcu4e0xl5259nbrbgo1wwo0pjcylnk3vzhtlo1s4xw92um7ih8rvpxkue5fcnd48jio85kctbgdtrauicwd2scomcfft42wmksx1g4rloz1ga5n7kaksc5aniaee81f3xdfk3jdb1fjumrp5ik8rd5i1d3j9xb0udie7waiotfqsb5u7pl2vbb04dx2bonafgkyjkhepw9viislse1o1f1z2miffnadhx7pnha19sknqza8iwa56svj18h2adykbx4ejest0yra3klo100fmrx4ugmjqkzhvmrisojmed9bdlqe2tq1ahpe9npw3pjhi1pg5ow6qg9dce6ef7c1z9oict0605j8zkfli4ujiupuq36ktzu8lazty41q9hlnjp6ye0fbypt1ked0c98ap3n2303sgarypmn06odc2g0j0rxwjikji8xitx3fmm83s6xlnhqumwlcr8bzh31f6gvqsttdk80btamv0757t6nbkgw2f2smciwf0mxb11ldgyjjq8ltxp7qv5jvjy28uke2zo7pw72tmjqg80t7r0r4qyjn5z1r6y9bjmdautfq8dy1hmq53demqvcv8421f4z3y6u9',
                proxyHost: 'i7j38wkgeekz5s8b2h10xpcjh325rz7yfmemgopluw03qu5djkmyqzvolqzq',
                proxyPort: 1403386271,
                destination: 'y1g29jk358c15s7fwsutowtdorkrxej2vflayabjfqbc6lch9ysuastttdq522dorn22ciuzj5k492waannv5h3vbf5lin6fbsz2v3t32dgqiqcgw2no0z3f5pgpa7gd2wgqowf9son4bnygbiwawqvs3a73evq4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'npkwmyvbmrv7ufcgtpb8jzrvaxsv2mqr0lyy1z1dz63fgbb934kf1gbje059btjsal0mo09f3tiy3dsfbv6d51k9alm0xyhx3p34xgq2xx687wafcdcphpblnfy4myfn6cbnue10fcjjn6jcl6g63md21wg3fkkn',
                responsibleUserAccountName: '68fa44k4csuc4kg90s4d',
                lastChangeUserAccount: '2cvpw3y6nojyyzkw26wi',
                lastChangedAt: '2020-08-31 01:14:59',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'i5u8sm2o7vvx2cse9x3znqpa4vcuhpf4sa1ez4hn',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'pvnj0z6e718kx3rz5zw7wswtm0ucbrgnbeymva4yk8dyh0jst8',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'pjxmksbgzi92ro754v7u',
                party: 'jkt2lbvgcdan0cgeuy6spj6hv89ahwwqafbbtjyibnt4ru2cdyumtdhvt6hz640o9gb9bb2zmw6ry2cffr1h5jnp4xyodgdpv4vavp0u47xlogj5fo7vggs5vq7b6btixw4vh0mn5p2vgm12hggnyz3x9nn208k6',
                component: 'cbddtvbuf752jw8o28xrtcu9rcngxw65fhm69jmtaq18tfjfmuxk3pe9p2ql41cg0zvhegpj4cyrb0tu0320rkm23un775xvpvdsecgpnyluczv4d6i6l1ipo98304rawq02wm710da2x2ny7vzgsoi7mal5kct6',
                name: null,
                flowHash: 'ygd5yhbxyqdtw7oau4ph8v4xinjag0a4yezv9xph',
                flowParty: 'mkqc8nob4q795b37u00gqw4r4vmx672iab9mp5gdsyvfo98rkj71mtjb2xqwyqvqhznuaxr8hnnnincmzud47uvlc5xy5p6axcdi1kcqc55eq00t7mwhpqeppbs3qnogi0ycf1seyzsh55vuyy18k0pggisgbjf4',
                flowComponent: 'yxn95yh23pihux0hlohld5b8i73pa02klhng05n6i7zfqqx7np0hwswox1mhe1ux3jb47quqhiea6151ohyz8986i85nixjgvn3k8wtlulymzk863tkalswdkjd9jj487f8bdzmexta3d8vtxtviv5e6qfjwivi0',
                flowInterfaceName: 'u8b84v6o25ptzt642narz1zkyj6ofuu4hhhrxpoqy0jccldepwf1fjzo3ndtmogt9fdwi9tjd3c94keewfnhd7npovv07jou8ncbwru5e77wyblkcbse4orwskn8mx1vs2nen4na9kv1lft9qxe728aat06oepmq',
                flowInterfaceNamespace: 'lyq014yiq6q0yivrrryh69ag133x57vaiwc74fdz5ayl9vsx47mj95cyy4138x52osyiizl1dyxw8px7h43bs9784u1ofnn05m342mf66lf0nyji138trzpr2t80avnyeg225eiox1mpu3xgjo85zd3jq1uotkdo',
                version: '1zjvdj1i42duae7qyq0t',
                adapterType: 'kg6q2kik7d1237gfqjktb129a9sir5c0ain5jh0xgshjcsglgu6rgoxzya02',
                direction: 'SENDER',
                transportProtocol: 'ut1huh128587lg06e78ycsgaf2v77kgso28wj3lrye3sbvnzlmy0k5fqk3f8',
                messageProtocol: '1j926f10tvqpp83zp2qjrybltmvku6mvt6a8364hjoifzan71rttyyjb01r2',
                adapterEngineName: 'ob5koyd86evod5v0aoc5rdn753684c1d7x4bzzk5k45b13ylbw4il74ah4q2jzvt6aocm5pr42hgzhpcjz7v6sg3z2cjlouzgz5pw5xr4ph3mjz92sgzadwkvczne5ehazdmgkoxjzonnxuq4h4v5cvzqcriwlfx',
                url: '6f8g0qmljcnogqdzfbfyznxhknope6wqgc0eiq6do9v3yvt2lpqf3ksgan1s0lpabfo9m1vqo7dkwitgn89a5jayk96m7b84scexfxxopxk17lh0uslqslewpdgybsr97pokv4fke9qq7rnny03k76d51ab6y501v9ckc1frgq8abvjbdjmz3paqcdj9nj9otg1j17pefwip8o7e7paljvs3s7cgqc2ism4tsekmhlwleg6t6157p4j2k9r1eq193s0z5iep7fknn8gvwlc2mlsuqhoiimxik1iy4k2yu744u9mavhs4uj9hj0h43iz8',
                username: '1u1pyqtq9b2pkde1scwzks4kpj1di9fqk01gkgpgjzwq8aflt2ossati841s',
                remoteHost: '3o804yfycg30dgzd09egch6m5gaf37y63gg7iqwf9snbi672u49qi4wrn9lv1kekenfl2g5bq11bj3ri31aqutub6n1cjgi3iamtumhwky1hfgdpfl5v1kie2gukqh6m49tmzf9i34z527zirjur1qzo9b2dbsn9',
                remotePort: 1355100065,
                directory: 'ky9mvkjbg4ee0ufasm20mh350s6mckfrwwdu1oio1mfb7gaugygarts78m90q7vzfk4domslky1ls1g9tc2hq60gzc8n2rakiboa2eptqzkv0rfl07twl8cqv9l48r9uoxy05va7w923sqaupfrtt5gzuwidahx7knbya6y6vx8rm5sr7i3g0o2k1lrfsg3legznv44z8kdeqz1oo1kxfgkxkl6grzuul1nkek81p2t35cct4twncidn8ggw36lgodbj41tm5zyu41puzm4efflxireus1yf1clho7mpcopatnr8nvxmzob6vzdemm5ewa483gtts5y7r12m3vdgbgxlz5xr94ri3zjd6bry1fbbjmq7pi399yxfiv2cq2q1k2olzx0qlpuqd9zntpspje7zv3rh55sfdj0ayfnburo783jgosd12qqpc523rmttb06xp7bm9k7jpvldcbz2p640wwxiwifkvn4mr69svzx6mtwdm60ntdznq7uexg9mk1hojuj1witdyhviglt0mhcz09872gp8lbxk49beo1o5qfnzjsa4ef3hxeffd58n5300cx4jrs81plca7qkf6b181xeovijmclq3r7u6dzvai6bvlgv2ttyc1l1mnt9pr56q09a1il5sz03hl7eggxs9m4jb5585scywygp8tvzpef6amqlfpcln84rra75svl3uhnkjlh9t089wneemqi4fhjm0kbus7zxpn56dgyug4x41ohp0ape9d4iqmwue7gmohdk86wz6d27op5drl7zfpdlrap7rag7lg6hjkbek8sd54yg9ituurhf1bkzl9pp39lmdgb9upka1nm9mvlhd02dxqe6odx96i0yfw1ccybu3oift0mzc1ep26iv36x8obxzkzvrolq6vhnxord37hezlb26hjdfsp8808t0mvu0zauhj6jmxpisl3em6zcgki47f77uvqbbinve7ya9hfwkd1jeonp0v54ibp7a8k531quik7cn4bdrkos0a',
                fileSchema: 'rqw5rgikuy9muo0b03dicsv9jscu1sjezkex6koet8jbn1h7o0qfwrw5kq9yidn8fc13n9a7xmqztumw2o4nngyjirob90somuk7h8xp7nvipe4m3dpyfnpy0c8tcdfpzppomt5cr8sqzqtqp4qa67rhbjat9qpm6553qm90c6aiyd5j1ajksljc4r7tuh4oe4zj9sehnvoqkmariszd67bgllmgcte834zv551x4ejsnt1p5duwdf7c6myhvd85a3zqt6ff3es2i1qt62dwwo81uesig8n7bu4kkq6z2p7raguf1uc9ken73nsops342iylzhbu9fjl22zjap5tsmghbopuukzg0ump5jxbsjn38z5j79vrncfnhbyw8ghjps14ta0hguksy11xcis8k7iv0tmixkg5wg6l6vfncp5keqmhnj2d4ynflv4kkayvtslohlg1vd5pphl49k0xwafb5j5k9fpn0vl2oxrwdjixd1393cgnpd7gwdge9w2mjcmsb2egp073izrcow4ai4lbvuzcdrptgpep2qhl9og1tuiro04h5b68t82p5xz9douyo5vwq75hbvxgwlth1gfb5pb096cs9rpc9tziau254xfgzk8qjrh3gbd3vxj48udl3vs54pjp7rj8qhgl0bzb8322zjxlr6zmzwxd1fl1juynou6di9972qfni045lrg5ykrbu9oef25q1volebjgoojimzh8s6hqh06ke5axj5w3vqoyc4ryg6bjy2wp9c78eknvrodie2r3zhmm9e1pf8irunv361deu1w8f6hzka9ebv0ew7rgc1805mpi22z81oqfne7a2ylxhi7tk330xpfxlxurfuyke1hbj6n7h9op6texmg9hygrmuhqzyaajoi838hg7wp5q6cosx7os9q60br60wg8igdax5thdocsyw1jit1mem72grvav1b7vg2tgghtdm1w9e52z8lwpo0d3q62zkrjl7sf8ino7e27xfeuxll43sknklm9w',
                proxyHost: 'ovlb8t7wp6e7ick4m9wkitk90qlm70zjyqih9w40o4ami3mwbnr8yrfv2475',
                proxyPort: 4077114116,
                destination: '33guoqbjxa9bg3qo805tokzl9lzmgs1xq6qvayqx149i7o09tns0h7ndtgejk46qm8kkupa7bqt2q88tqb7mueac8itemlwuywnqmygsvs1res3qjtivv3p4ex9plz2cwipvzyhgv222i05tslj9ff1inipvn7r5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lia6eyfgswi2a5jzgbm5t148b086ytzcsxgz5ttvn9h93wr043uk4h0p6165z9ttn5tsk667ut7v2celrqq9naqsd5v5v38oezy5aqjrd34tqmnscpikgnf9okvfn8mzcry9x9ipf4hxy06qssby6jlj2djk4fte',
                responsibleUserAccountName: 'ny23q2k67ul8g1ygyx7v',
                lastChangeUserAccount: 'v5qkmmqmcmk46qu0cxoe',
                lastChangedAt: '2020-08-30 17:56:15',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '30dux1287ufuj5w78j0y7dmv3wc4smyyy8vlp4i7',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'hgh4767mrqpe2qevwec0f0sfq1zysnxdmp4g9sbdcyn8mbr6vz',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'lcxhx2bbo1zzygtobeb4',
                party: 'cynqz9ogt4mr0rilrey2wjkih6wrh4551jvimpavhq70dmnnlnc4suc366yfqxe6n0n21mtlabf4cojvrsym9enqo4kpp0nobq89andvjxlzl5ps8xc1amfcnnl45eza4gyy6yyorn2dfv5efeizpxa55j4c6jxe',
                component: '7z9rmmpdcej2db0vgf9paky3lzsbxwd7638efg3brkguj6geblqb9wobv13yw5g7zu6q7o6ldiine8igkup6f02cjeqdnfo19wyrjcuoy32jrwpq8ytswarf4k2wu0in9otztzrdz2i9irzqu93picatykefef3r',
                
                flowHash: '4h78ns7z4nm1go9m9ck40y3cwmgp40ry09a3u505',
                flowParty: 'vm5xp88dj9mgezw31lsx193xg3bwb9kpuarlrgupgp7xt3vo38u4hpbjnmyx2f521mwjocqjfn2f5o4qq5v832tzr4xzzphbrnjxyl6dcvn89pa5657d7724a3wlw1lmc9xc1vuxwarcdxiqoniheg5ql58eym50',
                flowComponent: 'gtemajtjv9eiq91oojfr8be79w4epa1o3hrwhlrzxm0grd69ei1voyjivyqovs51lbbmnwgbpnabr6pmej9e10hb7cdwhg423cjn554btnu7hyth864xabcmsy4c40enmmfo7q5rjjibsi4inhivsvspcbrjvvpe',
                flowInterfaceName: '7o8w7ngn5p5frpuv5ph6897n2y61jrekt4rlq8iu2xs3frmem21no4azs75trn2gvqa9tb530htlmaucn3z7wqvxd9qtwnfhmwz4czd2hchen0q1nrio2nnu2t31ghlfmg8hkpniyafe3z2vsz1gnmvjee8qbuhe',
                flowInterfaceNamespace: 'm2ju3lo14oe0ks8uol3fmpgltycdv2xf4r71jo9aajnyz5g72zmn4b9g5d77siecdfk6jwgy8l4dd2idfa89lkke9wkpjshgvsml1bqszwc8euz4d8jmh5no1a7q05vxaxq9uuh68s8kgy2e36dywiwhz1quajcz',
                version: 'eejoo4nnzbnwmzdbozpv',
                adapterType: 'zfd5vytgaeuoeub70m268i7ymttl9vd7rncap14baol6c73opdbyqkboy3l1',
                direction: 'RECEIVER',
                transportProtocol: 'byu9qiin5ep7dg827tll1gwonhgaqmh4fx86yxosd08i1iv7emy2gl8nv8k6',
                messageProtocol: 'v0fmi42uea7gjo0kbmicziirqj9p4thg41lr6q494f970a8mywdsoeyuaywb',
                adapterEngineName: 'trlfijvxpyr9m5q70k4hytm1rg4p3yxgloeqzcrsg2hv7omjii8ee68m7nsm1tkfe1cyh6i9ntqvgi9ipxq94q6k9sco95078ylfejls1ckg25rz2ydt77ubb1aktso91y006hsug4sra759xebvxh4huy5wt89c',
                url: 'jpoy97wxfcstwmxwom8tz97yec5ox3j937udjkbpnjuslv7k7ryqc521q8iyaub85n1jjy1l2rsymhpyyc1w93h7w6i0gtugjbe1lnwlhrq3g1d0hg9hqzgrih2s3ps478m8xqfwzsh3z9vcco2psfohwlhzmw6sssummgoall9n54zshuwzbrb8x77ms74u95jk9996t46q6o2kk166g1ufudnd339hg12wlebjuv98grhjgeszio967qvhc3i4jlxzpmydu401clfey3o13aoh5b42vrflbbu2lp6w7y9pbty3we9jbt9ud6e2ini5',
                username: 'gmvmduzery0z8zg6chkxdcsts7l2uffs0h51osrca8ndt9k5oqj0guauwnkg',
                remoteHost: '4nbnq3fyk3smued50inxqky8o8ylhm4l95p3c61mp7awu6osxv7kip0xf0ycsqsrssrh4dd64t36yipp1056cjztekg0rpslm76pi8681g2n6snttlbp2zb4yzbp5h9cu50fuudzpq2zknck0lgv10jfsdkcg8p6',
                remotePort: 4828330654,
                directory: 'uwao6qj22kx6831uznp43z2dnfkyx9un7b9c8k2ifozpukfzg4pqipbixnjt094qyh34a2t7vpjh4lb2wam70y7nalrxn9kvakb6kwkppmmvabpln0iqm259nny81zggx9eer0babll62bhdrk8rhsdoh8ycdprgsvrxqt4k4xejm6pdiqvsd67qqnglwblgbh81r1mzrgjp1lh1x7cxrtczkq0p1jew10k0pmpffg7na6e1y11d8cgout75xf8r82ec9ppocjidglf6bkbu09fjvvqeeir4eari17pastqw9qkh2fx306l6vcyeowg85qb6rsi5hjcj99c928tu2nq20iamqpenl3dcr3cwbi0k6dezrymlxr76xvl21652k70xkooy5p5mebnz1ai9172e21231f6sljxwkew6smvh9nnj6i3onxz85pcdh7zh1kgar1nbt3pqx8ocgv6mz3ycvhikxinto28p6tg1uljzx4kgy7vjyhisnoludci6n4i1xds48v7vtvvpdb8swl5fo231o1wv5gfmdlrdkrbb10mfi5951llzy0sstrnul6qykcv05a3rpxp3kaanijmlerx3aws0j9flwfczfrm9zc048m1cf4zhmoiapluj5ziy9ndfsuj6paxj463k1f3b9i2hj0bchqedwwoomgr1rehq2cltd1ih29peewpp697hv2n85fuwmr1q0a8nnhb0p2osfcalesytagqtkmjqxuzrlm0jmz7laqr933g0t8gywoijes52mul42eb9hucfm31miyc1h39uix47yxhlrlu4dtvq5g2w6f0kg2mwew006ijkxo7pupf1f26n5nm7ml41fso5bs6ypwkrzax89h7dkxupconlggi7yrliqdpm1u30qfocerrhe9ucwmedz81p4wufliaey1afy1iummwdshyanh9ke6c64clrhp5oqol51u3e66imopr8hpmfjihxgq7cazgn657ruaeg3o3geqs3vq29z54uwm3b',
                fileSchema: 'fgozoy8gfxs4uwvrfbadh78242ip6wquq3z2v74sa7veaxcdhljwx57ts3byqp0n63ye3s7ndjoylqri0l1jpzxvnuymp737dpl2nd58i7m7igcjfgc66gi36tjy1wg6p8xmsb3u4gn9coygjvt04abgiv29jxd4ru345y81m56acdxvj847bsa9wo2suitk0vrupqpseckqukrm0xoc9h25mwm8ks4w9vdguh7qjfqdn1zptm82ulabddglhzmafc6lc8dyqnyiih6knz57qci9eqmqcedg0n7vmzxzzhsl46fsjof481vcevk3oyotgrnf94e7jsoc99kgyo96yskubrkcan5ou6vu7ee2ie2wu7da3o2kjttscqdz6o4or97gp98s9cclz543hc77amtuo5gta42vjtfnm8iln6y60cb0d891ccijsbrl1lizjd8h1i602z44bobhwu6bt23t8nrmwnwr6cklbrajpea926606v7hcllhk0tecolv4hsagmoomobc93flwq6bhy8kqctpp8n9bzwmwzo67afdxy37sxpnntnuaw6o26g5ro3hujkhu0rcpjfkaii0b2udczsqueqynyonk2mhvp54ixqybmazs0p8m3xrou521h3iiufut124lg3p6ehowxxrnl3zb3kcv878ygnan2wkis7f4tbgucmnoqml9ys0cw4hffw1jqdc4a8m67gnqc215qyabkk5252xbhn040mb0qkd092tz5e2ef77sjy1w4sl45udpe5j0zsn4x05ywrwnef4zg5vz355nsyzb6rivdl64tunptl5p2jzpput8woynb5jh9lcb2h1t8m95aopotem5r1zwx8wcepg3vmm7ifh3f0qqh0f4w5a3is6du0abte3v9lpe2ubqin7j9tjmys52q50cl8nf04jvz2do4h5l0ykvl0gah6xu17v89qt3nszapgsa2col2jv0ulze339vz3vtbba9dr628crl5aa7vexxmzj3s9rq3zq',
                proxyHost: 'g16kxy6lc4uv19s9dkynp0jmpk6p1yk3nhuakv5crz9yzg020lmi4cbw42ab',
                proxyPort: 9107550355,
                destination: 'ere0vdhhd28ml9hmhmttf5h17f1223wp2utk0m7tfop6wspks0rgqo5wq4kdk0y3t1bp32saxs059z852bvtvd1vdpecrnrn6vi6dcg2xw4mxdnh5szqq9v0jd56fimlxv95s8xs4bydjuvvdcqzlh2liswvhy0j',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'crs8epn7vo614oeoy1wrx0nehfs39mykmvpy9okjldgw3rrmwk9b42ntk5kzklon255vjzxcvnek8iqqphd7anvg3iatbe0q6k6xj0zfvyr2mhhtd8ynruu7nd6wbd7ubgvkw13a3v20e9wh7xuaa2cckusqk92j',
                responsibleUserAccountName: '4cjz63tnhkdbf7ezbpei',
                lastChangeUserAccount: 'py3q119t0cjcnirfya4f',
                lastChangedAt: '2020-08-30 19:28:13',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: 'dwsuq91icafuj3d3pt5cmypdlpfet5nm3awv3',
                hash: 'oakq3021ogn63ioyl75142g7ryyyaav9tqkm6nsu',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'r1t6sk43i3jdp3ol94atwav7vrxbyqftwfqie6ilysgxod6m05',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '9yss5ew1ni66wzkd9uhr',
                party: 'ufpenoi7787h67ywreuj0qlorx28gagyvpf9bex9u9j1g6d0nnza95zavtq7g5ic3fql40wd4ikygyjdz8k7ixhj2s5wjvwltmcfdq09346ksmjj8jc6w7smz93ft0fp6tidwafkpjr3a9tj4m5zxrvop47exw8u',
                component: 'rjzwnslcu0oedicwh3dsn20aacarhiq1suwtzf7pkxje56ok3cw5tpkgade2uem8ryqiqwjacmhzdjy9nus8jssjp1yhvdthzdl4fhtohl88uvppeczs7texigmphzw0y6rkxeu09x7z9u7fsmmbp8fswf1h6utl',
                name: 'fqbpu2o2nkfwppzwu2kvkqsa9dtwnq4jnspptkzjsorfthbz7nek6wk2bw1rp3jovx3anfm92baehp9lkomwccxfui2pdjza4eb891lotdclrrbrdo8ci27qeatoyt92ii69e8dn8hi99je3wwlq3famws9yx99n',
                flowHash: 'ja34cop5w0ufah28kbg2kbiwa636iskkyqfdnm1q',
                flowParty: '6wobxi0dyk7hajj92gtesh2e7wgmmq5zqrgs9omqis3zmocaalfzro7ra01j5q6l1eramqqcdh0cij26u3wzvdoim841jr7fmaxhneiclaee2t4gdv9k4ifgrhtlxybefc8t5c2zonfzjn8vba1l0udkiddk4rd1',
                flowComponent: 'gne4ygkl1j2q42f9ifcoypiagcy9rpzqhx9iqwvwzlcfzvrekbpakr4qjpljkwrre0tnd7fp9186timw1gwmechmvprjnhiea0nhlar7zo3soxumc52clan58zopuvvs2uw9qc0xenh2fdgr3y89giip7hsdqgku',
                flowInterfaceName: 'gpl2ru7jcdrgcp29e64tvm33bklxvs4ebjm6j08qqzgxosbisfi2lwisttuqoixzkasic7lfvak691e6ai5tjqjdjjmnuim7g9o93bgzbfhwlj9ino2vhbu3fcto849fe7039r90udavcmdnw0owwohfimuzcndm',
                flowInterfaceNamespace: 'v1ohj1t80yhuo938xcx1suj1mthdb6rourkrqalsal3lz46bjyw25p4kpckej38wmax2ajajrbrw5knbgmm0ne48ix6erax49lm06tihn8jtlgn9l8z6dhs00irpvep59wkyfpkpvmacb1fpwocr3bny9bygot2t',
                version: '4xbeowyv5hyr4ygnlkaz',
                adapterType: '7y9b2zv7snjhxr1u13gw61203w2d7ng3cdkje33vj0deflpeaog8lkvqvayb',
                direction: 'RECEIVER',
                transportProtocol: '0dxes69ozfqkce4jrwj4tiz0d7ei2g6tqb5hj71i6hcgcp9962mhx9btczlu',
                messageProtocol: '758h96uwldcpfluqwxfdtko0kc93apgce1dvlr4ad2bb6si0qb8yabzl0zla',
                adapterEngineName: '93iu1efu6jbegble7cv9hrgr3n3gcdj5g35t15xosaf9vfi5t1j36h92r1ny9hqbk5sj0a3xvvjrfikj4v7q17n8v11amk16x64yj5px1zxosas9lzeeid6r4pm34kik5jxarv9o8k59pcfwtzqcsah7mrb8hv0e',
                url: '7lgntjt44ydbwi7wx0elws83u7ebb8xcb74yd9kkc84ln86ir7vxlykivmya8cj197uu0rw35h6wr1cc58ty29qywm7tlupsr9n4j0x5nywbwyzbpss0v7vur6jsnaygkplouukxkj0lzh8ow0vczhlw1llhp59mp1jkbl9tp0xr9jtf0mm1fqiourwcazvd2flp0d1n9d1pkbq2x5pjbhn9y8n3c17ueyb5v1arakbmy6mm7zlr067z62uja7d3rovzeyzlynr72fdzc9hfmyrnw6x61qso5gazwby2nzss6tvdii06awe2ms6aytu2',
                username: 'j5zkevp0j40862xjb1v5cp83ef8vjs3ptlpn6uf7aj6whipvttxlllxfptf5',
                remoteHost: '5biwxotf4kgdnlp56es5ouowo7qp8aupdplw485riawx4r72m2snwh5j1oyy9jy5tq68jc5en6f0s98qz7dwkd2debn5xvqxlhgpqju7ko5gt7j85duzb4wrrmf3drzhvl7m6su7g7wrvduwgm8oy4df04z8q8iw',
                remotePort: 1219495048,
                directory: 'yij0xhvluncqieplmdtry25i2j8svuq51ceosc4yhieysamqzrgq6lpe68a5wyg51v00vifkjem9sk2ebul6hm6eicdi6sofx0ye6f8lzy1sql8gtqqeal4yzzor1qyx2pwrmt2podmjjv0x5ha7kykwra16cnka9fj5wk9pj43u67qns1hk2x686swxwlbuzfxm4zjv2plek80ak6o15ue62w7iytj0okdi43rfus47kgwhd4xzgrw4q4q9ep0vinl9tdf8zchayvymsydid1x370rmhpmaaq7yazr8f4wt3q2h6vzwamgtoacvh2uw8sblwaoukiyyikqja2czwvoz6z6k7k6cjjs3ne9yal2zta5zmvbjd42bt106pzdy9f1lw2awyalj8f8oe3pxln83anath5nklr5aoqrdmbqs6qoqnamuv4cn9xbm1abm2yyr44kbb3rgnm2b01leqf5qmsksnys8kr9cvje2uz0eyqf1tmgv6mrgri2cbuk9tt6nj8q241b9dy8wmex4nz3kau48nc5664soukvj7s3udj8l36jzz97rw94075r7ggapbiswnqne2ga7laez9niloqa5mrwqxibke09453za5newyxinz5lp1xyyosm95wz742aajq1qe449lmnimh7ye6upoqpkkw5c93l7gbgqnb2ydkt654dfz5d87alt8rt9k7hzonrqn0b1rc7nmwiqy67bxca3m8oiuseu9lo0sxrlkziqz55ajy1rh080x3k13okauycjdb4017oo2mlw051d5rtx93j3eyfx495hpqw9bgr6mzdaot576e9srfylc2hfbn5fkkp11g67r92xhm47rl8b82y1tvsmk15nbfy35ttd0zxvkp6uwhos9ts5h0rzh8wu3e0raqwlng0alguz3mz395ixq7w7y5en1kdbh7gvw4kfqt0aotii5l43chx9lg2um53sl0n2ktxrn0qznyvls58jyd35vs7cq7tzasesei8tlsslad3u',
                fileSchema: 'jf2589a5mgjufwayukw59mvvr1qu5usdemyx9bkt2l6d5u5wwe1tv2daryja50fwulw1jk8lwm0d1yxg374uv9d5uxi9pafv4iigllo2es2iy261le04y6uj916eaczmnnw6wmb330jg0xq3xz0cxgrf178d7a6m51fevepj08mmee46wo8e5h6kjkdfswr34tqe2chjsfh9a3rfy6pi1g4csfotnqju3bqwh5td4t9a0n65m3u636l3vi4gqaaxndxxy4a7qmy3ux2at0sm4bt7qffwl9ayomjkk20wfj0nsbolzdvi6j87beyxgf87cvzuyn5gj5b9urptxeg0135h76wrpe08ih8ao9vgfyg1eb5rtq6jaddad25kdixoh0ddrypooa2z1s1gjyy811pqe9yah2o4xyhqh9v44s17f2x1tiv86fkbvxpnwjx19bqq9aupbiq8ex4grrk5ez9ugvillv7h0an9jplht9lgoka1gghk6lzq4pwje1xirgw2sl3mwpenhadhap2ndqndt64fuxx5qgk6e0tibf8jgg3jze2q8j91h8fks52f3p1qipkfobsmnevw08qxokkwfk6q67riff7vyogteq3wyz3jy7fl11umtr5m2ls04108fw021tl7k6d5xb4tpu8odltbspuj0triwvhwolhqs36re8undksowr6ifqpb4s3vx0ugbks6udm82z99uk4nwizq44oox2mpkedqyguujv5uwwn3irj5brb4yg662be0pga10wicmbdue3pbuzy8sdk1o0xcsrfwqupq6urq7fnkcopacs2uqz4tj3u2nte7l8fjxp8llzng5qf7xrdrqwl0a98mpvie507dyfucnhvnr3jr7wii23t77ipb6eh8ta9vmtyrtcttm6cpxtkved2hwtxmsk295ibfuuvivxer5ii4vrlmhfi1crhh41ggz9504ac646a36n8ptyalciorimgn3fgjd2p38e437szi0d32tbmn3utj4p7j',
                proxyHost: 'rd2bgcg46f2tboplms2q2i7tbzw61s7k7alscjqotrpxe0us3w8xl3d7bk5f',
                proxyPort: 3394055643,
                destination: 'vd6zr8pgpgyho95sxpi7pzvsre38wshpqdyjn1jbo55d8vfjlyfk16l7wlndwv0wiejeakjutjaymbnsbuoxe6zyxpmumed6fadrwwds2gp33pbqulhv1zxn2czbhlg408jbaqz9zrndssg9ycghsxw26y0ppelh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'axkd40lkmo3496hjftlwuc4hif60zug3u29on5wfcclurt1oyqv0cegwinsqjardddym5qh8ceao2m5qqujsok76rxyxb22568jjrvxi6h2e847sm4znt5f10mm9gj5us4lg2plsq0mfjlbb40qd6d6kum2rh52e',
                responsibleUserAccountName: 'pwlo21icw3n1335kne3b',
                lastChangeUserAccount: 'am763ubsernlbsxmdumz',
                lastChangedAt: '2020-08-31 04:00:18',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'ehw0adcxqao4eet0d8dlb5h3faelw0r9yzwjiw11p',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'pa4fxsib7ltb5iolo1s2c7t2hd5rt1om23uoyv3w8qvbpj0yyy',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'wrfdj1itigpl6sycufvy',
                party: 'msnb9ihbm56ze6rznjaho0hie9794mg7aq1a1hpnvbl33a90vnuohn326t51eq4s0wobi8ded9p6fl83czdu4oym4m7ro98kl3qtangm25rfve3wu6ibwf1ou2qk2e1i938rlw0plhy5y1nsmz3t5vg5249kciye',
                component: 'unwrngch5wl2t6vop4jhzgksj36l283j9ccn8gv9yy7k5cj8qbosqk0gesqc1wrxwdc847333un4fleuoqxu0wk357p68hmf5cmx5sdf0vcwuxl6wdsrq8pntxdq66hzew2xuzy90frkekzjwca807rltrgvx1lk',
                name: 'mi2ep6sqm1gp3rbztonzrwasjapidzvrqp9u9rke240jds61i2hw74umd6tao5yoo4t445e5kwhm3puwmopge4hvyllaqa642akehxzj38i408wt2ha659bcbouq8nxulwck5un1ffnpplg6m3tzpj6ka2yvfxca',
                flowHash: '7mnqy6rezcx5q1jrhf3wg8tewx0eja3toghjwpls',
                flowParty: 'brlws1jufcv7z8mwff80i2pt5dxkzn16d0093dqjam6bqpevthkuyn5ct4g3zxkgi6ysba03qo1goue83itpjh50doyda63w8cinvb991wdoaq0qhjw1ibsfrygkzmy1n474o9mv5h9y4f24h2t8wdmgxofwlh1r',
                flowComponent: '96hxycb30yzmi8yckyw5efl8ghq68v8ujbr3jg8g8tap2b76bhpkaiuxjlukzv2qzd15yqjiuxsawmmx0vtnl8qvvusibx2cm9ilszfg9ds7370byv652tmvhlug1w8jop11752hjpc57zewm5rllx59oavjdump',
                flowInterfaceName: 'djyi4g7doz7kcot7xeuo7mlwq0v7tev0flezgxguregaqvtuwf393ycjm43znl5p3e8ewg3vr4zio2o3noeut54tik0wcehu8tv6g9fxxh8hdec4o0j830xdas3csnichl6n8cjfuq2lwmj2xfnpaysfhjta9lht',
                flowInterfaceNamespace: 'jay70e2783mvvhjc672rdks6plhqpf7vcj4tr3ntgsyjv6yr4t92p96m2qw8h76wemvskmy1sz0wmbollc8pf8ihnpijoxztwb318b80o1pniqpcfmks3edlx0u3ha0mrpyluwu3h5ragdb29502k1mee7q3n2h5',
                version: '12bypfho9w8j5xg0am70',
                adapterType: 'epouicyfaph5s7gty1zzuarwxqmcsfu7gdqcsbckurbilgy0d9vb4soxw2l6',
                direction: 'RECEIVER',
                transportProtocol: 'ajwmvce252fifpmj9clvm8acuqh9hhicsxvi76v56ei54ecliv7vt5jji3o1',
                messageProtocol: 'd84hyz2u1tdgljpcocu49idpke5tinlo85qn5vgpt8mdnufrswwcuvto5gvi',
                adapterEngineName: 'jzm0jkwjcegght2py2oqqrvcb6bg4gitdutd6wfijxe4sor6izujcnf7lk4b0vcojok9udcaldyfbfewxw2z50exxax9a1k2uavjvibkhl5axdcpduz4pay2vm2qch1x3cezjnb3t1odl06nno68cq6etzi2zwp8',
                url: 'yr4c3hd49tzb4pdw9in09bno1jkzzs5kpkexhkyw335kgdj2yhwm9sto9zwvw6v9zljmt60l0k08vqwfye8db6wsyzo3ntrdtqcr3kj87wdty6m4x6rap87t5uke0fpzq614bbuht8eys7tku7asrj4k5wxpz5kctoup5z43b1hn9chkgciq05431zntq317n1gj822q4biy1oi8nxzz7pz2cup0bxgidk0i91qxu287m7k3cqjwtji2ewuz4jjn2sa7x7vbpwhh9agxo417an312o5ay24ahxnm2q918afmablec36gyxm4nuuzsasg',
                username: '0n7fqev39g5pf8i8nsw6cpynenc15pcpa73976vuju6d81efqkblecpi9es4',
                remoteHost: 'xgqp7bfyfqxnpapkdtbhyhpquwzdfiigycnirs58qjlo2ryovb3p9ph4z6t0w2gjahr9q53ngamwh0l8w3jc37ayhf34h5jfietiuj7wyu4rvlg482pgga61yzozdq1mvnjry0dzvix29w6zeahmwjs8njqa9pbx',
                remotePort: 5098833999,
                directory: '3h6r68w9cneegbiz9535rdr6kaih6x4qudhyqee2udobkxoqzl5fcs6deix8p5oso07i7d1dbrvh6ekteuaoznfd7zv0nwxbs56x63r5rouyunmjpf9ua4y3yk6zycy3v0pff1yxsdtu36268ie84lfp7owdctuvcclmx0q2r2t9x36rm9tuz1rohnefuucj14vvsx4l5cf41988b836aqd50pste2i77ubl43a5f1jhx1i07ghovxbjyxpf4hbc1cypx24odxugoj78909pi97uisxmj3gyv5t1xm093cxvgja7qacbkscettwx3pzmfe0wrtw32h48gk93sp4d2adsvqt3pr6tikl2fq3jqhe6wqumpdr35yh0lhg5ybcqcyndp5lk3bstnju3zs48h9i8b6gkvsk0dn34si66tzh0f2qg2a5l7wev2nroim10w7r227jx8nunwp4xm6qol1owylt3r2g2a2aza987znik7a4s8ath3z958mltg15500r22r8ojzlbb85zeagj0ptncfv45yfi17pixzvq3lok69l6mk77q3m10ihkzf08jd8b2bu8eangkcvfalggnagr2r5fae8jr10p6q2dm8z9fe933uxwdkjl4124abpn6tcozdbry6a15xy2mvl9rmgcxke9bqgmes9hj2aodb5pb7x3pcqqm9eo53n66ik2j2d8mubtivzltgotgbs7pul0cgc49mnb4jdv0wb0tg2lb3802b6e4afqwn51j6y1m8swnjg7ggw3302c4exltzg2dkhhxf1bn5u6ns5wio9eow8ir5pfx4j2gectu1ehtzyc06vipk2diowlt76fs313qo7tac69i3sfv16t60f9f9gxoh1qlc4ebex4s83jzlkqrkxr6uyb1b7d5saojpaq1fn1fc9c6azdzvopnjcq8pd23l0goka5h6qh3jyrlhihic442riupm7u3vo9ri85i9pyne64aglwgmz7ng09iso590ll2dk9j89nxtl3',
                fileSchema: 'l77lw1t0e7swx499tvs280ia44vtimg09op4xeolo7keeugzv37yp665xqelgab5f17zijfwxlz3geyiqhrz5n4bo0t01tfv7d5sl89v2kg775lp4j6w52ayucyurceko4hm6adabgek88m92wdiky4cfcq8bia9fb3iktsbe3h8rrvk45ud0vek9c2tkp1nzeieuv17dd3fh2encmte2c7e6eti7unpfmivvkonmfruap4c0vhtbfpo9l66i3ei17syxdpxck7vkopgoaz6hgbjknq4q3fcxx7ljfyxkqhx3gn690mzvytfzv01srf86luv5j1y38qfo7ss4apaak0ixi7cfaaq7yld4akwbaqd8u342m1nox8k35fnkelmm9qxpnxglh6f87fk2wn7v0aij61zkwmouz9jmo1exgrwjco2t1gzgopjizbtzs8trwfeox744c2nulfpggg2ajgtfdd9r2lhbe01e4ajgo4mj1qadhultherxg2asihlhwfcbe17wap0iopv8rivi6yi4g4jctbggaaraa2s1wmlvlszakavrlqaw8erc9wra1qds2re96o6198k29gkgjp21x3c64ylt0hnr1s1rsqxxx0dutwtm8kuy224kp8g1e5m48gwpca2819dvxoihfpizjwdlan0i4bvthkhp56xy33tk328pui4hjp6jtsd8btprdqe8k6qiozoe1gzkmn5bnkdfds284tckwb77xw1ne3jflbgjznrmgjsrx7gb8fouw9d1rj0ambix6iwmb09efusuemqf4y3eb3l06lxobd7v89sppvlh8fq2ixbk9mf16jnyhzn7n6pamcebyurpg2em9cllqfwkbudmgab08qwtfgrjn3379na4ex1f2uwiprkrffmt32a10js191gskd3thsm01k21451g05tu0jyhr6e58z42ly2bg8jpsb75pwie9fyv1704ar9uqckyaqq0symh9s07w3i87s1tx1sss54krjsjn4pzkkl',
                proxyHost: 'xb1726jwcma0j9mqni74i9ke0b1vb3o7djoomr94tmi55q6ejav99ddfssm1',
                proxyPort: 6578340464,
                destination: 'fty3u097czk34csu238hrft1lanyanqxsuhxp2wftytmceilxsw8wvdpb7c0qvpzdcsg6n3yu07ve8zkycbzyccyua9zhgnd90fbd74yoxxgwmc9565h00komf8j97bomptlgsegcbo9xjzdackmu1wu5swah016',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '80y6p5harqhsiu3w55o4ovs8haztzt3389p89425t3er3vbin2gg9i4egqibywi7x7kfpv96anmwcjtwgagd32mxy8vhaqlqnhzj0vlutrm6ge65pwzu299lpdp8gzww391eplh0m21vww867x5ret2kexvaqe9f',
                responsibleUserAccountName: '6o1bym5p9qk0wis2i5f1',
                lastChangeUserAccount: '2nw6hgceptioyu46dl6t',
                lastChangedAt: '2020-08-31 12:27:50',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'a71ibkpg00mr7tubvmdltbposa6fm8c3sncss9zk',
                tenantId: 'cqcta9e1ipp96rinfnqjby2xrw2f77759qffx',
                tenantCode: '3hshdo9xdn3cbdtp3y79afqe9falas7nbczszdmfy1nrgjxvbu',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'a2j38et0c799rg0vyi0j',
                party: 'wc3wdoljvql65th96mkqjamov0pynn37yxwy90xk2ivmv4d8keyldlz77p68c1zt2xaf7ta5rtexexb3qn7pmwjy0lb6g038xk62i2u1pvbr5eqmhpnc162rws2n51xzatm06pp8cj9j0qqphcrxsll0y7u78flm',
                component: 'p496qir1c1rfmgy4p37zgpt9ivufnvv6dqn8gnn999fg92cigusi85skegvv5rknalsw4b0uxp4mhvtaimmnrxd7badhj7f1hef7dgu5cjuj5orluofiy7ru6l0swplhaej6k3yhd82vadhu273bug1rnk3onctf',
                name: 'g1akx79w892sh3gnoi8k0pk52ulvk557kqd3iziwiojznwa41s0sd8a6jzp3z3zwvr3lbjdwoeow999jc81d5cgfadbjr6qk6ryfornizhj87w28dh7918evdlmoceql9qik30gyu0hcmqrg9m4lb0x5bogj7n1c',
                flowHash: 'szr7yxbidlqetw1aohktsi9ma0kjfqhfpkmiou9h',
                flowParty: 'neyvl4eyaoctb3hjpta6e6bq15iutpr4a9v2xzvgxqlijik9dlbxx33puvl2rvqa0edpj80l0cvq0m6hqfuw1h4n8gvudkzaaqmbkuzjdb8d3oqk1qsseytnvdgftvec0w8qw5htr3cvcshqwj4lhujodqkrx6i4',
                flowComponent: '0p3shgvagls377powhngk5acy44yfv0xl2yotztncy4ds7l1gf2fgldj7hr28cr0hun4ddlc4a3ugzrdncis4rp7whlz5dwz32idorb09k9xogetw75nnnv2lrelcgh7nk06w9nc7dbo687jk742m0mfhxar71tj',
                flowInterfaceName: 'tvpqbasx0d4g7evw4og4oxf7grr8zdfna7m0qx0wkt44iknesyalfm2mkooxyjs4uo2swxptkjqv85g2m9tr65ez8i2h1kabrswabbwhr9dgbk7hhgr8fs6x0wvw08qanzv7yoinnoho7zi84fhrl89wp8uix9x8',
                flowInterfaceNamespace: '9y78ci3u8axo1n7b239reilx8np8repvcyc83qwa70vazu1j76cuc7jntm84mn6mfc2ek5883tpspcupahmx7jy3iqjoxv9m97mdypgmb7oguveh5jurq38x9uib50nygvjeuy71ux4cjxpm0kxycpamsi1c19hx',
                version: 'mqpxzn986yxzyc61bfn2',
                adapterType: '6peuchr2z508npfqhbxwjtugwkw27xwu7a1jz6uwjssyvnbzss3ybms92idi',
                direction: 'SENDER',
                transportProtocol: 'ionfkdlpbewafie6g8ymefm7yjq849cruxl4io1vp6q9wsgesh5axmtq1z2s',
                messageProtocol: '6uq47t1mpj3a4ertggvweuwv5sxb3s98xvfxcwgxcz2utql4j3ozgvksbkg0',
                adapterEngineName: 'z8t38y839a5olj19gsnktkct6seq3kuqttbq99sa8ncu4x1o1vfuy0z88xp1782ooquxne4hgdjmfrjg1dxw5suha2s6ugrxssaypjbz1c1zoepvjjabgeej70rjj6tbc68bainehnajh91btkz1z2nq6hislykz',
                url: 'zhnu69hb539nsoticbl7k7aslnc643lh796b02zqjd54xvgca8igd4ye3f1on0dvzc2r249fm9zdmls9honledsqtovbdowv06u6vu76o8aa9ldcy5jbktsy9lxyj8lhvotwf09jtmdgemlxldzvosw0b74470cj17agj4bld5iqfcll0522w1ml4yq6lge19am4r5ityn59kg9u02dl9s2kcemkmlfxucreyvyxm4h50oz3bs5516nyu56we1574xw8no3xbkcjh96pqrtlxz4byliha2fn7bpylkmk8s51wpaa0hg65z0zta2hunx6',
                username: 'xky6kv7xj35rv3q378it741ct4c4zem89uikbysp8enrcnaah93inbg7abhn',
                remoteHost: 'wqu74ictcwsgera89h4f3i07qn41nwphga7975t8m3x6yo0u1my2c2k5vzha46nqbzoav5iwj3hs66vwzd68m98trtu1prayf1ban07a2s9xbxx6e7pgsyxgjj1kvq27xfoow19xvkw53x4gdcy6qt541gaovyu1',
                remotePort: 3969439934,
                directory: 'dn0556z4v9fb0kbkavirftmosbfillrlo39oa4oy1fdecsx0in7x0ctr6bkkwdx7ncfo9t591o85wd159omsvx4v9p03skloohchom066d4fbjcm5pwc5udj6xqc0adnvl8z0bja5utfrtpqhir0ez5nje408dvzf77elcmalsjlhk9m2rj1ryt1tq83zzyzf38tuu57cjqc4wh9840gtygjd9jix1jrwjf3eoxkowzc3pwvvz4vdn28xwocjmmwsbvv95gb97bopzsmilz7nw0u1vlsu2hezd7nupclx2mgqpdcudcfrlsgpvnignyjrzjowuw7zi7fohmnsa1zbz86tcrk9bsqy85m1aufrk415vvz6s7dfgdni9pmmybq8pgfttb5j1e7m3krjlpdjibo6qfsw2ij48tvhotq90ktxvyjyer588n6anry71we7rcxv2vbeu2p75m5ekly2mv78jzhhlab1ik5pbs7rd3yczwliuausquvxcpxsmn4ojeqzucjdcwobzojhc3pyz015c1fd6hbo7cih4es548vhf8xaoqqaqb3e2dims4s5tr1349shzekkw0m2zzxlizvpqy8i8nxys3ek255d8fk5vtoxsx15buket11j223ttnqonb5j6v212v6g8rw6rh89m13txn57t5aowyc6lic8pg5xx5ooz0q18obindk7scibudwxrd9raw6kt1lg3tsvtmev53742xmkwvp868od98fsdgxi0yblvkphuwdfki8qfyndtuyhf4yug6g7qrldg1pl5yu2rm7m4ytnmvhf4jx5dwce0npg6nuqazyvrvgryr7yyw0a2yvwl95sbv59h2d5uznvls5k79flf3kflk28nwaiynyapsr2uro3hk0030uqws4nsl2o3eubi8e89t8lony9n605qf3ukp2td3lpkopvzfx99nutfrdwn4aqkqkgnfy5hfuayji6m3zj1gnkwtz5ks2h4y15rakqpoypvezmvkslxmpmw5o',
                fileSchema: 'x2dqybq0i63zgcqehqpx3fiu538u4rgigykzfxh9e5ws01rklywxb0ox4185kjtkcpt1zt2fhrcqysm711ig3l7z2ajzxckb6uov2cy0zf20xug14ppryxy17pfqj124xymu7yruzcqmpqmlqkqtc3kizg1625qrk5whzz28gi0d1x054uyi5bpey222pu0mt5wlictpwq37tewcccbb5xisg2497uvhg84wcoiex0yhnfbrui4wq117titcdp27amda8vtnsvj1bdicpihe1kyr0mhswy1yij66qvip7z7g3mt9eq5gr4o9s8d700zwnic86dag4p4cnmmw9vhdsomfgho2re98bfsytz8foq4h66feyvajnszjodmwx9d7t9nwhg782z1q67ghzwr0dyeepj08pm1whv2z9evwb1sb84k3tej2ulbhs8eoj7ed7exjkh22dp0cuwezu0w1lqj66atg7sgebiwf67tz79fbdpgtgxhgepx8ks7ahkm5f901rdf3hvjbqtkhqh5t8cfx1dezdf4ooyyvw6hatbv731m3tb6uir5460rhs99stdtai3ckfrvozyw0zy3xffa8gf9nm18j70cyyquupz2l49llkb1fwae4nk7ofq254djc9evgc95axvq8vq7u6ublmtdud9ej4cwe4whtrg3wctsfo2jem4gps2jpbsz6irmoiyq2fqexdiuxrag98x1i4x4uc3wbtvrblg5dygf6v4z9xjkzp4wkplisybci60uza6nbz2t7vxyarbybt7odf1rb0c2las5rppydzsy3f9rprsbb28truw7a5qkc2nht86l7trgu3nuzxrc25k399ih28rdmpw76sx75itxrqy2z3x5fcrlvl1nd8gq4h1gn2co3dwlye0dlnut75fvs1es197tbhcj70rggrzaah3h4jnixarjlezahdogzpfb11rivjj50r3pikhs4mqrsbazrbknfnrnwxhc847h0sdf9i5vv71mfb05j4elx',
                proxyHost: 'xp3zzonllhl88w8iboc7k4u4rbi4nspum7mxonc3chrbatyi0lytf05ht3vd',
                proxyPort: 9293707262,
                destination: 'ti8hk5yj84qtbrxhettc6ph1yplkp2jxk6yb0njyhz13dv4x73698yne9ig03ix480ccp9q8uossdlpk0itmxwpq7py0zakyrfp8rjvd8qk63igj73v4kk0ioustkpimdzk36n868y2l5mojqrn4o9nbdr36elg2',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'o9cqdra6orpnrgh327c7vf5408wtif97o5i1jl3h4vvgqqyfkdg7yocwnwswk31pg2zwnwxbfpj4fv8gpe8ufhkxhl1qz3f12emofuokleuzx23h2vjlh0h0gxes31snfkxengvie3oqhblqc4vh6abu1ccz1xel',
                responsibleUserAccountName: 'qidicqe3gwlwp6cmnt68',
                lastChangeUserAccount: 'ms61pyw0qlsd9junleo0',
                lastChangedAt: '2020-08-31 07:58:19',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'uk4qd2av6841irzjn968oodp9kt1brtq02tvuts0',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: '2n4kcb0wsoexenw419jk88yh3deyyvc7cyyk27itzzmrytnm03',
                systemId: '50d6hxy8u9lfznevjbllcfb7qo81te91h7kti',
                systemName: 'ldqyjjofcz64fizoqcfp',
                party: 'e7c45jhx359a0pd25uiscvfkgfkhx6xccsa5q9uvk9b29h0169su5k3n5xruahynv2f1moe0spv32nb5q5ndw5un3sog37l5wflhvg5twq5pgouib0n1a0anb8q4yjldkoexqy0b6nsqufqxg7wdq4vgwglwi2l8',
                component: '9xfacdb4w0gkqoduyh541jxye7wltp04jr7wyj5wsgeqdvjywqjbmwoq7zrlj5q5dklrsn6cjivlsvifd685jx8jjxswvd815htvs0i91maqedimohctmwwpsellu3q9v3vjgkbn7cwn0s92abt2u4xqp1neq2r6',
                name: 'ugt0ngb4dprt55w0lv7rh8i5rgxb955uynd7t1y17u7ojfw00b6tb1ywmwh2dnajzfk8ebogeainzl14ebznvo5ikgnajhythxqitykcbunwtjno18fy5qz8bqqwiueq6x3e8ua66j6zqsvyk465n124rqh76sc6',
                flowHash: 'q2zwa877pvdx29av7qbj6vdrmm3t1ve1mkkd53wh',
                flowParty: 'ytssunk1vuc3997m0fjso991mo19c6o3dc5nlotyurx6ueru3rubssri23a0mu0du8px1ootcqd9lkcu2evq7ozjcknj15mfvfkax8jy9vh6tpvo53ag0bqmdzezqq5tamt7rfxze047rd0ktq8p72qqqf57jnur',
                flowComponent: 'jeun4e5jvfdqca0b1y0fdst8vzjqnmu73c8lyq4wcsx0gwoloishsvums6ybhktnk0d72k1loblgf8nhx5avfz1xim48bbsesd2bx19nd4z770cd59k33oq1g174jl2qtb238k89iq8vx6dki6fxq3ty0yus392d',
                flowInterfaceName: 'xdn1phk1wcbqsjw08uw24vcdjpejbpptmjvk5mly3l0uubnmn7c5hmfeh8mm8nsq31m0d8ydhie79jbjlnaemguxtk9anxidoz91jdyrbav7u469eg4gzsrevcfkc962zpi9kx1r77aaszo954m99xhdaphhdzoh',
                flowInterfaceNamespace: 'aazh6mkwuhpueuggfzstzfi9qo1qcxphlmd6j0rfwvb8ipbme9b3xdchkexwxu881vrncu5z2ahnbxnnccuh92ki5d7ca38vbszuhjcy573vtw6xgn341udr6fzafhy3n4qd5d2gj5hrebhjda4y9gqwzdwc2zrj',
                version: '3tf0btwrcl6ic8qhtaod',
                adapterType: 'ygbihamc05vvpb9mrmp24rbq92x0vif25p8ly2nsilfdt9ac798kl5imszn7',
                direction: 'RECEIVER',
                transportProtocol: 'x48obi61ck8kdgtzrg7ngx2o3iw3s8ucbyooxl6zjqidr9017mx3mivyhphl',
                messageProtocol: '1puswehobdub6244l1no0j67lsf0r8qe1ux2ip5ot918m7567v4789ibe2ly',
                adapterEngineName: '1x7z7flkxrkmkh7dyq3u80dkwh17fw9m18oyl54dscefn5a2im9bmbqxz70z51hdqa0xt5b6x8jzm6ytd3i1fg3er42x0ntjd970mt5s773z8eiv2cpuhh72b02hao4wdbyrqdr01ysiasshnvrk2fu5vi6pj0yo',
                url: 'nve0emadb7ydi798h0lbruyhasshq1ocb9m0h92o7pherxgo9mr5h2182v1u46qcaxvbpepemnhzmgcm3vuz9sijx3pt42u2en2ol7qzrcl89u0ee04myrmamml3lw510b81vpq1jrbigwk060desl9xuzl6rrgcbte0h0yax36w78qjcg4sr3fyzpx3w21j018aqrnim6c648ugcqppozus944remwnlweq9zca1vs8ytuyyjcrfs28tqursgse7sh1yj78sct35gesqq7mlxy72oxy8xq580jj0276ww6wc9lbjgd3o8gfcmxromig',
                username: '3fdx18xpxpmukn6axduxcgjcft981f5090xxwf3kot89znglkz625m1pe84n',
                remoteHost: 'k30gi0zzaqulagzvehih8d02gm0x12b1k1mcz4x465n5q14wrnmqlhczmegnvlwalr1q8eg8p1j1g9mbax29y7tkcjp35ennilaok3detsej0l6xbskbv66e5x02fzmhxym852zh1jxpcjy8makmlwvay1wtsztf',
                remotePort: 1937351808,
                directory: '5f3iao3oh0pj37b729oc9rtprugvehv1vt0455qawlt7ceirhj9ivzh3m83f7vv2wicknkhe82jn2wce3jt7v3pdshajk61kbfnlu6j1rubzm3mhssxe9ri7y7iuu302ag20crjfzn8m5b6g3c4v2z1stfopi4y82jf8c4abt3m77csp24vfwa2rjomp2dn89ie323xdr2tde0m0dgls4enzkta1bfmyru5xrer06z8zg3ryo1dqek3q25ddeokdjonkrm6phzq2pknie829j4431cz5avoxco88rmtwfkdw808x53zcvnthxq16diqndw8tpvb2mbkzyq8xbbw8bs49knx12x7ve3i2i36cvxkuvslun0m3o2imwgrj7j6a8kmky9jgde5rsilrru4996ovan1nah2iquh6hbgt45oiot3q20poim5xtm7fn2hz4450pd0wjpdsf3dfrlckarw0rw2oxlhx8y89r54787tfb3wtgkqimfonoht8lt4mpgmz1v0dlibz06bo2ax5r4wyad61zwtpcsmfkqb9inoaflu2euvpyk1db2kjoi14hmngzqik53czl3pk7ui5l102i139osh0ptojte5m3v5h88qh649lstbonyc5ldz9l1mtex2pvo24pwlr82lc2twutzcfz6ev3xi5j35i579lk6e3ecfede4zs148sguhn9nrgmhlpk1qwkftqd43p7rftpwsoypshr5d6nnwqlo27tedkbofvheuughunrmuvmqewmzoumno51hssq1l9ceq7yr63s3o684tfndq07eeeh578c4w6mra5864jaoe18038qs2wwdgsxw3snh73qtkuai3y76mu91b7oj0zbs0qunfeeiyz0sfhhfkv1zocid4zf5m61vqqfe2ht3wvkbw7p87mwtr3pwwjgq0oq4o8qw41l7xd6lcus4th1i1i70cieqmuwmo52elh31qufwy7kt4eahgew8ytkb6m34lt9wenslx1ro9yr4nk08e',
                fileSchema: 'njtozhofvmt53k6hfz7uvmqftcnry4ty7dke9fg2lacz4bsgr2nt2p3ymlpdgy65vdpw1njexc864d9yekhtkgo5do0zg7tr10l4ou4qyuy8fe71ks17ptt30pr8wx8c337g9ato1qt5zs3ns5yakm2rdvh2esi7meqglu21vps1y80xhvt0p8zigo466r0vhh7brxx31r4pli18d1oaras4onz8ykw0o3lpo5nmavitm66gypikrl8qddaecbg6kutuvvdxebn3eglh4caigblqcks409bx6shqhzxrlkp72fu08bqmrcs8pmm8b9nbpwpkpo70m8avr4wt5idat1okww30pvzwhh1dla51lsgili8hoelt4m49iiwbzaagomvqkj2ycobf530497r06l2k1zytvyae79p3a78j38genvkbo5voksfk0y4ip0dkx15hsmkv1agixbu13impstl3jhr1u07vadlszk93r9j7h4mmwddbaabj680idqglupu5r7v3j98quzpiugxnouqjma8b9hiwtnxgb5ieij6b1743nvdyctkw62mss7ns0g4m2hmws9hlg92rad1a7jhch0sti790kmr6ac62n3k8w92h03n3jh3mtyxr9g5uu1usnz4btej9xwcml9v8dildoeuk6u0eg9ip33vgneu7yx4eclfmsfvb3urybtn1y4uhzd3bmv6463jeb58ywui2bqo74h00cv6ntkqp2ikn9kt1ufec8nfi4v2mvtnu2iaxeocwk8iwzfebjfkjw7m9ghvy3tzbdybmov0n8hp70zg735w6eng299ome0p4ed3sg1a7xvo7572621hde0g0zhiquddroficw2lmj2csb58ky0zq2u2xw1pnx79vcsf5gg6g49wanpn976iaczb75ulg03rbenyt4n5mz3o6g0qqcngtvdugzx18s0pd1o5azis80z1leuhh5qwqu88epxsl2r78bmbamhcyo1n6al9b406f1z7u9dmuzsy8',
                proxyHost: 'k8pil5c5xwpp7iak1vvmv264o8vqjedu16arydvd6rzi6n0971ofp50lww1b',
                proxyPort: 8811155123,
                destination: 'yl1cy5ufb6cxlyuc7cvb5rmlydmeurmtxmf8nbkbjpg8r8ghse2u45rk6d1ka9tbtge7zx1kro5lxpfdc6hu7x136fxvsvglle05n0ctfdvchnkcmlb3mq83prq4s4fvul7hkpi6plwoehmgqlbwsbjxlw2i4tqj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2j88kqczgvdcicrlzc97gtz8znk3smqjp2dlixk1fuylns14vwoumuw8zi7h6xwm0dqcta7zb33def8zd4ry16w9w1t9f9akmia3qfmyo6jaw0mle23jb8c1oz4pz6zwf1jcqee7u8zud702043vi0yxqou9433f',
                responsibleUserAccountName: 'b3jukerh3qwifpgjwkl3',
                lastChangeUserAccount: '6cpww8l36tiji47kbw5p',
                lastChangedAt: '2020-08-31 04:30:58',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'yyv7cmzqz14ahxv9wp46umji98949lzl175n34v3',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'rfdif1e4du0hi8w2wkx9no8h4qanv2ot0of453hss5l9xyh5p5',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 't58xrmq8ehy18x6w0jmn',
                party: 'kesl1t626c8xo9s6bqw8dgaot5a7jo39xh6rhnpgfaik5umx5b94vr569ala3qvc0z61iz9vzp1b02mmpsi3pes0g4mqq3e1209g2l0igprkc6pma61mo0uu2sp0a4sw7a2sdspveu6gdqf9tj2rdn8bayio8ep5',
                component: 'ian4q8ajmky23w2h5yzk454ddeza7k6mf0p6wjd0q36u06nizvlmzst3hb4p10hy1dqsem5en5p8v2g5sz5an1v1s18hotukv9p32au7xdc2l41le0jq4jfw93oiyzne5jbkj97q5r87f32udwhm3s45xc0at6bc',
                name: 'uns2naagw9lmvto5qur78wu5f65zxswp1lbbfgjqvq3e0gs6uzhxogcg6yhiutj7mwwpz8aoyqgyjpixg2lnoo37ardxxtdj7aar4c71kn7yt0s5b1twmq70pqui3imb0tljrsmrqz7wt4y22ut3kkqe1ha0nu7o',
                flowHash: 'd6w8hqw3jb4gdhjic8hp52hbrg5hns74gd5jgyecl',
                flowParty: '7kz9c2p7qkcz9c3osnb9c7296utt3drzrpryyohiquudaea12epz3h1vc7ke4op54m7527x133ege3pyaauecvqe5d287lvirjlul7rglqamyq5z6ss0d4l1i2mlf85bn7bktmbipcreukqmvr4vme173jgojnlp',
                flowComponent: 'bkrz63r3mi9vdpctvbtxywign07j0tuc9jhxdhwcon11ay7p41ljcht0919bamaxt3tgeppq70m02z7ulit3tbwnjv8k4jxah864a9d46v6y87tgysylc87buk9xodac9ybdvyfo52a285xixgggpwc9sdezm6jc',
                flowInterfaceName: 'jjbeuhp4uo8upvpfd0rof4elqifzubbl9wnl5odtbxpyl6xrcwl0g81zhlp5d5wudw1ob7vge1eehjzla913ws4e1wadjjnkcfdj2ce7m7blfkburwv1usxfaju1bh0bsy6fwn43rqz189p1xhncc55j72ukppl6',
                flowInterfaceNamespace: 'pgpzqmglkbuxrdcpi31byrsyxklmnzpa4nyq145emswflz2wkrt04qnmbzs2ssrv9fv0imxvolk98hiiqvaw9te7lsaw0sxrbp99pq0cx9wbibl6w9crgvrxnila05dbh7g74ctpbyw60e4grud4azmmw1ytnxp4',
                version: 'l5a40ykrtvj6nzpblc1u',
                adapterType: 'uantq5h148ttsn056zeuwjn3esebdswowozuixv71xlss71d3g67v8wkfjyh',
                direction: 'RECEIVER',
                transportProtocol: 'w3htsjbt0h0r8zoyvi62c9kdye7776du3n16l82nc6vip2h1rbbaaqztsnm2',
                messageProtocol: 'fxqfcqdc9nbz9lezuprla2u6a8fylz5yvvmx54be33h1f6fkdnaug9xoe51s',
                adapterEngineName: 'do66vn8bpq62lzh1dx0r8u9usi6h2c94yx1gohxej6ivep8dcoym8iam78k4rrra5szlqduunqh1go9xw8ttfi0o1vaj69dvc9h5i3u627r2esydsksm4rh69q5kyv55br4z8cyvq982g8j4a82todjdu1cbga49',
                url: '7l4klu2u9gka28u9j7wd45ud17bk9u5on0zznq32rtueu5kskwpgwwte9jhoyt5ix26tnkoyeonn9hhv1h2gy2z7j8pw0am2gm6alliq84iu1ngkrh7ookexonjkmwa2kbujbavmh2q957qsnn5nzipw413twgm7rp4lc1fk983igv6lb3s2hu5xlgcv1fgjovbwe9xiqcopv5vp0x5fd610jqqmca3vacy36n3cuzde99j6qyxs8ryabao9ph1x1c0lvu5tbpq0j6texxr66xev54id113h5u1zn20r1hk5kss3n7bv6a6lnwzwi8h0',
                username: 'h2tk0cdyum6omxzvakqneuezk8q9ysw2xr8jcbgv3zs8t0cqir211hbcjkol',
                remoteHost: 'egyzhjssajyy9hoese3adikskteh8kqurhi1r4miql152e8znwr55y60s402t1j7yh4o87xf1jvgxch4jlvjp29fxxf2ud8i9qz11gbgx8yp30rzi2s3h1he5h2y518h4jvhtq7cp6jmw5gphcnsp4u1tyn9665y',
                remotePort: 3622981106,
                directory: 'oh6w18v64re5odg733vi12fd4xo4actfjo35qrq8pkabjg7citio2z94euqud4umpnmba0j4cddvz9cglbvg74vd0wic6zq3n6qklwivrawecqlcud0mxgr7m2ixn6ymef7vyqu99bdslpgjw8a6qvcgj92qsi31dgcalgq19l2tj5e8sohguyn3fbj6gi9qxg15787h28ohtyfpre3i0f1ljho7xfnhho3djm7fzr6tqogaznzl9946aafcr07c0mq4mzjcqk5fw65g8stcndq7b3a0e6q27nrmyvtq2qgl845xkkn4204rig3h926acv43m8piuvckucb2t1zv5j9rwgco5vpj97d7lyu15ulk4eibdtsv4ku82qjvxhxxrebclgdpq6pchzpvcjrfsutzvknawoexgbr2wwwnfe5mkriyteoud7niyq14n7fpv0lpti5avokau2832lew2zrqfxtpgxerrzku0clw3tfwdfwhxjxsxnxvngpejax7yofsx92k0hytajmpycuz1hdgfl850yblvj90x96hwwkxe0hz9lxsst316164gpf9nccrsmkag5lfzod6wtfjfjoel4bk9rg6execzyep1c63n0vng7isu46miyqbvilal81rgwddbz9wo6phvv0k7vujtbchvcew61qpq4yknzoyzg164pls5xlkejpn8md02z1x4wj2b6ychzujrfqtmrw3cu2d2rhuvmdn32qwewmlkj8204kublzsd28titd9ks11a3wv913pxdf0xzax8u4cbn7eqixfzbj80xdvhhrfhbcpenj8wssvmyx0zs4ziokg2vrck6cri02dpspzlc6h73ey95yqw4k7xbjjy5tjrkj1npqgldhlk7rzhit928ilnuvzkk44e5ega35n3mzta65uj206jx0x07wowwcuuoapbxs3i0qgka642u851wlxpyp7ppj1hlvl9y3leg0xox6bp8tvvqll42kuhsbau3rd4gdwpofgf5ea2lw4',
                fileSchema: 'li5w28n09qam1okpibwcln4lwsggmvcv98xwwyse1jd6updpbbsqiqoubah5j2rv2cbcw559dn8r3jrr4wksrt01sp79o384c5if3fkx5iyl3g8ub6c8vtd5kdr4bqqianktn59ejr3gqh8r50tza3lz2pbjum9et14hdjwur17p57mnn64gqozm5jqo0hja6t31ua9gmrrf4uegmly7ct4j0xljxo86rsy0xyul4o1p1xsfpzeuh09ilckwb0bxi2c3nmhrdexvalebrxo1wukk9dcr3r78o62w72d4e5bxz9hu4lomwjuuifjvvqhmgces31bs4zm87bqhhl3ivc8rldw60vcw72x9l55fo086rzimfywcb57eejfgbajqerks6nrjz09bxkapipjcnfs9ohmsfms6b4lwmju5p6329x9pt2746xqjfpgulqaxiswc6llf76szf8pvayrym5k3csf7ztbrgk0wvzywtagzbv8vjau7u1u7cwjbdz1l9l4gz2zsxfjvde4syydi6rydiibc2tb2qjprqpsh5uodxtlwie5bzixfr5d2vu1sk6pbcx1ujav3616pt7fbr29lsmh6mtror1bhtj05htyk2ig3anzkvfjz2w1dko89f8d96uws5w3nt4p8sthabqg23mkfjpu991xoyeekltsonjwyxjgtvop3krrhvnn329k6bnq8jw6hz0k748wixs29ururdhvpio5ng6wlvfowvfjzufv924mzixlp72zufp6cqw617aj1zaq92jg6j1wurk4b2pve40bz7ha6t56am7wu4gg2lawwldaqwxj64qxh1326ekwpm340tzy0x6nhvltcpsi6zrtn70fk4vicjqzzlhmujw1ruh7b3ku1dl7zp8yiapkrbu9kyvlv6pv9psphartis8x6z30mp4l950vriji8alp3ga862xrj1p8bmjjn0b3ut45ijjwtojuie0m61y3qmot25gvt40avs8ky7biz011crvhxkl7s',
                proxyHost: '2sc10zmln2ax9xj1hq6cjyta0sgpz0bamq2n2qy761xooefjpas30z7d771a',
                proxyPort: 5526091389,
                destination: 'ry9indjwc3q8ff8gatds5489cp9u9by0u2ybyc3ym88y6tzznqm7bmpksxnrmvhjxlkmh3mt3azu9icz1n2ajuv3wap10oqex0ab68rm6l5654qso9akja8a873u1t1s0niw5oclboupis1k5szdyjc5hfx85pty',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'am5azfsxn1ql11jjrnl1ldadmctnr5nb7stw5m8l6yni8gkfg61tvwjk6xg6abomc0fuewis7k6bqswiim8uv5rviihcl06rj8eujoonays1hx7wlbywxn82aw2p2g8tslpwsew9h26w334rwe17oaj7wgh2ky37',
                responsibleUserAccountName: '3ps0okw6bunlikrrtpnf',
                lastChangeUserAccount: 'jmb6n2ckgselg9twja0z',
                lastChangedAt: '2020-08-31 08:39:47',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'p4yjetqy046rqmszcbvwyv36rw1md0ntjvcv8tjn',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'eg78mzdb2mqdqt9aflkegmdrwroyxbxby030de8tr6vtq80p15m',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 't22u9imhuliecckmbo9d',
                party: 'usjgo8d4m5rixzqyfunsy5c7w3rz7zj0u3cmirkpoed4ifkogn145z8kva0hq861r1b43ep25xeck2yw3uc7pd2dwekqeawtrrqfb65w8p5wx80en8mvo22uh1dcdgzttq3ul4o46g85i3rhxj40h926y0wjdsgj',
                component: 'v4m3uky8vfew3a4vik6ag3bne6qpc21049ttisvmzz7szgnbx86axaywg7simvtuz1fdyhktes3qk6zpa9x7c1k7d6c3jl1ik64ctslk33rbjxrpvy0yahogy7t6uaeyh5s1sbmxwzfyn6w89uat5p9ogiv23plm',
                name: 'ztx1p2dis5y8lh8cjn9yvyva1lcl9xiwdmhu6q2l5my2jc5e6zevwjn4q73peigidmvhjcwgoy5myn20v6kyd4frzl8fqhz49t45wqdvdaknh91c5sasgwt9dzhrcokgz4arzkrsq2dzbndtr5r0wks0gmkyqbdz',
                flowHash: 'pae3w8x3gypz39d2vdl0l5s334lnbuxu3oflxuz2',
                flowParty: '4q1jxsrvto7oocq9la98anqe1f9z7wduj7a7sjrsubtf3xukdsv3hbw7414ougcys0v1x2dizdfdv3u6alal41dq6ztgd9t0hvgd3lpq2e2qoq3tnigk2gn73cuozhti4idnf04jsqsvcj95nohru58k42t6sya0',
                flowComponent: 'c8cbbynl76c82585pdu1xdpw5pfuzvp4wffbf8ty5pz57mbjdzmixrtyjj6qr0xw6yrpzgixr99ex76pkuvfxepyn2mmr5rdzx4k8xio0glck4tikh67fdp2hi6jlrv49g0dwym7tz82fyv9eoxe1kpecviki2oa',
                flowInterfaceName: 'dn2gizt7hz9gv431ajvus7z9ksw60m3vsymkp72mj9wwytfmobqnm7c05d403plsc4fn3kz2y6h7cf6zinjp3zwh10f4bu76ypz2iyfrm6t7nwf460jyqcwjqgv7vf4bivzlruhny8xpgmtvy0qa22zp3d7xg5ir',
                flowInterfaceNamespace: 'c0xwg01ggaswtgx8itv76n7lpq1so97zheogwoq79blrh0djbmxayhir082t6xnmwgm6y30vwd24e27lyb85v2mg1jwuz8sw8bo56qh5rumko6eli4ysabobhrycim8qf27wumu0et0al1hfiydfm5tqihjxf1wl',
                version: '1acwf1v1a8tu71v7h6y0',
                adapterType: 'my5c4qwopas6qhqurf25ihmogsf69mner539bjbja3edqavqd3hvpzwnejtf',
                direction: 'SENDER',
                transportProtocol: 'utgsfhj05r8rmp6sx1vi9qgs3itxzvjl93351m8q8ei1x4iy0r93m6cqbte7',
                messageProtocol: '1gu4bmiemancoy963fug6doraxokkg5m19oe1q6ttyta17iomw8rne127tgl',
                adapterEngineName: 'jba1o68nzpwessxw8m02v76z57sx29g9iax1facovpqwx28sy5wo4vwgon0nf4y83v91pxy2vlc8759zxxwrf5wp1mgrbrbjh5gco8hprs9vx5wk9wga8qoeekz5s3d9rjqhsxz9zc8wu9n484oe2137u7uzkiru',
                url: '5mtklmzgu3v0glm9z3c5lk8a22eqz9jq0sy8qxvlnwvsjmjwb8tdcjt75k9btygazuwuqiz1ffpeukujq6xyhqccf77wcd39vczzndcxvdzzy90hjjoe6i0s2d9q57pf2z2e245s347odtlvj5ii2zr3nbujvetz04sdov75upvwig8q5q5geia7vt1uzl9nrg23fxktsq7bp6xz3cgpo49yrp36fn4hgecyljy2bru35jgnjk6cifz7poh4id2kibdf6v8tehfipyq7r3xbjx5owqfcb1enoij8x3ake7rxt9dgedveer6kbk1rmxn0',
                username: 'fdm21hafkofbnfuh2nmcr8b634at7oldk5jyuh7rfn9mjjmkz40kixipkjgr',
                remoteHost: 'xq4vp8wo0bpt2a5x6ri2kxh7nckulepr4hipgyfpmx089j9tljvz9adyrlp5aaw6wvn2m383cezdgy2bcql2vqybskeg357ard87bsrdfkamcdpc48mv8c4xoqperhpfu1frbz0bzu7qentukbq590lap8nu4rgn',
                remotePort: 7641616827,
                directory: 'ewqy0xtfma893b7nuv9r2b0ivgyj9ypyak57m41tm97gdsduw5q20pdfxklp1z038dixlvrsnhz9qmyqk6z23gjz6uz65zncx1n0t51rulbxteq6bf6dr8wsaqpukr1k8qj4q3mu0jlwzl6j3ior9c6dghbb1gy2w9p37iveroz7vbnkk8l01wopqx4jopzlr6uib16csgms58r9w04g9z640n13monrlitsw86wd2su2iidxsqtfyp2k5hj9ehz5959witd7k6b7ma2jyfe6hpxg39ydv99nwxs86v2yr2msg5ptocmxapy60gt5kbtjkfkozwx0a9trpg72t6higmi37wf4fu4lmu1gezyq99qy6hvcxm36ozzx1w0kmhv49uu98spch3z8ekzc53mb769dvmbefrapjqvnnk7clk0sjexxsoqifkf6r86yek5b4vnw0nv6u1r60njknkgeqvpskx82x2d5ld1084ibs2od1cztgtqiadtdvbtupgvh8bg92ov89a7vxsg4u491v4mv90n5q35f7hiq38w8d342n6l8ud7qujm7e2e57ru02mg7u46ludsuuw50vih6e5c7kk9910xsappd4yfc31hvzbazgyozb39k2totg9vt866erca4spnx5a486kh5ngtijwnyeex8folc014bqeiclli7vx70zafxixt6yc1c698sphdne6geecw4hbz4vy2kb1g7ko05jwygp5ns6kvlcf9s641fzsjeco1vqn40xpmuaycktn5cx7sgaa9590q6p5am2ntkgxcrs301j9r62jzobvqja6fuil0k8zoxm64suvr903jnjn96zxbii3oy4ca2gauck5o6wawk8y9lq44t1rmoj790cbokhr0mjzeobg30oqq7kxexj36juc2xljjlegou5fgsbdxb0k08g21m3rv3p9vgdwi9dh1xxuios3uyso6hf16wiazlnzkj33ote846qst6b74dsmnb0sfbw6ln5dvi945sjss',
                fileSchema: '9p7ud7hlq2nhvyumkmlw6cg415d0a42k0oitwket5wbuaaipz1wlrla8lltar8xgt9t2vlln2h7xr36ukzp72ba5m6jr9t2h00to90r5586m0ms0z3tl32490uy7jqz5x1ziqiqjq9g9zv54b3aqbdgfjz985867y4zmklcmq46hlpo86z5ntrra1l0mpb1gelpdnuhkqe3ftfv06ic12kbzunvkssowmqwopluehexycmffronexlaje79zh7ohznynyh7phe85j5jylrqtghqluzd6czjkr4blu0vfoaa2pw8y5ue5egs17b086mud2l0x64e3u3q7txdo2iacp7dztmhys83sz5e4fkj503gmif66123yjwhv79aghhkia871jyv8t4skfjgbio8hrlp0qxv5wt9f02cyjocgtjucdmbdzgxepre4ws6xmpj8os0bogk1ikvrlzzm47nqyz3q95jrj9q9bmt4ph8okh1j2n3eb86o4ex7c9t21ooccfw937r0eyo5j7wo4jpmerpoyemjadao3kpf2tp4prh0ol0psek7qt2p7d53hqspmgqob2eunchhsvagjghz1buigbapmkv0ij305kq1jdnzv5obvdpgkiqubdeq2qko60hir1a71iwjak44khpz7vq5bqzwwe1c22erg6nsfhkmk0nzjy8x3jzrih6pw5vly7auqyu8amry0fzui38rs8c8c4u7gew4i56ks6558wz5gd3lxqxdrp2xu24c3l3dmolxk3ya2uz3ufo4gd7zilik6mm4pjwbviw4xo0eo6zjj5liye8ffo13b88081181bkt3ix5j8i50sq4r6esnern5l9fq5nkulmhq1h7ii9kn3irsbjsg9dtydi3junl8lqlr2azqi6ffqnyy2r3f88mcah3nams1z4j1wwqajchgct8xun8u49bc8odkgmhqfk5rubugvwfo8l3j7c9giheojtogxnx9wsz9ukdka3ur9gcqdzed4mx6h59zsvf',
                proxyHost: 'm7ofsp55ni2wnhsh2tc9v6r3aiqp354nyxgdu0pb5xjlxkklul9n2zwfexne',
                proxyPort: 6162648325,
                destination: 'ztlbhwy39r7d453opdyygp1sppb9gi04tzkc7xawo7b374zwpgeumxl8n476bs52wlwcldiibv416xfri9usubpfxnsyfvlr9nf46no0iu4epkb5jreutcvpjrssm4zs6ug7i46rlykr8o2fn8ve9x2ieclzpw7e',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'xkwxbhtjoxhs5woxidbfk4jh9z269i7tgqazbrhk07aeok9zmflv0br3gadpmlby79tp0uy4edi0wsoldviy6i5bdq7m9prau0jnxv7attytj4h182agjmwblakd8160lnn39g1mkhgmse8thu72z0v7uegcg2kr',
                responsibleUserAccountName: 'fpiyn9hnmnx2eitrsxr9',
                lastChangeUserAccount: 'jzkfeua6ndc458w93m2t',
                lastChangedAt: '2020-08-31 05:38:12',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'x36lrb8po6i75c8m7i4i7ejmrmlwwf4mu3l8qs9v',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'd03dtph9ggzwgj92gmi8g7hw5trpki8a2gpg1bywycrz3zwtii',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'mqhkt8mon9qzihejc9urg',
                party: 'm0hx3zkdkh45ys8k3eqyakcei7ky6twa1907vw4s9p4nnqbtfwxb5t19pj6zsdo6rxbc8hqt7zw1461lpy6iwtkp8xk37mbo9z81s0dz2eqvn96d5k0mhnifcqwzs096v28277vs64wdglrbi0xsmn1vtdx2val7',
                component: '8yjtqaem58tyedpdguvr4141de3e5qtsyqu8lmw4doschp4qiahc4rhfbkmvuo9aivnxv56rdg05ok3r5fx659y7ir6r3xmz215fwd65ptsexqzoclzvfyx5akg1z8fhrbafo079g8vclpsr4cys4xhy1icz4ymk',
                name: 'n9nkk6anh8x3u9k0cl1ng8th6by9zu6bc5ha69n9o6kzhlo1oc94a60e1glal2n73fm9bku09o5m45ly4zt2w2aqgvnl4kengdqsdp660c6o1n1euzs51cja29jxok6r2zbdfpph6j4azzn7p496ax1dzritcmcb',
                flowHash: '9eypu45n7mtuab93pgnaft53ptu1gdhlb9v2nwy4',
                flowParty: '860m35ta0eok7860prrz1k8kn2ga5iq1llrvdyhl4an5mk56f0p86i8qna2010q6jvs4ysy5p6pfunpnsz29tp4tvwd10nelekmsfmxcepwpnq1i07w69zxd2yb76o98tuy4d37jubpwxxvcnateoxyvwdl6ex4e',
                flowComponent: '3f6f1suiqt3vq23l38m16q0hhr4oyjn8uyewdltgobm12xm2slde569780og2pidp6b1o2nswfewjndrrufd0n9ycrvpi1xdyvvnvcy8q3pxowe4zx8patgcz0vq46ejyt596buq0n4kxj50nc4d21gpo02tp3nb',
                flowInterfaceName: 'xnpvywve6zdw2rwx3cnr53is95k4hzam40k6slwsy7uhvt0zlf96kr1j4u1hb5en6ym19p9r0a6nzudo2iperuve29nd55df5p3lg3hrbdae4nft49ve5ibh7l4drcidobc0pgb9kjrbkilfk56b7gozaa2dcald',
                flowInterfaceNamespace: 'c1l7ukxl9dnzu50xh8zvnxzogw90j7lvlv9t2l6azm9a8ieiehalzwwo153kidfxqhoy0uq3lfkedlpv5tzyhl07aoz1ljgj3r3qg7exnz34hablivrifvf4afqb4co6dtlalnx46zxcyd4ynivx1ft09fi9edm7',
                version: 'fk14dx5cb40iacya8c4r',
                adapterType: '0zotu3suyr59mprkx0ybxge7p2642n90m5ctvge8ivvdrdmqshwvmy6wyuyq',
                direction: 'RECEIVER',
                transportProtocol: 'nitn1499jq5l7iwp3ejjtw6ktrtnlf6zbmtxuzcnnpzal3y19pnwwqaphaso',
                messageProtocol: 'cbg4xupw8spwzy8k18qscqaw4v66tcyodd4nhlxsnqunxo3747lqigln62gm',
                adapterEngineName: 'oyohhm7kea41ardmr8ybz3mk8lurhc6k8f68mkt1pp1jnsfmjydipurjtl5kuiuce82janehqxl78t0x482av2zozosk8ewt9u0i700p3t6jrq5dfl0du5p5zlk7f3u42tadoag0z9fexd815rdmndq2jesi583m',
                url: 'cwvpok4pdh50oh8sp6a83r36ei6zsfd7b095xlucbbku4e2ssg7bsj9pf3st0x9jq95me12deet4l1949d3z784n83jc9nh1jhys8bwp278pna0ppublwhsoypctoajz65sjgkhfqbts8mwymqc7j44mvfvo5byln2k30k9c77rqo3zj2gyso863s0wg3tjydyy9l4z3q9rvrl12k1fuwz4zs3n1k3rf1da7j6d5cqtv8t1qt2zjeutkxvpu8i30032n994jzsxfqu1h7cs0js2sb7d2y3fxblsbgdrtcp4oq5ly34nik3va5ct16zkn',
                username: 'jm2dkfjclnhu8dtytf5jj9p9eiu39rg23zfnuvw9xcupcyo62met4asasksw',
                remoteHost: '685rt17rleprqrdefeeeqw99sjorg0q9rfjihh5iqvxdvbrdhbwyndnc85gq4c9hu9h4fiycygl3ypcvl45zr563ltfnuljxyhr6md95cyuzc7vhty69w7hy8le7n3qlnzdcuittdtwfekp05xyat8lv5x4jhruj',
                remotePort: 6704857043,
                directory: '6o428erw0tqnaw0cacp6v62c2zaxku5aimt4kybzi4d163ksno9mup60900o7ls2rbcl9fyt67872ajr418631022fjuwjlvy7xt5uuxr3f0yl70tz7qozwx9wc16r9sjjqtmcomcan4ewf0025u7u101iu5dyc0cl8z6juesrqez54wt6zxa7wxb5bevv51hlu1y3i9nnyi93wzv3hbjtbms9t8k77eirn2dsqdii8sllbcrgf2xnmm7van6yf8ah0cud3obs230h10l89f3z9xggi5ycrndljio7bagzkwqdhk70i9fxnl8trwh1bjiuhep6p3kydnzu5snsqdzpqz0eah04qsh2lh3f8310723ijtoaz2yf8xxjgqtk1gqeuujflccbnp2a3qvz3nq3e9r6vpcf204sn5tj7dkzbt3ckzbbb5dqtggb6axwh5zddb4u3m6s9vofdnzfd637eze85ypni1s4w791sz6u3c3t8vrudc3u6rohtbbomuacte1fnp1vdnehexy1uefo8gxrxth9bnww7hco93kc7pxed0o5xrgbnivzuvr39543js5g9hq8srb7hiahwa18qvao7a21or4zqnt77dyt67fjyx11fybjn3odfgoighdltqnx94jywqph06u54qjrb5quhl7mokexy5x2dfyhekgj71q4oohotru6d8qjv4la37zhjlmii74g3ccwlbjybhgacucdpmoyvemyboxkq7jwnxgn70i70sbntfw1prt60kvubu2vijcz80axl41vqjl805e1vi19h0b8ruhyrhtcarsw21c7m9trrv7jyoiuz45uzhw84bkgry16mbdm7n4ut3dka8okiymkypjk933fwfc0ffjsk5tcr71v4qsvyeeao58ahpktbhd8lfi29ehsfdmoopa3mnr641zjbc66fghrj38cag1uk02oyiu3iajflsugnwu3odcd5uaqfdcyrfx2vqe2yzulq31ncdeodz0jsazqkifvxltc8n',
                fileSchema: 'l4e9ppbgl8ojsbnb1a5gnywh0yu6raf2sasogn0m4jxrksvk0gthne65963temajhw7dh7s3y7j06qqjl356wiw8fgczqgbsoj169rutrbu8ktkdy72fe8rgoqck5jf2iutuml3l4r3uklmvha64a1kocw02djhdsweqzcqfg26g1f390ycf3s2bpwe6q6c1hm6qpr7mbql1q0kgacd03m3eufeh6ufmgblmfqt6l2ivymcuzrix0rv1q5bxorr9qo8j3rs3srv0cwzlzht0g9ja8gncp32b0ny073aswae6epzrnflsg5k26bhyw3q8ulrr1kzmt6mx8668b78yhmc1x8fh2kwlcuku8tfpm4oi5dz61ezmts6hhyhgn7d1m0wgso51stnvk8oawdqbfro9u8rchio43lcib13v23dkitvsuxqv8ulculi58tq5ily67x9jva93orf5x3xed0uj34yt7nj6kfutrahch743qgtykr5uqb4k2hxc4blhn3vp6m7ab6z9samt4tzjtj5rxjrdgmnbrst3wylxxh9v4nwcqiaqc2ji9ewbj6i4mys1x2wim1deq0iibsdw27fczhjmlk8qxz14scotq4wj0b5qyomf7tls16mmv1u13yy2g24m28c36ncthlrin61z3x51u0xam2nc0h58k1ujiv3hix342i5teuj7l636winepiodm6zctwdh3t6p1rxha6iw9w9x6losmibu1idi1s48zj57pvx33mqbrgvm700isnbgy42p6n8pupxzc4nk47ognlymvldlaxuyvpz7zvrbtpl7014c1a0o8ye938my0bgb4ucfiudwh1slrwe3z1pxrtszqvk8if8x8cckgdwergkfihpqnh8ucj3l13idkt82sdkslugk33oj2x39mbdirartjrbgmi76dtqc48k0wvjrzbm8lo51c3mamugd24f0y44um1yqaigd1gpx7p89cedv3a7h8851ofyzsbb9vwzwds50b8z0b1s7',
                proxyHost: '2ajeihgfb99umn3q5di2bgjd11iw2nhnela018bgk7puyfu48bwhy54gl2qc',
                proxyPort: 9904108038,
                destination: '1ctd7qpehuiulp65zb7f5jsa6p85qaio6sprk6rmqf0psil4504vzehmzlxrf0zwoees8gl97bgczq5uwacahd8kkhwvjgg0f1mw1hhw3aq5l8itj8ag8lgw41o8hfpuvv64i0tqskjwl2sstgluwtmqlollxcqd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '79lo4i1hynhymc34pa7gwcxqz4h8bjx6etcg5lgk0n1r4j45xlu887r2qmkhzbkgvy5s2l1eqk9x6ijfv2nzzpcehh59yjleopuzd59c4cyx7cnjhbp5j7naz5k32392npsvpwgi0kcsbcg248flzzj16m3qduur',
                responsibleUserAccountName: 'mwaaqs7jw5nvcfrkl328',
                lastChangeUserAccount: 'lebuxsqptc35md66sqnv',
                lastChangedAt: '2020-08-31 06:42:10',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'hzdp5m0ya0yrk11abcdlsliu7ls1k2r1ypnm01vs',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'hgyl7wgrztugt0sdx948amvzeydxf89po1qtjm7p0kvuph753z',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'gh7fgwcqgk2f0az5n3w2',
                party: 'gzssvy83a6olmltm36bn71e7nfqlx1fqqigvjt0ysudc3xma1d00y4hj9nfxg5vo1671d97ymp9t5cjkqi4geqhg17yvk48exstirp27zg6560sik7evpzo80xxcydeab7m5ylzwb2wcf8a49brbiso78o9o02v0d',
                component: 'jq1e0k5b9v9i0o0z3shvz3yfrl41p5d801ez47wi5k5eeo4zcxx76qsclvlvaixayyj1t726v7bym82ivb5kit28p2aomocrzqnm013x3f2a1rovoy4sw0erzex34lkceq8c0g1t2u2xlstz0pdr75h3zzqcblth',
                name: 'j5h4o6snyy9uw17amz45le4pa8z8y6j12e8o8mpeq89fah3grns41nn7lbw9r61v89789yfh2obiuc70yojag4r2f55h3b317j42w6girbc75th9s734y9xzemiilu2jzovi9vo4b2we4kcu0cqfe7wkgrp343qk',
                flowHash: '21f64a544wca6lzsf97kj09z8e3zy1m4vrmmq9eo',
                flowParty: 'g1yn0yrircf20409s7b7dnhjhwu5rgzxknq4qaim11agexqk9z9fxnxue68xo47c90lzoa5abm2ka8zp3cpbthc3goxf0ep8q8sy3f5lbuyobbbbazo7d4vvx4ezv45uapqcx8rh3cmc1mj39zdb7cgm00zbbysi',
                flowComponent: '8mcnumrmzwcu2lhzy4wb6sfstkl7ob78vhiz8uq20vrsgahr8o8zk0w11yu7kdiny0olr8oqmkvb6lre37xjvzul3s3v6vmnl91e1ybfscvjzswxeccgvsawpi5234tjlpjm513f0sr7qw7zc2fdn3wz6s3zoay9',
                flowInterfaceName: 'fg4pp5websnkywegdpreas1rqp93w2uni1dy0o24u8krsqrv8xlbgrrv27i8hqx8szqt7jbgkgx4elv4evszoasw1d8gpfmensp4z12fb8i2dw31yy48lq0x4qxlyae13ooqsyqz4td9sgdoizxz3nfntyh914ku',
                flowInterfaceNamespace: '1gx1sdsd7u1900ok262ldllqfs172r4ob7743bgudhrp1hxnnwr2cd3j851l5o59xg5yzxe6hj0s502fr996p3kl952i0czufv4bk824g5x4dwzfnhfiq24dievgcgfbdvyn9qnmuj4p0opcx8vdtgpl2uiuv9m3',
                version: 'vpz0q0knb0bb418c4ocf',
                adapterType: 'rjpq0urc2ywgum7x29gbt4gccsgameyyk6i72zipr8g6dmeycpuvp8ck4xut',
                direction: 'RECEIVER',
                transportProtocol: '40gjkhxe1hw3v43d2x0654cadzl8focufhedp7b5a4m68hh49d6iuj88dptm',
                messageProtocol: '90lpk3nr8m7hldvtrb050rsurhvo2fw00mgqv3b7eneyzrohqcrsng9bm8wp',
                adapterEngineName: 'y0bi85y577a6o303exgmpyan9s2hn5x7sw335m1b87jrsq5d5rj7yj3fbcdlyvswkiu0shob28th1fmfoue649zo981ojdly0g6qrqmkd6fwq30xcjcnn7dcfb1pee3xm4q00irb9xvdj0bxupm64nfi63vaygia',
                url: 'zp371i1xklxgfcbk1ibn80neb8sw2w702f5lnwqfnvf7gdndkt42sv5igxqsb2phdmulqbh3sy3z9yw0dy47peryi4k2ukw7wd9zf5vhhk3j8sh6ajy2dlsmxd87171cwui3zckyu18jmp7yh6s7wyu04212ifxtfddyjjdp190rkravgaks8466qi88j0f2dor6knyzdoa8wv5j2li0fhyuefqufsb9sgni651uhnzbtfauf4hcz2pg5huxmriynuectr24akb944clzpsdyb0mt74f3nxan0fnsg4pr7llghka3i7youjwgejw7yk9',
                username: 'mhu6dt56up0g04zdfx5uwihfojq24v9no8e17wt550nofe3lrn56x4kd104q',
                remoteHost: 'ulfglrghxcuukzetyuyin15fsjbva8ao4xaj4e6d5h2fo6qmak66rdng2pvob6nfwx0i1rapltpsjdg7fkl6f04xqn0o2ytg6tfc9cu516t4zif072snb86kholbra3t8g4pjwfpvt5ufdbai8x7sw5i8liq62pf',
                remotePort: 3343945036,
                directory: 'gleesp36m3wtbiakrovi8g723n7qlk27dbasqazzwwoof5jzdts1mtiogqp0fsgpr2ku16edvag7kw82ru5h3ro6fpp9ruhaqwkesgzla6mvcxv95zcuwn7xxgk3jfltbi844b5ck5ejh850eha3f66czrhoocrbbrrkkcqzfasbkhzt36t7eejg4ga9x3ves29dppnogyanu14vctqbnu1gno5d2e1zhsuzbucbc4cyaczyfeqlrt7nolof3ex00f17b29d03obrmlahd1p332a748uyn039jxgnz37mq7bza4kohvmzg4qs35oju3pl0oxcoa9rwk05haxm0kimyy1rmt226lqk2d9jpnwj7akw3pmnquj0dml2t55vvdpkxy26aj1wknnjq63g3jhzgst22rqgpsd8nioiqvlo1pg5p9v5hhqwdu7rkx37qppjahag3ekf7q6yl5ll75m1wryzx3lfsp9h9az1s4ymetbej5j494thsbitacln75flqg1pqgs4kb3dc9ujkea8v3w16g50prdnr5qxt82jg6y1uv3g83ky4w51bwgxsr79argfly093a1e7d6bsagyovuogyty74cxp5y1dx0yervs9kt6cp9jqi0qr8iewd5cc9vlfpvsg8kgy1ljesaxdc9yma7dpqadbylf23tnswacg81n4isk5kj2toxvc65hwqybcpmg1h1ck7znnt5afmjt4y8jjhj5itrkf9o8tvgp0hn87i2xjsmzgxtm8ymbh06932fz7uxx7co53a9uzpebr3qxy01ta96suf0mouyqq7l2vhuo7sbocvydt55n6gqzg8po15upgx3a7x57qro81ym09zbhhsf6rmny4s6vn9cl3osy765p0h68h8u1yiavfthw1czbr896e1ax4zmiw88b7roy7rwjdi7kuujth8kzpo4l9d4jih10hn4ux5sgwwok5zoqu8coytlj06dmjwnpofjcz5fk1htjd0t2daxwf2iuw5bmw8gv6ay',
                fileSchema: 'cv8dsmjwado9av9z5i4jjfgf3f12y8ojqsb49itjc2qzu3yrkhnhatgoejndk2cc8wraagzrh2y3xf5ocfqyrb9qlbs2drjtejq8xa435jxvlu2l790gfd80mhatl04b1e31wyazeylwffnqj1j7472dz655o7p1ljr0n14lj9dki5y6ojf96b50c8j4qmhwj5vpzlgtc7797p6lp5ghsk0pg56z57fcjthcrj23nb7sb780u1xom9nmjxwsn1rxv84rj5pv5canysykssmwayrqq5ilwl1l9e3x42dfbm0f936obq00v5ucxgv5mczsdp682rxni9gkhlcahdgt2qibj09vsq3i69tuj9kbdsdb50dq3uc1f78w6ji6xxwm9xb41rli5nwm9094gu5bvilbhjcm80bvbuliylyz74fvgs1ipoefjplbx8hjwzyvmv911lbtogquj5j23imefo1wqwfgepp6g6iu0t3c4v3vjenogxsg7jbncowsqgm1kui1svuvta6nlnim2p58vak8jd7b7ba8pd5v6o7sf9m62j2cd58akyyyjp8vhbba94g358xsjj41i91xswn9a5tdta9yox8ekpxmvq2em6xav2km6goqfx4jzxqv2jm0pkre9on0oe96eevyc00ap2959fm7v2g58h15qq1z85u2fhxnbpm7ek9nr832k8a8jxk0xhh9ucwe667l0kojagp0369ozo8koq4bhzng8blluvm0r7m9t56ytmsa1xxy6k4t5uva1bpqwnh23qmnoacdk34nlcq9bonww2q4yp75riczctoygvo9tbb14f3l06571zwxtx2ctkufzlj7roy9o0gyi6ppp4zwi2wln4mhqasadkxfjv3xqpnya8jx020jed88u6gwiu83ojhlafbu43v6xp8rermfib2nk4j7yj3p4jevjjcjhrelpvwld11d6q1n4pf101wx1jbl7c9wp6fsvx43m7etvrwz2i3ixmh30wm959b8k3kliwt0',
                proxyHost: 'zg5p6qou7o6opm1h1zeut8g5r7lfi6y4ogcvuvcbcl3srwbyiec7zcmbxriv',
                proxyPort: 8824209860,
                destination: 'dz5y5jhkwpm43aywm6bx2lwg9j0vgxn6jx8xx3t1eyyi1drcvxok0687e6ypq58ys27pr015j01p3ccisq356zp239s9cfz8tn1224h2nty75onrgho57urhhh3zp2a02kkxcb340o352rbj5opar32ibcx309hd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7oupfdfl4uwqjow80z51na3co3jshhpjp3knlpv7mgfyr5pchhgzua1xzt8zlz3akiwsanaau3xytu272geb2zwbqkc61ktvacah7szr1sc9m8tel9a0imbrenq8xb8xc0nwcnt5l00lnlvni4u07sxxuchxl73l',
                responsibleUserAccountName: 'sw43sn17b9ii8r11s9d1',
                lastChangeUserAccount: 'y1ogufj2wzlk9i590nxt',
                lastChangedAt: '2020-08-30 23:32:01',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'jarno781ds4t9j2yi41oks564pnws13czgw5vqkm',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'yrcvq3599pacsgf21qw4nd6ur5n6eh69n0z0ud34gm58jujxkn',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'jx8sg4xa34e5abptyy1w',
                party: 'gf1p732jene4qtrmqazvfufcmthw0whjhzvixov0kpmcld0ldvo03nyit2dw6teyw9htf5xqguovuxh16ui1e170w6zrdsxp9lr5dtjidckwpicpcf3r2v0fm1c5j5t5hhdgzf5mqae06dd1um031mliquass937',
                component: 'vfwggw7wg5vih9du2c6akhgkjpog8bgujriccotgz92fr232upc8f0t4lq1t4wi7d7z8m9vbbtm0stuhxditwsksq6ypo5ameqdjm61ekda0cwksdm36c4wicgj8tf8g4bf4ayf4atw2kk7znlkhask1ijme25nog',
                name: 'dojz8g5aavu9ref44bo76wrzmtojh7z8cvrm805tqapp8qj58s7g69f17dn7mgr9cphje3natk8fjda920b0m3amy5dvieud5volfth8emsd8bnb3a4nq9tlys3cf2onq44zs06ckcz8shij419vim6vrmh188bm',
                flowHash: '882jpnhtt9csgx4c8nhtiwt2565xepfubz7dja56',
                flowParty: 'bysw0kgat9pkfywxfwnbhlylo03mvw0ngvmtosc7fupn5abl0qraq39k72ixld1nh09mtgy61amf5n00hnpc8iesdg1z5ostfmqc28fi66ruswa8tdeiwqpbniguav4m2wliar5jhukeojmq3azm3tw5b615ppde',
                flowComponent: 'doh0w8axozuz619w0hc4y342aqm6u53y68wrfgfqyva4um8qrmfv0gprtf9zs3i4a7v0fs0u8pbjk1j810evk3odlvoo5ttdiptu9dcxr0z29km65hjopb4fbroitleezeb90ake4cy72cir1venbw0atd3bhv7w',
                flowInterfaceName: 'aajpbd8m3qn102f287ujrsv5te1n8vaafshrbyc82ghwdj48jjehdp13ozyd30ff1r0iq1dr9jrynwzrvdy4710w7etsiyic6q0zwvzo0v36llf5nbeil0xxmb4v5b2298i96zlsky9mi94mmf8uq8kkakxj2sxu',
                flowInterfaceNamespace: '9l27057rcc5ckbxvn8wkbrp4pl0mmgurzzhxfw06xdpupmyyb84zrciu2cjt7s53vd9glsj5ci1ngso0c6er984vo4w8gkbfcxyyzdcttoy7ugle6251ti70wl0v95nnejilyvet4chtigtlg5apxzcil5quttvd',
                version: '40rgzsep3msnwmynbcyo',
                adapterType: '65wrfvfi4lpo4as3oy0zmlsjlu5nn9kf84kiavfzyx7ui38w8q1pnlmhw3rh',
                direction: 'RECEIVER',
                transportProtocol: 'a6ljq5cm62phchc6zp9ymup1adpqc291gaos9zcqffppyd8ju5rmxa3lqqdx',
                messageProtocol: 'o9x0yrfmqlq6b95qk8s6b6g166nav2n1uf2cxndhz98wn722rstlogird4d5',
                adapterEngineName: 'cy4cgxfrpclm0qazdjlyssyuqy6gnyscz43ajaefkdi29flh0nshaa158f9dfmvgaackj2ppjzmg0sbk5nrvtw5d1r8rgzncrlo54dcjd0i7hqm4plcm6seiss40t15jyb4kdcfoqvp7wjiknnvyjn9mpgnru6xm',
                url: 'cd5vkiwiruyhi2d32pf65py3wnvg0y86jo8gfrk5pqdawtvwiwkt4y5giywcah7nsffvo24sq44sxo6qqp37aofef8b8x8ytpui6ucv6xan3m2honj5rx1iyoaw0uohpaosa206vnq5r3h0phqi3kxr56f7c6tlw3emzldajetfgt273efhncovpycqq0bf5fqs1bxnl4bhkwkfi72ke73e2247ahoxcrjzxcx82qngiibhjyyx9f7qemwgj6m3pm3vci6cr4nnuh1r3cegoljxu8xl63enkcnqhx0mg507f2mveb52e38f99gmxuz0m',
                username: 'gvj94jjw90cna2aow7h5v1vm6y8k54kdvvt7jbutpehuqbl1me7xcjwxd2ec',
                remoteHost: '9uic6sc7ix1gk6ronqejcxij8lgok5be7iudocxb7l27026iktr50opwgsatlqlxeaqi8ij3x6vqxjess0fuxdauy24w7wjgvtog756z8mmgwkyo8dq4iklmzlh8mnsh4yodfoe13ndgr52afkufui034k79z5su',
                remotePort: 2993890680,
                directory: 'wenat1z89o9ex6ld3bp4bqp08g4l9fgs276kqkexv58f7vtd3hcukb109ohcjup0wi4gcm7m68omyxhkr9y2pzrt9c4jaf6q9qgb6df6l49rusiy9pevbnlw505507azp3xafe9xuqbq7pshi4up0g1z9d5mixjiysvgbqky8p0unw1l3x7wlaengea5gqjc3uoe3r4fjl4bkayalxihv06jk8vhdstguqeqb1bmqwvrhz0gyqo1new190oib4w51rdlt29hc8o07dxubm33fmnwcnovrp58uwln2f14zd2orwqg981gvj3j9ldmpl7phq66gjaj77ouy5g1ahst2g6bxu8lkxqhq73ora8osftl0bjebus1j90gnt66irjzk0rlzph27alyov7249i774yrylcd0showmhjxy8ncdjktvusarw2rspsuwwwwcj38nckun8ep3tifgrup0yf19xi8wqy71lvdu5khygwaywqcvftg2vm3kwuf622of5gr6wghgwrzbsz9yjehe43lmlkpfpw6lc26zd57bw2hlbiiw2o8q5piyh05b3rmfugppqy8is0o9sha1p59bhd2xgmgwcg6ewsdrbjcrw9ugmcjown897l67oo637114dijc2y6x7lr8sxojm7pklzx5e0cjd9z836mwkdh7mebuara5qhlokw6rvfnvi00nccfxv407ktgjt4s0j3k1p3rd7d2tr50rw7dv2aymuc7odtocw5dp8gqlhna302bgnivl20bxkruacdbvmb49x3zs3h1z50xd885aln8z4d989kf1aly48juxyqne309n0j6vran68v1yfwtcfmrzmatxlc9ex0csnm7ir0nux14iriyr58v20uutvuyyoeems1rcbgpy35m8kevfnjpz3nyrp3r63xtv40phlf6bkcdvne2r2uqo031w81i21mzd6y4vz9kv6eeig4eedeifxz4z1f5mogpi5eqkqx9764x3enhsip3tqszlo84fx02jfi',
                fileSchema: 'm3elvgohb7231xpb8nn8jrnhnqsbifnr0s4f06v8znuly3m8woiij3pax4mh8tqjephe4ekzrybac7dvbqyqzc7bltjuth5polf92z6h6eund6jqyepq8ipvlfqrm6hyb88sndh9v3bnuv5ob38v1tlwt1o7xld8mnnmyelpuyjxbgd8vgwnvpg5vz92qciveeuih4tej3zux5om9tklrhs87lb48xxi1am0pv1a1cl5tabq806ep0f11kb09tnmgnv5wi7asll3rtto2pzqxci8qd98u119fh02kdsa2afrp4farx42gubcw69prulmzjl9tzem2hnpwqefxq26f1fz24rj0gi5jt54835ci1i733pkwlgm9ol5g0l5142q8nd6jkl2vinkz0oaza7yb47krnttz43hhmo8ys83kqtz7f3dk8xdrgl4m5ruro613gbeyvb3rnoed4xn3i36kuqdkut57kp45ma59obvrjus3owb5xckqznx8e8la020pzkz9oi89nh83i4iay8qaet77atg0vqokpup65jpco020li8n4uhs7dhxkzbg8uzy1hvhsbrhvwtntnzoj6b4jxqiz26u6l281mzf69rd57jjnv3saehremjxkm1fubghwt0xkyvm89kum2fxipgt6gh2w8nxaq3lafpsefygqy28tauszc09hhul6bv6a9m5u653c70oaiewmzgdmxooxmi8w28e9klwa8s8pk2tfum5hys64bj2nc7sn04yhx9zswo0tk2icj0ltpkpcn93rxwss77by4hxfcniiox77wf3w4bqrimqjpshz68c5k9wtesxd5hr7cnh4dng54p299ur7db6na5yl1x1h31f3ut4b1jloaev1jws21p3jqmexpl0hccm8vanvfpdcjqbxdr74h2hvo8eit1w5cavfq0bt5bzhs2az08g95j216cu0sifx68wb55noib4plmbtruujbe8zxt6k04sseqfucgxwga0y25d4n81odl1pkd',
                proxyHost: 'd823y8my1lp8gl4ptjc3nyxp4i9fhe64yonrwth7fhj7eojzwl3br606qhgo',
                proxyPort: 8032434911,
                destination: '5937rybjasbk4q43nj8mef3w3xjc2ehsgbqnhyomsh68sge2nopfyorm6kvjmo0f6ch2rmnqgynhbpsfi60203we50tsnh0yftyn1b78zilzks2j6euyx4kihhqkx0mv3bgljv2o2jir1d0qcvym6vniqahcz8i3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hlp0yfh0so6yw2ex0ow9fxter3pqtr3bcxuabb3fzz7qz9f7gupfukdkonx6xs1430bpp2i46z58ncc2yreg3s2f0yi9h8o7uzo8jpcng8lumh35grbltby6m4uv9kqdtqv29pznnxfp54zf1zgmc9sen6s8vdzp',
                responsibleUserAccountName: 'q0tvkwk9gdf4ht976ecn',
                lastChangeUserAccount: '8curl8muvf3vy02krpe4',
                lastChangedAt: '2020-08-30 20:46:01',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'ftytiklk0wvg6b7lfvk1fmsxgmwgcnt9bb5p6xj6',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'pup05elrwja74d7ymcqauexjfcb7e8mjfv0kxq3eh8yiyzrzmi',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'mefckwqd4m3smtpl4pfj',
                party: 'ym2w9icjarmyhj61ns815fo8kpzs4dl6c7ay4l0vcicaixwhqzj2nz5n9sztq6z7pwjv9p3zt5z8ergryv1i6ht950z2pm6li6lfyrikp0yqe2pv96zojmkxnpobxu9zbqsecg0rqcek69br80x6se2w6wo7e1mz',
                component: 'xxenb1gju62i4hx5ml7rtuq2pfmn3ay844tk3hkmypaw9e0emnkrpf5pj9n655wtkwlhl6hyv23qcnuborkd217o4tlith5gramy7vaqdqdtrftvs1fflvj9rlffryq6uu8633qi3h56ll7gyjra5mom4syrmc85',
                name: '46xk9m46v3c6pdbnl9fb1596rpx5e9b3y6o9s43pjen2k8lvymfos2y52gcfwt9dh3avv3tvomyi99u1uw55bcrtxdscox3bmhnpfn50pa4yu8akea4v9paemruxa5mob1082lwq85ndu9jocxr91re48tcyjcm77',
                flowHash: 'xxv1g2iwfu0drcvure0uqlijbp7hgfxfw03kuu8d',
                flowParty: 'emjofy12cb97n9mp58sflsbprn9amm5bs789hidc1r5i7hcmlvsxh0mt7src7xbdxyp3r00y1lsyhuk9wuk4czd02nmguq0nae90e2he1ld01j1odxbfgcqbzbxjehc3l5hbs73jobcrajm1c9q9tabts5uiiomb',
                flowComponent: 'j0llkab1p5mrsgw5ivvyk2hpmu1jjq458qcyij8pfck4syv2jlrikqn525ib9ir32agpt73mwmcnfl22zlrbpxdbao4rt6r5s03f779p9c0askgyp9esg6ugoij6uzp2njeuwjt1fb51cdj2tu03i2lgt04b44vx',
                flowInterfaceName: 'kamivlvc8yzphmjjivulmskvefgvrit9oavp5d60q30ikdo2v7uz1pv9ovj2ipmtls2gbdcjsdqej80g5n7h5chy0zfcnmrwqu4ejb376dtr8jpiwxvjw7o0vppaeaiq0dlpwlan374fqgc6pctu4h0t76b3q5jh',
                flowInterfaceNamespace: 'e9d3ezq6iumcgjdsu6pm1iwqe5cdebvaag8eam0w246xqeslpka2s6w7trhfyq7z38bu1u4y323qu60hbphjk6nw1s8pnaock8djzk65pblvtdvri8ak2ai5rvu4z5g65q6vggbkwa6ejqhjsesx54glb8jxtjzz',
                version: 'cce8sdzff56z9mche0xj',
                adapterType: 'g4wr4mth8xbcvqrmkjnpdwr1gdopc88ey5ib1v3dn5miilqv4s9t8le9t2rt',
                direction: 'SENDER',
                transportProtocol: 'ky911f5u9s7owjxp08ga6ftazvlfjn66hwtwoidqha4xkof0vhq9a2ak2e66',
                messageProtocol: 'wa7i1491q2zc5k6kfki9xu4prkfn0242m7c2vixjfg3qalqybpgxzs4fsri6',
                adapterEngineName: 'xhl6pj0f3cvitx4ft61erm37og9yy4gc0bl82qtlckucbozlh7ok96c01oikrsb0b44s0jhr2qkb775z62j5joz80g9xuhxe8s6bv1nn82ujixjn3ofd5uuua4efyxbaa56rf9m81kckfqujdc7vgn7362i25rml',
                url: 'oo77xh345uifq6ebe7jbttfcqjv6hcc73ua0k28zye4j7k0jgfsq5844gdmgq6pi3r9z6og9q5drkhavlyku8dfvd5dv9ed6hp5ih1ncmgs8xv9f6iwylltkusm6ir3efvqo77zw55xq3mfzx6g9ybav7334i7lysldanlqxf280ojvpbraikztmekdxlbfy6a895ub4ew7a2ynfewgxjug4nxnsdt35b65586wbva168vw37p4q23bcvr8jogr2pj7yf3k8kfilt1b6oqigbtbjxoe4pb4afsngtih4uov3dgt88jpee14vb3xy9hab',
                username: '49lya5khmaz7t73qtheijnupetayqt288rlma5s5sp5um0ipt8boxgjwjk73',
                remoteHost: 'wis7lxqnzolla65t9eau4yaees0puex17vktmt4ch6ck8uswdtq1k3u4rkzi0ixsuuogi87op7459xejl10a6w4008nuxbhm55eahja91lf1wjf5bwknxgd9ozm240jn4gepruhot9j7d0inrvgq8ry3fn1n4u23',
                remotePort: 8953078397,
                directory: 's3ji9ebym2c8efk8j7u4vmjawo3iv6pdhda74m0e4sduae592y21hwt0e9wc9qh07twkflsyecrqjfrlp66m4o9xrtl9avwfmovw3khpip89yqvw0gbxxtj6ba5zjc9r9174ox83asp5cpbzhulb1c6x394rxqyghdakqoo2ifs30wddbdmijuzcgbw8x9h9q319gbaamn69for1nt3qtcjgyjz2q3yzo9yqbi7xjx4sgdpwj125aiw4jdmndqx044xo0codlxszahu6vli1lnbholg8smmy706z1wez4e7jn99n28r7aalvgp1boa8qgtpqxrq07l4ms7fhims5svd4y5h40wpyape2d5qheetnfkoz0sz9n7fsz6eh1tgp7piimupq0gqw733jmnrwezwnj4zockbbh0yrzoctnik4sc12kaa7dhhbxez4i5i74vh64bf0l3ejed46yo9ihvv3ahcj4min7ho0giykzwaemu2s6la5lawqbojt844e8ewkt20wbvutcaosofsmay1hyggln7u38axv733jsde8hc601ws1cqveb0e11c18cxpx1mj0gcqfun9yfpn95q7kl2zku2kuib7mx873gtdsvv3y5t4cc39fcy2prq091q73kmnj0kql64lhk2d89zwil8difaef14wledeeui1reai30052etzzek9w60vif7q5nyc6hu173t12obt0q870kv60m9obv522jmtrdcaz0301d6nsuap87leycauhar72uskh1d30i95267e2a03vukqfag171mvmzkngth9fbutnithlujn8sh7rilke4aazb6oyriwgjiybrdih6dl44v1kqd42tblbs96hn0tiq8c99c4i9qb0jonnvgyvs53epr1e251udhkom4gcotgb8u8ijmf0dzxq8wzz6f5mlwcuvt0a5y6k4yqo4i9c3hstr5nqfep2i7m38h9j6jmvwz4newahe3ffek9t38hpjtuoszkt33bb8pu8w6s9',
                fileSchema: 'wqko4t5m9b9dycx0q8r6gsmkufiythxswwf121o0gon6g4bv1rg3wdorf6lvsmu19e3fqjrj8lcl7nq4qi51wvyvy4uoa2xrttyy71egs3ist9qtxev4ukmsmpgyx4fet77jrhzb7r8nu0f497r2eq5gx2pj5ihi4wkfe4nctuevisb1k7b6aj631sdv8qis0zelxdvccrg56fr1bk5lfgioy7fpdzl0hmvgka89x364dlc5gieknpntmsswbb3yr3sv1o5akb9725yp6x0xx3mhftafcxlbobd7bpxnjrt6ju2p1rcvnus5uo4sklpmaf082c6plb0bg1icj20ww8yranrrh4fmhxckxd2iqf2xfnteyatoijqedhho6v3cu8ssve1eem1ctqlajzbw1f9sh5xtl3wboo99du0dhu7murb74mqcjmmx3zuzsx0kxtbpedxfwm5g9aee7c4k4c585c3eeu6iffkonxjwuku7ux6u3tfvjhvidiw2fdm2nzf3e5bvebxdbepz79tyg5l3rlnphou0vgqls9puhp8fueb18vz4kbn235c3suriq45sz158uo5pqrw7y9ls94sak38lw7pwntgpfdutcvluo7121i27kut06n9esc3uh5tpw361f8d4iklrtfum6a3cegd4r95gxx3ak9bkijm2dvsgan1tt8chzxanf4k517mcpkjvx2mhcsuicn50needpwzghvbitb2fwbvanjwbcnhl0muasbe4hgauxfb3fkc2gsgi0k58d4icnn6ww6j60y9hhrfsu95py1t0xbpev857nztt55i3ejkncwqofqnu2u46l2o3vjztxq3hutn9rph546b6hxv07cmn02ym6mta7ohgg4cefv7e5n4gwyxkzxpcmixapd07brsmk8adlwo6m53fdr9spa503m6m4ua6jyxc23un0kpkspgp89pb5ri3ohos8e12v37roi1k59mion1xd9doear3079l7i7hif29wexis4t4lcmo',
                proxyHost: 'wdck702s8ql82sh7vq6pj7ru1eqac5thueyrqgysxgb2xaovyancaqjgx5xs',
                proxyPort: 7797268028,
                destination: 'wmq142mz0ltmmrutzyfjhyc8xev8kf34ncajsoti99xyvpn6otvbvz1w4m0cc2r99wj0hv9ggyxcch3v0ufsc41xiuetxig6srue9987405r65wrklfyd8mrjfp24c7aoyal4y1dyqatx0o9hft4yvgzfunp1ppq',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'p3mw9hjmpjy59eb7wlu8lnrg6cm6wqgqh54rbma08ga4eufl9s47e99zvuhd3m0joqwcyq6rdubvuioq7wojyzb39g1juaqwyad7t9r5ue8rlvzqa4emkxebljsubuxpzaefoz49mybs4z82wuga3ca70ybs1g45',
                responsibleUserAccountName: 'zfb1uw5f5jd0sgz4esb4',
                lastChangeUserAccount: 'fdjy33m3sttm9n6p8zdj',
                lastChangedAt: '2020-08-30 21:48:07',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'wuhwb1e0vkfgtxlgwiej3dav20ivza20kgsbae19',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'rc4dzwm4kc7uicfy3cy66o4ytwit0sy0bf9x7fm2aj450jk2k4',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'bzgo5ih2gjz2cpb2r402',
                party: 'xlzhdt7z2nxlymfozgh3olz4jljavw78s08trjfa4pju0x8gttdpb0bwv5qej462rfx8tjfzmtx6vfmocfon53b07ljk5j8g5ts0upl6ga3cjtf71t8ulppob9aqajd0uhfn4178eads8l302y9j140g7p6hr7iq',
                component: 'vitpuqo87lzdeev591d06o4yh7kk6am0cta1awq7x6t8oz2i30zvllmqu4gxlod0h91gclgt8ws7mq8j0pw4sil29ev2oj065786aaupp0kzdi5g9mcwzq3512wfsccqywqglg5g2nsp5mzbb838yyhlc4crxadd',
                name: '0f51dlqtugyex02uj9c8qq0g9pgu4ah1ax8d844174m2g9tp8ccbndfh7epxsroubrtvqmoopu0gi1vlm1pd8112kgk6c0qhiivgooc6o678f9y49izk6e20r4xm1pazofw8jtn90prk0vk0tsbv34cm8quf5c7u',
                flowHash: 'g3wf4uewnbpsrk6a01z4fb462lolbqzyj6e9ux72',
                flowParty: '70h1ve9wsgtmc29ay69y54f9k91bto7hxp3m5ewbvy4kg5blzcgfqbp1n35oj5u7390s50z29zanayia7sr3dj9ni4djyl4d7ejwnhqra1jrsg00a5b4uyfbsdi0qhs8963gmvrd2btg6ztan5upbwxdpx2hu9v66',
                flowComponent: 'fuco81wrcn72c3gnqm89tymaks440etsg9a51ye14a2cokpstvrqrspqvteoy10b4bidj7ypfp9q4theotvttkmxs8lg6n5x4ax4lfkpnwax793e0djc948ry1grb2x48ifx13mr30tezeqvffejhyo00y5apqhq',
                flowInterfaceName: 'a8nmshq7d4okyd4iq9elqc9gw0ombtsqo04b22u7q88xxijhhqynfo9iix6xyqp9oif2wukafl15zl1cwr0pq5nvjdxkkbsssf17dz9bluun7jmvcnoir4r4wamw8ymme7kxbo00hkcqqxt54ltw9it7b7f6lhsk',
                flowInterfaceNamespace: 'xuyminh3ihb4swg7rnclbk37ua4460tvduj2bfw6eleejrd9althmk2c3az9zsiutt3nqjtbgv0ulv181yzcaugncsod3j8x1mhrzqlposly756vz5j7bf1gybwel3ayw46u636y52ic4m7pirsuau3s15su8se6',
                version: '9gwbchox9sn1l3xh0rus',
                adapterType: 'xsr4ue891w427th2ozaa8aopiuqb970lwmxoofdr4ribk4qnrwcgu1xlhtz4',
                direction: 'SENDER',
                transportProtocol: 'jy1soct1i9xg3lvg96obze1ajz91jr45dxorrhc009locgec4l09o856dn0v',
                messageProtocol: 'q5q8qk2a2rrxbgcxe14jkq5zk26yjvo82vqegk24ditv6bazj2n0kqr4amlm',
                adapterEngineName: '52z4rffmplxgzgr4vsc6fiiepg3qcecrdqaz94o1f97vit33d73x1ul6tr786uibvx6dkj7ddfxjbr8oy7brbgmcq8ftfq9888gh1cfv7ffxb42af55lje7q43xr84uucii3a4u20rhab7tzhz18a8eju3lv3mqp',
                url: 'oosq2z1uqjfzsx1josslmzz31dr6mobupf8bo1xylemgiqxmn1n9p5dlq8tyeyjtusrxj84b524f1fi94c2cwmoxpgoptudfts15k2hwmshcpcisk0d8csy0le20rlzeizyl9uinzpncrdy9otr52ryhom21wvcw0bto3pcd4ennqlrw3kpna3isnt9lmyycw0yjitl6cnai9cdhh8r9vcv2m0buu9hxe4j1c5e6nhe01e74b2ei8xxe6uc9pa7e9hkybn1ib7rt6wdnif4hu9gdn7urvue5pnp1bfk9o9db1k1lxuwn0jyt893dfhr7',
                username: 'ipz3o89tazdr84o0j2ueeccfbep337jxnidsqfb4s26fhqeu0trwbmw8adji',
                remoteHost: 'k91yssgpv9ksoh88g2ar0trs2o33qz9gbswbb7viw5gtpjr81xlzlfvxxwable5djbqxp3kn9wwz992fevrt7kp95bs6okpouop1lawbew9qkxak7vxyth8lmucshwm399rfm619bi9dgdwu3ekhdf6sva4xssmk',
                remotePort: 9582655658,
                directory: '6ywj40wjeeaqe8oh6vsi11b5tpj3xgqk70qexoiqkfuskrrwcwq5lqyp8uyfyslz78jvmr8m7kreqgvp47veufxnur400dojoebuhwjecgiqwm4692av4n6kptj75pqkky4m5vhos5przkwsouvk1bj6rei5mepdlfw7aoqxpyje17hnxomfysct0xmbq45gev7ikanzrpoar2eu6ur7mjeutusnu3bo9301gqd0z9gz5iavu3al19stava32k2r1f7qz5m27d1q18boojnuvoeh9tx2x2c4wh7rwz0kadisd748cor96dk4ii4warqy1jsvkdepxiz2xgsm96wy51eppo6c75hbvv6j3f1jk26fbeob1ek0tbpn7ufanq36hylskhpsytorggjyv7iv8ecv16nso7g6eqfyx1harxp47qapu6s650h6gr3jh5kf1okzpfii3h4b1yl801l76vpiju1rfa742lu0a4mzzq5frtyectetcfz0ff89ea4jo9cb4kj4tq5t88saz15t1ew9w1133q0i2yegnsphc1eft1e0b43e20ga1ncfa83qtp3uvygd9mzddlta2mn0epziw6xnxeh6acu2vqx703llr9vpz4hcrcgcn6iv6yj2rycyky0qt2sf75jhnyz5dtr96ok75aqwc3m9w5r6ye39fagore2lia7lxtpl1hqbs45cnn90wcu9vqcd7fd4g95jwinfe3wm7nik2lct02xghw1h6pu8ruu4on7rwi83moj6njswgs5srlq716ify7ggr3cj8rlptzobnhu8kn2frbec43mmx7xd0t1xiaaa74h8mdmblz36vk8gj77nvhyqdztt1nvo65y12vhhhtvj7hv0pxb9fo68jcivvhuzbvo9qcqiiohve92k5m2q694ag4loziqlsnro2su36k82uy7csqmbgmvra0zt1zubsfth8e5jmgsju7bkxxgcvkhp6rqvbrk3i9pipovv1w5i14a62ss6i8x7erkaoqw3',
                fileSchema: '6hbfcti0xbwh9atpuqltrieanr10zsg6xuq8unhkvjjhlvg0ke9mdr8ndn13im5r8uxasze4b2yy0sjjhswmrlikce0bk02lc0umsng17rzm2hgq55rx7z98l3h7x4r16wj56rsqqn4tdbtdofz4dvro2r7u6sxcbku1b5jrw63ce7rjbzdha1lfblmzzxus8qi5dceoxcja0pohjbh3ozczy1ufixyveyy722ujo231r0q8zn2qmgma66ucmgawwf9cu8gocaekik088wli4rw9kajibm4lj9k87p4240bc3oc6wmwfg4bzu70fclwnng5fuzdsf2gkc8vl745tu9082jdlj12gilhhp4jcgb5ejwl0kxi49axfnw24muq5oiqm7mrd1eae402ib6mcep4vjz5t8fuymquwbfnajrp5nx25lsczxppiuw8nulv8j8fi02fv19a8zlcjlfs0wqelc5d32aq0f92aik5fggm3hfdauynvyhmrbac0gv1cmgl5g1hftwddx4925gymxqg3x9uwcagpxqbf1ozpig05ubu14lot7sxwtj1vhnnqvys5hjuby4gu58y3jmrani85ig0l61njj93i75rncuc68v65snvaeunwbthsrzmharixz9fhpa11jdfzsp8h24btgn7u6iu065mo4iypd18h112n8t2qq3czfmfacpyj6iipordfdjts8pmv3yzcsszhhocwbdqpf4iclomy9bocqfgtu4k82xbi7bupl9rfjcsmcjs00ay2h0mlo085q3x6v9bw2h9jk2ha57bem9itwrd0yhxw6g81mi5u59am8pe6kfmmthkk2m7mqwuejj835mxautz6jzj6d25st3axfpz3r4wwpw5dhyrgs79og7qmwmi4wnim5ivb1usgwk4pn6iqpo6chk64afjwu14dvndtoxl4iiskqryyxf3x7tamh57fhw250smanqfpc6swzneszw391i1ohj36ee631dfevooh6apneuxgzpvu',
                proxyHost: 'foay6yp8hdywv6rgo5mub3reqaljseaodzglssp0rv9gibwxrmg577k1lioy',
                proxyPort: 8083111195,
                destination: '7jxjhm1zr0xw8glr08fh417mc4sb7ymqlq3crtss5evbg1cnuysbhzhle359gdym9knu2kp6k7icvyna8f7c5z6k4iomsjc1l0hkd10lz9fqoy223hu9ulpdlp55yswhx1jm9moeu6oxkzl8euj0p2utjmqtmt9n',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'uq6z9zzkxd8t0hu3ihbkscwl4zsjeavxj3moa9n1fcxs2x572dymkoksuv9pp68lb8joihydlljljkhfe2dxpba98vgs9oesa7mv2blz9hyw73d7sj4gy74hyzkq6na2ck3awdsb7h9za5u31ol8iqs2p354i7rt',
                responsibleUserAccountName: '6dwp44wckgpomcn6g148',
                lastChangeUserAccount: '3fiexw2g0xiiyyz9wb75',
                lastChangedAt: '2020-08-31 05:51:55',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'p5rxxnixol4r98voqwnfq0ajodpcz5r6itdzs9n7',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'd1igjxf4d67a3aiqbu3ntyxuobdxs56shcbm3pwcxotpwnglp8',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '610xov8o88043mtl4njs',
                party: 'rpz2t5hj4qor49w53yo66xnjhpf6rvxpwnqu2w29t2a3hgjkkjab8yx6jspilq8zrzzo7cnp7b5ccoo7nqbext5f720ksukgoj6rhtuad2f085ol6md9xa4dwa9wew1abrk199b24vp1zvm6jda4ytql8j49tj2g',
                component: 'dt6xk4mu7mdfdowfixwp9ofh2z73nzofabmwmz9760x90w5rra8qohpwcjdqlm98cw28ju9amg85y1z1dpdjckof44qwcpbwlfmluxnetticy49ibiycjk3c54mraej625l00ekg3hcbm74srloex7usks6xpbof',
                name: '8tz0c0oeu3t7cjf7cprlbshwmmz5oremd1xjcb698e0r51149p0oufd4m4xxdru8hkngnewclt6zcv7564xd3r41y1ho12e5s07ecwlpwok4qtl00swqo2of18x2ciaeu94n2wlstjdzpviks4tnoi2vjrv9h4hc',
                flowHash: 'uey81t3ndcakxk72x98at2vebvjzo2uunmwcol73',
                flowParty: 'j6rpfz382lp8kefx2rq6korlr0t3wqcsqxpih5kwafdsh9an94obay3pv78ojdouquv902axqob0efavsree0ig86gq8l5rdeijcy33vmpojjadfk2zqh9ofz8rna9u4t61n0hoh34d4lcio3v6bfw2jzzn2fa88',
                flowComponent: 'jpqimzzf43kumb15lj5uw70hdq4ji4vy0usc0vefwcqzgv0o6kxddeoqwjzmwam02vwiknlymrm1y817vh56r47p6o0272ne6k5b0yt9k4l4onokgm1kmr0heqpniukwcuspvd9zrfe19yuu2r4um77u6d1xcygz1',
                flowInterfaceName: 'yvad30dv2wv7026lu6t9wv9n84jmahdbrf4mk4qt21r9szr3r0bt4qn1ef1qo52teoybg3ugis28vjad7myuzkwdo5b0wfolnehduxok0dvhrwsrvux7s1i75ck1wbz21wcvlhbmkdatn6heas2j0vxqiceu4paw',
                flowInterfaceNamespace: '7nzzuvnbmm53a04gwrw1dw5ah74nng4vhi65oq6c29x3l53ay8j5lgvv1v8yxdt0wyt62daaqhtmwd1l82nf6432g1br2dqjumxq5w7alk1zhg6x9tisdfw7ar2yczi8qch299k27xv2vcvxzsqnqu5w811f7edo',
                version: 'pqi30dbiaadud5rh25jm',
                adapterType: '65rhf6xpguqdji03x9ca08byuoh7hyw5oky9w7voumcs332va7zcfccrxiih',
                direction: 'RECEIVER',
                transportProtocol: 'fhkw1bu1nm0ifocja2bz29ukxvwol82tx1hhdrauzmg01tp5q0yxe3u4z20r',
                messageProtocol: 'cwbf4i4cbfdfnu1fklmqqny7mp16e8mgyklkt36m6ex407kbi53tnx7ssgob',
                adapterEngineName: 'xe8y0r3ial9vwl6588hahzu3jpfsh36pvospr2f81egwgmd6h4zbuav01qififq0nxiefxfyjb1fldz6f8c0eb5l5tzlbkurg1xqcding1dj2071xyf6tuem0hlg1674vwcr8o8vd2mlyy8ku2hrw1h9exwjwl30',
                url: 'rvcqjk70p0qd8io8bc2funr7ohxubqh5cyv4hnychvjcumy27fx5rx6im95kkmc5gp2zlvifljixd0of2pqwd4ln0glydedssyl93zeurdrigg5cwpgfsntboyoym3r3d2skkiyfg5vz3et26l2vsd65zvfctebwhc90dbznxg12jtvnzxxkoglyvv4v9t27gti6n0y28uy3qxvg6wx2mwg8wp4tb8gn26i78lrecepw3tcxjjx7hvcke4mm6hhvdwslls4jbqrkb4egke4j3mrqv3r8n5f0nytoc3tu8azww6nsu7ytnr5uirfkg2ra',
                username: 'd3l4arrvmu8psld4taaxzkmsvwt65fbj79riqd3cmkhuy7m7sng2gb5p5ydz',
                remoteHost: 'pzp9ssa9og61f7qj3sfp8mtyw91z3wl6i635nmoe9q162e35018489vn56fuolybkhu4j2kaiq03faq4qucrcpx46pkd4qad95jx7u5cu4fwbsgekw9gt0pvai2xo5at3co3pb5db7kb50o2f8js9ex9yjw0viue',
                remotePort: 1101169201,
                directory: 'revf0w09jh19ix7z46fqx8lrfpa676pibj2qgj6ykbe0xiwmxqzphnnltvdkbvca0q2up8trmqd7xtqkieec70luhvu70zmxr08682lhkuk97n5jkf17waxq4f9ube0z94lyc5yivqrgbgw86ndlwlsboeb3vhmq1m7r9sh37xtz5ga78kpodpdy58j1wvklya4334eczi5ktg4v754ojtvou5p0j8577zf1eealqcvme49kjw0y0ryefyqrgklrv5hpddgrly415gin4pyiqejpe0xoc2fktwg092dzjkywuk3l7jsiej84lb146qie9e29d8rx7a4jz4cswoasgaqawwu98sd2qmqr3onrj4nk9ww79gx279ru4yi3e6lpgvqyzp25pjy22z5stcj1plusumkpr5rqb4zqtcazz6s327va8a65c49rhd03alkzoee90yeqdubee3kje6zob1n59vww8i6xu2gopn5gnwon2mpsvk3383e0ohu2p032sy67fzo8fyaoy0vktictq7yhykcranr10rgx1ahiiz81hnvo2lj0etelwu31pzs7yf8zcj1xwnbe7ee6zjri62zm07h11pyxvc58on8lhluyv3kva3yu2jlf11n8hax520h8e2nm27ugbggae27gn5qgezzka3a8iywg84uy7eyo0bnupwvzvu5mtzy0bmb3hfm3ky71ztpvjxm51kzmxa2qvd5ulpyd2o2xluacw1winttt5ut8i3nzx25baj1k78fj0erfgwpxiuv4a3o39utp07owyqz1c6xpqnd5upiju6oglmem3yzzvwik8lld2lqpohjs1z4ntkkuwp6y26o5jwjf4vu15cyeegsj0tc6y83g2ekil7s5k0h0bokdw3irnc329s5f1giz0tzinokmz6rsubdph8e1c82uvsefc39uzg721uhnn0evjj9vrn20l0ycz67ai9jmu8hg4gmr72onzzgbmc7op1eqje4q22gidz8arw39p0jcprfi',
                fileSchema: 'hi1y8fpcntulhyw75be97xkhz5mxhgsqjm854odr5ym9xnnjvg0ph6ohsnln8f9sudgy8zbs3ue74eb8g0894qal0f45huauiqu92n939zy4lv93dhqn5c4phiq4fj1gka81gc51wo1180zifaj9ghppgetaejgvkiiocuoi5fa8v3etvb125yrod0ar4u859ckcha0kilkmb99ghvntinkn77a2wy2pjpqb21pfjnfrcrq8xqprgtavp3o3nas1xwvq8so7u8a3tj3glkadwwlyu5681zwt3cmfny333nzxg1uc0i8w4aaz2s7mwugp94tylrirsqt93jimifg0xg63d7ftvt0vvpkru4l28r4jk8ha6phr0wwa6a8oujqw0ljn6hrw15kgcpr1ywvbci0yle65vjopmppcpu1ltpghlm7murxo09lrguy5iqwr4mr7vu90o9amusmt0a0se1blp4zk74y0cbgz3nk6p08zk5w7mvt12qjarh7w82fa3k50s5uhdp4jmc1xiqnxvjjw0tg82enwbj9a5pvcjxe0rawjynh850moyhmdv7a3rws95ij0q0a1q6hkrggbcxonifdl82yygo98wt6vbtsjhcego1hyopqnxzr4ypyblv2mpg70gg52mbd4oaesmxzde9dv20z97y09wth49ysmwcp4jdv9i2dcwxewwjjency1ft43ceapt9hcqgtoea3mqx0z5cwamzo3ackf19q0xy5rpjmsj3e583tco02p3ky549ik9z5zuqxet9kxaymdbwcvc6z21tmsyghti2xqsw3ytsme6lpzhnom157jc7j0q6ei6jfdemrxxcnv27u41cd1du0grfdrkqjov6pplj8gtkdlo1r17aq6lf8mr4bag39j7v55npv2fpzo9oix0tp0qr5i1ln62qbtfextmy40kba2w5o58pyptn4sowrknqgz2g7n9f20hq3asm4mhxbdquzd86qtkc3zxhtq00avhjbn3vwrw8yj18pe',
                proxyHost: '0eh4464tml53ktolhjrbngzstgwr64aabwxr90x1jyyd7bym8xq3j76cdkvd',
                proxyPort: 7957569521,
                destination: 'wqao8ds9orjj7jv4knpvfmj8ipjb78k51ah7sbqas81u8dl7xlebzxayhi6p9d4uixcbesp1lmf48psz92toj2sid8nj6iexs9dfx4odthwyfcganfrnwwteuyay5hav3z80ssmj478wlyylpl7cav4g2bimfu7x',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'jxy1or743q1d6mhwlgnkenhsjgperf8syg16i1smc21gmsi39xhxram2a16admc4y0zed01m2i3wshxcl3svchhs25lhikucuywdmz28moraso4xovont6w1bs8tspcc5zfeq3tjuodweah7z8t7dchurnqinh8s',
                responsibleUserAccountName: 'eedigt39c720m9z57az1',
                lastChangeUserAccount: 'ptqntlkrxsolc0isowl1',
                lastChangedAt: '2020-08-31 06:33:48',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'x3mry6woz21aoq44ca9rqap3tii5eskvfv6bikte',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'qxwggj87cklowaiimsqzur83lk9p6zfcoxdxknauhr6lonk4ug',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'cxdo3ebq7qkhs4qt5lqy',
                party: '6vflkxi0e26agxkr6jvwtpi7h3ky5dtl0is4jk3oek6nf9i2zrl6h0k5tdme1rvh5shwg4xnhoqbi7yuusr0cdhqa0tw08jjqhqxx5xdgc1xegl54x7ey3j4ff000d1zsldym1jx816819y70ev2xpf5pa8jvff7',
                component: '30c6f1f29lngbdmd0wi1t28zzazjh7757rkvoy2yl2lmaw2kzj2pjee9dogjqvtotld8vyyfr66160ohwo5x06j1n0w6dx7bx0s314qvris6ebcl8qqx9sxozx75nx5e3byfz4f6uwsyn0ma9q048g5y4if63gt9',
                name: 'p5tq9je7681e572tz7m7i29xpz6rlpw81no2nvl3zvqfm4kmxw458lowp9vj3m861eha2ykemiatwzdij5ygs5slyc63j5svm54c2a7elhbxybc7fks5fyrfv66faehqqyf159l6o4ka0tfmzmiwtp16rq93fkol',
                flowHash: 'mor5393yf2hr1cnzt0btbgwax9a4p8o8nuoz28hb',
                flowParty: '56mc58uvzxr2s4d1yda5c2a5lio7yjsumghqznhoktkhm5n788t53yt1sj8tqxsn1hr3s6ller5nyfs83fvljk68n4olvl3t8km79m3qhnlt8l95n8i6bksdzpvd52ebyf7ic3l08io64el0r2yvqeo00qy99jtk',
                flowComponent: 'kk3ld531nyt44fky8o4xk5zpktjwdh0v3k1pdwc5lme1zensdv10t07xq3d8v2z5zsad7fcwy72fjhh5d28ah9s3v4vkrv6h2388kt8qhe3uvo8aazhf31ked47bn86uw6msi8i5ytvfcisioishsu8stqxzsn28',
                flowInterfaceName: '848nxnpoznxy22p3jxlr2v23ef1q7pn6cu6ojkyhu61hn9mx9fvvw1i2a1otiw1k19sfay5avzmrkuuy7a57worethidn1y51u90vr7ypppsprt1negv1zsg98taw39kf6nr65m6mh1kbosxv9g6du4oyex2uup9a',
                flowInterfaceNamespace: '92nxdqvtr87smn049lih8lm6sts2yqoar2bx3byevj2wq1p37u8pcmz8xlc7zqbl8vy1to4z6zjl4zgbvyjuy7hby4j8kgy8ofuzk8gmmj9veh3413fs0p93oaldg4wqg2j4gehw624bkunyeujkhafa59irq8pt',
                version: 'krssyskx6g3utzbwc1u9',
                adapterType: 's2ksgfjnm8pidnfy0yye8ig64tj14ifh6cuxs2r56d1t6ahvn21t60exl0o0',
                direction: 'RECEIVER',
                transportProtocol: 'id9hcl3dlrtr9bynez70pmip2a12h4l94ak2x8qzbh98f7b68klnmjq2zd24',
                messageProtocol: '1lqaviy4flfl072d8lrefsp8b58il4qewsz4zu6acw2n9tnzn0grfx301d1y',
                adapterEngineName: 'vh69xfsz3w3v0a01ds75oaxkxa9mrn2sks2ipdl03ovj08i3zea4m5c7k4x6gaclklkz0gedeerjnm4i98iqbbi8op1e0f4y96c04pzctvhv5yewkse5kq54mhdsnhac9tc652o8l6unmncitpnkeyxbomaavh6y',
                url: '7ya4oyvgfcpctt3llja8wsr7x93utwys0hdybemcx0yaavlwduio3r6eaen219tiozmh2iz8okgqj2012uburkhb390sqsx4qsxa2xiphg1zpwu3n1xim7gww6f0kd3yscxomyc4pzilx6nqq6a173t6m3sau2d4wacweo42qoloji9njx5mp6lmd13b1vlskc7cjfzks6o2ip8z1bpbieuskub27qustegguulxbqrs7y1z9cqejak2zn6kugey6au22ccavej9sznm7f72ioy6fe13sednd6agug7s4ltsb43nqidt47hwcja10g56',
                username: 'g7u1pgt03aiddx9cclw6k6m49mevakahhi6h722nezp9ql9pw1q5lwldugmy',
                remoteHost: 'gzi08v4h3j1iuap9qfg0685rc5ug2pl6569871yej2w3idee9f2p9gzh7zzk0d7utcj17dk72lvlxjzxtyyk50zd0lcw8efq08lt5fejriggdrvrlyxydjnnb4rr6d0xz3flpmdw66vg12v9ybxzdweuijljly1e',
                remotePort: 7292932877,
                directory: 'klg40qh28qn8u6ail3oey07nkk9kd5932wy6b2y9c9v2ipxomhqj78ncq1h6d3o2qseti93v1sd7veio81j2nqzo3dk3yijn9sin4lv7smant3zk9eng86q7dt3z4caxr1a769wy2ikeftwcgc6o8gcc3c21vnzlxgxlqx8oj1p7mdzy4bp5f72u1ofxfjmg3v2c2ow1up7m7quhc5mst934mtc3fwbarmsleave0sdhxbj8pyzhoz13chcqzjgjjzmav68uqfscdhq8uyywmky5ac8pkyftbyxycdxrupvy91c244lii8jppyv59m2243clsogenkdnr7jrczvbr7ndha3fgdykqb2w326zpy7est8e6jqxa0il00vdt0j43dqdh6ciq1vkghxlvuc3bt105wwmboeg7gmpspvtuagav605wfwgsll06n3boz886b708iiro0zpigynqgqdca0tal3djnrftua5s2b2wxfhjtjm1ez1665spc6k0icajnvfinsv08d6aqq65d91ca7jjz2k6ti32r6pc3k59dx13vpgnb29km83phm9179f1t4iqrjk92o79toi6v4wdyjv6azt8z3906klnen7gxkxsinb8lkavxbmqtlk4f3v4rr84602cfuw6upbss9xqlmw9qc0zfmfcpfsgmbdgdzty03r05e4axmj5z3nfvyijqbs9l9h5ivs7jhali7pv7lovja3szg1fk4wtvlino2hh3blvkirci7x6nly8jqihmvoeikcwdj3jfg1r5o0zbcc78f03qoa0cbkq4i109xebtz33wmgl42236k0jeynqtti8majplwv67xk9hm95xud4telfxj35pougjdellqkrap3xxwai510en8wmkm4q4ba4hbeg7uwyj15pmvjb6vryv0gso3c6ll5zlrm0lcnd4hm1jzlalaiqqmm3favvafpm641jliy7ilp7c7epl3qyornctd7adlexl470ah467zzlk1emkqdjfh2e947',
                fileSchema: 'ixiay2ht2mgun53kazk90eaytllqknhdfj9zl71dv17gc3j2pa07ee3kuuhgziwf293pgx7xn617kjwnzah471638xawp9gzrdxgy8brekgb4p9ak21jwisjhoekyqdmre0xu2ghaozvsziw8f2ftcz56dei19w2at6xkad0yahof4yxnsggefe81c64sjq3qo2qrhdpw1we0i933eqkb9asnh6clfoliuqgex69yixvdpvkqwxyfajxtiuhcb0o05p6v0sh9pel9jamwzznaurke2eu2nxiekrwavm2boq7egvu15tvot9t9sz93trgv8nx290vgfl7mx55sv67lh85tr505w7iao7rs7qa34zx6njkviydfirc5g3yvs7v4oqj3kgfz6pxgy0uyudtyaimc2ayapdpcvgx1npvifpkvhjdryufnvhin61i7eteolhxhgjhod6onu1sm55gwx6868xzew8evwl8joesstanbxwo8k6kli87xjj6mhfx69ta4u39z9ebunvd1t52lhqcyosyo2qs0pnrdnh1aeoagmjgiw34agobng53ddptswkyks1b8gwblq80suj01bbc87a39kk10gpbjo91zwi4kdz0zsvymn9kea8j3yirvkfmy5vs4hr2ge2dy6mnd82dqyvfb3c90cx3di4xslon2ck36o6mgu2ct4xeh7azqjweim8xsarkegmm1krrwsyv8hcubuut0c60orh12xy7cu02bx6zt86fqbxzbj1os77ws2f5pnsmkacxnkv26yd1ucz12qlgv5cnlzw8f7wmxgcjv7rsrm6hq3a0v78jfov1ddfo970eqkwx6kh7vrh5ub8z1e7ojp6bi286mc1lb7ldfns1i28hi091k04hiaarbswzws4duvrhwlhgvs2r86scxgxycfw3ytryc3szubz2zq3qbfv8fgfy8ls8eqekdbtdq24mlf44bdin0an95xh2omkccetyztshiykic4vhes1u9xlc21fzk7p9',
                proxyHost: 'olr16sqv4laeopuairq69nlmfvz1j772s4f9du14dur1hvr6ubwio3wx4s2p',
                proxyPort: 2067974589,
                destination: 'z63i14p7f8vv8fdfl267p2h8a4er5xtc0oncjmsyl6g27x5mdzz76pdqix3jtzz7asojavwm31npngj0waax5y5hv42ynggf3lvx5pm6xzwlqmwj0ebzpc197t6yr8a93uh06skjjcrq4f2e1u5xz741sbc8ty2j',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'gif8ifjy21qxokg42cin7gdhzpoqbnr8pemoep0anb99bqe5tymek8i81eeqk7m2tkr6rfmbqrkj44h9u2olhlq5axuhij2ab8jlkzui64lblt3qy5y68bn2beui8wpfjcix0jys9a2f1fywfanbiw9417ic0x3e',
                responsibleUserAccountName: 'ac1zjz3t7khj92ey750s',
                lastChangeUserAccount: 'gp2biu4rm0s7ivytka78',
                lastChangedAt: '2020-08-31 13:55:00',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '1d8d4fo6zae9bsp2yqps4ckano55gwstv0xc5dtr',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'ouy5jlcccgylspk3ikqo5sclwl9muinb0o4n823rqvqcukocu3',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'rbhlk8v8g06klw7n1xc3',
                party: 'xk78xwdqxupdjt8pkkdbw0vjmklg9x1y88pq41h7w8gdzkcz4kroz8hfb74w20n773ysaelgh9pgjeyba9dt4tvzk4emmncfc5gxyxqvdcszyaztuxnzsn3snuvip8m7es4lseee8av09fgm71rktfdfkr4rdpbl',
                component: 'psi8u3lbx43r334uhd1311umsk4jrs21058x4mx5mcbonac0a043vlpc6ag6hxmfivtk2lz5r6jtygcn2gldhg708itnujwi9s9uiaq46li43gwkvqzafkhqq8asyps7hj1ysskywd42ls6063yy04trrttv3s6b',
                name: 'e5swb52mtk3wd0nfkyfbh2hjgp2ktlcxr2c5cvhmvx6higtpojid7x2vtgn08ah2ja7aknm1tt5um5mqh1k3gssn2htuihs1r7vuawz97g76ygtg99z7z50h2ohzq80ew9qc6i8bc5h4ju9b8xb9j7skyb5ul8k5',
                flowHash: 'x8qon5kx40y0fs8woif7makd1hl4crx1yi42rucy',
                flowParty: '8h1t7sugrdom59156oyzhhmyx9ss2n6eah843gxfsls11xbiji3lxjxqisyhlvksj6xuei5ld3vvcuchr4zlzholp0e5cq6zftkvh6tziri79rawx2mr9taef51dju5h6tpmcnf30734r16v0tda17ylileb4xaf',
                flowComponent: 'vdypeous9aeui6f63ai2irymyrc5268j5x0kni9a9ljvavh6uphoog1ylsb35gevulqgdjofyjbaxpb5ulblxzwlomaskyjn35g2375xg5a8gbj8ke1stfgknjn08fnkmk0ciby0qdwgh4ebuww45ase3rju7128',
                flowInterfaceName: 'xplzef2mapxox4xtssgcyvtc83dh6ymja26zu24xl6zcjnspl9lzqceq9leiab75m4scwlc0xuqbxwyz3w56cm2ium8d4znxotn20z6wr1iz32s2dyvx9wbl0vlbqdwyozlg0ts1gphag5d5tjxrf96q4npmvuqv',
                flowInterfaceNamespace: 'ypd56tatxdnpagcu0x87heb86cap3iuucy8d7ocfh3rx5fd5xro97zh7vaxfoejnisheo0s4z29ee2po7lhpgqeov22jayo06rebd2kpyfoxztmb2t8g4zn06rihmqcvipkj3r0hbrae8ez8ixu2fwjgfmbpdbbba',
                version: 'pxvor24eky6rn7kyrte3',
                adapterType: 'x9dezmo7l1rufx58jrkufqtjt6vwzqiu0or1x2v2kb0yayfcdj7q3yx37f7b',
                direction: 'SENDER',
                transportProtocol: 'clvlq71assy71hc13awie0d41ik6ljqjcq5au84b56ikhnabpp2uo6u8j5uk',
                messageProtocol: '0wsr6nx6d254meg9vf403pa1ess3pdt75hhevsr68mybfuhnwwpl0oyu6ufi',
                adapterEngineName: 'mcartolqneoaww8g1jlfqsrkhe964nfx6tx7frjdkz0cjgsow0vvgcdaktnqo9pajpl7hcndxt5wxfxmm05zrfze1w1i1zcure9i0lelt1rgfapmnbslnhf5nbkytjuuz6672jlb578kuwuv9vdp886mogcbm582',
                url: '2kxemrvc96ndkjcifu8au5me88vn2gz70i7pugo6h53bhu9w5fvrtvcrd64iqip6uxi7z5l6ko6oobs6kv6zz5b9c7fep7nkfonfktvjrz3cv4h40kx9tmi8a1l2qv3ms62gx8ud9rt5rkhjx6yj8kyqwv2w27tud256oj33u5m8sfwbjspdcxm98mmqmy2c93z2vvzttsnio9u3rvdza24919t6hulmyj3b5fyvi1hh30o4bwlvydbucx9m019sjxjmcyt54i7ivcfd37k6hcvza88hsay63zhki3ixgh53a8f11prsd8vlzd15q9lo',
                username: '675rponiiemvuyb2gsymr986sl5li3z18mzy4aiwc4zakr9g6ra7mgkb6r3o',
                remoteHost: 'xc3mbr1xtm2awwpaljsorfysaae04pv017e2nf9p85yjw87d7e5bao0wegq8qgvyqehh2r2nc3dt44jl84bh2n5bcd5kxx5m31yg4rp6pyvysr5vdaodahwcx2hfgqofb2qzfvrxqczae9zgduxz5fo859urjoqo',
                remotePort: 1323488525,
                directory: '05txynbt55lnogynwrkeiar1alrgkxdd7kjw77fmc690qrnlsrianh84vlr4z7nu3d2fd33ewzng5bha4ugo0vogc33d9519jia1rxhh4cm7nqthqgr4cvs52b37y09qkk5juc0xd8t9k2b0tvagh4iuxgz2vec4buq20pmdc7bftv0n56wv2uvcseunw2kve0bbhqu99msnfm3schl3pguljomxf8s4gilv6szidi7k30juvgcwqden0nb5sget004kuvystjnxlmulrpi65a845e3ye7mz4awpsk3ao00cl93w5d0fbchd12axoym0wjlkor9w1uk8ap38gxn59ktkx63gwa01qnccdtm3anax4iza2jiyel64gsjppf665p49io9t14pkra5zdtpm43bpdhl7l3fmy9x0uuvruoqcmke6mc8uzoqii2eku6tuo2hcex5jm4xkb48ht3k41lruft90mfchtcwmlpymz6uj0xd8zdpt4zasxbfxs9fduf72k7yb80wwb64wmhtw5r616qwimrdy6n71bxs1erp1sr64qf3hbv9xro1tu99kvvza5is4gjvq35rmh7oohhwvcnqprei0kfc0nxbjeu9933o60afnq813d5wx9dqjgfa1auaoqvisc5nawfjksdl9jhjqzzcrdotulr4h92waumegcttu5r05c2lpdnf9ej68xhewbo2sbqwze3kyceksotg4xavrqqs0hofle6bspn1proca838xpzy6983ti3j66p0qeawg3006an8tv0hc92ee1dw7xlh15v0e99scvxldlazy7xiuo1yld2b7it3zyx7fqlcn7qhqgvl6swdnnmin9gh2euog388u055amobbbhjgisl3560fr0zyy0w3s76gertqacyqu153ap4g9v4fgzn7ao3kn7ezekk0jpwedb3677uqra9vo02a24urhy9mmzn1l5ijhmb0pmztaa0jqgym2eurydwxpocptn4ojq3j898vfqwtnd9w',
                fileSchema: '77uftzpqyhsgc04mfczdos4176ujsuz6kkt5vy8e0scqk7af4t3ojmddulri71xuvjasbsx062julqhsmfsexoh95b68uzkts0f5cclm9qt3n3dk57vqrxtlkz93l9ctcv2o5t4kbxbiui4kbezav013yk9u1ahmn0wbvmjjalipz9pk0g63sjetrozqxbueukg6k0qsobhm4h2z3t6ex7z3kedm8nzjdvux2cnatlfuhhwelkchcv6hs240qom3inszlrwk3s0ut6eyy7h2g0k5ncgc0qxxgr492kz7om38ogzn85pkl0h8w9rat1cg4o4e8bl0lurds7g6dl3783nkmj6z89qfrlglrgk007k43qonc3ugt18r61exw2wvq5ml5owcmdyk2fd90thpifkm3p486e41ox160z02cixvfgeju1p3c5bfvpakwwgu5mn3bvvkwtk9q25cldy3pww0svtfke4jpmr4dy90wudafkxcfzphngd1r0of8jkxet725700jpg3tm7bjkhbvbw2q7ao51d0eqdpv921vg5qznbwmkuksagmwx0mnpiaku9465xja6g7t1iha9m4hmgo6r8uqto99fcu78ohepq8jnvnhgtp3whfqie1wn7clrn4pybw6y9nmzqyrhtwyooh28bpbuhrt1osvvxi0qyd9q043jobtw1blu9jfnk9sb3ygrwwkyoygpm0dynxl284ys9dhmkhdbfa4vjo0bfeuj1js0qyxuy7mp46ai1b3ya37b233yxu1p75qfkkfmwxashc6n3gpp1a95y64wc1ei3c31tjit3qqp5exc3n9ob255q61isv2rlgkt8c1f3nso9lbaka3lscpbtd3x2b40ccp5sm6frxerz3uuxtjvfy7owik4tdr6v0tji285ugi6kje905z9znt3u7p5des4z6t18u8om6xspvwm2jpzq8dnz2t65knnvxt0x0bbtg5hxdvfayo1m9kht4cyppr172e2nbxmfwd6u5t94c',
                proxyHost: '6aw11v3p69am4450nay4wv1ruz3yw8o1aimw1kl0uwll3edy1zufwkelq67j',
                proxyPort: 6056182682,
                destination: '90xs928m2avri9c9sqs7ktrbutewvehib8al0hvcvb0xwfy7ek9ttlmb7ai47z3061wpdsyx3bjb8bbv3ez3w7m74208ghvklmu7rq63ixfj4jnj0ziakgh6y49b44s5p4z4e1w7ruxyl1qlxkidru2osja0scjq',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1m915rnqgljk66ry7szkdgo4zu1xwe8eaw7dp0vt64uobro3mb2yt0t8palnnxdyyjgeowm81l2118fgpftiyjfi4qgrmrwvr9md6xcrlvz8nkygxo4e2fc571kk76pt3d4swu616wl64njqwph0wtmcv0uavx3a',
                responsibleUserAccountName: 't8pkuf38f7gnczs97kdp',
                lastChangeUserAccount: 'zcuuahs4ctkcej8m6ro3',
                lastChangedAt: '2020-08-31 06:07:34',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'pd9diij3fckxrbcb53nelaavyffpvwggnp0htqu7',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'jun1ja7ekrr43r8tkwb6b2n2dcgwoajd84wfr0v55rwncd69zh',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '39jegrz7widy6vr4yn54',
                party: '1ftwpeycncbf457iu281v5d4aqsgqqxj6wnl9cig0ww165c613yyo9fiwln7qvwgisxeulfxyyn1qy42x1b8fdy8nmbe8030japyno97hwn96z53qh9b26r6fclu4w0db67dr5gsr5fumbzek94139ow61iv6z53',
                component: 'rn9im1gxolmz248f468i47y79u33c78ucud2bwp901fugj5drsmjr38f0uxd8qfuj3sv8evwdqu3ejrl0agi7zaobeadjyfazuhww8y9rkgp5dg7m0oj9cqiebf0rdlq3c9n70rknj7ak8zb434ljl1en03u23ra',
                name: 'nj9xdowd08zqk5rnhxlsg7j3gupqxufapgm3swtkfb8hq4u2ikdcwyt020fay60rlypwspuyxka9206wromawab1ad595mftp636w0r36qudi8jm8vsm5pecm1ywiib8srkx8suzw7lt26t0v0wjjite04dgvszs',
                flowHash: 'psceuzze538bc3a0v30he284a600ebwlc42ujxny',
                flowParty: 'm12eb233mnd3abav3g1ktul5z8oytj9q3076butp29eyw2fjo576205cuihyehaaan0lzh47j7u14e2cnfpbfodkone7pq5aasuf5fnwv22dy5rx5ddxia2eoc72o4zs4wciyflkawtybuz5615ypctwdsatr0p7',
                flowComponent: 'y4hfz1e5r8n5emsndvf9l7cj0y3d1fm7rtczq2lcodfi2a81uxqgv3hjx1rudpx8ig59rmqra008nvg4w3ib54dkeorh6gqhpcphcorj4dnyz1g5awp1y6d5qj883n4axlc27afljh9b705wzjudkd594itvzl7d',
                flowInterfaceName: 'ku44ecqygc3l327opundwn5n4ioht4lfvojd3rl67b4izm33x01t41lg4qyblm1fl4zrowzex11np82o0r7xa7s2d220vywr9frnx6m1hz485h3s8zrsmy7r7bu4svmvt0zg8c899hlf2a0r1h3mx0vlbjpfnq5j',
                flowInterfaceNamespace: 'i7y6hj3qv4cesaijta4hk23onuunt5prer7ye1dgv4i60bt56dg2kb3we4m6hc68a5giu5b013u0ig79jj3fv7798vc3dctn345rj23iactjn2bm1818r6r4om3gy77slchk856b6ix4lcnagt01aivso024inow',
                version: 'sclv11iwwn87tar6idwbi',
                adapterType: 'zk630w9y4gf7hz95hd38yql7dtn3srgdiajppv9d2530w3umoy4yt92p4362',
                direction: 'RECEIVER',
                transportProtocol: 'jf5o6y3zmj840ftbc43yix0esvd2tgm06pbx7td8akw27uznjwovv1y00p2z',
                messageProtocol: 'sre0tl3852yniky48rn322daqk9e47uqd8p665hs3r8qrawhgrn0qgxjtslz',
                adapterEngineName: 'mhuaaiq9jepbdf92husqip63plo7osnw7ojgsnenhlw5c2ernzr8odmzvq95wh6sh92bt1nnzrqg53vdl0ns0jjpjajtpknsxw0i9e60lvp64uwmlgbeurpsj2f0te86i5xzk7rjq6kfgljskwe3yg4eiginssy7',
                url: 'a8cwyilxug0puujh3hqr2lgjgzw6g2nc9o8k8xc93wi7vnvth5j8xpwthyq5tp9mgpk6w4rds6ct9joj8fjum9azdhr2pqtfz3ooo8hqm7mbrllh2cje827cmomqv8b7ght5g7h83eh1spuqos7nitvphfbrq9yc5euoos8wsjft301n7zzxw58s30bh61tcydkwoxl8d9dmbllx0vgbykttopb0j90fkl0pwd1dnnrlbyamhpz3g82vd6sf6ms1vzeikdomdd2si5gb1kcyb7k6huco5v29mvigcfzxv7kvky7jod5325l3v4z2a3em',
                username: 'ugoz6hap4qhbj0v38y8r61oposfajkv5pdsq4qu3g4gr173x8fqo2p1ux3el',
                remoteHost: 'f592xg6sln3wo71pssjezdjeam4cme9odn3q8oqf2l2ghmytg2twazwyxd5zo2jq6t0xcyab2mpwaornmb2i35ockkbxfbmikhgllt8avrucfyrltva0nb2tbtwbvkzzwabpk6okp96h0baiyb1cpoqmmimr15nd',
                remotePort: 9799148988,
                directory: '4ti33hzay44m9lk69lb90r0lnexkihk6nh6n3dcjt2hloxhposyf79ibruppm58xccv5ws1z42bb7m5w9p5wj524f3vayneil29wtv2wd5hxg66lus1u9wt3wno3v7b4evdrl0hk0b7cybw0a27dqmxefx58bstdy4j8hhvgc1ljr4spgjhailstpipmoagv6r00ruhse9ek5eu2tfuk6rdz4w1ndxbdjik4m6kfoxdife2s5o2unwan3jcoguoolqknazqsj8nor7ukab90gfph0949pv9ti9r3opl7m0hmmv36jr1pj02ivv39tx745tuhruniovo5f0gtawcb6jzjc0p0x29lee689n04gl42w17rt6yf08ino2wcxiklghle2dovnfg1yrbkbpi89redufnr6xqkmcc2yvtj1hm6zw45k6jsz0raybo55hzlc73hq84jd7pujfdi9lhhe903hkbb3a61lfzw6vhrjqdl4937j92czmiaxeoprwm3dkqjnjvxg1m2opj84oqdbezss0m81hsj2fpba5udtxifsp20947t08n9yrvfxrn5mgcxmxy3o705v6gua4u2zkngffzg2l7s6bmg3795ihylbi565a6h0o1kuc1w8oichsga4zwueh3vw8s4vsn02jy47cc8ujiynrl65d2m84f22fnrfuctxpdrqgu6q81yp5dwz75a7heh8tpho14e44t1rflsw55kg04hn645gy7bzt8ivo5rvcza7llyjmq6r9fnf5r6dqk98aj6cmxtxrc7d7b8e11x8kwjoy5k3xkqmm12mdd7evw658i0pn7azz1ujfdthjacn7t7j9wdspetwgxqaal6h7721l4vttrr6hb84afg8dfj2l6mfegt9o9tiumd9wlm5mo5eeydcw09hap5iamro6w03xgl3mnyij4am8t8r8a9ka67g6g4g0p9in7wqnyw15qfifchkjdh7lvzvjc40cxqcqu94iqrw0gpgw5xqxxu8kvf1qvp',
                fileSchema: 'gm21o19wmbqig2se073kzmhzq87mwzme7awupas7qjfu8yukeozoucv6006p30o77alpnis5x33odaaqf5p566qekkohl5li9pajscw4vxk2ak9862mzvwavm3o4d99j69l86z7o25q3zy7vrufjefki4vhmfmcwghyzlqhvqhbnhnd30y2azgs7hdtg3zjsjqm59puq4j8z99pj0i4md2rjn77002z03r2sfzik05ju514gcxhwmcrngv1lhs9cgx22b1tkr9xu5y3uxdgpvo7hyvgu8riob1ezoxp8vtign26ysyk0bvcodo1y0d0wc5g7f1n1ttwt8sljsyr3up5z0ft1qphkdr1c9rfzhj152b02inrpvoekvnw7d6v0hato3u14bpbc4eam1mpsft6i5i9krey1wi6qsf90o11amczp7jmudyou3w5va12dwehz8q1lyubpx3xpmhds67umc54n7eefrploz7ghod5kzn6ggujr10fi8li49puh3hq8e6694fnuhx3acf3i52ln0z93ueyjk4lf2vmiplvgj16bh4mcmbxu27115p1aqf355lv02h24m9ahkmpm9re3brbbt6y8z7v9xy2eykwarjz8ujj4x00yndgkn5958tink68r5fdj826u4b7urbrghk6drh1hl844agtdaw1fyz962vpfs7sjcr4tqpjmigzgs3jkqlsiqvilcjzg56xi7d4eoieme4a87k1wmcgegkbdag5vhimsdbnkzif9eiw9v6cgczs42xmtz4oe7rjpj3kzednn7j3fehylojh92eq36ynlf9ztub6hgyghiy18ht5vt9wb30lr7fyy966uxcfqrcg663ny23uuyc6wctar34j25nst38c5ir8phlmzn8ffq6jis55s2u2728tcbiir7fpx2z0js1us9230nl1myd7bascq2h10bic953rnm62p54wyc0gloatih8t937qqoje179yv4t9pfhpwz6amjmmpzz92f96o6jqy',
                proxyHost: 'gm04dr8j0fx7umthcbxv7rpmimkuthoy7xjfern6owaltjujcidejkpbh7jy',
                proxyPort: 8696578440,
                destination: 'ebbz2bcf2dv510ra7x4yzobpyafiu2gnplp0u2epwhg76cxa4p78c8go61uff4l1z8mlr8epmimayytakzjq7d3jgi8exoee0tcr1irdcyiwj3uae8lffqgbenplda5h71zp2ldi9gywqquk1bezw9kcnj3nbwj0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'a5xz1obj9uybjh489lx3cvdwg0vzytscj8lo2o5eigr1xu8kf5u43twitpypvz5n42it7tzbrjxfgcb216w8gi7fv3bgq4i2rqb5e724jwscd4eyhlthghqwj9fosdxs26gjoqo9at6lxo4aubklw9dpppcsspd1',
                responsibleUserAccountName: '5i5fhh8a1amvams0jq92',
                lastChangeUserAccount: '81wkwchnoyb1t6zjtyj7',
                lastChangedAt: '2020-08-31 12:05:20',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'tlezigwbkt46dxw3rur2xtp7gg8qtzz9yysyi4fq',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: '53xrcgsskp6nmk8odi1rxt4dxzurcg23jmdmouvre9gjz03hwc',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'xthlb08s4eozl9pqo6ky',
                party: 'kgssgquzhzlkymu68mv5yjm1yfmr4v2lztc5k990y5hqy1b555ktv2e7lcas4kzxh8awnxl0fxdybipd5vc6w3w9pin3g8y8wolv64lkq4n15qw15jmatmevhr6saupqop5dst2hn2wjvf4i5ywrrox27cq1yzvn',
                component: 't2jzr3h6e6y2ob6rje6y9u05tlv3cfkh7ux1uext5tvtriqihrop1qswz3hutgu4z58juqnm8ceeb6mg0wnow5b9nzhlu7sskl704ydxy7rpvuduv8xascfk1y77n07pzgz8sm3uawb25p2miovi7vnpzditqy9t',
                name: 'jl890ismr93egxb2oew5p5x74pnhbnemw6fkx57y93mnj0k21ehsq3qd677udn6tn7vd0mk3nbcvle0xthyd5padr4l6e63ckzcuj37og799jeit7s15rhdszrpty7bmk2uwnrq9l8idzlz7otye0apzn3hi5din',
                flowHash: '7vgg6mw3vmuloynfnb6y4b08m60a4w66rh7hi0u8',
                flowParty: 'c4bfiqv3zse9kyqxbsdpf71m3huc246euqeyt617pc79tia4hufw0405msa8zbm9kfryfg5num0myovtzvc6k46wo7hgfenf35cdn1es10d8tgxwgcc4i0uik3sq22lvxfhyztpumfbr7vwt35gck2fa4vm9jc50',
                flowComponent: '0nef5tjewkuyxiikeph4fsrdyxqwn675usq7kkoatm5s3pu5jg8d29fbd7m676rsgj7srzfsx8g3a640goc7htvkoc36m6t5d2v4juahfghqvhajwc197t24tpi6dng178uxk5gew34661ma561ddd174dnym3n1',
                flowInterfaceName: '42d92acreko6yrj68u2mxk54dhew7t1ox62z3l7j3n7o6eo4hio91fb5uiu0a6v6mfqmmtvwh65g0vubpfakgg435u2vld3uzbvr8h48kwnkznqj6q81lafmvl7l0r9uooop0gcf6wjsdubg7xwzswndijy0lft5',
                flowInterfaceNamespace: 'ik9641nkaexdzmb1l6o6ajhoe22vi067qtqhmdgy6aor2wovlyr7x21baq9hgy71hght5als3mg5jsaugrp50ycj3vr9cfu08xr1dsd92j2ve1ry0hg3z2w75yymwbokeytda795yn64bk162e1u30vx1yajmlhc',
                version: 'bsy8gr5uh411951vxe8c',
                adapterType: 'xb7v5hjdz1m8rk10w90nd76jtn1c1baekjhqu3glsrjwffpdpz2timvmst1d9',
                direction: 'SENDER',
                transportProtocol: '4sdyg4txh53i65ypkma5795rusoexdyfpy9q9uzgsp5rnngtfxclp55ot2qo',
                messageProtocol: '8m8hof1x5svfvy2eubl732h4usqoorhidopfnvssuc7gwy9r3928a1zsue88',
                adapterEngineName: 'yycqxygyz2bqavokjwt7z2hzudn6pptt14yzrwpbxa1zs7jsd6pxd3c2os757qvu0ibx2a8u5ge2nboz17vfv1x6g9eknkk990zxe8dg1d0w9215ot48tcleuzznzpmjj0p0k2rx0r89n3p7u19c7hhl02h1cs0u',
                url: '9vmnxakmg6l82ncb839bk7dwpapherpzm73o4otucjtoe88zkc3kgq66fu25baydrg5b0ccvud2dvigo2ed9aiabw12muzdq49utwpu69c1e915up32ddvq8fgzywrnrivmazv3snz2gqrmftnx04oaoupnwi2w3tmd9flv1047pjy7ki0xucjmfy4yegti3gzmky4tc655qbh06er1nfom4gvsdqy1ynfzsws0swzwzmeo7re9yybatnu9b469acythr3hyo9z6q5l0rsx0hss1m6qeohlzvmaelpg0uxvokitp439j1yadzarg7ivc',
                username: 'lsun956q1b3buegjviqsyrnqz1a1hxktg7ipd9pnddwq5mm9jatjnqvgzpbh',
                remoteHost: 'gktxq9vnhmzy8wi8y4ep5zk1s6311g3psv0l6ed89fqs4ie2bfwdrfxpnrn2j0c3kwprliol2wr36fdet29w84zgyewid3lv1x69scvrun4y31jgqqrxa5f4mczd5g7814nl5co53mv35zspw8s0n5d6f6b0toqy',
                remotePort: 6932099451,
                directory: 'd47a6yc6xaethjs1k7grv31upxacm1sxwdc5smwl109g5hn2kpzb06fvgmletep12tbqaqxsf6fs8tf5zlwawdzzllmir9y8ad1d4yhzntfgsqzvkmy9542ub5rey3a34xx8xjm4pvhkmv0ewd5kfmoqofb7co2kxzpvn2pk10ntod8de66aqqc28yy1p7bsliae6umye7jhwdrh386ps3u9sfzh3vfdw3usy9ifdq80kmd0vwiyi37bj797eugtaqha07f4grg9k6060z3oswy33dou2v3kyj5yz2g1yn4u8kz98kylk2ws2y5se92ybkdj1l14dsnd9sglxsp0aagftyr9cxh2d4lod49ihb58ujdsngpey8hhfmn2xmhpux5vazzrhq4x32ec3ty05lgp4uqqrcs9nalmhvylbtc52mhqui4aeekj4g8blnke04lu2i0sgx09sdykuth6kveomefyxsda6whxmuquec51hjuothcr52fhgmoo3b6xo15tptfjcwuerx6ru113hqrtj1llj0xbjpzh2ysiglpebdo4jb5gpccg2hf4xmw4cscyicn15kd11m20tkss36jmuuvanfiydfpgo3m34818oq9pyxz34rp4h3yg5ypvbhk6pehl81t8kr0toge8e37t6yes3hvy5wu4nbl4yis9g3w09q64z4c2job8wbpktdb7y2vh0cmdhiqay5x45qbco7zjn28tfwnrojo1ae2tn40giq9whj8ndxyqivnpr37j9bivxbk44raulov7j4zj0z8em62m5tsrlxhsxj6ubkdc7alx2amcykhj3lofthx9zqj0w2rsf3vgz5eyjomnz4j77tkzky7u7qc5ukcdcriu8pkaa9ixkepy4z0toc2k867ga4lylofjql637fj9h7yc9i36o56zkqcm2we9iyrbastz5nnrz6zsesw58671gbuk9lhpxot72s3uj40fay70bclxs91bupjpnwy0vz2y0nket2uhv0qwbsit',
                fileSchema: '4o6nshx4fs9yslk2abyfnpe3xqmip6v9yilz8ad133djoslowt65lk5t54nfqrj2grn4cyzcot10gmtyc9enr1i9ma6gun568cet0cabn544vv2rwc1oi5js5nug6z7bfzfbmisuj4q3qpce84gkt2g42v793f3dz3lbx28eqlgzns88y61fca2qlywgry9msgo4yxn0pysjc748lc2ecunzsicymvpy3b21okt8q49rgg7xpvelbti80y26cj6xayowan0sgmdmeytj333t8dry1tx5hgro0pvuwnwxlzxrxobheo34ccgrb55mhhb2et3933kg8f7pufmtajmolg3crqk9qn5yw933c1wgadlztto6q6jtfl1x8f2fgxhzctof6iew2zmr5zypz90oe4rzgdgtvo9lg3hvu6pa1ladm75mb0mdy03q5tvvzq3uwlr4gjajz6qxbx8ixalw7dq0xp294el4bbguulyo4pa4fp92hb7qjowgoxoe5ch2ht1dajai9jk28r44lsggynae20x5d8nlx5na4o8s3qoixk9zd2e1whfjf19hll3f9xqy32x3okf4zc333nz4fgnl0khnvp7cgchn62k0n3uwjwybykb8vqulpox0ht0b6pe4uhkzqz5pqdett8s9ox06r8i4qwdzjogbx0kqrd80qfymoznyt5psf9bahb3zq4lrs95vm0dq410nduuad15ojeqo3844be2srilvfolbvlsrl9m3ex03ppap80d68tjscjjmpqb8szs136bpyjznu2j8boq6ounz03gy8a1knka92ny4jf9zb12qmzz27ojufv2fjr43x1r21ugen0tu1e03ddg81glq4o4bdldtj6l5555z0po2lwpknc8fxxrha8g1cwj07ovb4ehde4b3lposw2pc1tftk06wp75rh3d7vi0lo30m3w5hwqcbyrldo7hehj8j9j6nx2sf98qjurychbghmvfs8vgfmrmah0fthyye6t6jxpu8ab0i',
                proxyHost: '36oc35joxr3xmun3ryujiledjlrhl9qrz5arjvs2x6zx60snwrdvorevbd0o',
                proxyPort: 9958766649,
                destination: 'z9ari0ulnftxici24o6l3tdhdk6rcg5lob5oijpixvk9thcymsugoaonfs8nel9z9htucvu19ruar6jh9gan1nhi0trg4ljlwm8bg99stifd2byojdxr32vzwqjs4ewbsdxkidbxdzyxaf9hctojmfnov89yycuj',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'cf8qwjzb7dk4tc0fo6zxqrgier80uj17qo5050x31ljkasp4s22vbincv8kq4donsqqjy71sl1l42yr477f3i8efxizfs59yhoeq8zszu978no01136366yzk68zre966g67i8p2p2r1dszlx05dynk8s5ly54ig',
                responsibleUserAccountName: '2hr3mpz6mvnnc672oww2',
                lastChangeUserAccount: 'lldyrngkwcuau8ijp8ic',
                lastChangedAt: '2020-08-31 10:35:05',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'udkbqlxj4aqv7tsg9ias2v9g0f5x34vvm6cdii7l',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'xvom9jmpi4cmiyx8ja4wy4qp37mbzem0hgeuv5bwizgcjtgxo0',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'uu9ppwhqclbwwt6gjd0q',
                party: '7p1a6hmncjcfj5tm4m20zzily3ryihp8eqpairw5oi9ph5qw0kk88vzhfhmg71oz13cdc31kivcy3pfxxblujjqnxuz8h6bl74760nt6qm1xmjuxk7fv8pkm84gr6pa8bq80m3bddzexedzinjl5o1r49dq0x4rg',
                component: '6edbkc0redss59euit36lkx0ffovuw0u4rkyxpm56joksryhfi53uyo7axqgs904dif25w8jp4sjdnum4936osjt239iyet29p1cdu8r6pmvvzcyd4u0en254i8zyfyb7behf9ijsz83wro3ufi7q188mqbawucs',
                name: '1633eut3m7xiklpotsxv93wq978g4p8b7c27x3aq5ngu97gdzrjubznl4b4352udifc5zqm86a8nmxk13teuln9ti2xardjt7ipyjwz394x41hwrcabypv6ukpuuto162kr6zjtqvjgm0j78u6dwuuwh7zztjp9y',
                flowHash: '6d8d4nep3pd1hpz86hmtbrr3e1htsmnt7y1zsmps',
                flowParty: 't0ittppcwffgrq4n5sipoupjuivj0r43w1chmyyxsdy8gwuz1xka1l4tiav1390j0mplbzy8l7uosc425zmb9rlkqw2vnlj1adam9vio7dhoyx9hp2y8m788gwumhiuzu85hof915ar4ew6ckwdcaj469ep6ocfy',
                flowComponent: 'kon0571pmoa3ysslf5idk4vxhb3929c3oo78kr43276hzn1sltzy61av3ffjnrzm65ws1qrotfb8duxtuk9ypsd2k356fkty1i6q208i0uiyh0l002c12noprfez3q8cs629crxdnae8ix0nzxm2i9ioui81serj',
                flowInterfaceName: 'xke04o0caevv6eu0eem9rign3x7zm0qk0wq5s3tqdq4mqtev0ybgd2abkpl29rwkeljppy4l0xihgp5j343nlmibigmk8pgt5t9r4apb1dbx7o3zwalpnvijhy5y8ya8qap8o4mafj779i2fwbrozsyj4jobhao2',
                flowInterfaceNamespace: 'pbkqs0oden7qx8kxal786foozj6by92eev7vawaxcdd6woyb93mn9sq20czrryowchuomrp7a73tn0h2b8nmdmbbg00e6n59rg3k1dg5tyjq9scgsiop8x2n1u91a92bn27aj6mb485ayq0hq9vpkgufq7lhl9cn',
                version: 'u727bbxxco6pqud7b6j3',
                adapterType: '4po7k3mkaua7d845u0nu3ykr8q5tk833sjnz37ocm0s7zxt3mk2akpv2tlqd',
                direction: 'RECEIVER',
                transportProtocol: 'hx04v8ken1vdcpijr7ndy3vo5ucdw0o9xatwbaha206epmsynhyvpn3qmc49k',
                messageProtocol: '9ygamye3o3vnzckjbq7wszvvf5dq76gdfsqvdfzian263bjthw58m8twqdb5',
                adapterEngineName: 'bmn0heltj1spkz56t8b2x23yry5vo71ie4a1l5gdb3z1h6n6wfmyseo1dvayjbcnu028hb7tgsr1xrck1l7nw5f09ha2zr3g1ew90ojr6kttqx6k2n4d90rx9e3gp7dh7dfj6injf5bnggwudajkzek2yce8mc27',
                url: 'dkuzn8qt7zl0xoq6itmy08qatly0hoewqsyeun7gusxzkacjre08rqkiiltkobowflvlqhef1832kvwvqa0cw0nyisotpwdfw89na0cm1umvheup8j797r9r2666gdmvwpkvjwp59bomt2vozcqd7zrjjxde244ui8kw2ufl35qkoqri8hfdy5rcuh8pz045mwrf88e7z1jg1mst4tafi94vp2p4quznu32t6sd0z7ultdlgmkotp0mw5u9u2bxcdprgw5te6t1b9suq05k5s7dq95ta0s3wz4le362q0oh2d4bpu7bpwdtb2tixhsff',
                username: 'c0509aomro9u62axi9zuvxhl1i23cteblvw14luszj4y4q66z7tix03oqcum',
                remoteHost: 'xx4fv50olfydhntsm9i273fc1i7s0j102bhmwort4523s3kom56fy3jvoqb0yoveha3zrk1xneq829xpuikfetmdzlrn3xml19kk586ovncus5j6y21l5g33vpohc7nzuw6vgtkoje9s76re8fd8xplx1bebiv8w',
                remotePort: 6117507073,
                directory: '8c48hmpx9g6wabkan0kwf6oey7znz68pk4pp1k70tpz96mp1gn7kaepq3l3w8mgz67mtrgk6gn673kgk03t9mxty9adqi17ql60fsedunc6ncfyustemikkmspixu681ld5ajlkfve9hnkhtcwxhbh5orriy881pwrxvq9p3in4lmypyq4g00xlvz2hwz4gux6vzg2m4y0rydsyg2w91fmxhhpn2064o31yp6kkuapjupmxd555fzl3uy3174g238igunmv7qswiyi2d3xqhtqaxq28rs9cf569e2fgr9hesi4x4kwcpuw0vzix3vt3qsngjjgpfn3aexnwbjrl455sx3m2zln3ijzyrv6ptqk9658laziiw8qnat4xt10rgpxceqcvahv7cfjutp6fl0nvschwnsp4g1lh0u7oyw9wzgu8jzke11co5st3lc0982bec9upudw1ux1mwuhb67b1catv4ssfz90plg1sjct51n3f1qm68m4yoon31iwf5kt50pfqka2v1iy2vfg4bc88vlmv7wcmiu7yd1g47rez664duknkvnvyycvahgbyy60jvs1ffkeok4x0p9qqsftmpk60dtjq2jhzhskj6b05tg29k92zk8prnmk0nydly8mqui83dekj15gtacrfkbke6lmh1ondkv9x26mtjw06edq22sfodplhudw4rwbhw9xa6jvfkumi3h74qiczs1kddaxuabxe9nxv1fm28iwcjyr3zoswtl9x2s4i1dc0piqsdg9hrd8ztadokftokswi14hpia0pwzze1e3lf1rz7939xl83toe2k38up2l60uvbnkle5cx6ixk4sjjpxhq6ow80zwi2dzgnzldoc07pmxuq8rx7kzqbfkxritk3gmrss1iw58ommlvgry5z9un5wuxv1i4ho5xpxbtougvok7i6tdht4ygkn0sd6ysigoz70qef9p63f9679dtg4byt4x4u6kki3wkky1464g4kbmvxocwjb1kyfyyd3qirz',
                fileSchema: 'mhw4k97s1we236p7j7dlle8npt6ae5sbspp673wfir76bg0sjz25mz6f4ncmmfr2f6tyls1frssq3ktlnnte8uc8nfjrelfdecit5pg8u0m8otlxkywtxgb7usgxfeaeyzlaijjzsbb9l16leijzchj8115996favt3m44j96pv8mdsvz67o13g36hpbjuxnknjpgrso7zqhuddp2ynpbhhfylelc0odxxpggbbeq42qcg9uz4mgqv703bv3vadx0d5bbdypx4pu7413v21o70wabdozjipuaqi1qjw7ks9w9jii0gtfrvcd0euafh10055z07rqdkc8vwnb5h3f1k31qgv1oa92380hg5bkpmhg1msq6mv586f2pnkypvdpzt7xuf8umprf219qffl71hnbcqotpa1oq73jffyjj9iy4xjkdv66jtnnufgvas2ex78wqt7qwlrv5zreomjddyaqt0v3ghqmsathoqlh4ccbhmuuojdsw9chx985i313ye0aj3g42e63ggmsko5btkv6mkbzcb7hauwoud6clo7dzo8xzl519tig8bdpm2yp7fgbmshr1f127jow2lq67gufq29u05mncxtqiu49p04dhbqyu5xg2x4lulvc0mfmt74gsy4aulpewo3ge0nqmo2x2nbzgyfpes4qnke2dn37e67r7grfyduc81txlt9pvfpwzvzitedk5xtc3utiku9jwiegkt92teu1vwtu2dwqjer5dhel6fjesf4ngpl2cqb3c5alk9eos0pc9flhjwhkuum4rtdjvmjxc4wibsnfxsfczg3mpxang5ra32zzemdph1xa1oczmx6fdqezg3x7svj0o60s2bq09qnwmm4fnf16uv71f3tj79vqh8ea2awzjm4znjzddwlmnf9rl2onr63nb09t7x3kq3ynr72idge6lxd1sg84lq3nxrhhvdw8qv6nohmipydsq2sbpcl9tqi8sgu9s8w4tym5umr1g8yap7rjz24gckuzh27d',
                proxyHost: 'qcpsbhnjmqh6go8vkmo69mdlyvy7mzqfouau1uwgkv4pcjxo0jroorsbvtts',
                proxyPort: 7015937800,
                destination: '7fi1yovyocgpzj42xgblqlqwtitvutwy8qmuj769g3gqbn4nvcp6cy3p95uikgxmysz4wxn8tht5tjvc76as02sttmdjz8w0phv38kb1cyszfjq4apam2xg0awopjvnrrp6sa6t4k2bab9z238o4syqhkzdl3eqt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'o7wlu3e1fi93or10jnaetp4j3u6l7x7fwuut6kk0lm6gp3f8t9o43fxdh34j5x80rwa7xas9nqwn1ek75ppjrhzdmle7nzy4qxwhgdjurrbdvgtbvf7ffjin9baw3ybttyhd18b643vhwpskbuq5miag2kma0vtk',
                responsibleUserAccountName: 'cyyeqsusht1coiwrtipq',
                lastChangeUserAccount: 'nbznezvbdzgzrqpzh3pu',
                lastChangedAt: '2020-08-30 23:33:23',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '11x08z939sdnfbhbsf8r9uqqsaxbupdru88np9th',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'p3sfzu1twmc3rwgrzhtzpx0ei5j7rhtj3gol4szpft2wzm45y1',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '44yugj5sadvil44o6ee4',
                party: '1i2jat6ksz3brggsiqf6uofz3jo6sij6qvdnyqwzxxvm0qrhj56it4o8py9k9dunyukp4iunn2w3tl0cptros60pmyu5h7pchovvhbz78kstmee0ndotxffepd5c2yswzrpg5ibbmkmqdpv09cio012unwosenys',
                component: '4vmfyjfjtj4nuj64squgi1da6rq2x9r8fjqh13c9jvp6stkuvw8ntlabaj1s29ss5zm2di02nbjcekajjaaonlm5of3jf6x31wst3dumr48duemcz2w4onghaaoox4uwchalbuq92n4urdvuogpk29xzjrzstay1',
                name: 'w850cmczu3cvhh6avbthr1pr7xxju5c6pop95gtatuuywqnv5xen8nqy8frytfrw3r412nm522iqldxd6fw249xqxojuxnorvchipqz7pquo12m271ufqn0npdmtqt83qtmq4t192mp6ssx5uy93yrrnhjsj171u',
                flowHash: 'f4v2wij1xk97ij69immitfwp6g9oeqcyx49wyijj',
                flowParty: 'x0gk6ihpcbrom89mohqtpwowbsziq9etvmzwki76fg56loje4cbvc84a210e7lzjs1cldbvf6q7kim5eh70vs0zqxhb6f77uzky1t56d4ukr8q26z0mnxh5s62lr53v7kl412xdxwf3dvgck3nawmusju0y0lqat',
                flowComponent: 'i5f7toa2i7ymakji2yepce84nmrhv51urppepxk0lp7qbnbxaumi43rlzv4u3dz2t7jz7blhs98tt2elvjo3yejxyur2iot50yf9qlhhxo2sk9czxbdct70d8pnrsnzseeeh3dwpiifjmc1nipsweohg2q9e9bu6',
                flowInterfaceName: 'o3v1dkvuic6wlxn5dc4pddas4ohar7otcid8oi3olos4s86hi420pnek9rcylrwd6oxx3j77tfchfoozbz89ygs8g33os63cyfp8j2bxc7i1xlm07slw33c4o2njf2vi37w5dg4pqoes27ldspnvbeb47pqdws5a',
                flowInterfaceNamespace: '6cmcvon606o12erlu9jaoq9euqqsmohzt1vh24ql4gc6dcyoqwml7di7k144prw66fhpxycz6tz7gtafdz1tpv7x256ovvls0f7wvttiswc6fo6q9407lh0e7e7qvh3kpiwt6b161rcyunbxxotpjhtfqqcxur8u',
                version: '02e5esbyisnypzjvwbzz',
                adapterType: 'rdrs4p7jokzwy9cj3ujbpz9uqtevo9kqup3ycmaobdxsn4cfwbk0hp9yjzkb',
                direction: 'RECEIVER',
                transportProtocol: '0d89ggbnsb0z0fxyk2pazw55agzenxi88lolus38fwt5sqiup58nnvtr145e',
                messageProtocol: 'j2b2dmjnaq6qktgh67kdfc1nniyo5fowwnfu0d2wb6tvndq4wungski9rf6ry',
                adapterEngineName: '22zpb60jxyjpkaouayqcswqli3f7ko8q2st6e974k983af668yua8bu82wtihy16dcq8xojv3v9lalevfiej86nffxfyxrc4bzgh5srobhes59nv13jff3p42y9bnjzapqwf97gh4cq6mcvqbhadovjpot4l12dl',
                url: 'dwgziba46ekhrhlkg3n8iw99dr18s7w8dch38iuatlr0qum86vc3thn6c5shvdklo7s39h6t9t62244cgjaehdp76wm8vnlitmgtgj1vokm8k5m5jlxb69ytq34u98zoxuotn8n1n5mizti0vdyjenj4mprxuemz2s3gh2bupv4bapyzbpnzmdcgqrz6mrdxuutkeaus18brsiwndn3oh8j0q8d3n61ohawyzxsibh74j752hup5jxq0zq4ynpdk4xlnzqql2fkw1uawe2af7ddt38wraazwtq1u6i7axsxhvb9rdd3u0tg50q0nlczt',
                username: '7odroxjq9bseya13zfg6kylu1oq3qzi3cb3y9s2vdhrazk4hgs4gyr0tzwhm',
                remoteHost: 'ijljrzdv8acj7c8rtzqsqz83sn7ke8exd5pw6xl01s6uefxbz0hx2l52hskexhtqd9rf5xtauxpgg9k509w0a0f041qcetuvbbcx9xd5s4vezhz21aucav1tmxbtsdggukb34pc5s3x6lytpa7crjg3rous3y5uf',
                remotePort: 9647920943,
                directory: '34miw2cv39ugw1uluxfcanx5xa97qckvp5lr3m4959ppe1uuo4x99n3dkq1ri3ggk9lr7o14nacsrk3vhn5twudgt1d1kbk0ctys1ngmg24hj5adk91ffh91eh8rn4ojffm6hxoe92fx5xfsk3690afgpwwxh2jp3wjy8g3wdnvwy99zayuy64vzj2cg79kpa7ww1ec5zukjz3txqmxrtqy993jvmtskf2mzpm9xuefqpy9nxd26rgt0egjnubv47w9w2ua91z1u7ahtdu17y544asfd0wxqitc01tclsw8jiblk4jk6rmx4hrvw824kc6px7hpdy61ewcckc3o95osqixsqd1n64qzutvypf8nbzbujzgbb5evzs4jd2p6krmruge0pvlu0m0lpphzj9t4seb3muysk1dowvfznh7ei77pk5sh8kt3qydtxagbyckn1bt0at3n0ih9s23ebk4gn3rq9g5ly1kwf08rx7ssrn8zcokfzeqi05u3tnwo2wbo4s12dw7tddiafq97878q9qewicxs97pyax81axr1ks5ht6p1vpc8vkyb56cl32tprpmn6yq6g7squzbdewkyui017fm8nbqjfm9k99y59updyfwzpcqygfqhgscnngz3s4mepc2rydolqdt8c6yk2r4i3n1u6a2xeikp1qn4p3cq6v1i3wugsgkndm4tmx4unzmrsby0ugc4utqedfj63tidaevhl9ak3odxo2fuvowo6jgpv1dicrcjg39m5tu8jcccj2v3j7bin9x4ylctn7c2qh0fzpnw3smdk6iv4y8xsqlyb89b2uxw26bta2hwjii3r33zx12xl3s7oot2ir539qprn9w76y0efy8fkholoovgbync5vhf1h41xlydvaowxbnj7zko9rclylwvk0rme6z13jujvggt90aixsy215s98y90mar55pjfixnsqqeehy3oxafs0ouxnqzkxf2onvi7s6r3xf8hxexrgll0ng00qdknnf51e3n0x',
                fileSchema: 'lad8macxvjxec35fvu1unrd0e9tefwveygduw6c2ximg1rqmckqf5r42mfd64mjuaml211edjxdl60aejpnqlbxjvll9efws4ktsb76r2lw3v0g6k2zzp0ud7p2dr0ssuuitrqp964i3ne0e89r2k92qfhnkvj47924k9vrhgve8a4bj3gn6wxij8lqqg5hyo1mrbnpjyiwfobbhxqhhi0fhbkxrsdqxr1mps2ta0fsgsbrogy6f4541a7aln2ur819ceumpgc1g6pjq9wc08l17ovylygyts4ox2fybzko4oa74pfjtl13q1po1ztt29trqt8eouc2afqqohx89jdxnxfufpfq715ms8dhspjjij3kenel3xgz044fj9cqkwi2mb7uwwtl406c2io2309xxf5h7iwhqx4nsfps2en56x696fqtdyuztkfo4zp7lmhk5fasbsba4zg0kvaad36p2pgu9266kwdart9hbnq5qlvnyym2pnsl2cg3g73mun6kfrfaljx7k48n0uj7ntuu9v31kpqut4h1u05zc3zc0ix04pm5buvup0j3j680dt71cchdfvd3bx2nevlpxgfumv21jpl2y6mxscrieari0vyj8ho3yf2pk9ou1s5lgxziimwydkosq0y482juknwvbo5dwkmvxpw5ep23qtyfgdbrjry3jipwxwdns5kzj4dzalz28omc8lirbxvg4ck5alvz9p35aokzm8v6b60ixvgn5wn1r6nj3hne7zc9iemp1e82whs4kubwgejfydugz7cvy5s5ifuu1sdzhayszwkk1jjy7tsen9kee744fc3b4s7anjp5rqy7cwhlim8hpmoalf3ljin5p5ke0btxe3nx9z9af4mzounxatt5jfk2x7dtzyelyctoapik1itp7gnq7knr1xpw3m0a8pu6vvbkyiynp40c3thw6czq23f5b2zo86a93za4ogo4y8eu2aqe8kc2yayxww7tgw3mvqca1s4sc0qfki9ejiiy6',
                proxyHost: 'ptursaq0lzjv9xk5st7ylheg9e3npy2jl5xd2rob1r8u3h2woefz3y1omsbh',
                proxyPort: 7367085456,
                destination: 'idm0b1e41284sm4uumgrnamrftrb1zpwwwe07dkfkxvzj6pkksfhcy3ghgv3oyeo0rrubzztstnhs74mx7urni7kfm7rbmxvmkv1o8wjap8iyotg7w2ouamglrfhaplqt8v6mjc2da2mfx41p8q0jc32ka30jw7n',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'v7hu97omuj3qp0kmyngu2hdclpe8lirlmryyme5iwp0dksc3k2zj1x1pcudsye93eehbtqtwcan0wi0xg4nsjh3vsp9514yzqdpogmic40gdrtmv9491i6nztrigk7dknxr6fllfd6mofjf41r1vocha1sedg2mt',
                responsibleUserAccountName: '91x0ec5utb6raubshwak',
                lastChangeUserAccount: '397mmcdmdenf7klfoi8i',
                lastChangedAt: '2020-08-31 05:09:36',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'k3kj0y64nnlpv9mxzychsfowrk8fi1z3vcdkmvjt',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: '4mywpa3so7vo9t66vmow35dhzi5ym6kahd9hbsm674nc0k8pko',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'aonso6zdhu5waec1ee0n',
                party: 'l4xkzny0ea59k7k4cb5m5g7momhr4wpywpz5uibv4mkffck6882701n0zpkwqm2tn96bjz3rc1s2lftlimz8kp7fgw1rxr9lg9lsqs6ynjlg3g98mai19lcoy3m9lwo82qy53she16g71senedihh4yhk0m4r2ab',
                component: '4zlto0zrki8je8vvuxjf5eyvfp1zsiu657a8ingcmagrsj4colfoboij7loyv1g579a7cmznog484ci17ag4txc8wrrp0ei2yww1cj6d89zwxfu81n7p2whwbmxrzucbuqwitnpqhchqljzt1esqpv3cmxgmjuqp',
                name: '843umzjumm629knkmo96n00cjclkdl5c0g6ppba067iifjlo90qq58d0it0vn4nluq6ytifhobimd1ruk8243it5v0sm0ctejdadbhxqlnjt5mlf3pzkcwhk1pxnmdiizcm3num72otgqu52hwm4u9s59jy7zroo',
                flowHash: '0pj8o4emwk1f9p8fcgkk7bstgmyoj6187prwipt0',
                flowParty: 'ootdindndkf8ivq3nkqsvugj516svjfayl5irojbj0f0zkza34w58mre6xnavbms6ydvgj36rxmmsha6tzn3uxjsua3udqt6sgpq1dkeez2k4oth41x555diebwgq55ksfszp1t81vurukkcevowxfjrod6tl4v2',
                flowComponent: '8qbz549ylzzwcw7wckn25beaprgqhdixeo00bna3w7rt9c57ikh8b9x26k1n1h08mtsvrffjml2l5fjw8ubx25d11e7a5bh61khrsaae78dxuwgviavdk7vaht0rzklqycih7b6cmw68rca7pvivz3hrgwuwr2tt',
                flowInterfaceName: 'dlm3d1rr1mlwweqdurq6x37cid9laq5t7ca8104ky9tustcs3dczf150k65jouni3lxayp207b5rdkken0k2z92a7hc6zggum07odh6fhazaxfe8iwbel6abahqhylfanax7y27b18tvyr1y13ib3c89cnq5iovz',
                flowInterfaceNamespace: '9l48slrbnkchoaaegy62mxosz9wzzcqd1xtees6oca5weou642m41ogoi6bbe3ldjrt85n4njyqxkswpiitw9j2tvuskn5vardcbgvmc0mc1ma5s0r7r7u1e9h30qhs1gl66miw2jx4g0hxkmeva1cfrd06x1f37',
                version: 'ozvm9b4j2z758cl47haf',
                adapterType: 'aroogs5a1k9aij758667cc0ygatqiumm0ypmtf6jdxlt6ofsl4xuw4f87dp2',
                direction: 'SENDER',
                transportProtocol: 't8mhr5ukrdc0pgbmxdu9q85f9m3thf9lytobfnav2w47tfvy804woy1cxz84',
                messageProtocol: 'e2xmg6b26u2my6sip78rbgc2o3lustg4tyb7cebkq7nvvx06ush9ic3isfku',
                adapterEngineName: 'ws8c49xklh9wzjfbmark9u75i79x21u5ljgppbtgwovsvuga5excu9ujxn896stwlijj95ekj412g5jhg5meathgkqma1ttcoeg48zr4w8f3mtn9lc9xy6w7zo6v6rzmzt7qgcvw6sx8w9srrgsc4uwf0eck7gg3e',
                url: 'ujhh9533aegshg4ekp547x8em1oeftymxmt1yhuadv5siuwd3rciq2rhmd19b2izki4bxholbcs6wx76mx8yg97crqai0f1mfmcw83bco4rhrorl4xw6r2j9cf6kzkvnyrv1jjpzlqcdbtn7xiv185wjoxobwn2eswl82zr7zqglx8p84hq36x4wbx578bju7av1sanblqimdnuk6n7823x1cqxggv6fxdzbsu3639j6txklyok6zol9kgqtwduw5f9rrj79a0jeyt8o01vu9m0ri8wk8pwyafq5jfg493foygi4m7cfjnq586hke8xl',
                username: 'x7riamx3z7btni75kvax8e8y71nn8xpl9h08ca6gh9ytt7zw4z9qtt8006lw',
                remoteHost: 'gscbu3pjcjlzxhc38xn402ltiblfh5ew3vaf82lgc1upk0bmn0r41vxmx3wu09fdg6ra2owhrpiibxa8hffeqhk9ochywkaydutme4d3vrd3u0fxkol0u36ihdwgw0rtdkv9fmycaeimd6lx78av8o7ldldifgbu',
                remotePort: 5792704236,
                directory: '6g2271y091d5gallogsdea32z745fysp13vnldbpmsahclby6zb50tqr1d5mo3e3uoqqi6ed2fthagt7ofgjwbko72ummfogyzt9am0bjzknmatn1mgoox547p1arh3pn88iaes6y9h93of5vc2d261vsvkfbenmg5cs3ow7etvgvnjk400r8r2r3xpqp8yajdr0zexv5k32kyxirs08wf6psn1fdbcydq8jc3jntkzhctztpcd0248yx2rxn2gx5c3074xqfo4vw8t9hho220twygfz90vuxnio6wls5vlwve9ap7sjvrd71yv5d0skl2t7r0wp9gtth15m0mkx29392lxug7a3j4t1ls9v2n45w4dc1howha84x1e11a8gg9qcpuijrhai9po4ufzxjrzh19wbfpxzndo2xgmjp7x5wdmzyc6bmbzruv4rofp9tex8m8zb19j8foq2a5tzcnmvtuuvifcl9vrzw19ws8ptndmp7l5j99d4euvftrxnmjfp2c8bqr469ybo1er80g6tinwafdzo0m24zmj3s7q3bsmmhsmx53pmpk5e9icrjng30kyhkumkmy9r7xsff5ybe6ukl12jqrw4b74sf03yfv3cuka8690vqegove4otrurc9rnj5mmg404xii2zdzda4u6o0oel9nzhtllrp2zjin73880v5w5fz3qp8vx8zt8n2vhlz11iy21727e5xiub6ge5pvsylzhkki7yk2xywu5jhtkby9a3w01ttkv6quo85ll996apn0ddjdlbpcxqp6e6jfh9ht854av5hhwnxvvulzunuj3h60qiidxpv3t2u4x4qklzpfkwfbzymmi0socvb4vtwmaeguoaafq27a43kz9mtsgf3g71ag12tx6vrosk5xlw62ar4elk60u8nmvd08bu7avc0m4w6hva96zljyd6szd7akvvwar44l8nxy4s2rf2b85xjyrh29t1lw313ynka6ae4bre5vgwafmg1d1h0hvmtv7qoud',
                fileSchema: 'iznhfr796iw7h349w1zglxxv9uq5a3mz21d0x2tme466jdu7m2ba8pue1dognr6ntsuggvkgmie674isxcoav4712pbin28x70r7amahl9xwwvxb6inv9f7xf6fv49dcxfr5tq14rdlqlk25agm3z0o44vunbveo7s2bnxxogc109b41q0t3x67p4ikdedtbgyvdnc68ntu0d6dnzdxrzahnqjy6k568scy4z8srsab3r3mm0t62ocx395b3v2gg0iy2svfudax6g9jk3n60ljjt5cn9ulziqbfqp3osflfntj9lc0twdqgjqmgbgfagp3lazh59spoxas0ddjn62kqeyr52gvcomk67asd6su01k4p23u5mxrtjodx2mrr2j21d0gcdhinoc3ahpamqj6xix742j3g0ilk3psi3hlb6ngcvyyxdf3cspuy1tzzy2n60sqr4jbtokfdj56zw34givyqcr29od3pg1axei7d71l8u6v7cxxsz9h8kocutjl5l8jbq7glwwoxwj8uzywrgb27kzuivz07gw6mz3mzxez1mj62qza4dg64gls10n93lb2szvlkia1grwynxdnxh375l1lhguutb9lgd41wakuzb9lfoyekqyu8sp8becxgqtgr3co3uttu7ltsu4somdl4a9n7z61rgzdwkmmuqhd1ucfhgegoay5xv77m5nmdyesp3x92kpgliejdt0yuu5bh626snv4u537a0ftk488va4bq84ohib20h9qdwlq9hv1aqn535h52w0yik937vn8bzfa30w0pev6tm1l407dbkwkxdv2r8m2fve4gn8v39ly9wplc1osohbk729p6sdkezitlqp7sylr26kbzm4ia7qfe47x2ar6bbfv6nrmnxvzvtfo3k6i7czdvhq5j6r2uihzlaqdkzb6fx9mtfd11hfkikw5c6h2h8yaq9xf0kq39ocpm1nfsxc92xooqrowmdfx9qz91z3jg9bq63mwhm9jx64c96lhrazle8',
                proxyHost: 'pecujtspiylvkx36shhhrx1tb0dktljf3h2r89vygd43yy08tc729urr8zl0',
                proxyPort: 2107868677,
                destination: 'x1y5ctt51j4y0i2wqjry27p44733qphpdkcf5mv128slwslfkz07i6t4fwnc4aidq9hssty5kq1fl6lm00a90pwxcjse2ba4f4ufdvldr1ghk1io1plwgepepsqt998ioce5hnz6sh4uuuhaxu381w1nuo0n4t64',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '3hrgujero6dunpy3andzfg3irl86rvy9c3p5krp4b2a9jxi0nrnie9f6r4cbo61qgc1m2rrwvdbt5jtuqswf9kw98whquraanz2r07vhcb1g3t48cztfjnevwyldqlcv7te5cl66fzdhmr3stkuyawrfleki7xq9',
                responsibleUserAccountName: '0ekjdipz2rd7eiql5gf9',
                lastChangeUserAccount: 'phqvun0vvgh9j3efsa36',
                lastChangedAt: '2020-08-31 01:17:02',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'mfeav8a5l5g4ggnsk0qeq79ov1whzvhyqjtv88xa',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'yaxum8a7pep2lxomvltd7q8499rnunepszsy1jaax4gg6a4acb',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'zlp08g5nxubasqkjribo',
                party: 'a453qqpo0lwnlt8uxgs7taux41w2zep12r7cqp0sgo9vr571x44i7gwj7hvdf2xolk1es6v57i61pbpc9atuonnr25blfvzlyqs9uesxmabk7reelnt0lpu76hxxza6a56860nfhjbpdyz7utentp9ptfn6rum0z',
                component: 'wy3nia224oo05v9chutstl5gzhz15syv5k7l2zd3rxrig1uyvl6f9r2bs58vhohc3zujyxyb71f8qsbz3jdrro7pwuoplsxbf9g5ucd4ooxsm8y6aj9pjz8rzrg0sfj3ayj5uajhf5lw4ph5plw8ml72mfitjqbm',
                name: 'evzskkwq89yvrsxq189n5cyp6evg8g94a1s9vyyembv5h9stx22xv1zd95zixvmj35362hk73nt343ppijy2hecab6unpmdd9ndyy1ysfrxozrpgjjuqt3wjtflmhcd1oih4jiegzo5gt832407a6i477g4ehpeq',
                flowHash: 'p8zsl2u1hy6n2ei7fjq9ngs0fqavzy3fkj4kfzta',
                flowParty: 't0pk70lzmhl9jafr3hy6b8p87cm2m6q4e9pulp4vnq9lb0e2mypvcz5n5izk5ah5mx4iuk3drck7v20880mbegubtgvf9ph7d4pujfvqa4i63emshn82zlws2khw97eknk734n123h0cbpnnai2yl9shwydmw35w',
                flowComponent: '51azdtfz70lohdzdwh9lcwcp73e2vgi52i4sahydiuu71k9peayd5mto496uk5regzcy7zinpylujc5j2fu9tkrikd0nznzsa119udj3zlhl984a3dsfwbm1gz37oqodyhhdolrjohdfc43mfyo81kyo3hg42s3u',
                flowInterfaceName: 'r88idn7ygpdof3n9h16l58owtkfwx7z6m6piyy0yoincznvjuieilgcfn5co0xqn05whrr9nb1zs5l7g5hhmu361jgh2i3h91qzo9vv2vsg3ga5dca4lhfyaxm2nqthv4dkoiai0rvya48igun2rdahvvp4m4ywz',
                flowInterfaceNamespace: 'of9u7b6ntmyt6k7kca7rfls13vfs7igpb0alew13c7mzywi82ab6vp7tmccor9x084w65zdysvbavrxjd185olnab68d9u50c2lvy8rfy7g3nmnwzqkebp3mzxznx5ko2ro5bduensvqg8vyfixll8yym2j0soav',
                version: 'xnrbesxny47qi46iac65',
                adapterType: '5cm7t43pcoqyixwgc3wjm8qbfh9mw6yeedhm41424odiet2wuez0gfawvvni',
                direction: 'SENDER',
                transportProtocol: 'h7ai4uu9nt7chrcn3ezymr8fxfdkc12qd71rdeq7x892h0xpmb55sarhe4ba',
                messageProtocol: 'irtp3x5sb0cmdedhqp42dur4bqyjrlu3z2o74xqa782wc9sr4ak55kk4pqet',
                adapterEngineName: 'c3sgshbx2gp1wbrbw3jbqu40002b3dywoi3t00peqyxdgxh3cvg4cxpb2s7jf0hswciof38s410xks3wukzjcdxvqh4xl7xchh83z5wl84g4udqeihb9k6tts9v7fpzfphu1f0g1u1bl6f0p7mo3qmkzv07q8xcx',
                url: '6azy02o8eqf6wcpt5b52zpo8loqmfgkc74396rmvjsxz39gubnjfss7g3pwdqenadwfpkaxbsr1oz9by4wfp8gxe6w3y1x3qre2ydlff68lygbas0xyvin8iwhsi2gj02zus9ysf33fpngtj9cltxmbv09zj13yj6fxnwx0lf64nw2ifyis888j8qxxckcqovtjtnt20361dp1ejwm0xutrj8q6lum1ipyedbjdmtzymtoskpuyismg1ku1018k46beofy6slf4tj76npdprzsmwfx609ac7yhi76l1m9taak96ag12c55lmrgbqygvp9',
                username: 'usb1axwn2fiqn4lrljlg8pd3e2chgq5fdadn0iso2wpjjfpx69jr7gzbl6rd',
                remoteHost: '5neghfa74oaiwliypm6xjdj5b91tgupnbiovfbse92ti8olobqh4wzicegyrbham8d0vd7pjcmoomu0tfxb7vta7304c19yt7tihxdjedxxq0x08d40rah05dwjdcdrq7exof74usi3pwl9ny0z7n2z7bvlubdkb',
                remotePort: 9196410247,
                directory: 'dyo9hei3j8c0vid3etg3wrnwfo97ft7q33bay9x9drns177p9k079r2ukvua5s8ul7qzkxx203t1im9ktnygomj876rw3q3p229gegb1ffigs47li30g853hdeilgxog0dyjepams51wgj25j3g8qpjg8svk20i0lmvhkbxd4d8sh5ivi3ckblnnl1vbzoh88twwnmphtli0ktgzxqa2rg5u1u38gkd76mtofhufffoy7yth9nzufi617mwse76arkathqrbeyrinklo038qwz5w0pck5av4u1kho50ti90efdx2obv93uywvgj6n6xk7w02yiffolc4ghxlaqlaoa2lqhnshlpdedoige4syvh51dmj0zk3g2jwkse0xz7x37lvx6dvijskjdpios1r2ydp4sv5lmlto3sprx4l59opgj5lyzu785vjhc2f0lvc59u75iiv4njgxzryejpay2zauk7t3wgaht08taja6n0abbeeatep4m5qrylsgpgf4turyuhxxshcflypvdly1rf3qbyoadpoy9sac2q1hljeimkxw7eiis0nss11v3dnbr2pfd22y3j61xxxhcc3sg251t4yf1vbusxnbrbxtmvrvq2kjc6prmkqjfamskzjzmbacer9hnpevmiza9nyv506sbg8ntm8zdcwuhr80mn5jtt7zs7c21ccv8roab3vsirn2ar4ltq5ctlktd3ogigdh6o7ivtmmysyv3pne75n2naxrs65t1nhl8rqmmfdjqjxrbfpgvn2ee8hv0n2anunx55rssmtnepjwyityu2ew5xjej22podot054paac47rvpqa3pshmc5gav8nlbgq4u9xvmcgskw5hvhqh7qcb93w9s2j2931w4zhxmexichdpkmyxahsdqlpgzj0j6nazwb4ej9y0hp6eb9vm7kbx714w4rohj4538avzb0tiz7ixnemukwxyety5bndwks12yowntcukwmr7sq2nktcopun2im4nqkr4ye0u1iry',
                fileSchema: '0g1huazcatpqfb6ei7p5fxfa3xjlfitfxl7fhwdkrha2wnxhxxeahyyaxgpba3ail7akm3fa2zwvxm5uac7wwjhklgi00im207zju0r5tzngdvs9liu1vvhmzsgdagzypbjv2gsliowq0925lse1zz1isqnxpa9de84ymfapa8pgal3tdvndebcvexwh0u2gtnqt11fae0kzv58izgl15c05jus9s8194ni00jmodeufyunvf53d6mor39cw25rdokzvurz5bq9qvwjlsc6oicju1ygdlzdlfyfpmexbsd7qkf9jlrywess6r4eewmn6pazjhxgpcgi9ub4bmx8cs3ds5gke53rwa8gmeinke3rut83vtaycm587tmypzfermm3xmd256o1dc5roxc0pfr6wz9mmnu1adlyhl7hqlxaa3s8ay4qyyxsbbn5h5aj3sqdmbjsfbtme2sll2jq379iboi63lad346p9lx7k9o4rjgmatwyn61y4cj03qay9azbmjhtd1ytla9vaw50cbkx9ngwyjctbv7ji99zdah8n4u8ca8dttqcz6p23kguu5byt68zgran992sp5qy0oc9mbb8jby5a2y451xqbr72wov5vomltcg9aj2nl4tpbs2h34uqgumhjxmeb1qd1xbii1gqc8pvsin9kpq43o9sik0i1rvfd168k3rqhgr8xj893apnvmdluea0omh4wopc3rmoadxtgkmvmgrrbgbyxg4t739jslifrv1lvguzfgu44rnjef07fskhlcrv5qojilero6aug960une56j4pj7gdu7zrsxvzb9ykxz1xs94k0isn01xzkes2g9wlke661ofkr9n7qi1mlkylz6v534g6t7buehju9wlbhce9qq30f6owlk9kqrtfi6iiklc01znmir08mu6qzth9yqrcty64s5lo3w1kn11rmp7dfwy4vateea9ydm2i5a1nds084us9hhyt8up0neibsefqoa3g61rca0h84b7jtyf9e',
                proxyHost: 'qbm6pefp1fq82dn0zz1imxd2n9ynhgk86068imby6y5w4jpbro7cms8ik8n2',
                proxyPort: 6026960145,
                destination: 'nzpmsg52b95ze0fdl1zynp5zpkklq8gz7bzxeg17ejfs2b4zwfcald5et1pvabyocwz53v4ies9e7fs5yjib864ceh2ge715388b5mr7odbnib5h4n836r4fx3atrdevqm3u3lsc9aukml267lket69134vjsxlc',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '684e34y94x1up9vkwyhhfrxmp21rohti4fu5lvplpu5ctpjczyus1r1woai3du8ilbwbvzvdsdk0lvs7tqwm6c4bvhgatub6suddp2x1f358xqr8femlyk20zcntshpoo40yhvy2bazkdmzaymyf1nkos80sy1zf',
                responsibleUserAccountName: 'hpo9uja78b3c92ix46t8',
                lastChangeUserAccount: '9jw4p6j0jxb02x6rwwhh',
                lastChangedAt: '2020-08-31 08:36:50',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'z1mtqh445jwrjwaef2jfryfqcs7888j9754lp9zc',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'im22vwb7gugjxo9959zthxa341vcwjqfwmueh7hiisztf77ut4',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'qimbdifccjsrz1aw4xi8',
                party: 'pi4mbzd293ey1v68y574my2mzhmedxusmzpazusygoyqp223pchsiyz99psstevi5hvlybk1pp3m6ldg81nxw5asrmpalmv4pg4r19cnt6bax12v4hz4r33b2a63vi9ph1g9mafwspcdpo5ww81jcvunhnve4ax3',
                component: '6zam13v59pcrvl18y0o8xuvp8is06p8ao54nciqxcel8jxy232yl0jn6602z959htcky3cjbq370qsw8wzm7p1xvelsuj5o2lgqsyjsptfu5axafq96fig3uvurgsmdgdbe86mec2wyfmhoyqqds9ermmxjcqbhi',
                name: 'mpkdqwdbzr17b9lljgg9xrer86hh4twxtu4vu9kzf0iy8s554z04jkak272aks6xry6k09hx48hogb6rtmap1jhflm68b1cz4tewhe4xc30h3c0loovlmc5ih4x17hb57javc3svkurk6157y123xg4lcrezg1v4',
                flowHash: 'r3ptxzniuiuzhjhclt9dfslzph8swcxamkj3dp4x',
                flowParty: 'pjqebd3d9nrvf4krd0mzt7dgoduvmbwu0xwt85nu0kfmvruvsjide89zvsz7dggdzrkqyjq4dg52ai9ctdo1rtaqzbqdfxo0pvdz1rjzwilde3xyt6q1vqafv8xqzb2v783g7q12260pekxq9spazblnk6b59h0z',
                flowComponent: '16bmsds0huc065w2l8pyc31orbsp8o2u5x25un12t82pjb85f7tywdfow63a1vtmzxh4vd1d3kkm1bh7b6juqcmt9i3yogzpldo4we3qorlstx1c9uva0sl1yn0fuch4ozzodr3o07ew5q5zsgxot7ewk2vvie1q',
                flowInterfaceName: 'c65ca54wccaq3wggzc7lhrhqpneypurytruo47sej22d7wqeau5oz0d3lwu20xuqm499558o4pksiwbd4fv77eaojo5quhw46sioqzgapsmabu6hs8wwrqnadquho532t2p4rj9h1r77z3lbjk2g7sdqik16u9bm',
                flowInterfaceNamespace: 'f3j5u5glcnxqq2x23v0hozyukmjable93f6ttnc68azwpph58ngj78e2lvqilw5ko7txyjm8grx1byn1hakrxsfpiatt3020rj1mdhgk01f4qudz4w5um7o5iyao8sbtstoiyvjtpe44j6evwxs9k9b87861jxvk',
                version: 'gdhtuk13ioh7n0rxikll',
                adapterType: 'fddso72zarqziym7p3con56g683fgz0ltv5k6y3ysowcq3dcfrte5du21avg',
                direction: 'RECEIVER',
                transportProtocol: 'soltzz8puvoqgn64dp3lxpqmphrv5wwvvbznjhq3cpt2hl1cs5sp8m7kt4st',
                messageProtocol: '1i2j0bmhalqxsq6ekkqutdjk1x0wbu0ofq8poiqhuhsy79movbm7w46mset9',
                adapterEngineName: 'icsemqq68lem831djx7bty8gxdegvc8n9ao464yiq7ow6x6icvcifr08b3fvieyzqxrg8azgogq0ij6yzwnfnwaai1ddheo8i9c9tco2g7u9pk4thykwbyv8bp3mzn52otw5pp5iuu30mssbi5avsazy2hnel2bs',
                url: 'lbmh93txtzzhfbsvs2qj8tmpij0aa3tepgzqkcdb33x8kcpt4vd5eh6ajrbpee6qbx0xyrv70tomeu8vgi2pyib99mbjwcp10oj99ypugrs7f1rvkdy4syrffvoy4v4zoduhi0ditjmy5cadopty67c4nz3hbwmw8t39f42ot7engxry1yc48siwo1klutgsydpl7brg03g6rgot16yerml6il0kd2ja0ay6m0hyqpbc4rfr3zzd1rmswh0pya4pifzhtho2nxc76ir3rrd7jox4s43rt0sl0k9os92uh2772eyjbt68zb5tv0ed40tg',
                username: 'o3zmxul3yc7r1nbu4gkiedl3jy3unaxe33rkv0apjerb8x9bftzhajeogmxn1',
                remoteHost: 'pnrvyylrvper02td5h46hj1svfj0ac4lm54w99wikj7omdpp0604alik34rwn5ybns1vz5yk2sx9pe45tyh5pzpunrltaptsj6fay1h816su83zekc9jlm4op28kgnva5z5rvtbjy056lu21l8yhub1hbkqbg64x',
                remotePort: 4251234189,
                directory: '4h926wgj8xqex3x52xbzrsbai6aka0cqj73u5bkv30kepftrdhle0wu2k1zj5wtloau4v5ath1bsrk7c6f9v1y6emyodxsjurws5fo2hnpohwn1glyz1nujwz6sthq1ghhwiysit3ur8ew4v7hrytqpp24yrayujdjykndfu6smpu337k1qwt41ulgoapsfp2c3o2h86ebiuydlctq06qxwhjcnf7nuxi8pjp1npojooescbrqslo74ane01ub4ex8bl9bryxtbktlb2bylb6lkako58mh8djsz2nwrc627nkkghy0wkgfktfecu95t51fd5rhvyvj47164k6js9p0snk3hywpt1k0nog4ddm05dialbjdrn22tww93tl1avnhthciwqo1r5vrqitx4o1y23g06etff4crp6f4483i4olco45gl0c46f9f9f1p5pa3gmfjn0scqh24a5gn7q3nugoo31e3c6j2y0100uhxzseckqeekn19kr93jsnsi9schp679qkb2uyketafrgnztq7v1r24cru1rg5dvrbczyqus2g0kg06m69qqqqf3cbact3oifoziw0cpzsegtbe9pwsorvztd24jrcueoxwvtmikvdpo1j6axq2w69668uxdfz8caoajj2bm05i33f78bu9f7o9ebqaa58dwamtdniwi1advu7gb3ydzozyjvargj0jm1313nccay8rq512jmg9lx3ivt9d4awqo0yglt25b44w455bxkarkl20bwc9z7sojmbuptuf8hnn3jas5b30l87cjejij7s82lmuu8y5sm75shvpbortoojmu4bauo119ve2x1lgffbw1bmd9belh28ls1a6xi9d9bqdsjlnosrxpp32fosdsu854sw4xa1eg3ame3ne5z3ty0drka6hw1ywhs2hbqbz0c2p3hf62flj1jti7ne5s8k1bno42hqk48qcrhc2tpzofleqxh98ej7dyv9ypd75r40gjjjckwdvt5dtpjgvs9iyod',
                fileSchema: '18kxzr3rr6e9jxfxxgyruowljimr9gyytevg01bj3szwbob10i5j6gm0vrtmg2ka8mzjdiqawuxdv2co18125lhhtqzlie3hr1938henmoiv04awp2lw5m1kjf37wju5e1rbcdanyi6nket48xcmi0bq01mp1matmosovik9freepdq072jv78bi8sb47frg23jkg2wrwem4dswblitv77lhc9mks5h49ak3ybvkty5z03hfw37uuxmuqfoanj6c79nlfqsdpmidtrw1jow8iyebr5x17agow0noldkca22n37vdtxrj32o6ogb6yfayxw559mvmz46krzvm483xntazpvc2xqnbv0pn9zacume4h9s381wo2kqffgrcxi8burgvmbkgbfwtc4o9u9j7dn2om38voc9zfyaoqtcz75l1dosg7uyww868fdnzs7rh6qxcaed4oofan08h0e2e8zskhtisg2nzhf6a1u0gwr464uprpq53fqma62ebogrvdel3lg2fcav5bez354yyafniu0vl1rage8092w3q5o78ijjq07gdq5lo98o4nru95jgq6mj47po56pel24t2q3lzmervo8ti60q4frv98nic9x43jsikxfefhxdiwib24crdjhyriu4txqkwwgke2ac2h980uqcbnr2l3bxxdvdx8n7t423erdjfcojgxly8cwm6ecm6mclo25bofojf23ng04oc2ecb4kmrpxdny9q46shfz5xgaexjrx6j3d9d9oja8xyr5slq19bnwrkcibk9bjhx5ojv5kx9w741cpd5p39kgmogyjp74ikfvqmbihozo9j16bpxjrdu6vzex0ubcq8e47w3ggibkefzq5hktt2q5mlif7m4ry3m2lx6etw5i2ngmfjx3wdzv700vbwis2co04sm0mzt8b6iwscqei8xm50szqu7kosd950spc0u1z6zpcte14w6d159v748gu2mjnkxplw07grd4up0dy8si2y1ixc6hdtu8ifv',
                proxyHost: 'hpe7cbmto625uph06algeei8zu7guszkbh6rbygggcj7i08wrutew7ueg1dy',
                proxyPort: 2722290541,
                destination: 'y3rdzdkb582f0u52jimy0owaue5z5qv5esakb48jvd7o100pcfyxs59z7z27jrdmrvxkti4xmpdxr3yti22eikhxwrm2me6mv6z0z6xrnm77ii5aqd37x938vzv1rcincqv6fgy6inyxg95rhrr0bfeijkfj2qil',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'e9qbqlax3inu7f2by51pr1la8xayyicfk69yg8sakhopqw2tby70sgjoe9k0h1fcg3wtaibg18wolhd54txfrzmtv0t5vjwo6lrxa0kbzvobreeq7xvheetugsv6s0be9eofuuafi5oz1vnyfbechlzglkkwny6z',
                responsibleUserAccountName: '8qhe2rtvezbgce25zlzz',
                lastChangeUserAccount: 'fi2ct2dfpg0jg952574l',
                lastChangedAt: '2020-08-31 10:18:39',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '6p9346khfdeg54qzkt6tr0mqgyq02jaoi729qtnv',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'cgym3crpb2dbbpt48gc7fobeak6qnh9ozd3fwmk2hh4n8o9mn7',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'g9celolq47jesb1hq3n0',
                party: 'wb19rrxid4sbe3f8sot0vdhzemj5e5isi7gpth4qi5joetdz7q7rjjy5wp8opw0uqz4irpbdfrpd97fmttdyy2vb8zyrlogls7enteeiymf7ath0qfkceho8o0aq3s7gbfswzotrx8ornlb721fihpuz1fxuu27n',
                component: 'pyi5emtgoshiz9dbw0ypbkuby01jf2qr5uk8bgz91ps3y670q18timxylwhug8y9k5lgdm42v0ftlenskh6q87tboafuaxjbvr70ios233i39rxpp13wq99gt9p8dw397mngmpteyk84i2bfucvtugn94wbekr0n',
                name: 'zhjgrn5o85kb4ojvxep4c6ioahb24fbqlew4ktpytqsyxmhpmx3t4vv7vsvq9p5x4ns66sils1xj4ezpt5h1zgrhzatajqkv6yy9bmflsssbbki32edta9clketxnosiyolugz9b6a391vdmmqm8ma7uagg59vsz',
                flowHash: 'dgs1fi0s6tybvunpqtxtnptvk668o2xywf21ecdg',
                flowParty: 'nv58i26rwstyrxp2zwqe3ikgdqbg3mh1uszeo2vw8n056220sfqj5crl1cgl39hjlelgqotzi5szxrzxnlwh8dwcwyy34vdsp18cqn71dg1ft5tpzgv9xgkemct9n75l7dabpsonbw2qa663xt8crfsl23ez084o',
                flowComponent: 'ki7qtfkig2f9zrvc4bwyfuvnkyw2502zcyak8hqjmvmon7fe8hwyxkdmjp3854r3p4s9qy1e90jahuwxcenywe5pm0xkoti1pbqyblb7aqxhqdatxhkg5ex02dszlgfzlnpiy70fqe5i2ylfvyvh4nvdcktuh451',
                flowInterfaceName: '6ja3pu8j4z915fz9582o9a8575y4euhq9cvvbfrvfbbo815ai3rx84ly36brq5mi1qbh393dp24jl3taggi2x01fi9zz3fjq76yoexfil81ksn24vf8vjs8vwik2ndsrysh1414jsn487tjijdpwiigx76doo3es',
                flowInterfaceNamespace: 'v6742sds5z11gjybjpn7dwqvwd6s9r33zmdiec5vw9epzerrqs1i6yql8q8lyc53gj1kwoqaorcyyy7car3adszm5wlhvamfx06u18pe96e6ymlks5n5g5wxr2npwxjdjkm1no6cjgfh1nzrhwlceihtrfgb30xf',
                version: 'li76fedspjbuhjbnglcl',
                adapterType: 'ffiqckaohityhsc53m4keooxv1pe1wg3ga3p09o9x25y2qzrskvrv1ya6ccy',
                direction: 'RECEIVER',
                transportProtocol: 'xh3oghaatv2u74073y2iib2li6bzhh451fv5mr8rxjqarxktvo456c2tjobr',
                messageProtocol: 'n7kz5io6l4uaza9vrtthfl9fqrmv74d59pqz580m7rnyrz6qnmecp03d3hch',
                adapterEngineName: 'fs9us7453gkyks3katbvc95usva8ofm89q2eo03xjl1kj8cva0d5zb9hb59iva0bco780thnv2zdbbixbrdfgk1o29dnjh93krln90mdvd1agtfp6qz68f5ich068witdlrm6ud5yb5aeu47aluiin0w0x89pmav',
                url: 'npztq2uzid0w4myficg77c3c2wa90cseyw8wc8gdb21ggf3xu1uvd79hwdmwdsp627j37fzi7frulvosk902b7duwtutmoanwbj6t5ambeydl4tyg60yigv5u5hlakvh4sn206eeh2elhoscu5dnj5hyru24g12858gqlzz5n267rp7q9ctfha1s7kl4wi4nbys3s2rl4x8aqsc4eg748wa4af2uojvf17se5yyxkb5kkv09y0c616t3bl0gej3zfs5o4l3xuxbbwy1h4qeetposfkr5fibq7ls78mqu8gxre2ebvr2dkuf0fef76dku',
                username: 'ovylhq4tgog4aadswtwtogzui0dm9cgbfsdrk5e5lcvdunzgit9ii3panvru',
                remoteHost: '2ou7afj4fuotcg8fmf4h39hcwtco61vhrxrxvxkspj70k8vangne895mg3k1ob53sihdggl7u8vz2rqfazk5v9e2aqqhdlgr2ptt5338t6pg8j5wbyjounidhk88bit0797ujd52apzmfy459j4uz8svujspb7w5c',
                remotePort: 5863124583,
                directory: 'eychvw2u84jrl729g3q72tgxlk2dm6er9rcnwxdbbz98xsgva20jb7weebc0gxwdvy1dp3zblhkdotmyvr1js6zpj8nspd1cx2w9158kmxew41fggtdlplogdrgf2owblfanqznyl9k6pouaqtv2o5maq4jecd47dxbcjp0e7hbbwx6d6tbl1z1ndicqhg22ticpmfzjos9rpdtcn9lefdvokq2y1ru3xxk7nf6l057dt95fz3aro36m0cuu1sim9bl86uq27de7d42ku3fr2871fetckerjwtj1djz7b9tn6ii7uq9q354xwd8z90xs396oith1ca5oo2rvwh7hf0ch68ovn0tsltgwwhp7c8r6mz68rczlwib0asqf6ne4m0y9bd6unlai95yrf7ymmfskmra4ab7u4vycltuvc1b7y5ky026n9mbfzecy9bno1b3vbfd65esfcm33jc99nqcbluv6p9kp5f8kleet2dkhcmfenodxwnp51t2swwb6lnhq0s3s5wuyms7um0ftxjh849iedwyze5huekenfd58a20pkb7qfe8drnzwimm4jx0so4wb91uupxwyoaoh904tfio73uczwe476jzjhxr5h1i071g7prwwm9x9q1kjilre7374xvgsf684tg43nj437wv86rrvh2i5fc5mzjcfz4ezn7bt1pejdr4gm5mqmegesycj4ijk3d9b9j9qni2bx02dfe7rswfxt6ksiyds4ov2hrmpglvyuvmtba7i4ftbs4r1udkr80fxgbucxiu9g7h2lav8qa4c7atzmou4yidkp2ymdyvdxm892l85xwjsn8pmjw3xbu9oxjsayh7igqlsb06x4kmfxq25nm91xlq0rcuude8hvfwxzl69hxkngriernhsl1opuggitwe58pzv6ax2yn1pbl50h2squq3554cm7zo6lq5ejoejbxm0bgmvkn8w6wb53a1ckxy2had945r9h6stk6fut6awltpyy5sd4obn81kzdib6',
                fileSchema: 'df2sdyp79aoiqo0jko7okxebzxbp0negwdd9emojfib8uqmo0llrk3u6edapnsij2zfotxog2s3guxy2wl6fci0c5p8ovi1b7ths73ins0r53doxnfvtfj1gtshjcdqz22n02z0pxiixqee5bb3vmv9q6twmbq5mjlo7ulxdr3y3z2wg6hr5g6bvhel2fqxcy86l0jxa3r106b48bc4hqsjh6n3eh58aoq7ei82hnou7hwi86y717dlos124ltkfgtyj94fbnpt3qihhsg1encfj3dqkroh7x34chbuygpnqxeioz0378tjou1hefsxpqwenjlcit6yymo1pazt9l65xi2c8ndoo19rtk5qoznk7ws6cli5j5v40uffjde83xheymf7b9vvlki3q7rj10v1u767kv71c33s7jongwgrhly5t2nk14njzguahxuxd2ilrwkdbx23tqnvou5fw9fray6z5iezwpfpp9fwgs16vcgi7vmtwy6xacgbqjg0mwj0rcg5qoxo4bts8xmna64v1pj8nhiy7lf0djqjchqlt6ijaj98r3chi4u6iywd67yxttamb8snml34s8mho3gtfsfyxflyxgpyo71ajz03zc5jholwz2kfcganil0zhgle9qbwcg98mqk02cdk31ttf7hbkak54ui2so4uddsfdriku7f1ro8gi9xb5st9v101cbrwz3ghnbjs14kekpubbpeukaipw7gvgc4b4ka4eajqkoz964gbl7in6h15g7t88fmgxiw1glruhz0e0lej51zbszga1wry0yfv95v2d5tn3oy18su2sojleytnmu2a3b4yfyql8mf1gn2qg2egpwv3g7q1rnlelqkw4xngvzdd87xofnsgxieshqblfazi4o41xi7il35rbtyaf1qsded06ejfmnbxzmzvws801n8wlrh1wf1ex5pe5kt709ifal1bc0kps1w3stv8ytqml21mjsyii7u167rxdh978qbvv7vnln6ijmtbcbv7a',
                proxyHost: 'o86idrauzei1o3jkpa16g3icxtulv8o91i4dfsy8fssw3m1nqldib1xg5t55',
                proxyPort: 2846536213,
                destination: 'en28awsn85g9r0cretivg93uloy95dex3p6io027bui5lndtg0xtvnvdlpg3esv6j18vs17p2s0nv1kxj89ej4m1teypqd8bp92hzqu6g2oth1n75puka2e1dqwjfpnqyoe048wtf1erz8uck54mf4mtwxu9kkfi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7gr8gu70ixkgadze4gksb27fzj889ho9l3fyynamoftu33729208hhslha0hncygm36t1tqpe75mp4a3o60o2i4lqcabi188r45czgwaecwuz2mv7px3vbedtui0hf7glysjoioawyeqzgtufw6ngrmm1d4d0slm',
                responsibleUserAccountName: 'a5orijat5d66qhv4jsnl',
                lastChangeUserAccount: 'oag9p2zngm5xuzk19fq9',
                lastChangedAt: '2020-08-30 21:00:24',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '400inhzv6m8a100zmg50bdr6f1cjzrtjh81jlmfk',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'ivdwh02gk9iy756ri7domw3kjfkljv5o86s6tvoraakd4o4l4u',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'r79ztuul2j2zjyctocew',
                party: 'y6qssjdheaffctdd9b3kc5e3p4gy3e7uy3ltpuckbag65kb7v2hwga8drmv9eq7zt7rhjobden3zr1363ijr625cwxkh7wc6qoh056z0o4q6u8ljt6xwjnk3x5966nke2gw4x9rcr7vorzu4n23h32rqm87lp4e7',
                component: '50peyusdnepwlj81grk2bh4afw3t16l0bv0uu916wzbq8airwo8grxwb5thgtpuxu6llqkzhdy6eij2xszevtqtucmjir5pmrjyu47jubhbxgfle9euvn87beninau243gs3rej6i8j8frdt8bbrr9lo2gdfbam8',
                name: 'yjcrr0o2mfv7yzh8500rh1i62g1406ubx3h97jzo6styex4e847btxzq1am48mc733hwjb9npywa5n2cr0sihyw6gbl3juab65tu9pnwqcaq9igavsmfowzhi8krh8xgt2dx3b4ysm4frx1rl65tvl9kae8kvj80',
                flowHash: '8w9oh9cz86fdbrjzqs30l06912mew9c3cwz8ilvh',
                flowParty: '9tre1s5bwbdf2wt4e2kgssrl5v9vouhcrj8igemcvbyn8832khb4mdsqlwhpxkvtsy4r0u7sc3pgf6akxrj7ua6n7tegou80hclg5jzf7ywa4jhsrqjg27i6fla2rthh4ouuvwc70pchwtiqv6ghal46uty1owrb',
                flowComponent: 'jkth9vh9qavcsyrrxr6yuq4kcyfxojmtvobvnxhaachpb5v852o4876dm0wrvxh3v58d1m0t1avmzwgefwnqda4lzbdmi13othncdy9vm8arrh39xtga12eccyvojmze9c3accy46eqn29y0zm6zj5sr3d5s9zjf',
                flowInterfaceName: '09nztdd3a6riyl7fm7avo5a9ica2w5r6o5mwpjfmfwxa26auh8jkzha4ycty0qk9vmpdx05vxzwt4u62zg7mkt0un81jf6mo50935dgd0o7e7l02j0bt70f6bxlepbdspcvcrcfzf4yiqxsvz1laoel8603o7wtg',
                flowInterfaceNamespace: 'e1aouw4pzgz3zr9f7cc3wsm8czfbnkuzm0ay15ws791e4v4is443fvthd0s5598yt5ne4h165qfecpm33y4atvpez2l9vrj01hqd6fgqqa0uruc3ny48i9hvt10wu0me8x7zqug6gkdgu7tufyjf8n3eaux8iavz',
                version: 'wlkykd7kp2kukfkyhg88',
                adapterType: '67ftfc6j85k5hf939uefmgnryprsph5n17118skkq2o4fsquspy0i38gds0j',
                direction: 'SENDER',
                transportProtocol: 'i8is2qc9z7j0gu3k1916143azj8o36tadjsucsu77yjsdt918gqn8t73v8l6',
                messageProtocol: '6zucbo7igq65xui3pg7bmedec903li8vwpvktrgd31vbjrppxpew65cu847q',
                adapterEngineName: '5dj0jp3corjl4795byfnpvwzlnvyg44am5oblubqkpe1yen4ipoiwitiuv5zc5lc2llra66oqyo2p2vf52zzsqpr6bf0ek74k5oyeza8itz40fqhowvs4v1mcbqlvhygt9jflcv5w9dr2bil0tvud00lw76aaj4v',
                url: 'bgwt380j4iqudhzp1j3xyc8k1c6sg9jf9sgjzdn4xpc1tus5bk6325aj1j5jjcd49xnl6vzscklsrb9oivrcilou2spzfano008lm6l4p7xt24bgcwhe8akeoyeihw1uhjf5g1ccj22f9qvj1gvmgnnwke9kysx2fkyewnqznmazvc2foydskwwpvhmc1bby67yx8to3ml7efq164ncd1xfrwakst44s2rhxlteeqgctvxp6pzvc2zinmmhv04rfilvt2i55un3t1q0rxskz3qvbwt86ty24gsxk8787osahwfsazumulrl0mcbwvwpj',
                username: 'fwwjqpvzlfzq81bq5iihesgoh271tkquoy99kk8ob5gfd1ixxyw12jqhh9xy',
                remoteHost: 'h8dhr5qq27vn6ffseyhe1glz4d46ngwbncv3exnlzgx3uk5xhryp1tx78zerr0ej334avbwz5hzigsiw2uj6arcsk1ruixwe2d1qcqsi0rpjzncjfi17suvq83f5v20si6exb0s7qvb0sjar4jkrkaty8yfzqhnw',
                remotePort: 94659955157,
                directory: 'togx7br2s16f1tyc5umziuj1ywjqwu4sgytyu7lpht965tr16rbqj0i43kqplma4iy4nrymzbjm6jg6okl8vbljj4s6yaax1o3xign8z9snz6uxhmy5j94bzy00w2zvcblu02kpp1isrjhf8ev7g0xpel9bre862b44h55gw33jjtwipk3wj6ej1s2svh2igfna38tis6aq53iqechpogi7vbdn5lhx0mxnwzrqu0fz7du0v9dur01l7phf9h17b9o938sy9wp8o2wuum8wdrazavs8mqinsvt62skf8t6tzaanvayqf69y39t3dk6ck63cz9s9voy7oqtducryqk4uyclva1ywyxwd9e9bywegmn754td8e0l19v83temxdidu52tju90zd6juj9y9sqhsmu3v1w2ql5gqwy352pw4ro45vry6r3v611dwtbc4nsw0tk8pwc86cinw1khzbtmu13h09ndpkwloi96nuy2y38ncn1ck07yyi2bmeiox4kiu8bmkhcqfy0559itmwqbi8wiycsikkj1ji8j960ds9ozqnrvi2fr4b7biiq0vepwliimlsu095a8wa857t5rns0300cjl6vnsq9lqya8prv5alwer0trjx3rhivou44bnargqhhmvdb3a5r2jrjni3aegfqkna9yptdvjogsadyxswqojzwhi0ilc033vx1niiwb0tunnro7gwa6x6mi0j2w5uw7f5k7deig0zvnxgi7gegxrflyt7iglmkv4acwuv51se2q9p00s01hpshhxrw2bnhu941aft5w5989f5x8lbootxmktx4hdmhp6l1d87zklz2jthrp08ye26hxkgteuplx3xqpr2kf4wyrg3fgpbek1slhngwcgm8s99pjlufys6tgp3bld67u74o9kd9wca3gijfk8frc12g7k7py78q0ga20yyzp75yy0uljxstis780zc26wu7vwen42xhiv4dhh6ij0a59jc5fdmwoa5lvd1e9khtfav54lv',
                fileSchema: 'b9fmnk2x2kveyj74qby9944ahqnd1hp18baxwl4awpj9pxjcvclt6y7kwzermqc465bgb40jgt6fo80ogffpx8xxh12qubcpxytiywzy1oqspo19gv0c8x2pxuxyjj203gyom38ce9aqvi12jurmyl5kkxwyv0qhw6gcuemvb3khv75az2dj49f7pszexeazn2snepfpya18986vej2yd2etww3utzzqp5xk5s34lgafbysyy5ow8vm1gr02c5cj74m7ti402zdw5ayjb3s1068d5cnyqs9gf7f9xln79fcxe6ucjod1whp3rg6l48rjxfllpis0643w78j6rfkzqic6jneg71ky70819fkpnf98fvl7uk8nrdc1r6c4xoripopbe6caqmm5dqpbb0ycss1c8tlgqxxoai3a5180y0qz17as7mqxglgy42ot39b1kmw45k81yb337r82ougeh8tnl34hjwh5vuio90yi6cu7ehlzzyd23q9mxqjmmx3poq0lldbh9vzou0git09x2q1fjb2aytv04xcenav9g5kd02psb4vzx0mz5vea9qc4uvl521zygjk09nckso4l2hduwg5iw68trm21l4jt4qc2ek4d2hk5x3m3j821um1uwwi5hvsaxkbcoikpd6ua6f9p42v0v8d25fiz32ha68ymg0y72mrt61dsni54p1o3kgslsa1rxkwil924sr42il8iwphgcg4biv85fngizfn38vlq63rjbgi62xdibj8stbmiwpmw81n3h4qota1p6mn3qmw7m6gl95zzfbr8vmnmbbi1ca3v3cs2c1yghd8quy6fnfydgcf9o0wwieog7gng1ieo0f76lpm1c9ry64z33aqhzf75dcvmqxc78x75v9qpf24bx0myb38uyms53fkbalelrdp6w0um30vx7om16yo9uwp3glhg5a8w9850vl3ndxvywq4z66rov8zgwwyw13wet5xhnmf953ogirg8b3u8942yenomcm6y5zxj',
                proxyHost: '5jd459gkh7pnx7zqbpbmkrvmtjdxd8e8u1degxsdok70x673n3b717aqpnc0',
                proxyPort: 1274223441,
                destination: 'l7f1amjvq7i57cb5s7eb0l4ka2k652oa35ty0juewgqfjuji2q50gbykmg9p1oksq7svb12vamu5o76mtjyft1xewfww5qlarynv3jtxog1gwarxngpl958ancok5dwi3jirlwzasv89eoh99y1zzupu3d78kzaw',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'dattyzq36u11f16v4nrpaoe2ilbqf82p1z6jtxvfdikkkrlu0r5nm1u7at1k2qow8yvli2zbimq24x2qdwedqjzwu1p2m4q8a9nrzgs01b8uwvdet30360kyicdlfsarexbyqd5l8c4zv2uj558fwvj4vvt6d8zg',
                responsibleUserAccountName: 'uq061ipo9uf9xatb41ap',
                lastChangeUserAccount: 'uiwlubstl2mceropfp20',
                lastChangedAt: '2020-08-31 14:15:25',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'kg2dh9ocq2dyicw59q65z93k8oaazpgfcvr44acl',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'zhc0qb7mg20oo1ro70a85nsf2x7ld9skar79j31hspwqlnfurg',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'ox8kjpi4cr3aog5zedla',
                party: '7s9ov81kp4fiwdvnyrsg2gfaqbhzcnveu99u0g5qxaf2417r1klzeovn93zwzutaq0mhfqk1yj7ku01tak2icw61xxz65ce7rqdn36apymcjeyanlrtp71blxfvkp541m24ucya4w68e7f42pu6m5cfobcs7x0mi',
                component: 'w9htvpidtl9p4wa486gxjm8gznf60iv370as3r5aqvy9nfdfuao7r5s6we4jzs74fsbbctoicbt6oqtc1bto6fqf073o5f04r1y8zt1q26yl3wsjst7jo5ueiajsmoxry8v36kf8w9fkfapg5i2x7hubxh8xo8ic',
                name: 'dfb41q3s2jlv30knnse2n05chs8t1n5gl67sqqekscjxc1fo10e3w2lrtpuyqztau6knc44n6gt9fduh3rh7fu9i20pe9gxpqv5yksatss3kbm2i1ymsd3sl5q3nnzmnhsjo1iit26aindiejlpotfq3sdrtyx8x',
                flowHash: 'fkhwsxj6lhh23b7id3p1ogx959iy94qa14uge1az',
                flowParty: 'vtwrs2movzig9c8rv57ppwhrfzyekqx0mvvoumid6kr295fzvhdxjrscmqjuyw0izslmj18ayyryeh6kqnbib6n88jcoj4dfl35dlizvc2gchtmjng69prck41plp8ho1dkkp4cgtu7rpkxxjpcg6zi6mfwd1nr4',
                flowComponent: 'ojq7ix9w4k1ryor338cacn2f3vrdqtpglit6rhinizw1n7jlcfaznyyufds8s276mfe5esqyu8fqa190fuxx06x96whfc516mbphilolarn2te0wpqzyne9f8o5cokat6r29sadptqeyru20v758aplk3j91d2li',
                flowInterfaceName: 'enjvlrepww5aqwpymtnlbzga1h9ziol1d5td099qs4pzeipgjfgcehsvk105f958tmiqdoxesnlyzmo6l1ogw85h5vqa3ek0im702lc52ibsm158vogqiebs8xmh0p2ep7siufsa8w1loxd9ucggauq4m10pmxv3',
                flowInterfaceNamespace: 'gs6px2ofn1i72h6enn6b6u7mu83d6wbr0mxhspxgh4op50atnvm9t8zs721ftbqlb3mpmc2702hqaifwfgwx6nc2dxwi8lcv5ukw79n33q5quvgjay9olzqon93dmtxd7fg6th1zl3eoz5h9e8mkjkad6a5g9y8o',
                version: 'i10doi7k7azr2zs2bo1t',
                adapterType: 'd52cy0i7fhqkwjkg05j97pw440cwqyd3jaj3fowy0n04p9fzik5vdmoaeism',
                direction: 'SENDER',
                transportProtocol: '2bkpoj90gnd8yzvu5ror3ctbz75y6e6x1dsuyigz4oxu5vtht7msfu9daixk',
                messageProtocol: 'fsg9nmvbkny5u48rmfwdrdiyqqqzu072dr29na7ci2pzw4p0m6huq7jmogvb',
                adapterEngineName: '57vywp62neos9h3qp43k7p2pfr1qz2vjt3qvrlz3u91tz75xw25v5aei5ebb7x0fyvfxd55na9qguj91tf7nbra5xkb0lirqzxtss8nb4lw6ypwx97pja3uhq8bkqndr0ws4zcjqoeyu6vaq0yrz1ze3n0oxhhfr',
                url: 'v2etgffikmkhwl2wwk7i18ypvo9zixdy80r0r5juw8j1wa6isshikatobgpvb6tysigimf70bbxsfdnjbpv3oc9s77do9it0bdwyvwnqr4jj0jnzdw6s1ft486cki7u4kbywvx4qu1jhscxqbu8917pkl50d2kp1pidcmyy0w72tshi5kdmnkzwnvom69qvta1eq2rt8ykc5v79d5pgl4xvvws97778migtnmsxte7rrmjqvqqwpvmqw87tg78lhsvp9ej33rfea6ido5otvklkfg5qxfbyqe5n0pmp62wjzb1u58lv3rwly0zng94dy',
                username: 're9krw7d0abwq6cl89cwogpszvfu40uel4ep3yrezbk9xbrib91dvbalv9l6',
                remoteHost: '6g1g35kfjgj6wgvn76i415bhnxa4tpfbd5ymcpvskc536n8ef4nvezham0azm6j2urhngnjgif2pbknc7328x13klwbyppsw6h5eqjzjhxy2t0dycfdkl0pitp2m9n9edkjq9j5v28f8m26ra84po4iz7vgd15ng',
                remotePort: 1564116531,
                directory: 'uvw3w6e22apv3yyoh00fmz3zgt0yq2czopq04ibtbg44rr17f98wbpfoo9uabc4i3wdh4bq2ipvtv3hulxe9dl0st72wfxgongnnnarhyjuhldfwp0ml7o2tb6jqhbavcs48hmg1424t5kdgzjdwmgi5yjht5js09h3w1e4w0lixtggfdoizd1eozesjlghs9irl68r194t3qsiwao9lifnsb2dg82lmgb9gfq7x2s0weisl53jdsqcwuprtpjnhinssi9ai129wkwbljiprgobupmz9dxjr8et7p0npmadtm6o69uqdpyb0vrz2km08y3q66w2g8cvc636hz4878l6mbx84drsjny38uzjvm78m1a09hukxnl8lul55vpivh6sior0abf4n2z8mz40pyqu9tmttylufc0ntf23hz8vm81oh60oo6dd8yw60kagvb3pqrsbxwo5ur7izka6f7f29zozcc6oi1743olwgi9uycc0kyssdtp9u256ksx2mpnz1vs4b858sobr9s5f618tivwkpup80noshi8mh7gyksaqeimzylzxkgd1lej50mfu93ysbop618sspjgtqms2np2sabc3rfaywwjtu7gttgcqqjvghdmgsl3sxafsie7zxcni4o1ffg8zrp3u0rihejko0812s30j5vqf4hmen6b00z8s4kyxclm17zzprd2b6x9wvzdl5tcf7087bz6ygakfywt6vmpcomnsz1it4ikm5ak4aav388xw5laff69o07quord7vxwwrzb76ij30r9fdufzidn1u0xqtcwlu91ymzgflrg12o77hr8kgost5wmwshlwuqyc1duxd4q0ugw7x5uwfkaw7vrll25ysbq7yml9celkmts5vescuai2hxkvzes2uzsw5rwx2cxe5zrlicvt9d0c123hnjeoniazb81ugger1yylyzxitmxsk8d67p6dvwkjnb86w3bavblcd968g0x3hq9pf4il7d4jj1y1tvqzmq317jqyo8',
                fileSchema: 'bzecz60vuda6bu8fwj8iy9oo88m5xjt4ygukc1cfgq68vyzsif3spm1rddwb40yc31x41gg4msoe14842n2rbwxqn601d84t2s78pc3sxlmqm9i15ql6m6qmv5pbhi248mq5gnpb5kavfesmhq2lz2xlg3utlzdzcu6q9fc2wqb2sa3ev6ugsyih8nepmsa9f8ctepv5sqbzpug6o1y4tchcbqc2wan4z199g9hasqn4t509ofg9u4xuye8dw3d9zizl3i754kbk4xabjl23uwcficg68gaag9e89u6da5zgfeefo1sg1iuzbm5zr2omjun0wefryo4w16wnyq5e9uoqq5gpof8is03wu935yc25112895e1ng3oe4u4e94x0elppazlf373tdg98d0lf1xlf53kl9ekmizy4y3iulfctwkf5a019qb0c8haee8mqf91kqc935vsgncgmq1s2nb238k2g59u0jaouenuv4tsensgtvx9rmd9nyskr22ahvu2r6420uqs0cj2d3nqfgmo342l7lu31cjxuoderitqs82d22jzyoff1e9bln4s7899bwqw08t8z8j18ijwiud7smfm9k2nvdfjecga1bjvp4xnando115wamrfck4s3tgaa7lo3ondz3jm6i6uhx14ia6g8vmxco0o0y533yc01j3tldv5le5j12oevvhhuw9n4ywixbg7gcwlwzucflh0onrep0ohh88wxetlhddsp84fqigkxu5udh2dor3adgcr0d097afzg8gkobywfa4b5v09j1beu16vgxx1nl9r2xeshql84qwmwuizkuz7npl3vd34wfmcuhf4xw7hxfti4kvu2f6ok0hjudooj6e7332yw420611l4i0kep06vu1umrfi9pmewmhn6k9i8c7wnxsd71sfumsfm2k27ryurum2o928lum731mfwc0fy0otjr4fe4t63ogzydwaei89p2hgfwm02qjr06ljp3htlq35yd770cry9eg32oc9',
                proxyHost: '27gjv3n1rxispivttq5x80ct9o2cmdufsy01kzar14uc3l9pqvqyrfr7nhr5',
                proxyPort: 5253756700,
                destination: 'z4vm4mdxwawphroxgyd04l3010xs9h5qogje5f6lon4kpv8jkk96kg8nmctes3v4tnx13q9j37e74e547w91a7xn5prbypblqz3y808x6btcmoffkvdn4bpe2tokulvdt9ytxidegayyt1b5k0uvhyrfwl46mmwr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hy0s1bup3brlx9vfw5mqxpjcqso0xhdxguzafhypmmfsysffov4egx82k4beepve8b5tehrczbqc3fxmtmvfxi7xg2omcy3e0h1wqdyify2pabdclmlr6lu139ybtubxit4536m1cj2h2t36pyfrxllaktqf8n8i',
                responsibleUserAccountName: '5jfahtgoazafow29g5b4',
                lastChangeUserAccount: 'r1w4qzwc3sloi6fhjuev',
                lastChangedAt: '2020-08-31 08:42:48',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'zcb6ftqilgrwndmbwxzw5ka3in7f4ny0upxu1vey',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'hz337c0djy21ahmj4pc62nq1k9y5jgtvfa43rejmqzr1v9zzih',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '7eh81y7eh2our0hi7bib',
                party: '885ecp0cpye77d4a0p1i9wcimjpkpf4t6qbxg94368gbuhihmrpr29mf7crqxs0kzr11lb6cl12tod25jw373h4j7a6ryvuqe7gwyt1mlod4cgox8p9ctjlmwk8oof36xmyf6s7swwpvm39xy0ulphycqfyvdasq',
                component: 'pln0xv2451iw8lbh119grzf2hfqxvi0pwz04uccc5xuon6izhebh1i7a7pwsd9t88hal7bunmtl795srgs3v9sk0oioag8pwy4e52021d6whctltznoqccnuzwpettbgipq8l527bhuxm7onhc0deh7khuok4jq7',
                name: 'yy39jj9dz0jyoskiqh3i98xpwwi46wlcb0z3te24wfyz3o2zk7n6wi75p5ruvhiccnpvh8iah4fu4wxvlc42a7kh4bj2diczzqu781tl1kl9h13ygtsod0nu07q03ejtplw77fc6pmuh31c2ft3j5dx8ocs52u83',
                flowHash: 'fac2b2389rbwekh4r28auzgri7ld7d6g4gp350fp',
                flowParty: 'v3qgj5m2yqf6ddxazdfynr78meitefo2d7piwoliuppg9wsr050vfsjwy7a7f4317tkv4rh64ojb5qj689rpfgax0p7mu43fsmjdrzyi4e2apkjf9psw0zk7b2n8eu7cvyrr9jyzlz2dyxbhmge4mn2cperoh5a4',
                flowComponent: 'cr5edp3j44m2rewtpyhp2ygt4hwfx8i043bpwtdlnjlli41lkbjo6z2of54wc5h5h1hx2qw1jwad61dh33ycezeujd93pn99a3mg8hml80j12yzjjwsv0sftzwc4k9i5aehlwvm4ietl0m9hh7ikkh6nwv4mknp3',
                flowInterfaceName: 'i4lee5zoo0n8c885sdgku0xvjw9zyyt1q7regwqut5l7lw4o2x9chzbdz1x5s341cffvpcy8cdpekhzt8kgnzovng62rsy2y97jme05yccmhz3bvwntd4kkete3wceojsyehuv68bm9ijvbucdm8bz6vzdoov9aj',
                flowInterfaceNamespace: 'i9p4pn9rw2sfodqamlgjon7hsequ1h3x9k3dot5y9s3bkq06rbwztr1wrg7jj7g543zfvdx0cnleldupqf3snyo17qlhh3jea7rw4v62m4l77d646v8eztrr73k8mmrj64i7z00agw3plcmfalullbtyozb22glf',
                version: '5l5h6i5yu6f4ghhax08j',
                adapterType: 'msc079855j36txfv6evag0mqoh4781ul29edgir4ce1jl4osfg5audxntyky',
                direction: 'SENDER',
                transportProtocol: 'cpnu3g3nvxoen9a3tjo7tmv7uyp24nsf4diyg52h4ze3koggfagfscbbofan',
                messageProtocol: 'sry981tdj9k8kwsg5miwo7xrwhy7tsit16yj0144mui0my5rs7723k6t2f8t',
                adapterEngineName: 'f7dkm84cw3bjge5y4xmqvvkemqp7qe06piujb9bx3r6b9pv48ov19jl6n1bpur4vepytn1xoll7qwx2rwhac4ekcd33x2zib3dz1e4sdle3vkwdf8r7ixla3trd14eitvz47lx57vd0ral2yo60ff8qul6fsn4id',
                url: 'fqjetjddqmd1kmyrhhc872frj3an5l1lnuj7k01u1vs7w2qzkdhnp4ia0v06fl7invcg3a1dnpwdbqj8t8usq7guetmxzvg0ktlrc1pgspj9lnyzvdexep9xe457qez6qgqnnmt6f8i7xwx8td28tshcg39b0na02r5cy8x2gv7z8r0xwfwysvvun3f2ip4qejc6q6pi4f7fynsbo1p4dmsu0fg1usead0co7jsg85n8t1gm5z9odbvkp6thqvimxv2k3pdo6qquuu27su5ku3o4p5sgqydc4zdq0tci69qu73modkxj1sc8vrfymb1k',
                username: '9w9nluglrmbecq6f3zml6h5ld5nsffmp57b0tj7bnocecm9w2e6dn8hz9pd1',
                remoteHost: 'wdj0chhc1h6xucgaznxg3muqegucjpl0dqj6527d45nm2gxz9ic1zeo8eh4secjch2n843djdoeajkxm618ob76hnr8qjxmrw1hc2dhpefx590e6j9ef6z625e6rvw1tlc6r8noljocyjfwi4rrnsqmw6q7pnjrs',
                remotePort: 9265695409,
                directory: 'jjzm3ay6cj97uzfa2x9pad4udx11lfah58e0mar581wm3rt8r8stpnpl2k3i8jbcvncm9v73qvdbdam172sbqpnjzae82xl0vyzc5g9awpmsods7j14cl7cy8corex13rf7swa4r0uo90hc5f2f2ku2sdxlsmau0es14xouedqml5fvgknoj0kkjj6yo9asklrtuel75gd5qo9fa67sr73kt5zn1m5zjglqp9o1p3lskvz27mvo9oayfxtajbbfctrmxmork43epwdgtylme1ezder1yg3oqhbwr2y9ocdx1ximy63sje0ll36xwjpfgv7ieqafva3cut143fayfm2yyrbdbi2pzhp0ynfyfl1j28hflq6b8rj34ni0ob1r9uq9ct0lphtedv9rt6c20kqw6adkdakgfilpjnjpzly25i2sy4u874qpzgvrmho0q3o2kydqx32cprzo8llzbatonuxxhzliklbjrptva2lqflxh78m1o71cgt0s2uc0xw5c9p07ph3wxuy7fvnra0o8qmz8dsgyit2vga4uuf7mofypyk6zwkyoigeirm5g2oo9ixydkr83podxwxkyqswmfobz1b0btz7qrj8dr553h10ze98eveeoxg4l1zfs3ptki5jjql6f80i4z0x9em78lh3lwmg8vsadv82xkqjvotf712zhhzgsjqdl4386823lcdo9vk5eyx9uesce1bvcw5kuru9ug084h82u1wdltrg4hivxwvvmluwb5n1omfijgexwe3t6t5zdpyiwvlvawepfxk5b5725a20u6073jxonqkvbdlspm7prbe88gqw66q8pjixkz0u570u5ygej98ck3yge32e935vutt9lllzugg8qnhjevjrtyap54ruek01rk3fpc2mw8ssc6prr6bqeyv1moqfd9xd817m9q74yfmq9eacuihu6gz4dsgkpycplpso8urmmmo9yx7jk8912pclwazv3ea28ijmisymfuwmesm03h0eiriz1v',
                fileSchema: 'w194guuq18k2doqvys4lta6a60v0py5qd2ko1vw5bjycu4253ic726xluii4tc2pncbt52bvzwgpxjohumiygh46pnbwov9g6jn6keuxrj4urnvv24w43bj2nymvzooccjjpg5zadaepcn4z2qq9ecicvrzmbuwgf077jrm2eyf50ano33brvsog9963caogsekgeqz7irrqp9ja0xbqot0h0sknfyg6o6cztnpj6fepjh9or6mrnbqe2rxw7fvepr7h77mir8wqr9kn3m798th09pt41tkzbl5whqtt2u9ihgcd88sqqo30xh3afzwmelkomtakk8j2u6h66wdrx4alwzwyu8acqnqjxx3j8vdpnlfeanlhuw0tgc54a1w3z14zj7i21iglegbwoc4tn382o6n4qo339op92as6zszmmufyzb7gf345m3zsacep4mdedcppwiyjx477r5vd5i02k4ri5pwy8w4810cahnkf4h8tx0fevuhboel9oc9r6x3g6d4sniulgf9v34fxmp51imjlnkuwfoyk8m4zkr4wn8emm0xbtvtgya61fv06x5lmjt30n8x7p64mdixy8qwqf1f00hrcvby73549e1w8x9enjzu2246cgxyxl67mh7aof3zu8v2uge1tplihubmd63q7wo5p3jb6cckoraid1az3iun4mip792jmopsnafm6h1bb7vbisjcq66p478a7xopknrnett5qk8fsdvfic4c850hczus6ei2rfyr11gzeii9yki62plnvyhd4xyiiv5o1pf7n9ff6848msk9cpxfjn9pv7mde7qawttvgpeug7en0x0nww3gh0hex2ubb6tjqdmhp8gdqmblsipvnqmem9mg66h0ku2sp4lhpi30tig92juftwsog05cy1qivei2082oq2zw32cygpxr2vhvmhrftr6h8ystnhp6eiszipty8aeq90271u8qjzjeu0k6b4bf86zerzlf2j1x7f3nzf5bc27wo9d2rw2q83',
                proxyHost: 'rusu2nvr204oeobm92nl2ozewrnevssxfm9hs1dtkmhqfy1vovcr4w4ls4y2',
                proxyPort: 1886988843,
                destination: 'bl4pv3xg0kva5mlou5zw8sqkq6vc7a7dwsdyndo4tr05ysvpz9antb0aya3npbwsqakwy75nxm1758xv2ruiax1dqewimyl8t67sp4oett5fjb0rs3xxr95ka97xhcqi7738v3qncjm4my79fmskxt12xk5ttqnh',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'kbwkhetlfeaszr7yaldgnalvybkeacaa7i65ezb8pphllclda1a6wnc2n4fqew61qfmstw7egmhj94js4uswr2sfmns82zxjw200h6zdm7v59a9d4xq9hp04rwc2znenay5oa2u185omywwjsv3myd2z9g44vh2p',
                responsibleUserAccountName: 'yyzu4jfqov40k65zhpga',
                lastChangeUserAccount: 'pchp7dzi5ylannjmkyu6',
                lastChangedAt: '2020-08-31 12:31:50',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'hihg310x4lfhzeetccht9g0cupviy2udaxqyzcoz',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: '3c92qh8edbzeipej8kl7ozlm7h2vtyauwvgedbhvnnn7nnlkuu',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'fl9jeaqx38uhoq1ywr5a',
                party: '5mb9tf9nl00ljv0akav2y57sruf5kb0eopxqth6i83bnhvxjg7oe93yyp973cnvplm4j5h4yvle8w4wnalu23g1vabulbnyxrq47k5scp7lijd9uuv1klerac8519dxhon0oqgmr4jqbzaormw3us9h1zif535a2',
                component: '8jt0ltiv6ov8m5yyxp5ypo5mo5djtezvyvp6ki8w7z5csutgm825wjwwcryi76gcicstda07kjw3f4qjuszhoh0wkqifysoqqj8xly5gzx1nk5mgrhq8skdwkqdrgh6d5t6kka71bbhtq1685iyuelzbio20av2q',
                name: '26lzfm0fu0lqtxcl508f8e7at22q7ieu3h7gsnja8ik4qidsbhhluoyenaai0pde7qg4fkjpe8h2olryy8rzg0r76uxny7oqpc4722ydthh46l8k3s7drd6zlj0whdqe2fcifh8y8t59y29mbfokt10cgnyaztlu',
                flowHash: 'ytw73o8o6tjjm0hdqggva2za7i6ytkq5fi6vpm0z',
                flowParty: 'zefmmj7mg58yhnckpb34x67ojqzrij1z2zw3a3lxgml1m4ypgn6vbhyaxui6r977x4x4fck14ngzfx2y4nkcvna18eu8ifzzjxldciiqknunecm03weqqsv083dygc1ow8fhc5396e126lvlpx9e6drw43zwkcbb',
                flowComponent: 'h5c3n6ez7xn4couxcj3c3grfo84k0ogrdlmm4u6p3a2tdohngv9wmuy5y9jgiid0908cgx24ifurbdeibdidj9jkkg25ito87v2dntxim5xvpggxh7d2l5dlzgi7nxazjp2nk2knx5mo4i7a45g8lduvuwgq7drw',
                flowInterfaceName: 'zwqzrg13m6ktzhcdncddxfocog5qrjkm17w2xuxen578a4o84n6zvikgkjt1j2g272ip9b37xzlxeqspz02zwkinbk63dpzht8nw5watoqlls8bsskll0jyze1db5mgsxicc3vcy6twc03xtvmvbnivwllnnvqlw',
                flowInterfaceNamespace: 'izrfs1adgfyn5l0d3f64i64lmtaa8o5jmp8ksf4b5w8xzsi7hjdwm1bo80zy9sn13ilyi5nctg2iypj2ple47eoa36gcud0k1vc45o14lg8ksvg238gxtir3d0d3d69gl9vbgfiakknyjk59ns0w2rfl88qmur8n',
                version: 'k4u2vn6aihitfx6h4dy3',
                adapterType: 'x0zqz3rrx0lbimk6azr62s0cds32jbez7auvxqqyxlqvwyitdhagw88nlagn',
                direction: 'SENDER',
                transportProtocol: '3nz7tt0dajvn71t8ukxwxql3ufl5i1ehvv8r02uez4wovb8m99zugyq2z3z4',
                messageProtocol: 'sc7y40cpmu5vyaxdjnt0rv24etiug70g3lyk3gdhtico3o5jshor78dgxksd',
                adapterEngineName: 'hgdwudlh3takp5iq50wfpudawqfcewssqpeh8xelxt63z158nnsy2p1lfgvgfx2dnt0wi21te3tiqzbkzgqk1wsj2jp7uocfmyn8pziiy1i9ut25i5i5lyx6jxo46au4qww3uy4w42vp59n4pde56x8kunpvletg',
                url: 'qtlm0wocodnidrc73kpobjfu3c5tuy3vm7w78x96ykeowlrlxjk34zv936lq0f0r6jbh8d3m0dtgmiza3pps6ju3veal7k6zh79ielzuo3soadbrntug9kqciumow13wahd03i4a4c4lywhye34nr5g984w3yyvc2awql0ayt6tekwhlus18qv0alxl81r6v6mnwugtgyplib49jhp9kka5kmi0rqwszewejikth5rgbe9kyybfdmzmrb3dk6ccolcof9kwywp2vcev5qbwgyggpre19pb6ser4xfuxnp2h09331rcfr8vxjaltc21l8',
                username: 'cq9ifhjw738x9rgpvvjuroo7p1igk5ox0e8d2o8mlegij6x8c4fkpon8k2qr',
                remoteHost: '6j0g65jckmmfx1kin8ajan4c6vkwpkb3u7jlrzhhh35b30r4p7qgy00l2arvakdp4wp7bsvmf9lbmuvtilkxhbwpc0pyavze5wrlupze632xfsaqdbthy1tvyqjay412x1ycwzfvdmoixwpvl1c7bl65yu01rqb7',
                remotePort: 2314452501,
                directory: 'wsip1dv8pmm5r1tjoe3efjvjy9pnzdjj91235pihhnlail5zx7jdtlh5qg5bc7h83cezk9u1ze75re4y7qf2a7pgl7yd9m6ktxat1s5hkf7yldqqjxdbudp4xs5jw3kj1jecum8s1qux5lqvfiv1iu91banibqs0z9zj02f9of45lp47fkelcblc0r2dixqsh0u3vozzs17wvw7t5xie3tcxppifhm1k21n261zdcxy1xgykbuszqft122regv5leipcbgjruyjcdfegrpl8u6fwxof31yilk0jp56w85kw44hzqrcwa2vb4todnpcgpb94nchqalsvao245kbi3sdi99go23owo0zi2hido3kim53ogros759il5mg0cfhsp2uzaqy6dgihq1uywjn1ywvhgewu4xhmy8c3u4lhlvf5nynns3g9agxqeggb6bf9y1z90ylc57icdu3xkt44jwk3q7udf4lhka4fbrepfaqdq0yyn9dwq1ufeadlg05lt7xpna37enwn22vzdw7qkkrbthck0gw5rxciz8bn3vj6ndxeoah8cu9ohogkq8mjh44f8smcry57bjbgcltf1pp80wyl01cuxc9nrd9coy8d24au8vkc9aqzxpzxn1dksb4l4l9y4i695lizw178cx5zcenus5yr2156h0jie2gio53s2gpiihsuddajpwe4jqhqv5i4ciq46vqujsdo5fmne8pmedudhlwkjclcckn0cmpgokehbbneqws9og2p0r9q0v27bl19buc0lkkwz7zk72gfmvw53ygap3uuqrj2l9vgz50mvx4rm3zlns4fhodbrg0p4z85nz7g1upewgotytpwkce2hfdkb6vz358oyib9vlsv5iyc8w7dwkbgtgqzf3v630iinye0s843chp5xbpey87tqeshul3t3ukpgbqo0psq7ysygf9hla1in9njh2ww2n4wqnsldg9zs421gkzta43fpd98pcf5rnw8dej2kqevy06zzhdd35th',
                fileSchema: 'a0af0zsyqbn0awzkwqlq9zrfjyfc4q5ps555y4vxc1siyj93ni7r37g44viqmve4rlk4jjbt6onzcwonc5271rj689v57dwrv65mcmyv4qd3tf1nfgmrcncg4zn0a00kn8pmjwhy7urgmh64yjg8mj3lk1yqq9lur055g8dhulhk2yw02yuk8q57uvs5ng31jycqj9ld6x8mvqt0x38qljjw0vf90wq3bzns32z1kt8iidsc2yjp046qtizfyxocb8hm5r11zie80vvb5zkdhggxj8qdd8bwaf8p6gfjj4111k5uwbjf0gyss48domhsvuvwcn2m3qvdb6pvqvsvix03n52gbxy6oh0ausdkx84y0n29gfb7ir9xmfugxrx009ivd5klg98x7l6gebp9txm5jsulhh41vqcdrmms9u7rq5nu1fwrlrpgqw2zmqzkg6oinq7zivuwdcrcqi7gjtzs1zpnraif99z1pvmrn5kx3axf3x0q0frk6vys7gh6won4tg14duj6mseeiyn4xg6r3fch89a8lsvijbzis3mjinopz2bbx2sb4cn1p7gbax4agn77eubtykogf1b3jzvw73e36pyt6mstv140bp7b7asu99jsset7s0eznxxsb2qmrh8e45172wxrqakenhu66ecrlv8d4jqzyf7akr4s26vzcnirekkj2lkitimiil41e0kjo1rnsy9t9j5b4y2ow28b8m82ojvljalugkszn1hllvy0vx5wle4o2r1dn65fh8nsyr2qciynm7j6jupeleavsiv8sm7kn46hqzsj2hbrdk48421waal0200oh3jj336e5zkxx6shuiltv49kylsby8wtinmgzri8rb6ro05rwz59kz6lowmvjs77cnv360amsa12m0vnjoyoc2pa9kwe7d9skpf2hlo7m1bqewbu6w0rhyff6lg3xyrn937ff5ybkzxrr6tyt3d0h5xg66e44durmmrmf6bbeijl7lddk3te4f16vjlu5eip',
                proxyHost: '0c774wlszxod0ajctzzp6c4vletgvgqz52fpeombgxs54z6tddkevse7bo6nb',
                proxyPort: 5422574939,
                destination: '502k8poopfq3vy47er730wnzxodh7pvvj04rh0le7t1l2yypfjipn3cvfpqkjky27annh1br9tg2qtd5dy8bjnxac49tnh9445dblyhnkc3bdkbhljlq357o3ezztrwutfyw59shphmke8yb9luc27ura1jdbnns',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '3mv9hrt4bc3it7yupy89q2t1dff4mzx5778wskwpkpb89s6azicz71ft5pz1fygz8jehurx2q9lfmjkjgrols80f84wpi9q1tk3mc26ofb9r5yywqkvwc09ecabzmor0cp9l8xad9rkghy94q3fz92oriupj70sl',
                responsibleUserAccountName: 'j2n67d7vlvp4jhuyd8ws',
                lastChangeUserAccount: 'y6r7trpunq7svryoyuf8',
                lastChangedAt: '2020-08-30 23:53:34',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '87qlq9ci9llb9wz6sgweiwgijgaxxupv0q23ssog',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'labtb6y11f0a43558s7r15ur56uq9add6kx3ceqav0ye32o3hs',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'x356keng6tmpbwd7l15p',
                party: '2fuf1fy1f9882kucquzptbro3m3qjvbcy84p6ho8p29kz0upvgryto4xr7gxar0eepe70dmln0up474cfmtiee2jox824udrti5ezp4x2eysc2eqoqvdkzsfrpyumcxsje97vggna2f0sim7o8br3lpzc3ldecfo',
                component: '61i32rgh5abfr1l137z5ndlsrjkipbbi6scye5timq62qm7e9qwnsete55uaxg7se6142otw572zeeydtf7wljh1kglkde98ey2891gwf5g6za0e8hjmgigenop5p1c90zmwlcewhlt30yn8bczp1gxhefq7m82r',
                name: '66qvce2s9fi89vzruierd7ac04bg7qu709lvmxlz4yhbmbl1lxkg0kd8c44xapabq4hi4kb9ymefwfosoeg8aslvdh22rhmariznkz3htlo1fgse7glrzpqujrtlk9xohrvzsl8gslnazi73ecakr5duourwsuw4',
                flowHash: '3ed5zmta5cbb9ulcywjw31ok3qq0vzpj7jpysppd',
                flowParty: 'b87dioj2iwyumu2kapj9mytkrurf0j9o6v6nrx5t5ibzx34fk4v2pzq9hqgm2o6yo5m0x4qt3d2u1zljmbsvul9etusq19nkoewko9v9ehnvybrisycgj5n1mjyibukm2uxcklymbh7jv11mfuw2siqbty57ylwa',
                flowComponent: '3km58o7ok3cf4w015yx3w0mi644jhxbn91rc6zffg7fmird05s1gw6l80ft5h5vw4ha49jz70cqhl409rc3plzl9keh26t3v72mvh9tm040i0nyezelh0tegahwcqfubjtganvmjrxrq8bltjd7kfa1xrgsguvo4',
                flowInterfaceName: 'r4lnu3f1668ub19ai80jx98qx46w4uehdbmuu07le5epd5naa3qphjxu8qs6nbxbencqntefqxgv8k1ro4t9r4d1dhk2q8h2xs3h7q0k57zhmls3luzedm1o7gxmffl962hselgry4w5lyq6aitc2w94xpbiu7va',
                flowInterfaceNamespace: 'o0j1aducdozb00sjt2tvh6l9xzzhweqlolq7ntub9kks4bcouixmlgrqj28gjgzb3e0j9q8vryexsc0wkelljzjw9yl8ax9367usrq7jg1t3riawho3tyvybdu7gso8hf1vz850liuoiyingifk316m962yz59l3',
                version: 'nquvlgvydqg0fngudym1',
                adapterType: '51vyii53f2ggxu3sax4fsl4gwkfkfr48fqxlw5p2b06fptz7oa24gvr9qy2e',
                direction: 'RECEIVER',
                transportProtocol: 'r3haxx4viwrwp7ny3jxn2oecjlbgd9ujjjc4s44f67g45eyil1vgf64rez6j',
                messageProtocol: 'h8jbof8eo9micd16dzw550cpb912rxc5g3vtbno36ajwhgxq5s29wwam2w44',
                adapterEngineName: 'vbr7gc93jxhcr0z20xm2ilddgkd71hka94py28kuwivnji03q0latl2w8msoin7pbtyi22978321jpzro872lhzw8vuu80k9d0lba0c2pf0rcvw8bziqndj7itbar6cbxgbfmr3uyxyp4xwzxmj2dxku9hs7gt9d',
                url: 'z5gxz1etxixp4rhd3tun44brpnb6m0e8l61vedpb9dqe1g864409yowqtakq7l6iq3ed5vg4037dv7lfz3tydbsrkdm3wb89c3pw1ublqkuwxgpgp22a8mmpsl1uiywmypgnuc54po8g08x9dsj1homhip68g4p59akjgt8p4l10k6wiptpwjwt07idp7xqgsw5sh4n3kn6vye5leothhmjmva6xaispucts8ges8aa3s9x92eitmtn1036ecfhz670kecvp1799j2hmfazbgcnurpr9g90sfnam7ppss08u6u8hi204ro1qize23v4l',
                username: '4jmk9buqm8pdyzu49zw7lh0u6cyf3nbpys8ocie8zxiy7p4c6hlaxoz1r2ko',
                remoteHost: 'z02qu34bge2ixekluwjvb30vla6fi78odqdgtjdb2bhw5rgbc88ca4ugix8dfqlu31l9u4yahybgey29b0hcduajbhbq5bqbkqaeqw3x9qlhs45bdvz972oh47oa92apvu4pryasvgfr7mq9hj1ukw4uehwhnpcp',
                remotePort: 8859176975,
                directory: '8riwj95cdqggujmiiegbzzzxlucqylaw52hvb5lisbxni4s6knv7nhvzyl803p328hwp6t4jp17wvftjn4io36fqqj6dpb9tle0szli8h1o6hbdps4krf8tbxbu5g42f949j2p8f7tqk2q2aj8wavap7gxksjz0k64fvzthona91jcnohnfcfg0gao3lwv53ay5pnz4ox7s19lsirr7jeesl9xo14b6on2v42k4h8484l3jk5n8skvbk3c4h0uftbk7hg0gicv6qsao6ujn8dh1q6iqttamf31dt7oqsiqylnh0z0fsn00vhlkdb1wxllhep96shm3l6bmkhz8yfue1fwf9gz9c6ifabs259jq1va1myteq7m55bthpjxoegsbyto1r57l9agh60tlh5tk46ki9eiiym1b0j11iz4dy9ykc0340gai3y9llvjwh47x5vz7awzluvihar9755ichn0x0kf4gyr7ncaftdnxx9fwyq62cusskho8hq8zoih11f5doe85tlp2c2a294a5v60zbhlg67lg0334s6y0euafmofwadj2esn9kso0wmw0hofjbrvzff17bvn35axyolwu4fu2j15jki314egsdriqlu18xbroux6m8n3cbec7wt9t6sf5690hicoj2qp8yd93dgr0v0o4jdfanb0w1tjxfiihgqd7tpgyc4zat3mtcruoah4gzvg64p1zva72pom4vwud8hr5fz0k0ywltn8uys17glaza1em3cmccjlvbynpqlrm5d10n92r8ju56a3ukjqhmwxhi7supueytyvtnelmubak15uld1yurm9dms9dhzg5elsklq9sphqzbpsi01gp0kc8jjbpj34e19fmazeozjx8h4paq3uezxr4o0blv4xa43nl3yutrgos4bqnb8k8iawemj24otdl5a39p8q74xgofqal11lgpf0fqjjolicasu1x849u6ecj5ju81l3sdb33ni7c6qi2nbng2dfthm8t0b00bes8i1',
                fileSchema: 'h1yzh3t6d37de4vfpgkh8d9wyfypcsavpdd8vu3eaqq1j4v4hyy8rjzatjyyhv12ga3dtm7abg6mdi61bgitfslkaysm3708myzdmp6yc1wzaiflg13b1rtchrjj3nmdfpxr36k1dcsz9fsnpzwfkw39wzfhof52a0y9baizz7owd58bmzpymtse7os9eoaj317rw4uqp53nla13pex7m5xcy1geafxmj02ezqym2ephhmooniz3vzd17vvnb9ny93m7fxxlgcaoznntz53m34bs112o6kpik2edmycckjvjn2b1cgri6ty5jkz7t2tr7dgj8ihdm5o6vfiihldyrepjgphh8zpk60drw7sabw2g98x1a3l78h5dvz6kdmpvscm6urtxdwwe62w9yua5qyeazjlflmjxtv8adntuv6084bjhxhaz0uwrcdp3q53bunw7wk4ynciizkwga42b3j0bm93icx0klof62khpwhurri73m1i0uubi3nbfaz21ljr7z0t3iw19yjex39uy87swrcxbmjayci2jkdb9ja0j085imc0hc83watt5awq7gr2dxumnmxp5mcoaw348zxnd0wn2p2sxo6fchjw94upp3szytnysk09d8845ypv42ork71fh4rnavutoh58uqivr2lf724dgqn4os4jw3fa21s6sbzs2o8mne6ndi5bfc3pmnwepfrxbhbza8c43xpy7gg08keo6nry99banywd9fd2p903hq5woff9sjj5rzmr3pjie8fppq7l111rhmql4v6mlsjvf7su0gjyn93kbt7h2ev30mv4n014xms9hxr1uk39qwfzlz0qpkx7d4m6pdu0yzdnp9piph8hgu8kb9zupyvy5ftjcnpht7bppogvp31vkdbxvtkvcwa6pcm5pu6twgazq871z0xa3024w1c1gnnevm9yt7goein25p20k5ksb0xhr4v117eb34s19c1zqupraymzbdwqz48ujczlnjug7d2ivh3rwyq1f',
                proxyHost: '44cq4yufepe7p8rtgysum6dwlxfv1agdw2e4pyqiznkngos3fszu7tpievcs',
                proxyPort: 75471537017,
                destination: '0j2x0rjrrp720bzqlmgkrnyq5aql2hb085ssq5vor1x2x4g5oca9y0ptx721wxao5p1odlrz8pby87y8pfqkk9ihi1k9csnsx8plim0wvxkjff6yx57uk6gh4ij091ryq0ilmcbb6g1qhx8akmr4850o3g0f53ss',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'vtmrs7w3cb03ji3ge54g6ckm9cesakbxjqh27sm2kvwz5t2wzoi0tl74rea9s9iqrzyfz8v2sj20sgnbbpv83fa3hrskft6k2vs1ye4a928xwvx36mvfpvi9hkcv14spdx66mop6cva307y3bo1l8dco4zqg8sip',
                responsibleUserAccountName: 'b5aqbqb6yibkjsxj8c7a',
                lastChangeUserAccount: 'p50k5mxeaflm2d7yxwde',
                lastChangedAt: '2020-08-30 23:35:54',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'sqovtay57bvqh8h47ds1wybcpk0wm8gt569357op',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'if924fj0hgggvisor8ioyid8uxezllf0nxr4bdv8sthqxnk2a2',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '5l0mff76oc45efj4f4wi',
                party: 'lthwf4k103zo0hhf9wjexaplvnwgspaooh89qmds23fd6z7wv8ab6i4wlqzfplnmuocin8ncdg1p0e2t7ns7hc3te1glm6rv6roezhpgci1ztnwl370dclg8qkfysy8r6ipqj7y8dyl5butdsgx5v8rcbfz09yhy',
                component: '9jm9nxx6zhuw270x30l57du8kkfnpbkmnw7gm1gk5pgu6wx7jmc4azkuow15xws92rztretl2ku2am08v0an9h0k2977nng32z7zjyww8hs0pj58hcqb8xknm7sc4k6jsuzj3x641oq4xiiha16hsqvl1i4prnld',
                name: 'qpq2rdhy3ciaym49v5nga1ofwn3fif5yw0q7w8i0gdh5ybhdzaq4u3drxlob8xby7lmzzrmxaqzpaguaczweh4jezkt6grofgxjkqq7v5882j787pasgl0izrtoux2r33wzwwnxlz36yb96nu04j8thttjhlbw4g',
                flowHash: 'qlznduvy2o3kx9nilmaotl1w28ro6fhc03751igb',
                flowParty: 'epzagq5nuc1bbdhpa9idnyj7sqsbquqswhg0cmo0lt3a3c10pnhlokbaghz9w47k2dezs1ns33p986ciqw2poca19b7t787utgtpnfh88lzdd0hgqztnatkmab4qvqf9j5ek9vl18exbi6q0jir8erlmuovkqlhk',
                flowComponent: 'ubk7a8agyq4eo2kq07tvk74045lxxwgwx00hvmnf2tzxpb8r34aue422cmj33s5jrgb81u8yo34jdupp26xc4u97vq5wly1e2kcyifc0zxrkx3rmo9pm3oith0v2pgcpq2ncnpuofrl7un1m3y2xahuwow4n7n4d',
                flowInterfaceName: 'hvsesp6quiigvfia1a3wob7iex0ao7h8x2bzc1fz1ghn50vrrq5kh7z45j99vvlf7atrs1yp5lfdcsaek33yswf5hjvvz14n69uwpn96ob2ctxar57377yjk04ou0hqothhionoolh5trm1becn8x7r5ccv6t13x',
                flowInterfaceNamespace: 'iuf4p5lz27n14754lqz9pc6mqqbod8fggx15zhmjixv1n1tm0l5lep2n31apqlk6auxgssgl8cpn04c7egkt3mhbtmvsw73v4tmv7z45z0u4nwlasw0hy9z8vnbspsqeto3wumg9fu6tuwewhppj90pvgmkzicwd',
                version: 'dbi03ct9d1f0wv7bwga0',
                adapterType: 'p2b8mltmg66cel941b545m5g1xqal63frxgi62zfwxot45prt74h7xpksz2f',
                direction: 'SENDER',
                transportProtocol: 'v771hg14ccfwr02egf67h50rx1yea43q8vu4net13lyy2tz3aonfp4lu3ta8',
                messageProtocol: '9poln073pu3vdvwuj32wqvnpid9ghgnf2pfzlhwkprjkov2tjjkp2hgv1mfw',
                adapterEngineName: '3jeayc7ni8serlojyh76ph4wf13igvhiwofkhvdnyn7469jz71hvtnjc3n6rgcw3htd6gct41tech7ux1qq3j13d1c7hwhs2dqwgqpd3r99n0fxseywn36qosonva14qqvnko7afxj4yh4jxowh4jmt1qtbjdvpv',
                url: 'et5ih2jilv8a3tnk42tgep0ibwct5388yp8ohxro7zvph8iu7yrd980ycwxpg89fqaldd5ok4anweyoic6mq9r2gmrgg5bxcglxx1semb31v2fe7anefvc3hay2j56o6hla7zqmkihim7osk84s52fl2s5k4x2yoe48p91ghwqv8ndyy4ckxulw0a6axapjp6a0731uo2gd7yizujg0qjge3z3mn9k6ftii833erlrljyly9rtqdal13ft94qv14ywvwmy823pwe8z4ogsu68tujtyiroshpd7rgqm7ed34paqe0l4lgyqlmtatxsath',
                username: '8gcg200sg2t4psxa3piqmctpcx1wyt6b90w0zphweh4kbp3ky9bnezhpsff1',
                remoteHost: '9y88uyfoc48pkkff2j31q7n3vigt6mcxq5kipm4wc96d84m6c8wkvj3gd00get21w99sravjrdzy4x068snrp026c520jviyqnyvq1p4pwrl9m5qm9639j0k3zasn5irtfmsbh3la4t7u09ual60nr04gywloyu7',
                remotePort: 5116456230,
                directory: 'gf619ju94mo5gc0jbk6es4qtau9pdupqhafjrtwsxd4gm9czxlb302xdijn4b6oys2x06h0k6678jkr3qhnbx91ibqxj43z3magan934dwoy3rvnbmuxwomck1qhka7elco5sj3zptf42100kmme2vm1opxgurxx5s0n0mxfin9q8xd7dhfap4iw01a6glunz8bvefi70w4upzedwf7s53fu2zt8to7ez4d3iiy0718yrl22qx37lk26xhcwgtm5ofg64vsazrbdko3i9s3pu3ov8i9hlq2il98prebq8r4iccktk5ajk9hel3cfg7pc1tmo0ucspxifatnf9fxo6eo0dbsbleol2rzpgfba06ntj1bre2pnggn039ljml7a8yvxmzoh3oqtyqh1l3kvtr4y3gbtrk7oh4gyox6wajdw3ahrh837kc45l34c6kfs3emjhqd381wfuv99sogqmpco7j0cv0vn18pa3n8cxs328aokeq0dpp4p1sl24868pl69a6buab276dcjinpf6mh4o8ka90fd7411coznld9ltkog70fafvzlg8t2b9hmzs1u2rl2ke75xyftunelbeei39hjf4pkh0w84lpfwnax6zd5eyoecwmcotl60ohskbo05djyzc2ldogvqqi63kfzu283mpsljm48fr1vfzue2b7353d5xvg3zl4270lekdhp2dvutqpl28ndvtm4yfyc6gtiyzzhuvbaa0c54fyn85m9nvrsrl12qvybfa9qkardz35ifh0musxroql9hp1i2j87sw75q5m713e8x9p523bkimwjucqx34p839llv4mvf725xc7aqb5484snx1qa5vs4d3wmcel3uvbfp58xgi0fyo1b9ifwrqs0g65aa7gyrnyvpe9dnmxjgylkgask6abfoug1tm92uqnaloi4q6uxqg3ta8targlbb4qz4hkfumobxqmw237qwxj883motv4ydefl7513p02fx0k15wv242u8e2onvzfkmyp2',
                fileSchema: '3bteifajo1p0k1mgj0195mocx4cp71usmninedroep2txura76o8gauepedkk3tma0rbfa8ei08gjw1o1rdbvwqjnysupzg8ifhjyaj43eyhl79elk3nw6jws1leanrs2fr8u4jz0jhn5ej3wntildbo71rj4yrna2wivpcjcoc75rhee9zjyvo865o4l03j6583nbsijymnwdzd6w8kygxmbuz4l8lxgm94k9aav5zvqf2rzq37xlxoa5on2g5mz4fsa9xadhkdxbrqz3nk1l7gt7fyuav7vjvwae47zd4lb9o1392ryukcc0ti4hw9tzv73v27w3uqsjcv4jxfsdafc6495qbea5j12w90tq891a0bctab2lrq5u7j9xgewaf0k6m8jj3g983viwl9x2qj96ba2id1gkhldyfgyuvhoklj9sqwlsrsf3x3fo016bip9ur5kytckqyvbqcd91edrkqh8b65shrp0jndk90ic794jz1ujwg7sp8fxpp0zhpaqelt8fvp1gfdxxr9p119yykjvckhzplalw5m305mrq0fubcef901a4tkwnt6uc5d1fs9s9tpu0epsmbafick7l8sgbkh8go0ulirik6zykwr42beybxwkshjuk1fhiqmmx1kn9ej1dvur380wnri96nwxp08irl07ic9dyul92btnipgqlux80r8qmnorabwlg0fdabnr9wgdbc6ofb6e8mtm90ldjmp586d7zupa6b156u2s6pwdjl5rxivkg34wlrffs4pbe49bmfw7x8mtk7nd9dhj1imgdqzvj23e6f95n16mcgnvoyotv90onfnldstykf6uu44dq3t52s82wftxzqooaaihbgzks0wifdhkuo7ojnjuschx1poxsdgbl5kny30tregzu3y35rj5ei8agelh19bke4vk29ifg9thj46thd4la9nnci29aci4h1u95pynblfmk9oxl37tiuqxfw7aau8fqmga7o6ugjr0vmew1pz7jxxgfzl',
                proxyHost: 'dktnh8kru8hgonjgaccdioooft6yk42hyuzjat0w2du5ovr7d5g5x4kk66n5',
                proxyPort: 5955232009,
                destination: 'vr4lsran0h57gyvlg01gtkj9hrmj7d956izjuizn4ergtqzgm7mymx65qndhuz0z5a2tackwi806i0pstee3spkzpk0ofpyhrtwrb2g2yx10bvblfka823kqotob0juw6d4y8k3ftuvj9h11y8x2mjfjvn90nzoyi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1f085iwk2eh5oljdtavzu2mv387jplc984xldbgnzqst8aouj6lcqitvsxdqqv519vlc8nikg9txwrx71gx0h7ljxc2ypd742rnhd1u1stko06sykpdig17pd14gfyu7qngs8irj40j9k2gfcy73a2ykhq3s2hek',
                responsibleUserAccountName: '3x0pv83f9hzxrnu3xwap',
                lastChangeUserAccount: 'jl5jhxoyai05a1h2rhay',
                lastChangedAt: '2020-08-31 05:07:39',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '6n5vr4wl7s2w9ofwy71lexs6vbx7di3hii2dm8x2',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'zw8i62uxom8or3jp87opuiulwabfijpi8fggdgjw2lbmxht2b8',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '2fuiw5g9kcxnvi3zdilp',
                party: 'w7n6ve2rhiz8s8u6iauwe4zk7722rbejhbx2nmlp6sp6ph7r1h8xrzmjm5y7tapn4uvu3j1242pcdm720osrz30m1qf42gij5jl7pndmogjn7gzbhwzzpjgk2fbjb6kk4rii5qg5vysazdm3vo55jl9j19i7tjn2',
                component: 'yjf6ry6bzm2winnqrw68dhp25sy5vcdqaq3kgtnttxjqjqrx8bi34n6cc0mpknesmgil72spef8mkhyedae5dx2v2kl11kqg5j5sv31bg25xisrt1ah995qx4b2ubflrl4v57g5cjccgx0vexbfg0lk0jedfkm7b',
                name: '9knsxrednm0mekr8ewy3qr7uhby1z6eo148cwz23uh3gnm332r1sp5xj4vgv14jsksv6uc2okrmhswfzyvtg9v1k77rm1d5n3y6qxr1h5ekey8zs7e0i9d39ql8a79y710bzboijf02jkbzqzpdknq4wgsnrk3ee',
                flowHash: 'ih8dypcn8ow65vtoijsdfpsh37san0trlnxhjj9z',
                flowParty: 'bzwfurpufft55atq6lkhk00itqvnizn5hzch3yk1ri335ryhsckwykx6il1hhl2e9jm2wl3euqlrwyspzbrupdluc4afa4hqzcpt830nsq7mathftvgt4vvtqztuyrgwmgo6xmp4h33ndmiwpnrtoj22qv0yi54b',
                flowComponent: 'qmy01kje9fllpas6l0bf0h54eb0g7mhr6h6cpmu4bvrwm196s1m5zajlkvz3ju64you0x4im1g4lvpab9im49zlxdf109e56mye9uh5gdhynf0s9rkichsuxqmedsq6pe04mwj9lzspibqxswac02wj4g0itge0t',
                flowInterfaceName: '5usi7ebsj3n3bvqh8xndrzosy1b9eewpia2ghzdt1by9jofhss0o2xh4xii4ymvqqalg43l5x18s76zt16btrky7sl528g1ojulnh005vtodcan3kdosijyylfaucnakkrqmt3gngm94tgo6njgyb1ajtpjl86cm',
                flowInterfaceNamespace: '9xc7823ydx0d59zjmrdo4fgi2zcaxivi76o23de1ibqeaqgzdiirm1u6fjj65hzvk5pkln01krnpkcs2hhp5ysj95iyty3p5i2fwbvy3vm9t3lha8nbvqehx6hg2n2j4znu8b5iwg0dag5geveslir7ylk9tznn2',
                version: 'lopxfto0ngwegklg9oys',
                adapterType: '9ylfrd2ye4wmhvap42x2s28z9eihk9i6lurvzngdtc4pm3r62tw3rekwn9bw',
                direction: 'RECEIVER',
                transportProtocol: '8g4g7y4byyk4ln1xrqwv9oqnhpp20xt18vs1ym2hc4k10k44goc58nbmzu33',
                messageProtocol: 'p8q58whzk658wzwkihaghnz2hn1f1jvmtwvfm3ss089armkeoq1tjxfx1w6c',
                adapterEngineName: 'eit0biltmlgexuy0cdr0xw00ydn1vf8l9z19na8hml889697j5r5g730kfl2fi03mf8748h47meutnuupqg3njzdwffakts8f8fr6wcwrfrl6dviqw5s2rq6ijnwf2vh5e6emkjyyctn4pnpqcfuqu7292lbk4hz',
                url: 'qdlrekx1m08wqanxsgk34b9sl76albaa8mzlw07xq9gzyz906ojbgh463xtm474o38fwg2f9jkan4e58d0ci27ysxqetoohyotyzfw2kp2h12ckdxdovlf9kyzij5o2xeg5em8f832r3dv7aglpt3vp9g98ir3d5lcksx3ci5yywhbbzp5ouer1wvb552bqxd11zc7skdu0bnyl0itaoqi4uc0ojvk6fapt3qayw1ts6de2x8ql0d7d1gcnh3i1f21wv8zoz0b9sogwpha2aj4071wg83uv0ve0ajhoklokdsfepkfem23zjczz281hq',
                username: 'x6blw028ed401mlcmbo9b6cuxi4hquerb9ucm2d4c92ddswv7w7ywxmzk6hj',
                remoteHost: 'gv8erxs5vcccwy86iv8lod0yaaldmjcjon59m8vxg2f71fow0a9h5ydc4xkzqzgs3864m74e7gwh7cj09tox6rz3orttga30pgrk44x2f11z4f6awchexyf1uueyfciy8f2w6bgeonphi7ljkgcm5dxjmaq6a1nk',
                remotePort: 8445167199,
                directory: 'emlmxz2oy0ki6uy4k5h30q4f50oqqicdhuzxuma1dvacc45xy3roxi0bdsw1qved9t77u4ky5ll2ih6a0tee0go4z7he6z6ysnod38piecllrrnap6yg2nnman5f2fgb09quceavhb34tvpqus0h5n4vbh1uyequ4taw18vuvhf3u7fqmekcihqkxsjjed448yel51abqr8h9b6zd0mi3kqlqtkp96vz9hy565azy73a932gsj6g8ygrkxg2jk5l887znjanbv5tk3yfa2wyrp337cc4q4zyfv70dshv3k5znzup23ltycz17xo58x4nh9fok3qrcdaml5k5q4nbqvq68qtzfblcbcz6b7v77rsuq9v3v79kckd8krylbn5hx0gna9269na4gcappvldiy6ezk5gc3grkk92gg9nvmtv1vv9mouk4hyhucdfx2hej22aftz1seuccmbh6s7emp7khkyb5rv09gmiwrpy57fll8uusfkr2yhdjolqhmikdt4s1iiq4ui4vmtpnuynjd25an640l1r42b703w60rooalftl2pm6w9ortjcltykt6qsms0tnwjvry5ht3n1cma117w2cxhztkx1px6opuu04qy0jb8a6gxnehjik2gh9jn0xiqx3uitibi8d2ukxicqv7kcv1bco16f9ssb7uhsa31w5jlgnsyomnmsc1ik6cw61i37ocirbp6mfpu90rcykkr6iqfpmo9qoaihoix21zrdykduvs7d7qk03hqpoluq333i74kc6o3kyeokktrgmux4d6b404ny2dfa0u22kfhjtwkhs70fpr5y4nrss30qatgu7hf3rhlg15w7f0m9s56b2m07qflxc53dncpqexllboibklwk37qts7n3rg9670pqdabdafoh5vurak71uzrthx119se6b30b42qpoy95319q6addcb9nm6fuxcnp16cu0mogsxnx5h339mom5p9o9obnwyql6u9jwzvjxuqb85yyvxyvrnolkksa',
                fileSchema: 'n8gw4ytxxa1i8psa1nh2st7xadb3as3k9ezkm73eyiuhbceo2e6ilryrhp790h0wnx4pd0a59rf1ne1r06o59d5pzddrk484fxj5d5ob81tmkrkgow6zmytdiz0kjqfls8y59m9qdstp4uqv90mv2iim29hv8k8ir0vvizskohdlzvjccd46d0q5vf3mjh6egmokctxjb9xky2v3j0jriaggzs72gcy9l2jzoj02a8558zfe0v1xp7jy6dto8vjgmjzuq74kiij06fukbo583jx7abmgtc6h5twr6l92z4wf8vs11zpkllrrqv95a1i9f963b4gsag7ulgdxggx6hkwkrbptoccvsm4nwboyio2m2e6k0lqt7tr1jl5u43w9099d3jskzsnttq4i3raoqs01aqguhoo5nhepsy2ceovruf53665jjncnhet9l4yvslfmcycg000ios4ylhkvnddckpc38cvswqxw66f848fvpk75csocjwql1c3sz497vrwoxueo2ntys1k9rys6e9x1tr94baim3052afu6pfvy7212b88ijj4ytr2gp2xerm1ad64g22mh8e63vxrprylk77bq45iq7x9lbnm4igsjkbnw933hhq706stn2ig21c5k5oxcu3oku4qm07p3zxr8pizfc9sfg9qedb47a6k4tdl59iij4133o1eheamxjzbv5ch1w361wyeimh6i8i5a9lzyzair7q2g3uf33ttabhw499qdptzas61784vx0ypn1ql604d4l0cgt7tox5szz0uxh6ufub68nff366zxnvl2jfgty266qmxocsmpp2ao6b85668963wsemtqyyngek4fjrfh7dlxy5ez0ae7f6tfbcrt1re350wzvg87ab1ddzq1j6zbs8uesy3j1mza51ub7nmueke86dgbjfwjxo0p9q6czn7r56p62rxmf4jr38ner1gslq3hd7nybpt2i3438m8xi2saafqa1fg9ygdqrpifdo6vheb2u2iz',
                proxyHost: 'ehr9h7n6rdzc3vqpm58ysgwhf5yfkj08btu33knr5dadptdnmsu9nv4svc11',
                proxyPort: 2663790495,
                destination: 'ao1fotlv1t96xik80rzcyib7pecxqgbedpszvyzxckibhg13ebijskhcrsukizeu9afaf15gql6hkpax3sf57jlq968q3jbf96znt5nafjo9bfyx1azzwfwj6t7u54qga6wwtmy0kksf6abn2i8e75xfgt94p122',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'on62pxwjifvg5vosmguu5hbuk5mo6073pazo0j0jolf1ha9l0cpv0jwvbryl4b9lvqo4du6uuvtdu6ukbch3uzedw65tbo9x4xhq9zb00jwsz46e64qdamqzyqg12m80enqa2fw7mnmfx4pgqtoa3iiuibocus69i',
                responsibleUserAccountName: '97e0z8jvhunaqj9rb9vs',
                lastChangeUserAccount: 'hwwscq1o4ggop27ajpwy',
                lastChangedAt: '2020-08-31 12:21:25',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'qiv5s9ypi1x4uq0u5b8gn917epqpoyqq70ln67lc',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'gukbdt4zys035pvmjq70snj9dad5vlv2a8240p314f3tl472o5',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '1luhi2o9congjh3rnskd',
                party: '6a3diz92endf140k95j6ikx0b0zwslhcu76x9kvicu5700mlf10qfdol5ylu6v4e7lgk34pyh41cgeq75561pxitfabeiuvckcm5i0mqk3zwf5d0a4tw7zg0u5mbfd6hpfyxmbpstqtlwrni2wbn909d2pr6qjrb',
                component: 'zrtk3o3j01e4zdqejnrzdx5qvd28u0v324oxe7cq9nm2m25aegtx4ubbfaobnpp9xdjr480m7r5pkm9dvzexmt8gs99s3utcx7l19io8xjytj5vm34fie1tpfpug1ckoboihf0fkjemdzhayhcfp72md5jnwqbk1',
                name: 'ylqelez15filde2wd1n089yxoz6m833ng47a4do2xs44f42uhqd2nb89d0mrml2pchmavhmoq29lp7rkyhhd5lxo1n2aineqex6tpdm0yvamrn1ia8fcui3lba5hz6r4jyh37as767h3twj7uzu93jtntfzxjvzk',
                flowHash: '4vssq5lxt4dn6grsty0ct0dacy1ebqfut9n71mqy',
                flowParty: 'mhphljum9hgst9olwu0kotihpvg7ny1nf1p2vlly8tthuz1ra0kuzqu1f4jmwevwpqz1f13lu28tkinpmt653qoo67ksb93rjytldhpdkjw29fehr6zde90azb9se03wovl01cy8iaxs97zchppdlbe0tyb6t2qb',
                flowComponent: '5tjx5kp38q9xf2zahy2haeny3cblky6b7ms6mnsbkap3tl4qz0uoxx3lxr52thplm693pzq3rausv5maet68oc8rcx66jatsr0a3hlvchi20k4ntl9544ooc7dxlkmo5jw3sivme3fstp0165aw3ajdk4heg3klq',
                flowInterfaceName: 't3e8hiq0o2ueekf0qs98jiac5m5em6qrr8yb6qttwc2zlhvru167edns3kftbq9y1msj5dhrk840agehpbu2k9fx4a9qh2hw6zw4r5dbh0j1v3wb9grh6z7glvmhyh030ytx2sn23hrm1zp5isxvoqbtivf882ow',
                flowInterfaceNamespace: 'i19r52ezahbxalfog56yujn74jjb4evjhu561l8387phskac2k1itrc1ln0bm0bbegnw9dogr8d0nioj4yi8sxzsdml0zkt1oxiodq93zemwrpn54oyyaeaag5f9eda3v837xgmipzz8kkj5gkyczez03vu73i78',
                version: 'jie8djashgzh9jmn5wv7',
                adapterType: '25k3uqr8akkmrj3qyav9rtrfvmhybu1acqolxav7j1hij9jmnf6sd5uoczmc',
                direction: 'RECEIVER',
                transportProtocol: 'qzz14fcb951sd6zdo4vns1585hhx0fd0vpwgxt5j32qed893992y2cy3t8pw',
                messageProtocol: 'av0cvdx1kykl03dn25qq2lynjebbhi48hj0ee1xmcdzknae2h315t29ghlo4',
                adapterEngineName: 'ld1857pbv6hkf35pm42gbnmdco5wek643yv5xna8mcnevvdabgej6ysjshfkel60216h56b5je6l5om2eqdb7w7ajnmq3fpbapwns8r1hscaerf8mpg8u59s183aen662a5ewci5e311st5i0la1q14dlvo5z4x6',
                url: 'r8vcmkpzb6pyj5kjnq2wrldv6lus3jdhh7xod2w8gdivkf05lm8694serefjjpe1yi4ffr3x1bfpuypa1kv4lw13rpkalvc0bcr53obktdgp5mytbegxfw8pqanjbaijfb2tkqj839z6cgzhulafsctrzkvjgqns1ysk0fk3q64x8xopt9cpt421pnmzkqlhzm9l9bhjjvr8r8cqwpufvx1efa1q7k6zzno939ov6y6r27qi2z41a4claf06s17yqhpgbf4d0ortuhqgknfcnqt8nse5335dyhtrh8v8388tu4i8ca3kk717ruu4fquq',
                username: 's1k6j9fpgyc51kwu3ujl1pakzgbf2perp0e9ehnp5vrbeau5ghlkr1kdz1yk',
                remoteHost: 'zw398oyaw2jxqkvygqj4956p53vo7n9dny9gykep8u869jqlfb85xdt41ajelqc1ufswyczhtwbcbaot6nmopmq4c1i09zuf23thjk6i12hxs9yvnp8ujbfnrhibq9phxcg9dt357sepd8v7pl2zgrzg456n8wxy',
                remotePort: 7056706896,
                directory: '7w4vma9b56xoif8skj85ea0qg44ekl1gniqn964h5pjvk8ybrrrva7chfslz2ef3ompdbkado3ivad84i7ntd65mt8brwug37vtzg2kt2o8ns5pc7p5m0ulkf30bc6b6rzuqsszhahrogvjbw9ylob76jnvs22xtx936ge5az6c2p0zuhfktffz3aferz0o11gylzcux7rfbrxxosvv3wlgqe5fdbig3hb8kn57o5pwejddjdegrl1h97mkpkwesaug489wy2vjahvocxwnw4shb3sunk0rgguo1dv9kxpeksrthxzbasdma79s39rvptmmisr8hhnq5q1x5icx85xo9j8bs11trsxgli1amyk622q2v3w4002me2rt696n1xmk3czovctzm85n4elhnxee9ku54twz9f5itpnta0evsfu94yrnz8khxczxlffht65vxmtsm1ncmqyu63g8h8zyr62hm553upyf69ox3gz5na6lw2fo2g08od8ja2axj9m5cqumggzu0399lj62hicl5yuxt1243wg7gn1i5rvr9ojgxolnz4lpmt143s0jpy1wno78i5r2ratancy0me1y9jossamgyrr4al2qlpr71wxdn0btun1yap9esbp5ofru8qg78ku9hk576ypz81kzlan8ugpuizgx32q71f7snjo8py5kgy0hodfy7cfimrib6totejrodmcrm70f3ove11q89zz246p9t2img5w2ay8kjrev8tgfsu1u81tbjfhaauih5th8rxxugk00ia5m3adrx6w9cntkiw3m636kylxebw38uhmrocs9d3168wyiajvlrv28x9962zcbzmko3gqnwj4bnhc3ppe769vj0q7fe58p9eohtfrc05sqqdldosh28w2o59ce21aw8aw800zif7jj9yly8x812sp8dpfau9gq9tqzvqreipc4q93xsd8f6q43yteibw30u5qb0d05llwhykpk28309fsdylrxudzwqa0151wds2no3',
                fileSchema: '3z9qwc2eda1m92l51bn49krupqffsttvpq72kolyjwkefsl6ecjhkfvmwz7hmde9ffvyz8jvujl28b351vgi7bcngfftwcj3wl9ykmqjyk8vj70rj7vdt8bo973p7s2a6e26455wq8u5if7ynzfsg54je846f09e9b8tr2xqu85avzmleemw4j9rkk0ck5tqgneu1a0ij2g8v250yme2edrfemipxd3f9qic0nu6xtalmlw45gyzxx6fqi742nqcxlgt2is2qkla8uokyshsko7enfypo7sioktuhnpudxiutdcroew1r6qaxipz8kg0er1et8v27e1eqhy9o4jwezdjvlhpxcgr4pkfwt8oxy2h4uulksdcv4d1s6nnanwwx9nylc8ptji04fbii4ll0mua5kcsp67ukborknqrknqxxi1vsv0ct5fhq7r7daxn0kwgpbty9shnunlvfoeg5muqn56cbmun2qipw2e782y1x0u57cstf6ch10qbquqa26hk8pz8dyl9sut4uyox2fiqkx3vfr13p8k3ogs8bnr7ctzjva8c9pxxh4nkwvp1a16q4ihlgti68kxkin5ctk2w127dvlcsblejdoue810wrk0dce89zt5vh1yun0hecn2pb9s9bo4ejahdnxxuvi8t9c93v73vke5j8zmjr4ymm6gvokzst2iah8559nxzwzu1woal014wqzxlj85aucv93a450f1h1p6v9lqwtw4pojykv3ql37mz9zzlvvfg1g9ta2wjzboh22590pr59unboocry7l0patuxt36xbl7dgjt9c9caexh4g91su7udfg8ilmcbegmlsiwgj9yk7lwwmyrv17hm4cv3b3yp4mu5t945lbznh6h5jhi1j4lklsc1vbu0nr1xj6qfsonj6455ikkbmbro569f82w9m67mbh19wtjetgjp2v1jnpd6mezdkm080u6adrvbyb5nnfhwwylsi4aszipt6zqby4o9u4t1vasg7tuwj9y5ocv',
                proxyHost: 'srhh0cjz743q6aa4g6xsofzs13zbg1zisprqm2g7asa53lbjdfooo1f6dgwx',
                proxyPort: 2420084906,
                destination: 'vgvk2rb42tudxl2fynf3wzbunifhs2ymec4ggq7t6sxx9tnjxxkorcv4rez112gkix5124gel900bwhhwzjxhgp21jrh2189hw2l5ap6kfxo34459yn7cohe9w337nhp3zmt6tt4ymkww47rg1luqksplv35ytgp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2uzz7cwes2z4ly9n0j7ge062zry7ws9bb76cwemvg9tx8v871lp5o7lj32iql3ho2flvvgaswodtg3fzlnctyg5rkewle12u9gp1x56x6iuvht28zzko2nzo7jinig2x0rxm2x26trzt2gs68syh5gpoh5mbuxd3',
                responsibleUserAccountName: 'lpwg3gqlht98mlez72fnx',
                lastChangeUserAccount: 'inlkhvv03efhmi8tb4hr',
                lastChangedAt: '2020-08-31 08:55:46',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'fw6f3f1mlch0hxta9u2zv5fv4t16h2ofuavugnh8',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'z2jy9jnj60gsn7vu2gvffwc9fqx8hoxmuqcmlgo913wwb809n5',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'sgwktxc2hw2tkm8wlnq3',
                party: '3jxja9kjwhi103cesxpm2yblqu0yao9uv0vf3yrroaw4f7q4nxyyr648hwlfcbf81e0t9m8l10oup5k34qxvdizox3gy15jci2ehz9jvcj6spqpnxd2igs86jyv147euff335cfzjs347gp6zoe4681xu544lroa',
                component: 'f2hoalltifiy909sa64drfq5b68blzyko1k5gbyt7vob3wexpkessz7n21jcu5mm8rnn9txsa2fd54uzxnrkyqlvvi2wwub2gmdi5rm2glkz9yc1uqecy27fqn5qrzsrs1vck4ekmzueqi0c0jnoxgqkkjxf4k55',
                name: '6znij0v8nx7uuwn3beratflh84bmvlx021hehi343gt3vdctucdzii97qu6ds9kco278p8cygpdimksqau57saaycwneufbnk4ucxay8dwrc9gp0czc5vz1ozi2kgeqjh6ueuu7ukujuwjaout6k9x4s4e5m23zo',
                flowHash: 'giqti20kijo9ecti3vjkxh22g1tgewewxhhqujde',
                flowParty: 's1yenwq7izbg1j4frjl23c5cppmg6o1sf1am6bvxs2kw6v84h6n4qad6k6bhck5xiu8p21h5mlmf37optnecexdhu956kjcjb8u463teueu9jr0jugsjw6otxkjidxxf8uuvbv8w5z66k0m9wlfyfcpy4rkzytex',
                flowComponent: 'gzwv14rjjmew0bi3l8u6pqqm9hylnr028xjas97ckfowwxlv8snk00ubvtvwa0eh497g4qe8gc8smhrw4kg2khmpf7d0fq3koblf9z78ku68pz8irwofq25qfxcq1oeupr4zc45fuoforp61ic0d14x8ui28j591',
                flowInterfaceName: '77depea5uvlyn2ehhxc1ecp7349d70u9otnb3xr1ll1kx4b3ewi7ryjvpu2eoo0u89zgvx34885b39mxfewiiuqqp86xc3rtfjwwbcvm4jsa1dat88gd1emuy826vqiyiuxddyfjwpyohelmzjz17do5fqp1lbq6',
                flowInterfaceNamespace: 'h49ch737s7mb4zesv9xjzek858fdcczkpizrh1ozj45lrmep346s632h4bpgnedkts1mccx2ko4y7s250f76fbi98lid3lyvz9mo4r0n2nj7a1mrrns0rxmr7nehpg200wog9d1isg99n8iqef7rzyzhvijcdsb7',
                version: 'mu2x5liw9ia9gsdpx6qh',
                adapterType: 'khu7z1cum3ipt3to9b651lbsvo36ap1ud10yp40hr5xuuhv8cr9qd9u27yah',
                direction: 'SENDER',
                transportProtocol: '47j3jfj3v95a26d427c6vg4vtql1yglo61irk01prarp9x1ax9f0qxpxrsra',
                messageProtocol: '9fppz40zw6z9anlfmv48nui0altu23larwgor61rjhordaf1eyeefnktb4fa',
                adapterEngineName: 'q7bvgje4wijbd2xmkuyt28tue1tgtq5w044bjdpju8phhk8ohrm4vpjfuoxrckr60fcdbeb3f41nh3wr66fspb08bao75e3qxssttcbn0xl2x0j1vxsgdvft8ff01oh5qxt3x2wdu0hm5201svkvqr06lcpepa5u',
                url: 'r3i5gs2vhwkvxky0ys0bpk35z33qcghftk9l6zp1bnkiybe8hziy9g0tlu6bx2fqe5naypzhgqm9xpqhxbez93l0qhz9prgv1pxcydusppvhkda98170law55w2ei0b7fxs7cq1oijdx0yh469pmzg0955ne5qljq44jjde1hrtz0wckm819c0w67ner6htfp925xl8elhdnak6j42d1d2angz6bef3kmwra9of73ffp87u5rj37injstppmg8p98f2sp765lpw2bnnxdy94to882oq6pwws503lcdlmhirgt2vximhsrlg7hb4nuurv',
                username: 'd762v4e8meki6tg7op0ks5p1djbigpn6ld1bm6hs2q5w149ntdu9fzhn4v7d',
                remoteHost: 'uoojcj9l9gg02i7k6lgdf06mgefyrhuanyoho994p7qk0vhk5qho0mvmvxm0ysmudynxv72jz3lmztwzibcjw92ok91oehxybo2bxcilryiktydqx4g7ohlhnplw7u9buw6jigqcafyoerdl910r74tih9i4vk6k',
                remotePort: 4933539399,
                directory: '8tz01g8w7mq2d6yi2rhx5yh2o3xpzdw04tod3sln6jg3lmbbxntwje90hsbktpgw0sudopg0y1gkitm973g7ft3gh4rytp0lwqan5i9y65p93dfl2n7vgjyjx8r1gjxk0efvm28nim1rn47ey5qjdhfm4rsu0fwkr6v9qc3i1s3z1owwn07znze8885kxrgir56yt0mdewzwxgb9akk60dwgsn5l9ir0mfaefvha1q7m4opqn486xgvjcm2a1drf4zxri46d46st9vvdmbcbsvijw0vp5quqlgbbzcdr0lm833nvre4py1hvgc8ooguvw89x5hsdtxi1h8mb9ohdm6x10h8hd3qgf2wkkraxhdvf1ezeiu6wd5zjsjz9cp7405gwvy2ttvdv9rgaeygbj4lr0dgs9ldqnv6108c2vhyd5g3ytbhu1q7g84e1zu18movf37ij2chnabfw52lz1bg6nioxiryhhi32cy55h2dw9ou50icv4ry0ghtomktvvhscxhnpl3z3xvjj82jtwb8hmjbme63ocwxx6vq5l95skdt7f3god2mfkyvgo9fnybx655eu53n5d90mgsbrxchqjh2clqmvoyv43lo4t3s86o4d0djp6amnww9p15cf8izjrvj9orjjfge7eqx9piqgkiadmd23agce9yr67r986imrg16xwy3824sk7tkebc5ngw6c2gch3yvwdkkozpdh1izdbvlw2qjnnguzx1t845ifuomkq2azf9jnheu9pbmunvne8fd352f1bakm0m6i7ksep2ugzkb9qhqx2evkrvk1vgjxxf3d8sr5bwbjajw5jp8u77a8iffy9apahk4237rezfmaspennx7tsi41e2dehw9m406swqdxmdkixhv8ozg8b8sn4genn7q5ne3mjyfyh874h7x0vzohpwgqgnsyuwfsk3mq5n58gl650z2wymlzha863rrqkvhwr602ecv1vzgcgpipeovya14o6jyztx5k4q90nqwvrtki',
                fileSchema: 'i66rwzbo3iqj1w71w4ttp4gf3q5o5hsfaahlcekel8bwuu8axzxzrnq2irg4hu8djn59vs9hz6bh4vtwqjg19sml2qyf18mkkbpdio4kneggcejszpa86g4ema557bmq1jmrl3tob3q1gqmkazknnga7uo957lrs820v4owo965ay2k36e1d0nsr39z3d4zz8wpd06i6h1ra3vq2jz21cdvr1e1gspf2hi0t8p7x3e4h3hclcxkds2vounycoox7057dk3h057sy1lrvdxisauzkrhd7kammptzqcmg7wni8t1bfj4rucevdrzemutrl5cdo4m2ne6q4yp18fz3gxbk62c3gf6zn9qqta0wj47oh2wafcpkssocegbpj5bm3eu39iuqhxk3zxdrblkx823i9oq6ctwvvnqesckqy5ufz7793fzs52pzng103f6lig5v03q81qcb9htkkxcx6j204lfrn5fbrsnuwyfpz973ic5vf3cbcag4li4p608yknb9tb3xa3jjnugfhsk1vi1k20slla73xr5zoejnaf42v7p8tv0a6p8qjk9e7f9fuql5bf3qt8lvtp9ej7debu8i0mco4w44nie1xixjbp5fmonfz3eifdzmnjl6yeaav458y8glc3q9r46996dzk7xxyscl5wz658roqp85x3nmrwnw1acxb70xllifjxm9qvnwb6e53kepx7fq9hyl1bx3dv5snlyo05r9ge7odmnf6j6f5gcw8gh7at7xevfb1d12z9xrlpg7n0mcoccg1dgfjuux6iyhpa6ve5w7m9os44349k1vxw2fb1yfzkwqvvfcoa34rg8f2rgf95cbw306jzvxfz7vjp801ls5je2g4sk3uo1kbe76o9qb7mzz1casrxjx7vxs7l81oqyi0h8xn3f8dx538uzf7t3zvld4orlkso6vcusd7mfmi8cytdnai2g3udmaieo48lwt3s4xqsol8tfpzcuvkbalrz7upwa3whm099n5q71656bo2',
                proxyHost: 'hdyjc83figp6ch5fi0ft11wwilmjbtd9gg0vfiuy0ffvbgqfy0q2xbmz9ftg',
                proxyPort: 8125698833,
                destination: 'txqb00o0c3klbkjmoy4i9bowvfxam4du2uf9tyd9kz71zzjm12z0njxqcxws5hfr0pqpkuwn33bobwm7srwdofmjm62wgkqx6xc2zy0q3b40viato8ydzxyyoqi6pc0mohgb2s8q8uj62jpa07n4uw4kuhkfx7ln',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'b44sulrsjrd06sb6dgowgrsvwkwnxnycmonlkgq76mliqnutbi24yjjmh1hxm5px7pqzad634uxnh2bk4t70vsr0n80u4sicw5n44iqem5bo0mr57u6xb8n0qwy6geyxpirad8ssngun2r4cp3r2g0wfk76hxxq0',
                responsibleUserAccountName: '6fqnnrxstbi9ek7s2fz7',
                lastChangeUserAccount: '76fg3xd4ufekfk79x53j9',
                lastChangedAt: '2020-08-31 08:41:28',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '54oewwvvf3os8suhd3qlqcbb4uzvnri48ln9zcui',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'n978k6p36dvus8vbgpb1cr8ew6fgwuay4mk28vzssiiny80777',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'ceziwuuch2d0cjh7keoq',
                party: '83d2479mmtgs0r5b3695f1if6c729354gppde4dtr41skaou9xdhj9r41gsdefp87ug4yvnntqrjsp9lw9dsw13vmw114ate3axztfs26twjxemdpxnj4mmeav9muu9bzdk4lfoe0odm5yer8kvjzvz37zujusqb',
                component: 'g0m6oyneyu46gwq2dtoz7fex5zdt4xyh0oktiqfd8syy2en5ku9xfhb55zu6cyjqpgy937nilkpyjzv8ajuu0lo0myzloov8aa70ue89dah99j5thbghgl3rj9d25fvp82n22ajzbwv4wx6r4rxkdsmxvqnm8ftv',
                name: 'pnmekot0w7ylbtebrxik1bsuhqlloxxfrsso93iz8glxwosbeox76infis4ew6a709uycjnirz699f4uuhg2huoosxsk128rciyflccs38e7tbl4aaswhyk42o077jw9tdaicb42s7ff0uzkj1y0odsm2sma31fk',
                flowHash: '8wjqhfv7hosbxw51x02gxdz1ide64inm0utlm44o',
                flowParty: 'aeveqgiwqt7i3545ljvjopm91oimuc0rt518h1ibkbvsfs0m42mqizma9ay6x6ssj9w6pqend5gewb8kvkrqpct6mhj4uoryrbuay5r66vxtx8wojak64ynk6k0nq4u4va36xu9pg27v8ebhdp5ncbo8a9kuj1r8',
                flowComponent: 'bb8aonmg9ecjc24ba0q4dqnwyjk8p2nozulhj53aao9g959l74qdyr02dwohakhvngn4zsbk8gyr2gg35ss0ymolren81eu6sdqp9t01hzleesgg22nmjtwbp3w1knrd7hyfw5lw7xujxoo53r2zha3p8bptv006',
                flowInterfaceName: '02hk84puke7o0i22y4n7frqm6u4ma16sbqnevchg6l9cfk7x63x6xryg11b68y4dxl953vowpef1o7nzvs8ebd1bh2g0ru0k9slncybinmhse7y2h5oh3guc7hjjs7ilwqfcx9qxykkigo448i30zqb8f4xoop9f',
                flowInterfaceNamespace: '7shb2jzyqy6lfn9lvo8szt9kj9qe1uxl3awwvy5fraqhxaprel7o7wrgqcbbzd9h41tkuulwz8emph9tkdqjk9xsomhlagiy65w6qqyp7c2shtkzfprt9cvzu24ubk3smvkkt0hkmmjqfxtsxll571v8j132vdoh',
                version: 'nmfenx0jex1u5jwrrv0r',
                adapterType: 'nb61cycy0qnhmyjfao3hu2uow93ctwwk8xx0l89jmiqv6wvt2u35m99yjq7a',
                direction: 'SENDER',
                transportProtocol: 'ikdz6td587ex4o2u5cy67vrugo62c6upypq88suqxojfpiwd2qrlj2bggdx5',
                messageProtocol: 'fzjhhikpqmic839hbczbl193glxi11vlqv61zy9arrios2eoynzaanqdc14q',
                adapterEngineName: 'fkutipcase4idzf1x7k0vt33wv17b73nn1zu51l8phc1wpsfx3ldfeo21ffsnzbrkjt1v20u4zhfcvwha9bdpsfu6rck5a2zwlqqbju2f9xeeba5sbwju4jzd1q88mh67ipr40bylmx3sdw21grfvvj3s6orhq9e',
                url: '1zjhiyr7rv3qvx1ychyx7351aw94cs3vdgosbqr2y7p1extqdbl2f6vhzrxm0o85rt7nwjk78tsc7bm8un8y63h160mjufjes5glcyxy1s0nowk411xjcj0p9bubk5b86ne8o0d6nd1n949m28agfdote6q58ongh7wp4h7vzsv4y2mo4yr92a4gs874t1szyj41hds8y6m9ap87uojq6vqvyz2btqvsm9arle8bswg3slry3q7f4c43emhjcscsz072n23d9c6xryn0uljl00pjyp3ax9esggr7lr3mas56mukka45d31j1bcz6oqjd',
                username: 'ilzfn5v5shvbi2ftpi8a0ha02ooq6yj0ebenj3l4awolzllnqp0op7ofuwfo',
                remoteHost: 'trq0l3woyd29zoe912ojmrtrgvtspl79iybif2lg1uhbm4fezmn4wqhzz77z9t3dhrfi4qfisu3s41bhqco1d5bkr1lccdgryvdrdupu1r7l8x4sbybb2wn9nznszdezm75kwk9i2pfes8gfavxcvb4ew9q2h6io',
                remotePort: -9,
                directory: 'n7cjw569drf4top4onf8jfm6886zbn1fioik56yv74w3sigzelobk19yljza1v676p4ij2biugsauk51dqwzhj3de030fqn6yw9hqnd20yz75ou4i8sxvq4z6ocu7yradc9jb9hvhpqk1xizb4jme164zaiol2n3vmazkjmj2gh5r2o2ozbo0hcbedl7fb5kzi1a2xjh6574f2mb9lq3k9xhy0zfsz2wc5q53dwhb7s3om095xqgni441eln30v2gh8j0wk89t0k4xw5iklw9cb8vr2z78r79uac9cn0xm7p48kwb5qosyh5hndzc15f3za5ljqmnfvmtnidzf54fjvrbsvki7sd18sx5myg8d4wzl2ebwfs8n6vsvyei7to5wvecr388pimujja7gmufvgzfiam9bjg5kc8ejs8cgr3u5u3k0jg36ze2olmnin7rb3rd2hwtohabwan3pd8as328zrhms1lzbt05tcpzd5t880ttf12we2yn7i7rekg102fzwuaequm7n3lu5tv7jrg5h53ekjeipmdrsuolt4fju7140kqgmjplo6gf08jxgxf7n8wo5f2ymj3t2t9ti59tvjnencizo7romv1u71jt5qhk8mppsru3z9l8xw789uz1di20amuglkfy3tonvume5a3dcrhrhsuxq2qq8zz5sn2u2xhx6pc2f6nv1utqwo7ww9q5pej5uz5qfcxlb3lbls6j96putmcccpb3vbbwt5nsipfarhu6o4izz7uoozbehl0mz2ej4o000fb57v7lo9wqms40fnidlr91t9fyysczgzk8s8j1cy7mx2cfr82owyl36ste8k5rv0zfq6ppslay1bi54xlc12vu362jtx97wuplwftl69yrgoveezf4kbvmrs4g0v17rt9dv9qvp3auv8d56fwf61laf51zsy7q2p8l0x1lontpuqflddtysv190bz2h5m03w56du9izdymlodczzsfkkvhl47acut5d4e57or5c9vkfmp',
                fileSchema: 'zjjnzxi3xhq3mgjac25m11l8g9kt4lerhetm3l6zpwp45xvtuh9n90z904syd859bdfpi3t2zbjky2qerog515amo8vnzpx6oo5psblnom3fln8u9yp6stkhpidttadoxdwvnjk2mnpizx7zq6jjmitk2qg8klkwfum3h9b9m2hk511mv1zazzs9wd62lrgd83b9iwh1sn2qsrr8n0noaxkdlf80ptbain0ts6bhxnu6752gec1yk5vxvfz1mtrc6medrq2wizol7vapsdaeiy7hnk3wizpqmg9wy7bpw9d4hslzggocuzmrz9nz3pk14rasogeq3ak1rf2l48ibvp9ssdk1nj5vil9jrt4rf6pf5b8r3ipborccvvyshwjj9nwsl6er6oz2xax4vlydb2dwrvic7qsrewn2bcbmv1z7dbmmft7vb93nc2wl3meuomn0o1obazzow7bvol4iol5wsc10hu0u22kn70g14wa62h02gqfsj5gntxzq7qndswyp9qag6likg603w5ligcfqsn80igfy4ytw69do15am5257xqbkbdfvbc40mezca38nwl2ez5b4nomdv1x9cpsps9e3n4904iu4kuo85qvx8labhcw53tpva9q2v5r6opdt5hr8f8d4wqsd0abghnbc4e7mgegwz9urcrym0mlrcsoyfj08h0j1m119bjliefoqdikdz7k6tssjtqkknho7qmutk4nesr7yfl16pfkan6qi4rtrvcybjdq8hb31igvmzqic9h49s5h00ndn79cr5e8pfmvrt5o9fkd38x8ghkwh8v2ia9ryfo9zwiozpghh6kyvb23n06bjpi421hy3a3uw5jgd9o25yd8vcoqh1d0p94007xjkveroqgcldjfxbw9wt38r74p1cp1v175hgi8qpgl3clciew45dngsixkmz5ppras3h5yv3as2eylfx8hjbdpm682ylddce13riub7d9zmexwhksi6guiktefqyzfcu7nqa6rwh7hu',
                proxyHost: 'n1l415px51xmv2ozu8mygitadbsalo3i931ndwf0zm8eurmloki940o5dslb',
                proxyPort: 2077526558,
                destination: 'o0bzgae0s713nanfjl2bleeq3kxaxdc6x7m8faexvqc20bqr95ve2c8bjy3ccymf06jp4kqm9qi62a5eic2o1jw70s0bahsce1mjf8rzygptb0g5gy5pycsh6mj1l0tikxzybtbvyp1h8j9un0om6332kfjhu5d6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mbwo8f98hqzivp1xgv8wd639vhv1svcmdg4hkoxzsmg9mqzvv8svgwhyztmh0k4km0dd95vuf9wwyht4iat9azdbvatwur00fvognvfpx2aor0nfp4tg5x6hmrgi4e5l4c8g37c11k2oent37unusooyuzvbwn8m',
                responsibleUserAccountName: 'wsdofd3htfqyf5xopyvo',
                lastChangeUserAccount: 'sjrm8zie7484wdgapheb',
                lastChangedAt: '2020-08-30 18:26:49',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'fg8rh3ez65wrh6o7wh7bz6m3ogayz4uq56hqb7xp',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'qjkk3bwipjqsn6qz2gve6j4rswultkw73sylcr4alhabvan18c',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'qsc4jtbnf3vvijeo3j1z',
                party: 'pdcjoyfpnyolxsbfbi124q6yl20o16nfwarbjlrubspprsnbc50coxvsij7rab5a7yfowvw9p63kqi5z1d0mmddoptum31130lcff0ef9rnbrwt7g0w02yde0xrmy6cf086x469ri9c5lwo5ho4naomxljnwixyw',
                component: '6a7wprnyv8u5lg8mqtmgi5r31978slwpgkxwnibfyjqmcf7akys239d9fco3faxw06ias1e9665dxk6qqllzl0tvjkakt8q8l35t3pitscqekd6l3s1c8ydealzyyf70zdqx2b2dfp56sd5cfo98zqrt2j4qh0l3',
                name: '8qdcpdg2fs6gxyf9v2jqxux7qloljc9rwtuipx0pdk5c4wchv3giox3y6sq3jnotwy93kd2u3eys7rolnzu5gjvqcxvy7cerpi33asootlv5podld0h9yymp2z2nsgg47qi5jm9t5k5z4pc0xrv2s9xwh4bi4gr1',
                flowHash: 'nic5wkqaw67uhpxsqqx0bq80mqvcih69rb4qe5bv',
                flowParty: 'xtbft6l4xhqh2fzks7xtzobxxzmheq861oqzdtehaw76bcc18qcjyorcs861dcdpqjtaqv40kbl22eb9e0apvo1ezei3nwix0pxl0gek5tt44vsm1jjd02wk56ij658knqjuhksdsok7kvd36pbpf02j3ryw6k85',
                flowComponent: 'yhh3bdmk0v4xxylj5np814bg4u9voyffio63xwt2ulsr1t3lje76szfvwyrom2y7sgj16hzmnov0zud03yd91flj0l0mzcp05jh85wsj4wy338xg5vxoyw1my8kc3vlbqo9r90vvbvtp0qh7igmki7x574nveq4x',
                flowInterfaceName: 'ezibjulb87hpp3ky4j6yfdt7cai9gq3fpdg798qfr85kljthevtusbl7oh0n3uu9ilymuclle7fx1zzx7d6g05ppm90iuznbw4riw8nf822yzv8w69g30grtw2tk5ur9whd4qysqz4l3r53y0whywx6tggxbdzh1',
                flowInterfaceNamespace: 'lzc97wxlrimcia7op0r9tvrjfni0d2ter0n66a9dr1ircmhn6b54868yr24pjl2zbyk5yavk33487qgs7kybcdiipxy3sa754z5kpxa1juc9ofnh32n14zhjvrdwupxo5hk9trv3k90giox7uosbf6iz8677ohct',
                version: 't2d1p26quzkcrciygoyh',
                adapterType: '3y3ss4eq3mzcmct8xe2e0qyuvc08uxgmpfkhfe7m1lnr4f0fx35mz0t7x67l',
                direction: 'RECEIVER',
                transportProtocol: 'lm04er1yuc0ztzoh0nslf0u932ac3nu4c3skg1eq6hlt3lh7kiavvi06gc8t',
                messageProtocol: 'g17bu0cqxdvs6cw4ul9b92tjknd9pak9cu6wpj0ze5cnmuld7863pmm9fahl',
                adapterEngineName: 'oex7t421bocke21dyx6zl2mtjgbf05c1fse16ou4mvoks688i3d47zodk8k2zu8zewcio6yoxcs95ph5qkbpou8gh5bspghkunv6xpcj2rm1zc61ux3bc7orewci3escxgv7ng6nbe7r2vr7b4t63x0bkr17zbsb',
                url: '1i2ioszaxwfkffsnd0cuynaq3j19f5xauxz7rcpjjglpqbndi35gartiazpysmz6nw790e5gm4n5wsy1k56bwabcu4f3zfaewnhjnz9ln3biwipkibs3fo8nnbzkogowy8wlvpuv9ct9k7iffr5xe6vupiv4cg5yty9rwdegodh7p9k4zxyaaoxxr3fx4mk4xg4pzt64sbscdhtgpjxgrvie5ebs50dfk0a7qnwwl6o4s7sft56y477s2zeczxh593bkccywepqu8yntqa6tu6il3yt52oira9kp2f0444ohm6t0mlejisrn7s458zuw',
                username: 'xixsm7ko3csu23v7quogw4cjccgcxsyobqb7126kam6gfqamvm7i99t69fub',
                remoteHost: 'dtuhp83ejp7lhk1ufnxpra5ta75xz4hl878aisdjjatef8gfswy9mstiy3yg62qvup63z7sj6wryxcbt5nc27z0uo06m44nc5h0056c0uavebl1f391o480w7mh9rbsdb1j09wi8ksdrht4z8mpk895mr6imvckx',
                remotePort: 4086047606,
                directory: 'wqo3wee9hbpxwa9a8ywuvh4u59wqnkb58ja4fg8dl1bf31rooppwebyh24xxrhzywyl0l2kxg292zidie32x08em108suiyi2ithsfmnj6vmkqzrg3z0iim4ukm8ilaqyvbmbrrtz7nunt2teqmj6e4x6mwitwxqfbakjnf1mqd02sxwl9zcc7ucxrb1blk02ah1kchav5bnie9373hn3f41q6d73vqqrcanf4ijr1kglz0fzafnhr2fo9zutj1d9pyq59c92wf6mk5hxycr3tof95ma4z1mcv91w2bmuqy6j2dgv8x7pygwzsomk3nzuwd85zdmr1qfzsrohzq5jrh2vuzbux3xaqxshv61jy2mn6ktuai7166xcsmukxn6v3poosd70r20gzbqrr9k92lb4vajbhazzj5679x4kz9y6ylu8z84phqar816sras5tu7dmwvk11vrt0okr2awidcrp2g9kwsw59vqzwv4g0eq37n06hg3jr60m50dn9ikpn1sln1jpj75qdyan16rrxu0lr7vtqmn9yeskiqwmps96znhwrpdz800bx2oibjy715ix832qy4nyf3vy3bgjkgg44csipf0fyiliqt4ibs1256xd92jlzus984h4kd89awjwzxi5lxdw06csxbpct4mdveripgxf865mv0f09vp63ewikxmke0qeycf27czluzeogkpi56rosv4miatbyvhcojxn732xge2zrpp3in9y1kbis7ovt9id7vvhkdcbkwsqo4gwibl350myuvjaob3x75bsg0vot96zmi689raywntum1zb0280tv2max1svt1i0eperz7rckrojngvefe8v52r0rx39szfp4pbntap04ia2sfvnv87j2msjuswtsx8ez9qev2b9a3qg4g8y1b99cxn4buhzci8iryobvxw1g8vaj63pndcxd816jgl50qudns4s3guvlzlxhv65nistegnjit1yauw9hh0rilge2nv0pmbinxe6aqewc',
                fileSchema: 'dcq72mncx5jaxwvuvtjs9ty7pol7cnvgn5tbs18unpe51xf80xwg5xw3f5xcfm8pdhgtwknayolicu0qlypvifmxotkg3k7kkdhualmhjq2i55sz6uo7af8lmf8kqjyi38m3iqopbfz5iwagvwmaav2fz45no97f5x1sy2n4nfl1u9v3ov944tiese3k5ho73h1gprz81oathr9aythk40c3g3c8nh1yf75un1ie7bzg4zvq7338sf8k7d0dbouzdko4kcr6kmsync7gvbccr9k33lz25m2ab0givrk7lyoaalixemn6o0olpmcn126st5tyrl6qovwgaftvg59wwrj3newnhc5vt7l5mt5wxaub7hhnk0pjn3w0yfxw7utnvexnyrn3uifl25iswgx0kquyhfp073stdxf1nxpxtli67p9drz1gfa0qlmufdhbwlmr21i21ia9rs2dc1avrolpdrby6xdjsaihyyba2fautqyptufjp278rhpt1uyj42dw2guxlnf1qyh5ymv59o2in1yeos9wenwas670dnvks6iw1hjay7ogfo26xnf13yiuea4xtyg6o03vx0x62tpzt8l48nb9uood8fyo0gyzp0209f005lv8cdcbpadtmpg7kp17aef6nu32qiedartvnobwsx1zjcaf48nfs8vlg5d2o7p60x0yd78bqujkg45xpvy1drsa32erao9ugciwg3gbqcewu6oowewfh2c2ttl9c877oy58eozsnvalq6467sfq0fiseqlskvupp12aysk9rwqpsknyppfmpz0nihpx51nr5l98u7erisjplwp4ixrpf4b91lswfq6qlmsvoc16da7jyhngpot0eqtn80ur9r5uxkxrwjjrjl0kiu732zqj01m2hxiz8paoxsc21xhi9su83gu5bp2ur4ux04tpbf7a163dsk30opf3tii84txpkhiqcrnkz8obsb76ixfpi22wm9jy2qs65ezra13ihjygdkpk8loi1lhcx',
                proxyHost: 'zjn36c3x3pfowmx9gjffebk12o3tx2a2v90teb4yi8hwjamsvwqilu54dnmk',
                proxyPort: -9,
                destination: 'hqsqrco8wegci3eof0u85u8tp1gyry98xq6tes2kgqhwt5irynvo8fzs5khqq9vlxlpjjkvsjkkm49pwpt6qahxntqyqb6i1qsa1avaa3ouaty2ddsgp3hzr9xodujgihq82ttwayw90apb3of5utb0wnvugkic4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tifodja3xk9buln6u5n6qk9j9yjubhdxkb5f87sw1ruwt7xdwvnu0ulqv4zbj15iw0y41jzjlm1fao0lsajawzlav0x3c64pft6fdyjjwhr0hh3k41362uf7ge6csn2dotaetdik73fvy34bfyqb2bubl0u23tmh',
                responsibleUserAccountName: 'n6mxc2t7upfbwxj82a2b',
                lastChangeUserAccount: 'j0407ivr9eds8kv5a24z',
                lastChangedAt: '2020-08-31 00:49:52',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'sf63zwhyqpae4yw21tl4ck8qe9730geuijamhogv',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'nwh6rmdkkluqlh47f76eumjwhvnl52z8znstupge3i1p3a1fxo',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '46y6pbewi0dwsopmy5ti',
                party: '51x0xnhsy3r3glv1mi0zp23b4plw6lyv0sswl77d6cn9a9l8sprxdzw1be2bjjsd9e4ep24avlg3s3lh8450ei4g5dyscalgs1v2xz3wsjf3k7o8ro9j0dkw595hmxsonru4zwlsi2d39w6zdfxbwhvpfpv4ttk1',
                component: 'q20x4gwxhn5n1w7rsjzxt48trx7agg0e7203wvjibbtmtzejslnnuag7qdtxs8ts35xyikmjz4fjlvpspso36wr574y53l1s669ewoj76pgj2t8ayyek20hfvse0camb0xevmf7n40aptc1aar3cr8g2o0djkkuc',
                name: 'zkl5j1w9kpv2zct416m2hcgw6si3m6l28dtnpmtjcjo17n5xljwgzxh8350w5d96timqk1b5lc0gkvgg34rz5n9221guk5hpn6wd4yxq33oykgt78wtarm5205eeoz7qw3g58rru5cszr8kfg77z8ki0l45xq1rz',
                flowHash: 'cjls062095y9m1j4lryj5pk9zc4ch60k274t06c2',
                flowParty: 'ooa6gkt9mtfy0g66wqwugmm6u16xc4rj2f6z73f7narxjhawz0emvos0k4vr46sb9sedzfldayerzfnikck2ansghgbxddnr8h2y3y0ddcfjvgu9empdkd4qfturdrob5qbvbt4kcl079qq2x6hacgiu34bx8t3g',
                flowComponent: 'xpa6is7u3r5p8isa8o11p7g83z7u9j8l6zzpl8ed8wpzlmwryhciq4tn5hfmzx7t9o996bxkb72ufr2f76t7d8d76hfri3ejosq30jl94wqz9979x6fq4y87qjbksct4gbeb4gi2x1f579nbtececrf3mvtqgy00',
                flowInterfaceName: 'x9q858yujmo17h4t3hb4lbsqoah0hidpghy2exad0s84gk1fxkwu7d8kadq1oi72bh6hwsqhmhw3ve2fsrvgq7jgmlo4ntoatsecskyl49nurcqxsbygwgz6gn2ovh721rhwwjp79dq8wckaawoltxnu58ua1lsc',
                flowInterfaceNamespace: '1fnc7ev9ei5eqibofz3t9x5nd32h5a4er9b85we3ctckdhoxgdiu83bgc5htsi29n2bkvjea28wlbdl01gt3r1jnoql7m0n7h4a1g3vmsbtintgegwbiy3e0t00n98ed57ukcdw1vxv9k6u6fi4g7nqmifdpdt5w',
                version: '1h6opl3rr14gahe07euu',
                adapterType: 'yg9q1kamz6x6trubn9qp7p5ck25dydrrshzch5a94b7p6eljhv33crpwvulv',
                direction: 'XXXX',
                transportProtocol: 'pi56gu7sz2td8n9czrzzxsao6ya26wp7irchzmx5r11sl5qteqtl93pu1c8k',
                messageProtocol: 'hg9pmafrw9y7vil8zv26ibti5gkobk9zgirnxih48avs76o4s97f5yqs1ci0',
                adapterEngineName: 'arddusbp9fugtquiteai54qvg6gnzwreyl8jkuhfktf96az0e68exye81ve83zkbntcovqox179uuos88lbp2exjutxp2nfvwq9mevzjss0r6y1z6ez5juid54cngh1qt0bp0xcka44k3koygepzh12mjqp2fw1y',
                url: 'nsdp5xmohoymn76vd605nvefb14o6cv64xqgptstnpcumae9enprs9t9xt7oihr51n5v0620fz9cs53ymjnpyvrv8nox22moryg6eta97ak3dnu7xdseczmdj8mufmt8qf3v1hvazjrdcsw57hlxwzmuhj6tfbzk379or8csch0nziqsaclphh51tnj492bwfhajqfred1dfeg8lv96cndubzlpca1440clj33481qhyvuqdn7x0mojpveyi0esy9r15ric2syzfs2ua1vhcwl0jrmeprmd1byi2hlvtelfndx3w5b0685eivl8avedl',
                username: 'yyqgx5343gpum6qevnieni2auppt4yqqopzswx0zfam9f6lgu2qiydbtlify',
                remoteHost: 'zkrjj9d8yonge54h6zw0z8sln6lnojirr1cacfalb3lc60r444awdaw9j8q8wtl2ma61e8guot1td51z1qixajf1wnypoenc5wn2qb2qi96cgebuqtpy7ijhtwnxuha7cmwe19ywwac6v0xjajtphl33c8s6t5pv',
                remotePort: 7988753110,
                directory: 'nxp8ys1yl9qratix0rcxep4gc97d4280c5b5syzfodpdsfsqm1yu5tb8pazbwlov4w3of1xpk0hlzpr3n4v3ceihu6m448mj5gbq7541lrnu6ijcyytpra07bfkn2a7gpqmq1erbgkd0vv0qfi54o7i9kywdtmjwinbrrq3won61ev4nsilt4m0dx1vrn1xgs75gc5q0kmxb1xar21vcew3r7je0gws5f7mjytbq3xlg7txf5fiu39n1xsttljiaulzciwbwaek4rv37j40wkls3p0jc11dpnbmxoo25g1fy3q9c9iob19auvdtf3c3tuy85k9sthwhqs2pcgzjp90mm7hude8n41mmzuj0wgzys6xe8j4672qcu6vajz44pbrhxug3oftak81vst3ys58pr2ki52oalvt97fqxur73wpe6g88m6cgfcyr62xldmlc4ryy9d8jxqr0mw7cqemqhgutc4pq01iw5yren8gxoy51t5md3wb5krn32p7enl2myuq8opfkua1tqhonmkomm0ku8cvpypsn4zlgddndorgd0b5xsddns2iof7trne5q0ow618otn9cw1e9kjgr3who8ks33qmo9tb77inc5r93c1cawnda1cihive3cjbq8zijgle2u7aiky3rr76knrknvalc7dln74m5dkgnfid0iavup4o1rgah0g6mcedrtyofj4jjg3umn64osue1h9hnuyyvj3i0c4f2owgsxy1p9dnh9bw82yj64xc3i6shxa9cbmrq3l2nyf80pc7ulc39kw8nd4edu13b1mckmxqp6gs5j44iyq5nprflsmf6z9isjesxr4ayzttlofn29enxhhybkyzl7e3ermce950rnjltc461fa7kpq4tt9eqskgxkttvl3e9htg5dgh3k1xwphc409rgpxypmffm9gh5exj7izjmzf7h6l3qcw9vyrwd7ckw2lp1oz7bsf63yikodtkxy7sgo4op0z3n7f9adoesbpy9mqgspzyojsw',
                fileSchema: 'vylpjk9mvi5rkadcjnqo68qmfgl4oyckvx4h0w9p057c7eszeu66nymy702thkeegjo9naq2z639k8thmk02owmkbdlq7qqsals86cp5i8jd7or8etm7w8phq6jghaua9y6fxlhs4ygu37sadt55p6rzrojr2tgnyvrio3orkbll0ibi2ih4gos0u8zt5j8j63yvpdpqktxac1cquwzvk3tsa8j6mmow2g74cdoxkv7ryc780ev6pb675ufa41w9pe52ndpztg37fhr9jojd9jq5giyv3jjqbbjbxkvky31me59be0ihoxb4eqtblabq97jmzqdtrfpuayoxoyhamjhrpw98ka5k2x1h0ce3qwqa7aodzo2tg7paaqizkbzzmqexdnn7iezvzosqf8sq28ep69vgx2p2oh0c5pbelbcc05v524zct6s94r7scdvc0u56gpq3ba22x8zwyvobvmxr8mq6zjhscb4wcu6olbfzp44vln3zgzl1zkl2d1zux1fqr5hbuvmr1h5f2q5haed9gvz952skdf28l6vclh4nn676cqxzim48ltovhgds6zkxg8ch2km6pps4a2jpl9jk4wwszklau3vf62htn6mj34emj8yq3b4ynwl6aypw0npn0arvuivgy86avbc0mmlcz26xaq6l0sjvqouo0gq57vyr2rmce5zznfoaxg1qojov1eg9f2w6m2krla6mv4o9crhgsvr7j52nqz3bbt605pmd0905a6q9j7r8tsjj6nvd6912sl1jru55dc50df5kztouygkzo2mfox9q7gen3j6wrlu8jp1x5lirfxc2tgd62f46lfb8e3sdk1nbuytsi6socxcli0dyb5bm9st09d0xx8cfevy68x2v6uigzfp7nbsa2b2l0iqc7mea0pp4foonslayhdorulyfliu0a60tcjgk4sl2lkk9oz0x48ug9gmqddcb6xxkd4saummxs4v2raiuko838arhwyme2ufk0nggxtw5nq6bh77s',
                proxyHost: '2mec5s04umlpvc6nsyozvmkcrbs6ty5e82fi2uhqqjr9fozkdddq5agy0o2b',
                proxyPort: 8751154802,
                destination: '7gis0t56txulw3fdeb1yet3noe5agaa6ghozomkfhvbt8y1s6vdvgq8h8kfuybvav0k3q9kjjqdlqr2wnes697fga8c882poispecovhgmlqxtrx6njc0c0n8u5fgnkf87jjdnxp9rh9l55j3v6invecvzh66jlz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9c8ekbte12vog10pr2t70mo4jo8feaqugjasx4e1snvh5q72bw79byo3s14o1lv3ff4s52ss8x6feyujwp1kiybqg2g7zxbfv1ti8tccbi101v255t03vgepocqz5o3f35u5zhc7ls3ym8dcya9p5okt4ar41375',
                responsibleUserAccountName: 'tp2enhzvidny7psegmc8',
                lastChangeUserAccount: 'vr9pmtcgvk431xj1g8d5',
                lastChangedAt: '2020-08-30 18:22:38',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: '234ykl24aznd9cdipr67yx3thbzqr9uupau57xpo',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'bdju3i3174xudl0jegv9sy2b6unntotvaorr8258ot8jmpuw5b',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '8ybtbadfi9s602hf7qz9',
                party: 'phhnn3y2b4jx1l93yh55x0bz82dzajd26q67olchzrwttlwren6fhzn7qxx52bfo332so6garii8xhuyjz1i8dczahvl574qdmzjv8hlcsd7v5xrk6lmqu9eam6p1kw1h8ldhm4x1gb2knsc3eq4abaje6dy0893',
                component: 'aw8owt6nrmb4r80t94lg896tejl8ajg9i0erv4oi1asj0k09s5ljcgi6yix8bmj2gylv2lmxuvnqnbs9qk0m66vq2867zmolzvxzg8kzuuour3oppba55zm1bd3bce11q1etfuftgwx5a6qdw6qmv3dafm6ujsmx',
                name: '9p3wpqyyf0japl8xjpm11wlfeow8jllpu1k69w25hhxoxzmiqi8oopo4f9sgn6692rxutcn771e0m4c2lvtizdmj5ftr4mq6fx29q0m7dch1dfu4yk91tnhctuypeg7baf0w04vxvir3yrnpq84mafsig9wo40ho',
                flowHash: 'e8d4c4jmjv2i7jcgfziepmim4jhnpyyjwfefg7yf',
                flowParty: 'zif2bmnlm0gd4ijq11hqwkdtpcxnswb7j5zl5sssmpta3mu1zktc85o6tqay8dj7ti394o3vru658sz781xwym1giuj0jsco8qixa61u2f9icx0tk2posh8e9f2c1ve4f52af3fzrxgtan50s8b15bc25o0k366u',
                flowComponent: '8k6vhin6gscegsct68wl8qivwhcy3yexh0ex9uyl0sl77o2m18h1jjey5ibjv2hh1rfqn04eigsif8copycfkhf7kk4nw6lvzfhnpsu7vogn2hl91f36jw5c6fbv2i0p7zpr4oqokgca0q88bibaym76qhi8l2kp',
                flowInterfaceName: '3ksg0edvj6afvl1kk1ola0cf9cru1jpzrhego5zwhsj7s4vvx3z5r9azlgkmdgw0zj1vtp0jjhbga07y2rhjwpbuv4nnf0lyvmq1ema4smdctbka2mpue0gzv133g1ttrrm105snaqdebz7zkouf2glq067en03g',
                flowInterfaceNamespace: '42fzga5msbnpv1olltndp9y3c7glsfzd9roick95d1sqrmvh8opyjxys43x0lanp8j9btd5t5f83m4yditaqm9c1otmy6ggl0m0qmpfhjzixtslbtclfhp5a3lppdxny0uv1wii6mi3rqkz52svzpheoxj0iwzqf',
                version: '4gz740i8i0yd1qwdpxc5',
                adapterType: 'dg9ogr1tuhmajgntjgmflw75sh0g7v90v8a83f98om478w3aea3bv8xnd9ak',
                direction: 'SENDER',
                transportProtocol: '8q67aah7afj5da3dzomtffyw2da4vlfhxxm7gqlasy8zzf7p3w4igxleddhi',
                messageProtocol: 'plndcv11i43zh6k68hyqnzb9o8o2l590xhfpjbkb37kdd2nzcad6ine7ncji',
                adapterEngineName: '71kxwtiqf8s5y1ahx1hz975y4l0i2vmwx22rm2b8wnxgf9fut9zuws53mdcb6kyvmc7te5m375k3w0352rupfv92we34j4lu9sx3ykc12cl0hz2prr7hejqcrw495g5ao73q5ye1burg3l7pzh5n2lljjhep78ew',
                url: 'et3gjwnb6714338hws2fvpl7tuvo57kkawfcqy38en08uyeq86q8aglq7l7y2eclc7cmoz4k0qsuwrw763eveo966u929906118oanbtizrrgva3di78kkjxcyllcukoimspvmn3gbw60cyfqtr9r2ysx4sqwpzqki1vwn0pnyb7v2cd27nol33ino5gsmxcnxfeq4pammf7qso6sjrce0vn73snx78ftoyh8cnouku6jubbybvkpnqd4x0bh4av5oyerhuzn4tiljpdph6ckpyidxe62tpbrcf8o4f67e2a8la3gb4imk09pxc2u58o',
                username: 'b2i9cdj8twrgfp17imqugydv0b45xt5nz01wmso0spqzskgql2wf5yt79qnk',
                remoteHost: 'fag6o0mchui9h87l1dk50xvgalra5flga1k1t38k1zcfbunnoa2cy3tq7z3gp9gzgb9hcn7ytnz1qwnh165kp0ltku3lvvy1skq8cbmdk4i1zj9456ihey4h4bvb062x6gjkltiv4hcnqe6sa8eb9vmatzquaqzo',
                remotePort: 5727474096,
                directory: 'ndr6o50hzyvn5464s22vedalrh8pi5fw4pr2no9t3e76yqkf9kfhvy4nmqpykdku67kmkt63zb0e9e8we4gz7hs3a225s7jjimr1wbxh5kgfjjp74xwkq1rgt0vuqcg843mu19813qzhd5n2jtu2ia3iihie92gws4l0wo50eyr75ycy0jrf7x6svnueevbouel9tcvinlx8lsyfnfmyng9vjm6vq8o7upkpawz72wmtqnixi91t9fmaeteak9a81wugt742ksd64nb2p6fnxuxcv5hlh129u48rqm741czkjz8g7as00a4qsygjsli1bcq83uy3wvf7uiuruhdr9bh412446etnnrnv86ep3yic42d6vev9lsnj6ij1vvysueq54nn8o1j1is9s67ucofoeaxxrs87ezu8i4hjueat095q1t214f15607vab0dh7fjdaisntevigxajeusvllj9rbdz09a0gs1q5vojedl8ur58czrznv33nc2igxgf33m3u0yp9juld6o1c545zqqc18yy4ahddy0zhgvf3l5vn3x0zrrb7x7ccv8yij4w33p8jg7yx3w7l5fznbb0s5f85dtchwkuarpxk03k6pi3zzqn4uvr2qitdxmoki5bl8fu7e5okpmm2fg7lj4r2bjkqxve464pp7bd8ftwnfe0e0oe2cvitavor1ebkzs9cn5zf5smmu28mmzg5kq18y86j39jmnthb0tbj8lhcnlcledvzjeztn0zb0blvv8bsw2m7paa38l98bp4crkb6mazbh2fxyusg1cpdkgbihr54pzia7d1vtifh2smsukwrcm4372cywlmy5tg6u871qdkmwckkn99k9g5b8hk4ad3un7lvcgcdfrfglccfnlj4p4esogy1934d86vg4i6kky7ra5qahom8v6mbpy3rck2m3l8jyvuuq6ft5pjgh5plqc7rbvd6kqdtgfcoixgmtrb32meanaof0pfco9ofq2fq92ywgr1a8ar4q7c7npq',
                fileSchema: 'ov77xlaype3zqy0fop4g0f6c7x001gvk78zlekb78gynb4fzlk2gap0ijl5yu5sly8gzfqukl40ms4qe5gs6ice3s8y5l2elqx1b2kz804cbv9gonn6yay6bcy81exqa6bkf1lrg2d26bd7k2x6q3e74p6jsvh2mtywgunrkkhw80y24p638i96joyur8nzu0yy2i3wvqdy1yed4c819dbh8zdn1268waehrfjcywuj7bw6v45hgpu8k5z703tmov8kpd9mxjdcavo8brl6xvi6eu04zx2uo2fpx86k5ncpuohhvbu952zkwukp43ae917zh1tnmcqjnqypz9ya7hm48i0puzmm9swe6biux05k8ht51fs9r3mjmd189cepss13fva9jo89mfq8yrgksm4mupvpr7g6l9pus9xy3fimx9b63vovovwwz4wybp6eldb8d9hy6txpa6shhwxe3bamiag8ue5i8g9z7hreq4qmiedbo2ht3kvwh9cmxmoz5jz8as5f4t182qu7idxqmmwoecsp5pjhbvdwktpqbk9e43yma1hswk8pxi7u3du97dw3q7houz822ju2dbif5q0hpzaqgqx3fosrct59jkx5y2yg81w57smzj1orh565yc71dg9j9cjfrnflolpeiwdvdyvoylkusdlmyjb3wclzpl478iexvombhrkkq1pfjx5fev2uplp5ku4awm92asb5s4gzm22oad878uh9yty6jeyvldyxl2eysx0dtryesxv1brgnegzei1wl1y90mctearg2fyzpt35ip5tnjc678cwu3rjyd74sob59am9hzhi1d2q3fwznjz8rsxwqlqhuvggs4j20xafdu9n9nbnfsc75c1y7x5ihzqfcf6grm0rfwtnxww7gf4blvvmgxp35estnq86ke3cralbul0u3l1s5oudfoxnk5baj3gzbn6z3x7unc8gkjbkmd47tlzfwfg9uadx4evh0yurebgb7sp9oetp93h79jhutby9vx',
                proxyHost: '1o5kn27gbrzs3g6mp4if40jdqxblhjre1d3akvedai32j0lf7bb9eb6i80fu',
                proxyPort: 5298777648,
                destination: 'q8wzfaa9lreq1mscas46iu1dpizt0zkz3euiv6l6hdp6kq0gdm598ry005adhomoxslf0ogvqb45cwnzows262shoptbp4p2skvzipshm6ejc90p0mc7yzms037e94d9c8pg1jeo3mn6fwnxy4hihnil8t0go298',
                adapterStatus: 'XXXX',
                softwareComponentName: '014ikp57n0ram63c9ycltrwgr97qbl1zk21d9racf95czd7stncuhe7h9ph1q2o84ctoq5zs9i68mglsm6wu52ch6eu0surupz1gvuf34p834do5rtng3o2ikz9dtek58ndieeb93mefdjctapl9vvlurusf53u3',
                responsibleUserAccountName: '2sapvyz6z7wd7vtii8fg',
                lastChangeUserAccount: '3174i7vibt5nyl5ayt8l',
                lastChangedAt: '2020-08-31 15:09:15',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 't8tmn54f3uqa4p6sur6eohdr384jd10ghymfgzgq',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: '4qn8ypfxep7vzhcj61lpfzsd9fn06hytadqf07c24p6px7r0vu',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'l6ak9vom2wy4kv3pj9yb',
                party: 'hzzi8zmllrv4yv34tefd0kyp77kif4r4gqjp8u8qr6cmbz2wirp2wj6nz1monk62dbbag64xu9oi5ndr9enfttilvcekvs42hl9s2hwwkp8e0b0zhzsnoyw8ut4996pp3u3jnvy8oaxryyz6lnklehgkbrth2wf8',
                component: '9gdsajsezc24w9jzdc2043secaljx99ide502cqfruyhy3s9y63c3ax19rsafeskuaexncga1hv711va10a94bis1infos3yed18n4nm785y1tz1rlhuleiayonpd94jlcjfkrszfatro97rdbi6v2gsijeo8lgw',
                name: 'e2f6vd5q1tqtn437xxef3dyke5hqtyu3dcl3yjtae33u8cp8646jnvsoot4x3jaivv7ltlww6c01qscm2zqnk1w21vzg7qpi1bab3mnncc4m78cxzq95nsrnqzzwfq4vq0ykhl3dv0j5kwr08tvunc4fpedv44gb',
                flowHash: '5z09xhfaeqhqqwimzoe10h5mcmk5bjl6yckg80ct',
                flowParty: 'akkq8a82wz66yja8y41k8t0c9sd1g75wpr1r1njbcpph4ejxm2w2a0idji0mnzxxmzijaiuwwh17jl8ridht1fh0fh11v71eknon7yio2lz4vt5t3k996klf9biuu9r6ztxt4itqkhhcunvz9j9akm20hzkwqtru',
                flowComponent: 'l6x6hszzaolftstly1of7m1esl4dj5u1zyxhbm5yjmg4wp95qifcm7593xnt59t1ch6dm0klznr01gr5eyk8nmya5ulqm89yo5ydjgeswh57dmda3ijr0b9wc15kvddaqr72ka50rwh8w5vzsyu1vrqkqju3t8ry',
                flowInterfaceName: '12vt2087fnroxmgcf15jujjsh4tul2w199ib013rcyl2uijhu4vnjyax9ebm2x69rek646cik1xw0hrj4dlqdbtal5iwvu229w7zftn6a9xlia47so7b4ebv15162zclov41ciqryzlp3c7jqyflq0u9ru3qq30s',
                flowInterfaceNamespace: 'fr6cko6kcaul63rhdk9409afril60wyg7wej9i01o5t5i4gxy7457w82x93uasis4rnzbb0s5lom5xpjdguqpwwsxklacx8dv7ecpqut4qzsxjau7o6xelzqcsa1467r96u207h346sxp8gylv6tjcz2zu2u517k',
                version: 'u7gld36utuwiiz5m7499',
                adapterType: '2xbcz5g11z3glbhyfwap3f5w8ebovcu3wraqz7peskgmhygxcoddhzzg8s6f',
                direction: 'RECEIVER',
                transportProtocol: 'rymat6sld2e7sisu0qztt44ubnp6hrmn1t02dmjuuedylv9gd50ygmcmn6ap',
                messageProtocol: 'iokbgxdpfurnouj7i38mzjsty6h5tkvt55pssrvlbm93sprabbusz6cz5tb7',
                adapterEngineName: 'z2o2lz1bc6dzn9jo38gcy0lhjcj6ycdlh7b8pu0cx98h63q0hn4pndffgzr7gju19fxyv4hg4t0bweqxkyakeud0nq544qfwkcdxtqql78j1ilxz1gc1cqqpqc8hs35g3d2boqocql4p937hhn65m0s4r0543val',
                url: 'lr2om2f5q9nds7d44wnvc8m3bm7qz76r7he5mir2eapxggp810d5o75l8hd7g11e0bdp44n6leny0mzoqehatsjoz3nu0vxazvx9v92ss1iik1o7x6659jno55tagd9v3yzswtgi6ysijj32v9h8k5yuus1hqlv1oc0q7p6flx2esv253b2ax309318s6owekxttdq7mnv42g6hqif1rirocn9o4jw09019ey0iu5ocy6hceajy2d5bhf70nz7zet584coy50n1h4xzlwmtdojzz7vioqb809zjjjj6ctx4cuzlmoj9tjie7jxwdolm6',
                username: '0qj1nusdlb0sxxrq13kbv4eh1nvg26gc4exprrb8j9mqr2jalpmfqmojnx2v',
                remoteHost: '9f7asjdmlw9nxf64vfal2g51twss63owey4wwclzl0gzlcgddm9ry9jeedearbz8o0xvx4es9hinh9i7dtqxlmfs4dx4typjwi17o3kqnqf9l9anq3lzfoun0lghx9ij9dqadwuada0v4kp1gwvhvih98s1cpcw0',
                remotePort: 3243459047,
                directory: '1a8p8z6pl30ac86xg1ejx55vh2o24gxxoizk0b2xqi9nfmhoqvsujslclarayo17j4x0pcvj0usgn7dyg3vjifazgpb97rrdn1u02l1v6a0jcjv9cawv27ok25lal7vqki74gueggo7qc1vdvhx33py71qeng7m9cyurqurcwz1v4hs8tzwr1mfkn9gm1edw34pydngqn733egnmbnvydoq5fzlmjhgevnndjagjzo78i2lbqy9d5r9fec78z3ve8hqq8n41ivielgvpwnmchtnay091xs983kwt2fi3e1anzyetbypi8bcjsgsvvmhucr4grou9wqgnic5ev2fd29kfrli5g26np5c722dne3trv3g43q6zot2qs4ngg3hznc39v1a9ytx1p8i97e8xvvmyupw233bf25vfjhiz2vd2msbzxushcpqfghz4ail9yw9ex9u01pwvevybfovfxtsfyn0lgndrais75x3qqr0vi0ff1rd74puel822ghfzgcyqn7yrfcc4hkb5kimvpkgnzzd0b34bhwc5ona67trcfsvb8gdx2coi755l8mceacn3t2t41o0kwgh3x2l74qumm9es1bii2siclk0x3yqlr7s6q39mgw3x7h1ejfx9ctoeevlw6zp8fptb7xo8z1n8eru2416r2q9pa194pdeivqx2jh7t37gbexzqdrt3c2nn3apo1hjcnfz1xl0nrfnbh6r83bhkrhi7kwuu9uie9bjlxalm69kdljyx8f1xfc2auu07bto8i2mprbxjlqrgejzupu4uvnk14ipo56ba2mdnffk6xneihuixiftbn0i8nkq8tjzzlzy1jryilru3r17vm3hz1mjbgqairlszi2z5nm3ayfslacumhsh8t0f8gfm1rfyiadm5n5ln34i7xrck8oq8doo220nuarjd1x6xrvjhur5clngd2pub4lre1e136q25imu6by6ydgrgcezsq6znr9qqhnu28s98bbhe3xcy916fqk3vbz2f',
                fileSchema: 'nlrfohrjvpyimi9jpd8v87v3yvo95lsgrqq9dvdkvdkzu9uhsute5bmh7kzpculdf83e64hj1lj18sbkne625yu5v65ue0s1dlkhp7n5f689bpqbrdy7n8rxs2lffcf05257o8t962mzrzer8lc6ryg8h4u6tuc7geq8a6p1obo5rn4c2q2o5cp8y8ninw6g2bykovj2jdolvnq5j7gd6l916n0hwqo9pgmpiocvdsxy1yxyvkzbnljqqdnce43mdcddh976g0wlu0gj47665tnkh7j5t0rlhn0ghufvrngnpk1tfksa4y4mtisrclvxak3lrqxzo5h9w3eqehdj96f2hsesjscth7k8ejybb4zir1on63veai4fxt8sbzew7hu43q789usd0ye4a7n9u81seaqtccfs1vfx390nk9szxamejafvumu4ivpqu3a7hqull7nwi83126zlp0m5iuvlodp2h0f6rkawtq99gxvu98dijpjrj0xzo3ohoisw2r2vmugcu1ylomzefx0ga0k43phguz2iwn7upyrjk12l1zmi4sbvmzfsogdxps1jx1fbc40t2uqa1h5z2oxj1vax6oxy2i37b4b9n0b20znb7dibrmjsakjj2bxfdp0zw5479bf5gies2kgo7bq59gkpxz4yo9ghj9cob8584rphw3wzwzsn7cg872kqemcc4jlicxn0oucwd7axol7yjl31iqs7i0443kpqmxxd4drmzq7oyl0cscgvzej6ud1hn4w127kh0lwfu4xrbu45t70m921ch6saqutwjwzi9funop56br5or7ywcpomy6rno7wu9xudc6vums0aufq4z6b9drr22h34k193eq19lcot64mj2lmw20et1dd8no2dutmkx1p6qyjvfddshdmbtm8gqh3e10oavlbo0njltec7chuxkzc4m9r029nfovnnff8u85c78nw061fe80g0lz8o58ctj2c1h79w2tkk0p59qzpgsa79566fn6eq6viz',
                proxyHost: 'h52m46h540f89toxtdenmx1lv966fd422oji1efor6iz9o2e7kqe702it67m',
                proxyPort: 3157851750,
                destination: '3ggagog6n5m1f7ifsj7fyyysbc1txiv9uj228d4vvzrinlqqwn10wu2uooenkaxz8lfky8ry9yplx5f485meexkwavqabjvgn009imppnhc5aqhodp445lhoagltex3z2rbdegds3iqsta9dxh1d15b3tixqljnd',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ga4mw76ljcm0lur2vhl4kc513p6po8r2e4sj7dtw3rhmd7tgkys7xhnxk8p0g5xbzowwmck376z7m4vf8c3yohmae02e4enl3kkthosj8j6s1l927o5asz9ajr2q6tuymnz2oiewnd4bwnp37sydi7cis828gnw3',
                responsibleUserAccountName: 'hyotmlp0px19ek3hjsjt',
                lastChangeUserAccount: 'q7uazm995vnrn5chmjyf',
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
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'c20unclksl47jun3604qpx65fpqoa1x29lqahx7i',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'p0r6bj2xeiq4cn56jahcf0j9y4n80bi25758dgcg6h4lqyztqb',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: '337nhtnz93rfxaxb98u6',
                party: 'h4w4wk0aa2n7uw0l6jn2yko21fx9v93pxnq84db9snu46rh6xynjiup80pbazxolyr570k9otqmwq9oce1rjam2t6zitjxtwssn7xd3ao199p350vmasmy6rmfce312i7crv00cy9krdtdilz81fvqkil11d12p4',
                component: 'ax9d8bj1gz2yjld5r019b9zsmx9gi55up8tr90hxr8q29hk6hfkplrs6f1rgi9bn6az6g5pcmqdz6ccyi7eia5lr8we17rcmrngxxx33tui4mdicsejaabpit0xnqxk2rlzrfprjl8foflg0pcb93vrv37b9i4uq',
                name: '4barhzum3bwmjfehv0h4x41ffu371q18opyj31gv6akcw481o0cbjsjd770mdg5l5jrml8e5kqkuvrvdrmaviauqab7o4i5dziv58gczmhgy0pqgejfuslon6a8pl1z1xv4997os0by0eklnvrqqb4psk2z1jtze',
                flowHash: 'tdeqpmxo6wef5z8vwrdqh79sru55g3fzbx4ftm55',
                flowParty: 'drfcaegf3fq1iskfjustphzsueusi9wxtezp97e0o64yrdj5mkxwxja5bnjgc3oxa0zma2q5fvgtg6o3vjaq6aq5qc0tpygy72p0fkdcnfsx5sr5its73m65w5rk08vjzcmylnhnmbgt7n5duf7xzoam7129s1fm',
                flowComponent: '4wmc1ck8bj1bk504yo9qaojiq5evxlo5yoalco35pq39wjilm1iwuhvv6jzasry2kk0n0bp3zbqikmxpukytdxg2hkf8b7tgyfiw0a5aorg3afi5x3kdblbw3yjj0r075i1rvfipp111x2uq7ybcwvxnbm7tcez0',
                flowInterfaceName: 'gj19dugx5jscbdsu1npss3hahyz39hbuw7ihu960pnp2li32v541vikazf3cbovlx0lccwuqg8lxrw2yi88yf8717vp3b6i9y2o4ifnbs0uw2833ov83s2j5b2oevwisb5cj2rig8316xn8saf5rtl9dosavjupq',
                flowInterfaceNamespace: 'sfitjoymjqnn437qg7fi1divdcpu6vh92itubbs2r3dfdoic5s4kd8g33gq59iqwjf0ky48mxylpq9h2hq5hdpokhu0wunhwh1ylepe2xwix5dqc43gxpn26et0zh55lrieci8202b80mwvwr6w65r37fei0htna',
                version: 'xrjb8gcaxkvs1pz8aywu',
                adapterType: 'mtkuozwqim8cegxoqognkty7w1ydmf82wcaehmok8bl4o6hizpixaktldmww',
                direction: 'SENDER',
                transportProtocol: '60bu06bpqjz80gwctdkxec0zwhhsqwmhjqfn6sj1bn2ddiyjmzuo44dgwjfz',
                messageProtocol: 'sk050e3vxrvg9zy67p7o9ecspcu4breyk8veknras8luzjt4glul4zbjqmzk',
                adapterEngineName: 'qmlojshb4s40z41cxsi7m1ubjbqsyqkld92rgldgnemc9e577j1n72xqb6o3z3okejljkmjzy37fvmx48rehb3pytl4k5er7g0ernqkb4t9601juzvewd3o8ujadx3hklstszi5n5ujx53zqgz6fi1j2k1p4g8h5',
                url: '93t3ntu4twpogb4os7khzlk280ljyiffqbuawmf3cv0op179kzcgu4bes6jrljzchezrhuhh3lz1n2ojizh49lbz63dmldjgrrs2e0hoccuxd39c9hpm7qkfsw0l99xjwkleync3wy2stnac7c8noglo5m69jx0aio7ovbp9b2nivvlqoactidloknfy5a3ypu3h5rrcmf015g2aqrg348hbpblis2uyljsuzdj6dlm8c10kgxk58qbqnnm38nt66g4pqq3bmkpbmegq9bh4yujmh3ewhebpx763w507ph6bsg2sw3huxulhue187fsn',
                username: '2nzlxl8qymdezed741e4i4byv7uq0g0iijw8sv90aej8jlzvzxrldfqx5em5',
                remoteHost: 'maacq7adu6nn4v9uzzwi1df26tqnhgkm8z4wibmxr02rjwhpwrdcpdi0ziih0q8x0f5llat6z3rnv803yrtx99rrow9gfwshelbscf7jldpu67kwyhu0c18ecsftmyd9wokt57uur3ec39bcjum2vaafkrrqvl27',
                remotePort: 9251795920,
                directory: 'xl0aiu374o43gnr2v2bn1kab8csngwjssqlt7hioxzpajebq11texk0nxwjoqk0wo2cw5d6q4ntbvco1pxy51h714k7fndw45qkaf51x33g9apmjimgulg2bpt3k5o00ejc5pwu3lwqq73jtylmxpgtol09lav85ki4oaqzhm2alsm3qu4t7ud515agaq2phzd7lxbp8oeixomtp4p7lk3p1oy23m6czhqscdod6vv16d0hgcfeppu4elzq2m8o3mog5x9kl4v1k3z6ela934jjxqekxv9el635nmbe4zarecwwxim676xqe5wn77oya5n1qr4brgnn5g12sec5hsf190p94q5fsneknmh7s8ze84ju9yx2xw73uveouax3atvpohtir6v29kvgwovcri4cz49uknrmtmozz929a5uzmeyzzfywdg3fozt54u5aq9dhaa5l721hxv7jhpkie0vkkk8v7c45tg5fyklczoo2lgni2e54oty6cipycy8931xnaznm14oki0nt2q1jtjxgbezvsksewsbd8yt9foi3nlp0ub4ec2wz8pvzpawhnkamfp8pgny7wkwf0jh02oc9frww6dyg7zo5yhkkxc2l0rrcwornvc2vnf5xjccafjnxgnsn68ngj7vfv9aaebniprv5rsj8rs42oev0vbei4lj1zbo551e9jjsl5l6kvwx2ulzua4h48h4c76w0cfypfx8mfd971bfgvt2eg1oeo6e77y68x5y81awatxkkg5xjqzcjwrvucag7vb589sznyuimbj0ry6xqhhfdpr4j1td9i45zmy2tb3vm845tuwy6m5ifovfx4lgpc3rf7hehisaplcvrnn7mkpq7fy6gfh42l5g38d540tn2fqu64yolkb4x45apcuul7afuxcpyc5symqympo8lz728pkfrkys153mtih7q98mqvxn9p6468n4vqv3uz0vg0a59octstnmdssojww9x138lh3p9qw7xkf2lkyuissvpw86fd',
                fileSchema: 'lm7e7vs4tjncol2ujrsms6nympuhqokeifvmelgdvcsd5yyto42jg9b17smgsbtktvz6tfwitfkv859zf6hcwl09vc2fon7yyubzuy86tu5hrnjpgy3pllvgsv9522rkv6vwci32cnhcer1uxqcvk6lymv2lapid2sep9i2pv6fz0fbjsceeo3p3y50yjhp0k4qbrggv384gd0za1hixkmoos2j415opcycycptkk660ocj0uk5aqtn1u1df4e94knu4gl19hbowm6i4afdk3vllsvcbjn0c2etmagzjcd6lktk9x2y77dvchg4kwisq7gp7u70ltxd04717now6wjnlibx5awhh95thuw2m7aeqlruwq3nzqxyatkipu9xy64vgcxngt5x212tz8m4b2qhsvlq73txfs3z0vensrehrmk5623uypeine5gzj8fnz3ol9g5dd82otfoqi4z7jjp7cqiecx7072rpjhxb95csoiuw8zirujqxsrnvp6xc2dqpm2iluf27lgqg6abqvuvttlpdpvjnmrneomrqddrxakk362gwegudes25zljik0fq6hya8tasr4e34781c15zyirg9pd3muxj1g3tywozwlkgz7gii33f2nsriti4uogdt2zfrdb8g2r5axivi2k8507pvwdemdv3l2g6y2pj6n6c6b9n4gewbbv2r0vqztd7de02hc0v4tiz7wir2trei33dtagxudrilgzrq21mh0e2e5zowinf78hl9jmw88q7yha93vqwcxzrpfvaz8q8g3glz5n9my50f6rtvyb25o836q05rpnd7zb2d3wu33dumtuq7zmdwlm3qzw28vbeppozyohvu0jcwdphnk8vxqxk9cl9k356rjeba6lxa5bwrg4i3lz51iat8ecf9eltkazhg45h5g18o4zdxizdsch2m68m7w39htwj8pf7knkhk4uuim9654dvo175hy2tgx68j8070jty4c5imz69ym3av486uu0mlkwm8ogr',
                proxyHost: 'eoh5yokn9misaot0asqb73efpd6jtyccyv0oxk5g7rg6icyp6r64bvryobl8',
                proxyPort: 3857451783,
                destination: 'crs68y5co6rw5v9vva465wnk3wey2jzsh77i7lkzh987lw6ixznhuuz1yeq7v1chu8lre49f6pl8zfnzttnj47mz6z29budlwntre578o6hl6isbx3d7kexustzvddpujb8eaqsi7f45xyxyj0o6xog678sdljte',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'aohcxcceuo3zngvyhqz2ewtchjr5gi7lhtwrnwjg85nu3nwkax15s8maq1a1v6jomas5gyc7j0xjrdgus6g5wtqqoq547ruby9frglingq5apm6pnw1pqxos4xt897a4ewr18f0q0hp5vtvy1uf27snj580cdqej',
                responsibleUserAccountName: 'bwrlg17lwbhkxp504fvd',
                lastChangeUserAccount: 'ukn702hdycjwj9uzea4u',
                lastChangedAt: '2020-08-30 23:12:18',
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
                        value   : '5dd73f38-1b56-4a9f-a61a-18c97db1eee0'
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
                        value   : '660772cd-dcee-429b-92af-5ff08474e25c'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '660772cd-dcee-429b-92af-5ff08474e25c'));
    });

    test(`/REST:GET bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/3697fd2b-3f32-41d2-9eb2-691b1ee4c27d')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/channel/660772cd-dcee-429b-92af-5ff08474e25c')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '660772cd-dcee-429b-92af-5ff08474e25c'));
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
                
                id: 'fcb3e35b-cd14-48f3-8b42-552b9303e5f0',
                hash: 'd1dm52dcfghgml7syqeeuf2u95opvh851mebq3ig',
                tenantId: '617bbba5-6fe2-4b03-a509-bb2a825d1eaa',
                tenantCode: '65e7oa4dy0s53qpg0tf6rx7390q9rw78v40y7ep53boyhk0cmu',
                systemId: 'e617e75e-93be-4afe-9497-05005b2de703',
                systemName: 'srtivbydac6dtqn26tld',
                party: 'sahfzmhmcecq3f2v7fmcd201rsal4s44f3fglw4ocmacb7oihsv1i44uq1dv492srgp330llg4ih6tj3caj4gajcu72ppobvmyvzo90i344gn4cpowk1qrimsf03ir6xtges9dom4bt81hlrlgmn248z6jie1o31',
                component: '3mpamcdsekxufg1tquntbvarhsaajaydto4tg3agvwska2mdvq8zw12s780cthrmvjyyvpg40w0bcrm0mw16xjhwudlqh3p78vs3dahhiu4y6n2v40zssom9u6llrbsudy57tq0q32emgckbr90y5bhvuss33gio',
                name: 'vw754mrqw9pwb2033vr89d0qkgzd4k1c7h80a3tsnydqlcjt2lh51uayfh28k8h2r990if4d3ixbl003dkz3c4v4ei7vefbhz49wshxe9w7jn4ofxgaaa4kflzcjy8bcwi2ykqumt8mop3tyjnblteezv7w1cg1y',
                flowHash: 'tqw9xv25ao8qs2at3j90wms73smub0wljdm4cn9h',
                flowParty: 'kux3qyh363zu3c2lkftcsw2sic4efzd6kfantqvmihk1nwh6xqc9r5xmbntohltrwxk20tvxzgegw7mr3bwxc4wbb407bvjmon1r2ed9p5qkn6bqi9cm1nwzccy84molncdvq6ppf22wmcvm9epjhvn6zmeknngf',
                flowComponent: 'c862u20poh7himfl636q7hn0zu1gllyzsngv3oulamyfrjcx5yle2zh6hvy6toit4lewvsz1f3etarvni138cojnbupdjk74jzb57vkrfrecl5fi2ndp8bfzvxyp03fzn9dmtp4r0kd1oky1i3nqn9q7zwkyrdrm',
                flowInterfaceName: 'f9absonsvqlocrf0mtj2itp1qlatcs9tn5pcmj010y5o8wbqxqjw3ccotmlughklr62bpifja0l76csucjy3vnjyfndzqb74543jfo2on9ao7byd18hi3gjaqdncnqzpn3bikpnjbvv66zguqm28kr66nwothf5p',
                flowInterfaceNamespace: '5vybhlhr461z2esd9nkmunw6spa5ot2myzs7q52dx15h44f0sy0aoqwinfrp4v8bouu0ixleqit0eb1uqj0pcxc6od22hmf1m8mpyc834jfx3clb220w2dv4nlrsplq3ndfs57f08mk09pj6ubpfrtljgirx7dbo',
                version: '6187zfe5n0ik1r7rvhy3',
                adapterType: 'k62dkgv8fmblo46knfwhmsgjkc1vxtr8e3fq084uu86lom9ywl27ealiexjf',
                direction: 'SENDER',
                transportProtocol: 'tqkn72rzcbdw1vdonda6kxumbigb8q8dtdzvy1y0zyihr2fj9r6fhh2n3ckc',
                messageProtocol: '0djyc32gpc4f7j61ln2ceae4jc39efekk6dbncc59u8zgxa79y2wczm43lht',
                adapterEngineName: 'o86pbvtl55txux3nqlxdq8efwa42sui38wq81za6ykm11tduft8dflkvuspv2jmz7x7c49toi2l5y0wvcxowqx0yiqrfc6vyc6yuty4wghhbe1wsfs1n2jh0uh2rjupw8j18hcyuf0gygabh6kovxzodm2dalxy0',
                url: 'a6hnp28xrvo195rb8m172hfd9d9oypkv0w3qvvz2sfsglvostdqj1gj9xoygxh78r0q5uok6slj6tk1z15k8h70bl9umxg64750zpcb7rv4eblt9niggx51xi2q4g4q13rbdsnw2rv4zkhzu71du98n9hhs52oyo4qs4v1x4k08n0msnm0botunibhtn3pkguqlww9ez2qo2r2gsom9hciu1rh87reeojasrvqhfcjuvhh2buy00cuc7e5hczn9ili75fvzc97qw875lt4wuj5f2cy3ibwoxh1wvqsoh8hqm9qwjm9towh8a75nuyixx',
                username: 'j0wsui3eu4pndqsswwgn189kpjteub5z8kr88wdvxep8fvw023mp98t8prwz',
                remoteHost: 'ws6e4r3zluu33ae3f3jvi93xxhiml3fayx7xyg33qn4r5vxspfa8zj89y0asp2nxg7cdvffkucg518raisrqx8cm9f3b6xe056npymp0mbky9dz6v95buxl67goyjsiiuj4f2d1ktcsd45f3l8qgu8h5w9qmttjo',
                remotePort: 8665316769,
                directory: 't6viu39ondk0fuajciluwl7zox19tww0ynojj7seapbxd0hy9q0c4p55ou8jy0brqs4qeuubu0yrr1zjsybx2vu0k4r80bqzys8qcisxwbqtrxbqvvwskc00tz8kcghrutd9zn6c4jce52t2yhbnm4az01k9570vrr4e3caikzwxhv2t1gka4a5b64t23k0coyhq2l1slcuggp6zp1lh3iqwblu7bhxq1rbzdt2sn92yyq5b224v6t0z923onedrmsdddjqr2kz9qlpwzthn3bm9s0jcixl91opi4sdghcskl4c1f5jxy83b3fc5jkd9sbby5uwjdmvqpdyua6d46g5i652six0tlcuk24pwf0p006u0tw68ujwk7dp9cmjmg4x3nv6x499odyx1bfrbgoxqu00ndot0jdvgocwiqoysypavdwu1e0hcluip7txf8xzn73ubiheaqij1pbn1ocu3n2nnwnpg4erqnoqgdggbdg94v44sp6a9g5hpvi86ymdlf77wzp19ajj4osuokjlw1i1rgavimq2popf1x0zbhsdo0qodd2f4typ06oj5or6yawro6wu86wx8mk79wi4krnwpt5lvitaf519jw09q1g7ccnxnfv5ww3sululbih774csmev03oa4g35l7f2p3wxxd1xqp9vttiaii67jntwdi9gcrgxxz6bexq644tyrz6yi2ljtwc9cqhm85wlp1jpoznic3be667ybbrbbu2yusqnzhqay4qzcrpioqxbslvz3fjd467woegckyd7lskcu47usms14qcvkckqqhwt5hxis0qbvkiv5eqet3efzecszr1ifp7fra41ttk95kwhhn8aqqk9fhyyglhou707zdsl81vds5jt2qin56u596fubiphszz6dogujogfvjytenvu9s83ytaglse4f90pesvkwxfahyjkid3m8xhkof2bld2e3tu9tqaitztbok5xh20dwbgviec8gn9t5a8cw76i41im0m0z8pj4ga',
                fileSchema: 'xhi14d8l0c1kf6ooae98l41lz5ziij4k0i8ypsw5eyjezehs45fbmwivd08ko7toemw350khk5cij0piwle9zqbjkuz875altgf3ogm5ta5ugk282di73ekfn9b8d29hqla7fa48qayldybnwwfyxr7ooe8s64l6z6rcwftlg48diy250nn2iyzxca5csfjedc44v67nzr8whyauz2o3ydppt10f04mqho33u6mvgrx2it2aji8twacy8qovzq8omof99e0jh3rhl9h4v8j7wa2p38psn6yi6ah3iyai786dndz66qreki9uf6qqraug4wqht0pvm9nzhmuvjmia1wxpl0ujk1ii08rw811qmxacpwqprbsyktm5cico44p4lqpkk6bg2l9946penqkx09ndgzdlynkswtwo00zcz4f9euha6hcih2y0li1mtskqoby1p1ad63y354v251oul4zwae9k6d7tff9vd6ippcwpolvk5530aku9ltqc2awmcbzt8rbftmkqiopavtam4hhh9nnc3ti2ohqsx0u496bnzabc749oix2z0f1zjlvt9ado21vzmey2yuwn2at0b5g8sn7q0dcjh1floq7nk7hv0zqbxoh2f1n3eshzrlxxidpmv0103kgfuiv5gbs3dsy06twlbzcg6fvsjd10pjdfrimprvorcohn4uwqwfyfueqt1jsebo69wc8x8us10op5uweq0hc9hg3rihqbsyf8n830kx58wk98g8rixpg8b4p24v8tik4wecuappx5ueg5vu146e6pxm8kud93ta5t06rh8br0eswhx4l9qiplgb2vszfnv45ca6i873vxj1by653iud74dssp6b4i2lt5srcnvv8r5cgdfneyt6l4ke37mwgg9r85r33re26pz2gzfwdqwy0mfqoba6sqobbaq58cugqpv10m4vh3reksybc11yhni16xndxapvgxxyk7axxt6iyq0c06ji0emvbgvytmksw0re7q8f7eecu0',
                proxyHost: 'qwcqsogneku6sr4xpg82wrmqbs3xj80ws7d76g4zi13w65r9k606uza0q66g',
                proxyPort: 7007808752,
                destination: 'ry1duwr2tvvympmoia5g19t3bh3nkex3wafn5mpwy6z8jsi5uqsvz46p02e615d2khrlm5mbnnaxsoqqbbwk930pmahx4yfylhwwtmvc4ojtjk40n0mpazov9ur2zx8lm159wymvmcf7k0bg2kp6qmbf9d7q4q6b',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mwz3gaeh08pf04rv9wj5q0jr3a5vk2gujmszfjfequr4cytkrotxg7m69rqiga6a5d3ut2kqcl7kt73cg6zccaoirdt286as55ce4l1krka5hbdfkfruee0jl20g11tro41n9x7yuvhv4y2wqzqr3tp182nxwlkr',
                responsibleUserAccountName: 'zs9wyiwf6kt78jvt7061',
                lastChangeUserAccount: '92j1b35az4vyabikyl2y',
                lastChangedAt: '2020-08-31 05:32:35',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '660772cd-dcee-429b-92af-5ff08474e25c',
                hash: 'b7vy3h4lk5m0xf7usf6rp5rsd1fkg5dkr42a2379',
                tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                tenantCode: 'trrxizsqsaed1yf5mc33adqx413m99pebkq77s7jh2mhjpv3nz',
                systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                systemName: 'xa0elrsrbxujfgbmb0px',
                party: 'qcefttad9i2uyz6qei0vvu0e8p43qbbuxru3gnjhs5umngu56c5m86skqmgjiu6z4c71apjzd3smiuw6593k93bwwloorye7rolwxt3twasgpf5233ddnqk4nks99rbujqdy0jzjjh1refzmwtnkkziliex6rwuz',
                component: '7sflqx1ndsq2ajhdcmj0jgfehtk98f3drd7f3cgh0w01s5yoqu1jfsiobqzvyk4vm90n6cvnrghluxft2czk8ynt3vq8oph4j1h3ldsh4j0kgk5xpfhvkc1ej895mbwcyboe59jqrttv8pfr7liak8haf64ofkt3',
                name: 't05hqzr5cqp8f8ugsv5xij22vhxhyno4qwg04bp6tyqurzahlaeff2lsc3ziigqbl9qj80n5u2fvpa5dwz1e6aec8qycao7xepy0mmmczuxd4vdm1e6bwmhgch91l0z93kgw8j7scedy95nxazfe42b1q5imvw12',
                flowHash: 'txkpg9epa8tagnfn6vqtv5b60ccdc1s43w9gnlcj',
                flowParty: 'thd5zprazr624diekci90f6fb2amev8ijzrg8nozym1veofv198y7cmrqpedwdxku8dvgvypcag3f0b3duz1962qhg49w5pugrkd2b91uctdoccqm8g449k5zes2jveit6j5zxjkp0sl293lodkp3vwoxxkwexra',
                flowComponent: 's9dcturcurfnfux9gzl3y9yqao57jizesd8q5h7vjmieuogxrtrf0mg5n8ose6qu7200qjfc60ahog94x8xl3eaym9m7jwkt2ydqkvaahycnuhjt9pivwl23u9ck5l1ks4rccvugyf9b0i7ybpl6hgwltm6and0i',
                flowInterfaceName: 'j2k94dsfvlj5szozxy9bbprwh14nd6t2ipgp5cv237y8pinclfkdjh4cd80ngwonxbxgfg6jw5f5lazwjitui1940umbrqj8uosay1hytn8krncn5sy3shs04p8kx5sh99pf9i4z93s1v5mpf24xd7j2ppv1k32u',
                flowInterfaceNamespace: '3wwcurkwc4xlx0a2c8u5s4pxji02n3ijy87cmtn7zv5qu5g19b7k9l10ordfqv2fxdr526pethf412pyas0o8wkyoz13szg0d571lx5l6smd830xs73mghhln1om5y73dxzoyic21n5audrporab4ipz9r8b6yrd',
                version: 'e23n9xnachvxeo1dckzj',
                adapterType: 'p7jjkcr1u7v0u9k9dkjewn6hl7r672kn9gniykkdlxry90erhes2apl6rcqg',
                direction: 'RECEIVER',
                transportProtocol: 'ip9b2j9ruuei421yqm0h83o0rivomm3hb7o4rneooywl4ohvkvi6my93mh2m',
                messageProtocol: 'e2mw2bse5671efuei6dielpuhyq19eksxaox40hrx5450mntirvnxgle6djs',
                adapterEngineName: 'fcpron6gv6lizxjiyl1xlf1y5re5tq23otggn02j7jxc6z21pywfnw293jru19uteht1k7v2u5264j90iql5iwjj3xq8nko31egzauj1t6ga4hogs5qg50zmwk38bx91frewlrtyafder1t5y8b7islhfe2ayqqg',
                url: '5kck4qw890bt3deoj6rtdjq50cbm0ug6ctfojq3wxh0k096umfp1j9k56jhoouysbn06gzlq3b1c6tjewnrxb5inyoqm3eta64chbd5o6f38g0wajxnnirdezhriatai1236vixahxdx6buortd4kcoqiqheuobmrn8z3ejh4v3i1jnalns1ax2fobgdrbavopv5wkdndn92ooofno7ajd1e1h2pekclcxxsqzuegqf67do0v0j2z0nkw1r911tacfu2s3gzepmn6887go8wbqbdob7prwfwl09b06lsxjlcl2krcwl1y3y5xderpw4j',
                username: '7xf2tp4mtnsiu2qqll6vclbywmfwccszz1wtn8kqo7xsad1bc4uy93xysju8',
                remoteHost: 'si42dw96a95q0w5ugbwtkcyqi505r2u5xjp5ji0zhkqjto89x1g9g8gc1u28lwvd58o8adievz5gy4iphs0lrvhizgkh5e2gexvik5vocfq5c7k25oaf5e5v29karjoasbpiujkbtl773gi8y2zj0oss0514ck0y',
                remotePort: 3532142287,
                directory: 'e9cgg1a2rnnhcy2odxq9pwujmw4besbnn07b9lss1nuuoki1wk2gf19iajdceka3p7a2n5s52zp6szdwu6p768brra0jlnhilxjp0gl70xlfyy7jpwfub3hb3tgyi7wkdjn472zznvgf7kgrmsfgghe8790vkop37s7oywansha6o4l6scxxafcdhgu807xcdj2wrfe0ydvqkjt22chttcno4ykyel3k5z6tw35x9qp38o0cawvqsvsc9qa0osis6i0v1x9sv81xjn1izghnojwwvznydc49ghqb71i995f0u0k1de7x02cerd609o9o0kjx5w0yhkn9lbogwwpgvpm9rs9bgxmg9xl02t4s6jyp177yr6n682ohbxbi8ze7lttlaneo28ur7ibvjigbe3mn153ljwivok2rinolgteaxapjmyi7half1s6yxgygc884vyt1ur3r0919rfn16cmfnuuxe5rwqgae48uxha5884dyeokif00cnanbcc21d85attvcn3bo5mjiqwst8bp43q0tlafl3xiycl8mjkq5cpuhhnygzvblznd1iz14j1kmnewnoh0zbr152z59l13wvb66k4otd4zijiw2imma9z8bhe2ta2gpta600z2fysb6xkn7ux4mb2h3mmzw5wznu3itz8ddy7io2xy5oue0nooa8zw5e11gcuxb2ehqwmtlphfnf912b3objfr2ncs51uybpkqxrpfogmw93jp3sz7j7u344gkgzni98dad8sa0p22187rk8yjjfxxo0fjkcnfkjc69wqzsnlqyp59nzawwj0vu3rf6ezg5gmv4j5tnanb30p4rwmjizj6gms44ahdlqli37nmfxn004rzse4nmfvwkw4yq3x7343q1vdkvc7ynugxshvl3dph6pakgm2xnenju12s20x9whaxvcsisjlebfezyx2icple7exd78uxrf8ru5jdc9ixmmajtqapg33lictabyshk5kry2fdb48xaadxhjjsl2bi9',
                fileSchema: 'im142ppcxvdzjd09x5802nsk2eyc3hm2e1qq8utl6koqv7yx3hz94oomiq9e345jlhtz6ev9zy3t1jcvpnvsjqjmnssa4pbz7plf5lhy82olpf1vb65vxj1icxu3jz2dzirfzo3sfy9afqwdyo0sv2uia6s47ojupksl6dhfu2uz7he92rb2wigx3cn0ae92hpzsq96al0dtrgrumn0a3xshhryig5308e6drb2v402x39x9wxvj5er2kvzufp4g2vs2ur24ik5x4ssbdlwrnqk3l0k6q7022iclanzfi2r5g628h9klzwowehfj9xlsmssq89y5tykwypw5ajz32pbpimf85pnjdb2g9a7egwvxuj0fv8zkvxr7yk89ieimk5u31x0z0y6krc4tpdbb26v773csb6sv3h7c8eso1swjn6j372j37d49xusab96mxxeu12il0p3hqmetz0rb1y606e0gx5frz928xcq035styk3hrfmzon7t6yy53r67bft1w136myc4vi6rzpozh0tu8e6ko9b2yrwdf2prfnklw6kae8ai41poxwkh1u9cf60px0uspfz9xq9czpx0l2xbf6hm5k6a28n8frwiwaezlt35dm4npfltvadw5nmub0ursudmpp6nicfrp51z10r4u7wpu395dsl4lbylnabupdqn6ymvhia7zwqu7xx7eovk61w2q06q0k55o4ly9vai90wx0emchafb0ryxheypf2j9fg705env66ep98olbvb3wm7g8kh3h8vbvjovlqc67hbyh3cnjjqi16sb9fmgd0v5zq5x75v02i9zflvpibkjy9vucszzjpkivugwhevybcupo3mg99i0x2d2oalw4eez6vbh0np5kc2zo0d2gpzyc10hhoxqwkfee2vbkie69ltxuxjve9ig8lz0c43cx5azdfn62n7rxy2hby6jqe0jvc5nzeadwmstt9ssgiq9qrn67uelr6kll8s7000aktslrda3kxx29ts30kqh',
                proxyHost: 'bx8zrnaqw9xpfv3pcqm007eqlv5myd67vdyw4xsbeiucyjeldsaj7a0wiplc',
                proxyPort: 5747976530,
                destination: '00aawulw61txeh6vxjiewe00wmodv0zrgbon8lkdln2i4jucz32fhtrqxgmdbk0u1y8ghttwr8r0t5e245l8s87uwjpi0rxyznku90fywfige1jph8tanivwkllofkxzbefyie3unogyedl3widgwiexg0cxbtog',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '56tnji1pf7o94iriam18yiv2sn45rrlatnubfmbvjo5bd0tot32axmd1d9pheo5evxz2fuj95iq9pae4gtl5c7hh7x343d7jgkovr6ki0q52sg4ofjkb46lgh2odlt5lfzdg5hgep2r9p4rnrl8impmnhudnjvdj',
                responsibleUserAccountName: 'o825ftd7r14xw8zm4kk3',
                lastChangeUserAccount: 'douz077ljryl2z1dz8y9',
                lastChangedAt: '2020-08-30 18:09:14',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '660772cd-dcee-429b-92af-5ff08474e25c'));
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/a6dfcfb2-f40c-4808-8273-edb2a088d8a9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/channel/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/channel/660772cd-dcee-429b-92af-5ff08474e25c')
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
                        id: 'e0f1af2e-d620-4f60-9dfc-d705dacaf3fd',
                        hash: 'eyvrsel14fylbzrspghsygw5vhjwl8qgb2j5ljld',
                        tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                        tenantCode: 'qa73cx9e4xsihji1izp7kuls9kyj11pfnbwyvfyz1kshlaa2gs',
                        systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                        systemName: '168qa8vmesm91233my43',
                        party: 'yauanktwywxgob3wlqdl8x01rb6joutse98l22gg5zj8nysq9ged1jxlmnut3vbw75zpgakkg7rqohf89bu6g7o66ej5hfjzv2yle1j7tr0lycuiyg8fbn15e1qjmudx3b8t62g37koygyhcvbzd8wfbzae5pb89',
                        component: '0c0dfpysf2en2pgskdv0v2fasn177zt3nwoxuxecs70koti7alpgtrw2iwqphpkkq757lf216b7xbq47y9609xyrm8bv2sv2390lodsym94tuuzfrarzn40o034ff9c5xwvvmg2xyrzu6d2dgc0zlm4ckgxvrru4',
                        name: 'n80b3axylu3g3tlt4lj1ad96sl1fjl79balzuqr8wuzuna42raezziijx515b1bibascst4b9f0gysvwpq5hzl632jnq1vk7kvw9qg9kcaikfqhiv45irwct34id305ui11v3ru8gxedy1qy038mfattc6ay7rr0',
                        flowHash: 'ws7sv3u1cqcsecdf7ea0c8ib5j7r8vix1heisr0m',
                        flowParty: 'jms6gahcen2uorxggwjspi0omthac4wmp2v2yxvq2kc0t9q0azpp9j729r3t5iav09fj85tqq3j1c4b6ll3y7ow9uf411erjfjlsp2q3g324xcvmvehsgrdi4miummhguhdhclxy2wtz49w0lh8njrj9ekbi3t48',
                        flowComponent: '4qbxpihrryzf1je9tsvo9nkcq7y04v0gllqntn1cvqlvnbr4htnwq659ik9fbttjh4yixd42w7zge86a8e6a2gachf8a5gjtxdnjys9z8nfb7pyc3w2539avdazcn81sb3nnrquusqrlhr290xrdzsbmmn4j2o7s',
                        flowInterfaceName: '5ai8yg3meunjgg1z8lxuuiyzp1hqwn4rj5hrndxmdgvn8mid0yeq5r5ve77uahrc6vdoj51rdix7uc0ddqqom5wmzwchz96rs9455r4rchir5027lh3uv0yrywsjhs4ak8reugc5ln7j20ol93sgaexlb38bmxv5',
                        flowInterfaceNamespace: 'fo7djg1paxirm882xd14sy0o62hm7krg4w4d8k357iul1d7hg32jr23nks4atf4vo7kdiiovn35xsme0rxt58e6d02ent0ds4tl8kavl64ihebgmpmtduonwl1e4rp83wz980s63gjx3lanf3y3w8pq4vyvijhwm',
                        version: 'i9ynyak8rlyvmvl80uvq',
                        adapterType: 'zq1xzsjm8134pgsel61ngk5pimnu4h6snnaii7c150lsyu11ezogbqh42pce',
                        direction: 'SENDER',
                        transportProtocol: 'wdxafdz0hywgz0i9ok7bkf52ztqx3q9i6r41mxlg9yq3ctvlkbc8hzj9fs2s',
                        messageProtocol: 'by50wdaqbi9ombkif3w8lc7p0vn569v5zqkcxv8ppp08qvg30vr84dayq3p9',
                        adapterEngineName: 'wqrh2lwxvwjtbm5j19pebijf82kee5zu92gppcugdtftnzcopz7pesvx0a63jlu30te6rnwr6y96r5t6wo43t2uh9ikqq32jjrmc84d30ico93b8j4j2l7lraiyqt7cjw6nxu1oqukc1j1usov82xe4b9ha5g9cr',
                        url: 'poh2pyfn2tbcb5tq8cfszgssdzy71q25944gac7zb5fnml8h9vtltqidhbvshuqn4tvt06p7787y55v9rhxkem8wddq048os9lfjlo39dhweopif0xs2vi0grnilz4vq8isk7rxfkj1rco4ze9z3z3u5963tr9di6l8qorh9ukhp9wic1gb4dufn6gafehutaztfqb5nxl5mpzta7mnhi2drnxc6q9wvy238k6zudz5x787y50dx3fsf8ymgzuck34tohq6b5tv9bq056z3kq04vdyvazkmpie5g26cffpoo9edjrlaymswoc5y7l5lb',
                        username: 'gwup9lyap5v8ramnfkfwpav18gwevvv12dlc1upq7zsq3jm547dpaiykyimb',
                        remoteHost: 'aiqufloa5b13lcwfl4z8uz1x7gpd9ykuiryimt7g4cjgs3yfrcjjlduc7p018vpscrco31jaey0qrvvxp9zbufpdny8wmu0i0jpw2u1bo0wzpn7yer0iihnrd11yc10mt1nphp6ugh6ckutbrnncubyt06774sah',
                        remotePort: 9671648420,
                        directory: 'alakdqst8ankg3ohaeofji6i7cak0atr8x6y1yopvw7er7z109jwss2edu7hz21ebiy6v65pir4tmpmdg4nnc6wagfln1wumh4een8mm1mynnvhxo37qxeqq6vhywmx6n3mt09c4j3a5dx5opdmo8ob3al9ew7mg6enrg92aypzbtld9ybnqn1ku5abv8yjwe0lxt04ov1e76xearah5holu2jtakfskpp9pqp8ph9zgfmzn7zfct3v73zoo5ki7kuee7w66tpv52548lqyh2pnt3usxfdq3kaxjrdeitjpsnpoecwglgcw41am981kv31nraym07dgmxwbnqa49tgc1p56e4202a02xkg8iwhileq20pmk1nldl3gkh5ecmjk6kd1us2mwk9ankdf0toycxjbuqvxq32xo38usk99fjzmz2qmpkf7w5nnr0ys36hkab2ksuw9mj054h46iqib0qg1qstc2htrpi9k6r69oolcied2w4re5zx4uo1opps1icc44whmr1euoagx6fdgrcamoct2mwr13ow0qyakqznn6yws73oljzyznoc95z5eh2dojl5678le4nc28bjqqlcpebde5bgtbxy1tihibbyici0jodv1cyo91ke1gjgsmgiwztdis7xebqg5t1in3vkgd8ar40lyklxf7yj1i28adyp0hhldh269fx4g3tf4doslxhs9ik7fs11izhhwtqzfrlgtqtgylefgzvqe9vj1t0bbgec216z5z6k4ky0ytusajvqr9dtcgt0p50jvlomc94zlw8r1bx3bvieo8smp70xjyl7ny1ibzs6dgbp6hrtdcn6qeq28opolwoej50nz1b3noki2q7oij461upguca4aoggywxjbm7llrcl6irzezuv1xsldco0zqavr1cwvls5nzebvrp8mo389fumm4uavddm9rqlfxbtu1l5fqsh3w64awanqw7q5x9ec14uiq40thjy4c7b6nwi7zbgk1lbq9zi7drjdf6q3z9',
                        fileSchema: 'hru7mv556nghomzpymer355ozxn8c8fjowkybg0igzgqmtkijxeovrozm5qracams9dgytgs7gmbkadv2glpzmaqg1i2hc0us47dlj326czhwzckdr2rcgo7zmtz10h84w3rafhi6zks8ia6r6fir28lwiyrl7w90za15zd4qg1nbi3v4peszich7ie2d9xzbtavwg4cj3y32yj541m0vv7ui7v1jk50jtkl7wz9j3ac0w8eh45ia9epnkqa6sl3q5fnt1uwm6kh6sdvk55u7e5g9s1flo8skrj107luni2xnvbtqkt0gbjmrvi3hzetx1kvv30e6lbyxa2svc7nnhcswg0doai838a1yhnn5sk2np0ve7ovny04lvg2ani5w4ok2s2uxlnm7k6t0fwdt6qm0hvmby5h8u60ddcgwf2rnmlowogdbblmaqm8bsrt99htsswppjzcete976m2ny9fv4uw0l9fiacqqlrhp3235uzqzmtgcl1yetxkf1mnayqlg4ve0m4epia09siyton9ifbc36far000mfyacj5ym730vu6zlnzwetqwsrmov6g6qh3nmhd1t7wkrquvijsd4ss2s7qybea175oiv72nq7mtwbhmfi395nbq5g3afzm9h72ufdu79r6a3qnqcbf8b4suqnpz8b64vqwyigkrh22sr1r147nd8ao52ksqjk4gnpw7bf580wd98dge4wqdnef4louulj4kh0os3w0h5ygujopk5bq03pw8vdkdi6k5omqfs8cqfoa2f1c01h0poa3ucnb57pivubezz768wo7ygale8d4djgw5l6nxriu1xo2m21czonqry2n0thvfhf3lrm9fajhs44vnz5mhs4z8n62uoz65388cyk4hxphvd66od6mz13newsnhmhysk0dcr18w9kwnz83dtcvvceo8ywkvd605pbx3uy1d53zkmyz0dlkvcl98fhbiu418hyc7ukxitg43n1trucoegs5ibo6isyblxma6svxs',
                        proxyHost: 'iqng25vdb4u22s081mqcm7zznxy3llo0ujgbakz3eipitxe8wbtszf4mf1pl',
                        proxyPort: 4179840519,
                        destination: 'lwy9a5yqw6zd4gvp4h56hkalo0tobvj0y5xh6tt2te4galwquqnf5xcg6zunkraxv0mdmrgl78mggxwey3xb3etuktht8nw8o267rw6orpez01cf4490pm81mqnwd7ig3kyfin2r29oyutpy889c9ruc2qjjdeep',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'k8uuupvllwtxo8t6dbqbbxanvrqc925ldmt1p1vrbhaty72m3p4b6o8zmmxqphjtu794t5w0lrjku3asbkytstrieq6v19nxtg3kgfegp1qs4o0757b8cdvt0z6s9x4898h7mdz3y4olx25rzx7nlzpw3bslztfr',
                        responsibleUserAccountName: 'c045ywhkh5x574ns9plz',
                        lastChangeUserAccount: 'cf1f5ner7r76t751etbn',
                        lastChangedAt: '2020-08-31 04:26:47',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'e0f1af2e-d620-4f60-9dfc-d705dacaf3fd');
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
                            value   : 'e8439ca1-87d2-45a8-9430-f423e1b19a45'
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
                            value   : '660772cd-dcee-429b-92af-5ff08474e25c'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('660772cd-dcee-429b-92af-5ff08474e25c');
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
                    id: 'f7869a1d-c8b9-4269-ad63-4f8d3446537d'
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
                    id: '660772cd-dcee-429b-92af-5ff08474e25c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('660772cd-dcee-429b-92af-5ff08474e25c');
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
                        
                        id: '5d9a8826-c2fd-4cc6-b4a7-f59ba5219609',
                        hash: 'dflslu22zvw6nzkwdla2j2uc751awj63lj6t36hz',
                        tenantId: 'ec33645c-41a5-48ce-b31a-8c021929f3f6',
                        tenantCode: '7gcm8ndbwmow0vp5s86smr5hpvqq3nxkgqewpmlp7an0vlxyct',
                        systemId: 'dbbbe59f-97ab-4b05-acd4-848d6094296e',
                        systemName: 'n2cmdw8hfbscn4wjbujx',
                        party: 'vcppldsh3xb5ughk0xq3tfnpoop8wytae1s010w72rl42ms9t44upgy40r2rhufu6dhqj7w2gsan7e4ye9n9v1el275b2sez6yfi5uda4k9pe687152lhaw953pchtbc1za2erbckj5g8g98iipq3r1gfvj8m3l4',
                        component: 'gfehqkrt0ched4py6xmlvxqx1cajuu3pabiagzcii5p6n243zmp9wxt49p7k9wsymfjj723qcuk5s4brs8d19g0x64p8ojab7c92vwu9shgz2pfuepf8jr0qoadb6pcqtjt2l77deoaflv74942744vslkbkh6qy',
                        name: 'lbm1gy2jawytdr92ppz6e14oi2p1ki6pj07g5dwu2omwh16nze9kxvlbb7ylk1108rlwfqbhxzl6z37f0l7i66rlej3nnx7khfj16g2q02v490tmudjxzcekzqea7p7ynutw681n624eq721sgg75u8q67h00ywv',
                        flowHash: 'duscarn99arx7dcxhjdq337o6is2wom4c75km16v',
                        flowParty: '6ljyecm7f5vcrd3ktn531knfiuiia2w5v5t9ziashtf0uirg83mtoyzqsp7wd4k74zg4zcgfczti4f3ejtw1swfuc8lxxi8eticfv1hezdpolbo8s9os3okfmuv4zao9lzmv9ayxb8iq9vuhmh7gqao2f1c0gnrp',
                        flowComponent: '1836q7dmif5ryahjwzzf3glxz489bd2gfecz2uojzqd2aduitowuwycew72fyk36blkynjq9anj8ah6esna0wwaifqneka3xlbf5zzeji3bftxqe4rnu23cic8dkllre3ou2iz2fe744jzu0flx95uf6kud14rfd',
                        flowInterfaceName: '6hq9q24nrkbr5bch4odhzu6h312k5fkdl6pwby7hfddw8x4ypujetv0a8qvh85uz0rfmahrf2thrj78vvtsp18m6sxqf1ztjm752sm9gmgx73re8adw8sncq0j49v2s4skmyamibglsk3hhuwk78hf5rt6juyn6s',
                        flowInterfaceNamespace: 'e494opq77twjxbez1yhyun81b8s3xxla6zb8gbrrlkbs1ieeakcwfwxmj3sg32m2mvz2v9glcool7cng9jizfut6n960g8x8iu9ym2n1bbkxqh4pm487w73tmbz6uap60yyr71v47hdaebiqy31mchjvqpcy3l2b',
                        version: 'bsqm9slnb1040nosimns',
                        adapterType: 'jjmafr6hhca8c22wcs6kc1l6glpmierwz8u6szutyxsts9ckc29lde9laqbc',
                        direction: 'SENDER',
                        transportProtocol: 'omjepc1te8jcgno6hqn2l7w8qxcshc7u1huwuffgqzummvwtbad5t0lrfzsg',
                        messageProtocol: 'oyfc8olgb1u6uw6yjpxrqmvt342df9t5extpl8aqgay6ue7rxs1m7y0zz73v',
                        adapterEngineName: 'frcsm7245lnukryoaq85mujt119engllrdllwtrw61184x7vbia51060e6rjnahy4roytib385btkk4bxxumfk44rb63ix6ya7nstcfpvd3llwdbj5uctwsabrmcfcmddi13ng4a9a9n11nbpfz1ojs6za4ea246',
                        url: 'ngcaphcipcor732tw369jlycvwxgaaqhxzc11fwn76j2trw8tj5uayfeqw4mhm03h6rju39tw867m7c11ml1z5gmhyxvyr18cmywqcl4wj7samhvsncposkgd7f5037x1un47xsyl0hxj3flmla76l2elymuyislxjzrtgpmxcs12r1fzgoqzo276j58l2i1rog22gc1zpexl0k6i0ssgaenu12c0zatzu81v0d1kjlj0hhvfiihy8ag9k9trntcxkth9rdmkjlm58m3cjyqskcnylw4ivry21y2d8l29csbkbbsdcpeycnuodp327jh',
                        username: 'ky6jy2farm288yudy1pkrnd2q3kh0f2ynvp463aec6cb16tgeac710zx6kye',
                        remoteHost: 'xix0tbpvkciet7n4puzm02lbi1044exsvgorjmkyx2nsuxt7rax6t2xybhqohkt4wpgy8pd2c9npxhhypknqtvr2fe0ilkcv1utgskl1m0rs537aqscykvl1w47mw5vbxfhaiq7zv9txzfsq7qtyrl0693cuh9sy',
                        remotePort: 4738246159,
                        directory: 'ya3b1rqzucffa09pr4ykkyt3w0ak8c6cq7djpg6ykt8n5dutko8zzt2o2mrv15r8ukkp0ke60db7mcet7hebnxw4sgjhvbt5cbvkwd05q5vs5qbbvb4wzckbw31innk0wa05rhd4j9gdzcl7nul94xfn9oe4wvy638cu4keb86bacn9q4oeu11f4unpkco88j88ghqjlbdb6imn5cuse2rqjcu2ly0buwigkgyg38blj3qffrjpojtq1erqbdezkxut44l9tou24v48vx2h9cazltxc58s7plbio50hgzyeni25ck9ak7rsn1i1opnkyzct2vmlvn51i8md330sg3o4u0tbew9jejeulj931j7qtpyalwlt2nsa92vif3ij0388id83gs535q2wi6d62fgro2e642xabrn6l8uxbbth7ge2agk45gxxwiqir7vyjjzi4vi9qyabe0r3b96pqdacaq8y9ijso1d1552aw4nts1xshybs28kch5n16men2ln5xb6isxno2xvi8a0fcpyyooot8w001cshmwlwujjbiobwldzmhoitqhj26eusclo0b87sxog33d770bo415av7rd0jq276yz5mntd2usl61kpue2ep6kbbjkw4ebe0xgb5j1obmck3uixdoomv4wc88qdfxau1tz3dlts3u0dmt5m2csm4f6z3r86o2i7arvl4o1hw8bjy9i59sp2xq9qzpzlt4rubfm5h35m8nnlovzdh9sa273m9x9t80g7seienv7temmzhx8ufhaxowctm40l66p0e1a9hopdbux1u00eag7c2o56xnablaglw9sszgs433juk8xpg7e17s7x7zd3ulucfa8rhjn0aghz2o71h9qusve7n8jxp80d3meukszh8o9goj555qyo9mtqj081vg0g2bd14hr83ul98nm4z7yi84jc4r9svj7csy379ju3i7nvf6qb0hdvk97s4asqq043bg84swbcszpdgnvzdzw956l3v32aubbs8',
                        fileSchema: '873alvhvdpgom8vrni35kc926kjuwk40fgag393ednc6zucu3gpruylzf5rdoy0j6da2h31khcp3pm9wms2bip2m1bgsz7kgfdvou9jy3gg9xdyni6pv83eo0aa5a2zpmzmr6tc74wxj47loyvv4aka267cm5y6gkp2cj5jpx44hwj8zrbl6gzruxe5teztjw11mw4nr2x25fght3yd3ysohyebmgu7p7x527763u9d4gehm103nu69nlj6ns3ad1h810rb4geojplg52675es25hrz9f2thl1fqjkpbq9r66g2as88xjxj3qnx4azj3udqnc6c00vcvnd0sw1gnaegr66cf1rlinifprtbxb21ipqedqgr12ylmjguljv4af6hri3twi7nfd20dx1u5s0w9gvce6ew4cg779ynt6feqa8rh7qz1aydubnawo9pnhftsatpmnqjy1izkam2v2var1wgf3umiutyix1dhq4myqzf320kvucbkyon7xb4gxp9yp9toislq8oiyl8m21bex2kg60h5r95pbjjqnfmk9htv45sw6hj45m74yrg5vprnnt7ua474cd3767vw3p56a89l99i6zjvy0w415lvyz12z2xrb50cn4qrs0fo0f1vlaoqcou6s7yvxwitv9tawqvz2zslgohztuzc2l48p9dhvfc0btw8xik4yy3aocj1xnxfte3ogmc85pg6sv4rajcqiu3lo089vkuvtcx11e1qlbz4b927k7wfnhnltolylck9qwkjmvieivnjmuk5upjb3kbd9qo8jhrwnq382f4wt91dgzrx1giyxknw5fmq5yosa3ra67e91e4g1btdnv13vc1ydkozqffikd4kwtjbgz3kvfjpoxol9dyigv0mtyg864a7hv6aibgfm1yljumzllr4nydb0equlw5cwst98pqaffmo26gyz7prsnmayygg0xlc48gy2v94k5zju8flu7tzdgautqhx0mel4aodjmivvvraxo1wwfpt59',
                        proxyHost: '8o2fvra06e3phd4yppw7vvvj5v5ycsjztbsyabnyd6l7zc2w142u74x34cdx',
                        proxyPort: 8632936426,
                        destination: 'goik5dx0icshnd1ce1inuqs5tpm7dpdc2p42ax0tv9o9ms1gdm4byn3jnm1s11f5tfgtq600iozaop3isstxgvrmpf9dmtd689kcl9ob9r61wnfa6mtwqviwsz3uae9yksj1a6p618gl4j9m079vl9ria6zvd7a3',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: '6x9vcs4tu21dm09oq5wdnsb819ux2kdfmlp8b9xl9hixlo8k72dcfnn5n8s42hrrl70hfp0m6t319q2dxe00x8g1s4oaehijykpaa0k9go1c5furt7smj3w6ev11tpupb21ohuyjyl3m9zuwtyj9h1yj1bflhkdr',
                        responsibleUserAccountName: 'yplfkvrtcwvdeh1yqc2s',
                        lastChangeUserAccount: '9jz40pf2x11ixd2n67vf',
                        lastChangedAt: '2020-08-31 07:45:42',
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
                        
                        id: '660772cd-dcee-429b-92af-5ff08474e25c',
                        hash: 's30ypaeiejjq6uondahgedbvmj5zvxeckog5ze2x',
                        tenantId: '6ea71f6b-0947-4dc9-a586-42bd86710713',
                        tenantCode: 'fo7r7nq6jgi7xcws2tt3wxlrrmlx99qp4qp1l73t1pl4jmb4g6',
                        systemId: '28aea7bb-5ffc-43b1-97b5-83e8fbc44c7b',
                        systemName: 'md7z4nn9oiz34pbaj17d',
                        party: '6psk9yto9edkjblgsupfj3l5t1iloypgffd97yfjn6ecpdoxvuoiqhcf4b8n5drmji76t5bjq1vu1akek71t7lem7ufqlbhvs7re8413cq991gg8el6igl1rfngqjw8u9mdrxk22rhx68bv3kuiezvynom773yry',
                        component: 'rv4t090rn0x1ekwhwm7cpod3ge024rxm1y45btwp41dd5m75dd0jk9p5641ml2vy1n17vnq6lnahe4mqjo2kmz3inff9462ya89ypatp97mq4h5v81iw6p8l3zhgbh2h674bfow904sm1uqp7u83pc8be40l2gwt',
                        name: 'ytegrmg99wc82dbi837b3plh6c9kty4g87pvwy4v5nwr81pjao02wuovcwqxrud6k8qzdz6428oxggmognrhk6pg3jy58598pyntr67842jycw0wxf5rua110gr70p0l08f0ay4mgihl1db6x74necfa1fsn2r4t',
                        flowHash: '3gae3ccg2kt0s9209ereqezvh0sp1714sgk9o0ek',
                        flowParty: 'qeoyelpce8rbdwm4ncd7w20gosrkn8i5tfhkezmbhl7y3ssz66cr007m2cdwfkfmf4ezf4jlbdbd2jetmylzt1rhhn4qbvkp4hycbtrf53at2113knxoqavggqse01glef09e6rjjpxqdx6hjlu8x92wx914988g',
                        flowComponent: 'xpk0q85b6ozhi2zof1kdfhxid72s7kpfd88f8fbodx8goyt7zlzu8hcu2hy7xe8gs6kd3s12lnqt0al490ljq5nqu9eq8vzy5mfw6lkazzmya8dxeqf31psx4tsx2491unbrmbk95gmu8hii1mr6qowtcjatxwn5',
                        flowInterfaceName: '4arigq4hcahntds8xa57so0ddg83pk57f7lakh2fey5wq0e35ejyp2vormcvv0zyi4r97uycxiv3963wi5vc797u6773apm8r3libn5z0v5sipibdvsw3bjd8drmtl2ov5eok8mbb1423be2w2e7pezze45rxmgz',
                        flowInterfaceNamespace: 'wzgi413aj61x4svorarah35cuyzn86kfqdem52jxehu9pxhwsfd4ddcea0x9iexwh8fon25auelu44gyycnb7c9clmlvqhxl54yd7wv3klae0tb2rojrro11te9x6p91zajqxd9kct7g1avai7y49mhomis3lqjs',
                        version: 'vj0qfcnpfuutwmk2rgev',
                        adapterType: 'pane7u4t9oon75dhd3hijlida4m64iiyua1nfdfocgfk5u2mj8cfic4lbyig',
                        direction: 'SENDER',
                        transportProtocol: '6m8ejamc8oe2rupm6hjc9x7opkwhdz9z77ixaix5zn0ubhv75jj0rtbagtu9',
                        messageProtocol: 'n1dtjj9y3vymck1s6ksljh4q14x4dc3apcm1x4vs7q5z8oziu3d11uoamj35',
                        adapterEngineName: 'kdti7h8vhf68ea10n4onzoasveppa74aztu1k12fybusapcsz4gf7bz9s15ei5jjyoy69cxt6vypdm1syeub5ixc376wh8o1vrr85bs6b5knhcv0dhwmaty3wg7xqvqmljnuq8r2066erkpg2qzlkwcvnknrzg94',
                        url: 'sy37x6ptyalq3eekne1kq8nnt8wgekq4s115udtqvo1teicijrmw7p42zerxvwf1fjzlcvnmq569okclvbeb1jqquc49s4n7e2wzeynuv7ggdfgkv2kgd9ctqawze82ycypqtf4zvyi082dnetdbl1fohb6h9cag8ds97497ujhadggm6vkl7eb29d7bmum93unb89z6jcmqwtlgw5yrvf04ucnkp8eejf1czmebfbt2iyyvmsu94fw3v3ixn3zu8eifg5mfllgu9pn6tdut5eem0l7pxp7ie12p278lc1voi82uy4ghiyog0dbmqecp',
                        username: 'va0004g1496jbsbq7h7wu6et13h311slhotl55mpaj3p6tke3vgjacyoqbzz',
                        remoteHost: 'b5gsm1dyzz51gyyjktxzyr7a6x1lesdla19y9f765mgta9jeutghts6m1tfa1eubee5rm5tzxbtz90ce8wb2x9u58w8cm55f464so200m3i6fvma125x7crho2szttbgu3qvfzfy2ek8zh2upukjfx1q0ripeni8',
                        remotePort: 9247069916,
                        directory: 'dkoerkqabgmzylot6qdwahfqfawjdhc4wuwy3pa463uznx81c23n1v4roc98zfz3vcubqiyefsly0jcfrodnnf0h8kevgjauai6mizq5npru8gq7pn4x8twxpmmqrl0wx935gdfxsurqyjv1tjvs94lgbvjg1tit621cv6jexrmswa8pst0c6wydm2dptp7ndvz5ozgp4e3joxbp2hr2aw6tft9mykoxo7ypo3a1ybxe6hw0mqgr35g7kurr2i55hyulmkdrbdin9i15sa7dwx62asmarqeiw36xx3yz37w5wseyq2h1evxou5q5tfwtp671uavqwvaquvfjlh5f7vtk3ltidynr3nav3z1xaupu356ub14hyf9mxkfhefupgu5xyfu7dg2hhinfpnvsxah00thqautia09so4cr1b447mk36k2tll5cc343e5slqm6lt3qwz94wyy7xd7fupe9lsoashh58fe2jwyar6fcribhsbk1tlq08l58cifldby5uqepkbbmroxmnv7x3y6hh670mmr3190iv2h93bkiws998wlh3c1ujyjptltipjhknjys66nqonayd4fxhsg07fh9eo5wny3mlpw7hmjcu4qyc9n1c6j28e111kk7kvfk43ivo3d2ayz2eg10ntq9vxs37nk2m1zbsjxvpc6jj4ayonnnp4e61hsxjuvlnf0re0ytt1ac6kiqenujs34x4fp3rj17krd8eoz1xpm5ez4bz87sr6u3lppv2et5pj3fiyi4qhgytwi4jf6bcobsimsw3ud1kwz8tjtwjgtfmhejgay7cse6uef4874islazhgk4uov1cwnw7xmyl9fj12xtn5tpqbmzc4ysrlj2s6omhfrhiyls2cm5t0e28syht9aroe9dzpuvwa4310g93uzlmshufqt33e0aqd81d89ayc1pgeat7y69bm8nwy5r12d1qq88o5vm1mk1xho5m1xrn6h44275bfdc2lrbyf5adahhbgh87koltw7gj',
                        fileSchema: 'ptfkm1t66zhm7d7m6khwik16i2kkz56wacy3zkr0exvnr7oukx6rnq4s1ww7r7fdhxjwp2z74v5442mizdubfe5i7vl1o1n6ck1epidsylnc9np200lp84kv89hnuu5ejpdbmvj0f8kzcv4cxtjdn2fei3kvbz7quixs45zz8xaukn7ux9qednmzb2e1mk5jfuranxx56etrj78z6lry8s4iquvxoob9jk5ub53b8mk8g0nj8j3p8h7mou5fttokggpxu5nlwjp9axcldbkxwzzf56npwojulxbkakaj388epymjg8bwx5ycs1178zhny5imnma154b02j595b08umfruptiygdpy5mh6sdvkgn2ye7wr7krfvyp6379bzyaytx8ij2qs1pubq6c0h9ncdwmmpgvmsqcetisx852au3sv8koudb4y56sm3vuz32g16r5pgwe3yj4tpalp2f35064f5l0g0381ut32tn1dcnbcl297ujbli65wjlenxpbhpo1qn88jnzxtmvrs2lk8vs1vqctjiotkd0p48x4m81bsitfxhh0qoabi5mgqbwsrupqffaxqi4ft9pw53izqxgunt2cc4pysbg96rq805glgec5q2geaz9033alywlktm3x4sob3ubyaoycbh527k3wmdsgxtnx5wxlnd4hwc2oxu6xbernhc77gomwajtm4qm194ktmlph0w4ieiuceddeb20td5jnvxh58g9ei8gjb565ttqbf6eulno51h8org1utmqkpfx47jv9lv1uzz2lnnr5bxfo3u1trmuho0r5ykwj7zece7qlj9445x79rygh6pkh8raukkzhovptvzhr4m8z7806qo4aqrfljnt6f7hg3ww54cfni5juu42469qzy53pzaem31bezdq9a75xv6ciu8cugxhpofurrxxsyfdpkua0k7lmc7s175l9raywk1u2hubk4b6w5ntj756gpkhep1ojbzv0wwqqthf274phg4cipw6pgeslmb51',
                        proxyHost: 'r5cmmejab8qf5fckfifb7j42ljas63liojkt8038jjc3kofzsn56w54a989s',
                        proxyPort: 1667785006,
                        destination: 'lf4grterjdu0jjc28o90gg0k9cyu6gjwlj20593da3j6drtulpu3iuz9q374nocpwedsm1agejbsq5372llgbaay59scxmbil94rt9ge5c5nr9kgdmzaai5x473im686b1zdzxr0vfymcotj0d16halz1f1fctjs',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'qdqdt0afke0kni3ioqmpp01v3rioyyoxqy1dgbphx4vnwmu2tm6a438z8bhirf0bh04srs255r9xelw3qgoobqtrtbt5dzmnw1r07e3v5x7m1u7ri7cl77sd6op7o2ybd0ctw76hdchceq9vxu9x5k45ybai9wsg',
                        responsibleUserAccountName: '7im6o888tngctutcxa3t',
                        lastChangeUserAccount: 'ch74ujpl10t08nir9scn',
                        lastChangedAt: '2020-08-31 10:47:25',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('660772cd-dcee-429b-92af-5ff08474e25c');
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
                    id: 'c4b182e9-ffd6-443a-957c-1a21e3f641a9'
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
                    id: '660772cd-dcee-429b-92af-5ff08474e25c'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('660772cd-dcee-429b-92af-5ff08474e25c');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});