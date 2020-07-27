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
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'iizyum81o55jb8v27s4mvws5thy82ru6ofgit48r8lm9tfwf13',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'rq6psz8q2u0oqr3a9sex',
                party: 'avpiv3dchrbafi2sjicd0263oiaa7l06tlegpunithfoc8op18abhvcsmjg1ukx47ikxac3ab8nzoagry72m3r2v07phvzqi6w0efoi2tyq5kplue4zzdhxtoqme4neagoowoh0w2tyfcgy2fs82u3uy1haeuvir',
                component: 'xs561ec25ehv8d4q5lb039zkml1sqymcjaqlqurmz6ym6symc68k1np4dnms9d8k6a1sgbzhit9jf5iiuqm74th1rqj39gnhm6n4414v4w3gfsr5u3qroz8ghyenkf0seg96z3qazll5ldypgpps72qrkf0kvrl4',
                name: '50pivwxae9clg878qd73jimfwebk5ow3nkw2jhvrahc1ij4a4tawht68u27fk9v0gtvwgewh41qgydeb3n73azs7s1yydd776834ikgo1li90toehgwuzapmw8vg6g1ygyge8zpeozb0gnumyikjj8jg7rm2fsvh',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'blz7dnpnz9clofpo95osruenn06o5remrk666xa4ijwtevrt2ixo5a6torstffzz02bj5xv4feu287b7poejt8id2yffyspugju9b3kwwg0wo94un5duc614ncylp9kgnf4qcvjipvyc9ol8yu31a185mnbwdehm',
                flowComponent: 'athg0whibd9ze0gkuxvfobicgbustbih8ilx253lv6i0c2oclw3r0if2nw2xbn0n2teqbmz6von94zr3iujlw4g4asmwd947ddpbkllti0b9l26l9ybi4whaaxmtru8dw29ik7mh325r7mm91ejmhayqlefyzgi2',
                flowInterfaceName: 'oyr2reupj7nwbcgd572df43n5qewpn17uqg5cmwpo4vehkbsgnd0c96smjqst7ex5h6hxzcp7ac4agn75t4pphe9ehyrcq90n9oxiy09xo3q968oyf2yt0vvdl9x3owfzj3ag5fm78ywaya57kh0hx7wskcizde9',
                flowInterfaceNamespace: 'wvcu2r37mmm2ce20cnl7d6iwz55dkys5z71s20sct2e1fpbvv7odxme7vcfcry21j3szhugysunftgxeiwnetzind64wod127ia6sfl2y3pp9lgf087el7ow2kx2xgesqxed0j4581w7r4uvi78bov634w4e0lfd',
                version: 'shhpt16kw2crp5691700',
                adapterType: 'kybozpeez2p2jmucq6e0yhfwxjkvhs4gre123erty1m09sei6zqzby8j85xt',
                direction: 'RECEIVER',
                transportProtocol: '0892pkv1lx9e9ydrsny4ymu9holaa9onvfy18tbi444umeoicb8ss86l3nqz',
                messageProtocol: 'ozny8p0i77uvwedxzccd4vrnuk7x567ieuqf6ke5thcxv9sgr96p02iarsnd',
                adapterEngineName: 'ejfou4aowjkxfm9ulf624obb4myb1enlgrs8jz9iz3mldjwgre5r3xquog7gcitvwkhazd6ug1ly5h5y91twzbvb8ztxx0dpiw5ccz61bkwo9oxx4gnay93fm8duydu608gd3dke528nc9ew00nwi2a8p7ftm1a5',
                url: 'tbc6906vr9s028kvuaa0kfjpfeplomi9tea9kzzo7pgxqe4gysopqpaqehmppjjxnzrxbuad9rws3eaiqarpyju4e1qluybi5p9yd0k013998zidke9vg05myr6p8e7jvyfekjwnkeax75sd4od8uugkewh8b5t4f8uhu6zy074r7rqtvbcmisz5n2z6g020ovuk9ux2vxy00tf9c3rz8tg8loknomddwvnvig09z2qjld5f3x06ppb5xvy5nnipr0bvwpz5b0aekqxkbtep7pne5w8tidnixunygo1jeesettqsh2bircccw1g11wrj',
                username: 'zt2hz4ifdohla8f3dz3co7ce4kb5od0tictg6r6ueumluxir132ewrnu42l0',
                remoteHost: 'pm5yi08o3020c7aiz1wx695day7dijywou4nkc3i3nq85ifoycytjjk7tzm9s4ftsh1nwvj7zvfmyx0bgop3fr6kn4nbrgd5zlwja27s2phtmgl1irvrbu7su9dk9b8pvvzpfzky1kj7i3o09lr5gy0npegs9t0x',
                remotePort: 9085949567,
                directory: '4prgnlog61jhtseapigrt8se2b2uhhkk0500p1co1m3gm3b6eqbwdb6dpjdd6hp4wxcvcy4k6iqlukjsnuck85u35w0nbyw6evpwpz4j2th1qeoh03akevdjw3qedtlft4hwbuey65nd2dn6gp0ilgyjryxfgyoyg1a80a8loler6kfk28kygegg26rzo0qzdu7nq4yrmebfppsb6tw83xasd9gd5kafdt1p3o1kif8l32zg8sbm8so8dpkpkyzvfsbqpcv588c3dfvg1lc4l621ot2v9hyafx18f3xoa8hzqngy84mzfqnah3knodx0cggk3giau4grm8zsq83sz6w6proeewd6y8n6q2xxy9t6mss7mksdnijtss7attihv4xnn2vpy9jdkf79n58o0p2fcjxcenpxrq1m0uxne198f3eg8s1ad3e0t2vpjhqreue3h6rxij5noevao0swr5cixnbnra5r96vznya1rkfu1lmj6pzvffkj99jyuq61v96cloyjqimiudu68y1n6bgvc23kx5bu8xgljhctyqa74zklkdpd6bql9ot6m78oioftfludagc86kadl7czvimctqea4743el8yzwq4r27hwmcy6d1793q6h56st4aguwttqlpco8yzrdlrzlc8woelx6gix1fmsss0sfdntw509ehhwywb1hpfg1g0047zqtiyggsfu8ytkgnlkvu9qu2d3mapk1diqcmdyyvz2ha70n3o3m99qwqer8x1r8blg6dv4h36sxw5235h8kbjran489ugox45cafnciu0ioxl3c2nuhkywnrczzo0xaqgi9s6gh9qbj4wts1ux3aw892cdekdp3hph4lmhvif8efp7bnngtmscbyxhvc4nlvlk4t1n9dsrgzfphcdfflx79nay7ner91e8qxce398v1va4h1d6jpa3sdiy76ln3av8eh86wmvyrv4h1nlddw01h84ovy6hexmusv54pbtk178bw5mo95mcfz260i1pnoe',
                fileSchema: 'yc8z1gev1d96si7sii7h4x12l8taddh1eloh1m363q4623nf0wq8fxa2vgdzz00r0z295ox6ikpgogpzpi3zhebgrrnju77gk5rjos1v4wtnkkexkeo7nlzedkd23g49l1fzp2o0h3youbtdlv0yvcd087773swnsrumxelx5f0rp13r6obdvj1jgj6h8xctk9yh1akpjgvcsunc3e2kj3t6c0ui5v8lmyh4jkbbc3npsrs5dww793pnzlpa63nvqy7887we5k48ctdw5g64yr0xmkzy3lekhtw0csup8st7n5tkf9wbmrj2l3f8z8mazpgbdfr1yny84mkrpn3kgckdyo12o570pyb7icdgtxmp5w36xv74mtqlzsgi4tswhxm41u1un9jdrkzrxd9ch8v73w7crj5f5yyt7r6l6h6y51dy3kmn3c1ogfh5xifxl3tpqt0i5yx38slsqiq55vatdxnlacoup6xwvljr7qjzsg77vhy8qz5zt5845qo7gdi8j8ts9n7sfa2btd13lmk31zatxkne59qmm63b79op0o93os45v3sj5m97pbyzovp9rcxgmws1ayehss82kdlpiux21ntnfxr4xy5ueaqettp12ctnp1dmcbs3xheveyqp2lv5fzvt3zwx3dyp1q2o4pgy0uqyqdk4f70wq56qd99qtu1cinjyy71uds4s9jx2eo7bcloigia3ayjm3yfgqtwep0fj4kimm8o8safmkv3j9m04n4ykrtrcmauirk0idvztcj24knt34mi3u8bcvp90uaq5a2ergplwi3645bh0wopwplkyey6afear8ciuhd42va6z0dndegyuutw2a53vusp2dk1hd4806t1s894eww6wmpfc0ocgd13tkojcfby7lqlxsgxp24y2793nak8txsqqaxlkb5nt89ynoujj5lel5unk4yb661rkejfzs5g0fttm84ixubxgpqpcwst2z9bm6fiivni1ce3lihjwtpnc8tqz551l043u',
                proxyHost: 'nux4j1mfpnotxdlvi3wdexfqnpbmbnrqdfhsp8tybnowfxpbmy233v9grbax',
                proxyPort: 4929762104,
                destination: '7v1va6ogfc2ajerz91amcfg7ka10j2uga5j04gjxsqljpjp5752xfid1i9aiwuc8v25wttnrls7rtbu5nzibxwhs1rzitcfupu73640a3dmskwibdqzu5kh6mdxh0by2r0y2nhdicbyppjer3b0hwp0pde0r9ama',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'mzwrpyrh55vl4si7p8qm6nq0c000cuyqq8jjifhmf3nwxvaesrl13z97jg0kltfsyi0fl3sw2cn0mqvq5nxjjnjingzsoe18omi7i5ttyvu5iav1ujhocvqp4zmh3mzy1uzh39862rpardlwo9edahiv40xmxqlc',
                responsibleUserAccountName: '1l0xye7eq7e5meb1pb1n',
                lastChangeUserAccount: '30egoqbc1g4juwgw55i6',
                lastChangedAt: '2020-07-26 21:23:42',
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
                
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '9g5xl40i3x7grl8yydoqy2p7i8l82jgv5mfrnrocjtddpmgg7v',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'g7gzuwckrp0h8rgqljrw',
                party: 'e7kyhbyu8zdvaqfg8s3jacn92qjccvl7wipdn99xs0eist8r1t8bi7oiw54kz6wgon0rtsevjzosqa91o9g1ia5rykl6ai84s9pkcpfio7kb5vor7uupif70e44mw5d61xlg8r2tgw2uze7gx3wmkf5ykvmcrlld',
                component: 'pmxonfb0r53bpu1gfwkqa219miwgulyi3bwox7470hh6oazoc3tiod7xn662a48fd82zmp58oqe4pu9dmheagvn75h7mc7meq77nkhvff527dil4aoqeb742kbphtf07l0r6iz4umu0tgaww806kvd7sn0xpi0ht',
                name: 'ijzblipctwnzu60s09dyuw0q3xtvszzm89tuh8dhcl02cqvbslutddevwhky95yrjmczxg5fa6u2s79kzjn0kwgwneclcotgeu6c67fqrnv6ij4587kp0qf0a1wwqr8c3w9fk2wvgj22rqnw21qp529664j1i5k9',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'u6tevca7vgowe9spxuz9dihbv5cnrjsrhf7139thq2q3jee0u20a6udse5wdr9zp962lq0sf3vc40ph8c2mfvtwj5c0t2db54bldt9imuah41oxduunv6m32u56da2yf4i4f68q2eghkad3mdqepe69c2hnrk8st',
                flowComponent: '5ea4i110ghhrocm5wiwu2j7sbb45yovvr0nippoiggyucygzsi7kpdixcze567k3dfk27tpjotscpbb1i6ofezpkoebdhs05i83o8tk5qkwt8y3dbursxkpmyhk31pdvan6wf716qrh88n1x6elkzlq7j2ba9xb2',
                flowInterfaceName: 'ehqol7ft5zyov8nh9jde7i796jyfk04v8vvrg5rn4ra4so6i048zqm2fis5k2omiljirjcwe00h77nyigp457yp14ih2wdx3m7930njy6lk92zz6zoqjaxvpmnx7kkf5awbfel39ef0teb1uwgiyf4p7dcazovgt',
                flowInterfaceNamespace: '60rky74mriwl55ba0iysdcqgk64qhe3sofbodr5qad4el3kuj20n0rp4u3i8cp1jqh8gk4ib4nadg7cl1tu6jevo1misifl5rwn3qujlj0koipidy0yfpsmsngfk2x21gr40oid6z1fv8fwa0vrlxwr5romruqb2',
                version: 'nhrr2des5s23rorbjst4',
                adapterType: '3scobkgoamg6qolrr4atbz9hvi4tmj4zbl98tyueucx80ebomvcqkhd11n4o',
                direction: 'SENDER',
                transportProtocol: 'fxys01co453gagjq3qflz7isvj8ij3is5s9tr3nbuylr5zzau03854ry5xiz',
                messageProtocol: 'qerknixn83ymqk1hv9xhimsugjmwkd9tknlqioivcriyrcf15d4oaq27pot0',
                adapterEngineName: 'om0n1e0ukmi383ilhu7uifaxiysnwx5awna1m8lcsn4nxig42jd9h92t4wmjoz39fi3nqe3dpbc6yi9fuca6r2d5pigfatq4z1o6s3wpld168s2yrqwgd0cznmdnwa9tajcd8rv40bjp1smls6v20o5l6dwcborc',
                url: 'ag6en618fuhd4rv51zgl6f8u455iqt1nsc0ec5godpc7mxeca9bmsnvnzed3a9vhlqxi80e0qntk3s0dy830a8lgn9xkffk1sadgsct641wp93wqbyb4os1hfg4pu7087sii8xrap4y239ra92rih1s2mq8ostsxakdetxvobdt74ksghfojymq6ortylvbi5zo89op5nghjmpo3ne9r9vmi8i4ugxnsjw27xtot6txcllzha69b3ziyol64dq6q8fe1tfco46nxnf0a1n0jilnb9do053qrvzuoace4tries2mbub4v5slk8znictip',
                username: '5o49v9xypn6s8udf32k2mcyx927yoyy3ergpenqocerykpmnll9wfffmleku',
                remoteHost: 'y2kjcictw1kttf4kfgwfzd5up21lfu0cmr3j321a957hfme1wdra8i29jaak2dcfh755xrznoev8fmcou5g3c7wc3bl4ckin0qct6vi9rwfojtlotgnlely7ostl4gahrk6eafohc5wo26ti4j7wp04fe8er5jym',
                remotePort: 7117918821,
                directory: 'hbq87s5l3seuw3ehou8zpubyhsg829e47i6pfhsajhs9pr6ibe6vsjrht5tr7mp3862d1ta937h1pxqho12jokr6zxjqgxwm4pf1wv60yjrbimzgeks81j9y57u00akdhbv4iz4wpolrobwy61huwnw2108isafbyfopj0yyrev38hwckfxrkfbuah87sttg26c4arjkvpd1y2q3fww5ra1qm7dqof9q717w96ocj5k7frcb1qvm30qf9htuui91dcygz9b1g0rqguqobif9e7cmspsbst3b5d3qkn07v4orxy2784pyooij99mjiglaaxxxuwjocvc61z3xl8k4lrqjxwf9jvst8q7iu1b6j7tbxnr7ezbbtfvmynz2yf1envapxyzod10zg09i6krruik64x418w344fyzxzhfpm253htllqslu9t9aq34bwizzyls34ovk2y9ijow6b44j42qw1k6piqmzesz20vk3vfblavv5xx8ife1awgkbw9aj2twgv7uaso0ilmac9btznez37soq4z1u9y1kz79o7f4veao618btmj42bja4a1f5xwyh7zju1b9povtdghneayhruur32ggdwzqtcf1zterj09asv5ydl4phfk3rtdvuklasv6m436w6ea5d1vuf7qfy7jh2yutcrs9nnt7itvesvmjjo25psc7b0c7xoktssj8gzlh1pze890fncp6f9n2fe0ihmcoi2xd12r7bcrvnvs00opncz1084oeejg4bfo6ux3tjwtpttfudogb6zm7faruzhqiq3yvtua0dkaqboype6lq4xjufkkimgbjg2mpjn07e7w3kgopvqznsa84n04xkxwsnqy02wb9whp6ylntyu60ccem4zm6ncdw1aqxvy3t08axvmccy9dl0wh67rbmof7hd760ptxcq1vum399yur92zk3us37gxopfh5qzxu921wqtbladnag2ed9cxbk6p68z3syao4b7wohx6ul1lp71svxarwecb4o',
                fileSchema: 'cjh8otmcbmdjrv4uhw48llepemqdfb4syoik0vv2nvn6alb20krgxytbd4enxhlb3m4bhgsg3eja0ti9x27g1xc2z5gf4506wd7b1k95s8xtwbdszhrpgdf3ddwgl6ja1j4du0pkjbkm1y57era07bw7uifiju9fu32dlv9kjsak7wlg17czhs5d9wrikjbiyak7tejqsi5iammqcjlajxlcmomfjl4b979zaul93qhlbonsilxu62bsfxth4qdlsew1ztvhy02mwqlgvd6ow8tf8fqtfagrtmy6j0su6nrfrnhmtqv3f7bavss0wurcb231shmkiumkn9319nv4py96xgkgq8e2g7c7d3ww89smhk5k68wx76qqk3rzegbax8k9zwptngejeo3zhakeu82djessu2yk7qukdild9gy9nbrqbh661k9x75iktu0hkvrxy26aiav48nq5n4fy8hrnczkq3jz8htul4deoh6e30nseen29oypb0g2csx72hecibdq5upzdhrr5d4g8y8mchikn2d0vsqdtg6v8qyg3kh6a9mpntxtyektq6p76kt3ltbfs5csg62dgi9btao00bgicj9lyt5u2s6zb1e1pfsdrv9hjyq2lsfq1zp295hr9q210t62fcifaum4qmuv2uthgbf8dad1093w4uzodtfv19xtl1gey0ym1rztvps928fmm5azttqi4l83piscfh47q6vowax7ad3anwl8xr31z2k03g2ivhxssluktnj9t8md5dt5gm3ahdks1vqarnz03qe3jw12zd7ux6o64kx7qc5wp8gyebjaq10ouxi7183mtulig922cc6uwe9zbksap5padziofj52difk3gmi3zhro9bcurptc45hiqfsstr1oqzzi1bs8s14ll6669jele4k4kemp32tzo8kxzjt9ewzu9obpvbtceas62viau3ed2qzhrgszorpo3pak29joinu16cmz6r5kpoiazgsx3k9nulq5cqy0vcug',
                proxyHost: '0601ypbygmvsr8xy8s7wl9476wth76jkm8vyhd3iiqvqd2rzc8viyrbfo59g',
                proxyPort: 5897949938,
                destination: 'lrpkjch6qwbijqstaub4tk2h7cv7h97t5psyo2f06bfzbotmi65vjwhs7tmfq56w0pyljamlu5bxd191pfaubpn8kih0fdv1i7998iujcqmw7kh8yzild6409n36u6zgqeytcc3de5pmb1511j93gkn4qp8u63kx',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7mwr60djuajn3t29l88oc1j0og3x0h6xxdqvbkubig94u7lh0nau1z67ahtnvonj668od5ea4xykh5qaef5cseebho1e733h4nm44dvaug72e42kasoqnidvbtpqk67y5yso9s43g8q2yx1zs6gov64zglid6fbu',
                responsibleUserAccountName: '063yll2ogck7qt3iffvi',
                lastChangeUserAccount: 'r5126kxbiblpq6w56sry',
                lastChangedAt: '2020-07-27 11:51:51',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: null,
                tenantCode: 'oxh5d4bjja6nms296dznthm3umlkqkf97ytxhv9oiowsynonc6',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '5gng4s7wb7ftdw5rsfp0',
                party: 'zg8ljza278j4s07r62092265pfv72ijlwgy08eroxc8ovmti5q8xjqks0z6tjyvxqcv7b5fqo7e4849qqdd5vdevybbd872u0n77hh82ns8vmzepqfwtdj0omej4cud3y229f7ew77r5twrtsmsq3lux3ywqkgh5',
                component: 'a55vumk15q5bunxwx4yp8com2ku46gqwqglmpsrbpurjdm2sol97z8u7tk4vd7ddjvp61qkdbityklrd9ggps63k39rbpur7a5bahqbn47qsq5c9hqceotlug34p72y5fdd9l42u5am151xakmzt7vm1xbh0a2he',
                name: 'qaosxstx0zs57dpzckfsqhkb0hmg0tex0f7vl5je24n239ryi6sgfd75oxtqg27od4eoy3puw1waz8tawfs5doerwbbtvrred3wugqee8gudd91ogu1o5525sdm57wfvq7d15nreftra43ikaob2o9rme8a024gg',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'cxix22k42xdjvmq1hvjo3qe17sot1yg1tk22vhou0mfdwgtmmh2j4ubkx371irr1c67f2ye9z3rpczottw7fum2a3ociy3eqzj719vpylfhwo71kbrcx14swbpky9e39o93q68xjotlabzuwpbsg8t34qmrqnxl8',
                flowComponent: 'b8dk1selm6fa7fls18yhoe6yugw12wdgk29w07nfehsuotl7l15escg7pzj4cfrhu2630zhurmx9dwg0epsrwr7atlltoltsuv3dk1p1i7w8ytyt8b4nheg6jr4bza7zsqeampa1l28bgks30zij7aspx8zi0ft8',
                flowInterfaceName: 'slr5iewyif53rucxb0il2tzx1vpz2rck7t2os7oxurlqdr8nqdibb133zma4vzdjc3gcszj61hfhmh3xlnjm4ianhuhcl7rlhf8bgnzcithyxhqjgnnsmuxemopdfcvb7fk1rxl07bu44jwjqxpmcht9nqwjpjzq',
                flowInterfaceNamespace: 'kycerbslnwu92rxoo92jotketqb94fo8rkl0am4tjebhk0ott65kdcpq77m54vg5w7e39nzceg2dgr74cvz4jmli6on4xglyl6lyf81gwsj6f17vx19jsz8lse5ndd9jx9d5w4n405mzty5k1jievlljoqdsgikv',
                version: 'j86187qpoox4ivu191x5',
                adapterType: '4gigxhzygn2cthi40ixsqz5tvzfd53cpeky8ugeb5ifqgt2gxhsovganjpm8',
                direction: 'SENDER',
                transportProtocol: 'lseahei2wvl45zlnhsuks1vxa5zt1t5nqrnlwy1d06ua2qw88gcrphy5tyr8',
                messageProtocol: 'ceee7whpylq2tjot52xharys1d883i32y2cu1cvg9zbw0ncx98klzkz120lr',
                adapterEngineName: 'lnqqet3ol8huc5utozeev6c7y115ebhnek7sd4sf803i3rxixyaumdo4l2wg61mi81ypaariu7bl93e8rk6x17dovz6ng0i5bdcd5dntk21pk0hb0uwvm62pslpzz3dwre6b692ihva7bx2qtlrz95bukomytkfc',
                url: 'c8i64xc4j51jj9vv7tgnw0dp54lpxw0kum9rw0u619h73i6hew8paf1vt9en0znrkd6weraczcy7pgrubidr0u3t5xy7bhdh7ofk46sfojmzrgln5ft4jskfq6gls9mx2wa8f9euv9mau587xf62e02cyft2h56foyt1i448jmim77n9vmktlhbcdrf9m2e52ryed2e3fe00jd7u9ngacf2z6h52306jq842810pxe15w4n9zbenxa7xmk3zc1yt9x7cqkugh2z7nqx1rt6b1sq60j6t8y6c15qlvb8ublkhhk5f3rgq6gpb14u7ssfj',
                username: 'cmqcri70efjlbdck554jhevknktwqjadephzleaqwz3ergz8b49fi05eam3b',
                remoteHost: 'x1ua839vicydtalvn5vq5ybdti8wd6zxstriti1tehgi1719czc22asavexleb4wgue7vo54uony564cxx5nn6rxpg1twk3r2ta12w56v2ce6lon6jeck2udbaf51klauulj156q6c039534sehttd923nml460p',
                remotePort: 5844313361,
                directory: '1qu9jkhturxzqkmca44c9bfyanu2onoprz9mkyfn1hlwuc0cu5j4oubwb9kzmikbziyttlsejcu2vz0ufcavldv3hjwe908trhazdo2pzkcp9tuo3hizftciscn0ar38nwr83zo49yld98kx81pwtmkp1wu4vy9vvzg2ppk7h8jfnl4zr1dauf2ga927qkyyjvqdfdv9f6v2ecuxn1gv62ubu8l9yye2f10qpcruxmmn1tosyhdxqwc0bofbuiomybte3c65cewfr0sz0t6u3j83hf6pifsjaskty3kam1prlhzbrlqx05ulfgjv0sov6g7uhm3x6nt2bjphbs6fly99en3kvsuife1z88i0wz25xs59kxqcg5gcxa1khtitpzlbov81jx04qtepv4uroygjc9wpv0ecb8u1vko3hzr3j9r69go2dsv1tth4iokzwyt1tqhuyltxc0bsiod1is4ef9rm2p5h4ojerjevr7d80wdehps4m99rhdmuxtxoqz0gbr062xk37mcvku1c01gs273kbwabqkpdd0tzoas6547u2dwzil1q1z6ekrj9cwws89qz5pkktnsx4j963jn6l0x6t046cocx64252ypqqu7688d9xigh2x2waxcrqg026wve1i8d4bdf5zjfgceb0qyjusfbtkjzwyxqzix41k9wdyrvg6eza9lwa1mj0i2a2w7ugief46udveq597jf0ab7vnbk725yfpl8pud3tiy86z98ccn54g7wzg6dzaqddb5qtoloj6hj8z573z45xtru8srtkpc3x9dpwky5knlykdo0limneja3z61ufv2qen32f56i5766lmdl9lst4nsmuwfuot7own5qcb5kuypzdvpx1819hy8peeefy0ge2uvjytpa3y9237jla6s3bbhetjmexzhnpxfbdrrohkhp38undwkp5rp79ya22l9mzyqnbozentjaqmgiqm22kprb0zl5iv7yp9cx3l1v8fic93qfydou0z41qjkp',
                fileSchema: 'h3z3bnozrb484fix5ex8mbqzl9yj590zgpjgydvo5k0gwqdh1irb534s8u39k1wljrqnivs3646kig4r6o3g0e3qw3xm09oofd0ini76prxle87lx28g6wspr1fxxfi3zi12o6mo1qpfuami9v8ka80y33p5t8sr4m3t1iueyaj959psqdd0ge3sxfyyy533ejaikzqgxju28mc9ykvv8hgdzp1en1277suy2x2l3h2pxfi8s0mfhv9jxqmba1l9kedstck0t62ahxptik1byewz5mkrk71zuy0bsy9xor5tf5cnz1zdjde9gpe91hs09c5xam584c4ibjybllca1om195dzsu8855eoem5wwc6r179plvfdr9md7ikfkilhjhvl2syuxjcua6ydbrzs89c9qwuxsmmmwys6j630wdfwyi05wm1irrvhtzjwhvei3o5hfklg167kzr26xgu1zt696up67vttau3pwgg1bzryxeblqktpwzf40ug5acdtd0q4q5ei8qogh0g59w73kllkhglmw4ytzd230sw4eijf2b11uuak3cvh63nf2bmat33t6isvgf7gqu3g1t8s6ejxnph25awu14n2yiccbeoqbxy0sxy1pgncchkcmrj0ugc0ibsqhsnez1u2xrl01b21106x2v1t3gs61cz6dqpij1veeeibgspxg5ovlzebqaadf34cqsqfqcktn6gcwv7gey9ve0orl04bgroobze6uwcddker1fckf06qdrzdvl32iyhwfy01puv4auzve95m0vjj3cvf8zjzgbn2a4vfu1w64jlbwggfjqrmm7kf6f2u0i098d3vjgojp2qbd9rqd9t45zu9biplvumadfd5tkuga2sm7d91u6tdtzjmabmz92vt72zgp290lqmcpr4wqswmz0a4lgzfgamdi470ys1352b59soxy17agzqrgkie39behun6rv05d9ay5xv6n5zjeh8bz49tsbtj3afjzadigdmq7c0cqe07jqie',
                proxyHost: 'mun4y7p82btqriu75lgu8hn0zqehvh1gyking8uejd8vt1te0m68g0lypiih',
                proxyPort: 9138639158,
                destination: '7c3otfw8smebiuh03407az0su1g3vr1ci9red1ugg9a5d54ixidk24sgcklhwn8qrmswl7n5a2o3ovttflxs8kbbd27e9hwismpm9u1rxerp41gndifilqsbwoytqhft9hlzzoas00ilcbk4lbrymi9g9xfzqwrn',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'erwro3pgy9ryq1cvwg10afpa4xq9qhp3jyz6vcbsb33pt0d609hdjuay9jdvpi6257npsyddovhkf31ct869kn3paeymp3jm6p8k8yued0gqshkdb3xobk5u5f5a6nr7pxb81pecq6zaackj9s11fqxe9ppvyzl5',
                responsibleUserAccountName: 's9xntlntecqmket9cmt1',
                lastChangeUserAccount: 'smdm553xulu5nucd13rb',
                lastChangedAt: '2020-07-26 22:50:44',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                
                tenantCode: 'rsvpup8qdhg45fbei85xxhhw8i0rl1gsi2n2mnprptelg7z9ai',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'x8boz9b8r6ezz8njxsz5',
                party: 'rl48jek29uac6dtlzk7f2kiog2qrhqg4i9cxc6gj1cr1zsu4hb8suxjy466txlc2s40d9j6zuybs3i8oi77svwokjxeop9nt2gipqeul0mfjkj1work0xzltp0w77ouhkx22xachfewcilohlkoe7s4pel7prs4u',
                component: '3462w0qaev9ahbo3rmt2mgypde5w6vt20jzib7o9tqbs33dw64dy9of925322x6eyzpnu00i7vleaiw11l0li1305x2u2cqi8jde9rawqsn4gppmy8xew4cvh7fti56xsqz0x5vl4vc7iliaycyqr1j0b171elrs',
                name: 'r9dynoeuzw9o3xtksyoez5zy3w41zz5ds6tv3zpfljg5gibwvyb803lfifxdbxh81k3lotbv2x2yrwsmxcfgdu1l5j369ozi5wrp3ntt8ao9qhy974dq2g4e91913sp3ewssbmhq6h36n854z86vyt6ile4t06yj',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'xf8x7v57b40nmpl4hm10yjabqpiwa5w75fu3u2jv4epj4jy8m541wzotam0a3rhfxx1q1mvobbw562kpcynhqk3pt9cu4jc8flqtdugvbwbydyghyuv2zcmdn68ar9m9hhjnuyow6wexvlzklvwa0bspammljrnm',
                flowComponent: 'c5bhzcvy0mrq1r8tupne0zjz124wogugt5dmbneakg7zk4l9e3y59wwe3ct0axor550zjr7wts64t3ixnj4jzae407bb87i65ydktkic2znm29re4mixs88knxfpr7wiengx3ir81eshp5tvne9jnc6a54awn0p2',
                flowInterfaceName: 'yje7jsqbqdh9ssfvjhbgoa80slpnk04y0xa1nyyvbg3hlbu5xjqixrgf4zayd90fukfn842wthmxf7onszhvaj6f8lwl4qvmab7oqs4yw3u4pzvuv5oo7je6kma3ujk0wo8uk72mz6nznr8u0wgkxo77i77srk7q',
                flowInterfaceNamespace: 'coss2aai1q1j9kb5lgp0kt482ni6j4fq7q2cfy6ininr9885n8gkd3v1epxst9dte1mpbarwihe27dcy49lt423q43xdpgqp1l7ammzy2bn5ahjsg0sm7g13wvqge534fygvn1p5x2letccutsn87anbloz6cqqf',
                version: 'vgda33obv0kgejd8oa5w',
                adapterType: '4cjtkkpacbl8xp9sizbvd7ri0f0o19batwsy8xa1vtwef23poyuucjket5zz',
                direction: 'RECEIVER',
                transportProtocol: '0v125oicv1q8lnzss9dny1r8onahh9usrj23s8dm5j0y8rwywbtmw1xf6kwv',
                messageProtocol: 'nhjnrw2tqze99nld4usym8mi6a3etg6mraj5hapdafq8z1enjzze4pkke63h',
                adapterEngineName: '1q52blelwkwmbxyprck5gr74k7hbn5iat3dc4gz2t9hyl7l308yilonz0v8c60fq7o9vqfinun4tq96i8qqmhnorwjh8kc8tlw0xcjyv6o7qru4w6t5mucos4b1ah80im6vnp2ek2wdglzlk25witc1ty6ujw2wt',
                url: '9jalc6tynj6o4vxbknn1otzor8y935yfbvxu5r9te9pbhyll2gy9nue6y3w9m5o57asir6nvkh74xnzxbnaw5toxe96gyqa3ct32srajtnfmfgtb63zxcfldft8djasq2c4gvdrxe9fe78a4n1il4ww7my7ocycvzm0men9p7j4puzodx7z5oz4frm6htmgveg25mz7cz7erwjkg3h3svzuxz7fqb1guy419znn7ixvamo9vy3uei3rgyvx9ji2s06g3y27a12iy4sbrxskhcgdeg0r7me5fo9aggfbuhb96940lof1otmfgv94zv22o',
                username: 'zluj7wh3p3n02qi2q5e4j4yk407djmvje73jz8t1vy4yw91irarw65w54yal',
                remoteHost: '0f52gs3vo27liuhrtlyi9taqlllxmiiwgcaybobjyudne4obz8h8ybb9hb95j1bejtss1djbi9ancjx3fkmmjkzngujufnczfbjfilpbpea6tnt5vy6i0mx1ukyu8gibcundpbn0uw822ahjjg114c19m1x3nba0',
                remotePort: 4229307539,
                directory: 'cqhbk677dmj7l47a0aape5nw7jhq935gsm8sf1ll2f73zvfqqc0qxqnf6zzip5iibl2kz5pegeh1zbqub6t7lhthasi2llnyadjid9b498wj6xh3qp3e691d3tamr9jvclu2jzsjgvnrwwbhg39a5kzd9gnu9tpxfou0s06fvmnskcncr682se8lcyivu51r3atlfrvttn0uvz1do2rtdt7tsoc5d5cmcqsk1fkosxes1te4wklo165fnceol30cdxe4bqaw8xexj232e8cyxgg2va2b15vjb5mx07fcjpudvyisgsg8mhd60nfn821h2sdqub41zwzzyvrd1hd1cxf57rx5y583ewwdgwms0k4n8ctu3kwx1ill33gje8r6rp46qrc653sc4pmbm2nuh5ld2ulyj367tmrohmf9qywpo7zhga44d0x2sngpgb3loqkg2cm00dzogpr37omuo3v4zwf7xm2vpfqsyxr78et2u0l67379bf2yxqscxai6knkb4t6wm0sbw2vh1lobcf8lr7g36xfyicy48daaeeqw1zo0w5tlswrcangkj2fmd6n364nmyw4it81j3m97jac34b7jn3fmm1g5g4a93rgignv0vjlzi2axhrsev1o63fyl8oau1pkvcjlq72hpv87jmec3mt8ed537eup72cggigj627bhvwggjp69arbjb19dn8iqey2f4dbkmtdr7hnx3gycchxupas49axymr54yhsc46dxydjtdvymnxdl7cqsw2rfe0hjibvja6nekraqeh0wpgeg7ym78jki0auczg5336mvfpood156im2tatil2vf3d25xbusumsivsi4mvlzm2e6v5opshcq4y0qx78jwj7d73ktbiu9bjwx2kd2qtre1lwkrq40lnjqj0lmq3hg8fktj7h5svtgrbe5ofga617e1316crvwdkvach3t8j1a3ye6s8p0ue1h32pa6e6ltn1g1yfcwnr96sut0o7njbc72qjmtpqqmbzsg',
                fileSchema: 'tu8wcmglq79bzpn6larlksspq1ywvpcjl2bhompkwj7og0rk2xnamvjgga5qo4zom6olgya1dfbym2mqgibxl95jsa988stqep9ozay0qvhx2aatpql6tnc7szl0dq1mumvlplrbn9je8ylggua72gr3jquuw1e83xxgw4xu1g0o66p139idgvef48x6fp60dph9gscstyvg3pzkzxx1oopmmhudlab3gx88lesss7cosohpb0xdxdp49nnk3yrygt644eamu7er358zh9ey8qovmwsdvm775sy8o1gy4dl6ygcdeyd0917o964tzpwpry2wxfp409lsi2no9oj5m3mf2jt3e3hkk5cg8qlkscm99jedqxrjy4yf95f56za0sc2dmtghlcjom9mr5pbise7aqabwg1evweyoi00c0yhunv20inzynz72nmo06wgy45p0jresyh6oym1tva4gldlr21f6xxpigivn4gjrtqjza1qozaes8eeqaehrmnt6o4uv7v6th0v7t4cytynt0xq3zlcyujuflo9k3mf48ndquxbuc9mgoi3rlf7xwdoj4fww70qrsra94v4mmn62w2r2am130nvdg8i9xokyqzgg918p88vfymjf85pqnvamixbuko6bucjljecbjgr5384uqcdz07obumvv8stt9193sy7z0ubyq4h3596jynfn26gxmd2cavw58vnv06pxjmxfno477bwdw2qqibr42ftn2s7e7nl4d3nvz6avhxqf43azsjnnezgx9gfupij62i6bhw0ly1xi8yo39a8vtcxnzpqkhm59vw4092oorh82k8brnusysqi5lh9rp497isw5qlzwfea6z7nzxdwlhzn0eislzjtyueoevx6x9b3ivuquod24lq2o1j8c29hbyufaz81pj176lrpmwhdgmwsuw9wr5rbvybwwxrpzsx93kyd7ld3yo8se8e78eel31e5so4je3d3h7j8aitqjmrcfqihzyzrddxhgp4wve588',
                proxyHost: 'j4dt7z94b7eipi6kh2sxh4y57fn5mzzffrml0uzxm3vbm3nmbtqzsg8bw3rh',
                proxyPort: 5947811750,
                destination: 'xy9zray1pnc8mnwjpnh5k36u3rj64yohzmducvxgulisthje67bld5zd75y4k9sw8ddanse7nsjzusdwdr8c6xibhedkqaxqr4wdtl03zj69m6f48056bhaimw098n1oskhweiui8uhacvmzh4c5fflzj9hk07xe',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y0pmwyrdbf54ccd264d5xamz532y5nklq6tpr5eljkx3q1czhz0cim1vhdhnfh0k5udrbayxpv26nybpeippgiucp34ws7ovlmzb0o5kpe473man5on0311d6jhqafvdcq0c5rg0ner45d28vdnflmkg802bdj6k',
                responsibleUserAccountName: '859sqkjn8dicthd9quok',
                lastChangeUserAccount: 'rcdz1n9gwd03wcd6u067',
                lastChangedAt: '2020-07-27 01:32:22',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: null,
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '31y259vj0quj6qvdvewo',
                party: '7igihyhzry1f4kds8uydw8tomza8btq0sigmtxqxp8sdf3e0sfxf3qct0k7nqkon9c3vk2azxpe6aovwqunumxqhmkat9k0axzerilux01iqln5tw6n5u0h7610ytihhucbem4v67to1nrfb2ad9b45t0gvji1fo',
                component: 'esvcolfghb9b1xydpj032xpdu4q243yti4vlbwtjd904g630fgpvtoagfgbxolsc73r3wno5fued0sxz4sdrdlz6k37jixfcyp5z344zqex4q6tocbhvnpasye7s7uf8hhdw3r186dj1k8t9b4lhst657d3meppf',
                name: 's78zfgmbylhw1bujwbtfpmatxr9bi57ascs22hbbhsyzt8m7a3wsifepv6sytj7vh65w8xpycylv8z54ns9uj441dxl70e87svyywl3bg0xxed64mze78y9kiyyt5zke1p8wywcohdlkacwcsg0fnsj2pi92pi2m',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'cxzua5w9i41dym08g426038pprih78oimf6o0w4dj7botx529cyybez1v37s39a28pcq2lyqwcqznnkhiacyq6knah6tiaojxaseurwjmv4hsqb7dszxkv0ptyqdenoxgtbsowp7pnibt0yoyk28g31j8m09de5y',
                flowComponent: 'tj6vu6eqc3vcz2dverl442abr3v1ahdklwijiqkao23ncsqr581wbp8f66ycyyyzt99kk33clemyrow22fqoi4dzdibb88ph8jlgwzcs91tw6xzw65v1brg3uywp23xsd4hw11u9aodpttqr73496sjajmkwgxdh',
                flowInterfaceName: 'tfyxtzkd1mc4lruzuuappcltcmkwzqbdzf35fv7uttdeu1sxriyx4uua9y9t1lrm0gd3vb7uvq4ziu4jelo0x37j43g31p7e6hg8aos5l4rqgg50q3lsk0wqwbmljthe5g170c3l1hf9g63im1lamwexc20nzi6z',
                flowInterfaceNamespace: '3bot5491oqqy0rabanticnxhxmiy9cqcunfxc7ynqkvonpy15tm6rzn69b1ue8nmpf5iabjs0tygvpkbotx7ussxcz89mwmq4hkw8rr2zz1btc2bdrmgkpn6urf441mxqrtcrofxc5cglqqw05tng71d68btmy73',
                version: 'qax9rnreou0qxdf055mf',
                adapterType: 'gnzc6ih8p0dnvv6kqj1lyyf78mdoczgs0quo1mncc377uae4wvawrzw01wmv',
                direction: 'SENDER',
                transportProtocol: 'ep0m6yafxqmsh5333wz8713m050wqevc2l2eyrkax61xxt8v20ulpy4msq9z',
                messageProtocol: '7dpcwokehiadibhy762dg1e9ox2yc1fg93n6l70gr1mhiyk9nhh49fwedfgh',
                adapterEngineName: 'mwxjojjz6j5q28n4y8xta7ltpvmlqh37so2ov6ohnw1da27w95snwzsl7qb6sq7jbclgn30y5s9rgzwa879kziskusw9et8x4poh2t8jmq9sfwqhseih27ilei2u8osynktzrnzlngmq4sevgbp3b977q4fgj87w',
                url: 'djdnekbk1rxsqo378weenbe1zpfm79svp41ly8td0imhruymfxargmsie10qchyn0knwz3xkyko284l2q81ocn8eyvupnr680q3hy75n6o53cqolprrq2z7brabzvkbyiwrafdfna8htijm8lmzj4eun7g0x5wsyiijsogsau7spgcdktgyyki2owkldaxafsbutd6n5rbezkj1ctq6p13808ko1dxtpf2xis0iqeohb7zya9h7d9i9ffcqj35hodfn642a3hgdaa5z8td1caidof32hzjrcidb4ofqrji3g601mnhbp8v2ra4w48ofh',
                username: '9vic6wehlmdzwqct5q03bk8uwri873yji25n80i92r9v00qesrqfbannrq0o',
                remoteHost: 'masdluezgs2i6zx4iwryal4ytseqzsa8hcpz8wbn7skbhc26oby0bm8ud6866px7x62ejjwnfuac0kibl4nqbotyoloohfnjbicfz5hc5xo7d6cl135wzb3acjjmh1vje5srf99ffdzr87mk2ukml6qmy6il2cs0',
                remotePort: 7482371823,
                directory: 'jmg3jl1iktpgmzr2rhqjfvrjvgnfhfv76f9ev7d0zry64an71ozhw13qnbzj62ltk6m5lyzpkbdsnzvofnuwtn79n2wtokrczsa2ixbs86ll246ev0g3e15cjv8bvii2eov2ivghuwcc7zq1zgrt0eael1y4ingxy2ir0y58ho7bbbhrrfpfwwly6ronekxft0m85tkvip2g9jldozgt8dhpyuxjpr9qkgwppck1o0ov0d7sn6na4187z4y6dxslbfmixmxf62ojwdvdik220yf67ruet4hk9bjyoagv526fqrkan27duuqkcbbli6k616zhy9gykm4ghhkicewtai9udrz7d6j5xn3q3ratda57afu5t5123u3btzt8os8jv2ek432j9bpwjczkn1xsrjnb7dinfdyk7q46z5wnjqca4gxhkrfs4py4ppuhatxj8b67a0on8nfaiwvby7irmd8skld0efjg7bokdj3s88g97u3di0qris1pj2u0u3qs7bdzelytfva4e33u7rkveq3a6p9t6jc27r0misejwp36jlldly4m7f28hv42nxkiwn82oqa3m7mupi018np79zeqs35lx6mcbea8392ugao3p32gs6frmxkee5tnjk6ct7f6lsznnh452jsvgn8b75zcvdnbhdfmi23yqkxaup81zel5n3lqyvehy7bsrz8greu4av49cz100lt83q686efpyxzz4vcrvb8i0ovbvyjj6ns0kvbqpwkk4lytn3i11qxt6u42ix8dsrahksdlaj1stcz6q3k9f08oe34mh9qmt9jj6p9ltpdaw26fq12730en9yc181ct6lg3jncxuxjrxrzd0yola5qz9bfkwcrmnztc7x9owkui10ewdsce7setyjurpoqs0peu4b9rii2i8esa9twvzg9oy86sg3104ol9u67w75qik0ucbhk2oouqefnufmgtbb4lcsfyfk8xjyvo1m1ipjvaa0fas1ofhg3vddn0ppup10d188uu',
                fileSchema: 'nxz8tw8ujjj4lbccleqw54djotvoaxjilzrw660tqrsjwqm3f3v9f8nk78cbhryo28ii3jz61ymzaxbd9o6tf7ny88xhrtxkeenxi8mgz54xplyx2gtye3qr93y936kr6p0zdm3eaifgpy6b8h5jdrpa19a99c84kryd2gpfvktl85jrgskc168wtxwyr43ruaihmvjwisha5mb2jiif4u5h9u31p00ouac1j4u319ybm9lw0c1rvw85z1j0h5ixrf0lx9ivrs8ai9mpn363gb47ohiim4wzgeadhwyk8t2uxvc51ljjiidl5nsyeox0ws0ra2p3mlkkea8ub3gn1rw9muk0xnfp470gnjwyi4ydh3ca8lbbuxleq35b0rrdfxa0oi396vpdngglsjd0bo8tovxv03uwr6p03friox3xr54qlbeqakbaxwdrydufcnwtqcn0wkg2h4uavjjda0xjtrxt6w61v88lxx9bzvpfj2rpqzy8qg78iwdtfvn0yyuun8z8voidpxhst0ohj32mdmmo6lx73e9d5wwpxfye4qn3jk9acv483tw9h33qm19g21co4va3m2pv80qj1x3j1odfuhschtbj9nql95vzuvsvqf7pakkeehjlzykzm863ct9iszoirxtpxtebwt9rpvorrb4z6n375flmzcbm6b76d57j9tz7di1zcpbkct0h0b1sbx2akt0hukvjy7sywse64jf4hk3izky1ewm6zji17u1gn8tlvja09have2fsfo82gb3bejj8xtvm74qqjrjoxky8tlo6pqwudk8qubbmy8jubrxvvghb91ikiz7x35vhocm2pq9scglwxv5pl3n63n2i1w6ln7tkx9jcl9uakcfnulohcvoo6p0dbbc0j9atq2cz31zhvpvvmroqx0ey7vspm6mf35x26e5qpdg7j6v5jcvea3k8xoimsq1r7fjyzh3hffugc05oguq2mf0985te45ek8nsd88zbe69mb72nlzyr0y9yql0o',
                proxyHost: '3gcix1tooj38u5oifild4rxplhqnlqem08vs0343ivtf31yt1frp6z9kkrr2',
                proxyPort: 2538611057,
                destination: 'hur5fo9dratkf84g5o9qaq95liyrbqkt7a5s88x1t51hvqser98cf72rgha1nzpafqyzfzjnk5tlqoijqe1ydvka5waym4rrs8cku0zzwwg10e9xojcfwmwf0u58caqkqx7qfvtrmk5p6rchlmmga1r6y8cznqyi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9zj3b47folke932fkg8loipfu40o6bgmxjes56c8ge8u7fsx5tls8koopndp0hkh408cccxhvql2bgx61daqkmbx5o6okryqi11xdwcvi3olq03j1h5tni8to21c5buoy87j3r2n46xinl4zplvm9gaq72kwqfee',
                responsibleUserAccountName: '78i3pkkfb56dp7fn56ph',
                lastChangeUserAccount: 'pnulpscljp9977w9t9yp',
                lastChangedAt: '2020-07-27 16:54:20',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'hdlgj2wl46fap59c4alv',
                party: '584ml77nz03rtyxrqq78gst8bg0ixg1jb42d81v39cyeujlt1xze8jbgp3vpywgdz7t7xj51y0u2ly3bcyypin71in9wcpegit0lvva9nh01az26sfjk5kyqnuragk2uwsk5le34cezucrvgjkc0863mrmahftk5',
                component: 'zm61p251m03t74510yjygcjana3srlgcu8dxl6s7ifrzlxms7s1eosij96wvfn3leusw7ju2ptnov9mtfdkqapn7hc968xjbatext58h99z99tl429ds0yo2erwqvs3kvqtrn067cqfil8ct9oona0jql3fmrh6u',
                name: '1hqu6bw33h7itzcinpte3wern89d0je5m2uw7kj5ocspysrid4q00tdx6iexr6x8xxd75s6hs9syqjc6dz84n732rz2ys4439l97v721vh4ssxhqn8a746zqcxvh889o0b97ev4jg064lv5f8ypelf5l8mytfd3q',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '1mprwvgb1vapjf2gbw1mudrseahn603xnzqvpx9zkyqhwjfb4mfy1yn5axecpr9r7af1q2vr8k286gjwzpub2hjrb8j4nw6b7xur0kwyiy6xqs29a34ck1lexrpoealt3x7m39jod0oefysrl5it1zt8y9dm2km1',
                flowComponent: 'tumvexzvjky97fzdf70i4lqbo9gp89sd6x6ehxdkbv9lru2oi3ff2sat07azcqgshnb4h57xkbm9zjblztvddb2g5eitbqcxpzi9id15qsv5gathcl1hhfw480oaeqi9dw2qj3z3ejbvke6b3s6za7n1khii40ru',
                flowInterfaceName: '927blhdc3t9n59em9nuduiphmuwwc5gyht2v8vks8woizzw1fm28fqejk52qnh8kdehcwvddh74w22j88wcjrmswdu2ris8rc8yqpoa3pfelu0084g27pi3czhxpsdfr3holifjaphwjd8gv16t6lnx6s56o839m',
                flowInterfaceNamespace: 'sbcr2dntzzhedhrfy6w9uc2zgcu4tsvctvdqcugichlg76nyze1m1ofhja8bc0u0q285nfdf1xnds1k8u7hw144i30ig3yh156jrq40s5fywj5dusbtj9shuian6irqz5izndsurjt9c2pzxz9dtpkrueqxtfw1w',
                version: 'fr39jno02qr37nfzcrz1',
                adapterType: 'f54ibtzy47zwwm3mt3korfpsotzw5gkk5t9gvxayt3725eli4pn5b4dd8xyy',
                direction: 'SENDER',
                transportProtocol: 'qw4o8s6lkj34ghqpnumklt7kpekbrk1wju55cxl4m95khmagvqxtyx1redpg',
                messageProtocol: '2yh4sr2ss33mx6367o559z4tmze4oja8k0k7f73br2zn2h78q85lmkiznfrw',
                adapterEngineName: 'ef7ileroib1dyfcidnr7yjlhs2n78m3cop6p4n2bheiyvq02j8u74lkfnr3cjjsy8tdwxn5bpfsff4vs42ql67x9tqyr02t18hr0197spt9vlvwrb0ryqpw68i4wfp8vjzdg3zwgm1zdk6han1nbfmytq4kr2dif',
                url: 'v047p9qpybfvnuxqwe414lqonsmvluft6kv3kxdww6elxkxoozpwvoj76qxxupsvg593gs5arizr5kyxhxpx6oqbug7o9nt5wer37n3xhqy5j9awu3vl9ao1bf7q708uter6kgbm8c9u212w0ficqk3ink1gpyrkib25j2djuo72ss4emq30ytzf063imcing6h6xn88f9bsi5zufp1b4f8mw0hf9li2zg96al5fsm0jqfjhtst1r9qx19wla3y27vmk086iucob9cso2sy3sqpr75inq79aeihkvklsfzqabrw5icl0n99fd5fxcogb',
                username: 'd1aslndim1i4n0lv7hbqd94nqqr3a8zc700bbnk1u6pemomkbuj89cbd2una',
                remoteHost: '2shsmhxt24shqyxj2oo0socarnlmusl9f27h6yuz2hnekm4s4b65har7izhauvn84sp9r7jx4j9e17kynq81y7tkm2bsq10q7tjm1hkt4iasg3ts06y7f9idj46gaq81qt10mhmsngdgffxph5v9xya3zug2gwp9',
                remotePort: 4436763262,
                directory: 'ytoi0mzeoghiduedi334kb6gpp3cuneg8ttxivmkoxmn89zsj4pcf3apyyv2tlm8c5csrn106ac58hesjsxeel0fqs25kxitiq40qhpg3xzqvpa8xgrvrrlthfcj0nlcwjvndcmckkfff0g2i0c9zjnj3ep1ndwzyp66b8suoyjco23vmjgxq7dcnh2csv22gta4ercxm7j90gevn46bjljhh0nbohka7fmfhtmyvidz580d0iese2qey7wlvjd5hj53q8jmvp17plx9nsvw8641dvvemm3yd9r98qmyt4iu4378hfqirc9uv8cw8r7gpw29fzyd83dzk2rmcqj26ze3iu7itlzojqq7ywplm8wgr4r3ktj3m6bmgde6xegxunknr7q8kc29bloymp9ekyk7vn8jya8an26akf0kubgnxn41nx6jp03sb5k17be1kgafo7lo0jui6hyg7tnj3lzg919huanzzu17gbkdol97qvzdiyxmyoo35ib2hghwujiudy09ide20phu2xpqyobe6nigrbpu0d6haogn6m9fwfsfqo1gd4e6s7vfo3m4njweijfi2l5ceva8ui69ss5x9zbw886c1uupgmmru5wzvyl45kgtmke0q98f93uj28kj7e3j4yt1r5w2n595uhdnf69joca0dii86a9jxehh0f1fniyzy8xk7wyr3lmb1slod5aj7aekgug5ymd28vjz22zfisl93rnio0kgs8re8v5vqg9z9rlypgwjmypcct1lx697aijrikfsggqflo5ymb72zbp7btpw34zw04ms9l5jsvkd7kkpjg4wasldeorpo5fgkz2xp9w77tyxi1l4tcnbvh4eexu8zu18nsemcbod52d4ocag85ummbr9bgw38b4ahs6jh75xj18qkre5qlhy32qeppf72uyhewcod6qmxxiaxw1gli4t9lpualiytgheuguxsx7c27lt8avwytmqiuu1rwrqw18yaka0a0q4hfk3ok6sil73o1ua',
                fileSchema: 'ip030svt1azn48kdzfajaweiyaei7m1n64clxve43g3drj8ga7saqx2ryaaq3lqt2o59vob4q3j2gbs24u9nlonmq2nuxkmzsxsvj646u75081ryx9n7s1ugwpuvwo8ybbks3fwrmgt3vbbpso657rpo6p3ei683yod2762zvoz4q3hky055dcr7oou0xy6ts176c52qg76uzjiv0gaaf1u4x2fb14ym9n34zk9781nnvqewaka6pj13v6rng1qr0egikb6sho6x49mxz0ug7u2d5cstz6oobdzx0zzqu4xeskwqhqeh24rkmfhoqqb2ubhqmxigqfrfrmwyfdg22d51zthxt8yr4rfj8pbtym727gx3j5p4nsl9ucz0zpi61h4fs95815dk6nzn5uf43wh7cz67v52vgq6onritjj24dyrmq8ichj71ubd4z0r1mypahxpznqxhtqe7crs5zhy2mnnd3nycgpkggp1cu87lvuhvs7dac07vntnsyvslkpwhzizpdd7djk9xz8f7g2mfdll4u0tsowffmpsdb2c5tfa9y7gqlwikzk49s69agrl5sht8amek5ruxxkchdspe595jh0oclz62ygbflduew4esd6migjxnyr35giga21d4m6jszdd9vj0qsd5pzfxo6y36g4ww24yhk1v1657s4c66mz8mwbkuqtiny2eut8nffq76ljcgfdg404vqq9enyeuhf92ens80uqd8471kwwk0sbfuw4b206r238alu1wakxizc2yi14kx8feil4ct6orxqyw22s5is1h67x4ibq0628hzrry5epq1t2ob0ar15qx69bgp2f3sha3bess4jo1lzxlp15ehy71p2zqoovk6z1vn758w5p4f4wml4bslm9hwpss1jmyml6kgm4lefbqszkc9oazqysmc1uyqhz6t5r1qc5iuxuh5cktapou3sroc613i9bm388g5yu8knawzlktwfxuyufcr5tzj62ens17itwq9ee0j6xw2',
                proxyHost: 'wwy6h9jthkgiqbi9gnsrmeiadhc11yb115rmro82mde94jtt0xl6u6apgskl',
                proxyPort: 8494609258,
                destination: '4wva1l72abd6pf8rahc8vmhvs19rzvlwhnbo1zib6emuwkaomore64o5nma2b9mcskchan11x21xou5y28h3xfnqgvgrb8gr0t94jre8uw24v4glfgezc6oemvfrfo3tx1qrd64qs48zs3ga3aa395f1vgfv1dt3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'porg7vpdhmo34l6fcs0ylhhdzgl67ufvrarxnm0vb84aba0x3czsvs1xv9o6d410is2enla3lmfonsn9lkp5a8hkmzg2e1ujc4k0kj3ke4ga4kx3sypajpb88pkv1bk5gd6zvpphoidlgwo7k1vez1zeaib13x98',
                responsibleUserAccountName: 'iadum5b7k3mmd3j6skhg',
                lastChangeUserAccount: 'nbcrqcp3glaury5lr9dp',
                lastChangedAt: '2020-07-27 03:10:08',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'xgwlnbnqi58od888k3iz9z32ewypq3hi3rsjsbaql4g0c0e39m',
                systemId: null,
                systemName: 'ofx9y6a9524rpyrjpy9h',
                party: 'nz33au45jv97s7u2snjzvrrylo0f7umcz4lua9j4f31szd5wrukbamsezkye74t2brw48944p3788u6c96gs5wl598kqnji0qeq5mxxx0owms6mbdw8whzsa1jxa2tz02zfrrrda7pytpq8voe18c156wdrnbkds',
                component: 'p7ybjw2tj3g8vq9cxbmtmh6k0fruu04rb25v1ge3fxh2nxgf3a023n5m66l1a9f415hb8th5dmhhzzsrp4xdhng3vyx3h3slobvx2c627kyb55ozubxe67or9uxnlj5jhp7bskth059ovn7wykgpktm7v6cqdxtx',
                name: '87w507ge9oyny45tevk0humizsnve2ihe6gyj6dhsssi21mh7tzlz15x7r0o9pxbh2ol1n2s4r66l8afyr19kq0j7mmkg7tbajj1npc006cqi06y92m02f6cgklg861m0mvqytrzqcn257k8u4mihg5ofmbbb80z',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '3vcvq96znh2bf9eu4td2nmq3am7bq4kww0io6djf7a1sj4l9culfx59a9bu6gn6fo5a9ixo9dmz06z9nrl8x3mq6m0324t4t2r54ybuhwg2x7pv74qyv6sugdd9y9trkuv73t11yc6ekq0oyxl0y6p2qhuwasik1',
                flowComponent: 'zc5tqvxyip8az25sa67fzpy59bj1p3inwsiqa0j65nnzw5dy2shdhbregddswjvsaywfahpwwchdko5w0gsu22onekj4p7ctcluxdutpjsmgibykwopsj40vlmeruqjwjp285uayfzgfnya7f28qe4qsj2hk7f8i',
                flowInterfaceName: 'e6rpv0caz59drf7h5yyqntj2bh5m0ltfh2h7nokaoi50usqhlu2lg5dsgqqacwwv5gj51cnc8vuqubb7yscz5d87ofzwguyz4iw03wxabw87y5kasskcznbstizlzs6m7ldn7bcu273k5t0j0oc980uhx8kvmu79',
                flowInterfaceNamespace: '1q3gdxasf3k53ipne596tzc9uja5mgs6r6rhj8nl2s9j3fpsupx1ugiolysizayw6wafltzx7q7789zs062t530d6dzb7tt2pt0qpfrjbf8xmbfi1x0dilj2oav83sof89ov1qofgy0iwaozxa5r6ld4835t0f57',
                version: 'il39np50k768rizst317',
                adapterType: 'eupvab6ivav6wkv1nb2imfsp5drdhxrs9sehsko18ly5f5dshmxnq2uikiq5',
                direction: 'SENDER',
                transportProtocol: '2puso8g2txbr2dpi882zectdxoayklwm7osz00lsobs37p97ivwfdblk1mii',
                messageProtocol: '14ewhqq9vc5prfob8bfmlln3ylpf8bhk4yrsdxsgkmf7wmt4eykv9dzr15mh',
                adapterEngineName: 'wckkwphd5xuq3qqg7ael0npz21eem0vtatvypnpomuwpjb4m1l2rrpj2njbzc92ijo2lfd3zsqlfo1ntm3io9gguddabzk05xu00j5pto239fqkiktpnbc9bjyp4011bz8py7ska36nul3hzwt03459eih96b7wl',
                url: 'ap415jzmq4ku940oleypmnp8yl8ipe75dzf5a64khf4jfzf24mj123z9dxvt8ebvrvt0b3p0yq4vynczs78zvhsunqbuak999pztj7enwzyfnxx4f5ekm613wx24ro4axa3o6jn8pvx42up867qg8x61kurtltd1fkxa9c3yqi1gxf4mf8dodb7g71wd9n4ra1bgarwa51v0jy4w5r0j0ae0z4ig1qh8mf7rfqukfmzbwr78gl2muuo9c64rkgowblyh4ml9nvs48po9dwcqa6jshrteiaklu9lvmhxlk98xr60jh0srx29yu3s48609',
                username: 'iyogcbmt1v2m6fmr5h3zqujyemqzjrg0auva68nn74bmdaymrdbt7f5mjuqm',
                remoteHost: 'y0xhybwghxxfv7tn9urk708exa6gtx4dz1kq5o1oeatxr6d888va3elmh50dhf6q3ltkwcxscx0x7owar9bqu41077o8pfqvndlbmzeo3d1fa2sr3rsmw63htupqbq0kk4sneahipyysqzn1iy9ug9oi897n101t',
                remotePort: 3368978633,
                directory: 'oqnzmzk7y8mejs1ln2iuvrmaz6cz7e7yyuigsw2u2az2h0bw3mx9i2yz320o46cztriw5vivq09p8xzxfa08wshb1ddgjylalxgbgleds2chqbuxwstq390g6op77atcn2i4viuys6xcdhi9w0cwreckz7vjlmraaocgxywfx14xgvg6vc7bh1akx0ehz2zle21t1j0g8fqnmwu7bgobgduq2g4h49ymqhz4eruz50a999i1g5i35zwynouqq1xnrzyrktd0hpqgk8u4apmlyremn7i4pjt0xv7guv6ncnlzlk33n5ci0ioova9ocpkptzx7m0n6z4qsyefu8tom37326vcoorij75qs0akbpek3gi4o7yxk3h76l3n2ru0uivp2z92ls2v2s9sz4msrvgowha9zm8hchsnch0gzn47jw0zwf8sugayy43cfqxlym24ax1hl5afi54gno3v0cmpfo217vmrk0dduo2vcoho185rd9fq3966s6x7asm0n3h6tez0i16ybjl7sysk6r94w9l67mq7qaqdtnes3nhjn06c3liiycr7kjkhfp8cx0wjvl947fdt7wdkp6mh4qgsc0gx330f9py2iomiiysb78dk52ou3kcfzl6jiop2265oezlogrvq1957707jdi2tbllmvdo56tvkm2mpcw0orfgd6xbd2rxccthhl3425kiqajq5lsxd0lcoavaa51cyutjg1ba33qgzucar2sgykw4lziip1rimyvlbackbp345dt0dfz9lqj4ifs8tyleljdc12qe7fnu8qaxfy50x5fk0plmzg9pt4v0zav0deepk07y0t7hfur5q0naax5qkcnipkuigij35wvsm77ci8x5afoyoow1olxuhrwt10sudap8spja4ytgxkqxphk8hqjz8lcott4bnur3u2jrmul2noqsaxwwxhc83jcgb1j0vbwu7s8ihv82pjupmzvij0ly15kkf9ynpo39xljdm6b1pwjfbihi472qypy222',
                fileSchema: 'falt8lzye2oi3cqihrku411li2zqibz5n9uwmbyit3lh2z75z94wlngczzvyn1kif2ied4op13v797ctn391abxsvjkh8bkm5ciundwjxih2sr96cmtca32t2pw01w5v7kjexj9524re9e1la5shqvgiuot4p7t85dt34lriveljvekkkriuwo3d3byfxsxb8e0skzc98kbicok0r9zo69xzegfmv55mfxydwgw7djmak1k2t32fexri904pt56oclu130ep1qhdsb7ggcaxz0ctp8hcroi8umrrkrz4p1mxdrecd80nhgg3urupu7gdx5i2928gvwacltyl5a1ghw946tejp20t6iv3pwd3w03vy3torl34h17ocn1z0in98h1hbbuurn08u97c64qefmjkngrcx0xn7kipj83f5xmcc88rlmo5ve3al74u91v81fewxajjh45kbp5e7f3w1cx8btyabprqevk4a044ifvad8llik4yzpqujzit455mnycxfko8q0a4ow4cz7g088dvgh1kpu1tl8jtpnbqb5yxckd5ykfs3zktv6c544cha333ew6k4kin553kk0yxrdyhoye3j8ta9kfxjrulhls3fh1aqdjyrp3s46dkq8aut05cav8atujnw7gv1pttlyp9m33rfrz98snmbcbimex7ryog20zc8y63mc1wswk36q6sk2ayb8neut4t129sq67r0gc0jfrmpdqk0arjrkvlqf3fsnusyxsqmokejiyxnu3td2aisallo1wknwigb3hn2ocw5i55hwx60bxz1tknw0us695miu905nwuqrw7x0vfi8jnj3ci9rvbhlms3wc6ji0aidrq645lzsqkvnft0rxkpjgm373h8kg4lkjudth24u0gl6wfdaja3kluuze435oi6f2rfzd1zf6whovjbj58yxhy9zd94mrsio8uycz8stgcbrrwf88epvi74pav98nn4u6p4f40sbyu8ho2gkmt2ab00xved9pnudi2',
                proxyHost: 'taieeoa3pz3zx1qtluh85ba6isg3o1iyqzmc24hzpsbqdr9nnzj0w2a592gu',
                proxyPort: 4181414660,
                destination: '07jt2vza0slnn15e43ia3mi0m0xs2nomx2eu48nabks8jrfuz2afo9dbb95hglxb095t8ypl49ifes3syngu8c3wostmhbr80e3pp1g2i19o86w18idv01dj8il14ipnm43jfpfo131y3kd3bvd1h1ivq0tapl5p',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4lf26ykwrhex5h2ccffmskrouffilwn0hboanxf8pdcdoojm6dzhdfsju4tttx02tw6f8cjmmv07kmkhzoczeraolwj1rd3kg47mu65vatl1eqyj5ayq2e5uyvkjqehyganqw2ebf317txud6ero9j4e906kqbuw',
                responsibleUserAccountName: '8u90996nziinerywaln7',
                lastChangeUserAccount: 'ee2jrviwymvjmkfhr6qx',
                lastChangedAt: '2020-07-27 12:02:25',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'qj2zwgmlzri3jsqy9zl2v2evsqknamlgy0unpucphktpzkwyhv',
                
                systemName: 'h7m2m6kyqkoqhd31t4jw',
                party: 'vnf31uja4nwlhu4y57yy7u23sc38th73tl9550ckadpheod83r2clujgzo2jd7cc6ru2kpa030vz284t1b8mp18724s0qhz3080xqx7fgkqo4vbwanr8l62zqjigfhre4u8ku7hfcy2yiu8mrdhurw9mi1fo531f',
                component: 'gc8fyl8xc94xzwl9vlnm8cv0fhl44s06ty5koln4lfx20yzm5w4u5c2012sglprbu2eqbgul4swmkiv4kosuyh2i51z45cnl4cgrik98bh9q2uv3oxjwnw3e5abf0kujmy1ozeuwy2lit8ko22ydl0kj2e7qfop9',
                name: 'a4viqbpyw1qvdky6xyf27cbyy51urqwebvbn7b2yvtrt6yj1j5b20d9aw1cgj36paznsr3srm1rybvicuqwga7h8ia9ey7uugixkhut4u4k8rqopa5bicf0k9jz9rocltbfqbto82y8a98e5nfpw9kw8magxjn68',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'bnubtifjjzy3qgtwsk1l1dnjwuuxc36qvw503usp5kstamf819quknokyo705dhx1vl6ksmpgv75rox9mu6e55yjkop46q3sy6409solbrlgygd289wko4c0ttxhn5x5pgck2g317loohypodhna4ifjw40fon06',
                flowComponent: 'bc9d0yg4tlhqj165mzntwtkgjq4k8pse6ds5bpj47vlgtuk4howjjx76j27sz2awsxfjvm9t598r1dth11bu3x0n8hksm37g13urdl4wc2abn1kdehvy6ugvztqz328cfvz05nf62wjxoege0gpsccz4ro1hb3mr',
                flowInterfaceName: 'g9lav4qgbs2rt7vq4j0e4wdy3g4hzyx2yefx8iq2sba3n5c72fhmumshwm37mz9pnmkjjehs9h6vqcph5n8jlwh68ym64ulojlre1wpz66n4nakdhyioeq1grtdysq5issnh3ip4sd81xobs0w9rr4x82p5jkmi1',
                flowInterfaceNamespace: 'j95sxyq5yjly1qcq4b4x0o20p7c930imic8deb9n7sxszxkwj2f8van50nc18odq7bl9zcura0yg9d11pdakolm753p8ikfwt1y0toc7pudait9uhkvp6s8saz2x5kj5n86dv5oqqab0tjguy5pihaze3cc8incf',
                version: 'kzwija7hdw117pqs5osy',
                adapterType: '2qpjwba9nsm1bya7ev6dy6szg3623u8h2y8sygx1xteqzo6qumdvvizt5e7v',
                direction: 'SENDER',
                transportProtocol: 'kheeo8csboznb2in5j31netlhieztbetalqc61ytdfxq9mtvemd5rsl3huxp',
                messageProtocol: '1wxiqc22wlorffcjz5gokma4hkm41e1s755zuamxkzyo0lb0k6gdm22nnv7w',
                adapterEngineName: '5h5z2z296epcb5sa05108pjk671c10204xwsh722qbm53n87eanwotps8dtwmp8ck25fxhsxe5qns4gda76wxnc4ry560oqcp6wxu8eqp4gvy97w6pe7wmh7i8bmva43jb413bw17albm7ulu3xvsoo09dlg6jfg',
                url: 'feojfm0pfy79dcaonskl0yxajw3rdio0kmirnk7ptubz05qs2vxddv1onm2g3f2nfe4mf1zxu8u0k76ugvibgab46kx9hc9zcb6um1qe21bd78ufeamqkc06pxrgtfp17qsrcjwyobpzsr28fa8t9m8l9rvzkwsg2gwabw7g44ns3amb1d388aroc0bpm3yi5ejw0mb81ojs8xaexqn0uw6tf865bcvmedb5e0i1xnmriefkf3vshwalfmvy091lzqhczs44cxoqky3rwvotb9vy5mccejq0gmn6fnf1xnmcj2t3zqlob0t2ubkg4g2q',
                username: 'dggpyuzuvc0ofayo4abiuh6fp9tgn59h6wek7chz6628koe8o29g9y0bnmqx',
                remoteHost: 'mgzq6ll5a22vhovlqjbq5z87qihuywrg7re2vw8826s51jfuy6g9814trn209iegvrcep4mb2v19r79knjuuckqk5jw3977v6d8vgv7nlg2qb0vthbw8k68zgbl5rf1fryu7dupyjqq0gaoqdbd9ujsjttsjaq0h',
                remotePort: 8183055090,
                directory: 'n57r9ca83dh0jeubrsif731obo303vk7wu8vlybg4akc0gqmobsapv3sc93axyd550ka7jnhh632m5rjydw6yb6x4l3qlpfg4tq9fteoaeu64zykjphwaeqv0lt13or0ir7mftv6gq50p2t6rfjydfrmebz8t01v2f93eye258sgerf1mcxl3dhame6bxe1f6ll9ocyccp6tfao44h5m418tbim7oafjkcybmfwdz4aiwd7n8hqtag6k3afvls0mob1v06mlh87jrmsuanc5o6mr6ef808kja2a264o9n55mmhr3a062vjjyx0ew3f7hxsmsyac2tq4okgvwpg89jda5bborl17xzj3ucj1xs33ph2swwcrsivgiswygs8p3ozib2db9w5rc6vdl58pzvzjib6z4kyag0oxzk7v9a15zxnxt27ciehhz0yyaacw56auz4t5dvg5wwtd49w30qr2atcn0jffhtiqlu93xvigkgsbmvl52onotddj4c0fy8b8hwucn0zsk0djd4u49myqbr8idnnorpoxeuy7xhn2lu5e0yrf7avijm7vbc3qnzukvudirtpnwykryc3rpkic4ld6qd35teyfogsb9spibkeppd0p5r7v5ba4ujdu2bneuj2lv6iogpjng1akjqzmqy9egtp5a2v3x320atew3a17z2qgdftbr3c0ij0avtxcyy863x7at8r3ajllz819cx5jhmdq942z26156roqnfu3iv8m49zwbvm4mzz12ijr80wod8fn6j8rqqd5bcq7nlzn9afv37c7fdomqevfprulxnxy6qu1klu46pglvqhrw7339k8sr50culgh4y6jlghvd8yyotubmf4i1yd8mfofuptdclxkxyz2gnuxas0z1vkwsqzfshfzr4ymvs0m9nswk9hg3y97nn48pg08jbc50t662np33s8cpcc1iqjo4ilioffejmgue95tmhjs5ex1g2umoihxrr36f11tf056ak46nrj6cq3hm9a0f',
                fileSchema: 'hs9xsm0lgv8k2vurcn51nibdg3z0pxs3tsjcyb6u8fec6rdpio9xsjqs8arqd18okjne49cil6wif3g91yzwzaptda4wijl62o3xmxvonpqzq9nrh72ptombex2kkrn4akrmm7h6s41di0srm45vcgvt87zkl0flnc5mzv0mcpjp2j72axg4n7y7gei17uuphh8c5rv7ykrawcx2okfgfper4teypbzmot8912rebgbs8fd4tgey2qelqezpicg8rnc1585s9acahnlja951jrl8k5o4g9w0ob77zsvcr1rzkbgqwbw5zi9rm3wu1ctmmay1bm2rq81uy97yusacywggiw3uus2jrn13hvnj7m1ektq2nednuco950e0uv0xc6yxgu2aoa24uf1cfqvacvczk60w60x3mm85ppsyk9qk54arg271l0bsv0q4jz74tgy4p9fa6j9lbjzqtxq8wuw7er9g8c8vxrp76h5thu3brmihpj03q8s0on2usx1baqbr8eoabehcf9a7yk6kj7cyvgbwx8d31kaux3t2uncu3xn3dfabl6l6crfv3t8m72aewbc4qc65glue5ux26q0qkqqtvswpi71pbb116kxty8kcpm9l67wl28aw9t5ohkli2l6fi5uzbficvy9fprxikpe7zfpgixoii5qmn8hbd8nev2b6yifpanlxf1dyd27ujqc7kdpangadyrp5akizr7nfsslgi2f4ns6voesvq0umnow1u5lfcr5viwf3i3yp24zti3nd8dz3dswjyyzifd1eg5bhl3lsppdgdb1437kw26t22hme4185k4vhc4co2lms5ftyi06ciw8biaoluob4kfr2f1pmqg7vkdwi83oj1aifd4w2gji44p77pnftwqi3l653xic89w2ozfr84kakefd4kw7g6ll7xgnxmpqvsu2e3uxmwydddzj5esm612xv2gz0oab500hw6v6v1i6exi7h8uu806iai7vf65hwrwv240z7itlbl0v9',
                proxyHost: '45mwhxgrx918uuuypubljfm3uzmq6obp1gjvsopguy13k5ejet2g9u50opnp',
                proxyPort: 6997159083,
                destination: 'hw1hxnd9c7da2uyrm66aenjmtnep21hurk7v53zpcvlgbdzd6lypm26t59xc18fwujciepfnk6ebda66tx85p723jety3406t2uhjqknr8bx4y8pxbjsco51jigx0rcns4l6zjntwbjypial46r1kzhwc18mu3hu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '6doovdqlr245vy2fc7hmbtzkffdn0glc8ooxg9fuz9opku5og6f9c46kyn728in4w7y42aoutz0ztdhsiujd2q4mx9tawwh0j1zqxy2he9fgxatx1qgjbzow3n9uznf8wvz1fwf2e4pwdom7fep2dd2gc8k6gapb',
                responsibleUserAccountName: 'un3kdh3k53haozq9r1g6',
                lastChangeUserAccount: 't1vcvbtr9nvow30xd476',
                lastChangedAt: '2020-07-26 23:03:02',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'agtsuiupzsbqu4bsatp85aggj1s77ckndxfowp5e1wr5rv0l3u',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: null,
                party: 'bnk3uh2dxi86vod4e8t4o3rboalc0zk4bl649uppqm4mtdtfb4yscynfupyetc0ppj9j14xc2qd5p4odthy9trccbxdxiagktsly09xjha1lhv0usytwljrhn47fmp628u4ayvw06u4sr0qhwjr1cvnr2tz3ge20',
                component: 'kyr2or8vbsijqtp2fjrb1p739p1d8hc3pezjgepb8umsd60p5gbz39eqil17i74ce9o8rob5guloar6joat09xv9a9v5lm2ksu0xjh3fydydbm87z33o8khmbwiocndrp8m0wwq36uetj4jnac5mjq0ploauykrj',
                name: 'ilymo7gch85y3qfp8909scvt5j3zad4fkzs1upa8lk9naarl7m6ck2z141zx8a0y0ja0knf2e8onhq2d2ou6cwbbl396c8e412j45tku8ptpy5iy90uy6seijvchs08fy7rj9c7svsvw25nvxr3mwy64fn4tywwd',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '5asvpkbhq9sfbw6foxctmnci0ihqm8oy3vusgk9a07vuvnpa38vm4xxxrdldsbk66su15gmb42dyz2s37tye3tozt8zdchgogj34yk2zs45avxuuzy7a77b820lrfzneyf4xw76ldcdj63cvuke1ejd7xmz4phxw',
                flowComponent: 'xtanvl8geysiajvuweacxgx909ypi4qqwy3mschigsx9wnnyt0lhbps7k5y5h0j5gkay2g2svgq864b54que02iy6za42ta3xay3on2uw28l5nmqqdd18a0e9u3jlu9jejr8fuub9togpn3wwjrr20tfz14g45om',
                flowInterfaceName: '2it1vxqd28fiiqof82db9qrfdobdj3lbm8362ht5iq9k4lplwog7yt9atas2oatp9paqyln1s34adm49uu10uq53namx8djfvi7q416noxee4smptgilkm5l4kpbj6f4t8303eb5o6a3l59gfy77mfnxi7mrz1wx',
                flowInterfaceNamespace: '06tj16kh16zyyhgdmjzx9rrerm6tgm43wv7lp1a5jlgsau7ehrjykhsb4hp7tupknfigyzbnv7xsfw7kibsxtnhy2igu9nivms9evip603fpabrr16r8mvkspkj1evh6elz72hobhw7fw0ebznrme4h2cjcmwqwl',
                version: '2b0dc0e2k7xgjsfrolsk',
                adapterType: 'xwkdiqe6ro3u1z1x0h04a9scora6sup5bjbufdncfqhtrh29he9bmm10hqh4',
                direction: 'RECEIVER',
                transportProtocol: 'abvyurzece3vs8sddco0g3ce1nm2jm1kb9pyugo32i5gkx024txqttyu2rkb',
                messageProtocol: 'zs8dxv1bu6fzq7hxzo550qlnjhoegxhwn469nylnor2oga5glpwa5ahhmnu3',
                adapterEngineName: '7y7tliv9pspqq02ug9qrt9podmf1bkd1kh2ucmq2tabazdjxnifu2fqgrh3430nvgqygqcdawmcuiakgy0eo3h6rklgmsu98qj44fln3gluadu16itbn23x5ywep5ldnsvd3o25iesqpz3jpboyvkk3sy84b0npy',
                url: 'wyevtamypjxrspg3cow9g9jw8aehthw9i35hbgrsv6yamix2xo1qxy5dx0jtrwexbex15or4e715yw70kl4483tmaeg8mtanylbsesjkzydze2drlorx59suu6szw6e87khkwvnysnjqyrhpq5p6vve1mnuc7kw4qd13lkmvotll51dd0q4qhvjcbxuq71evh2yf9t9frr7r6yl2kluczwbrdrdjdkoaub68ogc98a3hwrrk5w8e1f5xwcxypx99718mpuo9qb2k6lsutglazlvcva1wrl8o8uqc26cqrq6k2avogi2furlerd0f2t0f',
                username: 'jzsmdak22aqsxw2k7vqh2adivp86xzk59pm1pf7pujse286sv8y5101kf2w2',
                remoteHost: 'dqon2f26q407qgr7z05er4hpxbri9rebx02br411tyc97n3vli5246xantisu13kkmz12k11o5pqmxh7r3cav3ktk0dwxacgb0op6t4y3hp7gpji3zqffww997ihm7pye5x0zcetk968m6yc5k2xlkj1l2gc4rzt',
                remotePort: 1809142786,
                directory: 'rw4wqpa4lo9b0ab34vk2n6dkzcnu3ilb55zm9cajr4kjnstl9lll5bd6w123zf74o26g5o7rwt69yqetzmpp2v5omg2fh80npdo47o351d6sg1qsbg5k3w4vmq0zchcshl12w8vm9ycvqjr1kh44bda2ydxbbzz4d35qxs411r5r42j3zbwroqxamzzirxwjgessptzzwbw2rmc5s149zy2yp1kxbaxhxzyk8r965nj9hv1b9tzsxzmm08krfz02v3dvsmjf2qmfwpwrlbyyxx4rvjrw5xvlp36mwbl6mjmk4r7ianp1wbmlutyr6rgsd5ni1aanngt4pbq5axiy1fqf6lqw23fxmtdxmdgxx7soh7fi30o2p07583w2o1ps8m7t3dxeb0uf3602jytl81t1lv3cszwm2ibm0gb72n2oybgyf3gdgyqi5mg0joq5k6dp5zug3amq49u2e9d2cl6sltqxxidz9gpswvhglt1m9xfgdf2fcyqcthvcqd6zc74yw1bv0tddl00doql41zhjvvrg4yg03aut3x5p1bs2b8u5bhpbudsc96dahcslf35ketdfkr6yiit177b6d5s4hrwahxs629bc8bp3weg6kylyvtxt0l5eb6gbq8dt857ufbxn2m0h1wsl5ae97xw4yittapa223v8b2dviz5auttjkvuuh3u0s7e0eglu1g90yx5twp4h0b0ujdwppl96e9xith6zn65opbyqtx0i8mvdrmt64iybrjigr7m6wd6zznw7pvbqaf8m94vbsmi90rqnwjch4g474xxv774f6p0db52kjcl9jws8sk5mqbz7caciddxyd8krysbblq0ww70nrpw6hc6u0ymafv193is3jky5oy719vx8usk3aqpvk3t0ea7n8w3g3z3stfyi0m8jk6h1z45uqke9dliog0u34pxfjxicu6obt6um9e5dqnr3s17feg02bbdzr4mzjsrwdrvsrwlq8845l6hbrxim4qng25vcwophc2p3',
                fileSchema: 'cx5zxi21ve95zevwugpfdd96wfgo409zc347o1p12qsapaj5khvd4wa2ykyzeaobaq4xyfop6ryo1qpzj9wt5uv96e73j23hja0g2jx9y4iyynyd1lx5louwik0gzewacg3yaaq9a270sj6k0o8iued9grbgkyu4iq34xsutcust8em7g9zns51fwpzx2i9vnqtnloo10pgkypuuycs3wfgo3ojj6r1vpouhiudsgt9egplek2uwi2eugb7c99s86ki8y6gnxprqsfzwy0yjsh69q1xxdikw7a9ng1a8od1cbrqf76jg46qeksny73yqcapvr4w2a159n9tkqzea71uf3ezq1ilte7npe136tmhhniajtv4kduew5i0lbjth25blppumtjtcmjzp6xc1g4v64b6etpfxhpq5igb6374f54upbl8ox2bgygmx1i7pgft5qubqqonoftj2tqtcb1st25frsiy5llcl5m6v8m17v4figcb6j8yv9vtauqcz84p2gav03uy0jutw5is6rw5e0l91wqf31cxlnckv8tgdghk3pu5gzygrncp5cty0oggo27c0epmjdt5w4olv6sfh3uec64cnhaai6zthhs0d6ozbn999uc3un1dk3gll71fun6fo5jd7y1ynrsmu9nwm0lhoc0wk4dsux6pxbft9bbperdu187jg7b86kjuc86uhtpz9o4e3bavxh9pgmegjgks7oktmzhekem95gaakbucb6qdiue5i1pyx49j8rydn6bsxoju15mlphtfkkbn4d1pyocss72zigkxv2m7x3y7l7lgc2lfd9zbpt4on1dlch3y7xwjyn62mznwxtk25pkgs9jo1w02opnqr6qkzkaysc4ddcf877tjmnxi0qzeqfcdg4pxervm3nhc2at3llfdmnflmfdnfl86xyb7xc976wmpwyjsc1h7knx3t2ftb6oayyw4kofryxq6av84tu3pv3yxe8238xpjupun5o7p7kwscfha55st191tg',
                proxyHost: 'yvm8mf9ef9iosheyeaamm52ohy36nyopn9uzra5z9eizeqx7v8laj4y9p1lx',
                proxyPort: 2035978782,
                destination: '46zjepuur9tqc7uqwj64jk0jgowj4oy53s0w1hklkd1hv7s3oecv9xrtjx3705dzxkmcegkeeu1whw0pgukaqbo07eftgs3ys6p9n1jqqg8mtszi2ghxdlks2ycregv3ibpkji58tt2u8cqd4plu84tb148xa34x',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'dkn44ax5lwbqwvgt85fafojztxbg54x4x20xlg2b7ntayfxq7ihtg3lf8x5mew97oy9hrg05i6s1hajygexk32y0dxb9kzsfxhvzy7d95f7xkvczs8dmtvnsj1xt6ludxu8ilkxfm8j2jivtsejhxjqmrjm3a7jf',
                responsibleUserAccountName: 'ke2fu00gahy7n5ktfsya',
                lastChangeUserAccount: '1w555380r52dqciuyhhs',
                lastChangedAt: '2020-07-27 15:43:13',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '5zfg8nbbj4k04c6fplxgznrwpa5ubeci5uko4f150iwheboefz',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                
                party: '4t6y2ch8vwycok7swbzjm1jiga57vjggk7mxxx1km33lkqcasx2s7e9vwyzhb858zqsbm6fqq4ms53syxd51c3shxa8m6edatf1wj3c8m6uqvdlry1py0k3doc2481c5btps70t85r2ehxcctymg1iwzu4r4use2',
                component: 'n8xjg4getzy19an8z2boimpkzyejpe44rqptq80gwoa49gn7948erv6nfpr2lolgnplzic7yrv0jllprsg7m6z9kq2n9nehcvw7ad159jn042mw0qdjyqtuxsoizoxsuhkviy43dxo8emv1uhvo7vaj5jqn1syco',
                name: '7brwwzybhci0qh3cdqf32cxnk15crczc0umve8bv6ri4c39ykagpwssz7ye4fnjam9ui4k4f2kt1xlnavrvrnk58hp9g43svickj5neogd5uxzh7geo47my0ceu80n3pdd7jpbg43f22pgekss95evczegfx4zly',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'z2eaff6rbyou0rur46bj0vz8uomkhs5skx081jiuv66fbpgevcynsuek95pjgwlr1soaqmfcsx7lhk8a5dj8zgwljei4we01jksooinmylylzbdqyblybltpw8hbu8sp5rcc75a4a2sjuhxzchji2ngwvy5w28xl',
                flowComponent: 'i0g9051g3ioujozvgvv4p8w50cqumflfxccrvp5j6oxzpvcd7arghvxapcvbygnw527gcsocejzuqewoaobr91nywijeq0r9cc5ut140cctohrm5mxavyrpl3yr7226udlzkblz7c0fpf09y46rfgbkakyt9ry3i',
                flowInterfaceName: 'yjidngyuyywgyn0fzp0x87ip30r4c7fb0ijl7l4x0asvoian7cma8mbuda8snl91gtudrojl82vjn7m886xar7yf9q3l9bdkbs29hsjdympyjtcvoxxhst931wt31alqpel3iab0ydlbajcgrodijpjzsq9v7frw',
                flowInterfaceNamespace: '00vh62q88ormxk9fm2obij2fvaumutippybe7c0im2cm6goplhhomg1y3t2qhmne865wehr0vpk2jst42bfbcp7v5hyizrhstjjssbxels4ofjbatzhc882kvyfdypnrmjydz8aot2n1z1yzs0atopge7327u2zf',
                version: 'oaxlx72m3i2k1b30xazi',
                adapterType: 'x6vvzs58f5svvd2tb8nxx0l572kl4mh680x2a9924sszvf2xr9tz8sn0c7b1',
                direction: 'RECEIVER',
                transportProtocol: 'wxctk6j1a6q4c52epxn5gxw1hcpexxwx53rqt5q9z10hsxl2f8hwv6bpj70k',
                messageProtocol: 'zckjzxuywycmwaockmwjxhvhawly8my80rb2yv3s81xxje0qhka2exyhhr7u',
                adapterEngineName: 'w49t8l1hvibfwd04ey5h0wa9bjebgmzncgdm0tr51m1p6zle8w0q2zn57e5puj0tncn7jjne5zw62p903rslunhmmw7bcnlaawmvda130v8lq2gscxy2jxkfuvy13bsu9o63ol6cmh8p58j1q1j494p346rftpct',
                url: 'yrt02mfrcxnmtr03jr924mueuzgpvdpo570dcztpq9jipacc3spl4xkksfpb7uexaw16gzna3rj46kgyxdthradzssnzenr47kyw9lh3m7lut0awvr1hwjzn8s2khvw1mvqidjm374bgxxjqhfcyf4kabzgll25m810kda0aoy6p8vrv0quf3wiv3xe3k9i8o7e4lahi4x9vpu5386ultz1ku6s3tlb1ltq2vvpe5gr8pcpj0mbpa5zbb0snb9ezcwbjvblgf2xrkoiecpkhcgc9oje6a6s95z4i3lwyayvp2gti07n481z58ay2k7ts',
                username: 'v65yj1why4khwq95tcrqy3aptptv0nb6i402yixxckuqic65kf9mcl3c1sgo',
                remoteHost: '3ob3vjs2h2mgjlys1xgsjlq0xcsbsr8w9wvm4i8vxq1pfni23mrbnreiwhsejaerrf39p0d37bt9tlil51mmhj2oukd5u31zsewnb2j7i5iqv5w0h4qaaspgm5jos2vrdj0bnkdw5to8ottc1k5zp9zh2lqan4s8',
                remotePort: 5397868153,
                directory: '5gdgc1e36wt1y65lhhp5nbgaykimdybzo24qzzs3bemdnq72vfu01iixyjnqp5fdxb7oa7tlznrqn88wbbfoy7trj8xfy6aby0pwhdisvn1vfbde00s1k3faenr0crrh8bgyy8y9v17shckusbrihz9gwxub8chk6lnn5ing10yu4wxfz7kps6b2z1czxs0kgvtyzchtpw3anmpotzi70j5mc5xdq4dfmyl1bv9mqjv3wb6vu1mqkuubb2ok40pvesfb7n3wqxptwt5dpdttxvz83w7g1gg40xegqwglhzcz01d3qzkc2b4j29qbb1zxgns4f6mo0bbjitxunyawkhsc3f7h8i7ho2o164njcq3xfwlu3t2kuli978pwl9kuamagq8ublrzu54f8liaj52v28ioizm5agcxodcog9cz5x87utu0zc4p9zjna8pt8m77cj2jcrj35gteefoupikdncg8azpg5bsj60ba4xh6ui1bph6gn9j9wihrhk8gxv38bctsrluht7b9ae31s19v9y49l6lb9oqupo3z0ipz54ou8gwzm56mwb5a7akkcu0ujfmiqhioh3wrlb81ghsdjof1nuudzyiehjn52yrzg57fyxp4tja57f7w9vqh2iliytic4rnp80edtocawszns5028efooncp5vli6ef4s44nmfqpda190rndzp4ups9xwwhktxndlj0p65ywidakg9u35q6ltqrcg1zka3pbz9z3jvykoxxo4qlmogtbwu6mnsrr2hz276kc5foszg3mtwnrimknngprmtxkdvvg651ytc21e8duzaga02mjzxvrluz2geynwecqebhu050sg1cvqnyovf2sfwhsl8c9z2613rpzaummgsole85of0rc6l4kr4tay268dib8prjyoe4j5xbzorrnkzjfnjw8ga9uh3f54xpulk245708q8mw6wc330q3hwldrmuc2f1b9j4x00e8z9k0q1wq08sf0phgtj9dvaqt9dzcutet5',
                fileSchema: 'qs4gmckd7tm8f8ymewsdqo9ah0vuwvn30t3i254xgf21dqrv37b0a5cbfp10beu4ra4213levtm9y4uje0bxg0clooysym44siz7u4oyiw1q32z2th2ha8afjgln4oqtz4gu190ve5l412v3a5q0yalm35akewp0tnjxd5w0htkik32n0lh26rdmpfgnahvvafs35vtz4ef7x718ufa3p9jqbyldbat5ir005u1f8pnfywhklp0kbqqb240zumags2unkesbgkcj0fr0e8t9fro8ybdy6b55ewfok0t2tlt969v3mao6ammhy1t01i4t8z8z2y0o4s4dg4ganui7h20pthsvm3oe58jac3lbzetugrnn0l6gjnu0njy7zjdswb1ho1ppkcrtm8hnm55lg0rhijw325v714mny0qannr7hgyycf5fkg2yhxbrvjy2m3lbwn9hblgndpp1vbalcw0a9899fl25vd35192z9ls84ynk14mlqzvouj4mi5c0tlhjvu9ng95q8hfxzvw81qb6t3xvfoafr5o8nhscm6jfqi5yw7t5eb9igh65836vdzwpzzpcusxmra6098yy1fcdlzfizq8nkuxtnz6lky0j0n1dwlf7szprmedgrb8o23ccbmf25x5wvukhf6jemaakfuszkg3ho9s4pwds71ogehyri2klcpjicp0csmbvabz0flfeu1tlo9fbmdphtclmbcqjmywtgcqbspryizj8zjnjhiydhgy2f8rancjy0qerozopo6a38y2lbyu0ryr9a5xsrh8rjhhttbuiunjkv2h90z86m23gr2y95xbnndqlksexgbpjsrfoqbdlfxyz540e4l54sqn39djhesa44a3vyo46t3y5jvxka4593l0errzlewfmjc6up51fv77ue11bj4df966nlkasx1a9q6so1quu4wqsn4sjf7pqibiutb4y1smlq6chyrf8y68rcg0rd5lmghwiht0d39q9tun70u2vzk8wrmyxbw1o',
                proxyHost: 'rlf5cqttv327kz8qukcrn4zoyohvqjp2pf65h3ggr7379ftnik7jn351xcqr',
                proxyPort: 9134370984,
                destination: 'wcdfbipp5lru34q48rjwohhihk5obcdfvbnubyg6asl7lj7mgjzq5ntv7qw64mc1egmgr16glasot7l0tdnk1cpsh726rakqyvimkgvn3aq05zjf387i02j22uy6460vouwlxomdncih7frndywjaheh6b3zzc3p',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '45qaqsfpgj1a1gyitzgdwnaokbp7zvroxjahad3ql31f3o3snr90aioayjb5munmi8miu7adig0psrgi9ffseiiznjpyxx29f287rw2jzokavfvailczv3r6knhgbuw4ln7djnzt85a1cab9xue77wrl7wdwqvdi',
                responsibleUserAccountName: 'jixwqk9xwrsrca9d68or',
                lastChangeUserAccount: 'wfbv42do77ifjx1i4ksz',
                lastChangedAt: '2020-07-26 19:51:28',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'l4m0r73eounk5ersn85voi84x8n3xw9g2hy8jx1908zfyx7ga1',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '7zgn5591ikqwc4sy85i0',
                party: 'dogwb05qkcfjuqeoq9k42hl7du8cxo2fmrucqi6o9s95fs6ukkt9x4hmxf81twgt6wj0svggqto9wt80gjtctasdvj0z3xwcwi87ollylbgyulso69ajro31dvyxmqsj2ios9vkd0i1n86ycm8m11dyglopggrnl',
                component: null,
                name: 'zusepacpuaphuql78do91h2lsfmnzkvwvn05nqi38cchzjnn1ul2qp8p3ckq19pl9lqr0x8aks6ibw6nwn8k9ralurnhgok38g0qryf53pqpquss2ui4r5q5l23wuaz3hfpb4ud7ylsunh1c7m5uibrfrhh8fils',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '8t88z64sxpvy1fa84jiwfo41xu6iv2ojcfmz5ked4ei3kvmpgaquwur2tgor90459pjaed2f4jsjy81j5axanfvawq4k49qgcjzrjs3akvg75gc2nzdt3bukjzml94kzvvmnpb4xtl7pews21zgv4tlokj030pd9',
                flowComponent: '0nqpqvhbphdqsoi09n5zi7w9c6wzwjqkvgjz92hqlifjvwfvevwciq45w7305a3qhvxcwqi5ba5ls4bj8h1zwrz8pxziwm50efyn3aervhbx3zbbwjqbba0rci9o10f5rs17k4l0fkjcw8ulf6ywd5fgxcxj0qng',
                flowInterfaceName: 'dj6om0f2bk21j3m4ohyxq4j80gq0xzdnf43lwhr0yzx58wfji63vdnivye156bn0dmg7ncozek9jnslr8nqpt95nqwmymonbnnn85iyevmppo1p3bhzmgagdd1bsluidfp81h7n5piblmghz149w5qe57waroggf',
                flowInterfaceNamespace: '5jlzggkbky0kfcvyy6qyqjageksbzon33ts7qunrwl2tvzb78fbr79o82d3x13vri3able8wkwq1cvyc9re8g7hpv1fm7a0kou5zdj1w9ek57umcvff4renfvq7074jrft4v7xdq5y2mjvbfnkun875czlm4ambo',
                version: 'qidy0cie2h8u5nhzmoxr',
                adapterType: '7eb92gdq6jklc7904onxatynvsbf1zcs8pfaxg044hy0a5y8a7wgs7y3fr76',
                direction: 'SENDER',
                transportProtocol: 'v4svf8a7wfwaa1xs4j14fuye6l4mwhoh171xl8on4wgjj55z5nf4k5c833cw',
                messageProtocol: '3x070k432ouhtxb0hqb56ajuw7knfb05a8cyhliitwgnqzubv1lu7paxcbik',
                adapterEngineName: 'fkz463b4x2sjkcnwhvutomb2ebkxeo5r6pgm737s9ew32vc7obpsybd56tpyt6azj78u73lff4axx63j983y515ikj7nhp0okrylchwq9fhby1n757geri7sz642ksyuo6h2x6fkh20sjykowyig38dvcotmnu2z',
                url: 'sluo1tb53mmqiu7x41666pwsfiqwfyukj3rm9cdzylcxm9342bcunhsw3vaegl1ocur7y8qbaof5hkwdqml7jo21v73ji845rkpjczyca8tmqbzu7g4lordiwzubyh6hvenz3o9dppj086ivo3jv6mou5xc66l6nqu0v0omur1xl0q258otjmoajp6ovrc9peydya9mxlnl6hsa11536x9ago0x14bsyd5psop8jsar6bbl8dmtpz8ohv9c1a0xr5hddjalgbl9qcgkoa84qhce7kzmm0t2lc5mgybhttfkcivnjytdd6ga9bxzjwta1',
                username: '3ep2cs4ye80gwsnlb5jwd4oe5oaz7oqf50e1d8xwdzekm7216i78t4jgc1t1',
                remoteHost: 'eapcr4qjindp3bhyhaxbn5yn38yocx1tx9snauhmf9gie2xl84ezqy6kv7lfo10km3o0sbzm2zvhimt3lty0zzp2xl5uk46ffb3mxbxkrp58d76e5a7b6iv1db62esvte80h8dzlv73wse68esfcoknasyk9l7ql',
                remotePort: 3845280300,
                directory: 'lfalj6t5gn2mvcr5wc8iq2y3rv42i7pgn18t098dtzgg3f5xi6t6l6owlpxhkajvjz2i92opxjjcgqqn5b4727a6x3ipzwibue4nrr70rs0ixz36r4dmyarw9r15fni91kq8ajbg5jei19bd0pxa34lwitsoh8a3j9jstw89cyta5skj6gshu8asbe2htyfczmxwge9cpj10qmtfg5v45y4d0o3bl0enr1z2e1hzl8bipgs1utumg6acboacdd0ccbyvbaedrlgbwgei3f8d9vp9psz99ewa32x9hdr9jn0gdytnzwp13dd205suq0hme74u52rx0qkvu76g7qbqzq9eq8wlrmr6hvdq30raayux57p70pjcqcq8q9796d3rldfvfhoau5xzv7y10m1f5wsljvqsgknnzvc3id2j0uh0s2u2ilu7xwm3zvgef2vs139c1641k0jf5wqbxvwfux1v6fsazaes7oh8uk1qpn3y0k19t6tatza5jm51e16c976ead845i21c50lgfon3bqhgp0c5dp0rr4x9scuw7x8t2o4zcpgtcjq0q7b84zitt9kb2t91nds728ztdvsymlgf94ti6y0ddvijv1g16seiv0ka1oqg2jr2i1fqy1a9ujdjim0unboj9rwsurndui7qbc15shnwh1ox3bitpp9vh8it6u3fdn3th7h4dtruf5x8ph4h86t5uqo33d500p7lv9m8s19b91d85y1jw9ngvwzqjv9qyzhqcws8ia0r8jrmx2r6gqg4cdct6tg23e12smxxpivuvjime3sy51wnp5aoboghah38uei0yqn4t5sl0t5a3rwljwczfb5m43uivadobjm3h6vuuyjy54mp42yybi5qlueej3g5df1vmndcggx0ughlyy1gk6a1gc187xl35vjb6nc3ovkqrta2anx0vfr1ig18mqq3ep3nwpl1lzyjsvej2yw3fq95qti3azrf6jnaeitbfbkbn0enzol5usrpj548qi1ijap',
                fileSchema: 'q8uk1qdfftzuwosew1ifidy1rfqg1v5szctrm4mjyzxawy8frxhgwpbnowcli0kvm87w897a4c9dbjizjqu98uln4w3g2pmbnh3nbslh31o7w0sug9ufd2ing38gmuapkr7qtse9l0kaj6y87hsjxwh9yrmzk0qan1slgqdt5kekz5kgwma77w2jv1oqamue7vtjldrpm4kmxb9pjkgpytxjpfudklm1569q44ewxa428khpygwlmyn3fye7rwkc1e1vpghae6oagwnuiljxln8hu11kq8idj4bvphpfzzp4jibxmrzlypcekj6k8mbb4xg8n7kns0ds14pm7ra4j7v3dh927qn8l4hg9t8kuwov5ptkh0ghqlqzwgvjecxg3xt355uqvw5n6h0v0sy1myottax0mrwf9f409ejzq538h5zlp98kf0c3m558tp21a3hdrrt13mknevp8io47p61ju0rgxsqy9y6wyy7vn798za158lj107cifit80x4z3t7s2rzl80rx8hix486wewbmbahcogdl52ni1k6sepay7ujmb5rvoe7u0r114apfsfvzssiqg3jxbhiyo0w582beorkmrrcttt4aig827bn8h5bwbs1pqj7ej7i1kwgpscl0wlm5w5100s9hyutrwyrufgpx9vw5v5n02h1u5zih1gwerv5qj7sa4u9msnhff54ug29pt7ncqnp43mxejth1k90c3v7n5jx1n4udwkuw8oaet9dt1wktz3t9icwg3ba93yxieyi5qvtkg4q8sh9tcrk719p399d58gk6wzc3vjuc2a5ia3nlxuz1pnaz3hs4kyhi89gn3xjdd2qjs0cg3011ewv6ruhckf9l7xj1ywe6h0jszdcrev2jbeuygk0a0umlkd5ej2lxw8xi86f1x49jzzuu7n9ps8yzrvpz0liuzv4jtkr5b727qf6h73k96mcmxsislos7mqck2izzx03mgxw2ahspgeg7axh4a4h8zzthpcvli3rvaaae',
                proxyHost: 'sccjsb904mwpwyqaa15bp7tnmgs9pgzuhiflkl8wo6e9jx5obx0o1hu8geuz',
                proxyPort: 9612470984,
                destination: 'g6ol2shhnk9hhiwi4ug4iva27op8hkt73c111hflf40b0hoh6cxkmxx7fqsaqihj17996ny00xzn3282bttcz0fc315lv1rm33swwpcx8ozjzldstjlfdqp85gh7ly85ywfa7bi6z5usk9r4e89xa6t79cbyl4m0',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'n47ihl558rissjse1vdlc6x55s4b25itvlh5sdhcun1hhgtnwij91k68sz4jus5b5k8bb79i2hx8r0szgi20rll2idzr0c574bckvgfam8mawoz7nr4na855wuuf6ffp7byu2zqnkn2ftygjj7gw8jhs6ufofl43',
                responsibleUserAccountName: 'i4vdlnk0gwf8mqz225pk',
                lastChangeUserAccount: '4172cgol28kh9n9s1ibv',
                lastChangedAt: '2020-07-27 15:46:16',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'a9adl8wrhlkho882d4yryoszl7bhuyouz1isxll4mpmwceir0o',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'qvlq8jua7leiucxlyccd',
                party: '60lw6a8uw29gzphswvx9xdncu94swkcfha9x4y3j242awky5yvl0gmdxddnlkd37jkh6qc3s2ttbjf3fqx2a66tzptl7b7r9eleteo3ikd6wlj30u5keqzlbhx6prcyhmeptcstk46vc0jq8j2l1rmm2en1c9b2k',
                
                name: 'ofgdq8rg8nqbqjjvml3h3e496byzt7wvt4uq17wtm4lf3y3iqzgwjghwqu643uhsrkymiais9x4ylifjmimig3s045t67h65r7vz6lo7sni6yf3twhh4vpqxhntoglyi3z4vf9bbfpjftiowu8kroqxufz0qne8v',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'qtkrr98gtkao1s4faw8k1t53ega5htg45jphnuay8hiyo8paxhjmxvhnu93fkc8eepqo28j3lj2qw3oy7k75p3jvy8w40zcp0ng0apvq4i5q9t7l0fex6ec95qrqcpph8n5664mzeu3pjn5qjcqh4t20b9dabacz',
                flowComponent: '6ro1jkii1adfyo312gerxfk0y08dxoi8m8bgffhy0bv8rnnk5ivakyuyjhwtl69ja2b4cylcvs3qeg73scsmeitdka643lte4fd4172izdoysqmv6rt00ogw96zkjvz0ul7bo6wpcj1k8y54w26tlbf9p862pwdf',
                flowInterfaceName: 'tu5cb5vwwebkhfadb2jm7vjdj7yahh775ioxm0s8aky30w13z6ds36ue68cz63jgtoft0p7jnvbpv825qygy0dqaj7q6bqxkkprjfp49jwswljdr8etpryjptmvgnboeps6qht84l2045xh92xma3demxohga480',
                flowInterfaceNamespace: '8k5l1u57jjp4p10446ac95d9u2w18tc1a0zsuipvgciz22vqeo9wzss7ue5i2cfw44xgyqnmy0blq48k54gf17r2xl0mnwlb5o2xjy8w051p67xlgjm6a3lc3lk1pwburt2gymqaer2vwdni7imds37y5uoovhyh',
                version: 'v6latpav2q274yzkr556',
                adapterType: 'bks3wdrgxzy50esicl4jg15j4qpanvtodo72h6wxrcipf9zypvu0nfq4ya0y',
                direction: 'RECEIVER',
                transportProtocol: 'rsmon5qpy43xpaei36l29mwif2ngvi4debqaw9nl5ai149tx1n3ja853ywsm',
                messageProtocol: 'oauzqjyo8dh1qfhyubz8nvk7dwb8arl4bo0m4f9kt7567f3h99pam2qdd9xl',
                adapterEngineName: 'q5bg2xrxuwmwfn3t64fllft0hme1qo5ad144zj2aeza2ztlcsyu79vuudt09x36n3o29retc4ds741igiwyv9h9b7b7deyf2dn9cqb6esq9tqpy1vfnwj5a85vpi0hwus0b6cjizibk3jf5xcicq76cqowzphrvb',
                url: 'bn9kficg3t186sic8x946ekktjmvy4j3ln17803opr8gcjl6fxg5hbbjpyulbuwgb1bboa3c6ep2xl232uic6vcgza0ma1jevgkkxktl537pxfr0332ajwsca8hwpfva32s5becek8wzkgbcn00kb83ygbmfys5i2s89t3hujw3m3ohg14mqw57fip4mj5ibhfc1l2jxq9igpjjqm1j5ogh2y2won1v81m39788b4vb207pkpoxy37ma0l8ap66s272gdsfl2q5ofo9wogmcbkhv0oub80m89h09hp0r7fqiyadj1fkq471rr2s35dt3',
                username: 'lmgu4g4i4a6xqu3f0rjxemnsuakf1gss7t4vs377offsfmzpi8ij5nb95k0f',
                remoteHost: 'gamgpcp46o5k3mkzbnpih56arhw7sx1dck93wq3ofqozix9g0cjnr4vr9gf7l1lka3u2nws85wvyqa8l4ivppxg65ejg1czvpj56uswwm8tb8d1vebo4jvmkd4mkryq0g6c2ywz1ojldxv03hqls0snf0ff2azbc',
                remotePort: 7372255550,
                directory: 'h1ps7lpdcezexk1nofp7hr6fg4zp3swgkup3bczmvgit7lwx1z13t77usoxhfc1pbk414a4034epe334vvevyanks5xozbc7ny8khipr2olg3bot8s1x85z5xee3ml4l9iutmfvxreuvz39lt3vbb1j2c0urwz8rusqbljteflnv1jekk6b073eb1g7e3691ax50sgmkfsl1jbpuhh4lau25kdpmgcx5xk61cq2qpztvcdnoaceob5r27lka92xp7yx744ny5fka9lm8ddubykae6dukbonwhde3rzua3pnurhtopbj0z2aujzcdtsoqwo6m30l9c093lo8d0xmbwhoa0n33y0w5dsqwwsygg4dggqo8vvr5oqlz6kaoypqr9758mcb2zaguv87btihyedfee4c2nbomibzvmm9wsgq5j2ehpy1slnu1ndxfza8qa2idbo6nbbc6fjgo7zzs5gts32onf9lr8t0fsmgd3c5v1v2m2l71q7j820slqyqn7oylbk2vay1ea8b51gg10ct55buck1irw3opuw9a6vxfukwvl4a6t7oi4xzikebtw71tqn36vu1gcgmhi7gm0z5mw3a3bkm23u7hbbppul2s3by5huvmyxv8xrw64rj35eik2h1iesuup4nijih65hz2mos81e7t9syh2459dz5lp9y1qs734ydjpkqhlw0boho3ktt3mjr4laow587bftghrlh626jf2pduxupksf7anfl4zhe94i1w12rldrljyrlmpx62lus5tnvulb2auc25awqk416fyhrjd55vzz4ukcegtza4f0e33o2tlfglaenmbyspheu8rbgmlsisqo48ci69l8aobpzsuw0gapaq9oputgae2zhj0bt9fyploqhrracbpzd0tvgavszwech7jm5cf8d1aukpsrb0259jo01dx8m7j0djb6grv2lni4ci4d6kspgcl1b0o98ot6wpyiy7d0q3su8v25n3heihbs0z0lu2paiiri2p8hyq',
                fileSchema: 'jtxldg9tg1aujtujxezroygb7qfpww762jtdpxpu5vm37mxh88pjj8kd8eob4wovqayrjtbsbngyir8aeclqeet1y5xjtqtewhnsrlcuhgjecp3pkkcbwzqhw6x9mhcj7hc2rqryxzq6kppqq850vkjnatvvj2g0adqr6l3hiyizqf5o5kx751xaldbie6077hecugaj8ty7k73jgbsa2rd2z4n745pvfvh3rl87qyl0srs46nuikr6uffko2red0loim6ta2hdvigy6kmhvmit278o7x0luxjxi92ur28b37u9l3z0c86rjc0v640c08m59nnx30cieonxs4shgdj5ygmnlrkvm6fmmn0qdpey0ul1317s1rssmyhtbfxbvwl0fnjlpdtniz0vqwvv9l9yr8fx842k6vax5qal2zpkltiusakfwyj0kx4ycthiy7d0mm7jle3xxzw0sjfq9517yiq7jfszb1kxqv4x139ph641v25aqo0og3hm5ol8i31xn067ika06ap3plq3ogl74yfkmr5ff0x12ui4i6pe81tzszyobcxlubdzivh4c8yvwkj3pigc2n9qndb59p3xukwspwvjzjirvvuqgmlp4pa49fclokguaoe7kpa6symppf7umg8wwn9pde1rt77g5nbl80bo23dl9vhtrwyz6l7gehwdut4pvty79zhf7dnmhf950vtfdr7ava6p87c722e11km2tw61y2f68lwzz19mtp2fewy0w4yiz8alwddq0d9e6gm5t4fhir0xk1zlngo1m9h5lnsxt06ztmrh8b2o5v4xx2jinq538amv783de1ry752pyfvcqdux9mghhnfh9g30p8lbmmppufohqqfj43brob51t9upcle69rl6vg0g2lgyq34ol5to2te0b70obloy4suoarmsfmdnv2wr9fs4mxa0c6c2gxb1ipf8vlfv691u3ud6y9r70tzaa079g5louwadbo1515cptfvlxn6bsqtn548ntb076',
                proxyHost: 'ej5qltzccf0g7qpmhbj38u7dfayeuxca1k1y2efytqadtlsmo0qnjfxa1qaw',
                proxyPort: 6451444719,
                destination: 'm3nkej56mwhcfi8d6cdxl2625zxqayw29o82olsarrqt2a7kw488s2qcguxpz72hywe0yhhbp19sny09vd6n3j27r77arqmsucxnhh73igs8lhlh5eu49z4njh42buwptpfryvzw7m3ba0g26m5kklqfr5oe7cms',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'r9lm1fzn2s84y2l6o4e6xg0cs0waqgysow24f5437ejidzxzu2l23ci21lnrxldxkgfa8a2wwcny82efy4nu317ja2fgijv2d5jl0mghl2lb6s7ifjy190sxu5ox1s0gsb0siz8vi0iw36ha4gm4v25u5zgwtl19',
                responsibleUserAccountName: '3efjzz72knoif7anoia8',
                lastChangeUserAccount: 'hwez9gxov0zwge0b61xv',
                lastChangedAt: '2020-07-26 21:37:49',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'apr1u8twobi6v1igu3qfpxs87ax17ekiytji9brbiyv285utga',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'nxvlycjmjm67b1mcbs17',
                party: '8vwx9hseejid1bxlnliao6h277d2hgvkdfdpbijdlbhlj77wrfjesg4w5j2kjirq532auzp3kgftdrcok6cb6z3g2s1nckak0t7070apilbt77gas71h4m6pshyy85v4mp2b0cqwclnhqkq445mfw25zy6lrd143',
                component: 'km2agafa28qbnqm3l4u3buqvd2vmp3ugyaicxsxmid3jo2tu6xskg5ez42dm09v04xxip4tmgq5w3etrgit2cqj0rh4leyo4qh8fg1ruqfkznp4n35d5704h9x4zk1pkw81z91h7y6qlulmbpzx4x84398sfault',
                name: null,
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'lkvu6ovamhunckv0x52jfdutqvd7vi6q53jlqzty5civ7u50hvrgjk05vwtdb97y788cnf0lf4mtxfnfwkl2rrr1do67lq2qhbgdz5y3wbpp8b8o8v07utgjmv53th4enqygko51ah1fshy7u50xtsehw2zaiqvf',
                flowComponent: 'm4jhhswwgic0vserqig19fyind9gq6gfidvnf7s70x9pe94pcpte9m4c96hd69vxpk806wi2sinqt1xbxd3vay0rn1e8u69jjcqno41ohauljicablpbgexjdagt18amsu1swwox4sfxt8t21oprvjz3jqizy3cr',
                flowInterfaceName: 'fa3jcgydv5bhssd1w7lxfiimeknyefjaqf0uhmmon5ssakdrgzd29bmyet3f1crjwj26stcboenvbw1scpv1dwnqqrfrfni0hdorixwrsc5afyv55fyr5s7n2b6348q9pw9caoaxp1lp40i90nc1zspuf4n2up2t',
                flowInterfaceNamespace: 'k7j8l3s92cyvkb1yexny4x8qljpmupowbdh6dv6nl8o819xuptv9g6cgcq9ov1tmp5yttrk5nxd2l8ics2hbm7k80zydupkwyk2x4l4rdtbl9iwynkls4j3rcspz7n08ibptc78id64t9ph8didhxyfkzvtocvbk',
                version: 'fmzfz9o663ynwum5pyom',
                adapterType: 'yuvwrckzn7qk4v5wnxt0rqe6h0we1vdlxab2t5qw40zft7tzmimd0w3hyvqd',
                direction: 'RECEIVER',
                transportProtocol: '4qgu4lf1e2uxzgd97q4jrzv32i285gxzgv3rpshpff35wfnrwjd521vq7f1c',
                messageProtocol: 'cumdlvgy4mzru0beh3t1nipqw72cg7j60th2p6un7b8gwpmhxox3orqt3wkd',
                adapterEngineName: 'uxhzh523t1jfztnxkpbtbzz8nfmgr4d5y9h6c9zvy9u23l3joth5f23nv2tmilgy4277zvuiglcckrr56b5hivtabg58ghpv3ell3hn0qf8x6n99o83ne367la97v1q72btynbq8gwdc4j88avrtpt794t0oxsok',
                url: 'y8t9o7wyzcp7ppftt7ejb9gibj5qm30it1btbnrzcdddg7top7k29j9y7bmu8dhgyvgy11xbrtqpdrtppvrwdwmpfzpv85u8pm5f6z99k5y93nnte79ga6vctnp0sfna9mx1os07r1sujza5r9j2dxlc1bxrdfqokq3cbdcdb1e34gw9fxydmlcftcsf85g2bfvc0v0qkro5jlbe1pb7ff7fkrejy3d99szcyjdooy2j7fuokdaxbwntx4yeiambewdsgdn0wk0ajuh81j68ljjkikktdn81slzxnv9ym1o6mu7wx4w0zfgchuoev4l2',
                username: 'a876jt5f8jludfe5pppcphvu2c0ugnq0jyybiznbu1v48q2kl4gfv6r9ox7q',
                remoteHost: '6s0rn6l0mbfuvua8knfp571f9zlii168n5bhmd2fot16y5kpgl2talkbprq3xomfkyrjsfz5m71lcwwg0j2q08d4ptnel4sq5cqxjbn1k610qovjts1n1dthwbf4nuwm2rd04l41u7ddgjenvdxqsz5b9k0vvraa',
                remotePort: 3883167071,
                directory: '1oagj0ucm3o44wi6sfgekbtszpi8xp9w8r18pnbtjddddrfz9u0joen0ut5sq44w7l5hd6qb0e80d1nckuqyx34arw5yoq8yoszufw37pwpb7eo453iqq0jda2rziehzzlozv84yfrbsadkb9bj7md6e7cloxe10ozw826aw24n8jd2dn95fdtf0hbll3e4xic1owwnqiqqezi5b6dv36uknqt2h6qbije90zsgehpaay7v9a6xk0fs1pkdeiwkglqx37mjul0ae7d90mb9u6uvbpw0esqn8ttke6ojae2gppitc2h8s8y06u05qvi69wksi34oultjrmi27rbw6pzcaz1kx63ct7tuyzoguhthun0p6arnqbbgbw7fq398301sl77420z29x085wqz7wqn8d6qeldqyxzlulcp7cacru3rzbi57i04pngi1c53z3e21q942uqrzepr73bth8aukaeyefqw8tyerh726u7pqql2attpd88gnkuxbf5cdld62b5sd0xwqzy1mj31nojx6ulwj6ji12kjfc32dphqgury8at6xs98povmvalr6dxw8acggmbi8bwmunsrdkq67666rnz4q5rrvksn1abqo1rgba6c0azk28zvm4yp0bbqxk9jtsvxvv73ia7pdzrn34sayy4wue27kruc3l9auia7gxrh9s18zblsq924vjndrekehs53qcjjvyg4d7pwsl8tlq6n8rzoi59qocyyh0sigfpkrfrqw6k4fvvpmul4gwzp74pgsxxs4ew7bq6apg8y74iy4fk16dsnzu1cxxeg9a8mhuw4bvwprolzeajxsaqbjod47n8vt4js3lpx16ipynbxi0zem2x6jh7f9bxtynz3fe8egvvkthtny15ihg6i4e3xua710j7os8jajdp3rzjwh3ulcggmmpzlyzxjl1bikhrevjype7dlbpqnsgavpxqwof0lskalh4pw7lfqh2u7ls0i27vh7bvbwude6hcbpyvu79od4elzf',
                fileSchema: '0fbwzaf24dnrr9t10l2x9agofn2m5w64wcae59iwsgzhn4t0hsaqhzq6ckhu2z1h9q2f806ti3qr88nxa7vqbef1g6ay1j55lb3dl8hcyfuk4i9eugds4kqjpvmy6pvldt4oj4fejfll3tz7t5inao6zwdueo0pa64kbgm286gxl4klwpng7k3a6e6e12uj385ljqv4peu1v6mtc2ctalf762b0e89ldy4wzkrxku6e2ji92iuto8mhettouoeq2pq3dnb93ut92g5zt0jedj1mfiowncmz0h7axk5de7klmrnyncw6yq2rpuhta9c4g8mrm8yy1hgndnzm70z1yynpk0ekybkgyb8z87u594c8owhhztlgiz48k0x56t74xx23bwiizrpvjf67z5gt4zklkbyjtw8rccn7brv7svuzjo620tp0wmrv11mcn08c8mmoewslg5ayy26v9fzer86syy24j5cgugn3wtomilncawq7kyoend8hlm4b6qq8zzx02uum3m8rvg0h2cqyt1a4jcc7urw08v35kohluh7076ebh7wcg8npj91n0s3ccd8s5hjpqxfc3bxfyvkmm8w0pc28l0plzmkahsh7zc2bbh036brlbzde65s2k1s495rsk31lt0qsix1vpcforx4o8s19enqjnid8h30qrolvlnoe4499kgcivmbqcjde4axra84mn9gekokprpnxd5g11kq0ex4q46am78kka1s52s9xoj8erwewtrmu5nrs38rwdy6qoo2sg814fvyjjkk0azi0qgq5s3qfxb95c1h95bst3bqju1gibn9lv4dtd7hesr971h2dbhaa4cl5t3qa1e6k4ynpp8ubfyafv55kt5oz46773uyvqw05ty8ot9c2xkrl5kunct53585oepferw293onbdho3whnjwlgfqqjxfgl63yz6fvwmgxc4923d2gj1mmvd4ga3egsj1rb8xodx6tc5wwph0h19aemnezmdx3oyggb6dk212k9pq',
                proxyHost: 'b48omh59hsh9arl3hpsluqjmtilb9b602wzhegiiiqab11rpudnegq72os2t',
                proxyPort: 6940436871,
                destination: '38q8sfk1nxp0xrx3k723tinocfs23mi6zh2ls5i7tqy9b1bn79axkgcbw7w0aw2oyib2jj35r8nzvbxwprl0898ktvgzzm6enb2q291r8nv2fjgiobp7972apblvly9c0yrd24k8kxk4kbb0jdh14qsxybum91y1',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0593uxxwomvcul85l1try0q3kam4fptysasop9a0z2639trw76fwvdwuro1zkil3lxsytohdbx0llmzdzmsh6xe714kg9t35vjc7f9hi2g0s8arowuzfd7efow60k3kt1fkfkxzqq652bztwol8pg5sjif9uoq9y',
                responsibleUserAccountName: 'tlsnijxlplpc2cbe4djd',
                lastChangeUserAccount: '98ugtyv3rtfb4tqi5r7t',
                lastChangedAt: '2020-07-26 22:51:14',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'pnq7b8p8g9s6lwpspzyvhp1e2rizt2zoyjarepiayvohu4oqsa',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'p2ufdzy8ncaqm27a23rh',
                party: 'm49h55lnmwu63fcfkms1ozeh7gwwzptp40wf6xzasf64l9o32naw9pw60bt2uvmr636iqi1lmidv1k9s5ojp20fu01scdgfbic4n0lxs6qm6g4fgmjz6p8hex3klql72apxgrurimnq44ggozlbmgolpwfjvhdx2',
                component: 'b86hwr6bmmfdakcksymtbtgd3kfl9lqnln1dx6lqz1cblgv4kpj6g0inr82rpmuxl7hrsz5ersyemirx0ty5ctdwmo3dchr5uxx8kpokcnf644k0uls72cr0tlferg6oc8q0dz5bp2fkzdd4qy04gqhsf6zjh1t2',
                
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '5tvkrp9pst80ocwahcaungzxkv2n4msg424zde5qkp279u2erk5f0ljlstuuczbzmk9rpzxecog3eg36wl88r2vpj1zm897v4lhus6cc7pcj7ksl2o3l8av2gggjfxx2pl6lmt2q2bfxe0mjybxplf8ofvnwea5i',
                flowComponent: 'b6n7nghl5u4xc0nmvod3gj0eeufvblb45pdtwewkv4x01sdo50jn3j1ev45dndxg4pz3lb51gezioxugjf1m5kd2598gvqugncu0m1blnkak48h4z5lfa9w83f0m4fwnyfyb7k1ndelyp2v3zdrz0gy9uojcj6nl',
                flowInterfaceName: 'uuoijqp6o8ee9auk08ot2tsgoi7hktqdwnadgmol2zthc8crho9xwflsgx56ub1lonhkakrmkksp44mug6x8o8a5e8muq6z5z1cwl6bm910yl4sfysxscojbttr4zmbhu4dz9s4atms8319mt8ehkgpqffct99sx',
                flowInterfaceNamespace: 'i4916tz2qci6bnf5zu2jxpcl6d969qn6hh0b79gce703vlpkwgabha2saqrnxr2838z7g7lrmmvzly5uy48xvro4cn2d4zt2udkfxejdql7icblzzekdsmmdftfo6iguqgqiqwz0nzf4djtofem479k9dx0wdrgx',
                version: 'x8qdq24fiixmfp06kc36',
                adapterType: 'yvmycdfgls578qh51l594ok0xo062enagdt3507c9y5qcn470dgjvcr52h10',
                direction: 'RECEIVER',
                transportProtocol: 'w9qm0xsjvtdj3g03xccni7436cl9bfz2pin3a7h0k84sdehc4yl75cyl94dp',
                messageProtocol: 'ns05j0ezjiug6h2d71jl8uu5ioouh01f50sq2j66lbhp0nr6d0xq1imzoz9x',
                adapterEngineName: '95bwcrtuaympd3mpiv3gl8h5j642nhgnenv8u1521of1m9zpsyln7tzwr4gx9po8zcisum6n3t5brk8qgyn5b67s7zql0zprqxzf908mm9nhwvyd8jcbpbaoev0i67iwjdkmmbyii4k1ff779nlhwxgilhoyqto4',
                url: '799z6eeq0q8lxgf5cmy3tumi0xcn5s38wllxkkh1fvzjh7oi4kefd5igu67uo0pivekxn97o5cfi97z542x611en2g5xbmo4vycd1isdpy1trsh3m1usxpuyzlyalu722mck29fu0l1qbmcdu6mlr0uxetqg3ms2ojcgchnap3qhv6w862s57hrjjczs7jwtpzbymqtwi38dkmqnzi3akkjf0u6q1a46xrw32afcuc1edlt6dw1b5aicclh9znatgmegeb88fitq9djotiujz8ing8nzne8ad2l2lgqs263sj6euuxm7gpl4opchlb8z',
                username: '3j039uk3zkfvdfasd021dm1ksp9op9rzq51b29d2s9xwgris83igbwf9xdmh',
                remoteHost: 'eb434669kn8njbqiii8x4khxgdzo5kysljr6sk0yngm3vadr83idoco1j6unprl052borf9fpasppx6r6l3rk4uwo581r71nu82dfg7h4g22za0ix5946rvet1s86bb0aa2pe7cjb2p1zxeiwdauxvvj12qiwr24',
                remotePort: 4418047031,
                directory: 'zonhqz85h4s8kgced8xxskb0t44n89hl5fs5xxlxikcnii2nfbs1inje84962s659nymeonlmncqddhkbhsqqdii8spp527b0hy51exkpn61a97r0i6q5gwcbnvmi02h2i4ktuz3330jtzl2gogz56iuh611mmajbqzskrwjuf8o5h5gtmioelepd33uorxyyo4w03d4wu4ee8e9thjk09wm97e6cp84smkka6f61kgs71852iltg3n3801e1554ivtd077n1lsbzkk1vly8hy7gjrzi8eemfpwaus9z7fuxzmmhudbh6ew6fbwc0dyzkcz24g5yh1tps03f20sndff26rb27hduvsvn10q4i3e8mtf79mlca46sfz54spldq1l4augj619bg1279wfxn6tte37pdhi1ev8afkpy1i72tlz7q3vkeebjmwc662g1lucpuuhmv4m16qbzi8f7ge8pscoryy4zc0odridf8b7m1f5k55mxnmglu4ju9kffp87nhvct63jrytj8g6vaimx8y8168lh11pgw8ig6ye8zw0urhexyvdxvc7k5kz0iciskxlzkkwcveguwc4t4k1jv5h9fpy3auxiabd95g4n5rb3zy1qhbnl5ryffpbbic21mye1d49acg03rvfq4dtr2yy8jzmw0v55a5ccykyfmdafeqv3w1cs990q88kxk52jxyz7wkvhnu3x68wjtaipnpe2wxyh55q90k43pk2rr2laurxfd7rlwr4fvkgjsv7oih5ecnuuqb2bmlj0vqzbc08pt1napp5xdjgvbwfrid4zaycw5md110clj9ph949smf2pr4u0wmmjnl6gvi36x37jokxklm8rm10ifmzu37vj1cx1n44tqle5fn81b3g6g093druu0cycg6z9zchooqbibv17bzxzhqp750swi4o3omt3jq7rqgg8edvzft83bs45bdub6ahjhqvhse8cfsygik39gxczc18j2m59wjdnnaqtn1qrb32ws9oei',
                fileSchema: 'gtfo6c2zvpqpftawhe8n2veqfqeg76kkx6fjgk1c3jejfux6ozgx5q2rkldig9lykqi7zdzfblw9ndnpmba3875kvt1tod7mak7ybg9ream15i3zb5udlcs90m68pe902c3war1jujkmlgsjof11jas6o136fddx6qxkjledvs4hn54ubpr3c7z5nhqlkwzxdb4gonztvsprvrcuz7unx38fdt2lmp0dc2ckdr8tlwn12a1zfwjpoli2vrc7tv8f0zxnga2rl8km882bd61lpsxiy0ums7c5pocay7362x3y6i2krhlohhunjex08z1gw0ba59axmydfrow9tzfhzsvqb1wg5ubvn8vf37g9kr41cnswv7wiajnsupy0j8ya2u5hxwssi2gvbb6a6npgtu0m65qlg83ck99m2yii35y7yd4i3dgn9uf6nszuytbarwty2r4w608wl4udggbsedoi81zi2toxf9g7nbw8cd3oxsxdrb3ezr4e1etm2bs2375twgt3l35r9dd7hfosiyip8geq3tm6k9rivlnt55uuinjlsig4aydel9eab3slr8euqqw0rgkt6ti4slvj6k72k69mlyejw9mcj5dbtm5bnzsruxk2lrk2uaqhyb4df1q1lswqi19gjnahq9zir571yn6yo5xtfkil18y9y05r3gke7gtf4925ctdam7pcwkxqp3jfcvzty66w0y19uoepthl82c88sc18alj3zpdbf2gk4woe8wjsfc6qgk8mknpzh4m5yui0eoqdl0o1jihey3dnwgghvi7ltgym1s54lpeeletmwu08arhwcn1cp04k1hdlwkfpn4pa7s3h0ts48vdmcwth2wdcwjz7e1tq0airdo017061pczh8y54q9a1yyg5w63oygnsa80cnkt7su98yy3k5cherdgqaux2qrzifjqhwty40i36423v00or7ovnff3njkouj7klctrlpm7azgqo9hc66rmlhlayz5qfcntjz82al2qpvty6',
                proxyHost: 'obp2uc4b6445hrdmhtxfr85vwmw36eskr30ec8h2f0989u9or08rlsewvhw2',
                proxyPort: 3972164481,
                destination: '8t6b4v0x0bo1qiu9vv06rq7kj61qh1lskuucgprw86qlb6hvv5uj87oialnl6d8zeavlaqguzcfg0pf45vrgo6r5yc971z3m7fvpvis612quedjwp7kv8rp5imeruoesyaurrfrp9gw6zg2gwprnf7tjmt8j3d3a',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8nilkov6wxhnf49izrzz7bdemfmhm61rlxcpsvdf4ogrzvfjkn8x2a79qnxivkhlxjpo64e6knm440jf4hep4knr8l3xo14llfykebvwj01dlxd5ofo31dejxybfdi6bb8qwsyq9metw0mdaageqiz8dtj73leof',
                responsibleUserAccountName: 'i6h5ms3689rtmv1f98an',
                lastChangeUserAccount: 'in53lf2b432tnjxfy619',
                lastChangedAt: '2020-07-27 06:49:33',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'wyxwwlrrd0nsb52yg1sn8oy4sudosrrb1u7inkghjhgl5bryiw',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'gfxkecrdbgg6m3bh6nq8',
                party: '7svidcwt3wgh8rvuj3xx7jm6mv1rlkuusv47mrz0ri34i42j2u2mqq6sjs8x9ztq72zmgpvfy21du1r0mzg2219ieigtpa58nql05w44tesp7gwh1cqvowmc7wb5pnwm3cjejmjo6fabms4yp4ps66t6icu8dpab',
                component: 'l20e9erkgygdsqnsk5hkorovzcxqg1gxr1sqawr25ibi20ymjg69p0wb6ig1rsbpix24gbq8pb8ebyqjm52vxpxoz5h8fpr8yc3vbjejxq2hel45z09qrqm7f4bzrqwtj4uo7e8hdu8mujbll5mpciu2p5e61c54',
                name: 'xyxxlzuxcjg6u57u1zbuuyveb1xl6uo2vvn7imbte059gx1b8f3kz83nogygq2lu8cjhf3i9yj6ekqcv1s2ezx9tezch1q90ai85hnu6efv9ut9edrq1u0snlmu0zxw1xdruzfkzgkmkn9jr8u2ve2zw0au6x3it',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: null,
                flowComponent: 'rkyk20eo8m98c8mg0d7cu97lxhsboha9p67pkeaa4csp7uha8qm6tygguf6nnibhnx1wwgjj6onsd63q8cllq61r7yfof3kxoc62b0j9yjbsbt80y9msn2j25cg8mezni8ovvr4ls0dgwpf2m70se7nkztrm3ohf',
                flowInterfaceName: 'cjaow3j6ly55bbeexwyagd363iqn1fs9myorql1u0ocxu1ddi5y2y2n2i5thwn8b6rtokwcxx10tsnsel0fpbgg3s88bl8se4zl7roznr47uj2qjx76nszemnw356n6rgi0hsmnw8ce05ll2b5vf2znssyoazjt3',
                flowInterfaceNamespace: 'bybxy3m6shoiwj0z7o0db0pr088478z09dm4pgwgrr06lgdqajru7xj3fwchjrz0fb8e6nbe9e8992qw2euhc8ai8r8h2seka8d4rder0uwtourox3bxd3jft2446oac3i8r0uu16gg8tb0hlvj4gpsobzwcbsrl',
                version: '3oplu62q4zrfftnc6j3s',
                adapterType: 'xddolprse55c2vwiqoammo5tgt3twdwhqvxnv5iitwguq0koo5vu7529lu7g',
                direction: 'RECEIVER',
                transportProtocol: 'l4bsgs7o5zg4s40t7iod9y5k0z6f5bt546ngih9v0vm311y21ie6l9gv2a8b',
                messageProtocol: '39xwwlbxk5wbnh492co93hjpha92v2tp977iob7mcs1nm9owj64iohdel29p',
                adapterEngineName: '12ua56uf55nl3n7rk2afm36d28sqm1len51zwduqf5xw70zzday42ljom31gwbqti38ue4otfjghako4bihbxg89b88632xitt6d42fbp8965yrarc09264xr870esywonntx8eejr13jmf0z227n6ri15sgaaiv',
                url: 'wh74jb9b5v3lrql1ob0w5dbori3u0b145lace0w22ayvjvij0joww1qa92nw2ze4a4377utdcji2dbuyzk53usq24x36132sipv2ko31vycpsq6c1059ce54wdifynmesi48xsn29dygx8rr547g4jjb7zvch2zi0v8r68lpml9xackxdjopy6q2091s0v8stl7v8zmrrrnzgv1kccsvy1zytezftqp47f87wa5tbm9oomp6pg4ldoi9q8wo2jx06eu2zp9x3hekpsjddk47zv0nbym55friv20wycch9s811dk2qeyhlct05e7xrvaj',
                username: 'qldm9w255ysxmigxk1yrqkt7g4pt4zmpw7ui1s2yd3up9q3l38w98o22vu7t',
                remoteHost: '744vj53ho68sb8vn93qkp01z1s291ungidjk0lbsjiki4msos6qqdx4z1k2mx1zvadils7hg71p3cf38syixjymwfjxqpfd6lef9is09r7df7nzfhzkxilmhidl7h29qbnf15fb9wg3xt96gg0kmteu0hvz7hl40',
                remotePort: 8647577641,
                directory: '1kkhqdtlrah4jvm5snjep7371cxcopch1jb6t16ngjqirqb318blii5ediymws4vuubv9e67m3xzyb5dya2qz67trp1pnuf3kq8dyztw33ghh00u4nh53ogh6khfochoh2ytzyedifdtqjkk1u7afkcpb1nzvmhggp8jjwuooyrjyc3126qqdgevo3hdcjsjeau2ttmoyylh6tod4yggxpvr02stlu5ucnlpql4jqkvbgnhljfn542n5q2phtme23122p8oeiahedv2twcks4qg3x9c12gt6hoj7o124rkcvy8hmbjjkt28vnfie3p1ul5j92ko007ig6q0x2au5hrvobwszil40if3y8asthrpowsfkh3306ncrm5uvrdcinv5pk3en3wukx1c8t3s3re4zebkdzz5u5zqsih8t176q33qjgz3470dvbkk4g6mxg7mghduhevmrjsinmviq1obetqjfwcrizjfq2ki8kdhzdxiocpd8gz2rdtqbffyzkw524mirp2xsocnngjnk645ula3xptw2abvgbcsg1fis0c05dscvzuqcxn7ai2w4c60xxvb8np1bl8n1wsid3p7k006v353xbkqldkqx3aipnlbhkqocviy1kl5p6v4lfv1y8yc6tfbyzbkodv9nw5bb6ds21mxwjp9oqvzoqfo29f2ijididopab6t33mvm2w9foi3vt2ppvipxskft2vcq1m4j4hfmz4efocg1jt2ory52ifu7sj7l9r8ct9tfcqrfwjak9yd7fihln2ga4j37lo4hz8e35tio19dwh3yt0u7e2pxvsxyd0jgmf17cm26f27x7jhz53dedg9d8xo33j9kcmngfgdkxojuxg6z50qxton1qjn3egpreirus9f22ajnkfxbk1xevi69cpqbjcjwkmi98zq48qprw4bxv6k8mdupedf0llkzf1hewjhiu3f3u2o9eyx99sfyk4uwn7z9vp357ic41m3clcyy4llhyt0ieqyxi0cn8r79e',
                fileSchema: 'c8axhzmt3mrgse65pls1wykivktd2y7utvepxc3aajm1hot6arcvgww3knvr0n9ymxwl5lyfeguncd8eitel4o3annhn7gk616chlo1luj75zfo47qr2ely1ndgm4pkrd4xtv928zk669j8vhd7mxx4megaz9c80o9b6motejtq1cb7a47bivmmlepbe7hhiqpz3tftmxpr4f4bckqnr9xjcg2597apfd8kz9udvoqxleajts1w7sb0vrv6mw8fb7lcjf3hy2jv3rzzwakpywk81v176zypw1qyt53sbq0zowfq8qccqfkfsr3pf24bj4629qruyl07t88x0m27f2l58taxmtwuza5j7mqw92ei8zv2j46lndb1vnjjgdnjln5m4xtdlv42e73ang4ts9rzhpo7civ14cbisgyd6nqiqlsfhnurovddxz9g34wpvar6tl9vplq5qnmgvkf90fqiohggbqcc24363n5d7wdzpxiocm9thxv5y6z11l97bitelrp5jk0opt9kxedduoti4ddarjsizl2t0jfdif7jfcst3fwktoxndtne34vxckfzubbdnmi60czxiuf966s56ah7iz1uui18i9wdovispcbr642mz6mhi8d3epoh8bs9ywlom60pu671pl3ef4vro1uc23oz33wnv1rgx26f5i3r0lg729d0wvwp7r4ocdm6kh6bastn93wej3ngwp0rmpjpoec095uj2ma0s1opnccy53hn2e37e6cjgelx4uv1kx0fkh6v0rkjcufa91p2t6w8phr5qw8ck2fp8atnq0nd7bw1em6p9z6de8iwui3ya24ro7g7spb57lvh43a7nvfd8m9bezxkaaauc7nqe2i0r45siet1pel36zxycmv9m4hwmxqsytx7itnk9j1x7dztf9b3yzeltrf1kcc636rvv06hnf0693tke21oyuhomho4ltjr9hbexd96sbxsfrvp849dgoasjtpqs1qpvu912qe2lit0h070xme8u',
                proxyHost: '9tenjsxv2lup7pliev8ngfxwa2yjj90f0g6kys7n1084t4l0kcbvhg8hvmdf',
                proxyPort: 5231827854,
                destination: 'qj8o19evp11to0m2q7mkvuh18jxaburixyakuzq67rnjy03bnxbz6av5ge1w00mql7l8tjk6r0drsa6zhq6meahh1vqyn2bfxsf9guzpokujreup2i0ol1i1amvklxcpr9bl7qz4xj7n9onmuwo9vbcvav21lfp7',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'cbv4msjkk54z01muxgremwwr5k2e6kaskbzz49r3byv1zr6d54ldmjea3ievyyb1zgvfnqmugbkkkgx62ltqk4tm391te06l3mzkfu2tyj05yzbrbsqa82uesrfdtl9ip8oslpuktjm2cw171woplgfp9t2c85pe',
                responsibleUserAccountName: 'uiw9r0ugmqb0ahcvk9k1',
                lastChangeUserAccount: '2zuylej32x3udg11d6wq',
                lastChangedAt: '2020-07-27 14:00:31',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '3l69nrelke3nl0vdq3nfumyu2vue2s9r94afbnmm9fmjx7g3ru',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'j1g0fiunc5ahmsiex2a3',
                party: 'xqjyg8wtjxfpeupi2vjlrcijthi7rwupn4hxpab2c4wbl9j721ueud9lwad15g5ckdfp0t96zl41nw04b0tcxo1nahcoys27ih49p12f771352p3znc6z1r9ojsl9vx1kxdhr2sxc1qyreb2w7pxepmzfcv7e0ie',
                component: '27c9ccmzdxfblypmdcmjn6tasf639r1q0ua1362e0xll85arnae0g07sh21tn644j3r74i7tjk014229dxz6w7uy7ibu3h8hcm9i43q7pqndx2u8onbdu5iekhp4oz3w18unwquo4t7y3jhe7xzvjx53i1se48a7',
                name: 'qc0qazwecwurytzrt2yllwzn4l9obed8sscp0xcqjbvk5s4rxst0qtax41ui18y0b291s4bj1tph03gaa0q8m0y9l1nzg6q1duxf2qphc8t61daa22manswtc6xayvb65ogrthribl7kbtlxekpmfdnh8q85e4qw',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                
                flowComponent: 'kb1kdi8clpnfptm586apuyjrwp7sjo9ohtcv8gxtaogkxn0ljha07dyqfkzo3cp85gnkxnwft2c6gb4zdmjcszikrdioongkxisq95s0jopornz49gadar51060novk9bm3nnsf5t9u3h5qryifboh6zhb6lyrcr',
                flowInterfaceName: 'bwfce7ifize9bfl8xhf1lz7myymxd7q6zgryoaktx08wqxsura51im1g95a3fydhyvms2sd6j9k28cd9bdjixootrfpcy142rl862tdot6j7tvge6pxxsw85p8ai23fa78bqbzjebanjkj9bsr5cipqrcp47qjrm',
                flowInterfaceNamespace: 'kqxs4yz9w5h0layjfgesnyq6vyhmf2rl3tts90ju3v22wnoo2xmjcm4jspll3g2xn9jwy7peohijvzmc2x40p4c9pm5sqb427k4plkw9r8de4m7qmqbh026htohkt998u81gzgn3l9jped8zv53l54n4v568twcb',
                version: '6yb24rftf8r7x0bb80sv',
                adapterType: 'ecwwi4i3qu5lhj1yob6ljbnb18ge2jl5uxnfmn4tewhvflngs7kgb6ef056y',
                direction: 'RECEIVER',
                transportProtocol: 'l3mft6o6tqp9kfi0agylgcna666hltei3jes9qxysz94r4pg5t4w3m881zpa',
                messageProtocol: 'xjdbyr6j2itadfwpgapyyjr3huq10gu80qnxuxf8fy5jv7cgnvxq4h4c2krz',
                adapterEngineName: 'ig0pkbuoyvy0fa3q83sq08q3t5h3ig0mmnpf1ylhjj8st7ltjcw9ekvoglos7qkrf4d0epnlsfdwqtifvf019731rpxkbo71unxd55s9l08frl1zzj00y1dzwr5stb7l4p1kxx0c0ifqu78jls13vs0jx0tnsgf5',
                url: 'bq9kr4oacqas28cjg7m1u3qtaax77ag0xxz10zlmjfpaw3gm4gkahgh83zx821skx2hwjqdyx57nzisloucv7vs1pnlk6kj9327hxfi90atxgw9rwxyqnk87ljnehmw4p9k9hxda4qs91d7w098cvvlvopqnck4bq2y0hesdelw65wtaq8k1d39yu24rc14a6kkvtz7fpyth92svzcuu7b52ntdqqjgqvhwc3a9li4kppjmx41y38tdmuqya2br3rflmvjwcetanm3vu2m4fy33vecxkg0p434r75wppgjhtf0ne65c4u2kjeuf3k1pk',
                username: '6c581hna50e129pqbf8gmf8dnuhbqedly5jeyylk244zaly5nl38j5kpzdj2',
                remoteHost: 'ms7tk6zb3nq83vopc9o9xos4ohyzm3mfautejy3lske3j2zcuo0umwnje4ekyvf9zcdifgfrmu4orgyczlreosck30ro4jh9ehvhemxhglm6hyfs6fhmg3kllxkn93kk8kzrwkfa4uimdysrd6jwovfaq99i4vjb',
                remotePort: 3511153566,
                directory: 'w3hn0zvpvnf50alwh8q6dqz8wpnqbrsli8puh0245gt6usotwp1b3r9yty6tjzuqwgnq4emc4akcrqsorfa4ha7w34wdim39u4cadvm4lhhridqz5y8xsm06kxmawwyn64jre25lhzte0urmvm9f863sbcpp9zcrhhcdqs7258siwhs6rmu6doxvb5txixho05r6e7477c94fxxdxsppq2x2u8f0sunlz8jfdgzb5el21anv7jksjao5xalu9ejkp90lntchwitzpwrh1iqj6sn7g2mtirdz3tkok4ttg2p7796pyjn3bnr646dq98vukhhm5fcb5wxjyf0w6h2204hmmghanvlnkf4nbnvfbqwd9l7sipd6mjobhzsovzzfnobo8kg34xyr2lmhduexkgqk5yzsqgx7floblmuq12b49sxqoz0gglx49yoq9fkh8ba7mynwtdf8dzweksvscbmb4dc9mbop5kshj380jul6m48k5hvsd4o8oi2hz6v1svjku4w0be2t3kmecd8fqwv4jgjlhkrsyk8vzvjrimd1e9g3z2qbmna9jjjpgj3ofayyf8y8bk6lbvv6ymmb8k6eaojbojllk697psx20fs1t8evc20hw3fjye5pvgcjcijejpgvbrekxhcfqvzkc9hgdbtjfimeki21f6scxwcxxg6v8k7kqcn3tpow1veorbwwu4w768xx1cwbxm7k9qotnr9g4k2ayizl38019dmlnc120ig7cb72q4j8xohnttevrctvbvlueby8il8fnkvnjy0568csmm22fb8p6ogqc66yj0bobkcybdjlxyj75ja1ftfm5su6ibn9h6wjsg02dzc2hg92nskypcqhoeuuarial4e1r4570jy9colxwmk4vltkwn98xb96jelhhs1ffy9df41t6pst1aeify9c9yqdynycqw587rt5y6pkxu0bbg64tdqa9i303at5vd2ztawl29njbp4smgtxmmlhj9nff63k20l4up74d5vc',
                fileSchema: 'ir2mcd4zb9s4jk4fernk7ewmlzud76gevq42yckcyn7edh5xv0wlvha926a6qn9aridppt9255r5q276zl62pqow81wjl3rxx9oq3kd6tuak0wvc4okttlhjwpho6jeh7cyxq1ufo22vfe427v8o64088hdljjye8fijucgkbr51wdl455cnhh3k4q2xmxlcmjfko9vb58e67bnqss7hyp270480lb4p5a30miiju4axepno4py2fj2lcph1xzop41skrtngjyaynextpfpp6jzca2vof2tscmb041ubk88489lcagkswfp40h1y9m4kzw3gpuzso8ie7vera5pl2dz729mad8l3iz07p65bg7eb1o6trmb1xavikboz8c03vrt8ehdyp21p457mrpxkohg0owus0f5njujreb0kngghsfayxitj9n92vos2mt1kz1o73h1kfftv7c2plnob09i4sjlx6zu69ll9nnuox6xb2klcrxux2a9hxsijeembbio5h0iqen6qkgl1kzzeq5k9sc0agnqhz7d4r2pj79nb3wjtexw6va1v7nqxeyem3vgwqk74r6yt8og3g3bxiofm96q7987qu68qso73khln355yif1xiejstasx5preinzsg3377qjp2f9on61vxsiyd6ic2n72f8u508nsvk4rp1ojvd3xcl5hz6xbrh4dzzma8aq0rxdqflyaa48zunu3085rd81bff9m7kr7nfwp0i7lbvn3sxejsvaw5lkqrl5c9uo8nlkozfdjx9q8jopvv96fyr2gdlf63lmgnq3o4wje91ldz8zl0oxd78h2pgmmlm28aova3l9lo1o17t2wz4a4n6hsyww9idlxyljl4ikpr1she209zg6gxhik91ilssy5ike38odlzmup0dhj0apxo1xbsxyrcjsxfuvg8ssnffbl4pk0cf19ljy9e0q7p21e3u5xjdwcf06ckkdcksz0wk4bc1ek3x6upa88sl7ji0hzpvd2omjkhqad',
                proxyHost: 'ggdlulk0fuloerpv98au84z5m3dviiwy5eke79cxmydl05bgplg5amraqq4m',
                proxyPort: 7999518188,
                destination: '896d2je8zrmm6hbq9zqhnz544o0b5vxpzq10rmyw01j5odx2oeg4jzp0a7fs74a43abnt4dzpop34traw2xyccmigu3lfxln0wl2eqwmzcffrix2zft1ggahu09dmlwveqq21dxx2tvmp9b3s406nvne3llo6hm6',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '1hrn29bd6ozki7924qzf7i4dl45u03mb626dme8os3wei1qe92btzhb94w4daimwybwnuzoetqg7isznkpwyllyhrmgl949ol9mwkk9xkg0jbbn2bhavono564mazow54sdxoxaoqfoq9alrkh237ir7f1tjoqbs',
                responsibleUserAccountName: 'la7d0qkce7096e7nexxh',
                lastChangeUserAccount: 'tntigcva4jknk29n8572',
                lastChangedAt: '2020-07-27 10:54:13',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'oq7x7p1er5my5u62i3h38bdom98vy8914lccncz6xv5zjmwa67',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '0on4f1ej7guve10jbhur',
                party: '9wfr2stq13ovms6oiygp3gt8lrw4c9albkgrunbu09kzgvszr7dxt6znhsldwmdgswnmzqfjzpu9i2mai8szywlnbq2on3o5c55e0cwtctkhgbog9qugbutcoflt7bvbqzo4yvu05ev744uyxg7cvqj6yg9ymyjs',
                component: 'ihj1eggab70mrdwe00510actha7ajqq0qhxjgvi0sxskswbirmqqs0vrsuv6qimehzu5rv1jfhaar34knon3igqkfeeqvpx5sakvshhmeubtu913ewaexdra171pub9aagmzill7all6fy968achbv52xxjou99q',
                name: 'zd65k0s2phgbcs5rf3s73g8nyyh8ngvfm3y0c274jiufkw8n7c74zrvacie719j9xmwpkrv5t07lfdabuabobsgjdywgfmty4dy5kdtl7i08knbhk7ytzksvgtuwzrl7xh0tq4l3df02pwcbciz69cboj3jqxk11',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'j84jjjo89yff7acmxoft2dth8nje8500d7y45j1ag3h98yh092jbm3uxj5wn2wggvwgaa2lu3dw1fq9atdny65itv3uv7v50gt6or46e19saxhl7wyckt7fxg8t1eae5gk07uds8696k36ze6zs0hnhepadxs3kd',
                flowComponent: null,
                flowInterfaceName: 'zaebbv143w4em5k6gx078uy9gf2rsyzpc2057r7bxrruntcdrml0b38um5ovtaravmp9zhf4x4d8oelheayip9tfnvrvp7u0o9140lxew72u1skziignfjovlghenhytdyjggjrx7uy3yqipiqqo3mzcs4oybrjs',
                flowInterfaceNamespace: 'g2kc5opwmd6sn2ctaviy952b5trcj7gfkbidaz84k4rbvmm23pgereh60blhz0s0ojwqn4dlm84c3ptqthfm9dznow7kd6txn0jrt5ypax2gmkyvhd9o2qzmz57ooa33tjxw1lzu55rma8v05u3co384slyhbujn',
                version: 'lammkkb9f3dcrwgrg3w7',
                adapterType: 'r6w48x73554mi9cxe7dlz9oe8xc1hhlxi2ifyyjq2l3ou7wz80x84y3kc7ns',
                direction: 'SENDER',
                transportProtocol: 'thbydfxoqxhy16pbww82bjsnjuqc4mkl1imxxwc2umzsk668vufhsjp02tgp',
                messageProtocol: 'rsest25wthwvmf6d8gisx554djm58sgq49c5edd08mh66vnnrayiayqix4la',
                adapterEngineName: 'hlsu4fm1equqjt35frvbmq66rnrk92zm2mtcwniohi6n0s1bvr6bkwhb2naz3s8hop0tcaretxuwjt8judfo6hmk1a181lryxglumk0gdw3ra260bd6tcz0wznb6e93pyti5e5dvoaool4vej3ub792mrhqegq9q',
                url: '3v1n3os1kxilh5tfzgwqgdqdp49akb8xmkv6ujo58ibg1tcoa22xvwzlecxoi7dch47wufi39c350cwqu9lygaxexri7t8g8ff15q5b0imi3wdii713795yr58cyuqr6yaj1ihy71kit2s3ga4lws88zrlse6yi4ypl8t7f1bawl250s7zcxjtfnhy35lz0mbptpo6j80iyrh4rybd8t9ote22zgzk0lwaas4a6y75injvnq5twpwf166lggln8wenbk9a1sv6fal84r1fdne4gkmd0egvctb7u6ijnlxp5uhj4eg1cgrn2casmfk8qh',
                username: 'mmch16wigd7r5l5lnz20wg0iwgs1ex5byctpd45h9bg9gmb7yeepahoi4jp1',
                remoteHost: 'lgk56anjlp3n0yzgn5t6cj5inz98bvjxeml1b74qlxnbophoe439eeyt7ri0s8rffl7v6kiduxgj3thg6mb76qsnxsezbpzguiy9ehnju6ed2f8sn5mooy6ivutu56wxsfuzqbax20xvp07329aip5ptoh5x74wh',
                remotePort: 3779281009,
                directory: 'd4cgftchca1bkffeh1i3poa3vft0ofs3qu6lgcpdasiyy73h7dif20bnhujsxzpexr87k0ubb6h8knrqiwxj18nu0yus1qfp4nmzr0tk3dk96r78k4djv24l066484arree5uksrujdr48ojbudw68wx3babl9pddpsiuyyunuw0nmi3y5cmr0v0eboq5a7gzskhq75stmgal6m4k1gxlutua2gvk6vqccfgx9ofcy1u2kcp0itm2o0wk54vrvbgwiikwuwiu93amsmtetkjx9vuc47zk0n746jhgxjbsiu58el30r88fbvwrzbi2xnua57vbgp09mbulfs5s7jbrbxrp83lil024gozm6w44v2lpam7yfgttk3ihhfcfclwyz6shn2fnqop75vqink3pe39bkyk0h8j0qi0sd7hif97eise927bu1726ab99gho6ovif7j0osggob8rfttm6vcmwu1eo97lhv91na0htwkqrgp3ln036k2a5f25noxzey84memn4aw3qe4bmd3uh6n0k98b579pxb4em1yix5y1cgobwtl4xmd9e5sgv8814r2wn574qb09u96hru1fdzo6h1nluo1estip8dykfvx6jp00n62u6l2qs3v8f0kvfpwte2ghi0e6yh1h94whc8zs95xqbae1c8fannzrhghobiaes6qc1x7jhf6u9epui7thsicr0cllg950yetg30s22a40n276r7kfww9oty251m5eya8y60kqa5svyat6yyqeq49byo9uqfsfi2x7wtlb09gizepd1m04hwbpn1oh28k85ht6x7nz7xc9fand40d2e565ti21jvx4be3y6dpk8bv7shw3fep3ktgcg4ukf2ketbzg244ql8arn80mci2ndpgyd1czjaw0wi49ddnx2zffk9ua7bvzbuzx7d6396sba0s4swsccu3tm7pk104iiaoh5e90yrek4xc4jfhd8tdad7tb639osfw0xwt0hlfumt92vzcd3k4c32bb',
                fileSchema: 'gi8r33ruvgvtmabeaxisdfyh59h2xdzmamczrsarru3v7nntagt7hc19d610nmnb6sj9hhh88ctbtmt45e3u95knfot43jg3b16c0s6gzfh915rg27n28yo3tf7gpgz3tubraewhb78b1e42tqequcuhhv3curmg01l2nsc0c5g4jxjt35z1vhxcx6o2t804hf531zcmp35p0icmom1qzt96052jmxxiugzpeufxktk2ud0u1kt7zjqbsd9lvhha9yzvx27usw51ka914deiedqff0me4c8ctdv6wj4q2nghxy3to5k04nys6wbvlz3qtjie2mq6i9i8k4jdul0jm2d5l7ya1tl12md9jgrxzya8t9u11169l257hbk6d85ldd2kinrnj6wpubz02ocpxw33nt1aamdb59hpjv5fv3g9btmfi3lt2vd4n78ojhuvhmcll1k4of0ku24rcc26pwziviczzal84lwsrxkd12zyswx7cpubgaud1ue79garkqchrs9l6399ldkjn2zbl5kcy6p3gxtv0cv7r9bbhhtzh6av373fm7miscclyknp1yv6yl3bueb80ukyd5bn1z0xf4dqujhg7op5jemt5zpobow2bp9r3x0lfrxr61j5cw1rjcxbw9vcht8wispu776ghv6q2rq5y61u3ay129n24nrn745bnmfid9sbyaf9gljr5t1b7fprosxakoefgimnebzno92glim6bf4x1v8zj9gvpr6qn7gigasnvkcyzlu9lrkgjb20h9ogfuy3n4vpa219vb2ufq7dmz9am7luvf926cny2hi55kmuuajkrc3f9eahkka0y3bilei0m65p5gu93smys7b6yc9t3yjmzct6ya6ha3zx6iex3z94vf7qrmm2au61ref5b6287rjku6nsylfb1p7i43mk9x9cqqgshf0ero6jc2okpwp8iprwb2gjqabjv3estssf7rxxj8cdoio3q9bkm2yfts097i5r771eatg4s4hvlwwe',
                proxyHost: 'tl7dy6m84w70au9ssrwln3e2np7z5pruozuntj55tv3tfcpvpousfinendz9',
                proxyPort: 6762284302,
                destination: '1bk5s29itnsou7z509mi0yuc56fqu5ndq59i7wbxvaoqm1run0mz67qypp7l74f7034spqdb15jdr6qapzqmwlsc8lqjfmzenygfbqyp8xqcajlifworkl8ys8tbjki6fy3mt9t6dcsw3me72j5kagmgfmy64lfr',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'ish8xo2l4uasdnk5v82ioqyeqhhmj9nnu3wten8cyqydhozagv6n9l9ci8itq8qoxwb6jwhqxzt6df8wlttu4r0eswxpae8h4yfsrez31o9i8f3cnk3ri0i7xwy0a4dorny2dzrt8eqp1uginmesj0ksa4oq8vib',
                responsibleUserAccountName: '71uq0cl86155gaa97684',
                lastChangeUserAccount: '32wdlh1fe50oq41egu36',
                lastChangedAt: '2020-07-27 16:18:05',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'qku9dhnspcoupfwt63k5qv1392r9m1dr2dovkljunkpafji9nu',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '9ocdydbkpcn0jdydd186',
                party: 'o3ab7sysqs9yihx02imoe106i3xqmiv04qztmdrrayko8zv5xad3sa0admc7k59p5wdv4fn431a6gsvav9qfaabsyldlap4d8mtk5yhvzrzcj9u2cl8g7gxn9j6q21qvvygmj51byg7ss59mc5xwhwdakcuvng2y',
                component: 'et2ucd7ak8cvl2hbzrqqtu3e6f9toq2egmepvxzxbm0bb2a2zw8z9zf2ly1kfleq9ia96quvnydngj3e4ucnrz7qab4wgcvdh6ezri00rwkw76x4sk655b1g96dsrau0qkur6ygzm2p35f279nrp2wne056zrugb',
                name: 'nvr3erblwbv6lorodhe6t9uvqg8syofd8gogzty38iy23vtpi8vg8y0c65aak7a7fnqmaew137a45aj6zxtttvsuei7ifk46hmetafaprb5w0k4ttyg38beh09usfvofer92hwzdfuin1ew4ltglobotnqmwmgpk',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'g2hp095463ynkq0c58zgb2vkw7au3x7qyk4ves1zff7oqp0qc44ukx8hyf5gqfo7d5otzwl24k3yis2xijsw9grkz656zk5snd3rbfpcbhsqocxo9t1fy3kr9kpox9n2vzw2ii6j52dp47ax63bcbz2ne0tye9k7',
                
                flowInterfaceName: '0e4zjpfp69z6yo03lbjoxyl7xjy92q35txy6sgjdq5femza3596xi61haahfoq7bluzlbfha4l593adu8ev6ytvs9u5l31kbw7fd4gzlpnhkcfw67x63mvotjs8zycfhs0mos45m1pf9zbpapppjeuk8xiv45a0q',
                flowInterfaceNamespace: 'ge0lnqu712ewcwh8x92vcktae72tyd4e4ymm1vvfo1ozu3e0wwkgutyo4a0ps4y27g21l2onziecz4otfh00eisyka7qr24z31qv5nhjdd7udkas3w5b8ypntikivubzfw1wufifjk3cqdoh2clp52p45y78h35c',
                version: '6bvtb9bzq1e0wjopclpd',
                adapterType: 't20ols4e95h1jon0cwwtphiywngts1szgkucy9usw98ikadzz1u4iyh1z6k0',
                direction: 'RECEIVER',
                transportProtocol: 'mo5h81xoszuy9jyzevg0d7lmfxkkeiieg23wi0bpf3cbg2zvb3760tnaei6j',
                messageProtocol: '8tkuiwan07897w32mnm65lr55sjov9dm8syjvpgj7ves715mi8z9hyz51kdj',
                adapterEngineName: 'jkaffpio202zlh1svxia60lyjzfd8yd67f0w5qtdilrsprx333l7ljiwom496rqinef1ckzxh3qvkr5oia36qvykao7yrrij29xwkieavjyhfca0mcfi05zzybr7bn8emy7n42ebr6uxc7mtbq8vo1anex18ht1e',
                url: '90rvj9l9985qz59c7lt5opit7rgg2s122lw8ahyzsqa9ubcs6gebtvu1w13gml9yb3ds9vgkde0rb5x2qn4twv35b3tirlfw4p59ges5ezm99od8gz5spwgn8pldznnxi20wb3vxl56ymzxva43try9q506id9y8lyz9tsv703iil9amhhbtnk23wk801v7gs7ksxvzspnwc207yyjqqafpjoejn8l54nkuzr5go0owgdksvpmjyimb2z85jlpz5kpi4w1m7h2s2rvr2qgur1gc1hwz30gnsg0xk1zp9sjrns898ufvtuyqr9uyv1sbp',
                username: 'uqksq5dtkqjn77wufdrqd35ik0j7hmaukon4y03pqii5tdbmr0twna13y5zd',
                remoteHost: 'ct6t75acbigfjwf5pl3rsovgz0dgsy884qkmuyd4yff5gncmlvyuxiemwn4cc1akfiwaiecu56u46noz9wm3997o75pif3rm7xuqd7v5ko64rbz45ofi30o5o7xx9ntz1jou33mcr6akyoaz38d1l6asfc9wxk7l',
                remotePort: 3264942078,
                directory: 'f21z8qdpm7dr8tzf8inicx1k7wjntjnh6uos75i327lfr291zxf6jrx8x6vnvbvoc44gzbx3paou49kgtxnd7vjfr0mv9i5eixwkp96pjah2fgkx9qcvl7obhv2osr9rl63jh7ei7iybe7v0k4hsfib7562meyp41u45xnmcqk5yo12rke4k4niwk5b8pqu59n4eetkf0o4oy0s8vy85a7m8yyy7xgn6w93gdestu7lyagscxccxzdsc04lhjoqwdbuqfymxuy9mowum2d79b8seeh03mlm80tslng5mkmcp7gtcq37kh7z5u850213tk9qxzk995eambreu35wx9ite3f6q4ypgi6pwqjlcjmuuz2aht7pc9j4gq78nzkeh6mmnkbri62zwqzv7fd5nug82nzpirpsx4dzc1cintu8vdm31tk7v720vtxfbfku7krx6w9xc1p5klnifbrkhcw6tdqs5fi3ghqqfwmbs26sn5zp2aih76zxr87va1c8kdbofbqednp6fjhhkq1ymx8jc1prgomii2rrccqhd6rk20iaudxzegg0002s0qro4fyfm89dlhnftneokth0na9qfper3in6tse3wtz6ycneb3cf7doa4o27cnrkxq5ybwcn7qtibnur5jd3du0nk88cl1hi4qp8vcpkbr7eyss6uv3urk4b53h512jy6ms2b5n2huexjofscrrfluk8wm9x9zcjvztbpwl92zlwyj2iijyru30bplygq1nru2idqyay5n37btft4k7ymdv85evzf4revwme7aohwlqltq2dmsa8t8f3jcka8aq7s3ddirg3xy7ccrm57e91gke7bcs4gvv36hvil5caumwhrbjz6y653sxo062yrrb6eg1fztewrkqm5uv7w4lztlnfzznlbb83eezkbcqhnuhiycfead6kl9f0q0jndxwqfwq5l5auid4qtp763jjt16xwzkt939y636xu8sxo6g5qa37gmmhydr9vqonzc5561t4ar',
                fileSchema: '48upmjzuf152qg26l7nqr0w8ty2a77dk46yxev5xmw9tog6pglszq79vuy100ls05217y96f93qgytzlplls9wl0q0okbdolrxacoslwosngzdpbfowlh3043f65n12nh2uax6i081lsbzjbtcxzapi3ufmuysxdh2hrv53cmekflqkkwln6m0jvt2xmmht3yj63gm8tblt9niukdkm4vxviy3h86mlxtif8c0f80pm7hq3tiewp7qpsbtf70ryr6o63omxzuhotu4hcw4vu9r1calraduopuy2hmwufhg5hq1tkaxzv94o5kbt0yiamg1l1531eaobf83eesyxbfmqgcl74vvsgvqpm9fm9rc8a74qr8wb5os7pyjeste95w46u5pvzm4b95bsn4a7xv4w9zkpaq5tvawsndsccw6zghb19to5adfh5mq8fyv5bz4oflbpl64263ns3ybf6g3yu1gs0q880ihik6wjx7h9ri1dctj2aik9dnwj9vscr6wz8ckd9gkucm7o4oy5dpftbcdc2wm0zv56kgutj9yos3jr8fy7kmeh89wzx2w6hd5ny9c590tfxpr79mz7b4dj74tex1zkv581bgo9cvfkuqfu8otro0mxo2hlql6n9rxsxapog7g94wv2fg7z8y5ew0cg0uhq90532nr74i4rmv3uvm6so5vmhbuptyonitdde31r5ovaca1qszk8b1sl0l7nv07x4guq8neh7sd7fdzh2uk8wh3ll0xdw3f44swg1sm65nh4qofxxygilghpmlu6x1ihwqm2p2pkbnjufrxxwv72yfhwdh513gbhrob2rm120n3czm2gu8iyx5ws5zbuo8etstesxz7sxtseql1poj9dpdfrq0lhk07ke9knism2zb0rs9pcw4wa06tzvlubhebgqjxgtq0sqibjar5exlboqvyqpypjbjhmamdrm3v03asy98njilfe9a0rhxooyx53s87fb8zx2k1yce4kwao3dulu3o89enu03',
                proxyHost: 'zfktqt2v39vylj5tx9eg0vrzlk4cp1inatueyjs8qlp6lci0if95j9deguvg',
                proxyPort: 2099512454,
                destination: 'fgd477oh1jt60yxoi2ojg6yh9zh9uco0m2d2zdq41nqbaephx02tp5lku445cwf1p4073wzajhcbaukx8vm43jqgx2ns9osfxnwk4jlkdf3tpdcghl1m73fu14mad9t8ubkw0hc40xm9k4zmysmcibbdg6jr5bx3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'iqskf4ufn9nf9bvallqdamdzxonwsqwyymf6jcyxfptvtbmut0q9kscy3z2izgpfvaq5gloe9267z1p7fndyiglqw4eic63wnfri8vkgj0mp9s9d04874x2ldbp8ju72grg515mskww88spnxnsbr73d508jgtan',
                responsibleUserAccountName: 'r1j9ngukofc2fu0oct4h',
                lastChangeUserAccount: 'b2t3g1fi987orarnrp7i',
                lastChangedAt: '2020-07-26 22:54:49',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'psspejg11w9jhg785qcx9pwzmng44js6omzqsauieo2xorqary',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'pz7u4sjns6n8wpnzb75u',
                party: 'cpbbbo56a2ydhug8440nkpoc0tz5kuvwxamleat18nil215wd687kls9449jltixcv0v5o2p8xk3pt5yoto0oidr60xb7ordv1fl13gfenr675n7ydox7r0md38yzjw8gca50f0pphl490ys4qrvst6w5fmycv2w',
                component: '7k70uc685u1yxzi2v7rxtskif9w6f6al92e6nj7wkjrjaz0fxkg531yqxdryu7ifscdcmybxejc7cuch3u59a7es9516ww50bqkidsw3sbz42b1gbuwxg5tf6zsgbm0zkt6u04gnnq233e4wur1o4soawuvizick',
                name: 'ijgpgfr6v3ea5q4ny6isy594wzlnfpkme9lsxqvaj0qud0mo1q0nyxypwfspc1zcnj866rl0ymwj611ogctev9mx5zeejch181as4xebxl03k4emqvhte8pjrebhhtt3p00rkruduwcpfhx66rjt9qoio62yj9io',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'w40jn48nco5w1xr1zl2tymx5hgl12s7ch71h4kr0o0dzc61a4e0fp7ogn38uxomsmmlg4q2sjor4ruxnqxqa6in9ili6o2wbmgyr4yorxymne066eaiwckbla49715eg51gvp50rnjaz1xer81cpccygnzphhxl1',
                flowComponent: 'pvhh0n8r59u1a050gbpyz0ikswibmsry1l7ck8wloyzcqihivk92qksviv4j5hjsnmnpt8sokqkewtp2a5ndy1szvs2su29ysvc7jyls7czfhewbvtnmpdp7zl0t1h0761d7apn9zfrk2j0ldl0uwni3a2prv15b',
                flowInterfaceName: null,
                flowInterfaceNamespace: 'sjoittgn4k0z5ecogrh3oblp9l2tvjad9jkrjnh7lfdzdjmrvs7iionkbyfxoucayeqfqsxj0na57uns8xll4hsxctsmz591u3mufzlm3dzboqm3vzbbr5h50ouojz8yzfgzlmld56cth2lwodiu7867en610ke4',
                version: '0aeyvju1389ydjx01eix',
                adapterType: 'z120e77t21isory98zgschtnuhhok5sxqqs1cwbwya6j9m3o02y348mjp15t',
                direction: 'RECEIVER',
                transportProtocol: 'mf0igbw0xlo827vfeed4uaaa6rt7q53vt08nfxaxew9kocj4hz2fimboghcm',
                messageProtocol: 'r9iabpotil6t62e3srg9xmvvj4p41xo8hckq9zhetqchb00n850z0nc1rfo6',
                adapterEngineName: 'bmlpsflb5oabc2c3ofjymcit0xh3pmj1kugy8kj6k8j4xgy0dbkbkrd63innrmbkfox9et1qog8p9gv1djtpuo7zfpgeeapchvuu2oh0tyrxj72xbov1quzftku57y8yfay32kip51iongmhm8vqd3g6wxru3o3c',
                url: 'k0ptdkotarks9zzinwqq4khzvvvat5efsz9w1isn3g5fk65roq98oknma6ik2xjdi5cz9pzah4puwxjyoksqgcrj7ng4q223cxsxifnpcqh8d1vbs0qh1h5q6iobwv6aete923cxun4igk7ufd1ggpn8gx2nyzj38dgd3wec2upv0fesc6gmlbhch115kqa7gszjmt9m7ndtz1kloeg3piz7ej3s1bveuya4p4sev395jsf46uhnmlp4dijwy8fsxjebr42p865bv5ih49f10y7fdp7vsxij0yzkphnhhhih5szpt2zqvs1oz42g96d6',
                username: '75nvtrs98w380lcjdfenvk372m39dh4cowtf3jila4ah9yuf09547g9vz9cc',
                remoteHost: 'kt087qwdz9puteznzhjgww9lc8jr3osyqw2v39qaweztohe9nowgcj3tirnboc9nkcwfx8ryb4hk7fwgwc67q7hyo6btx5iadwjnjv074ys56mbotcy09my8ahfwi5x8cnzh186fjn2h3ujeworeke8xl3k4vcpv',
                remotePort: 2199854026,
                directory: 'wdc8mwe5hwpveivgderdf25wnexzee1zldrr8nw0j0nks9xaz8k7g7xhkuev2czkotu8ab2jxrg59jur8fvii1xus9ngo5evw0vlwva1wd7tjda8om760t1eo0ojps6h8qyabp5m4lycnrcigkvurg4ws2216h3f06s5wgy1yh0mppiap6z4le23bz65gd1pmfrw6xi115flvt79ssi8oo1f59i4dilza5cvidtesdzfkgtaufate4tgfz8wq1khkx6v3npbq58yygwwg7kti7ebfd3jd56dilvmyhumjrk9pdasylybb737xiv7onvuwgudoc068nxart2z4izhf4cuzoc6s6z5gjwbfojjwg64u6f2yv1ie1da16ekws9d7r2ei4z5tod7nxo1ev0zxmp41kvggyh5lxx5gw22hbv4bci7efg0om9zplt0gijuntch4i6gtyo76u0lrjl46oixaeh9o7hs3271b6eee3fp3i4mf6j5p5449is7ol6us0hp4a2gua2x25wrqpb1bm5p9jpf3pdign6jllnq776nh6u5xsq6y21jh11nv1dg39xj5xj3g0vnwcw6ur8m6k7p74qlce9bef9ne3s6zobcpfefbewllw4tbbeykmfp6bnexrum3ws51jln6ixnttx356detss1uvczeukfpo91r0z6ot2zbujllmgiei5h8w2gqak0ged8k1hkqvn9coptdwgqeizivjajf0x32ulg2udmceu4f06rm5japn4z61fgdsxdn0hh1ahp1vfpzbjmeh7rfi1ts5aebx37kkomnsycer6mh528rx65xqw04n1j2z88fjwzt4ti8kw3950ulepwnlhfsa8qmrv3rtjq98j952357bigfopakli40hzatxui383j4e5mlous8zse4k0ic4vvis70sxuvt8x8siz99lavuozgnbrmp6rp0rvyk7t73zknfz2dj7woq3hs2l3kv6witzvmkibdh9p2mn8rwy5q7mdwq6mxuiir',
                fileSchema: 'n15ayn4jtewg0ncpdpxvpgya9fbofqxytipjitsc94nywsrx6kkxv6o1zmqmpciofbjwdrhgqm6408mv9k4ocl92zfczlvbuf3dzzlkv4mtbfxkbb5bpubdvgrv20z1tnixahkerqwg4cgqvcw9fr97f3ihgh3lkw23uwd3xs5zm7zpna76q9n738vmeohsf9ckt40r4s8jh934w3i5i4mn8mwcg00448s1voepyalkeb3wb2glq1zb7uws7fd3na2sohskl71m3sjww0aaqnbdi5c3nvg4j6xvr3d82y61xxw290r14o2bg9kvjb19wogtta92i9yz3dccb4qgfg8in2xubha68g44nmo33m80lk25rtnn23mcpdcoqxfuuwiu0zv90b2hczv4y0rkqubqxl005kg0nbaqbf7du7jmlyou06hy1hth8gq3xjeehheha88gqhhxiqlvghhwn3sqsylfv6qppkvx9oebnzs0jji2zi3r0xfj9js3diqwp5y6afd1mpvrsubr62tzaamcxru0imsyfum2oh59k6n8hd1r7zkn33w1f86h8sm55tsc1gfr9036t6w49akr35hc0l1k63amhqw03avl5wsp2w60h1s8qbeu9gq6bf46rn0ft6genvjl2qd1ibqvs7xj9wtcvkojqcbxafaki9eu8wk0nq4xg50362gxxk62bwwctw8ogooumgdlq7gxtigbuca6q6amglf016bn10p9iy6h9xvpzyaik3g6i5s8jin8w3kaak07qd0v52pyay08w5xywyz1nqty3m913umy8qv5u6hu1gleurb1i8hafqsldsnoz4q8e6h6x3dcpxebymyz6rkmamrlxaai6dioqgrw0qygv4mxxeroe8zyasaf9g7hhke9wdsjen4wbxez58actnogdgzjyor38ytmnqrh6tp3i5nsuy4m1xpmlatnelobg2yppqw4754jbpg23wxn8yrgw69epblin5rkgk0i4cf0kjblofcpy69ai',
                proxyHost: 'sz2rq4p2tidaeg2asgypit5qev6i4g5ir86iud0lkh9grx7cwsa0qtjs0w3q',
                proxyPort: 3450037714,
                destination: '47yugjm8xrv82lpx5dxumfr505zt0lq2oig0a9p1h6oubt9ofvfz0lk2bzze7a5aidi87mpppqutcnqmibmbx311zcyxiotf4xb7mxjn0lx6dkxh3clh6ig2zw42xcmsb01hmmok08okj0gllxo4xrn3rkmt6e85',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '025l2amxq8zoe977fecl68h4bcpzsv5urhhv1rmaxxnrr7uww9avi43awufwb1h8dzx5gzwc2amjeox9xomndlmakmgmgatdhxnhtc1eh31mw4e66wktdnygqu7h6yg3pptjqd4u8ke9zpjdcx7zpk2nyjlxqq6n',
                responsibleUserAccountName: 'kdbwdqivh4jd07lbfyza',
                lastChangeUserAccount: '1ke69v3rxqwkki5062g9',
                lastChangedAt: '2020-07-26 22:05:44',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'vpwqk3rp3uypo2bnu6cnem8nq3uh72hb09ojy7qhzia1mf9hor',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'y49j7c7edvb0jcv3mykp',
                party: 'lghynbitn1h2eb2zf7fz5yvc990rku3tsvyrt8y0gfmnfr3u08i7nwzvww5q7pwz65md3fn23oumc44fcrbpcg5owrqerpj34uk6omxy6fkp2hjayvdu8mgbs9y5n4swcq09g5k8d0lk3a8k2jr9l9yafhjt8o36',
                component: 'z8xnbj965zrtgjxyk8cw5diq0xmac1hs53v3zio64iz4ztfs19guf1z7l8apiblfteylnggu9dy5g05ypn3qv36wahuw5ytnydlujio11hqgn6k8t1a52p7ai1dtkum8ljaepzenou7km7ysbom8mkt281h7o52h',
                name: 'upvqvfw0ocj2x9l5rzkr429tf5s1wjx8sx6tfd0bhhs2uj5ntjwhiy2cef9nvkv7zk8ll330mg1lpnonjqzhy9n11t4jiyqod1bfv5a0kckfmjed2d3fd8r7jagk3qprhl3m2h335l85iv5eccnprtv1jgeeibt0',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'du91ekhingz62vdq1h3ax8oq39pqumh76adhzandy6uoxi90ql19k2knmaa76d8y3lftwea8lc3juad3utquv5s1lbwx0whbfuyfaif8ok2zf42lljzg64vwk9za6fq9w59hz7o9jeakxmob39xzdob6nt7l7pqx',
                flowComponent: 'l5l3motclo84k433043fol1znijh90vnyy65xnckf9fr7siq2xeg447rs4xwg7wy1jss1obzzlhkmp5zwhnoon5b4ikik515ojqlij671fky1m1p4k46dqn89i1t8zc25wf0p0er89cc6mwq6z7xtzr9hz46h1w3',
                
                flowInterfaceNamespace: 'ozdji70do1hjpdm6rvaxzal475o1ng1irdjw0ptp3dq9tde4l2s0l4l4lbi40pbz9vsobi88kts0mto7g4z1ecqbf9y5f85t2ck00dlwelsqhiobvsesmeailwim6shrggilql6s2ik3w6xmgxrf1u8a6eh9fny6',
                version: 'po63zowxzvotzro48455',
                adapterType: 'rsel65j12feo6w1dkh3qg38kb5pab569e9vnp2n48z199bo5zh6v23gkfopw',
                direction: 'RECEIVER',
                transportProtocol: 'kcw0z7wzvsyvv942t70ceek1n9g5i2pwtt4xz08ubzu5wxd1vhj779ay7p7p',
                messageProtocol: 'so3dc9cy1dsgxwm0sezq8cwp7wuyzgza824js7vqyhgsn7o64aono711dxii',
                adapterEngineName: 'yet51951s303fckkvnscgjg51hp233ww5c0ywhauw49lwsysit1fy2hlr5d7ovn09igwr3ve237iab139qlzii8951de8v1jwxwjsjsql0hpep0uufxiuh4na08jvfpfm5guv96uo8dfgydwfaq0pwmrhnnat8uh',
                url: 'm3h2yap24gy21q7oh3izzaokzzo19hu2qsnjtm8b2w60nswzd91vwxoisiuthvg3c12r6oxose3uwr9tin27x556gn4yz7cjvg90t46imrebl9ufkonchdm74t7218h64b35dk2z7zuz62rm8vfgea6uejhxdh80wies5cdw4upscz7xs0bii7sg78pkune9816vju3xa9tkcy59pm0rt46te9eafcvtvr9xj68i2krlspbifff8e70ex8xw07hudb4x8kgg9iw6m9pbv1k52otpj9fuyf8leccxa188hw18jqg04uiiefj42syrne21',
                username: '58zh87ioa6u9wp8s0tch2364flu3lf31272ezxvcbnmhuerspdurtj4i012e',
                remoteHost: 'qe3amzlnjy5kcy4amrsikz4wux7j844mtsacgbapp0rari37xhderd47m7acvynx570a9e7ro1wddwi7dgvgcq4vl57lnfcevdjyqjofeuwyg5gelnw6dl7oiij1vy8xi2iv4joohv22vjna3u44x1ogbqbgxk6y',
                remotePort: 4364023088,
                directory: 'pdj5u2568451rfvny7ob3vncomtnc1o3bh2zxzjbpnb548a252xvfjxangwl0ygjj8wbi1tt3r2e7lf4nhn6t8queexxwp2lfbh4ofb8w74h88bp16pyrf0gfyxygmw8uk3y4j9jm21hxd6cur0t23pcbuqvswclp7dhjpxncs6hvcly1txrqxwcujlwajrov33628c8we9logka8fzi7erg9c7xu2d4i3qpm6falqv637tmyp0jkeqhk4ohvgireq09jibt3thkrke606qg2pvyhwkeh99su67wbzv12ynzq386mn4cgit9k17p24t3vd437j8ofvhb8wgpcq2hk0o1i0ab90giurux5iehsu5kdvquv2moblymv1jur258scnmryxy3dcz5yoplhyw4dqpy8z06la5ivwp1546kzuhalxltgypktamv81w5hjfzakam7d1bxjij7b7sr8vz7oatolppgobvzg3ym4nmytrbhrgmkui4wbp8djric3l3lc0jve8h2z4960ciy2m0ic9nb3du94fp082tlgyzj0ios6prz8ao4cid86t54q13s9604ffujxtux9a78siztvivwfq9kx4ngq3n1rg3b41etzygydh5hk1gl8flqf3kvfxnqrh2h9fmg1kygqpxqkf145gal6vz1cgk3z8v8exrjwxjf12z6lfve06bxw4yqkc4ze5jncfls3kjrhhqebvsti36v4z2vmowu20y9qy0c2ukk4n6ikg7vj7l4ufds8t3x740kv0a42ebqqa8auxqmp0wzx4a4o3l9ivr49mdxtpevo3o8u0r0dvansrlhw0ywj08p1ny50e3i68kzqnxaz5tpimgpb9q4jzdgxnedzynvn4zbu8opiducckggdaxij334m0p9hp1x4dqzgfivryq3y68szn09qhfaj4ig93j2nxvyottknmpp1nlpdi48qcmhimbjkvagbek38zi1kryxa4gl4xdwq9x54lcwcmvx9izoqrkzzxg7u2',
                fileSchema: 'gu2f4cuifsowxkxzkw2lfuo7hh3lzmj256nzsdxj99pb2a3fe1h1fb18b2p9da3jpix54g6sysidht2rv0tnjy9walgbarmky1eel9jadz3ejf4rml23win9r7rhyn3gn5a8zikuqbvtoojvph5e2vutls98rd98qgrmj67erj9rtrujwjuua6k7xe6uipa2f388ss949wxdic6k9tfjm55am2i961maun0774ev99vj3xgdcnq8ekhw7hessrz4ks2vp4abcemszr4cgdfef9t7d4s3mrozd12of7il8m4j8df7b56jnb7zhbsiarem1hjkdnp35jg0pjfd7qdx7j9hzttnmhi8oquygapquwt4p6m7mh9vcdqtjrswzhrxboil6nh7hpjuvxq0l6f8cqoiydm3ixofbn8hecwfaoi3uj8oria52uwm3t6be2bcvr75f9rll3fb3ksn3u9buhw8dq6eh2utic121diztlqaubc1s4x5sodjjvcqla9ma8ni4e1ekztx089ou35s835nwqb3b5wuculxllhvczv8t63plaw1u4ybcmq4l0m3hy1y3266noti1dl9ikbw4om0opc1iidykxk9w7h4g4qk0htps6jdz32j8fxnjzmk38ks9entuq13v2ns27m7asefaju1nygem4ot2uhgliu8hvw9vp7eudgzhj5ykodea7fga1n3nvxw1d3jd4zortknkv4u9bb0j9uviqhqd2riwamabh7tlxronm7y3kuu1sfrj8m5mgb83508v2ef3kl6ufjoa72favp2s61jvmrwi114d4as7st22ascqkvbmrqthljf5kg3v4da6s8wp6niapp1aexat7q14tderbv5jq37gl3m6l61fgybm3t9gnm0x3mi48jw7a3os07bdexkdnun27ghab12bjcdrc8rcl1zuwc6u2trb7tzhbmizjlpgtr4g0yenuqijw3k8oh0lzvx3u8puh1b9f8euu8v2x3n2t563fv6h2uz0ksx',
                proxyHost: 'ievvba2o6mjyorfq0h6qidyrnm4eno4egiiezajp30e9koknp1c49va1aobq',
                proxyPort: 4503953172,
                destination: 'l6qfisqkywut31e9irdzcoo7znx2b4jc39yoj6dwlcs3mfd0ojv7ex03d0h1xszt99wxdreet94vag0ilslht8ofoh5uu034pxfss5gb5l8x3b32x5bwpwq6i1f2altkr524jzwkhj58arwxvwrgprtxmtlnq8mp',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '4qgu0zoltgjfqszrm8n5tqdqt80rfe5k9amobssx91imuw9brmcrokn4xahi6yhhskodhoy9mgmsmlp2al37525w5cis9f40b7scch4hn3dhzmhec7zhqotfp7cl8nu1yhotzzzm4trryoxu7u3g619qtmvj8gu5',
                responsibleUserAccountName: 'xnqkeadz1n7w9f263cfl',
                lastChangeUserAccount: 'jsbewgw71e2gxfeooo7g',
                lastChangedAt: '2020-07-27 07:47:12',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'wdxhe6x87u9bzc56entx1fi86rz0ue23fu46w2j756clh1yebr',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'yfldhgdxok549ao211a4',
                party: 'nt5j6qgz6awha72v7hmhjhf1gkmlc07dj0svnt9zsfc01f0sxsmo8ub7podbqwg4ojyensw17dek5jrglu9xfczbp2hif274ce52ab0s8t1d49xq0wjmm4m1pbu9mjyskpkfblmf58du0h5cl5y1ahbme32p4f6g',
                component: 'as0c7xlr7ngijqsfh2dllwpznnc66j6ulbd9vam5f6j53h9nvij8zum2lyybwzby3xhgoxj4pcsa7qx1q21kchjx6xbs3ghzqpjr0rutu295m493cxik15rlg2vfngvdjbjl0lp1eyblzaq0qvig8pmmxgx2got5',
                name: '4oggr90lq4f58bw3zdx1g7drdi47f5gkdqnazw7hnp8fg8rtawmaoo7vd2esh93db9vkpw5nvx0mann7uln5fff27y5x292sovw9l1zohp5atrlk4xi9pxj95qp1f7obj1bq50omomk7tlbrowph8v942rw8a32r',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '0or2xkg9964f8jjavqv0gznb1avp0vxyqcud1yjz8fk5zz01vo6s6it4aw2y1vq5c3xumq41jix6kc6xo0joqlkb6acow5v8l08pofu59gtl6h74mwgi090h3p41s18s5nwnz12c4pqijrq2ced6hidgkbm7p0do',
                flowComponent: 'aekx6xm8yxhva6tmcht3rcg8ladz4gjt2kzaqrqhgg4gyt57emqscmsphbotjkej89jfxyupsazek6x9oapr4yijj9qq5cje823alls1gjipj9mbr77qekicf70syehaouemfcx81tuuynplqmyl96tb4sbgz7ox',
                flowInterfaceName: 'uq3wfi0wuoz98hyg9waxgjmuaq7hmn7qt50z5xkm7v35ql0j5x0qw8cdw25m2hezd4ckhwdzxjhnssmq9h6hx2ud7qh8ez8id0sishclpruhnb9gw9ndsjbr9llckypg2d8ucuc3d0ql5kpfyi4ah1ufn3zzb6jr',
                flowInterfaceNamespace: null,
                version: 'rdglhwy6m1tdyfcoypoc',
                adapterType: 'kcbtrllye3vi4pamb4xmigsyqzcgoig84whd5d483brlx7i1pg6rtyps5351',
                direction: 'RECEIVER',
                transportProtocol: 'bo6fkl0viaw87f0zbct519r1crbuf2v4sia2sppkas08uw7swpl6giqpbwog',
                messageProtocol: 'kkzjwk7cfuc3m6i8l9t0nev3ktpevcdyurb0o25yh94vvx0tkn9q61o43cwn',
                adapterEngineName: 'jywv9rvi7wsihyoubka7dr2c9frw31ug4yfiv3rv6mhygpqz9r9ksmo7bdc8l1uabg8p5h1z9bu2j6l5jz4tlzyv0vdsfy1s982ywlpd1u3eaxrfqj6amoju3763wm9edbw3o6f98wo4bwtrjd9t5nrb6jrio1fj',
                url: '2yhn75bfc8rjmx1je3jawws8x5d6dxqeo0f6n0eurvfdtlqj10do8178g3w6iup0sde9p9op5yuwur3ak3y70htbdhttxz8va18v07813h8k9wbp0mydwww4npezomzc2minn6ww8aojel6iobrhm7u3sbfpy2fmi73m4regpo47bhuve09n3hiy0p18lwdhzhyd3vqzzp0k85onmug293kl4vcjxox2cn8hwy39hnrjvmfic2sar0feg59jju80mdzxwicm2exd9plwmrx7f2th2uzikm19bamyqip91yzylo88nw9p0qpampe7qo72',
                username: 'rx1ktb9p1zmkrwopnz8jk5n6za88fsc7b8bzwzkypp2dc45pjecoyrtas4j2',
                remoteHost: 'atukty4ytktce80y9tiqcqxgp2mwdceifgw7z1bxif2n1arfldgum3tw30jf21334dpbkg0zdcq9lexif44dbzu8fw5z68k62uv2qyoz495lqya910k3k052r0vuf563o3hxvuqex8kyfi9g0anl1vmnzxrijbec',
                remotePort: 2470991459,
                directory: 'kbd2pqelyfmctha8xqay10sq321lzkwz636od8w93z3zkvsuvoxblcnifmk7jk5f6w9srmzo1sii5xlbh8gb8iw1uspmii3xucgatfgwqztyd49xh53iqeeyszgqyb9p4pnprwrahe30ng5oyt2bqh3ibivxtx6qtwwijz11rbyggfttasygviang3fxhu6ylnu82rak4epvb4y2anadrgb06yzy53s126y5jzl1hlss4rrzsve1kn47i7xdrkvdob3sk6z3fmtsfeakjxcj57nh936zqe4owyssnv6681dqwj9guqbkjdoiyyer1vw9atw9jsg3ikzhlirrfgnu6rpe3b9zhm78htk0zj0lak59ainmy0ohx2e4s00ae89gfwzq6nsmwvzanmvw5g7tn98xpbsbd0gb47qtf0hb9watvziqcftdblxid4qzwvw87kbbs26n2o3x0jzcnr6qsdbocywrksth8kv2by588e5ea476g6st32turdtjv15ppr5o13v8qvuck3p2jl1g0d3tc55kc72bftm9fws1s6uxj06pzob15iviiiae74i0y3n097mak1d7sddxugbzpst9d1i36nj80rvaexpyg189ikn2hzvqpq9hhr22ckm3rerq150z9drsz7donos3taw90xkl3m6fo2f4576g1ayeew0vkbwsvtg24n4ve86lmkmwdx9w9g8jrx14dxbbc4121mo8sdmhit4rx32vk8ve93256q2zwixeydcumyqadxzo82ndy63hjdbt1ubmx30eqybfrlo6s46ag0hazqw0kg8h00xa2q707o76vmycnxtw14s3am3cec0w1m9jaayroebmgis3p3sa87cmabbeo8wdnzo5twlb1adq0qa34576cl8dl1jh2bv317gieiwvwt5wms3h93dnmcua086cqtpb6zh60b7zzkthkbtmcwbfupyjfy89i5ijqbnie04hyqtv596td680ai2cchj574a4o7zqb2j7xzm67mvi',
                fileSchema: 'fvner8q2qnkdn1vq4i8zsjvfbf0hdv8byrzz4p6kjkcafqdotj1zx8y1s26qi1srg2x8ponxr9tu3540ug25rmyxq1kky9rg4vfocdk06fmhdolz5h7tiesvdvitsyuise6i8z6ac8xq1zg20vw7a521dl6hpxh210kxvqeir20x1pl6sfn0kswwlcqr6qn3xdwshqrenxii7c9gyubinkqtb6k9pt42b5mwyr3328ln3uy8ko151bghi9lfr9y8kbhe7jyr7d8z9tb6z4qik9x3l3iexk1jq849q1v0d8dtaweybb1vu9iumjbl0nnisfwlz4w96vpdogzpk6gybdwrga96obntzcl5i2fj0z71h9jlioi2yl71isl63msk27na2ujhltrdxd9r7k5kqz0ykctlj10j08rn50y5m9mbp5dle6n4jdxuh8a2edvpf59033jcsvcmh9yh2ujbvcz522r3od8ye51bkwep3do6xu0u2496ip8l5f24usvdhkw7jt9cv5qkvamldk1bqtesby0v60wdos2mjoj5b3tl4dwwbvfiak0rkvmnyue34l1bcgh1xmaifecuinsftg1fmo9r87crg0chocc70laql8v2929kclto9v7n3js5vss6yqi421rgj1ahc7l4ehmvw3a5du02i7fszejuczjdm9kcxyzhvm6na05uh5b4qt5g53z5r8onctq4bi6u4gb9zss6dm937rkp9sm5ktz8ajgpsi5ydztzmrfa177anzmsp0ds5qp5qhe2gdxxedxn39kf4q4ldg0uv191yrke5786m8e5s66ow4aht2227nxjv65aaful8si1trd55z5z2x288md2fnsa6k51jin37j701t098izq3k2op85xdcoywuhp0mtim71ycwd4rizc6kewn1kh6s6fkjjehxc9xo17ew4v1j6s3tonpqwxti8igntvzi68qs0dmzqyurruhhersh9g1sco2ubmzyu56qvzb0vrhzf3wwtk6k57',
                proxyHost: 'w8yp3drqdm9q5cotkefmhitwx2i2v1ga2hhm5n7bzb9lia2sn1jqwbhntkuu',
                proxyPort: 5646650831,
                destination: '7aj83q3txo44n5umwm6ouhp55qmtlug8cbc35ydvwy5s047wcfv1ppmq88ho39c92i6meia2lrscb5plo7b9274272ljgigktskr1a2dkxpke4z7rsbtwhrm3xa3ukcwifmf7wbgclyxrnkufdibg39ca9b0852v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'un1cb4ai39k5po9zbtj1201vozkvcmt3i1ppbab34wvc0in45v7t71gm4x5kg6ss29216l1vir5sn9yre6gkjlb5bxrkyr774uhi1kmasc8robv8gg9zhprloklux1kewh3urj7drq49fgclamszd7rlzhnra4if',
                responsibleUserAccountName: 's5k8mpdiummy2gr59q9q',
                lastChangeUserAccount: 'fzn5t338nlyr9bltc0kx',
                lastChangedAt: '2020-07-26 23:05:10',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'o49xpm3g1eaadx81wwb29b9jxz4ytfghsea5rduonj1kdb2m0a',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'ite8f34e5mzzoonk03cr',
                party: '02ewurhzmij4mbl2rf9e8fpapagnve87v5rok5oyiocn441w00hs54op1lbqfx4dzrxqg2nnc2lwnxvy6e64ncq1hhk4bh539ho3zgnrvr6b8zop461qpla71yd96h025ym74rz8molrd3hg9vieq5uexz2md9gh',
                component: '8x8owez9huf71wa6dysvi7hzzmzvhkqtttortji1nxp2q3vemfpt23crbzwksp8vffn487hmar2x8yeju6soxg1qf0m36f9v3pk92wqjxynu5nx4m8vucnticl75s65feorp6wyq3mzn8c6hneo64ssz6gf002ka',
                name: 'wyqwgu5jkew8jyx0tycasuk52jmjaeices7uwgwba8hj9k5smp9hj7hg29mug2dt8ndh2n2p2cfxeiy8ly7y6tc0o1p6pix52h118zfe6f8rx1z0tkc36kvy9kyxpduomokyncuw9aciiu6ix6icybm81wzv8v1o',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'li2iyntp1893vzcvhvzyqixtlfbjjcxh2o2uxgfmqrm5nj9d49rztad4luxzxeww6kisvu4t35o2v1d2s56d7cp60n4kzsy17ff3r5iblg8oduuqknyo5rxdnkwliafh5mevb164xqdlx2qm0qw70o3wekvoqfm0',
                flowComponent: 'h1fwv9hju5hqmkdzad4lnep5m7in2mh70nxr57kfdtuxuxrljejit791444qwjlpu03dkdwc3cjlx8fy20svql6wkqpxisvbsb14jg5jwlixmtlr3ezbxni7oluvwwdygf1q2dhp7868ywhnc32fhpx4d31yi56x',
                flowInterfaceName: '2qp071l6oze9mg9aphxovwbzjzbbkbgo7jf8hy5k0998s6mv4q5v8xelaa49ch3jerplnuw4apnw3zbftl3i9q3rx16amqu80kg6j2egzhx26fd2w8rteoy11qiq3n63ekxy8oiunb6sm2sivwfbta69aamufc64',
                
                version: 'pvvdjiop7ypr9q537swf',
                adapterType: '0f6p9j4k1xgmumskl46g6pyowpjbmsukfmo1hbmpa5614hxhush3jw5crcea',
                direction: 'RECEIVER',
                transportProtocol: 'ezwqbehpavnw87t4jy8brj1mby2g6ayz4bo54t7wypwy63hx78f4ysuaoz6x',
                messageProtocol: 'qqe4g1b1j8oqcjmkkmuyd31zknuct6cjn0bgmu13017rproeuxi9tjanhqm7',
                adapterEngineName: 'whnooy0elnmech2psfryexbqii79bnjjpsxmrqltc863yv1x3pzsgag2em14o7h061fai2klvyyqv32z51pqy7b0ul100njfc8pth7600om13nxg178uugvw0r0hwy5q83d4qglutx3ugzlb8n0w2y9gfc2pzgy6',
                url: 'z8jddkv1sdudcerbr1ptyg5b2ltfbrtommmpiipb2qxpfyfhiykyqlptdp9crs2d88izhcw6j8dkv4psi3n1s3yejegrzph5b7qsyxdyxuons7xrehfwul2rml44mt1x3upcdulnqhhcake38ycp3fymz547oay1ag9lvkpp0i4d1ds2kmhwgyhskzhb4m6wt5mm4rqro9w9zssres7on8kaweqdsyd44wfcv2koiactgydnfbgkw9oj2llcwdybjkc1vqerq9uqmj8f4xmt5drz0k5kfxgyht3es5emu15ip42nyafg30s0k6xm56xi',
                username: '3htf1h4yl0y3gul7jv527b4fwr7dfznisdpmrh7ic79q3co49ytugmccvatl',
                remoteHost: '9xf2293rx1n26yiztuq75pwp22nclao8kbq96vqus4s3x4efzkt91v41tvm5113xs77oopdxxnslylnpkws5dqqiqbmznysnkzi8yuyki2k1nnpykfxmi86ic7n9990kf6lm88vdnwhdiirgez9d0wzv7y93dl9e',
                remotePort: 4450871936,
                directory: 't92sljt0tfz7qz2yy6jl3vg2xsyhul9aebbn7o44qjg20t5frll8ecu5eby9dfrf0idwtot3x7zgi1un77u2bv1iq8p25rzzlzjgiotqu00ee8pdeldz11p0vmheq7m2s9aqol0huymplolj9qflr042s95q8si5ombwscc6s8azu8ewin690c6k5jy90n25rv2tddqdpw8h6h98fyr7dn9loazrm299le3yt7j9y5k8oi779lzuwkc8sxvuak6xn6i96bycs358jma11jb69qo1l3at0x25jh0d1j4e84c5op12xvf5nvb7f6idxybg7v0cp0pcgjofjco904uoqfp4lnxc654dwi0i1c10ysuxqhu8s6ymou0k70daj8xvs92mrvnbff96mu4twf80lp4i04jpeixlp2v4k2dv1kob255vf5cwb0f8dl4z9wpo6tth3vum7rwnog79jlebg0mv2aj1nu3cbxwbrdvpi5o2lzdkk2js8wv8jmw71y55v7k9r00na3rc70xjjhbz624nw846affaj5cxclnbrta9oxs1gj6g468uouwu14os6qqwn9efokt7ozx1mxpb49w5e0fbnz6qovu1pnsiibsa2hboyhsbw2tek8w32981xhq4q6d4nqb9cgyhqhbo44zi5n4gr1vn3p1itt0nczf7py74u4iuy7kntnvnn1xbbl523nxhh1oilnv9pqpzrbitbuvd50cwiflifutp8hery0rkmthhux1w4ps7y3lojhtnplcbn53s7aognfrqciv0jeed3e5mih0u16raj2nba4bvujekm4l1dbd9guujh9pxhscci6h3q8ns795939yt1swln37ggnh7wpb49i8gyhd1dp32sa5egb27tdpft8nepwmxyk5rxbpo87qfmhlzqcjdyvy9g4c46x205buz0cp3ovep5zig302lqg1xrfbpv224r0uuhv016tdy7omxa7hec1m70t1fcuw2mvafjiyodb7j499chr9594de',
                fileSchema: 'iq7dgai6hvs3y4zzjwp6zh1tj8z9nm8q98v3oe11cpwayo046sf2hdfjibp5cgfo17n25w3un69cmfrsnvh2k2upg4m75gafkj0qy8aghz0hj5gicic9cgqrowja6zmxa6w825aa1355se6vupw8us48cj4riwnbcusksyzh83ln7ajct5e6fvihmq151ct9viloflrh0htcs0k4wy09k8xub3pwk68wzk5f4xd4i83hx3hg0lf912awrhyvxvtksulgcv7rf65mxujvjf52ttk9b2d2s39izxrws9ja8gp5d0p801bk6rjtee2cyb2a9qyfd8yuyuh4xbhu57hqfgr13mnb599cnplpclk7uviiw671x2e5b7vnlws3sc0szs0grw88ucq1eghvnxyxg8e6csi1100skpojpcsh4d5erym62qyp9wpthxhkwo4szxp4vrk1y7sa9ccl80f6bn9vbf0p4wesn4d7zsmr13pe27nvtwj9jvd2zpyvwqdw270ouonqgvgg8ylmv72i9b13hucnkn725epytduvxht6paug1yr6oyflovskvw9vf7x5vavws1h3zsnkpl9f9z2vk2ekvfbwpsz557rglrxdnjgoa4meqnsrolqb7ae7he079hkn86cao225lriifm48pi2e1bb028hctdisvbxlon8otvvhm1p1ifkycow5ddvnfp5i9nkf4kfqvrhdtoruwbnjfhvbavwskom103127nezdq4rsi3p2v2wbyw8141fmb70ttxdrzimwfzs0q8t961oa2ss67ek90cam3qad0a169ni2so1qn9y38lc1umoxjg0yaqwbmosbvhgc30q3u6ywyh1rnjckt6tsrapcteu4dc2qavjf3afuuz77pyycas4w1z3e1gknvp79ovze8s9pqyrw8kjykuojuocudgxuyioo9fu86guopxnxq5h1dndeu43xarzzy7icrc0z851dehe7drqobmylbwsgowpy6l23eaz3tgmslwa',
                proxyHost: 'knw096otrsdwxeqxdrdtxclm7pj568lyezv9cnop236xg6kjtjcyfkuhqydo',
                proxyPort: 9854973952,
                destination: 'cxm2tqsbq7o9lirobs2apq3o7q36ovhmxqrza7natg2z5hwpdpvq0mp595zt5mhwxm3gdkh6htk9bbev5vr4wwqyi5wy9vqz7g747qbnya2dbwo93kixn9expvm92hcpgzfaabbku0taurgy7q6ayaonrozdb0zz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0e5xflq7afiqkrlellwv595of8q8g5poz7qir2cu7atws4o9ltwqcakn9n9lltcmda56yz4s385m07nrbd6i2t00sowazfoi32tt9b75o7e0qw26ratbh5sqftvpyeylynaozftl6z6plf1kkons0dmwz4r5tya6',
                responsibleUserAccountName: 'pb6zeudc60bdb3e055em',
                lastChangeUserAccount: 'pmca4u6m2zivfgxzdd07',
                lastChangedAt: '2020-07-26 23:09:34',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'p6arri9gowey5lbqco8bfv1tdkvai44b8sqpuo6i2ag3vj3u98',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '38gj9fuucj5g0p6e0csd',
                party: 'e5cpgmtmu8bgc8iwsayg478gt0md6guozcdcmi62wizol4xrv6dah32fr5f2jbh6tmo7ep57laa8er7iijnt7r8zv709uwhuh9rhs3am5qp2lwupcrdxvsmm8fmo4js510uur2l7m1y9xmp6ztpanychmakvi2x1',
                component: '3ps2cxy8ys5gw6wjbqpfwv3cmi2w6ta1sviuh2jph4zfae5d3zenqgoyy3kk48gt07xo4sei9nnpiwowvtobhfy2eahr4jpv15gk2u5i2ndbra8qjh4riut5ev5ful6glo8u1big32fv1bjrhhrzgrfjktzo36fp',
                name: 'zqxrj0te8tz257l08qg8vmmfv7zzw0225mvn3ka190c3rkor9hf5dg50ankr9g90i8n5ibf5mbiu3n7852fchliowykt6e4kwrs7kjjrdkl5p9euoi4hcbixrbc2brcs009t1hu95n3f65fdx1twvn0d01qvfnhb',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'g6s4wbgwftfolequg43izj586tdc6wu9vz1qz7u7ymg7vfazfs7oht7dywnvaqx6909jwru6v4fgxv50sd0h8t4cfs4pg13ogx7hpv870ku7g8pgsmez1bbfyjd1zgx5jbio88fljoaffsx5hdabu6hitavqu4lv',
                flowComponent: '7y8m8euu5yl3ruyvl2tp7lll7ze92wzwx3wgsv5kk5scij1eci2oz1uwkb9boae79wut3cn0obuaoq73yp7oi6wdt7icf7x24fn07pr1d7cm0kbfzkgxm3zzc09w29y1hp6antmzg4mihwz4u8gynzjeviurjeoi',
                flowInterfaceName: '9epw3meaf3xamvuinhjqef9oequu22y976qgqpdegep2c89xg4847234ed169zcinsyhwoa54ajugg6ocgl9wq3d1oozpke50o95cqj8bs8kmyx69otmmgkq7yvz9bh8l798t0eijjrerrfoqob35u2d6o05rfvs',
                flowInterfaceNamespace: 'v8e1awy4ueypz4ifmdbim9vv5f667u9jpdt4r86qrp54ayaqjxgecwqig7ytevxo443vnwqmq9v2l6mqwvdokoo51makiv4ciihyb19wyrz6jqyndkgah2z9cjl2xvpgfkyd7pzf2ajm0fml2d5rp1obadcv8dle',
                version: null,
                adapterType: 'qrx4plo3qdgqe793mc50u7n2ywblsjamn7nyzpgglfvuqkhjvy9s5781mckd',
                direction: 'RECEIVER',
                transportProtocol: '48huwrd4ieo6piuazibevuhg50g7drmy20jmgd8f5824qqti7k2qzoym60kt',
                messageProtocol: 'enc7ovmdids8xxd9dqjlyaszw4ijv6zqlgc7r5a8lunry699ppj651l3xrcd',
                adapterEngineName: '7dc2ug3nbnaodyhy2035icy2er4bdnk81futccpq2aur7kng0km34hwjd2omrrqmvykikoba75o7jfjvbxypymr5t41w56kw8vl3hn1eea1a20xnqvsd0w0zrc1w4iewvgfalb4yszj7zi4w9on3p7jfmwz2vw8u',
                url: '7el9qolg8gekmgeord9em602o08ojndswkkp3a7sn513db8ev8x05s3x3x5dubx2iph5t7hawd7i8gszefuani78opxlcjqiv0mnst6b9qyx581kgwxwrtslz932mguj1kll6b2zgw6fdcix2uqtgcdkmecoccpdq1mg1kfxf8na17o27mt0hnrat6nrontu42kw7whhlz2j5oil5js5ndkzobn5x8qy1228x12r0ieyajnk8tul6pkcu7bfw2dclf5xexemv50mdvh8g0r29afk9plcudnq80yhfc23aya73thkyqx753atnm676220',
                username: 'gko96pyd21g0t04s9nl2goiuciandbojkj5s3e6acdijg8swjnceah0jto4c',
                remoteHost: '7y4fkcr1fpq7vo93826hf6hep07gig9v51cv7eqxxgpqx06bjxhdkkwfvsdf0p1id6nlt0ettnmjs1tmuzdkaweuvjie3ugyk5oejc04qabu9fm36kj3qo0b6rvwxf6f0t46zp5m1xg5jq4n1rf7hciclcyzk3t6',
                remotePort: 3358737737,
                directory: 'ieub2utt3mjxjyps4adf2ju4vvw251nxwg66hjdwkib0uw5wx6oputln022h59y136sti0vanjpsfs4zj66c1gz0p3yhfjzbnhdx8ue1ki64jmtchu9v812lo10itm8pbjbh3odi4z0bx3whcbtqbm6r5ssghoiotppng5buvfz72j7otjqb1x5ctq5y22pml9jingiv3v53pdl7x3texh1z0oxvt4bq5fer2b929iv713fj512ihi0armgkhcm75fe3aas4pghjftr6x15qsyg9m6ib8xw9uzfmzilauuabfldhfd8ci13uoh8t337xl1imk8mmpg74k4pghdbw5vdmf7riuc6duhxu5582zu7mtdwlvoxuuke7hflp23jjypiib6jx3uxf4gno3skqvju1gioo951gg47v9bucqyapzpofqyv9t2nas7w8w7bjq54mw1qocqh1fc0w3jztcvic3508i1cdmcpl1tdqsexje2wppo98s6kcen9md2u1ee0y9k1s4m8i6zlg6045uetmnxudoo13rtae7ah6puiyd2feabsibgk5es5jh5mm1wphndavobnj5q51e84e3gn9qj9n6eoeuut1teyfcdug3zmmtlunzaiujuzbvisqbwpn084bt4pifedz81wuzkvpl4hp0txn27uzs2tu5jigpxo1irjviuzrz9z7084jcrs1fcqa8zlx415kkgso9q1wgoivjcpkwfkezcd3s96smuilmpbn5l4jalq0szpnyzkoizzk89agz1ntzjastd3abzqqoohq9lyggnd91uc41h3tbhohka8l2kfhxg7fq70l0s5luq61uxeywddzfaxtqa84c122czpwou56adqnle4avqzoe958jdj5w8m06olrhnobv4busxkicumb1rekzsd8de912fjqgn9ppw5xot6htzvb6ssuvcpw76odeblsfegjx14mab5yd83y3d7we9c6jmd3gci8l1hvcti0hot81kz4jwn9pwwr3x9l',
                fileSchema: 'b8nfc2xa1543rfp361mbln0heufx7j851llycuur5givt5mjijw9o9v5lwqsws8r7uj8eei32dnu7w446s15wyite19fvxi5mu702b8xzo70ibhkdgjwoxeroyrywh6r7ukz4pvfwhzt32zpgg7qcmj3irm6z3d3wzzxx7j05ywij1izyhsx5o6cdxsgdbsdvjo42et2mjd991t5628jjywy5nwn6ajxyg78dvawduv9mdk67qlav5sbhcenqvatj159iupemir1bdll7zmbwpwg37w6s7yr8rv7dqheewu4oyknlbrtw5635ggpjb99ba2blsi4awvu5ay3h2vt3d71szqcfrszryi1mn9ypfk7y6fzs0w26m13tu24akn81nfebiam14628fol61q5x71f9bccbbceiz4nzl9wcxdars8dxhxx12z57ec1vai6bs2dkpiivvsuwrl6sea5akt41kaeccjxbuhbuvuh005lzjmu1clvk8w5b6bqx95a84szvhjeh9cdfa07qzsuolzmndcrhrh81ycbvk4q8jhfm7smooqm7iez90nmfk3t6yvchwxxpybxyamlh6eimilna6w5z6gtg1mi5fy6yykxtj38ol0wo8cx6v4el4ybzk3csenz1ab5zibtifsz5hxpsdscmiyxn2ewic2zq2gt0xy73b1p1926ivo1hvqlz2b9ei0yqw92pgwwc5059jrol7eiytlfsspvyyaus0e45dr4uyevwwmwetj6x0u3tuiq1lthlb3q9hqgei2ntuaukmbu1o70r2j7szsjwklqqsakej99hfwzcjlkzoxd1le647nps79g7uvgpr3brc7hlpd2ass2ofy0l1mpa1cje6k1zgexsrohjumbded51r25go1hzp75ts6r6dyrnuae2lig62k6y937jndyvglntpicffb1v5r4ji3bs7e1y95xaofiklzeurx5ccptiiwqnz5otwa3olupt7txtnhtj5q5bk8ph32sopfhu49k',
                proxyHost: 'ns35w2kuvl4cyrkw3wf0668edals68nx0s6i6e8mtu0djtpmcx0590meirnv',
                proxyPort: 1714587838,
                destination: 'euyf3plavtn3wmr8jpp9n0trsev7b3o8nmavja0wea1gpyhmr11236czment1jcw9pnih1pbe0fwm71rgazqi4g76jl90yifmwgqgd2fpgpufrcy9zdy1645w9w27dfvzpveoe4sqbx93stprt04ck1ofb4yngjs',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'lscta9gct9actj2hangs8f0lbdjixbnvyyn1s0fbtfxv3h51eoxpgxbl430lc09vl19mxvojqmvv0x9wksqk0txv3k26xucb7m5mf2fdd3zkkitzxhtxkygpl6czp7zyjb7x131w068kldywmrsnzif62ji9crh8',
                responsibleUserAccountName: '4fpkvk9iqk24v0q0vtqp',
                lastChangeUserAccount: 'jgb7ggsi2lgae7nlrvy3',
                lastChangedAt: '2020-07-27 12:51:35',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'oeq1hxpst0lp04ma92n53spvbxbrlxq98dn1yku6sx8bpctvsd',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '7694haq8go403wgxn7zh',
                party: 'nd3xeyztqpfdz66jevngl9fza3adkjr4q506qvmrtqr3zmasqgejjfohfeca2s237v3j44j0m7q5hz19wlsbmajklb1g069p55vjyjdnomz8s0mrxnjg55g34w4iraeol5hmr36wd85ixwh5hbqui3jlj8t2277s',
                component: '6yf7cc3d521lw00ea1bwb98i7nh1rv1ikpkolju8nszw9kvctn0kx164hrvrr1jdyusbsp06ch802y6j9cm9huu81o0wvhb1nkgsbi2bp5c24k0gtkc8c5ot6qixh2gte248z44n74fv34ujkpv2b1030lyrxfcg',
                name: 'pco018cvwars2bs9na8mk0v7eagg6kohqwvriwh5gsunc3n8kro9h5gf68e8mkruvhujhtoiy7ifvi5igayqamp0farjofzmplnkbujqzlk5bj4q3musm1tr2dl9s9l9amdtmu7987rx0a5apjg2a8gg1lvdqpqd',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'mfll4tbow6qrxaap69gvjxt377zcahdtjhnc31e36ybds4t0thud5ee4bqniximg2yc2bxb7vfq26vqejf8gxmkvmmhtjtvud4ax8otulnpkyez7mdb1zjjptrc9m1l471p2spg5s6rc45uukmlbrsgcd1vo1tpc',
                flowComponent: '22t0o90r8x18274o2ucxhw4wmlzgt14uho6j52i5nwuzz4jl3qqjdulhmpeysdhgk3056s3vbgj6ormj014dyd07foi8a5rrzl2slalyastilhuk9lhunstk0puicqum7iq9yd9hyhpuvrefvtst0ant865050qa',
                flowInterfaceName: '02c8bbr3y0nmek1cws12m60y748xnytns4rwbcmbhuq14vuuezkh52jnncv8d90q8nt3b9qg772ir70jzf75dtx9c9lfktthh040fe0vzoi587s0os0jww3nmw1sp8gba5ywi95i9gir9d1mh4q1my3h4zyjdonw',
                flowInterfaceNamespace: 'yvvaay4hxyu9w9oo3u6zncgy93czo6t9qs0a1pzx7vp0bghqd8k6x2fpg7hzfesygojm3anxism0uxktek596g7l2oxbwga78ek6o2sudyeb2b9bfa5ekji0u0n2qkenjibw76m8iggjwl2eog4k8da0ao5tydmi',
                
                adapterType: 'iduycb5arm4ummnssyzt7guu63l0n901rmskm5htyunvann5ic5ida6aoqmd',
                direction: 'RECEIVER',
                transportProtocol: 'yba0h0xvo5jcgfcdp81w7m4vsinnfdluahb3bhrqngg7rjdv51iq14bmoak6',
                messageProtocol: 'o3cehwku0i0q5iaxy6w6kx42jivnglqze58uzh6ph7cg5lwfdw5ucp6nracb',
                adapterEngineName: 'zc66zor1s72mrfyrz5ibmh5wpyizeai8edvm7ztam3ryy4nsiayckvo6frp6s5132eqoccfn9u3bejb639a4lj3lkfepg452uv983fjt1r63aw04hu5mcg2umhpv30d2snkkcv9eh2ztp2t4jqn97ujerb43fhaw',
                url: 't1jkw0gwp7o87qw4n93h3kh362v9nd44f85fzlo3kfz19hu4htn2iikj6rxxzw7099nom6xycaytq93b9a1btiawvhzn0yuhw2sqljvpipxdkxqerrj6ekb8kpa3rw47px11zueubz95hdw2tgbpri58wfn3muggm3e28virb80axcyvl4rfjmt17329e3um3cn7rrgwwhfri6tnl6hssral2m14wpkbafrxvafrjdsxwh4eziivdbtw5enepxdx9xkjkr8m7woygpsop38romu4cta12n784frjhlz3xo6o06a1gb75h6z76e6lutvk',
                username: '8b39vod9xazuxjm04z16tdb1sij0ttejwyus3beiaogneu09qm2dkjfqmc2p',
                remoteHost: 'aig1acy2b2g4lwhru7xy95p3u8uksdzol3w2kkt92tj6i1f49pqwbkgbqd0vyivel3mqkui9nong02td68fc49j2mmv1p62v8rrli6mw3yg7x57q6jz6icd7djwa4flr7mrm1fsa1vy8llcireubv41ic31yqej0',
                remotePort: 3660568279,
                directory: 'dyrabub4ciiq6zinsbpjr52bzs0p2c53erw8eac8aaue22kdd9asb1bur3bu6rgy5bdl2xq7rsq8t2lmxneehr9l7h0o3oou4k28zigsxxlm36y5d58jpcfaov0sqiu9o518sl34d57vn1ddp3sn8tivse441886nevkyvv68gbwl41pyjb5xwlci8sh7sg7jcfxs7a26x0ui055dvlu1d1lj7genux404u9emt4alm7jaccnmoz0g8wm06yxnhmn7zdmhnyrycqtofprf7nqmzoiz7yciftsanl5lifrcxiz4uk44jwm5hnnm8slrhyn9haizzz8r8iuqhoegm41dzdxc17wn5j578lpjhmlp2n5srqu347rj5e5mfrmihh2kicj6lwq82od413flblqh4htvhnti1wp2zu3j767x8t4itsu7kxbkssiialyzxgq9inawbjcci2jb6w0j6xrt279sinbh5blajmo1n5g4xhijo11dkg7ocptsmyf46wfvrbv97bxhxq6mx6t1fl8f2sm6fg03i6kpgp2ie2ya2adnxwr022zf5m52tf4nrn3qyylbjb5r3wgis6q6xx1pxgp944e7kar84xmqbaglrzt0vaq8fkg26tnutqsx43g9z97a46ckttgox3h4d7sknj805bi2wqv32dddjnhnxupsw5y2om1vp5a5nfs9yjlmbt92zc3ybhyeylb7byjf7qz0ln4dj6yabsx9g1jx61rguxgpnfoav656zebspbwvhxcbb4lkjxr3ilmwg40axp0r00c92nb88msn8u99fo0cqro2hkztsb0kesed25wbl81t2kfkmskko9ls1e3try3mwf1eglzzceu4bq88w5yhqplvpyiu8wxymapsfm0qip9dd1edncxees0ss23aio0i7r5ik35xdv3h5m2f0ucdxngk825ouvyyff5cbwpg97azhnikf348da313t715jnf703niv759dtqumabg9dyyd25kz0zzz02skjugl',
                fileSchema: 'qbmkxjcsu41es42mmzk24r14n66nho3da0mtiz5ie14p8rdwknpwn9926cnl8zctv0a666yc5m0kkka2ti8v77m7ze8v6c0ewcr5i5hpi9jwnskx4ywscdtcfrsx7djd9dhk4wfz153n2thra80eqapc7vcv824h8e0urzalpv2grdfet5dir9yb6pdp8vu5aq6up0dlkdl865dzcltah0gylgrmwyizi9w99vyc1a2uccg9ttci3gd73gbuvawraxq3u2p2k04ex7t4euzlwah4qee6i19x7zfca7sliqixim8boeogam2p3tpgx5gbprkmmtgsddhu4w1nvnqmyqp379wz0u2nwvfhvcz9u15ynjgr32xktrqw3e99oid0dwtv79uifffugvfpo894ivquusmleq8be2ms4vrkrgkvktxquo4l99o6ly5431xfxg7uxw9m88r08ivj4jbu1iq22hqq22b32s2liirlmjat4qns8n5tv5o3a5o8qmy7d5iuhm1k3ykanfbzd7dvsvz5y9ks8pxzab8wsr38ltbrki2ysn6afzgovr1zk7150jqgpotqspz05mghue6bhmjqqx3z9jv9vbeys4isziaayd58wmo324vi0eon2qcw3sn84mo4jwzpsqpb6r9pwnue6ii30qvlzif30yjrsgjiwh1du08x7y4x8ia4q2w1bg4n7aqgdyrsiu5dpgcf97cxbrfsj4bmidnqcgp2ttepl1wnhqjju8qcmu4xx2hud7y5s7ooa4lie2neww9pfagy5omzi5oy1gfb352i86g8a3dhe0339ixihfhsvsm2k71q4bo8t0nwgpky83mz2vm444bzh9fuhljfbfjx4v9hlwfvyb3qcrg2e448ypwb4u6c0uy54fk2i2q9uxvg8sjds7vp65vfryhoaqpysrqjtifv54uw9k9duheu9pqicy4pmgb2htrcn3jhkai8ucho6rwp7qiiww3bh1rxvcdm9egvxq1vk25ybbqzyhc7',
                proxyHost: 'veo4nothjkg59d2rzmpv3tnohbx11jwamt06f1ylimf22tvhhj2aldhz735n',
                proxyPort: 9713867396,
                destination: 'mbknqu13euo894ue7zn8eqrcp0lf38omwc27w1tncsru1elmupyy86kx73i0c91g8nuzd8zbl5taxowl0bp26lyinaqmk9oauxzc2yj6sn5hncxhtkfb8rngty9fkqfta6nlqomquu2q38bxi91m3q10yqvty3ce',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'y73e6kekzrh4x9p31fefazlvynwsx173533qlau47hhqr6nj6l6qeffq779n8cyjoei6sggayjn860ok2ti4xqcipar6f0wdkikkvtcgrmrsbiukl9mo27yb7vgvmhtiq8e8f0fj66qs1lv64cu08ku99uno50g6',
                responsibleUserAccountName: '49697r0bgjjhfujx9281',
                lastChangeUserAccount: 'vq84qxm2ap7kbr7fs7qf',
                lastChangedAt: '2020-07-27 01:17:47',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '4sp24z6ak3lqjm7dg9xcdqobkqlufpvjg89vyqt147yqbu6062',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'jinu1e4snocyytzymsmc',
                party: 'dgcpr1xw36xvoxtlfhbmiwzxgqu2c8vf6ti93okw6yc3dx7nm07vve3ke3q0mxyaf9nrz259s0shs5pfm8r8kadcw4ihgmtxp5dpm3ecq37k7njvaofei6i0d078mfrowxuz0ll7wrytdxbzn2ogom11b2iwff1k',
                component: 'r8rpyp867l6ol1z9ylvde698l6x3kd6ogbdnnnpauccv1vqg6b4w8qq8whhxdsd376ku9q8cflgq8r4jmemdiv4lt2u9mzdnh99anxjn4eojenaputcabc7o2slfkvj5ce5ge35fcnhp163wjb3mhw4hrwbf08a4',
                name: '9myasnpup7x2ccut2t5pm7ceph705u9qupt30dbpprgn85x0yia96jynwpsk5e9vi3wq9z19p69mngfxq34cyb0zpkaqhdf0j1kwaqr299tzd9e621h9qxac82mkkcdfk1f73g0ht6av4uu2yjpjxqci0cf89490',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'w6ex5p05f7dp3qxx3agb3g2xqe6aggjit8vpqs70qczbn00yc6tlr6lw64uar7eam355qdmx35x7xxtvsl4cnj784mlxr4bjkesln6xofk1k9om3w43wj9rg1gbkm0hu62730wopgqxzdkfkqrfzohclv6n1rop2',
                flowComponent: 'kqih5cz3a9nuor3yv82ywuayzu40qdyxm3hvf4ksplc7bkapbwf3na3xyiu4ij76utdxh76e8x662ha9jznm9hqhbylr8vc3aphxg3hs2qia5hko5cfnxz36h6ekdv6cleak2fkujwh9fzrnqvb7jbkprh8eppwd',
                flowInterfaceName: 'je2a179177p98f8rs6x4z64zqvpgg30vnaajgg82j7ckyouho4irsfufu6s8dai1s7ut5ultk6pjpofyhkwjzj1bgz9th2e7ccayo7n6p6bxr5bj63qvm0yi2mw85pelrzy18iv4k00jlxcvuqya0i056x5th6ji',
                flowInterfaceNamespace: 'gyh32l1ed0lacdrtaihenh1ummhcrumlzbubggl0dhadlv03r8wg22ghm9wdjk6wv4bsrbt2c5o9u739kma588nioctuhs2w676vvbq6lnznz3uhrg7usmxv5yb9y46n7jqykznqq74xntp5ts0j5ywcdphum37e',
                version: 'e3j5flysqkyukbmh6e66',
                adapterType: '6y2qy632rl58mnifp4k6mmybsy83di3omsll9v8nckypgwsdpjlz1bmtxlpw',
                direction: null,
                transportProtocol: '2nna8eipx6mx4t6l338hrmo2famw2x8qnalbr14338qdyitcavkycyq2jilb',
                messageProtocol: 'fijvyu5h19dawun2uh33t8qlzqrfnqzdug34wwrq9cg80ru414wv7wrchycn',
                adapterEngineName: 'wynhuq2mxfcehrsqrhqrq1rj64hbyweuklwirssvxv84irk9a4a4z4wvt7lqm52w1l6nmgmu7kufil7m9pclz7yau9uwi8kvjuadyyi7hqna7ewbnjli8e8dohxyu0g27uvzomxdkzbdtklab6xvfvx76zsf7ith',
                url: 'n8c1ppvvj6yqw9bov8l44uo0nwvqlcwiqb0cfl81t9es6z7yf7p9b7x5o20zqxww76f492chobk61vpuawmu4aub4bflefh736a0rn8ej76jx7hio1rrrjymal11m12d32nxbhc7fbf5vzim9fplfm5wlf0iss6ccayv4rr0wgfqx0m8z9zaq1hy5wt8ttu72aorcwlrz37pnykqdedymdpnb6rizsgdnqkg0hcjgcgwek9wvn31ojxddkixt2q4u3ryt8oswj0pn6ck3cc7px81618a92c833clhi8kgfj7bzx0o5miz99nawtpnwba',
                username: 'qtvw33cuk5fe3plu2533d9xawhonk0dv3lmsec9calehciwnipsoye3h0z4z',
                remoteHost: 'ew5j0p6hfrmktkbytmzqa2z6hp4phd9a56m4l6ute3t73bupdkfqzr3eim4di0oziod6oczcbcn96udi96s9ofpr0xjzsjhzic2uzmx7b24ldki8ja1lshvrncpkutx0cx6hur519lkawcw77ckrfp8qy09zxhwh',
                remotePort: 7455193245,
                directory: '7jxf4ggtikprcnwmrmdm8g3awyiwmmozhx5b7gvzxzkfb4v3bgehcq0esafel1hbfies9gv2ghxmrr94jgopg0wkdwct0lmll7e12l0a1q7fjic9495icjjcj5o1if4sstqy0uowilifgiyxdphxfo86oym9n9p8nayor805qhfdo0uhc25nd9macezcnb4wk8on6qs84z0fets035qpbz3cxw7dydzpgc9ftk5ednmxggvpwj2pw7rqwhqcc0mdn5s0v5u57hipqapzogdx2i6ptpm21ckvz19s45pqud9fd3rpmygnfoqz3g9p0o1b8xkgmjb8eqfkln9abbpcqyddrx17merf13foegvx5v4opw844au28ormpd69e4ceavrelbslciq8xlc2rbpl079vx9im8vo4o70g8cac9ybeabdugykruglaf2ce97nko7jfo7ocity2ouvw5wl6hjfz9y6pfv5k712dxbz3lv0vgyeuys3h1jjcnyjdbl2dhc648d4xio5zz2q1tfmi5rkzb7jo0mjuynatvdirx2msxps3mvkywgtfg63sk139p7kj3a3ncmcxfrktel36o7740l9397qmppg6hiqbcjc3pihksb33qxqozr22038qx5c2il0mtkjbu6hcmfz5mhc2pugs2c51wjtw5txc3h9wio0dg7xii2b8omyk3nuq6co2u1k4lbvypjcd0iezk097dbfzwctf3vl4lyaz8whawep4h0aupgkym5n6v9ozg9mkm98lpp9evgcj65hxy9dzpwlud2gjw1ufm6xfafjj4h5kmj1qn8ldhbtuazt9cdj6xx1oxe2epe4b603s6nd78va2ruo72585a4esqj0ujsvw6lxp4wzmbrr1e5gqilxdg8nd5d58661cevogt7tft6ec7wy90uyalt7xtdm5t88vqfwvoakjsemmbdp3g491e3cpa0tqm7fmdbmknjj0datau60gibexvucay4qrah0xs44054vo20s34bt9',
                fileSchema: 'e0itrttqe7n62490ngp9fkodym51vrtqp0r07j3jmkhlozymmfdvumpzjtb151h5u2yvrc90gcnig6p73vwrd12p3d99um9w5rok2flap4gom28gliyaq7omczo9t28yi7ks3ijd7mgp48dmuue7rvj63ujmcj8dk5s03jkwy9a86o7ppo2t7zzcnbnapeeyhw3g5mjwjb5tphpe1s4ign1qlo7785ufts88gyre2t9maq54w70bv5zrv4mpw3o3e03f4j55xbcoizxp1mn5j87n9c68at34ognaru4ur6ko1n8p7inj8xmw0wc6osaufj1gn09dtm6fhitfwwmpr6e27x1sh1lzeftduugqt4d6q7pmka0zxt5u9g23urpm9osro97phlpvq159eza86ysu1y3hqqxz9qhetweq0munx4s1atzlttlsd7e84vsmjgroqt4k9d6rc3rr8jqbpqld3qxui8v5bdp48nz9o7tw5kvrhwilo5ksodlqaa6vulssuknnq65j7espurwkdlk55fqfc3r8dkmr3gd6s5dk8rxabge1vcv2nbq3thn47s0s2pfohd7ef4fccrogb611ey1qux9hgx23q6ouwx2us8phlxuitradi0c0t265d668zut4o7ng92i4de442w9wsrbu91ixqiwffja3yioeqsyfkp3v91u77c328zlc3hhmxpavntpfcrgdkg62rlaaaaxev4g59mqy8x005t54uxfn1ilcrb8wx64b62zy7xgf2rnmdgxche1wim85xu8e5nswfbiplvk1kwt3yxy5igi4ugos7fq82bctr1k9pombq4m09799s3ngae9v60cdli3ptabt43ilswcbcthhrybj41k5qyktvt7gjecwym9kb7jiltj0kmxh9lz4x9ajbj63cn0nfneoewa6qtuwgk7ic2d9wk9uza5ztowdj17rsr6gfppbfajwoq6ywrapcx433xo9qs1j4ipbvbew16f0hapskpbyuyvay9v8',
                proxyHost: '6nwt3ps6vri94o5ho4zubvuqh72mnv08qj3f7ac78v05wydy7k67erk5c23m',
                proxyPort: 8759995392,
                destination: '9dn3vnqqtsc7shguliwem8yxaxin3z76bkkuifkjh4jfv3x4uqw46fcin4rzs4dkmlbl3220zrmo59cyxdz7wo0wdfb35zu6ikovemx2tgm0undavt3bh1tuwiounn8ydn0idhebrb24yp65gig4hozy37s4vkcv',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'tql38wfxo0jajdkc3olmmjphp2zt7lzgjpvrg0wgdh87jjbp4sevq9hzt8u8yrk3o9ggwv5eerf9oymfrelwjzzg03nsm49oyf69q7560hktll7pyrej275w479esxpoxa1hyhhq4zhdl1jqssmsv238hx713f30',
                responsibleUserAccountName: '1siqspjcmsqblkqw2dqm',
                lastChangeUserAccount: 'sf4pwtgp9x6ngq1cfq61',
                lastChangedAt: '2020-07-27 12:32:49',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'n3qwu98cvz0l8di9vm1vy3a63cakypv5f56utcp4ib8i0a1iou',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'cr9hgxxl2d572t4pyseo',
                party: 'cs7wh4nu7acnykwecoe81cdf0nw7q1b4hxo1nikkv3v09tx3g14uglebtrans149wgr7sc69ylvga51dil9id1w442ux8859jnutkc8rt4kusv1vh46c2r76hkroet18efvegcgvkj508hsqenneljihqrsocd33',
                component: 'nmgfvdrievv4y64omrlceylojco2twaejuwfww81sn85abmglyvml2u8oxeizo426dlex7c5yfq83n5itlvvygh18mvtc084uuhpa1a5d45763b852p4ebhr747z34ttutnfzzxe4p97a7ejhdcdetl3fh78f2gd',
                name: 'fg4yxp3ss38nd4dghb17kyeiti3m05czkj9de5uikr4myjb75jfd7h0qrhmzt9mzaghm8dlu0purk8fwr98iw4mjbsjbrmrgqz2eujjl9xzx31q2dj4gl4z9a6y8dz5u7nr1m19ukxr1ikqa201hzlv4hyrd6kny',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '64izt0d9c4chvsnxl2whqql0ujjqxwtsweppq6dc4ftnkdr63ghbukwpjdp4sd9iaimhbb91qxfzxycdqfvgdlr6t72zvvccqvjh7p2tsfqjytjzauenw2nzqt2qqmyyqntecincjvdidrf6wo5x2wy1fl501n07',
                flowComponent: 'ho3st3t7jrdg8gywxm56ucxb2zio7pkw63tim4onbm4tna7ow3mssfld8rln835qt9j8kjgza52uw71zwb1rui2nxruxo6pto1whg28cd37e58fbwid9pg60sp1jwgud14azyjw8wuqviwoq0w7udidb4kwa3prq',
                flowInterfaceName: 'cy1nhuqyrc3y8lguvu14q4ar3n1uqim9ak1oi109c5tzu9zfp5kj5vdngfdl65wh3okeqk0eyrbjc2omz9ntcx9dq3wqnrtwryfm6ggj1dtf5ud6rdtpoi8rm0lpbjyqarptlvtfjzaisccafnuammhsgcg0waao',
                flowInterfaceNamespace: '0gy9eek34bhrt5nah6prshzrd0pnotmo1wpbh3g2l5fbzbblf1mdub0zw8u6dmgi2dqszrn40eg0v2v71vxh1n26v4uwjnkdfckmf6dk2dz15kp1d8fx42mjlo9zw1h8xbcjbfb07fg9rf12dby50bw68m434qi2',
                version: '9i21hsi0iw9lbpklc3a3',
                adapterType: 'qe6y0qs95f4nwe0e42bf1viivu9jtjvyal60mjnc0b5ocuf8d5qeyctebplf',
                
                transportProtocol: 'hpw30nuk0mne7on8gctik5l3xitcfzm2mdzk2km9e2rm7la1m31mhxgtq849',
                messageProtocol: 'lngmzsvt39op8iw8fjio81daga2qd6zq1dipzab2pp4sxzfta3dv2frs5zr7',
                adapterEngineName: 'vcdgbmfvuzdd4x9muu24iispe9fp5qovkyroln5xomkqjia2n6eohfk6xr5r7xo2h9ivbn5lswazb3mc68lkmz3fx0jvongbu0jv5y2k7c74mtx9dm1pwn0zv1za6k754v2wfy7apbonzhi4cuvwkokl1z71ytha',
                url: 'uc4iq9nosp82f213y8oslfsyc4tt8igu8vo0fkblc2c9o36gj7jmocm4g04yd76rakfy2kv0gx1gbcnowwfvoshcah37gku75bv5bjbigq4992rjx8e6500yfidrfattz3m4o3hp5s2z1bu7501okdo1epmnwg19ct6ow7fju7zn5bnv6rv2bfi28spkjtl5uzy00d7mipdnkp75vs8m8hooszgfhe4c6vd2z6zn3o916s0f7whq8p6w2bc7q9874prferetnk28utw0o2d9gxeb3zh1hwljc0f08m1yta2ptyo5tdddfhrvetrzrv9h',
                username: 'zjy5as0wlc89xrukctwrz9crkhtej7959ltydom4aoerlxctsnmz02g3ct0f',
                remoteHost: 'c6t04ffits4fy8spkydmx36ljerf8fmowxwqy8bqe63aptiu6mmmkdc21n37zyd93qvztbi07vnzkaftt0nkufaoqmbpysaclumh77wbajx92wu7aeucrob46i5un3r0nz4uhkzrnrajkesjxwvsuj5qf7givn3n',
                remotePort: 7436729617,
                directory: 'kewohmrp8xplxicneueb8zxy22u0n6sym4qk6jpt63rrh4g3v6z4zbwpejqqrr923czglhfejpqixznrb374ez84mhg1wt1d7c1vpfzqwuwrfjqkmhyfc8pc5ke6y75eb3hy3m2neqbda5lzpgkwg63o72xkojl6jcelgmlctyqqexrl48ko32qykb1begrg0e2l4io06ukpcwk4iwmhl6u5zmg7ukv8968mk89ojhixki103c7t8nzqgj13nvq1a10pludlc73q3d1ieexca8gltnf841dj9d5sqcxv5caw7o64gbo2zmzll3dar1pr7er21bozaw7pm0w659s7pmgz87pmhj0p8f2uwfiboeqlxxfa5zdypd8fzqzaz7ews8b5p8qmzou2ur99szy2cuyeijou307a7hmsag81y3maiag2qjuw0ump9tlg2hozu8x0i2fkk15y6ehnl0jsaisdi04tnbutjfu7p93caqodsv9m63qg707mphfq777on8wv89ue7nuymf8geiu83ozy5y64yd0e1orq3nev6zi2lk2yr0mso7iq1wct0btck96seaq8ox5urqobtyenry7qf7r4ejvn3ea08wblflx0el7e426bqikocnnoexu6n38e4a5pcuw3h8kufi8vkpp95cyx2v9b8cg9b7u4uibgnftqsthuaayr4yxjd48sm8hs2ckuxxdg9m6k2ftzo18thzxiugixr1zbasyjw6b3w79zf2xziq64rvzhfs6bm0hmtm5m52l6zz1d97pevpov6zhw0ytwxxxl1lyb2j7wmjfvra1efaandtgmnv5zdhmd6vo21ykv6reyibmikvztk1beqi0p09vq8pa8pzew271yifm2nyd4e4c3nsruof5ypjmhruln1mn2qs7xrk0dwog5xllji6co66h19pscgirgtsf428m2u89chdhqloarh0c4z5f7a74ayl76uj264ccn0zz7u5r9sktxiz099qw3l36hypljzpps2agj',
                fileSchema: 'v4w8oqssd69jtsunxrusqibq3uedzhf565kbsctu9nq3n69mldacxb9ubz9p7qgm04w64fnoy46dikmmmaajswzz3p385ezdx63mn2y0a631hqtzy8p58045o8a8g2y70z69s8kn7xsemmg90zpnk5gjqtnb4n3vbghmldbcnwyegmw4wvxh51jrkxr8ms0anqe3kj7rinxojzz4a692pnjc030xu74g36xt035p61b44vrkwx7e9ce2x607y3nkmex6byx6td0jp1sxk5iprkcv2j8epkolvkjd5iwr049nujgnd0zhwnakhjw29u8dximsnoz7d5ql1xlfssufo9io3w0rhjwgelwwczv6bwy3o0ae8wnfbgp4ognz71jcb0cxojap13i499frkdctlplxlfr7hgke34dw4dtlq35m2saugwgukq2vc7v9unkpjmtu9tphn7iq7lp826rzxymx4sdwh4mdiob1rvavd09z8wpx2lzf2qvy1nc3ij1fwaepi7qby2bt2f4ovycwryzf7lq237ohoiehxb7ghtcz0lbqz5z1ywyqn90sgbfurb9evtoi5aqm8jjwmczllaxnomolwtbm0l0pbq6reayi8307cnjp9767fthc4usfnsnxkpwjoq84fbmzcq1u9ttt5bzw22ux9vxx4n1g2b09kw0cx46oozfefyevs3ws3c1hw2jgetbr82imcdguu5pt73ufuaose214yjne0wbu3636jc8tj5bla6ufw7rx1f2t0gnmris05592x21aympytudnvxigwpfvje58sd9vjvz8bu0y5ybuc73r4u2l9hqoxw886j6mlvyb2zkxs72m85x23hbhinyvg2tqdqo0lhissjuqm07he0kfatsy9r5pxackuy3c08zxmwczvxa1d8ea9nd33sty4in2umosspglbxd5xhdar7pldlpwxdi84mum2tng6tqaovnup2lor4bx28tl8hyz87f9giloel3nau5iiwo5bbkensnr',
                proxyHost: 'mg2733hrv3zlmkcvtref7zz62eh63hqk3gtn9pktyy81y4t0fdeqxd3pnn5a',
                proxyPort: 4002445579,
                destination: 'y3zm1ri57qv149487gnc70fftj8d39ad6dnec4vuxr3mpi9nfo298oxw4aebmh4sijfp82ua2t47o6od8ya0ljr2j1qp9np3946hr6fahjqv12650ohnnwak5z2nton84ml2h8p7uz6smujx0p78qewuq3mo5qjh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'po6nm5medczx6v22lyuh7uardew2gll343ghn12revxbsq8wl2aiph6cfzodryy9taku5woc1rz4ngr7zwlw873v0nh4zfi5wafw18rssabaftvlg2vfx9d0ko43ahgovfzyr4eqd0iz37sbxns7ulrwneyci3dz',
                responsibleUserAccountName: 'ow6puzywkwt5ysa4qtkg',
                lastChangeUserAccount: 'aqx0yv5tnk99wvokpfzu',
                lastChangedAt: '2020-07-27 02:01:29',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'd6etgmjez9i8b8bpvbjck5tvb6tbq40vzdvxfwi6r5r3jrianh',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'o7rodfyk0q7dci982ej6',
                party: 'yuyzknv47vg68z9xy6ophfnxtim3p9g1p347cz09f29ib4lcd7wj0cmgcloedfuk54kgaz49expkjvzjdn8xs8ix7ouah8k7byw96ubpnvi3hveorjjgu3xd68f7c9z0x8osup5f5eymih8d3sypxxf3iw8cj24x',
                component: 'z71uwzam4fshrr5d2zzwf2qy666eetmoouoce62f9oj7t3mtpi6j3v2r6zw2o3aedun028gp5rpnf9kent547kr8jgmjq12gf7hmkg3gbucm7l0b0d2eeqdxmmurfz0zcvpi7zga2ib2iac1ndmnz484o3ru0zi5',
                name: 'akhxnbn7mqzh53y7fu7v3hsnmgxs56buxpc61hdtphe4hpg5blobmhcjy9585wu7mgw6da1ofqomlrq1tjv2uni04n0u1pkc9azruk15uc7w21n0k2att29j937swbx5a2hyyhja2jfv8e40fqr73qfsudavf8ys',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'inpfsulbz3ldgvgk792p2v9i8gqwjtr2chv8n30ttn8cdgqworcqf0q0tq2q0tas68lyxodu0yi5wesui4qrmsy6k8tvj7i3gvadln2j4ejp5ate5fcpfmzscwvia4wcv0n6r70be8x5hj2b7y5cdvb8yhj2jf0v',
                flowComponent: '1nll87umn5dzoilvsbirq9kfa4tohckkfhr7rj49vswnl16wmazybaki5enthfc8qttuo7c4jc3yqj3d3gkh72q1ju16v1nakrigibyspy1w32fvi62p1hbxirsxrjb3unxvqrh5rzx2clwh56xycyqdgxqh5l7q',
                flowInterfaceName: 'kjplwtht2mdwd51mrc0i40z2s2tpk0tt0kvx1nyeilqhl0hu0igfh3i19ts546x7si85sefgmhzazy8usagf2k1ew99kl30ihs4cpnl9z99o74s0pmrco6dkg0cnvzlf141sc7hm0lxwsxliktaa16lhlsslqkbk',
                flowInterfaceNamespace: '5a4qkmy660kozcdrt4v8y0rizhjhur1r8kj4gsn78fa207k3tbajewotl3ohl5d56e9ctrdu3e7qerfyb17hfeouo22v9jek427p633e01j296qwyoh6vkjcy4v3bfutt065o8ddmnqsreycggrvphxdgpjl4gg1',
                version: 'syjj9zsqxpooqown95vf',
                adapterType: 'ieprj7l2tcz8c032yqje4qg24fqyr1lqhn0bnc6fzk165h1g0jkt6vyyftzz',
                direction: 'SENDER',
                transportProtocol: '61wdv3y9ue3mxf0xovrfrqc954f6s5jw1ah5zp898c7kzanl4u40jz960uxc',
                messageProtocol: 'xvlp08orkwbsljrggn5417bp18xt7x8v3h5twpzns7w23xsd4e7zidpj2a1b',
                adapterEngineName: 'n7iciysy2ahoell3v3iq5mseyih4zr9umbby83bdyavl3kqgivvrkw6ncqm9y8kn2i91io372l1la0j09pgju1vl70ezh51lpc3h41rldofppc9sydg7x389doswr3ckcin577jy9rjxzv5oz2g1em6znihp3bye',
                url: '0oe2sxyypjm67njnljsautsn3mxd6la97e20kqfj6ko6x4q18z5ecwsuq9w76e5qg6djcr7r8k079qpbgs187emawrfr3gaf8utqc5cy0ycpwf8cg10y9wnb5sewifet2i4e69s1wyxc837amh116ms0u9bwolq581d8b58zvvbe8m0c02b0qi5z2tdyieqr849tikp3hvl6ubu19vte84km734crfivt3mv7yp2gj3smj8o54fr0kjai7qhf40doyl03q3eowk4b3aiz0g5s2o8say092u3axl9gkbr1xf1s0ttndvc6xm5d750mw93',
                username: 'bxuxd2nxht9st64fvt5wnd0oljhydrls38c6c1ryrez8tbhielxwffkiqydk',
                remoteHost: 'mbryu74zdtxf7vp1rkkdg23au5h2t2t2j003tbjcseja7w21fmu4ppdiougggtim25qsp2jnj7e7bh1o9111uxyi41iu4puegrlem06t6xaiapwn7m8cr7tr6d4b7nbr9p4cjluwlepdapidd9lbe98ne8gh6s3m',
                remotePort: 2559961419,
                directory: 'ufqrxvvo55g2sfkg01ohuaw2r70tv7enexccvr5qmuscj3yrynrwr5qw4sj6xtu5r4ggiz11nky17msn108alq1y7qt45qp7waaixccdhsiruowx1321ueifq5amt7ariyawygqb2m0i8gh7ao0ldc6ox6580bbd5983spy4ws1zq3bz2warxh1kzv8ytnlm39be2svi2zw149nf8w3d2gw9fu3yiw5dwxoghzwfuuxfaoie5g2rdeqqq8fn92uae24hhfl8vgmcniqhwzn64yovuos63t8znby234nqpyr115szw38g4aeu21fsva4ged0pnst9m53eftcg2cxqg7zqjh31eszh054e893prbl5z3nx8r7cguiimia92bdwfdbvymuvqsybc9vgxc0ws7roxcv9xf352xhk5ui2whomrbtr9hecumiclzsch5qh662naedhn4whset1bndkmuh6gh8aiqtj0vvdu1pami9sltrm9iz5ge5qfih5g1vok5eh6beup3q53nh23i4lyq6v1h7rjcyvna2wrafnye448lxex8wmm32e6cze6nqzueabqgil3y8wx5m5o96ihc9p3hv5wgqrwjgo86ybcgjymd5vr4dc76wbgywu4crmtmye29tfvwtfvogc5xegf316i8sy9cxwca463aezr2vu1qze5tkt4kjohoq9kgpu7sdwco99kvb74mew960iiuvmm5dsbpskj9vt633wxsyjol0a8ujgrv7hf2rby746bgjjm034b0c39t4ezi5zb8yvz82z4k99rann8pakc9ipa4yldaoc08nvl4y0l18t09ohrjshf3x1er83weotb9ds0nzql5ajl26734r1tfke41js3qq3ttg6tsgkil1s8qqf6e8ulleibjxix63wcv7v45mc54l5f5wnmmuodsnsygv2ykjmno6n6qc84xoklunrm7oija6vtx1beh58cpm79b24fj9q8k2c1vd3wnxjb11d41ihc4g2s2d59ohf',
                fileSchema: 'fyn178qhylb5l8wwp8y7jpv61nrqgbontro70tqkirqlk4jmprtdm2j4bynkqgno4q4p6aj0uqtf6o7ny8biu1uxv0fk5x8kw3o97agj1l3mmkdyunace3gki2wdo57idonndsbewkxsqi2phw0l2u5w6ji756o0iamtit1t61bv5vr2qg9r4cvms3s41yvkyvjl1cqtr0mioawpew7yplpftkbzinv0kqze98p0ndk824w03kn4mvndpzbk87sdv6vieykprx3ejf2id7qouo550voo5oxscanhyp7ce66c2gp92kbciwxii7pjwnvdzw4e5v45jjbo2k8drkl0zt8fpuyed9rrip3h7g0mjpqaztmx78ksatje138ytsulrzrq3xapvalv2l4w3i8vi79h1joi9cp78lhe4xg8bluanufoamzdhks0dlhmazzs3xog1odmta21lpestm8zo5bx9orcxw1iuzj5yoroja1a0t73th0s7nysv6diuttwnog80zxypdtja15oissu9axjot0z8er6ymdhokdhwboi3r8emzmtbppp4em208xv1fl6lszyrw1a0r2k8sazd81c0npc60dgb7yt944bfzn6602sa5tf743vzhiz8cp0hz4mekw3ro00w4zbo54w4l6w0o1hmdf09mevxodkuftdq1ogkygruh4eml92g94ghxqgabyv4dm7bopctr0xydut0f5isnn2r3d1sons6zyrq6cv26i8yviqv8ew6uut2k2nwaomkhbchu2vwdvj6jywe5g27j1jrq9ck1tfkrje7o3tkmrqascvos8aho1aosfd2auphcbr2fud8v1lt8h79mxku3i48ug5ocr4v4tt5v8p6ibf3e9lpg72cin2j36vs1b4q8ug00jksnueylo679b8oxu1br27v2nzpoys37l1hlngjmll744y3kq44yrq15jpp1pga8rg8yx6q3xusro3rb65vqn6jyp2f3kzmlnle2lc43ghnjkha4bc',
                proxyHost: '5s5fkivxza46cixtprlnony8c1lxp5b7u8kzue98aynpu943tni6gmfuj0hy',
                proxyPort: 1949763174,
                destination: 'usttj5mwg0txnjsaoh5cgfv1a832kjtj2r8dyuvytq1c3eddc36latooaiqjej7exqp5jjkuhetzouv4s3zr6tbucyj4nv36foi7rlnqletor2i63kqwlin7akvtccrltlasnzljjm7x79j21r1nfkuhw7tno66p',
                adapterStatus: null,
                softwareComponentName: 'b60exlk1uqlp9w2ggs7atzuvn3xnqa17v9at45ev4gb63ztrc03p5x0izf2fu42s7s9tcguin1ikf2k4o5vt5odie7eoux4347oeqtnmcgiiyp91fy9dkkr74e7rkyvt1thuegj6sqe20zxt9cvv5dpjv6c90y1x',
                responsibleUserAccountName: '35sxn7klqrcnh8wpu903',
                lastChangeUserAccount: 'rcujlv8kkmfmwwjm1yyl',
                lastChangedAt: '2020-07-26 19:58:26',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '3z0w8f51ce969mdfhvd2h9ryeptvdut6mtoxjr7o6x3v0zf1fk',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'vdoh9i0onhoybow1xnd5',
                party: 'i3jhgeckzt26p7anwly0lsa5y01epeqvouztzh8hlmk9p7u2tv1n8gchi0ukchm8tehg80wi6sqtrpykop616qpd0vq3me0eefpn0tlt6w3bnme83ol2h677046dss6uav9hp9k0p3evxonn6o1otvbtovi5w7iz',
                component: '09yvzgy8dhvfmct2qjs5aplb7zg9hiqhe2avhzk29i71fxmiy3k8882tq115xun2bc5n9ukm58bi61bkqu3avp6gygfjqpu485c1ikfdzusv4vpp9nrkq7c1aye3u4mtm49twtda9hdt4c41z2tmm57twwhlpq5c',
                name: 'xxiq76kbtmnctp8etnvex2xmxxfpdgmxus9jobo5ie86jlvkiiecc3c1l09kv579z9qvy0u9jckurt11gm2eeyunup7dvkwvqjf31o6mg65v6qzxsv1yxckb9lr4g3lmqstxzx6xzay4fxm0cc0apbiqypppnvwc',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'sf4km1g100qibpbktxms6ir6etqoqf271l29hxvw7e4gbpotsjh7033388j2nlrhd7cxz2h0ghhz6h3ks4krhq9w6xu7a7g9sszt15hel0esizl0rs0xod4bexxiohwtushvpw34841ppv2db73adgvl56hfglhl',
                flowComponent: 'cpuqtczcd5tliahflh557dxmokr2dv3x56ocvg1ntoyun0cla21hvi7tljozmygodeyknzjfgkmzlpblj5vt9xlxw5zlyaamciwxa0fm8li7l4shfesvpna2f1tz5thtpq92kapbfu3brepdykt0zzpq4qatldpg',
                flowInterfaceName: 'ji8cvhh4ems32zg41i4fisxdf1aqzbxhi5g558oi9z8mhjr4du99hg3aj5akmseogcljqkokwdd5ilvdpi5ji3h72pvyxvhwbhj1bfbhe93wmxly78m72vewf8od6zoh4af0koo47xv3vjsxmfdvnj6z6bi47ta6',
                flowInterfaceNamespace: 'mvgsl96vcfw2xdg0ewaogfnqeq7xmvcrzkhnz0iiumzjonaf1xo7quq4wbq2rkbl66kf0u6u6blmt7pw10pgjpydsoilijba6ylbejirc486wxw4k9hps8jr2kapo6ucad5majn38talkhbb0blmjmxob0fkzgo4',
                version: 'p73tjeyni8o4p272iu4m',
                adapterType: '9u12875si9gq1kd5n92u32r74hynwku01efkre6k9qvtk4nuj3w6nvgd4bjy',
                direction: 'RECEIVER',
                transportProtocol: 'j4up37jfot0g4e8bo2s4m7mfw9f9ejc5g40wqx5j49reuwwxd6e9vy9jay4g',
                messageProtocol: 'zwuipmpgq38erozmc0m1w0yepaek4gt1xtxbd4qg3peuuk7esy9s5iokk8qz',
                adapterEngineName: 'v9k4uebxdyfb6gl6fjel89uu95roe678qluo22bfaplf9r55c9ykw42gr0sxbw3imjmbxq9nzjm6jw4xzfy6alzyhjpo2fyx98h7xpi0fod99tzzv6j30yb8941mycwnl70t91l5tw579cvoosw4jd8qpbaru8f7',
                url: 'r1kyqr4akwib992a3c0nw0o6dgm6ye7zsux5g7d195ve4duyelja5o6cobv6g43gd6dh0vespzt7xfd8dngvutvs5etp1e9l2pq68duscmv4sa4xjqy8nz8zyzlwafsdjrjw0u35rg95ypgqxuswtwv9gqh1u957d20zgzirq2nrcqejipv50cwtu4cvjclyizdj4sc6h4oibmf3h2v06sy6w08rhociz9xe1akuoxilwy6r56r8x31jg64343zwqr1q4rxfyx6ub5xedxcxwn0tf4q1dntqho8guxmr3c68mpum57vu40jfouj38gre',
                username: 'p9ddbf8xrmlx6dfib75gua2ftx5v10knp2p8v8ju06ybx4hpzjiz9dw0xr4v',
                remoteHost: '0nij6tl1wruvz8pn9kjpa7guv18mi23dvu39fs0crvdqfavdbn6g3j1d2kkvinzx53lmp34nxy4cbbtydinpfmqb9hehrfz1ilk5aapfapurwyl74gupvjjwj64rhjqdagp9ab3k26q4kyd45wz93rmhzmprrn1x',
                remotePort: 5127487595,
                directory: 'huca3ko44t5bmg4bwjqrcthizsh61mzkchv5mvd3t94hcc305yyyaxou91p866s9jf97r4s6drce2pzn3mf2vnkzae3jtix2pe6pwfe1gkswkb9m2v5qfe4upqwar8is3t1xp8kjvg79lxafnlvsw5x2l7xxmbmathhmujtwhxmrin2j65iy9lvnm7ypmb19r00ks9lz7gg9qfp7sdmpd02vu317q6druqwfcjtgq5d2e1754pqdl01xceu7ivn5orkgxi9tqlfe6zrmz7k05s1je7hfh4wh7wukmur15e53flva9vwira7ixgs728aewhwegluizronxlrkh25ddrddnvczzv1s9vfow3sijmsohqc6nrddce51lyl6odv1yuik2vmyz6u9uqt2wnxroyiwke4joisgahyvz2essxyah4hsez0mv4wrbda3mja19n99p14hekkrikilt7eci5t8n5xoxsqcn9uqtcl2kdmubu37r14pz1y8y449om9vzc7pfjmfsk11muzor68b4h7ftgq8x98i05sm7pr02bqez7buwdpzyi4h02msqwro3lfcafzkppwk98g52rujnuu9iw1ngrmweo8yggpwg6vou3ac7mhqyq8ot08wgqeser9p7vtsumxqn80gjtr2v9jccxfy0i5esytox7rrwbqgm85n28xt2401fuf4fgswddbcdpew860eypgetjeepouzhbpcum8ui3wkuimgieymtphyy0ady5z02g09z11bgju1w3f2ky8x3y1bt480jtgi5ca8hfpdhphlk1hjp73nscjpyo9k9wix5z30u7sbp94simgwilvd53etv00uy73jbtswse1hlil6fp72e4upvpotws4q6ln4bsu6jdtea9cxhghzig9z5cg77qh3962a7k9ljyble2sm9caxevns8xb6pj4civij659jdgiel8x0xtgscdhhs0bwmfc0xo3qdb360uwvb6z8ht2iyvs6jqvun42wwirltq6meg5g',
                fileSchema: '2p2hgsamo7iwfspubej1aveo674ekit79u3ya6s7eqaniz2z2lmofqyvtm4nflqug9z32s6buo8mjiaw3uq50ncs9x5anfyp8axf08hcjxt63l1cbhf4om228h0y7ftol3z5y38b3qi6beczd6dzoz0ki8p3v3airas1mc29nac3ppln20qzni0dv0kwqytnht7rn0poja66elq3p2qikv5i29qbbossc9frln0mf39h4pvrafbkxt7ms4xuftwh7chj1x4mao3r169i0c791einreu35kpio90z68h0d37fzlav0qzb0tytq2l2iliyw881av4o84n3gtdmeuo56jdp5eqqy58vv1nqoamifg57d8vqh8o240osmbd1mar0pym0t8xsvmazeb5xshmyjz40j9w5d2mybmfko4k59t2vj2qr4jndcn8iljzi61djvpnz3iezd4psqvjjzuclqs059x8ii33hestimzf1ar3xdhrgapk46ylvqofwf7mjguq474wmui0hwptt4lr7pkcz1oxrmefhnjisfz0bkwsqvig1b4g9bycggbalb3locoshc03tn4hj3agqvyd61qm8ky35ylgbp80xmnguzoktyqe0tj9op2f5lyj7gal52zizme4arh3h17m86uxncx4unmnhmxu5cql1hd2j5aesw0j5cr54ha1yn1ls5fd3bx6lsd07u5yfla2olkxkr6bfjdsx3i7fr07x928886ca25qitvk19cmtd3cs38u8d83t6cfh7xreo67vlby1bumueijbpj24vnlza29rjy3xmvmed33kdegh17uke8oh5ruaowyg12etqjqn5vdctcb2ixv54r6n7v5lh6akje051ybgp4c7h8eb8nsbbyqpmfuu5kbl8kg0ikc1mrmsiadxx3ctmecd6ea9dn3a72w9q4yyzg07v11bi5jufss6q1b2g4vjdwqssa8iq64h7omesjxjejuab5f78zckbaljf0j1vatwk5p2zwoilnt1',
                proxyHost: 'bxs3likjwphf90kl9gjgkww2g008ns8yvv0pufdset7v14fovr15hzxipew8',
                proxyPort: 2902586323,
                destination: '4njle92e6sm6j29hklvzq0rit9igrcwd8dd860iadgsompr29l37v7kk8bx40n2mmb92scky21876p86bqrkba3bpigls503vt6grgnnjnyhiwf6ls5qayvd2n0hfemr8krwuggr7jtq21yfkt4wjb41upzakdvz',
                
                softwareComponentName: '65d8nvurv7slh0wq2i053pm95kri5mfd4ic5zj6b11p3kgn1igcrb8mkclurif9d9i1q9g719y3x8zgn6cc2j0pjalyzcjdqfhugbbtuk0eaa77tav9fs58t2oc45e4zo24v9bmo1ek3q36h2chaun0esow99jl4',
                responsibleUserAccountName: '931g4shh6y090ohoy2h6',
                lastChangeUserAccount: '9x8pmzo2abp0s38g2663',
                lastChangedAt: '2020-07-27 05:49:04',
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
                id: 'synw79kukk9n4isk0psx5wbrza9zagmwreior',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '7mcrzf47mg7i97ynt8ahxs3emb48xu8mdb3457n61moo8487e6',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'pcjbc19hchwedctorpge',
                party: 'enxh5ihkat28xltgphe3wgbt8xkimhubqew3jbytkpzn9z65gup34cvetywxn94dbcj9bq088w3ie1uizk2echm41wjy0d2gsu7vekkd3zs6te9peeidzty0hucfdvv96gi7c0dg45202zcyywdgevl4re5nr0bn',
                component: 'slncu1g4l7yc7uw74p1tywgg3ukiqf3iqajcvqhklpv5d6ecit7lrymh4gn5lnf35i0su085c3cb3wxr84zv831durrscid5g045viyz4jbta9nvs628nfaqmnswjvyoggrneq12gvvi0p50jf4cyeqhztqxks55',
                name: '737btapq27kfrn2fl6qsg2dz4qxh321y5mt1hhvxsopjunm2jfcp9g30fr2pcy8c731u1dv5xbhropffvi0amakkookh1xu1cyghxgbk2fvb98y519oo8iguf823xl0q5ti4vc27najr0yt1hyo0xhq8pdwly735',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'o7qrlp67rs2x3tj2042g2zi4ycqc0k9t101nruikwkutdt8p1xcbzf9ahj26dgqacpkrflq1cusbhkv64yy86goyxattivhn8y7qhh7ejdvpjqtt8zbzier4maufeimmgp67yeik1s8q3eui81n5r4ryb1j6gabz',
                flowComponent: '75q67j9w3s02vfljwa6w11fnfkw3x1ybfnmof8hndas9m9er84iekd9dtkpzlyfx5shzoedpjknfk6rxjuabmf0rhi8xc032vehz93jx26nmxlspv35pxkxbszi18umjs55xdhwwf2md10aneqaan1oo8hia8g8l',
                flowInterfaceName: 'xyh18fhb0dy2cms7vrzveqwxiigktxp0d2xjrazx0dakwpv5ikqsno6hulgvgf46h7n5a9m2pkf41vibg6umdgovodofa6mnumxhdtir69af7yxusjta0zjbhjfjcbi79jihluvgq56pf0hsw5me66uv9nlnw2pl',
                flowInterfaceNamespace: 'wdyoe2emwt8bh6v9qwj6klldisx8khehwjr8ey4rizjsnrviw82e828enck4c69ixrx6kf0s79wgnt2n42vq1v3gq4ab5qpjquybwu8q6otoggn3hxnheoztob1zuf7pqap21jo3ehpb05zpyh6d7prrr4z3c8lq',
                version: 'wufjj76jjdtw6o9mjxvz',
                adapterType: 'u3qaful5htr62sj61lujh5csozsmhee7ugmehw61ihpg3znoma8auwns6urw',
                direction: 'RECEIVER',
                transportProtocol: 'txi7euxqv2u3d8j0tfby33xspfzag6dyi8j2zi2vginandgk0g0uxoc47cv1',
                messageProtocol: 'c2sg17r5zjq2aprzxfgr2dskdedlhfnis77mtg7apsck4oj96gtfm5ymnt7s',
                adapterEngineName: '4d1ldcb1ze1r61k3yxo9pt0rmurgsyuuz2nifog68ico8f5uwmbm2dh1729loflw8392t73nemb6ou865ruxp8y3nldh2miealkrcyex12t8xmzykoii91vyjznmsd5wohxbf4mlmtlxbq2atqxpvtlkbbdp81m6',
                url: '9cd77e4ugog9f4p60ehafftm3164f5wne55l10pmiffumd7pyjsng5s88w50u9qt1a9nl2nvavjv6hx3cvjf7ohszi4mn7xl1jijr1o147fyzb2uq1rfkog42psqhpau39krjrlr6sch41pem676pjkocy70keskhejs4n5294zm8yzsdgpphj4n2jqb4h42uaegfply74p39fal65k6emt5qdxal0y34uzbsadu7d73imnd87ba90bd456gs8p74e9ux5hl11re5m21h0klqqfnwb01203oqi1ss1kj8d8upm3oajx6uo56dcade0sh',
                username: '7smx83ui0cu838okqmgxa0in8b51xqndfraxq3kh50pik1vtv93iyebuie7s',
                remoteHost: 'xyyczyt21qf93rlrafjjdfzjw7kklezed4d3d8zicduafeg44y54y9qoo5jzbvc6b2i06jnik1wfg8gskaf3kkpnks2xrrd4zrxtldea25rmrj27u10ssvmfkyrn19yotfuf56r59yljna0oe4i0ize4otlos749',
                remotePort: 2010108789,
                directory: '44ye98padf2pd803y9n7h9s4fkgv3wsdqy4damrxnqpiqhhlnwe65ksxmaf291zovvx9pdh8ss4glngqtcj9gx1oq4n7cffyaamw4nt203act3xrvq11qcuvl9x3qeivful8n5m252azqmn5j1cjlun5yz9xcf1a31xd51oflf2lxi56ls9a94fbpujxhgl4fh0zt5azngc9ziwzl0kb8w3k7isexllivtwo16khka5pvqub8ss1gzh0rztg5yp74udw58ywr90pkkafbgdj7swfk7lu3q7ltcoy8z8vya1wxojfl634lkhkxkvwg3fa7nf5mjefhjndue7ygd7qnggfbzgilywwkrgqhmsfn0dqkxrqiyrmv7pqy0e7he1mw7uanls9i4pqcml57gqwpy1e5h9rf2gud9e756z8es0w6akr4mcqllmi0bqw6s9tfvbqqszma2kzktlmj04dblpfgh8yrkdtnql1gccmnyqehcfzobznokvbeqxpt5ivngryk9dj61okfy63ag2jib9yjeu78ngmnenmued8cyu3fazrumps66qgh987zmfkmdh7r07eq8n06aapf85trxdm4qaf0xex93bizdfgftcpbbtkjjk5phdymso0m5t1ju7mjt721lbt562gq5so2uc99li1fkhsrsihms7onae0rmhjeoivbp8pasmf5lsm1ocim3zs86c68qm2m11aoe9ntvt9lltf95pwqffsm0wop761ax9ndzovmom3r000rc2kec12yl5an9ogf0z9ak0ly1sjpaja5egeak1l18h5pjpii1wc6ea2xpctyvbquvn9nav3vh4s23snqe4bopn20nutnsfqd7tzu9cly31r23ry645juf1v2p6bd5fjhe8fyilii2bvmzob9a2rzt1pzk9l0ctcjz1drncxmozbeuck64s7pi6uj5p80hbb70ez1tbwjps554ntnc49rr8onn3xzahukljzgwomp4bc0i5yhesq3kntiya8ezcl',
                fileSchema: 'u17gig5ya0mocnnr7tvmtx1kl61pvlqmhjgud2f0kkjrmy8hfru4ovk0amjknqp2yjy9u5yi3cl8g476z8062zx94uyjnws3cw67m7swjemtnczif3gsy5bq1t8fi3ai2ue6o6xk9ya4ladcc8vlk3ovlrq56fs9u6goldegzrpipjg4yd778axk0nq7h4vc5a0id9xtlcm1qbvt1zcanc1wcjh66r93mcn9w6dcnhedesnf3yu85defaflvetjj11lc3l3ulkmn3bql06l8cigeoomm30cex4nfwimf4f4l11gsnobz83x4wnr4j16xzjyxusc0u0zp0uujm2wakx96mz3bnq0lgaxrqowvvx4d2voq353nr8ayz0tdp1sgqr4crvkt9ei5vccnwkal0l1yje8t78kgs06u14w6o73srxt2skrtu39qi7m5f3qqn1vw68z2nn4kv825rusygs5awqpmla2j5ccpy1zx1j2b7ehv3gqt0l3ck4jt4vaunp8n4t7eyz1frnpv9d861bbp9avgoiu91m2gs1u9e0x9dhbtprxa2lvra5945ce50aarxhnw2vtf3d5jik6r2e5ozlkqedpe74o7uknndn3k3d1abe3cpyqh37p8zff3zmt42pilckzgu5ssk73db0lsy7702nhh8zgom5wgcttsm2ta5s04g7e69j2kcrdzavxwj11rq7j4xcu53y9z984kqtd14c4hifhknv57aey1xakakzihnrx8u38k4ylc2qrd54vyxvquu3oe6hmrys6naitc67nhsr31iud8oj5jm0aeb719cg26pt6l5062y9q2zyin7bmtiyp4kr1ar1cdy9a9eaxgyfx1nuom0n0mad1wi2xsbi4p0ev6jjfiu9y1rlsmfok4gjjbc3rr9l61fs1zb1h6h16pnvpize3730z8w7yc9rpcvbuxb59i1ryzfxsced8qo45alo5wrk2qsxj9evipdhuk2s37pk7tx7s4f0mmzcy5zb5uxhob',
                proxyHost: 'ovwju6wbmdml011dbhbu4m4w69rcwjehnt7jxoybnpni2fsa68y6hfmezkxx',
                proxyPort: 7276843094,
                destination: '0fuad6bp3ujelnp5tbbmmagjwsvwjogbp2ciun2ns203y0hdxn7pmw3wrbn50yrc5fff62k62p8n1zbtxi1rlip3ubh3rvrjoflv1oyk5uq7bnxbach6j4ini4j3uj9wuszx2rjjl18pz8h80l6na45fcttweooh',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2me9snsruzjdzbtqb9linndftg6mru6j2nk24e1vcij36s1awmhsykysavsnezk435rufcva32cuqg14fasr4t6lsca0jjas4sa2yzep3mibunqodtrue89jvsj5n2kr3o0b6b3hnqd86yihuhvwwr5o1ibvh59j',
                responsibleUserAccountName: 'szqbu54g42eb4fmr0zyc',
                lastChangeUserAccount: 'xdoq1lamg492g18chj3o',
                lastChangedAt: '2020-07-27 08:45:01',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ChannelId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/channel - Got 400 Conflict, ChannelTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: 'lngp74kh1yfupkg8xb7s4lybbtojbpruzjor8',
                tenantCode: 'p188oxbvwqwbtn0hbv3yrs3lh5v82wiy2piwjddsye1464vem8',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '3edtvn5hidgssd4z1zzd',
                party: '223obvqzd8af10h7flggy6bx91vbeb6qiak2nqwt30eppdb6f93e8kq8zgihsqxmdl8nzp38wr7ev0ck4x5jv70brfhoestiwdn8hphkxe8p7b165w2rn15s2viuiyjeiwujp7lecvyr8djay5n0xomqk0dlt1ep',
                component: '1m2xmk9lgmu0d2842c6x6gv9uwmzf8dgc1cofknwd5zx4zpar8u0cf6gz4aqm3byznlwrmv4cxe5duohy5tj8q6ku6hpbsq7nxfx8ry1aosaa7mub9tooykve7djxz7mw3la2aaomizulqgkuwq1p0jlcg3gmvp8',
                name: 'hymcx19usbglg3aniulvk8af4ibm18wh41btl6z7c2sj86iv51ecly3770n6lehcq77j2u9kr58pofivkckv0s864q0x1pe5oicswayqccfod15hbq362tpjjwp7sxis8o2qycgnc58nhy98azvpphx340qdv52u',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'hfjuxnmmjrcjtzt8qdavdt2gj42g53w21bu4e6t04gml719np4jddg7iy4di50unxr6raj4onmy6vcm0edst0loq12glat9jzuq5tpi9mrodiew7bdph8twcvwdmqdn43p7m58nhumdsbjcd5x75df5y8icjdzoj',
                flowComponent: 'nxg5zq4so2oe9lxli2y6rz2y3pcvuz7taoindo7fbfh9ptu0bc1tlclbfm77wmebmnlksyvxbblw5fb408h7opyddewxb5vvkxnyk309clnb1sju3gh7e2p4fl4s7t0ewprjdy3ttubvfxxmqja9jmxl0ureprxi',
                flowInterfaceName: 'mxxsxvag65zzfs076j7kb2rn6dqmqpck5paxth2wjg72syxgr4zkyy3vggckevdda2rszlilitl191qmru08h8u92995itd5hr7zaqhhpvwnqrhjmbqzsbyg4evsov1xvxela2xwd7hputvssrdm27e35fj80eur',
                flowInterfaceNamespace: '8lfeuqlqv003hcqfm3p9movbbybi4o9tp5rs6uli3q64mf6pb87g5piuyx6m5tqgcu2jy6d9zy8ck1ac5wx8rappxzsuafhp4pg81jv5cozbucl5j7h0cl9rsd4v7yy8o1j89v8o3juyaou7m2f6avu1uqbyqf9k',
                version: 'mwgjz7pt7s32sg6ib7hp',
                adapterType: 'fm3locw2z5fhmxf181rqpgmtppqvh800yflj0l3jzffejsd4qszldz7feehz',
                direction: 'SENDER',
                transportProtocol: 'awidtfwbi3gmembm6yguum0kbe29vq8bdgevmvkoylf8mqg0ph84dlhowq1h',
                messageProtocol: 't47ixgvdbcghpa41rwplffkbl4jhnov6tq40tcakfweaecuhqmzsy0vk4ctm',
                adapterEngineName: 'qptw11bjeo4bt49jilnqgvuxwhq0winq6oklinln3rnwj4f9488px6l6mhqec2laggv9fqilwj8npxpupfb8fduvylu8233ctdo8hrgqrw8q1kh9oqb5l2vk5w2nyjezg4y668dhl4ojb8xl1ejg8bnpamy3ewt7',
                url: 'cri2bdnzx3z8k9r93whqftge8sl45rp7ilo9djei8ef4879sqtu04espspecac01u0aci5aadb124avfu2rgqkk5ejttmg2iuzjtisg57425booqo8bwgsmkkgcks7b39wc3kaemp3j67z9itb63qbtd3msqhxb80zwcpp0lkcmoi2ec878k2k63ntzkf0myb2xa1g20bumbln6e307wa7j088l95wzv9cxz0dxw3uvy86ygwdvdha1hvrbb40mzbfbaqqesnngtxhu5zfxo10p6us9ng8b7m1leyus8j6k7ao4zeuloly7ybhabfoqa',
                username: 'w1qedqf12eptm9kjpxm2k5cn021xdhcq59flx6sd3k2ljjhdag58fr9ofwbm',
                remoteHost: 'oo1xuva2hfprqdjxj3x67thl8srs1dtj09rbu34ut0whzykphujexrrtpnp79pw259kue7y02hbogpjzcvd04y5038yvehfr4knf3slak712k6h9211s92tjc4j8fvt9va5jdsjo3ngbhszip3b4p16pd6xaswkk',
                remotePort: 3746814909,
                directory: 'aw3ycdq7pygjc8tzxkjg2xm6iqp1uw88acut5p6mmy9qqmgn8l0u7e3hu5oumvb0ka0uude79580plzinv4k996h5u42goy2a9m2f4z6kzksffbahlortxb0hjorp3zeiv003lf72pvjwnbg446k73iolwn9mrr4sicm17cr6h6myfjjapnf25i00l12ozho6ij90legoj0ad38etbt7vlu6q33psy9xhlzc3wmblgtfc9r6kijafi1v4yizz2pqb3svgyke4dmlv4igyszhvruxxfq646xr8ttx2it4d41s73qd2wul94e44pkrqwvu5krdg79mxnpqrxqwcmnfei6gcguajqtoust698jwfp294sozqvt65s7pu52ccicxfeza08m42igfo2mbu1qo2azj0aq0kll6szw5bcgbdu3sme159ehol2bq6xhv0fg3n2zpu8q29k8ohoub465okhboyjyc37ju9axjaocpaxvobwzne7khtqi31hxa2j0i96sna4613d412gnyiotxuruanii37mrlxjvoubcxrbkii7yy3q0yb5twdq61n725xw7z9964xi2dma2amrxyxqn2aj8qeizworfkvorj2qllqdy7hptl8xy4n0w1w9l6e9rjoa6pmrr6hlfg0r9rt769c8nci2ti79jsnkh07jbyr2hx62vi8o3a0mbr1kkz829sjjjb2uwit1y8i0xdiehenh4e1em78znrhf1m1lxpvrckqpuin08lwv6xqy9k6x2v637se759qnkcgncn4pz5bwbs9dfl21htptq7qi7gy6fufxu04yfn4z0eyeadlzkluuckmbcdzk42i0znhc9z6wfw0ctowbwlqu3vxqtr6jjdftj73g4o4mj50kndxtau6vbanif8kf7ze9hgqb05l84i7hj2prgflzlsqpsdc2n71gqj6s8tpwgw4v0p7mzrxp5mdvb6nyqr1inmt8tqowns72zax7xydrhr3un764tzcjrqt5ub6ps5n7lg',
                fileSchema: '7e2i7ovgdeu7qssiao131unv14h4rcnyjo49w2kok5mhtl28xgleqqczosmqs5p4dww91wt26h71etsv5nyw8fq3bhvn4az96n9rcakvvi51l5iuzzt8f7ivgd8i0j1dwwf8bh8l5pwjyrnde0l755o1vfcycb0bfkjdl29y3g0js9jig1ik6zil074dbpl5jawreym3b9onshehjueg4tcd1nhwatn0ud8nxd6k1zovryu92dz9bz8szmhn1izitita75qvjgr28y5mzc7igkf47tf4vqrayghjhe9baiho9fybvesjuob90n1xhwrdjyxcjezxule0rt9bgqwf9rl194wkavsj6x4zps4huj6aua3n2mm1p9um3zhj29ulfjzdrhx74b55k9dwxx7mu0kljg5a3vu8al7lbtcdotlvk6x998ollzpeyrhb5gy28g9e8u1jnywabmzqra10s9p8vyvunyoruy88aeptfxvs4wdcof7hjaiocqc9n90kjm0oh0wb39wqykvezs0vns1zsh9lilnkx4xhdcqyf42wjqvrw4aem6cdl1aanyfbjlygpd1muse5tzbf5ngb4vuxd3ue23xac5f97yz6thk59xftbtir0kjxsou931taa4j3uwz7bspq1akecrrqbpd1vf5w9bborzspq2jc4okhdpeelhwv2uq3qds00s5h69pydsmkl4m0s664ysys6p52cv53xnrmci60nxfy2stwgzkgopttjmeuzr2ks9spahgnvm7gqp80lvswpir7w6oy8n0eiuo2z8z0mugje6e8clqu4pku9ildf66nn778au0sicxqab3mpfyq66qfvc9wnr1fuwd6xt3vlqvz1n2zy1usuhys6be0vshcnrkumcf5u4ok9p6xvdp0aqwqa05uwlfvx933jmkllbe25h6rl7e4totow17124jvxo6p1f22av3mmw0612o5hclib3h6946g4knkut2i4mk77jquckcjbrab244sssjcqjxn',
                proxyHost: 'x09cx1f2g0823k8252ubyw3ekdbozlu3lwhkntgujyx95x1u98mf2af60cdu',
                proxyPort: 2563180779,
                destination: 'j1lzfd8kp81ssumronup10w3cmklbh1u7oamb5tgisi56tldzfjj1yilid0jp9flfwwkwegry8h3ros6zirx6zlh36lofce6eallns67r3f3gljxtfqr7bgval544suwa4luysvurivyvu7rca1b918yi0w7h8yy',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '1zbvwdmoggh1q91i5qzevl6r963qsabobq7ek26u1zrkhwgsbj9zg7k5u1yrmqmkyqudop1kzbnlheov603iehiqmo2oayfwxxbyh3gy6rmcurr0hzx82tucba4ta7hm3at08ec66h13p5guzugn6jo88x9jal0p',
                responsibleUserAccountName: 'kfe08dw7jy54ejz0vjbo',
                lastChangeUserAccount: 'zxqek0ghqq2w7txug53o',
                lastChangedAt: '2020-07-27 05:59:59',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '81ol41f82hpnolvotz4f6jjrn9kjq5mrcuc63lnzdhitap535x',
                systemId: 'g1olpltkugbf34tfk5ad7x9ym61dgaud8bu8y',
                systemName: 'yuekro3lf9w7pbqqrz24',
                party: 'mt5k2nqc1sgw1cgp23q0s8rv8u1db0bqd49w6gd1qlpkwm9o2dbjz43q35nysu5xl8vy5jbjnq0qd3hpzsfv9yi6smqgaqabtws6glksj68ktfv2vfi0pbso9n3br1z3kapryc0lpbxeh2a6k1dceyspb977zvdd',
                component: '022zb2mc4jemxe5n68ffk8yg1h1rddfw2gf7hi7q4ghsvfushf49x8njctd84qrasdx7n0qh5sznatbfzo3qee2dxrxmb4wqkxqmey5ylcxfj4446wohnlvs2lb5lr1gyi95ndsaazmn9dzxmunx97yxgerr5hgz',
                name: '2fv7psvvos6hp99mj12e036glsm4ikesqzx8w2cxvou52yjoikicejzviqrb2hpmzvuvqb86mzenuoj5sn20ox1ipa39hs0900n8791p9lf20pbyt6a1exs399oq7zodtnadxc6yu5is3f6tejyr34rv2geuvluj',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'lgcjs2yvhsrlx7txo73bw6viq3ssjm9ge4g44brx39vuzk5okypym5ohmfq7w0v4a5ng5j74c4syw5zi9kzxcwdl7idebpq3mvhrstpx8ogqgnyr0hfsnjphwc1l769p14exgc7zndl4v38zyrgdnc208iyeo6jd',
                flowComponent: 'f8jd2vxx5bcrcauiqj5tnxqet5b7skefsjpsqyjo4779cu9crl8pkgalcoql6q4lbz7jfi6icqd2d2hh1mu7eebnj9h892chlku6nv4fd25qp5jrskeuyuyw9wayhdy7e3nkkx7sw9d8aodclbnh7ebeztl25xpo',
                flowInterfaceName: '2j9n2reh1hvqgzb009517mrl0q4qp4eg9g5xm4wfh9nww0an3e5ttxsk5km95ug8qc3kgd4mvh8215rhpfj50khdwlpv3go166l587i2m1scuv5yb40zf0qhhsg61svrsn553pr81bfszyncbzgd60b1jg774l8l',
                flowInterfaceNamespace: '79lv56csetb8vu4rhfw7xvxut265lt8n5rkhlw33tj6b59568nghez90a6oimxnhvyjckflrahwlkyykttqgn4c79sa86xt7e6q83kuvr8plxz3ywpri7x7el7ije6jg49sf4laqs1xnjffflpynagt7sf8yl5c1',
                version: 'rw2l18l0hiehpanbrajh',
                adapterType: 'h93epv01990nift1ikkdmc2rrwbcvffmq4hfp255ioqed60rxr3lxt0o840f',
                direction: 'SENDER',
                transportProtocol: 'y0d5qzeca3lny2lzeoxmd3a6nnn25zdz1tbknhrwo9v7ygpkjg6n4xy5f3y8',
                messageProtocol: 'a0287710y7ge77rnwb3llbtrg4r1kez3ld6bkieqdyv25lkuzjyguifllc5l',
                adapterEngineName: 'e3r6k4sdhyz26t3mqy8qid1uyiwmvrgs48ljdk097i832m1x29qy9yefvu7aw8cytmxfy92jm36pa4nb8qn1p3x3455vulg9kry6c8b0zpz2ub00kynz7xgy89b30acj8b5tijoo0akll2vfirumerzvj6f3snjh',
                url: 'ctibgjzet76q8wmg5jcs34fq04dk5jkb87sr4itv45a8y7zcuq64ln95e00oojr0jghou5959yxj36x2dmf4r9qdf8n43soqebs28lzj9tnvdf3ag5dl1su5o5gubsy0szxmukr1fxqdzzsrt3goavdtokqfi8bu9efodhld5mjdq9ilb2vuv0yys5cg56xmhv7v6tsbciojhdezdd9ra94ivhib397ypc2cxcquw5k4r6w3cda0j0crk42sz4owcwq3lmbq6tzg88g96158ye80x023guf3uhyxdkzjsnid2jnruq0oe51naqg9tg1k',
                username: 'uj58eyet8o1d0gsdyubxxjr1g9h83kwdb7mv9hjo3le4bef7wruml5vjyanl',
                remoteHost: 'xpjwokieiiy4wah3ofp51hb40fl532yyctdgvw5k5h3czoynkm9gjofd7jyti20rpa7xrbrcndvqvo4nium5ufkebnltov6rse72yq8cem9k23bfb8nqvw3cpks06s1vyy6gjp4le8f79e5pyw1h9mi5vgfsxfni',
                remotePort: 2211625673,
                directory: 'qr2p55irk0cdnepk0ahoowb2m4nfxg676dphadvyipq3yd2w3gx0td9n1fra6bfrr4z7ky6ao7imldx5bcrvg8k4vur1xan9qx9ae8asrlie6v00r9wlvqyg52t6iw3qlpps3veuxup1wv8mx1zif8u3vawmxosjsq515wt2cfai28f5feapqc8r57c06s9mmpvoqb6ba8xyezmmeg3dmh0w9l29mc2w168f2ec5jlsushslbilu2x43llfrwrk1rhv49w1p677d7rn31rnimwuyx7kr1mj7wookhgmhv5htc9850gjrrsfjf119fhhcxkdjqxp7dhpl9lbzf4b0s2461z91md9adl6c6p2dbxy31iae8pcz4wdzgmccdph18acqdaplq3r5tor1e61y07l408957p53v6wjrra65xsl7x65b4nhkpxnz42k4qgesxqu9skx8yu834bokl68v16gofy22kruty4xvgzsn71vfpz36hnt8t3le6c0tqd3hqb2rkwsy9kxc6fgoyai5c8fk3hjedk3ndkua9xltuyalpdmcudrdqn4oti52tgj96pknyls08dmkzww5fep600vdr57t52iq5krj4cods6u7oqbzxl8ijca3cnyok2mfwc1l63arvpgdjj93l3wpuqvh9b9qyvo2eo27hpbkltg9lbzyad0g15w5v4tlr5fh2pxa6fqpz5g73ptdboo56nx34wm0s11wxpoyseg6o6oqbxnh2vn8giwpv4l8han2pex118zwxqfb2y98ekgf7s5vp3qxljioxj3ayuvlbaj25ww601xv3o9ra05sww2poptn759s30d1m946j3it72e7emracwr00cuqybpj5tidc1vi4awpdys8qpqnn09qno5xfkv9xowfpxpx39193brotq1go2s0qxtzj7iwg6o5echbosmeffgkebabaxqdtbairy3ooeolh6oba80a7b7941fv04brllx9r78kphixird682hk156na1yd698',
                fileSchema: '3mxdjh9857zw92cz4rxo3rhv72hxuj2rd707gd2xi67kp56f0h4z4yzph3x8i5ar9mju08kueu0j97z6dskno5xmrseggxzcwwhg0n0pq9c8zfm1qsgqt1ykt7z67agb7tvd6ev0nw66z4jz5sswt1edfc6toaayis6hvadyeg8q48ns58k2g6345nydwoyl3sfs5job65365bb6y4i6tbfmx6dhh79lesd47hf5ee8w1vu27w3mdrklyqf3b1c63ng2nch9cm583o2eqjjxqqzc1q5ja3xkxn6zfqm7ax4h38guejscvl10ua2uuqry7sdgjuzzllvguorftz177gj6vg4kts33o9y8xxtkvtgtfg5kjezg11ocw72o2vipwpc1o6sbohymnxfkgicdae4xjyzeqy6acbuk0arp2ilciq8ofp2bdsx8py7fizg7p5fbxug7cayhhnkw06mqta8ekvg9qipn3clv7k2idq960qr47txgs9bkyok7gfxy7eoj8k78m5rrl3fnw1ohcz9ot5sx1th7vt8u1jqq8e42vkuc8jfjqmqvrbb4zz1z0qm3gqqs4iycmmzjod1pd34vfqcjhg9rriou1i6otp3pjvfg6emvk39md9ye8wmis0h6947q185w2g5t9akqlle2ye098yll35oj1iy8172s9vh2d3k86lzrtqqtptqgqgoszkd4p1zrs6q81d8ci9dgfexkaodc8c8mtna0pfxrq0oy2fj0qlzcvtx8ptunc80rce5bmwkn2zupyd233aeidr8abdves73gpo25g06r99rk06q07ktm3on6cke0vkba6pweafaf0q8psno12bur5pfuvdqstu8725hkz6yrsreb5vy0d6mcx1pgshl90yd72hyqctubzj4h2fn4wbpd95t954thpwq2ehsa8md0qrkz5puwwht0qq1ixarjr7bj4lczss3dvafw0upfel3anoq4czczjdl6kyv8wpli3xfmqfrmwhlg9fc5fqc0',
                proxyHost: 'fp712xansi2dyq8njabv5ud2o590vinc0crmxktvzb3fmvzkq5r8r26fan8a',
                proxyPort: 1237456299,
                destination: 'epz23mfi762v1k8s9yilhwtmmk2e2s81rvfk3j8emhsrf7ajiyedfpnk1ufbykeqezwtys3o521wq1eabz9e7m2kc5tn970e4r02948n62xfjdicd2ktro59njp2zzycms9u6gcx49o0t9aubzpmuk6hjna97vfa',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'pj2oke6j9j69z1vejkv0q159lmkuwntnsilntzcde5x1zlkzug5jmh4h9jbrujh59c5jvwszy3fywaj7pxs7o6ws61t0ixldopd8ionpqupw8iyu2amdb3p0fzrpxafcevdt1ldnpv5k6l91txn36sfu27pmq82q',
                responsibleUserAccountName: '27hs70i8heh1a9rkf9bz',
                lastChangeUserAccount: 'ekufd80d9zlihze5efpq',
                lastChangedAt: '2020-07-27 08:32:48',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'gnj7k59k64fc75y4huifjh6j22gcxq0x7vderi3ed7kjehjwcx',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'rgkseaxe6ohmelp3ng1k',
                party: 'hcdmo4zhtzu0rdnyzzxlyxqtjd6fz53hmrc871nvt4eo9k2kklts9o5z2qcnlham7pjdl2dva4hricmzm306mx5crtoqnntvbiw20l9gtckzwrwar8xh01tp3y7eaiqafwvdugglvnt97vcprugmn4znpaemsxr7',
                component: 'iva6w0h82jpffwrzsiu54h261mu7hcdybaw36ewmzxx6wul5iqprun87rs9bbme6dvl132nui6xnza2g1ma9b1pf9azvfko6r7k1aptkq75k33id5o6pxrb76o061ag0t0nkcnvyuos0e9u8o1z8uutzp2jay9n8',
                name: '7nss6iih1wwapkucd39hpib43j31wlnxh56z74hmkuna1u3kkw55t1txp8ut435vflg435a5z6d5m35c9kamgpujmas6sip61c3oon7xq4zxdi4mn7wowsfv6nbz0df9g7ywqim5esbjgf4amwzpsvajpuba70lu',
                flowId: 'p855p28d420s0wsc985h37tkn2mz7qvsgxg2n',
                flowParty: 'a7hv2hipijipnlc9phfqjhpbho7yt9ecl3xs5v1t9lo9jqvha1dq53h7c97xj3qvxs1fpj1pziakkhako7cnlzz6fruh8e082mmn2wsepsw1qyqbd84i99ccujk3fl2we79lbsuxhnz3t1qn7j3cccx5wev5r37v',
                flowComponent: 'd15qjynx466culbhbiucn2yntp5ifc01485w4h52otsw70b5l2fwuv996wfrmxc7ol0yuz1db1dayujslwmcxdh8r49p8sdcrgf79s3enhlfixmzb4pjp4jsx3htvge209gqjefsszjodwqjzqpasje7hozkc1uh',
                flowInterfaceName: 'bnmk77atybfvw4dabxivse0awg3iaylc5tsep059t5n3gp4gyi1s3cxq7d1ale7zdvrgszpazak16c2y0wem96z3r5k8bc7xiyfavw02b5r6097t9u5hshxtyqotsmhronraqg1n7jnaei8s891zhwr3jrj8wspg',
                flowInterfaceNamespace: 'kuk6ctori4szchg0kd2hh00nxbq3fug8c9yztcv438ut820da14763ohgha0kv0fjs785p1t74ot44a93pm3yy4f677zluauciyj83gw00mzi3v661ht80x1t0lzde1v6pgnw1tgo29au1dv5cxqxeft93rmp6fx',
                version: '63lwiwjf8gxppm0t9fyg',
                adapterType: '544k6fujbda304u8scojy3zoi2mn9ihm3a19br5k5cm77pe7x2to5046y55k',
                direction: 'RECEIVER',
                transportProtocol: 'v8xl09lf3lw1zx40uixxtidb67k5jxzmtrtbnyljk31wr8ixe94f2kd3ls5g',
                messageProtocol: '1nia0tdx82hq44xyvqavizskkvvdhlbz8p8ye1jgn3oxwlubzctr3rhrb6rg',
                adapterEngineName: 'vzg7kwmfibi6813f9lin92tedpujid1w1ptlrjnf4sezl7fgntqpv5hug41chcpnxv7n36b4brxjt4jmdxdiv598hkg7ddo7s2ce2e9q624wmp43xpx3bf5luaborno6jj971wsyttd5gj19nf50l0g1u17zdfqx',
                url: '0456voilq2kz9t31sitzdgsik7l6w26sqeuremoftnkznc3wnppe942dnyp2tlam1vseo1xqmh460pdfzcbo5q2523sf22dkht1o03pa63gl89sjjk1wjfkoev1576v8fyfp22iq7dg6n69mz9xi5x3fpgxp88d7en22nxgkoz9lgy19r9zmi7q5fvy7cgfb934n2qbpu5ttsqg0a7vm4f3ea1e70539velvn3mg32ovqg7btwd6apkgeqmwpf4m2dfo8mmmarpq63zf3l9cdmkpa8vukifuj9gj6afi98sm7t22uo9697u85iguebsr',
                username: 'mr56fepgj5pw7sy8nmlirta88ep9xal3y1fz2blvqma43d1lxkhxdwe97hv1',
                remoteHost: '0qxryjvymh20ttq7hge6zncmfn3qav23aunyhknuvy4rpy3rc2qcwxusw1bt5m8wzp6xgn5hdm03kmnuob8vwxgg1h6zkn3tqcdabai81ks21g1ywllh4vzmn2rrpymrywtg2rqajw82s1zwtkhnsdbqeg6nbbgk',
                remotePort: 6305522567,
                directory: 'de3a1zws1x9riw0piuayrw7no10ewg5njdvhzv6vozlssccf3o8i95wwu8dcl2996mrsrmhepsl1u6aw6dgcsag8lein5jmbx7bpf5gel9bnwl5newjxbhauafi4q9e2spqjaqhss3hsru2etzbijruz9a3n27zxcsjcrtnkv3uskd1limo9pupxmyspcnxajsq8nzt0w2bb832atsmusnam7dvhooqq1s123rkax95bk20rul0f75agx66zuyiv8mub1h98t3c5ww5zimcmmp5rxxh2q193awvts644op8twwzxf40zjw9xvgcay8zg7vwrcmqqxse29ayquj9pu2eoqdrgdvjqbnvcq0911flk8n435s7eyf8oebg8gxlfdvklw6pfrd9gmebosx85eajd87wtasrcvw7gp0u10kimb3na1zjuwyp8pa0zr35hfwwvnt87ooifbqjt95rpkfeczfc2sykxuuvh4ti167znby0cp2509xxgl6pg96yq4rlhhz2dy3k0i7bki7brros99fupb16ekzotqbfa8pu1s5byrc95xpfb5kx8zujqydbxl3979rzd91nqt78tzsln0qiyh6o5hwt6v0lfduee4gy4krx5aii1duya6vyt7w8vzlqw2kt86laov9dmaezkq9t2smbo0kx24rz12pa01wx2idg0smnt0fxom4ghvo8vt3b235cwg3h1q2v10w5ikyfmmogi1sq8qlpprpnlifjdz5y391zpl5jigutfitvp45fh0qjc60qnjt3nxa87l5xidfzl8fzi0nxhn1m6c1tcnuj0vfd990ctz2mo30hcznbcjz06apusnjpgdbm24ceybiwi00nvoqkkcot6obas5xh21smy82rl6j8y7ghzl2z72znjx5z0jb1kxbzz3sytd3bknz1iqe0d61vxoecqnecuh06o99lnyhy88iehfo15s7aoo4d0nkqb9bb7bie1drqxcezrzq48mbvue8ealfzhq3c8nhi9svgz',
                fileSchema: 'puwn5qdjlefc20d1cd5ub0mtfvwfl6ii3vuakei6cb2xs9yljqhoid7oi4hi26k7duamljzw5xfj3nhu2f9jf92m5rnoehkwe338f1gylebz1qh7juorwnix0nnri3zw8gtfd8xxfidpxec90qcloog3axbcr77685vrqudra80ydz6lpgtkpd420fsge2ek12iv98dd46mquyojlojq6yry2370obb53utfh0wqcfvcwf3q8izrz5nj68fmbc6u2f8qew5ybrh2dox8ei98zsuejbljdyo0zytkt73gedxd1hz1ov1psm2yw8f5jpf0ijw4qvuqulx6wuoewcve8jfpx523o89qoiimz2pm5r6hp1os3dj4i3qp95dyx9z3dv2gpeiu0ww5yxvigyhneicy8h3v7z91pshs9vj74zf8v3l9ece3ycjwp3mrlzw7d1awuecrp3nni6r5wdcuwyjbob0by0fvi76s47mnmyn5a4jgtv04sbvjvul2xn085ikq1d0y2f6i5oadn00t1acj9snjvl9xlhj5ux0uecqwgprud2losm9n3rmjxarqql4pqqrx9xf4iqil2ndrmocuq78liz5jh45g9u9qdws65foi0jld7wd3cftgchuqv9jswb5m44hwucup8cin5ftpkj0mvonxwwu2ja0ucckaa4rrszw8bz4ha87qmhawql2rab80rgmonx5294nez881z3leurgt70iffqxpe8ea92cxzn2hg1ity8sy3h3teby5eptvq6iaygf14z7of089y27ajlpqr6cy2oaqyn8pffapk9odq51fn86cf9sfg8romn096q7tk0y5btggmhx6bzar4dam1d5bhh3cmli97vv135j54azz54h3dpwlcxid3otvwnizfk0t46fhih5ux6q1xlhoyb406am2ttly1xqsldmlrmyy07bj4nm4kgatj1dk1w1ltylacjhoxezsk5mpw8ywjcztlnrx3mksh4cewf6pirdbdm2o9goy',
                proxyHost: '50ix9y6ref2wzi0acvgmrbhq97f7x9kzr754dd5pc0um664k1d6myab9jaq6',
                proxyPort: 7856372279,
                destination: '4ilyxr0irmgvy817kq48rs2v4k3wv882ptzqa3d4usdw8vqd1hv03svtctclta14w25lcr796zjm25a85n4xg4709oe2w2xg1ccv5dl1ty3v7t1su0phyrywk1rsih1vf1tppqud9oc7ey5ue883yclxsxi9zewz',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '7udvasz796bg9xnk96bz3xeslysvm94apktltirpf57laiqmowyazczbr89kims1ztpirhmg1tcpc1r52ssdewqs2wh5naswpf3obomgnmztx92tnl18c5gbk8zb26kmfqz6ss51jl9y32m4x9bjy9hl8cvuxr17',
                responsibleUserAccountName: 'al86g6s8i166ld9pmm5d',
                lastChangeUserAccount: 'ojgb6dtvpp8lq53fvq5q',
                lastChangedAt: '2020-07-26 21:22:46',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'oe5m4292px6vsnb1bi0npv0cgwdgesmbbwugjtyfjh7k8oaclte',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'sc3icn9ditztmbz35jo6',
                party: '6xot3xykhq7xhqu763031qo4zucrore1t7fy5255xv2zryo41rzxlubh5shxfpew65pkokz0jhugx3soickkw17c23ze5m7q28eokjr1ju1l12n5l67wd002l7g8r6igze64g4b4uhp537ej33ovajzrjcna8fdg',
                component: 'o10ydxml584ld6d30ok5vkmz9k5x7pa7epmbnuglreqb3hm1sjjx2befs341xrktu7saks7ygupza58h4t9ivblv2bos6bzdfurg45b93gl4selhpb3bi95ig8k95gi2i67ld062s4xk9y394nuzwme5z25eudbd',
                name: '0qnlh43d8deh1ro3f3q24zhg0jlf232bw4x54sxwf98066qe0ajugo3ho3sy8gxmwx1cgiuwrpvsp87iv90d7r5o872ut4rjlu0htjni2md5kibomv2cn2k3zx9v4bgoyfc5vbnm66c5lbtwvq7628j04x1lfn1e',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'qy73fbqxzeqsvnrq2cr0tl38kwo3jxqnfhtkoc931jkq8inpkupg782kfale6z65tiwdhpekgab0luou7ipmnot55u12lspmvy40sfivcrnhxtm41tb8vvy269un6hdeh2ey1dabpngg4heleo8zj071o7r9dvv9',
                flowComponent: 'k0maz0nac640u7zjm3q5uoifp6n57ox8u11fom6nuc2ybn4j2jk9xcfam7w7sb1lo57xtf4kscmzpqv6n1ygtvfrr03cs6yo313orp9jmqz1usgbbb0hiwjv5nto1mkxdi6rccvn12om0cnxogyoycex6jtx5xz0',
                flowInterfaceName: 'lpry4gixhyk0y5vokdbdjeab5bp6qfknt59j8ybfevmco80advq8f1r1ddi5kt5zj3uv6bs42j6vysxkkce5wx71caw0ehvnjtzkkeoeo14m8eez3dbqwm1b0n0qp5pqauvy5d8e6bstqn892939q82tfrhlbshj',
                flowInterfaceNamespace: 'xu1iotipiaviwlp7u2eisibu2kq383rul5pplbqup9l90jakwlidtelp6pu7pcruljtd0bfwol4b9sn5w1ar76p6z73i2iwb4s9c6h4990cex0un91742upuh9uy4grmbq0xnf0gmz4wf84sdbqkz0q2muabdq3h',
                version: 'hhggk23mpabut542nrng',
                adapterType: 'begzla716d8uiwl4wgrsytov3g0cu7wsgv6vd325ghh4tr9u5nb343j4nr4r',
                direction: 'SENDER',
                transportProtocol: '0quq2vxgu57xjiio3kkznkoh60h33nn7mtey8vb97le3svl3u7i4h3nz3agx',
                messageProtocol: '0wd64y79jdwp0ztv63a7dqnbcda3uizie9f0gul57gb2nz05adxm3f4f2i7m',
                adapterEngineName: 'zl9g27x2uvkvkrau2s4apski039jy5wzx6wxigpy3a1sa1fuuw8kpcjctz8159kje5jp0ye8gy3o47wdcbud1ow9g1gckep50ed1aufnxoz8zdn6hlmwh9xywnzfyos1g8j2pow952bhtgz1rv1ykw9q1th2s554',
                url: 'foyiobc8s4t6grh2tzbfcifjk05sqr4zarfvw5izb1lo90mu5wzl3tkqj8rpylhovpdq48z4zffyznwzxqbvh657zb5jjs45svtv8c2ps64zdcmvo2t3anjkt60la658s9v2yofd6ounr9dx6tsa4tc2jbwmvqx4zrh1byj55nldnax0t5ms7286uiwhkjdy0mmjtpz6vm9k5petx8bo1i8hf4bebd1gdhz5wdljwx5i2b5q346yn5xjrnnhohm8yr6ioywx4068r3cfzvusz35kr9s07atga0xairb12ldu1d8g8mfa4acqzwavbw4q',
                username: 'im4mqxfj9a8qhjuqdj48wyw4rf5b2d6e87ubfboz0tzkskbv72atzh92qqyh',
                remoteHost: '38pyvndyubmjcdufwstrfjla8i9ftx2uzryv9vwe1oy33epi6zizpdglboj9b6ucr2dkb3o9l3i3s61sm27edwykb3zpbj0dp9hqjcanvzd7hp4w5ax2oz8xvik6js8ftwk9ui6exelbewz8iyg9al9kvbyevamf',
                remotePort: 8735238933,
                directory: '14bm377snwnct0jfqb7w14rlf93yfq9knclxafjx22swgi2hu9sjfqm8861t3vmnrgbird0q8d27naughkfe5czw8kp7xmyvpehrfjo7sft1zkvyzr3b58usfmzrbd89l8g2wehu9u4qvy95ggdk4lh7gwvihr6oevqszlq6act8qndvl5uvl0p6ypverfmbcqec6e7tt3fjj9aukcq3s0yss82hyiuzkkcfv0sm69n6t6rjhdib7rxze89unjnx3jikc4jofbldkc0dez4zuun1l5hkj79gl4p19s5vnq2bycuhl6uwpv6dsv15xppgrt20jvqic26kfpite4gw4k5gaogi7pcfdaijzoo4ok02ouxzfua5bmfz0kqnct58eky1md4ajzo7x0ogwf79thidygan1i9xy7lro96f592zjg550ozx6ie0jpron63vp1pawahlimabtxtozuiejp4vfvnrh58gvpefe6ooys02476uasrl7n5fjasqqqwotxxtkeufkyqjw9mjejwy8sju41ib4rt0fxa0up264vxukwhso7zx9cj0iboocmgpc8rnva5zds6c6hn0bj0nqup7g677og5achd0f9yxfl5oz7b8ig503wpoenjuux2a4lq6jddk68vfz29sfiqj2rusapmqxjad0jw5ipmslpcagbe7g58zr7zus9701j7i8g3o9mm5ys4kpn9zy1zwynilu26i4lmuug3hh8vrmqm4m21tgpwhy73an6ztlo6u6v2w9xwsp5z01jxul2inavkracmj9eonfwtqzdh6760kotqswu1cc0d5gd61fgozgfkxp4l792ejnb0fz3eddbi0ih5nn50xs5wnde3nvpeqklfoheg0s16yf4p13yd7yubw1syy4jj9uqdu6spjuga65kei2b83q7un8lbxsxw88vtueipld4gu3menoy1wkxkibw0bfce8dcv8n4a5rs5nki89fg65vgxt7maxml39xy6kkwcq1m7mdbdpctau',
                fileSchema: '5tg5zewrr7h1i3t9x4l9jngs2h7y482ctqltiwj8rvrf7yxpakjrourmh7bybczmz5tr9fmbgy3g2shb24hrx6oy9di903i2g35njx550kculgdbnswrzcqqelnkcd9hfzzlsk0hzgo0lzd2irrg2432g8xqi5n87ro1xe4n56am0iz3yyspdj8wsus0tq8l6s4ikt24vaubouirnjkgs1m3tgbxe0bennnsg0xq8l3i411vdw601exham0dv8n01zmroz75nnfx6polugxw58c8bo7r7ha8thewmyo9e6xtguaw8sm8qugxp4ui6sawcqaxstat9nhyj03ja5tnq2i7bxw5qsk0ky5sa1q8wsj2edx3p1qc3z9d3yh0oiorpl6wh9n4954myrq9e8dom9tvkhrd6opze9qvuc4jxjobu07k52u85e6bq6nl1ky2sji820gmn1nfjr0boy593l3iajrxsoby9954tfb089lk20nq6756qmjgk47juzl3y8qrevdvtdur7ura50zxm3og6244nmnralzc43s6vrfn7wfdm2foee7oyasaif5yrf0ed1rfmdfstaelz237ln0gckxjvfthkefwjnu2lyi153vds1ueurggotk56q2tifsdakc962yppd27hx5142nk0b88jssogng25zbq64xu8otr49r5pg9gol5gp6hj6j0io6gtupxr6q95h1bc8047w8msmai7dbx60rv2db0ovbxocm6pm4tnh48wdtp71sw48mtnod5b1yvjm15qzxyqoddu196im8y3h5ff3gay4nm8297nm75tea3rz3s32cfmy5jwe0wlukrpw1h0r1wsoykp9q3jub93l3fhktkgv73l3yt8mro4iusgrdxlm9hinib6o9xmmfc0bpv1rt4hxag93btxat5f22wxis7vmqf7tsfx8xts67t87la09xt0figx3v0l4mg3s3cso902l63t6qwmiz3vxdas92b1ms0i2yfrh7pcewlaqu6h',
                proxyHost: 'p2h17ph09c7ihxrmf0dwvs6qjs07n563ubhy59tbluxj4p52wpa87gtbrr2c',
                proxyPort: 2554474644,
                destination: 'utvelyv72c158l9bw8u79dsgo0m9qzr5cmrvmmj830i1idbjxpu8vg2o20ssi5dlnlzc14ji98s4xf0wqsds1bxc54i6ad7e4lof7pe5j9x7p4x3iqjghj4nwrwso2wn8z91bc90rzemxx4ar5r14wdjjqvq4v5u',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'qkkzq82egs9w0p6ajlc6ppiorevf5hpbjrpzsdxsbcopf6umx28fyx2tnxpn3i2nju0vif8yir19seucicrn8jbjwdcqlfr4k980tsf053he06lqtfj5llb5zdyrasn0d7n7k5s1jutku7zmgmes6xscmu1jqc2i',
                responsibleUserAccountName: 'vxx1kcbpttmaq4mnjkud',
                lastChangeUserAccount: 'l6q4bbds7ccnxfbh3v37',
                lastChangedAt: '2020-07-27 09:13:09',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'e93ieoo5wzaoff1cu7z0105csjouv5n3430pzocf4qoi6gsici',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '0rjboyjriuktyy6p0ti6o',
                party: 'panwu93ji1qqqj8fdeq5ftt1ttkpmbnsgv1yaal97nxtrgz7ajs8l94282qo8ce5ovt55skp9ewes3jh2unn7dpiagj6s44mwt45euttzjsy7wjqb23t62spra5fzv3wdn2ok24lzm5ymrit6snp7m8z4lqewtxy',
                component: '7w2fuxve65fwyg9zasnssidbe753zn76xj975wa1ml2esxdfag23oji3vlw5nxjdkusog3aymogp8naz3xavgsrcfa6ly43dsmh7kjibh91cxgsuv3ouakrm2d1vfbuj2n1ed5zbewo2kuc5hfgbztzzdigt1dys',
                name: 'jncyes684p17xuak09wbbjpdlwa835a7imq1bp65eextoib7gnkpf68rjcunfqe3qb1qf652nfb6mfc23ifzwiqehagpscxfdh15hltnm6mz9kvikyba38vlhd8pro4yjnu947xqnuw91f9ib6vpbayeamslacio',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'd57x8mmgub9er7wg0jjupx6jhk4lq7re6iqa2eq2lntqmoqrecxbhzc2xcl3tsi7pzu990v2fnyyljw3nyvkd88ua5n02kurx9dmr1l12n3kvxd7u2a09f1yjhx0vownbfv6ypbnik3o6pvbtf9t1gf1wst0dzls',
                flowComponent: 'ois07n4ph9p5j0z8jnal7arecpfom99n8m7kxesb94rs6qmecx7d7d3kz8symmh0ygdxfnfm61ynz4w2cygq6fpmkxxhhqtdn20w8tbnh576qyuf9qighqgfh7stzhnwvap6as9azywrg2ix1xy9dv8d6n0srdgg',
                flowInterfaceName: 'v24v1thtbnjo1zsu5rsk0zarydulzhzc4gdznlervsjl7cf503lrcosj91eri3rkiqv8i2xotz1l0f148ec9y8pjh8u2jkn9ykh78s9e287xlad6slp47jrgz420vcc4hu1w4xugagyvmmvou3tpqodueab9i9xb',
                flowInterfaceNamespace: 'lgw3bhbohnsx7yfdazihw4h40ukcbemqbjbik82ns80jeie8djvfd4syh8pu5sw8zq94iqir0lax82tqkna4wtv7n91hofawafuqlktn79z96cyou2wl0yuaof6f0rtaumo8q9ymv2x2npjnpst6j29hx133h1x0',
                version: 'gef8jcfl1yxqcl17chjf',
                adapterType: '3qvottjrj7gmjiyar7wiyt38phbbvw61awz6nnsopggf451cxzoq9fvqxlzb',
                direction: 'RECEIVER',
                transportProtocol: 's7k1ojutyxltau22c3hv9pqhlb7ealtuiiqfozzmpgqi8xt1g9y5drd4k0ra',
                messageProtocol: 'qp2bos2kt148arh6w4f9flfh4kjuqdo0o2mrfly0xiiauyhh12hvgkwqe4wb',
                adapterEngineName: '95gon31vo99ni4ja7dpudsne1frgu1g0hah46g3mlns2og6wc8itez9hhgdf5yj0oef24bwbajy2y5sm6zjjrmfis803stfjf72fmx32tddori7sq28mvldr5bfyp65p051ypd2bwqlwlcw1e6ou25r4qv89rrma',
                url: 'kakyld9w79nccnknxv7jezvvkfkt2k30ab9zsfuvu9cprelteflo4q96cso6se3544m6k3uiv8gs6i82m6jl0ngdmxy9o4aovaiwxtvdme3iwaj6m2m9ocjafswya4vc2xeftf0isr2yveuox04uj2h4x53p919winw1cl30stp5ei35enokzr61chdh7npla63cw4771voll552iruzcsbjyisechv0cey5vaha042bjiccw1slv5wx9mzcfqinp49rk9epy328s77b20o6z3qcehrahb678bshzrx296w2ucxvr8zt5vjlvnhcfi5s',
                username: 'e9saw8diayvp3xf5ya7e2an17d1gykmzcse9iy2n3vjm7pbhgskfe6ngb6k3',
                remoteHost: 'ty8hg44gprtrcfbwdldl0myrk0ni3zp4h5nqyt72f8ioefkpxlx9xki1f7zijojniwnwisuzkbrtony0pe1wanpboatzquhce8pkjiuf2x9tgeudca2yk9bjr1wy6h3tbp5t8thxsveuqwd5yfq2caxhplw38yop',
                remotePort: 2666007107,
                directory: '9ov36cz01po2txenlolv5jq6dc955hds4ex8jioguyflmtyw5npg9cy3p9m229c8xe0wo83j09dwdyzsbgogkih9qkndwaoojg3j7xv827ampyv1vzqih33wo4cgehl6nd0aplv4gjcmo95i2z6xzxfg8cjaigvwoqbxvee1i6slvuko8ucbd14m59qhlb70k9ey7bfsm5jm8ktaiphuojy14rstk9jvdd7ruzviya8y6ya01mjc4vglu3avhog8m655baxcbp1lc1eg1h10g3xbo2oau86ol0m42wf5i1cgtdkqkncjrjo9njqwq42fjmsc1cdtxibh1kd1axstlamrwkfydqvdyby72zqum2889ni0p751d11ki2dq67y50mpc5ssz87uzbbs1rn86o0hpc81k2vyuvpgmcrt2kpp881ggxfdbnknqvqdbfoam4j2cuktgubv5usp07mafiq7s04bvjma4yf1xwv2c58ggbps8pkj2g05dp7d1p3oaxd1smaejxir1pz6qtfsgdr63nxwiezgoz4tnxkamrgoh0dsvanl8ucdpjrtnbkg7qpbg2ay0y808fizcffvksu6mv6b0x187bd1d79m05xrqwt3m8sf903zo5p6x7gezahl2bqqj8x72rg9bbmjkqes9w3y03pwvgo7pzx6gi262arlx2zgydiouogryvloo2yg952774n6q4vl7ud6uddrw1v73b4fcbd11z29fdcni4vfro73hed7pu4okd7qakchifstyrfzy38y14p33rgwkpf1e89a54dg2qb51yduhj1ct8eo9fdl8vmqutd343ykjf8nymicg2i1xn7m7hs4wtl1e6p6gf00qq141ar7zssgclqa0frisutlkq5d3y6yddt9r47g323jw5ly7kooqwhwhoid1x2of0uqc8whfgj926te6wd5a19bpx278txrkwfft2zjgdwuus9kltkq69ewmzc906zw3edd9cn4hgxtgjutv8h68t4qf4o1h',
                fileSchema: '9j301nmz6p6rrgdey7a9vv4ya6r712yd0grepr7ddxh57rl922dm56p9pjvlhit8awjsv57ydb4md09ir1vupmrrd8v6c9g7hqsb92r06qrfeo1sj7koxcrfmnpupw47qkjhi3qheic1sxq802gn0rh9h3tk6n7fzhoc5hv26wqj9p8pqwnh6m42awn3t235p47sja8vmdf4xjoci5zv1ygjvrtonm0jh5ghkawixqmh8dla5ej9ykzv9g7yfn6pxgh578cak1sa1fzjkc6drqcumn2jtb8swyzwupm60vik9e9vs39fvx0nd2ekzhi26ucxzvsz3sugp3m295yqdzgv3x5zlez8zja75cgxkybe71frtawoosr549vgay92i1y8ktu8n1wfs3713yssnn7hzs9747wpmn243smtzblcsgibl9m63xeh8g7bosewi9kgrg7o07h7cjafdeldhzsq7pq08tsew7sgw703bneupqnqtlizif8u8vav5i7492qa7moe53xge8t7rob7edte4m7o6bf5wd5l5mmq2pen7eeuc7j0zicgto1gsqwqqqjdmxv7sqvukpnjl04syatr6ex4gidpbxnvkdnt2vtv5mwxn79wahxgkf3eehtfo3701tr6n60ij3tdda7wgc3srvlyviv2vn1xg9nrvf8lmbld2kzpc6zlmfq6fn14rq8sajzkk75yyo3ziiope35buwqk7bw3aunpj4pl405rxrun745ix5061ss624kfpk6qq1k79npeo2bc9ol6jomuwkqz89zsaj552vjxghztabdswi6jikd8gt191cf9v7g98mmur3ilxqfbksmx3x6f9vry3j67z0b4oj8im7o1001c10i1pbetyxleb1xuveo2l5gt1n32ai0doespo0cy75t8avfkzml9c1b825edwatirw4i01qe21flgod46fhe4ys78tik7xnu3a5oodsau9xn732ls576q6gcfg62rxxni3qaxr3ocek7mtle',
                proxyHost: '554om7jz9dc89jnriwdwnq6mn7ovi5ne9omi2mbparhjkxdv6fo5ez4scd1v',
                proxyPort: 4143167911,
                destination: 'jow7nuz2vgiadx8qx9sqyia77vzyl7z8sdedw1jpkeb86v4dmirivluw89n17aoc54vp9vy94f5h85c5n8fugau0vz4dzcof81t1dj9bqywtbhgjmo8copxgz64zjoiu6h69v3g7w632e0725z9a6wu7xk413m6v',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '9l4c133oj9pbo35snsd1m1ct3jtgyslr7srp5taeoch38d0a80yxiw3ak9mzgi21brvumy440zr19u8qstdwjecrg4lj9ktv3bryh1r9mc01ukqquqke71yd15c1rw70n5lsda2qgenzbt5jyj72kz4h7b5j7fhu',
                responsibleUserAccountName: 'awfj3nkhfxr3ucexpkey',
                lastChangeUserAccount: 'sx271qo4bugb8t6s7kid',
                lastChangedAt: '2020-07-26 20:34:47',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'pql0bp6ik70hqab8jlu4qrabwrrvvw76v83o6a8915v80ryzfw',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'kwkvr1fdsdm8c5vtw3c5',
                party: 'zqlofuin2bfiixuiruml6nua6yksrssid5egqwvuv5b93huio1wuz6qxbzax59vl4e37e29bn13la1pny2t2fso8jtifxbz4vhitrplvxweea28tmpn4zhv10j5ova0endg27fwz3o6t6qeey6g4l0ce3jv9eaz1j',
                component: 'k0td46slnot0v70j0gmlu9y8eodqu7agm2uxmesypgsdonqwf9stshupbg0zmpvmct1ruaru1m6wxi5jak8ebbjeq6jpmy1cuk6sjc5wo48xxeia2p8fssghy4dc9d9mnuc1ywqwdn3fq6nm7yzypg0vc0be3yyv',
                name: 'nsqdd1wq71qe9ozrf0unf9amdju9v5mxs8alucazngx0kzrywd191rct1m3s2ntptna1lze93u2rfvf6opx5agujfr1s7vx1q1zmy9uu8d8orpo431hi8yopf3o8h666uequpxe14986jjdprkq454nxwyygta11',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'addmij4eolgbqrdqrvurqq1qwfbaoij9oihqukjrpiq5isqoz46ixcokmey62dve4d6jz8rq7khjyoj6rf1m1th56ek9cf90qn25u75ye7okxjke1xuwakb0o1gauwf5uv9yg8pqdqws9avs26xmvuj9gd8tk016',
                flowComponent: 'ys2isy8v7wyigb9ai10l9cz58zbwucki61cx3ylb7vao0x058tjbb6cfgtrzin96xpz1te9dqphmd5m04j8r5eme6dtz8zdn8upt0u7941m97pxkgwzufyux5rpudmzzlt8mx2wcf4d7imb7c76kq5cxehtgb30m',
                flowInterfaceName: 'x9jtw5q1ueac0gwivllouekoe592rp44rx0vk3yztg9vpidkwg1ipxpjbw1ad6k48j9azm84m45fyx1arwqd4rwki6x0ycb7oteq9y07yat7rn8vt2125t1cbnht94awik4wp1jge7byds0hbxeyeh4dztb1294n',
                flowInterfaceNamespace: 'mz97jt6erqyhwwwbuve5o7y8p79gvoipjn8q4ykfam8y13i4ktw5lrdtszakq9omvgeqfs1zlkdgam5ljspg2cen8iir5i9r68werism5yoab1minw31tmzq6ajpzunnoorx0dtq4e2q5c3tm10jqr9sa3wxzgho',
                version: 'y40xc91xk5d5xvfxxenl',
                adapterType: 'mwwwo3huf7jc8bifnuuwnhiue1o3fnfjlv6opkfi4jwktqnks4c54ewx9bgm',
                direction: 'SENDER',
                transportProtocol: 'av0sc2ll768jq1d2he9n1z04ddpbuxuoq40bqvjrkyz40hzew8a46dirr22w',
                messageProtocol: '2lw58o9zp5eqg8kjdqqp67dnbosugd8ijonq8xvbnt7i9xgscv0v8t4nphq4',
                adapterEngineName: '0gw38uhz9s01zpe8d8sxn7u7ky74h6pryt7zuu3z61v9d4wko33c2v2yacr9zjhyklfozxp837esg4305xjsmqp37dfdx363036vj2j199wh5gk0wgac3qtr0t4un5teut0bj35zpub512gb1h35opbs3w9dacfu',
                url: '6v7fcbnekauv4zvts7qdk1dukvwg3cl3beuoj0eqmop3jdjwv2j486erh06kjyivrvcnw1ei5j2tz5k3abhlilyez0meqy6rel3dmecfk0cr4cqvx6y3jpmaeg8zbmo86zm4lo6phmug4snnvdqo9r0pnk4hf65p9wam017wp4346db8catmijjhuhtd68pe4j0vl2y0k4zrqp59slx5vnbektju26gvm9qn2hhl4tjcaefntmddpkt0oq0wc6qvtzg6djff6gajd4w3s61cf9jg5etpi8s5uxbv4c77bsakpde2sitxvh5b77fnbl6v',
                username: '4pwjo82g3obbuj9vy9e1e81rkdln7q5hisri7u28efv3321gepgam1ecbbyr',
                remoteHost: 'ebv9cl769xztoh8hf5e91tmfof5qh4s8noezbi2fa6rz1m2nxfn3z0nacnrczwme3ggjomu2il7dx1bnhiopc67mbm9yzmwe9atwrbx1igrhrjfqntukcppphlryxrx3odjq48m5co7342cicozezx57maf80jwg',
                remotePort: 6627380094,
                directory: 'b0nbj1cnb3x9oi1fus4y2e5321zv5q4p7ufwrudzegfs9pmoz4gi13wl1u0ban720i5btgzqots4n74ul2oohh9z32nmosb22s0wn1ny57b1vk1a8dapwlwh60ah36tr165pfgsmp07as2kmf8q5jlc5i6s6b3zodhagthgb1nnj98azzyg7d8egrl8hss87v8i34wfcib26l77rrkv2mhr1fxnnn2iig9a3ek6zdyujyx1xl71fua8fu2g8sxv0q2la9gdktb7z86m5uyorlk1u5mrsazsgoy8mruq9c16ri0bzmbcd5l8xyhtmy79njz0yj7fcbadka4oczxs8t9pjf32ew8xrjdxxak7xcc42k53p0ki6wb2cxhww52yuthr8i1k7oztpxrpt8xlmzv142mv1ch2hy5kb9irhsdrexlfg1fr15qk6cax5dglfxr8cdbj7gpvneuk9109boulqfxdix6s1sraux0fc615rka1899rkskhq0qd3g0wtoz1zei7jpeu0tjc2r55jtnxbdusc0uzhk7vtej8xmwdp3hoiy0fcepxbym4q0v4310mzae2p7u0r78ahuujxbf2wr7s06sywb0ymgdkklutgqf1c0p7lczhcbkrmurak9zm4a46u4zlqbnqaa9zfxbqdwp86xonj4qr6phcyytfqs5g7ss54wg0iug0zv9w8d1yjx72t4kl7m92qnqgy6s8zstgoucuslpvp0iqfv56nsx3h6tq0i1g94ds4glfp5ws6vphwcy6b3r1zxzni32t6fjrliv0jyjsfbxutvvobj6cmaakfpmkk53wl0ay4ha0lremturmmbb46bom7k1ltf8nsnbgw1ut2r180hjidn5tcov7jgrwrtinfki45wft695hdaz61jycemwbzjiiloakweaykcmzxpfsw7wp178aizia9kmz26xv6iyo6gfwahde0qvz3vxmg47s6wpozmxdz7tciajzqq63y8q5qfyssilx9gmr1hvs3pp8i',
                fileSchema: 'd52ubn335e1vzcbofprbxkzthz2avnkqydk9rtqg5y0bkoo67ue2t9dji481exgcv6oki3tsoye9u4fsahf4fxgckbswgsrwz910rsjw0mkb1jqxhd98qa32c894j3vtvbbvccr5rhtq7i5cg9f8qgbmbbrtnww2jxnisa59yfgtc2nufka8v3gy5r18phlygug0q9kxuoedi8s2ngnz7tgivffq3jqbn6qzjjkqfg3lhob31fvjno3uerefyv5zi4g4h35hj5xpv96o3d03w5q4swr20ues19xlaw5uf2yld13klxxzxc8swq6mdt7h7ivlzaj58tmxza7qihak6qgp141pn5sdy7w1p9u1g6clsi1ssyxafoov3izlu43x54e39waxv83tdrbk6kpzltph6ha34dhvp26ahafs6feevqtnpdjauqiw5uuvicpz8ki2bizdl3nlyb4tq6sre2f3zl8be28fmmmv7o18h91v5n99qwfi814cqwjt7nf5613fv65wzpq16nstaacfcik6i1tk3903km6kyfybwggextotzixzbb6vej2v23i48b8aw3cs1o80ezz5hve62ziwq2a9qdxtzivk10g5p68zsvn9q283o5vpd2knfb2kedzqfuyysnz4jt2b3m2kz6rxm1grvrodnn0ftdq7xlrao5uhoa1hscxqm93soxwhitt6d0rvt8q5n7v4da6cmjkbe1hsx7xg67fc42bcy77qdiu52yvymr86uqzkhhn08p9z171pvei6ojtg48938mqwaoy0lli9k9h5yyeizj1gf76uu5rbyinn9xeofyamgcl44tyg4eh4ahlhafot3vn3ve93903ag8z8repul3sd41i8yedvodgmeepx5ny3mijqfvhcx5xck3xr2gdwpu70gonnnvey2z00vzea9s68o997e7ax57a2wupqc4g7dytv722buaqkc1mywnaeh84n3bthczvf7o7v608zs8syqxah7ojjeq19vy8rduxb',
                proxyHost: 'gyb40xhkfmqwmjnwwz625d0fi7b50j7gtzirnq6spct0hqut5jzzw18zp0fw',
                proxyPort: 5239939580,
                destination: 'lh9touyjp5ms6oyd31lrjz6028hovh9i1uw0le05lmlwllvsjn9e71326t8odjxf9oy83b3da3rpis8ebn8rmrd4p9dub0r6jh8ykud5zufthmlmrh65hfxv43hvoruv08yzejbjy0oa450qszmckn5zc2v5fmxe',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'tg1j4gkca8f5o2u08yr3roe81mz5l2r1m5fcwf4fbh6fueijgwu1a7z9i4vrva67c718elxzpt4x1mwc3vpi8zacxuewcscloya00p8c9zbji73il5q4ai1bi0m4qowhfqolpakpac6q0ppjuimf8rfvnajklkka',
                responsibleUserAccountName: '2b2qtfj4rt4a30f7x1iy',
                lastChangeUserAccount: '1xsrcf2mkf7t2nscdpan',
                lastChangedAt: '2020-07-27 02:26:29',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '5l2n91t6rtdq692okn7cbdj0zj65gj0r60z4nwl9f1lrn4p7as',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '0wt7qbda96yaqpc1hee6',
                party: 'mvosh4xdscbd916n6s0ukd60dxrqwfbt1i3rdjfsmn8ce6idsan0b3pbs09ratwan8j80u0umpaw2cxzoufphhxm327r405goy7amlpaxwjo45sig3ulon2cq7qyda4ut15e2k7rtxs5ymm9d5rf1hjnfelk79dc',
                component: '1licynxh416zdxybnb8bf8o20836i45lgeb6a0kvh8dazq8ei3avftxt8nmfvxvwzgawzpfg8szizro2nv7don36jw9bofzwv268o7j34vncx4hlng3mpd4t93n908bablmwd1jskyiod5a4r8pwwkci3sjt0ay63',
                name: 'v0hebebot1zu34dpwhv005olg7pyd28wyulqmp9zteyrkfwzo9oecgseyn1vx5pvpg6jvia1tjz5zj1rqrwsd7dyhd7g063pgagktvlrck8cw64dwa260repeo1srtbidghd9f99xo5uquzr65rv20ku4fa74kyn',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '9twwbe1jzjhurop581vp2fgfj7dkchonjs5xj5bth29t6wquhnzcbzqtza2v0l3rpga1vxjd75yfmnjgeur8lkcdw1dmttqam3si841y9timdn5gzqcmibcl717wrzce80k107tvtvfetrjgdv59qiei2ynh0qxm',
                flowComponent: 'zgn9h9xj7i5vymc9dn7a5rxg56nsjmdu10zsz8efgwyjeue22xo8hmzwlgluwuhd1l7k7wkpt36tg5nv0yq4vixh8pi2vbw1h3jgdehfq7baagz6f2g5dlpzre91d4v7qd2kf71kvft47qu2z4bw1g615deqxh79',
                flowInterfaceName: '5yogeov3r7b05mck8ugb5e62u9vddbfzk7dkr1e7qhlji46c40p4txdqritee8arewmztrhw4yr9fbqzyflbanux4mpx91vfw8cez2f6lmrwj1gqk22xxk3de1cc7iypap64zjgrpgieruagzgh11vfuw7oj5jt0',
                flowInterfaceNamespace: '6ofpwnab8mixclo784kirwt6z3l5bfjtzs1gfv49wd654j4y9nnlc7s4mlgtec2x3tbqi0ba8y7ga5hmp2tnh5ppxx5t1b4psd8crqya5zwh73lf42sw42j4lxlhbcgh7lp00cjiec9f127xfyzkcsungkg3ns36',
                version: 'f3mbz1fac83x0i6f169m',
                adapterType: 'pefku3af8umycztw0p2fyyqb21m43kd5dcbkx9bebsl7uocreb1rw87j0bnx',
                direction: 'SENDER',
                transportProtocol: 'oz3wpcr5qgoug1r3vsy30k6jt94azwd1jmrc7j3wiv0yt6409syv5fx16i7g',
                messageProtocol: 'ecz2gs0m9rvrnxc22dnll4z2duf76l1b1o88uzv7wjbmjx22vszflxajmymj',
                adapterEngineName: 'qxrj77xfq3qqz0uye60lzzbyyif9k92yraz3afilwnt3mq3qfoovqwekmeea2b29v9h0m3cm3dzho22z03ozqznngk1tmtf8zxm55g3iepdig5za60lzrm0sk75sm2ersxiwtsgohf0k11j24qqkmi0cjeibo8li',
                url: 'jz5u704khezua9y3g3tzqyqqowj1u1769al0degn3tttu87shzh4l60dx9s403tt4uuayqqsqd95wkq2qw7w17ue7dhjdferxkhwha955r0g3h2fem02g48f3osraguq7a4uwoqmxjdbywrvdrr1izyvs4sxu4mzv7fjnb8e9pz61pxy2gg0sxxwovw2eeg8980we4hot2j0hhe2gg09rkci5fv0tkmn4rxagrrw2zcwos6bp9y3np80nbzco4cry8l01i3hiawpg4it9ehm63x3byasi2a96z3ywl8h9tgl2hmgp3780fsv8jy45pfs',
                username: 'lrruqmoj621v9a35wg2zg68381qbm7cbqw6hcp71bjn9fdd41jg4h1hzw1z1',
                remoteHost: 'fixp1r42xvatvz0d8ea718p5v8axcl3jr8kp7bm0l2cp6wvkrhunfxx5ojjodvy5toywq1udp75ewu5nl3lsucrxb9phv0b9wfgasls854b49rg6qc306dti0kvgl1daz7y1ke937776tb9h4fag94r8ocx1r5y2',
                remotePort: 4992978219,
                directory: 'h0leu6jiy18uub3ojgwc8v7rc40axu0dsjsja4omtb0nndvon7jd1gm9z416vmrtsnn42757xz77cavxjacgebd42dq7e52mq3emdypmod93e57bae37iso6nluwjq229fx0g8xf6quk1hajuhrlsnzhrxztxek2papzjhabvdy6ocwycjm3n9823mce466srdyzmeno25gdumvkstym0smnvpnl1oj6944x1h8myit1vt0jj6s9hbsb0qbvp3djxcn12dl8fc0rihtbc2exaao6o4un8ocuuddge47op4ozro5y3e3rhmj1lrl6f61djrbg9v5lccarstt88d5gmt0ekwsj0yujn1qzns01nz9a72hjijk6v9bwjf54lzr19r1q61qkmqmo426pccud3bhqdisyrm4mkayi3n2xtmcfo9s41v7saaapq1d6c48jdo4ctefzejwgiz6screvcl9k8scvg98lr7yyhcme0drfh0sssndb6aw59iyr8vbchzqoscdomo8910swbed5md304arayghj0dhqv8rihp7c3brx1bcf5ngfcg1mc63nwb9u8547laj4lpa7i2plxdckprpa9gn2sojopcno7srtyx4r4hceef6wkiw9xu9nyacqown8itcpl3yo6dhuy6jtej88ka9k89vcy6ednskjhmivf6nya7rmaf6n2u6u2c2ksn7eoe45bpxe3rv6h7qbfyc8qsp4ubrokxpc2damhcwmxelevzix5vxoqn1w0mvpjhvz5vg3hz8nib8nd6pd992oesqp2uk5teigs0f6y80pt3ds1bjyi8ht731x08q0jifnmc7sv95evd9i1gt85eylls3o5aze64yt6fdaby01pala2hw3i4kqkvh5rkcrs607egov8ywvs1tnzo9vkqkqqar3e7g32pemtimbsy1i8ui4rppszg6bu0xkjjcmeom14vxxnvy64lri2g7or8rgx3khqxvzw6tih5u5r6kskozoiiql3enc0s9z',
                fileSchema: 'dc1eieqllq7z0rz94mpqgvibipx9rtt928756ooskkysp5plfw2yaicyv6ivhthqs98qp00em7lqys4k77pw8311gt956ias8l4xgyofrfamxbvqktkiccnipjpo8dmx27uf3qiqrbok5mp1zqgjskasym4i6ns3ng55s936dt8355wzsb8k09jcjghyofh04ka6qg6ymzvywabsam0qolz05ohd5yy7fyftplwdq49tkwozoznc9tt3gbtvyfjts70p95voff1ga229zm69c61ysrzxnobuew6fk371ltc5yphfwa6edv0a5yet1s9vjqg8njj4sp7bii6ij9saeiusd651ynpfm904pl4oeg4xztjni9kisdujqx3blj1ic6xb4itl8ldi3ef2t6ws61xbwoh2jsx6colftulabn479hhkd293sriulf56dk7ljwctuv5mmgj101ggwwf3gfd3xlmt7f400w5nt1kmpzqr4gyii3vl8vm23hatbwjlz350bcogb5n6741yv7mkthke0tk7u4uk705b1jl551ctvfhlwq4byac0twbswv1b3ymvu8jlffy6kbs9p5zyerrsycwwtsqcx90y34d74wvqh186rmv2x2j1ms0ggic78ep6bu9h3y8a9coevs5l66adn3emd8w5oa2wcgr0nmoodh7n59e3cwvhe80ncn3cut74i8otdwz1pwbhraxmca2rd2xwx3vkx96ym62hrkf1bk6dy3yuzicvgbz6x1ozkq489v38jalv0wwnqk41j3h4l0ab50clucjfcv9m41p4jyrsp08nprtur0sxx1z1xfhddbpx3kchx7eyuf0al35qult7720q0xjh49qxikkgg1cv5ue4o9cvffl21emfh08olsle27re726v4lb2oe0k7f05yvoprvcc3j4y83szk6oz40q8tugsbusotv74y9lrs09yq8q4xd0j8y9ka054jskfks0ern4vna0vs47pfx3eirgmty3la1m84u4u',
                proxyHost: '9xa8y6ma9ay22az30oxb116nl2tymb32mv5ei4lwfzjol7ajv9x1e0gkzo6p',
                proxyPort: 1175132632,
                destination: '95l182o3db1nuh4kdaiywte29tbwyx2iyvm90019oqw6krjonibbmoefcnqmtxpswe9oqq24bx6o6ahqrkbdf0vgg51f2qtwlud35knqim6dsuyugyvcn1h9a7vdn94f2igs10porr5fwnkzaz4vh3scu0sseagb',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'x9cwp67c91skwf44a65p4w7fh9z844vl2qfwlpf4rll2pmrv15dt9pwcdixy0jcjsozg4it2quaup4rncqsqjc6j707tvjm551rbspq61ioidxk687b3f5dtu172wj6p0hh0grjl5n0mwm7y5i06zhtboa9dltf4',
                responsibleUserAccountName: 'kzf5i4i0j27don97ulo0',
                lastChangeUserAccount: 'wes01vcqxc97t7ufa4px',
                lastChangedAt: '2020-07-27 02:57:06',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'csspam0udz4xl0255nca22qm7dwy5jnntozl1craj9fue3wz4e',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'd0ym6e33kw0mn1vf0xdh',
                party: '79fjorvbgammxvy3o2cepnfrl170a64b6gila0cwr66de0sn2vmd7wub1399co6atshhtkrtlxsyhwtupts9yp8jindsx3cpbvqcihq6mt3so8r0yh7rammjjks8u91j77i03f8v54l2jgqpgojtz7gq8trcbs2c',
                component: 'fssxenuua8k0cldcjkc1e5nnmi62vyzqvgcun9lm7er2oe2ga5wws6od3wbrr0xxrr3ayep8u70tcxw984p20my6e76xbleupieqg6szrb7nrnyhzoiwiop2fr0eykyicllkxumlhvk0cceixfw75awctcopqivl',
                name: 'qubkm92xvd4up6ng0vrbf792r83klxa11kazx3eu3tubv4mnc44ow80aqevjunpyodar05mv2er4eghx90bpxrjddxlj218dq67op1e8z7zl32n09lz9djy7wknii2sului8cfsdfo89azmg6uc68cagh2581zfcs',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '60q5r8272ygarx314qtsh9cmt5wtcvzk1z68om26bdwptnmfb4mu8ly49jeinmkifs5il7pmc1ur8wfk6r1gwh0q02xwr8sl68wkm6kp0skzhzbcfrii93zzeescnxce3ok2u61rv1v9o2h5yafpsd4s70dfhfe3',
                flowComponent: 'tbxo9gnw16sztdp1o20ggw5kwob1s8cpozi4uznmmm5aw4bmvfbi5l94p2sk4xckb5cucymfrwxewvz0zrrsys5f8gb1hsiy7zk7h7mcjo89jskwuyt2bq8j6c1nzgn4eh3htp4qkuzgebc3p9e1a2to1gzl12y8',
                flowInterfaceName: 'x6w2ejrf78096uurwf6ozjdsv5e74nry7d8j8hcp0i9h1uzv2g5g7v3cuojpgx366zx9md3vo5eyqq2wmxv1kmuvmcx0zu9edt726usluqfs7w1re4ru7l5bpna9g3a223phs4vofji1ibjboccovnfkdh6v7gps',
                flowInterfaceNamespace: 'j5a46yo7dc5k8qdz1ligsvbuev28ri63s0li3v1e4cfzoqtgtuen83havs6g49p50caniekvspcefjvtzjn0w1c2kaax95iszzmt0s58oewme0n01xq89nnhnqca310mfjb02w5y4ulj2jjgy34gnsm0t59v9iis',
                version: 'b2gkox84v17zvxc8l9zt',
                adapterType: '909tkxo6t70vbzs0qqlgrebxldp0xxek2ah4hepot2x6ukanowdab1musxxs',
                direction: 'SENDER',
                transportProtocol: 't5vqj63xc0l1jcxw0axs4nsw6htn9kcpvwu176eakbfxsji0l2s7ky5fkc9v',
                messageProtocol: 'lrg76ducbhvjnmd82kinuzcyt2ddpa3fb5pyvh3ix00yz48eqcu1zsoospeh',
                adapterEngineName: '215ukysq7wux75fhyy8ofyn53fs7xmmp904b26mhn16qtu92h1ph66b8xkyi7seu0qmrd7vcg70zx1klpgspj3hlbvrdc27z0q88xh1nfngenf0rqomlpu7fmkosyeasrkk60a7crvn388wx00gbcqzuvjqdfe4i',
                url: 'fctocuygw37utz805f3k59n69kxbrbcwt43r6emwg5lokt92aoep8uu221qyx4t0su2vw4dkc19ycca7sh4pfp9esaowlaixm1h3f52olkcnuh8zzyng3a2wwa5z0erp29w7bf50r01ffpl48wmgvser0i95x2s44scdcld5t5mz4zt1s67acrcebckgmh2zxzyt7lrwt290kaf68vxorylt3iywxx8xv8hmjcqpkbcsbtdlvgjmfoephjuun0a8uvtchmf2sy0fht9q0eutypxanzopectpcab6mut75cqmac4ptqrnh3zln49n72v2',
                username: '3110o8vi244ow4uydo7d08uddpc1olydc2moobd5u2ipdm5x2zhazm72du0o',
                remoteHost: 'ubsv5pprvi36ydszcloalstmb859h51idwp68vptn7bixkrk71phna02kr95t0qmqmxod7nie8s9fbtdqc05ar3tsz9ywcz2ffhps9ee2qcd56qmgrczmuma15520teue6eloy3ci9te1d39nrkg4he9vh7usvly',
                remotePort: 8907051983,
                directory: 'grbk2ypl08k0hz6kymycn6ce594k7fqf3pqdxdx6rhbquh24unxkbfab4m3vrlnq16yh4hctpsg06yddcrnx7c4tdz55zc0ykpwgu18qabr5x9s6r2dlouimhsblwpdvea6do1l6513eyfsvh38b64jyp1nily6eaw0ilezf1itjzpfm07a58x71o2iha40hz7epjkvdt9iowxilpqckbxuivao6mlq8sktx4u3g35czogr5o7httkun8nfr6uedxdzoihymnqaajrwb5zrma9druk78y25ghhtvfupz9jyk2286612t2ozynvgltrli71igm0xtqpvhus3n9vsos9s6z0q808h7i36znlf2p1kuah8ukd9n9fs74s9bq9jm1gy2pbzpbc18koxj5cgtgfvry5m8bwd5x97jes07jijm13yc511c7ri1yy79iotqapp81p55xzq0cxmeephlz47tl6n19328jkddvev0ikkf88ysp4z3wcz3lh63h6mvd4jfwgbu0qru3oa0mlyvz6zaqtztxnxzupx7dclu350c0qp2ewnjpcvv1rycbozmr4ejfluw9vlgbcbsf68hfi8zjtpcudtyr19z34ms34m93d0pjseiuis0mtjqhtb5q71zay38px84y1xfpjgprlt0pj87a00ful9jfm1s4rr9k6xmmg7qd8t39iowtnoo44w0r8wa9ellhwnr4htq35ccy0kl5savepk7e0ict3jlrkcnvspc5flmy8yxqztsspstwxk67x3s9zner41chtdp7h2171eh4v9k1lx4kv1hpal5j3theu7b7tmurs6i22exx4lxdzhez408ki45ooawkbfrncn3j4oab34oa11pq9dbu62waypfupc6i47kgpa2rr36erdqbyp1l48fzmyvmj5cjwenwd9eon7qflt4m57krkfx9vnipz0627hrpwt7ikdvpxidvt0aug6n5gn4col8c78lle1zmzlczx0z8hrhhxgmonpjja68h1ry',
                fileSchema: '46lxnr4m1m35a28wbyj6hboeher33s9rt5x3ydqruhzbt72w7hals00r7ohm3j2qxzve93k1zocj9xcwyj0blanaz7l03ysz767mpyl0fyuaeznk5p9v94bjg52eswfj97xfngqj0ch13qvsl252h9yo4yzypg3m2wf9jkro632wv7of8zlfo8cxqjy2hhvxxl8v58owabnvizs7hagzuytve8q6x2b5c2prie91otcj00wzgb8lr7817adtp1ukbdkpqg9xgylznf53wqwj7i0mqytgh6vxpv00bhrxj4c6qrh78qthrnvno1lzreiuo9ikb44ln3nk70lu42eet04dgjtvtmmxahyh2h4k2e4kq3cvt8egpqg5huro5jtzxcd0s6wlfz7ondgxwgsvypn78mo0x5bciqzngwrddxe11fkzuttcu7yhbsr78tcmvhvxa7058zqtcaq7ab3j8ybobsq1svo4eew0u6zicexwawtddjz2pf36zx53swokqx1injyg07l6c926rxj8hcx9hclrfg3kupp3t76e6otb3amqx4jjzd8p0935neefc6tzbestptma9ajint8m1jrz04jasevp3sz0xu29ht0aq4zoa4xolo4xeuxzkbli6jin1b3i3zqfj3jrvzvlywizvqunnlh0fvp9jmi7ijandujj4s6gybvz79xpjnq625z6urmu56j2sozwbay9cik7seisa4g3pu1sbosnvkh7egwl44uqaho48mrww9mk4yrk8fde1t59cf0zoqdxdm5mt74zoaoyvyex7ae9j54phffqe3qf9i05gy8g6a8o89g832xx4vdc9stjkpyddw5esuqzq9o8mx7dqr9u7yb91xe202ztk93hnob1kortc5lnd569svwhhdzy7fqd0j0pdb5e78p19wp9b3hcfqcmw51qub73w27k6ejyja0u8vxy0me467qx9up92xqfbizmn37xw24nsowzyj75j9sroo5rx4k628z6ap0fx47a',
                proxyHost: 'a2w015d0219vyddf4lmmabsv7qcwjnx3vuu81jr5tfygy020iq2jl9oe6alq',
                proxyPort: 8838072431,
                destination: 'qykf6f48wonhcc6028acx44cuhifpidl9ggwvtl0y5zyr6pr5g8udhm1rtgreervg54oxml4wblnwa6ined80uoegzq2q1ffdbn2haw1c4xmath88x4p91x2w96b090wj4v36x158rd41mbmpwzm4ttk1n2hspfc',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'esxk92clr21td10q229gqic5f0y6shs50w5nezc1c20vtej6919jbc1nqqinab8wzzf4fxt3djch92z2ipfl6i9irpy9oass6t7hhn9tiez8xvmgp8ni7p4gybff464ryii9p4ng71eksais0pia3902vhm68jhl',
                responsibleUserAccountName: '9cyamdpwo8oqto9sml99',
                lastChangeUserAccount: 'z9ri7pnagprtamys98bh',
                lastChangedAt: '2020-07-26 22:10:31',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 't28411aa9hpi6c86bfsx2i18hno0n11v15cy0adba1t8h5iyez',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'xu3o8h4c8spijck83qdw',
                party: '13r4jqvbx1p447ayjd2rrq7khwh9gladsl6xs2jdqng6yoe91di8pztxazvo0b9bh4skdw8jzft81ffzgcgyfc9nkvgifaep6oy951l5mjy4a47ajyxwd53pdgegv3f0uclh8v1vlvoygkliae7uk7m7jbrjxdgm',
                component: 'uy35fsu2jf97h63w1ejm722sohfag5h2qt1203ppms5m83hs3t4cozlru5r35wifdvpyc0rvo2o3j3am8jvbyi1y9wjpr6dqeikkt8nubgwqqq22157tv2fhm2vlm0tk4fh4o0czo2guup8rgh3xtulxmx8eynys',
                name: 'x9lr4ddlnet573mp6286bmyxfap0s52vwmjhq5gg60wtqiyagzuuhmmijdkauduw08lqefl2u66vtbx6d7r6cftowjptogx2druqerng2wx0fs3yb9fj1dfehival23dpcm0v5usqegispuaocfk9uov60zkws2f',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '69cuj8ad0oguanafh096gpsk76d22gzyro9jbyowlqtl2oqskyfay70k5pwjokvogzqedhbne4pzc4g3h08fhf7516hggf7uon5x3lood27jegh9kpgldg5y4zc66956h4gl45hi94mpmkq2qzkw3pywsl2mw5kic',
                flowComponent: '4tkdj2w3zx7ett6sq0y02zcshssx548u7l9992pdej4dp709ovgdnmoybfhbdakliyiuujp9q25gaxksmgj4lwuo1gtnkf2nylaliml9ml5ac1ke7y3c4r219qv960h9lwv91px0td078tf2japhncxzboklzri0',
                flowInterfaceName: '1bwz8xtw8193yvlyc2ppv71zvcmiym2tit9kuaa6c8j34dyrwz2zcb7eby5j119g32eajnhw3mxi9h57322u9btqhl532yq0fia8yubikwjqaag07vfxb3jjduaq5cp7usalrfl6qvlcjribwz34enb3o6ndbb37',
                flowInterfaceNamespace: '5ifk3bkyzdq0anqljr5uqa9ohdqr3tjfpk0b2r77cq9baqqoknjtemv1ti84xczcfvyz0tzyqo182l0hskvx4bm7m2nwkmmhi6hrc4qgwuahh196nrnyxyf1h3ofr9at1hl7d352xr20rflhjofsjibgu8s9v8j8',
                version: 'h3vjw70kzd952jbeitg6',
                adapterType: 'qo4dvapz2okikvh4ng8fcnqfoszbmzw6w65u37cu2e3vvq3wcp3dyd6q8w9q',
                direction: 'SENDER',
                transportProtocol: '9hie2cv4aym2rcts2tafh54zx0547tz8jkffqhgqb2hht7rf7sm6gxofiu39',
                messageProtocol: '9ws8jkxiwt9pre80nsmdxr0pesjwuupukxk01my1l24t9b7mnpz607jnsa8e',
                adapterEngineName: 'nx1a0ii7fu4xk9j1ktxe2epnjhrjv4iqyo0idz9mytnbjvbfmaf0cvrs9gtzaspyxj5aw5w50opclwxpxwo8ptv52slx67nhirvc5tnnbf5rua6ixwb9kucs3z96mv5pwegfulj7zv0949ldg5xklnycfqvjcwd5',
                url: '2s485ozul2zdhg8hqjm983zjmmh71o0grey0j1ocet7oqx6ax62y7ktcwksyikhj8f3hfum0ah5rsywcq61qniv7k3sxhmargixlaxt5ovwk7ppv0980laogf0c67gf2gxt3jeyjjdxbjayjtd2xo3te635x9pde2q5a4mma3wd0np3w0z44rufbys1fr5w246ojk4wsjzpfmsaduqm8g3d8h708q1xy9b73ejh9bnot5pjvjrfo7ukahd4wkxosiguc55h80kr68faqjtmcd9jjmeamcbid9dwe5edf4462sk1y5cnzdgeh6qcw2l89',
                username: '0wph9csl8tym1fbz2i60igeeahm4obqrjavfab0dm9n7q6uzi8oq4rsno76u',
                remoteHost: 'jqakwp58rjhqmo3keq5kjkzzsesgz9ifvz341ci28hdwffsfv2lizmx2kri9cvcahr66vapvvjf4m3cz5l3byzwcqx8gmsz50s33gfhfggvhvzamwize21nqglz4hfp59rghanflv5cir3vngve2i5055hmtbe52',
                remotePort: 8156503479,
                directory: '1n0l3qqhk8uw51osm3shahlcrzkdv9vs5rzv9ykyef7p2dorsud06cmdocxsligcb34e6o6ns1mh0aetb8vhxvm2zsiug80tqj5xsu59u1eckjmt82i44r94qj35dena50ecbx6oidi3t7qt9hj2hzrhcwner4bgjaaag3vpmwfltqzawyipf61n085fytkqukayjolrw60s4s0szf6zjdlqoijt170qd62s0q6h3yjttfiez3xw460f4r29xqrocbt4424r9jcmtk1n4tfypav3h51kuawz66buescjwdxvqxzfienpu5hn21pbxo9ig6uykhu1zw1n2y7ima5jp95816ybii0fct1xju3lfg3aqxfmsbkwlz4728bllnwoffxeu5wsbsj21yfshfuaqwfcaxzi4welkp3o3u334tooj3jzuzo7quevm8tcbwn9ove5vk0cdnsv6mc44t6aavrbx78mcvepav8k4yeeg1s42pog0koutpe04rcamimpat9hb00asdmrlrdb15lvp7b0sn8y4jpbh2i5yyx443qeqtpui4w10a985c4ib47bdnyt8mp1peg0dwnnh4wf6rgavdxeavukvjp5lmdxwn62zqw12mlm0dhgndpvgp9jlgj1kkufk9lmvotm4e13ogndaaqr8fshnq47nnwt07p6gi629os9fjprqh20gs02id5q6smk6cmg0wdnc2r54wvyadkokjpna8k93sy8dn0ciqnd59do5pxh3zauuqyyoasoy8vhtc7132yu1lucoae2qlw9l4wp6xm2p21qehdesva6ifxq8jr6xpxzboqbcqe5eppezf371dc2ydcrbumba9m05a7p4lj1pitp88icn6r0k54j6izvnksq5t68si4vi79ml675m8tyug38y3sqhz9tdxtkh3kqnf8hk9dim4nryh47v46ep301uecwejidjkp89nmh5dgu1xc1ckp4robh2wg026jl0inim3nhcwhfda5jirrzy9b71x9f',
                fileSchema: 'bvm3dwhg4gryxz55hno9qmf945alte8dl0byhtqv4z1uhs21tpkew5bqftl28b5mj8438klub4xdkdr6kngguv12cce77yk2b3astlfy4t13bt9e9zl5ivvs69bg1ek8ubrg2n9ywf5v96p7mi2zfpvp1nwn8f0nyw0exo1s9to0nfcdazweogmavawsll5mr06shl3s4zr2l43o5yrmc4t22oyg0wsiiavcvpr9doc9zbhbew900pyq5z3wpo3gekzh0ao26qi8rh1ywwy3gpcufs27h65snn6uusb28nam9qsdtfb02wr9puam8w0qh1u4j1j3xu0u1q61w0837r7baxh9w1fkskslph8wlmbjiw9y3p7lw9rrnwljfab3z23fo0quitqp6tghvu74a6d5ilmmxb066tb4trefz0bc6zdulrs0zg67wilkdbbf7ijeab4nmn3vpfmkqpin9gzu7q4vxccorbqpmc2nxkrurwly6m3mjt1zeiew8vwzeacpe3gq0rtzmkx8ajwrlgboisjbf9gt9suiduhzh0o56j9jftwyp9fte3tsvaudsljb9m12z50dd650swq05837et0azzfjsz40xw0yujymq1ola363h3oydlht5r259aivlg5ngtq0dj8lf5xlbh1qve7wti9v1vpc1a9ts876v5fsfhh2k4fi0jg1vp3fxoz8j2h0kf3sl6q829fk3nv1f0yvwbfqm9lph2ijt1qm8z12oiso9jf32x2ou80v7845nlcqyyec8zmy6zyhat6odqyfka6er4355pi8li93l75idri5a43hw7p92i41onplw0rx4ug96jybm8vpc9wo73nz7ifsczyxuqv9a43qpt1n26nttsj4xkkjk1qrjfw22684pxad7j4xawy2jp5nyiw2nk2yq1c5rqlz6xwjrdhmxppl6uv4tvient1gw5u9tt40el3widw6h1qhlju8wizyny9sypdi8bpqho563pljdmehdm44ezwzzh27',
                proxyHost: '47ahiy55vjtudj4jw3n1pxu9n11fzibgj27p8b4m7i0xd7gsimxea4prt4l4',
                proxyPort: 2968358251,
                destination: 'axxdovq4vjdyz6zn25xnavpt8p8vao2boceleijsjwpjph7r625lyrt3bk6klkpht8ojcn3g05buvhpna1bxkf8e0u14w8j2rmnveyrdshwa5v31acglzx8rzyfhnxsqytk6rhch7e754s0vyeiocfa17mb6ojac',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 't0kyks06y9unrxlctelqqmgc0bwylj4g3y1e91rkli16ohnf8jdsv29206tt716t5gvpitjopgp79sjpde52gvmogrzv9r7bdltanlpnxnm3hvr3iylqwh2v33moo16mbe5a2vxmmc24y5lt2kcjvxtzzqcco2ri',
                responsibleUserAccountName: 'wty5r4antd6d4jye0p4c',
                lastChangeUserAccount: 'hpcfig5lgqbpwf5v3rhv',
                lastChangedAt: '2020-07-27 12:35:18',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '7kijl6kwjyzuynz05nzwe7pevjv58xoshh82yejflmqqp3s9db',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'zba3ghruc1b87bvn7bip',
                party: '47adqyvvwesyv5h071ohipej2p6shbd0qdv9ii8u2qjmwsv5w21lbt8kcwxofh572lioz5lcy13ixhfo7drl3jq5djf8zd9jvk92m4l16ftjqriu88zqskdzsrcak0tt5heym8kg12jlbkpbkjrhni9zg2xntd2t',
                component: '9mhj5pq5cjm5hfl4xbctq9kg6vr8ymytxvh9l9qgfdbt86kdcnpq08d0xs2gcokqgwh8a2ikuqbeor2k1pmekqhe16tr8wcxdda4qljqnoys3xtct0h2d9mpvvswfx0v78wu64uvxch8t75qn4z8morgamyeu4de',
                name: 'zefmquaz81xfpkbyi390swi4shdwl81frsllhckhj8gify0mfi4mw8esbteoj7vekhcog19s57fs7ymxnovwcv4vfi3sulb0zf3wat6xc8nbrptk02fse35sytptkbwmy5mceb4aysy2ug9wzkcgp9140yxbw0td',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'eaorbti7tbbvof5y8d15768gsdakr1azfz0d8f2p6y6c9htpnr17i3l8hcj907dtmwc8q0iu1w4foie3x7ggkybltjixxdvf7p36h1vkesi9npuq930ke5i0ax7ekdkmxs4kboanozodougqoz4bd0zzejvgsay6',
                flowComponent: 'sissuqdnyw8i3yz3et9jjd7zrislc1j2su5d82q47kt0v5lfhwz7d4gmheqargm47wag6ah50y8ig4i7k3uvko86qwrcqzrgzk9w0uykk9c224bbodz8l08sfxqpp590pv86z7s3bog4elqh2f3gl6uxlv7tz1xf5',
                flowInterfaceName: 'pe5r2gvlk0llpci79q1ko0w7qxn1oup2yhmf2eng5pw0b9jdfrdm35rgkwbvsnbj76in1puwytf5rc95d8vbyg6ezjioh27rcgtmmwyw2oob9tb8jifnyns8n2e7rqy6vcl6kcuztt26ott42a14v2auahxdvvth',
                flowInterfaceNamespace: '6pakh6bajd3qx30u367qzo62uxku6lwjrtjbl83dpw44ixlrvvvcxfsbhtgt1z0dgqnoskjffkj0nn98hmklyezphkon8i8jp40m875u7hgddjo9u3oijgb678ywjzaq11c55sgah62wjt9lh0mw1z94p7vhs31i',
                version: 'iy9ssopwszrw6raba1wa',
                adapterType: 'lxu3s21o1o7myk2nyqr66tkecj7esejmypfh4f5o4axdpq8szz793ot9hxto',
                direction: 'SENDER',
                transportProtocol: 'uxquct706fg2z30pzq7kvye9ae0r6v8ii8t5ob0ua8n27f3j95z50ac0walm',
                messageProtocol: '1667al37yrm5iu68aacwccafynaeohpjcscfdvtw6f88t6ecntwfmrsbddu4',
                adapterEngineName: '4cg2rxtlnq2xstjlq8let7fbqjxk9fd14dax8lex7pq0dny1izie2opbax9lnk6rkf0mal1reuryum0yn3amp9pmg39d5rv44lw0b2fadh33qe2mp8qpljb93ytwbowt9hbgcz0q0nj08wmmo3j3j5nsrz0p7dca',
                url: 't1hhgth4w3zd753nofl5qfo2x8tbojc63758au1qygf1kyotroc74aja6dze7voh4l7zifb9ifacv6v1zqh8fhnq803huyhemblpw7u0u9ucm5xcfaa6xxl3pcodojjgys3jd4zxd8trj08tpwk5n91zmjw0mqwuw89y4rh74n3hlz8tdwvauacj6po892uqf4n5q346klpp6ktqoe9jhp6fjwwdntqsp3qeru9x7kkeyx90htl11wrn3w9ujymq8sm3zbc7g6glrgh0rihuee7zb8q0cp6nipevd3w38absvtaki211ie6hjmzrbaoc',
                username: 'qwtke8ziuvimne0vqiv88s3zdysuvoifen0pfekwqbjoaaz7bicvm5y3fop8',
                remoteHost: '44kcrfck6e3ms4stje7smmvkv3pj01aeyvzu71756j195krxs1k1u8a6vs9mpn7razhmunm2xj2qpev8yg0lwfvsa8g959f2umci3i9oktkpw586ieaquf6l1hv3blcwhs698rxbqa0rvc1hljb54osgwj5me6rx',
                remotePort: 3915946732,
                directory: 'm8yxymbe0tf63r0ty14wfwohd2z9vf27xjhbatkwn9fz8mofsm84hb7v3sric4b3tbaho9mxra45fndjeylkisj1y5e6p1g7xl011pzydzhp112ff3vfbedg915m2bvr53ww1yxzmucatpw3rnwi72pwjf8oemgdy6as39jlf3nn1gpbw23b9iq1zobi9n8m7n2wwyaca716ttn1aejz4wbdvb3s366t2fng36sv6mkgq9jm86bry18luyxiso5yuemmr07a8m6194c74ea9vwdyowsxbsw1ywbe7hxj6mib5xn3fwahq270azot3ebxui6t22py44apytcnu48lndmt8k24lc5dxoiyvllxl21s0lcjgyv2iafhgel3sysmrpgyymddhnplu9wqu1yppwkx5n73v7jlo1bx7ic6kbg4mbcjc6dz53nr7hfbvoxst0e0qfs8wokz5zmgtyhx43x5ymijwby8vh2d3jl3csr10c99w7v76xx9aeeali3nduf0qfra07jhgtzlj763xebi8xovurgcut6h61yfmhra39zcp467hx0otipcetusw4dla20k314kagd2vnmb77nxc4j0fhk3hs0dw2c2lg1bwib3rkd6ifyzalathyd71uk5143w8u50t2laspgj93bknhl36rxnt01stmaoicw6n3a4lctaukg65it0e15ery6hzj5xnx7pfps5123ia74kvf52f6lspkck5bf3z0ej5elp7yvyibhszudsag2wohjaaexmpo1lxm8lcb1sq11042b00fp9r51ngbw4ak1gdkrcqhhxb2z16xl4uicw9363ybg6bz543ad761h2j97ylkggwuho11b0maf1ie2fj1g2olum2i8ygx9yxvpon5kjdvslvb4386m1z1gvla0pa77phrv8mg1sn4f9ych83zm15r193xvfvq4p2yfmbq0dgdxjzrb5ehd6ftmwdhg17yw2ugp0isy0r8qu772kcwpl0zy9pf23cohznxvs',
                fileSchema: 'p1twqrlw5vf6s5b5ti6hrvae1obz7a2vizdugds1z8x50oy6b735kybheadbl9dudhdyedaqk3yl4iklcab3p3ouxnvh336l4k7vck1thvq712ikkusii5qzkswmhwv9ljc2tq5hzt1reijn6jf59tf3pzmei76xbjviveve3pr0g2jc2tnhvdlzmdajkk0b304wvukqgnfg0lem4zibtd0jcrmvft5qnnmjz5pn3n2y6uq3n1wzxe9l70i5oxapz1wbeqvt2zab650qyvoxrmr9pzux2gg2z9emouqr86z69ut8sm5nw5cflqmdcuz815la5gbrgkxiaqyx9wjonrckfvfwclwgv42wx0e8ka8941cw3i4d9pkzwsko9wyf17y6dm8nspawmngln7fq5ikrvbfhz8mvhbm4z6w01pvk3divi8wibirlbgac3zt9s6dykz1ci9y2ygkdd8n7q8cknm0ulbw8yr0oa929u08fxbh060j8egnvuoix9a41657zaec2r5lbggurbetde8t6vpemq818jocca0duw8645aoi9m7qgu4q76vmus975w7khcjtwcyxdvlt9epumkcw6x7l607x3aoqnsiu0ut8m042w1907yjo5u3hroo6o87q75oldplx0g19wvk7zz77f7wexq31kgyik2jtmnd6piywp3j02g5ergbo6tj1oy5xilmo2b9f0fj8nayubeu059ph72ar0asojjo5hzn5ddvdq75opxylodr55p63y7dioancl9kyjuxoweh38rnxbkm0qrnfbugq5ees77xo41tdiljolbdsnx4tbjrropjdvdfkayhefee0bbf1abzxh9u3c28dxmobyior4ujgzrhe207vk91uuon0zr68txf8mdgiuz8gwcyctz2xwl8tvjegz3mkb7gh1ryxtmhgaovvb24pv51gwnwcwgqmxumjof8cv942bx08omaudwc6wu97rfwixinbmnn5ewyjfm19k70x5j7d5v5bcs4w',
                proxyHost: 'sum4ht4cc3q9s9hwnijrpkteflu3nuq2nkutg9xinqrl5pjxwllome2mduy2',
                proxyPort: 5656108322,
                destination: '4syzfds2jqo4dbi1z5l097i2fn8mh4k819emi3f0oy4tku028532195z61j21djo48pj8wgr96y6tdprqinkr2635t43lvqan3c6k841tdcl4tf42k2wrl2g3ngminvz1vf2yu95d5gifayl5ffeopeqrzjqnhnp',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'cjsn3s5czv1h864xpoep5djie3etds0f5dz3h8plwect90v0i3y9l4ozgev8eby4xp7s2z4qb772l3act7q64brbwh41f5vj3xp7co2qg8cqcrm25v8izbdj6u645g6llgmchgydckuxgfo76jakdkxgnvpzr7d4',
                responsibleUserAccountName: 'bgge5xb0q7c5mwrx08qf',
                lastChangeUserAccount: 'bg32yz0aa4n9tz8bgfx3',
                lastChangedAt: '2020-07-27 12:28:50',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'j4pkgt88h5239ezzfw9re2tbyhcsjowy3s5ul8n8y53651zzq8',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'vrouu9ev081sys636bzi',
                party: 'sqw2kao88vddtlkic4eum60kpeyz911gjkbwbup82vab47jhwdrxb8ftczr156ybey5i6157cmopo56ya2bln60mhitl3ii2iodatzf448dxypx27kt69vsmludsjcfp6mdc1mpyxvdo51nug4mj1abc2ju769x9',
                component: 'movxeamdqarj22mj4ghr7sbhbhvstesb64vavnsvack9jspeamt6gvsgdylbfqzl4h9inxviip1i8pq136n04c7spc7fqu6sx14wuhleaj07ctd6etswrl8r5ihulm58los1jfyd5mh3zfjgh9axppsby2fy8gad',
                name: '7immj0uvval6po6mg3ks658ublyt03smd9aeltikd6h3z4k0tuyv1mi697l3eoyh46rer87i0agaheoyb60xaoyy3h888h7pw42v2yztdo6lsz5r62xdv5ndzj4sv6unyaq83s5c7qvg67vdaq8u5fn0ah0qztji',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '7l4cwsyik1qqit9ru9wqzitajv3bv2zz4i41wqtlqdhvcdas0oue0ht87zz8gzdrdgod06rv4nzj0e1er17ta5yz95wjxat7xsnrm36gow4jrt4nq47ks589gogksohjl7kczfgfp1qlpe9c3rg36323do1llmir',
                flowComponent: 'dbdp1onpey3qtg3o5epsceqqpcv274yqg7mygh8ii4f13tlgi4pdq2u82n4xjmslvn03cu49au78126dslpsqcume67n4nanfaa3ncqftiks5czvdqb6hfh24jxp64tsh49jv80gz9i246mcbb3z08ifr3l3rwbd',
                flowInterfaceName: 'sdkn5mcad3t15m8nmvl826sbqufe5rgw8kqxt2b86k50sn9kmjhgdqw74xkv7dai6zzc02mlaf96sf3vuhxfb5trz91b6m89zfzffsxq6apr5fr43bnme4p9vewuskcd8i926iuu44y4fdo4brnkbgf0aed4nu6pg',
                flowInterfaceNamespace: 'av9kdup7oonpp85uskm1ybp3s3mgk3bmhj48uwtsacqqo6rkhl9511i66740m2xlkfyjyn5ozhfwi19z3ei5jec0bdvuw9irpd7cichxwc3xk5ngp9ole4b2m6vb7677asaynrw1sz8epxk7q21u0azc4yq4gqtc',
                version: 'ire8ellkae5scpn7hbku',
                adapterType: '3jkp4emo7grza46t5u281w9k5i8ry8jgfsmg7gcvfsiripbgmkqabojvlzo0',
                direction: 'SENDER',
                transportProtocol: '15ekmkpwb4vemwuc5qtgq9mir0inota4ccwrh6gx0ua5gf385vodqq03gqay',
                messageProtocol: '5uk8t67qmweota34czjpdynh6p8mzowknfsytoxv5rdswv2j1emjj78z455f',
                adapterEngineName: 'slfvzwasbvuuga875wryzbmv6iiwvaqd441891m2xc9x1jlkzyl2b5x3e9678zv68b2k84gqtpy62lg0pdtn8vrdqcgzyc9wvv3v0ijvz6ameqocfoh3r22rq79fy4f5l85lj3pu4uf3fcu1m1ngki8m9hj4idut',
                url: '28ymwml5saml0yzl42y5g2h67xs177rg4aspyhwabdcvb5qee2wpwjsgt4qxvrit2n1rmfxzd7fk9env5b2zazqervyo3defnavous0m8gmgu1fzqp0ggfccisqbbhrb2pezknj44201o5wr4dhxr7oifiyy86do9ijh1fqyaweyf12bc7k43p9r7w4qxywkdhvlxgsquu75adpgl97w7col73xyvduhhv3rifzj96nos224fzwokpoer7hgo1177qsefew2bsjgvciloxtme50kx4objsqo8bxw0tufo1u3vq517c8l2aov2gihotqy',
                username: '5wntbjz6bem0y0g2ird8zlnguvehp3bl04acxufvl7c75dvcinzlb7argq12',
                remoteHost: '8hvafcfmbud8fsl531czfz8y845am5hkamixvgo3d1rw9swiiu29o499wbg88m5vhgqv8ba5o20su3kwk72ebjk2hqgydolbrgscyfuydhqwfx1s2u36obm8ntyyqp2cs3narjtk92z9uyyvpgmjta4mvg48us2c',
                remotePort: 5796841765,
                directory: 'vvi5c3k30zcgmp1uj27rx22kv51klhjwsoetupxr4k3epbgji3hpzzjrgq2r8c3csyr1lq75cudhnxppnbnl37mbi4gi3lt9h0jbxjbjres2nr4c4ajm3yo6wbixmk9pag8j5mwzh7drvl6k0x3r8rqj2ifye3i4kiawq00by9e8k0kd1kxl4olworz15qg03v0m995bzca0bidqgnjchbofqpekmidxgv7x2gxf5busnelxox71zxt7bcnym9jejbmpno0603a29t4iygrd689gqjcilq6ojqkhiqkb9jrqq21hk4ez8cuh7wmv36vum0w4nv3q8kovytpqjgkvrm9kyxn9owthai5vqxulg9hxufjma6rkyxypvygll24a5w85gtt9v45yb5yy5azy57cz3zaump1267cgnsjcrl0bluwnzsm6ll6r583p8el4cebyslalbs6ovxn1y931saa9rx0eab0id8p3jhl5brblgwqicapc7o17mtxm7o89xds9nbbx8pzxqophs1fmf8iv1zc7d6yavhthxxt02yl1laz4s6rpr8315fcrjzwptbvusiugm16mjk4y75y1s6kqvvmx5c5x1369uqz0nubo574y2b7p17thce03cr1lar1gb0my50i9r5gy9wgolojjuhrj8pbr4gtj556si695ykcivss6l3rg9uh0zkgf5skucyjouw4lvq9d1huq9mm47na1qxsd5jookey54vbkrojkeb6l27vb75k0599jf22zi5x6vin66mzsvqouuv6gt9c2va9euz5fxtzfwtaxnufr5uj7eeiehugp6y6w63x19vvlr8d0ctb92w0qahaqsfztwwztqggvz7o97hrls8l4z02kt23ol536ixmtem0ww3jyix7t22shgz369mymiywl6y1lilrfegcce7nqbr9rlcu8rzpbfmgybwkoah1kv0y8me5p5ny44iihj5cuwzpca1nvhk93rmrff99cb1fhx67w3w508zjuj7ig',
                fileSchema: '3uj1bcxi2i9ofst5a9tc2d0unrrimhb6ytu4xnkw8spqj2lbdeawb9zcxtntf9x5oy6wjsjoj6f67arvvl0i6r7pysi954s1k5zh5d2kzu4n26jrchlt758480bt62rg0tbnerl41b7at1yuj0at6girdxej7ow6aafvg75i3nogagtwjlxmzm06753qkkv5siry5f14rm8ytw1c5yhywopl3u1znqxb98zewyhers4ltxicksme6jrh1p1aaswqqltc0kma0tt4kt4id4914pimg8s4lerwkqtm3xswao2mvjj3ofqnn2kca7gqpr27kaxh9a5hnajp1ygt4ixs7uh40jf91lifgf0xzyrios25jtobqhsx5qf55ni7plu8cv7pc0w5rf49e3f6bt3c22g6r3km3fyvx8ue13yj0f3rsdvdgv0gjr0lb7jin50gxy7zqk9g4pm7vl962uxm8agi83umnb49kphz7pxu43asn9miswl40lihvqu8m64esnrul9lffp32cadhhqdcswpom23v1zmf2cely2wadjeprb8c9zm3e6luhp1pkqudofvc4bs1q9nf2qspxz3z4btziqcoq91xal6qlv6fv9se79ffbhzhth6eccbj7smesu38wvabfhs2l5y73cqdumcm9j99tbk0l4s73lpy65qcp37el8l58p7n42u4gxao4enn8imrnr4fy28liz6z6z2y9383tv7k3lyz4zkbvaopntcmesq9zfwi18l3pma7bk4t7xv1tyaax4ijpueuaqfmg7fnnq8llslq1hxcwuy71hcctkrrr3luamismdrm1zbhulnllr5l17wm97565jlk2zab5nzh6ejn13ftx32p9phkpp9gyzfjj6xv83r898nroq2hlquqr7fgjsa29oaj9duetzi9mnkuteorch112qm0zes8h951d30d2bqa5qhcvvt1g1o7on8oew8jili9k4b77guerdtgdvt5dzygukmq01k3diyv2fvr7wbk',
                proxyHost: 'dw1xcjibwopq09wotjjtx5env7q16m66ncafrhgjqn6f953n24qzou6iryvx',
                proxyPort: 5840133571,
                destination: 'hsy1xqrm34t0cxamiqwhrvzvs2bg7k36wvsftdvmtpdqg6xqrub9yfhr46agw5fplt7wki4t17lfphrx41y08uv0qge3n7hepvdg5q7jjp21x2u3l9ag0rzy7gwjoxa0n3vpiw7fns614whveiy5hy03a9ni9gg8',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'uj3egsvhb7mhdjmj39qne63qhfz9yxjeayjs3tkkvgzv5hynoa48vn288osnsfsxmuk2gzftcqtoysxkei156lh9qyulyqiiwmhbnl37virqykhsyxrpavkgxlak3pfqg9la0g4jxht1qwdbbduiyu6cxe4f4z0m',
                responsibleUserAccountName: '0tgm5m9jz2q51ucb63wh',
                lastChangeUserAccount: '8rt6n91xnv8bc31av20z',
                lastChangedAt: '2020-07-27 09:41:20',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '820wl0mjgwy9mk61tf4ab12z0fl7grc1zyeqpe47zaqytxfqmg',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'wsm7jo88lrck77wxsobj',
                party: 'qtfowz2iflukx4olwpbqkizntxmvtphgnulp48p7dah31g0o5m71mpuaelvd0l07kfqpx2pm9gvs9rscenf5h00ks8b85lhzs2872495phxsz1i27t4mn1wxtdvk1c7op1em4l77ovzrx75g1wqabjok0xmqgmh9',
                component: 'uhv9xptxn2rjusj6eufqhrax1u99q6biuvxwx6z6ygjqz978bs2erg7ofvk5xdczaxs9eu1aok50ypkt32x2j11s2b1e115unikfjbs1axaern1c3yi3simqlj4wf3ietl6pwb32fpngm9nwvp1bslx1t0ushcj2',
                name: 'hwlxnkgvlk1691dd6veihv0e28w1pfg7vbxshgml86y8g0wltxf9xw71aoafoojm1x5snba32eyl96mtx2heeel5mh5u6zzsqlhxj5oiy0ljx9ve988ifmfj2pnnqshsdsaj1wx2xgk6gz6au5o0wewq6d8mt8ty',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'up5iagbfy0n43alkcodk9b0z8d6tqnlex70qptqblc6fjgtseksx0qvq6r1jpozgw4d0ddatka3kz0yq6qcb6m1es2krduiubuudpq992vm0texotagl7k7h973nc9ptxcwnl9z114dftrmb18uinryo2qmkb914',
                flowComponent: '6vx31bq86s9uzn5m7axaspmtyqrea18d06nfix1vq8w927j8l0bhs2cgq32ag626fvdex3pe1kh9ng7x0n75xkhjkstv3hq4fhu063gjrsu2der1u54niq7hm7t2v0biw594rlezu5hu4sypqwo59w869tu8ckjf',
                flowInterfaceName: 'tntpwpqi23vys8api16ts8ci0myz1oo54iyc1b92kjrbsztv6c4hswvbax359ppbea1dsst4y6e3s3fop9rjxbdbogr2bw0fx8o4bl68wpxnq14wfxzy0ckm54tph1zl98pxd7kku6vp07qttdgj3b13n75iukxf',
                flowInterfaceNamespace: '7dnstkx6c4cpwv5b6yz2lzoqvt1btvdew0pwo3jl8r4kcop8h5ug6v7iqtwb117lbyt4kbhj3ji47yr66xhc8uz7ou3pwg23laa9vg720n0ijfdjm830z15v23j63bbozwwi3fycrq44efj3h6nogpgl3jc6zev8x',
                version: '4ktw4ntkacrd0ookrbhh',
                adapterType: '900zx9o9esxvlfkrelm2175n9z1p4uxd909jq4vkim6s824wrbqeb8a1tukm',
                direction: 'SENDER',
                transportProtocol: 'xrzprb1uyncjxrguzusk8wonfj81gd1ntkgwdpvp94pl68mvjcz237u99r4j',
                messageProtocol: 'ho14t771z3y8jwyfjl3vwgt0gdtvisdozxze9khvd9ex2gokw1pxddaxy8je',
                adapterEngineName: 'wkqaegl7pxa6s1tkcwoaotv99fce1blh2jcyfook28wpw5iqrwtu8uhdpy7hum6pgmivib0iq3ul7580vkfjwd6iarifaull2h88o89rkx1cz9ik6rdzhxd41g2rp1ttp6isxo0b56rmw7vzn5wkgxu8xugkgf27',
                url: '4id2xctsgjlq3wrl63luw82wr4ea3ecfxwdkzi640yalori9jh4ov6kyjuq0i5etaxxpfggwog6btacm2qwnjvf6tt675r8hw9rat7h6dq9wk1ovtqo05c36uxmxaalg4i73tq3tebihfds0teznaywj24lqu4x1hoafv443qj1vfh0zxb5dlhef8r2tpzg2yzobtr8rfmujowhz6qd5c0mv2s3g0r5elftgrg4o8oc3nxb644ivtaeqvtzy7cwtowuwsmk56dy19wq2gncsxpn8ujaaoqhg9htdkryliu9lwwvm9qwqn4p0qnpip7if',
                username: '21qbn8df3m70dmaigoa0slg94z4mquhi4ci8bjvw9e06mpdleeyrh5kaem3t',
                remoteHost: 'kn7boeiucyb4ky9dgx691ft8pjbn1lp53wfpg40cq6yfgwsezv4nn6wh0ezx2bttbcmekml4vt4dxivs4jfile854i3mouk407ody6g4af3dtbnme24wktwge7mtl52j5i34ujps9jv55ebr8tthka9lxqeoom1y',
                remotePort: 7207640590,
                directory: 'bn25mwstvfqvev6b7prb0bx8waiq3cmm0nesxq3mhj5czkm4iv817rq94cldeg5pank6006w1bg697mcpx0yro0a7rzh24mrveis8nt1km6jzllvtkhtm1dbq8o6ckmsow1uebazii2k9awf115vq8qv7pck9pbqnankz7zwv5rlp0g8c448m7pyvm27hrp7wldqrfsvlsujer7zwkvaugy3g6w9i9awyrgbrddpe6nftehqluljs0n8d1pfwx0zs2lcnz4cji8vikmf8nt7ov1eej16e7zuulkakhykhbbtk4s2xnv3hudsqye26j8hj1extrtfgsg9el0hsz6gjgrzqjlfyiut4wje5re0k5du1xslvznex7g952ej1e16qyxes7l08yz7xo3lt5tfv2ul40pdc5nc4yc6zouqcbk42pi3xg1r33pc0kcv8dh8k0xpr9v3pggd4524kyqw8at1tlxchn7q2esoowedquhmyxm6949jki6sdm7lw8ml0aqwtil43lh6fm60cy50itc2djuk2vowfulceefxreq69p0wcpn8wmsck1ohbeapuz3sgtgcnpyqwta5c2s7yfta82zcbp6fmqdn1cco2ppmjmkydteej8i6oa1611qaynllqfc8vnps9xlmqxm2fl6br78qfhpyjjo5ujqjlaa7naf0hro1oqw2khii1tks3s7nq1ubvvzalyq43ggju8ef4xdijfngld0qyio6oo3bhyrytl79w8tv1fykh3oj56d972b3ln8nkznw71qr4cclxq7ljvfirzo5oowvhclriswta7r5seiu0utxrmscn6ofe6amzv56mrfy6l82vpoeluzuojr6xxlzuw7oyskdm4ll8esqboy55avpcut3d0x6sqkg3xemyukoi7ghnu0gh4wui0mlqpioxkrol6b770iafad1wm70g78b9tacepjsqwx6yhmcom6ey0eqik4ia8uuoudpp9vm707fy873zeeliz7ibwhfp9l8gix7',
                fileSchema: 'o06oivdm4kj1t23o0k5mxvpy3ryu7cwbffpx85f8mkaawvilv4ay8f76burlq007yiv3m7wemof1vtdcz22vo6dw0jge3kdgebjqtfnuju2scsrqbrxm2q4q96if3o52rrs9r4q9x48asz7j9ht348avvzahu61vae3i9ittb8es602jiedj32o3wf21vfso65yeua9t0kvqwmdp8m01ewkxzzyhw3h3yzyp6f39z3rxh0m6p63dwvj9farxe31rln4yuymxcswq569cmonwf8p6lyzyevs28pe0b8wwpzlo76d4erluu4jhnofg0aibcisdneeojmz1qf2hu8nese7msv0p1x6d2i5gltf29s7y25zyhi4mtbmpw6ma7c25onumbqnpnmdizu50bzryzz0f79ol8egg4vapc6i0zrjs54r199uzypptphv3ujkpejkn22vx1a08pz3cc4be6xdu9j2csnuzm6vvna3erglr0k3cndwqn3zyxva37vymov5zx78go5wd8s3mj4rlsefmg275lga2xm3yhzzjcnngwyibsz8cwgo12z6zbuvy4cnruswdrvcadgi4lxexc4zuk6347thgd35uqtkmno6ryi9e6x7skkblan6ln6prk6alk1wrklbc59gyt2mlrzf4m015d3d2jfhzorvea6akq0j71phopftc81gcm1uz83azn3vo13i81561145ab15w5f27kugedb1o2wgay89ktwsewqk0wp58vo3hwqettjv3qd4u9na3c6b8qsi2zxsuq09sxln9htugnc0tkves9fiilobgvba1lifsre5bw1n1g8alsew391mz1dggfhxfwr2gi59patqryhsl7gdaffquybblaz0lzk53r0lmn78nnd2s9py3now2khu9j4f933l5z12vx7f6qcud31wpnz8pvle2lxv5mtaqckh1gacawwwo0cqs32sizaowjvkjwk1dq66mmm5db2fy5q7bj1rjosqveb3w0u9yyrh3',
                proxyHost: '6tjvf20oh3ekin8w52pmnox8ht8f9uj2od8p3f13n5a6ay5n5wnd2qjr6br2',
                proxyPort: 1497570573,
                destination: '50j75umzb59foy19eu9rjrjtd4mqmd5heltzmqffrz5l2g2yjjpqmmdl9061rf1rfwdmy5nc2mdrkut4xk9ke8qnwqqhm1anpem51b4dsjceodx4mrl7hm8aessk9dmadmxz917t30lxbn6y5v3xy6tzqu7yw592',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '7d3y98179yezba1uz0gvjskkqqpnkai7zpkss2kq8zxcxrkrqxm2cw64d0upr3ew66ytakeeacz6u7qu12c4lnde75kslnzkw2x5riy1zjyrntqb7ynpd8irl1pqu8barfu2iy2fn9u2ajq3fdebbbxiwb0719a5',
                responsibleUserAccountName: 'b445s8j42k5qldb8irky',
                lastChangeUserAccount: '58q2gyss74upm1x58htu',
                lastChangedAt: '2020-07-26 21:32:26',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '1rk9g272nvwfdob6x7iom3t97bquny85w6aonfz0vdmr34809y',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '05fiy4pjar6prrk1e0og',
                party: 'wvcjc80irzdooivvq7jt50rq5b55dlw6oikkstfax632yfxt9wgnto3q9j8gwnwb8g9bv1329822ud0f3aj6wh56c7f86r0jmsbm36q2efjjotyv7qbkq95u31o4v98grhwvzqf13skwq1n2n5en34482aff7gcj',
                component: 'wot8tg9ksja1e817f6zabtq7wot3piovnkjxkxsp2ldvcm6qtqsi761rkv7p2m0mw8q7ngo8kawb85b2boarcb2goy4t3l28r54qr0h44p7vc8mjxm2mdwojz1wn2ihz28ca223365t3gginag58t7nq47u9rfmw',
                name: '406bawgliwq5jgux7jxyq6jxvmlvfamaepfewm3u1cqof5nwop2n5eij3z9kakn7b3dr7gi3dm7iqtq4e6q6kjq4wrco83tdmii9ghd4jqs9u89htgxp6tt8dyamkty31ezble3sfqtyiqc97oyurhmqlg24jw4v',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'pmhdydnrclie26bhmu4i05qky6wpud3gfqj7wa0xn7muyr39ethywiu87op3mzg2q43doyxam45givnjzhod93h276s15wu6b3kjqcty2dkgq0ds92q2dffot4fxusenvgpgn1e6izq1ckbn7dm99nj91m9j22pp',
                flowComponent: '9adqmtagnbowa349orlj5op9h4wsmd0xocw1wl5x7dgx3kvzmkyj8x232m87k14vnntal331vxbitbg8ikxunlmfv2vd1s5yssnrcz1lyeem4rfs3rfwlp58qx3g7534ijt0oyx4iv5pycn1qtbb4nrx9we9buq6',
                flowInterfaceName: 'rblsdmbvntl8nzpvdzcg56cipwjde97hlhup2547joti2oasjg3wd4hucbw8smzw2e50lqcurs2x7nxrupwya561tvghhjtndpzbuqf4ykvzi82v70oibll9gn54z99fmxpos540g29scu6d8fe47y78yblgr5qb',
                flowInterfaceNamespace: 'gf7ox8k3f2lg58bvsc2hwb1fk8q70msnkm3mp0rjwcu192zcvp3ak9qws5pq525f59xpzl0u2osgoq3ypmwb1xt0i3866ojkupj9rwe43tgmtgd02xqgf2u1kiugsv2emm24stf44fxdg6omru12gmxj2c3fiurd',
                version: 'e9y2jbbwm54fuf3oeyxy3',
                adapterType: 'vcz0t0616miavvr3u9c6nhd20zd8nndsq3jn5o8lp93uuk1698rvqzh3zi3d',
                direction: 'RECEIVER',
                transportProtocol: 'ar3f25xnq9wf5ojatjoado0r3mr266790j0zczsmabif8ffpsrl39r0aeucz',
                messageProtocol: 'iejzjjuvp3lzsrclsa50z50d3xqhnusg5qg6wdwp5gjp034nhhlbad9fah2t',
                adapterEngineName: 'sxzxyg8mnyo21zmjfont5jnv3yd66ahbwu72rzhl1qry3fju66jb8hqxe9ihfj0lijttlcd25qn2tkh8ksp5eyh19pho2d3qk9u28eajaieh5x2n99s3ckypxsxnhgf9tdsgqpsuax8x3zg714qd0pfo5wyx6yhk',
                url: '3inuxgnlfdfpqihpucfo75f7i7iunmtovy5i1u937uxid8blg5sudj7f52jln1ponnminx5d7zsoj1st4d4af048nnzcx71ektokf8mvi488mi6pt7176jlv2t37ijsvc7klz4lxo2z6mwd496c911hfakighjgvdxl7x8f40wzqd0d5y89ty2b8wb62wzer8pus5bpfwx8nkmortio192z536pau7gxozno434fo6vyinf22dthybejbeqfgomnp5x4swyoph0odmiw38d5drahfmu2d8qn63b80zpy36z6b5xfq67hr8rrfjf395h5',
                username: 'fhsv5j42rqhqxfjy8yhsvyh1na89zqitsowoyqhpn350ukyajkoe6po3xp4q',
                remoteHost: 'qr8pgovfi8w83b37hj7vcyrkl63oevklpthsr2wtu5en58qcbq224as94j6saeimb03f234asfuatvy57vdpmgcj49en4c1ipvyl6li8r1ge2qglsf1j5jwfszi98pkaf19gkkdsloffbltm14tklip4kg5zwvk0',
                remotePort: 5352003106,
                directory: 'fwcxbvzlotgjgcfn6xsxb11vuhzrhzmlqjzqcauq2tgjik7jewejntcyn2v3qu08635uqt0sds2ou0isi0loq7agmiryzevr7irjlk1081ah0zkw0ce6imrqtltyexzip91q4wi8s91lfmzfica3085o2rmezkxy1kcle0qx2tqwukafcxf7naa9dyqzd0ohrkhdcx44hzskrt2ikwuuanepcgr8nrrufc0ct97pebo1aar4ut84sbgw7s59daed2ehkk2d2l3f488am79fxpmde06v7bmk0yvdst4gv30dyf47lx31b519pnj6izjl3zfzopizrask73t67pk06rfnp8ultera4am0ppptf90vpv3wps2zcnn2tjcoksff5o7zyut6jswlr8tkirbtozqtdbd9nm5shgaceyx36luchefjuoq804siujeaqzcutx0tvnu9bswtolgdcnix2iygyvc7mz9jmfr219bkumrgibull9y9h8jjnm82ysvpqvb2jcx4w5i5vje35j5iq1d22mqxg4dujb20c6mt7r6omv8u4ji6aaaloz73kmqgqduiupz2wekgiaasbe60ovcyv8wjevtanltydgnjuk7hxcfhmkj3cgxw6h2pfchjc14tdi2y1h80jcvkmnqhfxjj0cly6fccbtkvd50gntveceb7nob2wr8zrf0nlsk7s2wcrnycuk56ev0spp6fzbl26sy2qgl3m5oa8ypb28zfbhon4lv2rl4vcx79xv7s4u8qlzt2eiwfaqihl1koxxj8uj9ert6anda9lwljfj82hlz7i6wvh7l7ok0y0mkg5vi6srxsddol97n3t6jggebso2353nwdgwb21ji1q2sk18kf6hwyjgi8faqedjt7kcwicnwqb4lm83mfvjky3hof7v40kv7a2o7duqaf1ln7e8ftgrl8huadz2bolq4rq1y6k52p1iyek73rgzwcmb18lawykcaid4b2k665jaoijp2a83byeszja8cssixrk',
                fileSchema: 'w7cr4v3oco08v4lac30lh1jcrbys1p9kza3zwcr7anzh2e877uvibi6tu1fs8nwj4fwncn0h6y6fh8b8or2vus1hfburr5fuc8lccme7gby28hshdgd2244j4ubirkp8eq7ujn08jaccyqu8nvh5kenud3fixswdjkifsbz5g3dayoqs9v26cndawzvtifj5t1a4q15ho26xmbqjwab8lrdsv9f834vc03yln7pesz4pdguc9srbwpcom309aswl0ce1cxlj5cumh4pwsaco6pxjs0vu03y46t82wdf2c6it2wisawpg1cc0nvsewwnbkoj8q7zdqi1gson47lpms1sk1o1n17zvguwblyagq6c7u9i8lbg0j01pbvjs1txgiulb4vgrdcpitoeh24okgd9m1c6ig5s5tzyte8grcgd7fvbb0q18iplk4rrgyj8y85uy66stvcw9w0mrzvqz396ntxjr0bij8icmz9fjxcuokcowz7ktldb5ygs2yr0f8vzjepzjx6w8gq4ic22krjtzq7iqwjcddwq5v5qpcqwbne7iplm58rrfd9k6buqzrpb0olbxbamkzarudfsj42syjoaufuhmonou8520wczl09fqj2wwejr9xne31bgltybrl24vy8tkisjwyxx9x8lh2ejn39sjhh4u4do3sspx9ez5i8rbk7wm5k28kwnxgtho47g2yi4wm3z45m0u2thn1y3dtm6piua616saqeinktlmti2257ei816r2171swx6lwigi3v9m5mf386cx522gtashaa3tx3qpzujt7tfet52nubyhdg5zn021rwgg7siemu9fq6u81zp3szf6lk3h3qa4jjgzyvx0osgvj0ik34fb9rnto4m45t8kmpvwmz8ln21g0fcvy8y62r24wp77mn73avdbsrm0zt8pf0jp747jwmisgyrjbncf6qmsgur9uct2vavdj2zn0wl717u9d9tx2arubajmnphgwydkomiuerzbcngrb8dl8bg',
                proxyHost: 'edt6fjxn81exmci1s02goz7k64ibykca5dw2inpdltx1znq6z1yw31o9bygn',
                proxyPort: 1643660699,
                destination: 'b4jxt4zduqw8q8c0pq23c2dc9g17w56nnsf31glgdwyt3n0z9jon6etr9rrgnm12wpnx3usj5cqqou3ix6x3fxq3tma2runluc43jwl8uv3cdrjl59qskn2dvnnksy1eacobfz504403sw5c89kav7qw508ivi6j',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'e8cnebjopn14llbt94u9rjxkbhbhy8an5oep7jlbg96d1574e9tyw81if38n1arhrzmd4i9gql660g5stsenit8mfkn2n6wadafzjsm1avf0z1zwfy4x3mh0n64vxhhriuvsyjhpyxpdn352z3ov6t1pkkm6p7m4',
                responsibleUserAccountName: 'plo6624u1of1w5og69py',
                lastChangeUserAccount: 'hqo328jpysbyagnfysva',
                lastChangedAt: '2020-07-27 08:08:09',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '4tr0a0zzaezxjb8lj7r1sdbxwextyk8ax91785an5vp4a2pag1',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '44x1vuoldni4lnrlzyeo',
                party: 'tn3d7iy9m3gykfiy27twfnkwscwtd3hg1vj6g174tskopneo9rllysdg7a4iz5bixv9p9j9xzfn0op8ps28li6tsl67xf4hu9iy0hu4fp8n00rj3nidt7pezvny7guiplhe5h452nf0vdpzy8l3cln1k0zjevvci',
                component: '5cjl7igus2hdwas6oolg0ulyet8qwr4qhh5nr0hvq5f700395083lduta0tfpknibgpgz2429vqil7qo3o95ltzztkn32dgdwp4n9e9qcw256nn4ixkmu0uxw3snuf65plb69egbz2g1kexm01kex8v83nxjm6ck',
                name: 'l2an3ap0rswmvoo7i91o87zc5tb29w2ku8sbkoo89lovvugen82xdczwceig9tsm01bjul94lin7bdhn46i6qn1x24j0ooqoy4alqgcoz0il3aazwj6le7hwq6v4lxq5i1fsj6ovtrxlp8ahgl1acwbei279yq7f',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '4f6rkezpdzyhoe0p6h2ii1nhh10df0650ijq3h1gqpzy01a8f2aad5xn2jyhyjl8bs9h9t9c2d1u0d0i6gcjvqz22vxgq568zdnva0p3lqea7hpwqco5ou2a35lyqfx7ksxb53muhjbey44y063jy899ugya9ugz',
                flowComponent: '3ilpib5js0e1j58xf5qp16h8gylnspua0fxsly2z0ydmrexcpsl8uxlrjbsbhr3ycdjn0sx952sceyfbt38mryzojd0k50eaa5fu1fu8o9z4rm5z66r6s9fdkahubdgo7ir8nwsnejkicqujfn1p2occgaf0psaa',
                flowInterfaceName: 'bbjtw7vzz3lxk159hp341b9a5bcx2hn4sz9zs3xxuswc2iug3451bq2duhw1k5k4xk73t75zd0oma7zoyiis0gpxilt3wkyjez5i8mweo7bpsl8ifzaa37g4uy8m84ey513oijg5fl2bxcqwygwzn6koff76qab3',
                flowInterfaceNamespace: 'ir0b4xjb7vnwm4wcprm1h4lxw148p8mlfflf2bpmiv1jevndu8q817lvpv009lxuvyhoc70p5958olnki60rxypgix3f3dbeyzt1e5q35u9xndvoyleosudt3ep3puluii6hoyye3fa5b8tvp1wjo4hi4or6coz5',
                version: 'f2tp5uhec5ce7iengcmn',
                adapterType: 'e1zsbmj9ol93z2csedn7d68i9etsttm48c2tkvq2dmy1vppjm7b1o749y8x74',
                direction: 'RECEIVER',
                transportProtocol: 'mtuv0zfx484axsd81zu4fpecn9isj1lsnsgpprqg6zpbzgorch21ngbuaf3x',
                messageProtocol: 'vn0oii8rea59r9h3q1di47sxojgmkdnqbslpu5r6jheerdzxzeet75p4tltj',
                adapterEngineName: '60cfayd6sua9vyt0jlfp44gy4d29xdh6efggmrixsaf6c84tcfk92j0s1yjiw0uax9d5gfw4f6ewddwc78zt521ruek1013akztunf0hm3rg0hssu8cxfj35vwjdsx24koxk8op65udghddk7th8z52zvlmov24h',
                url: '9faezqpjpaymk4sq15w36qpqvx7nmsagnqt0r34rw4iop8gp8uyxel0ojopakvn7zfy3bxw4beb60q87cda7fnth3kh8bmppqf9yb3ypf0zr6brs1vx7vd20wt41hqp6vxbwrgbn4880zfuc6maz1byfy71b2yjakhf5ig7umkwfbnzftggq1gl1xrxolzabivrer3jesod2nnziwqp24luxdl1w868xz9s7legi1hputya6gm7h2ldxlvws986vtn8w3ib1k9fdeudfntbl26ri27lpdzrx0b4w34hftkko8hthd15292sp00njvpbg',
                username: 'vvrtsg8ntypvmkphfj6ajzqbuz0phqphwzjbtsrpos1koynpv77baxou05dj',
                remoteHost: 'yvqqli6o1204c3afiz2f0nfmqm7h0tdl47kuwjzm3dz31qnxt52ldxyz4yiuz78t1c2iicyagkv6danecox1yyyaekwecsnqt7pz93tbtgyo2isz08qdquxxdizj05kqcvxgj6j86rd5aucdyr2mtagdn4vv6m9b',
                remotePort: 8193994027,
                directory: '8ul7edm3j4viqqyp2bjtt1mid581tfhn3m1ma9qlrgr7yxbs73oibjuxgyzoebuf6i3s704g4nbxw0fnb9igw0654cxg6p70wcnx1nu0655ytckq8e8ylwsf03raekggiyj0eubjtimd21hdr4v3a49dr2zolos3ue3ma87utptz1cb6de6iblmqn7cm63wlybotdksnwt0or0d6tcw8puyewtz2dq4q6381mlndy8968q0ypest0h617nb0r15cggc8iw9r9ausl3pqfob05u4evlz4ip1n899lxviptritak4obun5br43ksvp3x5jsfn5507zplugje8c9ah8vwq3qmolh83z7qe6negapa6m6qavloqnm08ms4f1b4ls8u8y8y42gwqp16xlmfc6zn7e1sq4x9jcrb66evwroh9ttl8pbzy6nfxxu7bwj01nzwbe32l399kw5wmpj1wnwdynabswu4xc72tjjcjr4rfug0c18yzq5t0pyuke308ny8kjpo5vc8n8qnw5t8h9rgdp4n1tveaqc4wb8rx5akawddjy9jkk9003dlnvj429jow46lha1k3ji1si827irqr2jaf9vsti8gdbrs1ybjyrcse5juiwugwrea4zc3dp4t54wwnynrprqhhor15e1flgvq5kwg665w0ly7hota98zv6g58dujuhyc2kwp15jwxjveg9ot9nb7qbapf3liq1r47j5wgepahbwh0sjkov7sl3s1k7ttc5n9wlgjabmqbehajxyh23s1r0zobie09e0pg6bc6a4f9a7mmvxi6o4t1sta1k7xkcbwwacgeofnqwksjf8hfy86e47aitvwtorifxabs8ikimc9dvmbiqsru9l6k706vhn4wj6r2j0uxzr7il6rr04nn01g1rt89bvryj1ohfv6hd20v7pkfdfevey8xyzhcmwg5dxd8m3lms50hecql0pyp3zdetzdnnxo98c9f3r7388yuibpxrv185miv9blbygde4b6b0o',
                fileSchema: 'ka383gs6owhjlbgfovemubtu47q1goraydn124js0m58u866iufjrwlft6iseo86jgtgr9vvw8uzspzid1ufhmobv6k1dll0rwu2ne1jss05se9kmw0p68ponwoeulxgfld87dyey6yg9ambi75m3yqah9zt6i3wtndr3t4anaafx4l46j7enefqaa9gr2838kukviwdw8cn8zy3q7p6aetgkcj34dg7fc6qdv7flb9ypuy3nxgh229ic9miz43lsfsxkmca2rmuy7rrponv5vuaeb2cu0bzc8tu3nvkh4gj7forwkx90xubc5lgyggshf89pu15t9jup1yb6lxwrqkvsa4gi6qz5jc4erfjmlw5p35o2sjkmurduvbl7w6j5nka320igejk8q5grh4rax72krf70xs2e4ma65p5qvsgxbw4kw8qkx4305dn9d6slntx7a8g2lvb15cidawozohnm9cmox0h9mf15tuk5ooxf30eidqaq97ng467ab3zq6bfhebnkj9ydidwt5dppfbfmyg5wirv85h9ub0tuxbxxokolv91ay1cr9qg4pkgxoysujas5x6mpryyeny3oo9788wvnlg79jkb5vmaadbg7w41tedi6gjbtohw7sn5o7fqvn7lzxzsw0jgfnfojoloquq9a2tz83722u65jja3k3cb5qprxv5occ2bzdu1ktjf5fmozlxqd3tlvj45bx04eviqnvt6xj2b2z7x7p6f8s6kfhf13hg44ss3ts7qeotao0devjarkzz95ii2tsudaehpag4m7sp38t2r2s4ydy0asbye78mjil2j0ppnpq94l3zebaf61wgftps8cfonmyh4c3ceo47nwzi1l4lllyd4waszdqbb4pxq2bsnbfhftjczc5ace5rvckybph3rsn031r3fgewvtbn86jzqki5axy59d0seep6bgd69p922pqg15c63jwz3oxfo4ggsleg5gtejj7hoegrxagc895s4ze6sgdt3lwhneokm',
                proxyHost: 'gfzot68t47wz6yvelygt7ydiaz8j6q5ldi2hqnybqjazllajrqd6ayrstygd',
                proxyPort: 1890543802,
                destination: '9h1qnbiivakk9nehl9m44nh3bsi0dh1z0c3vxw64zgbhbmdgnoovtynyav7w0fle3cgcd0in59f93qsgcmu4uo2wawh6p7rtujutryrwynutdj5ss5u824psa6crg8qi3ma3jjsd6kbdl4wgwjtygb0p5yv83rb3',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '8n36soewc73vt8yjvv8x47xebhkkbbyfzar9yojc7kdsdrlde830pgqoonsurkuht138g4skqhresgmfuwl9w59u0ew2lj3ed4idpmd5ru276hyccdk0uycu7w5mn2yo4eh6iszn0pboup175hyqyvkc72a0xa6r',
                responsibleUserAccountName: '525f0g8szu3836k1i64j',
                lastChangeUserAccount: 'l5u4zy70raly7omxl8w9',
                lastChangedAt: '2020-07-27 04:26:08',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'iyrn9auqmfmhxgojlnt7kycm5zya3dase4ldq3wzdyxuwddrci',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'vff4p9e7st064f7rlce0',
                party: 'nqj9zzskxiso05ae4y25g4mterh59fypegkciyy3o64xhewjdojfw1suqfx11rnkovg5xei1u7mtlku2ca502fnpip6b034ah4uq2cs6r2wiph4xh54wai4euzce6f5viqko1rtgnznakimfege4oqlmj1w947sk',
                component: 'h37pfwfyb3m9ohayo69fll2xe87y1fxnhp24frpgiu37v9qauvg9moxqb61s06cdqucil5d71uo47tw55x2oxeq8d20vc5jg0smn9wlzqsowu46stb7phgakmvyur63nfzfk5wskk3rp02xxpmvmb8uo8267gyxf',
                name: 'ifbm7ikjbpe8zi8a152mx88thm54yeve5oh7a7coo7iklfpc1mohiey7ik84bds993rwn4g1s0dnjylbh9cbz3aosx8vtpax85f8b54ncaaen87xfs9d8kf7rvlkslbmtkvp7dkon3j81opc5j74wh5dpkmiy9xg',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '7cfidcdj4um3on8llytbliu18h15fug2g853c8efou3ub5u3csy3212f0cfw159msc3ysz7ikprbraah9sp6k2j3j619ikvttr5t30q0l6frw5k6xmfc0oe70hfhllrpzcndeixrodms4fxzz450950fhksugvrz',
                flowComponent: 'nuwi3rfhn02h4m62dtq9eev4j15bah9n3n059ggr1tedx9cp15b5sm49oeq2zrqmbtrpuckgz4mypq86i8rzcp52wksjmiqu3kndr8mm2hvwoq0kzjcv8kk176eo95z5cfsngfgklahyjpekmjzgm2loxo00gccu',
                flowInterfaceName: '9ke1ba6bd0lkmaewbx5ooz0a7lce1v1mm5hy228wkivvk10jkuu2yskblqf3wye5jpe3q90wybkrx3ai6dmfb7wrhbwgsmmtdjczs97f5889qkbreli9n8effry1qtaohgqdzn8s8swv04humz52d63ueig7m39m',
                flowInterfaceNamespace: '9sh05nzey065zidh146pdjs2maz3kjn2o05bv1k6f3hhm3y9b2n30hgjfya2vju8xf4rpzv9v4njbz9twxl16048etnmoxbon4waujzqhyxdidaj4e9pmked7j866fqwf1efflq29yln25nrrifc4awv694nsbs1',
                version: 'unyjlmiblaped65pykgg',
                adapterType: '6w2rf2aednubf6g0gl4dhebhtfn9zoy19htsac3n3cf75h9nvar8xpdprlqv',
                direction: 'SENDER',
                transportProtocol: 'fjulua01cz5tsbgm4uxca733vw6svpvatsmowlmcsbaln2wskb9zyg2a1mr71',
                messageProtocol: 'nr0rufe3ixfp5ddf9mllk60133ieqfic5zsvugzujs1vtk25kjzr57ldpvns',
                adapterEngineName: 'zjybtgtudus8bpy03k3ecylnztgh4rzf1n8ll39uun1hnchr3kd21kfxubz4ch8vs3rmew6rtjujto8i552gmu8in6qktfmin7p4n2owgrozg7qhbi65j4givc0403wc3ty8tlqgeptm6zl4bam0axmqfytfxicd',
                url: 'gbwe18gpeh5ajymtc0mb9itt0e4t3bmjmxtxg7g746ict4uxx1n5v8rqsv5k0e9vmcs51tuz52ctvvvhmkuvq7hj1hvrk2s1n1zkiqjl71ffl8gvru3prwcpcewjvgeh42su0yhe4wdqvtjo0pi6ewszcrr23fksi3r50zesxczbeygxi4qccq3pvaj0ui43439vrrzkms30qk6aueodsgpb5z6qvveht3jpd8o7t7emi4uy98nukdhupfzx4ravf9nuifgczkag4at9dfgcx707h7a1f5t0fzin9tmf9tzq67jkcvulr1gu9f89yj8x',
                username: '68nq7aqrnf4zgzfjihsvr936edvcffkqsud296d38ph0dd00ae4lqwp0nkb5',
                remoteHost: 'azwgzwo4p9ghpia1lu4pja1hdt9v4w0xyxjh1q04deeo9hz22o8lmylr3lvbcea6ztpd9smb7h6bfjma2f3cdnowdg5lefpvhwfhapac6itt3od2225v7mehjmhokpwnrm9srmc1hw2l7mc1jg8mvhrlqf8v7h74',
                remotePort: 6354205506,
                directory: 's1y30txfcgulexu9bj6oe47fttg9c1ocyvckbn4du1847v7lqmibt9irrt32dmi3r2x1t3jpifegvlptqjxyvpdn68y819lp51wc8qdybjzzvntbu7p7xzk30huownwkurm89a1ph3gfrzq0y6d8q19tui6m67n72tza362r7t01z24uwk62vak74wirau1ftgpux9mvuz2wd7sdf722by6leiq000hu4zlp5h4be906n0fv0ni3jk2ff2hi3waylkzguarf7yltc43ophgb5365kgesldebnen9752q6b5hdkagd5lenwmxcpdf9pb90op03wp7ur255sl8qh56kw8eyxam0e8aa7zf32rx5cbis3akxswoqj92xzj4xwcg7m3owq52evlr09h5bchx7ndurpx7i1fe5uiom0btr2h5fzp8o80llqo3hfd1qzmt6o2gv674jns46ewfff1izdh2vxrroptdk5fps36n9xoofmmw81vstbk49uqpblpv6cbactz2rt7lt3r52erq43gflrfthtce2knqi0j0c7tndjehzrw34kgbpvuudq4as9shjwpwi1dxou45lwovsor6pp4kuil53snt1iqpj7zrrnia5m3xuror7ncyj3ktanqcmizchq8hi7s04nzygx5hwo3zp7i7g30874kw6i1w913c95frubozbx8e1dpjmesj03hopy9eqm39iylwaa7v5vyw2zglunex947fsoanhtzxniqi4q087mm1cbkc5r4y0pet8wb7rcly8du94xiixhdsltlo7npeg1i8xyxdi3y0w8c38dpbgg7kfgff9iyokvhr4lu1tmg7bop3u4aphmuw0qab3iz5t295bkmcj4cvjsrsbrqrzhd4clr6zi6rjypjwsba57ect3pq8hl5fskwi7gxykepvlxpljku8yg2cj0wjb10lcgbk5fid5st43zzaag9wub6k7u81q9cfcp0e9d889bxn6mb1bnv8innb0auabxz1oe6f49g',
                fileSchema: 'kgczan1nc2zwjrhl9yygk77xrmw1h8szu3rxl1qcry86avwtjd4d3jihkjnelp37hm93g8kdsefgegil6cu56pagkshj1uac7zj31shahb9aijbnfl0l29tglhlbka653eqe7qhc5x0dnl4s8f8ss3dg7tk497i4h4uyl1yswy3smfy1u4kv03p030z4vbifsb69691egndf2dytvqb9vl71txj79fh54rn8f1kbd0b4mk73qwkf98bewds6gn15u2h66w65ybflyyu5sbkxbug41o4121snyazk88vtju7egy01ju8b0kajw7ygq60by9delsdh27blqb9p3gjtv2b6ku89b4kvc16wlk26m14bf3rkxhi8uxz3qxzwkenhmipy9agysgx3ovkxepy23179ful258nnn6yoeo4e68bdworvxauy3292cnqj0c5uqxfgfgo8ii2do9ib4qj0l81jxg97sujnji2ykhjixjqxn4wvuqlbd0nmvo9gpkq8tza83qvm0l95vkmgsxiww6fkgcwz5an78g5uglwd1r99gxcfjdhs6y7703p5bs3d30gay47turol26uj50s3283mzw9mr6wb5efv6kcwuh0g677nllohnlf2j8bh1njj7orb1l332ygt5s47dhatj1oa8l829eluygyxt7wbjolylskdlrecvxor5zf6hwkoe9g7re8hl5xt71kq8izuk6w7nwig3vkhdieirhpqfp8n6zgegsqgywsyj84ye6tipfved1s399io2a4f0f63uycdj6gxkkqu6sd5es5asrpp17iceciq1rczy408kyt8j9ta70sdppy9to0d1kulgu2zjim26c9j61fd5j3ote0yis0xsw4ueqs9j29jti8myv1mzjqst6ukroi1l71pve2qo9ozr3zc7zdqwwn7dm5o1fwu11hy5sodq3l045v1kiywhbjmu1chyp3bi50ag9du0n98ltlpnc9gs40kko78j8y1cxsekq3zdmnflps0',
                proxyHost: 'z1howz2q5rrt1uo872q2jwhslejigqnnbx47j0mzd7o4qn6olbpo4gozv0th',
                proxyPort: 4648337659,
                destination: 'rhnxxz7f6vwkrig08s8y0cjmtzgzi07olnganpspsvl7o6ow9h7vmunz47zbi1yksx7dpx8y2rd9liw281auq5fpg1y9do6ufo52u2aegkmhie281g67vxoev0f1us3lwmf53fk60uakt6mctkhz6fn2g48gomtb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'hpt3asegxgml7o75174j1ql3jo1pgjsq1lvbghgwcfl1y0ti62naa8h15pb10qya5ws3qor8gd4e7xel0a865d768dt4vrskfrpwo2ja48u68twxrdskliefjok42b5o2xijldc3cejpdgipfc52aied2cx9lfkl',
                responsibleUserAccountName: 'q03g3osggn12jgo065d0',
                lastChangeUserAccount: 'nlu6mlgyow9kx17p7jeb',
                lastChangedAt: '2020-07-27 08:38:39',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'rwbpbm3y83tgf1e710txev8l59cgoaz0c0loq578j5dtzlmsdn',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '7ban2qqp95qgtdvcdwj2',
                party: '7cb894x2hhl4pbkf7hp6shq5u9eek9tdvj0d43aaaxm30y9d3ft3g124hrxhzyq5arh34y9ri8me5ghdf9199kjfom7mmwv7xrhyw4d7loiw48e8a6nchrkqjcddrdsc98l4hqtqala62hgbp3wqoh7tor97c1e5',
                component: 'ghm1cx5ukpncjqsc4erekcl19iguc4yjo82ricxj9hi2v27c37qzqdz1aquxwi2qla3wbp9madv4igutqx7wdwk0egw92gelrl1hwzl2z0ipzdu4qg8e97f17elkicuamcad35uol2b9v0ioux60vu6ob6bued1u',
                name: '4djzvx3ksugg3cz85nll7x7u6cnrmeoapn3ta84c3512l3tqpawz6bgslruonlq4ud4fqayhwckvxfhbptedyncrlrydvke7t43vyf64uavu03fvrqgqjja0y4c3pg9v6956rtov64s6zqz5q4ktd4vy8zm20vt6',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'd97o46ii1cbo5caiw4lp3t9k0dxrcpubjltps8snpa7qupeyas3ogl3etqc17npfjfd5pdcv6ynr61bi8hnh5qhqbf636d9q560brm32fqq5ux2muvigji5vx0ffhk3f5sc7ptt2gs0een6bopvvzijh7oa4lcq7',
                flowComponent: '64rswlozusngjv0wmx5rm1fm38uleqgo5w92i9yv4mvggvi6tbe4iiiwk6r32fswapw2l6tgcbx6azex7m293p2mvtha95kvocoz27pl65hqd8dwldti7d53h5vlgigzhgbzc8t8pqpegsg4kaifcfc6xxv28wor',
                flowInterfaceName: 'lx1zfvamc864ctxpzbx2bvz99vet4i82xp808dsdp34fffiflohbi2p4c01k0nx25xbwislfupu7683dzza45z0l4sb6cnk6ssl79d7jw7uptg7903774ap5my4iy5kza297wzg9k2ct9nu1anb939xjo6pbhq3g',
                flowInterfaceNamespace: 'i74ytgn53tdfgads0gt0tz31r5bn5ktus88i85jx3scfor1ypo4geg1ojdafkdpu3payfc2z1eul4xsupb3gxs6mzsnhbxkgw5c1tfs4wrhjsz5kz5ocu41o8kegb6iqtbefbjt2ntgwz4d2atctswz8zkh50ovu',
                version: 'encaqg8mvf3hu421pjbv',
                adapterType: '0tpldjyltvyuxpzfmej1fosefk8hnxr1syez6gy8bghauc8ijwvgbmbxhh09',
                direction: 'RECEIVER',
                transportProtocol: '4fps23rdadzncymss3h4lce2mu8s513jj983rathfjliwnham5z75mze1c4e',
                messageProtocol: 'm0rcbkdcrekmp7awrgi3ak7n81wwgd0j1xyexiroqdjv4te45n6h9s13pg3ay',
                adapterEngineName: 'zf2hlyq3scrom54v4z2x8m6h981i9clma6en1t8xrqsv5sb8tlvgp3udoilbs6dvb9tnhokbljcjn63quwuvm15oxzdnrfwxsz23p44f7wuaadsawpfwyd3f3emc3wkhf21m3aiusrm11zii9kg7y9d7jvkrx4ym',
                url: '7mx3ztems8zr7uw50haik4cufk4t0h6bw4khntxuaiiuvxfszmbqln11hcdzx9rsdn9vfmpb78swr6op0g14z50jhtsn2wyigofu2yhnlo1jkxfpt4by54v5zij49gg8h5q9qb1osqtg5g52fgzzwv4bqe94q5w3tr7pm06kldxjvv6i9buo9f0ol09xn2jiramre5rwm5eemxgt6j0sai3ustyenvxheqntwvhzz5kbvmpnj7g6jr74nw5rm4kw4zs3xmyn4ausm7idlxsbdfgc70eawvgnsw7o56h52dox468nt6doykkxbcrl1vud',
                username: 'fkbwh7llrvx92p4b5wvra755tjpv5ksdqb9uqea46it6exxy7tb4zly0m77k',
                remoteHost: 'ym5e0ole87drv3corzw4p5rtl8ancu74il5m3t0j3w6wlu4hkhj4ba6ucbwkt4hlbjgy5tcsjzjcwamsasoh7s4nixh2t0nzm5av70905dvuv2arnpetbod0vwnetdtkbvew2avqluw7jgko2kr9omnpdfl19oe4',
                remotePort: 9518771185,
                directory: 'cfa6mk6muoj4jiq6ouv3ocyarxy8q520p3mafso95ayfab8zxdohjjltty01ljdtfkxnjhhbuxyo5flgilp7i2dbr003pwumbz3fml7w6kluhmp52i4g0onmleab18jyqag6xuopbceftacpv6th3exqibo0l52g06odkrw58dues7p6r5as4k2hpmdf2qf8nmzpr883cslzhfejn93dzybn3qubmx7pal7ccoleild42tci7fyp814of9aeltkzgn0ef9yezwxhyyvqbluaxwsle4c5znrd36ygrd8wz0phuoz86y2gsi4ndju2u2sxncunhs4pbrwpy37z9cbb6ne21p38gizke5g2l0oo3ciaxz1stu0s0k4y7qn1d9dsn5s796x5xbrckk8jrwempt2uh8pj5s1qukmfgm0u3s0yldrv3174i1uy6bkeepmmc3vecutz1fe8dv18q028eqdhx750wuufzxubqwq14dzoz4l5f6xt5po9evtme0su5hpnzxl6x3ytrenqxud4b5kzu6y9d6feuzh8x9m7iciv7qbtl82xa68yc42gecj1ys861tcokg4y4nyvhkp1cq2vbg1q9qp1vs895wcf71heh5vodetnuednj4e5tzg1uzemze43kb95681xnbj7l7px87zel3mzrrwhw6zv7lfaefurlcirr488ouzoj86mybzp14ijihsiolocox99gbyfdn5krh7gco3u6oya4u3gbuu865ww6xmte3zld4u1ey25uv9omm1eyoo43exx0fryp3top8366zmk0i2k6p98bukj3jsupy6a5joeuvzwhf4qdsie1d2b3dxecgujh7u70pq8j3343n15yy0vw9upmlo7dlnp2l0ydldzrhtvrsxb1n7u4o95tds3mvzergbkmwldh76mp9zje2pachua0cieztes01vm8a9ss3ym0ftdqzlv09ryqqwhk44dbzo774ns3snubjnqzkm5ok699hngur6npfv9jbbysy3q',
                fileSchema: '5bcjygeat8abtun1kx1lpo08n04urwk8oa8a55buc5e39sjk3dm1q2eegzec19rn14x86to049df2hknz0ry28twunhj99hpo6wap99j6svayob8osqzrjxsk8p7abyf2we5bk9794w0xqfofsgeeb2wwzkdjydekcwf31rli7qsn1ex9g3fuohn4l0a71w97q90jayxchxndmyd9i7jnvd4o604h8nl0nosk58yrfsgxpxvmek6imnsxg1q3qt90f76usnt6ir2k1yrw0wn6si7xjxgz37kbiod94o5aaq76ypduqcl1a5o8vqcatp6jn7wq2xu9959lddivhc63fe03pxprm2fdatb52429u1kxowqtobe5faxrfd3vxmprfqmf3k6iev1sgd4wl6kte9jnmsn8pa8iylrmgcc02a1gxn82xfccu8m4nlx9cxjxxb3jaqdyxo54m19j42ur26z86b23oaykk0ja9nawyk4x1uo4av0xz9n0e1yj7zbebi7nsfw8rgy21t2yvi2x6b6pganvve76bp5tvmlhgud0j8ktxk44q23tmfguzcc9isq24z8o77tdllzrebffihxsjnv6bcj8bw9yg202i9k2s1wqivhv7qpidqbjbnmby0utrcucdr1a140grqp5zih3jlprtks34bndtnxn6zqmrdm4dadlvr90fx3y8xl4jdic73ihro0w1sq8ybm2sn5m5chpuybv0dppkybb5eo5lh12nuapyoh9imhz4o8epqth2hy1dyc05zb6huahgkvhjb8h4mq6j8ylbipkl2iu74hztgfej8c87n4c3duo3jlgf1zirgvq3ht85e0v94kblxilxgxvfunfl8r1qfa2u34cw5459ypemaan066s3wmdez2z68wg5a24dbo8ekcrubl5351bjw6s3s7ne43t7v8b32ejpeiyf9zrxwt713cpbjzfjmn97luzvtuy7f2vir4ilf5946fh47y3ur6eux9ho666kslii41k1k5',
                proxyHost: '8x4rv7b0wnirykmofes1u0greem8k1ui30550wlwrhtfh4ycbj2p39vo4gb0',
                proxyPort: 4238886323,
                destination: 's9r42cki1b96uadprekjvucetrdsycle9jz2c22uvdr6orp8qy1s70fgip75pa6amvmc3wygs5fq0cxxf9ax0k30ckl3ai2bjrgdnvvo2eawg2ajx2go821rwfh3qn5scqdm1135ltn23isj68q7gaheivyoehb4',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yrk8mo0mayiesuqt0tnbhyczu1mknibomb2dfwfr8oif5oi3901x13esr6rjpvcupm9cle56w3qke07dbeuuchprlsoo853wo0i08i2qm5nc6b6db33j1lk1gvmwbk2wma8gpspktoqa187kbjkwtn55xskejff9',
                responsibleUserAccountName: '1ftwrkip5zi25ntpczwd',
                lastChangeUserAccount: 'wchqim9ff1j9njmydvn3',
                lastChangedAt: '2020-07-27 15:11:12',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '8qkep8dna777c646nl57bw430bgc7g0g66ddu1vjzkrfbxt5rp',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'v93r472c4gx1los2l80d',
                party: '4pzb8ouma1ziuarxddiu7d04fieume6ta3zombv256mqtvslmiaed000gfze3bj9anbuzj94hegdfug2t6p9yuzbx0n1dagfkwu2eshhe6gv5hkejnmz6ftnh0n9hbzsxw571bazigwzjb4uixrka9lqa2r8gjwe',
                component: 'ese5xu74z5xwxor7n0iahftyf8wr0u4pph2xkkaraq8p76gjateqfbgtistrks3p0gilsy70imqnfe9edgc6odlprwh639mh5qqfou90uz9igni9ood0ybdw8dtvxe82fxc30yx6gnsrc60xrx9b23tn1svuxa3w',
                name: 'e8tt2eve391dzmvzqncet9nod9gmv36m8wy2lo4whgpm3ii5hr3nvnipvupekoj979ikdh3ep6qxyanx8acgd3y5338jos33lxjdmqdy3ifx6el36ld8ls0jl42l1uagpj7p899btsshjo3edvv8gsxymhuuqquc',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'kxcwrnmvdfheudwhwu5pv4yf1sghndaobvj7tmm1ponk0es1cvof1rqgucbwjqcy4k38h2o71w1jlq5xiy0e68ktmiguqsl1g00pdv428k8f4indebirvkk7h070af10ohkdo8ote5g77g1ykeu49toytqwi5tcr',
                flowComponent: 'utw7yx8dzdgde3s963pgf4w4ealg2anrvb0ge29rn9lbgafwjbpnrw577vpr5frzd68miwuipl3dyz8fd5wokww0rl0ob027r18hgdy2fpkvrea28ygxn8gevylef595u0cgxglj0exx56zcnzmkx20b99yx4k93',
                flowInterfaceName: '82qk5ilo5oy0o5p315m30savmoscex4793qebxq5srw4j4niry1irdx0nz6g0tdedyo3z1ogqha105rerpqaqp14q48kvsoi5agdwuoz54vl4ozpxu1bosv1z4d9q259csp3x8dea3kwyi2p983j5wbkd4a0can6',
                flowInterfaceNamespace: 'wivat8jewjuwz1zfbr122o5t11bfthsiqqmby68hs2wp9aj62uvxnddogjc1texa8jjdrt1c2toyhojnvbk6r0yne7f11icjqx5dajprnqyin9kfjv8mcarm8zksls53pj8jaunyxt9c3geebetcsehugn1a1wx2',
                version: 'ni7cjjwskmo4w5m9uaf0',
                adapterType: 'tac4wr51noe92hd1v7y7pawh2bfxcjrgl507ccxd3nia4qqslp1l2slcpxs2',
                direction: 'RECEIVER',
                transportProtocol: 't0pluo1ocrmbnjszkgmrwd547cn4xixui4t8ebx71zaz6f0sgg7zhmcpmk80',
                messageProtocol: 'im4fngxjos6aj1irspgy5up7cinl71w9bnb2x4zt8q3y6qai7f7f6cihrww3',
                adapterEngineName: 'coqefgksqv21o8jqfehk29n0gnecopoms45ra5hrbwpfdklkdbk0eyh5jobswe50yqx9ld6vh5lvl6dm6ofc0hxotldxh8xhdqwwu9iast1eiaz2b53yqcywfe7txqo2coquxsnbl3zskebh32xclk9oloauxw22x',
                url: 'z91y64bzl15yw45511rq5pfuetv0f05ca1rtkra1unxs93dm78owyra7rz3vsa1sqv6buycq59s06eg6xmf3kbkpyf0s0amlf9pneney4sdvb1s2ejwvdosiwpt7c9wbegf2co26j32pg32zhccj45x208dh2660ykjezb9z4mbr6ut2659pvkaxssxgptqp7w3w958zpje07z3qlr8dyaq1sl4oyhmqlm5aj09m7jku13jv2nem5u2iydb3z0l41hv4v0enz9fa1z9b6arxglq3h7nesy6nap3f2hv9kmsmeund24hki7c7mcp8qjnu',
                username: 'lfhdy6zc7phf3qz66sr2jkuyvdvwc5u0zqeyu0uty9aw3mmm35xu975x554n',
                remoteHost: 'x0awh9pdc0l0bndgydeh3w2jl118m1imjp5o7sokqta8p5g38cy1aehuxs1jtgjgaoy5qcgc36fvj5co5cwq52igd8h68hk48u5akufx30yth0z95j61eckubyjlqz8qezmq083kx0w3i74dzjaq8x8039ye4fqb',
                remotePort: 1566441630,
                directory: '8elad68q1ce2k44a4qm8rys2j2vyal7tss9fmmtk9tuzphs00yej08k4b48oc4sg7e5ng6nz8bhj3kwctbjryt0nek1jagqh2vxg4xtn5sd9bk5wz940xly4h2db599ptig2udb9bluy4d19tu9f5duzervbaxva33k66kj6rwkl5k4nac1whspar273w0mwd3jr8n70g9kpnsri2jjc9br3e8rx42h5n5v4bwj33hb5s6srng4kvv2skzoipp9w5fmgw6aej2msulsiyyx7dusxjmjz76edhluoy2fymp1ta6r7mxkbhfuvqzd001pb2xjd485wjv6d7dadmymrd87ys1lsmz29mab7f4m3d8iy9ux3y7hsmx60d9gt56gtfqd8cc2fx9rkqwp8v0lvw2u2cwj6touhwot3yaageptzfb2maly40bn3n61r01s2ze6jylfzch60ijnjjp781nd49imp3kikrls0g0knbwhf7yfyaq8abcmyyjmfyp3b7wrisz99fx4uadtwp1usvy8zjex3fxuhcq07w6rrf98r2zay57q41mkd55zr6rdfgh4uxu2kmphtyirz2yszevv4mkrqg87pq65eifu7zrwrotydsv0vz4z18kyfgigu7bc4c3gvz23h5fxevtlnswyukd7axauqy20ug549u9ruay3n5tvqvrgvnys3dbx6t3brz6sjgpzqnknoavkjfhfuik5p7a0g7cy97sh41v0lt7g7d1igp1xysysgaq2io8leidcg2ylgn99vfg86ttbu41rjmwxmaocvokyqb7ofqq4lrabe87dpvp8duqfp67bdgawv1o7qmimqxngo7lwayjqqjol3nr73gog4dqejmlp1thnoqwfoa7l49jzyxrfkf7c7bljbzmd2y4iwguhcmpst387xf7ltkvan837hvbg4or1isd89bn1xe69xd7sa22xgusx1j6smsw8ng5owlmsy10omc8dlkhusbqlxalvhq59z02vwvolrltlo',
                fileSchema: 'jcrbr754mmcne68mo6var142ywosck73ccfh5ht446ikm1gp33doqtx9u2bs72zy7cyud2fyj5o3337to6ele4f9dfjd0njp5uagf2zl7eopiydplrawbiakbnzn0jbns5355tjcjabjkpe3nw5dojo3vjw8r76p8r695ev0x6wt3ucpgk0w1gdcnceucuq3cn23jnodcry03e7q9z0iqis9ea5b5ga45u44jlly0x51z6e85kzsggp6a5uuwchtziga16jpj45q86vpyh3hwgvehwu4rshfk48knagiki4lyv2py3fnvvep4bpk2rnbrjw19dc4iin510gi2wkqzb40chx1q5a6no2x6b24vne6j8amnueu3tqlqgxhhfp8ez7b1cgn9w24qnbylptjtcwcs7889hm6gl7m13kcdd0p6htdn79w3877syp8n30c4dxqlzp47ujrdmkxm1v24niucyo23qo0qzyqdcr1z3d2j6vitswjlojkb74638tkytff29nainvvzoo9os8z23jo7iqnsn55mjrtr4puh9qojr8e17fkhue0ljhqyfvjz0xtxx01rq9c76h078xbhl6deix6mowx1p2805h193eoyu4whumc1aq8i301w2za4ls8yy3rri1rww4e0zfcehalfhg3dxmkmbsvrl73iupyjwxzixmwzx4edpc2m1mgt5luj8acgnro1ocmniia0k907046tezg0i8h7wqqwh6grv52yeojhmqpejtcdxy8zm1ecn5k6b2g1djhqy899b3izwdr0msqnby7icy3xutrsauatg8la6x41v7548r175lbek70xt25cmhd1jg7g6pqnuei3yh8twdolnftt3isf5vqhfzn06brben1qvmunwjv5l24d9crkrqgchz1a5v4hxwig4vcfkib28cpbzzkqva9tn0mygw7gzzrl415ujwgexd33972av4xxbu1id690rtqu0ijpagilkhmoumplqazhnx13tn7g2f054wj',
                proxyHost: 'dlncr3c4qlwh3fxnr1gviqhtxf2igdc0z5lca9dq7g7xilh7nextnq1dpn4p',
                proxyPort: 1409563793,
                destination: 'dynh2zhniskhswg3xltontj4308ya4bqr25yzl7zasryjrp6k94mle8d34md4hubcmpmpagnstcsm8h9vtb9vu53bvnb5aw47yagnapdrurnvysw6rqpn1h82qzhmb3lhhcuodhn6m70xm6hn1910kxeqngtykcn',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'rchlhnjmfbnn8kgaytak6c8jnbtv7gwc1yoqbiwhf6cq4v0zl86n349ywrh3ilghm9y5ke4iteio8dll9gvnmf9ta5hne89se4kzzqyjac3k6cdvdvj1fmx3qii6cuesi7lurxq9b332yfdl3m7nl8e7r5v3yovn',
                responsibleUserAccountName: 'ywtovcoz053jxazgfwkl',
                lastChangeUserAccount: 'dwyu7o74pcdmf0fyt95s',
                lastChangedAt: '2020-07-27 10:23:58',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'rour26opbojegn0n95pl5urwl30v6qan5cvl4lsd0hsxytf9w2',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'knabmq0dhy3gwkl4y2vt',
                party: 'pfnuyfaxbb4os0pk58i85jw7mzjcgzdl86t3blg8puzp8gq67262on46z50i5sei77sdepvt38ak9rdz0f61x5vg7sdmebqk4667zdjkuknwfe8vzuic5lucnkuv82rm3qtzuib1un65m562eu996ti1pmsypet9',
                component: 'uy9c6pwcwm0067insfp8nc48e9qmi5mu70szjwqwfj2aw5icqdrgrjy9d0tat2m65sxhanne6s964ngxkpc6fmxbo2xa6b6d8byi2sd8ef00ynaepnpsmfw5vbx2rofvl7uxg7r8mryj96a28csy3pknojilur2w',
                name: 'l4rybpllhtz1yxist5duc92fi2ivx9chebnis8myvnlkc0q3vvrkudjjjl5k9p3cziytvre4xw0ih4ztrwgvidp5hvvr432jev2werc8q8ueyrpdma38ppkzkdqkdw73hd0a4bamiei99q24uxt66ovct00sywcn',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'gpe8sya88y6r0er4j6vk7l03n6nt7tcn8r7zubkr6ssovrelmqyvxg25xkruixg13caxoe28ux48pvpgvngzfs3btt5n44kqjugt6os9tsummtmvf4ny8cllekx6cnn43hqm8zor215wrk4af1f9h301aqnm0fub',
                flowComponent: 'v0uql87asik1j34tcvao3mb2wa6qitn0atj84ojp82te2phz5gsajx1cnsvmo3rf0t9ov7lhk4z3azfql05tpf7y38pjbf7acjz48amc0jxry19nshyf6jckptc7u56asbiay5mh02adg2sbt5lxdm2kebtofmmr',
                flowInterfaceName: 'qbq5tjen7ze3xbayzr3wxcl8ejlymbzmde6o3klf6xkzq6k2oekp6grat38neni27qekig9dpx74il3tuxjfzdl34npzcydh1vf9dlgqs0xijeuyvh5qkb4qmf383mp1iimngz3gj4psv7s2ov5cc91my9hvaztd',
                flowInterfaceNamespace: '3ruiwht4zi0xpmva2t75xorvqnrlnp1b6ehxx904kuvvlxh6pp618uvbus0dnnooi4h1v4stgrbh4ue9wzr45yxj0hbx6o5a243wxqs84xiegduj43ebka653j3gb9wupkibuicrcajvqbpys4hzsz7bmh5viu47',
                version: 'nyljp4znqzix2jlaolbo',
                adapterType: 'v7c0379295agz0gtllfj8lwboiytwdkyyve2bzirx1oqrsw7zsloossj4fb1',
                direction: 'SENDER',
                transportProtocol: 's2pq5nt0i99v0lr4yeaee0iitk42okyxemj2lidbi2hx80ah1014oh4w5ob7',
                messageProtocol: 'cyr52780boqfgdby94mwnarbku0gydj4ufpqtpbg01ra4o1ltuq9votnp4y7',
                adapterEngineName: 'bxeckn4jb8wark3lz3dq6f3sen8b4o8roe0t709in1gjob0l4aiqpkixe2l9am49cxmqq6ragfceta7wcvvegaz4bbmkqzqb8vp74wax2dfyvzzusg61rljsmhbbsx7knsw1rzdo6vi3lj4spvbin2kprb8uomzq',
                url: 'nld9gwpq9b7klhrxq26ks6b5e1cbcyq2jtxlav16m4i0fgdifp9cjrujtdjxyy0tfgn9lnmdezn3dfvnneged0e3jinxe3ycl4acso0foagot9msx6ijfqq3co4drtgjo4yjc6wa9q5xrn6irvwcoilw9875gflvtjju4j6ooec7ol3dgauw563jxapgm21l3f3zt95sy3gpubxbdqgbsqux1x1aj94wp7080axbrqkmo4by0k9gn2vmyahwznh55rs5ysiq9jsgk5lnka40plpivbv1c5t7l42j4j5ig3l7ggpn6s4rlx2d981vbvqu1',
                username: 'ppbfg75eztrpisqqfpfncnyvx7vkh4kg3m3a4en25l89z35hq1ds1gh710xf',
                remoteHost: 'x4z3djot0dsza0hechwo0zjy94uozw2o2rb41z8v6yum2pwmhsdzxd51h9z2xxqpoug6e22eqcwcieba24egf2qwz1iu9fzme10r26akdjqjrfw1hvuva8jfs1fg5sn17419cx5wwx6xoecze86a5na2e7pockw5',
                remotePort: 7512095883,
                directory: 'x27238sl24vy1869labrxyjkf7r87a9psup4ykxi30qoqmp4hclk1oy05c29qaisxdn7a5z2sdv8mj37lwe0fjzgr32jvbd5d2iwkk8hsj6w9sr6fkumpf0fxbxj3fgbt2bgx0e08hi8wclxink1zmt5iumtr5b2wmlx3gqrfpcnclfbt74x1f7n3lfsk0ol11bjsay8c5ex86vnz6ntmdn4r5vksvsikgkqnfyz2tzxl3o4siox6qopj5w66u6vaweayyydnzhcm7lpw8gttw40p45js6htm9tklxoyv4rmzgkf4or9g0ra96yogyiah9u8yfmuc56pk3rbs240w5r3hk6l1an0upcag7yn1q4m8kcuwzdpaw9pbkyek0sw9psz3ayh1pi7y1afvn7tpbvaczrshdrf4w4xh1z66vheyi83dpsrodvw9ckjtnum1mlxny1y0gooncf6lpfp6l6tsyzvbth7f3h0hnvhym2kn5v4v0h96wrx9two4usnjrbjnbljn130rj46js0jks0fn9xucci4nf4z4f0ejqhx7xgwppf6rm6mlosxz6un7yvs8dgky0qqjnuzv5o4upnlmgku38w5d3yy01v8a7htvdm81ttetvnnf9ncmccwv8vlon30m714ilgglus3odf6qwjjtr2v6crj2qt5n3j2f2v15iht9k6qurh0e04uqeqcq1eni1y363goimm2dofp5qssxkzt1syii98b2p6u344x9tyg32layihryeu7x7op59ppq4h5kjwt20xpd5a778suk83t214664f5iwcx4q65213rgmwrckgzeciwwtr6bknj4gtuo0uacb9lndyb3jto0cmvr860y0dv3zixu1o8g0chmjovxpfgq2o09eg68cu012p9vuz9qrfisr1qx9bdzfts823lu6368i2om76ky53sb2ye2tddxbknl9favav5x9ve5hyp8irx2klk7b1wgidq024xrgf8cv8p3a3j60wpasp4gkl38hdd',
                fileSchema: 'qgisit34eqsl48d9fctz22a401fmiwj7nce5b37gyxzieiulrv60tdg8nahfllzanq4ernz6amg6n2jwwh88wu499vj6bfw0yh12og9viznj1t7enn3jxcy4icagi6a053kl5whpthusd6qkhjm63b5o81uxfuqjm7qtnwngtvl0n6dauuby55o4g7so4rmtohwpywysugdzfb8ye621jf4s16flsqt47x7lml8p4103haylfgw7owagonnfb8pzd9cvq73vn4ougtkhp6v0w7gcybfy8qa37w2g7eh91nuhmqd1ftg3rnrt1d2in8t8ice44hl9qozr8nhnrufn5bghjgqne1vsms3s7vy1doc9koyxwknwv31e9jx052o4kngnz6pb9uoodywkx75nuaegvxazfnd4lmum3f5731fs51zfvmszvblhncftd9gvn3y7fulpa6bndnk2q70wn5ozvaovtap9n7losxvq78orq4ebypq0k278zucxgqvz5njv33875n386ga841ta9i6ib7zjf3dfiswabd4npeb8gfqk39vh4prhvwixj6g12lx36gkon6543lx6pxbl8msd4ysdddfetscmtdr6urhst8wwbugij0i2oqft14vxesqp97475iv2b29xh5w0g2fadwaq74l4bvsbw6ca2bhca6kr16e4wtoafalowrhq6g2y2b2vpdqgjj5n9nsz81khe6xsn9uwk9q4eab0fom5teuhyjmrix7i2jn0gp85yltyfaasiqcyt88eu9q0tn4cqcag64cwq6b89sbwlkdow3mtcbv5vu732weumww9svgayvxrr1el9m6gx02h1ag2mqgueut3qktx5ky37t3i5qihtpdnejr8jjsfo1le5lnjvp2vo3dsjcphornoeojaxnnq4a1s3dkp55utkwe35v4b01hk2k1eec9ao5szewycd1xpbjod8cm37d7pq0fzsvnb0h4g1wysq2et590zfkcl91dhhhrgv4r776a1',
                proxyHost: '0h6ytxnqladfq5vjroxqd7xnozlil4yalew3crpp36jzvj9yup4xmbi688u3',
                proxyPort: 9833713693,
                destination: 'ww12usdzgljxspxs9rwl79zrm8p7td9xh93irpzjx7wojsvwasr0vf2m3dexflujwf2lfg6y72rw0wjav1vffpc47urssneqvq1azuo3u8qstxi6sbfdjl026fbl99qesb9al55lqz2np7fj7337gvscnm2j1ezt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'bbhkr0qvpltfk77nh9f9qkyh1ulhtj1clsxfr7h384xbjd7wf824ks3ycqhhmrdumihjv47aafyxhn3c3abp10xd0kbaw0fc0nilth2m1r9njhed73pewkqialjx5hnoue2ontyewd1p1f5tnsdvpd6mb4cyavdt',
                responsibleUserAccountName: 'fkbqybjo97b3mt6zqoez',
                lastChangeUserAccount: 'ejqlu06wo6n2urzva58h',
                lastChangedAt: '2020-07-27 18:12:19',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '1gz6n4dkpob9ptks4a2a3ztejqb2bimfwdv4fhg073pv5hxe7g',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '5fw42kuecu7skjpwd0yc',
                party: 'qwaa2kh2apr6upedvc4qyeae25ioe9cojmxnbmal60m9qhlkdbfqnl98mdgxzv65exrh9gxvjs3q4sfz9l50sjb19ihbmpw0en6ic0aodm4jebmdblybq6fe4czyjfu91sxzz7voxsoqnook1qpmsh327iw96jb6',
                component: 'jvqs73pqqd3324xvjma7fxnmma69dx0z1lu1w63csie7foofxn3jjlm3hzb4z05j2h673ww4l0ywgqvn5eb6f0fhlzl9hzld2as4v4v60xcib7tz0a14yqt70r9o9doz7k4hu7o8ed51ci8zdf0x36eqtmeyzf8u',
                name: 'jxppq7pq41vkrhk7mjd62nbgcb5ayhhdcqfgs7jv628swutw6fnt3t2hy5p48ttpk38imibquk5c1ad9saqed4yble45yx99w5nhr56otxzyuoxvm53acao5jhgoxzzcj5pr0dco1lop8k46iwjtom0ubu1nx3kd',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '3wzxelsyfwp2p0u0ljuw376bbnug0werxyeruk8yw58ivz0mkzk230u8woylvqvc0qzo9xh06hvphjfrtibqtybub85zjfiypuozjg6tto4sdnudlr1zorrjwvfxp9vlkd77vupakt6ggft915g17abz8xlso36s',
                flowComponent: 'ih99ytafjfsedf3hhb2ltn22oee9hjpetikg6xnu2tt1d4z79eqmad1sfn57khkecjd6n69rad8p7stqecrcnj2xu9hprznkgnllgw5ihov5omjpkc045ajngzquu3u5zbgzenepf18upxmjkwwv0rzvzf56yg4t',
                flowInterfaceName: '8m6hr5mzvytyrse3oe43oq6binz77mf11oxvzz2d7ot43ebtllseyhp9ooi51ah14h72pdmauseunioiicc7tmffiow419of5kt5jop5jfanw9x6er4pv8fvogbhz7o5nkunipkv7kvyb7s2m7ug7a2nnw1sdjpj',
                flowInterfaceNamespace: '23bkm61b7y3egorrl63ca3r8vv00z4mfy2vg3y53mhw3wf67mdula5p6pkhebcrd95dwo46nxvwdgwj9cff3ehmrlqoecbahwni3f2suxp0qsph90p4h52235lrbortmfi502l2dgryckb8cbvaf8h7uj7lb4gci',
                version: '7xuumuaf2kfbucplnwwg',
                adapterType: 's500329anij0v35hyubl47o5p583fpcd9ycjxlo46zlkj6rc78b56tn4ihmq',
                direction: 'RECEIVER',
                transportProtocol: 'p86i5r9kk9r92on3imdhg0hkus0qq027eoa9n7y20f39slqa87c5nubw45g7',
                messageProtocol: 'mg6nlti8iwq46pj3mp5okhx8n1eann4fxwffb7hymm8mw6tx3fudjozupyvd',
                adapterEngineName: 'o6nqjn4cavnq9r8rp6i2vtsvobqopge52wg21qeqp5akpwswpe18nld9cijmasxuzcq2qcxr7e8spwnp83j7wnody8ilh30e2iczi7hbkukx8c7rdaul1ei6tft8wpnclh5bfs634tyqlduh89f6s1u7jv72cyzv',
                url: 'hblpaiw2dzveoa9ae7q6shswkcfc8odzeel8d4t36bip8ogrl4m1dnrwzygzlf0zch6wwy4mozmc2g4xzsm0pon2zo0w1hmyp3eamef11vra51m56m39otysxhge5csgpw9vgz4sh2tkugyr4fos6qr1cqzbadn39y7yngahrzrk9pb1h1tp16n2l9isqd0oakjdd0eiwfjhey2cfvw3bb9i8mcm8dtlcgmkp1c9r8fut1hheujb9fopl8d0mcnbybyydex35ep9zmy6qtamlkulpd454ar7w4s5tfbawal6xp54jzbn59n1mtka6o0u',
                username: 'qcpjapz5vgwlz644v5sy3nvvcrvzx10bmg51p10hae6pgfwsmy637hjl2d0cv',
                remoteHost: '9bhtu1uu8n72nt1liy6vepz4ftgku7yjp3k3es2ob0uxs5z9a5wgggutozusdsr5r08esasedtq8yctjoc747xuqtdgl5ifcjj646p3mjxgx5y2chlz9111k4411jqm2a3i5u074upph40g0ez4qeywcdutn9aq4',
                remotePort: 9297138806,
                directory: '2roc9wbyfk7ergw1zxs0drghoyuasa919tkb8vd1zfi5dpq6hgw8fshy78jqgz8256a8lftdzctb4013zgn9okjb46sp5p02jd8om6devxedcgqtgb81yh2rv2uf1u5zg25e127u6b8l3l6zulqj8hrlkvuaodsswdj1io6gcnc33tiaudzsgpya21q4n92at4lf2bwtkt6n735qw1vvll40tyemy966f1zzzbsd22e3xjje8m9py75w27xsyb8igcnfkjx8fcln3tp31xtyen5i53gvpulr81la7983oqwf38an0ij37vm3ygy0xwqf15iwa21iyxjkv5xuqutj6znnuulvqk2vfyqgp7gexjim7nfmf8f6kgj24fml1vsamj7tzftw6q5j963mootc5o7una5a5y3gyjg43jl7mk5b96m9d8zvahxaifn59xq7vzg49cqo7q9nu151t56h8oflv8ow6rwosj3tfwiov77w8upf31gpzd9npdv2lgq6mxawtoyqneuweyrb5gbvqf4qnlvfw6wrf73c7070r9liirhgw81z7p1dasjhhuj2kl24wmes68882i8tbfl7bf60di6pkcyejdjoqrxyw5k19cy4us08d839r8c8y3yr25mhrp3z7gwyeyki6gmdo8wpbpv625mmlbf3xtmd3cb3wzxlazofiev9zjxdcoae0t2xp5z3693n009tjzl69491r291dp4v3vt96pk86tfkomt6w9kfc6c12iinpfelbimtliqyayv4py9uls3lqqdlj38umuuqpbira44na762meb2jl1x2e4t83lqc2vc4hz2j7m70gfxogdje9ilkald4jw0mgxrv6zvk7hyt8shgrvaxdjn9hqsfbuosivyw2xutjd3fsth2gdj08bun37etk7q6hgcf3u0y80pu77jxikydcj350yy0g03gfom1n0blti1p3q03sr2cds1r3iy6zbs46qkhzdmkm9hpyjalr8dviqeolyexjt0aeri',
                fileSchema: '50ro7e8m0q9zab8nk5px7dlo8is8uayeha8ewlljfnz13gmy34ep0u2udxhkdp21vngq22jdw12tdnl9gvx5hbzoy9cm1qwqpngde8c8boxqv3b0m5tmsisq65sajldyifv3bzo4xc5u9980o7vg6jpfohd0zzblxzt4gap5no1ndlqfhh03pk6eklyb1dn15qljvh65i635vrxcaq6y4j3t2l78nokpxr191evhtoqh91xr3gh6527xslswrkpgv2zp71l7zwbuqtsg5mlp9ktl0v342bmagyjm4i04xr8zqsvz48idqrlbrgkw60u6o3vhym1d7uutfez0qtnv8xf01k1b8hmyug4tvvt9m5ihxy74dtmtg3buwv0yq77z1vykl6l0wnmtz0wkls2rao74opy5wcxb8md2x6v1m1960n3nq5j62u6sgowrblv5lt7vpzfvzmwia4yfmiaoh009sb4cafly7m46m1dflhl27qtewu86f218r1oh3ihf590qgmorf3swbg2ihhvi9zougfb1vyhl76amhcfjzs8ogj67f9cn6ze9y1lr48ve9aswvflrm5xula83ai1858jobvs30ntr0jd6s6qpqqwfxlq98pxsfx5967ucvp51n9zozx97yow4qs7ov0pyg2ug1p87uyw3r3at6lld5hxogg9xl8vn2caaqsqlpn4w68e3375llz82lyig70fzxz9vefcvkjf95yz5f9poix5by7ka256akzdhrm0xnl5j30ael91znd8bbli640qonr1prv0i31rf830f79soxiho8yd81a7dge361e7rb0tjcm9w1nlto1ew2wf4i1w3b6nsskrdd4lws6n0qq522sln44hs76xaqpy5p4y5nqftoa1jnywcdiy7a9foma60j4yukq3cgqztn90eorwzho1icumpylmi7h42wwzuthr148p112nedtfxu1lvwxmvq0bfi5pscv15gb58j9sfjy2aciq0g0sukaau6g0fyiwi',
                proxyHost: 't8rcl1dkfhq42jh7vb84tem3bxdgy8qlh0xshc2bcgpym9i6dgyjdsmo92yi',
                proxyPort: 3091145917,
                destination: 'nrmex9ntq0ip8i96zpw8hnnthh9o1hemf600s5dhon4e0btepdeyz3xer9taiez0jp9qctkg9wdmtf53cijwgk80i2ixb8buin5caa6bi54z361r0gpfil6j0ilpxtm2o50w7znojvnd0s61a62u80xamn0boab5',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '53xlcvz76isddshyd30aebq9yiwk6tb1m0t4trxxpyay39jkefci8t72xqnrb8c1pq2lfoi4yv3neyncs69n2ina0xy3955erj7ikx7ms5d3lhrux21ygcozh6sp3cd356p05xb9o4o6toycxs8y8ihxsvm2kx5r',
                responsibleUserAccountName: 'cml2js2ve8n2bcobgqhs',
                lastChangeUserAccount: 'guz0mzc6kisj249e0jga',
                lastChangedAt: '2020-07-27 12:13:57',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'h97rh0m4jdyrijp7qnw7yn9w8la93epl7748sdxcszfbuwqwcx',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'drvh73d0qy8qeq7dgtqm',
                party: 'y0k8ipvzx0jm8madv2mg5mly67iegdtyaopgh0rapere8o03nw15nz7f4xmu58g6jop3uwofbxws7ushface6vqb87fraal0bgb9xwe95hrqzjgx0uv0es9568d6hdmtpd0ih2xdbcr21e1wm90gt4xzaw3m2oca',
                component: 'be8cjpla0rmqk4qy1q32xfouj4kosfc5nbr5pf8zgs5v26wz5825gzo5ilu7xmnhoh0iehlplw476bgq2hyvdhttpyoe6gwx3r7nbldtaoic1u2xwjk3de7bbq7ekimphvkhxq4plgoe4hzigi1mfg16qz874pyg',
                name: 'm7cc4k0nm2sxfbwtf60878gh37v03619hpzbkqavrd7sdcez9h4yhq82u2nltq82xjv4adfbfl3tbowb8olpowie1jt2tw3zt15akvw7ak6bu2zvtpykwqadros8xosk8xk3ih5qycskpboigi1p8l67iyv1lefn',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'fsh1hyxdgtyyp2emb803fiar0g2j9o969m8715hs4rv6t7zklhulsa4miuex6jdupj74tsbk4okukf1ur757auq7jnvd105bdsw3pgu0mbdrfo8aj3mer5icqw8ipz61l6px1um7n17dmixuhjj5bmol5vr3kyba',
                flowComponent: '27zcrnxcxakqxqflq9y480rrfhc9ictgflotkvwa787vzlpvtg5qmmvbf9igrn2c7c3vymf67acnuvm1j2pjv4wxgk729nzcs874t6mtovwehe6kzara6k7vam0ikxdybt8apvm4ubu3k2l6bxuipsgrbza1flxb',
                flowInterfaceName: 'eeg6m4to0tirltsndjxhzssfydzr9euzrcvzh6yqrf6rdrwfdzkebe5mhgo8y172u8gk1ftkgnsrbhgvxj5lzw0dbjz1wwqezb4t09pc00p6a3701urkpxirbqyand5bu3akrt18m8f2f0lsugwimgud2yekhxca',
                flowInterfaceNamespace: '4ty61na3vnsd5meicd142cpqibxs8ya3khzbkfegbhjvldkaiz9uxxexjp4wcle3wdl7hir00bjmme73hkifuq39o78lk9x2afd1kswsmmdtttfnbaera0uq2d2fyv3pnuvylbixxocog9uyh6m8v56os9c96hzg',
                version: 'hg0g0toam38cj13sdj4m',
                adapterType: 'uqvemshns499mevn963mqzrmwfxjzv9394a4o6fm1bjo80arqdi31v0gtt4s',
                direction: 'RECEIVER',
                transportProtocol: 'zg9wl5iqqtt1ghmmlboqxfvhscaaspxaacswx8wfkalp3ejlu9fnni068bs3',
                messageProtocol: '6sx576lij2zsttgcwlua6i3dcdq2yd9vnttf5vhszvlslwos11rohm2pyfzk',
                adapterEngineName: '2r47ptd6q3yza4d9pdwwtljxe444rurlfk6dvogy2hu9qp7nap5xgohuzywdz6bl070v9at18zduzhri18sfd3cpsbpx6yxee8em0cj5zgur6b2mlkwt0giqmgvc0eqtv2xr3tpts7eqn1x3xigoouiyb1t1og66',
                url: 'kfii8n6i2w4st1n5snoo9hzhd3dcs49kugsswe809jq1967pb1qsawsgu9phbx8279oq6any22997anfokbayk1wxocshdx68zpa6ztiwmwn7p3wfpt4dhs3gq2r5f50youo5wj574oxmkwxgpc7mi3twsb5z2r15k08z4z4gu8mj6v0rjvj1eipuiaa4h7pvdtxnws0p53epqy51920efqhkd9qsv66yng0t0hdr5y4lc1qi3ecw2slctckk0ohc3dkmax3s04bf7u7hfa6rld7fc23g5ph39b21us6iso7a3edsg9jdtgiejffzc9n',
                username: '4p5djpv0jomihclozem744swvzwg2c3d7pe05hakzdpqs1cjygimeutz7anp',
                remoteHost: '2bun1sk8cx9spow1i90cuzalqkaq3iihsl5ejve9yrf9mdnlhqp20lv7wpvnth4n5ootsk08sol90qv4q4nvop0sxggsod206orjtijq9m7c7r58ia5jqe2906zk9begxrqoohyqldwugrfhc243l6ma6c6dij9mj',
                remotePort: 1345889129,
                directory: 'k1ie77ekjih0erqhxz2d5px2vlaku02sgba3hyqzflwat1f5ro1p57swegd0sxt7wkyaw5dequcr77mjpn3z7hwyam7z48ohw1nbg0gdevz42sblkmhemdfgo723pejpyklw1nwzipfze4c0yz9sm7s8gqjsky7opuehhuf4tn986hn0ierh5glnl2lhns7jh55r28z37rokm0mhyw8arlb3qf5tv54rwtor2cv4qikqi91kammkyfsaq5pjt5dvo6vokn4unh9t0g2ip2t94fupfd7ewdek96odmx5bvjcq9dp1qyo208tjajyjwfoqy4dle9k1p9xxqhy14c9pom85mfw5iitxzwdtfczzh8tua331lujgm1nmnxa2ab5obq6t7dg9smrvensmkg44ooa8imj218odcykkkb50i7ksw9e28exntu8u2dureqyc1w6g1hnaobect3m60kxb7qiizi13w7txk9s2yv135li4374hv3qjqgm47n6oa4t3uj14n9hw0pu4pwio2v3jhjp2ntfyl4ohrfc8hx0h9rw3fw90mr7d41ruplutdp7ppk368djtpqtgeo8wqnjn9ugdnhpmf6q2t66ccqky9eq95bc7kbaym03cwo090ptq73qe4s6zymbpqry1jn7yyulto2j39grmaww0gjcnunonfq8xfvzvi4fb8odgy6nrwv70a4ek51qriksjlf2frz2p2k4oxo1b6nz5cnk33f1241xv8h72x3j4ohpgxtjz6wyc36w264o2wolska8o2k5hwg8r66xz7tbl80ompjjld2falh4xim0bozmyentauykbw8j06vbd6dbz7nzb0vj14giur3fw8truq312yqb2eaa9e6mvdor8ixlq41elftc6fmsry4a2n4e0kb2ikwts9o50k4a3ihy28idlpm6pfla9wp78uzqltb7a5f9bpu6igzyf0vrtl8sornuvak76it9doo9ij7acdrsq32u0zawsmmhhluaf4djns24q',
                fileSchema: 'qrc0ubhp9d4aprod496do72oodblalu391vy5kj65kqlecl7zrlytoj7pdss8tyr3shuig8anesdjl6qnl43ioyqjfpp9wzigdoashao44jbt7m5o994xstqktrbewozby7cw2msplgdyzfekae9skukdak07glwc9dqiy55ffijz3r16j9468hywifq3iud6fgxizeblitw74qlb4xongp1l44qyxuzyg3vsaj7jijxo2omp8es8riq9q2vjj037m315ci5hk3fexjdj4u875ncw9vg8dw84lnf2krzgrj023ntrr0o867qbo28aoz8p2apx7o6fg4zg9s4eckztej4dtwzbcj3v8jyh7vkbtssmohi89ul2xbldugnmonacpv2q20ci352ga5xl0oq0wy5n5p7c52z2xlwj4s059vvprwubqvdbj9o9wm3ccuxj00ktbb0fekede7ztwvj1kuexraap8463a2xcplzyxykhv55up6vtrjwm76rl91c1upsdc6x6y3i72z105hkro9256jabqz7ex35pbraqirxoug0r35azzkd5m90bdc57s733829d97pllcfsmd85dotmedzdqysdsrokwiob0uy0p3f25902zzfvcw6z4xsghpayz2ka91y5cf1gjoj9thpby5r6bpy75z8g9sb02b2p9m3lyr0nmlmblhhizu5l4lspa2rhrzir4dc1x6dlemi5i5d7t9vffp360iefsvzvgtmpoot66p6d4fd84n4lhp83gxvubjhxnpzelala3rk4k6lxeeqvckckr3tj516nlov1eukwrwst1t7gjentyh92vje5vm3a9ezsy3fonvg5jme99ld0zk0k1y3b5ud3q4d0l6a0r41bcygzckaodur6b1u5341761xnhhel1bv9zo0cmify3x7thg43do5w04t1pe4f451f0qz9bg5bb49q95bwuk2hq1kxe2jckzpgcmysha8i45yfjy2l5fd2m8zws8vjlkuvacrzyy9',
                proxyHost: '34ou7caol25wlhjyfaj4wynmk6mfo26h2dfz64cvku8w9nbuqy2j6pgpoqh9',
                proxyPort: 7728920276,
                destination: '7afarfk39tenc9t2y2tsy5ep2v3g4eig2ajfgl6i1q8of56f49heb1br83z0tzgpuwbykwl1m3rb7il1sodai15pws8bfj1o98uu7jtkecvm45v8rs73nsbhlbwqrf80kmegss2ryrigf9a6bba7tvp7amzbbff9',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'egewl2auivro0uu190hxjusrpj15u4mhaqxv9dapf9npzc2674h7i0wlsxqpu91m8jmly8ee0slibkq606xwgf5qtusngnqwn2ea40djnjp50jf69ht0t2cnldwrlis7u5ejhwon3gmrvp0n96fv7us0qs2rbull',
                responsibleUserAccountName: 'kdy2pyl8ln55x7gcvzny',
                lastChangeUserAccount: 'jtpf08rrifxamavgzp8v',
                lastChangedAt: '2020-07-26 21:35:13',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'eh43ksmqreut8otjllrgleock0uuetpumsqqjrox8zb1r4jla1',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'hr8hmoczxxos8fgp68jx',
                party: 'db1lwzyewdv2kjqgykvml23oyv81no3vih1r368nq2ncqnwz2dr73qi9v7da2toocr5a485w2z8vppdoodpdyo7y4vtkhlusuyg7dqm7qbpux0y2lzdxn2wtx3foe7ztpy3jvnj4n5ca20tq4ubk1dztoggwnk2f',
                component: 'm389xe3lgofjuna7xw07r8t7o7po8obymltyg42xxc8s0h1tq3t70zk3m4w944cr6vcun1lj879vnmruaxkew8ner2ny5mmkjrzlzu8jg26b3jeb0evhv6memidzv41msypm963gr4zntqdb3woqn7hw47dd0nv1',
                name: 'l9x2lrbt2rdkhwrq4gdo1y19325h3389wcgy7q8a61bkjngdms41eoxdrtpndmkh03ko041odp3c1q2tce18kvn1gyovjog55ikrmgd4v194cb2ac0ffvwnvmz7x8c1tn8no7surlonhoi75yk7k6dvjsvlseson',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'yqtvq1nodq6vfo8dnlzjojb6tpmvtq6s3wat505rfhpjsm4a9cstz44zy8b1eww83cv840flx327usynax7fc4afy9wihor0u7h5cay6vbbgjwutm2jdhhy62lqz71wv4px3ey9n9upgotc0403qjvlibtszaapi',
                flowComponent: '593o1ys4kgx22dnf38o482l3akldmhiuivtf3xi80diijwxew7i625888fu3ji8imz1og02guf433xbgqn7386cfne3oxksnlzxnvejrc5szwqmo4jhss3cnwudz614e3r7dy2yvonrv3n0tabzergswhf2b5vpm',
                flowInterfaceName: 'xr3ofjq8bzigq32eh61r4pde4g7y9g4xv52hl1jlr6wu60ysbh73ruh0i9hrr9xamvddj61rluirhah9ntj9l2awgfgbx2ulxjn45i4pbtdc13nxgliyfh7t7fnidxzoonjcx8d3gowz899ljlae6os73nrd3fm3',
                flowInterfaceNamespace: 'fskn3vodg27f8cjb4igw67o7ix3cw6skom9k1xe8p6tcltlhsj13400vnwnwo64b89or8kmbs3h3m1nspk46pkprv0bvt61epys373jduakho630oljh408sipxclqujf5wpo7mt4zv4sydbn96tqlvgfkzm8ux4',
                version: '2258hwkm47im3429hlpz',
                adapterType: 'gm4mgeiem09l7k1pe5q3qq09k68g678xa0ynleuhizihlw1akcve5kw1z9mi',
                direction: 'SENDER',
                transportProtocol: 'mizb1phc9mrd4heju9vyr85h0ofh601ie2yu2ricqjs4zz0ux5wa528uboke',
                messageProtocol: 'raa2eiihgnoddczj2ep15v4aocv97x8v8tex6q7y8hs0owpociypw5taujfj',
                adapterEngineName: 'etg2x4ik75s9ylz25gdn8530gvu5tdielz2wu1z1w5rdt1ziqonthu6uxuup0gb1laa9ge69u3smxsnth0mtuszkh8axd0ksgcskuota2hboo88bsd1bq6hrkzwb0t8penuq13chx9d81cmfetyyxm5pwtwsl8x4',
                url: '0pz9lgms18lrp71nzele4c9lrbxwxa6rukdwsf33nalgaln2okbzfsa9lubw0w9kgek8ukexdg20ikkq6x8k8ik5p1g8er7wa7hd1d6o60u44dn8jh9luhtz8xbt7f5iihn6ijf1lyrm33kqdh6il8bqh7u8j75ufpe205un46j8gktdpp5s75ttwhrdsfqrtqpdw9yjxsc2x4zr79hlcsd2loetc71icp76iwf83208yfi22yekmd81f7gcmw4d2dob0nmey409pzv2xb12uoasbu8rmjlphirru82ll0pwch1bo5yths88xkicujuh',
                username: 'eicgfz6yo5pdllqmtvpcwg93ojzg2meyg4l5ffprx9rbdlz5a3r5x5s7scew',
                remoteHost: 'opcksf4x8trtjr6m7x6550pmogkqhftwirsce92tc03aekdsfimd8dxx1zpohamw6pinukp78cke5n6faphs8jeorsiykglxkmef7a42tnv22g0k4l39ktmi4zvflglwuna3o38svc0r1zuysai7rtfztyz2bv50',
                remotePort: 19237929873,
                directory: 'hn2pgwmibe0m4z802s9m6eqddzamu8ln252ocoaaw9neiv7yqtm91qaptvcgyow2e9tihtp1rsw7n1jehpzpcncs10261b71bkfszdv0xhk40hyt2bc7ubfv93b1a4leklakv6vb8hzw8pikkk45rmo5ifgtc35fbxmwkqypinyfqoimh87eeav0fg765gs28dvc3cwcmd88c4wbthgbxh9xu44dxh2jv5kca0jtjnxod9cpwaplv7l9bi52vnek30r2s6s4so8xmn85hy7yg06ip1bbeqap2hhax3dtmx308qinpi93k0ool5hzepffeq3czb2mg2z5vifge3i0vpfwrcqc5c638mxoaxg4w4066yafp7fd09agokdlifnpiidsmb479qunhc90q8830xkzu7m3goeivbi2lngox6n79vgxb43dgutxq48x94pxd85t2wo0dezwqpb0fcyb2ktz81p27f0c9gzthqo7z4ahrtr93cij6yo96ic0ovpt191rfeqvpvxeiq6bnc0vamjo3qcte1bao3e0gnyp1p9w6klcnnnuj0qthut5p4h85riu7d87wzyii8orx5myx4gqnps9qi9ro6m5ogeeq6g5s3heyri69wrck9mbpykgvknyxmyadj56nhg3b1e9vrek18wyq66fz43qyopwgrdj95pag9s8l7hyq24pesisw56kcjs8tv9ia8yqqeq38ns9xdgvjfzzkvmn911lkvcrg9rzjcr4ks1qj6yd18uvn3cvumt4v9bc91nw0r2k4otq6379eqyfei2qz2gj9h6q878b0xpzwpkvdtt143efz68kdsqrn85sldgzv650pwhghp3ng9ms6kkqpgscl10vllpexjsdjojc1hfnk6y05xk8jhmygjtbumymntwgdc32sjy5yy8mnby3abozui6pv6fpg0qv8es8ypj3bse6jc5g9urytj5ytd7ue92wh6l5066qhfddb6mkqe63b8wvkqaf1q4td3vmyoibuy5s',
                fileSchema: 'hgjfjqdb317r7tnhlabihnqym1ra92dz9h1rq08jnr2wpkp1lwj9q30aql7qyzccvpaqajy4g7duqwngcxbit0q09pdkgp2memlpzjsbjkaw9y5o25gmdmwo83dek1vljkc6clasy6zhiey5qqvvh8z8syrut0wel5n7suf17nvd46p1on4kelt4vhhdqdr1pit5edbjmj4lummsk2g6gywg6ecsrf9zxf6u655b13h2e31qrjml2jtofro7vet8b65dvaawk17emc62i7499af9kpz13khi8apx9f97e28tq30px4r5eh2sk0ond7mwkncs822odl9g76k7kacmg6c834pho9opbquwmjohugy0o898mr2ma5jpygduo75kzhd3e5w4idwkd6eq1i8wohrj9z6if5d4pjs9eu0fm1bpq5jkvxhh6ue4w8u8s70rjbouxld7nxc655131ng2cuvcr48ttx6ky4po9nf0qesfwmqpv6n4kbunfl782ekeg35nl2senfdw8424fokervosnhp6s1dwo2xms71dr0a3xfzxwhf253p8oscm9g6j75lnmdcmdgd8lfm20rjocc7sg38vb0k0uivayw2uowsvhh912zc73zvtgd84v2aoecn1sv4st5wia8ykc65t8rf5ofyvskd0kvh20wazswlk1anu1viwxibpyp12ijeuxbxl564ago5sxaypl3vlx9gofm425rwfyi6769mdhr4xq6gpa55x9xc1bgyhnq54i93z895xhra66kkyjp74ypgk36jfcudfrlammm7tjosf2ltbuc87qglkebhpxhptvezwh6hqfqj1n3qybr2m7b0tb4ijhdohx76phqup6juubrbdkel7svdd561vz1qtt84i97xefpdwcvptxqactsyw7mp0g1kvfz0ajvd8ko8jjmd3j747fvnjdufoiam8b6ep5bfv19jp6ecs3qd7vwi9rhe834engobopz5ysyjrmu5yk2qzj2rtmnyu3w6k',
                proxyHost: 'rb8d8c058xsl2v5ovino7z3reuwveca1k40icp8yrxnuuoh5pjjcdwndveht',
                proxyPort: 6355072942,
                destination: 'mob1rq0trxyb4i4cufvy7afjhigpsf0i6pdle5k4penx7ts235a6i7p0y382kbzctylhejzx2roje16wd3gqz1n0f0wwqzmrdbc35b190nheyfv38rk4u1vq7yqfkt1od3nhg33l4wphto23an6em6njn1t2c8l4',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'izefw7jdlveafq9u5tqfop7qhg8dbajeik377trzjdjgy60b8xe62jwzwprk0545nraft9kq4dh2ac3nqlyu2f2l1id0484j87fqqo4ezjc759wi0cvq1ae6wwf2br3rw2bpysvltug3884c5cb3e0kg1ucteyvy',
                responsibleUserAccountName: 'y10epyajbras6ivvd6he',
                lastChangeUserAccount: 'i3bku6fgc3y6psy31owe',
                lastChangedAt: '2020-07-27 10:16:44',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '1a64jajwsl1hf73xbbr2nupz38709skfunzxxlbp7strmt7j6d',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '31ji5ool3xzj9tngq557',
                party: 'j4azdu75ua11u5g9iocitam1phz1bwgl1ugavmhvn11926sj0oedwed8pqmfse839ld6emi0jqj8bkb4xvkllht6l875i5akddfvv3q5ijee83ka96t6k66dceb5562ubv70tkhypb3fof0jzk2ghpp0bbnh5sqk',
                component: 'zm1v75c2whfdusc8akmspgf60jobc067w2lnls0nk9cj8zqrwyu7njnfoqawrm78812g19quvhubpii3phx295nqy6e0sl8ifaf2z6irlmputzjv8z1hela0b2e654oq4uidwzch6lfzcmdp7w174ao62lpqxmbq',
                name: 'n44p3o9736i7rgsit2pip9gl1vc1m53u5bzhccfktwifulswnchpkb2vgbl53ggz0e2dk4ja9yozxl8ddimh90qk5gxn0jpqn58ijd15ivmoepse2asffo34dvr1gdwjjw7ennekiponudz8yl2wv3brjyfqz8yn',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'mtxsj6ulm5l8lfcs876rqs1szgr0t2vi6h8c5bpdfztnm8vmgo61q74o6gc8poue5tnf8yf9i3x9feg4w2reb0sql2fuj7jheklja0uo73wf0ii5c4e25nuh3lx5ibwux224yo041bk9fa2dzcdmnjfis3kxzxrz',
                flowComponent: '2v9n5wh4th99rh08yd3mphr3mugakbj2ebailov2816wac0asxsl82qft0b3q4a1r075bz88llzzd571cls77s8bdgtlzqyq9t0lmb5flazbxzxsd2g7p2omij8lv44iuw34ldc0q747qy93h0yom2tv12fmmzjd',
                flowInterfaceName: 'mwknnli8p5h0lp4uzlyv6sj70lyw29myamk48pi8e9g9i4fh566423nlk1s1dbkdfu91bpcmi4742m4m3mfgbee8drbcluqw7t4o0k7ze4rhotf28htbcgfbu7sltyakl5aq878hf2hlz7kihg5orsdzdnhmcilo',
                flowInterfaceNamespace: '75s9roz8ozwpxz749eu62vcdjszdvo8jdm9if186flwpzgqcv5see2damkrm9hchc0rdjn8awgeijus1x0d202b404mdi24x7tq5ny0qr6zni9vfr6k3b18pjbgx9psp3p0xan883mxr38oldikkykk0ro8clhmh',
                version: 'r0qo86dg82r180r7qth1',
                adapterType: 'sxvbilgmy4d64y5frcfiwy051tf7zny3c30c5wbx2uev0bcht8cr115wa4bh',
                direction: 'SENDER',
                transportProtocol: 'xj0ehyv9lpetyl4eimnww487zwijd5zaa5jd09fvm1byphqp7838ue0gaafw',
                messageProtocol: '4e7klkldda90e069ffz6v7e0ybvqr58dl3dkfs43akobj0wti43bmclrgm4v',
                adapterEngineName: 'w7pgpthudl38nctahzultbtrcin2abnevt9hp03sm4owsvwzppv1whwknappcjnbxq0rtxpcb9v5jlkej2ub50av0r2sym78m6y8ohyekmbpi4txlaatb78r2aler7ewhwma6hxscsd2trzqujqreqe60b839wfb',
                url: '86l734vqv27b81h6ekpyn2neoog3gbppk16dztkh9ldlht7t5d7pgqu4yeg80j0mkmxfkf0uz0ly6h1cmikbbx5wq8e2fe1q0afxqtrsesxth8oc0cwnxhrxi1fw8y7vkal5ltt1tt1zg8tt1okeymc8jiwb6f160nwmxkwqwmke4n5cf5xzlxhjoasv0s7onglnlrwgk50van9u2unb6o9ag8t2m1gkn1ef02ehksco467loii13ebn2iyf0br8vjncp1339vgxg6o9akq2ail138v8ay10gd0y1oiqxtpioqs63eefdg9md7k1qjnm',
                username: 'fdswfk37cmynl6yq4kl8hlxez7hlzntoob85da36yldizr3kd1ws6fmntez3',
                remoteHost: '25e1bapj8fhwpyulkhnqaj8iqzfou1qepyoch76o028460rcwxliotc01xxdmh1r0ccbermyzldybxlbf4ufn5uza9qg89yr4q0rt6599jg11i0rpwgba3pioz7dxfzbyc82gf0mak4jijbm40vuu1gfgga2862v',
                remotePort: 4191546807,
                directory: 'rtw8hdydxzxj2xdfqpt1wf0p1004uj7ykfozo0jnht185lrnlmsl3czq203fhgmqce2a4bid0b0c5ijf7hu7yd5bhcqgnmm3h0y6mpxrzud9ik8gn32kkj7vu22s62efvxrt0gearwuqv3a4qb9ubrmkg8pf1kxphy5a7yejyi8htj3igonhb76vny2m7tht7rp2ykasnog1tc89gsi8qk4kv6w8yto0c5azru97hq37s111wsx467015lyq49ieleseo1brzt8clftyqvnbwhtcg0j3fjn5006g9syhsz99y9jybmoq7mav42l7czb2xqjwldtrjrygkj3jv3kv2722z45n8zfwfea2az7erycilpc8e5xmw0g0gqzd19vy4xy66ggq3zmtaslrtyk8w57ekliflenq60lrwel8gv0jnw0wsnpoovvufajn33o4t93ivrlhfdbfrcf0647qds6df7u1itxlthd6249wwq3pcn1lqfa9rqafw098c2h8srgzoruul5ynxyrejwq6sipu1bclpyku2bxhd4l0q26zx8gdcy8fnx8744g54xpwqgt56pizfy7yiovqtp3l1au6an4h31ux8p5twbjxjskloxht2cn3tz60t7wt98a5yongi7p7zgy77ypipkov5cm4krk9uftchz8h0n4t5oq5npvz9ougje89qxibzddmbuuhux0i2c4ya6k5ch8set7wu5sqgcnj1016arvma2ia2mr3mvc1le4gewewtnhsrpbz3ucoda9zedrowdb7quwfnce4k3n69q3vqydotvny4eac3nnrwapatwi6di8mqhpxa949ejbutmvwuru27mlast3u7e007h7dy207fv39fzexypr8tyh6dnpxebyw33fxghhn1iog5am9tsddf7shyjp3g7pvy2d9ff2eulhk3k2409z55ohdbsgifr123hugsum6jlw28rr5a44i5sfbpiln4qipjly2qdfhpd6nunvp87rk7y237ebvu1qfn',
                fileSchema: 'g6ars7nge7pvnl24xgzktli6x0tkbtnl2fhu31dvdgozquxpey7p9zigfgy9eczxtlw3ho1hrfr9105rxhn4os4uv32j8kmoqnnc0butxmbgly2o0sysdms71sy9zj8efjvpsj7xinbjzabdqofhyrrhppimmrbif1ksu40m138iwj6icnhijlonxpfma538ilpknvsvwlgk29mdjuigly8gkcs5wzokuiwd7by545t6v9mrmvsnqfl54g9ufmpernlghgw88lk0hbcntcehz39fbbbh32z9xef2jaot6wbpy2qcp14c6st87t0vxtryl1zgqbndii5aszlv8paryn8k9uzv9u5q49q9dq03gw7wrdo12hdfgdkl2odbr80mk4xo0leqqmcwtjs1almzjrnb04xpk47al6zmv1vywql83bpj1nrvbccmk654nv2x7365gws6vi5s606hzw5m1ejvfxipqk1s5hf6dmtk3phf8d4kdpfndww13q88o2o5na4mxkkgpq2jgv6ln8cpjzz8995fw5lvz5iiml9a2dwhbutl8nm5ruxylfj68iuwmu02zda4htlsd46s6nzk09dlocnnrsethp5x1snl4ralhlwdhu2ivwykhoduqt6ef3p7g47xhbuh8v1mon4s646lh94f00uys4skexw6tos0m83gboav63dr33yja9o9ozehyqs95ycxdblem3l2jpewfpwshqoae6wwgrcum9dsobtpji70etg2auy6fzp3c7rlfqj8x22ygxn2xb71qav9qrzklyfxdz31qaq2yssoe3zsp18pd8xzkz5qebtlcqz9pa4czaq3fvr8pc5rklppcg5drwoggb9g4n0wkr2ugxt1ttb15zff6zyylms10ohez1icfv89alo79pc6qxn1iqlp3xpq39xfs7f880ujzf76xnxa9qrufu268jc9tv9zyiwhauyb7xyhj5v55am8sf5ibnuwhrlfcjkur5f5lzdymmpp3p11n4hhdvp2',
                proxyHost: '4y6hsf27ducccznbaa1y0flilsjjh6os660pz9rqq22afibptvjv1oefsr76',
                proxyPort: 6442242623,
                destination: 'q8ltozhn54duvm0217ntwa0opewh9mrlk0x3foxs2m4yq72ywf88uem1g3dulizm0txkv8asnoung8mvxb7lrml9pmj5g145acise3w8xo1vtzpt3fl8wvlltopjtn9shupg9hn6fmnrrxn1c69kybjy9zqplc6y',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'q293zq93v2fu6ldjolepgvyv9qdg1zc7q82et3ecpkxok74piti0dpayayu2lkueqz8169ikym9p8nohk09cap49ok5zz0kvdod37lo3mgwh7bjeae16tpm0oylrlkq6ziw5h5gm4olwdjtcf4pkd11uzaqa2s9a',
                responsibleUserAccountName: 's02797j1pnlf7173dp2d',
                lastChangeUserAccount: 'nbkhvyh43a1lswyka0x9',
                lastChangedAt: '2020-07-26 22:29:18',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'xnrutxvu0f43sbt4itcwbu23xd9cxfxk2lidddzocpb3bukl7e',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'lv0rls0kp25qp3k88l5v',
                party: 'p6isq3ud2v4lmj7czmp2g5wxs72t0wcqxv1t3xc60kui744n7uurr6nkeoh3zhra2em7b9sv7vvtbdf5mvda6ws0o7956j31k4oor39uv88pxa107wjbr6y319cwcn4jierp9f84m2nl3kul3a5n56jvr8y3d4ss',
                component: 'pzbhw6x6elip70bq63xjt1q15qa98rqt9a9o7qup7yb57sjd2qrlvfrbopob46wzhfvs8vtpvbo6gfr1tbehyn8yrgfchc7x3rlfrfqfh9joko9lau46vqrzbd101kkjydu5bkgecjob6qmzxwoj0fhfnvt1dmax',
                name: 'uysdsfd8osvoge9q75ofk4peegdzg199spugbn0yfkb74tehhwgyebwdjw78xm4jbid6mbuc6zshfvk6wby5kvdovpbenznvbm3uydnmi70zylwhdx57x2rogid3xb5de7mv58kmleiapuca2jq4rgmc7rborhhe',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'bn59zl27kvw0idl2acmma7mear7y7u68rtruj3lkja5emkouqz00njpiggy246wbmusox1od2bfd3bxc33nxz1o6qmnnkug99yy7o5232hp7yu3k4weifmfuo1rgfq8fhirsby6s00dhzg98j1hwjf15vmx4b3kg',
                flowComponent: 's060p5sni3zk4mw7lr51bcvd9gy1uruyghj9njjij2g24uh644zvjxhkrnhmepw0tbp8m6dt6ljr85ivgcx5vio68qdj3yr81y8r0kduknkazepcgbaaaen1xtpcpctkumorov45ktum2m3buee7y3e016qmuu4u',
                flowInterfaceName: 'qrlpvniy8qd2wbl5dv5lwh4trbppqcikycj8zvpqqf60d0phd3siq3ib39y4h07fhmcm6ha79enxqf3x1syr480iefn4j8khh7gueajp6tml123xcym75wubd8ruj7ncem6l0ga781ncduxpwyimrnp6odpgnyma',
                flowInterfaceNamespace: '4ci1b7asz8xnhvst37idk2v9o3rybydig21ngn89v7za2d2nnjsp1shonghkesw6raqog9lqxin7y6r6kg65372zz9ngb8dy7l488051hq4igvt273o2nq6lzc8lww7u4vea2kpl7h1svzm9mp8hd9webzui9o5h',
                version: '12lb740nxglpupfu8hr8',
                adapterType: 'y8h3vm51dfk0rp4ce0epefgauawvzm3st667rc4jcxtwa4y4ad7jwdx1vpdq',
                direction: 'SENDER',
                transportProtocol: '163ybvxahuqka8qrn67u9ohkh92zagzc5vhffczq32k33nng11vccojthgn0',
                messageProtocol: '9b58x9hpjv4b7gsdkaw3cutno5tiep5poewevx9m9b02q05uhtg9yl34lkm1',
                adapterEngineName: 'zagcjkkx811jbkkrmeprq7i3inoauuogjs23fiqw9x11dh1xc7or06koljufo8jwmy38mwaeh1fl0xl9i4xz9ph00l5u1xlknxjjzvf0mznh21b5zngws8m0058njwll639cmk2qq65nmicd1h3zxsjllxjzhga2',
                url: 'jee56yzjny6ln6dqgiv26d28wl6eo6xzkiobru5mnkke44ze5860gjku3ggu4228x276nkcqi7hq82vkmvybfitm80qjir7i76qzvkobm8h6i9v6s4ldyelb4cp0p5794qw4i307erhn52qmzn7f3i36fpeejqkvtddjrhl3em4vbq2qffdyeilcho5rn4qgxwti50697676timzijqu23vrq9drhsrrlpqqqqvzzv85w9zlm97xmg9p73281xm5ei25dheqo98i9chwjwfu1xjxp9d687jic88bze71wkh1xpwc55jh7v3kh8yjejwg',
                username: '5awb8hhebvddaxwns5las0nhatjcmxq41nhz2ynyvuk9m94xceepj3jztfwq',
                remoteHost: 'wtkj0tsqtib37hqzjdb4frcdclue79pxrp8etsmp53io8uoa5i6otpw27a94zzh38n68hp2omvkc0ag16lkb2j1f46idyckbt7d4kppmviuo1ckh53v4i0uuyowoeea0s6ze38vw4a0boh4ptwwxcwwoe4bonb4s',
                remotePort: 7053189627,
                directory: '67tkese5vl1d4s6r0fgq3o9aiyvw3hjjlx9xq95pffmz7inz1aqcepqxxcj41xpl5u6epwdgx846rvookzz44xi8iyupyhaff0ue8ha569nhxbapmlb8jzpmq0l7iwvg64ziftkp71z44godju5yxnaexumrif113tqqvkkvho7piylyboipaog84riynld7lpoqik2muaxbxyl4draumrr4if9vzughmppcu0aba0zdfndq2orp9eyzn8uecc58q8twr3znrhzcmnkncq2w1aqs6w4286uuvah18d57yti6esacs1uftopqje1mwbn5yxktyypettqc7rk2d964rnynw4vp57msz1n9lvdfkx1eysh36f7dnje49pcodu6tncyilfi5czexcb46d8289fwyyy69bdys98plr413ms3qu720wh3w9tly1pfjerawo92czjst4r1snbyg5ynor9u3dvlx8flxux1sog0uin6h6ja57wczzrqo2mxtjwoh7kzvqmp4yn9ojt93ey7fjuek11vvp9myc5042vrx8r9ukuhn6yvtfmus7ef3l90q5ts8xrz2hc4bohqft99wpsju1dkk4t362dmnde9igofwztn18v4kbcqd56gskgjd5njxmpd9rrr3n4eq8nv8lbnp8me0bo7fb9p2sg36cabxe6gyj5yhyorl3kt2xjssgmzk0krx3d8ifszfgup0a9hjjscmdg7hhpo9lnet7da8fap4l4f2wog67m7h51x0q9j621qosveq0wihxs0fo8txl6zn5k7e7k0vuvd0g7mjaomyxfdb3zes2mbyncwomi4dcvq8e0kyf0pzas1s5vesimrly8sgiapiphv1idrkmgwoi1ag4pg7og4bimu91wta1hns0a58q1qrrwliilb0jc3t98utryfa02kixf191xy4ghchcya59g2x5qtwhzwtoa5zzdgii1ff14lnowc0i0f8kluglbl1d7uxr8bjnv2o6oy6ep35llgnfyfy',
                fileSchema: '3tb00nmaw2tsyj473m87kp2yquf222ructjpztvkargl91ioy7ahtsbikhosfjj7xvj1ksvv8j8732v9cb655bt3at1yfoqa90xtquz7mlr5qz9i6577obohgh0z0n08qfymtzv3e2g6wfh8sv0awf2wkl26iaum5gwr1p6vrj6rjzj9yol2zpl90ngctdci25dar19bm14viapw3ce0lrd68e8wbi234xr7b6nfn9ks4utgnjl0dsycxbsj379mhplgi8t3eudbhbj5gttwxhk5tcx8bta8ss7n43ks99bzyslvxg06esinr1aj1preaddwuqemnmclt3giy4ng8ob047x6olqg9w4fplfn3hd9srp2eel71u48yg8w4jmk67f8kw5fdwlg9rzwl77fhain9zgsbsxj8hmc1i7jawhvdqi0b2mfzuqua474onmg47wvo0423aouvul05zmjx6q0a6qd5uk0dtzcwzm0jovgnb5mekgztsnzqqxjk3f3vofyppkxh37tjbte3vcorxn08ja9tt2xzxeplrv2mko6ie53trf00b82n0da3ejexexik9ncs15ut0y3yqnh13fxmovbqdgicxs0eogs76sq2cqeooo8q4xi6zn7xemu22563n9lyaphhstuvianhqkcc2zo0567j6o29bn86wsm9mtw0hwbhswra25lt5ee16irgj3iha8rd3fbot71zm6uliqbbq5cnbgn4jg57enk8qs0hujqlfhhyakw131ltctk7xrx0lekdojozx603jz0vm4nee11ir50qayt8oun1849gdhcqbeagvx0w4con27jtxka84wqvh1xglcjmxcw6z7liht8znvptkn3q0zh9o3mxt8t57hm9yhxbumde7uequq1tb7mki4v0ivzrcg7w6b48627qlzujyerm3fzgnowbtgvji6amw1mn9ny61505f0iqq2d1mfkeafz1lgi5vi4j41wo3xz0bzejq38cu6tgwrayuoxo255b9r6s',
                proxyHost: '2nohxi783gc106n36r9rt8188tm8vvfs2eaqmb36ekm2v933oltofhn3wz6v',
                proxyPort: 7813718322,
                destination: 'qovmvagf4c7iq9nz1dezu5d1n6jrhigqerngiutjxnu8mxpredl7ousq8v51bcg2m5jrks4wsop67c1tposxtxwzicqtkxj7zsn84hcf50hxl341bne9tnd2dxbdrveyzrz9aisf2xh0c35o1uny8xlu01s3pqdi',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'hy2vc8c2pw8enbg1ppiaiyzqmsn7k7k0jpt30ha49089igwrzfe8raxle9dhjdrb7nqq4ur8ggddpjd87vmmqhc55i58kt3fatrgvjzmxtreg6g6ik7vgxpgixeeg1gt1bvz5m50hihyqvxgnssue27mfktw72rj',
                responsibleUserAccountName: 'kt596p2vvg5at2xswp65',
                lastChangeUserAccount: 'oghesfdp54alo9hm1g23',
                lastChangedAt: '2020-07-27 17:17:13',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'ohso66g9ae3dp0tqpkj8a9tiy1xogw4rnuaxq70jnwhwl1yb7p',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'sj8hd6kbefcg7tm46z41',
                party: '8usz1yehn0jc9c966q6gm65juhj9up3juecf5sq86slhxe1lqce9p18vt66rdob0g5tivnzvu7tms4i2x720oyrcgc7hoobncev0fpc76kvlmnaltcrcfay1mvfiiogp3whvf49ufinhhmjxgr408wecfkq732rv',
                component: 'yy4hihl0czbnw6plbq5xv5ls1urjsigene55kbhqf5bdafhliatzgrv2i8rmdoxpxv2cjj0h9ww69ehe68fjafw8ns0dah893ab7vr1epp90vh9p5meexw38c5y6zf0vpehmsm56w8epdzdimr9zjss8feptsfq5',
                name: '4auwg90vyr4r49yg84qmpp5tsugx9svcgp4tn29yy27p0jtfji48k63oo3fi30x3cipa1nv29gx137gr153gegox1t36qwliawgx2io1pfwd878o8tiibqu5ilc8edgxzxzjhxr33wxawwahepcrboym0anfdood',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '32i21lt31q1k4qqoyg8ugyfwznv77eqa4q5gbtj3lccd12f07sncg0obs8yrhnjctqmofiagquxh1z3koaf4huaq3idamwwbfao0rah7kl3v4rd4i96m22cri0kfdd9v8xb74nxin8tyoxaa6nxm513oti68cxoa',
                flowComponent: 'n1keb5gxhb55qe4afje10c81tibentoii33st5yxxd5iqutuqhxh2ytopg4sl8aflngfbxiv0wgsdivkq3681wks8uhge70ifrmog6pd0cy4zqc0x9w29h2z30gyu4wo3frlgtwc3ggo7ohh6ij1rs7u5tnip2c8',
                flowInterfaceName: 'ghyrya9cyqciesq10k1yyr3p4lcsqib3ko4m7bskrbgcpzyog55w0f8sargdah29uc6xx2jxo959i2oh7c2peaduemlysijr444qcuu6k4hbumlqtfyo81q5w3astxxemt7x3cjzp2qfngzwi3chpph0uydm4bjw',
                flowInterfaceNamespace: 'edmdcwyyum738f7mtroqbnbpfi796k6bgtg3abi6azrf8seb798klf4ip3konz8hr7px37349z4wosn6ardtab3ibb487amedf1g1xj5mhk78rurzi8k3mvtjuv5dwdqtatyli1ipj6l32dpivvjwv5p2xzgevf9',
                version: 'q1qwzpnh8v1bk91axa9b',
                adapterType: '5990xb8dm7kugb2ygxhb8olr4w36j39nycat7gpd3hazgj3wukyv1npa630x',
                direction: 'SENDER',
                transportProtocol: '33dkndwao3f8vpy2dsq24l1eu51pqao0c6p4q24in3a59aidb6tm3rgwvi4q',
                messageProtocol: 'y6ke47r7z580bwl7cuh2yx3q744s390mcu3xq4utgfgitputfj8ejhga2txy',
                adapterEngineName: 'u38fnwwvhe51qnnbqm46wdwrqcmn49880kvpdnvvg7gg2d3rs6rq7evyjk7930v77otkdc5pqlymexp1vh1xsucb8dllhncai9cfnlxpwe2xz5nemzupiygo087u826166rgycxy497cw1wvc7km0552tzsoytbh',
                url: 'pon3v8ri0nasaqzpnvqlp36m3hctwlaxar3rf8a929fpdpipsuv84v8wit1s1zpgrv3jpef4xeh52pxt9ca5lmyvnl439sv54h4dnxaed5zvyohpm268cw7slhxpdijpoccut513160jpng7yypy2e9wc3g7rleh44xah02qnwlcrl6284chc7jgj8inwhv90wz5zt45jqw92dj2nzl3ry6mb7bu5p6tzpnmozhdupvypixhkr6u3tq0hrml3shzx4vfkllko2a6rohxg9k6vt0mk52idyycaoruzue693mt92a53et6d8pvd3b1rodn',
                username: 'cx03wb8bxux9r3w6i1c1l15gjpeleryok79uo329r25o244qyhurrpzycdbt',
                remoteHost: '4qohdqkab1ahl7gw52th3gxlj1w4qewrrghdhurj4rp2gi6vfyprnmfewr63eojjfnm0eyqwwyc6cma6mxv0rp38n1kvqq2vdzuhnzcumw928tlaext2v7t0mdyuluv0xm1m8rh6m0fhvwfrd3f3s72kzcaoum0v',
                remotePort: 7836359809,
                directory: 'wyzni665g5r1dwvu9m0fjt9cebrks5ku64kvspmda1epzrbdanazho1vmm5wl8fbfckkjecs0tkv06t65jaihsa9op02wte83izpifj1iv0m2ys68el4nzy290kf8r6ppp6v60wcj9k3c54n6lidlumzho2qzmvbx0t7dy2rq2mumymluty0jz9fkzin3fmb8rlahbo97k6lv9gp2bzaupeuojlw0oydjlav9rdu0900qw051ff4elspczzeysa6bp41s2pysuye5lvdd75m0383xzcj6pxtkidpgx0pty7qxwr4nmd5ure3pu6ohbjx8ybkb4w6wev5fgs4xqj6z2lh5lu7dhfkmiqdtl1altcu4h2tu8c6fnsmqdweic5c9xopikpbwo6t3iyoa1zvzcuvw7mepfjsq05zw79os5baedox44u4aq872k9omy0t7bpypd6jg3cqfy7nmchvc01a70gdh9yuaz4ej714e2iwomw92o9ctinagfg5obaj1j3w66yf94hcw2k2amk9frxbj1sy9xkja2s0l52xjo8xkb75wu7aba1mq21gnyz6el1hyl32ptbifmnlwwjci6eow4ebh886xk3xolof1vdh7fw63a597e9is4zr1nom4ygbxvwiuqs6ou7bbzro7ixul8fujsn7esahwmoesfxz2km5bi6ikl8th91bs7twnp8f93h4x7r8gl0iezqy9b29tbzcuti4bweri10vgkppvyr3dwlt626gw0120msqdnsp4l6q2smj5hetgxo6uypugefx2q53m0a4usxv0xn2pbjlgi54vs9plupvt4rkieh31ys5r243cp9k9knagq4lqm9ptdhqb63pbyqev5yt4k0n3pcbyfgtnsxar8qop3jqg7rpzpcc87d5xjjs8u8xihg4vh822ad1uire755id89j55o7jop2lf0a6023gxmiri1fcmokytx489o2dj6eacywo101m0j823536vux7g2tsmf78qfyymhe1ntf',
                fileSchema: 'o769hkerdvavqubxg0ash2noblpbv9o53yl6pfnhm3365o8abhqdsdtzxci96gj25jhovn3dt73ekrhqvsnk7d932bmnbj8x6hnkviyo0bt6b2of8pxgvb73oqtrvncn670146behwkq7zxpcitl70wp59f0hqvhojxgodhv1alfebr0urlbtlc5xya6lfhio0k0k6vonwrsfx3ttvb49rm3jhx8f53jgibufc9a1hdtc297bk8xyi5f93f4r3g1q0gh9rq2j4jrsw6iee41wn4qz1cg5wv5ialsugzzui679wz7tihbyei956j1egr9cz5o20optayf3t95deprt3tmizjauluayo4nu8az9wi32e2szyaa5f6bu6rj7x7w2cvl1hgmhpg633xgurerq4fel1x2s4hs5nflsfpmwhrbdn7s3jm0sgie8dkvek8nwzypkortxm5zi1dl3s51qji1nb0gcewwqff4dahh571usa4b1kr4859nrt0ivoj80lx3i31e48wh83qn6o908qyihk4sugk5p9wpe79xmw104xtxc5gqjaf9yo2h7gvvxj1lg8ftlsnvoss7kcgocz50y6vynjlz6600xqlnnwzpn86kcw43cjab4b0xjpo060hkxhbhjmk1zxlr127p36oox7iwsuj1w9idmzz45nsvb2fp3u4n9p5xfehxzk79jgsllkotumm8ciiyia6r5b3astj3l5zmhdkkrcl9mzp3h3q0sg4uzk1wob8aiozf5irxkawknyuve05jhw8mdm25vm8a6oavm0sc8y6w6wflq486qpqnejdciq1vvpe50ln45x30gjykzscu1bip8kq1eyzsloylxn8vktr89kaokqv1szilnaro1arsuayefx9t75thctehlf4it5d8kq44jcd1a5c3epqdxpi8lv1l18cf7hs9d8f602846b1ep7ngl3m9tuz4nigb4jlw39ybwhtq7hx02m9pdt0lu8lgbgf3v2fy5jko9b01rutx',
                proxyHost: 'qem6ra80psfoqctvasftd3scb6nlt0xllrouulxss0q81hmyecit4z55vkpep',
                proxyPort: 6050895480,
                destination: 'srda615k810dmxx9n70geo4nxkd91i07t8kh4t79vxl954qxj8qdl4ao4k4rw7hy3jg7yolrgur02vs40gtfiiuxkqnf8zol24y28g2end54iq2jgq72j9tnkuexlr39h9blayz2i3d8t9pjgm10o79ype413n5k',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'brfpwclxtk9ai5ukl4ss0xhrup1810866tuec9i96fqv6gw03zrvlk8dvst8dabglnjg3e0z41wo7qbfi1118mlhfd7zpg1parzmlqz3zo2m4c3ydr26xvmetqtlpbv8w35xnk7sglbtmelpzpv5mc20l1mwlm5i',
                responsibleUserAccountName: 'kx3dta2175pmkocu3zed',
                lastChangeUserAccount: 'adc9ugybszjd4781lz7h',
                lastChangedAt: '2020-07-27 10:23:18',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'mh81vyqhwqmkcq44jvmjtnzql4dq4pcbthuf3ywvtin3nix6vx',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'qn8u01510tkavmtry0ek',
                party: '6eqpy3scpo9m050cp2l2lhw8bjtapcfxz64wo8ugy7nfjwgwtthmlaog08vdybv1rt21m2kcq1dh9cqpc799m2kgswe9r6qsjs864vlr7098arcl89blg52wp8y1sfkqxeio8zowve9rx00ewm8hzqtnh9dwrlq0',
                component: '4cyf19xefpr0rb37dpx67vt7jiag0u76aakjb30g7ykq8wtf95nzxk72lei8zf72h4i7p1ap7f1tvthrvod7rxfqaluwz2x8yhh92u984pltmpjlh3frwwk80f3y8y4k6daoapc5xhlevk7vfunw0e5yglev3asq',
                name: 'tw6pov1tmnrb7100bbpmms86muf4n5kzgm9wo7j9zi7k3vuic9n1m3tavyqtqnk6ws19yjme0iye2m6fn4rbdla9waa6xeqwcmb6km5y1wvd6oynh59dlt95fz1nt4vrw5vknzhs3fmv9ezby4hnc13eiza74fbu',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'l2px7vcc4p3twtbdv8cmut3r4mmey75wlwphl7e08dshv3bji7pf3nv858h6quw77hwp37643aap25ukc4e0w0e5220dq4z65nrh6gw82ty04387zvuh0t5knyi57wdf7rh8gcdtef1i7zytlvfl6e5z19hw7m9z',
                flowComponent: 'sgp4rxchsas3geykgz5l29a8scopoirv5dkaanjf67tiixedxhhzrn0qonwzqbowg3sskhkaa3vzse66ch44ftzzxqvu11wdb79mpg1rzbqel7uupvbia6ngx9ym3q7vgc4nzjcibznw6xmcygtp13j46tx0ecgz',
                flowInterfaceName: 'tmv3sdebys26knfpwelxtyup07mnkpzpzl1uoipfrshjjk2wx20bnj85jokyoqazfc7coyufnw7uv28u1irxjtpjr6vu2o7zhewicew0uv23ojn9nfmhoffuzmdhoth67fgomkfy0vcw6rrvgkmyxa44az0jw3hm',
                flowInterfaceNamespace: 'fi9e5x9xi8wqa2ob94ekaio4w95yv23ir4tsuxij9986lch9tzyojaax6tdx68e3x48x9faeq3helpu40dgrbxx5dj16ohw7kw4vew815vfvjkoaudu7yyiv0uk8c8y62my485flakxudv6g88o18hmgo9k3df7o',
                version: 'k2zqqyhuflxhbwphv63r',
                adapterType: 'bfxho0nl9v27p817hjwk0alh7dkbuo4dt49r9pnoq4vr4g54jfny94lkl0fc',
                direction: 'SENDER',
                transportProtocol: '7do0nlb2l5wqch3kowkhj1vgyufokvsli5l60u731fgr7ocfoisp21qc8xo0',
                messageProtocol: '3h4b4kahqjrj5xltlut244d5bkxf3bfyt5a9pn9zum9ri81rk8hxs817ync5',
                adapterEngineName: 'waw4fxw3i40yi1rgahi8lqh9m8itfm17ena8rlx6g16bopra1wmr8jq8usrlvqjrxc95bz167s9fzrnje844rmapqz2f0ebbxlr230ybf1kmveju1clenzlm4cd10w0ix4k9fezslgoamclz0im4cjrqtocogiea',
                url: '6m0zfjgln14gtghv7rnalkanebaj8slk7es6y12gru6y1trawoghyortdgrybpzqd0k48byn1cxq7vn4546vfvzn3fsct85rsh1okdo7vcgaz6wixoriapxdoolauyy3fguy1sn0f2pxn0lqdnwtcy88hxjfum9q40jjg7biwjdznah4l92ajzrrhg8uc3dors0zaonx9umn5ovnr2sfti24ba28pkloe3nxaqhr4vcfzym7l9ju7199tzp77g1jgknae62vqe5wrnowmk5xirm9j0wm4wumw3448062hf0az0zdyn7fkv8s8wopku9x',
                username: '98z5at3nu4weutkfa6pu46fgo20bpiyctpo6horcqe0pwpjls6o58jzwgje3',
                remoteHost: '51znkbhgktlnlrykus4251mz37bxtx7hkl6c3u2i9t2yb8qnmgoewo1c51koqnkubepwr7qxglcittg0o8sjuv9cw6t48xv9xvwhnschdxpfddpk1gv6ozpuke6chml74qnf58cbmi2getvuamz3au12xz4xom4d',
                remotePort: 2518953511,
                directory: 'wsrvutll42ms4xwrk4b4xer6t2mhoxtzamtpg199myvquknwn75h108n9o65fzmlpp1b77z2bsd0klsrw5y6y01wlvgn8cxor827gvv8769egxhw1a47h94s7eyiuaro17weo192b4jlm7kthnd7h7o4fy2tae4q2sia3rwyr1bt6z24vklpejem83tdynhfezhj39pii3d4kmxihx2nw2psqnircwqojlnppsxuusa3irq33f927bl65f5wcjfxvl9bs94b0kcli4jn3iz0z1vyjcx9kit99o5ktki616k02wcytreciorodmzuh5cxpo3ijjcaezomult6bobct126d8robkpmoyqwr1s41d5hpt4ewhfpxznkhkd9ta4p3gnjc4p1ix65b4fmayig8bkp9mufk6ybfq70s1e4qpbzyyy76uc628tct786w1yvinrzc4plx0zeduyd2nv244dli8zfpccfihnhhl9sxjw86qb0qkh0r7waaf2o09x0jpgutvfyo2x4r1pnca12njfpk2ndzbfiwcnkx4rhsq74un1d6o8nkv60f99ioyd17xp77lcsi2dvmr6peu3pnhbqbqfgr08aq5lp25yrawsqu3fiemo9pv99h98fecrox088sap2grcc5olsgkuyr627utk81j0zx5ejjfxtq3sco6r3bcqb32zdzp5a7sbfgosbvbfnpy4b5wenbnlztzwisyzjctinvnmk9o3kva8s6ooa179rdzpd2ekpxfgqrbg4hxgittzk4dnsbagj9zvlpu4ccynai02g0gmpr9njiyfjoeurr4dm77io9vywf3auc3deohw3dti9p871ykqhdp4fe7u3wlry7uabahjwglz5vbz3zanvoqlg1sjwg66r5l2rpfngkz0yq2tuqtvaspagrl3q982f5dq3i8e6avm4dl4lj1vruwardfw6tbd1da14b6cy7zckq0pfs73l1ih5snoes70ie8stsylefc69a8mzs9o5dcr5olkp',
                fileSchema: 'bpmm3nts2ojodztu52yd59210zeqizfkmvdx5wqomuvgqfuypaid0e9wgzgw9yirw4icbzwi3hf3g1202wx8wkfxp266ekkhk76v2aukrhofn3b0xa3b6pkpy90w38u2txt6lulsmtqlw60tc1ozbl8fpsq1h4wcmkw0pfb7o5myn572nup9f841j18srnxtl4f8qio10xvu501z2jd06zdylj0iuk3gar19v46756t4esxzgrr1pjp2uvy9dv2je9iqajanvm3yojgzcfy429ujl0sazhrav65zra9pn7rz48wahz5zzyvm8vwz5alxo55g3a9o3vr6auxvb32zpapy7rbdm51xked1bru2ha6j8070tkpq4epjwjiqil4kwgsjhrqg4zogtenvxl8gk1wrtzo5khkfxfdin6bzg1kejgj58m75etkeb5eoq1zv4h357ivlcf0s11q7mmwu49zfjamo6ix8keza172kg4ageu2dc8uhgd3pbfc9iobq1n931186c1yk4o54eo6exzcf56mane3r64wknq2apz5omwote9n5i9w6ryn6per9s4u925a81b7576omuamo2gtqevwffzqgdmcm90py1kseylqn68qw50kqupbbnzashh235mte98dpfm9nu1183ul8b9984g5qfy3396hnmtpfmlgpwgyrxcyk90h782auc2c3fcdwx66r7rxgjr4j8wdpggi7o39p3sgmmuqabj1uegrva9xyowyains1thm5n1h1kvoajocaz8pinmnxh0bl0lcaktpjyqgnumigcjy6mxl3qljjrj41q704nywbnsq9opst2r3tsjw63icx8h9ssyqx38uj51xn9hz7u11q5jz5d3ifhxzov2kn8vjqq3ghnrn3zwx9mkp30ipqgak2ujvya0q16mrpfq57o32wl8q9rshkswlsscfwog9cxrznnaqohkaulkscwdyga357ebyy30vj3rn6vir9mqy2fwbyiwntaom6vbjtavv9',
                proxyHost: 'axqs4kwbc3bke0p6es3yu9gnpkbptm4jjxlk53li4dt9msx432q7tqh1vydh',
                proxyPort: 53904876734,
                destination: 'wuqzx1j83lm927py5sdx268tc1piqzbjyk2sc1ms2cgfyog6pg3nn8tqylxq8n0if6o3zr4nvlale3jmj305r56g2wdgf318wkj960604axxkotghvd7jdpwibvh402qx5aw2dxbjj6rcy623s4bz9aj7dvnqprt',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'eqb69ccf0ka3xsbbi1aan7nqr49d89m6s7m1nx4bnzbivttlsxd9iuqef5hwcgwni2clg8iy5snvwgyt271yf0jskg6loerhqli69a44kyo4dh3mecqx6w67e5fotxnz782pcyl5rjmnz0psjmqkovlfn94hmm5o',
                responsibleUserAccountName: 'kdz2hk2lmn79514xdxsq',
                lastChangeUserAccount: '4z8ga2ncpiw9rfozqn8l',
                lastChangedAt: '2020-07-27 01:28:36',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'yz88p836oq34dulkfb5f3j1z8wkcv1z3omfv5bidpyjtm9te69',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '7w90ek4th9w1u02zspn4',
                party: 'ukatgz8j6p3jzymlwiese103yw34t6lg0a9hssga58b0lrtu3pxybd3x57w9xuftoprrtynidwpj4e1q1izh6p9a2g3qst5ft209frpx681ah73hbyvmdxx0uauwnanp1krpkyipf4a8kfzd75qp4u0g4vc4bous',
                component: 'hb4chzgx616muqe3bgdfvkp38gmv6ren8kglxsjsm7r7kffod1h6xhm8ij5ypgtd3zdlzhrqa7t7hfkyrf7ar5disx5ewti0vvfagniazw4n6jtu51fwlyw1h3qzznsfxist9qegjlec74780hp1kwu95gfl8uby',
                name: 'ccgefyc4rcyo80o36xf07tsvu6dwe3ly7e50qiqf8j82903hqms4bnuw1ca6as7amzld5u805pkytinc8wiimswzz37738x4oh2u3f0gxptso97tc0f4kk9t7bug3nr4m70mml6mrpekhwu4bfzlqn8vlp4gs7lx',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'm5850zwchr9n7typ1167mg9a9o66t3q1w6cgfrcqgdf2vmbkani27p31laqtk1o27yyuzyg9s67imhuo6hze42el4b9x6o6em4duhsm3qewsuv7nkhc1d9j9j2uh7ndqr8e72oiba2kx21r3rivbk5yicp0jp6sr',
                flowComponent: '3ss0bb40fjk03ts2g9f17gxzbjjh8h0q58h1qojt4k2hs3woc3znq921d05oxqit9f18rwelkvuxx4q1mudairh79i9u0oxywmjqxji7goqm4a7bh0xj5fkp00ma227sj8lpi6po7g2qf2lwijjvskp4gfyws0qm',
                flowInterfaceName: 'dzk5sdt99auovfdj8wkr5sg9o1ir516xvnwyxl5gb55keesuhma70cppo40erjcacjbklb20v961ayu3ujqlofrpgelx3lhxe9its30lwutek2o8o877k7kprqccgce561fl9kbeh3ktrz0dmc03r0cyahg1zcla',
                flowInterfaceNamespace: '5ldg1fh14twy02mwgq43m8exiijqq3y33id84eqbqerqjl26l9ty161edvwys8boqbctrp16rbjs02tna7ucndml40vo7uuntm6asw7ue2knvkoj3clh4ijekoiieeykwrlbmbjsm2w57gc7or4ue3rg60utqdzd',
                version: 'fmxj4zrcqmupwpnyb3yn',
                adapterType: 'xsaugzn3fk6ddgwkvom00gp812ktk3l8ylmt83lcfsqrp4s8qbz6iostzywm',
                direction: 'SENDER',
                transportProtocol: 'xgj9ou5hrho0lrr60hd7e34r6lorbg6jc6ulin0eo52a7q5i7kjaokae403s',
                messageProtocol: 'snshu9gfhbsc6zbv8xv9o1trvo8ugw2p9x80kxte0r08r7n9fbyqqn2wezc1',
                adapterEngineName: '2ccso2guwkn0f4iah6ojk3r3dkso5kiuj0imosh01gn6u16hkkfhb7ocrk9maejc76ji0e6ezp33k93r7zf1tbo6td9dwyovmhtihcu521re7ibgosq7hcw1s9w8acqsyu16no72q033dw6osrrbinbax4bnrhou',
                url: 'ks5rthlescoivzm95fnkp46bv7njnp8pryajsidiztj28tfh7ejg9t3kucxv76ptbatgswbfljaaiq23l6oqvmngvp6vocbkam3opa7l4etq3fyqbyl46er4rqihsq2adjqa2xjf879ykc3ep1wsc6ycmwmmw8m5qybaxqghod5tuu1mdwaz0j98ir8rw8ui13xzxaqe5lf6dfhnf4356wtt1rjd9xjurv6fxep9ttqzrklaehky80htvewdmt2hzhjn10g494829pq9bylw1h64nx2pl18saplf3cx3wbc734e8lpw9yg4005kneyq8',
                username: '6f4gbhngf52kp3qjp58c3cfhtk4wbyj9pku4rlstprqegjqc6zepedmq8yhy',
                remoteHost: 'bm9z23vw5fkv9vnxnsxjd15ptngpd7q2v7wepz2b6lsrk2qqweeoi0218e6pux16254q0olbap07sbhfno5217lb78muc684lbo58qcchiwu9nlte1o97fp3wrnubg8xdsa5xlt32x15afoxjn53bzdbye0417bj',
                remotePort: 4438444547,
                directory: 'jkzdy6xisxsv5efmf6g26il2c5gytl76steulqwnno913sjaqgmcubk4rn0isweyocxd2p7rzqndqz9vvw14a94i1os665mh95zv15txim11zcubhdvj7vmb2e4t1tv5qfz6sesma9f4bm2jebqfoj57jqeez4qvl6fii64hps6jeo2mz5gq2z1ere0ak2xlqyv2etkf0z947ims0d7fzfbl8h3likr0bsgfyrpfch57741rb1qcsyw61i1fycwefytfhlao2ybt3uidzhh1sjxbbuvayhz74pzmij73x9vx30nkr4jxjdjgl6z86ruki2zmiw80qym3z4brop2iiblib82buldnnnwsw19y3x3l6lts6n3nk6f7i6lg7b6n023p42f3uvgi1jd4pqybgtr12nq7wh0xf0mkbd633u7is27m4p066lp2cf5rz4arxpxqnapqnoszdnuewdsb5b7ux2v0qd70lgok3uvvdu3tczgqbf7weib3t4kgw85upy90238u7nwu0p41e6fmgpa1nnvvvtcd2257o54c7hee07pkl1wxixfa6tjpk3re0r9hh463kcyfkrh9swzwsh7d82ncz69yxhbbnp37xmkgx2m4ut85jx7hb0903124caqzdvd8y1w6zd7kv8qx6u63tkuyuml4ozf0kv00srr9aoaqkto0bj7infik3dp9xyr8f45gkqaeemc4rjxghzyk9vpjvyg5wleft371378l01nq9sy8efhi95709j4duyv2l62qc0at8aate3hm6ft1e6xhmcsohi1z08q3g3l2r06cb8jm5791t70p9jalhylrc8c6cyuhzycs1c35j7nz6v8nxghdia559zdc4gfw36fvr2g9lshi3d22db5p77hlz4iljljvgsxzzeo5j7rgxwwjeqn7emwdcbg403go657npqy00ezm3ynuahfwj7fq8sridodduri3u7e99bcpvphbeghyfo39uqsxphip8eexw7x89uk4hr7uca57',
                fileSchema: 'kiy2q3m6fhg1aygp2q8vye1qsecnskoyf522bvy9l78yqgcod6uq1dsm2fp9wsvli0re7lg581a4y4w60ikw4j37o03pt65l443e2ybarm0kmyu4ocbz161h539u0hfuocmfkhmimkdgb6tpezymcr1z6ytjgrst1b3x0oy86bun99lsqsqxpalzel5pwfb4capewcd2w0weya5bltljx0bvnuqfcczvfq9hl0klc2pjx3d8zaysc8cyzfnug8pmfc4jyqm5gt9gcugpjouh25rfeoil8unx1ac6vmb69u53ofjp018ibdu67hvcve8vpgup5mr5izawu51s9bbyf7mwe3ev9eo5fl93vw78szqmbta2tbekqotg4c80c7ox64jnlcycmkdgxmgmvethwxgofdapi8uji25b6yw0vme843d9w3u7490vt732onnra22ia9lxwztdyqfvd5le5e8m6fpvz3b275742k92kr4fhnq04neyl9bf3uj5dxpthe1mm6yabj4wgspfbuj7x9brfk1uo6fuqzdrd55jm64k77r2z8vdlw2c9rmwqioayrgyyxeamqszwsd148w2k97luft39v9ak0ey24dswjuaiov879w2353mk9jtcqcywvzyaut4cebq7duej24kssrtdnsm6uqtjpyenc060485wys59cbwmdk6jz2wc0zw1sln2g8u06aytc0g4x1sv0gjdssn0jb6ge50pu253nnv5rmlw8co2ifvg8uvpbaf76nq129oe8rgdienh7ymnyxe92l7pd5o5t9g9dut7boy7iaoc395pxkldjxj37t8bd8iafx3g29hqe0qgjzztivbt9degme8n9coebvr268po26ndqj54m0xjdwgit1jrq4htm91pi4uwohsskoj73pofgh55yzl7cwvjfvfs1lp984di4u21pr9vtud6ewrv1whsi90229ufdtyucn0fquyui18rijt5ihfv0n41o8ry93zifpqt4y0au1i6ul2',
                proxyHost: 'eoqgc0yl9l1w7yvcay9ubxtz7m9l4v7yobuxb9depjadz8h5vrox2ekj2icv',
                proxyPort: 1437125967,
                destination: 'rwjqdrgzw6iodx9irt8d2l5du2xc1mjiaxozfccrsx3qknb68ic55tzttod9y1k57biyk8noucax9rrpzoj51jfvzqwflhx49w88777ispgw59n4altxzyk0qi3tekb74pmubvow25qt1mad3q4rrnzeux3ms54uu',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'p1m1yfilhs5m0qk1i9eijmwcf5hp1tj09f1j3pcxz4e7k29c3ceic5fcsukgv5znfov054ar6gyemytdgzibux3yetu6n7hpc7z3dvlnj1xay9abud6wv45xz8vpw4l8pyphj70wd2tgw7h1q417lfawjty7ex91',
                responsibleUserAccountName: '98bezt68suloywofz5lc',
                lastChangeUserAccount: '94c3pzo6bmeq31m7n44f',
                lastChangedAt: '2020-07-27 00:20:02',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'gyu1mo5aj2b2movgj55lpdys6ovip8plzm3hdlxvxxm2m7hgwk',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '2zqy28asjz7x3wsjcvse',
                party: 't8g4h46fpm2xz1f75p2c8up5x40069o9cwdtvpsyjqzbk7p11ou13eu71p8x22ntqmddf88iaxxuzhwn7r7ucmn4fu5j8xun4ylyepbcbb4cdga444hqfqxec5rf14ituibpxwo9pi734ospzdizs4r8inm3couu',
                component: 'n7sd36gdge1mvz2afrjpm2rqfyd8boqoemiinul7jqn4bvpoay9e31q0vkl1idraf7wlxd5d3boqf3my2zwmrtltl5palsdiz6hg8pbxrt8qatotb6udxwlen5q1us6hppywmwuq3kvzr8uk5yj6ytduc0xfo8oj',
                name: 'vnr8mv0ogtil01c0jo6czqkipwz6kbj5q5hy6ka42ytnkm78i9xsnqbqqhsobhyuapzsq4784fcjmldndjdtuilw2whw84ck9whvldiol96rqimghspyjttpbt26qojbsfu4hwabbrhugx8afopdmw6fwqrjtfjy',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'pc7eld6ifs5h7ohh4xohlc8jr1d01roay6xsba70l2a7pdzfdl7dooybpoklffdoy82dmdtcr6rcllcfuj9w2vy8zmddn42yyw1arw6kacch0jiebonhptrgn21ql9kv492ijksqisai2ykkozgwa1ocjji6xrlt',
                flowComponent: 'usmlqjumny7chjod01a8indac3nluoav70dp6avszdyvydj7683ibkyp1lw28gvk1wvodkibuwbzqdf10hb86tks3u2o7mcb8wou4exiu1hur02mmfq17lhpgt6vrzcbgnnqnq7ssx3jf8c93lj1nm0ud32uwej0',
                flowInterfaceName: 'n3b2481urk80iftl9oerrac1iuwpia9fmnccjo2mdugaceqsf273sfil3akr8fbrday7an23x7im3qm11u1mh89z4rv90xjcoycmzsjvhhblbtwbotcmzo3lvstb79fr3m25bdn7ezmvn3rx9q9zpoa24u9joonh',
                flowInterfaceNamespace: 'gg6r2k9dlujs5jmfpt8ynik3rm6hanrxdeghwmq7i7z31f5cp976m2ybwtfmzr8kbmvgcd7djfmsmanhfoeufz2mdnuhv2b9r0lc6t1zy7buqxewrxiksoayqcbknpxut23vyn30ordyoz4yffhshzzsuvklmv1h',
                version: 'v2rwwfdcybwpzze8mr49',
                adapterType: 'ysput6yehcul6y36tc43rpdr50kqxrbe4208u9iz82i7kc7vjjyu9deu00bv',
                direction: 'SENDER',
                transportProtocol: '8dbnw5d0346xj6bua84h3pcgo9uwhvl8t2c8lsfojwpwl388tehtz57g3ywq',
                messageProtocol: '4l1eck6awke82e0yh8wt8nn99s6hxdnnhkfj3zbxxcjnpmh5bctd36yz5r9r',
                adapterEngineName: 'vlfvuyek1b87gjl2vzpn72xjuroijn01n4pz0lk8xvbxna13aukx7oubzq5og6h7kp9al7pkag5bmy77plubyqk5tx8bfzlsm6a30102pq3q0cwnrl19ln5otrnxrk89lxduzc8aq4bd4hg92r7i9p9v14rbst1o',
                url: 'n1r9n1orgeswsknyhdoz2kdtfexlqbrlew13k0w9wwnsrc7xi9zbhdb0aj3iwq2oliylr9oicdrkt3te20p2tc433yy4frekgkbvq0dp4ssaiff451dmk3n0rnpbsm4k1btw49ncz05k0cwpsxdchd1cql9y0edfc3kfmlif0y88zn0ytwxf07449m5u3lxvbipqko1ofgmvwm3fa7scjk52h3ja2sx95782jywhteem0mr0jetv6pl1p9fdfu9tdn3cz1s6ax9qkcjys4w5gxq6wukfkviyn44g8l7gr8dy55xsv59ugvgwauuz67p1',
                username: 'mihp55inh4lyqsouxz8yeug9vxilrjajmwzf7l7s04c2u8rjgxeqxex9ax0u',
                remoteHost: 'n261ym5wijm5bcsym8p4oi4mbqz3trehsyffnb5va6db5rtxevqw877j4c72ci0wfir94nee86oolrump7wzk9nk8eg6eqdaktp37k5s0bijh5s5khlfsfphl9pk46txnvunys9pk8qmz1issu76ieuvjbbw3r6p',
                remotePort: 3268583466,
                directory: 'oc1gd6xfbeuux7648p2gek3hz967iujkk61tturry0faju1hlmbv6313ybwgves15x7vehut5jd33snfv1kkosgprtiadk4mhlosek02betp5i6v65y99minkhvb8ifuuho0qnn13dk741cymnq50wljtj04a71hqtgkovluvod2jfvpwzkv4qodczku9sc11nowecl81hyp30kn098oibf1kv0qowg91ua856jcfp4ggvtuq0jexepictswl2a07vyihptign73wpnhjsqlhqyx0semgdbfywseeccyabd2959f8e6p03zjwsvawm2yakw88t66pyctsnaug7i7zxx1cc6ds0kg10remul1m18radx696rhnk59e0i34b03t9pbvhnylpmdv5e7udzp54fql6iinaie8ylbkyit1f9vr66c2iga5e82fyarqh6c8q4i6d864z7bwf9dqubqlubkf24u227ska601yc29dwdl4kjcqc6bmsvr9reuuys8vr6i9p4i8rh8xzlcrm8pno2kw8w2iyuklgq0e8868if6v6pdf0v9qitzbxggco9t8vtlxcblbcjztlrh8b5lxgaslgv8xshgo707bfmz2iwersvnuspg81xojyn6pcamrh84x49l8pgie4dpnqpi1dm3ieiev682wt110jjpk6ap2bhmkarq1rbaf8q7qg415jc29t2faemf84k6udrgmgalybeegsu1au36vwcpms5vnd3dw9c48jy8jgzal65qyo19sj5qoe75rmarwtr4h1flloqjyz4h1by4tzqra7gnrhbcq355o7iomz78quj9tm9utg84vasbsntugvcnzwig7085k6e353tx2x2gpdztouw7z633i9eeagvmo4e698cknju9y94cxyt77230c0hkmzhuq1go98scshx6moqb7ven448olbsu38crldrzb5h9n0pterz28ik49gft1kv2nbkntff3741o1bm79vuzgm80jv48urtkm6z4at7',
                fileSchema: 'wdfqqliv3oajz2qv55vmmq4lhkvpl721cw9l1l2jjpzlyerk9qwxtn5fruc4uwdu7euz3x6ya56i48qmmj6zpcnvoe49wnu5sbu11ltakc3xrvywrfj2g8ytmrcwqsz7skshtvidpxuqi7y20skedaqtsy75j9jnbxwwz8rb6628klo5vms8n9uqmhjqhonpd8imjn6glqcng8po850c47oycldsf7mwvby4bcc7ptk7yn7tyoqbuhgjvzoa16oai95da3ay2km4w6zvupwzswrdxiucaiu76lbe1jfcqulcc4q9e97v5i4jlgw0qjid5lejm8ba46e26xxcb6rgff20mo099g4wib3ys9093xv5irh5r8fqgl8lohz8x0995edxk304dcu62alpskp9xn18xan3ynz6gk2ltk6tvpmtzvjl7wz9j17g3pgjievb96gsq2ld0uobjvd7uj3ank130z5asywkhc5qju4tqbkmrxe8x8t4zvo6yq3idmcopz15cfht3rycicd4lfexkdol5tsf9wpnu8fqkk26djjnify9yivwmloofsvvgd7qz1tuszga9fbgkb5fip7hhkrd7egmgax4m7c3vxuziqmfd4041e7dt2pfpu4nybevazutsj89pf7dt4czju1vzi71vmcl6mx5vovgt5whyton27zs2t37xel38lsg69dyrpsm4fc1ykiamifmgy7tlbs851r9wdwhyjcwhms2w4azuzifdlw5mzb1w2f0voftvorshz6fc29pmo26lykvz1zyr9v4iyjpsu8og6xnjb94w0w6x28nduo68xqmdicf7710h7cdx5p4po1rtrdwl8juxug9pzsgate9ubo74jp6ki2g6xfvut2hn930mkvnvrbjnczobgi4z8dhvppe5wpbkhr1vf6p00ca4iywc9u3h87usmzckzrz3njd79sr6klw01viavpr815v6rcw7rcvmm3nhtfnc8qs08h4dhvxpdg3ti35grm21tkzu7qd',
                proxyHost: 'pzxy1rkojcy81t3gr2cejes9vzlz9jvb2hfrli7jixwpjcfvyc18lbnfy0qy',
                proxyPort: 7269322970,
                destination: 'h6q03h4923tlezylc8j6azyu9xe0otpm4ixwm7dihu0hs1bhm2bzvdrr59wmfau83htprfyjdzjuwwmiu83677s51ur9ys0ppwhkls7nuogait7fbk3o2vm0y5f36q375274iwqpnakfo7u0ph52tvt91jyzc4db',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '2swp0iblxzyrka53lcc9w2mnnbdxv91hbxd7zrub5almu4dww57br2klo43m901fceg871c5cdkc8uagot4vfnuwtz57ftfk48565t6821jl7115u0y0edebminsnqpi1kfhlva2wlwipvcuithbpmq47tm9x3i9l',
                responsibleUserAccountName: 'f8y1he5okukqlycprwgx',
                lastChangeUserAccount: 'xwsnv6y91liq27gamokq',
                lastChangedAt: '2020-07-27 10:02:49',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 't4i6r21hf3g84bf7alskqiltqguna6tp9kwa5vkvvc9doucmoe',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'xfd13syy1ghwj8qu5e4f',
                party: 'gya8z83zox2hszparj6edegobfwwqxb8fkz7qnwtjblvj6vtu2bdypw7nyh800001rhoyams8w2u784cf9e11rpajzktaml6zuw1lkgbt6zcwp2wrf9m5l075vzh35dclsaqlejuh011qtfbqp6hwcsk5sh8u5fj',
                component: 'zfw995hjsj0jwa16z76hml3cpd8t7c3gkyk65s6ame2aeqqokkz6rlhtypfe1m0vrruvxs8in89k3p6le1zalavwx438ob7dri0xastkmu5rj6rxnpjyhgxuouiq8vm6tkr3prgu8hwshlf7xc8edchwyc2zzz8i',
                name: '6o9o0vd2jpvw1lzuiyab4shywvqttkfqfo2pgsiuxz1j8awo3d6ybghm9n8ux2th8iidzjmeezddhitjb2jg7dh2d2bpspol10bky3umxf34jf0kc22amoag8p0klubqyhcskf761o93v6upvh4j77d36t25j03a',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'cozwwigzhjs8w279hhffcx5v1429xkxe87uw5c3z14mpk6tmqds2juia3g4ef4uact5o9plxcpu541elc92lgzsx57qgz7svn8an20zlp7qebbw1j6iuo4x3pdqhalget6pt6roaidmru1md9rb7mcweuaiej29i',
                flowComponent: 'tc7yc1ptq3fb16a4ftj8pba3bupx6b5ia1gqrzb3jyckk0cb95ntxmau2ahzmf015azhwwx3cvz4zyjd36fym0bcnnfm5osohl4lb69sz6rky18wgepha5zdku9n4slj8xbx98d3h8adx935ihzfu3u17t8oeuvu',
                flowInterfaceName: 'xqjxepalrdev0il125myya6y052jq8i7edcciepzrdq4a4yzhnyifv8ml0i8at0l18sztccme49f766zvqdi7ik3rbjzf4un4wm41f57yj0wkxiurcglgnz0xovsl3h1wkdcz21cy4use1mf5bs8or5j7v66jhhh',
                flowInterfaceNamespace: 'ozzl5jkezm389p09atj39tfq9w7kuqfl7qto34dv7bt4dtg4jntv24100rm0l41bwu1a2d0m3q811k6yd4wkhtmq1nofj2af4eemekqgj5ibyskjwl38gafcmidndg36fathl2rb4ie67h4yjgt0zits3p1ul3js',
                version: 'tr4ldcli0xj7u413zz0a',
                adapterType: 'fymkmi20l5hz4b1s4x0ottxvpoeicrz2iwzo6tp29gcjw7eujej1n4w8klji',
                direction: 'SENDER',
                transportProtocol: '7twbz1vqkwwyn7ym7povhcb3x3ebvel4kxcs22dm7yfn557zw952232wg0dj',
                messageProtocol: '9uylbsdcwlz1g2fkkvlik7ousfi08zzy88m2fff19t64bmwsgv2446h9a0kr',
                adapterEngineName: 'hypayjski9d9trqid8t2uqj7q22pq4bxzz51mq85b8d048q89431hlom992q6bh6zt2rdv9gl3v73tqsokdzrj8t43bofhixjk6awf0iwq0dqeubckdswpfqv5t9dq92m0x97s7kt65z39fstw6l8v1vxgcm4d3i',
                url: 'o9vw4nawmx8hum72n1yqtqjx640jrenus8m6kinwpk2ixsn13bw4nzc2mum876ig3lsf55br2ubus75ws01zyaclmqmilekuf68ui3usz4ult9pvm8tajz8ddr8amf4qk0hlt4igeuxi6edbu3vdnn1kd5akuocpijiqqcebrb5rvwqs7r01s9ve4jsgl4ar8pp495k2ch8e45a81zl7hoxe9ivn7nbeie2bmuw9j6zdwxfy8wxhm1fsxtkg0pi0pdti5kl2nxkmg8p53cbl62ftc8fqcd24hyfuvg2u9hbyi3lf5x7p8nxl158ezaag',
                username: 'z3arprujqw0o6rt7tr29kdmpxdmq53lk4k8xazhlxbnhzjq3nnkldr1btzum',
                remoteHost: 'vftckikmovlkouwivetb4t5umt75hy1mrgynpayv0aqysucsiidykkza5khme3mvwv57l2zeqk10qw6cbwqubqwntovd7inraksceirznrw0fbg5h7baausl0bhm41w65809klv3boyxa4hefywwk1h6vxnixfh0',
                remotePort: 4035775343,
                directory: 'knp3muxoo188k8ibkcs0qdvnhmdnw7uypz7gckzpinu84je33t5fxa3lc3mnupe654latwl0nej2l0l72z7stps4a5054xmnznv9by87gx7u6k6iu728jk5uahpxhy1gt9h9hbuuy8yi5avwcx6eh9i4uegr44jbyfyj6btqqd1wr9b1f5e4qtbt8om723rk764i68nns5lwksxlxwwmieiszlw394i7fk5rya8ptlvim69wqwcri1ekfivvhoxyx9oudidp1wvwi9hjcnv9e1a5t32uh4pmuqs3j8ini1ovnadgy1rth9szr00nojai4y9rp4yamjw7ilga7fl5z1umqvbtho6sl3dut5wztufzd1x8456mgmbky8ojtkyoc5d63l4pwe15bxctbp6ao5y2yhdpbby8kf99bupdryjsb1oobz6h5ixg0ky61s6idcmhqqnlh6ew0fuybf5t2c94qga52ylnum2ilrqx9evgteckhrioc884442vdo47e5fo1m864q57ohmtbr3ykxgnn7bymb2i5cqbrjidlhiql890c02vg19lm8kbqv1igdlkqfhna1uagxs0b8jswx064tdsrewopehpwkh67rfzxx9ym3ui4g28ylr7e7ckifrzvbat7t54xl72m923enahll8ieuyc7l4w653xs25zvlc88nk8dfmujhha94wvyqhs2khkzul0gtktskw9704ya7mzplz66uykca9q6qry20h1leqfeurd8ow5sj4r2agnlnu4qlfe635w40mqp58w5hv0xm63thnmpihbbizbb0l0xtvot0feywbrxhvog5kdd05ads60rxg9hu43p2b7pbnam3gpqgcglyddip50z25yzgcxs71bfgfa9dqgutfgtge4qezrdgstembjjp3aez093lkw3h24u7dbo389qiyrhiyrn9mwpho3ga478wuwde6rtsdpelxkpjbzk72x8d3eazsfz2zkgxb2z6tjzqg8i1gany4qp0yvmovs',
                fileSchema: 'ij6oicu5rprtozzp6wh4h3x8tywci3x1gigd7ac1o101k0xs3zx6awqsta8pjazt9kd9ormr5mcfv9k0dxqpxykhtes5828mv3vtib05on96n4scgilyyb4zul99s27z5my8nyihuvqenlmuxps1g5a37pj0l5b2ubhp2icj89m220mosk4r6pmoha6x4o1emcoh1m9enpuvr9x9s545nlehigizgxqsfx07w2gm7shu6utu999kme0mhzc89irr7v2ey5722gfjm4pzli3m4yqxyxdrq3yx0knfuv3eykt1x9vpmzwr5aksntvdd1p3krfyq4tzun285gqnntiop3vftt6783qvk8kyuzf108ggnl7u6p5sd97ouhas55qkkfzx7tevt837nx8zrf8acymq76aml88uu3f3d9y1hub2qel35vq8gpldssmqt9qzeksx139jpc0v3c3ulzhox0dgzqx2bnpcrzq4en4bus7un2dmld5uruz0nnq0z09vui1e73gf5dsmwvxg5m5l0hyfxwia6tynt8euqp5q2hz9set7mh4vu1eueurmsq6n2mnqqlguwx88kwqjgahxngppxxyiu4ef1ugvr5p6z0sj24o47r9cmh4ms2fopxu8efwoiwfgexwztwi1yr99mj2q9yji4buzkwre0j4ldaovcxyvqfxpj0vdxu4b9ovj16f2de4z15340myaldn0z6gr3c2hafxdzzgnzhjoxdw55q937qqmsv8szj4zdoo0mszxkdj2w4w66an178gu00b7q51xsj9rk7eq0omo1kbnxkb8mfb9n9yhszgqt1c5l1uf5lvyrqanf2mucvp7xzl9aozk9ewsstb9j9o2qdsfpkl0g7numsvdlrerwi6r07btvp4d7s8h3ihtnl2jzphadwfpnduzm3vc5soajcu30q05p6zb1w02d662z13ufy136q64kbv1ec2rbwkxo9qcko5guk8beh3ar1495qimy5nhvyrcpr9051pkh5j1',
                proxyHost: 'au1o46wu4kaci3kh7k2yalkxap4yexl90q1wwrti9vz7a6t8wqhfc5adx8f6',
                proxyPort: 7715150837,
                destination: 'z8uy0k4k1mh2h4112kctrb2c8ax3dh3fhu1sbgdixn92q8fa9hqn6tnxsuqm14uqz1yu7h26oew0grhkcmc95kyqcps0udq2amingimcjgbhhwlyqd214wld6ct3quttvljmsfu9f9dhh395ywsbwj1djyte9cej',
                adapterStatus: 'INACTIVE',
                softwareComponentName: '4qocye2tj876ud56zcfj8ww1n6s4yxyv6mqb932m8znhgl6fhwennzf4belz14zljk20j42i78fopp6y7rwecm3oe178n3xz845al3sjt3kok2lgdr44vwo0i14dzowrnbi9bd9nc5dbqvcoqzkay930rk4c6ymz',
                responsibleUserAccountName: '2muld8jjk786qjdr08yx8',
                lastChangeUserAccount: 'ycbngibr4fwu0zqo0axn',
                lastChangedAt: '2020-07-26 21:32:20',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'vxqizfozwe4i5omdwlrw6nij5ndwhvnii7f1vmnv3t0expkv2v',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'yhy5hkliyq74e031gi67',
                party: '86fabkm1ayjcisucqqokt7hxistriwk1o6304vwhqcq9rxqp88yaobegprgtgex1wx9xmu7fo55uv78x23j45h3rvi8lu6gut2wkdpf0idpc9zarr8gq9vqbhqnxo50f2ypne48m0v4gx68ztdbd5gp6wafq65wa',
                component: '86b1tz2g00e32wdk6ws9j778fezsfibxh9tjasw3itowbhckj5stut8g6rajqatniexh42ypcrjg4uismp6j9chk2huegdkl3a7o4xld6v0jnotul6bq5uv525sbyqywg8xe4ya3yfko7foiz95ywuyhj8qd5841',
                name: 'p925wodpmja9llqwnyy368ioep15h8rf4m0f05jrg7u9s2sst0cr5v0a6wo29q7stb3pei1ar7hgaksatk3v7kbfys1qrw6milybl5rp89es5m2ssxnj9e4w07fvyea9mu6xym6lhd3wfb8hhrgu44rsj8vfx7or',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'e3lqtfci20sg6ld1bnesrs4dn8dei4gylx1o0vnh8g7r1unyx3bla2d4d6mhgheq51p2o3nauaaram20up623erb6jcmgrxahc0844kb763afodibuiy4bem5qpd1pegc9i3jqqczdga9cuyk4ja8a45xmq4qzf3',
                flowComponent: '4t1t13nd16c7cthre178bew8tmjmvmgr2khl0dzkl4j8iagqb1myxmjof48kz61b1lfoncwht3fi0yj1vokmua6t4slrpicxo0irdkrcp70f335gljo42457mzc2y05m3rfb5fcar8ia2t16rk80v1j5brbpatdp',
                flowInterfaceName: '2rkoauqoi63fypenntrv9f25czcfo1fq2qscl337d5h2sqy76em9do5onqjnmxel4z679hmt2evzglkkmyi4wrn1mipc9i60ud6x1kko2ne9h47oh1nsne09lsetrzm0264myfhjszihtvgsc6m22tj4o3me8lo2',
                flowInterfaceNamespace: 'hh1899th2swn0slrpomxi1a0sb159qanuiz7kzi7q9fyah2u9cxszlmjy53vntbcksbgfmcvpxjoa1pvfk2aya4t10h0u6zwn781469jjt5aazy3c2oc8evi2gv2couze9jmso4ootorgq1x025mi1axbm5gbpfs',
                version: 'psv4di8sk9a84z4zwncb',
                adapterType: 'z60jlf9c094s25p43nmhlz5bmgt88jds1emyqadvlo46lx7b2drw2bmjabse',
                direction: 'SENDER',
                transportProtocol: 'l1wv37iue15f6nz9tzl2a07runo2w6bnfx0kapfmelu7sa84eg5pfb9t2kgk',
                messageProtocol: '0rdku37hzxo6z3lo3i3evas9z7bzhhid7x8xmyyfwvy1g2g00trc6hnn7uri',
                adapterEngineName: '60li1yvw3k3hu1zlc6h4ct342amealqef97z7moe52x4lewe4o5mw4samsjvhfn9aiwhvuwh9srtzd5gccqr01qj67j76qb9mu7ulziso6miv6mropqcbwe7qxkp6xg8u54ob2afp7xknzf56pz9lu4znriap1fd',
                url: 't8fv5hlj9nnpx2vcmytcjikjbvfahc9fabbdnwx5p08940ut0r4qmveibz088lkyazjdd37yei29kvjfui8lvv5j614fz30l7v0uoyvo43flpr54ofw3jssvd33vl7j8cpmn5fbdcgedn8tbkpk4zps3krq1ip345zajrfqo96wbtyrh6c2bwvob9uajvy0jlcskxi7k4u28sd3pr51kftve9b0nut9auh3r9sov3r8ohbaldh32hqgdb83sli2t0zzygmd1r7zrqgts8axwcbjr0t4tuoghjocxfkv71mltctxm4nh65y5levzvme3s',
                username: 'wauhi1g5s0suwvvp3a4ypulwu0um9kq9dcrbgv7aa0dn1rykn2kp42lyi0mq',
                remoteHost: 'iwiw0skldjb23bj1w53q8wzre3zag2i6wgo7qhrnlr6kqd00vzc2s07qiou6mlg7fsvc4m67un9vmk3yzeoii2w54tw964qygv09aerzh98u9yyj0j7vqb6p9uc1osu3jzz8nvmp38v9kixp0lf33hofpicw4tx0',
                remotePort: 4211469807,
                directory: 'zg49yqc4fmfggywjjrbeupmxkxkebi6usxle3vxwfobnejnak58rwszthq29bwf3grmi951fi2fgx3xdg8laty0s1t7p4c1lnaibkc8ix8ciyy4kc4kexn3u4ms0sevn2aler0ecaf1dqa4gi9fd46489huhiwaaxuou58pin83tb59ajk897xh7nfmctb9jk0d0f2tx3tgikgfwk4vgatvr839njeh2xapd0n8v8umdjly408p3bbaxtfr86qpz81cjsd3pew4g8ecvkdgp4hew66z8thszw17gdqyyin7kichazu20ugg2tdhqswda3zjyrh4y4jfcfq9v8pyg4rrqdxz02yut32xdyg8eevyg85h8ze6hzw8d3kj7qg35nrdh4vooalkjeoqzjxjwk2kxgqllvmi53lvc6hx9lml4c41jmxickofj7g7tubxdm9nuu6wimnob349fxbr6xmakn0krncwlbzrflztd6wyp2mnml8kn3cyhrez93puq9fs9x0dxrxsla5yx4zvipjfpmch0gkbduz4jyhkj7n7thagggrysqv35sbqh9xeod4or5q5voz4mm5h8o7ahl50vnb0vh9qboljee4omgo73phisjdiu92ambhple5q3l7d965l87qcrj8y017kqt5k4i0wfef6pbfk6cevgekcsf59iyucy5lbzinja8u1pw5jcv9rf7yvi3z1hxt69er5iks5scu25mb7e99x8g4p50r4uxtv6rca9jbav1p5okgrpcyjmrs7348xd1vguocv0j0jmha6iyvc1v3arz3s6vodjd762nhul0q0u8368dbgatn5ov22dxueam5nldwsunsr3dtx5w0qklf6qe0ap5zmr8u0prl05834iktyig1nz7o8p409wpgq1h0mwu9r69k4t0hm9knqr28fd52yqds77qcg2gpuf5o6raq4e3iwaiy51y7c6rst2dolgbnq93g2fvf6fqpfe7wbtjtl0wcp353qkkzyimq5x2949',
                fileSchema: 'xqfa931tt1af5w1dvnx1azqwxrjugnwuqbam5r9pvz3eq4yanuo09zn0otzs4572c3bot6q9pu41c8g6c06t1htvcfc7tlechjudrnqpowobhi3neu2dsx9leeap5hl00ryi8kuty546kgc6yjmqkcgm80wc536ew1j685n3v01h1rdf2jcypigv9dl3lq91721toq2tsi5vvvadc9xscpjnfck41a0h7cohu0bw2gzxmv6gmy4bnw2kjpq5sdtkpkbk7n3q4e79an44m7xk4nkkt3ms7tx7mhbi3ldj0bexelby2v7wd5dns2u51ocjdijn00n34a64wknf34zzkutqi0jsomuo6r8lo8qjtb39inq73j4s8s5nxr0b2a52ectihzr4k1kvsn1k1cst1wdlb59uby1zeywdao7gngawb13endbud9tlr0c61dmdpspgg7ku7lov6ykgfgrbuy6q7w61rzoirp72k61secnqrbyz7kk91y9t6k2f1w3vooug5hdys832man3eftszx3wsraufnywr6r51miwmslvpuam3wjb02xo2vya1wesj8ef7fd8hud59i82luhmjdaj4oyou7gt32mxyjwz20zqyy3z1a655q5yorf5njf9l3ask70lvjwr79uf1e22rplwzg2bi2c83i73k0cvgbbmxpxo80csq64ibp1ruxbzwfx45bytsv39aeoeqf9owb4ym370l4ak2u9msehy123cuxp04rkuafth2srqe95qseg2solalsxlz0ta47lrago2p059a3k60goezvp42n6lf9of92bhi8denk8actarsfg9n3weefynd010bk2b1ie3ae8ma3hqe3e977vhmzgk9h440zexi3x74bwsq7s59t08rgk6x579w77jblo0ygubphzsz8wjqssp5ij234tgjyftz7al4yi64012g9z6iitwh48533op5rt2djet15i6tj5zwq7owfy5f9nfgoy1h87s8kyor3meqoqsgum3',
                proxyHost: 'himyb90zvmqq95txqkdry3ym6cplnryupquis55klp39wh0r11c0bexlbz2a',
                proxyPort: 3080711545,
                destination: 'ior7hciahx47rgunj2nt4tndz7fn7inifnulscvem0sarh0n7vw8junpf1bxuc4n3a2pzlmgp315gd0uhzhavpz85lj008mzcnta8la1t25ov88fv1scahzgsc0j5lpxldyw9c8fixi9ak81vjwe9746hz9njizt',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '2ncl1bmyqjrtgx0i45fawdpokks1grqso9ipla7oqsdlnk5yft4lwkoemou0udkfmyk5w4bgzcv5ga0aabcj8nyds447ho9if9ww3avutfobq4gi4gw78wejpq4j941oalxfyw9cfm9q7l7gu7019n56y62f95aq',
                responsibleUserAccountName: 'qs5g0ixnyd0z29an31ih',
                lastChangeUserAccount: 'p4zzc5or09kosp2q2abs0',
                lastChangedAt: '2020-07-27 16:31:16',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'zmc4irovur3srsp0lk31flxuadqcvxwhv39phqnqa9gax1micw',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '3n41s9zqk7zc9ai7ey7q',
                party: 'w161krkwpznnlchmg1nvql6d02uz1k8r7108qatpkucqj3n07s2vwk2ouk6ilnpjyj3rfbmylie90ophqof6v21pew1a2m0mnv4v8r10aax6cyc44zp1yqoqfqpaqk81xn9fkusvlhcpivg9www4ric2ec4y6vjq',
                component: '3mjh1wzy0ge5orgztjgd7d1473u726fh8c9pmflz43t3gc37q3y8h39x2djszeyk0w9gao9dkgmk9f3gtdjp080qdh1bz8k6hw1bgk6qf1j46wilsm8yz9a536fxyriaj3mhcbtgmtjlpzzyvu935bjxcpzof9g1',
                name: 'habk2n0m1dvl334u56tryp8w1lk5ix52c7ibvv0o0zj4fawe3y8753pey4iwbjzj2vqgt2r85o4ejp1zkja33h5d8q7b0j8k9iszn00vami9druc4a2713ki0qa6bgkorh6v3lzat85h4564geed4qnkofah51wy',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'g0jo8grxvzhdydno5huxzhfzxqztvoghlq82bb406fe4iu8jiigca5z4cpmuywf92hwe03rlk39hmuidoaiovow5ixeej5ni1zg9trdqbd1skc970odl5z4lqau06mrn6x9cf782xxre57cjta09n28jq69nvx8z',
                flowComponent: 'o7jycn5jk7l85x6pbphsjimh38y8k64d2n6sjne7qwc3y6y7v5g88tzkfi9ka8yt5jvv22eykhy9bc4zbpfqcizh5xf5g0hvg2684n42n0qm2f64v5pscg225n1zdgw8raxlo34sgvbzh6ixfc32l2f568fwm2bv',
                flowInterfaceName: 'sfkjx7btcr7rnr6iztqwdfw7h1t8oqt9riddh8q332ghyclt761eplkfp2vszz3bdgopv3kxv8xuy97vqus9fnc2s7ptkcu7psa7ccf4129epah67impr5a5z5wc112ryxcpm8sbsavf4bo1czl6qg91hg43gtgo',
                flowInterfaceNamespace: 'mc9wlbvuyxyld8gdmli7isfsgg59i0vx3d3xp8raeysg2t7f3rkbhvmfl0lzpv5dtrils89m2zfvosrk78is320cf0fk7w1eev2k1lyv17brsvt8jndbc0qx78p2uaw56op3pxoortp9ifgbrj75vk8lnxfmkmfp',
                version: 'z7y2upbil98gw631tcrg',
                adapterType: 'sdjnnkfpd3dh23x03o2zklyd1yhd6o9mgbrkqw7tgtx4vn951udqrxiv2hed',
                direction: 'RECEIVER',
                transportProtocol: 'nzfg6nw3z0dw8by9w0ok4n0kjalckkrll9v2zt3i3cqjbppfghtn9bdkqkby',
                messageProtocol: 'iyqseocuy16hy0yvg4umracnmshr164ukhxqtsyoq6m7hn7y3r2ymt0gb39c',
                adapterEngineName: '43sg7fg2rnrto6o2hgf9bopndbz8ty9koud5u7y3clomq3t14l415h8nqsxbilpagnzjlzjhbt6c1ld04cbol7zifg2l3v9my7qilgxo9uvmnz74dszuwf2j9jwy4otd1gre3jpd2d00eg6cg74bsllcdjxgm2gh',
                url: 'lbvf06xgeho7aotvq8rq5396aye59jr5dwfe333wgfmytvopdo3w57v6jjnn9j29o15bc5alzn6mmuzes438j2cvqwycbastridkrola25rbt4pmtg11v3m4f0i3doidwipjkdh0qtep9hdvf8dijlxpj5wvejpa4g5b6neb8r2pbtiv76yqjdseqs7s2ou8kayazw8u6ylwruf1tkrkj7s3qwhdsmsinzsisa6act2cl9fzjfijbtghtwwe9scu46ehvr41b0sqijgfmqeqr08iyjrexj1f3lets00flqwfxtmwjmn8b9eyy42lq6wh',
                username: 'qbm3vvgqxc0vo8kvjemevbqyr1ofdf5c3zdm89je7xtbwe2zqmd10c5z3aln',
                remoteHost: 'pg5yx25sa11ckxyxwv0d9a9fxw6hii4a953ixk1bftspide2e0h2emw4eytvg0e871lkp96p9vhdilq957httv3hql6ggrqwege1v5sdl195oyle1h1gti8oa30d9a12zk76qxdh2s1zxgd8cemn9llsbyyk34by',
                remotePort: -9,
                directory: '0y1d31cmuinkjvva5m4u8ns1ictv0w1u570icft5rdm2mm5uuiexgw5xvucp4we7b5t4yr8zteq6935lxjrej5ru69hrujmvllq2j0p6ozsmq4flws0a89hynxx7awy7jynbs2u3bvin288zpwsdao95mbargz9h4deu9fqzqwgzfkcdq91zw2xfln1bxz53gzo0l1clbg1l61a2in5oydehc9u8amheagd21q3bv6v4o2lbopwbeh3cjrd5wi32cbelx0rvkh88wxnv7ahh0jdci2v4xit1k4fbgvvg6aslvem1g0baq65uxdt0om3txxxdx3f55wq3mc9k8pz5u1q3r88tclc4gwzwnz0izv515kg61zp5zk5kmyyfj9ldrra4njjh3ovrkoyqr2i20gizb9c1jepdidnkj3ltbw8eyzwcnra44r0z144gwb021kle8b12bonsz874wt6mmbswto3amtz0h037nt13ssmk3tz8qr4liniue7ug49fv6rphw9lza2eb5uhbzdbnzrjy3mk5jlot4goeqjveprfxudcteh1qlwnec6q3r05ny5xl4vllp7ddume87au7p78q6ezlb09japntl3grvlzgp9ja8kwtzqirq3tqwx6eqfx48bus0vs25my1bnj3d2g9aielirenbqxydklzme26vqiq3bw7d63lkhkf3ymlig9alty6bf4wmtf6ygyor8ykj57el12sk7yiodn2lhz254tq1l7nhryo99w9eh0nn19b2nj89p93b8a26vjediyfy7bxawy3n0n8gxistyac8mp9yjbp2x188hbvh16vfl9gufkswarz3dq2uhqty0sz7zqn3je60h8vzlxo4bd1ryr71oqlxmg6xyjbshvikd0lmsyxocmprdwqojr4a76zwxpb7qmenj0tkjsuz2pqm21z3gfxpgckshhmoh12bkiun5mhkqv6obz717aioat0d1iiyv3uum6qt90ejpz8c9bfycpowc5duaw1682y',
                fileSchema: '73vtz83bricllujgg7y1qa18d9p2bfu2de3v7ve0golopoo1llityeic0j43ftpnmdoj7i5xuqej8jquqbtjvaoh1jtujoj3021wz9ynlc4hqedy8rapiw92yw75qbzocaz9maitsrhb4268ufavmgmj5au7hydgdxhtxbeaqf3m0wf6b0anoeje1vg2hr1pajk4l6wwagaaos4w8yg1twdd7aq1sikvltskxajsglfa3wpt1byp1kb8taadu3sjukj41gtc0niynhx0648fkk5bpfju9am5y2xcz6y4x5csgcdvun27cm6adn3jfz6oayxoj6nmk2c8xuxvpt1k37dc6h7ci2pz0rhx3urv2du39sdpo42ovpvzrkt1y4t66ngd04va93qbbuoqj1h2kzmuh6r3qo15zqul4pz7xv16ymavbf4vwwqhhqikfqp6dijadjhoxieg9rah68so1ov31zj1c2zul32eluigwxd22f0xt1sow8pl1vok58kl94limgnng2zdt6n3tpbnv69ro5xvbmyq6nxp4cliy53ehmuowh7gydnsvohou7gkcp972dxj019bqnlgrfzc7q9yt8zd52czdh2oq7186on7rgq2brfeqvb31zg7je1tyrneko8uc4e7jpga1e34z2mxbiax2kzexf5gnli6wftjqnm71b5qjxrvlb2w5x1xa8z98tju3tnyfaxx1ajqwu19d1r35p86degin773puq4s6ktoa306bgkpu7sw2x1ngzcf5k21r8nzw1zxoq8waggghse98kaig5ufdxtnqputypo84gbvf25uvzzsn31eq428g3gzrs0wqzxg8aw3tlyt2o4msnacoqw3fz3vew82grzmk6odkxoxfow07io61dsdx7ydqpq2u7boezfcu0j5jnaxs854bjogfhlfb9voymtd3cz9f8zcy9dr6chvm9mfyejqj0s7qxy1avft7wrpljpgsf5cv5iqolsfpvs318u0iumyux00401qq7g',
                proxyHost: 'pnqo4k6ro3m0umulxqdqqhz68ev0r8kma4p8n1628bekkv27i5yczyywxp45',
                proxyPort: 8852154338,
                destination: 'yyit79wodha209irpkk7bpjtkm9a9f1v1ra7l7k75l20itpcywsuxxedgjwstkm4tbgtfip884y2i7axnvg7uui2125fse0qnxhle1mqnja8ty90375e4vdu9f8m6jshvovclagcd98uelisk3kzajznwontvndb',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'un25c5myt7nxfkca8tk0l10fxvdhp802iv36dbkkzj6i0is4oqkli4s13cqftivlbd7e1hsacyx05anp520ybqtz04bjs8d0apd971nob8tjurhdxdax945ttgadxapus9so3tjves4n9aaz5ponzszuixyr51ov',
                responsibleUserAccountName: '9n31lt3q542liawng3wi',
                lastChangeUserAccount: 'fksasbh8ck5t77dpypve',
                lastChangedAt: '2020-07-27 17:55:11',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '46r2i1v2dsgc45gszkdx7vmrx0ijdpz2fmpd4lkyzabc65d5xz',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'uducp8ho2qc6s5ecwvxc',
                party: 'n1p7r7ye5g04wmmpcsrmuo52ozkc7k9orljpm71ydxi1eo19xe2vwsvllbna7rfto0wwnaey0loxj5xyervg8ss3wjm5o5zh15yz5jnmdho3aeut027ut61dukfq05b2guubrnextdznh4c7fktufq11x2dlwvkr',
                component: 'erbp9yw74ezvxvkxd2xr771ci1in68mbxus9a8lulaqfvllcpoimjzwlr8ftgcu4cbtug1mpg0qceovj1ks9e9v2dzfcvalfeyhxtbqiv1rf8mksvbe0jv21qkxxltwzrtbfquiudk22h8wi8k074kjhr9ets2jy',
                name: '2g6eneq7v9xdi9kvfhrh7rgnj13hzkqpovfx7cl5v4bmqe0k613hpdaa4xgsjlwjyryxn8tad3jdzhmqwq454xcrpi5dnn2ffpp5hd30wlf6zmoi1ejrsubv5oq9lm3ebpzxdrdpsn5osa1kfo41c0cmimp40a0t',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'ukj2xx0piyophrswezixen77g9ysgymgz1fgmw0k1cp3tvc1c2vw0ozsxqory6q6h8s5qjv5eberw6y3f8aw2wop593ws0ljwy7yhj41zhffudzzlqs4pwqouf4jrvrqkutwxnzrufkz6cjhlt7cmdm9qvxn13gy',
                flowComponent: 'nxskpe1g5oyie8wydse6smwvgfc054rh0ocujinidl05cjznlzuvy1g102zckdjc00hnj08yaw3zul4lnaathbzhitd0swkxchw4p3juoaivtx017fpfxhxaenqo3562gaq9wb9ht4kkm7p41fuhl0hfecjo4o2z',
                flowInterfaceName: '1lpege4du0x3fkwwj9lyq22qpa4v65lrkvn1jg7ggms5r52n2flv3hmp929yakufu9h7dkp9730mzwpj8a2v6wa3pj18a35tl9dk4s2wckzotzgtux39tkcuv06gdn2pqrke0ryov0corpg3spbpth9r9ap7ta63',
                flowInterfaceNamespace: 'uysiayvy1gsos7cgcaduaeoawuzx6iap25tktbvtcsjjaf8x15p08tkje0vcwf4woq11u6qcnz2c8oil7ph6zaj75rkldzpkn9st5ixo6dte28j0khgoinbh1wb8qikmo5llhynursm80ef2g4xcjq9jg2tbeqj7',
                version: 'ap6mw8kmqmxzn1auga1l',
                adapterType: '57ts8phse3n4a7ay8pnj2ua449o0blr0kn0l60trz872jhn8qtv38u7fsx9h',
                direction: 'RECEIVER',
                transportProtocol: '57tr7k20uyffq9vt7upxv078e10x4wh90o14u8dr83dq5imsfu4w5s77tbnj',
                messageProtocol: '9i6rzwxnk9kddlurbmql8gqkmitvzn0427slec5z1k7vg2cgydjodl2d2cf8',
                adapterEngineName: 'e1h8n1onzgukb2dtq4o7sefkr6xl6d1az5sjos72wfxogkkmn4m9q22yjl21sa3q8yu9l9i6hoass71hm413tjy34iobvsqjuyxnxalp2ztxnujhaezr8h4l2rvb9xlt7vmigh8ulbmxlkueiznfemt9mq0q2o49',
                url: '6pc1h0br33s7oca7v71t6ptmxk3kp08iwrenxb7t5qrnxwezv5o9djrat7peik3gl3dow9qhc3718erpo1qn6vsbfx4uw421e0k8lis4bleddptqmhsi6wiozkdzvqilrk8kr5rzf7p5zk44kqfptcav9t4mpdbbvhuyvlkd9rfpfzl2cp6uzduto5k8f2iu6r5aq457x9c2glmwj6j4rhmdogj0mkyp8j4taxkny9js2bi7f63d46kpff3zttldgifjiefq7ra6feixoyxnlqb4lme6j20m6raiblui7n9hk9x2qmv6u4kk5dw37wlf',
                username: '56op1rily3qd4yc2cfjlwj6mbfw7vyy4cpnph4y5rc2a6bka5v70fj7hs07p',
                remoteHost: 'hlkduoy05p18r27bse6x4l40kkjl0fufpdpgxstmo3haxhrm2o9pcuqqbk3hphqcxv46r051ycsab4l96nz7ivgkx5vhahymp41vl1v7mhduq11ima6svvfil983xxikiyoso39sy4o6qcy59vb9tfq96gsgczsf',
                remotePort: 5728004689,
                directory: 'ap6kpxdj317hgwpdqfkjxdr7xyy6ee2c0y7z1ig3lkduu852egeogl8zd2zpdzmyil74a8hds5goxvpbqlisbgwmecr0uaahb6x3h4yawpryqwn9kkmh1zj0v3gmv65s7n65fhnyfrtldo060d3p55g6cq4bwgh4kqgh4loum55yg8mk2lvnw165wb8ed7p81vkltwsmmmh26eadol9e4xyp4gf9gl8bir1y3r1hp64z3dve13ykpxroi8kxg3ymnzh9bzrwh2jn6cjhn6bh9in7yw05ywrjd0im0qzi8hav0iti71laxnoahyjgtf2xuxtx3b0s2rezu5ip6rurl0op8kp10xmormsip1iwjrc55gxttze0du9czje07lk29gwokrfv5i257m06b8nvgj3m2z7ckydn5u0vf615v39m4fxx9ehl71d8sdxzrpa2rt9ir90gvtjxduc2fiy8qn2sz1u2wm2tvj4o4s0vvosqew9l86c2t43cj3hxbtrxz0ss72muoth2fzx5npzic6qw7yjaj1mgii2cuh4lnhimqox1ogkswot1rum2gvr7ueynx1u6mwsmd8qqyp313v57qjw1jvs361ot5j8yovfs7u3d0hjgas15lw9jps7mea1mxxahr5mgnou92ukho9kd0r99frpi8hoafdohvsljxk6ushi26zfrqsmkmzztwoi3hxzkluzmg3zpor3y5m75szcf3nnle8iahxc7fyxiq2d5z35n3sh0tvkkivxeqenm6kjo53texsj1yqc6toojflzf1omi915qjgefhymigtp4k6jqo1t989hzrptuvvspxlezlpi3jbqbd6jidj3ldyc3s6defbbtakgup98i01y4z70h072vrn1te9xm7gbmggom9zqc4k698i8yhf33xlyfrj2ycdbdlxrl0logt2702hbh78eqyatol62icbsovgffpmdn6diyamrw3tbo5hg3k7pw5noi4a9rkuvgvqlvca2jfw8blfqxsr9w',
                fileSchema: 'dpjmu5km1808p81rwtxk5wmb8db0gert9qp2yl3o7rzsamk3j8l2izreb4bvgekcwwzpji73x2vah05jf8juui8it3jwg9dnvxc1vg2bc51pxjua78of6nxw2syekgk60n9ubl0q7ook8n054pcvwiwz9boww5cuhepnec8c6oxb14qwf55ci4ik8mazj60er36wx0mv953x5zhyrfxas3kdddx877bd2q5av6kl5mu3ne4rc1z2g3ijvv5utbzmvhtr3kmrm6bd3uzvoyh7h1fb5cobphif8gldvdhovbe7y9duc19crvuvqepriu0iihz6b5l0dvvfqffd37wckcm4xvjem0opue95do1v12mv0prjodq1lubwpkpaofushtmovu55lqxn7thrtwxuk7y9ooluqca18038tcjav4l51gjrnrvbldvt582xh0gy90hjnewq61k5d23cfyj1afcffqiv0wp42n1maulp22vsl1ygfd22fiqh3zr16d6kd0df8vtrhtrfv6ia23ot7mchfcrhyiihhlu1xdghmndah1tm8qqv7r5jys5r3etz20df132u8jcjawiwlg24gjzqcb9v25ozf4xr4apan8ze59yilzm5odsdbu3ddpaxsufkvz13z78jw1jc72tspxs23zm95sgdt8qakwcasxndblxcfnnvrhojxrkorlcg53klf48mmyu0z0q210nbkwu1j9ceshyb0fge47wnbnczpwwmgxxauwhcq6j9hqnbc88uik3xnl4a3ybmevr02e1qir10apajj4eil5nsjwemq3p51f3nsha56z2fw1pigcgy25el5et81og360kxxx3suzfn17p9l2ffntnz6nzuwmx6lw8oejog3z4xqwidsxdpsoqup6dc6c0kbdhfrhtyio6623rfa4z72t7yh11d5gqdu7kqd0tpleuhecgds2fjnswkwuts28goroyng441r8gat5lm6up8am9b9lc5qu6i13v2s0rkrgbl4tf0',
                proxyHost: 'nsv5gjn3kcmondwkjoveg7g8d76fsssccbqn7n3uda36h52ovakdfm7v2vo3',
                proxyPort: -9,
                destination: 'g3lbf0ni2muqop2eisn4kwh86voaqcz4kcbqz5nbv4kzqpz83gatyhl36ex3vwga7nqnjia0u298g34xqwww1lzzp4ga2z1wmh9fgy5xxh3vgohpghe862a73f24iun42eyjkwotynu37805ccwbgc59fmjulhvr',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'q0nsof6a05pwiy87orbcxcafdrtcxqq5bsucbo5rer1ahiqa6dxv024jkkecxylhmb8nf01rzjzw3uzzgilab1ygn44s5ptehoemq1ewnrvmmkjr4k0gxwhay4o74llp1xarlr5sl7jj2vvh4ujv6di8bghtq63f',
                responsibleUserAccountName: '9l3ksdlho1550yfq37rw',
                lastChangeUserAccount: 'iqjbscn25ckdpxj88k25',
                lastChangedAt: '2020-07-27 04:10:44',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'qet2aro1m17yvos0l07r00z63uqh27xsu84esb02vyjy6pvjd0',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '341lfttkccyey5ix1m8z',
                party: '2ufjv5jhr7nhh6oew04rf9qmyls3x1ylq3xufu273tnro0sj1blpi76bcbe4hc8uqboytaoyvspkje4kxuqqqohuzq4oxcg5btl7dg26x9er45r1w264rrlhatp8u4tsynbzkvv365f4zibmwt2ary1q1sq595ol',
                component: 't88obw7psteegfessyjprq1t0vbsixm6dggt1851bew1e9qw82zv6jfjp6ccex6trdz8i8x91tk4abgy226mge2y26fi1oz2holk0fnm1mey8ju747tx68vyw4vk2oy6dkxsgqw5adj1esmfwxbnqulon4j74zzy',
                name: 'ybj6ievu55pf1c3lefzojhbcxjocgml3e2173bo8anta1rz0c2jdee4ufpwzr09pq2dx3jm1i369vj0t9r5dngypqi710m1uxnabbfu78a49suhlsmnv421jeleg389e2no39hnx7ji01a16321kqjj86w633wz9',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'x6n2pxo7rvnr212pm6pfbdo7w4nxkocux9bwj2v9693hlzsbkb619un998mjwrrv5gmgdhhaop31fl1sstps7a5out5mym96q83krgt15d590j9rap9bqnsvx4y3e19ecj29uhbgsb8e79y4bhjgz4166lqh352a',
                flowComponent: 'pxvecql0o9kxknwo2wphwekhgcfz96u0a95bcejp10peasd8tu6sn6mee1ildmuhn4l8qz3gwa6e2ubwxvmy1lhrv86pdjstu1xlc8wbt4zd94scryuk2dks1o7yoona0p88zo03qpodfxbo8zuhc3lbmb7qcv2i',
                flowInterfaceName: 'eikmdgm7w6p3jwyn9axxktaazxvv7564t6n1nvlyzfbkp5y3x17jz1qmw4232ipj9dbar0j372ffz26u0qddftlaqqw7y067rutspafrcmmiotmr2mcmigdsabns207k9unuo30i4elqnuh1q68uej38lzmm6fi1',
                flowInterfaceNamespace: 'pm8qi4tkozl0kaqzxjykk6hepojsveakybkjixbk10bcg7qe9jrbar3042nkh36f3zqxl2g1t5p103xjkf3saruciisdgahpviys5l55xjywpjb4gjgm53kfscnndh0lki2uzjaxdz2yg14fw5rsen36z03gkq0y',
                version: 'j9o2asaxf0bn83i3ql42',
                adapterType: 'frhpsjpjsvyoemw19v3xzgyfessbt5sskqxyb7xfnyld29cr9epznxozspsz',
                direction: 'XXXX',
                transportProtocol: '4jezs31x61v0lrooxorrkmbgqhl1ukutrclpsvqol4yh3nexb9aobb43gmb5',
                messageProtocol: 'swwraxh8lz53zlt3ho2ttxmhnlw70ubjcv9uan4e6nvoim07tin6xlewe07f',
                adapterEngineName: 'o7i7qm7iuwvwtqsrqcl4y05xi9x1htgcqm4ukyndz25wpn2hik4h7kt39o7iv8482rb8l52408ppfg95lt3gdnxe7s6irejtcob98hnt3mmx5yiwyfkw7u78yj5nf32uarfe4049pivmk85iis5v0yibv7wmbqrv',
                url: 'adswgey0oeb87iako5hwczildb5e8zyuy3vks4qrx34jxt9q9kq9abi8vag76a8g0yepzvwykmisadighurxjfd7zagkh6rfoblmiu3xpndg65o54gqxkli9z0idvf8zhw5n0c6w7jdbo9uxdqgd20vftfy0gdh07pcg6l5xi4byeg12udvsq94b3iw808h3qjvtd9opbaywtibblb0ho654i47otvnb64dws0k5tvbhsmr7stoqtdgjg38xt13xe57cuw1ofrtvxjnyo58eaw7eezxyi5elvpkfh2jiut9vbymy2warxgjxnee6qpq3',
                username: 'l4hag6180eqneb6ekmaqqlie0puvu39jwp50agwva3cq40dgzvdkvaqyr794',
                remoteHost: '52fytlf0c70pyqm5nu8ilsnshhl3pvrwq9alueyhiy0mvc8p63dggx4homml6yj9vey5q5tvq0ujc5nyhm1rpgxxw93f7wolp6oxz3p716xrlnf7oopkg3r03o7vgl9dv3f7sb84rb3kasi0l8y4vdswxu3f5xwi',
                remotePort: 6320762215,
                directory: 'u5ptx81jkthvliry4j4fy918np9qt383kl5v10rus782ipczl4ggpwe2e2dyxni70sr0hatvixwwwm11td7la738dzhp3jyvej2jk9m6og3am2o3acmkhk1ojdr4cuc4fl6tw5kpzfgogtcep44uikpxnajurzzvaphwez13adowi282hgu071b8upkgnbu5ejp5kgo84cftlm5jyki0bjtz44hq032ysn0b8mytz510yg8q6bgi2n0365n1x2m2qab26lsisrbtrwzawe0ioafw30h2qeu6efcofr1imrm1p3p9bhaal3r3wej6koct71qcikh37l450zmitj3693ep1gypssxd97h193n1d3xqyp2s8u78s0i5wavceki0n3gqkquag4om1e1rrjjwpo4wmjj85n3e492z3jry72xn33oodj3wpks2srj6brdfqtn1zusyq8661vy5tc9k3jxdk3fhrn12sk76hji8rwbex0spxhbc2z8u0cj2fi6lhcv4kyn6csb9v64x7ds0ihg5btopsbtvlkhven6b1ztdai66yqo5xhujlfhoquq717xsn5ldzcm29imqhzgyav70ul271uptc275okc16jg16xhzbfx3nbec4vfgvj9i3rpz3ws01gn3ex7jikfidel88d0efglivkf7kc6xxdp7fbpt712h3ze1sine4f8gpwoyh4s4ejo5io19i9ukrz700iemdmuxnvxmh55xucicsbleg39q553nnvn1nb8es4r4kor87mjqt5cmhjd6pwda7iwxr8atvb1nk9yqlp11uwjbkvk7dtomiv5gr8n1ipxzdon1nddgx3u006ne1jyu80h2fjkygwoba808l95bnhl9qzrowz6t5ybwerb66b22idt519tbc6cpitsqgjq93n06lc1jrxf7ov6bzub2piqv9p5qlw4x1u3v5shx1nydus0apn9kthudli7hy4e9mso72umm2nvi8qc2jvnxs2s8xnfu8rxhh2ho7w0k',
                fileSchema: 'xr55qpszsabsg61t6oi9p7gsdqkxba1vpfsotfbpo6hyswgw40kae6hp5fbownboos4j3u3e8qyr9swwtbroxys1yqodz656zxai34y6yqehl8jasn17zirifdo31bx99i98cb2vrsyik3gqhsa4h7ih0z2uffrunml1575kozbakq8bevcp5wqxlv1a38o6y7kpht7tr456tcdf5xl539j0qr8o40ih566euqnw8ih8j85ys4jylq7ha1hl26gh0549bv0ixgylcxo8b89gesjafweqkgufuangxgdf8mo0hqxyictht2f14drq1kbgog4cnkztlwywumbbsrvz6d6crgln6g190i38my2gd4j2agfdofg71sa8ff54hcv6agd77d4pom66g1e41rarho63bvj0cdsk7u2wvpz6a45o4x3db0fjwkinwhjt4v47atig24nfyzs9jgiu4hwiqojfaagodq2jbtn1fz1x70i2v60lvid7vbs5zet7zf94lnjlae7nkkhbymsndxflz9phe9zw5wibw5e0kaaezy6hzona1ngm3ub4vn17t75tqly19zbx1lvvihb9rn8zqbta9a6g682jy0rqz9zf6uaqv8u4gctcbfjs6urltoq37y9m03jb3dwkh9y1pv4gou9ikajbwwu8ohepjrfprxl5bo4xjbogzwukozws3sp1h1ryqmowa89km29s4gcsta75oqtlvl7qjc9slmbkahzsqj0ei0w8yw21jyubpyzge8i469cyzm2f2q5iq685bda948x0mloa7ezl6ark5bnxfwgxtgffpbvtv7gf5ya2xi4mouw91whlr6hffmaguvtp6vzyshijan8q4erumeyx970pqlw1jigx7hel1fyniookvu2se7ku1nro9dqrmxngyfxpdvurvhdac91fx660ooxoyb2i0f2bk3weqtft8i1uhg795a1934vnls45t8zdyosenp2lwfiow82yjkxp6xpzm65w5dmvdbeqftjh',
                proxyHost: 'gejfsi4x7tatwrv6bjxo99v3hmc441jghyirflsqwelmhw1tlyn6wv39y17c',
                proxyPort: 9434774711,
                destination: 'tp9y9xpvypy5vkducu1kpetu57r2blzyogigs2k30wnqiws5za6adtwxrfkzg5uwgxzbush0kq3g1kp213t876ulrqyysf6d9655ciw6uwkgm658wryw6pcbnbfl64au41znnkpzzwn4645k973a76kbfs9g7v7q',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '8xi4kgxl8icolywgxz7bsvp9ga6az67txp46y2y89wu1lo676wt395weda8fphyqvm3t8j9tq054bggk28cqi0e1mf5tgn3xgtlllr4x8q67jlo5tcigvg2qxixr17b50l9qybdfnmayp5y0k51cemywfsz2tw4q',
                responsibleUserAccountName: 'xzxx961ewihj4l8cnbca',
                lastChangeUserAccount: 'evs4fpwi2mvc1vfgnb9e',
                lastChangedAt: '2020-07-27 11:59:25',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: 'n1r1e890qw6xip35w4uxzoltbcsb2btvpnwavjvn4396jga8wm',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'feper5lfpasfofvu7gwo',
                party: 'hsgvh2uk60zyw3ly1uahbmsx17xwagy8gnps8offdn9kqkzr14y9kx1xmsnhlhf0ixskyw2zd9a5z6zl3m37enfshf85w1f088g01cp90b2u0orbf0fwfrh6amif8si9zlx8rspc2tlhztn7259w1wr97v48uv0y',
                component: 'vbixwh703hwcmpd4at49jba0ovw5fzhemrs7clwytr18306mt7ht8mgrtx3ftubsdly9zmx8glmo4qoft8xgscupvp7as1zfwufb5f3hcj0ucn4cfbkjolhm908aa8iebjnuwnd40qkkjkly36uzoz1metmue3j6',
                name: 'ga58sct0pk3ctlz1ypbkzs85yetqe3821m2c5kepv78zachssbv9eu2sp6o2v7kiug3178z03zey9g6hqzod707j51ltfss116vwpela6n8pb391n72lxzmq1b3modz2rpe2s9c4yi2713njdla7w3ufhilo4v96',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'bo1b8x8zupw9g8ipebqcg3cndft7gx1mp0h0brcqjarz0xdj798ktm7snepw7m1qe7k9lb5qhppo5pbqyr2n8gfgkwdbot5ah8uti8nzttnnurjhi9tpzdc1h9z05ydod174r4tq7y464uzs1pwm76spid1s419k',
                flowComponent: 'h7zrw9l2w0w6xmhhijniyd5z0v8sqbbap9cp3hr9s39oofzwnzfwixs3fj9ui9a7c0lty3ybth14w052xnsbn6bsa5l6prkif1hm90p2pwr10fzg6d2yk0xo059l3gez1erf69lp0w2hzymvxdqwe9tnla6pj3vt',
                flowInterfaceName: 'xx1pi67pp0hztyal50r6ivjor4an5ohrg92vvam5m7ozavmisi7p9109nd434r0kumbrniju8uidystgr1a3x7o085hkeocfxb6ffv80vrsqw8ndrj26frrgha6pkhq590sncc4kp22c7hd6f4hl39zhoedb6et2',
                flowInterfaceNamespace: 'c6590gsc2bx5hdut7osx0akaeypeci8su36gel3u0alo0to8aqye67llpe8mx7359svrslhrfjlm1pup5wwqwgxy0m7hivzqp7cpgmkeyt8sneyqig1j1y2gibfj9fb2oo86ipveh6ve7ksrpfj3p2utl6m6nz7u',
                version: 'xkatb7zi2nbhyg5fbdqp',
                adapterType: 'dazqubb1log0tiiiyrl838vewm6x0jd4d5ms2x5wq6hsljcnes5t2uvphicu',
                direction: 'RECEIVER',
                transportProtocol: '6pu9u6lm5z7wwky0vbo7u3whhsy089e09n46m3t6iyv0j78rmx7l3vjirwqm',
                messageProtocol: 'hu5ent3uj69vzo1tb4aibutdkbyhf8g2vqz2p5kr3kllkg7rt5q0z8j9iuln',
                adapterEngineName: '07zhsfrafyl0t43ck6kvt304w7ts7kdv1pc6s3gv5x1li73p1ydo7pe7is85wk8qgzuk7u0nqv1gafc1ftyh4opzn55nvafr21f84zi1kvmm9pcl2carcj93zpofp91ys6fn2db4nqq4k5g31apd4mh6wsszafz1',
                url: 'rbriwhr7k4clhn0rl1h6fo6oe6be5kufrq3x6axp7mm7f4e3zc7b8dsn7uykujlx5h49aset9dsmw8pmr7prxgz53e3yrcvfuiy8wi4pgyyq5tww33x1pgio2k4zlrgzc4bx8m7b0ge3camlhejrtk4dtl24lozehw7rxecvdqeapz4ihlr48oe0jp0h0hgt3ig0uqhp85eikxfo3zve8c49tw5em42use7hnqzi0rp4e49cs3v3uk7g4md5hh3q882th3hszh695kbxwfytbw4jvbbk0wz5kz0zv6gp7nx6dnl5d9alh369t28mynhw',
                username: '50uffmdu7ndpctwv5hn0ybrj6xw9yw7qloswk51nbalr1i1vsu6jwwy1fi7c',
                remoteHost: 'obqhwfqeq1saxt8rs0f308uvf5udltjxexbvp1a08qwnelw8585wxt9fqdcs51yfa646nng3jzzo04wk1emq30hcmrkyj5a8wa7mn9trl98ilgllo3hpgjknjpm3pmzsx8kw4qd09a6gj9r3yjon2x6tl8fqeoer',
                remotePort: 2514670417,
                directory: 'p7njvukqsc52hh8ofaiwe4c4nhcuzsh2sd1gf0kc9tg7a0sp0ssvj1o88s6biymljq2bobwz3hq4p4ej1kbe9ba60ms0lkc02vvr6j5eb1rfxbddkalibvii4pmv103lhke3329bd120ckujfrudb411q76bau89uix36ds5bbggmfyalcgyy3gvdqcpaze30nxnuwgryfm60vjh5bkryrsjp3gqy4jx8z9fx2pb54fynbkis99hsy1gpykuds7twqrrziwklcuwn4781nh0moppxucte00bnf9deuxewyoafrcyeqzl8womazt17o73wnycm27d36wiytsy5agyyl8hheeho038xcbd59j48uslkg5kyjvjktv4ke38qj9fr3ud7j1fvpjdcpt5g8puoven9jrzr1b0gkr8i0e9zf2qubfv135oflgku9ecy8b0y8eh2hwx3xujf8t85h519qtjrr2x7hfebl7yo7k6uzkmmeennk2tppdcva320vazo4k97azfm1vbtih4ntvz2ygjc90p8vm0fixyo6qy5t6wdxfngq9bl2xao4ym8u0zw0ar73y80w5qf7ku1zxzyxp2fvkmzujpwaqmtotuoieph1140y9w9qqyvrz242wvmnccvo83161cx9tdxc6xfb7jphfcaxdoechrcf4p3r1tz44i0mrxyf026k6fhi5naijt200k45i4m2xv8wngmgmiq6k7c85uayeu0jqa7i70p9ra8syqpt5qmc3a2gfgj8nw7tij4kynj4qh01gt1v6kxbkh2fqn1ma3yzrqpuxrqbx9wmsc3cpfspt78x43qc8oi69at01pmu2gekzskmfn4op0bi5er862bfq3ybu8dallnxap1ad67pwdxqe4oy5ywlqmjzffiw2s63u7ufoyhxay51er6qbq0flspxnkejmamick9g9v5k0v25xobrd0vgb1pc8hgqlz7qs6tk338nes806zd5cw7v9u12r8r1ompxswp9vqr6857dqy',
                fileSchema: 'mt5g40oz76344y64es88se4qmukjvsqqmripmv34j5hrjf6zoev0b0gj7r8d8pshtjnfvz6bpzd1k5gjyl3o4c98pavs95wfeeqnk1yksojnlf58fkl42f3eml2a0247p02dr0aoq2b7v7yezzvfv5y5kvbnv8g7z857ktuzy0jk1zoj88hanus8a1v60rvom66lcqnxea7iq017wg4dc8nh6apb3c2g7hfntlp85gz7tpkmbbosoq3hu33a4d6o7t9h6oq3luinws4ml5oo5xe0fjb61n8orch7ecmqug6ovhcq8pdc1wvdyfstfeuoq4qu7rztyt71q3o2yv7wp8xprnj9cixqvbtnfef8uurcr5wjmv03c6o85o7the6vyjlka5feik427a60vzbguvc8tsak2sd4fo6crfyk9vx0ji27rfxpz5edpn4auemz0ioe0bos5f7vwcdf6f7woqv1g2aymz9ablx83msrhy7o5z8ur3g9p7vtlpn25wzlc7mtw8h6hds3jdza8revq6zknj7ec33fht3ff5zh3bmvyuizzhfdvbcnnom406iyh68mvmdgf24bgtrr2btp7h97odvzb9kire64zelxmfunh4d4qpd8fwib6hywx5pbj741rnjg2bvzir08vdyi9yw7bcp9ved31ezfnslfc8dbymdjlhkbuvn6b0q7v7ncl00r5o5klrcvh8hcmb02r2ohaqh79zbza76rhlbrs1wrt71gspyqst6465s6m9sfk2z0kfiykxin78r4gawn23gr1od06gk2sc314zof0mns2obplbmurdkk5lf38e7ra912p9fkf4os04echb88zetuz4yrj00xkip5ch9iadlvkz23z9y6taosn6wlz2jqeae9y5y5yuxp5zqrgfk0nueoh7amcfax2250nozvilht7odvcl6eceapmqthne7ccc4dcjwvlol2ydog2h27je1i5e0qoi02chvy4yr0drpqx9ez8akr1fytkpw98ej6',
                proxyHost: 'dw13ljulc9jtoxf7awto5frq38hu7fnyvlxvuyv6ztfiaiiehpjdia0gatde',
                proxyPort: 3036964626,
                destination: 'uznkvt4wwwscq4bh1h48ffj3pj38sdlqcyw03vlkc77r12bvxipp0qs9wcdugkaz5r6k261kyo30y4a0bbwf5zf6spfen2kkjy7gj095pbsmoxir3vzwu4wanjnaszummj7fao8vfgvslsdezd1chpyae990tl3f',
                adapterStatus: 'XXXX',
                softwareComponentName: 'a4up68vtysxhxlj0rvsq3g83atgytd508teeqbcyhx78td7h4487mzwxr0x47imxs2xicm2yyt8u4zdlir2qfoeosvrb3a3kriap8hujkinu35cdjl6vl7fgw1fdckxpi989qlwyitqq9qs7ahbjb0is6xr8aoz1',
                responsibleUserAccountName: 'nius0plxdgqn473fb19o',
                lastChangeUserAccount: 'iufqglt9qqxkmaowabjm',
                lastChangedAt: '2020-07-27 13:31:00',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '5ngfplq99a5m7mr4ycv5lsdxs1cfeerhvbejzds542msbqt1ng',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'lygj99jbiunr0ownwyqp',
                party: '02zmlnrra507jfln54cfuguj249gtuivmaacpm05n0pg2q4ks0g878q7xqihkz9qdajdnhml9ujzi9k43azy1hx9i6zauxvngoahdhjitag32fbiq550h6pt7t3k7riwawc9zaj8tvtz8735evx1bgjang26v3zq',
                component: 'go7942v0nfqybu5mc58i564jk5mhaj8q47gf8d8zagadr40d7vqizyrwatq46s8ttfufr12v3na5onlypwxqjcvd355hg596or73tfykh2eue1kujkxv8s0hvfjnbsv85lx038k0aoad7z2f5uw9f47rifj6mw1v',
                name: 'griqz0wx4fi3nnmiqdtiffb9ai1y5k08tcly4gpuipu28kwaey8e4v74resn195f5l14srfv98xbxgqokdbmjoiqnn3dkoxpzpfvoabbj1e6tt71nlmhp531uig2gmh2ecezjtbw3fxt4n0wnc095vs90eieqmb5',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: '7uh734aptva4bo0cvdlgfo9sq0rq1xost4d9lj90zh8rfbbvam4bzagsfs57fmocdjxzqtxdle24k4g407y9hbcr5k1bmz6827jvkzbtji7c7dn1iot7tds7656rzs3bsrb7ev2pqb9iqam6l0qhmw66m2ysazeq',
                flowComponent: 'snyfbm4sxfjfq5mzwfhde2wsthuxapjns2em1avc24d9z4ycszuj22eom4j4s03mduqhw04riihq1xm7l2o3qx9gabzwnf5gahteg2olpkokbdukj1mw9ldg98w53g8filfhblrhxajyzgczs1rfio0jt5413s0m',
                flowInterfaceName: 'ozu00e5a14m4selggpj1cbneal74lpcrh2zt1ubc13b03fmyl9r4u4wn9njji8ywj64w6uqx4slk7l0blqe6l9ydnntumly27ghjkioqq2qgu4fbles6v07x1r0izo9a92yl7i1z7adur8y42suda1p3e5v5cym6',
                flowInterfaceNamespace: 'mduz8tpvfw3vzctdqlemw2divutih9722zqlxwbb7youxdna29uohm4yi1mhm1tgbjbuwnfxjq3qmiu7a57a0xqdjkw9pljk7ejcfngwjhd5pyn67tkapd4nfcazlur93g7y97v6hyzrm77anrt9qcdoz3ls4dnp',
                version: '7p2328wzbejzgimb5hr2',
                adapterType: 'spibvko4tyuxsb0k0qaeguz6x7198a86okogmfrdx3ezlfr7sxec07j7rxpk',
                direction: 'RECEIVER',
                transportProtocol: 's67ck5ca68i2b8rksgywezmq17hh5dvjwbi07bdhnaxjfvgpy0a6n7aps4o8',
                messageProtocol: 'xuzy18op9u0gjxbj8d3mg65mmf0m3nod22awydd8s47f92qxn2rzlaeb796k',
                adapterEngineName: 'umpdjgck3au9tt7dsv49ooe5okostgmhdb57qfsm4sk2jrdrd7w8wki3wrutv7bnu93xot45hu145m7gfyr61k3lckekmgwptv10cwbu5rg8g24spq50dzzbgmfrkkjlm6f1bgycrqb29of6mgdyjldvp8wp04ut',
                url: 'g600fa2nhlm4xespfy30rof34sa672srns5o0ghcyrdyzh2zdtoa61m7buahj9ju9vuyaadqz6dryn4wugq7ove0bn05eb1xh6updr95ku83gunw06mz776lfybl58ngkt536wx29ne52731z9zeqpnq5kzyhwvkyi86w3q58fcdluzqax2b1e34r3fs45k7bw5raza349n6x4fekb3awjtb86mdlx5dd94grie6spa0h3sayci8aigsy7bxivu3dv8goblyuo2asnqe1v4cb10ptz6xclksb4ftbn4lz98o9klvyxgzpbrux2lhzhkn',
                username: '5c7zvs4ue3qbl1aqjf7nmcqof02f70h0gog0ke4cmok70v569vj4526l7soz',
                remoteHost: 'fu12ytqutl094q0ri3wuvhoxuav2bfhbwgv998cq548o9p9nv3cseotf6nxx5n13aji0r954lt2nlsd9qqeiujyfjsxc8fx72z0hwrep6hgyxvgx6c4vxei0iifp2u786c2suv8g8wx86dms0l7qyjkxqlvlgvnl',
                remotePort: 7968201633,
                directory: '38mdwkyo2rm36j7fmw7dskml6l3xdm1rslc7647spx4lpmm8nvnxklrbcjrq7ivspor7d3byw4eatvztow265ti40wlsklbmt61c5kzykh7vupx6x6ietjmvs665in5zkbz5sy5qky5k95ii3eo2vpsvmdcjpt5qbkz9e175w7k2tv9n70m5l8ka1cp7l0sctri65y3lhticny1qpo0wt8qworses9ftx97vu4tjs6nytjutuknrcl53zzt0w2ds4d4cn4zrb2irtqwqrteassx4rbk4hgg4hjroqs5d2lj5asjluumyylgbpl6txwa81ppm4kwe95p6jgy19y2bi8o3f7cl2wktl8snqq0jbb8o72jqi3oy95dsypt0j1vs8ljjl2nx2am8bun8krhbl7pwbe2w3o8tj3ip49b7aeybbvhgncvk5zinh8lnwhfe6cl14d00tcgt9hzwraksbx81y1abl52qelnz1zmzgvdsr1vmtr6un621avozpxx8l9e5mae3oi7kqi8ss0r75wrcjgooyyuek9bevj8r4cebt38b46llqpmdheasudm08gje29w9m68l37ft3a9y474r0f3fxtbmeidfw2mmzx5s95erlnbtseye03twsl8ht16vimw2us9sid1u68pg008vu42s3fjnw8uolxxlbr1lzwxj7xteungja0ww1bmyb57ncxxxiaqeubx0rtdtpugww8vo457p86rpgmoj9id51d7vsvni5uhybk36zqh6s7iur5lqjtatcbit2bfw2jrskgde4gbbwqt9i6dkursgo021gy4ag6nog9n32mxdonwjx5vi5zo60jsnclpd81d7nart3vo7b9viiikz3ftrjjr3cpz18bbn2nq4xc05ewa43qh6mqabn2l44880n7uvph0hz6jmcn544ruyt996chln4v8wcqshuicej8hhieb06m8tucncmr7y2sryb2gmqkjwzgilouhrwdsepjcbn52r8j5h1o524hfnsvta',
                fileSchema: 'zm17e4s9snfq0e9zt35y3003bc86e4y4fr69595kka3mww8p8uvsshud3c33phd1pjg4gtpx9sre4iqgjgdwu5fcxrcljdm2nehq3oktsq8wj9mfvskgzvxmdj2o7xlslcwf5nd4shd5adt3ksy1328jg6c9z3z6579cwbcijh4azf223hjexlxaka9ya6qax0i3u0bgfcuc2emynw5ttncu982xs0cbdw9s5w6c29bavvct06mduv3hwu3ik7oec34isieps7tjy8r3s4rnvtld2wxhpnm48o00b0n1pj8swd13nj1qyn5sygzp1k4hf7er78eiqxdvebvhmtlumwxhklek92s56jxj0287tsex8agpdudifx3rsmvsjnduh5i0mncrfpm7026lcz6blqz5nbz04uhkm988tbshf5lga3g3tz98warmfmr54t7ddkkns3r6xn9ljo0gth5pf2nzjaz3wxhzx88aez6khqp3wbv5qgf6qoptky1q2i82gwvm6iyb3pdovzht1gasfa7kh7vjq1g1wm505cg74762dprnd10abc5fid8rali3ny56eop9wj77yobb36c1rpepvoty13nv75bd8iuml3vp72w04hm9f1ycpw9fydaohhdgqa1lfdyb1pbhn4xm19djk28bwnh2olxg0tlvmsiatypyfyeqqv3dcbbjwxaxvq7h4opee2dftzxlmgrdouuhxludupxb8j8w9nel3rlj8s4v86a1zvov9l8ea902zbrv7d2xdqrdvvvr20bvg73o0n0wsr8ayt0a19bv3tif4k6x4nz7nuseh23lf2givr57jaoinxisaacthygrvqpvquvfncqbmhlh0hjzo9jdsx1jbxfo0r3b8fltv8zd5c81hksr5kcad7a6i98xean5k3mboupy63dbfxb3jp71q3u8f11k0e9btg5ejrmg4qzch22x19s295s5k47aev0rzxy2gj58n06ezdn8ie3k1x36gdoo6my2h2dwdwgi',
                proxyHost: 'qia4ndk54tuelcopxlw7lh0m9y16amtu9vp3jbb7x44xzjtrab3q0oedjz7n',
                proxyPort: 2396531901,
                destination: 'co47v00dgocagibs40lqrulwunxvbldg7cvxhnk2ryhlztnjjhn315elz5sqgaxn6g2w30oxxftotp4pjg9weg7pg4eghjwc4vlm92c47d9dx5k3rbza4i3wimh3b177bcv9g69mn3bze4td6mmuv43cx4ytoq76',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'add53h4k2o9dyv6e4c8y3rnc435l4lj4iehvnaz4tif08p3ek53cudrmi1jx2u0ojmtsu3drfocp4052auhxzw4xvttwri41yjdejo3yk9d7p4i6w8y1nmkktxbsfnxgn0ut8ynvzpvt71hwuwbmi1d66exrjzhm',
                responsibleUserAccountName: 'ko22ybo0adult8alqo1d',
                lastChangeUserAccount: 'o8539c014teaauem9c42',
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
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '9g5414dux737ocvb3ufshcshggi3fsd155k0znwnpo61yxjakk',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: '7n1vqqensqqigkdwxvm2',
                party: '0bbtki5nhuhtfy0ntthjcz9htgdbjo2jj3tmgm0da5gjq147fjbsemi68tzua8c98co4gfrakqbfx5snq8p6b1s8370vbwq2f486h4802y8dw6k6865cckfd35e3zyauc8pe0gnni4sfqvzy8f166pq1akvviacd',
                component: 'rxwqp96v9pbez6sy08v07p4v98yfwf65ymevjflsn7zbb3is8dh239be6jtvvc42ylobdyg1rxjf0rajfs802zk6kuijoelvgelmghlqfey217j0id7tkbliltu5pnbcu6ctzk8gurqd7uy3dunw5irkmqqmu1is',
                name: 'bjxtbmogys02gbogwrcp8g0hdjz6i72539g7tmcixh492c5hvomv73hn407kubff6jzg0y1wojyhraih205ajcfx9ym1og8m4x1ijjalmpflrtrje290yejcw29gv0qhpujihlverz63mns25p3basczqzvgo1gb',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'k57v8ontp0vkvykzy8nhucdp22fpevcesqt8aiz52791q3t8otaddeawuwe8q3nw218uzlusnljsezabw7ubfjg78mxkna2kk0gpx8fgksv9uam88ovmna1rzcc5b0i5szrgnvhw8gatnzmn7fxm191txv7t6vsy',
                flowComponent: 'zyxhj4xr3ezacf91m9ffppfh16vjawwut9fiey60ua2hmbmuf5ceyq9op37f20p14helekhfzqmn0n5m2dfk2mxnvogoodndl8kub4r66par0v10ihip129hfubkg8ahjpgaqu10ionn1zi57yai66c1irerqict',
                flowInterfaceName: 'spbah6wzr5p227647edmf4ar0uogz4z5mazz9uh3vhqlerpgynf77d83vaamhkp6vazape0u7jyagp1egks5fltvibbpdxbe4qwd8ntbttdz9935igqsehajfjy3z7x20j280u7al1houzafshm1socwpezcegn9',
                flowInterfaceNamespace: 'b6jsn4wf4yxzq6xff59m02gnmh6yv8taame3sqcy2nhsphufpf2dqtmzmba1f5w4co6h5njnilckt5dr1kkl8ijq3l8jtxtjbczmh4x1q6zeb6zcutgzlmmkdd73kl5138jr3777sl0pyiftd8jpc3ahibtmvrj5',
                version: '8vv6izha6zb4be0xbbco',
                adapterType: 'ftmf4e8vx6bnqhoxtsraei61yj8m6xbyra2n1edln2nw25ihotjn8bbseqgp',
                direction: 'RECEIVER',
                transportProtocol: '5eoa84yriugoy4c82gbj9bw5eheqa70pgfyweelb4p84ta7buk451szie4lr',
                messageProtocol: 'r5e9b5sgbb62tfvye9f2yii4jdx74p16o765zrksq4leif3s343z38izcp35',
                adapterEngineName: '1ga8beq58ve4uiubptd1h29r9bjwvp8fo3e47rwx15swzgjvi77nb4mww7grxfc12u5whb308f7z2t1v5sayz85ubxd4hh93tvx0e4fewt5tq8fe8efz554myno1gj37hhcu905x0s0kytyd3olzw1ljkh889aq8',
                url: '1iy2niizhnl6lkbbx2t1i3av6lseyg06vbntxqrp6f7toqofw1054523cj0bitfihgrh0ftdrj27m3r8rjevagn0livhcdt0frcphpv3krhow6guhpmxqsgyzsyrzkxw0ulc7dapvjdiqh80ouse8l2e1grrribts6lwza4tek1jt3gku5593bcq1isb2l8o3yc83mprex2ms69ooxt2d85n7is9zh2zt9q95umxj1z20ksumeek9w4nb99w42xj7jh3gl4335h1o80olbkfwpytrsza4ndqpyybpfjj0v0pwo2dlsmib3wumn31qgx1',
                username: 'c3ykd00mrvnilca01xw8dgvoi5t5py743dwj2rovbkw830spuvpe4fmmrb3f',
                remoteHost: 'u7gpzn5oeg7t5zsg3svarciydj2h0gjwg4gmbo7ilwfbngx7hm7k4naee7b6xtccp84fjfta4gjpssp60vki1cs8pxxxhugazfi99d0bawpmp6ouy7drupvc1iwoakvydwjz28eo7f9ti21y3b7vjz28pz271fh7',
                remotePort: 3677330263,
                directory: 'i07wqudtxz7bo7zfxvpy0mje8u6a3h6pfh6y0l0ey7b89m8k77c00evejhtgh5gdtxax5sqlu2ij6cxp3aq5i3swfqjzr2tid9ilbw4ks1es4rzbi23ibvoc0szcr8p5u127wipcgcdqivy5lvv0fdah9uszniex4eecisx2reqtp7gsgenbwb37knzzxk7d8g4xk2octihe5d08thx99y2h36y5ror8s2qoyjy0pzybvwmyn91thozwvw8s3h720poxfn0xli8ekmlvj65nlr1nmwxwozn4kl800kzzdc4d6dn01h85ep2x92robk7syd9pnaffndqexl4o1ol93xeutxgzsp4y3296sk052marnwzb24nf7rt0814kmxvj82fqxj754vewwkpu07xx8mwdf9q175x6acgjhx2w0evzku7j9iqwnxhjc4p83dvzvrnme1mjcrpwh9tnptbxtoraxl9l7yy3fh51vxac1ovdpnmdxel3s620rcqxxxfjx24suwzee42qw8nvx30ekqvgo2ckon36t9423c5cq892dkhxqxizt17efs8ut0vy7vz7klqt4temcz897ikmaxe6t6q19i0o2mxxzaq5f93wj6glna60hlzizy268cg8ulahge35l5v6e4dinkx91sie41m6vp1ym9rr7mmoxym3h5f8i2mhk0p7sn5qph9hbxf2yxfmtqe8pqzh9h4sqmkr27dthwjy9jdwsqucnx7q18n4707i1khaxbvwyf5h8mwlr7suw7z14n1roah3h4nvexyrc8y6rjp552aual9tee4sfmpsuu2wf3qz4fvtmocp0wpw7t3cy0f5854ovs9x2u3datvl8drjf024t5deesbplcsl2kl1b4pcgn25v21re4jvk8456ghtsknrsk5a9b6jgj2g8qk7ppyjc3s0g7ljdpqhr9j8u3u6zf0faldlkvzfi6e4xbhvquth44p42t8w5zecpzz7mm6k63kirhsqdj7meemlh6ucerfj',
                fileSchema: 'v18i9afph6h542l14z89nm4t0n29sszidf94qjrymk0myf85m1klt5nqruaa4nkh6qmadb00gdehy27to1qttscxazoq4jshs5uipn4ezpcuhlhysatugw3hnunu80imz563lglblde8t3jlj1z6kh0azn4gwivpzpy2yrwmfdpq6hzooix3hq95y1gsm64jp4e7sx730auo5o8wubtxduflyttn82iq8sueb7mhbu5qpebjfkltsh9dgidej1dryg7w0ot7j2se04v2fesvcmffpnp184o7jswwzt02zl2vrqr4afo3h26lheu29t8knxi7cq27xsfu3h4cinphlm3t9a0e33xtp1qi7wsx5ipekfhut1q239t4fsss74kro01yycjtkm5s8vwj25m4fob9o719whg2pefwqw4o933zrawc7fq2n4x0atomww5tin12ij8kvlfgz2t6gohmreswoexv71m22mvisyvsj5jbkvc7zx4pnrtm5amyk8jsqdc0u0dy4q5kbkio5hy6ioeb6xr7gad75w5pk1mevinsb9lceslslik048kci9w45rmnxnhb46tzqe12fl534gs0tbj9hmwgd580jyf16f05a716dt609g6vxsl7iczjs7wacu26ibinsl8djqk0zrl3nrkyw8izcsdwjtq2b6jlsuaoujwhtvgple1ogmq2lj930510ltrws9k4hq0cimh7icf0lk0u2s1kv0b200qqujd7wkn75ryk9pxnb4pwmwh62wa3aureiqgpmz8hs8xs20xjj895t5al5w2gc3jj74pssxrl1ujjscgqj88umg2sy0j880nsgh147bcs4yrfmhfblaio37k8h4xwvh5rxhh1gdu44w7ebkff1zvuuo0iyz3msixntzwawgwja09btvodmignn7hr7duonktdikk8xl0q52l9hoa9pt99m38irnq0l8fs9a8ejvhkvnc8lruknrue3g1hxuf3z6uvkw9odaaom24t3489osxa',
                proxyHost: '8wngurcxmpz5wp2vz8yvy6ki44d76h62018fitegxz7sp7tawjdag0pycrx5',
                proxyPort: 6849755265,
                destination: '4urejv35ux6825lbue0v5kw9jheak441oa1r0sw0ziqq99akm16l6bjwkdhx2l4y8s3gindk2ufhcm5pus1o1m8f8qlcnmbodxp4zdkoj6k9ig4bhokjlg7qo5mppfj9ryxvyl2nhrkx2iqc2vtf8s6ln508phlm',
                adapterStatus: 'INACTIVE',
                softwareComponentName: 'yiuppta42fx6jt2v4x5igybd69wbzr7bo2v4wj85byihfphzqhky1nna6jlqpecmvmy9tzaqao2jj08cn8teb2e9ujdp1upuyru5pcwcgd2akcsxdpb9mu8ih1jixyhncm6bvgk40xff0mdud2fnmv6rynppcy4q',
                responsibleUserAccountName: 'mzp6p8o0u4pi9ubg92pc',
                lastChangeUserAccount: 'id3kb92to0x3gm0r4j0g',
                lastChangedAt: '2020-07-27 14:13:20',
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
                        value   : '45432cab-3cbf-4959-a610-d4e20c8e41d5'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '45432cab-3cbf-4959-a610-d4e20c8e41d5'));
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
            .get('/bplus-it-sappi/channel/45432cab-3cbf-4959-a610-d4e20c8e41d5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '45432cab-3cbf-4959-a610-d4e20c8e41d5'));
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
                
                id: 'ab991c01-8f09-4dfe-819e-1941b1542cfd',
                tenantId: '631e70cd-2e1e-41fa-9f58-5b37ff1a7ec5',
                tenantCode: 'c1ylpt9wjm6gg29ispt25uyfcl3cge9w9et76qxgj7jp9aukib',
                systemId: '4ea18c1b-f814-4d80-baa9-ecbd397ac91a',
                systemName: '8pt0iwlj6l285gd1tsdn',
                party: 'afk9xgcnwa9jae97nohi2lwj1laxsknpe22wj3xttyz589ni4ze8a2cya12z3aqepbbx6veh11p8ezwo8li4pwr65w04vnb87h3m78opbx7li38ylozbfegy5lyow7jisxc8o5958titvqknfaaxkeegwbvni9lb',
                component: 'rtsfn3cq725ev3h94y27nmscle5cod5jv9w3qyzu15ajxyrmtyz0b6bj87z7iytk2jfbih1d6izbqc59x8ub9hf3dih36bbm0hyq469fwzcmmcf1a48o5zqv4284lg47fnhnmiil6akevilh57d96upe8ozrbhef',
                name: '00p1zmfunlqo46hm153r05ppi9fum1k02voc6a14j9k7piezeefrud3ceu2ggvpsk06k1437zjc5ameuv15j43o6wiy9zxtpue18kt3exvv8o9fiw3p1gamiwdm92zkgby5hv8wiilq8hb46gbsy7qeoejp8uv52',
                flowId: 'f5b11986-98b8-4d6b-8550-540c7c535adb',
                flowParty: 'a7pen78uq8ngg4vw9846tadfv0avt9oc9ddpm1kv934n1s7zj05uaue8nwfkj4xmdum0p2qd1p0kmsul527rrddu7b2amiel9k39gy1ey0goyw5eo5rs0pjmhm0r59th8eo3x4z0asiogirn8nxmolg1t9mjbm46',
                flowComponent: '0qylkzigayfufctf48717ux5x5s760n9wzm1cvkggs3ikxcaseg4j57kk0ym8jkjxd9f91ke6yl8cqdyrlfehms0c7qwb5e8ypf18rayh8edutisjftduyeocfcp5bn06jrn96fxyx1m5adkrl8w3e204dp9n3dx',
                flowInterfaceName: 'ze0w102092u93gu0lk4ytxtf0ntxyj181so19hsqvhll60d27m9w1d56zfh24xqfcyf5x5ymsurocmuzft7r0cde1944590k6kjmuc6mwjr70spya60yey06kpsqzjr4n9ho9qr1nvj2z9xu9wl5gshbz3xplory',
                flowInterfaceNamespace: 'hq9r0i1gb1vgn4js5l0bewyf1jelkdany8lm7vn77jzreqvhb2sz0c4cqfhe0wap5von74dhxuwedqwjgwqw7gfp76mg4ubkg4l70okc8rn634qrtjeb3q678ldfja0y7vxmbu7sovf9sqc3isepje16wmok2jsk',
                version: 'mtsfsdghi8j1zs5bmljn',
                adapterType: 'dcb4am5hqhy3q21mlnxc9hedjt5xl1g7nund7zsa1ax8em809r8b8kv865ed',
                direction: 'SENDER',
                transportProtocol: 'um69o3ojeolc2ho0f8qjjk4iilsnjwvq20dfgbfn8csyqt758axr3qulgw7a',
                messageProtocol: '8ny3k46jd76wo5ogajuyrqaz08issc8bavwa82p27rhx70wsejj6s5aqq5ch',
                adapterEngineName: 'x7b6lpimzouy8xw9rj14ndc4yk0k8d8zj5zuymjiucunyg2x9fgwwffgbkr3r801tsxnnlae001c6t720swo5hg8y9x136zqwpxm9lasq68d3tgeb0wtasig726hgbvq62okubrxd9r4f2rbu6ovwgyj26kbyky2',
                url: '2nphl3ordmtxx4fs6w6amirly3yn2ticmr75xnt4ptkcu5e3a8fhwva67ppkb43bt0eo3io1hvk7z45mv8hderiux8d7m0i6owl38le9gx2h8un0oyi6ciwqlr88kk50yy1cqlfvcryjd919b3eyndzxyz40rhp2efqfswdp6r981hto1h1v0v5pij0o0s3mitpov61if4p3rhazqit80be5o1xhekdudm7f8p0gow8pr1hn2v278sve45yg6euzm9hs648zd3izzt3ubtiy1r7l6rpsxhu0ht15kzguzvnkqtvvqvqjromsfdhye4ho',
                username: 'vy8jl1lvh1iq73dx2hsmr1vzb4ldkwq9br9c208c3kh4jtb914e4v7mpu2so',
                remoteHost: 'd9rb1962kbmdsztz6dvf7fj9s7562xwqyftw99p5la4tx6fugx0qeof0v8h1rwumv677e9c1c0dtu15z0chq09iaqocf9sf0q26t3mf82d0x21y6bpbfwovqhory4t08n2yr1cezolthe5hdpbi50fhgtmw2wgmg',
                remotePort: 9005535082,
                directory: 'rmtso18rirzh1du9tuegb6adadggef2n7782rcybje9713g6nue1kon9k617s85vw0xlb192ir6un66zkpfftxyqcpp2td28364rmcag0psd9e2zmo8fsl023wcvh2ehsydztm74z736sb1cq8emky9du7fszcjflfpazs1ykeaf9yu7upcgojhx3gwviuzq7ufm6to8sb1y8kkfsmqxrimn3h8azrjd4fdyqh75pwllxccv1b0dp42buw7likcp1xusptwhcs3ddn6a6dhpfjx7obgtwq5lqefniunxufbj2qvgwt0ebmyy99ab9mqrynbznwi66c1216xwegar6lgftoqefwhnbg2wn4wdb85imorz51nipzogr8i3jmtjbwb4p6zrhg51mbsiblf3yu8fkh9qpndgskumn9ac1ukk3t6taz99kez3yjhbxadnwsqla98a7rxmjfuchju9gp1ootdzetz7glwh3afyz081ie21yoo92amokxd447426x2he12tpdwwdprh0h08yvqxqbonlt2m3m7rzl1fu5uzjew73f7ge2kmzm9oq8ghvhgrt7go98k4lgg98jxqlzq1e26fmd81aek4e7787m9bffbyy9ixo5pm9n3nfl1l0r4ev5dspi3r4m72b00p87h6aqvqk1mqkm7xm2redhxkunnmv60ql72obtb3pip2hcwqxxwkerx6honla5krjuapeuc9ymg8mjz6ylh6s203n21bbfxqqwdk6yvxzie3x2btjbdv9e3hhljxg067m2fwpv11u5re7ze6hjr3aelih4q8fsiez11udqjfxyyxkeoovrtxj01zvmkrm76ac7wc9jxpb4iaddcxfraa64c5k8iuprneo3uv4kthz9fjjz147do8px2xo6tfz5f13tewc6sevyxbk0xz79pblwu3y9znvzqw458zvhggebbtah8z646pegce7bhsj2qc19j4coozt74xs7yppmv272epv1fs6z61zk7jm5epw15z',
                fileSchema: '152hcrvejiq8dk4a7f2m4dz82s2pysugmkm6uqv3q8e87ifl8l59w962m29fqi6cw9394lubh2wliqdp86oyyvvclkz1syvh32dp7emgfmqji2zgr3gzyyrhrp14986byolp5nzmxijn2dpi91pbeqv3nnv92f6sjakqt6erdvhgi4r3midtii4j7hd2r7n3unegh3mf3d23lujdi8fd8g85ez4ytkzbucrxclv1f5iiyqw9j5yeh1jgpfeqnwi4hy59gub0cjqtavheby0mjv83heumehht24fd3ii8vyktgycqzy6r2a0ycdne0tgj5a1p219ydyenbep9yxn3pi3u23pcoxkmc13onuo99vckqget9p0jmzywa847tbqsxwa3ruqhdpmibi7mqzeqpdmo8k3x3uxskeeihup0yr2pntgxg9acez5dwiimxof2kt5fwjpfn00hxwxus5j4zy5t06u08tjjursuogialdhhbezy39qtd1w7goc7995fh0hi9xkqd46ocxmem4v3lxpio19ojg28y7dahyqrjtlukdzpnaieuotgseb83y8zugnqet1an5f8lp7g3s67j6bsk9ezb8bxs1woxz1m3aysju7vrkp84bajlc4n4cmtu4ivbkcfnppowr155736myfslwr6oyt3nvklhqokbyjd7ak8dbw8ewoi7ckb3bbenjmfbi4x56fmky15bb822ecwah99m1jpoknj87zjh7gnd68za09uizxeoruw7fj2od0mrl53yb6m3p5j0rhhwk2dvfn3ha32hlu0ofs5nz5jqsw8fxdcqbxkk2yb73yrpuifwkk1ah6mt8k3yd1igzyc0z59ljlm5bwbkb3ygj82fy0kqehv9ps127t8jktg4ey9w8ndq88l0u6sxsm25fop0gq741p1gxclylq8o5x6l7m4prq9mh6nj0nrgrawtw6y1dd6pks6d6v34rnas2mo9qv158jtkeoykucykfages752uds42t3ltco5i7g',
                proxyHost: 'dfvevhg98poqmxeneoeqb8485z1pyrp5oksobfshxjood1hpu8pf9w5v5k71',
                proxyPort: 2274348284,
                destination: 'ot0mn00wyn47g0i55kc733arsuah04ufouexybxz3dz634ywyki0uwdinwcl74q82tt2xkxumpn9xxqztyil0l0rri1rak2b61tbiownrtvluc61x6i8abuvvt0lnubs16por6ghuvje2d8jsj9m4zkul68tg1db',
                adapterStatus: 'ACTIVE',
                softwareComponentName: 'me93ul6ly0cfriogmrm64jfhh0q1z3o87txreq3h2tu0rcbsesnmtxx2o5rkvu3ggdz8q4j7x4ior4ib8kgh49ca93k9yilfip8ojd6t59nic3l0f21ujsdll1cnku3n47pjopwiyictqq2nge1h548nuyejhehb',
                responsibleUserAccountName: '4gdrkws7e3fn7s0d98va',
                lastChangeUserAccount: 'ff8bz3uhns7yc7ekhq4y',
                lastChangedAt: '2020-07-26 20:46:17',
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/channel`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/channel')
            .set('Accept', 'application/json')
            .send({
                
                id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                tenantCode: '03gsyeeq4wdew6c58n0n850qk3fori0eydcfbyjfl80p9nsr5d',
                systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                systemName: 'u7bawphet1ps8hh7c2k2',
                party: 'smgh93f7xs6ngxrllicoy2yaoetudnhfpndcvzk84an6zb9dsqm24lgen67z2pibyzbeymxbey3chcpmf2rdzs0ghzk1zfc4z4tgnkcn2r8xoo4ae67iluhv6idgr2w054cl68lcapt6r1qf0hjuy2jd8be8nznw',
                component: 'nbr5jz24k4ixf9sgwv9g7rrbn0g4mhnkf8l4qklpiwy5g0uxqiu2fi2itxmaxm1rmb5y48yeveqrk8czwqrswbclob9298emjwsgrlllzjm6v2khx39kme3ri1w4ymda124bx6oiz40ugd1oaw9uo6ops4kx9yye',
                name: 'kdmww4umdjgwkrmr880wjjxkev5uxf0x51lgvnt11p9fu74u86knvtb87unl1tyz2m04hfk35mcbxe30nm6tk6t2msjr942d7vaifdojadpmpfzsbubi4f2qpk1aasnc9qujkiomgtaqnj6dq97sdblxsp3zfuz6',
                flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                flowParty: 'fc3xbys6p67f3ex31a61eba522bnwnutbwdgrzq0gc6vvyhz485p9gj7cgd6aby8purjtn8pil9hj0fin74dtj3e5ufejv1ps7zsf9jz1zmlk4jqjhfcmb6r9xal1jlww0dth3etaqsw7nrh0za76r7g9flxa7bc',
                flowComponent: 'v4k97ntpo8dny8dgyxsrs9gkcrlmurvwjnvjs8q1vpdrt1pcumf57b85zwau15mjgwutc6gat3fl5yyg2xz9qgaxyie2wv2u0jr76iw81cc3i5q9nj75pkine4cwlahokoliv2eopug39h2r8jik6o07ooqi9w8e',
                flowInterfaceName: 'qe2cmo9aebif8hex64fhap46ifcwczebtcipvtqe12l7s5pgsq7bdr4xilitn5uofq8eduf61d5u7cx2gfz4nt55mb6wxo0bgqtsj72w31l6vzzh70k6wyw4sqng3trykl542ukl7e6tdtht7h2jh8ttwuu2n5kc',
                flowInterfaceNamespace: '9126k3l9wp1vbbav8pukn5qrgkaiibufv1w4k2eggeoohm0mn6x0o4rpvqshohjd9541v1wxz3vwvzt4s9ok8zpxx6rqgs2xl70p6spk1do2un1v5n0wt0le374tbiazs7s02z2loukhgk3ddaurdhhkczqpgrf1',
                version: 'ol4a6hnb1x5w76sbpbvi',
                adapterType: 'gyg8x63fzm28cs7op7jnto7a3xmdgo4xvcz3n3wyghei42nr8vw5npvbkbtk',
                direction: 'SENDER',
                transportProtocol: '8ivxep1cz99b231jmmvk1g17959pbbczuglhy9nphr1w3te73pb0od9nvjhf',
                messageProtocol: '8kynrb1jho2fl7zgbh96su6qi1xf282xhx9tl3gzj0ytpebt7jd1htm3c76s',
                adapterEngineName: 'b1rv02qmvgvegvrdzlt7bdxav54kcsvw35ogyzg3qp0jfquz8lwta28gz4gniw03z36nr9kyxol74gmw2pw0dyipkj01x7xnkvgyzs5gxulm3fkhp9hea38m0zyitn2haqdszgtqp22wfyi8tqwr0tgr0opkecz3',
                url: 'l4m9hkctxqk7vsbvgyzxhzr0wwn00kt6ibpn0th2uic1eft8z7934synmqtynwzh0r8z0hasuqecjys9mqc9ehvalwz9568ub0qtwok2x3s0bgc7oz900i8sdcgcsemtlwf4gfmiuu40ofntkpq81d2oymaz4wgyygan4uz01gs7hsyzeytfrk4vd0l9606coeva67vyd60bu2vimwkh9spup2a79vy38e8osnph44vbfck8vygxeg6cefdls0fln5vzly6ov1sph98pog4z408rs5e21iumcab6mvuqljpvot6ysu2i2xvjopw168go',
                username: 'u7rd0e57gfecnctp5viwsd0ht4vd0pf2wfbrz54vw5cn1lw8mx4dzxn7katy',
                remoteHost: 'fhhap4pzqy2fiylv2l4kn3eqcrvencbqs1887ng1dgkz79qn07xi7q6gnjb9lgltp9eno7fiku3r37ok8ithyklmmexe5o9b82mmsml9s8ddvju0caydz0fy1eacymfq2cowirobz0fkhzpw2otif49m480k2hbi',
                remotePort: 3827695338,
                directory: 'rivnlh1ktev5mmers6r7arcdg6cbxanlg0vv5lvybtjfa7zg1w72e2n45ddyo60jkadasw2pp9ee3vr0lddcd5rg7dehsboh7r7mk9833tsn2pzw349xq5w3b9jq0s382areb802p8nejqt0wv8ybvalngqqti5uj9fxl3qlmq2kugx2akf78431i2gxemyjzcd2f1fax7e94lmsneictvh9t5pafdkvbuv31vnbak0dh9t8k5b01v51zc2pssnvyq6t4bl4dary9i8x5x3t00wlzkqlst1jginyerzwimbwz1ocuqupzjdobgb0olnxxrjc5room7155jclaqmr6jc99wugc5aynokh6f93e7y19mcenja64q7p48q7voynq4cxwjofvetkikpwfpp0nn2yve9optri5p5uywuy2gc0a4ht099p9k8nca9j107vg6esve73yvlvg8x9jyvlklr8cpal5v6vbzn2novlsmsfx7svv18e3jkth73e82vqrsk7hrd5m6w6fghy2y41qwojixkb457vfym9vqrd05hq35az5m20yd46rmdvv27e9pl0gp1werp47qjwa68zl45s86gfj7abu1qw407sszk7lf8m76zwy5jbja08z6wzpde6d9otnjau1o1heamkn0rhpquayu0adutu6jnei0jxafddt6orf3xqobfpket3s2rr74js7bk4wt1533t4kh7kegdgs5e1jjt40y2ubfgmf3vy84bke1dcom938nhg6p8jqlsqxfeek4a83at4ao0neth7k3xuxuk9fv6qf1m7pxorhri93ajzuakjhf7re8rmav05wf3by8cxnvjjfrh1sx7seig2ajtcd7kiun4an6a1wdlfc8x2j71r98tlshs6d8bn1g769upnm9ra4h1bl8y81ymq1ks2wjvlzkfgom6qei3aessqvtnry3lfyz83akp0f32ii98gdtd0zmlxgzw9g593vcn4tud6w52gi31jancl9c5ufti8dio2',
                fileSchema: '2uwy1l6qpqfu4aiq950c2odqgordo2a94bbtkgy29pnemnyt7y34hc0f6p1p0hym25bhxdwo2g1votvsvlwfrmh1nj21ww6ze277qy2u2skdo7v444knzhtitpm01hld5ns90r8bfi5x9c0j1eyw86qqlso15yqywedqdq9nasrllk97c7jat03x6bl0oyk3v0zaopn0nv70tiam48g9vy6g56dm2v9uy8qt1p8gupjzk1irp6avvzsxco1e7wjczl926dc4gcl3d58ebfk15a8tacmmetz410scatoxize832sud47f2smkkud95nb1os9yy6t10jthysl1v2e8qm6e1scnnfttyuzgtopnrwy5x83nbcqr2j774cp6q4expfmahd36aibltsq20hhp8t84077pqutkw5qpfoobzit17guu8byxvozckdcwt1sfw3n126hjmo8ytzmve9ii8krsrb3evzaucn29umzegkpiyxss15mm8u4nef67ppx085zqpmi80wpuioq1ssqdtnmi90aj0lmv2eg1q2plgmvgx1bik57y3jt7cb3pei069hcagigs1f9yz4z2ys9jm0umpx81og2maaj9wbwk8naz4owmfv02rk3onox2mvq277mqm3p18fue3stfhcabpt5yiagj1c2bjisj6uiujp2xbyw1ojlkeurvej0z9gyk0akymayb83o5h0jxuy9rraasdmaynt58k9y2jwtaol0h9j66fexou1qwi2znw0n5s1i85z2iyjfs0np9xxh8c9oktmv6m1ldsagmci3jooh98l4c2t81xbzt5bjoqbn0xhkwarg3bslf63p12yf9t2dacan1nblxoghn2bsmgzuse8tla74swne4kty8m42gxr1jjbrtqv4tdarzmtpeq59nziv7kjvlmqmxc0ncvc8f8vzq90s1ue4cno97y0w6hf3xil0i385oppuxdp0l8ucd4er9obsd9dw48ydn91lajdwzgw5yghz4vvaay4lq',
                proxyHost: 'gy4osd037fykq6b2t20nipqq5lajcjtlkcjes6wybih6fjr5mr8ty5d5hgb4',
                proxyPort: 2242321992,
                destination: 'qssbwsatwh3o2nntg9cl6usl1xs0idtn975vs0na9gkbc05vs2udajl4rq1oeja5m47dmyfb83u39tqe3g7crbmk6tpu08c6jwrbvhi5ow2zx74bcbnadhdmducekl13wzi9g3jk3mbkr70sbdm5a79bxhbmaemi',
                adapterStatus: 'ACTIVE',
                softwareComponentName: '0cngwx6jldceaeh04arzpnjmaxq3fdps7suaq90v0n1bupsdelebb9ez01sapv13xu8rpjwimivzkruhi6gsrtrqg4bt1334xcy6a4lfop1wqq6661jmy8plzomq4c5x0hmqi6mme4hdvrnp8q7zqaog3trzges4',
                responsibleUserAccountName: '4zh6lvyg3rec8xu4d8bc',
                lastChangeUserAccount: 'nu6322olqcdexv0jetoj',
                lastChangedAt: '2020-07-27 03:54:34',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '45432cab-3cbf-4959-a610-d4e20c8e41d5'));
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
            .delete('/bplus-it-sappi/channel/45432cab-3cbf-4959-a610-d4e20c8e41d5')
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
                        id: 'd4f80726-ec35-40fe-a26b-a214fecdf140',
                        tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                        tenantCode: 'c5u2nrggir8g232wt8n5tvyfe1abzf60wpzyqxtj3k6msjfchw',
                        systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                        systemName: 'zqis94hmjm4wyi1yihq3',
                        party: 'r9k2xq8o6q176oeno5ctn0clh31093k8imwyvcfow6dexgflbnxz8qci1cqi59idmobeinn14fnr8z2ovcob4q1huohmplfapme1x7tnbql3937rixjfr05jnx8x6vqkjzxq9bzytv55v612vp0mgyan7zwpgnaz',
                        component: '4n8hu3pna9lccd7zlu4meltal71qxniw26zod2i20k2pwep2m8f12v4bj0dqy7dcz190gz41eys7d07hqnwict6h73wb8xfb9vhrhboal7wbqwktt2p7zj8g8yryeddz6kbdxble9pzqucxx7hplt248vzx9if63',
                        name: '5lw1jnq5xx8hrc57pv2258ydk9bfoxd7hzfy3x2am8iol9ywlhry9apzzcmwwmk1r7ze64g0wbuiywtav22dkfppnv2cfyhyqqzds2rz81gdsp9xqnch31bawrb548iqidr40qnqdiav7r97l8i9nti1qrzkwxsu',
                        flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                        flowParty: 'tykc7zrb3lmchqy3qzucedbu6didfvwuwx898e2soc9qzqmvh9p3daoldsrwem6pveuitilk71qiaogdcn671ln2srjbbtfvahc328u95b1mn7h4qx5714l0430q1zwgxhur1wt4b6uddk3vlbwkw3ng5c0ll0u5',
                        flowComponent: 'w97ibv6t9ztredjhmwtb08ynjaa1asjkck8dk5z2jpun5ruwdyw8iavmqpanvykc7wk48bgb1936zyu52cf8ewuqbg2304esanogb42xs0jgirbucb4vwwniuu3lv8ac67wgq62pr40b5z45v5uxlcjnte64zr4k',
                        flowInterfaceName: '3do85d20k8pmaxx98autp623wr10t4ou2zacnjtedvykqzpwizboqbwjv2n6l9mtckuki0h21pux5xhme72f8nca8ebf05hc8m125sap14n4xtfecz7xx7mqvp1oz86ph5ceyjyfrodo0e719ovhasytz2zfhp5p',
                        flowInterfaceNamespace: '0umitdpgj9d6jh82vhfy8eq5ib2wbwwz6eymlslmd383rfqu8xy502mgnivlyktzv3vlh2x4vxlfmfflykesmu56r9k6nfbjsxql0sh61gcv0fzreztvyt56h8yays9qj9quy5smjsx2mke4gv8gtsuaovqg2vs6',
                        version: 'cnseuyq1j1m3z99wcydv',
                        adapterType: '5skeifyptpaju0y1qixd69qpq2d309gbooc8pr8re1zmp7ueqebipdwrvoom',
                        direction: 'RECEIVER',
                        transportProtocol: 'ds60e4wrrmt8oun9826i5wpmkq7ex7m3j3awu98vhmdb0ig7j1qz62htpnlv',
                        messageProtocol: 'm2iltw172vgfita3fxejuqh04ncgqszrdy5x37e9kjrswiv2jsqsx5yqqp2o',
                        adapterEngineName: '0ybw1vvbsco4e76wplp0m0ots6jaev8xe769pp2hy1kkm8mo8g7rcj0foz019erw83kge0d0tjkq48qfi9bkr4v01338zak7sko3cgzmoba4asgtlz7mrgjzbqr1irzhngnyclhenosek9iyir9pvs6zeh1yq8cn',
                        url: 's1vhcegjnucy8l2y4i65tvm1bnqj449jg3hboipxemjd8azuj6w5or1mb10zyahux8m5rl7wldk5zl4otypvspv76msl9jvy59vvinkdta1mw7y29ep39ua4ye9cut38oxw8lutaj17s16sei6fzvx6jmfduz8qsnljjhq15xqos8imt8bd0v5rgit0e3svbdp7y01ssa671w2bs8zwiuubzvjxt775co08r3llfxfrjtxa7x3u8r4ncut9rpqhcpzt58bn3tfwgtfeno6tyze3ccptzyh43pkwnz8ehzmrk2bzgme3jhue2y85j7end',
                        username: '779ic5we6nk1tomig4znidl6kyol5np1jc86vrpf01o18w0vr2hx2cquxweh',
                        remoteHost: 'dx7py22qi9ywquo82tfuc3igoxjgb010qsleq6bwgi350d1b127gzxphsoa19xh506rbeqkg69pmea9ubia3dwtdrejb1izjmtldysvrl42jtkmdxtt4b9lbzazqdu4ibddyww6un9z5j9egm97xsiwtptr6snc3',
                        remotePort: 1579059688,
                        directory: '4b6vfd54zd6a9illpqx5df9li6ewtbx72nobb22zxfrea5htziex3wby83qf1vib8bj8ojnkfhg8zfmpzy319m8isf5qv9fk9sf04jgihws6q3qa1xm1a1ti27o5qwr5abgpnb6da7985vu84sx2apew6yb7vv4kzs95vne7yaeb8szsua6jbwbdehthrxy4nymsviej6k8td8npt4wq38c6n1yxirt8jy2qqa2xtynfpvm9fzyq4eitwd97tbpk2xe1mmv9fl29vggizhvw5lk75b8kozgw79o09yu683th4kpfcbcppx66mo4frcxajqhldg546fdbfd4fbcpbnlw6uyxnb2drmrkfny6ltmrd4skfgl10e9amoxeztfijfno70dq67nre23kcqzwarte2y6yncwn6cync1shbni9yku4iad3geu653a82ctxyclb47lq30n3gen9feyuiz9tp2qn2zmr76kgjfq2z24puc12qmhhln0dwxqv30aui3o3ksilkzl6mgpcrqabghj6o2x7n88flix2jtr4h8bmlnpell5v4aswucxhldukksvva1csh4v5ntbgl3j23fz86hk0qg8i7alz4uyyrug853hrret9yqp3rgzgic4xjqj0rqtvshgad75rgq7vg66ayszhcr5f9mj4e9mmhy4dk55eypsrnyzv8zmlfqpiytqglht0ip6pai02t6hnhnwxrekgpx5mdx2stvmd5p1jewpj65om1i2dd0j4xpeg279adutxhax9frvb17qv14rkyl6m5p8grkxwky78cjvzj0g61kv1l6wotnryp4p8dwh1gm07dm960tbrjdp9cgbq65jpmnwa0dk9ai20cjee2uw1w95vflnv1bfrz9heqod7dt541n647utvnhk24s0jyg7w74fd10x00de8t5byi3n9xvy9cq0z7nek7keylz4my6c7dsrg7yz7jiu7n84sf3quqcjf4aln5y9bo7yoaafn6ul6hil14kjniyz6b',
                        fileSchema: 'a3zitdcjzgz921wtbzhn34lffy1brt78gd2d3yk281lgnmfj0el7c1hzjdtu30r5f3b3yghpphaqld4j9huuu3kclz13ymt405y87mucpceu5lghm2kkg4ztgufbwz1j02nieuqqkj1qu9suywc6cg602axlm1dklizsvafhzbo1v7b894wr3nnzcb09njkvnsv69zc6gbwwysp8cy92xnnzny1xnjbioktqna8c4ho242u0g8rip41f2g71zofenzfk8n84orh0722tyxpaczznzsrqd68y5h42g02akd9ms1edbw7u3ncbke2ka0ibch5t8xvv70cyaey047sptj9zfb4owviglxxauyq9yl2kbwumtkut552o1zty98r9i3c7t01474o6uh0y01f3u5mi1ro2vx4mq5gxl5e155okfjcdh285sxmt2m2u5wahy56vuhq77f9tr2e20blaw5mfa110p4rv0o5rhc8fzg0o4hi0uuku3kkyit5us91hjh7ayscgyam93b7o5di762yrwe92r6bsca64h61lz5jjsdakkck7twiv6uwz3osl64ws976gfy914icyk32p7wojhivt89815n3skabtcya1ipicxzo7q15wi7bsuaz5ebs098dhupirhy60n0v9r80jun2p4703daosjz2sr78pofdzups110i6vo7v44pwkky6pthxrm6v1sg5s6nq9clvva7pegua70tzz1rdfqtk3hnxcyt8jxf05w6f9t8cxksh67nyeo4aeeogq05iaubdmtgktyhkf5lbfi2cky31qeomxrsbc3pqmp4zkxo467wpfh14ryhtt6cqe3ctrqcc7uipxzfdz6sdajx9xj28m32zoxq4q17ydoow2iofcgobdbqjsrxej6n20lchguunz49kndqnrpvb049c6jcg1zg0k86k366y04xgv0z40pmvkgsany4zo0z1qi27hqr64vvchbvnm1ygh5wh2ryy0ndbdm874a5tx3fhy74y',
                        proxyHost: 'egnfz8ixgvcybnace8xz5lg6euryh17c7shyjugd8q6p4enhrk82finiwiqj',
                        proxyPort: 8410254607,
                        destination: 'sc4g118fprq0yv53gr45q1d66tr7yy1m9x38n57zqdfhzlulkzdwbyhagjc6kv96vdyuaoz4ox6vnhgh8c5zti12x9a0yyk2cb5dmfa93k9kuby6rrg976ejpsbrmgo2yteiphgwu62cigbhd0b8s93hzs6oc473',
                        adapterStatus: 'ACTIVE',
                        softwareComponentName: 'invqtodmoq2lqym9eavs5vtkdzg1cm3h4v9e7f6gecs2lhrtssgd1m5mdj6qcvdand60ql40no8frb5dcl1qf0dv5gmwld82dlsupflh0qu575kaij7b06ca49en2ek4sv67ohkmxe9icmhkk9tbub2qadciqva1',
                        responsibleUserAccountName: 'dcegerpb5o1jfqolseul',
                        lastChangeUserAccount: '7c1sw6rkyfz8gjsiwx4p',
                        lastChangedAt: '2020-07-27 04:15:27',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateChannel).toHaveProperty('id', 'd4f80726-ec35-40fe-a26b-a214fecdf140');
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
                            value   : '45432cab-3cbf-4959-a610-d4e20c8e41d5'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannel.id).toStrictEqual('45432cab-3cbf-4959-a610-d4e20c8e41d5');
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
                    id: '45432cab-3cbf-4959-a610-d4e20c8e41d5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindChannelById.id).toStrictEqual('45432cab-3cbf-4959-a610-d4e20c8e41d5');
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
                        
                        id: '926a2a7f-810a-4976-9ac8-09bb9c20d1cd',
                        tenantId: 'c18c4a22-7d53-4ebf-9ee1-0df9afef39c8',
                        tenantCode: 'gpgdbv3x5evhq3blz8vb0u8p0fuotgk0ztsz2mg04d6ep3yqvp',
                        systemId: '565aabd4-6f90-42ae-9ff2-4bf8b5dd12ab',
                        systemName: 'ixl0onv25kdcneigf9gc',
                        party: 'ih3u5q6e50iu5kwouvpfpi6r77338ghk3i2kwq7sp8warwe6wat401dqs7c3kbrp8lhox0mdd4pn5zzy9zlz6rlpy6crpbk7frb627k9zvxs7db7ry2rfjbhg7tz4yzizykqd92boq4em694o8ch7f30abescm9f',
                        component: 'os09zaqjyc4kufej3uq3nrtugug27y42vy380rh2oqivsa6dleqtxfkcd33b4kygu44ampe4dkb3naf55kpwol74pv1lrkxcyqs50f8jimncfnfojo9p2xe4wanq32hrx480k71jtx0t6lmnu8bn6a8u4ovfd0uw',
                        name: '1qre8tafaw92st5wuw5gc5chkkyu6g1lg3uw40s34nv9vfknlivozz7aygpjhh5oltnpxnncxpxryhukd4br9sm18bzbb5ft7sexw61yoxgv7r9haz8my408i0pimyr15c93hrmqwkeiq1frh23iy02e0z3b9prp',
                        flowId: '5a925289-1c5e-4065-8d00-e77c6f43189e',
                        flowParty: 'tpg018x9cf4yhejur6wp3kya1lbt2736lrdstamt26jk0m5rohyz3tea6qq6yney1c8fb59haf4gk3y2v030liekke5tn9c0ogk4ubyskqzu7bawdpkghaprot8a77f0589fm5ad9xys87ld97syswipcwjef43e',
                        flowComponent: 'p9ivjrt4v39la2ujk83d3wd1zaaad22zw558xd442zfn028h2ngcyh7dsc56xxrfunkga7a81oc830lw325kue4l8f5z93oa5e0zhrjrpecz1uwulbkdepjxczmf0wbgifaxv96ny2j4m2rdpnhirpkf7d0qit9l',
                        flowInterfaceName: 'mgft70jex5jwb01quhn8wuntygwyj82wn2xkso84hozpml6codrqto35ujb7bx8s073as684ollxv994pjxzhlf84oc8hukni0jmi2qh60etimef3jdgkwe3hvz3yz75080alq0jnby2zu9oioc73apknpui57wa',
                        flowInterfaceNamespace: '43z40tpwts4nu2t9sf5h9c8r769btv8xne2n988f70aau5714mb61dytc8zv0l99ywncb1ly1ogpw3yal38fg95s9poi6avpuctboascrsm5hfpxxgonqmdqdpea64n1zjj0pcllues3dtx6a12i5otduogra1bz',
                        version: 'sjyl2kkj1ifqpe816oe0',
                        adapterType: 'jvc4k4k7079p97h3vqbmlzlm0ipp8j0593gsfyurl5xni0gcjmqfbp00umqy',
                        direction: 'RECEIVER',
                        transportProtocol: '4f6wvyypr5tyaliucc4xpvgfcogro833d6iffwkax454m8d5kn34b0qgtj75',
                        messageProtocol: '6fqbul9c93o4aft3fex1u22yua1nog3mo362yz2s0vi21rr3oa74tvhcr57p',
                        adapterEngineName: '3oxr702ws54js3674wlnt0yx4o2rq9uj279163qngsk5l26i9ww76jv9ipqagm5d1q0cbtqq1d64dcvry4lptwsyww17k56zmt6kitl7erl1o49uietnlnt6dvgicxkclfoqj7v4o6yb4x8mbiy31b23c09p0jll',
                        url: '52wzqz7nx6we6179e9p4nhv4720doqsztvkfpc2za8andfbuinytod8kkfzeqp9e31as2rkz8nfd31qic7p59hklzrv874482gg8tlg32c1y3aun6p50wub0taqmvw7ia46uvra2d50v2qu3jce8bbof02etjzjx9lxhpsiwto4dd5ths62qilwcf1grxfg0kajpzcm1zmmtvfrxxjdz7ewiets9rggpioh9r6u56z0ay01uamorisw8s24ekpio8ht3siavt4jwewuylh5ei71n1c2jr6le8wbbt42zfdnhu9zr6b8g9v9afh57l3si',
                        username: 'r9iagp4sjtmzrj3mts4s3o98el3nxkkj9r2xqluze5f47efhzfxcd1uzj3aa',
                        remoteHost: 'ka4oz3t1h046rl51rv1b9e37rezsv1yitgo90whs66z33d3zfoufi5oibkm73vtj4m2ijtz63uxe2ws3lown01eoixdfhfxw4tx54e5dl08zta3lv2i0gs03aymlbus45rg2f4pi6w3v4iazuoar7pian6wj5bny',
                        remotePort: 2135137135,
                        directory: '1iv07icy49qdge3bzuh2o9d38ramg4r4wmi8ax29f433hh9xio3u6wzs0ydgqafjo1be0jf7ki90t4f6n8fcqgdzqr4ezxekr7vit6ch9vpkukjs909v7sq1u13nhe5yoj7yf9r1x5f793qr0r7cv3tcybf567iawjgvo0rkubwa3de1dhfcr4kyiv4vh2mk8at8q8icx0c4ltmmuubd7i4tk5xoglln4kofd01n5ujp4wtfutplfk7u25frcwcc9w8ic1ry1gbla5f457hdru8i2hs10pke4nkqdy58kz32r6ikdszo5028uzuhqce5k8aznjesfhp3oclo497vtz7u5m7f0wbasfoer62mffu6qwcxzdgp7y1euxisap89qmw4sv2qmdh3p3xsztuq72aq2779q7d6svvfcvujzeirzs3fb004zuaxxgm7sp1imxtbkn3ksopzcg0awzpq3bc9mfqus00hm8dxc5a8f7wf6plmergiiydymrh0kl67fl0qzec59y9i97mht8cjdagkjwz9cl6ixy6t8hnaf2cspd1ydfjtsf1dp1lgt2e67ak5c1e88wmfx7c9liu2rzor1lqsq3cqnj61fpi6eiaxbyy4dtnvhvspa420y82u7zmtfipi1e5oa9m5ktfurp8z9r0b13jkbnmpgpzp7foq7ssrrtsmj2o0zfsmod4mc18lncb9w643jahtbw6wovv6b5bs6b30dsxf2mhv5p7s6u8de25mpeic1xw07mnxhfs4o4ujzotk0ls8cngjlyq7xq9jr4sd6bcz9qxn6djid8ecr4cqlg259288k4376g0d0c08nbp528ohml58kij4qinrytum08m11qj2us13w54a60sha4isbjtsi5qvtme51n228dbso828hb6t2jg2tl0ta66f4xoldrpn34dzret4mvgg602dn91ylepf9oi3o7kdlql3qimtisuwfxn56dukbucapxmydh7au8ire86nrngekip8nkomduyp',
                        fileSchema: 'reeal8jcencsdl40b52t9scdgkk1ox3vke0bhc9trwztda1gkv30rbbjnobb23fvvqwedrjokcju1zgf688knsskz85soef9kcer8pjqt7p9w94wcc6zraods7mp8813b7iyayzs0yjbsdcpwahw5hexwrghdzvqep038s3ulhst14x8owx9ddewe262iy6seb5u5cdtb90id82wwgw814oe0up8dcj8vw8uypqdpb5ercke7fusolwmmwdfxj6u8bsf47kafvrx37cxfuzaufwayd1867h2cqon1yd2kmy39qcrb7ojcvxwpwdehazltftsyq1nl99hkdr45xewfu8gpjsclv6253gyivvpl1zuuhytavxw11mnpun2lm16rftjuo86qcxv6p3y1bcqknfs49d28stpb3igc1m4a172sp39e2ponzxu3ps04vl1gn4qni3hq7p4x5ujx7p2uqmcmdv29wdrwrwtxpue5avxqg1cqjgh18sx1sk2zxlgxwqusu0qjcz66ywjihxpzf1uu7uu1ulceluwabt9h9dqy8dbyxoqwefvcq0eit4mmmppbzaiouatn0033ukkkg11cv552w38zx0kxyknddyrjvp9wz6okqagiwoilq4twy29yq4r8a1z8gcqhudrzhm4na615fhiyraau8xqf2pt7ahx1xp5txhl2qfv97x26ycn9tqnmqy7jjz6e1l2n9xr63bonz7dawaptilwt60e46aaoqt70avpjya2ztcg4np3g9phud1kapb16bdquo7w25w5uamw6kk8vpi75rkk1zec8qlwyidoikrnb1j1uossw4a50d2n6ahl7hgxr20ayxjx7nqq4qteuyqs0vz57mu2rxd83klsj4q0mm0hf123qg3x10mvbm9n9pv9fc9aet59zex46ktl79v104hkt3biddwyer6bpxb90drwli773uavpry8dxdpytza1psozxx1rz0g0yrmta06cevxr5t8nmz2qbgkgku2gi32',
                        proxyHost: 'h4ugiljjg321tmewau9dc74ra6cwxl6tukubj1g71km3a4uz2yrrh5klf874',
                        proxyPort: 4557478035,
                        destination: 'sdcwzpmkjdf2puaod81a63a76i58cfou7n6rek9g2lyt1te934866rtz1no33ohiif48y1t6u6qc29q2jm11tq6jnlmet8g6tydlcl8qauqdh3elxnosx1j61t3qxvsph3vxi7bjhvg74wnwfvdnevvu9g0zp1ks',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: 'zzms4dgfo59wgwit2zwli3b9rqzpkl1g1rp580bbmp65r97urou64nasvv5bt5uzfe0zra6itoeraozisud41mvj8wbnncs0euviqnytayzq090d3b2gxu67g2ghoocus5pf7ymvzn343r5tkfpsrwyr17wqry7k',
                        responsibleUserAccountName: '5p7lkzp9a6bgxju9agkn',
                        lastChangeUserAccount: '9h2ve77sbga5cnuthnq0',
                        lastChangedAt: '2020-07-26 20:26:24',
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
                        
                        id: '45432cab-3cbf-4959-a610-d4e20c8e41d5',
                        tenantId: '5cbb515e-71f6-440c-8e61-812ff6425ff5',
                        tenantCode: 'ns3czc8idqfawq6on455bmthg2v499wflmsqagjtenowd7yba7',
                        systemId: '06f913b4-64dd-4e92-a51c-a9a9144e20dc',
                        systemName: 'kqobyucgvuqmrfowzs4q',
                        party: 'kq8wrxr5nuatkszqby1lodlwmnfdhsw1qzg4dirom64352exqn3qfmx9v822r15ftz8uqnldwi98dpanjp2e4t9sphkgd2l09ricg5pw5s0zefkc1tnl7kt14iq5jms46xe5w20q4dh0isu7e2jwnz5xmcwj9efv',
                        component: 'jjo292bxdd39uyd9op9hqtia5adcrkh958nf6wku8dchyvgv6zbh6eug9dctutr6w2ohl29xizwo7f6ps3pdat0kbvd5iuzl9ioxvlruiosfn3xceslv2320szwy6e8d1c48r0yh6w5lyrb4tcj3ppt9c8py6bf1',
                        name: 'jwi2sfrk2il3fugn9opfnw50s2lk85mdyltkd6p63vpkqgqrb8htdrts9a1e50bugykkqso3fwcpjbjimv3eclkb0gnxealy671mjuyfidkv4g15bciokjeqh6bxqq43timxnignef6a2ywra2amzdwhk8v022c2',
                        flowId: 'e65bc1c6-bc9b-48f1-853e-c09af2ed2939',
                        flowParty: 'ppwitebykghs6uy2r2p4o5b644ry96nrol6n13uvde10sztkqrni720zh7636fq0mlibzilznuvyfs0i8e7rdwvv6jg5a5dxaxfcagta4s4jlo94mbpku3tw9ypksc1nk9noqdnknqisllvx41opmg3nzwrj1r6g',
                        flowComponent: 'ou9cxrccvg83tdbyg6m1xrpl517c1h6ihzkvwercgrix8eyyc4cvo6tvz0qvovm1s4gvuqk58s0b93b54yaem1vb7flj82h57ywak593woyf4t761d1qvcjge0jtduwmcms97ml8ijpkxz23ovlhjqgeytlexagq',
                        flowInterfaceName: 'v4ntbafmgsh8nnbzft3h1ao6xugoygm5qay1a0e83dz1je9oze40leoljxbsp8uad30dctpvntwgmrx7lc117b7fr4yx7tluqg2dknij4018s4ddryuy4cqio226zao113uuh3k33ztbfhpgwg7rg4e8hedp1oui',
                        flowInterfaceNamespace: '0c731su540gf3z0nenyhq1bnwbj9yj4gs4simcikfntgzx240ou0nkhhyht0yenh1cn5nqodepbjtku4u7uob2mwra22byk9ofn9r6bcp6aixlwtxihdq9amqza50q7631l9ks4fwz2k8ws7f0xbb3k958z3eptv',
                        version: 'zfefsr0k892kkyzkw4og',
                        adapterType: 'jx5s6yhoz3iazx53e16w3tti69bgekl1tfk59wy0tjllnx8e3rr7u4qrorf8',
                        direction: 'RECEIVER',
                        transportProtocol: '8smet37vdfexmxqosc1b01ufflgss3r8b9cf6y1x8r54y1bghfpc9p17t5it',
                        messageProtocol: '38s9ohj7h2trlwm5iz54twf9j4rnohlhzy10sd74pn0frttn9r6totce84m9',
                        adapterEngineName: 'bcuih0rs7l6anqu0cqryldzw3ebo8mu0y0lt15ccxagle98l2czmdp2vn4otmiag5t0gb9ky5w7yso2iweir14bk4go93pkz59ko0prsisodn7s32d4vkm36qe7909f8kzmxpq2qs14189ye32v9hj96ain923ry',
                        url: 'c1i2291o1bde508uivckyh07x42d400h7vkok441e9n5o5djlnq4od4wkcdkvfw5lga7q64fyqznni4repymhsum27yt69oe3umjnc9h2qwlk2aa4uwl5jxx3fmzz4u4dwnihib2ki07bsun8g1aiczavjek7u7h7pp0rdrx4zu5cjrvew6rh6dooef7lz5x7t6i85jdpkgo8fz177twfy8m00azqredd4oyo0ojxaij93277gww8bsow6n0d9fcuhd08r34uai6jhko5w3zrrpi0m8zp9m1x3nhhwgu4k1btkl6le9msms2ic0907gj',
                        username: '0hvx2a21x243fwld1a3yfh1n2x7ra61p85avdwsyvyfnqid4dpts7muohss3',
                        remoteHost: 'tkhiicgjpb17wsbffdsoyfypr2eqin4mltngz5n8ji55v2wd10c5c9s8vhvle7ia0z01k6dlz2ye8k8ic8mryrpyqr6cevw1bnlxke0esk8p9tku5a5vlosipmd1wp05rbjx54du6ht8n09laxh7ifltqqoa87pz',
                        remotePort: 5925218021,
                        directory: 'yogzt9bzlvb7pe7nhjwwm21uumatazvcxeuggot68ibu7lobqwjsombpo2wioxgvh4a2ouuwy96jb3akjztmgokanegen0wrf5p967jcpw5f7v5jui8ko0njbkv8tt9wjeumpkfe0x5htvar7kv2exzcpzwdfg9mg2031r704r3i562fj3fwcn56pzpn8pp3ssbjjxgbs2xualpk8kihclqzkzwqh7aeyie6ne2otju5tx2xegx2eyzlgmgb2wq6q2wmkv9tqty8yuo1ez7vv6np0c22lphlilkjrdm8slaa1v851mad9jwc5fmnht18xofp4s3dbibvq0724dwgah1sjbg3w4vwl6f14ub74mfdaqyd9ufn75uvjx164v3p56va2tpo4hbm1pmf36f218qkmuhegipeq86934wisa70qqc38abamdb9f6jy837y8kszwk9ud4zcw5gii3y0v7aq6qk11b6f16gnk79erz6i4eh5dbi8ibgn6fxqoy3fj04hly60yv32jtc1dxo4c2c11rdp59490q8ec854i5vq3ruea1ak02pfsfu2jretzujeou6oc1n6ph3ch14c16xlthscoigrfwoqgs1rbszgdrk833jhhv9a94ansy2ucbw7v9p5lumocifik272l4sqf4s4sxnsd2slfdgvxqvftk4160mipjmht70kdmqtti0wmx728euqodz9pc7m6ar0jkjfo8nwd7biypysoanw9dphg4x25q5am59wh9690clmtkddm9nd5823pbsob7rinxkqdfoojirnlw5h7sll4dwz75lgf3dycz75wh7858neilnvkf0m22vbt3g05vx7amqukj7a1gi0zs54pp7ew7jegkaex32vex1lskbsy2qm2r74oyd1fz4fbicmnnq1det35hwq4dtpvqy8dgofjti3mswx5cmo9qvus6mauj56tekg2ymwho3unzs7jrk5dryrcgv7ttt859bk2tqwaqfqa22cu3riqxzcty0j',
                        fileSchema: '6cjjqu9l9l0o6ig3j3m14t9yp8nn9bh45itj54zvc421nrcybk5l2h7ujtlqdu4x7h9546p5cpm64aa02276ibikmslgq97g3ag7a1fzqchuoreqcrl1apxmalj34n2fmvim0cvkhkcuea4zx33bjj4gsf4nbanm8uz55llzskvjk95r3th2r36zla9s6q9c20iy48a5bm4aesm1xqpb0mg6alqdswchchyfdxux0u4vjigopovep3jrlrjcj3adnqj2w8tsys1ub5rp0wsbxehr1wkzq4h2t8twdcq9w2a569yxy648rrx3jg1fyhim0j3on2tzuaqlbehtbejq6aejgem8s95jqzhdeokrko2o5n3ty3hd9fo2wa8uzqidcr99gmasloxofg7z0lp9z26vxgmj8p1js90mxmyr4zeuae9go13cs7c1mmto2awdtdf4bmkl99z7bv2c9xn7q4pkp72obee5o0mjtb7y52rcb2o7ki43mxlfo4nk6fn4rwczieyo0u3prtagzgsyh6cqupcv6x8s1g95v67lvadlrawlxvfrnptidk411bq2gr0bmzumsglsm2p61cyer0whdfavkrpj2ab7l8jz9bqyka0cvboyazenoqdzrax1ypy34h3vc5lybr6u68ailra3r913le8hhm4dbj3616ixivitz9buv91t9nyt2kpwqo8ucq166upg8yv3iuy13m941bncb7o73d2jj1pbnfnl3gcgetpbqbms8m3wxh8zw1267owu4umf6ykaru1syfvwt28leo8jwxz2jb4f8y1enigs3q40zbn80nq1h84olhpsx2n0zb09rzd0vj2r4oic26360yeifgl3hzx1mps6f80b6acjcytu5mdwa8ywgzxu4bnpoavfa1go239hgfoq532yk0c2m0i98o2m13fvmfx2ougo48ys52dhqhfbxwbfvzj3dks8x6yvrpdyk21qdb30k4vttjy2etukvjaxlihe72h5irjtrm6xgqlq',
                        proxyHost: '3l44h80r801yeuofgasthqvus5obu2uea3855b8d9c5rk89iz8vbetubuxfn',
                        proxyPort: 1684495907,
                        destination: 'o1qvs995jbj8e9ptufkh1u49d6gdpz9prxinz22dumy3wc7c0adrqalltcx7msz0f354xsz4lv248g9o37wj770pnhv3n5ff1ldlnr0y6uz5s4bgyp14xbk63qod4s06pev7btd4zp51breyfgfi62xiqmrusivb',
                        adapterStatus: 'INACTIVE',
                        softwareComponentName: '9fvlu959inwvvr3uvw00z4fe2gx4ycvn440qpzmxauaolm8js0alsip9215meuyfq8kte57y5jovpj0yexs88j96qlel4sshpyh94cc473p6eix8fchjol2h48bke4ui4tknowikdzzg618bzukrls8l48icch3z',
                        responsibleUserAccountName: 'ij26ub7xdqyh6lynhb0f',
                        lastChangeUserAccount: 'magkpq82a0lrqh475cec',
                        lastChangedAt: '2020-07-27 13:47:38',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateChannel.id).toStrictEqual('45432cab-3cbf-4959-a610-d4e20c8e41d5');
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
                    id: '45432cab-3cbf-4959-a610-d4e20c8e41d5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteChannelById.id).toStrictEqual('45432cab-3cbf-4959-a610-d4e20c8e41d5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});